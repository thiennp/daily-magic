#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var x6=Object.create;var FP=Object.defineProperty;var W6=Object.getOwnPropertyDescriptor;var O6=Object.getOwnPropertyNames;var M6=Object.getPrototypeOf,j6=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var R=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Rt=(e,t)=>{for(var r in t)FP(e,r,{get:t[r],enumerable:!0})},N6=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of O6(t))!j6.call(e,n)&&n!==r&&FP(e,n,{get:()=>t[n],enumerable:!(o=W6(t,n))||o.enumerable});return e};var m=(e,t,r)=>(r=e!=null?x6(M6(e)):{},N6(t||!e||!e.__esModule?FP(r,"default",{value:e,enumerable:!0}):r,e));var Ya,AW,bW,Xa,zP,vde,_W,gn,pr,Hr,Eu,Ru,Vs,Ks,He,$P,Cu,vu,Lu,Za,zt,fn,yn,Qa,Eo,UP,kW,Ie=l(()=>{"use strict";Ya={production:".agent-witch",localhost:".local-agent-witch"},AW={production:47892,localhost:47893},bW={production:"com.agent-witch",localhost:"com.local-agent-witch"},Xa={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},zP="app",vde=`${zP}/agent-witch.js`,_W=`${zP}/command`,gn={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",projectDataDir:"project-data",harnessDir:"harness"},pr=Ya.production,Hr=Ya.localhost,Eu=AW.production,Ru=AW.localhost,Vs=bW.production,Ks=bW.localhost,He="profiles",$P=Xa.activeProfile,Cu="harness",vu="sets",Lu="manifest.json",Za=gn.projectsDir,zt=gn.logsDir,fn="agent-witch.log",yn="agent-witch.error.log",Qa=gn.reportsDir,Eo=gn.deviceKeypairJson,UP=zP,kW="agent-witch.js"});var wW=l(()=>{"use strict";Ie()});var TW,Ro,el,Iu=l(()=>{"use strict";TW=m(require("node:path"));Ie();Ro=e=>TW.default.basename(e)===Hr,el=e=>Ro(e)?Ks:Vs});var EW=l(()=>{"use strict";wW();Iu()});var RW,BP,D6,tl,H6,F6,CW,z6,$6,vW=l(()=>{"use strict";EW();Ie();RW=m(require("node:os")),BP=m(require("node:path")),D6=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?BP.default.resolve(e):BP.default.join(RW.default.homedir(),pr)},tl=el(D6()),H6=`${tl}-wake`,F6=`${tl}-live`,CW=`${tl}-watchdog`,z6=`${tl}-automation-scheduler`,$6=`${tl}-updater`});var qs=R(GP=>{"use strict";Object.defineProperty(GP,"__esModule",{value:!0});GP.stringify=U6;function U6(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var N=R(VP=>{"use strict";Object.defineProperty(VP,"__esModule",{value:!0});VP.generateTypeGuardError=B6;var LW=qs();function B6(e,t,r){return(0,LW.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,LW.stringify)(e)}) to be "${r}"`}});var Co=R(xu=>{"use strict";Object.defineProperty(xu,"__esModule",{value:!0});xu.isNonNullObject=void 0;var G6=N(),V6=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,G6.generateTypeGuardError)(e,t.identifier,"non-null object")),r};xu.isNonNullObject=V6});var ur=R(xe=>{"use strict";Object.defineProperty(xe,"__esModule",{value:!0});xe.attachTypeGuardMeta=xe.isArrayTypeGuard=xe.isNestedObjectTypeGuard=xe.getTypeGuardWrapperKind=xe.getTypeGuardInnerGuard=xe.getTypeGuardItemGuard=xe.getTypeGuardSchema=void 0;var K6=e=>e.schema;xe.getTypeGuardSchema=K6;var q6=e=>e.itemGuard;xe.getTypeGuardItemGuard=q6;var J6=e=>e.innerGuard;xe.getTypeGuardInnerGuard=J6;var Y6=e=>e.wrapperKind;xe.getTypeGuardWrapperKind=Y6;var X6=e=>{if((0,xe.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};xe.isNestedObjectTypeGuard=X6;var Z6=e=>{if((0,xe.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};xe.isArrayTypeGuard=Z6;var Q6=(e,t)=>Object.assign(e,t);xe.attachTypeGuardMeta=Q6});var rl=R(hn=>{"use strict";Object.defineProperty(hn,"__esModule",{value:!0});hn.getExpectedTypeName=hn.getTypeGuardDisplayName=void 0;var IW=ur(),eY=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};hn.getTypeGuardDisplayName=eY;var tY=e=>{let t=(0,IW.getTypeGuardWrapperKind)(e),r=(0,IW.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,hn.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};hn.getExpectedTypeName=tY});var Sn=R(Wu=>{"use strict";Object.defineProperty(Wu,"__esModule",{value:!0});Wu.createValidationResult=void 0;var rY=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Wu.createValidationResult=rY});var Js=R(Ou=>{"use strict";Object.defineProperty(Ou,"__esModule",{value:!0});Ou.createValidationError=void 0;var oY=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Ou.createValidationError=oY});var Ys=R(Mu=>{"use strict";Object.defineProperty(Mu,"__esModule",{value:!0});Mu.createTreeNode=void 0;var nY=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Mu.createTreeNode=nY});var ol=R(ju=>{"use strict";Object.defineProperty(ju,"__esModule",{value:!0});ju.combineResults=void 0;var sY=Sn(),iY=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,sY.createValidationResult)(r,o,n)};ju.combineResults=iY});var Du=R(Nu=>{"use strict";Object.defineProperty(Nu,"__esModule",{value:!0});Nu.createSimplifiedTree=void 0;var xW=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=xW(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},aY=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=xW(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Nu.createSimplifiedTree=aY});var sl=R(Fu=>{"use strict";Object.defineProperty(Fu,"__esModule",{value:!0});Fu.validateObject=void 0;var lY=Co(),nl=Sn(),cY=Js(),Hu=Ys(),dY=ol(),WW=zu(),pY=(e,t,r)=>{let o=()=>{let i=(0,cY.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Hu.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,nl.createValidationResult)(!1,[],a):(0,nl.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,nl.createValidationResult)(!0,[],(0,Hu.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,g=d,f=t[g],h=e[g],y=(0,WW.validateProperty)(g,h,f,r);return y.valid?p.length===0?(0,nl.createValidationResult)(!0,[],(0,Hu.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,WW.validateProperty)(d,e[d],p,r)}),a=(0,dY.combineResults)(i,r.path),c=(0,Hu.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,nl.createValidationResult)(a.valid,a.errors,c)};return(0,lY.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};Fu.validateObject=pY});var MW=R(Bu=>{"use strict";Object.defineProperty(Bu,"__esModule",{value:!0});Bu.validateArray=void 0;var uY=qs(),$u=Sn(),OW=Js(),Uu=Ys(),mY=ol(),gY=sl(),fY=rl(),yY=ur(),hY=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,OW.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,Uu.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,$u.createValidationResult)(!1,[c],d)}let n=(0,yY.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,g={path:p,config:r.config||null};if(n)return(0,gY.validateObject)(c,n,g);let f=t(c,null),h=(0,fY.getExpectedTypeName)(t),y=(0,uY.stringify)(c);if(f)return(0,$u.createValidationResult)(!0,[],(0,Uu.createTreeNode)(p,!0,h,c));let S=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,u=(0,OW.createValidationError)(p,h,c,S),A=(0,Uu.createTreeNode)(p,!1,h,c);return A.errors=[u],(0,$u.createValidationResult)(!1,[u],A)}),i=(0,mY.combineResults)(s,o),a=(0,Uu.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,$u.createValidationResult)(i.valid,i.errors,a)};Bu.validateArray=hY});var zu=R(Vu=>{"use strict";Object.defineProperty(Vu,"__esModule",{value:!0});Vu.validateProperty=void 0;var jW=Sn(),SY=Js(),NW=Ys(),PY=rl(),Gu=ur(),AY=sl(),bY=MW(),_Y=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,Gu.getTypeGuardSchema)(r),c=(0,Gu.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,AY.validateObject)(t,a,s);if(c&&(0,Gu.isArrayTypeGuard)(r))return(0,bY.validateArray)(t,c,s)}let d=p=>{let g=r(t,p),f=(0,PY.getExpectedTypeName)(r);return g?(0,jW.createValidationResult)(!0,[],(0,NW.createTreeNode)(n,!0,f,t)):(()=>{let h=(0,SY.createValidationError)(n,f,t,`Expected ${n} (${JSON.stringify(t)}) to be "${f}"`),y=(0,NW.createTreeNode)(n,!1,f,t);return y.errors=[h],(0,jW.createValidationResult)(!1,[h],y)})()};if((0,Gu.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};Vu.validateProperty=_Y});var qu=R(Ku=>{"use strict";Object.defineProperty(Ku,"__esModule",{value:!0});Ku.isNil=void 0;var kY=N(),wY=function(e,t){return e!=null?(t&&t.callbackOnError((0,kY.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Ku.isNil=wY});var KP=R(Ju=>{"use strict";Object.defineProperty(Ju,"__esModule",{value:!0});Ju.isDefined=void 0;var TY=N(),EY=qu(),RY=function(e,t){return(0,EY.isNil)(e,null)?(t&&t.callbackOnError((0,TY.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Ju.isDefined=RY});var qP=R(Yu=>{"use strict";Object.defineProperty(Yu,"__esModule",{value:!0});Yu.reportValidationResults=void 0;var CY=Du(),DW=KP(),vY=qu(),LY=(e,t)=>{if(e.valid===!0||(0,vY.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,DW.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,CY.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,DW.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Yu.reportValidationResults=LY});var JP=R(ce=>{"use strict";Object.defineProperty(ce,"__esModule",{value:!0});ce.Validation=ce.reportValidationResults=ce.validateObject=ce.validateProperty=ce.createSimplifiedTree=ce.combineResults=ce.createTreeNode=ce.createValidationError=ce.createValidationResult=ce.getExpectedTypeName=void 0;var IY=rl();Object.defineProperty(ce,"getExpectedTypeName",{enumerable:!0,get:function(){return IY.getExpectedTypeName}});var xY=Sn();Object.defineProperty(ce,"createValidationResult",{enumerable:!0,get:function(){return xY.createValidationResult}});var WY=Js();Object.defineProperty(ce,"createValidationError",{enumerable:!0,get:function(){return WY.createValidationError}});var OY=Ys();Object.defineProperty(ce,"createTreeNode",{enumerable:!0,get:function(){return OY.createTreeNode}});var MY=ol();Object.defineProperty(ce,"combineResults",{enumerable:!0,get:function(){return MY.combineResults}});var jY=Du();Object.defineProperty(ce,"createSimplifiedTree",{enumerable:!0,get:function(){return jY.createSimplifiedTree}});var NY=zu();Object.defineProperty(ce,"validateProperty",{enumerable:!0,get:function(){return NY.validateProperty}});var DY=sl();Object.defineProperty(ce,"validateObject",{enumerable:!0,get:function(){return DY.validateObject}});var HY=qP();Object.defineProperty(ce,"reportValidationResults",{enumerable:!0,get:function(){return HY.reportValidationResults}});var FY=Sn(),zY=ol(),$Y=Js(),UY=Ys(),BY=zu(),GY=sl(),VY=qP(),KY=Du();ce.Validation={result:FY.createValidationResult,combine:zY.combineResults,error:$Y.createValidationError,treeNode:UY.createTreeNode,property:BY.validateProperty,object:GY.validateObject,report:VY.reportValidationResults,createSimplifiedTree:KY.createSimplifiedTree}});var Xu=R(YP=>{"use strict";Object.defineProperty(YP,"__esModule",{value:!0});YP.isType=JY;var HW=Co(),FW=JP(),qY=ur();function JY(e){if(!(0,HW.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,FW.validateObject)(r,e,s);return(0,FW.reportValidationResults)(i,o||null),i.valid}return(0,HW.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,qY.attachTypeGuardMeta)(t,{schema:e})}});var BW=R(Pn=>{"use strict";Object.defineProperty(Pn,"__esModule",{value:!0});Pn.isNestedType=Pn.isShape=void 0;Pn.isSchema=il;var zW=Co(),$W=JP(),UW=ur();function il(e){if(!(0,zW.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=XY(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,$W.validateObject)(o,t,i);return(0,$W.reportValidationResults)(a,n||null),a.valid}return(0,zW.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,UW.attachTypeGuardMeta)(r,{schema:t})}function YY(e){return typeof e=="function"?e:Array.isArray(e)?ZY(e):typeof e=="object"&&e!==null?il(e):e}function XY(e){let t={};for(let[r,o]of Object.entries(e))t[r]=YY(o);return t}function ZY(e){let t=e[0],r=il(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,UW.attachTypeGuardMeta)(o,{itemGuard:r})}Pn.isShape=il;Pn.isNestedType=il});var GW=R(XP=>{"use strict";Object.defineProperty(XP,"__esModule",{value:!0});XP.isObjectWith=e7;var QY=Xu();function e7(e){return(0,QY.isType)(e)}});var VW=R(ZP=>{"use strict";Object.defineProperty(ZP,"__esModule",{value:!0});ZP.isObject=r7;var t7=Xu();function r7(e){return(0,t7.isType)(e)}});var KW=R(QP=>{"use strict";Object.defineProperty(QP,"__esModule",{value:!0});QP.guardWithTolerance=o7;function o7(e,t,r){return t(e,r),e}});var qW=R(eA=>{"use strict";Object.defineProperty(eA,"__esModule",{value:!0});eA.isBranded=s7;var n7=N();function s7(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,n7.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var JW=R(Zu=>{"use strict";Object.defineProperty(Zu,"__esModule",{value:!0});Zu.BrandSymbols=void 0;Zu.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var YW=R(Qu=>{"use strict";Object.defineProperty(Qu,"__esModule",{value:!0});Qu.isAny=void 0;var i7=function(e){return!0};Qu.isAny=i7});var al=R(tA=>{"use strict";Object.defineProperty(tA,"__esModule",{value:!0});tA.reportTypeGuardError=l7;var a7=N();function l7(e,t,r){e&&e.callbackOnError((0,a7.generateTypeGuardError)(t,e.identifier,r))}});var XW=R(em=>{"use strict";Object.defineProperty(em,"__esModule",{value:!0});em.isBoolean=void 0;var c7=al(),d7=function(t,r){return typeof t!="boolean"?((0,c7.reportTypeGuardError)(r,t,"boolean"),!1):!0};em.isBoolean=d7});var ZW=R(tm=>{"use strict";Object.defineProperty(tm,"__esModule",{value:!0});tm.isDate=void 0;var p7=N(),u7=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,p7.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};tm.isDate=u7});var rA=R(rm=>{"use strict";Object.defineProperty(rm,"__esModule",{value:!0});rm.isNumber=void 0;var m7=al(),g7=function(t,r){return typeof t!="number"||isNaN(t)?((0,m7.reportTypeGuardError)(r,t,"number"),!1):!0};rm.isNumber=g7});var QW=R(om=>{"use strict";Object.defineProperty(om,"__esModule",{value:!0});om.isString=void 0;var f7=al(),y7=function(t,r){return typeof t!="string"?((0,f7.reportTypeGuardError)(r,t,"string"),!1):!0};om.isString=y7});var e0=R(nm=>{"use strict";Object.defineProperty(nm,"__esModule",{value:!0});nm.isUnknown=void 0;var h7=function(e){return!0};nm.isUnknown=h7});var t0=R(sm=>{"use strict";Object.defineProperty(sm,"__esModule",{value:!0});sm.isFunction=void 0;var S7=N(),P7=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,S7.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};sm.isFunction=P7});var o0=R(im=>{"use strict";Object.defineProperty(im,"__esModule",{value:!0});im.isFile=void 0;var r0=N(),A7=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,r0.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,r0.generateTypeGuardError)(e,t.identifier,"File")),!1)};im.isFile=A7});var s0=R(am=>{"use strict";Object.defineProperty(am,"__esModule",{value:!0});am.isFileList=void 0;var n0=N(),b7=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,n0.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,n0.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};am.isFileList=b7});var a0=R(lm=>{"use strict";Object.defineProperty(lm,"__esModule",{value:!0});lm.isBlob=void 0;var i0=N(),_7=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,i0.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,i0.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};lm.isBlob=_7});var c0=R(cm=>{"use strict";Object.defineProperty(cm,"__esModule",{value:!0});cm.isFormData=void 0;var l0=N(),k7=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,l0.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,l0.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};cm.isFormData=k7});var p0=R(dm=>{"use strict";Object.defineProperty(dm,"__esModule",{value:!0});dm.isURL=void 0;var d0=N(),w7=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,d0.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,d0.generateTypeGuardError)(e,t.identifier,"URL")),!1)};dm.isURL=w7});var m0=R(pm=>{"use strict";Object.defineProperty(pm,"__esModule",{value:!0});pm.isURLSearchParams=void 0;var u0=N(),T7=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,u0.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,u0.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};pm.isURLSearchParams=T7});var g0=R(um=>{"use strict";Object.defineProperty(um,"__esModule",{value:!0});um.isMap=void 0;var E7=N(),R7=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,E7.generateTypeGuardError)(e,t.identifier,"Map")),!1)};um.isMap=R7});var f0=R(mm=>{"use strict";Object.defineProperty(mm,"__esModule",{value:!0});mm.isSet=void 0;var C7=N(),v7=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,C7.generateTypeGuardError)(e,t.identifier,"Set")),!1)};mm.isSet=v7});var y0=R(oA=>{"use strict";Object.defineProperty(oA,"__esModule",{value:!0});oA.isIndexSignature=I7;var L7=N();function I7(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,L7.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let g=s[d],f=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),h=t(g,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return f&&h})}}});var h0=R(gm=>{"use strict";Object.defineProperty(gm,"__esModule",{value:!0});gm.isError=void 0;var x7=al(),W7=function(t,r){return t instanceof Error?!0:((0,x7.reportTypeGuardError)(r,t,"Error"),!1)};gm.isError=W7});var sA=R(nA=>{"use strict";Object.defineProperty(nA,"__esModule",{value:!0});nA.isArrayWithEachItem=j7;var O7=N(),M7=ur();function j7(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,O7.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,M7.attachTypeGuardMeta)(t,{itemGuard:e})}});var iA=R(fm=>{"use strict";Object.defineProperty(fm,"__esModule",{value:!0});fm.isNonEmptyArray=void 0;var N7=N(),D7=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,N7.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};fm.isNonEmptyArray=D7});var S0=R(aA=>{"use strict";Object.defineProperty(aA,"__esModule",{value:!0});aA.isNonEmptyArrayWithEachItem=z7;var H7=sA(),F7=iA();function z7(e){return function(t,r){return(0,H7.isArrayWithEachItem)(e)(t,r)&&(0,F7.isNonEmptyArray)(t,r)}}});var A0=R(lA=>{"use strict";Object.defineProperty(lA,"__esModule",{value:!0});lA.isTuple=$7;var P0=N();function $7(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,P0.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,P0.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var b0=R(cA=>{"use strict";Object.defineProperty(cA,"__esModule",{value:!0});cA.isObjectWithEachItem=B7;var U7=N();function B7(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,U7.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var _0=R(dA=>{"use strict";Object.defineProperty(dA,"__esModule",{value:!0});dA.isPartialOf=V7;var G7=Co();function V7(e){return function(t,r){if(!(0,G7.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var k0=R(pA=>{"use strict";Object.defineProperty(pA,"__esModule",{value:!0});pA.isPick=q7;var K7=Co();function q7(e,...t){return function(r,o){if(!(0,K7.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var w0=R(uA=>{"use strict";Object.defineProperty(uA,"__esModule",{value:!0});uA.isOmit=Y7;var J7=Co();function Y7(e,...t){return function(r,o){if(!(0,J7.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),g=p.indexOf(" ("),f=g>=0?p.slice(0,g):p;if(a.has(f))return!1;let h=f.startsWith(s+".")&&f.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var T0=R(ym=>{"use strict";Object.defineProperty(ym,"__esModule",{value:!0});ym.isNonEmptyString=void 0;var X7=N(),Z7=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,X7.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};ym.isNonEmptyString=Z7});var E0=R(hm=>{"use strict";Object.defineProperty(hm,"__esModule",{value:!0});hm.isNonNegativeNumber=void 0;var Q7=N(),eX=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,Q7.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};hm.isNonNegativeNumber=eX});var R0=R(Sm=>{"use strict";Object.defineProperty(Sm,"__esModule",{value:!0});Sm.isPositiveNumber=void 0;var tX=N(),rX=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,tX.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Sm.isPositiveNumber=rX});var C0=R(Pm=>{"use strict";Object.defineProperty(Pm,"__esModule",{value:!0});Pm.isNonPositiveNumber=void 0;var oX=N(),nX=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,oX.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Pm.isNonPositiveNumber=nX});var v0=R(Am=>{"use strict";Object.defineProperty(Am,"__esModule",{value:!0});Am.isNegativeNumber=void 0;var sX=N(),iX=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,sX.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Am.isNegativeNumber=iX});var L0=R(bm=>{"use strict";Object.defineProperty(bm,"__esModule",{value:!0});bm.isInteger=void 0;var aX=N(),lX=rA(),cX=function(e,t){return!(0,lX.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,aX.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};bm.isInteger=cX});var I0=R(_m=>{"use strict";Object.defineProperty(_m,"__esModule",{value:!0});_m.isPositiveInteger=void 0;var dX=N(),pX=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,dX.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};_m.isPositiveInteger=pX});var x0=R(km=>{"use strict";Object.defineProperty(km,"__esModule",{value:!0});km.isNegativeInteger=void 0;var uX=N(),mX=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,uX.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};km.isNegativeInteger=mX});var W0=R(wm=>{"use strict";Object.defineProperty(wm,"__esModule",{value:!0});wm.isNonNegativeInteger=void 0;var gX=N(),fX=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,gX.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};wm.isNonNegativeInteger=fX});var O0=R(Tm=>{"use strict";Object.defineProperty(Tm,"__esModule",{value:!0});Tm.isNonPositiveInteger=void 0;var yX=N(),hX=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,yX.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Tm.isNonPositiveInteger=hX});var M0=R(Rm=>{"use strict";Object.defineProperty(Rm,"__esModule",{value:!0});Rm.isNumeric=void 0;var Em=N(),SX=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Em.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Em.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Em.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Em.generateTypeGuardError)(e,t.identifier,"number key")),!1};Rm.isNumeric=SX});var j0=R(Cm=>{"use strict";Object.defineProperty(Cm,"__esModule",{value:!0});Cm.isBooleanLike=void 0;var mA=N(),PX=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,mA.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,mA.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Cm.isBooleanLike=PX});var N0=R(vm=>{"use strict";Object.defineProperty(vm,"__esModule",{value:!0});vm.isDateLike=void 0;var ll=N(),AX=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,ll.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,ll.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,ll.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,ll.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,ll.generateTypeGuardError)(e,t.identifier,"date-like")),!1};vm.isDateLike=AX});var D0=R(Lm=>{"use strict";Object.defineProperty(Lm,"__esModule",{value:!0});Lm.isBigInt=void 0;var bX=N(),_X=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,bX.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Lm.isBigInt=_X});var fA=R(gA=>{"use strict";Object.defineProperty(gA,"__esModule",{value:!0});gA.isOneOf=kX;var H0=qs();function kX(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,H0.stringify)(t)}) must be one of following values ${e.map(H0.stringify).join(" | ")}`),o}}});var F0=R(yA=>{"use strict";Object.defineProperty(yA,"__esModule",{value:!0});yA.isOneOfTypes=EX;var wX=qs(),TX=rl();function EX(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,wX.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,TX.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var z0=R(hA=>{"use strict";Object.defineProperty(hA,"__esModule",{value:!0});hA.isIntersectionOf=RX;function RX(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var $0=R(SA=>{"use strict";Object.defineProperty(SA,"__esModule",{value:!0});SA.isExtensionOf=CX;function CX(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var U0=R(PA=>{"use strict";Object.defineProperty(PA,"__esModule",{value:!0});PA.isNullOr=LX;var vX=ur();function LX(e){function t(r,o){return r===null?!0:e(r,o)}return(0,vX.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var B0=R(AA=>{"use strict";Object.defineProperty(AA,"__esModule",{value:!0});AA.isUndefinedOr=xX;var IX=ur();function xX(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,IX.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var G0=R(bA=>{"use strict";Object.defineProperty(bA,"__esModule",{value:!0});bA.isNilOr=OX;var WX=ur();function OX(e){function t(r,o){return r==null?!0:e(r,o)}return(0,WX.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var V0=R(_A=>{"use strict";Object.defineProperty(_A,"__esModule",{value:!0});_A.isAsserted=MX;function MX(e){return!0}});var K0=R(kA=>{"use strict";Object.defineProperty(kA,"__esModule",{value:!0});kA.isEnum=NX;var jX=fA();function NX(e){return function(t,r){return(0,jX.isOneOf)(...Object.values(e))(t,r)}}});var q0=R(wA=>{"use strict";Object.defineProperty(wA,"__esModule",{value:!0});wA.isEqualTo=FX;var DX=N(),HX=qs();function FX(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,DX.generateTypeGuardError)(t,r.identifier,`equal to ${(0,HX.stringify)(e)}`)),!1):!0}}});var J0=R(Im=>{"use strict";Object.defineProperty(Im,"__esModule",{value:!0});Im.isRegex=void 0;var zX=N(),$X=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,zX.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Im.isRegex=$X});var X0=R(TA=>{"use strict";Object.defineProperty(TA,"__esModule",{value:!0});TA.isPattern=UX;var Y0=N();function UX(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,Y0.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,Y0.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var Z0=R(EA=>{"use strict";Object.defineProperty(EA,"__esModule",{value:!0});EA.by=BX;function BX(e){return function(t){return e(t,null)}}});var Q0=R(RA=>{"use strict";Object.defineProperty(RA,"__esModule",{value:!0});RA.toNumber=GX;function GX(e){return typeof e=="number"?e:Number(e)}});var eO=R(CA=>{"use strict";Object.defineProperty(CA,"__esModule",{value:!0});CA.toDate=VX;function VX(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var tO=R(vA=>{"use strict";Object.defineProperty(vA,"__esModule",{value:!0});vA.toBoolean=KX;function KX(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var rO=R(xm=>{"use strict";Object.defineProperty(xm,"__esModule",{value:!0});xm.isSymbol=void 0;var qX=N(),JX=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,qX.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};xm.isSymbol=JX});var Xs=R(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.isDateLike=_.isBooleanLike=_.isNumeric=_.isNonPositiveInteger=_.isNonNegativeInteger=_.isNegativeInteger=_.isPositiveInteger=_.isInteger=_.isNegativeNumber=_.isNonPositiveNumber=_.isPositiveNumber=_.isNonNegativeNumber=_.isNonEmptyString=_.isOmit=_.isPick=_.isPartialOf=_.isObjectWithEachItem=_.isNonNullObject=_.isTuple=_.isNonEmptyArrayWithEachItem=_.isNonEmptyArray=_.isArrayWithEachItem=_.isError=_.isIndexSignature=_.isSet=_.isMap=_.isURLSearchParams=_.isURL=_.isFormData=_.isBlob=_.isFileList=_.isFile=_.isFunction=_.isUnknown=_.isString=_.isNumber=_.isNil=_.isDefined=_.isDate=_.isBoolean=_.isAny=_.BrandSymbols=_.isBranded=_.guardWithTolerance=_.isObject=_.isObjectWith=_.isNestedType=_.isShape=_.isSchema=_.isType=void 0;_.isSymbol=_.toBoolean=_.toDate=_.toNumber=_.by=_.generateTypeGuardError=_.isPattern=_.isRegex=_.isEqualTo=_.isEnum=_.isAsserted=_.isNilOr=_.isUndefinedOr=_.isNullOr=_.isExtensionOf=_.isIntersectionOf=_.isOneOfTypes=_.isOneOf=_.isBigInt=void 0;var YX=Xu();Object.defineProperty(_,"isType",{enumerable:!0,get:function(){return YX.isType}});var LA=BW();Object.defineProperty(_,"isSchema",{enumerable:!0,get:function(){return LA.isSchema}});Object.defineProperty(_,"isShape",{enumerable:!0,get:function(){return LA.isShape}});Object.defineProperty(_,"isNestedType",{enumerable:!0,get:function(){return LA.isNestedType}});var XX=GW();Object.defineProperty(_,"isObjectWith",{enumerable:!0,get:function(){return XX.isObjectWith}});var ZX=VW();Object.defineProperty(_,"isObject",{enumerable:!0,get:function(){return ZX.isObject}});var QX=KW();Object.defineProperty(_,"guardWithTolerance",{enumerable:!0,get:function(){return QX.guardWithTolerance}});var e9=qW();Object.defineProperty(_,"isBranded",{enumerable:!0,get:function(){return e9.isBranded}});var t9=JW();Object.defineProperty(_,"BrandSymbols",{enumerable:!0,get:function(){return t9.BrandSymbols}});var r9=YW();Object.defineProperty(_,"isAny",{enumerable:!0,get:function(){return r9.isAny}});var o9=XW();Object.defineProperty(_,"isBoolean",{enumerable:!0,get:function(){return o9.isBoolean}});var n9=ZW();Object.defineProperty(_,"isDate",{enumerable:!0,get:function(){return n9.isDate}});var s9=KP();Object.defineProperty(_,"isDefined",{enumerable:!0,get:function(){return s9.isDefined}});var i9=qu();Object.defineProperty(_,"isNil",{enumerable:!0,get:function(){return i9.isNil}});var a9=rA();Object.defineProperty(_,"isNumber",{enumerable:!0,get:function(){return a9.isNumber}});var l9=QW();Object.defineProperty(_,"isString",{enumerable:!0,get:function(){return l9.isString}});var c9=e0();Object.defineProperty(_,"isUnknown",{enumerable:!0,get:function(){return c9.isUnknown}});var d9=t0();Object.defineProperty(_,"isFunction",{enumerable:!0,get:function(){return d9.isFunction}});var p9=o0();Object.defineProperty(_,"isFile",{enumerable:!0,get:function(){return p9.isFile}});var u9=s0();Object.defineProperty(_,"isFileList",{enumerable:!0,get:function(){return u9.isFileList}});var m9=a0();Object.defineProperty(_,"isBlob",{enumerable:!0,get:function(){return m9.isBlob}});var g9=c0();Object.defineProperty(_,"isFormData",{enumerable:!0,get:function(){return g9.isFormData}});var f9=p0();Object.defineProperty(_,"isURL",{enumerable:!0,get:function(){return f9.isURL}});var y9=m0();Object.defineProperty(_,"isURLSearchParams",{enumerable:!0,get:function(){return y9.isURLSearchParams}});var h9=g0();Object.defineProperty(_,"isMap",{enumerable:!0,get:function(){return h9.isMap}});var S9=f0();Object.defineProperty(_,"isSet",{enumerable:!0,get:function(){return S9.isSet}});var P9=y0();Object.defineProperty(_,"isIndexSignature",{enumerable:!0,get:function(){return P9.isIndexSignature}});var A9=h0();Object.defineProperty(_,"isError",{enumerable:!0,get:function(){return A9.isError}});var b9=sA();Object.defineProperty(_,"isArrayWithEachItem",{enumerable:!0,get:function(){return b9.isArrayWithEachItem}});var _9=iA();Object.defineProperty(_,"isNonEmptyArray",{enumerable:!0,get:function(){return _9.isNonEmptyArray}});var k9=S0();Object.defineProperty(_,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return k9.isNonEmptyArrayWithEachItem}});var w9=A0();Object.defineProperty(_,"isTuple",{enumerable:!0,get:function(){return w9.isTuple}});var T9=Co();Object.defineProperty(_,"isNonNullObject",{enumerable:!0,get:function(){return T9.isNonNullObject}});var E9=b0();Object.defineProperty(_,"isObjectWithEachItem",{enumerable:!0,get:function(){return E9.isObjectWithEachItem}});var R9=_0();Object.defineProperty(_,"isPartialOf",{enumerable:!0,get:function(){return R9.isPartialOf}});var C9=k0();Object.defineProperty(_,"isPick",{enumerable:!0,get:function(){return C9.isPick}});var v9=w0();Object.defineProperty(_,"isOmit",{enumerable:!0,get:function(){return v9.isOmit}});var L9=T0();Object.defineProperty(_,"isNonEmptyString",{enumerable:!0,get:function(){return L9.isNonEmptyString}});var I9=E0();Object.defineProperty(_,"isNonNegativeNumber",{enumerable:!0,get:function(){return I9.isNonNegativeNumber}});var x9=R0();Object.defineProperty(_,"isPositiveNumber",{enumerable:!0,get:function(){return x9.isPositiveNumber}});var W9=C0();Object.defineProperty(_,"isNonPositiveNumber",{enumerable:!0,get:function(){return W9.isNonPositiveNumber}});var O9=v0();Object.defineProperty(_,"isNegativeNumber",{enumerable:!0,get:function(){return O9.isNegativeNumber}});var M9=L0();Object.defineProperty(_,"isInteger",{enumerable:!0,get:function(){return M9.isInteger}});var j9=I0();Object.defineProperty(_,"isPositiveInteger",{enumerable:!0,get:function(){return j9.isPositiveInteger}});var N9=x0();Object.defineProperty(_,"isNegativeInteger",{enumerable:!0,get:function(){return N9.isNegativeInteger}});var D9=W0();Object.defineProperty(_,"isNonNegativeInteger",{enumerable:!0,get:function(){return D9.isNonNegativeInteger}});var H9=O0();Object.defineProperty(_,"isNonPositiveInteger",{enumerable:!0,get:function(){return H9.isNonPositiveInteger}});var F9=M0();Object.defineProperty(_,"isNumeric",{enumerable:!0,get:function(){return F9.isNumeric}});var z9=j0();Object.defineProperty(_,"isBooleanLike",{enumerable:!0,get:function(){return z9.isBooleanLike}});var $9=N0();Object.defineProperty(_,"isDateLike",{enumerable:!0,get:function(){return $9.isDateLike}});var U9=D0();Object.defineProperty(_,"isBigInt",{enumerable:!0,get:function(){return U9.isBigInt}});var B9=fA();Object.defineProperty(_,"isOneOf",{enumerable:!0,get:function(){return B9.isOneOf}});var G9=F0();Object.defineProperty(_,"isOneOfTypes",{enumerable:!0,get:function(){return G9.isOneOfTypes}});var V9=z0();Object.defineProperty(_,"isIntersectionOf",{enumerable:!0,get:function(){return V9.isIntersectionOf}});var K9=$0();Object.defineProperty(_,"isExtensionOf",{enumerable:!0,get:function(){return K9.isExtensionOf}});var q9=U0();Object.defineProperty(_,"isNullOr",{enumerable:!0,get:function(){return q9.isNullOr}});var J9=B0();Object.defineProperty(_,"isUndefinedOr",{enumerable:!0,get:function(){return J9.isUndefinedOr}});var Y9=G0();Object.defineProperty(_,"isNilOr",{enumerable:!0,get:function(){return Y9.isNilOr}});var X9=V0();Object.defineProperty(_,"isAsserted",{enumerable:!0,get:function(){return X9.isAsserted}});var Z9=K0();Object.defineProperty(_,"isEnum",{enumerable:!0,get:function(){return Z9.isEnum}});var Q9=q0();Object.defineProperty(_,"isEqualTo",{enumerable:!0,get:function(){return Q9.isEqualTo}});var eZ=J0();Object.defineProperty(_,"isRegex",{enumerable:!0,get:function(){return eZ.isRegex}});var tZ=X0();Object.defineProperty(_,"isPattern",{enumerable:!0,get:function(){return tZ.isPattern}});var rZ=N();Object.defineProperty(_,"generateTypeGuardError",{enumerable:!0,get:function(){return rZ.generateTypeGuardError}});var oZ=Z0();Object.defineProperty(_,"by",{enumerable:!0,get:function(){return oZ.by}});var nZ=Q0();Object.defineProperty(_,"toNumber",{enumerable:!0,get:function(){return nZ.toNumber}});var sZ=eO();Object.defineProperty(_,"toDate",{enumerable:!0,get:function(){return sZ.toDate}});var iZ=tO();Object.defineProperty(_,"toBoolean",{enumerable:!0,get:function(){return iZ.toBoolean}});var aZ=rO();Object.defineProperty(_,"isSymbol",{enumerable:!0,get:function(){return aZ.isSymbol}})});var Zs,oO,lZ,nO,sO=l(()=>{"use strict";Zs=m(require("node:path")),oO=require("node:url"),lZ=()=>!0,nO=()=>{if(lZ()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Zs.default.dirname(Zs.default.resolve(e)):Zs.default.dirname(Zs.default.resolve(__filename))}return Zs.default.dirname((0,oO.fileURLToPath)(__agentWitchImportMetaUrl))}});var IA,iO,D,aO,cZ,mr,xA,C,cl,gr,WA,dl,An,OA,MA,jA,pl,ge,vo,Wm,qe,Om,M,NA=l(()=>{"use strict";IA=m(require("node:fs")),iO=m(require("node:os")),D=m(require("node:path")),aO=m(Xs());Ie();sO();Iu();Iu();cZ=nO(),mr=e=>e.trim().toLowerCase(),xA=e=>mr(e).replace(/@/g,"-at-").replace(/\./g,"-").replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,""),C=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return D.default.resolve(e);let t=D.default.resolve(cZ),r=D.default.basename(t),o=D.default.basename(D.default.dirname(t));return r===UP&&(o===pr||o===Hr)?D.default.dirname(t):r===pr||r===Hr?t:D.default.join(iO.default.homedir(),pr)},cl=(e=C())=>D.default.join(e,UP),gr=(e=C())=>D.default.join(cl(e),kW),WA=(e,t,r)=>t!==null?D.default.join(e,He,t,r):D.default.join(e,r),dl=e=>WA(e.installDir,e.profileEmail,Za),An=e=>WA(e.installDir,e.profileEmail,zt),OA=e=>D.default.join(e.logsDir,fn),MA=e=>D.default.join(e.logsDir,yn),jA=e=>WA(e.installDir,e.profileEmail,Qa),pl=e=>e.profileEmail!==null?D.default.join(e.installDir,He,e.profileEmail,Eo):D.default.join(e.installDir,Eo),ge=(e=C())=>el(e),vo=(e=C())=>Ro(e)?Ru:Eu,Wm=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return mr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?mr(t):null},qe=(e=C())=>{let t=D.default.join(e,$P);if(!IA.default.existsSync(t))return null;try{let r=JSON.parse(IA.default.readFileSync(t,"utf8"));if((0,aO.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return mr(r.email)}catch{return null}return null},Om=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?mr(r):null}let t=Wm();return t!==null?t:qe()},M=e=>{let t=C(),r=cl(t),o=gr(t),n=Om(e);if(n!==null){let h=D.default.join(t,He,n),y=D.default.join(h,Cu),S=D.default.join(h,Za),u=D.default.join(h,gn.projectDataDir),A=D.default.join(h,zt),T=D.default.join(h,Qa),P=D.default.join(h,Eo),b=D.default.join(h,zt,fn),k=D.default.join(h,zt,yn);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:S,projectDataDir:u,logsDir:A,mainLogPath:b,errorLogPath:k,reportsDir:T,deviceKeypairPath:P,configPath:D.default.join(h,"config.json"),harnessRootDir:y,harnessManifestPath:D.default.join(y,Lu),harnessSetsDir:D.default.join(y,vu)}}let s=D.default.join(t,Cu),i=D.default.join(t,Za),a=D.default.join(t,gn.projectDataDir),c=D.default.join(t,zt),d=D.default.join(t,Qa),p=D.default.join(t,Eo),g=D.default.join(t,zt,fn),f=D.default.join(t,zt,yn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,projectDataDir:a,logsDir:c,mainLogPath:g,errorLogPath:f,reportsDir:d,deviceKeypairPath:p,configPath:D.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:D.default.join(s,Lu),harnessSetsDir:D.default.join(s,vu)}}});var Qs,DA=l(()=>{"use strict";Qs=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535});var dZ,ei,HA=l(()=>{"use strict";dZ=e=>{let t=e?.trim();if(t===void 0||!/^\d+$/.test(t))return null;let r=Number.parseInt(t,10);return r>0&&r<=65535?r:null},ei=e=>e.filePort??dZ(e.envValue)??e.defaultPort});var FA,lO,pZ,ul,ti,cO=l(()=>{"use strict";FA=m(require("node:fs")),lO=m(require("node:path"));Ie();NA();DA();HA();pZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ul=e=>{let t=lO.default.join(e,Xa.wakePort);if(!FA.default.existsSync(t))return null;try{let r=JSON.parse(FA.default.readFileSync(t,"utf8"));if(pZ(r)&&Qs(r.wakePort))return r.wakePort}catch{return null}return null},ti=(e=C())=>ei({filePort:ul(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:vo(e)})});var dO={};Rt(dO,{isAgentWitchLocalInstallDir:()=>Ro,isValidAgentWitchWakePort:()=>Qs,readActiveProfileEmailFromFile:()=>qe,readAgentWitchWakePortFromFile:()=>ul,resolveActiveProfileEmail:()=>Om,resolveActiveProfileEmailFromEnv:()=>Wm,resolveAgentWitchAppBundlePath:()=>gr,resolveAgentWitchAppDir:()=>cl,resolveAgentWitchDefaultWakePort:()=>vo,resolveAgentWitchDeviceKeypairPath:()=>pl,resolveAgentWitchErrorLogPath:()=>MA,resolveAgentWitchInstallDir:()=>C,resolveAgentWitchLaunchAgentPrefix:()=>ge,resolveAgentWitchLocalLayout:()=>M,resolveAgentWitchLogsDir:()=>An,resolveAgentWitchMainLogPath:()=>OA,resolveAgentWitchProjectsDir:()=>dl,resolveAgentWitchReportsDir:()=>jA,resolveAgentWitchRuntimeWakePort:()=>ti,resolveAgentWitchWakePortFromSources:()=>ei,sanitizeProfileEmailForDir:()=>mr,sanitizeProfileEmailForLaunchAgentLabel:()=>xA});var G=l(()=>{"use strict";NA();DA();cO();HA()});var zA,$A,Mm=l(()=>{"use strict";zA=new Set(["","loginwindow","_mbsetupuser","root"]),$A=5e3});var pO,uZ,uO,UA,BA=l(()=>{"use strict";pO=require("node:child_process");Mm();uZ=e=>e.trim().toLowerCase(),uO=e=>e==null?!1:!zA.has(uZ(e)),UA=()=>{if(process.platform!=="darwin")return null;try{let t=(0,pO.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return uO(t)?t:null}catch{return null}}});var gO,mO,$t,ml=l(()=>{"use strict";gO=m(require("node:os"));BA();mO=e=>e.trim().toLowerCase(),$t=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?UA():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??gO.default.userInfo().username;return mO(r)===mO(o)}});var fO,yO,bn,hO=l(()=>{"use strict";fO=require("node:child_process"),yO=m(require("node:fs"));G();ml();bn=(e=C())=>{let t=gr(e);if(!yO.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!$t())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=qe(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,fO.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var GA,Ct,gl,SO=l(()=>{"use strict";GA="AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS",Ct=(e=process.env)=>{let t=e.VITEST;return t===void 0||t.length===0?!0:e[GA]==="1"},gl=e=>`Refusing ${e} host side effects under VITEST (set ${GA}=1 to override).`});var _n=l(()=>{"use strict";SO()});var PO,fl,jm=l(()=>{"use strict";PO=require("node:child_process");_n();fl=e=>{if(process.platform!=="darwin"||!Ct())return;let t=process.getuid?.();if(t!==void 0)try{(0,PO.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Nm,VA,AO,de,Dm,yl=l(()=>{"use strict";Nm=m(require("node:fs")),VA=m(require("node:path"));G();Ie();AO=e=>{let t=VA.default.join(e,He);return Nm.default.existsSync(t)?Nm.default.readdirSync(t).filter(r=>Nm.default.statSync(VA.default.join(t,r)).isDirectory()).map(r=>mr(r)).toSorted():[]},de=(e=C())=>{let t=ge(e),r=AO(e);return[{profileEmail:qe(e)??r[0]??null,launchAgentLabel:t}]},Dm=(e=C())=>AO(e)});var KA,bO,_O,mZ,Fr,Hm=l(()=>{"use strict";KA=m(require("node:fs")),bO=m(require("node:os")),_O=m(require("node:path"));G();yl();mZ=()=>_O.default.join(bO.default.homedir(),"Library","LaunchAgents"),Fr=(e=C())=>{let t=ge(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of de(e))r.add(n.launchAgentLabel);let o=mZ();if(KA.default.existsSync(o))for(let n of KA.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var kO,hl,wO=l(()=>{"use strict";G();jm();Hm();yl();kO=(e=C())=>{let t=new Set(de(e).map(r=>r.launchAgentLabel));return Fr(e).filter(r=>!t.has(r))},hl=(e=C())=>{for(let t of kO(e))fl(t)}});var Sl,qA=l(()=>{"use strict";G();jm();Hm();Sl=(e=C())=>{for(let t of Fr(e))fl(t)}});var TO,EO,gZ,kn,RO=l(()=>{"use strict";TO=require("node:child_process"),EO=require("node:util"),gZ=(0,EO.promisify)(TO.execFile),kn=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await gZ("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var wn,fZ,JA,YA=l(()=>{"use strict";wn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fZ=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,JA=e=>{let t=e.pathValue??fZ(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${wn(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${wn(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${wn(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${wn(e.homeDir)}</string>
    <key>PATH</key>
    <string>${wn(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${wn(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${wn(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var Fm,XA=l(()=>{"use strict";Fm=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Pl,ZA,zm,$m,zr,Um=l(()=>{"use strict";Pl=m(require("node:fs")),ZA=m(require("node:os")),zm=m(require("node:path"));Ie();G();YA();XA();$m=(e,t=ZA.default.homedir())=>zm.default.join(t,"Library","LaunchAgents",`${e}.plist`),zr=e=>{let t=e.installDir??C(),r=e.homeDir??ZA.default.homedir(),o=$m(e.launchAgentLabel,r),n=Pl.default.existsSync(o)?Pl.default.readFileSync(o,"utf8"):null;if(n!==null&&Fm(n))return{ok:!0,rewritten:!1,plistPath:o};let s=JA({launchAgentLabel:e.launchAgentLabel,runPath:zm.default.join(t,_W,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??ti(t)});if(!Fm(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Pl.default.mkdirSync(zm.default.dirname(o),{recursive:!0}),Pl.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var vO,LO,IO,Al,yZ,hZ,CO,Je,QA=l(()=>{"use strict";vO=require("node:child_process"),LO=m(require("node:fs")),IO=require("node:util");G();_n();Um();ml();Al=(0,IO.promisify)(vO.execFile),yZ=async e=>{try{return await Al("launchctl",["print",e]),!0}catch{return!1}},hZ=async(e,t,r)=>{await yZ(t)&&await Al("launchctl",["bootout",t]).catch(()=>{}),await Al("launchctl",["bootstrap",e,r]),await Al("launchctl",["enable",t])},CO=async e=>{try{return await Al("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Je=async(e,t=C())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!Ct())return{ok:!1,errorMessage:gl("launchctl")};if(!$t())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=zr({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await CO(n))return{ok:!0};let i=s.plistPath;if(!LO.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await hZ(o,n,i),await CO(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Tn,xO=l(()=>{"use strict";G();QA();yl();Tn=async(e=C())=>{let t=[];for(let r of de(e))(await Je(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var Bm,ri,WO,OO,MO,jO=l(()=>{"use strict";Bm=require("node:child_process"),ri=m(require("node:fs")),WO="EnvironmentVariables.AGENT_WITCH_WAKE_PORT",OO=e=>{try{return(0,Bm.execFileSync)("plutil",["-extract",WO,"raw","-o","-",e],{encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim()}catch{return null}},MO=(e,t)=>{let r=`${e}.${String(process.pid)}.wake-port.tmp`,{mode:o}=ri.default.statSync(e);try{ri.default.copyFileSync(e,r),(0,Bm.execFileSync)("plutil",["-replace",WO,"-string",String(t),r],{stdio:"ignore"}),(0,Bm.execFileSync)("plutil",["-lint","-s",r],{stdio:"ignore"}),ri.default.chmodSync(r,o&4095),ri.default.renameSync(r,e)}finally{ri.default.rmSync(r,{force:!0})}}});var NO,DO=l(()=>{"use strict";G();NO=e=>Qs(e.filePort)?e.plistValue===null?{kind:"skip-no-entry"}:e.plistValue.trim()===String(e.filePort)?{kind:"noop"}:{kind:"sync",wakePort:e.filePort}:{kind:"skip-invalid"}});var HO,FO,SZ,bl,zO=l(()=>{"use strict";HO=m(require("node:fs")),FO=m(require("node:os"));jO();DO();Um();SZ=(e,t)=>{let r=NO({filePort:t,plistValue:OO(e)});return r.kind!=="sync"?!1:(MO(e,r.wakePort),!0)},bl=e=>{let t=e.homeDir??FO.default.homedir();return[e.launchAgentPrefix,`${e.launchAgentPrefix}-wake`,`${e.launchAgentPrefix}-live`].map(o=>$m(o,t)).filter(o=>HO.default.existsSync(o)).filter(o=>SZ(o,e.wakePort))}});var ht,$r,$O=l(()=>{"use strict";qA();ml();Mm();ht=e=>{$t()||(Sl(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},$r=(e,t=$A)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{$t()||e()},t);return()=>{clearInterval(r)}}});var ie=l(()=>{"use strict";vW();hO();jm();wO();qA();Hm();ml();RO();xO();QA();Um();XA();zO();YA();yl();BA();Mm();$O()});var eb=l(()=>{"use strict";ie()});var UO,BO,Gm,GO,oi,VO,KO,En=l(()=>{"use strict";UO=".agent-witch",BO="memory",Gm="project.json",GO="chunks.ndjson",oi="runs.ndjson",VO="reports",KO=".json"});var qO=l(()=>{"use strict";En()});var JO,Vm,tb=l(()=>{"use strict";JO=m(require("node:path"));qO();Vm=(e,t)=>JO.default.join(e.trim(),`${t.trim()}${KO}`)});var _l,YO,XO=l(()=>{"use strict";_l="agent-witch.js",YO="command"});var Km=l(()=>{"use strict";XO()});var Rn,ZO,QO=l(()=>{"use strict";Km();Rn=e=>`'${e.replace(/'/g,"'\\''")}'`,ZO=e=>{let t=`${e.installDir.trim()}/${"app"}/${_l}`,r=[Rn("node"),Rn(t),"report","write","--key",Rn(e.reportKey.trim()),"--agent-run-id",Rn(e.agentRunId.trim()),"--status",Rn(e.status),"--summary",Rn(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Rn(e.details.trim())),r.join(" ")}});var fr,eM,PZ,rb,qm=l(()=>{"use strict";tb();QO();fr={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},eM=e=>e===fr.COMPLETED||e===fr.FAILED,PZ=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),rb=(e,t)=>{let r=Vm(t.reportsDir,t.reportKey),o=ZO({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:fr.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${PZ({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Ye=l(()=>{"use strict";Ie();G()});var wl,rM,tM,oM,AZ,ni,bZ,nM,Tl,El,ob,sM,iM,Rl=l(()=>{"use strict";wl=m(require("node:fs")),rM=m(require("node:path"));qm();tb();Ye();tM=50,oM=e=>{let t=M(),r=Vm(t.reportsDir,e);return wl.default.mkdirSync(rM.default.dirname(r),{recursive:!0}),r},AZ=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},ni=e=>{let t=oM(e);if(!wl.default.existsSync(t))return null;try{let r=JSON.parse(wl.default.readFileSync(t,"utf8"));return AZ(r)?r:null}catch{return null}},bZ=(e,t)=>{let r=[...e,t];return r.length>tM?r.slice(r.length-tM):r},nM=e=>{let t=oM(e.reportKey);wl.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Tl=e=>{let t=ni(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:bZ(t?.history??[],o)};return nM(n),n},El=e=>{let t=ni(e.reportKey);return t!==null?t:Tl({reportKey:e.reportKey,agentRunId:e.agentRunId,status:fr.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},ob=(e,t)=>{let r=t.trim();if(r.length===0)return ni(e);let o=ni(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return nM(s),s},sM=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},iM=e=>{if(e===null||!eM(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===fr.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var _Z,kZ,Cl,aM,Jm,nb=l(()=>{"use strict";qm();Rl();_Z=new Set(Object.values(fr)),kZ=e=>_Z.has(e),Cl=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},aM=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Jm=e=>{if(e[0]!=="write")return aM(),1;let r=Cl(e,"--key"),o=Cl(e,"--agent-run-id"),n=Cl(e,"--status"),s=Cl(e,"--summary"),i=Cl(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!kZ(n)?(aM(),1):(Tl({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var St,Cn=l(()=>{"use strict";St=()=>!0});var sb,lM,vn,Ym=l(()=>{"use strict";sb=m(require("node:path")),lM=require("node:url");Cn();vn=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=sb.default.resolve(t);return St()?r===sb.default.resolve(__filename):e===void 0?!1:r===(0,lM.fileURLToPath)(e)}});var Xm,si,EZ,jge,ii=l(()=>{"use strict";Xm="agent-witch.js",si="deps.tar.gz",EZ="install.sh",jge={mainScript:`app/${Xm}`,depsArchive:`app/${si}`,installShell:EZ}});var uM=l(()=>{"use strict";ii()});var mM=l(()=>{"use strict";ii();uM()});var vl,ab,Zm,RZ,Ll,Fe,li,Il,xl,Ln,lb=l(()=>{"use strict";vl=m(require("node:fs")),ab=m(require("node:path"));mM();G();Zm="install-version.json",RZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ll=(e=C())=>ab.default.join(e,Zm),Fe=(e=C())=>{let t=Ll(e);if(!vl.default.existsSync(t))return null;try{let r=JSON.parse(vl.default.readFileSync(t,"utf8"));return!RZ(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},li=(e,t=C())=>{let r=Ll(t);vl.default.mkdirSync(ab.default.dirname(r),{recursive:!0}),vl.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Il=(e=C())=>Fe(e)?.bundleVersion??"263",xl=(e,t)=>{let r=Fe(e);if(r!==null)return r;let o={bundleVersion:"263",appOrigin:t,updatedAt:new Date().toISOString()};return li(o,e),o},Ln=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var gM,In,cb,db,pb,Qm,yr,xn,ub=l(()=>{"use strict";gM=require("node:crypto"),In=m(require("node:fs")),cb=m(require("node:path"));G();db="self-update-log.ndjson",pb=100,Qm=(e=C())=>{let t=M(),r=t.installDir===e?t.logsDir:An({installDir:e,profileEmail:t.profileEmail});return cb.default.join(r,db)},yr=(e,t=C())=>{let r={id:(0,gM.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Qm(t);In.default.mkdirSync(cb.default.dirname(o),{recursive:!0});let n=In.default.existsSync(o)?In.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-pb+1)),JSON.stringify(r)];return In.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},xn=(e=20,t=C())=>{let r=Qm(t);if(!In.default.existsSync(r))return[];let o=In.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var mb,Qge,gb=l(()=>{"use strict";ii();mb="deps",Qge=`${"app"}/${si}`});var fM=l(()=>{"use strict";gb()});var yM,Lo,Wn,hM,fb,yb,SM=l(()=>{"use strict";yM=require("node:child_process"),Lo=m(require("node:fs")),Wn=m(require("node:path"));ii();gb();hM=e=>Wn.default.join(e,"app",mb),fb=e=>{let t=Wn.default.join(e,"app"),r=Wn.default.join(t,si);Lo.default.existsSync(r)&&(Lo.default.rmSync(hM(e),{recursive:!0,force:!0}),Lo.default.mkdirSync(t,{recursive:!0}),(0,yM.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Lo.default.rmSync(r,{force:!0}))},yb=e=>{Lo.default.rmSync(Wn.default.join(e,"node_modules"),{recursive:!0,force:!0}),Lo.default.rmSync(Wn.default.join(e,"package.json"),{force:!0}),Lo.default.rmSync(Wn.default.join(e,"package-lock.json"),{force:!0})}});var PM=l(()=>{"use strict";fM();SM()});var Wl,Ol=l(()=>{"use strict";Wl="agent-witch.service"});var AM=l(()=>{"use strict";Ol()});var eg,tg,rg=l(()=>{"use strict";eg="AGENT_WITCH_EXTERNAL_BRIDGE",tg="AGENT_WITCH_EXTERNAL_LIVE"});var bM=l(()=>{"use strict";rg();Ol()});var _M,hb,kM=l(()=>{"use strict";_M=require("node:child_process");Ol();hb=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,_M.spawn)("systemctl",["--user","restart",Wl],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${Wl} exited ${o??"unknown"}`))})})});var wM=l(()=>{"use strict";Ol();AM();bM();kM()});var Pt,og,TM=l(()=>{"use strict";Pt="https://www.agentwitch.com",og="wss://www.agentwitch.com/api/agent-witch/ws"});var Ml,Ur,EM=l(()=>{"use strict";Ml="127.0.0.1",Ur=`http://${Ml}:43347`});var vt=l(()=>{"use strict";TM();EM()});var Ut,ci=l(()=>{"use strict";Ut=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var jl,ng,RM,vZ,Pb,LZ,CM,IZ,_b,xZ,kb,Bt,Nl,Dl,wb,Ab,bb,Hl,Fl,Tb,Eb,di=l(()=>{"use strict";jl=m(require("node:fs")),ng=m(require("node:path"));ci();RM="active-writer-work.json",vZ=1440*60*1e3,Pb=new Set,LZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),CM=e=>e.profileEmail===null?ng.default.join(e.installDir,RM):ng.default.join(e.installDir,"profiles",e.profileEmail,RM),IZ=e=>{let t=CM(e);if(!jl.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(jl.default.readFileSync(t,"utf8"));if(!LZ(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string")return{activeCount:0,updatedAt:new Date(0).toISOString()};let o=Math.max(0,Math.floor(r.activeCount)),n=typeof r.ownerPid=="number"&&Number.isInteger(r.ownerPid)?r.ownerPid:void 0;return{activeCount:o,updatedAt:r.updatedAt,...n!==void 0?{ownerPid:n}:{}}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},_b=(e,t)=>{let r=CM(e);jl.default.mkdirSync(ng.default.dirname(r),{recursive:!0}),jl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},xZ=(e,t={})=>{if(e.activeCount<=0)return!1;let r=t.isPidAlive??Ut;if(e.ownerPid!==void 0&&!r(e.ownerPid))return!0;let o=Date.parse(e.updatedAt);return Number.isNaN(o)?!0:(t.nowMs??Date.now())-o>vZ},kb=e=>{let t=IZ(e);if(!xZ(t))return t;let r={activeCount:0,updatedAt:new Date().toISOString()};try{_b(e,r)}catch{}return r},Bt=e=>kb(e).activeCount>0,Nl=e=>{let t=kb(e);_b(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString(),ownerPid:process.pid})},Dl=e=>{let t=kb(e),r=Math.max(0,t.activeCount-1);if(_b(e,{activeCount:r,updatedAt:new Date().toISOString(),ownerPid:process.pid}),r===0)for(let o of Pb)o()},wb=e=>(Pb.add(e),()=>{Pb.delete(e)}),Ab=null,bb=null,Hl=e=>{Ab=e},Fl=e=>{bb=e},Tb=()=>{let e=Ab;return Ab=null,e},Eb=()=>{let e=bb;return bb=null,e}});var ze,sg=l(()=>{"use strict";ze=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var pi,ig,zl,Rb=l(()=>{"use strict";pi="qwen2.5:7b",ig="nomic-embed-text",zl="Install Ollama from https://ollama.com/download"});var $l,Cb,ag=l(()=>{"use strict";Rb();$l=()=>`
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
    echo "Ollama is missing. ${zl}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${zl}" >&2
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
  agent_witch_ensure_ollama_model "${pi}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${ig}" "\${pull_log}"
}
`,Cb=()=>`
${$l()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var vM,WZ,lg,vb=l(()=>{"use strict";vM=require("node:child_process");G();_n();ag();WZ=e=>new Promise(t=>{if(!Ct()){t({exitCode:1,output:gl("Ollama")});return}let r=(0,vM.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:C()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),lg=async(e=WZ)=>{let t=`${$l()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var Io,cg,LM,OZ,IM,mi,MZ,jZ,NZ,ui,On,Mn,xM=l(()=>{"use strict";Io=m(require("node:fs")),cg=m(require("node:path"));PM();wM();ie();G();ii();vt();lb();di();sg();ub();vb();LM=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),OZ=e=>{let t=qe(e),r=t===null?M():M(t);if(!Io.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Io.default.readFileSync(r.configPath,"utf8"));return!LM(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},IM=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!LM(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},mi=async e=>(await IM(e))?.bundleVersion??null,MZ=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=cg.default.join(t,r);Io.default.mkdirSync(cg.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());Io.default.writeFileSync(n,s),r.endsWith(".js")&&Io.default.chmodSync(n,493)},jZ=async()=>{if(process.platform==="linux"){try{await hb()}catch(e){let t=e instanceof Error?e.message:String(e);console.warn(`[agent-witch-self-update] Linux service restart skipped: ${t}`)}return}hl(),await Tn()},NZ=(e,t)=>e!==null?ze(e):t??Pt,ui=(e,t)=>({localBundleVersion:t,...e}),On=async e=>{let t=C(),r=Fe(t),o=r?.bundleVersion??null,n=await lg();yr({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=OZ(t),i=NZ(s,r?.appOrigin);if(i===null){let d=ui({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return yr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await IM(i);if(a===null){let d=ui({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return yr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||Ln(o,a.bundleVersion))){let d=ui({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return yr({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let f of a.scripts)await MZ(i,t,f);let d=cg.default.join(t,Xm);Io.default.existsSync(d)&&Io.default.rmSync(d,{force:!0}),fb(t),yb(t),li({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=M(qe(t));if(Bt(p)){Fl("install-bundle-update");let f=ui({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return yr({event:"update_applied",ok:!0,message:f.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),f}await jZ();let g=ui({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return yr({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",g=ui({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return yr({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}},Mn=()=>{let e=C();return{local:Fe(e),logs:xn(20,e)}}});var WM={};Rt(WM,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>Zm,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>zl,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>ig,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>pi,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>db,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>pb,appendAgentWitchSelfUpdateLog:()=>yr,buildAgentWitchEnsureOllamaShell:()=>$l,buildAgentWitchInstallScriptOllama:()=>Cb,buildAgentWitchSelfUpdateStatus:()=>Mn,ensureAgentWitchInstallVersionRecorded:()=>xl,ensureAgentWitchOllamaInstalled:()=>lg,fetchAgentWitchRemoteInstallBundleVersion:()=>mi,isRemoteAgentWitchBundleVersionNewer:()=>Ln,readAgentWitchInstallVersion:()=>Fe,readAgentWitchSelfUpdateLogs:()=>xn,resolveAgentWitchAppOriginFromWsUrl:()=>ze,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Il,resolveAgentWitchInstallVersionPath:()=>Ll,resolveAgentWitchSelfUpdateLogPath:()=>Qm,runAgentWitchSelfUpdate:()=>On,writeAgentWitchInstallVersion:()=>li});var hr=l(()=>{"use strict";lb();ub();xM();sg();Rb();ag();vb()});var Lb={};Rt(Lb,{buildAgentWitchSelfUpdateStatus:()=>Mn,fetchAgentWitchRemoteInstallBundleVersion:()=>mi,runAgentWitchSelfUpdate:()=>On});var Ib=l(()=>{"use strict";hr()});function gi(e){return(0,OM.createHash)("sha256").update(e.trim()).digest("hex")}var OM,dg=l(()=>{"use strict";OM=require("node:crypto")});var fi,Ul,DZ,yi,xb,pg=l(()=>{"use strict";fi=m(require("node:fs")),Ul=m(require("node:path"));dg();Ye();DZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yi=e=>{if(!fi.default.existsSync(e))return null;try{let t=JSON.parse(fi.default.readFileSync(e,"utf8"));return!DZ(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:gi(t.pairingToken.trim())}catch{return null}},xb=(e=C())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(yi(Ul.default.join(e,"config.json")));let n=Ul.default.join(e,He);if(!fi.default.existsSync(n))return t;for(let s of fi.default.readdirSync(n)){let i=Ul.default.join(n,s);fi.default.statSync(i).isDirectory()&&o(yi(Ul.default.join(i,"config.json")))}return t}});var hi,Bl=l(()=>{"use strict";hi="connection-health.json"});var jn,ug,HZ,Gl,ve,Wb,mg,$e,gg=l(()=>{"use strict";jn=m(require("node:fs")),ug=m(require("node:path"));Bl();HZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Gl=e=>e.profileEmail===null?ug.default.join(e.installDir,hi):ug.default.join(e.installDir,"profiles",e.profileEmail,hi),ve=e=>{let t=Gl(e);if(!jn.default.existsSync(t))return null;try{let r=JSON.parse(jn.default.readFileSync(t,"utf8"));return!HZ(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},Wb=e=>{let t=Gl(e);jn.default.existsSync(t)&&jn.default.rmSync(t,{force:!0})},mg=(e,t)=>{let r=Gl(e),o=ve(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};jn.default.mkdirSync(ug.default.dirname(r),{recursive:!0}),jn.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},$e=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var Vl,MM=l(()=>{"use strict";Bl();gg();Vl=(e,t)=>{if(!t.socketOpen)return!1;let r=ve(e);return r===null?!1:!$e(r,t.staleAfterMs??12e4,t.nowMs)}});var Ob,jM=l(()=>{"use strict";gg();Ob=(e,t)=>!(e!==null&&!$e(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Nn=l(()=>{"use strict";gg();MM();jM();Bl()});var fg,Mb,FZ,zZ,NM,DM=l(()=>{"use strict";fg=m(require("node:fs")),Mb=m(require("node:path"));G();Ie();Nn();pg();FZ=12e4,zZ=e=>{let t=Mb.default.join(e,He);return fg.default.existsSync(t)?fg.default.readdirSync(t).filter(r=>fg.default.statSync(Mb.default.join(t,r)).isDirectory()):[]},NM=(e=C())=>{let t=null,r=-1;for(let o of zZ(e)){let n=M(o),s=ve(n);if(s===null||$e(s,FZ))continue;let i=yi(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var jb,HM,yg,Kl,ql,$Z,UZ,BZ,FM,_e,ke,hg,Sr,Gt=l(()=>{"use strict";jb=m(require("node:fs")),HM=m(require("node:os")),yg=m(require("node:path")),Kl={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},ql=e=>e.trim().length>0,$Z=e=>{let t=yg.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},UZ=()=>{let e=HM.default.homedir(),t=yg.default.join(e,".local","bin","agent");if(jb.default.existsSync(t))return t;let r=yg.default.join(e,".local","bin","cursor-agent");return jb.default.existsSync(r)?r:Kl.cursorCommand},BZ=e=>{let t=e.trim();return!ql(t)||t===Kl.cursorCommand?UZ():t},FM=(e,t)=>$Z(e)?t:["agent",...t],_e=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ke=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:ql(t)?t.trim():Kl.claudeCommand,codexCommand:ql(r)?r.trim():Kl.codexCommand,cursorCommand:BZ(o),antigravityCommand:ql(n)?n.trim():Kl.antigravityCommand}},hg=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:FM(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Sr=(e,t,r,o)=>{let n=t.trim();if(!ql(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:FM(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"--dangerously-skip-permissions","-p",n]}}});var xo,GZ,Dn,VZ,Si,Jl=l(()=>{"use strict";xo=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,GZ=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:xo(s.inputTokens)+xo(s.outputTokens)+xo(s.cacheReadInputTokens)+xo(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Dn=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=xo(a.input_tokens)+xo(a.cache_creation_input_tokens)+xo(a.cache_read_input_tokens),d=xo(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:GZ(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},VZ=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),Si=(e,t)=>{let r=Dn(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??VZ(r)}}});var Nb,KZ,qZ,Db,Hb=l(()=>{"use strict";Nb=e=>e.toLocaleString("en-US"),KZ=e=>e<.01?e.toFixed(4):e.toFixed(3),qZ=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${KZ(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Nb(e.inputTokens)} in / ${Nb(e.outputTokens)} out (${Nb(e.totalTokens)} total)`,t].join(`
`)},Db=(e,t)=>{if(t===void 0)return e;let r=qZ(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Sg,Fb=l(()=>{"use strict";Sg={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Hn,zb,Pg,$b=l(()=>{"use strict";Fb();Hn="auto",zb=e=>({value:Hn,label:`Auto (${Sg[e]})`}),Pg={anthropic:[zb("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[zb("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[zb("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Pi,Yl,Ag,Ai=l(()=>{"use strict";Fb();$b();Pi=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Hn))return t},Yl=(e,t)=>{let r=Pi(t);return r===void 0?Sg[e]:r},Ag=e=>{let t=Pi(e);return t===void 0?Hn:t}});var bg,JZ,YZ,_g,zM=l(()=>{"use strict";bg={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},JZ=e=>{let t=bg[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?bg["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?bg["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?bg["gemini-2.0-flash"]:null},YZ=(e,t,r)=>{let o=JZ(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},_g=e=>{let t=YZ(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var bi,XZ,ZZ,QZ,kg,$M=l(()=>{"use strict";zM();bi=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),XZ=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=bi(r.input_tokens),n=bi(r.output_tokens);return o===0&&n===0?null:_g({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},ZZ=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=bi(r.prompt_tokens),n=bi(r.completion_tokens);return o===0&&n===0?null:_g({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},QZ=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=bi(r.promptTokenCount),n=bi(r.candidatesTokenCount);return o===0&&n===0?null:_g({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},kg=(e,t,r)=>e==="anthropic"?XZ(t,r):e==="openai"?ZZ(t,r):QZ(t,r)});var eQ,Ub,tQ,rQ,oQ,nQ,sQ,Bb,Gb=l(()=>{"use strict";Ai();$M();eQ=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},Ub=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Yl(e,t.model)},tQ=async e=>{let t=Ub("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=eQ(o);n.length>0&&e.onChunk?.(n);let s=kg("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},rQ=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},oQ=async e=>{let t=Ub("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=rQ(o);n.length>0&&e.onChunk?.(n);let s=kg("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},nQ=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},sQ=async e=>{let t=Ub("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=nQ(n);s.length>0&&e.onChunk?.(s);let i=kg("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},Bb=async e=>{try{return e.provider==="anthropic"?await tQ(e):e.provider==="openai"?await oQ(e):await sQ(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var At,Xl=l(()=>{"use strict";At=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var UM,iQ,wg,Vb=l(()=>{"use strict";UM=m(require("node:path")),iQ="writer-api-secrets.json",wg=e=>UM.default.join(e,iQ)});var Kb,BM,aQ,Wo,lt,Oo=l(()=>{"use strict";Kb=m(require("node:fs"));Ai();Vb();BM=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),aQ=e=>{if(!BM(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=Pi(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},Wo=e=>{let t=wg(e);if(!Kb.default.existsSync(t))return{};try{let r=JSON.parse(Kb.default.readFileSync(t,"utf8"));if(!BM(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=aQ(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},lt=(e,t)=>Wo(e)[t]??null});var Xe,Zl=l(()=>{"use strict";Xe=e=>e==="api"?"api":"cli"});var GM,Be,Fn,Br=l(()=>{"use strict";GM=m(require("node:path"));Xl();Oo();Zl();Be=e=>GM.default.dirname(e),Fn=(e,t)=>{if(Xe(e.writerExecutionBackend)!=="api")return!1;let r=At(t);if(r===null)return!1;let o=Be(e.layout.configPath),n=lt(o,r);return n!==null&&n.apiKey.length>0}});var Ql,qb=l(()=>{"use strict";Hb();Gb();Xl();Oo();Br();Ql=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=At(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Be(e.layout.configPath),a=lt(i,s);if(a===null){let d=Object.keys(Wo(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await Bb({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:Db(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var VM,_i,Jb=l(()=>{"use strict";VM=require("node:child_process");Gt();Jl();qb();Br();_i=(e,t,r)=>new Promise(o=>{if(!_e(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(Fn(e,t)){Ql(e,t,r).then(o);return}let n=Sr(t,r,ke({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,VM.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=Si(i.join("")),p=a.join("").trim(),g=[d.output.trim(),p].filter(f=>f.length>0).join(`
`);o({exitCode:c??-1,output:g})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var KM=l(()=>{"use strict"});var qM=l(()=>{"use strict";Hb();Jb();Gb();KM();Oo();Br()});var JM,YM,XM,ZM=l(()=>{"use strict";JM="claude",YM="codex",XM="cursor"});var QM,lQ,Yb,ec,Tg=l(()=>{"use strict";QM=m(require("node:path"));vt();Ie();lQ="ws://localhost:3000/api/agent-witch/ws",Yb=e=>e.replace(/\/$/,""),ec=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return Yb(t);let r=QM.default.basename(e.installDir);if(r===Ya.production)return og;let o=e.configWsUrl?.trim()??"";return r===Ya.localhost?o.length>0?Yb(o):lQ:o.length>0?Yb(o):og}});var dQ,Xb,Zb=l(()=>{"use strict";ZM();Tg();Zl();dQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Xb=e=>{if(!dQ(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=ec({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??JM,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??YM,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??XM,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Xe(t.writerExecutionBackend),layout:e.layout}}}});var Qb,e_,t_=l(()=>{"use strict";Qb=m(require("node:fs"));G();Zb();e_=e=>{let t=M(e);if(!Qb.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Qb.default.readFileSync(t.configPath,"utf8")),o=Xb({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var tc,ej=l(()=>{"use strict";tc=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var r_,pQ,o_,tj=l(()=>{"use strict";r_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pQ=e=>{if(!r_(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!r_(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(g=>{if(!r_(g))return[];let f=typeof g.itemKey=="string"?g.itemKey.trim():"",h=typeof g.relativePath=="string"?g.relativePath:"",y=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return f.length===0||y.length===0?[]:[{itemKey:f,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},o_=pQ});var rj,uQ,Eg,n_=l(()=>{"use strict";rj=m(require("node:path")),uQ=(e,t)=>{let r=t.trim();return rj.default.join(e,"components","store",r.slice(0,2),r)},Eg=uQ});var oj,mQ,s_,nj=l(()=>{"use strict";oj=m(require("node:fs"));n_();mQ=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Eg(e.installDir,n.contentSha256);oj.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},s_=mQ});var rc,ki,gQ,i_,fQ,a_,l_=l(()=>{"use strict";rc=m(require("node:fs")),ki=m(require("node:path"));n_();gQ=(e,t)=>ki.default.join(e.installDir,"runs",t,"overlay"),i_=(e,t)=>ki.default.join(gQ(e,t),".cursor"),fQ=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=i_(e,t);rc.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Eg(e.installDir,i.contentSha256);if(!rc.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?ki.default.join(n,c):ki.default.join(n,i.itemKey);rc.default.mkdirSync(ki.default.dirname(d),{recursive:!0}),rc.default.copyFileSync(a,d)}return{ok:!0}},a_=fQ});var c_,sj,yQ,oc,ij=l(()=>{"use strict";c_=m(require("node:fs")),sj=m(require("node:path")),yQ=(e,t)=>{let r=sj.default.join(e.installDir,"runs",t);c_.default.existsSync(r)&&c_.default.rmSync(r,{recursive:!0,force:!0})},oc=yQ});var hQ,d_,aj=l(()=>{"use strict";l_();hQ=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=i_(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},d_=hQ});var p_,SQ,PQ,AQ,bQ,_Q,H,lj=l(()=>{"use strict";p_=m(require("node:fs"));Tg();G();Zl();SQ="claude",PQ="codex",AQ="cursor",bQ="agy",_Q=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H=()=>{let e=M();if(!p_.default.existsSync(e.configPath))return null;try{let t=JSON.parse(p_.default.readFileSync(e.configPath,"utf8"));if(!_Q(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=ec({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Xe(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:SQ,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:PQ,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:AQ,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:bQ,pairingToken:s,layout:e}}catch{return null}}});var Rg,cj,dj=l(()=>{"use strict";Rg=m(require("node:fs"));Vb();cj=(e,t)=>{let r=wg(e);Rg.default.mkdirSync(e,{recursive:!0}),Rg.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Rg.default.chmodSync(r,384)}catch{}}});var nc,pj,Cg=l(()=>{"use strict";nc=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},pj=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===nc(t)}});var sc,kQ,u_,m_,uj=l(()=>{"use strict";sc=m(require("node:fs"));Oo();dj();Cg();Ai();Br();kQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),u_=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=pj(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?Pi(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},m_=e=>{let t=Be(e.configPath),r={};if(sc.default.existsSync(e.configPath))try{let n=JSON.parse(sc.default.readFileSync(e.configPath,"utf8"));kQ(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,sc.default.mkdirSync(t,{recursive:!0}),sc.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=u_(u_(u_(Wo(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);cj(t,o)}});var vg,g_=l(()=>{"use strict";vg={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var f_,mj=l(()=>{"use strict";Xl();Oo();Br();Br();f_=(e,t)=>{if(Fn(e,t)||t==="antigravity")return!1;let r=At(t);if(r===null)return!1;let o=Be(e.layout.configPath),n=lt(o,r);return n===null||n.apiKey.trim().length===0}});var gj,y_,h_=l(()=>{"use strict";gj=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},y_=async e=>{let t=gj(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=gj(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var wQ,S_,fj=l(()=>{"use strict";ie();t_();h_();wQ=1e4,S_=()=>y_({listProfileEmails:Dm,readConfig:e_,pollIntervalMs:wQ,logWaiting:e=>{console.error(e)}})});var TQ,P_,yj=l(()=>{"use strict";TQ={accepted:"Restart accepted; Local is restarting.",already_in_progress:"Restart already in progress.",deferred_writer_busy:"Restart deferred until the active writer task finishes.",unsupported:"This Agent Witch Local cannot handle Connect/restart. Update from /download."},P_=e=>({status:e.status,reason:e.reason,message:TQ[e.status]})});var ee=l(()=>{"use strict";Jb();qM();t_();Tg();ej();tj();nj();l_();ij();aj();Zl();lj();uj();Oo();Br();Cg();Ai();g_();qb();Br();mj();Xl();Oo();fj();Zb();h_();yj()});var hj,A_,Sj=l(()=>{"use strict";hj=m(require("node:path"));G();Ie();DM();dg();pg();ee();A_=(e=C())=>{let t=NM(e);if(t!==null)return t;let r=qe(e);if(r!==null){let n=yi(hj.default.join(e,He,r,"config.json"));if(n!==null)return n}let o=H()?.pairingToken.trim()??"";return o.length===0?null:gi(o)}});var Lg,Pj,EQ,RQ,Aj,Ig,ic,xg,ac=l(()=>{"use strict";Lg=m(require("node:fs")),Pj=m(require("node:path")),EQ="wake-port.json",RQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Aj=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Ig=e=>Pj.default.join(e,EQ),ic=e=>{let t=Ig(e);if(!Lg.default.existsSync(t))return null;try{let r=JSON.parse(Lg.default.readFileSync(t,"utf8"));if(RQ(r)&&Aj(r.wakePort))return r.wakePort}catch{return null}return null},xg=(e,t)=>{if(!Aj(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Ig(e);Lg.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var aPe,lPe,cPe,Vt,bj,lc=l(()=>{"use strict";G();ac();Ye();ac();aPe=vo(),lPe=`${ge()}-wake`,cPe=ge(),Vt=()=>{let e=C();return ei({filePort:ic(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:vo(e)})},bj=e=>{let t=C();ic(t)===null&&xg(t,e)}});var _j=l(()=>{"use strict";dg();ie();pg();Sj();ee();lc()});var b_,cc,dc,kj=l(()=>{"use strict";b_=m(require("node:os"));_j();cc=()=>{let e=de();return{ok:!0,port:Vt(),hostname:b_.default.hostname(),profileCount:e.length}},dc=()=>{let e=de(),t=A_(),r=xb();return{hostname:b_.default.hostname(),port:Vt(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var __=l(()=>{"use strict";kj()});var wj,Tj,Ej,Wg,wi=l(()=>{"use strict";wj="materialization.json",Tj="backups",Ej=".gitignore",Wg=e=>`harness-set:${e.trim()}`});var Rj,Cj,Og,vj=l(()=>{"use strict";Rj=m(require("node:crypto")),Cj=m(require("node:fs")),Og=e=>{try{let t=Cj.default.readFileSync(e);return Rj.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Mo,zn,CQ,Lj,k_,Ij=l(()=>{"use strict";Mo=m(require("node:fs")),zn=m(require("node:path"));vj();CQ=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=zn.default.join(t,n,o);return Mo.default.mkdirSync(zn.default.dirname(s),{recursive:!0}),Mo.default.copyFileSync(r,s),zn.default.relative(e,s).replaceAll("\\","/")},Lj=e=>{let t=zn.default.join(e.repoRoot,e.repoRelativeDestination),r=Og(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(Mo.default.existsSync(t)){let n=Og(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=CQ(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Mo.default.mkdirSync(zn.default.dirname(t),{recursive:!0}),Mo.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Mo.default.mkdirSync(zn.default.dirname(t),{recursive:!0}),Mo.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},k_=e=>{let t=Og(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var w_,xj,Ti,Mg=l(()=>{"use strict";w_=m(require("node:fs"));wi();xj=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ti=e=>{if(!w_.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(w_.default.readFileSync(e,"utf8"));if(xj(t)&&t.version===1&&xj(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var jo,jg,Ng,T_=l(()=>{"use strict";jo=m(require("node:fs")),jg=m(require("node:path"));wi();Ng=e=>{let t=new Set(e.setSlugs.map(s=>Wg(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=jg.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=jg.default.join(e.repoRoot,i.backupPath);jo.default.existsSync(c)?(jo.default.mkdirSync(jg.default.dirname(a),{recursive:!0}),jo.default.copyFileSync(c,a),o.push(s)):jo.default.existsSync(a)&&jo.default.rmSync(a,{force:!0})}else jo.default.existsSync(a)&&jo.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var E_,Ei,Dg=l(()=>{"use strict";E_=m(require("node:path"));wi();Ei=e=>({ledgerFilePath:E_.default.join(e.metaDirPath,wj),backupsDirPath:E_.default.join(e.metaDirPath,Tj)})});var R_,Wj,Oj=l(()=>{"use strict";R_=m(require("node:path")),Wj=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return R_.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return R_.default.posix.join(s,e,n)}});var C_,Mj,uc,v_=l(()=>{"use strict";C_=m(require("node:fs")),Mj=m(require("node:path")),uc=(e,t)=>{C_.default.mkdirSync(Mj.default.dirname(e),{recursive:!0}),C_.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var L_,vQ,Ze,No=l(()=>{"use strict";L_=m(require("node:os")),vQ=e=>{let t=e.trim();return t.startsWith("~/")?`${L_.default.homedir()}${t.slice(1)}`:t==="~"?L_.default.homedir():t},Ze=vQ});var Hg,jj,LQ,Nj,Dj=l(()=>{"use strict";Hg=m(require("node:fs")),jj=m(require("node:path"));wi();En();LQ=`*
!${Gm}
`,Nj=e=>{let t=jj.default.join(e,Ej);Hg.default.existsSync(t)||(Hg.default.mkdirSync(e,{recursive:!0}),Hg.default.writeFileSync(t,LQ))}});var $n,Lt,Un=l(()=>{"use strict";$n=m(require("node:path"));En();No();Lt=e=>{let t=Ze(e),r=$n.default.join(t,UO);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:$n.default.join(r,"rag"),memoryDirPath:$n.default.join(r,BO),reportsDirPath:$n.default.join(r,VO),metaFilePath:$n.default.join(r,Gm),ragChunksFilePath:$n.default.join(r,"rag",GO)}}});var Pr,Fj,IQ,xQ,st,Fg=l(()=>{"use strict";Pr=m(require("node:fs")),Fj=m(require("node:path"));En();Dj();Un();IQ=(e,t)=>{if(Pr.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Pr.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},xQ=e=>{Pr.default.existsSync(e.ragChunksFilePath)||Pr.default.writeFileSync(e.ragChunksFilePath,"");let t=Fj.default.join(e.memoryDirPath,oi);Pr.default.existsSync(t)||Pr.default.writeFileSync(t,"")},st=e=>{let t=Lt(e.projectFolderPath);return Pr.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Pr.default.mkdirSync(t.ragDirPath,{recursive:!0}),Pr.default.mkdirSync(t.memoryDirPath,{recursive:!0}),Nj(t.metaDirPath),IQ(t,e),xQ(t),{ok:!0,layout:t}}});var zj,$j,Uj,Bj,zg,$g=l(()=>{"use strict";zj="components",$j="store",Uj="versions",Bj="installed.json",zg=e=>`harness-set:${e.trim()}`});var I_,Gj,Ug,x_=l(()=>{"use strict";I_=m(require("node:fs")),Gj=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ug=e=>{if(!I_.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(I_.default.readFileSync(e,"utf8"));if(Gj(t)&&t.version===1&&Gj(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var mc,Ri,Bg=l(()=>{"use strict";mc=m(require("node:path"));$g();Ri=e=>{let t=mc.default.join(e,zj);return{componentsRootDir:t,storeDir:mc.default.join(t,$j),versionsDir:mc.default.join(t,Uj),installedFilePath:mc.default.join(t,Bj)}}});var W_,Vj,Gg,Vg,Kg=l(()=>{"use strict";W_=m(require("node:crypto")),Vj=m(require("node:fs")),Gg=e=>W_.default.createHash("sha256").update(e,"utf8").digest("hex"),Vg=e=>{try{let t=Vj.default.readFileSync(e);return W_.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var O_,Kj,qj,Jj=l(()=>{"use strict";O_=m(require("node:fs")),Kj=m(require("node:path")),qj=(e,t)=>{O_.default.mkdirSync(Kj.default.dirname(e),{recursive:!0}),O_.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var M_,j_,Yj,Xj=l(()=>{"use strict";M_=m(require("node:fs")),j_=m(require("node:path")),Yj=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=j_.default.join(e,r),n=j_.default.join(o,`${t.versionId}.json`);M_.default.mkdirSync(o,{recursive:!0}),M_.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var qg,Zj,Qj,eN=l(()=>{"use strict";qg=m(require("node:fs")),Zj=m(require("node:path"));Kg();Qj=e=>{let t=Gg(e.content),r=Zj.default.join(e.storeDir,t);return qg.default.existsSync(r)||(qg.default.mkdirSync(e.storeDir,{recursive:!0}),qg.default.writeFileSync(r,e.content)),t}});var N_,tN,WQ,Jg,D_=l(()=>{"use strict";N_=m(require("node:fs")),tN=m(require("node:path"));$g();x_();Bg();Kg();Jj();Xj();eN();WQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Jg=e=>{let t=Ri(e.installDir),r=zg(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!WQ(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=tN.default.join(e.harnessRootDir,a);if(!N_.default.existsSync(c))continue;let d=N_.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Vg(c);if(p!==null){if(Gg(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);Qj({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;Yj(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=Ug(t.installedFilePath);qj(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var F_,H_,rN,oN=l(()=>{"use strict";F_=m(require("node:fs"));D_();x_();Bg();H_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rN=e=>{if(!F_.default.existsSync(e.harnessManifestPath))return;let t=Ri(e.installDir),r=Ug(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(F_.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!H_(o)||o.version!==1||!H_(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!H_(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Jg({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var z_,nN,sN,iN=l(()=>{"use strict";z_=m(require("node:fs")),nN=m(require("node:path")),sN=e=>{let t=e.componentId.replaceAll("/","_"),r=nN.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!z_.default.existsSync(r))return null;try{let o=JSON.parse(z_.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Yg,Xg,aN,lN=l(()=>{"use strict";Yg=m(require("node:fs")),Xg=m(require("node:path"));$g();oN();iN();Bg();Kg();aN=e=>{rN({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Ri(e.layout.installDir),r=zg(e.setSlug),o=sN({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Xg.default.join(t.storeDir,i.contentSha256);if(Yg.default.existsSync(a)&&Vg(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Xg.default.join(e.layout.harnessRootDir,n):Xg.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Yg.default.existsSync(s))return null;try{if(!Yg.default.statSync(s).isFile())return null}catch{return null}return s}});var cN,OQ,$_,Ar,gc=l(()=>{"use strict";Mg();Dg();Un();cN="harness-set:",OQ=e=>{let t=e.trim();if(!t.startsWith(cN))return null;let r=t.slice(cN.length).trim();return r.length>0?r:null},$_=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=OQ(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Ar=e=>{let t=Lt(e),{ledgerFilePath:r}=Ei(t),o=Ti(r);return $_(o)}});var Zg,U_,fc,MQ,Gr,yc,Ci=l(()=>{"use strict";Zg=m(require("node:fs")),U_=m(require("node:os")),fc=m(require("node:path")),MQ=()=>Zg.default.realpathSync(fc.default.resolve(U_.default.homedir())),Gr=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?fc.default.join(U_.default.homedir(),t.slice(1)):t,o;try{o=Zg.default.realpathSync(fc.default.resolve(r))}catch{return null}let n=MQ();return o===n||o.startsWith(`${n}${fc.default.sep}`)?o:null},yc=e=>{let t=Gr(e);if(t===null)return null;try{if(!Zg.default.statSync(t).isFile())return null}catch{return null}return t}});var B_,G_=l(()=>{"use strict";B_=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var ef,dN,Qg,jQ,hc,V_=l(()=>{"use strict";ef=m(require("node:fs")),dN=m(require("node:path"));wi();Ij();Mg();T_();Dg();Oj();v_();No();Fg();lN();gc();Ci();G_();Qg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jQ=e=>{if(!ef.default.existsSync(e))return null;try{let t=JSON.parse(ef.default.readFileSync(e,"utf8"));if(Qg(t)&&t.version===1)return t}catch{return null}return null},hc=e=>{let t=[...new Set(e.setSlugs.map(A=>A.trim()).filter(A=>A.length>0))],r=Ze(e.projectFolderPath),o=Gr(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=ef.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=st({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Ei(s.layout),d=Ar(o).filter(A=>!t.includes(A)),p=Ti(i),g=0;if(d.length>0){let A=Ng({repoRoot:o,setSlugs:d,ledger:p});p=A.ledger,g=A.summary.removedPaths.length}if(t.length===0)return uc(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:[]};let f=jQ(e.layout.harnessManifestPath);if(f===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=Qg(f.sets)?f.sets:{},y=0,S=0,u=0;for(let A of t){let T=h[A];if(!Qg(T))return{ok:!1,errorMessage:`Harness set "${A}" is not installed locally.`};let P=typeof T.version=="number"?String(T.version):"1",b=Wg(A),k=Array.isArray(T.items)?T.items:[];for(let E of k){if(!Qg(E))continue;let w=typeof E.path=="string"?E.path.trim():"";if(w.length===0)continue;let x=B_(w);if(x===null)continue;let I=Wj(A,x),j=dN.default.posix.join(".cursor",I).replaceAll("\\","/"),O=typeof E.id=="string"?E.id.trim():"",$=aN({layout:e.layout,setSlug:A,setVersion:typeof T.version=="number"?T.version:1,manifestItemPath:w,manifestItemId:O});if($===null)continue;let B=Lj({repoRoot:o,backupsDir:a,repoRelativeDestination:j,sourceAbsolutePath:$,componentId:b,versionId:P,ledger:p});if(B.kind==="skipped_unchanged"){S+=1;continue}if(B.kind==="backed_up_user_file"){u+=1,y+=1,p={version:1,entries:{...p.entries,[j]:k_({componentId:b,versionId:P,sourceAbsolutePath:$,backupPath:B.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[j]:k_({componentId:b,versionId:P,sourceAbsolutePath:$})}}}}return y===0&&S===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(uc(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:S,backedUpFileCount:u,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:t})}});var pN,tf,NQ,DQ,HQ,FQ,zQ,$Q,UQ,BQ,GQ,Sc,rf=l(()=>{"use strict";pN=m(require("node:crypto")),tf=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},NQ=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},DQ=(e,t)=>{let r=NQ(t),o=tf(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},HQ=(e,t,r)=>{let o=DQ(t,r);return`shared/items/${e}/${o}`},FQ=["rules","skills","commands","instructions","agents"],zQ=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),$Q=(e,t)=>[...e.filter(o=>o.id!==t.id),t],UQ=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},BQ=e=>pN.default.createHash("sha256").update(e,"utf8").digest("hex"),GQ=e=>({id:e.id,kind:e.kind,title:e.title,path:HQ(e.id,e.kind,e.title),contentSha256:BQ(e.content)}),Sc=e=>{let t=new Date().toISOString(),r=e.existingManifest??zQ(e.hostname,t),o=tf(e.bundle.slug),n=UQ(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...FQ.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let g=GQ(p);return{files:[...d.files,{relativePath:g.path,content:p.content}],nextItems:$Q(d.nextItems,g)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var Do,uN,of,VQ,Bn,K_=l(()=>{"use strict";Do=m(require("node:fs")),uN=m(require("node:os")),of=m(require("node:path"));rf();VQ=e=>{if(!Do.default.existsSync(e))return null;try{let t=JSON.parse(Do.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Bn=e=>{try{let t=VQ(e.layout.harnessManifestPath),r=Sc({bundle:e.bundle,hostname:uN.default.hostname(),existingManifest:t});Do.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)Do.default.mkdirSync(of.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=of.default.join(e.layout.harnessRootDir,o.relativePath);Do.default.mkdirSync(of.default.dirname(n),{recursive:!0}),Do.default.writeFileSync(n,o.content)}return Do.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var q_,mN=l(()=>{"use strict";K_();V_();q_=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=Bn({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return hc({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var gN,fN=l(()=>{"use strict";gN=["rule","skill","command","instruction","agent"]});var yN,KQ,qQ,br,J_=l(()=>{"use strict";fN();yN=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),KQ=e=>typeof e=="string"&&gN.includes(e),qQ=e=>{if(!yN(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!KQ(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},br=e=>{if(!yN(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=qQ(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var hN,JQ,Y_,SN=l(()=>{"use strict";hN=require("node:zlib");J_();JQ="x-agent-witch-token",Y_=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[JQ]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,hN.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=br(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var Z_,X_,_r,PN=l(()=>{"use strict";Z_=m(require("node:fs")),X_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_r=e=>{if(!Z_.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(Z_.default.readFileSync(e.harnessManifestPath,"utf8"));if(!X_(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=X_(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!X_(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var nf,AN=l(()=>{"use strict";nf=()=>"~"});var bN,_N,kN=l(()=>{"use strict";bN=require("node:crypto"),_N=e=>`local-${(0,bN.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var Q_,wN=l(()=>{"use strict";Q_=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Pc,sf,ek=l(()=>{"use strict";Pc=m(require("node:path")),sf=e=>{let t=Pc.default.dirname(e),r=Pc.default.basename(t);return r==="agents"?Pc.default.basename(Pc.default.dirname(t)):r}});var Ac,Vr,TN,YQ,XQ,ZQ,af,EN,tk=l(()=>{"use strict";Ac=m(require("node:fs")),Vr=m(require("node:path"));kN();wN();ek();TN=new Set(["node_modules",".git","dist","build",".next","coverage"]),YQ=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},XQ=(e,t)=>{let r=Vr.default.basename(t);if(e==="skill"){let o=t.split(Vr.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},ZQ=e=>{let t=[],r=(n,s)=>{let i;try{i=Ac.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&TN.has(a.name))continue;let c=Vr.default.join(n,a.name),d=s?Vr.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;Q_(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=Vr.default.join(e,n);Ac.default.existsSync(s)&&r(s,n)}let o=Vr.default.join(e,"skills");return Ac.default.existsSync(o)&&r(o,"skills"),t},af=e=>{let t=ZQ(e);if(t.length===0)return null;let r=Vr.default.dirname(e),o=sf(e),n=YQ(o),s=t.map(i=>{let a=Q_(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:_N(i.absolutePath),kind:a,title:XQ(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},EN=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Ac.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||TN.has(a.name))continue;let c=Vr.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var RN,rk,QQ,ok,CN=l(()=>{"use strict";RN=m(require("node:fs")),rk=m(require("node:path"));tk();Ci();QQ=e=>{let t=Gr(e.trim());if(t===null)return null;if(rk.default.basename(t)===".cursor")return t;let r=rk.default.join(t,".cursor");try{if(RN.default.statSync(r).isDirectory())return Gr(r)}catch{return null}return null},ok=e=>{let t=QQ(e.projectPath);if(t===null)return null;let r=af(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var vN,eee,lf,nk,LN=l(()=>{"use strict";vN=m(require("node:path"));tk();Ci();ek();eee=5,lf=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},nk=e=>{let t=Gr(e.scanRoot.trim());if(t===null)return lf(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of EN(t,eee,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=Gr(s);if(i===null)continue;let a=sf(i);lf(e.response,"folder",{cursorDir:i,groupName:a,repoPath:vN.default.dirname(i)});let c=af(i);c!==null&&(r.push(c),lf(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return lf(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var IN,xN,WN=l(()=>{"use strict";IN=m(require("node:path")),xN=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:IN.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var it,ON,sk,tee,ik,ak,cf,lk,bc,MN=l(()=>{"use strict";it=m(require("node:fs")),ON=m(require("node:os")),sk=m(require("node:path"));rf();D_();Ci();WN();tee=e=>{if(!it.default.existsSync(e))return null;try{let t=JSON.parse(it.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},ik=e=>{let t=e.hostname??ON.default.hostname(),r=tee(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let g=yc(p.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let f=it.default.readFileSync(g,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:f,setSlugs:[i.slug]})}let d=Sc({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{it.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)it.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=sk.default.join(e.layout.harnessRootDir,i.relativePath);it.default.mkdirSync(sk.default.dirname(a),{recursive:!0}),it.default.writeFileSync(a,i.content)}it.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=tf(i.slug),d=r.sets[c];d!==void 0&&Jg({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},ak="reveal-cache.json",cf=(e,t)=>{it.default.mkdirSync(e.harnessRootDir,{recursive:!0}),it.default.writeFileSync(`${e.harnessRootDir}/${ak}`,`${JSON.stringify(t,null,2)}
`)},lk=e=>{let t=`${e.harnessRootDir}/${ak}`;it.default.existsSync(t)&&it.default.unlinkSync(t)},bc=e=>{let t=`${e.harnessRootDir}/${ak}`;if(!it.default.existsSync(t))return null;try{let r=JSON.parse(it.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return xN(r)}catch{return null}return null}});var Ho=l(()=>{"use strict";V_();mN();G_();K_();SN();J_();rf();PN();AN();CN();Ci();LN();MN()});var ck,jN=l(()=>{"use strict";Ho();Ye();ck=e=>{let t=M(e.profileEmail);return Bn({bundle:e.bundle,layout:t})}});var NN=l(()=>{"use strict";jN();Ho()});var ree,DN,oee,HN,Gn,df,FN=l(()=>{"use strict";ree=["agentwitch.com","www.agentwitch.com"],DN=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,oee=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},HN=e=>{let t=oee(e);return!!(ree.includes(t)||DN.test(e.trim().toLowerCase()))},Gn=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return HN(r)?DN.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},df=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Gn(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var _c=l(()=>{"use strict";FN()});var Kr,kc=l(()=>{"use strict";Kr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var wc,zN=l(()=>{"use strict";NN();_c();kc();wc=e=>{if(!Kr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=br(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Gn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=ck({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var dk=l(()=>{"use strict";zN()});var nee,vi,pk=l(()=>{"use strict";nee=e=>e==="hourly"||e==="daily"||e==="weekdays",vi=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!nee(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Tc,pf,$N,UN,uk,Kt,uf,mf,gf,ff,yf=l(()=>{"use strict";Tc=m(require("node:fs")),pf=m(require("node:path"));pk();$N="automations.json",UN=e=>e.profileEmail!==null?pf.default.join(e.installDir,"profiles",e.profileEmail,$N):pf.default.join(e.installDir,$N),uk=()=>({version:1,automations:[]}),Kt=e=>{let t=UN(e);if(!Tc.default.existsSync(t))return uk();try{let r=JSON.parse(Tc.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?uk():{version:1,automations:r.automations.flatMap(n=>{let s=vi(n);return s!==null?[s]:[]})}}catch{return uk()}},uf=(e,t)=>{let r=UN(e);Tc.default.mkdirSync(pf.default.dirname(r),{recursive:!0}),Tc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},mf=(e,t)=>{uf(e,{version:1,automations:t})},gf=(e,t)=>{let o=Kt(e).automations.filter(n=>n.id!==t.id);uf(e,{version:1,automations:[...o,t]})},ff=(e,t)=>Kt(e).automations.find(r=>r.id===t)??null});var ae,It=l(()=>{"use strict";ae="x-agent-witch-token"});var mk=l(()=>{"use strict";sg();ag()});var V,Vn,gk,Ec,fk,see,yk,Rc,Kn,hk,qr=l(()=>{"use strict";It();mk();V=e=>{let t=ze(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Vn=e=>({[ae]:e,"Content-Type":"application/json"}),gk=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Vn(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Ec=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Vn(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},fk=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Vn(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},see=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},yk=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:Vn(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Rc=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:Vn(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return see(r)}catch{return null}},Kn=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:Vn(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},hk=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Vn(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var qn,BN,GN,iee,Sk,VN,Pk=l(()=>{"use strict";qn=m(require("node:fs")),BN=m(require("node:path")),GN=e=>BN.default.join(e.harnessRootDir,"projects-registry.json"),iee=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),Sk=e=>{let t=GN(e);if(!qn.default.existsSync(t))return[];try{let r=JSON.parse(qn.default.readFileSync(t,"utf8"));return iee(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},VN=e=>{let t=GN(e);if(!qn.default.existsSync(t))return;let r=`${t}.migrated`;if(qn.default.existsSync(r)){qn.default.unlinkSync(t);return}qn.default.renameSync(t,r)}});var KN,aee,lee,qN,JN=l(()=>{"use strict";No();KN=e=>Ze(e),aee=e=>new Set(e.map(t=>KN(t.folderPath))),lee=e=>new Set(e.map(t=>t.id)),qN=(e,t)=>{let r=aee(t),o=lee(t),n=[],s=new Set;for(let i of e){let a=KN(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var Ak,bk=l(()=>{"use strict";qr();Pk();JN();Ak=async(e,t)=>{let r=Sk(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=V({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Rc(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=qN(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await yk(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&VN(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var _k,qt,Li=l(()=>{"use strict";_k=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),qt=(e,t)=>e.find(r=>r.id===t)??null});var kr,Ii=l(()=>{"use strict";qr();bk();Li();kr=async(e,t)=>{t!==void 0&&await Ak(t,e);let r=V({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Rc(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=_k(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var YN=l(()=>{"use strict"});var kk,cee,hf,wk=l(()=>{"use strict";kk=m(require("node:fs"));Un();cee=e=>{let t=Lt(e);if(!kk.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(kk.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},hf=cee});var Tk,Ek,XN=l(()=>{"use strict";Tk=m(require("node:path"));No();wk();Ek=e=>{let t=Tk.default.resolve(Ze(e)),r=o=>{let{projectId:n}=hf(o);if(n!==null)return n;let s=Tk.default.dirname(o);return s===o?null:r(s)};return r(t)}});var dee,pee,Sf,Rk=l(()=>{"use strict";dee="Default",pee=e=>e.trim().toLowerCase()===dee.toLowerCase(),Sf=pee});var Ck,vk,Lk,we,Ik=l(()=>{"use strict";Ck=["block","warn","info"],vk=["seed","project","retired"],Lk="warn",we={symptom:120,cause:200,avoidance:280,checkValue:280,keyword:40,keywords:24,tag:32,tags:12,id:64}});var xk,Jr,ZN,QN,Wk,Fo,eD=l(()=>{"use strict";Ik();xk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Jr=e=>typeof e=="string"?e:null,ZN=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],QN=e=>{if(!xk(e))return null;let t=Jr(e.id)?.trim()??"",r=Jr(e.symptom)?.trim()??"";if(t.length===0||r.length===0)return null;let o=vk.find(d=>d===e.source)??"project",n=Ck.find(d=>d===e.severity)??Lk,s=xk(e.check)?e.check:null,i=s?.kind==="command"?"command":"id",a=Jr(s?.value)?.trim()??"",c=Jr(e.projectId)?.trim()??null;return{id:t,projectId:c!==null&&c.length>0?c:null,symptom:r,cause:Jr(e.cause)?.trim()??"",avoidance:Jr(e.avoidance)?.trim()??"",check:{kind:i,value:a.length>0?a:t},keywords:ZN(e.keywords),tags:ZN(e.tags),source:o,overridesSeed:e.overridesSeed===!0,hitCount:typeof e.hitCount=="number"&&Number.isFinite(e.hitCount)?Math.max(0,Math.floor(e.hitCount)):0,lastSeenAt:Jr(e.lastSeenAt),updatedAt:Jr(e.updatedAt),severity:n}},Wk=e=>!xk(e)||!Array.isArray(e.pitfalls)?null:{items:e.pitfalls.map(t=>QN(t)).filter(t=>t!==null),syncedAt:Jr(e.syncedAt)},Fo=e=>e.filter(t=>t.source!=="retired").length});var Jn,Ok=l(()=>{"use strict";Jn=e=>e.replace(/\s+/g," ").trim()});var zo,Mk=l(()=>{"use strict";zo=e=>Math.ceil(e.length/4)});var Pf,tD=l(()=>{"use strict";Mk();Pf=(e,t)=>{if(t<=0)return"";if(zo(e)<=t)return e;let r=t*4;return e.slice(0,r).trimEnd()}});var Cc,rD=l(()=>{"use strict";Ok();Cc=e=>`${Jn(e.id)}|${Jn(e.avoidance)}`});var oD=l(()=>{"use strict"});var Jt=l(()=>{"use strict";Ik();eD();Ok();Mk();tD();rD();oD()});var Af,bf,_f=l(()=>{"use strict";Af={save:"/project/pitfalls/save",retire:"/project/pitfalls/retire",restore:"/project/pitfalls/restore"},bf=e=>{let t=Object.entries(Af).find(([,r])=>r===e);return t===void 0?null:t[0]}});var nD,fe,iD,mee,jk,Nk,sD,gee,fee,vc,Dk,yee,hee,See,aD,lD=l(()=>{"use strict";Jt();_f();nD="new",fe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),iD={block:"Must fix",warn:"Warning",info:"Note"},mee={seed:"Built-in",project:"This project",retired:"Retired"},jk=6e4,Nk=60*jk,sD=24*Nk,gee=(e,t)=>{if(e===null)return"Never hit";let r=new Date(e).getTime();if(Number.isNaN(r))return"Never hit";let o=Math.max(0,t-r);if(o<jk)return"Last hit just now";if(o<Nk)return`Last hit ${Math.floor(o/jk)} min ago`;if(o<sD)return`Last hit ${Math.floor(o/Nk)}h ago`;let n=Math.floor(o/sD);return n<30?`Last hit ${n} ${n===1?"day":"days"} ago`:`Last hit ${new Date(r).toISOString().slice(0,10)}`},fee=e=>{if(e===null)return"Not updated yet";let t=new Date(e).getTime();return Number.isNaN(t)?"Not updated yet":`Updated ${new Date(t).toISOString().slice(0,10)}`},vc=(e,t)=>`/project?${new URLSearchParams({id:e,tab:"pitfalls",...t}).toString()}`,Dk=e=>e?{retired:"1"}:{},yee=e=>{let{item:t}=e,r=t?.severity??"warn",o=t?.check.kind==="command"?t.check.value:"",n=t===null?"Add pitfall":"Edit pitfall",s=t?.source==="seed"?'<p class="muted">This is a built-in pitfall. Your changes apply to this project only.</p>':"",i=a=>`<option value="${a}"${r===a?" selected":""}>${iD[a]}</option>`;return`<form method="POST" action="${e.postPaths.save}" class="stack pitfall-form" aria-label="${n}" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
      <p class="field-label">${n}</p>
      ${s}
      <input type="hidden" name="projectId" value="${fe(e.projectId)}" />
      <input type="hidden" name="pitfallId" value="${fe(t?.id??"")}" />
      <input type="hidden" name="tags" value="${fe((t?.tags??[]).join(", "))}" />
      ${e.showRetired?'<input type="hidden" name="showRetired" value="1" />':""}
      <label class="stack">
        <span>Title</span>
        <input type="text" name="symptom" required maxlength="${we.symptom}" value="${fe(t?.symptom??"")}" placeholder="What goes wrong, in one line" />
      </label>
      <label class="stack">
        <span>Fix</span>
        <textarea name="avoidance" required maxlength="${we.avoidance}" rows="3" placeholder="What to do instead">${fe(t?.avoidance??"")}</textarea>
      </label>
      <label class="stack">
        <span>Why it happens</span>
        <textarea name="cause" required maxlength="${we.cause}" rows="2" placeholder="What leads to this trap">${fe(t?.cause??"")}</textarea>
      </label>
      <label class="stack">
        <span>Triggers</span>
        <input type="text" name="keywords" value="${fe((t?.keywords??[]).join(", "))}" placeholder="Words that point to this trap, separated by commas" />
      </label>
      <label class="stack">
        <span>How to check <span class="muted">(optional)</span></span>
        <input type="text" name="checkCommand" class="mono" maxlength="${we.checkValue}" value="${fe(o)}" placeholder="A command that shows the trap, like npm run lint" />
      </label>
      <label class="stack">
        <span>How serious</span>
        <select name="severity">${i("block")}${i("warn")}${i("info")}</select>
      </label>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Save pitfall</button>
        <a class="btn btn-secondary" href="${fe(vc(e.projectId,Dk(e.showRetired)))}">Cancel</a>
      </div>
    </form>`},hee=e=>{let{item:t,projectId:r,showRetired:o}=e,n=t.source==="retired",s=`<input type="hidden" name="projectId" value="${fe(r)}" />
            <input type="hidden" name="pitfallId" value="${fe(t.id)}" />
            ${o?'<input type="hidden" name="showRetired" value="1" />':""}`,i=n?`<form method="POST" action="${e.postPaths.restore}" class="inline-form" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-secondary btn-compact" type="submit">Bring back</button>
          </form>`:`<a class="btn btn-secondary btn-compact" href="${fe(vc(r,{...Dk(o),edit:t.id}))}">Edit</a>
          <form method="POST" action="${e.postPaths.retire}" class="inline-form" onsubmit="if(!confirm('Retire this pitfall? You can bring it back later.'))return false;this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-danger btn-compact" type="submit">Retire</button>
          </form>`,a=t.keywords.length>0?`<p class="muted">Triggers: ${t.keywords.map(c=>fe(c)).join(", ")}</p>`:"";return`<li class="harness-installed-set pitfall-row${n?" pitfall-row-retired":""}" data-pitfall-id="${fe(t.id)}">
        <p><strong>${fe(t.symptom)}</strong> <span class="muted">\xB7 ${iD[t.severity]} \xB7 ${mee[t.source]}</span></p>
        <p>Fix: ${fe(t.avoidance)}</p>
        ${a}
        <p class="muted">${fe(gee(t.lastSeenAt,e.nowMs))}</p>
        <p class="muted">${fe(fee(t.updatedAt))}</p>
        <div class="actions">${i}</div>
      </li>`},See=e=>{let t=e.postPaths??Af;if(e.list===null||!e.list.ok)return'<p class="empty">Could not load pitfalls. Check this Mac on Status, then reload.</p>';let r=e.nowMs??Date.now(),o=e.list.items,n=Fo(o),s=n>=64,i=e.showRetired?o:o.filter(f=>f.source!=="retired"),a=e.editId===null?null:e.editId===nD?s?null:{item:null}:(()=>{let f=o.find(h=>h.id===e.editId&&h.source!=="retired");return f===void 0?null:{item:f}})(),c=a===null?"":yee({projectId:e.projectId,item:a.item,showRetired:e.showRetired,postPaths:t}),d=s?`<p class="muted">${64} of ${64} active. Retire one to add another.</p>`:`<a class="btn btn-primary" href="${fe(vc(e.projectId,{...Dk(e.showRetired),edit:nD}))}">Add pitfall</a>`,p=e.showRetired?`<a class="btn btn-secondary" href="${fe(vc(e.projectId,{}))}">Hide retired</a>`:`<a class="btn btn-secondary" href="${fe(vc(e.projectId,{retired:"1"}))}">Show retired</a>`,g=i.length===0?'<p class="empty">No pitfalls for this project. Add one when you spot a mistake that keeps coming back.</p>':`<ul class="harness-installed-set-list">${i.map(f=>hee({projectId:e.projectId,item:f,showRetired:e.showRetired,nowMs:r,postPaths:t})).join("")}</ul>`;return`<section class="stack">
      <p class="lede">Pitfalls are known traps in this project. Each one says what goes wrong and how to avoid it.</p>
      <p class="muted">${n} of ${64} active</p>
      <div class="actions">${a===null?d:""}${p}</div>
      ${c}
      ${g}
    </section>`},aD=See});var re,cD,Pee,Aee,bee,_ee,kee,$o,kf=l(()=>{"use strict";Rk();Jt();lD();re=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cD=(e,t)=>e.length===0?`<p class="empty">${re(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${re(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${re(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,Pee=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,Aee=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from Agent Witch Cloud.":"This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${re(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},bee=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
        <p><strong>${re(r)}</strong> <span class="muted">already in this repo</span></p>
        <form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this Mac.');">
          <input type="hidden" name="projectId" value="${re(e.project.id)}" />
          <input type="hidden" name="setSlug" value="${re(r)}" />
          <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
        </form>
      </li>`).join("")}</ul>`;return e.boundHarnessCount>0?`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Nothing is installed in the Mac profile \u2014 refresh from Agent Witch Cloud only if you need an update.</p>
        ${t}
        <form method="POST" action="/projects/pull-bound-harness" class="actions">
          <input type="hidden" name="projectId" value="${re(e.project.id)}" />
          <button class="btn btn-secondary" type="submit">Refresh in repo\u2026</button>
        </form>
      </div>`:`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Open Harness to install playbooks on this Mac if you want to change them.</p>
        ${t}
        <div class="actions">
          <a class="btn btn-secondary" href="/harness">Open Harness</a>
        </div>
      </div>`},_ee=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?bee({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?Aee({project:e.project,alreadyInRepo:!1}):Pee();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",a=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),p=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this Mac.');">
            <input type="hidden" name="projectId" value="${re(e.project.id)}" />
            <input type="hidden" name="setSlug" value="${re(c.slug)}" />
            <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
          </form>`:"";return`<li class="harness-installed-set">
          <label class="check-row">
            <input form="link-harness-form" type="checkbox" name="applySet" value="${re(c.slug)}"${t.size===0||d?" checked":""} />
            <span><strong>${re(c.name)}</strong> <span class="muted mono">(${re(c.slug)})</span></span>
          </label>
          <p class="muted">${c.itemCount} item(s)${d?' \xB7 <span class="muted">in repo</span>':""}</p>
          ${p}
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
      </div>`},kee=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${re(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${re(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},$o=e=>{let t=e.flashError?`<div class="alert-error">${re(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${re(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(f,h)=>`<a class="project-tab${e.activeTab===f?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${f}">${re(h)}</a>`,n=e.composition?.items.filter(f=>f.kind==="workflow")??[],s=e.composition?.items.filter(f=>f.kind==="agent")??[],i=(()=>{switch(e.activeTab){case"harness":return _ee({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0});case"workflows":return cD(n,"No workflows installed for this project yet.");case"agents":return cD(s,"No agents installed for this project yet.");case"knowledge":return kee({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});case"pitfalls":return aD({projectId:e.project.id,list:e.pitfalls??null,showRetired:e.pitfallsShowRetired??!1,editId:e.pitfallsEditId??null});default:return e.activeTab}})(),a=e.pitfalls!==void 0&&e.pitfalls!==null&&e.pitfalls.ok?`Pitfalls (${Fo(e.pitfalls.items)})`:"Pitfalls",c=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,d=`${c}?rename=1`,p=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${re(c)}" target="_blank" rel="noopener noreferrer">Open in Agent Witch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${re(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,g=Sf(e.project.name)?"":`<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from Agent Witch Cloud only. The folder on this Mac is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from Agent Witch Cloud? Your repo folder on this Mac will stay.');">
          <input type="hidden" name="projectId" value="${re(e.project.id)}" />
          <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
      </section>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${re(e.project.name)}</h1>
      <p class="muted mono">${re(e.project.projectFolderPath)}</p>
      ${p}
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
    </section>${g}`}});var wee,Tee,dD,pD=l(()=>{"use strict";Ho();It();wee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Tee=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!wee(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=br(n);return s===null?[]:[s]})}catch{return null}},dD=Tee});var uD,Hk,mD=l(()=>{"use strict";ee();Ho();kf();Ii();pD();Li();gc();qr();vt();uD=e=>({kind:"page",title:e.project.name,body:$o({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:_r(e.layout),linkedSetSlugs:Ar(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),Hk=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=H();if(r===null)return{kind:"not_found"};let o=await kr(r,e.layout),n=qt(o.projects,t);if(n===null)return{kind:"not_found"};let s=V({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??Pt,a=s===null?null:await dD(s,n.id);if(a===null)return uD({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=q_({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return uD({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await Kn(s,n.id,c.appliedSetSlugs),p=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${p.toString()}`}}});var gD,Fk,fD=l(()=>{"use strict";ee();Ho();vt();qr();kf();Fg();No();Ii();Li();gc();Mg();T_();Dg();v_();gD=e=>({kind:"page",title:e.project.name,body:$o({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:_r(e.layout),linkedSetSlugs:Ar(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),Fk=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=H();if(n===null)return{kind:"not_found"};let s=await kr(n,e.layout),i=qt(s.projects,r);if(i===null)return{kind:"not_found"};let a=V({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=a?.appOrigin??Pt;if(o.length===0)return gD({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=Ze(i.projectFolderPath),p=st({projectFolderPath:d}),{ledgerFilePath:g}=Ei(p.layout),f=Ti(g),h=$_(f);if(!h.includes(o))return gD({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let y=h.filter(T=>T!==o),S=Ng({repoRoot:p.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:f});uc(g,S.ledger);let u=a===null?!1:await Kn(a,i.id,y),A=new URLSearchParams({linked:"1",removed:o,files:String(S.summary.removedPaths.length),bindingsSynced:u?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${A.toString()}`}}});var Eee,Ree,yD,Cee,vee,Lc,zk=l(()=>{"use strict";Jt();It();Eee=1e4,Ree=15e3,yD=(e,t,r)=>{let o=`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/pitfalls`;return r===void 0?o:`${o}/${encodeURIComponent(r)}`},Cee=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return t.errorMessage==="limit_exceeded"||t.code==="limit_exceeded"},vee=(e,t=fetch)=>({listPitfalls:async(r,o)=>{try{let n=new URL(yD(e.appOrigin,r));n.searchParams.set("includeRetired",o.includeRetired?"1":"0");let s=await t(n.toString(),{method:"GET",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(Eee)});if(!s.ok)return{ok:!1,reason:"unavailable"};let i=Wk(await s.json());return i===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:i.items,syncedAt:i.syncedAt}}catch{return{ok:!1,reason:"unavailable"}}},upsertPitfall:async(r,o)=>{try{let n=await t(yD(e.appOrigin,r),{method:"PUT",headers:{[ae]:e.pairingToken,"content-type":"application/json"},body:JSON.stringify(o),signal:AbortSignal.timeout(Ree)});if(n.ok)return{ok:!0};if(n.status===409){let s=await n.json().catch(()=>null);return{ok:!1,reason:Cee(s)?"active_limit":"rejected"}}return n.status===400?{ok:!1,reason:"rejected"}:{ok:!1,reason:n.status>=500?"unavailable":"rejected"}}catch{return{ok:!1,reason:"unavailable"}}}}),Lc=vee});var $k,hD,Lee,Iee,xee,Wee,SD,PD=l(()=>{"use strict";Jt();$k=e=>e.replace(/\s+/g," ").trim(),hD=(e,t,r)=>{let o=new Set,n=[];for(let s of e.split(/[,\n]/)){let i=$k(s).slice(0,r).toLowerCase();i.length>0&&!o.has(i)&&(o.add(i),n.push(i))}return n.slice(0,t)},Lee=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40).replace(/-+$/g,""),Iee=(e,t)=>{let r=Lee(e);return`project-${r.length>0?r:"pitfall"}-${t}`.slice(0,we.id).replace(/-+$/g,"")},xee=e=>e==="block"||e==="info"?e:"warn",Wee=e=>{let{form:t}=e,r=$k(t.get("symptom")??""),o=(t.get("avoidance")??"").trim(),n=(t.get("cause")??"").trim(),s=$k(t.get("checkCommand")??"");if(r.length===0||o.length===0||n.length===0||r.length>we.symptom||o.length>we.avoidance||n.length>we.cause||s.length>we.checkValue)return{ok:!1};let i=(t.get("pitfallId")??"").trim(),a=i.length>0?i:Iee(r,e.randomSuffix());return{ok:!0,pitfall:{id:a,symptom:r,cause:n,avoidance:o,check:s.length>0?{kind:"command",value:s}:{kind:"id",value:a},keywords:hD(t.get("keywords")??"",we.keywords,we.keyword),tags:hD(t.get("tags")??"",we.tags,we.tag),source:"project",severity:xee(t.get("severity"))}}},SD=Wee});var bD,Oee,Yr,AD,wf,Mee,jee,_D,kD=l(()=>{"use strict";bD=require("node:crypto");Jt();PD();_f();Oee=()=>(0,bD.randomBytes)(3).toString("hex"),Yr=(e,t,r={})=>{let o=new URLSearchParams({tab:"pitfalls",...r,pitfall:t});return`/project?id=${encodeURIComponent(e)}&${o.toString()}`},AD=(e,t)=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:t}),wf=new Map,Mee=async(e,t)=>{let r=wf.get(e)??Promise.resolve(),o,n=new Promise(i=>{o=i}),s=r.catch(()=>{}).then(()=>n);wf.set(e,s),await r.catch(()=>{});try{return await t()}finally{o(),wf.get(e)===s&&wf.delete(e)}},jee=async e=>{let t=(e.form.get("pitfallId")??"").trim(),r=`${e.projectId}:${t||"__new__"}`;return Mee(r,async()=>{let{projectId:o,store:n}=e,s=e.form.get("showRetired")==="1"?{retired:"1"}:{};if(n===null)return Yr(o,"unavailable",s);let i=await n.listPitfalls(o,{includeRetired:!0});if(!i.ok)return Yr(o,"unavailable",s);if(e.action==="save"){let d=SD({form:e.form,randomSuffix:e.randomSuffix??Oee});if(!d.ok)return Yr(o,"invalid",s);let p=i.items.find(h=>h.id===d.pitfall.id);if((p===void 0||p.source==="retired")&&Fo(i.items)>=64)return Yr(o,"limit",s);let f=await n.upsertPitfall(o,d.pitfall);return Yr(o,f.ok?"saved":f.reason==="active_limit"?"limit":f.reason,s)}let a=i.items.find(d=>d.id===t);if(a===void 0)return Yr(o,"missing",s);if(e.action==="restore"){if(a.source==="retired"&&Fo(i.items)>=64)return Yr(o,"limit",s);let d=await n.upsertPitfall(o,AD(a,"project"));return Yr(o,d.ok?"restored":d.reason==="active_limit"?"limit":d.reason,s)}let c=await n.upsertPitfall(o,AD(a,"retired"));return Yr(o,c.ok?"retired":c.reason==="active_limit"?"limit":c.reason,s)})},_D=jee});var Tf,wD,TD,Uk=l(()=>{"use strict";Tf=new Map,wD=async e=>{let t=e.nowMs??Date.now(),r=e.ttlMs??3e4,o=Tf.get(e.projectId);if(o!==void 0&&o.includeRetired===e.includeRetired&&t-o.fetchedAtMs<r)return o.result;let n=await e.store.listPitfalls(e.projectId,{includeRetired:e.includeRetired});return n.ok&&Tf.set(e.projectId,{result:n,includeRetired:e.includeRetired,fetchedAtMs:t}),n},TD=e=>{if(e===void 0){Tf.clear();return}Tf.delete(e)}});var Bk,ED=l(()=>{"use strict";ee();qr();Ii();Li();zk();kD();Uk();Bk=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=H();if(o===null)return{kind:"not_found"};let n=await kr(o,e.layout),s=qt(n.projects,r);if(s===null)return{kind:"not_found"};let i=V({wsUrl:o.wsUrl,pairingToken:o.pairingToken}),a=e.createStore??Lc,c=i===null?null:a(i),d=await _D({action:e.action,form:t,projectId:s.id,store:c});return TD(s.id),{kind:"redirect",location:d}}});var Nee,Gk,RD=l(()=>{"use strict";Nee=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,Gk=Nee});var CD=l(()=>{"use strict"});var vD=l(()=>{"use strict"});var LD=l(()=>{"use strict";CD();vD()});var Dee,Uo,ID=l(()=>{"use strict";Dee=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],Uo=(e=process.env)=>{let t={...e};for(let r of Dee)delete t[r];return t}});var xD=l(()=>{"use strict";ID()});var Vk,WD=l(()=>{"use strict";Vk={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var Kk=l(()=>{"use strict";WD()});var Ef,qk=l(()=>{"use strict";Ef={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",DEVICE_RESTART_ACK:"device.restart.ack",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status",PROJECT_MESSAGE_HISTORY:"project.message.history"}});var Rf=l(()=>{"use strict";LD();xD();vt();Kk();qk()});var OD,MD,Hee,Cf,vf,jD=l(()=>{"use strict";OD=require("node:child_process"),MD=require("node:util");Rf();Hee=(0,MD.promisify)(OD.execFile),Cf=async(e,t)=>{try{let{stdout:r}=await Hee("git",t,{cwd:e,env:Uo(),maxBuffer:1048576});return r.trim()}catch{return null}},vf=async e=>{let t=await Cf(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await Cf(e,["rev-parse","--abbrev-ref","HEAD"]),o=await Cf(e,["status","--porcelain"]),n=await Cf(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var Jk,ND=l(()=>{"use strict";Jk=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var Fee,Yk,DD=l(()=>{"use strict";Fee=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},Yk=Fee});var zee,Xk,HD=l(()=>{"use strict";It();zee=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[ae]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},Xk=zee});var FD,Bo,zD=l(()=>{"use strict";FD=require("node:child_process"),Bo=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,FD.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var $D=l(()=>{"use strict";Ii()});var Ic,UD=l(()=>{"use strict";It();Ic=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[ae]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var Zk,BD=l(()=>{"use strict";It();Zk=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var GD,$ee,Xr,Qk,ew=l(()=>{"use strict";GD=e=>{let t=JSON.parse(e);return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]},$ee=e=>e===""?null:e,Xr=e=>e??"",Qk=e=>({id:e.id,projectId:$ee(e.project_id),symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:{kind:e.check_kind,value:e.check_value},keywords:GD(e.keywords_json),tags:GD(e.tags_json),source:e.source,hitCount:e.hit_count,lastSeenAt:e.last_seen_at,severity:e.severity})});var VD,Uee,Bee,tw,xi,Lf,xc=l(()=>{"use strict";ew();VD=`
  SELECT p.project_id, p.id, p.symptom, p.cause, p.avoidance,
    p.check_kind, p.check_value, p.keywords_json, p.tags_json,
    p.source, p.severity,
    COALESCE(h.hit_count, 0) AS hit_count,
    h.last_seen_at AS last_seen_at
  FROM pitfalls p
  LEFT JOIN pitfall_hits h
    ON h.project_id = ? AND h.pitfall_id = p.id
  WHERE p.project_id = ?`,Uee=e=>e,Bee=e=>e??null,tw=(e,t,r=t)=>Uee(e.prepare(VD).all(Xr(r),Xr(t))).map(Qk),xi=(e,t,r,o=t)=>{let n=Bee(e.prepare(`${VD} AND p.id = ?`).get(Xr(o),Xr(t),r));return n===null?null:Qk(n)},Lf=(e,t)=>{e.prepare(`INSERT INTO pitfalls (
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
      severity = excluded.severity`).run(Xr(t.projectId),t.id,t.symptom,t.cause,t.avoidance,t.check.kind,t.check.value,JSON.stringify(t.keywords),JSON.stringify(t.tags),t.source,t.severity)}});var If,rw=l(()=>{"use strict";Jt();If=e=>e.map(t=>({id:Jn(t.id),avoidance:Jn(t.avoidance)}))});var ow,KD,xf=l(()=>{"use strict";ow=e=>{let t=new Map;e.seeds.forEach(o=>{t.set(o.id,o)}),e.projectRows.forEach(o=>{t.set(o.id,o)});let r=[...t.values()];return e.includeRetired===!0?r:r.filter(o=>o.source!=="retired")},KD=e=>e.filter(t=>t.source!=="retired").length});var Yn,qD,Wc=l(()=>{"use strict";Jt();rw();xc();xf();Yn=(e,t={})=>{let r=t.projectId??null,o=tw(e,null,r),n=r===null||r===""?[]:tw(e,r);return ow({seeds:o,projectRows:n,includeRetired:t.includeRetired===!0})},qD=(e,t={})=>{let r=Yn(e,t);return t.format==="bot"?{format:"bot",items:If(r),lines:r.map(o=>Cc(o))}:{format:"full",items:r}}});var Wf,nw=l(()=>{"use strict";xc();Wc();Wf=(e,t)=>{let r=t.id.trim();if(r.length===0)return null;let o=t.projectId??null;return o===null||o===""?xi(e,null,r):Yn(e,{projectId:o,includeRetired:!0}).find(s=>s.id===r)??null}});var sw=l(()=>{"use strict"});var Go,Wi,JD,YD,XD=l(()=>{"use strict";Go=e=>({type:"string",description:e}),Wi={name:"check_context",description:"Match the current prompt against project pitfalls. Call on the first user message. Returns hit, miss, or none. Miss stays silent.",inputSchema:{type:"object",properties:{cwd:Go("Absolute working directory for the current session."),message:Go("User prompt or task text to match."),sessionId:Go("Optional session id for first-message tracking."),projectId:Go("Optional project id when already known.")},additionalProperties:!1}},JD={name:"get_context",description:"Compact project briefing: id, folder, and feature flags. Not a full docs dump.",inputSchema:{type:"object",properties:{cwd:Go("Absolute working directory."),projectId:Go("Optional project id when already known.")},additionalProperties:!1}},YD={name:"get_pitfalls",description:"List or search project pitfalls in a short bot-friendly form.",inputSchema:{type:"object",properties:{projectId:Go("Project id."),q:Go("Optional search text."),limit:{type:"number",description:"Max rows to return."}},additionalProperties:!1}}});var Xn,ZD,QD,eH=l(()=>{"use strict";Xn=e=>({type:"string",description:e}),ZD={name:"get_skill",description:"Read one project skill by id or search. Same idea as the cloud skill tools.",inputSchema:{type:"object",properties:{projectId:Xn("Project id."),skillId:Xn("Skill id when known."),q:Xn("Optional search text.")},required:["projectId"],additionalProperties:!1}},QD={name:"record_outcome",description:"Record whether a tip or preflight check helped. Pitfall wins call the cloud hit route.",inputSchema:{type:"object",properties:{projectId:Xn("Project id."),kind:{type:"string",description:"pitfall | preflight | other"},pitfallId:Xn("Pitfall id when kind is pitfall."),preflightId:Xn("Preflight check id when kind is preflight."),ok:{type:"boolean",description:"Whether the step helped."},notes:Xn("Optional short note. No secret values.")},required:["projectId","kind","ok"],additionalProperties:!1}}});var tH=l(()=>{"use strict";XD();eH()});var iw,rH=l(()=>{"use strict";Jt();sw();iw=e=>{let t=Pf("Agent Witch tip \xB7 check_context",120);if(zo(t)>=120)return t;let r=[t],o=zo(t);for(let n of e){if(r.length-1>=4)break;let s=Cc(n),i=zo(s);if(o+i>120){if(r.length===1){let a=120-o,c=Pf(s,a);c.length>0&&(r.push(c),o+=zo(c));continue}continue}r.push(s),o+=i}return r.join(`
`)}});var oH=l(()=>{"use strict";Jt()});var Mf=l(()=>{"use strict";sw();tH();rH();oH()});var Gee,Vee,aw,lw=l(()=>{"use strict";Mf();Gee=e=>e.toLowerCase(),Vee=(e,t)=>{let r=Gee(e);return t.reduce((o,n)=>{let s=n.trim().toLowerCase();return s.length===0?o:r.includes(s)?o+1:o},0)},aw=e=>{let t=e.pitfalls.map(r=>({pitfall:r,score:Vee(e.text,r.keywords)})).filter(r=>r.score>0).sort((r,o)=>o.score-r.score||r.pitfall.id.localeCompare(o.pitfall.id));return t.length===0?[]:t.slice(0,4).map(r=>r.pitfall)}});var nH,sH=l(()=>{"use strict";Wc();lw();nH=(e,t)=>{let r=Yn(e,{projectId:t.projectId,includeRetired:!1});return aw({pitfalls:r,text:t.text})}});var jf,Nf,Df,Oi,Hf,Mc,cw=l(()=>{"use strict";Jt();jf=we.symptom,Nf=we.cause,Df=we.avoidance,Oi=64,Hf="token-saver.db",Mc=1});var iH,jc=l(()=>{"use strict";cw();iH=3e3});var aH,lH=l(()=>{"use strict";jc();aH=`
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
`});var cH,dH,pH,Kee,qee,uH,mH,gH=l(()=>{"use strict";cH=m(require("node:fs")),dH=m(require("node:path")),pH=require("node:sqlite");jc();lH();Kee=e=>{let t=e.prepare("SELECT value FROM pitfall_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},qee=(e,t)=>{e.prepare(`INSERT INTO pitfall_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},uH=e=>{cH.default.mkdirSync(dH.default.dirname(e),{recursive:!0});let t=new pH.DatabaseSync(e);return t.exec(`PRAGMA busy_timeout = ${iH}`),t.exec(aH),Kee(t)<Mc&&qee(t,Mc),t},mH=e=>{e.close()}});var fH,yH,dw=l(()=>{"use strict";ew();fH=(e,t,r,o)=>{let n=e.prepare(`INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(project_id, pitfall_id) DO UPDATE SET
         hit_count = pitfall_hits.hit_count + 1,
         last_seen_at = excluded.last_seen_at
       RETURNING hit_count, last_seen_at`).get(Xr(t),r,o);return{hitCount:n.hit_count,lastSeenAt:n.last_seen_at}},yH=(e,t,r)=>{let o=e.prepare(`SELECT hit_count, last_seen_at FROM pitfall_hits
       WHERE project_id = ? AND pitfall_id = ?`).get(Xr(t),r);return o===void 0?{hitCount:0,lastSeenAt:null}:{hitCount:o.hit_count,lastSeenAt:o.last_seen_at}}});var hH,SH=l(()=>{"use strict";nw();dw();hH=(e,t)=>{let r=t.id.trim(),o=r.length===0?null:Wf(e,{projectId:t.projectId,id:r});if(o===null)return{ok:!1,reason:"not_found"};let n=t.nowIso??new Date().toISOString(),s=fH(e,t.projectId,o.id,n);return{ok:!0,pitfall:{...o,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt}}}});var pw,Nc,uw=l(()=>{"use strict";pw=m(require("node:path"));Ie();jc();Nc=e=>e.profileEmail!==null?pw.default.join(e.installDir,He,e.profileEmail,Hf):pw.default.join(e.installDir,Hf)});var AH,PH=l(()=>{AH=[{id:"arch-max-lines",symptom:"ci:architecture fails at land (handler >100 / test >100 effective lines)",cause:"Max-effective-lines=100 only enforced late",avoidance:"Run `npm run ci:architecture` before tipping Arch",check:{kind:"command",value:"npm run ci:architecture"},keywords:["architecture","land","ci:architecture","max-effective","lines"],tags:["architecture","ci"]},{id:"symlink-node-modules",symptom:'Turbopack: "points out of the filesystem root"',cause:"Mac worktree with symlinked node_modules",avoidance:"APFS clone: `cp -Rc` (not symlink) into worktree",check:{kind:"id",value:"pit.symlink-node-modules"},keywords:["build","turbopack","symlink","node_modules","filesystem root"],tags:["build"]},{id:"install-bundle-clobber",symptom:"Missing/broken public/install/agent-witch/app/deps.tar.gz or agent-witch.js after build",cause:"Build overwrites install bundle artifacts",avoidance:"Restore those two paths after `build`",check:{kind:"command",value:"test -f public/install/agent-witch/app/deps.tar.gz && test -f public/install/agent-witch/app/agent-witch.js"},keywords:["build","deps.tar.gz","agent-witch.js","install bundle","clobber"],tags:["build","awi"]},{id:"stale-next",symptom:"Typecheck fails spuriously",cause:"Stale .next",avoidance:"`rm -rf .next` then typecheck",check:{kind:"id",value:"pit.stale-next"},keywords:["build","typecheck",".next","stale","turbopack"],tags:["build"]},{id:"main-moved-rebase",symptom:"FF/SHIP fails; main advanced",cause:"main moved between SHIP and FF",avoidance:"`git fetch`; pure-rebase onto new `-rN` branch; **never** force-push",check:{kind:"id",value:"pit.main-moved-rebase"},keywords:["ship","ff","push","rebase","main moved","force-push"],tags:["git"]},{id:"health-lag",symptom:"Declare done on exit 0 / HTTP 200 too early",cause:"Deploy health lags ~1\u20132 min after push",avoidance:"Poll until health `commitSha` == main tip + smoke",check:{kind:"id",value:"pf.health-matches-main"},keywords:["ship","ff","push","health","commitSha","deploy"],tags:["deploy"]},{id:"dirty-home-checkout",symptom:"Accidental reset/clean of ~/daily-magic",cause:"Home checkout left dirty",avoidance:"Use `/tmp` worktrees; never reset/clean home",check:{kind:"id",value:"pit.dirty-home-checkout"},keywords:["reset","clean","home checkout","daily-magic","worktree"],tags:["git"]},{id:"box-no-gh-auth",symptom:"Push from box fails",cause:"Box git has no GitHub auth",avoidance:"Push from the Mac",check:{kind:"id",value:"pit.box-no-gh-auth"},keywords:["ship","ff","push","box","github","auth"],tags:["git"]},{id:"ci-yml-main-only",symptom:"Expecting GH Actions on non-main push",cause:"Old ci.yml push trigger covered only main; CI being removed \u2014 gate is local suite",avoidance:"Run local `npm run ci` (or suite subset); do not wait on Actions",check:{kind:"id",value:"pit.local-suite-gate"},keywords:["ci","actions","github actions","npm run ci","main only"],tags:["ci"]},{id:"secrets-in-logs",symptom:"Secrets printed in logs/CLI",cause:"Verbose dump of env/files",avoidance:"Print existence / path / fingerprint only",check:{kind:"id",value:"pit.secrets-in-logs"},keywords:["secrets","logs","token","keypair","env","fingerprint"],tags:["secrets"]},{id:"no-prs-daily-magic",symptom:"PR windows opened in Mac Chrome",cause:"Habit from other repos",avoidance:"No PRs for daily-magic; never open PR UI",check:{kind:"id",value:"pit.no-prs"},keywords:["pr","pull request","chrome","daily-magic"],tags:["git"]}]});var Yee,Xee,mw,gw=l(()=>{"use strict";PH();Yee=AH,Xee=e=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags??[],projectId:null,source:"seed",hitCount:0,lastSeenAt:null,severity:"warn"}),mw=()=>Yee.map(Xee)});var bH,_H=l(()=>{"use strict";gw();xc();bH=e=>mw().reduce((r,o)=>xi(e,null,o.id)!==null?r:(Lf(e,o),r+1),0)});var kH,wH,TH=l(()=>{"use strict";jc();kH=e=>e.id.trim().length===0?{kind:"empty_id"}:e.projectId.trim().length===0?{kind:"empty_project_id"}:e.symptom.length>jf?{kind:"field_too_long",field:"symptom",max:jf}:e.cause.length>Nf?{kind:"field_too_long",field:"cause",max:Nf}:e.avoidance.length>Df?{kind:"field_too_long",field:"avoidance",max:Df}:null,wH=e=>e.activeCountAfter>Oi?{kind:"active_cap",max:Oi}:null});var EH,RH=l(()=>{"use strict";xc();dw();Wc();xf();TH();EH=(e,t)=>{let r=kH(t);if(r!==null)return{ok:!1,error:r};let o=t.id.trim(),n=xi(e,t.projectId,o),s=yH(e,t.projectId,o),i=t.source??"project",a={id:o,projectId:t.projectId,symptom:t.symptom,cause:t.cause,avoidance:t.avoidance,check:t.check,keywords:t.keywords,tags:t.tags??[],source:i,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt,severity:t.severity??n?.severity??"warn"},d=Yn(e,{projectId:t.projectId,includeRetired:!0}).filter(f=>f.id!==a.id),p=KD([...d,a]),g=wH({activeCountAfter:p});return g!==null?{ok:!1,error:g}:(Lf(e,a),{ok:!0,pitfall:a})}});var Mi,fw=l(()=>{"use strict";nw();Wc();sH();gH();SH();uw();_H();RH();Mi=e=>{let t=e.dbPath??(e.layout!==void 0?Nc(e.layout):(()=>{throw new Error("createPitfallRegistry requires dbPath or layout")})()),r=uH(t);return bH(r),{dbPath:t,listPitfalls:o=>qD(r,o),getPitfall:o=>Wf(r,o),upsertPitfall:o=>EH(r,o),recordHit:o=>hH(r,o),matchPitfalls:o=>nH(r,o),close:()=>mH(r)}}});var Zee,Qee,yw,hw=l(()=>{"use strict";Mf();rw();Zee=(e,t,r)=>{let o=t.projectId?.trim();return o!==void 0&&o.length>0?o:r===null||e.resolveProjectId===void 0?null:e.resolveProjectId(r)},Qee=(e,t,r,o)=>{for(let n of o)try{t.recordHit({projectId:r,id:n.id})}catch(s){e.logError?.(s)}},yw=(e,t)=>{try{let r=t.cwd?.trim()??"",o=r.length>0?r:null;if(o!==null&&e.isDeclined?.(o)===!0)return{status:"none"};let n=Zee(e,t,o);if(n===null||e.registry===null)return{status:"none",promptCreate:o!==null};let s=e.registry.matchPitfalls({projectId:n,text:t.message??""});if(s.length===0)return{status:"miss",projectId:n};Qee(e,e.registry,n,s);let i=If(s);return{status:"hit",projectId:n,pitfalls:i,tip:iw(i)}}catch(r){return e.logError?.(r),{status:"none"}}}});var Sw,CH=l(()=>{"use strict";Mf();Sw={name:Wi.name,description:Wi.description,inputSchema:Wi.inputSchema}});var Zn,vH,Dc,ete,Ff,Hc=l(()=>{"use strict";Zn=m(require("node:fs")),vH=m(require("node:os")),Dc=()=>({readUtf8:e=>Zn.default.readFileSync(e,"utf8"),writeUtf8:(e,t)=>{Zn.default.writeFileSync(e,t,"utf8")},exists:e=>Zn.default.existsSync(e),mkdirp:e=>{Zn.default.mkdirSync(e,{recursive:!0})},rename:(e,t)=>{Zn.default.renameSync(e,t)},realpath:e=>Zn.default.realpathSync.native(e)}),ete=()=>({homedir:()=>vH.default.homedir()}),Ff=()=>({...Dc(),...ete()})});var LH,IH=l(()=>{"use strict";LH=(e,t)=>{let r=e.trim();if(r.length===0)return r;try{return t.exists(r)?t.realpath(r):r}catch{return r}}});var Qn,ji,Ni,xH,WH,OH,MH,jH,NH,Pw,Fc,zf,$f,Aw,Tr=l(()=>{"use strict";Qn="agent-witch-token-saver",ji=`# BEGIN ${Qn}`,Ni=`# END ${Qn}`,xH=`<!-- BEGIN ${Qn} -->`,WH=`<!-- END ${Qn} -->`,OH=".cursor/mcp.json",MH=".codex/config.toml",jH=".codex/AGENTS.md",NH=".claude/settings.json",Pw="declined-projects.json",Fc="agent-witch",zf="agent-witch",$f=["mcp"],Aw="agent-witch mcp-hook check_context"});var bw,DH,HH=l(()=>{"use strict";bw=m(require("node:path"));Ie();Tr();DH=e=>e.profileEmail!==null?bw.default.join(e.installDir,He,e.profileEmail,Pw):bw.default.join(e.installDir,Pw)});var FH,xt,Zr=l(()=>{"use strict";FH=m(require("node:path")),xt=e=>{let{fs:t,filePath:r,contents:o}=e;t.mkdirp(FH.default.dirname(r));let n;e.backup===!0&&t.exists(r)&&(n=`${r}.aw-bak.${new Date().toISOString().replaceAll(":","-")}`,t.writeUtf8(n,t.readUtf8(r)));let s=`${r}.aw-tmp`;return t.writeUtf8(s,o),t.rename(s,r),n!==void 0?{backupPath:n}:{}}});var Uf,tte,zH,Bf,Gf=l(()=>{"use strict";Hc();IH();HH();Zr();Uf=()=>({byRealpath:{}}),tte=e=>{try{let t=JSON.parse(e);if(typeof t!="object"||t===null)return Uf();let r=t.byRealpath;return typeof r!="object"||r===null?Uf():{byRealpath:r}}catch{return Uf()}},zH=(e,t=Dc())=>{let r=DH(e);return t.exists(r)?tte(t.readUtf8(r)):Uf()},Bf=e=>{let t=e.fs??Dc(),r=LH(e.cwd,t);return zH(e.layout,t).byRealpath[r]!==void 0}});var Vo,Vf,_w=l(()=>{"use strict";Vo=(e,t)=>{let r=e[t];if(typeof r!="string")return;let o=r.trim();return o.length>0?o:void 0},Vf=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return{};let t=e;return{...Vo(t,"cwd")!==void 0?{cwd:Vo(t,"cwd")}:{},...Vo(t,"message")!==void 0?{message:Vo(t,"message")}:{},...Vo(t,"sessionId")!==void 0?{sessionId:Vo(t,"sessionId")}:{},...Vo(t,"projectId")!==void 0?{projectId:Vo(t,"projectId")}:{}}}});var zc,kw=l(()=>{"use strict";Yt();hw();fw();Gf();_w();zc=e=>{let t=e.logError??(o=>{let n=o instanceof Error?o.message:String(o);console.error(`[agent-witch] check_context: ${n}`)}),r=e.isDeclined??(o=>Bf({layout:e.layout,cwd:o}));return o=>{let n=Vf(o),s=null;try{return s=Mi({layout:e.layout}),yw({registry:s,resolveProjectId:Ek,isDeclined:r,logError:t},n)}catch(i){return t(i),{status:"none"}}finally{s?.close()}}}});var rte,ww,$H=l(()=>{"use strict";kw();_w();rte="/api/local/check-context",ww=async e=>{if(e.pathname!==rte)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t={};try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{return e.sendJson(e.response,400,{status:"none"}),!0}let r=zc({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,r(Vf(t))),!0}});var UH,Kf,ote,nte,BH,GH=l(()=>{"use strict";UH=m(require("node:path"));Tr();Zr();Kf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ote={hooks:[{type:"command",command:Aw,timeout:3,[Qn]:!0}]},nte=e=>Array.isArray(e)&&e.some(t=>Kf(t)&&Array.isArray(t.hooks)&&t.hooks.some(r=>Kf(r)&&(r.command===Aw||r[Qn]===!0))),BH=e=>{let t=UH.default.join(e.io.homedir(),NH),r={};if(e.io.exists(t))try{let a=JSON.parse(e.io.readUtf8(t));Kf(a)&&(r={...a})}catch{r={}}let o=Kf(r.hooks)?{...r.hooks}:{},n=o.UserPromptSubmit;if(nte(n))return{ok:!0,path:t,wrote:!1};let s=Array.isArray(n)?[...n]:[];s.push(ote),o.UserPromptSubmit=s;let{backupPath:i}=xt({fs:e.io,filePath:t,contents:`${JSON.stringify({...r,hooks:o},null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:i}}});var $c,qf=l(()=>{"use strict";Tr();$c=e=>{let t=e.begin??ji,r=e.end??Ni,o=`${t}
${e.blockBody.trimEnd()}
${r}
`,n=e.existing.indexOf(t);if(n<0){let p=`${e.existing.length===0||e.existing.endsWith(`
`)?e.existing:`${e.existing}
`}${o}`;return{next:p,changed:p!==e.existing}}let s=e.existing.indexOf(r,n);if(s<0){let d=`${e.existing.slice(0,n)}${o}`;return{next:d,changed:d!==e.existing}}let i=s+r.length,a=e.existing.slice(i).replace(/^\n/,""),c=`${e.existing.slice(0,n)}${o}${a}`;return{next:c,changed:c!==e.existing}}});var VH,ste,KH,qH=l(()=>{"use strict";VH=m(require("node:path"));qf();Tr();Zr();ste=["On the first user message of a session, call the Agent Witch MCP tool","`check_context` with the current cwd.","If status is miss or none (declined), stay silent. If hit, follow the tip."].join(`
`),KH=e=>{let t=VH.default.join(e.io.homedir(),jH),r=e.io.exists(t)?e.io.readUtf8(t):"",{next:o,changed:n}=$c({existing:r,blockBody:ste,begin:ji,end:Ni});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=xt({fs:e.io,filePath:t,contents:o,backup:r.length>0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var JH,YH,XH=l(()=>{"use strict";JH=m(require("node:path"));qf();Tr();Zr();YH=e=>{let t=JH.default.join(e.io.homedir(),MH),r=$f.map(c=>`"${c}"`).join(", "),o=[`[mcp_servers.${Fc}]`,`command = "${zf}"`,`args = [${r}]`].join(`
`),n=e.io.exists(t)?e.io.readUtf8(t):"",{next:s,changed:i}=$c({existing:n,blockBody:o,begin:ji,end:Ni});if(!i)return{ok:!0,path:t,wrote:!1};let{backupPath:a}=xt({fs:e.io,filePath:t,contents:s,backup:n.length>0});return{ok:!0,path:t,wrote:!0,backupPath:a}}});var ZH,Tw,QH,eF=l(()=>{"use strict";ZH=m(require("node:path"));Tr();Zr();Tw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),QH=e=>{let t=ZH.default.join(e.io.homedir(),OH),r={command:zf,args:[...$f]},o={};if(e.io.exists(t))try{let d=JSON.parse(e.io.readUtf8(t));Tw(d)&&(o={...d})}catch{o={}}let n=Tw(o.mcpServers)?{...o.mcpServers}:{},s=n[Fc];if(Tw(s)&&s.command===r.command&&Array.isArray(s.args)&&JSON.stringify(s.args)===JSON.stringify(r.args))return{ok:!0,path:t,wrote:!1};n[Fc]=r;let a={...o,mcpServers:n},{backupPath:c}=xt({fs:e.io,filePath:t,contents:`${JSON.stringify(a,null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:c}}});var Jf,Ew=l(()=>{"use strict";Hc();GH();qH();XH();eF();Jf=e=>{let t=e?.io??Ff();return{ok:!0,cursorMcp:QH({io:t}),codexConfig:YH({io:t}),codexAgents:KH({io:t}),claudeHook:BH({io:t})}}});var tF=l(()=>{"use strict";Tr()});var rF=l(()=>{"use strict";tF();Tr();qf();Zr()});var oF=l(()=>{"use strict";Zr()});var Rw=l(()=>{"use strict";Tr();rF();oF()});var Cw=l(()=>{"use strict"});var nF=l(()=>{"use strict";Cw()});var sF=l(()=>{"use strict";Cw();nF()});var iF,ARe,aF=l(()=>{"use strict";iF=m(require("node:path"));sF();Zr();ARe=iF.default.join(".agent-witch","token-saver.json")});var vw=l(()=>{"use strict"});var lF=l(()=>{"use strict";aF();Hc();Gf();vw();Ew();Rw()});var Yf=l(()=>{"use strict";fw();uw();lw();xf();gw();hw();CH();kw();$H();Ew();Rw();lF();Gf();vw();Hc()});var Lw,cF=l(()=>{"use strict";Lw=e=>({id:e.id,projectId:e.projectId,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:e.source,overridesSeed:e.source!=="seed",hitCount:e.hitCount,lastSeenAt:e.lastSeenAt,updatedAt:null})});var dF,pF,yte,hte,Ste,Xf,Iw=l(()=>{"use strict";Yf();cw();cF();dF=e=>{try{return e.dbPath!==void 0?Mi({dbPath:e.dbPath}):e.layout!==void 0?(Nc(e.layout),Mi({layout:e.layout})):null}catch{return null}},pF=(e,t,r)=>{let o=e.listPitfalls({projectId:t,includeRetired:r,format:"full"});return o.format==="full"?o.items:[]},yte=(e,t,r)=>{for(let o of r)o.source!=="seed"&&e.upsertPitfall({id:o.id,projectId:t,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source==="retired"?"retired":"project"})},hte=e=>e.kind==="active_cap"?{ok:!1,reason:"active_limit"}:{ok:!1,reason:"rejected"},Ste=e=>{let t=e.cloud??null;return{listPitfalls:async(r,o)=>{let n=dF(e);try{if(t!==null){let i=await t.listPitfalls(r,o);if(i.ok)return n!==null?(yte(n,r,i.items),{ok:!0,items:pF(n,r,o.includeRetired).map(Lw),syncedAt:i.syncedAt}):i}return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:pF(n,r,o.includeRetired).map(Lw),syncedAt:null}}finally{n?.close()}},upsertPitfall:async(r,o)=>{if(t!==null){let s=await t.upsertPitfall(r,o);if(!s.ok)return s}let n=dF(e);if(n===null)return t!==null?{ok:!0}:{ok:!1,reason:"unavailable"};try{let s=n.upsertPitfall({id:o.id,projectId:r,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source});return s.ok?{ok:!0}:hte(s.error)}finally{n.close()}}}},Xf=Ste});var Yt=l(()=>{"use strict";Ii();Li();YN();No();Fg();XN();mD();fD();ED();_f();gc();RD();jD();ND();DD();HD();zD();$D();UD();BD();bk();Pk();qr();Iw()});var Zf,Uc,uF,xw,es,Ww=l(()=>{"use strict";Zf=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},Uc=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Zf(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},uF=e=>e>=1&&e<=5,xw=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Zf(t,"UTC")},es=e=>{let t=e.from??new Date,r=Zf(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Uc(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=Uc(r,e.timeZone,o,0),s=Zf(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?Uc(xw(r),e.timeZone,o,0):n;if(!i&&uF(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=xw(a),uF(a.weekday))return Uc(a,e.timeZone,o,0);return Uc(xw(r),e.timeZone,o,0)}});var mF,Ow,Qr,Mw=l(()=>{"use strict";mF=require("node:crypto");ee();Yt();Ww();yf();Ow=!1,Qr=async e=>{if(Ow)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=H();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=V({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=ff(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};Ow=!0;let n=(0,mF.randomUUID)();try{let s=await _i(t,"claude-cli",o.prompt);await hk(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=es({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return gf(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{Ow=!1}}});var Qf,gF=l(()=>{"use strict";ee();Mw();yf();Qf=async()=>{let e=H();if(e===null)return;let t=Kt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await Qr(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var Bc=l(()=>{"use strict";yf();gF();Mw();Ww()});var fF=l(()=>{"use strict";Bc()});var yF=l(()=>{"use strict";pk()});var hF=l(()=>{"use strict";yF()});var jw=l(()=>{"use strict";Bc()});var Pte,Ate,Gc,Nw=l(()=>{"use strict";fF();hF();jw();Ye();Pte=e=>e!==void 0&&e.trim().length>0?M(e.trim()):M(),Ate=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??es({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??es({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Gc=e=>{let t=Pte(e.profileEmail),r=Kt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=vi(s);return i!==null?[Ate(i,o.get(i.id))]:[]});return mf(t,n),{ok:!0,writtenCount:n.length}}});var Dw=l(()=>{"use strict";Bc()});var SF=l(()=>{"use strict";ee()});var PF=l(()=>{"use strict";Nw();Dw();jw();SF()});var AF,Vc,Kc,qc,bF=l(()=>{"use strict";AF=m(require("node:os"));PF();_c();kc();Vc=e=>{if(!Kr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Gn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=Gc({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Kc=async e=>{if(!Kr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Gn(t)?Qr(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},qc=()=>{let e=H(),t=e!==null?Kt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:AF.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var Hw=l(()=>{"use strict";bF()});var ey=l(()=>{"use strict";ie()});var ty=l(()=>{"use strict";ie()});var ry,kF,wF,_F,bte,_te,Di,Fw=l(()=>{"use strict";ry=m(require("node:fs")),kF=m(require("node:os")),wF=m(require("node:path"));ey();ty();ac();Ye();_F=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},bte=e=>wF.default.join(kF.default.homedir(),"Library","LaunchAgents",`${e}.plist`),_te=async e=>ry.default.existsSync(bte(e))?(await Je(e)).ok:!1,Di=async(e=C())=>{let t=ry.default.existsSync(Ig(e)),r=!ry.default.existsSync(gr(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=ic(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await _F(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${ge(e)}-wake`;await _te(i)&&s.push(i);for(let c of de(e))(await Je(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await _F(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var TF=l(()=>{"use strict";ie()});var zw=l(()=>{"use strict";Nn();ie()});var $w=l(()=>{"use strict";Nn()});var Uw=l(()=>{"use strict";ie()});var RF,EF,Jc,Bw=l(()=>{"use strict";RF=m(require("node:fs"));vt();ey();ty();Ye();EF=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},Jc=async(e=C())=>{if(!RF.default.existsSync(gr(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await EF())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of de(e))(await Je(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await EF();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var CF=l(()=>{"use strict";ie()});var vF,ts,Gw,kte,wte,Tte,LF,Ete,IF,Hi,oy=l(()=>{"use strict";vF=require("node:crypto"),ts=m(require("node:fs")),Gw=m(require("node:path"));Ye();kte="watchdog-log.ndjson",wte=200,Tte=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),LF=(e=C())=>{let t=M(),r=t.installDir===e?t.logsDir:An({installDir:e,profileEmail:t.profileEmail});return Gw.default.join(r,kte)},Ete=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!Tte(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},IF=(e,t=C())=>{let r={id:(0,vF.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=LF(t);ts.default.mkdirSync(Gw.default.dirname(o),{recursive:!0});let n=ts.default.existsSync(o)?ts.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-wte+1)),JSON.stringify(r)];return ts.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Hi=(e=20,t=C())=>{let r=LF(t);if(!ts.default.existsSync(r))return[];let o=ts.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=Ete(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var Vw,Kw,qw,Jw=l(()=>{"use strict";Ie();Vw=Xa.watchdogReinstallState,Kw=900*1e3,qw=3e3});var xF=l(()=>{"use strict";Jw()});var WF={};Rt(WF,{verifyAgentWitchReviveAfterKickstart:()=>Cte});var Rte,Cte,OF=l(()=>{"use strict";xF();$w();Uw();Ye();Rte=e=>new Promise(t=>{setTimeout(t,e)}),Cte=async e=>{if(await Rte(e.verifyDelayMs??qw),!await kn(e.launchAgentLabel))return!1;let r=e.profileEmail===null?M():M(e.profileEmail),o=ve(r);return!$e(o,e.staleAfterMs)}});var Yc,Yw,vte,MF,jF,Xw,Zw,Qw=l(()=>{"use strict";Yc=m(require("node:fs")),Yw=m(require("node:path"));G();Jw();vte=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),MF=e=>Yw.default.join(e,Vw),jF=(e=C())=>{let t=MF(e);if(!Yc.default.existsSync(t))return null;try{let r=JSON.parse(Yc.default.readFileSync(t,"utf8"));return!vte(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},Xw=(e=C(),t=Date.now())=>{let r=jF(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=Kw:!0},Zw=(e=C(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=MF(e);return Yc.default.mkdirSync(Yw.default.dirname(o),{recursive:!0}),Yc.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var eT,NF=l(()=>{"use strict";ie();Qw();eT=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!Xw())return{attempted:!1,ok:!1,targets:e};Zw();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Je(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var DF=l(()=>{"use strict";Qw();NF()});var tT=l(()=>{"use strict";hr()});var HF=l(()=>{"use strict";hr()});var FF,Fi,zF,$F,UF,Lte,Ite,BF,xte,Wte,GF,VF=l(()=>{"use strict";FF=require("node:child_process"),Fi=m(require("node:fs")),zF=m(require("node:os")),$F=m(require("node:path")),UF=require("node:util");tT();HF();Ye();Lte=(0,UF.promisify)(FF.execFile),Ite=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),BF=e=>{let t=qe(e),r=t===null?M():M(t);if(!Fi.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Fi.default.readFileSync(r.configPath,"utf8"));return!Ite(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},xte=e=>BF(e)?.wsUrl??null,Wte=e=>{let t=xte(e);return t!==null?ze(t):Fe(e)?.appOrigin??null},GF=async e=>{let t=e?.installDir??C(),r=BF(t),o=r!==null?ze(r.wsUrl):Wte(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=$F.default.join(zF.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Fi.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??qe(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await Lte("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Fi.default.existsSync(i)&&Fi.default.unlinkSync(i)}}});var KF={};Rt(KF,{attemptAgentWitchWatchdogReinstall:()=>Ote});var Ote,qF=l(()=>{"use strict";DF();VF();Ote=async e=>eT(e,()=>GF())});var JF,YF,XF,Mte,jte,Nte,Xc,rT=l(()=>{"use strict";TF();zw();$w();Uw();Bw();Fw();ey();ty();Ye();di();CF();oy();JF=e=>e===null?M():M(e),YF=async(e,t,r)=>{if(!await kn(e))return"not_running";let n=JF(t);if(Bt(n))return"healthy";let s=ve(n);return $e(s,r)?"stale_connection":"healthy"},XF=async e=>{let t=e?.staleAfterMs??12e4,r=C(),o=de(r);return Promise.all(o.map(async n=>{let s=await YF(n.launchAgentLabel,n.profileEmail,t),i=JF(n.profileEmail),a=ve(i),c=await kn(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:$e(a,t),needsRevive:s!=="healthy",reason:s}}))},Mte=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},jte=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",Nte=async e=>{let t=await Je(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(OF(),WF)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},Xc=async e=>{if(!$t())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=C();await Di(r),await Jc(r);let o=de(r),n=[];for(let p of o){let g=await YF(p.launchAgentLabel,p.profileEmail,t);if(g==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:g});continue}n.push(await Nte({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:g,staleAfterMs:t}))}if(n.length===0){let p=bn();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(qF(),KF)),g=await p(n);s=g.attempted,i=g.ok,a=g.errorMessage,c=[...g.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&IF({event:jte(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:Mte(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var ZF,ny,QF=l(()=>{"use strict";ZF=m(require("node:os"));zw();oy();rT();ny=async()=>{let e=await XF(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:ZF.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Hi(1)[0]??null}}});var oT=l(()=>{"use strict";Fw();rT();QF();oy()});var Zc,Qc,ed,ez=l(()=>{"use strict";ie();oT();Zc=async()=>{await Di();let e=de(),t=[];for(let r of e){let o=await Je(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=bn();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Qc=Xc,ed=Xc});var nT=l(()=>{"use strict";ez()});var iy,sy,tz,sT,rz,Dte,Hte,Fte,zte,$te,ay,oz=l(()=>{"use strict";iy=require("node:child_process"),sy=m(require("node:fs")),tz=m(require("node:os")),sT=m(require("node:path")),rz=require("node:util");ie();G();_n();Dte=(0,rz.promisify)(iy.execFile),Hte=()=>sT.default.join(tz.default.homedir(),"Library","LaunchAgents"),Fte=async e=>{if(!Ct())return;let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await Dte("launchctl",["bootout",r]).catch(()=>{})},zte=e=>{let t=sT.default.join(Hte(),`${e}.plist`);sy.default.existsSync(t)&&sy.default.unlinkSync(t)},$te=e=>{(0,iy.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},ay=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=C();if(!sy.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Fr(e);for(let r of t)await Fte(r),zte(r);return $te(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var nz,ly,sz,zi,iz,Ute,Bte,Gte,iT,Vte,aT,az=l(()=>{"use strict";nz=require("node:child_process"),ly=m(require("node:fs")),sz=m(require("node:os")),zi=m(require("node:path")),iz=require("node:util");ie();_n();Ute=(0,iz.promisify)(nz.execFile),Bte=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],Gte=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],iT=e=>{ly.default.existsSync(e)&&ly.default.rmSync(e,{force:!0})},Vte=async e=>{if(!Ct())return;let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await Ute("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},aT=async e=>{let r=(e.listLaunchAgentLabels??Fr)(e.layout.installDir),o=e.launchAgentsDir??zi.default.join(sz.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??Vte;for(let i of r)await n(i),iT(zi.default.join(o,`${i}.plist`));let s=zi.default.dirname(e.layout.configPath);for(let i of Bte)iT(zi.default.join(s,i));for(let i of Gte)iT(zi.default.join(e.layout.installDir,i));return ly.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var lT,lz=l(()=>{"use strict";lT="unknown_identity"});var cT=l(()=>{"use strict";qk();lz()});var Kte,dT,cz=l(()=>{"use strict";cT();Kte=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),dT=e=>e.type!=="system.error"||!Kte(e.payload)?!1:e.payload.errorCode===lT});var pT=l(()=>{"use strict";oz();az();cz()});var cy=l(()=>{"use strict";ie();hr();pT();oT()});var $i,dy,py=l(()=>{"use strict";cy();$i=(e=20)=>Hi(e),dy=ny});var uy,Ui,my,gy=l(()=>{"use strict";cy();uy=Mn,Ui=(e=20)=>xn(e),my=e=>On(e)});var fy,uT=l(()=>{"use strict";cy();fy=()=>ay()});var dz=l(()=>{"use strict";__();dk();Hw();nT();py();gy();uT()});var pz={};Rt(pz,{buildAgentWitchAutomationStatusFromWakeServer:()=>qc,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>uy,buildAgentWitchWakeHealthResponse:()=>cc,buildAgentWitchWakeIdentityResponse:()=>dc,buildAgentWitchWatchdogStatus:()=>dy,installHarnessFromWakeServer:()=>wc,readAgentWitchSelfUpdateLogEntries:()=>Ui,readAgentWitchWatchdogLogEntries:()=>$i,restartAgentWitchFromWakeServer:()=>ed,reviveAgentWitchWebSocketFromWakeServer:()=>Qc,runAgentWitchSelfUpdateFromWakeServer:()=>my,runAgentWitchUninstallLocalFromWakeServer:()=>fy,runAutomationFromWakeServer:()=>Kc,syncAutomationsFromWakeServer:()=>Vc,wakeAgentWitchLaunchAgents:()=>Zc});var uz=l(()=>{"use strict";dz()});var mz,gz,mT,gT,fz=l(()=>{"use strict";mz=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),gz=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?mz(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?mz(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},mT=e=>{let t=e.watchdogLogs.map(gz).join(""),r=e.updateLogs.map(gz).join("");return`<!doctype html>
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
</html>`},gT=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var yz,hz,Sz=l(()=>{"use strict";yz=m(require("node:net")),hz=()=>new Promise((e,t)=>{let r=yz.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var Pz,qte,Jte,fT,Az=l(()=>{"use strict";Pz=m(require("node:net"));ie();Sz();lc();ac();Ye();qte=e=>new Promise(t=>{let r=Pz.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Jte=e=>new Promise(t=>{setTimeout(t,e)}),fT=async(e={})=>{let t=C(),r=Vt(),o=Math.max(1,e.attempts??10),n=e.retryDelayMs??500;for(let i=1;i<=o;i+=1){if(await qte(r))return bj(r),r;i<o&&await Jte(n)}let s=await hz();xg(t,s),process.env.AGENT_WITCH_WAKE_PORT=String(s);try{bl({launchAgentPrefix:ge(t),wakePort:s})}catch(i){console.error(`[agent-witch] Could not update LaunchAgent wake port: ${i instanceof Error?i.message:String(i)}`)}return s}});var Yte,yT,bz=l(()=>{"use strict";Yte=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yT=e=>({force:Yte(e)&&e.force===!0})});var td=l(()=>{"use strict";_c();fz();Az();bz();eb();Ym();Cn()});var hT,U,ST,PT,rd,_z=l(()=>{"use strict";hT=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},U=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},ST=e=>{e.writeHead(403),e.end()},PT=e=>e.url?.split("?")[0]??"/",rd=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var Xt=l(()=>{"use strict";_z()});var Xte,kz,wz=l(()=>{"use strict";Hw();Xt();Xte=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return U(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},kz=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return U(e.response,200,qc(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await Xte(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=Vc(t);return U(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Kc(t);return U(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var Zte,Ez,Tz,Rz,AT,Cz,bT=l(()=>{"use strict";Zte=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],Ez=e=>/embed|minilm|^bge-/i.test(e),Tz=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),Rz=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),AT=e=>e.filter(t=>t.trim().length>0&&!Ez(t)),Cz=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!Ez(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>Tz(s,o));if(n!==void 0)return n}for(let n of Zte){let s=r.find(i=>Tz(i,n));if(s!==void 0)return s}return r[0]??null}});var _T,Iz,xz,yy,Wz,vz,Lz,Qte,ere,tre,rre,ore,nre,Zt,od=l(()=>{"use strict";_T=require("node:child_process"),Iz=m(require("node:fs")),xz=m(require("node:os")),yy=m(require("node:path"));hr();Gt();bT();Wz=3e3,vz=["claude-cli","codex","cursor","antigravity"],Lz={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},Qte=(e,t)=>new Promise(r=>{let o=(0,_T.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},Wz);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),ere=()=>{let e=xz.default.homedir();return["ollama",yy.default.join(e,".local","bin","ollama"),yy.default.join(e,".agent-witch","ollama","ollama"),yy.default.join(e,".local-agent-witch","ollama","ollama")]},tre=e=>new Promise(t=>{let r=(0,_T.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},Wz);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(Rz(Buffer.concat(o).toString("utf8")))})}),rre=async()=>{for(let e of ere()){if(e!=="ollama"&&!Iz.default.existsSync(e))continue;let t=await tre(e);if(t!==null)return t}return[]},ore=e=>{let t=e.installedWriterIds.map(s=>Lz[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=_e(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${Lz[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},nre=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:pi},Zt=async e=>{let t=vz.map(i=>{let a=hg(i,e.commands);return Qte(a.command,a.args)}),[r,...o]=await Promise.all([rre(),...t]),n=vz.flatMap((i,a)=>o[a]===!0?[i]:[]),s=Cz(r,nre());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:ore({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var sre,ire,kT,Oz=l(()=>{"use strict";sre="http://127.0.0.1:11434",ire=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},kT=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||sre;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?ire(await o.json()):null}catch{return null}}});var wT=l(()=>{"use strict";Gt();od();Oz();bT()});var are,Mz,jz=l(()=>{"use strict";wT();are={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},Mz=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:are[t]})),ollamaModels:AT(e.ollamaModels)})});var lre,Nz,Dz=l(()=>{"use strict";wT();Xt();jz();lre=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return U(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},Nz=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Zt({commands:ke({})});return U(e.response,200,{ok:!0,...Mz({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await lre(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await kT({model:r,prompt:o});return n===null?(U(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(U(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var cre,Hz,Fz=l(()=>{"use strict";dk();Xt();cre=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return U(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},Hz=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await cre(e);if(t===null)return!0;let r=wc(t);return U(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var zz=l(()=>{"use strict";Yt()});var TT,$z=l(()=>{"use strict";zz();kc();TT=e=>{if(!Kr(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:st({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var Uz,ET,RT=l(()=>{"use strict";ee();Yt();kc();Uz=e=>{if(!Kr(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},ET=async e=>{let t=Uz(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Bo("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=H();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=V({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(st({projectFolderPath:r}),await Ic(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var Bz=l(()=>{"use strict";$z();RT()});var Gz,Vz=l(()=>{"use strict";Bz();RT();Xt();Gz=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=TT(t);return U(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await ET(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return U(e.response,o,r,e.cors.headers),!0}return!1}});var Kz,qz=l(()=>{"use strict";td();gy();py();Kz=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=$i(50),r=Ui(50);return e.response.writeHead(200,gT()),e.response.end(mT({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var Jz,Yz=l(()=>{"use strict";__();Xt();Jz=e=>e.request.method==="GET"&&e.pathname==="/health"?(U(e.response,200,cc(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(U(e.response,200,dc(),e.cors.headers),!0):!1});var Xz,Zz=l(()=>{"use strict";uT();Xt();Xz=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await fy();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}});var Qz,e$=l(()=>{"use strict";nT();Xt();Qz=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Qc();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await ed();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Zc();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var t$,r$=l(()=>{"use strict";td();gy();Xt();t$=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=uy();return U(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=rd(e.request,"/update/logs",20,200);return U(e.response,200,{ok:!0,logs:Ui(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=yT(t),o=await my({force:r});return U(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var o$,n$=l(()=>{"use strict";py();Xt();o$=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await dy();return U(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=rd(e.request,"/watchdog/logs",20,200);return U(e.response,200,{ok:!0,logs:$i(t)},e.cors.headers),!0}return!1}});var s$,i$=l(()=>{"use strict";wz();Dz();Fz();Vz();qz();Yz();Zz();e$();r$();n$();s$=[Jz,Kz,o$,Qz,t$,Xz,Hz,Gz,kz,Nz]});var a$,l$=l(()=>{"use strict";i$();a$=async e=>{for(let t of s$)if(await t(e))return!0;return!1}});var dre,c$,d$=l(()=>{"use strict";_c();Xt();l$();dre=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:PT(e),readJsonBody:()=>hT(e)}),c$=async(e,t,r)=>{let o=e.headers.origin,n=df(o);try{if(o!==void 0&&o.length>0&&!n.allowed){ST(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=dre(e,t,r,n);if(await a$(s))return;U(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{U(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var p$,rs,hy,Sy=l(()=>{"use strict";p$=m(require("node:http"));td();d$();rs=async()=>{let e=await fT(),t=p$.default.createServer((r,o)=>{c$(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},hy=rs});var u$={};Rt(u$,{runAgentWitchBridgeCli:()=>pre});var pre,m$=l(()=>{"use strict";ie();Sy();pre=async()=>{ht("agent-witch-bridge");let e=await rs(),t=$r(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var g$=l(()=>{"use strict";vt()});var Bi,CT,f$=l(()=>{"use strict";Bi=(e,t,r)=>e===1?t:r,CT=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Bi(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Bi(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${Bi(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Bi(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Bi(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${Bi(p,"year","years")} ago`}});var os,vT,ure,mre,LT,Ko,nd,IT,y$=l(()=>{"use strict";os=m(require("node:fs")),vT=m(require("node:path")),ure="local-ws-traffic.ndjson",mre=500,LT=e=>vT.default.join(e.logsDir,ure),Ko=(e,t)=>{let r=LT(e);os.default.mkdirSync(vT.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});os.default.appendFileSync(r,`${o}
`,"utf8")},nd=(e,t=mre)=>{let r=LT(e);if(!os.default.existsSync(r))return[];let n=os.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},IT=e=>{let t=LT(e);os.default.existsSync(t)&&os.default.writeFileSync(t,"","utf8")}});var gre,h$,S$,P$=l(()=>{"use strict";cT();gre=new Set(Object.values(Ef)),h$=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),S$=e=>{if(!h$(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!gre.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!h$(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var A$,b$=l(()=>{"use strict";A$=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var fre,yre,hre,sd,_$=l(()=>{"use strict";b$();fre=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,yre=e=>fre.test(e),hre=e=>A$(e),sd=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>sd(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&yre(o)){r[o]=hre(n);continue}r[o]=sd(n)}return r}});var Er,xT,Sre,Pre,Are,WT,k$,w$,T$,bre,Py,ns,Ay,OT,E$=l(()=>{"use strict";Er=m(require("node:fs")),xT=m(require("node:path"));P$();_$();Sre="local-ws-trace.ndjson",Pre=1e4,Are=1440*60*1e3,WT=e=>xT.default.join(e.logsDir,Sre),k$=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},w$=e=>{if(!Er.default.existsSync(e))return;let t=Er.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-Are,n=t.filter(s=>{let i=k$(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-Pre);Er.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},T$=(e,t)=>{let r=WT(e);Er.default.mkdirSync(xT.default.dirname(r),{recursive:!0}),Er.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),w$(r)},bre=e=>e.parsed===null?{_empty:!0}:sd(e.parsed),Py=(e,t,r)=>{let o=S$(r);T$(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:bre(o)})},ns=(e,t)=>{T$(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:sd({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Ay=(e,t=80)=>{let r=WT(e);if(w$(r),!Er.default.existsSync(r))return[];let o=Er.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=k$(s);i!==null&&n.push(i)}return n.reverse()},OT=e=>{let t=WT(e);Er.default.existsSync(t)&&Er.default.writeFileSync(t,"","utf8")}});var qo,R$,_re,MT,by,C$=l(()=>{"use strict";qo=m(require("node:fs")),R$=m(require("node:path")),_re=256e3,MT=e=>{qo.default.mkdirSync(R$.default.dirname(e),{recursive:!0}),qo.default.writeFileSync(e,"","utf8")},by=(e,t=_re)=>{if(!qo.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=qo.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=qo.default.openSync(e,"r");try{qo.default.readSync(a,i,0,s,n)}finally{qo.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var id=l(()=>{"use strict";y$();E$();C$()});var jT,NT,v$=l(()=>{"use strict";jT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),NT=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${jT(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${jT(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${jT(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var L$=l(()=>{"use strict";v$()});var DT,HT=l(()=>{"use strict";DT=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var FT=l(()=>{"use strict";Bl()});var zT,$T,I$=l(()=>{"use strict";FT();zT=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},$T=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var x$=l(()=>{"use strict";HT();I$()});var W$,ad,UT,ld=l(()=>{"use strict";HT();W$=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ad=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=W$(e),r=W$(DT(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},UT=`(function () {
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
})();`});var ss,kre,BT,O$=l(()=>{"use strict";ss=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kre=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},BT=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${ss(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?ss(r.direction):ss(r.kind),i=`trace-body-${o}`,a=ss(kre(r.body));return`<tr>
        <td title="${ss(r.at)}">${ss(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${ss(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var j$,wre,M$,GT,N$=l(()=>{"use strict";Ie();vt();j$=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},wre=e=>j$(e)===Hr?Ks:Vs,M$=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GT=e=>{let t=wre(e.installDir),o=`AW_HOME="$HOME/${j$(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${M$(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${M$(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var D$=l(()=>{"use strict";ld();O$();N$();ld()});var Tre,eo,cd=l(()=>{"use strict";Tre=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),eo=Tre});var H$,F$,z$,$$,U$,B$,G$,Gi=l(()=>{"use strict";H$="projects",F$="knowledge",z$="chunks.ndjson",$$="lessons.ndjson",U$="error-chunks.ndjson",B$="usage-stats.json",G$="knowledge-location.json"});var _y,Ere,ky,VT=l(()=>{"use strict";_y=m(require("node:path"));Gi();Ere=(e,t)=>{let r=t.trim(),o=_y.default.join(e.installDir,H$,r,F$);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:_y.default.join(o,z$),memoryRunsFilePath:_y.default.join(o,$$)}},ky=Ere});var KT,Rre,V$,K$=l(()=>{"use strict";KT=m(require("node:fs"));Gi();Un();Rre=e=>{let t=Lt(e.projectFolderPath),r=`${t.metaDirPath}/${G$}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};KT.default.mkdirSync(t.metaDirPath,{recursive:!0}),KT.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},V$=Rre});var Vi,J$,q$,Cre,Y$,X$=l(()=>{"use strict";Vi=m(require("node:fs")),J$=m(require("node:path"));En();Un();VT();K$();q$=(e,t)=>{Vi.default.existsSync(e)&&(Vi.default.existsSync(t)&&Vi.default.statSync(t).size>0||(Vi.default.mkdirSync(J$.default.dirname(t),{recursive:!0}),Vi.default.copyFileSync(e,t)))},Cre=e=>{let t=Lt(e.projectFolderPath),r=ky(e.layout,e.projectId),o=`${t.memoryDirPath}/${oi}`;q$(t.ragChunksFilePath,r.ragChunksFilePath),q$(o,r.memoryRunsFilePath),V$({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},Y$=Cre});var Z$,vre,Ki,wy=l(()=>{"use strict";Z$=m(require("node:path"));En();Un();X$();wk();VT();vre=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=hf(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){Y$({layout:e.layout,projectFolderPath:t,projectId:o});let s=ky(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=Lt(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:Z$.default.join(n.memoryDirPath,oi),projectId:null}},Ki=vre});var Ty,Ire,Ey,qT=l(()=>{"use strict";Ty=m(require("node:fs"));Gi();Ire=(e,t=500)=>{if(!Ty.default.existsSync(e))return;let r=Ty.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Ty.default.writeFileSync(e,`${o.join(`
`)}
`)},Ey=Ire});var Ry,xre,is,JT=l(()=>{"use strict";Ry=m(require("node:path"));Gi();wy();xre=e=>{let t=Ki(e);if(t===null)return null;let r=Ry.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Ry.default.join(r,B$),errorChunksFilePath:Ry.default.join(r,U$)}},is=xre});var eU,dd,tU,Q$,YT,rU,Mre,XT,oU,ZT,QT,eE,tE=l(()=>{"use strict";eU=require("node:crypto"),dd=m(require("node:fs")),tU=m(require("node:path"));cd();Gi();JT();Q$=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),YT=e=>{if(!dd.default.existsSync(e))return Q$();try{let t=JSON.parse(dd.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return Q$()},rU=(e,t)=>{dd.default.mkdirSync(tU.default.dirname(e),{recursive:!0}),dd.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Mre=e=>{let t=eo(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,eU.createHash)("sha256").update(o).digest("hex").slice(0,16)},XT=e=>{let t=is(e);return t===null?null:YT(t.usageStatsFilePath)},oU=e=>{if(e.chunkIds.length===0)return;let t=is(e);if(t===null)return;let r=YT(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;rU(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},ZT=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=is(e);if(r===null)return null;let o=Mre(t),n=YT(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return rU(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},QT=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,eE=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var pd,nU,jre,Nre,sU,Dre,rE,ud,qi,oE,Ji,nE,sE=l(()=>{"use strict";pd=m(require("node:fs")),nU=m(require("node:path"));cd();wy();qT();tE();jre="http://127.0.0.1:11434",Nre="nomic-embed-text",sU=(e,t,r)=>Ki({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,Dre=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},rE=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},ud=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||jre,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||Nre;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},qi=(e,t,r)=>{let o=sU(e,t,r);if(o===null||!pd.default.existsSync(o))return[];let n=pd.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},oE=async e=>{let t=eo(e.text),r=rE(t);if(r.length===0)return 0;let o=sU(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;pd.default.mkdirSync(nU.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await ud(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};pd.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return Ey(o),n},Ji=async e=>{let t=await ud(e.query);if(t===null)return[];let r=e.minScore??0,s=qi(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:Dre(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return oU({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},nE=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var md,iU,Hre,Fre,iE,aE,lE,aU=l(()=>{"use strict";md=m(require("node:fs")),iU=m(require("node:path"));cd();JT();qT();sE();Hre=e=>{if(!md.default.existsSync(e))return[];let t=md.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},Fre=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},iE=async e=>{let t=is(e);if(t===null)return 0;let r=eo(e.text),o=rE(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;md.default.mkdirSync(iU.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await ud(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};md.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Ey(n,200),s},aE=async e=>{let t=is(e);if(t===null)return[];let r=await ud(e.query);if(r===null)return[];let o=e.minScore??.3;return Hre(t.errorChunksFilePath).map(s=>({chunk:s,score:Fre(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},lE=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var cE=l(()=>{"use strict";sE();tE();aU()});var We,dE,pE=l(()=>{"use strict";Kk();We=Vk,dE=`
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
`.trim()});var zre,$re,uE,lU,mE,cU=l(()=>{"use strict";pE();ld();zre=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,$re=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],uE=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lU=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${zre}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,mE=e=>{let t=$re.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=uE(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=uE(e.installBundleVersionLabel?.trim()??"unknown"),s=lU("brand brand-in-sidebar",n),i=lU("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${uE(e.title)} \xB7 Agent Witch Local</title>
  <style>${dE}</style>
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
  <script>${UT}</script>
</body>
</html>`}});var Cy,gd,vy=l(()=>{"use strict";Cy=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gd=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Cy(e.syncMessage)}</p>`:"",o=Cy(e.manageHref),n=Cy(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Cy(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var gE,fE,yE,dU=l(()=>{"use strict";gE=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,fE=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,yE=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var pU=l(()=>{"use strict";cU();vy();dU()});var Yi,hE,uU=l(()=>{"use strict";ld();Yi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hE=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Yi(e.wakeError)}</div>`:"",a=ad(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Yi(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${Yi(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Yi(o)}</p>
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
        <p class="home-card-lede">Tail of client stderr \u2014 crashes, module errors, and bridge failures on this Mac.</p>
        <p class="home-card-meta">${Yi(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Yi(n)}</p>
      </a>
    </div>`}});var mU=l(()=>{"use strict";uU()});var v,Xi=l(()=>{"use strict";v=e=>e==="passed"||e==="stopped"||e==="failed"});var gU,SE,as,PE,Ly=l(()=>{"use strict";gU="Stopped at the round limit. The best prompt is kept.",SE="Stopped because the score stopped rising. The best prompt is kept.",as="Finished. The best prompt is the result.",PE="Wizard ended. Progress from finished steps is kept."});var Jo,AE=l(()=>{"use strict";Jo=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var Ure,Bre,fd,fU,Iy=l(()=>{"use strict";Ure=/\n+|;\s+/,Bre=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,fd=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(Ure).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,Bre(s)]},[]);return[...t,...o]},[]),fU=e=>{let t=fd(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ye,Zi=l(()=>{"use strict";ye=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var yd,bE=l(()=>{"use strict";Iy();Zi();yd=e=>{let t=[...e.priorRounds,e.current],r=ye(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:fU(o)}}});var _E,Gre,Vre,xy,kE=l(()=>{"use strict";_E={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},Gre=e=>{try{let t=JSON.parse(e.fragment);return{..._E,objects:[...e.objects,t]}}catch{return{..._E,objects:e.objects}}},Vre=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:Gre(r)},xy=e=>[...e].reduce(Vre,_E).objects});var Kre,wE,qre,yU,TE=l(()=>{"use strict";kE();Kre=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},wE=e=>{let t=xy(e).filter(Kre),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},qre=(e,t)=>({...e,passed:e.score>=t}),yU=(e,t)=>{let r=wE(e);return r===null?null:qre(r,t)}});var EE,RE,Wy=l(()=>{"use strict";EE="The judge reply needs a score and a reason.",RE="The improver reply was empty."});var hU,SU=l(()=>{"use strict";hU=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var PU,AU=l(()=>{"use strict";PU=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var Yre,bU,_U=l(()=>{"use strict";SU();AU();Ly();Iy();Yre=e=>{let t=fd(e);return t.length===0?SE:`${SE} Avoid: ${t.join("; ")}.`},bU=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:gU};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(hU(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:Yre(PU(r))}}return null}});var Yo,Xre,ls,kU,Oy=l(()=>{"use strict";Yo=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},Xre=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,ls=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",Xre(e.tokens),`Delay: ${Yo(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},kU=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var Zre,wU,TU=l(()=>{"use strict";TE();Zre=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,wU=e=>{let r=(Zre.exec(e)?.[1]??e).trim();return r.length===0||wE(r)!==null?null:r}});var EU,My,RU=l(()=>{"use strict";Oy();TU();Wy();EU=e=>({type:"call",role:"judge",choice:e.choice,prompt:kU({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),My=e=>{let t=wU(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:RE}}:{nextPrompt:t,continuation:EU({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var CE,CU=l(()=>{"use strict";AE();bE();TE();Wy();Ly();_U();Wy();RU();CE=e=>{let t=yU(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:EE}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=bU({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=yd({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:Jo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var hd,vE=l(()=>{"use strict";hd=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var vU=l(()=>{"use strict"});var LU=l(()=>{"use strict";vU()});var cs,IU=l(()=>{"use strict";cs=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var Qre,LE,xU=l(()=>{"use strict";Oy();Qre=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,LE=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",Qre(e.tokens),`Delay: ${Yo(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var eoe,toe,roe,IE,WU=l(()=>{"use strict";eoe=/[A-Za-z0-9_./~-]{3,180}/g,toe=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,roe=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||toe.test(t)},IE=(e,t=12)=>{let r=[];for(let o of e.matchAll(eoe)){let n=o[0].replace(/\.+$/,"");if(!(!roe(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var Sd,OU=l(()=>{"use strict";Sd=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var jy,xE,MU,Pd,WE=l(()=>{"use strict";jy=e=>Math.floor(e/2),xE=e=>Math.max(jy(e)+1,e-20),MU=(e,t)=>e>=t?"passes":e>=xE(t)?"close":e>=jy(t)?"weak":"bad",Pd=e=>[{band:"bad",label:`0\u2013${jy(e)-1} bad`},{band:"weak",label:`${jy(e)}\u2013${xE(e)-1} weak`},{band:"close",label:`${xE(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var Ny,OE=l(()=>{"use strict";WE();Ny=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${MU(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var Qt,ME=l(()=>{"use strict";Qt=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var jU,NU=l(()=>{"use strict";jU=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var ooe,noe,DU,HU=l(()=>{"use strict";Xi();OE();ME();NU();ooe=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],noe=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",DU=e=>{let t=e.wizard;if(t===void 0)return[];let r=Qt(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=ooe.map((h,y)=>{let S=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:h,state:S,detail:null}}).filter((h,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=Ny(e),d=c.filter(h=>h.id==="round-0"),p=jU(t)&&(!n||a)?c.filter(h=>h.id!=="round-0"):[],g=v(e.status)&&!s,f=g?[{id:"end",label:noe(e),state:"done",detail:e.errorMessage}]:[];if(g&&f.length>0){let h=Math.min(r,i.length),y=i.slice(0,h).map(S=>({...S,state:"done"}));return[...d,...y,...f,...p]}return[...d,...i,...p,...f]}});var soe,jE,FU=l(()=>{"use strict";Xi();OE();HU();soe=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",jE=e=>{if(e.wizard!==void 0)return DU(e);let t=Ny(e),r=v(e.status)?[{id:"end",label:soe(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var Ad,zU=l(()=>{"use strict";Ad=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var $U=l(()=>{"use strict";vt()});var UU,bd,_d,ea,Dy,NE,BU=l(()=>{"use strict";$U();UU="/prompt-optimizer/agent",bd=`${Ur}${UU}`,_d=`${Ur}/prompt-optimizer`,ea="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",Dy=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${ea}`,NE="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var Rr=l(()=>{"use strict"});var pe,kd=l(()=>{"use strict";Rr();pe=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var DE,GU=l(()=>{"use strict";DE="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var VU,KU=l(()=>{"use strict";VU=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var wd,JU=l(()=>{"use strict";KU();Rr();wd=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:VU(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var HE,YU=l(()=>{"use strict";Rr();HE=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var FE,XU=l(()=>{"use strict";Rr();FE=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var ZU,Td,QU=l(()=>{"use strict";ZU=["generalize","evaluate","separate","optimize_modules"],Td=(e,t)=>{let r=ZU.indexOf(t);if(r===-1)return e;let o=ZU.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var Hy,zE=l(()=>{"use strict";Iy();Hy=e=>{let t=fd(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var Ed,e1=l(()=>{"use strict";zE();Ed=e=>{let t=Hy(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var aoe,loe,coe,t1,r1=l(()=>{"use strict";aoe=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),loe=/^\{\{[a-zA-Z0-9_-]+\}\}$/,coe=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(aoe(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},t1=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>loe.test(n)?n:coe(n,r)).join("")}});var $E,o1=l(()=>{"use strict";r1();$E=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:t1(o.prompt,t)}))}))});var doe,Rd,n1=l(()=>{"use strict";Rr();zE();doe=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Rd=e=>{let t=Hy(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=doe(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Cd,s1=l(()=>{"use strict";vE();Cd=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return hd({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var vd,BE=l(()=>{"use strict";Zi();vd=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ye(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var GE,i1=l(()=>{"use strict";BE();GE=e=>{let t=vd({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var ds,a1=l(()=>{"use strict";ds=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var poe,uoe,le,Fy=l(()=>{"use strict";kd();poe=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},uoe=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,le=e=>{let t=pe(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:poe(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>uoe(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var l1,c1=l(()=>{"use strict";kd();Fy();l1=e=>{let t=le(e.wizard),r=pe(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var VE,d1=l(()=>{"use strict";c1();VE=e=>{let t=l1({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var moe,p1,u1=l(()=>{"use strict";moe=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},p1=e=>[...e].reduce(moe,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var goe,m1,g1=l(()=>{"use strict";goe=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},m1=e=>[...e].reduce(goe,{out:"",inString:!1,escaped:!1}).out});var foe,yoe,f1,y1=l(()=>{"use strict";u1();g1();foe=e=>e.charCodeAt(0)===65279?e.slice(1):e,yoe=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},f1=e=>m1(p1(yoe(foe(e))))});var hoe,Soe,Poe,h1,Aoe,ta,zy=l(()=>{"use strict";kE();y1();hoe=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},Soe=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},Poe=e=>[...e].reduce(Soe,{out:"",inString:!1,escaped:!1}).out,h1=e=>{let t=xy(e);return t.length===0?null:t[t.length-1]},Aoe=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},ta=e=>{let t=f1(hoe(e)),r=h1(t);if(r!==null)return r;let o=Poe(t),n=h1(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw Aoe(i)}}});var boe,_oe,KE,S1,P1=l(()=>{"use strict";boe=/^[a-z0-9][a-z0-9-]{0,62}$/,_oe=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return boe.test(t)?t:""},KE=e=>e.replace(/\s+/gu," ").trim(),S1=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=_oe(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=KE(n.name),a=KE(n.description),c=KE(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var A1,b1,_1=l(()=>{"use strict";A1=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},b1=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var qE,k1=l(()=>{"use strict";zy();P1();_1();qE=(e,t)=>{let r=(()=>{try{return ta(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(A1(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(b1).filter(a=>a!==null),i=S1({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var JE,w1=l(()=>{"use strict";JE=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var YE,T1=l(()=>{"use strict";YE=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var XE,E1=l(()=>{"use strict";kd();Fy();XE=e=>{let t=le(e.wizard),r=pe(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var Ld,R1=l(()=>{"use strict";Ld=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var er,koe,ZE,C1=l(()=>{"use strict";er=m(Xs());zy();koe=(0,er.isType)({name:er.isNonEmptyString,description:er.isString,sampleValue:er.isString}),ZE=e=>{let t=ta(e);if(!(0,er.isType)({templatedPrompt:er.isNonEmptyString,variables:(0,er.isArrayWithEachItem)(koe)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var he,woe,Toe,QE,v1=l(()=>{"use strict";he=m(Xs());Rr();zy();woe=(0,he.isType)({id:he.isNonEmptyString,title:he.isNonEmptyString,prompt:he.isNonEmptyString,order:he.isNumber}),Toe=(0,he.isType)({id:he.isNonEmptyString,title:he.isNonEmptyString,summary:he.isString,topology:(0,he.isOneOf)("chain","parallel"),modules:(0,he.isArrayWithEachItem)(woe),recommended:he.isBoolean}),QE=e=>{let t=ta(e);if(!(0,he.isType)({options:(0,he.isArrayWithEachItem)(Toe)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var ra,L1=l(()=>{"use strict";ra=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var Eoe,eR,tR=l(()=>{"use strict";Eoe=/\{\{([a-zA-Z0-9_-]+)\}\}/g,eR=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(Eoe,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var tr,rr,I1=l(()=>{"use strict";Zi();tR();tr=e=>eR(e.templatedPrompt,e.variables),rr=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ye(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??tr(e.wizard)}});var Roe,ps,x1=l(()=>{"use strict";Roe=/\{\{([a-zA-Z0-9_-]+)\}\}/g,ps=(e,t)=>e.replace(Roe,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var Coe,us,$y=l(()=>{"use strict";Coe=/\{\{([a-zA-Z0-9_-]+)\}\}/g,us=e=>{let t=new Set,r=[];for(let o of e.matchAll(Coe)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Id,W1=l(()=>{"use strict";$y();Id=e=>e.variables.length>0||us(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var rR,oR=l(()=>{"use strict";Rr();rR=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var xd,O1=l(()=>{"use strict";Zi();oR();xd=e=>{let t=e.wizard.evaluateSelectedRound??ye(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:rR(r.judgement,e.passScore)}});var Wd,M1=l(()=>{"use strict";Wd=e=>e.length===1&&e[0].modules.length===1});var nR,j1=l(()=>{"use strict";nR=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Oe,Uy,Od=l(()=>{"use strict";Oe=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),Uy=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var N1,D1=l(()=>{"use strict";Od();N1=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Oe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Oe("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Oe("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var H1,F1=l(()=>{"use strict";Xi();Od();H1=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!v(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Oe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),Oe("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Oe("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",Uy(e.writerLabel,e.folder)),Oe("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Oe("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var z1,$1=l(()=>{"use strict";Od();z1=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Oe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Oe("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Oe("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var U1,B1=l(()=>{"use strict";Od();U1=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Oe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Oe("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",Uy(e.writerLabel,e.folder)),...r?[Oe("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var By,G1=l(()=>{"use strict";Xi();D1();F1();$1();B1();By=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(v(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return H1(r);case"evaluate":return N1({...r,currentRound:e.currentRound});case"separate":return U1(r);case"optimize_modules":return z1({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Md,to,V1=l(()=>{"use strict";Md=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),to=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var voe,Gy,sR,K1=l(()=>{"use strict";$y();voe="wizardParam_",Gy=e=>`${voe}${e}`,sR=e=>{let t=us(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=Gy(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var _t,q1=l(()=>{"use strict";_t=["generalize","evaluate","separate","optimize_modules"]});var jd,ms,oa,ro=l(()=>{"use strict";jd="Stopped because the confirmed token or spend budget was exceeded.",ms="Approaching the confirmed budget. Further trials may hard-stop.",oa="Confirm the Step 4 token and spend budget before optimizing modules."});var kt,na=l(()=>{"use strict";kt=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var nr,Nd=l(()=>{"use strict";ro();nr=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var Loe,oo,Dd=l(()=>{"use strict";ro();Loe={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},oo=e=>{let t=e?.trim()??"";return t.length===0?.01:Loe[t]??.01}});var Vy,iR=l(()=>{"use strict";ro();Dd();Vy=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=oo(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var J1,qy,aR,lR=l(()=>{"use strict";ro();na();Nd();iR();Dd();J1=e=>{let t=Vy({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??oo(e.writerId)??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:kt({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},qy=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),aR=e=>{let t=e.existing??nr(),r=J1({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return qy(t,r)}});var sa,Hd,Z1=l(()=>{"use strict";ro();Rr();na();Nd();lR();iR();Dd();sa=e=>{let t=Vy({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??oo(e.writerId),i=r*4e3,a=n*o*8e3,c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:kt({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},Hd=e=>{let t=e.existing??nr();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=sa({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return qy(t,r)}});var no,Q1=l(()=>{"use strict";na();ro();Nd();no=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??nr(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=kt({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var dR,ia,eB=l(()=>{"use strict";ro();na();dR=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=kt({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:jd,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:jd,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,p=s!==null&&s>0&&o>=s*c;return(d||p)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:ms,costControls:{...t,softWarnFired:!0,softWarnMessage:ms}}:null},ia=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var pR,tB=l(()=>{"use strict";pR=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var L=l(()=>{"use strict";Xi();Ly();CU();AE();Oy();vE();LU();IU();xU();WU();bE();OU();Zi();FU();ME();WE();zU();BU();Rr();kd();GU();JU();YU();XU();QU();e1();o1();n1();s1();BE();i1();a1();Fy();d1();k1();w1();T1();E1();R1();C1();v1();L1();I1();tR();x1();$y();W1();O1();M1();oR();j1();G1();V1();K1();q1();ro();na();Nd();lR();Z1();Dd();Q1();eB();tB()});var uR=l(()=>{"use strict";Jl()});var Ioe,nB,sB=l(()=>{"use strict";uR();Ioe=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,nB=e=>{let t=Dn(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(Ioe)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var aB,xoe,Woe,Cr,Ooe,Moe,iB,Yy,lB,joe,Wt,cB,dB,pB,sr=l(()=>{"use strict";uR();sB();aB=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),xoe=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,Woe=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,Cr=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(xoe.test(e.errorMessage))return"usage_limit";if(Woe.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},Ooe="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",Moe="The writer waited on terminal input and did not return a prompt.",iB=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Yy=e=>{let t=e.trim();if(t.length===0||t.length>=500||!iB.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>iB.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},lB=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},joe=e=>Yy(e.stdout)??Yy(e.stderr)??(lB(e.replyFile)?Yy(e.replyFile):null),Wt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return Ooe;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?Moe:null},cB=e=>{let t=e.trim();return t.length===0?null:Wt(t)!==null?t:Yy(t)??(lB(t)?t:null)},dB=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],pB=e=>{let t=e.replyFileText?.trim()??"",r=Wt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=joe({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=Cr({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=nB([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Dn(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var Noe,mB,uB,fs,Xy=l(()=>{"use strict";sr();Noe=400,mB=(e,t=Noe)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},uB=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:cB(e.promptText)},fs=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:uB(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=uB(e.revisions[n]);if(s!==null)return s.trim()}return null}});var W,Doe,Zy,ue,ys,fB,gB,yB,hB,Me=l(()=>{"use strict";W="manual",Doe=["claude-cli","codex","cursor","antigravity"],Zy={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ue=e=>e===W?"You":e in Zy?Zy[e]:e,ys=e=>Doe.filter(t=>e.includes(t)),fB=e=>{let t=ys(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},gB=(e,t)=>t===W?W:e.find(r=>r===t)??null,yB=(e,t,r)=>{let o=ys(e),n=gB(o,t),s=gB(o,r);return n===null||s===null?null:{judge:n,improver:s}},hB=(e,t,r)=>{let o=ys(e);return t===null||t.trim()===""?r!==W?r:o[0]??null:t===W?null:o.find(n=>n===t)??null}});var SB,Qy,mR,hs,gR,wt,so,Se,at=l(()=>{"use strict";SB=m(require("node:fs")),Qy=m(require("node:os")),mR=m(require("node:path"));No();hs="~",gR=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,wt=e=>{let t=Qy.default.homedir(),r=gR(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},so=e=>{let t=e.trim().length===0?"~":e.trim(),r=Ze(t),o=mR.default.isAbsolute(r)?gR(r):gR(mR.default.resolve(Qy.default.homedir(),r));try{if(!SB.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:wt(o)}},Se=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Qy.default.homedir()});var ct,Xo=l(()=>{"use strict";ct='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var fR,PB,Hoe,AB,bB,yR=l(()=>{"use strict";L();Me();at();Xo();fR=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),PB=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',Hoe=e=>{let t=PB(e.state),r=`<h2>${fR(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${fR(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${ct}</button></div><template>${r}</template></li>`},AB=e=>{let t=e.wizard;if(t===void 0)return"";let r=By({status:e.status,wizard:t,writerLabel:ue(e.judgeModel),runnerLabel:ue(e.runnerModel??e.judgeModel),folderDisplay:wt(Se(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(Hoe).join("")}</ol>`},bB=e=>{let t=e.wizard;if(t===void 0)return"";let r=By({status:e.status,wizard:t,writerLabel:ue(e.judgeModel),runnerLabel:ue(e.runnerModel??e.judgeModel),folderDisplay:wt(Se(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${PB(n.state)}<span class="sdlc-pipeline-label">${fR(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var ir,_B,kB,wB,hR=l(()=>{"use strict";L();ir=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_B="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",kB=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${ir(_B)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${ir(i.name)}}}</strong> \u2014 ${ir(i.description)} (sample: ${ir(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${ir(r)}</pre>`,n=tr(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${ir(n)}</pre>`;return`${t}${o}${s}`},wB=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${ir(_B)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${ir(n.name)}}}</strong> \u2014 ${ir(n.description)} (sample: ${ir(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${ir(r)}</pre>`;return`${t}${o}`}});var Fd,SR=l(()=>{"use strict";Fd=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var TB,EB=l(()=>{"use strict";L();TB=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=cs({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=ls({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var PR,zd,AR=l(()=>{"use strict";Xo();EB();PR=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zd=e=>{let t=TB(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${PR(r)}">${ct}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${PR(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${PR(t)}</pre></template>`}});var bR,$d,_R=l(()=>{"use strict";Xo();bR=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$d=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${bR(r)}">${ct}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${bR(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${bR(t)}</pre></template>`}});var eh,aa,kR=l(()=>{"use strict";SR();AR();_R();eh=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aa=e=>{let t=Fd(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${eh(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,p=e.cycle.revisions.map(g=>{let f=g.judgement?.score,h=f==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${f}`,y=g.judgement?.reasons?.trim()??"",S=y.length===0?"":`<br><span class="muted">${eh(y)}</span>`,u=$d({roundLabel:d(g.roundNumber),promptText:g.promptText}),A=zd({cycle:e.cycle,roundNumber:g.roundNumber,promptText:g.promptText,run:g.run}),T=`${u}${A}`;if(e.interactive){let P=e.selectedRound===g.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${P}> <span class="sdlc-wizard-revision-title">${eh(h)}</span></label>${T}${S}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${eh(h)}</span>${T}${S}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var wR,RB,CB,vB,TR=l(()=>{"use strict";wR=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RB=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${wR(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${wR(t.prompt)}</pre></li>`).join("")}</ol>`,CB=e=>RB([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),vB=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${wR(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${RB(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var Ud,Foe,th,ER=l(()=>{"use strict";L();TR();Ud=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Foe=e=>{let t=e.wizard;return t===void 0?"":rr({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},th=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=Foe(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Ud(n.orchestratorSkill.fileName)}</code> \u2014 ${Ud(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${Ud(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=CB(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${Ud(r)} <span class="muted">${Ud(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Ve,zoe,$oe,Uoe,Boe,rh,Goe,Voe,Koe,qoe,Joe,Yoe,la,oh=l(()=>{"use strict";L();yR();hR();kR();AR();_R();ER();Ve=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zoe={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},$oe=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Ve(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Ve(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Ve(o)}</pre></details>`;return`<h2>${Ve(e)}</h2>${n}`},Uoe=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=tr(t).trim(),n=rr({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!v(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${$oe("What is being evaluated",i)}`},Boe=(e,t)=>{let r=e.wizard;if(r===void 0||v(e.status))return"";let o=zoe[t];return o===void 0||r.phase!==o?"":bB(e)},rh=(e,t,r)=>{let o=Boe(e,t),n=t==="wizard-2"?Uoe(e):"";return`${o}${n}${r}`},Goe=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},Voe=e=>{let t=e.wizard;return t===void 0?"":kB(t)},Koe=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Ve(a)}</span>`,d=`Round ${n.roundNumber}`,p=$d({roundLabel:d,promptText:n.promptText}),g=zd({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ve(s)}${i}</span>${p}${g}${c}</li>`}).join("")}</ul>`,qoe=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return aa({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=Goe(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${Koe(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=rr({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Ve(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",p=`Round ${c.roundNumber} \u2014 score ${d}`,g=$d({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),f=zd({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ve(p)}</span>${g}${f}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Ve(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},Joe=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Ve(n.title)}</strong> <span class="muted">(${Ve(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Ve(o.title)}</strong>${n}${Ve(s)}${th(e,o)}</li>`}).join("")}</ul>`},Yoe=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Ve(i)}</span> <strong>${Ve(n.title)}</strong>${Ve(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Ve(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?aa({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},la=(e,t)=>{switch(t){case"wizard-1":return rh(e,t,Voe(e));case"wizard-2":return rh(e,t,qoe(e));case"wizard-3":return rh(e,t,Joe(e));case"wizard-4":return rh(e,t,Yoe(e));default:return""}}});var Xoe,Zoe,LB,IB,xB=l(()=>{"use strict";L();Xy();sr();oh();Xoe=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},Zoe=e=>{let t=e.goal.trim();return t.length===0?null:t},LB=(e,t,r,o,n)=>{let s=Wt(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},IB=(e,t)=>{let r=Zoe(e);if(t.id.startsWith("wizard-")){let s=la(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=Ad(e,t);if(s!==null){let a=fs(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ye(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:LB(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:Xoe(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:LB(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var Ss,WB,OB=l(()=>{"use strict";Ss=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WB=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${Ss(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Ss(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${Ss(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${Ss(n)}</h2><pre class="mono">${Ss(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${Ss(e.goal)}</dd></div></dl>`;return`<h2>${Ss(e.title)}</h2>${i}${t}${r}${o}${s}`}});var Qoe,MB,Bd,RR,nh=l(()=>{"use strict";L();Qoe=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),MB=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||v(e.status))return null;let r=Qt(t);return r<0||r>3?null:`wizard-${r+1}`},Bd=(e,t)=>Qoe.has(t)?MB(e)===t:!1,RR="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var ene,sh,CR=l(()=>{"use strict";ene='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',sh=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${ene}</button>`});var Ps,ih=l(()=>{"use strict";L();Ps=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:yd({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:Sd(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var tne,jB,rne,vR,NB,one,nne,sne,ine,DB,HB=l(()=>{"use strict";L();ih();tne={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},jB=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},rne=e=>tne[e]??null,vR=(e,t)=>{let r=e.wizard,o=rne(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=Qt(r);return o<n||o===n},NB=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},one=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:tr(t).trim();return o.length===0?null:Ed({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:jB(e,"generalize")})},nne=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=Ps(e);return n===null?null:Jo({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=NB(e)?.promptText.trim()??rr({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:cs({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},sne=e=>{let t=e.wizard;if(t===void 0)return null;let r=rr({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:Rd({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:jB(e,"separate")})},ine=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=to(t),s=ps(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=Ps(e);return c===null?null:Jo({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=NB(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||v(e.status)&&i?.judgement!==null)?ls({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):Cd({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:ds(t,r).output,moduleTitle:o.title})},DB=(e,t)=>{if(!vR(e,t))return null;switch(t){case"wizard-1":return one(e);case"wizard-2":return nne(e);case"wizard-3":return sne(e);case"wizard-4":return ine(e);default:return null}}});var ane,ah,LR=l(()=>{"use strict";L();ane=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},ah=(e,t)=>{let r=e.wizard,o=ane(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=Qt(r);return o<n?"done":o===n&&v(e.status)&&e.status==="failed"?"failed":o<=n&&v(e.status)?"done":"pending"}});var lne,ca,lh=l(()=>{"use strict";Xo();HB();LR();lne=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ca=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(ah(e,t)==="pending")return""}else if(!vR(e,t))return"";let o=DB(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${ct}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${lne(o)}</pre></template>`}});var As,io,da=l(()=>{"use strict";As=e=>e.toLocaleString("en-US"),io=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var vr,cne,FB,ch,zB,$B,dh=l(()=>{"use strict";L();xB();OB();nh();CR();Xo();Xy();yR();lh();da();vr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cne=(e,t)=>{let r=Ad(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?io(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${As(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${vr(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${vr(r)}</span>`:"",d=WB(IB(t,e)),p=t.wizard!==void 0&&t.wizard.phase==="complete"&&v(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${vr(e.id)}"`:"",g=Bd(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${vr(RR)}"><input type="hidden" name="cycleId" value="${vr(t.id)}"><input type="hidden" name="wizardStepId" value="${vr(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",f=e.state==="active"&&e.id.startsWith("wizard-")?AB(t):"",h=o?"failed":e.state,y=o?fs(t):null,S=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${ct}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${vr(y)}</pre></template>`:"",u=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?ca(t,e.id):"";return`<li class="sdlc-node sdlc-node-${h}" data-sdlc-step-id="${vr(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${p} data-sdlc-node>${n}<span class="sdlc-node-label">${vr(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${g}${u}${S}</div></div>${f}<template>${d}</template></li>`},FB=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>cne(r,t)).join("")}</ol>`,ch=e=>`<div class="sdlc-score" aria-label="What the score means">${Pd(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${vr(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,zB=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${sh({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,$B=`<script>
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
</script>`});var ph,uh,mh,UB,IR=l(()=>{"use strict";ph="support-reply",uh="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",mh=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),UB=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var gh,BB,GB=l(()=>{"use strict";L();dh();IR();gh=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),BB=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${ch(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${gh(uh)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${gh(mh)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${gh(UB)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${gh(ph)}">Run this sample</a>
      </div>
    </section>`});var xR,fh,dne,VB,KB=l(()=>{"use strict";xR=m(require("node:fs")),fh=m(require("node:path")),dne=e=>fh.default.join(fh.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),VB=(e,t)=>{let r=dne(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;xR.default.mkdirSync(fh.default.dirname(r),{recursive:!0}),xR.default.appendFileSync(r,o,"utf8")}});var pa,qB,pne,JB,une,YB,Lr,Q,XB,z,Tt=l(()=>{"use strict";pa=m(require("node:fs")),qB=m(require("node:path"));L();KB();pne=e=>e.wizard===void 0?e:{...e,wizard:HE(e.wizard)},JB=new Set,une=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),YB=(e,t)=>{pa.default.mkdirSync(qB.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;pa.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),pa.default.renameSync(r,e)},Lr=e=>{if(!pa.default.existsSync(e))return[];try{let t=JSON.parse(pa.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(une).map(pne):[]}catch{return[]}},Q=(e,t)=>Lr(e).find(r=>r.id===t)??null,XB=(e,t)=>{JB.add(t);let r=Lr(e).filter(o=>o.id!==t);YB(e,r)},z=(e,t)=>{if(JB.has(t.id))return;let r=Lr(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];YB(e,o),VB(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var ua,Ir,Gd,ZB,yh,mne,QB,eG,tG,WR=l(()=>{"use strict";ua=m(require("node:fs")),Ir=m(require("node:path")),Gd=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},ZB=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),yh=(e,t)=>{let r=Gd(e);return r.length>0?r:Gd(t)},mne=e=>{let t=yh(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${ZB(o)}`,...n.length>0?[`description: ${ZB(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},QB=e=>`.cursor/skills/${e}/SKILL.md`,eG=(e,t)=>{let r=Gd(t);if(r.length===0)return!1;let o=Ir.default.resolve(e),n=Ir.default.resolve(o,".cursor","skills"),s=Ir.default.resolve(o,QB(r));return s.startsWith(`${n}${Ir.default.sep}`)?ua.default.existsSync(s):!1},tG=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(yh(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Ir.default.resolve(e.workingDirectory);try{if(!ua.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=mne({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=QB(r.slug),n=Ir.default.resolve(t,".cursor","skills"),s=Ir.default.resolve(t,o);if(!s.startsWith(`${n}${Ir.default.sep}`))return{ok:!1,errorCode:"path"};if(ua.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{ua.default.mkdirSync(Ir.default.dirname(s),{recursive:!0}),ua.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var gne,rG,oG,nG=l(()=>{"use strict";L();Tt();at();sr();WR();gne=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,rG=e=>{let t=e.get("savedSkill");return t!==null&&gne.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},oG=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=Q(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!v(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ye(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||Wt(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=tG({workingDirectory:Se(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var hh,Sh,Vd=l(()=>{"use strict";L();hh=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=no({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},Sh=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var Zo,Kd=l(()=>{"use strict";L();Vd();Zo=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=nR(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=aR({moduleCount:o.length,existing:e.costControls,writerId:n}),i=hh(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Md(r.variables)},updatedAt:new Date().toISOString()}}});var Qo,qd=l(()=>{"use strict";Qo=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var OR=l(()=>{"use strict";Gt();od();Jl()});var MR,sG,jR,iG,aG=l(()=>{"use strict";MR={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},sG=e=>e.exitCode===null&&e.signalCode===null,jR=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!sG(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!sG(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),iG=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),jR(e).then(s=>{r({...MR,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var lG,Jd,cG,NR,fne,HR,FR,yne,hne,Sne,dG,Pne,DR,pG,Yd,uG,Ane,bne,dt,bs=l(()=>{"use strict";lG=require("node:child_process"),Jd=m(require("node:fs")),cG=m(require("node:os")),NR=m(require("node:path"));OR();aG();sr();fne=["claude-cli","codex","cursor","antigravity"],HR=18e4,FR=6e5,yne=12e4,hne=9e5,Sne="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",dG="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",Pne="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",DR=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},pG=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=DR(process.env[dG])??Math.max(r,FR));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:DR(process.env[Pne])??hne;return Math.min(o,Math.max(yne,r))},Yd=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?DR(process.env[dG])??FR:HR,uG=e=>`The writer timed out after ${e}ms.`,Ane=e=>fne.includes(e),bne=e=>e===!0||process.env[Sne]==="1",dt=e=>new Promise(t=>{if(e.signal?.aborted){t(MR);return}if(bne(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!Ane(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=Sr(r,e.prompt,ke({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!Jd.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:HR,s=NR.default.join(Jd.default.mkdtempSync(NR.default.join(cG.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=dB({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},p=(0,lG.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),g=f=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(f))};iG(p,e.signal,g,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",jR(p).then(f=>{g({ok:!1,errorMessage:uG(n),errorKind:"writer_timeout",killSignal:f})})},n),p.stdout.on("data",f=>{a.push(Buffer.from(f))}),p.stderr.on("data",f=>{c.push(Buffer.from(f))}),p.on("error",()=>g({ok:!1,errorMessage:"The writer failed to start."})),p.on("close",()=>{if(d.settled)return;let f=Jd.default.existsSync(s)?Jd.default.readFileSync(s,"utf8"):null,h=pB({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:f});if(h.ok&&d.stopReason!=="abort"){g(h);return}d.stopReason===null&&g(h)})})});var _ne,Xd,zR=l(()=>{"use strict";L();da();_ne=e=>{if(e.wizard!==void 0){let t=Ld(e.wizard),r=io(e);return(t??0)+r}return io(e)},Xd=e=>{let t=dR({costControls:e.costControls,spentTokens:_ne(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var mG,kne,Zd,Ph,Ah=l(()=>{"use strict";L();Me();zR();mG=e=>e===W?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},kne=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Zd=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=CE({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:mG(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?pR({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:Sd(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=kne(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?Xd({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):Xd({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},Ph=(e,t,r=null)=>{let o=My({raw:t,judge:mG(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var bh,$R=l(()=>{"use strict";bh=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var yG,_h,kh,gG,fG,UR,wne,hG,BR,Tne,SG,Ene,Rne,PG,AG=l(()=>{"use strict";yG=require("node:child_process"),_h=m(require("node:fs")),kh=m(require("node:path"));Rf();L();gG=4e3,fG=12e3,UR=(e,t)=>{let r=(0,yG.spawnSync)("git",[...t],{cwd:e,env:Uo(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},wne=e=>UR(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",hG=e=>{let t=UR(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},BR=(e,t)=>{let r=kh.default.resolve(e,t),o=kh.default.relative(e,r);if(o.startsWith("..")||kh.default.isAbsolute(o)||!_h.default.existsSync(r)||!_h.default.statSync(r).isFile())return null;let n=_h.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>gG?`${n.slice(0,gG)}
\u2026truncated`:n},Tne=e=>e.length>fG?`${e.slice(0,fG)}
\u2026truncated`:e,SG=e=>{let t=IE(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,BR(e.workingDirectory,n)])),o=wne(e.workingDirectory);return{git:o,status:o?hG(e.workingDirectory):{},files:r,paths:t}},Ene=(e,t)=>{let r=UR(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=BR(e,t);return o===null?`${t} is missing.`:o},Rne=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",PG=e=>{let t=e.before.git?hG(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=BR(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>Ene(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:Rne(e.before.git,e.before.paths.length>0),evidence:Tne(i.join(`

`))}}});var KR,q,qR,Ke,bG,Cne,vne,_G,ma,kG,ga,Lne,Ine,Qd,GR,VR,xne,wG,Wne,One,Mne,TG,jne,EG,RG,Nne,Dne,CG,vG=l(()=>{"use strict";KR=require("node:child_process"),q=m(require("node:fs")),qR=m(require("node:os")),Ke=m(require("node:path"));Rf();bG=8e6,Cne=16e6,vne=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],_G=(e,t)=>{let r=(0,KR.spawnSync)("git",[...t],{cwd:e,env:Uo(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},ma=(e,t)=>(0,KR.spawnSync)("git",[...t],{cwd:e,env:Uo(),timeout:8e3}).status===0,kG=e=>{let t=_G(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},ga=(e,t)=>{let r=Ke.default.resolve(e,t),o=Ke.default.relative(e,r);return o.startsWith("..")||Ke.default.isAbsolute(o)?null:r},Lne=(e,t)=>{let r=ga(e,t);if(r===null||!q.default.existsSync(r))return null;let o=q.default.statSync(r);return!o.isFile()||o.size>bG?null:q.default.readFileSync(r)},Ine=(e,t,r)=>{let o=ga(e,t);o!==null&&(q.default.mkdirSync(Ke.default.dirname(o),{recursive:!0}),q.default.writeFileSync(o,r))},Qd=(e,t)=>{let r=ga(e,t);r===null||!q.default.existsSync(r)||q.default.rmSync(r,{recursive:!0,force:!0})},GR=(e,t)=>ma(e,["cat-file","-e",`HEAD:${t}`]),VR=e=>{let t=_G(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},xne=e=>Ke.default.resolve(e)!==Ke.default.resolve(qR.default.homedir()),wG=e=>{if(!q.default.existsSync(e))return 0;let t=q.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?q.default.readdirSync(e).reduce((r,o)=>r+wG(Ke.default.join(e,o)),0):0},Wne=(e,t,r)=>{let o=ga(e,r);if(o===null||!q.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(wG(o)>Cne)return{relativePath:r,existed:!0,copyDir:null};let n=Ke.default.join(t,"cache",r);return q.default.mkdirSync(Ke.default.dirname(n),{recursive:!0}),q.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},One=400,Mne=32e6,TG=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!q.default.existsSync(s)))for(let i of q.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=Ke.default.join(s,i),c=q.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>bG)){if(t.length>=One||r+c.size>Mne){o=!1;return}r+=c.size,t.push(Ke.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},jne=(e,t,r)=>{let o=ga(e,r);if(o===null||!q.default.existsSync(o))return null;let n=Lne(e,r);if(n===null)return"skip";let s=Ke.default.join(t,"files",r);return q.default.mkdirSync(Ke.default.dirname(s),{recursive:!0}),q.default.writeFileSync(s,n),s},EG=e=>{let t=q.default.mkdtempSync(Ke.default.join(qR.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?kG(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:TG(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,jne(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?VR(e.workingDirectory):null,isolateCaches:xne(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:vne.map(i=>Wne(e.workingDirectory,t,i))}},RG=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Qd(e.workingDirectory,t);return}Ine(e.workingDirectory,t,q.default.readFileSync(r))}},Nne=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?RG(e,t):GR(e.workingDirectory,t)?ma(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Qd(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&GR(e.workingDirectory,t)&&ma(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!GR(e.workingDirectory,t)&&ma(e.workingDirectory,["reset","-q","HEAD","--",t])},Dne=(e,t)=>{let r=ga(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Qd(e.workingDirectory,t.relativePath),q.default.mkdirSync(Ke.default.dirname(r),{recursive:!0}),q.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Qd(e.workingDirectory,t.relativePath);return}if(q.default.existsSync(r))for(let o of q.default.readdirSync(r)){let n=Ke.default.join(r,o);q.default.statSync(n).mtimeMs>=e.startedMs-1e3&&q.default.rmSync(n,{recursive:!0,force:!0})}}}},CG=e=>{try{if(e.git){if(VR(e.workingDirectory)!==e.head&&(!(e.head===null?ma(e.workingDirectory,["update-ref","-d","HEAD"]):ma(e.workingDirectory,["reset","--hard",e.head]))||VR(e.workingDirectory)!==e.head))throw new Error("head");let r=kG(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))Nne(e,o)}else{if(e.complete)for(let t of TG(e.workingDirectory).paths)e.files[t]===void 0&&Qd(e.workingDirectory,t);for(let t of Object.keys(e.files))RG(e,t)}for(let t of e.caches)Dne(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{q.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var wh,Th,Hne,Fne,zne,$ne,Une,LG,Bne,IG,xG=l(()=>{"use strict";L();Ah();$R();AG();vG();Me();at();sr();bs();wh=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),Th=e=>({...e,status:"stopped",errorMessage:as,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),Hne=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),Fne=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==W?t:e.improverModel!==W?e.improverModel:null}return e.judgeModel!==W?e.judgeModel:e.improverModel!==W?e.improverModel:null},zne=async e=>{let t=Se(e.cycle),r=SG({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=EG({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Cd({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:ds(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):hd({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=pG({promptText:e.revision.promptText,isModuleRun:i}),c=Yd({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},p=await dt({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),g=p.ok?PG({workingDirectory:t,before:r,writerReply:p.text}):null,f=CG(o),h={...e.cycle,revisions:e.cycle.revisions.map(y=>y.roundNumber===e.cycle.currentRound?d:y)};return p.ok?!f.ok||g===null?{ok:!1,cycle:wh(h,f.ok?"Could not put the folder back after the run.":f.errorMessage)}:{ok:!0,cycle:h,run:{output:p.text.trim(),tokens:p.tokens,delayMs:Date.now()-n,lookedAt:g.lookedAt,evidence:g.evidence}}:p.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:Th(h)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:wh(h,p.errorMessage,Cr(p))})},$ne=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:zne({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),Une=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),LG=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await dt({writerAgent:e.reviewer,workingDirectory:Se(e.cycle),prompt:LE({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:Th(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},Bne=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===W)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await dt({writerAgent:t.judgeModel,workingDirectory:Se(t),prompt:cs({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Zd(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?Th(o):(e.onWriterFailure?.(t.judgeModel),wh(o,n.errorMessage,Cr(n)))},IG=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return Bne(e);let o=Fne(t),n=await $ne({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?Hne(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===W){let p=await LG({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...Une(s,p.text),judgePhase:void 0}}let i=await dt({writerAgent:t.judgeModel,workingDirectory:Se(t),prompt:ls({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?Th(s):(e.onWriterFailure?.(t.judgeModel),wh(s,i.errorMessage,Cr(i)));let a=await LG({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Zd(s,i.text,c);return bh(d,a.text)}});var Eh,Gne,Vne,JR,WG=l(()=>{"use strict";L();Ah();xG();ih();sr();Me();zR();at();bs();Eh=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),Gne=e=>({...e,status:"stopped",errorMessage:as,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),Vne=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?Gne(e):(n?.(r),Eh(e,t.errorMessage,Cr(t))),JR=async(e,t,r,o)=>{let n=Xd(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return Eh(e,"This round has no prompt.");if(e.status==="judging")return IG({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return Eh(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===W)return e;let i=Ps(e);if(i===null)return Eh(e,"The improver needs the score and the reason.");let a=await dt({writerAgent:e.improverModel,workingDirectory:Se(e),prompt:Jo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:Yd()}),c=Vne(e,a,e.improverModel,r,t);return c!==null?c:Ph(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var ep,YR,Kne,MG,OG,qne,Jne,Rh,jG,NG,Yne,Xne,_s,DG,HG,tp=l(()=>{"use strict";L();Kd();qd();Me();at();sr();bs();WG();SR();ep=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),YR=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return ep(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},Kne=e=>{let t=Cr(e);return aB(e)||t==="usage_limit"||t==="action_required"},MG=(e,t,r)=>Kne(r)?ep(e,r.errorMessage,Cr(r)):YR(e,t,r.errorMessage),OG=e=>{let t=e.wizard;return t===void 0||Fd(e).length===0?e:{...e,wizard:ra({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},qne=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",Jne=e=>{let t=e.wizard;if(t===void 0)return e;let r=vd({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:ra({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Rh=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),jG=e=>e.judgeModel!==W?e.judgeModel:e.improverModel!==W?e.improverModel:null,NG=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},Yne=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=jG(e);if(n===null)return ep(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??tr(o),i=Ed({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:NG(e,"generalize")}),a=await dt({writerAgent:n,prompt:i,workingDirectory:Se(e),signal:t});if(!a.ok)return r?.(n),MG(e,"generalize",a);try{let c=ZE(a.text),d=ra({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Md(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return Id(d)?_s({...p,wizard:{...d,gate:null}}):Rh(p,"generalize")}catch(c){return YR(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},Xne=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=jG(e);if(n===null)return ep(e,"Choose a writer to suggest splits.");let s=rr({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Rd({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:NG(e,"separate")}),a=await dt({writerAgent:n,prompt:i,workingDirectory:Se(e),signal:t});if(!a.ok)return r?.(n),MG(e,"separate",a);try{let c=QE(a.text),d=$E(c,o.variables),p=ra({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),g={...e,wizard:p};return Wd(d)?Zo(g,d[0]):Rh(g,"separate")}catch(c){return YR(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},_s=e=>{let t=e.wizard;if(t===void 0)return e;let r=tr(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},DG=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return ep(e,"This module is missing.");let n=to(r),s=ps(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==W?e.runnerModel:e.judgeModel!==W?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:pe(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},HG=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return JR(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return Yne(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return Xne(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await JR(e,t,r,o);if(v(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Fd(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let g=ye(s.revisions.map(f=>({roundNumber:f.roundNumber,promptText:f.promptText,score:f.judgement?.score??0,reasons:f.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:g}}}if(i==="evaluate"&&xd({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let p=OG(Rh(a,i));return Qo(p)}let c=Rh(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=GE({wizard:{...c.wizard,modules:c.wizard.modules.map((g,f)=>f===c.wizard.currentModuleIndex&&g.status==="running"?{...g,status:"paused"}:g)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:qne(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?OG(d):Jne(d)}return s}return n.phase==="complete",e}});var fa,Ch=l(()=>{"use strict";L();Me();fa=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:JE(r,e.judgeModel===W),updatedAt:new Date().toISOString()}}});var ya,vh=l(()=>{"use strict";ya=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var Ot,FG,Zne,zG=l(()=>{"use strict";L();at();vh();sr();WR();Ot=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),FG=e=>{if(!v(e.status))return"";let t=ye(e.revisions.map(f=>({roundNumber:f.roundNumber,promptText:f.promptText,score:f.judgement?.score??null,reasons:f.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=Wt(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Ot(t.reasons.trim())}</p>`,i=e.status==="passed",a=ya(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${Ot(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${Ot(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',p=n!==null?`<div class="alert-error">${Ot(n)}</div>`:i?Zne({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:Se(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${Ot(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${Ot(t.promptText)}</pre></details>`,g=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${g}</h2>${d}${o}${s}${p}</section>`},Zne=e=>{let t=e.sourceSkill?.fileName??Gd(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=yh(t,r),s=n.length>0&&eG(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Ot(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Ot(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Ot(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Ot(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Ot(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Ot(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var $G,UG=l(()=>{"use strict";$G=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var BG,Qne,Lh,pt,Ih,XR=l(()=>{"use strict";L();Me();UG();Xy();sr();vh();BG=["Generalize","Evaluate","Separate","Optimize modules"],Qne=e=>{let t=Qt(e),r=t>=0&&t<BG.length?BG[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},Lh=(e,t)=>{let r=fs(e),o=r===null?null:$G(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},pt=(e,t)=>({title:e,detail:t,replyPreview:null}),Ih=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=fs(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:mB(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!v(e.status)){let t=e.judgeModel;return pt(`${ue(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!v(e.status)){let t=e.judgeModel;return pt(`${ue(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===W?pt(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?pt(`${ue(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):pt(`${ue(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===W){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==W?pt(`${ue(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):pt(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return pt(`${ue(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=pe(t);return pt(`${ue(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return pt(`${ue(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=pe(t);return pt(`${ue(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return pt(`${ue(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===W){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return pt("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return pt(`${ue(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>Wt(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=le(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||v(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?Lh(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=ya(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?Lh(e,{title:`${Qne(r)}${s}`,detail:t.length>0?t:n}):Lh(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(v(e.status)){let t=e.errorMessage?.trim()??"";return Lh(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var xr,rp=l(()=>{"use strict";Me();xr=e=>{if(e.status==="improving"&&e.improverModel===W)return!0;if(e.status!=="judging"||e.judgeModel!==W)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===W}});var GG,VG=l(()=>{"use strict";GG=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var en,ese,KG,qG=l(()=>{"use strict";L();en=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ese=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${en(r)}</p>`},KG=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${en(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${en(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${en(a)}.</p>`}<pre class="mono">${en(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Yo(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${en(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",g=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${en(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${ese(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${en(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var op,tse,JG,YG=l(()=>{"use strict";L();sr();op=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tse=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=Wt(t.promptText),n=t.judgement?.reasons?`<p class="muted">${op(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${op(i)}.</p>`}<pre class="mono">${op(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Yo(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${op(d)}</pre>`:`<div class="alert-error">${op(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},JG=e=>e.revisions.map(t=>tse(e,t)).join("")});var XG,ZG=l(()=>{"use strict";L();XG=e=>{if(v(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Wr,rse,ZR,ose,nse,sse,ise,QG,e2,QR=l(()=>{"use strict";ZG();Wr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rse="Stop this run? Writers will stop and the best prompt is kept.",ZR="End the wizard? Writers will stop and progress from finished steps is kept.",ose="Skip this module and pause at the step gate?",nse=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${Wr(rse)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Wr(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,sse=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${Wr(ZR)}"><input type="hidden" name="cycleId" value="${Wr(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,ise=e=>{let t=Wr(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Wr(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${Wr(ose)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${Wr(ZR)}">End wizard</button>
    </form>
  </div>`},QG=e=>{let t=XG(e);return t==="none"?"":t==="legacy_stop"?nse(e.id):t==="wizard_end_only"?sse(e.id):ise(e)},e2=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=Wr(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${Wr(ZR)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var t2,r2=l(()=>{"use strict";L();da();t2=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=le(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${As(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${As(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${pe(r)}`}return""}});var ase,lse,o2,cse,n2,s2=l(()=>{"use strict";L();r2();LR();oh();lh();ase=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',lse=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',o2=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cse=(e,t,r)=>{let o=la(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=t2(e,t),i=ah(e,t),a=ase(i),c=lse(i),d=ca(e,t,{forOutcomeSummary:!0}),p=`${a}<span class="sdlc-wizard-outcome-step-title">${o2(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${o2(s)}</span>`,g=t==="wizard-4"&&r.phase==="complete"?" open":"",f=i==="failed"&&t!=="wizard-4"?" open":"",h=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${h}"${g}${f}><summary aria-controls="${h}-body">${p}</summary><div class="sdlc-wizard-outcome-step-body" id="${h}-body">${o}</div></details>`},n2=e=>{let t=e.wizard;if(t===void 0||!v(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>cse(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var i2,a2,l2=l(()=>{"use strict";i2=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),a2=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${i2(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${i2(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var eC,c2,tC=l(()=>{"use strict";eC=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,c2=(e,t)=>{if(eC(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var d2,p2=l(()=>{"use strict";d2=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var xh,u2,m2=l(()=>{"use strict";L();tC();tC();p2();xh=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),u2=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=le(t),o=pe(t),n=r.terminalStatusSuggestion==="passed"?"":d2(r,o),s=o-10,i=r.rows.map((c,d)=>{let p=t.modules[d],g=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,h=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=p===void 0?c.status:c2(p,o),S=p!==void 0&&eC(p,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':y==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':y==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':xh(y);return`<tr${h}><td>${xh(c.title)}</td><td>${xh(g)}</td><td>${c.tokens??"\u2014"}</td><td>${S}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${xh(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var ks,Wh,rC=l(()=>{"use strict";ks=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Wh=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${ks(r.fileName)}</code> \u2014 ${ks(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${ks(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${ks(i.name)}</strong> <code>.cursor/skills/${ks(i.fileName)}/SKILL.md</code></p><p class="muted">${ks(i.description)}</p><p>${ks(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var dse,g2,f2=l(()=>{"use strict";L();l2();m2();rC();dse=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),g2=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!v(e.status)||t.modules.length===0)return"";let r=u2(e),o=a2(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=le(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${dse(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${Wh(e)}${a}${r}${o}</section>`}});var Y,Oh=l(()=>{"use strict";L();Y={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var Mh,oC=l(()=>{"use strict";Mh=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var y2,h2=l(()=>{"use strict";Oh();oC();y2=e=>{let t=Mh({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:Y.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var ao,np=l(()=>{"use strict";ao=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var lo,jh,nC=l(()=>{"use strict";L();dh();zG();XR();rp();VG();ih();qG();YG();QR();s2();f2();da();h2();at();np();lo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jh=e=>{let t=!v(e.status)&&e.status!=="wizard_paused"&&!xr(e),r=Ih(e),o=FB(jE(GG(e)),e),n=v(e.status)?"":QG(e),s=n2(e),i=g2(e),a=FG(e),c=e.errorMessage===null?"":`<div class="alert-error">${lo(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?le(e.wizard):null,f=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,h=!t&&e.wizard!==void 0&&v(e.status)&&(e.wizard.phase==="complete"||le(e.wizard).passedModuleCount>0),y=h?f?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",S=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${lo(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",u=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${lo(r.replyPreview)}</pre>`,A=r.detail.length===0&&S.length===0&&u.length===0||r.detail.length===0&&u.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${lo(r.detail)}${p}</p>`}${u}</div>`,T=e.revisions.find(mn=>mn.roundNumber===e.currentRound),P=e.status==="improving"?Ps(e):null,b=io(e),k=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),E=xr(e)?KG({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:P?.promptText??T?.promptText??"",score:P?.score??T?.judgement?.score??null,reasons:P?.reasons??T?.judgement?.reasons??null,avoid:P?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:T?.run??null,minJudgeScore:k?1:0}):"",w=e.wizard!==void 0&&e.wizard.phase==="complete"&&v(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!w&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?pe(e.wizard):e.passScore,j=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${ch(I)}</div>`:"",O=e.status==="failed"?y2({status:e.status,errorKind:e.errorKind}):null,$=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':v(e.status)?O!==null?`<span class="${O.badgeClass}">${O.badgeLabel}</span>`:w&&g!==null&&!f?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",B=t?d:h?f?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',Ce=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${lo(wt(Se(e)))}</li>`:"",b>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${As(b)} so far</li>`:""].filter(mn=>mn.length>0),F=Ce.length===0?"":`<ul class="sdlc-run-meta">${Ce.join("")}</ul>`,nt=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,wo=w?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,To=w?"":j.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${wo}</div>`:`<div class="sdlc-run-grid">${wo}${j}</div>`,dr=JG(e),DP=e.wizard!==void 0&&v(e.status)&&e.revisions.every(mn=>mn.roundNumber===0&&(mn.judgement===void 0||mn.judgement===null)),Ja=dr.length===0||DP?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${dr}</div></section>`,HP=`<p class="sdlc-run-goal" title="${lo(e.goal.trim())}">${lo(ao(e.goal))}</p>`,Tu=w?`${c}${i}${s}${E}${a}`:`${c}${To}${E}${s}${a}`,Gs='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',I6=w?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${lo(e.updatedAt)}" aria-busy="${t?"true":"false"}">${Gs}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${$}</div>${HP}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${B}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${lo(r.title)}</h2>${A}${S}${I6}</div></div>${F}${nt}</header>${Tu}</section>${Ja}`}});var S2,P2=l(()=>{"use strict";L();qd();S2=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!xd({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:Qo(e)}});var A2,b2=l(()=>{"use strict";L();tp();A2=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Id(t)?e:_s({...e,wizard:{...t,gate:null}})}});var _2,k2=l(()=>{"use strict";L();Kd();_2=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Wd(t.splitOptions))return e;let r=t.splitOptions[0];return Zo(e,r)}});var pse,ws,Nh=l(()=>{"use strict";P2();b2();k2();Tt();pse=e=>{let t=A2(e),r=S2(t);return _2(r)},ws=(e,t)=>{let r=pse(t);return r!==t?(z(e,r),r):t}});var w2,co,sp=l(()=>{"use strict";L();w2=e=>_t.indexOf(e),co=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||v(e.status)?_t.length:t.gate!==null?w2(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?w2(t.phase):null}});var T2,E2=l(()=>{"use strict";T2=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Ts,R2,C2=l(()=>{"use strict";L();E2();Ts=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),R2=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=ds(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Ts(T2(o))}</pre></div>`:"",s=us(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=to(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=Gy(c),g=i[c]??"",f=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Ts(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Ts(p)}">${Ts(f)}</label>
        ${h}
        <input class="input" type="text" id="${Ts(p)}" name="${Ts(p)}" value="${Ts(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var v2,L2=l(()=>{"use strict";v2={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var ip,use,Pe,tn=l(()=>{"use strict";L2();Xo();ip=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),use=e=>{let t=v2[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${ip(t.title)}" aria-describedby="${r}" aria-expanded="false">${ct}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${ip(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${ip(t.example)}</span></span></button>`},Pe=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${ip(r)}"`}>${ip(e)}</span>${use(t)}</span>`});var Mt,I2,x2,W2=l(()=>{"use strict";L();Vd();Oh();tn();Mt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),I2=e=>{let t=e.costControls;if(t===void 0||ia(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??kt({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${Mt(Y.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${Mt(t.softWarnMessage??ms)}</p>`:"",d=Sh({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${Mt(Y.estimateOverCeilingWarn)}</p>`:"",p=e.wizard?.modules.length??0,g=p>0?`<p class="muted">Step 4 will optimize ${p} module${p===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${Mt(Y.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${Mt(Y.confirmLede)}</p>
  ${g}
  ${a}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${Mt(oa)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${Mt(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${Mt(Y.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${Mt(Y.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${Mt(Y.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
    </dl>
    <div class="field">
      ${Pe(Y.confirmedTokenLabel,"confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${s}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${Pe(Y.confirmedSpendLabel,"confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${i}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${Mt(Y.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${Mt(Y.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},x2=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!ia(r)}});var mse,O2,M2=l(()=>{"use strict";Xo();mse=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),O2=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${ct}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${mse(t)}</pre></template>`}});var ap,j2,N2=l(()=>{"use strict";L();hR();C2();kR();QR();rC();ER();W2();M2();ap=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),j2=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(x2(e))return I2(e);let n=pe(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?wB(r):"",a=o==="evaluate"?Wh(e):"",c=o==="evaluate"?aa({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",p=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(I=>{let j=I.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',O=I.recommended?' <span class="sdlc-badge">Recommended</span>':"",$=r.selectedSplitOptionId===I.id||r.selectedSplitOptionId===null&&I.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${ap(I.id)}" required${$}> <strong>${ap(I.title)}</strong>${j}${O}</label>${th(e,I)}</li>`}).join("")}</ul>`:"",g=r.modules[r.currentModuleIndex],h=o==="optimize_modules"&&g?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=g?.title??"Module",S=g?.prompt??"",u=g?.status==="pending",A=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${ap(y)}</p>${u?R2({cycle:e,modulePrompt:S}):""}<p class="muted">Test run prompt preview: ${ap(ps(S,to(r)))}</p>${g?.statistics===null||g?.statistics===void 0?"":`<p class="muted">Module stats: best ${g.statistics.bestScore??"\u2014"} / \u2265${n} (round ${g.statistics.bestRound??"\u2014"}).</p>`}${aa({cycle:e,interactive:!1,caption:u?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",T=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":u?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",P=Ld(r),b=P===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${P}</p>`,k=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?O2(r.lastWriterParseFailureReply??""):"",E=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",w=t?.active===!0?" sdlc-wizard-gate-active":"",x=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${E}"`:"";return`<section class="card sdlc-wizard-gate${w}"${x}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${T}</p>
    ${k}
    ${b}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${ap(e.id)}">
    ${i}
    ${a}
    ${c}
    ${p}
    ${A}
      <div class="field">
        <label class="field-label" for="wizardFeedback">Feedback to rerun this step</label>
        <textarea class="input textarea" id="wizardFeedback" name="wizardFeedback" rows="3" placeholder="What should change?"></textarea>
      </div>
      <div class="field">
        <label class="field-label" for="wizardStepInstructions">Extra instructions (optional)</label>
        <textarea class="input textarea" id="wizardStepInstructions" name="wizardStepInstructions" rows="2" placeholder="Added to this step only when you rerun with feedback."></textarea>
      </div>
      <div class="sdlc-wizard-actions">
        <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue"${h}>Continue</button>
        <button class="btn btn-secondary" type="submit" name="intent" value="wizard-feedback-rerun" formnovalidate>Rerun with feedback</button>
      </div>
    </form>
    ${e2(e)}
  </section>`}});var gse,D2,H2=l(()=>{"use strict";L();lh();gse=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),D2=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||v(e.status))return"";let r=(o,n)=>{let s=ca(e,o);return`<h2 class="sdlc-wizard-active-head">${gse(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var sC,F2,z2,rn,$2,ha=l(()=>{"use strict";L();Tt();sC=new Map,F2=e=>{let t=new AbortController;return sC.set(e,t),t.signal},z2=e=>{sC.delete(e)},rn=e=>{sC.get(e)?.abort()},$2=(e,t)=>{let r=Q(e,t);return r===null||r.wizard!==void 0?!1:(v(r.status)||(z(e,{...r,status:"stopped",errorMessage:as,updatedAt:new Date().toISOString()}),rn(t)),!0)}});var U2,B2,iC,G2,aC=l(()=>{"use strict";L();sp();ha();U2="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",B2=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return _t[r]??null},iC=(e,t)=>{let r=B2(t);if(r===null||e.wizard===void 0)return!1;let o=_t.indexOf(r);if(o===-1)return!1;let n=co(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<_t.length)},G2=(e,t)=>{let r=B2(t);if(r===null||e.wizard===void 0||!iC(e,t))return e;rn(e.id);let o=_t.slice(_t.indexOf(r)),n=Td(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var lC,V2,K2=l(()=>{"use strict";aC();lC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),V2=(e,t)=>iC(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${lC(U2)}"><input type="hidden" name="cycleId" value="${lC(e.id)}"><input type="hidden" name="wizardStepId" value="${lC(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var fse,q2,yse,J2,Y2=l(()=>{"use strict";L();sp();N2();H2();K2();oh();fse={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},q2=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yse=(e,t,r)=>{let o=V2(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${q2(t)}">
  <summary class="sdlc-wizard-accordion-summary">${q2(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${la(e,t)}</div>
</details>`},J2=e=>{let t=e.wizard;if(t===void 0)return"";let r=co(e);if(r===null)return"";let o=_t.slice(0,r).map((i,a)=>yse(e,`wizard-${a+1}`,fse[i])),n=t.gate!==null?j2(e,{active:!0}):D2(e),s=r>=_t.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var Dh,cC=l(()=>{"use strict";Y2();TR();L();Dh=e=>{if(e===null||e.wizard!==void 0&&v(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=J2(e),r=vB(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var hse,dC,X2=l(()=>{"use strict";L();Me();at();bs();hse=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},dC=async(e,t,r)=>{if(!hse(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===W)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=VE({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await dt({writerAgent:e.judgeModel,prompt:n,workingDirectory:Se(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=qE(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var lp,Hh,Z2,pC,Q2,e5,t5,Fh,uC=l(()=>{"use strict";lp=m(require("node:fs")),Hh=m(require("node:path")),Z2=e=>Hh.default.join(Hh.default.dirname(e),"prompt-optimizer-writer-ready.json"),pC=e=>{let t=Z2(e);if(!lp.default.existsSync(t))return{};try{let r=JSON.parse(lp.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},Q2=(e,t)=>{lp.default.mkdirSync(Hh.default.dirname(e),{recursive:!0}),lp.default.writeFileSync(Z2(e),`${JSON.stringify(t,null,2)}
`)},e5=(e,t)=>pC(e)[t]?.message??null,t5=(e,t,r)=>{Q2(e,{...pC(e),[t]:{message:r}})},Fh=(e,t)=>{let r=pC(e);r[t]!==void 0&&Q2(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var mC,zh,$h,r5,je,Es=l(()=>{"use strict";L();OR();tp();X2();rp();ha();uC();Nh();Tt();mC=new Set,zh={atMs:0,ids:[]},$h=async()=>{if(Date.now()-zh.atMs<3e4)return zh.ids;let e=await Zt({commands:ke({})});return zh.atMs=Date.now(),zh.ids=e.installedWriterIds,e.installedWriterIds},r5=async(e,t,r)=>{let o=Q(e,t);if(o===null||r.aborted)return;let n=ws(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(v(n.status)&&!s||n.status==="wizard_paused"||xr(n))return;if(s){let c=await dC(n,r,d=>{Fh(e,d)});z(e,c);return}let i=await HG(n,c=>{Fh(e,c)},r,c=>{Q(e,t)?.status==="stopped"||r.aborted||z(e,c)});if(!(Q(e,t)?.status==="stopped"||r.aborted)){if(z(e,i),v(i.status)){let c=await dC(i,r,d=>{Fh(e,d)});z(e,c);return}await r5(e,t,r)}},je=(e,t)=>{if(mC.has(t))return;let r=Q(e,t);if(r===null)return;let o=ws(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(v(o.status)&&!n||o.status==="wizard_paused"||xr(o))return;mC.add(t);let s=F2(t);r5(e,t,s).finally(()=>{mC.delete(t),z2(t)})}});var on,cp=l(()=>{"use strict";nC();Nh();cC();Es();on=(e,t)=>{let r=ws(e,t);return je(e,r.id),`${jh(r)}${Dh(r)}`}});var o5,n5,s5=l(()=>{"use strict";o5=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,n5=e=>e!==null&&e>0});var Sse,Pse,Ase,i5,a5=l(()=>{"use strict";L();tp();Ch();Kd();qd();ha();nh();nh();Sse=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),Pse=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ye(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},Ase=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=le(o);return fa({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},i5=(e,t)=>{if(!Bd(e,t))return e;rn(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return _s({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return Qo(Pse(r));if(t==="wizard-3"){let n=o.splitOptions[0]??Sse(o.templatedPrompt);return Zo(r,n)}return t==="wizard-4"?Ase(r):e}});var Uh,l5,gC=l(()=>{"use strict";L();Ch();ha();Uh=e=>(rn(e.id),{...fa(e,"stopped"),errorMessage:PE}),l5=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;rn(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var bse,c5,d5,p5=l(()=>{"use strict";L();tp();Ch();Kd();qd();cp();Tt();Es();s5();aC();a5();gC();bse="Pick a revision scored above 0 before continuing to Separate.",c5=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),d5=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=Q(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=Q(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(on(e.storePath,d))};if(o==="wizard-stop-all"){let c=Uh(s);return z(e.storePath,c),je(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=l5(s);return z(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=G2(s,c);return z(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=i5(s,c);return z(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&je(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",g=FE(s.wizard,d,c);g=Td(g,d),g={...g,pendingStepInstructions:p};let f={...s,status:"judging",errorMessage:null,wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return z(e.storePath,f),je(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(f=>f.step==="generalize"),g=(s.errorMessage?.trim().length??0)>0&&!d?c5(s):_s({...s,wizard:{...s.wizard,gate:null}});return z(e.storePath,g),je(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=o5(s,p??-1);if(!n5(g)){let h={...s,errorMessage:bse,updatedAt:new Date().toISOString()};return z(e.storePath,h),a(n),!0}let f=Qo({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return z(e.storePath,f),je(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=c5(s);return z(e.storePath,h),je(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(h=>h.id===p);if(g===void 0){let h={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return z(e.storePath,h),a(n),!0}let f=Zo(s,g);return z(e.storePath,f),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,p=d.currentModuleIndex,g=d.modules[p];if(g===void 0)return a(n),!0;if(!ia(s.costControls)){let u=t.get("confirmedTokenBudget")?.trim()??"",A=t.get("confirmedMaxSpendUsd")?.trim()??"";if(u.length===0){let P={...s,errorMessage:oa,updatedAt:new Date().toISOString()};return z(e.storePath,P),a(n),!0}let T=no({existing:s.costControls,confirmedTokenBudget:Number(u),confirmedMaxSpendUsd:A.length===0?null:Number(A),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!T.ok){let P={...s,errorMessage:T.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,P),a(n),!0}s={...s,costControls:T.costControls,errorMessage:null,updatedAt:new Date().toISOString()},z(e.storePath,s)}let f=sR({wizard:d,modulePrompt:g.prompt,posted:t});if(!f.ok){let u={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,u),a(n),!0}let h={...d,parameterValues:f.parameterValues};if(g.status==="pending"){let u=DG({...s,wizard:{...h,gate:null}},p);return z(e.storePath,u),je(e.storePath,n),a(n),!0}let y=p+1;if(y>=d.modules.length){let u=le(h),A=fa({...s,wizard:h},u.terminalStatusSuggestion);return z(e.storePath,A),je(e.storePath,n),a(n),!0}let S={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...h,gate:"optimize_modules",currentModuleIndex:y},updatedAt:new Date().toISOString()};return z(e.storePath,S),a(n),!0}}return a(n),!0}});var _se,u5,kse,fC,wse,m5,g5=l(()=>{"use strict";Me();ha();gC();$R();Ah();rp();Tt();_se="Add a score from 0 to 100 and the reason for it.",u5="Add a score from 1 to 100 and the reason for it.",kse="Write the next prompt.",fC="This step is not waiting for you.",wse=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},m5=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=Q(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(z(e.storePath,Uh(a)),{kind:"saved",cycleId:i}):$2(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=Q(e.storePath,r);if(o===null||!xr(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:fC};if(t==="manual-judge"){if(o.judgeModel!==W)return{kind:"invalid",cycle:o,errorMessage:fC};let i=wse(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?u5:_se};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:u5};let d=o.revisions.find(g=>g.roundNumber===o.currentRound)?.run?.tokenReview??"",p=bh(Zd(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return z(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==W)return{kind:"invalid",cycle:o,errorMessage:fC};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:kse};let s=Ph(o,n);return z(e.storePath,s),{kind:"saved",cycleId:o.id}}});var f5,y5=l(()=>{"use strict";f5=`<script>
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
</script>`});var h5,S5=l(()=>{"use strict";h5=`<script>
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
</script>`});var P5,A5=l(()=>{"use strict";P5=`<script>
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
</script>`});var b5,_5=l(()=>{"use strict";b5=`<script>
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
</script>`});var k5,w5=l(()=>{"use strict";L();at();k5=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:wt(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(pe(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!v(t.status)}}});var T5,E5=l(()=>{"use strict";T5=`<script>
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
</script>`});var R5,C5=l(()=>{"use strict";L();sp();vh();R5=e=>{let t=ya(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:v(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=co(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=le(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=le(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return v(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var v5,L5=l(()=>{"use strict";v5=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var po,Tse,Ese,I5,x5=l(()=>{"use strict";C5();L5();np();po=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Tse=e=>e.wizard===void 0?"legacy":"wizard",Ese=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${po(t)}">`,o=R5(e),n=v5(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${po(o.badgeClass)}">${po(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${po(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${po(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${Tse(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${po(e.id)}">${po(ao(e.goal))}</a><p class="muted">${po(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${g}</div></li>`},I5=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>Ese(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${po(s)}</summary>${i}</details>`:i}});var yC,Bh,W5,Rse,Cse,dp,O5,Gh=l(()=>{"use strict";yC=m(require("node:fs")),Bh=m(require("node:path"));at();W5=/^[a-z0-9-]+$/,Rse=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},Cse=(e,t)=>{if(!W5.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let g=Rse(p[2]??"");p[1]==="name"&&g.length>0&&(o=g),p[1]==="description"&&(n=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},dp=e=>{let t=so(e);if(!t.ok)return[];let r=Bh.default.resolve(t.path,".cursor","skills"),o=[];try{o=yC.default.readdirSync(r)}catch{return[]}return o.filter(n=>W5.test(n)).flatMap(n=>{let s=Bh.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${Bh.default.sep}`))return[];try{let i=Cse(yC.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},O5=(e,t)=>dp(e).find(r=>r.fileName===t)??null});var M5,vse,j5,N5,D5=l(()=>{"use strict";tn();M5=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vse=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),j5=e=>{if(e.length===0)return`<div class="field">${Pe("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${M5(r.fileName)}">${M5(r.fileName)}</option>`).join("");return`<div class="field">${Pe("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${vse(e)}</script>`},N5=`<script>
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
</script>`});var ut,H5,F5=l(()=>{"use strict";L();Oh();Vd();tn();ut=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),H5=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=ut(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=sa({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??oo(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),g=Sh({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",f=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${ut(Y.knobsSectionTitle)}</p>
  <p class="muted">${ut(Y.knobsSectionLede)}</p>
  <div class="field">
    ${Pe(Y.maxTrialsLabel,"maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${30}" step="1" value="${r}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${Pe(Y.maxSpendUsdLabel,"maxSpendUsd")}
    <input class="input" type="number" name="maxSpendUsd" id="sdlc-max-spend-usd" min="0" step="0.01" value="${o}" placeholder="Optional" data-sdlc-max-spend-usd>
    <p class="muted">${ut(Y.autoConfirmHint)}</p>
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${n}>
      <span>${ut(Y.earlyStopLabel)}</span>
    </label>
    <p class="muted">${ut(Y.earlyStopHint)}</p>
  </div>
  <div class="sdlc-cost-estimate" data-sdlc-cost-estimate>
    <p class="sdlc-block-title">${ut(Y.estimateSectionTitle)}</p>
    <p class="muted">${ut(Y.estimateSectionLede)}</p>
    <dl class="sdlc-cost-proposal sdlc-cost-estimate-proposal">
      <div><dt>${ut(Y.targetTokenLabel)}</dt><dd data-sdlc-target-tokens data-sdlc-proposed-tokens>${a.targetTokenBudget.toLocaleString("en-US")}</dd></div>
      <div><dt>${ut(Y.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${a.estimatedSpendUsd.toFixed(4)}</dd></div>
      <div><dt>${ut(Y.rateChipLabel)}</dt><dd><span class="sdlc-cost-rate-chip" data-sdlc-writer-rate-chip data-writer-id="${ut(f)}">$${c.toFixed(4)} / 1k \xB7 ${ut(f)}</span></dd></div>
    </dl>
    <input type="hidden" name="targetTokenBudget" value="${a.targetTokenBudget}" data-sdlc-target-token-budget-input>
    <input type="hidden" name="estimatedSpendUsd" value="${a.estimatedSpendUsd}" data-sdlc-estimated-spend-input>
    <input type="hidden" name="rateUsdPer1kTokens" value="${c}" data-sdlc-cost-rate>
    <p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling${g}>${ut(Y.estimateOverCeilingWarn)}</p>
  </div>
</div>`}});var tt,z5,$5,Lse,U5,B5,G5,V5=l(()=>{"use strict";L();XR();Me();np();sp();tt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),z5=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",$5=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,Lse=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},U5=e=>e===W?"You":ue(e),B5=e=>{let t=Lse(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ue(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${tt(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${tt(t)}</dd></div>
      <div><dt>Judge</dt><dd>${tt(U5(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${tt(U5(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${tt(r)}</dd></div>
    </dl>
  </details>`},G5=e=>{let t=e.wizard;if(t===void 0)return"";let r=ao(e.goal),o=e.status==="wizard_paused",n=!v(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=Ih(e),g=$5(t),f=g===null?"":z5(g),h=co(e),y=f.length===0?"":h===null||h>=4?` <strong>${tt(f)}</strong>`:` <strong>${tt(f)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${tt(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${tt(p.title)}${y}</p>
    <p class="muted">${tt(p.detail)}</p>
    <div class="actions">
      ${B5(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${tt(e.id)}">Open this run</a>
    </div>
  </section>`}let s=$5(t),i=s===null?"Wizard":z5(s),a=co(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${tt(r)}</h2>
    <p class="lede">Paused at <strong>${tt(i)}</strong>${tt(c)} (last updated ${tt(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${B5(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${tt(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var pp,K5,q5=l(()=>{"use strict";tn();pp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),K5=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${pp(n.id)}"${n.id===e.runner?" selected":""}>${pp(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${pp(e.runner)}">Checking ${pp(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Pe("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Pe("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${pp(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var J5,Y5=l(()=>{"use strict";J5=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var Sa,X5,Z5,Q5,eV,tV=l(()=>{"use strict";tn();Sa=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),X5=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${Sa(c.id)}"${c.id===r?" selected":""}>${Sa(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Sa(n)}</option>`;return`<div class="field">${Pe(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},Z5=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Sa(t)}">Checking ${Sa(o)}\u2026</p>`},Q5=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Pe(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Sa(r)}</textarea><span class="muted">${o}</span></div></details>`,eV=e=>{let t=`<div class="sdlc-writer">${X5("judge","Judge",e.judge,e.writers,"I'll score it")}${Z5("judge",e.judge,e.writers)}${Q5("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${X5("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${Z5("improver",e.improver,e.writers)}${Q5("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var rV,oV=l(()=>{"use strict";rV=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var hC,nV,sV=l(()=>{"use strict";oV();hC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nV=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${rV.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${hC(t.goal)}" title="${hC(t.goal)}">${hC(t.label)}</button>`).join("")}</div>`});var up,Ise,xse,SC,iV=l(()=>{"use strict";L();tn();up=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ise=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},xse=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,SC=e=>{let t=Ise(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=Pd(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${Pe(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${up(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${up(e.inputId)}" class="sdlc-pass-range" type="range" name="${up(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${up(a)}"><span class="sdlc-pass-mark" style="left:${xse(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${up(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var Ose,PC,uo,aV,lV=l(()=>{"use strict";rp();nC();y5();S5();dh();A5();_5();w5();E5();x5();Gh();D5();tn();cC();F5();V5();np();q5();Y5();tV();L();sV();iV();Ose=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,PC='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',uo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aV=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${uo(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${uo(e.skillNotice??"")}</div>`,o=`${zB}${$B}`,n=e.resumableWizardCycle??null,s=n===null?"":G5(n),i=Dh(e.cycle),a=e.cycle===null?"":jh(e.cycle),c=e.cycle!==null&&xr(e.cycle),d=k5(e),p=Ose(d.goal,d.prompt,e.canRun),g=eV({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),f=K5({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=`${SC({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${SC({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=H5({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),S=DE,u=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",A=e.cycle!==null&&v(e.cycle.status),T=d.running&&!A,P=A||T?"":" open",b=T?" sdlc-compose-run-focus":"",E=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${A?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,w=A?(()=>{let F=e.cycle!==null?ao(e.cycle.goal):ao(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${uo(F)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${E}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${E}</summary>`,x=A?" sdlc-compose-viewing-finished":"",I=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",j=c?"waiting":d.running?"running":"idle",O=d.running&&!c?' aria-busy="true"':"",$=`<section class="card sdlc-compose${x}${b}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${P}>
        ${w}
        <div class="sdlc-compose-details-body">
      <p class="lede">${S} ${uo(e.modelNote)}</p>
        <ol class="sdlc-compose-stepper" aria-label="Compose steps" data-sdlc-compose-stepper>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="1" aria-current="step"><span class="sdlc-compose-stepper-index">1</span><span class="sdlc-compose-stepper-label">Project</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="2"><span class="sdlc-compose-stepper-index">2</span><span class="sdlc-compose-stepper-label">Prompt and goal</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="3"><span class="sdlc-compose-stepper-index">3</span><span class="sdlc-compose-stepper-label">CLI</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="4"><span class="sdlc-compose-stepper-index">4</span><span class="sdlc-compose-stepper-label">Summary</span></li>
        </ol>
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${u}
        <p class="alert-error sdlc-compose-step-error" data-sdlc-compose-step-error hidden role="alert"></p>
        <div class="sdlc-compose-step" data-sdlc-compose-step="1" id="sdlc-compose-step-1">
          <h3 class="sdlc-compose-step-title">Project</h3>
          <p class="muted sdlc-compose-step-lede">Choose the folder writers run in and optionally load a skill into the prompt on the next step.</p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="sdlc-folder">
          <div class="field">
            ${Pe("Folder","folder")}
            <input class="input" type="text" name="folder" value="${uo(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${j5(dp(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${PC}
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <input type="hidden" name="orchestratorSkillFile" value="" data-orchestrator-skill-file>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <p class="muted sdlc-compose-orchestrator-note" data-orchestrator-skill-note hidden></p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${Pe("Goal","goal")}
            ${nV()}
            <textarea class="input textarea" name="goal" rows="4" required>${uo(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Pe("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${uo(d.prompt)}</textarea>
          </div>
          ${h}
          ${y}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${PC}
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
        ${J5()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${PC}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${uo(d.passScore)}; Step 4 pass \u2265 ${uo(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${j}" data-can-run="${p?"true":"false"}"${O}${d.running?" disabled":""}>${I}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,B=e.history.length>0?T5:"",Ce=`${""}${b5}${f5}${h5}${P5}${N5}${B}`;return`${t}${r}${$}${s}${a}${i}${o}${I5(e.history,e.cycle?.id??null)}${Ce}`}});var mp,AC=l(()=>{"use strict";lV();mp=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:aV(t)}))}});var cV,dV=l(()=>{"use strict";g5();cp();AC();Tt();Es();cV=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:m5({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=Q(e.storePath,o.cycleId);return je(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(on(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await mp(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:Lr(e.storePath),resumableWizardCycle:null}),!0)}});var pV,Vh,bC=l(()=>{"use strict";L();pV=m(require("node:os")),Vh=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??pV.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??nr()}}});var uV,Pa,_C,mV,gV,gp=l(()=>{"use strict";L();Me();IR();uV=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Pa=e=>{let t=fB(e),r=ys(e).map(s=>({id:s,label:Zy[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},_C=(e,t,r)=>t===W||t!==null&&e.writers.some(o=>o.id===t)?t:r,mV=(e,t,r,o=null)=>({judge:_C(e,t,e.judge),improver:_C(e,r,e.improver),runner:_C(e,o,e.runner)}),gV=e=>e===ph?{goal:uh,prompt:mh}:{goal:"",prompt:""}});var kC,fV=l(()=>{"use strict";kC=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var yV,Mse,hV,SV,PV,AV=l(()=>{"use strict";L();yV=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},Mse=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},hV=(e,t)=>e.has("earlyStop")?!0:t!=="run",SV=e=>{let t=yV(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=Mse(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=yV(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},PV=e=>nr(e)});var bV,_V,Kh,wC=l(()=>{"use strict";L();Me();at();gp();fV();AV();bV=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=kC(o);return n.ok?String(n.passScore):String(r)},_V=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return kC(n)},Kh=e=>{let t=mV(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=bV(e.posted,"passScore",70),o=bV(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),p=e.posted?.get("maxSpendUsd")?.trim()??"",g=e.posted?.get("intent")??"",f=e.posted===null?!0:hV(e.posted,g),h=(w,x)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:w,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:x,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:p,earlyStop:f});if(e.posted===null)return h(e.defaultFolder??hs,null);let y=e.posted.get("folder")??hs;if(e.posted.get("intent")==="choose-folder"){let w=e.pickFolder();return h(w===null?y:wt(w),null)}if((e.posted.get("intent")??"")!=="run")return h(y,null);let u=uV(e.goal,e.prompt);if(u!==null)return h(y,u);let A=_V(e.posted,"passScore",r);if(!A.ok)return h(y,A.errorMessage);let T=_V(e.posted,"modulePassScore",o);if(!T.ok)return h(y,T.errorMessage);let P=yB(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(P===null)return h(y,"Choose a judge and an improver.");let b=so(y);if(!b.ok)return h(y,b.errorMessage);let k=hB(e.installedIds,c,P.judge);if(k===null)return h(y,"Choose a runner for wizard step 4.");let E=SV({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return E.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:P.judge,improver:P.improver,workingDirectory:b.path,passScore:A.passScore,modulePassScore:T.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:k,runnerInstructions:a,costControls:PV(E.knobs)}:h(y,E.errorMessage)}});var Aa,Jh,jse,TC,kV,qh,wV,Nse,TV,EC,Dse,Hse,Fse,RC,EV,RV,CV=l(()=>{"use strict";Aa=m(require("node:fs")),Jh=m(require("node:path"));Me();at();jse=["remember","choose-folder","run"],TC=()=>({folder:hs,judge:"",improver:"",runner:""}),kV=e=>Jh.default.join(Jh.default.dirname(e),"prompt-optimizer-preferences.json"),qh=e=>typeof e=="string"?e:"",wV=e=>{let t=kV(e);if(!Aa.default.existsSync(t))return TC();try{let r=JSON.parse(Aa.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return TC();let o=r,n=qh(o.folder).trim();return{folder:n.length===0?hs:n,judge:qh(o.judge),improver:qh(o.improver),runner:qh(o.runner)}}catch{return TC()}},Nse=(e,t)=>{let r=kV(e);Aa.default.mkdirSync(Jh.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;Aa.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),Aa.default.renameSync(o,r)},TV=(e,t)=>e===W||ys(t).some(r=>r===e),EC=(e,t,r)=>e===null?t:e.length===0?"":TV(e,r)?e:t,Dse=(e,t)=>{if(e===null)return t;let r=so(e);return r.ok?r.display:t},Hse=e=>{let t=wV(e.storePath),r={folder:Dse(e.folder,t.folder),judge:EC(e.judge,t.judge,e.installedIds),improver:EC(e.improver,t.improver,e.installedIds),runner:EC(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||Nse(e.storePath,r)},Fse=e=>{let t=so(e);return t.ok?t.display:hs},RC=(e,t)=>TV(e,t)?e:"",EV=e=>{let t=wV(e.storePath);return{selection:{...e.selection,judge:RC(t.judge,e.installedIds)||e.selection.judge,improver:RC(t.improver,e.installedIds)||e.selection.improver,runner:RC(t.runner,e.installedIds)||e.selection.runner},defaultFolder:Fse(t.folder)}},RV=e=>{let t=e.posted.get("intent")??"";if(!jse.includes(t))return;let r=e.posted.get("folder");Hse({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var vV,zse,$se,CC,Use,Yh,Xh=l(()=>{"use strict";vV=m(require("node:os"));Me();uC();bs();zse="Reply with the single word ok. Do not use tools.",$se=45e3,CC=async(e,t)=>{if(t===W)return{ok:!0,message:"You will do this step."};let r=e5(e,t);if(r!==null)return{ok:!0,message:r};let o=await dt({writerAgent:t,prompt:zse,workingDirectory:vV.default.tmpdir(),timeoutMs:$se});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ue(t)} is ready.`;return t5(e,t,n),{ok:!0,message:n}},Use=e=>[...new Set(e.filter(t=>t.length>0))],Yh=async(e,t,r,o)=>{for(let n of Use([t,r,o??""])){let s=await CC(e,n);if(!s.ok)return s.message}return null}});var vC,LV=l(()=>{"use strict";L();vC=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!v(r.status)&&!(t!==null&&r.id===t))return r;return null}});var IV,xV=l(()=>{"use strict";Yt();L();Vd();cp();bC();wC();AC();Tt();at();CV();Gh();Xh();LV();Nh();Es();IV=async e=>{let t=e.posted===null?EV({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=Kh({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Bo("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(RV({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?wt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await Yh(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await mp(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:wt(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:Lr(e.route.storePath),resumableWizardCycle:vC(Lr(e.route.storePath),null)});return}if(r.kind==="start"){let s=O5(r.workingDirectory,r.sourceSkillFile),i=hh(Hd({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=Vh({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:YE({...wd(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(z(e.route.storePath,a),je(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(on(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:Q(e.route.storePath,e.cycleId);n!==null&&(n=ws(e.route.storePath,n),je(e.route.storePath,n.id)),await mp(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:Lr(e.route.storePath),resumableWizardCycle:vC(Lr(e.route.storePath),n?.id??null)})}});var WV,OV=l(()=>{"use strict";Tt();WV=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";XB(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var MV,jV=l(()=>{"use strict";MV=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var NV,DV=l(()=>{"use strict";nG();p5();dV();xV();OV();gp();jV();Es();NV=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await $h(),o=Pa(r),n=e.method==="POST"?MV(e.request.headers["content-type"],await e.readBody(e.request)):null;if(d5({posted:n,storePath:e.storePath,response:e.response})||await cV(e,n,o))return;let s=gV(t.searchParams.get("example")),i=WV({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=oG({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await IV({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:rG(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var Bse,HV,FV=l(()=>{"use strict";L();Tt();Bse=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",HV=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=Q(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!v(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=XE({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${Bse(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var zV,$V=l(()=>{"use strict";cp();Tt();zV=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:Q(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":on(e.storePath,o)),!0}});var Gse,UV,BV=l(()=>{"use strict";Me();Xh();Gse=["claude-cli","codex","cursor","antigravity"],UV=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===W||Gse.includes(t)?await CC(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var GV,VV=l(()=>{"use strict";L();GV=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:bd,page:_d,context:ea,installedWriters:e,post:{method:"POST",url:bd,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${bd}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var Zh,KV=l(()=>{"use strict";L();oC();da();Zh=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ye(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=v(e.status),n=e.errorKind??null,s=Mh({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:io(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:ea,page:`${_d}?cycle=${encodeURIComponent(e.id)}`}}});var K,Vse,qV,JV,YV=l(()=>{"use strict";K=m(Xs());L();Vse=(0,K.isType)({goal:K.isString,prompt:K.isString,workingDirectory:K.isString,judge:(0,K.isUndefinedOr)(K.isString),improver:(0,K.isUndefinedOr)(K.isString),passScore:(0,K.isUndefinedOr)(K.isNumber),maxRounds:(0,K.isUndefinedOr)(K.isNumber),maxTrials:(0,K.isUndefinedOr)(K.isNumber),maxSpendUsd:(0,K.isUndefinedOr)(K.isNumber),earlyStop:(0,K.isUndefinedOr)(K.isBoolean),earlyStopFlatRounds:(0,K.isUndefinedOr)(K.isNumber),confirmedTokenBudget:(0,K.isUndefinedOr)(K.isNumber),confirmedMaxSpendUsd:(0,K.isUndefinedOr)(K.isNumber),rateUsdPer1kTokens:(0,K.isUndefinedOr)(K.isNumber)}),qV=e=>{let t=e?.trim()??"";return t.length===0?null:t},JV=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return Vse(t)?t.workingDirectory.trim().length===0?{ok:!1,error:Dy}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:qV(t.judge),improver:qV(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:Dy}}});var mo,Kse,XV,ZV,QV=l(()=>{"use strict";L();mo=m(Xs()),Kse=(0,mo.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:mo.isNumber,confirmedMaxSpendUsd:(0,mo.isUndefinedOr)(mo.isNumber),rateUsdPer1kTokens:(0,mo.isUndefinedOr)(mo.isNumber)}),XV=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:Kse(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},ZV=(e,t)=>{let r=no({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var qse,eK,tK=l(()=>{"use strict";L();Me();wC();gp();qse=e=>e.map(t=>t.id).join(", "),eK=e=>{let t=Pa(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===W||n===W)return{ok:!1,error:NE,installedWriters:t.writers};if(o===null||n===null){let a=qse(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=Kh({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var Jse,rK,oK=l(()=>{"use strict";L();bC();VV();KV();gp();YV();QV();tK();Tt();Jse=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},rK=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let p=Q(e.storePath,t);return p===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:Zh(p)}}let r=await e.handlers.readInstalledIds(),o=Pa(r);if(e.method==="GET")return{status:200,body:GV(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let p=XV(e.rawBody);if(p.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(p.kind==="invalid")return{status:400,body:{ok:!1,error:p.error}};let g=Q(e.storePath,t);if(g===null)return{status:404,body:{ok:!1,error:"That run is not on this Mac."}};let f=ZV(g,p.body);return f.ok?(z(e.storePath,f.cycle),{status:200,body:Zh(f.cycle)}):{status:400,body:{ok:!1,error:f.error}}}let n=Jse(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let p=sa({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:p.targetTokenBudget,proposedTokenBudget:p.targetTokenBudget,estimatedSpendUsd:p.estimatedSpendUsd,rateUsdPer1kTokens:p.rateUsdPer1kTokens??null,proposalStub:p.stub===!0,confirmationRequired:!0}}}let s=JV(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=eK({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=Hd({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:kt({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let p=no({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!p.ok)return{status:400,body:{ok:!1,error:p.errorMessage}};c=p.costControls}let d=Vh({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:wd(i.prompt),runnerModel:i.runner,costControls:c});return z(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:Zh(d)}}});var nK,sK=l(()=>{"use strict";Es();Xh();oK();nK=async e=>{let t=await rK({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:$h,readWritersReady:Yh,startCycle:je}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var aK,Yse,Xse,iK,Zse,lK,cK=l(()=>{"use strict";aK=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],Yse=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},Xse=e=>{let t={};for(let n of e)for(let s of new Set(aK(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},iK=(e,t)=>{let r=Yse(aK(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},Zse=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},lK=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=Xse(e.map(i=>i.text)),s=iK(o,n);return e.map(i=>({id:i.id,score:Zse(s,iK(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var LC,Qse,eie,dK,tie,rie,oie,nie,IC,xC=l(()=>{"use strict";LC=m(require("node:path"));at();cK();Gh();Qse=5,eie=20,dK=280,tie=e=>[e.name,e.description,e.promptText].join(`
`),rie=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=dK?t:`${t.slice(0,dK-3)}...`},oie=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),nie=e=>e===void 0||!Number.isFinite(e)?Qse:Math.min(eie,Math.max(1,Math.floor(e))),IC=e=>{let t=e.query.trim(),r=nie(e.limit),o=so(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=dp(o.path),s=lK(n.map(d=>({id:d.fileName,text:tie(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=LC.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let p=i.get(d.id);return p===void 0?[]:[{skillId:p.fileName,name:p.name,description:p.description,score:d.score,sourcePath:LC.default.join(a,p.fileName,"SKILL.md"),excerpt:rie(p),source:"filesystem"}]});return{query:t,hits:c,context:oie(c)}}});var pK,uK=l(()=>{"use strict";xC();pK=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:IC({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var mK,gK=l(()=>{"use strict";uK();mK=async e=>{let t=pK({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var sie,WC,fK=l(()=>{"use strict";GB();DV();FV();$V();BV();sK();gK();sie=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},WC=async e=>{let t=sie(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await nK(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await mK(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:BB()})),!0):(await UV({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||HV({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||zV({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await NV(e),!0)}});var yK=l(()=>{"use strict";fK();xC();bs()});var OC,MC,jC=l(()=>{"use strict";OC="2025-03-26",MC={name:"agent-witch",version:"1.0.0"}});var ba,Qh,hK,iie,fp,SK=l(()=>{"use strict";jC();ba=(e,t,r)=>({jsonrpc:"2.0",id:e??null,error:{code:t,message:r}}),Qh=(e,t)=>({jsonrpc:"2.0",id:e??null,result:t}),hK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?e:null,iie=async(e,t,r,o)=>{let n=t?.name;if(typeof n!="string")return ba(e,-32602,"tool name is required");let s=r.tools.find(i=>i.definition.name===n);if(s===void 0)return ba(e,-32602,`Unknown tool: ${n}`);try{let i=await s.call(t?.arguments??{},o);return Qh(e,i)}catch(i){let a=i instanceof Error?i.message:String(i);return ba(e,-32603,`Tool ${n} failed: ${a}`)}},fp=async(e,t,r)=>{let o=hK(e);if(o===null)return ba(null,-32700,"Parse error");let n=o.id??null,s=o.method;return typeof s!="string"?ba(n,-32600,"Invalid Request"):s==="initialize"?Qh(n,{protocolVersion:OC,capabilities:{tools:{listChanged:!1}},serverInfo:t.serverInfo}):s==="ping"||s==="notifications/initialized"?Qh(n,{}):s==="tools/list"?Qh(n,{tools:t.tools.map(i=>i.definition)}):s==="tools/call"?iie(n,hK(o.params),t,r):ba(n,-32601,"Method not found")}});var NC,PK=l(()=>{"use strict";NC=(e,t)=>({content:[{type:"text",text:e}],...t===!0?{isError:!0}:{}})});var eS=l(()=>{"use strict";SK();PK();jC()});var _a,tS=l(()=>{"use strict";Yf();eS();_a=e=>{let t=zc({layout:e.layout,isDeclined:e.isDeclined});return{serverInfo:MC,tools:[{definition:Sw,call:r=>NC(JSON.stringify(t(r)))}]}}});var AK,aie,lie,bK,_K=l(()=>{"use strict";eS();tS();AK=(e,t)=>{let r=JSON.stringify(t);e.write(`Content-Length: ${Buffer.byteLength(r,"utf8")}\r
\r
${r}`)},aie=async(e,t)=>{let r=Buffer.alloc(0);for await(let o of e.stdin)for(r=Buffer.concat([r,Buffer.isBuffer(o)?o:Buffer.from(String(o),"utf8")]);;){let n=r.indexOf(`\r
\r
`);if(n<0)break;let s=r.subarray(0,n).toString("utf8"),i=/Content-Length:\s*(\d+)/i.exec(s);if(i===null){r=r.subarray(n+4);continue}let a=Number.parseInt(i[1]??"0",10),c=n+4+a;if(r.length<c)break;let d=r.subarray(n+4,c).toString("utf8");r=r.subarray(c);let p;try{p=JSON.parse(d)}catch{p=null}await t(p)}},lie=async(e,t)=>{await aie(t,async r=>{let o=typeof r=="object"&&r!==null?r:null,n=o?.method,s=await fp(r,e,void 0);if(typeof n=="string"&&n.startsWith("notifications/")){o?.id!==void 0&&AK(t.stdout,s);return}AK(t.stdout,s)})},bK=async e=>{await lie(_a({layout:e.layout}),{stdin:process.stdin,stdout:process.stdout})}});var cie,rS,kK=l(()=>{"use strict";eS();tS();cie="/mcp",rS=async e=>{if(e.pathname!==cie)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t=null;try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{t=null}let r=e.server??_a({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,await fp(t,r,void 0)),!0}});var wK={};Rt(wK,{createAwlMcpServer:()=>_a,runAwlMcpStdio:()=>bK,tryHandleAwlMcpHttpRequest:()=>rS});var DC=l(()=>{"use strict";tS();_K();kK()});var Rs,yp,die,pie,uie,mie,TK,EK=l(()=>{"use strict";Rs=m(require("node:fs")),yp=m(require("node:path")),die="prompt-optimizer-cycles.json",pie="prompt-optimizer-preferences.json",uie="prompt-sdlc-cycles.json",mie="prompt-sdlc-preferences.json",TK=e=>{let t=yp.default.join(e,die),r=yp.default.join(e,uie);if(Rs.default.existsSync(t)||!Rs.default.existsSync(r))return t;try{Rs.default.renameSync(r,t)}catch{return r}let o=yp.default.join(e,mie),n=yp.default.join(e,pie);if(Rs.default.existsSync(o)&&!Rs.default.existsSync(n))try{Rs.default.renameSync(o,n)}catch{}return t}});var ka,gie,HC,RK=l(()=>{"use strict";ka=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gie=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],HC=e=>{let t=gie.map(i=>`<option value="${ka(i.value)}">${ka(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${ka(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${ka(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${ka(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${ka(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var hp,LK,fie,IK,yie,hie,xK,nS,CK,vK,Sie,Pie,go,Sp,oS,Aie,sS,FC,bie,zC,WK,$C,OK,_ie,kie,wie,MK,jK,NK,Pp=l(()=>{"use strict";hp=m(require("node:fs")),LK=m(require("node:path")),fie="estimate-history.ndjson",IK=100,yie=500,hie=2e4,xK=e=>LK.default.join(e,fie),nS=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,yie),CK=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,hie),vK=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,Sie=e=>({...e,estimateTokens:vK(e.estimateTokens),actualTokens:vK(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),Pie=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},go=e=>{let t=xK(e);return hp.default.existsSync(t)?hp.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return Pie(n)?[Sie(n)]:[]}catch{return[]}}):[]},Sp=(e,t)=>{hp.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;hp.default.writeFileSync(xK(e),r,"utf8")},oS=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),Aie=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${oS(o.task)} | ${oS(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},sS=e=>{let t=go(e.reportsDir),r=nS(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Sp(e.reportsDir,[...s,n])},FC=e=>{let t=go(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?nS(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Sp(e.reportsDir,[...i,s])},bie=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-IK),zC=e=>[...go(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),WK=e=>{let t=go(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=CK(e.input),n=CK(e.output),s=nS(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Sp(e.reportsDir,[...c,a])},$C=(e,t)=>{let r=go(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},OK=e=>({table:Aie(bie(go(e))),embedding:null}),_ie=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},kie=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-IK),wie=e=>{let t=_ie(kie(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${oS(s.task)} | ${oS(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},MK=e=>{let t=go(e.reportsDir),r=nS(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Sp(e.reportsDir,[...s,n])},jK=e=>{let t=go(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Sp(e.reportsDir,[...s,n])},NK=e=>wie(go(e))});var DK=l(()=>{"use strict";Pp()});var fo,UC,Tie,BC,Eie,Rie,iS,aS,Cie,GC,HK=l(()=>{"use strict";DK();CR();fo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UC=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},Tie=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${UC(-r)} under`:`${UC(r)} over`},BC=e=>e.toLocaleString("en-US"),Eie=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${BC(-r)} under`:`${BC(r)} over`},Rie=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},iS=e=>e===null?"\u2014":UC(e),aS=e=>e===null?"\u2014":BC(e),Cie=`(function () {
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
})();`,GC=e=>{let r=zC(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":Tie(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":Eie(n.estimateTokens,n.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${fo(Rie(i))}</button></td>
        <td>${fo(c)}</td>
        <td>${iS(n.estimateSeconds)}</td>
        <td>${iS(n.actualSeconds)}</td>
        <td>${fo(d)}</td>
        <td>${aS(n.estimateTokens)}</td>
        <td>${aS(n.actualTokens)}</td>
        <td>${fo(p)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${fo(c)}</p>
        <h2>Input</h2>
        <pre>${fo(i)}</pre>
        <h2>Output</h2>
        <pre>${fo(a)}</pre>
        <p>Time: estimated ${iS(n.estimateSeconds)} \xB7 actual ${iS(n.actualSeconds)} \xB7 ${fo(d)}</p>
        <p>Tokens: estimated ${aS(n.estimateTokens)} \xB7 actual ${aS(n.actualTokens)} \xB7 ${fo(p)}</p>
      </template>`}});return`<section class="card">
      <p class="eyebrow">This Mac</p>
      <h1>History</h1>
      <p class="lede">Every prompt on this Mac. Select a row to read the input, output, and estimate.</p>
      ${r.length===0?'<p class="empty">No prompt history yet.</p>':`<div class="table-wrap history-table-wrap"><table id="history-table">
          <thead><tr><th>Prompt</th><th>Writer</th><th>Estimated</th><th>Actual</th><th>Comparison</th><th>Estimated tokens</th><th>Actual tokens</th><th>Token comparison</th></tr></thead>
          <tbody>${r.map(n=>n.row).join("")}</tbody>
        </table></div>
        ${r.map(n=>n.template).join("")}
        <dialog id="history-detail" class="history-dialog" aria-label="Prompt detail">
          <div class="history-dialog-bar">
            ${sh({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${Cie}</script>`}
    </section>`}});var FK=l(()=>{"use strict";RK();HK()});var wa,vie,Lie,VC,zK=l(()=>{"use strict";wa=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vie=(e,t,r)=>{let o=wa(t),n=wa(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},Lie=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${wa(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>vie(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${wa(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${wa(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${wa(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},VC=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(Lie).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var $K=l(()=>{"use strict";zK()});var Ap,UK,BK,KC,qC,JC,GK=l(()=>{"use strict";Ap=m(require("node:fs")),UK=m(require("node:path"));cd();wy();BK=(e,t,r)=>Ki({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,KC=(e,t,r)=>{let o=BK(e,t,r);if(o===null)return[];if(!Ap.default.existsSync(o))return[];let n=Ap.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},qC=e=>{let t=BK(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:eo(e.entry.prompt),output:eo(e.entry.output)};Ap.default.mkdirSync(UK.default.dirname(t),{recursive:!0}),Ap.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},JC=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var Iie,xie,bp,lS,YC=l(()=>{"use strict";Iie=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),xie=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,bp=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=Iie(i.assistantOutput),d=c.length>0?`Assistant: ${xie(c,t)}`:null,p=[a,d].filter(g=>g!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},lS=e=>{let t=e.userMessage.trim(),r=bp({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Or,_p,QC,Wie,Oie,XC,Mie,ev,cS,VK,KK,jie,Ta,tv,ZC,qK,Nie,JK,Ea,dS,kp,Die,wp,rv,pS,uS,YK=l(()=>{"use strict";Or=m(require("node:fs")),_p=m(require("node:path")),QC=require("node:crypto");YC();Wie="writer-sessions",Oie="active-index.json",XC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Mie=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ev=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},cS=e=>{let t=_p.default.join(e.installDir,Wie);return Or.default.mkdirSync(t,{recursive:!0}),t},VK=e=>_p.default.join(cS(e),Oie),KK=(e,t)=>_p.default.join(cS(e),`${t}.canonical.json`),jie=(e,t)=>_p.default.join(cS(e),`${t}.continuation.json`),Ta=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,tv=e=>{let t=VK(e);if(!Or.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Or.default.readFileSync(t,"utf8"));if(!XC(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!XC(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!Mie(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},ZC=(e,t)=>{Or.default.writeFileSync(VK(e),JSON.stringify(t,null,2))},qK=(e,t)=>{Or.default.writeFileSync(KK(e,t.sessionId),JSON.stringify(t,null,2))},Nie=(e,t)=>{Or.default.writeFileSync(jie(e,t.sessionId),JSON.stringify(t,null,2))},JK=(e,t)=>{let r=bp({turns:t.turns});Nie(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Ea=(e,t)=>{let r=KK(e,t);if(!Or.default.existsSync(r))return null;try{let o=JSON.parse(Or.default.readFileSync(r,"utf8"));return!XC(o)||typeof o.sessionId!="string"?null:o}catch{return null}},dS=(e,t=20)=>{let r=cS(e),o=Or.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Ea(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},kp=(e,t,r)=>{let o=ev(r);return tv(e).entries.find(i=>Ta(i)===Ta({writerAgent:t,projectFolderPath:o}))?.sessionId??null},Die=(e,t,r,o)=>{let n=tv(e),s=Ta({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>Ta(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];ZC(e,{entries:i})},wp=(e,t,r)=>{let o=(0,QC.randomUUID)(),n=new Date().toISOString(),s=ev(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return qK(e,i),JK(e,i),Die(e,t,s,o),o},rv=(e,t,r)=>{let o=kp(e,t,r);return o!==null?o:wp(e,t,r)},pS=(e,t,r)=>{let o=ev(r),n=tv(e);if(o===null&&r===void 0){ZC(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=Ta({writerAgent:t,projectFolderPath:o});ZC(e,{entries:n.entries.filter(i=>Ta(i)!==s)})},uS=e=>{let t=rv(e.layout,e.writerAgent,e.projectFolderPath),r=Ea(e.layout,t);if(r===null)return;let o={id:(0,QC.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};qK(e.layout,n),JK(e.layout,n)}});var Hie,Fie,mS,ov,XK=l(()=>{"use strict";Hie=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",Fie=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},mS=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",ov=e=>{let t=mS(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=Hie(r,e.userPromptCharacterCount),n=Fie({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var gS=l(()=>{"use strict";GK();YK();YC();XK()});var ZK=l(()=>{"use strict";Cg();Ai();g_()});var QK=l(()=>{"use strict";$b()});var mt,$ie,Uie,nv,sv,iv,eq=l(()=>{"use strict";ZK();QK();mt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$ie=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},Uie=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=nc(o);return`value="${mt(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${mt(r)}"`},nv=(e,t,r,o,n)=>{let s=vg[t];return`<label class="field">
          <span class="field-label">${mt(o)} API key \u2014 ${mt($ie(e,t))} \xB7 <a class="field-link" href="${mt(s.href)}" target="_blank" rel="noopener noreferrer">${mt(s.label)}</a></span>
          <input class="input mono" type="password" name="${mt(r)}" autocomplete="off" ${Uie(e,t,n)} />
        </label>`},sv=(e,t,r,o)=>{let n=Ag(e[t]?.model),s=new Set(Pg[t].map(c=>c.value)),i=Pg[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${mt(c.value)}"${d}>${mt(c.label)}</option>`}).join(""),a=n!==Hn&&!s.has(n)?`<option value="${mt(n)}" selected>${mt(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${mt(o)}</span>
          <select class="input mono" name="${mt(r)}">${i}${a}</select>
        </label>`},iv=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${mt(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
      <p class="eyebrow">Writer</p>
      <h1>API keys (optional)</h1>
      <p class="lede">Run Claude, Codex, or Antigravity tasks with provider HTTP APIs instead of installing their CLIs on this Mac. Keys stay in <span class="mono">writer-api-secrets.json</span> on this machine only.</p>
      <form class="task-form" method="POST" action="/writer-api">
        <fieldset class="field">
          <span class="field-label">Execution</span>
          <label><input type="radio" name="writerExecutionBackend" value="cli"${r} /> Local CLI (default)</label>
          <label><input type="radio" name="writerExecutionBackend" value="api"${o} /> API key + Agent Witch script</label>
        </fieldset>
        <p class="muted">Maps: Claude \u2192 Anthropic, Codex \u2192 OpenAI, Antigravity \u2192 Google Gemini. Cursor still requires CLI or Cursor Cloud on the website.</p>
        ${nv(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${sv(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${nv(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${sv(e.secrets,"openai","openaiModel","OpenAI model")}
        ${nv(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${sv(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var tq=l(()=>{"use strict";eq()});var fS,rq,oq=l(()=>{"use strict";fS=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rq=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${fS(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${fS(s.name)}</strong> <span class="muted mono">(${fS(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${fS(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var Bie,nq,sq,iq=l(()=>{"use strict";Bie=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,nq=e=>e.kind==="folder",sq=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&nq(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(nq(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(Bie)};return r(t)}});var aq,av,lq=l(()=>{"use strict";aq=m(require("node:path")),av=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${av(r.children,t)}</ul>
            </details>
          </li>`;let o=aq.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var cq,nn,Gie,Vie,Tp,Kie,lv,dq=l(()=>{"use strict";vy();cq=m(require("node:path"));oq();iq();lq();nn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Gie=()=>`(() => {
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
      "Folder picker is only available on the Mac that runs Agent Witch. Type the folder path instead.";
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

})();`,Vie=()=>`(() => {
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
})();`,Tp=e=>{let t=gd({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=rq({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${nn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${nn(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':Kie(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
        <p class="muted">Advanced: pull rules from an existing folder on disk (does not replace installing from Agent Witch Cloud).</p>
        <div class="actions">
          <a class="btn btn-secondary" href="/harness?import=1">Import from folder\u2026</a>
        </div>
      </section>`:"",d=a?"":`<section class="card">
      <p class="eyebrow">Advanced</p>
      <h1>Import from disk</h1>
      <p class="lede">Scan a folder for existing <code>.cursor</code> rules and copy them into the profile harness on this Mac. Prefer installing playbooks from Agent Witch Cloud when possible.</p>
      <div class="stack">
        <label class="field">
          <span class="field-label">Scan folder (required)</span>
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${nn(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${nn(s)}" />
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
    <script>${Gie()}</script>
    <script>${Vie()}</script>`;return`${t}${r}${o}${c}${d}`},Kie=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=sq(a.items.map(f=>({...f,relativePath:typeof f.relativePath=="string"&&f.relativePath.length>0?f.relativePath:cq.default.relative(a.sourceRoot,f.sourcePath).replaceAll("\\","/")}))),p=av(d,nn),g=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${nn(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${nn(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${g} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${nn(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},lv=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??p??a,f=t.sets[i];if(f===void 0)continue;let h=a.length>0?a:f.proposedSlug,y=g.length>0?g:f.proposedName,S=r.has(i),u=f.items.map(A=>({id:A.id,kind:A.kind,title:A.title,sourcePath:A.sourcePath,include:S}));s.push({slug:h,name:y,items:u})}return s}});var pq=l(()=>{"use strict";dq()});var qie,cv,uq=l(()=>{"use strict";It();qie=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},cv=qie});var Jie,mq,gq=l(()=>{"use strict";It();Jie=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},mq=Jie});var fq,Yie,yq,hq=l(()=>{"use strict";fq={saved:{message:"Pitfall saved.",error:null},retired:{message:"Pitfall retired. Turn on Show retired to see it again.",error:null},restored:{message:"Pitfall is active again.",error:null},invalid:{message:null,error:"Add a title, why it happens, and a fix. Keep them short, then save again."},limit:{message:null,error:"This project has 64 active pitfalls. Retire one, then try again."},missing:{message:null,error:"That pitfall is gone. Reload the page and try again."},rejected:{message:null,error:"Agent Witch Cloud did not accept this change. Check the fields and try again."},unavailable:{message:null,error:"Could not reach Agent Witch Cloud. Check this Mac on Status, then try again."}},Yie=e=>e!==null&&Object.prototype.hasOwnProperty.call(fq,e)?fq[e]:null,yq=Yie});var Sq=l(()=>{"use strict"});var Cs,Xie,dv,Pq=l(()=>{"use strict";vy();Rk();Cs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Xie=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,dv=e=>{let t=e.flashError?`<div class="alert-error">${Cs(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Cs(e.flashMessage)}</div>`:"",r=gd({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Cs(Xie(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,p=`<a class="btn btn-secondary btn-compact" href="${Cs(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,g=Sf(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
                  <input type="hidden" name="projectId" value="${Cs(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Cs(n.name)}</strong>
                  <span class="muted mono">${Cs(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${p}${g}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then pull playbooks into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var Aq=l(()=>{"use strict";Sq();kf();Pq()});var yS,bq=l(()=>{"use strict";yS=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var _q,ar,pv=l(()=>{"use strict";_q=m(require("node:path"));vt();Ie();G();ee();mk();ar=e=>{let t=H()?.layout.installDir??C();if(_q.default.basename(t)===pr)return Pt;let r=H(),o=r!==null?ze(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):Pt}});var uv,kq=l(()=>{"use strict";hr();pv();uv=async e=>{let t=Fe(e.installDir),r=t?.bundleVersion??null,o=ar(t);try{let n=await mi(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Ln(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var mv,wq=l(()=>{"use strict";mv=e=>!e});var gv,Ra,fv=l(()=>{"use strict";G();gv=()=>`http://127.0.0.1:${ti()}/update/run`,Ra=async e=>{try{let t=await fetch(gv(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Zie,Tq,yv,Eq=l(()=>{"use strict";G();ie();fv();Zie=()=>{zr({launchAgentLabel:ge(),installDir:C()})},Tq=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},yv=async()=>{Zie();let e=await Ra({force:!0});if(e.ok)return{ok:!0,message:Tq(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:Tq(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(hr(),WM)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var hv=l(()=>{"use strict";pE();bq();pv();kq();wq();Eq();fv()});var Rq,Cq=l(()=>{"use strict";Rq=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var vq,Lq,Sv,Pv,Iq=l(()=>{"use strict";vq=require("node:crypto"),Lq=m(require("node:fs"));Yt();ee();ee();Cq();Sv=!1,Pv=async e=>{if(Sv)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!Rq(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=H();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=V({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&Lq.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,vq.randomUUID)();Sv=!0;try{if(await gk(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await _i({...r,workspace:n},e.writerAgent,t);return await Ec(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Sv=!1}}});var xq=l(()=>{"use strict";Iq()});var Ep,Av=l(()=>{"use strict";Ep=e=>{if(typeof e!="string")return!1;let t=e.trim();return t.length===0||t.startsWith(".")||t.includes("/")||t.includes("\\")||t.includes("..")?!1:t===e}});var lr,Te,sn,vs,Wq,an,Ee,hS,SS,Oq,PS,AS,bS,bv,oe=l(()=>{"use strict";lr="history",Te="skills",sn="_drafts",vs="_tombstones",Wq="state.json",an="meta.json",Ee="skillgen",hS="episodes.json",SS="budget.json",Oq="metrics.jsonl",PS="SKILL.md",AS="meta.json",bS="learned-pitfalls.json",bv="flags.json"});var Ls,jq,gt,Re,jt=l(()=>{"use strict";Ls=m(require("node:fs")),jq=m(require("node:path"));oe();gt=e=>{Ls.default.mkdirSync(e,{recursive:!0,mode:448});try{Ls.default.chmodSync(e,448)}catch{}},Re=(e,t)=>{gt(jq.default.dirname(e));let r=`${e}.${process.pid}.${Date.now()}.tmp`;Ls.default.writeFileSync(r,t,{mode:384});try{Ls.default.chmodSync(r,384)}catch{}Ls.default.renameSync(r,e);try{Ls.default.chmodSync(e,384)}catch{}}});var Is,X,me,ne=l(()=>{"use strict";Is=m(require("node:path"));G();Av();jt();oe();X=e=>{if(!Ep(e))throw new Error("invalid_project_id");let t=M();return Is.default.join(t.projectDataDir,e)},me=e=>{let t=X(e);gt(t),gt(Is.default.join(t,lr));let r=Is.default.join(t,Te);return gt(r),gt(Is.default.join(r,sn)),gt(Is.default.join(r,vs)),gt(Is.default.join(t,Ee)),t}});var _v,kv,_S=l(()=>{"use strict";_v=/^[a-z0-9][a-z0-9_-]{0,63}$/,kv="sha256:"});var Nq,rt,Rp=l(()=>{"use strict";Nq=require("node:crypto");_S();rt=e=>`${kv}${(0,Nq.createHash)("sha256").update(Buffer.from(e,"utf8")).digest("hex")}`});var xs,Cp=l(()=>{"use strict";_S();xs=e=>_v.test(e)});var vp,kS=l(()=>{"use strict";vp=e=>e.onPublishedSet?e.localContentHash===e.expectedHash?"skip":"fetch_write":"remove"});var wv,Tv=l(()=>{"use strict";wv=async e=>{try{return await e.port.isHistoryEnabled(e.projectId)===!0}catch{return!1}}});var Ev,Rv=l(()=>{"use strict";Cp();Ev=async e=>{try{return(await e.port.listProjectSkillIds({projectId:e.projectId})).filter(r=>xs(r.skillId))}catch{return[]}}});var Cv,vv=l(()=>{"use strict";Cv=async e=>{try{let t=await e.awc.listPublished(e.projectId);return Array.isArray(t)?{ok:!0,published:t}:{ok:!1}}catch{return{ok:!1}}}});var Lv,Iv=l(()=>{"use strict";Rp();Lv=async e=>{try{let t=await e.port.readProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version});return t===null?null:rt(t.body)===t.contentHash?t:null}catch{return null}}});var xv,Wv=l(()=>{"use strict";Rp();Cp();xv=async e=>{if(!xs(e.skillId))return{ok:!1,code:"unavailable"};let t=rt(e.body);try{let r=await e.port.writeProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version,body:e.body});return r.contentHash===t?{ok:!0,path:r.path,contentHash:r.contentHash}:{ok:!1,code:"hash_mismatch"}}catch{return{ok:!1,code:"unavailable"}}}});var Ov,Mv=l(()=>{"use strict";Cp();Ov=async e=>{if(!xs(e.skillId))throw new Error("invalid_project_skill_id");return e.port.tombstoneProjectSkill({projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}})}});var jv,Nv=l(()=>{"use strict";Rp();kS();Iv();Wv();jv=async e=>{let{meta:t,projectId:r}=e,o={skillId:t.skillId,version:t.publishedVersion},n=await Lv({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion});if(vp({onPublishedSet:!0,expectedHash:t.contentHash,localContentHash:n?.contentHash??null})==="skip")return{...o,action:"skipped"};let i=await e.awc.getPublishedBody({projectId:r,skillId:t.skillId,version:t.publishedVersion,skillRowId:t.skillRowId});if(i===null)return{...o,action:"missing_awc"};if(i.contentHash!==t.contentHash||rt(i.body)!==t.contentHash)return{...o,action:"hash_mismatch"};let a=await xv({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion,body:i.body});return a.ok?a.contentHash===t.contentHash?{...o,action:"mirrored"}:{...o,action:"hash_mismatch"}:{...o,action:a.code==="hash_mismatch"?"hash_mismatch":"unavailable"}}});var Dv,Hv=l(()=>{"use strict";kS();Mv();Dv=async e=>vp({onPublishedSet:!1})!=="remove"?{skillId:e.skillId,version:0,action:"unavailable"}:(await Ov({port:e.port,projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}}),{skillId:e.skillId,version:0,action:"removed"})});var Lp,wS,Dq=l(()=>{"use strict";Tv();Rv();vv();Nv();Hv();Lp="[project-skill-pull-mirror]",wS=async e=>{let t=e.deps.history,r=e.deps.awcPublished;try{if(!await wv({port:t,projectId:e.projectId}))return{ok:!0,skipped:!0,skills:[]};let n=await Cv({awc:r,projectId:e.projectId});if(!n.ok)return console.warn(Lp,"list_failed",e.projectId),{ok:!1,skipped:!1,skills:[]};let s=new Set(n.published.map(d=>d.skillId)),i=[];for(let d of n.published)try{i.push(await jv({projectId:e.projectId,meta:d,port:t,awc:r}))}catch(p){console.warn(Lp,"skill_failed",d.skillId,p),i.push({skillId:d.skillId,version:d.publishedVersion,action:"unavailable"})}let a=await Ev({port:t,projectId:e.projectId});for(let d of a)if(!s.has(d.skillId))try{i.push(await Dv({projectId:e.projectId,skillId:d.skillId,lastContentHash:d.contentHash,port:t}))}catch(p){console.warn(Lp,"orphan_tombstone_failed",d.skillId,p),i.push({skillId:d.skillId,version:0,action:"unavailable"})}let c=i.some(d=>d.action==="unavailable"||d.action==="hash_mismatch"||d.action==="missing_awc");return c&&console.warn(Lp,"partial_failure",e.projectId,i),{ok:!c,skipped:!1,skills:i}}catch(o){return console.warn(Lp,"tick_failed",e.projectId,o),{ok:!1,skipped:!1,skills:[]}}}});var Ws=l(()=>{"use strict";_S();Rp();Cp();kS();Tv();Rv();vv();Iv();Wv();Mv();Nv();Hv();Dq()});var Os,Ip,Qie,eae,zv,$v=l(()=>{"use strict";Os=m(require("node:fs")),Ip=m(require("node:path"));jt();Ws();oe();ne();Qie=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),eae=e=>`v${String(e).padStart(4,"0")}.md`,zv=e=>{if(!Qie(e.skillId))throw new Error("invalid_project_skill_id");if(!Number.isInteger(e.version)||e.version<1)throw new Error("invalid_project_skill_version");let t=me(e.projectId),r=Ip.default.join(t,Te,e.skillId),o=Ip.default.join(r,eae(e.version)),n=Ip.default.join(r,an),s=rt(e.body);if(Os.default.existsSync(o)&&Os.default.existsSync(n))try{let a=JSON.parse(Os.default.readFileSync(n,"utf8"));if(a.version===e.version&&a.contentHash===s&&Os.default.readFileSync(o,"utf8")===e.body)return{path:o,contentHash:s}}catch{}Re(o,e.body),Re(n,`${JSON.stringify({skillId:e.skillId,version:e.version,contentHash:s,updatedAt:new Date().toISOString()})}
`);let i=Ip.default.join(t,Te,vs,`${e.skillId}.json`);return Os.default.existsSync(i)&&Os.default.unlinkSync(i),{path:o,contentHash:s}}});var xp,TS,Uv,Bv=l(()=>{"use strict";xp=m(require("node:fs")),TS=m(require("node:path"));Ws();oe();ne();Uv=e=>{if(e.skillId.length===0||e.skillId.startsWith("_")||e.skillId.includes("/")||e.skillId.includes("\\"))return null;let t;try{t=X(e.projectId)}catch{return null}let r=TS.default.join(t,Te,e.skillId),o=TS.default.join(r,`v${String(e.version).padStart(4,"0")}.md`),n=TS.default.join(r,an);if(!xp.default.existsSync(o)||!xp.default.existsSync(n))return null;try{let s=xp.default.readFileSync(o,"utf8"),i=JSON.parse(xp.default.readFileSync(n,"utf8")),a=typeof i.contentHash=="string"?i.contentHash:null;return a===null||i.version!==e.version||rt(s)!==a?null:{body:s,contentHash:a}}catch{return null}}});var yo,ln,Hq,tae,Gv,Vv,Kv=l(()=>{"use strict";yo=m(require("node:fs")),ln=m(require("node:path"));jt();oe();ne();Hq=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),tae=(e,t)=>{if(!yo.default.existsSync(e))return;let r=`.${t}.`;for(let o of yo.default.readdirSync(e)){if(!o.startsWith(r))continue;let n=ln.default.join(e,o);try{yo.default.rmSync(n,{recursive:!0,force:!0})}catch{}}},Gv=e=>{if(!Hq(e.skillId))throw new Error("invalid_project_skill_id");let t=me(e.projectId),r=ln.default.join(t,Te),o=ln.default.join(r,e.skillId),n=!1;if(yo.default.existsSync(o)){let c=ln.default.join(r,`.${e.skillId}.${process.pid}.${Date.now()}`);try{yo.default.renameSync(o,c),yo.default.rmSync(c,{recursive:!0,force:!0}),n=!0}catch{}}tae(r,e.skillId);let s=ln.default.join(r,vs);gt(s);let i=ln.default.join(s,`${e.skillId}.json`),a={skillId:e.skillId,revokedAt:e.revokedAt??new Date().toISOString(),lastContentHash:e.lastContentHash};return Re(i,`${JSON.stringify(a)}
`),{removed:n}},Vv=e=>{if(!Hq(e.skillId))return null;let t;try{t=X(e.projectId)}catch{return null}let r=ln.default.join(t,Te,vs,`${e.skillId}.json`);if(!yo.default.existsSync(r))return null;try{let o=JSON.parse(yo.default.readFileSync(r,"utf8"));if(typeof o!="object"||o===null||typeof o.skillId!="string"||typeof o.revokedAt!="string"||typeof o.lastContentHash!="string")return null;let n=o;return{skillId:n.skillId,revokedAt:n.revokedAt,lastContentHash:n.lastContentHash}}catch{return null}}});var Wp,qv,Jv,Yv=l(()=>{"use strict";Wp=m(require("node:fs")),qv=m(require("node:path"));oe();ne();Jv=e=>{let t;try{t=X(e.projectId)}catch{return[]}let r=qv.default.join(t,Te);if(!Wp.default.existsSync(r))return[];let o=[];for(let n of Wp.default.readdirSync(r)){if(n.startsWith("_")||n.startsWith("."))continue;let s=qv.default.join(r,n,an);if(Wp.default.existsSync(s))try{let i=JSON.parse(Wp.default.readFileSync(s,"utf8"));if(typeof i.contentHash!="string")continue;o.push({skillId:n,contentHash:i.contentHash})}catch{continue}}return o}});var Xv,Fq,Zv,Qv=l(()=>{"use strict";Xv=m(require("node:fs")),Fq=m(require("node:path"));jt();oe();ne();Zv=e=>{let t=e.messageId.trim();if(t.length===0||t.includes("/")||t.includes("\\")||t.includes(".."))throw new Error("invalid_message_id");let r=me(e.projectId),o=Fq.default.join(r,lr,`${t}.json`);if(Xv.default.existsSync(o))try{let s=JSON.parse(Xv.default.readFileSync(o,"utf8"));if(s.messageId===t)return s}catch{}let n={messageId:t,projectId:e.projectId,message:e.message,savedAt:new Date().toISOString()};return Re(o,`${JSON.stringify(n)}
`),n}});var Op,zq,$q,va,ES,eL,La=l(()=>{"use strict";Op=m(require("node:fs")),zq=m(require("node:path"));jt();oe();ne();G();$q=e=>zq.default.join(X(e),lr,Wq),va=e=>{try{let t=$q(e);if(!Op.default.existsSync(t))return null;let r=JSON.parse(Op.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null||typeof r.state!="string"||typeof r.updatedAt!="string")return null;let o=r.state;return o!=="on_ready"&&o!=="degraded"&&o!=="on_configuring"&&o!=="off"?null:{state:o,updatedAt:r.updatedAt}}catch{return null}},ES=e=>{me(e.projectId);let t={state:e.state,updatedAt:new Date().toISOString()};return Re($q(e.projectId),`${JSON.stringify(t)}
`),t},eL=()=>{let t=M().projectDataDir;if(!Op.default.existsSync(t))return[];let r=[];for(let o of Op.default.readdirSync(t)){if(!Ep(o))continue;let n=va(o);n!==null&&(n.state==="on_ready"||n.state==="degraded")&&r.push(o)}return r}});var Uq,Bq=l(()=>{"use strict";It();Uq=async e=>{let t=await fetch(`${e.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(e.projectId)}/computer-history/acks`,{method:"POST",headers:{[ae]:e.cloudApi.pairingToken,"Content-Type":"application/json"},body:JSON.stringify({messageId:e.messageId}),signal:AbortSignal.timeout(3e4)});return{ok:t.ok,status:t.status}}});var Mp,Gq,rae,tL,Vq=l(()=>{"use strict";qr();ee();La();Bq();Qv();Mp="[project-history-dispatch]",Gq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rae=()=>{let e=H();return e===null?null:V({wsUrl:e.wsUrl,pairingToken:e.pairingToken})},tL=async e=>{if(!Gq(e.payload))return{ok:!1,reason:"invalid_payload"};let t=typeof e.payload.projectId=="string"?e.payload.projectId.trim():"",r=e.payload.message;if(t.length===0||!Gq(r))return{ok:!1,reason:"invalid_payload"};let o=typeof r.messageId=="string"?r.messageId.trim():"";if(o.length===0)return{ok:!1,reason:"missing_message_id"};try{Zv({projectId:t,messageId:o,message:r}),ES({projectId:t,state:"on_ready"})}catch(s){console.error(Mp,"write_failed",t,o,s);try{ES({projectId:t,state:"degraded"})}catch(i){console.error(Mp,"degraded_mark_failed",t,i)}return{ok:!1,reason:"write_failed"}}let n=e.cloudApi===void 0?rae():e.cloudApi;if(n===null)return console.error(Mp,"ack_skipped_no_cloud_api",t,o),{ok:!0,messageId:o,acked:!1};try{let s=await Uq({cloudApi:n,projectId:t,messageId:o});return s.ok?{ok:!0,messageId:o,acked:!0}:(console.error(Mp,"ack_http_failed",t,o,s.status),{ok:!0,messageId:o,acked:!1})}catch(s){return console.error(Mp,"ack_failed",t,o,s),{ok:!0,messageId:o,acked:!1}}}});var ot=l(()=>{"use strict"});var rL,oL=l(()=>{"use strict";Yv();La();Bv();ne();Kv();$v();rL=()=>({isHistoryEnabled:e=>{let t=va(e);return t?.state==="on_ready"||t?.state==="degraded"},resolveProjectDataDir:e=>X(e),writeProjectSkillVersion:e=>zv(e),readProjectSkillVersion:e=>Uv(e),tombstoneProjectSkill:e=>Gv(e),readProjectSkillTombstone:e=>Vv(e),listProjectSkillIds:e=>Jv(e)})});var Kq,nL,sL=l(()=>{"use strict";It();Kq=e=>({[ae]:e,Accept:"application/json"}),nL=e=>({listPublished:async t=>{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/skills/published`,{method:"GET",headers:Kq(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(!r.ok)throw new Error(`listPublished http ${r.status}`);let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0||!Array.isArray(o.skills))throw new Error("listPublished malformed body");return o.skills.map((s,i)=>{if(typeof s!="object"||s===null||typeof s.skillId!="string"||typeof s.publishedVersion!="number"||typeof s.contentHash!="string")throw new Error(`listPublished row ${i} missing version/contentHash`);let a=s;return{skillId:a.skillId,publishedVersion:a.publishedVersion,contentHash:a.contentHash,...typeof a.skillRowId=="string"?{skillRowId:a.skillRowId}:{}}})},getPublishedBody:async t=>{let r=new URL(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t.projectId)}/skills/published/${encodeURIComponent(t.skillId)}`);r.searchParams.set("version",String(t.version));let o=await fetch(r.toString(),{method:"GET",headers:Kq(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(o.status===404)return null;if(!o.ok)throw new Error(`getPublishedBody http ${o.status}`);let n=await o.json();if(typeof n!="object"||n===null||n.ok!==!0||typeof n.body!="string"||typeof n.contentHash!="string")throw new Error("getPublishedBody malformed body");return{body:n.body,contentHash:n.contentHash}}})});var iL,aL=l(()=>{"use strict";ot();iL=e=>{let t=e.runCap??3e4,r=e.dayCap??1e5,o=Math.max(0,e.tokensUsedToday),n=Math.max(0,r-o),s=Math.max(0,e.estimatedRunTokens??0);return n<=0?{ok:!1,reason:"day_cap",remainingToday:0}:s>t?{ok:!1,reason:"run_cap",remainingToday:n}:s>n?{ok:!1,reason:"day_cap",remainingToday:n}:{ok:!0,remainingToday:n,runCap:Math.min(t,n)}}});var lL,cL=l(()=>{"use strict";ot();lL=e=>{let t=e.messageCountCap??20,r=e.idleMs??18e5,o=e.maxIntervalMs??864e5,n=e.messages;if(n.length===0)return{ready:!1,reason:"empty"};let s=Math.max(...n.map(p=>p.createdAtMs)),i=n.length>=t,a=e.nowMs-s>=r,c=e.lastClosedAtMs===null||e.nowMs-e.lastClosedAtMs>=o;return!i&&!a&&!c?{ready:!1,reason:"below_triggers"}:{ready:!0,reason:i?"count":a?"idle":"max_interval",messageIds:n.map(p=>p.messageId)}}});var RS,dL=l(()=>{"use strict";ot();RS=e=>{let t=e.maxOpenDrafts??20,r=Math.max(0,e.openDraftCount),o=r>=t;return{draftWaitingCount:r,capReached:o,miningPaused:o}}});var eJ,tJ,nae,CS,pL=l(()=>{"use strict";ot();eJ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),tJ=e=>e.trim().toLowerCase().replace(/\s+/g," "),nae=(e,t)=>{let r=new Set(e.map(tJ).filter(i=>i.length>0)),o=new Set(t.map(tJ).filter(i=>i.length>0));if(r.size===0||o.size===0)return 0;let n=0;for(let i of r)o.has(i)&&(n+=1);let s=r.size+o.size-n;return s===0?0:n/s},CS=e=>{let t=e.nearDupJaccard??.6,r=eJ(e.name);for(let o of e.existingPublished)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"published",matchId:o.id};for(let o of e.existingDrafts)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"draft",matchId:o.id};for(let o of e.existingDrafts){if(eJ(o.name)===r&&r.length>0)return{action:"update_draft",draftId:o.id,reason:"same_name"};if(nae(e.stepLines,o.stepLines)>=t)return{action:"update_draft",draftId:o.id,reason:"similar_steps"}}return{action:"create_new"}}});var uL,mL=l(()=>{"use strict";uL=e=>e.estimatedInputTokens>e.inputTokenCap?"reflect_then_write":"write"});var gL,iae,fL,aae,yL,hL=l(()=>{"use strict";ot();gL=e=>{let t=e.minMessages??3,r=Math.max(0,e.messageCount);return e.ownerMarkedSaveAsSkill?r<1?{ok:!1,reason:"too_short"}:{ok:!0,reason:"owner_mark"}:r<t?{ok:!1,reason:"too_short"}:e.hasSuccessSignal?{ok:!0,reason:"success_signal"}:{ok:!1,reason:"no_success_signal"}},iae=/\b(done|landed|tests?\s+green|thumbs?\s*-?\s*up|all\s+tests?\s+pass(?:ed)?|shipped)\b/i,fL=e=>iae.test(e),aae=/\b(save\s+as\s+skill|mark\s+as\s+skill|promote\s+to\s+skill)\b/i,yL=e=>aae.test(e)});var jp,vS=l(()=>{"use strict";jp=e=>({at:e.nowIso??new Date().toISOString(),projectId:e.projectId,episodeId:e.episodeId,fromState:e.fromState,toState:e.toState,reason:e.reason??null,tokensUsed:Math.max(0,e.tokensUsed??0),openDraftCount:Math.max(0,e.openDraftCount??0)})});var lae,rJ,Ia,oJ,Np=l(()=>{"use strict";lae=[{pattern:/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----/g,replacement:"[redacted-private-key]"},{pattern:/\bsk-[a-zA-Z0-9]{20,}\b/g,replacement:"[redacted-secret]"},{pattern:/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/g,replacement:"[redacted-secret]"},{pattern:/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g,replacement:"[redacted-secret]"},{pattern:/\bAKIA[0-9A-Z]{16}\b/g,replacement:"[redacted-secret]"},{pattern:/\bBearer\s+[A-Za-z0-9\-._~+/]+=*\b/gi,replacement:"Bearer [redacted-secret]"},{pattern:/\b(?:api[_-]?key|secret|token|password|passwd|credential)\s*[:=]\s*["']?[^\s"'\\]{8,}["']?/gi,replacement:"[redacted-secret]"},{pattern:/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,replacement:"[redacted-email]"}],rJ=[/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----/,/\bsk-[a-zA-Z0-9]{20,}\b/,/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/,/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/,/\bAKIA[0-9A-Z]{16}\b/,/\bBearer\s+[A-Za-z0-9\-._~+/]{12,}/i],Ia=e=>{let t=e,r=0;for(let n of lae)t=t.replace(n.pattern,()=>(r+=1,n.replacement));let o=rJ.some(n=>n.test(t));return{scrubbed:t,residualSecret:o,replacementCount:r}},oJ=e=>rJ.some(t=>t.test(e))});var SL,PL,AL,Dp=l(()=>{"use strict";SL=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE","AWAITING_REVIEW","PUBLISHED","SKIPPED_COST","SKIPPED_FILTER","SKIPPED_DEDUP","QUARANTINED","FAILED_EXTRACT","FAILED_VALIDATE","REJECTED"],PL={CAPTURING:{episode_closed:"EPISODE_READY"},EPISODE_READY:{budget_ok:"SCRUBBING",budget_exceeded:"SKIPPED_COST",draft_cap_reached:"EPISODE_READY"},SCRUBBING:{scrub_ok:"TRIAGE",scrub_quarantine:"QUARANTINED"},TRIAGE:{qualify_ok:"DEDUP",qualify_reject:"SKIPPED_FILTER"},DEDUP:{dedup_novel:"EXTRACT",dedup_merge:"EXTRACT",dedup_skip:"SKIPPED_DEDUP"},EXTRACT:{extract_ok:"VALIDATE",extract_fail:"FAILED_EXTRACT"},VALIDATE:{validate_ok:"AWAITING_REVIEW",validate_retry:"EXTRACT",validate_fail:"FAILED_VALIDATE"},AWAITING_REVIEW:{owner_publish:"PUBLISHED",owner_discard:"REJECTED"},PUBLISHED:{},SKIPPED_COST:{},SKIPPED_FILTER:{},SKIPPED_DEDUP:{},QUARANTINED:{},FAILED_EXTRACT:{},FAILED_VALIDATE:{},REJECTED:{}},AL=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE"]});var bL,_L=l(()=>{"use strict";Dp();bL=(e,t)=>{let r=PL[e][t];return r===void 0?{ok:!1,from:e,event:t}:{ok:!0,state:r}}});var cae,Mr,wL=l(()=>{"use strict";_L();ot();cae=(e,t)=>{switch(t.kind){case"close":return e==="CAPTURING"&&t.ready?"episode_closed":null;case"draft_cap":return e==="EPISODE_READY"&&t.reached?"draft_cap_reached":null;case"budget":return e!=="EPISODE_READY"?null:t.ok?"budget_ok":"budget_exceeded";case"scrub":return e!=="SCRUBBING"?null:t.residualSecret?"scrub_quarantine":"scrub_ok";case"qualify":return e!=="TRIAGE"?null:t.ok?"qualify_ok":"qualify_reject";case"dedup":return e!=="DEDUP"?null:t.action==="skip_exact"?"dedup_skip":t.action==="update_draft"||t.action==="create_new"?t.action==="update_draft"?"dedup_merge":"dedup_novel":null;case"extract":return e!=="EXTRACT"?null:t.ok?"extract_ok":"extract_fail";case"validate":return e!=="VALIDATE"?null:t.ok?"validate_ok":t.attempts<=1?"validate_retry":"validate_fail";case"owner":return e!=="AWAITING_REVIEW"?null:t.decision==="publish"?"owner_publish":"owner_discard";default:return t}},Mr=e=>{let t=cae(e.state,e.verdict);if(t===null)return{ok:!1,reason:e.verdict.kind==="close"&&!e.verdict.ready?"not_ready":"no_transition",state:e.state};let r=bL(e.state,t);return r.ok?{ok:!0,event:t,nextState:r.state}:{ok:!1,reason:"illegal_event",state:e.state,event:t}}});var uae,nJ,mae,gae,TL,Hp,LS=l(()=>{"use strict";ot();Np();uae=/^[a-z0-9][a-z0-9-]{0,63}$/,nJ=e=>{let t=e.replace(/^\uFEFF/,"");if(!t.startsWith("---"))return null;let r=t.indexOf(`
---`,3);if(r<0)return null;let o=t.slice(3,r).replace(/^\r?\n/,""),n=t.slice(r+4).replace(/^\r?\n/,""),s={};for(let i of o.split(/\r?\n/)){let a=i.indexOf(":");if(a<=0)continue;let c=i.slice(0,a).trim(),d=i.slice(a+1).trim().replace(/^["']|["']$/g,"");c.length>0&&(s[c]=d)}return{fm:s,body:n}},mae=e=>(e.match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??e).match(/^\s*(?:\d+\.|[-*])\s+\S+/gm)?.length??0,gae=e=>{if(e===void 0||e.trim().length===0)return null;let t=e.trim();if(t.startsWith("["))try{let r=JSON.parse(t.replace(/'/g,'"'));return Array.isArray(r)?r.filter(o=>typeof o=="string"):null}catch{return t.replace(/^\[|\]$/g,"").split(",").map(r=>r.trim().replace(/^["']|["']$/g,"")).filter(r=>r.length>0)}return t.split(",").map(r=>r.trim()).filter(r=>r.length>0)},TL=e=>{let t=e.minSteps??2,r=e.maxBodyBytes??65536,o=e.skillMarkdown;if(o.trim().length===0)return{ok:!1,reason:"empty"};let n=Buffer.byteLength(o,"utf8");if(n>r)return{ok:!1,reason:"body_too_large"};if(oJ(o))return{ok:!1,reason:"residual_secret"};let s=nJ(o);if(s===null)return{ok:!1,reason:"missing_frontmatter"};let{fm:i,body:a}=s,c=i.name??"";if(!uae.test(c))return{ok:!1,reason:"invalid_name"};let d=i.description??"";if(d.trim().length===0)return{ok:!1,reason:"missing_description"};let p=i.version??"";if(p.trim().length===0)return{ok:!1,reason:"missing_version"};if((i.status??"").trim()!=="draft")return{ok:!1,reason:"missing_status_draft"};let g=gae(i.source_message_ids??i.source_message_ids);if(g===null||g.length===0)return{ok:!1,reason:"missing_source_message_ids"};let f=mae(a);return f<t?{ok:!1,reason:"too_few_steps"}:{ok:!0,name:c,description:d,version:p,sourceMessageIds:g,stepCount:f,bodyBytes:n}},Hp=e=>(((nJ(e)?.body??e).match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??"").match(/^\s*(?:\d+\.|[-*])\s+(.+)$/gm)??[]).map(i=>i.replace(/^\s*(?:\d+\.|[-*])\s+/,"").trim())});var sJ,yae,jr,IS,xS=l(()=>{"use strict";sJ=require("node:crypto");Ws();ot();aL();cL();dL();pL();mL();hL();vS();Np();wL();LS();yae=e=>Math.ceil(e.length/4),jr=(e,t,r,o={})=>({...e,...o,state:t,reason:r}),IS=async e=>{let t=e.episode,r=[],o=null,n=0,s=null,i=e.deps.estimateTokens??yae,a=e.messages.map(p=>p.text).join(`
`),c=(p,g,f)=>{r.push(jp({projectId:t.projectId,episodeId:t.episodeId,fromState:p,toState:g,reason:f,tokensUsed:n,openDraftCount:e.deps.openDraftCount(),nowIso:new Date(e.nowMs).toISOString()}))};for(let p=0;p<16;p+=1){let g=RS({openDraftCount:e.deps.openDraftCount()});if(t.state==="CAPTURING"){let f=lL({messages:e.messages.map(S=>({messageId:S.messageId,createdAtMs:S.createdAtMs})),nowMs:e.nowMs,lastClosedAtMs:e.lastClosedAtMs}),h=Mr({state:t.state,verdict:{kind:"close",ready:f.ready}});if(!h.ok)break;let y=t.state;t=jr(t,h.nextState,f.ready?f.reason:null,{messageIds:f.ready?f.messageIds:t.messageIds,closedAtMs:f.ready?e.nowMs:t.closedAtMs,ownerMarkedSaveAsSkill:e.messages.some(S=>yL(S.text)),hasSuccessSignal:e.messages.some(S=>fL(S.text))}),c(y,t.state,t.reason);continue}if(t.state==="EPISODE_READY"){if(g.capReached){let S=Mr({state:t.state,verdict:{kind:"draft_cap",reached:!0}});S.ok&&(c(t.state,S.nextState,"draft_cap_reached"),t=jr(t,S.nextState,"draft_cap_reached"));break}let f=iL({tokensUsedToday:e.tokensUsedToday+n}),h=Mr({state:t.state,verdict:{kind:"budget",ok:f.ok}});if(!h.ok)break;let y=t.state;t=jr(t,h.nextState,f.ok?"budget_ok":f.reason),c(y,t.state,t.reason);continue}if(t.state==="SCRUBBING"){let f=Ia(a),h=Mr({state:t.state,verdict:{kind:"scrub",residualSecret:f.residualSecret}});if(!h.ok)break;let y=t.state;t=jr(t,h.nextState,f.residualSecret?"scrub_quarantine":"scrub_ok",{scrubbedTranscript:f.scrubbed}),c(y,t.state,t.reason);continue}if(t.state==="TRIAGE"){let f=gL({messageCount:t.messageIds.length,ownerMarkedSaveAsSkill:t.ownerMarkedSaveAsSkill,hasSuccessSignal:t.hasSuccessSignal}),h=Mr({state:t.state,verdict:{kind:"qualify",ok:f.ok}});if(!h.ok)break;let y=t.state;t=jr(t,h.nextState,f.reason),c(y,t.state,t.reason);continue}if(t.state==="DEDUP"){let f=rt(t.scrubbedTranscript??a),h=CS({contentHash:f,name:"",stepLines:[],existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if((h.action==="create_new"||h.action==="update_draft")&&e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let y=Mr({state:t.state,verdict:{kind:"dedup",action:h.action}});if(!y.ok)break;let S=t.state;t=jr(t,y.nextState,h.action,{contentHash:f,mergeDraftId:h.action==="update_draft"?h.draftId:t.mergeDraftId}),c(S,t.state,t.reason);continue}if(t.state==="EXTRACT"){if(e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let f=t.scrubbedTranscript??"",h=uL({estimatedInputTokens:i(f),inputTokenCap:12e3}),y=await e.deps.ownerLlm({scrubbedTranscript:f,similarDraftHints:[],mode:h});n+=y.tokensUsed;let S=Mr({state:t.state,verdict:{kind:"extract",ok:y.ok}});if(!S.ok)break;let u=t.state;y.ok&&(s=y.skillMarkdown),t=jr(t,S.nextState,y.ok?"extract_ok":y.reason,{tokensUsed:t.tokensUsed+y.tokensUsed}),c(u,t.state,t.reason);continue}if(t.state==="VALIDATE"){let f=s??"",h=TL({skillMarkdown:f}),y=t.validateAttempts+(h.ok?0:1),S=Mr({state:t.state,verdict:{kind:"validate",ok:h.ok,attempts:h.ok?t.validateAttempts:Math.max(1,y)}});if(!S.ok)break;let u=t.state;if(h.ok){let A=rt(f),T=Hp(f),P=CS({contentHash:A,name:h.name,stepLines:T,existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if(P.action==="skip_exact"){t=jr(t,"SKIPPED_DEDUP","skip_exact",{contentHash:A,validateAttempts:y}),c(u,t.state,"skip_exact");break}let b=P.action==="update_draft"?P.draftId:t.mergeDraftId??(0,sJ.randomUUID)();o=e.deps.writeDraft({projectId:t.projectId,draftId:b,skillMarkdown:f,episodeId:t.episodeId,sourceMessageIds:h.sourceMessageIds,name:h.name,description:h.description}),t=jr(t,S.nextState,"validate_ok",{draftId:b,contentHash:o.contentHash,validateAttempts:y}),c(u,t.state,t.reason);break}if(S.nextState==="EXTRACT"&&(s=null),t=jr(t,S.nextState,h.reason,{validateAttempts:y}),c(u,t.state,t.reason),S.nextState==="EXTRACT"&&y>1)break;continue}break}let d=RS({openDraftCount:e.deps.openDraftCount()});return{episode:t,metrics:r,reviewFlag:d,draftWritten:o,tokensSpent:n}}});var EL,RL,Fp,WS=l(()=>{"use strict";EL=m(require("node:fs")),RL=m(require("node:path"));jt();oe();ne();Fp=e=>{if(e.events.length===0)return;let t=me(e.projectId),r=RL.default.join(t,Ee);gt(r);let o=RL.default.join(r,Oq),n=`${e.events.map(s=>JSON.stringify(s)).join(`
`)}
`;EL.default.appendFileSync(o,n,{mode:384});try{EL.default.chmodSync(o,384)}catch{}}});var xa,OS=l(()=>{"use strict";xa=e=>e.trim().toLowerCase().replace(/\s+/g," ").replace(/[.,;:!?]+$/g,"")});var cJ,iJ,aJ,Sae,Pae,CL,vL=l(()=>{"use strict";cJ=require("node:crypto");ot();OS();Np();iJ=(e,t)=>e.length<=t?e:`${e.slice(0,Math.max(0,t-1)).trimEnd()}\u2026`,aJ=e=>e.toLowerCase().replace(/_/g," "),Sae=(e,t)=>`sha256:${(0,cJ.createHash)("sha256").update(`${e}
${t}`,"utf8").digest("hex")}`,Pae=(e,t)=>{let r=t.replace(/^sha256:/,"").slice(0,12);return`hist-${e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40)||"ep"}-${r}`.slice(0,64)},CL=e=>{let t=e.maxPerDraft??8,r=e.maxStored??64,o=e.nowIso??new Date().toISOString(),n=new Set,s=[],i=[],a=0;for(let c of e.failures){let d=c.reason!==null&&c.reason.trim().length>0?c.reason.trim():aJ(c.state),p=Ia(d);if(p.residualSecret){a+=1;continue}let g=`Avoid repeating this history failure (${aJ(c.state)}).`,f=Ia(g);if(f.residualSecret){a+=1;continue}let h=iJ(p.scrubbed.replace(/\s+/g," ").trim(),120),y=iJ(f.scrubbed.replace(/\s+/g," ").trim(),280);if(h.length===0||y.length===0)continue;let S=xa(`${h}|${y}`);if(n.has(S))continue;n.add(S);let u=Sae(h,y),A=`- **${h}:** ${y}`;s.length<t&&s.push(A),i.length<r&&i.push({id:Pae(c.episodeId,u),symptom:h,avoidance:y,sourceEpisodeId:c.episodeId,sourceState:c.state,contentHash:u,createdAt:o})}return{skillPitfallLines:s,localEntries:i,skippedSecretCount:a}}});var Aae,LL,IL=l(()=>{"use strict";OS();ot();Aae=e=>{let t=[];for(let r of e.split(/\r?\n/)){let o=r.trim();/^[-*]\s+\S/.test(o)?t.push(o.replace(/^\*\s+/,"- ")):/^\d+\.\s+\S/.test(o)&&t.push(o.replace(/^\d+\.\s+/,"- "))}return t},LL=e=>{let t=e.maxBullets??8,r=e.skillMarkdown,o=/(^|\n)(##\s*Pitfalls\s*\n)([\s\S]*?)(?=\n##\s+\S|$)/i,n=r.match(o),s=n?Aae(n[3]??""):[],i=new Set(s.map(g=>xa(g))),a=[...s],c=0;for(let g of e.newPitfallLines){let f=g.trim();if(f.length===0)continue;let h=f.startsWith("- ")?f:`- ${f}`,y=xa(h);if(!i.has(y)){if(a.length>=t)break;i.add(y),a.push(h),c+=1}}let d=a.length>0?`${a.join(`
`)}
`:`(none yet)
`;if(n)return{skillMarkdown:r.replace(o,(f,h,y)=>`${h}${y}${d}`),appendedCount:c,totalPitfallBullets:a.length};let p=r.endsWith(`
`)?"":`
`;return{skillMarkdown:`${r}${p}
## Pitfalls
${d}`,appendedCount:c,totalPitfallBullets:a.length}}});var xL,pJ,dJ,NS,WL,OL=l(()=>{"use strict";xL=m(require("node:fs")),pJ=m(require("node:path"));oe();ne();dJ="[project-history-skillgen]",NS=()=>({items:[],updatedAt:new Date(0).toISOString()}),WL=e=>{let t=pJ.default.join(X(e),Ee,bS);if(!xL.default.existsSync(t))return NS();try{let r=JSON.parse(xL.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.items)?(console.error(dJ,"learned_pitfalls_corrupt",e),NS()):{items:r.items,updatedAt:typeof r.updatedAt=="string"?r.updatedAt:NS().updatedAt}}catch(r){return console.error(dJ,"learned_pitfalls_read_failed",e,r),NS()}}});var bae,uJ,mJ=l(()=>{"use strict";bae=["FAILED_EXTRACT","FAILED_VALIDATE","QUARANTINED","SKIPPED_FILTER"],uJ=e=>bae.includes(e)});var ML,jL=l(()=>{"use strict";mJ();ML=e=>{let t=[];for(let r of e.episodes)e.excludeEpisodeId!==void 0&&e.excludeEpisodeId!==null&&r.episodeId===e.excludeEpisodeId||uJ(r.state)&&t.push({episodeId:r.episodeId,state:r.state,reason:r.reason});return t}});var NL,zp,_ae,$p,DL,DS=l(()=>{"use strict";NL=m(require("node:fs")),zp=m(require("node:path"));Ws();jt();oe();ne();_ae=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),$p=e=>{if(!_ae(e.draftId))throw new Error("invalid_draft_id");let t=me(e.projectId),r=zp.default.join(t,Te,sn,e.draftId);gt(r);let o=zp.default.join(r,PS),n=zp.default.join(r,AS),s=rt(e.skillMarkdown);return Re(o,e.skillMarkdown),Re(n,`${JSON.stringify({draftId:e.draftId,episodeId:e.episodeId,name:e.name,description:e.description,sourceMessageIds:e.sourceMessageIds,contentHash:s,status:"draft",updatedAt:new Date().toISOString()})}
`),{draftDir:r,skillPath:o,metaPath:n,contentHash:s}},DL=e=>{let t=me(e),r=zp.default.join(t,Te,sn);return NL.default.existsSync(r)?NL.default.readdirSync(r,{withFileTypes:!0}).filter(o=>o.isDirectory()&&!o.name.startsWith(".")).length:0}});var gJ,HL,FL=l(()=>{"use strict";gJ=m(require("node:path"));jt();oe();ne();HL=e=>{let t=me(e.projectId),r=gJ.default.join(t,Ee,bS),o={...e.file,updatedAt:new Date().toISOString()};return Re(r,`${JSON.stringify(o)}
`),o}});var fJ,zL,$L=l(()=>{"use strict";fJ=m(require("node:path"));jt();oe();ne();zL=e=>{let t=me(e.projectId),r=fJ.default.join(t,Ee,bv),o={...e.file,updatedAt:new Date().toISOString()};return Re(r,`${JSON.stringify(o)}
`),o}});var BL,yJ,UL,kae,wae,HS,GL,VL=l(()=>{"use strict";BL=m(require("node:fs")),yJ=m(require("node:path"));WS();vL();IL();ot();OL();vS();jL();DS();FL();$L();UL="[project-history-skillgen]",kae=(e,t)=>{let r=new Map;for(let o of e)r.set(o.contentHash,o);for(let o of t)r.set(o.contentHash,o);return[...r.values()].slice(-64)},wae=e=>{try{let t=JSON.parse(BL.default.readFileSync(e,"utf8"));return{name:typeof t.name=="string"?t.name:"draft",description:typeof t.description=="string"?t.description:"",sourceMessageIds:Array.isArray(t.sourceMessageIds)?t.sourceMessageIds.filter(r=>typeof r=="string"):[]}}catch{return{name:"draft",description:"",sourceMessageIds:[]}}},HS=e=>{try{Fp({projectId:e.projectId,events:[jp({projectId:e.projectId,episodeId:e.episodeId,fromState:e.state,toState:e.state,reason:e.reason,tokensUsed:0,nowIso:e.nowIso})]})}catch{}},GL=e=>{let t=new Date(e.nowMs).toISOString();try{let r=ML({episodes:e.episodes,excludeEpisodeId:e.successEpisode.episodeId}),o=CL({failures:r,nowIso:t});if(o.skillPitfallLines.length===0&&o.localEntries.length===0)return{appendedCount:0,storedCount:0,ok:!0};let n=0;try{let s=wae(e.draftWritten.metaPath),i=BL.default.readFileSync(e.draftWritten.skillPath,"utf8"),a=LL({skillMarkdown:i,newPitfallLines:o.skillPitfallLines});n=a.appendedCount,a.skillMarkdown!==i&&$p({projectId:e.projectId,draftId:yJ.default.basename(e.draftWritten.draftDir),skillMarkdown:a.skillMarkdown,episodeId:e.successEpisode.episodeId,sourceMessageIds:s.sourceMessageIds,name:s.name,description:s.description})}catch(s){console.error(UL,"pitfalls_draft_merge_failed",e.projectId,s),HS({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_draft_merge_failed",nowIso:t})}try{let s=WL(e.projectId),i=kae(s.items,o.localEntries);return HL({projectId:e.projectId,file:{items:i,updatedAt:t}}),zL({projectId:e.projectId,file:{historyLearnedPitfalls:i.length===0?null:{active:!0,count:i.length,updatedAt:t,summary:`${i.length} recent pitfalls from project history (local)`},updatedAt:t}}),HS({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attached",nowIso:t}),{appendedCount:n,storedCount:i.length,ok:!0}}catch(s){return console.error(UL,"pitfalls_store_failed",e.projectId,s),HS({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_store_failed",nowIso:t}),{appendedCount:n,storedCount:0,ok:!1}}}catch(r){return console.error(UL,"pitfalls_attach_failed",e.projectId,r),HS({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attach_failed",nowIso:t}),{appendedCount:0,storedCount:0,ok:!1}}}});var Up,FS=l(()=>{"use strict";Up=e=>{let t=e.message;for(let r of["summary","text","body","content"]){let o=t[r];if(typeof o=="string"&&o.trim().length>0)return o}return""}});var hJ,SJ=l(()=>{"use strict";Dp();hJ=(e,t)=>{for(let r=e.length-1;r>=0;r-=1){let o=e[r];if(o.projectId===t&&AL.includes(o.state))return o}return null}});var KL,qL=l(()=>{"use strict";KL=e=>e==="on_ready"||e==="degraded"||e==="on_configuring"});var JL,PJ,Tae,YL,XL=l(()=>{"use strict";JL=m(require("node:fs")),PJ=m(require("node:path"));oe();ne();Tae=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.messageId=="string"&&typeof t.projectId=="string"&&typeof t.savedAt=="string"&&typeof t.message=="object"&&t.message!==null&&!Array.isArray(t.message)},YL=e=>{let t=e.messageId.trim();if(t.length===0||t.includes("/")||t.includes("\\")||t.includes(".."))return null;let r=PJ.default.join(X(e.projectId),lr,`${t}.json`);if(!JL.default.existsSync(r))return null;try{let o=JSON.parse(JL.default.readFileSync(r,"utf8"));return Tae(o)?o:null}catch{return null}}});var ZL,AJ,Bp,zS=l(()=>{"use strict";ZL=m(require("node:fs")),AJ=m(require("node:path"));oe();XL();ne();Bp=e=>{let t=AJ.default.join(X(e),lr);if(!ZL.default.existsSync(t))return[];let r=ZL.default.readdirSync(t).filter(n=>n.endsWith(".json")&&n!=="state.json").map(n=>n.slice(0,-5)),o=[];for(let n of r){let s=YL({projectId:e,messageId:n});s!==null&&o.push(s)}return o.sort((n,s)=>{let i=Date.parse(n.savedAt),a=Date.parse(s.savedAt);return i!==a?i-a:n.messageId.localeCompare(s.messageId)})}});var Ms,$S,bJ,_J=l(()=>{"use strict";Ms=m(require("node:fs")),$S=m(require("node:path"));oe();ne();LS();bJ=e=>{let t=$S.default.join(X(e),Te,sn);if(!Ms.default.existsSync(t))return[];let r=[];for(let o of Ms.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("."))continue;let n=$S.default.join(t,o.name,PS),s=$S.default.join(t,o.name,AS);if(Ms.default.existsSync(n))try{let i=Ms.default.readFileSync(n,"utf8"),a="",c=o.name;if(Ms.default.existsSync(s)){let d=JSON.parse(Ms.default.readFileSync(s,"utf8"));typeof d.contentHash=="string"&&(a=d.contentHash),typeof d.name=="string"&&d.name.length>0&&(c=d.name)}if(a.length===0)continue;r.push({id:o.name,contentHash:a,name:c,stepLines:Hp(i)})}catch{}}return r}});var Gp,QL,kJ,wJ=l(()=>{"use strict";Gp=m(require("node:fs")),QL=m(require("node:path"));oe();ne();kJ=e=>{let t=QL.default.join(X(e),Te);if(!Gp.default.existsSync(t))return[];let r=[];for(let o of Gp.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("_"))continue;let n=QL.default.join(t,o.name,an);if(Gp.default.existsSync(n))try{let s=JSON.parse(Gp.default.readFileSync(n,"utf8"));if(typeof s.contentHash!="string")continue;r.push({id:o.name,contentHash:s.contentHash,name:typeof s.skillId=="string"?s.skillId:o.name,stepLines:[]})}catch{}}return r}});var Eae,eI,tI=l(()=>{"use strict";FS();zS();Eae=(e,t,r,o)=>r===null||e>r?!0:e<r?!1:o===null?!0:t.localeCompare(o)>0,eI=e=>{let t=Bp(e.projectId),r=[];for(let o of t){let n=Date.parse(o.savedAt);Number.isNaN(n)||Eae(n,o.messageId,e.cursorSavedAtMs,e.cursorMessageId)&&r.push({messageId:o.messageId,createdAtMs:n,text:Up(o)})}return r}});var TJ,EJ=l(()=>{"use strict";TJ=(e,t)=>{let r=e.findIndex(o=>o.episodeId===t.episodeId);return r<0?[...e,t]:e.map((o,n)=>n===r?t:o)}});var RJ,rI,oI=l(()=>{"use strict";RJ=m(require("node:path"));jt();oe();ne();rI=e=>{let t=me(e.projectId),r=RJ.default.join(t,Ee,SS),o={...e.budget,updatedAt:new Date().toISOString()};return Re(r,`${JSON.stringify(o)}
`),o}});var CJ,nI,sI=l(()=>{"use strict";CJ=m(require("node:path"));jt();oe();ne();nI=e=>{let t=me(e.projectId),r=CJ.default.join(t,Ee,hS),o={...e.file,updatedAt:new Date().toISOString()};return Re(r,`${JSON.stringify(o)}
`),o}});var vJ,LJ=l(()=>{"use strict";WS();EJ();oI();sI();vJ=e=>{let{result:t,episodesFile:r,budget:o,projectId:n,nowMs:s}=e,i=r.cursorMessageId,a=r.cursorSavedAtMs;t.episode.state!=="CAPTURING"&&t.episode.messageIds.length>0&&(i=t.episode.messageIds[t.episode.messageIds.length-1],a=t.episode.lastMessageAtMs??a),nI({projectId:n,file:{episodes:TJ(r.episodes,t.episode),cursorMessageId:i,cursorSavedAtMs:a,updatedAt:new Date(s).toISOString()}}),rI({projectId:n,budget:{dayKey:o.dayKey,tokensUsedToday:o.tokensUsedToday+t.tokensSpent,lastClosedAtMs:t.episode.closedAtMs??o.lastClosedAtMs,updatedAt:new Date(s).toISOString()}}),Fp({projectId:n,events:t.metrics})}});var US,iI=l(()=>{"use strict";US=e=>new Date(e).toISOString().slice(0,10)});var BS,IJ=l(()=>{"use strict";iI();BS=e=>({dayKey:US(e),tokensUsedToday:0,lastClosedAtMs:null,updatedAt:new Date(e).toISOString()})});var aI,WJ,xJ,Rae,lI,cI=l(()=>{"use strict";aI=m(require("node:fs")),WJ=m(require("node:path"));IJ();oe();ne();iI();xJ="[project-history-skillgen]",Rae=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e;if(typeof r.dayKey!="string"||typeof r.tokensUsedToday!="number"||!(r.lastClosedAtMs===null||typeof r.lastClosedAtMs=="number")||typeof r.updatedAt!="string")return null;let o=US(t);return r.dayKey!==o?{dayKey:o,tokensUsedToday:0,lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}:{dayKey:r.dayKey,tokensUsedToday:Math.max(0,r.tokensUsedToday),lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}},lI=e=>{let t=WJ.default.join(X(e.projectId),Ee,SS);if(!aI.default.existsSync(t))return BS(e.nowMs);try{let r=JSON.parse(aI.default.readFileSync(t,"utf8")),o=Rae(r,e.nowMs);return o===null?(console.error(xJ,"budget_corrupt",e.projectId),BS(e.nowMs)):o}catch(r){return console.error(xJ,"budget_read_failed",e.projectId,r),BS(e.nowMs)}}});var GS,OJ=l(()=>{"use strict";GS=(e=new Date(0).toISOString())=>({episodes:[],cursorMessageId:null,cursorSavedAtMs:null,updatedAt:e})});var dI,jJ,MJ,Cae,vae,Lae,pI,uI=l(()=>{"use strict";dI=m(require("node:fs")),jJ=m(require("node:path"));OJ();Dp();oe();ne();MJ="[project-history-skillgen]",Cae=e=>typeof e=="string"&&SL.includes(e),vae=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.episodeId=="string"&&typeof t.projectId=="string"&&Cae(t.state)&&Array.isArray(t.messageIds)&&typeof t.startedAtMs=="number"&&typeof t.lastMessageAtMs=="number"},Lae=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(!Array.isArray(t.episodes))return null;let r=t.episodes.filter(vae);if(r.length!==t.episodes.length||typeof t.updatedAt!="string")return null;let o=t.cursorMessageId===null||typeof t.cursorMessageId=="string"?t.cursorMessageId:null,n=t.cursorSavedAtMs===null||typeof t.cursorSavedAtMs=="number"?t.cursorSavedAtMs:null;return{episodes:r,cursorMessageId:o,cursorSavedAtMs:n,updatedAt:t.updatedAt}},pI=e=>{let t=jJ.default.join(X(e),Ee,hS);if(!dI.default.existsSync(t))return GS();try{let r=JSON.parse(dI.default.readFileSync(t,"utf8")),o=Lae(r);return o===null?(console.error(MJ,"episodes_corrupt",e),GS()):o}catch(r){return console.error(MJ,"episodes_read_failed",e,r),GS()}}});var NJ,Iae,xae,mI,gI=l(()=>{"use strict";NJ=require("node:crypto");xS();VL();FS();SJ();qL();zS();_J();wJ();tI();La();LJ();cI();uI();DS();Iae="[project-history-skillgen]",xae=(e,t)=>{let r=new Map;for(let o of Bp(e)){let n=Date.parse(o.savedAt);Number.isNaN(n)||r.set(o.messageId,{messageId:o.messageId,createdAtMs:n,text:Up(o)})}return t.map(o=>r.get(o)).filter(o=>o!==void 0)},mI=(e={})=>{let t=e.ownerLlm??null,r=e.nowMs??Date.now;return async o=>{try{let n=va(o.projectId);if(!KL(n?.state))return;let s=r(),i=pI(o.projectId),a=lI({projectId:o.projectId,nowMs:s}),c=eI({projectId:o.projectId,cursorMessageId:i.cursorMessageId,cursorSavedAtMs:i.cursorSavedAtMs}),d=hJ(i.episodes,o.projectId);if(d===null){if(c.length===0)return;let f=c[0],h=c[c.length-1];d={episodeId:(0,NJ.randomUUID)(),projectId:o.projectId,state:"CAPTURING",messageIds:c.map(y=>y.messageId),startedAtMs:f.createdAtMs,lastMessageAtMs:h.createdAtMs,closedAtMs:null,reason:null,scrubbedTranscript:null,ownerMarkedSaveAsSkill:!1,hasSuccessSignal:!1,validateAttempts:0,draftId:null,contentHash:null,mergeDraftId:null,tokensUsed:0}}else if(d.state==="CAPTURING"&&c.length>0){let f=new Set(d.messageIds),h=[...d.messageIds],y=d.lastMessageAtMs;for(let S of c)f.has(S.messageId)||(h.push(S.messageId),f.add(S.messageId),y=Math.max(y,S.createdAtMs));d={...d,messageIds:h,lastMessageAtMs:y}}let p=xae(o.projectId,d.messageIds);if(p.length===0)return;let g=await IS({episode:d,messages:p,tokensUsedToday:a.tokensUsedToday,lastClosedAtMs:a.lastClosedAtMs,nowMs:s,deps:{ownerLlm:t,writeDraft:$p,listDraftFingerprints:()=>bJ(o.projectId),listPublishedFingerprints:()=>kJ(o.projectId),openDraftCount:()=>DL(o.projectId)}});if(vJ({projectId:o.projectId,episodesFile:i,budget:a,result:g,nowMs:s}),g.draftWritten!==null&&g.episode.state==="AWAITING_REVIEW"){let f=[...i.episodes.filter(h=>h.episodeId!==g.episode.episodeId),g.episode];GL({projectId:o.projectId,successEpisode:g.episode,episodes:f,draftWritten:g.draftWritten,nowMs:s})}}catch(n){console.error(Iae,"run_failed",o.projectId,n)}}}});var fI,yI,hI=l(()=>{"use strict";Ws();ee();qr();sL();oL();gI();La();fI="[project-history-tick]",yI=async(e={})=>{let t=e.listProjectIds?.()??eL();if(t.length===0)return;let r=H(),o=e.cloudApi!==void 0?e.cloudApi:r===null?null:V({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),n=rL(),s=e.pullSkills??wS,i=e.runSkillgen??mI({ownerLlm:e.ownerLlm??null});for(let a of t){try{await i({projectId:a})}catch(c){console.error(fI,"skillgen_failed",a,c)}if(o===null){console.error(fI,"pull_skipped_no_cloud_api",a);continue}try{await s({projectId:a,deps:{history:n,awcPublished:nL(o)}})}catch(c){console.error(fI,"pull_failed",a,c)}}}});var SI,HJ=l(()=>{"use strict";ot();hI();SI=e=>{let t=e?.intervalMs??6e4,r=e?.tick??(()=>yI());r();let o=setInterval(()=>{r()},t);return{stop:()=>{clearInterval(o)}}}});var FJ=l(()=>{"use strict";oe();ne()});var zJ=l(()=>{"use strict";xS()});var $J=l(()=>{"use strict";oe();ne()});var PI=l(()=>{"use strict";Av();ne();$v();Bv();Kv();Yv();Qv();Vq();ot();oL();sL();hI();Ws();HJ();La();ot();cL();aL();hL();Np();pL();mL();LS();DS();dL();vS();FJ();_L();wL();xS();zJ();Dp();XL();zS();FS();tI();uI();sI();cI();oI();WS();gI();qL();OS();jL();vL();IL();VL();OL();FL();$J();$L();ot()});var Nt,Wae,UJ,BJ,AI,bI,_I,kI,wI,TI,EI=l(()=>{"use strict";Nt=require("node:crypto"),Wae=Buffer.from("302a300506032b6570032100","hex"),UJ=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},BJ=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Nt.createPublicKey)({key:Buffer.concat([Wae,t]),format:"der",type:"spki"})},AI=()=>{let{publicKey:e,privateKey:t}=(0,Nt.generateKeyPairSync)("ed25519");return{publicKeyRaw:UJ(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},bI=e=>(0,Nt.createPrivateKey)(e),_I=(e,t)=>(0,Nt.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),kI=(e,t,r)=>{try{let o=BJ(e);return(0,Nt.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},wI=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,TI=()=>(0,Nt.randomBytes)(32).toString("base64url")});var ho,VS,GJ,Oae,Mae,KS,RI,CI,VJ=l(()=>{"use strict";ho=m(require("node:fs")),VS=m(require("node:path"));EI();G();Ie();GJ=e=>VS.default.join(e.installDir,Eo),Oae=(e,t)=>{if(e.profileEmail===null||t===GJ(e)||ho.default.existsSync(t))return;let r=GJ(e);ho.default.existsSync(r)&&(ho.default.mkdirSync(VS.default.dirname(t),{recursive:!0}),ho.default.renameSync(r,t))},Mae=e=>{if(!ho.default.existsSync(e))return null;try{let t=ho.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},KS=e=>{let t=pl(e);Oae(e,t);let r=Mae(t);if(r!==null)return r;let o=AI();return ho.default.mkdirSync(VS.default.dirname(t),{recursive:!0}),ho.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},RI=e=>{let t=KS(e.layout),r=TI(),o=wI({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=bI(t.privateKeyPem),s=_I(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},CI=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return kI(e.serverPublicKey,t,e.serverAttestation)}});var vI=l(()=>{"use strict";VJ();EI()});var KJ,qJ,JJ=l(()=>{"use strict";KJ=m(require("node:path")),qJ=e=>({osUid:typeof e.uid=="number"&&Number.isInteger(e.uid)&&e.uid>=0?e.uid:null,installRootName:KJ.default.basename(e.installDir)})});var QJ,Vp,xI,WI,YJ,jae,LI,qS,be,e4,Nae,II,Dae,Hae,OI,Ae,Ne,ft,Fae,XJ,ZJ,Kp,qp,t4=l(()=>{"use strict";QJ=m(require("node:http")),Vp=m(require("node:fs")),xI=m(require("node:path"));_n();JS();id();L$();x$();D$();Nn();FT();cE();pU();mU();yK();Yf();DC();EK();FK();$K();gS();tq();pq();Ho();Yt();It();uq();gq();zk();Iw();Uk();hq();Aq();hv();hr();xq();PI();ee();vI();JJ();WI=e=>CT(e)??"never",YJ=48e3,jae=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,LI=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??nf(),reveal:t.reveal,installed:_r(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),qS=async e=>{let t=H();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:kr(t,e)},be=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),e4=200,Nae=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',II=e=>{let t=e.trim().slice(0,e4),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},Dae=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${be(t)}</div>`,Hae=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${be(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',OI={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},Ae=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...OI}),e.end(JSON.stringify(r))},Ne=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},ft=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},Fae=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=Nae(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${be(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=mv(e.status.wsConnected)?`<div class="actions">
        <form method="POST" action="/api/revive">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`:"";return`<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Connection and pairing details for Agent Witch on this Mac.</p>
      ${n}
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${t}</span></div>
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${ad(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${be(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${be(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${be(WI(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${be(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},XJ=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},ZJ=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,e4)},Kp=e=>{let t=xI.default.join(e.layout.installDir,"link-code.txt"),r=()=>Fe(e.layout.installDir),o=()=>{let y=r();return{installBundleVersion:yS(y),installBundleUpdatedAt:y?.updatedAt??null,installVersion:y}},n=async y=>{let S=y.installVersion??r(),u=await i(),A=fE(u),T=y.updateFlash??null,P=yE(T),b=Dae(T,y.updateError??null);return mE({title:y.title,activePath:y.activePath,body:y.body,cloudAppOrigin:ar(S),installBundleVersionLabel:yS(S),prependBody:`${P}${b}${A}`,headerUpdateButtonHtml:gE(u)})},s=null,i=async()=>{let y=Date.now();if(s!==null&&y-s.cachedAtMs<6e4)return s.offer;let S=await uv(e.layout);return s={cachedAtMs:y,offer:S},S},a=()=>{s=null},c=!1,d=async y=>{if(a(),!(await i()).updateAvailable){y.writeHead(303,{Location:"/?update=ok"}),y.end();return}if(c){y.writeHead(303,{Location:II("An update is already running.")}),y.end();return}c=!0;try{let u=await yv(),A=u.ok?"/?update=ok":II(u.message);y.writeHead(303,{Location:A}),y.end()}catch(u){let A=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";y.writeHead(303,{Location:II(A)}),y.end()}finally{c=!1,a()}},p=async(y,S)=>{let u=S==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",A=o(),T=await n({title:S,activePath:S==="Project not found"?"/projects":"/",installVersion:A.installVersion,body:`<section class="card">
      <h1>${be(S)}</h1>
      <p>${be(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});y.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),y.end(T)},g=()=>{if(Vp.default.existsSync(t))return Vp.default.readFileSync(t,"utf8").trim();let y=Math.random().toString(36).slice(2,8).toUpperCase();return Vp.default.writeFileSync(t,y,"utf8"),y},f=QJ.default.createServer((y,S)=>{(async()=>{let u=y.url?.split("?")[0]??"/",A=y.method??"GET";if(A==="OPTIONS"){S.writeHead(204,OI),S.end();return}if(await WC({method:A,pathname:u,request:y,response:S,requestUrl:y.url??"/",storePath:TK(xI.default.dirname(e.layout.configPath)),readBody:ft,sendHtml:Ne,renderShell:n})||await ww({method:A,pathname:u,request:y,response:S,layout:e.layout,readBody:ft,sendJson:Ae})||await rS({method:A,pathname:u,request:y,response:S,layout:e.layout,readBody:ft,sendJson:Ae}))return;if(A==="GET"&&u==="/health"){let P=e.controllers.getStatus(),b=o();Ae(S,200,{ok:!0,...P,installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt,...qJ({uid:process.getuid?.(),installDir:e.layout.installDir})});return}if(A==="GET"&&u==="/api/status"){let P=o();Ae(S,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:P.installBundleVersion,installBundleUpdatedAt:P.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/traffic"){Ae(S,200,{entries:nd(e.layout)});return}if(A==="DELETE"&&u==="/api/traffic"||A==="POST"&&u==="/api/traffic/clear"){if(IT(e.layout),A==="POST"){S.writeHead(303,{Location:"/traffic?cleared=1"}),S.end();return}Ae(S,200,{ok:!0});return}if(A==="GET"&&u==="/api/trace"){Ae(S,200,{entries:Ay(e.layout)});return}if(A==="DELETE"&&u==="/api/trace"||A==="POST"&&u==="/api/trace/clear"){if(OT(e.layout),A==="POST"){S.writeHead(303,{Location:"/status"}),S.end();return}Ae(S,200,{ok:!0});return}if(A==="POST"&&u==="/api/errors/clear"){MT(e.layout.errorLogPath),S.writeHead(303,{Location:"/errors?cleared=1"}),S.end();return}if(A==="GET"&&u==="/api/knowledge"){let b=new URL(y.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(b.length>0){let k=await Ji({layout:e.layout,query:b,limit:20});Ae(S,200,{chunks:k,query:b});return}Ae(S,200,{chunks:qi(e.layout).slice(-50).reverse()});return}if(A==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),S.writeHead(303,{Location:"/status?revived=1"}),S.end();return}if(A==="GET"&&u==="/api/update-status"){let P=await i();Ae(S,200,{ok:!0,...P});return}if((A==="GET"||A==="POST")&&u==="/api/update"){await d(S);return}if(A==="GET"&&u==="/"){let P=e.controllers.getStatus(),b=o(),k=_r(e.layout),E=by(e.layout.errorLogPath);Ne(S,await n({title:"Home",activePath:"/",installVersion:b.installVersion,updateFlash:XJ(y.url??void 0),updateError:ZJ(y.url??void 0),body:hE({wsConnected:P.wsConnected,lastHeartbeatAt:P.lastHeartbeatAt,installBundleVersion:b.installBundleVersion,harnessSetCount:k.sets.length,knowledgeChunkCount:qi(e.layout).length,trafficEntryCount:nd(e.layout).length,wakeError:P.wakeError,errorLogByteSize:E.byteSize,errorLogExists:E.exists})}));return}if(A==="GET"&&u==="/task"){let P=e.controllers.getStatus(),b=o(),k=H(),E=new URL(y.url??"/",`http://127.0.0.1:${43347}`),w=E.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,x=E.searchParams.get("failed")==="1"?E.searchParams.get("error")?.trim()??"Task failed.":null,I=E.searchParams.get("runId");Ne(S,await n({title:"Task",activePath:"/task",installVersion:b.installVersion,body:HC({defaultWorkspace:k?.workspace??"",wsConnected:P.wsConnected,flashMessage:w,flashError:x,lastRunId:I})}));return}if(A==="POST"&&u==="/task/dispatch"){let P=await ft(y),b=new URLSearchParams(P),k=b.get("prompt")?.trim()??"",E=b.get("writerAgent")?.trim()??"claude-cli",w=b.get("projectFolder")?.trim()??"",x=await Pv({prompt:k,writerAgent:E,...w.length>0?{projectFolderPath:w}:{}}),I=new URLSearchParams;x.ok?I.set("ok","1"):(I.set("failed","1"),x.errorMessage!==void 0&&I.set("error",x.errorMessage.slice(0,240))),x.agentRunId!==void 0&&I.set("runId",x.agentRunId),S.writeHead(303,{Location:`/task?${I.toString()}`}),S.end();return}if(A==="GET"&&u==="/writer-sessions"){let P=o(),b=dS(e.layout,12);Ne(S,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:P.installVersion,updateFlash:XJ(y.url??void 0),updateError:ZJ(y.url??void 0),body:VC({sessions:b})}));return}if(A==="GET"&&u==="/errors"){let P=o(),b=by(e.layout.errorLogPath);Ne(S,await n({title:"Errors",activePath:"/errors",installVersion:P.installVersion,body:NT({errorLogPath:e.layout.errorLogPath,content:b.content,exists:b.exists,truncated:b.truncated,byteSize:b.byteSize,cleared:new URL(y.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(A==="GET"&&u==="/status"){let P=new URL(y.url??"/",`http://127.0.0.1:${43347}`),b=e.controllers.getStatus(),k=ve(e.layout),E=k!==null?$e(k,12e4):zT(b.lastHeartbeatAt,12e4),w=$T({lastHeartbeatAt:b.lastHeartbeatAt,heartbeatIsStale:E}),x=o();Ne(S,await n({title:"Status",activePath:"/status",installVersion:x.installVersion,body:`${Fae({status:b,healthBadge:w,revived:P.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:x.installBundleVersion,installBundleUpdatedAt:x.installBundleUpdatedAt})}${GT({installDir:e.layout.installDir})}${BT({entries:Ay(e.layout)})}`}));return}if(A==="GET"&&u==="/traffic"){let P=new URL(y.url??"/",`http://127.0.0.1:${43347}`),b=nd(e.layout),k=o(),E=b.map(I=>`<tr><td title="${be(I.at)}">${be(WI(I.at))}</td><td>${be(I.direction)}</td><td><code>${be(I.type)}</code></td><td>${be(I.summary)}</td><td>${be(I.action??"")}</td></tr>`).join(""),w=b.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${E}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',x=P.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Ne(S,await n({title:"Traffic",activePath:"/traffic",installVersion:k.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${x}
              ${w}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(A==="GET"&&u==="/projects"){let P=new URL(y.url??"/",`http://127.0.0.1:${43347}`),b=o(),k=ar(b.installVersion),E=await qS(e.layout),w=P.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":P.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,x=P.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,I=H(),j=I===null?null:V({wsUrl:I.wsUrl,pairingToken:I.pairingToken}),O=j===null?{}:Object.fromEntries((await Promise.all(E.projects.map(async $=>{let B=await cv(j,$.id);return[$.id,B?.counts??null]}))).filter($=>$[1]!==null));Ne(S,await n({title:"Projects",activePath:"/projects",installVersion:b.installVersion,body:dv({projects:E.projects,compositionCountsByProjectId:O,cloudAppOrigin:k,syncMessage:E.message,syncOk:E.ok,flashMessage:x,flashError:w})}));return}if(A==="GET"&&u==="/projects/select-folder"){let b=new URL(y.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",k=H(),E=k===null?null:V({wsUrl:k.wsUrl,pairingToken:k.pairingToken}),w=b.length>0&&E!==null?Bo():null;if(w===null||E===null){S.writeHead(303,{Location:"/projects"}),S.end();return}if(st({projectFolderPath:w}),!await Ic(E,b,w)){S.writeHead(303,{Location:"/projects?folderError=1"}),S.end();return}S.writeHead(303,{Location:`/project?id=${encodeURIComponent(b)}&folderUpdated=1`}),S.end();return}if(A==="POST"&&u==="/projects/delete"){let P=await ft(y),b=new URLSearchParams(P).get("projectId")?.trim()??"",k=H(),E=k===null?null:V({wsUrl:k.wsUrl,pairingToken:k.pairingToken});if(E===null||b.length===0){S.writeHead(303,{Location:"/projects?deleteError=1"}),S.end();return}let w=await Zk(E,b);S.writeHead(303,{Location:w.ok?"/projects?deleted=1":"/projects?deleteError=1"}),S.end();return}if(A==="GET"&&u==="/project"){let P=new URL(y.url??"/",`http://127.0.0.1:${43347}`),b=P.searchParams.get("id")?.trim()??"",k=o(),E=ar(k.installVersion),w=await qS(e.layout),x=qt(w.projects,b);if(x===null){await p(S,"Project not found");return}let I=P.searchParams.get("linked")==="1"?P.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${P.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${P.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:P.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,j=P.searchParams.get("knowledgePromoted"),O=j!==null?`Marked ${j} lesson(s) as promoted in Agent Witch.`:null,$=P.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,B=P.searchParams.get("tab")?.trim()??"harness",Ce=B==="workflows"||B==="agents"||B==="knowledge"||B==="pitfalls"?B:"harness",F=P.searchParams.get("retired")==="1",nt=P.searchParams.get("edit")?.trim()||null,wo=yq(P.searchParams.get("pitfall")),To=H(),dr=To===null?null:V({wsUrl:To.wsUrl,pairingToken:To.pairingToken}),DP=dr===null?null:await cv(dr,x.id),Ja=0;if(dr!==null)try{let Tu=await fetch(`${dr.appOrigin}/api/agent-witch/projects/${encodeURIComponent(x.id)}/knowledge`,{method:"GET",headers:{[ae]:dr.pairingToken},signal:AbortSignal.timeout(1e4)});if(Tu.ok){let Gs=await Tu.json();typeof Gs=="object"&&Gs!==null&&typeof Gs.candidateCount=="number"&&(Ja=Gs.candidateCount)}}catch{Ja=0}let HP=Ce!=="pitfalls"?void 0:await wD({store:Xf({layout:e.layout,cloud:dr===null?null:Lc(dr)}),projectId:x.id,includeRetired:F});Ne(S,await n({title:x.name,activePath:"/projects",installVersion:k.installVersion,body:$o({project:x,cloudAppOrigin:E,installed:_r(e.layout),linkedSetSlugs:Ar(x.projectFolderPath),composition:DP,knowledgeCandidateCount:Ja,pitfalls:HP,pitfallsShowRetired:F,pitfallsEditId:nt,activeTab:Ce,flashMessage:I??O??wo?.message??null,flashError:$??wo?.error??null})}));return}if(A==="POST"&&u==="/projects/pull-bound-harness"){let P=await ft(y),b=await Hk({rawBody:P,layout:e.layout});if(b.kind==="not_found"){await p(S,"Project not found");return}if(b.kind==="redirect"){S.writeHead(303,{Location:b.location}),S.end();return}let k=o();Ne(S,await n({title:b.title,activePath:"/projects",installVersion:k.installVersion,body:b.body}));return}if(A==="POST"&&u==="/projects/link-harness"){let P=await ft(y),b=new URLSearchParams(P),k=b.get("projectId")?.trim()??"",E=await qS(e.layout),w=qt(E.projects,k);if(w===null){await p(S,"Project not found");return}let x=b.getAll("applySet").map(Ce=>String(Ce)),I=hc({layout:e.layout,projectFolderPath:w.projectFolderPath,setSlugs:x});if(!I.ok){let Ce=o(),F=ar(Ce.installVersion);Ne(S,await n({title:w.name,activePath:"/projects",installVersion:Ce.installVersion,body:$o({project:w,cloudAppOrigin:F,installed:_r(e.layout),linkedSetSlugs:Ar(w.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:I.errorMessage})}));return}let j=H(),O=j===null?null:V({wsUrl:j.wsUrl,pairingToken:j.pairingToken}),$=O===null?!1:await Kn(O,w.id,I.appliedSetSlugs),B=new URLSearchParams({linked:"1",files:String(I.writtenFileCount),bindingsSynced:$?"1":"0"});S.writeHead(303,{Location:`/project?id=${encodeURIComponent(w.id)}&${B.toString()}`}),S.end();return}if(A==="POST"&&u==="/projects/remove-harness-set"){let P=await ft(y),b=await Fk({rawBody:P,layout:e.layout});if(b.kind==="not_found"){await p(S,"Project not found");return}if(b.kind==="redirect"){S.writeHead(303,{Location:b.location}),S.end();return}let k=o();Ne(S,await n({title:b.title,activePath:"/projects",installVersion:k.installVersion,body:b.body}));return}if(A==="POST"&&u==="/project/knowledge/promote-all"){let P=await ft(y),k=new URLSearchParams(P).get("projectId")?.trim()??"",E=await qS(e.layout),w=qt(E.projects,k);if(w===null){await p(S,"Project not found");return}let x=H(),I=x===null?null:V({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),j=I===null?{ok:!1,promotedCount:0}:await mq(I,w.id),O=new URLSearchParams({tab:"knowledge",...j.ok?{knowledgePromoted:String(j.promotedCount)}:{knowledgePromoteFailed:"1"}});S.writeHead(303,{Location:`/project?id=${encodeURIComponent(w.id)}&${O.toString()}`}),S.end();return}let T=bf(u);if(A==="POST"&&T!==null){let P=await ft(y),b=await Bk({rawBody:P,action:T,layout:e.layout,createStore:k=>Xf({layout:e.layout,cloud:Lc(k)})});if(b.kind==="not_found"){await p(S,"Project not found");return}S.writeHead(303,{Location:b.location}),S.end();return}if(A==="GET"&&u==="/harness"){let P=new URL(y.url??"/",`http://127.0.0.1:${43347}`),b=o(),k=bc(e.layout),E=P.searchParams.get("submitted")==="1",w=E?P.searchParams.get("syncFailed")==="1"?`Local harness updated (${P.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:P.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${P.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":P.searchParams.get("stopped")==="1"?`Reveal stopped. ${k?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:P.searchParams.get("revealed")==="1"?`Reveal found ${k?.sets.length??0} set(s).`:null,x=k?.scanRoots[0]??nf(),I=jae(e.layout,{reveal:k,importQuery:P.searchParams.get("import")==="1",justSubmitted:E}),j=ar(b.installVersion);Ne(S,await n({title:"Harness",activePath:"/harness",installVersion:b.installVersion,body:Tp(LI(e.layout,{cloudAppOrigin:j,reveal:k,scanFolder:x,flashMessage:w,importSectionExpanded:I}))}));return}if(A==="POST"&&u==="/api/harness/pick-folder"){let P=Bo();if(P===null){Ae(S,200,{cancelled:!0});return}Ae(S,200,{path:P});return}if(A==="GET"&&u==="/api/harness/file-content"){let b=new URL(y.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",k=yc(b);if(k===null){Ae(S,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let E=Vp.default.readFileSync(k,"utf8"),w=E.length>YJ?`${E.slice(0,YJ)}
\u2026 (truncated)`:E;Ae(S,200,{content:w})}catch{Ae(S,500,{errorMessage:"Could not read file."})}return}if(A==="POST"&&u==="/api/harness/reveal/add-project"){let P=await ft(y),b="";try{let w=JSON.parse(P);typeof w=="object"&&w!==null&&typeof w.projectPath=="string"&&(b=w.projectPath.trim())}catch{Ae(S,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(b.length===0){Ae(S,400,{ok:!1,errorMessage:"projectPath is required."});return}let k=bc(e.layout),E=ok({reveal:k,projectPath:b});if(E===null||E.sets.length===0){Ae(S,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}cf(e.layout,E),Ae(S,200,{ok:!0,setCount:E.sets.length});return}if(A==="GET"&&u==="/api/harness/reveal/stream"){let b=new URL(y.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(b.length===0){Ae(S,400,{errorMessage:"Choose a folder to scan first."});return}let k=!1;y.on("close",()=>{k=!0}),S.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...OI});let E=nk({scanRoot:b,response:S,shouldAbort:()=>k});cf(e.layout,E),S.end();return}if(A==="POST"&&u==="/harness/reveal"){S.writeHead(410,{"Content-Type":"text/plain"}),S.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(A==="POST"&&u==="/harness/submit"){let P=bc(e.layout);if(P===null){let j=o(),O=ar(j.installVersion);Ne(S,await n({title:"Harness",activePath:"/harness",installVersion:j.installVersion,body:Tp(LI(e.layout,{cloudAppOrigin:O,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let b=await ft(y),k=new URLSearchParams(b),E=lv(k,P),w=ik({layout:e.layout,sets:E});if(!w.ok){let j=o(),O=ar(j.installVersion);Ne(S,await n({title:"Harness",activePath:"/harness",installVersion:j.installVersion,body:Tp(LI(e.layout,{cloudAppOrigin:O,reveal:P,flashError:w.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}lk(e.layout);let I=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";S.writeHead(303,{Location:`/harness?submitted=1&count=${w.writtenItemCount??0}${I}`}),S.end();return}if(A==="GET"&&u==="/writer-api"){let P=new URL(y.url??"/",`http://127.0.0.1:${43347}`),k=H()?.writerExecutionBackend??Xe(void 0),E=Be(e.layout.configPath),w=Wo(E),x=P.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,I=o();Ne(S,await n({title:"Writer API",activePath:"/writer-api",installVersion:I.installVersion,body:iv({writerExecutionBackend:k,secrets:w,flashMessage:x})}));return}if(A==="POST"&&u==="/writer-api"){let P=await ft(y),b=new URLSearchParams(P),k=b.get("writerExecutionBackend")?.trim()??"cli";m_({configPath:e.layout.configPath,writerExecutionBackend:Xe(k),anthropicApiKey:b.get("anthropicApiKey")??void 0,anthropicModel:b.get("anthropicModel")??void 0,openaiApiKey:b.get("openaiApiKey")??void 0,openaiModel:b.get("openaiModel")??void 0,googleApiKey:b.get("googleApiKey")??void 0,googleModel:b.get("googleModel")??void 0}),S.writeHead(303,{Location:"/writer-api?saved=1"}),S.end();return}if(A==="GET"&&u==="/estimates"){S.writeHead(302,{Location:"/history"}),S.end();return}if(A==="GET"&&u==="/history"){let P=o();Ne(S,await n({title:"History",activePath:"/history",installVersion:P.installVersion,body:GC({reportsDir:e.layout.reportsDir})}));return}if(A==="GET"&&u==="/knowledge"){let b=new URL(y.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",k=o(),E=XT({layout:e.layout}),w=eE(E),x=b.length>0?await Ji({layout:e.layout,query:b,limit:20}):qi(e.layout).slice(-50).reverse(),I=x.map(O=>{let $=QT(E,O.id),B=$>0?` \xB7 used in ${$} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${be(O.createdAt)}">${be(WI(O.createdAt))}${O.source?` \xB7 ${be(O.source)}`:""}${B}</div><pre>${be(O.text)}</pre></article>`}).join(""),j=w.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${w.map(O=>`<li><strong>P${O.priority}</strong> \u2014 ${be(O.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Ne(S,await n({title:"Knowledge",activePath:"/knowledge",installVersion:k.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${be(b)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${Hae(b,x.length)}
            </section>${j}${I}`}));return}A==="POST"&&await ft(y),await p(S,"Not found")})().catch(u=>{console.error("[agent-witch-local-app]",u),S.writeHead(500),S.end("Internal error")})});f.on("error",y=>{if(y.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",y)});let h=SI();return f.on("close",()=>{h.stop()}),f.listen(43347,"127.0.0.1",()=>{try{Jf()}catch(y){let S=y instanceof Error?y.message:String(y);console.error(`[agent-witch] writeGlobalTriggers failed: ${S}`)}console.log(`[agent-witch] Local app ${Ur}`)}),f},qp=e=>KS(e).publicKeyRaw});var JS=l(()=>{"use strict";g$();f$();t4()});var o4={};Rt(o4,{runAgentWitchExternalLiveCli:()=>$ae});var MI,r4,zae,$ae,n4=l(()=>{"use strict";MI=m(require("node:fs")),r4=m(require("node:path"));Nn();G();ie();JS();ie();zae=e=>{let t=r4.default.join(e,"link-code.txt");if(!MI.default.existsSync(t))return null;let r=MI.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},$ae=()=>{ht("agent-witch-live");let e=C(),t=M(),r=zae(e),o=qp(t);Kp({layout:t,controllers:{getStatus:()=>{let n=ve(t);return{wsConnected:Vl(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{Tn(e)}}})}});var So=R((r7e,a4)=>{"use strict";var s4=["nodebuffer","arraybuffer","fragments"],i4=typeof Blob<"u";i4&&s4.push("blob");a4.exports={BINARY_TYPES:s4,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:i4,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Jp=R((o7e,YS)=>{"use strict";var{EMPTY_BUFFER:Uae}=So(),jI=Buffer[Symbol.species];function Bae(e,t){if(e.length===0)return Uae;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new jI(r.buffer,r.byteOffset,o):r}function l4(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function c4(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function Gae(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function NI(e){if(NI.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new jI(e):ArrayBuffer.isView(e)?t=new jI(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),NI.readOnly=!1),t}YS.exports={concat:Bae,mask:l4,toArrayBuffer:Gae,toBuffer:NI,unmask:c4};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");YS.exports.mask=function(t,r,o,n,s){s<48?l4(t,r,o,n,s):e.mask(t,r,o,n,s)},YS.exports.unmask=function(t,r){t.length<32?c4(t,r):e.unmask(t,r)}}catch{}});var u4=R((n7e,p4)=>{"use strict";var d4=Symbol("kDone"),DI=Symbol("kRun"),HI=class{constructor(t){this[d4]=()=>{this.pending--,this[DI]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[DI]()}[DI](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[d4])}}};p4.exports=HI});var Ma=R((s7e,y4)=>{"use strict";var Yp=require("zlib"),m4=Jp(),Vae=u4(),{kStatusCode:g4}=So(),Kae=Buffer[Symbol.species],qae=Buffer.from([0,0,255,255]),ZS=Symbol("permessage-deflate"),Po=Symbol("total-length"),Wa=Symbol("callback"),cn=Symbol("buffers"),Oa=Symbol("error"),XS,FI=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!XS){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;XS=new Vae(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Wa];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){XS.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){XS.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Yp.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Yp.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[ZS]=this,this._inflate[Po]=0,this._inflate[cn]=[],this._inflate.on("error",Yae),this._inflate.on("data",f4)}this._inflate[Wa]=o,this._inflate.write(t),r&&this._inflate.write(qae),this._inflate.flush(()=>{let s=this._inflate[Oa];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=m4.concat(this._inflate[cn],this._inflate[Po]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Po]=0,this._inflate[cn]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Yp.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Yp.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Po]=0,this._deflate[cn]=[],this._deflate.on("data",Jae)}this._deflate[Wa]=o,this._deflate.write(t),this._deflate.flush(Yp.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=m4.concat(this._deflate[cn],this._deflate[Po]);r&&(s=new Kae(s.buffer,s.byteOffset,s.length-4)),this._deflate[Wa]=null,this._deflate[Po]=0,this._deflate[cn]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};y4.exports=FI;function Jae(e){this[cn].push(e),this[Po]+=e.length}function f4(e){if(this[Po]+=e.length,this[ZS]._maxPayload<1||this[Po]<=this[ZS]._maxPayload){this[cn].push(e);return}this[Oa]=new RangeError("Max payload size exceeded"),this[Oa].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Oa][g4]=1009,this.removeListener("data",f4),this.reset()}function Yae(e){if(this[ZS]._inflate=null,this[Oa]){this[Wa](this[Oa]);return}e[g4]=1007,this[Wa](e)}});var ja=R((i7e,QS)=>{"use strict";var{isUtf8:h4}=require("buffer"),{hasBlob:Xae}=So(),Zae=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function Qae(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function zI(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function ele(e){return Xae&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}QS.exports={isBlob:ele,isValidStatusCode:Qae,isValidUTF8:zI,tokenChars:Zae};if(h4)QS.exports.isValidUTF8=function(e){return e.length<24?zI(e):h4(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");QS.exports.isValidUTF8=function(t){return t.length<32?zI(t):e(t)}}catch{}});var VI=R((a7e,w4)=>{"use strict";var{Writable:tle}=require("stream"),S4=Ma(),{BINARY_TYPES:rle,EMPTY_BUFFER:P4,kStatusCode:ole,kWebSocket:nle}=So(),{concat:$I,toArrayBuffer:sle,unmask:ile}=Jp(),{isValidStatusCode:ale,isValidUTF8:A4}=ja(),eP=Buffer[Symbol.species],Dt=0,b4=1,_4=2,k4=3,UI=4,BI=5,tP=6,GI=class extends tle{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||rle[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[nle]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Dt}_write(t,r,o){if(this._opcode===8&&this._state==Dt)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new eP(o.buffer,o.byteOffset+t,o.length-t),new eP(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new eP(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case Dt:this.getInfo(t);break;case b4:this.getPayloadLength16(t);break;case _4:this.getPayloadLength64(t);break;case k4:this.getMask();break;case UI:this.getData(t);break;case BI:case tP:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[S4.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=b4:this._payloadLength===127?this._state=_4:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=k4:this._state=UI}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=UI}getData(t){let r=P4;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&ile(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=BI,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[S4.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===Dt&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=Dt;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=$I(o,r):this._binaryType==="arraybuffer"?n=sle($I(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=Dt):(this._state=tP,setImmediate(()=>{this.emit("message",n,!0),this._state=Dt,this.startLoop(t)}))}else{let n=$I(o,r);if(!this._skipUTF8Validation&&!A4(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===BI||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=Dt):(this._state=tP,setImmediate(()=>{this.emit("message",n,!1),this._state=Dt,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,P4),this.end();else{let o=t.readUInt16BE(0);if(!ale(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new eP(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!A4(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=Dt;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=Dt):(this._state=tP,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=Dt,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[ole]=n,i}};w4.exports=GI});var JI=R((c7e,R4)=>{"use strict";var{Duplex:l7e}=require("stream"),{randomFillSync:lle}=require("crypto"),{types:{isUint8Array:cle}}=require("util"),T4=Ma(),{EMPTY_BUFFER:dle,kWebSocket:ple,NOOP:ule}=So(),{isBlob:Na,isValidStatusCode:mle}=ja(),{mask:E4,toBuffer:js}=Jp(),Ht=Symbol("kByteLength"),gle=Buffer.alloc(4),rP=8*1024,Ns,Da=rP,cr=0,fle=1,yle=2,KI=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=cr,this.onerror=ule,this[ple]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||gle,r.generateMask?r.generateMask(o):(Da===rP&&(Ns===void 0&&(Ns=Buffer.alloc(rP)),lle(Ns,0,rP),Da=0),o[0]=Ns[Da++],o[1]=Ns[Da++],o[2]=Ns[Da++],o[3]=Ns[Da++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[Ht]!==void 0?a=r[Ht]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(E4(t,o,d,s,a),[d]):(E4(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=dle;else{if(typeof t!="number"||!mle(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(cle(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[Ht]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==cr?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Na(t)?(n=t.size,s=!1):(t=js(t),n=t.length,s=js.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Ht]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Na(t)?this._state!==cr?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==cr?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Na(t)?(n=t.size,s=!1):(t=js(t),n=t.length,s=js.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Ht]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Na(t)?this._state!==cr?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==cr?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[T4.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Na(t)?(a=t.size,c=!1):(t=js(t),a=t.length,c=js.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[Ht]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Na(t)?this._state!==cr?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==cr?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[Ht],this._state=yle,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(qI,this,a,n);return}this._bufferedBytes-=o[Ht];let i=js(s);r?this.dispatch(i,r,o,n):(this._state=cr,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(hle,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[T4.extensionName];this._bufferedBytes+=o[Ht],this._state=fle,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");qI(this,c,n);return}this._bufferedBytes-=o[Ht],this._state=cr,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===cr&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][Ht],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][Ht],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};R4.exports=KI;function qI(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function hle(e,t,r){qI(e,t,r),e.onerror(t)}});var j4=R((d7e,M4)=>{"use strict";var{kForOnEventAttribute:Xp,kListener:YI}=So(),C4=Symbol("kCode"),v4=Symbol("kData"),L4=Symbol("kError"),I4=Symbol("kMessage"),x4=Symbol("kReason"),Ha=Symbol("kTarget"),W4=Symbol("kType"),O4=Symbol("kWasClean"),Ao=class{constructor(t){this[Ha]=null,this[W4]=t}get target(){return this[Ha]}get type(){return this[W4]}};Object.defineProperty(Ao.prototype,"target",{enumerable:!0});Object.defineProperty(Ao.prototype,"type",{enumerable:!0});var Ds=class extends Ao{constructor(t,r={}){super(t),this[C4]=r.code===void 0?0:r.code,this[x4]=r.reason===void 0?"":r.reason,this[O4]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[C4]}get reason(){return this[x4]}get wasClean(){return this[O4]}};Object.defineProperty(Ds.prototype,"code",{enumerable:!0});Object.defineProperty(Ds.prototype,"reason",{enumerable:!0});Object.defineProperty(Ds.prototype,"wasClean",{enumerable:!0});var Fa=class extends Ao{constructor(t,r={}){super(t),this[L4]=r.error===void 0?null:r.error,this[I4]=r.message===void 0?"":r.message}get error(){return this[L4]}get message(){return this[I4]}};Object.defineProperty(Fa.prototype,"error",{enumerable:!0});Object.defineProperty(Fa.prototype,"message",{enumerable:!0});var Zp=class extends Ao{constructor(t,r={}){super(t),this[v4]=r.data===void 0?null:r.data}get data(){return this[v4]}};Object.defineProperty(Zp.prototype,"data",{enumerable:!0});var Sle={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[Xp]&&n[YI]===t&&!n[Xp])return;let o;if(e==="message")o=function(s,i){let a=new Zp("message",{data:i?s:s.toString()});a[Ha]=this,oP(t,this,a)};else if(e==="close")o=function(s,i){let a=new Ds("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Ha]=this,oP(t,this,a)};else if(e==="error")o=function(s){let i=new Fa("error",{error:s,message:s.message});i[Ha]=this,oP(t,this,i)};else if(e==="open")o=function(){let s=new Ao("open");s[Ha]=this,oP(t,this,s)};else return;o[Xp]=!!r[Xp],o[YI]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[YI]===t&&!r[Xp]){this.removeListener(e,r);break}}};M4.exports={CloseEvent:Ds,ErrorEvent:Fa,Event:Ao,EventTarget:Sle,MessageEvent:Zp};function oP(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var nP=R((p7e,N4)=>{"use strict";var{tokenChars:Qp}=ja();function Nr(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function Ple(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(p===-1&&Qp[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);d===44?(Nr(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(p===-1&&Qp[d]===1)c===-1&&(c=g);else if(d===32||d===9)p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g),Nr(r,e.slice(c,p),!0),d===44&&(Nr(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,g),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(n){if(Qp[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:o||(o=!0),n=!1}else if(s)if(Qp[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,p=g;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(p===-1&&Qp[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))p===-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);o&&(h=h.replace(/\\/g,""),o=!1),Nr(r,a,h),d===44&&(Nr(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=g);let f=e.slice(c,p);return i===void 0?Nr(t,f,r):(a===void 0?Nr(r,f,!0):o?Nr(r,a,f.replace(/\\/g,"")):Nr(r,a,f),Nr(t,i,r)),t}function Ale(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}N4.exports={format:Ale,parse:Ple}});var lP=R((g7e,J4)=>{"use strict";var ble=require("events"),_le=require("https"),kle=require("http"),F4=require("net"),wle=require("tls"),{randomBytes:Tle,createHash:Ele}=require("crypto"),{Duplex:u7e,Readable:m7e}=require("stream"),{URL:XI}=require("url"),dn=Ma(),Rle=VI(),Cle=JI(),{isBlob:vle}=ja(),{BINARY_TYPES:D4,CLOSE_TIMEOUT:Lle,EMPTY_BUFFER:sP,GUID:Ile,kForOnEventAttribute:ZI,kListener:xle,kStatusCode:Wle,kWebSocket:De,NOOP:z4}=So(),{EventTarget:{addEventListener:Ole,removeEventListener:Mle}}=j4(),{format:jle,parse:Nle}=nP(),{toBuffer:Dle}=Jp(),$4=Symbol("kAborted"),QI=[8,13],bo=["CONNECTING","OPEN","CLOSING","CLOSED"],Hle=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,se=class e extends ble{constructor(t,r,o){super(),this._binaryType=D4[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=sP,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),U4(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){D4.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new Rle({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new Cle(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[De]=this,s[De]=this,t[De]=this,n.on("conclude",$le),n.on("drain",Ule),n.on("error",Ble),n.on("message",Gle),n.on("ping",Vle),n.on("pong",Kle),s.onerror=qle,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",V4),t.on("data",aP),t.on("end",K4),t.on("error",q4),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[dn.extensionName]&&this._extensions[dn.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Et(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,G4(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){ex(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||sP,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){ex(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||sP,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){ex(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[dn.extensionName]||(n.compress=!1),this._sender.send(t||sP,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Et(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(se,"CONNECTING",{enumerable:!0,value:bo.indexOf("CONNECTING")});Object.defineProperty(se.prototype,"CONNECTING",{enumerable:!0,value:bo.indexOf("CONNECTING")});Object.defineProperty(se,"OPEN",{enumerable:!0,value:bo.indexOf("OPEN")});Object.defineProperty(se.prototype,"OPEN",{enumerable:!0,value:bo.indexOf("OPEN")});Object.defineProperty(se,"CLOSING",{enumerable:!0,value:bo.indexOf("CLOSING")});Object.defineProperty(se.prototype,"CLOSING",{enumerable:!0,value:bo.indexOf("CLOSING")});Object.defineProperty(se,"CLOSED",{enumerable:!0,value:bo.indexOf("CLOSED")});Object.defineProperty(se.prototype,"CLOSED",{enumerable:!0,value:bo.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(se.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(se.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[ZI])return t[xle];return null},set(t){for(let r of this.listeners(e))if(r[ZI]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[ZI]:!0})}})});se.prototype.addEventListener=Ole;se.prototype.removeEventListener=Mle;J4.exports=se;function U4(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:Lle,protocolVersion:QI[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!QI.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${QI.join(", ")})`);let s;if(t instanceof XI)s=t;else try{s=new XI(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let S=new SyntaxError(c);if(e._redirects===0)throw S;iP(e,S);return}let d=i?443:80,p=Tle(16).toString("base64"),g=i?_le.request:kle.request,f=new Set,h;if(n.createConnection=n.createConnection||(i?zle:Fle),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new dn({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=jle({[dn.extensionName]:h.offer()})),r.length){for(let S of r){if(typeof S!="string"||!Hle.test(S)||f.has(S))throw new SyntaxError("An invalid or duplicated subprotocol was specified");f.add(S)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let S=n.path.split(":");n.socketPath=S[0],n.path=S[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let S=o&&o.headers;if(o={...o,headers:{}},S)for(let[u,A]of Object.entries(S))o.headers[u.toLowerCase()]=A}else if(e.listenerCount("redirect")===0){let S=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!S||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,S||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=g(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=g(n);n.timeout&&y.on("timeout",()=>{Et(e,y,"Opening handshake has timed out")}),y.on("error",S=>{y===null||y[$4]||(y=e._req=null,iP(e,S))}),y.on("response",S=>{let u=S.headers.location,A=S.statusCode;if(u&&n.followRedirects&&A>=300&&A<400){if(++e._redirects>n.maxRedirects){Et(e,y,"Maximum redirects exceeded");return}y.abort();let T;try{T=new XI(u,t)}catch{let b=new SyntaxError(`Invalid URL: ${u}`);iP(e,b);return}U4(e,T,r,o)}else e.emit("unexpected-response",y,S)||Et(e,y,`Unexpected server response: ${S.statusCode}`)}),y.on("upgrade",(S,u,A)=>{if(e.emit("upgrade",S),e.readyState!==se.CONNECTING)return;y=e._req=null;let T=S.headers.upgrade;if(T===void 0||T.toLowerCase()!=="websocket"){Et(e,u,"Invalid Upgrade header");return}let P=Ele("sha1").update(p+Ile).digest("base64");if(S.headers["sec-websocket-accept"]!==P){Et(e,u,"Invalid Sec-WebSocket-Accept header");return}let b=S.headers["sec-websocket-protocol"],k;if(b!==void 0?f.size?f.has(b)||(k="Server sent an invalid subprotocol"):k="Server sent a subprotocol but none was requested":f.size&&(k="Server sent no subprotocol"),k){Et(e,u,k);return}b&&(e._protocol=b);let E=S.headers["sec-websocket-extensions"];if(E!==void 0){if(!h){Et(e,u,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let w;try{w=Nle(E)}catch{Et(e,u,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(w);if(x.length!==1||x[0]!==dn.extensionName){Et(e,u,"Server indicated an extension that was not requested");return}try{h.accept(w[dn.extensionName])}catch{Et(e,u,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[dn.extensionName]=h}e.setSocket(u,A,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function iP(e,t){e._readyState=se.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function Fle(e){return e.path=e.socketPath,F4.connect(e)}function zle(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=F4.isIP(e.host)?"":e.host),wle.connect(e)}function Et(e,t,r){e._readyState=se.CLOSING;let o=new Error(r);Error.captureStackTrace(o,Et),t.setHeader?(t[$4]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(iP,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function ex(e,t,r){if(t){let o=vle(t)?t.size:Dle(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${bo[e.readyState]})`);process.nextTick(r,o)}}function $le(e,t){let r=this[De];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[De]!==void 0&&(r._socket.removeListener("data",aP),process.nextTick(B4,r._socket),e===1005?r.close():r.close(e,t))}function Ule(){let e=this[De];e.isPaused||e._socket.resume()}function Ble(e){let t=this[De];t._socket[De]!==void 0&&(t._socket.removeListener("data",aP),process.nextTick(B4,t._socket),t.close(e[Wle])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function H4(){this[De].emitClose()}function Gle(e,t){this[De].emit("message",e,t)}function Vle(e){let t=this[De];t._autoPong&&t.pong(e,!this._isServer,z4),t.emit("ping",e)}function Kle(e){this[De].emit("pong",e)}function B4(e){e.resume()}function qle(e){let t=this[De];t.readyState!==se.CLOSED&&(t.readyState===se.OPEN&&(t._readyState=se.CLOSING,G4(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function G4(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function V4(){let e=this[De];if(this.removeListener("close",V4),this.removeListener("data",aP),this.removeListener("end",K4),e._readyState=se.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[De]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",H4),e._receiver.on("finish",H4))}function aP(e){this[De]._receiver.write(e)||this.pause()}function K4(){let e=this[De];e._readyState=se.CLOSING,e._receiver.end(),this.end()}function q4(){let e=this[De];this.removeListener("error",q4),this.on("error",z4),e&&(e._readyState=se.CLOSING,this.destroy())}});var Q4=R((y7e,Z4)=>{"use strict";var f7e=lP(),{Duplex:Jle}=require("stream");function Y4(e){e.emit("close")}function Yle(){!this.destroyed&&this._writableState.finished&&this.destroy()}function X4(e){this.removeListener("error",X4),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function Xle(e,t){let r=!0,o=new Jle({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(Y4,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(Y4,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",Yle),o.on("error",X4),o}Z4.exports=Xle});var tx=R((h7e,e8)=>{"use strict";var{tokenChars:Zle}=ja();function Qle(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&Zle[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}e8.exports={parse:Qle}});var a8=R((P7e,i8)=>{"use strict";var ece=require("events"),cP=require("http"),{Duplex:S7e}=require("stream"),{createHash:tce}=require("crypto"),t8=nP(),Hs=Ma(),rce=tx(),oce=lP(),{CLOSE_TIMEOUT:nce,GUID:sce,kWebSocket:ice}=So(),ace=/^[+/0-9A-Za-z]{22}==$/,r8=0,o8=1,s8=2,rx=class extends ece{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:nce,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:oce,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=cP.createServer((o,n)=>{let s=cP.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=lce(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=r8}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===s8){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(eu,this);return}if(t&&this.once("close",t),this._state!==o8)if(this._state=o8,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(eu,this):process.nextTick(eu,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{eu(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",n8);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Fs(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Fs(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!ace.test(s)){Fs(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Fs(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){tu(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=rce.parse(c)}catch{Fs(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&p!==void 0){let f=new Hs({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=t8.parse(p);h[Hs.extensionName]&&(f.accept(h[Hs.extensionName]),g[Hs.extensionName]=f)}catch{Fs(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let f={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(f,(h,y,S,u)=>{if(!h)return tu(r,y||401,S,u);this.completeUpgrade(g,s,d,t,r,o,n)});return}if(!this.options.verifyClient(f))return tu(r,401)}this.completeUpgrade(g,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[ice])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>r8)return tu(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${tce("sha1").update(r+sce).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let g=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),p._protocol=g)}if(t[Hs.extensionName]){let g=t[Hs.extensionName].params,f=t8.format({[Hs.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${f}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",n8),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(eu,this)})),a(p,n)}};i8.exports=rx;function lce(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function eu(e){e._state=s8,e.emit("close")}function n8(){this.destroy()}function tu(e,t,r,o){r=r||cP.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${cP.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Fs(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Fs),e.emit("wsClientError",i,r,t)}else tu(r,o,n,s)}});var cce,dce,pce,uce,mce,gce,l8,fce,ru,c8=l(()=>{cce=m(Q4(),1),dce=m(nP(),1),pce=m(Ma(),1),uce=m(VI(),1),mce=m(JI(),1),gce=m(tx(),1),l8=m(lP(),1),fce=m(a8(),1),ru=l8.default});var ox,d8=l(()=>{"use strict";ox=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var yce,nx,p8=l(()=>{"use strict";rg();d8();yce=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",nx=(e={})=>{let t=e.env??process.env,r=ox(t[eg]),o=ox(t[tg]);return{mode:yce(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var u8=l(()=>{"use strict";rg()});var m8=l(()=>{"use strict";p8();u8()});var sx=l(()=>{"use strict"});var za,zs,g8,Sce,ix,ax,f8,y8,lx,h8,ou,cx=l(()=>{"use strict";za=m(require("node:fs")),zs=m(require("node:os")),g8=m(require("node:path"));sx();ci();Sce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ix=(e=zs.default.hostname())=>g8.default.join(zs.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),ax=e=>{if(!za.default.existsSync(e))return null;try{let t=JSON.parse(za.default.readFileSync(e,"utf8"));return!Sce(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},f8=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},y8=(e,t)=>{za.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},lx=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??ix(),o=ax(r);if(o!==null&&o.pid!==process.pid&&Ut(o.pid)&&f8(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:zs.default.hostname(),macOsUsername:zs.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return y8(r,n),{ok:!0}},h8=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??ix(),o=ax(r);return o!==null&&o.pid!==process.pid&&Ut(o.pid)&&f8(o)?{ok:!1}:(y8(r,{hostname:zs.default.hostname(),macOsUsername:zs.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},ou=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??ix();ax(r)?.pid===process.pid&&za.default.existsSync(r)&&za.default.unlinkSync(r)}});var dx,nu,Pce,Ace,bce,_ce,px,S8=l(()=>{"use strict";dx=require("node:child_process"),nu=m(require("node:path"));ci();Km();Pce=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),Ace=(e,t)=>{if(Pce(e)||!/\bnode\b/.test(e))return!1;let r=nu.default.resolve(t),o=nu.default.join(r,"app",_l),n=nu.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===_l||i==="agent-witch.ts")return e.includes(r);try{let a=nu.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},bce=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,dx.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},_ce=(e,t,r)=>{let o=bce(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||Ace(d,t)&&n.push(c)}return n},px=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,dx.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=_ce(r,e.installDir,t),n=[];for(let s of o)if(Ut(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var su,iu,P8,kce,ux,A8=l(()=>{"use strict";su=m(require("node:fs")),iu=m(require("node:path"));Ye();P8=(e,t)=>{!su.default.existsSync(e)||su.default.existsSync(t)||(su.default.mkdirSync(iu.default.dirname(t),{recursive:!0}),su.default.renameSync(e,t))},kce=e=>{if(e.profileEmail===null)return;let t=iu.default.join(e.installDir,zt);P8(iu.default.join(t,fn),e.mainLogPath),P8(iu.default.join(t,yn),e.errorLogPath)},ux=e=>{let t=M();e!==void 0&&t.installDir!==e||kce(t)}});var b8=l(()=>{"use strict";td();Sy();Sy();!St()&&vn(__agentWitchImportMetaUrl)&&(async()=>{ht("agent-witch-wake-server");let e=await rs(),t=$r(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var _8=l(()=>{"use strict";b8()});var k8=l(()=>{"use strict";Bc()});var mx,w8=l(()=>{"use strict";sx();_8();cx();k8();mx=async(e={})=>{let t=e.skipInProcessBridge?null:await hy();Qf();let r=setInterval(()=>{Qf()},6e4),o=setInterval(()=>{if(!h8().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var au,dP,Ece,T8,E8,pP,R8,C8,gx,v8,uP,L8=l(()=>{"use strict";au=m(require("node:fs")),dP=m(require("node:path")),Ece="pending-run-inputs.json",T8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),E8=e=>{let t=e.profileEmail?dP.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return dP.default.join(t,Ece)},pP=e=>{let t=E8(e);if(!au.default.existsSync(t))return{};try{let r=JSON.parse(au.default.readFileSync(t,"utf8"));return T8(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!T8(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},R8=(e,t)=>{let r=E8(e);au.default.mkdirSync(dP.default.dirname(r),{recursive:!0}),au.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},C8=e=>Object.values(pP(e)),gx=(e,t)=>pP(e)[t]!==void 0,v8=(e,t)=>{let r=pP(e);r[t.agentRunId]=t,R8(e,r)},uP=(e,t)=>{let r=pP(e);delete r[t],R8(e,r)}});var mP=l(()=>{"use strict";ee()});var I8=l(()=>{"use strict";ee()});var gP=l(()=>{"use strict";ee()});var fP=l(()=>{"use strict";ee()});var lu=l(()=>{"use strict";ee()});var Rce,Cce,cu,fx=l(()=>{"use strict";Gt();mP();I8();gP();fP();lu();Rce={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},Cce={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},cu=e=>{if(!_e(e.writerAgent))return"the selected writer";let t=At(e.writerAgent);if(Xe(e.writerExecutionBackend)==="api"&&t!==null){let r=lt(Be(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Yl(t,r.model);return`${Cce[t]} model ${o}`}}return Rce[e.writerAgent]}});var vce,Lce,x8,W8,O8=l(()=>{"use strict";vce=/"input_tokens"\s*:\s*(\d+)/,Lce=/"output_tokens"\s*:\s*(\d+)/,x8=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},W8=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=x8(vce.exec(t)),o=x8(Lce.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var yP=l(()=>{"use strict";Yt()});var du,hP,Ice,yx,M8,j8,N8,hx,D8=l(()=>{"use strict";du=m(require("node:fs")),hP=m(require("node:path"));yP();Ice="run-completion-outbox.json",yx=e=>{let t=e.profileEmail?hP.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return hP.default.join(t,Ice)},M8=e=>{let t=yx(e);if(!du.default.existsSync(t))return[];try{let r=JSON.parse(du.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},j8=(e,t)=>{du.default.mkdirSync(hP.default.dirname(yx(e)),{recursive:!0}),du.default.writeFileSync(yx(e),JSON.stringify(t,null,2),"utf8")},N8=(e,t)=>{let r=[...M8(e).filter(o=>o.runId!==t.runId),t];j8(e,r)},hx=async e=>{if(e.cloudApi===null)return;let t=M8(e.layout);if(t.length===0)return;let r=[];for(let o of t)await Ec(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);j8(e.layout,r)}});var H8=l(()=>{"use strict"});var Sx,pu,Wce,$s,F8=l(()=>{"use strict";H8();Sx=new Map,pu=e=>{let t=Sx.get(e);t!==void 0&&(clearInterval(t),Sx.delete(e))},Wce=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},$s=(e,t,r,o={})=>{pu(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){pu(t);return}let i=o.onTick?.()??{};Wce(e,t,n,i)};s(),Sx.set(t,setInterval(s,15e3))}});var z8=l(()=>{"use strict";Yt()});var $8,U8=l(()=>{"use strict";z8();$8=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Ze(t)}});var Px,uu,_o,Ax,Dr,B8,SP=l(()=>{"use strict";Px=new Set,uu=new Map,_o=(e,t)=>{if(t.length===0)return;let r=uu.get(e)??[];r.push(t),uu.set(e,r)},Ax=e=>{Px.add(e);let t=uu.get(e)??[];return uu.delete(e),t},Dr=e=>Px.has(e),B8=e=>{Px.delete(e),uu.delete(e)}});var $a,G8,V8,K8=l(()=>{"use strict";$a=m(require("node:path")),G8=require("node:url");Cn();V8=()=>{if(St()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?$a.default.dirname($a.default.resolve(e)):$a.default.dirname($a.default.resolve(__filename))}return $a.default.dirname((0,G8.fileURLToPath)(__agentWitchImportMetaUrl))}});var q8,J8,Y8,X8,yt,Ua,Z8,Q8,Ba,bx,_x,kx,e3,wx,t3,PP=l(()=>{"use strict";q8=require("node:crypto"),J8=m(require("node:fs")),Y8=m(require("node:path")),X8=require("node:url");ci();Cn();K8();yt=new Map,Z8=async()=>{if(Ua!==void 0)return Ua;try{if(St()){let e=V8(),t=Y8.default.join(e,"deps","node-pty","lib","index.js");if(J8.default.existsSync(t)){let r=await import((0,X8.pathToFileURL)(t).href);return Ua=r,r}}return Ua=await import("node-pty"),Ua}catch{return Ua=null,null}},Q8=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Ba=(e,t,r)=>{let o=yt.get(e);if(o!==void 0){yt.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},bx=(e,t)=>{let r=yt.get(e);return r===void 0?!1:(r.pty.write(t),!0)},_x=(e,t,r)=>{let o=yt.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},kx=e=>{for(let t of yt.values())if(!(t.mode!=="agent"||t.runId!==e))return Ut(t.pty.pid);return!1},e3=e=>{for(let[t,r]of yt.entries())if(!(r.mode!=="agent"||r.runId!==e)){yt.delete(t);try{r.pty.kill()}catch{}return!0}return!1},wx=async e=>{let t=await Z8();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;yt.get(e.shellSessionId)!==void 0&&Ba(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return yt.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{Q8(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{yt.get(e.shellSessionId)?.pty===n&&(yt.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},t3=async e=>{let t=e.shellSessionId??(0,q8.randomUUID)(),r=await Z8();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return yt.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{Q8(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{yt.get(t)?.pty===o&&(yt.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var AP,r3,o3=l(()=>{"use strict";AP="[[AWAITING_INPUT]]",r3=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",AP,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var mu,n3,bP=l(()=>{"use strict";o3();mu=e=>{let t=e.indexOf(AP);if(t<0)return null;let o=e.slice(t+AP.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},n3=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",r3].join(`
`)});var s3,i3=l(()=>{"use strict";SP();PP();bP();s3=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(Dr(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}_o(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await t3({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=mu(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var l3,c3,d3,a3,ko,_P=l(()=>{"use strict";l3=require("node:child_process"),c3=m(require("node:fs")),d3=m(require("node:path"));Km();a3=12e4,ko=(e,t)=>{let r=d3.default.join(e,"app",YO,"ensure-writer.sh");return c3.default.existsSync(r)?new Promise((o,n)=>{let s=(0,l3.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},a=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String(a3/1e3)}s`))},a3);s.on("error",c=>{clearTimeout(a),n(c)}),s.on("close",c=>{if(clearTimeout(a),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var p3,Us,fu,kP,Tx,gu,wP,TP,Ex,Rx,Oce,Ga,Mce,jce,Cx,vx=l(()=>{"use strict";p3=require("node:child_process");Gt();_P();gP();mP();lu();fP();Us=new Map,fu=e=>e==="cursor"||e==="antigravity",kP=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",Tx=e=>Us.get(e)?.warmed===!0,gu=e=>{let t=Us.get(e);Us.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},wP=e=>Us.get(e)?.conversationStarted===!0,TP=e=>{let t=Us.get(e);Us.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},Ex=e=>{Us.delete(e)},Rx=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",Oce={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Ga=e=>`${Oce[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,Mce=(e,t,r,o)=>new Promise(n=>{let s=hg(t,r),i=[],a=(0,p3.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),jce=(e,t)=>{let r=Ga(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},Cx=async e=>{if(!_e(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Xe(e.runConfig.writerExecutionBackend)==="api"){let r=At(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Be(e.runConfig.layout.configPath);return lt(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),gu(e.writerAgent),{exitCode:0,output:Ga(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await ko(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}fu(e.writerAgent)&&gu(e.writerAgent);let t=await Mce(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?jce(e.writerAgent,t.output):Ga(e.writerAgent)}}});var Bs,Lx=l(()=>{"use strict";Bs={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var u3,Nce,Dce,m3,Hce,Ix,g3=l(()=>{"use strict";Lx();u3=/you(?:'|')ve hit your session limit/i,Nce=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],Dce=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,m3=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},Hce=e=>{let t=Dce.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},Ix=e=>{let t=e.trim();if(t.length===0)return null;if(u3.test(t))return{code:Bs.SESSION_LIMIT,resetHint:Hce(t),matchedLine:m3(t,u3)};for(let r of Nce)if(r.test(t))return{code:Bs.PROVIDER_QUOTA,resetHint:null,matchedLine:m3(t,r)};return null}});var EP,RP,xx,Wx=l(()=>{"use strict";EP="[[AGENT_RUN_WRITER_EXECUTION]]",RP="cli-writer-api-key-missing",xx="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var Ox=l(()=>{"use strict";Wx()});var f3=l(()=>{"use strict";Ox()});var CP=l(()=>{"use strict";Lx();g3();Wx();Ox();f3()});var vP,y3=l(()=>{"use strict";vP={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var h3,S3=l(()=>{"use strict";h3="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var P3,A3=l(()=>{"use strict";CP();S3();P3=e=>e.code===Bs.SESSION_LIMIT?h3:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var b3,_3=l(()=>{"use strict";CP();y3();A3();b3=e=>{let t=Ix(e.output);return t!==null?{status:vP.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:P3(t)}:{status:e.exitCode===0?vP.COMPLETED:vP.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var Mx,T9e,k3=l(()=>{"use strict";Mx={OPEN:"open",APPROVAL:"approval"},T9e=Mx.APPROVAL});var Va,LP,w3,$ce,T3,E3,R3,yu,jx,Nx=l(()=>{"use strict";Va=m(require("node:fs")),LP=m(require("node:path")),w3="runs",$ce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),T3=e=>{let t=e.profileEmail!==null?LP.default.join(e.installDir,"profiles",e.profileEmail,w3):LP.default.join(e.installDir,w3);return Va.default.mkdirSync(t,{recursive:!0}),t},E3=(e,t)=>LP.default.join(T3(e),`${t}.json`),R3=(e,t)=>{Va.default.writeFileSync(E3(e,t.id),JSON.stringify(t,null,2))},yu=(e,t)=>{let r=E3(e,t);if(!Va.default.existsSync(r))return null;try{let o=JSON.parse(Va.default.readFileSync(r,"utf8"));return!$ce(o)||typeof o.id!="string"?null:o}catch{return null}},jx=e=>{let t=T3(e),r=Va.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=yu(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var Uce,C3,v3=l(()=>{"use strict";_3();k3();Nx();Uce=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=b3({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:Mx.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},C3=(e,t)=>{let r=Uce(t);return R3(e,r),r}});var L3=l(()=>{"use strict";gS()});var I3,x3=l(()=>{"use strict";CP();I3=()=>[EP,`agentRunWriterExecutionBackend=${RP}`,`agentRunWriterExecutionReasonCode=${xx}`].join(`
`)});var pn,IP=l(()=>{"use strict";pn=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Dx,Bce,Gce,W3,O3=l(()=>{"use strict";Dx=e=>e.toLocaleString("en-US"),Bce=e=>e<.01?e.toFixed(4):e.toFixed(3),Gce=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${Bce(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Dx(e.inputTokens)} in / ${Dx(e.outputTokens)} out (${Dx(e.totalTokens)} total)`,t].join(`
`)},W3=(e,t)=>{if(t===void 0)return e;let r=Gce(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var M3=l(()=>{"use strict";ee()});var N3,hu,Le,Hx,xP,j3,Vce,Kce,D3,H3,F3,Su,Fx,zx,$x,z3,qce,Ft,Pu,un,$3,Jce,Yce,WP,Ux,Bx,Gx,U3=l(()=>{"use strict";N3=require("node:child_process");ee();Gt();L8();Pp();fx();O8();Jl();D8();yP();F8();ci();U8();SP();PP();bP();i3();vx();v3();L3();x3();IP();O3();di();M3();lu();Rl();bP();hu=new Map,Le=new Map,Hx=new Set,xP=new Map,j3=e=>{e!==void 0&&!xP.has(e)&&xP.set(e,Date.now())},Vce=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(Dr(t)){Ft(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}_o(t,n)},Kce=(e,t,r,o,n)=>{if(!f_(e,n))return;let s=`${I3()}
`;Vce(t,r,o,s);let i=Le.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},D3=130,H3=`

Stopped by user.`,F3=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:pn(e)},Su=null,Fx=e=>{Su=e},zx=(e,t)=>{if(Su===null)return;let r=$C(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||fk(Su,t,r)},$x=async e=>{await hx({layout:e,cloudApi:Su})},z3=e=>{let t=hu.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Ut(t.pid)},qce=e=>ke({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),Ft=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Pu=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=ni(s),c=Le.get(r);if(a!==null&&c!==void 0){let d=iM(a),p=z3(r)||kx(r);d!==null&&!p&&un(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return sM(a)}}),un=(e,t,r,o,n,s,i,a)=>{let c=Si(s,a),d=n,p=W3(c.output,c.llmUsage);if(r!==void 0){let f=xP.get(r);xP.delete(r),f!==void 0&&FC({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-f)/1e3))});let h=W8(c.llmUsage,p);h!==null&&jK({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&Hx.has(r)&&(Hx.delete(r),d=D3,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${H3}`:"Stopped by user.");let g=r!==void 0?$C(e.layout.reportsDir,r):null;if(r!==void 0){pu(r),oc(e.layout,r),Dr(r)&&(Ft(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),B8(r));let f=Le.get(r);WK({reportsDir:e.layout.reportsDir,agentRunId:r,input:pn(i),output:p,...f!==void 0?{writerLabel:cu({writerAgent:f.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),f!==void 0&&uS({layout:e.layout,writerAgent:f.writerAgent,projectFolderPath:f.projectFolderPath,userPrompt:f.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),C3(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),N8(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),hx({layout:e.layout,cloudApi:Su}),Le.delete(r),hu.delete(r),uP(e.layout,r)}Ft(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),Dl(e.layout)},$3=(e,t,r,o,n,s,i)=>{let a=Le.get(r),c=a?.accumulatedOutput??s;v8(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),$s(t,r,()=>gx(e.layout,r),Pu(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),Ft(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},Jce=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(n===void 0||h.length===0)){if(Dr(n)){Ft(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}_o(n,h)}};if(n!==void 0){let h=Le.get(n);hu.set(n,t),Le.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),Ft(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),$s(r,n,()=>z3(n),Pu(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let g=a==="claude-cli",f=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(g?f.push(y):(c.push(y),p(y)),d||n===void 0)return;let S=mu(c.join(""));if(S!==null){d=!0,t.kill("SIGTERM");let u=Le.get(n),A=[u?.accumulatedOutput??"",S.partialOutput].filter(T=>T.length>0).join(`

`);u!==void 0&&(u.accumulatedOutput=A),hu.delete(n),$3(e,r,n,o,S.question,A,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;TP(a);let y=n!==void 0?Le.get(n):void 0,S=g?Si(f.join("")):{output:c.join("").trim(),llmUsage:void 0},u=g?c.join("").trim():"",A=[S.output.trim(),u].filter(P=>P.length>0).join(`
`);g&&S.output.trim().length>0&&p(S.output);let T=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${A}`.trim():A;un(e,r,n,o,h??-1,T,s,S.llmUsage)}),t.on("error",h=>{d||un(e,r,n,o,-1,h.message,s)})},Yce=(e,t,r,o,n,s,i,a,c)=>{let d=F3(r,c);s!==void 0&&(Le.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),Ft(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),$s(n,s,()=>Le.has(s),Pu(e,n,s,o,i,a))),Ql(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(Dr(s)){Ft(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}_o(s,g)}}).then(g=>{TP(t),un(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let f=g instanceof Error?g.message:String(g);un(e,n,s,o,-1,f,r)})},WP=(e,t,r,o,n,s,i,a,c,d,p,g)=>{let f=F3(r,p);if(Nl(e.layout),Fn(e,t)){j3(s),Yce(e,t,r,o,n,s,c,d,f);return}let h=Sr(t,r,qce(e),i);if(h===null){un(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}j3(s);let y=$8({workspace:e.workspace,projectFolderPath:c}),S=()=>{let u=(0,N3.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:g??process.env});Jce(e,u,n,o,s,r,f,t)};if(s===void 0){S();return}Le.set(s,{originalPrompt:r,userTranscriptPrompt:f,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:Le.get(s)?.accumulatedOutput??""}),Kce(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&El({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),$s(n,s,()=>Le.has(s),Pu(e,n,s,o,c,d)),s3({socket:n,sendMessage:Ft,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:u=>{a!==void 0&&Ba(a,P=>{Ft(n,P)},o);let A=Le.get(s),T=[A?.accumulatedOutput??"",u.partialOutput].filter(P=>P.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=T),$3(e,n,s,o,u.question,T,r)},onFinished:(u,A)=>{TP(t);let T=Si(A),P=Le.get(s),b=P!==void 0&&P.accumulatedOutput.length>0?`${P.accumulatedOutput}

${T.output}`.trim():T.output;un(e,n,s,o,u,b,r,T.llmUsage)}}).then(u=>{if(!u){S();return}$s(n,s,()=>kx(s),Pu(e,n,s,o,c,d))}).catch(u=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",u instanceof Error?u.message:u),S()})},Ux=(e,t,r,o)=>{uP(e.layout,t.agentRunId),t.shellSessionId!==void 0&&Ft(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=n3(t),s=Le.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;WP(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},Bx=(e,t)=>{for(let r of C8(e.layout))Le.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:pn(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),$s(t,r.agentRunId,()=>gx(e.layout,r.agentRunId),{awaitingInput:!0}),Ft(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Gx=(e,t,r,o)=>{let n=Le.get(r);if(n===void 0)return!1;Hx.add(r),pu(r);let s=hu.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(e3(r))return!0;uP(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${H3}`:"Stopped by user.";return un(e,t,r,o,D3,i,n.originalPrompt),!0}});var Xce,Vx,B3=l(()=>{"use strict";lc();Xce=()=>`http://127.0.0.1:${Vt()}/restart`,Vx=async()=>{try{let e=await fetch(Xce(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var G3=l(()=>{"use strict";id()});var V3=l(()=>{"use strict";hv()});var Kx,K3=l(()=>{"use strict";Kx=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Au,Zce,qx,Jx,q3=l(()=>{"use strict";G();ie();G3();tT();V3();K3();di();Au=(e,t)=>{Ko(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},Zce=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Ib(),Lb)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},qx=e=>Kx({localBundleVersion:Fe(e.installDir)?.bundleVersion??null,remoteBundleVersion:e.remoteBundleVersion}),Jx=async e=>{let t=Fe(e.layout.installDir)?.bundleVersion??null;if(!Kx({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(Bt(e.layout)){Hl({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Au(e.layout,{summary:r,action:"install-bundle-update-start"}),zr({launchAgentLabel:ge(e.layout.installDir),installDir:e.layout.installDir});let o=await Ra({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),Au(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await Zce();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Au(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),Au(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),Au(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var Qce,Yx,J3=l(()=>{"use strict";Qce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Yx=e=>{if(!Qce(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var Xx,Zx,Y3=l(()=>{"use strict";Nw();Dw();Xx=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Gc({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},Zx=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Qr(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var X3,ede,tde,rde,bu,Z3=l(()=>{"use strict";X3=m(require("node:os"));Ye();ede="Default",tde=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),rde=e=>{let t=X3.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},bu=()=>{let e=M(),t=dl(e),r=tde(ede);return`${rde(t)}/${r.length>0?r:"project"}`}});var Q3=l(()=>{"use strict";id()});var e6,Qx,t6=l(()=>{"use strict";Q3();e6=!1,Qx=e=>{e6||(e6=!0,process.on("uncaughtException",t=>{ns(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;ns(e,{kind:"crash",message:r,stack:o})}))}});var r6,ode,eW,o6=l(()=>{"use strict";r6=require("node:child_process");_P();Gt();gP();mP();lu();fP();ode=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,r6.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},eW=async e=>{if(!_e(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Xe(e.runConfig.writerExecutionBackend)==="api"){let r=At(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Be(e.layout.configPath),n=lt(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await ko(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await ode(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var tW,n6=l(()=>{"use strict";tW=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var s6,rW,i6=l(()=>{"use strict";s6=require("node:crypto"),rW=()=>(0,s6.randomUUID)()});var Ka,a6,OP=l(()=>{"use strict";Ka="[[WORKING_ESTIMATE]]",a6=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Ka,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var l6,c6=l(()=>{"use strict";l6=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var nde,d6,p6=l(()=>{"use strict";OP();nde=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,d6=e=>{if(!e.includes(Ka))return null;let t=null;for(let r of e.matchAll(nde)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var sde,oW,u6=l(()=>{"use strict";p6();sde=/^(\d{1,6})\b/,oW=e=>{let t=d6(e);if(t!==null)return t;let r=sde.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var ide,ade,lde,MP,nW=l(()=>{"use strict";Gt();od();ide="http://127.0.0.1:11434",ade=45e3,lde=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},MP=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||ide,o=t===void 0?(await Zt({commands:ke({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(ade)});return n.ok?lde(await n.json()):null}catch{return null}}});var sW,iW,aW,m6=l(()=>{"use strict";Rl();OP();IP();c6();u6();Pp();nW();sW=async e=>{let t=pn(e.wrappedPrompt),r=OK(e.reportsDir);return{estimateOutput:await MP(a6(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},iW=e=>{let t=oW(e.estimateOutput);t!==null&&sS({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},aW=e=>{let t=oW(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=l6(t);return Tl({reportKey:e.reportKey,agentRunId:e.agentRunId,status:fr.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),sS({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var jP,g6,lW=l(()=>{"use strict";jP="[[WORKING_TOKEN_ESTIMATE]]",g6=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",jP,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var f6,cde,y6,h6=l(()=>{"use strict";lW();f6=/^(\d{1,8})\b/,cde=e=>{let t=e.indexOf(jP);if(t<0)return null;let r=e.slice(t+jP.length).trim(),o=f6.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},y6=e=>{let t=cde(e);if(t!==null)return t;let r=f6.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var cW,dW,S6=l(()=>{"use strict";lW();IP();h6();Pp();nW();cW=async e=>{let t=pn(e.wrappedPrompt),r=NK(e.reportsDir);return{estimateOutput:await MP(g6(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},dW=e=>{let t=y6(e.estimateOutput);return t===null?null:(MK({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var P6=l(()=>{"use strict";cx();S8();A8();w8();lc();U3();_P();Gt();Nx();SP();B3();Bw();q3();di();J3();Y3();yP();Z3();t6();o6();qm();n6();i6();OP();Rl();m6();S6();fx();od();PP();vx()});var A6={};Rt(A6,{buildContinuationPromptWithContext:()=>ude});var dde,pde,ude,b6=l(()=>{"use strict";dde=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,pde=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),ude=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=pde(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${dde(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var _6={};Rt(_6,{readHarnessExportSets:()=>gde});var _u,pW,NP,mde,gde,k6=l(()=>{"use strict";_u=m(require("node:fs")),pW=m(require("node:path"));Ye();NP=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mde=e=>{if(!_u.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(_u.default.readFileSync(e.harnessManifestPath,"utf8"));if(NP(t))return t}catch{return null}return null},gde=(e,t)=>{let r=M(t),o=mde(r);if(o===null)return[];let n=NP(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!NP(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!NP(p))continue;let g=typeof p.path=="string"?p.path:void 0,f=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(g===void 0||f.length===0||h.length===0||y.length===0)continue;let S=g.startsWith("shared/")?pW.default.join(r.harnessRootDir,g):pW.default.join(r.harnessSetsDir,i,g);_u.default.existsSync(S)&&d.push({id:f,kind:h,title:y,content:_u.default.readFileSync(S,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var SW,mW,qa,w6,fde,T6,E6,uW,R6,gW,fW,yW,te,J,hW,yde,ku,hde,Sde,Pde,Ade,bde,_de,kde,wde,wu,C6=l(()=>{"use strict";SW=require("node:child_process"),mW=m(require("node:fs")),qa=m(require("node:os"));c8();G();ie();Nn();vI();m8();ee();PI();ee();hr();id();cE();JS();gS();Yt();Ho();pT();vt();P6();w6=3e4,fde=3e4,T6=new Map,E6=new Map,uW=new Map,R6=new Map,gW=new Map,fW=new Map,yW=new Map,te=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),J=(e,t,r)=>{e.readyState===ru.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Ko(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Py(r,"out",t)))},hW=e=>e,yde=e=>{if(!mW.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(mW.default.readFileSync(e.harnessManifestPath,"utf8"));if(te(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},ku=(e,t)=>{let r=yde(t);r!==null&&J(e,{type:"harness.manifest.report",payload:{hostname:qa.default.hostname(),manifest:r}})},hde=async(e,t,r,o,n,s,i=!1,a,c,d,p,g)=>{let f=g?.trim()??"";if(!_e(t)){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=cu({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await Zt({commands:ke({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),S=s!==void 0?sW({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,u=s!==void 0?cW({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=fu(t)&&!Tx(t);if(A){try{await ko(e.layout.installDir,t)}catch(F){let nt=F instanceof Error?F.message:String(F);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${nt}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}gu(t)}else if(!fu(t))try{await ko(e.layout.installDir,t)}catch(F){let nt=F instanceof Error?F.message:String(F);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${nt}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let T=tc(d,bu,g);if(T===null){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}st({projectFolderPath:T,...f.length>0?{projectId:f}:{}}),i||wp(e.layout,t,T);let P=mS({sessionContinuation:i,supportsWriterSessionContinuation:kP(t),isWriterConversationStarted:wP(t)}),b=i&&P==="first"?kp(e.layout,t,T):null,k=b!==null?Ea(e.layout,b):null,E=k!==null&&k.turns.length>0,w=ov({sessionContinuation:i,supportsWriterSessionContinuation:kP(t),isWriterConversationStarted:wP(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:E,userPromptCharacterCount:r.length}),x=r;if(w.continuationStrategy==="source_run_seed"){let F=typeof c=="string"&&c.length>0?yu(e.layout,c):null;if(F!==null){let{buildContinuationPromptWithContext:nt}=await Promise.resolve().then(()=>(b6(),A6));x=nt({priorPrompt:F.prompt,priorOutput:F.resultOutput??"",userMessage:r})}}else w.continuationStrategy==="transcript_seed"&&k!==null&&k.turns.length>0&&(x=lS({priorTurns:k.turns,userMessage:r}));let I=w.ragLimit>0?await Ji({layout:e.layout,query:x,limit:w.ragLimit,minScore:w.ragMinScore,projectFolderPath:T,...f.length>0?{projectId:f}:{}}):[],j=w.ragLimit>0&&T.trim().length>0?await aE({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:T,...f.length>0?{projectId:f}:{}}):[],O=w.injectMemory?KC(e.layout,T,f.length>0?f:void 0):[],$=`${JC(O,w.memoryEntryLimit)}${nE(I)}${lE(j)}${x}`,B=p?.trim()??(s!==void 0&&T.trim().length>0?rW():void 0);if(s!==void 0&&B!==void 0&&B.length>0&&T.trim().length>0){El({reportKey:B,agentRunId:s,userSummary:"Working on your Mac\u2026"});let F=$;S!==null&&S.then(nt=>{if(nt===null)return;let wo=aW({estimateOutput:nt.estimateOutput??"",reportKey:B,agentRunId:s,reportsDir:e.layout.reportsDir,task:nt.task,writerLabel:nt.writerLabel,embedding:nt.embedding});if(wo.estimateSeconds===null)return;zx(e.layout.reportsDir,s);let To=`${Ka}
${wo.estimateSeconds}
`;if(Dr(s)){J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:To},requestId:o});return}_o(s,To)}).catch(()=>{}),$=tW(F),$=rb($,{agentRunId:s,reportKey:B,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&S!==null&&S.then(F=>{F!==null&&iW({estimateOutput:F.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:F.task,writerLabel:F.writerLabel,embedding:F.embedding})}).catch(()=>{}),s!==void 0&&u!==null&&u.then(F=>{F!==null&&dW({estimateOutput:F.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:F.task,writerLabel:F.writerLabel})}).catch(()=>{});let Ce=s!==void 0&&yW.get(s)===!0;if(s!==void 0&&T.trim().length>0){let F=await vf(T);fW.set(s,F),B!==void 0&&B.length>0&&gW.set(s,B)}WP(e,t,$,o,hW(n),s,{sessionTurn:w.sessionTurn},a,T,B,r,d_(e.layout,s,Ce)),A&&s!==void 0&&J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Rx(t)},requestId:o})},Sde=async(e,t,r,o,n)=>{let s=(i,a)=>{J(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await Cx({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ke({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,J(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=_e(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Ga(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},Pde=(e,t,r)=>new Promise(o=>{if(!_e(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Sr(t,r,ke({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,SW.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),Ade=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;J(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=br(t.bundle),s=te(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=ze(e.wsUrl)??Pt,g=await Y_({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=Bn({bundle:i,layout:e.layout});return J(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&ku(o,e.layout),!0},bde=async(e,t,r,o)=>{if(await Ade(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(J(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!_e(n)){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}Nl(e.layout);let i=await(async()=>{try{await ko(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return Pde(e,n,s)})().finally(()=>{Dl(e.layout)});J(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),ku(o,e.layout)},_de=e=>{let t=1e3*2**e;return Math.min(fde,t)},kde=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>t.restartInFlight?"already_in_progress":Bt(e.layout)?(Fl(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`),"deferred_writer_busy"):(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,Vx().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1}),"accepted"),o=(u,A,T,P)=>{J(u,{type:"device.restart.ack",payload:P_({status:T,reason:A}),...P!==void 0?{requestId:P}:{}},e.layout)},n=(u,A="system.ack")=>{if(!t.selfUpdateInFlight&&qx({installDir:e.layout.installDir,remoteBundleVersion:u})){if(Bt(e.layout)){Hl({layout:e.layout,remoteBundleVersion:u,trigger:A}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${A}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,Jx({layout:e.layout,remoteBundleVersion:u,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1})}},s=()=>{let u=ve(e.layout);u!==null&&$e(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,c(),d(),y())},i=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},a=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},c=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},d=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===ru.OPEN||u.readyState===ru.CONNECTING)&&u.close()},p=()=>{a(),t.localHealthTimer=setInterval(s,w6)},g=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=_de(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,y()},u)},f=u=>{i();let A=()=>{let T=Il(e.layout.installDir),P=Vt();J(u,{type:"agent.heartbeat",payload:{hostname:qa.default.hostname(),macOsUsername:qa.default.userInfo().username,wakeError:t.wakeError,wakePort:P,...e.email!==null?{email:e.email}:{},installBundleVersion:T}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,w6)},h=(u,A)=>{if(typeof u.type!="string")return;if(dT(u)){t.stopped=!0,i(),c(),d(),aT({layout:e.layout}).finally(()=>{ou(),process.exit(0)});return}Ko(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),Py(e.layout,"in",u);let T=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&te(u.payload)){let P=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",b=typeof u.payload.origin=="string"?u.payload.origin:"",k=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",E=typeof u.payload.challenge=="string"?u.payload.challenge:"",w=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!CI({serverPublicKey:P,origin:b,devicePublicKey:k,challenge:E,serverAttestation:w})){t.wakeError="Server attestation verification failed",Ko(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&te(u.payload)){let P=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";Ko(e.layout,{direction:"local",type:"writer.ensure",summary:P,action:"ensure-writer"}),eW({layout:e.layout,writerAgent:P,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(b=>{J(A,{type:"writer.status",payload:b},e.layout)})}if(u.type==="install.bundle.update"&&te(u.payload)){let P=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";P.length>0&&n(P,"install.bundle.update")}if(u.type==="system.ack"){mg(e.layout,{wsUrl:e.wsUrl});let P=te(u.payload)?u.payload:null,b=Yx(P);b!==null&&n(b)}if(u.type==="device.restart"){let P=r("cloud-device-restart");o(A,"cloud-device-restart",P,T)}if(u.type==="automations.sync"&&te(u.payload)&&Xx(u.payload),u.type==="project.message.history"&&te(u.payload)){tL({payload:u.payload});return}if(u.type==="automations.run"&&te(u.payload)&&Zx(u.payload),u.type==="terminal.stream.accepted"&&te(u.payload)){let P=typeof u.payload.runId=="string"?u.payload.runId:"";if(P.length>0){let b=Ax(P);for(let k of b)J(A,{type:"terminal.stream.chunk",payload:{runId:P,chunk:k},requestId:T})}}if(u.type==="agent.agentRun.list"&&J(A,{type:"dashboard.agentRun.list.result",payload:{runs:jx(e.layout)},requestId:T}),u.type==="agent.agentRun.get"&&te(u.payload)){let P=typeof u.payload.runId=="string"?u.payload.runId:"",b=P.length>0?yu(e.layout,P):null;J(A,{type:"dashboard.agentRun.get.result",payload:{run:b},requestId:T})}if(u.type==="command.claude.run"&&te(u.payload)){let P=u.payload.prompt,b=typeof u.payload.writerAgent=="string"&&_e(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",k=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,E=u.payload.sessionContinuation===!0,w=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,x=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,I=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,j=tc(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,bu,I),O=o_(u.payload.compositionSnapshot),$=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof P=="string"&&P.trim().length>0){if(console.log(`[agent-witch] Running ${b} task (${E?"continue":"first"})\u2026`),j===null){J(A,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...k!==void 0?{agentRunId:k}:{}},requestId:T});return}if(O!==null){let B=s_(e.layout,O);if(B!==null){J(A,{type:"command.claude.result",payload:{exitCode:-1,output:B,...k!==void 0?{agentRunId:k}:{}},requestId:T});return}if(k!==void 0){let Ce=a_(e.layout,k,O);if(!Ce.ok){J(A,{type:"command.claude.result",payload:{exitCode:-1,output:Ce.errorMessage,...k!==void 0?{agentRunId:k}:{}},requestId:T});return}yW.set(k,O.entries.some(F=>F.scope==="run"))}}k!==void 0&&x!==void 0&&T6.set(k,x),k!==void 0&&(E6.set(k,j),I!==void 0&&I.trim().length>0&&uW.set(k,I.trim()),R6.set(k,P.trim()),st({projectFolderPath:j,...I!==void 0&&I.trim().length>0?{projectId:I.trim()}:{}})),hde(e,b,P.trim(),T,A,k,E,x,w,j,$,I)}}if(u.type==="shell.session.open"&&te(u.payload)){let P=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",b=typeof u.payload.cols=="number"?u.payload.cols:120,k=typeof u.payload.rows=="number"?u.payload.rows:32;P.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),wx({shellSessionId:P,cwd:e.workspace,cols:b,rows:k,send:E=>{J(A,E)},requestId:T}))}if(u.type==="shell.session.close"&&te(u.payload)){let P=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";P.length>0&&Ba(P,b=>{J(A,b)},T)}if(u.type==="shell.input"&&te(u.payload)){let P=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",b=typeof u.payload.data=="string"?u.payload.data:"";P.length>0&&b.length>0&&bx(P,b)}if(u.type==="shell.resize"&&te(u.payload)){let P=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",b=typeof u.payload.cols=="number"?u.payload.cols:0,k=typeof u.payload.rows=="number"?u.payload.rows:0;P.length>0&&b>0&&k>0&&_x(P,b,k)}if(u.type==="command.writer.session.end"&&te(u.payload)){let P=u.payload.writerAgent;typeof P=="string"&&_e(P)&&(Ex(P),pS(e.layout,P))}if(u.type==="command.writer.session.start"&&te(u.payload)){let P=u.payload.writerAgent,b=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof P=="string"&&_e(P)&&b.length>0&&(console.log(`[agent-witch] Starting ${P} session\u2026`),Sde(e,P,b,T,A))}if(u.type==="command.claude.stop"&&te(u.payload)){let P=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";P.length>0&&(console.log(`[agent-witch] Stopping run ${P}\u2026`),Gx(e,hW(A),P,T))}if(u.type==="command.claude.input_respond"&&te(u.payload)){let P=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",b=typeof u.payload.response=="string"?u.payload.response.trim():"",k=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",E=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",w=typeof u.payload.question=="string"?u.payload.question:"";P.length>0&&b.length>0&&k.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),Ux(e,{agentRunId:P,originalPrompt:k,partialOutput:E,question:w,response:b,shellSessionId:T6.get(P)},T,hW(A)))}if(u.type==="dispatch.approval.required"&&te(u.payload)){let P=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",b=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${P}: ${b}`),process.platform==="darwin"&&(0,SW.spawn)("osascript",["-e",`display notification "${b.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${P.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&te(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),bde(e,u.payload,T,A)),u.type==="harness.export.request"&&te(u.payload)){let P=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",b=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,k=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(E=>typeof E=="string"):[];P.length>0&&k.length>0&&(async()=>{let{readHarnessExportSets:E}=await Promise.resolve().then(()=>(k6(),_6)),w=E(k,e.email);J(A,{type:"harness.export.result",payload:{success:w.length>0,borrowerUserId:P,...b!==void 0?{targetDeviceId:b}:{},sets:w,errorMessage:w.length>0?void 0:"No readable harness sets were found on this machine."},requestId:T})})()}if(u.type==="harness.manifest.request"&&ku(A,e.layout),u.type==="command.claude.result"&&te(u.payload)){let P=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,b=typeof u.payload.output=="string"?u.payload.output:"",k=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,E=tc(P!==void 0?E6.get(P):void 0,bu),w=P!==void 0?uW.get(P):void 0,x=P!==void 0?R6.get(P)??"":"",I=Gk({exitCode:k,output:b});if(I&&E!==null&&oE({layout:e.layout,text:b,source:P??"command.claude.result",projectFolderPath:E,...w!==void 0?{projectId:w}:{}}),k!=null&&k!==0&&b.trim().length>0&&E!==null&&(ZT({layout:e.layout,errorText:b,projectFolderPath:E,...w!==void 0?{projectId:w}:{}}),iE({layout:e.layout,text:b,source:P??"command.claude.result.failure",projectFolderPath:E,...w!==void 0?{projectId:w}:{}})),I&&x.trim().length>0&&E!==null&&qC({layout:e.layout,projectFolderPath:E,...w!==void 0?{projectId:w}:{},entry:{id:`${Date.now()}-${P??"run"}`,...P!==void 0?{agentRunId:P}:{},prompt:x,output:b,createdAt:new Date().toISOString()}}),P!==void 0&&E!==null){let O=gW.get(P),$=fW.get(P);O!==void 0&&$!==void 0&&vf(E).then(B=>{let Ce=Jk({before:$,after:B});ob(O,Ce),fW.delete(P),gW.delete(P)})}if(I&&w!==void 0&&w.trim().length>0){let O=H(),$=O===null?null:V({wsUrl:O.wsUrl,pairingToken:O.pairingToken});$!==null&&Xk($,w,{...P!==void 0?{sourceRunId:P}:{},lesson:Yk({prompt:x,output:b})})}P!==void 0&&(oc(e.layout,P),yW.delete(P),uW.delete(P))}},y=()=>{if(t.stopped)return;c(),d();let u=new ru(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),Fx(V({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),$x(e.layout);let A=ze(e.wsUrl)??"http://localhost:3000",T=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),P=RI({layout:e.layout,origin:A,...T!==void 0&&T.length>0?{claimToken:T}:{}});J(u,{type:"agent.register",payload:{role:"agent",hostname:qa.default.hostname(),macOsUsername:qa.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...P}},e.layout),ku(u,e.layout),Bx(e,u),f(u)}),u.on("message",A=>{let T=typeof A=="string"?A:A.toString("utf8");try{let P=JSON.parse(T);if(!te(P))return;h(P,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(A,T)=>{i(),t.socket=void 0,t.wsConnected=!1,Wb(e.layout),t.reconnectAttempt+=1;let P=typeof T=="string"?T:T.toString("utf8");ns(e.layout,{kind:"ws_close",message:"WebSocket closed",code:A,reason:P}),console.log("[agent-witch] Disconnected from server."),g()}),u.on("error",A=>{t.wakeError=A.message,ns(e.layout,{kind:"ws_error",message:A.message,stack:A.stack}),console.error(`[agent-witch] Socket error: ${A.message}`)})},S=()=>{t.stopped=!0,i(),a(),c(),d()};return wb(()=>{let u=Tb();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&n(u.remoteBundleVersion,u.trigger);let A=Eb();A!==null&&r(A)}),{connect:y,startLocalHealthCheck:p,stop:S,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Vl(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:qp(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,y()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(ku(u,e.layout),{ok:!0})}}},wde=async()=>{ht("agent-witch");let e=nx(),t=C();lx().ok||(process.platform==="darwin"?(await Tn(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),ux(t);let o=px({installDir:t});if(o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"){zr({launchAgentLabel:ge(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067).");try{let y=bl({launchAgentPrefix:ge(t),wakePort:ul(t)});y.length>0&&console.log(`[agent-witch] Synced AGENT_WITCH_WAKE_PORT to wake-port.json in ${String(y.length)} LaunchAgent plist(s).`)}catch(y){console.error(`[agent-witch] Could not sync LaunchAgent wake port: ${y instanceof Error?y.message:String(y)}`)}hl()}let n=await S_(),s=n[0];s!==void 0&&Qx(s.layout);for(let h of n){let y=ze(h.wsUrl)??Pt;xl(h.layout.installDir,y)}let i=n.map(h=>kde(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),ou(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let S=i[y];if(S===void 0)return;let u=ve(h.layout);Ob(u,{socketOpen:S.hasMacSocketOpen(),staleAfterMs:12e4})&&S.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(Bt(h)||Jc(h.installDir))},g=await mx({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):Kp({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let f=$r(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Sl(),d()});d=()=>{f(),g.stop(),ou(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},wu=wde});var PW=l(()=>{"use strict";C6()});var v6={};Rt(v6,{startAgentWitchClient:()=>wu});var L6=l(()=>{"use strict";PW();PW();Cn();nb();Ym();if(!St()&&vn(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Jm(process.argv.slice(e))),wu()}});eb();nb();Cn();Ym();var cM="20.x",dM="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var TZ=e=>[`Node.js ${cM} or newer is required (found ${e}).`,dM].join(" "),pM=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${TZ(process.version)}
`),process.exit(1))};var Tde=async()=>{ht("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Ib(),Lb)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},Ede=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(uz(),pz)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},Rde=async()=>{if(!vn(St()?void 0:__agentWitchImportMetaUrl))return;pM();let e=process.argv.indexOf("report");e>=0&&process.exit(Jm(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await Tde();return}if(t==="wake"){await Ede();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(m$(),u$));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(n4(),o4));o();return}if(t==="mcp"){let{resolveAgentWitchLocalLayout:o}=await Promise.resolve().then(()=>(G(),dO)),{runAwlMcpStdio:n}=await Promise.resolve().then(()=>(DC(),wK));await n({layout:o()});return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(L6(),v6));await r()};Rde();
