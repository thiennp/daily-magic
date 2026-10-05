#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var c2=Object.create;var Ih=Object.defineProperty;var d2=Object.getOwnPropertyDescriptor;var u2=Object.getOwnPropertyNames;var p2=Object.getPrototypeOf,m2=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var v=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Ft=(e,t)=>{for(var r in t)Ih(e,r,{get:t[r],enumerable:!0})},g2=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of u2(t))!m2.call(e,n)&&n!==r&&Ih(e,n,{get:()=>t[n],enumerable:!(o=d2(t,n))||o.enumerable});return e};var g=(e,t,r)=>(r=e!=null?c2(p2(e)):{},g2(t||!e||!e.__esModule?Ih(r,"default",{value:e,enumerable:!0}):r,e));var Oi,nC,sC,Mi,Oh,kQ,iC,kd,Ut,pr,Cd,Ld,Vn,Kn,ot,Mh,Ed,Wd,Rd,Ni,wt,Jn,Yn,xd,Jr,Nh,aC,Me=l(()=>{"use strict";Oi={production:".agent-witch",localhost:".local-agent-witch"},nC={production:47892,localhost:47893},sC={production:"com.agent-witch",localhost:"com.local-agent-witch"},Mi={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Oh="app",kQ=`${Oh}/agent-witch.js`,iC=`${Oh}/command`,kd={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Ut=Oi.production,pr=Oi.localhost,Cd=nC.production,Ld=nC.localhost,Vn=sC.production,Kn=sC.localhost,ot="profiles",Mh=Mi.activeProfile,Ed="harness",Wd="sets",Rd="manifest.json",Ni=kd.projectsDir,wt=kd.logsDir,Jn="agent-witch.log",Yn="agent-witch.error.log",xd=kd.reportsDir,Jr=kd.deviceKeypairJson,Nh=Oh,aC="agent-witch.js"});var lC=l(()=>{"use strict";Me()});var cC,Eo,Di,Id=l(()=>{"use strict";cC=g(require("node:path"));Me();Eo=e=>cC.default.basename(e)===pr,Di=e=>Eo(e)?Kn:Vn});var dC=l(()=>{"use strict";lC();Id()});var uC,Dh,f2,zi,h2,y2,pC,S2,A2,mC=l(()=>{"use strict";dC();Me();uC=g(require("node:os")),Dh=g(require("node:path")),f2=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?Dh.default.resolve(e):Dh.default.join(uC.default.homedir(),Ut)},zi=Di(f2()),h2=`${zi}-wake`,y2=`${zi}-live`,pC=`${zi}-watchdog`,S2=`${zi}-automation-scheduler`,A2=`${zi}-updater`});var Xn=v(zh=>{"use strict";Object.defineProperty(zh,"__esModule",{value:!0});zh.stringify=b2;function b2(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=v(jh=>{"use strict";Object.defineProperty(jh,"__esModule",{value:!0});jh.generateTypeGuardError=P2;var gC=Xn();function P2(e,t,r){return(0,gC.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,gC.stringify)(e)}) to be "${r}"`}});var Yr=v(Od=>{"use strict";Object.defineProperty(Od,"__esModule",{value:!0});Od.isNonNullObject=void 0;var _2=O(),w2=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,_2.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Od.isNonNullObject=w2});var Bt=v(be=>{"use strict";Object.defineProperty(be,"__esModule",{value:!0});be.attachTypeGuardMeta=be.isArrayTypeGuard=be.isNestedObjectTypeGuard=be.getTypeGuardWrapperKind=be.getTypeGuardInnerGuard=be.getTypeGuardItemGuard=be.getTypeGuardSchema=void 0;var v2=e=>e.schema;be.getTypeGuardSchema=v2;var T2=e=>e.itemGuard;be.getTypeGuardItemGuard=T2;var k2=e=>e.innerGuard;be.getTypeGuardInnerGuard=k2;var C2=e=>e.wrapperKind;be.getTypeGuardWrapperKind=C2;var L2=e=>{if((0,be.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};be.isNestedObjectTypeGuard=L2;var E2=e=>{if((0,be.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};be.isArrayTypeGuard=E2;var W2=(e,t)=>Object.assign(e,t);be.attachTypeGuardMeta=W2});var ji=v(Wo=>{"use strict";Object.defineProperty(Wo,"__esModule",{value:!0});Wo.getExpectedTypeName=Wo.getTypeGuardDisplayName=void 0;var fC=Bt(),R2=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};Wo.getTypeGuardDisplayName=R2;var x2=e=>{let t=(0,fC.getTypeGuardWrapperKind)(e),r=(0,fC.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,Wo.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};Wo.getExpectedTypeName=x2});var Ro=v(Md=>{"use strict";Object.defineProperty(Md,"__esModule",{value:!0});Md.createValidationResult=void 0;var I2=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Md.createValidationResult=I2});var Zn=v(Nd=>{"use strict";Object.defineProperty(Nd,"__esModule",{value:!0});Nd.createValidationError=void 0;var O2=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Nd.createValidationError=O2});var Qn=v(Dd=>{"use strict";Object.defineProperty(Dd,"__esModule",{value:!0});Dd.createTreeNode=void 0;var M2=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Dd.createTreeNode=M2});var $i=v(zd=>{"use strict";Object.defineProperty(zd,"__esModule",{value:!0});zd.combineResults=void 0;var N2=Ro(),D2=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,N2.createValidationResult)(r,o,n)};zd.combineResults=D2});var $d=v(jd=>{"use strict";Object.defineProperty(jd,"__esModule",{value:!0});jd.createSimplifiedTree=void 0;var hC=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=hC(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},z2=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=hC(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};jd.createSimplifiedTree=z2});var Fi=v(Fd=>{"use strict";Object.defineProperty(Fd,"__esModule",{value:!0});Fd.validateObject=void 0;var j2=Yr(),Hi=Ro(),$2=Zn(),Hd=Qn(),H2=$i(),yC=Ud(),F2=(e,t,r)=>{let o=()=>{let i=(0,$2.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Hd.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Hi.createValidationResult)(!1,[],a):(0,Hi.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Hi.createValidationResult)(!0,[],(0,Hd.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...u]=c,m=d,S=t[m],h=e[m],y=(0,yC.validateProperty)(m,h,S,r);return y.valid?u.length===0?(0,Hi.createValidationResult)(!0,[],(0,Hd.createTreeNode)(r.path,!0,"object",e)):a(u):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let u=t[d];return(0,yC.validateProperty)(d,e[d],u,r)}),a=(0,H2.combineResults)(i,r.path),c=(0,Hd.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let u=d.tree.path.split(".").pop()||"unknown";c.children[u]=d.tree}}),(0,Hi.createValidationResult)(a.valid,a.errors,c)};return(0,j2.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};Fd.validateObject=F2});var AC=v(qd=>{"use strict";Object.defineProperty(qd,"__esModule",{value:!0});qd.validateArray=void 0;var U2=Xn(),Bd=Ro(),SC=Zn(),Gd=Qn(),B2=$i(),G2=Fi(),q2=ji(),V2=Bt(),K2=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,SC.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,Gd.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,Bd.createValidationResult)(!1,[c],d)}let n=(0,V2.getTypeGuardSchema)(t),s=e.map((c,d)=>{let u=`${o}[${d}]`,m={path:u,config:r.config||null};if(n)return(0,G2.validateObject)(c,n,m);let S=t(c,null),h=(0,q2.getExpectedTypeName)(t),y=(0,U2.stringify)(c);if(S)return(0,Bd.createValidationResult)(!0,[],(0,Gd.createTreeNode)(u,!0,h,c));let p=y.length>200?`Expected ${u} to be "${h}"`:`Expected ${u} (${y}) to be "${h}"`,b=(0,SC.createValidationError)(u,h,c,p),A=(0,Gd.createTreeNode)(u,!1,h,c);return A.errors=[b],(0,Bd.createValidationResult)(!1,[b],A)}),i=(0,B2.combineResults)(s,o),a=(0,Gd.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,Bd.createValidationResult)(i.valid,i.errors,a)};qd.validateArray=K2});var Ud=v(Kd=>{"use strict";Object.defineProperty(Kd,"__esModule",{value:!0});Kd.validateProperty=void 0;var bC=Ro(),J2=Zn(),PC=Qn(),Y2=ji(),Vd=Bt(),X2=Fi(),Z2=AC(),Q2=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,Vd.getTypeGuardSchema)(r),c=(0,Vd.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,X2.validateObject)(t,a,s);if(c&&(0,Vd.isArrayTypeGuard)(r))return(0,Z2.validateArray)(t,c,s)}let d=u=>{let m=r(t,u),S=(0,Y2.getExpectedTypeName)(r);return m?(0,bC.createValidationResult)(!0,[],(0,PC.createTreeNode)(n,!0,S,t)):(()=>{let h=(0,J2.createValidationError)(n,S,t,`Expected ${n} (${JSON.stringify(t)}) to be "${S}"`),y=(0,PC.createTreeNode)(n,!1,S,t);return y.errors=[h],(0,bC.createValidationResult)(!1,[h],y)})()};if((0,Vd.isNestedObjectTypeGuard)(r)){let u=o.config?{...o.config,identifier:n}:null;return d(u)}return d(null)};Kd.validateProperty=Q2});var Yd=v(Jd=>{"use strict";Object.defineProperty(Jd,"__esModule",{value:!0});Jd.isNil=void 0;var e5=O(),t5=function(e,t){return e!=null?(t&&t.callbackOnError((0,e5.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Jd.isNil=t5});var $h=v(Xd=>{"use strict";Object.defineProperty(Xd,"__esModule",{value:!0});Xd.isDefined=void 0;var r5=O(),o5=Yd(),n5=function(e,t){return(0,o5.isNil)(e,null)?(t&&t.callbackOnError((0,r5.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Xd.isDefined=n5});var Hh=v(Zd=>{"use strict";Object.defineProperty(Zd,"__esModule",{value:!0});Zd.reportValidationResults=void 0;var s5=$d(),_C=$h(),i5=Yd(),a5=(e,t)=>{if(e.valid===!0||(0,i5.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,_C.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,s5.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,_C.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Zd.reportValidationResults=a5});var Fh=v(ne=>{"use strict";Object.defineProperty(ne,"__esModule",{value:!0});ne.Validation=ne.reportValidationResults=ne.validateObject=ne.validateProperty=ne.createSimplifiedTree=ne.combineResults=ne.createTreeNode=ne.createValidationError=ne.createValidationResult=ne.getExpectedTypeName=void 0;var l5=ji();Object.defineProperty(ne,"getExpectedTypeName",{enumerable:!0,get:function(){return l5.getExpectedTypeName}});var c5=Ro();Object.defineProperty(ne,"createValidationResult",{enumerable:!0,get:function(){return c5.createValidationResult}});var d5=Zn();Object.defineProperty(ne,"createValidationError",{enumerable:!0,get:function(){return d5.createValidationError}});var u5=Qn();Object.defineProperty(ne,"createTreeNode",{enumerable:!0,get:function(){return u5.createTreeNode}});var p5=$i();Object.defineProperty(ne,"combineResults",{enumerable:!0,get:function(){return p5.combineResults}});var m5=$d();Object.defineProperty(ne,"createSimplifiedTree",{enumerable:!0,get:function(){return m5.createSimplifiedTree}});var g5=Ud();Object.defineProperty(ne,"validateProperty",{enumerable:!0,get:function(){return g5.validateProperty}});var f5=Fi();Object.defineProperty(ne,"validateObject",{enumerable:!0,get:function(){return f5.validateObject}});var h5=Hh();Object.defineProperty(ne,"reportValidationResults",{enumerable:!0,get:function(){return h5.reportValidationResults}});var y5=Ro(),S5=$i(),A5=Zn(),b5=Qn(),P5=Ud(),_5=Fi(),w5=Hh(),v5=$d();ne.Validation={result:y5.createValidationResult,combine:S5.combineResults,error:A5.createValidationError,treeNode:b5.createTreeNode,property:P5.validateProperty,object:_5.validateObject,report:w5.reportValidationResults,createSimplifiedTree:v5.createSimplifiedTree}});var Qd=v(Uh=>{"use strict";Object.defineProperty(Uh,"__esModule",{value:!0});Uh.isType=k5;var wC=Yr(),vC=Fh(),T5=Bt();function k5(e){if(!(0,wC.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,vC.validateObject)(r,e,s);return(0,vC.reportValidationResults)(i,o||null),i.valid}return(0,wC.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,T5.attachTypeGuardMeta)(t,{schema:e})}});var LC=v(xo=>{"use strict";Object.defineProperty(xo,"__esModule",{value:!0});xo.isNestedType=xo.isShape=void 0;xo.isSchema=Ui;var TC=Yr(),kC=Fh(),CC=Bt();function Ui(e){if(!(0,TC.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=L5(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,kC.validateObject)(o,t,i);return(0,kC.reportValidationResults)(a,n||null),a.valid}return(0,TC.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,CC.attachTypeGuardMeta)(r,{schema:t})}function C5(e){return typeof e=="function"?e:Array.isArray(e)?E5(e):typeof e=="object"&&e!==null?Ui(e):e}function L5(e){let t={};for(let[r,o]of Object.entries(e))t[r]=C5(o);return t}function E5(e){let t=e[0],r=Ui(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,CC.attachTypeGuardMeta)(o,{itemGuard:r})}xo.isShape=Ui;xo.isNestedType=Ui});var EC=v(Bh=>{"use strict";Object.defineProperty(Bh,"__esModule",{value:!0});Bh.isObjectWith=R5;var W5=Qd();function R5(e){return(0,W5.isType)(e)}});var WC=v(Gh=>{"use strict";Object.defineProperty(Gh,"__esModule",{value:!0});Gh.isObject=I5;var x5=Qd();function I5(e){return(0,x5.isType)(e)}});var RC=v(qh=>{"use strict";Object.defineProperty(qh,"__esModule",{value:!0});qh.guardWithTolerance=O5;function O5(e,t,r){return t(e,r),e}});var xC=v(Vh=>{"use strict";Object.defineProperty(Vh,"__esModule",{value:!0});Vh.isBranded=N5;var M5=O();function N5(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,M5.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var IC=v(eu=>{"use strict";Object.defineProperty(eu,"__esModule",{value:!0});eu.BrandSymbols=void 0;eu.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var OC=v(tu=>{"use strict";Object.defineProperty(tu,"__esModule",{value:!0});tu.isAny=void 0;var D5=function(e){return!0};tu.isAny=D5});var Bi=v(Kh=>{"use strict";Object.defineProperty(Kh,"__esModule",{value:!0});Kh.reportTypeGuardError=j5;var z5=O();function j5(e,t,r){e&&e.callbackOnError((0,z5.generateTypeGuardError)(t,e.identifier,r))}});var MC=v(ru=>{"use strict";Object.defineProperty(ru,"__esModule",{value:!0});ru.isBoolean=void 0;var $5=Bi(),H5=function(t,r){return typeof t!="boolean"?((0,$5.reportTypeGuardError)(r,t,"boolean"),!1):!0};ru.isBoolean=H5});var NC=v(ou=>{"use strict";Object.defineProperty(ou,"__esModule",{value:!0});ou.isDate=void 0;var F5=O(),U5=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,F5.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};ou.isDate=U5});var Jh=v(nu=>{"use strict";Object.defineProperty(nu,"__esModule",{value:!0});nu.isNumber=void 0;var B5=Bi(),G5=function(t,r){return typeof t!="number"||isNaN(t)?((0,B5.reportTypeGuardError)(r,t,"number"),!1):!0};nu.isNumber=G5});var DC=v(su=>{"use strict";Object.defineProperty(su,"__esModule",{value:!0});su.isString=void 0;var q5=Bi(),V5=function(t,r){return typeof t!="string"?((0,q5.reportTypeGuardError)(r,t,"string"),!1):!0};su.isString=V5});var zC=v(iu=>{"use strict";Object.defineProperty(iu,"__esModule",{value:!0});iu.isUnknown=void 0;var K5=function(e){return!0};iu.isUnknown=K5});var jC=v(au=>{"use strict";Object.defineProperty(au,"__esModule",{value:!0});au.isFunction=void 0;var J5=O(),Y5=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,J5.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};au.isFunction=Y5});var HC=v(lu=>{"use strict";Object.defineProperty(lu,"__esModule",{value:!0});lu.isFile=void 0;var $C=O(),X5=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,$C.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,$C.generateTypeGuardError)(e,t.identifier,"File")),!1)};lu.isFile=X5});var UC=v(cu=>{"use strict";Object.defineProperty(cu,"__esModule",{value:!0});cu.isFileList=void 0;var FC=O(),Z5=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,FC.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,FC.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};cu.isFileList=Z5});var GC=v(du=>{"use strict";Object.defineProperty(du,"__esModule",{value:!0});du.isBlob=void 0;var BC=O(),Q5=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,BC.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,BC.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};du.isBlob=Q5});var VC=v(uu=>{"use strict";Object.defineProperty(uu,"__esModule",{value:!0});uu.isFormData=void 0;var qC=O(),eq=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,qC.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,qC.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};uu.isFormData=eq});var JC=v(pu=>{"use strict";Object.defineProperty(pu,"__esModule",{value:!0});pu.isURL=void 0;var KC=O(),tq=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,KC.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,KC.generateTypeGuardError)(e,t.identifier,"URL")),!1)};pu.isURL=tq});var XC=v(mu=>{"use strict";Object.defineProperty(mu,"__esModule",{value:!0});mu.isURLSearchParams=void 0;var YC=O(),rq=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,YC.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,YC.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};mu.isURLSearchParams=rq});var ZC=v(gu=>{"use strict";Object.defineProperty(gu,"__esModule",{value:!0});gu.isMap=void 0;var oq=O(),nq=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,oq.generateTypeGuardError)(e,t.identifier,"Map")),!1)};gu.isMap=nq});var QC=v(fu=>{"use strict";Object.defineProperty(fu,"__esModule",{value:!0});fu.isSet=void 0;var sq=O(),iq=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,sq.generateTypeGuardError)(e,t.identifier,"Set")),!1)};fu.isSet=iq});var eL=v(Yh=>{"use strict";Object.defineProperty(Yh,"__esModule",{value:!0});Yh.isIndexSignature=lq;var aq=O();function lq(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,aq.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,u)=>{let m=s[d],S=e(d,o?{...o,identifier:`${o.identifier}[key:${u}]`}:null),h=t(m,o?{...o,identifier:`${o.identifier}[value:${u}]`}:null);return S&&h})}}});var tL=v(hu=>{"use strict";Object.defineProperty(hu,"__esModule",{value:!0});hu.isError=void 0;var cq=Bi(),dq=function(t,r){return t instanceof Error?!0:((0,cq.reportTypeGuardError)(r,t,"Error"),!1)};hu.isError=dq});var Zh=v(Xh=>{"use strict";Object.defineProperty(Xh,"__esModule",{value:!0});Xh.isArrayWithEachItem=mq;var uq=O(),pq=Bt();function mq(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,uq.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,pq.attachTypeGuardMeta)(t,{itemGuard:e})}});var Qh=v(yu=>{"use strict";Object.defineProperty(yu,"__esModule",{value:!0});yu.isNonEmptyArray=void 0;var gq=O(),fq=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,gq.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};yu.isNonEmptyArray=fq});var rL=v(ey=>{"use strict";Object.defineProperty(ey,"__esModule",{value:!0});ey.isNonEmptyArrayWithEachItem=Sq;var hq=Zh(),yq=Qh();function Sq(e){return function(t,r){return(0,hq.isArrayWithEachItem)(e)(t,r)&&(0,yq.isNonEmptyArray)(t,r)}}});var nL=v(ty=>{"use strict";Object.defineProperty(ty,"__esModule",{value:!0});ty.isTuple=Aq;var oL=O();function Aq(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,oL.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,oL.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var sL=v(ry=>{"use strict";Object.defineProperty(ry,"__esModule",{value:!0});ry.isObjectWithEachItem=Pq;var bq=O();function Pq(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,bq.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var iL=v(oy=>{"use strict";Object.defineProperty(oy,"__esModule",{value:!0});oy.isPartialOf=wq;var _q=Yr();function wq(e){return function(t,r){if(!(0,_q.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var aL=v(ny=>{"use strict";Object.defineProperty(ny,"__esModule",{value:!0});ny.isPick=Tq;var vq=Yr();function Tq(e,...t){return function(r,o){if(!(0,vq.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var lL=v(sy=>{"use strict";Object.defineProperty(sy,"__esModule",{value:!0});sy.isOmit=Cq;var kq=Yr();function Cq(e,...t){return function(r,o){if(!(0,kq.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let u=d.slice(9),m=u.indexOf(" ("),S=m>=0?u.slice(0,m):u;if(a.has(S))return!1;let h=S.startsWith(s+".")&&S.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var cL=v(Su=>{"use strict";Object.defineProperty(Su,"__esModule",{value:!0});Su.isNonEmptyString=void 0;var Lq=O(),Eq=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,Lq.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Su.isNonEmptyString=Eq});var dL=v(Au=>{"use strict";Object.defineProperty(Au,"__esModule",{value:!0});Au.isNonNegativeNumber=void 0;var Wq=O(),Rq=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,Wq.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Au.isNonNegativeNumber=Rq});var uL=v(bu=>{"use strict";Object.defineProperty(bu,"__esModule",{value:!0});bu.isPositiveNumber=void 0;var xq=O(),Iq=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,xq.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};bu.isPositiveNumber=Iq});var pL=v(Pu=>{"use strict";Object.defineProperty(Pu,"__esModule",{value:!0});Pu.isNonPositiveNumber=void 0;var Oq=O(),Mq=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,Oq.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Pu.isNonPositiveNumber=Mq});var mL=v(_u=>{"use strict";Object.defineProperty(_u,"__esModule",{value:!0});_u.isNegativeNumber=void 0;var Nq=O(),Dq=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,Nq.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};_u.isNegativeNumber=Dq});var gL=v(wu=>{"use strict";Object.defineProperty(wu,"__esModule",{value:!0});wu.isInteger=void 0;var zq=O(),jq=Jh(),$q=function(e,t){return!(0,jq.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,zq.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};wu.isInteger=$q});var fL=v(vu=>{"use strict";Object.defineProperty(vu,"__esModule",{value:!0});vu.isPositiveInteger=void 0;var Hq=O(),Fq=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Hq.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};vu.isPositiveInteger=Fq});var hL=v(Tu=>{"use strict";Object.defineProperty(Tu,"__esModule",{value:!0});Tu.isNegativeInteger=void 0;var Uq=O(),Bq=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Uq.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Tu.isNegativeInteger=Bq});var yL=v(ku=>{"use strict";Object.defineProperty(ku,"__esModule",{value:!0});ku.isNonNegativeInteger=void 0;var Gq=O(),qq=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Gq.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};ku.isNonNegativeInteger=qq});var SL=v(Cu=>{"use strict";Object.defineProperty(Cu,"__esModule",{value:!0});Cu.isNonPositiveInteger=void 0;var Vq=O(),Kq=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Vq.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Cu.isNonPositiveInteger=Kq});var AL=v(Eu=>{"use strict";Object.defineProperty(Eu,"__esModule",{value:!0});Eu.isNumeric=void 0;var Lu=O(),Jq=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Lu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Lu.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Lu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Lu.generateTypeGuardError)(e,t.identifier,"number key")),!1};Eu.isNumeric=Jq});var bL=v(Wu=>{"use strict";Object.defineProperty(Wu,"__esModule",{value:!0});Wu.isBooleanLike=void 0;var iy=O(),Yq=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,iy.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,iy.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Wu.isBooleanLike=Yq});var PL=v(Ru=>{"use strict";Object.defineProperty(Ru,"__esModule",{value:!0});Ru.isDateLike=void 0;var Gi=O(),Xq=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Gi.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Gi.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Gi.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Gi.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Gi.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Ru.isDateLike=Xq});var _L=v(xu=>{"use strict";Object.defineProperty(xu,"__esModule",{value:!0});xu.isBigInt=void 0;var Zq=O(),Qq=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,Zq.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};xu.isBigInt=Qq});var ly=v(ay=>{"use strict";Object.defineProperty(ay,"__esModule",{value:!0});ay.isOneOf=eV;var wL=Xn();function eV(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,wL.stringify)(t)}) must be one of following values ${e.map(wL.stringify).join(" | ")}`),o}}});var vL=v(cy=>{"use strict";Object.defineProperty(cy,"__esModule",{value:!0});cy.isOneOfTypes=oV;var tV=Xn(),rV=ji();function oV(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,tV.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,rV.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let u=`- ${d}`;a.includes(u)||a.push(u)}})),r.callbackOnError(a.join(`
`))}return n}}});var TL=v(dy=>{"use strict";Object.defineProperty(dy,"__esModule",{value:!0});dy.isIntersectionOf=nV;function nV(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var kL=v(uy=>{"use strict";Object.defineProperty(uy,"__esModule",{value:!0});uy.isExtensionOf=sV;function sV(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var CL=v(py=>{"use strict";Object.defineProperty(py,"__esModule",{value:!0});py.isNullOr=aV;var iV=Bt();function aV(e){function t(r,o){return r===null?!0:e(r,o)}return(0,iV.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var LL=v(my=>{"use strict";Object.defineProperty(my,"__esModule",{value:!0});my.isUndefinedOr=cV;var lV=Bt();function cV(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,lV.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var EL=v(gy=>{"use strict";Object.defineProperty(gy,"__esModule",{value:!0});gy.isNilOr=uV;var dV=Bt();function uV(e){function t(r,o){return r==null?!0:e(r,o)}return(0,dV.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var WL=v(fy=>{"use strict";Object.defineProperty(fy,"__esModule",{value:!0});fy.isAsserted=pV;function pV(e){return!0}});var RL=v(hy=>{"use strict";Object.defineProperty(hy,"__esModule",{value:!0});hy.isEnum=gV;var mV=ly();function gV(e){return function(t,r){return(0,mV.isOneOf)(...Object.values(e))(t,r)}}});var xL=v(yy=>{"use strict";Object.defineProperty(yy,"__esModule",{value:!0});yy.isEqualTo=yV;var fV=O(),hV=Xn();function yV(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,fV.generateTypeGuardError)(t,r.identifier,`equal to ${(0,hV.stringify)(e)}`)),!1):!0}}});var IL=v(Iu=>{"use strict";Object.defineProperty(Iu,"__esModule",{value:!0});Iu.isRegex=void 0;var SV=O(),AV=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,SV.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Iu.isRegex=AV});var ML=v(Sy=>{"use strict";Object.defineProperty(Sy,"__esModule",{value:!0});Sy.isPattern=bV;var OL=O();function bV(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,OL.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,OL.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var NL=v(Ay=>{"use strict";Object.defineProperty(Ay,"__esModule",{value:!0});Ay.by=PV;function PV(e){return function(t){return e(t,null)}}});var DL=v(by=>{"use strict";Object.defineProperty(by,"__esModule",{value:!0});by.toNumber=_V;function _V(e){return typeof e=="number"?e:Number(e)}});var zL=v(Py=>{"use strict";Object.defineProperty(Py,"__esModule",{value:!0});Py.toDate=wV;function wV(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var jL=v(_y=>{"use strict";Object.defineProperty(_y,"__esModule",{value:!0});_y.toBoolean=vV;function vV(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var $L=v(Ou=>{"use strict";Object.defineProperty(Ou,"__esModule",{value:!0});Ou.isSymbol=void 0;var TV=O(),kV=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,TV.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Ou.isSymbol=kV});var es=v(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.isDateLike=_.isBooleanLike=_.isNumeric=_.isNonPositiveInteger=_.isNonNegativeInteger=_.isNegativeInteger=_.isPositiveInteger=_.isInteger=_.isNegativeNumber=_.isNonPositiveNumber=_.isPositiveNumber=_.isNonNegativeNumber=_.isNonEmptyString=_.isOmit=_.isPick=_.isPartialOf=_.isObjectWithEachItem=_.isNonNullObject=_.isTuple=_.isNonEmptyArrayWithEachItem=_.isNonEmptyArray=_.isArrayWithEachItem=_.isError=_.isIndexSignature=_.isSet=_.isMap=_.isURLSearchParams=_.isURL=_.isFormData=_.isBlob=_.isFileList=_.isFile=_.isFunction=_.isUnknown=_.isString=_.isNumber=_.isNil=_.isDefined=_.isDate=_.isBoolean=_.isAny=_.BrandSymbols=_.isBranded=_.guardWithTolerance=_.isObject=_.isObjectWith=_.isNestedType=_.isShape=_.isSchema=_.isType=void 0;_.isSymbol=_.toBoolean=_.toDate=_.toNumber=_.by=_.generateTypeGuardError=_.isPattern=_.isRegex=_.isEqualTo=_.isEnum=_.isAsserted=_.isNilOr=_.isUndefinedOr=_.isNullOr=_.isExtensionOf=_.isIntersectionOf=_.isOneOfTypes=_.isOneOf=_.isBigInt=void 0;var CV=Qd();Object.defineProperty(_,"isType",{enumerable:!0,get:function(){return CV.isType}});var wy=LC();Object.defineProperty(_,"isSchema",{enumerable:!0,get:function(){return wy.isSchema}});Object.defineProperty(_,"isShape",{enumerable:!0,get:function(){return wy.isShape}});Object.defineProperty(_,"isNestedType",{enumerable:!0,get:function(){return wy.isNestedType}});var LV=EC();Object.defineProperty(_,"isObjectWith",{enumerable:!0,get:function(){return LV.isObjectWith}});var EV=WC();Object.defineProperty(_,"isObject",{enumerable:!0,get:function(){return EV.isObject}});var WV=RC();Object.defineProperty(_,"guardWithTolerance",{enumerable:!0,get:function(){return WV.guardWithTolerance}});var RV=xC();Object.defineProperty(_,"isBranded",{enumerable:!0,get:function(){return RV.isBranded}});var xV=IC();Object.defineProperty(_,"BrandSymbols",{enumerable:!0,get:function(){return xV.BrandSymbols}});var IV=OC();Object.defineProperty(_,"isAny",{enumerable:!0,get:function(){return IV.isAny}});var OV=MC();Object.defineProperty(_,"isBoolean",{enumerable:!0,get:function(){return OV.isBoolean}});var MV=NC();Object.defineProperty(_,"isDate",{enumerable:!0,get:function(){return MV.isDate}});var NV=$h();Object.defineProperty(_,"isDefined",{enumerable:!0,get:function(){return NV.isDefined}});var DV=Yd();Object.defineProperty(_,"isNil",{enumerable:!0,get:function(){return DV.isNil}});var zV=Jh();Object.defineProperty(_,"isNumber",{enumerable:!0,get:function(){return zV.isNumber}});var jV=DC();Object.defineProperty(_,"isString",{enumerable:!0,get:function(){return jV.isString}});var $V=zC();Object.defineProperty(_,"isUnknown",{enumerable:!0,get:function(){return $V.isUnknown}});var HV=jC();Object.defineProperty(_,"isFunction",{enumerable:!0,get:function(){return HV.isFunction}});var FV=HC();Object.defineProperty(_,"isFile",{enumerable:!0,get:function(){return FV.isFile}});var UV=UC();Object.defineProperty(_,"isFileList",{enumerable:!0,get:function(){return UV.isFileList}});var BV=GC();Object.defineProperty(_,"isBlob",{enumerable:!0,get:function(){return BV.isBlob}});var GV=VC();Object.defineProperty(_,"isFormData",{enumerable:!0,get:function(){return GV.isFormData}});var qV=JC();Object.defineProperty(_,"isURL",{enumerable:!0,get:function(){return qV.isURL}});var VV=XC();Object.defineProperty(_,"isURLSearchParams",{enumerable:!0,get:function(){return VV.isURLSearchParams}});var KV=ZC();Object.defineProperty(_,"isMap",{enumerable:!0,get:function(){return KV.isMap}});var JV=QC();Object.defineProperty(_,"isSet",{enumerable:!0,get:function(){return JV.isSet}});var YV=eL();Object.defineProperty(_,"isIndexSignature",{enumerable:!0,get:function(){return YV.isIndexSignature}});var XV=tL();Object.defineProperty(_,"isError",{enumerable:!0,get:function(){return XV.isError}});var ZV=Zh();Object.defineProperty(_,"isArrayWithEachItem",{enumerable:!0,get:function(){return ZV.isArrayWithEachItem}});var QV=Qh();Object.defineProperty(_,"isNonEmptyArray",{enumerable:!0,get:function(){return QV.isNonEmptyArray}});var eK=rL();Object.defineProperty(_,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return eK.isNonEmptyArrayWithEachItem}});var tK=nL();Object.defineProperty(_,"isTuple",{enumerable:!0,get:function(){return tK.isTuple}});var rK=Yr();Object.defineProperty(_,"isNonNullObject",{enumerable:!0,get:function(){return rK.isNonNullObject}});var oK=sL();Object.defineProperty(_,"isObjectWithEachItem",{enumerable:!0,get:function(){return oK.isObjectWithEachItem}});var nK=iL();Object.defineProperty(_,"isPartialOf",{enumerable:!0,get:function(){return nK.isPartialOf}});var sK=aL();Object.defineProperty(_,"isPick",{enumerable:!0,get:function(){return sK.isPick}});var iK=lL();Object.defineProperty(_,"isOmit",{enumerable:!0,get:function(){return iK.isOmit}});var aK=cL();Object.defineProperty(_,"isNonEmptyString",{enumerable:!0,get:function(){return aK.isNonEmptyString}});var lK=dL();Object.defineProperty(_,"isNonNegativeNumber",{enumerable:!0,get:function(){return lK.isNonNegativeNumber}});var cK=uL();Object.defineProperty(_,"isPositiveNumber",{enumerable:!0,get:function(){return cK.isPositiveNumber}});var dK=pL();Object.defineProperty(_,"isNonPositiveNumber",{enumerable:!0,get:function(){return dK.isNonPositiveNumber}});var uK=mL();Object.defineProperty(_,"isNegativeNumber",{enumerable:!0,get:function(){return uK.isNegativeNumber}});var pK=gL();Object.defineProperty(_,"isInteger",{enumerable:!0,get:function(){return pK.isInteger}});var mK=fL();Object.defineProperty(_,"isPositiveInteger",{enumerable:!0,get:function(){return mK.isPositiveInteger}});var gK=hL();Object.defineProperty(_,"isNegativeInteger",{enumerable:!0,get:function(){return gK.isNegativeInteger}});var fK=yL();Object.defineProperty(_,"isNonNegativeInteger",{enumerable:!0,get:function(){return fK.isNonNegativeInteger}});var hK=SL();Object.defineProperty(_,"isNonPositiveInteger",{enumerable:!0,get:function(){return hK.isNonPositiveInteger}});var yK=AL();Object.defineProperty(_,"isNumeric",{enumerable:!0,get:function(){return yK.isNumeric}});var SK=bL();Object.defineProperty(_,"isBooleanLike",{enumerable:!0,get:function(){return SK.isBooleanLike}});var AK=PL();Object.defineProperty(_,"isDateLike",{enumerable:!0,get:function(){return AK.isDateLike}});var bK=_L();Object.defineProperty(_,"isBigInt",{enumerable:!0,get:function(){return bK.isBigInt}});var PK=ly();Object.defineProperty(_,"isOneOf",{enumerable:!0,get:function(){return PK.isOneOf}});var _K=vL();Object.defineProperty(_,"isOneOfTypes",{enumerable:!0,get:function(){return _K.isOneOfTypes}});var wK=TL();Object.defineProperty(_,"isIntersectionOf",{enumerable:!0,get:function(){return wK.isIntersectionOf}});var vK=kL();Object.defineProperty(_,"isExtensionOf",{enumerable:!0,get:function(){return vK.isExtensionOf}});var TK=CL();Object.defineProperty(_,"isNullOr",{enumerable:!0,get:function(){return TK.isNullOr}});var kK=LL();Object.defineProperty(_,"isUndefinedOr",{enumerable:!0,get:function(){return kK.isUndefinedOr}});var CK=EL();Object.defineProperty(_,"isNilOr",{enumerable:!0,get:function(){return CK.isNilOr}});var LK=WL();Object.defineProperty(_,"isAsserted",{enumerable:!0,get:function(){return LK.isAsserted}});var EK=RL();Object.defineProperty(_,"isEnum",{enumerable:!0,get:function(){return EK.isEnum}});var WK=xL();Object.defineProperty(_,"isEqualTo",{enumerable:!0,get:function(){return WK.isEqualTo}});var RK=IL();Object.defineProperty(_,"isRegex",{enumerable:!0,get:function(){return RK.isRegex}});var xK=ML();Object.defineProperty(_,"isPattern",{enumerable:!0,get:function(){return xK.isPattern}});var IK=O();Object.defineProperty(_,"generateTypeGuardError",{enumerable:!0,get:function(){return IK.generateTypeGuardError}});var OK=NL();Object.defineProperty(_,"by",{enumerable:!0,get:function(){return OK.by}});var MK=DL();Object.defineProperty(_,"toNumber",{enumerable:!0,get:function(){return MK.toNumber}});var NK=zL();Object.defineProperty(_,"toDate",{enumerable:!0,get:function(){return NK.toDate}});var DK=jL();Object.defineProperty(_,"toBoolean",{enumerable:!0,get:function(){return DK.toBoolean}});var zK=$L();Object.defineProperty(_,"isSymbol",{enumerable:!0,get:function(){return zK.isSymbol}})});var ts,HL,jK,FL,UL=l(()=>{"use strict";ts=g(require("node:path")),HL=require("node:url"),jK=()=>!0,FL=()=>{if(jK()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?ts.default.dirname(ts.default.resolve(e)):ts.default.dirname(ts.default.resolve(__filename))}return ts.default.dirname((0,HL.fileURLToPath)(__agentWitchImportMetaUrl))}});var vy,BL,z,GL,$K,Xr,C,Mu,mr,qL,Nu,rs,Du,he,Io,Ty,Be,ky,M,Cy=l(()=>{"use strict";vy=g(require("node:fs")),BL=g(require("node:os")),z=g(require("node:path")),GL=g(es());Me();UL();Id();Id();$K=FL(),Xr=e=>e.trim().toLowerCase(),C=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return z.default.resolve(e);let t=z.default.resolve($K),r=z.default.basename(t),o=z.default.basename(z.default.dirname(t));return r===Nh&&(o===Ut||o===pr)?z.default.dirname(t):r===Ut||r===pr?t:z.default.join(BL.default.homedir(),Ut)},Mu=(e=C())=>z.default.join(e,Nh),mr=(e=C())=>z.default.join(Mu(e),aC),qL=(e,t,r)=>t!==null?z.default.join(e,ot,t,r):z.default.join(e,r),Nu=e=>qL(e.installDir,e.profileEmail,Ni),rs=e=>qL(e.installDir,e.profileEmail,wt),Du=e=>e.profileEmail!==null?z.default.join(e.installDir,ot,e.profileEmail,Jr):z.default.join(e.installDir,Jr),he=(e=C())=>Di(e),Io=(e=C())=>Eo(e)?Ld:Cd,Ty=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Xr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Xr(t):null},Be=(e=C())=>{let t=z.default.join(e,Mh);if(!vy.default.existsSync(t))return null;try{let r=JSON.parse(vy.default.readFileSync(t,"utf8"));if((0,GL.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Xr(r.email)}catch{return null}return null},ky=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Xr(r):null}let t=Ty();return t!==null?t:Be()},M=e=>{let t=C(),r=Mu(t),o=mr(t),n=ky(e);if(n!==null){let S=z.default.join(t,ot,n),h=z.default.join(S,Ed),y=z.default.join(S,Ni),p=z.default.join(S,wt),b=z.default.join(S,xd),A=z.default.join(S,Jr),f=z.default.join(S,wt,Jn),P=z.default.join(S,wt,Yn);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:p,mainLogPath:f,errorLogPath:P,reportsDir:b,deviceKeypairPath:A,configPath:z.default.join(S,"config.json"),harnessRootDir:h,harnessManifestPath:z.default.join(h,Rd),harnessSetsDir:z.default.join(h,Wd)}}let s=z.default.join(t,Ed),i=z.default.join(t,Ni),a=z.default.join(t,wt),c=z.default.join(t,xd),d=z.default.join(t,Jr),u=z.default.join(t,wt,Jn),m=z.default.join(t,wt,Yn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:u,errorLogPath:m,reportsDir:c,deviceKeypairPath:d,configPath:z.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:z.default.join(s,Rd),harnessSetsDir:z.default.join(s,Wd)}}});var HK,qi,Ly=l(()=>{"use strict";HK=e=>{let t=e?.trim();if(t===void 0||!/^\d+$/.test(t))return null;let r=Number.parseInt(t,10);return r>0&&r<=65535?r:null},qi=e=>e.filePort??HK(e.envValue)??e.defaultPort});var Ey,VL,FK,UK,KL,Vi,JL=l(()=>{"use strict";Ey=g(require("node:fs")),VL=g(require("node:path"));Me();Cy();Ly();FK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),UK=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,KL=e=>{let t=VL.default.join(e,Mi.wakePort);if(!Ey.default.existsSync(t))return null;try{let r=JSON.parse(Ey.default.readFileSync(t,"utf8"));if(FK(r)&&UK(r.wakePort))return r.wakePort}catch{return null}return null},Vi=(e=C())=>qi({filePort:KL(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:Io(e)})});var V=l(()=>{"use strict";Cy();JL();Ly()});var Wy,Ry,zu=l(()=>{"use strict";Wy=new Set(["","loginwindow","_mbsetupuser","root"]),Ry=5e3});var YL,KK,XL,xy,Iy=l(()=>{"use strict";YL=require("node:child_process");zu();KK=e=>e.trim().toLowerCase(),XL=e=>e==null?!1:!Wy.has(KK(e)),xy=()=>{if(process.platform!=="darwin")return null;try{let t=(0,YL.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return XL(t)?t:null}catch{return null}}});var QL,ZL,vt,Ki=l(()=>{"use strict";QL=g(require("node:os"));Iy();ZL=e=>e.trim().toLowerCase(),vt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?xy():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??QL.default.userInfo().username;return ZL(r)===ZL(o)}});var eE,tE,Oo,rE=l(()=>{"use strict";eE=require("node:child_process"),tE=g(require("node:fs"));V();Ki();Oo=(e=C())=>{let t=mr(e);if(!tE.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!vt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Be(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,eE.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var oE,Ji,ju=l(()=>{"use strict";oE=require("node:child_process"),Ji=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,oE.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var $u,Oy,nE,se,Hu,Yi=l(()=>{"use strict";$u=g(require("node:fs")),Oy=g(require("node:path"));V();Me();nE=e=>{let t=Oy.default.join(e,ot);return $u.default.existsSync(t)?$u.default.readdirSync(t).filter(r=>$u.default.statSync(Oy.default.join(t,r)).isDirectory()).map(r=>Xr(r)).toSorted():[]},se=(e=C())=>{let t=he(e),r=nE(e);return[{profileEmail:Be(e)??r[0]??null,launchAgentLabel:t}]},Hu=(e=C())=>nE(e)});var My,sE,iE,JK,gr,Fu=l(()=>{"use strict";My=g(require("node:fs")),sE=g(require("node:os")),iE=g(require("node:path"));V();Yi();JK=()=>iE.default.join(sE.default.homedir(),"Library","LaunchAgents"),gr=(e=C())=>{let t=he(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of se(e))r.add(n.launchAgentLabel);let o=JK();if(My.default.existsSync(o))for(let n of My.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var aE,Xi,lE=l(()=>{"use strict";V();ju();Fu();Yi();aE=(e=C())=>{let t=new Set(se(e).map(r=>r.launchAgentLabel));return gr(e).filter(r=>!t.has(r))},Xi=(e=C())=>{for(let t of aE(e))Ji(t)}});var Zi,Ny=l(()=>{"use strict";V();ju();Fu();Zi=(e=C())=>{for(let t of gr(e))Ji(t)}});var cE,dE,YK,Mo,uE=l(()=>{"use strict";cE=require("node:child_process"),dE=require("node:util"),YK=(0,dE.promisify)(cE.execFile),Mo=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await YK("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var No,XK,Dy,zy=l(()=>{"use strict";No=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),XK=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,Dy=e=>{let t=e.pathValue??XK(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${No(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${No(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${No(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${No(e.homeDir)}</string>
    <key>PATH</key>
    <string>${No(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${No(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${No(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var Uu,jy=l(()=>{"use strict";Uu=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Qi,$y,Bu,Gu,fr,qu=l(()=>{"use strict";Qi=g(require("node:fs")),$y=g(require("node:os")),Bu=g(require("node:path"));Me();V();zy();jy();Gu=(e,t=$y.default.homedir())=>Bu.default.join(t,"Library","LaunchAgents",`${e}.plist`),fr=e=>{let t=e.installDir??C(),r=e.homeDir??$y.default.homedir(),o=Gu(e.launchAgentLabel,r),n=Qi.default.existsSync(o)?Qi.default.readFileSync(o,"utf8"):null;if(n!==null&&Uu(n))return{ok:!0,rewritten:!1,plistPath:o};let s=Dy({launchAgentLabel:e.launchAgentLabel,runPath:Bu.default.join(t,iC,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??Vi(t)});if(!Uu(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Qi.default.mkdirSync(Bu.default.dirname(o),{recursive:!0}),Qi.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var mE,gE,fE,ea,ZK,QK,pE,Ne,Hy=l(()=>{"use strict";mE=require("node:child_process"),gE=g(require("node:fs")),fE=require("node:util");V();qu();Ki();ea=(0,fE.promisify)(mE.execFile),ZK=async e=>{try{return await ea("launchctl",["print",e]),!0}catch{return!1}},QK=async(e,t,r)=>{await ZK(t)&&await ea("launchctl",["bootout",t]).catch(()=>{}),await ea("launchctl",["bootstrap",e,r]),await ea("launchctl",["enable",t])},pE=async e=>{try{return await ea("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Ne=async(e,t=C())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!vt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=fr({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await pE(n))return{ok:!0};let i=s.plistPath;if(!gE.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await QK(o,n,i),await pE(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Do,hE=l(()=>{"use strict";V();Hy();Yi();Do=async(e=C())=>{let t=[];for(let r of se(e))(await Ne(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var yE,SE,AE=l(()=>{"use strict";yE=/(<key>AGENT_WITCH_WAKE_PORT<\/key>\s*<string>)[^<]*(<\/string>)/,SE=(e,t)=>yE.test(e)?e.replace(yE,`$1${String(t)}$2`):null});var Vu,bE,Fy,PE=l(()=>{"use strict";Vu=g(require("node:fs")),bE=g(require("node:os"));qu();AE();Fy=e=>{let t=e.homeDir??bE.default.homedir(),r=[e.launchAgentPrefix,`${e.launchAgentPrefix}-wake`,`${e.launchAgentPrefix}-live`],o=[];for(let n of r){let s=Gu(n,t);if(!Vu.default.existsSync(s))continue;let i=Vu.default.readFileSync(s,"utf8"),a=SE(i,e.wakePort);a===null||a===i||(Vu.default.writeFileSync(s,a,"utf8"),o.push(s))}return o}});var nt,hr,_E=l(()=>{"use strict";Ny();Ki();zu();nt=e=>{vt()||(Zi(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},hr=(e,t=Ry)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{vt()||e()},t);return()=>{clearInterval(r)}}});var re=l(()=>{"use strict";mC();rE();ju();lE();Ny();Fu();Ki();uE();hE();Hy();qu();jy();PE();zy();Yi();Iy();zu();_E()});var Uy=l(()=>{"use strict";re()});var wE,vE,Ku,TE,os,kE,CE,zo=l(()=>{"use strict";wE=".agent-witch",vE="memory",Ku="project.json",TE="chunks.ndjson",os="runs.ndjson",kE="reports",CE=".json"});var LE=l(()=>{"use strict";zo()});var EE,Ju,By=l(()=>{"use strict";EE=g(require("node:path"));LE();Ju=(e,t)=>EE.default.join(e.trim(),`${t.trim()}${CE}`)});var ta,WE,RE=l(()=>{"use strict";ta="agent-witch.js",WE="command"});var Yu=l(()=>{"use strict";RE()});var jo,xE,IE=l(()=>{"use strict";Yu();jo=e=>`'${e.replace(/'/g,"'\\''")}'`,xE=e=>{let t=`${e.installDir.trim()}/${"app"}/${ta}`,r=[jo("node"),jo(t),"report","write","--key",jo(e.reportKey.trim()),"--agent-run-id",jo(e.agentRunId.trim()),"--status",jo(e.status),"--summary",jo(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",jo(e.details.trim())),r.join(" ")}});var Gt,OE,e4,Gy,Xu=l(()=>{"use strict";By();IE();Gt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},OE=e=>e===Gt.COMPLETED||e===Gt.FAILED,e4=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Gy=(e,t)=>{let r=Ju(t.reportsDir,t.reportKey),o=xE({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Gt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${e4({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var De=l(()=>{"use strict";Me();V()});var oa,NE,ME,DE,t4,ns,r4,zE,na,sa,qy,jE,$E,ia=l(()=>{"use strict";oa=g(require("node:fs")),NE=g(require("node:path"));Xu();By();De();ME=50,DE=e=>{let t=M(),r=Ju(t.reportsDir,e);return oa.default.mkdirSync(NE.default.dirname(r),{recursive:!0}),r},t4=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},ns=e=>{let t=DE(e);if(!oa.default.existsSync(t))return null;try{let r=JSON.parse(oa.default.readFileSync(t,"utf8"));return t4(r)?r:null}catch{return null}},r4=(e,t)=>{let r=[...e,t];return r.length>ME?r.slice(r.length-ME):r},zE=e=>{let t=DE(e.reportKey);oa.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},na=e=>{let t=ns(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:r4(t?.history??[],o)};return zE(n),n},sa=e=>{let t=ns(e.reportKey);return t!==null?t:na({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Gt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},qy=(e,t)=>{let r=t.trim();if(r.length===0)return ns(e);let o=ns(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return zE(s),s},jE=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},$E=e=>{if(e===null||!OE(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Gt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var o4,n4,aa,HE,Zu,Vy=l(()=>{"use strict";Xu();ia();o4=new Set(Object.values(Gt)),n4=e=>o4.has(e),aa=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},HE=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Zu=e=>{if(e[0]!=="write")return HE(),1;let r=aa(e,"--key"),o=aa(e,"--agent-run-id"),n=aa(e,"--status"),s=aa(e,"--summary"),i=aa(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!n4(n)?(HE(),1):(na({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var st,$o=l(()=>{"use strict";st=()=>!0});var Ky,FE,Ho,Qu=l(()=>{"use strict";Ky=g(require("node:path")),FE=require("node:url");$o();Ho=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Ky.default.resolve(t);return st()?r===Ky.default.resolve(__filename):e===void 0?!1:r===(0,FE.fileURLToPath)(e)}});var ep,ss,a4,woe,is=l(()=>{"use strict";ep="agent-witch.js",ss="deps.tar.gz",a4="install.sh",woe={mainScript:`app/${ep}`,depsArchive:`app/${ss}`,installShell:a4}});var qE=l(()=>{"use strict";is()});var VE=l(()=>{"use strict";is();qE()});var la,Yy,tp,l4,ca,ze,ls,da,ua,Fo,Xy=l(()=>{"use strict";la=g(require("node:fs")),Yy=g(require("node:path"));VE();V();tp="install-version.json",l4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ca=(e=C())=>Yy.default.join(e,tp),ze=(e=C())=>{let t=ca(e);if(!la.default.existsSync(t))return null;try{let r=JSON.parse(la.default.readFileSync(t,"utf8"));return!l4(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},ls=(e,t=C())=>{let r=ca(t);la.default.mkdirSync(Yy.default.dirname(r),{recursive:!0}),la.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},da=(e=C())=>ze(e)?.bundleVersion??"256",ua=(e,t)=>{let r=ze(e);if(r!==null)return r;let o={bundleVersion:"256",appOrigin:t,updatedAt:new Date().toISOString()};return ls(o,e),o},Fo=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var KE,Uo,Zy,Qy,eS,rp,qt,Bo,tS=l(()=>{"use strict";KE=require("node:crypto"),Uo=g(require("node:fs")),Zy=g(require("node:path"));V();Qy="self-update-log.ndjson",eS=100,rp=(e=C())=>{let t=M(),r=t.installDir===e?t.logsDir:rs({installDir:e,profileEmail:t.profileEmail});return Zy.default.join(r,Qy)},qt=(e,t=C())=>{let r={id:(0,KE.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=rp(t);Uo.default.mkdirSync(Zy.default.dirname(o),{recursive:!0});let n=Uo.default.existsSync(o)?Uo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-eS+1)),JSON.stringify(r)];return Uo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Bo=(e=20,t=C())=>{let r=rp(t);if(!Uo.default.existsSync(r))return[];let o=Uo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var rS,$oe,oS=l(()=>{"use strict";is();rS="deps",$oe=`${"app"}/${ss}`});var JE=l(()=>{"use strict";oS()});var YE,Zr,Go,XE,nS,sS,ZE=l(()=>{"use strict";YE=require("node:child_process"),Zr=g(require("node:fs")),Go=g(require("node:path"));is();oS();XE=e=>Go.default.join(e,"app",rS),nS=e=>{let t=Go.default.join(e,"app"),r=Go.default.join(t,ss);Zr.default.existsSync(r)&&(Zr.default.rmSync(XE(e),{recursive:!0,force:!0}),Zr.default.mkdirSync(t,{recursive:!0}),(0,YE.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Zr.default.rmSync(r,{force:!0}))},sS=e=>{Zr.default.rmSync(Go.default.join(e,"node_modules"),{recursive:!0,force:!0}),Zr.default.rmSync(Go.default.join(e,"package.json"),{force:!0}),Zr.default.rmSync(Go.default.join(e,"package-lock.json"),{force:!0})}});var QE=l(()=>{"use strict";JE();ZE()});var pa,ma=l(()=>{"use strict";pa="agent-witch.service"});var eW=l(()=>{"use strict";ma()});var op,np,sp=l(()=>{"use strict";op="AGENT_WITCH_EXTERNAL_BRIDGE",np="AGENT_WITCH_EXTERNAL_LIVE"});var tW=l(()=>{"use strict";sp();ma()});var rW,iS,oW=l(()=>{"use strict";rW=require("node:child_process");ma();iS=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,rW.spawn)("systemctl",["--user","restart",pa],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${pa} exited ${o??"unknown"}`))})})});var nW=l(()=>{"use strict";ma();eW();tW();oW()});var it,ip,sW=l(()=>{"use strict";it="https://www.agentwitch.com",ip="wss://www.agentwitch.com/api/agent-witch/ws"});var ga,yr,iW=l(()=>{"use strict";ga="127.0.0.1",yr=`http://${ga}:43347`});var gt=l(()=>{"use strict";sW();iW()});var fa,ap,aW,lS,d4,lW,uS,cW,Tt,ha,ya,pS,cS,dS,Sa,Aa,mS,gS,cs=l(()=>{"use strict";fa=g(require("node:fs")),ap=g(require("node:path")),aW="active-writer-work.json",lS=new Set,d4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lW=e=>e.profileEmail===null?ap.default.join(e.installDir,aW):ap.default.join(e.installDir,"profiles",e.profileEmail,aW),uS=e=>{let t=lW(e);if(!fa.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(fa.default.readFileSync(t,"utf8"));return!d4(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},cW=(e,t)=>{let r=lW(e);fa.default.mkdirSync(ap.default.dirname(r),{recursive:!0}),fa.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Tt=e=>uS(e).activeCount>0,ha=e=>{let t=uS(e);cW(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},ya=e=>{let t=uS(e),r=Math.max(0,t.activeCount-1);if(cW(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of lS)o()},pS=e=>(lS.add(e),()=>{lS.delete(e)}),cS=null,dS=null,Sa=e=>{cS=e},Aa=e=>{dS=e},mS=()=>{let e=cS;return cS=null,e},gS=()=>{let e=dS;return dS=null,e}});var Le,lp=l(()=>{"use strict";Le=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var ds,cp,ba,fS=l(()=>{"use strict";ds="qwen2.5:7b",cp="nomic-embed-text",ba="Install Ollama from https://ollama.com/download"});var Pa,hS,dp=l(()=>{"use strict";fS();Pa=()=>`
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
    echo "Ollama is missing. ${ba}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${ba}" >&2
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
  agent_witch_ensure_ollama_model "${ds}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${cp}" "\${pull_log}"
}
`,hS=()=>`
${Pa()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var dW,u4,up,yS=l(()=>{"use strict";dW=require("node:child_process");V();dp();u4=e=>new Promise(t=>{let r=(0,dW.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:C()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),up=async(e=u4)=>{let t=`${Pa()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var Qr,pp,uW,p4,pW,ps,m4,g4,f4,us,qo,Vo,mW=l(()=>{"use strict";Qr=g(require("node:fs")),pp=g(require("node:path"));QE();nW();re();V();is();gt();Xy();cs();lp();tS();yS();uW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),p4=e=>{let t=Be(e),r=t===null?M():M(t);if(!Qr.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Qr.default.readFileSync(r.configPath,"utf8"));return!uW(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},pW=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!uW(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},ps=async e=>(await pW(e))?.bundleVersion??null,m4=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=pp.default.join(t,r);Qr.default.mkdirSync(pp.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());Qr.default.writeFileSync(n,s),r.endsWith(".js")&&Qr.default.chmodSync(n,493)},g4=async()=>{if(process.platform==="linux"){try{await iS()}catch(e){let t=e instanceof Error?e.message:String(e);console.warn(`[agent-witch-self-update] Linux service restart skipped: ${t}`)}return}Xi(),await Do()},f4=(e,t)=>e!==null?Le(e):t??it,us=(e,t)=>({localBundleVersion:t,...e}),qo=async e=>{let t=C(),r=ze(t),o=r?.bundleVersion??null,n=await up();qt({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=p4(t),i=f4(s,r?.appOrigin);if(i===null){let d=us({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return qt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await pW(i);if(a===null){let d=us({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return qt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||Fo(o,a.bundleVersion))){let d=us({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return qt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let S of a.scripts)await m4(i,t,S);let d=pp.default.join(t,ep);Qr.default.existsSync(d)&&Qr.default.rmSync(d,{force:!0}),nS(t),sS(t),ls({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let u=M(Be(t));if(Tt(u)){Aa("install-bundle-update");let S=us({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return qt({event:"update_applied",ok:!0,message:S.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),S}await g4();let m=us({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return qt({event:"update_applied",ok:!0,message:m.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}catch(d){let u=d instanceof Error?d.message:"Agent Witch self-update failed.",m=us({ok:!1,updated:!1,message:u,remoteBundleVersion:a.bundleVersion},o);return qt({event:"update_failed",ok:!1,message:u,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},Vo=()=>{let e=C();return{local:ze(e),logs:Bo(20,e)}}});var gW={};Ft(gW,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>tp,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>ba,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>cp,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>ds,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Qy,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>eS,appendAgentWitchSelfUpdateLog:()=>qt,buildAgentWitchEnsureOllamaShell:()=>Pa,buildAgentWitchInstallScriptOllama:()=>hS,buildAgentWitchSelfUpdateStatus:()=>Vo,ensureAgentWitchInstallVersionRecorded:()=>ua,ensureAgentWitchOllamaInstalled:()=>up,fetchAgentWitchRemoteInstallBundleVersion:()=>ps,isRemoteAgentWitchBundleVersionNewer:()=>Fo,readAgentWitchInstallVersion:()=>ze,readAgentWitchSelfUpdateLogs:()=>Bo,resolveAgentWitchAppOriginFromWsUrl:()=>Le,resolveAgentWitchHeartbeatInstallBundleVersion:()=>da,resolveAgentWitchInstallVersionPath:()=>ca,resolveAgentWitchSelfUpdateLogPath:()=>rp,runAgentWitchSelfUpdate:()=>qo,writeAgentWitchInstallVersion:()=>ls});var Vt=l(()=>{"use strict";Xy();tS();mW();lp();fS();dp();yS()});var SS={};Ft(SS,{buildAgentWitchSelfUpdateStatus:()=>Vo,fetchAgentWitchRemoteInstallBundleVersion:()=>ps,runAgentWitchSelfUpdate:()=>qo});var AS=l(()=>{"use strict";Vt()});function ms(e){return(0,fW.createHash)("sha256").update(e.trim()).digest("hex")}var fW,mp=l(()=>{"use strict";fW=require("node:crypto")});var gs,_a,h4,fs,bS,gp=l(()=>{"use strict";gs=g(require("node:fs")),_a=g(require("node:path"));mp();De();h4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fs=e=>{if(!gs.default.existsSync(e))return null;try{let t=JSON.parse(gs.default.readFileSync(e,"utf8"));return!h4(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:ms(t.pairingToken.trim())}catch{return null}},bS=(e=C())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(fs(_a.default.join(e,"config.json")));let n=_a.default.join(e,ot);if(!gs.default.existsSync(n))return t;for(let s of gs.default.readdirSync(n)){let i=_a.default.join(n,s);gs.default.statSync(i).isDirectory()&&o(fs(_a.default.join(i,"config.json")))}return t}});var hs,wa=l(()=>{"use strict";hs="connection-health.json"});var Ko,fp,y4,va,ye,PS,hp,Ee,yp=l(()=>{"use strict";Ko=g(require("node:fs")),fp=g(require("node:path"));wa();y4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),va=e=>e.profileEmail===null?fp.default.join(e.installDir,hs):fp.default.join(e.installDir,"profiles",e.profileEmail,hs),ye=e=>{let t=va(e);if(!Ko.default.existsSync(t))return null;try{let r=JSON.parse(Ko.default.readFileSync(t,"utf8"));return!y4(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},PS=e=>{let t=va(e);Ko.default.existsSync(t)&&Ko.default.rmSync(t,{force:!0})},hp=(e,t)=>{let r=va(e),o=ye(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Ko.default.mkdirSync(fp.default.dirname(r),{recursive:!0}),Ko.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Ee=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var Ta,hW=l(()=>{"use strict";wa();yp();Ta=(e,t)=>{if(!t.socketOpen)return!1;let r=ye(e);return r===null?!1:!Ee(r,t.staleAfterMs??12e4,t.nowMs)}});var _S,yW=l(()=>{"use strict";yp();_S=(e,t)=>!(e!==null&&!Ee(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Jo=l(()=>{"use strict";yp();hW();yW();wa()});var Sp,wS,S4,A4,SW,AW=l(()=>{"use strict";Sp=g(require("node:fs")),wS=g(require("node:path"));V();Me();Jo();gp();S4=12e4,A4=e=>{let t=wS.default.join(e,ot);return Sp.default.existsSync(t)?Sp.default.readdirSync(t).filter(r=>Sp.default.statSync(wS.default.join(t,r)).isDirectory()):[]},SW=(e=C())=>{let t=null,r=-1;for(let o of A4(e)){let n=M(o),s=ye(n);if(s===null||Ee(s,S4))continue;let i=fs(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var vS,bW,Ap,ka,Ca,b4,P4,_4,PW,ge,fe,bp,Kt,kt=l(()=>{"use strict";vS=g(require("node:fs")),bW=g(require("node:os")),Ap=g(require("node:path")),ka={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Ca=e=>e.trim().length>0,b4=e=>{let t=Ap.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},P4=()=>{let e=bW.default.homedir(),t=Ap.default.join(e,".local","bin","agent");if(vS.default.existsSync(t))return t;let r=Ap.default.join(e,".local","bin","cursor-agent");return vS.default.existsSync(r)?r:ka.cursorCommand},_4=e=>{let t=e.trim();return!Ca(t)||t===ka.cursorCommand?P4():t},PW=(e,t)=>b4(e)?t:["agent",...t],ge=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",fe=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:Ca(t)?t.trim():ka.claudeCommand,codexCommand:Ca(r)?r.trim():ka.codexCommand,cursorCommand:_4(o),antigravityCommand:Ca(n)?n.trim():ka.antigravityCommand}},bp=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:PW(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Kt=(e,t,r,o)=>{let n=t.trim();if(!Ca(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:PW(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"--dangerously-skip-permissions","-p",n]}}});var eo,w4,Yo,v4,ys,La=l(()=>{"use strict";eo=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,w4=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:eo(s.inputTokens)+eo(s.outputTokens)+eo(s.cacheReadInputTokens)+eo(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Yo=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=eo(a.input_tokens)+eo(a.cache_creation_input_tokens)+eo(a.cache_read_input_tokens),d=eo(a.output_tokens),u=c+d;return u<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:u,model:w4(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},v4=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),ys=(e,t)=>{let r=Yo(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??v4(r)}}});var TS,T4,k4,kS,CS=l(()=>{"use strict";TS=e=>e.toLocaleString("en-US"),T4=e=>e<.01?e.toFixed(4):e.toFixed(3),k4=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${T4(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${TS(e.inputTokens)} in / ${TS(e.outputTokens)} out (${TS(e.totalTokens)} total)`,t].join(`
`)},kS=(e,t)=>{if(t===void 0)return e;let r=k4(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Pp,LS=l(()=>{"use strict";Pp={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Xo,ES,_p,WS=l(()=>{"use strict";LS();Xo="auto",ES=e=>({value:Xo,label:`Auto (${Pp[e]})`}),_p={anthropic:[ES("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[ES("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[ES("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Ss,Ea,wp,As=l(()=>{"use strict";LS();WS();Ss=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Xo))return t},Ea=(e,t)=>{let r=Ss(t);return r===void 0?Pp[e]:r},wp=e=>{let t=Ss(e);return t===void 0?Xo:t}});var vp,C4,L4,Tp,_W=l(()=>{"use strict";vp={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},C4=e=>{let t=vp[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?vp["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?vp["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?vp["gemini-2.0-flash"]:null},L4=(e,t,r)=>{let o=C4(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},Tp=e=>{let t=L4(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var bs,E4,W4,R4,kp,wW=l(()=>{"use strict";_W();bs=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),E4=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=bs(r.input_tokens),n=bs(r.output_tokens);return o===0&&n===0?null:Tp({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},W4=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=bs(r.prompt_tokens),n=bs(r.completion_tokens);return o===0&&n===0?null:Tp({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},R4=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=bs(r.promptTokenCount),n=bs(r.candidatesTokenCount);return o===0&&n===0?null:Tp({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},kp=(e,t,r)=>e==="anthropic"?E4(t,r):e==="openai"?W4(t,r):R4(t,r)});var x4,RS,I4,O4,M4,N4,D4,xS,IS=l(()=>{"use strict";As();wW();x4=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},RS=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Ea(e,t.model)},I4=async e=>{let t=RS("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=x4(o);n.length>0&&e.onChunk?.(n);let s=kp("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},O4=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},M4=async e=>{let t=RS("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=O4(o);n.length>0&&e.onChunk?.(n);let s=kp("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},N4=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},D4=async e=>{let t=RS("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=N4(n);s.length>0&&e.onChunk?.(s);let i=kp("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},xS=async e=>{try{return e.provider==="anthropic"?await I4(e):e.provider==="openai"?await M4(e):await D4(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var at,Wa=l(()=>{"use strict";at=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var vW,z4,Cp,OS=l(()=>{"use strict";vW=g(require("node:path")),z4="writer-api-secrets.json",Cp=e=>vW.default.join(e,z4)});var MS,TW,j4,to,Je,ro=l(()=>{"use strict";MS=g(require("node:fs"));As();OS();TW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),j4=e=>{if(!TW(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=Ss(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},to=e=>{let t=Cp(e);if(!MS.default.existsSync(t))return{};try{let r=JSON.parse(MS.default.readFileSync(t,"utf8"));if(!TW(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=j4(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Je=(e,t)=>to(e)[t]??null});var je,Ra=l(()=>{"use strict";je=e=>e==="api"?"api":"cli"});var kW,Re,Zo,Sr=l(()=>{"use strict";kW=g(require("node:path"));Wa();ro();Ra();Re=e=>kW.default.dirname(e),Zo=(e,t)=>{if(je(e.writerExecutionBackend)!=="api")return!1;let r=at(t);if(r===null)return!1;let o=Re(e.layout.configPath),n=Je(o,r);return n!==null&&n.apiKey.length>0}});var xa,NS=l(()=>{"use strict";CS();IS();Wa();ro();Sr();xa=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=at(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Re(e.layout.configPath),a=Je(i,s);if(a===null){let d=Object.keys(to(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await xS({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:kS(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var CW,Ps,DS=l(()=>{"use strict";CW=require("node:child_process");kt();La();NS();Sr();Ps=(e,t,r)=>new Promise(o=>{if(!ge(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(Zo(e,t)){xa(e,t,r).then(o);return}let n=Kt(t,r,fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,CW.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=ys(i.join("")),u=a.join("").trim(),m=[d.output.trim(),u].filter(S=>S.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var LW=l(()=>{"use strict"});var EW=l(()=>{"use strict";CS();DS();IS();LW();ro();Sr()});var WW,RW,xW,IW=l(()=>{"use strict";WW="claude",RW="codex",xW="cursor"});var OW,$4,zS,Ia,Lp=l(()=>{"use strict";OW=g(require("node:path"));gt();Me();$4="ws://localhost:3000/api/agent-witch/ws",zS=e=>e.replace(/\/$/,""),Ia=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return zS(t);let r=OW.default.basename(e.installDir);if(r===Oi.production)return ip;let o=e.configWsUrl?.trim()??"";return r===Oi.localhost?o.length>0?zS(o):$4:o.length>0?zS(o):ip}});var F4,jS,$S=l(()=>{"use strict";IW();Lp();Ra();F4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jS=e=>{if(!F4(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Ia({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??WW,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??RW,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??xW,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",u=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:u,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:je(t.writerExecutionBackend),layout:e.layout}}}});var HS,FS,US=l(()=>{"use strict";HS=g(require("node:fs"));V();$S();FS=e=>{let t=M(e);if(!HS.default.existsSync(t.configPath))return null;try{let r=JSON.parse(HS.default.readFileSync(t.configPath,"utf8")),o=jS({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Oa,MW=l(()=>{"use strict";Oa=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var BS,U4,GS,NW=l(()=>{"use strict";BS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),U4=e=>{if(!BS(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!BS(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let u=s.items.flatMap(m=>{if(!BS(m))return[];let S=typeof m.itemKey=="string"?m.itemKey.trim():"",h=typeof m.relativePath=="string"?m.relativePath:"",y=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return S.length===0||y.length===0?[]:[{itemKey:S,relativePath:h,contentSha256:y}]});return u.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:u}]});return{id:t,projectId:r,digest:o,entries:n}},GS=U4});var DW,B4,Ep,qS=l(()=>{"use strict";DW=g(require("node:path")),B4=(e,t)=>{let r=t.trim();return DW.default.join(e,"components","store",r.slice(0,2),r)},Ep=B4});var zW,G4,VS,jW=l(()=>{"use strict";zW=g(require("node:fs"));qS();G4=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Ep(e.installDir,n.contentSha256);zW.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},VS=G4});var Ma,_s,q4,KS,V4,JS,YS=l(()=>{"use strict";Ma=g(require("node:fs")),_s=g(require("node:path"));qS();q4=(e,t)=>_s.default.join(e.installDir,"runs",t,"overlay"),KS=(e,t)=>_s.default.join(q4(e,t),".cursor"),V4=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=KS(e,t);Ma.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Ep(e.installDir,i.contentSha256);if(!Ma.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?_s.default.join(n,c):_s.default.join(n,i.itemKey);Ma.default.mkdirSync(_s.default.dirname(d),{recursive:!0}),Ma.default.copyFileSync(a,d)}return{ok:!0}},JS=V4});var XS,$W,K4,Na,HW=l(()=>{"use strict";XS=g(require("node:fs")),$W=g(require("node:path")),K4=(e,t)=>{let r=$W.default.join(e.installDir,"runs",t);XS.default.existsSync(r)&&XS.default.rmSync(r,{recursive:!0,force:!0})},Na=K4});var J4,ZS,FW=l(()=>{"use strict";YS();J4=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=KS(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},ZS=J4});var QS,Y4,X4,Z4,Q4,e8,$,UW=l(()=>{"use strict";QS=g(require("node:fs"));Lp();V();Ra();Y4="claude",X4="codex",Z4="cursor",Q4="agy",e8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=M();if(!QS.default.existsSync(e.configPath))return null;try{let t=JSON.parse(QS.default.readFileSync(e.configPath,"utf8"));if(!e8(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Ia({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:je(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:Y4,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:X4,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:Z4,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:Q4,pairingToken:s,layout:e}}catch{return null}}});var Wp,BW,GW=l(()=>{"use strict";Wp=g(require("node:fs"));OS();BW=(e,t)=>{let r=Cp(e);Wp.default.mkdirSync(e,{recursive:!0}),Wp.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Wp.default.chmodSync(r,384)}catch{}}});var Da,qW,Rp=l(()=>{"use strict";Da=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},qW=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Da(t)}});var za,t8,eA,tA,VW=l(()=>{"use strict";za=g(require("node:fs"));ro();GW();Rp();As();Sr();t8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eA=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=qW(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?Ss(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},tA=e=>{let t=Re(e.configPath),r={};if(za.default.existsSync(e.configPath))try{let n=JSON.parse(za.default.readFileSync(e.configPath,"utf8"));t8(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,za.default.mkdirSync(t,{recursive:!0}),za.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=eA(eA(eA(to(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);BW(t,o)}});var xp,rA=l(()=>{"use strict";xp={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var oA,KW=l(()=>{"use strict";Wa();ro();Sr();Sr();oA=(e,t)=>{if(Zo(e,t)||t==="antigravity")return!1;let r=at(t);if(r===null)return!1;let o=Re(e.layout.configPath),n=Je(o,r);return n===null||n.apiKey.trim().length===0}});var JW,nA,sA=l(()=>{"use strict";JW=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},nA=async e=>{let t=JW(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=JW(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var r8,iA,YW=l(()=>{"use strict";re();US();sA();r8=1e4,iA=()=>nA({listProfileEmails:Hu,readConfig:FS,pollIntervalMs:r8,logWaiting:e=>{console.error(e)}})});var le=l(()=>{"use strict";DS();EW();US();Lp();MW();NW();jW();YS();HW();FW();Ra();UW();VW();ro();Sr();Rp();As();rA();NS();Sr();KW();Wa();ro();YW();$S();sA()});var XW,aA,ZW=l(()=>{"use strict";XW=g(require("node:path"));V();Me();AW();mp();gp();le();aA=(e=C())=>{let t=SW(e);if(t!==null)return t;let r=Be(e);if(r!==null){let n=fs(XW.default.join(e,ot,r,"config.json"));if(n!==null)return n}let o=$()?.pairingToken.trim()??"";return o.length===0?null:ms(o)}});var Ip,QW,o8,n8,eR,Op,ja,Mp,$a=l(()=>{"use strict";Ip=g(require("node:fs")),QW=g(require("node:path")),o8="wake-port.json",n8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eR=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Op=e=>QW.default.join(e,o8),ja=e=>{let t=Op(e);if(!Ip.default.existsSync(t))return null;try{let r=JSON.parse(Ip.default.readFileSync(t,"utf8"));if(n8(r)&&eR(r.wakePort))return r.wakePort}catch{return null}return null},Mp=(e,t)=>{if(!eR(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Op(e);Ip.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Uae,Bae,Gae,Ct,tR,Ha=l(()=>{"use strict";V();$a();De();$a();Uae=Io(),Bae=`${he()}-wake`,Gae=he(),Ct=()=>{let e=C();return qi({filePort:ja(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:Io(e)})},tR=e=>{let t=C();ja(t)===null&&Mp(t,e)}});var rR=l(()=>{"use strict";mp();re();gp();ZW();le();Ha()});var lA,Fa,Ua,oR=l(()=>{"use strict";lA=g(require("node:os"));rR();Fa=()=>{let e=se();return{ok:!0,port:Ct(),hostname:lA.default.hostname(),profileCount:e.length}},Ua=()=>{let e=se(),t=aA(),r=bS();return{hostname:lA.default.hostname(),port:Ct(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var cA=l(()=>{"use strict";oR()});var nR,sR,iR,Np,ws=l(()=>{"use strict";nR="materialization.json",sR="backups",iR=".gitignore",Np=e=>`harness-set:${e.trim()}`});var aR,lR,Dp,cR=l(()=>{"use strict";aR=g(require("node:crypto")),lR=g(require("node:fs")),Dp=e=>{try{let t=lR.default.readFileSync(e);return aR.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var oo,Qo,s8,dR,dA,uR=l(()=>{"use strict";oo=g(require("node:fs")),Qo=g(require("node:path"));cR();s8=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=Qo.default.join(t,n,o);return oo.default.mkdirSync(Qo.default.dirname(s),{recursive:!0}),oo.default.copyFileSync(r,s),Qo.default.relative(e,s).replaceAll("\\","/")},dR=e=>{let t=Qo.default.join(e.repoRoot,e.repoRelativeDestination),r=Dp(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(oo.default.existsSync(t)){let n=Dp(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=s8(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return oo.default.mkdirSync(Qo.default.dirname(t),{recursive:!0}),oo.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return oo.default.mkdirSync(Qo.default.dirname(t),{recursive:!0}),oo.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},dA=e=>{let t=Dp(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var uA,pR,vs,zp=l(()=>{"use strict";uA=g(require("node:fs"));ws();pR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vs=e=>{if(!uA.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(uA.default.readFileSync(e,"utf8"));if(pR(t)&&t.version===1&&pR(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var no,jp,$p,pA=l(()=>{"use strict";no=g(require("node:fs")),jp=g(require("node:path"));ws();$p=e=>{let t=new Set(e.setSlugs.map(s=>Np(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=jp.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=jp.default.join(e.repoRoot,i.backupPath);no.default.existsSync(c)?(no.default.mkdirSync(jp.default.dirname(a),{recursive:!0}),no.default.copyFileSync(c,a),o.push(s)):no.default.existsSync(a)&&no.default.rmSync(a,{force:!0})}else no.default.existsSync(a)&&no.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var mA,Ts,Hp=l(()=>{"use strict";mA=g(require("node:path"));ws();Ts=e=>({ledgerFilePath:mA.default.join(e.metaDirPath,nR),backupsDirPath:mA.default.join(e.metaDirPath,sR)})});var gA,mR,gR=l(()=>{"use strict";gA=g(require("node:path")),mR=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return gA.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return gA.default.posix.join(s,e,n)}});var fA,fR,Ga,hA=l(()=>{"use strict";fA=g(require("node:fs")),fR=g(require("node:path")),Ga=(e,t)=>{fA.default.mkdirSync(fR.default.dirname(e),{recursive:!0}),fA.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var yA,i8,Ye,en=l(()=>{"use strict";yA=g(require("node:os")),i8=e=>{let t=e.trim();return t.startsWith("~/")?`${yA.default.homedir()}${t.slice(1)}`:t==="~"?yA.default.homedir():t},Ye=i8});var Fp,hR,a8,yR,SR=l(()=>{"use strict";Fp=g(require("node:fs")),hR=g(require("node:path"));ws();zo();a8=`*
!${Ku}
`,yR=e=>{let t=hR.default.join(e,iR);Fp.default.existsSync(t)||(Fp.default.mkdirSync(e,{recursive:!0}),Fp.default.writeFileSync(t,a8))}});var tn,ft,rn=l(()=>{"use strict";tn=g(require("node:path"));zo();en();ft=e=>{let t=Ye(e),r=tn.default.join(t,wE);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:tn.default.join(r,"rag"),memoryDirPath:tn.default.join(r,vE),reportsDirPath:tn.default.join(r,kE),metaFilePath:tn.default.join(r,Ku),ragChunksFilePath:tn.default.join(r,"rag",TE)}}});var Jt,bR,l8,c8,Ge,Up=l(()=>{"use strict";Jt=g(require("node:fs")),bR=g(require("node:path"));zo();SR();rn();l8=(e,t)=>{if(Jt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Jt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},c8=e=>{Jt.default.existsSync(e.ragChunksFilePath)||Jt.default.writeFileSync(e.ragChunksFilePath,"");let t=bR.default.join(e.memoryDirPath,os);Jt.default.existsSync(t)||Jt.default.writeFileSync(t,"")},Ge=e=>{let t=ft(e.projectFolderPath);return Jt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Jt.default.mkdirSync(t.ragDirPath,{recursive:!0}),Jt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),yR(t.metaDirPath),l8(t,e),c8(t),{ok:!0,layout:t}}});var PR,_R,wR,vR,Bp,Gp=l(()=>{"use strict";PR="components",_R="store",wR="versions",vR="installed.json",Bp=e=>`harness-set:${e.trim()}`});var SA,TR,qp,AA=l(()=>{"use strict";SA=g(require("node:fs")),TR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qp=e=>{if(!SA.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(SA.default.readFileSync(e,"utf8"));if(TR(t)&&t.version===1&&TR(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var qa,ks,Vp=l(()=>{"use strict";qa=g(require("node:path"));Gp();ks=e=>{let t=qa.default.join(e,PR);return{componentsRootDir:t,storeDir:qa.default.join(t,_R),versionsDir:qa.default.join(t,wR),installedFilePath:qa.default.join(t,vR)}}});var bA,kR,Kp,Jp,Yp=l(()=>{"use strict";bA=g(require("node:crypto")),kR=g(require("node:fs")),Kp=e=>bA.default.createHash("sha256").update(e,"utf8").digest("hex"),Jp=e=>{try{let t=kR.default.readFileSync(e);return bA.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var PA,CR,LR,ER=l(()=>{"use strict";PA=g(require("node:fs")),CR=g(require("node:path")),LR=(e,t)=>{PA.default.mkdirSync(CR.default.dirname(e),{recursive:!0}),PA.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var _A,wA,WR,RR=l(()=>{"use strict";_A=g(require("node:fs")),wA=g(require("node:path")),WR=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=wA.default.join(e,r),n=wA.default.join(o,`${t.versionId}.json`);_A.default.mkdirSync(o,{recursive:!0}),_A.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var Xp,xR,IR,OR=l(()=>{"use strict";Xp=g(require("node:fs")),xR=g(require("node:path"));Yp();IR=e=>{let t=Kp(e.content),r=xR.default.join(e.storeDir,t);return Xp.default.existsSync(r)||(Xp.default.mkdirSync(e.storeDir,{recursive:!0}),Xp.default.writeFileSync(r,e.content)),t}});var vA,MR,d8,Zp,TA=l(()=>{"use strict";vA=g(require("node:fs")),MR=g(require("node:path"));Gp();AA();Vp();Yp();ER();RR();OR();d8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Zp=e=>{let t=ks(e.installDir),r=Bp(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!d8(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=MR.default.join(e.harnessRootDir,a);if(!vA.default.existsSync(c))continue;let d=vA.default.readFileSync(c,"utf8"),u=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Jp(c);if(u!==null){if(Kp(d)!==u)throw new Error(`Harness item "${i.id}" failed content hash verification.`);IR({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:u})}}if(n.length===0)return;WR(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=qp(t.installedFilePath);LR(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var CA,kA,NR,DR=l(()=>{"use strict";CA=g(require("node:fs"));TA();AA();Vp();kA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),NR=e=>{if(!CA.default.existsSync(e.harnessManifestPath))return;let t=ks(e.installDir),r=qp(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(CA.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!kA(o)||o.version!==1||!kA(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!kA(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Zp({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var LA,zR,jR,$R=l(()=>{"use strict";LA=g(require("node:fs")),zR=g(require("node:path")),jR=e=>{let t=e.componentId.replaceAll("/","_"),r=zR.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!LA.default.existsSync(r))return null;try{let o=JSON.parse(LA.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Qp,em,HR,FR=l(()=>{"use strict";Qp=g(require("node:fs")),em=g(require("node:path"));Gp();DR();$R();Vp();Yp();HR=e=>{NR({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=ks(e.layout.installDir),r=Bp(e.setSlug),o=jR({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=em.default.join(t.storeDir,i.contentSha256);if(Qp.default.existsSync(a)&&Jp(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?em.default.join(e.layout.harnessRootDir,n):em.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Qp.default.existsSync(s))return null;try{if(!Qp.default.statSync(s).isFile())return null}catch{return null}return s}});var UR,u8,EA,Yt,Va=l(()=>{"use strict";zp();Hp();rn();UR="harness-set:",u8=e=>{let t=e.trim();if(!t.startsWith(UR))return null;let r=t.slice(UR.length).trim();return r.length>0?r:null},EA=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=u8(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Yt=e=>{let t=ft(e),{ledgerFilePath:r}=Ts(t),o=vs(r);return EA(o)}});var tm,WA,Ka,p8,Ar,Ja,Cs=l(()=>{"use strict";tm=g(require("node:fs")),WA=g(require("node:os")),Ka=g(require("node:path")),p8=()=>tm.default.realpathSync(Ka.default.resolve(WA.default.homedir())),Ar=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Ka.default.join(WA.default.homedir(),t.slice(1)):t,o;try{o=tm.default.realpathSync(Ka.default.resolve(r))}catch{return null}let n=p8();return o===n||o.startsWith(`${n}${Ka.default.sep}`)?o:null},Ja=e=>{let t=Ar(e);if(t===null)return null;try{if(!tm.default.statSync(t).isFile())return null}catch{return null}return t}});var RA,xA=l(()=>{"use strict";RA=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var om,BR,rm,m8,Ya,IA=l(()=>{"use strict";om=g(require("node:fs")),BR=g(require("node:path"));ws();uR();zp();pA();Hp();gR();hA();en();Up();FR();Va();Cs();xA();rm=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),m8=e=>{if(!om.default.existsSync(e))return null;try{let t=JSON.parse(om.default.readFileSync(e,"utf8"));if(rm(t)&&t.version===1)return t}catch{return null}return null},Ya=e=>{let t=[...new Set(e.setSlugs.map(A=>A.trim()).filter(A=>A.length>0))],r=Ye(e.projectFolderPath),o=Ar(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=om.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Ge({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Ts(s.layout),d=Yt(o).filter(A=>!t.includes(A)),u=vs(i),m=0;if(d.length>0){let A=$p({repoRoot:o,setSlugs:d,ledger:u});u=A.ledger,m=A.summary.removedPaths.length}if(t.length===0)return Ga(i,u),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let S=m8(e.layout.harnessManifestPath);if(S===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=rm(S.sets)?S.sets:{},y=0,p=0,b=0;for(let A of t){let f=h[A];if(!rm(f))return{ok:!1,errorMessage:`Harness set "${A}" is not installed locally.`};let P=typeof f.version=="number"?String(f.version):"1",w=Np(A),T=Array.isArray(f.items)?f.items:[];for(let k of T){if(!rm(k))continue;let L=typeof k.path=="string"?k.path.trim():"";if(L.length===0)continue;let R=RA(L);if(R===null)continue;let I=mR(A,R),N=BR.default.posix.join(".cursor",I).replaceAll("\\","/"),U=typeof k.id=="string"?k.id.trim():"",G=HR({layout:e.layout,setSlug:A,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:L,manifestItemId:U});if(G===null)continue;let q=dR({repoRoot:o,backupsDir:a,repoRelativeDestination:N,sourceAbsolutePath:G,componentId:w,versionId:P,ledger:u});if(q.kind==="skipped_unchanged"){p+=1;continue}if(q.kind==="backed_up_user_file"){b+=1,y+=1,u={version:1,entries:{...u.entries,[N]:dA({componentId:w,versionId:P,sourceAbsolutePath:G,backupPath:q.backupPath})}};continue}y+=1,u={version:1,entries:{...u.entries,[N]:dA({componentId:w,versionId:P,sourceAbsolutePath:G})}}}}return y===0&&p===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(Ga(i,u),{ok:!0,writtenFileCount:y,skippedFileCount:p,backedUpFileCount:b,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var GR,nm,g8,f8,h8,y8,S8,A8,b8,P8,_8,Xa,sm=l(()=>{"use strict";GR=g(require("node:crypto")),nm=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},g8=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},f8=(e,t)=>{let r=g8(t),o=nm(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},h8=(e,t,r)=>{let o=f8(t,r);return`shared/items/${e}/${o}`},y8=["rules","skills","commands","instructions","agents"],S8=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),A8=(e,t)=>[...e.filter(o=>o.id!==t.id),t],b8=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},P8=e=>GR.default.createHash("sha256").update(e,"utf8").digest("hex"),_8=e=>({id:e.id,kind:e.kind,title:e.title,path:h8(e.id,e.kind,e.title),contentSha256:P8(e.content)}),Xa=e=>{let t=new Date().toISOString(),r=e.existingManifest??S8(e.hostname,t),o=nm(e.bundle.slug),n=b8(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...y8.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,u)=>{let m=_8(u);return{files:[...d.files,{relativePath:m.path,content:u.content}],nextItems:A8(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var so,qR,im,w8,on,OA=l(()=>{"use strict";so=g(require("node:fs")),qR=g(require("node:os")),im=g(require("node:path"));sm();w8=e=>{if(!so.default.existsSync(e))return null;try{let t=JSON.parse(so.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},on=e=>{try{let t=w8(e.layout.harnessManifestPath),r=Xa({bundle:e.bundle,hostname:qR.default.hostname(),existingManifest:t});so.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)so.default.mkdirSync(im.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=im.default.join(e.layout.harnessRootDir,o.relativePath);so.default.mkdirSync(im.default.dirname(n),{recursive:!0}),so.default.writeFileSync(n,o.content)}return so.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var MA,VR=l(()=>{"use strict";OA();IA();MA=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=on({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Ya({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var KR,JR=l(()=>{"use strict";KR=["rule","skill","command","instruction","agent"]});var YR,v8,T8,Xt,NA=l(()=>{"use strict";JR();YR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),v8=e=>typeof e=="string"&&KR.includes(e),T8=e=>{if(!YR(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!v8(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Xt=e=>{if(!YR(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=T8(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var XR,k8,DA,ZR=l(()=>{"use strict";XR=require("node:zlib");NA();k8="x-agent-witch-token",DA=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[k8]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,XR.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=Xt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var jA,zA,Zt,QR=l(()=>{"use strict";jA=g(require("node:fs")),zA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Zt=e=>{if(!jA.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(jA.default.readFileSync(e.harnessManifestPath,"utf8"));if(!zA(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=zA(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!zA(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",u=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:u.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var am,ex=l(()=>{"use strict";am=()=>"~"});var tx,rx,ox=l(()=>{"use strict";tx=require("node:crypto"),rx=e=>`local-${(0,tx.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var $A,nx=l(()=>{"use strict";$A=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Za,lm,HA=l(()=>{"use strict";Za=g(require("node:path")),lm=e=>{let t=Za.default.dirname(e),r=Za.default.basename(t);return r==="agents"?Za.default.basename(Za.default.dirname(t)):r}});var Qa,br,sx,C8,L8,E8,cm,ix,FA=l(()=>{"use strict";Qa=g(require("node:fs")),br=g(require("node:path"));ox();nx();HA();sx=new Set(["node_modules",".git","dist","build",".next","coverage"]),C8=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},L8=(e,t)=>{let r=br.default.basename(t);if(e==="skill"){let o=t.split(br.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},E8=e=>{let t=[],r=(n,s)=>{let i;try{i=Qa.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&sx.has(a.name))continue;let c=br.default.join(n,a.name),d=s?br.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;$A(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=br.default.join(e,n);Qa.default.existsSync(s)&&r(s,n)}let o=br.default.join(e,"skills");return Qa.default.existsSync(o)&&r(o,"skills"),t},cm=e=>{let t=E8(e);if(t.length===0)return null;let r=br.default.dirname(e),o=lm(e),n=C8(o),s=t.map(i=>{let a=$A(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:rx(i.absolutePath),kind:a,title:L8(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},ix=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Qa.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||sx.has(a.name))continue;let c=br.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var ax,UA,W8,BA,lx=l(()=>{"use strict";ax=g(require("node:fs")),UA=g(require("node:path"));FA();Cs();W8=e=>{let t=Ar(e.trim());if(t===null)return null;if(UA.default.basename(t)===".cursor")return t;let r=UA.default.join(t,".cursor");try{if(ax.default.statSync(r).isDirectory())return Ar(r)}catch{return null}return null},BA=e=>{let t=W8(e.projectPath);if(t===null)return null;let r=cm(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var cx,R8,dm,GA,dx=l(()=>{"use strict";cx=g(require("node:path"));FA();Cs();HA();R8=5,dm=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},GA=e=>{let t=Ar(e.scanRoot.trim());if(t===null)return dm(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of ix(t,R8,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=Ar(s);if(i===null)continue;let a=lm(i);dm(e.response,"folder",{cursorDir:i,groupName:a,repoPath:cx.default.dirname(i)});let c=cm(i);c!==null&&(r.push(c),dm(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return dm(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var ux,px,mx=l(()=>{"use strict";ux=g(require("node:path")),px=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:ux.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var qe,gx,qA,x8,VA,KA,um,JA,el,fx=l(()=>{"use strict";qe=g(require("node:fs")),gx=g(require("node:os")),qA=g(require("node:path"));sm();TA();Cs();mx();x8=e=>{if(!qe.default.existsSync(e))return null;try{let t=JSON.parse(qe.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},VA=e=>{let t=e.hostname??gx.default.hostname(),r=x8(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(u=>u.include);if(a.length===0)continue;let c=[];for(let u of a){let m=Ja(u.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let S=qe.default.readFileSync(m,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:S,setSlugs:[i.slug]})}let d=Xa({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)n.add(u);for(let u of d.files)s.push(u),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{qe.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)qe.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=qA.default.join(e.layout.harnessRootDir,i.relativePath);qe.default.mkdirSync(qA.default.dirname(a),{recursive:!0}),qe.default.writeFileSync(a,i.content)}qe.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(u=>u.include))continue;let c=nm(i.slug),d=r.sets[c];d!==void 0&&Zp({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},KA="reveal-cache.json",um=(e,t)=>{qe.default.mkdirSync(e.harnessRootDir,{recursive:!0}),qe.default.writeFileSync(`${e.harnessRootDir}/${KA}`,`${JSON.stringify(t,null,2)}
`)},JA=e=>{let t=`${e.harnessRootDir}/${KA}`;qe.default.existsSync(t)&&qe.default.unlinkSync(t)},el=e=>{let t=`${e.harnessRootDir}/${KA}`;if(!qe.default.existsSync(t))return null;try{let r=JSON.parse(qe.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return px(r)}catch{return null}return null}});var io=l(()=>{"use strict";IA();VR();xA();OA();ZR();NA();sm();QR();ex();lx();Cs();dx();fx()});var YA,hx=l(()=>{"use strict";io();De();YA=e=>{let t=M(e.profileEmail);return on({bundle:e.bundle,layout:t})}});var yx=l(()=>{"use strict";hx();io()});var I8,Sx,O8,Ax,nn,pm,bx=l(()=>{"use strict";I8=["agentwitch.com","www.agentwitch.com"],Sx=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,O8=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},Ax=e=>{let t=O8(e);return!!(I8.includes(t)||Sx.test(e.trim().toLowerCase()))},nn=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return Ax(r)?Sx.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},pm=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:nn(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var tl=l(()=>{"use strict";bx()});var Pr,rl=l(()=>{"use strict";Pr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var ol,Px=l(()=>{"use strict";yx();tl();rl();ol=e=>{if(!Pr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Xt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!nn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=YA({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var XA=l(()=>{"use strict";Px()});var M8,Ls,ZA=l(()=>{"use strict";M8=e=>e==="hourly"||e==="daily"||e==="weekdays",Ls=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!M8(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var nl,mm,_x,wx,QA,Lt,gm,fm,hm,ym,Sm=l(()=>{"use strict";nl=g(require("node:fs")),mm=g(require("node:path"));ZA();_x="automations.json",wx=e=>e.profileEmail!==null?mm.default.join(e.installDir,"profiles",e.profileEmail,_x):mm.default.join(e.installDir,_x),QA=()=>({version:1,automations:[]}),Lt=e=>{let t=wx(e);if(!nl.default.existsSync(t))return QA();try{let r=JSON.parse(nl.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?QA():{version:1,automations:r.automations.flatMap(n=>{let s=Ls(n);return s!==null?[s]:[]})}}catch{return QA()}},gm=(e,t)=>{let r=wx(e);nl.default.mkdirSync(mm.default.dirname(r),{recursive:!0}),nl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},fm=(e,t)=>{gm(e,{version:1,automations:t})},hm=(e,t)=>{let o=Lt(e).automations.filter(n=>n.id!==t.id);gm(e,{version:1,automations:[...o,t]})},ym=(e,t)=>Lt(e).automations.find(r=>r.id===t)??null});var $e,_r=l(()=>{"use strict";$e="x-agent-witch-token"});var eb=l(()=>{"use strict";lp();dp()});var X,sn,tb,sl,rb,N8,ob,il,an,nb,Es=l(()=>{"use strict";_r();eb();X=e=>{let t=Le(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},sn=e=>({[$e]:e,"Content-Type":"application/json"}),tb=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:sn(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},sl=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:sn(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},rb=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:sn(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},N8=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},ob=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:sn(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},il=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:sn(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return N8(r)}catch{return null}},an=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:sn(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},nb=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:sn(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var ln,vx,Tx,D8,sb,kx,ib=l(()=>{"use strict";ln=g(require("node:fs")),vx=g(require("node:path")),Tx=e=>vx.default.join(e.harnessRootDir,"projects-registry.json"),D8=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),sb=e=>{let t=Tx(e);if(!ln.default.existsSync(t))return[];try{let r=JSON.parse(ln.default.readFileSync(t,"utf8"));return D8(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},kx=e=>{let t=Tx(e);if(!ln.default.existsSync(t))return;let r=`${t}.migrated`;if(ln.default.existsSync(r)){ln.default.unlinkSync(t);return}ln.default.renameSync(t,r)}});var Cx,z8,j8,Lx,Ex=l(()=>{"use strict";en();Cx=e=>Ye(e),z8=e=>new Set(e.map(t=>Cx(t.folderPath))),j8=e=>new Set(e.map(t=>t.id)),Lx=(e,t)=>{let r=z8(t),o=j8(t),n=[],s=new Set;for(let i of e){let a=Cx(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var ab,lb=l(()=>{"use strict";Es();ib();Ex();ab=async(e,t)=>{let r=sb(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=X({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await il(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=Lx(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await ob(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&kx(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var cb,wr,al=l(()=>{"use strict";cb=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),wr=(e,t)=>e.find(r=>r.id===t)??null});var ao,ll=l(()=>{"use strict";Es();lb();al();ao=async(e,t)=>{t!==void 0&&await ab(t,e);let r=X({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await il(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=cb(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var Wx=l(()=>{"use strict"});var $8,H8,Am,db=l(()=>{"use strict";$8="Default",H8=e=>e.trim().toLowerCase()===$8.toLowerCase(),Am=H8});var Q,Rx,F8,U8,B8,G8,q8,lo,bm=l(()=>{"use strict";db();Q=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Rx=(e,t)=>e.length===0?`<p class="empty">${Q(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Q(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Q(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,F8=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,U8=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from Agent Witch Cloud.":"This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Q(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},B8=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
        <p><strong>${Q(r)}</strong> <span class="muted">already in this repo</span></p>
        <form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this Mac.');">
          <input type="hidden" name="projectId" value="${Q(e.project.id)}" />
          <input type="hidden" name="setSlug" value="${Q(r)}" />
          <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
        </form>
      </li>`).join("")}</ul>`;return e.boundHarnessCount>0?`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Nothing is installed in the Mac profile \u2014 refresh from Agent Witch Cloud only if you need an update.</p>
        ${t}
        <form method="POST" action="/projects/pull-bound-harness" class="actions">
          <input type="hidden" name="projectId" value="${Q(e.project.id)}" />
          <button class="btn btn-secondary" type="submit">Refresh in repo\u2026</button>
        </form>
      </div>`:`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Open Harness to install playbooks on this Mac if you want to change them.</p>
        ${t}
        <div class="actions">
          <a class="btn btn-secondary" href="/harness">Open Harness</a>
        </div>
      </div>`},G8=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?B8({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?U8({project:e.project,alreadyInRepo:!1}):F8();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",a=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),u=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this Mac.');">
            <input type="hidden" name="projectId" value="${Q(e.project.id)}" />
            <input type="hidden" name="setSlug" value="${Q(c.slug)}" />
            <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
          </form>`:"";return`<li class="harness-installed-set">
          <label class="check-row">
            <input form="link-harness-form" type="checkbox" name="applySet" value="${Q(c.slug)}"${t.size===0||d?" checked":""} />
            <span><strong>${Q(c.name)}</strong> <span class="muted mono">(${Q(c.slug)})</span></span>
          </label>
          <p class="muted">${c.itemCount} item(s)${d?' \xB7 <span class="muted">in repo</span>':""}</p>
          ${u}
        </li>`}).join("")}</ul>`;return`<div class="stack">
        <form id="link-harness-form" method="POST" action="/projects/link-harness">
          <input type="hidden" name="projectId" value="${Q(e.project.id)}" />
          <p class="field-label">Installed</p>
          <p class="lede">${n}</p>
        </form>
        ${a}
        <div class="actions">
          <button form="link-harness-form" class="${i}" type="submit">${s}</button>
        </div>
      </div>`},q8=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Q(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Q(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},lo=e=>{let t=e.flashError?`<div class="alert-error">${Q(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Q(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(m,S)=>`<a class="project-tab${e.activeTab===m?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${m}">${Q(S)}</a>`,n=e.composition?.items.filter(m=>m.kind==="workflow")??[],s=e.composition?.items.filter(m=>m.kind==="agent")??[],i="";e.activeTab==="harness"?i=G8({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=Rx(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=Rx(s,"No agents installed for this project yet."):i=q8({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});let a=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,c=`${a}?rename=1`,d=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${Q(a)}" target="_blank" rel="noopener noreferrer">Open in Agent Witch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${Q(c)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,u=Am(e.project.name)?"":`<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from Agent Witch Cloud only. The folder on this Mac is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from Agent Witch Cloud? Your repo folder on this Mac will stay.');">
          <input type="hidden" name="projectId" value="${Q(e.project.id)}" />
          <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
      </section>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Q(e.project.name)}</h1>
      <p class="muted mono">${Q(e.project.projectFolderPath)}</p>
      ${d}
      <div class="actions"><a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(e.project.id)}">Change folder\u2026</a></div>
      <nav class="project-tabs" aria-label="Project composition">
        ${o("harness",`Playbooks (${r.harness})`)}
        ${o("workflows",`Workflows (${r.workflow})`)}
        ${o("agents",`Agents (${r.agent})`)}
        ${o("knowledge",`Knowledge (${e.knowledgeCandidateCount})`)}
      </nav>
      <div class="project-tab-panel">
        ${i}
      </div>
    </section>${u}`}});var V8,K8,xx,Ix=l(()=>{"use strict";io();_r();V8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),K8=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!V8(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Xt(n);return s===null?[]:[s]})}catch{return null}},xx=K8});var Ox,ub,Mx=l(()=>{"use strict";le();io();bm();ll();Ix();al();Va();Es();gt();Ox=e=>({kind:"page",title:e.project.name,body:lo({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Zt(e.layout),linkedSetSlugs:Yt(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),ub=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let o=await ao(r,e.layout),n=wr(o.projects,t);if(n===null)return{kind:"not_found"};let s=X({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??it,a=s===null?null:await xx(s,n.id);if(a===null)return Ox({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=MA({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return Ox({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await an(s,n.id,c.appliedSetSlugs),u=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${u.toString()}`}}});var Nx,pb,Dx=l(()=>{"use strict";le();io();gt();Es();bm();Up();en();ll();al();Va();zp();pA();Hp();hA();Nx=e=>({kind:"page",title:e.project.name,body:lo({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Zt(e.layout),linkedSetSlugs:Yt(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),pb=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=$();if(n===null)return{kind:"not_found"};let s=await ao(n,e.layout),i=wr(s.projects,r);if(i===null)return{kind:"not_found"};let a=X({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=a?.appOrigin??it;if(o.length===0)return Nx({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=Ye(i.projectFolderPath),u=Ge({projectFolderPath:d}),{ledgerFilePath:m}=Ts(u.layout),S=vs(m),h=EA(S);if(!h.includes(o))return Nx({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let y=h.filter(f=>f!==o),p=$p({repoRoot:u.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:S});Ga(m,p.ledger);let b=a===null?!1:await an(a,i.id,y),A=new URLSearchParams({linked:"1",removed:o,files:String(p.summary.removedPaths.length),bindingsSynced:b?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${A.toString()}`}}});var J8,mb,zx=l(()=>{"use strict";J8=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,mb=J8});var jx=l(()=>{"use strict"});var $x=l(()=>{"use strict"});var Hx=l(()=>{"use strict";jx();$x()});var Y8,co,Fx=l(()=>{"use strict";Y8=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],co=(e=process.env)=>{let t={...e};for(let r of Y8)delete t[r];return t}});var Ux=l(()=>{"use strict";Fx()});var gb,Bx=l(()=>{"use strict";gb={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var fb=l(()=>{"use strict";Bx()});var Pm,hb=l(()=>{"use strict";Pm={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var _m=l(()=>{"use strict";Hx();Ux();gt();fb();hb()});var Gx,qx,X8,wm,vm,Vx=l(()=>{"use strict";Gx=require("node:child_process"),qx=require("node:util");_m();X8=(0,qx.promisify)(Gx.execFile),wm=async(e,t)=>{try{let{stdout:r}=await X8("git",t,{cwd:e,env:co(),maxBuffer:1048576});return r.trim()}catch{return null}},vm=async e=>{let t=await wm(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await wm(e,["rev-parse","--abbrev-ref","HEAD"]),o=await wm(e,["status","--porcelain"]),n=await wm(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var yb,Kx=l(()=>{"use strict";yb=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var Z8,Sb,Jx=l(()=>{"use strict";Z8=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},Sb=Z8});var Q8,Ab,Yx=l(()=>{"use strict";_r();Q8=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[$e]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},Ab=Q8});var Xx,uo,Zx=l(()=>{"use strict";Xx=require("node:child_process"),uo=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,Xx.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var Qx=l(()=>{"use strict";ll()});var cl,e0=l(()=>{"use strict";_r();cl=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[$e]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var bb,t0=l(()=>{"use strict";_r();bb=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var Qt=l(()=>{"use strict";ll();al();Wx();en();Up();Mx();Dx();Va();zx();Vx();Kx();Jx();Yx();Zx();Qx();e0();t0();lb();ib();Es()});var Tm,dl,r0,Pb,cn,_b=l(()=>{"use strict";Tm=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},dl=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Tm(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},r0=e=>e>=1&&e<=5,Pb=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Tm(t,"UTC")},cn=e=>{let t=e.from??new Date,r=Tm(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return dl(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=dl(r,e.timeZone,o,0),s=Tm(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?dl(Pb(r),e.timeZone,o,0):n;if(!i&&r0(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=Pb(a),r0(a.weekday))return dl(a,e.timeZone,o,0);return dl(Pb(r),e.timeZone,o,0)}});var o0,wb,vr,vb=l(()=>{"use strict";o0=require("node:crypto");le();Qt();_b();Sm();wb=!1,vr=async e=>{if(wb)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=X({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=ym(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};wb=!0;let n=(0,o0.randomUUID)();try{let s=await Ps(t,"claude-cli",o.prompt);await nb(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=cn({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return hm(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{wb=!1}}});var km,n0=l(()=>{"use strict";le();vb();Sm();km=async()=>{let e=$();if(e===null)return;let t=Lt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await vr(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var ul=l(()=>{"use strict";Sm();n0();vb();_b()});var s0=l(()=>{"use strict";ul()});var i0=l(()=>{"use strict";ZA()});var a0=l(()=>{"use strict";i0()});var Tb=l(()=>{"use strict";ul()});var e3,t3,pl,kb=l(()=>{"use strict";s0();a0();Tb();De();e3=e=>e!==void 0&&e.trim().length>0?M(e.trim()):M(),t3=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??cn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??cn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},pl=e=>{let t=e3(e.profileEmail),r=Lt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Ls(s);return i!==null?[t3(i,o.get(i.id))]:[]});return fm(t,n),{ok:!0,writtenCount:n.length}}});var Cb=l(()=>{"use strict";ul()});var l0=l(()=>{"use strict";le()});var c0=l(()=>{"use strict";kb();Cb();Tb();l0()});var d0,ml,gl,fl,u0=l(()=>{"use strict";d0=g(require("node:os"));c0();tl();rl();ml=e=>{if(!Pr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!nn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=pl({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},gl=async e=>{if(!Pr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:nn(t)?vr(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},fl=()=>{let e=$(),t=e!==null?Lt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:d0.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var Lb=l(()=>{"use strict";u0()});var Cm=l(()=>{"use strict";re()});var Lm=l(()=>{"use strict";re()});var Em,m0,g0,p0,r3,o3,Ws,Eb=l(()=>{"use strict";Em=g(require("node:fs")),m0=g(require("node:os")),g0=g(require("node:path"));Cm();Lm();$a();De();p0=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},r3=e=>g0.default.join(m0.default.homedir(),"Library","LaunchAgents",`${e}.plist`),o3=async e=>Em.default.existsSync(r3(e))?(await Ne(e)).ok:!1,Ws=async(e=C())=>{let t=Em.default.existsSync(Op(e)),r=!Em.default.existsSync(mr(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=ja(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await p0(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${he(e)}-wake`;await o3(i)&&s.push(i);for(let c of se(e))(await Ne(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await p0(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var f0=l(()=>{"use strict";re()});var Wb=l(()=>{"use strict";Jo();re()});var Rb=l(()=>{"use strict";Jo()});var xb=l(()=>{"use strict";re()});var y0,h0,hl,Ib=l(()=>{"use strict";y0=g(require("node:fs"));gt();Cm();Lm();De();h0=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},hl=async(e=C())=>{if(!y0.default.existsSync(mr(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await h0())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of se(e))(await Ne(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await h0();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var S0=l(()=>{"use strict";re()});var A0,dn,Ob,n3,s3,i3,b0,a3,P0,Rs,Wm=l(()=>{"use strict";A0=require("node:crypto"),dn=g(require("node:fs")),Ob=g(require("node:path"));De();n3="watchdog-log.ndjson",s3=200,i3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),b0=(e=C())=>{let t=M(),r=t.installDir===e?t.logsDir:rs({installDir:e,profileEmail:t.profileEmail});return Ob.default.join(r,n3)},a3=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!i3(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},P0=(e,t=C())=>{let r={id:(0,A0.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=b0(t);dn.default.mkdirSync(Ob.default.dirname(o),{recursive:!0});let n=dn.default.existsSync(o)?dn.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-s3+1)),JSON.stringify(r)];return dn.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Rs=(e=20,t=C())=>{let r=b0(t);if(!dn.default.existsSync(r))return[];let o=dn.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=a3(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var Mb,Nb,Db,zb=l(()=>{"use strict";Me();Mb=Mi.watchdogReinstallState,Nb=900*1e3,Db=3e3});var _0=l(()=>{"use strict";zb()});var w0={};Ft(w0,{verifyAgentWitchReviveAfterKickstart:()=>c3});var l3,c3,v0=l(()=>{"use strict";_0();Rb();xb();De();l3=e=>new Promise(t=>{setTimeout(t,e)}),c3=async e=>{if(await l3(e.verifyDelayMs??Db),!await Mo(e.launchAgentLabel))return!1;let r=e.profileEmail===null?M():M(e.profileEmail),o=ye(r);return!Ee(o,e.staleAfterMs)}});var yl,jb,d3,T0,k0,$b,Hb,Fb=l(()=>{"use strict";yl=g(require("node:fs")),jb=g(require("node:path"));V();zb();d3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),T0=e=>jb.default.join(e,Mb),k0=(e=C())=>{let t=T0(e);if(!yl.default.existsSync(t))return null;try{let r=JSON.parse(yl.default.readFileSync(t,"utf8"));return!d3(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},$b=(e=C(),t=Date.now())=>{let r=k0(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=Nb:!0},Hb=(e=C(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=T0(e);return yl.default.mkdirSync(jb.default.dirname(o),{recursive:!0}),yl.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var Ub,C0=l(()=>{"use strict";re();Fb();Ub=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!$b())return{attempted:!1,ok:!1,targets:e};Hb();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Ne(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var L0=l(()=>{"use strict";Fb();C0()});var Bb=l(()=>{"use strict";Vt()});var E0=l(()=>{"use strict";Vt()});var W0,xs,R0,x0,I0,u3,p3,O0,m3,g3,M0,N0=l(()=>{"use strict";W0=require("node:child_process"),xs=g(require("node:fs")),R0=g(require("node:os")),x0=g(require("node:path")),I0=require("node:util");Bb();E0();De();u3=(0,I0.promisify)(W0.execFile),p3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),O0=e=>{let t=Be(e),r=t===null?M():M(t);if(!xs.default.existsSync(r.configPath))return null;try{let o=JSON.parse(xs.default.readFileSync(r.configPath,"utf8"));return!p3(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},m3=e=>O0(e)?.wsUrl??null,g3=e=>{let t=m3(e);return t!==null?Le(t):ze(e)?.appOrigin??null},M0=async e=>{let t=e?.installDir??C(),r=O0(t),o=r!==null?Le(r.wsUrl):g3(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=x0.default.join(R0.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{xs.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??Be(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await u3("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{xs.default.existsSync(i)&&xs.default.unlinkSync(i)}}});var D0={};Ft(D0,{attemptAgentWitchWatchdogReinstall:()=>f3});var f3,z0=l(()=>{"use strict";L0();N0();f3=async e=>Ub(e,()=>M0())});var j0,$0,H0,h3,y3,S3,Sl,Gb=l(()=>{"use strict";f0();Wb();Rb();xb();Ib();Eb();Cm();Lm();De();cs();S0();Wm();j0=e=>e===null?M():M(e),$0=async(e,t,r)=>{if(!await Mo(e))return"not_running";let n=j0(t);if(Tt(n))return"healthy";let s=ye(n);return Ee(s,r)?"stale_connection":"healthy"},H0=async e=>{let t=e?.staleAfterMs??12e4,r=C(),o=se(r);return Promise.all(o.map(async n=>{let s=await $0(n.launchAgentLabel,n.profileEmail,t),i=j0(n.profileEmail),a=ye(i),c=await Mo(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Ee(a,t),needsRevive:s!=="healthy",reason:s}}))},h3=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},y3=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",S3=async e=>{let t=await Ne(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(v0(),w0)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},Sl=async e=>{if(!vt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=C();await Ws(r),await hl(r);let o=se(r),n=[];for(let u of o){let m=await $0(u.launchAgentLabel,u.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:m});continue}n.push(await S3({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let u=Oo();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(z0(),D0)),m=await u(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(u){s=!0,i=!1,a=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&P0({event:y3(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:h3(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var F0,Rm,U0=l(()=>{"use strict";F0=g(require("node:os"));Wb();Wm();Gb();Rm=async()=>{let e=await H0(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:F0.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Rs(1)[0]??null}}});var qb=l(()=>{"use strict";Eb();Gb();U0();Wm()});var Al,bl,Pl,B0=l(()=>{"use strict";re();qb();Al=async()=>{await Ws();let e=se(),t=[];for(let r of e){let o=await Ne(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Oo();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},bl=Sl,Pl=Sl});var Vb=l(()=>{"use strict";B0()});var Im,xm,G0,Kb,q0,A3,b3,P3,_3,w3,Om,V0=l(()=>{"use strict";Im=require("node:child_process"),xm=g(require("node:fs")),G0=g(require("node:os")),Kb=g(require("node:path")),q0=require("node:util");re();V();A3=(0,q0.promisify)(Im.execFile),b3=()=>Kb.default.join(G0.default.homedir(),"Library","LaunchAgents"),P3=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await A3("launchctl",["bootout",r]).catch(()=>{})},_3=e=>{let t=Kb.default.join(b3(),`${e}.plist`);xm.default.existsSync(t)&&xm.default.unlinkSync(t)},w3=e=>{(0,Im.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Om=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=C();if(!xm.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=gr(e);for(let r of t)await P3(r),_3(r);return w3(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var K0,Mm,J0,Is,Y0,v3,T3,k3,Jb,C3,Yb,X0=l(()=>{"use strict";K0=require("node:child_process"),Mm=g(require("node:fs")),J0=g(require("node:os")),Is=g(require("node:path")),Y0=require("node:util");re();v3=(0,Y0.promisify)(K0.execFile),T3=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],k3=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],Jb=e=>{Mm.default.existsSync(e)&&Mm.default.rmSync(e,{force:!0})},C3=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await v3("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},Yb=async e=>{let r=(e.listLaunchAgentLabels??gr)(e.layout.installDir),o=e.launchAgentsDir??Is.default.join(J0.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??C3;for(let i of r)await n(i),Jb(Is.default.join(o,`${i}.plist`));let s=Is.default.dirname(e.layout.configPath);for(let i of T3)Jb(Is.default.join(s,i));for(let i of k3)Jb(Is.default.join(e.layout.installDir,i));return Mm.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var Xb,Z0=l(()=>{"use strict";Xb="unknown_identity"});var Zb=l(()=>{"use strict";hb();Z0()});var L3,Qb,Q0=l(()=>{"use strict";Zb();L3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qb=e=>e.type!=="system.error"||!L3(e.payload)?!1:e.payload.errorCode===Xb});var eP=l(()=>{"use strict";V0();X0();Q0()});var Nm=l(()=>{"use strict";re();Vt();eP();qb()});var Os,Dm,zm=l(()=>{"use strict";Nm();Os=(e=20)=>Rs(e),Dm=Rm});var jm,Ms,$m,Hm=l(()=>{"use strict";Nm();jm=Vo,Ms=(e=20)=>Bo(e),$m=e=>qo(e)});var Fm,tP=l(()=>{"use strict";Nm();Fm=()=>Om()});var eI=l(()=>{"use strict";cA();XA();Lb();Vb();zm();Hm();tP()});var tI={};Ft(tI,{buildAgentWitchAutomationStatusFromWakeServer:()=>fl,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>jm,buildAgentWitchWakeHealthResponse:()=>Fa,buildAgentWitchWakeIdentityResponse:()=>Ua,buildAgentWitchWatchdogStatus:()=>Dm,installHarnessFromWakeServer:()=>ol,readAgentWitchSelfUpdateLogEntries:()=>Ms,readAgentWitchWatchdogLogEntries:()=>Os,restartAgentWitchFromWakeServer:()=>Pl,reviveAgentWitchWebSocketFromWakeServer:()=>bl,runAgentWitchSelfUpdateFromWakeServer:()=>$m,runAgentWitchUninstallLocalFromWakeServer:()=>Fm,runAutomationFromWakeServer:()=>gl,syncAutomationsFromWakeServer:()=>ml,wakeAgentWitchLaunchAgents:()=>Al});var rI=l(()=>{"use strict";eI()});var oI,nI,rP,oP,sI=l(()=>{"use strict";oI=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),nI=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?oI(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?oI(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},rP=e=>{let t=e.watchdogLogs.map(nI).join(""),r=e.updateLogs.map(nI).join("");return`<!doctype html>
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
</html>`},oP=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var iI,aI,lI=l(()=>{"use strict";iI=g(require("node:net")),aI=()=>new Promise((e,t)=>{let r=iI.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var cI,E3,W3,nP,dI=l(()=>{"use strict";cI=g(require("node:net"));re();lI();Ha();$a();De();E3=e=>new Promise(t=>{let r=cI.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),W3=e=>new Promise(t=>{setTimeout(t,e)}),nP=async(e={})=>{let t=C(),r=Ct(),o=Math.max(1,e.attempts??10),n=e.retryDelayMs??500;for(let i=1;i<=o;i+=1){if(await E3(r))return tR(r),r;i<o&&await W3(n)}let s=await aI();Mp(t,s),process.env.AGENT_WITCH_WAKE_PORT=String(s);try{Fy({launchAgentPrefix:he(t),wakePort:s})}catch(i){console.error(`[agent-witch] Could not update LaunchAgent wake port: ${i instanceof Error?i.message:String(i)}`)}return s}});var R3,sP,uI=l(()=>{"use strict";R3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sP=e=>({force:R3(e)&&e.force===!0})});var _l=l(()=>{"use strict";tl();sI();dI();uI();Uy();Qu();$o()});var iP,j,aP,lP,wl,pI=l(()=>{"use strict";iP=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},aP=e=>{e.writeHead(403),e.end()},lP=e=>e.url?.split("?")[0]??"/",wl=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var Et=l(()=>{"use strict";pI()});var x3,mI,gI=l(()=>{"use strict";Lb();Et();x3=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},mI=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,fl(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await x3(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=ml(t);return j(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await gl(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var I3,hI,fI,yI,cP,SI,dP=l(()=>{"use strict";I3=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],hI=e=>/embed|minilm|^bge-/i.test(e),fI=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),yI=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),cP=e=>e.filter(t=>t.trim().length>0&&!hI(t)),SI=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!hI(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>fI(s,o));if(n!==void 0)return n}for(let n of I3){let s=r.find(i=>fI(i,n));if(s!==void 0)return s}return r[0]??null}});var uP,PI,_I,Um,wI,AI,bI,O3,M3,N3,D3,z3,j3,Wt,vl=l(()=>{"use strict";uP=require("node:child_process"),PI=g(require("node:fs")),_I=g(require("node:os")),Um=g(require("node:path"));Vt();kt();dP();wI=3e3,AI=["claude-cli","codex","cursor","antigravity"],bI={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},O3=(e,t)=>new Promise(r=>{let o=(0,uP.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},wI);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),M3=()=>{let e=_I.default.homedir();return["ollama",Um.default.join(e,".local","bin","ollama"),Um.default.join(e,".agent-witch","ollama","ollama"),Um.default.join(e,".local-agent-witch","ollama","ollama")]},N3=e=>new Promise(t=>{let r=(0,uP.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},wI);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(yI(Buffer.concat(o).toString("utf8")))})}),D3=async()=>{for(let e of M3()){if(e!=="ollama"&&!PI.default.existsSync(e))continue;let t=await N3(e);if(t!==null)return t}return[]},z3=e=>{let t=e.installedWriterIds.map(s=>bI[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=ge(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${bI[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},j3=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:ds},Wt=async e=>{let t=AI.map(i=>{let a=bp(i,e.commands);return O3(a.command,a.args)}),[r,...o]=await Promise.all([D3(),...t]),n=AI.flatMap((i,a)=>o[a]===!0?[i]:[]),s=SI(r,j3());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:z3({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var $3,H3,pP,vI=l(()=>{"use strict";$3="http://127.0.0.1:11434",H3=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},pP=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||$3;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?H3(await o.json()):null}catch{return null}}});var mP=l(()=>{"use strict";kt();vl();vI();dP()});var F3,TI,kI=l(()=>{"use strict";mP();F3={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},TI=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:F3[t]})),ollamaModels:cP(e.ollamaModels)})});var U3,CI,LI=l(()=>{"use strict";mP();Et();kI();U3=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},CI=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Wt({commands:fe({})});return j(e.response,200,{ok:!0,...TI({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await U3(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await pP({model:r,prompt:o});return n===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var B3,EI,WI=l(()=>{"use strict";XA();Et();B3=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},EI=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await B3(e);if(t===null)return!0;let r=ol(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var RI=l(()=>{"use strict";Qt()});var gP,xI=l(()=>{"use strict";RI();rl();gP=e=>{if(!Pr(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Ge({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var II,fP,hP=l(()=>{"use strict";le();Qt();rl();II=e=>{if(!Pr(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},fP=async e=>{let t=II(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=uo("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=$();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=X({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Ge({projectFolderPath:r}),await cl(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var OI=l(()=>{"use strict";xI();hP()});var MI,NI=l(()=>{"use strict";OI();hP();Et();MI=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=gP(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await fP(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,o,r,e.cors.headers),!0}return!1}});var DI,zI=l(()=>{"use strict";_l();Hm();zm();DI=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Os(50),r=Ms(50);return e.response.writeHead(200,oP()),e.response.end(rP({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var jI,$I=l(()=>{"use strict";cA();Et();jI=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,Fa(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,Ua(),e.cors.headers),!0):!1});var HI,FI=l(()=>{"use strict";tP();Et();HI=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Fm();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var UI,BI=l(()=>{"use strict";Vb();Et();UI=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await bl();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Pl();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Al();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var GI,qI=l(()=>{"use strict";_l();Hm();Et();GI=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=jm();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=wl(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:Ms(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=sP(t),o=await $m({force:r});return j(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var VI,KI=l(()=>{"use strict";zm();Et();VI=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await Dm();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=wl(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:Os(t)},e.cors.headers),!0}return!1}});var JI,YI=l(()=>{"use strict";gI();LI();WI();NI();zI();$I();FI();BI();qI();KI();JI=[jI,DI,VI,UI,GI,HI,EI,MI,mI,CI]});var XI,ZI=l(()=>{"use strict";YI();XI=async e=>{for(let t of JI)if(await t(e))return!0;return!1}});var G3,QI,eO=l(()=>{"use strict";tl();Et();ZI();G3=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:lP(e),readJsonBody:()=>iP(e)}),QI=async(e,t,r)=>{let o=e.headers.origin,n=pm(o);try{if(o!==void 0&&o.length>0&&!n.allowed){aP(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=G3(e,t,r,n);if(await XI(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var tO,un,Bm,Gm=l(()=>{"use strict";tO=g(require("node:http"));_l();eO();un=async()=>{let e=await nP(),t=tO.default.createServer((r,o)=>{QI(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Bm=un});var rO={};Ft(rO,{runAgentWitchBridgeCli:()=>q3});var q3,oO=l(()=>{"use strict";re();Gm();q3=async()=>{nt("agent-witch-bridge");let e=await un(),t=hr(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var nO=l(()=>{"use strict";gt()});var Ns,yP,sO=l(()=>{"use strict";Ns=(e,t,r)=>e===1?t:r,yP=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Ns(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Ns(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${Ns(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Ns(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Ns(d,"month","months")} ago`;let u=Math.floor(a/365);return`${u} ${Ns(u,"year","years")} ago`}});var pn,SP,V3,K3,AP,po,Tl,bP,iO=l(()=>{"use strict";pn=g(require("node:fs")),SP=g(require("node:path")),V3="local-ws-traffic.ndjson",K3=500,AP=e=>SP.default.join(e.logsDir,V3),po=(e,t)=>{let r=AP(e);pn.default.mkdirSync(SP.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});pn.default.appendFileSync(r,`${o}
`,"utf8")},Tl=(e,t=K3)=>{let r=AP(e);if(!pn.default.existsSync(r))return[];let n=pn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},bP=e=>{let t=AP(e);pn.default.existsSync(t)&&pn.default.writeFileSync(t,"","utf8")}});var J3,aO,lO,cO=l(()=>{"use strict";Zb();J3=new Set(Object.values(Pm)),aO=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lO=e=>{if(!aO(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!J3.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!aO(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var dO,uO=l(()=>{"use strict";dO=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var Y3,X3,Z3,kl,pO=l(()=>{"use strict";uO();Y3=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,X3=e=>Y3.test(e),Z3=e=>dO(e),kl=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>kl(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&X3(o)){r[o]=Z3(n);continue}r[o]=kl(n)}return r}});var er,PP,Q3,e6,t6,_P,mO,gO,fO,r6,qm,mn,Vm,wP,hO=l(()=>{"use strict";er=g(require("node:fs")),PP=g(require("node:path"));cO();pO();Q3="local-ws-trace.ndjson",e6=1e4,t6=1440*60*1e3,_P=e=>PP.default.join(e.logsDir,Q3),mO=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},gO=e=>{if(!er.default.existsSync(e))return;let t=er.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-t6,n=t.filter(s=>{let i=mO(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-e6);er.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},fO=(e,t)=>{let r=_P(e);er.default.mkdirSync(PP.default.dirname(r),{recursive:!0}),er.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),gO(r)},r6=e=>e.parsed===null?{_empty:!0}:kl(e.parsed),qm=(e,t,r)=>{let o=lO(r);fO(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:r6(o)})},mn=(e,t)=>{fO(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:kl({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Vm=(e,t=80)=>{let r=_P(e);if(gO(r),!er.default.existsSync(r))return[];let o=er.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=mO(s);i!==null&&n.push(i)}return n.reverse()},wP=e=>{let t=_P(e);er.default.existsSync(t)&&er.default.writeFileSync(t,"","utf8")}});var mo,yO,o6,vP,Km,SO=l(()=>{"use strict";mo=g(require("node:fs")),yO=g(require("node:path")),o6=256e3,vP=e=>{mo.default.mkdirSync(yO.default.dirname(e),{recursive:!0}),mo.default.writeFileSync(e,"","utf8")},Km=(e,t=o6)=>{if(!mo.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=mo.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=mo.default.openSync(e,"r");try{mo.default.readSync(a,i,0,s,n)}finally{mo.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var Cl=l(()=>{"use strict";iO();hO();SO()});var TP,kP,AO=l(()=>{"use strict";TP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kP=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${TP(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${TP(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${TP(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var bO=l(()=>{"use strict";AO()});var CP,LP=l(()=>{"use strict";CP=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var EP=l(()=>{"use strict";wa()});var WP,RP,PO=l(()=>{"use strict";EP();WP=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},RP=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var _O=l(()=>{"use strict";LP();PO()});var wO,Ll,xP,El=l(()=>{"use strict";LP();wO=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ll=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=wO(e),r=wO(CP(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},xP=`(function () {
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
})();`});var gn,n6,IP,vO=l(()=>{"use strict";gn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),n6=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},IP=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${gn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?gn(r.direction):gn(r.kind),i=`trace-body-${o}`,a=gn(n6(r.body));return`<tr>
        <td title="${gn(r.at)}">${gn(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${gn(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var kO,s6,TO,OP,CO=l(()=>{"use strict";Me();gt();kO=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},s6=e=>kO(e)===pr?Kn:Vn,TO=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OP=e=>{let t=s6(e.installDir),o=`AW_HOME="$HOME/${kO(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${TO(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${TO(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var LO=l(()=>{"use strict";El();vO();CO();El()});var i6,Tr,Wl=l(()=>{"use strict";i6=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Tr=i6});var EO,WO,RO,xO,IO,OO,MO,Ds=l(()=>{"use strict";EO="projects",WO="knowledge",RO="chunks.ndjson",xO="lessons.ndjson",IO="error-chunks.ndjson",OO="usage-stats.json",MO="knowledge-location.json"});var Jm,a6,Ym,MP=l(()=>{"use strict";Jm=g(require("node:path"));Ds();a6=(e,t)=>{let r=t.trim(),o=Jm.default.join(e.installDir,EO,r,WO);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:Jm.default.join(o,RO),memoryRunsFilePath:Jm.default.join(o,xO)}},Ym=a6});var NP,l6,NO,DO=l(()=>{"use strict";NP=g(require("node:fs"));Ds();rn();l6=e=>{let t=ft(e.projectFolderPath),r=`${t.metaDirPath}/${MO}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};NP.default.mkdirSync(t.metaDirPath,{recursive:!0}),NP.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},NO=l6});var zs,jO,zO,c6,$O,HO=l(()=>{"use strict";zs=g(require("node:fs")),jO=g(require("node:path"));zo();rn();MP();DO();zO=(e,t)=>{zs.default.existsSync(e)&&(zs.default.existsSync(t)&&zs.default.statSync(t).size>0||(zs.default.mkdirSync(jO.default.dirname(t),{recursive:!0}),zs.default.copyFileSync(e,t)))},c6=e=>{let t=ft(e.projectFolderPath),r=Ym(e.layout,e.projectId),o=`${t.memoryDirPath}/${os}`;zO(t.ragChunksFilePath,r.ragChunksFilePath),zO(o,r.memoryRunsFilePath),NO({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},$O=c6});var DP,d6,FO,UO=l(()=>{"use strict";DP=g(require("node:fs"));rn();d6=e=>{let t=ft(e);if(!DP.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(DP.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},FO=d6});var BO,u6,js,Xm=l(()=>{"use strict";BO=g(require("node:path"));zo();rn();HO();UO();MP();u6=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=FO(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){$O({layout:e.layout,projectFolderPath:t,projectId:o});let s=Ym(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=ft(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:BO.default.join(n.memoryDirPath,os),projectId:null}},js=u6});var Zm,m6,Qm,zP=l(()=>{"use strict";Zm=g(require("node:fs"));Ds();m6=(e,t=500)=>{if(!Zm.default.existsSync(e))return;let r=Zm.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Zm.default.writeFileSync(e,`${o.join(`
`)}
`)},Qm=m6});var eg,g6,fn,jP=l(()=>{"use strict";eg=g(require("node:path"));Ds();Xm();g6=e=>{let t=js(e);if(t===null)return null;let r=eg.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:eg.default.join(r,OO),errorChunksFilePath:eg.default.join(r,IO)}},fn=g6});var qO,Rl,VO,GO,$P,KO,y6,HP,JO,FP,UP,BP,GP=l(()=>{"use strict";qO=require("node:crypto"),Rl=g(require("node:fs")),VO=g(require("node:path"));Wl();Ds();jP();GO=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),$P=e=>{if(!Rl.default.existsSync(e))return GO();try{let t=JSON.parse(Rl.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return GO()},KO=(e,t)=>{Rl.default.mkdirSync(VO.default.dirname(e),{recursive:!0}),Rl.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},y6=e=>{let t=Tr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,qO.createHash)("sha256").update(o).digest("hex").slice(0,16)},HP=e=>{let t=fn(e);return t===null?null:$P(t.usageStatsFilePath)},JO=e=>{if(e.chunkIds.length===0)return;let t=fn(e);if(t===null)return;let r=$P(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;KO(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},FP=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=fn(e);if(r===null)return null;let o=y6(t),n=$P(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return KO(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},UP=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,BP=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var xl,YO,S6,A6,XO,b6,qP,Il,$s,VP,Hs,KP,JP=l(()=>{"use strict";xl=g(require("node:fs")),YO=g(require("node:path"));Wl();Xm();zP();GP();S6="http://127.0.0.1:11434",A6="nomic-embed-text",XO=(e,t,r)=>js({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,b6=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},qP=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},Il=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||S6,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||A6;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},$s=(e,t,r)=>{let o=XO(e,t,r);if(o===null||!xl.default.existsSync(o))return[];let n=xl.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},VP=async e=>{let t=Tr(e.text),r=qP(t);if(r.length===0)return 0;let o=XO(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;xl.default.mkdirSync(YO.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await Il(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};xl.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return Qm(o),n},Hs=async e=>{let t=await Il(e.query);if(t===null)return[];let r=e.minScore??0,s=$s(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:b6(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return JO({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},KP=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Ol,ZO,P6,_6,YP,XP,ZP,QO=l(()=>{"use strict";Ol=g(require("node:fs")),ZO=g(require("node:path"));Wl();jP();zP();JP();P6=e=>{if(!Ol.default.existsSync(e))return[];let t=Ol.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},_6=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},YP=async e=>{let t=fn(e);if(t===null)return 0;let r=Tr(e.text),o=qP(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;Ol.default.mkdirSync(ZO.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await Il(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};Ol.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Qm(n,200),s},XP=async e=>{let t=fn(e);if(t===null)return[];let r=await Il(e.query);if(r===null)return[];let o=e.minScore??.3;return P6(t.errorChunksFilePath).map(s=>({chunk:s,score:_6(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},ZP=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var QP=l(()=>{"use strict";JP();GP();QO()});var Pe,e_,t_=l(()=>{"use strict";fb();Pe=gb,e_=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${Pe.gray50};
  --aw-zinc-100: ${Pe.gray100};
  --aw-zinc-200: ${Pe.gray200};
  --aw-zinc-400: ${Pe.gray400};
  --aw-zinc-500: ${Pe.gray500};
  --aw-zinc-600: ${Pe.gray600};
  --aw-zinc-700: ${Pe.gray700};
  --aw-zinc-800: ${Pe.gray900};
  --aw-zinc-900: ${Pe.gray900};
  --aw-brand-600: ${Pe.brand600};
  --aw-brand-700: ${Pe.brand700};
  --aw-brand-50: ${Pe.brand50};
  --aw-emerald-50: ${Pe.success50};
  --aw-emerald-700: ${Pe.success700};
  --aw-amber-50: ${Pe.warning50};
  --aw-amber-900: ${Pe.warning900};
  --aw-red-50: ${Pe.error50};
  --aw-red-700: ${Pe.error700};
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
`.trim()});var w6,v6,r_,eM,o_,tM=l(()=>{"use strict";t_();El();w6=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,v6=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],r_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eM=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${w6}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,o_=e=>{let t=v6.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=r_(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=r_(e.installBundleVersionLabel?.trim()??"unknown"),s=eM("brand brand-in-sidebar",n),i=eM("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${r_(e.title)} \xB7 Agent Witch Local</title>
  <style>${e_}</style>
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
  <script>${xP}</script>
</body>
</html>`}});var tg,Ml,rg=l(()=>{"use strict";tg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ml=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${tg(e.syncMessage)}</p>`:"",o=tg(e.manageHref),n=tg(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${tg(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var n_,s_,i_,rM=l(()=>{"use strict";n_=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,s_=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,i_=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var oM=l(()=>{"use strict";tM();rg();rM()});var Fs,a_,nM=l(()=>{"use strict";El();Fs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),a_=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Fs(e.wakeError)}</div>`:"",a=Ll(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Fs(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${Fs(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Fs(o)}</p>
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
        <p class="home-card-meta">${Fs(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Fs(n)}</p>
      </a>
    </div>`}});var sM=l(()=>{"use strict";nM()});var E,Us=l(()=>{"use strict";E=e=>e==="passed"||e==="stopped"||e==="failed"});var iM,l_,hn,c_,og=l(()=>{"use strict";iM="Stopped at the round limit. The best prompt is kept.",l_="Stopped because the score stopped rising. The best prompt is kept.",hn="Finished. The best prompt is the result.",c_="Wizard ended. Progress from finished steps is kept."});var go,d_=l(()=>{"use strict";go=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var T6,k6,Nl,aM,ng=l(()=>{"use strict";T6=/\n+|;\s+/,k6=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,Nl=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(T6).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,k6(s)]},[]);return[...t,...o]},[]),aM=e=>{let t=Nl(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ce,Bs=l(()=>{"use strict";ce=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Dl,u_=l(()=>{"use strict";ng();Bs();Dl=e=>{let t=[...e.priorRounds,e.current],r=ce(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:aM(o)}}});var p_,C6,L6,sg,m_=l(()=>{"use strict";p_={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},C6=e=>{try{let t=JSON.parse(e.fragment);return{...p_,objects:[...e.objects,t]}}catch{return{...p_,objects:e.objects}}},L6=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:C6(r)},sg=e=>[...e].reduce(L6,p_).objects});var E6,g_,W6,lM,f_=l(()=>{"use strict";m_();E6=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},g_=e=>{let t=sg(e).filter(E6),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},W6=(e,t)=>({...e,passed:e.score>=t}),lM=(e,t)=>{let r=g_(e);return r===null?null:W6(r,t)}});var h_,y_,ig=l(()=>{"use strict";h_="The judge reply needs a score and a reason.",y_="The improver reply was empty."});var cM,dM=l(()=>{"use strict";cM=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var uM,pM=l(()=>{"use strict";uM=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var x6,mM,gM=l(()=>{"use strict";dM();pM();og();ng();x6=e=>{let t=Nl(e);return t.length===0?l_:`${l_} Avoid: ${t.join("; ")}.`},mM=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:iM};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(cM(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:x6(uM(r))}}return null}});var fo,I6,yn,fM,ag=l(()=>{"use strict";fo=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},I6=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,yn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",I6(e.tokens),`Delay: ${fo(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},fM=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var O6,hM,yM=l(()=>{"use strict";f_();O6=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,hM=e=>{let r=(O6.exec(e)?.[1]??e).trim();return r.length===0||g_(r)!==null?null:r}});var SM,lg,AM=l(()=>{"use strict";ag();yM();ig();SM=e=>({type:"call",role:"judge",choice:e.choice,prompt:fM({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),lg=e=>{let t=hM(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:y_}}:{nextPrompt:t,continuation:SM({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var S_,bM=l(()=>{"use strict";d_();u_();f_();ig();og();gM();ig();AM();S_=e=>{let t=lM(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:h_}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=mM({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=Dl({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:go({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var zl,A_=l(()=>{"use strict";zl=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var PM=l(()=>{"use strict"});var _M=l(()=>{"use strict";PM()});var Sn,wM=l(()=>{"use strict";Sn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var M6,b_,vM=l(()=>{"use strict";ag();M6=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,b_=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",M6(e.tokens),`Delay: ${fo(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var N6,D6,z6,P_,TM=l(()=>{"use strict";N6=/[A-Za-z0-9_./~-]{3,180}/g,D6=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,z6=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||D6.test(t)},P_=(e,t=12)=>{let r=[];for(let o of e.matchAll(N6)){let n=o[0].replace(/\.+$/,"");if(!(!z6(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var jl,kM=l(()=>{"use strict";jl=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var cg,__,CM,$l,w_=l(()=>{"use strict";cg=e=>Math.floor(e/2),__=e=>Math.max(cg(e)+1,e-20),CM=(e,t)=>e>=t?"passes":e>=__(t)?"close":e>=cg(t)?"weak":"bad",$l=e=>[{band:"bad",label:`0\u2013${cg(e)-1} bad`},{band:"weak",label:`${cg(e)}\u2013${__(e)-1} weak`},{band:"close",label:`${__(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var dg,v_=l(()=>{"use strict";w_();dg=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${CM(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var Rt,T_=l(()=>{"use strict";Rt=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var LM,EM=l(()=>{"use strict";LM=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var j6,$6,WM,RM=l(()=>{"use strict";Us();v_();T_();EM();j6=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],$6=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",WM=e=>{let t=e.wizard;if(t===void 0)return[];let r=Rt(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=j6.map((h,y)=>{let p=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:h,state:p,detail:null}}).filter((h,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=dg(e),d=c.filter(h=>h.id==="round-0"),u=LM(t)&&(!n||a)?c.filter(h=>h.id!=="round-0"):[],m=E(e.status)&&!s,S=m?[{id:"end",label:$6(e),state:"done",detail:e.errorMessage}]:[];if(m&&S.length>0){let h=Math.min(r,i.length),y=i.slice(0,h).map(p=>({...p,state:"done"}));return[...d,...y,...S,...u]}return[...d,...i,...u,...S]}});var H6,k_,xM=l(()=>{"use strict";Us();v_();RM();H6=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",k_=e=>{if(e.wizard!==void 0)return WM(e);let t=dg(e),r=E(e.status)?[{id:"end",label:H6(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var Hl,IM=l(()=>{"use strict";Hl=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var OM=l(()=>{"use strict";gt()});var MM,Fl,Ul,qs,ug,C_,NM=l(()=>{"use strict";OM();MM="/prompt-optimizer/agent",Fl=`${yr}${MM}`,Ul=`${yr}/prompt-optimizer`,qs="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",ug=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${qs}`,C_="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var tr=l(()=>{"use strict"});var ie,Bl=l(()=>{"use strict";tr();ie=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var L_,DM=l(()=>{"use strict";L_="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var zM,jM=l(()=>{"use strict";zM=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Gl,HM=l(()=>{"use strict";jM();tr();Gl=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:zM(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var E_,FM=l(()=>{"use strict";tr();E_=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var W_,UM=l(()=>{"use strict";tr();W_=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var BM,ql,GM=l(()=>{"use strict";BM=["generalize","evaluate","separate","optimize_modules"],ql=(e,t)=>{let r=BM.indexOf(t);if(r===-1)return e;let o=BM.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var pg,R_=l(()=>{"use strict";ng();pg=e=>{let t=Nl(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var Vl,qM=l(()=>{"use strict";R_();Vl=e=>{let t=pg(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var U6,B6,G6,VM,KM=l(()=>{"use strict";U6=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),B6=/^\{\{[a-zA-Z0-9_-]+\}\}$/,G6=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(U6(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let u=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),u}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},VM=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>B6.test(n)?n:G6(n,r)).join("")}});var x_,JM=l(()=>{"use strict";KM();x_=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:VM(o.prompt,t)}))}))});var q6,Kl,YM=l(()=>{"use strict";tr();R_();q6=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Kl=e=>{let t=pg(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=q6(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Jl,XM=l(()=>{"use strict";A_();Jl=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return zl({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Yl,O_=l(()=>{"use strict";Bs();Yl=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ce(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var M_,ZM=l(()=>{"use strict";O_();M_=e=>{let t=Yl({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var An,QM=l(()=>{"use strict";An=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var V6,K6,oe,mg=l(()=>{"use strict";Bl();V6=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},K6=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,oe=e=>{let t=ie(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:V6(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>K6(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var eN,tN=l(()=>{"use strict";Bl();mg();eN=e=>{let t=oe(e.wizard),r=ie(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var N_,rN=l(()=>{"use strict";tN();N_=e=>{let t=eN({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var J6,oN,nN=l(()=>{"use strict";J6=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},oN=e=>[...e].reduce(J6,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var Y6,sN,iN=l(()=>{"use strict";Y6=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},sN=e=>[...e].reduce(Y6,{out:"",inString:!1,escaped:!1}).out});var X6,Z6,aN,lN=l(()=>{"use strict";nN();iN();X6=e=>e.charCodeAt(0)===65279?e.slice(1):e,Z6=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},aN=e=>sN(oN(Z6(X6(e))))});var Q6,eJ,tJ,cN,rJ,Vs,gg=l(()=>{"use strict";m_();lN();Q6=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},eJ=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},tJ=e=>[...e].reduce(eJ,{out:"",inString:!1,escaped:!1}).out,cN=e=>{let t=sg(e);return t.length===0?null:t[t.length-1]},rJ=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Vs=e=>{let t=aN(Q6(e)),r=cN(t);if(r!==null)return r;let o=tJ(t),n=cN(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw rJ(i)}}});var oJ,nJ,D_,dN,uN=l(()=>{"use strict";oJ=/^[a-z0-9][a-z0-9-]{0,62}$/,nJ=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return oJ.test(t)?t:""},D_=e=>e.replace(/\s+/gu," ").trim(),dN=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=nJ(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=D_(n.name),a=D_(n.description),c=D_(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var pN,mN,gN=l(()=>{"use strict";pN=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},mN=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var z_,fN=l(()=>{"use strict";gg();uN();gN();z_=(e,t)=>{let r=(()=>{try{return Vs(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(pN(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(mN).filter(a=>a!==null),i=dN({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var j_,hN=l(()=>{"use strict";j_=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var $_,yN=l(()=>{"use strict";$_=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var H_,SN=l(()=>{"use strict";Bl();mg();H_=e=>{let t=oe(e.wizard),r=ie(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var Xl,AN=l(()=>{"use strict";Xl=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var xt,sJ,F_,bN=l(()=>{"use strict";xt=g(es());gg();sJ=(0,xt.isType)({name:xt.isNonEmptyString,description:xt.isString,sampleValue:xt.isString}),F_=e=>{let t=Vs(e);if(!(0,xt.isType)({templatedPrompt:xt.isNonEmptyString,variables:(0,xt.isArrayWithEachItem)(sJ)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var de,iJ,aJ,U_,PN=l(()=>{"use strict";de=g(es());tr();gg();iJ=(0,de.isType)({id:de.isNonEmptyString,title:de.isNonEmptyString,prompt:de.isNonEmptyString,order:de.isNumber}),aJ=(0,de.isType)({id:de.isNonEmptyString,title:de.isNonEmptyString,summary:de.isString,topology:(0,de.isOneOf)("chain","parallel"),modules:(0,de.isArrayWithEachItem)(iJ),recommended:de.isBoolean}),U_=e=>{let t=Vs(e);if(!(0,de.isType)({options:(0,de.isArrayWithEachItem)(aJ)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Ks,_N=l(()=>{"use strict";Ks=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var lJ,B_,G_=l(()=>{"use strict";lJ=/\{\{([a-zA-Z0-9_-]+)\}\}/g,B_=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(lJ,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var It,Ot,wN=l(()=>{"use strict";Bs();G_();It=e=>B_(e.templatedPrompt,e.variables),Ot=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ce(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??It(e.wizard)}});var cJ,bn,vN=l(()=>{"use strict";cJ=/\{\{([a-zA-Z0-9_-]+)\}\}/g,bn=(e,t)=>e.replace(cJ,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var dJ,Pn,fg=l(()=>{"use strict";dJ=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Pn=e=>{let t=new Set,r=[];for(let o of e.matchAll(dJ)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Zl,TN=l(()=>{"use strict";fg();Zl=e=>e.variables.length>0||Pn(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var q_,V_=l(()=>{"use strict";tr();q_=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Ql,kN=l(()=>{"use strict";Bs();V_();Ql=e=>{let t=e.wizard.evaluateSelectedRound??ce(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:q_(r.judgement,e.passScore)}});var ec,CN=l(()=>{"use strict";ec=e=>e.length===1&&e[0].modules.length===1});var K_,LN=l(()=>{"use strict";K_=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var _e,hg,tc=l(()=>{"use strict";_e=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),hg=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var EN,WN=l(()=>{"use strict";tc();EN=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[_e("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),_e("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[_e("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var RN,xN=l(()=>{"use strict";Us();tc();RN=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!E(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[_e("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),_e("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),_e("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",hg(e.writerLabel,e.folder)),_e("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[_e("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var IN,ON=l(()=>{"use strict";tc();IN=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[_e("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),_e("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[_e("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var MN,NN=l(()=>{"use strict";tc();MN=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[_e("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),_e("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",hg(e.writerLabel,e.folder)),...r?[_e("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var yg,DN=l(()=>{"use strict";Us();WN();xN();ON();NN();yg=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(E(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return RN(r);case"evaluate":return EN({...r,currentRound:e.currentRound});case"separate":return MN(r);case"optimize_modules":return IN({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var rc,kr,zN=l(()=>{"use strict";rc=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),kr=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var uJ,Sg,J_,jN=l(()=>{"use strict";fg();uJ="wizardParam_",Sg=e=>`${uJ}${e}`,J_=e=>{let t=Pn(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=Sg(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var ct,$N=l(()=>{"use strict";ct=["generalize","evaluate","separate","optimize_modules"]});var oc,_n,Js,Cr=l(()=>{"use strict";oc="Stopped because the confirmed token or spend budget was exceeded.",_n="Approaching the confirmed budget. Further trials may hard-stop.",Js="Confirm the Step 4 token and spend budget before optimizing modules."});var dt,Ys=l(()=>{"use strict";dt=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var Nt,nc=l(()=>{"use strict";Cr();Nt=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var pJ,Lr,sc=l(()=>{"use strict";Cr();pJ={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},Lr=e=>{let t=e?.trim()??"";return t.length===0?.01:pJ[t]??.01}});var Ag,Y_=l(()=>{"use strict";Cr();sc();Ag=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=Lr(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var HN,Pg,X_,Z_=l(()=>{"use strict";Cr();Ys();nc();Y_();sc();HN=e=>{let t=Ag({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??Lr(e.writerId)??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:dt({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},Pg=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),X_=e=>{let t=e.existing??Nt(),r=HN({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return Pg(t,r)}});var Xs,ic,BN=l(()=>{"use strict";Cr();tr();Ys();nc();Z_();Y_();sc();Xs=e=>{let t=Ag({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??Lr(e.writerId),i=r*4e3,a=n*o*8e3,c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:dt({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},ic=e=>{let t=e.existing??Nt();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=Xs({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return Pg(t,r)}});var Er,GN=l(()=>{"use strict";Ys();Cr();nc();Er=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??Nt(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=dt({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var ew,Zs,qN=l(()=>{"use strict";Cr();Ys();ew=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=dt({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:oc,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:oc,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,u=s!==null&&s>0&&o>=s*c;return(d||u)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:_n,costControls:{...t,softWarnFired:!0,softWarnMessage:_n}}:null},Zs=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var tw,VN=l(()=>{"use strict";tw=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var W=l(()=>{"use strict";Us();og();bM();d_();ag();A_();_M();wM();vM();TM();u_();kM();Bs();xM();T_();w_();IM();NM();tr();Bl();DM();HM();FM();UM();GM();qM();JM();YM();XM();O_();ZM();QM();mg();rN();fN();hN();yN();SN();AN();bN();PN();_N();wN();G_();vN();fg();TN();kN();CN();V_();LN();DN();zN();jN();$N();Cr();Ys();nc();Z_();BN();sc();GN();qN();VN()});var rw=l(()=>{"use strict";La()});var mJ,YN,XN=l(()=>{"use strict";rw();mJ=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,YN=e=>{let t=Yo(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(mJ)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var QN,gJ,fJ,rr,hJ,yJ,ZN,wg,eD,SJ,ht,tD,rD,oD,Dt=l(()=>{"use strict";rw();XN();QN=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),gJ=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,fJ=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,rr=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(gJ.test(e.errorMessage))return"usage_limit";if(fJ.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},hJ="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",yJ="The writer waited on terminal input and did not return a prompt.",ZN=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,wg=e=>{let t=e.trim();if(t.length===0||t.length>=500||!ZN.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>ZN.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},eD=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},SJ=e=>wg(e.stdout)??wg(e.stderr)??(eD(e.replyFile)?wg(e.replyFile):null),ht=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return hJ;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?yJ:null},tD=e=>{let t=e.trim();return t.length===0?null:ht(t)!==null?t:wg(t)??(eD(t)?t:null)},rD=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],oD=e=>{let t=e.replyFileText?.trim()??"",r=ht([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=SJ({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=rr({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=YN([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Yo(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var AJ,sD,nD,vn,vg=l(()=>{"use strict";Dt();AJ=400,sD=(e,t=AJ)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},nD=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:tD(e.promptText)},vn=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:nD(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=nD(e.revisions[n]);if(s!==null)return s.trim()}return null}});var x,bJ,Tg,ae,Tn,aD,iD,lD,cD,we=l(()=>{"use strict";x="manual",bJ=["claude-cli","codex","cursor","antigravity"],Tg={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ae=e=>e===x?"You":e in Tg?Tg[e]:e,Tn=e=>bJ.filter(t=>e.includes(t)),aD=e=>{let t=Tn(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},iD=(e,t)=>t===x?x:e.find(r=>r===t)??null,lD=(e,t,r)=>{let o=Tn(e),n=iD(o,t),s=iD(o,r);return n===null||s===null?null:{judge:n,improver:s}},cD=(e,t,r)=>{let o=Tn(e);return t===null||t.trim()===""?r!==x?r:o[0]??null:t===x?null:o.find(n=>n===t)??null}});var dD,kg,ow,kn,nw,ut,Wr,ue,Ve=l(()=>{"use strict";dD=g(require("node:fs")),kg=g(require("node:os")),ow=g(require("node:path"));en();kn="~",nw=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,ut=e=>{let t=kg.default.homedir(),r=nw(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Wr=e=>{let t=e.trim().length===0?"~":e.trim(),r=Ye(t),o=ow.default.isAbsolute(r)?nw(r):nw(ow.default.resolve(kg.default.homedir(),r));try{if(!dD.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:ut(o)}},ue=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:kg.default.homedir()});var Xe,ho=l(()=>{"use strict";Xe='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var sw,uD,PJ,pD,mD,iw=l(()=>{"use strict";W();we();Ve();ho();sw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uD=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',PJ=e=>{let t=uD(e.state),r=`<h2>${sw(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${sw(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Xe}</button></div><template>${r}</template></li>`},pD=e=>{let t=e.wizard;if(t===void 0)return"";let r=yg({status:e.status,wizard:t,writerLabel:ae(e.judgeModel),runnerLabel:ae(e.runnerModel??e.judgeModel),folderDisplay:ut(ue(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(PJ).join("")}</ol>`},mD=e=>{let t=e.wizard;if(t===void 0)return"";let r=yg({status:e.status,wizard:t,writerLabel:ae(e.judgeModel),runnerLabel:ae(e.runnerModel??e.judgeModel),folderDisplay:ut(ue(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${uD(n.state)}<span class="sdlc-pipeline-label">${sw(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var zt,gD,fD,hD,aw=l(()=>{"use strict";W();zt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gD="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",fD=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${zt(gD)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${zt(i.name)}}}</strong> \u2014 ${zt(i.description)} (sample: ${zt(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${zt(r)}</pre>`,n=It(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${zt(n)}</pre>`;return`${t}${o}${s}`},hD=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${zt(gD)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${zt(n.name)}}}</strong> \u2014 ${zt(n.description)} (sample: ${zt(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${zt(r)}</pre>`;return`${t}${o}`}});var ac,lw=l(()=>{"use strict";ac=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var yD,SD=l(()=>{"use strict";W();yD=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=Sn({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=yn({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var cw,lc,dw=l(()=>{"use strict";ho();SD();cw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lc=e=>{let t=yD(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${cw(r)}">${Xe}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${cw(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${cw(t)}</pre></template>`}});var uw,cc,pw=l(()=>{"use strict";ho();uw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cc=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${uw(r)}">${Xe}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${uw(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${uw(t)}</pre></template>`}});var Cg,Qs,mw=l(()=>{"use strict";lw();dw();pw();Cg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Qs=e=>{let t=ac(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${Cg(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,u=e.cycle.revisions.map(m=>{let S=m.judgement?.score,h=S==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${S}`,y=m.judgement?.reasons?.trim()??"",p=y.length===0?"":`<br><span class="muted">${Cg(y)}</span>`,b=cc({roundLabel:d(m.roundNumber),promptText:m.promptText}),A=lc({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run}),f=`${b}${A}`;if(e.interactive){let P=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${P}> <span class="sdlc-wizard-revision-title">${Cg(h)}</span></label>${f}${p}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Cg(h)}</span>${f}${p}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${u}</ul>`}});var gw,AD,bD,PD,fw=l(()=>{"use strict";gw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AD=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${gw(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${gw(t.prompt)}</pre></li>`).join("")}</ol>`,bD=e=>AD([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),PD=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${gw(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${AD(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var dc,_J,Lg,hw=l(()=>{"use strict";W();fw();dc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_J=e=>{let t=e.wizard;return t===void 0?"":Ot({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},Lg=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=_J(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${dc(n.orchestratorSkill.fileName)}</code> \u2014 ${dc(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${dc(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=bD(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${dc(r)} <span class="muted">${dc(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Ie,wJ,vJ,TJ,kJ,Eg,CJ,LJ,EJ,WJ,RJ,xJ,ei,Wg=l(()=>{"use strict";W();iw();aw();mw();dw();pw();hw();Ie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wJ={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},vJ=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Ie(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Ie(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Ie(o)}</pre></details>`;return`<h2>${Ie(e)}</h2>${n}`},TJ=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=It(t).trim(),n=Ot({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!E(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${vJ("What is being evaluated",i)}`},kJ=(e,t)=>{let r=e.wizard;if(r===void 0||E(e.status))return"";let o=wJ[t];return o===void 0||r.phase!==o?"":mD(e)},Eg=(e,t,r)=>{let o=kJ(e,t),n=t==="wizard-2"?TJ(e):"";return`${o}${n}${r}`},CJ=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},LJ=e=>{let t=e.wizard;return t===void 0?"":fD(t)},EJ=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Ie(a)}</span>`,d=`Round ${n.roundNumber}`,u=cc({roundLabel:d,promptText:n.promptText}),m=lc({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ie(s)}${i}</span>${u}${m}${c}</li>`}).join("")}</ul>`,WJ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Qs({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=CJ(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${EJ(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=Ot({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Ie(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",u=`Round ${c.roundNumber} \u2014 score ${d}`,m=cc({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),S=lc({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ie(u)}</span>${m}${S}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Ie(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},RJ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Ie(n.title)}</strong> <span class="muted">(${Ie(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Ie(o.title)}</strong>${n}${Ie(s)}${Lg(e,o)}</li>`}).join("")}</ul>`},xJ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Ie(i)}</span> <strong>${Ie(n.title)}</strong>${Ie(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Ie(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Qs({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},ei=(e,t)=>{switch(t){case"wizard-1":return Eg(e,t,LJ(e));case"wizard-2":return Eg(e,t,WJ(e));case"wizard-3":return Eg(e,t,RJ(e));case"wizard-4":return Eg(e,t,xJ(e));default:return""}}});var IJ,OJ,_D,wD,vD=l(()=>{"use strict";W();vg();Dt();Wg();IJ=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},OJ=e=>{let t=e.goal.trim();return t.length===0?null:t},_D=(e,t,r,o,n)=>{let s=ht(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},wD=(e,t)=>{let r=OJ(e);if(t.id.startsWith("wizard-")){let s=ei(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=Hl(e,t);if(s!==null){let a=vn(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ce(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:_D(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:IJ(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:_D(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var Cn,TD,kD=l(()=>{"use strict";Cn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),TD=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${Cn(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Cn(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${Cn(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${Cn(n)}</h2><pre class="mono">${Cn(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${Cn(e.goal)}</dd></div></dl>`;return`<h2>${Cn(e.title)}</h2>${i}${t}${r}${o}${s}`}});var MJ,CD,uc,yw,Rg=l(()=>{"use strict";W();MJ=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),CD=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||E(e.status))return null;let r=Rt(t);return r<0||r>3?null:`wizard-${r+1}`},uc=(e,t)=>MJ.has(t)?CD(e)===t:!1,yw="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var NJ,xg,Sw=l(()=>{"use strict";NJ='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',xg=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${NJ}</button>`});var Ln,Ig=l(()=>{"use strict";W();Ln=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Dl({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:jl(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var DJ,LD,zJ,Aw,ED,jJ,$J,HJ,FJ,WD,RD=l(()=>{"use strict";W();Ig();DJ={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},LD=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},zJ=e=>DJ[e]??null,Aw=(e,t)=>{let r=e.wizard,o=zJ(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=Rt(r);return o<n||o===n},ED=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},jJ=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:It(t).trim();return o.length===0?null:Vl({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:LD(e,"generalize")})},$J=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=Ln(e);return n===null?null:go({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=ED(e)?.promptText.trim()??Ot({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:Sn({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},HJ=e=>{let t=e.wizard;if(t===void 0)return null;let r=Ot({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:Kl({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:LD(e,"separate")})},FJ=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=kr(t),s=bn(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=Ln(e);return c===null?null:go({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=ED(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||E(e.status)&&i?.judgement!==null)?yn({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):Jl({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:An(t,r).output,moduleTitle:o.title})},WD=(e,t)=>{if(!Aw(e,t))return null;switch(t){case"wizard-1":return jJ(e);case"wizard-2":return $J(e);case"wizard-3":return HJ(e);case"wizard-4":return FJ(e);default:return null}}});var UJ,Og,bw=l(()=>{"use strict";W();UJ=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},Og=(e,t)=>{let r=e.wizard,o=UJ(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=Rt(r);return o<n?"done":o===n&&E(e.status)&&e.status==="failed"?"failed":o<=n&&E(e.status)?"done":"pending"}});var BJ,ti,Mg=l(()=>{"use strict";ho();RD();bw();BJ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ti=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(Og(e,t)==="pending")return""}else if(!Aw(e,t))return"";let o=WD(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Xe}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${BJ(o)}</pre></template>`}});var En,Rr,ri=l(()=>{"use strict";En=e=>e.toLocaleString("en-US"),Rr=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var or,GJ,xD,Ng,ID,OD,Dg=l(()=>{"use strict";W();vD();kD();Rg();Sw();ho();vg();iw();Mg();ri();or=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GJ=(e,t)=>{let r=Hl(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?Rr(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${En(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${or(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${or(r)}</span>`:"",d=TD(wD(t,e)),u=t.wizard!==void 0&&t.wizard.phase==="complete"&&E(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${or(e.id)}"`:"",m=uc(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${or(yw)}"><input type="hidden" name="cycleId" value="${or(t.id)}"><input type="hidden" name="wizardStepId" value="${or(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",S=e.state==="active"&&e.id.startsWith("wizard-")?pD(t):"",h=o?"failed":e.state,y=o?vn(t):null,p=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Xe}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${or(y)}</pre></template>`:"",b=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?ti(t,e.id):"";return`<li class="sdlc-node sdlc-node-${h}" data-sdlc-step-id="${or(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${u} data-sdlc-node>${n}<span class="sdlc-node-label">${or(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${b}${p}</div></div>${S}<template>${d}</template></li>`},xD=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>GJ(r,t)).join("")}</ol>`,Ng=e=>`<div class="sdlc-score" aria-label="What the score means">${$l(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${or(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,ID=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${xg({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,OD=`<script>
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
</script>`});var zg,jg,$g,MD,Pw=l(()=>{"use strict";zg="support-reply",jg="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",$g=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),MD=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Hg,ND,DD=l(()=>{"use strict";W();Dg();Pw();Hg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ND=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${Ng(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${Hg(jg)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Hg($g)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Hg(MD)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Hg(zg)}">Run this sample</a>
      </div>
    </section>`});var _w,Fg,qJ,zD,jD=l(()=>{"use strict";_w=g(require("node:fs")),Fg=g(require("node:path")),qJ=e=>Fg.default.join(Fg.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),zD=(e,t)=>{let r=qJ(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;_w.default.mkdirSync(Fg.default.dirname(r),{recursive:!0}),_w.default.appendFileSync(r,o,"utf8")}});var oi,$D,VJ,HD,KJ,FD,nr,Z,UD,D,pt=l(()=>{"use strict";oi=g(require("node:fs")),$D=g(require("node:path"));W();jD();VJ=e=>e.wizard===void 0?e:{...e,wizard:E_(e.wizard)},HD=new Set,KJ=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),FD=(e,t)=>{oi.default.mkdirSync($D.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;oi.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),oi.default.renameSync(r,e)},nr=e=>{if(!oi.default.existsSync(e))return[];try{let t=JSON.parse(oi.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(KJ).map(VJ):[]}catch{return[]}},Z=(e,t)=>nr(e).find(r=>r.id===t)??null,UD=(e,t)=>{HD.add(t);let r=nr(e).filter(o=>o.id!==t);FD(e,r)},D=(e,t)=>{if(HD.has(t.id))return;let r=nr(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];FD(e,o),zD(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var ni,sr,pc,BD,Ug,JJ,GD,qD,VD,ww=l(()=>{"use strict";ni=g(require("node:fs")),sr=g(require("node:path")),pc=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},BD=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Ug=(e,t)=>{let r=pc(e);return r.length>0?r:pc(t)},JJ=e=>{let t=Ug(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${BD(o)}`,...n.length>0?[`description: ${BD(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},GD=e=>`.cursor/skills/${e}/SKILL.md`,qD=(e,t)=>{let r=pc(t);if(r.length===0)return!1;let o=sr.default.resolve(e),n=sr.default.resolve(o,".cursor","skills"),s=sr.default.resolve(o,GD(r));return s.startsWith(`${n}${sr.default.sep}`)?ni.default.existsSync(s):!1},VD=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Ug(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=sr.default.resolve(e.workingDirectory);try{if(!ni.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=JJ({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=GD(r.slug),n=sr.default.resolve(t,".cursor","skills"),s=sr.default.resolve(t,o);if(!s.startsWith(`${n}${sr.default.sep}`))return{ok:!1,errorCode:"path"};if(ni.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{ni.default.mkdirSync(sr.default.dirname(s),{recursive:!0}),ni.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var YJ,KD,JD,YD=l(()=>{"use strict";W();pt();Ve();Dt();ww();YJ=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,KD=e=>{let t=e.get("savedSkill");return t!==null&&YJ.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},JD=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=Z(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!E(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ce(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||ht(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=VD({workingDirectory:ue(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var Bg,Gg,mc=l(()=>{"use strict";W();Bg=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=Er({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},Gg=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var yo,gc=l(()=>{"use strict";W();mc();yo=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=K_(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=X_({moduleCount:o.length,existing:e.costControls,writerId:n}),i=Bg(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:rc(r.variables)},updatedAt:new Date().toISOString()}}});var So,fc=l(()=>{"use strict";So=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var vw=l(()=>{"use strict";kt();vl();La()});var Tw,XD,kw,ZD,QD=l(()=>{"use strict";Tw={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},XD=e=>e.exitCode===null&&e.signalCode===null,kw=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!XD(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!XD(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),ZD=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),kw(e).then(s=>{r({...Tw,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var ez,hc,tz,Cw,XJ,Ew,Ww,ZJ,QJ,e7,rz,t7,Lw,oz,yc,nz,r7,o7,Ze,Wn=l(()=>{"use strict";ez=require("node:child_process"),hc=g(require("node:fs")),tz=g(require("node:os")),Cw=g(require("node:path"));vw();QD();Dt();XJ=["claude-cli","codex","cursor","antigravity"],Ew=18e4,Ww=6e5,ZJ=12e4,QJ=9e5,e7="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",rz="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",t7="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",Lw=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},oz=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=Lw(process.env[rz])??Math.max(r,Ww));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:Lw(process.env[t7])??QJ;return Math.min(o,Math.max(ZJ,r))},yc=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?Lw(process.env[rz])??Ww:Ew,nz=e=>`The writer timed out after ${e}ms.`,r7=e=>XJ.includes(e),o7=e=>e===!0||process.env[e7]==="1",Ze=e=>new Promise(t=>{if(e.signal?.aborted){t(Tw);return}if(o7(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!r7(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=Kt(r,e.prompt,fe({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!hc.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:Ew,s=Cw.default.join(hc.default.mkdtempSync(Cw.default.join(tz.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=rD({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},u=(0,ez.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),m=S=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(S))};ZD(u,e.signal,m,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",kw(u).then(S=>{m({ok:!1,errorMessage:nz(n),errorKind:"writer_timeout",killSignal:S})})},n),u.stdout.on("data",S=>{a.push(Buffer.from(S))}),u.stderr.on("data",S=>{c.push(Buffer.from(S))}),u.on("error",()=>m({ok:!1,errorMessage:"The writer failed to start."})),u.on("close",()=>{if(d.settled)return;let S=hc.default.existsSync(s)?hc.default.readFileSync(s,"utf8"):null,h=oD({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:S});if(h.ok&&d.stopReason!=="abort"){m(h);return}d.stopReason===null&&m(h)})})});var n7,Sc,Rw=l(()=>{"use strict";W();ri();n7=e=>{if(e.wizard!==void 0){let t=Xl(e.wizard),r=Rr(e);return(t??0)+r}return Rr(e)},Sc=e=>{let t=ew({costControls:e.costControls,spentTokens:n7(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var sz,s7,Ac,qg,Vg=l(()=>{"use strict";W();we();Rw();sz=e=>e===x?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},s7=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Ac=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=S_({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:sz(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?tw({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:jl(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=s7(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?Sc({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):Sc({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},qg=(e,t,r=null)=>{let o=lg({raw:t,judge:sz(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Kg,xw=l(()=>{"use strict";Kg=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var lz,Jg,Yg,iz,az,Iw,i7,cz,Ow,a7,dz,l7,c7,uz,pz=l(()=>{"use strict";lz=require("node:child_process"),Jg=g(require("node:fs")),Yg=g(require("node:path"));_m();W();iz=4e3,az=12e3,Iw=(e,t)=>{let r=(0,lz.spawnSync)("git",[...t],{cwd:e,env:co(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},i7=e=>Iw(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",cz=e=>{let t=Iw(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},Ow=(e,t)=>{let r=Yg.default.resolve(e,t),o=Yg.default.relative(e,r);if(o.startsWith("..")||Yg.default.isAbsolute(o)||!Jg.default.existsSync(r)||!Jg.default.statSync(r).isFile())return null;let n=Jg.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>iz?`${n.slice(0,iz)}
\u2026truncated`:n},a7=e=>e.length>az?`${e.slice(0,az)}
\u2026truncated`:e,dz=e=>{let t=P_(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,Ow(e.workingDirectory,n)])),o=i7(e.workingDirectory);return{git:o,status:o?cz(e.workingDirectory):{},files:r,paths:t}},l7=(e,t)=>{let r=Iw(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=Ow(e,t);return o===null?`${t} is missing.`:o},c7=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",uz=e=>{let t=e.before.git?cz(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=Ow(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>l7(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:c7(e.before.git,e.before.paths.length>0),evidence:a7(i.join(`

`))}}});var Dw,B,zw,Oe,mz,d7,u7,gz,si,fz,ii,p7,m7,bc,Mw,Nw,g7,hz,f7,h7,y7,yz,S7,Sz,Az,A7,b7,bz,Pz=l(()=>{"use strict";Dw=require("node:child_process"),B=g(require("node:fs")),zw=g(require("node:os")),Oe=g(require("node:path"));_m();mz=8e6,d7=16e6,u7=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],gz=(e,t)=>{let r=(0,Dw.spawnSync)("git",[...t],{cwd:e,env:co(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},si=(e,t)=>(0,Dw.spawnSync)("git",[...t],{cwd:e,env:co(),timeout:8e3}).status===0,fz=e=>{let t=gz(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},ii=(e,t)=>{let r=Oe.default.resolve(e,t),o=Oe.default.relative(e,r);return o.startsWith("..")||Oe.default.isAbsolute(o)?null:r},p7=(e,t)=>{let r=ii(e,t);if(r===null||!B.default.existsSync(r))return null;let o=B.default.statSync(r);return!o.isFile()||o.size>mz?null:B.default.readFileSync(r)},m7=(e,t,r)=>{let o=ii(e,t);o!==null&&(B.default.mkdirSync(Oe.default.dirname(o),{recursive:!0}),B.default.writeFileSync(o,r))},bc=(e,t)=>{let r=ii(e,t);r===null||!B.default.existsSync(r)||B.default.rmSync(r,{recursive:!0,force:!0})},Mw=(e,t)=>si(e,["cat-file","-e",`HEAD:${t}`]),Nw=e=>{let t=gz(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},g7=e=>Oe.default.resolve(e)!==Oe.default.resolve(zw.default.homedir()),hz=e=>{if(!B.default.existsSync(e))return 0;let t=B.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?B.default.readdirSync(e).reduce((r,o)=>r+hz(Oe.default.join(e,o)),0):0},f7=(e,t,r)=>{let o=ii(e,r);if(o===null||!B.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(hz(o)>d7)return{relativePath:r,existed:!0,copyDir:null};let n=Oe.default.join(t,"cache",r);return B.default.mkdirSync(Oe.default.dirname(n),{recursive:!0}),B.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},h7=400,y7=32e6,yz=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!B.default.existsSync(s)))for(let i of B.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=Oe.default.join(s,i),c=B.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>mz)){if(t.length>=h7||r+c.size>y7){o=!1;return}r+=c.size,t.push(Oe.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},S7=(e,t,r)=>{let o=ii(e,r);if(o===null||!B.default.existsSync(o))return null;let n=p7(e,r);if(n===null)return"skip";let s=Oe.default.join(t,"files",r);return B.default.mkdirSync(Oe.default.dirname(s),{recursive:!0}),B.default.writeFileSync(s,n),s},Sz=e=>{let t=B.default.mkdtempSync(Oe.default.join(zw.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?fz(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:yz(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,S7(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?Nw(e.workingDirectory):null,isolateCaches:g7(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:u7.map(i=>f7(e.workingDirectory,t,i))}},Az=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){bc(e.workingDirectory,t);return}m7(e.workingDirectory,t,B.default.readFileSync(r))}},A7=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?Az(e,t):Mw(e.workingDirectory,t)?si(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):bc(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&Mw(e.workingDirectory,t)&&si(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!Mw(e.workingDirectory,t)&&si(e.workingDirectory,["reset","-q","HEAD","--",t])},b7=(e,t)=>{let r=ii(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){bc(e.workingDirectory,t.relativePath),B.default.mkdirSync(Oe.default.dirname(r),{recursive:!0}),B.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){bc(e.workingDirectory,t.relativePath);return}if(B.default.existsSync(r))for(let o of B.default.readdirSync(r)){let n=Oe.default.join(r,o);B.default.statSync(n).mtimeMs>=e.startedMs-1e3&&B.default.rmSync(n,{recursive:!0,force:!0})}}}},bz=e=>{try{if(e.git){if(Nw(e.workingDirectory)!==e.head&&(!(e.head===null?si(e.workingDirectory,["update-ref","-d","HEAD"]):si(e.workingDirectory,["reset","--hard",e.head]))||Nw(e.workingDirectory)!==e.head))throw new Error("head");let r=fz(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))A7(e,o)}else{if(e.complete)for(let t of yz(e.workingDirectory).paths)e.files[t]===void 0&&bc(e.workingDirectory,t);for(let t of Object.keys(e.files))Az(e,t)}for(let t of e.caches)b7(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{B.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Xg,Zg,P7,_7,w7,v7,T7,_z,k7,wz,vz=l(()=>{"use strict";W();Vg();xw();pz();Pz();we();Ve();Dt();Wn();Xg=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),Zg=e=>({...e,status:"stopped",errorMessage:hn,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),P7=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),_7=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==x?t:e.improverModel!==x?e.improverModel:null}return e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null},w7=async e=>{let t=ue(e.cycle),r=dz({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=Sz({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Jl({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:An(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):zl({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=oz({promptText:e.revision.promptText,isModuleRun:i}),c=yc({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},u=await Ze({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),m=u.ok?uz({workingDirectory:t,before:r,writerReply:u.text}):null,S=bz(o),h={...e.cycle,revisions:e.cycle.revisions.map(y=>y.roundNumber===e.cycle.currentRound?d:y)};return u.ok?!S.ok||m===null?{ok:!1,cycle:Xg(h,S.ok?"Could not put the folder back after the run.":S.errorMessage)}:{ok:!0,cycle:h,run:{output:u.text.trim(),tokens:u.tokens,delayMs:Date.now()-n,lookedAt:m.lookedAt,evidence:m.evidence}}:u.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:Zg(h)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Xg(h,u.errorMessage,rr(u))})},v7=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:w7({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),T7=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),_z=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Ze({writerAgent:e.reviewer,workingDirectory:ue(e.cycle),prompt:b_({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:Zg(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},k7=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===x)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Ze({writerAgent:t.judgeModel,workingDirectory:ue(t),prompt:Sn({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Ac(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?Zg(o):(e.onWriterFailure?.(t.judgeModel),Xg(o,n.errorMessage,rr(n)))},wz=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return k7(e);let o=_7(t),n=await v7({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?P7(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===x){let u=await _z({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return u.kind==="stopped"?u.cycle:{...T7(s,u.text),judgePhase:void 0}}let i=await Ze({writerAgent:t.judgeModel,workingDirectory:ue(t),prompt:yn({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?Zg(s):(e.onWriterFailure?.(t.judgeModel),Xg(s,i.errorMessage,rr(i)));let a=await _z({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Ac(s,i.text,c);return Kg(d,a.text)}});var Qg,C7,L7,jw,Tz=l(()=>{"use strict";W();Vg();vz();Ig();Dt();we();Rw();Ve();Wn();Qg=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),C7=e=>({...e,status:"stopped",errorMessage:hn,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),L7=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?C7(e):(n?.(r),Qg(e,t.errorMessage,rr(t))),jw=async(e,t,r,o)=>{let n=Sc(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return Qg(e,"This round has no prompt.");if(e.status==="judging")return wz({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return Qg(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===x)return e;let i=Ln(e);if(i===null)return Qg(e,"The improver needs the score and the reason.");let a=await Ze({writerAgent:e.improverModel,workingDirectory:ue(e),prompt:go({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:yc()}),c=L7(e,a,e.improverModel,r,t);return c!==null?c:qg(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var Pc,$w,E7,Cz,kz,W7,R7,ef,Lz,Ez,x7,I7,Rn,Wz,Rz,_c=l(()=>{"use strict";W();gc();fc();we();Ve();Dt();Wn();Tz();lw();Pc=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),$w=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return Pc(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},E7=e=>{let t=rr(e);return QN(e)||t==="usage_limit"||t==="action_required"},Cz=(e,t,r)=>E7(r)?Pc(e,r.errorMessage,rr(r)):$w(e,t,r.errorMessage),kz=e=>{let t=e.wizard;return t===void 0||ac(e).length===0?e:{...e,wizard:Ks({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},W7=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",R7=e=>{let t=e.wizard;if(t===void 0)return e;let r=Yl({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Ks({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},ef=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),Lz=e=>e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null,Ez=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},x7=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=Lz(e);if(n===null)return Pc(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??It(o),i=Vl({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:Ez(e,"generalize")}),a=await Ze({writerAgent:n,prompt:i,workingDirectory:ue(e),signal:t});if(!a.ok)return r?.(n),Cz(e,"generalize",a);try{let c=F_(a.text),d=Ks({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:rc(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),u={...e,wizard:d};return Zl(d)?Rn({...u,wizard:{...d,gate:null}}):ef(u,"generalize")}catch(c){return $w(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},I7=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=Lz(e);if(n===null)return Pc(e,"Choose a writer to suggest splits.");let s=Ot({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Kl({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:Ez(e,"separate")}),a=await Ze({writerAgent:n,prompt:i,workingDirectory:ue(e),signal:t});if(!a.ok)return r?.(n),Cz(e,"separate",a);try{let c=U_(a.text),d=x_(c,o.variables),u=Ks({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:u};return ec(d)?yo(m,d[0]):ef(m,"separate")}catch(c){return $w(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},Rn=e=>{let t=e.wizard;if(t===void 0)return e;let r=It(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},Wz=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Pc(e,"This module is missing.");let n=kr(r),s=bn(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==x?e.runnerModel:e.judgeModel!==x?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:ie(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},Rz=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return jw(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return x7(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return I7(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await jw(e,t,r,o);if(E(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&ac(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=ce(s.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??0,reasons:S.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&Ql({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let u=kz(ef(a,i));return So(u)}let c=ef(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let u=M_({wizard:{...c.wizard,modules:c.wizard.modules.map((m,S)=>S===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:W7(s.status)});return{...c,wizard:u}})():c;return i==="evaluate"?kz(d):R7(d)}return s}return n.phase==="complete",e}});var ai,tf=l(()=>{"use strict";W();we();ai=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:j_(r,e.judgeModel===x),updatedAt:new Date().toISOString()}}});var li,rf=l(()=>{"use strict";li=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var yt,xz,O7,Iz=l(()=>{"use strict";W();Ve();rf();Dt();ww();yt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xz=e=>{if(!E(e.status))return"";let t=ce(e.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??null,reasons:S.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=ht(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${yt(t.reasons.trim())}</p>`,i=e.status==="passed",a=li(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${yt(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${yt(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',u=n!==null?`<div class="alert-error">${yt(n)}</div>`:i?O7({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:ue(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${yt(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${yt(t.promptText)}</pre></details>`,m=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${m}</h2>${d}${o}${s}${u}</section>`},O7=e=>{let t=e.sourceSkill?.fileName??pc(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=Ug(t,r),s=n.length>0&&qD(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${yt(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${yt(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${yt(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${yt(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${yt(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${yt(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var Oz,Mz=l(()=>{"use strict";Oz=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var Nz,M7,of,Qe,nf,Hw=l(()=>{"use strict";W();we();Mz();vg();Dt();rf();Nz=["Generalize","Evaluate","Separate","Optimize modules"],M7=e=>{let t=Rt(e),r=t>=0&&t<Nz.length?Nz[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},of=(e,t)=>{let r=vn(e),o=r===null?null:Oz(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},Qe=(e,t)=>({title:e,detail:t,replyPreview:null}),nf=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=vn(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:sD(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!E(e.status)){let t=e.judgeModel;return Qe(`${ae(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!E(e.status)){let t=e.judgeModel;return Qe(`${ae(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===x?Qe(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?Qe(`${ae(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):Qe(`${ae(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===x){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==x?Qe(`${ae(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):Qe(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return Qe(`${ae(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ie(t);return Qe(`${ae(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return Qe(`${ae(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ie(t);return Qe(`${ae(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return Qe(`${ae(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===x){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return Qe("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return Qe(`${ae(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>ht(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=oe(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||E(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?of(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=li(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?of(e,{title:`${M7(r)}${s}`,detail:t.length>0?t:n}):of(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(E(e.status)){let t=e.errorMessage?.trim()??"";return of(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var ir,wc=l(()=>{"use strict";we();ir=e=>{if(e.status==="improving"&&e.improverModel===x)return!0;if(e.status!=="judging"||e.judgeModel!==x)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===x}});var Dz,zz=l(()=>{"use strict";Dz=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Ao,N7,jz,$z=l(()=>{"use strict";W();Ao=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),N7=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Ao(r)}</p>`},jz=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Ao(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${Ao(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Ao(a)}.</p>`}<pre class="mono">${Ao(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${fo(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Ao(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let u=e.avoid?.trim()??"",m=u.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Ao(u)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${N7(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Ao(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var vc,D7,Hz,Fz=l(()=>{"use strict";W();Dt();vc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),D7=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=ht(t.promptText),n=t.judgement?.reasons?`<p class="muted">${vc(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${vc(i)}.</p>`}<pre class="mono">${vc(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${fo(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,u=o===null?`<pre class="mono">${vc(d)}</pre>`:`<div class="alert-error">${vc(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${u}</article>`},Hz=e=>e.revisions.map(t=>D7(e,t)).join("")});var Uz,Bz=l(()=>{"use strict";W();Uz=e=>{if(E(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var ar,z7,Fw,j7,$7,H7,F7,Gz,qz,Uw=l(()=>{"use strict";Bz();ar=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),z7="Stop this run? Writers will stop and the best prompt is kept.",Fw="End the wizard? Writers will stop and progress from finished steps is kept.",j7="Skip this module and pause at the step gate?",$7=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${ar(z7)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${ar(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,H7=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${ar(Fw)}"><input type="hidden" name="cycleId" value="${ar(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,F7=e=>{let t=ar(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${ar(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${ar(j7)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${ar(Fw)}">End wizard</button>
    </form>
  </div>`},Gz=e=>{let t=Uz(e);return t==="none"?"":t==="legacy_stop"?$7(e.id):t==="wizard_end_only"?H7(e.id):F7(e)},qz=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=ar(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${ar(Fw)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var Vz,Kz=l(()=>{"use strict";W();ri();Vz=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=oe(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${En(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${En(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${ie(r)}`}return""}});var U7,B7,Jz,G7,Yz,Xz=l(()=>{"use strict";W();Kz();bw();Wg();Mg();U7=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',B7=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',Jz=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),G7=(e,t,r)=>{let o=ei(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=Vz(e,t),i=Og(e,t),a=U7(i),c=B7(i),d=ti(e,t,{forOutcomeSummary:!0}),u=`${a}<span class="sdlc-wizard-outcome-step-title">${Jz(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${Jz(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",S=i==="failed"&&t!=="wizard-4"?" open":"",h=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${h}"${m}${S}><summary aria-controls="${h}-body">${u}</summary><div class="sdlc-wizard-outcome-step-body" id="${h}-body">${o}</div></details>`},Yz=e=>{let t=e.wizard;if(t===void 0||!E(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>G7(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var Zz,Qz,ej=l(()=>{"use strict";Zz=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Qz=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${Zz(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Zz(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var Bw,tj,Gw=l(()=>{"use strict";Bw=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,tj=(e,t)=>{if(Bw(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var rj,oj=l(()=>{"use strict";rj=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var sf,nj,sj=l(()=>{"use strict";W();Gw();Gw();oj();sf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nj=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=oe(t),o=ie(t),n=r.terminalStatusSuggestion==="passed"?"":rj(r,o),s=o-10,i=r.rows.map((c,d)=>{let u=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,h=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=u===void 0?c.status:tj(u,o),p=u!==void 0&&Bw(u,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':y==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':y==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':sf(y);return`<tr${h}><td>${sf(c.title)}</td><td>${sf(m)}</td><td>${c.tokens??"\u2014"}</td><td>${p}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${sf(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var xn,af,qw=l(()=>{"use strict";xn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),af=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${xn(r.fileName)}</code> \u2014 ${xn(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${xn(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${xn(i.name)}</strong> <code>.cursor/skills/${xn(i.fileName)}/SKILL.md</code></p><p class="muted">${xn(i.description)}</p><p>${xn(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var q7,ij,aj=l(()=>{"use strict";W();ej();sj();qw();q7=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ij=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!E(e.status)||t.modules.length===0)return"";let r=nj(e),o=Qz(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=oe(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${q7(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${af(e)}${a}${r}${o}</section>`}});var K,lf=l(()=>{"use strict";W();K={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var cf,Vw=l(()=>{"use strict";cf=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var lj,cj=l(()=>{"use strict";lf();Vw();lj=e=>{let t=cf({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:K.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var xr,Tc=l(()=>{"use strict";xr=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var Ir,df,Kw=l(()=>{"use strict";W();Dg();Iz();Hw();wc();zz();Ig();$z();Fz();Uw();Xz();aj();ri();cj();Ve();Tc();Ir=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),df=e=>{let t=!E(e.status)&&e.status!=="wizard_paused"&&!ir(e),r=nf(e),o=xD(k_(Dz(e)),e),n=E(e.status)?"":Gz(e),s=Yz(e),i=ij(e),a=xz(e),c=e.errorMessage===null?"":`<div class="alert-error">${Ir(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",u=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?oe(e.wizard):null,S=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,h=!t&&e.wizard!==void 0&&E(e.status)&&(e.wizard.phase==="complete"||oe(e.wizard).passedModuleCount>0),y=h?S?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",p=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ir(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",b=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${Ir(r.replyPreview)}</pre>`,A=r.detail.length===0&&p.length===0&&b.length===0||r.detail.length===0&&b.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Ir(r.detail)}${u}</p>`}${b}</div>`,f=e.revisions.find(Lo=>Lo.roundNumber===e.currentRound),P=e.status==="improving"?Ln(e):null,w=Rr(e),T=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),k=ir(e)?jz({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:P?.promptText??f?.promptText??"",score:P?.score??f?.judgement?.score??null,reasons:P?.reasons??f?.judgement?.reasons??null,avoid:P?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:T?1:0}):"",L=e.wizard!==void 0&&e.wizard.phase==="complete"&&E(e.status),R=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!L&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?ie(e.wizard):e.passScore,N=R?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${Ng(I)}</div>`:"",U=e.status==="failed"?lj({status:e.status,errorKind:e.errorKind}):null,G=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':E(e.status)?U!==null?`<span class="${U.badgeClass}">${U.badgeLabel}</span>`:L&&m!==null&&!S?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",q=t?d:h?S?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',Ke=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Ir(ut(ue(e)))}</li>`:"",w>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${En(w)} so far</li>`:""].filter(Lo=>Lo.length>0),H=Ke.length===0?"":`<ul class="sdlc-run-meta">${Ke.join("")}</ul>`,Ce=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,Kr=L?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,ur=L?"":N.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${Kr}</div>`:`<div class="sdlc-run-grid">${Kr}${N}</div>`,oC=Hz(e),o2=e.wizard!==void 0&&E(e.status)&&e.revisions.every(Lo=>Lo.roundNumber===0&&(Lo.judgement===void 0||Lo.judgement===null)),n2=oC.length===0||o2?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${oC}</div></section>`,s2=`<p class="sdlc-run-goal" title="${Ir(e.goal.trim())}">${Ir(xr(e.goal))}</p>`,i2=L?`${c}${i}${s}${k}${a}`:`${c}${ur}${k}${s}${a}`,a2='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',l2=L?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Ir(e.updatedAt)}" aria-busy="${t?"true":"false"}">${a2}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${G}</div>${s2}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${q}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Ir(r.title)}</h2>${A}${p}${l2}</div></div>${H}${Ce}</header>${i2}</section>${n2}`}});var dj,uj=l(()=>{"use strict";W();fc();dj=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Ql({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:So(e)}});var pj,mj=l(()=>{"use strict";W();_c();pj=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Zl(t)?e:Rn({...e,wizard:{...t,gate:null}})}});var gj,fj=l(()=>{"use strict";W();gc();gj=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!ec(t.splitOptions))return e;let r=t.splitOptions[0];return yo(e,r)}});var V7,In,uf=l(()=>{"use strict";uj();mj();fj();pt();V7=e=>{let t=pj(e),r=dj(t);return gj(r)},In=(e,t)=>{let r=V7(t);return r!==t?(D(e,r),r):t}});var hj,Or,kc=l(()=>{"use strict";W();hj=e=>ct.indexOf(e),Or=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||E(e.status)?ct.length:t.gate!==null?hj(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?hj(t.phase):null}});var yj,Sj=l(()=>{"use strict";yj=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var On,Aj,bj=l(()=>{"use strict";W();Sj();On=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Aj=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=An(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${On(yj(o))}</pre></div>`:"",s=Pn(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=kr(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),u=Sg(c),m=i[c]??"",S=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${On(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${On(u)}">${On(S)}</label>
        ${h}
        <input class="input" type="text" id="${On(u)}" name="${On(u)}" value="${On(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var Pj,_j=l(()=>{"use strict";Pj={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var Cc,K7,pe,bo=l(()=>{"use strict";_j();ho();Cc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),K7=e=>{let t=Pj[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${Cc(t.title)}" aria-describedby="${r}" aria-expanded="false">${Xe}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${Cc(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${Cc(t.example)}</span></span></button>`},pe=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${Cc(r)}"`}>${Cc(e)}</span>${K7(t)}</span>`});var St,wj,vj,Tj=l(()=>{"use strict";W();mc();lf();bo();St=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wj=e=>{let t=e.costControls;if(t===void 0||Zs(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??dt({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${St(K.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${St(t.softWarnMessage??_n)}</p>`:"",d=Gg({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${St(K.estimateOverCeilingWarn)}</p>`:"",u=e.wizard?.modules.length??0,m=u>0?`<p class="muted">Step 4 will optimize ${u} module${u===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${St(K.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${St(K.confirmLede)}</p>
  ${m}
  ${a}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${St(Js)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${St(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${St(K.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${St(K.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${St(K.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
    </dl>
    <div class="field">
      ${pe(K.confirmedTokenLabel,"confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${s}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${pe(K.confirmedSpendLabel,"confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${i}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${St(K.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${St(K.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},vj=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!Zs(r)}});var J7,kj,Cj=l(()=>{"use strict";ho();J7=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kj=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${Xe}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${J7(t)}</pre></template>`}});var Lc,Lj,Ej=l(()=>{"use strict";W();aw();bj();mw();Uw();qw();hw();Tj();Cj();Lc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lj=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(vj(e))return wj(e);let n=ie(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?hD(r):"",a=o==="evaluate"?af(e):"",c=o==="evaluate"?Qs({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",u=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(I=>{let N=I.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',U=I.recommended?' <span class="sdlc-badge">Recommended</span>':"",G=r.selectedSplitOptionId===I.id||r.selectedSplitOptionId===null&&I.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${Lc(I.id)}" required${G}> <strong>${Lc(I.title)}</strong>${N}${U}</label>${Lg(e,I)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],h=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=m?.title??"Module",p=m?.prompt??"",b=m?.status==="pending",A=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Lc(y)}</p>${b?Aj({cycle:e,modulePrompt:p}):""}<p class="muted">Test run prompt preview: ${Lc(bn(p,kr(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${Qs({cycle:e,interactive:!1,caption:b?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",f=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":b?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",P=Xl(r),w=P===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${P}</p>`,T=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?kj(r.lastWriterParseFailureReply??""):"",k=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",L=t?.active===!0?" sdlc-wizard-gate-active":"",R=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${k}"`:"";return`<section class="card sdlc-wizard-gate${L}"${R}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${f}</p>
    ${T}
    ${w}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Lc(e.id)}">
    ${i}
    ${a}
    ${c}
    ${u}
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
    ${qz(e)}
  </section>`}});var Y7,Wj,Rj=l(()=>{"use strict";W();Mg();Y7=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Wj=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||E(e.status))return"";let r=(o,n)=>{let s=ti(e,o);return`<h2 class="sdlc-wizard-active-head">${Y7(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var Jw,xj,Ij,Po,Oj,ci=l(()=>{"use strict";W();pt();Jw=new Map,xj=e=>{let t=new AbortController;return Jw.set(e,t),t.signal},Ij=e=>{Jw.delete(e)},Po=e=>{Jw.get(e)?.abort()},Oj=(e,t)=>{let r=Z(e,t);return r===null||r.wizard!==void 0?!1:(E(r.status)||(D(e,{...r,status:"stopped",errorMessage:hn,updatedAt:new Date().toISOString()}),Po(t)),!0)}});var Mj,Nj,Yw,Dj,Xw=l(()=>{"use strict";W();kc();ci();Mj="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",Nj=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return ct[r]??null},Yw=(e,t)=>{let r=Nj(t);if(r===null||e.wizard===void 0)return!1;let o=ct.indexOf(r);if(o===-1)return!1;let n=Or(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<ct.length)},Dj=(e,t)=>{let r=Nj(t);if(r===null||e.wizard===void 0||!Yw(e,t))return e;Po(e.id);let o=ct.slice(ct.indexOf(r)),n=ql(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var Zw,zj,jj=l(()=>{"use strict";Xw();Zw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zj=(e,t)=>Yw(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${Zw(Mj)}"><input type="hidden" name="cycleId" value="${Zw(e.id)}"><input type="hidden" name="wizardStepId" value="${Zw(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var X7,$j,Z7,Hj,Fj=l(()=>{"use strict";W();kc();Ej();Rj();jj();Wg();X7={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},$j=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Z7=(e,t,r)=>{let o=zj(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${$j(t)}">
  <summary class="sdlc-wizard-accordion-summary">${$j(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${ei(e,t)}</div>
</details>`},Hj=e=>{let t=e.wizard;if(t===void 0)return"";let r=Or(e);if(r===null)return"";let o=ct.slice(0,r).map((i,a)=>Z7(e,`wizard-${a+1}`,X7[i])),n=t.gate!==null?Lj(e,{active:!0}):Wj(e),s=r>=ct.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var pf,Qw=l(()=>{"use strict";Fj();fw();W();pf=e=>{if(e===null||e.wizard!==void 0&&E(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=Hj(e),r=PD(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var Q7,ev,Uj=l(()=>{"use strict";W();we();Ve();Wn();Q7=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},ev=async(e,t,r)=>{if(!Q7(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===x)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=N_({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Ze({writerAgent:e.judgeModel,prompt:n,workingDirectory:ue(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=z_(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var Ec,mf,Bj,tv,Gj,qj,Vj,gf,rv=l(()=>{"use strict";Ec=g(require("node:fs")),mf=g(require("node:path")),Bj=e=>mf.default.join(mf.default.dirname(e),"prompt-optimizer-writer-ready.json"),tv=e=>{let t=Bj(e);if(!Ec.default.existsSync(t))return{};try{let r=JSON.parse(Ec.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},Gj=(e,t)=>{Ec.default.mkdirSync(mf.default.dirname(e),{recursive:!0}),Ec.default.writeFileSync(Bj(e),`${JSON.stringify(t,null,2)}
`)},qj=(e,t)=>tv(e)[t]?.message??null,Vj=(e,t,r)=>{Gj(e,{...tv(e),[t]:{message:r}})},gf=(e,t)=>{let r=tv(e);r[t]!==void 0&&Gj(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var ov,ff,hf,Kj,ve,Mn=l(()=>{"use strict";W();vw();_c();Uj();wc();ci();rv();uf();pt();ov=new Set,ff={atMs:0,ids:[]},hf=async()=>{if(Date.now()-ff.atMs<3e4)return ff.ids;let e=await Wt({commands:fe({})});return ff.atMs=Date.now(),ff.ids=e.installedWriterIds,e.installedWriterIds},Kj=async(e,t,r)=>{let o=Z(e,t);if(o===null||r.aborted)return;let n=In(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(E(n.status)&&!s||n.status==="wizard_paused"||ir(n))return;if(s){let c=await ev(n,r,d=>{gf(e,d)});D(e,c);return}let i=await Rz(n,c=>{gf(e,c)},r,c=>{Z(e,t)?.status==="stopped"||r.aborted||D(e,c)});if(!(Z(e,t)?.status==="stopped"||r.aborted)){if(D(e,i),E(i.status)){let c=await ev(i,r,d=>{gf(e,d)});D(e,c);return}await Kj(e,t,r)}},ve=(e,t)=>{if(ov.has(t))return;let r=Z(e,t);if(r===null)return;let o=In(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(E(o.status)&&!n||o.status==="wizard_paused"||ir(o))return;ov.add(t);let s=xj(t);Kj(e,t,s).finally(()=>{ov.delete(t),Ij(t)})}});var _o,Wc=l(()=>{"use strict";Kw();uf();Qw();Mn();_o=(e,t)=>{let r=In(e,t);return ve(e,r.id),`${df(r)}${pf(r)}`}});var Jj,Yj,Xj=l(()=>{"use strict";Jj=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,Yj=e=>e!==null&&e>0});var e9,t9,r9,Zj,Qj=l(()=>{"use strict";W();_c();tf();gc();fc();ci();Rg();Rg();e9=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),t9=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ce(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},r9=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=oe(o);return ai({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},Zj=(e,t)=>{if(!uc(e,t))return e;Po(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return Rn({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return So(t9(r));if(t==="wizard-3"){let n=o.splitOptions[0]??e9(o.templatedPrompt);return yo(r,n)}return t==="wizard-4"?r9(r):e}});var yf,e$,nv=l(()=>{"use strict";W();tf();ci();yf=e=>(Po(e.id),{...ai(e,"stopped"),errorMessage:c_}),e$=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;Po(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var o9,t$,r$,o$=l(()=>{"use strict";W();_c();tf();gc();fc();Wc();pt();Mn();Xj();Xw();Qj();nv();o9="Pick a revision scored above 0 before continuing to Separate.",t$=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),r$=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=Z(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=Z(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(_o(e.storePath,d))};if(o==="wizard-stop-all"){let c=yf(s);return D(e.storePath,c),ve(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=e$(s);return D(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=Dj(s,c);return D(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=Zj(s,c);return D(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&ve(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let u=t.get("wizardStepInstructions")?.trim()??"",m=W_(s.wizard,d,c);m=ql(m,d),m={...m,pendingStepInstructions:u};let S={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return D(e.storePath,S),ve(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(S=>S.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?t$(s):Rn({...s,wizard:{...s.wizard,gate:null}});return D(e.storePath,m),ve(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),u=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=Jj(s,u??-1);if(!Yj(m)){let h={...s,errorMessage:o9,updatedAt:new Date().toISOString()};return D(e.storePath,h),a(n),!0}let S=So({...s,wizard:{...s.wizard,evaluateSelectedRound:u}});return D(e.storePath,S),ve(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=t$(s);return D(e.storePath,h),ve(e.storePath,n),a(n),!0}let u=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(h=>h.id===u);if(m===void 0){let h={...s,errorMessage:u.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return D(e.storePath,h),a(n),!0}let S=yo(s,m);return D(e.storePath,S),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,u=d.currentModuleIndex,m=d.modules[u];if(m===void 0)return a(n),!0;if(!Zs(s.costControls)){let b=t.get("confirmedTokenBudget")?.trim()??"",A=t.get("confirmedMaxSpendUsd")?.trim()??"";if(b.length===0){let P={...s,errorMessage:Js,updatedAt:new Date().toISOString()};return D(e.storePath,P),a(n),!0}let f=Er({existing:s.costControls,confirmedTokenBudget:Number(b),confirmedMaxSpendUsd:A.length===0?null:Number(A),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!f.ok){let P={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return D(e.storePath,P),a(n),!0}s={...s,costControls:f.costControls,errorMessage:null,updatedAt:new Date().toISOString()},D(e.storePath,s)}let S=J_({wizard:d,modulePrompt:m.prompt,posted:t});if(!S.ok){let b={...s,errorMessage:S.errorMessage,updatedAt:new Date().toISOString()};return D(e.storePath,b),a(n),!0}let h={...d,parameterValues:S.parameterValues};if(m.status==="pending"){let b=Wz({...s,wizard:{...h,gate:null}},u);return D(e.storePath,b),ve(e.storePath,n),a(n),!0}let y=u+1;if(y>=d.modules.length){let b=oe(h),A=ai({...s,wizard:h},b.terminalStatusSuggestion);return D(e.storePath,A),ve(e.storePath,n),a(n),!0}let p={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...h,gate:"optimize_modules",currentModuleIndex:y},updatedAt:new Date().toISOString()};return D(e.storePath,p),a(n),!0}}return a(n),!0}});var n9,n$,s9,sv,i9,s$,i$=l(()=>{"use strict";we();ci();nv();xw();Vg();wc();pt();n9="Add a score from 0 to 100 and the reason for it.",n$="Add a score from 1 to 100 and the reason for it.",s9="Write the next prompt.",sv="This step is not waiting for you.",i9=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},s$=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=Z(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(D(e.storePath,yf(a)),{kind:"saved",cycleId:i}):Oj(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=Z(e.storePath,r);if(o===null||!ir(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:sv};if(t==="manual-judge"){if(o.judgeModel!==x)return{kind:"invalid",cycle:o,errorMessage:sv};let i=i9(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?n$:n9};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:n$};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",u=Kg(Ac(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return D(e.storePath,u),{kind:"saved",cycleId:o.id}}if(o.improverModel!==x)return{kind:"invalid",cycle:o,errorMessage:sv};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:s9};let s=qg(o,n);return D(e.storePath,s),{kind:"saved",cycleId:o.id}}});var a$,l$=l(()=>{"use strict";a$=`<script>
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
</script>`});var c$,d$=l(()=>{"use strict";c$=`<script>
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
</script>`});var u$,p$=l(()=>{"use strict";u$=`<script>
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
</script>`});var m$,g$=l(()=>{"use strict";m$=`<script>
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
</script>`});var f$,h$=l(()=>{"use strict";W();Ve();f$=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:ut(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(ie(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!E(t.status)}}});var y$,S$=l(()=>{"use strict";y$=`<script>
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
</script>`});var A$,b$=l(()=>{"use strict";W();kc();rf();A$=e=>{let t=li(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:E(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=Or(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=oe(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=oe(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return E(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var P$,_$=l(()=>{"use strict";P$=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Mr,a9,l9,w$,v$=l(()=>{"use strict";b$();_$();Tc();Mr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),a9=e=>e.wizard===void 0?"legacy":"wizard",l9=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Mr(t)}">`,o=A$(e),n=P$(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Mr(o.badgeClass)}">${Mr(o.badgeLabel)}</span>`,u=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Mr(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Mr(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${a9(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Mr(e.id)}">${Mr(xr(e.goal))}</a><p class="muted">${Mr(a)}</p></div></div><div class="sdlc-history-row-actions">${u}${m}</div></li>`},w$=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>l9(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Mr(s)}</summary>${i}</details>`:i}});var iv,Sf,T$,c9,d9,Rc,k$,Af=l(()=>{"use strict";iv=g(require("node:fs")),Sf=g(require("node:path"));Ve();T$=/^[a-z0-9-]+$/,c9=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},d9=(e,t)=>{if(!T$.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let u=/^(name|description):\s*(.*)$/.exec(d.trim());if(u===null)continue;let m=c9(u[2]??"");u[1]==="name"&&m.length>0&&(o=m),u[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},Rc=e=>{let t=Wr(e);if(!t.ok)return[];let r=Sf.default.resolve(t.path,".cursor","skills"),o=[];try{o=iv.default.readdirSync(r)}catch{return[]}return o.filter(n=>T$.test(n)).flatMap(n=>{let s=Sf.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${Sf.default.sep}`))return[];try{let i=d9(iv.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},k$=(e,t)=>Rc(e).find(r=>r.fileName===t)??null});var C$,u9,L$,E$,W$=l(()=>{"use strict";bo();C$=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),u9=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),L$=e=>{if(e.length===0)return`<div class="field">${pe("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${C$(r.fileName)}">${C$(r.fileName)}</option>`).join("");return`<div class="field">${pe("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${u9(e)}</script>`},E$=`<script>
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
</script>`});var et,R$,x$=l(()=>{"use strict";W();lf();mc();bo();et=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),R$=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=et(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=Xs({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??Lr(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),m=Gg({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",S=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${et(K.knobsSectionTitle)}</p>
  <p class="muted">${et(K.knobsSectionLede)}</p>
  <div class="field">
    ${pe(K.maxTrialsLabel,"maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${30}" step="1" value="${r}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${pe(K.maxSpendUsdLabel,"maxSpendUsd")}
    <input class="input" type="number" name="maxSpendUsd" id="sdlc-max-spend-usd" min="0" step="0.01" value="${o}" placeholder="Optional" data-sdlc-max-spend-usd>
    <p class="muted">${et(K.autoConfirmHint)}</p>
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${n}>
      <span>${et(K.earlyStopLabel)}</span>
    </label>
    <p class="muted">${et(K.earlyStopHint)}</p>
  </div>
  <div class="sdlc-cost-estimate" data-sdlc-cost-estimate>
    <p class="sdlc-block-title">${et(K.estimateSectionTitle)}</p>
    <p class="muted">${et(K.estimateSectionLede)}</p>
    <dl class="sdlc-cost-proposal sdlc-cost-estimate-proposal">
      <div><dt>${et(K.targetTokenLabel)}</dt><dd data-sdlc-target-tokens data-sdlc-proposed-tokens>${a.targetTokenBudget.toLocaleString("en-US")}</dd></div>
      <div><dt>${et(K.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${a.estimatedSpendUsd.toFixed(4)}</dd></div>
      <div><dt>${et(K.rateChipLabel)}</dt><dd><span class="sdlc-cost-rate-chip" data-sdlc-writer-rate-chip data-writer-id="${et(S)}">$${c.toFixed(4)} / 1k \xB7 ${et(S)}</span></dd></div>
    </dl>
    <input type="hidden" name="targetTokenBudget" value="${a.targetTokenBudget}" data-sdlc-target-token-budget-input>
    <input type="hidden" name="estimatedSpendUsd" value="${a.estimatedSpendUsd}" data-sdlc-estimated-spend-input>
    <input type="hidden" name="rateUsdPer1kTokens" value="${c}" data-sdlc-cost-rate>
    <p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling${m}>${et(K.estimateOverCeilingWarn)}</p>
  </div>
</div>`}});var Ue,I$,O$,p9,M$,N$,D$,z$=l(()=>{"use strict";W();Hw();we();Tc();kc();Ue=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),I$=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",O$=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,p9=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},M$=e=>e===x?"You":ae(e),N$=e=>{let t=p9(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ae(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Ue(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Ue(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Ue(M$(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Ue(M$(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Ue(r)}</dd></div>
    </dl>
  </details>`},D$=e=>{let t=e.wizard;if(t===void 0)return"";let r=xr(e.goal),o=e.status==="wizard_paused",n=!E(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let u=nf(e),m=O$(t),S=m===null?"":I$(m),h=Or(e),y=S.length===0?"":h===null||h>=4?` <strong>${Ue(S)}</strong>`:` <strong>${Ue(S)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Ue(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Ue(u.title)}${y}</p>
    <p class="muted">${Ue(u.detail)}</p>
    <div class="actions">
      ${N$(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ue(e.id)}">Open this run</a>
    </div>
  </section>`}let s=O$(t),i=s===null?"Wizard":I$(s),a=Or(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ue(r)}</h2>
    <p class="lede">Paused at <strong>${Ue(i)}</strong>${Ue(c)} (last updated ${Ue(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${N$(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ue(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var xc,j$,$$=l(()=>{"use strict";bo();xc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),j$=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${xc(n.id)}"${n.id===e.runner?" selected":""}>${xc(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${xc(e.runner)}">Checking ${xc(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${pe("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${pe("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${xc(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var H$,F$=l(()=>{"use strict";H$=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var di,U$,B$,G$,q$,V$=l(()=>{"use strict";bo();di=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),U$=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${di(c.id)}"${c.id===r?" selected":""}>${di(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${di(n)}</option>`;return`<div class="field">${pe(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},B$=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${di(t)}">Checking ${di(o)}\u2026</p>`},G$=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${pe(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${di(r)}</textarea><span class="muted">${o}</span></div></details>`,q$=e=>{let t=`<div class="sdlc-writer">${U$("judge","Judge",e.judge,e.writers,"I'll score it")}${B$("judge",e.judge,e.writers)}${G$("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${U$("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${B$("improver",e.improver,e.writers)}${G$("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var K$,J$=l(()=>{"use strict";K$=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var av,Y$,X$=l(()=>{"use strict";J$();av=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Y$=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${K$.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${av(t.goal)}" title="${av(t.goal)}">${av(t.label)}</button>`).join("")}</div>`});var Ic,m9,g9,lv,Z$=l(()=>{"use strict";W();bo();Ic=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),m9=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},g9=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,lv=e=>{let t=m9(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=$l(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${pe(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${Ic(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${Ic(e.inputId)}" class="sdlc-pass-range" type="range" name="${Ic(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${Ic(a)}"><span class="sdlc-pass-mark" style="left:${g9(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${Ic(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var h9,cv,Nr,Q$,eH=l(()=>{"use strict";wc();Kw();l$();d$();Dg();p$();g$();h$();S$();v$();Af();W$();bo();Qw();x$();z$();Tc();$$();F$();V$();W();X$();Z$();h9=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,cv='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',Nr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Q$=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Nr(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Nr(e.skillNotice??"")}</div>`,o=`${ID}${OD}`,n=e.resumableWizardCycle??null,s=n===null?"":D$(n),i=pf(e.cycle),a=e.cycle===null?"":df(e.cycle),c=e.cycle!==null&&ir(e.cycle),d=f$(e),u=h9(d.goal,d.prompt,e.canRun),m=q$({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),S=j$({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=`${lv({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${lv({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=R$({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),p=L_,b=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",A=e.cycle!==null&&E(e.cycle.status),f=d.running&&!A,P=A||f?"":" open",w=f?" sdlc-compose-run-focus":"",k=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${A?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,L=A?(()=>{let H=e.cycle!==null?xr(e.cycle.goal):xr(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Nr(H)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${k}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${k}</summary>`,R=A?" sdlc-compose-viewing-finished":"",I=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",N=c?"waiting":d.running?"running":"idle",U=d.running&&!c?' aria-busy="true"':"",G=`<section class="card sdlc-compose${R}${w}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${P}>
        ${L}
        <div class="sdlc-compose-details-body">
      <p class="lede">${p} ${Nr(e.modelNote)}</p>
        <ol class="sdlc-compose-stepper" aria-label="Compose steps" data-sdlc-compose-stepper>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="1" aria-current="step"><span class="sdlc-compose-stepper-index">1</span><span class="sdlc-compose-stepper-label">Project</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="2"><span class="sdlc-compose-stepper-index">2</span><span class="sdlc-compose-stepper-label">Prompt and goal</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="3"><span class="sdlc-compose-stepper-index">3</span><span class="sdlc-compose-stepper-label">CLI</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="4"><span class="sdlc-compose-stepper-index">4</span><span class="sdlc-compose-stepper-label">Summary</span></li>
        </ol>
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${b}
        <p class="alert-error sdlc-compose-step-error" data-sdlc-compose-step-error hidden role="alert"></p>
        <div class="sdlc-compose-step" data-sdlc-compose-step="1" id="sdlc-compose-step-1">
          <h3 class="sdlc-compose-step-title">Project</h3>
          <p class="muted sdlc-compose-step-lede">Choose the folder writers run in and optionally load a skill into the prompt on the next step.</p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="sdlc-folder">
          <div class="field">
            ${pe("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Nr(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${L$(Rc(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${cv}
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <input type="hidden" name="orchestratorSkillFile" value="" data-orchestrator-skill-file>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <p class="muted sdlc-compose-orchestrator-note" data-orchestrator-skill-note hidden></p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${pe("Goal","goal")}
            ${Y$()}
            <textarea class="input textarea" name="goal" rows="4" required>${Nr(d.goal)}</textarea>
          </div>
          <div class="field">
            ${pe("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Nr(d.prompt)}</textarea>
          </div>
          ${h}
          ${y}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${cv}
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
        ${S}
        ${H$()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${cv}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${Nr(d.passScore)}; Step 4 pass \u2265 ${Nr(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${N}" data-can-run="${u?"true":"false"}"${U}${d.running?" disabled":""}>${I}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,q=e.history.length>0?y$:"",Ke=`${""}${m$}${a$}${c$}${u$}${E$}${q}`;return`${t}${r}${G}${s}${a}${i}${o}${w$(e.history,e.cycle?.id??null)}${Ke}`}});var Oc,dv=l(()=>{"use strict";eH();Oc=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:Q$(t)}))}});var tH,rH=l(()=>{"use strict";i$();Wc();dv();pt();Mn();tH=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:s$({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=Z(e.storePath,o.cycleId);return ve(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(_o(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Oc(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:nr(e.storePath),resumableWizardCycle:null}),!0)}});var oH,bf,uv=l(()=>{"use strict";W();oH=g(require("node:os")),bf=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??oH.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??Nt()}}});var nH,ui,pv,sH,iH,Mc=l(()=>{"use strict";W();we();Pw();nH=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,ui=e=>{let t=aD(e),r=Tn(e).map(s=>({id:s,label:Tg[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},pv=(e,t,r)=>t===x||t!==null&&e.writers.some(o=>o.id===t)?t:r,sH=(e,t,r,o=null)=>({judge:pv(e,t,e.judge),improver:pv(e,r,e.improver),runner:pv(e,o,e.runner)}),iH=e=>e===zg?{goal:jg,prompt:$g}:{goal:"",prompt:""}});var mv,aH=l(()=>{"use strict";mv=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var lH,y9,cH,dH,uH,pH=l(()=>{"use strict";W();lH=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},y9=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},cH=(e,t)=>e.has("earlyStop")?!0:t!=="run",dH=e=>{let t=lH(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=y9(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=lH(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},uH=e=>Nt(e)});var mH,gH,Pf,gv=l(()=>{"use strict";W();we();Ve();Mc();aH();pH();mH=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=mv(o);return n.ok?String(n.passScore):String(r)},gH=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return mv(n)},Pf=e=>{let t=sH(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=mH(e.posted,"passScore",70),o=mH(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),u=e.posted?.get("maxSpendUsd")?.trim()??"",m=e.posted?.get("intent")??"",S=e.posted===null?!0:cH(e.posted,m),h=(L,R)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:L,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:R,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:u,earlyStop:S});if(e.posted===null)return h(e.defaultFolder??kn,null);let y=e.posted.get("folder")??kn;if(e.posted.get("intent")==="choose-folder"){let L=e.pickFolder();return h(L===null?y:ut(L),null)}if((e.posted.get("intent")??"")!=="run")return h(y,null);let b=nH(e.goal,e.prompt);if(b!==null)return h(y,b);let A=gH(e.posted,"passScore",r);if(!A.ok)return h(y,A.errorMessage);let f=gH(e.posted,"modulePassScore",o);if(!f.ok)return h(y,f.errorMessage);let P=lD(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(P===null)return h(y,"Choose a judge and an improver.");let w=Wr(y);if(!w.ok)return h(y,w.errorMessage);let T=cD(e.installedIds,c,P.judge);if(T===null)return h(y,"Choose a runner for wizard step 4.");let k=dH({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return k.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:P.judge,improver:P.improver,workingDirectory:w.path,passScore:A.passScore,modulePassScore:f.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:T,runnerInstructions:a,costControls:uH(k.knobs)}:h(y,k.errorMessage)}});var pi,wf,S9,fv,fH,_f,hH,A9,yH,hv,b9,P9,_9,yv,SH,AH,bH=l(()=>{"use strict";pi=g(require("node:fs")),wf=g(require("node:path"));we();Ve();S9=["remember","choose-folder","run"],fv=()=>({folder:kn,judge:"",improver:"",runner:""}),fH=e=>wf.default.join(wf.default.dirname(e),"prompt-optimizer-preferences.json"),_f=e=>typeof e=="string"?e:"",hH=e=>{let t=fH(e);if(!pi.default.existsSync(t))return fv();try{let r=JSON.parse(pi.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return fv();let o=r,n=_f(o.folder).trim();return{folder:n.length===0?kn:n,judge:_f(o.judge),improver:_f(o.improver),runner:_f(o.runner)}}catch{return fv()}},A9=(e,t)=>{let r=fH(e);pi.default.mkdirSync(wf.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;pi.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),pi.default.renameSync(o,r)},yH=(e,t)=>e===x||Tn(t).some(r=>r===e),hv=(e,t,r)=>e===null?t:e.length===0?"":yH(e,r)?e:t,b9=(e,t)=>{if(e===null)return t;let r=Wr(e);return r.ok?r.display:t},P9=e=>{let t=hH(e.storePath),r={folder:b9(e.folder,t.folder),judge:hv(e.judge,t.judge,e.installedIds),improver:hv(e.improver,t.improver,e.installedIds),runner:hv(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||A9(e.storePath,r)},_9=e=>{let t=Wr(e);return t.ok?t.display:kn},yv=(e,t)=>yH(e,t)?e:"",SH=e=>{let t=hH(e.storePath);return{selection:{...e.selection,judge:yv(t.judge,e.installedIds)||e.selection.judge,improver:yv(t.improver,e.installedIds)||e.selection.improver,runner:yv(t.runner,e.installedIds)||e.selection.runner},defaultFolder:_9(t.folder)}},AH=e=>{let t=e.posted.get("intent")??"";if(!S9.includes(t))return;let r=e.posted.get("folder");P9({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var PH,w9,v9,Sv,T9,vf,Tf=l(()=>{"use strict";PH=g(require("node:os"));we();rv();Wn();w9="Reply with the single word ok. Do not use tools.",v9=45e3,Sv=async(e,t)=>{if(t===x)return{ok:!0,message:"You will do this step."};let r=qj(e,t);if(r!==null)return{ok:!0,message:r};let o=await Ze({writerAgent:t,prompt:w9,workingDirectory:PH.default.tmpdir(),timeoutMs:v9});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ae(t)} is ready.`;return Vj(e,t,n),{ok:!0,message:n}},T9=e=>[...new Set(e.filter(t=>t.length>0))],vf=async(e,t,r,o)=>{for(let n of T9([t,r,o??""])){let s=await Sv(e,n);if(!s.ok)return s.message}return null}});var Av,_H=l(()=>{"use strict";W();Av=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!E(r.status)&&!(t!==null&&r.id===t))return r;return null}});var wH,vH=l(()=>{"use strict";Qt();W();mc();Wc();uv();gv();dv();pt();Ve();bH();Af();Tf();_H();uf();Mn();wH=async e=>{let t=e.posted===null?SH({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=Pf({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>uo("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(AH({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?ut(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await vf(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await Oc(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:ut(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:nr(e.route.storePath),resumableWizardCycle:Av(nr(e.route.storePath),null)});return}if(r.kind==="start"){let s=k$(r.workingDirectory,r.sourceSkillFile),i=Bg(ic({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=bf({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:$_({...Gl(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(D(e.route.storePath,a),ve(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(_o(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:Z(e.route.storePath,e.cycleId);n!==null&&(n=In(e.route.storePath,n),ve(e.route.storePath,n.id)),await Oc(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:nr(e.route.storePath),resumableWizardCycle:Av(nr(e.route.storePath),n?.id??null)})}});var TH,kH=l(()=>{"use strict";pt();TH=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";UD(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var CH,LH=l(()=>{"use strict";CH=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var EH,WH=l(()=>{"use strict";YD();o$();rH();vH();kH();Mc();LH();Mn();EH=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await hf(),o=ui(r),n=e.method==="POST"?CH(e.request.headers["content-type"],await e.readBody(e.request)):null;if(r$({posted:n,storePath:e.storePath,response:e.response})||await tH(e,n,o))return;let s=iH(t.searchParams.get("example")),i=TH({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=JD({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await wH({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:KD(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var k9,RH,xH=l(()=>{"use strict";W();pt();k9=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",RH=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=Z(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!E(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=H_({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${k9(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var IH,OH=l(()=>{"use strict";Wc();pt();IH=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:Z(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":_o(e.storePath,o)),!0}});var C9,MH,NH=l(()=>{"use strict";we();Tf();C9=["claude-cli","codex","cursor","antigravity"],MH=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===x||C9.includes(t)?await Sv(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var DH,zH=l(()=>{"use strict";W();DH=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:Fl,page:Ul,context:qs,installedWriters:e,post:{method:"POST",url:Fl,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${Fl}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var kf,jH=l(()=>{"use strict";W();Vw();ri();kf=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ce(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=E(e.status),n=e.errorKind??null,s=cf({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:Rr(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:qs,page:`${Ul}?cycle=${encodeURIComponent(e.id)}`}}});var F,L9,$H,HH,FH=l(()=>{"use strict";F=g(es());W();L9=(0,F.isType)({goal:F.isString,prompt:F.isString,workingDirectory:F.isString,judge:(0,F.isUndefinedOr)(F.isString),improver:(0,F.isUndefinedOr)(F.isString),passScore:(0,F.isUndefinedOr)(F.isNumber),maxRounds:(0,F.isUndefinedOr)(F.isNumber),maxTrials:(0,F.isUndefinedOr)(F.isNumber),maxSpendUsd:(0,F.isUndefinedOr)(F.isNumber),earlyStop:(0,F.isUndefinedOr)(F.isBoolean),earlyStopFlatRounds:(0,F.isUndefinedOr)(F.isNumber),confirmedTokenBudget:(0,F.isUndefinedOr)(F.isNumber),confirmedMaxSpendUsd:(0,F.isUndefinedOr)(F.isNumber),rateUsdPer1kTokens:(0,F.isUndefinedOr)(F.isNumber)}),$H=e=>{let t=e?.trim()??"";return t.length===0?null:t},HH=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return L9(t)?t.workingDirectory.trim().length===0?{ok:!1,error:ug}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:$H(t.judge),improver:$H(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:ug}}});var Dr,E9,UH,BH,GH=l(()=>{"use strict";W();Dr=g(es()),E9=(0,Dr.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:Dr.isNumber,confirmedMaxSpendUsd:(0,Dr.isUndefinedOr)(Dr.isNumber),rateUsdPer1kTokens:(0,Dr.isUndefinedOr)(Dr.isNumber)}),UH=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:E9(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},BH=(e,t)=>{let r=Er({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var W9,qH,VH=l(()=>{"use strict";W();we();gv();Mc();W9=e=>e.map(t=>t.id).join(", "),qH=e=>{let t=ui(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===x||n===x)return{ok:!1,error:C_,installedWriters:t.writers};if(o===null||n===null){let a=W9(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=Pf({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var R9,KH,JH=l(()=>{"use strict";W();uv();zH();jH();Mc();FH();GH();VH();pt();R9=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},KH=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let u=Z(e.storePath,t);return u===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:kf(u)}}let r=await e.handlers.readInstalledIds(),o=ui(r);if(e.method==="GET")return{status:200,body:DH(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let u=UH(e.rawBody);if(u.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(u.kind==="invalid")return{status:400,body:{ok:!1,error:u.error}};let m=Z(e.storePath,t);if(m===null)return{status:404,body:{ok:!1,error:"That run is not on this Mac."}};let S=BH(m,u.body);return S.ok?(D(e.storePath,S.cycle),{status:200,body:kf(S.cycle)}):{status:400,body:{ok:!1,error:S.error}}}let n=R9(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let u=Xs({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:u.targetTokenBudget,proposedTokenBudget:u.targetTokenBudget,estimatedSpendUsd:u.estimatedSpendUsd,rateUsdPer1kTokens:u.rateUsdPer1kTokens??null,proposalStub:u.stub===!0,confirmationRequired:!0}}}let s=HH(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=qH({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=ic({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:dt({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let u=Er({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!u.ok)return{status:400,body:{ok:!1,error:u.errorMessage}};c=u.costControls}let d=bf({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:Gl(i.prompt),runnerModel:i.runner,costControls:c});return D(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:kf(d)}}});var YH,XH=l(()=>{"use strict";Mn();Tf();JH();YH=async e=>{let t=await KH({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:hf,readWritersReady:vf,startCycle:ve}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var QH,x9,I9,ZH,O9,eF,tF=l(()=>{"use strict";QH=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],x9=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},I9=e=>{let t={};for(let n of e)for(let s of new Set(QH(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},ZH=(e,t)=>{let r=x9(QH(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},O9=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},eF=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=I9(e.map(i=>i.text)),s=ZH(o,n);return e.map(i=>({id:i.id,score:O9(s,ZH(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var bv,M9,N9,rF,D9,z9,j9,$9,Pv,_v=l(()=>{"use strict";bv=g(require("node:path"));Ve();tF();Af();M9=5,N9=20,rF=280,D9=e=>[e.name,e.description,e.promptText].join(`
`),z9=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=rF?t:`${t.slice(0,rF-3)}...`},j9=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),$9=e=>e===void 0||!Number.isFinite(e)?M9:Math.min(N9,Math.max(1,Math.floor(e))),Pv=e=>{let t=e.query.trim(),r=$9(e.limit),o=Wr(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=Rc(o.path),s=eF(n.map(d=>({id:d.fileName,text:D9(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=bv.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let u=i.get(d.id);return u===void 0?[]:[{skillId:u.fileName,name:u.name,description:u.description,score:d.score,sourcePath:bv.default.join(a,u.fileName,"SKILL.md"),excerpt:z9(u),source:"filesystem"}]});return{query:t,hits:c,context:j9(c)}}});var oF,nF=l(()=>{"use strict";_v();oF=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:Pv({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var sF,iF=l(()=>{"use strict";nF();sF=async e=>{let t=oF({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var H9,wv,aF=l(()=>{"use strict";DD();WH();xH();OH();NH();XH();iF();H9=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},wv=async e=>{let t=H9(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await YH(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await sF(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:ND()})),!0):(await MH({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||RH({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||IH({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await EH(e),!0)}});var lF=l(()=>{"use strict";aF();_v();Wn()});var Nn,Nc,F9,U9,B9,G9,cF,dF=l(()=>{"use strict";Nn=g(require("node:fs")),Nc=g(require("node:path")),F9="prompt-optimizer-cycles.json",U9="prompt-optimizer-preferences.json",B9="prompt-sdlc-cycles.json",G9="prompt-sdlc-preferences.json",cF=e=>{let t=Nc.default.join(e,F9),r=Nc.default.join(e,B9);if(Nn.default.existsSync(t)||!Nn.default.existsSync(r))return t;try{Nn.default.renameSync(r,t)}catch{return r}let o=Nc.default.join(e,G9),n=Nc.default.join(e,U9);if(Nn.default.existsSync(o)&&!Nn.default.existsSync(n))try{Nn.default.renameSync(o,n)}catch{}return t}});var mi,q9,vv,uF=l(()=>{"use strict";mi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),q9=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],vv=e=>{let t=q9.map(i=>`<option value="${mi(i.value)}">${mi(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${mi(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${mi(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${mi(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${mi(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Dc,gF,V9,fF,K9,J9,hF,Lf,pF,mF,Y9,X9,zr,zc,Cf,Z9,Ef,Tv,Q9,kv,yF,Cv,SF,eY,tY,rY,AF,bF,PF,jc=l(()=>{"use strict";Dc=g(require("node:fs")),gF=g(require("node:path")),V9="estimate-history.ndjson",fF=100,K9=500,J9=2e4,hF=e=>gF.default.join(e,V9),Lf=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,K9),pF=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,J9),mF=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,Y9=e=>({...e,estimateTokens:mF(e.estimateTokens),actualTokens:mF(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),X9=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},zr=e=>{let t=hF(e);return Dc.default.existsSync(t)?Dc.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return X9(n)?[Y9(n)]:[]}catch{return[]}}):[]},zc=(e,t)=>{Dc.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Dc.default.writeFileSync(hF(e),r,"utf8")},Cf=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),Z9=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${Cf(o.task)} | ${Cf(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},Ef=e=>{let t=zr(e.reportsDir),r=Lf(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);zc(e.reportsDir,[...s,n])},Tv=e=>{let t=zr(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?Lf(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);zc(e.reportsDir,[...i,s])},Q9=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-fF),kv=e=>[...zr(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),yF=e=>{let t=zr(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=pF(e.input),n=pF(e.output),s=Lf(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);zc(e.reportsDir,[...c,a])},Cv=(e,t)=>{let r=zr(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},SF=e=>({table:Z9(Q9(zr(e))),embedding:null}),eY=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},tY=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-fF),rY=e=>{let t=eY(tY(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${Cf(s.task)} | ${Cf(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},AF=e=>{let t=zr(e.reportsDir),r=Lf(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);zc(e.reportsDir,[...s,n])},bF=e=>{let t=zr(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);zc(e.reportsDir,[...s,n])},PF=e=>rY(zr(e))});var _F=l(()=>{"use strict";jc()});var jr,Lv,oY,Ev,nY,sY,Wf,Rf,iY,Wv,wF=l(()=>{"use strict";_F();Sw();jr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lv=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},oY=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${Lv(-r)} under`:`${Lv(r)} over`},Ev=e=>e.toLocaleString("en-US"),nY=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${Ev(-r)} under`:`${Ev(r)} over`},sY=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},Wf=e=>e===null?"\u2014":Lv(e),Rf=e=>e===null?"\u2014":Ev(e),iY=`(function () {
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
})();`,Wv=e=>{let r=kv(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":oY(n.estimateSeconds,n.actualSeconds),u=n.estimateTokens===null||n.actualTokens===null?"no estimate":nY(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${jr(sY(i))}</button></td>
        <td>${jr(c)}</td>
        <td>${Wf(n.estimateSeconds)}</td>
        <td>${Wf(n.actualSeconds)}</td>
        <td>${jr(d)}</td>
        <td>${Rf(n.estimateTokens)}</td>
        <td>${Rf(n.actualTokens)}</td>
        <td>${jr(u)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${jr(c)}</p>
        <h2>Input</h2>
        <pre>${jr(i)}</pre>
        <h2>Output</h2>
        <pre>${jr(a)}</pre>
        <p>Time: estimated ${Wf(n.estimateSeconds)} \xB7 actual ${Wf(n.actualSeconds)} \xB7 ${jr(d)}</p>
        <p>Tokens: estimated ${Rf(n.estimateTokens)} \xB7 actual ${Rf(n.actualTokens)} \xB7 ${jr(u)}</p>
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
            ${xg({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${iY}</script>`}
    </section>`}});var vF=l(()=>{"use strict";uF();wF()});var gi,aY,lY,Rv,TF=l(()=>{"use strict";gi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aY=(e,t,r)=>{let o=gi(t),n=gi(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},lY=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${gi(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>aY(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${gi(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${gi(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${gi(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},Rv=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(lY).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var kF=l(()=>{"use strict";TF()});var $c,CF,LF,xv,Iv,Ov,EF=l(()=>{"use strict";$c=g(require("node:fs")),CF=g(require("node:path"));Wl();Xm();LF=(e,t,r)=>js({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,xv=(e,t,r)=>{let o=LF(e,t,r);if(o===null)return[];if(!$c.default.existsSync(o))return[];let n=$c.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},Iv=e=>{let t=LF(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Tr(e.entry.prompt),output:Tr(e.entry.output)};$c.default.mkdirSync(CF.default.dirname(t),{recursive:!0}),$c.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},Ov=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var cY,dY,Hc,xf,Mv=l(()=>{"use strict";cY=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),dY=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Hc=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=cY(i.assistantOutput),d=c.length>0?`Assistant: ${dY(c,t)}`:null,u=[a,d].filter(m=>m!==null).join(`

`);if(u.length!==0){if(n+u.length>r&&o.length>0)break;o.unshift(u),n+=u.length}}return o.join(`

`)},xf=e=>{let t=e.userMessage.trim(),r=Hc({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var lr,Fc,zv,uY,pY,Nv,mY,jv,If,WF,RF,gY,fi,$v,Dv,xF,fY,IF,hi,Of,Uc,hY,Bc,Hv,Mf,Nf,OF=l(()=>{"use strict";lr=g(require("node:fs")),Fc=g(require("node:path")),zv=require("node:crypto");Mv();uY="writer-sessions",pY="active-index.json",Nv=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mY=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",jv=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},If=e=>{let t=Fc.default.join(e.installDir,uY);return lr.default.mkdirSync(t,{recursive:!0}),t},WF=e=>Fc.default.join(If(e),pY),RF=(e,t)=>Fc.default.join(If(e),`${t}.canonical.json`),gY=(e,t)=>Fc.default.join(If(e),`${t}.continuation.json`),fi=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,$v=e=>{let t=WF(e);if(!lr.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(lr.default.readFileSync(t,"utf8"));if(!Nv(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!Nv(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!mY(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},Dv=(e,t)=>{lr.default.writeFileSync(WF(e),JSON.stringify(t,null,2))},xF=(e,t)=>{lr.default.writeFileSync(RF(e,t.sessionId),JSON.stringify(t,null,2))},fY=(e,t)=>{lr.default.writeFileSync(gY(e,t.sessionId),JSON.stringify(t,null,2))},IF=(e,t)=>{let r=Hc({turns:t.turns});fY(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},hi=(e,t)=>{let r=RF(e,t);if(!lr.default.existsSync(r))return null;try{let o=JSON.parse(lr.default.readFileSync(r,"utf8"));return!Nv(o)||typeof o.sessionId!="string"?null:o}catch{return null}},Of=(e,t=20)=>{let r=If(e),o=lr.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=hi(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Uc=(e,t,r)=>{let o=jv(r);return $v(e).entries.find(i=>fi(i)===fi({writerAgent:t,projectFolderPath:o}))?.sessionId??null},hY=(e,t,r,o)=>{let n=$v(e),s=fi({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>fi(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];Dv(e,{entries:i})},Bc=(e,t,r)=>{let o=(0,zv.randomUUID)(),n=new Date().toISOString(),s=jv(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return xF(e,i),IF(e,i),hY(e,t,s,o),o},Hv=(e,t,r)=>{let o=Uc(e,t,r);return o!==null?o:Bc(e,t,r)},Mf=(e,t,r)=>{let o=jv(r),n=$v(e);if(o===null&&r===void 0){Dv(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=fi({writerAgent:t,projectFolderPath:o});Dv(e,{entries:n.entries.filter(i=>fi(i)!==s)})},Nf=e=>{let t=Hv(e.layout,e.writerAgent,e.projectFolderPath),r=hi(e.layout,t);if(r===null)return;let o={id:(0,zv.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};xF(e.layout,n),IF(e.layout,n)}});var yY,SY,Df,Fv,MF=l(()=>{"use strict";yY=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",SY=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},Df=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",Fv=e=>{let t=Df(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=yY(r,e.userPromptCharacterCount),n=SY({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var zf=l(()=>{"use strict";EF();OF();Mv();MF()});var NF=l(()=>{"use strict";Rp();As();rA()});var DF=l(()=>{"use strict";WS()});var tt,bY,PY,Uv,Bv,Gv,zF=l(()=>{"use strict";NF();DF();tt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bY=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},PY=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=Da(o);return`value="${tt(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${tt(r)}"`},Uv=(e,t,r,o,n)=>{let s=xp[t];return`<label class="field">
          <span class="field-label">${tt(o)} API key \u2014 ${tt(bY(e,t))} \xB7 <a class="field-link" href="${tt(s.href)}" target="_blank" rel="noopener noreferrer">${tt(s.label)}</a></span>
          <input class="input mono" type="password" name="${tt(r)}" autocomplete="off" ${PY(e,t,n)} />
        </label>`},Bv=(e,t,r,o)=>{let n=wp(e[t]?.model),s=new Set(_p[t].map(c=>c.value)),i=_p[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${tt(c.value)}"${d}>${tt(c.label)}</option>`}).join(""),a=n!==Xo&&!s.has(n)?`<option value="${tt(n)}" selected>${tt(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${tt(o)}</span>
          <select class="input mono" name="${tt(r)}">${i}${a}</select>
        </label>`},Gv=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${tt(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${Uv(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${Bv(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${Uv(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${Bv(e.secrets,"openai","openaiModel","OpenAI model")}
        ${Uv(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${Bv(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var jF=l(()=>{"use strict";zF()});var jf,$F,HF=l(()=>{"use strict";jf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$F=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${jf(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${jf(s.name)}</strong> <span class="muted mono">(${jf(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${jf(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var _Y,FF,UF,BF=l(()=>{"use strict";_Y=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,FF=e=>e.kind==="folder",UF=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&FF(d)){s=d;continue}let u={kind:"folder",name:a,children:new Map};s.children.set(a,u),s=u}}let r=o=>{let n=[];for(let s of o.children.values()){if(FF(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(_Y)};return r(t)}});var GF,qv,qF=l(()=>{"use strict";GF=g(require("node:path")),qv=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${qv(r.children,t)}</ul>
            </details>
          </li>`;let o=GF.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var VF,wo,wY,vY,Gc,TY,Vv,KF=l(()=>{"use strict";rg();VF=g(require("node:path"));HF();BF();qF();wo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wY=()=>`(() => {
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

})();`,vY=()=>`(() => {
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
})();`,Gc=e=>{let t=Ml({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=$F({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${wo(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${wo(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':TY(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${wo(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${wo(s)}" />
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
    <script>${wY()}</script>
    <script>${vY()}</script>`;return`${t}${r}${o}${c}${d}`},TY=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=UF(a.items.map(S=>({...S,relativePath:typeof S.relativePath=="string"&&S.relativePath.length>0?S.relativePath:VF.default.relative(a.sourceRoot,S.sourcePath).replaceAll("\\","/")}))),u=qv(d,wo),m=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${wo(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${wo(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${m} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${u}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${wo(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},Vv=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=a.trim();Number.isFinite(d)&&u.length>0&&n.set(d,u)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??u??a,S=t.sets[i];if(S===void 0)continue;let h=a.length>0?a:S.proposedSlug,y=m.length>0?m:S.proposedName,p=r.has(i),b=S.items.map(A=>({id:A.id,kind:A.kind,title:A.title,sourcePath:A.sourcePath,include:p}));s.push({slug:h,name:y,items:b})}return s}});var JF=l(()=>{"use strict";KF()});var kY,Kv,YF=l(()=>{"use strict";_r();kY=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},Kv=kY});var CY,XF,ZF=l(()=>{"use strict";_r();CY=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},XF=CY});var QF=l(()=>{"use strict"});var Dn,LY,Jv,e1=l(()=>{"use strict";rg();db();Dn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),LY=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,Jv=e=>{let t=e.flashError?`<div class="alert-error">${Dn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Dn(e.flashMessage)}</div>`:"",r=Ml({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Dn(LY(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,u=`<a class="btn btn-secondary btn-compact" href="${Dn(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=Am(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
                  <input type="hidden" name="projectId" value="${Dn(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Dn(n.name)}</strong>
                  <span class="muted mono">${Dn(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${u}${m}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then pull playbooks into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var t1=l(()=>{"use strict";QF();bm();e1()});var $f,r1=l(()=>{"use strict";$f=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var o1,jt,Yv=l(()=>{"use strict";o1=g(require("node:path"));gt();Me();V();le();eb();jt=e=>{let t=$()?.layout.installDir??C();if(o1.default.basename(t)===Ut)return it;let r=$(),o=r!==null?Le(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):it}});var Xv,n1=l(()=>{"use strict";Vt();Yv();Xv=async e=>{let t=ze(e.installDir),r=t?.bundleVersion??null,o=jt(t);try{let n=await ps(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Fo(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var Zv,s1=l(()=>{"use strict";Zv=e=>!e});var Qv,yi,eT=l(()=>{"use strict";V();Qv=()=>`http://127.0.0.1:${Vi()}/update/run`,yi=async e=>{try{let t=await fetch(Qv(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var EY,i1,tT,a1=l(()=>{"use strict";V();re();eT();EY=()=>{fr({launchAgentLabel:he(),installDir:C()})},i1=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},tT=async()=>{EY();let e=await yi({force:!0});if(e.ok)return{ok:!0,message:i1(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:i1(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Vt(),gW)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var rT=l(()=>{"use strict";t_();r1();Yv();n1();s1();a1();eT()});var l1,c1=l(()=>{"use strict";l1=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var d1,u1,oT,nT,p1=l(()=>{"use strict";d1=require("node:crypto"),u1=g(require("node:fs"));Qt();le();le();c1();oT=!1,nT=async e=>{if(oT)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!l1(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=X({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&u1.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,d1.randomUUID)();oT=!0;try{if(await tb(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Ps({...r,workspace:n},e.writerAgent,t);return await sl(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{oT=!1}}});var m1=l(()=>{"use strict";p1()});var At,WY,g1,f1,sT,iT,aT,lT,cT,dT,uT=l(()=>{"use strict";At=require("node:crypto"),WY=Buffer.from("302a300506032b6570032100","hex"),g1=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},f1=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,At.createPublicKey)({key:Buffer.concat([WY,t]),format:"der",type:"spki"})},sT=()=>{let{publicKey:e,privateKey:t}=(0,At.generateKeyPairSync)("ed25519");return{publicKeyRaw:g1(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},iT=e=>(0,At.createPrivateKey)(e),aT=(e,t)=>(0,At.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),lT=(e,t,r)=>{try{let o=f1(e);return(0,At.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},cT=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,dT=()=>(0,At.randomBytes)(32).toString("base64url")});var $r,Hf,h1,RY,xY,Ff,pT,mT,y1=l(()=>{"use strict";$r=g(require("node:fs")),Hf=g(require("node:path"));uT();V();Me();h1=e=>Hf.default.join(e.installDir,Jr),RY=(e,t)=>{if(e.profileEmail===null||t===h1(e)||$r.default.existsSync(t))return;let r=h1(e);$r.default.existsSync(r)&&($r.default.mkdirSync(Hf.default.dirname(t),{recursive:!0}),$r.default.renameSync(r,t))},xY=e=>{if(!$r.default.existsSync(e))return null;try{let t=$r.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Ff=e=>{let t=Du(e);RY(e,t);let r=xY(t);if(r!==null)return r;let o=sT();return $r.default.mkdirSync(Hf.default.dirname(t),{recursive:!0}),$r.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},pT=e=>{let t=Ff(e.layout),r=dT(),o=cT({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=iT(t.privateKeyPem),s=aT(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},mT=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return lT(e.serverPublicKey,t,e.serverAttestation)}});var gT=l(()=>{"use strict";y1();uT()});var S1,A1,b1=l(()=>{"use strict";S1=g(require("node:path")),A1=e=>({osUid:typeof e.uid=="number"&&Number.isInteger(e.uid)&&e.uid>=0?e.uid:null,installRootName:S1.default.basename(e.installDir)})});var v1,qc,yT,ST,P1,IY,fT,Uf,me,T1,OY,hT,MY,NY,AT,Se,Te,$t,DY,_1,w1,Vc,Kc,k1=l(()=>{"use strict";v1=g(require("node:http")),qc=g(require("node:fs")),yT=g(require("node:path"));Bf();Cl();bO();_O();LO();Jo();EP();QP();oM();sM();lF();dF();vF();kF();zf();jF();JF();io();Qt();_r();YF();ZF();t1();rT();Vt();m1();le();gT();b1();ST=e=>yP(e)??"never",P1=48e3,IY=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,fT=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??am(),reveal:t.reveal,installed:Zt(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Uf=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:ao(t,e)},me=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),T1=200,OY=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',hT=e=>{let t=e.trim().slice(0,T1),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},MY=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${me(t)}</div>`,NY=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${me(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',AT={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},Se=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...AT}),e.end(JSON.stringify(r))},Te=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},$t=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},DY=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=OY(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${me(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=Zv(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Ll(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${me(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${me(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${me(ST(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${me(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},_1=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},w1=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,T1)},Vc=e=>{let t=yT.default.join(e.layout.installDir,"link-code.txt"),r=()=>ze(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:$f(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let y=h.installVersion??r(),p=await i(),b=s_(p),A=h.updateFlash??null,f=i_(A),P=MY(A,h.updateError??null);return o_({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:jt(y),installBundleVersionLabel:$f(y),prependBody:`${f}${P}${b}`,headerUpdateButtonHtml:n_(p)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await Xv(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:hT("An update is already running.")}),h.end();return}c=!0;try{let p=await tT(),b=p.ok?"/?update=ok":hT(p.message);h.writeHead(303,{Location:b}),h.end()}catch(p){let b=p instanceof Error&&p.message.trim().length>0?p.message:"Install bundle update failed.";h.writeHead(303,{Location:hT(b)}),h.end()}finally{c=!1,a()}},u=async(h,y)=>{let p=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",b=o(),A=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:b.installVersion,body:`<section class="card">
      <h1>${me(y)}</h1>
      <p>${me(p)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(A)},m=()=>{if(qc.default.existsSync(t))return qc.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return qc.default.writeFileSync(t,h,"utf8"),h},S=v1.default.createServer((h,y)=>{(async()=>{let p=h.url?.split("?")[0]??"/",b=h.method??"GET";if(b==="OPTIONS"){y.writeHead(204,AT),y.end();return}if(!await wv({method:b,pathname:p,request:h,response:y,requestUrl:h.url??"/",storePath:cF(yT.default.dirname(e.layout.configPath)),readBody:$t,sendHtml:Te,renderShell:n})){if(b==="GET"&&p==="/health"){let A=e.controllers.getStatus(),f=o();Se(y,200,{ok:!0,...A,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt,...A1({uid:process.getuid?.(),installDir:e.layout.installDir})});return}if(b==="GET"&&p==="/api/status"){let A=o();Se(y,200,{...e.controllers.getStatus(),linkCode:m(),installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt});return}if(b==="GET"&&p==="/api/traffic"){Se(y,200,{entries:Tl(e.layout)});return}if(b==="DELETE"&&p==="/api/traffic"||b==="POST"&&p==="/api/traffic/clear"){if(bP(e.layout),b==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}Se(y,200,{ok:!0});return}if(b==="GET"&&p==="/api/trace"){Se(y,200,{entries:Vm(e.layout)});return}if(b==="DELETE"&&p==="/api/trace"||b==="POST"&&p==="/api/trace/clear"){if(wP(e.layout),b==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}Se(y,200,{ok:!0});return}if(b==="POST"&&p==="/api/errors/clear"){vP(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(b==="GET"&&p==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let P=await Hs({layout:e.layout,query:f,limit:20});Se(y,200,{chunks:P,query:f});return}Se(y,200,{chunks:$s(e.layout).slice(-50).reverse()});return}if(b==="POST"&&p==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(b==="GET"&&p==="/api/update-status"){let A=await i();Se(y,200,{ok:!0,...A});return}if((b==="GET"||b==="POST")&&p==="/api/update"){await d(y);return}if(b==="GET"&&p==="/"){let A=e.controllers.getStatus(),f=o(),P=Zt(e.layout),w=Km(e.layout.errorLogPath);Te(y,await n({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:_1(h.url??void 0),updateError:w1(h.url??void 0),body:a_({wsConnected:A.wsConnected,lastHeartbeatAt:A.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:P.sets.length,knowledgeChunkCount:$s(e.layout).length,trafficEntryCount:Tl(e.layout).length,wakeError:A.wakeError,errorLogByteSize:w.byteSize,errorLogExists:w.exists})}));return}if(b==="GET"&&p==="/task"){let A=e.controllers.getStatus(),f=o(),P=$(),w=new URL(h.url??"/",`http://127.0.0.1:${43347}`),T=w.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,k=w.searchParams.get("failed")==="1"?w.searchParams.get("error")?.trim()??"Task failed.":null,L=w.searchParams.get("runId");Te(y,await n({title:"Task",activePath:"/task",installVersion:f.installVersion,body:vv({defaultWorkspace:P?.workspace??"",wsConnected:A.wsConnected,flashMessage:T,flashError:k,lastRunId:L})}));return}if(b==="POST"&&p==="/task/dispatch"){let A=await $t(h),f=new URLSearchParams(A),P=f.get("prompt")?.trim()??"",w=f.get("writerAgent")?.trim()??"claude-cli",T=f.get("projectFolder")?.trim()??"",k=await nT({prompt:P,writerAgent:w,...T.length>0?{projectFolderPath:T}:{}}),L=new URLSearchParams;k.ok?L.set("ok","1"):(L.set("failed","1"),k.errorMessage!==void 0&&L.set("error",k.errorMessage.slice(0,240))),k.agentRunId!==void 0&&L.set("runId",k.agentRunId),y.writeHead(303,{Location:`/task?${L.toString()}`}),y.end();return}if(b==="GET"&&p==="/writer-sessions"){let A=o(),f=Of(e.layout,12);Te(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:A.installVersion,updateFlash:_1(h.url??void 0),updateError:w1(h.url??void 0),body:Rv({sessions:f})}));return}if(b==="GET"&&p==="/errors"){let A=o(),f=Km(e.layout.errorLogPath);Te(y,await n({title:"Errors",activePath:"/errors",installVersion:A.installVersion,body:kP({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(b==="GET"&&p==="/status"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),P=ye(e.layout),w=P!==null?Ee(P,12e4):WP(f.lastHeartbeatAt,12e4),T=RP({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:w}),k=o();Te(y,await n({title:"Status",activePath:"/status",installVersion:k.installVersion,body:`${DY({status:f,healthBadge:T,revived:A.searchParams.get("revived")==="1",linkCode:m(),installBundleVersion:k.installBundleVersion,installBundleUpdatedAt:k.installBundleUpdatedAt})}${OP({installDir:e.layout.installDir})}${IP({entries:Vm(e.layout)})}`}));return}if(b==="GET"&&p==="/traffic"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=Tl(e.layout),P=o(),w=f.map(L=>`<tr><td title="${me(L.at)}">${me(ST(L.at))}</td><td>${me(L.direction)}</td><td><code>${me(L.type)}</code></td><td>${me(L.summary)}</td><td>${me(L.action??"")}</td></tr>`).join(""),T=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${w}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',k=A.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Te(y,await n({title:"Traffic",activePath:"/traffic",installVersion:P.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${k}
              ${T}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(b==="GET"&&p==="/projects"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),P=jt(f.installVersion),w=await Uf(e.layout),T=A.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":A.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,k=A.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,L=$(),R=L===null?null:X({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),I=R===null?{}:Object.fromEntries((await Promise.all(w.projects.map(async N=>{let U=await Kv(R,N.id);return[N.id,U?.counts??null]}))).filter(N=>N[1]!==null));Te(y,await n({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:Jv({projects:w.projects,compositionCountsByProjectId:I,cloudAppOrigin:P,syncMessage:w.message,syncOk:w.ok,flashMessage:k,flashError:T})}));return}if(b==="GET"&&p==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",P=$(),w=P===null?null:X({wsUrl:P.wsUrl,pairingToken:P.pairingToken}),T=f.length>0&&w!==null?uo():null;if(T===null||w===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Ge({projectFolderPath:T}),!await cl(w,f,T)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(b==="POST"&&p==="/projects/delete"){let A=await $t(h),f=new URLSearchParams(A).get("projectId")?.trim()??"",P=$(),w=P===null?null:X({wsUrl:P.wsUrl,pairingToken:P.pairingToken});if(w===null||f.length===0){y.writeHead(303,{Location:"/projects?deleteError=1"}),y.end();return}let T=await bb(w,f);y.writeHead(303,{Location:T.ok?"/projects?deleted=1":"/projects?deleteError=1"}),y.end();return}if(b==="GET"&&p==="/project"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=A.searchParams.get("id")?.trim()??"",P=o(),w=jt(P.installVersion),T=await Uf(e.layout),k=wr(T.projects,f);if(k===null){await u(y,"Project not found");return}let L=A.searchParams.get("linked")==="1"?A.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${A.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${A.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:A.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,R=A.searchParams.get("knowledgePromoted"),I=R!==null?`Marked ${R} lesson(s) as promoted in Agent Witch.`:null,N=A.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,U=A.searchParams.get("tab")?.trim()??"harness",G=U==="workflows"||U==="agents"||U==="knowledge"?U:"harness",q=$(),Ke=q===null?null:X({wsUrl:q.wsUrl,pairingToken:q.pairingToken}),H=Ke===null?null:await Kv(Ke,k.id),Ce=0;if(Ke!==null)try{let Kr=await fetch(`${Ke.appOrigin}/api/agent-witch/projects/${encodeURIComponent(k.id)}/knowledge`,{method:"GET",headers:{[$e]:Ke.pairingToken},signal:AbortSignal.timeout(1e4)});if(Kr.ok){let ur=await Kr.json();typeof ur=="object"&&ur!==null&&typeof ur.candidateCount=="number"&&(Ce=ur.candidateCount)}}catch{Ce=0}Te(y,await n({title:k.name,activePath:"/projects",installVersion:P.installVersion,body:lo({project:k,cloudAppOrigin:w,installed:Zt(e.layout),linkedSetSlugs:Yt(k.projectFolderPath),composition:H,knowledgeCandidateCount:Ce,activeTab:G,flashMessage:L??I,flashError:N})}));return}if(b==="POST"&&p==="/projects/pull-bound-harness"){let A=await $t(h),f=await ub({rawBody:A,layout:e.layout});if(f.kind==="not_found"){await u(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let P=o();Te(y,await n({title:f.title,activePath:"/projects",installVersion:P.installVersion,body:f.body}));return}if(b==="POST"&&p==="/projects/link-harness"){let A=await $t(h),f=new URLSearchParams(A),P=f.get("projectId")?.trim()??"",w=await Uf(e.layout),T=wr(w.projects,P);if(T===null){await u(y,"Project not found");return}let k=f.getAll("applySet").map(G=>String(G)),L=Ya({layout:e.layout,projectFolderPath:T.projectFolderPath,setSlugs:k});if(!L.ok){let G=o(),q=jt(G.installVersion);Te(y,await n({title:T.name,activePath:"/projects",installVersion:G.installVersion,body:lo({project:T,cloudAppOrigin:q,installed:Zt(e.layout),linkedSetSlugs:Yt(T.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:L.errorMessage})}));return}let R=$(),I=R===null?null:X({wsUrl:R.wsUrl,pairingToken:R.pairingToken}),N=I===null?!1:await an(I,T.id,L.appliedSetSlugs),U=new URLSearchParams({linked:"1",files:String(L.writtenFileCount),bindingsSynced:N?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(T.id)}&${U.toString()}`}),y.end();return}if(b==="POST"&&p==="/projects/remove-harness-set"){let A=await $t(h),f=await pb({rawBody:A,layout:e.layout});if(f.kind==="not_found"){await u(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let P=o();Te(y,await n({title:f.title,activePath:"/projects",installVersion:P.installVersion,body:f.body}));return}if(b==="POST"&&p==="/project/knowledge/promote-all"){let A=await $t(h),P=new URLSearchParams(A).get("projectId")?.trim()??"",w=await Uf(e.layout),T=wr(w.projects,P);if(T===null){await u(y,"Project not found");return}let k=$(),L=k===null?null:X({wsUrl:k.wsUrl,pairingToken:k.pairingToken}),R=L===null?{ok:!1,promotedCount:0}:await XF(L,T.id),I=new URLSearchParams({tab:"knowledge",...R.ok?{knowledgePromoted:String(R.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(T.id)}&${I.toString()}`}),y.end();return}if(b==="GET"&&p==="/harness"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),P=el(e.layout),w=A.searchParams.get("submitted")==="1",T=w?A.searchParams.get("syncFailed")==="1"?`Local harness updated (${A.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:A.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${A.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":A.searchParams.get("stopped")==="1"?`Reveal stopped. ${P?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:A.searchParams.get("revealed")==="1"?`Reveal found ${P?.sets.length??0} set(s).`:null,k=P?.scanRoots[0]??am(),L=IY(e.layout,{reveal:P,importQuery:A.searchParams.get("import")==="1",justSubmitted:w}),R=jt(f.installVersion);Te(y,await n({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:Gc(fT(e.layout,{cloudAppOrigin:R,reveal:P,scanFolder:k,flashMessage:T,importSectionExpanded:L}))}));return}if(b==="POST"&&p==="/api/harness/pick-folder"){let A=uo();if(A===null){Se(y,200,{cancelled:!0});return}Se(y,200,{path:A});return}if(b==="GET"&&p==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",P=Ja(f);if(P===null){Se(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let w=qc.default.readFileSync(P,"utf8"),T=w.length>P1?`${w.slice(0,P1)}
\u2026 (truncated)`:w;Se(y,200,{content:T})}catch{Se(y,500,{errorMessage:"Could not read file."})}return}if(b==="POST"&&p==="/api/harness/reveal/add-project"){let A=await $t(h),f="";try{let T=JSON.parse(A);typeof T=="object"&&T!==null&&typeof T.projectPath=="string"&&(f=T.projectPath.trim())}catch{Se(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){Se(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let P=el(e.layout),w=BA({reveal:P,projectPath:f});if(w===null||w.sets.length===0){Se(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}um(e.layout,w),Se(y,200,{ok:!0,setCount:w.sets.length});return}if(b==="GET"&&p==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){Se(y,400,{errorMessage:"Choose a folder to scan first."});return}let P=!1;h.on("close",()=>{P=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...AT});let w=GA({scanRoot:f,response:y,shouldAbort:()=>P});um(e.layout,w),y.end();return}if(b==="POST"&&p==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(b==="POST"&&p==="/harness/submit"){let A=el(e.layout);if(A===null){let R=o(),I=jt(R.installVersion);Te(y,await n({title:"Harness",activePath:"/harness",installVersion:R.installVersion,body:Gc(fT(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await $t(h),P=new URLSearchParams(f),w=Vv(P,A),T=VA({layout:e.layout,sets:w});if(!T.ok){let R=o(),I=jt(R.installVersion);Te(y,await n({title:"Harness",activePath:"/harness",installVersion:R.installVersion,body:Gc(fT(e.layout,{cloudAppOrigin:I,reveal:A,flashError:T.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}JA(e.layout);let L=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${T.writtenItemCount??0}${L}`}),y.end();return}if(b==="GET"&&p==="/writer-api"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),P=$()?.writerExecutionBackend??je(void 0),w=Re(e.layout.configPath),T=to(w),k=A.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,L=o();Te(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:L.installVersion,body:Gv({writerExecutionBackend:P,secrets:T,flashMessage:k})}));return}if(b==="POST"&&p==="/writer-api"){let A=await $t(h),f=new URLSearchParams(A),P=f.get("writerExecutionBackend")?.trim()??"cli";tA({configPath:e.layout.configPath,writerExecutionBackend:je(P),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(b==="GET"&&p==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(b==="GET"&&p==="/history"){let A=o();Te(y,await n({title:"History",activePath:"/history",installVersion:A.installVersion,body:Wv({reportsDir:e.layout.reportsDir})}));return}if(b==="GET"&&p==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",P=o(),w=HP({layout:e.layout}),T=BP(w),k=f.length>0?await Hs({layout:e.layout,query:f,limit:20}):$s(e.layout).slice(-50).reverse(),L=k.map(I=>{let N=UP(w,I.id),U=N>0?` \xB7 used in ${N} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${me(I.createdAt)}">${me(ST(I.createdAt))}${I.source?` \xB7 ${me(I.source)}`:""}${U}</div><pre>${me(I.text)}</pre></article>`}).join(""),R=T.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${T.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${me(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Te(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:P.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${me(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${NY(f,k.length)}
            </section>${R}${L}`}));return}b==="POST"&&await $t(h),await u(y,"Not found")}})().catch(p=>{console.error("[agent-witch-local-app]",p),y.writeHead(500),y.end("Internal error")})});return S.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),S.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${yr}`)}),S},Kc=e=>Ff(e).publicKeyRaw});var Bf=l(()=>{"use strict";nO();sO();k1()});var L1={};Ft(L1,{runAgentWitchExternalLiveCli:()=>jY});var bT,C1,zY,jY,E1=l(()=>{"use strict";bT=g(require("node:fs")),C1=g(require("node:path"));Jo();V();re();Bf();re();zY=e=>{let t=C1.default.join(e,"link-code.txt");if(!bT.default.existsSync(t))return null;let r=bT.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},jY=()=>{nt("agent-witch-live");let e=C(),t=M(),r=zY(e),o=Kc(t);Vc({layout:t,controllers:{getStatus:()=>{let n=ye(t);return{wsConnected:Ta(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{Do(e)}}})}});var Hr=v((BMe,x1)=>{"use strict";var W1=["nodebuffer","arraybuffer","fragments"],R1=typeof Blob<"u";R1&&W1.push("blob");x1.exports={BINARY_TYPES:W1,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:R1,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Jc=v((GMe,Gf)=>{"use strict";var{EMPTY_BUFFER:$Y}=Hr(),PT=Buffer[Symbol.species];function HY(e,t){if(e.length===0)return $Y;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new PT(r.buffer,r.byteOffset,o):r}function I1(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function O1(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function FY(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function _T(e){if(_T.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new PT(e):ArrayBuffer.isView(e)?t=new PT(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),_T.readOnly=!1),t}Gf.exports={concat:HY,mask:I1,toArrayBuffer:FY,toBuffer:_T,unmask:O1};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Gf.exports.mask=function(t,r,o,n,s){s<48?I1(t,r,o,n,s):e.mask(t,r,o,n,s)},Gf.exports.unmask=function(t,r){t.length<32?O1(t,r):e.unmask(t,r)}}catch{}});var D1=v((qMe,N1)=>{"use strict";var M1=Symbol("kDone"),wT=Symbol("kRun"),vT=class{constructor(t){this[M1]=()=>{this.pending--,this[wT]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[wT]()}[wT](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[M1])}}};N1.exports=vT});var bi=v((VMe,H1)=>{"use strict";var Yc=require("zlib"),z1=Jc(),UY=D1(),{kStatusCode:j1}=Hr(),BY=Buffer[Symbol.species],GY=Buffer.from([0,0,255,255]),Vf=Symbol("permessage-deflate"),Fr=Symbol("total-length"),Si=Symbol("callback"),vo=Symbol("buffers"),Ai=Symbol("error"),qf,TT=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!qf){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;qf=new UY(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Si];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){qf.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){qf.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Yc.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Yc.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Vf]=this,this._inflate[Fr]=0,this._inflate[vo]=[],this._inflate.on("error",VY),this._inflate.on("data",$1)}this._inflate[Si]=o,this._inflate.write(t),r&&this._inflate.write(GY),this._inflate.flush(()=>{let s=this._inflate[Ai];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=z1.concat(this._inflate[vo],this._inflate[Fr]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Fr]=0,this._inflate[vo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Yc.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Yc.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Fr]=0,this._deflate[vo]=[],this._deflate.on("data",qY)}this._deflate[Si]=o,this._deflate.write(t),this._deflate.flush(Yc.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=z1.concat(this._deflate[vo],this._deflate[Fr]);r&&(s=new BY(s.buffer,s.byteOffset,s.length-4)),this._deflate[Si]=null,this._deflate[Fr]=0,this._deflate[vo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};H1.exports=TT;function qY(e){this[vo].push(e),this[Fr]+=e.length}function $1(e){if(this[Fr]+=e.length,this[Vf]._maxPayload<1||this[Fr]<=this[Vf]._maxPayload){this[vo].push(e);return}this[Ai]=new RangeError("Max payload size exceeded"),this[Ai].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Ai][j1]=1009,this.removeListener("data",$1),this.reset()}function VY(e){if(this[Vf]._inflate=null,this[Ai]){this[Si](this[Ai]);return}e[j1]=1007,this[Si](e)}});var Pi=v((KMe,Kf)=>{"use strict";var{isUtf8:F1}=require("buffer"),{hasBlob:KY}=Hr(),JY=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function YY(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function kT(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function XY(e){return KY&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Kf.exports={isBlob:XY,isValidStatusCode:YY,isValidUTF8:kT,tokenChars:JY};if(F1)Kf.exports.isValidUTF8=function(e){return e.length<24?kT(e):F1(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Kf.exports.isValidUTF8=function(t){return t.length<32?kT(t):e(t)}}catch{}});var RT=v((JMe,J1)=>{"use strict";var{Writable:ZY}=require("stream"),U1=bi(),{BINARY_TYPES:QY,EMPTY_BUFFER:B1,kStatusCode:eX,kWebSocket:tX}=Hr(),{concat:CT,toArrayBuffer:rX,unmask:oX}=Jc(),{isValidStatusCode:nX,isValidUTF8:G1}=Pi(),Jf=Buffer[Symbol.species],bt=0,q1=1,V1=2,K1=3,LT=4,ET=5,Yf=6,WT=class extends ZY{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||QY[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[tX]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=bt}_write(t,r,o){if(this._opcode===8&&this._state==bt)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new Jf(o.buffer,o.byteOffset+t,o.length-t),new Jf(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new Jf(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case bt:this.getInfo(t);break;case q1:this.getPayloadLength16(t);break;case V1:this.getPayloadLength64(t);break;case K1:this.getMask();break;case LT:this.getData(t);break;case ET:case Yf:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[U1.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=q1:this._payloadLength===127?this._state=V1:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=K1:this._state=LT}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=LT}getData(t){let r=B1;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&oX(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=ET,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[U1.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===bt&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=bt;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=CT(o,r):this._binaryType==="arraybuffer"?n=rX(CT(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=bt):(this._state=Yf,setImmediate(()=>{this.emit("message",n,!0),this._state=bt,this.startLoop(t)}))}else{let n=CT(o,r);if(!this._skipUTF8Validation&&!G1(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===ET||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=bt):(this._state=Yf,setImmediate(()=>{this.emit("message",n,!1),this._state=bt,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,B1),this.end();else{let o=t.readUInt16BE(0);if(!nX(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new Jf(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!G1(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=bt;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=bt):(this._state=Yf,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=bt,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[eX]=n,i}};J1.exports=WT});var OT=v((XMe,Z1)=>{"use strict";var{Duplex:YMe}=require("stream"),{randomFillSync:sX}=require("crypto"),{types:{isUint8Array:iX}}=require("util"),Y1=bi(),{EMPTY_BUFFER:aX,kWebSocket:lX,NOOP:cX}=Hr(),{isBlob:_i,isValidStatusCode:dX}=Pi(),{mask:X1,toBuffer:zn}=Jc(),Pt=Symbol("kByteLength"),uX=Buffer.alloc(4),Xf=8*1024,jn,wi=Xf,Ht=0,pX=1,mX=2,xT=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Ht,this.onerror=cX,this[lX]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||uX,r.generateMask?r.generateMask(o):(wi===Xf&&(jn===void 0&&(jn=Buffer.alloc(Xf)),sX(jn,0,Xf),wi=0),o[0]=jn[wi++],o[1]=jn[wi++],o[2]=jn[wi++],o[3]=jn[wi++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[Pt]!==void 0?a=r[Pt]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(X1(t,o,d,s,a),[d]):(X1(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=aX;else{if(typeof t!="number"||!dX(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(iX(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[Pt]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Ht?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):_i(t)?(n=t.size,s=!1):(t=zn(t),n=t.length,s=zn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Pt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};_i(t)?this._state!==Ht?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Ht?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):_i(t)?(n=t.size,s=!1):(t=zn(t),n=t.length,s=zn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Pt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};_i(t)?this._state!==Ht?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Ht?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[Y1.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):_i(t)?(a=t.size,c=!1):(t=zn(t),a=t.length,c=zn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[Pt]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};_i(t)?this._state!==Ht?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Ht?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[Pt],this._state=mX,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(IT,this,a,n);return}this._bufferedBytes-=o[Pt];let i=zn(s);r?this.dispatch(i,r,o,n):(this._state=Ht,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(gX,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[Y1.extensionName];this._bufferedBytes+=o[Pt],this._state=pX,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");IT(this,c,n);return}this._bufferedBytes-=o[Pt],this._state=Ht,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Ht&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][Pt],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][Pt],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};Z1.exports=xT;function IT(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function gX(e,t,r){IT(e,t,r),e.onerror(t)}});var aU=v((ZMe,iU)=>{"use strict";var{kForOnEventAttribute:Xc,kListener:MT}=Hr(),Q1=Symbol("kCode"),eU=Symbol("kData"),tU=Symbol("kError"),rU=Symbol("kMessage"),oU=Symbol("kReason"),vi=Symbol("kTarget"),nU=Symbol("kType"),sU=Symbol("kWasClean"),Ur=class{constructor(t){this[vi]=null,this[nU]=t}get target(){return this[vi]}get type(){return this[nU]}};Object.defineProperty(Ur.prototype,"target",{enumerable:!0});Object.defineProperty(Ur.prototype,"type",{enumerable:!0});var $n=class extends Ur{constructor(t,r={}){super(t),this[Q1]=r.code===void 0?0:r.code,this[oU]=r.reason===void 0?"":r.reason,this[sU]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[Q1]}get reason(){return this[oU]}get wasClean(){return this[sU]}};Object.defineProperty($n.prototype,"code",{enumerable:!0});Object.defineProperty($n.prototype,"reason",{enumerable:!0});Object.defineProperty($n.prototype,"wasClean",{enumerable:!0});var Ti=class extends Ur{constructor(t,r={}){super(t),this[tU]=r.error===void 0?null:r.error,this[rU]=r.message===void 0?"":r.message}get error(){return this[tU]}get message(){return this[rU]}};Object.defineProperty(Ti.prototype,"error",{enumerable:!0});Object.defineProperty(Ti.prototype,"message",{enumerable:!0});var Zc=class extends Ur{constructor(t,r={}){super(t),this[eU]=r.data===void 0?null:r.data}get data(){return this[eU]}};Object.defineProperty(Zc.prototype,"data",{enumerable:!0});var fX={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[Xc]&&n[MT]===t&&!n[Xc])return;let o;if(e==="message")o=function(s,i){let a=new Zc("message",{data:i?s:s.toString()});a[vi]=this,Zf(t,this,a)};else if(e==="close")o=function(s,i){let a=new $n("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[vi]=this,Zf(t,this,a)};else if(e==="error")o=function(s){let i=new Ti("error",{error:s,message:s.message});i[vi]=this,Zf(t,this,i)};else if(e==="open")o=function(){let s=new Ur("open");s[vi]=this,Zf(t,this,s)};else return;o[Xc]=!!r[Xc],o[MT]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[MT]===t&&!r[Xc]){this.removeListener(e,r);break}}};iU.exports={CloseEvent:$n,ErrorEvent:Ti,Event:Ur,EventTarget:fX,MessageEvent:Zc};function Zf(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Qf=v((QMe,lU)=>{"use strict";var{tokenChars:Qc}=Pi();function cr(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function hX(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,u=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(u===-1&&Qc[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let h=e.slice(c,u);d===44?(cr(t,h,r),r=Object.create(null)):i=h,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(u===-1&&Qc[d]===1)c===-1&&(c=m);else if(d===32||d===9)u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m),cr(r,e.slice(c,u),!0),d===44&&(cr(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)a=e.slice(c,m),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if(Qc[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if(Qc[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,u=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(u===-1&&Qc[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))u===-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let h=e.slice(c,u);o&&(h=h.replace(/\\/g,""),o=!1),cr(r,a,h),d===44&&(cr(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=m);let S=e.slice(c,u);return i===void 0?cr(t,S,r):(a===void 0?cr(r,S,!0):o?cr(r,a,S.replace(/\\/g,"")):cr(r,a,S),cr(t,i,r)),t}function yX(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}lU.exports={format:yX,parse:hX}});var oh=v((rNe,bU)=>{"use strict";var SX=require("events"),AX=require("https"),bX=require("http"),uU=require("net"),PX=require("tls"),{randomBytes:_X,createHash:wX}=require("crypto"),{Duplex:eNe,Readable:tNe}=require("stream"),{URL:NT}=require("url"),To=bi(),vX=RT(),TX=OT(),{isBlob:kX}=Pi(),{BINARY_TYPES:cU,CLOSE_TIMEOUT:CX,EMPTY_BUFFER:eh,GUID:LX,kForOnEventAttribute:DT,kListener:EX,kStatusCode:WX,kWebSocket:ke,NOOP:pU}=Hr(),{EventTarget:{addEventListener:RX,removeEventListener:xX}}=aU(),{format:IX,parse:OX}=Qf(),{toBuffer:MX}=Jc(),mU=Symbol("kAborted"),zT=[8,13],Br=["CONNECTING","OPEN","CLOSING","CLOSED"],NX=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,ee=class e extends SX{constructor(t,r,o){super(),this._binaryType=cU[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=eh,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),gU(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){cU.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new vX({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new TX(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[ke]=this,s[ke]=this,t[ke]=this,n.on("conclude",jX),n.on("drain",$X),n.on("error",HX),n.on("message",FX),n.on("ping",UX),n.on("pong",BX),s.onerror=GX,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",yU),t.on("data",rh),t.on("end",SU),t.on("error",AU),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[To.extensionName]&&this._extensions[To.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){mt(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,hU(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){jT(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||eh,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){jT(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||eh,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){jT(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[To.extensionName]||(n.compress=!1),this._sender.send(t||eh,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){mt(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(ee,"CONNECTING",{enumerable:!0,value:Br.indexOf("CONNECTING")});Object.defineProperty(ee.prototype,"CONNECTING",{enumerable:!0,value:Br.indexOf("CONNECTING")});Object.defineProperty(ee,"OPEN",{enumerable:!0,value:Br.indexOf("OPEN")});Object.defineProperty(ee.prototype,"OPEN",{enumerable:!0,value:Br.indexOf("OPEN")});Object.defineProperty(ee,"CLOSING",{enumerable:!0,value:Br.indexOf("CLOSING")});Object.defineProperty(ee.prototype,"CLOSING",{enumerable:!0,value:Br.indexOf("CLOSING")});Object.defineProperty(ee,"CLOSED",{enumerable:!0,value:Br.indexOf("CLOSED")});Object.defineProperty(ee.prototype,"CLOSED",{enumerable:!0,value:Br.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(ee.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(ee.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[DT])return t[EX];return null},set(t){for(let r of this.listeners(e))if(r[DT]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[DT]:!0})}})});ee.prototype.addEventListener=RX;ee.prototype.removeEventListener=xX;bU.exports=ee;function gU(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:CX,protocolVersion:zT[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!zT.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${zT.join(", ")})`);let s;if(t instanceof NT)s=t;else try{s=new NT(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let p=new SyntaxError(c);if(e._redirects===0)throw p;th(e,p);return}let d=i?443:80,u=_X(16).toString("base64"),m=i?AX.request:bX.request,S=new Set,h;if(n.createConnection=n.createConnection||(i?zX:DX),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new To({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=IX({[To.extensionName]:h.offer()})),r.length){for(let p of r){if(typeof p!="string"||!NX.test(p)||S.has(p))throw new SyntaxError("An invalid or duplicated subprotocol was specified");S.add(p)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let p=n.path.split(":");n.socketPath=p[0],n.path=p[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let p=o&&o.headers;if(o={...o,headers:{}},p)for(let[b,A]of Object.entries(p))o.headers[b.toLowerCase()]=A}else if(e.listenerCount("redirect")===0){let p=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!p||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,p||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=m(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=m(n);n.timeout&&y.on("timeout",()=>{mt(e,y,"Opening handshake has timed out")}),y.on("error",p=>{y===null||y[mU]||(y=e._req=null,th(e,p))}),y.on("response",p=>{let b=p.headers.location,A=p.statusCode;if(b&&n.followRedirects&&A>=300&&A<400){if(++e._redirects>n.maxRedirects){mt(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new NT(b,t)}catch{let w=new SyntaxError(`Invalid URL: ${b}`);th(e,w);return}gU(e,f,r,o)}else e.emit("unexpected-response",y,p)||mt(e,y,`Unexpected server response: ${p.statusCode}`)}),y.on("upgrade",(p,b,A)=>{if(e.emit("upgrade",p),e.readyState!==ee.CONNECTING)return;y=e._req=null;let f=p.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){mt(e,b,"Invalid Upgrade header");return}let P=wX("sha1").update(u+LX).digest("base64");if(p.headers["sec-websocket-accept"]!==P){mt(e,b,"Invalid Sec-WebSocket-Accept header");return}let w=p.headers["sec-websocket-protocol"],T;if(w!==void 0?S.size?S.has(w)||(T="Server sent an invalid subprotocol"):T="Server sent a subprotocol but none was requested":S.size&&(T="Server sent no subprotocol"),T){mt(e,b,T);return}w&&(e._protocol=w);let k=p.headers["sec-websocket-extensions"];if(k!==void 0){if(!h){mt(e,b,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let L;try{L=OX(k)}catch{mt(e,b,"Invalid Sec-WebSocket-Extensions header");return}let R=Object.keys(L);if(R.length!==1||R[0]!==To.extensionName){mt(e,b,"Server indicated an extension that was not requested");return}try{h.accept(L[To.extensionName])}catch{mt(e,b,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[To.extensionName]=h}e.setSocket(b,A,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function th(e,t){e._readyState=ee.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function DX(e){return e.path=e.socketPath,uU.connect(e)}function zX(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=uU.isIP(e.host)?"":e.host),PX.connect(e)}function mt(e,t,r){e._readyState=ee.CLOSING;let o=new Error(r);Error.captureStackTrace(o,mt),t.setHeader?(t[mU]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(th,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function jT(e,t,r){if(t){let o=kX(t)?t.size:MX(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${Br[e.readyState]})`);process.nextTick(r,o)}}function jX(e,t){let r=this[ke];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[ke]!==void 0&&(r._socket.removeListener("data",rh),process.nextTick(fU,r._socket),e===1005?r.close():r.close(e,t))}function $X(){let e=this[ke];e.isPaused||e._socket.resume()}function HX(e){let t=this[ke];t._socket[ke]!==void 0&&(t._socket.removeListener("data",rh),process.nextTick(fU,t._socket),t.close(e[WX])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function dU(){this[ke].emitClose()}function FX(e,t){this[ke].emit("message",e,t)}function UX(e){let t=this[ke];t._autoPong&&t.pong(e,!this._isServer,pU),t.emit("ping",e)}function BX(e){this[ke].emit("pong",e)}function fU(e){e.resume()}function GX(e){let t=this[ke];t.readyState!==ee.CLOSED&&(t.readyState===ee.OPEN&&(t._readyState=ee.CLOSING,hU(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function hU(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function yU(){let e=this[ke];if(this.removeListener("close",yU),this.removeListener("data",rh),this.removeListener("end",SU),e._readyState=ee.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[ke]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",dU),e._receiver.on("finish",dU))}function rh(e){this[ke]._receiver.write(e)||this.pause()}function SU(){let e=this[ke];e._readyState=ee.CLOSING,e._receiver.end(),this.end()}function AU(){let e=this[ke];this.removeListener("error",AU),this.on("error",pU),e&&(e._readyState=ee.CLOSING,this.destroy())}});var vU=v((nNe,wU)=>{"use strict";var oNe=oh(),{Duplex:qX}=require("stream");function PU(e){e.emit("close")}function VX(){!this.destroyed&&this._writableState.finished&&this.destroy()}function _U(e){this.removeListener("error",_U),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function KX(e,t){let r=!0,o=new qX({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(PU,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(PU,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",VX),o.on("error",_U),o}wU.exports=KX});var $T=v((sNe,TU)=>{"use strict";var{tokenChars:JX}=Pi();function YX(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&JX[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}TU.exports={parse:YX}});var xU=v((aNe,RU)=>{"use strict";var XX=require("events"),nh=require("http"),{Duplex:iNe}=require("stream"),{createHash:ZX}=require("crypto"),kU=Qf(),Hn=bi(),QX=$T(),eZ=oh(),{CLOSE_TIMEOUT:tZ,GUID:rZ,kWebSocket:oZ}=Hr(),nZ=/^[+/0-9A-Za-z]{22}==$/,CU=0,LU=1,WU=2,HT=class extends XX{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:tZ,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:eZ,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=nh.createServer((o,n)=>{let s=nh.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=sZ(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=CU}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===WU){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(ed,this);return}if(t&&this.once("close",t),this._state!==LU)if(this._state=LU,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(ed,this):process.nextTick(ed,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{ed(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",EU);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Fn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Fn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!nZ.test(s)){Fn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Fn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){td(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=QX.parse(c)}catch{Fn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&u!==void 0){let S=new Hn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=kU.parse(u);h[Hn.extensionName]&&(S.accept(h[Hn.extensionName]),m[Hn.extensionName]=S)}catch{Fn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let S={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(S,(h,y,p,b)=>{if(!h)return td(r,y||401,p,b);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(S))return td(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[oZ])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>CU)return td(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${ZX("sha1").update(r+rZ).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),u._protocol=m)}if(t[Hn.extensionName]){let m=t[Hn.extensionName].params,S=kU.format({[Hn.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${S}`),u._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",EU),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(ed,this)})),a(u,n)}};RU.exports=HT;function sZ(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function ed(e){e._state=WU,e.emit("close")}function EU(){this.destroy()}function td(e,t,r,o){r=r||nh.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${nh.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Fn(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Fn),e.emit("wsClientError",i,r,t)}else td(r,o,n,s)}});var iZ,aZ,lZ,cZ,dZ,uZ,IU,pZ,rd,OU=l(()=>{iZ=g(vU(),1),aZ=g(Qf(),1),lZ=g(bi(),1),cZ=g(RT(),1),dZ=g(OT(),1),uZ=g($T(),1),IU=g(oh(),1),pZ=g(xU(),1),rd=IU.default});var FT,MU=l(()=>{"use strict";FT=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var mZ,UT,NU=l(()=>{"use strict";sp();MU();mZ=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",UT=(e={})=>{let t=e.env??process.env,r=FT(t[op]),o=FT(t[np]);return{mode:mZ(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var DU=l(()=>{"use strict";sp()});var zU=l(()=>{"use strict";NU();DU()});var BT=l(()=>{"use strict"});var Gr,od=l(()=>{"use strict";Gr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var ki,Un,jU,fZ,GT,qT,$U,HU,VT,FU,nd,KT=l(()=>{"use strict";ki=g(require("node:fs")),Un=g(require("node:os")),jU=g(require("node:path"));BT();od();fZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GT=(e=Un.default.hostname())=>jU.default.join(Un.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),qT=e=>{if(!ki.default.existsSync(e))return null;try{let t=JSON.parse(ki.default.readFileSync(e,"utf8"));return!fZ(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},$U=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},HU=(e,t)=>{ki.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},VT=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??GT(),o=qT(r);if(o!==null&&o.pid!==process.pid&&Gr(o.pid)&&$U(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Un.default.hostname(),macOsUsername:Un.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return HU(r,n),{ok:!0}},FU=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??GT(),o=qT(r);return o!==null&&o.pid!==process.pid&&Gr(o.pid)&&$U(o)?{ok:!1}:(HU(r,{hostname:Un.default.hostname(),macOsUsername:Un.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},nd=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??GT();qT(r)?.pid===process.pid&&ki.default.existsSync(r)&&ki.default.unlinkSync(r)}});var JT,sd,hZ,yZ,SZ,AZ,YT,UU=l(()=>{"use strict";JT=require("node:child_process"),sd=g(require("node:path"));od();Yu();hZ=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),yZ=(e,t)=>{if(hZ(e)||!/\bnode\b/.test(e))return!1;let r=sd.default.resolve(t),o=sd.default.join(r,"app",ta),n=sd.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===ta||i==="agent-witch.ts")return e.includes(r);try{let a=sd.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},SZ=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,JT.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},AZ=(e,t,r)=>{let o=SZ(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||yZ(d,t)&&n.push(c)}return n},YT=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,JT.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=AZ(r,e.installDir,t),n=[];for(let s of o)if(Gr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var id,ad,BU,bZ,XT,GU=l(()=>{"use strict";id=g(require("node:fs")),ad=g(require("node:path"));De();BU=(e,t)=>{!id.default.existsSync(e)||id.default.existsSync(t)||(id.default.mkdirSync(ad.default.dirname(t),{recursive:!0}),id.default.renameSync(e,t))},bZ=e=>{if(e.profileEmail===null)return;let t=ad.default.join(e.installDir,wt);BU(ad.default.join(t,Jn),e.mainLogPath),BU(ad.default.join(t,Yn),e.errorLogPath)},XT=e=>{let t=M();e!==void 0&&t.installDir!==e||bZ(t)}});var qU=l(()=>{"use strict";_l();Gm();Gm();!st()&&Ho(__agentWitchImportMetaUrl)&&(async()=>{nt("agent-witch-wake-server");let e=await un(),t=hr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var VU=l(()=>{"use strict";qU()});var KU=l(()=>{"use strict";ul()});var ZT,JU=l(()=>{"use strict";BT();VU();KT();KU();ZT=async(e={})=>{let t=e.skipInProcessBridge?null:await Bm();km();let r=setInterval(()=>{km()},6e4),o=setInterval(()=>{if(!FU().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var ld,sh,wZ,YU,XU,ih,ZU,QU,QT,eB,ah,tB=l(()=>{"use strict";ld=g(require("node:fs")),sh=g(require("node:path")),wZ="pending-run-inputs.json",YU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),XU=e=>{let t=e.profileEmail?sh.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return sh.default.join(t,wZ)},ih=e=>{let t=XU(e);if(!ld.default.existsSync(t))return{};try{let r=JSON.parse(ld.default.readFileSync(t,"utf8"));return YU(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!YU(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},ZU=(e,t)=>{let r=XU(e);ld.default.mkdirSync(sh.default.dirname(r),{recursive:!0}),ld.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},QU=e=>Object.values(ih(e)),QT=(e,t)=>ih(e)[t]!==void 0,eB=(e,t)=>{let r=ih(e);r[t.agentRunId]=t,ZU(e,r)},ah=(e,t)=>{let r=ih(e);delete r[t],ZU(e,r)}});var lh=l(()=>{"use strict";le()});var rB=l(()=>{"use strict";le()});var ch=l(()=>{"use strict";le()});var dh=l(()=>{"use strict";le()});var cd=l(()=>{"use strict";le()});var vZ,TZ,dd,ek=l(()=>{"use strict";kt();lh();rB();ch();dh();cd();vZ={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},TZ={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},dd=e=>{if(!ge(e.writerAgent))return"the selected writer";let t=at(e.writerAgent);if(je(e.writerExecutionBackend)==="api"&&t!==null){let r=Je(Re(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Ea(t,r.model);return`${TZ[t]} model ${o}`}}return vZ[e.writerAgent]}});var kZ,CZ,oB,nB,sB=l(()=>{"use strict";kZ=/"input_tokens"\s*:\s*(\d+)/,CZ=/"output_tokens"\s*:\s*(\d+)/,oB=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},nB=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=oB(kZ.exec(t)),o=oB(CZ.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var uh=l(()=>{"use strict";Qt()});var ud,ph,LZ,tk,iB,aB,lB,rk,cB=l(()=>{"use strict";ud=g(require("node:fs")),ph=g(require("node:path"));uh();LZ="run-completion-outbox.json",tk=e=>{let t=e.profileEmail?ph.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return ph.default.join(t,LZ)},iB=e=>{let t=tk(e);if(!ud.default.existsSync(t))return[];try{let r=JSON.parse(ud.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},aB=(e,t)=>{ud.default.mkdirSync(ph.default.dirname(tk(e)),{recursive:!0}),ud.default.writeFileSync(tk(e),JSON.stringify(t,null,2),"utf8")},lB=(e,t)=>{let r=[...iB(e).filter(o=>o.runId!==t.runId),t];aB(e,r)},rk=async e=>{if(e.cloudApi===null)return;let t=iB(e.layout);if(t.length===0)return;let r=[];for(let o of t)await sl(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);aB(e.layout,r)}});var dB=l(()=>{"use strict"});var ok,pd,WZ,Bn,uB=l(()=>{"use strict";dB();ok=new Map,pd=e=>{let t=ok.get(e);t!==void 0&&(clearInterval(t),ok.delete(e))},WZ=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},Bn=(e,t,r,o={})=>{pd(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){pd(t);return}let i=o.onTick?.()??{};WZ(e,t,n,i)};s(),ok.set(t,setInterval(s,15e3))}});var pB=l(()=>{"use strict";Qt()});var mB,gB=l(()=>{"use strict";pB();mB=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Ye(t)}});var nk,md,qr,sk,dr,fB,mh=l(()=>{"use strict";nk=new Set,md=new Map,qr=(e,t)=>{if(t.length===0)return;let r=md.get(e)??[];r.push(t),md.set(e,r)},sk=e=>{nk.add(e);let t=md.get(e)??[];return md.delete(e),t},dr=e=>nk.has(e),fB=e=>{nk.delete(e),md.delete(e)}});var Ci,hB,yB,SB=l(()=>{"use strict";Ci=g(require("node:path")),hB=require("node:url");$o();yB=()=>{if(st()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Ci.default.dirname(Ci.default.resolve(e)):Ci.default.dirname(Ci.default.resolve(__filename))}return Ci.default.dirname((0,hB.fileURLToPath)(__agentWitchImportMetaUrl))}});var AB,bB,PB,_B,rt,Li,wB,vB,Ei,ik,ak,lk,TB,ck,kB,gh=l(()=>{"use strict";AB=require("node:crypto"),bB=g(require("node:fs")),PB=g(require("node:path")),_B=require("node:url");od();$o();SB();rt=new Map,wB=async()=>{if(Li!==void 0)return Li;try{if(st()){let e=yB(),t=PB.default.join(e,"deps","node-pty","lib","index.js");if(bB.default.existsSync(t)){let r=await import((0,_B.pathToFileURL)(t).href);return Li=r,r}}return Li=await import("node-pty"),Li}catch{return Li=null,null}},vB=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Ei=(e,t,r)=>{let o=rt.get(e);if(o!==void 0){rt.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},ik=(e,t)=>{let r=rt.get(e);return r===void 0?!1:(r.pty.write(t),!0)},ak=(e,t,r)=>{let o=rt.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},lk=e=>{for(let t of rt.values())if(!(t.mode!=="agent"||t.runId!==e))return Gr(t.pty.pid);return!1},TB=e=>{for(let[t,r]of rt.entries())if(!(r.mode!=="agent"||r.runId!==e)){rt.delete(t);try{r.pty.kill()}catch{}return!0}return!1},ck=async e=>{let t=await wB();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;rt.get(e.shellSessionId)!==void 0&&Ei(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return rt.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{vB(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{rt.get(e.shellSessionId)?.pty===n&&(rt.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},kB=async e=>{let t=e.shellSessionId??(0,AB.randomUUID)(),r=await wB();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return rt.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{vB(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{rt.get(t)?.pty===o&&(rt.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var fh,CB,LB=l(()=>{"use strict";fh="[[AWAITING_INPUT]]",CB=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",fh,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var gd,EB,hh=l(()=>{"use strict";LB();gd=e=>{let t=e.indexOf(fh);if(t<0)return null;let o=e.slice(t+fh.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},EB=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",CB].join(`
`)});var WB,RB=l(()=>{"use strict";mh();gh();hh();WB=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(dr(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}qr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await kB({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=gd(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var IB,OB,MB,xB,Vr,yh=l(()=>{"use strict";IB=require("node:child_process"),OB=g(require("node:fs")),MB=g(require("node:path"));Yu();xB=12e4,Vr=(e,t)=>{let r=MB.default.join(e,"app",WE,"ensure-writer.sh");return OB.default.existsSync(r)?new Promise((o,n)=>{let s=(0,IB.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},a=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String(xB/1e3)}s`))},xB);s.on("error",c=>{clearTimeout(a),n(c)}),s.on("close",c=>{if(clearTimeout(a),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var NB,Gn,hd,Sh,dk,fd,Ah,bh,uk,pk,RZ,Wi,xZ,IZ,mk,gk=l(()=>{"use strict";NB=require("node:child_process");kt();yh();ch();lh();cd();dh();Gn=new Map,hd=e=>e==="cursor"||e==="antigravity",Sh=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",dk=e=>Gn.get(e)?.warmed===!0,fd=e=>{let t=Gn.get(e);Gn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Ah=e=>Gn.get(e)?.conversationStarted===!0,bh=e=>{let t=Gn.get(e);Gn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},uk=e=>{Gn.delete(e)},pk=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",RZ={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Wi=e=>`${RZ[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,xZ=(e,t,r,o)=>new Promise(n=>{let s=bp(t,r),i=[],a=(0,NB.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),o?.(u)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),IZ=(e,t)=>{let r=Wi(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},mk=async e=>{if(!ge(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&je(e.runConfig.writerExecutionBackend)==="api"){let r=at(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Re(e.runConfig.layout.configPath);return Je(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),fd(e.writerAgent),{exitCode:0,output:Wi(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Vr(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}hd(e.writerAgent)&&fd(e.writerAgent);let t=await xZ(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?IZ(e.writerAgent,t.output):Wi(e.writerAgent)}}});var qn,fk=l(()=>{"use strict";qn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var DB,OZ,MZ,zB,NZ,hk,jB=l(()=>{"use strict";fk();DB=/you(?:'|')ve hit your session limit/i,OZ=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],MZ=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,zB=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},NZ=e=>{let t=MZ.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},hk=e=>{let t=e.trim();if(t.length===0)return null;if(DB.test(t))return{code:qn.SESSION_LIMIT,resetHint:NZ(t),matchedLine:zB(t,DB)};for(let r of OZ)if(r.test(t))return{code:qn.PROVIDER_QUOTA,resetHint:null,matchedLine:zB(t,r)};return null}});var Ph,_h,yk,Sk=l(()=>{"use strict";Ph="[[AGENT_RUN_WRITER_EXECUTION]]",_h="cli-writer-api-key-missing",yk="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var Ak=l(()=>{"use strict";Sk()});var $B=l(()=>{"use strict";Ak()});var wh=l(()=>{"use strict";fk();jB();Sk();Ak();$B()});var vh,HB=l(()=>{"use strict";vh={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var FB,UB=l(()=>{"use strict";FB="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var BB,GB=l(()=>{"use strict";wh();UB();BB=e=>e.code===qn.SESSION_LIMIT?FB:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var qB,VB=l(()=>{"use strict";wh();HB();GB();qB=e=>{let t=hk(e.output);return t!==null?{status:vh.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:BB(t)}:{status:e.exitCode===0?vh.COMPLETED:vh.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var bk,gze,KB=l(()=>{"use strict";bk={OPEN:"open",APPROVAL:"approval"},gze=bk.APPROVAL});var Ri,Th,JB,jZ,YB,XB,ZB,yd,Pk,_k=l(()=>{"use strict";Ri=g(require("node:fs")),Th=g(require("node:path")),JB="runs",jZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),YB=e=>{let t=e.profileEmail!==null?Th.default.join(e.installDir,"profiles",e.profileEmail,JB):Th.default.join(e.installDir,JB);return Ri.default.mkdirSync(t,{recursive:!0}),t},XB=(e,t)=>Th.default.join(YB(e),`${t}.json`),ZB=(e,t)=>{Ri.default.writeFileSync(XB(e,t.id),JSON.stringify(t,null,2))},yd=(e,t)=>{let r=XB(e,t);if(!Ri.default.existsSync(r))return null;try{let o=JSON.parse(Ri.default.readFileSync(r,"utf8"));return!jZ(o)||typeof o.id!="string"?null:o}catch{return null}},Pk=e=>{let t=YB(e),r=Ri.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=yd(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var $Z,QB,eG=l(()=>{"use strict";VB();KB();_k();$Z=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=qB({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:bk.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},QB=(e,t)=>{let r=$Z(t);return ZB(e,r),r}});var tG=l(()=>{"use strict";zf()});var rG,oG=l(()=>{"use strict";wh();rG=()=>[Ph,`agentRunWriterExecutionBackend=${_h}`,`agentRunWriterExecutionReasonCode=${yk}`].join(`
`)});var ko,kh=l(()=>{"use strict";ko=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var wk,HZ,FZ,nG,sG=l(()=>{"use strict";wk=e=>e.toLocaleString("en-US"),HZ=e=>e<.01?e.toFixed(4):e.toFixed(3),FZ=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${HZ(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${wk(e.inputTokens)} in / ${wk(e.outputTokens)} out (${wk(e.totalTokens)} total)`,t].join(`
`)},nG=(e,t)=>{if(t===void 0)return e;let r=FZ(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var iG=l(()=>{"use strict";le()});var lG,Sd,Ae,vk,Ch,aG,UZ,BZ,cG,dG,uG,Ad,Tk,kk,Ck,pG,GZ,_t,bd,Co,mG,qZ,VZ,Lh,Lk,Ek,Wk,gG=l(()=>{"use strict";lG=require("node:child_process");le();kt();tB();jc();ek();sB();La();cB();uh();uB();od();gB();mh();gh();hh();RB();gk();eG();tG();oG();kh();sG();cs();iG();cd();ia();hh();Sd=new Map,Ae=new Map,vk=new Set,Ch=new Map,aG=e=>{e!==void 0&&!Ch.has(e)&&Ch.set(e,Date.now())},UZ=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(dr(t)){_t(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}qr(t,n)},BZ=(e,t,r,o,n)=>{if(!oA(e,n))return;let s=`${rG()}
`;UZ(t,r,o,s);let i=Ae.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},cG=130,dG=`

Stopped by user.`,uG=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:ko(e)},Ad=null,Tk=e=>{Ad=e},kk=(e,t)=>{if(Ad===null)return;let r=Cv(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||rb(Ad,t,r)},Ck=async e=>{await rk({layout:e,cloudApi:Ad})},pG=e=>{let t=Sd.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Gr(t.pid)},GZ=e=>fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),_t=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},bd=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=ns(s),c=Ae.get(r);if(a!==null&&c!==void 0){let d=$E(a),u=pG(r)||lk(r);d!==null&&!u&&Co(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return jE(a)}}),Co=(e,t,r,o,n,s,i,a)=>{let c=ys(s,a),d=n,u=nG(c.output,c.llmUsage);if(r!==void 0){let S=Ch.get(r);Ch.delete(r),S!==void 0&&Tv({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-S)/1e3))});let h=nB(c.llmUsage,u);h!==null&&bF({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&vk.has(r)&&(vk.delete(r),d=cG,u=u.trim().length>0&&!u.includes("Stopped by user.")?`${u.trim()}${dG}`:"Stopped by user.");let m=r!==void 0?Cv(e.layout.reportsDir,r):null;if(r!==void 0){pd(r),Na(e.layout,r),dr(r)&&(_t(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),fB(r));let S=Ae.get(r);yF({reportsDir:e.layout.reportsDir,agentRunId:r,input:ko(i),output:u,...S!==void 0?{writerLabel:dd({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&Nf({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:u,agentRunId:r}),QB(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:u,layout:e.layout}),lB(e.layout,{runId:r,exitCode:d,output:u,createdAt:new Date().toISOString(),...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{}}),rk({layout:e.layout,cloudApi:Ad}),Ae.delete(r),Sd.delete(r),ah(e.layout,r)}_t(t,{type:"command.claude.result",payload:{exitCode:d,output:u,...r!==void 0?{agentRunId:r}:{},...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),ya(e.layout)},mG=(e,t,r,o,n,s,i)=>{let a=Ae.get(r),c=a?.accumulatedOutput??s;eB(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),Bn(t,r,()=>QT(e.layout,r),bd(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),_t(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},qZ=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,u=h=>{if(!(n===void 0||h.length===0)){if(dr(n)){_t(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}qr(n,h)}};if(n!==void 0){let h=Ae.get(n);Sd.set(n,t),Ae.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),_t(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),Bn(r,n,()=>pG(n),bd(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let m=a==="claude-cli",S=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(m?S.push(y):(c.push(y),u(y)),d||n===void 0)return;let p=gd(c.join(""));if(p!==null){d=!0,t.kill("SIGTERM");let b=Ae.get(n),A=[b?.accumulatedOutput??"",p.partialOutput].filter(f=>f.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=A),Sd.delete(n),mG(e,r,n,o,p.question,A,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),u(y)}),t.on("close",h=>{if(d)return;bh(a);let y=n!==void 0?Ae.get(n):void 0,p=m?ys(S.join("")):{output:c.join("").trim(),llmUsage:void 0},b=m?c.join("").trim():"",A=[p.output.trim(),b].filter(P=>P.length>0).join(`
`);m&&p.output.trim().length>0&&u(p.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${A}`.trim():A;Co(e,r,n,o,h??-1,f,s,p.llmUsage)}),t.on("error",h=>{d||Co(e,r,n,o,-1,h.message,s)})},VZ=(e,t,r,o,n,s,i,a,c)=>{let d=uG(r,c);s!==void 0&&(Ae.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),_t(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),Bn(n,s,()=>Ae.has(s),bd(e,n,s,o,i,a))),xa(e,t,r,m=>{if(!(s===void 0||m.length===0)){if(dr(s)){_t(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:m},requestId:o});return}qr(s,m)}}).then(m=>{bh(t),Co(e,n,s,o,m.exitCode,m.output,r,m.llmUsage)}).catch(m=>{let S=m instanceof Error?m.message:String(m);Co(e,n,s,o,-1,S,r)})},Lh=(e,t,r,o,n,s,i,a,c,d,u,m)=>{let S=uG(r,u);if(ha(e.layout),Zo(e,t)){aG(s),VZ(e,t,r,o,n,s,c,d,S);return}let h=Kt(t,r,GZ(e),i);if(h===null){Co(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}aG(s);let y=mB({workspace:e.workspace,projectFolderPath:c}),p=()=>{let b=(0,lG.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:m??process.env});qZ(e,b,n,o,s,r,S,t)};if(s===void 0){p();return}Ae.set(s,{originalPrompt:r,userTranscriptPrompt:S,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:Ae.get(s)?.accumulatedOutput??""}),BZ(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&sa({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),Bn(n,s,()=>Ae.has(s),bd(e,n,s,o,c,d)),WB({socket:n,sendMessage:_t,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:b=>{a!==void 0&&Ei(a,P=>{_t(n,P)},o);let A=Ae.get(s),f=[A?.accumulatedOutput??"",b.partialOutput].filter(P=>P.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),mG(e,n,s,o,b.question,f,r)},onFinished:(b,A)=>{bh(t);let f=ys(A),P=Ae.get(s),w=P!==void 0&&P.accumulatedOutput.length>0?`${P.accumulatedOutput}

${f.output}`.trim():f.output;Co(e,n,s,o,b,w,r,f.llmUsage)}}).then(b=>{if(!b){p();return}Bn(n,s,()=>lk(s),bd(e,n,s,o,c,d))}).catch(b=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",b instanceof Error?b.message:b),p()})},Lk=(e,t,r,o)=>{ah(e.layout,t.agentRunId),t.shellSessionId!==void 0&&_t(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=EB(t),s=Ae.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;Lh(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},Ek=(e,t)=>{for(let r of QU(e.layout))Ae.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:ko(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Bn(t,r.agentRunId,()=>QT(e.layout,r.agentRunId),{awaitingInput:!0}),_t(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Wk=(e,t,r,o)=>{let n=Ae.get(r);if(n===void 0)return!1;vk.add(r),pd(r);let s=Sd.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(TB(r))return!0;ah(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${dG}`:"Stopped by user.";return Co(e,t,r,o,cG,i,n.originalPrompt),!0}});var KZ,Rk,fG=l(()=>{"use strict";Ha();KZ=()=>`http://127.0.0.1:${Ct()}/restart`,Rk=async()=>{try{let e=await fetch(KZ(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var hG=l(()=>{"use strict";Cl()});var yG=l(()=>{"use strict";rT()});var SG,AG=l(()=>{"use strict";SG=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Pd,JZ,xk,bG=l(()=>{"use strict";V();re();hG();Bb();yG();AG();cs();Pd=(e,t)=>{po(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},JZ=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(AS(),SS)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},xk=async e=>{let t=ze(e.layout.installDir)?.bundleVersion??null;if(!SG({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(Tt(e.layout)){Sa({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Pd(e.layout,{summary:r,action:"install-bundle-update-start"}),fr({launchAgentLabel:he(e.layout.installDir),installDir:e.layout.installDir});let o=await yi({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),Pd(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await JZ();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Pd(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),Pd(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),Pd(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var YZ,Ik,PG=l(()=>{"use strict";YZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ik=e=>{if(!YZ(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var Ok,Mk,_G=l(()=>{"use strict";kb();Cb();Ok=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=pl({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},Mk=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await vr(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var wG,XZ,ZZ,QZ,_d,vG=l(()=>{"use strict";wG=g(require("node:os"));De();XZ="Default",ZZ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),QZ=e=>{let t=wG.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},_d=()=>{let e=M(),t=Nu(e),r=ZZ(XZ);return`${QZ(t)}/${r.length>0?r:"project"}`}});var TG=l(()=>{"use strict";Cl()});var kG,Nk,CG=l(()=>{"use strict";TG();kG=!1,Nk=e=>{kG||(kG=!0,process.on("uncaughtException",t=>{mn(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;mn(e,{kind:"crash",message:r,stack:o})}))}});var LG,eQ,Dk,EG=l(()=>{"use strict";LG=require("node:child_process");yh();kt();ch();lh();cd();dh();eQ=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,LG.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},Dk=async e=>{if(!ge(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&je(e.runConfig.writerExecutionBackend)==="api"){let r=at(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Re(e.layout.configPath),n=Je(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Vr(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await eQ(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var zk,WG=l(()=>{"use strict";zk=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var RG,jk,xG=l(()=>{"use strict";RG=require("node:crypto"),jk=()=>(0,RG.randomUUID)()});var xi,IG,Eh=l(()=>{"use strict";xi="[[WORKING_ESTIMATE]]",IG=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",xi,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var OG,MG=l(()=>{"use strict";OG=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var tQ,NG,DG=l(()=>{"use strict";Eh();tQ=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,NG=e=>{if(!e.includes(xi))return null;let t=null;for(let r of e.matchAll(tQ)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var rQ,$k,zG=l(()=>{"use strict";DG();rQ=/^(\d{1,6})\b/,$k=e=>{let t=NG(e);if(t!==null)return t;let r=rQ.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var oQ,nQ,sQ,Wh,Hk=l(()=>{"use strict";kt();vl();oQ="http://127.0.0.1:11434",nQ=45e3,sQ=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Wh=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||oQ,o=t===void 0?(await Wt({commands:fe({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(nQ)});return n.ok?sQ(await n.json()):null}catch{return null}}});var Fk,Uk,Bk,jG=l(()=>{"use strict";ia();Eh();kh();MG();zG();jc();Hk();Fk=async e=>{let t=ko(e.wrappedPrompt),r=SF(e.reportsDir);return{estimateOutput:await Wh(IG(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},Uk=e=>{let t=$k(e.estimateOutput);t!==null&&Ef({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},Bk=e=>{let t=$k(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=OG(t);return na({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Gt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),Ef({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var Rh,$G,Gk=l(()=>{"use strict";Rh="[[WORKING_TOKEN_ESTIMATE]]",$G=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Rh,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var HG,iQ,FG,UG=l(()=>{"use strict";Gk();HG=/^(\d{1,8})\b/,iQ=e=>{let t=e.indexOf(Rh);if(t<0)return null;let r=e.slice(t+Rh.length).trim(),o=HG.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},FG=e=>{let t=iQ(e);if(t!==null)return t;let r=HG.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var qk,Vk,BG=l(()=>{"use strict";Gk();kh();UG();jc();Hk();qk=async e=>{let t=ko(e.wrappedPrompt),r=PF(e.reportsDir);return{estimateOutput:await Wh($G(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},Vk=e=>{let t=FG(e.estimateOutput);return t===null?null:(AF({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var GG=l(()=>{"use strict";KT();UU();GU();JU();Ha();gG();yh();kt();_k();mh();fG();Ib();bG();cs();PG();_G();uh();vG();CG();EG();Xu();WG();xG();Eh();ia();jG();BG();ek();vl();gh();gk()});var qG={};Ft(qG,{buildContinuationPromptWithContext:()=>cQ});var aQ,lQ,cQ,VG=l(()=>{"use strict";aQ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,lQ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),cQ=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=lQ(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${aQ(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var KG={};Ft(KG,{readHarnessExportSets:()=>uQ});var wd,Kk,xh,dQ,uQ,JG=l(()=>{"use strict";wd=g(require("node:fs")),Kk=g(require("node:path"));De();xh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),dQ=e=>{if(!wd.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(wd.default.readFileSync(e.harnessManifestPath,"utf8"));if(xh(t))return t}catch{return null}return null},uQ=(e,t)=>{let r=M(t),o=dQ(r);if(o===null)return[];let n=xh(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!xh(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let u of c){if(!xh(u))continue;let m=typeof u.path=="string"?u.path:void 0,S=typeof u.id=="string"?u.id:"",h=typeof u.kind=="string"?u.kind:"",y=typeof u.title=="string"?u.title:"";if(m===void 0||S.length===0||h.length===0||y.length===0)continue;let p=m.startsWith("shared/")?Kk.default.join(r.harnessRootDir,m):Kk.default.join(r.harnessSetsDir,i,m);wd.default.existsSync(p)&&d.push({id:S,kind:h,title:y,content:wd.default.readFileSync(p,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var tC,Yk,Ii,YG,pQ,XG,ZG,Jk,QG,Xk,Zk,Qk,te,J,eC,mQ,vd,gQ,fQ,hQ,yQ,SQ,AQ,bQ,PQ,Td,e2=l(()=>{"use strict";tC=require("node:child_process"),Yk=g(require("node:fs")),Ii=g(require("node:os"));OU();V();re();Jo();gT();zU();le();Vt();Cl();QP();Bf();zf();Qt();io();eP();gt();GG();YG=3e4,pQ=3e4,XG=new Map,ZG=new Map,Jk=new Map,QG=new Map,Xk=new Map,Zk=new Map,Qk=new Map,te=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),J=(e,t,r)=>{e.readyState===rd.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(po(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),qm(r,"out",t)))},eC=e=>e,mQ=e=>{if(!Yk.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Yk.default.readFileSync(e.harnessManifestPath,"utf8"));if(te(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},vd=(e,t)=>{let r=mQ(t);r!==null&&J(e,{type:"harness.manifest.report",payload:{hostname:Ii.default.hostname(),manifest:r}})},gQ=async(e,t,r,o,n,s,i=!1,a,c,d,u,m)=>{let S=m?.trim()??"";if(!ge(t)){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=dd({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await Wt({commands:fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),p=s!==void 0?Fk({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,b=s!==void 0?qk({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=hd(t)&&!dk(t);if(A){try{await Vr(e.layout.installDir,t)}catch(H){let Ce=H instanceof Error?H.message:String(H);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Ce}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}fd(t)}else if(!hd(t))try{await Vr(e.layout.installDir,t)}catch(H){let Ce=H instanceof Error?H.message:String(H);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Ce}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Oa(d,_d,m);if(f===null){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Ge({projectFolderPath:f,...S.length>0?{projectId:S}:{}}),i||Bc(e.layout,t,f);let P=Df({sessionContinuation:i,supportsWriterSessionContinuation:Sh(t),isWriterConversationStarted:Ah(t)}),w=i&&P==="first"?Uc(e.layout,t,f):null,T=w!==null?hi(e.layout,w):null,k=T!==null&&T.turns.length>0,L=Fv({sessionContinuation:i,supportsWriterSessionContinuation:Sh(t),isWriterConversationStarted:Ah(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:k,userPromptCharacterCount:r.length}),R=r;if(L.continuationStrategy==="source_run_seed"){let H=typeof c=="string"&&c.length>0?yd(e.layout,c):null;if(H!==null){let{buildContinuationPromptWithContext:Ce}=await Promise.resolve().then(()=>(VG(),qG));R=Ce({priorPrompt:H.prompt,priorOutput:H.resultOutput??"",userMessage:r})}}else L.continuationStrategy==="transcript_seed"&&T!==null&&T.turns.length>0&&(R=xf({priorTurns:T.turns,userMessage:r}));let I=L.ragLimit>0?await Hs({layout:e.layout,query:R,limit:L.ragLimit,minScore:L.ragMinScore,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],N=L.ragLimit>0&&f.trim().length>0?await XP({layout:e.layout,query:R,limit:2,minScore:.32,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],U=L.injectMemory?xv(e.layout,f,S.length>0?S:void 0):[],G=`${Ov(U,L.memoryEntryLimit)}${KP(I)}${ZP(N)}${R}`,q=u?.trim()??(s!==void 0&&f.trim().length>0?jk():void 0);if(s!==void 0&&q!==void 0&&q.length>0&&f.trim().length>0){sa({reportKey:q,agentRunId:s,userSummary:"Working on your Mac\u2026"});let H=G;p!==null&&p.then(Ce=>{if(Ce===null)return;let Kr=Bk({estimateOutput:Ce.estimateOutput??"",reportKey:q,agentRunId:s,reportsDir:e.layout.reportsDir,task:Ce.task,writerLabel:Ce.writerLabel,embedding:Ce.embedding});if(Kr.estimateSeconds===null)return;kk(e.layout.reportsDir,s);let ur=`${xi}
${Kr.estimateSeconds}
`;if(dr(s)){J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:ur},requestId:o});return}qr(s,ur)}).catch(()=>{}),G=zk(H),G=Gy(G,{agentRunId:s,reportKey:q,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&p!==null&&p.then(H=>{H!==null&&Uk({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel,embedding:H.embedding})}).catch(()=>{}),s!==void 0&&b!==null&&b.then(H=>{H!==null&&Vk({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel})}).catch(()=>{});let Ke=s!==void 0&&Qk.get(s)===!0;if(s!==void 0&&f.trim().length>0){let H=await vm(f);Zk.set(s,H),q!==void 0&&q.length>0&&Xk.set(s,q)}Lh(e,t,G,o,eC(n),s,{sessionTurn:L.sessionTurn},a,f,q,r,ZS(e.layout,s,Ke)),A&&s!==void 0&&J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:pk(t)},requestId:o})},fQ=async(e,t,r,o,n)=>{let s=(i,a)=>{J(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await mk({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,J(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:o})}}),c=ge(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Wi(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},hQ=(e,t,r)=>new Promise(o=>{if(!ge(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Kt(t,r,fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,tC.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),yQ=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;J(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Xt(t.bundle),s=te(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let u=Le(e.wsUrl)??it,m=await DA({appOrigin:u,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=on({bundle:i,layout:e.layout});return J(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&vd(o,e.layout),!0},SQ=async(e,t,r,o)=>{if(await yQ(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(J(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!ge(n)){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}ha(e.layout);let i=await(async()=>{try{await Vr(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return hQ(e,n,s)})().finally(()=>{ya(e.layout)});J(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),vd(o,e.layout)},AQ=e=>{let t=1e3*2**e;return Math.min(pQ,t)},bQ=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=p=>{if(!t.restartInFlight){if(Tt(e.layout)){Aa(p),console.log(`[agent-witch] Deferring local restart (${p}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${p})\u2026`),t.wakeError=`restart:${p}`,Rk().then(b=>{if(b.ok){console.log("[agent-witch] Local restart completed.");return}if(!b.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",b.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(p,b="system.ack")=>{if(!t.selfUpdateInFlight){if(Tt(e.layout)){Sa({layout:e.layout,remoteBundleVersion:p,trigger:b}),console.log(`[agent-witch] Deferring install bundle update (${p} via ${b}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,xk({layout:e.layout,remoteBundleVersion:p,trigger:b}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let p=ye(e.layout);p!==null&&Ee(p,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let p=t.socket;t.socket=void 0,t.wsConnected=!1,p.removeAllListeners("open"),p.removeAllListeners("message"),p.removeAllListeners("close"),p.on("error",()=>{}),(p.readyState===rd.OPEN||p.readyState===rd.CONNECTING)&&p.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,YG)},u=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let p=AQ(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${p}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},p)},m=p=>{s();let b=()=>{let A=da(e.layout.installDir),f=Ct();J(p,{type:"agent.heartbeat",payload:{hostname:Ii.default.hostname(),macOsUsername:Ii.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:A}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};b(),t.heartbeatTimer=setInterval(b,YG)},S=(p,b)=>{if(typeof p.type!="string")return;if(Qb(p)){t.stopped=!0,s(),a(),c(),Yb({layout:e.layout}).finally(()=>{nd(),process.exit(0)});return}po(e.layout,{direction:"in",type:p.type,summary:"inbound WS frame"}),qm(e.layout,"in",p);let A=typeof p.requestId=="string"?p.requestId:void 0;if(p.type==="device.auth.attestation"&&te(p.payload)){let f=typeof p.payload.serverPublicKey=="string"?p.payload.serverPublicKey:"",P=typeof p.payload.origin=="string"?p.payload.origin:"",w=typeof p.payload.devicePublicKey=="string"?p.payload.devicePublicKey:"",T=typeof p.payload.challenge=="string"?p.payload.challenge:"",k=typeof p.payload.serverAttestation=="string"?p.payload.serverAttestation:"";if(!mT({serverPublicKey:f,origin:P,devicePublicKey:w,challenge:T,serverAttestation:k})){t.wakeError="Server attestation verification failed",po(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(p.type==="writer.ensure"&&te(p.payload)){let f=typeof p.payload.writerAgent=="string"?p.payload.writerAgent:"";po(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),Dk({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(P=>{J(b,{type:"writer.status",payload:P},e.layout)})}if(p.type==="install.bundle.update"&&te(p.payload)){let f=typeof p.payload.bundleVersion=="string"?p.payload.bundleVersion.trim():"";f.length>0&&o(f,"install.bundle.update")}if(p.type==="system.ack"){hp(e.layout,{wsUrl:e.wsUrl});let f=te(p.payload)?p.payload:null,P=Ik(f);P!==null&&o(P)}if(p.type==="device.restart"&&r("cloud-device-restart"),p.type==="automations.sync"&&te(p.payload)&&Ok(p.payload),p.type==="automations.run"&&te(p.payload)&&Mk(p.payload),p.type==="terminal.stream.accepted"&&te(p.payload)){let f=typeof p.payload.runId=="string"?p.payload.runId:"";if(f.length>0){let P=sk(f);for(let w of P)J(b,{type:"terminal.stream.chunk",payload:{runId:f,chunk:w},requestId:A})}}if(p.type==="agent.agentRun.list"&&J(b,{type:"dashboard.agentRun.list.result",payload:{runs:Pk(e.layout)},requestId:A}),p.type==="agent.agentRun.get"&&te(p.payload)){let f=typeof p.payload.runId=="string"?p.payload.runId:"",P=f.length>0?yd(e.layout,f):null;J(b,{type:"dashboard.agentRun.get.result",payload:{run:P},requestId:A})}if(p.type==="command.claude.run"&&te(p.payload)){let f=p.payload.prompt,P=typeof p.payload.writerAgent=="string"&&ge(p.payload.writerAgent)?p.payload.writerAgent:"claude-cli",w=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,T=p.payload.sessionContinuation===!0,k=typeof p.payload.sourceRunId=="string"?p.payload.sourceRunId:void 0,L=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:void 0,R=typeof p.payload.projectId=="string"?p.payload.projectId:void 0,I=Oa(typeof p.payload.projectFolderPath=="string"?p.payload.projectFolderPath:void 0,_d,R),N=GS(p.payload.compositionSnapshot),U=typeof p.payload.reportKey=="string"?p.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${P} task (${T?"continue":"first"})\u2026`),I===null){J(b,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...w!==void 0?{agentRunId:w}:{}},requestId:A});return}if(N!==null){let G=VS(e.layout,N);if(G!==null){J(b,{type:"command.claude.result",payload:{exitCode:-1,output:G,...w!==void 0?{agentRunId:w}:{}},requestId:A});return}if(w!==void 0){let q=JS(e.layout,w,N);if(!q.ok){J(b,{type:"command.claude.result",payload:{exitCode:-1,output:q.errorMessage,...w!==void 0?{agentRunId:w}:{}},requestId:A});return}Qk.set(w,N.entries.some(Ke=>Ke.scope==="run"))}}w!==void 0&&L!==void 0&&XG.set(w,L),w!==void 0&&(ZG.set(w,I),R!==void 0&&R.trim().length>0&&Jk.set(w,R.trim()),QG.set(w,f.trim()),Ge({projectFolderPath:I,...R!==void 0&&R.trim().length>0?{projectId:R.trim()}:{}})),gQ(e,P,f.trim(),A,b,w,T,L,k,I,U,R)}}if(p.type==="shell.session.open"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",P=typeof p.payload.cols=="number"?p.payload.cols:120,w=typeof p.payload.rows=="number"?p.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),ck({shellSessionId:f,cwd:e.workspace,cols:P,rows:w,send:T=>{J(b,T)},requestId:A}))}if(p.type==="shell.session.close"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"";f.length>0&&Ei(f,P=>{J(b,P)},A)}if(p.type==="shell.input"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",P=typeof p.payload.data=="string"?p.payload.data:"";f.length>0&&P.length>0&&ik(f,P)}if(p.type==="shell.resize"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",P=typeof p.payload.cols=="number"?p.payload.cols:0,w=typeof p.payload.rows=="number"?p.payload.rows:0;f.length>0&&P>0&&w>0&&ak(f,P,w)}if(p.type==="command.writer.session.end"&&te(p.payload)){let f=p.payload.writerAgent;typeof f=="string"&&ge(f)&&(uk(f),Mf(e.layout,f))}if(p.type==="command.writer.session.start"&&te(p.payload)){let f=p.payload.writerAgent,P=typeof p.payload.writerSessionId=="string"?p.payload.writerSessionId:"";typeof f=="string"&&ge(f)&&P.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),fQ(e,f,P,A,b))}if(p.type==="command.claude.stop"&&te(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),Wk(e,eC(b),f,A))}if(p.type==="command.claude.input_respond"&&te(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"",P=typeof p.payload.response=="string"?p.payload.response.trim():"",w=typeof p.payload.originalPrompt=="string"?p.payload.originalPrompt:"",T=typeof p.payload.partialOutput=="string"?p.payload.partialOutput:"",k=typeof p.payload.question=="string"?p.payload.question:"";f.length>0&&P.length>0&&w.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),Lk(e,{agentRunId:f,originalPrompt:w,partialOutput:T,question:k,response:P,shellSessionId:XG.get(f)},A,eC(b)))}if(p.type==="dispatch.approval.required"&&te(p.payload)){let f=typeof p.payload.requesterEmail=="string"?p.payload.requesterEmail:"A teammate",P=typeof p.payload.prompt=="string"?p.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${P}`),process.platform==="darwin"&&(0,tC.spawn)("osascript",["-e",`display notification "${P.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(p.type==="harness.request"&&te(p.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),SQ(e,p.payload,A,b)),p.type==="harness.export.request"&&te(p.payload)){let f=typeof p.payload.borrowerUserId=="string"?p.payload.borrowerUserId:"",P=typeof p.payload.targetDeviceId=="string"?p.payload.targetDeviceId:void 0,w=Array.isArray(p.payload.setSlugs)?p.payload.setSlugs.filter(T=>typeof T=="string"):[];f.length>0&&w.length>0&&(async()=>{let{readHarnessExportSets:T}=await Promise.resolve().then(()=>(JG(),KG)),k=T(w,e.email);J(b,{type:"harness.export.result",payload:{success:k.length>0,borrowerUserId:f,...P!==void 0?{targetDeviceId:P}:{},sets:k,errorMessage:k.length>0?void 0:"No readable harness sets were found on this machine."},requestId:A})})()}if(p.type==="harness.manifest.request"&&vd(b,e.layout),p.type==="command.claude.result"&&te(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,P=typeof p.payload.output=="string"?p.payload.output:"",w=typeof p.payload.exitCode=="number"?p.payload.exitCode:null,T=Oa(f!==void 0?ZG.get(f):void 0,_d),k=f!==void 0?Jk.get(f):void 0,L=f!==void 0?QG.get(f)??"":"",R=mb({exitCode:w,output:P});if(R&&T!==null&&VP({layout:e.layout,text:P,source:f??"command.claude.result",projectFolderPath:T,...k!==void 0?{projectId:k}:{}}),w!=null&&w!==0&&P.trim().length>0&&T!==null&&(FP({layout:e.layout,errorText:P,projectFolderPath:T,...k!==void 0?{projectId:k}:{}}),YP({layout:e.layout,text:P,source:f??"command.claude.result.failure",projectFolderPath:T,...k!==void 0?{projectId:k}:{}})),R&&L.trim().length>0&&T!==null&&Iv({layout:e.layout,projectFolderPath:T,...k!==void 0?{projectId:k}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:L,output:P,createdAt:new Date().toISOString()}}),f!==void 0&&T!==null){let N=Xk.get(f),U=Zk.get(f);N!==void 0&&U!==void 0&&vm(T).then(G=>{let q=yb({before:U,after:G});qy(N,q),Zk.delete(f),Xk.delete(f)})}if(R&&k!==void 0&&k.trim().length>0){let N=$(),U=N===null?null:X({wsUrl:N.wsUrl,pairingToken:N.pairingToken});U!==null&&Ab(U,k,{...f!==void 0?{sourceRunId:f}:{},lesson:Sb({prompt:L,output:P})})}f!==void 0&&(Na(e.layout,f),Qk.delete(f),Jk.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let p=new rd(e.wsUrl);t.socket=p,p.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),Tk(X({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),Ck(e.layout);let b=Le(e.wsUrl)??"http://localhost:3000",A=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=pT({layout:e.layout,origin:b,...A!==void 0&&A.length>0?{claimToken:A}:{}});J(p,{type:"agent.register",payload:{role:"agent",hostname:Ii.default.hostname(),macOsUsername:Ii.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),vd(p,e.layout),Ek(e,p),m(p)}),p.on("message",b=>{let A=typeof b=="string"?b:b.toString("utf8");try{let f=JSON.parse(A);if(!te(f))return;S(f,p)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),p.on("close",(b,A)=>{s(),t.socket=void 0,t.wsConnected=!1,PS(e.layout),t.reconnectAttempt+=1;let f=typeof A=="string"?A:A.toString("utf8");mn(e.layout,{kind:"ws_close",message:"WebSocket closed",code:b,reason:f}),console.log("[agent-witch] Disconnected from server."),u()}),p.on("error",b=>{t.wakeError=b.message,mn(e.layout,{kind:"ws_error",message:b.message,stack:b.stack}),console.error(`[agent-witch] Socket error: ${b.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return pS(()=>{let p=mS();p!==null&&p.layout.installDir===e.layout.installDir&&p.layout.profileEmail===e.layout.profileEmail&&o(p.remoteBundleVersion,p.trigger);let b=gS();b!==null&&r(b)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Ta(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Kc(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let p=t.socket;return!t.wsConnected||p===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(vd(p,e.layout),{ok:!0})}}},PQ=async()=>{nt("agent-witch");let e=UT(),t=C();VT().ok||(process.platform==="darwin"?(await Do(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),XT(t);let o=YT({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(fr({launchAgentLabel:he(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),Xi());let n=await iA(),s=n[0];s!==void 0&&Nk(s.layout);for(let h of n){let y=Le(h.wsUrl)??it;ua(h.layout.installDir,y)}let i=n.map(h=>bQ(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),nd(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let p=i[y];if(p===void 0)return;let b=ye(h.layout);_S(b,{socketOpen:p.hasMacSocketOpen(),staleAfterMs:12e4})&&p.reviveWebSocket()})},d=()=>{},u=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(Tt(h)||hl(h.installDir))},m=await ZT({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:u,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):Vc({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let S=hr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Zi(),d()});d=()=>{S(),m.stop(),nd(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Td=PQ});var rC=l(()=>{"use strict";e2()});var t2={};Ft(t2,{startAgentWitchClient:()=>Td});var r2=l(()=>{"use strict";rC();rC();$o();Vy();Qu();if(!st()&&Ho(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Zu(process.argv.slice(e))),Td()}});Uy();Vy();$o();Qu();var UE="20.x",BE="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var i4=e=>[`Node.js ${UE} or newer is required (found ${e}).`,BE].join(" "),GE=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${i4(process.version)}
`),process.exit(1))};var _Q=async()=>{nt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(AS(),SS)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},wQ=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(rI(),tI)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},vQ=async()=>{if(!Ho(st()?void 0:__agentWitchImportMetaUrl))return;GE();let e=process.argv.indexOf("report");e>=0&&process.exit(Zu(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await _Q();return}if(t==="wake"){await wQ();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(oO(),rO));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(E1(),L1));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(r2(),t2));await r()};vQ();
