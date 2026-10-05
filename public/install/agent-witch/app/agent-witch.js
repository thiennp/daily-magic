#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var XG=Object.create;var Lh=Object.defineProperty;var ZG=Object.getOwnPropertyDescriptor;var QG=Object.getOwnPropertyNames;var e2=Object.getPrototypeOf,t2=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var v=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Ut=(e,t)=>{for(var r in t)Lh(e,r,{get:t[r],enumerable:!0})},r2=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of QG(t))!t2.call(e,n)&&n!==r&&Lh(e,n,{get:()=>t[n],enumerable:!(o=ZG(t,n))||o.enumerable});return e};var g=(e,t,r)=>(r=e!=null?XG(e2(e)):{},r2(t||!e||!e.__esModule?Lh(r,"default",{value:e,enumerable:!0}):r,e));var Ni,Qk,eC,Wo,Eh,fQ,tC,Td,Bt,mr,kd,Cd,Jn,Yn,ot,Wh,Ld,Ed,Wd,zi,_t,Xn,Zn,Rd,Yr,Rh,rC,Me=l(()=>{"use strict";Ni={production:".agent-witch",localhost:".local-agent-witch"},Qk={production:47892,localhost:47893},eC={production:"com.agent-witch",localhost:"com.local-agent-witch"},Wo={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Eh="app",fQ=`${Eh}/agent-witch.js`,tC=`${Eh}/command`,Td={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Bt=Ni.production,mr=Ni.localhost,kd=Qk.production,Cd=Qk.localhost,Jn=eC.production,Yn=eC.localhost,ot="profiles",Wh=Wo.activeProfile,Ld="harness",Ed="sets",Wd="manifest.json",zi=Td.projectsDir,_t=Td.logsDir,Xn="agent-witch.log",Zn="agent-witch.error.log",Rd=Td.reportsDir,Yr=Td.deviceKeypairJson,Rh=Eh,rC="agent-witch.js"});var oC=l(()=>{"use strict";Me()});var nC,Ro,Di,xd=l(()=>{"use strict";nC=g(require("node:path"));Me();Ro=e=>nC.default.basename(e)===mr,Di=e=>Ro(e)?Yn:Jn});var sC=l(()=>{"use strict";oC();xd()});var iC,xh,o2,ji,n2,s2,aC,i2,a2,lC=l(()=>{"use strict";sC();Me();iC=g(require("node:os")),xh=g(require("node:path")),o2=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?xh.default.resolve(e):xh.default.join(iC.default.homedir(),Bt)},ji=Di(o2()),n2=`${ji}-wake`,s2=`${ji}-live`,aC=`${ji}-watchdog`,i2=`${ji}-automation-scheduler`,a2=`${ji}-updater`});var Qn=v(Ih=>{"use strict";Object.defineProperty(Ih,"__esModule",{value:!0});Ih.stringify=l2;function l2(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=v(Oh=>{"use strict";Object.defineProperty(Oh,"__esModule",{value:!0});Oh.generateTypeGuardError=c2;var cC=Qn();function c2(e,t,r){return(0,cC.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,cC.stringify)(e)}) to be "${r}"`}});var Xr=v(Id=>{"use strict";Object.defineProperty(Id,"__esModule",{value:!0});Id.isNonNullObject=void 0;var d2=O(),u2=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,d2.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Id.isNonNullObject=u2});var Gt=v(Ae=>{"use strict";Object.defineProperty(Ae,"__esModule",{value:!0});Ae.attachTypeGuardMeta=Ae.isArrayTypeGuard=Ae.isNestedObjectTypeGuard=Ae.getTypeGuardWrapperKind=Ae.getTypeGuardInnerGuard=Ae.getTypeGuardItemGuard=Ae.getTypeGuardSchema=void 0;var p2=e=>e.schema;Ae.getTypeGuardSchema=p2;var m2=e=>e.itemGuard;Ae.getTypeGuardItemGuard=m2;var g2=e=>e.innerGuard;Ae.getTypeGuardInnerGuard=g2;var f2=e=>e.wrapperKind;Ae.getTypeGuardWrapperKind=f2;var h2=e=>{if((0,Ae.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};Ae.isNestedObjectTypeGuard=h2;var y2=e=>{if((0,Ae.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};Ae.isArrayTypeGuard=y2;var S2=(e,t)=>Object.assign(e,t);Ae.attachTypeGuardMeta=S2});var $i=v(xo=>{"use strict";Object.defineProperty(xo,"__esModule",{value:!0});xo.getExpectedTypeName=xo.getTypeGuardDisplayName=void 0;var dC=Gt(),A2=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};xo.getTypeGuardDisplayName=A2;var b2=e=>{let t=(0,dC.getTypeGuardWrapperKind)(e),r=(0,dC.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,xo.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};xo.getExpectedTypeName=b2});var Io=v(Od=>{"use strict";Object.defineProperty(Od,"__esModule",{value:!0});Od.createValidationResult=void 0;var P2=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Od.createValidationResult=P2});var es=v(Md=>{"use strict";Object.defineProperty(Md,"__esModule",{value:!0});Md.createValidationError=void 0;var w2=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Md.createValidationError=w2});var ts=v(Nd=>{"use strict";Object.defineProperty(Nd,"__esModule",{value:!0});Nd.createTreeNode=void 0;var _2=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Nd.createTreeNode=_2});var Hi=v(zd=>{"use strict";Object.defineProperty(zd,"__esModule",{value:!0});zd.combineResults=void 0;var v2=Io(),T2=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,v2.createValidationResult)(r,o,n)};zd.combineResults=T2});var jd=v(Dd=>{"use strict";Object.defineProperty(Dd,"__esModule",{value:!0});Dd.createSimplifiedTree=void 0;var uC=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=uC(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},k2=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=uC(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Dd.createSimplifiedTree=k2});var Ui=v(Hd=>{"use strict";Object.defineProperty(Hd,"__esModule",{value:!0});Hd.validateObject=void 0;var C2=Xr(),Fi=Io(),L2=es(),$d=ts(),E2=Hi(),pC=Fd(),W2=(e,t,r)=>{let o=()=>{let i=(0,L2.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,$d.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Fi.createValidationResult)(!1,[],a):(0,Fi.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Fi.createValidationResult)(!0,[],(0,$d.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...u]=c,m=d,S=t[m],h=e[m],y=(0,pC.validateProperty)(m,h,S,r);return y.valid?u.length===0?(0,Fi.createValidationResult)(!0,[],(0,$d.createTreeNode)(r.path,!0,"object",e)):a(u):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let u=t[d];return(0,pC.validateProperty)(d,e[d],u,r)}),a=(0,E2.combineResults)(i,r.path),c=(0,$d.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let u=d.tree.path.split(".").pop()||"unknown";c.children[u]=d.tree}}),(0,Fi.createValidationResult)(a.valid,a.errors,c)};return(0,C2.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};Hd.validateObject=W2});var gC=v(Gd=>{"use strict";Object.defineProperty(Gd,"__esModule",{value:!0});Gd.validateArray=void 0;var R2=Qn(),Ud=Io(),mC=es(),Bd=ts(),x2=Hi(),I2=Ui(),O2=$i(),M2=Gt(),N2=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,mC.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,Bd.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,Ud.createValidationResult)(!1,[c],d)}let n=(0,M2.getTypeGuardSchema)(t),s=e.map((c,d)=>{let u=`${o}[${d}]`,m={path:u,config:r.config||null};if(n)return(0,I2.validateObject)(c,n,m);let S=t(c,null),h=(0,O2.getExpectedTypeName)(t),y=(0,R2.stringify)(c);if(S)return(0,Ud.createValidationResult)(!0,[],(0,Bd.createTreeNode)(u,!0,h,c));let p=y.length>200?`Expected ${u} to be "${h}"`:`Expected ${u} (${y}) to be "${h}"`,b=(0,mC.createValidationError)(u,h,c,p),A=(0,Bd.createTreeNode)(u,!1,h,c);return A.errors=[b],(0,Ud.createValidationResult)(!1,[b],A)}),i=(0,x2.combineResults)(s,o),a=(0,Bd.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,Ud.createValidationResult)(i.valid,i.errors,a)};Gd.validateArray=N2});var Fd=v(Vd=>{"use strict";Object.defineProperty(Vd,"__esModule",{value:!0});Vd.validateProperty=void 0;var fC=Io(),z2=es(),hC=ts(),D2=$i(),qd=Gt(),j2=Ui(),$2=gC(),H2=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,qd.getTypeGuardSchema)(r),c=(0,qd.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,j2.validateObject)(t,a,s);if(c&&(0,qd.isArrayTypeGuard)(r))return(0,$2.validateArray)(t,c,s)}let d=u=>{let m=r(t,u),S=(0,D2.getExpectedTypeName)(r);return m?(0,fC.createValidationResult)(!0,[],(0,hC.createTreeNode)(n,!0,S,t)):(()=>{let h=(0,z2.createValidationError)(n,S,t,`Expected ${n} (${JSON.stringify(t)}) to be "${S}"`),y=(0,hC.createTreeNode)(n,!1,S,t);return y.errors=[h],(0,fC.createValidationResult)(!1,[h],y)})()};if((0,qd.isNestedObjectTypeGuard)(r)){let u=o.config?{...o.config,identifier:n}:null;return d(u)}return d(null)};Vd.validateProperty=H2});var Jd=v(Kd=>{"use strict";Object.defineProperty(Kd,"__esModule",{value:!0});Kd.isNil=void 0;var F2=O(),U2=function(e,t){return e!=null?(t&&t.callbackOnError((0,F2.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Kd.isNil=U2});var Mh=v(Yd=>{"use strict";Object.defineProperty(Yd,"__esModule",{value:!0});Yd.isDefined=void 0;var B2=O(),G2=Jd(),q2=function(e,t){return(0,G2.isNil)(e,null)?(t&&t.callbackOnError((0,B2.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Yd.isDefined=q2});var Nh=v(Xd=>{"use strict";Object.defineProperty(Xd,"__esModule",{value:!0});Xd.reportValidationResults=void 0;var V2=jd(),yC=Mh(),K2=Jd(),J2=(e,t)=>{if(e.valid===!0||(0,K2.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,yC.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,V2.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,yC.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Xd.reportValidationResults=J2});var zh=v(oe=>{"use strict";Object.defineProperty(oe,"__esModule",{value:!0});oe.Validation=oe.reportValidationResults=oe.validateObject=oe.validateProperty=oe.createSimplifiedTree=oe.combineResults=oe.createTreeNode=oe.createValidationError=oe.createValidationResult=oe.getExpectedTypeName=void 0;var Y2=$i();Object.defineProperty(oe,"getExpectedTypeName",{enumerable:!0,get:function(){return Y2.getExpectedTypeName}});var X2=Io();Object.defineProperty(oe,"createValidationResult",{enumerable:!0,get:function(){return X2.createValidationResult}});var Z2=es();Object.defineProperty(oe,"createValidationError",{enumerable:!0,get:function(){return Z2.createValidationError}});var Q2=ts();Object.defineProperty(oe,"createTreeNode",{enumerable:!0,get:function(){return Q2.createTreeNode}});var e5=Hi();Object.defineProperty(oe,"combineResults",{enumerable:!0,get:function(){return e5.combineResults}});var t5=jd();Object.defineProperty(oe,"createSimplifiedTree",{enumerable:!0,get:function(){return t5.createSimplifiedTree}});var r5=Fd();Object.defineProperty(oe,"validateProperty",{enumerable:!0,get:function(){return r5.validateProperty}});var o5=Ui();Object.defineProperty(oe,"validateObject",{enumerable:!0,get:function(){return o5.validateObject}});var n5=Nh();Object.defineProperty(oe,"reportValidationResults",{enumerable:!0,get:function(){return n5.reportValidationResults}});var s5=Io(),i5=Hi(),a5=es(),l5=ts(),c5=Fd(),d5=Ui(),u5=Nh(),p5=jd();oe.Validation={result:s5.createValidationResult,combine:i5.combineResults,error:a5.createValidationError,treeNode:l5.createTreeNode,property:c5.validateProperty,object:d5.validateObject,report:u5.reportValidationResults,createSimplifiedTree:p5.createSimplifiedTree}});var Zd=v(Dh=>{"use strict";Object.defineProperty(Dh,"__esModule",{value:!0});Dh.isType=g5;var SC=Xr(),AC=zh(),m5=Gt();function g5(e){if(!(0,SC.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,AC.validateObject)(r,e,s);return(0,AC.reportValidationResults)(i,o||null),i.valid}return(0,SC.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,m5.attachTypeGuardMeta)(t,{schema:e})}});var _C=v(Oo=>{"use strict";Object.defineProperty(Oo,"__esModule",{value:!0});Oo.isNestedType=Oo.isShape=void 0;Oo.isSchema=Bi;var bC=Xr(),PC=zh(),wC=Gt();function Bi(e){if(!(0,bC.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=h5(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,PC.validateObject)(o,t,i);return(0,PC.reportValidationResults)(a,n||null),a.valid}return(0,bC.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,wC.attachTypeGuardMeta)(r,{schema:t})}function f5(e){return typeof e=="function"?e:Array.isArray(e)?y5(e):typeof e=="object"&&e!==null?Bi(e):e}function h5(e){let t={};for(let[r,o]of Object.entries(e))t[r]=f5(o);return t}function y5(e){let t=e[0],r=Bi(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,wC.attachTypeGuardMeta)(o,{itemGuard:r})}Oo.isShape=Bi;Oo.isNestedType=Bi});var vC=v(jh=>{"use strict";Object.defineProperty(jh,"__esModule",{value:!0});jh.isObjectWith=A5;var S5=Zd();function A5(e){return(0,S5.isType)(e)}});var TC=v($h=>{"use strict";Object.defineProperty($h,"__esModule",{value:!0});$h.isObject=P5;var b5=Zd();function P5(e){return(0,b5.isType)(e)}});var kC=v(Hh=>{"use strict";Object.defineProperty(Hh,"__esModule",{value:!0});Hh.guardWithTolerance=w5;function w5(e,t,r){return t(e,r),e}});var CC=v(Fh=>{"use strict";Object.defineProperty(Fh,"__esModule",{value:!0});Fh.isBranded=v5;var _5=O();function v5(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,_5.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var LC=v(Qd=>{"use strict";Object.defineProperty(Qd,"__esModule",{value:!0});Qd.BrandSymbols=void 0;Qd.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var EC=v(eu=>{"use strict";Object.defineProperty(eu,"__esModule",{value:!0});eu.isAny=void 0;var T5=function(e){return!0};eu.isAny=T5});var Gi=v(Uh=>{"use strict";Object.defineProperty(Uh,"__esModule",{value:!0});Uh.reportTypeGuardError=C5;var k5=O();function C5(e,t,r){e&&e.callbackOnError((0,k5.generateTypeGuardError)(t,e.identifier,r))}});var WC=v(tu=>{"use strict";Object.defineProperty(tu,"__esModule",{value:!0});tu.isBoolean=void 0;var L5=Gi(),E5=function(t,r){return typeof t!="boolean"?((0,L5.reportTypeGuardError)(r,t,"boolean"),!1):!0};tu.isBoolean=E5});var RC=v(ru=>{"use strict";Object.defineProperty(ru,"__esModule",{value:!0});ru.isDate=void 0;var W5=O(),R5=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,W5.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};ru.isDate=R5});var Bh=v(ou=>{"use strict";Object.defineProperty(ou,"__esModule",{value:!0});ou.isNumber=void 0;var x5=Gi(),I5=function(t,r){return typeof t!="number"||isNaN(t)?((0,x5.reportTypeGuardError)(r,t,"number"),!1):!0};ou.isNumber=I5});var xC=v(nu=>{"use strict";Object.defineProperty(nu,"__esModule",{value:!0});nu.isString=void 0;var O5=Gi(),M5=function(t,r){return typeof t!="string"?((0,O5.reportTypeGuardError)(r,t,"string"),!1):!0};nu.isString=M5});var IC=v(su=>{"use strict";Object.defineProperty(su,"__esModule",{value:!0});su.isUnknown=void 0;var N5=function(e){return!0};su.isUnknown=N5});var OC=v(iu=>{"use strict";Object.defineProperty(iu,"__esModule",{value:!0});iu.isFunction=void 0;var z5=O(),D5=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,z5.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};iu.isFunction=D5});var NC=v(au=>{"use strict";Object.defineProperty(au,"__esModule",{value:!0});au.isFile=void 0;var MC=O(),j5=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,MC.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,MC.generateTypeGuardError)(e,t.identifier,"File")),!1)};au.isFile=j5});var DC=v(lu=>{"use strict";Object.defineProperty(lu,"__esModule",{value:!0});lu.isFileList=void 0;var zC=O(),$5=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,zC.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,zC.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};lu.isFileList=$5});var $C=v(cu=>{"use strict";Object.defineProperty(cu,"__esModule",{value:!0});cu.isBlob=void 0;var jC=O(),H5=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,jC.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,jC.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};cu.isBlob=H5});var FC=v(du=>{"use strict";Object.defineProperty(du,"__esModule",{value:!0});du.isFormData=void 0;var HC=O(),F5=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,HC.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,HC.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};du.isFormData=F5});var BC=v(uu=>{"use strict";Object.defineProperty(uu,"__esModule",{value:!0});uu.isURL=void 0;var UC=O(),U5=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,UC.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,UC.generateTypeGuardError)(e,t.identifier,"URL")),!1)};uu.isURL=U5});var qC=v(pu=>{"use strict";Object.defineProperty(pu,"__esModule",{value:!0});pu.isURLSearchParams=void 0;var GC=O(),B5=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,GC.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,GC.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};pu.isURLSearchParams=B5});var VC=v(mu=>{"use strict";Object.defineProperty(mu,"__esModule",{value:!0});mu.isMap=void 0;var G5=O(),q5=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,G5.generateTypeGuardError)(e,t.identifier,"Map")),!1)};mu.isMap=q5});var KC=v(gu=>{"use strict";Object.defineProperty(gu,"__esModule",{value:!0});gu.isSet=void 0;var V5=O(),K5=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,V5.generateTypeGuardError)(e,t.identifier,"Set")),!1)};gu.isSet=K5});var JC=v(Gh=>{"use strict";Object.defineProperty(Gh,"__esModule",{value:!0});Gh.isIndexSignature=Y5;var J5=O();function Y5(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,J5.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,u)=>{let m=s[d],S=e(d,o?{...o,identifier:`${o.identifier}[key:${u}]`}:null),h=t(m,o?{...o,identifier:`${o.identifier}[value:${u}]`}:null);return S&&h})}}});var YC=v(fu=>{"use strict";Object.defineProperty(fu,"__esModule",{value:!0});fu.isError=void 0;var X5=Gi(),Z5=function(t,r){return t instanceof Error?!0:((0,X5.reportTypeGuardError)(r,t,"Error"),!1)};fu.isError=Z5});var Vh=v(qh=>{"use strict";Object.defineProperty(qh,"__esModule",{value:!0});qh.isArrayWithEachItem=tq;var Q5=O(),eq=Gt();function tq(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,Q5.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,eq.attachTypeGuardMeta)(t,{itemGuard:e})}});var Kh=v(hu=>{"use strict";Object.defineProperty(hu,"__esModule",{value:!0});hu.isNonEmptyArray=void 0;var rq=O(),oq=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,rq.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};hu.isNonEmptyArray=oq});var XC=v(Jh=>{"use strict";Object.defineProperty(Jh,"__esModule",{value:!0});Jh.isNonEmptyArrayWithEachItem=iq;var nq=Vh(),sq=Kh();function iq(e){return function(t,r){return(0,nq.isArrayWithEachItem)(e)(t,r)&&(0,sq.isNonEmptyArray)(t,r)}}});var QC=v(Yh=>{"use strict";Object.defineProperty(Yh,"__esModule",{value:!0});Yh.isTuple=aq;var ZC=O();function aq(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,ZC.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,ZC.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var eL=v(Xh=>{"use strict";Object.defineProperty(Xh,"__esModule",{value:!0});Xh.isObjectWithEachItem=cq;var lq=O();function cq(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,lq.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var tL=v(Zh=>{"use strict";Object.defineProperty(Zh,"__esModule",{value:!0});Zh.isPartialOf=uq;var dq=Xr();function uq(e){return function(t,r){if(!(0,dq.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var rL=v(Qh=>{"use strict";Object.defineProperty(Qh,"__esModule",{value:!0});Qh.isPick=mq;var pq=Xr();function mq(e,...t){return function(r,o){if(!(0,pq.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var oL=v(ey=>{"use strict";Object.defineProperty(ey,"__esModule",{value:!0});ey.isOmit=fq;var gq=Xr();function fq(e,...t){return function(r,o){if(!(0,gq.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let u=d.slice(9),m=u.indexOf(" ("),S=m>=0?u.slice(0,m):u;if(a.has(S))return!1;let h=S.startsWith(s+".")&&S.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var nL=v(yu=>{"use strict";Object.defineProperty(yu,"__esModule",{value:!0});yu.isNonEmptyString=void 0;var hq=O(),yq=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,hq.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};yu.isNonEmptyString=yq});var sL=v(Su=>{"use strict";Object.defineProperty(Su,"__esModule",{value:!0});Su.isNonNegativeNumber=void 0;var Sq=O(),Aq=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,Sq.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Su.isNonNegativeNumber=Aq});var iL=v(Au=>{"use strict";Object.defineProperty(Au,"__esModule",{value:!0});Au.isPositiveNumber=void 0;var bq=O(),Pq=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,bq.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Au.isPositiveNumber=Pq});var aL=v(bu=>{"use strict";Object.defineProperty(bu,"__esModule",{value:!0});bu.isNonPositiveNumber=void 0;var wq=O(),_q=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,wq.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};bu.isNonPositiveNumber=_q});var lL=v(Pu=>{"use strict";Object.defineProperty(Pu,"__esModule",{value:!0});Pu.isNegativeNumber=void 0;var vq=O(),Tq=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,vq.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Pu.isNegativeNumber=Tq});var cL=v(wu=>{"use strict";Object.defineProperty(wu,"__esModule",{value:!0});wu.isInteger=void 0;var kq=O(),Cq=Bh(),Lq=function(e,t){return!(0,Cq.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,kq.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};wu.isInteger=Lq});var dL=v(_u=>{"use strict";Object.defineProperty(_u,"__esModule",{value:!0});_u.isPositiveInteger=void 0;var Eq=O(),Wq=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Eq.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};_u.isPositiveInteger=Wq});var uL=v(vu=>{"use strict";Object.defineProperty(vu,"__esModule",{value:!0});vu.isNegativeInteger=void 0;var Rq=O(),xq=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Rq.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};vu.isNegativeInteger=xq});var pL=v(Tu=>{"use strict";Object.defineProperty(Tu,"__esModule",{value:!0});Tu.isNonNegativeInteger=void 0;var Iq=O(),Oq=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Iq.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Tu.isNonNegativeInteger=Oq});var mL=v(ku=>{"use strict";Object.defineProperty(ku,"__esModule",{value:!0});ku.isNonPositiveInteger=void 0;var Mq=O(),Nq=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Mq.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};ku.isNonPositiveInteger=Nq});var gL=v(Lu=>{"use strict";Object.defineProperty(Lu,"__esModule",{value:!0});Lu.isNumeric=void 0;var Cu=O(),zq=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Cu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Cu.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Cu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Cu.generateTypeGuardError)(e,t.identifier,"number key")),!1};Lu.isNumeric=zq});var fL=v(Eu=>{"use strict";Object.defineProperty(Eu,"__esModule",{value:!0});Eu.isBooleanLike=void 0;var ty=O(),Dq=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,ty.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,ty.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Eu.isBooleanLike=Dq});var hL=v(Wu=>{"use strict";Object.defineProperty(Wu,"__esModule",{value:!0});Wu.isDateLike=void 0;var qi=O(),jq=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,qi.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,qi.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,qi.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,qi.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,qi.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Wu.isDateLike=jq});var yL=v(Ru=>{"use strict";Object.defineProperty(Ru,"__esModule",{value:!0});Ru.isBigInt=void 0;var $q=O(),Hq=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,$q.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Ru.isBigInt=Hq});var oy=v(ry=>{"use strict";Object.defineProperty(ry,"__esModule",{value:!0});ry.isOneOf=Fq;var SL=Qn();function Fq(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,SL.stringify)(t)}) must be one of following values ${e.map(SL.stringify).join(" | ")}`),o}}});var AL=v(ny=>{"use strict";Object.defineProperty(ny,"__esModule",{value:!0});ny.isOneOfTypes=Gq;var Uq=Qn(),Bq=$i();function Gq(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,Uq.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,Bq.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let u=`- ${d}`;a.includes(u)||a.push(u)}})),r.callbackOnError(a.join(`
`))}return n}}});var bL=v(sy=>{"use strict";Object.defineProperty(sy,"__esModule",{value:!0});sy.isIntersectionOf=qq;function qq(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var PL=v(iy=>{"use strict";Object.defineProperty(iy,"__esModule",{value:!0});iy.isExtensionOf=Vq;function Vq(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var wL=v(ay=>{"use strict";Object.defineProperty(ay,"__esModule",{value:!0});ay.isNullOr=Jq;var Kq=Gt();function Jq(e){function t(r,o){return r===null?!0:e(r,o)}return(0,Kq.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var _L=v(ly=>{"use strict";Object.defineProperty(ly,"__esModule",{value:!0});ly.isUndefinedOr=Xq;var Yq=Gt();function Xq(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,Yq.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var vL=v(cy=>{"use strict";Object.defineProperty(cy,"__esModule",{value:!0});cy.isNilOr=Qq;var Zq=Gt();function Qq(e){function t(r,o){return r==null?!0:e(r,o)}return(0,Zq.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var TL=v(dy=>{"use strict";Object.defineProperty(dy,"__esModule",{value:!0});dy.isAsserted=eV;function eV(e){return!0}});var kL=v(uy=>{"use strict";Object.defineProperty(uy,"__esModule",{value:!0});uy.isEnum=rV;var tV=oy();function rV(e){return function(t,r){return(0,tV.isOneOf)(...Object.values(e))(t,r)}}});var CL=v(py=>{"use strict";Object.defineProperty(py,"__esModule",{value:!0});py.isEqualTo=sV;var oV=O(),nV=Qn();function sV(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,oV.generateTypeGuardError)(t,r.identifier,`equal to ${(0,nV.stringify)(e)}`)),!1):!0}}});var LL=v(xu=>{"use strict";Object.defineProperty(xu,"__esModule",{value:!0});xu.isRegex=void 0;var iV=O(),aV=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,iV.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};xu.isRegex=aV});var WL=v(my=>{"use strict";Object.defineProperty(my,"__esModule",{value:!0});my.isPattern=lV;var EL=O();function lV(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,EL.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,EL.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var RL=v(gy=>{"use strict";Object.defineProperty(gy,"__esModule",{value:!0});gy.by=cV;function cV(e){return function(t){return e(t,null)}}});var xL=v(fy=>{"use strict";Object.defineProperty(fy,"__esModule",{value:!0});fy.toNumber=dV;function dV(e){return typeof e=="number"?e:Number(e)}});var IL=v(hy=>{"use strict";Object.defineProperty(hy,"__esModule",{value:!0});hy.toDate=uV;function uV(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var OL=v(yy=>{"use strict";Object.defineProperty(yy,"__esModule",{value:!0});yy.toBoolean=pV;function pV(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var ML=v(Iu=>{"use strict";Object.defineProperty(Iu,"__esModule",{value:!0});Iu.isSymbol=void 0;var mV=O(),gV=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,mV.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Iu.isSymbol=gV});var rs=v(w=>{"use strict";Object.defineProperty(w,"__esModule",{value:!0});w.isDateLike=w.isBooleanLike=w.isNumeric=w.isNonPositiveInteger=w.isNonNegativeInteger=w.isNegativeInteger=w.isPositiveInteger=w.isInteger=w.isNegativeNumber=w.isNonPositiveNumber=w.isPositiveNumber=w.isNonNegativeNumber=w.isNonEmptyString=w.isOmit=w.isPick=w.isPartialOf=w.isObjectWithEachItem=w.isNonNullObject=w.isTuple=w.isNonEmptyArrayWithEachItem=w.isNonEmptyArray=w.isArrayWithEachItem=w.isError=w.isIndexSignature=w.isSet=w.isMap=w.isURLSearchParams=w.isURL=w.isFormData=w.isBlob=w.isFileList=w.isFile=w.isFunction=w.isUnknown=w.isString=w.isNumber=w.isNil=w.isDefined=w.isDate=w.isBoolean=w.isAny=w.BrandSymbols=w.isBranded=w.guardWithTolerance=w.isObject=w.isObjectWith=w.isNestedType=w.isShape=w.isSchema=w.isType=void 0;w.isSymbol=w.toBoolean=w.toDate=w.toNumber=w.by=w.generateTypeGuardError=w.isPattern=w.isRegex=w.isEqualTo=w.isEnum=w.isAsserted=w.isNilOr=w.isUndefinedOr=w.isNullOr=w.isExtensionOf=w.isIntersectionOf=w.isOneOfTypes=w.isOneOf=w.isBigInt=void 0;var fV=Zd();Object.defineProperty(w,"isType",{enumerable:!0,get:function(){return fV.isType}});var Sy=_C();Object.defineProperty(w,"isSchema",{enumerable:!0,get:function(){return Sy.isSchema}});Object.defineProperty(w,"isShape",{enumerable:!0,get:function(){return Sy.isShape}});Object.defineProperty(w,"isNestedType",{enumerable:!0,get:function(){return Sy.isNestedType}});var hV=vC();Object.defineProperty(w,"isObjectWith",{enumerable:!0,get:function(){return hV.isObjectWith}});var yV=TC();Object.defineProperty(w,"isObject",{enumerable:!0,get:function(){return yV.isObject}});var SV=kC();Object.defineProperty(w,"guardWithTolerance",{enumerable:!0,get:function(){return SV.guardWithTolerance}});var AV=CC();Object.defineProperty(w,"isBranded",{enumerable:!0,get:function(){return AV.isBranded}});var bV=LC();Object.defineProperty(w,"BrandSymbols",{enumerable:!0,get:function(){return bV.BrandSymbols}});var PV=EC();Object.defineProperty(w,"isAny",{enumerable:!0,get:function(){return PV.isAny}});var wV=WC();Object.defineProperty(w,"isBoolean",{enumerable:!0,get:function(){return wV.isBoolean}});var _V=RC();Object.defineProperty(w,"isDate",{enumerable:!0,get:function(){return _V.isDate}});var vV=Mh();Object.defineProperty(w,"isDefined",{enumerable:!0,get:function(){return vV.isDefined}});var TV=Jd();Object.defineProperty(w,"isNil",{enumerable:!0,get:function(){return TV.isNil}});var kV=Bh();Object.defineProperty(w,"isNumber",{enumerable:!0,get:function(){return kV.isNumber}});var CV=xC();Object.defineProperty(w,"isString",{enumerable:!0,get:function(){return CV.isString}});var LV=IC();Object.defineProperty(w,"isUnknown",{enumerable:!0,get:function(){return LV.isUnknown}});var EV=OC();Object.defineProperty(w,"isFunction",{enumerable:!0,get:function(){return EV.isFunction}});var WV=NC();Object.defineProperty(w,"isFile",{enumerable:!0,get:function(){return WV.isFile}});var RV=DC();Object.defineProperty(w,"isFileList",{enumerable:!0,get:function(){return RV.isFileList}});var xV=$C();Object.defineProperty(w,"isBlob",{enumerable:!0,get:function(){return xV.isBlob}});var IV=FC();Object.defineProperty(w,"isFormData",{enumerable:!0,get:function(){return IV.isFormData}});var OV=BC();Object.defineProperty(w,"isURL",{enumerable:!0,get:function(){return OV.isURL}});var MV=qC();Object.defineProperty(w,"isURLSearchParams",{enumerable:!0,get:function(){return MV.isURLSearchParams}});var NV=VC();Object.defineProperty(w,"isMap",{enumerable:!0,get:function(){return NV.isMap}});var zV=KC();Object.defineProperty(w,"isSet",{enumerable:!0,get:function(){return zV.isSet}});var DV=JC();Object.defineProperty(w,"isIndexSignature",{enumerable:!0,get:function(){return DV.isIndexSignature}});var jV=YC();Object.defineProperty(w,"isError",{enumerable:!0,get:function(){return jV.isError}});var $V=Vh();Object.defineProperty(w,"isArrayWithEachItem",{enumerable:!0,get:function(){return $V.isArrayWithEachItem}});var HV=Kh();Object.defineProperty(w,"isNonEmptyArray",{enumerable:!0,get:function(){return HV.isNonEmptyArray}});var FV=XC();Object.defineProperty(w,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return FV.isNonEmptyArrayWithEachItem}});var UV=QC();Object.defineProperty(w,"isTuple",{enumerable:!0,get:function(){return UV.isTuple}});var BV=Xr();Object.defineProperty(w,"isNonNullObject",{enumerable:!0,get:function(){return BV.isNonNullObject}});var GV=eL();Object.defineProperty(w,"isObjectWithEachItem",{enumerable:!0,get:function(){return GV.isObjectWithEachItem}});var qV=tL();Object.defineProperty(w,"isPartialOf",{enumerable:!0,get:function(){return qV.isPartialOf}});var VV=rL();Object.defineProperty(w,"isPick",{enumerable:!0,get:function(){return VV.isPick}});var KV=oL();Object.defineProperty(w,"isOmit",{enumerable:!0,get:function(){return KV.isOmit}});var JV=nL();Object.defineProperty(w,"isNonEmptyString",{enumerable:!0,get:function(){return JV.isNonEmptyString}});var YV=sL();Object.defineProperty(w,"isNonNegativeNumber",{enumerable:!0,get:function(){return YV.isNonNegativeNumber}});var XV=iL();Object.defineProperty(w,"isPositiveNumber",{enumerable:!0,get:function(){return XV.isPositiveNumber}});var ZV=aL();Object.defineProperty(w,"isNonPositiveNumber",{enumerable:!0,get:function(){return ZV.isNonPositiveNumber}});var QV=lL();Object.defineProperty(w,"isNegativeNumber",{enumerable:!0,get:function(){return QV.isNegativeNumber}});var eK=cL();Object.defineProperty(w,"isInteger",{enumerable:!0,get:function(){return eK.isInteger}});var tK=dL();Object.defineProperty(w,"isPositiveInteger",{enumerable:!0,get:function(){return tK.isPositiveInteger}});var rK=uL();Object.defineProperty(w,"isNegativeInteger",{enumerable:!0,get:function(){return rK.isNegativeInteger}});var oK=pL();Object.defineProperty(w,"isNonNegativeInteger",{enumerable:!0,get:function(){return oK.isNonNegativeInteger}});var nK=mL();Object.defineProperty(w,"isNonPositiveInteger",{enumerable:!0,get:function(){return nK.isNonPositiveInteger}});var sK=gL();Object.defineProperty(w,"isNumeric",{enumerable:!0,get:function(){return sK.isNumeric}});var iK=fL();Object.defineProperty(w,"isBooleanLike",{enumerable:!0,get:function(){return iK.isBooleanLike}});var aK=hL();Object.defineProperty(w,"isDateLike",{enumerable:!0,get:function(){return aK.isDateLike}});var lK=yL();Object.defineProperty(w,"isBigInt",{enumerable:!0,get:function(){return lK.isBigInt}});var cK=oy();Object.defineProperty(w,"isOneOf",{enumerable:!0,get:function(){return cK.isOneOf}});var dK=AL();Object.defineProperty(w,"isOneOfTypes",{enumerable:!0,get:function(){return dK.isOneOfTypes}});var uK=bL();Object.defineProperty(w,"isIntersectionOf",{enumerable:!0,get:function(){return uK.isIntersectionOf}});var pK=PL();Object.defineProperty(w,"isExtensionOf",{enumerable:!0,get:function(){return pK.isExtensionOf}});var mK=wL();Object.defineProperty(w,"isNullOr",{enumerable:!0,get:function(){return mK.isNullOr}});var gK=_L();Object.defineProperty(w,"isUndefinedOr",{enumerable:!0,get:function(){return gK.isUndefinedOr}});var fK=vL();Object.defineProperty(w,"isNilOr",{enumerable:!0,get:function(){return fK.isNilOr}});var hK=TL();Object.defineProperty(w,"isAsserted",{enumerable:!0,get:function(){return hK.isAsserted}});var yK=kL();Object.defineProperty(w,"isEnum",{enumerable:!0,get:function(){return yK.isEnum}});var SK=CL();Object.defineProperty(w,"isEqualTo",{enumerable:!0,get:function(){return SK.isEqualTo}});var AK=LL();Object.defineProperty(w,"isRegex",{enumerable:!0,get:function(){return AK.isRegex}});var bK=WL();Object.defineProperty(w,"isPattern",{enumerable:!0,get:function(){return bK.isPattern}});var PK=O();Object.defineProperty(w,"generateTypeGuardError",{enumerable:!0,get:function(){return PK.generateTypeGuardError}});var wK=RL();Object.defineProperty(w,"by",{enumerable:!0,get:function(){return wK.by}});var _K=xL();Object.defineProperty(w,"toNumber",{enumerable:!0,get:function(){return _K.toNumber}});var vK=IL();Object.defineProperty(w,"toDate",{enumerable:!0,get:function(){return vK.toDate}});var TK=OL();Object.defineProperty(w,"toBoolean",{enumerable:!0,get:function(){return TK.toBoolean}});var kK=ML();Object.defineProperty(w,"isSymbol",{enumerable:!0,get:function(){return kK.isSymbol}})});var os,NL,CK,zL,DL=l(()=>{"use strict";os=g(require("node:path")),NL=require("node:url"),CK=()=>!0,zL=()=>{if(CK()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?os.default.dirname(os.default.resolve(e)):os.default.dirname(os.default.resolve(__filename))}return os.default.dirname((0,NL.fileURLToPath)(__agentWitchImportMetaUrl))}});var Ay,jL,D,$L,LK,Zr,C,Ou,gr,HL,Mu,ns,Nu,Ce,vt,by,Be,Py,M,wy=l(()=>{"use strict";Ay=g(require("node:fs")),jL=g(require("node:os")),D=g(require("node:path")),$L=g(rs());Me();DL();xd();xd();LK=zL(),Zr=e=>e.trim().toLowerCase(),C=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return D.default.resolve(e);let t=D.default.resolve(LK),r=D.default.basename(t),o=D.default.basename(D.default.dirname(t));return r===Rh&&(o===Bt||o===mr)?D.default.dirname(t):r===Bt||r===mr?t:D.default.join(jL.default.homedir(),Bt)},Ou=(e=C())=>D.default.join(e,Rh),gr=(e=C())=>D.default.join(Ou(e),rC),HL=(e,t,r)=>t!==null?D.default.join(e,ot,t,r):D.default.join(e,r),Mu=e=>HL(e.installDir,e.profileEmail,zi),ns=e=>HL(e.installDir,e.profileEmail,_t),Nu=e=>e.profileEmail!==null?D.default.join(e.installDir,ot,e.profileEmail,Yr):D.default.join(e.installDir,Yr),Ce=(e=C())=>Di(e),vt=(e=C())=>Ro(e)?Cd:kd,by=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Zr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Zr(t):null},Be=(e=C())=>{let t=D.default.join(e,Wh);if(!Ay.default.existsSync(t))return null;try{let r=JSON.parse(Ay.default.readFileSync(t,"utf8"));if((0,$L.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Zr(r.email)}catch{return null}return null},Py=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Zr(r):null}let t=by();return t!==null?t:Be()},M=e=>{let t=C(),r=Ou(t),o=gr(t),n=Py(e);if(n!==null){let S=D.default.join(t,ot,n),h=D.default.join(S,Ld),y=D.default.join(S,zi),p=D.default.join(S,_t),b=D.default.join(S,Rd),A=D.default.join(S,Yr),f=D.default.join(S,_t,Xn),P=D.default.join(S,_t,Zn);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:p,mainLogPath:f,errorLogPath:P,reportsDir:b,deviceKeypairPath:A,configPath:D.default.join(S,"config.json"),harnessRootDir:h,harnessManifestPath:D.default.join(h,Wd),harnessSetsDir:D.default.join(h,Ed)}}let s=D.default.join(t,Ld),i=D.default.join(t,zi),a=D.default.join(t,_t),c=D.default.join(t,Rd),d=D.default.join(t,Yr),u=D.default.join(t,_t,Xn),m=D.default.join(t,_t,Zn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:u,errorLogPath:m,reportsDir:c,deviceKeypairPath:d,configPath:D.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:D.default.join(s,Wd),harnessSetsDir:D.default.join(s,Ed)}}});var _y,FL,EK,WK,UL,vy,BL=l(()=>{"use strict";_y=g(require("node:fs")),FL=g(require("node:path"));Me();wy();EK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),WK=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,UL=e=>{let t=FL.default.join(e,Wo.wakePort);if(!_y.default.existsSync(t))return null;try{let r=JSON.parse(_y.default.readFileSync(t,"utf8"));if(EK(r)&&WK(r.wakePort))return r.wakePort}catch{return null}return null},vy=(e=C())=>UL(e)??vt(e)});var J=l(()=>{"use strict";wy();BL()});var Ty,ky,zu=l(()=>{"use strict";Ty=new Set(["","loginwindow","_mbsetupuser","root"]),ky=5e3});var GL,MK,qL,Cy,Ly=l(()=>{"use strict";GL=require("node:child_process");zu();MK=e=>e.trim().toLowerCase(),qL=e=>e==null?!1:!Ty.has(MK(e)),Cy=()=>{if(process.platform!=="darwin")return null;try{let t=(0,GL.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return qL(t)?t:null}catch{return null}}});var KL,VL,Tt,Vi=l(()=>{"use strict";KL=g(require("node:os"));Ly();VL=e=>e.trim().toLowerCase(),Tt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?Cy():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??KL.default.userInfo().username;return VL(r)===VL(o)}});var JL,YL,Mo,XL=l(()=>{"use strict";JL=require("node:child_process"),YL=g(require("node:fs"));J();Vi();Mo=(e=C())=>{let t=gr(e);if(!YL.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!Tt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Be(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,JL.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var ZL,Ki,Du=l(()=>{"use strict";ZL=require("node:child_process"),Ki=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,ZL.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var ju,Ey,QL,ne,$u,Ji=l(()=>{"use strict";ju=g(require("node:fs")),Ey=g(require("node:path"));J();Me();QL=e=>{let t=Ey.default.join(e,ot);return ju.default.existsSync(t)?ju.default.readdirSync(t).filter(r=>ju.default.statSync(Ey.default.join(t,r)).isDirectory()).map(r=>Zr(r)).toSorted():[]},ne=(e=C())=>{let t=Ce(e),r=QL(e);return[{profileEmail:Be(e)??r[0]??null,launchAgentLabel:t}]},$u=(e=C())=>QL(e)});var Wy,eE,tE,NK,fr,Hu=l(()=>{"use strict";Wy=g(require("node:fs")),eE=g(require("node:os")),tE=g(require("node:path"));J();Ji();NK=()=>tE.default.join(eE.default.homedir(),"Library","LaunchAgents"),fr=(e=C())=>{let t=Ce(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ne(e))r.add(n.launchAgentLabel);let o=NK();if(Wy.default.existsSync(o))for(let n of Wy.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var rE,Yi,oE=l(()=>{"use strict";J();Du();Hu();Ji();rE=(e=C())=>{let t=new Set(ne(e).map(r=>r.launchAgentLabel));return fr(e).filter(r=>!t.has(r))},Yi=(e=C())=>{for(let t of rE(e))Ki(t)}});var Xi,Ry=l(()=>{"use strict";J();Du();Hu();Xi=(e=C())=>{for(let t of fr(e))Ki(t)}});var nE,sE,zK,No,iE=l(()=>{"use strict";nE=require("node:child_process"),sE=require("node:util"),zK=(0,sE.promisify)(nE.execFile),No=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await zK("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var zo,DK,xy,Iy=l(()=>{"use strict";zo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),DK=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,xy=e=>{let t=e.pathValue??DK(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${zo(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${zo(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${zo(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${zo(e.homeDir)}</string>
    <key>PATH</key>
    <string>${zo(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${zo(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${zo(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var Fu,Oy=l(()=>{"use strict";Fu=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Do,My,Zi,jK,$K,HK,aE,hr,Ny=l(()=>{"use strict";Do=g(require("node:fs")),My=g(require("node:os")),Zi=g(require("node:path"));Me();J();Iy();Oy();jK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$K=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,HK=e=>{let t=Zi.default.join(e,Wo.wakePort);if(!Do.default.existsSync(t))return vt(e);try{let r=JSON.parse(Do.default.readFileSync(t,"utf8"));if(jK(r)&&$K(r.wakePort))return r.wakePort}catch{return vt(e)}return vt(e)},aE=(e,t=My.default.homedir())=>Zi.default.join(t,"Library","LaunchAgents",`${e}.plist`),hr=e=>{let t=e.installDir??C(),r=e.homeDir??My.default.homedir(),o=aE(e.launchAgentLabel,r),n=Do.default.existsSync(o)?Do.default.readFileSync(o,"utf8"):null;if(n!==null&&Fu(n))return{ok:!0,rewritten:!1,plistPath:o};let s=xy({launchAgentLabel:e.launchAgentLabel,runPath:Zi.default.join(t,tC,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??HK(t)});if(!Fu(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Do.default.mkdirSync(Zi.default.dirname(o),{recursive:!0}),Do.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var cE,dE,uE,Qi,FK,UK,lE,Ne,zy=l(()=>{"use strict";cE=require("node:child_process"),dE=g(require("node:fs")),uE=require("node:util");J();Ny();Vi();Qi=(0,uE.promisify)(cE.execFile),FK=async e=>{try{return await Qi("launchctl",["print",e]),!0}catch{return!1}},UK=async(e,t,r)=>{await FK(t)&&await Qi("launchctl",["bootout",t]).catch(()=>{}),await Qi("launchctl",["bootstrap",e,r]),await Qi("launchctl",["enable",t])},lE=async e=>{try{return await Qi("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Ne=async(e,t=C())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!Tt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=hr({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await lE(n))return{ok:!0};let i=s.plistPath;if(!dE.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await UK(o,n,i),await lE(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var jo,pE=l(()=>{"use strict";J();zy();Ji();jo=async(e=C())=>{let t=[];for(let r of ne(e))(await Ne(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var nt,yr,mE=l(()=>{"use strict";Ry();Vi();zu();nt=e=>{Tt()||(Xi(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},yr=(e,t=ky)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{Tt()||e()},t);return()=>{clearInterval(r)}}});var se=l(()=>{"use strict";lC();XL();Du();oE();Ry();Hu();Vi();iE();pE();zy();Ny();Oy();Iy();Ji();Ly();zu();mE()});var Dy=l(()=>{"use strict";se()});var gE,fE,Uu,hE,ss,yE,SE,$o=l(()=>{"use strict";gE=".agent-witch",fE="memory",Uu="project.json",hE="chunks.ndjson",ss="runs.ndjson",yE="reports",SE=".json"});var AE=l(()=>{"use strict";$o()});var bE,Bu,jy=l(()=>{"use strict";bE=g(require("node:path"));AE();Bu=(e,t)=>bE.default.join(e.trim(),`${t.trim()}${SE}`)});var ea,PE,wE=l(()=>{"use strict";ea="agent-witch.js",PE="command"});var Gu=l(()=>{"use strict";wE()});var Ho,_E,vE=l(()=>{"use strict";Gu();Ho=e=>`'${e.replace(/'/g,"'\\''")}'`,_E=e=>{let t=`${e.installDir.trim()}/${"app"}/${ea}`,r=[Ho("node"),Ho(t),"report","write","--key",Ho(e.reportKey.trim()),"--agent-run-id",Ho(e.agentRunId.trim()),"--status",Ho(e.status),"--summary",Ho(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Ho(e.details.trim())),r.join(" ")}});var qt,TE,BK,$y,qu=l(()=>{"use strict";jy();vE();qt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},TE=e=>e===qt.COMPLETED||e===qt.FAILED,BK=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),$y=(e,t)=>{let r=Bu(t.reportsDir,t.reportKey),o=_E({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:qt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${BK({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var ze=l(()=>{"use strict";Me();J()});var ra,CE,kE,LE,GK,is,qK,EE,oa,na,Hy,WE,RE,sa=l(()=>{"use strict";ra=g(require("node:fs")),CE=g(require("node:path"));qu();jy();ze();kE=50,LE=e=>{let t=M(),r=Bu(t.reportsDir,e);return ra.default.mkdirSync(CE.default.dirname(r),{recursive:!0}),r},GK=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},is=e=>{let t=LE(e);if(!ra.default.existsSync(t))return null;try{let r=JSON.parse(ra.default.readFileSync(t,"utf8"));return GK(r)?r:null}catch{return null}},qK=(e,t)=>{let r=[...e,t];return r.length>kE?r.slice(r.length-kE):r},EE=e=>{let t=LE(e.reportKey);ra.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},oa=e=>{let t=is(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:qK(t?.history??[],o)};return EE(n),n},na=e=>{let t=is(e.reportKey);return t!==null?t:oa({reportKey:e.reportKey,agentRunId:e.agentRunId,status:qt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},Hy=(e,t)=>{let r=t.trim();if(r.length===0)return is(e);let o=is(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return EE(s),s},WE=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},RE=e=>{if(e===null||!TE(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===qt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var VK,KK,ia,xE,Vu,Fy=l(()=>{"use strict";qu();sa();VK=new Set(Object.values(qt)),KK=e=>VK.has(e),ia=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},xE=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Vu=e=>{if(e[0]!=="write")return xE(),1;let r=ia(e,"--key"),o=ia(e,"--agent-run-id"),n=ia(e,"--status"),s=ia(e,"--summary"),i=ia(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!KK(n)?(xE(),1):(oa({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var st,Fo=l(()=>{"use strict";st=()=>!0});var Uy,IE,Uo,Ku=l(()=>{"use strict";Uy=g(require("node:path")),IE=require("node:url");Fo();Uo=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Uy.default.resolve(t);return st()?r===Uy.default.resolve(__filename):e===void 0?!1:r===(0,IE.fileURLToPath)(e)}});var Ju,as,XK,noe,ls=l(()=>{"use strict";Ju="agent-witch.js",as="deps.tar.gz",XK="install.sh",noe={mainScript:`app/${Ju}`,depsArchive:`app/${as}`,installShell:XK}});var zE=l(()=>{"use strict";ls()});var DE=l(()=>{"use strict";ls();zE()});var aa,Gy,Yu,ZK,la,De,ds,ca,da,Bo,qy=l(()=>{"use strict";aa=g(require("node:fs")),Gy=g(require("node:path"));DE();J();Yu="install-version.json",ZK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),la=(e=C())=>Gy.default.join(e,Yu),De=(e=C())=>{let t=la(e);if(!aa.default.existsSync(t))return null;try{let r=JSON.parse(aa.default.readFileSync(t,"utf8"));return!ZK(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},ds=(e,t=C())=>{let r=la(t);aa.default.mkdirSync(Gy.default.dirname(r),{recursive:!0}),aa.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},ca=(e=C())=>De(e)?.bundleVersion??"255",da=(e,t)=>{let r=De(e);if(r!==null)return r;let o={bundleVersion:"255",appOrigin:t,updatedAt:new Date().toISOString()};return ds(o,e),o},Bo=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var jE,Go,Vy,Ky,Jy,Xu,Vt,qo,Yy=l(()=>{"use strict";jE=require("node:crypto"),Go=g(require("node:fs")),Vy=g(require("node:path"));J();Ky="self-update-log.ndjson",Jy=100,Xu=(e=C())=>{let t=M(),r=t.installDir===e?t.logsDir:ns({installDir:e,profileEmail:t.profileEmail});return Vy.default.join(r,Ky)},Vt=(e,t=C())=>{let r={id:(0,jE.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Xu(t);Go.default.mkdirSync(Vy.default.dirname(o),{recursive:!0});let n=Go.default.existsSync(o)?Go.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Jy+1)),JSON.stringify(r)];return Go.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},qo=(e=20,t=C())=>{let r=Xu(t);if(!Go.default.existsSync(r))return[];let o=Go.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var Xy,Poe,Zy=l(()=>{"use strict";ls();Xy="deps",Poe=`${"app"}/${as}`});var $E=l(()=>{"use strict";Zy()});var HE,Qr,Vo,FE,Qy,eS,UE=l(()=>{"use strict";HE=require("node:child_process"),Qr=g(require("node:fs")),Vo=g(require("node:path"));ls();Zy();FE=e=>Vo.default.join(e,"app",Xy),Qy=e=>{let t=Vo.default.join(e,"app"),r=Vo.default.join(t,as);Qr.default.existsSync(r)&&(Qr.default.rmSync(FE(e),{recursive:!0,force:!0}),Qr.default.mkdirSync(t,{recursive:!0}),(0,HE.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Qr.default.rmSync(r,{force:!0}))},eS=e=>{Qr.default.rmSync(Vo.default.join(e,"node_modules"),{recursive:!0,force:!0}),Qr.default.rmSync(Vo.default.join(e,"package.json"),{force:!0}),Qr.default.rmSync(Vo.default.join(e,"package-lock.json"),{force:!0})}});var BE=l(()=>{"use strict";$E();UE()});var ua,pa=l(()=>{"use strict";ua="agent-witch.service"});var GE=l(()=>{"use strict";pa()});var Zu,Qu,ep=l(()=>{"use strict";Zu="AGENT_WITCH_EXTERNAL_BRIDGE",Qu="AGENT_WITCH_EXTERNAL_LIVE"});var qE=l(()=>{"use strict";ep();pa()});var VE,tS,KE=l(()=>{"use strict";VE=require("node:child_process");pa();tS=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,VE.spawn)("systemctl",["--user","restart",ua],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${ua} exited ${o??"unknown"}`))})})});var JE=l(()=>{"use strict";pa();GE();qE();KE()});var it,tp,YE=l(()=>{"use strict";it="https://www.agentwitch.com",tp="wss://www.agentwitch.com/api/agent-witch/ws"});var ma,Sr,XE=l(()=>{"use strict";ma="127.0.0.1",Sr=`http://${ma}:43347`});var gt=l(()=>{"use strict";YE();XE()});var ga,rp,ZE,oS,e4,QE,iS,eW,kt,fa,ha,aS,nS,sS,ya,Sa,lS,cS,us=l(()=>{"use strict";ga=g(require("node:fs")),rp=g(require("node:path")),ZE="active-writer-work.json",oS=new Set,e4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),QE=e=>e.profileEmail===null?rp.default.join(e.installDir,ZE):rp.default.join(e.installDir,"profiles",e.profileEmail,ZE),iS=e=>{let t=QE(e);if(!ga.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(ga.default.readFileSync(t,"utf8"));return!e4(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},eW=(e,t)=>{let r=QE(e);ga.default.mkdirSync(rp.default.dirname(r),{recursive:!0}),ga.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},kt=e=>iS(e).activeCount>0,fa=e=>{let t=iS(e);eW(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},ha=e=>{let t=iS(e),r=Math.max(0,t.activeCount-1);if(eW(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of oS)o()},aS=e=>(oS.add(e),()=>{oS.delete(e)}),nS=null,sS=null,ya=e=>{nS=e},Sa=e=>{sS=e},lS=()=>{let e=nS;return nS=null,e},cS=()=>{let e=sS;return sS=null,e}});var Le,op=l(()=>{"use strict";Le=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var ps,np,Aa,dS=l(()=>{"use strict";ps="qwen2.5:7b",np="nomic-embed-text",Aa="Install Ollama from https://ollama.com/download"});var ba,uS,sp=l(()=>{"use strict";dS();ba=()=>`
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
    echo "Ollama is missing. ${Aa}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${Aa}" >&2
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
  agent_witch_ensure_ollama_model "${ps}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${np}" "\${pull_log}"
}
`,uS=()=>`
${ba()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var tW,t4,ip,pS=l(()=>{"use strict";tW=require("node:child_process");J();sp();t4=e=>new Promise(t=>{let r=(0,tW.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:C()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),ip=async(e=t4)=>{let t=`${ba()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var eo,ap,rW,r4,oW,gs,o4,n4,s4,ms,Ko,Jo,nW=l(()=>{"use strict";eo=g(require("node:fs")),ap=g(require("node:path"));BE();JE();se();J();ls();gt();qy();us();op();Yy();pS();rW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),r4=e=>{let t=Be(e),r=t===null?M():M(t);if(!eo.default.existsSync(r.configPath))return null;try{let o=JSON.parse(eo.default.readFileSync(r.configPath,"utf8"));return!rW(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},oW=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!rW(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},gs=async e=>(await oW(e))?.bundleVersion??null,o4=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=ap.default.join(t,r);eo.default.mkdirSync(ap.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());eo.default.writeFileSync(n,s),r.endsWith(".js")&&eo.default.chmodSync(n,493)},n4=async()=>{if(process.platform==="linux"){try{await tS()}catch(e){let t=e instanceof Error?e.message:String(e);console.warn(`[agent-witch-self-update] Linux service restart skipped: ${t}`)}return}Yi(),await jo()},s4=(e,t)=>e!==null?Le(e):t??it,ms=(e,t)=>({localBundleVersion:t,...e}),Ko=async e=>{let t=C(),r=De(t),o=r?.bundleVersion??null,n=await ip();Vt({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=r4(t),i=s4(s,r?.appOrigin);if(i===null){let d=ms({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return Vt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await oW(i);if(a===null){let d=ms({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return Vt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||Bo(o,a.bundleVersion))){let d=ms({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Vt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let S of a.scripts)await o4(i,t,S);let d=ap.default.join(t,Ju);eo.default.existsSync(d)&&eo.default.rmSync(d,{force:!0}),Qy(t),eS(t),ds({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let u=M(Be(t));if(kt(u)){Sa("install-bundle-update");let S=ms({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Vt({event:"update_applied",ok:!0,message:S.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),S}await n4();let m=ms({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Vt({event:"update_applied",ok:!0,message:m.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}catch(d){let u=d instanceof Error?d.message:"Agent Witch self-update failed.",m=ms({ok:!1,updated:!1,message:u,remoteBundleVersion:a.bundleVersion},o);return Vt({event:"update_failed",ok:!1,message:u,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},Jo=()=>{let e=C();return{local:De(e),logs:qo(20,e)}}});var sW={};Ut(sW,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>Yu,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Aa,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>np,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>ps,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Ky,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Jy,appendAgentWitchSelfUpdateLog:()=>Vt,buildAgentWitchEnsureOllamaShell:()=>ba,buildAgentWitchInstallScriptOllama:()=>uS,buildAgentWitchSelfUpdateStatus:()=>Jo,ensureAgentWitchInstallVersionRecorded:()=>da,ensureAgentWitchOllamaInstalled:()=>ip,fetchAgentWitchRemoteInstallBundleVersion:()=>gs,isRemoteAgentWitchBundleVersionNewer:()=>Bo,readAgentWitchInstallVersion:()=>De,readAgentWitchSelfUpdateLogs:()=>qo,resolveAgentWitchAppOriginFromWsUrl:()=>Le,resolveAgentWitchHeartbeatInstallBundleVersion:()=>ca,resolveAgentWitchInstallVersionPath:()=>la,resolveAgentWitchSelfUpdateLogPath:()=>Xu,runAgentWitchSelfUpdate:()=>Ko,writeAgentWitchInstallVersion:()=>ds});var Kt=l(()=>{"use strict";qy();Yy();nW();op();dS();sp();pS()});var mS={};Ut(mS,{buildAgentWitchSelfUpdateStatus:()=>Jo,fetchAgentWitchRemoteInstallBundleVersion:()=>gs,runAgentWitchSelfUpdate:()=>Ko});var gS=l(()=>{"use strict";Kt()});function fs(e){return(0,iW.createHash)("sha256").update(e.trim()).digest("hex")}var iW,lp=l(()=>{"use strict";iW=require("node:crypto")});var hs,Pa,i4,ys,fS,cp=l(()=>{"use strict";hs=g(require("node:fs")),Pa=g(require("node:path"));lp();ze();i4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ys=e=>{if(!hs.default.existsSync(e))return null;try{let t=JSON.parse(hs.default.readFileSync(e,"utf8"));return!i4(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:fs(t.pairingToken.trim())}catch{return null}},fS=(e=C())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(ys(Pa.default.join(e,"config.json")));let n=Pa.default.join(e,ot);if(!hs.default.existsSync(n))return t;for(let s of hs.default.readdirSync(n)){let i=Pa.default.join(n,s);hs.default.statSync(i).isDirectory()&&o(ys(Pa.default.join(i,"config.json")))}return t}});var Ss,wa=l(()=>{"use strict";Ss="connection-health.json"});var Yo,dp,a4,_a,he,hS,up,Ee,pp=l(()=>{"use strict";Yo=g(require("node:fs")),dp=g(require("node:path"));wa();a4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_a=e=>e.profileEmail===null?dp.default.join(e.installDir,Ss):dp.default.join(e.installDir,"profiles",e.profileEmail,Ss),he=e=>{let t=_a(e);if(!Yo.default.existsSync(t))return null;try{let r=JSON.parse(Yo.default.readFileSync(t,"utf8"));return!a4(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},hS=e=>{let t=_a(e);Yo.default.existsSync(t)&&Yo.default.rmSync(t,{force:!0})},up=(e,t)=>{let r=_a(e),o=he(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Yo.default.mkdirSync(dp.default.dirname(r),{recursive:!0}),Yo.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Ee=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var va,aW=l(()=>{"use strict";wa();pp();va=(e,t)=>{if(!t.socketOpen)return!1;let r=he(e);return r===null?!1:!Ee(r,t.staleAfterMs??12e4,t.nowMs)}});var yS,lW=l(()=>{"use strict";pp();yS=(e,t)=>!(e!==null&&!Ee(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Xo=l(()=>{"use strict";pp();aW();lW();wa()});var mp,SS,l4,c4,cW,dW=l(()=>{"use strict";mp=g(require("node:fs")),SS=g(require("node:path"));J();Me();Xo();cp();l4=12e4,c4=e=>{let t=SS.default.join(e,ot);return mp.default.existsSync(t)?mp.default.readdirSync(t).filter(r=>mp.default.statSync(SS.default.join(t,r)).isDirectory()):[]},cW=(e=C())=>{let t=null,r=-1;for(let o of c4(e)){let n=M(o),s=he(n);if(s===null||Ee(s,l4))continue;let i=ys(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var AS,uW,gp,Ta,ka,d4,u4,p4,pW,ge,fe,fp,Jt,Ct=l(()=>{"use strict";AS=g(require("node:fs")),uW=g(require("node:os")),gp=g(require("node:path")),Ta={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},ka=e=>e.trim().length>0,d4=e=>{let t=gp.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},u4=()=>{let e=uW.default.homedir(),t=gp.default.join(e,".local","bin","agent");if(AS.default.existsSync(t))return t;let r=gp.default.join(e,".local","bin","cursor-agent");return AS.default.existsSync(r)?r:Ta.cursorCommand},p4=e=>{let t=e.trim();return!ka(t)||t===Ta.cursorCommand?u4():t},pW=(e,t)=>d4(e)?t:["agent",...t],ge=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",fe=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:ka(t)?t.trim():Ta.claudeCommand,codexCommand:ka(r)?r.trim():Ta.codexCommand,cursorCommand:p4(o),antigravityCommand:ka(n)?n.trim():Ta.antigravityCommand}},fp=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:pW(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Jt=(e,t,r,o)=>{let n=t.trim();if(!ka(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:pW(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"--dangerously-skip-permissions","-p",n]}}});var to,m4,Zo,g4,As,Ca=l(()=>{"use strict";to=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,m4=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:to(s.inputTokens)+to(s.outputTokens)+to(s.cacheReadInputTokens)+to(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Zo=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=to(a.input_tokens)+to(a.cache_creation_input_tokens)+to(a.cache_read_input_tokens),d=to(a.output_tokens),u=c+d;return u<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:u,model:m4(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},g4=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),As=(e,t)=>{let r=Zo(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??g4(r)}}});var bS,f4,h4,PS,wS=l(()=>{"use strict";bS=e=>e.toLocaleString("en-US"),f4=e=>e<.01?e.toFixed(4):e.toFixed(3),h4=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${f4(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${bS(e.inputTokens)} in / ${bS(e.outputTokens)} out (${bS(e.totalTokens)} total)`,t].join(`
`)},PS=(e,t)=>{if(t===void 0)return e;let r=h4(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var hp,_S=l(()=>{"use strict";hp={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Qo,vS,yp,TS=l(()=>{"use strict";_S();Qo="auto",vS=e=>({value:Qo,label:`Auto (${hp[e]})`}),yp={anthropic:[vS("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[vS("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[vS("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var bs,La,Sp,Ps=l(()=>{"use strict";_S();TS();bs=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Qo))return t},La=(e,t)=>{let r=bs(t);return r===void 0?hp[e]:r},Sp=e=>{let t=bs(e);return t===void 0?Qo:t}});var Ap,y4,S4,bp,mW=l(()=>{"use strict";Ap={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},y4=e=>{let t=Ap[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Ap["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Ap["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Ap["gemini-2.0-flash"]:null},S4=(e,t,r)=>{let o=y4(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},bp=e=>{let t=S4(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var ws,A4,b4,P4,Pp,gW=l(()=>{"use strict";mW();ws=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),A4=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=ws(r.input_tokens),n=ws(r.output_tokens);return o===0&&n===0?null:bp({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},b4=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=ws(r.prompt_tokens),n=ws(r.completion_tokens);return o===0&&n===0?null:bp({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},P4=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=ws(r.promptTokenCount),n=ws(r.candidatesTokenCount);return o===0&&n===0?null:bp({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Pp=(e,t,r)=>e==="anthropic"?A4(t,r):e==="openai"?b4(t,r):P4(t,r)});var w4,kS,_4,v4,T4,k4,C4,CS,LS=l(()=>{"use strict";Ps();gW();w4=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},kS=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:La(e,t.model)},_4=async e=>{let t=kS("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=w4(o);n.length>0&&e.onChunk?.(n);let s=Pp("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},v4=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},T4=async e=>{let t=kS("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=v4(o);n.length>0&&e.onChunk?.(n);let s=Pp("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},k4=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},C4=async e=>{let t=kS("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=k4(n);s.length>0&&e.onChunk?.(s);let i=Pp("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},CS=async e=>{try{return e.provider==="anthropic"?await _4(e):e.provider==="openai"?await T4(e):await C4(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var at,Ea=l(()=>{"use strict";at=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var fW,L4,wp,ES=l(()=>{"use strict";fW=g(require("node:path")),L4="writer-api-secrets.json",wp=e=>fW.default.join(e,L4)});var WS,hW,E4,ro,Je,oo=l(()=>{"use strict";WS=g(require("node:fs"));Ps();ES();hW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),E4=e=>{if(!hW(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=bs(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},ro=e=>{let t=wp(e);if(!WS.default.existsSync(t))return{};try{let r=JSON.parse(WS.default.readFileSync(t,"utf8"));if(!hW(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=E4(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Je=(e,t)=>ro(e)[t]??null});var je,Wa=l(()=>{"use strict";je=e=>e==="api"?"api":"cli"});var yW,Re,en,Ar=l(()=>{"use strict";yW=g(require("node:path"));Ea();oo();Wa();Re=e=>yW.default.dirname(e),en=(e,t)=>{if(je(e.writerExecutionBackend)!=="api")return!1;let r=at(t);if(r===null)return!1;let o=Re(e.layout.configPath),n=Je(o,r);return n!==null&&n.apiKey.length>0}});var Ra,RS=l(()=>{"use strict";wS();LS();Ea();oo();Ar();Ra=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=at(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Re(e.layout.configPath),a=Je(i,s);if(a===null){let d=Object.keys(ro(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await CS({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:PS(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var SW,_s,xS=l(()=>{"use strict";SW=require("node:child_process");Ct();Ca();RS();Ar();_s=(e,t,r)=>new Promise(o=>{if(!ge(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(en(e,t)){Ra(e,t,r).then(o);return}let n=Jt(t,r,fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,SW.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=As(i.join("")),u=a.join("").trim(),m=[d.output.trim(),u].filter(S=>S.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var AW=l(()=>{"use strict"});var bW=l(()=>{"use strict";wS();xS();LS();AW();oo();Ar()});var PW,wW,_W,vW=l(()=>{"use strict";PW="claude",wW="codex",_W="cursor"});var TW,W4,IS,xa,_p=l(()=>{"use strict";TW=g(require("node:path"));gt();Me();W4="ws://localhost:3000/api/agent-witch/ws",IS=e=>e.replace(/\/$/,""),xa=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return IS(t);let r=TW.default.basename(e.installDir);if(r===Ni.production)return tp;let o=e.configWsUrl?.trim()??"";return r===Ni.localhost?o.length>0?IS(o):W4:o.length>0?IS(o):tp}});var x4,OS,MS=l(()=>{"use strict";vW();_p();Wa();x4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),OS=e=>{if(!x4(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=xa({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??PW,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??wW,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??_W,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",u=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:u,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:je(t.writerExecutionBackend),layout:e.layout}}}});var NS,zS,DS=l(()=>{"use strict";NS=g(require("node:fs"));J();MS();zS=e=>{let t=M(e);if(!NS.default.existsSync(t.configPath))return null;try{let r=JSON.parse(NS.default.readFileSync(t.configPath,"utf8")),o=OS({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Ia,kW=l(()=>{"use strict";Ia=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var jS,I4,$S,CW=l(()=>{"use strict";jS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),I4=e=>{if(!jS(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!jS(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let u=s.items.flatMap(m=>{if(!jS(m))return[];let S=typeof m.itemKey=="string"?m.itemKey.trim():"",h=typeof m.relativePath=="string"?m.relativePath:"",y=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return S.length===0||y.length===0?[]:[{itemKey:S,relativePath:h,contentSha256:y}]});return u.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:u}]});return{id:t,projectId:r,digest:o,entries:n}},$S=I4});var LW,O4,vp,HS=l(()=>{"use strict";LW=g(require("node:path")),O4=(e,t)=>{let r=t.trim();return LW.default.join(e,"components","store",r.slice(0,2),r)},vp=O4});var EW,M4,FS,WW=l(()=>{"use strict";EW=g(require("node:fs"));HS();M4=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=vp(e.installDir,n.contentSha256);EW.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},FS=M4});var Oa,vs,N4,US,z4,BS,GS=l(()=>{"use strict";Oa=g(require("node:fs")),vs=g(require("node:path"));HS();N4=(e,t)=>vs.default.join(e.installDir,"runs",t,"overlay"),US=(e,t)=>vs.default.join(N4(e,t),".cursor"),z4=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=US(e,t);Oa.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=vp(e.installDir,i.contentSha256);if(!Oa.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?vs.default.join(n,c):vs.default.join(n,i.itemKey);Oa.default.mkdirSync(vs.default.dirname(d),{recursive:!0}),Oa.default.copyFileSync(a,d)}return{ok:!0}},BS=z4});var qS,RW,D4,Ma,xW=l(()=>{"use strict";qS=g(require("node:fs")),RW=g(require("node:path")),D4=(e,t)=>{let r=RW.default.join(e.installDir,"runs",t);qS.default.existsSync(r)&&qS.default.rmSync(r,{recursive:!0,force:!0})},Ma=D4});var j4,VS,IW=l(()=>{"use strict";GS();j4=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=US(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},VS=j4});var KS,$4,H4,F4,U4,B4,$,OW=l(()=>{"use strict";KS=g(require("node:fs"));_p();J();Wa();$4="claude",H4="codex",F4="cursor",U4="agy",B4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=M();if(!KS.default.existsSync(e.configPath))return null;try{let t=JSON.parse(KS.default.readFileSync(e.configPath,"utf8"));if(!B4(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=xa({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:je(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:$4,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:H4,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:F4,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:U4,pairingToken:s,layout:e}}catch{return null}}});var Tp,MW,NW=l(()=>{"use strict";Tp=g(require("node:fs"));ES();MW=(e,t)=>{let r=wp(e);Tp.default.mkdirSync(e,{recursive:!0}),Tp.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Tp.default.chmodSync(r,384)}catch{}}});var Na,zW,kp=l(()=>{"use strict";Na=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},zW=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Na(t)}});var za,G4,JS,YS,DW=l(()=>{"use strict";za=g(require("node:fs"));oo();NW();kp();Ps();Ar();G4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),JS=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=zW(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?bs(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},YS=e=>{let t=Re(e.configPath),r={};if(za.default.existsSync(e.configPath))try{let n=JSON.parse(za.default.readFileSync(e.configPath,"utf8"));G4(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,za.default.mkdirSync(t,{recursive:!0}),za.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=JS(JS(JS(ro(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);MW(t,o)}});var Cp,XS=l(()=>{"use strict";Cp={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var ZS,jW=l(()=>{"use strict";Ea();oo();Ar();Ar();ZS=(e,t)=>{if(en(e,t)||t==="antigravity")return!1;let r=at(t);if(r===null)return!1;let o=Re(e.layout.configPath),n=Je(o,r);return n===null||n.apiKey.trim().length===0}});var $W,QS,eA=l(()=>{"use strict";$W=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},QS=async e=>{let t=$W(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=$W(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var q4,tA,HW=l(()=>{"use strict";se();DS();eA();q4=1e4,tA=()=>QS({listProfileEmails:$u,readConfig:zS,pollIntervalMs:q4,logWaiting:e=>{console.error(e)}})});var le=l(()=>{"use strict";xS();bW();DS();_p();kW();CW();WW();GS();xW();IW();Wa();OW();DW();oo();Ar();kp();Ps();XS();RS();Ar();jW();Ea();oo();HW();MS();eA()});var FW,rA,UW=l(()=>{"use strict";FW=g(require("node:path"));J();Me();dW();lp();cp();le();rA=(e=C())=>{let t=cW(e);if(t!==null)return t;let r=Be(e);if(r!==null){let n=ys(FW.default.join(e,ot,r,"config.json"));if(n!==null)return n}let o=$()?.pairingToken.trim()??"";return o.length===0?null:fs(o)}});var Lp,BW,V4,K4,GW,Ep,Da,Wp,ja=l(()=>{"use strict";Lp=g(require("node:fs")),BW=g(require("node:path")),V4="wake-port.json",K4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GW=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Ep=e=>BW.default.join(e,V4),Da=e=>{let t=Ep(e);if(!Lp.default.existsSync(t))return null;try{let r=JSON.parse(Lp.default.readFileSync(t,"utf8"));if(K4(r)&&GW(r.wakePort))return r.wakePort}catch{return null}return null},Wp=(e,t)=>{if(!GW(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Ep(e);Lp.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var _ae,vae,Tae,Lt,qW,$a=l(()=>{"use strict";ja();ze();ja();_ae=vt(),vae=`${Ce()}-wake`,Tae=Ce(),Lt=()=>{let e=C(),t=Da(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return vt()},qW=e=>{let t=C();Da(t)===null&&Wp(t,e)}});var VW=l(()=>{"use strict";lp();se();cp();UW();le();$a()});var oA,Ha,Fa,KW=l(()=>{"use strict";oA=g(require("node:os"));VW();Ha=()=>{let e=ne();return{ok:!0,port:Lt(),hostname:oA.default.hostname(),profileCount:e.length}},Fa=()=>{let e=ne(),t=rA(),r=fS();return{hostname:oA.default.hostname(),port:Lt(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var nA=l(()=>{"use strict";KW()});var JW,YW,XW,Rp,Ts=l(()=>{"use strict";JW="materialization.json",YW="backups",XW=".gitignore",Rp=e=>`harness-set:${e.trim()}`});var ZW,QW,xp,eR=l(()=>{"use strict";ZW=g(require("node:crypto")),QW=g(require("node:fs")),xp=e=>{try{let t=QW.default.readFileSync(e);return ZW.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var no,tn,J4,tR,sA,rR=l(()=>{"use strict";no=g(require("node:fs")),tn=g(require("node:path"));eR();J4=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=tn.default.join(t,n,o);return no.default.mkdirSync(tn.default.dirname(s),{recursive:!0}),no.default.copyFileSync(r,s),tn.default.relative(e,s).replaceAll("\\","/")},tR=e=>{let t=tn.default.join(e.repoRoot,e.repoRelativeDestination),r=xp(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(no.default.existsSync(t)){let n=xp(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=J4(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return no.default.mkdirSync(tn.default.dirname(t),{recursive:!0}),no.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return no.default.mkdirSync(tn.default.dirname(t),{recursive:!0}),no.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},sA=e=>{let t=xp(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var iA,oR,ks,Ip=l(()=>{"use strict";iA=g(require("node:fs"));Ts();oR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ks=e=>{if(!iA.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(iA.default.readFileSync(e,"utf8"));if(oR(t)&&t.version===1&&oR(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var so,Op,Mp,aA=l(()=>{"use strict";so=g(require("node:fs")),Op=g(require("node:path"));Ts();Mp=e=>{let t=new Set(e.setSlugs.map(s=>Rp(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=Op.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=Op.default.join(e.repoRoot,i.backupPath);so.default.existsSync(c)?(so.default.mkdirSync(Op.default.dirname(a),{recursive:!0}),so.default.copyFileSync(c,a),o.push(s)):so.default.existsSync(a)&&so.default.rmSync(a,{force:!0})}else so.default.existsSync(a)&&so.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var lA,Cs,Np=l(()=>{"use strict";lA=g(require("node:path"));Ts();Cs=e=>({ledgerFilePath:lA.default.join(e.metaDirPath,JW),backupsDirPath:lA.default.join(e.metaDirPath,YW)})});var cA,nR,sR=l(()=>{"use strict";cA=g(require("node:path")),nR=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return cA.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return cA.default.posix.join(s,e,n)}});var dA,iR,Ba,uA=l(()=>{"use strict";dA=g(require("node:fs")),iR=g(require("node:path")),Ba=(e,t)=>{dA.default.mkdirSync(iR.default.dirname(e),{recursive:!0}),dA.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var pA,Y4,Ye,rn=l(()=>{"use strict";pA=g(require("node:os")),Y4=e=>{let t=e.trim();return t.startsWith("~/")?`${pA.default.homedir()}${t.slice(1)}`:t==="~"?pA.default.homedir():t},Ye=Y4});var zp,aR,X4,lR,cR=l(()=>{"use strict";zp=g(require("node:fs")),aR=g(require("node:path"));Ts();$o();X4=`*
!${Uu}
`,lR=e=>{let t=aR.default.join(e,XW);zp.default.existsSync(t)||(zp.default.mkdirSync(e,{recursive:!0}),zp.default.writeFileSync(t,X4))}});var on,ft,nn=l(()=>{"use strict";on=g(require("node:path"));$o();rn();ft=e=>{let t=Ye(e),r=on.default.join(t,gE);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:on.default.join(r,"rag"),memoryDirPath:on.default.join(r,fE),reportsDirPath:on.default.join(r,yE),metaFilePath:on.default.join(r,Uu),ragChunksFilePath:on.default.join(r,"rag",hE)}}});var Yt,uR,Z4,Q4,Ge,Dp=l(()=>{"use strict";Yt=g(require("node:fs")),uR=g(require("node:path"));$o();cR();nn();Z4=(e,t)=>{if(Yt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Yt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},Q4=e=>{Yt.default.existsSync(e.ragChunksFilePath)||Yt.default.writeFileSync(e.ragChunksFilePath,"");let t=uR.default.join(e.memoryDirPath,ss);Yt.default.existsSync(t)||Yt.default.writeFileSync(t,"")},Ge=e=>{let t=ft(e.projectFolderPath);return Yt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Yt.default.mkdirSync(t.ragDirPath,{recursive:!0}),Yt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),lR(t.metaDirPath),Z4(t,e),Q4(t),{ok:!0,layout:t}}});var pR,mR,gR,fR,jp,$p=l(()=>{"use strict";pR="components",mR="store",gR="versions",fR="installed.json",jp=e=>`harness-set:${e.trim()}`});var mA,hR,Hp,gA=l(()=>{"use strict";mA=g(require("node:fs")),hR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Hp=e=>{if(!mA.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(mA.default.readFileSync(e,"utf8"));if(hR(t)&&t.version===1&&hR(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var Ga,Ls,Fp=l(()=>{"use strict";Ga=g(require("node:path"));$p();Ls=e=>{let t=Ga.default.join(e,pR);return{componentsRootDir:t,storeDir:Ga.default.join(t,mR),versionsDir:Ga.default.join(t,gR),installedFilePath:Ga.default.join(t,fR)}}});var fA,yR,Up,Bp,Gp=l(()=>{"use strict";fA=g(require("node:crypto")),yR=g(require("node:fs")),Up=e=>fA.default.createHash("sha256").update(e,"utf8").digest("hex"),Bp=e=>{try{let t=yR.default.readFileSync(e);return fA.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var hA,SR,AR,bR=l(()=>{"use strict";hA=g(require("node:fs")),SR=g(require("node:path")),AR=(e,t)=>{hA.default.mkdirSync(SR.default.dirname(e),{recursive:!0}),hA.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var yA,SA,PR,wR=l(()=>{"use strict";yA=g(require("node:fs")),SA=g(require("node:path")),PR=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=SA.default.join(e,r),n=SA.default.join(o,`${t.versionId}.json`);yA.default.mkdirSync(o,{recursive:!0}),yA.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var qp,_R,vR,TR=l(()=>{"use strict";qp=g(require("node:fs")),_R=g(require("node:path"));Gp();vR=e=>{let t=Up(e.content),r=_R.default.join(e.storeDir,t);return qp.default.existsSync(r)||(qp.default.mkdirSync(e.storeDir,{recursive:!0}),qp.default.writeFileSync(r,e.content)),t}});var AA,kR,e8,Vp,bA=l(()=>{"use strict";AA=g(require("node:fs")),kR=g(require("node:path"));$p();gA();Fp();Gp();bR();wR();TR();e8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Vp=e=>{let t=Ls(e.installDir),r=jp(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!e8(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=kR.default.join(e.harnessRootDir,a);if(!AA.default.existsSync(c))continue;let d=AA.default.readFileSync(c,"utf8"),u=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Bp(c);if(u!==null){if(Up(d)!==u)throw new Error(`Harness item "${i.id}" failed content hash verification.`);vR({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:u})}}if(n.length===0)return;PR(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=Hp(t.installedFilePath);AR(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var wA,PA,CR,LR=l(()=>{"use strict";wA=g(require("node:fs"));bA();gA();Fp();PA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),CR=e=>{if(!wA.default.existsSync(e.harnessManifestPath))return;let t=Ls(e.installDir),r=Hp(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(wA.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!PA(o)||o.version!==1||!PA(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!PA(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Vp({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var _A,ER,WR,RR=l(()=>{"use strict";_A=g(require("node:fs")),ER=g(require("node:path")),WR=e=>{let t=e.componentId.replaceAll("/","_"),r=ER.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!_A.default.existsSync(r))return null;try{let o=JSON.parse(_A.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Kp,Jp,xR,IR=l(()=>{"use strict";Kp=g(require("node:fs")),Jp=g(require("node:path"));$p();LR();RR();Fp();Gp();xR=e=>{CR({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Ls(e.layout.installDir),r=jp(e.setSlug),o=WR({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Jp.default.join(t.storeDir,i.contentSha256);if(Kp.default.existsSync(a)&&Bp(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Jp.default.join(e.layout.harnessRootDir,n):Jp.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Kp.default.existsSync(s))return null;try{if(!Kp.default.statSync(s).isFile())return null}catch{return null}return s}});var OR,t8,vA,Xt,qa=l(()=>{"use strict";Ip();Np();nn();OR="harness-set:",t8=e=>{let t=e.trim();if(!t.startsWith(OR))return null;let r=t.slice(OR.length).trim();return r.length>0?r:null},vA=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=t8(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Xt=e=>{let t=ft(e),{ledgerFilePath:r}=Cs(t),o=ks(r);return vA(o)}});var Yp,TA,Va,r8,br,Ka,Es=l(()=>{"use strict";Yp=g(require("node:fs")),TA=g(require("node:os")),Va=g(require("node:path")),r8=()=>Yp.default.realpathSync(Va.default.resolve(TA.default.homedir())),br=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Va.default.join(TA.default.homedir(),t.slice(1)):t,o;try{o=Yp.default.realpathSync(Va.default.resolve(r))}catch{return null}let n=r8();return o===n||o.startsWith(`${n}${Va.default.sep}`)?o:null},Ka=e=>{let t=br(e);if(t===null)return null;try{if(!Yp.default.statSync(t).isFile())return null}catch{return null}return t}});var kA,CA=l(()=>{"use strict";kA=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Zp,MR,Xp,o8,Ja,LA=l(()=>{"use strict";Zp=g(require("node:fs")),MR=g(require("node:path"));Ts();rR();Ip();aA();Np();sR();uA();rn();Dp();IR();qa();Es();CA();Xp=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),o8=e=>{if(!Zp.default.existsSync(e))return null;try{let t=JSON.parse(Zp.default.readFileSync(e,"utf8"));if(Xp(t)&&t.version===1)return t}catch{return null}return null},Ja=e=>{let t=[...new Set(e.setSlugs.map(A=>A.trim()).filter(A=>A.length>0))],r=Ye(e.projectFolderPath),o=br(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Zp.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Ge({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Cs(s.layout),d=Xt(o).filter(A=>!t.includes(A)),u=ks(i),m=0;if(d.length>0){let A=Mp({repoRoot:o,setSlugs:d,ledger:u});u=A.ledger,m=A.summary.removedPaths.length}if(t.length===0)return Ba(i,u),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let S=o8(e.layout.harnessManifestPath);if(S===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=Xp(S.sets)?S.sets:{},y=0,p=0,b=0;for(let A of t){let f=h[A];if(!Xp(f))return{ok:!1,errorMessage:`Harness set "${A}" is not installed locally.`};let P=typeof f.version=="number"?String(f.version):"1",_=Rp(A),T=Array.isArray(f.items)?f.items:[];for(let k of T){if(!Xp(k))continue;let L=typeof k.path=="string"?k.path.trim():"";if(L.length===0)continue;let R=kA(L);if(R===null)continue;let I=nR(A,R),N=MR.default.posix.join(".cursor",I).replaceAll("\\","/"),U=typeof k.id=="string"?k.id.trim():"",G=xR({layout:e.layout,setSlug:A,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:L,manifestItemId:U});if(G===null)continue;let q=tR({repoRoot:o,backupsDir:a,repoRelativeDestination:N,sourceAbsolutePath:G,componentId:_,versionId:P,ledger:u});if(q.kind==="skipped_unchanged"){p+=1;continue}if(q.kind==="backed_up_user_file"){b+=1,y+=1,u={version:1,entries:{...u.entries,[N]:sA({componentId:_,versionId:P,sourceAbsolutePath:G,backupPath:q.backupPath})}};continue}y+=1,u={version:1,entries:{...u.entries,[N]:sA({componentId:_,versionId:P,sourceAbsolutePath:G})}}}}return y===0&&p===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(Ba(i,u),{ok:!0,writtenFileCount:y,skippedFileCount:p,backedUpFileCount:b,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var NR,Qp,n8,s8,i8,a8,l8,c8,d8,u8,p8,Ya,em=l(()=>{"use strict";NR=g(require("node:crypto")),Qp=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},n8=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},s8=(e,t)=>{let r=n8(t),o=Qp(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},i8=(e,t,r)=>{let o=s8(t,r);return`shared/items/${e}/${o}`},a8=["rules","skills","commands","instructions","agents"],l8=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),c8=(e,t)=>[...e.filter(o=>o.id!==t.id),t],d8=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},u8=e=>NR.default.createHash("sha256").update(e,"utf8").digest("hex"),p8=e=>({id:e.id,kind:e.kind,title:e.title,path:i8(e.id,e.kind,e.title),contentSha256:u8(e.content)}),Ya=e=>{let t=new Date().toISOString(),r=e.existingManifest??l8(e.hostname,t),o=Qp(e.bundle.slug),n=d8(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...a8.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,u)=>{let m=p8(u);return{files:[...d.files,{relativePath:m.path,content:u.content}],nextItems:c8(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var io,zR,tm,m8,sn,EA=l(()=>{"use strict";io=g(require("node:fs")),zR=g(require("node:os")),tm=g(require("node:path"));em();m8=e=>{if(!io.default.existsSync(e))return null;try{let t=JSON.parse(io.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},sn=e=>{try{let t=m8(e.layout.harnessManifestPath),r=Ya({bundle:e.bundle,hostname:zR.default.hostname(),existingManifest:t});io.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)io.default.mkdirSync(tm.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=tm.default.join(e.layout.harnessRootDir,o.relativePath);io.default.mkdirSync(tm.default.dirname(n),{recursive:!0}),io.default.writeFileSync(n,o.content)}return io.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var WA,DR=l(()=>{"use strict";EA();LA();WA=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=sn({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Ja({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var jR,$R=l(()=>{"use strict";jR=["rule","skill","command","instruction","agent"]});var HR,g8,f8,Zt,RA=l(()=>{"use strict";$R();HR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),g8=e=>typeof e=="string"&&jR.includes(e),f8=e=>{if(!HR(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!g8(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Zt=e=>{if(!HR(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=f8(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var FR,h8,xA,UR=l(()=>{"use strict";FR=require("node:zlib");RA();h8="x-agent-witch-token",xA=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[h8]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,FR.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=Zt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var OA,IA,Qt,BR=l(()=>{"use strict";OA=g(require("node:fs")),IA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qt=e=>{if(!OA.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(OA.default.readFileSync(e.harnessManifestPath,"utf8"));if(!IA(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=IA(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!IA(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",u=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:u.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var rm,GR=l(()=>{"use strict";rm=()=>"~"});var qR,VR,KR=l(()=>{"use strict";qR=require("node:crypto"),VR=e=>`local-${(0,qR.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var MA,JR=l(()=>{"use strict";MA=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Xa,om,NA=l(()=>{"use strict";Xa=g(require("node:path")),om=e=>{let t=Xa.default.dirname(e),r=Xa.default.basename(t);return r==="agents"?Xa.default.basename(Xa.default.dirname(t)):r}});var Za,Pr,YR,y8,S8,A8,nm,XR,zA=l(()=>{"use strict";Za=g(require("node:fs")),Pr=g(require("node:path"));KR();JR();NA();YR=new Set(["node_modules",".git","dist","build",".next","coverage"]),y8=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},S8=(e,t)=>{let r=Pr.default.basename(t);if(e==="skill"){let o=t.split(Pr.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},A8=e=>{let t=[],r=(n,s)=>{let i;try{i=Za.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&YR.has(a.name))continue;let c=Pr.default.join(n,a.name),d=s?Pr.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;MA(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=Pr.default.join(e,n);Za.default.existsSync(s)&&r(s,n)}let o=Pr.default.join(e,"skills");return Za.default.existsSync(o)&&r(o,"skills"),t},nm=e=>{let t=A8(e);if(t.length===0)return null;let r=Pr.default.dirname(e),o=om(e),n=y8(o),s=t.map(i=>{let a=MA(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:VR(i.absolutePath),kind:a,title:S8(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},XR=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Za.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||YR.has(a.name))continue;let c=Pr.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var ZR,DA,b8,jA,QR=l(()=>{"use strict";ZR=g(require("node:fs")),DA=g(require("node:path"));zA();Es();b8=e=>{let t=br(e.trim());if(t===null)return null;if(DA.default.basename(t)===".cursor")return t;let r=DA.default.join(t,".cursor");try{if(ZR.default.statSync(r).isDirectory())return br(r)}catch{return null}return null},jA=e=>{let t=b8(e.projectPath);if(t===null)return null;let r=nm(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var ex,P8,sm,$A,tx=l(()=>{"use strict";ex=g(require("node:path"));zA();Es();NA();P8=5,sm=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},$A=e=>{let t=br(e.scanRoot.trim());if(t===null)return sm(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of XR(t,P8,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=br(s);if(i===null)continue;let a=om(i);sm(e.response,"folder",{cursorDir:i,groupName:a,repoPath:ex.default.dirname(i)});let c=nm(i);c!==null&&(r.push(c),sm(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return sm(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var rx,ox,nx=l(()=>{"use strict";rx=g(require("node:path")),ox=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:rx.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var qe,sx,HA,w8,FA,UA,im,BA,Qa,ix=l(()=>{"use strict";qe=g(require("node:fs")),sx=g(require("node:os")),HA=g(require("node:path"));em();bA();Es();nx();w8=e=>{if(!qe.default.existsSync(e))return null;try{let t=JSON.parse(qe.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},FA=e=>{let t=e.hostname??sx.default.hostname(),r=w8(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(u=>u.include);if(a.length===0)continue;let c=[];for(let u of a){let m=Ka(u.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let S=qe.default.readFileSync(m,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:S,setSlugs:[i.slug]})}let d=Ya({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)n.add(u);for(let u of d.files)s.push(u),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{qe.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)qe.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=HA.default.join(e.layout.harnessRootDir,i.relativePath);qe.default.mkdirSync(HA.default.dirname(a),{recursive:!0}),qe.default.writeFileSync(a,i.content)}qe.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(u=>u.include))continue;let c=Qp(i.slug),d=r.sets[c];d!==void 0&&Vp({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},UA="reveal-cache.json",im=(e,t)=>{qe.default.mkdirSync(e.harnessRootDir,{recursive:!0}),qe.default.writeFileSync(`${e.harnessRootDir}/${UA}`,`${JSON.stringify(t,null,2)}
`)},BA=e=>{let t=`${e.harnessRootDir}/${UA}`;qe.default.existsSync(t)&&qe.default.unlinkSync(t)},Qa=e=>{let t=`${e.harnessRootDir}/${UA}`;if(!qe.default.existsSync(t))return null;try{let r=JSON.parse(qe.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return ox(r)}catch{return null}return null}});var ao=l(()=>{"use strict";LA();DR();CA();EA();UR();RA();em();BR();GR();QR();Es();tx();ix()});var GA,ax=l(()=>{"use strict";ao();ze();GA=e=>{let t=M(e.profileEmail);return sn({bundle:e.bundle,layout:t})}});var lx=l(()=>{"use strict";ax();ao()});var _8,cx,v8,dx,an,am,ux=l(()=>{"use strict";_8=["agentwitch.com","www.agentwitch.com"],cx=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,v8=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},dx=e=>{let t=v8(e);return!!(_8.includes(t)||cx.test(e.trim().toLowerCase()))},an=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return dx(r)?cx.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},am=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:an(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var el=l(()=>{"use strict";ux()});var wr,tl=l(()=>{"use strict";wr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var rl,px=l(()=>{"use strict";lx();el();tl();rl=e=>{if(!wr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Zt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!an(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=GA({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var qA=l(()=>{"use strict";px()});var T8,Ws,VA=l(()=>{"use strict";T8=e=>e==="hourly"||e==="daily"||e==="weekdays",Ws=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!T8(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var ol,lm,mx,gx,KA,Et,cm,dm,um,pm,mm=l(()=>{"use strict";ol=g(require("node:fs")),lm=g(require("node:path"));VA();mx="automations.json",gx=e=>e.profileEmail!==null?lm.default.join(e.installDir,"profiles",e.profileEmail,mx):lm.default.join(e.installDir,mx),KA=()=>({version:1,automations:[]}),Et=e=>{let t=gx(e);if(!ol.default.existsSync(t))return KA();try{let r=JSON.parse(ol.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?KA():{version:1,automations:r.automations.flatMap(n=>{let s=Ws(n);return s!==null?[s]:[]})}}catch{return KA()}},cm=(e,t)=>{let r=gx(e);ol.default.mkdirSync(lm.default.dirname(r),{recursive:!0}),ol.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},dm=(e,t)=>{cm(e,{version:1,automations:t})},um=(e,t)=>{let o=Et(e).automations.filter(n=>n.id!==t.id);cm(e,{version:1,automations:[...o,t]})},pm=(e,t)=>Et(e).automations.find(r=>r.id===t)??null});var $e,_r=l(()=>{"use strict";$e="x-agent-witch-token"});var JA=l(()=>{"use strict";op();sp()});var X,ln,YA,nl,XA,k8,ZA,sl,cn,QA,Rs=l(()=>{"use strict";_r();JA();X=e=>{let t=Le(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},ln=e=>({[$e]:e,"Content-Type":"application/json"}),YA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:ln(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},nl=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:ln(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},XA=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:ln(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},k8=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},ZA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:ln(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},sl=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:ln(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return k8(r)}catch{return null}},cn=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:ln(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},QA=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:ln(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var dn,fx,hx,C8,eb,yx,tb=l(()=>{"use strict";dn=g(require("node:fs")),fx=g(require("node:path")),hx=e=>fx.default.join(e.harnessRootDir,"projects-registry.json"),C8=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),eb=e=>{let t=hx(e);if(!dn.default.existsSync(t))return[];try{let r=JSON.parse(dn.default.readFileSync(t,"utf8"));return C8(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},yx=e=>{let t=hx(e);if(!dn.default.existsSync(t))return;let r=`${t}.migrated`;if(dn.default.existsSync(r)){dn.default.unlinkSync(t);return}dn.default.renameSync(t,r)}});var Sx,L8,E8,Ax,bx=l(()=>{"use strict";rn();Sx=e=>Ye(e),L8=e=>new Set(e.map(t=>Sx(t.folderPath))),E8=e=>new Set(e.map(t=>t.id)),Ax=(e,t)=>{let r=L8(t),o=E8(t),n=[],s=new Set;for(let i of e){let a=Sx(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var rb,ob=l(()=>{"use strict";Rs();tb();bx();rb=async(e,t)=>{let r=eb(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=X({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await sl(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=Ax(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await ZA(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&yx(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var nb,vr,il=l(()=>{"use strict";nb=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),vr=(e,t)=>e.find(r=>r.id===t)??null});var lo,al=l(()=>{"use strict";Rs();ob();il();lo=async(e,t)=>{t!==void 0&&await rb(t,e);let r=X({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await sl(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=nb(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var Px=l(()=>{"use strict"});var W8,R8,gm,sb=l(()=>{"use strict";W8="Default",R8=e=>e.trim().toLowerCase()===W8.toLowerCase(),gm=R8});var Q,wx,x8,I8,O8,M8,N8,co,fm=l(()=>{"use strict";sb();Q=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wx=(e,t)=>e.length===0?`<p class="empty">${Q(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Q(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Q(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,x8=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,I8=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from Agent Witch Cloud.":"This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Q(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},O8=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
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
      </div>`},M8=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?O8({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?I8({project:e.project,alreadyInRepo:!1}):x8();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",a=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),u=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this Mac.');">
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
      </div>`},N8=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Q(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Q(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},co=e=>{let t=e.flashError?`<div class="alert-error">${Q(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Q(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(m,S)=>`<a class="project-tab${e.activeTab===m?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${m}">${Q(S)}</a>`,n=e.composition?.items.filter(m=>m.kind==="workflow")??[],s=e.composition?.items.filter(m=>m.kind==="agent")??[],i="";e.activeTab==="harness"?i=M8({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=wx(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=wx(s,"No agents installed for this project yet."):i=N8({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});let a=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,c=`${a}?rename=1`,d=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${Q(a)}" target="_blank" rel="noopener noreferrer">Open in Agent Witch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${Q(c)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,u=gm(e.project.name)?"":`<section class="danger-zone stack">
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
    </section>${u}`}});var z8,D8,_x,vx=l(()=>{"use strict";ao();_r();z8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),D8=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!z8(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Zt(n);return s===null?[]:[s]})}catch{return null}},_x=D8});var Tx,ib,kx=l(()=>{"use strict";le();ao();fm();al();vx();il();qa();Rs();gt();Tx=e=>({kind:"page",title:e.project.name,body:co({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Qt(e.layout),linkedSetSlugs:Xt(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),ib=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let o=await lo(r,e.layout),n=vr(o.projects,t);if(n===null)return{kind:"not_found"};let s=X({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??it,a=s===null?null:await _x(s,n.id);if(a===null)return Tx({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=WA({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return Tx({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await cn(s,n.id,c.appliedSetSlugs),u=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${u.toString()}`}}});var Cx,ab,Lx=l(()=>{"use strict";le();ao();gt();Rs();fm();Dp();rn();al();il();qa();Ip();aA();Np();uA();Cx=e=>({kind:"page",title:e.project.name,body:co({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Qt(e.layout),linkedSetSlugs:Xt(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),ab=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=$();if(n===null)return{kind:"not_found"};let s=await lo(n,e.layout),i=vr(s.projects,r);if(i===null)return{kind:"not_found"};let a=X({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=a?.appOrigin??it;if(o.length===0)return Cx({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=Ye(i.projectFolderPath),u=Ge({projectFolderPath:d}),{ledgerFilePath:m}=Cs(u.layout),S=ks(m),h=vA(S);if(!h.includes(o))return Cx({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let y=h.filter(f=>f!==o),p=Mp({repoRoot:u.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:S});Ba(m,p.ledger);let b=a===null?!1:await cn(a,i.id,y),A=new URLSearchParams({linked:"1",removed:o,files:String(p.summary.removedPaths.length),bindingsSynced:b?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${A.toString()}`}}});var j8,lb,Ex=l(()=>{"use strict";j8=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,lb=j8});var Wx=l(()=>{"use strict"});var Rx=l(()=>{"use strict"});var xx=l(()=>{"use strict";Wx();Rx()});var $8,uo,Ix=l(()=>{"use strict";$8=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],uo=(e=process.env)=>{let t={...e};for(let r of $8)delete t[r];return t}});var Ox=l(()=>{"use strict";Ix()});var cb,Mx=l(()=>{"use strict";cb={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var db=l(()=>{"use strict";Mx()});var hm,ub=l(()=>{"use strict";hm={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var ym=l(()=>{"use strict";xx();Ox();gt();db();ub()});var Nx,zx,H8,Sm,Am,Dx=l(()=>{"use strict";Nx=require("node:child_process"),zx=require("node:util");ym();H8=(0,zx.promisify)(Nx.execFile),Sm=async(e,t)=>{try{let{stdout:r}=await H8("git",t,{cwd:e,env:uo(),maxBuffer:1048576});return r.trim()}catch{return null}},Am=async e=>{let t=await Sm(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await Sm(e,["rev-parse","--abbrev-ref","HEAD"]),o=await Sm(e,["status","--porcelain"]),n=await Sm(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var pb,jx=l(()=>{"use strict";pb=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var F8,mb,$x=l(()=>{"use strict";F8=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},mb=F8});var U8,gb,Hx=l(()=>{"use strict";_r();U8=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[$e]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},gb=U8});var Fx,po,Ux=l(()=>{"use strict";Fx=require("node:child_process"),po=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,Fx.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var Bx=l(()=>{"use strict";al()});var ll,Gx=l(()=>{"use strict";_r();ll=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[$e]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var fb,qx=l(()=>{"use strict";_r();fb=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var er=l(()=>{"use strict";al();il();Px();rn();Dp();kx();Lx();qa();Ex();Dx();jx();$x();Hx();Ux();Bx();Gx();qx();ob();tb();Rs()});var bm,cl,Vx,hb,un,yb=l(()=>{"use strict";bm=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},cl=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=bm(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},Vx=e=>e>=1&&e<=5,hb=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return bm(t,"UTC")},un=e=>{let t=e.from??new Date,r=bm(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return cl(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=cl(r,e.timeZone,o,0),s=bm(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?cl(hb(r),e.timeZone,o,0):n;if(!i&&Vx(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=hb(a),Vx(a.weekday))return cl(a,e.timeZone,o,0);return cl(hb(r),e.timeZone,o,0)}});var Kx,Sb,Tr,Ab=l(()=>{"use strict";Kx=require("node:crypto");le();er();yb();mm();Sb=!1,Tr=async e=>{if(Sb)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=X({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=pm(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};Sb=!0;let n=(0,Kx.randomUUID)();try{let s=await _s(t,"claude-cli",o.prompt);await QA(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=un({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return um(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{Sb=!1}}});var Pm,Jx=l(()=>{"use strict";le();Ab();mm();Pm=async()=>{let e=$();if(e===null)return;let t=Et(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await Tr(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var dl=l(()=>{"use strict";mm();Jx();Ab();yb()});var Yx=l(()=>{"use strict";dl()});var Xx=l(()=>{"use strict";VA()});var Zx=l(()=>{"use strict";Xx()});var bb=l(()=>{"use strict";dl()});var B8,G8,ul,Pb=l(()=>{"use strict";Yx();Zx();bb();ze();B8=e=>e!==void 0&&e.trim().length>0?M(e.trim()):M(),G8=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??un({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??un({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},ul=e=>{let t=B8(e.profileEmail),r=Et(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Ws(s);return i!==null?[G8(i,o.get(i.id))]:[]});return dm(t,n),{ok:!0,writtenCount:n.length}}});var wb=l(()=>{"use strict";dl()});var Qx=l(()=>{"use strict";le()});var e0=l(()=>{"use strict";Pb();wb();bb();Qx()});var t0,pl,ml,gl,r0=l(()=>{"use strict";t0=g(require("node:os"));e0();el();tl();pl=e=>{if(!wr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!an(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=ul({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},ml=async e=>{if(!wr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:an(t)?Tr(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},gl=()=>{let e=$(),t=e!==null?Et(e.layout):{version:1,automations:[]};return{ok:!0,hostname:t0.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var _b=l(()=>{"use strict";r0()});var wm=l(()=>{"use strict";se()});var _m=l(()=>{"use strict";se()});var vm,n0,s0,o0,q8,V8,xs,vb=l(()=>{"use strict";vm=g(require("node:fs")),n0=g(require("node:os")),s0=g(require("node:path"));wm();_m();ja();ze();o0=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},q8=e=>s0.default.join(n0.default.homedir(),"Library","LaunchAgents",`${e}.plist`),V8=async e=>vm.default.existsSync(q8(e))?(await Ne(e)).ok:!1,xs=async(e=C())=>{let t=vm.default.existsSync(Ep(e)),r=!vm.default.existsSync(gr(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Da(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await o0(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${Ce(e)}-wake`;await V8(i)&&s.push(i);for(let c of ne(e))(await Ne(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await o0(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var i0=l(()=>{"use strict";se()});var Tb=l(()=>{"use strict";Xo();se()});var kb=l(()=>{"use strict";Xo()});var Cb=l(()=>{"use strict";se()});var l0,a0,fl,Lb=l(()=>{"use strict";l0=g(require("node:fs"));gt();wm();_m();ze();a0=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},fl=async(e=C())=>{if(!l0.default.existsSync(gr(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await a0())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of ne(e))(await Ne(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await a0();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var c0=l(()=>{"use strict";se()});var d0,pn,Eb,K8,J8,Y8,u0,X8,p0,Is,Tm=l(()=>{"use strict";d0=require("node:crypto"),pn=g(require("node:fs")),Eb=g(require("node:path"));ze();K8="watchdog-log.ndjson",J8=200,Y8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),u0=(e=C())=>{let t=M(),r=t.installDir===e?t.logsDir:ns({installDir:e,profileEmail:t.profileEmail});return Eb.default.join(r,K8)},X8=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!Y8(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},p0=(e,t=C())=>{let r={id:(0,d0.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=u0(t);pn.default.mkdirSync(Eb.default.dirname(o),{recursive:!0});let n=pn.default.existsSync(o)?pn.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-J8+1)),JSON.stringify(r)];return pn.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Is=(e=20,t=C())=>{let r=u0(t);if(!pn.default.existsSync(r))return[];let o=pn.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=X8(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var Wb,Rb,xb,Ib=l(()=>{"use strict";Me();Wb=Wo.watchdogReinstallState,Rb=900*1e3,xb=3e3});var m0=l(()=>{"use strict";Ib()});var g0={};Ut(g0,{verifyAgentWitchReviveAfterKickstart:()=>Q8});var Z8,Q8,f0=l(()=>{"use strict";m0();kb();Cb();ze();Z8=e=>new Promise(t=>{setTimeout(t,e)}),Q8=async e=>{if(await Z8(e.verifyDelayMs??xb),!await No(e.launchAgentLabel))return!1;let r=e.profileEmail===null?M():M(e.profileEmail),o=he(r);return!Ee(o,e.staleAfterMs)}});var hl,Ob,e3,h0,y0,Mb,Nb,zb=l(()=>{"use strict";hl=g(require("node:fs")),Ob=g(require("node:path"));J();Ib();e3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),h0=e=>Ob.default.join(e,Wb),y0=(e=C())=>{let t=h0(e);if(!hl.default.existsSync(t))return null;try{let r=JSON.parse(hl.default.readFileSync(t,"utf8"));return!e3(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},Mb=(e=C(),t=Date.now())=>{let r=y0(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=Rb:!0},Nb=(e=C(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=h0(e);return hl.default.mkdirSync(Ob.default.dirname(o),{recursive:!0}),hl.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var Db,S0=l(()=>{"use strict";se();zb();Db=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!Mb())return{attempted:!1,ok:!1,targets:e};Nb();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Ne(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var A0=l(()=>{"use strict";zb();S0()});var jb=l(()=>{"use strict";Kt()});var b0=l(()=>{"use strict";Kt()});var P0,Os,w0,_0,v0,t3,r3,T0,o3,n3,k0,C0=l(()=>{"use strict";P0=require("node:child_process"),Os=g(require("node:fs")),w0=g(require("node:os")),_0=g(require("node:path")),v0=require("node:util");jb();b0();ze();t3=(0,v0.promisify)(P0.execFile),r3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),T0=e=>{let t=Be(e),r=t===null?M():M(t);if(!Os.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Os.default.readFileSync(r.configPath,"utf8"));return!r3(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},o3=e=>T0(e)?.wsUrl??null,n3=e=>{let t=o3(e);return t!==null?Le(t):De(e)?.appOrigin??null},k0=async e=>{let t=e?.installDir??C(),r=T0(t),o=r!==null?Le(r.wsUrl):n3(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=_0.default.join(w0.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Os.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??Be(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await t3("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Os.default.existsSync(i)&&Os.default.unlinkSync(i)}}});var L0={};Ut(L0,{attemptAgentWitchWatchdogReinstall:()=>s3});var s3,E0=l(()=>{"use strict";A0();C0();s3=async e=>Db(e,()=>k0())});var W0,R0,x0,i3,a3,l3,yl,$b=l(()=>{"use strict";i0();Tb();kb();Cb();Lb();vb();wm();_m();ze();us();c0();Tm();W0=e=>e===null?M():M(e),R0=async(e,t,r)=>{if(!await No(e))return"not_running";let n=W0(t);if(kt(n))return"healthy";let s=he(n);return Ee(s,r)?"stale_connection":"healthy"},x0=async e=>{let t=e?.staleAfterMs??12e4,r=C(),o=ne(r);return Promise.all(o.map(async n=>{let s=await R0(n.launchAgentLabel,n.profileEmail,t),i=W0(n.profileEmail),a=he(i),c=await No(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Ee(a,t),needsRevive:s!=="healthy",reason:s}}))},i3=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},a3=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",l3=async e=>{let t=await Ne(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(f0(),g0)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},yl=async e=>{if(!Tt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=C();await xs(r),await fl(r);let o=ne(r),n=[];for(let u of o){let m=await R0(u.launchAgentLabel,u.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:m});continue}n.push(await l3({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let u=Mo();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(E0(),L0)),m=await u(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(u){s=!0,i=!1,a=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&p0({event:a3(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:i3(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var I0,km,O0=l(()=>{"use strict";I0=g(require("node:os"));Tb();Tm();$b();km=async()=>{let e=await x0(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:I0.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Is(1)[0]??null}}});var Hb=l(()=>{"use strict";vb();$b();O0();Tm()});var Sl,Al,bl,M0=l(()=>{"use strict";se();Hb();Sl=async()=>{await xs();let e=ne(),t=[];for(let r of e){let o=await Ne(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Mo();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Al=yl,bl=yl});var Fb=l(()=>{"use strict";M0()});var Lm,Cm,N0,Ub,z0,c3,d3,u3,p3,m3,Em,D0=l(()=>{"use strict";Lm=require("node:child_process"),Cm=g(require("node:fs")),N0=g(require("node:os")),Ub=g(require("node:path")),z0=require("node:util");se();J();c3=(0,z0.promisify)(Lm.execFile),d3=()=>Ub.default.join(N0.default.homedir(),"Library","LaunchAgents"),u3=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await c3("launchctl",["bootout",r]).catch(()=>{})},p3=e=>{let t=Ub.default.join(d3(),`${e}.plist`);Cm.default.existsSync(t)&&Cm.default.unlinkSync(t)},m3=e=>{(0,Lm.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Em=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=C();if(!Cm.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=fr(e);for(let r of t)await u3(r),p3(r);return m3(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var j0,Wm,$0,Ms,H0,g3,f3,h3,Bb,y3,Gb,F0=l(()=>{"use strict";j0=require("node:child_process"),Wm=g(require("node:fs")),$0=g(require("node:os")),Ms=g(require("node:path")),H0=require("node:util");se();g3=(0,H0.promisify)(j0.execFile),f3=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],h3=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],Bb=e=>{Wm.default.existsSync(e)&&Wm.default.rmSync(e,{force:!0})},y3=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await g3("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},Gb=async e=>{let r=(e.listLaunchAgentLabels??fr)(e.layout.installDir),o=e.launchAgentsDir??Ms.default.join($0.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??y3;for(let i of r)await n(i),Bb(Ms.default.join(o,`${i}.plist`));let s=Ms.default.dirname(e.layout.configPath);for(let i of f3)Bb(Ms.default.join(s,i));for(let i of h3)Bb(Ms.default.join(e.layout.installDir,i));return Wm.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var qb,U0=l(()=>{"use strict";qb="unknown_identity"});var Vb=l(()=>{"use strict";ub();U0()});var S3,Kb,B0=l(()=>{"use strict";Vb();S3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Kb=e=>e.type!=="system.error"||!S3(e.payload)?!1:e.payload.errorCode===qb});var Jb=l(()=>{"use strict";D0();F0();B0()});var Rm=l(()=>{"use strict";se();Kt();Jb();Hb()});var Ns,xm,Im=l(()=>{"use strict";Rm();Ns=(e=20)=>Is(e),xm=km});var Om,zs,Mm,Nm=l(()=>{"use strict";Rm();Om=Jo,zs=(e=20)=>qo(e),Mm=e=>Ko(e)});var zm,Yb=l(()=>{"use strict";Rm();zm=()=>Em()});var G0=l(()=>{"use strict";nA();qA();_b();Fb();Im();Nm();Yb()});var q0={};Ut(q0,{buildAgentWitchAutomationStatusFromWakeServer:()=>gl,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Om,buildAgentWitchWakeHealthResponse:()=>Ha,buildAgentWitchWakeIdentityResponse:()=>Fa,buildAgentWitchWatchdogStatus:()=>xm,installHarnessFromWakeServer:()=>rl,readAgentWitchSelfUpdateLogEntries:()=>zs,readAgentWitchWatchdogLogEntries:()=>Ns,restartAgentWitchFromWakeServer:()=>bl,reviveAgentWitchWebSocketFromWakeServer:()=>Al,runAgentWitchSelfUpdateFromWakeServer:()=>Mm,runAgentWitchUninstallLocalFromWakeServer:()=>zm,runAutomationFromWakeServer:()=>ml,syncAutomationsFromWakeServer:()=>pl,wakeAgentWitchLaunchAgents:()=>Sl});var V0=l(()=>{"use strict";G0()});var K0,J0,Xb,Zb,Y0=l(()=>{"use strict";K0=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),J0=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?K0(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?K0(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},Xb=e=>{let t=e.watchdogLogs.map(J0).join(""),r=e.updateLogs.map(J0).join("");return`<!doctype html>
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
</html>`},Zb=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var X0,Z0,Q0=l(()=>{"use strict";X0=g(require("node:net")),Z0=()=>new Promise((e,t)=>{let r=X0.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var eI,A3,Qb,tI=l(()=>{"use strict";eI=g(require("node:net"));Q0();$a();ja();ze();A3=e=>new Promise(t=>{let r=eI.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Qb=async()=>{let e=C(),t=Lt();if(await A3(t))return qW(t),t;let r=await Z0();return Wp(e,r),r}});var b3,eP,rI=l(()=>{"use strict";b3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eP=e=>({force:b3(e)&&e.force===!0})});var Pl=l(()=>{"use strict";el();Y0();tI();rI();Dy();Ku();Fo()});var tP,j,rP,oP,wl,oI=l(()=>{"use strict";tP=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},rP=e=>{e.writeHead(403),e.end()},oP=e=>e.url?.split("?")[0]??"/",wl=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var Wt=l(()=>{"use strict";oI()});var P3,nI,sI=l(()=>{"use strict";_b();Wt();P3=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},nI=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,gl(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await P3(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=pl(t);return j(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await ml(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var w3,aI,iI,lI,nP,cI,sP=l(()=>{"use strict";w3=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],aI=e=>/embed|minilm|^bge-/i.test(e),iI=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),lI=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),nP=e=>e.filter(t=>t.trim().length>0&&!aI(t)),cI=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!aI(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>iI(s,o));if(n!==void 0)return n}for(let n of w3){let s=r.find(i=>iI(i,n));if(s!==void 0)return s}return r[0]??null}});var iP,pI,mI,Dm,gI,dI,uI,_3,v3,T3,k3,C3,L3,Rt,_l=l(()=>{"use strict";iP=require("node:child_process"),pI=g(require("node:fs")),mI=g(require("node:os")),Dm=g(require("node:path"));Kt();Ct();sP();gI=3e3,dI=["claude-cli","codex","cursor","antigravity"],uI={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},_3=(e,t)=>new Promise(r=>{let o=(0,iP.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},gI);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),v3=()=>{let e=mI.default.homedir();return["ollama",Dm.default.join(e,".local","bin","ollama"),Dm.default.join(e,".agent-witch","ollama","ollama"),Dm.default.join(e,".local-agent-witch","ollama","ollama")]},T3=e=>new Promise(t=>{let r=(0,iP.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},gI);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(lI(Buffer.concat(o).toString("utf8")))})}),k3=async()=>{for(let e of v3()){if(e!=="ollama"&&!pI.default.existsSync(e))continue;let t=await T3(e);if(t!==null)return t}return[]},C3=e=>{let t=e.installedWriterIds.map(s=>uI[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=ge(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${uI[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},L3=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:ps},Rt=async e=>{let t=dI.map(i=>{let a=fp(i,e.commands);return _3(a.command,a.args)}),[r,...o]=await Promise.all([k3(),...t]),n=dI.flatMap((i,a)=>o[a]===!0?[i]:[]),s=cI(r,L3());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:C3({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var E3,W3,aP,fI=l(()=>{"use strict";E3="http://127.0.0.1:11434",W3=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},aP=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||E3;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?W3(await o.json()):null}catch{return null}}});var lP=l(()=>{"use strict";Ct();_l();fI();sP()});var R3,hI,yI=l(()=>{"use strict";lP();R3={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},hI=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:R3[t]})),ollamaModels:nP(e.ollamaModels)})});var x3,SI,AI=l(()=>{"use strict";lP();Wt();yI();x3=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},SI=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Rt({commands:fe({})});return j(e.response,200,{ok:!0,...hI({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await x3(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await aP({model:r,prompt:o});return n===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var I3,bI,PI=l(()=>{"use strict";qA();Wt();I3=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},bI=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await I3(e);if(t===null)return!0;let r=rl(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var wI=l(()=>{"use strict";er()});var cP,_I=l(()=>{"use strict";wI();tl();cP=e=>{if(!wr(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Ge({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var vI,dP,uP=l(()=>{"use strict";le();er();tl();vI=e=>{if(!wr(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},dP=async e=>{let t=vI(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=po("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=$();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=X({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Ge({projectFolderPath:r}),await ll(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var TI=l(()=>{"use strict";_I();uP()});var kI,CI=l(()=>{"use strict";TI();uP();Wt();kI=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=cP(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await dP(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,o,r,e.cors.headers),!0}return!1}});var LI,EI=l(()=>{"use strict";Pl();Nm();Im();LI=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Ns(50),r=zs(50);return e.response.writeHead(200,Zb()),e.response.end(Xb({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var WI,RI=l(()=>{"use strict";nA();Wt();WI=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,Ha(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,Fa(),e.cors.headers),!0):!1});var xI,II=l(()=>{"use strict";Yb();Wt();xI=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await zm();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var OI,MI=l(()=>{"use strict";Fb();Wt();OI=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Al();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await bl();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Sl();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var NI,zI=l(()=>{"use strict";Pl();Nm();Wt();NI=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Om();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=wl(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:zs(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=eP(t),o=await Mm({force:r});return j(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var DI,jI=l(()=>{"use strict";Im();Wt();DI=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await xm();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=wl(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:Ns(t)},e.cors.headers),!0}return!1}});var $I,HI=l(()=>{"use strict";sI();AI();PI();CI();EI();RI();II();MI();zI();jI();$I=[WI,LI,DI,OI,NI,xI,bI,kI,nI,SI]});var FI,UI=l(()=>{"use strict";HI();FI=async e=>{for(let t of $I)if(await t(e))return!0;return!1}});var O3,BI,GI=l(()=>{"use strict";el();Wt();UI();O3=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:oP(e),readJsonBody:()=>tP(e)}),BI=async(e,t,r)=>{let o=e.headers.origin,n=am(o);try{if(o!==void 0&&o.length>0&&!n.allowed){rP(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=O3(e,t,r,n);if(await FI(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var qI,mn,jm,$m=l(()=>{"use strict";qI=g(require("node:http"));Pl();GI();mn=async()=>{let e=await Qb(),t=qI.default.createServer((r,o)=>{BI(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},jm=mn});var VI={};Ut(VI,{runAgentWitchBridgeCli:()=>M3});var M3,KI=l(()=>{"use strict";se();$m();M3=async()=>{nt("agent-witch-bridge");let e=await mn(),t=yr(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var JI=l(()=>{"use strict";gt()});var Ds,pP,YI=l(()=>{"use strict";Ds=(e,t,r)=>e===1?t:r,pP=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Ds(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Ds(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${Ds(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Ds(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Ds(d,"month","months")} ago`;let u=Math.floor(a/365);return`${u} ${Ds(u,"year","years")} ago`}});var gn,mP,N3,z3,gP,mo,vl,fP,XI=l(()=>{"use strict";gn=g(require("node:fs")),mP=g(require("node:path")),N3="local-ws-traffic.ndjson",z3=500,gP=e=>mP.default.join(e.logsDir,N3),mo=(e,t)=>{let r=gP(e);gn.default.mkdirSync(mP.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});gn.default.appendFileSync(r,`${o}
`,"utf8")},vl=(e,t=z3)=>{let r=gP(e);if(!gn.default.existsSync(r))return[];let n=gn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},fP=e=>{let t=gP(e);gn.default.existsSync(t)&&gn.default.writeFileSync(t,"","utf8")}});var D3,ZI,QI,eO=l(()=>{"use strict";Vb();D3=new Set(Object.values(hm)),ZI=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),QI=e=>{if(!ZI(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!D3.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!ZI(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var tO,rO=l(()=>{"use strict";tO=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var j3,$3,H3,Tl,oO=l(()=>{"use strict";rO();j3=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,$3=e=>j3.test(e),H3=e=>tO(e),Tl=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>Tl(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&$3(o)){r[o]=H3(n);continue}r[o]=Tl(n)}return r}});var tr,hP,F3,U3,B3,yP,nO,sO,iO,G3,Hm,fn,Fm,SP,aO=l(()=>{"use strict";tr=g(require("node:fs")),hP=g(require("node:path"));eO();oO();F3="local-ws-trace.ndjson",U3=1e4,B3=1440*60*1e3,yP=e=>hP.default.join(e.logsDir,F3),nO=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},sO=e=>{if(!tr.default.existsSync(e))return;let t=tr.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-B3,n=t.filter(s=>{let i=nO(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-U3);tr.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},iO=(e,t)=>{let r=yP(e);tr.default.mkdirSync(hP.default.dirname(r),{recursive:!0}),tr.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),sO(r)},G3=e=>e.parsed===null?{_empty:!0}:Tl(e.parsed),Hm=(e,t,r)=>{let o=QI(r);iO(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:G3(o)})},fn=(e,t)=>{iO(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Tl({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Fm=(e,t=80)=>{let r=yP(e);if(sO(r),!tr.default.existsSync(r))return[];let o=tr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=nO(s);i!==null&&n.push(i)}return n.reverse()},SP=e=>{let t=yP(e);tr.default.existsSync(t)&&tr.default.writeFileSync(t,"","utf8")}});var go,lO,q3,AP,Um,cO=l(()=>{"use strict";go=g(require("node:fs")),lO=g(require("node:path")),q3=256e3,AP=e=>{go.default.mkdirSync(lO.default.dirname(e),{recursive:!0}),go.default.writeFileSync(e,"","utf8")},Um=(e,t=q3)=>{if(!go.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=go.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=go.default.openSync(e,"r");try{go.default.readSync(a,i,0,s,n)}finally{go.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var kl=l(()=>{"use strict";XI();aO();cO()});var bP,PP,dO=l(()=>{"use strict";bP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),PP=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${bP(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${bP(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${bP(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var uO=l(()=>{"use strict";dO()});var wP,_P=l(()=>{"use strict";wP=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var vP=l(()=>{"use strict";wa()});var TP,kP,pO=l(()=>{"use strict";vP();TP=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},kP=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var mO=l(()=>{"use strict";_P();pO()});var gO,Cl,CP,Ll=l(()=>{"use strict";_P();gO=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Cl=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=gO(e),r=gO(wP(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},CP=`(function () {
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
})();`});var hn,V3,LP,fO=l(()=>{"use strict";hn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),V3=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},LP=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${hn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?hn(r.direction):hn(r.kind),i=`trace-body-${o}`,a=hn(V3(r.body));return`<tr>
        <td title="${hn(r.at)}">${hn(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${hn(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var yO,K3,hO,EP,SO=l(()=>{"use strict";Me();gt();yO=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},K3=e=>yO(e)===mr?Yn:Jn,hO=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),EP=e=>{let t=K3(e.installDir),o=`AW_HOME="$HOME/${yO(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${hO(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${hO(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var AO=l(()=>{"use strict";Ll();fO();SO();Ll()});var J3,kr,El=l(()=>{"use strict";J3=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),kr=J3});var bO,PO,wO,_O,vO,TO,kO,js=l(()=>{"use strict";bO="projects",PO="knowledge",wO="chunks.ndjson",_O="lessons.ndjson",vO="error-chunks.ndjson",TO="usage-stats.json",kO="knowledge-location.json"});var Bm,Y3,Gm,WP=l(()=>{"use strict";Bm=g(require("node:path"));js();Y3=(e,t)=>{let r=t.trim(),o=Bm.default.join(e.installDir,bO,r,PO);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:Bm.default.join(o,wO),memoryRunsFilePath:Bm.default.join(o,_O)}},Gm=Y3});var RP,X3,CO,LO=l(()=>{"use strict";RP=g(require("node:fs"));js();nn();X3=e=>{let t=ft(e.projectFolderPath),r=`${t.metaDirPath}/${kO}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};RP.default.mkdirSync(t.metaDirPath,{recursive:!0}),RP.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},CO=X3});var $s,WO,EO,Z3,RO,xO=l(()=>{"use strict";$s=g(require("node:fs")),WO=g(require("node:path"));$o();nn();WP();LO();EO=(e,t)=>{$s.default.existsSync(e)&&($s.default.existsSync(t)&&$s.default.statSync(t).size>0||($s.default.mkdirSync(WO.default.dirname(t),{recursive:!0}),$s.default.copyFileSync(e,t)))},Z3=e=>{let t=ft(e.projectFolderPath),r=Gm(e.layout,e.projectId),o=`${t.memoryDirPath}/${ss}`;EO(t.ragChunksFilePath,r.ragChunksFilePath),EO(o,r.memoryRunsFilePath),CO({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},RO=Z3});var xP,Q3,IO,OO=l(()=>{"use strict";xP=g(require("node:fs"));nn();Q3=e=>{let t=ft(e);if(!xP.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(xP.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},IO=Q3});var MO,e6,Hs,qm=l(()=>{"use strict";MO=g(require("node:path"));$o();nn();xO();OO();WP();e6=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=IO(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){RO({layout:e.layout,projectFolderPath:t,projectId:o});let s=Gm(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=ft(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:MO.default.join(n.memoryDirPath,ss),projectId:null}},Hs=e6});var Vm,r6,Km,IP=l(()=>{"use strict";Vm=g(require("node:fs"));js();r6=(e,t=500)=>{if(!Vm.default.existsSync(e))return;let r=Vm.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Vm.default.writeFileSync(e,`${o.join(`
`)}
`)},Km=r6});var Jm,o6,yn,OP=l(()=>{"use strict";Jm=g(require("node:path"));js();qm();o6=e=>{let t=Hs(e);if(t===null)return null;let r=Jm.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Jm.default.join(r,TO),errorChunksFilePath:Jm.default.join(r,vO)}},yn=o6});var zO,Wl,DO,NO,MP,jO,i6,NP,$O,zP,DP,jP,$P=l(()=>{"use strict";zO=require("node:crypto"),Wl=g(require("node:fs")),DO=g(require("node:path"));El();js();OP();NO=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),MP=e=>{if(!Wl.default.existsSync(e))return NO();try{let t=JSON.parse(Wl.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return NO()},jO=(e,t)=>{Wl.default.mkdirSync(DO.default.dirname(e),{recursive:!0}),Wl.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},i6=e=>{let t=kr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,zO.createHash)("sha256").update(o).digest("hex").slice(0,16)},NP=e=>{let t=yn(e);return t===null?null:MP(t.usageStatsFilePath)},$O=e=>{if(e.chunkIds.length===0)return;let t=yn(e);if(t===null)return;let r=MP(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;jO(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},zP=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=yn(e);if(r===null)return null;let o=i6(t),n=MP(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return jO(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},DP=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,jP=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var Rl,HO,a6,l6,FO,c6,HP,xl,Fs,FP,Us,UP,BP=l(()=>{"use strict";Rl=g(require("node:fs")),HO=g(require("node:path"));El();qm();IP();$P();a6="http://127.0.0.1:11434",l6="nomic-embed-text",FO=(e,t,r)=>Hs({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,c6=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},HP=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},xl=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||a6,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||l6;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},Fs=(e,t,r)=>{let o=FO(e,t,r);if(o===null||!Rl.default.existsSync(o))return[];let n=Rl.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},FP=async e=>{let t=kr(e.text),r=HP(t);if(r.length===0)return 0;let o=FO(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;Rl.default.mkdirSync(HO.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await xl(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};Rl.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return Km(o),n},Us=async e=>{let t=await xl(e.query);if(t===null)return[];let r=e.minScore??0,s=Fs(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:c6(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return $O({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},UP=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Il,UO,d6,u6,GP,qP,VP,BO=l(()=>{"use strict";Il=g(require("node:fs")),UO=g(require("node:path"));El();OP();IP();BP();d6=e=>{if(!Il.default.existsSync(e))return[];let t=Il.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},u6=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},GP=async e=>{let t=yn(e);if(t===null)return 0;let r=kr(e.text),o=HP(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;Il.default.mkdirSync(UO.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await xl(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};Il.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Km(n,200),s},qP=async e=>{let t=yn(e);if(t===null)return[];let r=await xl(e.query);if(r===null)return[];let o=e.minScore??.3;return d6(t.errorChunksFilePath).map(s=>({chunk:s,score:u6(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},VP=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var KP=l(()=>{"use strict";BP();$P();BO()});var be,JP,YP=l(()=>{"use strict";db();be=cb,JP=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${be.gray50};
  --aw-zinc-100: ${be.gray100};
  --aw-zinc-200: ${be.gray200};
  --aw-zinc-400: ${be.gray400};
  --aw-zinc-500: ${be.gray500};
  --aw-zinc-600: ${be.gray600};
  --aw-zinc-700: ${be.gray700};
  --aw-zinc-800: ${be.gray900};
  --aw-zinc-900: ${be.gray900};
  --aw-brand-600: ${be.brand600};
  --aw-brand-700: ${be.brand700};
  --aw-brand-50: ${be.brand50};
  --aw-emerald-50: ${be.success50};
  --aw-emerald-700: ${be.success700};
  --aw-amber-50: ${be.warning50};
  --aw-amber-900: ${be.warning900};
  --aw-red-50: ${be.error50};
  --aw-red-700: ${be.error700};
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
`.trim()});var p6,m6,XP,GO,ZP,qO=l(()=>{"use strict";YP();Ll();p6=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,m6=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],XP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GO=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${p6}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,ZP=e=>{let t=m6.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=XP(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=XP(e.installBundleVersionLabel?.trim()??"unknown"),s=GO("brand brand-in-sidebar",n),i=GO("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${XP(e.title)} \xB7 Agent Witch Local</title>
  <style>${JP}</style>
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
  <script>${CP}</script>
</body>
</html>`}});var Ym,Ol,Xm=l(()=>{"use strict";Ym=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ol=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Ym(e.syncMessage)}</p>`:"",o=Ym(e.manageHref),n=Ym(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Ym(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var QP,ew,tw,VO=l(()=>{"use strict";QP=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,ew=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,tw=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var KO=l(()=>{"use strict";qO();Xm();VO()});var Bs,rw,JO=l(()=>{"use strict";Ll();Bs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rw=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Bs(e.wakeError)}</div>`:"",a=Cl(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Bs(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${Bs(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Bs(o)}</p>
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
        <p class="home-card-meta">${Bs(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Bs(n)}</p>
      </a>
    </div>`}});var YO=l(()=>{"use strict";JO()});var E,Gs=l(()=>{"use strict";E=e=>e==="passed"||e==="stopped"||e==="failed"});var XO,ow,Sn,nw,Zm=l(()=>{"use strict";XO="Stopped at the round limit. The best prompt is kept.",ow="Stopped because the score stopped rising. The best prompt is kept.",Sn="Finished. The best prompt is the result.",nw="Wizard ended. Progress from finished steps is kept."});var fo,sw=l(()=>{"use strict";fo=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var g6,f6,Ml,ZO,Qm=l(()=>{"use strict";g6=/\n+|;\s+/,f6=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,Ml=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(g6).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,f6(s)]},[]);return[...t,...o]},[]),ZO=e=>{let t=Ml(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ce,qs=l(()=>{"use strict";ce=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Nl,iw=l(()=>{"use strict";Qm();qs();Nl=e=>{let t=[...e.priorRounds,e.current],r=ce(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:ZO(o)}}});var aw,h6,y6,eg,lw=l(()=>{"use strict";aw={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},h6=e=>{try{let t=JSON.parse(e.fragment);return{...aw,objects:[...e.objects,t]}}catch{return{...aw,objects:e.objects}}},y6=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:h6(r)},eg=e=>[...e].reduce(y6,aw).objects});var S6,cw,A6,QO,dw=l(()=>{"use strict";lw();S6=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},cw=e=>{let t=eg(e).filter(S6),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},A6=(e,t)=>({...e,passed:e.score>=t}),QO=(e,t)=>{let r=cw(e);return r===null?null:A6(r,t)}});var uw,pw,tg=l(()=>{"use strict";uw="The judge reply needs a score and a reason.",pw="The improver reply was empty."});var eM,tM=l(()=>{"use strict";eM=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var rM,oM=l(()=>{"use strict";rM=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var P6,nM,sM=l(()=>{"use strict";tM();oM();Zm();Qm();P6=e=>{let t=Ml(e);return t.length===0?ow:`${ow} Avoid: ${t.join("; ")}.`},nM=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:XO};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(eM(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:P6(rM(r))}}return null}});var ho,w6,An,iM,rg=l(()=>{"use strict";ho=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},w6=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,An=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",w6(e.tokens),`Delay: ${ho(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},iM=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var _6,aM,lM=l(()=>{"use strict";dw();_6=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,aM=e=>{let r=(_6.exec(e)?.[1]??e).trim();return r.length===0||cw(r)!==null?null:r}});var cM,og,dM=l(()=>{"use strict";rg();lM();tg();cM=e=>({type:"call",role:"judge",choice:e.choice,prompt:iM({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),og=e=>{let t=aM(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:pw}}:{nextPrompt:t,continuation:cM({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var mw,uM=l(()=>{"use strict";sw();iw();dw();tg();Zm();sM();tg();dM();mw=e=>{let t=QO(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:uw}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=nM({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=Nl({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:fo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var zl,gw=l(()=>{"use strict";zl=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var pM=l(()=>{"use strict"});var mM=l(()=>{"use strict";pM()});var bn,gM=l(()=>{"use strict";bn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var v6,fw,fM=l(()=>{"use strict";rg();v6=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,fw=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",v6(e.tokens),`Delay: ${ho(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var T6,k6,C6,hw,hM=l(()=>{"use strict";T6=/[A-Za-z0-9_./~-]{3,180}/g,k6=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,C6=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||k6.test(t)},hw=(e,t=12)=>{let r=[];for(let o of e.matchAll(T6)){let n=o[0].replace(/\.+$/,"");if(!(!C6(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var Dl,yM=l(()=>{"use strict";Dl=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var ng,yw,SM,jl,Sw=l(()=>{"use strict";ng=e=>Math.floor(e/2),yw=e=>Math.max(ng(e)+1,e-20),SM=(e,t)=>e>=t?"passes":e>=yw(t)?"close":e>=ng(t)?"weak":"bad",jl=e=>[{band:"bad",label:`0\u2013${ng(e)-1} bad`},{band:"weak",label:`${ng(e)}\u2013${yw(e)-1} weak`},{band:"close",label:`${yw(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var sg,Aw=l(()=>{"use strict";Sw();sg=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${SM(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var xt,bw=l(()=>{"use strict";xt=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var AM,bM=l(()=>{"use strict";AM=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var L6,E6,PM,wM=l(()=>{"use strict";Gs();Aw();bw();bM();L6=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],E6=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",PM=e=>{let t=e.wizard;if(t===void 0)return[];let r=xt(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=L6.map((h,y)=>{let p=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:h,state:p,detail:null}}).filter((h,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=sg(e),d=c.filter(h=>h.id==="round-0"),u=AM(t)&&(!n||a)?c.filter(h=>h.id!=="round-0"):[],m=E(e.status)&&!s,S=m?[{id:"end",label:E6(e),state:"done",detail:e.errorMessage}]:[];if(m&&S.length>0){let h=Math.min(r,i.length),y=i.slice(0,h).map(p=>({...p,state:"done"}));return[...d,...y,...S,...u]}return[...d,...i,...u,...S]}});var W6,Pw,_M=l(()=>{"use strict";Gs();Aw();wM();W6=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",Pw=e=>{if(e.wizard!==void 0)return PM(e);let t=sg(e),r=E(e.status)?[{id:"end",label:W6(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var $l,vM=l(()=>{"use strict";$l=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var TM=l(()=>{"use strict";gt()});var kM,Hl,Fl,Ks,ig,ww,CM=l(()=>{"use strict";TM();kM="/prompt-optimizer/agent",Hl=`${Sr}${kM}`,Fl=`${Sr}/prompt-optimizer`,Ks="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",ig=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${Ks}`,ww="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var rr=l(()=>{"use strict"});var ie,Ul=l(()=>{"use strict";rr();ie=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var _w,LM=l(()=>{"use strict";_w="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var EM,WM=l(()=>{"use strict";EM=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Bl,xM=l(()=>{"use strict";WM();rr();Bl=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:EM(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var vw,IM=l(()=>{"use strict";rr();vw=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var Tw,OM=l(()=>{"use strict";rr();Tw=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var MM,Gl,NM=l(()=>{"use strict";MM=["generalize","evaluate","separate","optimize_modules"],Gl=(e,t)=>{let r=MM.indexOf(t);if(r===-1)return e;let o=MM.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var ag,kw=l(()=>{"use strict";Qm();ag=e=>{let t=Ml(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var ql,zM=l(()=>{"use strict";kw();ql=e=>{let t=ag(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var x6,I6,O6,DM,jM=l(()=>{"use strict";x6=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),I6=/^\{\{[a-zA-Z0-9_-]+\}\}$/,O6=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(x6(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let u=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),u}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},DM=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>I6.test(n)?n:O6(n,r)).join("")}});var Cw,$M=l(()=>{"use strict";jM();Cw=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:DM(o.prompt,t)}))}))});var M6,Vl,HM=l(()=>{"use strict";rr();kw();M6=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Vl=e=>{let t=ag(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=M6(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Kl,FM=l(()=>{"use strict";gw();Kl=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return zl({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Jl,Ew=l(()=>{"use strict";qs();Jl=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ce(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var Ww,UM=l(()=>{"use strict";Ew();Ww=e=>{let t=Jl({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Pn,BM=l(()=>{"use strict";Pn=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var N6,z6,re,lg=l(()=>{"use strict";Ul();N6=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},z6=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,re=e=>{let t=ie(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:N6(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>z6(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var GM,qM=l(()=>{"use strict";Ul();lg();GM=e=>{let t=re(e.wizard),r=ie(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var Rw,VM=l(()=>{"use strict";qM();Rw=e=>{let t=GM({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var D6,KM,JM=l(()=>{"use strict";D6=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},KM=e=>[...e].reduce(D6,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var j6,YM,XM=l(()=>{"use strict";j6=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},YM=e=>[...e].reduce(j6,{out:"",inString:!1,escaped:!1}).out});var $6,H6,ZM,QM=l(()=>{"use strict";JM();XM();$6=e=>e.charCodeAt(0)===65279?e.slice(1):e,H6=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},ZM=e=>YM(KM(H6($6(e))))});var F6,U6,B6,eN,G6,Js,cg=l(()=>{"use strict";lw();QM();F6=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},U6=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},B6=e=>[...e].reduce(U6,{out:"",inString:!1,escaped:!1}).out,eN=e=>{let t=eg(e);return t.length===0?null:t[t.length-1]},G6=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Js=e=>{let t=ZM(F6(e)),r=eN(t);if(r!==null)return r;let o=B6(t),n=eN(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw G6(i)}}});var q6,V6,xw,tN,rN=l(()=>{"use strict";q6=/^[a-z0-9][a-z0-9-]{0,62}$/,V6=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return q6.test(t)?t:""},xw=e=>e.replace(/\s+/gu," ").trim(),tN=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=V6(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=xw(n.name),a=xw(n.description),c=xw(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var oN,nN,sN=l(()=>{"use strict";oN=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},nN=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var Iw,iN=l(()=>{"use strict";cg();rN();sN();Iw=(e,t)=>{let r=(()=>{try{return Js(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(oN(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(nN).filter(a=>a!==null),i=tN({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var Ow,aN=l(()=>{"use strict";Ow=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var Mw,lN=l(()=>{"use strict";Mw=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var Nw,cN=l(()=>{"use strict";Ul();lg();Nw=e=>{let t=re(e.wizard),r=ie(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var Yl,dN=l(()=>{"use strict";Yl=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var It,K6,zw,uN=l(()=>{"use strict";It=g(rs());cg();K6=(0,It.isType)({name:It.isNonEmptyString,description:It.isString,sampleValue:It.isString}),zw=e=>{let t=Js(e);if(!(0,It.isType)({templatedPrompt:It.isNonEmptyString,variables:(0,It.isArrayWithEachItem)(K6)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var de,J6,Y6,Dw,pN=l(()=>{"use strict";de=g(rs());rr();cg();J6=(0,de.isType)({id:de.isNonEmptyString,title:de.isNonEmptyString,prompt:de.isNonEmptyString,order:de.isNumber}),Y6=(0,de.isType)({id:de.isNonEmptyString,title:de.isNonEmptyString,summary:de.isString,topology:(0,de.isOneOf)("chain","parallel"),modules:(0,de.isArrayWithEachItem)(J6),recommended:de.isBoolean}),Dw=e=>{let t=Js(e);if(!(0,de.isType)({options:(0,de.isArrayWithEachItem)(Y6)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Ys,mN=l(()=>{"use strict";Ys=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var X6,jw,$w=l(()=>{"use strict";X6=/\{\{([a-zA-Z0-9_-]+)\}\}/g,jw=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(X6,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Ot,Mt,gN=l(()=>{"use strict";qs();$w();Ot=e=>jw(e.templatedPrompt,e.variables),Mt=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ce(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Ot(e.wizard)}});var Z6,wn,fN=l(()=>{"use strict";Z6=/\{\{([a-zA-Z0-9_-]+)\}\}/g,wn=(e,t)=>e.replace(Z6,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var Q6,_n,dg=l(()=>{"use strict";Q6=/\{\{([a-zA-Z0-9_-]+)\}\}/g,_n=e=>{let t=new Set,r=[];for(let o of e.matchAll(Q6)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Xl,hN=l(()=>{"use strict";dg();Xl=e=>e.variables.length>0||_n(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var Hw,Fw=l(()=>{"use strict";rr();Hw=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Zl,yN=l(()=>{"use strict";qs();Fw();Zl=e=>{let t=e.wizard.evaluateSelectedRound??ce(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:Hw(r.judgement,e.passScore)}});var Ql,SN=l(()=>{"use strict";Ql=e=>e.length===1&&e[0].modules.length===1});var Uw,AN=l(()=>{"use strict";Uw=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Pe,ug,ec=l(()=>{"use strict";Pe=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),ug=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var bN,PN=l(()=>{"use strict";ec();bN=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Pe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Pe("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Pe("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var wN,_N=l(()=>{"use strict";Gs();ec();wN=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!E(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Pe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),Pe("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Pe("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",ug(e.writerLabel,e.folder)),Pe("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Pe("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var vN,TN=l(()=>{"use strict";ec();vN=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Pe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Pe("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Pe("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var kN,CN=l(()=>{"use strict";ec();kN=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Pe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Pe("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",ug(e.writerLabel,e.folder)),...r?[Pe("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var pg,LN=l(()=>{"use strict";Gs();PN();_N();TN();CN();pg=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(E(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return wN(r);case"evaluate":return bN({...r,currentRound:e.currentRound});case"separate":return kN(r);case"optimize_modules":return vN({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var tc,Cr,EN=l(()=>{"use strict";tc=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),Cr=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var eJ,mg,Bw,WN=l(()=>{"use strict";dg();eJ="wizardParam_",mg=e=>`${eJ}${e}`,Bw=e=>{let t=_n(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=mg(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var ct,RN=l(()=>{"use strict";ct=["generalize","evaluate","separate","optimize_modules"]});var rc,vn,Xs,Lr=l(()=>{"use strict";rc="Stopped because the confirmed token or spend budget was exceeded.",vn="Approaching the confirmed budget. Further trials may hard-stop.",Xs="Confirm the Step 4 token and spend budget before optimizing modules."});var dt,Zs=l(()=>{"use strict";dt=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var zt,oc=l(()=>{"use strict";Lr();zt=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var tJ,Er,nc=l(()=>{"use strict";Lr();tJ={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},Er=e=>{let t=e?.trim()??"";return t.length===0?.01:tJ[t]??.01}});var gg,Gw=l(()=>{"use strict";Lr();nc();gg=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=Er(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var xN,hg,qw,Vw=l(()=>{"use strict";Lr();Zs();oc();Gw();nc();xN=e=>{let t=gg({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??Er(e.writerId)??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:dt({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},hg=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),qw=e=>{let t=e.existing??zt(),r=xN({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return hg(t,r)}});var Qs,sc,MN=l(()=>{"use strict";Lr();rr();Zs();oc();Vw();Gw();nc();Qs=e=>{let t=gg({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??Er(e.writerId),i=r*4e3,a=n*o*8e3,c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:dt({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},sc=e=>{let t=e.existing??zt();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=Qs({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return hg(t,r)}});var Wr,NN=l(()=>{"use strict";Zs();Lr();oc();Wr=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??zt(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=dt({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var Jw,ei,zN=l(()=>{"use strict";Lr();Zs();Jw=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=dt({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:rc,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:rc,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,u=s!==null&&s>0&&o>=s*c;return(d||u)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:vn,costControls:{...t,softWarnFired:!0,softWarnMessage:vn}}:null},ei=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var Yw,DN=l(()=>{"use strict";Yw=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var W=l(()=>{"use strict";Gs();Zm();uM();sw();rg();gw();mM();gM();fM();hM();iw();yM();qs();_M();bw();Sw();vM();CM();rr();Ul();LM();xM();IM();OM();NM();zM();$M();HM();FM();Ew();UM();BM();lg();VM();iN();aN();lN();cN();dN();uN();pN();mN();gN();$w();fN();dg();hN();yN();SN();Fw();AN();LN();EN();WN();RN();Lr();Zs();oc();Vw();MN();nc();NN();zN();DN()});var Xw=l(()=>{"use strict";Ca()});var rJ,HN,FN=l(()=>{"use strict";Xw();rJ=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,HN=e=>{let t=Zo(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(rJ)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var BN,oJ,nJ,or,sJ,iJ,UN,Sg,GN,aJ,ht,qN,VN,KN,Dt=l(()=>{"use strict";Xw();FN();BN=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),oJ=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,nJ=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,or=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(oJ.test(e.errorMessage))return"usage_limit";if(nJ.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},sJ="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",iJ="The writer waited on terminal input and did not return a prompt.",UN=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Sg=e=>{let t=e.trim();if(t.length===0||t.length>=500||!UN.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>UN.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},GN=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},aJ=e=>Sg(e.stdout)??Sg(e.stderr)??(GN(e.replyFile)?Sg(e.replyFile):null),ht=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return sJ;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?iJ:null},qN=e=>{let t=e.trim();return t.length===0?null:ht(t)!==null?t:Sg(t)??(GN(t)?t:null)},VN=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],KN=e=>{let t=e.replyFileText?.trim()??"",r=ht([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=aJ({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=or({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=HN([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Zo(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var lJ,YN,JN,kn,Ag=l(()=>{"use strict";Dt();lJ=400,YN=(e,t=lJ)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},JN=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:qN(e.promptText)},kn=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:JN(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=JN(e.revisions[n]);if(s!==null)return s.trim()}return null}});var x,cJ,bg,ae,Cn,ZN,XN,QN,ez,we=l(()=>{"use strict";x="manual",cJ=["claude-cli","codex","cursor","antigravity"],bg={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ae=e=>e===x?"You":e in bg?bg[e]:e,Cn=e=>cJ.filter(t=>e.includes(t)),ZN=e=>{let t=Cn(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},XN=(e,t)=>t===x?x:e.find(r=>r===t)??null,QN=(e,t,r)=>{let o=Cn(e),n=XN(o,t),s=XN(o,r);return n===null||s===null?null:{judge:n,improver:s}},ez=(e,t,r)=>{let o=Cn(e);return t===null||t.trim()===""?r!==x?r:o[0]??null:t===x?null:o.find(n=>n===t)??null}});var tz,Pg,Zw,Ln,Qw,ut,Rr,ue,Ve=l(()=>{"use strict";tz=g(require("node:fs")),Pg=g(require("node:os")),Zw=g(require("node:path"));rn();Ln="~",Qw=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,ut=e=>{let t=Pg.default.homedir(),r=Qw(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Rr=e=>{let t=e.trim().length===0?"~":e.trim(),r=Ye(t),o=Zw.default.isAbsolute(r)?Qw(r):Qw(Zw.default.resolve(Pg.default.homedir(),r));try{if(!tz.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:ut(o)}},ue=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Pg.default.homedir()});var Xe,yo=l(()=>{"use strict";Xe='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var e_,rz,dJ,oz,nz,t_=l(()=>{"use strict";W();we();Ve();yo();e_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rz=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',dJ=e=>{let t=rz(e.state),r=`<h2>${e_(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${e_(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Xe}</button></div><template>${r}</template></li>`},oz=e=>{let t=e.wizard;if(t===void 0)return"";let r=pg({status:e.status,wizard:t,writerLabel:ae(e.judgeModel),runnerLabel:ae(e.runnerModel??e.judgeModel),folderDisplay:ut(ue(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(dJ).join("")}</ol>`},nz=e=>{let t=e.wizard;if(t===void 0)return"";let r=pg({status:e.status,wizard:t,writerLabel:ae(e.judgeModel),runnerLabel:ae(e.runnerModel??e.judgeModel),folderDisplay:ut(ue(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${rz(n.state)}<span class="sdlc-pipeline-label">${e_(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var jt,sz,iz,az,r_=l(()=>{"use strict";W();jt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sz="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",iz=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${jt(sz)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${jt(i.name)}}}</strong> \u2014 ${jt(i.description)} (sample: ${jt(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${jt(r)}</pre>`,n=Ot(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${jt(n)}</pre>`;return`${t}${o}${s}`},az=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${jt(sz)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${jt(n.name)}}}</strong> \u2014 ${jt(n.description)} (sample: ${jt(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${jt(r)}</pre>`;return`${t}${o}`}});var ic,o_=l(()=>{"use strict";ic=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var lz,cz=l(()=>{"use strict";W();lz=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=bn({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=An({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var n_,ac,s_=l(()=>{"use strict";yo();cz();n_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ac=e=>{let t=lz(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${n_(r)}">${Xe}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${n_(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${n_(t)}</pre></template>`}});var i_,lc,a_=l(()=>{"use strict";yo();i_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lc=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${i_(r)}">${Xe}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${i_(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${i_(t)}</pre></template>`}});var wg,ti,l_=l(()=>{"use strict";o_();s_();a_();wg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ti=e=>{let t=ic(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${wg(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,u=e.cycle.revisions.map(m=>{let S=m.judgement?.score,h=S==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${S}`,y=m.judgement?.reasons?.trim()??"",p=y.length===0?"":`<br><span class="muted">${wg(y)}</span>`,b=lc({roundLabel:d(m.roundNumber),promptText:m.promptText}),A=ac({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run}),f=`${b}${A}`;if(e.interactive){let P=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${P}> <span class="sdlc-wizard-revision-title">${wg(h)}</span></label>${f}${p}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${wg(h)}</span>${f}${p}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${u}</ul>`}});var c_,dz,uz,pz,d_=l(()=>{"use strict";c_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dz=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${c_(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${c_(t.prompt)}</pre></li>`).join("")}</ol>`,uz=e=>dz([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),pz=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${c_(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${dz(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var cc,uJ,_g,u_=l(()=>{"use strict";W();d_();cc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uJ=e=>{let t=e.wizard;return t===void 0?"":Mt({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},_g=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=uJ(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${cc(n.orchestratorSkill.fileName)}</code> \u2014 ${cc(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${cc(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=uz(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${cc(r)} <span class="muted">${cc(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Ie,pJ,mJ,gJ,fJ,vg,hJ,yJ,SJ,AJ,bJ,PJ,ri,Tg=l(()=>{"use strict";W();t_();r_();l_();s_();a_();u_();Ie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pJ={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},mJ=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Ie(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Ie(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Ie(o)}</pre></details>`;return`<h2>${Ie(e)}</h2>${n}`},gJ=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=Ot(t).trim(),n=Mt({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!E(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${mJ("What is being evaluated",i)}`},fJ=(e,t)=>{let r=e.wizard;if(r===void 0||E(e.status))return"";let o=pJ[t];return o===void 0||r.phase!==o?"":nz(e)},vg=(e,t,r)=>{let o=fJ(e,t),n=t==="wizard-2"?gJ(e):"";return`${o}${n}${r}`},hJ=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},yJ=e=>{let t=e.wizard;return t===void 0?"":iz(t)},SJ=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Ie(a)}</span>`,d=`Round ${n.roundNumber}`,u=lc({roundLabel:d,promptText:n.promptText}),m=ac({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ie(s)}${i}</span>${u}${m}${c}</li>`}).join("")}</ul>`,AJ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return ti({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=hJ(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${SJ(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=Mt({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Ie(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",u=`Round ${c.roundNumber} \u2014 score ${d}`,m=lc({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),S=ac({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ie(u)}</span>${m}${S}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Ie(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},bJ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Ie(n.title)}</strong> <span class="muted">(${Ie(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Ie(o.title)}</strong>${n}${Ie(s)}${_g(e,o)}</li>`}).join("")}</ul>`},PJ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Ie(i)}</span> <strong>${Ie(n.title)}</strong>${Ie(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Ie(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?ti({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},ri=(e,t)=>{switch(t){case"wizard-1":return vg(e,t,yJ(e));case"wizard-2":return vg(e,t,AJ(e));case"wizard-3":return vg(e,t,bJ(e));case"wizard-4":return vg(e,t,PJ(e));default:return""}}});var wJ,_J,mz,gz,fz=l(()=>{"use strict";W();Ag();Dt();Tg();wJ=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},_J=e=>{let t=e.goal.trim();return t.length===0?null:t},mz=(e,t,r,o,n)=>{let s=ht(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},gz=(e,t)=>{let r=_J(e);if(t.id.startsWith("wizard-")){let s=ri(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=$l(e,t);if(s!==null){let a=kn(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ce(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:mz(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:wJ(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:mz(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var En,hz,yz=l(()=>{"use strict";En=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hz=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${En(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${En(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${En(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${En(n)}</h2><pre class="mono">${En(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${En(e.goal)}</dd></div></dl>`;return`<h2>${En(e.title)}</h2>${i}${t}${r}${o}${s}`}});var vJ,Sz,dc,p_,kg=l(()=>{"use strict";W();vJ=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),Sz=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||E(e.status))return null;let r=xt(t);return r<0||r>3?null:`wizard-${r+1}`},dc=(e,t)=>vJ.has(t)?Sz(e)===t:!1,p_="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var TJ,Cg,m_=l(()=>{"use strict";TJ='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Cg=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${TJ}</button>`});var Wn,Lg=l(()=>{"use strict";W();Wn=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Nl({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:Dl(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var kJ,Az,CJ,g_,bz,LJ,EJ,WJ,RJ,Pz,wz=l(()=>{"use strict";W();Lg();kJ={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},Az=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},CJ=e=>kJ[e]??null,g_=(e,t)=>{let r=e.wizard,o=CJ(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=xt(r);return o<n||o===n},bz=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},LJ=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:Ot(t).trim();return o.length===0?null:ql({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:Az(e,"generalize")})},EJ=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=Wn(e);return n===null?null:fo({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=bz(e)?.promptText.trim()??Mt({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:bn({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},WJ=e=>{let t=e.wizard;if(t===void 0)return null;let r=Mt({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:Vl({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:Az(e,"separate")})},RJ=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=Cr(t),s=wn(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=Wn(e);return c===null?null:fo({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=bz(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||E(e.status)&&i?.judgement!==null)?An({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):Kl({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:Pn(t,r).output,moduleTitle:o.title})},Pz=(e,t)=>{if(!g_(e,t))return null;switch(t){case"wizard-1":return LJ(e);case"wizard-2":return EJ(e);case"wizard-3":return WJ(e);case"wizard-4":return RJ(e);default:return null}}});var xJ,Eg,f_=l(()=>{"use strict";W();xJ=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},Eg=(e,t)=>{let r=e.wizard,o=xJ(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=xt(r);return o<n?"done":o===n&&E(e.status)&&e.status==="failed"?"failed":o<=n&&E(e.status)?"done":"pending"}});var IJ,oi,Wg=l(()=>{"use strict";yo();wz();f_();IJ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oi=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(Eg(e,t)==="pending")return""}else if(!g_(e,t))return"";let o=Pz(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Xe}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${IJ(o)}</pre></template>`}});var Rn,xr,ni=l(()=>{"use strict";Rn=e=>e.toLocaleString("en-US"),xr=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var nr,OJ,_z,Rg,vz,Tz,xg=l(()=>{"use strict";W();fz();yz();kg();m_();yo();Ag();t_();Wg();ni();nr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OJ=(e,t)=>{let r=$l(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?xr(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${Rn(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${nr(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${nr(r)}</span>`:"",d=hz(gz(t,e)),u=t.wizard!==void 0&&t.wizard.phase==="complete"&&E(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${nr(e.id)}"`:"",m=dc(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${nr(p_)}"><input type="hidden" name="cycleId" value="${nr(t.id)}"><input type="hidden" name="wizardStepId" value="${nr(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",S=e.state==="active"&&e.id.startsWith("wizard-")?oz(t):"",h=o?"failed":e.state,y=o?kn(t):null,p=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Xe}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${nr(y)}</pre></template>`:"",b=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?oi(t,e.id):"";return`<li class="sdlc-node sdlc-node-${h}" data-sdlc-step-id="${nr(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${u} data-sdlc-node>${n}<span class="sdlc-node-label">${nr(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${b}${p}</div></div>${S}<template>${d}</template></li>`},_z=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>OJ(r,t)).join("")}</ol>`,Rg=e=>`<div class="sdlc-score" aria-label="What the score means">${jl(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${nr(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,vz=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${Cg({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,Tz=`<script>
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
</script>`});var Ig,Og,Mg,kz,h_=l(()=>{"use strict";Ig="support-reply",Og="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",Mg=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),kz=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Ng,Cz,Lz=l(()=>{"use strict";W();xg();h_();Ng=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Cz=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${Rg(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${Ng(Og)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Ng(Mg)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Ng(kz)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Ng(Ig)}">Run this sample</a>
      </div>
    </section>`});var y_,zg,MJ,Ez,Wz=l(()=>{"use strict";y_=g(require("node:fs")),zg=g(require("node:path")),MJ=e=>zg.default.join(zg.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),Ez=(e,t)=>{let r=MJ(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;y_.default.mkdirSync(zg.default.dirname(r),{recursive:!0}),y_.default.appendFileSync(r,o,"utf8")}});var si,Rz,NJ,xz,zJ,Iz,sr,Z,Oz,z,pt=l(()=>{"use strict";si=g(require("node:fs")),Rz=g(require("node:path"));W();Wz();NJ=e=>e.wizard===void 0?e:{...e,wizard:vw(e.wizard)},xz=new Set,zJ=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),Iz=(e,t)=>{si.default.mkdirSync(Rz.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;si.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),si.default.renameSync(r,e)},sr=e=>{if(!si.default.existsSync(e))return[];try{let t=JSON.parse(si.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(zJ).map(NJ):[]}catch{return[]}},Z=(e,t)=>sr(e).find(r=>r.id===t)??null,Oz=(e,t)=>{xz.add(t);let r=sr(e).filter(o=>o.id!==t);Iz(e,r)},z=(e,t)=>{if(xz.has(t.id))return;let r=sr(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];Iz(e,o),Ez(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var ii,ir,uc,Mz,Dg,DJ,Nz,zz,Dz,S_=l(()=>{"use strict";ii=g(require("node:fs")),ir=g(require("node:path")),uc=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},Mz=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Dg=(e,t)=>{let r=uc(e);return r.length>0?r:uc(t)},DJ=e=>{let t=Dg(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${Mz(o)}`,...n.length>0?[`description: ${Mz(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},Nz=e=>`.cursor/skills/${e}/SKILL.md`,zz=(e,t)=>{let r=uc(t);if(r.length===0)return!1;let o=ir.default.resolve(e),n=ir.default.resolve(o,".cursor","skills"),s=ir.default.resolve(o,Nz(r));return s.startsWith(`${n}${ir.default.sep}`)?ii.default.existsSync(s):!1},Dz=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Dg(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=ir.default.resolve(e.workingDirectory);try{if(!ii.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=DJ({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=Nz(r.slug),n=ir.default.resolve(t,".cursor","skills"),s=ir.default.resolve(t,o);if(!s.startsWith(`${n}${ir.default.sep}`))return{ok:!1,errorCode:"path"};if(ii.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{ii.default.mkdirSync(ir.default.dirname(s),{recursive:!0}),ii.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var jJ,jz,$z,Hz=l(()=>{"use strict";W();pt();Ve();Dt();S_();jJ=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,jz=e=>{let t=e.get("savedSkill");return t!==null&&jJ.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},$z=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=Z(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!E(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ce(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||ht(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=Dz({workingDirectory:ue(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var jg,$g,pc=l(()=>{"use strict";W();jg=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=Wr({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},$g=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var So,mc=l(()=>{"use strict";W();pc();So=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=Uw(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=qw({moduleCount:o.length,existing:e.costControls,writerId:n}),i=jg(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:tc(r.variables)},updatedAt:new Date().toISOString()}}});var Ao,gc=l(()=>{"use strict";Ao=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var A_=l(()=>{"use strict";Ct();_l();Ca()});var b_,Fz,P_,Uz,Bz=l(()=>{"use strict";b_={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},Fz=e=>e.exitCode===null&&e.signalCode===null,P_=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!Fz(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!Fz(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),Uz=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),P_(e).then(s=>{r({...b_,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var Gz,fc,qz,w_,$J,v_,T_,HJ,FJ,UJ,Vz,BJ,__,Kz,hc,Jz,GJ,qJ,Ze,xn=l(()=>{"use strict";Gz=require("node:child_process"),fc=g(require("node:fs")),qz=g(require("node:os")),w_=g(require("node:path"));A_();Bz();Dt();$J=["claude-cli","codex","cursor","antigravity"],v_=18e4,T_=6e5,HJ=12e4,FJ=9e5,UJ="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",Vz="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",BJ="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",__=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},Kz=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=__(process.env[Vz])??Math.max(r,T_));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:__(process.env[BJ])??FJ;return Math.min(o,Math.max(HJ,r))},hc=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?__(process.env[Vz])??T_:v_,Jz=e=>`The writer timed out after ${e}ms.`,GJ=e=>$J.includes(e),qJ=e=>e===!0||process.env[UJ]==="1",Ze=e=>new Promise(t=>{if(e.signal?.aborted){t(b_);return}if(qJ(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!GJ(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=Jt(r,e.prompt,fe({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!fc.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:v_,s=w_.default.join(fc.default.mkdtempSync(w_.default.join(qz.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=VN({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},u=(0,Gz.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),m=S=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(S))};Uz(u,e.signal,m,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",P_(u).then(S=>{m({ok:!1,errorMessage:Jz(n),errorKind:"writer_timeout",killSignal:S})})},n),u.stdout.on("data",S=>{a.push(Buffer.from(S))}),u.stderr.on("data",S=>{c.push(Buffer.from(S))}),u.on("error",()=>m({ok:!1,errorMessage:"The writer failed to start."})),u.on("close",()=>{if(d.settled)return;let S=fc.default.existsSync(s)?fc.default.readFileSync(s,"utf8"):null,h=KN({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:S});if(h.ok&&d.stopReason!=="abort"){m(h);return}d.stopReason===null&&m(h)})})});var VJ,yc,k_=l(()=>{"use strict";W();ni();VJ=e=>{if(e.wizard!==void 0){let t=Yl(e.wizard),r=xr(e);return(t??0)+r}return xr(e)},yc=e=>{let t=Jw({costControls:e.costControls,spentTokens:VJ(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var Yz,KJ,Sc,Hg,Fg=l(()=>{"use strict";W();we();k_();Yz=e=>e===x?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},KJ=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Sc=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=mw({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:Yz(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?Yw({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:Dl(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=KJ(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?yc({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):yc({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},Hg=(e,t,r=null)=>{let o=og({raw:t,judge:Yz(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Ug,C_=l(()=>{"use strict";Ug=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var Qz,Bg,Gg,Xz,Zz,L_,JJ,eD,E_,YJ,tD,XJ,ZJ,rD,oD=l(()=>{"use strict";Qz=require("node:child_process"),Bg=g(require("node:fs")),Gg=g(require("node:path"));ym();W();Xz=4e3,Zz=12e3,L_=(e,t)=>{let r=(0,Qz.spawnSync)("git",[...t],{cwd:e,env:uo(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},JJ=e=>L_(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",eD=e=>{let t=L_(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},E_=(e,t)=>{let r=Gg.default.resolve(e,t),o=Gg.default.relative(e,r);if(o.startsWith("..")||Gg.default.isAbsolute(o)||!Bg.default.existsSync(r)||!Bg.default.statSync(r).isFile())return null;let n=Bg.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>Xz?`${n.slice(0,Xz)}
\u2026truncated`:n},YJ=e=>e.length>Zz?`${e.slice(0,Zz)}
\u2026truncated`:e,tD=e=>{let t=hw(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,E_(e.workingDirectory,n)])),o=JJ(e.workingDirectory);return{git:o,status:o?eD(e.workingDirectory):{},files:r,paths:t}},XJ=(e,t)=>{let r=L_(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=E_(e,t);return o===null?`${t} is missing.`:o},ZJ=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",rD=e=>{let t=e.before.git?eD(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=E_(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>XJ(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:ZJ(e.before.git,e.before.paths.length>0),evidence:YJ(i.join(`

`))}}});var x_,B,I_,Oe,nD,QJ,e7,sD,ai,iD,li,t7,r7,Ac,W_,R_,o7,aD,n7,s7,i7,lD,a7,cD,dD,l7,c7,uD,pD=l(()=>{"use strict";x_=require("node:child_process"),B=g(require("node:fs")),I_=g(require("node:os")),Oe=g(require("node:path"));ym();nD=8e6,QJ=16e6,e7=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],sD=(e,t)=>{let r=(0,x_.spawnSync)("git",[...t],{cwd:e,env:uo(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},ai=(e,t)=>(0,x_.spawnSync)("git",[...t],{cwd:e,env:uo(),timeout:8e3}).status===0,iD=e=>{let t=sD(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},li=(e,t)=>{let r=Oe.default.resolve(e,t),o=Oe.default.relative(e,r);return o.startsWith("..")||Oe.default.isAbsolute(o)?null:r},t7=(e,t)=>{let r=li(e,t);if(r===null||!B.default.existsSync(r))return null;let o=B.default.statSync(r);return!o.isFile()||o.size>nD?null:B.default.readFileSync(r)},r7=(e,t,r)=>{let o=li(e,t);o!==null&&(B.default.mkdirSync(Oe.default.dirname(o),{recursive:!0}),B.default.writeFileSync(o,r))},Ac=(e,t)=>{let r=li(e,t);r===null||!B.default.existsSync(r)||B.default.rmSync(r,{recursive:!0,force:!0})},W_=(e,t)=>ai(e,["cat-file","-e",`HEAD:${t}`]),R_=e=>{let t=sD(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},o7=e=>Oe.default.resolve(e)!==Oe.default.resolve(I_.default.homedir()),aD=e=>{if(!B.default.existsSync(e))return 0;let t=B.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?B.default.readdirSync(e).reduce((r,o)=>r+aD(Oe.default.join(e,o)),0):0},n7=(e,t,r)=>{let o=li(e,r);if(o===null||!B.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(aD(o)>QJ)return{relativePath:r,existed:!0,copyDir:null};let n=Oe.default.join(t,"cache",r);return B.default.mkdirSync(Oe.default.dirname(n),{recursive:!0}),B.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},s7=400,i7=32e6,lD=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!B.default.existsSync(s)))for(let i of B.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=Oe.default.join(s,i),c=B.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>nD)){if(t.length>=s7||r+c.size>i7){o=!1;return}r+=c.size,t.push(Oe.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},a7=(e,t,r)=>{let o=li(e,r);if(o===null||!B.default.existsSync(o))return null;let n=t7(e,r);if(n===null)return"skip";let s=Oe.default.join(t,"files",r);return B.default.mkdirSync(Oe.default.dirname(s),{recursive:!0}),B.default.writeFileSync(s,n),s},cD=e=>{let t=B.default.mkdtempSync(Oe.default.join(I_.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?iD(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:lD(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,a7(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?R_(e.workingDirectory):null,isolateCaches:o7(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:e7.map(i=>n7(e.workingDirectory,t,i))}},dD=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Ac(e.workingDirectory,t);return}r7(e.workingDirectory,t,B.default.readFileSync(r))}},l7=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?dD(e,t):W_(e.workingDirectory,t)?ai(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Ac(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&W_(e.workingDirectory,t)&&ai(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!W_(e.workingDirectory,t)&&ai(e.workingDirectory,["reset","-q","HEAD","--",t])},c7=(e,t)=>{let r=li(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Ac(e.workingDirectory,t.relativePath),B.default.mkdirSync(Oe.default.dirname(r),{recursive:!0}),B.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Ac(e.workingDirectory,t.relativePath);return}if(B.default.existsSync(r))for(let o of B.default.readdirSync(r)){let n=Oe.default.join(r,o);B.default.statSync(n).mtimeMs>=e.startedMs-1e3&&B.default.rmSync(n,{recursive:!0,force:!0})}}}},uD=e=>{try{if(e.git){if(R_(e.workingDirectory)!==e.head&&(!(e.head===null?ai(e.workingDirectory,["update-ref","-d","HEAD"]):ai(e.workingDirectory,["reset","--hard",e.head]))||R_(e.workingDirectory)!==e.head))throw new Error("head");let r=iD(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))l7(e,o)}else{if(e.complete)for(let t of lD(e.workingDirectory).paths)e.files[t]===void 0&&Ac(e.workingDirectory,t);for(let t of Object.keys(e.files))dD(e,t)}for(let t of e.caches)c7(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{B.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var qg,Vg,d7,u7,p7,m7,g7,mD,f7,gD,fD=l(()=>{"use strict";W();Fg();C_();oD();pD();we();Ve();Dt();xn();qg=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),Vg=e=>({...e,status:"stopped",errorMessage:Sn,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),d7=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),u7=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==x?t:e.improverModel!==x?e.improverModel:null}return e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null},p7=async e=>{let t=ue(e.cycle),r=tD({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=cD({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Kl({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Pn(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):zl({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=Kz({promptText:e.revision.promptText,isModuleRun:i}),c=hc({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},u=await Ze({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),m=u.ok?rD({workingDirectory:t,before:r,writerReply:u.text}):null,S=uD(o),h={...e.cycle,revisions:e.cycle.revisions.map(y=>y.roundNumber===e.cycle.currentRound?d:y)};return u.ok?!S.ok||m===null?{ok:!1,cycle:qg(h,S.ok?"Could not put the folder back after the run.":S.errorMessage)}:{ok:!0,cycle:h,run:{output:u.text.trim(),tokens:u.tokens,delayMs:Date.now()-n,lookedAt:m.lookedAt,evidence:m.evidence}}:u.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:Vg(h)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:qg(h,u.errorMessage,or(u))})},m7=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:p7({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),g7=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),mD=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Ze({writerAgent:e.reviewer,workingDirectory:ue(e.cycle),prompt:fw({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:Vg(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},f7=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===x)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Ze({writerAgent:t.judgeModel,workingDirectory:ue(t),prompt:bn({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Sc(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?Vg(o):(e.onWriterFailure?.(t.judgeModel),qg(o,n.errorMessage,or(n)))},gD=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return f7(e);let o=u7(t),n=await m7({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?d7(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===x){let u=await mD({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return u.kind==="stopped"?u.cycle:{...g7(s,u.text),judgePhase:void 0}}let i=await Ze({writerAgent:t.judgeModel,workingDirectory:ue(t),prompt:An({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?Vg(s):(e.onWriterFailure?.(t.judgeModel),qg(s,i.errorMessage,or(i)));let a=await mD({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Sc(s,i.text,c);return Ug(d,a.text)}});var Kg,h7,y7,O_,hD=l(()=>{"use strict";W();Fg();fD();Lg();Dt();we();k_();Ve();xn();Kg=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),h7=e=>({...e,status:"stopped",errorMessage:Sn,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),y7=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?h7(e):(n?.(r),Kg(e,t.errorMessage,or(t))),O_=async(e,t,r,o)=>{let n=yc(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return Kg(e,"This round has no prompt.");if(e.status==="judging")return gD({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return Kg(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===x)return e;let i=Wn(e);if(i===null)return Kg(e,"The improver needs the score and the reason.");let a=await Ze({writerAgent:e.improverModel,workingDirectory:ue(e),prompt:fo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:hc()}),c=y7(e,a,e.improverModel,r,t);return c!==null?c:Hg(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var bc,M_,S7,SD,yD,A7,b7,Jg,AD,bD,P7,w7,In,PD,wD,Pc=l(()=>{"use strict";W();mc();gc();we();Ve();Dt();xn();hD();o_();bc=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),M_=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return bc(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},S7=e=>{let t=or(e);return BN(e)||t==="usage_limit"||t==="action_required"},SD=(e,t,r)=>S7(r)?bc(e,r.errorMessage,or(r)):M_(e,t,r.errorMessage),yD=e=>{let t=e.wizard;return t===void 0||ic(e).length===0?e:{...e,wizard:Ys({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},A7=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",b7=e=>{let t=e.wizard;if(t===void 0)return e;let r=Jl({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Ys({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Jg=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),AD=e=>e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null,bD=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},P7=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=AD(e);if(n===null)return bc(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Ot(o),i=ql({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:bD(e,"generalize")}),a=await Ze({writerAgent:n,prompt:i,workingDirectory:ue(e),signal:t});if(!a.ok)return r?.(n),SD(e,"generalize",a);try{let c=zw(a.text),d=Ys({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:tc(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),u={...e,wizard:d};return Xl(d)?In({...u,wizard:{...d,gate:null}}):Jg(u,"generalize")}catch(c){return M_(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},w7=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=AD(e);if(n===null)return bc(e,"Choose a writer to suggest splits.");let s=Mt({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Vl({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:bD(e,"separate")}),a=await Ze({writerAgent:n,prompt:i,workingDirectory:ue(e),signal:t});if(!a.ok)return r?.(n),SD(e,"separate",a);try{let c=Dw(a.text),d=Cw(c,o.variables),u=Ys({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:u};return Ql(d)?So(m,d[0]):Jg(m,"separate")}catch(c){return M_(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},In=e=>{let t=e.wizard;if(t===void 0)return e;let r=Ot(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},PD=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return bc(e,"This module is missing.");let n=Cr(r),s=wn(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==x?e.runnerModel:e.judgeModel!==x?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:ie(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},wD=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return O_(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return P7(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return w7(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await O_(e,t,r,o);if(E(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&ic(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=ce(s.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??0,reasons:S.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&Zl({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let u=yD(Jg(a,i));return Ao(u)}let c=Jg(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let u=Ww({wizard:{...c.wizard,modules:c.wizard.modules.map((m,S)=>S===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:A7(s.status)});return{...c,wizard:u}})():c;return i==="evaluate"?yD(d):b7(d)}return s}return n.phase==="complete",e}});var ci,Yg=l(()=>{"use strict";W();we();ci=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:Ow(r,e.judgeModel===x),updatedAt:new Date().toISOString()}}});var di,Xg=l(()=>{"use strict";di=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var yt,_D,_7,vD=l(()=>{"use strict";W();Ve();Xg();Dt();S_();yt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_D=e=>{if(!E(e.status))return"";let t=ce(e.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??null,reasons:S.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=ht(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${yt(t.reasons.trim())}</p>`,i=e.status==="passed",a=di(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${yt(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${yt(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',u=n!==null?`<div class="alert-error">${yt(n)}</div>`:i?_7({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:ue(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${yt(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${yt(t.promptText)}</pre></details>`,m=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${m}</h2>${d}${o}${s}${u}</section>`},_7=e=>{let t=e.sourceSkill?.fileName??uc(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=Dg(t,r),s=n.length>0&&zz(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${yt(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${yt(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${yt(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${yt(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${yt(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${yt(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var TD,kD=l(()=>{"use strict";TD=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var CD,v7,Zg,Qe,Qg,N_=l(()=>{"use strict";W();we();kD();Ag();Dt();Xg();CD=["Generalize","Evaluate","Separate","Optimize modules"],v7=e=>{let t=xt(e),r=t>=0&&t<CD.length?CD[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},Zg=(e,t)=>{let r=kn(e),o=r===null?null:TD(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},Qe=(e,t)=>({title:e,detail:t,replyPreview:null}),Qg=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=kn(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:YN(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!E(e.status)){let t=e.judgeModel;return Qe(`${ae(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!E(e.status)){let t=e.judgeModel;return Qe(`${ae(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===x?Qe(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?Qe(`${ae(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):Qe(`${ae(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===x){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==x?Qe(`${ae(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):Qe(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return Qe(`${ae(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ie(t);return Qe(`${ae(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return Qe(`${ae(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ie(t);return Qe(`${ae(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return Qe(`${ae(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===x){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return Qe("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return Qe(`${ae(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>ht(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=re(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||E(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?Zg(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=di(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?Zg(e,{title:`${v7(r)}${s}`,detail:t.length>0?t:n}):Zg(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(E(e.status)){let t=e.errorMessage?.trim()??"";return Zg(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var ar,wc=l(()=>{"use strict";we();ar=e=>{if(e.status==="improving"&&e.improverModel===x)return!0;if(e.status!=="judging"||e.judgeModel!==x)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===x}});var LD,ED=l(()=>{"use strict";LD=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var bo,T7,WD,RD=l(()=>{"use strict";W();bo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),T7=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${bo(r)}</p>`},WD=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${bo(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${bo(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${bo(a)}.</p>`}<pre class="mono">${bo(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${ho(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${bo(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let u=e.avoid?.trim()??"",m=u.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${bo(u)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${T7(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${bo(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var _c,k7,xD,ID=l(()=>{"use strict";W();Dt();_c=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),k7=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=ht(t.promptText),n=t.judgement?.reasons?`<p class="muted">${_c(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${_c(i)}.</p>`}<pre class="mono">${_c(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${ho(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,u=o===null?`<pre class="mono">${_c(d)}</pre>`:`<div class="alert-error">${_c(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${u}</article>`},xD=e=>e.revisions.map(t=>k7(e,t)).join("")});var OD,MD=l(()=>{"use strict";W();OD=e=>{if(E(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var lr,C7,z_,L7,E7,W7,R7,ND,zD,D_=l(()=>{"use strict";MD();lr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),C7="Stop this run? Writers will stop and the best prompt is kept.",z_="End the wizard? Writers will stop and progress from finished steps is kept.",L7="Skip this module and pause at the step gate?",E7=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${lr(C7)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${lr(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,W7=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${lr(z_)}"><input type="hidden" name="cycleId" value="${lr(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,R7=e=>{let t=lr(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${lr(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${lr(L7)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${lr(z_)}">End wizard</button>
    </form>
  </div>`},ND=e=>{let t=OD(e);return t==="none"?"":t==="legacy_stop"?E7(e.id):t==="wizard_end_only"?W7(e.id):R7(e)},zD=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=lr(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${lr(z_)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var DD,jD=l(()=>{"use strict";W();ni();DD=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=re(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${Rn(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${Rn(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${ie(r)}`}return""}});var x7,I7,$D,O7,HD,FD=l(()=>{"use strict";W();jD();f_();Tg();Wg();x7=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',I7=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',$D=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),O7=(e,t,r)=>{let o=ri(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=DD(e,t),i=Eg(e,t),a=x7(i),c=I7(i),d=oi(e,t,{forOutcomeSummary:!0}),u=`${a}<span class="sdlc-wizard-outcome-step-title">${$D(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${$D(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",S=i==="failed"&&t!=="wizard-4"?" open":"",h=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${h}"${m}${S}><summary aria-controls="${h}-body">${u}</summary><div class="sdlc-wizard-outcome-step-body" id="${h}-body">${o}</div></details>`},HD=e=>{let t=e.wizard;if(t===void 0||!E(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>O7(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var UD,BD,GD=l(()=>{"use strict";UD=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),BD=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${UD(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${UD(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var j_,qD,$_=l(()=>{"use strict";j_=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,qD=(e,t)=>{if(j_(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var VD,KD=l(()=>{"use strict";VD=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var ef,JD,YD=l(()=>{"use strict";W();$_();$_();KD();ef=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),JD=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=re(t),o=ie(t),n=r.terminalStatusSuggestion==="passed"?"":VD(r,o),s=o-10,i=r.rows.map((c,d)=>{let u=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,h=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=u===void 0?c.status:qD(u,o),p=u!==void 0&&j_(u,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':y==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':y==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':ef(y);return`<tr${h}><td>${ef(c.title)}</td><td>${ef(m)}</td><td>${c.tokens??"\u2014"}</td><td>${p}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${ef(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var On,tf,H_=l(()=>{"use strict";On=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tf=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${On(r.fileName)}</code> \u2014 ${On(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${On(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${On(i.name)}</strong> <code>.cursor/skills/${On(i.fileName)}/SKILL.md</code></p><p class="muted">${On(i.description)}</p><p>${On(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var M7,XD,ZD=l(()=>{"use strict";W();GD();YD();H_();M7=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),XD=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!E(e.status)||t.modules.length===0)return"";let r=JD(e),o=BD(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=re(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${M7(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${tf(e)}${a}${r}${o}</section>`}});var V,rf=l(()=>{"use strict";W();V={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var of,F_=l(()=>{"use strict";of=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var QD,ej=l(()=>{"use strict";rf();F_();QD=e=>{let t=of({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:V.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var Ir,vc=l(()=>{"use strict";Ir=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var Or,nf,U_=l(()=>{"use strict";W();xg();vD();N_();wc();ED();Lg();RD();ID();D_();FD();ZD();ni();ej();Ve();vc();Or=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nf=e=>{let t=!E(e.status)&&e.status!=="wizard_paused"&&!ar(e),r=Qg(e),o=_z(Pw(LD(e)),e),n=E(e.status)?"":ND(e),s=HD(e),i=XD(e),a=_D(e),c=e.errorMessage===null?"":`<div class="alert-error">${Or(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",u=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?re(e.wizard):null,S=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,h=!t&&e.wizard!==void 0&&E(e.status)&&(e.wizard.phase==="complete"||re(e.wizard).passedModuleCount>0),y=h?S?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",p=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Or(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",b=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${Or(r.replyPreview)}</pre>`,A=r.detail.length===0&&p.length===0&&b.length===0||r.detail.length===0&&b.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Or(r.detail)}${u}</p>`}${b}</div>`,f=e.revisions.find(Eo=>Eo.roundNumber===e.currentRound),P=e.status==="improving"?Wn(e):null,_=xr(e),T=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),k=ar(e)?WD({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:P?.promptText??f?.promptText??"",score:P?.score??f?.judgement?.score??null,reasons:P?.reasons??f?.judgement?.reasons??null,avoid:P?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:T?1:0}):"",L=e.wizard!==void 0&&e.wizard.phase==="complete"&&E(e.status),R=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!L&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?ie(e.wizard):e.passScore,N=R?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${Rg(I)}</div>`:"",U=e.status==="failed"?QD({status:e.status,errorKind:e.errorKind}):null,G=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':E(e.status)?U!==null?`<span class="${U.badgeClass}">${U.badgeLabel}</span>`:L&&m!==null&&!S?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",q=t?d:h?S?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',Ke=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Or(ut(ue(e)))}</li>`:"",_>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${Rn(_)} so far</li>`:""].filter(Eo=>Eo.length>0),H=Ke.length===0?"":`<ul class="sdlc-run-meta">${Ke.join("")}</ul>`,ke=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,Jr=L?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,pr=L?"":N.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${Jr}</div>`:`<div class="sdlc-run-grid">${Jr}${N}</div>`,Zk=xD(e),GG=e.wizard!==void 0&&E(e.status)&&e.revisions.every(Eo=>Eo.roundNumber===0&&(Eo.judgement===void 0||Eo.judgement===null)),qG=Zk.length===0||GG?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${Zk}</div></section>`,VG=`<p class="sdlc-run-goal" title="${Or(e.goal.trim())}">${Or(Ir(e.goal))}</p>`,KG=L?`${c}${i}${s}${k}${a}`:`${c}${pr}${k}${s}${a}`,JG='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',YG=L?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Or(e.updatedAt)}" aria-busy="${t?"true":"false"}">${JG}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${G}</div>${VG}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${q}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Or(r.title)}</h2>${A}${p}${YG}</div></div>${H}${ke}</header>${KG}</section>${qG}`}});var tj,rj=l(()=>{"use strict";W();gc();tj=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Zl({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:Ao(e)}});var oj,nj=l(()=>{"use strict";W();Pc();oj=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Xl(t)?e:In({...e,wizard:{...t,gate:null}})}});var sj,ij=l(()=>{"use strict";W();mc();sj=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Ql(t.splitOptions))return e;let r=t.splitOptions[0];return So(e,r)}});var N7,Mn,sf=l(()=>{"use strict";rj();nj();ij();pt();N7=e=>{let t=oj(e),r=tj(t);return sj(r)},Mn=(e,t)=>{let r=N7(t);return r!==t?(z(e,r),r):t}});var aj,Mr,Tc=l(()=>{"use strict";W();aj=e=>ct.indexOf(e),Mr=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||E(e.status)?ct.length:t.gate!==null?aj(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?aj(t.phase):null}});var lj,cj=l(()=>{"use strict";lj=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Nn,dj,uj=l(()=>{"use strict";W();cj();Nn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dj=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Pn(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Nn(lj(o))}</pre></div>`:"",s=_n(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=Cr(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),u=mg(c),m=i[c]??"",S=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Nn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Nn(u)}">${Nn(S)}</label>
        ${h}
        <input class="input" type="text" id="${Nn(u)}" name="${Nn(u)}" value="${Nn(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var pj,mj=l(()=>{"use strict";pj={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var kc,z7,pe,Po=l(()=>{"use strict";mj();yo();kc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),z7=e=>{let t=pj[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${kc(t.title)}" aria-describedby="${r}" aria-expanded="false">${Xe}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${kc(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${kc(t.example)}</span></span></button>`},pe=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${kc(r)}"`}>${kc(e)}</span>${z7(t)}</span>`});var St,gj,fj,hj=l(()=>{"use strict";W();pc();rf();Po();St=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gj=e=>{let t=e.costControls;if(t===void 0||ei(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??dt({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${St(V.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${St(t.softWarnMessage??vn)}</p>`:"",d=$g({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${St(V.estimateOverCeilingWarn)}</p>`:"",u=e.wizard?.modules.length??0,m=u>0?`<p class="muted">Step 4 will optimize ${u} module${u===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${St(V.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${St(V.confirmLede)}</p>
  ${m}
  ${a}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${St(Xs)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${St(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${St(V.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${St(V.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${St(V.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
    </dl>
    <div class="field">
      ${pe(V.confirmedTokenLabel,"confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${s}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${pe(V.confirmedSpendLabel,"confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${i}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${St(V.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${St(V.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},fj=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!ei(r)}});var D7,yj,Sj=l(()=>{"use strict";yo();D7=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yj=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${Xe}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${D7(t)}</pre></template>`}});var Cc,Aj,bj=l(()=>{"use strict";W();r_();uj();l_();D_();H_();u_();hj();Sj();Cc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Aj=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(fj(e))return gj(e);let n=ie(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?az(r):"",a=o==="evaluate"?tf(e):"",c=o==="evaluate"?ti({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",u=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(I=>{let N=I.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',U=I.recommended?' <span class="sdlc-badge">Recommended</span>':"",G=r.selectedSplitOptionId===I.id||r.selectedSplitOptionId===null&&I.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${Cc(I.id)}" required${G}> <strong>${Cc(I.title)}</strong>${N}${U}</label>${_g(e,I)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],h=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=m?.title??"Module",p=m?.prompt??"",b=m?.status==="pending",A=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Cc(y)}</p>${b?dj({cycle:e,modulePrompt:p}):""}<p class="muted">Test run prompt preview: ${Cc(wn(p,Cr(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${ti({cycle:e,interactive:!1,caption:b?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",f=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":b?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",P=Yl(r),_=P===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${P}</p>`,T=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?yj(r.lastWriterParseFailureReply??""):"",k=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",L=t?.active===!0?" sdlc-wizard-gate-active":"",R=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${k}"`:"";return`<section class="card sdlc-wizard-gate${L}"${R}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${f}</p>
    ${T}
    ${_}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Cc(e.id)}">
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
    ${zD(e)}
  </section>`}});var j7,Pj,wj=l(()=>{"use strict";W();Wg();j7=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Pj=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||E(e.status))return"";let r=(o,n)=>{let s=oi(e,o);return`<h2 class="sdlc-wizard-active-head">${j7(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var B_,_j,vj,wo,Tj,ui=l(()=>{"use strict";W();pt();B_=new Map,_j=e=>{let t=new AbortController;return B_.set(e,t),t.signal},vj=e=>{B_.delete(e)},wo=e=>{B_.get(e)?.abort()},Tj=(e,t)=>{let r=Z(e,t);return r===null||r.wizard!==void 0?!1:(E(r.status)||(z(e,{...r,status:"stopped",errorMessage:Sn,updatedAt:new Date().toISOString()}),wo(t)),!0)}});var kj,Cj,G_,Lj,q_=l(()=>{"use strict";W();Tc();ui();kj="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",Cj=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return ct[r]??null},G_=(e,t)=>{let r=Cj(t);if(r===null||e.wizard===void 0)return!1;let o=ct.indexOf(r);if(o===-1)return!1;let n=Mr(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<ct.length)},Lj=(e,t)=>{let r=Cj(t);if(r===null||e.wizard===void 0||!G_(e,t))return e;wo(e.id);let o=ct.slice(ct.indexOf(r)),n=Gl(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var V_,Ej,Wj=l(()=>{"use strict";q_();V_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ej=(e,t)=>G_(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${V_(kj)}"><input type="hidden" name="cycleId" value="${V_(e.id)}"><input type="hidden" name="wizardStepId" value="${V_(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var $7,Rj,H7,xj,Ij=l(()=>{"use strict";W();Tc();bj();wj();Wj();Tg();$7={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},Rj=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),H7=(e,t,r)=>{let o=Ej(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${Rj(t)}">
  <summary class="sdlc-wizard-accordion-summary">${Rj(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${ri(e,t)}</div>
</details>`},xj=e=>{let t=e.wizard;if(t===void 0)return"";let r=Mr(e);if(r===null)return"";let o=ct.slice(0,r).map((i,a)=>H7(e,`wizard-${a+1}`,$7[i])),n=t.gate!==null?Aj(e,{active:!0}):Pj(e),s=r>=ct.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var af,K_=l(()=>{"use strict";Ij();d_();W();af=e=>{if(e===null||e.wizard!==void 0&&E(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=xj(e),r=pz(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var F7,J_,Oj=l(()=>{"use strict";W();we();Ve();xn();F7=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},J_=async(e,t,r)=>{if(!F7(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===x)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=Rw({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Ze({writerAgent:e.judgeModel,prompt:n,workingDirectory:ue(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=Iw(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var Lc,lf,Mj,Y_,Nj,zj,Dj,cf,X_=l(()=>{"use strict";Lc=g(require("node:fs")),lf=g(require("node:path")),Mj=e=>lf.default.join(lf.default.dirname(e),"prompt-optimizer-writer-ready.json"),Y_=e=>{let t=Mj(e);if(!Lc.default.existsSync(t))return{};try{let r=JSON.parse(Lc.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},Nj=(e,t)=>{Lc.default.mkdirSync(lf.default.dirname(e),{recursive:!0}),Lc.default.writeFileSync(Mj(e),`${JSON.stringify(t,null,2)}
`)},zj=(e,t)=>Y_(e)[t]?.message??null,Dj=(e,t,r)=>{Nj(e,{...Y_(e),[t]:{message:r}})},cf=(e,t)=>{let r=Y_(e);r[t]!==void 0&&Nj(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var Z_,df,uf,jj,_e,zn=l(()=>{"use strict";W();A_();Pc();Oj();wc();ui();X_();sf();pt();Z_=new Set,df={atMs:0,ids:[]},uf=async()=>{if(Date.now()-df.atMs<3e4)return df.ids;let e=await Rt({commands:fe({})});return df.atMs=Date.now(),df.ids=e.installedWriterIds,e.installedWriterIds},jj=async(e,t,r)=>{let o=Z(e,t);if(o===null||r.aborted)return;let n=Mn(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(E(n.status)&&!s||n.status==="wizard_paused"||ar(n))return;if(s){let c=await J_(n,r,d=>{cf(e,d)});z(e,c);return}let i=await wD(n,c=>{cf(e,c)},r,c=>{Z(e,t)?.status==="stopped"||r.aborted||z(e,c)});if(!(Z(e,t)?.status==="stopped"||r.aborted)){if(z(e,i),E(i.status)){let c=await J_(i,r,d=>{cf(e,d)});z(e,c);return}await jj(e,t,r)}},_e=(e,t)=>{if(Z_.has(t))return;let r=Z(e,t);if(r===null)return;let o=Mn(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(E(o.status)&&!n||o.status==="wizard_paused"||ar(o))return;Z_.add(t);let s=_j(t);jj(e,t,s).finally(()=>{Z_.delete(t),vj(t)})}});var _o,Ec=l(()=>{"use strict";U_();sf();K_();zn();_o=(e,t)=>{let r=Mn(e,t);return _e(e,r.id),`${nf(r)}${af(r)}`}});var $j,Hj,Fj=l(()=>{"use strict";$j=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,Hj=e=>e!==null&&e>0});var U7,B7,G7,Uj,Bj=l(()=>{"use strict";W();Pc();Yg();mc();gc();ui();kg();kg();U7=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),B7=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ce(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},G7=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=re(o);return ci({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},Uj=(e,t)=>{if(!dc(e,t))return e;wo(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return In({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return Ao(B7(r));if(t==="wizard-3"){let n=o.splitOptions[0]??U7(o.templatedPrompt);return So(r,n)}return t==="wizard-4"?G7(r):e}});var pf,Gj,Q_=l(()=>{"use strict";W();Yg();ui();pf=e=>(wo(e.id),{...ci(e,"stopped"),errorMessage:nw}),Gj=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;wo(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var q7,qj,Vj,Kj=l(()=>{"use strict";W();Pc();Yg();mc();gc();Ec();pt();zn();Fj();q_();Bj();Q_();q7="Pick a revision scored above 0 before continuing to Separate.",qj=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),Vj=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=Z(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=Z(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(_o(e.storePath,d))};if(o==="wizard-stop-all"){let c=pf(s);return z(e.storePath,c),_e(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=Gj(s);return z(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=Lj(s,c);return z(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=Uj(s,c);return z(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&_e(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let u=t.get("wizardStepInstructions")?.trim()??"",m=Tw(s.wizard,d,c);m=Gl(m,d),m={...m,pendingStepInstructions:u};let S={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return z(e.storePath,S),_e(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(S=>S.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?qj(s):In({...s,wizard:{...s.wizard,gate:null}});return z(e.storePath,m),_e(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),u=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=$j(s,u??-1);if(!Hj(m)){let h={...s,errorMessage:q7,updatedAt:new Date().toISOString()};return z(e.storePath,h),a(n),!0}let S=Ao({...s,wizard:{...s.wizard,evaluateSelectedRound:u}});return z(e.storePath,S),_e(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=qj(s);return z(e.storePath,h),_e(e.storePath,n),a(n),!0}let u=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(h=>h.id===u);if(m===void 0){let h={...s,errorMessage:u.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return z(e.storePath,h),a(n),!0}let S=So(s,m);return z(e.storePath,S),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,u=d.currentModuleIndex,m=d.modules[u];if(m===void 0)return a(n),!0;if(!ei(s.costControls)){let b=t.get("confirmedTokenBudget")?.trim()??"",A=t.get("confirmedMaxSpendUsd")?.trim()??"";if(b.length===0){let P={...s,errorMessage:Xs,updatedAt:new Date().toISOString()};return z(e.storePath,P),a(n),!0}let f=Wr({existing:s.costControls,confirmedTokenBudget:Number(b),confirmedMaxSpendUsd:A.length===0?null:Number(A),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!f.ok){let P={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,P),a(n),!0}s={...s,costControls:f.costControls,errorMessage:null,updatedAt:new Date().toISOString()},z(e.storePath,s)}let S=Bw({wizard:d,modulePrompt:m.prompt,posted:t});if(!S.ok){let b={...s,errorMessage:S.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,b),a(n),!0}let h={...d,parameterValues:S.parameterValues};if(m.status==="pending"){let b=PD({...s,wizard:{...h,gate:null}},u);return z(e.storePath,b),_e(e.storePath,n),a(n),!0}let y=u+1;if(y>=d.modules.length){let b=re(h),A=ci({...s,wizard:h},b.terminalStatusSuggestion);return z(e.storePath,A),_e(e.storePath,n),a(n),!0}let p={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...h,gate:"optimize_modules",currentModuleIndex:y},updatedAt:new Date().toISOString()};return z(e.storePath,p),a(n),!0}}return a(n),!0}});var V7,Jj,K7,ev,J7,Yj,Xj=l(()=>{"use strict";we();ui();Q_();C_();Fg();wc();pt();V7="Add a score from 0 to 100 and the reason for it.",Jj="Add a score from 1 to 100 and the reason for it.",K7="Write the next prompt.",ev="This step is not waiting for you.",J7=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},Yj=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=Z(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(z(e.storePath,pf(a)),{kind:"saved",cycleId:i}):Tj(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=Z(e.storePath,r);if(o===null||!ar(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:ev};if(t==="manual-judge"){if(o.judgeModel!==x)return{kind:"invalid",cycle:o,errorMessage:ev};let i=J7(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?Jj:V7};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:Jj};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",u=Ug(Sc(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return z(e.storePath,u),{kind:"saved",cycleId:o.id}}if(o.improverModel!==x)return{kind:"invalid",cycle:o,errorMessage:ev};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:K7};let s=Hg(o,n);return z(e.storePath,s),{kind:"saved",cycleId:o.id}}});var Zj,Qj=l(()=>{"use strict";Zj=`<script>
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
</script>`});var e$,t$=l(()=>{"use strict";e$=`<script>
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
</script>`});var r$,o$=l(()=>{"use strict";r$=`<script>
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
</script>`});var n$,s$=l(()=>{"use strict";n$=`<script>
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
</script>`});var i$,a$=l(()=>{"use strict";W();Ve();i$=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:ut(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(ie(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!E(t.status)}}});var l$,c$=l(()=>{"use strict";l$=`<script>
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
</script>`});var d$,u$=l(()=>{"use strict";W();Tc();Xg();d$=e=>{let t=di(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:E(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=Mr(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=re(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=re(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return E(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var p$,m$=l(()=>{"use strict";p$=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Nr,Y7,X7,g$,f$=l(()=>{"use strict";u$();m$();vc();Nr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Y7=e=>e.wizard===void 0?"legacy":"wizard",X7=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Nr(t)}">`,o=d$(e),n=p$(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Nr(o.badgeClass)}">${Nr(o.badgeLabel)}</span>`,u=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Nr(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Nr(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${Y7(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Nr(e.id)}">${Nr(Ir(e.goal))}</a><p class="muted">${Nr(a)}</p></div></div><div class="sdlc-history-row-actions">${u}${m}</div></li>`},g$=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>X7(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Nr(s)}</summary>${i}</details>`:i}});var tv,mf,h$,Z7,Q7,Wc,y$,gf=l(()=>{"use strict";tv=g(require("node:fs")),mf=g(require("node:path"));Ve();h$=/^[a-z0-9-]+$/,Z7=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},Q7=(e,t)=>{if(!h$.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let u=/^(name|description):\s*(.*)$/.exec(d.trim());if(u===null)continue;let m=Z7(u[2]??"");u[1]==="name"&&m.length>0&&(o=m),u[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},Wc=e=>{let t=Rr(e);if(!t.ok)return[];let r=mf.default.resolve(t.path,".cursor","skills"),o=[];try{o=tv.default.readdirSync(r)}catch{return[]}return o.filter(n=>h$.test(n)).flatMap(n=>{let s=mf.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${mf.default.sep}`))return[];try{let i=Q7(tv.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},y$=(e,t)=>Wc(e).find(r=>r.fileName===t)??null});var S$,e9,A$,b$,P$=l(()=>{"use strict";Po();S$=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),e9=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),A$=e=>{if(e.length===0)return`<div class="field">${pe("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${S$(r.fileName)}">${S$(r.fileName)}</option>`).join("");return`<div class="field">${pe("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${e9(e)}</script>`},b$=`<script>
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
</script>`});var et,w$,_$=l(()=>{"use strict";W();rf();pc();Po();et=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),w$=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=et(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=Qs({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??Er(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),m=$g({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",S=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${et(V.knobsSectionTitle)}</p>
  <p class="muted">${et(V.knobsSectionLede)}</p>
  <div class="field">
    ${pe(V.maxTrialsLabel,"maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${30}" step="1" value="${r}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${pe(V.maxSpendUsdLabel,"maxSpendUsd")}
    <input class="input" type="number" name="maxSpendUsd" id="sdlc-max-spend-usd" min="0" step="0.01" value="${o}" placeholder="Optional" data-sdlc-max-spend-usd>
    <p class="muted">${et(V.autoConfirmHint)}</p>
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${n}>
      <span>${et(V.earlyStopLabel)}</span>
    </label>
    <p class="muted">${et(V.earlyStopHint)}</p>
  </div>
  <div class="sdlc-cost-estimate" data-sdlc-cost-estimate>
    <p class="sdlc-block-title">${et(V.estimateSectionTitle)}</p>
    <p class="muted">${et(V.estimateSectionLede)}</p>
    <dl class="sdlc-cost-proposal sdlc-cost-estimate-proposal">
      <div><dt>${et(V.targetTokenLabel)}</dt><dd data-sdlc-target-tokens data-sdlc-proposed-tokens>${a.targetTokenBudget.toLocaleString("en-US")}</dd></div>
      <div><dt>${et(V.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${a.estimatedSpendUsd.toFixed(4)}</dd></div>
      <div><dt>${et(V.rateChipLabel)}</dt><dd><span class="sdlc-cost-rate-chip" data-sdlc-writer-rate-chip data-writer-id="${et(S)}">$${c.toFixed(4)} / 1k \xB7 ${et(S)}</span></dd></div>
    </dl>
    <input type="hidden" name="targetTokenBudget" value="${a.targetTokenBudget}" data-sdlc-target-token-budget-input>
    <input type="hidden" name="estimatedSpendUsd" value="${a.estimatedSpendUsd}" data-sdlc-estimated-spend-input>
    <input type="hidden" name="rateUsdPer1kTokens" value="${c}" data-sdlc-cost-rate>
    <p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling${m}>${et(V.estimateOverCeilingWarn)}</p>
  </div>
</div>`}});var Ue,v$,T$,t9,k$,C$,L$,E$=l(()=>{"use strict";W();N_();we();vc();Tc();Ue=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),v$=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",T$=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,t9=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},k$=e=>e===x?"You":ae(e),C$=e=>{let t=t9(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ae(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Ue(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Ue(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Ue(k$(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Ue(k$(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Ue(r)}</dd></div>
    </dl>
  </details>`},L$=e=>{let t=e.wizard;if(t===void 0)return"";let r=Ir(e.goal),o=e.status==="wizard_paused",n=!E(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let u=Qg(e),m=T$(t),S=m===null?"":v$(m),h=Mr(e),y=S.length===0?"":h===null||h>=4?` <strong>${Ue(S)}</strong>`:` <strong>${Ue(S)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Ue(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Ue(u.title)}${y}</p>
    <p class="muted">${Ue(u.detail)}</p>
    <div class="actions">
      ${C$(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ue(e.id)}">Open this run</a>
    </div>
  </section>`}let s=T$(t),i=s===null?"Wizard":v$(s),a=Mr(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ue(r)}</h2>
    <p class="lede">Paused at <strong>${Ue(i)}</strong>${Ue(c)} (last updated ${Ue(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${C$(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ue(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Rc,W$,R$=l(()=>{"use strict";Po();Rc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),W$=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${Rc(n.id)}"${n.id===e.runner?" selected":""}>${Rc(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Rc(e.runner)}">Checking ${Rc(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${pe("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${pe("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Rc(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var x$,I$=l(()=>{"use strict";x$=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var pi,O$,M$,N$,z$,D$=l(()=>{"use strict";Po();pi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),O$=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${pi(c.id)}"${c.id===r?" selected":""}>${pi(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${pi(n)}</option>`;return`<div class="field">${pe(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},M$=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${pi(t)}">Checking ${pi(o)}\u2026</p>`},N$=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${pe(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${pi(r)}</textarea><span class="muted">${o}</span></div></details>`,z$=e=>{let t=`<div class="sdlc-writer">${O$("judge","Judge",e.judge,e.writers,"I'll score it")}${M$("judge",e.judge,e.writers)}${N$("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${O$("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${M$("improver",e.improver,e.writers)}${N$("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var j$,$$=l(()=>{"use strict";j$=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var rv,H$,F$=l(()=>{"use strict";$$();rv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),H$=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${j$.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${rv(t.goal)}" title="${rv(t.goal)}">${rv(t.label)}</button>`).join("")}</div>`});var xc,r9,o9,ov,U$=l(()=>{"use strict";W();Po();xc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),r9=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},o9=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,ov=e=>{let t=r9(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=jl(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${pe(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${xc(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${xc(e.inputId)}" class="sdlc-pass-range" type="range" name="${xc(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${xc(a)}"><span class="sdlc-pass-mark" style="left:${o9(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${xc(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var s9,nv,zr,B$,G$=l(()=>{"use strict";wc();U_();Qj();t$();xg();o$();s$();a$();c$();f$();gf();P$();Po();K_();_$();E$();vc();R$();I$();D$();W();F$();U$();s9=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,nv='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',zr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),B$=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${zr(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${zr(e.skillNotice??"")}</div>`,o=`${vz}${Tz}`,n=e.resumableWizardCycle??null,s=n===null?"":L$(n),i=af(e.cycle),a=e.cycle===null?"":nf(e.cycle),c=e.cycle!==null&&ar(e.cycle),d=i$(e),u=s9(d.goal,d.prompt,e.canRun),m=z$({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),S=W$({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=`${ov({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${ov({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=w$({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),p=_w,b=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",A=e.cycle!==null&&E(e.cycle.status),f=d.running&&!A,P=A||f?"":" open",_=f?" sdlc-compose-run-focus":"",k=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${A?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,L=A?(()=>{let H=e.cycle!==null?Ir(e.cycle.goal):Ir(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${zr(H)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${k}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${k}</summary>`,R=A?" sdlc-compose-viewing-finished":"",I=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",N=c?"waiting":d.running?"running":"idle",U=d.running&&!c?' aria-busy="true"':"",G=`<section class="card sdlc-compose${R}${_}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${P}>
        ${L}
        <div class="sdlc-compose-details-body">
      <p class="lede">${p} ${zr(e.modelNote)}</p>
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
            <input class="input" type="text" name="folder" value="${zr(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${A$(Wc(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${nv}
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
            ${H$()}
            <textarea class="input textarea" name="goal" rows="4" required>${zr(d.goal)}</textarea>
          </div>
          <div class="field">
            ${pe("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${zr(d.prompt)}</textarea>
          </div>
          ${h}
          ${y}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${nv}
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
        ${x$()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${nv}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${zr(d.passScore)}; Step 4 pass \u2265 ${zr(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
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
    </section>`,q=e.history.length>0?l$:"",Ke=`${""}${n$}${Zj}${e$}${r$}${b$}${q}`;return`${t}${r}${G}${s}${a}${i}${o}${g$(e.history,e.cycle?.id??null)}${Ke}`}});var Ic,sv=l(()=>{"use strict";G$();Ic=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:B$(t)}))}});var q$,V$=l(()=>{"use strict";Xj();Ec();sv();pt();zn();q$=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:Yj({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=Z(e.storePath,o.cycleId);return _e(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(_o(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Ic(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:sr(e.storePath),resumableWizardCycle:null}),!0)}});var K$,ff,iv=l(()=>{"use strict";W();K$=g(require("node:os")),ff=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??K$.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??zt()}}});var J$,mi,av,Y$,X$,Oc=l(()=>{"use strict";W();we();h_();J$=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,mi=e=>{let t=ZN(e),r=Cn(e).map(s=>({id:s,label:bg[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},av=(e,t,r)=>t===x||t!==null&&e.writers.some(o=>o.id===t)?t:r,Y$=(e,t,r,o=null)=>({judge:av(e,t,e.judge),improver:av(e,r,e.improver),runner:av(e,o,e.runner)}),X$=e=>e===Ig?{goal:Og,prompt:Mg}:{goal:"",prompt:""}});var lv,Z$=l(()=>{"use strict";lv=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var Q$,i9,eH,tH,rH,oH=l(()=>{"use strict";W();Q$=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},i9=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},eH=(e,t)=>e.has("earlyStop")?!0:t!=="run",tH=e=>{let t=Q$(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=i9(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=Q$(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},rH=e=>zt(e)});var nH,sH,hf,cv=l(()=>{"use strict";W();we();Ve();Oc();Z$();oH();nH=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=lv(o);return n.ok?String(n.passScore):String(r)},sH=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return lv(n)},hf=e=>{let t=Y$(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=nH(e.posted,"passScore",70),o=nH(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),u=e.posted?.get("maxSpendUsd")?.trim()??"",m=e.posted?.get("intent")??"",S=e.posted===null?!0:eH(e.posted,m),h=(L,R)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:L,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:R,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:u,earlyStop:S});if(e.posted===null)return h(e.defaultFolder??Ln,null);let y=e.posted.get("folder")??Ln;if(e.posted.get("intent")==="choose-folder"){let L=e.pickFolder();return h(L===null?y:ut(L),null)}if((e.posted.get("intent")??"")!=="run")return h(y,null);let b=J$(e.goal,e.prompt);if(b!==null)return h(y,b);let A=sH(e.posted,"passScore",r);if(!A.ok)return h(y,A.errorMessage);let f=sH(e.posted,"modulePassScore",o);if(!f.ok)return h(y,f.errorMessage);let P=QN(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(P===null)return h(y,"Choose a judge and an improver.");let _=Rr(y);if(!_.ok)return h(y,_.errorMessage);let T=ez(e.installedIds,c,P.judge);if(T===null)return h(y,"Choose a runner for wizard step 4.");let k=tH({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return k.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:P.judge,improver:P.improver,workingDirectory:_.path,passScore:A.passScore,modulePassScore:f.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:T,runnerInstructions:a,costControls:rH(k.knobs)}:h(y,k.errorMessage)}});var gi,Sf,a9,dv,iH,yf,aH,l9,lH,uv,c9,d9,u9,pv,cH,dH,uH=l(()=>{"use strict";gi=g(require("node:fs")),Sf=g(require("node:path"));we();Ve();a9=["remember","choose-folder","run"],dv=()=>({folder:Ln,judge:"",improver:"",runner:""}),iH=e=>Sf.default.join(Sf.default.dirname(e),"prompt-optimizer-preferences.json"),yf=e=>typeof e=="string"?e:"",aH=e=>{let t=iH(e);if(!gi.default.existsSync(t))return dv();try{let r=JSON.parse(gi.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return dv();let o=r,n=yf(o.folder).trim();return{folder:n.length===0?Ln:n,judge:yf(o.judge),improver:yf(o.improver),runner:yf(o.runner)}}catch{return dv()}},l9=(e,t)=>{let r=iH(e);gi.default.mkdirSync(Sf.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;gi.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),gi.default.renameSync(o,r)},lH=(e,t)=>e===x||Cn(t).some(r=>r===e),uv=(e,t,r)=>e===null?t:e.length===0?"":lH(e,r)?e:t,c9=(e,t)=>{if(e===null)return t;let r=Rr(e);return r.ok?r.display:t},d9=e=>{let t=aH(e.storePath),r={folder:c9(e.folder,t.folder),judge:uv(e.judge,t.judge,e.installedIds),improver:uv(e.improver,t.improver,e.installedIds),runner:uv(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||l9(e.storePath,r)},u9=e=>{let t=Rr(e);return t.ok?t.display:Ln},pv=(e,t)=>lH(e,t)?e:"",cH=e=>{let t=aH(e.storePath);return{selection:{...e.selection,judge:pv(t.judge,e.installedIds)||e.selection.judge,improver:pv(t.improver,e.installedIds)||e.selection.improver,runner:pv(t.runner,e.installedIds)||e.selection.runner},defaultFolder:u9(t.folder)}},dH=e=>{let t=e.posted.get("intent")??"";if(!a9.includes(t))return;let r=e.posted.get("folder");d9({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var pH,p9,m9,mv,g9,Af,bf=l(()=>{"use strict";pH=g(require("node:os"));we();X_();xn();p9="Reply with the single word ok. Do not use tools.",m9=45e3,mv=async(e,t)=>{if(t===x)return{ok:!0,message:"You will do this step."};let r=zj(e,t);if(r!==null)return{ok:!0,message:r};let o=await Ze({writerAgent:t,prompt:p9,workingDirectory:pH.default.tmpdir(),timeoutMs:m9});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ae(t)} is ready.`;return Dj(e,t,n),{ok:!0,message:n}},g9=e=>[...new Set(e.filter(t=>t.length>0))],Af=async(e,t,r,o)=>{for(let n of g9([t,r,o??""])){let s=await mv(e,n);if(!s.ok)return s.message}return null}});var gv,mH=l(()=>{"use strict";W();gv=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!E(r.status)&&!(t!==null&&r.id===t))return r;return null}});var gH,fH=l(()=>{"use strict";er();W();pc();Ec();iv();cv();sv();pt();Ve();uH();gf();bf();mH();sf();zn();gH=async e=>{let t=e.posted===null?cH({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=hf({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>po("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(dH({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?ut(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await Af(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await Ic(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:ut(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:sr(e.route.storePath),resumableWizardCycle:gv(sr(e.route.storePath),null)});return}if(r.kind==="start"){let s=y$(r.workingDirectory,r.sourceSkillFile),i=jg(sc({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=ff({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:Mw({...Bl(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(z(e.route.storePath,a),_e(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(_o(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:Z(e.route.storePath,e.cycleId);n!==null&&(n=Mn(e.route.storePath,n),_e(e.route.storePath,n.id)),await Ic(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:sr(e.route.storePath),resumableWizardCycle:gv(sr(e.route.storePath),n?.id??null)})}});var hH,yH=l(()=>{"use strict";pt();hH=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";Oz(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var SH,AH=l(()=>{"use strict";SH=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var bH,PH=l(()=>{"use strict";Hz();Kj();V$();fH();yH();Oc();AH();zn();bH=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await uf(),o=mi(r),n=e.method==="POST"?SH(e.request.headers["content-type"],await e.readBody(e.request)):null;if(Vj({posted:n,storePath:e.storePath,response:e.response})||await q$(e,n,o))return;let s=X$(t.searchParams.get("example")),i=hH({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=$z({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await gH({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:jz(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var f9,wH,_H=l(()=>{"use strict";W();pt();f9=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",wH=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=Z(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!E(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=Nw({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${f9(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var vH,TH=l(()=>{"use strict";Ec();pt();vH=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:Z(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":_o(e.storePath,o)),!0}});var h9,kH,CH=l(()=>{"use strict";we();bf();h9=["claude-cli","codex","cursor","antigravity"],kH=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===x||h9.includes(t)?await mv(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var LH,EH=l(()=>{"use strict";W();LH=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:Hl,page:Fl,context:Ks,installedWriters:e,post:{method:"POST",url:Hl,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${Hl}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var Pf,WH=l(()=>{"use strict";W();F_();ni();Pf=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ce(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=E(e.status),n=e.errorKind??null,s=of({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:xr(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:Ks,page:`${Fl}?cycle=${encodeURIComponent(e.id)}`}}});var F,y9,RH,xH,IH=l(()=>{"use strict";F=g(rs());W();y9=(0,F.isType)({goal:F.isString,prompt:F.isString,workingDirectory:F.isString,judge:(0,F.isUndefinedOr)(F.isString),improver:(0,F.isUndefinedOr)(F.isString),passScore:(0,F.isUndefinedOr)(F.isNumber),maxRounds:(0,F.isUndefinedOr)(F.isNumber),maxTrials:(0,F.isUndefinedOr)(F.isNumber),maxSpendUsd:(0,F.isUndefinedOr)(F.isNumber),earlyStop:(0,F.isUndefinedOr)(F.isBoolean),earlyStopFlatRounds:(0,F.isUndefinedOr)(F.isNumber),confirmedTokenBudget:(0,F.isUndefinedOr)(F.isNumber),confirmedMaxSpendUsd:(0,F.isUndefinedOr)(F.isNumber),rateUsdPer1kTokens:(0,F.isUndefinedOr)(F.isNumber)}),RH=e=>{let t=e?.trim()??"";return t.length===0?null:t},xH=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return y9(t)?t.workingDirectory.trim().length===0?{ok:!1,error:ig}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:RH(t.judge),improver:RH(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:ig}}});var Dr,S9,OH,MH,NH=l(()=>{"use strict";W();Dr=g(rs()),S9=(0,Dr.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:Dr.isNumber,confirmedMaxSpendUsd:(0,Dr.isUndefinedOr)(Dr.isNumber),rateUsdPer1kTokens:(0,Dr.isUndefinedOr)(Dr.isNumber)}),OH=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:S9(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},MH=(e,t)=>{let r=Wr({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var A9,zH,DH=l(()=>{"use strict";W();we();cv();Oc();A9=e=>e.map(t=>t.id).join(", "),zH=e=>{let t=mi(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===x||n===x)return{ok:!1,error:ww,installedWriters:t.writers};if(o===null||n===null){let a=A9(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=hf({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var b9,jH,$H=l(()=>{"use strict";W();iv();EH();WH();Oc();IH();NH();DH();pt();b9=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},jH=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let u=Z(e.storePath,t);return u===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:Pf(u)}}let r=await e.handlers.readInstalledIds(),o=mi(r);if(e.method==="GET")return{status:200,body:LH(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let u=OH(e.rawBody);if(u.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(u.kind==="invalid")return{status:400,body:{ok:!1,error:u.error}};let m=Z(e.storePath,t);if(m===null)return{status:404,body:{ok:!1,error:"That run is not on this Mac."}};let S=MH(m,u.body);return S.ok?(z(e.storePath,S.cycle),{status:200,body:Pf(S.cycle)}):{status:400,body:{ok:!1,error:S.error}}}let n=b9(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let u=Qs({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:u.targetTokenBudget,proposedTokenBudget:u.targetTokenBudget,estimatedSpendUsd:u.estimatedSpendUsd,rateUsdPer1kTokens:u.rateUsdPer1kTokens??null,proposalStub:u.stub===!0,confirmationRequired:!0}}}let s=xH(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=zH({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=sc({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:dt({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let u=Wr({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!u.ok)return{status:400,body:{ok:!1,error:u.errorMessage}};c=u.costControls}let d=ff({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:Bl(i.prompt),runnerModel:i.runner,costControls:c});return z(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:Pf(d)}}});var HH,FH=l(()=>{"use strict";zn();bf();$H();HH=async e=>{let t=await jH({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:uf,readWritersReady:Af,startCycle:_e}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var BH,P9,w9,UH,_9,GH,qH=l(()=>{"use strict";BH=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],P9=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},w9=e=>{let t={};for(let n of e)for(let s of new Set(BH(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},UH=(e,t)=>{let r=P9(BH(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},_9=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},GH=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=w9(e.map(i=>i.text)),s=UH(o,n);return e.map(i=>({id:i.id,score:_9(s,UH(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var fv,v9,T9,VH,k9,C9,L9,E9,hv,yv=l(()=>{"use strict";fv=g(require("node:path"));Ve();qH();gf();v9=5,T9=20,VH=280,k9=e=>[e.name,e.description,e.promptText].join(`
`),C9=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=VH?t:`${t.slice(0,VH-3)}...`},L9=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),E9=e=>e===void 0||!Number.isFinite(e)?v9:Math.min(T9,Math.max(1,Math.floor(e))),hv=e=>{let t=e.query.trim(),r=E9(e.limit),o=Rr(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=Wc(o.path),s=GH(n.map(d=>({id:d.fileName,text:k9(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=fv.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let u=i.get(d.id);return u===void 0?[]:[{skillId:u.fileName,name:u.name,description:u.description,score:d.score,sourcePath:fv.default.join(a,u.fileName,"SKILL.md"),excerpt:C9(u),source:"filesystem"}]});return{query:t,hits:c,context:L9(c)}}});var KH,JH=l(()=>{"use strict";yv();KH=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:hv({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var YH,XH=l(()=>{"use strict";JH();YH=async e=>{let t=KH({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var W9,Sv,ZH=l(()=>{"use strict";Lz();PH();_H();TH();CH();FH();XH();W9=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},Sv=async e=>{let t=W9(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await HH(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await YH(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:Cz()})),!0):(await kH({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||wH({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||vH({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await bH(e),!0)}});var QH=l(()=>{"use strict";ZH();yv();xn()});var Dn,Mc,R9,x9,I9,O9,eF,tF=l(()=>{"use strict";Dn=g(require("node:fs")),Mc=g(require("node:path")),R9="prompt-optimizer-cycles.json",x9="prompt-optimizer-preferences.json",I9="prompt-sdlc-cycles.json",O9="prompt-sdlc-preferences.json",eF=e=>{let t=Mc.default.join(e,R9),r=Mc.default.join(e,I9);if(Dn.default.existsSync(t)||!Dn.default.existsSync(r))return t;try{Dn.default.renameSync(r,t)}catch{return r}let o=Mc.default.join(e,O9),n=Mc.default.join(e,x9);if(Dn.default.existsSync(o)&&!Dn.default.existsSync(n))try{Dn.default.renameSync(o,n)}catch{}return t}});var fi,M9,Av,rF=l(()=>{"use strict";fi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),M9=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],Av=e=>{let t=M9.map(i=>`<option value="${fi(i.value)}">${fi(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${fi(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${fi(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${fi(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${fi(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Nc,sF,N9,iF,z9,D9,aF,_f,oF,nF,j9,$9,jr,zc,wf,H9,vf,bv,F9,Pv,lF,wv,cF,U9,B9,G9,dF,uF,pF,Dc=l(()=>{"use strict";Nc=g(require("node:fs")),sF=g(require("node:path")),N9="estimate-history.ndjson",iF=100,z9=500,D9=2e4,aF=e=>sF.default.join(e,N9),_f=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,z9),oF=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,D9),nF=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,j9=e=>({...e,estimateTokens:nF(e.estimateTokens),actualTokens:nF(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),$9=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},jr=e=>{let t=aF(e);return Nc.default.existsSync(t)?Nc.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return $9(n)?[j9(n)]:[]}catch{return[]}}):[]},zc=(e,t)=>{Nc.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Nc.default.writeFileSync(aF(e),r,"utf8")},wf=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),H9=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${wf(o.task)} | ${wf(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},vf=e=>{let t=jr(e.reportsDir),r=_f(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);zc(e.reportsDir,[...s,n])},bv=e=>{let t=jr(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?_f(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);zc(e.reportsDir,[...i,s])},F9=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-iF),Pv=e=>[...jr(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),lF=e=>{let t=jr(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=oF(e.input),n=oF(e.output),s=_f(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);zc(e.reportsDir,[...c,a])},wv=(e,t)=>{let r=jr(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},cF=e=>({table:H9(F9(jr(e))),embedding:null}),U9=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},B9=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-iF),G9=e=>{let t=U9(B9(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${wf(s.task)} | ${wf(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},dF=e=>{let t=jr(e.reportsDir),r=_f(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);zc(e.reportsDir,[...s,n])},uF=e=>{let t=jr(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);zc(e.reportsDir,[...s,n])},pF=e=>G9(jr(e))});var mF=l(()=>{"use strict";Dc()});var $r,_v,q9,vv,V9,K9,Tf,kf,J9,Tv,gF=l(()=>{"use strict";mF();m_();$r=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_v=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},q9=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${_v(-r)} under`:`${_v(r)} over`},vv=e=>e.toLocaleString("en-US"),V9=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${vv(-r)} under`:`${vv(r)} over`},K9=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},Tf=e=>e===null?"\u2014":_v(e),kf=e=>e===null?"\u2014":vv(e),J9=`(function () {
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
})();`,Tv=e=>{let r=Pv(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":q9(n.estimateSeconds,n.actualSeconds),u=n.estimateTokens===null||n.actualTokens===null?"no estimate":V9(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${$r(K9(i))}</button></td>
        <td>${$r(c)}</td>
        <td>${Tf(n.estimateSeconds)}</td>
        <td>${Tf(n.actualSeconds)}</td>
        <td>${$r(d)}</td>
        <td>${kf(n.estimateTokens)}</td>
        <td>${kf(n.actualTokens)}</td>
        <td>${$r(u)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${$r(c)}</p>
        <h2>Input</h2>
        <pre>${$r(i)}</pre>
        <h2>Output</h2>
        <pre>${$r(a)}</pre>
        <p>Time: estimated ${Tf(n.estimateSeconds)} \xB7 actual ${Tf(n.actualSeconds)} \xB7 ${$r(d)}</p>
        <p>Tokens: estimated ${kf(n.estimateTokens)} \xB7 actual ${kf(n.actualTokens)} \xB7 ${$r(u)}</p>
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
            ${Cg({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${J9}</script>`}
    </section>`}});var fF=l(()=>{"use strict";rF();gF()});var hi,Y9,X9,kv,hF=l(()=>{"use strict";hi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Y9=(e,t,r)=>{let o=hi(t),n=hi(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},X9=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${hi(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>Y9(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${hi(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${hi(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${hi(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},kv=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(X9).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var yF=l(()=>{"use strict";hF()});var jc,SF,AF,Cv,Lv,Ev,bF=l(()=>{"use strict";jc=g(require("node:fs")),SF=g(require("node:path"));El();qm();AF=(e,t,r)=>Hs({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,Cv=(e,t,r)=>{let o=AF(e,t,r);if(o===null)return[];if(!jc.default.existsSync(o))return[];let n=jc.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},Lv=e=>{let t=AF(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:kr(e.entry.prompt),output:kr(e.entry.output)};jc.default.mkdirSync(SF.default.dirname(t),{recursive:!0}),jc.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},Ev=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var Z9,Q9,$c,Cf,Wv=l(()=>{"use strict";Z9=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Q9=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,$c=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=Z9(i.assistantOutput),d=c.length>0?`Assistant: ${Q9(c,t)}`:null,u=[a,d].filter(m=>m!==null).join(`

`);if(u.length!==0){if(n+u.length>r&&o.length>0)break;o.unshift(u),n+=u.length}}return o.join(`

`)},Cf=e=>{let t=e.userMessage.trim(),r=$c({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var cr,Hc,Iv,eY,tY,Rv,rY,Ov,Lf,PF,wF,oY,yi,Mv,xv,_F,nY,vF,Si,Ef,Fc,sY,Uc,Nv,Wf,Rf,TF=l(()=>{"use strict";cr=g(require("node:fs")),Hc=g(require("node:path")),Iv=require("node:crypto");Wv();eY="writer-sessions",tY="active-index.json",Rv=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rY=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Ov=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},Lf=e=>{let t=Hc.default.join(e.installDir,eY);return cr.default.mkdirSync(t,{recursive:!0}),t},PF=e=>Hc.default.join(Lf(e),tY),wF=(e,t)=>Hc.default.join(Lf(e),`${t}.canonical.json`),oY=(e,t)=>Hc.default.join(Lf(e),`${t}.continuation.json`),yi=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,Mv=e=>{let t=PF(e);if(!cr.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(cr.default.readFileSync(t,"utf8"));if(!Rv(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!Rv(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!rY(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},xv=(e,t)=>{cr.default.writeFileSync(PF(e),JSON.stringify(t,null,2))},_F=(e,t)=>{cr.default.writeFileSync(wF(e,t.sessionId),JSON.stringify(t,null,2))},nY=(e,t)=>{cr.default.writeFileSync(oY(e,t.sessionId),JSON.stringify(t,null,2))},vF=(e,t)=>{let r=$c({turns:t.turns});nY(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Si=(e,t)=>{let r=wF(e,t);if(!cr.default.existsSync(r))return null;try{let o=JSON.parse(cr.default.readFileSync(r,"utf8"));return!Rv(o)||typeof o.sessionId!="string"?null:o}catch{return null}},Ef=(e,t=20)=>{let r=Lf(e),o=cr.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Si(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Fc=(e,t,r)=>{let o=Ov(r);return Mv(e).entries.find(i=>yi(i)===yi({writerAgent:t,projectFolderPath:o}))?.sessionId??null},sY=(e,t,r,o)=>{let n=Mv(e),s=yi({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>yi(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];xv(e,{entries:i})},Uc=(e,t,r)=>{let o=(0,Iv.randomUUID)(),n=new Date().toISOString(),s=Ov(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return _F(e,i),vF(e,i),sY(e,t,s,o),o},Nv=(e,t,r)=>{let o=Fc(e,t,r);return o!==null?o:Uc(e,t,r)},Wf=(e,t,r)=>{let o=Ov(r),n=Mv(e);if(o===null&&r===void 0){xv(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=yi({writerAgent:t,projectFolderPath:o});xv(e,{entries:n.entries.filter(i=>yi(i)!==s)})},Rf=e=>{let t=Nv(e.layout,e.writerAgent,e.projectFolderPath),r=Si(e.layout,t);if(r===null)return;let o={id:(0,Iv.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};_F(e.layout,n),vF(e.layout,n)}});var iY,aY,xf,zv,kF=l(()=>{"use strict";iY=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",aY=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},xf=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",zv=e=>{let t=xf(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=iY(r,e.userPromptCharacterCount),n=aY({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var If=l(()=>{"use strict";bF();TF();Wv();kF()});var CF=l(()=>{"use strict";kp();Ps();XS()});var LF=l(()=>{"use strict";TS()});var tt,cY,dY,Dv,jv,$v,EF=l(()=>{"use strict";CF();LF();tt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cY=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},dY=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=Na(o);return`value="${tt(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${tt(r)}"`},Dv=(e,t,r,o,n)=>{let s=Cp[t];return`<label class="field">
          <span class="field-label">${tt(o)} API key \u2014 ${tt(cY(e,t))} \xB7 <a class="field-link" href="${tt(s.href)}" target="_blank" rel="noopener noreferrer">${tt(s.label)}</a></span>
          <input class="input mono" type="password" name="${tt(r)}" autocomplete="off" ${dY(e,t,n)} />
        </label>`},jv=(e,t,r,o)=>{let n=Sp(e[t]?.model),s=new Set(yp[t].map(c=>c.value)),i=yp[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${tt(c.value)}"${d}>${tt(c.label)}</option>`}).join(""),a=n!==Qo&&!s.has(n)?`<option value="${tt(n)}" selected>${tt(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${tt(o)}</span>
          <select class="input mono" name="${tt(r)}">${i}${a}</select>
        </label>`},$v=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${tt(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${Dv(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${jv(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${Dv(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${jv(e.secrets,"openai","openaiModel","OpenAI model")}
        ${Dv(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${jv(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var WF=l(()=>{"use strict";EF()});var Of,RF,xF=l(()=>{"use strict";Of=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RF=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${Of(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${Of(s.name)}</strong> <span class="muted mono">(${Of(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${Of(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var uY,IF,OF,MF=l(()=>{"use strict";uY=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,IF=e=>e.kind==="folder",OF=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&IF(d)){s=d;continue}let u={kind:"folder",name:a,children:new Map};s.children.set(a,u),s=u}}let r=o=>{let n=[];for(let s of o.children.values()){if(IF(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(uY)};return r(t)}});var NF,Hv,zF=l(()=>{"use strict";NF=g(require("node:path")),Hv=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Hv(r.children,t)}</ul>
            </details>
          </li>`;let o=NF.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var DF,vo,pY,mY,Bc,gY,Fv,jF=l(()=>{"use strict";Xm();DF=g(require("node:path"));xF();MF();zF();vo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pY=()=>`(() => {
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

})();`,mY=()=>`(() => {
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
})();`,Bc=e=>{let t=Ol({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=RF({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${vo(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${vo(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':gY(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${vo(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${vo(s)}" />
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
    <script>${pY()}</script>
    <script>${mY()}</script>`;return`${t}${r}${o}${c}${d}`},gY=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=OF(a.items.map(S=>({...S,relativePath:typeof S.relativePath=="string"&&S.relativePath.length>0?S.relativePath:DF.default.relative(a.sourceRoot,S.sourcePath).replaceAll("\\","/")}))),u=Hv(d,vo),m=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${vo(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${vo(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${m} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${u}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${vo(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},Fv=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=a.trim();Number.isFinite(d)&&u.length>0&&n.set(d,u)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??u??a,S=t.sets[i];if(S===void 0)continue;let h=a.length>0?a:S.proposedSlug,y=m.length>0?m:S.proposedName,p=r.has(i),b=S.items.map(A=>({id:A.id,kind:A.kind,title:A.title,sourcePath:A.sourcePath,include:p}));s.push({slug:h,name:y,items:b})}return s}});var $F=l(()=>{"use strict";jF()});var fY,Uv,HF=l(()=>{"use strict";_r();fY=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},Uv=fY});var hY,FF,UF=l(()=>{"use strict";_r();hY=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},FF=hY});var BF=l(()=>{"use strict"});var jn,yY,Bv,GF=l(()=>{"use strict";Xm();sb();jn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yY=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,Bv=e=>{let t=e.flashError?`<div class="alert-error">${jn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${jn(e.flashMessage)}</div>`:"",r=Ol({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${jn(yY(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,u=`<a class="btn btn-secondary btn-compact" href="${jn(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=gm(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
                  <input type="hidden" name="projectId" value="${jn(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${jn(n.name)}</strong>
                  <span class="muted mono">${jn(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${u}${m}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then pull playbooks into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var qF=l(()=>{"use strict";BF();fm();GF()});var Mf,VF=l(()=>{"use strict";Mf=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var KF,$t,Gv=l(()=>{"use strict";KF=g(require("node:path"));gt();Me();J();le();JA();$t=e=>{let t=$()?.layout.installDir??C();if(KF.default.basename(t)===Bt)return it;let r=$(),o=r!==null?Le(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):it}});var qv,JF=l(()=>{"use strict";Kt();Gv();qv=async e=>{let t=De(e.installDir),r=t?.bundleVersion??null,o=$t(t);try{let n=await gs(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Bo(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var Vv,YF=l(()=>{"use strict";Vv=e=>!e});var Kv,Ai,Jv=l(()=>{"use strict";J();Kv=()=>`http://127.0.0.1:${vy()}/update/run`,Ai=async e=>{try{let t=await fetch(Kv(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var SY,XF,Yv,ZF=l(()=>{"use strict";J();se();Jv();SY=()=>{hr({launchAgentLabel:Ce(),installDir:C()})},XF=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Yv=async()=>{SY();let e=await Ai({force:!0});if(e.ok)return{ok:!0,message:XF(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:XF(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Kt(),sW)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var Xv=l(()=>{"use strict";YP();VF();Gv();JF();YF();ZF();Jv()});var QF,e1=l(()=>{"use strict";QF=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var t1,r1,Zv,Qv,o1=l(()=>{"use strict";t1=require("node:crypto"),r1=g(require("node:fs"));er();le();le();e1();Zv=!1,Qv=async e=>{if(Zv)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!QF(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=X({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&r1.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,t1.randomUUID)();Zv=!0;try{if(await YA(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await _s({...r,workspace:n},e.writerAgent,t);return await nl(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Zv=!1}}});var n1=l(()=>{"use strict";o1()});var At,AY,s1,i1,eT,tT,rT,oT,nT,sT,iT=l(()=>{"use strict";At=require("node:crypto"),AY=Buffer.from("302a300506032b6570032100","hex"),s1=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},i1=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,At.createPublicKey)({key:Buffer.concat([AY,t]),format:"der",type:"spki"})},eT=()=>{let{publicKey:e,privateKey:t}=(0,At.generateKeyPairSync)("ed25519");return{publicKeyRaw:s1(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},tT=e=>(0,At.createPrivateKey)(e),rT=(e,t)=>(0,At.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),oT=(e,t,r)=>{try{let o=i1(e);return(0,At.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},nT=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,sT=()=>(0,At.randomBytes)(32).toString("base64url")});var Hr,Nf,a1,bY,PY,zf,aT,lT,l1=l(()=>{"use strict";Hr=g(require("node:fs")),Nf=g(require("node:path"));iT();J();Me();a1=e=>Nf.default.join(e.installDir,Yr),bY=(e,t)=>{if(e.profileEmail===null||t===a1(e)||Hr.default.existsSync(t))return;let r=a1(e);Hr.default.existsSync(r)&&(Hr.default.mkdirSync(Nf.default.dirname(t),{recursive:!0}),Hr.default.renameSync(r,t))},PY=e=>{if(!Hr.default.existsSync(e))return null;try{let t=Hr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},zf=e=>{let t=Nu(e);bY(e,t);let r=PY(t);if(r!==null)return r;let o=eT();return Hr.default.mkdirSync(Nf.default.dirname(t),{recursive:!0}),Hr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},aT=e=>{let t=zf(e.layout),r=sT(),o=nT({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=tT(t.privateKeyPem),s=rT(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},lT=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return oT(e.serverPublicKey,t,e.serverAttestation)}});var cT=l(()=>{"use strict";l1();iT()});var p1,Gc,pT,mT,c1,wY,dT,Df,me,m1,_Y,uT,vY,TY,gT,ye,ve,Ht,kY,d1,u1,qc,Vc,g1=l(()=>{"use strict";p1=g(require("node:http")),Gc=g(require("node:fs")),pT=g(require("node:path"));jf();kl();uO();mO();AO();Xo();vP();KP();KO();YO();QH();tF();fF();yF();If();WF();$F();ao();er();_r();HF();UF();qF();Xv();Kt();n1();le();cT();mT=e=>pP(e)??"never",c1=48e3,wY=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,dT=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??rm(),reveal:t.reveal,installed:Qt(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Df=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:lo(t,e)},me=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),m1=200,_Y=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',uT=e=>{let t=e.trim().slice(0,m1),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},vY=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${me(t)}</div>`,TY=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${me(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',gT={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},ye=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...gT}),e.end(JSON.stringify(r))},ve=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},Ht=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},kY=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=_Y(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${me(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=Vv(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Cl(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${me(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${me(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${me(mT(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${me(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},d1=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},u1=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,m1)},qc=e=>{let t=pT.default.join(e.layout.installDir,"link-code.txt"),r=()=>De(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:Mf(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let y=h.installVersion??r(),p=await i(),b=ew(p),A=h.updateFlash??null,f=tw(A),P=vY(A,h.updateError??null);return ZP({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:$t(y),installBundleVersionLabel:Mf(y),prependBody:`${f}${P}${b}`,headerUpdateButtonHtml:QP(p)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await qv(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:uT("An update is already running.")}),h.end();return}c=!0;try{let p=await Yv(),b=p.ok?"/?update=ok":uT(p.message);h.writeHead(303,{Location:b}),h.end()}catch(p){let b=p instanceof Error&&p.message.trim().length>0?p.message:"Install bundle update failed.";h.writeHead(303,{Location:uT(b)}),h.end()}finally{c=!1,a()}},u=async(h,y)=>{let p=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",b=o(),A=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:b.installVersion,body:`<section class="card">
      <h1>${me(y)}</h1>
      <p>${me(p)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(A)},m=()=>{if(Gc.default.existsSync(t))return Gc.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return Gc.default.writeFileSync(t,h,"utf8"),h},S=p1.default.createServer((h,y)=>{(async()=>{let p=h.url?.split("?")[0]??"/",b=h.method??"GET";if(b==="OPTIONS"){y.writeHead(204,gT),y.end();return}if(!await Sv({method:b,pathname:p,request:h,response:y,requestUrl:h.url??"/",storePath:eF(pT.default.dirname(e.layout.configPath)),readBody:Ht,sendHtml:ve,renderShell:n})){if(b==="GET"&&p==="/health"){let A=e.controllers.getStatus(),f=o();ye(y,200,{ok:!0,...A,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt});return}if(b==="GET"&&p==="/api/status"){let A=o();ye(y,200,{...e.controllers.getStatus(),linkCode:m(),installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt});return}if(b==="GET"&&p==="/api/traffic"){ye(y,200,{entries:vl(e.layout)});return}if(b==="DELETE"&&p==="/api/traffic"||b==="POST"&&p==="/api/traffic/clear"){if(fP(e.layout),b==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}ye(y,200,{ok:!0});return}if(b==="GET"&&p==="/api/trace"){ye(y,200,{entries:Fm(e.layout)});return}if(b==="DELETE"&&p==="/api/trace"||b==="POST"&&p==="/api/trace/clear"){if(SP(e.layout),b==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}ye(y,200,{ok:!0});return}if(b==="POST"&&p==="/api/errors/clear"){AP(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(b==="GET"&&p==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let P=await Us({layout:e.layout,query:f,limit:20});ye(y,200,{chunks:P,query:f});return}ye(y,200,{chunks:Fs(e.layout).slice(-50).reverse()});return}if(b==="POST"&&p==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(b==="GET"&&p==="/api/update-status"){let A=await i();ye(y,200,{ok:!0,...A});return}if((b==="GET"||b==="POST")&&p==="/api/update"){await d(y);return}if(b==="GET"&&p==="/"){let A=e.controllers.getStatus(),f=o(),P=Qt(e.layout),_=Um(e.layout.errorLogPath);ve(y,await n({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:d1(h.url??void 0),updateError:u1(h.url??void 0),body:rw({wsConnected:A.wsConnected,lastHeartbeatAt:A.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:P.sets.length,knowledgeChunkCount:Fs(e.layout).length,trafficEntryCount:vl(e.layout).length,wakeError:A.wakeError,errorLogByteSize:_.byteSize,errorLogExists:_.exists})}));return}if(b==="GET"&&p==="/task"){let A=e.controllers.getStatus(),f=o(),P=$(),_=new URL(h.url??"/",`http://127.0.0.1:${43347}`),T=_.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,k=_.searchParams.get("failed")==="1"?_.searchParams.get("error")?.trim()??"Task failed.":null,L=_.searchParams.get("runId");ve(y,await n({title:"Task",activePath:"/task",installVersion:f.installVersion,body:Av({defaultWorkspace:P?.workspace??"",wsConnected:A.wsConnected,flashMessage:T,flashError:k,lastRunId:L})}));return}if(b==="POST"&&p==="/task/dispatch"){let A=await Ht(h),f=new URLSearchParams(A),P=f.get("prompt")?.trim()??"",_=f.get("writerAgent")?.trim()??"claude-cli",T=f.get("projectFolder")?.trim()??"",k=await Qv({prompt:P,writerAgent:_,...T.length>0?{projectFolderPath:T}:{}}),L=new URLSearchParams;k.ok?L.set("ok","1"):(L.set("failed","1"),k.errorMessage!==void 0&&L.set("error",k.errorMessage.slice(0,240))),k.agentRunId!==void 0&&L.set("runId",k.agentRunId),y.writeHead(303,{Location:`/task?${L.toString()}`}),y.end();return}if(b==="GET"&&p==="/writer-sessions"){let A=o(),f=Ef(e.layout,12);ve(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:A.installVersion,updateFlash:d1(h.url??void 0),updateError:u1(h.url??void 0),body:kv({sessions:f})}));return}if(b==="GET"&&p==="/errors"){let A=o(),f=Um(e.layout.errorLogPath);ve(y,await n({title:"Errors",activePath:"/errors",installVersion:A.installVersion,body:PP({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(b==="GET"&&p==="/status"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),P=he(e.layout),_=P!==null?Ee(P,12e4):TP(f.lastHeartbeatAt,12e4),T=kP({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:_}),k=o();ve(y,await n({title:"Status",activePath:"/status",installVersion:k.installVersion,body:`${kY({status:f,healthBadge:T,revived:A.searchParams.get("revived")==="1",linkCode:m(),installBundleVersion:k.installBundleVersion,installBundleUpdatedAt:k.installBundleUpdatedAt})}${EP({installDir:e.layout.installDir})}${LP({entries:Fm(e.layout)})}`}));return}if(b==="GET"&&p==="/traffic"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=vl(e.layout),P=o(),_=f.map(L=>`<tr><td title="${me(L.at)}">${me(mT(L.at))}</td><td>${me(L.direction)}</td><td><code>${me(L.type)}</code></td><td>${me(L.summary)}</td><td>${me(L.action??"")}</td></tr>`).join(""),T=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${_}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',k=A.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";ve(y,await n({title:"Traffic",activePath:"/traffic",installVersion:P.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${k}
              ${T}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(b==="GET"&&p==="/projects"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),P=$t(f.installVersion),_=await Df(e.layout),T=A.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":A.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,k=A.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,L=$(),R=L===null?null:X({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),I=R===null?{}:Object.fromEntries((await Promise.all(_.projects.map(async N=>{let U=await Uv(R,N.id);return[N.id,U?.counts??null]}))).filter(N=>N[1]!==null));ve(y,await n({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:Bv({projects:_.projects,compositionCountsByProjectId:I,cloudAppOrigin:P,syncMessage:_.message,syncOk:_.ok,flashMessage:k,flashError:T})}));return}if(b==="GET"&&p==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",P=$(),_=P===null?null:X({wsUrl:P.wsUrl,pairingToken:P.pairingToken}),T=f.length>0&&_!==null?po():null;if(T===null||_===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Ge({projectFolderPath:T}),!await ll(_,f,T)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(b==="POST"&&p==="/projects/delete"){let A=await Ht(h),f=new URLSearchParams(A).get("projectId")?.trim()??"",P=$(),_=P===null?null:X({wsUrl:P.wsUrl,pairingToken:P.pairingToken});if(_===null||f.length===0){y.writeHead(303,{Location:"/projects?deleteError=1"}),y.end();return}let T=await fb(_,f);y.writeHead(303,{Location:T.ok?"/projects?deleted=1":"/projects?deleteError=1"}),y.end();return}if(b==="GET"&&p==="/project"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=A.searchParams.get("id")?.trim()??"",P=o(),_=$t(P.installVersion),T=await Df(e.layout),k=vr(T.projects,f);if(k===null){await u(y,"Project not found");return}let L=A.searchParams.get("linked")==="1"?A.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${A.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${A.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:A.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,R=A.searchParams.get("knowledgePromoted"),I=R!==null?`Marked ${R} lesson(s) as promoted in Agent Witch.`:null,N=A.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,U=A.searchParams.get("tab")?.trim()??"harness",G=U==="workflows"||U==="agents"||U==="knowledge"?U:"harness",q=$(),Ke=q===null?null:X({wsUrl:q.wsUrl,pairingToken:q.pairingToken}),H=Ke===null?null:await Uv(Ke,k.id),ke=0;if(Ke!==null)try{let Jr=await fetch(`${Ke.appOrigin}/api/agent-witch/projects/${encodeURIComponent(k.id)}/knowledge`,{method:"GET",headers:{[$e]:Ke.pairingToken},signal:AbortSignal.timeout(1e4)});if(Jr.ok){let pr=await Jr.json();typeof pr=="object"&&pr!==null&&typeof pr.candidateCount=="number"&&(ke=pr.candidateCount)}}catch{ke=0}ve(y,await n({title:k.name,activePath:"/projects",installVersion:P.installVersion,body:co({project:k,cloudAppOrigin:_,installed:Qt(e.layout),linkedSetSlugs:Xt(k.projectFolderPath),composition:H,knowledgeCandidateCount:ke,activeTab:G,flashMessage:L??I,flashError:N})}));return}if(b==="POST"&&p==="/projects/pull-bound-harness"){let A=await Ht(h),f=await ib({rawBody:A,layout:e.layout});if(f.kind==="not_found"){await u(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let P=o();ve(y,await n({title:f.title,activePath:"/projects",installVersion:P.installVersion,body:f.body}));return}if(b==="POST"&&p==="/projects/link-harness"){let A=await Ht(h),f=new URLSearchParams(A),P=f.get("projectId")?.trim()??"",_=await Df(e.layout),T=vr(_.projects,P);if(T===null){await u(y,"Project not found");return}let k=f.getAll("applySet").map(G=>String(G)),L=Ja({layout:e.layout,projectFolderPath:T.projectFolderPath,setSlugs:k});if(!L.ok){let G=o(),q=$t(G.installVersion);ve(y,await n({title:T.name,activePath:"/projects",installVersion:G.installVersion,body:co({project:T,cloudAppOrigin:q,installed:Qt(e.layout),linkedSetSlugs:Xt(T.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:L.errorMessage})}));return}let R=$(),I=R===null?null:X({wsUrl:R.wsUrl,pairingToken:R.pairingToken}),N=I===null?!1:await cn(I,T.id,L.appliedSetSlugs),U=new URLSearchParams({linked:"1",files:String(L.writtenFileCount),bindingsSynced:N?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(T.id)}&${U.toString()}`}),y.end();return}if(b==="POST"&&p==="/projects/remove-harness-set"){let A=await Ht(h),f=await ab({rawBody:A,layout:e.layout});if(f.kind==="not_found"){await u(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let P=o();ve(y,await n({title:f.title,activePath:"/projects",installVersion:P.installVersion,body:f.body}));return}if(b==="POST"&&p==="/project/knowledge/promote-all"){let A=await Ht(h),P=new URLSearchParams(A).get("projectId")?.trim()??"",_=await Df(e.layout),T=vr(_.projects,P);if(T===null){await u(y,"Project not found");return}let k=$(),L=k===null?null:X({wsUrl:k.wsUrl,pairingToken:k.pairingToken}),R=L===null?{ok:!1,promotedCount:0}:await FF(L,T.id),I=new URLSearchParams({tab:"knowledge",...R.ok?{knowledgePromoted:String(R.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(T.id)}&${I.toString()}`}),y.end();return}if(b==="GET"&&p==="/harness"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),P=Qa(e.layout),_=A.searchParams.get("submitted")==="1",T=_?A.searchParams.get("syncFailed")==="1"?`Local harness updated (${A.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:A.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${A.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":A.searchParams.get("stopped")==="1"?`Reveal stopped. ${P?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:A.searchParams.get("revealed")==="1"?`Reveal found ${P?.sets.length??0} set(s).`:null,k=P?.scanRoots[0]??rm(),L=wY(e.layout,{reveal:P,importQuery:A.searchParams.get("import")==="1",justSubmitted:_}),R=$t(f.installVersion);ve(y,await n({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:Bc(dT(e.layout,{cloudAppOrigin:R,reveal:P,scanFolder:k,flashMessage:T,importSectionExpanded:L}))}));return}if(b==="POST"&&p==="/api/harness/pick-folder"){let A=po();if(A===null){ye(y,200,{cancelled:!0});return}ye(y,200,{path:A});return}if(b==="GET"&&p==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",P=Ka(f);if(P===null){ye(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let _=Gc.default.readFileSync(P,"utf8"),T=_.length>c1?`${_.slice(0,c1)}
\u2026 (truncated)`:_;ye(y,200,{content:T})}catch{ye(y,500,{errorMessage:"Could not read file."})}return}if(b==="POST"&&p==="/api/harness/reveal/add-project"){let A=await Ht(h),f="";try{let T=JSON.parse(A);typeof T=="object"&&T!==null&&typeof T.projectPath=="string"&&(f=T.projectPath.trim())}catch{ye(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){ye(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let P=Qa(e.layout),_=jA({reveal:P,projectPath:f});if(_===null||_.sets.length===0){ye(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}im(e.layout,_),ye(y,200,{ok:!0,setCount:_.sets.length});return}if(b==="GET"&&p==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){ye(y,400,{errorMessage:"Choose a folder to scan first."});return}let P=!1;h.on("close",()=>{P=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...gT});let _=$A({scanRoot:f,response:y,shouldAbort:()=>P});im(e.layout,_),y.end();return}if(b==="POST"&&p==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(b==="POST"&&p==="/harness/submit"){let A=Qa(e.layout);if(A===null){let R=o(),I=$t(R.installVersion);ve(y,await n({title:"Harness",activePath:"/harness",installVersion:R.installVersion,body:Bc(dT(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await Ht(h),P=new URLSearchParams(f),_=Fv(P,A),T=FA({layout:e.layout,sets:_});if(!T.ok){let R=o(),I=$t(R.installVersion);ve(y,await n({title:"Harness",activePath:"/harness",installVersion:R.installVersion,body:Bc(dT(e.layout,{cloudAppOrigin:I,reveal:A,flashError:T.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}BA(e.layout);let L=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${T.writtenItemCount??0}${L}`}),y.end();return}if(b==="GET"&&p==="/writer-api"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),P=$()?.writerExecutionBackend??je(void 0),_=Re(e.layout.configPath),T=ro(_),k=A.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,L=o();ve(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:L.installVersion,body:$v({writerExecutionBackend:P,secrets:T,flashMessage:k})}));return}if(b==="POST"&&p==="/writer-api"){let A=await Ht(h),f=new URLSearchParams(A),P=f.get("writerExecutionBackend")?.trim()??"cli";YS({configPath:e.layout.configPath,writerExecutionBackend:je(P),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(b==="GET"&&p==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(b==="GET"&&p==="/history"){let A=o();ve(y,await n({title:"History",activePath:"/history",installVersion:A.installVersion,body:Tv({reportsDir:e.layout.reportsDir})}));return}if(b==="GET"&&p==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",P=o(),_=NP({layout:e.layout}),T=jP(_),k=f.length>0?await Us({layout:e.layout,query:f,limit:20}):Fs(e.layout).slice(-50).reverse(),L=k.map(I=>{let N=DP(_,I.id),U=N>0?` \xB7 used in ${N} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${me(I.createdAt)}">${me(mT(I.createdAt))}${I.source?` \xB7 ${me(I.source)}`:""}${U}</div><pre>${me(I.text)}</pre></article>`}).join(""),R=T.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${T.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${me(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";ve(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:P.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${me(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${TY(f,k.length)}
            </section>${R}${L}`}));return}b==="POST"&&await Ht(h),await u(y,"Not found")}})().catch(p=>{console.error("[agent-witch-local-app]",p),y.writeHead(500),y.end("Internal error")})});return S.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),S.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Sr}`)}),S},Vc=e=>zf(e).publicKeyRaw});var jf=l(()=>{"use strict";JI();YI();g1()});var h1={};Ut(h1,{runAgentWitchExternalLiveCli:()=>LY});var fT,f1,CY,LY,y1=l(()=>{"use strict";fT=g(require("node:fs")),f1=g(require("node:path"));Xo();J();se();jf();se();CY=e=>{let t=f1.default.join(e,"link-code.txt");if(!fT.default.existsSync(t))return null;let r=fT.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},LY=()=>{nt("agent-witch-live");let e=C(),t=M(),r=CY(e),o=Vc(t);qc({layout:t,controllers:{getStatus:()=>{let n=he(t);return{wsConnected:va(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{jo(e)}}})}});var Fr=v((PMe,b1)=>{"use strict";var S1=["nodebuffer","arraybuffer","fragments"],A1=typeof Blob<"u";A1&&S1.push("blob");b1.exports={BINARY_TYPES:S1,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:A1,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Kc=v((wMe,$f)=>{"use strict";var{EMPTY_BUFFER:EY}=Fr(),hT=Buffer[Symbol.species];function WY(e,t){if(e.length===0)return EY;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new hT(r.buffer,r.byteOffset,o):r}function P1(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function w1(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function RY(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function yT(e){if(yT.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new hT(e):ArrayBuffer.isView(e)?t=new hT(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),yT.readOnly=!1),t}$f.exports={concat:WY,mask:P1,toArrayBuffer:RY,toBuffer:yT,unmask:w1};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");$f.exports.mask=function(t,r,o,n,s){s<48?P1(t,r,o,n,s):e.mask(t,r,o,n,s)},$f.exports.unmask=function(t,r){t.length<32?w1(t,r):e.unmask(t,r)}}catch{}});var T1=v((_Me,v1)=>{"use strict";var _1=Symbol("kDone"),ST=Symbol("kRun"),AT=class{constructor(t){this[_1]=()=>{this.pending--,this[ST]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[ST]()}[ST](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[_1])}}};v1.exports=AT});var wi=v((vMe,E1)=>{"use strict";var Jc=require("zlib"),k1=Kc(),xY=T1(),{kStatusCode:C1}=Fr(),IY=Buffer[Symbol.species],OY=Buffer.from([0,0,255,255]),Ff=Symbol("permessage-deflate"),Ur=Symbol("total-length"),bi=Symbol("callback"),To=Symbol("buffers"),Pi=Symbol("error"),Hf,bT=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Hf){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Hf=new xY(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[bi];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){Hf.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){Hf.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Jc.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Jc.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Ff]=this,this._inflate[Ur]=0,this._inflate[To]=[],this._inflate.on("error",NY),this._inflate.on("data",L1)}this._inflate[bi]=o,this._inflate.write(t),r&&this._inflate.write(OY),this._inflate.flush(()=>{let s=this._inflate[Pi];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=k1.concat(this._inflate[To],this._inflate[Ur]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Ur]=0,this._inflate[To]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Jc.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Jc.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Ur]=0,this._deflate[To]=[],this._deflate.on("data",MY)}this._deflate[bi]=o,this._deflate.write(t),this._deflate.flush(Jc.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=k1.concat(this._deflate[To],this._deflate[Ur]);r&&(s=new IY(s.buffer,s.byteOffset,s.length-4)),this._deflate[bi]=null,this._deflate[Ur]=0,this._deflate[To]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};E1.exports=bT;function MY(e){this[To].push(e),this[Ur]+=e.length}function L1(e){if(this[Ur]+=e.length,this[Ff]._maxPayload<1||this[Ur]<=this[Ff]._maxPayload){this[To].push(e);return}this[Pi]=new RangeError("Max payload size exceeded"),this[Pi].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Pi][C1]=1009,this.removeListener("data",L1),this.reset()}function NY(e){if(this[Ff]._inflate=null,this[Pi]){this[bi](this[Pi]);return}e[C1]=1007,this[bi](e)}});var _i=v((TMe,Uf)=>{"use strict";var{isUtf8:W1}=require("buffer"),{hasBlob:zY}=Fr(),DY=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function jY(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function PT(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function $Y(e){return zY&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Uf.exports={isBlob:$Y,isValidStatusCode:jY,isValidUTF8:PT,tokenChars:DY};if(W1)Uf.exports.isValidUTF8=function(e){return e.length<24?PT(e):W1(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Uf.exports.isValidUTF8=function(t){return t.length<32?PT(t):e(t)}}catch{}});var kT=v((kMe,z1)=>{"use strict";var{Writable:HY}=require("stream"),R1=wi(),{BINARY_TYPES:FY,EMPTY_BUFFER:x1,kStatusCode:UY,kWebSocket:BY}=Fr(),{concat:wT,toArrayBuffer:GY,unmask:qY}=Kc(),{isValidStatusCode:VY,isValidUTF8:I1}=_i(),Bf=Buffer[Symbol.species],bt=0,O1=1,M1=2,N1=3,_T=4,vT=5,Gf=6,TT=class extends HY{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||FY[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[BY]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=bt}_write(t,r,o){if(this._opcode===8&&this._state==bt)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new Bf(o.buffer,o.byteOffset+t,o.length-t),new Bf(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new Bf(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case bt:this.getInfo(t);break;case O1:this.getPayloadLength16(t);break;case M1:this.getPayloadLength64(t);break;case N1:this.getMask();break;case _T:this.getData(t);break;case vT:case Gf:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[R1.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=O1:this._payloadLength===127?this._state=M1:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=N1:this._state=_T}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=_T}getData(t){let r=x1;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&qY(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=vT,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[R1.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===bt&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=bt;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=wT(o,r):this._binaryType==="arraybuffer"?n=GY(wT(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=bt):(this._state=Gf,setImmediate(()=>{this.emit("message",n,!0),this._state=bt,this.startLoop(t)}))}else{let n=wT(o,r);if(!this._skipUTF8Validation&&!I1(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===vT||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=bt):(this._state=Gf,setImmediate(()=>{this.emit("message",n,!1),this._state=bt,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,x1),this.end();else{let o=t.readUInt16BE(0);if(!VY(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new Bf(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!I1(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=bt;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=bt):(this._state=Gf,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=bt,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[UY]=n,i}};z1.exports=TT});var ET=v((LMe,$1)=>{"use strict";var{Duplex:CMe}=require("stream"),{randomFillSync:KY}=require("crypto"),{types:{isUint8Array:JY}}=require("util"),D1=wi(),{EMPTY_BUFFER:YY,kWebSocket:XY,NOOP:ZY}=Fr(),{isBlob:vi,isValidStatusCode:QY}=_i(),{mask:j1,toBuffer:$n}=Kc(),Pt=Symbol("kByteLength"),eX=Buffer.alloc(4),qf=8*1024,Hn,Ti=qf,Ft=0,tX=1,rX=2,CT=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Ft,this.onerror=ZY,this[XY]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||eX,r.generateMask?r.generateMask(o):(Ti===qf&&(Hn===void 0&&(Hn=Buffer.alloc(qf)),KY(Hn,0,qf),Ti=0),o[0]=Hn[Ti++],o[1]=Hn[Ti++],o[2]=Hn[Ti++],o[3]=Hn[Ti++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[Pt]!==void 0?a=r[Pt]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(j1(t,o,d,s,a),[d]):(j1(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=YY;else{if(typeof t!="number"||!QY(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(JY(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[Pt]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Ft?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):vi(t)?(n=t.size,s=!1):(t=$n(t),n=t.length,s=$n.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Pt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};vi(t)?this._state!==Ft?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Ft?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):vi(t)?(n=t.size,s=!1):(t=$n(t),n=t.length,s=$n.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Pt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};vi(t)?this._state!==Ft?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Ft?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[D1.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):vi(t)?(a=t.size,c=!1):(t=$n(t),a=t.length,c=$n.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[Pt]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};vi(t)?this._state!==Ft?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Ft?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[Pt],this._state=rX,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(LT,this,a,n);return}this._bufferedBytes-=o[Pt];let i=$n(s);r?this.dispatch(i,r,o,n):(this._state=Ft,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(oX,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[D1.extensionName];this._bufferedBytes+=o[Pt],this._state=tX,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");LT(this,c,n);return}this._bufferedBytes-=o[Pt],this._state=Ft,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Ft&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][Pt],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][Pt],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};$1.exports=CT;function LT(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function oX(e,t,r){LT(e,t,r),e.onerror(t)}});var J1=v((EMe,K1)=>{"use strict";var{kForOnEventAttribute:Yc,kListener:WT}=Fr(),H1=Symbol("kCode"),F1=Symbol("kData"),U1=Symbol("kError"),B1=Symbol("kMessage"),G1=Symbol("kReason"),ki=Symbol("kTarget"),q1=Symbol("kType"),V1=Symbol("kWasClean"),Br=class{constructor(t){this[ki]=null,this[q1]=t}get target(){return this[ki]}get type(){return this[q1]}};Object.defineProperty(Br.prototype,"target",{enumerable:!0});Object.defineProperty(Br.prototype,"type",{enumerable:!0});var Fn=class extends Br{constructor(t,r={}){super(t),this[H1]=r.code===void 0?0:r.code,this[G1]=r.reason===void 0?"":r.reason,this[V1]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[H1]}get reason(){return this[G1]}get wasClean(){return this[V1]}};Object.defineProperty(Fn.prototype,"code",{enumerable:!0});Object.defineProperty(Fn.prototype,"reason",{enumerable:!0});Object.defineProperty(Fn.prototype,"wasClean",{enumerable:!0});var Ci=class extends Br{constructor(t,r={}){super(t),this[U1]=r.error===void 0?null:r.error,this[B1]=r.message===void 0?"":r.message}get error(){return this[U1]}get message(){return this[B1]}};Object.defineProperty(Ci.prototype,"error",{enumerable:!0});Object.defineProperty(Ci.prototype,"message",{enumerable:!0});var Xc=class extends Br{constructor(t,r={}){super(t),this[F1]=r.data===void 0?null:r.data}get data(){return this[F1]}};Object.defineProperty(Xc.prototype,"data",{enumerable:!0});var nX={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[Yc]&&n[WT]===t&&!n[Yc])return;let o;if(e==="message")o=function(s,i){let a=new Xc("message",{data:i?s:s.toString()});a[ki]=this,Vf(t,this,a)};else if(e==="close")o=function(s,i){let a=new Fn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[ki]=this,Vf(t,this,a)};else if(e==="error")o=function(s){let i=new Ci("error",{error:s,message:s.message});i[ki]=this,Vf(t,this,i)};else if(e==="open")o=function(){let s=new Br("open");s[ki]=this,Vf(t,this,s)};else return;o[Yc]=!!r[Yc],o[WT]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[WT]===t&&!r[Yc]){this.removeListener(e,r);break}}};K1.exports={CloseEvent:Fn,ErrorEvent:Ci,Event:Br,EventTarget:nX,MessageEvent:Xc};function Vf(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Kf=v((WMe,Y1)=>{"use strict";var{tokenChars:Zc}=_i();function dr(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function sX(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,u=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(u===-1&&Zc[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let h=e.slice(c,u);d===44?(dr(t,h,r),r=Object.create(null)):i=h,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(u===-1&&Zc[d]===1)c===-1&&(c=m);else if(d===32||d===9)u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m),dr(r,e.slice(c,u),!0),d===44&&(dr(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)a=e.slice(c,m),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if(Zc[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if(Zc[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,u=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(u===-1&&Zc[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))u===-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let h=e.slice(c,u);o&&(h=h.replace(/\\/g,""),o=!1),dr(r,a,h),d===44&&(dr(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=m);let S=e.slice(c,u);return i===void 0?dr(t,S,r):(a===void 0?dr(r,S,!0):o?dr(r,a,S.replace(/\\/g,"")):dr(r,a,S),dr(t,i,r)),t}function iX(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}Y1.exports={format:iX,parse:sX}});var Zf=v((IMe,lU)=>{"use strict";var aX=require("events"),lX=require("https"),cX=require("http"),Q1=require("net"),dX=require("tls"),{randomBytes:uX,createHash:pX}=require("crypto"),{Duplex:RMe,Readable:xMe}=require("stream"),{URL:RT}=require("url"),ko=wi(),mX=kT(),gX=ET(),{isBlob:fX}=_i(),{BINARY_TYPES:X1,CLOSE_TIMEOUT:hX,EMPTY_BUFFER:Jf,GUID:yX,kForOnEventAttribute:xT,kListener:SX,kStatusCode:AX,kWebSocket:Te,NOOP:eU}=Fr(),{EventTarget:{addEventListener:bX,removeEventListener:PX}}=J1(),{format:wX,parse:_X}=Kf(),{toBuffer:vX}=Kc(),tU=Symbol("kAborted"),IT=[8,13],Gr=["CONNECTING","OPEN","CLOSING","CLOSED"],TX=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,ee=class e extends aX{constructor(t,r,o){super(),this._binaryType=X1[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Jf,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),rU(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){X1.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new mX({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new gX(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[Te]=this,s[Te]=this,t[Te]=this,n.on("conclude",LX),n.on("drain",EX),n.on("error",WX),n.on("message",RX),n.on("ping",xX),n.on("pong",IX),s.onerror=OX,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",sU),t.on("data",Xf),t.on("end",iU),t.on("error",aU),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[ko.extensionName]&&this._extensions[ko.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){mt(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,nU(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){OT(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Jf,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){OT(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Jf,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){OT(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[ko.extensionName]||(n.compress=!1),this._sender.send(t||Jf,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){mt(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(ee,"CONNECTING",{enumerable:!0,value:Gr.indexOf("CONNECTING")});Object.defineProperty(ee.prototype,"CONNECTING",{enumerable:!0,value:Gr.indexOf("CONNECTING")});Object.defineProperty(ee,"OPEN",{enumerable:!0,value:Gr.indexOf("OPEN")});Object.defineProperty(ee.prototype,"OPEN",{enumerable:!0,value:Gr.indexOf("OPEN")});Object.defineProperty(ee,"CLOSING",{enumerable:!0,value:Gr.indexOf("CLOSING")});Object.defineProperty(ee.prototype,"CLOSING",{enumerable:!0,value:Gr.indexOf("CLOSING")});Object.defineProperty(ee,"CLOSED",{enumerable:!0,value:Gr.indexOf("CLOSED")});Object.defineProperty(ee.prototype,"CLOSED",{enumerable:!0,value:Gr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(ee.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(ee.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[xT])return t[SX];return null},set(t){for(let r of this.listeners(e))if(r[xT]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[xT]:!0})}})});ee.prototype.addEventListener=bX;ee.prototype.removeEventListener=PX;lU.exports=ee;function rU(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:hX,protocolVersion:IT[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!IT.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${IT.join(", ")})`);let s;if(t instanceof RT)s=t;else try{s=new RT(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let p=new SyntaxError(c);if(e._redirects===0)throw p;Yf(e,p);return}let d=i?443:80,u=uX(16).toString("base64"),m=i?lX.request:cX.request,S=new Set,h;if(n.createConnection=n.createConnection||(i?CX:kX),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new ko({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=wX({[ko.extensionName]:h.offer()})),r.length){for(let p of r){if(typeof p!="string"||!TX.test(p)||S.has(p))throw new SyntaxError("An invalid or duplicated subprotocol was specified");S.add(p)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let p=n.path.split(":");n.socketPath=p[0],n.path=p[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let p=o&&o.headers;if(o={...o,headers:{}},p)for(let[b,A]of Object.entries(p))o.headers[b.toLowerCase()]=A}else if(e.listenerCount("redirect")===0){let p=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!p||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,p||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=m(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=m(n);n.timeout&&y.on("timeout",()=>{mt(e,y,"Opening handshake has timed out")}),y.on("error",p=>{y===null||y[tU]||(y=e._req=null,Yf(e,p))}),y.on("response",p=>{let b=p.headers.location,A=p.statusCode;if(b&&n.followRedirects&&A>=300&&A<400){if(++e._redirects>n.maxRedirects){mt(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new RT(b,t)}catch{let _=new SyntaxError(`Invalid URL: ${b}`);Yf(e,_);return}rU(e,f,r,o)}else e.emit("unexpected-response",y,p)||mt(e,y,`Unexpected server response: ${p.statusCode}`)}),y.on("upgrade",(p,b,A)=>{if(e.emit("upgrade",p),e.readyState!==ee.CONNECTING)return;y=e._req=null;let f=p.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){mt(e,b,"Invalid Upgrade header");return}let P=pX("sha1").update(u+yX).digest("base64");if(p.headers["sec-websocket-accept"]!==P){mt(e,b,"Invalid Sec-WebSocket-Accept header");return}let _=p.headers["sec-websocket-protocol"],T;if(_!==void 0?S.size?S.has(_)||(T="Server sent an invalid subprotocol"):T="Server sent a subprotocol but none was requested":S.size&&(T="Server sent no subprotocol"),T){mt(e,b,T);return}_&&(e._protocol=_);let k=p.headers["sec-websocket-extensions"];if(k!==void 0){if(!h){mt(e,b,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let L;try{L=_X(k)}catch{mt(e,b,"Invalid Sec-WebSocket-Extensions header");return}let R=Object.keys(L);if(R.length!==1||R[0]!==ko.extensionName){mt(e,b,"Server indicated an extension that was not requested");return}try{h.accept(L[ko.extensionName])}catch{mt(e,b,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[ko.extensionName]=h}e.setSocket(b,A,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function Yf(e,t){e._readyState=ee.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function kX(e){return e.path=e.socketPath,Q1.connect(e)}function CX(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=Q1.isIP(e.host)?"":e.host),dX.connect(e)}function mt(e,t,r){e._readyState=ee.CLOSING;let o=new Error(r);Error.captureStackTrace(o,mt),t.setHeader?(t[tU]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Yf,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function OT(e,t,r){if(t){let o=fX(t)?t.size:vX(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${Gr[e.readyState]})`);process.nextTick(r,o)}}function LX(e,t){let r=this[Te];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[Te]!==void 0&&(r._socket.removeListener("data",Xf),process.nextTick(oU,r._socket),e===1005?r.close():r.close(e,t))}function EX(){let e=this[Te];e.isPaused||e._socket.resume()}function WX(e){let t=this[Te];t._socket[Te]!==void 0&&(t._socket.removeListener("data",Xf),process.nextTick(oU,t._socket),t.close(e[AX])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function Z1(){this[Te].emitClose()}function RX(e,t){this[Te].emit("message",e,t)}function xX(e){let t=this[Te];t._autoPong&&t.pong(e,!this._isServer,eU),t.emit("ping",e)}function IX(e){this[Te].emit("pong",e)}function oU(e){e.resume()}function OX(e){let t=this[Te];t.readyState!==ee.CLOSED&&(t.readyState===ee.OPEN&&(t._readyState=ee.CLOSING,nU(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function nU(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function sU(){let e=this[Te];if(this.removeListener("close",sU),this.removeListener("data",Xf),this.removeListener("end",iU),e._readyState=ee.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[Te]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",Z1),e._receiver.on("finish",Z1))}function Xf(e){this[Te]._receiver.write(e)||this.pause()}function iU(){let e=this[Te];e._readyState=ee.CLOSING,e._receiver.end(),this.end()}function aU(){let e=this[Te];this.removeListener("error",aU),this.on("error",eU),e&&(e._readyState=ee.CLOSING,this.destroy())}});var pU=v((MMe,uU)=>{"use strict";var OMe=Zf(),{Duplex:MX}=require("stream");function cU(e){e.emit("close")}function NX(){!this.destroyed&&this._writableState.finished&&this.destroy()}function dU(e){this.removeListener("error",dU),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function zX(e,t){let r=!0,o=new MX({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(cU,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(cU,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",NX),o.on("error",dU),o}uU.exports=zX});var MT=v((NMe,mU)=>{"use strict";var{tokenChars:DX}=_i();function jX(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&DX[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}mU.exports={parse:jX}});var bU=v((DMe,AU)=>{"use strict";var $X=require("events"),Qf=require("http"),{Duplex:zMe}=require("stream"),{createHash:HX}=require("crypto"),gU=Kf(),Un=wi(),FX=MT(),UX=Zf(),{CLOSE_TIMEOUT:BX,GUID:GX,kWebSocket:qX}=Fr(),VX=/^[+/0-9A-Za-z]{22}==$/,fU=0,hU=1,SU=2,NT=class extends $X{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:BX,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:UX,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Qf.createServer((o,n)=>{let s=Qf.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=KX(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=fU}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===SU){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Qc,this);return}if(t&&this.once("close",t),this._state!==hU)if(this._state=hU,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Qc,this):process.nextTick(Qc,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Qc(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",yU);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Bn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Bn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!VX.test(s)){Bn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Bn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){ed(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=FX.parse(c)}catch{Bn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&u!==void 0){let S=new Un({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=gU.parse(u);h[Un.extensionName]&&(S.accept(h[Un.extensionName]),m[Un.extensionName]=S)}catch{Bn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let S={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(S,(h,y,p,b)=>{if(!h)return ed(r,y||401,p,b);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(S))return ed(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[qX])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>fU)return ed(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${HX("sha1").update(r+GX).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),u._protocol=m)}if(t[Un.extensionName]){let m=t[Un.extensionName].params,S=gU.format({[Un.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${S}`),u._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",yU),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Qc,this)})),a(u,n)}};AU.exports=NT;function KX(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function Qc(e){e._state=SU,e.emit("close")}function yU(){this.destroy()}function ed(e,t,r,o){r=r||Qf.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Qf.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Bn(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Bn),e.emit("wsClientError",i,r,t)}else ed(r,o,n,s)}});var JX,YX,XX,ZX,QX,eZ,PU,tZ,td,wU=l(()=>{JX=g(pU(),1),YX=g(Kf(),1),XX=g(wi(),1),ZX=g(kT(),1),QX=g(ET(),1),eZ=g(MT(),1),PU=g(Zf(),1),tZ=g(bU(),1),td=PU.default});var zT,_U=l(()=>{"use strict";zT=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var rZ,DT,vU=l(()=>{"use strict";ep();_U();rZ=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",DT=(e={})=>{let t=e.env??process.env,r=zT(t[Zu]),o=zT(t[Qu]);return{mode:rZ(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var TU=l(()=>{"use strict";ep()});var kU=l(()=>{"use strict";vU();TU()});var jT=l(()=>{"use strict"});var qr,rd=l(()=>{"use strict";qr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Li,Gn,CU,nZ,$T,HT,LU,EU,FT,WU,od,UT=l(()=>{"use strict";Li=g(require("node:fs")),Gn=g(require("node:os")),CU=g(require("node:path"));jT();rd();nZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$T=(e=Gn.default.hostname())=>CU.default.join(Gn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),HT=e=>{if(!Li.default.existsSync(e))return null;try{let t=JSON.parse(Li.default.readFileSync(e,"utf8"));return!nZ(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},LU=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},EU=(e,t)=>{Li.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},FT=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??$T(),o=HT(r);if(o!==null&&o.pid!==process.pid&&qr(o.pid)&&LU(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Gn.default.hostname(),macOsUsername:Gn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return EU(r,n),{ok:!0}},WU=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??$T(),o=HT(r);return o!==null&&o.pid!==process.pid&&qr(o.pid)&&LU(o)?{ok:!1}:(EU(r,{hostname:Gn.default.hostname(),macOsUsername:Gn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},od=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??$T();HT(r)?.pid===process.pid&&Li.default.existsSync(r)&&Li.default.unlinkSync(r)}});var BT,nd,sZ,iZ,aZ,lZ,GT,RU=l(()=>{"use strict";BT=require("node:child_process"),nd=g(require("node:path"));rd();Gu();sZ=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),iZ=(e,t)=>{if(sZ(e)||!/\bnode\b/.test(e))return!1;let r=nd.default.resolve(t),o=nd.default.join(r,"app",ea),n=nd.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===ea||i==="agent-witch.ts")return e.includes(r);try{let a=nd.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},aZ=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,BT.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},lZ=(e,t,r)=>{let o=aZ(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||iZ(d,t)&&n.push(c)}return n},GT=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,BT.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=lZ(r,e.installDir,t),n=[];for(let s of o)if(qr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var sd,id,xU,cZ,qT,IU=l(()=>{"use strict";sd=g(require("node:fs")),id=g(require("node:path"));ze();xU=(e,t)=>{!sd.default.existsSync(e)||sd.default.existsSync(t)||(sd.default.mkdirSync(id.default.dirname(t),{recursive:!0}),sd.default.renameSync(e,t))},cZ=e=>{if(e.profileEmail===null)return;let t=id.default.join(e.installDir,_t);xU(id.default.join(t,Xn),e.mainLogPath),xU(id.default.join(t,Zn),e.errorLogPath)},qT=e=>{let t=M();e!==void 0&&t.installDir!==e||cZ(t)}});var OU=l(()=>{"use strict";Pl();$m();$m();!st()&&Uo(__agentWitchImportMetaUrl)&&(async()=>{nt("agent-witch-wake-server");let e=await mn(),t=yr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var MU=l(()=>{"use strict";OU()});var NU=l(()=>{"use strict";dl()});var VT,zU=l(()=>{"use strict";jT();MU();UT();NU();VT=async(e={})=>{let t=e.skipInProcessBridge?null:await jm();Pm();let r=setInterval(()=>{Pm()},6e4),o=setInterval(()=>{if(!WU().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var ad,eh,pZ,DU,jU,th,$U,HU,KT,FU,rh,UU=l(()=>{"use strict";ad=g(require("node:fs")),eh=g(require("node:path")),pZ="pending-run-inputs.json",DU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jU=e=>{let t=e.profileEmail?eh.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return eh.default.join(t,pZ)},th=e=>{let t=jU(e);if(!ad.default.existsSync(t))return{};try{let r=JSON.parse(ad.default.readFileSync(t,"utf8"));return DU(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!DU(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},$U=(e,t)=>{let r=jU(e);ad.default.mkdirSync(eh.default.dirname(r),{recursive:!0}),ad.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},HU=e=>Object.values(th(e)),KT=(e,t)=>th(e)[t]!==void 0,FU=(e,t)=>{let r=th(e);r[t.agentRunId]=t,$U(e,r)},rh=(e,t)=>{let r=th(e);delete r[t],$U(e,r)}});var oh=l(()=>{"use strict";le()});var BU=l(()=>{"use strict";le()});var nh=l(()=>{"use strict";le()});var sh=l(()=>{"use strict";le()});var ld=l(()=>{"use strict";le()});var mZ,gZ,cd,JT=l(()=>{"use strict";Ct();oh();BU();nh();sh();ld();mZ={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},gZ={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},cd=e=>{if(!ge(e.writerAgent))return"the selected writer";let t=at(e.writerAgent);if(je(e.writerExecutionBackend)==="api"&&t!==null){let r=Je(Re(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=La(t,r.model);return`${gZ[t]} model ${o}`}}return mZ[e.writerAgent]}});var fZ,hZ,GU,qU,VU=l(()=>{"use strict";fZ=/"input_tokens"\s*:\s*(\d+)/,hZ=/"output_tokens"\s*:\s*(\d+)/,GU=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},qU=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=GU(fZ.exec(t)),o=GU(hZ.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var ih=l(()=>{"use strict";er()});var dd,ah,yZ,YT,KU,JU,YU,XT,XU=l(()=>{"use strict";dd=g(require("node:fs")),ah=g(require("node:path"));ih();yZ="run-completion-outbox.json",YT=e=>{let t=e.profileEmail?ah.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return ah.default.join(t,yZ)},KU=e=>{let t=YT(e);if(!dd.default.existsSync(t))return[];try{let r=JSON.parse(dd.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},JU=(e,t)=>{dd.default.mkdirSync(ah.default.dirname(YT(e)),{recursive:!0}),dd.default.writeFileSync(YT(e),JSON.stringify(t,null,2),"utf8")},YU=(e,t)=>{let r=[...KU(e).filter(o=>o.runId!==t.runId),t];JU(e,r)},XT=async e=>{if(e.cloudApi===null)return;let t=KU(e.layout);if(t.length===0)return;let r=[];for(let o of t)await nl(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);JU(e.layout,r)}});var ZU=l(()=>{"use strict"});var ZT,ud,AZ,qn,QU=l(()=>{"use strict";ZU();ZT=new Map,ud=e=>{let t=ZT.get(e);t!==void 0&&(clearInterval(t),ZT.delete(e))},AZ=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},qn=(e,t,r,o={})=>{ud(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){ud(t);return}let i=o.onTick?.()??{};AZ(e,t,n,i)};s(),ZT.set(t,setInterval(s,15e3))}});var eB=l(()=>{"use strict";er()});var tB,rB=l(()=>{"use strict";eB();tB=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Ye(t)}});var QT,pd,Vr,ek,ur,oB,lh=l(()=>{"use strict";QT=new Set,pd=new Map,Vr=(e,t)=>{if(t.length===0)return;let r=pd.get(e)??[];r.push(t),pd.set(e,r)},ek=e=>{QT.add(e);let t=pd.get(e)??[];return pd.delete(e),t},ur=e=>QT.has(e),oB=e=>{QT.delete(e),pd.delete(e)}});var Ei,nB,sB,iB=l(()=>{"use strict";Ei=g(require("node:path")),nB=require("node:url");Fo();sB=()=>{if(st()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Ei.default.dirname(Ei.default.resolve(e)):Ei.default.dirname(Ei.default.resolve(__filename))}return Ei.default.dirname((0,nB.fileURLToPath)(__agentWitchImportMetaUrl))}});var aB,lB,cB,dB,rt,Wi,uB,pB,Ri,tk,rk,ok,mB,nk,gB,ch=l(()=>{"use strict";aB=require("node:crypto"),lB=g(require("node:fs")),cB=g(require("node:path")),dB=require("node:url");rd();Fo();iB();rt=new Map,uB=async()=>{if(Wi!==void 0)return Wi;try{if(st()){let e=sB(),t=cB.default.join(e,"deps","node-pty","lib","index.js");if(lB.default.existsSync(t)){let r=await import((0,dB.pathToFileURL)(t).href);return Wi=r,r}}return Wi=await import("node-pty"),Wi}catch{return Wi=null,null}},pB=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Ri=(e,t,r)=>{let o=rt.get(e);if(o!==void 0){rt.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},tk=(e,t)=>{let r=rt.get(e);return r===void 0?!1:(r.pty.write(t),!0)},rk=(e,t,r)=>{let o=rt.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},ok=e=>{for(let t of rt.values())if(!(t.mode!=="agent"||t.runId!==e))return qr(t.pty.pid);return!1},mB=e=>{for(let[t,r]of rt.entries())if(!(r.mode!=="agent"||r.runId!==e)){rt.delete(t);try{r.pty.kill()}catch{}return!0}return!1},nk=async e=>{let t=await uB();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;rt.get(e.shellSessionId)!==void 0&&Ri(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return rt.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{pB(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{rt.get(e.shellSessionId)?.pty===n&&(rt.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},gB=async e=>{let t=e.shellSessionId??(0,aB.randomUUID)(),r=await uB();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return rt.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{pB(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{rt.get(t)?.pty===o&&(rt.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var dh,fB,hB=l(()=>{"use strict";dh="[[AWAITING_INPUT]]",fB=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",dh,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var md,yB,uh=l(()=>{"use strict";hB();md=e=>{let t=e.indexOf(dh);if(t<0)return null;let o=e.slice(t+dh.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},yB=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",fB].join(`
`)});var SB,AB=l(()=>{"use strict";lh();ch();uh();SB=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(ur(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Vr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await gB({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=md(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var PB,wB,_B,bB,Kr,ph=l(()=>{"use strict";PB=require("node:child_process"),wB=g(require("node:fs")),_B=g(require("node:path"));Gu();bB=12e4,Kr=(e,t)=>{let r=_B.default.join(e,"app",PE,"ensure-writer.sh");return wB.default.existsSync(r)?new Promise((o,n)=>{let s=(0,PB.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},a=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String(bB/1e3)}s`))},bB);s.on("error",c=>{clearTimeout(a),n(c)}),s.on("close",c=>{if(clearTimeout(a),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var vB,Vn,fd,mh,sk,gd,gh,fh,ik,ak,bZ,xi,PZ,wZ,lk,ck=l(()=>{"use strict";vB=require("node:child_process");Ct();ph();nh();oh();ld();sh();Vn=new Map,fd=e=>e==="cursor"||e==="antigravity",mh=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",sk=e=>Vn.get(e)?.warmed===!0,gd=e=>{let t=Vn.get(e);Vn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},gh=e=>Vn.get(e)?.conversationStarted===!0,fh=e=>{let t=Vn.get(e);Vn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},ik=e=>{Vn.delete(e)},ak=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",bZ={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},xi=e=>`${bZ[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,PZ=(e,t,r,o)=>new Promise(n=>{let s=fp(t,r),i=[],a=(0,vB.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),o?.(u)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),wZ=(e,t)=>{let r=xi(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},lk=async e=>{if(!ge(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&je(e.runConfig.writerExecutionBackend)==="api"){let r=at(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Re(e.runConfig.layout.configPath);return Je(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),gd(e.writerAgent),{exitCode:0,output:xi(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Kr(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}fd(e.writerAgent)&&gd(e.writerAgent);let t=await PZ(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?wZ(e.writerAgent,t.output):xi(e.writerAgent)}}});var Kn,dk=l(()=>{"use strict";Kn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var TB,_Z,vZ,kB,TZ,uk,CB=l(()=>{"use strict";dk();TB=/you(?:'|')ve hit your session limit/i,_Z=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],vZ=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,kB=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},TZ=e=>{let t=vZ.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},uk=e=>{let t=e.trim();if(t.length===0)return null;if(TB.test(t))return{code:Kn.SESSION_LIMIT,resetHint:TZ(t),matchedLine:kB(t,TB)};for(let r of _Z)if(r.test(t))return{code:Kn.PROVIDER_QUOTA,resetHint:null,matchedLine:kB(t,r)};return null}});var hh,yh,pk,mk=l(()=>{"use strict";hh="[[AGENT_RUN_WRITER_EXECUTION]]",yh="cli-writer-api-key-missing",pk="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var gk=l(()=>{"use strict";mk()});var LB=l(()=>{"use strict";gk()});var Sh=l(()=>{"use strict";dk();CB();mk();gk();LB()});var Ah,EB=l(()=>{"use strict";Ah={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var WB,RB=l(()=>{"use strict";WB="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var xB,IB=l(()=>{"use strict";Sh();RB();xB=e=>e.code===Kn.SESSION_LIMIT?WB:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var OB,MB=l(()=>{"use strict";Sh();EB();IB();OB=e=>{let t=uk(e.output);return t!==null?{status:Ah.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:xB(t)}:{status:e.exitCode===0?Ah.COMPLETED:Ah.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var fk,Gze,NB=l(()=>{"use strict";fk={OPEN:"open",APPROVAL:"approval"},Gze=fk.APPROVAL});var Ii,bh,zB,LZ,DB,jB,$B,hd,hk,yk=l(()=>{"use strict";Ii=g(require("node:fs")),bh=g(require("node:path")),zB="runs",LZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),DB=e=>{let t=e.profileEmail!==null?bh.default.join(e.installDir,"profiles",e.profileEmail,zB):bh.default.join(e.installDir,zB);return Ii.default.mkdirSync(t,{recursive:!0}),t},jB=(e,t)=>bh.default.join(DB(e),`${t}.json`),$B=(e,t)=>{Ii.default.writeFileSync(jB(e,t.id),JSON.stringify(t,null,2))},hd=(e,t)=>{let r=jB(e,t);if(!Ii.default.existsSync(r))return null;try{let o=JSON.parse(Ii.default.readFileSync(r,"utf8"));return!LZ(o)||typeof o.id!="string"?null:o}catch{return null}},hk=e=>{let t=DB(e),r=Ii.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=hd(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var EZ,HB,FB=l(()=>{"use strict";MB();NB();yk();EZ=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=OB({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:fk.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},HB=(e,t)=>{let r=EZ(t);return $B(e,r),r}});var UB=l(()=>{"use strict";If()});var BB,GB=l(()=>{"use strict";Sh();BB=()=>[hh,`agentRunWriterExecutionBackend=${yh}`,`agentRunWriterExecutionReasonCode=${pk}`].join(`
`)});var Co,Ph=l(()=>{"use strict";Co=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Sk,WZ,RZ,qB,VB=l(()=>{"use strict";Sk=e=>e.toLocaleString("en-US"),WZ=e=>e<.01?e.toFixed(4):e.toFixed(3),RZ=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${WZ(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Sk(e.inputTokens)} in / ${Sk(e.outputTokens)} out (${Sk(e.totalTokens)} total)`,t].join(`
`)},qB=(e,t)=>{if(t===void 0)return e;let r=RZ(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var KB=l(()=>{"use strict";le()});var YB,yd,Se,Ak,wh,JB,xZ,IZ,XB,ZB,QB,Sd,bk,Pk,wk,eG,OZ,wt,Ad,Lo,tG,MZ,NZ,_h,_k,vk,Tk,rG=l(()=>{"use strict";YB=require("node:child_process");le();Ct();UU();Dc();JT();VU();Ca();XU();ih();QU();rd();rB();lh();ch();uh();AB();ck();FB();UB();GB();Ph();VB();us();KB();ld();sa();uh();yd=new Map,Se=new Map,Ak=new Set,wh=new Map,JB=e=>{e!==void 0&&!wh.has(e)&&wh.set(e,Date.now())},xZ=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(ur(t)){wt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}Vr(t,n)},IZ=(e,t,r,o,n)=>{if(!ZS(e,n))return;let s=`${BB()}
`;xZ(t,r,o,s);let i=Se.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},XB=130,ZB=`

Stopped by user.`,QB=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:Co(e)},Sd=null,bk=e=>{Sd=e},Pk=(e,t)=>{if(Sd===null)return;let r=wv(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||XA(Sd,t,r)},wk=async e=>{await XT({layout:e,cloudApi:Sd})},eG=e=>{let t=yd.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:qr(t.pid)},OZ=e=>fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),wt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Ad=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=is(s),c=Se.get(r);if(a!==null&&c!==void 0){let d=RE(a),u=eG(r)||ok(r);d!==null&&!u&&Lo(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return WE(a)}}),Lo=(e,t,r,o,n,s,i,a)=>{let c=As(s,a),d=n,u=qB(c.output,c.llmUsage);if(r!==void 0){let S=wh.get(r);wh.delete(r),S!==void 0&&bv({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-S)/1e3))});let h=qU(c.llmUsage,u);h!==null&&uF({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&Ak.has(r)&&(Ak.delete(r),d=XB,u=u.trim().length>0&&!u.includes("Stopped by user.")?`${u.trim()}${ZB}`:"Stopped by user.");let m=r!==void 0?wv(e.layout.reportsDir,r):null;if(r!==void 0){ud(r),Ma(e.layout,r),ur(r)&&(wt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),oB(r));let S=Se.get(r);lF({reportsDir:e.layout.reportsDir,agentRunId:r,input:Co(i),output:u,...S!==void 0?{writerLabel:cd({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&Rf({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:u,agentRunId:r}),HB(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:u,layout:e.layout}),YU(e.layout,{runId:r,exitCode:d,output:u,createdAt:new Date().toISOString(),...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{}}),XT({layout:e.layout,cloudApi:Sd}),Se.delete(r),yd.delete(r),rh(e.layout,r)}wt(t,{type:"command.claude.result",payload:{exitCode:d,output:u,...r!==void 0?{agentRunId:r}:{},...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),ha(e.layout)},tG=(e,t,r,o,n,s,i)=>{let a=Se.get(r),c=a?.accumulatedOutput??s;FU(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),qn(t,r,()=>KT(e.layout,r),Ad(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),wt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},MZ=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,u=h=>{if(!(n===void 0||h.length===0)){if(ur(n)){wt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}Vr(n,h)}};if(n!==void 0){let h=Se.get(n);yd.set(n,t),Se.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),wt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),qn(r,n,()=>eG(n),Ad(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let m=a==="claude-cli",S=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(m?S.push(y):(c.push(y),u(y)),d||n===void 0)return;let p=md(c.join(""));if(p!==null){d=!0,t.kill("SIGTERM");let b=Se.get(n),A=[b?.accumulatedOutput??"",p.partialOutput].filter(f=>f.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=A),yd.delete(n),tG(e,r,n,o,p.question,A,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),u(y)}),t.on("close",h=>{if(d)return;fh(a);let y=n!==void 0?Se.get(n):void 0,p=m?As(S.join("")):{output:c.join("").trim(),llmUsage:void 0},b=m?c.join("").trim():"",A=[p.output.trim(),b].filter(P=>P.length>0).join(`
`);m&&p.output.trim().length>0&&u(p.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${A}`.trim():A;Lo(e,r,n,o,h??-1,f,s,p.llmUsage)}),t.on("error",h=>{d||Lo(e,r,n,o,-1,h.message,s)})},NZ=(e,t,r,o,n,s,i,a,c)=>{let d=QB(r,c);s!==void 0&&(Se.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),wt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),qn(n,s,()=>Se.has(s),Ad(e,n,s,o,i,a))),Ra(e,t,r,m=>{if(!(s===void 0||m.length===0)){if(ur(s)){wt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:m},requestId:o});return}Vr(s,m)}}).then(m=>{fh(t),Lo(e,n,s,o,m.exitCode,m.output,r,m.llmUsage)}).catch(m=>{let S=m instanceof Error?m.message:String(m);Lo(e,n,s,o,-1,S,r)})},_h=(e,t,r,o,n,s,i,a,c,d,u,m)=>{let S=QB(r,u);if(fa(e.layout),en(e,t)){JB(s),NZ(e,t,r,o,n,s,c,d,S);return}let h=Jt(t,r,OZ(e),i);if(h===null){Lo(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}JB(s);let y=tB({workspace:e.workspace,projectFolderPath:c}),p=()=>{let b=(0,YB.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:m??process.env});MZ(e,b,n,o,s,r,S,t)};if(s===void 0){p();return}Se.set(s,{originalPrompt:r,userTranscriptPrompt:S,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:Se.get(s)?.accumulatedOutput??""}),IZ(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&na({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),qn(n,s,()=>Se.has(s),Ad(e,n,s,o,c,d)),SB({socket:n,sendMessage:wt,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:b=>{a!==void 0&&Ri(a,P=>{wt(n,P)},o);let A=Se.get(s),f=[A?.accumulatedOutput??"",b.partialOutput].filter(P=>P.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),tG(e,n,s,o,b.question,f,r)},onFinished:(b,A)=>{fh(t);let f=As(A),P=Se.get(s),_=P!==void 0&&P.accumulatedOutput.length>0?`${P.accumulatedOutput}

${f.output}`.trim():f.output;Lo(e,n,s,o,b,_,r,f.llmUsage)}}).then(b=>{if(!b){p();return}qn(n,s,()=>ok(s),Ad(e,n,s,o,c,d))}).catch(b=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",b instanceof Error?b.message:b),p()})},_k=(e,t,r,o)=>{rh(e.layout,t.agentRunId),t.shellSessionId!==void 0&&wt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=yB(t),s=Se.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;_h(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},vk=(e,t)=>{for(let r of HU(e.layout))Se.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:Co(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),qn(t,r.agentRunId,()=>KT(e.layout,r.agentRunId),{awaitingInput:!0}),wt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Tk=(e,t,r,o)=>{let n=Se.get(r);if(n===void 0)return!1;Ak.add(r),ud(r);let s=yd.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(mB(r))return!0;rh(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${ZB}`:"Stopped by user.";return Lo(e,t,r,o,XB,i,n.originalPrompt),!0}});var zZ,kk,oG=l(()=>{"use strict";$a();zZ=()=>`http://127.0.0.1:${Lt()}/restart`,kk=async()=>{try{let e=await fetch(zZ(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var nG=l(()=>{"use strict";kl()});var sG=l(()=>{"use strict";Xv()});var iG,aG=l(()=>{"use strict";iG=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var bd,DZ,Ck,lG=l(()=>{"use strict";J();se();nG();jb();sG();aG();us();bd=(e,t)=>{mo(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},DZ=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(gS(),mS)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},Ck=async e=>{let t=De(e.layout.installDir)?.bundleVersion??null;if(!iG({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(kt(e.layout)){ya({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),bd(e.layout,{summary:r,action:"install-bundle-update-start"}),hr({launchAgentLabel:Ce(e.layout.installDir),installDir:e.layout.installDir});let o=await Ai({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),bd(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await DZ();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),bd(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),bd(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),bd(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var jZ,Lk,cG=l(()=>{"use strict";jZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Lk=e=>{if(!jZ(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var Ek,Wk,dG=l(()=>{"use strict";Pb();wb();Ek=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=ul({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},Wk=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Tr(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var uG,$Z,HZ,FZ,Pd,pG=l(()=>{"use strict";uG=g(require("node:os"));ze();$Z="Default",HZ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),FZ=e=>{let t=uG.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Pd=()=>{let e=M(),t=Mu(e),r=HZ($Z);return`${FZ(t)}/${r.length>0?r:"project"}`}});var mG=l(()=>{"use strict";kl()});var gG,Rk,fG=l(()=>{"use strict";mG();gG=!1,Rk=e=>{gG||(gG=!0,process.on("uncaughtException",t=>{fn(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;fn(e,{kind:"crash",message:r,stack:o})}))}});var hG,UZ,xk,yG=l(()=>{"use strict";hG=require("node:child_process");ph();Ct();nh();oh();ld();sh();UZ=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,hG.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},xk=async e=>{if(!ge(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&je(e.runConfig.writerExecutionBackend)==="api"){let r=at(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Re(e.layout.configPath),n=Je(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Kr(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await UZ(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var Ik,SG=l(()=>{"use strict";Ik=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var AG,Ok,bG=l(()=>{"use strict";AG=require("node:crypto"),Ok=()=>(0,AG.randomUUID)()});var Oi,PG,vh=l(()=>{"use strict";Oi="[[WORKING_ESTIMATE]]",PG=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Oi,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var wG,_G=l(()=>{"use strict";wG=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var BZ,vG,TG=l(()=>{"use strict";vh();BZ=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,vG=e=>{if(!e.includes(Oi))return null;let t=null;for(let r of e.matchAll(BZ)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var GZ,Mk,kG=l(()=>{"use strict";TG();GZ=/^(\d{1,6})\b/,Mk=e=>{let t=vG(e);if(t!==null)return t;let r=GZ.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var qZ,VZ,KZ,Th,Nk=l(()=>{"use strict";Ct();_l();qZ="http://127.0.0.1:11434",VZ=45e3,KZ=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Th=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||qZ,o=t===void 0?(await Rt({commands:fe({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(VZ)});return n.ok?KZ(await n.json()):null}catch{return null}}});var zk,Dk,jk,CG=l(()=>{"use strict";sa();vh();Ph();_G();kG();Dc();Nk();zk=async e=>{let t=Co(e.wrappedPrompt),r=cF(e.reportsDir);return{estimateOutput:await Th(PG(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},Dk=e=>{let t=Mk(e.estimateOutput);t!==null&&vf({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},jk=e=>{let t=Mk(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=wG(t);return oa({reportKey:e.reportKey,agentRunId:e.agentRunId,status:qt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),vf({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var kh,LG,$k=l(()=>{"use strict";kh="[[WORKING_TOKEN_ESTIMATE]]",LG=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",kh,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var EG,JZ,WG,RG=l(()=>{"use strict";$k();EG=/^(\d{1,8})\b/,JZ=e=>{let t=e.indexOf(kh);if(t<0)return null;let r=e.slice(t+kh.length).trim(),o=EG.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},WG=e=>{let t=JZ(e);if(t!==null)return t;let r=EG.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var Hk,Fk,xG=l(()=>{"use strict";$k();Ph();RG();Dc();Nk();Hk=async e=>{let t=Co(e.wrappedPrompt),r=pF(e.reportsDir);return{estimateOutput:await Th(LG(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},Fk=e=>{let t=WG(e.estimateOutput);return t===null?null:(dF({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var IG=l(()=>{"use strict";UT();RU();IU();zU();$a();rG();ph();Ct();yk();lh();oG();Lb();lG();us();cG();dG();ih();pG();fG();yG();qu();SG();bG();vh();sa();CG();xG();JT();_l();ch();ck()});var OG={};Ut(OG,{buildContinuationPromptWithContext:()=>ZZ});var YZ,XZ,ZZ,MG=l(()=>{"use strict";YZ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,XZ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),ZZ=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=XZ(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${YZ(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var NG={};Ut(NG,{readHarnessExportSets:()=>eQ});var wd,Uk,Ch,QZ,eQ,zG=l(()=>{"use strict";wd=g(require("node:fs")),Uk=g(require("node:path"));ze();Ch=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),QZ=e=>{if(!wd.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(wd.default.readFileSync(e.harnessManifestPath,"utf8"));if(Ch(t))return t}catch{return null}return null},eQ=(e,t)=>{let r=M(t),o=QZ(r);if(o===null)return[];let n=Ch(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!Ch(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let u of c){if(!Ch(u))continue;let m=typeof u.path=="string"?u.path:void 0,S=typeof u.id=="string"?u.id:"",h=typeof u.kind=="string"?u.kind:"",y=typeof u.title=="string"?u.title:"";if(m===void 0||S.length===0||h.length===0||y.length===0)continue;let p=m.startsWith("shared/")?Uk.default.join(r.harnessRootDir,m):Uk.default.join(r.harnessSetsDir,i,m);wd.default.existsSync(p)&&d.push({id:S,kind:h,title:y,content:wd.default.readFileSync(p,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var Yk,Gk,Mi,DG,tQ,jG,$G,Bk,HG,qk,Vk,Kk,te,K,Jk,rQ,_d,oQ,nQ,sQ,iQ,aQ,lQ,cQ,dQ,vd,FG=l(()=>{"use strict";Yk=require("node:child_process"),Gk=g(require("node:fs")),Mi=g(require("node:os"));wU();J();se();Xo();cT();kU();le();Kt();kl();KP();jf();If();er();ao();Jb();gt();IG();DG=3e4,tQ=3e4,jG=new Map,$G=new Map,Bk=new Map,HG=new Map,qk=new Map,Vk=new Map,Kk=new Map,te=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),K=(e,t,r)=>{e.readyState===td.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(mo(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Hm(r,"out",t)))},Jk=e=>e,rQ=e=>{if(!Gk.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Gk.default.readFileSync(e.harnessManifestPath,"utf8"));if(te(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},_d=(e,t)=>{let r=rQ(t);r!==null&&K(e,{type:"harness.manifest.report",payload:{hostname:Mi.default.hostname(),manifest:r}})},oQ=async(e,t,r,o,n,s,i=!1,a,c,d,u,m)=>{let S=m?.trim()??"";if(!ge(t)){K(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=cd({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await Rt({commands:fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),p=s!==void 0?zk({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,b=s!==void 0?Hk({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=fd(t)&&!sk(t);if(A){try{await Kr(e.layout.installDir,t)}catch(H){let ke=H instanceof Error?H.message:String(H);K(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${ke}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}gd(t)}else if(!fd(t))try{await Kr(e.layout.installDir,t)}catch(H){let ke=H instanceof Error?H.message:String(H);K(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${ke}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Ia(d,Pd,m);if(f===null){K(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Ge({projectFolderPath:f,...S.length>0?{projectId:S}:{}}),i||Uc(e.layout,t,f);let P=xf({sessionContinuation:i,supportsWriterSessionContinuation:mh(t),isWriterConversationStarted:gh(t)}),_=i&&P==="first"?Fc(e.layout,t,f):null,T=_!==null?Si(e.layout,_):null,k=T!==null&&T.turns.length>0,L=zv({sessionContinuation:i,supportsWriterSessionContinuation:mh(t),isWriterConversationStarted:gh(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:k,userPromptCharacterCount:r.length}),R=r;if(L.continuationStrategy==="source_run_seed"){let H=typeof c=="string"&&c.length>0?hd(e.layout,c):null;if(H!==null){let{buildContinuationPromptWithContext:ke}=await Promise.resolve().then(()=>(MG(),OG));R=ke({priorPrompt:H.prompt,priorOutput:H.resultOutput??"",userMessage:r})}}else L.continuationStrategy==="transcript_seed"&&T!==null&&T.turns.length>0&&(R=Cf({priorTurns:T.turns,userMessage:r}));let I=L.ragLimit>0?await Us({layout:e.layout,query:R,limit:L.ragLimit,minScore:L.ragMinScore,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],N=L.ragLimit>0&&f.trim().length>0?await qP({layout:e.layout,query:R,limit:2,minScore:.32,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],U=L.injectMemory?Cv(e.layout,f,S.length>0?S:void 0):[],G=`${Ev(U,L.memoryEntryLimit)}${UP(I)}${VP(N)}${R}`,q=u?.trim()??(s!==void 0&&f.trim().length>0?Ok():void 0);if(s!==void 0&&q!==void 0&&q.length>0&&f.trim().length>0){na({reportKey:q,agentRunId:s,userSummary:"Working on your Mac\u2026"});let H=G;p!==null&&p.then(ke=>{if(ke===null)return;let Jr=jk({estimateOutput:ke.estimateOutput??"",reportKey:q,agentRunId:s,reportsDir:e.layout.reportsDir,task:ke.task,writerLabel:ke.writerLabel,embedding:ke.embedding});if(Jr.estimateSeconds===null)return;Pk(e.layout.reportsDir,s);let pr=`${Oi}
${Jr.estimateSeconds}
`;if(ur(s)){K(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:pr},requestId:o});return}Vr(s,pr)}).catch(()=>{}),G=Ik(H),G=$y(G,{agentRunId:s,reportKey:q,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&p!==null&&p.then(H=>{H!==null&&Dk({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel,embedding:H.embedding})}).catch(()=>{}),s!==void 0&&b!==null&&b.then(H=>{H!==null&&Fk({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel})}).catch(()=>{});let Ke=s!==void 0&&Kk.get(s)===!0;if(s!==void 0&&f.trim().length>0){let H=await Am(f);Vk.set(s,H),q!==void 0&&q.length>0&&qk.set(s,q)}_h(e,t,G,o,Jk(n),s,{sessionTurn:L.sessionTurn},a,f,q,r,VS(e.layout,s,Ke)),A&&s!==void 0&&K(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:ak(t)},requestId:o})},nQ=async(e,t,r,o,n)=>{let s=(i,a)=>{K(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await lk({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,K(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:o})}}),c=ge(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?xi(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},sQ=(e,t,r)=>new Promise(o=>{if(!ge(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Jt(t,r,fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,Yk.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),iQ=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;K(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Zt(t.bundle),s=te(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let u=Le(e.wsUrl)??it,m=await xA({appOrigin:u,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return K(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=sn({bundle:i,layout:e.layout});return K(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&_d(o,e.layout),!0},aQ=async(e,t,r,o)=>{if(await iQ(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(K(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){K(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!ge(n)){K(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}fa(e.layout);let i=await(async()=>{try{await Kr(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return sQ(e,n,s)})().finally(()=>{ha(e.layout)});K(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),_d(o,e.layout)},lQ=e=>{let t=1e3*2**e;return Math.min(tQ,t)},cQ=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=p=>{if(!t.restartInFlight){if(kt(e.layout)){Sa(p),console.log(`[agent-witch] Deferring local restart (${p}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${p})\u2026`),t.wakeError=`restart:${p}`,kk().then(b=>{if(b.ok){console.log("[agent-witch] Local restart completed.");return}if(!b.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",b.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(p,b="system.ack")=>{if(!t.selfUpdateInFlight){if(kt(e.layout)){ya({layout:e.layout,remoteBundleVersion:p,trigger:b}),console.log(`[agent-witch] Deferring install bundle update (${p} via ${b}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,Ck({layout:e.layout,remoteBundleVersion:p,trigger:b}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let p=he(e.layout);p!==null&&Ee(p,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let p=t.socket;t.socket=void 0,t.wsConnected=!1,p.removeAllListeners("open"),p.removeAllListeners("message"),p.removeAllListeners("close"),p.on("error",()=>{}),(p.readyState===td.OPEN||p.readyState===td.CONNECTING)&&p.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,DG)},u=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let p=lQ(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${p}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},p)},m=p=>{s();let b=()=>{let A=ca(e.layout.installDir),f=Lt();K(p,{type:"agent.heartbeat",payload:{hostname:Mi.default.hostname(),macOsUsername:Mi.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:A}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};b(),t.heartbeatTimer=setInterval(b,DG)},S=(p,b)=>{if(typeof p.type!="string")return;if(Kb(p)){t.stopped=!0,s(),a(),c(),Gb({layout:e.layout}).finally(()=>{od(),process.exit(0)});return}mo(e.layout,{direction:"in",type:p.type,summary:"inbound WS frame"}),Hm(e.layout,"in",p);let A=typeof p.requestId=="string"?p.requestId:void 0;if(p.type==="device.auth.attestation"&&te(p.payload)){let f=typeof p.payload.serverPublicKey=="string"?p.payload.serverPublicKey:"",P=typeof p.payload.origin=="string"?p.payload.origin:"",_=typeof p.payload.devicePublicKey=="string"?p.payload.devicePublicKey:"",T=typeof p.payload.challenge=="string"?p.payload.challenge:"",k=typeof p.payload.serverAttestation=="string"?p.payload.serverAttestation:"";if(!lT({serverPublicKey:f,origin:P,devicePublicKey:_,challenge:T,serverAttestation:k})){t.wakeError="Server attestation verification failed",mo(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(p.type==="writer.ensure"&&te(p.payload)){let f=typeof p.payload.writerAgent=="string"?p.payload.writerAgent:"";mo(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),xk({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(P=>{K(b,{type:"writer.status",payload:P},e.layout)})}if(p.type==="install.bundle.update"&&te(p.payload)){let f=typeof p.payload.bundleVersion=="string"?p.payload.bundleVersion.trim():"";f.length>0&&o(f,"install.bundle.update")}if(p.type==="system.ack"){up(e.layout,{wsUrl:e.wsUrl});let f=te(p.payload)?p.payload:null,P=Lk(f);P!==null&&o(P)}if(p.type==="device.restart"&&r("cloud-device-restart"),p.type==="automations.sync"&&te(p.payload)&&Ek(p.payload),p.type==="automations.run"&&te(p.payload)&&Wk(p.payload),p.type==="terminal.stream.accepted"&&te(p.payload)){let f=typeof p.payload.runId=="string"?p.payload.runId:"";if(f.length>0){let P=ek(f);for(let _ of P)K(b,{type:"terminal.stream.chunk",payload:{runId:f,chunk:_},requestId:A})}}if(p.type==="agent.agentRun.list"&&K(b,{type:"dashboard.agentRun.list.result",payload:{runs:hk(e.layout)},requestId:A}),p.type==="agent.agentRun.get"&&te(p.payload)){let f=typeof p.payload.runId=="string"?p.payload.runId:"",P=f.length>0?hd(e.layout,f):null;K(b,{type:"dashboard.agentRun.get.result",payload:{run:P},requestId:A})}if(p.type==="command.claude.run"&&te(p.payload)){let f=p.payload.prompt,P=typeof p.payload.writerAgent=="string"&&ge(p.payload.writerAgent)?p.payload.writerAgent:"claude-cli",_=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,T=p.payload.sessionContinuation===!0,k=typeof p.payload.sourceRunId=="string"?p.payload.sourceRunId:void 0,L=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:void 0,R=typeof p.payload.projectId=="string"?p.payload.projectId:void 0,I=Ia(typeof p.payload.projectFolderPath=="string"?p.payload.projectFolderPath:void 0,Pd,R),N=$S(p.payload.compositionSnapshot),U=typeof p.payload.reportKey=="string"?p.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${P} task (${T?"continue":"first"})\u2026`),I===null){K(b,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",..._!==void 0?{agentRunId:_}:{}},requestId:A});return}if(N!==null){let G=FS(e.layout,N);if(G!==null){K(b,{type:"command.claude.result",payload:{exitCode:-1,output:G,..._!==void 0?{agentRunId:_}:{}},requestId:A});return}if(_!==void 0){let q=BS(e.layout,_,N);if(!q.ok){K(b,{type:"command.claude.result",payload:{exitCode:-1,output:q.errorMessage,..._!==void 0?{agentRunId:_}:{}},requestId:A});return}Kk.set(_,N.entries.some(Ke=>Ke.scope==="run"))}}_!==void 0&&L!==void 0&&jG.set(_,L),_!==void 0&&($G.set(_,I),R!==void 0&&R.trim().length>0&&Bk.set(_,R.trim()),HG.set(_,f.trim()),Ge({projectFolderPath:I,...R!==void 0&&R.trim().length>0?{projectId:R.trim()}:{}})),oQ(e,P,f.trim(),A,b,_,T,L,k,I,U,R)}}if(p.type==="shell.session.open"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",P=typeof p.payload.cols=="number"?p.payload.cols:120,_=typeof p.payload.rows=="number"?p.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),nk({shellSessionId:f,cwd:e.workspace,cols:P,rows:_,send:T=>{K(b,T)},requestId:A}))}if(p.type==="shell.session.close"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"";f.length>0&&Ri(f,P=>{K(b,P)},A)}if(p.type==="shell.input"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",P=typeof p.payload.data=="string"?p.payload.data:"";f.length>0&&P.length>0&&tk(f,P)}if(p.type==="shell.resize"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",P=typeof p.payload.cols=="number"?p.payload.cols:0,_=typeof p.payload.rows=="number"?p.payload.rows:0;f.length>0&&P>0&&_>0&&rk(f,P,_)}if(p.type==="command.writer.session.end"&&te(p.payload)){let f=p.payload.writerAgent;typeof f=="string"&&ge(f)&&(ik(f),Wf(e.layout,f))}if(p.type==="command.writer.session.start"&&te(p.payload)){let f=p.payload.writerAgent,P=typeof p.payload.writerSessionId=="string"?p.payload.writerSessionId:"";typeof f=="string"&&ge(f)&&P.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),nQ(e,f,P,A,b))}if(p.type==="command.claude.stop"&&te(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),Tk(e,Jk(b),f,A))}if(p.type==="command.claude.input_respond"&&te(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"",P=typeof p.payload.response=="string"?p.payload.response.trim():"",_=typeof p.payload.originalPrompt=="string"?p.payload.originalPrompt:"",T=typeof p.payload.partialOutput=="string"?p.payload.partialOutput:"",k=typeof p.payload.question=="string"?p.payload.question:"";f.length>0&&P.length>0&&_.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),_k(e,{agentRunId:f,originalPrompt:_,partialOutput:T,question:k,response:P,shellSessionId:jG.get(f)},A,Jk(b)))}if(p.type==="dispatch.approval.required"&&te(p.payload)){let f=typeof p.payload.requesterEmail=="string"?p.payload.requesterEmail:"A teammate",P=typeof p.payload.prompt=="string"?p.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${P}`),process.platform==="darwin"&&(0,Yk.spawn)("osascript",["-e",`display notification "${P.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(p.type==="harness.request"&&te(p.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),aQ(e,p.payload,A,b)),p.type==="harness.export.request"&&te(p.payload)){let f=typeof p.payload.borrowerUserId=="string"?p.payload.borrowerUserId:"",P=typeof p.payload.targetDeviceId=="string"?p.payload.targetDeviceId:void 0,_=Array.isArray(p.payload.setSlugs)?p.payload.setSlugs.filter(T=>typeof T=="string"):[];f.length>0&&_.length>0&&(async()=>{let{readHarnessExportSets:T}=await Promise.resolve().then(()=>(zG(),NG)),k=T(_,e.email);K(b,{type:"harness.export.result",payload:{success:k.length>0,borrowerUserId:f,...P!==void 0?{targetDeviceId:P}:{},sets:k,errorMessage:k.length>0?void 0:"No readable harness sets were found on this machine."},requestId:A})})()}if(p.type==="harness.manifest.request"&&_d(b,e.layout),p.type==="command.claude.result"&&te(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,P=typeof p.payload.output=="string"?p.payload.output:"",_=typeof p.payload.exitCode=="number"?p.payload.exitCode:null,T=Ia(f!==void 0?$G.get(f):void 0,Pd),k=f!==void 0?Bk.get(f):void 0,L=f!==void 0?HG.get(f)??"":"",R=lb({exitCode:_,output:P});if(R&&T!==null&&FP({layout:e.layout,text:P,source:f??"command.claude.result",projectFolderPath:T,...k!==void 0?{projectId:k}:{}}),_!=null&&_!==0&&P.trim().length>0&&T!==null&&(zP({layout:e.layout,errorText:P,projectFolderPath:T,...k!==void 0?{projectId:k}:{}}),GP({layout:e.layout,text:P,source:f??"command.claude.result.failure",projectFolderPath:T,...k!==void 0?{projectId:k}:{}})),R&&L.trim().length>0&&T!==null&&Lv({layout:e.layout,projectFolderPath:T,...k!==void 0?{projectId:k}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:L,output:P,createdAt:new Date().toISOString()}}),f!==void 0&&T!==null){let N=qk.get(f),U=Vk.get(f);N!==void 0&&U!==void 0&&Am(T).then(G=>{let q=pb({before:U,after:G});Hy(N,q),Vk.delete(f),qk.delete(f)})}if(R&&k!==void 0&&k.trim().length>0){let N=$(),U=N===null?null:X({wsUrl:N.wsUrl,pairingToken:N.pairingToken});U!==null&&gb(U,k,{...f!==void 0?{sourceRunId:f}:{},lesson:mb({prompt:L,output:P})})}f!==void 0&&(Ma(e.layout,f),Kk.delete(f),Bk.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let p=new td(e.wsUrl);t.socket=p,p.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),bk(X({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),wk(e.layout);let b=Le(e.wsUrl)??"http://localhost:3000",A=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=aT({layout:e.layout,origin:b,...A!==void 0&&A.length>0?{claimToken:A}:{}});K(p,{type:"agent.register",payload:{role:"agent",hostname:Mi.default.hostname(),macOsUsername:Mi.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),_d(p,e.layout),vk(e,p),m(p)}),p.on("message",b=>{let A=typeof b=="string"?b:b.toString("utf8");try{let f=JSON.parse(A);if(!te(f))return;S(f,p)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),p.on("close",(b,A)=>{s(),t.socket=void 0,t.wsConnected=!1,hS(e.layout),t.reconnectAttempt+=1;let f=typeof A=="string"?A:A.toString("utf8");fn(e.layout,{kind:"ws_close",message:"WebSocket closed",code:b,reason:f}),console.log("[agent-witch] Disconnected from server."),u()}),p.on("error",b=>{t.wakeError=b.message,fn(e.layout,{kind:"ws_error",message:b.message,stack:b.stack}),console.error(`[agent-witch] Socket error: ${b.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return aS(()=>{let p=lS();p!==null&&p.layout.installDir===e.layout.installDir&&p.layout.profileEmail===e.layout.profileEmail&&o(p.remoteBundleVersion,p.trigger);let b=cS();b!==null&&r(b)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:va(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Vc(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let p=t.socket;return!t.wsConnected||p===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(_d(p,e.layout),{ok:!0})}}},dQ=async()=>{nt("agent-witch");let e=DT(),t=C();FT().ok||(process.platform==="darwin"?(await jo(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),qT(t);let o=GT({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(hr({launchAgentLabel:Ce(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),Yi());let n=await tA(),s=n[0];s!==void 0&&Rk(s.layout);for(let h of n){let y=Le(h.wsUrl)??it;da(h.layout.installDir,y)}let i=n.map(h=>cQ(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),od(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let p=i[y];if(p===void 0)return;let b=he(h.layout);yS(b,{socketOpen:p.hasMacSocketOpen(),staleAfterMs:12e4})&&p.reviveWebSocket()})},d=()=>{},u=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(kt(h)||fl(h.installDir))},m=await VT({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:u,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):qc({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let S=yr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Xi(),d()});d=()=>{S(),m.stop(),od(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},vd=dQ});var Xk=l(()=>{"use strict";FG()});var UG={};Ut(UG,{startAgentWitchClient:()=>vd});var BG=l(()=>{"use strict";Xk();Xk();Fo();Fy();Ku();if(!st()&&Uo(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Vu(process.argv.slice(e))),vd()}});Dy();Fy();Fo();Ku();var OE="20.x",ME="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var YK=e=>[`Node.js ${OE} or newer is required (found ${e}).`,ME].join(" "),NE=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${YK(process.version)}
`),process.exit(1))};var uQ=async()=>{nt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(gS(),mS)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},pQ=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(V0(),q0)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},mQ=async()=>{if(!Uo(st()?void 0:__agentWitchImportMetaUrl))return;NE();let e=process.argv.indexOf("report");e>=0&&process.exit(Vu(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await uQ();return}if(t==="wake"){await pQ();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(KI(),VI));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(y1(),h1));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(BG(),UG));await r()};mQ();
