#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var uY=Object.create;var pA=Object.defineProperty;var mY=Object.getOwnPropertyDescriptor;var gY=Object.getOwnPropertyNames;var fY=Object.getPrototypeOf,yY=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var R=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},St=(e,t)=>{for(var r in t)pA(e,r,{get:t[r],enumerable:!0})},hY=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of gY(t))!yY.call(e,n)&&n!==r&&pA(e,n,{get:()=>t[n],enumerable:!(o=mY(t,n))||o.enumerable});return e};var m=(e,t,r)=>(r=e!=null?uY(fY(e)):{},hY(t||!e||!e.__esModule?pA(r,"default",{value:e,enumerable:!0}):r,e));var ll,KW,qW,cl,uA,gpe,JW,bn,pr,Fr,Hu,Fu,Qs,ei,st,mA,zu,$u,Uu,dl,$t,_n,kn,pl,Co,gA,YW,He=l(()=>{"use strict";ll={production:".agent-witch",localhost:".local-agent-witch"},KW={production:47892,localhost:47893},qW={production:"com.agent-witch",localhost:"com.local-agent-witch"},cl={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},uA="app",gpe=`${uA}/agent-witch.js`,JW=`${uA}/command`,bn={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",projectDataDir:"project-data",harnessDir:"harness"},pr=ll.production,Fr=ll.localhost,Hu=KW.production,Fu=KW.localhost,Qs=qW.production,ei=qW.localhost,st="profiles",mA=cl.activeProfile,zu="harness",$u="sets",Uu="manifest.json",dl=bn.projectsDir,$t=bn.logsDir,_n="agent-witch.log",kn="agent-witch.error.log",pl=bn.reportsDir,Co=bn.deviceKeypairJson,gA=uA,YW="agent-witch.js"});var XW=l(()=>{"use strict";He()});var ZW,vo,ul,Bu=l(()=>{"use strict";ZW=m(require("node:path"));He();vo=e=>ZW.default.basename(e)===Fr,ul=e=>vo(e)?ei:Qs});var QW=l(()=>{"use strict";XW();Bu()});var e0,fA,SY,ml,PY,AY,t0,bY,_Y,r0=l(()=>{"use strict";QW();He();e0=m(require("node:os")),fA=m(require("node:path")),SY=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?fA.default.resolve(e):fA.default.join(e0.default.homedir(),pr)},ml=ul(SY()),PY=`${ml}-wake`,AY=`${ml}-live`,t0=`${ml}-watchdog`,bY=`${ml}-automation-scheduler`,_Y=`${ml}-updater`});var ti=R(yA=>{"use strict";Object.defineProperty(yA,"__esModule",{value:!0});yA.stringify=kY;function kY(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var H=R(hA=>{"use strict";Object.defineProperty(hA,"__esModule",{value:!0});hA.generateTypeGuardError=wY;var o0=ti();function wY(e,t,r){return(0,o0.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,o0.stringify)(e)}) to be "${r}"`}});var Lo=R(Gu=>{"use strict";Object.defineProperty(Gu,"__esModule",{value:!0});Gu.isNonNullObject=void 0;var TY=H(),EY=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,TY.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Gu.isNonNullObject=EY});var ur=R(xe=>{"use strict";Object.defineProperty(xe,"__esModule",{value:!0});xe.attachTypeGuardMeta=xe.isArrayTypeGuard=xe.isNestedObjectTypeGuard=xe.getTypeGuardWrapperKind=xe.getTypeGuardInnerGuard=xe.getTypeGuardItemGuard=xe.getTypeGuardSchema=void 0;var RY=e=>e.schema;xe.getTypeGuardSchema=RY;var CY=e=>e.itemGuard;xe.getTypeGuardItemGuard=CY;var vY=e=>e.innerGuard;xe.getTypeGuardInnerGuard=vY;var LY=e=>e.wrapperKind;xe.getTypeGuardWrapperKind=LY;var IY=e=>{if((0,xe.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};xe.isNestedObjectTypeGuard=IY;var xY=e=>{if((0,xe.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};xe.isArrayTypeGuard=xY;var WY=(e,t)=>Object.assign(e,t);xe.attachTypeGuardMeta=WY});var gl=R(wn=>{"use strict";Object.defineProperty(wn,"__esModule",{value:!0});wn.getExpectedTypeName=wn.getTypeGuardDisplayName=void 0;var n0=ur(),OY=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};wn.getTypeGuardDisplayName=OY;var MY=e=>{let t=(0,n0.getTypeGuardWrapperKind)(e),r=(0,n0.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,wn.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};wn.getExpectedTypeName=MY});var Tn=R(Vu=>{"use strict";Object.defineProperty(Vu,"__esModule",{value:!0});Vu.createValidationResult=void 0;var jY=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Vu.createValidationResult=jY});var ri=R(Ku=>{"use strict";Object.defineProperty(Ku,"__esModule",{value:!0});Ku.createValidationError=void 0;var NY=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Ku.createValidationError=NY});var oi=R(qu=>{"use strict";Object.defineProperty(qu,"__esModule",{value:!0});qu.createTreeNode=void 0;var DY=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});qu.createTreeNode=DY});var fl=R(Ju=>{"use strict";Object.defineProperty(Ju,"__esModule",{value:!0});Ju.combineResults=void 0;var HY=Tn(),FY=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,HY.createValidationResult)(r,o,n)};Ju.combineResults=FY});var Xu=R(Yu=>{"use strict";Object.defineProperty(Yu,"__esModule",{value:!0});Yu.createSimplifiedTree=void 0;var s0=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=s0(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},zY=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=s0(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Yu.createSimplifiedTree=zY});var hl=R(Qu=>{"use strict";Object.defineProperty(Qu,"__esModule",{value:!0});Qu.validateObject=void 0;var $Y=Lo(),yl=Tn(),UY=ri(),Zu=oi(),BY=fl(),i0=em(),GY=(e,t,r)=>{let o=()=>{let i=(0,UY.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Zu.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,yl.createValidationResult)(!1,[],a):(0,yl.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,yl.createValidationResult)(!0,[],(0,Zu.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,g=d,f=t[g],y=e[g],P=(0,i0.validateProperty)(g,y,f,r);return P.valid?p.length===0?(0,yl.createValidationResult)(!0,[],(0,Zu.createTreeNode)(r.path,!0,"object",e)):a(p):P};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,i0.validateProperty)(d,e[d],p,r)}),a=(0,BY.combineResults)(i,r.path),c=(0,Zu.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,yl.createValidationResult)(a.valid,a.errors,c)};return(0,$Y.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};Qu.validateObject=GY});var l0=R(om=>{"use strict";Object.defineProperty(om,"__esModule",{value:!0});om.validateArray=void 0;var VY=ti(),tm=Tn(),a0=ri(),rm=oi(),KY=fl(),qY=hl(),JY=gl(),YY=ur(),XY=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,a0.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,rm.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,tm.createValidationResult)(!1,[c],d)}let n=(0,YY.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,g={path:p,config:r.config||null};if(n)return(0,qY.validateObject)(c,n,g);let f=t(c,null),y=(0,JY.getExpectedTypeName)(t),P=(0,VY.stringify)(c);if(f)return(0,tm.createValidationResult)(!0,[],(0,rm.createTreeNode)(p,!0,y,c));let h=P.length>200?`Expected ${p} to be "${y}"`:`Expected ${p} (${P}) to be "${y}"`,u=(0,a0.createValidationError)(p,y,c,h),S=(0,rm.createTreeNode)(p,!1,y,c);return S.errors=[u],(0,tm.createValidationResult)(!1,[u],S)}),i=(0,KY.combineResults)(s,o),a=(0,rm.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,tm.createValidationResult)(i.valid,i.errors,a)};om.validateArray=XY});var em=R(sm=>{"use strict";Object.defineProperty(sm,"__esModule",{value:!0});sm.validateProperty=void 0;var c0=Tn(),ZY=ri(),d0=oi(),QY=gl(),nm=ur(),e7=hl(),t7=l0(),r7=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,nm.getTypeGuardSchema)(r),c=(0,nm.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,e7.validateObject)(t,a,s);if(c&&(0,nm.isArrayTypeGuard)(r))return(0,t7.validateArray)(t,c,s)}let d=p=>{let g=r(t,p),f=(0,QY.getExpectedTypeName)(r);return g?(0,c0.createValidationResult)(!0,[],(0,d0.createTreeNode)(n,!0,f,t)):(()=>{let y=(0,ZY.createValidationError)(n,f,t,`Expected ${n} (${JSON.stringify(t)}) to be "${f}"`),P=(0,d0.createTreeNode)(n,!1,f,t);return P.errors=[y],(0,c0.createValidationResult)(!1,[y],P)})()};if((0,nm.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};sm.validateProperty=r7});var am=R(im=>{"use strict";Object.defineProperty(im,"__esModule",{value:!0});im.isNil=void 0;var o7=H(),n7=function(e,t){return e!=null?(t&&t.callbackOnError((0,o7.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};im.isNil=n7});var SA=R(lm=>{"use strict";Object.defineProperty(lm,"__esModule",{value:!0});lm.isDefined=void 0;var s7=H(),i7=am(),a7=function(e,t){return(0,i7.isNil)(e,null)?(t&&t.callbackOnError((0,s7.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};lm.isDefined=a7});var PA=R(cm=>{"use strict";Object.defineProperty(cm,"__esModule",{value:!0});cm.reportValidationResults=void 0;var l7=Xu(),p0=SA(),c7=am(),d7=(e,t)=>{if(e.valid===!0||(0,c7.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,p0.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,l7.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,p0.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};cm.reportValidationResults=d7});var AA=R(de=>{"use strict";Object.defineProperty(de,"__esModule",{value:!0});de.Validation=de.reportValidationResults=de.validateObject=de.validateProperty=de.createSimplifiedTree=de.combineResults=de.createTreeNode=de.createValidationError=de.createValidationResult=de.getExpectedTypeName=void 0;var p7=gl();Object.defineProperty(de,"getExpectedTypeName",{enumerable:!0,get:function(){return p7.getExpectedTypeName}});var u7=Tn();Object.defineProperty(de,"createValidationResult",{enumerable:!0,get:function(){return u7.createValidationResult}});var m7=ri();Object.defineProperty(de,"createValidationError",{enumerable:!0,get:function(){return m7.createValidationError}});var g7=oi();Object.defineProperty(de,"createTreeNode",{enumerable:!0,get:function(){return g7.createTreeNode}});var f7=fl();Object.defineProperty(de,"combineResults",{enumerable:!0,get:function(){return f7.combineResults}});var y7=Xu();Object.defineProperty(de,"createSimplifiedTree",{enumerable:!0,get:function(){return y7.createSimplifiedTree}});var h7=em();Object.defineProperty(de,"validateProperty",{enumerable:!0,get:function(){return h7.validateProperty}});var S7=hl();Object.defineProperty(de,"validateObject",{enumerable:!0,get:function(){return S7.validateObject}});var P7=PA();Object.defineProperty(de,"reportValidationResults",{enumerable:!0,get:function(){return P7.reportValidationResults}});var A7=Tn(),b7=fl(),_7=ri(),k7=oi(),w7=em(),T7=hl(),E7=PA(),R7=Xu();de.Validation={result:A7.createValidationResult,combine:b7.combineResults,error:_7.createValidationError,treeNode:k7.createTreeNode,property:w7.validateProperty,object:T7.validateObject,report:E7.reportValidationResults,createSimplifiedTree:R7.createSimplifiedTree}});var dm=R(bA=>{"use strict";Object.defineProperty(bA,"__esModule",{value:!0});bA.isType=v7;var u0=Lo(),m0=AA(),C7=ur();function v7(e){if(!(0,u0.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,m0.validateObject)(r,e,s);return(0,m0.reportValidationResults)(i,o||null),i.valid}return(0,u0.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,C7.attachTypeGuardMeta)(t,{schema:e})}});var h0=R(En=>{"use strict";Object.defineProperty(En,"__esModule",{value:!0});En.isNestedType=En.isShape=void 0;En.isSchema=Sl;var g0=Lo(),f0=AA(),y0=ur();function Sl(e){if(!(0,g0.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=I7(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,f0.validateObject)(o,t,i);return(0,f0.reportValidationResults)(a,n||null),a.valid}return(0,g0.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,y0.attachTypeGuardMeta)(r,{schema:t})}function L7(e){return typeof e=="function"?e:Array.isArray(e)?x7(e):typeof e=="object"&&e!==null?Sl(e):e}function I7(e){let t={};for(let[r,o]of Object.entries(e))t[r]=L7(o);return t}function x7(e){let t=e[0],r=Sl(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,y0.attachTypeGuardMeta)(o,{itemGuard:r})}En.isShape=Sl;En.isNestedType=Sl});var S0=R(_A=>{"use strict";Object.defineProperty(_A,"__esModule",{value:!0});_A.isObjectWith=O7;var W7=dm();function O7(e){return(0,W7.isType)(e)}});var P0=R(kA=>{"use strict";Object.defineProperty(kA,"__esModule",{value:!0});kA.isObject=j7;var M7=dm();function j7(e){return(0,M7.isType)(e)}});var A0=R(wA=>{"use strict";Object.defineProperty(wA,"__esModule",{value:!0});wA.guardWithTolerance=N7;function N7(e,t,r){return t(e,r),e}});var b0=R(TA=>{"use strict";Object.defineProperty(TA,"__esModule",{value:!0});TA.isBranded=H7;var D7=H();function H7(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,D7.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var _0=R(pm=>{"use strict";Object.defineProperty(pm,"__esModule",{value:!0});pm.BrandSymbols=void 0;pm.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var k0=R(um=>{"use strict";Object.defineProperty(um,"__esModule",{value:!0});um.isAny=void 0;var F7=function(e){return!0};um.isAny=F7});var Pl=R(EA=>{"use strict";Object.defineProperty(EA,"__esModule",{value:!0});EA.reportTypeGuardError=$7;var z7=H();function $7(e,t,r){e&&e.callbackOnError((0,z7.generateTypeGuardError)(t,e.identifier,r))}});var w0=R(mm=>{"use strict";Object.defineProperty(mm,"__esModule",{value:!0});mm.isBoolean=void 0;var U7=Pl(),B7=function(t,r){return typeof t!="boolean"?((0,U7.reportTypeGuardError)(r,t,"boolean"),!1):!0};mm.isBoolean=B7});var T0=R(gm=>{"use strict";Object.defineProperty(gm,"__esModule",{value:!0});gm.isDate=void 0;var G7=H(),V7=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,G7.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};gm.isDate=V7});var RA=R(fm=>{"use strict";Object.defineProperty(fm,"__esModule",{value:!0});fm.isNumber=void 0;var K7=Pl(),q7=function(t,r){return typeof t!="number"||isNaN(t)?((0,K7.reportTypeGuardError)(r,t,"number"),!1):!0};fm.isNumber=q7});var E0=R(ym=>{"use strict";Object.defineProperty(ym,"__esModule",{value:!0});ym.isString=void 0;var J7=Pl(),Y7=function(t,r){return typeof t!="string"?((0,J7.reportTypeGuardError)(r,t,"string"),!1):!0};ym.isString=Y7});var R0=R(hm=>{"use strict";Object.defineProperty(hm,"__esModule",{value:!0});hm.isUnknown=void 0;var X7=function(e){return!0};hm.isUnknown=X7});var C0=R(Sm=>{"use strict";Object.defineProperty(Sm,"__esModule",{value:!0});Sm.isFunction=void 0;var Z7=H(),Q7=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,Z7.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Sm.isFunction=Q7});var L0=R(Pm=>{"use strict";Object.defineProperty(Pm,"__esModule",{value:!0});Pm.isFile=void 0;var v0=H(),eX=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,v0.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,v0.generateTypeGuardError)(e,t.identifier,"File")),!1)};Pm.isFile=eX});var x0=R(Am=>{"use strict";Object.defineProperty(Am,"__esModule",{value:!0});Am.isFileList=void 0;var I0=H(),tX=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,I0.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,I0.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Am.isFileList=tX});var O0=R(bm=>{"use strict";Object.defineProperty(bm,"__esModule",{value:!0});bm.isBlob=void 0;var W0=H(),rX=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,W0.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,W0.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};bm.isBlob=rX});var j0=R(_m=>{"use strict";Object.defineProperty(_m,"__esModule",{value:!0});_m.isFormData=void 0;var M0=H(),oX=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,M0.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,M0.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};_m.isFormData=oX});var D0=R(km=>{"use strict";Object.defineProperty(km,"__esModule",{value:!0});km.isURL=void 0;var N0=H(),nX=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,N0.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,N0.generateTypeGuardError)(e,t.identifier,"URL")),!1)};km.isURL=nX});var F0=R(wm=>{"use strict";Object.defineProperty(wm,"__esModule",{value:!0});wm.isURLSearchParams=void 0;var H0=H(),sX=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,H0.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,H0.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};wm.isURLSearchParams=sX});var z0=R(Tm=>{"use strict";Object.defineProperty(Tm,"__esModule",{value:!0});Tm.isMap=void 0;var iX=H(),aX=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,iX.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Tm.isMap=aX});var $0=R(Em=>{"use strict";Object.defineProperty(Em,"__esModule",{value:!0});Em.isSet=void 0;var lX=H(),cX=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,lX.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Em.isSet=cX});var U0=R(CA=>{"use strict";Object.defineProperty(CA,"__esModule",{value:!0});CA.isIndexSignature=pX;var dX=H();function pX(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,dX.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let g=s[d],f=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),y=t(g,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return f&&y})}}});var B0=R(Rm=>{"use strict";Object.defineProperty(Rm,"__esModule",{value:!0});Rm.isError=void 0;var uX=Pl(),mX=function(t,r){return t instanceof Error?!0:((0,uX.reportTypeGuardError)(r,t,"Error"),!1)};Rm.isError=mX});var LA=R(vA=>{"use strict";Object.defineProperty(vA,"__esModule",{value:!0});vA.isArrayWithEachItem=yX;var gX=H(),fX=ur();function yX(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,gX.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,fX.attachTypeGuardMeta)(t,{itemGuard:e})}});var IA=R(Cm=>{"use strict";Object.defineProperty(Cm,"__esModule",{value:!0});Cm.isNonEmptyArray=void 0;var hX=H(),SX=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,hX.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Cm.isNonEmptyArray=SX});var G0=R(xA=>{"use strict";Object.defineProperty(xA,"__esModule",{value:!0});xA.isNonEmptyArrayWithEachItem=bX;var PX=LA(),AX=IA();function bX(e){return function(t,r){return(0,PX.isArrayWithEachItem)(e)(t,r)&&(0,AX.isNonEmptyArray)(t,r)}}});var K0=R(WA=>{"use strict";Object.defineProperty(WA,"__esModule",{value:!0});WA.isTuple=_X;var V0=H();function _X(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,V0.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,V0.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var q0=R(OA=>{"use strict";Object.defineProperty(OA,"__esModule",{value:!0});OA.isObjectWithEachItem=wX;var kX=H();function wX(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,kX.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var J0=R(MA=>{"use strict";Object.defineProperty(MA,"__esModule",{value:!0});MA.isPartialOf=EX;var TX=Lo();function EX(e){return function(t,r){if(!(0,TX.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var Y0=R(jA=>{"use strict";Object.defineProperty(jA,"__esModule",{value:!0});jA.isPick=CX;var RX=Lo();function CX(e,...t){return function(r,o){if(!(0,RX.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var X0=R(NA=>{"use strict";Object.defineProperty(NA,"__esModule",{value:!0});NA.isOmit=LX;var vX=Lo();function LX(e,...t){return function(r,o){if(!(0,vX.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),g=p.indexOf(" ("),f=g>=0?p.slice(0,g):p;if(a.has(f))return!1;let y=f.startsWith(s+".")&&f.slice(s.length+1).split(".")[0]||"";return!(y&&!Object.prototype.hasOwnProperty.call(r,y))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var Z0=R(vm=>{"use strict";Object.defineProperty(vm,"__esModule",{value:!0});vm.isNonEmptyString=void 0;var IX=H(),xX=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,IX.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};vm.isNonEmptyString=xX});var Q0=R(Lm=>{"use strict";Object.defineProperty(Lm,"__esModule",{value:!0});Lm.isNonNegativeNumber=void 0;var WX=H(),OX=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,WX.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Lm.isNonNegativeNumber=OX});var eO=R(Im=>{"use strict";Object.defineProperty(Im,"__esModule",{value:!0});Im.isPositiveNumber=void 0;var MX=H(),jX=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,MX.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Im.isPositiveNumber=jX});var tO=R(xm=>{"use strict";Object.defineProperty(xm,"__esModule",{value:!0});xm.isNonPositiveNumber=void 0;var NX=H(),DX=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,NX.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};xm.isNonPositiveNumber=DX});var rO=R(Wm=>{"use strict";Object.defineProperty(Wm,"__esModule",{value:!0});Wm.isNegativeNumber=void 0;var HX=H(),FX=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,HX.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Wm.isNegativeNumber=FX});var oO=R(Om=>{"use strict";Object.defineProperty(Om,"__esModule",{value:!0});Om.isInteger=void 0;var zX=H(),$X=RA(),UX=function(e,t){return!(0,$X.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,zX.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Om.isInteger=UX});var nO=R(Mm=>{"use strict";Object.defineProperty(Mm,"__esModule",{value:!0});Mm.isPositiveInteger=void 0;var BX=H(),GX=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,BX.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};Mm.isPositiveInteger=GX});var sO=R(jm=>{"use strict";Object.defineProperty(jm,"__esModule",{value:!0});jm.isNegativeInteger=void 0;var VX=H(),KX=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,VX.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};jm.isNegativeInteger=KX});var iO=R(Nm=>{"use strict";Object.defineProperty(Nm,"__esModule",{value:!0});Nm.isNonNegativeInteger=void 0;var qX=H(),JX=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,qX.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Nm.isNonNegativeInteger=JX});var aO=R(Dm=>{"use strict";Object.defineProperty(Dm,"__esModule",{value:!0});Dm.isNonPositiveInteger=void 0;var YX=H(),XX=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,YX.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Dm.isNonPositiveInteger=XX});var lO=R(Fm=>{"use strict";Object.defineProperty(Fm,"__esModule",{value:!0});Fm.isNumeric=void 0;var Hm=H(),ZX=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Hm.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Hm.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Hm.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Hm.generateTypeGuardError)(e,t.identifier,"number key")),!1};Fm.isNumeric=ZX});var cO=R(zm=>{"use strict";Object.defineProperty(zm,"__esModule",{value:!0});zm.isBooleanLike=void 0;var DA=H(),QX=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,DA.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,DA.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};zm.isBooleanLike=QX});var dO=R($m=>{"use strict";Object.defineProperty($m,"__esModule",{value:!0});$m.isDateLike=void 0;var Al=H(),e9=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Al.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Al.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Al.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Al.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Al.generateTypeGuardError)(e,t.identifier,"date-like")),!1};$m.isDateLike=e9});var pO=R(Um=>{"use strict";Object.defineProperty(Um,"__esModule",{value:!0});Um.isBigInt=void 0;var t9=H(),r9=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,t9.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Um.isBigInt=r9});var FA=R(HA=>{"use strict";Object.defineProperty(HA,"__esModule",{value:!0});HA.isOneOf=o9;var uO=ti();function o9(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,uO.stringify)(t)}) must be one of following values ${e.map(uO.stringify).join(" | ")}`),o}}});var mO=R(zA=>{"use strict";Object.defineProperty(zA,"__esModule",{value:!0});zA.isOneOfTypes=i9;var n9=ti(),s9=gl();function i9(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,n9.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,s9.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var gO=R($A=>{"use strict";Object.defineProperty($A,"__esModule",{value:!0});$A.isIntersectionOf=a9;function a9(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var fO=R(UA=>{"use strict";Object.defineProperty(UA,"__esModule",{value:!0});UA.isExtensionOf=l9;function l9(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var yO=R(BA=>{"use strict";Object.defineProperty(BA,"__esModule",{value:!0});BA.isNullOr=d9;var c9=ur();function d9(e){function t(r,o){return r===null?!0:e(r,o)}return(0,c9.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var hO=R(GA=>{"use strict";Object.defineProperty(GA,"__esModule",{value:!0});GA.isUndefinedOr=u9;var p9=ur();function u9(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,p9.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var SO=R(VA=>{"use strict";Object.defineProperty(VA,"__esModule",{value:!0});VA.isNilOr=g9;var m9=ur();function g9(e){function t(r,o){return r==null?!0:e(r,o)}return(0,m9.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var PO=R(KA=>{"use strict";Object.defineProperty(KA,"__esModule",{value:!0});KA.isAsserted=f9;function f9(e){return!0}});var AO=R(qA=>{"use strict";Object.defineProperty(qA,"__esModule",{value:!0});qA.isEnum=h9;var y9=FA();function h9(e){return function(t,r){return(0,y9.isOneOf)(...Object.values(e))(t,r)}}});var bO=R(JA=>{"use strict";Object.defineProperty(JA,"__esModule",{value:!0});JA.isEqualTo=A9;var S9=H(),P9=ti();function A9(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,S9.generateTypeGuardError)(t,r.identifier,`equal to ${(0,P9.stringify)(e)}`)),!1):!0}}});var _O=R(Bm=>{"use strict";Object.defineProperty(Bm,"__esModule",{value:!0});Bm.isRegex=void 0;var b9=H(),_9=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,b9.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Bm.isRegex=_9});var wO=R(YA=>{"use strict";Object.defineProperty(YA,"__esModule",{value:!0});YA.isPattern=k9;var kO=H();function k9(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,kO.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,kO.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var TO=R(XA=>{"use strict";Object.defineProperty(XA,"__esModule",{value:!0});XA.by=w9;function w9(e){return function(t){return e(t,null)}}});var EO=R(ZA=>{"use strict";Object.defineProperty(ZA,"__esModule",{value:!0});ZA.toNumber=T9;function T9(e){return typeof e=="number"?e:Number(e)}});var RO=R(QA=>{"use strict";Object.defineProperty(QA,"__esModule",{value:!0});QA.toDate=E9;function E9(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var CO=R(eb=>{"use strict";Object.defineProperty(eb,"__esModule",{value:!0});eb.toBoolean=R9;function R9(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var vO=R(Gm=>{"use strict";Object.defineProperty(Gm,"__esModule",{value:!0});Gm.isSymbol=void 0;var C9=H(),v9=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,C9.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Gm.isSymbol=v9});var ni=R(w=>{"use strict";Object.defineProperty(w,"__esModule",{value:!0});w.isDateLike=w.isBooleanLike=w.isNumeric=w.isNonPositiveInteger=w.isNonNegativeInteger=w.isNegativeInteger=w.isPositiveInteger=w.isInteger=w.isNegativeNumber=w.isNonPositiveNumber=w.isPositiveNumber=w.isNonNegativeNumber=w.isNonEmptyString=w.isOmit=w.isPick=w.isPartialOf=w.isObjectWithEachItem=w.isNonNullObject=w.isTuple=w.isNonEmptyArrayWithEachItem=w.isNonEmptyArray=w.isArrayWithEachItem=w.isError=w.isIndexSignature=w.isSet=w.isMap=w.isURLSearchParams=w.isURL=w.isFormData=w.isBlob=w.isFileList=w.isFile=w.isFunction=w.isUnknown=w.isString=w.isNumber=w.isNil=w.isDefined=w.isDate=w.isBoolean=w.isAny=w.BrandSymbols=w.isBranded=w.guardWithTolerance=w.isObject=w.isObjectWith=w.isNestedType=w.isShape=w.isSchema=w.isType=void 0;w.isSymbol=w.toBoolean=w.toDate=w.toNumber=w.by=w.generateTypeGuardError=w.isPattern=w.isRegex=w.isEqualTo=w.isEnum=w.isAsserted=w.isNilOr=w.isUndefinedOr=w.isNullOr=w.isExtensionOf=w.isIntersectionOf=w.isOneOfTypes=w.isOneOf=w.isBigInt=void 0;var L9=dm();Object.defineProperty(w,"isType",{enumerable:!0,get:function(){return L9.isType}});var tb=h0();Object.defineProperty(w,"isSchema",{enumerable:!0,get:function(){return tb.isSchema}});Object.defineProperty(w,"isShape",{enumerable:!0,get:function(){return tb.isShape}});Object.defineProperty(w,"isNestedType",{enumerable:!0,get:function(){return tb.isNestedType}});var I9=S0();Object.defineProperty(w,"isObjectWith",{enumerable:!0,get:function(){return I9.isObjectWith}});var x9=P0();Object.defineProperty(w,"isObject",{enumerable:!0,get:function(){return x9.isObject}});var W9=A0();Object.defineProperty(w,"guardWithTolerance",{enumerable:!0,get:function(){return W9.guardWithTolerance}});var O9=b0();Object.defineProperty(w,"isBranded",{enumerable:!0,get:function(){return O9.isBranded}});var M9=_0();Object.defineProperty(w,"BrandSymbols",{enumerable:!0,get:function(){return M9.BrandSymbols}});var j9=k0();Object.defineProperty(w,"isAny",{enumerable:!0,get:function(){return j9.isAny}});var N9=w0();Object.defineProperty(w,"isBoolean",{enumerable:!0,get:function(){return N9.isBoolean}});var D9=T0();Object.defineProperty(w,"isDate",{enumerable:!0,get:function(){return D9.isDate}});var H9=SA();Object.defineProperty(w,"isDefined",{enumerable:!0,get:function(){return H9.isDefined}});var F9=am();Object.defineProperty(w,"isNil",{enumerable:!0,get:function(){return F9.isNil}});var z9=RA();Object.defineProperty(w,"isNumber",{enumerable:!0,get:function(){return z9.isNumber}});var $9=E0();Object.defineProperty(w,"isString",{enumerable:!0,get:function(){return $9.isString}});var U9=R0();Object.defineProperty(w,"isUnknown",{enumerable:!0,get:function(){return U9.isUnknown}});var B9=C0();Object.defineProperty(w,"isFunction",{enumerable:!0,get:function(){return B9.isFunction}});var G9=L0();Object.defineProperty(w,"isFile",{enumerable:!0,get:function(){return G9.isFile}});var V9=x0();Object.defineProperty(w,"isFileList",{enumerable:!0,get:function(){return V9.isFileList}});var K9=O0();Object.defineProperty(w,"isBlob",{enumerable:!0,get:function(){return K9.isBlob}});var q9=j0();Object.defineProperty(w,"isFormData",{enumerable:!0,get:function(){return q9.isFormData}});var J9=D0();Object.defineProperty(w,"isURL",{enumerable:!0,get:function(){return J9.isURL}});var Y9=F0();Object.defineProperty(w,"isURLSearchParams",{enumerable:!0,get:function(){return Y9.isURLSearchParams}});var X9=z0();Object.defineProperty(w,"isMap",{enumerable:!0,get:function(){return X9.isMap}});var Z9=$0();Object.defineProperty(w,"isSet",{enumerable:!0,get:function(){return Z9.isSet}});var Q9=U0();Object.defineProperty(w,"isIndexSignature",{enumerable:!0,get:function(){return Q9.isIndexSignature}});var eZ=B0();Object.defineProperty(w,"isError",{enumerable:!0,get:function(){return eZ.isError}});var tZ=LA();Object.defineProperty(w,"isArrayWithEachItem",{enumerable:!0,get:function(){return tZ.isArrayWithEachItem}});var rZ=IA();Object.defineProperty(w,"isNonEmptyArray",{enumerable:!0,get:function(){return rZ.isNonEmptyArray}});var oZ=G0();Object.defineProperty(w,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return oZ.isNonEmptyArrayWithEachItem}});var nZ=K0();Object.defineProperty(w,"isTuple",{enumerable:!0,get:function(){return nZ.isTuple}});var sZ=Lo();Object.defineProperty(w,"isNonNullObject",{enumerable:!0,get:function(){return sZ.isNonNullObject}});var iZ=q0();Object.defineProperty(w,"isObjectWithEachItem",{enumerable:!0,get:function(){return iZ.isObjectWithEachItem}});var aZ=J0();Object.defineProperty(w,"isPartialOf",{enumerable:!0,get:function(){return aZ.isPartialOf}});var lZ=Y0();Object.defineProperty(w,"isPick",{enumerable:!0,get:function(){return lZ.isPick}});var cZ=X0();Object.defineProperty(w,"isOmit",{enumerable:!0,get:function(){return cZ.isOmit}});var dZ=Z0();Object.defineProperty(w,"isNonEmptyString",{enumerable:!0,get:function(){return dZ.isNonEmptyString}});var pZ=Q0();Object.defineProperty(w,"isNonNegativeNumber",{enumerable:!0,get:function(){return pZ.isNonNegativeNumber}});var uZ=eO();Object.defineProperty(w,"isPositiveNumber",{enumerable:!0,get:function(){return uZ.isPositiveNumber}});var mZ=tO();Object.defineProperty(w,"isNonPositiveNumber",{enumerable:!0,get:function(){return mZ.isNonPositiveNumber}});var gZ=rO();Object.defineProperty(w,"isNegativeNumber",{enumerable:!0,get:function(){return gZ.isNegativeNumber}});var fZ=oO();Object.defineProperty(w,"isInteger",{enumerable:!0,get:function(){return fZ.isInteger}});var yZ=nO();Object.defineProperty(w,"isPositiveInteger",{enumerable:!0,get:function(){return yZ.isPositiveInteger}});var hZ=sO();Object.defineProperty(w,"isNegativeInteger",{enumerable:!0,get:function(){return hZ.isNegativeInteger}});var SZ=iO();Object.defineProperty(w,"isNonNegativeInteger",{enumerable:!0,get:function(){return SZ.isNonNegativeInteger}});var PZ=aO();Object.defineProperty(w,"isNonPositiveInteger",{enumerable:!0,get:function(){return PZ.isNonPositiveInteger}});var AZ=lO();Object.defineProperty(w,"isNumeric",{enumerable:!0,get:function(){return AZ.isNumeric}});var bZ=cO();Object.defineProperty(w,"isBooleanLike",{enumerable:!0,get:function(){return bZ.isBooleanLike}});var _Z=dO();Object.defineProperty(w,"isDateLike",{enumerable:!0,get:function(){return _Z.isDateLike}});var kZ=pO();Object.defineProperty(w,"isBigInt",{enumerable:!0,get:function(){return kZ.isBigInt}});var wZ=FA();Object.defineProperty(w,"isOneOf",{enumerable:!0,get:function(){return wZ.isOneOf}});var TZ=mO();Object.defineProperty(w,"isOneOfTypes",{enumerable:!0,get:function(){return TZ.isOneOfTypes}});var EZ=gO();Object.defineProperty(w,"isIntersectionOf",{enumerable:!0,get:function(){return EZ.isIntersectionOf}});var RZ=fO();Object.defineProperty(w,"isExtensionOf",{enumerable:!0,get:function(){return RZ.isExtensionOf}});var CZ=yO();Object.defineProperty(w,"isNullOr",{enumerable:!0,get:function(){return CZ.isNullOr}});var vZ=hO();Object.defineProperty(w,"isUndefinedOr",{enumerable:!0,get:function(){return vZ.isUndefinedOr}});var LZ=SO();Object.defineProperty(w,"isNilOr",{enumerable:!0,get:function(){return LZ.isNilOr}});var IZ=PO();Object.defineProperty(w,"isAsserted",{enumerable:!0,get:function(){return IZ.isAsserted}});var xZ=AO();Object.defineProperty(w,"isEnum",{enumerable:!0,get:function(){return xZ.isEnum}});var WZ=bO();Object.defineProperty(w,"isEqualTo",{enumerable:!0,get:function(){return WZ.isEqualTo}});var OZ=_O();Object.defineProperty(w,"isRegex",{enumerable:!0,get:function(){return OZ.isRegex}});var MZ=wO();Object.defineProperty(w,"isPattern",{enumerable:!0,get:function(){return MZ.isPattern}});var jZ=H();Object.defineProperty(w,"generateTypeGuardError",{enumerable:!0,get:function(){return jZ.generateTypeGuardError}});var NZ=TO();Object.defineProperty(w,"by",{enumerable:!0,get:function(){return NZ.by}});var DZ=EO();Object.defineProperty(w,"toNumber",{enumerable:!0,get:function(){return DZ.toNumber}});var HZ=RO();Object.defineProperty(w,"toDate",{enumerable:!0,get:function(){return HZ.toDate}});var FZ=CO();Object.defineProperty(w,"toBoolean",{enumerable:!0,get:function(){return FZ.toBoolean}});var zZ=vO();Object.defineProperty(w,"isSymbol",{enumerable:!0,get:function(){return zZ.isSymbol}})});var si,LO,$Z,IO,xO=l(()=>{"use strict";si=m(require("node:path")),LO=require("node:url"),$Z=()=>!0,IO=()=>{if($Z()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?si.default.dirname(si.default.resolve(e)):si.default.dirname(si.default.resolve(__filename))}return si.default.dirname((0,LO.fileURLToPath)(__agentWitchImportMetaUrl))}});var rb,WO,F,OO,UZ,mr,ob,C,bl,gr,nb,_l,Rn,sb,ib,ab,kl,fe,Io,Vm,Je,Km,N,lb=l(()=>{"use strict";rb=m(require("node:fs")),WO=m(require("node:os")),F=m(require("node:path")),OO=m(ni());He();xO();Bu();Bu();UZ=IO(),mr=e=>e.trim().toLowerCase(),ob=e=>mr(e).replace(/@/g,"-at-").replace(/\./g,"-").replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,""),C=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return F.default.resolve(e);let t=F.default.resolve(UZ),r=F.default.basename(t),o=F.default.basename(F.default.dirname(t));return r===gA&&(o===pr||o===Fr)?F.default.dirname(t):r===pr||r===Fr?t:F.default.join(WO.default.homedir(),pr)},bl=(e=C())=>F.default.join(e,gA),gr=(e=C())=>F.default.join(bl(e),YW),nb=(e,t,r)=>t!==null?F.default.join(e,st,t,r):F.default.join(e,r),_l=e=>nb(e.installDir,e.profileEmail,dl),Rn=e=>nb(e.installDir,e.profileEmail,$t),sb=e=>F.default.join(e.logsDir,_n),ib=e=>F.default.join(e.logsDir,kn),ab=e=>nb(e.installDir,e.profileEmail,pl),kl=e=>e.profileEmail!==null?F.default.join(e.installDir,st,e.profileEmail,Co):F.default.join(e.installDir,Co),fe=(e=C())=>ul(e),Io=(e=C())=>vo(e)?Fu:Hu,Vm=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return mr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?mr(t):null},Je=(e=C())=>{let t=F.default.join(e,mA);if(!rb.default.existsSync(t))return null;try{let r=JSON.parse(rb.default.readFileSync(t,"utf8"));if((0,OO.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return mr(r.email)}catch{return null}return null},Km=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?mr(r):null}let t=Vm();return t!==null?t:Je()},N=e=>{let t=C(),r=bl(t),o=gr(t),n=Km(e);if(n!==null){let y=F.default.join(t,st,n),P=F.default.join(y,zu),h=F.default.join(y,dl),u=F.default.join(y,bn.projectDataDir),S=F.default.join(y,$t),b=F.default.join(y,pl),k=F.default.join(y,Co),A=F.default.join(y,$t,_n),_=F.default.join(y,$t,kn);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:h,projectDataDir:u,logsDir:S,mainLogPath:A,errorLogPath:_,reportsDir:b,deviceKeypairPath:k,configPath:F.default.join(y,"config.json"),harnessRootDir:P,harnessManifestPath:F.default.join(P,Uu),harnessSetsDir:F.default.join(P,$u)}}let s=F.default.join(t,zu),i=F.default.join(t,dl),a=F.default.join(t,bn.projectDataDir),c=F.default.join(t,$t),d=F.default.join(t,pl),p=F.default.join(t,Co),g=F.default.join(t,$t,_n),f=F.default.join(t,$t,kn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,projectDataDir:a,logsDir:c,mainLogPath:g,errorLogPath:f,reportsDir:d,deviceKeypairPath:p,configPath:F.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:F.default.join(s,Uu),harnessSetsDir:F.default.join(s,$u)}}});var ii,cb=l(()=>{"use strict";ii=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535});var BZ,ai,db=l(()=>{"use strict";BZ=e=>{let t=e?.trim();if(t===void 0||!/^\d+$/.test(t))return null;let r=Number.parseInt(t,10);return r>0&&r<=65535?r:null},ai=e=>e.filePort??BZ(e.envValue)??e.defaultPort});var pb,MO,GZ,wl,li,jO=l(()=>{"use strict";pb=m(require("node:fs")),MO=m(require("node:path"));He();lb();cb();db();GZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wl=e=>{let t=MO.default.join(e,cl.wakePort);if(!pb.default.existsSync(t))return null;try{let r=JSON.parse(pb.default.readFileSync(t,"utf8"));if(GZ(r)&&ii(r.wakePort))return r.wakePort}catch{return null}return null},li=(e=C())=>ai({filePort:wl(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:Io(e)})});var ub={};St(ub,{isAgentWitchLocalInstallDir:()=>vo,isValidAgentWitchWakePort:()=>ii,readActiveProfileEmailFromFile:()=>Je,readAgentWitchWakePortFromFile:()=>wl,resolveActiveProfileEmail:()=>Km,resolveActiveProfileEmailFromEnv:()=>Vm,resolveAgentWitchAppBundlePath:()=>gr,resolveAgentWitchAppDir:()=>bl,resolveAgentWitchDefaultWakePort:()=>Io,resolveAgentWitchDeviceKeypairPath:()=>kl,resolveAgentWitchErrorLogPath:()=>ib,resolveAgentWitchInstallDir:()=>C,resolveAgentWitchLaunchAgentPrefix:()=>fe,resolveAgentWitchLocalLayout:()=>N,resolveAgentWitchLogsDir:()=>Rn,resolveAgentWitchMainLogPath:()=>sb,resolveAgentWitchProjectsDir:()=>_l,resolveAgentWitchReportsDir:()=>ab,resolveAgentWitchRuntimeWakePort:()=>li,resolveAgentWitchWakePortFromSources:()=>ai,sanitizeProfileEmailForDir:()=>mr,sanitizeProfileEmailForLaunchAgentLabel:()=>ob});var G=l(()=>{"use strict";lb();cb();jO();db()});var mb,gb,qm=l(()=>{"use strict";mb=new Set(["","loginwindow","_mbsetupuser","root"]),gb=5e3});var NO,VZ,DO,fb,yb=l(()=>{"use strict";NO=require("node:child_process");qm();VZ=e=>e.trim().toLowerCase(),DO=e=>e==null?!1:!mb.has(VZ(e)),fb=()=>{if(process.platform!=="darwin")return null;try{let t=(0,NO.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return DO(t)?t:null}catch{return null}}});var FO,HO,Ut,Tl=l(()=>{"use strict";FO=m(require("node:os"));yb();HO=e=>e.trim().toLowerCase(),Ut=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?fb():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??FO.default.userInfo().username;return HO(r)===HO(o)}});var zO,$O,Cn,UO=l(()=>{"use strict";zO=require("node:child_process"),$O=m(require("node:fs"));G();Tl();Cn=(e=C())=>{let t=gr(e);if(!$O.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!Ut())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Je(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,zO.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var hb,vt,El,BO=l(()=>{"use strict";hb="AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS",vt=(e=process.env)=>{let t=e.VITEST;return t===void 0||t.length===0?!0:e[hb]==="1"},El=e=>`Refusing ${e} host side effects under VITEST (set ${hb}=1 to override).`});var vn=l(()=>{"use strict";BO()});var GO,Rl,Jm=l(()=>{"use strict";GO=require("node:child_process");vn();Rl=e=>{if(process.platform!=="darwin"||!vt())return;let t=process.getuid?.();if(t!==void 0)try{(0,GO.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Ym,Sb,VO,pe,Xm,Cl=l(()=>{"use strict";Ym=m(require("node:fs")),Sb=m(require("node:path"));G();He();VO=e=>{let t=Sb.default.join(e,st);return Ym.default.existsSync(t)?Ym.default.readdirSync(t).filter(r=>Ym.default.statSync(Sb.default.join(t,r)).isDirectory()).map(r=>mr(r)).toSorted():[]},pe=(e=C())=>{let t=fe(e),r=VO(e);return[{profileEmail:Je(e)??r[0]??null,launchAgentLabel:t}]},Xm=(e=C())=>VO(e)});var Pb,KO,qO,KZ,zr,Zm=l(()=>{"use strict";Pb=m(require("node:fs")),KO=m(require("node:os")),qO=m(require("node:path"));G();Cl();KZ=()=>qO.default.join(KO.default.homedir(),"Library","LaunchAgents"),zr=(e=C())=>{let t=fe(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of pe(e))r.add(n.launchAgentLabel);let o=KZ();if(Pb.default.existsSync(o))for(let n of Pb.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var JO,vl,YO=l(()=>{"use strict";G();Jm();Zm();Cl();JO=(e=C())=>{let t=new Set(pe(e).map(r=>r.launchAgentLabel));return zr(e).filter(r=>!t.has(r))},vl=(e=C())=>{for(let t of JO(e))Rl(t)}});var Ll,Ab=l(()=>{"use strict";G();Jm();Zm();Ll=(e=C())=>{for(let t of zr(e))Rl(t)}});var XO,ZO,qZ,Ln,QO=l(()=>{"use strict";XO=require("node:child_process"),ZO=require("node:util"),qZ=(0,ZO.promisify)(XO.execFile),Ln=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await qZ("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var In,JZ,bb,_b=l(()=>{"use strict";In=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),JZ=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,bb=e=>{let t=e.pathValue??JZ(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${In(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${In(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${In(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${In(e.homeDir)}</string>
    <key>PATH</key>
    <string>${In(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${In(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${In(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var Qm,kb=l(()=>{"use strict";Qm=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Il,wb,eg,tg,$r,rg=l(()=>{"use strict";Il=m(require("node:fs")),wb=m(require("node:os")),eg=m(require("node:path"));He();G();_b();kb();tg=(e,t=wb.default.homedir())=>eg.default.join(t,"Library","LaunchAgents",`${e}.plist`),$r=e=>{let t=e.installDir??C(),r=e.homeDir??wb.default.homedir(),o=tg(e.launchAgentLabel,r),n=Il.default.existsSync(o)?Il.default.readFileSync(o,"utf8"):null;if(n!==null&&Qm(n))return{ok:!0,rewritten:!1,plistPath:o};let s=bb({launchAgentLabel:e.launchAgentLabel,runPath:eg.default.join(t,JW,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??li(t)});if(!Qm(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Il.default.mkdirSync(eg.default.dirname(o),{recursive:!0}),Il.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var tM,rM,oM,xl,YZ,XZ,eM,Ye,Tb=l(()=>{"use strict";tM=require("node:child_process"),rM=m(require("node:fs")),oM=require("node:util");G();vn();rg();Tl();xl=(0,oM.promisify)(tM.execFile),YZ=async e=>{try{return await xl("launchctl",["print",e]),!0}catch{return!1}},XZ=async(e,t,r)=>{await YZ(t)&&await xl("launchctl",["bootout",t]).catch(()=>{}),await xl("launchctl",["bootstrap",e,r]),await xl("launchctl",["enable",t])},eM=async e=>{try{return await xl("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Ye=async(e,t=C())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!vt())return{ok:!1,errorMessage:El("launchctl")};if(!Ut())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=$r({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await eM(n))return{ok:!0};let i=s.plistPath;if(!rM.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await XZ(o,n,i),await eM(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var xn,nM=l(()=>{"use strict";G();Tb();Cl();xn=async(e=C())=>{let t=[];for(let r of pe(e))(await Ye(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var og,ci,sM,iM,aM,lM=l(()=>{"use strict";og=require("node:child_process"),ci=m(require("node:fs")),sM="EnvironmentVariables.AGENT_WITCH_WAKE_PORT",iM=e=>{try{return(0,og.execFileSync)("plutil",["-extract",sM,"raw","-o","-",e],{encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim()}catch{return null}},aM=(e,t)=>{let r=`${e}.${String(process.pid)}.wake-port.tmp`,{mode:o}=ci.default.statSync(e);try{ci.default.copyFileSync(e,r),(0,og.execFileSync)("plutil",["-replace",sM,"-string",String(t),r],{stdio:"ignore"}),(0,og.execFileSync)("plutil",["-lint","-s",r],{stdio:"ignore"}),ci.default.chmodSync(r,o&4095),ci.default.renameSync(r,e)}finally{ci.default.rmSync(r,{force:!0})}}});var cM,dM=l(()=>{"use strict";G();cM=e=>ii(e.filePort)?e.plistValue===null?{kind:"skip-no-entry"}:e.plistValue.trim()===String(e.filePort)?{kind:"noop"}:{kind:"sync",wakePort:e.filePort}:{kind:"skip-invalid"}});var pM,uM,ZZ,Wl,mM=l(()=>{"use strict";pM=m(require("node:fs")),uM=m(require("node:os"));lM();dM();rg();ZZ=(e,t)=>{let r=cM({filePort:t,plistValue:iM(e)});return r.kind!=="sync"?!1:(aM(e,r.wakePort),!0)},Wl=e=>{let t=e.homeDir??uM.default.homedir();return[e.launchAgentPrefix,`${e.launchAgentPrefix}-wake`,`${e.launchAgentPrefix}-live`].map(o=>tg(o,t)).filter(o=>pM.default.existsSync(o)).filter(o=>ZZ(o,e.wakePort))}});var Pt,Ur,gM=l(()=>{"use strict";Ab();Tl();qm();Pt=e=>{Ut()||(Ll(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Ur=(e,t=gb)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{Ut()||e()},t);return()=>{clearInterval(r)}}});var ae=l(()=>{"use strict";r0();UO();Jm();YO();Ab();Zm();Tl();QO();nM();Tb();rg();kb();mM();_b();Cl();yb();qm();gM()});var Eb=l(()=>{"use strict";ae()});var Ol,fM,ng,yM,di,hM,SM,xo=l(()=>{"use strict";Ol=".agent-witch",fM="memory",ng="project.json",yM="chunks.ndjson",di="runs.ndjson",hM="reports",SM=".json"});var PM=l(()=>{"use strict";xo()});var AM,sg,Rb=l(()=>{"use strict";AM=m(require("node:path"));PM();sg=(e,t)=>AM.default.join(e.trim(),`${t.trim()}${SM}`)});var Ml,bM,_M=l(()=>{"use strict";Ml="agent-witch.js",bM="command"});var ig=l(()=>{"use strict";_M()});var Wn,kM,wM=l(()=>{"use strict";ig();Wn=e=>`'${e.replace(/'/g,"'\\''")}'`,kM=e=>{let t=`${e.installDir.trim()}/${"app"}/${Ml}`,r=[Wn("node"),Wn(t),"report","write","--key",Wn(e.reportKey.trim()),"--agent-run-id",Wn(e.agentRunId.trim()),"--status",Wn(e.status),"--summary",Wn(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Wn(e.details.trim())),r.join(" ")}});var fr,TM,QZ,Cb,ag=l(()=>{"use strict";Rb();wM();fr={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},TM=e=>e===fr.COMPLETED||e===fr.FAILED,QZ=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Cb=(e,t)=>{let r=sg(t.reportsDir,t.reportKey),o=kM({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:fr.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${QZ({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Xe=l(()=>{"use strict";He();G()});var Nl,RM,EM,CM,eQ,pi,tQ,vM,Dl,Hl,vb,LM,IM,Fl=l(()=>{"use strict";Nl=m(require("node:fs")),RM=m(require("node:path"));ag();Rb();Xe();EM=50,CM=e=>{let t=N(),r=sg(t.reportsDir,e);return Nl.default.mkdirSync(RM.default.dirname(r),{recursive:!0}),r},eQ=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},pi=e=>{let t=CM(e);if(!Nl.default.existsSync(t))return null;try{let r=JSON.parse(Nl.default.readFileSync(t,"utf8"));return eQ(r)?r:null}catch{return null}},tQ=(e,t)=>{let r=[...e,t];return r.length>EM?r.slice(r.length-EM):r},vM=e=>{let t=CM(e.reportKey);Nl.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Dl=e=>{let t=pi(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:tQ(t?.history??[],o)};return vM(n),n},Hl=e=>{let t=pi(e.reportKey);return t!==null?t:Dl({reportKey:e.reportKey,agentRunId:e.agentRunId,status:fr.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},vb=(e,t)=>{let r=t.trim();if(r.length===0)return pi(e);let o=pi(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return vM(s),s},LM=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},IM=e=>{if(e===null||!TM(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===fr.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var rQ,oQ,zl,xM,lg,Lb=l(()=>{"use strict";ag();Fl();rQ=new Set(Object.values(fr)),oQ=e=>rQ.has(e),zl=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},xM=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},lg=e=>{if(e[0]!=="write")return xM(),1;let r=zl(e,"--key"),o=zl(e,"--agent-run-id"),n=zl(e,"--status"),s=zl(e,"--summary"),i=zl(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!oQ(n)?(xM(),1):(Dl({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var At,On=l(()=>{"use strict";At=()=>!0});var Ib,WM,Mn,cg=l(()=>{"use strict";Ib=m(require("node:path")),WM=require("node:url");On();Mn=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Ib.default.resolve(t);return At()?r===Ib.default.resolve(__filename):e===void 0?!1:r===(0,WM.fileURLToPath)(e)}});var xb,Wb,Ob,ke,Mb=l(()=>{"use strict";xb=["block","warn","info"],Wb=["seed","project","retired"],Ob="warn",ke={symptom:120,cause:200,avoidance:280,checkValue:280,keyword:40,keywords:24,tag:32,tags:12,id:64}});var jb,Br,NM,DM,Nb,Wo,HM=l(()=>{"use strict";Mb();jb=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Br=e=>typeof e=="string"?e:null,NM=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],DM=e=>{if(!jb(e))return null;let t=Br(e.id)?.trim()??"",r=Br(e.symptom)?.trim()??"";if(t.length===0||r.length===0)return null;let o=Wb.find(d=>d===e.source)??"project",n=xb.find(d=>d===e.severity)??Ob,s=jb(e.check)?e.check:null,i=s?.kind==="command"?"command":"id",a=Br(s?.value)?.trim()??"",c=Br(e.projectId)?.trim()??null;return{id:t,projectId:c!==null&&c.length>0?c:null,symptom:r,cause:Br(e.cause)?.trim()??"",avoidance:Br(e.avoidance)?.trim()??"",check:{kind:i,value:a.length>0?a:t},keywords:NM(e.keywords),tags:NM(e.tags),source:o,overridesSeed:e.overridesSeed===!0,hitCount:typeof e.hitCount=="number"&&Number.isFinite(e.hitCount)?Math.max(0,Math.floor(e.hitCount)):0,lastSeenAt:Br(e.lastSeenAt),updatedAt:Br(e.updatedAt),severity:n}},Nb=e=>!jb(e)||!Array.isArray(e.pitfalls)?null:{items:e.pitfalls.map(t=>DM(t)).filter(t=>t!==null),syncedAt:Br(e.syncedAt)},Wo=e=>e.filter(t=>t.source!=="retired").length});var jn,Db=l(()=>{"use strict";jn=e=>e.replace(/\s+/g," ").trim()});var Oo,Hb=l(()=>{"use strict";Oo=e=>Math.ceil(e.length/4)});var dg,FM=l(()=>{"use strict";Hb();dg=(e,t)=>{if(t<=0)return"";if(Oo(e)<=t)return e;let r=t*4;return e.slice(0,r).trimEnd()}});var $l,zM=l(()=>{"use strict";Db();$l=e=>`${jn(e.id)}|${jn(e.avoidance)}`});var $M=l(()=>{"use strict"});var Bt=l(()=>{"use strict";Mb();HM();Db();Hb();FM();zM();$M()});var Nn,ui,mi,gi,Ul,pg,UM,BM,GM,VM,KM,Bl,Gl,ug,fi,mg,Fb,Gt=l(()=>{"use strict";Nn="agent-witch-token-saver",ui=`# BEGIN ${Nn}`,mi=`# END ${Nn}`,gi=`<!-- BEGIN ${Nn} -->`,Ul=`<!-- END ${Nn} -->`,pg=".cursor/rules/agent-witch-check-context.mdc",UM=".cursor/mcp.json",BM=".codex/config.toml",GM=".codex/AGENTS.md",VM=".claude/settings.json",KM="declined-projects.json",Bl="agent-witch",Gl="agent-witch",ug=["mcp"],fi="mcp-hook",mg="check_context",Fb=`${Gl} ${fi} ${mg}`});var gg,fg,yg,yi,zb,Vl,hg=l(()=>{"use strict";Bt();Gt();gg=ke.symptom,fg=ke.cause,yg=ke.avoidance,yi=64,zb="token-saver.db",Vl=1});var Sg,hi,aQ,qfe,Si=l(()=>{"use strict";Sg="agent-witch.js",hi="deps.tar.gz",aQ="install.sh",qfe={mainScript:`app/${Sg}`,depsArchive:`app/${hi}`,installShell:aQ}});var qM=l(()=>{"use strict";Si()});var JM=l(()=>{"use strict";Si();qM()});var Kl,Ub,Pg,lQ,ql,Fe,Ai,Jl,Yl,Dn,Bb=l(()=>{"use strict";Kl=m(require("node:fs")),Ub=m(require("node:path"));JM();G();Pg="install-version.json",lQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ql=(e=C())=>Ub.default.join(e,Pg),Fe=(e=C())=>{let t=ql(e);if(!Kl.default.existsSync(t))return null;try{let r=JSON.parse(Kl.default.readFileSync(t,"utf8"));return!lQ(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Ai=(e,t=C())=>{let r=ql(t);Kl.default.mkdirSync(Ub.default.dirname(r),{recursive:!0}),Kl.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Jl=(e=C())=>Fe(e)?.bundleVersion??"264",Yl=(e,t)=>{let r=Fe(e);if(r!==null)return r;let o={bundleVersion:"264",appOrigin:t,updatedAt:new Date().toISOString()};return Ai(o,e),o},Dn=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var YM,Hn,Gb,Vb,Kb,Ag,hr,Fn,qb=l(()=>{"use strict";YM=require("node:crypto"),Hn=m(require("node:fs")),Gb=m(require("node:path"));G();Vb="self-update-log.ndjson",Kb=100,Ag=(e=C())=>{let t=N(),r=t.installDir===e?t.logsDir:Rn({installDir:e,profileEmail:t.profileEmail});return Gb.default.join(r,Vb)},hr=(e,t=C())=>{let r={id:(0,YM.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Ag(t);Hn.default.mkdirSync(Gb.default.dirname(o),{recursive:!0});let n=Hn.default.existsSync(o)?Hn.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Kb+1)),JSON.stringify(r)];return Hn.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Fn=(e=20,t=C())=>{let r=Ag(t);if(!Hn.default.existsSync(r))return[];let o=Hn.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var Jb,pye,Yb=l(()=>{"use strict";Si();Jb="deps",pye=`${"app"}/${hi}`});var XM=l(()=>{"use strict";Yb()});var ZM,Mo,zn,QM,Xb,Zb,ej=l(()=>{"use strict";ZM=require("node:child_process"),Mo=m(require("node:fs")),zn=m(require("node:path"));Si();Yb();QM=e=>zn.default.join(e,"app",Jb),Xb=e=>{let t=zn.default.join(e,"app"),r=zn.default.join(t,hi);Mo.default.existsSync(r)&&(Mo.default.rmSync(QM(e),{recursive:!0,force:!0}),Mo.default.mkdirSync(t,{recursive:!0}),(0,ZM.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Mo.default.rmSync(r,{force:!0}))},Zb=e=>{Mo.default.rmSync(zn.default.join(e,"node_modules"),{recursive:!0,force:!0}),Mo.default.rmSync(zn.default.join(e,"package.json"),{force:!0}),Mo.default.rmSync(zn.default.join(e,"package-lock.json"),{force:!0})}});var tj=l(()=>{"use strict";XM();ej()});var Xl,Zl=l(()=>{"use strict";Xl="agent-witch.service"});var rj=l(()=>{"use strict";Zl()});var bg,_g,kg=l(()=>{"use strict";bg="AGENT_WITCH_EXTERNAL_BRIDGE",_g="AGENT_WITCH_EXTERNAL_LIVE"});var oj=l(()=>{"use strict";kg();Zl()});var nj,Qb,sj=l(()=>{"use strict";nj=require("node:child_process");Zl();Qb=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,nj.spawn)("systemctl",["--user","restart",Xl],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${Xl} exited ${o??"unknown"}`))})})});var ij=l(()=>{"use strict";Zl();rj();oj();sj()});var bt,wg,aj=l(()=>{"use strict";bt="https://www.agentwitch.com",wg="wss://www.agentwitch.com/api/agent-witch/ws"});var Ql,Gr,lj=l(()=>{"use strict";Ql="127.0.0.1",Gr=`http://${Ql}:43347`});var Lt=l(()=>{"use strict";aj();lj()});var Vt,bi=l(()=>{"use strict";Vt=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var ec,Tg,cj,dQ,t_,pQ,dj,uQ,n_,mQ,s_,Kt,tc,rc,i_,r_,o_,oc,nc,a_,l_,_i=l(()=>{"use strict";ec=m(require("node:fs")),Tg=m(require("node:path"));bi();cj="active-writer-work.json",dQ=1440*60*1e3,t_=new Set,pQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),dj=e=>e.profileEmail===null?Tg.default.join(e.installDir,cj):Tg.default.join(e.installDir,"profiles",e.profileEmail,cj),uQ=e=>{let t=dj(e);if(!ec.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(ec.default.readFileSync(t,"utf8"));if(!pQ(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string")return{activeCount:0,updatedAt:new Date(0).toISOString()};let o=Math.max(0,Math.floor(r.activeCount)),n=typeof r.ownerPid=="number"&&Number.isInteger(r.ownerPid)?r.ownerPid:void 0;return{activeCount:o,updatedAt:r.updatedAt,...n!==void 0?{ownerPid:n}:{}}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},n_=(e,t)=>{let r=dj(e);ec.default.mkdirSync(Tg.default.dirname(r),{recursive:!0}),ec.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},mQ=(e,t={})=>{if(e.activeCount<=0)return!1;let r=t.isPidAlive??Vt;if(e.ownerPid!==void 0&&!r(e.ownerPid))return!0;let o=Date.parse(e.updatedAt);return Number.isNaN(o)?!0:(t.nowMs??Date.now())-o>dQ},s_=e=>{let t=uQ(e);if(!mQ(t))return t;let r={activeCount:0,updatedAt:new Date().toISOString()};try{n_(e,r)}catch{}return r},Kt=e=>s_(e).activeCount>0,tc=e=>{let t=s_(e);n_(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString(),ownerPid:process.pid})},rc=e=>{let t=s_(e),r=Math.max(0,t.activeCount-1);if(n_(e,{activeCount:r,updatedAt:new Date().toISOString(),ownerPid:process.pid}),r===0)for(let o of t_)o()},i_=e=>(t_.add(e),()=>{t_.delete(e)}),r_=null,o_=null,oc=e=>{r_=e},nc=e=>{o_=e},a_=()=>{let e=r_;return r_=null,e},l_=()=>{let e=o_;return o_=null,e}});var ze,Eg=l(()=>{"use strict";ze=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var ki,Rg,sc,c_=l(()=>{"use strict";ki="qwen2.5:7b",Rg="nomic-embed-text",sc="Install Ollama from https://ollama.com/download"});var ic,d_,Cg=l(()=>{"use strict";c_();ic=()=>`
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
    echo "Ollama is missing. ${sc}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${sc}" >&2
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
  agent_witch_ensure_ollama_model "${ki}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${Rg}" "\${pull_log}"
}
`,d_=()=>`
${ic()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var pj,gQ,vg,p_=l(()=>{"use strict";pj=require("node:child_process");G();vn();Cg();gQ=e=>new Promise(t=>{if(!vt()){t({exitCode:1,output:El("Ollama")});return}let r=(0,pj.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:C()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),vg=async(e=gQ)=>{let t=`${ic()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var jo,Lg,uj,fQ,mj,Ti,yQ,hQ,SQ,wi,$n,Un,gj=l(()=>{"use strict";jo=m(require("node:fs")),Lg=m(require("node:path"));tj();ij();ae();G();Si();Lt();Bb();_i();Eg();qb();p_();uj=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fQ=e=>{let t=Je(e),r=t===null?N():N(t);if(!jo.default.existsSync(r.configPath))return null;try{let o=JSON.parse(jo.default.readFileSync(r.configPath,"utf8"));return!uj(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},mj=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!uj(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},Ti=async e=>(await mj(e))?.bundleVersion??null,yQ=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=Lg.default.join(t,r);jo.default.mkdirSync(Lg.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());jo.default.writeFileSync(n,s),r.endsWith(".js")&&jo.default.chmodSync(n,493)},hQ=async()=>{if(process.platform==="linux"){try{await Qb()}catch(e){let t=e instanceof Error?e.message:String(e);console.warn(`[agent-witch-self-update] Linux service restart skipped: ${t}`)}return}vl(),await xn()},SQ=(e,t)=>e!==null?ze(e):t??bt,wi=(e,t)=>({localBundleVersion:t,...e}),$n=async e=>{let t=C(),r=Fe(t),o=r?.bundleVersion??null,n=await vg();hr({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=fQ(t),i=SQ(s,r?.appOrigin);if(i===null){let d=wi({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return hr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await mj(i);if(a===null){let d=wi({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return hr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||Dn(o,a.bundleVersion))){let d=wi({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return hr({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let f of a.scripts)await yQ(i,t,f);let d=Lg.default.join(t,Sg);jo.default.existsSync(d)&&jo.default.rmSync(d,{force:!0}),Xb(t),Zb(t),Ai({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=N(Je(t));if(Kt(p)){nc("install-bundle-update");let f=wi({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return hr({event:"update_applied",ok:!0,message:f.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),f}await hQ();let g=wi({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return hr({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",g=wi({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return hr({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}},Un=()=>{let e=C();return{local:Fe(e),logs:Fn(20,e)}}});var fj={};St(fj,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>Pg,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>sc,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Rg,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>ki,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Vb,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Kb,appendAgentWitchSelfUpdateLog:()=>hr,buildAgentWitchEnsureOllamaShell:()=>ic,buildAgentWitchInstallScriptOllama:()=>d_,buildAgentWitchSelfUpdateStatus:()=>Un,ensureAgentWitchInstallVersionRecorded:()=>Yl,ensureAgentWitchOllamaInstalled:()=>vg,fetchAgentWitchRemoteInstallBundleVersion:()=>Ti,isRemoteAgentWitchBundleVersionNewer:()=>Dn,readAgentWitchInstallVersion:()=>Fe,readAgentWitchSelfUpdateLogs:()=>Fn,resolveAgentWitchAppOriginFromWsUrl:()=>ze,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Jl,resolveAgentWitchInstallVersionPath:()=>ql,resolveAgentWitchSelfUpdateLogPath:()=>Ag,runAgentWitchSelfUpdate:()=>$n,writeAgentWitchInstallVersion:()=>Ai});var Sr=l(()=>{"use strict";Bb();qb();gj();Eg();c_();Cg();p_()});var u_={};St(u_,{buildAgentWitchSelfUpdateStatus:()=>Un,fetchAgentWitchRemoteInstallBundleVersion:()=>Ti,runAgentWitchSelfUpdate:()=>$n});var m_=l(()=>{"use strict";Sr()});function Ei(e){return(0,yj.createHash)("sha256").update(e.trim()).digest("hex")}var yj,Ig=l(()=>{"use strict";yj=require("node:crypto")});var Ri,ac,PQ,Ci,g_,xg=l(()=>{"use strict";Ri=m(require("node:fs")),ac=m(require("node:path"));Ig();Xe();PQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ci=e=>{if(!Ri.default.existsSync(e))return null;try{let t=JSON.parse(Ri.default.readFileSync(e,"utf8"));return!PQ(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Ei(t.pairingToken.trim())}catch{return null}},g_=(e=C())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(Ci(ac.default.join(e,"config.json")));let n=ac.default.join(e,st);if(!Ri.default.existsSync(n))return t;for(let s of Ri.default.readdirSync(n)){let i=ac.default.join(n,s);Ri.default.statSync(i).isDirectory()&&o(Ci(ac.default.join(i,"config.json")))}return t}});var vi,lc=l(()=>{"use strict";vi="connection-health.json"});var Bn,Wg,AQ,cc,ve,f_,Og,$e,Mg=l(()=>{"use strict";Bn=m(require("node:fs")),Wg=m(require("node:path"));lc();AQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cc=e=>e.profileEmail===null?Wg.default.join(e.installDir,vi):Wg.default.join(e.installDir,"profiles",e.profileEmail,vi),ve=e=>{let t=cc(e);if(!Bn.default.existsSync(t))return null;try{let r=JSON.parse(Bn.default.readFileSync(t,"utf8"));return!AQ(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},f_=e=>{let t=cc(e);Bn.default.existsSync(t)&&Bn.default.rmSync(t,{force:!0})},Og=(e,t)=>{let r=cc(e),o=ve(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Bn.default.mkdirSync(Wg.default.dirname(r),{recursive:!0}),Bn.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},$e=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var dc,hj=l(()=>{"use strict";lc();Mg();dc=(e,t)=>{if(!t.socketOpen)return!1;let r=ve(e);return r===null?!1:!$e(r,t.staleAfterMs??12e4,t.nowMs)}});var y_,Sj=l(()=>{"use strict";Mg();y_=(e,t)=>!(e!==null&&!$e(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Gn=l(()=>{"use strict";Mg();hj();Sj();lc()});var jg,h_,bQ,_Q,Pj,Aj=l(()=>{"use strict";jg=m(require("node:fs")),h_=m(require("node:path"));G();He();Gn();xg();bQ=12e4,_Q=e=>{let t=h_.default.join(e,st);return jg.default.existsSync(t)?jg.default.readdirSync(t).filter(r=>jg.default.statSync(h_.default.join(t,r)).isDirectory()):[]},Pj=(e=C())=>{let t=null,r=-1;for(let o of _Q(e)){let n=N(o),s=ve(n);if(s===null||$e(s,bQ))continue;let i=Ci(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var S_,bj,Ng,pc,uc,kQ,wQ,TQ,_j,we,Te,Dg,Pr,qt=l(()=>{"use strict";S_=m(require("node:fs")),bj=m(require("node:os")),Ng=m(require("node:path")),pc={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},uc=e=>e.trim().length>0,kQ=e=>{let t=Ng.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},wQ=()=>{let e=bj.default.homedir(),t=Ng.default.join(e,".local","bin","agent");if(S_.default.existsSync(t))return t;let r=Ng.default.join(e,".local","bin","cursor-agent");return S_.default.existsSync(r)?r:pc.cursorCommand},TQ=e=>{let t=e.trim();return!uc(t)||t===pc.cursorCommand?wQ():t},_j=(e,t)=>kQ(e)?t:["agent",...t],we=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Te=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:uc(t)?t.trim():pc.claudeCommand,codexCommand:uc(r)?r.trim():pc.codexCommand,cursorCommand:TQ(o),antigravityCommand:uc(n)?n.trim():pc.antigravityCommand}},Dg=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:_j(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Pr=(e,t,r,o)=>{let n=t.trim();if(!uc(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:_j(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"--dangerously-skip-permissions","-p",n]}}});var No,EQ,Vn,RQ,Li,mc=l(()=>{"use strict";No=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,EQ=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:No(s.inputTokens)+No(s.outputTokens)+No(s.cacheReadInputTokens)+No(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Vn=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=No(a.input_tokens)+No(a.cache_creation_input_tokens)+No(a.cache_read_input_tokens),d=No(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:EQ(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},RQ=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),Li=(e,t)=>{let r=Vn(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??RQ(r)}}});var P_,CQ,vQ,A_,b_=l(()=>{"use strict";P_=e=>e.toLocaleString("en-US"),CQ=e=>e<.01?e.toFixed(4):e.toFixed(3),vQ=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${CQ(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${P_(e.inputTokens)} in / ${P_(e.outputTokens)} out (${P_(e.totalTokens)} total)`,t].join(`
`)},A_=(e,t)=>{if(t===void 0)return e;let r=vQ(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Hg,__=l(()=>{"use strict";Hg={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Kn,k_,Fg,w_=l(()=>{"use strict";__();Kn="auto",k_=e=>({value:Kn,label:`Auto (${Hg[e]})`}),Fg={anthropic:[k_("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[k_("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[k_("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Ii,gc,zg,xi=l(()=>{"use strict";__();w_();Ii=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Kn))return t},gc=(e,t)=>{let r=Ii(t);return r===void 0?Hg[e]:r},zg=e=>{let t=Ii(e);return t===void 0?Kn:t}});var $g,LQ,IQ,Ug,kj=l(()=>{"use strict";$g={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},LQ=e=>{let t=$g[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?$g["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?$g["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?$g["gemini-2.0-flash"]:null},IQ=(e,t,r)=>{let o=LQ(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},Ug=e=>{let t=IQ(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Wi,xQ,WQ,OQ,Bg,wj=l(()=>{"use strict";kj();Wi=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),xQ=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Wi(r.input_tokens),n=Wi(r.output_tokens);return o===0&&n===0?null:Ug({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},WQ=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Wi(r.prompt_tokens),n=Wi(r.completion_tokens);return o===0&&n===0?null:Ug({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},OQ=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=Wi(r.promptTokenCount),n=Wi(r.candidatesTokenCount);return o===0&&n===0?null:Ug({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Bg=(e,t,r)=>e==="anthropic"?xQ(t,r):e==="openai"?WQ(t,r):OQ(t,r)});var MQ,T_,jQ,NQ,DQ,HQ,FQ,E_,R_=l(()=>{"use strict";xi();wj();MQ=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},T_=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:gc(e,t.model)},jQ=async e=>{let t=T_("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=MQ(o);n.length>0&&e.onChunk?.(n);let s=Bg("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},NQ=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},DQ=async e=>{let t=T_("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=NQ(o);n.length>0&&e.onChunk?.(n);let s=Bg("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},HQ=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},FQ=async e=>{let t=T_("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=HQ(n);s.length>0&&e.onChunk?.(s);let i=Bg("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},E_=async e=>{try{return e.provider==="anthropic"?await jQ(e):e.provider==="openai"?await DQ(e):await FQ(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var _t,fc=l(()=>{"use strict";_t=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var Tj,zQ,Gg,C_=l(()=>{"use strict";Tj=m(require("node:path")),zQ="writer-api-secrets.json",Gg=e=>Tj.default.join(e,zQ)});var v_,Ej,$Q,Do,ct,Ho=l(()=>{"use strict";v_=m(require("node:fs"));xi();C_();Ej=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$Q=e=>{if(!Ej(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=Ii(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},Do=e=>{let t=Gg(e);if(!v_.default.existsSync(t))return{};try{let r=JSON.parse(v_.default.readFileSync(t,"utf8"));if(!Ej(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=$Q(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},ct=(e,t)=>Do(e)[t]??null});var Ze,yc=l(()=>{"use strict";Ze=e=>e==="api"?"api":"cli"});var Rj,Be,qn,Vr=l(()=>{"use strict";Rj=m(require("node:path"));fc();Ho();yc();Be=e=>Rj.default.dirname(e),qn=(e,t)=>{if(Ze(e.writerExecutionBackend)!=="api")return!1;let r=_t(t);if(r===null)return!1;let o=Be(e.layout.configPath),n=ct(o,r);return n!==null&&n.apiKey.length>0}});var hc,L_=l(()=>{"use strict";b_();R_();fc();Ho();Vr();hc=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=_t(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Be(e.layout.configPath),a=ct(i,s);if(a===null){let d=Object.keys(Do(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await E_({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:A_(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var Cj,Oi,I_=l(()=>{"use strict";Cj=require("node:child_process");qt();mc();L_();Vr();Oi=(e,t,r)=>new Promise(o=>{if(!we(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(qn(e,t)){hc(e,t,r).then(o);return}let n=Pr(t,r,Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,Cj.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=Li(i.join("")),p=a.join("").trim(),g=[d.output.trim(),p].filter(f=>f.length>0).join(`
`);o({exitCode:c??-1,output:g})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var vj=l(()=>{"use strict"});var Lj=l(()=>{"use strict";b_();I_();R_();vj();Ho();Vr()});var Ij,xj,Wj,Oj=l(()=>{"use strict";Ij="claude",xj="codex",Wj="cursor"});var Mj,UQ,x_,Sc,Vg=l(()=>{"use strict";Mj=m(require("node:path"));Lt();He();UQ="ws://localhost:3000/api/agent-witch/ws",x_=e=>e.replace(/\/$/,""),Sc=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return x_(t);let r=Mj.default.basename(e.installDir);if(r===ll.production)return wg;let o=e.configWsUrl?.trim()??"";return r===ll.localhost?o.length>0?x_(o):UQ:o.length>0?x_(o):wg}});var GQ,W_,O_=l(()=>{"use strict";Oj();Vg();yc();GQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),W_=e=>{if(!GQ(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Sc({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??Ij,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??xj,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??Wj,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Ze(t.writerExecutionBackend),layout:e.layout}}}});var M_,j_,N_=l(()=>{"use strict";M_=m(require("node:fs"));G();O_();j_=e=>{let t=N(e);if(!M_.default.existsSync(t.configPath))return null;try{let r=JSON.parse(M_.default.readFileSync(t.configPath,"utf8")),o=W_({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Pc,jj=l(()=>{"use strict";Pc=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var D_,VQ,H_,Nj=l(()=>{"use strict";D_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),VQ=e=>{if(!D_(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!D_(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(g=>{if(!D_(g))return[];let f=typeof g.itemKey=="string"?g.itemKey.trim():"",y=typeof g.relativePath=="string"?g.relativePath:"",P=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return f.length===0||P.length===0?[]:[{itemKey:f,relativePath:y,contentSha256:P}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},H_=VQ});var Dj,KQ,Kg,F_=l(()=>{"use strict";Dj=m(require("node:path")),KQ=(e,t)=>{let r=t.trim();return Dj.default.join(e,"components","store",r.slice(0,2),r)},Kg=KQ});var Hj,qQ,z_,Fj=l(()=>{"use strict";Hj=m(require("node:fs"));F_();qQ=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Kg(e.installDir,n.contentSha256);Hj.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},z_=qQ});var Ac,Mi,JQ,$_,YQ,U_,B_=l(()=>{"use strict";Ac=m(require("node:fs")),Mi=m(require("node:path"));F_();JQ=(e,t)=>Mi.default.join(e.installDir,"runs",t,"overlay"),$_=(e,t)=>Mi.default.join(JQ(e,t),".cursor"),YQ=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=$_(e,t);Ac.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Kg(e.installDir,i.contentSha256);if(!Ac.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Mi.default.join(n,c):Mi.default.join(n,i.itemKey);Ac.default.mkdirSync(Mi.default.dirname(d),{recursive:!0}),Ac.default.copyFileSync(a,d)}return{ok:!0}},U_=YQ});var G_,zj,XQ,bc,$j=l(()=>{"use strict";G_=m(require("node:fs")),zj=m(require("node:path")),XQ=(e,t)=>{let r=zj.default.join(e.installDir,"runs",t);G_.default.existsSync(r)&&G_.default.rmSync(r,{recursive:!0,force:!0})},bc=XQ});var ZQ,V_,Uj=l(()=>{"use strict";B_();ZQ=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=$_(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},V_=ZQ});var K_,QQ,eee,tee,ree,oee,z,Bj=l(()=>{"use strict";K_=m(require("node:fs"));Vg();G();yc();QQ="claude",eee="codex",tee="cursor",ree="agy",oee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),z=()=>{let e=N();if(!K_.default.existsSync(e.configPath))return null;try{let t=JSON.parse(K_.default.readFileSync(e.configPath,"utf8"));if(!oee(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Sc({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Ze(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:QQ,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:eee,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:tee,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:ree,pairingToken:s,layout:e}}catch{return null}}});var qg,Gj,Vj=l(()=>{"use strict";qg=m(require("node:fs"));C_();Gj=(e,t)=>{let r=Gg(e);qg.default.mkdirSync(e,{recursive:!0}),qg.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{qg.default.chmodSync(r,384)}catch{}}});var _c,Kj,Jg=l(()=>{"use strict";_c=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},Kj=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===_c(t)}});var kc,nee,q_,J_,qj=l(()=>{"use strict";kc=m(require("node:fs"));Ho();Vj();Jg();xi();Vr();nee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),q_=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=Kj(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?Ii(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},J_=e=>{let t=Be(e.configPath),r={};if(kc.default.existsSync(e.configPath))try{let n=JSON.parse(kc.default.readFileSync(e.configPath,"utf8"));nee(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,kc.default.mkdirSync(t,{recursive:!0}),kc.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=q_(q_(q_(Do(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);Gj(t,o)}});var Yg,Y_=l(()=>{"use strict";Yg={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var X_,Jj=l(()=>{"use strict";fc();Ho();Vr();Vr();X_=(e,t)=>{if(qn(e,t)||t==="antigravity")return!1;let r=_t(t);if(r===null)return!1;let o=Be(e.layout.configPath),n=ct(o,r);return n===null||n.apiKey.trim().length===0}});var Yj,Z_,Q_=l(()=>{"use strict";Yj=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},Z_=async e=>{let t=Yj(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=Yj(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var see,ek,Xj=l(()=>{"use strict";ae();N_();Q_();see=1e4,ek=()=>Z_({listProfileEmails:Xm,readConfig:j_,pollIntervalMs:see,logWaiting:e=>{console.error(e)}})});var iee,tk,Zj=l(()=>{"use strict";iee={accepted:"Restart accepted; Local is restarting.",already_in_progress:"Restart already in progress.",deferred_writer_busy:"Restart deferred until the active writer task finishes.",unsupported:"This Agent Witch Local cannot handle Connect/restart. Update from /download."},tk=e=>({status:e.status,reason:e.reason,message:iee[e.status]})});var ee=l(()=>{"use strict";I_();Lj();N_();Vg();jj();Nj();Fj();B_();$j();Uj();yc();Bj();qj();Ho();Vr();Jg();xi();Y_();L_();Vr();Jj();fc();Ho();Xj();O_();Q_();Zj()});var Qj,rk,eN=l(()=>{"use strict";Qj=m(require("node:path"));G();He();Aj();Ig();xg();ee();rk=(e=C())=>{let t=Pj(e);if(t!==null)return t;let r=Je(e);if(r!==null){let n=Ci(Qj.default.join(e,st,r,"config.json"));if(n!==null)return n}let o=z()?.pairingToken.trim()??"";return o.length===0?null:Ei(o)}});var Xg,tN,aee,lee,rN,Zg,wc,Qg,Tc=l(()=>{"use strict";Xg=m(require("node:fs")),tN=m(require("node:path")),aee="wake-port.json",lee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rN=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Zg=e=>tN.default.join(e,aee),wc=e=>{let t=Zg(e);if(!Xg.default.existsSync(t))return null;try{let r=JSON.parse(Xg.default.readFileSync(t,"utf8"));if(lee(r)&&rN(r.wakePort))return r.wakePort}catch{return null}return null},Qg=(e,t)=>{if(!rN(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Zg(e);Xg.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var PAe,AAe,bAe,Jt,oN,Ec=l(()=>{"use strict";G();Tc();Xe();Tc();PAe=Io(),AAe=`${fe()}-wake`,bAe=fe(),Jt=()=>{let e=C();return ai({filePort:wc(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:Io(e)})},oN=e=>{let t=C();wc(t)===null&&Qg(t,e)}});var nN=l(()=>{"use strict";Ig();ae();xg();eN();ee();Ec()});var ok,Rc,Cc,sN=l(()=>{"use strict";ok=m(require("node:os"));nN();Rc=()=>{let e=pe();return{ok:!0,port:Jt(),hostname:ok.default.hostname(),profileCount:e.length}},Cc=()=>{let e=pe(),t=rk(),r=g_();return{hostname:ok.default.hostname(),port:Jt(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var nk=l(()=>{"use strict";sN()});var iN,aN,lN,ef,ji=l(()=>{"use strict";iN="materialization.json",aN="backups",lN=".gitignore",ef=e=>`harness-set:${e.trim()}`});var cN,dN,tf,pN=l(()=>{"use strict";cN=m(require("node:crypto")),dN=m(require("node:fs")),tf=e=>{try{let t=dN.default.readFileSync(e);return cN.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Fo,Jn,cee,uN,sk,mN=l(()=>{"use strict";Fo=m(require("node:fs")),Jn=m(require("node:path"));pN();cee=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=Jn.default.join(t,n,o);return Fo.default.mkdirSync(Jn.default.dirname(s),{recursive:!0}),Fo.default.copyFileSync(r,s),Jn.default.relative(e,s).replaceAll("\\","/")},uN=e=>{let t=Jn.default.join(e.repoRoot,e.repoRelativeDestination),r=tf(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(Fo.default.existsSync(t)){let n=tf(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=cee(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Fo.default.mkdirSync(Jn.default.dirname(t),{recursive:!0}),Fo.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Fo.default.mkdirSync(Jn.default.dirname(t),{recursive:!0}),Fo.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},sk=e=>{let t=tf(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var ik,gN,Ni,rf=l(()=>{"use strict";ik=m(require("node:fs"));ji();gN=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ni=e=>{if(!ik.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(ik.default.readFileSync(e,"utf8"));if(gN(t)&&t.version===1&&gN(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var zo,of,nf,ak=l(()=>{"use strict";zo=m(require("node:fs")),of=m(require("node:path"));ji();nf=e=>{let t=new Set(e.setSlugs.map(s=>ef(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=of.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=of.default.join(e.repoRoot,i.backupPath);zo.default.existsSync(c)?(zo.default.mkdirSync(of.default.dirname(a),{recursive:!0}),zo.default.copyFileSync(c,a),o.push(s)):zo.default.existsSync(a)&&zo.default.rmSync(a,{force:!0})}else zo.default.existsSync(a)&&zo.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var lk,Di,sf=l(()=>{"use strict";lk=m(require("node:path"));ji();Di=e=>({ledgerFilePath:lk.default.join(e.metaDirPath,iN),backupsDirPath:lk.default.join(e.metaDirPath,aN)})});var ck,fN,yN=l(()=>{"use strict";ck=m(require("node:path")),fN=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return ck.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return ck.default.posix.join(s,e,n)}});var dk,hN,Lc,pk=l(()=>{"use strict";dk=m(require("node:fs")),hN=m(require("node:path")),Lc=(e,t)=>{dk.default.mkdirSync(hN.default.dirname(e),{recursive:!0}),dk.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var uk,dee,Qe,$o=l(()=>{"use strict";uk=m(require("node:os")),dee=e=>{let t=e.trim();return t.startsWith("~/")?`${uk.default.homedir()}${t.slice(1)}`:t==="~"?uk.default.homedir():t},Qe=dee});var af,SN,pee,PN,AN=l(()=>{"use strict";af=m(require("node:fs")),SN=m(require("node:path"));ji();xo();pee=`*
!${ng}
`,PN=e=>{let t=SN.default.join(e,lN);af.default.existsSync(t)||(af.default.mkdirSync(e,{recursive:!0}),af.default.writeFileSync(t,pee))}});var Yn,It,Xn=l(()=>{"use strict";Yn=m(require("node:path"));xo();$o();It=e=>{let t=Qe(e),r=Yn.default.join(t,Ol);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Yn.default.join(r,"rag"),memoryDirPath:Yn.default.join(r,fM),reportsDirPath:Yn.default.join(r,hM),metaFilePath:Yn.default.join(r,ng),ragChunksFilePath:Yn.default.join(r,"rag",yM)}}});var Ar,_N,uee,mee,it,lf=l(()=>{"use strict";Ar=m(require("node:fs")),_N=m(require("node:path"));xo();AN();Xn();uee=(e,t)=>{if(Ar.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Ar.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},mee=e=>{Ar.default.existsSync(e.ragChunksFilePath)||Ar.default.writeFileSync(e.ragChunksFilePath,"");let t=_N.default.join(e.memoryDirPath,di);Ar.default.existsSync(t)||Ar.default.writeFileSync(t,"")},it=e=>{let t=It(e.projectFolderPath);return Ar.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Ar.default.mkdirSync(t.ragDirPath,{recursive:!0}),Ar.default.mkdirSync(t.memoryDirPath,{recursive:!0}),PN(t.metaDirPath),uee(t,e),mee(t),{ok:!0,layout:t}}});var kN,wN,TN,EN,cf,df=l(()=>{"use strict";kN="components",wN="store",TN="versions",EN="installed.json",cf=e=>`harness-set:${e.trim()}`});var mk,RN,pf,gk=l(()=>{"use strict";mk=m(require("node:fs")),RN=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pf=e=>{if(!mk.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(mk.default.readFileSync(e,"utf8"));if(RN(t)&&t.version===1&&RN(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var Ic,Hi,uf=l(()=>{"use strict";Ic=m(require("node:path"));df();Hi=e=>{let t=Ic.default.join(e,kN);return{componentsRootDir:t,storeDir:Ic.default.join(t,wN),versionsDir:Ic.default.join(t,TN),installedFilePath:Ic.default.join(t,EN)}}});var fk,CN,mf,gf,ff=l(()=>{"use strict";fk=m(require("node:crypto")),CN=m(require("node:fs")),mf=e=>fk.default.createHash("sha256").update(e,"utf8").digest("hex"),gf=e=>{try{let t=CN.default.readFileSync(e);return fk.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var yk,vN,LN,IN=l(()=>{"use strict";yk=m(require("node:fs")),vN=m(require("node:path")),LN=(e,t)=>{yk.default.mkdirSync(vN.default.dirname(e),{recursive:!0}),yk.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var hk,Sk,xN,WN=l(()=>{"use strict";hk=m(require("node:fs")),Sk=m(require("node:path")),xN=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=Sk.default.join(e,r),n=Sk.default.join(o,`${t.versionId}.json`);hk.default.mkdirSync(o,{recursive:!0}),hk.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var yf,ON,MN,jN=l(()=>{"use strict";yf=m(require("node:fs")),ON=m(require("node:path"));ff();MN=e=>{let t=mf(e.content),r=ON.default.join(e.storeDir,t);return yf.default.existsSync(r)||(yf.default.mkdirSync(e.storeDir,{recursive:!0}),yf.default.writeFileSync(r,e.content)),t}});var Pk,NN,gee,hf,Ak=l(()=>{"use strict";Pk=m(require("node:fs")),NN=m(require("node:path"));df();gk();uf();ff();IN();WN();jN();gee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hf=e=>{let t=Hi(e.installDir),r=cf(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!gee(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=NN.default.join(e.harnessRootDir,a);if(!Pk.default.existsSync(c))continue;let d=Pk.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:gf(c);if(p!==null){if(mf(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);MN({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;xN(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=pf(t.installedFilePath);LN(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var _k,bk,DN,HN=l(()=>{"use strict";_k=m(require("node:fs"));Ak();gk();uf();bk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),DN=e=>{if(!_k.default.existsSync(e.harnessManifestPath))return;let t=Hi(e.installDir),r=pf(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(_k.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!bk(o)||o.version!==1||!bk(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!bk(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];hf({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var kk,FN,zN,$N=l(()=>{"use strict";kk=m(require("node:fs")),FN=m(require("node:path")),zN=e=>{let t=e.componentId.replaceAll("/","_"),r=FN.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!kk.default.existsSync(r))return null;try{let o=JSON.parse(kk.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Sf,Pf,UN,BN=l(()=>{"use strict";Sf=m(require("node:fs")),Pf=m(require("node:path"));df();HN();$N();uf();ff();UN=e=>{DN({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Hi(e.layout.installDir),r=cf(e.setSlug),o=zN({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Pf.default.join(t.storeDir,i.contentSha256);if(Sf.default.existsSync(a)&&gf(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Pf.default.join(e.layout.harnessRootDir,n):Pf.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Sf.default.existsSync(s))return null;try{if(!Sf.default.statSync(s).isFile())return null}catch{return null}return s}});var GN,fee,wk,br,xc=l(()=>{"use strict";rf();sf();Xn();GN="harness-set:",fee=e=>{let t=e.trim();if(!t.startsWith(GN))return null;let r=t.slice(GN.length).trim();return r.length>0?r:null},wk=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=fee(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},br=e=>{let t=It(e),{ledgerFilePath:r}=Di(t),o=Ni(r);return wk(o)}});var Af,Tk,Wc,yee,Kr,Oc,Fi=l(()=>{"use strict";Af=m(require("node:fs")),Tk=m(require("node:os")),Wc=m(require("node:path")),yee=()=>Af.default.realpathSync(Wc.default.resolve(Tk.default.homedir())),Kr=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Wc.default.join(Tk.default.homedir(),t.slice(1)):t,o;try{o=Af.default.realpathSync(Wc.default.resolve(r))}catch{return null}let n=yee();return o===n||o.startsWith(`${n}${Wc.default.sep}`)?o:null},Oc=e=>{let t=Kr(e);if(t===null)return null;try{if(!Af.default.statSync(t).isFile())return null}catch{return null}return t}});var Ek,Rk=l(()=>{"use strict";Ek=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var _f,VN,bf,hee,Mc,Ck=l(()=>{"use strict";_f=m(require("node:fs")),VN=m(require("node:path"));ji();mN();rf();ak();sf();yN();pk();$o();lf();BN();xc();Fi();Rk();bf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hee=e=>{if(!_f.default.existsSync(e))return null;try{let t=JSON.parse(_f.default.readFileSync(e,"utf8"));if(bf(t)&&t.version===1)return t}catch{return null}return null},Mc=e=>{let t=[...new Set(e.setSlugs.map(S=>S.trim()).filter(S=>S.length>0))],r=Qe(e.projectFolderPath),o=Kr(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=_f.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=it({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Di(s.layout),d=br(o).filter(S=>!t.includes(S)),p=Ni(i),g=0;if(d.length>0){let S=nf({repoRoot:o,setSlugs:d,ledger:p});p=S.ledger,g=S.summary.removedPaths.length}if(t.length===0)return Lc(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:[]};let f=hee(e.layout.harnessManifestPath);if(f===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let y=bf(f.sets)?f.sets:{},P=0,h=0,u=0;for(let S of t){let b=y[S];if(!bf(b))return{ok:!1,errorMessage:`Harness set "${S}" is not installed locally.`};let k=typeof b.version=="number"?String(b.version):"1",A=ef(S),_=Array.isArray(b.items)?b.items:[];for(let E of _){if(!bf(E))continue;let T=typeof E.path=="string"?E.path.trim():"";if(T.length===0)continue;let v=Ek(T);if(v===null)continue;let I=fN(S,v),W=VN.default.posix.join(".cursor",I).replaceAll("\\","/"),j=typeof E.id=="string"?E.id.trim():"",M=UN({layout:e.layout,setSlug:S,setVersion:typeof b.version=="number"?b.version:1,manifestItemPath:T,manifestItemId:j});if(M===null)continue;let B=uN({repoRoot:o,backupsDir:a,repoRelativeDestination:W,sourceAbsolutePath:M,componentId:A,versionId:k,ledger:p});if(B.kind==="skipped_unchanged"){h+=1;continue}if(B.kind==="backed_up_user_file"){u+=1,P+=1,p={version:1,entries:{...p.entries,[W]:sk({componentId:A,versionId:k,sourceAbsolutePath:M,backupPath:B.backupPath})}};continue}P+=1,p={version:1,entries:{...p.entries,[W]:sk({componentId:A,versionId:k,sourceAbsolutePath:M})}}}}return P===0&&h===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(Lc(i,p),{ok:!0,writtenFileCount:P,skippedFileCount:h,backedUpFileCount:u,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:t})}});var KN,kf,See,Pee,Aee,bee,_ee,kee,wee,Tee,Eee,jc,wf=l(()=>{"use strict";KN=m(require("node:crypto")),kf=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},See=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},Pee=(e,t)=>{let r=See(t),o=kf(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},Aee=(e,t,r)=>{let o=Pee(t,r);return`shared/items/${e}/${o}`},bee=["rules","skills","commands","instructions","agents"],_ee=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),kee=(e,t)=>[...e.filter(o=>o.id!==t.id),t],wee=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},Tee=e=>KN.default.createHash("sha256").update(e,"utf8").digest("hex"),Eee=e=>({id:e.id,kind:e.kind,title:e.title,path:Aee(e.id,e.kind,e.title),contentSha256:Tee(e.content)}),jc=e=>{let t=new Date().toISOString(),r=e.existingManifest??_ee(e.hostname,t),o=kf(e.bundle.slug),n=wee(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...bee.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let g=Eee(p);return{files:[...d.files,{relativePath:g.path,content:p.content}],nextItems:kee(d.nextItems,g)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var Uo,qN,Tf,Ree,Zn,vk=l(()=>{"use strict";Uo=m(require("node:fs")),qN=m(require("node:os")),Tf=m(require("node:path"));wf();Ree=e=>{if(!Uo.default.existsSync(e))return null;try{let t=JSON.parse(Uo.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Zn=e=>{try{let t=Ree(e.layout.harnessManifestPath),r=jc({bundle:e.bundle,hostname:qN.default.hostname(),existingManifest:t});Uo.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)Uo.default.mkdirSync(Tf.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Tf.default.join(e.layout.harnessRootDir,o.relativePath);Uo.default.mkdirSync(Tf.default.dirname(n),{recursive:!0}),Uo.default.writeFileSync(n,o.content)}return Uo.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var Lk,JN=l(()=>{"use strict";vk();Ck();Lk=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=Zn({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Mc({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var YN,XN=l(()=>{"use strict";YN=["rule","skill","command","instruction","agent"]});var ZN,Cee,vee,_r,Ik=l(()=>{"use strict";XN();ZN=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Cee=e=>typeof e=="string"&&YN.includes(e),vee=e=>{if(!ZN(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!Cee(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},_r=e=>{if(!ZN(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=vee(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var QN,Lee,xk,eD=l(()=>{"use strict";QN=require("node:zlib");Ik();Lee="x-agent-witch-token",xk=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[Lee]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,QN.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=_r(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var Ok,Wk,kr,tD=l(()=>{"use strict";Ok=m(require("node:fs")),Wk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kr=e=>{if(!Ok.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(Ok.default.readFileSync(e.harnessManifestPath,"utf8"));if(!Wk(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=Wk(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!Wk(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Ef,rD=l(()=>{"use strict";Ef=()=>"~"});var oD,nD,sD=l(()=>{"use strict";oD=require("node:crypto"),nD=e=>`local-${(0,oD.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var Mk,iD=l(()=>{"use strict";Mk=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Nc,Rf,jk=l(()=>{"use strict";Nc=m(require("node:path")),Rf=e=>{let t=Nc.default.dirname(e),r=Nc.default.basename(t);return r==="agents"?Nc.default.basename(Nc.default.dirname(t)):r}});var Dc,qr,aD,Iee,xee,Wee,Cf,lD,Nk=l(()=>{"use strict";Dc=m(require("node:fs")),qr=m(require("node:path"));sD();iD();jk();aD=new Set(["node_modules",".git","dist","build",".next","coverage"]),Iee=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},xee=(e,t)=>{let r=qr.default.basename(t);if(e==="skill"){let o=t.split(qr.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},Wee=e=>{let t=[],r=(n,s)=>{let i;try{i=Dc.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&aD.has(a.name))continue;let c=qr.default.join(n,a.name),d=s?qr.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;Mk(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=qr.default.join(e,n);Dc.default.existsSync(s)&&r(s,n)}let o=qr.default.join(e,"skills");return Dc.default.existsSync(o)&&r(o,"skills"),t},Cf=e=>{let t=Wee(e);if(t.length===0)return null;let r=qr.default.dirname(e),o=Rf(e),n=Iee(o),s=t.map(i=>{let a=Mk(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:nD(i.absolutePath),kind:a,title:xee(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},lD=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Dc.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||aD.has(a.name))continue;let c=qr.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var cD,Dk,Oee,Hk,dD=l(()=>{"use strict";cD=m(require("node:fs")),Dk=m(require("node:path"));Nk();Fi();Oee=e=>{let t=Kr(e.trim());if(t===null)return null;if(Dk.default.basename(t)===".cursor")return t;let r=Dk.default.join(t,".cursor");try{if(cD.default.statSync(r).isDirectory())return Kr(r)}catch{return null}return null},Hk=e=>{let t=Oee(e.projectPath);if(t===null)return null;let r=Cf(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var pD,Mee,vf,Fk,uD=l(()=>{"use strict";pD=m(require("node:path"));Nk();Fi();jk();Mee=5,vf=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},Fk=e=>{let t=Kr(e.scanRoot.trim());if(t===null)return vf(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of lD(t,Mee,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=Kr(s);if(i===null)continue;let a=Rf(i);vf(e.response,"folder",{cursorDir:i,groupName:a,repoPath:pD.default.dirname(i)});let c=Cf(i);c!==null&&(r.push(c),vf(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return vf(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var mD,gD,fD=l(()=>{"use strict";mD=m(require("node:path")),gD=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:mD.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var at,yD,zk,jee,$k,Uk,Lf,Bk,Hc,hD=l(()=>{"use strict";at=m(require("node:fs")),yD=m(require("node:os")),zk=m(require("node:path"));wf();Ak();Fi();fD();jee=e=>{if(!at.default.existsSync(e))return null;try{let t=JSON.parse(at.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},$k=e=>{let t=e.hostname??yD.default.hostname(),r=jee(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let g=Oc(p.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let f=at.default.readFileSync(g,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:f,setSlugs:[i.slug]})}let d=jc({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{at.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)at.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=zk.default.join(e.layout.harnessRootDir,i.relativePath);at.default.mkdirSync(zk.default.dirname(a),{recursive:!0}),at.default.writeFileSync(a,i.content)}at.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=kf(i.slug),d=r.sets[c];d!==void 0&&hf({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},Uk="reveal-cache.json",Lf=(e,t)=>{at.default.mkdirSync(e.harnessRootDir,{recursive:!0}),at.default.writeFileSync(`${e.harnessRootDir}/${Uk}`,`${JSON.stringify(t,null,2)}
`)},Bk=e=>{let t=`${e.harnessRootDir}/${Uk}`;at.default.existsSync(t)&&at.default.unlinkSync(t)},Hc=e=>{let t=`${e.harnessRootDir}/${Uk}`;if(!at.default.existsSync(t))return null;try{let r=JSON.parse(at.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return gD(r)}catch{return null}return null}});var Bo=l(()=>{"use strict";Ck();JN();Rk();vk();eD();Ik();wf();tD();rD();dD();Fi();uD();hD()});var Gk,SD=l(()=>{"use strict";Bo();Xe();Gk=e=>{let t=N(e.profileEmail);return Zn({bundle:e.bundle,layout:t})}});var PD=l(()=>{"use strict";SD();Bo()});var Nee,AD,Dee,bD,Qn,If,_D=l(()=>{"use strict";Nee=["agentwitch.com","www.agentwitch.com"],AD=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,Dee=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},bD=e=>{let t=Dee(e);return!!(Nee.includes(t)||AD.test(e.trim().toLowerCase()))},Qn=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return bD(r)?AD.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},If=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Qn(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Fc=l(()=>{"use strict";_D()});var Jr,zc=l(()=>{"use strict";Jr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var $c,kD=l(()=>{"use strict";PD();Fc();zc();$c=e=>{if(!Jr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=_r(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Qn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=Gk({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var Vk=l(()=>{"use strict";kD()});var Hee,zi,Kk=l(()=>{"use strict";Hee=e=>e==="hourly"||e==="daily"||e==="weekdays",zi=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!Hee(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Uc,xf,wD,TD,qk,Yt,Wf,Of,Mf,jf,Nf=l(()=>{"use strict";Uc=m(require("node:fs")),xf=m(require("node:path"));Kk();wD="automations.json",TD=e=>e.profileEmail!==null?xf.default.join(e.installDir,"profiles",e.profileEmail,wD):xf.default.join(e.installDir,wD),qk=()=>({version:1,automations:[]}),Yt=e=>{let t=TD(e);if(!Uc.default.existsSync(t))return qk();try{let r=JSON.parse(Uc.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?qk():{version:1,automations:r.automations.flatMap(n=>{let s=zi(n);return s!==null?[s]:[]})}}catch{return qk()}},Wf=(e,t)=>{let r=TD(e);Uc.default.mkdirSync(xf.default.dirname(r),{recursive:!0}),Uc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Of=(e,t)=>{Wf(e,{version:1,automations:t})},Mf=(e,t)=>{let o=Yt(e).automations.filter(n=>n.id!==t.id);Wf(e,{version:1,automations:[...o,t]})},jf=(e,t)=>Yt(e).automations.find(r=>r.id===t)??null});var le,xt=l(()=>{"use strict";le="x-agent-witch-token"});var Jk=l(()=>{"use strict";Eg();Cg()});var V,es,Yk,Bc,Xk,Fee,Zk,Gc,ts,Qk,Yr=l(()=>{"use strict";xt();Jk();V=e=>{let t=ze(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},es=e=>({[le]:e,"Content-Type":"application/json"}),Yk=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:es(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Bc=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:es(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Xk=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:es(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Fee=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},Zk=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:es(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Gc=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:es(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return Fee(r)}catch{return null}},ts=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:es(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},Qk=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:es(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var rs,ED,RD,zee,ew,CD,tw=l(()=>{"use strict";rs=m(require("node:fs")),ED=m(require("node:path")),RD=e=>ED.default.join(e.harnessRootDir,"projects-registry.json"),zee=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),ew=e=>{let t=RD(e);if(!rs.default.existsSync(t))return[];try{let r=JSON.parse(rs.default.readFileSync(t,"utf8"));return zee(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},CD=e=>{let t=RD(e);if(!rs.default.existsSync(t))return;let r=`${t}.migrated`;if(rs.default.existsSync(r)){rs.default.unlinkSync(t);return}rs.default.renameSync(t,r)}});var vD,$ee,Uee,LD,ID=l(()=>{"use strict";$o();vD=e=>Qe(e),$ee=e=>new Set(e.map(t=>vD(t.folderPath))),Uee=e=>new Set(e.map(t=>t.id)),LD=(e,t)=>{let r=$ee(t),o=Uee(t),n=[],s=new Set;for(let i of e){let a=vD(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var rw,ow=l(()=>{"use strict";Yr();tw();ID();rw=async(e,t)=>{let r=ew(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=V({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Gc(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=LD(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await Zk(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&CD(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var nw,Xt,$i=l(()=>{"use strict";nw=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),Xt=(e,t)=>e.find(r=>r.id===t)??null});var wr,Ui=l(()=>{"use strict";Yr();ow();$i();wr=async(e,t)=>{t!==void 0&&await rw(t,e);let r=V({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Gc(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=nw(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var xD=l(()=>{"use strict"});var sw,Bee,Df,iw=l(()=>{"use strict";sw=m(require("node:fs"));Xn();Bee=e=>{let t=It(e);if(!sw.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(sw.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},Df=Bee});var aw,lw,WD=l(()=>{"use strict";aw=m(require("node:path"));$o();iw();lw=e=>{let t=aw.default.resolve(Qe(e)),r=o=>{let{projectId:n}=Df(o);if(n!==null)return n;let s=aw.default.dirname(o);return s===o?null:r(s)};return r(t)}});var Gee,Vee,Hf,cw=l(()=>{"use strict";Gee="Default",Vee=e=>e.trim().toLowerCase()===Gee.toLowerCase(),Hf=Vee});var Ff,zf,$f=l(()=>{"use strict";Ff={save:"/project/pitfalls/save",retire:"/project/pitfalls/retire",restore:"/project/pitfalls/restore"},zf=e=>{let t=Object.entries(Ff).find(([,r])=>r===e);return t===void 0?null:t[0]}});var OD,ye,jD,Kee,dw,pw,MD,qee,Jee,Vc,uw,Yee,Xee,Zee,ND,DD=l(()=>{"use strict";Bt();$f();OD="new",ye=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),jD={block:"Must fix",warn:"Warning",info:"Note"},Kee={seed:"Built-in",project:"This project",retired:"Retired"},dw=6e4,pw=60*dw,MD=24*pw,qee=(e,t)=>{if(e===null)return"Never hit";let r=new Date(e).getTime();if(Number.isNaN(r))return"Never hit";let o=Math.max(0,t-r);if(o<dw)return"Last hit just now";if(o<pw)return`Last hit ${Math.floor(o/dw)} min ago`;if(o<MD)return`Last hit ${Math.floor(o/pw)}h ago`;let n=Math.floor(o/MD);return n<30?`Last hit ${n} ${n===1?"day":"days"} ago`:`Last hit ${new Date(r).toISOString().slice(0,10)}`},Jee=e=>{if(e===null)return"Not updated yet";let t=new Date(e).getTime();return Number.isNaN(t)?"Not updated yet":`Updated ${new Date(t).toISOString().slice(0,10)}`},Vc=(e,t)=>`/project?${new URLSearchParams({id:e,tab:"pitfalls",...t}).toString()}`,uw=e=>e?{retired:"1"}:{},Yee=e=>{let{item:t}=e,r=t?.severity??"warn",o=t?.check.kind==="command"?t.check.value:"",n=t===null?"Add pitfall":"Edit pitfall",s=t?.source==="seed"?'<p class="muted">This is a built-in pitfall. Your changes apply to this project only.</p>':"",i=a=>`<option value="${a}"${r===a?" selected":""}>${jD[a]}</option>`;return`<form method="POST" action="${e.postPaths.save}" class="stack pitfall-form" aria-label="${n}" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
      <p class="field-label">${n}</p>
      ${s}
      <input type="hidden" name="projectId" value="${ye(e.projectId)}" />
      <input type="hidden" name="pitfallId" value="${ye(t?.id??"")}" />
      <input type="hidden" name="tags" value="${ye((t?.tags??[]).join(", "))}" />
      ${e.showRetired?'<input type="hidden" name="showRetired" value="1" />':""}
      <label class="stack">
        <span>Title</span>
        <input type="text" name="symptom" required maxlength="${ke.symptom}" value="${ye(t?.symptom??"")}" placeholder="What goes wrong, in one line" />
      </label>
      <label class="stack">
        <span>Fix</span>
        <textarea name="avoidance" required maxlength="${ke.avoidance}" rows="3" placeholder="What to do instead">${ye(t?.avoidance??"")}</textarea>
      </label>
      <label class="stack">
        <span>Why it happens</span>
        <textarea name="cause" required maxlength="${ke.cause}" rows="2" placeholder="What leads to this trap">${ye(t?.cause??"")}</textarea>
      </label>
      <label class="stack">
        <span>Triggers</span>
        <input type="text" name="keywords" value="${ye((t?.keywords??[]).join(", "))}" placeholder="Words that point to this trap, separated by commas" />
      </label>
      <label class="stack">
        <span>How to check <span class="muted">(optional)</span></span>
        <input type="text" name="checkCommand" class="mono" maxlength="${ke.checkValue}" value="${ye(o)}" placeholder="A command that shows the trap, like npm run lint" />
      </label>
      <label class="stack">
        <span>How serious</span>
        <select name="severity">${i("block")}${i("warn")}${i("info")}</select>
      </label>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Save pitfall</button>
        <a class="btn btn-secondary" href="${ye(Vc(e.projectId,uw(e.showRetired)))}">Cancel</a>
      </div>
    </form>`},Xee=e=>{let{item:t,projectId:r,showRetired:o}=e,n=t.source==="retired",s=`<input type="hidden" name="projectId" value="${ye(r)}" />
            <input type="hidden" name="pitfallId" value="${ye(t.id)}" />
            ${o?'<input type="hidden" name="showRetired" value="1" />':""}`,i=n?`<form method="POST" action="${e.postPaths.restore}" class="inline-form" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-secondary btn-compact" type="submit">Bring back</button>
          </form>`:`<a class="btn btn-secondary btn-compact" href="${ye(Vc(r,{...uw(o),edit:t.id}))}">Edit</a>
          <form method="POST" action="${e.postPaths.retire}" class="inline-form" onsubmit="if(!confirm('Retire this pitfall? You can bring it back later.'))return false;this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-danger btn-compact" type="submit">Retire</button>
          </form>`,a=t.keywords.length>0?`<p class="muted">Triggers: ${t.keywords.map(c=>ye(c)).join(", ")}</p>`:"";return`<li class="harness-installed-set pitfall-row${n?" pitfall-row-retired":""}" data-pitfall-id="${ye(t.id)}">
        <p><strong>${ye(t.symptom)}</strong> <span class="muted">\xB7 ${jD[t.severity]} \xB7 ${Kee[t.source]}</span></p>
        <p>Fix: ${ye(t.avoidance)}</p>
        ${a}
        <p class="muted">${ye(qee(t.lastSeenAt,e.nowMs))}</p>
        <p class="muted">${ye(Jee(t.updatedAt))}</p>
        <div class="actions">${i}</div>
      </li>`},Zee=e=>{let t=e.postPaths??Ff;if(e.list===null||!e.list.ok)return'<p class="empty">Could not load pitfalls. Check this Mac on Status, then reload.</p>';let r=e.nowMs??Date.now(),o=e.list.items,n=Wo(o),s=n>=64,i=e.showRetired?o:o.filter(f=>f.source!=="retired"),a=e.editId===null?null:e.editId===OD?s?null:{item:null}:(()=>{let f=o.find(y=>y.id===e.editId&&y.source!=="retired");return f===void 0?null:{item:f}})(),c=a===null?"":Yee({projectId:e.projectId,item:a.item,showRetired:e.showRetired,postPaths:t}),d=s?`<p class="muted">${64} of ${64} active. Retire one to add another.</p>`:`<a class="btn btn-primary" href="${ye(Vc(e.projectId,{...uw(e.showRetired),edit:OD}))}">Add pitfall</a>`,p=e.showRetired?`<a class="btn btn-secondary" href="${ye(Vc(e.projectId,{}))}">Hide retired</a>`:`<a class="btn btn-secondary" href="${ye(Vc(e.projectId,{retired:"1"}))}">Show retired</a>`,g=i.length===0?'<p class="empty">No pitfalls for this project. Add one when you spot a mistake that keeps coming back.</p>':`<ul class="harness-installed-set-list">${i.map(f=>Xee({projectId:e.projectId,item:f,showRetired:e.showRetired,nowMs:r,postPaths:t})).join("")}</ul>`;return`<section class="stack">
      <p class="lede">Pitfalls are known traps in this project. Each one says what goes wrong and how to avoid it.</p>
      <p class="muted">${n} of ${64} active</p>
      <div class="actions">${a===null?d:""}${p}</div>
      ${c}
      ${g}
    </section>`},ND=Zee});var re,HD,Qee,ete,tte,rte,ote,Go,Uf=l(()=>{"use strict";cw();Bt();DD();re=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HD=(e,t)=>e.length===0?`<p class="empty">${re(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${re(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${re(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,Qee=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,ete=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from Agent Witch Cloud.":"This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${re(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},tte=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
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
      </div>`},rte=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?tte({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?ete({project:e.project,alreadyInRepo:!1}):Qee();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",a=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),p=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this Mac.');">
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
      </div>`},ote=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${re(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${re(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},Go=e=>{let t=e.flashError?`<div class="alert-error">${re(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${re(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(f,y)=>`<a class="project-tab${e.activeTab===f?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${f}">${re(y)}</a>`,n=e.composition?.items.filter(f=>f.kind==="workflow")??[],s=e.composition?.items.filter(f=>f.kind==="agent")??[],i=(()=>{switch(e.activeTab){case"harness":return rte({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0});case"workflows":return HD(n,"No workflows installed for this project yet.");case"agents":return HD(s,"No agents installed for this project yet.");case"knowledge":return ote({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});case"pitfalls":return ND({projectId:e.project.id,list:e.pitfalls??null,showRetired:e.pitfallsShowRetired??!1,editId:e.pitfallsEditId??null});default:return e.activeTab}})(),a=e.pitfalls!==void 0&&e.pitfalls!==null&&e.pitfalls.ok?`Pitfalls (${Wo(e.pitfalls.items)})`:"Pitfalls",c=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,d=`${c}?rename=1`,p=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${re(c)}" target="_blank" rel="noopener noreferrer">Open in Agent Witch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${re(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,g=Hf(e.project.name)?"":`<section class="danger-zone stack">
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
    </section>${g}`}});var nte,ste,FD,zD=l(()=>{"use strict";Bo();xt();nte=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ste=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!nte(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=_r(n);return s===null?[]:[s]})}catch{return null}},FD=ste});var $D,mw,UD=l(()=>{"use strict";ee();Bo();Uf();Ui();zD();$i();xc();Yr();Lt();$D=e=>({kind:"page",title:e.project.name,body:Go({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:kr(e.layout),linkedSetSlugs:br(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),mw=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=z();if(r===null)return{kind:"not_found"};let o=await wr(r,e.layout),n=Xt(o.projects,t);if(n===null)return{kind:"not_found"};let s=V({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??bt,a=s===null?null:await FD(s,n.id);if(a===null)return $D({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=Lk({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return $D({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await ts(s,n.id,c.appliedSetSlugs),p=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${p.toString()}`}}});var BD,gw,GD=l(()=>{"use strict";ee();Bo();Lt();Yr();Uf();lf();$o();Ui();$i();xc();rf();ak();sf();pk();BD=e=>({kind:"page",title:e.project.name,body:Go({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:kr(e.layout),linkedSetSlugs:br(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),gw=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=z();if(n===null)return{kind:"not_found"};let s=await wr(n,e.layout),i=Xt(s.projects,r);if(i===null)return{kind:"not_found"};let a=V({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=a?.appOrigin??bt;if(o.length===0)return BD({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=Qe(i.projectFolderPath),p=it({projectFolderPath:d}),{ledgerFilePath:g}=Di(p.layout),f=Ni(g),y=wk(f);if(!y.includes(o))return BD({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let P=y.filter(b=>b!==o),h=nf({repoRoot:p.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:f});Lc(g,h.ledger);let u=a===null?!1:await ts(a,i.id,P),S=new URLSearchParams({linked:"1",removed:o,files:String(h.summary.removedPaths.length),bindingsSynced:u?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${S.toString()}`}}});var ite,ate,VD,lte,cte,Kc,fw=l(()=>{"use strict";Bt();xt();ite=1e4,ate=15e3,VD=(e,t,r)=>{let o=`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/pitfalls`;return r===void 0?o:`${o}/${encodeURIComponent(r)}`},lte=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return t.errorMessage==="limit_exceeded"||t.code==="limit_exceeded"},cte=(e,t=fetch)=>({listPitfalls:async(r,o)=>{try{let n=new URL(VD(e.appOrigin,r));n.searchParams.set("includeRetired",o.includeRetired?"1":"0");let s=await t(n.toString(),{method:"GET",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(ite)});if(!s.ok)return{ok:!1,reason:"unavailable"};let i=Nb(await s.json());return i===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:i.items,syncedAt:i.syncedAt}}catch{return{ok:!1,reason:"unavailable"}}},upsertPitfall:async(r,o)=>{try{let n=await t(VD(e.appOrigin,r),{method:"PUT",headers:{[le]:e.pairingToken,"content-type":"application/json"},body:JSON.stringify(o),signal:AbortSignal.timeout(ate)});if(n.ok)return{ok:!0};if(n.status===409){let s=await n.json().catch(()=>null);return{ok:!1,reason:lte(s)?"active_limit":"rejected"}}return n.status===400?{ok:!1,reason:"rejected"}:{ok:!1,reason:n.status>=500?"unavailable":"rejected"}}catch{return{ok:!1,reason:"unavailable"}}}}),Kc=cte});var yw,KD,dte,pte,ute,mte,qD,JD=l(()=>{"use strict";Bt();yw=e=>e.replace(/\s+/g," ").trim(),KD=(e,t,r)=>{let o=new Set,n=[];for(let s of e.split(/[,\n]/)){let i=yw(s).slice(0,r).toLowerCase();i.length>0&&!o.has(i)&&(o.add(i),n.push(i))}return n.slice(0,t)},dte=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40).replace(/-+$/g,""),pte=(e,t)=>{let r=dte(e);return`project-${r.length>0?r:"pitfall"}-${t}`.slice(0,ke.id).replace(/-+$/g,"")},ute=e=>e==="block"||e==="info"?e:"warn",mte=e=>{let{form:t}=e,r=yw(t.get("symptom")??""),o=(t.get("avoidance")??"").trim(),n=(t.get("cause")??"").trim(),s=yw(t.get("checkCommand")??"");if(r.length===0||o.length===0||n.length===0||r.length>ke.symptom||o.length>ke.avoidance||n.length>ke.cause||s.length>ke.checkValue)return{ok:!1};let i=(t.get("pitfallId")??"").trim(),a=i.length>0?i:pte(r,e.randomSuffix());return{ok:!0,pitfall:{id:a,symptom:r,cause:n,avoidance:o,check:s.length>0?{kind:"command",value:s}:{kind:"id",value:a},keywords:KD(t.get("keywords")??"",ke.keywords,ke.keyword),tags:KD(t.get("tags")??"",ke.tags,ke.tag),source:"project",severity:ute(t.get("severity"))}}},qD=mte});var XD,gte,Xr,YD,Bf,fte,yte,ZD,QD=l(()=>{"use strict";XD=require("node:crypto");Bt();JD();$f();gte=()=>(0,XD.randomBytes)(3).toString("hex"),Xr=(e,t,r={})=>{let o=new URLSearchParams({tab:"pitfalls",...r,pitfall:t});return`/project?id=${encodeURIComponent(e)}&${o.toString()}`},YD=(e,t)=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:t}),Bf=new Map,fte=async(e,t)=>{let r=Bf.get(e)??Promise.resolve(),o,n=new Promise(i=>{o=i}),s=r.catch(()=>{}).then(()=>n);Bf.set(e,s),await r.catch(()=>{});try{return await t()}finally{o(),Bf.get(e)===s&&Bf.delete(e)}},yte=async e=>{let t=(e.form.get("pitfallId")??"").trim(),r=`${e.projectId}:${t||"__new__"}`;return fte(r,async()=>{let{projectId:o,store:n}=e,s=e.form.get("showRetired")==="1"?{retired:"1"}:{};if(n===null)return Xr(o,"unavailable",s);let i=await n.listPitfalls(o,{includeRetired:!0});if(!i.ok)return Xr(o,"unavailable",s);if(e.action==="save"){let d=qD({form:e.form,randomSuffix:e.randomSuffix??gte});if(!d.ok)return Xr(o,"invalid",s);let p=i.items.find(y=>y.id===d.pitfall.id);if((p===void 0||p.source==="retired")&&Wo(i.items)>=64)return Xr(o,"limit",s);let f=await n.upsertPitfall(o,d.pitfall);return Xr(o,f.ok?"saved":f.reason==="active_limit"?"limit":f.reason,s)}let a=i.items.find(d=>d.id===t);if(a===void 0)return Xr(o,"missing",s);if(e.action==="restore"){if(a.source==="retired"&&Wo(i.items)>=64)return Xr(o,"limit",s);let d=await n.upsertPitfall(o,YD(a,"project"));return Xr(o,d.ok?"restored":d.reason==="active_limit"?"limit":d.reason,s)}let c=await n.upsertPitfall(o,YD(a,"retired"));return Xr(o,c.ok?"retired":c.reason==="active_limit"?"limit":c.reason,s)})},ZD=yte});var Gf,eH,tH,hw=l(()=>{"use strict";Gf=new Map,eH=async e=>{let t=e.nowMs??Date.now(),r=e.ttlMs??3e4,o=Gf.get(e.projectId);if(o!==void 0&&o.includeRetired===e.includeRetired&&t-o.fetchedAtMs<r)return o.result;let n=await e.store.listPitfalls(e.projectId,{includeRetired:e.includeRetired});return n.ok&&Gf.set(e.projectId,{result:n,includeRetired:e.includeRetired,fetchedAtMs:t}),n},tH=e=>{if(e===void 0){Gf.clear();return}Gf.delete(e)}});var Sw,rH=l(()=>{"use strict";ee();Yr();Ui();$i();fw();QD();hw();Sw=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=z();if(o===null)return{kind:"not_found"};let n=await wr(o,e.layout),s=Xt(n.projects,r);if(s===null)return{kind:"not_found"};let i=V({wsUrl:o.wsUrl,pairingToken:o.pairingToken}),a=e.createStore??Kc,c=i===null?null:a(i),d=await ZD({action:e.action,form:t,projectId:s.id,store:c});return tH(s.id),{kind:"redirect",location:d}}});var hte,Pw,oH=l(()=>{"use strict";hte=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,Pw=hte});var nH=l(()=>{"use strict"});var sH=l(()=>{"use strict"});var iH=l(()=>{"use strict";nH();sH()});var Ste,Vo,aH=l(()=>{"use strict";Ste=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],Vo=(e=process.env)=>{let t={...e};for(let r of Ste)delete t[r];return t}});var lH=l(()=>{"use strict";aH()});var Aw,cH=l(()=>{"use strict";Aw={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var bw=l(()=>{"use strict";cH()});var Vf,_w=l(()=>{"use strict";Vf={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",DEVICE_RESTART_ACK:"device.restart.ack",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status",PROJECT_MESSAGE_HISTORY:"project.message.history"}});var Kf=l(()=>{"use strict";iH();lH();Lt();bw();_w()});var dH,pH,Pte,qf,Jf,uH=l(()=>{"use strict";dH=require("node:child_process"),pH=require("node:util");Kf();Pte=(0,pH.promisify)(dH.execFile),qf=async(e,t)=>{try{let{stdout:r}=await Pte("git",t,{cwd:e,env:Vo(),maxBuffer:1048576});return r.trim()}catch{return null}},Jf=async e=>{let t=await qf(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await qf(e,["rev-parse","--abbrev-ref","HEAD"]),o=await qf(e,["status","--porcelain"]),n=await qf(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var kw,mH=l(()=>{"use strict";kw=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var Ate,ww,gH=l(()=>{"use strict";Ate=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},ww=Ate});var bte,Tw,fH=l(()=>{"use strict";xt();bte=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[le]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},Tw=bte});var yH,Ko,hH=l(()=>{"use strict";yH=require("node:child_process"),Ko=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,yH.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var SH=l(()=>{"use strict";Ui()});var qc,PH=l(()=>{"use strict";xt();qc=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[le]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var Ew,AH=l(()=>{"use strict";xt();Ew=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var bH,_te,Zr,Rw,Cw=l(()=>{"use strict";bH=e=>{let t=JSON.parse(e);return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]},_te=e=>e===""?null:e,Zr=e=>e??"",Rw=e=>({id:e.id,projectId:_te(e.project_id),symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:{kind:e.check_kind,value:e.check_value},keywords:bH(e.keywords_json),tags:bH(e.tags_json),source:e.source,hitCount:e.hit_count,lastSeenAt:e.last_seen_at,severity:e.severity})});var _H,kte,wte,vw,Bi,Yf,Jc=l(()=>{"use strict";Cw();_H=`
  SELECT p.project_id, p.id, p.symptom, p.cause, p.avoidance,
    p.check_kind, p.check_value, p.keywords_json, p.tags_json,
    p.source, p.severity,
    COALESCE(h.hit_count, 0) AS hit_count,
    h.last_seen_at AS last_seen_at
  FROM pitfalls p
  LEFT JOIN pitfall_hits h
    ON h.project_id = ? AND h.pitfall_id = p.id
  WHERE p.project_id = ?`,kte=e=>e,wte=e=>e??null,vw=(e,t,r=t)=>kte(e.prepare(_H).all(Zr(r),Zr(t))).map(Rw),Bi=(e,t,r,o=t)=>{let n=wte(e.prepare(`${_H} AND p.id = ?`).get(Zr(o),Zr(t),r));return n===null?null:Rw(n)},Yf=(e,t)=>{e.prepare(`INSERT INTO pitfalls (
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
      severity = excluded.severity`).run(Zr(t.projectId),t.id,t.symptom,t.cause,t.avoidance,t.check.kind,t.check.value,JSON.stringify(t.keywords),JSON.stringify(t.tags),t.source,t.severity)}});var Xf,Lw=l(()=>{"use strict";Bt();Xf=e=>e.map(t=>({id:jn(t.id),avoidance:jn(t.avoidance)}))});var Zf,kH,Qf=l(()=>{"use strict";Zf=e=>{let t=new Map;e.seeds.forEach(o=>{t.set(o.id,o)}),e.projectRows.forEach(o=>{t.set(o.id,o)});let r=[...t.values()];return e.includeRetired===!0?r:r.filter(o=>o.source!=="retired")},kH=e=>e.filter(t=>t.source!=="retired").length});var os,wH,Yc=l(()=>{"use strict";Bt();Lw();Jc();Qf();os=(e,t={})=>{let r=t.projectId??null,o=vw(e,null,r),n=r===null||r===""?[]:vw(e,r);return Zf({seeds:o,projectRows:n,includeRetired:t.includeRetired===!0})},wH=(e,t={})=>{let r=os(e,t);return t.format==="bot"?{format:"bot",items:Xf(r),lines:r.map(o=>$l(o))}:{format:"full",items:r}}});var ey,Iw=l(()=>{"use strict";Jc();Yc();ey=(e,t)=>{let r=t.id.trim();if(r.length===0)return null;let o=t.projectId??null;return o===null||o===""?Bi(e,null,r):os(e,{projectId:o,includeRetired:!0}).find(s=>s.id===r)??null}});var xw=l(()=>{"use strict"});var qo,Gi,TH,EH,RH=l(()=>{"use strict";qo=e=>({type:"string",description:e}),Gi={name:"check_context",description:"Match the current prompt against project pitfalls. Call on the first user message. Returns hit, miss, or none. Miss stays silent.",inputSchema:{type:"object",properties:{cwd:qo("Absolute working directory for the current session."),message:qo("User prompt or task text to match."),sessionId:qo("Optional session id for first-message tracking."),projectId:qo("Optional project id when already known.")},additionalProperties:!1}},TH={name:"get_context",description:"Compact project briefing: id, folder, and feature flags. Not a full docs dump.",inputSchema:{type:"object",properties:{cwd:qo("Absolute working directory."),projectId:qo("Optional project id when already known.")},additionalProperties:!1}},EH={name:"get_pitfalls",description:"List or search project pitfalls in a short bot-friendly form.",inputSchema:{type:"object",properties:{projectId:qo("Project id."),q:qo("Optional search text."),limit:{type:"number",description:"Max rows to return."}},additionalProperties:!1}}});var ns,CH,vH,LH=l(()=>{"use strict";ns=e=>({type:"string",description:e}),CH={name:"get_skill",description:"Read one project skill by id or search. Same idea as the cloud skill tools.",inputSchema:{type:"object",properties:{projectId:ns("Project id."),skillId:ns("Skill id when known."),q:ns("Optional search text.")},required:["projectId"],additionalProperties:!1}},vH={name:"record_outcome",description:"Record whether a tip or preflight check helped. Pitfall wins call the cloud hit route.",inputSchema:{type:"object",properties:{projectId:ns("Project id."),kind:{type:"string",description:"pitfall | preflight | other"},pitfallId:ns("Pitfall id when kind is pitfall."),preflightId:ns("Preflight check id when kind is preflight."),ok:{type:"boolean",description:"Whether the step helped."},notes:ns("Optional short note. No secret values.")},required:["projectId","kind","ok"],additionalProperties:!1}}});var IH=l(()=>{"use strict";RH();LH()});var Ww,xH=l(()=>{"use strict";Bt();xw();Ww=e=>{let t=dg("Agent Witch tip \xB7 check_context",120);if(Oo(t)>=120)return t;let r=[t],o=Oo(t);for(let n of e){if(r.length-1>=4)break;let s=$l(n),i=Oo(s);if(o+i>120){if(r.length===1){let a=120-o,c=dg(s,a);c.length>0&&(r.push(c),o+=Oo(c));continue}continue}r.push(s),o+=i}return r.join(`
`)}});var WH=l(()=>{"use strict";Bt()});var ry=l(()=>{"use strict";xw();IH();xH();WH()});var Tte,Ete,oy,Ow=l(()=>{"use strict";ry();Tte=e=>e.toLowerCase(),Ete=(e,t)=>{let r=Tte(e);return t.reduce((o,n)=>{let s=n.trim().toLowerCase();return s.length===0?o:r.includes(s)?o+1:o},0)},oy=e=>{let t=e.pitfalls.map(r=>({pitfall:r,score:Ete(e.text,r.keywords)})).filter(r=>r.score>0).sort((r,o)=>o.score-r.score||r.pitfall.id.localeCompare(o.pitfall.id));return t.length===0?[]:t.slice(0,4).map(r=>r.pitfall)}});var OH,MH=l(()=>{"use strict";Yc();Ow();OH=(e,t)=>{let r=os(e,{projectId:t.projectId,includeRetired:!1});return oy({pitfalls:r,text:t.text})}});var jH,Zc=l(()=>{"use strict";hg();jH=3e3});var NH,DH=l(()=>{"use strict";Zc();NH=`
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
`});var HH,FH,zH,Rte,Cte,$H,UH,BH=l(()=>{"use strict";HH=m(require("node:fs")),FH=m(require("node:path")),zH=require("node:sqlite");Zc();DH();Rte=e=>{let t=e.prepare("SELECT value FROM pitfall_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},Cte=(e,t)=>{e.prepare(`INSERT INTO pitfall_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},$H=e=>{HH.default.mkdirSync(FH.default.dirname(e),{recursive:!0});let t=new zH.DatabaseSync(e);return t.exec(`PRAGMA busy_timeout = ${jH}`),t.exec(NH),Rte(t)<Vl&&Cte(t,Vl),t},UH=e=>{e.close()}});var GH,VH,Mw=l(()=>{"use strict";Cw();GH=(e,t,r,o)=>{let n=e.prepare(`INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(project_id, pitfall_id) DO UPDATE SET
         hit_count = pitfall_hits.hit_count + 1,
         last_seen_at = excluded.last_seen_at
       RETURNING hit_count, last_seen_at`).get(Zr(t),r,o);return{hitCount:n.hit_count,lastSeenAt:n.last_seen_at}},VH=(e,t,r)=>{let o=e.prepare(`SELECT hit_count, last_seen_at FROM pitfall_hits
       WHERE project_id = ? AND pitfall_id = ?`).get(Zr(t),r);return o===void 0?{hitCount:0,lastSeenAt:null}:{hitCount:o.hit_count,lastSeenAt:o.last_seen_at}}});var KH,qH=l(()=>{"use strict";Iw();Mw();KH=(e,t)=>{let r=t.id.trim(),o=r.length===0?null:ey(e,{projectId:t.projectId,id:r});if(o===null)return{ok:!1,reason:"not_found"};let n=t.nowIso??new Date().toISOString(),s=GH(e,t.projectId,o.id,n);return{ok:!0,pitfall:{...o,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt}}}});var jw,ny,Nw=l(()=>{"use strict";jw=m(require("node:path"));He();ny=(e,t)=>e.profileEmail!==null?jw.default.join(e.installDir,st,e.profileEmail,t):jw.default.join(e.installDir,t)});var Vi,Dw=l(()=>{"use strict";Zc();Nw();Vi=e=>ny(e,zb)});var YH,JH=l(()=>{YH=[{id:"arch-max-lines",symptom:"ci:architecture fails at land (handler >100 / test >100 effective lines)",cause:"Max-effective-lines=100 only enforced late",avoidance:"Run `npm run ci:architecture` before tipping Arch",check:{kind:"command",value:"npm run ci:architecture"},keywords:["architecture","land","ci:architecture","max-effective","lines"],tags:["architecture","ci"]},{id:"symlink-node-modules",symptom:'Turbopack: "points out of the filesystem root"',cause:"Mac worktree with symlinked node_modules",avoidance:"APFS clone: `cp -Rc` (not symlink) into worktree",check:{kind:"id",value:"pit.symlink-node-modules"},keywords:["build","turbopack","symlink","node_modules","filesystem root"],tags:["build"]},{id:"install-bundle-clobber",symptom:"Missing/broken public/install/agent-witch/app/deps.tar.gz or agent-witch.js after build",cause:"Build overwrites install bundle artifacts",avoidance:"Restore those two paths after `build`",check:{kind:"command",value:"test -f public/install/agent-witch/app/deps.tar.gz && test -f public/install/agent-witch/app/agent-witch.js"},keywords:["build","deps.tar.gz","agent-witch.js","install bundle","clobber"],tags:["build","awi"]},{id:"stale-next",symptom:"Typecheck fails spuriously",cause:"Stale .next",avoidance:"`rm -rf .next` then typecheck",check:{kind:"id",value:"pit.stale-next"},keywords:["build","typecheck",".next","stale","turbopack"],tags:["build"]},{id:"main-moved-rebase",symptom:"FF/SHIP fails; main advanced",cause:"main moved between SHIP and FF",avoidance:"`git fetch`; pure-rebase onto new `-rN` branch; **never** force-push",check:{kind:"id",value:"pit.main-moved-rebase"},keywords:["ship","ff","push","rebase","main moved","force-push"],tags:["git"]},{id:"health-lag",symptom:"Declare done on exit 0 / HTTP 200 too early",cause:"Deploy health lags ~1\u20132 min after push",avoidance:"Poll until health `commitSha` == main tip + smoke",check:{kind:"id",value:"pf.health-matches-main"},keywords:["ship","ff","push","health","commitSha","deploy"],tags:["deploy"]},{id:"dirty-home-checkout",symptom:"Accidental reset/clean of ~/daily-magic",cause:"Home checkout left dirty",avoidance:"Use `/tmp` worktrees; never reset/clean home",check:{kind:"id",value:"pit.dirty-home-checkout"},keywords:["reset","clean","home checkout","daily-magic","worktree"],tags:["git"]},{id:"box-no-gh-auth",symptom:"Push from box fails",cause:"Box git has no GitHub auth",avoidance:"Push from the Mac",check:{kind:"id",value:"pit.box-no-gh-auth"},keywords:["ship","ff","push","box","github","auth"],tags:["git"]},{id:"ci-yml-main-only",symptom:"Expecting GH Actions on non-main push",cause:"Old ci.yml push trigger covered only main; CI being removed \u2014 gate is local suite",avoidance:"Run local `npm run ci` (or suite subset); do not wait on Actions",check:{kind:"id",value:"pit.local-suite-gate"},keywords:["ci","actions","github actions","npm run ci","main only"],tags:["ci"]},{id:"secrets-in-logs",symptom:"Secrets printed in logs/CLI",cause:"Verbose dump of env/files",avoidance:"Print existence / path / fingerprint only",check:{kind:"id",value:"pit.secrets-in-logs"},keywords:["secrets","logs","token","keypair","env","fingerprint"],tags:["secrets"]},{id:"no-prs-daily-magic",symptom:"PR windows opened in Mac Chrome",cause:"Habit from other repos",avoidance:"No PRs for daily-magic; never open PR UI",check:{kind:"id",value:"pit.no-prs"},keywords:["pr","pull request","chrome","daily-magic"],tags:["git"]}]});var Lte,Ite,sy,Hw=l(()=>{"use strict";JH();Lte=YH,Ite=e=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags??[],projectId:null,source:"seed",hitCount:0,lastSeenAt:null,severity:"warn"}),sy=()=>Lte.map(Ite)});var XH,ZH=l(()=>{"use strict";Hw();Jc();XH=e=>sy().reduce((r,o)=>Bi(e,null,o.id)!==null?r:(Yf(e,o),r+1),0)});var QH,eF,tF=l(()=>{"use strict";Zc();QH=e=>e.id.trim().length===0?{kind:"empty_id"}:e.projectId.trim().length===0?{kind:"empty_project_id"}:e.symptom.length>gg?{kind:"field_too_long",field:"symptom",max:gg}:e.cause.length>fg?{kind:"field_too_long",field:"cause",max:fg}:e.avoidance.length>yg?{kind:"field_too_long",field:"avoidance",max:yg}:null,eF=e=>e.activeCountAfter>yi?{kind:"active_cap",max:yi}:null});var rF,oF=l(()=>{"use strict";Jc();Mw();Yc();Qf();tF();rF=(e,t)=>{let r=QH(t);if(r!==null)return{ok:!1,error:r};let o=t.id.trim(),n=Bi(e,t.projectId,o),s=VH(e,t.projectId,o),i=t.source??"project",a={id:o,projectId:t.projectId,symptom:t.symptom,cause:t.cause,avoidance:t.avoidance,check:t.check,keywords:t.keywords,tags:t.tags??[],source:i,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt,severity:t.severity??n?.severity??"warn"},d=os(e,{projectId:t.projectId,includeRetired:!0}).filter(f=>f.id!==a.id),p=kH([...d,a]),g=eF({activeCountAfter:p});return g!==null?{ok:!1,error:g}:(Yf(e,a),{ok:!0,pitfall:a})}});var ss,Fw=l(()=>{"use strict";Iw();Yc();MH();BH();qH();Dw();ZH();oF();ss=e=>{let t=e.dbPath??(e.layout!==void 0?Vi(e.layout):(()=>{throw new Error("createPitfallRegistry requires dbPath or layout")})()),r=$H(t);return XH(r),{dbPath:t,listPitfalls:o=>wH(r,o),getPitfall:o=>ey(r,o),upsertPitfall:o=>rF(r,o),recordHit:o=>KH(r,o),matchPitfalls:o=>OH(r,o),close:()=>UH(r)}}});var xte,Wte,iy,zw=l(()=>{"use strict";ry();Lw();xte=(e,t,r)=>{let o=t.projectId?.trim();return o!==void 0&&o.length>0?o:r===null||e.resolveProjectId===void 0?null:e.resolveProjectId(r)},Wte=(e,t,r,o)=>{for(let n of o)try{t.recordHit({projectId:r,id:n.id})}catch(s){e.logError?.(s)}},iy=(e,t)=>{try{let r=t.cwd?.trim()??"",o=r.length>0?r:null;if(o!==null&&e.isDeclined?.(o)===!0)return{status:"none"};let n=xte(e,t,o);if(n===null||e.registry===null)return{status:"none",promptCreate:o!==null};let s=e.registry.matchPitfalls({projectId:n,text:t.message??""});if(s.length===0)return{status:"miss",projectId:n};Wte(e,e.registry,n,s);let i=Xf(s);return{status:"hit",projectId:n,pitfalls:i,tip:Ww(i)}}catch(r){return e.logError?.(r),{status:"none"}}}});var ay,nF=l(()=>{"use strict";ry();ay={name:Gi.name,description:Gi.description,inputSchema:Gi.inputSchema}});var Qr,sF,iF,eo,Ote,Ki,aF,Qc=l(()=>{"use strict";Qr=m(require("node:fs")),sF=m(require("node:os")),iF=m(require("node:path")),eo=()=>({readUtf8:e=>Qr.default.readFileSync(e,"utf8"),writeUtf8:(e,t)=>{Qr.default.writeFileSync(e,t,"utf8")},exists:e=>Qr.default.existsSync(e),mkdirp:e=>{Qr.default.mkdirSync(e,{recursive:!0})},rename:(e,t)=>{Qr.default.renameSync(e,t)},realpath:e=>Qr.default.realpathSync.native(e)}),Ote=()=>({homedir:()=>sF.default.homedir()}),Ki=()=>({...eo(),...Ote()}),aF=e=>({...eo(),homedir:()=>e,realpath:r=>{let o=iF.default.resolve(r);return Qr.default.existsSync(o)?Qr.default.realpathSync.native(o):o}})});var ly,lF=l(()=>{"use strict";ly=(e,t)=>{let r=e.trim();if(r.length===0)return r;try{return t.exists(r)?t.realpath(r):r}catch{return r}}});var $w,cF=l(()=>{"use strict";Nw();Gt();$w=e=>ny(e,KM)});var dF,Ge,to=l(()=>{"use strict";dF=m(require("node:path")),Ge=e=>{let{fs:t,filePath:r,contents:o}=e;t.mkdirp(dF.default.dirname(r));let n;e.backup===!0&&t.exists(r)&&(n=`${r}.aw-bak.${new Date().toISOString().replaceAll(":","-")}`,t.writeUtf8(n,t.readUtf8(r)));let s=`${r}.aw-tmp`;return t.writeUtf8(s,o),t.rename(s,r),n!==void 0?{backupPath:n}:{}}});var cy,Mte,ed,pF,dy,py,qi,uy=l(()=>{"use strict";Qc();lF();cF();to();cy=()=>({byRealpath:{}}),Mte=e=>{try{let t=JSON.parse(e);if(typeof t!="object"||t===null)return cy();let r=t.byRealpath;return typeof r!="object"||r===null?cy():{byRealpath:r}}catch{return cy()}},ed=(e,t=eo())=>{let r=$w(e);return t.exists(r)?Mte(t.readUtf8(r)):cy()},pF=(e,t,r)=>{Ge({fs:r,filePath:$w(e),contents:`${JSON.stringify(t,null,2)}
`})},dy=e=>{let t=e.fs??eo(),r=ly(e.cwd,t),o={declinedAt:e.nowIso??new Date().toISOString(),cwd:e.cwd},n=ed(e.layout,t);return pF(e.layout,{byRealpath:{...n.byRealpath,[r]:o}},t),o},py=e=>{let t=e.fs??eo(),r=ly(e.cwd,t),o=ed(e.layout,t);if(o.byRealpath[r]===void 0)return!1;let n=Object.fromEntries(Object.entries(o.byRealpath).filter(([s])=>s!==r));return pF(e.layout,{byRealpath:n},t),!0},qi=e=>{let t=e.fs??eo(),r=ly(e.cwd,t);return ed(e.layout,t).byRealpath[r]!==void 0}});var Jo,my,Uw=l(()=>{"use strict";Jo=(e,t)=>{let r=e[t];if(typeof r!="string")return;let o=r.trim();return o.length>0?o:void 0},my=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return{};let t=e;return{...Jo(t,"cwd")!==void 0?{cwd:Jo(t,"cwd")}:{},...Jo(t,"message")!==void 0?{message:Jo(t,"message")}:{},...Jo(t,"sessionId")!==void 0?{sessionId:Jo(t,"sessionId")}:{},...Jo(t,"projectId")!==void 0?{projectId:Jo(t,"projectId")}:{}}}});var Yo,gy=l(()=>{"use strict";Wt();zw();Fw();uy();Uw();Yo=e=>{let t=e.logError??(o=>{let n=o instanceof Error?o.message:String(o);console.error(`[agent-witch] check_context: ${n}`)}),r=e.isDeclined??(o=>qi({layout:e.layout,cwd:o}));return o=>{let n=my(o),s=null;try{return s=ss({layout:e.layout}),iy({registry:s,resolveProjectId:lw,isDeclined:r,logError:t},n)}catch(i){return t(i),{status:"none"}}finally{s?.close()}}}});var uF,mF=l(()=>{"use strict";uF=["Agent Witch \xB7 check_context: this folder is not an Agent Witch project yet.","Ask the user once whether to add it in Agent Witch Local (Projects) so saved pitfalls show up here.","If they decline or ignore it, do not ask again this session."].join(`
`)});var jte,Bw,Nte,Dte,Hte,fy,Gw=l(()=>{"use strict";mF();jte="UserPromptSubmit",Bw=(e,t)=>{let r=e[t];return typeof r=="string"&&r.trim().length>0?r:void 0},Nte=e=>{let t;try{t=JSON.parse(e)}catch{return null}if(typeof t!="object"||t===null||Array.isArray(t))return null;let r=t,o=Bw(r,"cwd"),n=Bw(r,"prompt"),s=Bw(r,"session_id");return{...o!==void 0?{cwd:o}:{},...n!==void 0?{message:n}:{},...s!==void 0?{sessionId:s}:{}}},Dte=e=>{if(e.status==="hit"){let t=e.tip?.trim()??"";return t.length>0?t:null}return e.status==="none"&&e.promptCreate===!0?uF:null},Hte=e=>`${JSON.stringify({hookSpecificOutput:{hookEventName:jte,additionalContext:e}})}
`,fy=async e=>{try{let t=Nte(await e.readStdin());if(t===null)return e.writeStderr(`[agent-witch] mcp-hook: stdin is not a JSON object
`),0;let r=Dte(await e.runCheckContext(t));r!==null&&e.writeStdout(Hte(r))}catch(t){let r=t instanceof Error?t.message:String(t);try{e.writeStderr(`[agent-witch] mcp-hook: ${r}
`)}catch{}}return 0}});var Fte,zte,gF,fF=l(()=>{"use strict";gy();Gw();Fte=1500,zte=(e,t)=>new Promise(r=>{let o=[],n=!1,s=()=>{n||(n=!0,clearTimeout(i),e.removeAllListeners("data"),e.removeAllListeners("end"),e.removeAllListeners("error"),e.pause(),r(Buffer.concat(o).toString("utf8")))},i=setTimeout(s,t);e.on("data",a=>{o.push(Buffer.isBuffer(a)?a:Buffer.from(a,"utf8"))}),e.on("end",s),e.on("error",s)}),gF=async e=>{let t=r=>{process.stderr.write(r)};return fy({readStdin:()=>zte(process.stdin,Fte),writeStdout:r=>{process.stdout.write(r)},writeStderr:t,runCheckContext:Yo({layout:e.layout,logError:r=>{let o=r instanceof Error?r.message:String(r);t(`[agent-witch] mcp-hook check_context: ${o}
`)}})})}});var $te,yy,yF=l(()=>{"use strict";gy();Uw();$te="/api/local/check-context",yy=async e=>{if(e.pathname!==$te)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t={};try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{return e.sendJson(e.response,400,{status:"none"}),!0}let r=Yo({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,r(my(t))),!0}});var hF,hy,Ute,Bte,SF,PF=l(()=>{"use strict";hF=m(require("node:path"));Gt();to();hy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ute={hooks:[{type:"command",command:Fb,timeout:3,[Nn]:!0}]},Bte=e=>Array.isArray(e)&&e.some(t=>hy(t)&&Array.isArray(t.hooks)&&t.hooks.some(r=>hy(r)&&(r.command===Fb||r[Nn]===!0))),SF=e=>{let t=hF.default.join(e.io.homedir(),VM),r={};if(e.io.exists(t))try{let a=JSON.parse(e.io.readUtf8(t));hy(a)&&(r={...a})}catch{r={}}let o=hy(r.hooks)?{...r.hooks}:{},n=o.UserPromptSubmit;if(Bte(n))return{ok:!0,path:t,wrote:!1};let s=Array.isArray(n)?[...n]:[];s.push(Ute),o.UserPromptSubmit=s;let{backupPath:i}=Ge({fs:e.io,filePath:t,contents:`${JSON.stringify({...r,hooks:o},null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:i}}});var Ji,Sy=l(()=>{"use strict";Gt();Ji=e=>{let t=e.begin??ui,r=e.end??mi,o=`${t}
${e.blockBody.trimEnd()}
${r}
`,n=e.existing.indexOf(t);if(n<0){let p=`${e.existing.length===0||e.existing.endsWith(`
`)?e.existing:`${e.existing}
`}${o}`;return{next:p,changed:p!==e.existing}}let s=e.existing.indexOf(r,n);if(s<0){let d=`${e.existing.slice(0,n)}${o}`;return{next:d,changed:d!==e.existing}}let i=s+r.length,a=e.existing.slice(i).replace(/^\n/,""),c=`${e.existing.slice(0,n)}${o}${a}`;return{next:c,changed:c!==e.existing}}});var AF,Gte,bF,_F=l(()=>{"use strict";AF=m(require("node:path"));Sy();Gt();to();Gte=["On the first user message of a session, call the Agent Witch MCP tool","`check_context` with the current cwd.","If status is miss or none (declined), stay silent. If hit, follow the tip."].join(`
`),bF=e=>{let t=AF.default.join(e.io.homedir(),GM),r=e.io.exists(t)?e.io.readUtf8(t):"",{next:o,changed:n}=Ji({existing:r,blockBody:Gte,begin:ui,end:mi});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=Ge({fs:e.io,filePath:t,contents:o,backup:r.length>0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var kF,wF,TF=l(()=>{"use strict";kF=m(require("node:path"));Sy();Gt();to();wF=e=>{let t=kF.default.join(e.io.homedir(),BM),r=ug.map(c=>`"${c}"`).join(", "),o=[`[mcp_servers.${Bl}]`,`command = "${Gl}"`,`args = [${r}]`].join(`
`),n=e.io.exists(t)?e.io.readUtf8(t):"",{next:s,changed:i}=Ji({existing:n,blockBody:o,begin:ui,end:mi});if(!i)return{ok:!0,path:t,wrote:!1};let{backupPath:a}=Ge({fs:e.io,filePath:t,contents:s,backup:n.length>0});return{ok:!0,path:t,wrote:!0,backupPath:a}}});var EF,Vw,RF,CF=l(()=>{"use strict";EF=m(require("node:path"));Gt();to();Vw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),RF=e=>{let t=EF.default.join(e.io.homedir(),UM),r={command:Gl,args:[...ug]},o={};if(e.io.exists(t))try{let d=JSON.parse(e.io.readUtf8(t));Vw(d)&&(o={...d})}catch{o={}}let n=Vw(o.mcpServers)?{...o.mcpServers}:{},s=n[Bl];if(Vw(s)&&s.command===r.command&&Array.isArray(s.args)&&JSON.stringify(s.args)===JSON.stringify(r.args))return{ok:!0,path:t,wrote:!1};n[Bl]=r;let a={...o,mcpServers:n},{backupPath:c}=Ge({fs:e.io,filePath:t,contents:`${JSON.stringify(a,null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:c}}});var Yi,Kw=l(()=>{"use strict";Qc();PF();_F();TF();CF();Yi=e=>{let t=e?.io??Ki();return{ok:!0,cursorMcp:RF({io:t}),codexConfig:wF({io:t}),codexAgents:bF({io:t}),claudeHook:SF({io:t})}}});var vF,LF=l(()=>{"use strict";Gt();vF=e=>{let t=["On the first user message of a session, call the Agent Witch MCP tool","`check_context` with this folder's cwd.",`projectId: ${e}`,"If status is miss or none (already declined), stay silent.","If status is hit, follow the tip. Do not dump large context."].join(`
`);return["---","description: Agent Witch check_context (token-saver)","alwaysApply: true","---","",gi,t,Ul,""].join(`
`)}});var IF,Vte,xF,WF=l(()=>{"use strict";IF=m(require("node:path"));LF();Gt();Sy();to();Vte=e=>e.slice(e.indexOf(gi)+gi.length,e.indexOf(Ul)).trim(),xF=e=>{let t=IF.default.join(e.projectRoot,pg),r=vF(e.projectId);if(!e.fs.exists(t))return Ge({fs:e.fs,filePath:t,contents:r}),{ok:!0,path:t,wrote:!0};let{next:o,changed:n}=Ji({existing:e.fs.readUtf8(t),blockBody:Vte(r),begin:gi,end:Ul});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=Ge({fs:e.fs,filePath:t,contents:o,backup:!0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var Jw,qw,OF,MF=l(()=>{"use strict";Jw=m(require("node:path"));to();qw="# agent-witch-token-saver (local; never commit)",OF=e=>{let t=Jw.default.join(e.repoRoot,".git");if(!e.fs.exists(t))return{ok:!1,reason:"not a git working tree"};let r=Jw.default.join(t,"info","exclude"),o=e.fs.exists(r)?e.fs.readUtf8(r):"",n=o.length>0?o.split(/\r?\n/):[],s=new Set(n.map(c=>c.trim())),i=e.relativePaths.filter(c=>!s.has(c));if(i.length===0&&s.has(qw))return{ok:!0,path:r,wrote:!1};let a=[...n];for(;a.length>0&&a[a.length-1]==="";)a.pop();s.has(qw)||a.push("",qw);for(let c of i)a.push(c);return a.push(""),Ge({fs:e.fs,filePath:r,contents:a.join(`
`)}),{ok:!0,path:r,wrote:i.length>0}}});var Py,Yw=l(()=>{"use strict";Gt();WF();MF();Py=e=>{let t=xF({fs:e.fs,projectRoot:e.projectRoot,projectId:e.projectId}),r=OF({fs:e.fs,repoRoot:e.projectRoot,relativePaths:[pg]});return{ok:!0,cursorRule:t,gitExclude:r}}});var Xw,Zw,Ay,Qw,eT=l(()=>{"use strict";Xw=["pitfalls","preflight","localMcp","history","ollama","skillGen"],Zw=["on","off","degraded","unavailable"],Ay={pitfalls:"on",preflight:"on",localMcp:"on",history:"off",ollama:"off",skillGen:"off"},Qw=()=>({...Ay})});var Kte,qte,tT,jF=l(()=>{"use strict";eT();Kte=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qte=e=>Zw.find(t=>t===e)??null,tT=e=>{if(!Kte(e))return null;let t={...Ay};for(let r of Xw){let o=qte(e[r]);o!==null&&(t[r]=o)}return t}});var NF=l(()=>{"use strict";eT();jF()});var DF,Jte,Yte,HF,FF=l(()=>{"use strict";DF=m(require("node:path"));Wt();NF();to();Jte="token-saver.json",Yte=(e,t)=>{if(!e.exists(t))return null;try{return tT(JSON.parse(e.readUtf8(t)))}catch{return null}},HF=e=>{let t=DF.default.join(e.projectRoot,Ol,Jte),r=e.flags??{...Qw(),...Yte(e.fs,t)},o=`${JSON.stringify(r,null,2)}
`;return e.fs.exists(t)&&e.fs.readUtf8(t)===o?{ok:!0,path:t,wrote:!1}:(Ge({fs:e.fs,filePath:t,contents:o}),{ok:!0,path:t,wrote:!0})}});var ro,Tr,by,rT=l(()=>{"use strict";ro=(e,t)=>{if(t==="remove")return{ok:!0,state:"Connected"};switch(e){case"Unconnected":return t==="connect"?{ok:!0,state:"SigningIn"}:Tr(e,t);case"SigningIn":return t==="signInComplete"?{ok:!0,state:"Connected"}:Tr(e,t);case"Connected":return t==="writeGlobalTriggers"?{ok:!0,state:"GlobalTriggersWritten"}:Tr(e,t);case"GlobalTriggersWritten":return t==="decline"?{ok:!0,state:"Declined"}:t==="accept"?{ok:!0,state:"ProjectResolved"}:t==="writeGlobalTriggers"?{ok:!0,state:"GlobalTriggersWritten"}:Tr(e,t);case"Declined":return t==="clearDecline"?{ok:!0,state:"GlobalTriggersWritten"}:Tr(e,t);case"ProjectResolved":return t==="applyDefaults"?{ok:!0,state:"DefaultsApplied"}:Tr(e,t);case"DefaultsApplied":return t==="writeProjectFragments"?{ok:!0,state:"ProjectFragmentsWritten"}:Tr(e,t);case"ProjectFragmentsWritten":return t==="verify"?{ok:!0,state:"Verified"}:Tr(e,t);case"Verified":return t==="accept"||t==="writeProjectFragments"?{ok:!0,state:e}:Tr(e,t);default:return Tr(e,t)}},Tr=(e,t)=>({ok:!1,reason:`Illegal transition ${e} + ${t}`,state:e}),by=e=>e==="Declined"});var Xte,Zte,zF,$F=l(()=>{"use strict";FF();Qc();uy();rT();Kw();Yw();Xte="projectId required on accept",Zte=e=>{let t=e.projectId;if(e.resolveProject!==void 0)try{t=e.resolveProject(e.cwd).projectId}catch(o){return{ok:!1,reason:`project resolve failed: ${o instanceof Error?o.message:String(o)}`}}let r=t?.trim()??"";return r.length>0?{ok:!0,projectId:r}:{ok:!1,reason:Xte}},zF=e=>{let t=e.fs??eo(),r=e.io??Ki(),o=e.fromState??"GlobalTriggersWritten";if(!e.accept){let d=ro(o,"decline");return d.ok?(dy({layout:e.layout,cwd:e.cwd,fs:t}),{ok:!0,state:"Declined"}):{ok:!1,state:d.state,reason:d.reason}}let n=by(o)||qi({layout:e.layout,cwd:e.cwd,fs:t});n&&(o="Declined");let s=Zte(e);if(!s.ok)return{ok:!1,state:o,reason:s.reason};if(n){let d=ro(o,"clearDecline");if(!d.ok)return{ok:!1,state:d.state,reason:d.reason};py({layout:e.layout,cwd:e.cwd,fs:t}),o=d.state}Yi({io:r}),o=ro(o,"writeGlobalTriggers").ok?"GlobalTriggersWritten":o;let i=ro(o,"accept");if(!i.ok)return{ok:!1,state:i.state,reason:i.reason};o=i.state;let a=ro(o,"applyDefaults");if(!a.ok)return{ok:!1,state:a.state,reason:a.reason};HF({fs:t,projectRoot:e.cwd}),o=a.state;let c=ro(o,"writeProjectFragments");return c.ok?(Py({fs:t,projectRoot:e.cwd,projectId:s.projectId}),{ok:!0,state:c.state,projectId:s.projectId}):{ok:!1,state:c.state,reason:c.reason}}});var UF={};St(UF,{AWL_CHECK_CONTEXT_TOOL:()=>ay,checkContext:()=>iy,clearProjectDecline:()=>py,createCheckContextRunner:()=>Yo,createNodeCliIo:()=>Ki,createPitfallRegistry:()=>ss,createTempCliIo:()=>aF,declineProjectForCwd:()=>dy,isDeclinedCwd:()=>qi,isDeclinedTerminal:()=>by,listBundledSeedPitfalls:()=>sy,matchPitfallsByKeywords:()=>oy,readDeclinedProjectsStore:()=>ed,resolveTokenSaverDbPath:()=>Vi,runCheckContextHook:()=>fy,runCheckContextHookCli:()=>gF,runSetupProject:()=>zF,shadowPitfalls:()=>Zf,transitionSetupProject:()=>ro,tryHandleTokenSaverLocalRequest:()=>yy,writeGlobalTriggers:()=>Yi,writeProjectFragments:()=>Py});var td=l(()=>{"use strict";Fw();Dw();Ow();Qf();Hw();zw();nF();gy();Gw();fF();yF();Kw();Yw();$F();uy();rT();Qc()});var oT,BF=l(()=>{"use strict";oT=e=>({id:e.id,projectId:e.projectId,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:e.source,overridesSeed:e.source!=="seed",hitCount:e.hitCount,lastSeenAt:e.lastSeenAt,updatedAt:null})});var GF,VF,Qte,ere,tre,_y,nT=l(()=>{"use strict";td();hg();BF();GF=e=>{try{return e.dbPath!==void 0?ss({dbPath:e.dbPath}):e.layout!==void 0?(Vi(e.layout),ss({layout:e.layout})):null}catch{return null}},VF=(e,t,r)=>{let o=e.listPitfalls({projectId:t,includeRetired:r,format:"full"});return o.format==="full"?o.items:[]},Qte=(e,t,r)=>{for(let o of r)o.source!=="seed"&&e.upsertPitfall({id:o.id,projectId:t,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source==="retired"?"retired":"project"})},ere=e=>e.kind==="active_cap"?{ok:!1,reason:"active_limit"}:{ok:!1,reason:"rejected"},tre=e=>{let t=e.cloud??null;return{listPitfalls:async(r,o)=>{let n=GF(e);try{if(t!==null){let i=await t.listPitfalls(r,o);if(i.ok)return n!==null?(Qte(n,r,i.items),{ok:!0,items:VF(n,r,o.includeRetired).map(oT),syncedAt:i.syncedAt}):i}return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:VF(n,r,o.includeRetired).map(oT),syncedAt:null}}finally{n?.close()}},upsertPitfall:async(r,o)=>{if(t!==null){let s=await t.upsertPitfall(r,o);if(!s.ok)return s}let n=GF(e);if(n===null)return t!==null?{ok:!0}:{ok:!1,reason:"unavailable"};try{let s=n.upsertPitfall({id:o.id,projectId:r,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source});return s.ok?{ok:!0}:ere(s.error)}finally{n.close()}}}},_y=tre});var Wt=l(()=>{"use strict";Ui();$i();xD();$o();lf();WD();xo();UD();GD();rH();$f();xc();oH();uH();mH();gH();fH();hH();SH();PH();AH();ow();tw();Yr();nT()});var ky,rd,KF,sT,is,iT=l(()=>{"use strict";ky=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},rd=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=ky(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},KF=e=>e>=1&&e<=5,sT=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return ky(t,"UTC")},is=e=>{let t=e.from??new Date,r=ky(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return rd(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=rd(r,e.timeZone,o,0),s=ky(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?rd(sT(r),e.timeZone,o,0):n;if(!i&&KF(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=sT(a),KF(a.weekday))return rd(a,e.timeZone,o,0);return rd(sT(r),e.timeZone,o,0)}});var qF,aT,oo,lT=l(()=>{"use strict";qF=require("node:crypto");ee();Wt();iT();Nf();aT=!1,oo=async e=>{if(aT)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=z();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=V({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=jf(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};aT=!0;let n=(0,qF.randomUUID)();try{let s=await Oi(t,"claude-cli",o.prompt);await Qk(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=is({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return Mf(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{aT=!1}}});var wy,JF=l(()=>{"use strict";ee();lT();Nf();wy=async()=>{let e=z();if(e===null)return;let t=Yt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await oo(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var od=l(()=>{"use strict";Nf();JF();lT();iT()});var YF=l(()=>{"use strict";od()});var XF=l(()=>{"use strict";Kk()});var ZF=l(()=>{"use strict";XF()});var cT=l(()=>{"use strict";od()});var rre,ore,nd,dT=l(()=>{"use strict";YF();ZF();cT();Xe();rre=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),ore=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??is({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??is({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},nd=e=>{let t=rre(e.profileEmail),r=Yt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=zi(s);return i!==null?[ore(i,o.get(i.id))]:[]});return Of(t,n),{ok:!0,writtenCount:n.length}}});var pT=l(()=>{"use strict";od()});var QF=l(()=>{"use strict";ee()});var ez=l(()=>{"use strict";dT();pT();cT();QF()});var tz,sd,id,ad,rz=l(()=>{"use strict";tz=m(require("node:os"));ez();Fc();zc();sd=e=>{if(!Jr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Qn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=nd({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},id=async e=>{if(!Jr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Qn(t)?oo(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},ad=()=>{let e=z(),t=e!==null?Yt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:tz.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var uT=l(()=>{"use strict";rz()});var Ty=l(()=>{"use strict";ae()});var Ey=l(()=>{"use strict";ae()});var Ry,nz,sz,oz,nre,sre,Xi,mT=l(()=>{"use strict";Ry=m(require("node:fs")),nz=m(require("node:os")),sz=m(require("node:path"));Ty();Ey();Tc();Xe();oz=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},nre=e=>sz.default.join(nz.default.homedir(),"Library","LaunchAgents",`${e}.plist`),sre=async e=>Ry.default.existsSync(nre(e))?(await Ye(e)).ok:!1,Xi=async(e=C())=>{let t=Ry.default.existsSync(Zg(e)),r=!Ry.default.existsSync(gr(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=wc(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await oz(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${fe(e)}-wake`;await sre(i)&&s.push(i);for(let c of pe(e))(await Ye(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await oz(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var iz=l(()=>{"use strict";ae()});var gT=l(()=>{"use strict";Gn();ae()});var fT=l(()=>{"use strict";Gn()});var yT=l(()=>{"use strict";ae()});var lz,az,ld,hT=l(()=>{"use strict";lz=m(require("node:fs"));Lt();Ty();Ey();Xe();az=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},ld=async(e=C())=>{if(!lz.default.existsSync(gr(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await az())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of pe(e))(await Ye(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await az();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var cz=l(()=>{"use strict";ae()});var dz,as,ST,ire,are,lre,pz,cre,uz,Zi,Cy=l(()=>{"use strict";dz=require("node:crypto"),as=m(require("node:fs")),ST=m(require("node:path"));Xe();ire="watchdog-log.ndjson",are=200,lre=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pz=(e=C())=>{let t=N(),r=t.installDir===e?t.logsDir:Rn({installDir:e,profileEmail:t.profileEmail});return ST.default.join(r,ire)},cre=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!lre(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},uz=(e,t=C())=>{let r={id:(0,dz.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=pz(t);as.default.mkdirSync(ST.default.dirname(o),{recursive:!0});let n=as.default.existsSync(o)?as.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-are+1)),JSON.stringify(r)];return as.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Zi=(e=20,t=C())=>{let r=pz(t);if(!as.default.existsSync(r))return[];let o=as.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=cre(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var PT,AT,bT,_T=l(()=>{"use strict";He();PT=cl.watchdogReinstallState,AT=900*1e3,bT=3e3});var mz=l(()=>{"use strict";_T()});var gz={};St(gz,{verifyAgentWitchReviveAfterKickstart:()=>pre});var dre,pre,fz=l(()=>{"use strict";mz();fT();yT();Xe();dre=e=>new Promise(t=>{setTimeout(t,e)}),pre=async e=>{if(await dre(e.verifyDelayMs??bT),!await Ln(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),o=ve(r);return!$e(o,e.staleAfterMs)}});var cd,kT,ure,yz,hz,wT,TT,ET=l(()=>{"use strict";cd=m(require("node:fs")),kT=m(require("node:path"));G();_T();ure=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yz=e=>kT.default.join(e,PT),hz=(e=C())=>{let t=yz(e);if(!cd.default.existsSync(t))return null;try{let r=JSON.parse(cd.default.readFileSync(t,"utf8"));return!ure(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},wT=(e=C(),t=Date.now())=>{let r=hz(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=AT:!0},TT=(e=C(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=yz(e);return cd.default.mkdirSync(kT.default.dirname(o),{recursive:!0}),cd.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var RT,Sz=l(()=>{"use strict";ae();ET();RT=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!wT())return{attempted:!1,ok:!1,targets:e};TT();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Ye(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var Pz=l(()=>{"use strict";ET();Sz()});var CT=l(()=>{"use strict";Sr()});var Az=l(()=>{"use strict";Sr()});var bz,Qi,_z,kz,wz,mre,gre,Tz,fre,yre,Ez,Rz=l(()=>{"use strict";bz=require("node:child_process"),Qi=m(require("node:fs")),_z=m(require("node:os")),kz=m(require("node:path")),wz=require("node:util");CT();Az();Xe();mre=(0,wz.promisify)(bz.execFile),gre=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Tz=e=>{let t=Je(e),r=t===null?N():N(t);if(!Qi.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Qi.default.readFileSync(r.configPath,"utf8"));return!gre(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},fre=e=>Tz(e)?.wsUrl??null,yre=e=>{let t=fre(e);return t!==null?ze(t):Fe(e)?.appOrigin??null},Ez=async e=>{let t=e?.installDir??C(),r=Tz(t),o=r!==null?ze(r.wsUrl):yre(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=kz.default.join(_z.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Qi.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??Je(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await mre("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Qi.default.existsSync(i)&&Qi.default.unlinkSync(i)}}});var Cz={};St(Cz,{attemptAgentWitchWatchdogReinstall:()=>hre});var hre,vz=l(()=>{"use strict";Pz();Rz();hre=async e=>RT(e,()=>Ez())});var Lz,Iz,xz,Sre,Pre,Are,dd,vT=l(()=>{"use strict";iz();gT();fT();yT();hT();mT();Ty();Ey();Xe();_i();cz();Cy();Lz=e=>e===null?N():N(e),Iz=async(e,t,r)=>{if(!await Ln(e))return"not_running";let n=Lz(t);if(Kt(n))return"healthy";let s=ve(n);return $e(s,r)?"stale_connection":"healthy"},xz=async e=>{let t=e?.staleAfterMs??12e4,r=C(),o=pe(r);return Promise.all(o.map(async n=>{let s=await Iz(n.launchAgentLabel,n.profileEmail,t),i=Lz(n.profileEmail),a=ve(i),c=await Ln(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:$e(a,t),needsRevive:s!=="healthy",reason:s}}))},Sre=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},Pre=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",Are=async e=>{let t=await Ye(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(fz(),gz)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},dd=async e=>{if(!Ut())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=C();await Xi(r),await ld(r);let o=pe(r),n=[];for(let p of o){let g=await Iz(p.launchAgentLabel,p.profileEmail,t);if(g==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:g});continue}n.push(await Are({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:g,staleAfterMs:t}))}if(n.length===0){let p=Cn();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(vz(),Cz)),g=await p(n);s=g.attempted,i=g.ok,a=g.errorMessage,c=[...g.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&uz({event:Pre(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:Sre(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var Wz,vy,Oz=l(()=>{"use strict";Wz=m(require("node:os"));gT();Cy();vT();vy=async()=>{let e=await xz(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:Wz.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Zi(1)[0]??null}}});var LT=l(()=>{"use strict";mT();vT();Oz();Cy()});var pd,ud,md,Mz=l(()=>{"use strict";ae();LT();pd=async()=>{await Xi();let e=pe(),t=[];for(let r of e){let o=await Ye(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Cn();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},ud=dd,md=dd});var IT=l(()=>{"use strict";Mz()});var Iy,Ly,jz,xT,Nz,bre,_re,kre,wre,Tre,xy,Dz=l(()=>{"use strict";Iy=require("node:child_process"),Ly=m(require("node:fs")),jz=m(require("node:os")),xT=m(require("node:path")),Nz=require("node:util");ae();G();vn();bre=(0,Nz.promisify)(Iy.execFile),_re=()=>xT.default.join(jz.default.homedir(),"Library","LaunchAgents"),kre=async e=>{if(!vt())return;let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await bre("launchctl",["bootout",r]).catch(()=>{})},wre=e=>{let t=xT.default.join(_re(),`${e}.plist`);Ly.default.existsSync(t)&&Ly.default.unlinkSync(t)},Tre=e=>{(0,Iy.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},xy=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=C();if(!Ly.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=zr(e);for(let r of t)await kre(r),wre(r);return Tre(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var Hz,Wy,Fz,ea,zz,Ere,Rre,Cre,WT,vre,OT,$z=l(()=>{"use strict";Hz=require("node:child_process"),Wy=m(require("node:fs")),Fz=m(require("node:os")),ea=m(require("node:path")),zz=require("node:util");ae();vn();Ere=(0,zz.promisify)(Hz.execFile),Rre=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],Cre=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],WT=e=>{Wy.default.existsSync(e)&&Wy.default.rmSync(e,{force:!0})},vre=async e=>{if(!vt())return;let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await Ere("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},OT=async e=>{let r=(e.listLaunchAgentLabels??zr)(e.layout.installDir),o=e.launchAgentsDir??ea.default.join(Fz.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??vre;for(let i of r)await n(i),WT(ea.default.join(o,`${i}.plist`));let s=ea.default.dirname(e.layout.configPath);for(let i of Rre)WT(ea.default.join(s,i));for(let i of Cre)WT(ea.default.join(e.layout.installDir,i));return Wy.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var MT,Uz=l(()=>{"use strict";MT="unknown_identity"});var jT=l(()=>{"use strict";_w();Uz()});var Lre,NT,Bz=l(()=>{"use strict";jT();Lre=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),NT=e=>e.type!=="system.error"||!Lre(e.payload)?!1:e.payload.errorCode===MT});var DT=l(()=>{"use strict";Dz();$z();Bz()});var Oy=l(()=>{"use strict";ae();Sr();DT();LT()});var ta,My,jy=l(()=>{"use strict";Oy();ta=(e=20)=>Zi(e),My=vy});var Ny,ra,Dy,Hy=l(()=>{"use strict";Oy();Ny=Un,ra=(e=20)=>Fn(e),Dy=e=>$n(e)});var Fy,HT=l(()=>{"use strict";Oy();Fy=()=>xy()});var Gz=l(()=>{"use strict";nk();Vk();uT();IT();jy();Hy();HT()});var Vz={};St(Vz,{buildAgentWitchAutomationStatusFromWakeServer:()=>ad,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Ny,buildAgentWitchWakeHealthResponse:()=>Rc,buildAgentWitchWakeIdentityResponse:()=>Cc,buildAgentWitchWatchdogStatus:()=>My,installHarnessFromWakeServer:()=>$c,readAgentWitchSelfUpdateLogEntries:()=>ra,readAgentWitchWatchdogLogEntries:()=>ta,restartAgentWitchFromWakeServer:()=>md,reviveAgentWitchWebSocketFromWakeServer:()=>ud,runAgentWitchSelfUpdateFromWakeServer:()=>Dy,runAgentWitchUninstallLocalFromWakeServer:()=>Fy,runAutomationFromWakeServer:()=>id,syncAutomationsFromWakeServer:()=>sd,wakeAgentWitchLaunchAgents:()=>pd});var Kz=l(()=>{"use strict";Gz()});var qz,Jz,FT,zT,Yz=l(()=>{"use strict";qz=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),Jz=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?qz(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?qz(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},FT=e=>{let t=e.watchdogLogs.map(Jz).join(""),r=e.updateLogs.map(Jz).join("");return`<!doctype html>
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
</html>`},zT=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var Xz,Zz,Qz=l(()=>{"use strict";Xz=m(require("node:net")),Zz=()=>new Promise((e,t)=>{let r=Xz.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var e$,Ire,xre,$T,t$=l(()=>{"use strict";e$=m(require("node:net"));ae();Qz();Ec();Tc();Xe();Ire=e=>new Promise(t=>{let r=e$.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),xre=e=>new Promise(t=>{setTimeout(t,e)}),$T=async(e={})=>{let t=C(),r=Jt(),o=Math.max(1,e.attempts??10),n=e.retryDelayMs??500;for(let i=1;i<=o;i+=1){if(await Ire(r))return oN(r),r;i<o&&await xre(n)}let s=await Zz();Qg(t,s),process.env.AGENT_WITCH_WAKE_PORT=String(s);try{Wl({launchAgentPrefix:fe(t),wakePort:s})}catch(i){console.error(`[agent-witch] Could not update LaunchAgent wake port: ${i instanceof Error?i.message:String(i)}`)}return s}});var Wre,UT,r$=l(()=>{"use strict";Wre=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),UT=e=>({force:Wre(e)&&e.force===!0})});var gd=l(()=>{"use strict";Fc();Yz();t$();r$();Eb();cg();On()});var BT,U,GT,VT,fd,o$=l(()=>{"use strict";BT=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},U=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},GT=e=>{e.writeHead(403),e.end()},VT=e=>e.url?.split("?")[0]??"/",fd=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var Zt=l(()=>{"use strict";o$()});var Ore,n$,s$=l(()=>{"use strict";uT();Zt();Ore=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return U(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},n$=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return U(e.response,200,ad(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await Ore(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=sd(t);return U(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await id(t);return U(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var Mre,a$,i$,l$,KT,c$,qT=l(()=>{"use strict";Mre=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],a$=e=>/embed|minilm|^bge-/i.test(e),i$=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),l$=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),KT=e=>e.filter(t=>t.trim().length>0&&!a$(t)),c$=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!a$(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>i$(s,o));if(n!==void 0)return n}for(let n of Mre){let s=r.find(i=>i$(i,n));if(s!==void 0)return s}return r[0]??null}});var JT,u$,m$,zy,g$,d$,p$,jre,Nre,Dre,Hre,Fre,zre,Qt,yd=l(()=>{"use strict";JT=require("node:child_process"),u$=m(require("node:fs")),m$=m(require("node:os")),zy=m(require("node:path"));Sr();qt();qT();g$=3e3,d$=["claude-cli","codex","cursor","antigravity"],p$={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},jre=(e,t)=>new Promise(r=>{let o=(0,JT.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},g$);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),Nre=()=>{let e=m$.default.homedir();return["ollama",zy.default.join(e,".local","bin","ollama"),zy.default.join(e,".agent-witch","ollama","ollama"),zy.default.join(e,".local-agent-witch","ollama","ollama")]},Dre=e=>new Promise(t=>{let r=(0,JT.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},g$);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(l$(Buffer.concat(o).toString("utf8")))})}),Hre=async()=>{for(let e of Nre()){if(e!=="ollama"&&!u$.default.existsSync(e))continue;let t=await Dre(e);if(t!==null)return t}return[]},Fre=e=>{let t=e.installedWriterIds.map(s=>p$[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=we(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${p$[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},zre=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:ki},Qt=async e=>{let t=d$.map(i=>{let a=Dg(i,e.commands);return jre(a.command,a.args)}),[r,...o]=await Promise.all([Hre(),...t]),n=d$.flatMap((i,a)=>o[a]===!0?[i]:[]),s=c$(r,zre());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:Fre({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var $re,Ure,YT,f$=l(()=>{"use strict";$re="http://127.0.0.1:11434",Ure=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},YT=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||$re;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?Ure(await o.json()):null}catch{return null}}});var XT=l(()=>{"use strict";qt();yd();f$();qT()});var Bre,y$,h$=l(()=>{"use strict";XT();Bre={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},y$=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:Bre[t]})),ollamaModels:KT(e.ollamaModels)})});var Gre,S$,P$=l(()=>{"use strict";XT();Zt();h$();Gre=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return U(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},S$=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Qt({commands:Te({})});return U(e.response,200,{ok:!0,...y$({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await Gre(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await YT({model:r,prompt:o});return n===null?(U(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(U(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var Vre,A$,b$=l(()=>{"use strict";Vk();Zt();Vre=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return U(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},A$=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await Vre(e);if(t===null)return!0;let r=$c(t);return U(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var _$=l(()=>{"use strict";Wt()});var ZT,k$=l(()=>{"use strict";_$();zc();ZT=e=>{if(!Jr(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:it({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var w$,QT,eE=l(()=>{"use strict";ee();Wt();zc();w$=e=>{if(!Jr(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},QT=async e=>{let t=w$(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Ko("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=z();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=V({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(it({projectFolderPath:r}),await qc(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var T$=l(()=>{"use strict";k$();eE()});var E$,R$=l(()=>{"use strict";T$();eE();Zt();E$=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=ZT(t);return U(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await QT(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return U(e.response,o,r,e.cors.headers),!0}return!1}});var C$,v$=l(()=>{"use strict";gd();Hy();jy();C$=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=ta(50),r=ra(50);return e.response.writeHead(200,zT()),e.response.end(FT({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var L$,I$=l(()=>{"use strict";nk();Zt();L$=e=>e.request.method==="GET"&&e.pathname==="/health"?(U(e.response,200,Rc(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(U(e.response,200,Cc(),e.cors.headers),!0):!1});var x$,W$=l(()=>{"use strict";HT();Zt();x$=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Fy();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}});var O$,M$=l(()=>{"use strict";IT();Zt();O$=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await ud();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await md();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await pd();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var j$,N$=l(()=>{"use strict";gd();Hy();Zt();j$=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Ny();return U(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=fd(e.request,"/update/logs",20,200);return U(e.response,200,{ok:!0,logs:ra(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=UT(t),o=await Dy({force:r});return U(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var D$,H$=l(()=>{"use strict";jy();Zt();D$=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await My();return U(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=fd(e.request,"/watchdog/logs",20,200);return U(e.response,200,{ok:!0,logs:ta(t)},e.cors.headers),!0}return!1}});var F$,z$=l(()=>{"use strict";s$();P$();b$();R$();v$();I$();W$();M$();N$();H$();F$=[L$,C$,D$,O$,j$,x$,A$,E$,n$,S$]});var $$,U$=l(()=>{"use strict";z$();$$=async e=>{for(let t of F$)if(await t(e))return!0;return!1}});var Kre,B$,G$=l(()=>{"use strict";Fc();Zt();U$();Kre=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:VT(e),readJsonBody:()=>BT(e)}),B$=async(e,t,r)=>{let o=e.headers.origin,n=If(o);try{if(o!==void 0&&o.length>0&&!n.allowed){GT(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=Kre(e,t,r,n);if(await $$(s))return;U(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{U(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var V$,ls,$y,Uy=l(()=>{"use strict";V$=m(require("node:http"));gd();G$();ls=async()=>{let e=await $T(),t=V$.default.createServer((r,o)=>{B$(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},$y=ls});var K$={};St(K$,{runAgentWitchBridgeCli:()=>qre});var qre,q$=l(()=>{"use strict";ae();Uy();qre=async()=>{Pt("agent-witch-bridge");let e=await ls(),t=Ur(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var J$=l(()=>{"use strict";Lt()});var oa,tE,Y$=l(()=>{"use strict";oa=(e,t,r)=>e===1?t:r,tE=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${oa(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${oa(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${oa(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${oa(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${oa(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${oa(p,"year","years")} ago`}});var cs,rE,Jre,Yre,oE,Xo,hd,nE,X$=l(()=>{"use strict";cs=m(require("node:fs")),rE=m(require("node:path")),Jre="local-ws-traffic.ndjson",Yre=500,oE=e=>rE.default.join(e.logsDir,Jre),Xo=(e,t)=>{let r=oE(e);cs.default.mkdirSync(rE.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});cs.default.appendFileSync(r,`${o}
`,"utf8")},hd=(e,t=Yre)=>{let r=oE(e);if(!cs.default.existsSync(r))return[];let n=cs.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},nE=e=>{let t=oE(e);cs.default.existsSync(t)&&cs.default.writeFileSync(t,"","utf8")}});var Xre,Z$,Q$,eU=l(()=>{"use strict";jT();Xre=new Set(Object.values(Vf)),Z$=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Q$=e=>{if(!Z$(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!Xre.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!Z$(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var tU,rU=l(()=>{"use strict";tU=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var Zre,Qre,eoe,Sd,oU=l(()=>{"use strict";rU();Zre=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,Qre=e=>Zre.test(e),eoe=e=>tU(e),Sd=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>Sd(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&Qre(o)){r[o]=eoe(n);continue}r[o]=Sd(n)}return r}});var Er,sE,toe,roe,ooe,iE,nU,sU,iU,noe,By,ds,Gy,aE,aU=l(()=>{"use strict";Er=m(require("node:fs")),sE=m(require("node:path"));eU();oU();toe="local-ws-trace.ndjson",roe=1e4,ooe=1440*60*1e3,iE=e=>sE.default.join(e.logsDir,toe),nU=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},sU=e=>{if(!Er.default.existsSync(e))return;let t=Er.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-ooe,n=t.filter(s=>{let i=nU(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-roe);Er.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},iU=(e,t)=>{let r=iE(e);Er.default.mkdirSync(sE.default.dirname(r),{recursive:!0}),Er.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),sU(r)},noe=e=>e.parsed===null?{_empty:!0}:Sd(e.parsed),By=(e,t,r)=>{let o=Q$(r);iU(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:noe(o)})},ds=(e,t)=>{iU(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Sd({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Gy=(e,t=80)=>{let r=iE(e);if(sU(r),!Er.default.existsSync(r))return[];let o=Er.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=nU(s);i!==null&&n.push(i)}return n.reverse()},aE=e=>{let t=iE(e);Er.default.existsSync(t)&&Er.default.writeFileSync(t,"","utf8")}});var Zo,lU,soe,lE,Vy,cU=l(()=>{"use strict";Zo=m(require("node:fs")),lU=m(require("node:path")),soe=256e3,lE=e=>{Zo.default.mkdirSync(lU.default.dirname(e),{recursive:!0}),Zo.default.writeFileSync(e,"","utf8")},Vy=(e,t=soe)=>{if(!Zo.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Zo.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=Zo.default.openSync(e,"r");try{Zo.default.readSync(a,i,0,s,n)}finally{Zo.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var Pd=l(()=>{"use strict";X$();aU();cU()});var cE,dE,dU=l(()=>{"use strict";cE=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dE=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${cE(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${cE(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${cE(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var pU=l(()=>{"use strict";dU()});var pE,uE=l(()=>{"use strict";pE=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var mE=l(()=>{"use strict";lc()});var gE,fE,uU=l(()=>{"use strict";mE();gE=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},fE=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var mU=l(()=>{"use strict";uE();uU()});var gU,Ad,yE,bd=l(()=>{"use strict";uE();gU=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ad=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=gU(e),r=gU(pE(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},yE=`(function () {
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
})();`});var ps,ioe,hE,fU=l(()=>{"use strict";ps=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ioe=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},hE=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${ps(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?ps(r.direction):ps(r.kind),i=`trace-body-${o}`,a=ps(ioe(r.body));return`<tr>
        <td title="${ps(r.at)}">${ps(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${ps(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var hU,aoe,yU,SE,SU=l(()=>{"use strict";He();Lt();hU=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},aoe=e=>hU(e)===Fr?ei:Qs,yU=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SE=e=>{let t=aoe(e.installDir),o=`AW_HOME="$HOME/${hU(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${yU(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${yU(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var PU=l(()=>{"use strict";bd();fU();SU();bd()});var loe,no,_d=l(()=>{"use strict";loe=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),no=loe});var AU,bU,_U,kU,wU,TU,EU,na=l(()=>{"use strict";AU="projects",bU="knowledge",_U="chunks.ndjson",kU="lessons.ndjson",wU="error-chunks.ndjson",TU="usage-stats.json",EU="knowledge-location.json"});var Ky,coe,qy,PE=l(()=>{"use strict";Ky=m(require("node:path"));na();coe=(e,t)=>{let r=t.trim(),o=Ky.default.join(e.installDir,AU,r,bU);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:Ky.default.join(o,_U),memoryRunsFilePath:Ky.default.join(o,kU)}},qy=coe});var AE,doe,RU,CU=l(()=>{"use strict";AE=m(require("node:fs"));na();Xn();doe=e=>{let t=It(e.projectFolderPath),r=`${t.metaDirPath}/${EU}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};AE.default.mkdirSync(t.metaDirPath,{recursive:!0}),AE.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},RU=doe});var sa,LU,vU,poe,IU,xU=l(()=>{"use strict";sa=m(require("node:fs")),LU=m(require("node:path"));xo();Xn();PE();CU();vU=(e,t)=>{sa.default.existsSync(e)&&(sa.default.existsSync(t)&&sa.default.statSync(t).size>0||(sa.default.mkdirSync(LU.default.dirname(t),{recursive:!0}),sa.default.copyFileSync(e,t)))},poe=e=>{let t=It(e.projectFolderPath),r=qy(e.layout,e.projectId),o=`${t.memoryDirPath}/${di}`;vU(t.ragChunksFilePath,r.ragChunksFilePath),vU(o,r.memoryRunsFilePath),RU({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},IU=poe});var WU,uoe,ia,Jy=l(()=>{"use strict";WU=m(require("node:path"));xo();Xn();xU();iw();PE();uoe=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=Df(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){IU({layout:e.layout,projectFolderPath:t,projectId:o});let s=qy(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=It(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:WU.default.join(n.memoryDirPath,di),projectId:null}},ia=uoe});var Yy,goe,Xy,bE=l(()=>{"use strict";Yy=m(require("node:fs"));na();goe=(e,t=500)=>{if(!Yy.default.existsSync(e))return;let r=Yy.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Yy.default.writeFileSync(e,`${o.join(`
`)}
`)},Xy=goe});var Zy,foe,us,_E=l(()=>{"use strict";Zy=m(require("node:path"));na();Jy();foe=e=>{let t=ia(e);if(t===null)return null;let r=Zy.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Zy.default.join(r,TU),errorChunksFilePath:Zy.default.join(r,wU)}},us=foe});var MU,kd,jU,OU,kE,NU,Soe,wE,DU,TE,EE,RE,CE=l(()=>{"use strict";MU=require("node:crypto"),kd=m(require("node:fs")),jU=m(require("node:path"));_d();na();_E();OU=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),kE=e=>{if(!kd.default.existsSync(e))return OU();try{let t=JSON.parse(kd.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return OU()},NU=(e,t)=>{kd.default.mkdirSync(jU.default.dirname(e),{recursive:!0}),kd.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Soe=e=>{let t=no(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,MU.createHash)("sha256").update(o).digest("hex").slice(0,16)},wE=e=>{let t=us(e);return t===null?null:kE(t.usageStatsFilePath)},DU=e=>{if(e.chunkIds.length===0)return;let t=us(e);if(t===null)return;let r=kE(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;NU(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},TE=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=us(e);if(r===null)return null;let o=Soe(t),n=kE(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return NU(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},EE=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,RE=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var wd,HU,Poe,Aoe,FU,boe,vE,Td,aa,LE,la,IE,xE=l(()=>{"use strict";wd=m(require("node:fs")),HU=m(require("node:path"));_d();Jy();bE();CE();Poe="http://127.0.0.1:11434",Aoe="nomic-embed-text",FU=(e,t,r)=>ia({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,boe=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},vE=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},Td=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Poe,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||Aoe;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},aa=(e,t,r)=>{let o=FU(e,t,r);if(o===null||!wd.default.existsSync(o))return[];let n=wd.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},LE=async e=>{let t=no(e.text),r=vE(t);if(r.length===0)return 0;let o=FU(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;wd.default.mkdirSync(HU.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await Td(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};wd.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return Xy(o),n},la=async e=>{let t=await Td(e.query);if(t===null)return[];let r=e.minScore??0,s=aa(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:boe(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return DU({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},IE=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Ed,zU,_oe,koe,WE,OE,ME,$U=l(()=>{"use strict";Ed=m(require("node:fs")),zU=m(require("node:path"));_d();_E();bE();xE();_oe=e=>{if(!Ed.default.existsSync(e))return[];let t=Ed.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},koe=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},WE=async e=>{let t=us(e);if(t===null)return 0;let r=no(e.text),o=vE(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;Ed.default.mkdirSync(zU.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await Td(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};Ed.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Xy(n,200),s},OE=async e=>{let t=us(e);if(t===null)return[];let r=await Td(e.query);if(r===null)return[];let o=e.minScore??.3;return _oe(t.errorChunksFilePath).map(s=>({chunk:s,score:koe(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},ME=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var jE=l(()=>{"use strict";xE();CE();$U()});var We,NE,DE=l(()=>{"use strict";bw();We=Aw,NE=`
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
`.trim()});var woe,Toe,HE,UU,FE,BU=l(()=>{"use strict";DE();bd();woe=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,Toe=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],HE=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UU=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${woe}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,FE=e=>{let t=Toe.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=HE(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=HE(e.installBundleVersionLabel?.trim()??"unknown"),s=UU("brand brand-in-sidebar",n),i=UU("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${HE(e.title)} \xB7 Agent Witch Local</title>
  <style>${NE}</style>
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
  <script>${yE}</script>
</body>
</html>`}});var Qy,Rd,eh=l(()=>{"use strict";Qy=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Rd=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Qy(e.syncMessage)}</p>`:"",o=Qy(e.manageHref),n=Qy(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Qy(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var zE,$E,UE,GU=l(()=>{"use strict";zE=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,$E=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,UE=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var VU=l(()=>{"use strict";BU();eh();GU()});var ca,BE,KU=l(()=>{"use strict";bd();ca=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),BE=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${ca(e.wakeError)}</div>`:"",a=Ad(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${ca(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${ca(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${ca(o)}</p>
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
        <p class="home-card-meta">${ca(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${ca(n)}</p>
      </a>
    </div>`}});var qU=l(()=>{"use strict";KU()});var L,da=l(()=>{"use strict";L=e=>e==="passed"||e==="stopped"||e==="failed"});var JU,GE,ms,VE,th=l(()=>{"use strict";JU="Stopped at the round limit. The best prompt is kept.",GE="Stopped because the score stopped rising. The best prompt is kept.",ms="Finished. The best prompt is the result.",VE="Wizard ended. Progress from finished steps is kept."});var Qo,KE=l(()=>{"use strict";Qo=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var Eoe,Roe,Cd,YU,rh=l(()=>{"use strict";Eoe=/\n+|;\s+/,Roe=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,Cd=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(Eoe).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,Roe(s)]},[]);return[...t,...o]},[]),YU=e=>{let t=Cd(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var he,pa=l(()=>{"use strict";he=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var vd,qE=l(()=>{"use strict";rh();pa();vd=e=>{let t=[...e.priorRounds,e.current],r=he(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:YU(o)}}});var JE,Coe,voe,oh,YE=l(()=>{"use strict";JE={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},Coe=e=>{try{let t=JSON.parse(e.fragment);return{...JE,objects:[...e.objects,t]}}catch{return{...JE,objects:e.objects}}},voe=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:Coe(r)},oh=e=>[...e].reduce(voe,JE).objects});var Loe,XE,Ioe,XU,ZE=l(()=>{"use strict";YE();Loe=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},XE=e=>{let t=oh(e).filter(Loe),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},Ioe=(e,t)=>({...e,passed:e.score>=t}),XU=(e,t)=>{let r=XE(e);return r===null?null:Ioe(r,t)}});var QE,eR,nh=l(()=>{"use strict";QE="The judge reply needs a score and a reason.",eR="The improver reply was empty."});var ZU,QU=l(()=>{"use strict";ZU=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var e1,t1=l(()=>{"use strict";e1=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var Woe,r1,o1=l(()=>{"use strict";QU();t1();th();rh();Woe=e=>{let t=Cd(e);return t.length===0?GE:`${GE} Avoid: ${t.join("; ")}.`},r1=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:JU};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(ZU(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:Woe(e1(r))}}return null}});var en,Ooe,gs,n1,sh=l(()=>{"use strict";en=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},Ooe=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,gs=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",Ooe(e.tokens),`Delay: ${en(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},n1=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var Moe,s1,i1=l(()=>{"use strict";ZE();Moe=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,s1=e=>{let r=(Moe.exec(e)?.[1]??e).trim();return r.length===0||XE(r)!==null?null:r}});var a1,ih,l1=l(()=>{"use strict";sh();i1();nh();a1=e=>({type:"call",role:"judge",choice:e.choice,prompt:n1({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),ih=e=>{let t=s1(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:eR}}:{nextPrompt:t,continuation:a1({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var tR,c1=l(()=>{"use strict";KE();qE();ZE();nh();th();o1();nh();l1();tR=e=>{let t=XU(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:QE}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=r1({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=vd({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:Qo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var Ld,rR=l(()=>{"use strict";Ld=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var d1=l(()=>{"use strict"});var p1=l(()=>{"use strict";d1()});var fs,u1=l(()=>{"use strict";fs=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var joe,oR,m1=l(()=>{"use strict";sh();joe=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,oR=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",joe(e.tokens),`Delay: ${en(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var Noe,Doe,Hoe,nR,g1=l(()=>{"use strict";Noe=/[A-Za-z0-9_./~-]{3,180}/g,Doe=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,Hoe=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||Doe.test(t)},nR=(e,t=12)=>{let r=[];for(let o of e.matchAll(Noe)){let n=o[0].replace(/\.+$/,"");if(!(!Hoe(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var Id,f1=l(()=>{"use strict";Id=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var ah,sR,y1,xd,iR=l(()=>{"use strict";ah=e=>Math.floor(e/2),sR=e=>Math.max(ah(e)+1,e-20),y1=(e,t)=>e>=t?"passes":e>=sR(t)?"close":e>=ah(t)?"weak":"bad",xd=e=>[{band:"bad",label:`0\u2013${ah(e)-1} bad`},{band:"weak",label:`${ah(e)}\u2013${sR(e)-1} weak`},{band:"close",label:`${sR(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var lh,aR=l(()=>{"use strict";iR();lh=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${y1(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var er,lR=l(()=>{"use strict";er=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var h1,S1=l(()=>{"use strict";h1=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var Foe,zoe,P1,A1=l(()=>{"use strict";da();aR();lR();S1();Foe=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],zoe=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",P1=e=>{let t=e.wizard;if(t===void 0)return[];let r=er(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=Foe.map((y,P)=>{let h=!s&&!n&&P===r?"active":"done";return{id:`wizard-${P+1}`,label:y,state:h,detail:null}}).filter((y,P)=>s?!0:P<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=lh(e),d=c.filter(y=>y.id==="round-0"),p=h1(t)&&(!n||a)?c.filter(y=>y.id!=="round-0"):[],g=L(e.status)&&!s,f=g?[{id:"end",label:zoe(e),state:"done",detail:e.errorMessage}]:[];if(g&&f.length>0){let y=Math.min(r,i.length),P=i.slice(0,y).map(h=>({...h,state:"done"}));return[...d,...P,...f,...p]}return[...d,...i,...p,...f]}});var $oe,cR,b1=l(()=>{"use strict";da();aR();A1();$oe=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",cR=e=>{if(e.wizard!==void 0)return P1(e);let t=lh(e),r=L(e.status)?[{id:"end",label:$oe(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var Wd,_1=l(()=>{"use strict";Wd=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var k1=l(()=>{"use strict";Lt()});var w1,Od,Md,ma,ch,dR,T1=l(()=>{"use strict";k1();w1="/prompt-optimizer/agent",Od=`${Gr}${w1}`,Md=`${Gr}/prompt-optimizer`,ma="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",ch=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${ma}`,dR="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var Rr=l(()=>{"use strict"});var ue,jd=l(()=>{"use strict";Rr();ue=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var pR,E1=l(()=>{"use strict";pR="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var R1,C1=l(()=>{"use strict";R1=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Nd,L1=l(()=>{"use strict";C1();Rr();Nd=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:R1(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var uR,I1=l(()=>{"use strict";Rr();uR=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var mR,x1=l(()=>{"use strict";Rr();mR=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var W1,Dd,O1=l(()=>{"use strict";W1=["generalize","evaluate","separate","optimize_modules"],Dd=(e,t)=>{let r=W1.indexOf(t);if(r===-1)return e;let o=W1.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var dh,gR=l(()=>{"use strict";rh();dh=e=>{let t=Cd(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var Hd,M1=l(()=>{"use strict";gR();Hd=e=>{let t=dh(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var Boe,Goe,Voe,j1,N1=l(()=>{"use strict";Boe=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),Goe=/^\{\{[a-zA-Z0-9_-]+\}\}$/,Voe=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(Boe(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},j1=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>Goe.test(n)?n:Voe(n,r)).join("")}});var fR,D1=l(()=>{"use strict";N1();fR=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:j1(o.prompt,t)}))}))});var Koe,Fd,H1=l(()=>{"use strict";Rr();gR();Koe=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Fd=e=>{let t=dh(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=Koe(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var zd,F1=l(()=>{"use strict";rR();zd=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return Ld({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var $d,hR=l(()=>{"use strict";pa();$d=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=he(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var SR,z1=l(()=>{"use strict";hR();SR=e=>{let t=$d({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var ys,$1=l(()=>{"use strict";ys=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var qoe,Joe,ce,ph=l(()=>{"use strict";jd();qoe=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},Joe=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,ce=e=>{let t=ue(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:qoe(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>Joe(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var U1,B1=l(()=>{"use strict";jd();ph();U1=e=>{let t=ce(e.wizard),r=ue(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var PR,G1=l(()=>{"use strict";B1();PR=e=>{let t=U1({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var Yoe,V1,K1=l(()=>{"use strict";Yoe=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},V1=e=>[...e].reduce(Yoe,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var Xoe,q1,J1=l(()=>{"use strict";Xoe=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},q1=e=>[...e].reduce(Xoe,{out:"",inString:!1,escaped:!1}).out});var Zoe,Qoe,Y1,X1=l(()=>{"use strict";K1();J1();Zoe=e=>e.charCodeAt(0)===65279?e.slice(1):e,Qoe=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},Y1=e=>q1(V1(Qoe(Zoe(e))))});var ene,tne,rne,Z1,one,ga,uh=l(()=>{"use strict";YE();X1();ene=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},tne=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},rne=e=>[...e].reduce(tne,{out:"",inString:!1,escaped:!1}).out,Z1=e=>{let t=oh(e);return t.length===0?null:t[t.length-1]},one=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},ga=e=>{let t=Y1(ene(e)),r=Z1(t);if(r!==null)return r;let o=rne(t),n=Z1(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw one(i)}}});var nne,sne,AR,Q1,eB=l(()=>{"use strict";nne=/^[a-z0-9][a-z0-9-]{0,62}$/,sne=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return nne.test(t)?t:""},AR=e=>e.replace(/\s+/gu," ").trim(),Q1=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=sne(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=AR(n.name),a=AR(n.description),c=AR(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var tB,rB,oB=l(()=>{"use strict";tB=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},rB=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var bR,nB=l(()=>{"use strict";uh();eB();oB();bR=(e,t)=>{let r=(()=>{try{return ga(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(tB(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(rB).filter(a=>a!==null),i=Q1({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var _R,sB=l(()=>{"use strict";_R=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var kR,iB=l(()=>{"use strict";kR=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var wR,aB=l(()=>{"use strict";jd();ph();wR=e=>{let t=ce(e.wizard),r=ue(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var Ud,lB=l(()=>{"use strict";Ud=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var tr,ine,TR,cB=l(()=>{"use strict";tr=m(ni());uh();ine=(0,tr.isType)({name:tr.isNonEmptyString,description:tr.isString,sampleValue:tr.isString}),TR=e=>{let t=ga(e);if(!(0,tr.isType)({templatedPrompt:tr.isNonEmptyString,variables:(0,tr.isArrayWithEachItem)(ine)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var Se,ane,lne,ER,dB=l(()=>{"use strict";Se=m(ni());Rr();uh();ane=(0,Se.isType)({id:Se.isNonEmptyString,title:Se.isNonEmptyString,prompt:Se.isNonEmptyString,order:Se.isNumber}),lne=(0,Se.isType)({id:Se.isNonEmptyString,title:Se.isNonEmptyString,summary:Se.isString,topology:(0,Se.isOneOf)("chain","parallel"),modules:(0,Se.isArrayWithEachItem)(ane),recommended:Se.isBoolean}),ER=e=>{let t=ga(e);if(!(0,Se.isType)({options:(0,Se.isArrayWithEachItem)(lne)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var fa,pB=l(()=>{"use strict";fa=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var cne,RR,CR=l(()=>{"use strict";cne=/\{\{([a-zA-Z0-9_-]+)\}\}/g,RR=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(cne,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var rr,or,uB=l(()=>{"use strict";pa();CR();rr=e=>RR(e.templatedPrompt,e.variables),or=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return he(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??rr(e.wizard)}});var dne,hs,mB=l(()=>{"use strict";dne=/\{\{([a-zA-Z0-9_-]+)\}\}/g,hs=(e,t)=>e.replace(dne,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var pne,Ss,mh=l(()=>{"use strict";pne=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ss=e=>{let t=new Set,r=[];for(let o of e.matchAll(pne)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Bd,gB=l(()=>{"use strict";mh();Bd=e=>e.variables.length>0||Ss(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var vR,LR=l(()=>{"use strict";Rr();vR=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Gd,fB=l(()=>{"use strict";pa();LR();Gd=e=>{let t=e.wizard.evaluateSelectedRound??he(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:vR(r.judgement,e.passScore)}});var Vd,yB=l(()=>{"use strict";Vd=e=>e.length===1&&e[0].modules.length===1});var IR,hB=l(()=>{"use strict";IR=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Oe,gh,Kd=l(()=>{"use strict";Oe=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),gh=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var SB,PB=l(()=>{"use strict";Kd();SB=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Oe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Oe("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Oe("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var AB,bB=l(()=>{"use strict";da();Kd();AB=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!L(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Oe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),Oe("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Oe("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",gh(e.writerLabel,e.folder)),Oe("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Oe("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var _B,kB=l(()=>{"use strict";Kd();_B=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Oe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Oe("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Oe("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var wB,TB=l(()=>{"use strict";Kd();wB=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Oe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Oe("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",gh(e.writerLabel,e.folder)),...r?[Oe("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var fh,EB=l(()=>{"use strict";da();PB();bB();kB();TB();fh=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(L(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return AB(r);case"evaluate":return SB({...r,currentRound:e.currentRound});case"separate":return wB(r);case"optimize_modules":return _B({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var qd,so,RB=l(()=>{"use strict";qd=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),so=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var une,yh,xR,CB=l(()=>{"use strict";mh();une="wizardParam_",yh=e=>`${une}${e}`,xR=e=>{let t=Ss(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=yh(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var wt,vB=l(()=>{"use strict";wt=["generalize","evaluate","separate","optimize_modules"]});var Jd,Ps,ya,io=l(()=>{"use strict";Jd="Stopped because the confirmed token or spend budget was exceeded.",Ps="Approaching the confirmed budget. Further trials may hard-stop.",ya="Confirm the Step 4 token and spend budget before optimizing modules."});var Tt,ha=l(()=>{"use strict";Tt=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var sr,Yd=l(()=>{"use strict";io();sr=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var mne,ao,Xd=l(()=>{"use strict";io();mne={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},ao=e=>{let t=e?.trim()??"";return t.length===0?.01:mne[t]??.01}});var hh,WR=l(()=>{"use strict";io();Xd();hh=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=ao(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var LB,Ph,OR,MR=l(()=>{"use strict";io();ha();Yd();WR();Xd();LB=e=>{let t=hh({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??ao(e.writerId)??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:Tt({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},Ph=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),OR=e=>{let t=e.existing??sr(),r=LB({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return Ph(t,r)}});var Sa,Zd,WB=l(()=>{"use strict";io();Rr();ha();Yd();MR();WR();Xd();Sa=e=>{let t=hh({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??ao(e.writerId),i=r*4e3,a=n*o*8e3,c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:Tt({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},Zd=e=>{let t=e.existing??sr();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=Sa({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return Ph(t,r)}});var lo,OB=l(()=>{"use strict";ha();io();Yd();lo=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??sr(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=Tt({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var NR,Pa,MB=l(()=>{"use strict";io();ha();NR=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=Tt({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:Jd,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:Jd,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,p=s!==null&&s>0&&o>=s*c;return(d||p)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:Ps,costControls:{...t,softWarnFired:!0,softWarnMessage:Ps}}:null},Pa=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var DR,jB=l(()=>{"use strict";DR=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var x=l(()=>{"use strict";da();th();c1();KE();sh();rR();p1();u1();m1();g1();qE();f1();pa();b1();lR();iR();_1();T1();Rr();jd();E1();L1();I1();x1();O1();M1();D1();H1();F1();hR();z1();$1();ph();G1();nB();sB();iB();aB();lB();cB();dB();pB();uB();CR();mB();mh();gB();fB();yB();LR();hB();EB();RB();CB();vB();io();ha();Yd();MR();WB();Xd();OB();MB();jB()});var HR=l(()=>{"use strict";mc()});var gne,HB,FB=l(()=>{"use strict";HR();gne=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,HB=e=>{let t=Vn(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(gne)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var $B,fne,yne,Cr,hne,Sne,zB,bh,UB,Pne,Ot,BB,GB,VB,ir=l(()=>{"use strict";HR();FB();$B=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),fne=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,yne=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,Cr=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(fne.test(e.errorMessage))return"usage_limit";if(yne.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},hne="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",Sne="The writer waited on terminal input and did not return a prompt.",zB=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,bh=e=>{let t=e.trim();if(t.length===0||t.length>=500||!zB.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>zB.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},UB=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},Pne=e=>bh(e.stdout)??bh(e.stderr)??(UB(e.replyFile)?bh(e.replyFile):null),Ot=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return hne;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?Sne:null},BB=e=>{let t=e.trim();return t.length===0?null:Ot(t)!==null?t:bh(t)??(UB(t)?t:null)},GB=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],VB=e=>{let t=e.replyFileText?.trim()??"",r=Ot([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=Pne({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=Cr({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=HB([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Vn(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var Ane,qB,KB,bs,_h=l(()=>{"use strict";ir();Ane=400,qB=(e,t=Ane)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},KB=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:BB(e.promptText)},bs=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:KB(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=KB(e.revisions[n]);if(s!==null)return s.trim()}return null}});var O,bne,kh,me,_s,YB,JB,XB,ZB,Me=l(()=>{"use strict";O="manual",bne=["claude-cli","codex","cursor","antigravity"],kh={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},me=e=>e===O?"You":e in kh?kh[e]:e,_s=e=>bne.filter(t=>e.includes(t)),YB=e=>{let t=_s(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},JB=(e,t)=>t===O?O:e.find(r=>r===t)??null,XB=(e,t,r)=>{let o=_s(e),n=JB(o,t),s=JB(o,r);return n===null||s===null?null:{judge:n,improver:s}},ZB=(e,t,r)=>{let o=_s(e);return t===null||t.trim()===""?r!==O?r:o[0]??null:t===O?null:o.find(n=>n===t)??null}});var QB,wh,FR,ks,zR,Et,co,Pe,lt=l(()=>{"use strict";QB=m(require("node:fs")),wh=m(require("node:os")),FR=m(require("node:path"));$o();ks="~",zR=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Et=e=>{let t=wh.default.homedir(),r=zR(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},co=e=>{let t=e.trim().length===0?"~":e.trim(),r=Qe(t),o=FR.default.isAbsolute(r)?zR(r):zR(FR.default.resolve(wh.default.homedir(),r));try{if(!QB.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:Et(o)}},Pe=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:wh.default.homedir()});var dt,tn=l(()=>{"use strict";dt='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var $R,eG,_ne,tG,rG,UR=l(()=>{"use strict";x();Me();lt();tn();$R=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eG=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',_ne=e=>{let t=eG(e.state),r=`<h2>${$R(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${$R(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${dt}</button></div><template>${r}</template></li>`},tG=e=>{let t=e.wizard;if(t===void 0)return"";let r=fh({status:e.status,wizard:t,writerLabel:me(e.judgeModel),runnerLabel:me(e.runnerModel??e.judgeModel),folderDisplay:Et(Pe(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(_ne).join("")}</ol>`},rG=e=>{let t=e.wizard;if(t===void 0)return"";let r=fh({status:e.status,wizard:t,writerLabel:me(e.judgeModel),runnerLabel:me(e.runnerModel??e.judgeModel),folderDisplay:Et(Pe(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${eG(n.state)}<span class="sdlc-pipeline-label">${$R(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var ar,oG,nG,sG,BR=l(()=>{"use strict";x();ar=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oG="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",nG=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${ar(oG)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${ar(i.name)}}}</strong> \u2014 ${ar(i.description)} (sample: ${ar(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${ar(r)}</pre>`,n=rr(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${ar(n)}</pre>`;return`${t}${o}${s}`},sG=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${ar(oG)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${ar(n.name)}}}</strong> \u2014 ${ar(n.description)} (sample: ${ar(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${ar(r)}</pre>`;return`${t}${o}`}});var Qd,GR=l(()=>{"use strict";Qd=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var iG,aG=l(()=>{"use strict";x();iG=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=fs({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=gs({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var VR,ep,KR=l(()=>{"use strict";tn();aG();VR=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ep=e=>{let t=iG(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${VR(r)}">${dt}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${VR(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${VR(t)}</pre></template>`}});var qR,tp,JR=l(()=>{"use strict";tn();qR=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tp=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${qR(r)}">${dt}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${qR(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${qR(t)}</pre></template>`}});var Th,Aa,YR=l(()=>{"use strict";GR();KR();JR();Th=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Aa=e=>{let t=Qd(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${Th(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,p=e.cycle.revisions.map(g=>{let f=g.judgement?.score,y=f==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${f}`,P=g.judgement?.reasons?.trim()??"",h=P.length===0?"":`<br><span class="muted">${Th(P)}</span>`,u=tp({roundLabel:d(g.roundNumber),promptText:g.promptText}),S=ep({cycle:e.cycle,roundNumber:g.roundNumber,promptText:g.promptText,run:g.run}),b=`${u}${S}`;if(e.interactive){let k=e.selectedRound===g.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${k}> <span class="sdlc-wizard-revision-title">${Th(y)}</span></label>${b}${h}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Th(y)}</span>${b}${h}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var XR,lG,cG,dG,ZR=l(()=>{"use strict";XR=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lG=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${XR(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${XR(t.prompt)}</pre></li>`).join("")}</ol>`,cG=e=>lG([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),dG=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${XR(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${lG(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var rp,kne,Eh,QR=l(()=>{"use strict";x();ZR();rp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kne=e=>{let t=e.wizard;return t===void 0?"":or({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},Eh=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=kne(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${rp(n.orchestratorSkill.fileName)}</code> \u2014 ${rp(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${rp(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=cG(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${rp(r)} <span class="muted">${rp(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Ke,wne,Tne,Ene,Rne,Rh,Cne,vne,Lne,Ine,xne,Wne,ba,Ch=l(()=>{"use strict";x();UR();BR();YR();KR();JR();QR();Ke=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wne={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},Tne=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Ke(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Ke(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Ke(o)}</pre></details>`;return`<h2>${Ke(e)}</h2>${n}`},Ene=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=rr(t).trim(),n=or({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!L(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${Tne("What is being evaluated",i)}`},Rne=(e,t)=>{let r=e.wizard;if(r===void 0||L(e.status))return"";let o=wne[t];return o===void 0||r.phase!==o?"":rG(e)},Rh=(e,t,r)=>{let o=Rne(e,t),n=t==="wizard-2"?Ene(e):"";return`${o}${n}${r}`},Cne=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},vne=e=>{let t=e.wizard;return t===void 0?"":nG(t)},Lne=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Ke(a)}</span>`,d=`Round ${n.roundNumber}`,p=tp({roundLabel:d,promptText:n.promptText}),g=ep({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ke(s)}${i}</span>${p}${g}${c}</li>`}).join("")}</ul>`,Ine=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Aa({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=Cne(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${Lne(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=or({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Ke(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",p=`Round ${c.roundNumber} \u2014 score ${d}`,g=tp({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),f=ep({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ke(p)}</span>${g}${f}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Ke(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},xne=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Ke(n.title)}</strong> <span class="muted">(${Ke(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Ke(o.title)}</strong>${n}${Ke(s)}${Eh(e,o)}</li>`}).join("")}</ul>`},Wne=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Ke(i)}</span> <strong>${Ke(n.title)}</strong>${Ke(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Ke(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Aa({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},ba=(e,t)=>{switch(t){case"wizard-1":return Rh(e,t,vne(e));case"wizard-2":return Rh(e,t,Ine(e));case"wizard-3":return Rh(e,t,xne(e));case"wizard-4":return Rh(e,t,Wne(e));default:return""}}});var One,Mne,pG,uG,mG=l(()=>{"use strict";x();_h();ir();Ch();One=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},Mne=e=>{let t=e.goal.trim();return t.length===0?null:t},pG=(e,t,r,o,n)=>{let s=Ot(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},uG=(e,t)=>{let r=Mne(e);if(t.id.startsWith("wizard-")){let s=ba(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=Wd(e,t);if(s!==null){let a=bs(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=he(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:pG(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:One(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:pG(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var ws,gG,fG=l(()=>{"use strict";ws=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gG=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${ws(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${ws(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${ws(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${ws(n)}</h2><pre class="mono">${ws(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${ws(e.goal)}</dd></div></dl>`;return`<h2>${ws(e.title)}</h2>${i}${t}${r}${o}${s}`}});var jne,yG,op,eC,vh=l(()=>{"use strict";x();jne=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),yG=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||L(e.status))return null;let r=er(t);return r<0||r>3?null:`wizard-${r+1}`},op=(e,t)=>jne.has(t)?yG(e)===t:!1,eC="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var Nne,Lh,tC=l(()=>{"use strict";Nne='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Lh=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${Nne}</button>`});var Ts,Ih=l(()=>{"use strict";x();Ts=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:vd({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:Id(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var Dne,hG,Hne,rC,SG,Fne,zne,$ne,Une,PG,AG=l(()=>{"use strict";x();Ih();Dne={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},hG=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},Hne=e=>Dne[e]??null,rC=(e,t)=>{let r=e.wizard,o=Hne(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=er(r);return o<n||o===n},SG=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},Fne=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:rr(t).trim();return o.length===0?null:Hd({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:hG(e,"generalize")})},zne=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=Ts(e);return n===null?null:Qo({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=SG(e)?.promptText.trim()??or({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:fs({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},$ne=e=>{let t=e.wizard;if(t===void 0)return null;let r=or({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:Fd({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:hG(e,"separate")})},Une=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=so(t),s=hs(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=Ts(e);return c===null?null:Qo({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=SG(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||L(e.status)&&i?.judgement!==null)?gs({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):zd({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:ys(t,r).output,moduleTitle:o.title})},PG=(e,t)=>{if(!rC(e,t))return null;switch(t){case"wizard-1":return Fne(e);case"wizard-2":return zne(e);case"wizard-3":return $ne(e);case"wizard-4":return Une(e);default:return null}}});var Bne,xh,oC=l(()=>{"use strict";x();Bne=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},xh=(e,t)=>{let r=e.wizard,o=Bne(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=er(r);return o<n?"done":o===n&&L(e.status)&&e.status==="failed"?"failed":o<=n&&L(e.status)?"done":"pending"}});var Gne,_a,Wh=l(()=>{"use strict";tn();AG();oC();Gne=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_a=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(xh(e,t)==="pending")return""}else if(!rC(e,t))return"";let o=PG(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${dt}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${Gne(o)}</pre></template>`}});var Es,po,ka=l(()=>{"use strict";Es=e=>e.toLocaleString("en-US"),po=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var vr,Vne,bG,Oh,_G,kG,Mh=l(()=>{"use strict";x();mG();fG();vh();tC();tn();_h();UR();Wh();ka();vr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Vne=(e,t)=>{let r=Wd(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?po(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${Es(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${vr(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${vr(r)}</span>`:"",d=gG(uG(t,e)),p=t.wizard!==void 0&&t.wizard.phase==="complete"&&L(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${vr(e.id)}"`:"",g=op(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${vr(eC)}"><input type="hidden" name="cycleId" value="${vr(t.id)}"><input type="hidden" name="wizardStepId" value="${vr(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",f=e.state==="active"&&e.id.startsWith("wizard-")?tG(t):"",y=o?"failed":e.state,P=o?bs(t):null,h=P!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${dt}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${vr(P)}</pre></template>`:"",u=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?_a(t,e.id):"";return`<li class="sdlc-node sdlc-node-${y}" data-sdlc-step-id="${vr(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${p} data-sdlc-node>${n}<span class="sdlc-node-label">${vr(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${g}${u}${h}</div></div>${f}<template>${d}</template></li>`},bG=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>Vne(r,t)).join("")}</ol>`,Oh=e=>`<div class="sdlc-score" aria-label="What the score means">${xd(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${vr(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,_G=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${Lh({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,kG=`<script>
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
</script>`});var jh,Nh,Dh,wG,nC=l(()=>{"use strict";jh="support-reply",Nh="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",Dh=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),wG=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Hh,TG,EG=l(()=>{"use strict";x();Mh();nC();Hh=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),TG=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${Oh(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${Hh(Nh)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Hh(Dh)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Hh(wG)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Hh(jh)}">Run this sample</a>
      </div>
    </section>`});var sC,Fh,Kne,RG,CG=l(()=>{"use strict";sC=m(require("node:fs")),Fh=m(require("node:path")),Kne=e=>Fh.default.join(Fh.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),RG=(e,t)=>{let r=Kne(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;sC.default.mkdirSync(Fh.default.dirname(r),{recursive:!0}),sC.default.appendFileSync(r,o,"utf8")}});var wa,vG,qne,LG,Jne,IG,Lr,Q,xG,$,Rt=l(()=>{"use strict";wa=m(require("node:fs")),vG=m(require("node:path"));x();CG();qne=e=>e.wizard===void 0?e:{...e,wizard:uR(e.wizard)},LG=new Set,Jne=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),IG=(e,t)=>{wa.default.mkdirSync(vG.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;wa.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),wa.default.renameSync(r,e)},Lr=e=>{if(!wa.default.existsSync(e))return[];try{let t=JSON.parse(wa.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(Jne).map(qne):[]}catch{return[]}},Q=(e,t)=>Lr(e).find(r=>r.id===t)??null,xG=(e,t)=>{LG.add(t);let r=Lr(e).filter(o=>o.id!==t);IG(e,r)},$=(e,t)=>{if(LG.has(t.id))return;let r=Lr(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];IG(e,o),RG(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var Ta,Ir,np,WG,zh,Yne,OG,MG,jG,iC=l(()=>{"use strict";Ta=m(require("node:fs")),Ir=m(require("node:path")),np=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},WG=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),zh=(e,t)=>{let r=np(e);return r.length>0?r:np(t)},Yne=e=>{let t=zh(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${WG(o)}`,...n.length>0?[`description: ${WG(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},OG=e=>`.cursor/skills/${e}/SKILL.md`,MG=(e,t)=>{let r=np(t);if(r.length===0)return!1;let o=Ir.default.resolve(e),n=Ir.default.resolve(o,".cursor","skills"),s=Ir.default.resolve(o,OG(r));return s.startsWith(`${n}${Ir.default.sep}`)?Ta.default.existsSync(s):!1},jG=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(zh(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Ir.default.resolve(e.workingDirectory);try{if(!Ta.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=Yne({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=OG(r.slug),n=Ir.default.resolve(t,".cursor","skills"),s=Ir.default.resolve(t,o);if(!s.startsWith(`${n}${Ir.default.sep}`))return{ok:!1,errorCode:"path"};if(Ta.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Ta.default.mkdirSync(Ir.default.dirname(s),{recursive:!0}),Ta.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var Xne,NG,DG,HG=l(()=>{"use strict";x();Rt();lt();ir();iC();Xne=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,NG=e=>{let t=e.get("savedSkill");return t!==null&&Xne.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},DG=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=Q(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!L(r.status))return{kind:"redirect",location:o("skillError=working")};let n=he(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||Ot(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=jG({workingDirectory:Pe(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var $h,Uh,sp=l(()=>{"use strict";x();$h=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=lo({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},Uh=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var rn,ip=l(()=>{"use strict";x();sp();rn=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=IR(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=OR({moduleCount:o.length,existing:e.costControls,writerId:n}),i=$h(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:qd(r.variables)},updatedAt:new Date().toISOString()}}});var on,ap=l(()=>{"use strict";on=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var aC=l(()=>{"use strict";qt();yd();mc()});var lC,FG,cC,zG,$G=l(()=>{"use strict";lC={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},FG=e=>e.exitCode===null&&e.signalCode===null,cC=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!FG(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!FG(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),zG=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),cC(e).then(s=>{r({...lC,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var UG,lp,BG,dC,Zne,uC,mC,Qne,ese,tse,GG,rse,pC,VG,cp,KG,ose,nse,pt,Rs=l(()=>{"use strict";UG=require("node:child_process"),lp=m(require("node:fs")),BG=m(require("node:os")),dC=m(require("node:path"));aC();$G();ir();Zne=["claude-cli","codex","cursor","antigravity"],uC=18e4,mC=6e5,Qne=12e4,ese=9e5,tse="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",GG="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",rse="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",pC=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},VG=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=pC(process.env[GG])??Math.max(r,mC));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:pC(process.env[rse])??ese;return Math.min(o,Math.max(Qne,r))},cp=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?pC(process.env[GG])??mC:uC,KG=e=>`The writer timed out after ${e}ms.`,ose=e=>Zne.includes(e),nse=e=>e===!0||process.env[tse]==="1",pt=e=>new Promise(t=>{if(e.signal?.aborted){t(lC);return}if(nse(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!ose(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=Pr(r,e.prompt,Te({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!lp.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:uC,s=dC.default.join(lp.default.mkdtempSync(dC.default.join(BG.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=GB({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},p=(0,UG.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),g=f=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(f))};zG(p,e.signal,g,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",cC(p).then(f=>{g({ok:!1,errorMessage:KG(n),errorKind:"writer_timeout",killSignal:f})})},n),p.stdout.on("data",f=>{a.push(Buffer.from(f))}),p.stderr.on("data",f=>{c.push(Buffer.from(f))}),p.on("error",()=>g({ok:!1,errorMessage:"The writer failed to start."})),p.on("close",()=>{if(d.settled)return;let f=lp.default.existsSync(s)?lp.default.readFileSync(s,"utf8"):null,y=VB({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:f});if(y.ok&&d.stopReason!=="abort"){g(y);return}d.stopReason===null&&g(y)})})});var sse,dp,gC=l(()=>{"use strict";x();ka();sse=e=>{if(e.wizard!==void 0){let t=Ud(e.wizard),r=po(e);return(t??0)+r}return po(e)},dp=e=>{let t=NR({costControls:e.costControls,spentTokens:sse(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var qG,ise,pp,Bh,Gh=l(()=>{"use strict";x();Me();gC();qG=e=>e===O?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},ise=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),pp=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=tR({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:qG(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?DR({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:Id(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=ise(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?dp({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):dp({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},Bh=(e,t,r=null)=>{let o=ih({raw:t,judge:qG(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Vh,fC=l(()=>{"use strict";Vh=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var XG,Kh,qh,JG,YG,yC,ase,ZG,hC,lse,QG,cse,dse,e2,t2=l(()=>{"use strict";XG=require("node:child_process"),Kh=m(require("node:fs")),qh=m(require("node:path"));Kf();x();JG=4e3,YG=12e3,yC=(e,t)=>{let r=(0,XG.spawnSync)("git",[...t],{cwd:e,env:Vo(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},ase=e=>yC(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",ZG=e=>{let t=yC(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},hC=(e,t)=>{let r=qh.default.resolve(e,t),o=qh.default.relative(e,r);if(o.startsWith("..")||qh.default.isAbsolute(o)||!Kh.default.existsSync(r)||!Kh.default.statSync(r).isFile())return null;let n=Kh.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>JG?`${n.slice(0,JG)}
\u2026truncated`:n},lse=e=>e.length>YG?`${e.slice(0,YG)}
\u2026truncated`:e,QG=e=>{let t=nR(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,hC(e.workingDirectory,n)])),o=ase(e.workingDirectory);return{git:o,status:o?ZG(e.workingDirectory):{},files:r,paths:t}},cse=(e,t)=>{let r=yC(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=hC(e,t);return o===null?`${t} is missing.`:o},dse=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",e2=e=>{let t=e.before.git?ZG(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=hC(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>cse(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:dse(e.before.git,e.before.paths.length>0),evidence:lse(i.join(`

`))}}});var AC,q,bC,qe,r2,pse,use,o2,Ea,n2,Ra,mse,gse,up,SC,PC,fse,s2,yse,hse,Sse,i2,Pse,a2,l2,Ase,bse,c2,d2=l(()=>{"use strict";AC=require("node:child_process"),q=m(require("node:fs")),bC=m(require("node:os")),qe=m(require("node:path"));Kf();r2=8e6,pse=16e6,use=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],o2=(e,t)=>{let r=(0,AC.spawnSync)("git",[...t],{cwd:e,env:Vo(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Ea=(e,t)=>(0,AC.spawnSync)("git",[...t],{cwd:e,env:Vo(),timeout:8e3}).status===0,n2=e=>{let t=o2(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},Ra=(e,t)=>{let r=qe.default.resolve(e,t),o=qe.default.relative(e,r);return o.startsWith("..")||qe.default.isAbsolute(o)?null:r},mse=(e,t)=>{let r=Ra(e,t);if(r===null||!q.default.existsSync(r))return null;let o=q.default.statSync(r);return!o.isFile()||o.size>r2?null:q.default.readFileSync(r)},gse=(e,t,r)=>{let o=Ra(e,t);o!==null&&(q.default.mkdirSync(qe.default.dirname(o),{recursive:!0}),q.default.writeFileSync(o,r))},up=(e,t)=>{let r=Ra(e,t);r===null||!q.default.existsSync(r)||q.default.rmSync(r,{recursive:!0,force:!0})},SC=(e,t)=>Ea(e,["cat-file","-e",`HEAD:${t}`]),PC=e=>{let t=o2(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},fse=e=>qe.default.resolve(e)!==qe.default.resolve(bC.default.homedir()),s2=e=>{if(!q.default.existsSync(e))return 0;let t=q.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?q.default.readdirSync(e).reduce((r,o)=>r+s2(qe.default.join(e,o)),0):0},yse=(e,t,r)=>{let o=Ra(e,r);if(o===null||!q.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(s2(o)>pse)return{relativePath:r,existed:!0,copyDir:null};let n=qe.default.join(t,"cache",r);return q.default.mkdirSync(qe.default.dirname(n),{recursive:!0}),q.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},hse=400,Sse=32e6,i2=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!q.default.existsSync(s)))for(let i of q.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=qe.default.join(s,i),c=q.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>r2)){if(t.length>=hse||r+c.size>Sse){o=!1;return}r+=c.size,t.push(qe.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},Pse=(e,t,r)=>{let o=Ra(e,r);if(o===null||!q.default.existsSync(o))return null;let n=mse(e,r);if(n===null)return"skip";let s=qe.default.join(t,"files",r);return q.default.mkdirSync(qe.default.dirname(s),{recursive:!0}),q.default.writeFileSync(s,n),s},a2=e=>{let t=q.default.mkdtempSync(qe.default.join(bC.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?n2(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:i2(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,Pse(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?PC(e.workingDirectory):null,isolateCaches:fse(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:use.map(i=>yse(e.workingDirectory,t,i))}},l2=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){up(e.workingDirectory,t);return}gse(e.workingDirectory,t,q.default.readFileSync(r))}},Ase=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?l2(e,t):SC(e.workingDirectory,t)?Ea(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):up(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&SC(e.workingDirectory,t)&&Ea(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!SC(e.workingDirectory,t)&&Ea(e.workingDirectory,["reset","-q","HEAD","--",t])},bse=(e,t)=>{let r=Ra(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){up(e.workingDirectory,t.relativePath),q.default.mkdirSync(qe.default.dirname(r),{recursive:!0}),q.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){up(e.workingDirectory,t.relativePath);return}if(q.default.existsSync(r))for(let o of q.default.readdirSync(r)){let n=qe.default.join(r,o);q.default.statSync(n).mtimeMs>=e.startedMs-1e3&&q.default.rmSync(n,{recursive:!0,force:!0})}}}},c2=e=>{try{if(e.git){if(PC(e.workingDirectory)!==e.head&&(!(e.head===null?Ea(e.workingDirectory,["update-ref","-d","HEAD"]):Ea(e.workingDirectory,["reset","--hard",e.head]))||PC(e.workingDirectory)!==e.head))throw new Error("head");let r=n2(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))Ase(e,o)}else{if(e.complete)for(let t of i2(e.workingDirectory).paths)e.files[t]===void 0&&up(e.workingDirectory,t);for(let t of Object.keys(e.files))l2(e,t)}for(let t of e.caches)bse(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{q.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Jh,Yh,_se,kse,wse,Tse,Ese,p2,Rse,u2,m2=l(()=>{"use strict";x();Gh();fC();t2();d2();Me();lt();ir();Rs();Jh=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),Yh=e=>({...e,status:"stopped",errorMessage:ms,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),_se=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),kse=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==O?t:e.improverModel!==O?e.improverModel:null}return e.judgeModel!==O?e.judgeModel:e.improverModel!==O?e.improverModel:null},wse=async e=>{let t=Pe(e.cycle),r=QG({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=a2({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?zd({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:ys(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):Ld({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=VG({promptText:e.revision.promptText,isModuleRun:i}),c=cp({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},p=await pt({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),g=p.ok?e2({workingDirectory:t,before:r,writerReply:p.text}):null,f=c2(o),y={...e.cycle,revisions:e.cycle.revisions.map(P=>P.roundNumber===e.cycle.currentRound?d:P)};return p.ok?!f.ok||g===null?{ok:!1,cycle:Jh(y,f.ok?"Could not put the folder back after the run.":f.errorMessage)}:{ok:!0,cycle:y,run:{output:p.text.trim(),tokens:p.tokens,delayMs:Date.now()-n,lookedAt:g.lookedAt,evidence:g.evidence}}:p.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:Yh(y)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Jh(y,p.errorMessage,Cr(p))})},Tse=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:wse({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),Ese=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),p2=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await pt({writerAgent:e.reviewer,workingDirectory:Pe(e.cycle),prompt:oR({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:Yh(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},Rse=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===O)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await pt({writerAgent:t.judgeModel,workingDirectory:Pe(t),prompt:fs({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...pp(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?Yh(o):(e.onWriterFailure?.(t.judgeModel),Jh(o,n.errorMessage,Cr(n)))},u2=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return Rse(e);let o=kse(t),n=await Tse({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?_se(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===O){let p=await p2({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...Ese(s,p.text),judgePhase:void 0}}let i=await pt({writerAgent:t.judgeModel,workingDirectory:Pe(t),prompt:gs({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?Yh(s):(e.onWriterFailure?.(t.judgeModel),Jh(s,i.errorMessage,Cr(i)));let a=await p2({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=pp(s,i.text,c);return Vh(d,a.text)}});var Xh,Cse,vse,_C,g2=l(()=>{"use strict";x();Gh();m2();Ih();ir();Me();gC();lt();Rs();Xh=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),Cse=e=>({...e,status:"stopped",errorMessage:ms,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),vse=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?Cse(e):(n?.(r),Xh(e,t.errorMessage,Cr(t))),_C=async(e,t,r,o)=>{let n=dp(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return Xh(e,"This round has no prompt.");if(e.status==="judging")return u2({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return Xh(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===O)return e;let i=Ts(e);if(i===null)return Xh(e,"The improver needs the score and the reason.");let a=await pt({writerAgent:e.improverModel,workingDirectory:Pe(e),prompt:Qo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:cp()}),c=vse(e,a,e.improverModel,r,t);return c!==null?c:Bh(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var mp,kC,Lse,y2,f2,Ise,xse,Zh,h2,S2,Wse,Ose,Cs,P2,A2,gp=l(()=>{"use strict";x();ip();ap();Me();lt();ir();Rs();g2();GR();mp=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),kC=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return mp(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},Lse=e=>{let t=Cr(e);return $B(e)||t==="usage_limit"||t==="action_required"},y2=(e,t,r)=>Lse(r)?mp(e,r.errorMessage,Cr(r)):kC(e,t,r.errorMessage),f2=e=>{let t=e.wizard;return t===void 0||Qd(e).length===0?e:{...e,wizard:fa({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},Ise=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",xse=e=>{let t=e.wizard;if(t===void 0)return e;let r=$d({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:fa({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Zh=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),h2=e=>e.judgeModel!==O?e.judgeModel:e.improverModel!==O?e.improverModel:null,S2=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},Wse=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=h2(e);if(n===null)return mp(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??rr(o),i=Hd({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:S2(e,"generalize")}),a=await pt({writerAgent:n,prompt:i,workingDirectory:Pe(e),signal:t});if(!a.ok)return r?.(n),y2(e,"generalize",a);try{let c=TR(a.text),d=fa({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:qd(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return Bd(d)?Cs({...p,wizard:{...d,gate:null}}):Zh(p,"generalize")}catch(c){return kC(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},Ose=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=h2(e);if(n===null)return mp(e,"Choose a writer to suggest splits.");let s=or({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Fd({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:S2(e,"separate")}),a=await pt({writerAgent:n,prompt:i,workingDirectory:Pe(e),signal:t});if(!a.ok)return r?.(n),y2(e,"separate",a);try{let c=ER(a.text),d=fR(c,o.variables),p=fa({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),g={...e,wizard:p};return Vd(d)?rn(g,d[0]):Zh(g,"separate")}catch(c){return kC(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},Cs=e=>{let t=e.wizard;if(t===void 0)return e;let r=rr(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},P2=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return mp(e,"This module is missing.");let n=so(r),s=hs(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==O?e.runnerModel:e.judgeModel!==O?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:ue(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},A2=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return _C(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return Wse(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return Ose(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await _C(e,t,r,o);if(L(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Qd(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let g=he(s.revisions.map(f=>({roundNumber:f.roundNumber,promptText:f.promptText,score:f.judgement?.score??0,reasons:f.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:g}}}if(i==="evaluate"&&Gd({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let p=f2(Zh(a,i));return on(p)}let c=Zh(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=SR({wizard:{...c.wizard,modules:c.wizard.modules.map((g,f)=>f===c.wizard.currentModuleIndex&&g.status==="running"?{...g,status:"paused"}:g)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:Ise(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?f2(d):xse(d)}return s}return n.phase==="complete",e}});var Ca,Qh=l(()=>{"use strict";x();Me();Ca=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:_R(r,e.judgeModel===O),updatedAt:new Date().toISOString()}}});var va,eS=l(()=>{"use strict";va=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var Mt,b2,Mse,_2=l(()=>{"use strict";x();lt();eS();ir();iC();Mt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),b2=e=>{if(!L(e.status))return"";let t=he(e.revisions.map(f=>({roundNumber:f.roundNumber,promptText:f.promptText,score:f.judgement?.score??null,reasons:f.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=Ot(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Mt(t.reasons.trim())}</p>`,i=e.status==="passed",a=va(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${Mt(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${Mt(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',p=n!==null?`<div class="alert-error">${Mt(n)}</div>`:i?Mse({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:Pe(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${Mt(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${Mt(t.promptText)}</pre></details>`,g=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${g}</h2>${d}${o}${s}${p}</section>`},Mse=e=>{let t=e.sourceSkill?.fileName??np(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=zh(t,r),s=n.length>0&&MG(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Mt(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Mt(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Mt(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Mt(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Mt(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Mt(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var k2,w2=l(()=>{"use strict";k2=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var T2,jse,tS,ut,rS,wC=l(()=>{"use strict";x();Me();w2();_h();ir();eS();T2=["Generalize","Evaluate","Separate","Optimize modules"],jse=e=>{let t=er(e),r=t>=0&&t<T2.length?T2[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},tS=(e,t)=>{let r=bs(e),o=r===null?null:k2(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},ut=(e,t)=>({title:e,detail:t,replyPreview:null}),rS=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=bs(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:qB(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!L(e.status)){let t=e.judgeModel;return ut(`${me(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!L(e.status)){let t=e.judgeModel;return ut(`${me(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===O?ut(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?ut(`${me(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):ut(`${me(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===O){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==O?ut(`${me(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):ut(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return ut(`${me(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ue(t);return ut(`${me(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return ut(`${me(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ue(t);return ut(`${me(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return ut(`${me(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===O){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return ut("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return ut(`${me(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>Ot(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=ce(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||L(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?tS(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=va(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?tS(e,{title:`${jse(r)}${s}`,detail:t.length>0?t:n}):tS(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(L(e.status)){let t=e.errorMessage?.trim()??"";return tS(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var xr,fp=l(()=>{"use strict";Me();xr=e=>{if(e.status==="improving"&&e.improverModel===O)return!0;if(e.status!=="judging"||e.judgeModel!==O)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===O}});var E2,R2=l(()=>{"use strict";E2=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var nn,Nse,C2,v2=l(()=>{"use strict";x();nn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Nse=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${nn(r)}</p>`},C2=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${nn(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${nn(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${nn(a)}.</p>`}<pre class="mono">${nn(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${en(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${nn(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",g=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${nn(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${Nse(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${nn(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var yp,Dse,L2,I2=l(()=>{"use strict";x();ir();yp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Dse=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=Ot(t.promptText),n=t.judgement?.reasons?`<p class="muted">${yp(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${yp(i)}.</p>`}<pre class="mono">${yp(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${en(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${yp(d)}</pre>`:`<div class="alert-error">${yp(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},L2=e=>e.revisions.map(t=>Dse(e,t)).join("")});var x2,W2=l(()=>{"use strict";x();x2=e=>{if(L(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Wr,Hse,TC,Fse,zse,$se,Use,O2,M2,EC=l(()=>{"use strict";W2();Wr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hse="Stop this run? Writers will stop and the best prompt is kept.",TC="End the wizard? Writers will stop and progress from finished steps is kept.",Fse="Skip this module and pause at the step gate?",zse=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${Wr(Hse)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Wr(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,$se=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${Wr(TC)}"><input type="hidden" name="cycleId" value="${Wr(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,Use=e=>{let t=Wr(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Wr(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${Wr(Fse)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${Wr(TC)}">End wizard</button>
    </form>
  </div>`},O2=e=>{let t=x2(e);return t==="none"?"":t==="legacy_stop"?zse(e.id):t==="wizard_end_only"?$se(e.id):Use(e)},M2=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=Wr(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${Wr(TC)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var j2,N2=l(()=>{"use strict";x();ka();j2=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=ce(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${Es(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${Es(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${ue(r)}`}return""}});var Bse,Gse,D2,Vse,H2,F2=l(()=>{"use strict";x();N2();oC();Ch();Wh();Bse=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',Gse=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',D2=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Vse=(e,t,r)=>{let o=ba(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=j2(e,t),i=xh(e,t),a=Bse(i),c=Gse(i),d=_a(e,t,{forOutcomeSummary:!0}),p=`${a}<span class="sdlc-wizard-outcome-step-title">${D2(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${D2(s)}</span>`,g=t==="wizard-4"&&r.phase==="complete"?" open":"",f=i==="failed"&&t!=="wizard-4"?" open":"",y=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${y}"${g}${f}><summary aria-controls="${y}-body">${p}</summary><div class="sdlc-wizard-outcome-step-body" id="${y}-body">${o}</div></details>`},H2=e=>{let t=e.wizard;if(t===void 0||!L(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>Vse(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var z2,$2,U2=l(()=>{"use strict";z2=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$2=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${z2(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${z2(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var RC,B2,CC=l(()=>{"use strict";RC=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,B2=(e,t)=>{if(RC(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var G2,V2=l(()=>{"use strict";G2=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var oS,K2,q2=l(()=>{"use strict";x();CC();CC();V2();oS=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),K2=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=ce(t),o=ue(t),n=r.terminalStatusSuggestion==="passed"?"":G2(r,o),s=o-10,i=r.rows.map((c,d)=>{let p=t.modules[d],g=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,y=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",P=p===void 0?c.status:B2(p,o),h=p!==void 0&&RC(p,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':P==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':P==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':oS(P);return`<tr${y}><td>${oS(c.title)}</td><td>${oS(g)}</td><td>${c.tokens??"\u2014"}</td><td>${h}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${oS(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var vs,nS,vC=l(()=>{"use strict";vs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nS=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${vs(r.fileName)}</code> \u2014 ${vs(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${vs(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${vs(i.name)}</strong> <code>.cursor/skills/${vs(i.fileName)}/SKILL.md</code></p><p class="muted">${vs(i.description)}</p><p>${vs(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var Kse,J2,Y2=l(()=>{"use strict";x();U2();q2();vC();Kse=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),J2=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!L(e.status)||t.modules.length===0)return"";let r=K2(e),o=$2(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=ce(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${Kse(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${nS(e)}${a}${r}${o}</section>`}});var Y,sS=l(()=>{"use strict";x();Y={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var iS,LC=l(()=>{"use strict";iS=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var X2,Z2=l(()=>{"use strict";sS();LC();X2=e=>{let t=iS({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:Y.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var uo,hp=l(()=>{"use strict";uo=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var mo,aS,IC=l(()=>{"use strict";x();Mh();_2();wC();fp();R2();Ih();v2();I2();EC();F2();Y2();ka();Z2();lt();hp();mo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aS=e=>{let t=!L(e.status)&&e.status!=="wizard_paused"&&!xr(e),r=rS(e),o=bG(cR(E2(e)),e),n=L(e.status)?"":O2(e),s=H2(e),i=J2(e),a=b2(e),c=e.errorMessage===null?"":`<div class="alert-error">${mo(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?ce(e.wizard):null,f=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,y=!t&&e.wizard!==void 0&&L(e.status)&&(e.wizard.phase==="complete"||ce(e.wizard).passedModuleCount>0),P=y?f?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",h=y&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${mo(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",u=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${mo(r.replyPreview)}</pre>`,S=r.detail.length===0&&h.length===0&&u.length===0||r.detail.length===0&&u.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${mo(r.detail)}${p}</p>`}${u}</div>`,b=e.revisions.find(An=>An.roundNumber===e.currentRound),k=e.status==="improving"?Ts(e):null,A=po(e),_=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),E=xr(e)?C2({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:k?.promptText??b?.promptText??"",score:k?.score??b?.judgement?.score??null,reasons:k?.reasons??b?.judgement?.reasons??null,avoid:k?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:b?.run??null,minJudgeScore:_?1:0}):"",T=e.wizard!==void 0&&e.wizard.phase==="complete"&&L(e.status),v=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!T&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?ue(e.wizard):e.passScore,W=v?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${Oh(I)}</div>`:"",j=e.status==="failed"?X2({status:e.status,errorKind:e.errorKind}):null,M=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':L(e.status)?j!==null?`<span class="${j.badgeClass}">${j.badgeLabel}</span>`:T&&g!==null&&!f?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",B=t?d:y?f?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',ie=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${mo(Et(Pe(e)))}</li>`:"",A>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${Es(A)} so far</li>`:""].filter(An=>An.length>0),D=ie.length===0?"":`<ul class="sdlc-run-meta">${ie.join("")}</ul>`,Ie=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,Sn=T?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,Pn=T?"":W.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${Sn}</div>`:`<div class="sdlc-run-grid">${Sn}${W}</div>`,Xs=L2(e),Hr=e.wizard!==void 0&&L(e.status)&&e.revisions.every(An=>An.roundNumber===0&&(An.judgement===void 0||An.judgement===null)),cA=Xs.length===0||Hr?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${Xs}</div></section>`,al=`<p class="sdlc-run-goal" title="${mo(e.goal.trim())}">${mo(uo(e.goal))}</p>`,dA=T?`${c}${i}${s}${E}${a}`:`${c}${Pn}${E}${s}${a}`,Du='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',Zs=T?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${mo(e.updatedAt)}" aria-busy="${t?"true":"false"}">${Du}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${M}</div>${al}<div class="sdlc-run-activity${P}"${y?' role="status"':""}><div class="sdlc-run-activity-icon">${B}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${mo(r.title)}</h2>${S}${h}${Zs}</div></div>${D}${Ie}</header>${dA}</section>${cA}`}});var Q2,e5=l(()=>{"use strict";x();ap();Q2=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Gd({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:on(e)}});var t5,r5=l(()=>{"use strict";x();gp();t5=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Bd(t)?e:Cs({...e,wizard:{...t,gate:null}})}});var o5,n5=l(()=>{"use strict";x();ip();o5=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Vd(t.splitOptions))return e;let r=t.splitOptions[0];return rn(e,r)}});var qse,Ls,lS=l(()=>{"use strict";e5();r5();n5();Rt();qse=e=>{let t=t5(e),r=Q2(t);return o5(r)},Ls=(e,t)=>{let r=qse(t);return r!==t?($(e,r),r):t}});var s5,go,Sp=l(()=>{"use strict";x();s5=e=>wt.indexOf(e),go=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||L(e.status)?wt.length:t.gate!==null?s5(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?s5(t.phase):null}});var i5,a5=l(()=>{"use strict";i5=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Is,l5,c5=l(()=>{"use strict";x();a5();Is=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),l5=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=ys(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Is(i5(o))}</pre></div>`:"",s=Ss(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=so(t),a=s.map(c=>{let d=t.variables.find(P=>P.name===c),p=yh(c),g=i[c]??"",f=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,y=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Is(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Is(p)}">${Is(f)}</label>
        ${y}
        <input class="input" type="text" id="${Is(p)}" name="${Is(p)}" value="${Is(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var d5,p5=l(()=>{"use strict";d5={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var Pp,Jse,Ae,sn=l(()=>{"use strict";p5();tn();Pp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Jse=e=>{let t=d5[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${Pp(t.title)}" aria-describedby="${r}" aria-expanded="false">${dt}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${Pp(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${Pp(t.example)}</span></span></button>`},Ae=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${Pp(r)}"`}>${Pp(e)}</span>${Jse(t)}</span>`});var jt,u5,m5,g5=l(()=>{"use strict";x();sp();sS();sn();jt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),u5=e=>{let t=e.costControls;if(t===void 0||Pa(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??Tt({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${jt(Y.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${jt(t.softWarnMessage??Ps)}</p>`:"",d=Uh({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${jt(Y.estimateOverCeilingWarn)}</p>`:"",p=e.wizard?.modules.length??0,g=p>0?`<p class="muted">Step 4 will optimize ${p} module${p===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${jt(Y.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${jt(Y.confirmLede)}</p>
  ${g}
  ${a}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${jt(ya)}</p>
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
      ${Ae(Y.confirmedTokenLabel,"confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${s}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${Ae(Y.confirmedSpendLabel,"confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${i}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${jt(Y.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${jt(Y.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},m5=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!Pa(r)}});var Yse,f5,y5=l(()=>{"use strict";tn();Yse=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),f5=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${dt}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${Yse(t)}</pre></template>`}});var Ap,h5,S5=l(()=>{"use strict";x();BR();c5();YR();EC();vC();QR();g5();y5();Ap=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),h5=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(m5(e))return u5(e);let n=ue(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?sG(r):"",a=o==="evaluate"?nS(e):"",c=o==="evaluate"?Aa({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",p=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(I=>{let W=I.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',j=I.recommended?' <span class="sdlc-badge">Recommended</span>':"",M=r.selectedSplitOptionId===I.id||r.selectedSplitOptionId===null&&I.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${Ap(I.id)}" required${M}> <strong>${Ap(I.title)}</strong>${W}${j}</label>${Eh(e,I)}</li>`}).join("")}</ul>`:"",g=r.modules[r.currentModuleIndex],y=o==="optimize_modules"&&g?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",P=g?.title??"Module",h=g?.prompt??"",u=g?.status==="pending",S=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Ap(P)}</p>${u?l5({cycle:e,modulePrompt:h}):""}<p class="muted">Test run prompt preview: ${Ap(hs(h,so(r)))}</p>${g?.statistics===null||g?.statistics===void 0?"":`<p class="muted">Module stats: best ${g.statistics.bestScore??"\u2014"} / \u2265${n} (round ${g.statistics.bestRound??"\u2014"}).</p>`}${Aa({cycle:e,interactive:!1,caption:u?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${P}\u201D (runner + judge).`})}`:"",b=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":u?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",k=Ud(r),A=k===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${k}</p>`,_=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?f5(r.lastWriterParseFailureReply??""):"",E=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",T=t?.active===!0?" sdlc-wizard-gate-active":"",v=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${E}"`:"";return`<section class="card sdlc-wizard-gate${T}"${v}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${b}</p>
    ${_}
    ${A}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Ap(e.id)}">
    ${i}
    ${a}
    ${c}
    ${p}
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
    ${M2(e)}
  </section>`}});var Xse,P5,A5=l(()=>{"use strict";x();Wh();Xse=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),P5=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||L(e.status))return"";let r=(o,n)=>{let s=_a(e,o);return`<h2 class="sdlc-wizard-active-head">${Xse(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var xC,b5,_5,an,k5,La=l(()=>{"use strict";x();Rt();xC=new Map,b5=e=>{let t=new AbortController;return xC.set(e,t),t.signal},_5=e=>{xC.delete(e)},an=e=>{xC.get(e)?.abort()},k5=(e,t)=>{let r=Q(e,t);return r===null||r.wizard!==void 0?!1:(L(r.status)||($(e,{...r,status:"stopped",errorMessage:ms,updatedAt:new Date().toISOString()}),an(t)),!0)}});var w5,T5,WC,E5,OC=l(()=>{"use strict";x();Sp();La();w5="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",T5=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return wt[r]??null},WC=(e,t)=>{let r=T5(t);if(r===null||e.wizard===void 0)return!1;let o=wt.indexOf(r);if(o===-1)return!1;let n=go(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<wt.length)},E5=(e,t)=>{let r=T5(t);if(r===null||e.wizard===void 0||!WC(e,t))return e;an(e.id);let o=wt.slice(wt.indexOf(r)),n=Dd(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var MC,R5,C5=l(()=>{"use strict";OC();MC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),R5=(e,t)=>WC(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${MC(w5)}"><input type="hidden" name="cycleId" value="${MC(e.id)}"><input type="hidden" name="wizardStepId" value="${MC(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var Zse,v5,Qse,L5,I5=l(()=>{"use strict";x();Sp();S5();A5();C5();Ch();Zse={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},v5=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Qse=(e,t,r)=>{let o=R5(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${v5(t)}">
  <summary class="sdlc-wizard-accordion-summary">${v5(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${ba(e,t)}</div>
</details>`},L5=e=>{let t=e.wizard;if(t===void 0)return"";let r=go(e);if(r===null)return"";let o=wt.slice(0,r).map((i,a)=>Qse(e,`wizard-${a+1}`,Zse[i])),n=t.gate!==null?h5(e,{active:!0}):P5(e),s=r>=wt.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var cS,jC=l(()=>{"use strict";I5();ZR();x();cS=e=>{if(e===null||e.wizard!==void 0&&L(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=L5(e),r=dG(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var eie,NC,x5=l(()=>{"use strict";x();Me();lt();Rs();eie=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},NC=async(e,t,r)=>{if(!eie(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===O)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=PR({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await pt({writerAgent:e.judgeModel,prompt:n,workingDirectory:Pe(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=bR(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var bp,dS,W5,DC,O5,M5,j5,pS,HC=l(()=>{"use strict";bp=m(require("node:fs")),dS=m(require("node:path")),W5=e=>dS.default.join(dS.default.dirname(e),"prompt-optimizer-writer-ready.json"),DC=e=>{let t=W5(e);if(!bp.default.existsSync(t))return{};try{let r=JSON.parse(bp.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},O5=(e,t)=>{bp.default.mkdirSync(dS.default.dirname(e),{recursive:!0}),bp.default.writeFileSync(W5(e),`${JSON.stringify(t,null,2)}
`)},M5=(e,t)=>DC(e)[t]?.message??null,j5=(e,t,r)=>{O5(e,{...DC(e),[t]:{message:r}})},pS=(e,t)=>{let r=DC(e);r[t]!==void 0&&O5(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var FC,uS,mS,N5,je,xs=l(()=>{"use strict";x();aC();gp();x5();fp();La();HC();lS();Rt();FC=new Set,uS={atMs:0,ids:[]},mS=async()=>{if(Date.now()-uS.atMs<3e4)return uS.ids;let e=await Qt({commands:Te({})});return uS.atMs=Date.now(),uS.ids=e.installedWriterIds,e.installedWriterIds},N5=async(e,t,r)=>{let o=Q(e,t);if(o===null||r.aborted)return;let n=Ls(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(L(n.status)&&!s||n.status==="wizard_paused"||xr(n))return;if(s){let c=await NC(n,r,d=>{pS(e,d)});$(e,c);return}let i=await A2(n,c=>{pS(e,c)},r,c=>{Q(e,t)?.status==="stopped"||r.aborted||$(e,c)});if(!(Q(e,t)?.status==="stopped"||r.aborted)){if($(e,i),L(i.status)){let c=await NC(i,r,d=>{pS(e,d)});$(e,c);return}await N5(e,t,r)}},je=(e,t)=>{if(FC.has(t))return;let r=Q(e,t);if(r===null)return;let o=Ls(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(L(o.status)&&!n||o.status==="wizard_paused"||xr(o))return;FC.add(t);let s=b5(t);N5(e,t,s).finally(()=>{FC.delete(t),_5(t)})}});var ln,_p=l(()=>{"use strict";IC();lS();jC();xs();ln=(e,t)=>{let r=Ls(e,t);return je(e,r.id),`${aS(r)}${cS(r)}`}});var D5,H5,F5=l(()=>{"use strict";D5=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,H5=e=>e!==null&&e>0});var tie,rie,oie,z5,$5=l(()=>{"use strict";x();gp();Qh();ip();ap();La();vh();vh();tie=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),rie=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=he(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},oie=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=ce(o);return Ca({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},z5=(e,t)=>{if(!op(e,t))return e;an(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return Cs({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return on(rie(r));if(t==="wizard-3"){let n=o.splitOptions[0]??tie(o.templatedPrompt);return rn(r,n)}return t==="wizard-4"?oie(r):e}});var gS,U5,zC=l(()=>{"use strict";x();Qh();La();gS=e=>(an(e.id),{...Ca(e,"stopped"),errorMessage:VE}),U5=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;an(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var nie,B5,G5,V5=l(()=>{"use strict";x();gp();Qh();ip();ap();_p();Rt();xs();F5();OC();$5();zC();nie="Pick a revision scored above 0 before continuing to Separate.",B5=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),G5=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=Q(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=Q(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(ln(e.storePath,d))};if(o==="wizard-stop-all"){let c=gS(s);return $(e.storePath,c),je(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=U5(s);return $(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=E5(s,c);return $(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=z5(s,c);return $(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&je(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",g=mR(s.wizard,d,c);g=Dd(g,d),g={...g,pendingStepInstructions:p};let f={...s,status:"judging",errorMessage:null,wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return $(e.storePath,f),je(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(f=>f.step==="generalize"),g=(s.errorMessage?.trim().length??0)>0&&!d?B5(s):Cs({...s,wizard:{...s.wizard,gate:null}});return $(e.storePath,g),je(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=D5(s,p??-1);if(!H5(g)){let y={...s,errorMessage:nie,updatedAt:new Date().toISOString()};return $(e.storePath,y),a(n),!0}let f=on({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return $(e.storePath,f),je(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let y=B5(s);return $(e.storePath,y),je(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(y=>y.id===p);if(g===void 0){let y={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return $(e.storePath,y),a(n),!0}let f=rn(s,g);return $(e.storePath,f),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,p=d.currentModuleIndex,g=d.modules[p];if(g===void 0)return a(n),!0;if(!Pa(s.costControls)){let u=t.get("confirmedTokenBudget")?.trim()??"",S=t.get("confirmedMaxSpendUsd")?.trim()??"";if(u.length===0){let k={...s,errorMessage:ya,updatedAt:new Date().toISOString()};return $(e.storePath,k),a(n),!0}let b=lo({existing:s.costControls,confirmedTokenBudget:Number(u),confirmedMaxSpendUsd:S.length===0?null:Number(S),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!b.ok){let k={...s,errorMessage:b.errorMessage,updatedAt:new Date().toISOString()};return $(e.storePath,k),a(n),!0}s={...s,costControls:b.costControls,errorMessage:null,updatedAt:new Date().toISOString()},$(e.storePath,s)}let f=xR({wizard:d,modulePrompt:g.prompt,posted:t});if(!f.ok){let u={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return $(e.storePath,u),a(n),!0}let y={...d,parameterValues:f.parameterValues};if(g.status==="pending"){let u=P2({...s,wizard:{...y,gate:null}},p);return $(e.storePath,u),je(e.storePath,n),a(n),!0}let P=p+1;if(P>=d.modules.length){let u=ce(y),S=Ca({...s,wizard:y},u.terminalStatusSuggestion);return $(e.storePath,S),je(e.storePath,n),a(n),!0}let h={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...y,gate:"optimize_modules",currentModuleIndex:P},updatedAt:new Date().toISOString()};return $(e.storePath,h),a(n),!0}}return a(n),!0}});var sie,K5,iie,$C,aie,q5,J5=l(()=>{"use strict";Me();La();zC();fC();Gh();fp();Rt();sie="Add a score from 0 to 100 and the reason for it.",K5="Add a score from 1 to 100 and the reason for it.",iie="Write the next prompt.",$C="This step is not waiting for you.",aie=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},q5=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=Q(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?($(e.storePath,gS(a)),{kind:"saved",cycleId:i}):k5(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=Q(e.storePath,r);if(o===null||!xr(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:$C};if(t==="manual-judge"){if(o.judgeModel!==O)return{kind:"invalid",cycle:o,errorMessage:$C};let i=aie(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?K5:sie};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:K5};let d=o.revisions.find(g=>g.roundNumber===o.currentRound)?.run?.tokenReview??"",p=Vh(pp(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return $(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==O)return{kind:"invalid",cycle:o,errorMessage:$C};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:iie};let s=Bh(o,n);return $(e.storePath,s),{kind:"saved",cycleId:o.id}}});var Y5,X5=l(()=>{"use strict";Y5=`<script>
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
</script>`});var Z5,Q5=l(()=>{"use strict";Z5=`<script>
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
</script>`});var eV,tV=l(()=>{"use strict";eV=`<script>
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
</script>`});var rV,oV=l(()=>{"use strict";rV=`<script>
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
</script>`});var nV,sV=l(()=>{"use strict";x();lt();nV=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:Et(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(ue(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!L(t.status)}}});var iV,aV=l(()=>{"use strict";iV=`<script>
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
</script>`});var lV,cV=l(()=>{"use strict";x();Sp();eS();lV=e=>{let t=va(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:L(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=go(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=ce(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=ce(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return L(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var dV,pV=l(()=>{"use strict";dV=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var fo,lie,cie,uV,mV=l(()=>{"use strict";cV();pV();hp();fo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lie=e=>e.wizard===void 0?"legacy":"wizard",cie=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${fo(t)}">`,o=lV(e),n=dV(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${fo(o.badgeClass)}">${fo(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${fo(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${fo(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${lie(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${fo(e.id)}">${fo(uo(e.goal))}</a><p class="muted">${fo(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${g}</div></li>`},uV=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>cie(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${fo(s)}</summary>${i}</details>`:i}});var UC,fS,gV,die,pie,kp,fV,yS=l(()=>{"use strict";UC=m(require("node:fs")),fS=m(require("node:path"));lt();gV=/^[a-z0-9-]+$/,die=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},pie=(e,t)=>{if(!gV.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let g=die(p[2]??"");p[1]==="name"&&g.length>0&&(o=g),p[1]==="description"&&(n=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},kp=e=>{let t=co(e);if(!t.ok)return[];let r=fS.default.resolve(t.path,".cursor","skills"),o=[];try{o=UC.default.readdirSync(r)}catch{return[]}return o.filter(n=>gV.test(n)).flatMap(n=>{let s=fS.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${fS.default.sep}`))return[];try{let i=pie(UC.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},fV=(e,t)=>kp(e).find(r=>r.fileName===t)??null});var yV,uie,hV,SV,PV=l(()=>{"use strict";sn();yV=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uie=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),hV=e=>{if(e.length===0)return`<div class="field">${Ae("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${yV(r.fileName)}">${yV(r.fileName)}</option>`).join("");return`<div class="field">${Ae("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${uie(e)}</script>`},SV=`<script>
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
</script>`});var mt,AV,bV=l(()=>{"use strict";x();sS();sp();sn();mt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AV=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=mt(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=Sa({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??ao(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),g=Uh({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",f=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${mt(Y.knobsSectionTitle)}</p>
  <p class="muted">${mt(Y.knobsSectionLede)}</p>
  <div class="field">
    ${Ae(Y.maxTrialsLabel,"maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${30}" step="1" value="${r}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${Ae(Y.maxSpendUsdLabel,"maxSpendUsd")}
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
</div>`}});var rt,_V,kV,mie,wV,TV,EV,RV=l(()=>{"use strict";x();wC();Me();hp();Sp();rt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_V=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",kV=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,mie=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},wV=e=>e===O?"You":me(e),TV=e=>{let t=mie(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":me(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${rt(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${rt(t)}</dd></div>
      <div><dt>Judge</dt><dd>${rt(wV(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${rt(wV(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${rt(r)}</dd></div>
    </dl>
  </details>`},EV=e=>{let t=e.wizard;if(t===void 0)return"";let r=uo(e.goal),o=e.status==="wizard_paused",n=!L(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=rS(e),g=kV(t),f=g===null?"":_V(g),y=go(e),P=f.length===0?"":y===null||y>=4?` <strong>${rt(f)}</strong>`:` <strong>${rt(f)}</strong> (step ${y+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${rt(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${rt(p.title)}${P}</p>
    <p class="muted">${rt(p.detail)}</p>
    <div class="actions">
      ${TV(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${rt(e.id)}">Open this run</a>
    </div>
  </section>`}let s=kV(t),i=s===null?"Wizard":_V(s),a=go(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${rt(r)}</h2>
    <p class="lede">Paused at <strong>${rt(i)}</strong>${rt(c)} (last updated ${rt(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${TV(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${rt(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var wp,CV,vV=l(()=>{"use strict";sn();wp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),CV=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${wp(n.id)}"${n.id===e.runner?" selected":""}>${wp(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${wp(e.runner)}">Checking ${wp(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Ae("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Ae("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${wp(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var LV,IV=l(()=>{"use strict";LV=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var Ia,xV,WV,OV,MV,jV=l(()=>{"use strict";sn();Ia=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xV=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${Ia(c.id)}"${c.id===r?" selected":""}>${Ia(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Ia(n)}</option>`;return`<div class="field">${Ae(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},WV=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Ia(t)}">Checking ${Ia(o)}\u2026</p>`},OV=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Ae(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Ia(r)}</textarea><span class="muted">${o}</span></div></details>`,MV=e=>{let t=`<div class="sdlc-writer">${xV("judge","Judge",e.judge,e.writers,"I'll score it")}${WV("judge",e.judge,e.writers)}${OV("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${xV("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${WV("improver",e.improver,e.writers)}${OV("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var NV,DV=l(()=>{"use strict";NV=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var BC,HV,FV=l(()=>{"use strict";DV();BC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HV=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${NV.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${BC(t.goal)}" title="${BC(t.goal)}">${BC(t.label)}</button>`).join("")}</div>`});var Tp,gie,fie,GC,zV=l(()=>{"use strict";x();sn();Tp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gie=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},fie=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,GC=e=>{let t=gie(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=xd(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${Ae(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${Tp(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${Tp(e.inputId)}" class="sdlc-pass-range" type="range" name="${Tp(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${Tp(a)}"><span class="sdlc-pass-mark" style="left:${fie(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${Tp(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var hie,VC,yo,$V,UV=l(()=>{"use strict";fp();IC();X5();Q5();Mh();tV();oV();sV();aV();mV();yS();PV();sn();jC();bV();RV();hp();vV();IV();jV();x();FV();zV();hie=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,VC='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',yo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$V=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${yo(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${yo(e.skillNotice??"")}</div>`,o=`${_G}${kG}`,n=e.resumableWizardCycle??null,s=n===null?"":EV(n),i=cS(e.cycle),a=e.cycle===null?"":aS(e.cycle),c=e.cycle!==null&&xr(e.cycle),d=nV(e),p=hie(d.goal,d.prompt,e.canRun),g=MV({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),f=CV({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),y=`${GC({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${GC({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,P=AV({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),h=pR,u=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",S=e.cycle!==null&&L(e.cycle.status),b=d.running&&!S,k=S||b?"":" open",A=b?" sdlc-compose-run-focus":"",E=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${S?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,T=S?(()=>{let D=e.cycle!==null?uo(e.cycle.goal):uo(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${yo(D)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${E}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${E}</summary>`,v=S?" sdlc-compose-viewing-finished":"",I=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",W=c?"waiting":d.running?"running":"idle",j=d.running&&!c?' aria-busy="true"':"",M=`<section class="card sdlc-compose${v}${A}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${k}>
        ${T}
        <div class="sdlc-compose-details-body">
      <p class="lede">${h} ${yo(e.modelNote)}</p>
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
            ${Ae("Folder","folder")}
            <input class="input" type="text" name="folder" value="${yo(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${hV(kp(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${VC}
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <input type="hidden" name="orchestratorSkillFile" value="" data-orchestrator-skill-file>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <p class="muted sdlc-compose-orchestrator-note" data-orchestrator-skill-note hidden></p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${Ae("Goal","goal")}
            ${HV()}
            <textarea class="input textarea" name="goal" rows="4" required>${yo(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Ae("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${yo(d.prompt)}</textarea>
          </div>
          ${y}
          ${P}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${VC}
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
        ${LV()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${VC}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${yo(d.passScore)}; Step 4 pass \u2265 ${yo(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${W}" data-can-run="${p?"true":"false"}"${j}${d.running?" disabled":""}>${I}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,B=e.history.length>0?iV:"",ie=`${""}${rV}${Y5}${Z5}${eV}${SV}${B}`;return`${t}${r}${M}${s}${a}${i}${o}${uV(e.history,e.cycle?.id??null)}${ie}`}});var Ep,KC=l(()=>{"use strict";UV();Ep=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:$V(t)}))}});var BV,GV=l(()=>{"use strict";J5();_p();KC();Rt();xs();BV=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:q5({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=Q(e.storePath,o.cycleId);return je(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(ln(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Ep(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:Lr(e.storePath),resumableWizardCycle:null}),!0)}});var VV,hS,qC=l(()=>{"use strict";x();VV=m(require("node:os")),hS=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??VV.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??sr()}}});var KV,xa,JC,qV,JV,Rp=l(()=>{"use strict";x();Me();nC();KV=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,xa=e=>{let t=YB(e),r=_s(e).map(s=>({id:s,label:kh[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},JC=(e,t,r)=>t===O||t!==null&&e.writers.some(o=>o.id===t)?t:r,qV=(e,t,r,o=null)=>({judge:JC(e,t,e.judge),improver:JC(e,r,e.improver),runner:JC(e,o,e.runner)}),JV=e=>e===jh?{goal:Nh,prompt:Dh}:{goal:"",prompt:""}});var YC,YV=l(()=>{"use strict";YC=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var XV,Sie,ZV,QV,eK,tK=l(()=>{"use strict";x();XV=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},Sie=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},ZV=(e,t)=>e.has("earlyStop")?!0:t!=="run",QV=e=>{let t=XV(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=Sie(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=XV(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},eK=e=>sr(e)});var rK,oK,SS,XC=l(()=>{"use strict";x();Me();lt();Rp();YV();tK();rK=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=YC(o);return n.ok?String(n.passScore):String(r)},oK=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return YC(n)},SS=e=>{let t=qV(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=rK(e.posted,"passScore",70),o=rK(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),p=e.posted?.get("maxSpendUsd")?.trim()??"",g=e.posted?.get("intent")??"",f=e.posted===null?!0:ZV(e.posted,g),y=(T,v)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:T,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:v,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:p,earlyStop:f});if(e.posted===null)return y(e.defaultFolder??ks,null);let P=e.posted.get("folder")??ks;if(e.posted.get("intent")==="choose-folder"){let T=e.pickFolder();return y(T===null?P:Et(T),null)}if((e.posted.get("intent")??"")!=="run")return y(P,null);let u=KV(e.goal,e.prompt);if(u!==null)return y(P,u);let S=oK(e.posted,"passScore",r);if(!S.ok)return y(P,S.errorMessage);let b=oK(e.posted,"modulePassScore",o);if(!b.ok)return y(P,b.errorMessage);let k=XB(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(k===null)return y(P,"Choose a judge and an improver.");let A=co(P);if(!A.ok)return y(P,A.errorMessage);let _=ZB(e.installedIds,c,k.judge);if(_===null)return y(P,"Choose a runner for wizard step 4.");let E=QV({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return E.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:k.judge,improver:k.improver,workingDirectory:A.path,passScore:S.passScore,modulePassScore:b.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:_,runnerInstructions:a,costControls:eK(E.knobs)}:y(P,E.errorMessage)}});var Wa,AS,Pie,ZC,nK,PS,sK,Aie,iK,QC,bie,_ie,kie,ev,aK,lK,cK=l(()=>{"use strict";Wa=m(require("node:fs")),AS=m(require("node:path"));Me();lt();Pie=["remember","choose-folder","run"],ZC=()=>({folder:ks,judge:"",improver:"",runner:""}),nK=e=>AS.default.join(AS.default.dirname(e),"prompt-optimizer-preferences.json"),PS=e=>typeof e=="string"?e:"",sK=e=>{let t=nK(e);if(!Wa.default.existsSync(t))return ZC();try{let r=JSON.parse(Wa.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return ZC();let o=r,n=PS(o.folder).trim();return{folder:n.length===0?ks:n,judge:PS(o.judge),improver:PS(o.improver),runner:PS(o.runner)}}catch{return ZC()}},Aie=(e,t)=>{let r=nK(e);Wa.default.mkdirSync(AS.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;Wa.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),Wa.default.renameSync(o,r)},iK=(e,t)=>e===O||_s(t).some(r=>r===e),QC=(e,t,r)=>e===null?t:e.length===0?"":iK(e,r)?e:t,bie=(e,t)=>{if(e===null)return t;let r=co(e);return r.ok?r.display:t},_ie=e=>{let t=sK(e.storePath),r={folder:bie(e.folder,t.folder),judge:QC(e.judge,t.judge,e.installedIds),improver:QC(e.improver,t.improver,e.installedIds),runner:QC(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||Aie(e.storePath,r)},kie=e=>{let t=co(e);return t.ok?t.display:ks},ev=(e,t)=>iK(e,t)?e:"",aK=e=>{let t=sK(e.storePath);return{selection:{...e.selection,judge:ev(t.judge,e.installedIds)||e.selection.judge,improver:ev(t.improver,e.installedIds)||e.selection.improver,runner:ev(t.runner,e.installedIds)||e.selection.runner},defaultFolder:kie(t.folder)}},lK=e=>{let t=e.posted.get("intent")??"";if(!Pie.includes(t))return;let r=e.posted.get("folder");_ie({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var dK,wie,Tie,tv,Eie,bS,_S=l(()=>{"use strict";dK=m(require("node:os"));Me();HC();Rs();wie="Reply with the single word ok. Do not use tools.",Tie=45e3,tv=async(e,t)=>{if(t===O)return{ok:!0,message:"You will do this step."};let r=M5(e,t);if(r!==null)return{ok:!0,message:r};let o=await pt({writerAgent:t,prompt:wie,workingDirectory:dK.default.tmpdir(),timeoutMs:Tie});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${me(t)} is ready.`;return j5(e,t,n),{ok:!0,message:n}},Eie=e=>[...new Set(e.filter(t=>t.length>0))],bS=async(e,t,r,o)=>{for(let n of Eie([t,r,o??""])){let s=await tv(e,n);if(!s.ok)return s.message}return null}});var rv,pK=l(()=>{"use strict";x();rv=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!L(r.status)&&!(t!==null&&r.id===t))return r;return null}});var uK,mK=l(()=>{"use strict";Wt();x();sp();_p();qC();XC();KC();Rt();lt();cK();yS();_S();pK();lS();xs();uK=async e=>{let t=e.posted===null?aK({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=SS({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Ko("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(lK({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Et(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await bS(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await Ep(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Et(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:Lr(e.route.storePath),resumableWizardCycle:rv(Lr(e.route.storePath),null)});return}if(r.kind==="start"){let s=fV(r.workingDirectory,r.sourceSkillFile),i=$h(Zd({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=hS({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:kR({...Nd(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if($(e.route.storePath,a),je(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(ln(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:Q(e.route.storePath,e.cycleId);n!==null&&(n=Ls(e.route.storePath,n),je(e.route.storePath,n.id)),await Ep(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:Lr(e.route.storePath),resumableWizardCycle:rv(Lr(e.route.storePath),n?.id??null)})}});var gK,fK=l(()=>{"use strict";Rt();gK=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";xG(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var yK,hK=l(()=>{"use strict";yK=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var SK,PK=l(()=>{"use strict";HG();V5();GV();mK();fK();Rp();hK();xs();SK=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await mS(),o=xa(r),n=e.method==="POST"?yK(e.request.headers["content-type"],await e.readBody(e.request)):null;if(G5({posted:n,storePath:e.storePath,response:e.response})||await BV(e,n,o))return;let s=JV(t.searchParams.get("example")),i=gK({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=DG({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await uK({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:NG(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var Rie,AK,bK=l(()=>{"use strict";x();Rt();Rie=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",AK=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=Q(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!L(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=wR({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${Rie(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var _K,kK=l(()=>{"use strict";_p();Rt();_K=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:Q(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":ln(e.storePath,o)),!0}});var Cie,wK,TK=l(()=>{"use strict";Me();_S();Cie=["claude-cli","codex","cursor","antigravity"],wK=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===O||Cie.includes(t)?await tv(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var EK,RK=l(()=>{"use strict";x();EK=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:Od,page:Md,context:ma,installedWriters:e,post:{method:"POST",url:Od,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${Od}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var kS,CK=l(()=>{"use strict";x();LC();ka();kS=e=>{let t=e.revisions[e.revisions.length-1]??null,r=he(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=L(e.status),n=e.errorKind??null,s=iS({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:po(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:ma,page:`${Md}?cycle=${encodeURIComponent(e.id)}`}}});var K,vie,vK,LK,IK=l(()=>{"use strict";K=m(ni());x();vie=(0,K.isType)({goal:K.isString,prompt:K.isString,workingDirectory:K.isString,judge:(0,K.isUndefinedOr)(K.isString),improver:(0,K.isUndefinedOr)(K.isString),passScore:(0,K.isUndefinedOr)(K.isNumber),maxRounds:(0,K.isUndefinedOr)(K.isNumber),maxTrials:(0,K.isUndefinedOr)(K.isNumber),maxSpendUsd:(0,K.isUndefinedOr)(K.isNumber),earlyStop:(0,K.isUndefinedOr)(K.isBoolean),earlyStopFlatRounds:(0,K.isUndefinedOr)(K.isNumber),confirmedTokenBudget:(0,K.isUndefinedOr)(K.isNumber),confirmedMaxSpendUsd:(0,K.isUndefinedOr)(K.isNumber),rateUsdPer1kTokens:(0,K.isUndefinedOr)(K.isNumber)}),vK=e=>{let t=e?.trim()??"";return t.length===0?null:t},LK=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return vie(t)?t.workingDirectory.trim().length===0?{ok:!1,error:ch}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:vK(t.judge),improver:vK(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:ch}}});var ho,Lie,xK,WK,OK=l(()=>{"use strict";x();ho=m(ni()),Lie=(0,ho.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:ho.isNumber,confirmedMaxSpendUsd:(0,ho.isUndefinedOr)(ho.isNumber),rateUsdPer1kTokens:(0,ho.isUndefinedOr)(ho.isNumber)}),xK=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:Lie(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},WK=(e,t)=>{let r=lo({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var Iie,MK,jK=l(()=>{"use strict";x();Me();XC();Rp();Iie=e=>e.map(t=>t.id).join(", "),MK=e=>{let t=xa(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===O||n===O)return{ok:!1,error:dR,installedWriters:t.writers};if(o===null||n===null){let a=Iie(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=SS({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var xie,NK,DK=l(()=>{"use strict";x();qC();RK();CK();Rp();IK();OK();jK();Rt();xie=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},NK=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let p=Q(e.storePath,t);return p===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:kS(p)}}let r=await e.handlers.readInstalledIds(),o=xa(r);if(e.method==="GET")return{status:200,body:EK(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let p=xK(e.rawBody);if(p.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(p.kind==="invalid")return{status:400,body:{ok:!1,error:p.error}};let g=Q(e.storePath,t);if(g===null)return{status:404,body:{ok:!1,error:"That run is not on this Mac."}};let f=WK(g,p.body);return f.ok?($(e.storePath,f.cycle),{status:200,body:kS(f.cycle)}):{status:400,body:{ok:!1,error:f.error}}}let n=xie(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let p=Sa({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:p.targetTokenBudget,proposedTokenBudget:p.targetTokenBudget,estimatedSpendUsd:p.estimatedSpendUsd,rateUsdPer1kTokens:p.rateUsdPer1kTokens??null,proposalStub:p.stub===!0,confirmationRequired:!0}}}let s=LK(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=MK({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=Zd({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:Tt({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let p=lo({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!p.ok)return{status:400,body:{ok:!1,error:p.errorMessage}};c=p.costControls}let d=hS({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:Nd(i.prompt),runnerModel:i.runner,costControls:c});return $(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:kS(d)}}});var HK,FK=l(()=>{"use strict";xs();_S();DK();HK=async e=>{let t=await NK({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:mS,readWritersReady:bS,startCycle:je}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var $K,Wie,Oie,zK,Mie,UK,BK=l(()=>{"use strict";$K=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],Wie=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},Oie=e=>{let t={};for(let n of e)for(let s of new Set($K(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},zK=(e,t)=>{let r=Wie($K(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},Mie=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},UK=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=Oie(e.map(i=>i.text)),s=zK(o,n);return e.map(i=>({id:i.id,score:Mie(s,zK(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var ov,jie,Nie,GK,Die,Hie,Fie,zie,nv,sv=l(()=>{"use strict";ov=m(require("node:path"));lt();BK();yS();jie=5,Nie=20,GK=280,Die=e=>[e.name,e.description,e.promptText].join(`
`),Hie=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=GK?t:`${t.slice(0,GK-3)}...`},Fie=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),zie=e=>e===void 0||!Number.isFinite(e)?jie:Math.min(Nie,Math.max(1,Math.floor(e))),nv=e=>{let t=e.query.trim(),r=zie(e.limit),o=co(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=kp(o.path),s=UK(n.map(d=>({id:d.fileName,text:Die(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=ov.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let p=i.get(d.id);return p===void 0?[]:[{skillId:p.fileName,name:p.name,description:p.description,score:d.score,sourcePath:ov.default.join(a,p.fileName,"SKILL.md"),excerpt:Hie(p),source:"filesystem"}]});return{query:t,hits:c,context:Fie(c)}}});var VK,KK=l(()=>{"use strict";sv();VK=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:nv({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var qK,JK=l(()=>{"use strict";KK();qK=async e=>{let t=VK({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var $ie,iv,YK=l(()=>{"use strict";EG();PK();bK();kK();TK();FK();JK();$ie=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},iv=async e=>{let t=$ie(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await HK(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await qK(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:TG()})),!0):(await wK({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||AK({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||_K({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await SK(e),!0)}});var XK=l(()=>{"use strict";YK();sv();Rs()});var av,lv,cv=l(()=>{"use strict";av="2025-03-26",lv={name:"agent-witch",version:"1.0.0"}});var Oa,wS,ZK,Uie,Cp,QK=l(()=>{"use strict";cv();Oa=(e,t,r)=>({jsonrpc:"2.0",id:e??null,error:{code:t,message:r}}),wS=(e,t)=>({jsonrpc:"2.0",id:e??null,result:t}),ZK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?e:null,Uie=async(e,t,r,o)=>{let n=t?.name;if(typeof n!="string")return Oa(e,-32602,"tool name is required");let s=r.tools.find(i=>i.definition.name===n);if(s===void 0)return Oa(e,-32602,`Unknown tool: ${n}`);try{let i=await s.call(t?.arguments??{},o);return wS(e,i)}catch(i){try{r.onToolError?.(n,i)}catch{}return Oa(e,-32603,`Tool ${n} failed`)}},Cp=async(e,t,r)=>{let o=ZK(e);if(o===null)return Oa(null,-32700,"Parse error");let n=o.id??null,s=o.method;return typeof s!="string"?Oa(n,-32600,"Invalid Request"):s==="initialize"?wS(n,{protocolVersion:av,capabilities:{tools:{listChanged:!1}},serverInfo:t.serverInfo}):s==="ping"||s==="notifications/initialized"?wS(n,{}):s==="tools/list"?wS(n,{tools:t.tools.map(i=>i.definition)}):s==="tools/call"?Uie(n,ZK(o.params),t,r):Oa(n,-32601,"Method not found")}});var dv,eq=l(()=>{"use strict";dv=(e,t)=>({content:[{type:"text",text:e}],...t===!0?{isError:!0}:{}})});var TS=l(()=>{"use strict";QK();eq();cv()});var Bie,cn,ES=l(()=>{"use strict";td();TS();Bie=(e,t)=>{let r=t instanceof Error?t.message:String(t);process.stderr.write(`[agent-witch] mcp tool ${e} failed: ${r}
`)},cn=e=>{let t=Yo({layout:e.layout,isDeclined:e.isDeclined});return{serverInfo:lv,tools:[{definition:ay,call:r=>dv(JSON.stringify(t(r)))}],onToolError:e.logToolError??Bie}}});var tq,Gie,Vie,rq,oq=l(()=>{"use strict";TS();ES();tq=(e,t)=>{let r=JSON.stringify(t);e.write(`Content-Length: ${Buffer.byteLength(r,"utf8")}\r
\r
${r}`)},Gie=async(e,t)=>{let r=Buffer.alloc(0);for await(let o of e.stdin)for(r=Buffer.concat([r,Buffer.isBuffer(o)?o:Buffer.from(String(o),"utf8")]);;){let n=r.indexOf(`\r
\r
`);if(n<0)break;let s=r.subarray(0,n).toString("utf8"),i=/Content-Length:\s*(\d+)/i.exec(s);if(i===null){r=r.subarray(n+4);continue}let a=Number.parseInt(i[1]??"0",10),c=n+4+a;if(r.length<c)break;let d=r.subarray(n+4,c).toString("utf8");r=r.subarray(c);let p;try{p=JSON.parse(d)}catch{p=null}await t(p)}},Vie=async(e,t)=>{await Gie(t,async r=>{let o=typeof r=="object"&&r!==null?r:null,n=o?.method,s=await Cp(r,e,void 0);if(typeof n=="string"&&n.startsWith("notifications/")){o?.id!==void 0&&tq(t.stdout,s);return}tq(t.stdout,s)})},rq=async e=>{await Vie(cn({layout:e.layout,isDeclined:e.isDeclined}),e.streams??{stdin:process.stdin,stdout:process.stdout})}});var Kie,RS,nq=l(()=>{"use strict";TS();ES();Kie="/mcp",RS=async e=>{if(e.pathname!==Kie)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t=null;try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{t=null}let r=e.server??cn({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,await Cp(t,r,void 0)),!0}});var sq={};St(sq,{createAwlMcpServer:()=>cn,runAwlMcpStdio:()=>rq,tryHandleAwlMcpHttpRequest:()=>RS});var pv=l(()=>{"use strict";ES();oq();nq()});var Ws,vp,qie,Jie,Yie,Xie,iq,aq=l(()=>{"use strict";Ws=m(require("node:fs")),vp=m(require("node:path")),qie="prompt-optimizer-cycles.json",Jie="prompt-optimizer-preferences.json",Yie="prompt-sdlc-cycles.json",Xie="prompt-sdlc-preferences.json",iq=e=>{let t=vp.default.join(e,qie),r=vp.default.join(e,Yie);if(Ws.default.existsSync(t)||!Ws.default.existsSync(r))return t;try{Ws.default.renameSync(r,t)}catch{return r}let o=vp.default.join(e,Xie),n=vp.default.join(e,Jie);if(Ws.default.existsSync(o)&&!Ws.default.existsSync(n))try{Ws.default.renameSync(o,n)}catch{}return t}});var Ma,Zie,uv,lq=l(()=>{"use strict";Ma=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Zie=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],uv=e=>{let t=Zie.map(i=>`<option value="${Ma(i.value)}">${Ma(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Ma(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Ma(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Ma(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Ma(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Lp,pq,Qie,uq,eae,tae,mq,vS,cq,dq,rae,oae,So,Ip,CS,nae,LS,mv,sae,gv,gq,fv,fq,iae,aae,lae,yq,hq,Sq,xp=l(()=>{"use strict";Lp=m(require("node:fs")),pq=m(require("node:path")),Qie="estimate-history.ndjson",uq=100,eae=500,tae=2e4,mq=e=>pq.default.join(e,Qie),vS=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,eae),cq=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,tae),dq=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,rae=e=>({...e,estimateTokens:dq(e.estimateTokens),actualTokens:dq(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),oae=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},So=e=>{let t=mq(e);return Lp.default.existsSync(t)?Lp.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return oae(n)?[rae(n)]:[]}catch{return[]}}):[]},Ip=(e,t)=>{Lp.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Lp.default.writeFileSync(mq(e),r,"utf8")},CS=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),nae=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${CS(o.task)} | ${CS(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},LS=e=>{let t=So(e.reportsDir),r=vS(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ip(e.reportsDir,[...s,n])},mv=e=>{let t=So(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?vS(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Ip(e.reportsDir,[...i,s])},sae=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-uq),gv=e=>[...So(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),gq=e=>{let t=So(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=cq(e.input),n=cq(e.output),s=vS(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Ip(e.reportsDir,[...c,a])},fv=(e,t)=>{let r=So(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},fq=e=>({table:nae(sae(So(e))),embedding:null}),iae=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},aae=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-uq),lae=e=>{let t=iae(aae(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${CS(s.task)} | ${CS(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},yq=e=>{let t=So(e.reportsDir),r=vS(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ip(e.reportsDir,[...s,n])},hq=e=>{let t=So(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ip(e.reportsDir,[...s,n])},Sq=e=>lae(So(e))});var Pq=l(()=>{"use strict";xp()});var Po,yv,cae,hv,dae,pae,IS,xS,uae,Sv,Aq=l(()=>{"use strict";Pq();tC();Po=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yv=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},cae=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${yv(-r)} under`:`${yv(r)} over`},hv=e=>e.toLocaleString("en-US"),dae=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${hv(-r)} under`:`${hv(r)} over`},pae=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},IS=e=>e===null?"\u2014":yv(e),xS=e=>e===null?"\u2014":hv(e),uae=`(function () {
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
})();`,Sv=e=>{let r=gv(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":cae(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":dae(n.estimateTokens,n.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${Po(pae(i))}</button></td>
        <td>${Po(c)}</td>
        <td>${IS(n.estimateSeconds)}</td>
        <td>${IS(n.actualSeconds)}</td>
        <td>${Po(d)}</td>
        <td>${xS(n.estimateTokens)}</td>
        <td>${xS(n.actualTokens)}</td>
        <td>${Po(p)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${Po(c)}</p>
        <h2>Input</h2>
        <pre>${Po(i)}</pre>
        <h2>Output</h2>
        <pre>${Po(a)}</pre>
        <p>Time: estimated ${IS(n.estimateSeconds)} \xB7 actual ${IS(n.actualSeconds)} \xB7 ${Po(d)}</p>
        <p>Tokens: estimated ${xS(n.estimateTokens)} \xB7 actual ${xS(n.actualTokens)} \xB7 ${Po(p)}</p>
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
            ${Lh({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${uae}</script>`}
    </section>`}});var bq=l(()=>{"use strict";lq();Aq()});var ja,mae,gae,Pv,_q=l(()=>{"use strict";ja=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mae=(e,t,r)=>{let o=ja(t),n=ja(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},gae=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${ja(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>mae(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${ja(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${ja(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${ja(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},Pv=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(gae).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var kq=l(()=>{"use strict";_q()});var Wp,wq,Tq,Av,bv,_v,Eq=l(()=>{"use strict";Wp=m(require("node:fs")),wq=m(require("node:path"));_d();Jy();Tq=(e,t,r)=>ia({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,Av=(e,t,r)=>{let o=Tq(e,t,r);if(o===null)return[];if(!Wp.default.existsSync(o))return[];let n=Wp.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},bv=e=>{let t=Tq(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:no(e.entry.prompt),output:no(e.entry.output)};Wp.default.mkdirSync(wq.default.dirname(t),{recursive:!0}),Wp.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},_v=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var fae,yae,Op,WS,kv=l(()=>{"use strict";fae=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),yae=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Op=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=fae(i.assistantOutput),d=c.length>0?`Assistant: ${yae(c,t)}`:null,p=[a,d].filter(g=>g!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},WS=e=>{let t=e.userMessage.trim(),r=Op({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Or,Mp,Ev,hae,Sae,wv,Pae,Rv,OS,Rq,Cq,Aae,Na,Cv,Tv,vq,bae,Lq,Da,MS,jp,_ae,Np,vv,jS,NS,Iq=l(()=>{"use strict";Or=m(require("node:fs")),Mp=m(require("node:path")),Ev=require("node:crypto");kv();hae="writer-sessions",Sae="active-index.json",wv=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Pae=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Rv=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},OS=e=>{let t=Mp.default.join(e.installDir,hae);return Or.default.mkdirSync(t,{recursive:!0}),t},Rq=e=>Mp.default.join(OS(e),Sae),Cq=(e,t)=>Mp.default.join(OS(e),`${t}.canonical.json`),Aae=(e,t)=>Mp.default.join(OS(e),`${t}.continuation.json`),Na=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,Cv=e=>{let t=Rq(e);if(!Or.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Or.default.readFileSync(t,"utf8"));if(!wv(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!wv(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!Pae(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},Tv=(e,t)=>{Or.default.writeFileSync(Rq(e),JSON.stringify(t,null,2))},vq=(e,t)=>{Or.default.writeFileSync(Cq(e,t.sessionId),JSON.stringify(t,null,2))},bae=(e,t)=>{Or.default.writeFileSync(Aae(e,t.sessionId),JSON.stringify(t,null,2))},Lq=(e,t)=>{let r=Op({turns:t.turns});bae(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Da=(e,t)=>{let r=Cq(e,t);if(!Or.default.existsSync(r))return null;try{let o=JSON.parse(Or.default.readFileSync(r,"utf8"));return!wv(o)||typeof o.sessionId!="string"?null:o}catch{return null}},MS=(e,t=20)=>{let r=OS(e),o=Or.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Da(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},jp=(e,t,r)=>{let o=Rv(r);return Cv(e).entries.find(i=>Na(i)===Na({writerAgent:t,projectFolderPath:o}))?.sessionId??null},_ae=(e,t,r,o)=>{let n=Cv(e),s=Na({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>Na(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];Tv(e,{entries:i})},Np=(e,t,r)=>{let o=(0,Ev.randomUUID)(),n=new Date().toISOString(),s=Rv(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return vq(e,i),Lq(e,i),_ae(e,t,s,o),o},vv=(e,t,r)=>{let o=jp(e,t,r);return o!==null?o:Np(e,t,r)},jS=(e,t,r)=>{let o=Rv(r),n=Cv(e);if(o===null&&r===void 0){Tv(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=Na({writerAgent:t,projectFolderPath:o});Tv(e,{entries:n.entries.filter(i=>Na(i)!==s)})},NS=e=>{let t=vv(e.layout,e.writerAgent,e.projectFolderPath),r=Da(e.layout,t);if(r===null)return;let o={id:(0,Ev.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};vq(e.layout,n),Lq(e.layout,n)}});var kae,wae,DS,Lv,xq=l(()=>{"use strict";kae=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",wae=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},DS=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",Lv=e=>{let t=DS(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=kae(r,e.userPromptCharacterCount),n=wae({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var HS=l(()=>{"use strict";Eq();Iq();kv();xq()});var Wq=l(()=>{"use strict";Jg();xi();Y_()});var Oq=l(()=>{"use strict";w_()});var gt,Eae,Rae,Iv,xv,Wv,Mq=l(()=>{"use strict";Wq();Oq();gt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Eae=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},Rae=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=_c(o);return`value="${gt(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${gt(r)}"`},Iv=(e,t,r,o,n)=>{let s=Yg[t];return`<label class="field">
          <span class="field-label">${gt(o)} API key \u2014 ${gt(Eae(e,t))} \xB7 <a class="field-link" href="${gt(s.href)}" target="_blank" rel="noopener noreferrer">${gt(s.label)}</a></span>
          <input class="input mono" type="password" name="${gt(r)}" autocomplete="off" ${Rae(e,t,n)} />
        </label>`},xv=(e,t,r,o)=>{let n=zg(e[t]?.model),s=new Set(Fg[t].map(c=>c.value)),i=Fg[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${gt(c.value)}"${d}>${gt(c.label)}</option>`}).join(""),a=n!==Kn&&!s.has(n)?`<option value="${gt(n)}" selected>${gt(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${gt(o)}</span>
          <select class="input mono" name="${gt(r)}">${i}${a}</select>
        </label>`},Wv=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${gt(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${Iv(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${xv(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${Iv(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${xv(e.secrets,"openai","openaiModel","OpenAI model")}
        ${Iv(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${xv(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var jq=l(()=>{"use strict";Mq()});var FS,Nq,Dq=l(()=>{"use strict";FS=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Nq=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${FS(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${FS(s.name)}</strong> <span class="muted mono">(${FS(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${FS(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var Cae,Hq,Fq,zq=l(()=>{"use strict";Cae=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,Hq=e=>e.kind==="folder",Fq=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&Hq(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(Hq(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(Cae)};return r(t)}});var $q,Ov,Uq=l(()=>{"use strict";$q=m(require("node:path")),Ov=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Ov(r.children,t)}</ul>
            </details>
          </li>`;let o=$q.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var Bq,dn,vae,Lae,Dp,Iae,Mv,Gq=l(()=>{"use strict";eh();Bq=m(require("node:path"));Dq();zq();Uq();dn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vae=()=>`(() => {
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

})();`,Lae=()=>`(() => {
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
})();`,Dp=e=>{let t=Rd({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=Nq({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${dn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${dn(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':Iae(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${dn(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${dn(s)}" />
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
    <script>${vae()}</script>
    <script>${Lae()}</script>`;return`${t}${r}${o}${c}${d}`},Iae=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=Fq(a.items.map(f=>({...f,relativePath:typeof f.relativePath=="string"&&f.relativePath.length>0?f.relativePath:Bq.default.relative(a.sourceRoot,f.sourcePath).replaceAll("\\","/")}))),p=Ov(d,dn),g=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${dn(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${dn(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${g} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${dn(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},Mv=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??p??a,f=t.sets[i];if(f===void 0)continue;let y=a.length>0?a:f.proposedSlug,P=g.length>0?g:f.proposedName,h=r.has(i),u=f.items.map(S=>({id:S.id,kind:S.kind,title:S.title,sourcePath:S.sourcePath,include:h}));s.push({slug:y,name:P,items:u})}return s}});var Vq=l(()=>{"use strict";Gq()});var xae,jv,Kq=l(()=>{"use strict";xt();xae=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},jv=xae});var Wae,qq,Jq=l(()=>{"use strict";xt();Wae=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},qq=Wae});var Yq,Oae,Xq,Zq=l(()=>{"use strict";Yq={saved:{message:"Pitfall saved.",error:null},retired:{message:"Pitfall retired. Turn on Show retired to see it again.",error:null},restored:{message:"Pitfall is active again.",error:null},invalid:{message:null,error:"Add a title, why it happens, and a fix. Keep them short, then save again."},limit:{message:null,error:"This project has 64 active pitfalls. Retire one, then try again."},missing:{message:null,error:"That pitfall is gone. Reload the page and try again."},rejected:{message:null,error:"Agent Witch Cloud did not accept this change. Check the fields and try again."},unavailable:{message:null,error:"Could not reach Agent Witch Cloud. Check this Mac on Status, then try again."}},Oae=e=>e!==null&&Object.prototype.hasOwnProperty.call(Yq,e)?Yq[e]:null,Xq=Oae});var Qq=l(()=>{"use strict"});var Os,Mae,Nv,eJ=l(()=>{"use strict";eh();cw();Os=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Mae=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,Nv=e=>{let t=e.flashError?`<div class="alert-error">${Os(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Os(e.flashMessage)}</div>`:"",r=Rd({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Os(Mae(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,p=`<a class="btn btn-secondary btn-compact" href="${Os(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,g=Hf(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
                  <input type="hidden" name="projectId" value="${Os(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Os(n.name)}</strong>
                  <span class="muted mono">${Os(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${p}${g}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then pull playbooks into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var tJ=l(()=>{"use strict";Qq();Uf();eJ()});var zS,rJ=l(()=>{"use strict";zS=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var oJ,lr,Dv=l(()=>{"use strict";oJ=m(require("node:path"));Lt();He();G();ee();Jk();lr=e=>{let t=z()?.layout.installDir??C();if(oJ.default.basename(t)===pr)return bt;let r=z(),o=r!==null?ze(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):bt}});var Hv,nJ=l(()=>{"use strict";Sr();Dv();Hv=async e=>{let t=Fe(e.installDir),r=t?.bundleVersion??null,o=lr(t);try{let n=await Ti(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Dn(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var Fv,sJ=l(()=>{"use strict";Fv=e=>!e});var zv,Ha,$v=l(()=>{"use strict";G();zv=()=>`http://127.0.0.1:${li()}/update/run`,Ha=async e=>{try{let t=await fetch(zv(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var jae,iJ,Uv,aJ=l(()=>{"use strict";G();ae();$v();jae=()=>{$r({launchAgentLabel:fe(),installDir:C()})},iJ=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Uv=async()=>{jae();let e=await Ha({force:!0});if(e.ok)return{ok:!0,message:iJ(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:iJ(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Sr(),fj)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var Bv=l(()=>{"use strict";DE();rJ();Dv();nJ();sJ();aJ();$v()});var lJ,cJ=l(()=>{"use strict";lJ=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var dJ,pJ,Gv,Vv,uJ=l(()=>{"use strict";dJ=require("node:crypto"),pJ=m(require("node:fs"));Wt();ee();ee();cJ();Gv=!1,Vv=async e=>{if(Gv)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!lJ(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=z();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=V({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&pJ.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,dJ.randomUUID)();Gv=!0;try{if(await Yk(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Oi({...r,workspace:n},e.writerAgent,t);return await Bc(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Gv=!1}}});var mJ=l(()=>{"use strict";uJ()});var Hp,Kv=l(()=>{"use strict";Hp=e=>{if(typeof e!="string")return!1;let t=e.trim();return t.length===0||t.startsWith(".")||t.includes("/")||t.includes("\\")||t.includes("..")?!1:t===e}});var cr,Ee,pn,Ms,gJ,un,Re,$S,US,fJ,BS,GS,VS,qv,oe=l(()=>{"use strict";cr="history",Ee="skills",pn="_drafts",Ms="_tombstones",gJ="state.json",un="meta.json",Re="skillgen",$S="episodes.json",US="budget.json",fJ="metrics.jsonl",BS="SKILL.md",GS="meta.json",VS="learned-pitfalls.json",qv="flags.json"});var js,hJ,ft,Ce,Nt=l(()=>{"use strict";js=m(require("node:fs")),hJ=m(require("node:path"));oe();ft=e=>{js.default.mkdirSync(e,{recursive:!0,mode:448});try{js.default.chmodSync(e,448)}catch{}},Ce=(e,t)=>{ft(hJ.default.dirname(e));let r=`${e}.${process.pid}.${Date.now()}.tmp`;js.default.writeFileSync(r,t,{mode:384});try{js.default.chmodSync(r,384)}catch{}js.default.renameSync(r,e);try{js.default.chmodSync(e,384)}catch{}}});var Ns,X,ge,ne=l(()=>{"use strict";Ns=m(require("node:path"));G();Kv();Nt();oe();X=e=>{if(!Hp(e))throw new Error("invalid_project_id");let t=N();return Ns.default.join(t.projectDataDir,e)},ge=e=>{let t=X(e);ft(t),ft(Ns.default.join(t,cr));let r=Ns.default.join(t,Ee);return ft(r),ft(Ns.default.join(r,pn)),ft(Ns.default.join(r,Ms)),ft(Ns.default.join(t,Re)),t}});var Jv,Yv,KS=l(()=>{"use strict";Jv=/^[a-z0-9][a-z0-9_-]{0,63}$/,Yv="sha256:"});var SJ,ot,Fp=l(()=>{"use strict";SJ=require("node:crypto");KS();ot=e=>`${Yv}${(0,SJ.createHash)("sha256").update(Buffer.from(e,"utf8")).digest("hex")}`});var Ds,zp=l(()=>{"use strict";KS();Ds=e=>Jv.test(e)});var $p,qS=l(()=>{"use strict";$p=e=>e.onPublishedSet?e.localContentHash===e.expectedHash?"skip":"fetch_write":"remove"});var Xv,Zv=l(()=>{"use strict";Xv=async e=>{try{return await e.port.isHistoryEnabled(e.projectId)===!0}catch{return!1}}});var Qv,eL=l(()=>{"use strict";zp();Qv=async e=>{try{return(await e.port.listProjectSkillIds({projectId:e.projectId})).filter(r=>Ds(r.skillId))}catch{return[]}}});var tL,rL=l(()=>{"use strict";tL=async e=>{try{let t=await e.awc.listPublished(e.projectId);return Array.isArray(t)?{ok:!0,published:t}:{ok:!1}}catch{return{ok:!1}}}});var oL,nL=l(()=>{"use strict";Fp();oL=async e=>{try{let t=await e.port.readProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version});return t===null?null:ot(t.body)===t.contentHash?t:null}catch{return null}}});var sL,iL=l(()=>{"use strict";Fp();zp();sL=async e=>{if(!Ds(e.skillId))return{ok:!1,code:"unavailable"};let t=ot(e.body);try{let r=await e.port.writeProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version,body:e.body});return r.contentHash===t?{ok:!0,path:r.path,contentHash:r.contentHash}:{ok:!1,code:"hash_mismatch"}}catch{return{ok:!1,code:"unavailable"}}}});var aL,lL=l(()=>{"use strict";zp();aL=async e=>{if(!Ds(e.skillId))throw new Error("invalid_project_skill_id");return e.port.tombstoneProjectSkill({projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}})}});var cL,dL=l(()=>{"use strict";Fp();qS();nL();iL();cL=async e=>{let{meta:t,projectId:r}=e,o={skillId:t.skillId,version:t.publishedVersion},n=await oL({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion});if($p({onPublishedSet:!0,expectedHash:t.contentHash,localContentHash:n?.contentHash??null})==="skip")return{...o,action:"skipped"};let i=await e.awc.getPublishedBody({projectId:r,skillId:t.skillId,version:t.publishedVersion,skillRowId:t.skillRowId});if(i===null)return{...o,action:"missing_awc"};if(i.contentHash!==t.contentHash||ot(i.body)!==t.contentHash)return{...o,action:"hash_mismatch"};let a=await sL({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion,body:i.body});return a.ok?a.contentHash===t.contentHash?{...o,action:"mirrored"}:{...o,action:"hash_mismatch"}:{...o,action:a.code==="hash_mismatch"?"hash_mismatch":"unavailable"}}});var pL,uL=l(()=>{"use strict";qS();lL();pL=async e=>$p({onPublishedSet:!1})!=="remove"?{skillId:e.skillId,version:0,action:"unavailable"}:(await aL({port:e.port,projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}}),{skillId:e.skillId,version:0,action:"removed"})});var Up,JS,PJ=l(()=>{"use strict";Zv();eL();rL();dL();uL();Up="[project-skill-pull-mirror]",JS=async e=>{let t=e.deps.history,r=e.deps.awcPublished;try{if(!await Xv({port:t,projectId:e.projectId}))return{ok:!0,skipped:!0,skills:[]};let n=await tL({awc:r,projectId:e.projectId});if(!n.ok)return console.warn(Up,"list_failed",e.projectId),{ok:!1,skipped:!1,skills:[]};let s=new Set(n.published.map(d=>d.skillId)),i=[];for(let d of n.published)try{i.push(await cL({projectId:e.projectId,meta:d,port:t,awc:r}))}catch(p){console.warn(Up,"skill_failed",d.skillId,p),i.push({skillId:d.skillId,version:d.publishedVersion,action:"unavailable"})}let a=await Qv({port:t,projectId:e.projectId});for(let d of a)if(!s.has(d.skillId))try{i.push(await pL({projectId:e.projectId,skillId:d.skillId,lastContentHash:d.contentHash,port:t}))}catch(p){console.warn(Up,"orphan_tombstone_failed",d.skillId,p),i.push({skillId:d.skillId,version:0,action:"unavailable"})}let c=i.some(d=>d.action==="unavailable"||d.action==="hash_mismatch"||d.action==="missing_awc");return c&&console.warn(Up,"partial_failure",e.projectId,i),{ok:!c,skipped:!1,skills:i}}catch(o){return console.warn(Up,"tick_failed",e.projectId,o),{ok:!1,skipped:!1,skills:[]}}}});var Hs=l(()=>{"use strict";KS();Fp();zp();qS();Zv();eL();rL();nL();iL();lL();dL();uL();PJ()});var Fs,Bp,Nae,Dae,gL,fL=l(()=>{"use strict";Fs=m(require("node:fs")),Bp=m(require("node:path"));Nt();Hs();oe();ne();Nae=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),Dae=e=>`v${String(e).padStart(4,"0")}.md`,gL=e=>{if(!Nae(e.skillId))throw new Error("invalid_project_skill_id");if(!Number.isInteger(e.version)||e.version<1)throw new Error("invalid_project_skill_version");let t=ge(e.projectId),r=Bp.default.join(t,Ee,e.skillId),o=Bp.default.join(r,Dae(e.version)),n=Bp.default.join(r,un),s=ot(e.body);if(Fs.default.existsSync(o)&&Fs.default.existsSync(n))try{let a=JSON.parse(Fs.default.readFileSync(n,"utf8"));if(a.version===e.version&&a.contentHash===s&&Fs.default.readFileSync(o,"utf8")===e.body)return{path:o,contentHash:s}}catch{}Ce(o,e.body),Ce(n,`${JSON.stringify({skillId:e.skillId,version:e.version,contentHash:s,updatedAt:new Date().toISOString()})}
`);let i=Bp.default.join(t,Ee,Ms,`${e.skillId}.json`);return Fs.default.existsSync(i)&&Fs.default.unlinkSync(i),{path:o,contentHash:s}}});var Gp,YS,yL,hL=l(()=>{"use strict";Gp=m(require("node:fs")),YS=m(require("node:path"));Hs();oe();ne();yL=e=>{if(e.skillId.length===0||e.skillId.startsWith("_")||e.skillId.includes("/")||e.skillId.includes("\\"))return null;let t;try{t=X(e.projectId)}catch{return null}let r=YS.default.join(t,Ee,e.skillId),o=YS.default.join(r,`v${String(e.version).padStart(4,"0")}.md`),n=YS.default.join(r,un);if(!Gp.default.existsSync(o)||!Gp.default.existsSync(n))return null;try{let s=Gp.default.readFileSync(o,"utf8"),i=JSON.parse(Gp.default.readFileSync(n,"utf8")),a=typeof i.contentHash=="string"?i.contentHash:null;return a===null||i.version!==e.version||ot(s)!==a?null:{body:s,contentHash:a}}catch{return null}}});var Ao,mn,AJ,Hae,SL,PL,AL=l(()=>{"use strict";Ao=m(require("node:fs")),mn=m(require("node:path"));Nt();oe();ne();AJ=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),Hae=(e,t)=>{if(!Ao.default.existsSync(e))return;let r=`.${t}.`;for(let o of Ao.default.readdirSync(e)){if(!o.startsWith(r))continue;let n=mn.default.join(e,o);try{Ao.default.rmSync(n,{recursive:!0,force:!0})}catch{}}},SL=e=>{if(!AJ(e.skillId))throw new Error("invalid_project_skill_id");let t=ge(e.projectId),r=mn.default.join(t,Ee),o=mn.default.join(r,e.skillId),n=!1;if(Ao.default.existsSync(o)){let c=mn.default.join(r,`.${e.skillId}.${process.pid}.${Date.now()}`);try{Ao.default.renameSync(o,c),Ao.default.rmSync(c,{recursive:!0,force:!0}),n=!0}catch{}}Hae(r,e.skillId);let s=mn.default.join(r,Ms);ft(s);let i=mn.default.join(s,`${e.skillId}.json`),a={skillId:e.skillId,revokedAt:e.revokedAt??new Date().toISOString(),lastContentHash:e.lastContentHash};return Ce(i,`${JSON.stringify(a)}
`),{removed:n}},PL=e=>{if(!AJ(e.skillId))return null;let t;try{t=X(e.projectId)}catch{return null}let r=mn.default.join(t,Ee,Ms,`${e.skillId}.json`);if(!Ao.default.existsSync(r))return null;try{let o=JSON.parse(Ao.default.readFileSync(r,"utf8"));if(typeof o!="object"||o===null||typeof o.skillId!="string"||typeof o.revokedAt!="string"||typeof o.lastContentHash!="string")return null;let n=o;return{skillId:n.skillId,revokedAt:n.revokedAt,lastContentHash:n.lastContentHash}}catch{return null}}});var Vp,bL,_L,kL=l(()=>{"use strict";Vp=m(require("node:fs")),bL=m(require("node:path"));oe();ne();_L=e=>{let t;try{t=X(e.projectId)}catch{return[]}let r=bL.default.join(t,Ee);if(!Vp.default.existsSync(r))return[];let o=[];for(let n of Vp.default.readdirSync(r)){if(n.startsWith("_")||n.startsWith("."))continue;let s=bL.default.join(r,n,un);if(Vp.default.existsSync(s))try{let i=JSON.parse(Vp.default.readFileSync(s,"utf8"));if(typeof i.contentHash!="string")continue;o.push({skillId:n,contentHash:i.contentHash})}catch{continue}}return o}});var wL,bJ,TL,EL=l(()=>{"use strict";wL=m(require("node:fs")),bJ=m(require("node:path"));Nt();oe();ne();TL=e=>{let t=e.messageId.trim();if(t.length===0||t.includes("/")||t.includes("\\")||t.includes(".."))throw new Error("invalid_message_id");let r=ge(e.projectId),o=bJ.default.join(r,cr,`${t}.json`);if(wL.default.existsSync(o))try{let s=JSON.parse(wL.default.readFileSync(o,"utf8"));if(s.messageId===t)return s}catch{}let n={messageId:t,projectId:e.projectId,message:e.message,savedAt:new Date().toISOString()};return Ce(o,`${JSON.stringify(n)}
`),n}});var Kp,_J,kJ,za,XS,RL,$a=l(()=>{"use strict";Kp=m(require("node:fs")),_J=m(require("node:path"));Nt();oe();ne();G();kJ=e=>_J.default.join(X(e),cr,gJ),za=e=>{try{let t=kJ(e);if(!Kp.default.existsSync(t))return null;let r=JSON.parse(Kp.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null||typeof r.state!="string"||typeof r.updatedAt!="string")return null;let o=r.state;return o!=="on_ready"&&o!=="degraded"&&o!=="on_configuring"&&o!=="off"?null:{state:o,updatedAt:r.updatedAt}}catch{return null}},XS=e=>{ge(e.projectId);let t={state:e.state,updatedAt:new Date().toISOString()};return Ce(kJ(e.projectId),`${JSON.stringify(t)}
`),t},RL=()=>{let t=N().projectDataDir;if(!Kp.default.existsSync(t))return[];let r=[];for(let o of Kp.default.readdirSync(t)){if(!Hp(o))continue;let n=za(o);n!==null&&(n.state==="on_ready"||n.state==="degraded")&&r.push(o)}return r}});var wJ,TJ=l(()=>{"use strict";xt();wJ=async e=>{let t=await fetch(`${e.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(e.projectId)}/computer-history/acks`,{method:"POST",headers:{[le]:e.cloudApi.pairingToken,"Content-Type":"application/json"},body:JSON.stringify({messageId:e.messageId}),signal:AbortSignal.timeout(3e4)});return{ok:t.ok,status:t.status}}});var qp,EJ,Fae,CL,RJ=l(()=>{"use strict";Yr();ee();$a();TJ();EL();qp="[project-history-dispatch]",EJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Fae=()=>{let e=z();return e===null?null:V({wsUrl:e.wsUrl,pairingToken:e.pairingToken})},CL=async e=>{if(!EJ(e.payload))return{ok:!1,reason:"invalid_payload"};let t=typeof e.payload.projectId=="string"?e.payload.projectId.trim():"",r=e.payload.message;if(t.length===0||!EJ(r))return{ok:!1,reason:"invalid_payload"};let o=typeof r.messageId=="string"?r.messageId.trim():"";if(o.length===0)return{ok:!1,reason:"missing_message_id"};try{TL({projectId:t,messageId:o,message:r}),XS({projectId:t,state:"on_ready"})}catch(s){console.error(qp,"write_failed",t,o,s);try{XS({projectId:t,state:"degraded"})}catch(i){console.error(qp,"degraded_mark_failed",t,i)}return{ok:!1,reason:"write_failed"}}let n=e.cloudApi===void 0?Fae():e.cloudApi;if(n===null)return console.error(qp,"ack_skipped_no_cloud_api",t,o),{ok:!0,messageId:o,acked:!1};try{let s=await wJ({cloudApi:n,projectId:t,messageId:o});return s.ok?{ok:!0,messageId:o,acked:!0}:(console.error(qp,"ack_http_failed",t,o,s.status),{ok:!0,messageId:o,acked:!1})}catch(s){return console.error(qp,"ack_failed",t,o,s),{ok:!0,messageId:o,acked:!1}}}});var nt=l(()=>{"use strict"});var vL,LL=l(()=>{"use strict";kL();$a();hL();ne();AL();fL();vL=()=>({isHistoryEnabled:e=>{let t=za(e);return t?.state==="on_ready"||t?.state==="degraded"},resolveProjectDataDir:e=>X(e),writeProjectSkillVersion:e=>gL(e),readProjectSkillVersion:e=>yL(e),tombstoneProjectSkill:e=>SL(e),readProjectSkillTombstone:e=>PL(e),listProjectSkillIds:e=>_L(e)})});var CJ,IL,xL=l(()=>{"use strict";xt();CJ=e=>({[le]:e,Accept:"application/json"}),IL=e=>({listPublished:async t=>{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/skills/published`,{method:"GET",headers:CJ(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(!r.ok)throw new Error(`listPublished http ${r.status}`);let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0||!Array.isArray(o.skills))throw new Error("listPublished malformed body");return o.skills.map((s,i)=>{if(typeof s!="object"||s===null||typeof s.skillId!="string"||typeof s.publishedVersion!="number"||typeof s.contentHash!="string")throw new Error(`listPublished row ${i} missing version/contentHash`);let a=s;return{skillId:a.skillId,publishedVersion:a.publishedVersion,contentHash:a.contentHash,...typeof a.skillRowId=="string"?{skillRowId:a.skillRowId}:{}}})},getPublishedBody:async t=>{let r=new URL(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t.projectId)}/skills/published/${encodeURIComponent(t.skillId)}`);r.searchParams.set("version",String(t.version));let o=await fetch(r.toString(),{method:"GET",headers:CJ(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(o.status===404)return null;if(!o.ok)throw new Error(`getPublishedBody http ${o.status}`);let n=await o.json();if(typeof n!="object"||n===null||n.ok!==!0||typeof n.body!="string"||typeof n.contentHash!="string")throw new Error("getPublishedBody malformed body");return{body:n.body,contentHash:n.contentHash}}})});var WL,OL=l(()=>{"use strict";nt();WL=e=>{let t=e.runCap??3e4,r=e.dayCap??1e5,o=Math.max(0,e.tokensUsedToday),n=Math.max(0,r-o),s=Math.max(0,e.estimatedRunTokens??0);return n<=0?{ok:!1,reason:"day_cap",remainingToday:0}:s>t?{ok:!1,reason:"run_cap",remainingToday:n}:s>n?{ok:!1,reason:"day_cap",remainingToday:n}:{ok:!0,remainingToday:n,runCap:Math.min(t,n)}}});var ML,jL=l(()=>{"use strict";nt();ML=e=>{let t=e.messageCountCap??20,r=e.idleMs??18e5,o=e.maxIntervalMs??864e5,n=e.messages;if(n.length===0)return{ready:!1,reason:"empty"};let s=Math.max(...n.map(p=>p.createdAtMs)),i=n.length>=t,a=e.nowMs-s>=r,c=e.lastClosedAtMs===null||e.nowMs-e.lastClosedAtMs>=o;return!i&&!a&&!c?{ready:!1,reason:"below_triggers"}:{ready:!0,reason:i?"count":a?"idle":"max_interval",messageIds:n.map(p=>p.messageId)}}});var ZS,NL=l(()=>{"use strict";nt();ZS=e=>{let t=e.maxOpenDrafts??20,r=Math.max(0,e.openDraftCount),o=r>=t;return{draftWaitingCount:r,capReached:o,miningPaused:o}}});var MJ,jJ,$ae,QS,DL=l(()=>{"use strict";nt();MJ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),jJ=e=>e.trim().toLowerCase().replace(/\s+/g," "),$ae=(e,t)=>{let r=new Set(e.map(jJ).filter(i=>i.length>0)),o=new Set(t.map(jJ).filter(i=>i.length>0));if(r.size===0||o.size===0)return 0;let n=0;for(let i of r)o.has(i)&&(n+=1);let s=r.size+o.size-n;return s===0?0:n/s},QS=e=>{let t=e.nearDupJaccard??.6,r=MJ(e.name);for(let o of e.existingPublished)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"published",matchId:o.id};for(let o of e.existingDrafts)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"draft",matchId:o.id};for(let o of e.existingDrafts){if(MJ(o.name)===r&&r.length>0)return{action:"update_draft",draftId:o.id,reason:"same_name"};if($ae(e.stepLines,o.stepLines)>=t)return{action:"update_draft",draftId:o.id,reason:"similar_steps"}}return{action:"create_new"}}});var HL,FL=l(()=>{"use strict";HL=e=>e.estimatedInputTokens>e.inputTokenCap?"reflect_then_write":"write"});var zL,Bae,$L,Gae,UL,BL=l(()=>{"use strict";nt();zL=e=>{let t=e.minMessages??3,r=Math.max(0,e.messageCount);return e.ownerMarkedSaveAsSkill?r<1?{ok:!1,reason:"too_short"}:{ok:!0,reason:"owner_mark"}:r<t?{ok:!1,reason:"too_short"}:e.hasSuccessSignal?{ok:!0,reason:"success_signal"}:{ok:!1,reason:"no_success_signal"}},Bae=/\b(done|landed|tests?\s+green|thumbs?\s*-?\s*up|all\s+tests?\s+pass(?:ed)?|shipped)\b/i,$L=e=>Bae.test(e),Gae=/\b(save\s+as\s+skill|mark\s+as\s+skill|promote\s+to\s+skill)\b/i,UL=e=>Gae.test(e)});var Jp,eP=l(()=>{"use strict";Jp=e=>({at:e.nowIso??new Date().toISOString(),projectId:e.projectId,episodeId:e.episodeId,fromState:e.fromState,toState:e.toState,reason:e.reason??null,tokensUsed:Math.max(0,e.tokensUsed??0),openDraftCount:Math.max(0,e.openDraftCount??0)})});var Vae,NJ,Ua,DJ,Yp=l(()=>{"use strict";Vae=[{pattern:/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----/g,replacement:"[redacted-private-key]"},{pattern:/\bsk-[a-zA-Z0-9]{20,}\b/g,replacement:"[redacted-secret]"},{pattern:/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/g,replacement:"[redacted-secret]"},{pattern:/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g,replacement:"[redacted-secret]"},{pattern:/\bAKIA[0-9A-Z]{16}\b/g,replacement:"[redacted-secret]"},{pattern:/\bBearer\s+[A-Za-z0-9\-._~+/]+=*\b/gi,replacement:"Bearer [redacted-secret]"},{pattern:/\b(?:api[_-]?key|secret|token|password|passwd|credential)\s*[:=]\s*["']?[^\s"'\\]{8,}["']?/gi,replacement:"[redacted-secret]"},{pattern:/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,replacement:"[redacted-email]"}],NJ=[/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----/,/\bsk-[a-zA-Z0-9]{20,}\b/,/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/,/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/,/\bAKIA[0-9A-Z]{16}\b/,/\bBearer\s+[A-Za-z0-9\-._~+/]{12,}/i],Ua=e=>{let t=e,r=0;for(let n of Vae)t=t.replace(n.pattern,()=>(r+=1,n.replacement));let o=NJ.some(n=>n.test(t));return{scrubbed:t,residualSecret:o,replacementCount:r}},DJ=e=>NJ.some(t=>t.test(e))});var GL,VL,KL,Xp=l(()=>{"use strict";GL=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE","AWAITING_REVIEW","PUBLISHED","SKIPPED_COST","SKIPPED_FILTER","SKIPPED_DEDUP","QUARANTINED","FAILED_EXTRACT","FAILED_VALIDATE","REJECTED"],VL={CAPTURING:{episode_closed:"EPISODE_READY"},EPISODE_READY:{budget_ok:"SCRUBBING",budget_exceeded:"SKIPPED_COST",draft_cap_reached:"EPISODE_READY"},SCRUBBING:{scrub_ok:"TRIAGE",scrub_quarantine:"QUARANTINED"},TRIAGE:{qualify_ok:"DEDUP",qualify_reject:"SKIPPED_FILTER"},DEDUP:{dedup_novel:"EXTRACT",dedup_merge:"EXTRACT",dedup_skip:"SKIPPED_DEDUP"},EXTRACT:{extract_ok:"VALIDATE",extract_fail:"FAILED_EXTRACT"},VALIDATE:{validate_ok:"AWAITING_REVIEW",validate_retry:"EXTRACT",validate_fail:"FAILED_VALIDATE"},AWAITING_REVIEW:{owner_publish:"PUBLISHED",owner_discard:"REJECTED"},PUBLISHED:{},SKIPPED_COST:{},SKIPPED_FILTER:{},SKIPPED_DEDUP:{},QUARANTINED:{},FAILED_EXTRACT:{},FAILED_VALIDATE:{},REJECTED:{}},KL=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE"]});var qL,JL=l(()=>{"use strict";Xp();qL=(e,t)=>{let r=VL[e][t];return r===void 0?{ok:!1,from:e,event:t}:{ok:!0,state:r}}});var Kae,Mr,XL=l(()=>{"use strict";JL();nt();Kae=(e,t)=>{switch(t.kind){case"close":return e==="CAPTURING"&&t.ready?"episode_closed":null;case"draft_cap":return e==="EPISODE_READY"&&t.reached?"draft_cap_reached":null;case"budget":return e!=="EPISODE_READY"?null:t.ok?"budget_ok":"budget_exceeded";case"scrub":return e!=="SCRUBBING"?null:t.residualSecret?"scrub_quarantine":"scrub_ok";case"qualify":return e!=="TRIAGE"?null:t.ok?"qualify_ok":"qualify_reject";case"dedup":return e!=="DEDUP"?null:t.action==="skip_exact"?"dedup_skip":t.action==="update_draft"||t.action==="create_new"?t.action==="update_draft"?"dedup_merge":"dedup_novel":null;case"extract":return e!=="EXTRACT"?null:t.ok?"extract_ok":"extract_fail";case"validate":return e!=="VALIDATE"?null:t.ok?"validate_ok":t.attempts<=1?"validate_retry":"validate_fail";case"owner":return e!=="AWAITING_REVIEW"?null:t.decision==="publish"?"owner_publish":"owner_discard";default:return t}},Mr=e=>{let t=Kae(e.state,e.verdict);if(t===null)return{ok:!1,reason:e.verdict.kind==="close"&&!e.verdict.ready?"not_ready":"no_transition",state:e.state};let r=qL(e.state,t);return r.ok?{ok:!0,event:t,nextState:r.state}:{ok:!1,reason:"illegal_event",state:e.state,event:t}}});var Yae,HJ,Xae,Zae,ZL,Zp,tP=l(()=>{"use strict";nt();Yp();Yae=/^[a-z0-9][a-z0-9-]{0,63}$/,HJ=e=>{let t=e.replace(/^\uFEFF/,"");if(!t.startsWith("---"))return null;let r=t.indexOf(`
---`,3);if(r<0)return null;let o=t.slice(3,r).replace(/^\r?\n/,""),n=t.slice(r+4).replace(/^\r?\n/,""),s={};for(let i of o.split(/\r?\n/)){let a=i.indexOf(":");if(a<=0)continue;let c=i.slice(0,a).trim(),d=i.slice(a+1).trim().replace(/^["']|["']$/g,"");c.length>0&&(s[c]=d)}return{fm:s,body:n}},Xae=e=>(e.match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??e).match(/^\s*(?:\d+\.|[-*])\s+\S+/gm)?.length??0,Zae=e=>{if(e===void 0||e.trim().length===0)return null;let t=e.trim();if(t.startsWith("["))try{let r=JSON.parse(t.replace(/'/g,'"'));return Array.isArray(r)?r.filter(o=>typeof o=="string"):null}catch{return t.replace(/^\[|\]$/g,"").split(",").map(r=>r.trim().replace(/^["']|["']$/g,"")).filter(r=>r.length>0)}return t.split(",").map(r=>r.trim()).filter(r=>r.length>0)},ZL=e=>{let t=e.minSteps??2,r=e.maxBodyBytes??65536,o=e.skillMarkdown;if(o.trim().length===0)return{ok:!1,reason:"empty"};let n=Buffer.byteLength(o,"utf8");if(n>r)return{ok:!1,reason:"body_too_large"};if(DJ(o))return{ok:!1,reason:"residual_secret"};let s=HJ(o);if(s===null)return{ok:!1,reason:"missing_frontmatter"};let{fm:i,body:a}=s,c=i.name??"";if(!Yae.test(c))return{ok:!1,reason:"invalid_name"};let d=i.description??"";if(d.trim().length===0)return{ok:!1,reason:"missing_description"};let p=i.version??"";if(p.trim().length===0)return{ok:!1,reason:"missing_version"};if((i.status??"").trim()!=="draft")return{ok:!1,reason:"missing_status_draft"};let g=Zae(i.source_message_ids??i.source_message_ids);if(g===null||g.length===0)return{ok:!1,reason:"missing_source_message_ids"};let f=Xae(a);return f<t?{ok:!1,reason:"too_few_steps"}:{ok:!0,name:c,description:d,version:p,sourceMessageIds:g,stepCount:f,bodyBytes:n}},Zp=e=>(((HJ(e)?.body??e).match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??"").match(/^\s*(?:\d+\.|[-*])\s+(.+)$/gm)??[]).map(i=>i.replace(/^\s*(?:\d+\.|[-*])\s+/,"").trim())});var FJ,ele,jr,rP,oP=l(()=>{"use strict";FJ=require("node:crypto");Hs();nt();OL();jL();NL();DL();FL();BL();eP();Yp();XL();tP();ele=e=>Math.ceil(e.length/4),jr=(e,t,r,o={})=>({...e,...o,state:t,reason:r}),rP=async e=>{let t=e.episode,r=[],o=null,n=0,s=null,i=e.deps.estimateTokens??ele,a=e.messages.map(p=>p.text).join(`
`),c=(p,g,f)=>{r.push(Jp({projectId:t.projectId,episodeId:t.episodeId,fromState:p,toState:g,reason:f,tokensUsed:n,openDraftCount:e.deps.openDraftCount(),nowIso:new Date(e.nowMs).toISOString()}))};for(let p=0;p<16;p+=1){let g=ZS({openDraftCount:e.deps.openDraftCount()});if(t.state==="CAPTURING"){let f=ML({messages:e.messages.map(h=>({messageId:h.messageId,createdAtMs:h.createdAtMs})),nowMs:e.nowMs,lastClosedAtMs:e.lastClosedAtMs}),y=Mr({state:t.state,verdict:{kind:"close",ready:f.ready}});if(!y.ok)break;let P=t.state;t=jr(t,y.nextState,f.ready?f.reason:null,{messageIds:f.ready?f.messageIds:t.messageIds,closedAtMs:f.ready?e.nowMs:t.closedAtMs,ownerMarkedSaveAsSkill:e.messages.some(h=>UL(h.text)),hasSuccessSignal:e.messages.some(h=>$L(h.text))}),c(P,t.state,t.reason);continue}if(t.state==="EPISODE_READY"){if(g.capReached){let h=Mr({state:t.state,verdict:{kind:"draft_cap",reached:!0}});h.ok&&(c(t.state,h.nextState,"draft_cap_reached"),t=jr(t,h.nextState,"draft_cap_reached"));break}let f=WL({tokensUsedToday:e.tokensUsedToday+n}),y=Mr({state:t.state,verdict:{kind:"budget",ok:f.ok}});if(!y.ok)break;let P=t.state;t=jr(t,y.nextState,f.ok?"budget_ok":f.reason),c(P,t.state,t.reason);continue}if(t.state==="SCRUBBING"){let f=Ua(a),y=Mr({state:t.state,verdict:{kind:"scrub",residualSecret:f.residualSecret}});if(!y.ok)break;let P=t.state;t=jr(t,y.nextState,f.residualSecret?"scrub_quarantine":"scrub_ok",{scrubbedTranscript:f.scrubbed}),c(P,t.state,t.reason);continue}if(t.state==="TRIAGE"){let f=zL({messageCount:t.messageIds.length,ownerMarkedSaveAsSkill:t.ownerMarkedSaveAsSkill,hasSuccessSignal:t.hasSuccessSignal}),y=Mr({state:t.state,verdict:{kind:"qualify",ok:f.ok}});if(!y.ok)break;let P=t.state;t=jr(t,y.nextState,f.reason),c(P,t.state,t.reason);continue}if(t.state==="DEDUP"){let f=ot(t.scrubbedTranscript??a),y=QS({contentHash:f,name:"",stepLines:[],existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if((y.action==="create_new"||y.action==="update_draft")&&e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let P=Mr({state:t.state,verdict:{kind:"dedup",action:y.action}});if(!P.ok)break;let h=t.state;t=jr(t,P.nextState,y.action,{contentHash:f,mergeDraftId:y.action==="update_draft"?y.draftId:t.mergeDraftId}),c(h,t.state,t.reason);continue}if(t.state==="EXTRACT"){if(e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let f=t.scrubbedTranscript??"",y=HL({estimatedInputTokens:i(f),inputTokenCap:12e3}),P=await e.deps.ownerLlm({scrubbedTranscript:f,similarDraftHints:[],mode:y});n+=P.tokensUsed;let h=Mr({state:t.state,verdict:{kind:"extract",ok:P.ok}});if(!h.ok)break;let u=t.state;P.ok&&(s=P.skillMarkdown),t=jr(t,h.nextState,P.ok?"extract_ok":P.reason,{tokensUsed:t.tokensUsed+P.tokensUsed}),c(u,t.state,t.reason);continue}if(t.state==="VALIDATE"){let f=s??"",y=ZL({skillMarkdown:f}),P=t.validateAttempts+(y.ok?0:1),h=Mr({state:t.state,verdict:{kind:"validate",ok:y.ok,attempts:y.ok?t.validateAttempts:Math.max(1,P)}});if(!h.ok)break;let u=t.state;if(y.ok){let S=ot(f),b=Zp(f),k=QS({contentHash:S,name:y.name,stepLines:b,existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if(k.action==="skip_exact"){t=jr(t,"SKIPPED_DEDUP","skip_exact",{contentHash:S,validateAttempts:P}),c(u,t.state,"skip_exact");break}let A=k.action==="update_draft"?k.draftId:t.mergeDraftId??(0,FJ.randomUUID)();o=e.deps.writeDraft({projectId:t.projectId,draftId:A,skillMarkdown:f,episodeId:t.episodeId,sourceMessageIds:y.sourceMessageIds,name:y.name,description:y.description}),t=jr(t,h.nextState,"validate_ok",{draftId:A,contentHash:o.contentHash,validateAttempts:P}),c(u,t.state,t.reason);break}if(h.nextState==="EXTRACT"&&(s=null),t=jr(t,h.nextState,y.reason,{validateAttempts:P}),c(u,t.state,t.reason),h.nextState==="EXTRACT"&&P>1)break;continue}break}let d=ZS({openDraftCount:e.deps.openDraftCount()});return{episode:t,metrics:r,reviewFlag:d,draftWritten:o,tokensSpent:n}}});var QL,eI,Qp,nP=l(()=>{"use strict";QL=m(require("node:fs")),eI=m(require("node:path"));Nt();oe();ne();Qp=e=>{if(e.events.length===0)return;let t=ge(e.projectId),r=eI.default.join(t,Re);ft(r);let o=eI.default.join(r,fJ),n=`${e.events.map(s=>JSON.stringify(s)).join(`
`)}
`;QL.default.appendFileSync(o,n,{mode:384});try{QL.default.chmodSync(o,384)}catch{}}});var Ba,sP=l(()=>{"use strict";Ba=e=>e.trim().toLowerCase().replace(/\s+/g," ").replace(/[.,;:!?]+$/g,"")});var BJ,zJ,$J,rle,ole,tI,rI=l(()=>{"use strict";BJ=require("node:crypto");nt();sP();Yp();zJ=(e,t)=>e.length<=t?e:`${e.slice(0,Math.max(0,t-1)).trimEnd()}\u2026`,$J=e=>e.toLowerCase().replace(/_/g," "),rle=(e,t)=>`sha256:${(0,BJ.createHash)("sha256").update(`${e}
${t}`,"utf8").digest("hex")}`,ole=(e,t)=>{let r=t.replace(/^sha256:/,"").slice(0,12);return`hist-${e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40)||"ep"}-${r}`.slice(0,64)},tI=e=>{let t=e.maxPerDraft??8,r=e.maxStored??64,o=e.nowIso??new Date().toISOString(),n=new Set,s=[],i=[],a=0;for(let c of e.failures){let d=c.reason!==null&&c.reason.trim().length>0?c.reason.trim():$J(c.state),p=Ua(d);if(p.residualSecret){a+=1;continue}let g=`Avoid repeating this history failure (${$J(c.state)}).`,f=Ua(g);if(f.residualSecret){a+=1;continue}let y=zJ(p.scrubbed.replace(/\s+/g," ").trim(),120),P=zJ(f.scrubbed.replace(/\s+/g," ").trim(),280);if(y.length===0||P.length===0)continue;let h=Ba(`${y}|${P}`);if(n.has(h))continue;n.add(h);let u=rle(y,P),S=`- **${y}:** ${P}`;s.length<t&&s.push(S),i.length<r&&i.push({id:ole(c.episodeId,u),symptom:y,avoidance:P,sourceEpisodeId:c.episodeId,sourceState:c.state,contentHash:u,createdAt:o})}return{skillPitfallLines:s,localEntries:i,skippedSecretCount:a}}});var nle,oI,nI=l(()=>{"use strict";sP();nt();nle=e=>{let t=[];for(let r of e.split(/\r?\n/)){let o=r.trim();/^[-*]\s+\S/.test(o)?t.push(o.replace(/^\*\s+/,"- ")):/^\d+\.\s+\S/.test(o)&&t.push(o.replace(/^\d+\.\s+/,"- "))}return t},oI=e=>{let t=e.maxBullets??8,r=e.skillMarkdown,o=/(^|\n)(##\s*Pitfalls\s*\n)([\s\S]*?)(?=\n##\s+\S|$)/i,n=r.match(o),s=n?nle(n[3]??""):[],i=new Set(s.map(g=>Ba(g))),a=[...s],c=0;for(let g of e.newPitfallLines){let f=g.trim();if(f.length===0)continue;let y=f.startsWith("- ")?f:`- ${f}`,P=Ba(y);if(!i.has(P)){if(a.length>=t)break;i.add(P),a.push(y),c+=1}}let d=a.length>0?`${a.join(`
`)}
`:`(none yet)
`;if(n)return{skillMarkdown:r.replace(o,(f,y,P)=>`${y}${P}${d}`),appendedCount:c,totalPitfallBullets:a.length};let p=r.endsWith(`
`)?"":`
`;return{skillMarkdown:`${r}${p}
## Pitfalls
${d}`,appendedCount:c,totalPitfallBullets:a.length}}});var sI,VJ,GJ,lP,iI,aI=l(()=>{"use strict";sI=m(require("node:fs")),VJ=m(require("node:path"));oe();ne();GJ="[project-history-skillgen]",lP=()=>({items:[],updatedAt:new Date(0).toISOString()}),iI=e=>{let t=VJ.default.join(X(e),Re,VS);if(!sI.default.existsSync(t))return lP();try{let r=JSON.parse(sI.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.items)?(console.error(GJ,"learned_pitfalls_corrupt",e),lP()):{items:r.items,updatedAt:typeof r.updatedAt=="string"?r.updatedAt:lP().updatedAt}}catch(r){return console.error(GJ,"learned_pitfalls_read_failed",e,r),lP()}}});var sle,KJ,qJ=l(()=>{"use strict";sle=["FAILED_EXTRACT","FAILED_VALIDATE","QUARANTINED","SKIPPED_FILTER"],KJ=e=>sle.includes(e)});var lI,cI=l(()=>{"use strict";qJ();lI=e=>{let t=[];for(let r of e.episodes)e.excludeEpisodeId!==void 0&&e.excludeEpisodeId!==null&&r.episodeId===e.excludeEpisodeId||KJ(r.state)&&t.push({episodeId:r.episodeId,state:r.state,reason:r.reason});return t}});var dI,eu,ile,tu,pI,cP=l(()=>{"use strict";dI=m(require("node:fs")),eu=m(require("node:path"));Hs();Nt();oe();ne();ile=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),tu=e=>{if(!ile(e.draftId))throw new Error("invalid_draft_id");let t=ge(e.projectId),r=eu.default.join(t,Ee,pn,e.draftId);ft(r);let o=eu.default.join(r,BS),n=eu.default.join(r,GS),s=ot(e.skillMarkdown);return Ce(o,e.skillMarkdown),Ce(n,`${JSON.stringify({draftId:e.draftId,episodeId:e.episodeId,name:e.name,description:e.description,sourceMessageIds:e.sourceMessageIds,contentHash:s,status:"draft",updatedAt:new Date().toISOString()})}
`),{draftDir:r,skillPath:o,metaPath:n,contentHash:s}},pI=e=>{let t=ge(e),r=eu.default.join(t,Ee,pn);return dI.default.existsSync(r)?dI.default.readdirSync(r,{withFileTypes:!0}).filter(o=>o.isDirectory()&&!o.name.startsWith(".")).length:0}});var JJ,uI,mI=l(()=>{"use strict";JJ=m(require("node:path"));Nt();oe();ne();uI=e=>{let t=ge(e.projectId),r=JJ.default.join(t,Re,VS),o={...e.file,updatedAt:new Date().toISOString()};return Ce(r,`${JSON.stringify(o)}
`),o}});var YJ,gI,fI=l(()=>{"use strict";YJ=m(require("node:path"));Nt();oe();ne();gI=e=>{let t=ge(e.projectId),r=YJ.default.join(t,Re,qv),o={...e.file,updatedAt:new Date().toISOString()};return Ce(r,`${JSON.stringify(o)}
`),o}});var hI,XJ,yI,ale,lle,dP,SI,PI=l(()=>{"use strict";hI=m(require("node:fs")),XJ=m(require("node:path"));nP();rI();nI();nt();aI();eP();cI();cP();mI();fI();yI="[project-history-skillgen]",ale=(e,t)=>{let r=new Map;for(let o of e)r.set(o.contentHash,o);for(let o of t)r.set(o.contentHash,o);return[...r.values()].slice(-64)},lle=e=>{try{let t=JSON.parse(hI.default.readFileSync(e,"utf8"));return{name:typeof t.name=="string"?t.name:"draft",description:typeof t.description=="string"?t.description:"",sourceMessageIds:Array.isArray(t.sourceMessageIds)?t.sourceMessageIds.filter(r=>typeof r=="string"):[]}}catch{return{name:"draft",description:"",sourceMessageIds:[]}}},dP=e=>{try{Qp({projectId:e.projectId,events:[Jp({projectId:e.projectId,episodeId:e.episodeId,fromState:e.state,toState:e.state,reason:e.reason,tokensUsed:0,nowIso:e.nowIso})]})}catch{}},SI=e=>{let t=new Date(e.nowMs).toISOString();try{let r=lI({episodes:e.episodes,excludeEpisodeId:e.successEpisode.episodeId}),o=tI({failures:r,nowIso:t});if(o.skillPitfallLines.length===0&&o.localEntries.length===0)return{appendedCount:0,storedCount:0,ok:!0};let n=0;try{let s=lle(e.draftWritten.metaPath),i=hI.default.readFileSync(e.draftWritten.skillPath,"utf8"),a=oI({skillMarkdown:i,newPitfallLines:o.skillPitfallLines});n=a.appendedCount,a.skillMarkdown!==i&&tu({projectId:e.projectId,draftId:XJ.default.basename(e.draftWritten.draftDir),skillMarkdown:a.skillMarkdown,episodeId:e.successEpisode.episodeId,sourceMessageIds:s.sourceMessageIds,name:s.name,description:s.description})}catch(s){console.error(yI,"pitfalls_draft_merge_failed",e.projectId,s),dP({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_draft_merge_failed",nowIso:t})}try{let s=iI(e.projectId),i=ale(s.items,o.localEntries);return uI({projectId:e.projectId,file:{items:i,updatedAt:t}}),gI({projectId:e.projectId,file:{historyLearnedPitfalls:i.length===0?null:{active:!0,count:i.length,updatedAt:t,summary:`${i.length} recent pitfalls from project history (local)`},updatedAt:t}}),dP({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attached",nowIso:t}),{appendedCount:n,storedCount:i.length,ok:!0}}catch(s){return console.error(yI,"pitfalls_store_failed",e.projectId,s),dP({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_store_failed",nowIso:t}),{appendedCount:n,storedCount:0,ok:!1}}}catch(r){return console.error(yI,"pitfalls_attach_failed",e.projectId,r),dP({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attach_failed",nowIso:t}),{appendedCount:0,storedCount:0,ok:!1}}}});var ru,pP=l(()=>{"use strict";ru=e=>{let t=e.message;for(let r of["summary","text","body","content"]){let o=t[r];if(typeof o=="string"&&o.trim().length>0)return o}return""}});var ZJ,QJ=l(()=>{"use strict";Xp();ZJ=(e,t)=>{for(let r=e.length-1;r>=0;r-=1){let o=e[r];if(o.projectId===t&&KL.includes(o.state))return o}return null}});var AI,bI=l(()=>{"use strict";AI=e=>e==="on_ready"||e==="degraded"||e==="on_configuring"});var _I,e4,cle,kI,wI=l(()=>{"use strict";_I=m(require("node:fs")),e4=m(require("node:path"));oe();ne();cle=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.messageId=="string"&&typeof t.projectId=="string"&&typeof t.savedAt=="string"&&typeof t.message=="object"&&t.message!==null&&!Array.isArray(t.message)},kI=e=>{let t=e.messageId.trim();if(t.length===0||t.includes("/")||t.includes("\\")||t.includes(".."))return null;let r=e4.default.join(X(e.projectId),cr,`${t}.json`);if(!_I.default.existsSync(r))return null;try{let o=JSON.parse(_I.default.readFileSync(r,"utf8"));return cle(o)?o:null}catch{return null}}});var TI,t4,ou,uP=l(()=>{"use strict";TI=m(require("node:fs")),t4=m(require("node:path"));oe();wI();ne();ou=e=>{let t=t4.default.join(X(e),cr);if(!TI.default.existsSync(t))return[];let r=TI.default.readdirSync(t).filter(n=>n.endsWith(".json")&&n!=="state.json").map(n=>n.slice(0,-5)),o=[];for(let n of r){let s=kI({projectId:e,messageId:n});s!==null&&o.push(s)}return o.sort((n,s)=>{let i=Date.parse(n.savedAt),a=Date.parse(s.savedAt);return i!==a?i-a:n.messageId.localeCompare(s.messageId)})}});var zs,mP,r4,o4=l(()=>{"use strict";zs=m(require("node:fs")),mP=m(require("node:path"));oe();ne();tP();r4=e=>{let t=mP.default.join(X(e),Ee,pn);if(!zs.default.existsSync(t))return[];let r=[];for(let o of zs.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("."))continue;let n=mP.default.join(t,o.name,BS),s=mP.default.join(t,o.name,GS);if(zs.default.existsSync(n))try{let i=zs.default.readFileSync(n,"utf8"),a="",c=o.name;if(zs.default.existsSync(s)){let d=JSON.parse(zs.default.readFileSync(s,"utf8"));typeof d.contentHash=="string"&&(a=d.contentHash),typeof d.name=="string"&&d.name.length>0&&(c=d.name)}if(a.length===0)continue;r.push({id:o.name,contentHash:a,name:c,stepLines:Zp(i)})}catch{}}return r}});var nu,EI,n4,s4=l(()=>{"use strict";nu=m(require("node:fs")),EI=m(require("node:path"));oe();ne();n4=e=>{let t=EI.default.join(X(e),Ee);if(!nu.default.existsSync(t))return[];let r=[];for(let o of nu.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("_"))continue;let n=EI.default.join(t,o.name,un);if(nu.default.existsSync(n))try{let s=JSON.parse(nu.default.readFileSync(n,"utf8"));if(typeof s.contentHash!="string")continue;r.push({id:o.name,contentHash:s.contentHash,name:typeof s.skillId=="string"?s.skillId:o.name,stepLines:[]})}catch{}}return r}});var dle,RI,CI=l(()=>{"use strict";pP();uP();dle=(e,t,r,o)=>r===null||e>r?!0:e<r?!1:o===null?!0:t.localeCompare(o)>0,RI=e=>{let t=ou(e.projectId),r=[];for(let o of t){let n=Date.parse(o.savedAt);Number.isNaN(n)||dle(n,o.messageId,e.cursorSavedAtMs,e.cursorMessageId)&&r.push({messageId:o.messageId,createdAtMs:n,text:ru(o)})}return r}});var i4,a4=l(()=>{"use strict";i4=(e,t)=>{let r=e.findIndex(o=>o.episodeId===t.episodeId);return r<0?[...e,t]:e.map((o,n)=>n===r?t:o)}});var l4,vI,LI=l(()=>{"use strict";l4=m(require("node:path"));Nt();oe();ne();vI=e=>{let t=ge(e.projectId),r=l4.default.join(t,Re,US),o={...e.budget,updatedAt:new Date().toISOString()};return Ce(r,`${JSON.stringify(o)}
`),o}});var c4,II,xI=l(()=>{"use strict";c4=m(require("node:path"));Nt();oe();ne();II=e=>{let t=ge(e.projectId),r=c4.default.join(t,Re,$S),o={...e.file,updatedAt:new Date().toISOString()};return Ce(r,`${JSON.stringify(o)}
`),o}});var d4,p4=l(()=>{"use strict";nP();a4();LI();xI();d4=e=>{let{result:t,episodesFile:r,budget:o,projectId:n,nowMs:s}=e,i=r.cursorMessageId,a=r.cursorSavedAtMs;t.episode.state!=="CAPTURING"&&t.episode.messageIds.length>0&&(i=t.episode.messageIds[t.episode.messageIds.length-1],a=t.episode.lastMessageAtMs??a),II({projectId:n,file:{episodes:i4(r.episodes,t.episode),cursorMessageId:i,cursorSavedAtMs:a,updatedAt:new Date(s).toISOString()}}),vI({projectId:n,budget:{dayKey:o.dayKey,tokensUsedToday:o.tokensUsedToday+t.tokensSpent,lastClosedAtMs:t.episode.closedAtMs??o.lastClosedAtMs,updatedAt:new Date(s).toISOString()}}),Qp({projectId:n,events:t.metrics})}});var gP,WI=l(()=>{"use strict";gP=e=>new Date(e).toISOString().slice(0,10)});var fP,u4=l(()=>{"use strict";WI();fP=e=>({dayKey:gP(e),tokensUsedToday:0,lastClosedAtMs:null,updatedAt:new Date(e).toISOString()})});var OI,g4,m4,ple,MI,jI=l(()=>{"use strict";OI=m(require("node:fs")),g4=m(require("node:path"));u4();oe();ne();WI();m4="[project-history-skillgen]",ple=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e;if(typeof r.dayKey!="string"||typeof r.tokensUsedToday!="number"||!(r.lastClosedAtMs===null||typeof r.lastClosedAtMs=="number")||typeof r.updatedAt!="string")return null;let o=gP(t);return r.dayKey!==o?{dayKey:o,tokensUsedToday:0,lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}:{dayKey:r.dayKey,tokensUsedToday:Math.max(0,r.tokensUsedToday),lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}},MI=e=>{let t=g4.default.join(X(e.projectId),Re,US);if(!OI.default.existsSync(t))return fP(e.nowMs);try{let r=JSON.parse(OI.default.readFileSync(t,"utf8")),o=ple(r,e.nowMs);return o===null?(console.error(m4,"budget_corrupt",e.projectId),fP(e.nowMs)):o}catch(r){return console.error(m4,"budget_read_failed",e.projectId,r),fP(e.nowMs)}}});var yP,f4=l(()=>{"use strict";yP=(e=new Date(0).toISOString())=>({episodes:[],cursorMessageId:null,cursorSavedAtMs:null,updatedAt:e})});var NI,h4,y4,ule,mle,gle,DI,HI=l(()=>{"use strict";NI=m(require("node:fs")),h4=m(require("node:path"));f4();Xp();oe();ne();y4="[project-history-skillgen]",ule=e=>typeof e=="string"&&GL.includes(e),mle=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.episodeId=="string"&&typeof t.projectId=="string"&&ule(t.state)&&Array.isArray(t.messageIds)&&typeof t.startedAtMs=="number"&&typeof t.lastMessageAtMs=="number"},gle=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(!Array.isArray(t.episodes))return null;let r=t.episodes.filter(mle);if(r.length!==t.episodes.length||typeof t.updatedAt!="string")return null;let o=t.cursorMessageId===null||typeof t.cursorMessageId=="string"?t.cursorMessageId:null,n=t.cursorSavedAtMs===null||typeof t.cursorSavedAtMs=="number"?t.cursorSavedAtMs:null;return{episodes:r,cursorMessageId:o,cursorSavedAtMs:n,updatedAt:t.updatedAt}},DI=e=>{let t=h4.default.join(X(e),Re,$S);if(!NI.default.existsSync(t))return yP();try{let r=JSON.parse(NI.default.readFileSync(t,"utf8")),o=gle(r);return o===null?(console.error(y4,"episodes_corrupt",e),yP()):o}catch(r){return console.error(y4,"episodes_read_failed",e,r),yP()}}});var S4,fle,yle,FI,zI=l(()=>{"use strict";S4=require("node:crypto");oP();PI();pP();QJ();bI();uP();o4();s4();CI();$a();p4();jI();HI();cP();fle="[project-history-skillgen]",yle=(e,t)=>{let r=new Map;for(let o of ou(e)){let n=Date.parse(o.savedAt);Number.isNaN(n)||r.set(o.messageId,{messageId:o.messageId,createdAtMs:n,text:ru(o)})}return t.map(o=>r.get(o)).filter(o=>o!==void 0)},FI=(e={})=>{let t=e.ownerLlm??null,r=e.nowMs??Date.now;return async o=>{try{let n=za(o.projectId);if(!AI(n?.state))return;let s=r(),i=DI(o.projectId),a=MI({projectId:o.projectId,nowMs:s}),c=RI({projectId:o.projectId,cursorMessageId:i.cursorMessageId,cursorSavedAtMs:i.cursorSavedAtMs}),d=ZJ(i.episodes,o.projectId);if(d===null){if(c.length===0)return;let f=c[0],y=c[c.length-1];d={episodeId:(0,S4.randomUUID)(),projectId:o.projectId,state:"CAPTURING",messageIds:c.map(P=>P.messageId),startedAtMs:f.createdAtMs,lastMessageAtMs:y.createdAtMs,closedAtMs:null,reason:null,scrubbedTranscript:null,ownerMarkedSaveAsSkill:!1,hasSuccessSignal:!1,validateAttempts:0,draftId:null,contentHash:null,mergeDraftId:null,tokensUsed:0}}else if(d.state==="CAPTURING"&&c.length>0){let f=new Set(d.messageIds),y=[...d.messageIds],P=d.lastMessageAtMs;for(let h of c)f.has(h.messageId)||(y.push(h.messageId),f.add(h.messageId),P=Math.max(P,h.createdAtMs));d={...d,messageIds:y,lastMessageAtMs:P}}let p=yle(o.projectId,d.messageIds);if(p.length===0)return;let g=await rP({episode:d,messages:p,tokensUsedToday:a.tokensUsedToday,lastClosedAtMs:a.lastClosedAtMs,nowMs:s,deps:{ownerLlm:t,writeDraft:tu,listDraftFingerprints:()=>r4(o.projectId),listPublishedFingerprints:()=>n4(o.projectId),openDraftCount:()=>pI(o.projectId)}});if(d4({projectId:o.projectId,episodesFile:i,budget:a,result:g,nowMs:s}),g.draftWritten!==null&&g.episode.state==="AWAITING_REVIEW"){let f=[...i.episodes.filter(y=>y.episodeId!==g.episode.episodeId),g.episode];SI({projectId:o.projectId,successEpisode:g.episode,episodes:f,draftWritten:g.draftWritten,nowMs:s})}}catch(n){console.error(fle,"run_failed",o.projectId,n)}}}});var $I,UI,BI=l(()=>{"use strict";Hs();ee();Yr();xL();LL();zI();$a();$I="[project-history-tick]",UI=async(e={})=>{let t=e.listProjectIds?.()??RL();if(t.length===0)return;let r=z(),o=e.cloudApi!==void 0?e.cloudApi:r===null?null:V({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),n=vL(),s=e.pullSkills??JS,i=e.runSkillgen??FI({ownerLlm:e.ownerLlm??null});for(let a of t){try{await i({projectId:a})}catch(c){console.error($I,"skillgen_failed",a,c)}if(o===null){console.error($I,"pull_skipped_no_cloud_api",a);continue}try{await s({projectId:a,deps:{history:n,awcPublished:IL(o)}})}catch(c){console.error($I,"pull_failed",a,c)}}}});var GI,A4=l(()=>{"use strict";nt();BI();GI=e=>{let t=e?.intervalMs??6e4,r=e?.tick??(()=>UI());r();let o=setInterval(()=>{r()},t);return{stop:()=>{clearInterval(o)}}}});var b4=l(()=>{"use strict";oe();ne()});var _4=l(()=>{"use strict";oP()});var k4=l(()=>{"use strict";oe();ne()});var VI=l(()=>{"use strict";Kv();ne();fL();hL();AL();kL();EL();RJ();nt();LL();xL();BI();Hs();A4();$a();nt();jL();OL();BL();Yp();DL();FL();tP();cP();NL();eP();b4();JL();XL();oP();_4();Xp();wI();uP();pP();CI();HI();xI();jI();LI();nP();zI();bI();sP();cI();rI();nI();PI();aI();mI();k4();fI();nt()});var Dt,hle,w4,T4,KI,qI,JI,YI,XI,ZI,QI=l(()=>{"use strict";Dt=require("node:crypto"),hle=Buffer.from("302a300506032b6570032100","hex"),w4=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},T4=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Dt.createPublicKey)({key:Buffer.concat([hle,t]),format:"der",type:"spki"})},KI=()=>{let{publicKey:e,privateKey:t}=(0,Dt.generateKeyPairSync)("ed25519");return{publicKeyRaw:w4(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},qI=e=>(0,Dt.createPrivateKey)(e),JI=(e,t)=>(0,Dt.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),YI=(e,t,r)=>{try{let o=T4(e);return(0,Dt.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},XI=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,ZI=()=>(0,Dt.randomBytes)(32).toString("base64url")});var bo,hP,E4,Sle,Ple,SP,ex,tx,R4=l(()=>{"use strict";bo=m(require("node:fs")),hP=m(require("node:path"));QI();G();He();E4=e=>hP.default.join(e.installDir,Co),Sle=(e,t)=>{if(e.profileEmail===null||t===E4(e)||bo.default.existsSync(t))return;let r=E4(e);bo.default.existsSync(r)&&(bo.default.mkdirSync(hP.default.dirname(t),{recursive:!0}),bo.default.renameSync(r,t))},Ple=e=>{if(!bo.default.existsSync(e))return null;try{let t=bo.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},SP=e=>{let t=kl(e);Sle(e,t);let r=Ple(t);if(r!==null)return r;let o=KI();return bo.default.mkdirSync(hP.default.dirname(t),{recursive:!0}),bo.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},ex=e=>{let t=SP(e.layout),r=ZI(),o=XI({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=qI(t.privateKeyPem),s=JI(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},tx=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return YI(e.serverPublicKey,t,e.serverAttestation)}});var rx=l(()=>{"use strict";R4();QI()});var C4,v4,L4=l(()=>{"use strict";C4=m(require("node:path")),v4=e=>({osUid:typeof e.uid=="number"&&Number.isInteger(e.uid)&&e.uid>=0?e.uid:null,installRootName:C4.default.basename(e.installDir)})});var O4,su,sx,ix,I4,Ale,ox,PP,_e,M4,ble,nx,_le,kle,ax,be,Ne,yt,wle,x4,W4,iu,au,j4=l(()=>{"use strict";O4=m(require("node:http")),su=m(require("node:fs")),sx=m(require("node:path"));vn();AP();Pd();pU();mU();PU();Gn();mE();jE();VU();qU();XK();td();pv();aq();bq();kq();HS();jq();Vq();Bo();Wt();xt();Kq();Jq();fw();nT();hw();Zq();tJ();Bv();Sr();mJ();VI();ee();rx();L4();ix=e=>tE(e)??"never",I4=48e3,Ale=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,ox=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Ef(),reveal:t.reveal,installed:kr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),PP=async e=>{let t=z();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:wr(t,e)},_e=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),M4=200,ble=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',nx=e=>{let t=e.trim().slice(0,M4),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},_le=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${_e(t)}</div>`,kle=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${_e(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',ax={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},be=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...ax}),e.end(JSON.stringify(r))},Ne=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},yt=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},wle=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=ble(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${_e(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=Fv(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Ad(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${_e(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${_e(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${_e(ix(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${_e(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},x4=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},W4=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,M4)},iu=e=>{let t=sx.default.join(e.layout.installDir,"link-code.txt"),r=()=>Fe(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:zS(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let u=h.installVersion??r(),S=await i(),b=$E(S),k=h.updateFlash??null,A=UE(k),_=_le(k,h.updateError??null);return FE({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:lr(u),installBundleVersionLabel:zS(u),prependBody:`${A}${_}${b}`,headerUpdateButtonHtml:zE(S)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let u=await Hv(e.layout);return s={cachedAtMs:h,offer:u},u},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:nx("An update is already running.")}),h.end();return}c=!0;try{let S=await Uv(),b=S.ok?"/?update=ok":nx(S.message);h.writeHead(303,{Location:b}),h.end()}catch(S){let b=S instanceof Error&&S.message.trim().length>0?S.message:"Install bundle update failed.";h.writeHead(303,{Location:nx(b)}),h.end()}finally{c=!1,a()}},p=async(h,u)=>{let S=u==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",b=o(),k=await n({title:u,activePath:u==="Project not found"?"/projects":"/",installVersion:b.installVersion,body:`<section class="card">
      <h1>${_e(u)}</h1>
      <p>${_e(S)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(k)},g=()=>{if(su.default.existsSync(t))return su.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return su.default.writeFileSync(t,h,"utf8"),h},f=cn({layout:e.layout}),y=O4.default.createServer((h,u)=>{(async()=>{let S=h.url?.split("?")[0]??"/",b=h.method??"GET";if(b==="OPTIONS"){u.writeHead(204,ax),u.end();return}if(await iv({method:b,pathname:S,request:h,response:u,requestUrl:h.url??"/",storePath:iq(sx.default.dirname(e.layout.configPath)),readBody:yt,sendHtml:Ne,renderShell:n})||await yy({method:b,pathname:S,request:h,response:u,layout:e.layout,readBody:yt,sendJson:be})||await RS({method:b,pathname:S,request:h,response:u,layout:e.layout,readBody:yt,sendJson:be,server:f}))return;if(b==="GET"&&S==="/health"){let A=e.controllers.getStatus(),_=o();be(u,200,{ok:!0,...A,installBundleVersion:_.installBundleVersion,installBundleUpdatedAt:_.installBundleUpdatedAt,...v4({uid:process.getuid?.(),installDir:e.layout.installDir})});return}if(b==="GET"&&S==="/api/status"){let A=o();be(u,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt});return}if(b==="GET"&&S==="/api/traffic"){be(u,200,{entries:hd(e.layout)});return}if(b==="DELETE"&&S==="/api/traffic"||b==="POST"&&S==="/api/traffic/clear"){if(nE(e.layout),b==="POST"){u.writeHead(303,{Location:"/traffic?cleared=1"}),u.end();return}be(u,200,{ok:!0});return}if(b==="GET"&&S==="/api/trace"){be(u,200,{entries:Gy(e.layout)});return}if(b==="DELETE"&&S==="/api/trace"||b==="POST"&&S==="/api/trace/clear"){if(aE(e.layout),b==="POST"){u.writeHead(303,{Location:"/status"}),u.end();return}be(u,200,{ok:!0});return}if(b==="POST"&&S==="/api/errors/clear"){lE(e.layout.errorLogPath),u.writeHead(303,{Location:"/errors?cleared=1"}),u.end();return}if(b==="GET"&&S==="/api/knowledge"){let _=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(_.length>0){let E=await la({layout:e.layout,query:_,limit:20});be(u,200,{chunks:E,query:_});return}be(u,200,{chunks:aa(e.layout).slice(-50).reverse()});return}if(b==="POST"&&S==="/api/revive"){e.controllers.reviveWebSocket(),u.writeHead(303,{Location:"/status?revived=1"}),u.end();return}if(b==="GET"&&S==="/api/update-status"){let A=await i();be(u,200,{ok:!0,...A});return}if((b==="GET"||b==="POST")&&S==="/api/update"){await d(u);return}if(b==="GET"&&S==="/"){let A=e.controllers.getStatus(),_=o(),E=kr(e.layout),T=Vy(e.layout.errorLogPath);Ne(u,await n({title:"Home",activePath:"/",installVersion:_.installVersion,updateFlash:x4(h.url??void 0),updateError:W4(h.url??void 0),body:BE({wsConnected:A.wsConnected,lastHeartbeatAt:A.lastHeartbeatAt,installBundleVersion:_.installBundleVersion,harnessSetCount:E.sets.length,knowledgeChunkCount:aa(e.layout).length,trafficEntryCount:hd(e.layout).length,wakeError:A.wakeError,errorLogByteSize:T.byteSize,errorLogExists:T.exists})}));return}if(b==="GET"&&S==="/task"){let A=e.controllers.getStatus(),_=o(),E=z(),T=new URL(h.url??"/",`http://127.0.0.1:${43347}`),v=T.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,I=T.searchParams.get("failed")==="1"?T.searchParams.get("error")?.trim()??"Task failed.":null,W=T.searchParams.get("runId");Ne(u,await n({title:"Task",activePath:"/task",installVersion:_.installVersion,body:uv({defaultWorkspace:E?.workspace??"",wsConnected:A.wsConnected,flashMessage:v,flashError:I,lastRunId:W})}));return}if(b==="POST"&&S==="/task/dispatch"){let A=await yt(h),_=new URLSearchParams(A),E=_.get("prompt")?.trim()??"",T=_.get("writerAgent")?.trim()??"claude-cli",v=_.get("projectFolder")?.trim()??"",I=await Vv({prompt:E,writerAgent:T,...v.length>0?{projectFolderPath:v}:{}}),W=new URLSearchParams;I.ok?W.set("ok","1"):(W.set("failed","1"),I.errorMessage!==void 0&&W.set("error",I.errorMessage.slice(0,240))),I.agentRunId!==void 0&&W.set("runId",I.agentRunId),u.writeHead(303,{Location:`/task?${W.toString()}`}),u.end();return}if(b==="GET"&&S==="/writer-sessions"){let A=o(),_=MS(e.layout,12);Ne(u,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:A.installVersion,updateFlash:x4(h.url??void 0),updateError:W4(h.url??void 0),body:Pv({sessions:_})}));return}if(b==="GET"&&S==="/errors"){let A=o(),_=Vy(e.layout.errorLogPath);Ne(u,await n({title:"Errors",activePath:"/errors",installVersion:A.installVersion,body:dE({errorLogPath:e.layout.errorLogPath,content:_.content,exists:_.exists,truncated:_.truncated,byteSize:_.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(b==="GET"&&S==="/status"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=e.controllers.getStatus(),E=ve(e.layout),T=E!==null?$e(E,12e4):gE(_.lastHeartbeatAt,12e4),v=fE({lastHeartbeatAt:_.lastHeartbeatAt,heartbeatIsStale:T}),I=o();Ne(u,await n({title:"Status",activePath:"/status",installVersion:I.installVersion,body:`${wle({status:_,healthBadge:v,revived:A.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:I.installBundleVersion,installBundleUpdatedAt:I.installBundleUpdatedAt})}${SE({installDir:e.layout.installDir})}${hE({entries:Gy(e.layout)})}`}));return}if(b==="GET"&&S==="/traffic"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=hd(e.layout),E=o(),T=_.map(W=>`<tr><td title="${_e(W.at)}">${_e(ix(W.at))}</td><td>${_e(W.direction)}</td><td><code>${_e(W.type)}</code></td><td>${_e(W.summary)}</td><td>${_e(W.action??"")}</td></tr>`).join(""),v=_.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${T}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',I=A.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Ne(u,await n({title:"Traffic",activePath:"/traffic",installVersion:E.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${I}
              ${v}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(b==="GET"&&S==="/projects"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=o(),E=lr(_.installVersion),T=await PP(e.layout),v=A.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":A.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,I=A.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,W=z(),j=W===null?null:V({wsUrl:W.wsUrl,pairingToken:W.pairingToken}),M=j===null?{}:Object.fromEntries((await Promise.all(T.projects.map(async B=>{let ie=await jv(j,B.id);return[B.id,ie?.counts??null]}))).filter(B=>B[1]!==null));Ne(u,await n({title:"Projects",activePath:"/projects",installVersion:_.installVersion,body:Nv({projects:T.projects,compositionCountsByProjectId:M,cloudAppOrigin:E,syncMessage:T.message,syncOk:T.ok,flashMessage:I,flashError:v})}));return}if(b==="GET"&&S==="/projects/select-folder"){let _=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",E=z(),T=E===null?null:V({wsUrl:E.wsUrl,pairingToken:E.pairingToken}),v=_.length>0&&T!==null?Ko():null;if(v===null||T===null){u.writeHead(303,{Location:"/projects"}),u.end();return}if(it({projectFolderPath:v}),!await qc(T,_,v)){u.writeHead(303,{Location:"/projects?folderError=1"}),u.end();return}u.writeHead(303,{Location:`/project?id=${encodeURIComponent(_)}&folderUpdated=1`}),u.end();return}if(b==="POST"&&S==="/projects/delete"){let A=await yt(h),_=new URLSearchParams(A).get("projectId")?.trim()??"",E=z(),T=E===null?null:V({wsUrl:E.wsUrl,pairingToken:E.pairingToken});if(T===null||_.length===0){u.writeHead(303,{Location:"/projects?deleteError=1"}),u.end();return}let v=await Ew(T,_);u.writeHead(303,{Location:v.ok?"/projects?deleted=1":"/projects?deleteError=1"}),u.end();return}if(b==="GET"&&S==="/project"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=A.searchParams.get("id")?.trim()??"",E=o(),T=lr(E.installVersion),v=await PP(e.layout),I=Xt(v.projects,_);if(I===null){await p(u,"Project not found");return}let W=A.searchParams.get("linked")==="1"?A.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${A.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${A.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:A.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,j=A.searchParams.get("knowledgePromoted"),M=j!==null?`Marked ${j} lesson(s) as promoted in Agent Witch.`:null,B=A.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,ie=A.searchParams.get("tab")?.trim()??"harness",D=ie==="workflows"||ie==="agents"||ie==="knowledge"||ie==="pitfalls"?ie:"harness",Ie=A.searchParams.get("retired")==="1",Sn=A.searchParams.get("edit")?.trim()||null,Pn=Xq(A.searchParams.get("pitfall")),Xs=z(),Hr=Xs===null?null:V({wsUrl:Xs.wsUrl,pairingToken:Xs.pairingToken}),cA=Hr===null?null:await jv(Hr,I.id),al=0;if(Hr!==null)try{let Du=await fetch(`${Hr.appOrigin}/api/agent-witch/projects/${encodeURIComponent(I.id)}/knowledge`,{method:"GET",headers:{[le]:Hr.pairingToken},signal:AbortSignal.timeout(1e4)});if(Du.ok){let Zs=await Du.json();typeof Zs=="object"&&Zs!==null&&typeof Zs.candidateCount=="number"&&(al=Zs.candidateCount)}}catch{al=0}let dA=D!=="pitfalls"?void 0:await eH({store:_y({layout:e.layout,cloud:Hr===null?null:Kc(Hr)}),projectId:I.id,includeRetired:Ie});Ne(u,await n({title:I.name,activePath:"/projects",installVersion:E.installVersion,body:Go({project:I,cloudAppOrigin:T,installed:kr(e.layout),linkedSetSlugs:br(I.projectFolderPath),composition:cA,knowledgeCandidateCount:al,pitfalls:dA,pitfallsShowRetired:Ie,pitfallsEditId:Sn,activeTab:D,flashMessage:W??M??Pn?.message??null,flashError:B??Pn?.error??null})}));return}if(b==="POST"&&S==="/projects/pull-bound-harness"){let A=await yt(h),_=await mw({rawBody:A,layout:e.layout});if(_.kind==="not_found"){await p(u,"Project not found");return}if(_.kind==="redirect"){u.writeHead(303,{Location:_.location}),u.end();return}let E=o();Ne(u,await n({title:_.title,activePath:"/projects",installVersion:E.installVersion,body:_.body}));return}if(b==="POST"&&S==="/projects/link-harness"){let A=await yt(h),_=new URLSearchParams(A),E=_.get("projectId")?.trim()??"",T=await PP(e.layout),v=Xt(T.projects,E);if(v===null){await p(u,"Project not found");return}let I=_.getAll("applySet").map(D=>String(D)),W=Mc({layout:e.layout,projectFolderPath:v.projectFolderPath,setSlugs:I});if(!W.ok){let D=o(),Ie=lr(D.installVersion);Ne(u,await n({title:v.name,activePath:"/projects",installVersion:D.installVersion,body:Go({project:v,cloudAppOrigin:Ie,installed:kr(e.layout),linkedSetSlugs:br(v.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:W.errorMessage})}));return}let j=z(),M=j===null?null:V({wsUrl:j.wsUrl,pairingToken:j.pairingToken}),B=M===null?!1:await ts(M,v.id,W.appliedSetSlugs),ie=new URLSearchParams({linked:"1",files:String(W.writtenFileCount),bindingsSynced:B?"1":"0"});u.writeHead(303,{Location:`/project?id=${encodeURIComponent(v.id)}&${ie.toString()}`}),u.end();return}if(b==="POST"&&S==="/projects/remove-harness-set"){let A=await yt(h),_=await gw({rawBody:A,layout:e.layout});if(_.kind==="not_found"){await p(u,"Project not found");return}if(_.kind==="redirect"){u.writeHead(303,{Location:_.location}),u.end();return}let E=o();Ne(u,await n({title:_.title,activePath:"/projects",installVersion:E.installVersion,body:_.body}));return}if(b==="POST"&&S==="/project/knowledge/promote-all"){let A=await yt(h),E=new URLSearchParams(A).get("projectId")?.trim()??"",T=await PP(e.layout),v=Xt(T.projects,E);if(v===null){await p(u,"Project not found");return}let I=z(),W=I===null?null:V({wsUrl:I.wsUrl,pairingToken:I.pairingToken}),j=W===null?{ok:!1,promotedCount:0}:await qq(W,v.id),M=new URLSearchParams({tab:"knowledge",...j.ok?{knowledgePromoted:String(j.promotedCount)}:{knowledgePromoteFailed:"1"}});u.writeHead(303,{Location:`/project?id=${encodeURIComponent(v.id)}&${M.toString()}`}),u.end();return}let k=zf(S);if(b==="POST"&&k!==null){let A=await yt(h),_=await Sw({rawBody:A,action:k,layout:e.layout,createStore:E=>_y({layout:e.layout,cloud:Kc(E)})});if(_.kind==="not_found"){await p(u,"Project not found");return}u.writeHead(303,{Location:_.location}),u.end();return}if(b==="GET"&&S==="/harness"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=o(),E=Hc(e.layout),T=A.searchParams.get("submitted")==="1",v=T?A.searchParams.get("syncFailed")==="1"?`Local harness updated (${A.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:A.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${A.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":A.searchParams.get("stopped")==="1"?`Reveal stopped. ${E?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:A.searchParams.get("revealed")==="1"?`Reveal found ${E?.sets.length??0} set(s).`:null,I=E?.scanRoots[0]??Ef(),W=Ale(e.layout,{reveal:E,importQuery:A.searchParams.get("import")==="1",justSubmitted:T}),j=lr(_.installVersion);Ne(u,await n({title:"Harness",activePath:"/harness",installVersion:_.installVersion,body:Dp(ox(e.layout,{cloudAppOrigin:j,reveal:E,scanFolder:I,flashMessage:v,importSectionExpanded:W}))}));return}if(b==="POST"&&S==="/api/harness/pick-folder"){let A=Ko();if(A===null){be(u,200,{cancelled:!0});return}be(u,200,{path:A});return}if(b==="GET"&&S==="/api/harness/file-content"){let _=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",E=Oc(_);if(E===null){be(u,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let T=su.default.readFileSync(E,"utf8"),v=T.length>I4?`${T.slice(0,I4)}
\u2026 (truncated)`:T;be(u,200,{content:v})}catch{be(u,500,{errorMessage:"Could not read file."})}return}if(b==="POST"&&S==="/api/harness/reveal/add-project"){let A=await yt(h),_="";try{let v=JSON.parse(A);typeof v=="object"&&v!==null&&typeof v.projectPath=="string"&&(_=v.projectPath.trim())}catch{be(u,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(_.length===0){be(u,400,{ok:!1,errorMessage:"projectPath is required."});return}let E=Hc(e.layout),T=Hk({reveal:E,projectPath:_});if(T===null||T.sets.length===0){be(u,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Lf(e.layout,T),be(u,200,{ok:!0,setCount:T.sets.length});return}if(b==="GET"&&S==="/api/harness/reveal/stream"){let _=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(_.length===0){be(u,400,{errorMessage:"Choose a folder to scan first."});return}let E=!1;h.on("close",()=>{E=!0}),u.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...ax});let T=Fk({scanRoot:_,response:u,shouldAbort:()=>E});Lf(e.layout,T),u.end();return}if(b==="POST"&&S==="/harness/reveal"){u.writeHead(410,{"Content-Type":"text/plain"}),u.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(b==="POST"&&S==="/harness/submit"){let A=Hc(e.layout);if(A===null){let j=o(),M=lr(j.installVersion);Ne(u,await n({title:"Harness",activePath:"/harness",installVersion:j.installVersion,body:Dp(ox(e.layout,{cloudAppOrigin:M,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let _=await yt(h),E=new URLSearchParams(_),T=Mv(E,A),v=$k({layout:e.layout,sets:T});if(!v.ok){let j=o(),M=lr(j.installVersion);Ne(u,await n({title:"Harness",activePath:"/harness",installVersion:j.installVersion,body:Dp(ox(e.layout,{cloudAppOrigin:M,reveal:A,flashError:v.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}Bk(e.layout);let W=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";u.writeHead(303,{Location:`/harness?submitted=1&count=${v.writtenItemCount??0}${W}`}),u.end();return}if(b==="GET"&&S==="/writer-api"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),E=z()?.writerExecutionBackend??Ze(void 0),T=Be(e.layout.configPath),v=Do(T),I=A.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,W=o();Ne(u,await n({title:"Writer API",activePath:"/writer-api",installVersion:W.installVersion,body:Wv({writerExecutionBackend:E,secrets:v,flashMessage:I})}));return}if(b==="POST"&&S==="/writer-api"){let A=await yt(h),_=new URLSearchParams(A),E=_.get("writerExecutionBackend")?.trim()??"cli";J_({configPath:e.layout.configPath,writerExecutionBackend:Ze(E),anthropicApiKey:_.get("anthropicApiKey")??void 0,anthropicModel:_.get("anthropicModel")??void 0,openaiApiKey:_.get("openaiApiKey")??void 0,openaiModel:_.get("openaiModel")??void 0,googleApiKey:_.get("googleApiKey")??void 0,googleModel:_.get("googleModel")??void 0}),u.writeHead(303,{Location:"/writer-api?saved=1"}),u.end();return}if(b==="GET"&&S==="/estimates"){u.writeHead(302,{Location:"/history"}),u.end();return}if(b==="GET"&&S==="/history"){let A=o();Ne(u,await n({title:"History",activePath:"/history",installVersion:A.installVersion,body:Sv({reportsDir:e.layout.reportsDir})}));return}if(b==="GET"&&S==="/knowledge"){let _=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",E=o(),T=wE({layout:e.layout}),v=RE(T),I=_.length>0?await la({layout:e.layout,query:_,limit:20}):aa(e.layout).slice(-50).reverse(),W=I.map(M=>{let B=EE(T,M.id),ie=B>0?` \xB7 used in ${B} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${_e(M.createdAt)}">${_e(ix(M.createdAt))}${M.source?` \xB7 ${_e(M.source)}`:""}${ie}</div><pre>${_e(M.text)}</pre></article>`}).join(""),j=v.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${v.map(M=>`<li><strong>P${M.priority}</strong> \u2014 ${_e(M.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Ne(u,await n({title:"Knowledge",activePath:"/knowledge",installVersion:E.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${_e(_)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${kle(_,I.length)}
            </section>${j}${W}`}));return}b==="POST"&&await yt(h),await p(u,"Not found")})().catch(S=>{console.error("[agent-witch-local-app]",S),u.writeHead(500),u.end("Internal error")})});y.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)});let P=GI();return y.on("close",()=>{P.stop()}),y.listen(43347,"127.0.0.1",()=>{try{Yi()}catch(h){let u=h instanceof Error?h.message:String(h);console.error(`[agent-witch] writeGlobalTriggers failed: ${u}`)}console.log(`[agent-witch] Local app ${Gr}`)}),y},au=e=>SP(e).publicKeyRaw});var AP=l(()=>{"use strict";J$();Y$();j4()});var D4={};St(D4,{runAgentWitchExternalLiveCli:()=>Ele});var lx,N4,Tle,Ele,H4=l(()=>{"use strict";lx=m(require("node:fs")),N4=m(require("node:path"));Gn();G();ae();AP();ae();Tle=e=>{let t=N4.default.join(e,"link-code.txt");if(!lx.default.existsSync(t))return null;let r=lx.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},Ele=()=>{Pt("agent-witch-live");let e=C(),t=N(),r=Tle(e),o=au(t);iu({layout:t,controllers:{getStatus:()=>{let n=ve(t);return{wsConnected:dc(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{xn(e)}}})}});var _o=R((G7e,$4)=>{"use strict";var F4=["nodebuffer","arraybuffer","fragments"],z4=typeof Blob<"u";z4&&F4.push("blob");$4.exports={BINARY_TYPES:F4,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:z4,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var lu=R((V7e,bP)=>{"use strict";var{EMPTY_BUFFER:Rle}=_o(),cx=Buffer[Symbol.species];function Cle(e,t){if(e.length===0)return Rle;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new cx(r.buffer,r.byteOffset,o):r}function U4(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function B4(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function vle(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function dx(e){if(dx.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new cx(e):ArrayBuffer.isView(e)?t=new cx(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),dx.readOnly=!1),t}bP.exports={concat:Cle,mask:U4,toArrayBuffer:vle,toBuffer:dx,unmask:B4};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");bP.exports.mask=function(t,r,o,n,s){s<48?U4(t,r,o,n,s):e.mask(t,r,o,n,s)},bP.exports.unmask=function(t,r){t.length<32?B4(t,r):e.unmask(t,r)}}catch{}});var K4=R((K7e,V4)=>{"use strict";var G4=Symbol("kDone"),px=Symbol("kRun"),ux=class{constructor(t){this[G4]=()=>{this.pending--,this[px]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[px]()}[px](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[G4])}}};V4.exports=ux});var Ka=R((q7e,X4)=>{"use strict";var cu=require("zlib"),q4=lu(),Lle=K4(),{kStatusCode:J4}=_o(),Ile=Buffer[Symbol.species],xle=Buffer.from([0,0,255,255]),kP=Symbol("permessage-deflate"),ko=Symbol("total-length"),Ga=Symbol("callback"),gn=Symbol("buffers"),Va=Symbol("error"),_P,mx=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!_P){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;_P=new Lle(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Ga];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){_P.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){_P.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?cu.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=cu.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[kP]=this,this._inflate[ko]=0,this._inflate[gn]=[],this._inflate.on("error",Ole),this._inflate.on("data",Y4)}this._inflate[Ga]=o,this._inflate.write(t),r&&this._inflate.write(xle),this._inflate.flush(()=>{let s=this._inflate[Va];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=q4.concat(this._inflate[gn],this._inflate[ko]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[ko]=0,this._inflate[gn]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?cu.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=cu.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[ko]=0,this._deflate[gn]=[],this._deflate.on("data",Wle)}this._deflate[Ga]=o,this._deflate.write(t),this._deflate.flush(cu.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=q4.concat(this._deflate[gn],this._deflate[ko]);r&&(s=new Ile(s.buffer,s.byteOffset,s.length-4)),this._deflate[Ga]=null,this._deflate[ko]=0,this._deflate[gn]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};X4.exports=mx;function Wle(e){this[gn].push(e),this[ko]+=e.length}function Y4(e){if(this[ko]+=e.length,this[kP]._maxPayload<1||this[ko]<=this[kP]._maxPayload){this[gn].push(e);return}this[Va]=new RangeError("Max payload size exceeded"),this[Va].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Va][J4]=1009,this.removeListener("data",Y4),this.reset()}function Ole(e){if(this[kP]._inflate=null,this[Va]){this[Ga](this[Va]);return}e[J4]=1007,this[Ga](e)}});var qa=R((J7e,wP)=>{"use strict";var{isUtf8:Z4}=require("buffer"),{hasBlob:Mle}=_o(),jle=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function Nle(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function gx(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function Dle(e){return Mle&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}wP.exports={isBlob:Dle,isValidStatusCode:Nle,isValidUTF8:gx,tokenChars:jle};if(Z4)wP.exports.isValidUTF8=function(e){return e.length<24?gx(e):Z4(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");wP.exports.isValidUTF8=function(t){return t.length<32?gx(t):e(t)}}catch{}});var Px=R((Y7e,s8)=>{"use strict";var{Writable:Hle}=require("stream"),Q4=Ka(),{BINARY_TYPES:Fle,EMPTY_BUFFER:e8,kStatusCode:zle,kWebSocket:$le}=_o(),{concat:fx,toArrayBuffer:Ule,unmask:Ble}=lu(),{isValidStatusCode:Gle,isValidUTF8:t8}=qa(),TP=Buffer[Symbol.species],Ht=0,r8=1,o8=2,n8=3,yx=4,hx=5,EP=6,Sx=class extends Hle{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||Fle[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[$le]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Ht}_write(t,r,o){if(this._opcode===8&&this._state==Ht)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new TP(o.buffer,o.byteOffset+t,o.length-t),new TP(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new TP(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case Ht:this.getInfo(t);break;case r8:this.getPayloadLength16(t);break;case o8:this.getPayloadLength64(t);break;case n8:this.getMask();break;case yx:this.getData(t);break;case hx:case EP:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[Q4.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=r8:this._payloadLength===127?this._state=o8:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=n8:this._state=yx}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=yx}getData(t){let r=e8;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&Ble(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=hx,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[Q4.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===Ht&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=Ht;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=fx(o,r):this._binaryType==="arraybuffer"?n=Ule(fx(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=Ht):(this._state=EP,setImmediate(()=>{this.emit("message",n,!0),this._state=Ht,this.startLoop(t)}))}else{let n=fx(o,r);if(!this._skipUTF8Validation&&!t8(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===hx||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=Ht):(this._state=EP,setImmediate(()=>{this.emit("message",n,!1),this._state=Ht,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,e8),this.end();else{let o=t.readUInt16BE(0);if(!Gle(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new TP(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!t8(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=Ht;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=Ht):(this._state=EP,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=Ht,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[zle]=n,i}};s8.exports=Sx});var _x=R((Z7e,l8)=>{"use strict";var{Duplex:X7e}=require("stream"),{randomFillSync:Vle}=require("crypto"),{types:{isUint8Array:Kle}}=require("util"),i8=Ka(),{EMPTY_BUFFER:qle,kWebSocket:Jle,NOOP:Yle}=_o(),{isBlob:Ja,isValidStatusCode:Xle}=qa(),{mask:a8,toBuffer:$s}=lu(),Ft=Symbol("kByteLength"),Zle=Buffer.alloc(4),RP=8*1024,Us,Ya=RP,dr=0,Qle=1,ece=2,Ax=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=dr,this.onerror=Yle,this[Jle]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||Zle,r.generateMask?r.generateMask(o):(Ya===RP&&(Us===void 0&&(Us=Buffer.alloc(RP)),Vle(Us,0,RP),Ya=0),o[0]=Us[Ya++],o[1]=Us[Ya++],o[2]=Us[Ya++],o[3]=Us[Ya++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[Ft]!==void 0?a=r[Ft]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(a8(t,o,d,s,a),[d]):(a8(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=qle;else{if(typeof t!="number"||!Xle(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(Kle(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[Ft]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==dr?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Ja(t)?(n=t.size,s=!1):(t=$s(t),n=t.length,s=$s.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Ft]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Ja(t)?this._state!==dr?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==dr?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Ja(t)?(n=t.size,s=!1):(t=$s(t),n=t.length,s=$s.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Ft]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Ja(t)?this._state!==dr?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==dr?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[i8.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Ja(t)?(a=t.size,c=!1):(t=$s(t),a=t.length,c=$s.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[Ft]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Ja(t)?this._state!==dr?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==dr?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[Ft],this._state=ece,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(bx,this,a,n);return}this._bufferedBytes-=o[Ft];let i=$s(s);r?this.dispatch(i,r,o,n):(this._state=dr,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(tce,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[i8.extensionName];this._bufferedBytes+=o[Ft],this._state=Qle,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");bx(this,c,n);return}this._bufferedBytes-=o[Ft],this._state=dr,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===dr&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][Ft],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][Ft],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};l8.exports=Ax;function bx(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function tce(e,t,r){bx(e,t,r),e.onerror(t)}});var h8=R((Q7e,y8)=>{"use strict";var{kForOnEventAttribute:du,kListener:kx}=_o(),c8=Symbol("kCode"),d8=Symbol("kData"),p8=Symbol("kError"),u8=Symbol("kMessage"),m8=Symbol("kReason"),Xa=Symbol("kTarget"),g8=Symbol("kType"),f8=Symbol("kWasClean"),wo=class{constructor(t){this[Xa]=null,this[g8]=t}get target(){return this[Xa]}get type(){return this[g8]}};Object.defineProperty(wo.prototype,"target",{enumerable:!0});Object.defineProperty(wo.prototype,"type",{enumerable:!0});var Bs=class extends wo{constructor(t,r={}){super(t),this[c8]=r.code===void 0?0:r.code,this[m8]=r.reason===void 0?"":r.reason,this[f8]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[c8]}get reason(){return this[m8]}get wasClean(){return this[f8]}};Object.defineProperty(Bs.prototype,"code",{enumerable:!0});Object.defineProperty(Bs.prototype,"reason",{enumerable:!0});Object.defineProperty(Bs.prototype,"wasClean",{enumerable:!0});var Za=class extends wo{constructor(t,r={}){super(t),this[p8]=r.error===void 0?null:r.error,this[u8]=r.message===void 0?"":r.message}get error(){return this[p8]}get message(){return this[u8]}};Object.defineProperty(Za.prototype,"error",{enumerable:!0});Object.defineProperty(Za.prototype,"message",{enumerable:!0});var pu=class extends wo{constructor(t,r={}){super(t),this[d8]=r.data===void 0?null:r.data}get data(){return this[d8]}};Object.defineProperty(pu.prototype,"data",{enumerable:!0});var rce={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[du]&&n[kx]===t&&!n[du])return;let o;if(e==="message")o=function(s,i){let a=new pu("message",{data:i?s:s.toString()});a[Xa]=this,CP(t,this,a)};else if(e==="close")o=function(s,i){let a=new Bs("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Xa]=this,CP(t,this,a)};else if(e==="error")o=function(s){let i=new Za("error",{error:s,message:s.message});i[Xa]=this,CP(t,this,i)};else if(e==="open")o=function(){let s=new wo("open");s[Xa]=this,CP(t,this,s)};else return;o[du]=!!r[du],o[kx]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[kx]===t&&!r[du]){this.removeListener(e,r);break}}};y8.exports={CloseEvent:Bs,ErrorEvent:Za,Event:wo,EventTarget:rce,MessageEvent:pu};function CP(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var vP=R((eXe,S8)=>{"use strict";var{tokenChars:uu}=qa();function Nr(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function oce(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(p===-1&&uu[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let y=e.slice(c,p);d===44?(Nr(t,y,r),r=Object.create(null)):i=y,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(p===-1&&uu[d]===1)c===-1&&(c=g);else if(d===32||d===9)p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g),Nr(r,e.slice(c,p),!0),d===44&&(Nr(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,g),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(n){if(uu[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:o||(o=!0),n=!1}else if(s)if(uu[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,p=g;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(p===-1&&uu[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))p===-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let y=e.slice(c,p);o&&(y=y.replace(/\\/g,""),o=!1),Nr(r,a,y),d===44&&(Nr(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=g);let f=e.slice(c,p);return i===void 0?Nr(t,f,r):(a===void 0?Nr(r,f,!0):o?Nr(r,a,f.replace(/\\/g,"")):Nr(r,a,f),Nr(t,i,r)),t}function nce(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}S8.exports={format:nce,parse:oce}});var WP=R((oXe,L8)=>{"use strict";var sce=require("events"),ice=require("https"),ace=require("http"),b8=require("net"),lce=require("tls"),{randomBytes:cce,createHash:dce}=require("crypto"),{Duplex:tXe,Readable:rXe}=require("stream"),{URL:wx}=require("url"),fn=Ka(),pce=Px(),uce=_x(),{isBlob:mce}=qa(),{BINARY_TYPES:P8,CLOSE_TIMEOUT:gce,EMPTY_BUFFER:LP,GUID:fce,kForOnEventAttribute:Tx,kListener:yce,kStatusCode:hce,kWebSocket:De,NOOP:_8}=_o(),{EventTarget:{addEventListener:Sce,removeEventListener:Pce}}=h8(),{format:Ace,parse:bce}=vP(),{toBuffer:_ce}=lu(),k8=Symbol("kAborted"),Ex=[8,13],To=["CONNECTING","OPEN","CLOSING","CLOSED"],kce=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,se=class e extends sce{constructor(t,r,o){super(),this._binaryType=P8[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=LP,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),w8(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){P8.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new pce({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new uce(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[De]=this,s[De]=this,t[De]=this,n.on("conclude",Ece),n.on("drain",Rce),n.on("error",Cce),n.on("message",vce),n.on("ping",Lce),n.on("pong",Ice),s.onerror=xce,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",R8),t.on("data",xP),t.on("end",C8),t.on("error",v8),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[fn.extensionName]&&this._extensions[fn.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ct(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,E8(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Rx(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||LP,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Rx(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||LP,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Rx(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[fn.extensionName]||(n.compress=!1),this._sender.send(t||LP,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ct(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(se,"CONNECTING",{enumerable:!0,value:To.indexOf("CONNECTING")});Object.defineProperty(se.prototype,"CONNECTING",{enumerable:!0,value:To.indexOf("CONNECTING")});Object.defineProperty(se,"OPEN",{enumerable:!0,value:To.indexOf("OPEN")});Object.defineProperty(se.prototype,"OPEN",{enumerable:!0,value:To.indexOf("OPEN")});Object.defineProperty(se,"CLOSING",{enumerable:!0,value:To.indexOf("CLOSING")});Object.defineProperty(se.prototype,"CLOSING",{enumerable:!0,value:To.indexOf("CLOSING")});Object.defineProperty(se,"CLOSED",{enumerable:!0,value:To.indexOf("CLOSED")});Object.defineProperty(se.prototype,"CLOSED",{enumerable:!0,value:To.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(se.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(se.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[Tx])return t[yce];return null},set(t){for(let r of this.listeners(e))if(r[Tx]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[Tx]:!0})}})});se.prototype.addEventListener=Sce;se.prototype.removeEventListener=Pce;L8.exports=se;function w8(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:gce,protocolVersion:Ex[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!Ex.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${Ex.join(", ")})`);let s;if(t instanceof wx)s=t;else try{s=new wx(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let h=new SyntaxError(c);if(e._redirects===0)throw h;IP(e,h);return}let d=i?443:80,p=cce(16).toString("base64"),g=i?ice.request:ace.request,f=new Set,y;if(n.createConnection=n.createConnection||(i?Tce:wce),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(y=new fn({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=Ace({[fn.extensionName]:y.offer()})),r.length){for(let h of r){if(typeof h!="string"||!kce.test(h)||f.has(h))throw new SyntaxError("An invalid or duplicated subprotocol was specified");f.add(h)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let h=n.path.split(":");n.socketPath=h[0],n.path=h[1]}let P;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let h=o&&o.headers;if(o={...o,headers:{}},h)for(let[u,S]of Object.entries(h))o.headers[u.toLowerCase()]=S}else if(e.listenerCount("redirect")===0){let h=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!h||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,h||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),P=e._req=g(n),e._redirects&&e.emit("redirect",e.url,P)}else P=e._req=g(n);n.timeout&&P.on("timeout",()=>{Ct(e,P,"Opening handshake has timed out")}),P.on("error",h=>{P===null||P[k8]||(P=e._req=null,IP(e,h))}),P.on("response",h=>{let u=h.headers.location,S=h.statusCode;if(u&&n.followRedirects&&S>=300&&S<400){if(++e._redirects>n.maxRedirects){Ct(e,P,"Maximum redirects exceeded");return}P.abort();let b;try{b=new wx(u,t)}catch{let A=new SyntaxError(`Invalid URL: ${u}`);IP(e,A);return}w8(e,b,r,o)}else e.emit("unexpected-response",P,h)||Ct(e,P,`Unexpected server response: ${h.statusCode}`)}),P.on("upgrade",(h,u,S)=>{if(e.emit("upgrade",h),e.readyState!==se.CONNECTING)return;P=e._req=null;let b=h.headers.upgrade;if(b===void 0||b.toLowerCase()!=="websocket"){Ct(e,u,"Invalid Upgrade header");return}let k=dce("sha1").update(p+fce).digest("base64");if(h.headers["sec-websocket-accept"]!==k){Ct(e,u,"Invalid Sec-WebSocket-Accept header");return}let A=h.headers["sec-websocket-protocol"],_;if(A!==void 0?f.size?f.has(A)||(_="Server sent an invalid subprotocol"):_="Server sent a subprotocol but none was requested":f.size&&(_="Server sent no subprotocol"),_){Ct(e,u,_);return}A&&(e._protocol=A);let E=h.headers["sec-websocket-extensions"];if(E!==void 0){if(!y){Ct(e,u,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let T;try{T=bce(E)}catch{Ct(e,u,"Invalid Sec-WebSocket-Extensions header");return}let v=Object.keys(T);if(v.length!==1||v[0]!==fn.extensionName){Ct(e,u,"Server indicated an extension that was not requested");return}try{y.accept(T[fn.extensionName])}catch{Ct(e,u,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[fn.extensionName]=y}e.setSocket(u,S,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(P,e):P.end()}function IP(e,t){e._readyState=se.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function wce(e){return e.path=e.socketPath,b8.connect(e)}function Tce(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=b8.isIP(e.host)?"":e.host),lce.connect(e)}function Ct(e,t,r){e._readyState=se.CLOSING;let o=new Error(r);Error.captureStackTrace(o,Ct),t.setHeader?(t[k8]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(IP,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function Rx(e,t,r){if(t){let o=mce(t)?t.size:_ce(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${To[e.readyState]})`);process.nextTick(r,o)}}function Ece(e,t){let r=this[De];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[De]!==void 0&&(r._socket.removeListener("data",xP),process.nextTick(T8,r._socket),e===1005?r.close():r.close(e,t))}function Rce(){let e=this[De];e.isPaused||e._socket.resume()}function Cce(e){let t=this[De];t._socket[De]!==void 0&&(t._socket.removeListener("data",xP),process.nextTick(T8,t._socket),t.close(e[hce])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function A8(){this[De].emitClose()}function vce(e,t){this[De].emit("message",e,t)}function Lce(e){let t=this[De];t._autoPong&&t.pong(e,!this._isServer,_8),t.emit("ping",e)}function Ice(e){this[De].emit("pong",e)}function T8(e){e.resume()}function xce(e){let t=this[De];t.readyState!==se.CLOSED&&(t.readyState===se.OPEN&&(t._readyState=se.CLOSING,E8(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function E8(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function R8(){let e=this[De];if(this.removeListener("close",R8),this.removeListener("data",xP),this.removeListener("end",C8),e._readyState=se.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[De]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",A8),e._receiver.on("finish",A8))}function xP(e){this[De]._receiver.write(e)||this.pause()}function C8(){let e=this[De];e._readyState=se.CLOSING,e._receiver.end(),this.end()}function v8(){let e=this[De];this.removeListener("error",v8),this.on("error",_8),e&&(e._readyState=se.CLOSING,this.destroy())}});var O8=R((sXe,W8)=>{"use strict";var nXe=WP(),{Duplex:Wce}=require("stream");function I8(e){e.emit("close")}function Oce(){!this.destroyed&&this._writableState.finished&&this.destroy()}function x8(e){this.removeListener("error",x8),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function Mce(e,t){let r=!0,o=new Wce({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(I8,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(I8,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",Oce),o.on("error",x8),o}W8.exports=Mce});var Cx=R((iXe,M8)=>{"use strict";var{tokenChars:jce}=qa();function Nce(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&jce[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}M8.exports={parse:Nce}});var $8=R((lXe,z8)=>{"use strict";var Dce=require("events"),OP=require("http"),{Duplex:aXe}=require("stream"),{createHash:Hce}=require("crypto"),j8=vP(),Gs=Ka(),Fce=Cx(),zce=WP(),{CLOSE_TIMEOUT:$ce,GUID:Uce,kWebSocket:Bce}=_o(),Gce=/^[+/0-9A-Za-z]{22}==$/,N8=0,D8=1,F8=2,vx=class extends Dce{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:$ce,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:zce,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=OP.createServer((o,n)=>{let s=OP.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=Vce(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=N8}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===F8){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(mu,this);return}if(t&&this.once("close",t),this._state!==D8)if(this._state=D8,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(mu,this):process.nextTick(mu,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{mu(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",H8);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Vs(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Vs(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!Gce.test(s)){Vs(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Vs(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){gu(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=Fce.parse(c)}catch{Vs(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&p!==void 0){let f=new Gs({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let y=j8.parse(p);y[Gs.extensionName]&&(f.accept(y[Gs.extensionName]),g[Gs.extensionName]=f)}catch{Vs(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let f={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(f,(y,P,h,u)=>{if(!y)return gu(r,P||401,h,u);this.completeUpgrade(g,s,d,t,r,o,n)});return}if(!this.options.verifyClient(f))return gu(r,401)}this.completeUpgrade(g,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[Bce])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>N8)return gu(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${Hce("sha1").update(r+Uce).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let g=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),p._protocol=g)}if(t[Gs.extensionName]){let g=t[Gs.extensionName].params,f=j8.format({[Gs.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${f}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",H8),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(mu,this)})),a(p,n)}};z8.exports=vx;function Vce(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function mu(e){e._state=F8,e.emit("close")}function H8(){this.destroy()}function gu(e,t,r,o){r=r||OP.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${OP.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Vs(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Vs),e.emit("wsClientError",i,r,t)}else gu(r,o,n,s)}});var Kce,qce,Jce,Yce,Xce,Zce,U8,Qce,fu,B8=l(()=>{Kce=m(O8(),1),qce=m(vP(),1),Jce=m(Ka(),1),Yce=m(Px(),1),Xce=m(_x(),1),Zce=m(Cx(),1),U8=m(WP(),1),Qce=m($8(),1),fu=U8.default});var Lx,G8=l(()=>{"use strict";Lx=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var ede,Ix,V8=l(()=>{"use strict";kg();G8();ede=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",Ix=(e={})=>{let t=e.env??process.env,r=Lx(t[bg]),o=Lx(t[_g]);return{mode:ede(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var K8=l(()=>{"use strict";kg()});var q8=l(()=>{"use strict";V8();K8()});var xx=l(()=>{"use strict"});var Qa,Ks,J8,rde,Wx,Ox,Y8,X8,Mx,Z8,yu,jx=l(()=>{"use strict";Qa=m(require("node:fs")),Ks=m(require("node:os")),J8=m(require("node:path"));xx();bi();rde=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Wx=(e=Ks.default.hostname())=>J8.default.join(Ks.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),Ox=e=>{if(!Qa.default.existsSync(e))return null;try{let t=JSON.parse(Qa.default.readFileSync(e,"utf8"));return!rde(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},Y8=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},X8=(e,t)=>{Qa.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Mx=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Wx(),o=Ox(r);if(o!==null&&o.pid!==process.pid&&Vt(o.pid)&&Y8(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Ks.default.hostname(),macOsUsername:Ks.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return X8(r,n),{ok:!0}},Z8=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Wx(),o=Ox(r);return o!==null&&o.pid!==process.pid&&Vt(o.pid)&&Y8(o)?{ok:!1}:(X8(r,{hostname:Ks.default.hostname(),macOsUsername:Ks.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},yu=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??Wx();Ox(r)?.pid===process.pid&&Qa.default.existsSync(r)&&Qa.default.unlinkSync(r)}});var Nx,hu,ode,nde,sde,ide,Dx,Q8=l(()=>{"use strict";Nx=require("node:child_process"),hu=m(require("node:path"));bi();ig();ode=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),nde=(e,t)=>{if(ode(e)||!/\bnode\b/.test(e))return!1;let r=hu.default.resolve(t),o=hu.default.join(r,"app",Ml),n=hu.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Ml||i==="agent-witch.ts")return e.includes(r);try{let a=hu.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},sde=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,Nx.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},ide=(e,t,r)=>{let o=sde(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||nde(d,t)&&n.push(c)}return n},Dx=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,Nx.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=ide(r,e.installDir,t),n=[];for(let s of o)if(Vt(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var Su,Pu,e3,ade,Hx,t3=l(()=>{"use strict";Su=m(require("node:fs")),Pu=m(require("node:path"));Xe();e3=(e,t)=>{!Su.default.existsSync(e)||Su.default.existsSync(t)||(Su.default.mkdirSync(Pu.default.dirname(t),{recursive:!0}),Su.default.renameSync(e,t))},ade=e=>{if(e.profileEmail===null)return;let t=Pu.default.join(e.installDir,$t);e3(Pu.default.join(t,_n),e.mainLogPath),e3(Pu.default.join(t,kn),e.errorLogPath)},Hx=e=>{let t=N();e!==void 0&&t.installDir!==e||ade(t)}});var r3=l(()=>{"use strict";gd();Uy();Uy();!At()&&Mn(__agentWitchImportMetaUrl)&&(async()=>{Pt("agent-witch-wake-server");let e=await ls(),t=Ur(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var o3=l(()=>{"use strict";r3()});var n3=l(()=>{"use strict";od()});var Fx,s3=l(()=>{"use strict";xx();o3();jx();n3();Fx=async(e={})=>{let t=e.skipInProcessBridge?null:await $y();wy();let r=setInterval(()=>{wy()},6e4),o=setInterval(()=>{if(!Z8().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var Au,MP,dde,i3,a3,jP,l3,c3,zx,d3,NP,p3=l(()=>{"use strict";Au=m(require("node:fs")),MP=m(require("node:path")),dde="pending-run-inputs.json",i3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),a3=e=>{let t=e.profileEmail?MP.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return MP.default.join(t,dde)},jP=e=>{let t=a3(e);if(!Au.default.existsSync(t))return{};try{let r=JSON.parse(Au.default.readFileSync(t,"utf8"));return i3(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!i3(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},l3=(e,t)=>{let r=a3(e);Au.default.mkdirSync(MP.default.dirname(r),{recursive:!0}),Au.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},c3=e=>Object.values(jP(e)),zx=(e,t)=>jP(e)[t]!==void 0,d3=(e,t)=>{let r=jP(e);r[t.agentRunId]=t,l3(e,r)},NP=(e,t)=>{let r=jP(e);delete r[t],l3(e,r)}});var DP=l(()=>{"use strict";ee()});var u3=l(()=>{"use strict";ee()});var HP=l(()=>{"use strict";ee()});var FP=l(()=>{"use strict";ee()});var bu=l(()=>{"use strict";ee()});var pde,ude,_u,$x=l(()=>{"use strict";qt();DP();u3();HP();FP();bu();pde={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},ude={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},_u=e=>{if(!we(e.writerAgent))return"the selected writer";let t=_t(e.writerAgent);if(Ze(e.writerExecutionBackend)==="api"&&t!==null){let r=ct(Be(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=gc(t,r.model);return`${ude[t]} model ${o}`}}return pde[e.writerAgent]}});var mde,gde,m3,g3,f3=l(()=>{"use strict";mde=/"input_tokens"\s*:\s*(\d+)/,gde=/"output_tokens"\s*:\s*(\d+)/,m3=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},g3=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=m3(mde.exec(t)),o=m3(gde.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var zP=l(()=>{"use strict";Wt()});var ku,$P,fde,Ux,y3,h3,S3,Bx,P3=l(()=>{"use strict";ku=m(require("node:fs")),$P=m(require("node:path"));zP();fde="run-completion-outbox.json",Ux=e=>{let t=e.profileEmail?$P.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return $P.default.join(t,fde)},y3=e=>{let t=Ux(e);if(!ku.default.existsSync(t))return[];try{let r=JSON.parse(ku.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},h3=(e,t)=>{ku.default.mkdirSync($P.default.dirname(Ux(e)),{recursive:!0}),ku.default.writeFileSync(Ux(e),JSON.stringify(t,null,2),"utf8")},S3=(e,t)=>{let r=[...y3(e).filter(o=>o.runId!==t.runId),t];h3(e,r)},Bx=async e=>{if(e.cloudApi===null)return;let t=y3(e.layout);if(t.length===0)return;let r=[];for(let o of t)await Bc(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);h3(e.layout,r)}});var A3=l(()=>{"use strict"});var Gx,wu,hde,qs,b3=l(()=>{"use strict";A3();Gx=new Map,wu=e=>{let t=Gx.get(e);t!==void 0&&(clearInterval(t),Gx.delete(e))},hde=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},qs=(e,t,r,o={})=>{wu(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){wu(t);return}let i=o.onTick?.()??{};hde(e,t,n,i)};s(),Gx.set(t,setInterval(s,15e3))}});var _3=l(()=>{"use strict";Wt()});var k3,w3=l(()=>{"use strict";_3();k3=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Qe(t)}});var Vx,Tu,Eo,Kx,Dr,T3,UP=l(()=>{"use strict";Vx=new Set,Tu=new Map,Eo=(e,t)=>{if(t.length===0)return;let r=Tu.get(e)??[];r.push(t),Tu.set(e,r)},Kx=e=>{Vx.add(e);let t=Tu.get(e)??[];return Tu.delete(e),t},Dr=e=>Vx.has(e),T3=e=>{Vx.delete(e),Tu.delete(e)}});var el,E3,R3,C3=l(()=>{"use strict";el=m(require("node:path")),E3=require("node:url");On();R3=()=>{if(At()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?el.default.dirname(el.default.resolve(e)):el.default.dirname(el.default.resolve(__filename))}return el.default.dirname((0,E3.fileURLToPath)(__agentWitchImportMetaUrl))}});var v3,L3,I3,x3,ht,tl,W3,O3,rl,qx,Jx,Yx,M3,Xx,j3,BP=l(()=>{"use strict";v3=require("node:crypto"),L3=m(require("node:fs")),I3=m(require("node:path")),x3=require("node:url");bi();On();C3();ht=new Map,W3=async()=>{if(tl!==void 0)return tl;try{if(At()){let e=R3(),t=I3.default.join(e,"deps","node-pty","lib","index.js");if(L3.default.existsSync(t)){let r=await import((0,x3.pathToFileURL)(t).href);return tl=r,r}}return tl=await import("node-pty"),tl}catch{return tl=null,null}},O3=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},rl=(e,t,r)=>{let o=ht.get(e);if(o!==void 0){ht.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},qx=(e,t)=>{let r=ht.get(e);return r===void 0?!1:(r.pty.write(t),!0)},Jx=(e,t,r)=>{let o=ht.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},Yx=e=>{for(let t of ht.values())if(!(t.mode!=="agent"||t.runId!==e))return Vt(t.pty.pid);return!1},M3=e=>{for(let[t,r]of ht.entries())if(!(r.mode!=="agent"||r.runId!==e)){ht.delete(t);try{r.pty.kill()}catch{}return!0}return!1},Xx=async e=>{let t=await W3();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;ht.get(e.shellSessionId)!==void 0&&rl(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return ht.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{O3(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{ht.get(e.shellSessionId)?.pty===n&&(ht.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},j3=async e=>{let t=e.shellSessionId??(0,v3.randomUUID)(),r=await W3();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return ht.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{O3(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{ht.get(t)?.pty===o&&(ht.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var GP,N3,D3=l(()=>{"use strict";GP="[[AWAITING_INPUT]]",N3=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",GP,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Eu,H3,VP=l(()=>{"use strict";D3();Eu=e=>{let t=e.indexOf(GP);if(t<0)return null;let o=e.slice(t+GP.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},H3=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",N3].join(`
`)});var F3,z3=l(()=>{"use strict";UP();BP();VP();F3=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(Dr(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Eo(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await j3({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Eu(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var U3,B3,G3,$3,Ro,KP=l(()=>{"use strict";U3=require("node:child_process"),B3=m(require("node:fs")),G3=m(require("node:path"));ig();$3=12e4,Ro=(e,t)=>{let r=G3.default.join(e,"app",bM,"ensure-writer.sh");return B3.default.existsSync(r)?new Promise((o,n)=>{let s=(0,U3.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},a=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String($3/1e3)}s`))},$3);s.on("error",c=>{clearTimeout(a),n(c)}),s.on("close",c=>{if(clearTimeout(a),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var V3,Js,Cu,qP,Zx,Ru,JP,YP,Qx,eW,Sde,ol,Pde,Ade,tW,rW=l(()=>{"use strict";V3=require("node:child_process");qt();KP();HP();DP();bu();FP();Js=new Map,Cu=e=>e==="cursor"||e==="antigravity",qP=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",Zx=e=>Js.get(e)?.warmed===!0,Ru=e=>{let t=Js.get(e);Js.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},JP=e=>Js.get(e)?.conversationStarted===!0,YP=e=>{let t=Js.get(e);Js.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},Qx=e=>{Js.delete(e)},eW=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",Sde={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ol=e=>`${Sde[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,Pde=(e,t,r,o)=>new Promise(n=>{let s=Dg(t,r),i=[],a=(0,V3.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),Ade=(e,t)=>{let r=ol(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},tW=async e=>{if(!we(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Ze(e.runConfig.writerExecutionBackend)==="api"){let r=_t(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Be(e.runConfig.layout.configPath);return ct(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),Ru(e.writerAgent),{exitCode:0,output:ol(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Ro(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}Cu(e.writerAgent)&&Ru(e.writerAgent);let t=await Pde(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?Ade(e.writerAgent,t.output):ol(e.writerAgent)}}});var Ys,oW=l(()=>{"use strict";Ys={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var K3,bde,_de,q3,kde,nW,J3=l(()=>{"use strict";oW();K3=/you(?:'|')ve hit your session limit/i,bde=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],_de=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,q3=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},kde=e=>{let t=_de.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},nW=e=>{let t=e.trim();if(t.length===0)return null;if(K3.test(t))return{code:Ys.SESSION_LIMIT,resetHint:kde(t),matchedLine:q3(t,K3)};for(let r of bde)if(r.test(t))return{code:Ys.PROVIDER_QUOTA,resetHint:null,matchedLine:q3(t,r)};return null}});var XP,ZP,sW,iW=l(()=>{"use strict";XP="[[AGENT_RUN_WRITER_EXECUTION]]",ZP="cli-writer-api-key-missing",sW="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var aW=l(()=>{"use strict";iW()});var Y3=l(()=>{"use strict";aW()});var QP=l(()=>{"use strict";oW();J3();iW();aW();Y3()});var eA,X3=l(()=>{"use strict";eA={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var Z3,Q3=l(()=>{"use strict";Z3="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var e6,t6=l(()=>{"use strict";QP();Q3();e6=e=>e.code===Ys.SESSION_LIMIT?Z3:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var r6,o6=l(()=>{"use strict";QP();X3();t6();r6=e=>{let t=nW(e.output);return t!==null?{status:eA.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:e6(t)}:{status:e.exitCode===0?eA.COMPLETED:eA.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var lW,gZe,n6=l(()=>{"use strict";lW={OPEN:"open",APPROVAL:"approval"},gZe=lW.APPROVAL});var nl,tA,s6,Ede,i6,a6,l6,vu,cW,dW=l(()=>{"use strict";nl=m(require("node:fs")),tA=m(require("node:path")),s6="runs",Ede=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),i6=e=>{let t=e.profileEmail!==null?tA.default.join(e.installDir,"profiles",e.profileEmail,s6):tA.default.join(e.installDir,s6);return nl.default.mkdirSync(t,{recursive:!0}),t},a6=(e,t)=>tA.default.join(i6(e),`${t}.json`),l6=(e,t)=>{nl.default.writeFileSync(a6(e,t.id),JSON.stringify(t,null,2))},vu=(e,t)=>{let r=a6(e,t);if(!nl.default.existsSync(r))return null;try{let o=JSON.parse(nl.default.readFileSync(r,"utf8"));return!Ede(o)||typeof o.id!="string"?null:o}catch{return null}},cW=e=>{let t=i6(e),r=nl.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=vu(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var Rde,c6,d6=l(()=>{"use strict";o6();n6();dW();Rde=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=r6({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:lW.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},c6=(e,t)=>{let r=Rde(t);return l6(e,r),r}});var p6=l(()=>{"use strict";HS()});var u6,m6=l(()=>{"use strict";QP();u6=()=>[XP,`agentRunWriterExecutionBackend=${ZP}`,`agentRunWriterExecutionReasonCode=${sW}`].join(`
`)});var yn,rA=l(()=>{"use strict";yn=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var pW,Cde,vde,g6,f6=l(()=>{"use strict";pW=e=>e.toLocaleString("en-US"),Cde=e=>e<.01?e.toFixed(4):e.toFixed(3),vde=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${Cde(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${pW(e.inputTokens)} in / ${pW(e.outputTokens)} out (${pW(e.totalTokens)} total)`,t].join(`
`)},g6=(e,t)=>{if(t===void 0)return e;let r=vde(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var y6=l(()=>{"use strict";ee()});var S6,Lu,Le,uW,oA,h6,Lde,Ide,P6,A6,b6,Iu,mW,gW,fW,_6,xde,zt,xu,hn,k6,Wde,Ode,nA,yW,hW,SW,w6=l(()=>{"use strict";S6=require("node:child_process");ee();qt();p3();xp();$x();f3();mc();P3();zP();b3();bi();w3();UP();BP();VP();z3();rW();d6();p6();m6();rA();f6();_i();y6();bu();Fl();VP();Lu=new Map,Le=new Map,uW=new Set,oA=new Map,h6=e=>{e!==void 0&&!oA.has(e)&&oA.set(e,Date.now())},Lde=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(Dr(t)){zt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}Eo(t,n)},Ide=(e,t,r,o,n)=>{if(!X_(e,n))return;let s=`${u6()}
`;Lde(t,r,o,s);let i=Le.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},P6=130,A6=`

Stopped by user.`,b6=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:yn(e)},Iu=null,mW=e=>{Iu=e},gW=(e,t)=>{if(Iu===null)return;let r=fv(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||Xk(Iu,t,r)},fW=async e=>{await Bx({layout:e,cloudApi:Iu})},_6=e=>{let t=Lu.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Vt(t.pid)},xde=e=>Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),zt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},xu=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=pi(s),c=Le.get(r);if(a!==null&&c!==void 0){let d=IM(a),p=_6(r)||Yx(r);d!==null&&!p&&hn(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return LM(a)}}),hn=(e,t,r,o,n,s,i,a)=>{let c=Li(s,a),d=n,p=g6(c.output,c.llmUsage);if(r!==void 0){let f=oA.get(r);oA.delete(r),f!==void 0&&mv({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-f)/1e3))});let y=g3(c.llmUsage,p);y!==null&&hq({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:y})}r!==void 0&&uW.has(r)&&(uW.delete(r),d=P6,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${A6}`:"Stopped by user.");let g=r!==void 0?fv(e.layout.reportsDir,r):null;if(r!==void 0){wu(r),bc(e.layout,r),Dr(r)&&(zt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),T3(r));let f=Le.get(r);gq({reportsDir:e.layout.reportsDir,agentRunId:r,input:yn(i),output:p,...f!==void 0?{writerLabel:_u({writerAgent:f.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),f!==void 0&&NS({layout:e.layout,writerAgent:f.writerAgent,projectFolderPath:f.projectFolderPath,userPrompt:f.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),c6(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),S3(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),Bx({layout:e.layout,cloudApi:Iu}),Le.delete(r),Lu.delete(r),NP(e.layout,r)}zt(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),rc(e.layout)},k6=(e,t,r,o,n,s,i)=>{let a=Le.get(r),c=a?.accumulatedOutput??s;d3(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),qs(t,r,()=>zx(e.layout,r),xu(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),zt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},Wde=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=y=>{if(!(n===void 0||y.length===0)){if(Dr(n)){zt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:y},requestId:o});return}Eo(n,y)}};if(n!==void 0){let y=Le.get(n);Lu.set(n,t),Le.set(n,{originalPrompt:s,userTranscriptPrompt:y?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:y?.projectFolderPath,reportKey:y?.reportKey,accumulatedOutput:y?.accumulatedOutput??""}),zt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),qs(r,n,()=>_6(n),xu(e,r,n,o,y?.projectFolderPath,y?.reportKey))}let g=a==="claude-cli",f=[];t.stdout?.on("data",y=>{let P=y.toString("utf8");if(g?f.push(P):(c.push(P),p(P)),d||n===void 0)return;let h=Eu(c.join(""));if(h!==null){d=!0,t.kill("SIGTERM");let u=Le.get(n),S=[u?.accumulatedOutput??"",h.partialOutput].filter(b=>b.length>0).join(`

`);u!==void 0&&(u.accumulatedOutput=S),Lu.delete(n),k6(e,r,n,o,h.question,S,s)}}),t.stderr?.on("data",y=>{let P=y.toString("utf8");c.push(P),p(P)}),t.on("close",y=>{if(d)return;YP(a);let P=n!==void 0?Le.get(n):void 0,h=g?Li(f.join("")):{output:c.join("").trim(),llmUsage:void 0},u=g?c.join("").trim():"",S=[h.output.trim(),u].filter(k=>k.length>0).join(`
`);g&&h.output.trim().length>0&&p(h.output);let b=P!==void 0&&P.accumulatedOutput.length>0?`${P.accumulatedOutput}

${S}`.trim():S;hn(e,r,n,o,y??-1,b,s,h.llmUsage)}),t.on("error",y=>{d||hn(e,r,n,o,-1,y.message,s)})},Ode=(e,t,r,o,n,s,i,a,c)=>{let d=b6(r,c);s!==void 0&&(Le.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),zt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),qs(n,s,()=>Le.has(s),xu(e,n,s,o,i,a))),hc(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(Dr(s)){zt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}Eo(s,g)}}).then(g=>{YP(t),hn(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let f=g instanceof Error?g.message:String(g);hn(e,n,s,o,-1,f,r)})},nA=(e,t,r,o,n,s,i,a,c,d,p,g)=>{let f=b6(r,p);if(tc(e.layout),qn(e,t)){h6(s),Ode(e,t,r,o,n,s,c,d,f);return}let y=Pr(t,r,xde(e),i);if(y===null){hn(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}h6(s);let P=k3({workspace:e.workspace,projectFolderPath:c}),h=()=>{let u=(0,S6.spawn)(y.command,[...y.args],{cwd:P,stdio:["ignore","pipe","pipe"],env:g??process.env});Wde(e,u,n,o,s,r,f,t)};if(s===void 0){h();return}Le.set(s,{originalPrompt:r,userTranscriptPrompt:f,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:Le.get(s)?.accumulatedOutput??""}),Ide(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Hl({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),qs(n,s,()=>Le.has(s),xu(e,n,s,o,c,d)),F3({socket:n,sendMessage:zt,requestId:o,agentRunId:s,shellSessionId:a,command:y.command,args:y.args,cwd:P,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:u=>{a!==void 0&&rl(a,k=>{zt(n,k)},o);let S=Le.get(s),b=[S?.accumulatedOutput??"",u.partialOutput].filter(k=>k.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=b),k6(e,n,s,o,u.question,b,r)},onFinished:(u,S)=>{YP(t);let b=Li(S),k=Le.get(s),A=k!==void 0&&k.accumulatedOutput.length>0?`${k.accumulatedOutput}

${b.output}`.trim():b.output;hn(e,n,s,o,u,A,r,b.llmUsage)}}).then(u=>{if(!u){h();return}qs(n,s,()=>Yx(s),xu(e,n,s,o,c,d))}).catch(u=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",u instanceof Error?u.message:u),h()})},yW=(e,t,r,o)=>{NP(e.layout,t.agentRunId),t.shellSessionId!==void 0&&zt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=H3(t),s=Le.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;nA(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},hW=(e,t)=>{for(let r of c3(e.layout))Le.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:yn(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),qs(t,r.agentRunId,()=>zx(e.layout,r.agentRunId),{awaitingInput:!0}),zt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},SW=(e,t,r,o)=>{let n=Le.get(r);if(n===void 0)return!1;uW.add(r),wu(r);let s=Lu.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(M3(r))return!0;NP(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${A6}`:"Stopped by user.";return hn(e,t,r,o,P6,i,n.originalPrompt),!0}});var Mde,PW,T6=l(()=>{"use strict";Ec();Mde=()=>`http://127.0.0.1:${Jt()}/restart`,PW=async()=>{try{let e=await fetch(Mde(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var E6=l(()=>{"use strict";Pd()});var R6=l(()=>{"use strict";Bv()});var AW,C6=l(()=>{"use strict";AW=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Wu,jde,bW,_W,v6=l(()=>{"use strict";G();ae();E6();CT();R6();C6();_i();Wu=(e,t)=>{Xo(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},jde=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(m_(),u_)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},bW=e=>AW({localBundleVersion:Fe(e.installDir)?.bundleVersion??null,remoteBundleVersion:e.remoteBundleVersion}),_W=async e=>{let t=Fe(e.layout.installDir)?.bundleVersion??null;if(!AW({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(Kt(e.layout)){oc({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Wu(e.layout,{summary:r,action:"install-bundle-update-start"}),$r({launchAgentLabel:fe(e.layout.installDir),installDir:e.layout.installDir});let o=await Ha({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),Wu(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await jde();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Wu(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),Wu(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),Wu(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var Nde,kW,L6=l(()=>{"use strict";Nde=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kW=e=>{if(!Nde(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var wW,TW,I6=l(()=>{"use strict";dT();pT();wW=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=nd({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},TW=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await oo(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var x6,Dde,Hde,Fde,Ou,W6=l(()=>{"use strict";x6=m(require("node:os"));Xe();Dde="Default",Hde=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),Fde=e=>{let t=x6.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Ou=()=>{let e=N(),t=_l(e),r=Hde(Dde);return`${Fde(t)}/${r.length>0?r:"project"}`}});var O6=l(()=>{"use strict";Pd()});var M6,EW,j6=l(()=>{"use strict";O6();M6=!1,EW=e=>{M6||(M6=!0,process.on("uncaughtException",t=>{ds(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;ds(e,{kind:"crash",message:r,stack:o})}))}});var N6,zde,RW,D6=l(()=>{"use strict";N6=require("node:child_process");KP();qt();HP();DP();bu();FP();zde=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,N6.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},RW=async e=>{if(!we(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Ze(e.runConfig.writerExecutionBackend)==="api"){let r=_t(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Be(e.layout.configPath),n=ct(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Ro(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await zde(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var CW,H6=l(()=>{"use strict";CW=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var F6,vW,z6=l(()=>{"use strict";F6=require("node:crypto"),vW=()=>(0,F6.randomUUID)()});var sl,$6,sA=l(()=>{"use strict";sl="[[WORKING_ESTIMATE]]",$6=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",sl,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var U6,B6=l(()=>{"use strict";U6=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var $de,G6,V6=l(()=>{"use strict";sA();$de=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,G6=e=>{if(!e.includes(sl))return null;let t=null;for(let r of e.matchAll($de)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var Ude,LW,K6=l(()=>{"use strict";V6();Ude=/^(\d{1,6})\b/,LW=e=>{let t=G6(e);if(t!==null)return t;let r=Ude.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var Bde,Gde,Vde,iA,IW=l(()=>{"use strict";qt();yd();Bde="http://127.0.0.1:11434",Gde=45e3,Vde=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},iA=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Bde,o=t===void 0?(await Qt({commands:Te({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(Gde)});return n.ok?Vde(await n.json()):null}catch{return null}}});var xW,WW,OW,q6=l(()=>{"use strict";Fl();sA();rA();B6();K6();xp();IW();xW=async e=>{let t=yn(e.wrappedPrompt),r=fq(e.reportsDir);return{estimateOutput:await iA($6(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},WW=e=>{let t=LW(e.estimateOutput);t!==null&&LS({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},OW=e=>{let t=LW(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=U6(t);return Dl({reportKey:e.reportKey,agentRunId:e.agentRunId,status:fr.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),LS({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var aA,J6,MW=l(()=>{"use strict";aA="[[WORKING_TOKEN_ESTIMATE]]",J6=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",aA,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var Y6,Kde,X6,Z6=l(()=>{"use strict";MW();Y6=/^(\d{1,8})\b/,Kde=e=>{let t=e.indexOf(aA);if(t<0)return null;let r=e.slice(t+aA.length).trim(),o=Y6.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},X6=e=>{let t=Kde(e);if(t!==null)return t;let r=Y6.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var jW,NW,Q6=l(()=>{"use strict";MW();rA();Z6();xp();IW();jW=async e=>{let t=yn(e.wrappedPrompt),r=Sq(e.reportsDir);return{estimateOutput:await iA(J6(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},NW=e=>{let t=X6(e.estimateOutput);return t===null?null:(yq({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var eY=l(()=>{"use strict";jx();Q8();t3();s3();Ec();w6();KP();qt();dW();UP();T6();hT();v6();_i();L6();I6();zP();W6();j6();D6();ag();H6();z6();sA();Fl();q6();Q6();$x();yd();BP();rW()});var tY={};St(tY,{buildContinuationPromptWithContext:()=>Yde});var qde,Jde,Yde,rY=l(()=>{"use strict";qde=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Jde=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Yde=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=Jde(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${qde(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var oY={};St(oY,{readHarnessExportSets:()=>Zde});var Mu,DW,lA,Xde,Zde,nY=l(()=>{"use strict";Mu=m(require("node:fs")),DW=m(require("node:path"));Xe();lA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Xde=e=>{if(!Mu.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Mu.default.readFileSync(e.harnessManifestPath,"utf8"));if(lA(t))return t}catch{return null}return null},Zde=(e,t)=>{let r=N(t),o=Xde(r);if(o===null)return[];let n=lA(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!lA(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!lA(p))continue;let g=typeof p.path=="string"?p.path:void 0,f=typeof p.id=="string"?p.id:"",y=typeof p.kind=="string"?p.kind:"",P=typeof p.title=="string"?p.title:"";if(g===void 0||f.length===0||y.length===0||P.length===0)continue;let h=g.startsWith("shared/")?DW.default.join(r.harnessRootDir,g):DW.default.join(r.harnessSetsDir,i,g);Mu.default.existsSync(h)&&d.push({id:f,kind:y,title:P,content:Mu.default.readFileSync(h,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var GW,FW,il,sY,Qde,iY,aY,HW,lY,zW,$W,UW,te,J,BW,epe,ju,tpe,rpe,ope,npe,spe,ipe,ape,lpe,Nu,cY=l(()=>{"use strict";GW=require("node:child_process"),FW=m(require("node:fs")),il=m(require("node:os"));B8();G();ae();Gn();rx();q8();ee();VI();ee();Sr();Pd();jE();AP();HS();Wt();Bo();DT();Lt();eY();sY=3e4,Qde=3e4,iY=new Map,aY=new Map,HW=new Map,lY=new Map,zW=new Map,$W=new Map,UW=new Map,te=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),J=(e,t,r)=>{e.readyState===fu.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Xo(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),By(r,"out",t)))},BW=e=>e,epe=e=>{if(!FW.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(FW.default.readFileSync(e.harnessManifestPath,"utf8"));if(te(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},ju=(e,t)=>{let r=epe(t);r!==null&&J(e,{type:"harness.manifest.report",payload:{hostname:il.default.hostname(),manifest:r}})},tpe=async(e,t,r,o,n,s,i=!1,a,c,d,p,g)=>{let f=g?.trim()??"";if(!we(t)){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let y=_u({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),P=await Qt({commands:Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),h=s!==void 0?xW({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:P?.estimateModel,capabilityNote:P?.capabilityNote}).catch(()=>null):null,u=s!==void 0?jW({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:P?.estimateModel,capabilityNote:P?.capabilityNote}).catch(()=>null):null,S=Cu(t)&&!Zx(t);if(S){try{await Ro(e.layout.installDir,t)}catch(D){let Ie=D instanceof Error?D.message:String(D);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Ie}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Ru(t)}else if(!Cu(t))try{await Ro(e.layout.installDir,t)}catch(D){let Ie=D instanceof Error?D.message:String(D);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Ie}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let b=Pc(d,Ou,g);if(b===null){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}it({projectFolderPath:b,...f.length>0?{projectId:f}:{}}),i||Np(e.layout,t,b);let k=DS({sessionContinuation:i,supportsWriterSessionContinuation:qP(t),isWriterConversationStarted:JP(t)}),A=i&&k==="first"?jp(e.layout,t,b):null,_=A!==null?Da(e.layout,A):null,E=_!==null&&_.turns.length>0,T=Lv({sessionContinuation:i,supportsWriterSessionContinuation:qP(t),isWriterConversationStarted:JP(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:E,userPromptCharacterCount:r.length}),v=r;if(T.continuationStrategy==="source_run_seed"){let D=typeof c=="string"&&c.length>0?vu(e.layout,c):null;if(D!==null){let{buildContinuationPromptWithContext:Ie}=await Promise.resolve().then(()=>(rY(),tY));v=Ie({priorPrompt:D.prompt,priorOutput:D.resultOutput??"",userMessage:r})}}else T.continuationStrategy==="transcript_seed"&&_!==null&&_.turns.length>0&&(v=WS({priorTurns:_.turns,userMessage:r}));let I=T.ragLimit>0?await la({layout:e.layout,query:v,limit:T.ragLimit,minScore:T.ragMinScore,projectFolderPath:b,...f.length>0?{projectId:f}:{}}):[],W=T.ragLimit>0&&b.trim().length>0?await OE({layout:e.layout,query:v,limit:2,minScore:.32,projectFolderPath:b,...f.length>0?{projectId:f}:{}}):[],j=T.injectMemory?Av(e.layout,b,f.length>0?f:void 0):[],M=`${_v(j,T.memoryEntryLimit)}${IE(I)}${ME(W)}${v}`,B=p?.trim()??(s!==void 0&&b.trim().length>0?vW():void 0);if(s!==void 0&&B!==void 0&&B.length>0&&b.trim().length>0){Hl({reportKey:B,agentRunId:s,userSummary:"Working on your Mac\u2026"});let D=M;h!==null&&h.then(Ie=>{if(Ie===null)return;let Sn=OW({estimateOutput:Ie.estimateOutput??"",reportKey:B,agentRunId:s,reportsDir:e.layout.reportsDir,task:Ie.task,writerLabel:Ie.writerLabel,embedding:Ie.embedding});if(Sn.estimateSeconds===null)return;gW(e.layout.reportsDir,s);let Pn=`${sl}
${Sn.estimateSeconds}
`;if(Dr(s)){J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Pn},requestId:o});return}Eo(s,Pn)}).catch(()=>{}),M=CW(D),M=Cb(M,{agentRunId:s,reportKey:B,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&h!==null&&h.then(D=>{D!==null&&WW({estimateOutput:D.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:D.task,writerLabel:D.writerLabel,embedding:D.embedding})}).catch(()=>{}),s!==void 0&&u!==null&&u.then(D=>{D!==null&&NW({estimateOutput:D.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:D.task,writerLabel:D.writerLabel})}).catch(()=>{});let ie=s!==void 0&&UW.get(s)===!0;if(s!==void 0&&b.trim().length>0){let D=await Jf(b);$W.set(s,D),B!==void 0&&B.length>0&&zW.set(s,B)}nA(e,t,M,o,BW(n),s,{sessionTurn:T.sessionTurn},a,b,B,r,V_(e.layout,s,ie)),S&&s!==void 0&&J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:eW(t)},requestId:o})},rpe=async(e,t,r,o,n)=>{let s=(i,a)=>{J(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await tW({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,J(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=we(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?ol(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},ope=(e,t,r)=>new Promise(o=>{if(!we(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Pr(t,r,Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,GW.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),npe=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;J(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=_r(t.bundle),s=te(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=ze(e.wsUrl)??bt,g=await xk({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=Zn({bundle:i,layout:e.layout});return J(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&ju(o,e.layout),!0},spe=async(e,t,r,o)=>{if(await npe(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(J(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!we(n)){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}tc(e.layout);let i=await(async()=>{try{await Ro(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return ope(e,n,s)})().finally(()=>{rc(e.layout)});J(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),ju(o,e.layout)},ipe=e=>{let t=1e3*2**e;return Math.min(Qde,t)},ape=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>t.restartInFlight?"already_in_progress":Kt(e.layout)?(nc(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`),"deferred_writer_busy"):(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,PW().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1}),"accepted"),o=(u,S,b,k)=>{J(u,{type:"device.restart.ack",payload:tk({status:b,reason:S}),...k!==void 0?{requestId:k}:{}},e.layout)},n=(u,S="system.ack")=>{if(!t.selfUpdateInFlight&&bW({installDir:e.layout.installDir,remoteBundleVersion:u})){if(Kt(e.layout)){oc({layout:e.layout,remoteBundleVersion:u,trigger:S}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${S}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,_W({layout:e.layout,remoteBundleVersion:u,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1})}},s=()=>{let u=ve(e.layout);u!==null&&$e(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,c(),d(),P())},i=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},a=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},c=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},d=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===fu.OPEN||u.readyState===fu.CONNECTING)&&u.close()},p=()=>{a(),t.localHealthTimer=setInterval(s,sY)},g=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=ipe(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,P()},u)},f=u=>{i();let S=()=>{let b=Jl(e.layout.installDir),k=Jt();J(u,{type:"agent.heartbeat",payload:{hostname:il.default.hostname(),macOsUsername:il.default.userInfo().username,wakeError:t.wakeError,wakePort:k,...e.email!==null?{email:e.email}:{},installBundleVersion:b}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,sY)},y=(u,S)=>{if(typeof u.type!="string")return;if(NT(u)){t.stopped=!0,i(),c(),d(),OT({layout:e.layout}).finally(()=>{yu(),process.exit(0)});return}Xo(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),By(e.layout,"in",u);let b=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&te(u.payload)){let k=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",A=typeof u.payload.origin=="string"?u.payload.origin:"",_=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",E=typeof u.payload.challenge=="string"?u.payload.challenge:"",T=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!tx({serverPublicKey:k,origin:A,devicePublicKey:_,challenge:E,serverAttestation:T})){t.wakeError="Server attestation verification failed",Xo(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&te(u.payload)){let k=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";Xo(e.layout,{direction:"local",type:"writer.ensure",summary:k,action:"ensure-writer"}),RW({layout:e.layout,writerAgent:k,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(A=>{J(S,{type:"writer.status",payload:A},e.layout)})}if(u.type==="install.bundle.update"&&te(u.payload)){let k=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";k.length>0&&n(k,"install.bundle.update")}if(u.type==="system.ack"){Og(e.layout,{wsUrl:e.wsUrl});let k=te(u.payload)?u.payload:null,A=kW(k);A!==null&&n(A)}if(u.type==="device.restart"){let k=r("cloud-device-restart");o(S,"cloud-device-restart",k,b)}if(u.type==="automations.sync"&&te(u.payload)&&wW(u.payload),u.type==="project.message.history"&&te(u.payload)){CL({payload:u.payload});return}if(u.type==="automations.run"&&te(u.payload)&&TW(u.payload),u.type==="terminal.stream.accepted"&&te(u.payload)){let k=typeof u.payload.runId=="string"?u.payload.runId:"";if(k.length>0){let A=Kx(k);for(let _ of A)J(S,{type:"terminal.stream.chunk",payload:{runId:k,chunk:_},requestId:b})}}if(u.type==="agent.agentRun.list"&&J(S,{type:"dashboard.agentRun.list.result",payload:{runs:cW(e.layout)},requestId:b}),u.type==="agent.agentRun.get"&&te(u.payload)){let k=typeof u.payload.runId=="string"?u.payload.runId:"",A=k.length>0?vu(e.layout,k):null;J(S,{type:"dashboard.agentRun.get.result",payload:{run:A},requestId:b})}if(u.type==="command.claude.run"&&te(u.payload)){let k=u.payload.prompt,A=typeof u.payload.writerAgent=="string"&&we(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",_=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,E=u.payload.sessionContinuation===!0,T=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,v=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,I=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,W=Pc(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,Ou,I),j=H_(u.payload.compositionSnapshot),M=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof k=="string"&&k.trim().length>0){if(console.log(`[agent-witch] Running ${A} task (${E?"continue":"first"})\u2026`),W===null){J(S,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(j!==null){let B=z_(e.layout,j);if(B!==null){J(S,{type:"command.claude.result",payload:{exitCode:-1,output:B,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(_!==void 0){let ie=U_(e.layout,_,j);if(!ie.ok){J(S,{type:"command.claude.result",payload:{exitCode:-1,output:ie.errorMessage,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}UW.set(_,j.entries.some(D=>D.scope==="run"))}}_!==void 0&&v!==void 0&&iY.set(_,v),_!==void 0&&(aY.set(_,W),I!==void 0&&I.trim().length>0&&HW.set(_,I.trim()),lY.set(_,k.trim()),it({projectFolderPath:W,...I!==void 0&&I.trim().length>0?{projectId:I.trim()}:{}})),tpe(e,A,k.trim(),b,S,_,E,v,T,W,M,I)}}if(u.type==="shell.session.open"&&te(u.payload)){let k=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",A=typeof u.payload.cols=="number"?u.payload.cols:120,_=typeof u.payload.rows=="number"?u.payload.rows:32;k.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),Xx({shellSessionId:k,cwd:e.workspace,cols:A,rows:_,send:E=>{J(S,E)},requestId:b}))}if(u.type==="shell.session.close"&&te(u.payload)){let k=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";k.length>0&&rl(k,A=>{J(S,A)},b)}if(u.type==="shell.input"&&te(u.payload)){let k=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",A=typeof u.payload.data=="string"?u.payload.data:"";k.length>0&&A.length>0&&qx(k,A)}if(u.type==="shell.resize"&&te(u.payload)){let k=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",A=typeof u.payload.cols=="number"?u.payload.cols:0,_=typeof u.payload.rows=="number"?u.payload.rows:0;k.length>0&&A>0&&_>0&&Jx(k,A,_)}if(u.type==="command.writer.session.end"&&te(u.payload)){let k=u.payload.writerAgent;typeof k=="string"&&we(k)&&(Qx(k),jS(e.layout,k))}if(u.type==="command.writer.session.start"&&te(u.payload)){let k=u.payload.writerAgent,A=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof k=="string"&&we(k)&&A.length>0&&(console.log(`[agent-witch] Starting ${k} session\u2026`),rpe(e,k,A,b,S))}if(u.type==="command.claude.stop"&&te(u.payload)){let k=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";k.length>0&&(console.log(`[agent-witch] Stopping run ${k}\u2026`),SW(e,BW(S),k,b))}if(u.type==="command.claude.input_respond"&&te(u.payload)){let k=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",A=typeof u.payload.response=="string"?u.payload.response.trim():"",_=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",E=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",T=typeof u.payload.question=="string"?u.payload.question:"";k.length>0&&A.length>0&&_.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),yW(e,{agentRunId:k,originalPrompt:_,partialOutput:E,question:T,response:A,shellSessionId:iY.get(k)},b,BW(S)))}if(u.type==="dispatch.approval.required"&&te(u.payload)){let k=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",A=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${k}: ${A}`),process.platform==="darwin"&&(0,GW.spawn)("osascript",["-e",`display notification "${A.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${k.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&te(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),spe(e,u.payload,b,S)),u.type==="harness.export.request"&&te(u.payload)){let k=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",A=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,_=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(E=>typeof E=="string"):[];k.length>0&&_.length>0&&(async()=>{let{readHarnessExportSets:E}=await Promise.resolve().then(()=>(nY(),oY)),T=E(_,e.email);J(S,{type:"harness.export.result",payload:{success:T.length>0,borrowerUserId:k,...A!==void 0?{targetDeviceId:A}:{},sets:T,errorMessage:T.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(u.type==="harness.manifest.request"&&ju(S,e.layout),u.type==="command.claude.result"&&te(u.payload)){let k=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,A=typeof u.payload.output=="string"?u.payload.output:"",_=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,E=Pc(k!==void 0?aY.get(k):void 0,Ou),T=k!==void 0?HW.get(k):void 0,v=k!==void 0?lY.get(k)??"":"",I=Pw({exitCode:_,output:A});if(I&&E!==null&&LE({layout:e.layout,text:A,source:k??"command.claude.result",projectFolderPath:E,...T!==void 0?{projectId:T}:{}}),_!=null&&_!==0&&A.trim().length>0&&E!==null&&(TE({layout:e.layout,errorText:A,projectFolderPath:E,...T!==void 0?{projectId:T}:{}}),WE({layout:e.layout,text:A,source:k??"command.claude.result.failure",projectFolderPath:E,...T!==void 0?{projectId:T}:{}})),I&&v.trim().length>0&&E!==null&&bv({layout:e.layout,projectFolderPath:E,...T!==void 0?{projectId:T}:{},entry:{id:`${Date.now()}-${k??"run"}`,...k!==void 0?{agentRunId:k}:{},prompt:v,output:A,createdAt:new Date().toISOString()}}),k!==void 0&&E!==null){let j=zW.get(k),M=$W.get(k);j!==void 0&&M!==void 0&&Jf(E).then(B=>{let ie=kw({before:M,after:B});vb(j,ie),$W.delete(k),zW.delete(k)})}if(I&&T!==void 0&&T.trim().length>0){let j=z(),M=j===null?null:V({wsUrl:j.wsUrl,pairingToken:j.pairingToken});M!==null&&Tw(M,T,{...k!==void 0?{sourceRunId:k}:{},lesson:ww({prompt:v,output:A})})}k!==void 0&&(bc(e.layout,k),UW.delete(k),HW.delete(k))}},P=()=>{if(t.stopped)return;c(),d();let u=new fu(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),mW(V({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),fW(e.layout);let S=ze(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),k=ex({layout:e.layout,origin:S,...b!==void 0&&b.length>0?{claimToken:b}:{}});J(u,{type:"agent.register",payload:{role:"agent",hostname:il.default.hostname(),macOsUsername:il.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...k}},e.layout),ju(u,e.layout),hW(e,u),f(u)}),u.on("message",S=>{let b=typeof S=="string"?S:S.toString("utf8");try{let k=JSON.parse(b);if(!te(k))return;y(k,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(S,b)=>{i(),t.socket=void 0,t.wsConnected=!1,f_(e.layout),t.reconnectAttempt+=1;let k=typeof b=="string"?b:b.toString("utf8");ds(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:k}),console.log("[agent-witch] Disconnected from server."),g()}),u.on("error",S=>{t.wakeError=S.message,ds(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})},h=()=>{t.stopped=!0,i(),a(),c(),d()};return i_(()=>{let u=a_();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&n(u.remoteBundleVersion,u.trigger);let S=l_();S!==null&&r(S)}),{connect:P,startLocalHealthCheck:p,stop:h,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:dc(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:au(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,P()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(ju(u,e.layout),{ok:!0})}}},lpe=async()=>{Pt("agent-witch");let e=Ix(),t=C();Mx().ok||(process.platform==="darwin"?(await xn(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),Hx(t);let o=Dx({installDir:t});if(o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"){$r({launchAgentLabel:fe(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067).");try{let P=Wl({launchAgentPrefix:fe(t),wakePort:wl(t)});P.length>0&&console.log(`[agent-witch] Synced AGENT_WITCH_WAKE_PORT to wake-port.json in ${String(P.length)} LaunchAgent plist(s).`)}catch(P){console.error(`[agent-witch] Could not sync LaunchAgent wake port: ${P instanceof Error?P.message:String(P)}`)}vl()}let n=await ek(),s=n[0];s!==void 0&&EW(s.layout);for(let y of n){let P=ze(y.wsUrl)??bt;Yl(y.layout.installDir,P)}let i=n.map(y=>ape(y)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),yu(),process.exit(0));let c=()=>{n.forEach((y,P)=>{let h=i[P];if(h===void 0)return;let u=ve(y.layout);y_(u,{socketOpen:h.hasMacSocketOpen(),staleAfterMs:12e4})&&h.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let y=n[0]?.layout;y!==void 0&&(Kt(y)||ld(y.installDir))},g=await Fx({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):iu({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let y of i)y.startLocalHealthCheck(),y.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let f=Ur(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Ll(),d()});d=()=>{f(),g.stop(),yu(),console.log("[agent-witch] Shutting down.");for(let y of i)y.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Nu=lpe});var VW=l(()=>{"use strict";cY()});var dY={};St(dY,{startAgentWitchClient:()=>Nu});var pY=l(()=>{"use strict";VW();VW();On();Lb();cg();if(!At()&&Mn(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(lg(process.argv.slice(e))),Nu()}});Eb();Lb();On();cg();var OM="20.x",MM="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var sQ=e=>[`Node.js ${OM} or newer is required (found ${e}).`,MM].join(" "),jM=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${sQ(process.version)}
`),process.exit(1))};hg();var cpe=async()=>{Pt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(m_(),u_)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},dpe=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(Kz(),Vz)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},ppe=async e=>{try{if(e===mg){let{resolveAgentWitchLocalLayout:t}=await Promise.resolve().then(()=>(G(),ub)),{runCheckContextHookCli:r}=await Promise.resolve().then(()=>(td(),UF));await r({layout:t()})}else process.stderr.write(`[agent-witch] ${fi}: unknown hook ${e??"(none)"}
`)}catch(t){let r=t instanceof Error?t.message:String(t);process.stderr.write(`[agent-witch] ${fi}: ${r}
`)}await new Promise(t=>{process.stdout.write("",()=>t())}),process.exit(0)},upe=async()=>{if(!Mn(At()?void 0:__agentWitchImportMetaUrl))return;process.argv[2]===fi&&await ppe(process.argv[3]),jM();let e=process.argv.indexOf("report");e>=0&&process.exit(lg(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await cpe();return}if(t==="wake"){await dpe();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(q$(),K$));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(H4(),D4));o();return}if(t==="mcp"){let{resolveAgentWitchLocalLayout:o}=await Promise.resolve().then(()=>(G(),ub)),{runAwlMcpStdio:n}=await Promise.resolve().then(()=>(pv(),sq));await n({layout:o()});return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(pY(),dY));await r()};upe();
