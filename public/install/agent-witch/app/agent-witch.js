#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var FG=Object.create;var wh=Object.defineProperty;var UG=Object.getOwnPropertyDescriptor;var BG=Object.getOwnPropertyNames;var GG=Object.getPrototypeOf,qG=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var v=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Ut=(e,t)=>{for(var r in t)wh(e,r,{get:t[r],enumerable:!0})},VG=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of BG(t))!qG.call(e,n)&&n!==r&&wh(e,n,{get:()=>t[n],enumerable:!(o=UG(t,n))||o.enumerable});return e};var g=(e,t,r)=>(r=e!=null?FG(GG(e)):{},VG(t||!e||!e.__esModule?wh(r,"default",{value:e,enumerable:!0}):r,e));var Ni,YC,XC,Eo,_h,sQ,ZC,wd,Bt,mr,_d,vd,Jn,Yn,ot,vh,kd,Cd,Td,zi,_t,Xn,Zn,Ld,Yr,kh,QC,Me=l(()=>{"use strict";Ni={production:".agent-witch",localhost:".local-agent-witch"},YC={production:47892,localhost:47893},XC={production:"com.agent-witch",localhost:"com.local-agent-witch"},Eo={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},_h="app",sQ=`${_h}/agent-witch.js`,ZC=`${_h}/command`,wd={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Bt=Ni.production,mr=Ni.localhost,_d=YC.production,vd=YC.localhost,Jn=XC.production,Yn=XC.localhost,ot="profiles",vh=Eo.activeProfile,kd="harness",Cd="sets",Td="manifest.json",zi=wd.projectsDir,_t=wd.logsDir,Xn="agent-witch.log",Zn="agent-witch.error.log",Ld=wd.reportsDir,Yr=wd.deviceKeypairJson,kh=_h,QC="agent-witch.js"});var eT=l(()=>{"use strict";Me()});var tT,Ro,Di,Wd=l(()=>{"use strict";tT=g(require("node:path"));Me();Ro=e=>tT.default.basename(e)===mr,Di=e=>Ro(e)?Yn:Jn});var rT=l(()=>{"use strict";eT();Wd()});var oT,Ch,KG,ji,JG,YG,nT,XG,ZG,sT=l(()=>{"use strict";rT();Me();oT=g(require("node:os")),Ch=g(require("node:path")),KG=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?Ch.default.resolve(e):Ch.default.join(oT.default.homedir(),Bt)},ji=Di(KG()),JG=`${ji}-wake`,YG=`${ji}-live`,nT=`${ji}-watchdog`,XG=`${ji}-automation-scheduler`,ZG=`${ji}-updater`});var Qn=v(Th=>{"use strict";Object.defineProperty(Th,"__esModule",{value:!0});Th.stringify=QG;function QG(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=v(Lh=>{"use strict";Object.defineProperty(Lh,"__esModule",{value:!0});Lh.generateTypeGuardError=e2;var iT=Qn();function e2(e,t,r){return(0,iT.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,iT.stringify)(e)}) to be "${r}"`}});var Xr=v(Ed=>{"use strict";Object.defineProperty(Ed,"__esModule",{value:!0});Ed.isNonNullObject=void 0;var t2=O(),r2=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,t2.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Ed.isNonNullObject=r2});var Gt=v(Ae=>{"use strict";Object.defineProperty(Ae,"__esModule",{value:!0});Ae.attachTypeGuardMeta=Ae.isArrayTypeGuard=Ae.isNestedObjectTypeGuard=Ae.getTypeGuardWrapperKind=Ae.getTypeGuardInnerGuard=Ae.getTypeGuardItemGuard=Ae.getTypeGuardSchema=void 0;var o2=e=>e.schema;Ae.getTypeGuardSchema=o2;var n2=e=>e.itemGuard;Ae.getTypeGuardItemGuard=n2;var s2=e=>e.innerGuard;Ae.getTypeGuardInnerGuard=s2;var i2=e=>e.wrapperKind;Ae.getTypeGuardWrapperKind=i2;var a2=e=>{if((0,Ae.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};Ae.isNestedObjectTypeGuard=a2;var l2=e=>{if((0,Ae.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};Ae.isArrayTypeGuard=l2;var c2=(e,t)=>Object.assign(e,t);Ae.attachTypeGuardMeta=c2});var $i=v(xo=>{"use strict";Object.defineProperty(xo,"__esModule",{value:!0});xo.getExpectedTypeName=xo.getTypeGuardDisplayName=void 0;var aT=Gt(),d2=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};xo.getTypeGuardDisplayName=d2;var u2=e=>{let t=(0,aT.getTypeGuardWrapperKind)(e),r=(0,aT.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,xo.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};xo.getExpectedTypeName=u2});var Io=v(Rd=>{"use strict";Object.defineProperty(Rd,"__esModule",{value:!0});Rd.createValidationResult=void 0;var p2=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Rd.createValidationResult=p2});var es=v(xd=>{"use strict";Object.defineProperty(xd,"__esModule",{value:!0});xd.createValidationError=void 0;var m2=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});xd.createValidationError=m2});var ts=v(Id=>{"use strict";Object.defineProperty(Id,"__esModule",{value:!0});Id.createTreeNode=void 0;var g2=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Id.createTreeNode=g2});var Hi=v(Od=>{"use strict";Object.defineProperty(Od,"__esModule",{value:!0});Od.combineResults=void 0;var f2=Io(),h2=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,f2.createValidationResult)(r,o,n)};Od.combineResults=h2});var Nd=v(Md=>{"use strict";Object.defineProperty(Md,"__esModule",{value:!0});Md.createSimplifiedTree=void 0;var lT=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=lT(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},y2=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=lT(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Md.createSimplifiedTree=y2});var Ui=v(Dd=>{"use strict";Object.defineProperty(Dd,"__esModule",{value:!0});Dd.validateObject=void 0;var S2=Xr(),Fi=Io(),A2=es(),zd=ts(),b2=Hi(),cT=jd(),P2=(e,t,r)=>{let o=()=>{let i=(0,A2.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,zd.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Fi.createValidationResult)(!1,[],a):(0,Fi.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Fi.createValidationResult)(!0,[],(0,zd.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...u]=c,m=d,S=t[m],h=e[m],y=(0,cT.validateProperty)(m,h,S,r);return y.valid?u.length===0?(0,Fi.createValidationResult)(!0,[],(0,zd.createTreeNode)(r.path,!0,"object",e)):a(u):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let u=t[d];return(0,cT.validateProperty)(d,e[d],u,r)}),a=(0,b2.combineResults)(i,r.path),c=(0,zd.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let u=d.tree.path.split(".").pop()||"unknown";c.children[u]=d.tree}}),(0,Fi.createValidationResult)(a.valid,a.errors,c)};return(0,S2.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};Dd.validateObject=P2});var uT=v(Fd=>{"use strict";Object.defineProperty(Fd,"__esModule",{value:!0});Fd.validateArray=void 0;var w2=Qn(),$d=Io(),dT=es(),Hd=ts(),_2=Hi(),v2=Ui(),k2=$i(),C2=Gt(),T2=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,dT.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,Hd.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,$d.createValidationResult)(!1,[c],d)}let n=(0,C2.getTypeGuardSchema)(t),s=e.map((c,d)=>{let u=`${o}[${d}]`,m={path:u,config:r.config||null};if(n)return(0,v2.validateObject)(c,n,m);let S=t(c,null),h=(0,k2.getExpectedTypeName)(t),y=(0,w2.stringify)(c);if(S)return(0,$d.createValidationResult)(!0,[],(0,Hd.createTreeNode)(u,!0,h,c));let p=y.length>200?`Expected ${u} to be "${h}"`:`Expected ${u} (${y}) to be "${h}"`,b=(0,dT.createValidationError)(u,h,c,p),A=(0,Hd.createTreeNode)(u,!1,h,c);return A.errors=[b],(0,$d.createValidationResult)(!1,[b],A)}),i=(0,_2.combineResults)(s,o),a=(0,Hd.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,$d.createValidationResult)(i.valid,i.errors,a)};Fd.validateArray=T2});var jd=v(Bd=>{"use strict";Object.defineProperty(Bd,"__esModule",{value:!0});Bd.validateProperty=void 0;var pT=Io(),L2=es(),mT=ts(),W2=$i(),Ud=Gt(),E2=Ui(),R2=uT(),x2=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,Ud.getTypeGuardSchema)(r),c=(0,Ud.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,E2.validateObject)(t,a,s);if(c&&(0,Ud.isArrayTypeGuard)(r))return(0,R2.validateArray)(t,c,s)}let d=u=>{let m=r(t,u),S=(0,W2.getExpectedTypeName)(r);return m?(0,pT.createValidationResult)(!0,[],(0,mT.createTreeNode)(n,!0,S,t)):(()=>{let h=(0,L2.createValidationError)(n,S,t,`Expected ${n} (${JSON.stringify(t)}) to be "${S}"`),y=(0,mT.createTreeNode)(n,!1,S,t);return y.errors=[h],(0,pT.createValidationResult)(!1,[h],y)})()};if((0,Ud.isNestedObjectTypeGuard)(r)){let u=o.config?{...o.config,identifier:n}:null;return d(u)}return d(null)};Bd.validateProperty=x2});var qd=v(Gd=>{"use strict";Object.defineProperty(Gd,"__esModule",{value:!0});Gd.isNil=void 0;var I2=O(),O2=function(e,t){return e!=null?(t&&t.callbackOnError((0,I2.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Gd.isNil=O2});var Wh=v(Vd=>{"use strict";Object.defineProperty(Vd,"__esModule",{value:!0});Vd.isDefined=void 0;var M2=O(),N2=qd(),z2=function(e,t){return(0,N2.isNil)(e,null)?(t&&t.callbackOnError((0,M2.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Vd.isDefined=z2});var Eh=v(Kd=>{"use strict";Object.defineProperty(Kd,"__esModule",{value:!0});Kd.reportValidationResults=void 0;var D2=Nd(),gT=Wh(),j2=qd(),$2=(e,t)=>{if(e.valid===!0||(0,j2.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,gT.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,D2.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,gT.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Kd.reportValidationResults=$2});var Rh=v(oe=>{"use strict";Object.defineProperty(oe,"__esModule",{value:!0});oe.Validation=oe.reportValidationResults=oe.validateObject=oe.validateProperty=oe.createSimplifiedTree=oe.combineResults=oe.createTreeNode=oe.createValidationError=oe.createValidationResult=oe.getExpectedTypeName=void 0;var H2=$i();Object.defineProperty(oe,"getExpectedTypeName",{enumerable:!0,get:function(){return H2.getExpectedTypeName}});var F2=Io();Object.defineProperty(oe,"createValidationResult",{enumerable:!0,get:function(){return F2.createValidationResult}});var U2=es();Object.defineProperty(oe,"createValidationError",{enumerable:!0,get:function(){return U2.createValidationError}});var B2=ts();Object.defineProperty(oe,"createTreeNode",{enumerable:!0,get:function(){return B2.createTreeNode}});var G2=Hi();Object.defineProperty(oe,"combineResults",{enumerable:!0,get:function(){return G2.combineResults}});var q2=Nd();Object.defineProperty(oe,"createSimplifiedTree",{enumerable:!0,get:function(){return q2.createSimplifiedTree}});var V2=jd();Object.defineProperty(oe,"validateProperty",{enumerable:!0,get:function(){return V2.validateProperty}});var K2=Ui();Object.defineProperty(oe,"validateObject",{enumerable:!0,get:function(){return K2.validateObject}});var J2=Eh();Object.defineProperty(oe,"reportValidationResults",{enumerable:!0,get:function(){return J2.reportValidationResults}});var Y2=Io(),X2=Hi(),Z2=es(),Q2=ts(),e5=jd(),t5=Ui(),r5=Eh(),o5=Nd();oe.Validation={result:Y2.createValidationResult,combine:X2.combineResults,error:Z2.createValidationError,treeNode:Q2.createTreeNode,property:e5.validateProperty,object:t5.validateObject,report:r5.reportValidationResults,createSimplifiedTree:o5.createSimplifiedTree}});var Jd=v(xh=>{"use strict";Object.defineProperty(xh,"__esModule",{value:!0});xh.isType=s5;var fT=Xr(),hT=Rh(),n5=Gt();function s5(e){if(!(0,fT.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,hT.validateObject)(r,e,s);return(0,hT.reportValidationResults)(i,o||null),i.valid}return(0,fT.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,n5.attachTypeGuardMeta)(t,{schema:e})}});var bT=v(Oo=>{"use strict";Object.defineProperty(Oo,"__esModule",{value:!0});Oo.isNestedType=Oo.isShape=void 0;Oo.isSchema=Bi;var yT=Xr(),ST=Rh(),AT=Gt();function Bi(e){if(!(0,yT.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=a5(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,ST.validateObject)(o,t,i);return(0,ST.reportValidationResults)(a,n||null),a.valid}return(0,yT.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,AT.attachTypeGuardMeta)(r,{schema:t})}function i5(e){return typeof e=="function"?e:Array.isArray(e)?l5(e):typeof e=="object"&&e!==null?Bi(e):e}function a5(e){let t={};for(let[r,o]of Object.entries(e))t[r]=i5(o);return t}function l5(e){let t=e[0],r=Bi(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,AT.attachTypeGuardMeta)(o,{itemGuard:r})}Oo.isShape=Bi;Oo.isNestedType=Bi});var PT=v(Ih=>{"use strict";Object.defineProperty(Ih,"__esModule",{value:!0});Ih.isObjectWith=d5;var c5=Jd();function d5(e){return(0,c5.isType)(e)}});var wT=v(Oh=>{"use strict";Object.defineProperty(Oh,"__esModule",{value:!0});Oh.isObject=p5;var u5=Jd();function p5(e){return(0,u5.isType)(e)}});var _T=v(Mh=>{"use strict";Object.defineProperty(Mh,"__esModule",{value:!0});Mh.guardWithTolerance=m5;function m5(e,t,r){return t(e,r),e}});var vT=v(Nh=>{"use strict";Object.defineProperty(Nh,"__esModule",{value:!0});Nh.isBranded=f5;var g5=O();function f5(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,g5.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var kT=v(Yd=>{"use strict";Object.defineProperty(Yd,"__esModule",{value:!0});Yd.BrandSymbols=void 0;Yd.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var CT=v(Xd=>{"use strict";Object.defineProperty(Xd,"__esModule",{value:!0});Xd.isAny=void 0;var h5=function(e){return!0};Xd.isAny=h5});var Gi=v(zh=>{"use strict";Object.defineProperty(zh,"__esModule",{value:!0});zh.reportTypeGuardError=S5;var y5=O();function S5(e,t,r){e&&e.callbackOnError((0,y5.generateTypeGuardError)(t,e.identifier,r))}});var TT=v(Zd=>{"use strict";Object.defineProperty(Zd,"__esModule",{value:!0});Zd.isBoolean=void 0;var A5=Gi(),b5=function(t,r){return typeof t!="boolean"?((0,A5.reportTypeGuardError)(r,t,"boolean"),!1):!0};Zd.isBoolean=b5});var LT=v(Qd=>{"use strict";Object.defineProperty(Qd,"__esModule",{value:!0});Qd.isDate=void 0;var P5=O(),w5=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,P5.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Qd.isDate=w5});var Dh=v(eu=>{"use strict";Object.defineProperty(eu,"__esModule",{value:!0});eu.isNumber=void 0;var _5=Gi(),v5=function(t,r){return typeof t!="number"||isNaN(t)?((0,_5.reportTypeGuardError)(r,t,"number"),!1):!0};eu.isNumber=v5});var WT=v(tu=>{"use strict";Object.defineProperty(tu,"__esModule",{value:!0});tu.isString=void 0;var k5=Gi(),C5=function(t,r){return typeof t!="string"?((0,k5.reportTypeGuardError)(r,t,"string"),!1):!0};tu.isString=C5});var ET=v(ru=>{"use strict";Object.defineProperty(ru,"__esModule",{value:!0});ru.isUnknown=void 0;var T5=function(e){return!0};ru.isUnknown=T5});var RT=v(ou=>{"use strict";Object.defineProperty(ou,"__esModule",{value:!0});ou.isFunction=void 0;var L5=O(),W5=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,L5.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};ou.isFunction=W5});var IT=v(nu=>{"use strict";Object.defineProperty(nu,"__esModule",{value:!0});nu.isFile=void 0;var xT=O(),E5=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,xT.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,xT.generateTypeGuardError)(e,t.identifier,"File")),!1)};nu.isFile=E5});var MT=v(su=>{"use strict";Object.defineProperty(su,"__esModule",{value:!0});su.isFileList=void 0;var OT=O(),R5=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,OT.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,OT.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};su.isFileList=R5});var zT=v(iu=>{"use strict";Object.defineProperty(iu,"__esModule",{value:!0});iu.isBlob=void 0;var NT=O(),x5=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,NT.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,NT.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};iu.isBlob=x5});var jT=v(au=>{"use strict";Object.defineProperty(au,"__esModule",{value:!0});au.isFormData=void 0;var DT=O(),I5=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,DT.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,DT.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};au.isFormData=I5});var HT=v(lu=>{"use strict";Object.defineProperty(lu,"__esModule",{value:!0});lu.isURL=void 0;var $T=O(),O5=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,$T.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,$T.generateTypeGuardError)(e,t.identifier,"URL")),!1)};lu.isURL=O5});var UT=v(cu=>{"use strict";Object.defineProperty(cu,"__esModule",{value:!0});cu.isURLSearchParams=void 0;var FT=O(),M5=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,FT.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,FT.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};cu.isURLSearchParams=M5});var BT=v(du=>{"use strict";Object.defineProperty(du,"__esModule",{value:!0});du.isMap=void 0;var N5=O(),z5=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,N5.generateTypeGuardError)(e,t.identifier,"Map")),!1)};du.isMap=z5});var GT=v(uu=>{"use strict";Object.defineProperty(uu,"__esModule",{value:!0});uu.isSet=void 0;var D5=O(),j5=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,D5.generateTypeGuardError)(e,t.identifier,"Set")),!1)};uu.isSet=j5});var qT=v(jh=>{"use strict";Object.defineProperty(jh,"__esModule",{value:!0});jh.isIndexSignature=H5;var $5=O();function H5(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,$5.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,u)=>{let m=s[d],S=e(d,o?{...o,identifier:`${o.identifier}[key:${u}]`}:null),h=t(m,o?{...o,identifier:`${o.identifier}[value:${u}]`}:null);return S&&h})}}});var VT=v(pu=>{"use strict";Object.defineProperty(pu,"__esModule",{value:!0});pu.isError=void 0;var F5=Gi(),U5=function(t,r){return t instanceof Error?!0:((0,F5.reportTypeGuardError)(r,t,"Error"),!1)};pu.isError=U5});var Hh=v($h=>{"use strict";Object.defineProperty($h,"__esModule",{value:!0});$h.isArrayWithEachItem=q5;var B5=O(),G5=Gt();function q5(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,B5.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,G5.attachTypeGuardMeta)(t,{itemGuard:e})}});var Fh=v(mu=>{"use strict";Object.defineProperty(mu,"__esModule",{value:!0});mu.isNonEmptyArray=void 0;var V5=O(),K5=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,V5.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};mu.isNonEmptyArray=K5});var KT=v(Uh=>{"use strict";Object.defineProperty(Uh,"__esModule",{value:!0});Uh.isNonEmptyArrayWithEachItem=X5;var J5=Hh(),Y5=Fh();function X5(e){return function(t,r){return(0,J5.isArrayWithEachItem)(e)(t,r)&&(0,Y5.isNonEmptyArray)(t,r)}}});var YT=v(Bh=>{"use strict";Object.defineProperty(Bh,"__esModule",{value:!0});Bh.isTuple=Z5;var JT=O();function Z5(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,JT.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,JT.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var XT=v(Gh=>{"use strict";Object.defineProperty(Gh,"__esModule",{value:!0});Gh.isObjectWithEachItem=eq;var Q5=O();function eq(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,Q5.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var ZT=v(qh=>{"use strict";Object.defineProperty(qh,"__esModule",{value:!0});qh.isPartialOf=rq;var tq=Xr();function rq(e){return function(t,r){if(!(0,tq.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var QT=v(Vh=>{"use strict";Object.defineProperty(Vh,"__esModule",{value:!0});Vh.isPick=nq;var oq=Xr();function nq(e,...t){return function(r,o){if(!(0,oq.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var eL=v(Kh=>{"use strict";Object.defineProperty(Kh,"__esModule",{value:!0});Kh.isOmit=iq;var sq=Xr();function iq(e,...t){return function(r,o){if(!(0,sq.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let u=d.slice(9),m=u.indexOf(" ("),S=m>=0?u.slice(0,m):u;if(a.has(S))return!1;let h=S.startsWith(s+".")&&S.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var tL=v(gu=>{"use strict";Object.defineProperty(gu,"__esModule",{value:!0});gu.isNonEmptyString=void 0;var aq=O(),lq=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,aq.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};gu.isNonEmptyString=lq});var rL=v(fu=>{"use strict";Object.defineProperty(fu,"__esModule",{value:!0});fu.isNonNegativeNumber=void 0;var cq=O(),dq=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,cq.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};fu.isNonNegativeNumber=dq});var oL=v(hu=>{"use strict";Object.defineProperty(hu,"__esModule",{value:!0});hu.isPositiveNumber=void 0;var uq=O(),pq=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,uq.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};hu.isPositiveNumber=pq});var nL=v(yu=>{"use strict";Object.defineProperty(yu,"__esModule",{value:!0});yu.isNonPositiveNumber=void 0;var mq=O(),gq=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,mq.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};yu.isNonPositiveNumber=gq});var sL=v(Su=>{"use strict";Object.defineProperty(Su,"__esModule",{value:!0});Su.isNegativeNumber=void 0;var fq=O(),hq=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,fq.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Su.isNegativeNumber=hq});var iL=v(Au=>{"use strict";Object.defineProperty(Au,"__esModule",{value:!0});Au.isInteger=void 0;var yq=O(),Sq=Dh(),Aq=function(e,t){return!(0,Sq.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,yq.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Au.isInteger=Aq});var aL=v(bu=>{"use strict";Object.defineProperty(bu,"__esModule",{value:!0});bu.isPositiveInteger=void 0;var bq=O(),Pq=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,bq.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};bu.isPositiveInteger=Pq});var lL=v(Pu=>{"use strict";Object.defineProperty(Pu,"__esModule",{value:!0});Pu.isNegativeInteger=void 0;var wq=O(),_q=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,wq.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Pu.isNegativeInteger=_q});var cL=v(wu=>{"use strict";Object.defineProperty(wu,"__esModule",{value:!0});wu.isNonNegativeInteger=void 0;var vq=O(),kq=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,vq.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};wu.isNonNegativeInteger=kq});var dL=v(_u=>{"use strict";Object.defineProperty(_u,"__esModule",{value:!0});_u.isNonPositiveInteger=void 0;var Cq=O(),Tq=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Cq.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};_u.isNonPositiveInteger=Tq});var uL=v(ku=>{"use strict";Object.defineProperty(ku,"__esModule",{value:!0});ku.isNumeric=void 0;var vu=O(),Lq=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,vu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,vu.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,vu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,vu.generateTypeGuardError)(e,t.identifier,"number key")),!1};ku.isNumeric=Lq});var pL=v(Cu=>{"use strict";Object.defineProperty(Cu,"__esModule",{value:!0});Cu.isBooleanLike=void 0;var Jh=O(),Wq=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Jh.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Jh.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Cu.isBooleanLike=Wq});var mL=v(Tu=>{"use strict";Object.defineProperty(Tu,"__esModule",{value:!0});Tu.isDateLike=void 0;var qi=O(),Eq=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,qi.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,qi.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,qi.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,qi.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,qi.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Tu.isDateLike=Eq});var gL=v(Lu=>{"use strict";Object.defineProperty(Lu,"__esModule",{value:!0});Lu.isBigInt=void 0;var Rq=O(),xq=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,Rq.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Lu.isBigInt=xq});var Xh=v(Yh=>{"use strict";Object.defineProperty(Yh,"__esModule",{value:!0});Yh.isOneOf=Iq;var fL=Qn();function Iq(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,fL.stringify)(t)}) must be one of following values ${e.map(fL.stringify).join(" | ")}`),o}}});var hL=v(Zh=>{"use strict";Object.defineProperty(Zh,"__esModule",{value:!0});Zh.isOneOfTypes=Nq;var Oq=Qn(),Mq=$i();function Nq(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,Oq.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,Mq.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let u=`- ${d}`;a.includes(u)||a.push(u)}})),r.callbackOnError(a.join(`
`))}return n}}});var yL=v(Qh=>{"use strict";Object.defineProperty(Qh,"__esModule",{value:!0});Qh.isIntersectionOf=zq;function zq(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var SL=v(ey=>{"use strict";Object.defineProperty(ey,"__esModule",{value:!0});ey.isExtensionOf=Dq;function Dq(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var AL=v(ty=>{"use strict";Object.defineProperty(ty,"__esModule",{value:!0});ty.isNullOr=$q;var jq=Gt();function $q(e){function t(r,o){return r===null?!0:e(r,o)}return(0,jq.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var bL=v(ry=>{"use strict";Object.defineProperty(ry,"__esModule",{value:!0});ry.isUndefinedOr=Fq;var Hq=Gt();function Fq(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,Hq.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var PL=v(oy=>{"use strict";Object.defineProperty(oy,"__esModule",{value:!0});oy.isNilOr=Bq;var Uq=Gt();function Bq(e){function t(r,o){return r==null?!0:e(r,o)}return(0,Uq.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var wL=v(ny=>{"use strict";Object.defineProperty(ny,"__esModule",{value:!0});ny.isAsserted=Gq;function Gq(e){return!0}});var _L=v(sy=>{"use strict";Object.defineProperty(sy,"__esModule",{value:!0});sy.isEnum=Vq;var qq=Xh();function Vq(e){return function(t,r){return(0,qq.isOneOf)(...Object.values(e))(t,r)}}});var vL=v(iy=>{"use strict";Object.defineProperty(iy,"__esModule",{value:!0});iy.isEqualTo=Yq;var Kq=O(),Jq=Qn();function Yq(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,Kq.generateTypeGuardError)(t,r.identifier,`equal to ${(0,Jq.stringify)(e)}`)),!1):!0}}});var kL=v(Wu=>{"use strict";Object.defineProperty(Wu,"__esModule",{value:!0});Wu.isRegex=void 0;var Xq=O(),Zq=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,Xq.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Wu.isRegex=Zq});var TL=v(ay=>{"use strict";Object.defineProperty(ay,"__esModule",{value:!0});ay.isPattern=Qq;var CL=O();function Qq(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,CL.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,CL.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var LL=v(ly=>{"use strict";Object.defineProperty(ly,"__esModule",{value:!0});ly.by=eV;function eV(e){return function(t){return e(t,null)}}});var WL=v(cy=>{"use strict";Object.defineProperty(cy,"__esModule",{value:!0});cy.toNumber=tV;function tV(e){return typeof e=="number"?e:Number(e)}});var EL=v(dy=>{"use strict";Object.defineProperty(dy,"__esModule",{value:!0});dy.toDate=rV;function rV(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var RL=v(uy=>{"use strict";Object.defineProperty(uy,"__esModule",{value:!0});uy.toBoolean=oV;function oV(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var xL=v(Eu=>{"use strict";Object.defineProperty(Eu,"__esModule",{value:!0});Eu.isSymbol=void 0;var nV=O(),sV=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,nV.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Eu.isSymbol=sV});var rs=v(w=>{"use strict";Object.defineProperty(w,"__esModule",{value:!0});w.isDateLike=w.isBooleanLike=w.isNumeric=w.isNonPositiveInteger=w.isNonNegativeInteger=w.isNegativeInteger=w.isPositiveInteger=w.isInteger=w.isNegativeNumber=w.isNonPositiveNumber=w.isPositiveNumber=w.isNonNegativeNumber=w.isNonEmptyString=w.isOmit=w.isPick=w.isPartialOf=w.isObjectWithEachItem=w.isNonNullObject=w.isTuple=w.isNonEmptyArrayWithEachItem=w.isNonEmptyArray=w.isArrayWithEachItem=w.isError=w.isIndexSignature=w.isSet=w.isMap=w.isURLSearchParams=w.isURL=w.isFormData=w.isBlob=w.isFileList=w.isFile=w.isFunction=w.isUnknown=w.isString=w.isNumber=w.isNil=w.isDefined=w.isDate=w.isBoolean=w.isAny=w.BrandSymbols=w.isBranded=w.guardWithTolerance=w.isObject=w.isObjectWith=w.isNestedType=w.isShape=w.isSchema=w.isType=void 0;w.isSymbol=w.toBoolean=w.toDate=w.toNumber=w.by=w.generateTypeGuardError=w.isPattern=w.isRegex=w.isEqualTo=w.isEnum=w.isAsserted=w.isNilOr=w.isUndefinedOr=w.isNullOr=w.isExtensionOf=w.isIntersectionOf=w.isOneOfTypes=w.isOneOf=w.isBigInt=void 0;var iV=Jd();Object.defineProperty(w,"isType",{enumerable:!0,get:function(){return iV.isType}});var py=bT();Object.defineProperty(w,"isSchema",{enumerable:!0,get:function(){return py.isSchema}});Object.defineProperty(w,"isShape",{enumerable:!0,get:function(){return py.isShape}});Object.defineProperty(w,"isNestedType",{enumerable:!0,get:function(){return py.isNestedType}});var aV=PT();Object.defineProperty(w,"isObjectWith",{enumerable:!0,get:function(){return aV.isObjectWith}});var lV=wT();Object.defineProperty(w,"isObject",{enumerable:!0,get:function(){return lV.isObject}});var cV=_T();Object.defineProperty(w,"guardWithTolerance",{enumerable:!0,get:function(){return cV.guardWithTolerance}});var dV=vT();Object.defineProperty(w,"isBranded",{enumerable:!0,get:function(){return dV.isBranded}});var uV=kT();Object.defineProperty(w,"BrandSymbols",{enumerable:!0,get:function(){return uV.BrandSymbols}});var pV=CT();Object.defineProperty(w,"isAny",{enumerable:!0,get:function(){return pV.isAny}});var mV=TT();Object.defineProperty(w,"isBoolean",{enumerable:!0,get:function(){return mV.isBoolean}});var gV=LT();Object.defineProperty(w,"isDate",{enumerable:!0,get:function(){return gV.isDate}});var fV=Wh();Object.defineProperty(w,"isDefined",{enumerable:!0,get:function(){return fV.isDefined}});var hV=qd();Object.defineProperty(w,"isNil",{enumerable:!0,get:function(){return hV.isNil}});var yV=Dh();Object.defineProperty(w,"isNumber",{enumerable:!0,get:function(){return yV.isNumber}});var SV=WT();Object.defineProperty(w,"isString",{enumerable:!0,get:function(){return SV.isString}});var AV=ET();Object.defineProperty(w,"isUnknown",{enumerable:!0,get:function(){return AV.isUnknown}});var bV=RT();Object.defineProperty(w,"isFunction",{enumerable:!0,get:function(){return bV.isFunction}});var PV=IT();Object.defineProperty(w,"isFile",{enumerable:!0,get:function(){return PV.isFile}});var wV=MT();Object.defineProperty(w,"isFileList",{enumerable:!0,get:function(){return wV.isFileList}});var _V=zT();Object.defineProperty(w,"isBlob",{enumerable:!0,get:function(){return _V.isBlob}});var vV=jT();Object.defineProperty(w,"isFormData",{enumerable:!0,get:function(){return vV.isFormData}});var kV=HT();Object.defineProperty(w,"isURL",{enumerable:!0,get:function(){return kV.isURL}});var CV=UT();Object.defineProperty(w,"isURLSearchParams",{enumerable:!0,get:function(){return CV.isURLSearchParams}});var TV=BT();Object.defineProperty(w,"isMap",{enumerable:!0,get:function(){return TV.isMap}});var LV=GT();Object.defineProperty(w,"isSet",{enumerable:!0,get:function(){return LV.isSet}});var WV=qT();Object.defineProperty(w,"isIndexSignature",{enumerable:!0,get:function(){return WV.isIndexSignature}});var EV=VT();Object.defineProperty(w,"isError",{enumerable:!0,get:function(){return EV.isError}});var RV=Hh();Object.defineProperty(w,"isArrayWithEachItem",{enumerable:!0,get:function(){return RV.isArrayWithEachItem}});var xV=Fh();Object.defineProperty(w,"isNonEmptyArray",{enumerable:!0,get:function(){return xV.isNonEmptyArray}});var IV=KT();Object.defineProperty(w,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return IV.isNonEmptyArrayWithEachItem}});var OV=YT();Object.defineProperty(w,"isTuple",{enumerable:!0,get:function(){return OV.isTuple}});var MV=Xr();Object.defineProperty(w,"isNonNullObject",{enumerable:!0,get:function(){return MV.isNonNullObject}});var NV=XT();Object.defineProperty(w,"isObjectWithEachItem",{enumerable:!0,get:function(){return NV.isObjectWithEachItem}});var zV=ZT();Object.defineProperty(w,"isPartialOf",{enumerable:!0,get:function(){return zV.isPartialOf}});var DV=QT();Object.defineProperty(w,"isPick",{enumerable:!0,get:function(){return DV.isPick}});var jV=eL();Object.defineProperty(w,"isOmit",{enumerable:!0,get:function(){return jV.isOmit}});var $V=tL();Object.defineProperty(w,"isNonEmptyString",{enumerable:!0,get:function(){return $V.isNonEmptyString}});var HV=rL();Object.defineProperty(w,"isNonNegativeNumber",{enumerable:!0,get:function(){return HV.isNonNegativeNumber}});var FV=oL();Object.defineProperty(w,"isPositiveNumber",{enumerable:!0,get:function(){return FV.isPositiveNumber}});var UV=nL();Object.defineProperty(w,"isNonPositiveNumber",{enumerable:!0,get:function(){return UV.isNonPositiveNumber}});var BV=sL();Object.defineProperty(w,"isNegativeNumber",{enumerable:!0,get:function(){return BV.isNegativeNumber}});var GV=iL();Object.defineProperty(w,"isInteger",{enumerable:!0,get:function(){return GV.isInteger}});var qV=aL();Object.defineProperty(w,"isPositiveInteger",{enumerable:!0,get:function(){return qV.isPositiveInteger}});var VV=lL();Object.defineProperty(w,"isNegativeInteger",{enumerable:!0,get:function(){return VV.isNegativeInteger}});var KV=cL();Object.defineProperty(w,"isNonNegativeInteger",{enumerable:!0,get:function(){return KV.isNonNegativeInteger}});var JV=dL();Object.defineProperty(w,"isNonPositiveInteger",{enumerable:!0,get:function(){return JV.isNonPositiveInteger}});var YV=uL();Object.defineProperty(w,"isNumeric",{enumerable:!0,get:function(){return YV.isNumeric}});var XV=pL();Object.defineProperty(w,"isBooleanLike",{enumerable:!0,get:function(){return XV.isBooleanLike}});var ZV=mL();Object.defineProperty(w,"isDateLike",{enumerable:!0,get:function(){return ZV.isDateLike}});var QV=gL();Object.defineProperty(w,"isBigInt",{enumerable:!0,get:function(){return QV.isBigInt}});var eK=Xh();Object.defineProperty(w,"isOneOf",{enumerable:!0,get:function(){return eK.isOneOf}});var tK=hL();Object.defineProperty(w,"isOneOfTypes",{enumerable:!0,get:function(){return tK.isOneOfTypes}});var rK=yL();Object.defineProperty(w,"isIntersectionOf",{enumerable:!0,get:function(){return rK.isIntersectionOf}});var oK=SL();Object.defineProperty(w,"isExtensionOf",{enumerable:!0,get:function(){return oK.isExtensionOf}});var nK=AL();Object.defineProperty(w,"isNullOr",{enumerable:!0,get:function(){return nK.isNullOr}});var sK=bL();Object.defineProperty(w,"isUndefinedOr",{enumerable:!0,get:function(){return sK.isUndefinedOr}});var iK=PL();Object.defineProperty(w,"isNilOr",{enumerable:!0,get:function(){return iK.isNilOr}});var aK=wL();Object.defineProperty(w,"isAsserted",{enumerable:!0,get:function(){return aK.isAsserted}});var lK=_L();Object.defineProperty(w,"isEnum",{enumerable:!0,get:function(){return lK.isEnum}});var cK=vL();Object.defineProperty(w,"isEqualTo",{enumerable:!0,get:function(){return cK.isEqualTo}});var dK=kL();Object.defineProperty(w,"isRegex",{enumerable:!0,get:function(){return dK.isRegex}});var uK=TL();Object.defineProperty(w,"isPattern",{enumerable:!0,get:function(){return uK.isPattern}});var pK=O();Object.defineProperty(w,"generateTypeGuardError",{enumerable:!0,get:function(){return pK.generateTypeGuardError}});var mK=LL();Object.defineProperty(w,"by",{enumerable:!0,get:function(){return mK.by}});var gK=WL();Object.defineProperty(w,"toNumber",{enumerable:!0,get:function(){return gK.toNumber}});var fK=EL();Object.defineProperty(w,"toDate",{enumerable:!0,get:function(){return fK.toDate}});var hK=RL();Object.defineProperty(w,"toBoolean",{enumerable:!0,get:function(){return hK.toBoolean}});var yK=xL();Object.defineProperty(w,"isSymbol",{enumerable:!0,get:function(){return yK.isSymbol}})});var os,IL,SK,OL,ML=l(()=>{"use strict";os=g(require("node:path")),IL=require("node:url"),SK=()=>!0,OL=()=>{if(SK()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?os.default.dirname(os.default.resolve(e)):os.default.dirname(os.default.resolve(__filename))}return os.default.dirname((0,IL.fileURLToPath)(__agentWitchImportMetaUrl))}});var my,NL,D,zL,AK,Zr,T,Ru,gr,DL,xu,ns,Iu,Te,vt,gy,Be,fy,M,hy=l(()=>{"use strict";my=g(require("node:fs")),NL=g(require("node:os")),D=g(require("node:path")),zL=g(rs());Me();ML();Wd();Wd();AK=OL(),Zr=e=>e.trim().toLowerCase(),T=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return D.default.resolve(e);let t=D.default.resolve(AK),r=D.default.basename(t),o=D.default.basename(D.default.dirname(t));return r===kh&&(o===Bt||o===mr)?D.default.dirname(t):r===Bt||r===mr?t:D.default.join(NL.default.homedir(),Bt)},Ru=(e=T())=>D.default.join(e,kh),gr=(e=T())=>D.default.join(Ru(e),QC),DL=(e,t,r)=>t!==null?D.default.join(e,ot,t,r):D.default.join(e,r),xu=e=>DL(e.installDir,e.profileEmail,zi),ns=e=>DL(e.installDir,e.profileEmail,_t),Iu=e=>e.profileEmail!==null?D.default.join(e.installDir,ot,e.profileEmail,Yr):D.default.join(e.installDir,Yr),Te=(e=T())=>Di(e),vt=(e=T())=>Ro(e)?vd:_d,gy=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Zr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Zr(t):null},Be=(e=T())=>{let t=D.default.join(e,vh);if(!my.default.existsSync(t))return null;try{let r=JSON.parse(my.default.readFileSync(t,"utf8"));if((0,zL.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Zr(r.email)}catch{return null}return null},fy=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Zr(r):null}let t=gy();return t!==null?t:Be()},M=e=>{let t=T(),r=Ru(t),o=gr(t),n=fy(e);if(n!==null){let S=D.default.join(t,ot,n),h=D.default.join(S,kd),y=D.default.join(S,zi),p=D.default.join(S,_t),b=D.default.join(S,Ld),A=D.default.join(S,Yr),f=D.default.join(S,_t,Xn),P=D.default.join(S,_t,Zn);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:p,mainLogPath:f,errorLogPath:P,reportsDir:b,deviceKeypairPath:A,configPath:D.default.join(S,"config.json"),harnessRootDir:h,harnessManifestPath:D.default.join(h,Td),harnessSetsDir:D.default.join(h,Cd)}}let s=D.default.join(t,kd),i=D.default.join(t,zi),a=D.default.join(t,_t),c=D.default.join(t,Ld),d=D.default.join(t,Yr),u=D.default.join(t,_t,Xn),m=D.default.join(t,_t,Zn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:u,errorLogPath:m,reportsDir:c,deviceKeypairPath:d,configPath:D.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:D.default.join(s,Td),harnessSetsDir:D.default.join(s,Cd)}}});var yy,jL,bK,PK,$L,Sy,HL=l(()=>{"use strict";yy=g(require("node:fs")),jL=g(require("node:path"));Me();hy();bK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),PK=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,$L=e=>{let t=jL.default.join(e,Eo.wakePort);if(!yy.default.existsSync(t))return null;try{let r=JSON.parse(yy.default.readFileSync(t,"utf8"));if(bK(r)&&PK(r.wakePort))return r.wakePort}catch{return null}return null},Sy=(e=T())=>$L(e)??vt(e)});var J=l(()=>{"use strict";hy();HL()});var Ay,by,Ou=l(()=>{"use strict";Ay=new Set(["","loginwindow","_mbsetupuser","root"]),by=5e3});var FL,CK,UL,Py,wy=l(()=>{"use strict";FL=require("node:child_process");Ou();CK=e=>e.trim().toLowerCase(),UL=e=>e==null?!1:!Ay.has(CK(e)),Py=()=>{if(process.platform!=="darwin")return null;try{let t=(0,FL.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return UL(t)?t:null}catch{return null}}});var GL,BL,kt,Vi=l(()=>{"use strict";GL=g(require("node:os"));wy();BL=e=>e.trim().toLowerCase(),kt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?Py():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??GL.default.userInfo().username;return BL(r)===BL(o)}});var qL,VL,Mo,KL=l(()=>{"use strict";qL=require("node:child_process"),VL=g(require("node:fs"));J();Vi();Mo=(e=T())=>{let t=gr(e);if(!VL.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!kt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Be(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,qL.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var JL,Ki,Mu=l(()=>{"use strict";JL=require("node:child_process"),Ki=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,JL.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Nu,_y,YL,ne,zu,Ji=l(()=>{"use strict";Nu=g(require("node:fs")),_y=g(require("node:path"));J();Me();YL=e=>{let t=_y.default.join(e,ot);return Nu.default.existsSync(t)?Nu.default.readdirSync(t).filter(r=>Nu.default.statSync(_y.default.join(t,r)).isDirectory()).map(r=>Zr(r)).toSorted():[]},ne=(e=T())=>{let t=Te(e),r=YL(e);return[{profileEmail:Be(e)??r[0]??null,launchAgentLabel:t}]},zu=(e=T())=>YL(e)});var vy,XL,ZL,TK,fr,Du=l(()=>{"use strict";vy=g(require("node:fs")),XL=g(require("node:os")),ZL=g(require("node:path"));J();Ji();TK=()=>ZL.default.join(XL.default.homedir(),"Library","LaunchAgents"),fr=(e=T())=>{let t=Te(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ne(e))r.add(n.launchAgentLabel);let o=TK();if(vy.default.existsSync(o))for(let n of vy.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var QL,Yi,eW=l(()=>{"use strict";J();Mu();Du();Ji();QL=(e=T())=>{let t=new Set(ne(e).map(r=>r.launchAgentLabel));return fr(e).filter(r=>!t.has(r))},Yi=(e=T())=>{for(let t of QL(e))Ki(t)}});var Xi,ky=l(()=>{"use strict";J();Mu();Du();Xi=(e=T())=>{for(let t of fr(e))Ki(t)}});var tW,rW,LK,No,oW=l(()=>{"use strict";tW=require("node:child_process"),rW=require("node:util"),LK=(0,rW.promisify)(tW.execFile),No=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await LK("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var zo,WK,Cy,Ty=l(()=>{"use strict";zo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WK=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,Cy=e=>{let t=e.pathValue??WK(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
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
`}});var ju,Ly=l(()=>{"use strict";ju=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Do,Wy,Zi,EK,RK,xK,nW,hr,Ey=l(()=>{"use strict";Do=g(require("node:fs")),Wy=g(require("node:os")),Zi=g(require("node:path"));Me();J();Ty();Ly();EK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),RK=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,xK=e=>{let t=Zi.default.join(e,Eo.wakePort);if(!Do.default.existsSync(t))return vt(e);try{let r=JSON.parse(Do.default.readFileSync(t,"utf8"));if(EK(r)&&RK(r.wakePort))return r.wakePort}catch{return vt(e)}return vt(e)},nW=(e,t=Wy.default.homedir())=>Zi.default.join(t,"Library","LaunchAgents",`${e}.plist`),hr=e=>{let t=e.installDir??T(),r=e.homeDir??Wy.default.homedir(),o=nW(e.launchAgentLabel,r),n=Do.default.existsSync(o)?Do.default.readFileSync(o,"utf8"):null;if(n!==null&&ju(n))return{ok:!0,rewritten:!1,plistPath:o};let s=Cy({launchAgentLabel:e.launchAgentLabel,runPath:Zi.default.join(t,ZC,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??xK(t)});if(!ju(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Do.default.mkdirSync(Zi.default.dirname(o),{recursive:!0}),Do.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var iW,aW,lW,Qi,IK,OK,sW,Ne,Ry=l(()=>{"use strict";iW=require("node:child_process"),aW=g(require("node:fs")),lW=require("node:util");J();Ey();Vi();Qi=(0,lW.promisify)(iW.execFile),IK=async e=>{try{return await Qi("launchctl",["print",e]),!0}catch{return!1}},OK=async(e,t,r)=>{await IK(t)&&await Qi("launchctl",["bootout",t]).catch(()=>{}),await Qi("launchctl",["bootstrap",e,r]),await Qi("launchctl",["enable",t])},sW=async e=>{try{return await Qi("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Ne=async(e,t=T())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!kt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=hr({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await sW(n))return{ok:!0};let i=s.plistPath;if(!aW.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await OK(o,n,i),await sW(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var jo,cW=l(()=>{"use strict";J();Ry();Ji();jo=async(e=T())=>{let t=[];for(let r of ne(e))(await Ne(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var nt,yr,dW=l(()=>{"use strict";ky();Vi();Ou();nt=e=>{kt()||(Xi(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},yr=(e,t=by)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{kt()||e()},t);return()=>{clearInterval(r)}}});var se=l(()=>{"use strict";sT();KL();Mu();eW();ky();Du();Vi();oW();cW();Ry();Ey();Ly();Ty();Ji();wy();Ou();dW()});var xy=l(()=>{"use strict";se()});var uW,pW,$u,mW,ss,gW,fW,$o=l(()=>{"use strict";uW=".agent-witch",pW="memory",$u="project.json",mW="chunks.ndjson",ss="runs.ndjson",gW="reports",fW=".json"});var hW=l(()=>{"use strict";$o()});var yW,Hu,Iy=l(()=>{"use strict";yW=g(require("node:path"));hW();Hu=(e,t)=>yW.default.join(e.trim(),`${t.trim()}${fW}`)});var ea,SW,AW=l(()=>{"use strict";ea="agent-witch.js",SW="command"});var Fu=l(()=>{"use strict";AW()});var Ho,bW,PW=l(()=>{"use strict";Fu();Ho=e=>`'${e.replace(/'/g,"'\\''")}'`,bW=e=>{let t=`${e.installDir.trim()}/${"app"}/${ea}`,r=[Ho("node"),Ho(t),"report","write","--key",Ho(e.reportKey.trim()),"--agent-run-id",Ho(e.agentRunId.trim()),"--status",Ho(e.status),"--summary",Ho(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Ho(e.details.trim())),r.join(" ")}});var qt,wW,MK,Oy,Uu=l(()=>{"use strict";Iy();PW();qt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},wW=e=>e===qt.COMPLETED||e===qt.FAILED,MK=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Oy=(e,t)=>{let r=Hu(t.reportsDir,t.reportKey),o=bW({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:qt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${MK({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var ze=l(()=>{"use strict";Me();J()});var ra,vW,_W,kW,NK,is,zK,CW,oa,na,My,TW,LW,sa=l(()=>{"use strict";ra=g(require("node:fs")),vW=g(require("node:path"));Uu();Iy();ze();_W=50,kW=e=>{let t=M(),r=Hu(t.reportsDir,e);return ra.default.mkdirSync(vW.default.dirname(r),{recursive:!0}),r},NK=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},is=e=>{let t=kW(e);if(!ra.default.existsSync(t))return null;try{let r=JSON.parse(ra.default.readFileSync(t,"utf8"));return NK(r)?r:null}catch{return null}},zK=(e,t)=>{let r=[...e,t];return r.length>_W?r.slice(r.length-_W):r},CW=e=>{let t=kW(e.reportKey);ra.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},oa=e=>{let t=is(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:zK(t?.history??[],o)};return CW(n),n},na=e=>{let t=is(e.reportKey);return t!==null?t:oa({reportKey:e.reportKey,agentRunId:e.agentRunId,status:qt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},My=(e,t)=>{let r=t.trim();if(r.length===0)return is(e);let o=is(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return CW(s),s},TW=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},LW=e=>{if(e===null||!wW(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===qt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var DK,jK,ia,WW,Bu,Ny=l(()=>{"use strict";Uu();sa();DK=new Set(Object.values(qt)),jK=e=>DK.has(e),ia=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},WW=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Bu=e=>{if(e[0]!=="write")return WW(),1;let r=ia(e,"--key"),o=ia(e,"--agent-run-id"),n=ia(e,"--status"),s=ia(e,"--summary"),i=ia(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!jK(n)?(WW(),1):(oa({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var st,Fo=l(()=>{"use strict";st=()=>!0});var zy,EW,Uo,Gu=l(()=>{"use strict";zy=g(require("node:path")),EW=require("node:url");Fo();Uo=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=zy.default.resolve(t);return st()?r===zy.default.resolve(__filename):e===void 0?!1:r===(0,EW.fileURLToPath)(e)}});var qu,as,FK,Kre,ls=l(()=>{"use strict";qu="agent-witch.js",as="deps.tar.gz",FK="install.sh",Kre={mainScript:`app/${qu}`,depsArchive:`app/${as}`,installShell:FK}});var OW=l(()=>{"use strict";ls()});var MW=l(()=>{"use strict";ls();OW()});var aa,jy,Vu,UK,la,De,ds,ca,da,Bo,$y=l(()=>{"use strict";aa=g(require("node:fs")),jy=g(require("node:path"));MW();J();Vu="install-version.json",UK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),la=(e=T())=>jy.default.join(e,Vu),De=(e=T())=>{let t=la(e);if(!aa.default.existsSync(t))return null;try{let r=JSON.parse(aa.default.readFileSync(t,"utf8"));return!UK(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},ds=(e,t=T())=>{let r=la(t);aa.default.mkdirSync(jy.default.dirname(r),{recursive:!0}),aa.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},ca=(e=T())=>De(e)?.bundleVersion??"252",da=(e,t)=>{let r=De(e);if(r!==null)return r;let o={bundleVersion:"252",appOrigin:t,updatedAt:new Date().toISOString()};return ds(o,e),o},Bo=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var NW,Go,Hy,Fy,Uy,Ku,Vt,qo,By=l(()=>{"use strict";NW=require("node:crypto"),Go=g(require("node:fs")),Hy=g(require("node:path"));J();Fy="self-update-log.ndjson",Uy=100,Ku=(e=T())=>{let t=M(),r=t.installDir===e?t.logsDir:ns({installDir:e,profileEmail:t.profileEmail});return Hy.default.join(r,Fy)},Vt=(e,t=T())=>{let r={id:(0,NW.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Ku(t);Go.default.mkdirSync(Hy.default.dirname(o),{recursive:!0});let n=Go.default.existsSync(o)?Go.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Uy+1)),JSON.stringify(r)];return Go.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},qo=(e=20,t=T())=>{let r=Ku(t);if(!Go.default.existsSync(r))return[];let o=Go.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var Gy,uoe,qy=l(()=>{"use strict";ls();Gy="deps",uoe=`${"app"}/${as}`});var zW=l(()=>{"use strict";qy()});var DW,Qr,Vo,jW,Vy,Ky,$W=l(()=>{"use strict";DW=require("node:child_process"),Qr=g(require("node:fs")),Vo=g(require("node:path"));ls();qy();jW=e=>Vo.default.join(e,"app",Gy),Vy=e=>{let t=Vo.default.join(e,"app"),r=Vo.default.join(t,as);Qr.default.existsSync(r)&&(Qr.default.rmSync(jW(e),{recursive:!0,force:!0}),Qr.default.mkdirSync(t,{recursive:!0}),(0,DW.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Qr.default.rmSync(r,{force:!0}))},Ky=e=>{Qr.default.rmSync(Vo.default.join(e,"node_modules"),{recursive:!0,force:!0}),Qr.default.rmSync(Vo.default.join(e,"package.json"),{force:!0}),Qr.default.rmSync(Vo.default.join(e,"package-lock.json"),{force:!0})}});var HW=l(()=>{"use strict";zW();$W()});var it,Ju,FW=l(()=>{"use strict";it="https://www.agentwitch.com",Ju="wss://www.agentwitch.com/api/agent-witch/ws"});var ua,Sr,UW=l(()=>{"use strict";ua="127.0.0.1",Sr=`http://${ua}:43347`});var gt=l(()=>{"use strict";FW();UW()});var pa,Yu,BW,Yy,BK,GW,Qy,qW,Ct,ma,ga,eS,Xy,Zy,fa,tS,rS,oS,us=l(()=>{"use strict";pa=g(require("node:fs")),Yu=g(require("node:path")),BW="active-writer-work.json",Yy=new Set,BK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GW=e=>e.profileEmail===null?Yu.default.join(e.installDir,BW):Yu.default.join(e.installDir,"profiles",e.profileEmail,BW),Qy=e=>{let t=GW(e);if(!pa.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(pa.default.readFileSync(t,"utf8"));return!BK(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},qW=(e,t)=>{let r=GW(e);pa.default.mkdirSync(Yu.default.dirname(r),{recursive:!0}),pa.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Ct=e=>Qy(e).activeCount>0,ma=e=>{let t=Qy(e);qW(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},ga=e=>{let t=Qy(e),r=Math.max(0,t.activeCount-1);if(qW(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of Yy)o()},eS=e=>(Yy.add(e),()=>{Yy.delete(e)}),Xy=null,Zy=null,fa=e=>{Xy=e},tS=e=>{Zy=e},rS=()=>{let e=Xy;return Xy=null,e},oS=()=>{let e=Zy;return Zy=null,e}});var Le,Xu=l(()=>{"use strict";Le=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var ps,Zu,ha,nS=l(()=>{"use strict";ps="qwen2.5:7b",Zu="nomic-embed-text",ha="Install Ollama from https://ollama.com/download"});var ya,sS,Qu=l(()=>{"use strict";nS();ya=()=>`
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
    echo "Ollama is missing. ${ha}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${ha}" >&2
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
  agent_witch_ensure_ollama_model "${Zu}" "\${pull_log}"
}
`,sS=()=>`
${ya()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var VW,GK,ep,iS=l(()=>{"use strict";VW=require("node:child_process");J();Qu();GK=e=>new Promise(t=>{let r=(0,VW.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:T()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),ep=async(e=GK)=>{let t=`${ya()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var eo,tp,KW,qK,JW,gs,VK,KK,JK,ms,Ko,Jo,YW=l(()=>{"use strict";eo=g(require("node:fs")),tp=g(require("node:path"));HW();se();J();ls();gt();$y();us();Xu();By();iS();KW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qK=e=>{let t=Be(e),r=t===null?M():M(t);if(!eo.default.existsSync(r.configPath))return null;try{let o=JSON.parse(eo.default.readFileSync(r.configPath,"utf8"));return!KW(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},JW=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!KW(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},gs=async e=>(await JW(e))?.bundleVersion??null,VK=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=tp.default.join(t,r);eo.default.mkdirSync(tp.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());eo.default.writeFileSync(n,s),r.endsWith(".js")&&eo.default.chmodSync(n,493)},KK=async()=>{Yi(),await jo()},JK=(e,t)=>e!==null?Le(e):t??it,ms=(e,t)=>({localBundleVersion:t,...e}),Ko=async e=>{let t=T(),r=De(t),o=r?.bundleVersion??null,n=await ep();Vt({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=qK(t),i=JK(s,r?.appOrigin);if(i===null){let d=ms({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return Vt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await JW(i);if(a===null){let d=ms({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return Vt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||Bo(o,a.bundleVersion))){let d=ms({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Vt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let S of a.scripts)await VK(i,t,S);let d=tp.default.join(t,qu);eo.default.existsSync(d)&&eo.default.rmSync(d,{force:!0}),Vy(t),Ky(t),ds({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let u=M(Be(t));if(Ct(u)){let S=ms({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Vt({event:"update_applied",ok:!0,message:S.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),S}await KK();let m=ms({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Vt({event:"update_applied",ok:!0,message:m.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}catch(d){let u=d instanceof Error?d.message:"Agent Witch self-update failed.",m=ms({ok:!1,updated:!1,message:u,remoteBundleVersion:a.bundleVersion},o);return Vt({event:"update_failed",ok:!1,message:u,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},Jo=()=>{let e=T();return{local:De(e),logs:qo(20,e)}}});var XW={};Ut(XW,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>Vu,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>ha,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Zu,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>ps,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Fy,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Uy,appendAgentWitchSelfUpdateLog:()=>Vt,buildAgentWitchEnsureOllamaShell:()=>ya,buildAgentWitchInstallScriptOllama:()=>sS,buildAgentWitchSelfUpdateStatus:()=>Jo,ensureAgentWitchInstallVersionRecorded:()=>da,ensureAgentWitchOllamaInstalled:()=>ep,fetchAgentWitchRemoteInstallBundleVersion:()=>gs,isRemoteAgentWitchBundleVersionNewer:()=>Bo,readAgentWitchInstallVersion:()=>De,readAgentWitchSelfUpdateLogs:()=>qo,resolveAgentWitchAppOriginFromWsUrl:()=>Le,resolveAgentWitchHeartbeatInstallBundleVersion:()=>ca,resolveAgentWitchInstallVersionPath:()=>la,resolveAgentWitchSelfUpdateLogPath:()=>Ku,runAgentWitchSelfUpdate:()=>Ko,writeAgentWitchInstallVersion:()=>ds});var Kt=l(()=>{"use strict";$y();By();YW();Xu();nS();Qu();iS()});var aS={};Ut(aS,{buildAgentWitchSelfUpdateStatus:()=>Jo,fetchAgentWitchRemoteInstallBundleVersion:()=>gs,runAgentWitchSelfUpdate:()=>Ko});var lS=l(()=>{"use strict";Kt()});function fs(e){return(0,ZW.createHash)("sha256").update(e.trim()).digest("hex")}var ZW,rp=l(()=>{"use strict";ZW=require("node:crypto")});var hs,Sa,YK,ys,cS,op=l(()=>{"use strict";hs=g(require("node:fs")),Sa=g(require("node:path"));rp();ze();YK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ys=e=>{if(!hs.default.existsSync(e))return null;try{let t=JSON.parse(hs.default.readFileSync(e,"utf8"));return!YK(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:fs(t.pairingToken.trim())}catch{return null}},cS=(e=T())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(ys(Sa.default.join(e,"config.json")));let n=Sa.default.join(e,ot);if(!hs.default.existsSync(n))return t;for(let s of hs.default.readdirSync(n)){let i=Sa.default.join(n,s);hs.default.statSync(i).isDirectory()&&o(ys(Sa.default.join(i,"config.json")))}return t}});var Ss,Aa=l(()=>{"use strict";Ss="connection-health.json"});var Yo,np,XK,ba,he,dS,sp,We,ip=l(()=>{"use strict";Yo=g(require("node:fs")),np=g(require("node:path"));Aa();XK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ba=e=>e.profileEmail===null?np.default.join(e.installDir,Ss):np.default.join(e.installDir,"profiles",e.profileEmail,Ss),he=e=>{let t=ba(e);if(!Yo.default.existsSync(t))return null;try{let r=JSON.parse(Yo.default.readFileSync(t,"utf8"));return!XK(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},dS=e=>{let t=ba(e);Yo.default.existsSync(t)&&Yo.default.rmSync(t,{force:!0})},sp=(e,t)=>{let r=ba(e),o=he(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Yo.default.mkdirSync(np.default.dirname(r),{recursive:!0}),Yo.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},We=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var Pa,QW=l(()=>{"use strict";Aa();ip();Pa=(e,t)=>{if(!t.socketOpen)return!1;let r=he(e);return r===null?!1:!We(r,t.staleAfterMs??12e4,t.nowMs)}});var uS,eE=l(()=>{"use strict";ip();uS=(e,t)=>!(e!==null&&!We(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Xo=l(()=>{"use strict";ip();QW();eE();Aa()});var ap,pS,ZK,QK,tE,rE=l(()=>{"use strict";ap=g(require("node:fs")),pS=g(require("node:path"));J();Me();Xo();op();ZK=12e4,QK=e=>{let t=pS.default.join(e,ot);return ap.default.existsSync(t)?ap.default.readdirSync(t).filter(r=>ap.default.statSync(pS.default.join(t,r)).isDirectory()):[]},tE=(e=T())=>{let t=null,r=-1;for(let o of QK(e)){let n=M(o),s=he(n);if(s===null||We(s,ZK))continue;let i=ys(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var mS,oE,lp,wa,_a,e4,t4,r4,nE,ge,fe,cp,Jt,Tt=l(()=>{"use strict";mS=g(require("node:fs")),oE=g(require("node:os")),lp=g(require("node:path")),wa={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},_a=e=>e.trim().length>0,e4=e=>{let t=lp.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},t4=()=>{let e=oE.default.homedir(),t=lp.default.join(e,".local","bin","agent");if(mS.default.existsSync(t))return t;let r=lp.default.join(e,".local","bin","cursor-agent");return mS.default.existsSync(r)?r:wa.cursorCommand},r4=e=>{let t=e.trim();return!_a(t)||t===wa.cursorCommand?t4():t},nE=(e,t)=>e4(e)?t:["agent",...t],ge=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",fe=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:_a(t)?t.trim():wa.claudeCommand,codexCommand:_a(r)?r.trim():wa.codexCommand,cursorCommand:r4(o),antigravityCommand:_a(n)?n.trim():wa.antigravityCommand}},cp=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:nE(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Jt=(e,t,r,o)=>{let n=t.trim();if(!_a(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:nE(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",n]}}});var to,o4,Zo,n4,As,va=l(()=>{"use strict";to=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,o4=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:to(s.inputTokens)+to(s.outputTokens)+to(s.cacheReadInputTokens)+to(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Zo=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=to(a.input_tokens)+to(a.cache_creation_input_tokens)+to(a.cache_read_input_tokens),d=to(a.output_tokens),u=c+d;return u<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:u,model:o4(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},n4=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),As=(e,t)=>{let r=Zo(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??n4(r)}}});var gS,s4,i4,fS,hS=l(()=>{"use strict";gS=e=>e.toLocaleString("en-US"),s4=e=>e<.01?e.toFixed(4):e.toFixed(3),i4=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${s4(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${gS(e.inputTokens)} in / ${gS(e.outputTokens)} out (${gS(e.totalTokens)} total)`,t].join(`
`)},fS=(e,t)=>{if(t===void 0)return e;let r=i4(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var dp,yS=l(()=>{"use strict";dp={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Qo,SS,up,AS=l(()=>{"use strict";yS();Qo="auto",SS=e=>({value:Qo,label:`Auto (${dp[e]})`}),up={anthropic:[SS("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[SS("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[SS("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var bs,ka,pp,Ps=l(()=>{"use strict";yS();AS();bs=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Qo))return t},ka=(e,t)=>{let r=bs(t);return r===void 0?dp[e]:r},pp=e=>{let t=bs(e);return t===void 0?Qo:t}});var mp,a4,l4,gp,sE=l(()=>{"use strict";mp={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},a4=e=>{let t=mp[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?mp["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?mp["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?mp["gemini-2.0-flash"]:null},l4=(e,t,r)=>{let o=a4(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},gp=e=>{let t=l4(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var ws,c4,d4,u4,fp,iE=l(()=>{"use strict";sE();ws=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),c4=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=ws(r.input_tokens),n=ws(r.output_tokens);return o===0&&n===0?null:gp({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},d4=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=ws(r.prompt_tokens),n=ws(r.completion_tokens);return o===0&&n===0?null:gp({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},u4=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=ws(r.promptTokenCount),n=ws(r.candidatesTokenCount);return o===0&&n===0?null:gp({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},fp=(e,t,r)=>e==="anthropic"?c4(t,r):e==="openai"?d4(t,r):u4(t,r)});var p4,bS,m4,g4,f4,h4,y4,PS,wS=l(()=>{"use strict";Ps();iE();p4=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},bS=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:ka(e,t.model)},m4=async e=>{let t=bS("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=p4(o);n.length>0&&e.onChunk?.(n);let s=fp("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},g4=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},f4=async e=>{let t=bS("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=g4(o);n.length>0&&e.onChunk?.(n);let s=fp("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},h4=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},y4=async e=>{let t=bS("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=h4(n);s.length>0&&e.onChunk?.(s);let i=fp("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},PS=async e=>{try{return e.provider==="anthropic"?await m4(e):e.provider==="openai"?await f4(e):await y4(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var at,Ca=l(()=>{"use strict";at=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var aE,S4,hp,_S=l(()=>{"use strict";aE=g(require("node:path")),S4="writer-api-secrets.json",hp=e=>aE.default.join(e,S4)});var vS,lE,A4,ro,Je,oo=l(()=>{"use strict";vS=g(require("node:fs"));Ps();_S();lE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),A4=e=>{if(!lE(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=bs(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},ro=e=>{let t=hp(e);if(!vS.default.existsSync(t))return{};try{let r=JSON.parse(vS.default.readFileSync(t,"utf8"));if(!lE(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=A4(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Je=(e,t)=>ro(e)[t]??null});var je,Ta=l(()=>{"use strict";je=e=>e==="api"?"api":"cli"});var cE,Re,en,Ar=l(()=>{"use strict";cE=g(require("node:path"));Ca();oo();Ta();Re=e=>cE.default.dirname(e),en=(e,t)=>{if(je(e.writerExecutionBackend)!=="api")return!1;let r=at(t);if(r===null)return!1;let o=Re(e.layout.configPath),n=Je(o,r);return n!==null&&n.apiKey.length>0}});var La,kS=l(()=>{"use strict";hS();wS();Ca();oo();Ar();La=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=at(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Re(e.layout.configPath),a=Je(i,s);if(a===null){let d=Object.keys(ro(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await PS({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:fS(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var dE,_s,CS=l(()=>{"use strict";dE=require("node:child_process");Tt();va();kS();Ar();_s=(e,t,r)=>new Promise(o=>{if(!ge(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(en(e,t)){La(e,t,r).then(o);return}let n=Jt(t,r,fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,dE.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=As(i.join("")),u=a.join("").trim(),m=[d.output.trim(),u].filter(S=>S.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var uE=l(()=>{"use strict"});var pE=l(()=>{"use strict";hS();CS();wS();uE();oo();Ar()});var mE,gE,fE,hE=l(()=>{"use strict";mE="claude",gE="codex",fE="cursor"});var yE,b4,TS,Wa,yp=l(()=>{"use strict";yE=g(require("node:path"));gt();Me();b4="ws://localhost:3000/api/agent-witch/ws",TS=e=>e.replace(/\/$/,""),Wa=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return TS(t);let r=yE.default.basename(e.installDir);if(r===Ni.production)return Ju;let o=e.configWsUrl?.trim()??"";return r===Ni.localhost?o.length>0?TS(o):b4:o.length>0?TS(o):Ju}});var w4,LS,WS=l(()=>{"use strict";hE();yp();Ta();w4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),LS=e=>{if(!w4(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Wa({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??mE,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??gE,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??fE,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",u=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:u,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:je(t.writerExecutionBackend),layout:e.layout}}}});var ES,RS,xS=l(()=>{"use strict";ES=g(require("node:fs"));J();WS();RS=e=>{let t=M(e);if(!ES.default.existsSync(t.configPath))return null;try{let r=JSON.parse(ES.default.readFileSync(t.configPath,"utf8")),o=LS({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Ea,SE=l(()=>{"use strict";Ea=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var IS,_4,OS,AE=l(()=>{"use strict";IS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_4=e=>{if(!IS(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!IS(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let u=s.items.flatMap(m=>{if(!IS(m))return[];let S=typeof m.itemKey=="string"?m.itemKey.trim():"",h=typeof m.relativePath=="string"?m.relativePath:"",y=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return S.length===0||y.length===0?[]:[{itemKey:S,relativePath:h,contentSha256:y}]});return u.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:u}]});return{id:t,projectId:r,digest:o,entries:n}},OS=_4});var bE,v4,Sp,MS=l(()=>{"use strict";bE=g(require("node:path")),v4=(e,t)=>{let r=t.trim();return bE.default.join(e,"components","store",r.slice(0,2),r)},Sp=v4});var PE,k4,NS,wE=l(()=>{"use strict";PE=g(require("node:fs"));MS();k4=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Sp(e.installDir,n.contentSha256);PE.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},NS=k4});var Ra,vs,C4,zS,T4,DS,jS=l(()=>{"use strict";Ra=g(require("node:fs")),vs=g(require("node:path"));MS();C4=(e,t)=>vs.default.join(e.installDir,"runs",t,"overlay"),zS=(e,t)=>vs.default.join(C4(e,t),".cursor"),T4=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=zS(e,t);Ra.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Sp(e.installDir,i.contentSha256);if(!Ra.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?vs.default.join(n,c):vs.default.join(n,i.itemKey);Ra.default.mkdirSync(vs.default.dirname(d),{recursive:!0}),Ra.default.copyFileSync(a,d)}return{ok:!0}},DS=T4});var $S,_E,L4,xa,vE=l(()=>{"use strict";$S=g(require("node:fs")),_E=g(require("node:path")),L4=(e,t)=>{let r=_E.default.join(e.installDir,"runs",t);$S.default.existsSync(r)&&$S.default.rmSync(r,{recursive:!0,force:!0})},xa=L4});var W4,HS,kE=l(()=>{"use strict";jS();W4=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=zS(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},HS=W4});var FS,E4,R4,x4,I4,O4,$,CE=l(()=>{"use strict";FS=g(require("node:fs"));yp();J();Ta();E4="claude",R4="codex",x4="cursor",I4="agy",O4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=M();if(!FS.default.existsSync(e.configPath))return null;try{let t=JSON.parse(FS.default.readFileSync(e.configPath,"utf8"));if(!O4(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Wa({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:je(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:E4,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:R4,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:x4,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:I4,pairingToken:s,layout:e}}catch{return null}}});var Ap,TE,LE=l(()=>{"use strict";Ap=g(require("node:fs"));_S();TE=(e,t)=>{let r=hp(e);Ap.default.mkdirSync(e,{recursive:!0}),Ap.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Ap.default.chmodSync(r,384)}catch{}}});var Ia,WE,bp=l(()=>{"use strict";Ia=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},WE=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Ia(t)}});var Oa,M4,US,BS,EE=l(()=>{"use strict";Oa=g(require("node:fs"));oo();LE();bp();Ps();Ar();M4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),US=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=WE(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?bs(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},BS=e=>{let t=Re(e.configPath),r={};if(Oa.default.existsSync(e.configPath))try{let n=JSON.parse(Oa.default.readFileSync(e.configPath,"utf8"));M4(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,Oa.default.mkdirSync(t,{recursive:!0}),Oa.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=US(US(US(ro(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);TE(t,o)}});var Pp,GS=l(()=>{"use strict";Pp={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var qS,RE=l(()=>{"use strict";Ca();oo();Ar();Ar();qS=(e,t)=>{if(en(e,t))return!1;let r=at(t);if(r===null)return!1;let o=Re(e.layout.configPath),n=Je(o,r);return n===null||n.apiKey.trim().length===0}});var xE,VS,KS=l(()=>{"use strict";xE=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},VS=async e=>{let t=xE(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=xE(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var N4,JS,IE=l(()=>{"use strict";se();xS();KS();N4=1e4,JS=()=>VS({listProfileEmails:zu,readConfig:RS,pollIntervalMs:N4,logWaiting:e=>{console.error(e)}})});var le=l(()=>{"use strict";CS();pE();xS();yp();SE();AE();wE();jS();vE();kE();Ta();CE();EE();oo();Ar();bp();Ps();GS();kS();Ar();RE();Ca();oo();IE();WS();KS()});var OE,YS,ME=l(()=>{"use strict";OE=g(require("node:path"));J();Me();rE();rp();op();le();YS=(e=T())=>{let t=tE(e);if(t!==null)return t;let r=Be(e);if(r!==null){let n=ys(OE.default.join(e,ot,r,"config.json"));if(n!==null)return n}let o=$()?.pairingToken.trim()??"";return o.length===0?null:fs(o)}});var wp,NE,z4,D4,zE,_p,Ma,vp,Na=l(()=>{"use strict";wp=g(require("node:fs")),NE=g(require("node:path")),z4="wake-port.json",D4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zE=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,_p=e=>NE.default.join(e,z4),Ma=e=>{let t=_p(e);if(!wp.default.existsSync(t))return null;try{let r=JSON.parse(wp.default.readFileSync(t,"utf8"));if(D4(r)&&zE(r.wakePort))return r.wakePort}catch{return null}return null},vp=(e,t)=>{if(!zE(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=_p(e);wp.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Yie,Xie,Zie,Lt,DE,za=l(()=>{"use strict";Na();ze();Na();Yie=vt(),Xie=`${Te()}-wake`,Zie=Te(),Lt=()=>{let e=T(),t=Ma(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return vt()},DE=e=>{let t=T();Ma(t)===null&&vp(t,e)}});var jE=l(()=>{"use strict";rp();se();op();ME();le();za()});var XS,Da,ja,$E=l(()=>{"use strict";XS=g(require("node:os"));jE();Da=()=>{let e=ne();return{ok:!0,port:Lt(),hostname:XS.default.hostname(),profileCount:e.length}},ja=()=>{let e=ne(),t=YS(),r=cS();return{hostname:XS.default.hostname(),port:Lt(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var ZS=l(()=>{"use strict";$E()});var HE,FE,UE,kp,ks=l(()=>{"use strict";HE="materialization.json",FE="backups",UE=".gitignore",kp=e=>`harness-set:${e.trim()}`});var BE,GE,Cp,qE=l(()=>{"use strict";BE=g(require("node:crypto")),GE=g(require("node:fs")),Cp=e=>{try{let t=GE.default.readFileSync(e);return BE.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var no,tn,j4,VE,QS,KE=l(()=>{"use strict";no=g(require("node:fs")),tn=g(require("node:path"));qE();j4=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=tn.default.join(t,n,o);return no.default.mkdirSync(tn.default.dirname(s),{recursive:!0}),no.default.copyFileSync(r,s),tn.default.relative(e,s).replaceAll("\\","/")},VE=e=>{let t=tn.default.join(e.repoRoot,e.repoRelativeDestination),r=Cp(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(no.default.existsSync(t)){let n=Cp(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=j4(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return no.default.mkdirSync(tn.default.dirname(t),{recursive:!0}),no.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return no.default.mkdirSync(tn.default.dirname(t),{recursive:!0}),no.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},QS=e=>{let t=Cp(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var eA,JE,Cs,Tp=l(()=>{"use strict";eA=g(require("node:fs"));ks();JE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Cs=e=>{if(!eA.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(eA.default.readFileSync(e,"utf8"));if(JE(t)&&t.version===1&&JE(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var so,Lp,Wp,tA=l(()=>{"use strict";so=g(require("node:fs")),Lp=g(require("node:path"));ks();Wp=e=>{let t=new Set(e.setSlugs.map(s=>kp(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=Lp.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=Lp.default.join(e.repoRoot,i.backupPath);so.default.existsSync(c)?(so.default.mkdirSync(Lp.default.dirname(a),{recursive:!0}),so.default.copyFileSync(c,a),o.push(s)):so.default.existsSync(a)&&so.default.rmSync(a,{force:!0})}else so.default.existsSync(a)&&so.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var rA,Ts,Ep=l(()=>{"use strict";rA=g(require("node:path"));ks();Ts=e=>({ledgerFilePath:rA.default.join(e.metaDirPath,HE),backupsDirPath:rA.default.join(e.metaDirPath,FE)})});var oA,YE,XE=l(()=>{"use strict";oA=g(require("node:path")),YE=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return oA.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return oA.default.posix.join(s,e,n)}});var nA,ZE,Ha,sA=l(()=>{"use strict";nA=g(require("node:fs")),ZE=g(require("node:path")),Ha=(e,t)=>{nA.default.mkdirSync(ZE.default.dirname(e),{recursive:!0}),nA.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var iA,$4,Ye,rn=l(()=>{"use strict";iA=g(require("node:os")),$4=e=>{let t=e.trim();return t.startsWith("~/")?`${iA.default.homedir()}${t.slice(1)}`:t==="~"?iA.default.homedir():t},Ye=$4});var Rp,QE,H4,eR,tR=l(()=>{"use strict";Rp=g(require("node:fs")),QE=g(require("node:path"));ks();$o();H4=`*
!${$u}
`,eR=e=>{let t=QE.default.join(e,UE);Rp.default.existsSync(t)||(Rp.default.mkdirSync(e,{recursive:!0}),Rp.default.writeFileSync(t,H4))}});var on,ft,nn=l(()=>{"use strict";on=g(require("node:path"));$o();rn();ft=e=>{let t=Ye(e),r=on.default.join(t,uW);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:on.default.join(r,"rag"),memoryDirPath:on.default.join(r,pW),reportsDirPath:on.default.join(r,gW),metaFilePath:on.default.join(r,$u),ragChunksFilePath:on.default.join(r,"rag",mW)}}});var Yt,oR,F4,U4,Ge,xp=l(()=>{"use strict";Yt=g(require("node:fs")),oR=g(require("node:path"));$o();tR();nn();F4=(e,t)=>{if(Yt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Yt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},U4=e=>{Yt.default.existsSync(e.ragChunksFilePath)||Yt.default.writeFileSync(e.ragChunksFilePath,"");let t=oR.default.join(e.memoryDirPath,ss);Yt.default.existsSync(t)||Yt.default.writeFileSync(t,"")},Ge=e=>{let t=ft(e.projectFolderPath);return Yt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Yt.default.mkdirSync(t.ragDirPath,{recursive:!0}),Yt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),eR(t.metaDirPath),F4(t,e),U4(t),{ok:!0,layout:t}}});var nR,sR,iR,aR,Ip,Op=l(()=>{"use strict";nR="components",sR="store",iR="versions",aR="installed.json",Ip=e=>`harness-set:${e.trim()}`});var aA,lR,Mp,lA=l(()=>{"use strict";aA=g(require("node:fs")),lR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Mp=e=>{if(!aA.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(aA.default.readFileSync(e,"utf8"));if(lR(t)&&t.version===1&&lR(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var Fa,Ls,Np=l(()=>{"use strict";Fa=g(require("node:path"));Op();Ls=e=>{let t=Fa.default.join(e,nR);return{componentsRootDir:t,storeDir:Fa.default.join(t,sR),versionsDir:Fa.default.join(t,iR),installedFilePath:Fa.default.join(t,aR)}}});var cA,cR,zp,Dp,jp=l(()=>{"use strict";cA=g(require("node:crypto")),cR=g(require("node:fs")),zp=e=>cA.default.createHash("sha256").update(e,"utf8").digest("hex"),Dp=e=>{try{let t=cR.default.readFileSync(e);return cA.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var dA,dR,uR,pR=l(()=>{"use strict";dA=g(require("node:fs")),dR=g(require("node:path")),uR=(e,t)=>{dA.default.mkdirSync(dR.default.dirname(e),{recursive:!0}),dA.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var uA,pA,mR,gR=l(()=>{"use strict";uA=g(require("node:fs")),pA=g(require("node:path")),mR=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=pA.default.join(e,r),n=pA.default.join(o,`${t.versionId}.json`);uA.default.mkdirSync(o,{recursive:!0}),uA.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var $p,fR,hR,yR=l(()=>{"use strict";$p=g(require("node:fs")),fR=g(require("node:path"));jp();hR=e=>{let t=zp(e.content),r=fR.default.join(e.storeDir,t);return $p.default.existsSync(r)||($p.default.mkdirSync(e.storeDir,{recursive:!0}),$p.default.writeFileSync(r,e.content)),t}});var mA,SR,B4,Hp,gA=l(()=>{"use strict";mA=g(require("node:fs")),SR=g(require("node:path"));Op();lA();Np();jp();pR();gR();yR();B4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Hp=e=>{let t=Ls(e.installDir),r=Ip(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!B4(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=SR.default.join(e.harnessRootDir,a);if(!mA.default.existsSync(c))continue;let d=mA.default.readFileSync(c,"utf8"),u=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Dp(c);if(u!==null){if(zp(d)!==u)throw new Error(`Harness item "${i.id}" failed content hash verification.`);hR({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:u})}}if(n.length===0)return;mR(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=Mp(t.installedFilePath);uR(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var hA,fA,AR,bR=l(()=>{"use strict";hA=g(require("node:fs"));gA();lA();Np();fA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),AR=e=>{if(!hA.default.existsSync(e.harnessManifestPath))return;let t=Ls(e.installDir),r=Mp(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(hA.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!fA(o)||o.version!==1||!fA(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!fA(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Hp({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var yA,PR,wR,_R=l(()=>{"use strict";yA=g(require("node:fs")),PR=g(require("node:path")),wR=e=>{let t=e.componentId.replaceAll("/","_"),r=PR.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!yA.default.existsSync(r))return null;try{let o=JSON.parse(yA.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Fp,Up,vR,kR=l(()=>{"use strict";Fp=g(require("node:fs")),Up=g(require("node:path"));Op();bR();_R();Np();jp();vR=e=>{AR({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Ls(e.layout.installDir),r=Ip(e.setSlug),o=wR({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Up.default.join(t.storeDir,i.contentSha256);if(Fp.default.existsSync(a)&&Dp(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Up.default.join(e.layout.harnessRootDir,n):Up.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Fp.default.existsSync(s))return null;try{if(!Fp.default.statSync(s).isFile())return null}catch{return null}return s}});var CR,G4,SA,Xt,Ua=l(()=>{"use strict";Tp();Ep();nn();CR="harness-set:",G4=e=>{let t=e.trim();if(!t.startsWith(CR))return null;let r=t.slice(CR.length).trim();return r.length>0?r:null},SA=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=G4(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Xt=e=>{let t=ft(e),{ledgerFilePath:r}=Ts(t),o=Cs(r);return SA(o)}});var Bp,AA,Ba,q4,br,Ga,Ws=l(()=>{"use strict";Bp=g(require("node:fs")),AA=g(require("node:os")),Ba=g(require("node:path")),q4=()=>Bp.default.realpathSync(Ba.default.resolve(AA.default.homedir())),br=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Ba.default.join(AA.default.homedir(),t.slice(1)):t,o;try{o=Bp.default.realpathSync(Ba.default.resolve(r))}catch{return null}let n=q4();return o===n||o.startsWith(`${n}${Ba.default.sep}`)?o:null},Ga=e=>{let t=br(e);if(t===null)return null;try{if(!Bp.default.statSync(t).isFile())return null}catch{return null}return t}});var bA,PA=l(()=>{"use strict";bA=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var qp,TR,Gp,V4,qa,wA=l(()=>{"use strict";qp=g(require("node:fs")),TR=g(require("node:path"));ks();KE();Tp();tA();Ep();XE();sA();rn();xp();kR();Ua();Ws();PA();Gp=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),V4=e=>{if(!qp.default.existsSync(e))return null;try{let t=JSON.parse(qp.default.readFileSync(e,"utf8"));if(Gp(t)&&t.version===1)return t}catch{return null}return null},qa=e=>{let t=[...new Set(e.setSlugs.map(A=>A.trim()).filter(A=>A.length>0))],r=Ye(e.projectFolderPath),o=br(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=qp.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Ge({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Ts(s.layout),d=Xt(o).filter(A=>!t.includes(A)),u=Cs(i),m=0;if(d.length>0){let A=Wp({repoRoot:o,setSlugs:d,ledger:u});u=A.ledger,m=A.summary.removedPaths.length}if(t.length===0)return Ha(i,u),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let S=V4(e.layout.harnessManifestPath);if(S===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=Gp(S.sets)?S.sets:{},y=0,p=0,b=0;for(let A of t){let f=h[A];if(!Gp(f))return{ok:!1,errorMessage:`Harness set "${A}" is not installed locally.`};let P=typeof f.version=="number"?String(f.version):"1",_=kp(A),k=Array.isArray(f.items)?f.items:[];for(let C of k){if(!Gp(C))continue;let L=typeof C.path=="string"?C.path.trim():"";if(L.length===0)continue;let R=bA(L);if(R===null)continue;let I=YE(A,R),N=TR.default.posix.join(".cursor",I).replaceAll("\\","/"),U=typeof C.id=="string"?C.id.trim():"",G=vR({layout:e.layout,setSlug:A,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:L,manifestItemId:U});if(G===null)continue;let q=VE({repoRoot:o,backupsDir:a,repoRelativeDestination:N,sourceAbsolutePath:G,componentId:_,versionId:P,ledger:u});if(q.kind==="skipped_unchanged"){p+=1;continue}if(q.kind==="backed_up_user_file"){b+=1,y+=1,u={version:1,entries:{...u.entries,[N]:QS({componentId:_,versionId:P,sourceAbsolutePath:G,backupPath:q.backupPath})}};continue}y+=1,u={version:1,entries:{...u.entries,[N]:QS({componentId:_,versionId:P,sourceAbsolutePath:G})}}}}return y===0&&p===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(Ha(i,u),{ok:!0,writtenFileCount:y,skippedFileCount:p,backedUpFileCount:b,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var LR,Vp,K4,J4,Y4,X4,Z4,Q4,e8,t8,r8,Va,Kp=l(()=>{"use strict";LR=g(require("node:crypto")),Vp=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},K4=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},J4=(e,t)=>{let r=K4(t),o=Vp(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},Y4=(e,t,r)=>{let o=J4(t,r);return`shared/items/${e}/${o}`},X4=["rules","skills","commands","instructions","agents"],Z4=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),Q4=(e,t)=>[...e.filter(o=>o.id!==t.id),t],e8=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},t8=e=>LR.default.createHash("sha256").update(e,"utf8").digest("hex"),r8=e=>({id:e.id,kind:e.kind,title:e.title,path:Y4(e.id,e.kind,e.title),contentSha256:t8(e.content)}),Va=e=>{let t=new Date().toISOString(),r=e.existingManifest??Z4(e.hostname,t),o=Vp(e.bundle.slug),n=e8(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...X4.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,u)=>{let m=r8(u);return{files:[...d.files,{relativePath:m.path,content:u.content}],nextItems:Q4(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var io,WR,Jp,o8,sn,_A=l(()=>{"use strict";io=g(require("node:fs")),WR=g(require("node:os")),Jp=g(require("node:path"));Kp();o8=e=>{if(!io.default.existsSync(e))return null;try{let t=JSON.parse(io.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},sn=e=>{try{let t=o8(e.layout.harnessManifestPath),r=Va({bundle:e.bundle,hostname:WR.default.hostname(),existingManifest:t});io.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)io.default.mkdirSync(Jp.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Jp.default.join(e.layout.harnessRootDir,o.relativePath);io.default.mkdirSync(Jp.default.dirname(n),{recursive:!0}),io.default.writeFileSync(n,o.content)}return io.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var vA,ER=l(()=>{"use strict";_A();wA();vA=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=sn({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return qa({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var RR,xR=l(()=>{"use strict";RR=["rule","skill","command","instruction","agent"]});var IR,n8,s8,Zt,kA=l(()=>{"use strict";xR();IR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),n8=e=>typeof e=="string"&&RR.includes(e),s8=e=>{if(!IR(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!n8(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Zt=e=>{if(!IR(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=s8(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var OR,i8,CA,MR=l(()=>{"use strict";OR=require("node:zlib");kA();i8="x-agent-witch-token",CA=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[i8]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,OR.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=Zt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var LA,TA,Qt,NR=l(()=>{"use strict";LA=g(require("node:fs")),TA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qt=e=>{if(!LA.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(LA.default.readFileSync(e.harnessManifestPath,"utf8"));if(!TA(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=TA(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!TA(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",u=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:u.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Yp,zR=l(()=>{"use strict";Yp=()=>"~"});var DR,jR,$R=l(()=>{"use strict";DR=require("node:crypto"),jR=e=>`local-${(0,DR.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var WA,HR=l(()=>{"use strict";WA=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Ka,Xp,EA=l(()=>{"use strict";Ka=g(require("node:path")),Xp=e=>{let t=Ka.default.dirname(e),r=Ka.default.basename(t);return r==="agents"?Ka.default.basename(Ka.default.dirname(t)):r}});var Ja,Pr,FR,a8,l8,c8,Zp,UR,RA=l(()=>{"use strict";Ja=g(require("node:fs")),Pr=g(require("node:path"));$R();HR();EA();FR=new Set(["node_modules",".git","dist","build",".next","coverage"]),a8=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},l8=(e,t)=>{let r=Pr.default.basename(t);if(e==="skill"){let o=t.split(Pr.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},c8=e=>{let t=[],r=(n,s)=>{let i;try{i=Ja.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&FR.has(a.name))continue;let c=Pr.default.join(n,a.name),d=s?Pr.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;WA(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=Pr.default.join(e,n);Ja.default.existsSync(s)&&r(s,n)}let o=Pr.default.join(e,"skills");return Ja.default.existsSync(o)&&r(o,"skills"),t},Zp=e=>{let t=c8(e);if(t.length===0)return null;let r=Pr.default.dirname(e),o=Xp(e),n=a8(o),s=t.map(i=>{let a=WA(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:jR(i.absolutePath),kind:a,title:l8(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},UR=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Ja.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||FR.has(a.name))continue;let c=Pr.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var BR,xA,d8,IA,GR=l(()=>{"use strict";BR=g(require("node:fs")),xA=g(require("node:path"));RA();Ws();d8=e=>{let t=br(e.trim());if(t===null)return null;if(xA.default.basename(t)===".cursor")return t;let r=xA.default.join(t,".cursor");try{if(BR.default.statSync(r).isDirectory())return br(r)}catch{return null}return null},IA=e=>{let t=d8(e.projectPath);if(t===null)return null;let r=Zp(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var qR,u8,Qp,OA,VR=l(()=>{"use strict";qR=g(require("node:path"));RA();Ws();EA();u8=5,Qp=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},OA=e=>{let t=br(e.scanRoot.trim());if(t===null)return Qp(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of UR(t,u8,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=br(s);if(i===null)continue;let a=Xp(i);Qp(e.response,"folder",{cursorDir:i,groupName:a,repoPath:qR.default.dirname(i)});let c=Zp(i);c!==null&&(r.push(c),Qp(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Qp(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var KR,JR,YR=l(()=>{"use strict";KR=g(require("node:path")),JR=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:KR.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var qe,XR,MA,p8,NA,zA,em,DA,Ya,ZR=l(()=>{"use strict";qe=g(require("node:fs")),XR=g(require("node:os")),MA=g(require("node:path"));Kp();gA();Ws();YR();p8=e=>{if(!qe.default.existsSync(e))return null;try{let t=JSON.parse(qe.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},NA=e=>{let t=e.hostname??XR.default.hostname(),r=p8(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(u=>u.include);if(a.length===0)continue;let c=[];for(let u of a){let m=Ga(u.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let S=qe.default.readFileSync(m,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:S,setSlugs:[i.slug]})}let d=Va({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)n.add(u);for(let u of d.files)s.push(u),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{qe.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)qe.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=MA.default.join(e.layout.harnessRootDir,i.relativePath);qe.default.mkdirSync(MA.default.dirname(a),{recursive:!0}),qe.default.writeFileSync(a,i.content)}qe.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(u=>u.include))continue;let c=Vp(i.slug),d=r.sets[c];d!==void 0&&Hp({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},zA="reveal-cache.json",em=(e,t)=>{qe.default.mkdirSync(e.harnessRootDir,{recursive:!0}),qe.default.writeFileSync(`${e.harnessRootDir}/${zA}`,`${JSON.stringify(t,null,2)}
`)},DA=e=>{let t=`${e.harnessRootDir}/${zA}`;qe.default.existsSync(t)&&qe.default.unlinkSync(t)},Ya=e=>{let t=`${e.harnessRootDir}/${zA}`;if(!qe.default.existsSync(t))return null;try{let r=JSON.parse(qe.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return JR(r)}catch{return null}return null}});var ao=l(()=>{"use strict";wA();ER();PA();_A();MR();kA();Kp();NR();zR();GR();Ws();VR();ZR()});var jA,QR=l(()=>{"use strict";ao();ze();jA=e=>{let t=M(e.profileEmail);return sn({bundle:e.bundle,layout:t})}});var ex=l(()=>{"use strict";QR();ao()});var m8,tx,g8,rx,an,tm,ox=l(()=>{"use strict";m8=["agentwitch.com","www.agentwitch.com"],tx=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,g8=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},rx=e=>{let t=g8(e);return!!(m8.includes(t)||tx.test(e.trim().toLowerCase()))},an=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return rx(r)?tx.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},tm=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:an(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Xa=l(()=>{"use strict";ox()});var wr,Za=l(()=>{"use strict";wr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Qa,nx=l(()=>{"use strict";ex();Xa();Za();Qa=e=>{if(!wr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Zt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!an(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=jA({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var $A=l(()=>{"use strict";nx()});var f8,Es,HA=l(()=>{"use strict";f8=e=>e==="hourly"||e==="daily"||e==="weekdays",Es=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!f8(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var el,rm,sx,ix,FA,Wt,om,nm,sm,im,am=l(()=>{"use strict";el=g(require("node:fs")),rm=g(require("node:path"));HA();sx="automations.json",ix=e=>e.profileEmail!==null?rm.default.join(e.installDir,"profiles",e.profileEmail,sx):rm.default.join(e.installDir,sx),FA=()=>({version:1,automations:[]}),Wt=e=>{let t=ix(e);if(!el.default.existsSync(t))return FA();try{let r=JSON.parse(el.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?FA():{version:1,automations:r.automations.flatMap(n=>{let s=Es(n);return s!==null?[s]:[]})}}catch{return FA()}},om=(e,t)=>{let r=ix(e);el.default.mkdirSync(rm.default.dirname(r),{recursive:!0}),el.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},nm=(e,t)=>{om(e,{version:1,automations:t})},sm=(e,t)=>{let o=Wt(e).automations.filter(n=>n.id!==t.id);om(e,{version:1,automations:[...o,t]})},im=(e,t)=>Wt(e).automations.find(r=>r.id===t)??null});var $e,_r=l(()=>{"use strict";$e="x-agent-witch-token"});var UA=l(()=>{"use strict";Xu();Qu()});var X,ln,BA,tl,GA,h8,qA,rl,cn,VA,Rs=l(()=>{"use strict";_r();UA();X=e=>{let t=Le(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},ln=e=>({[$e]:e,"Content-Type":"application/json"}),BA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:ln(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},tl=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:ln(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},GA=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:ln(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},h8=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},qA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:ln(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},rl=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:ln(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return h8(r)}catch{return null}},cn=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:ln(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},VA=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:ln(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var dn,ax,lx,y8,KA,cx,JA=l(()=>{"use strict";dn=g(require("node:fs")),ax=g(require("node:path")),lx=e=>ax.default.join(e.harnessRootDir,"projects-registry.json"),y8=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),KA=e=>{let t=lx(e);if(!dn.default.existsSync(t))return[];try{let r=JSON.parse(dn.default.readFileSync(t,"utf8"));return y8(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},cx=e=>{let t=lx(e);if(!dn.default.existsSync(t))return;let r=`${t}.migrated`;if(dn.default.existsSync(r)){dn.default.unlinkSync(t);return}dn.default.renameSync(t,r)}});var dx,S8,A8,ux,px=l(()=>{"use strict";rn();dx=e=>Ye(e),S8=e=>new Set(e.map(t=>dx(t.folderPath))),A8=e=>new Set(e.map(t=>t.id)),ux=(e,t)=>{let r=S8(t),o=A8(t),n=[],s=new Set;for(let i of e){let a=dx(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var YA,XA=l(()=>{"use strict";Rs();JA();px();YA=async(e,t)=>{let r=KA(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=X({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await rl(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=ux(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await qA(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&cx(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var ZA,vr,ol=l(()=>{"use strict";ZA=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),vr=(e,t)=>e.find(r=>r.id===t)??null});var lo,nl=l(()=>{"use strict";Rs();XA();ol();lo=async(e,t)=>{t!==void 0&&await YA(t,e);let r=X({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await rl(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=ZA(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var mx=l(()=>{"use strict"});var b8,P8,lm,QA=l(()=>{"use strict";b8="Default",P8=e=>e.trim().toLowerCase()===b8.toLowerCase(),lm=P8});var te,gx,w8,_8,v8,k8,C8,co,cm=l(()=>{"use strict";QA();te=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gx=(e,t)=>e.length===0?`<p class="empty">${te(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${te(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${te(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,w8=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,_8=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from Agent Witch Cloud.":"This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${te(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},v8=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
        <p><strong>${te(r)}</strong> <span class="muted">already in this repo</span></p>
        <form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove ledgered files for this set from the repo? The Mac profile harness stays.');">
          <input type="hidden" name="projectId" value="${te(e.project.id)}" />
          <input type="hidden" name="setSlug" value="${te(r)}" />
          <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
        </form>
      </li>`).join("")}</ul>`;return e.boundHarnessCount>0?`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">Playbook files are already materialized under this folder\u2019s <code>.cursor</code> tree. The Mac profile harness is empty \u2014 refresh from Agent Witch Cloud only if you need an update.</p>
        ${t}
        <form method="POST" action="/projects/pull-bound-harness" class="actions">
          <input type="hidden" name="projectId" value="${te(e.project.id)}" />
          <button class="btn btn-secondary" type="submit">Refresh in repo\u2026</button>
        </form>
      </div>`:`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">Playbook files are already materialized under this folder\u2019s <code>.cursor</code> tree. Open Harness to install sets on this Mac if you want to change them.</p>
        ${t}
        <div class="actions">
          <a class="btn btn-secondary" href="/harness">Open Harness</a>
        </div>
      </div>`},k8=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?v8({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?_8({project:e.project,alreadyInRepo:!1}):w8();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These sets are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh from the Mac harness only if you need an update. Use Remove from repo on a set to delete only the files that ledger recorded.":"Check the sets to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",a=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),u=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove ledgered files for this set from the repo? The Mac profile harness stays.');">
            <input type="hidden" name="projectId" value="${te(e.project.id)}" />
            <input type="hidden" name="setSlug" value="${te(c.slug)}" />
            <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
          </form>`:"";return`<li class="harness-installed-set">
          <label class="check-row">
            <input form="link-harness-form" type="checkbox" name="applySet" value="${te(c.slug)}"${t.size===0||d?" checked":""} />
            <span><strong>${te(c.name)}</strong> <span class="muted mono">(${te(c.slug)})</span></span>
          </label>
          <p class="muted">${c.itemCount} item(s)${d?' \xB7 <span class="muted">in repo</span>':""}</p>
          ${u}
        </li>`}).join("")}</ul>`;return`<div class="stack">
        <form id="link-harness-form" method="POST" action="/projects/link-harness">
          <input type="hidden" name="projectId" value="${te(e.project.id)}" />
          <p class="field-label">Installed</p>
          <p class="lede">${n}</p>
        </form>
        ${a}
        <div class="actions">
          <button form="link-harness-form" class="${i}" type="submit">${s}</button>
        </div>
      </div>`},C8=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${te(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${te(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},co=e=>{let t=e.flashError?`<div class="alert-error">${te(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${te(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(u,m)=>`<a class="project-tab${e.activeTab===u?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${u}">${te(m)}</a>`,n=e.composition?.items.filter(u=>u.kind==="workflow")??[],s=e.composition?.items.filter(u=>u.kind==="agent")??[],i="";e.activeTab==="harness"?i=k8({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=gx(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=gx(s,"No agents installed for this project yet."):i=C8({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});let a=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}?rename=1`,c=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${te(a)}" target="_blank" rel="noopener noreferrer">Rename in Agent Witch Cloud\u2026</a>
    </div>`,d=lm(e.project.name)?"":`<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from Agent Witch Cloud only. The folder on this Mac is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from Agent Witch Cloud? Your repo folder on this Mac will stay.');">
          <input type="hidden" name="projectId" value="${te(e.project.id)}" />
          <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
      </section>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${te(e.project.name)}</h1>
      <p class="muted mono">${te(e.project.projectFolderPath)}</p>
      ${c}
      <div class="actions"><a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(e.project.id)}">Change folder\u2026</a></div>
      <nav class="project-tabs" aria-label="Project composition">
        ${o("harness",`Harness (${r.harness})`)}
        ${o("workflows",`Workflows (${r.workflow})`)}
        ${o("agents",`Agents (${r.agent})`)}
        ${o("knowledge",`Knowledge (${e.knowledgeCandidateCount})`)}
      </nav>
      <div class="project-tab-panel">
        ${i}
      </div>
    </section>${d}`}});var T8,L8,fx,hx=l(()=>{"use strict";ao();_r();T8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),L8=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!T8(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Zt(n);return s===null?[]:[s]})}catch{return null}},fx=L8});var yx,eb,Sx=l(()=>{"use strict";le();ao();cm();nl();hx();ol();Ua();Rs();gt();yx=e=>({kind:"page",title:e.project.name,body:co({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Qt(e.layout),linkedSetSlugs:Xt(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),eb=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let o=await lo(r,e.layout),n=vr(o.projects,t);if(n===null)return{kind:"not_found"};let s=X({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??it,a=s===null?null:await fx(s,n.id);if(a===null)return yx({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=vA({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return yx({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await cn(s,n.id,c.appliedSetSlugs),u=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${u.toString()}`}}});var Ax,tb,bx=l(()=>{"use strict";le();ao();gt();Rs();cm();xp();rn();nl();ol();Ua();Tp();tA();Ep();sA();Ax=e=>({kind:"page",title:e.project.name,body:co({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Qt(e.layout),linkedSetSlugs:Xt(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),tb=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=$();if(n===null)return{kind:"not_found"};let s=await lo(n,e.layout),i=vr(s.projects,r);if(i===null)return{kind:"not_found"};let a=X({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=a?.appOrigin??it;if(o.length===0)return Ax({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=Ye(i.projectFolderPath),u=Ge({projectFolderPath:d}),{ledgerFilePath:m}=Ts(u.layout),S=Cs(m),h=SA(S);if(!h.includes(o))return Ax({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let y=h.filter(f=>f!==o),p=Wp({repoRoot:u.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:S});Ha(m,p.ledger);let b=a===null?!1:await cn(a,i.id,y),A=new URLSearchParams({linked:"1",removed:o,files:String(p.summary.removedPaths.length),bindingsSynced:b?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${A.toString()}`}}});var W8,rb,Px=l(()=>{"use strict";W8=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,rb=W8});var wx=l(()=>{"use strict"});var _x=l(()=>{"use strict"});var vx=l(()=>{"use strict";wx();_x()});var E8,uo,kx=l(()=>{"use strict";E8=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],uo=(e=process.env)=>{let t={...e};for(let r of E8)delete t[r];return t}});var Cx=l(()=>{"use strict";kx()});var ob,Tx=l(()=>{"use strict";ob={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var nb=l(()=>{"use strict";Tx()});var dm,sb=l(()=>{"use strict";dm={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var um=l(()=>{"use strict";vx();Cx();gt();nb();sb()});var Lx,Wx,R8,pm,mm,Ex=l(()=>{"use strict";Lx=require("node:child_process"),Wx=require("node:util");um();R8=(0,Wx.promisify)(Lx.execFile),pm=async(e,t)=>{try{let{stdout:r}=await R8("git",t,{cwd:e,env:uo(),maxBuffer:1048576});return r.trim()}catch{return null}},mm=async e=>{let t=await pm(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await pm(e,["rev-parse","--abbrev-ref","HEAD"]),o=await pm(e,["status","--porcelain"]),n=await pm(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var ib,Rx=l(()=>{"use strict";ib=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var x8,ab,xx=l(()=>{"use strict";x8=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},ab=x8});var I8,lb,Ix=l(()=>{"use strict";_r();I8=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[$e]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},lb=I8});var Ox,po,Mx=l(()=>{"use strict";Ox=require("node:child_process"),po=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,Ox.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var Nx=l(()=>{"use strict";nl()});var sl,zx=l(()=>{"use strict";_r();sl=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[$e]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var cb,Dx=l(()=>{"use strict";_r();cb=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var er=l(()=>{"use strict";nl();ol();mx();rn();xp();Sx();bx();Ua();Px();Ex();Rx();xx();Ix();Mx();Nx();zx();Dx();XA();JA();Rs()});var gm,il,jx,db,un,ub=l(()=>{"use strict";gm=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},il=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=gm(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},jx=e=>e>=1&&e<=5,db=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return gm(t,"UTC")},un=e=>{let t=e.from??new Date,r=gm(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return il(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=il(r,e.timeZone,o,0),s=gm(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?il(db(r),e.timeZone,o,0):n;if(!i&&jx(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=db(a),jx(a.weekday))return il(a,e.timeZone,o,0);return il(db(r),e.timeZone,o,0)}});var $x,pb,kr,mb=l(()=>{"use strict";$x=require("node:crypto");le();er();ub();am();pb=!1,kr=async e=>{if(pb)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=X({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=im(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};pb=!0;let n=(0,$x.randomUUID)();try{let s=await _s(t,"claude-cli",o.prompt);await VA(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=un({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return sm(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{pb=!1}}});var fm,Hx=l(()=>{"use strict";le();mb();am();fm=async()=>{let e=$();if(e===null)return;let t=Wt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await kr(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var al=l(()=>{"use strict";am();Hx();mb();ub()});var Fx=l(()=>{"use strict";al()});var Ux=l(()=>{"use strict";HA()});var Bx=l(()=>{"use strict";Ux()});var gb=l(()=>{"use strict";al()});var O8,M8,ll,fb=l(()=>{"use strict";Fx();Bx();gb();ze();O8=e=>e!==void 0&&e.trim().length>0?M(e.trim()):M(),M8=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??un({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??un({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},ll=e=>{let t=O8(e.profileEmail),r=Wt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Es(s);return i!==null?[M8(i,o.get(i.id))]:[]});return nm(t,n),{ok:!0,writtenCount:n.length}}});var hb=l(()=>{"use strict";al()});var Gx=l(()=>{"use strict";le()});var qx=l(()=>{"use strict";fb();hb();gb();Gx()});var Vx,cl,dl,ul,Kx=l(()=>{"use strict";Vx=g(require("node:os"));qx();Xa();Za();cl=e=>{if(!wr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!an(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=ll({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},dl=async e=>{if(!wr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:an(t)?kr(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},ul=()=>{let e=$(),t=e!==null?Wt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:Vx.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var yb=l(()=>{"use strict";Kx()});var hm=l(()=>{"use strict";se()});var ym=l(()=>{"use strict";se()});var Sm,Yx,Xx,Jx,N8,z8,xs,Sb=l(()=>{"use strict";Sm=g(require("node:fs")),Yx=g(require("node:os")),Xx=g(require("node:path"));hm();ym();Na();ze();Jx=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},N8=e=>Xx.default.join(Yx.default.homedir(),"Library","LaunchAgents",`${e}.plist`),z8=async e=>Sm.default.existsSync(N8(e))?(await Ne(e)).ok:!1,xs=async(e=T())=>{let t=Sm.default.existsSync(_p(e)),r=!Sm.default.existsSync(gr(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Ma(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await Jx(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${Te(e)}-wake`;await z8(i)&&s.push(i);for(let c of ne(e))(await Ne(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await Jx(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var Zx=l(()=>{"use strict";se()});var Ab=l(()=>{"use strict";Xo();se()});var bb=l(()=>{"use strict";Xo()});var Pb=l(()=>{"use strict";se()});var e0,Qx,pl,wb=l(()=>{"use strict";e0=g(require("node:fs"));gt();hm();ym();ze();Qx=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},pl=async(e=T())=>{if(!e0.default.existsSync(gr(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await Qx())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of ne(e))(await Ne(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await Qx();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var t0=l(()=>{"use strict";se()});var r0,pn,_b,D8,j8,$8,o0,H8,n0,Is,Am=l(()=>{"use strict";r0=require("node:crypto"),pn=g(require("node:fs")),_b=g(require("node:path"));ze();D8="watchdog-log.ndjson",j8=200,$8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),o0=(e=T())=>{let t=M(),r=t.installDir===e?t.logsDir:ns({installDir:e,profileEmail:t.profileEmail});return _b.default.join(r,D8)},H8=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!$8(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},n0=(e,t=T())=>{let r={id:(0,r0.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=o0(t);pn.default.mkdirSync(_b.default.dirname(o),{recursive:!0});let n=pn.default.existsSync(o)?pn.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-j8+1)),JSON.stringify(r)];return pn.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Is=(e=20,t=T())=>{let r=o0(t);if(!pn.default.existsSync(r))return[];let o=pn.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=H8(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var vb,kb,Cb,Tb=l(()=>{"use strict";Me();vb=Eo.watchdogReinstallState,kb=900*1e3,Cb=3e3});var s0=l(()=>{"use strict";Tb()});var i0={};Ut(i0,{verifyAgentWitchReviveAfterKickstart:()=>U8});var F8,U8,a0=l(()=>{"use strict";s0();bb();Pb();ze();F8=e=>new Promise(t=>{setTimeout(t,e)}),U8=async e=>{if(await F8(e.verifyDelayMs??Cb),!await No(e.launchAgentLabel))return!1;let r=e.profileEmail===null?M():M(e.profileEmail),o=he(r);return!We(o,e.staleAfterMs)}});var ml,Lb,B8,l0,c0,Wb,Eb,Rb=l(()=>{"use strict";ml=g(require("node:fs")),Lb=g(require("node:path"));J();Tb();B8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),l0=e=>Lb.default.join(e,vb),c0=(e=T())=>{let t=l0(e);if(!ml.default.existsSync(t))return null;try{let r=JSON.parse(ml.default.readFileSync(t,"utf8"));return!B8(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},Wb=(e=T(),t=Date.now())=>{let r=c0(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=kb:!0},Eb=(e=T(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=l0(e);return ml.default.mkdirSync(Lb.default.dirname(o),{recursive:!0}),ml.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var xb,d0=l(()=>{"use strict";se();Rb();xb=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!Wb())return{attempted:!1,ok:!1,targets:e};Eb();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Ne(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var u0=l(()=>{"use strict";Rb();d0()});var Ib=l(()=>{"use strict";Kt()});var p0=l(()=>{"use strict";Kt()});var m0,Os,g0,f0,h0,G8,q8,y0,V8,K8,S0,A0=l(()=>{"use strict";m0=require("node:child_process"),Os=g(require("node:fs")),g0=g(require("node:os")),f0=g(require("node:path")),h0=require("node:util");Ib();p0();ze();G8=(0,h0.promisify)(m0.execFile),q8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),y0=e=>{let t=Be(e),r=t===null?M():M(t);if(!Os.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Os.default.readFileSync(r.configPath,"utf8"));return!q8(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},V8=e=>y0(e)?.wsUrl??null,K8=e=>{let t=V8(e);return t!==null?Le(t):De(e)?.appOrigin??null},S0=async e=>{let t=e?.installDir??T(),r=y0(t),o=r!==null?Le(r.wsUrl):K8(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=f0.default.join(g0.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Os.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??Be(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await G8("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Os.default.existsSync(i)&&Os.default.unlinkSync(i)}}});var b0={};Ut(b0,{attemptAgentWitchWatchdogReinstall:()=>J8});var J8,P0=l(()=>{"use strict";u0();A0();J8=async e=>xb(e,()=>S0())});var w0,_0,v0,Y8,X8,Z8,gl,Ob=l(()=>{"use strict";Zx();Ab();bb();Pb();wb();Sb();hm();ym();ze();us();t0();Am();w0=e=>e===null?M():M(e),_0=async(e,t,r)=>{if(!await No(e))return"not_running";let n=w0(t);if(Ct(n))return"healthy";let s=he(n);return We(s,r)?"stale_connection":"healthy"},v0=async e=>{let t=e?.staleAfterMs??12e4,r=T(),o=ne(r);return Promise.all(o.map(async n=>{let s=await _0(n.launchAgentLabel,n.profileEmail,t),i=w0(n.profileEmail),a=he(i),c=await No(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:We(a,t),needsRevive:s!=="healthy",reason:s}}))},Y8=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},X8=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",Z8=async e=>{let t=await Ne(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(a0(),i0)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},gl=async e=>{if(!kt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=T();await xs(r),await pl(r);let o=ne(r),n=[];for(let u of o){let m=await _0(u.launchAgentLabel,u.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:m});continue}n.push(await Z8({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let u=Mo();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(P0(),b0)),m=await u(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(u){s=!0,i=!1,a=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&n0({event:X8(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:Y8(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var k0,bm,C0=l(()=>{"use strict";k0=g(require("node:os"));Ab();Am();Ob();bm=async()=>{let e=await v0(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:k0.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Is(1)[0]??null}}});var Mb=l(()=>{"use strict";Sb();Ob();C0();Am()});var fl,hl,yl,T0=l(()=>{"use strict";se();Mb();fl=async()=>{await xs();let e=ne(),t=[];for(let r of e){let o=await Ne(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Mo();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},hl=gl,yl=gl});var Nb=l(()=>{"use strict";T0()});var wm,Pm,L0,zb,W0,Q8,e3,t3,r3,o3,_m,E0=l(()=>{"use strict";wm=require("node:child_process"),Pm=g(require("node:fs")),L0=g(require("node:os")),zb=g(require("node:path")),W0=require("node:util");se();J();Q8=(0,W0.promisify)(wm.execFile),e3=()=>zb.default.join(L0.default.homedir(),"Library","LaunchAgents"),t3=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await Q8("launchctl",["bootout",r]).catch(()=>{})},r3=e=>{let t=zb.default.join(e3(),`${e}.plist`);Pm.default.existsSync(t)&&Pm.default.unlinkSync(t)},o3=e=>{(0,wm.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},_m=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=T();if(!Pm.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=fr(e);for(let r of t)await t3(r),r3(r);return o3(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var R0,vm,x0,Ms,I0,n3,s3,i3,Db,a3,jb,O0=l(()=>{"use strict";R0=require("node:child_process"),vm=g(require("node:fs")),x0=g(require("node:os")),Ms=g(require("node:path")),I0=require("node:util");se();n3=(0,I0.promisify)(R0.execFile),s3=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],i3=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],Db=e=>{vm.default.existsSync(e)&&vm.default.rmSync(e,{force:!0})},a3=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await n3("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},jb=async e=>{let r=(e.listLaunchAgentLabels??fr)(e.layout.installDir),o=e.launchAgentsDir??Ms.default.join(x0.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??a3;for(let i of r)await n(i),Db(Ms.default.join(o,`${i}.plist`));let s=Ms.default.dirname(e.layout.configPath);for(let i of s3)Db(Ms.default.join(s,i));for(let i of i3)Db(Ms.default.join(e.layout.installDir,i));return vm.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var $b,M0=l(()=>{"use strict";$b="unknown_identity"});var Hb=l(()=>{"use strict";sb();M0()});var l3,Fb,N0=l(()=>{"use strict";Hb();l3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Fb=e=>e.type!=="system.error"||!l3(e.payload)?!1:e.payload.errorCode===$b});var Ub=l(()=>{"use strict";E0();O0();N0()});var km=l(()=>{"use strict";se();Kt();Ub();Mb()});var Ns,Cm,Tm=l(()=>{"use strict";km();Ns=(e=20)=>Is(e),Cm=bm});var Lm,zs,Wm,Em=l(()=>{"use strict";km();Lm=Jo,zs=(e=20)=>qo(e),Wm=e=>Ko(e)});var Rm,Bb=l(()=>{"use strict";km();Rm=()=>_m()});var z0=l(()=>{"use strict";ZS();$A();yb();Nb();Tm();Em();Bb()});var D0={};Ut(D0,{buildAgentWitchAutomationStatusFromWakeServer:()=>ul,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Lm,buildAgentWitchWakeHealthResponse:()=>Da,buildAgentWitchWakeIdentityResponse:()=>ja,buildAgentWitchWatchdogStatus:()=>Cm,installHarnessFromWakeServer:()=>Qa,readAgentWitchSelfUpdateLogEntries:()=>zs,readAgentWitchWatchdogLogEntries:()=>Ns,restartAgentWitchFromWakeServer:()=>yl,reviveAgentWitchWebSocketFromWakeServer:()=>hl,runAgentWitchSelfUpdateFromWakeServer:()=>Wm,runAgentWitchUninstallLocalFromWakeServer:()=>Rm,runAutomationFromWakeServer:()=>dl,syncAutomationsFromWakeServer:()=>cl,wakeAgentWitchLaunchAgents:()=>fl});var j0=l(()=>{"use strict";z0()});var $0,H0,Gb,qb,F0=l(()=>{"use strict";$0=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),H0=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?$0(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?$0(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},Gb=e=>{let t=e.watchdogLogs.map(H0).join(""),r=e.updateLogs.map(H0).join("");return`<!doctype html>
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
</html>`},qb=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var U0,B0,G0=l(()=>{"use strict";U0=g(require("node:net")),B0=()=>new Promise((e,t)=>{let r=U0.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var q0,c3,Vb,V0=l(()=>{"use strict";q0=g(require("node:net"));G0();za();Na();ze();c3=e=>new Promise(t=>{let r=q0.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Vb=async()=>{let e=T(),t=Lt();if(await c3(t))return DE(t),t;let r=await B0();return vp(e,r),r}});var d3,Kb,K0=l(()=>{"use strict";d3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Kb=e=>({force:d3(e)&&e.force===!0})});var Sl=l(()=>{"use strict";Xa();F0();V0();K0();xy();Gu();Fo()});var Jb,j,Yb,Xb,Al,J0=l(()=>{"use strict";Jb=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},Yb=e=>{e.writeHead(403),e.end()},Xb=e=>e.url?.split("?")[0]??"/",Al=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var Et=l(()=>{"use strict";J0()});var u3,Y0,X0=l(()=>{"use strict";yb();Et();u3=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},Y0=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,ul(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await u3(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=cl(t);return j(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await dl(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var p3,Q0,Z0,eI,Zb,tI,Qb=l(()=>{"use strict";p3=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],Q0=e=>/embed|minilm|^bge-/i.test(e),Z0=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),eI=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),Zb=e=>e.filter(t=>t.trim().length>0&&!Q0(t)),tI=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!Q0(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>Z0(s,o));if(n!==void 0)return n}for(let n of p3){let s=r.find(i=>Z0(i,n));if(s!==void 0)return s}return r[0]??null}});var eP,nI,sI,xm,iI,rI,oI,m3,g3,f3,h3,y3,S3,Rt,bl=l(()=>{"use strict";eP=require("node:child_process"),nI=g(require("node:fs")),sI=g(require("node:os")),xm=g(require("node:path"));Kt();Tt();Qb();iI=3e3,rI=["claude-cli","codex","cursor","antigravity"],oI={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},m3=(e,t)=>new Promise(r=>{let o=(0,eP.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},iI);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),g3=()=>{let e=sI.default.homedir();return["ollama",xm.default.join(e,".local","bin","ollama"),xm.default.join(e,".agent-witch","ollama","ollama"),xm.default.join(e,".local-agent-witch","ollama","ollama")]},f3=e=>new Promise(t=>{let r=(0,eP.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},iI);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(eI(Buffer.concat(o).toString("utf8")))})}),h3=async()=>{for(let e of g3()){if(e!=="ollama"&&!nI.default.existsSync(e))continue;let t=await f3(e);if(t!==null)return t}return[]},y3=e=>{let t=e.installedWriterIds.map(s=>oI[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=ge(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${oI[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},S3=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:ps},Rt=async e=>{let t=rI.map(i=>{let a=cp(i,e.commands);return m3(a.command,a.args)}),[r,...o]=await Promise.all([h3(),...t]),n=rI.flatMap((i,a)=>o[a]===!0?[i]:[]),s=tI(r,S3());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:y3({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var A3,b3,tP,aI=l(()=>{"use strict";A3="http://127.0.0.1:11434",b3=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},tP=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||A3;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?b3(await o.json()):null}catch{return null}}});var rP=l(()=>{"use strict";Tt();bl();aI();Qb()});var P3,lI,cI=l(()=>{"use strict";rP();P3={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},lI=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:P3[t]})),ollamaModels:Zb(e.ollamaModels)})});var w3,dI,uI=l(()=>{"use strict";rP();Et();cI();w3=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},dI=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Rt({commands:fe({})});return j(e.response,200,{ok:!0,...lI({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await w3(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await tP({model:r,prompt:o});return n===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var _3,pI,mI=l(()=>{"use strict";$A();Et();_3=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},pI=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await _3(e);if(t===null)return!0;let r=Qa(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var gI=l(()=>{"use strict";er()});var oP,fI=l(()=>{"use strict";gI();Za();oP=e=>{if(!wr(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Ge({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var hI,nP,sP=l(()=>{"use strict";le();er();Za();hI=e=>{if(!wr(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},nP=async e=>{let t=hI(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=po("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=$();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=X({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Ge({projectFolderPath:r}),await sl(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var yI=l(()=>{"use strict";fI();sP()});var SI,AI=l(()=>{"use strict";yI();sP();Et();SI=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=oP(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await nP(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,o,r,e.cors.headers),!0}return!1}});var bI,PI=l(()=>{"use strict";Sl();Em();Tm();bI=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Ns(50),r=zs(50);return e.response.writeHead(200,qb()),e.response.end(Gb({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var wI,_I=l(()=>{"use strict";ZS();Et();wI=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,Da(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,ja(),e.cors.headers),!0):!1});var vI,kI=l(()=>{"use strict";Bb();Et();vI=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Rm();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var CI,TI=l(()=>{"use strict";Nb();Et();CI=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await hl();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await yl();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await fl();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var LI,WI=l(()=>{"use strict";Sl();Em();Et();LI=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Lm();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=Al(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:zs(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=Kb(t),o=await Wm({force:r});return j(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var EI,RI=l(()=>{"use strict";Tm();Et();EI=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await Cm();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=Al(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:Ns(t)},e.cors.headers),!0}return!1}});var xI,II=l(()=>{"use strict";X0();uI();mI();AI();PI();_I();kI();TI();WI();RI();xI=[wI,bI,EI,CI,LI,vI,pI,SI,Y0,dI]});var OI,MI=l(()=>{"use strict";II();OI=async e=>{for(let t of xI)if(await t(e))return!0;return!1}});var v3,NI,zI=l(()=>{"use strict";Xa();Et();MI();v3=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:Xb(e),readJsonBody:()=>Jb(e)}),NI=async(e,t,r)=>{let o=e.headers.origin,n=tm(o);try{if(o!==void 0&&o.length>0&&!n.allowed){Yb(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=v3(e,t,r,n);if(await OI(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var DI,mn,Im,Om=l(()=>{"use strict";DI=g(require("node:http"));Sl();zI();mn=async()=>{let e=await Vb(),t=DI.default.createServer((r,o)=>{NI(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Im=mn});var jI={};Ut(jI,{runAgentWitchBridgeCli:()=>k3});var k3,$I=l(()=>{"use strict";se();Om();k3=async()=>{nt("agent-witch-bridge");let e=await mn(),t=yr(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var HI=l(()=>{"use strict";gt()});var Ds,iP,FI=l(()=>{"use strict";Ds=(e,t,r)=>e===1?t:r,iP=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Ds(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Ds(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${Ds(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Ds(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Ds(d,"month","months")} ago`;let u=Math.floor(a/365);return`${u} ${Ds(u,"year","years")} ago`}});var gn,aP,C3,T3,lP,mo,Pl,cP,UI=l(()=>{"use strict";gn=g(require("node:fs")),aP=g(require("node:path")),C3="local-ws-traffic.ndjson",T3=500,lP=e=>aP.default.join(e.logsDir,C3),mo=(e,t)=>{let r=lP(e);gn.default.mkdirSync(aP.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});gn.default.appendFileSync(r,`${o}
`,"utf8")},Pl=(e,t=T3)=>{let r=lP(e);if(!gn.default.existsSync(r))return[];let n=gn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},cP=e=>{let t=lP(e);gn.default.existsSync(t)&&gn.default.writeFileSync(t,"","utf8")}});var L3,BI,GI,qI=l(()=>{"use strict";Hb();L3=new Set(Object.values(dm)),BI=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GI=e=>{if(!BI(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!L3.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!BI(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var VI,KI=l(()=>{"use strict";VI=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var W3,E3,R3,wl,JI=l(()=>{"use strict";KI();W3=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,E3=e=>W3.test(e),R3=e=>VI(e),wl=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>wl(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&E3(o)){r[o]=R3(n);continue}r[o]=wl(n)}return r}});var tr,dP,x3,I3,O3,uP,YI,XI,ZI,M3,Mm,fn,Nm,pP,QI=l(()=>{"use strict";tr=g(require("node:fs")),dP=g(require("node:path"));qI();JI();x3="local-ws-trace.ndjson",I3=1e4,O3=1440*60*1e3,uP=e=>dP.default.join(e.logsDir,x3),YI=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},XI=e=>{if(!tr.default.existsSync(e))return;let t=tr.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-O3,n=t.filter(s=>{let i=YI(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-I3);tr.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},ZI=(e,t)=>{let r=uP(e);tr.default.mkdirSync(dP.default.dirname(r),{recursive:!0}),tr.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),XI(r)},M3=e=>e.parsed===null?{_empty:!0}:wl(e.parsed),Mm=(e,t,r)=>{let o=GI(r);ZI(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:M3(o)})},fn=(e,t)=>{ZI(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:wl({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Nm=(e,t=80)=>{let r=uP(e);if(XI(r),!tr.default.existsSync(r))return[];let o=tr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=YI(s);i!==null&&n.push(i)}return n.reverse()},pP=e=>{let t=uP(e);tr.default.existsSync(t)&&tr.default.writeFileSync(t,"","utf8")}});var go,eO,N3,mP,zm,tO=l(()=>{"use strict";go=g(require("node:fs")),eO=g(require("node:path")),N3=256e3,mP=e=>{go.default.mkdirSync(eO.default.dirname(e),{recursive:!0}),go.default.writeFileSync(e,"","utf8")},zm=(e,t=N3)=>{if(!go.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=go.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=go.default.openSync(e,"r");try{go.default.readSync(a,i,0,s,n)}finally{go.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var _l=l(()=>{"use strict";UI();QI();tO()});var gP,fP,rO=l(()=>{"use strict";gP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fP=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${gP(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${gP(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${gP(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var oO=l(()=>{"use strict";rO()});var hP,yP=l(()=>{"use strict";hP=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var SP=l(()=>{"use strict";Aa()});var AP,bP,nO=l(()=>{"use strict";SP();AP=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},bP=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var sO=l(()=>{"use strict";yP();nO()});var iO,vl,PP,kl=l(()=>{"use strict";yP();iO=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vl=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=iO(e),r=iO(hP(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},PP=`(function () {
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
})();`});var hn,z3,wP,aO=l(()=>{"use strict";hn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),z3=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},wP=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${hn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?hn(r.direction):hn(r.kind),i=`trace-body-${o}`,a=hn(z3(r.body));return`<tr>
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
    </section>`});var cO,D3,lO,_P,dO=l(()=>{"use strict";Me();gt();cO=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},D3=e=>cO(e)===mr?Yn:Jn,lO=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_P=e=>{let t=D3(e.installDir),o=`AW_HOME="$HOME/${cO(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${lO(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${lO(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var uO=l(()=>{"use strict";kl();aO();dO();kl()});var j3,Cr,Cl=l(()=>{"use strict";j3=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Cr=j3});var pO,mO,gO,fO,hO,yO,SO,js=l(()=>{"use strict";pO="projects",mO="knowledge",gO="chunks.ndjson",fO="lessons.ndjson",hO="error-chunks.ndjson",yO="usage-stats.json",SO="knowledge-location.json"});var Dm,$3,jm,vP=l(()=>{"use strict";Dm=g(require("node:path"));js();$3=(e,t)=>{let r=t.trim(),o=Dm.default.join(e.installDir,pO,r,mO);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:Dm.default.join(o,gO),memoryRunsFilePath:Dm.default.join(o,fO)}},jm=$3});var kP,H3,AO,bO=l(()=>{"use strict";kP=g(require("node:fs"));js();nn();H3=e=>{let t=ft(e.projectFolderPath),r=`${t.metaDirPath}/${SO}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};kP.default.mkdirSync(t.metaDirPath,{recursive:!0}),kP.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},AO=H3});var $s,wO,PO,F3,_O,vO=l(()=>{"use strict";$s=g(require("node:fs")),wO=g(require("node:path"));$o();nn();vP();bO();PO=(e,t)=>{$s.default.existsSync(e)&&($s.default.existsSync(t)&&$s.default.statSync(t).size>0||($s.default.mkdirSync(wO.default.dirname(t),{recursive:!0}),$s.default.copyFileSync(e,t)))},F3=e=>{let t=ft(e.projectFolderPath),r=jm(e.layout,e.projectId),o=`${t.memoryDirPath}/${ss}`;PO(t.ragChunksFilePath,r.ragChunksFilePath),PO(o,r.memoryRunsFilePath),AO({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},_O=F3});var CP,U3,kO,CO=l(()=>{"use strict";CP=g(require("node:fs"));nn();U3=e=>{let t=ft(e);if(!CP.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(CP.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},kO=U3});var TO,B3,Hs,$m=l(()=>{"use strict";TO=g(require("node:path"));$o();nn();vO();CO();vP();B3=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=kO(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){_O({layout:e.layout,projectFolderPath:t,projectId:o});let s=jm(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=ft(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:TO.default.join(n.memoryDirPath,ss),projectId:null}},Hs=B3});var Hm,q3,Fm,TP=l(()=>{"use strict";Hm=g(require("node:fs"));js();q3=(e,t=500)=>{if(!Hm.default.existsSync(e))return;let r=Hm.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Hm.default.writeFileSync(e,`${o.join(`
`)}
`)},Fm=q3});var Um,V3,yn,LP=l(()=>{"use strict";Um=g(require("node:path"));js();$m();V3=e=>{let t=Hs(e);if(t===null)return null;let r=Um.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Um.default.join(r,yO),errorChunksFilePath:Um.default.join(r,hO)}},yn=V3});var WO,Tl,EO,LO,WP,RO,Y3,EP,xO,RP,xP,IP,OP=l(()=>{"use strict";WO=require("node:crypto"),Tl=g(require("node:fs")),EO=g(require("node:path"));Cl();js();LP();LO=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),WP=e=>{if(!Tl.default.existsSync(e))return LO();try{let t=JSON.parse(Tl.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return LO()},RO=(e,t)=>{Tl.default.mkdirSync(EO.default.dirname(e),{recursive:!0}),Tl.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Y3=e=>{let t=Cr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,WO.createHash)("sha256").update(o).digest("hex").slice(0,16)},EP=e=>{let t=yn(e);return t===null?null:WP(t.usageStatsFilePath)},xO=e=>{if(e.chunkIds.length===0)return;let t=yn(e);if(t===null)return;let r=WP(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;RO(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},RP=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=yn(e);if(r===null)return null;let o=Y3(t),n=WP(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return RO(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},xP=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,IP=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var Ll,IO,X3,Z3,OO,Q3,MP,Wl,Fs,NP,Us,zP,DP=l(()=>{"use strict";Ll=g(require("node:fs")),IO=g(require("node:path"));Cl();$m();TP();OP();X3="http://127.0.0.1:11434",Z3="nomic-embed-text",OO=(e,t,r)=>Hs({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,Q3=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},MP=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},Wl=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||X3,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||Z3;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},Fs=(e,t,r)=>{let o=OO(e,t,r);if(o===null||!Ll.default.existsSync(o))return[];let n=Ll.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},NP=async e=>{let t=Cr(e.text),r=MP(t);if(r.length===0)return 0;let o=OO(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;Ll.default.mkdirSync(IO.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await Wl(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};Ll.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return Fm(o),n},Us=async e=>{let t=await Wl(e.query);if(t===null)return[];let r=e.minScore??0,s=Fs(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:Q3(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return xO({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},zP=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var El,MO,e6,t6,jP,$P,HP,NO=l(()=>{"use strict";El=g(require("node:fs")),MO=g(require("node:path"));Cl();LP();TP();DP();e6=e=>{if(!El.default.existsSync(e))return[];let t=El.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},t6=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},jP=async e=>{let t=yn(e);if(t===null)return 0;let r=Cr(e.text),o=MP(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;El.default.mkdirSync(MO.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await Wl(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};El.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Fm(n,200),s},$P=async e=>{let t=yn(e);if(t===null)return[];let r=await Wl(e.query);if(r===null)return[];let o=e.minScore??.3;return e6(t.errorChunksFilePath).map(s=>({chunk:s,score:t6(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},HP=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var FP=l(()=>{"use strict";DP();OP();NO()});var be,UP,BP=l(()=>{"use strict";nb();be=ob,UP=`
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
`.trim()});var r6,o6,GP,zO,qP,DO=l(()=>{"use strict";BP();kl();r6=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,o6=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],GP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zO=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${r6}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,qP=e=>{let t=o6.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=GP(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=GP(e.installBundleVersionLabel?.trim()??"unknown"),s=zO("brand brand-in-sidebar",n),i=zO("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${GP(e.title)} \xB7 Agent Witch Local</title>
  <style>${UP}</style>
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
  <script>${PP}</script>
</body>
</html>`}});var Bm,Rl,Gm=l(()=>{"use strict";Bm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Rl=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Bm(e.syncMessage)}</p>`:"",o=Bm(e.manageHref),n=Bm(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Bm(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var VP,KP,JP,jO=l(()=>{"use strict";VP=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,KP=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,JP=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var $O=l(()=>{"use strict";DO();Gm();jO()});var Bs,YP,HO=l(()=>{"use strict";kl();Bs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),YP=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Bs(e.wakeError)}</div>`:"",a=vl(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
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
    </div>`}});var FO=l(()=>{"use strict";HO()});var W,Gs=l(()=>{"use strict";W=e=>e==="passed"||e==="stopped"||e==="failed"});var UO,XP,Sn,ZP,qm=l(()=>{"use strict";UO="Stopped at the round limit. The best prompt is kept.",XP="Stopped because the score stopped rising. The best prompt is kept.",Sn="Finished. The best prompt is the result.",ZP="Wizard ended. Progress from finished steps is kept."});var fo,QP=l(()=>{"use strict";fo=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var n6,s6,xl,BO,Vm=l(()=>{"use strict";n6=/\n+|;\s+/,s6=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,xl=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(n6).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,s6(s)]},[]);return[...t,...o]},[]),BO=e=>{let t=xl(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ce,qs=l(()=>{"use strict";ce=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Il,ew=l(()=>{"use strict";Vm();qs();Il=e=>{let t=[...e.priorRounds,e.current],r=ce(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:BO(o)}}});var tw,i6,a6,Km,rw=l(()=>{"use strict";tw={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},i6=e=>{try{let t=JSON.parse(e.fragment);return{...tw,objects:[...e.objects,t]}}catch{return{...tw,objects:e.objects}}},a6=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:i6(r)},Km=e=>[...e].reduce(a6,tw).objects});var l6,ow,c6,GO,nw=l(()=>{"use strict";rw();l6=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},ow=e=>{let t=Km(e).filter(l6),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},c6=(e,t)=>({...e,passed:e.score>=t}),GO=(e,t)=>{let r=ow(e);return r===null?null:c6(r,t)}});var sw,iw,Jm=l(()=>{"use strict";sw="The judge reply needs a score and a reason.",iw="The improver reply was empty."});var qO,VO=l(()=>{"use strict";qO=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var KO,JO=l(()=>{"use strict";KO=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var u6,YO,XO=l(()=>{"use strict";VO();JO();qm();Vm();u6=e=>{let t=xl(e);return t.length===0?XP:`${XP} Avoid: ${t.join("; ")}.`},YO=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:UO};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(qO(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:u6(KO(r))}}return null}});var ho,p6,An,ZO,Ym=l(()=>{"use strict";ho=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},p6=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,An=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",p6(e.tokens),`Delay: ${ho(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},ZO=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var m6,QO,eM=l(()=>{"use strict";nw();m6=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,QO=e=>{let r=(m6.exec(e)?.[1]??e).trim();return r.length===0||ow(r)!==null?null:r}});var tM,Xm,rM=l(()=>{"use strict";Ym();eM();Jm();tM=e=>({type:"call",role:"judge",choice:e.choice,prompt:ZO({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),Xm=e=>{let t=QO(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:iw}}:{nextPrompt:t,continuation:tM({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var aw,oM=l(()=>{"use strict";QP();ew();nw();Jm();qm();XO();Jm();rM();aw=e=>{let t=GO(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:sw}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=YO({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=Il({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:fo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var Ol,lw=l(()=>{"use strict";Ol=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var nM=l(()=>{"use strict"});var sM=l(()=>{"use strict";nM()});var bn,iM=l(()=>{"use strict";bn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var g6,cw,aM=l(()=>{"use strict";Ym();g6=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,cw=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",g6(e.tokens),`Delay: ${ho(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var f6,h6,y6,dw,lM=l(()=>{"use strict";f6=/[A-Za-z0-9_./~-]{3,180}/g,h6=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,y6=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||h6.test(t)},dw=(e,t=12)=>{let r=[];for(let o of e.matchAll(f6)){let n=o[0].replace(/\.+$/,"");if(!(!y6(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var Ml,cM=l(()=>{"use strict";Ml=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var Zm,uw,dM,Nl,pw=l(()=>{"use strict";Zm=e=>Math.floor(e/2),uw=e=>Math.max(Zm(e)+1,e-20),dM=(e,t)=>e>=t?"passes":e>=uw(t)?"close":e>=Zm(t)?"weak":"bad",Nl=e=>[{band:"bad",label:`0\u2013${Zm(e)-1} bad`},{band:"weak",label:`${Zm(e)}\u2013${uw(e)-1} weak`},{band:"close",label:`${uw(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var Qm,mw=l(()=>{"use strict";pw();Qm=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${dM(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var xt,gw=l(()=>{"use strict";xt=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var uM,pM=l(()=>{"use strict";uM=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var S6,A6,mM,gM=l(()=>{"use strict";Gs();mw();gw();pM();S6=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],A6=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",mM=e=>{let t=e.wizard;if(t===void 0)return[];let r=xt(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=S6.map((h,y)=>{let p=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:h,state:p,detail:null}}).filter((h,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=Qm(e),d=c.filter(h=>h.id==="round-0"),u=uM(t)&&(!n||a)?c.filter(h=>h.id!=="round-0"):[],m=W(e.status)&&!s,S=m?[{id:"end",label:A6(e),state:"done",detail:e.errorMessage}]:[];if(m&&S.length>0){let h=Math.min(r,i.length),y=i.slice(0,h).map(p=>({...p,state:"done"}));return[...d,...y,...S,...u]}return[...d,...i,...u,...S]}});var b6,fw,fM=l(()=>{"use strict";Gs();mw();gM();b6=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",fw=e=>{if(e.wizard!==void 0)return mM(e);let t=Qm(e),r=W(e.status)?[{id:"end",label:b6(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var zl,hM=l(()=>{"use strict";zl=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var yM=l(()=>{"use strict";gt()});var SM,Dl,jl,Ks,eg,hw,AM=l(()=>{"use strict";yM();SM="/prompt-optimizer/agent",Dl=`${Sr}${SM}`,jl=`${Sr}/prompt-optimizer`,Ks="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",eg=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${Ks}`,hw="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var rr=l(()=>{"use strict"});var ie,$l=l(()=>{"use strict";rr();ie=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var yw,bM=l(()=>{"use strict";yw="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var PM,wM=l(()=>{"use strict";PM=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Hl,vM=l(()=>{"use strict";wM();rr();Hl=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:PM(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var Sw,kM=l(()=>{"use strict";rr();Sw=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var Aw,CM=l(()=>{"use strict";rr();Aw=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var TM,Fl,LM=l(()=>{"use strict";TM=["generalize","evaluate","separate","optimize_modules"],Fl=(e,t)=>{let r=TM.indexOf(t);if(r===-1)return e;let o=TM.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var tg,bw=l(()=>{"use strict";Vm();tg=e=>{let t=xl(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var Ul,WM=l(()=>{"use strict";bw();Ul=e=>{let t=tg(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var w6,_6,v6,EM,RM=l(()=>{"use strict";w6=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),_6=/^\{\{[a-zA-Z0-9_-]+\}\}$/,v6=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(w6(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let u=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),u}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},EM=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>_6.test(n)?n:v6(n,r)).join("")}});var Pw,xM=l(()=>{"use strict";RM();Pw=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:EM(o.prompt,t)}))}))});var k6,Bl,IM=l(()=>{"use strict";rr();bw();k6=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Bl=e=>{let t=tg(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=k6(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Gl,OM=l(()=>{"use strict";lw();Gl=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return Ol({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var ql,_w=l(()=>{"use strict";qs();ql=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ce(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var vw,MM=l(()=>{"use strict";_w();vw=e=>{let t=ql({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Pn,NM=l(()=>{"use strict";Pn=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var C6,T6,re,rg=l(()=>{"use strict";$l();C6=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},T6=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,re=e=>{let t=ie(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:C6(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>T6(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var zM,DM=l(()=>{"use strict";$l();rg();zM=e=>{let t=re(e.wizard),r=ie(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var kw,jM=l(()=>{"use strict";DM();kw=e=>{let t=zM({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var L6,$M,HM=l(()=>{"use strict";L6=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},$M=e=>[...e].reduce(L6,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var W6,FM,UM=l(()=>{"use strict";W6=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},FM=e=>[...e].reduce(W6,{out:"",inString:!1,escaped:!1}).out});var E6,R6,BM,GM=l(()=>{"use strict";HM();UM();E6=e=>e.charCodeAt(0)===65279?e.slice(1):e,R6=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},BM=e=>FM($M(R6(E6(e))))});var x6,I6,O6,qM,M6,Js,og=l(()=>{"use strict";rw();GM();x6=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},I6=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},O6=e=>[...e].reduce(I6,{out:"",inString:!1,escaped:!1}).out,qM=e=>{let t=Km(e);return t.length===0?null:t[t.length-1]},M6=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Js=e=>{let t=BM(x6(e)),r=qM(t);if(r!==null)return r;let o=O6(t),n=qM(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw M6(i)}}});var N6,z6,Cw,VM,KM=l(()=>{"use strict";N6=/^[a-z0-9][a-z0-9-]{0,62}$/,z6=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return N6.test(t)?t:""},Cw=e=>e.replace(/\s+/gu," ").trim(),VM=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=z6(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=Cw(n.name),a=Cw(n.description),c=Cw(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var JM,YM,XM=l(()=>{"use strict";JM=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},YM=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var Tw,ZM=l(()=>{"use strict";og();KM();XM();Tw=(e,t)=>{let r=(()=>{try{return Js(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(JM(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(YM).filter(a=>a!==null),i=VM({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var Lw,QM=l(()=>{"use strict";Lw=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var Ww,eN=l(()=>{"use strict";Ww=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var Ew,tN=l(()=>{"use strict";$l();rg();Ew=e=>{let t=re(e.wizard),r=ie(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var Vl,rN=l(()=>{"use strict";Vl=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var It,D6,Rw,oN=l(()=>{"use strict";It=g(rs());og();D6=(0,It.isType)({name:It.isNonEmptyString,description:It.isString,sampleValue:It.isString}),Rw=e=>{let t=Js(e);if(!(0,It.isType)({templatedPrompt:It.isNonEmptyString,variables:(0,It.isArrayWithEachItem)(D6)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var de,j6,$6,xw,nN=l(()=>{"use strict";de=g(rs());rr();og();j6=(0,de.isType)({id:de.isNonEmptyString,title:de.isNonEmptyString,prompt:de.isNonEmptyString,order:de.isNumber}),$6=(0,de.isType)({id:de.isNonEmptyString,title:de.isNonEmptyString,summary:de.isString,topology:(0,de.isOneOf)("chain","parallel"),modules:(0,de.isArrayWithEachItem)(j6),recommended:de.isBoolean}),xw=e=>{let t=Js(e);if(!(0,de.isType)({options:(0,de.isArrayWithEachItem)($6)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Ys,sN=l(()=>{"use strict";Ys=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var H6,Iw,Ow=l(()=>{"use strict";H6=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Iw=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(H6,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Ot,Mt,iN=l(()=>{"use strict";qs();Ow();Ot=e=>Iw(e.templatedPrompt,e.variables),Mt=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ce(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Ot(e.wizard)}});var F6,wn,aN=l(()=>{"use strict";F6=/\{\{([a-zA-Z0-9_-]+)\}\}/g,wn=(e,t)=>e.replace(F6,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var U6,_n,ng=l(()=>{"use strict";U6=/\{\{([a-zA-Z0-9_-]+)\}\}/g,_n=e=>{let t=new Set,r=[];for(let o of e.matchAll(U6)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Kl,lN=l(()=>{"use strict";ng();Kl=e=>e.variables.length>0||_n(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var Mw,Nw=l(()=>{"use strict";rr();Mw=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Jl,cN=l(()=>{"use strict";qs();Nw();Jl=e=>{let t=e.wizard.evaluateSelectedRound??ce(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:Mw(r.judgement,e.passScore)}});var Yl,dN=l(()=>{"use strict";Yl=e=>e.length===1&&e[0].modules.length===1});var zw,uN=l(()=>{"use strict";zw=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Pe,sg,Xl=l(()=>{"use strict";Pe=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),sg=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var pN,mN=l(()=>{"use strict";Xl();pN=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Pe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Pe("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Pe("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var gN,fN=l(()=>{"use strict";Gs();Xl();gN=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!W(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Pe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),Pe("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Pe("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",sg(e.writerLabel,e.folder)),Pe("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Pe("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var hN,yN=l(()=>{"use strict";Xl();hN=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Pe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Pe("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Pe("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var SN,AN=l(()=>{"use strict";Xl();SN=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Pe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Pe("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",sg(e.writerLabel,e.folder)),...r?[Pe("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var ig,bN=l(()=>{"use strict";Gs();mN();fN();yN();AN();ig=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(W(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return gN(r);case"evaluate":return pN({...r,currentRound:e.currentRound});case"separate":return SN(r);case"optimize_modules":return hN({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Zl,Tr,PN=l(()=>{"use strict";Zl=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),Tr=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var B6,ag,Dw,wN=l(()=>{"use strict";ng();B6="wizardParam_",ag=e=>`${B6}${e}`,Dw=e=>{let t=_n(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=ag(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var ct,_N=l(()=>{"use strict";ct=["generalize","evaluate","separate","optimize_modules"]});var Ql,vn,Xs,Lr=l(()=>{"use strict";Ql="Stopped because the confirmed token or spend budget was exceeded.",vn="Approaching the confirmed budget. Further trials may hard-stop.",Xs="Confirm the Step 4 token and spend budget before optimizing modules."});var dt,Zs=l(()=>{"use strict";dt=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var zt,ec=l(()=>{"use strict";Lr();zt=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var G6,Wr,tc=l(()=>{"use strict";Lr();G6={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},Wr=e=>{let t=e?.trim()??"";return t.length===0?.01:G6[t]??.01}});var lg,jw=l(()=>{"use strict";Lr();tc();lg=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=Wr(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var vN,dg,$w,Hw=l(()=>{"use strict";Lr();Zs();ec();jw();tc();vN=e=>{let t=lg({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??Wr(e.writerId)??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:dt({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},dg=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),$w=e=>{let t=e.existing??zt(),r=vN({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return dg(t,r)}});var Qs,rc,TN=l(()=>{"use strict";Lr();rr();Zs();ec();Hw();jw();tc();Qs=e=>{let t=lg({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??Wr(e.writerId),i=r*4e3,a=n*o*8e3,c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:dt({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},rc=e=>{let t=e.existing??zt();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=Qs({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return dg(t,r)}});var Er,LN=l(()=>{"use strict";Zs();Lr();ec();Er=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??zt(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=dt({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var Uw,ei,WN=l(()=>{"use strict";Lr();Zs();Uw=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=dt({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:Ql,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:Ql,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,u=s!==null&&s>0&&o>=s*c;return(d||u)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:vn,costControls:{...t,softWarnFired:!0,softWarnMessage:vn}}:null},ei=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var Bw,EN=l(()=>{"use strict";Bw=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var E=l(()=>{"use strict";Gs();qm();oM();QP();Ym();lw();sM();iM();aM();lM();ew();cM();qs();fM();gw();pw();hM();AM();rr();$l();bM();vM();kM();CM();LM();WM();xM();IM();OM();_w();MM();NM();rg();jM();ZM();QM();eN();tN();rN();oN();nN();sN();iN();Ow();aN();ng();lN();cN();dN();Nw();uN();bN();PN();wN();_N();Lr();Zs();ec();Hw();TN();tc();LN();WN();EN()});var Gw=l(()=>{"use strict";va()});var q6,IN,ON=l(()=>{"use strict";Gw();q6=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,IN=e=>{let t=Zo(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(q6)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var NN,V6,K6,or,J6,Y6,MN,pg,zN,X6,ht,DN,jN,$N,Dt=l(()=>{"use strict";Gw();ON();NN=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),V6=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,K6=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,or=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(V6.test(e.errorMessage))return"usage_limit";if(K6.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},J6="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",Y6="The writer waited on terminal input and did not return a prompt.",MN=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,pg=e=>{let t=e.trim();if(t.length===0||t.length>=500||!MN.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>MN.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},zN=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},X6=e=>pg(e.stdout)??pg(e.stderr)??(zN(e.replyFile)?pg(e.replyFile):null),ht=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return J6;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?Y6:null},DN=e=>{let t=e.trim();return t.length===0?null:ht(t)!==null?t:pg(t)??(zN(t)?t:null)},jN=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],$N=e=>{let t=e.replyFileText?.trim()??"",r=ht([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=X6({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=or({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=IN([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Zo(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var Z6,FN,HN,Cn,mg=l(()=>{"use strict";Dt();Z6=400,FN=(e,t=Z6)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},HN=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:DN(e.promptText)},Cn=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:HN(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=HN(e.revisions[n]);if(s!==null)return s.trim()}return null}});var x,Q6,gg,ae,Tn,BN,UN,GN,qN,we=l(()=>{"use strict";x="manual",Q6=["claude-cli","codex","cursor","antigravity"],gg={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ae=e=>e===x?"You":e in gg?gg[e]:e,Tn=e=>Q6.filter(t=>e.includes(t)),BN=e=>{let t=Tn(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},UN=(e,t)=>t===x?x:e.find(r=>r===t)??null,GN=(e,t,r)=>{let o=Tn(e),n=UN(o,t),s=UN(o,r);return n===null||s===null?null:{judge:n,improver:s}},qN=(e,t,r)=>{let o=Tn(e);return t===null||t.trim()===""?r!==x?r:o[0]??null:t===x?null:o.find(n=>n===t)??null}});var VN,fg,qw,Ln,Vw,ut,Rr,ue,Ve=l(()=>{"use strict";VN=g(require("node:fs")),fg=g(require("node:os")),qw=g(require("node:path"));rn();Ln="~",Vw=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,ut=e=>{let t=fg.default.homedir(),r=Vw(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Rr=e=>{let t=e.trim().length===0?"~":e.trim(),r=Ye(t),o=qw.default.isAbsolute(r)?Vw(r):Vw(qw.default.resolve(fg.default.homedir(),r));try{if(!VN.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:ut(o)}},ue=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:fg.default.homedir()});var Xe,yo=l(()=>{"use strict";Xe='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var Kw,KN,eJ,JN,YN,Jw=l(()=>{"use strict";E();we();Ve();yo();Kw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),KN=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',eJ=e=>{let t=KN(e.state),r=`<h2>${Kw(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${Kw(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Xe}</button></div><template>${r}</template></li>`},JN=e=>{let t=e.wizard;if(t===void 0)return"";let r=ig({status:e.status,wizard:t,writerLabel:ae(e.judgeModel),runnerLabel:ae(e.runnerModel??e.judgeModel),folderDisplay:ut(ue(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(eJ).join("")}</ol>`},YN=e=>{let t=e.wizard;if(t===void 0)return"";let r=ig({status:e.status,wizard:t,writerLabel:ae(e.judgeModel),runnerLabel:ae(e.runnerModel??e.judgeModel),folderDisplay:ut(ue(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${KN(n.state)}<span class="sdlc-pipeline-label">${Kw(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var jt,XN,ZN,QN,Yw=l(()=>{"use strict";E();jt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),XN="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",ZN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${jt(XN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${jt(i.name)}}}</strong> \u2014 ${jt(i.description)} (sample: ${jt(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${jt(r)}</pre>`,n=Ot(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${jt(n)}</pre>`;return`${t}${o}${s}`},QN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${jt(XN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${jt(n.name)}}}</strong> \u2014 ${jt(n.description)} (sample: ${jt(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${jt(r)}</pre>`;return`${t}${o}`}});var oc,Xw=l(()=>{"use strict";oc=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var ez,tz=l(()=>{"use strict";E();ez=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=bn({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=An({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var Zw,nc,Qw=l(()=>{"use strict";yo();tz();Zw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nc=e=>{let t=ez(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${Zw(r)}">${Xe}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${Zw(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${Zw(t)}</pre></template>`}});var e_,sc,t_=l(()=>{"use strict";yo();e_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sc=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${e_(r)}">${Xe}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${e_(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${e_(t)}</pre></template>`}});var hg,ti,r_=l(()=>{"use strict";Xw();Qw();t_();hg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ti=e=>{let t=oc(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${hg(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,u=e.cycle.revisions.map(m=>{let S=m.judgement?.score,h=S==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${S}`,y=m.judgement?.reasons?.trim()??"",p=y.length===0?"":`<br><span class="muted">${hg(y)}</span>`,b=sc({roundLabel:d(m.roundNumber),promptText:m.promptText}),A=nc({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run}),f=`${b}${A}`;if(e.interactive){let P=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${P}> <span class="sdlc-wizard-revision-title">${hg(h)}</span></label>${f}${p}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${hg(h)}</span>${f}${p}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${u}</ul>`}});var o_,rz,oz,nz,n_=l(()=>{"use strict";o_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rz=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${o_(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${o_(t.prompt)}</pre></li>`).join("")}</ol>`,oz=e=>rz([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),nz=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${o_(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${rz(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var ic,tJ,yg,s_=l(()=>{"use strict";E();n_();ic=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tJ=e=>{let t=e.wizard;return t===void 0?"":Mt({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},yg=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=tJ(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${ic(n.orchestratorSkill.fileName)}</code> \u2014 ${ic(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${ic(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=oz(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${ic(r)} <span class="muted">${ic(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Ie,rJ,oJ,nJ,sJ,Sg,iJ,aJ,lJ,cJ,dJ,uJ,ri,Ag=l(()=>{"use strict";E();Jw();Yw();r_();Qw();t_();s_();Ie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rJ={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},oJ=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Ie(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Ie(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Ie(o)}</pre></details>`;return`<h2>${Ie(e)}</h2>${n}`},nJ=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=Ot(t).trim(),n=Mt({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!W(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${oJ("What is being evaluated",i)}`},sJ=(e,t)=>{let r=e.wizard;if(r===void 0||W(e.status))return"";let o=rJ[t];return o===void 0||r.phase!==o?"":YN(e)},Sg=(e,t,r)=>{let o=sJ(e,t),n=t==="wizard-2"?nJ(e):"";return`${o}${n}${r}`},iJ=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},aJ=e=>{let t=e.wizard;return t===void 0?"":ZN(t)},lJ=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Ie(a)}</span>`,d=`Round ${n.roundNumber}`,u=sc({roundLabel:d,promptText:n.promptText}),m=nc({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ie(s)}${i}</span>${u}${m}${c}</li>`}).join("")}</ul>`,cJ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return ti({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=iJ(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${lJ(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=Mt({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Ie(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",u=`Round ${c.roundNumber} \u2014 score ${d}`,m=sc({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),S=nc({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ie(u)}</span>${m}${S}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Ie(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},dJ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Ie(n.title)}</strong> <span class="muted">(${Ie(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Ie(o.title)}</strong>${n}${Ie(s)}${yg(e,o)}</li>`}).join("")}</ul>`},uJ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Ie(i)}</span> <strong>${Ie(n.title)}</strong>${Ie(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Ie(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?ti({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},ri=(e,t)=>{switch(t){case"wizard-1":return Sg(e,t,aJ(e));case"wizard-2":return Sg(e,t,cJ(e));case"wizard-3":return Sg(e,t,dJ(e));case"wizard-4":return Sg(e,t,uJ(e));default:return""}}});var pJ,mJ,sz,iz,az=l(()=>{"use strict";E();mg();Dt();Ag();pJ=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},mJ=e=>{let t=e.goal.trim();return t.length===0?null:t},sz=(e,t,r,o,n)=>{let s=ht(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},iz=(e,t)=>{let r=mJ(e);if(t.id.startsWith("wizard-")){let s=ri(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=zl(e,t);if(s!==null){let a=Cn(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ce(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:sz(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:pJ(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:sz(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var Wn,lz,cz=l(()=>{"use strict";Wn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lz=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${Wn(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Wn(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${Wn(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${Wn(n)}</h2><pre class="mono">${Wn(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${Wn(e.goal)}</dd></div></dl>`;return`<h2>${Wn(e.title)}</h2>${i}${t}${r}${o}${s}`}});var gJ,dz,ac,i_,bg=l(()=>{"use strict";E();gJ=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),dz=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||W(e.status))return null;let r=xt(t);return r<0||r>3?null:`wizard-${r+1}`},ac=(e,t)=>gJ.has(t)?dz(e)===t:!1,i_="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var fJ,Pg,a_=l(()=>{"use strict";fJ='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Pg=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${fJ}</button>`});var En,wg=l(()=>{"use strict";E();En=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Il({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:Ml(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var hJ,uz,yJ,l_,pz,SJ,AJ,bJ,PJ,mz,gz=l(()=>{"use strict";E();wg();hJ={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},uz=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},yJ=e=>hJ[e]??null,l_=(e,t)=>{let r=e.wizard,o=yJ(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=xt(r);return o<n||o===n},pz=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},SJ=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:Ot(t).trim();return o.length===0?null:Ul({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:uz(e,"generalize")})},AJ=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=En(e);return n===null?null:fo({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=pz(e)?.promptText.trim()??Mt({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:bn({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},bJ=e=>{let t=e.wizard;if(t===void 0)return null;let r=Mt({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:Bl({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:uz(e,"separate")})},PJ=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=Tr(t),s=wn(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=En(e);return c===null?null:fo({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=pz(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||W(e.status)&&i?.judgement!==null)?An({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):Gl({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:Pn(t,r).output,moduleTitle:o.title})},mz=(e,t)=>{if(!l_(e,t))return null;switch(t){case"wizard-1":return SJ(e);case"wizard-2":return AJ(e);case"wizard-3":return bJ(e);case"wizard-4":return PJ(e);default:return null}}});var wJ,_g,c_=l(()=>{"use strict";E();wJ=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},_g=(e,t)=>{let r=e.wizard,o=wJ(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=xt(r);return o<n?"done":o===n&&W(e.status)&&e.status==="failed"?"failed":o<=n&&W(e.status)?"done":"pending"}});var _J,oi,vg=l(()=>{"use strict";yo();gz();c_();_J=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oi=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(_g(e,t)==="pending")return""}else if(!l_(e,t))return"";let o=mz(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Xe}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${_J(o)}</pre></template>`}});var Rn,xr,ni=l(()=>{"use strict";Rn=e=>e.toLocaleString("en-US"),xr=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var nr,vJ,fz,kg,hz,yz,Cg=l(()=>{"use strict";E();az();cz();bg();a_();yo();mg();Jw();vg();ni();nr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vJ=(e,t)=>{let r=zl(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?xr(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${Rn(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${nr(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${nr(r)}</span>`:"",d=lz(iz(t,e)),u=t.wizard!==void 0&&t.wizard.phase==="complete"&&W(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${nr(e.id)}"`:"",m=ac(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${nr(i_)}"><input type="hidden" name="cycleId" value="${nr(t.id)}"><input type="hidden" name="wizardStepId" value="${nr(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",S=e.state==="active"&&e.id.startsWith("wizard-")?JN(t):"",h=o?"failed":e.state,y=o?Cn(t):null,p=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Xe}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${nr(y)}</pre></template>`:"",b=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?oi(t,e.id):"";return`<li class="sdlc-node sdlc-node-${h}" data-sdlc-step-id="${nr(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${u} data-sdlc-node>${n}<span class="sdlc-node-label">${nr(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${b}${p}</div></div>${S}<template>${d}</template></li>`},fz=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>vJ(r,t)).join("")}</ol>`,kg=e=>`<div class="sdlc-score" aria-label="What the score means">${Nl(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${nr(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,hz=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${Pg({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,yz=`<script>
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
</script>`});var Tg,Lg,Wg,Sz,d_=l(()=>{"use strict";Tg="support-reply",Lg="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",Wg=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),Sz=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Eg,Az,bz=l(()=>{"use strict";E();Cg();d_();Eg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Az=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${kg(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${Eg(Lg)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Eg(Wg)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Eg(Sz)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Eg(Tg)}">Run this sample</a>
      </div>
    </section>`});var u_,Rg,kJ,Pz,wz=l(()=>{"use strict";u_=g(require("node:fs")),Rg=g(require("node:path")),kJ=e=>Rg.default.join(Rg.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),Pz=(e,t)=>{let r=kJ(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;u_.default.mkdirSync(Rg.default.dirname(r),{recursive:!0}),u_.default.appendFileSync(r,o,"utf8")}});var si,_z,CJ,vz,TJ,kz,sr,Z,Cz,z,pt=l(()=>{"use strict";si=g(require("node:fs")),_z=g(require("node:path"));E();wz();CJ=e=>e.wizard===void 0?e:{...e,wizard:Sw(e.wizard)},vz=new Set,TJ=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),kz=(e,t)=>{si.default.mkdirSync(_z.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;si.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),si.default.renameSync(r,e)},sr=e=>{if(!si.default.existsSync(e))return[];try{let t=JSON.parse(si.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(TJ).map(CJ):[]}catch{return[]}},Z=(e,t)=>sr(e).find(r=>r.id===t)??null,Cz=(e,t)=>{vz.add(t);let r=sr(e).filter(o=>o.id!==t);kz(e,r)},z=(e,t)=>{if(vz.has(t.id))return;let r=sr(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];kz(e,o),Pz(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var ii,ir,lc,Tz,xg,LJ,Lz,Wz,Ez,p_=l(()=>{"use strict";ii=g(require("node:fs")),ir=g(require("node:path")),lc=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},Tz=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),xg=(e,t)=>{let r=lc(e);return r.length>0?r:lc(t)},LJ=e=>{let t=xg(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${Tz(o)}`,...n.length>0?[`description: ${Tz(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},Lz=e=>`.cursor/skills/${e}/SKILL.md`,Wz=(e,t)=>{let r=lc(t);if(r.length===0)return!1;let o=ir.default.resolve(e),n=ir.default.resolve(o,".cursor","skills"),s=ir.default.resolve(o,Lz(r));return s.startsWith(`${n}${ir.default.sep}`)?ii.default.existsSync(s):!1},Ez=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(xg(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=ir.default.resolve(e.workingDirectory);try{if(!ii.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=LJ({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=Lz(r.slug),n=ir.default.resolve(t,".cursor","skills"),s=ir.default.resolve(t,o);if(!s.startsWith(`${n}${ir.default.sep}`))return{ok:!1,errorCode:"path"};if(ii.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{ii.default.mkdirSync(ir.default.dirname(s),{recursive:!0}),ii.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var WJ,Rz,xz,Iz=l(()=>{"use strict";E();pt();Ve();Dt();p_();WJ=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,Rz=e=>{let t=e.get("savedSkill");return t!==null&&WJ.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},xz=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=Z(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!W(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ce(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||ht(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=Ez({workingDirectory:ue(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var Ig,Og,cc=l(()=>{"use strict";E();Ig=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=Er({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},Og=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var So,dc=l(()=>{"use strict";E();cc();So=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=zw(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=$w({moduleCount:o.length,existing:e.costControls,writerId:n}),i=Ig(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Zl(r.variables)},updatedAt:new Date().toISOString()}}});var Ao,uc=l(()=>{"use strict";Ao=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var m_=l(()=>{"use strict";Tt();bl();va()});var g_,Oz,f_,Mz,Nz=l(()=>{"use strict";g_={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},Oz=e=>e.exitCode===null&&e.signalCode===null,f_=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!Oz(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!Oz(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),Mz=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),f_(e).then(s=>{r({...g_,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var zz,pc,Dz,h_,EJ,S_,A_,RJ,xJ,IJ,jz,OJ,y_,$z,mc,Hz,MJ,NJ,Ze,xn=l(()=>{"use strict";zz=require("node:child_process"),pc=g(require("node:fs")),Dz=g(require("node:os")),h_=g(require("node:path"));m_();Nz();Dt();EJ=["claude-cli","codex","cursor","antigravity"],S_=18e4,A_=6e5,RJ=12e4,xJ=9e5,IJ="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",jz="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",OJ="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",y_=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},$z=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=y_(process.env[jz])??Math.max(r,A_));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:y_(process.env[OJ])??xJ;return Math.min(o,Math.max(RJ,r))},mc=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?y_(process.env[jz])??A_:S_,Hz=e=>`The writer timed out after ${e}ms.`,MJ=e=>EJ.includes(e),NJ=e=>e===!0||process.env[IJ]==="1",Ze=e=>new Promise(t=>{if(e.signal?.aborted){t(g_);return}if(NJ(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!MJ(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=Jt(r,e.prompt,fe({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!pc.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:S_,s=h_.default.join(pc.default.mkdtempSync(h_.default.join(Dz.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=jN({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},u=(0,zz.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),m=S=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(S))};Mz(u,e.signal,m,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",f_(u).then(S=>{m({ok:!1,errorMessage:Hz(n),errorKind:"writer_timeout",killSignal:S})})},n),u.stdout.on("data",S=>{a.push(Buffer.from(S))}),u.stderr.on("data",S=>{c.push(Buffer.from(S))}),u.on("error",()=>m({ok:!1,errorMessage:"The writer failed to start."})),u.on("close",()=>{if(d.settled)return;let S=pc.default.existsSync(s)?pc.default.readFileSync(s,"utf8"):null,h=$N({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:S});if(h.ok&&d.stopReason!=="abort"){m(h);return}d.stopReason===null&&m(h)})})});var zJ,gc,b_=l(()=>{"use strict";E();ni();zJ=e=>{if(e.wizard!==void 0){let t=Vl(e.wizard),r=xr(e);return(t??0)+r}return xr(e)},gc=e=>{let t=Uw({costControls:e.costControls,spentTokens:zJ(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var Fz,DJ,fc,Mg,Ng=l(()=>{"use strict";E();we();b_();Fz=e=>e===x?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},DJ=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),fc=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=aw({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:Fz(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?Bw({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:Ml(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=DJ(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?gc({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):gc({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},Mg=(e,t,r=null)=>{let o=Xm({raw:t,judge:Fz(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var zg,P_=l(()=>{"use strict";zg=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var Gz,Dg,jg,Uz,Bz,w_,jJ,qz,__,$J,Vz,HJ,FJ,Kz,Jz=l(()=>{"use strict";Gz=require("node:child_process"),Dg=g(require("node:fs")),jg=g(require("node:path"));um();E();Uz=4e3,Bz=12e3,w_=(e,t)=>{let r=(0,Gz.spawnSync)("git",[...t],{cwd:e,env:uo(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},jJ=e=>w_(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",qz=e=>{let t=w_(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},__=(e,t)=>{let r=jg.default.resolve(e,t),o=jg.default.relative(e,r);if(o.startsWith("..")||jg.default.isAbsolute(o)||!Dg.default.existsSync(r)||!Dg.default.statSync(r).isFile())return null;let n=Dg.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>Uz?`${n.slice(0,Uz)}
\u2026truncated`:n},$J=e=>e.length>Bz?`${e.slice(0,Bz)}
\u2026truncated`:e,Vz=e=>{let t=dw(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,__(e.workingDirectory,n)])),o=jJ(e.workingDirectory);return{git:o,status:o?qz(e.workingDirectory):{},files:r,paths:t}},HJ=(e,t)=>{let r=w_(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=__(e,t);return o===null?`${t} is missing.`:o},FJ=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",Kz=e=>{let t=e.before.git?qz(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=__(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>HJ(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:FJ(e.before.git,e.before.paths.length>0),evidence:$J(i.join(`

`))}}});var C_,B,T_,Oe,Yz,UJ,BJ,Xz,ai,Zz,li,GJ,qJ,hc,v_,k_,VJ,Qz,KJ,JJ,YJ,eD,XJ,tD,rD,ZJ,QJ,oD,nD=l(()=>{"use strict";C_=require("node:child_process"),B=g(require("node:fs")),T_=g(require("node:os")),Oe=g(require("node:path"));um();Yz=8e6,UJ=16e6,BJ=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],Xz=(e,t)=>{let r=(0,C_.spawnSync)("git",[...t],{cwd:e,env:uo(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},ai=(e,t)=>(0,C_.spawnSync)("git",[...t],{cwd:e,env:uo(),timeout:8e3}).status===0,Zz=e=>{let t=Xz(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},li=(e,t)=>{let r=Oe.default.resolve(e,t),o=Oe.default.relative(e,r);return o.startsWith("..")||Oe.default.isAbsolute(o)?null:r},GJ=(e,t)=>{let r=li(e,t);if(r===null||!B.default.existsSync(r))return null;let o=B.default.statSync(r);return!o.isFile()||o.size>Yz?null:B.default.readFileSync(r)},qJ=(e,t,r)=>{let o=li(e,t);o!==null&&(B.default.mkdirSync(Oe.default.dirname(o),{recursive:!0}),B.default.writeFileSync(o,r))},hc=(e,t)=>{let r=li(e,t);r===null||!B.default.existsSync(r)||B.default.rmSync(r,{recursive:!0,force:!0})},v_=(e,t)=>ai(e,["cat-file","-e",`HEAD:${t}`]),k_=e=>{let t=Xz(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},VJ=e=>Oe.default.resolve(e)!==Oe.default.resolve(T_.default.homedir()),Qz=e=>{if(!B.default.existsSync(e))return 0;let t=B.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?B.default.readdirSync(e).reduce((r,o)=>r+Qz(Oe.default.join(e,o)),0):0},KJ=(e,t,r)=>{let o=li(e,r);if(o===null||!B.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(Qz(o)>UJ)return{relativePath:r,existed:!0,copyDir:null};let n=Oe.default.join(t,"cache",r);return B.default.mkdirSync(Oe.default.dirname(n),{recursive:!0}),B.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},JJ=400,YJ=32e6,eD=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!B.default.existsSync(s)))for(let i of B.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=Oe.default.join(s,i),c=B.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>Yz)){if(t.length>=JJ||r+c.size>YJ){o=!1;return}r+=c.size,t.push(Oe.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},XJ=(e,t,r)=>{let o=li(e,r);if(o===null||!B.default.existsSync(o))return null;let n=GJ(e,r);if(n===null)return"skip";let s=Oe.default.join(t,"files",r);return B.default.mkdirSync(Oe.default.dirname(s),{recursive:!0}),B.default.writeFileSync(s,n),s},tD=e=>{let t=B.default.mkdtempSync(Oe.default.join(T_.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?Zz(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:eD(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,XJ(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?k_(e.workingDirectory):null,isolateCaches:VJ(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:BJ.map(i=>KJ(e.workingDirectory,t,i))}},rD=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){hc(e.workingDirectory,t);return}qJ(e.workingDirectory,t,B.default.readFileSync(r))}},ZJ=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?rD(e,t):v_(e.workingDirectory,t)?ai(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):hc(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&v_(e.workingDirectory,t)&&ai(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!v_(e.workingDirectory,t)&&ai(e.workingDirectory,["reset","-q","HEAD","--",t])},QJ=(e,t)=>{let r=li(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){hc(e.workingDirectory,t.relativePath),B.default.mkdirSync(Oe.default.dirname(r),{recursive:!0}),B.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){hc(e.workingDirectory,t.relativePath);return}if(B.default.existsSync(r))for(let o of B.default.readdirSync(r)){let n=Oe.default.join(r,o);B.default.statSync(n).mtimeMs>=e.startedMs-1e3&&B.default.rmSync(n,{recursive:!0,force:!0})}}}},oD=e=>{try{if(e.git){if(k_(e.workingDirectory)!==e.head&&(!(e.head===null?ai(e.workingDirectory,["update-ref","-d","HEAD"]):ai(e.workingDirectory,["reset","--hard",e.head]))||k_(e.workingDirectory)!==e.head))throw new Error("head");let r=Zz(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))ZJ(e,o)}else{if(e.complete)for(let t of eD(e.workingDirectory).paths)e.files[t]===void 0&&hc(e.workingDirectory,t);for(let t of Object.keys(e.files))rD(e,t)}for(let t of e.caches)QJ(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{B.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var $g,Hg,e7,t7,r7,o7,n7,sD,s7,iD,aD=l(()=>{"use strict";E();Ng();P_();Jz();nD();we();Ve();Dt();xn();$g=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),Hg=e=>({...e,status:"stopped",errorMessage:Sn,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),e7=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),t7=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==x?t:e.improverModel!==x?e.improverModel:null}return e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null},r7=async e=>{let t=ue(e.cycle),r=Vz({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=tD({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Gl({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Pn(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):Ol({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=$z({promptText:e.revision.promptText,isModuleRun:i}),c=mc({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},u=await Ze({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),m=u.ok?Kz({workingDirectory:t,before:r,writerReply:u.text}):null,S=oD(o),h={...e.cycle,revisions:e.cycle.revisions.map(y=>y.roundNumber===e.cycle.currentRound?d:y)};return u.ok?!S.ok||m===null?{ok:!1,cycle:$g(h,S.ok?"Could not put the folder back after the run.":S.errorMessage)}:{ok:!0,cycle:h,run:{output:u.text.trim(),tokens:u.tokens,delayMs:Date.now()-n,lookedAt:m.lookedAt,evidence:m.evidence}}:u.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:Hg(h)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:$g(h,u.errorMessage,or(u))})},o7=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:r7({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),n7=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),sD=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Ze({writerAgent:e.reviewer,workingDirectory:ue(e.cycle),prompt:cw({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:Hg(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},s7=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===x)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Ze({writerAgent:t.judgeModel,workingDirectory:ue(t),prompt:bn({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...fc(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?Hg(o):(e.onWriterFailure?.(t.judgeModel),$g(o,n.errorMessage,or(n)))},iD=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return s7(e);let o=t7(t),n=await o7({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?e7(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===x){let u=await sD({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return u.kind==="stopped"?u.cycle:{...n7(s,u.text),judgePhase:void 0}}let i=await Ze({writerAgent:t.judgeModel,workingDirectory:ue(t),prompt:An({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?Hg(s):(e.onWriterFailure?.(t.judgeModel),$g(s,i.errorMessage,or(i)));let a=await sD({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=fc(s,i.text,c);return zg(d,a.text)}});var Fg,i7,a7,L_,lD=l(()=>{"use strict";E();Ng();aD();wg();Dt();we();b_();Ve();xn();Fg=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),i7=e=>({...e,status:"stopped",errorMessage:Sn,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),a7=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?i7(e):(n?.(r),Fg(e,t.errorMessage,or(t))),L_=async(e,t,r,o)=>{let n=gc(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return Fg(e,"This round has no prompt.");if(e.status==="judging")return iD({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return Fg(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===x)return e;let i=En(e);if(i===null)return Fg(e,"The improver needs the score and the reason.");let a=await Ze({writerAgent:e.improverModel,workingDirectory:ue(e),prompt:fo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:mc()}),c=a7(e,a,e.improverModel,r,t);return c!==null?c:Mg(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var yc,W_,l7,dD,cD,c7,d7,Ug,uD,pD,u7,p7,In,mD,gD,Sc=l(()=>{"use strict";E();dc();uc();we();Ve();Dt();xn();lD();Xw();yc=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),W_=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return yc(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},l7=e=>{let t=or(e);return NN(e)||t==="usage_limit"||t==="action_required"},dD=(e,t,r)=>l7(r)?yc(e,r.errorMessage,or(r)):W_(e,t,r.errorMessage),cD=e=>{let t=e.wizard;return t===void 0||oc(e).length===0?e:{...e,wizard:Ys({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},c7=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",d7=e=>{let t=e.wizard;if(t===void 0)return e;let r=ql({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Ys({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Ug=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),uD=e=>e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null,pD=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},u7=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=uD(e);if(n===null)return yc(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Ot(o),i=Ul({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:pD(e,"generalize")}),a=await Ze({writerAgent:n,prompt:i,workingDirectory:ue(e),signal:t});if(!a.ok)return r?.(n),dD(e,"generalize",a);try{let c=Rw(a.text),d=Ys({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Zl(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),u={...e,wizard:d};return Kl(d)?In({...u,wizard:{...d,gate:null}}):Ug(u,"generalize")}catch(c){return W_(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},p7=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=uD(e);if(n===null)return yc(e,"Choose a writer to suggest splits.");let s=Mt({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Bl({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:pD(e,"separate")}),a=await Ze({writerAgent:n,prompt:i,workingDirectory:ue(e),signal:t});if(!a.ok)return r?.(n),dD(e,"separate",a);try{let c=xw(a.text),d=Pw(c,o.variables),u=Ys({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:u};return Yl(d)?So(m,d[0]):Ug(m,"separate")}catch(c){return W_(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},In=e=>{let t=e.wizard;if(t===void 0)return e;let r=Ot(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},mD=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return yc(e,"This module is missing.");let n=Tr(r),s=wn(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==x?e.runnerModel:e.judgeModel!==x?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:ie(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},gD=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return L_(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return u7(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return p7(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await L_(e,t,r,o);if(W(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&oc(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=ce(s.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??0,reasons:S.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&Jl({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let u=cD(Ug(a,i));return Ao(u)}let c=Ug(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let u=vw({wizard:{...c.wizard,modules:c.wizard.modules.map((m,S)=>S===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:c7(s.status)});return{...c,wizard:u}})():c;return i==="evaluate"?cD(d):d7(d)}return s}return n.phase==="complete",e}});var ci,Bg=l(()=>{"use strict";E();we();ci=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:Lw(r,e.judgeModel===x),updatedAt:new Date().toISOString()}}});var di,Gg=l(()=>{"use strict";di=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var yt,fD,m7,hD=l(()=>{"use strict";E();Ve();Gg();Dt();p_();yt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fD=e=>{if(!W(e.status))return"";let t=ce(e.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??null,reasons:S.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=ht(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${yt(t.reasons.trim())}</p>`,i=e.status==="passed",a=di(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${yt(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${yt(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',u=n!==null?`<div class="alert-error">${yt(n)}</div>`:i?m7({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:ue(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${yt(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${yt(t.promptText)}</pre></details>`,m=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${m}</h2>${d}${o}${s}${u}</section>`},m7=e=>{let t=e.sourceSkill?.fileName??lc(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=xg(t,r),s=n.length>0&&Wz(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${yt(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${yt(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${yt(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${yt(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${yt(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${yt(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var yD,SD=l(()=>{"use strict";yD=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var AD,g7,qg,Qe,Vg,E_=l(()=>{"use strict";E();we();SD();mg();Dt();Gg();AD=["Generalize","Evaluate","Separate","Optimize modules"],g7=e=>{let t=xt(e),r=t>=0&&t<AD.length?AD[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},qg=(e,t)=>{let r=Cn(e),o=r===null?null:yD(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},Qe=(e,t)=>({title:e,detail:t,replyPreview:null}),Vg=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=Cn(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:FN(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!W(e.status)){let t=e.judgeModel;return Qe(`${ae(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!W(e.status)){let t=e.judgeModel;return Qe(`${ae(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===x?Qe(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?Qe(`${ae(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):Qe(`${ae(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===x){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==x?Qe(`${ae(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):Qe(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return Qe(`${ae(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ie(t);return Qe(`${ae(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return Qe(`${ae(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ie(t);return Qe(`${ae(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return Qe(`${ae(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===x){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return Qe("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return Qe(`${ae(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>ht(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=re(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||W(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?qg(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=di(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?qg(e,{title:`${g7(r)}${s}`,detail:t.length>0?t:n}):qg(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(W(e.status)){let t=e.errorMessage?.trim()??"";return qg(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var ar,Ac=l(()=>{"use strict";we();ar=e=>{if(e.status==="improving"&&e.improverModel===x)return!0;if(e.status!=="judging"||e.judgeModel!==x)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===x}});var bD,PD=l(()=>{"use strict";bD=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var bo,f7,wD,_D=l(()=>{"use strict";E();bo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),f7=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${bo(r)}</p>`},wD=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${bo(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${bo(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${bo(a)}.</p>`}<pre class="mono">${bo(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${ho(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${bo(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let u=e.avoid?.trim()??"",m=u.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${bo(u)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${f7(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${bo(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var bc,h7,vD,kD=l(()=>{"use strict";E();Dt();bc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),h7=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=ht(t.promptText),n=t.judgement?.reasons?`<p class="muted">${bc(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${bc(i)}.</p>`}<pre class="mono">${bc(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${ho(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,u=o===null?`<pre class="mono">${bc(d)}</pre>`:`<div class="alert-error">${bc(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${u}</article>`},vD=e=>e.revisions.map(t=>h7(e,t)).join("")});var CD,TD=l(()=>{"use strict";E();CD=e=>{if(W(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var lr,y7,R_,S7,A7,b7,P7,LD,WD,x_=l(()=>{"use strict";TD();lr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),y7="Stop this run? Writers will stop and the best prompt is kept.",R_="End the wizard? Writers will stop and progress from finished steps is kept.",S7="Skip this module and pause at the step gate?",A7=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${lr(y7)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${lr(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,b7=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${lr(R_)}"><input type="hidden" name="cycleId" value="${lr(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,P7=e=>{let t=lr(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${lr(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${lr(S7)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${lr(R_)}">End wizard</button>
    </form>
  </div>`},LD=e=>{let t=CD(e);return t==="none"?"":t==="legacy_stop"?A7(e.id):t==="wizard_end_only"?b7(e.id):P7(e)},WD=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=lr(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${lr(R_)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var ED,RD=l(()=>{"use strict";E();ni();ED=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=re(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${Rn(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${Rn(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${ie(r)}`}return""}});var w7,_7,xD,v7,ID,OD=l(()=>{"use strict";E();RD();c_();Ag();vg();w7=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',_7=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',xD=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),v7=(e,t,r)=>{let o=ri(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=ED(e,t),i=_g(e,t),a=w7(i),c=_7(i),d=oi(e,t,{forOutcomeSummary:!0}),u=`${a}<span class="sdlc-wizard-outcome-step-title">${xD(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${xD(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",S=i==="failed"&&t!=="wizard-4"?" open":"",h=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${h}"${m}${S}><summary aria-controls="${h}-body">${u}</summary><div class="sdlc-wizard-outcome-step-body" id="${h}-body">${o}</div></details>`},ID=e=>{let t=e.wizard;if(t===void 0||!W(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>v7(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var MD,ND,zD=l(()=>{"use strict";MD=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ND=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${MD(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${MD(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var I_,DD,O_=l(()=>{"use strict";I_=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,DD=(e,t)=>{if(I_(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var jD,$D=l(()=>{"use strict";jD=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var Kg,HD,FD=l(()=>{"use strict";E();O_();O_();$D();Kg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HD=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=re(t),o=ie(t),n=r.terminalStatusSuggestion==="passed"?"":jD(r,o),s=o-10,i=r.rows.map((c,d)=>{let u=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,h=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=u===void 0?c.status:DD(u,o),p=u!==void 0&&I_(u,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':y==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':y==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':Kg(y);return`<tr${h}><td>${Kg(c.title)}</td><td>${Kg(m)}</td><td>${c.tokens??"\u2014"}</td><td>${p}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${Kg(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var On,Jg,M_=l(()=>{"use strict";On=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Jg=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${On(r.fileName)}</code> \u2014 ${On(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${On(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${On(i.name)}</strong> <code>.cursor/skills/${On(i.fileName)}/SKILL.md</code></p><p class="muted">${On(i.description)}</p><p>${On(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var k7,UD,BD=l(()=>{"use strict";E();zD();FD();M_();k7=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UD=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!W(e.status)||t.modules.length===0)return"";let r=HD(e),o=ND(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=re(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${k7(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${Jg(e)}${a}${r}${o}</section>`}});var V,Yg=l(()=>{"use strict";E();V={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var Xg,N_=l(()=>{"use strict";Xg=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var GD,qD=l(()=>{"use strict";Yg();N_();GD=e=>{let t=Xg({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:V.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var Ir,Pc=l(()=>{"use strict";Ir=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var Or,Zg,z_=l(()=>{"use strict";E();Cg();hD();E_();Ac();PD();wg();_D();kD();x_();OD();BD();ni();qD();Ve();Pc();Or=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Zg=e=>{let t=!W(e.status)&&e.status!=="wizard_paused"&&!ar(e),r=Vg(e),o=fz(fw(bD(e)),e),n=W(e.status)?"":LD(e),s=ID(e),i=UD(e),a=fD(e),c=e.errorMessage===null?"":`<div class="alert-error">${Or(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",u=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?re(e.wizard):null,S=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,h=!t&&e.wizard!==void 0&&W(e.status)&&(e.wizard.phase==="complete"||re(e.wizard).passedModuleCount>0),y=h?S?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",p=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Or(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",b=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${Or(r.replyPreview)}</pre>`,A=r.detail.length===0&&p.length===0&&b.length===0||r.detail.length===0&&b.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Or(r.detail)}${u}</p>`}${b}</div>`,f=e.revisions.find(Wo=>Wo.roundNumber===e.currentRound),P=e.status==="improving"?En(e):null,_=xr(e),k=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),C=ar(e)?wD({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:P?.promptText??f?.promptText??"",score:P?.score??f?.judgement?.score??null,reasons:P?.reasons??f?.judgement?.reasons??null,avoid:P?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:k?1:0}):"",L=e.wizard!==void 0&&e.wizard.phase==="complete"&&W(e.status),R=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!L&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?ie(e.wizard):e.passScore,N=R?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${kg(I)}</div>`:"",U=e.status==="failed"?GD({status:e.status,errorKind:e.errorKind}):null,G=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':W(e.status)?U!==null?`<span class="${U.badgeClass}">${U.badgeLabel}</span>`:L&&m!==null&&!S?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",q=t?d:h?S?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',Ke=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Or(ut(ue(e)))}</li>`:"",_>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${Rn(_)} so far</li>`:""].filter(Wo=>Wo.length>0),H=Ke.length===0?"":`<ul class="sdlc-run-meta">${Ke.join("")}</ul>`,Ce=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,Jr=L?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,pr=L?"":N.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${Jr}</div>`:`<div class="sdlc-run-grid">${Jr}${N}</div>`,JC=vD(e),NG=e.wizard!==void 0&&W(e.status)&&e.revisions.every(Wo=>Wo.roundNumber===0&&(Wo.judgement===void 0||Wo.judgement===null)),zG=JC.length===0||NG?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${JC}</div></section>`,DG=`<p class="sdlc-run-goal" title="${Or(e.goal.trim())}">${Or(Ir(e.goal))}</p>`,jG=L?`${c}${i}${s}${C}${a}`:`${c}${pr}${C}${s}${a}`,$G='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',HG=L?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Or(e.updatedAt)}" aria-busy="${t?"true":"false"}">${$G}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${G}</div>${DG}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${q}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Or(r.title)}</h2>${A}${p}${HG}</div></div>${H}${Ce}</header>${jG}</section>${zG}`}});var VD,KD=l(()=>{"use strict";E();uc();VD=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Jl({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:Ao(e)}});var JD,YD=l(()=>{"use strict";E();Sc();JD=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Kl(t)?e:In({...e,wizard:{...t,gate:null}})}});var XD,ZD=l(()=>{"use strict";E();dc();XD=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Yl(t.splitOptions))return e;let r=t.splitOptions[0];return So(e,r)}});var C7,Mn,Qg=l(()=>{"use strict";KD();YD();ZD();pt();C7=e=>{let t=JD(e),r=VD(t);return XD(r)},Mn=(e,t)=>{let r=C7(t);return r!==t?(z(e,r),r):t}});var QD,Mr,wc=l(()=>{"use strict";E();QD=e=>ct.indexOf(e),Mr=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||W(e.status)?ct.length:t.gate!==null?QD(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?QD(t.phase):null}});var ej,tj=l(()=>{"use strict";ej=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Nn,rj,oj=l(()=>{"use strict";E();tj();Nn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rj=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Pn(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Nn(ej(o))}</pre></div>`:"",s=_n(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=Tr(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),u=ag(c),m=i[c]??"",S=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Nn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Nn(u)}">${Nn(S)}</label>
        ${h}
        <input class="input" type="text" id="${Nn(u)}" name="${Nn(u)}" value="${Nn(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var nj,sj=l(()=>{"use strict";nj={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var _c,T7,pe,Po=l(()=>{"use strict";sj();yo();_c=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),T7=e=>{let t=nj[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${_c(t.title)}" aria-describedby="${r}" aria-expanded="false">${Xe}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${_c(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${_c(t.example)}</span></span></button>`},pe=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${_c(r)}"`}>${_c(e)}</span>${T7(t)}</span>`});var St,ij,aj,lj=l(()=>{"use strict";E();cc();Yg();Po();St=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ij=e=>{let t=e.costControls;if(t===void 0||ei(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??dt({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${St(V.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${St(t.softWarnMessage??vn)}</p>`:"",d=Og({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${St(V.estimateOverCeilingWarn)}</p>`:"",u=e.wizard?.modules.length??0,m=u>0?`<p class="muted">Step 4 will optimize ${u} module${u===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
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
</section>`},aj=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!ei(r)}});var L7,cj,dj=l(()=>{"use strict";yo();L7=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cj=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${Xe}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${L7(t)}</pre></template>`}});var vc,uj,pj=l(()=>{"use strict";E();Yw();oj();r_();x_();M_();s_();lj();dj();vc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uj=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(aj(e))return ij(e);let n=ie(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?QN(r):"",a=o==="evaluate"?Jg(e):"",c=o==="evaluate"?ti({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",u=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(I=>{let N=I.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',U=I.recommended?' <span class="sdlc-badge">Recommended</span>':"",G=r.selectedSplitOptionId===I.id||r.selectedSplitOptionId===null&&I.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${vc(I.id)}" required${G}> <strong>${vc(I.title)}</strong>${N}${U}</label>${yg(e,I)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],h=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=m?.title??"Module",p=m?.prompt??"",b=m?.status==="pending",A=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${vc(y)}</p>${b?rj({cycle:e,modulePrompt:p}):""}<p class="muted">Test run prompt preview: ${vc(wn(p,Tr(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${ti({cycle:e,interactive:!1,caption:b?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",f=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":b?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",P=Vl(r),_=P===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${P}</p>`,k=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?cj(r.lastWriterParseFailureReply??""):"",C=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",L=t?.active===!0?" sdlc-wizard-gate-active":"",R=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${C}"`:"";return`<section class="card sdlc-wizard-gate${L}"${R}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${f}</p>
    ${k}
    ${_}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${vc(e.id)}">
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
    ${WD(e)}
  </section>`}});var W7,mj,gj=l(()=>{"use strict";E();vg();W7=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mj=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||W(e.status))return"";let r=(o,n)=>{let s=oi(e,o);return`<h2 class="sdlc-wizard-active-head">${W7(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var D_,fj,hj,wo,yj,ui=l(()=>{"use strict";E();pt();D_=new Map,fj=e=>{let t=new AbortController;return D_.set(e,t),t.signal},hj=e=>{D_.delete(e)},wo=e=>{D_.get(e)?.abort()},yj=(e,t)=>{let r=Z(e,t);return r===null||r.wizard!==void 0?!1:(W(r.status)||(z(e,{...r,status:"stopped",errorMessage:Sn,updatedAt:new Date().toISOString()}),wo(t)),!0)}});var Sj,Aj,j_,bj,$_=l(()=>{"use strict";E();wc();ui();Sj="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",Aj=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return ct[r]??null},j_=(e,t)=>{let r=Aj(t);if(r===null||e.wizard===void 0)return!1;let o=ct.indexOf(r);if(o===-1)return!1;let n=Mr(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<ct.length)},bj=(e,t)=>{let r=Aj(t);if(r===null||e.wizard===void 0||!j_(e,t))return e;wo(e.id);let o=ct.slice(ct.indexOf(r)),n=Fl(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var H_,Pj,wj=l(()=>{"use strict";$_();H_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Pj=(e,t)=>j_(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${H_(Sj)}"><input type="hidden" name="cycleId" value="${H_(e.id)}"><input type="hidden" name="wizardStepId" value="${H_(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var E7,_j,R7,vj,kj=l(()=>{"use strict";E();wc();pj();gj();wj();Ag();E7={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},_j=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),R7=(e,t,r)=>{let o=Pj(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${_j(t)}">
  <summary class="sdlc-wizard-accordion-summary">${_j(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${ri(e,t)}</div>
</details>`},vj=e=>{let t=e.wizard;if(t===void 0)return"";let r=Mr(e);if(r===null)return"";let o=ct.slice(0,r).map((i,a)=>R7(e,`wizard-${a+1}`,E7[i])),n=t.gate!==null?uj(e,{active:!0}):mj(e),s=r>=ct.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var ef,F_=l(()=>{"use strict";kj();n_();E();ef=e=>{if(e===null||e.wizard!==void 0&&W(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=vj(e),r=nz(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var x7,U_,Cj=l(()=>{"use strict";E();we();Ve();xn();x7=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},U_=async(e,t,r)=>{if(!x7(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===x)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=kw({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Ze({writerAgent:e.judgeModel,prompt:n,workingDirectory:ue(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=Tw(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var kc,tf,Tj,B_,Lj,Wj,Ej,rf,G_=l(()=>{"use strict";kc=g(require("node:fs")),tf=g(require("node:path")),Tj=e=>tf.default.join(tf.default.dirname(e),"prompt-optimizer-writer-ready.json"),B_=e=>{let t=Tj(e);if(!kc.default.existsSync(t))return{};try{let r=JSON.parse(kc.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},Lj=(e,t)=>{kc.default.mkdirSync(tf.default.dirname(e),{recursive:!0}),kc.default.writeFileSync(Tj(e),`${JSON.stringify(t,null,2)}
`)},Wj=(e,t)=>B_(e)[t]?.message??null,Ej=(e,t,r)=>{Lj(e,{...B_(e),[t]:{message:r}})},rf=(e,t)=>{let r=B_(e);r[t]!==void 0&&Lj(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var q_,of,nf,Rj,_e,zn=l(()=>{"use strict";E();m_();Sc();Cj();Ac();ui();G_();Qg();pt();q_=new Set,of={atMs:0,ids:[]},nf=async()=>{if(Date.now()-of.atMs<3e4)return of.ids;let e=await Rt({commands:fe({})});return of.atMs=Date.now(),of.ids=e.installedWriterIds,e.installedWriterIds},Rj=async(e,t,r)=>{let o=Z(e,t);if(o===null||r.aborted)return;let n=Mn(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(W(n.status)&&!s||n.status==="wizard_paused"||ar(n))return;if(s){let c=await U_(n,r,d=>{rf(e,d)});z(e,c);return}let i=await gD(n,c=>{rf(e,c)},r,c=>{Z(e,t)?.status==="stopped"||r.aborted||z(e,c)});if(!(Z(e,t)?.status==="stopped"||r.aborted)){if(z(e,i),W(i.status)){let c=await U_(i,r,d=>{rf(e,d)});z(e,c);return}await Rj(e,t,r)}},_e=(e,t)=>{if(q_.has(t))return;let r=Z(e,t);if(r===null)return;let o=Mn(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(W(o.status)&&!n||o.status==="wizard_paused"||ar(o))return;q_.add(t);let s=fj(t);Rj(e,t,s).finally(()=>{q_.delete(t),hj(t)})}});var _o,Cc=l(()=>{"use strict";z_();Qg();F_();zn();_o=(e,t)=>{let r=Mn(e,t);return _e(e,r.id),`${Zg(r)}${ef(r)}`}});var xj,Ij,Oj=l(()=>{"use strict";xj=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,Ij=e=>e!==null&&e>0});var I7,O7,M7,Mj,Nj=l(()=>{"use strict";E();Sc();Bg();dc();uc();ui();bg();bg();I7=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),O7=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ce(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},M7=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=re(o);return ci({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},Mj=(e,t)=>{if(!ac(e,t))return e;wo(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return In({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return Ao(O7(r));if(t==="wizard-3"){let n=o.splitOptions[0]??I7(o.templatedPrompt);return So(r,n)}return t==="wizard-4"?M7(r):e}});var sf,zj,V_=l(()=>{"use strict";E();Bg();ui();sf=e=>(wo(e.id),{...ci(e,"stopped"),errorMessage:ZP}),zj=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;wo(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var N7,Dj,jj,$j=l(()=>{"use strict";E();Sc();Bg();dc();uc();Cc();pt();zn();Oj();$_();Nj();V_();N7="Pick a revision scored above 0 before continuing to Separate.",Dj=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),jj=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=Z(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=Z(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(_o(e.storePath,d))};if(o==="wizard-stop-all"){let c=sf(s);return z(e.storePath,c),_e(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=zj(s);return z(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=bj(s,c);return z(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=Mj(s,c);return z(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&_e(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let u=t.get("wizardStepInstructions")?.trim()??"",m=Aw(s.wizard,d,c);m=Fl(m,d),m={...m,pendingStepInstructions:u};let S={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return z(e.storePath,S),_e(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(S=>S.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?Dj(s):In({...s,wizard:{...s.wizard,gate:null}});return z(e.storePath,m),_e(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),u=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=xj(s,u??-1);if(!Ij(m)){let h={...s,errorMessage:N7,updatedAt:new Date().toISOString()};return z(e.storePath,h),a(n),!0}let S=Ao({...s,wizard:{...s.wizard,evaluateSelectedRound:u}});return z(e.storePath,S),_e(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=Dj(s);return z(e.storePath,h),_e(e.storePath,n),a(n),!0}let u=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(h=>h.id===u);if(m===void 0){let h={...s,errorMessage:u.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return z(e.storePath,h),a(n),!0}let S=So(s,m);return z(e.storePath,S),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,u=d.currentModuleIndex,m=d.modules[u];if(m===void 0)return a(n),!0;if(!ei(s.costControls)){let b=t.get("confirmedTokenBudget")?.trim()??"",A=t.get("confirmedMaxSpendUsd")?.trim()??"";if(b.length===0){let P={...s,errorMessage:Xs,updatedAt:new Date().toISOString()};return z(e.storePath,P),a(n),!0}let f=Er({existing:s.costControls,confirmedTokenBudget:Number(b),confirmedMaxSpendUsd:A.length===0?null:Number(A),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!f.ok){let P={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,P),a(n),!0}s={...s,costControls:f.costControls,errorMessage:null,updatedAt:new Date().toISOString()},z(e.storePath,s)}let S=Dw({wizard:d,modulePrompt:m.prompt,posted:t});if(!S.ok){let b={...s,errorMessage:S.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,b),a(n),!0}let h={...d,parameterValues:S.parameterValues};if(m.status==="pending"){let b=mD({...s,wizard:{...h,gate:null}},u);return z(e.storePath,b),_e(e.storePath,n),a(n),!0}let y=u+1;if(y>=d.modules.length){let b=re(h),A=ci({...s,wizard:h},b.terminalStatusSuggestion);return z(e.storePath,A),_e(e.storePath,n),a(n),!0}let p={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...h,gate:"optimize_modules",currentModuleIndex:y},updatedAt:new Date().toISOString()};return z(e.storePath,p),a(n),!0}}return a(n),!0}});var z7,Hj,D7,K_,j7,Fj,Uj=l(()=>{"use strict";we();ui();V_();P_();Ng();Ac();pt();z7="Add a score from 0 to 100 and the reason for it.",Hj="Add a score from 1 to 100 and the reason for it.",D7="Write the next prompt.",K_="This step is not waiting for you.",j7=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},Fj=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=Z(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(z(e.storePath,sf(a)),{kind:"saved",cycleId:i}):yj(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=Z(e.storePath,r);if(o===null||!ar(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:K_};if(t==="manual-judge"){if(o.judgeModel!==x)return{kind:"invalid",cycle:o,errorMessage:K_};let i=j7(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?Hj:z7};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:Hj};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",u=zg(fc(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return z(e.storePath,u),{kind:"saved",cycleId:o.id}}if(o.improverModel!==x)return{kind:"invalid",cycle:o,errorMessage:K_};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:D7};let s=Mg(o,n);return z(e.storePath,s),{kind:"saved",cycleId:o.id}}});var Bj,Gj=l(()=>{"use strict";Bj=`<script>
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
</script>`});var qj,Vj=l(()=>{"use strict";qj=`<script>
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
</script>`});var Kj,Jj=l(()=>{"use strict";Kj=`<script>
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
</script>`});var Yj,Xj=l(()=>{"use strict";Yj=`<script>
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
</script>`});var Zj,Qj=l(()=>{"use strict";E();Ve();Zj=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:ut(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(ie(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!W(t.status)}}});var e$,t$=l(()=>{"use strict";e$=`<script>
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
</script>`});var r$,o$=l(()=>{"use strict";E();wc();Gg();r$=e=>{let t=di(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:W(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=Mr(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=re(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=re(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return W(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var n$,s$=l(()=>{"use strict";n$=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Nr,$7,H7,i$,a$=l(()=>{"use strict";o$();s$();Pc();Nr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$7=e=>e.wizard===void 0?"legacy":"wizard",H7=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Nr(t)}">`,o=r$(e),n=n$(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Nr(o.badgeClass)}">${Nr(o.badgeLabel)}</span>`,u=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Nr(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Nr(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${$7(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Nr(e.id)}">${Nr(Ir(e.goal))}</a><p class="muted">${Nr(a)}</p></div></div><div class="sdlc-history-row-actions">${u}${m}</div></li>`},i$=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>H7(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Nr(s)}</summary>${i}</details>`:i}});var J_,af,l$,F7,U7,Tc,c$,lf=l(()=>{"use strict";J_=g(require("node:fs")),af=g(require("node:path"));Ve();l$=/^[a-z0-9-]+$/,F7=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},U7=(e,t)=>{if(!l$.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let u=/^(name|description):\s*(.*)$/.exec(d.trim());if(u===null)continue;let m=F7(u[2]??"");u[1]==="name"&&m.length>0&&(o=m),u[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},Tc=e=>{let t=Rr(e);if(!t.ok)return[];let r=af.default.resolve(t.path,".cursor","skills"),o=[];try{o=J_.default.readdirSync(r)}catch{return[]}return o.filter(n=>l$.test(n)).flatMap(n=>{let s=af.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${af.default.sep}`))return[];try{let i=U7(J_.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},c$=(e,t)=>Tc(e).find(r=>r.fileName===t)??null});var d$,B7,u$,p$,m$=l(()=>{"use strict";Po();d$=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),B7=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),u$=e=>{if(e.length===0)return`<div class="field">${pe("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${d$(r.fileName)}">${d$(r.fileName)}</option>`).join("");return`<div class="field">${pe("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${B7(e)}</script>`},p$=`<script>
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
</script>`});var et,g$,f$=l(()=>{"use strict";E();Yg();cc();Po();et=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),g$=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=et(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=Qs({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??Wr(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),m=Og({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",S=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
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
</div>`}});var Ue,h$,y$,G7,S$,A$,b$,P$=l(()=>{"use strict";E();E_();we();Pc();wc();Ue=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),h$=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",y$=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,G7=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},S$=e=>e===x?"You":ae(e),A$=e=>{let t=G7(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ae(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Ue(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Ue(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Ue(S$(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Ue(S$(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Ue(r)}</dd></div>
    </dl>
  </details>`},b$=e=>{let t=e.wizard;if(t===void 0)return"";let r=Ir(e.goal),o=e.status==="wizard_paused",n=!W(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let u=Vg(e),m=y$(t),S=m===null?"":h$(m),h=Mr(e),y=S.length===0?"":h===null||h>=4?` <strong>${Ue(S)}</strong>`:` <strong>${Ue(S)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Ue(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Ue(u.title)}${y}</p>
    <p class="muted">${Ue(u.detail)}</p>
    <div class="actions">
      ${A$(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ue(e.id)}">Open this run</a>
    </div>
  </section>`}let s=y$(t),i=s===null?"Wizard":h$(s),a=Mr(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ue(r)}</h2>
    <p class="lede">Paused at <strong>${Ue(i)}</strong>${Ue(c)} (last updated ${Ue(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${A$(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ue(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Lc,w$,_$=l(()=>{"use strict";Po();Lc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),w$=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${Lc(n.id)}"${n.id===e.runner?" selected":""}>${Lc(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Lc(e.runner)}">Checking ${Lc(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${pe("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${pe("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Lc(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var v$,k$=l(()=>{"use strict";v$=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var pi,C$,T$,L$,W$,E$=l(()=>{"use strict";Po();pi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),C$=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${pi(c.id)}"${c.id===r?" selected":""}>${pi(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${pi(n)}</option>`;return`<div class="field">${pe(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},T$=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${pi(t)}">Checking ${pi(o)}\u2026</p>`},L$=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${pe(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${pi(r)}</textarea><span class="muted">${o}</span></div></details>`,W$=e=>{let t=`<div class="sdlc-writer">${C$("judge","Judge",e.judge,e.writers,"I'll score it")}${T$("judge",e.judge,e.writers)}${L$("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${C$("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${T$("improver",e.improver,e.writers)}${L$("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var R$,x$=l(()=>{"use strict";R$=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var Y_,I$,O$=l(()=>{"use strict";x$();Y_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),I$=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${R$.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${Y_(t.goal)}" title="${Y_(t.goal)}">${Y_(t.label)}</button>`).join("")}</div>`});var Wc,q7,V7,X_,M$=l(()=>{"use strict";E();Po();Wc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),q7=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},V7=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,X_=e=>{let t=q7(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=Nl(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${pe(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${Wc(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${Wc(e.inputId)}" class="sdlc-pass-range" type="range" name="${Wc(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${Wc(a)}"><span class="sdlc-pass-mark" style="left:${V7(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${Wc(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var J7,Z_,zr,N$,z$=l(()=>{"use strict";Ac();z_();Gj();Vj();Cg();Jj();Xj();Qj();t$();a$();lf();m$();Po();F_();f$();P$();Pc();_$();k$();E$();E();O$();M$();J7=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Z_='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',zr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),N$=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${zr(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${zr(e.skillNotice??"")}</div>`,o=`${hz}${yz}`,n=e.resumableWizardCycle??null,s=n===null?"":b$(n),i=ef(e.cycle),a=e.cycle===null?"":Zg(e.cycle),c=e.cycle!==null&&ar(e.cycle),d=Zj(e),u=J7(d.goal,d.prompt,e.canRun),m=W$({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),S=w$({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=`${X_({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${X_({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=g$({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),p=yw,b=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",A=e.cycle!==null&&W(e.cycle.status),f=d.running&&!A,P=A||f?"":" open",_=f?" sdlc-compose-run-focus":"",C=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${A?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,L=A?(()=>{let H=e.cycle!==null?Ir(e.cycle.goal):Ir(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${zr(H)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${C}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${C}</summary>`,R=A?" sdlc-compose-viewing-finished":"",I=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",N=c?"waiting":d.running?"running":"idle",U=d.running&&!c?' aria-busy="true"':"",G=`<section class="card sdlc-compose${R}${_}" id="prompt-optimizer-compose">
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
        ${u$(Tc(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${Z_}
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
            ${I$()}
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
            ${Z_}
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
        ${v$()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${Z_}
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
    </section>`,q=e.history.length>0?e$:"",Ke=`${""}${Yj}${Bj}${qj}${Kj}${p$}${q}`;return`${t}${r}${G}${s}${a}${i}${o}${i$(e.history,e.cycle?.id??null)}${Ke}`}});var Ec,Q_=l(()=>{"use strict";z$();Ec=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:N$(t)}))}});var D$,j$=l(()=>{"use strict";Uj();Cc();Q_();pt();zn();D$=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:Fj({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=Z(e.storePath,o.cycleId);return _e(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(_o(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Ec(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:sr(e.storePath),resumableWizardCycle:null}),!0)}});var $$,cf,ev=l(()=>{"use strict";E();$$=g(require("node:os")),cf=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??$$.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??zt()}}});var H$,mi,tv,F$,U$,Rc=l(()=>{"use strict";E();we();d_();H$=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,mi=e=>{let t=BN(e),r=Tn(e).map(s=>({id:s,label:gg[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},tv=(e,t,r)=>t===x||t!==null&&e.writers.some(o=>o.id===t)?t:r,F$=(e,t,r,o=null)=>({judge:tv(e,t,e.judge),improver:tv(e,r,e.improver),runner:tv(e,o,e.runner)}),U$=e=>e===Tg?{goal:Lg,prompt:Wg}:{goal:"",prompt:""}});var rv,B$=l(()=>{"use strict";rv=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var G$,Y7,q$,V$,K$,J$=l(()=>{"use strict";E();G$=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},Y7=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},q$=(e,t)=>e.has("earlyStop")?!0:t!=="run",V$=e=>{let t=G$(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=Y7(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=G$(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},K$=e=>zt(e)});var Y$,X$,df,ov=l(()=>{"use strict";E();we();Ve();Rc();B$();J$();Y$=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=rv(o);return n.ok?String(n.passScore):String(r)},X$=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return rv(n)},df=e=>{let t=F$(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=Y$(e.posted,"passScore",70),o=Y$(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),u=e.posted?.get("maxSpendUsd")?.trim()??"",m=e.posted?.get("intent")??"",S=e.posted===null?!0:q$(e.posted,m),h=(L,R)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:L,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:R,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:u,earlyStop:S});if(e.posted===null)return h(e.defaultFolder??Ln,null);let y=e.posted.get("folder")??Ln;if(e.posted.get("intent")==="choose-folder"){let L=e.pickFolder();return h(L===null?y:ut(L),null)}if((e.posted.get("intent")??"")!=="run")return h(y,null);let b=H$(e.goal,e.prompt);if(b!==null)return h(y,b);let A=X$(e.posted,"passScore",r);if(!A.ok)return h(y,A.errorMessage);let f=X$(e.posted,"modulePassScore",o);if(!f.ok)return h(y,f.errorMessage);let P=GN(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(P===null)return h(y,"Choose a judge and an improver.");let _=Rr(y);if(!_.ok)return h(y,_.errorMessage);let k=qN(e.installedIds,c,P.judge);if(k===null)return h(y,"Choose a runner for wizard step 4.");let C=V$({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return C.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:P.judge,improver:P.improver,workingDirectory:_.path,passScore:A.passScore,modulePassScore:f.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:k,runnerInstructions:a,costControls:K$(C.knobs)}:h(y,C.errorMessage)}});var gi,pf,X7,nv,Z$,uf,Q$,Z7,eH,sv,Q7,e9,t9,iv,tH,rH,oH=l(()=>{"use strict";gi=g(require("node:fs")),pf=g(require("node:path"));we();Ve();X7=["remember","choose-folder","run"],nv=()=>({folder:Ln,judge:"",improver:"",runner:""}),Z$=e=>pf.default.join(pf.default.dirname(e),"prompt-optimizer-preferences.json"),uf=e=>typeof e=="string"?e:"",Q$=e=>{let t=Z$(e);if(!gi.default.existsSync(t))return nv();try{let r=JSON.parse(gi.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return nv();let o=r,n=uf(o.folder).trim();return{folder:n.length===0?Ln:n,judge:uf(o.judge),improver:uf(o.improver),runner:uf(o.runner)}}catch{return nv()}},Z7=(e,t)=>{let r=Z$(e);gi.default.mkdirSync(pf.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;gi.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),gi.default.renameSync(o,r)},eH=(e,t)=>e===x||Tn(t).some(r=>r===e),sv=(e,t,r)=>e===null?t:e.length===0?"":eH(e,r)?e:t,Q7=(e,t)=>{if(e===null)return t;let r=Rr(e);return r.ok?r.display:t},e9=e=>{let t=Q$(e.storePath),r={folder:Q7(e.folder,t.folder),judge:sv(e.judge,t.judge,e.installedIds),improver:sv(e.improver,t.improver,e.installedIds),runner:sv(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||Z7(e.storePath,r)},t9=e=>{let t=Rr(e);return t.ok?t.display:Ln},iv=(e,t)=>eH(e,t)?e:"",tH=e=>{let t=Q$(e.storePath);return{selection:{...e.selection,judge:iv(t.judge,e.installedIds)||e.selection.judge,improver:iv(t.improver,e.installedIds)||e.selection.improver,runner:iv(t.runner,e.installedIds)||e.selection.runner},defaultFolder:t9(t.folder)}},rH=e=>{let t=e.posted.get("intent")??"";if(!X7.includes(t))return;let r=e.posted.get("folder");e9({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var nH,r9,o9,av,n9,mf,gf=l(()=>{"use strict";nH=g(require("node:os"));we();G_();xn();r9="Reply with the single word ok. Do not use tools.",o9=45e3,av=async(e,t)=>{if(t===x)return{ok:!0,message:"You will do this step."};let r=Wj(e,t);if(r!==null)return{ok:!0,message:r};let o=await Ze({writerAgent:t,prompt:r9,workingDirectory:nH.default.tmpdir(),timeoutMs:o9});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ae(t)} is ready.`;return Ej(e,t,n),{ok:!0,message:n}},n9=e=>[...new Set(e.filter(t=>t.length>0))],mf=async(e,t,r,o)=>{for(let n of n9([t,r,o??""])){let s=await av(e,n);if(!s.ok)return s.message}return null}});var lv,sH=l(()=>{"use strict";E();lv=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!W(r.status)&&!(t!==null&&r.id===t))return r;return null}});var iH,aH=l(()=>{"use strict";er();E();cc();Cc();ev();ov();Q_();pt();Ve();oH();lf();gf();sH();Qg();zn();iH=async e=>{let t=e.posted===null?tH({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=df({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>po("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(rH({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?ut(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await mf(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await Ec(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:ut(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:sr(e.route.storePath),resumableWizardCycle:lv(sr(e.route.storePath),null)});return}if(r.kind==="start"){let s=c$(r.workingDirectory,r.sourceSkillFile),i=Ig(rc({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=cf({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:Ww({...Hl(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(z(e.route.storePath,a),_e(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(_o(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:Z(e.route.storePath,e.cycleId);n!==null&&(n=Mn(e.route.storePath,n),_e(e.route.storePath,n.id)),await Ec(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:sr(e.route.storePath),resumableWizardCycle:lv(sr(e.route.storePath),n?.id??null)})}});var lH,cH=l(()=>{"use strict";pt();lH=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";Cz(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var dH,uH=l(()=>{"use strict";dH=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var pH,mH=l(()=>{"use strict";Iz();$j();j$();aH();cH();Rc();uH();zn();pH=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await nf(),o=mi(r),n=e.method==="POST"?dH(e.request.headers["content-type"],await e.readBody(e.request)):null;if(jj({posted:n,storePath:e.storePath,response:e.response})||await D$(e,n,o))return;let s=U$(t.searchParams.get("example")),i=lH({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=xz({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await iH({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:Rz(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var s9,gH,fH=l(()=>{"use strict";E();pt();s9=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",gH=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=Z(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!W(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=Ew({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${s9(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var hH,yH=l(()=>{"use strict";Cc();pt();hH=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:Z(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":_o(e.storePath,o)),!0}});var i9,SH,AH=l(()=>{"use strict";we();gf();i9=["claude-cli","codex","cursor","antigravity"],SH=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===x||i9.includes(t)?await av(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var bH,PH=l(()=>{"use strict";E();bH=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:Dl,page:jl,context:Ks,installedWriters:e,post:{method:"POST",url:Dl,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${Dl}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var ff,wH=l(()=>{"use strict";E();N_();ni();ff=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ce(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=W(e.status),n=e.errorKind??null,s=Xg({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:xr(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:Ks,page:`${jl}?cycle=${encodeURIComponent(e.id)}`}}});var F,a9,_H,vH,kH=l(()=>{"use strict";F=g(rs());E();a9=(0,F.isType)({goal:F.isString,prompt:F.isString,workingDirectory:F.isString,judge:(0,F.isUndefinedOr)(F.isString),improver:(0,F.isUndefinedOr)(F.isString),passScore:(0,F.isUndefinedOr)(F.isNumber),maxRounds:(0,F.isUndefinedOr)(F.isNumber),maxTrials:(0,F.isUndefinedOr)(F.isNumber),maxSpendUsd:(0,F.isUndefinedOr)(F.isNumber),earlyStop:(0,F.isUndefinedOr)(F.isBoolean),earlyStopFlatRounds:(0,F.isUndefinedOr)(F.isNumber),confirmedTokenBudget:(0,F.isUndefinedOr)(F.isNumber),confirmedMaxSpendUsd:(0,F.isUndefinedOr)(F.isNumber),rateUsdPer1kTokens:(0,F.isUndefinedOr)(F.isNumber)}),_H=e=>{let t=e?.trim()??"";return t.length===0?null:t},vH=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return a9(t)?t.workingDirectory.trim().length===0?{ok:!1,error:eg}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:_H(t.judge),improver:_H(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:eg}}});var Dr,l9,CH,TH,LH=l(()=>{"use strict";E();Dr=g(rs()),l9=(0,Dr.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:Dr.isNumber,confirmedMaxSpendUsd:(0,Dr.isUndefinedOr)(Dr.isNumber),rateUsdPer1kTokens:(0,Dr.isUndefinedOr)(Dr.isNumber)}),CH=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:l9(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},TH=(e,t)=>{let r=Er({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var c9,WH,EH=l(()=>{"use strict";E();we();ov();Rc();c9=e=>e.map(t=>t.id).join(", "),WH=e=>{let t=mi(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===x||n===x)return{ok:!1,error:hw,installedWriters:t.writers};if(o===null||n===null){let a=c9(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=df({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var d9,RH,xH=l(()=>{"use strict";E();ev();PH();wH();Rc();kH();LH();EH();pt();d9=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},RH=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let u=Z(e.storePath,t);return u===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:ff(u)}}let r=await e.handlers.readInstalledIds(),o=mi(r);if(e.method==="GET")return{status:200,body:bH(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let u=CH(e.rawBody);if(u.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(u.kind==="invalid")return{status:400,body:{ok:!1,error:u.error}};let m=Z(e.storePath,t);if(m===null)return{status:404,body:{ok:!1,error:"That run is not on this Mac."}};let S=TH(m,u.body);return S.ok?(z(e.storePath,S.cycle),{status:200,body:ff(S.cycle)}):{status:400,body:{ok:!1,error:S.error}}}let n=d9(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let u=Qs({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:u.targetTokenBudget,proposedTokenBudget:u.targetTokenBudget,estimatedSpendUsd:u.estimatedSpendUsd,rateUsdPer1kTokens:u.rateUsdPer1kTokens??null,proposalStub:u.stub===!0,confirmationRequired:!0}}}let s=vH(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=WH({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=rc({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:dt({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let u=Er({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!u.ok)return{status:400,body:{ok:!1,error:u.errorMessage}};c=u.costControls}let d=cf({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:Hl(i.prompt),runnerModel:i.runner,costControls:c});return z(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:ff(d)}}});var IH,OH=l(()=>{"use strict";zn();gf();xH();IH=async e=>{let t=await RH({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:nf,readWritersReady:mf,startCycle:_e}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var NH,u9,p9,MH,m9,zH,DH=l(()=>{"use strict";NH=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],u9=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},p9=e=>{let t={};for(let n of e)for(let s of new Set(NH(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},MH=(e,t)=>{let r=u9(NH(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},m9=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},zH=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=p9(e.map(i=>i.text)),s=MH(o,n);return e.map(i=>({id:i.id,score:m9(s,MH(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var cv,g9,f9,jH,h9,y9,S9,A9,dv,uv=l(()=>{"use strict";cv=g(require("node:path"));Ve();DH();lf();g9=5,f9=20,jH=280,h9=e=>[e.name,e.description,e.promptText].join(`
`),y9=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=jH?t:`${t.slice(0,jH-3)}...`},S9=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),A9=e=>e===void 0||!Number.isFinite(e)?g9:Math.min(f9,Math.max(1,Math.floor(e))),dv=e=>{let t=e.query.trim(),r=A9(e.limit),o=Rr(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=Tc(o.path),s=zH(n.map(d=>({id:d.fileName,text:h9(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=cv.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let u=i.get(d.id);return u===void 0?[]:[{skillId:u.fileName,name:u.name,description:u.description,score:d.score,sourcePath:cv.default.join(a,u.fileName,"SKILL.md"),excerpt:y9(u),source:"filesystem"}]});return{query:t,hits:c,context:S9(c)}}});var $H,HH=l(()=>{"use strict";uv();$H=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:dv({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var FH,UH=l(()=>{"use strict";HH();FH=async e=>{let t=$H({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var b9,pv,BH=l(()=>{"use strict";bz();mH();fH();yH();AH();OH();UH();b9=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},pv=async e=>{let t=b9(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await IH(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await FH(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:Az()})),!0):(await SH({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||gH({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||hH({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await pH(e),!0)}});var GH=l(()=>{"use strict";BH();uv();xn()});var Dn,xc,P9,w9,_9,v9,qH,VH=l(()=>{"use strict";Dn=g(require("node:fs")),xc=g(require("node:path")),P9="prompt-optimizer-cycles.json",w9="prompt-optimizer-preferences.json",_9="prompt-sdlc-cycles.json",v9="prompt-sdlc-preferences.json",qH=e=>{let t=xc.default.join(e,P9),r=xc.default.join(e,_9);if(Dn.default.existsSync(t)||!Dn.default.existsSync(r))return t;try{Dn.default.renameSync(r,t)}catch{return r}let o=xc.default.join(e,v9),n=xc.default.join(e,w9);if(Dn.default.existsSync(o)&&!Dn.default.existsSync(n))try{Dn.default.renameSync(o,n)}catch{}return t}});var fi,k9,mv,KH=l(()=>{"use strict";fi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),k9=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],mv=e=>{let t=k9.map(i=>`<option value="${fi(i.value)}">${fi(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${fi(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${fi(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${fi(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
    </section>`}});var Ic,XH,C9,ZH,T9,L9,QH,yf,JH,YH,W9,E9,jr,Oc,hf,R9,Sf,gv,x9,fv,eF,hv,tF,I9,O9,M9,rF,oF,nF,Mc=l(()=>{"use strict";Ic=g(require("node:fs")),XH=g(require("node:path")),C9="estimate-history.ndjson",ZH=100,T9=500,L9=2e4,QH=e=>XH.default.join(e,C9),yf=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,T9),JH=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,L9),YH=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,W9=e=>({...e,estimateTokens:YH(e.estimateTokens),actualTokens:YH(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),E9=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},jr=e=>{let t=QH(e);return Ic.default.existsSync(t)?Ic.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return E9(n)?[W9(n)]:[]}catch{return[]}}):[]},Oc=(e,t)=>{Ic.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Ic.default.writeFileSync(QH(e),r,"utf8")},hf=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),R9=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${hf(o.task)} | ${hf(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},Sf=e=>{let t=jr(e.reportsDir),r=yf(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Oc(e.reportsDir,[...s,n])},gv=e=>{let t=jr(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?yf(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Oc(e.reportsDir,[...i,s])},x9=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-ZH),fv=e=>[...jr(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),eF=e=>{let t=jr(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=JH(e.input),n=JH(e.output),s=yf(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Oc(e.reportsDir,[...c,a])},hv=(e,t)=>{let r=jr(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},tF=e=>({table:R9(x9(jr(e))),embedding:null}),I9=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},O9=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-ZH),M9=e=>{let t=I9(O9(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${hf(s.task)} | ${hf(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},rF=e=>{let t=jr(e.reportsDir),r=yf(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Oc(e.reportsDir,[...s,n])},oF=e=>{let t=jr(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Oc(e.reportsDir,[...s,n])},nF=e=>M9(jr(e))});var sF=l(()=>{"use strict";Mc()});var $r,yv,N9,Sv,z9,D9,Af,bf,j9,Av,iF=l(()=>{"use strict";sF();a_();$r=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yv=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},N9=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${yv(-r)} under`:`${yv(r)} over`},Sv=e=>e.toLocaleString("en-US"),z9=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${Sv(-r)} under`:`${Sv(r)} over`},D9=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},Af=e=>e===null?"\u2014":yv(e),bf=e=>e===null?"\u2014":Sv(e),j9=`(function () {
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
})();`,Av=e=>{let r=fv(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":N9(n.estimateSeconds,n.actualSeconds),u=n.estimateTokens===null||n.actualTokens===null?"no estimate":z9(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${$r(D9(i))}</button></td>
        <td>${$r(c)}</td>
        <td>${Af(n.estimateSeconds)}</td>
        <td>${Af(n.actualSeconds)}</td>
        <td>${$r(d)}</td>
        <td>${bf(n.estimateTokens)}</td>
        <td>${bf(n.actualTokens)}</td>
        <td>${$r(u)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${$r(c)}</p>
        <h2>Input</h2>
        <pre>${$r(i)}</pre>
        <h2>Output</h2>
        <pre>${$r(a)}</pre>
        <p>Time: estimated ${Af(n.estimateSeconds)} \xB7 actual ${Af(n.actualSeconds)} \xB7 ${$r(d)}</p>
        <p>Tokens: estimated ${bf(n.estimateTokens)} \xB7 actual ${bf(n.actualTokens)} \xB7 ${$r(u)}</p>
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
            ${Pg({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${j9}</script>`}
    </section>`}});var aF=l(()=>{"use strict";KH();iF()});var hi,$9,H9,bv,lF=l(()=>{"use strict";hi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$9=(e,t,r)=>{let o=hi(t),n=hi(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},H9=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${hi(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>$9(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${hi(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${hi(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${hi(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},bv=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(H9).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var cF=l(()=>{"use strict";lF()});var Nc,dF,uF,Pv,wv,_v,pF=l(()=>{"use strict";Nc=g(require("node:fs")),dF=g(require("node:path"));Cl();$m();uF=(e,t,r)=>Hs({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,Pv=(e,t,r)=>{let o=uF(e,t,r);if(o===null)return[];if(!Nc.default.existsSync(o))return[];let n=Nc.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},wv=e=>{let t=uF(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Cr(e.entry.prompt),output:Cr(e.entry.output)};Nc.default.mkdirSync(dF.default.dirname(t),{recursive:!0}),Nc.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},_v=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var F9,U9,zc,Pf,vv=l(()=>{"use strict";F9=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),U9=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,zc=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=F9(i.assistantOutput),d=c.length>0?`Assistant: ${U9(c,t)}`:null,u=[a,d].filter(m=>m!==null).join(`

`);if(u.length!==0){if(n+u.length>r&&o.length>0)break;o.unshift(u),n+=u.length}}return o.join(`

`)},Pf=e=>{let t=e.userMessage.trim(),r=zc({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var cr,Dc,Tv,B9,G9,kv,q9,Lv,wf,mF,gF,V9,yi,Wv,Cv,fF,K9,hF,Si,_f,jc,J9,$c,Ev,vf,kf,yF=l(()=>{"use strict";cr=g(require("node:fs")),Dc=g(require("node:path")),Tv=require("node:crypto");vv();B9="writer-sessions",G9="active-index.json",kv=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),q9=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Lv=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},wf=e=>{let t=Dc.default.join(e.installDir,B9);return cr.default.mkdirSync(t,{recursive:!0}),t},mF=e=>Dc.default.join(wf(e),G9),gF=(e,t)=>Dc.default.join(wf(e),`${t}.canonical.json`),V9=(e,t)=>Dc.default.join(wf(e),`${t}.continuation.json`),yi=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,Wv=e=>{let t=mF(e);if(!cr.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(cr.default.readFileSync(t,"utf8"));if(!kv(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!kv(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!q9(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},Cv=(e,t)=>{cr.default.writeFileSync(mF(e),JSON.stringify(t,null,2))},fF=(e,t)=>{cr.default.writeFileSync(gF(e,t.sessionId),JSON.stringify(t,null,2))},K9=(e,t)=>{cr.default.writeFileSync(V9(e,t.sessionId),JSON.stringify(t,null,2))},hF=(e,t)=>{let r=zc({turns:t.turns});K9(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Si=(e,t)=>{let r=gF(e,t);if(!cr.default.existsSync(r))return null;try{let o=JSON.parse(cr.default.readFileSync(r,"utf8"));return!kv(o)||typeof o.sessionId!="string"?null:o}catch{return null}},_f=(e,t=20)=>{let r=wf(e),o=cr.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Si(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},jc=(e,t,r)=>{let o=Lv(r);return Wv(e).entries.find(i=>yi(i)===yi({writerAgent:t,projectFolderPath:o}))?.sessionId??null},J9=(e,t,r,o)=>{let n=Wv(e),s=yi({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>yi(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];Cv(e,{entries:i})},$c=(e,t,r)=>{let o=(0,Tv.randomUUID)(),n=new Date().toISOString(),s=Lv(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return fF(e,i),hF(e,i),J9(e,t,s,o),o},Ev=(e,t,r)=>{let o=jc(e,t,r);return o!==null?o:$c(e,t,r)},vf=(e,t,r)=>{let o=Lv(r),n=Wv(e);if(o===null&&r===void 0){Cv(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=yi({writerAgent:t,projectFolderPath:o});Cv(e,{entries:n.entries.filter(i=>yi(i)!==s)})},kf=e=>{let t=Ev(e.layout,e.writerAgent,e.projectFolderPath),r=Si(e.layout,t);if(r===null)return;let o={id:(0,Tv.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};fF(e.layout,n),hF(e.layout,n)}});var Y9,X9,Cf,Rv,SF=l(()=>{"use strict";Y9=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",X9=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},Cf=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",Rv=e=>{let t=Cf(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=Y9(r,e.userPromptCharacterCount),n=X9({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var Tf=l(()=>{"use strict";pF();yF();vv();SF()});var AF=l(()=>{"use strict";bp();Ps();GS()});var bF=l(()=>{"use strict";AS()});var tt,Q9,eY,xv,Iv,Ov,PF=l(()=>{"use strict";AF();bF();tt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Q9=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},eY=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=Ia(o);return`value="${tt(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${tt(r)}"`},xv=(e,t,r,o,n)=>{let s=Pp[t];return`<label class="field">
          <span class="field-label">${tt(o)} API key \u2014 ${tt(Q9(e,t))} \xB7 <a class="field-link" href="${tt(s.href)}" target="_blank" rel="noopener noreferrer">${tt(s.label)}</a></span>
          <input class="input mono" type="password" name="${tt(r)}" autocomplete="off" ${eY(e,t,n)} />
        </label>`},Iv=(e,t,r,o)=>{let n=pp(e[t]?.model),s=new Set(up[t].map(c=>c.value)),i=up[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${tt(c.value)}"${d}>${tt(c.label)}</option>`}).join(""),a=n!==Qo&&!s.has(n)?`<option value="${tt(n)}" selected>${tt(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${tt(o)}</span>
          <select class="input mono" name="${tt(r)}">${i}${a}</select>
        </label>`},Ov=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${tt(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${xv(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${Iv(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${xv(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${Iv(e.secrets,"openai","openaiModel","OpenAI model")}
        ${xv(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${Iv(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var wF=l(()=>{"use strict";PF()});var Lf,_F,vF=l(()=>{"use strict";Lf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_F=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${Lf(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${Lf(s.name)}</strong> <span class="muted mono">(${Lf(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${Lf(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var tY,kF,CF,TF=l(()=>{"use strict";tY=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,kF=e=>e.kind==="folder",CF=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&kF(d)){s=d;continue}let u={kind:"folder",name:a,children:new Map};s.children.set(a,u),s=u}}let r=o=>{let n=[];for(let s of o.children.values()){if(kF(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(tY)};return r(t)}});var LF,Mv,WF=l(()=>{"use strict";LF=g(require("node:path")),Mv=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Mv(r.children,t)}</ul>
            </details>
          </li>`;let o=LF.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var EF,vo,rY,oY,Hc,nY,Nv,RF=l(()=>{"use strict";Gm();EF=g(require("node:path"));vF();TF();WF();vo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rY=()=>`(() => {
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

})();`,oY=()=>`(() => {
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
})();`,Hc=e=>{let t=Rl({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=_F({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${vo(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${vo(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':nY(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
    <script>${rY()}</script>
    <script>${oY()}</script>`;return`${t}${r}${o}${c}${d}`},nY=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=CF(a.items.map(S=>({...S,relativePath:typeof S.relativePath=="string"&&S.relativePath.length>0?S.relativePath:EF.default.relative(a.sourceRoot,S.sourcePath).replaceAll("\\","/")}))),u=Mv(d,vo),m=a.items.length;return`<div class="harness-set-block">
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
    </form>`},Nv=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=a.trim();Number.isFinite(d)&&u.length>0&&n.set(d,u)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??u??a,S=t.sets[i];if(S===void 0)continue;let h=a.length>0?a:S.proposedSlug,y=m.length>0?m:S.proposedName,p=r.has(i),b=S.items.map(A=>({id:A.id,kind:A.kind,title:A.title,sourcePath:A.sourcePath,include:p}));s.push({slug:h,name:y,items:b})}return s}});var xF=l(()=>{"use strict";RF()});var sY,zv,IF=l(()=>{"use strict";_r();sY=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},zv=sY});var iY,OF,MF=l(()=>{"use strict";_r();iY=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},OF=iY});var NF=l(()=>{"use strict"});var jn,aY,Dv,zF=l(()=>{"use strict";Gm();QA();jn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aY=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,Dv=e=>{let t=e.flashError?`<div class="alert-error">${jn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${jn(e.flashMessage)}</div>`:"",r=Rl({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${jn(aY(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,u=`<a class="btn btn-secondary btn-compact" href="${jn(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=lm(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
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
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var DF=l(()=>{"use strict";NF();cm();zF()});var Wf,jF=l(()=>{"use strict";Wf=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var $F,$t,jv=l(()=>{"use strict";$F=g(require("node:path"));gt();Me();J();le();UA();$t=e=>{let t=$()?.layout.installDir??T();if($F.default.basename(t)===Bt)return it;let r=$(),o=r!==null?Le(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):it}});var $v,HF=l(()=>{"use strict";Kt();jv();$v=async e=>{let t=De(e.installDir),r=t?.bundleVersion??null,o=$t(t);try{let n=await gs(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Bo(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var Hv,FF=l(()=>{"use strict";Hv=e=>!e});var Fv,Ai,Uv=l(()=>{"use strict";J();Fv=()=>`http://127.0.0.1:${Sy()}/update/run`,Ai=async e=>{try{let t=await fetch(Fv(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var lY,UF,Bv,BF=l(()=>{"use strict";J();se();Uv();lY=()=>{hr({launchAgentLabel:Te(),installDir:T()})},UF=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Bv=async()=>{lY();let e=await Ai({force:!0});if(e.ok)return{ok:!0,message:UF(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:UF(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Kt(),XW)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var Gv=l(()=>{"use strict";BP();jF();jv();HF();FF();BF();Uv()});var GF,qF=l(()=>{"use strict";GF=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var VF,KF,qv,Vv,JF=l(()=>{"use strict";VF=require("node:crypto"),KF=g(require("node:fs"));er();le();le();qF();qv=!1,Vv=async e=>{if(qv)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!GF(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=X({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&KF.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,VF.randomUUID)();qv=!0;try{if(await BA(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await _s({...r,workspace:n},e.writerAgent,t);return await tl(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{qv=!1}}});var YF=l(()=>{"use strict";JF()});var At,cY,XF,ZF,Kv,Jv,Yv,Xv,Zv,Qv,ek=l(()=>{"use strict";At=require("node:crypto"),cY=Buffer.from("302a300506032b6570032100","hex"),XF=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},ZF=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,At.createPublicKey)({key:Buffer.concat([cY,t]),format:"der",type:"spki"})},Kv=()=>{let{publicKey:e,privateKey:t}=(0,At.generateKeyPairSync)("ed25519");return{publicKeyRaw:XF(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Jv=e=>(0,At.createPrivateKey)(e),Yv=(e,t)=>(0,At.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),Xv=(e,t,r)=>{try{let o=ZF(e);return(0,At.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},Zv=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,Qv=()=>(0,At.randomBytes)(32).toString("base64url")});var Hr,Ef,QF,dY,uY,Rf,tk,rk,e1=l(()=>{"use strict";Hr=g(require("node:fs")),Ef=g(require("node:path"));ek();J();Me();QF=e=>Ef.default.join(e.installDir,Yr),dY=(e,t)=>{if(e.profileEmail===null||t===QF(e)||Hr.default.existsSync(t))return;let r=QF(e);Hr.default.existsSync(r)&&(Hr.default.mkdirSync(Ef.default.dirname(t),{recursive:!0}),Hr.default.renameSync(r,t))},uY=e=>{if(!Hr.default.existsSync(e))return null;try{let t=Hr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Rf=e=>{let t=Iu(e);dY(e,t);let r=uY(t);if(r!==null)return r;let o=Kv();return Hr.default.mkdirSync(Ef.default.dirname(t),{recursive:!0}),Hr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},tk=e=>{let t=Rf(e.layout),r=Qv(),o=Zv({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=Jv(t.privateKeyPem),s=Yv(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},rk=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return Xv(e.serverPublicKey,t,e.serverAttestation)}});var ok=l(()=>{"use strict";e1();ek()});var n1,Fc,ik,ak,t1,pY,nk,xf,me,s1,mY,sk,gY,fY,lk,ye,ve,Ht,hY,r1,o1,Uc,Bc,i1=l(()=>{"use strict";n1=g(require("node:http")),Fc=g(require("node:fs")),ik=g(require("node:path"));If();_l();oO();sO();uO();Xo();SP();FP();$O();FO();GH();VH();aF();cF();Tf();wF();xF();ao();er();_r();IF();MF();DF();Gv();Kt();YF();le();ok();ak=e=>iP(e)??"never",t1=48e3,pY=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,nk=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Yp(),reveal:t.reveal,installed:Qt(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),xf=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:lo(t,e)},me=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),s1=200,mY=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',sk=e=>{let t=e.trim().slice(0,s1),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},gY=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${me(t)}</div>`,fY=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${me(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',lk={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},ye=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...lk}),e.end(JSON.stringify(r))},ve=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},Ht=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},hY=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=mY(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${me(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=Hv(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${vl(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${me(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${me(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${me(ak(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${me(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},r1=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},o1=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,s1)},Uc=e=>{let t=ik.default.join(e.layout.installDir,"link-code.txt"),r=()=>De(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:Wf(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let y=h.installVersion??r(),p=await i(),b=KP(p),A=h.updateFlash??null,f=JP(A),P=gY(A,h.updateError??null);return qP({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:$t(y),installBundleVersionLabel:Wf(y),prependBody:`${f}${P}${b}`,headerUpdateButtonHtml:VP(p)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await $v(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:sk("An update is already running.")}),h.end();return}c=!0;try{let p=await Bv(),b=p.ok?"/?update=ok":sk(p.message);h.writeHead(303,{Location:b}),h.end()}catch(p){let b=p instanceof Error&&p.message.trim().length>0?p.message:"Install bundle update failed.";h.writeHead(303,{Location:sk(b)}),h.end()}finally{c=!1,a()}},u=async(h,y)=>{let p=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",b=o(),A=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:b.installVersion,body:`<section class="card">
      <h1>${me(y)}</h1>
      <p>${me(p)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(A)},m=()=>{if(Fc.default.existsSync(t))return Fc.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return Fc.default.writeFileSync(t,h,"utf8"),h},S=n1.default.createServer((h,y)=>{(async()=>{let p=h.url?.split("?")[0]??"/",b=h.method??"GET";if(b==="OPTIONS"){y.writeHead(204,lk),y.end();return}if(!await pv({method:b,pathname:p,request:h,response:y,requestUrl:h.url??"/",storePath:qH(ik.default.dirname(e.layout.configPath)),readBody:Ht,sendHtml:ve,renderShell:n})){if(b==="GET"&&p==="/health"){let A=e.controllers.getStatus(),f=o();ye(y,200,{ok:!0,...A,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt});return}if(b==="GET"&&p==="/api/status"){let A=o();ye(y,200,{...e.controllers.getStatus(),linkCode:m(),installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt});return}if(b==="GET"&&p==="/api/traffic"){ye(y,200,{entries:Pl(e.layout)});return}if(b==="DELETE"&&p==="/api/traffic"||b==="POST"&&p==="/api/traffic/clear"){if(cP(e.layout),b==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}ye(y,200,{ok:!0});return}if(b==="GET"&&p==="/api/trace"){ye(y,200,{entries:Nm(e.layout)});return}if(b==="DELETE"&&p==="/api/trace"||b==="POST"&&p==="/api/trace/clear"){if(pP(e.layout),b==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}ye(y,200,{ok:!0});return}if(b==="POST"&&p==="/api/errors/clear"){mP(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(b==="GET"&&p==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let P=await Us({layout:e.layout,query:f,limit:20});ye(y,200,{chunks:P,query:f});return}ye(y,200,{chunks:Fs(e.layout).slice(-50).reverse()});return}if(b==="POST"&&p==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(b==="GET"&&p==="/api/update-status"){let A=await i();ye(y,200,{ok:!0,...A});return}if((b==="GET"||b==="POST")&&p==="/api/update"){await d(y);return}if(b==="GET"&&p==="/"){let A=e.controllers.getStatus(),f=o(),P=Qt(e.layout),_=zm(e.layout.errorLogPath);ve(y,await n({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:r1(h.url??void 0),updateError:o1(h.url??void 0),body:YP({wsConnected:A.wsConnected,lastHeartbeatAt:A.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:P.sets.length,knowledgeChunkCount:Fs(e.layout).length,trafficEntryCount:Pl(e.layout).length,wakeError:A.wakeError,errorLogByteSize:_.byteSize,errorLogExists:_.exists})}));return}if(b==="GET"&&p==="/task"){let A=e.controllers.getStatus(),f=o(),P=$(),_=new URL(h.url??"/",`http://127.0.0.1:${43347}`),k=_.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,C=_.searchParams.get("failed")==="1"?_.searchParams.get("error")?.trim()??"Task failed.":null,L=_.searchParams.get("runId");ve(y,await n({title:"Task",activePath:"/task",installVersion:f.installVersion,body:mv({defaultWorkspace:P?.workspace??"",wsConnected:A.wsConnected,flashMessage:k,flashError:C,lastRunId:L})}));return}if(b==="POST"&&p==="/task/dispatch"){let A=await Ht(h),f=new URLSearchParams(A),P=f.get("prompt")?.trim()??"",_=f.get("writerAgent")?.trim()??"claude-cli",k=f.get("projectFolder")?.trim()??"",C=await Vv({prompt:P,writerAgent:_,...k.length>0?{projectFolderPath:k}:{}}),L=new URLSearchParams;C.ok?L.set("ok","1"):(L.set("failed","1"),C.errorMessage!==void 0&&L.set("error",C.errorMessage.slice(0,240))),C.agentRunId!==void 0&&L.set("runId",C.agentRunId),y.writeHead(303,{Location:`/task?${L.toString()}`}),y.end();return}if(b==="GET"&&p==="/writer-sessions"){let A=o(),f=_f(e.layout,12);ve(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:A.installVersion,updateFlash:r1(h.url??void 0),updateError:o1(h.url??void 0),body:bv({sessions:f})}));return}if(b==="GET"&&p==="/errors"){let A=o(),f=zm(e.layout.errorLogPath);ve(y,await n({title:"Errors",activePath:"/errors",installVersion:A.installVersion,body:fP({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(b==="GET"&&p==="/status"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),P=he(e.layout),_=P!==null?We(P,12e4):AP(f.lastHeartbeatAt,12e4),k=bP({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:_}),C=o();ve(y,await n({title:"Status",activePath:"/status",installVersion:C.installVersion,body:`${hY({status:f,healthBadge:k,revived:A.searchParams.get("revived")==="1",linkCode:m(),installBundleVersion:C.installBundleVersion,installBundleUpdatedAt:C.installBundleUpdatedAt})}${_P({installDir:e.layout.installDir})}${wP({entries:Nm(e.layout)})}`}));return}if(b==="GET"&&p==="/traffic"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=Pl(e.layout),P=o(),_=f.map(L=>`<tr><td title="${me(L.at)}">${me(ak(L.at))}</td><td>${me(L.direction)}</td><td><code>${me(L.type)}</code></td><td>${me(L.summary)}</td><td>${me(L.action??"")}</td></tr>`).join(""),k=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${_}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',C=A.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";ve(y,await n({title:"Traffic",activePath:"/traffic",installVersion:P.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${C}
              ${k}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(b==="GET"&&p==="/projects"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),P=$t(f.installVersion),_=await xf(e.layout),k=A.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":A.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,C=A.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,L=$(),R=L===null?null:X({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),I=R===null?{}:Object.fromEntries((await Promise.all(_.projects.map(async N=>{let U=await zv(R,N.id);return[N.id,U?.counts??null]}))).filter(N=>N[1]!==null));ve(y,await n({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:Dv({projects:_.projects,compositionCountsByProjectId:I,cloudAppOrigin:P,syncMessage:_.message,syncOk:_.ok,flashMessage:C,flashError:k})}));return}if(b==="GET"&&p==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",P=$(),_=P===null?null:X({wsUrl:P.wsUrl,pairingToken:P.pairingToken}),k=f.length>0&&_!==null?po():null;if(k===null||_===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Ge({projectFolderPath:k}),!await sl(_,f,k)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(b==="POST"&&p==="/projects/delete"){let A=await Ht(h),f=new URLSearchParams(A).get("projectId")?.trim()??"",P=$(),_=P===null?null:X({wsUrl:P.wsUrl,pairingToken:P.pairingToken});if(_===null||f.length===0){y.writeHead(303,{Location:"/projects?deleteError=1"}),y.end();return}let k=await cb(_,f);y.writeHead(303,{Location:k.ok?"/projects?deleted=1":"/projects?deleteError=1"}),y.end();return}if(b==="GET"&&p==="/project"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=A.searchParams.get("id")?.trim()??"",P=o(),_=$t(P.installVersion),k=await xf(e.layout),C=vr(k.projects,f);if(C===null){await u(y,"Project not found");return}let L=A.searchParams.get("linked")==="1"?A.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${A.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${A.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:A.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,R=A.searchParams.get("knowledgePromoted"),I=R!==null?`Marked ${R} lesson(s) as promoted in Agent Witch.`:null,N=A.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,U=A.searchParams.get("tab")?.trim()??"harness",G=U==="workflows"||U==="agents"||U==="knowledge"?U:"harness",q=$(),Ke=q===null?null:X({wsUrl:q.wsUrl,pairingToken:q.pairingToken}),H=Ke===null?null:await zv(Ke,C.id),Ce=0;if(Ke!==null)try{let Jr=await fetch(`${Ke.appOrigin}/api/agent-witch/projects/${encodeURIComponent(C.id)}/knowledge`,{method:"GET",headers:{[$e]:Ke.pairingToken},signal:AbortSignal.timeout(1e4)});if(Jr.ok){let pr=await Jr.json();typeof pr=="object"&&pr!==null&&typeof pr.candidateCount=="number"&&(Ce=pr.candidateCount)}}catch{Ce=0}ve(y,await n({title:C.name,activePath:"/projects",installVersion:P.installVersion,body:co({project:C,cloudAppOrigin:_,installed:Qt(e.layout),linkedSetSlugs:Xt(C.projectFolderPath),composition:H,knowledgeCandidateCount:Ce,activeTab:G,flashMessage:L??I,flashError:N})}));return}if(b==="POST"&&p==="/projects/pull-bound-harness"){let A=await Ht(h),f=await eb({rawBody:A,layout:e.layout});if(f.kind==="not_found"){await u(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let P=o();ve(y,await n({title:f.title,activePath:"/projects",installVersion:P.installVersion,body:f.body}));return}if(b==="POST"&&p==="/projects/link-harness"){let A=await Ht(h),f=new URLSearchParams(A),P=f.get("projectId")?.trim()??"",_=await xf(e.layout),k=vr(_.projects,P);if(k===null){await u(y,"Project not found");return}let C=f.getAll("applySet").map(G=>String(G)),L=qa({layout:e.layout,projectFolderPath:k.projectFolderPath,setSlugs:C});if(!L.ok){let G=o(),q=$t(G.installVersion);ve(y,await n({title:k.name,activePath:"/projects",installVersion:G.installVersion,body:co({project:k,cloudAppOrigin:q,installed:Qt(e.layout),linkedSetSlugs:Xt(k.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:L.errorMessage})}));return}let R=$(),I=R===null?null:X({wsUrl:R.wsUrl,pairingToken:R.pairingToken}),N=I===null?!1:await cn(I,k.id,L.appliedSetSlugs),U=new URLSearchParams({linked:"1",files:String(L.writtenFileCount),bindingsSynced:N?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(k.id)}&${U.toString()}`}),y.end();return}if(b==="POST"&&p==="/projects/remove-harness-set"){let A=await Ht(h),f=await tb({rawBody:A,layout:e.layout});if(f.kind==="not_found"){await u(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let P=o();ve(y,await n({title:f.title,activePath:"/projects",installVersion:P.installVersion,body:f.body}));return}if(b==="POST"&&p==="/project/knowledge/promote-all"){let A=await Ht(h),P=new URLSearchParams(A).get("projectId")?.trim()??"",_=await xf(e.layout),k=vr(_.projects,P);if(k===null){await u(y,"Project not found");return}let C=$(),L=C===null?null:X({wsUrl:C.wsUrl,pairingToken:C.pairingToken}),R=L===null?{ok:!1,promotedCount:0}:await OF(L,k.id),I=new URLSearchParams({tab:"knowledge",...R.ok?{knowledgePromoted:String(R.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(k.id)}&${I.toString()}`}),y.end();return}if(b==="GET"&&p==="/harness"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),P=Ya(e.layout),_=A.searchParams.get("submitted")==="1",k=_?A.searchParams.get("syncFailed")==="1"?`Local harness updated (${A.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:A.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${A.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":A.searchParams.get("stopped")==="1"?`Reveal stopped. ${P?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:A.searchParams.get("revealed")==="1"?`Reveal found ${P?.sets.length??0} set(s).`:null,C=P?.scanRoots[0]??Yp(),L=pY(e.layout,{reveal:P,importQuery:A.searchParams.get("import")==="1",justSubmitted:_}),R=$t(f.installVersion);ve(y,await n({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:Hc(nk(e.layout,{cloudAppOrigin:R,reveal:P,scanFolder:C,flashMessage:k,importSectionExpanded:L}))}));return}if(b==="POST"&&p==="/api/harness/pick-folder"){let A=po();if(A===null){ye(y,200,{cancelled:!0});return}ye(y,200,{path:A});return}if(b==="GET"&&p==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",P=Ga(f);if(P===null){ye(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let _=Fc.default.readFileSync(P,"utf8"),k=_.length>t1?`${_.slice(0,t1)}
\u2026 (truncated)`:_;ye(y,200,{content:k})}catch{ye(y,500,{errorMessage:"Could not read file."})}return}if(b==="POST"&&p==="/api/harness/reveal/add-project"){let A=await Ht(h),f="";try{let k=JSON.parse(A);typeof k=="object"&&k!==null&&typeof k.projectPath=="string"&&(f=k.projectPath.trim())}catch{ye(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){ye(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let P=Ya(e.layout),_=IA({reveal:P,projectPath:f});if(_===null||_.sets.length===0){ye(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}em(e.layout,_),ye(y,200,{ok:!0,setCount:_.sets.length});return}if(b==="GET"&&p==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){ye(y,400,{errorMessage:"Choose a folder to scan first."});return}let P=!1;h.on("close",()=>{P=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...lk});let _=OA({scanRoot:f,response:y,shouldAbort:()=>P});em(e.layout,_),y.end();return}if(b==="POST"&&p==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(b==="POST"&&p==="/harness/submit"){let A=Ya(e.layout);if(A===null){let R=o(),I=$t(R.installVersion);ve(y,await n({title:"Harness",activePath:"/harness",installVersion:R.installVersion,body:Hc(nk(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await Ht(h),P=new URLSearchParams(f),_=Nv(P,A),k=NA({layout:e.layout,sets:_});if(!k.ok){let R=o(),I=$t(R.installVersion);ve(y,await n({title:"Harness",activePath:"/harness",installVersion:R.installVersion,body:Hc(nk(e.layout,{cloudAppOrigin:I,reveal:A,flashError:k.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}DA(e.layout);let L=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${k.writtenItemCount??0}${L}`}),y.end();return}if(b==="GET"&&p==="/writer-api"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),P=$()?.writerExecutionBackend??je(void 0),_=Re(e.layout.configPath),k=ro(_),C=A.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,L=o();ve(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:L.installVersion,body:Ov({writerExecutionBackend:P,secrets:k,flashMessage:C})}));return}if(b==="POST"&&p==="/writer-api"){let A=await Ht(h),f=new URLSearchParams(A),P=f.get("writerExecutionBackend")?.trim()??"cli";BS({configPath:e.layout.configPath,writerExecutionBackend:je(P),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(b==="GET"&&p==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(b==="GET"&&p==="/history"){let A=o();ve(y,await n({title:"History",activePath:"/history",installVersion:A.installVersion,body:Av({reportsDir:e.layout.reportsDir})}));return}if(b==="GET"&&p==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",P=o(),_=EP({layout:e.layout}),k=IP(_),C=f.length>0?await Us({layout:e.layout,query:f,limit:20}):Fs(e.layout).slice(-50).reverse(),L=C.map(I=>{let N=xP(_,I.id),U=N>0?` \xB7 used in ${N} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${me(I.createdAt)}">${me(ak(I.createdAt))}${I.source?` \xB7 ${me(I.source)}`:""}${U}</div><pre>${me(I.text)}</pre></article>`}).join(""),R=k.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${k.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${me(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";ve(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:P.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${me(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${fY(f,C.length)}
            </section>${R}${L}`}));return}b==="POST"&&await Ht(h),await u(y,"Not found")}})().catch(p=>{console.error("[agent-witch-local-app]",p),y.writeHead(500),y.end("Internal error")})});return S.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),S.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Sr}`)}),S},Bc=e=>Rf(e).publicKeyRaw});var If=l(()=>{"use strict";HI();FI();i1()});var l1={};Ut(l1,{runAgentWitchExternalLiveCli:()=>SY});var ck,a1,yY,SY,c1=l(()=>{"use strict";ck=g(require("node:fs")),a1=g(require("node:path"));Xo();J();se();If();se();yY=e=>{let t=a1.default.join(e,"link-code.txt");if(!ck.default.existsSync(t))return null;let r=ck.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},SY=()=>{nt("agent-witch-live");let e=T(),t=M(),r=yY(e),o=Bc(t);Uc({layout:t,controllers:{getStatus:()=>{let n=he(t);return{wsConnected:Pa(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{jo(e)}}})}});var Fr=v((KOe,p1)=>{"use strict";var d1=["nodebuffer","arraybuffer","fragments"],u1=typeof Blob<"u";u1&&d1.push("blob");p1.exports={BINARY_TYPES:d1,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:u1,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Gc=v((JOe,Of)=>{"use strict";var{EMPTY_BUFFER:AY}=Fr(),dk=Buffer[Symbol.species];function bY(e,t){if(e.length===0)return AY;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new dk(r.buffer,r.byteOffset,o):r}function m1(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function g1(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function PY(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function uk(e){if(uk.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new dk(e):ArrayBuffer.isView(e)?t=new dk(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),uk.readOnly=!1),t}Of.exports={concat:bY,mask:m1,toArrayBuffer:PY,toBuffer:uk,unmask:g1};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Of.exports.mask=function(t,r,o,n,s){s<48?m1(t,r,o,n,s):e.mask(t,r,o,n,s)},Of.exports.unmask=function(t,r){t.length<32?g1(t,r):e.unmask(t,r)}}catch{}});var y1=v((YOe,h1)=>{"use strict";var f1=Symbol("kDone"),pk=Symbol("kRun"),mk=class{constructor(t){this[f1]=()=>{this.pending--,this[pk]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[pk]()}[pk](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[f1])}}};h1.exports=mk});var wi=v((XOe,P1)=>{"use strict";var qc=require("zlib"),S1=Gc(),wY=y1(),{kStatusCode:A1}=Fr(),_Y=Buffer[Symbol.species],vY=Buffer.from([0,0,255,255]),Nf=Symbol("permessage-deflate"),Ur=Symbol("total-length"),bi=Symbol("callback"),ko=Symbol("buffers"),Pi=Symbol("error"),Mf,gk=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Mf){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Mf=new wY(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[bi];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){Mf.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){Mf.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?qc.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=qc.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Nf]=this,this._inflate[Ur]=0,this._inflate[ko]=[],this._inflate.on("error",CY),this._inflate.on("data",b1)}this._inflate[bi]=o,this._inflate.write(t),r&&this._inflate.write(vY),this._inflate.flush(()=>{let s=this._inflate[Pi];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=S1.concat(this._inflate[ko],this._inflate[Ur]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Ur]=0,this._inflate[ko]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?qc.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=qc.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Ur]=0,this._deflate[ko]=[],this._deflate.on("data",kY)}this._deflate[bi]=o,this._deflate.write(t),this._deflate.flush(qc.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=S1.concat(this._deflate[ko],this._deflate[Ur]);r&&(s=new _Y(s.buffer,s.byteOffset,s.length-4)),this._deflate[bi]=null,this._deflate[Ur]=0,this._deflate[ko]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};P1.exports=gk;function kY(e){this[ko].push(e),this[Ur]+=e.length}function b1(e){if(this[Ur]+=e.length,this[Nf]._maxPayload<1||this[Ur]<=this[Nf]._maxPayload){this[ko].push(e);return}this[Pi]=new RangeError("Max payload size exceeded"),this[Pi].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Pi][A1]=1009,this.removeListener("data",b1),this.reset()}function CY(e){if(this[Nf]._inflate=null,this[Pi]){this[bi](this[Pi]);return}e[A1]=1007,this[bi](e)}});var _i=v((ZOe,zf)=>{"use strict";var{isUtf8:w1}=require("buffer"),{hasBlob:TY}=Fr(),LY=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function WY(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function fk(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function EY(e){return TY&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}zf.exports={isBlob:EY,isValidStatusCode:WY,isValidUTF8:fk,tokenChars:LY};if(w1)zf.exports.isValidUTF8=function(e){return e.length<24?fk(e):w1(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");zf.exports.isValidUTF8=function(t){return t.length<32?fk(t):e(t)}}catch{}});var bk=v((QOe,W1)=>{"use strict";var{Writable:RY}=require("stream"),_1=wi(),{BINARY_TYPES:xY,EMPTY_BUFFER:v1,kStatusCode:IY,kWebSocket:OY}=Fr(),{concat:hk,toArrayBuffer:MY,unmask:NY}=Gc(),{isValidStatusCode:zY,isValidUTF8:k1}=_i(),Df=Buffer[Symbol.species],bt=0,C1=1,T1=2,L1=3,yk=4,Sk=5,jf=6,Ak=class extends RY{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||xY[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[OY]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=bt}_write(t,r,o){if(this._opcode===8&&this._state==bt)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new Df(o.buffer,o.byteOffset+t,o.length-t),new Df(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new Df(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case bt:this.getInfo(t);break;case C1:this.getPayloadLength16(t);break;case T1:this.getPayloadLength64(t);break;case L1:this.getMask();break;case yk:this.getData(t);break;case Sk:case jf:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[_1.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=C1:this._payloadLength===127?this._state=T1:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=L1:this._state=yk}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=yk}getData(t){let r=v1;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&NY(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=Sk,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[_1.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===bt&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=bt;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=hk(o,r):this._binaryType==="arraybuffer"?n=MY(hk(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=bt):(this._state=jf,setImmediate(()=>{this.emit("message",n,!0),this._state=bt,this.startLoop(t)}))}else{let n=hk(o,r);if(!this._skipUTF8Validation&&!k1(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===Sk||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=bt):(this._state=jf,setImmediate(()=>{this.emit("message",n,!1),this._state=bt,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,v1),this.end();else{let o=t.readUInt16BE(0);if(!zY(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new Df(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!k1(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=bt;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=bt):(this._state=jf,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=bt,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[IY]=n,i}};W1.exports=Ak});var _k=v((tMe,x1)=>{"use strict";var{Duplex:eMe}=require("stream"),{randomFillSync:DY}=require("crypto"),{types:{isUint8Array:jY}}=require("util"),E1=wi(),{EMPTY_BUFFER:$Y,kWebSocket:HY,NOOP:FY}=Fr(),{isBlob:vi,isValidStatusCode:UY}=_i(),{mask:R1,toBuffer:$n}=Gc(),Pt=Symbol("kByteLength"),BY=Buffer.alloc(4),$f=8*1024,Hn,ki=$f,Ft=0,GY=1,qY=2,Pk=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Ft,this.onerror=FY,this[HY]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||BY,r.generateMask?r.generateMask(o):(ki===$f&&(Hn===void 0&&(Hn=Buffer.alloc($f)),DY(Hn,0,$f),ki=0),o[0]=Hn[ki++],o[1]=Hn[ki++],o[2]=Hn[ki++],o[3]=Hn[ki++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[Pt]!==void 0?a=r[Pt]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(R1(t,o,d,s,a),[d]):(R1(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=$Y;else{if(typeof t!="number"||!UY(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(jY(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[Pt]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Ft?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):vi(t)?(n=t.size,s=!1):(t=$n(t),n=t.length,s=$n.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Pt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};vi(t)?this._state!==Ft?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Ft?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):vi(t)?(n=t.size,s=!1):(t=$n(t),n=t.length,s=$n.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Pt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};vi(t)?this._state!==Ft?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Ft?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[E1.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):vi(t)?(a=t.size,c=!1):(t=$n(t),a=t.length,c=$n.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[Pt]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};vi(t)?this._state!==Ft?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Ft?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[Pt],this._state=qY,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(wk,this,a,n);return}this._bufferedBytes-=o[Pt];let i=$n(s);r?this.dispatch(i,r,o,n):(this._state=Ft,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(VY,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[E1.extensionName];this._bufferedBytes+=o[Pt],this._state=GY,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");wk(this,c,n);return}this._bufferedBytes-=o[Pt],this._state=Ft,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Ft&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][Pt],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][Pt],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};x1.exports=Pk;function wk(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function VY(e,t,r){wk(e,t,r),e.onerror(t)}});var H1=v((rMe,$1)=>{"use strict";var{kForOnEventAttribute:Vc,kListener:vk}=Fr(),I1=Symbol("kCode"),O1=Symbol("kData"),M1=Symbol("kError"),N1=Symbol("kMessage"),z1=Symbol("kReason"),Ci=Symbol("kTarget"),D1=Symbol("kType"),j1=Symbol("kWasClean"),Br=class{constructor(t){this[Ci]=null,this[D1]=t}get target(){return this[Ci]}get type(){return this[D1]}};Object.defineProperty(Br.prototype,"target",{enumerable:!0});Object.defineProperty(Br.prototype,"type",{enumerable:!0});var Fn=class extends Br{constructor(t,r={}){super(t),this[I1]=r.code===void 0?0:r.code,this[z1]=r.reason===void 0?"":r.reason,this[j1]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[I1]}get reason(){return this[z1]}get wasClean(){return this[j1]}};Object.defineProperty(Fn.prototype,"code",{enumerable:!0});Object.defineProperty(Fn.prototype,"reason",{enumerable:!0});Object.defineProperty(Fn.prototype,"wasClean",{enumerable:!0});var Ti=class extends Br{constructor(t,r={}){super(t),this[M1]=r.error===void 0?null:r.error,this[N1]=r.message===void 0?"":r.message}get error(){return this[M1]}get message(){return this[N1]}};Object.defineProperty(Ti.prototype,"error",{enumerable:!0});Object.defineProperty(Ti.prototype,"message",{enumerable:!0});var Kc=class extends Br{constructor(t,r={}){super(t),this[O1]=r.data===void 0?null:r.data}get data(){return this[O1]}};Object.defineProperty(Kc.prototype,"data",{enumerable:!0});var KY={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[Vc]&&n[vk]===t&&!n[Vc])return;let o;if(e==="message")o=function(s,i){let a=new Kc("message",{data:i?s:s.toString()});a[Ci]=this,Hf(t,this,a)};else if(e==="close")o=function(s,i){let a=new Fn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Ci]=this,Hf(t,this,a)};else if(e==="error")o=function(s){let i=new Ti("error",{error:s,message:s.message});i[Ci]=this,Hf(t,this,i)};else if(e==="open")o=function(){let s=new Br("open");s[Ci]=this,Hf(t,this,s)};else return;o[Vc]=!!r[Vc],o[vk]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[vk]===t&&!r[Vc]){this.removeListener(e,r);break}}};$1.exports={CloseEvent:Fn,ErrorEvent:Ti,Event:Br,EventTarget:KY,MessageEvent:Kc};function Hf(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Ff=v((oMe,F1)=>{"use strict";var{tokenChars:Jc}=_i();function dr(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function JY(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,u=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(u===-1&&Jc[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let h=e.slice(c,u);d===44?(dr(t,h,r),r=Object.create(null)):i=h,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(u===-1&&Jc[d]===1)c===-1&&(c=m);else if(d===32||d===9)u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m),dr(r,e.slice(c,u),!0),d===44&&(dr(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)a=e.slice(c,m),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if(Jc[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if(Jc[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,u=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(u===-1&&Jc[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))u===-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let h=e.slice(c,u);o&&(h=h.replace(/\\/g,""),o=!1),dr(r,a,h),d===44&&(dr(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=m);let S=e.slice(c,u);return i===void 0?dr(t,S,r):(a===void 0?dr(r,S,!0):o?dr(r,a,S.replace(/\\/g,"")):dr(r,a,S),dr(t,i,r)),t}function YY(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}F1.exports={format:YY,parse:JY}});var qf=v((iMe,eU)=>{"use strict";var XY=require("events"),ZY=require("https"),QY=require("http"),G1=require("net"),eX=require("tls"),{randomBytes:tX,createHash:rX}=require("crypto"),{Duplex:nMe,Readable:sMe}=require("stream"),{URL:kk}=require("url"),Co=wi(),oX=bk(),nX=_k(),{isBlob:sX}=_i(),{BINARY_TYPES:U1,CLOSE_TIMEOUT:iX,EMPTY_BUFFER:Uf,GUID:aX,kForOnEventAttribute:Ck,kListener:lX,kStatusCode:cX,kWebSocket:ke,NOOP:q1}=Fr(),{EventTarget:{addEventListener:dX,removeEventListener:uX}}=H1(),{format:pX,parse:mX}=Ff(),{toBuffer:gX}=Gc(),V1=Symbol("kAborted"),Tk=[8,13],Gr=["CONNECTING","OPEN","CLOSING","CLOSED"],fX=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,Q=class e extends XY{constructor(t,r,o){super(),this._binaryType=U1[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Uf,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),K1(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){U1.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new oX({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new nX(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[ke]=this,s[ke]=this,t[ke]=this,n.on("conclude",SX),n.on("drain",AX),n.on("error",bX),n.on("message",PX),n.on("ping",wX),n.on("pong",_X),s.onerror=vX,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",X1),t.on("data",Gf),t.on("end",Z1),t.on("error",Q1),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Co.extensionName]&&this._extensions[Co.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){mt(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,Y1(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Lk(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Uf,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Lk(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Uf,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Lk(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Co.extensionName]||(n.compress=!1),this._sender.send(t||Uf,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){mt(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(Q,"CONNECTING",{enumerable:!0,value:Gr.indexOf("CONNECTING")});Object.defineProperty(Q.prototype,"CONNECTING",{enumerable:!0,value:Gr.indexOf("CONNECTING")});Object.defineProperty(Q,"OPEN",{enumerable:!0,value:Gr.indexOf("OPEN")});Object.defineProperty(Q.prototype,"OPEN",{enumerable:!0,value:Gr.indexOf("OPEN")});Object.defineProperty(Q,"CLOSING",{enumerable:!0,value:Gr.indexOf("CLOSING")});Object.defineProperty(Q.prototype,"CLOSING",{enumerable:!0,value:Gr.indexOf("CLOSING")});Object.defineProperty(Q,"CLOSED",{enumerable:!0,value:Gr.indexOf("CLOSED")});Object.defineProperty(Q.prototype,"CLOSED",{enumerable:!0,value:Gr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(Q.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(Q.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[Ck])return t[lX];return null},set(t){for(let r of this.listeners(e))if(r[Ck]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[Ck]:!0})}})});Q.prototype.addEventListener=dX;Q.prototype.removeEventListener=uX;eU.exports=Q;function K1(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:iX,protocolVersion:Tk[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!Tk.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${Tk.join(", ")})`);let s;if(t instanceof kk)s=t;else try{s=new kk(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let p=new SyntaxError(c);if(e._redirects===0)throw p;Bf(e,p);return}let d=i?443:80,u=tX(16).toString("base64"),m=i?ZY.request:QY.request,S=new Set,h;if(n.createConnection=n.createConnection||(i?yX:hX),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new Co({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=pX({[Co.extensionName]:h.offer()})),r.length){for(let p of r){if(typeof p!="string"||!fX.test(p)||S.has(p))throw new SyntaxError("An invalid or duplicated subprotocol was specified");S.add(p)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let p=n.path.split(":");n.socketPath=p[0],n.path=p[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let p=o&&o.headers;if(o={...o,headers:{}},p)for(let[b,A]of Object.entries(p))o.headers[b.toLowerCase()]=A}else if(e.listenerCount("redirect")===0){let p=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!p||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,p||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=m(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=m(n);n.timeout&&y.on("timeout",()=>{mt(e,y,"Opening handshake has timed out")}),y.on("error",p=>{y===null||y[V1]||(y=e._req=null,Bf(e,p))}),y.on("response",p=>{let b=p.headers.location,A=p.statusCode;if(b&&n.followRedirects&&A>=300&&A<400){if(++e._redirects>n.maxRedirects){mt(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new kk(b,t)}catch{let _=new SyntaxError(`Invalid URL: ${b}`);Bf(e,_);return}K1(e,f,r,o)}else e.emit("unexpected-response",y,p)||mt(e,y,`Unexpected server response: ${p.statusCode}`)}),y.on("upgrade",(p,b,A)=>{if(e.emit("upgrade",p),e.readyState!==Q.CONNECTING)return;y=e._req=null;let f=p.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){mt(e,b,"Invalid Upgrade header");return}let P=rX("sha1").update(u+aX).digest("base64");if(p.headers["sec-websocket-accept"]!==P){mt(e,b,"Invalid Sec-WebSocket-Accept header");return}let _=p.headers["sec-websocket-protocol"],k;if(_!==void 0?S.size?S.has(_)||(k="Server sent an invalid subprotocol"):k="Server sent a subprotocol but none was requested":S.size&&(k="Server sent no subprotocol"),k){mt(e,b,k);return}_&&(e._protocol=_);let C=p.headers["sec-websocket-extensions"];if(C!==void 0){if(!h){mt(e,b,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let L;try{L=mX(C)}catch{mt(e,b,"Invalid Sec-WebSocket-Extensions header");return}let R=Object.keys(L);if(R.length!==1||R[0]!==Co.extensionName){mt(e,b,"Server indicated an extension that was not requested");return}try{h.accept(L[Co.extensionName])}catch{mt(e,b,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Co.extensionName]=h}e.setSocket(b,A,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function Bf(e,t){e._readyState=Q.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function hX(e){return e.path=e.socketPath,G1.connect(e)}function yX(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=G1.isIP(e.host)?"":e.host),eX.connect(e)}function mt(e,t,r){e._readyState=Q.CLOSING;let o=new Error(r);Error.captureStackTrace(o,mt),t.setHeader?(t[V1]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Bf,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function Lk(e,t,r){if(t){let o=sX(t)?t.size:gX(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${Gr[e.readyState]})`);process.nextTick(r,o)}}function SX(e,t){let r=this[ke];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[ke]!==void 0&&(r._socket.removeListener("data",Gf),process.nextTick(J1,r._socket),e===1005?r.close():r.close(e,t))}function AX(){let e=this[ke];e.isPaused||e._socket.resume()}function bX(e){let t=this[ke];t._socket[ke]!==void 0&&(t._socket.removeListener("data",Gf),process.nextTick(J1,t._socket),t.close(e[cX])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function B1(){this[ke].emitClose()}function PX(e,t){this[ke].emit("message",e,t)}function wX(e){let t=this[ke];t._autoPong&&t.pong(e,!this._isServer,q1),t.emit("ping",e)}function _X(e){this[ke].emit("pong",e)}function J1(e){e.resume()}function vX(e){let t=this[ke];t.readyState!==Q.CLOSED&&(t.readyState===Q.OPEN&&(t._readyState=Q.CLOSING,Y1(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function Y1(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function X1(){let e=this[ke];if(this.removeListener("close",X1),this.removeListener("data",Gf),this.removeListener("end",Z1),e._readyState=Q.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[ke]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",B1),e._receiver.on("finish",B1))}function Gf(e){this[ke]._receiver.write(e)||this.pause()}function Z1(){let e=this[ke];e._readyState=Q.CLOSING,e._receiver.end(),this.end()}function Q1(){let e=this[ke];this.removeListener("error",Q1),this.on("error",q1),e&&(e._readyState=Q.CLOSING,this.destroy())}});var nU=v((lMe,oU)=>{"use strict";var aMe=qf(),{Duplex:kX}=require("stream");function tU(e){e.emit("close")}function CX(){!this.destroyed&&this._writableState.finished&&this.destroy()}function rU(e){this.removeListener("error",rU),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function TX(e,t){let r=!0,o=new kX({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(tU,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(tU,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",CX),o.on("error",rU),o}oU.exports=TX});var Wk=v((cMe,sU)=>{"use strict";var{tokenChars:LX}=_i();function WX(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&LX[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}sU.exports={parse:WX}});var pU=v((uMe,uU)=>{"use strict";var EX=require("events"),Vf=require("http"),{Duplex:dMe}=require("stream"),{createHash:RX}=require("crypto"),iU=Ff(),Un=wi(),xX=Wk(),IX=qf(),{CLOSE_TIMEOUT:OX,GUID:MX,kWebSocket:NX}=Fr(),zX=/^[+/0-9A-Za-z]{22}==$/,aU=0,lU=1,dU=2,Ek=class extends EX{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:OX,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:IX,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Vf.createServer((o,n)=>{let s=Vf.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=DX(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=aU}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===dU){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Yc,this);return}if(t&&this.once("close",t),this._state!==lU)if(this._state=lU,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Yc,this):process.nextTick(Yc,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Yc(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",cU);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Bn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Bn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!zX.test(s)){Bn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Bn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Xc(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=xX.parse(c)}catch{Bn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&u!==void 0){let S=new Un({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=iU.parse(u);h[Un.extensionName]&&(S.accept(h[Un.extensionName]),m[Un.extensionName]=S)}catch{Bn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let S={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(S,(h,y,p,b)=>{if(!h)return Xc(r,y||401,p,b);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(S))return Xc(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[NX])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>aU)return Xc(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${RX("sha1").update(r+MX).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),u._protocol=m)}if(t[Un.extensionName]){let m=t[Un.extensionName].params,S=iU.format({[Un.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${S}`),u._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",cU),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Yc,this)})),a(u,n)}};uU.exports=Ek;function DX(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function Yc(e){e._state=dU,e.emit("close")}function cU(){this.destroy()}function Xc(e,t,r,o){r=r||Vf.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Vf.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Bn(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Bn),e.emit("wsClientError",i,r,t)}else Xc(r,o,n,s)}});var jX,$X,HX,FX,UX,BX,mU,GX,Zc,gU=l(()=>{jX=g(nU(),1),$X=g(Ff(),1),HX=g(wi(),1),FX=g(bk(),1),UX=g(_k(),1),BX=g(Wk(),1),mU=g(qf(),1),GX=g(pU(),1),Zc=mU.default});var Rk,xk,Ik=l(()=>{"use strict";Rk="AGENT_WITCH_EXTERNAL_BRIDGE",xk="AGENT_WITCH_EXTERNAL_LIVE"});var Ok,fU=l(()=>{"use strict";Ok=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var qX,Mk,hU=l(()=>{"use strict";Ik();fU();qX=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",Mk=(e={})=>{let t=e.env??process.env,r=Ok(t[Rk]),o=Ok(t[xk]);return{mode:qX(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var yU=l(()=>{"use strict";Ik()});var SU=l(()=>{"use strict";hU();yU()});var Nk=l(()=>{"use strict"});var qr,Qc=l(()=>{"use strict";qr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Li,Gn,AU,KX,zk,Dk,bU,PU,jk,wU,ed,$k=l(()=>{"use strict";Li=g(require("node:fs")),Gn=g(require("node:os")),AU=g(require("node:path"));Nk();Qc();KX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zk=(e=Gn.default.hostname())=>AU.default.join(Gn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),Dk=e=>{if(!Li.default.existsSync(e))return null;try{let t=JSON.parse(Li.default.readFileSync(e,"utf8"));return!KX(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},bU=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},PU=(e,t)=>{Li.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},jk=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??zk(),o=Dk(r);if(o!==null&&o.pid!==process.pid&&qr(o.pid)&&bU(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Gn.default.hostname(),macOsUsername:Gn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return PU(r,n),{ok:!0}},wU=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??zk(),o=Dk(r);return o!==null&&o.pid!==process.pid&&qr(o.pid)&&bU(o)?{ok:!1}:(PU(r,{hostname:Gn.default.hostname(),macOsUsername:Gn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},ed=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??zk();Dk(r)?.pid===process.pid&&Li.default.existsSync(r)&&Li.default.unlinkSync(r)}});var Hk,td,JX,YX,XX,ZX,Fk,_U=l(()=>{"use strict";Hk=require("node:child_process"),td=g(require("node:path"));Qc();Fu();JX=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),YX=(e,t)=>{if(JX(e)||!/\bnode\b/.test(e))return!1;let r=td.default.resolve(t),o=td.default.join(r,"app",ea),n=td.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===ea||i==="agent-witch.ts")return e.includes(r);try{let a=td.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},XX=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,Hk.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},ZX=(e,t,r)=>{let o=XX(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||YX(d,t)&&n.push(c)}return n},Fk=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,Hk.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=ZX(r,e.installDir,t),n=[];for(let s of o)if(qr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var rd,od,vU,QX,Uk,kU=l(()=>{"use strict";rd=g(require("node:fs")),od=g(require("node:path"));ze();vU=(e,t)=>{!rd.default.existsSync(e)||rd.default.existsSync(t)||(rd.default.mkdirSync(od.default.dirname(t),{recursive:!0}),rd.default.renameSync(e,t))},QX=e=>{if(e.profileEmail===null)return;let t=od.default.join(e.installDir,_t);vU(od.default.join(t,Xn),e.mainLogPath),vU(od.default.join(t,Zn),e.errorLogPath)},Uk=e=>{let t=M();e!==void 0&&t.installDir!==e||QX(t)}});var CU=l(()=>{"use strict";Sl();Om();Om();!st()&&Uo(__agentWitchImportMetaUrl)&&(async()=>{nt("agent-witch-wake-server");let e=await mn(),t=yr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var TU=l(()=>{"use strict";CU()});var LU=l(()=>{"use strict";al()});var Bk,WU=l(()=>{"use strict";Nk();TU();$k();LU();Bk=async(e={})=>{let t=e.skipInProcessBridge?null:await Im();fm();let r=setInterval(()=>{fm()},6e4),o=setInterval(()=>{if(!wU().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var nd,Kf,rZ,EU,RU,Jf,xU,IU,Gk,OU,Yf,MU=l(()=>{"use strict";nd=g(require("node:fs")),Kf=g(require("node:path")),rZ="pending-run-inputs.json",EU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),RU=e=>{let t=e.profileEmail?Kf.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Kf.default.join(t,rZ)},Jf=e=>{let t=RU(e);if(!nd.default.existsSync(t))return{};try{let r=JSON.parse(nd.default.readFileSync(t,"utf8"));return EU(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!EU(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},xU=(e,t)=>{let r=RU(e);nd.default.mkdirSync(Kf.default.dirname(r),{recursive:!0}),nd.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},IU=e=>Object.values(Jf(e)),Gk=(e,t)=>Jf(e)[t]!==void 0,OU=(e,t)=>{let r=Jf(e);r[t.agentRunId]=t,xU(e,r)},Yf=(e,t)=>{let r=Jf(e);delete r[t],xU(e,r)}});var Xf=l(()=>{"use strict";le()});var NU=l(()=>{"use strict";le()});var Zf=l(()=>{"use strict";le()});var Qf=l(()=>{"use strict";le()});var sd=l(()=>{"use strict";le()});var oZ,nZ,id,qk=l(()=>{"use strict";Tt();Xf();NU();Zf();Qf();sd();oZ={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},nZ={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},id=e=>{if(!ge(e.writerAgent))return"the selected writer";let t=at(e.writerAgent);if(je(e.writerExecutionBackend)==="api"&&t!==null){let r=Je(Re(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=ka(t,r.model);return`${nZ[t]} model ${o}`}}return oZ[e.writerAgent]}});var sZ,iZ,zU,DU,jU=l(()=>{"use strict";sZ=/"input_tokens"\s*:\s*(\d+)/,iZ=/"output_tokens"\s*:\s*(\d+)/,zU=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},DU=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=zU(sZ.exec(t)),o=zU(iZ.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var eh=l(()=>{"use strict";er()});var ad,th,aZ,Vk,$U,HU,FU,Kk,UU=l(()=>{"use strict";ad=g(require("node:fs")),th=g(require("node:path"));eh();aZ="run-completion-outbox.json",Vk=e=>{let t=e.profileEmail?th.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return th.default.join(t,aZ)},$U=e=>{let t=Vk(e);if(!ad.default.existsSync(t))return[];try{let r=JSON.parse(ad.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},HU=(e,t)=>{ad.default.mkdirSync(th.default.dirname(Vk(e)),{recursive:!0}),ad.default.writeFileSync(Vk(e),JSON.stringify(t,null,2),"utf8")},FU=(e,t)=>{let r=[...$U(e).filter(o=>o.runId!==t.runId),t];HU(e,r)},Kk=async e=>{if(e.cloudApi===null)return;let t=$U(e.layout);if(t.length===0)return;let r=[];for(let o of t)await tl(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);HU(e.layout,r)}});var BU=l(()=>{"use strict"});var Jk,ld,cZ,qn,GU=l(()=>{"use strict";BU();Jk=new Map,ld=e=>{let t=Jk.get(e);t!==void 0&&(clearInterval(t),Jk.delete(e))},cZ=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},qn=(e,t,r,o={})=>{ld(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){ld(t);return}let i=o.onTick?.()??{};cZ(e,t,n,i)};s(),Jk.set(t,setInterval(s,15e3))}});var qU=l(()=>{"use strict";er()});var VU,KU=l(()=>{"use strict";qU();VU=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Ye(t)}});var Yk,cd,Vr,Xk,ur,JU,rh=l(()=>{"use strict";Yk=new Set,cd=new Map,Vr=(e,t)=>{if(t.length===0)return;let r=cd.get(e)??[];r.push(t),cd.set(e,r)},Xk=e=>{Yk.add(e);let t=cd.get(e)??[];return cd.delete(e),t},ur=e=>Yk.has(e),JU=e=>{Yk.delete(e),cd.delete(e)}});var Wi,YU,XU,ZU=l(()=>{"use strict";Wi=g(require("node:path")),YU=require("node:url");Fo();XU=()=>{if(st()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Wi.default.dirname(Wi.default.resolve(e)):Wi.default.dirname(Wi.default.resolve(__filename))}return Wi.default.dirname((0,YU.fileURLToPath)(__agentWitchImportMetaUrl))}});var QU,eB,tB,rB,rt,Ei,oB,nB,Ri,Zk,Qk,eC,sB,tC,iB,oh=l(()=>{"use strict";QU=require("node:crypto"),eB=g(require("node:fs")),tB=g(require("node:path")),rB=require("node:url");Qc();Fo();ZU();rt=new Map,oB=async()=>{if(Ei!==void 0)return Ei;try{if(st()){let e=XU(),t=tB.default.join(e,"deps","node-pty","lib","index.js");if(eB.default.existsSync(t)){let r=await import((0,rB.pathToFileURL)(t).href);return Ei=r,r}}return Ei=await import("node-pty"),Ei}catch{return Ei=null,null}},nB=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Ri=(e,t,r)=>{let o=rt.get(e);if(o!==void 0){rt.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},Zk=(e,t)=>{let r=rt.get(e);return r===void 0?!1:(r.pty.write(t),!0)},Qk=(e,t,r)=>{let o=rt.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},eC=e=>{for(let t of rt.values())if(!(t.mode!=="agent"||t.runId!==e))return qr(t.pty.pid);return!1},sB=e=>{for(let[t,r]of rt.entries())if(!(r.mode!=="agent"||r.runId!==e)){rt.delete(t);try{r.pty.kill()}catch{}return!0}return!1},tC=async e=>{let t=await oB();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;rt.get(e.shellSessionId)!==void 0&&Ri(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return rt.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{nB(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{rt.get(e.shellSessionId)?.pty===n&&(rt.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},iB=async e=>{let t=e.shellSessionId??(0,QU.randomUUID)(),r=await oB();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return rt.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{nB(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{rt.get(t)?.pty===o&&(rt.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var nh,aB,lB=l(()=>{"use strict";nh="[[AWAITING_INPUT]]",aB=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",nh,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var dd,cB,sh=l(()=>{"use strict";lB();dd=e=>{let t=e.indexOf(nh);if(t<0)return null;let o=e.slice(t+nh.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},cB=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",aB].join(`
`)});var dB,uB=l(()=>{"use strict";rh();oh();sh();dB=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(ur(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Vr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await iB({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=dd(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var pB,mB,gB,Kr,ih=l(()=>{"use strict";pB=require("node:child_process"),mB=g(require("node:fs")),gB=g(require("node:path"));Fu();Kr=(e,t)=>{let r=gB.default.join(e,"app",SW,"ensure-writer.sh");return mB.default.existsSync(r)?new Promise((o,n)=>{let s=(0,pB.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{n(i)}),s.on("close",i=>{if(i===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var fB,Vn,pd,ah,rC,ud,lh,ch,oC,nC,dZ,xi,uZ,pZ,sC,iC=l(()=>{"use strict";fB=require("node:child_process");Tt();ih();Zf();Xf();sd();Qf();Vn=new Map,pd=e=>e==="cursor"||e==="antigravity",ah=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",rC=e=>Vn.get(e)?.warmed===!0,ud=e=>{let t=Vn.get(e);Vn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},lh=e=>Vn.get(e)?.conversationStarted===!0,ch=e=>{let t=Vn.get(e);Vn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},oC=e=>{Vn.delete(e)},nC=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",dZ={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},xi=e=>`${dZ[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,uZ=(e,t,r,o)=>new Promise(n=>{let s=cp(t,r),i=[],a=(0,fB.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),o?.(u)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),pZ=(e,t)=>{let r=xi(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},sC=async e=>{if(!ge(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&je(e.runConfig.writerExecutionBackend)==="api"){let r=at(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Re(e.runConfig.layout.configPath);return Je(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),ud(e.writerAgent),{exitCode:0,output:xi(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Kr(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}pd(e.writerAgent)&&ud(e.writerAgent);let t=await uZ(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?pZ(e.writerAgent,t.output):xi(e.writerAgent)}}});var Kn,aC=l(()=>{"use strict";Kn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var hB,mZ,gZ,yB,fZ,lC,SB=l(()=>{"use strict";aC();hB=/you(?:'|')ve hit your session limit/i,mZ=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],gZ=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,yB=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},fZ=e=>{let t=gZ.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},lC=e=>{let t=e.trim();if(t.length===0)return null;if(hB.test(t))return{code:Kn.SESSION_LIMIT,resetHint:fZ(t),matchedLine:yB(t,hB)};for(let r of mZ)if(r.test(t))return{code:Kn.PROVIDER_QUOTA,resetHint:null,matchedLine:yB(t,r)};return null}});var dh,uh,cC,dC=l(()=>{"use strict";dh="[[AGENT_RUN_WRITER_EXECUTION]]",uh="cli-writer-api-key-missing",cC="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var uC=l(()=>{"use strict";dC()});var AB=l(()=>{"use strict";uC()});var ph=l(()=>{"use strict";aC();SB();dC();uC();AB()});var mh,bB=l(()=>{"use strict";mh={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var PB,wB=l(()=>{"use strict";PB="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var _B,vB=l(()=>{"use strict";ph();wB();_B=e=>e.code===Kn.SESSION_LIMIT?PB:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var kB,CB=l(()=>{"use strict";ph();bB();vB();kB=e=>{let t=lC(e.output);return t!==null?{status:mh.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:_B(t)}:{status:e.exitCode===0?mh.COMPLETED:mh.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var pC,Aze,TB=l(()=>{"use strict";pC={OPEN:"open",APPROVAL:"approval"},Aze=pC.APPROVAL});var Ii,gh,LB,SZ,WB,EB,RB,md,mC,gC=l(()=>{"use strict";Ii=g(require("node:fs")),gh=g(require("node:path")),LB="runs",SZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),WB=e=>{let t=e.profileEmail!==null?gh.default.join(e.installDir,"profiles",e.profileEmail,LB):gh.default.join(e.installDir,LB);return Ii.default.mkdirSync(t,{recursive:!0}),t},EB=(e,t)=>gh.default.join(WB(e),`${t}.json`),RB=(e,t)=>{Ii.default.writeFileSync(EB(e,t.id),JSON.stringify(t,null,2))},md=(e,t)=>{let r=EB(e,t);if(!Ii.default.existsSync(r))return null;try{let o=JSON.parse(Ii.default.readFileSync(r,"utf8"));return!SZ(o)||typeof o.id!="string"?null:o}catch{return null}},mC=e=>{let t=WB(e),r=Ii.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=md(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var AZ,xB,IB=l(()=>{"use strict";CB();TB();gC();AZ=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=kB({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:pC.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},xB=(e,t)=>{let r=AZ(t);return RB(e,r),r}});var OB=l(()=>{"use strict";Tf()});var MB,NB=l(()=>{"use strict";ph();MB=()=>[dh,`agentRunWriterExecutionBackend=${uh}`,`agentRunWriterExecutionReasonCode=${cC}`].join(`
`)});var To,fh=l(()=>{"use strict";To=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var fC,bZ,PZ,zB,DB=l(()=>{"use strict";fC=e=>e.toLocaleString("en-US"),bZ=e=>e<.01?e.toFixed(4):e.toFixed(3),PZ=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${bZ(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${fC(e.inputTokens)} in / ${fC(e.outputTokens)} out (${fC(e.totalTokens)} total)`,t].join(`
`)},zB=(e,t)=>{if(t===void 0)return e;let r=PZ(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var jB=l(()=>{"use strict";le()});var HB,gd,Se,hC,hh,$B,wZ,_Z,FB,UB,BB,fd,yC,SC,AC,GB,vZ,wt,hd,Lo,qB,kZ,CZ,yh,bC,PC,wC,VB=l(()=>{"use strict";HB=require("node:child_process");le();Tt();MU();Mc();qk();jU();va();UU();eh();GU();Qc();KU();rh();oh();sh();uB();iC();IB();OB();NB();fh();DB();us();jB();sd();sa();sh();gd=new Map,Se=new Map,hC=new Set,hh=new Map,$B=e=>{e!==void 0&&!hh.has(e)&&hh.set(e,Date.now())},wZ=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(ur(t)){wt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}Vr(t,n)},_Z=(e,t,r,o,n)=>{if(!qS(e,n))return;let s=`${MB()}
`;wZ(t,r,o,s);let i=Se.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},FB=130,UB=`

Stopped by user.`,BB=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:To(e)},fd=null,yC=e=>{fd=e},SC=(e,t)=>{if(fd===null)return;let r=hv(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||GA(fd,t,r)},AC=async e=>{await Kk({layout:e,cloudApi:fd})},GB=e=>{let t=gd.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:qr(t.pid)},vZ=e=>fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),wt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},hd=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=is(s),c=Se.get(r);if(a!==null&&c!==void 0){let d=LW(a),u=GB(r)||eC(r);d!==null&&!u&&Lo(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return TW(a)}}),Lo=(e,t,r,o,n,s,i,a)=>{let c=As(s,a),d=n,u=zB(c.output,c.llmUsage);if(r!==void 0){let S=hh.get(r);hh.delete(r),S!==void 0&&gv({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-S)/1e3))});let h=DU(c.llmUsage,u);h!==null&&oF({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&hC.has(r)&&(hC.delete(r),d=FB,u=u.trim().length>0&&!u.includes("Stopped by user.")?`${u.trim()}${UB}`:"Stopped by user.");let m=r!==void 0?hv(e.layout.reportsDir,r):null;if(r!==void 0){ld(r),xa(e.layout,r),ur(r)&&(wt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),JU(r));let S=Se.get(r);eF({reportsDir:e.layout.reportsDir,agentRunId:r,input:To(i),output:u,...S!==void 0?{writerLabel:id({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&kf({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:u,agentRunId:r}),xB(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:u,layout:e.layout}),FU(e.layout,{runId:r,exitCode:d,output:u,createdAt:new Date().toISOString(),...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{}}),Kk({layout:e.layout,cloudApi:fd}),Se.delete(r),gd.delete(r),Yf(e.layout,r)}wt(t,{type:"command.claude.result",payload:{exitCode:d,output:u,...r!==void 0?{agentRunId:r}:{},...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),ga(e.layout)},qB=(e,t,r,o,n,s,i)=>{let a=Se.get(r),c=a?.accumulatedOutput??s;OU(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),qn(t,r,()=>Gk(e.layout,r),hd(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),wt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},kZ=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,u=h=>{if(!(n===void 0||h.length===0)){if(ur(n)){wt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}Vr(n,h)}};if(n!==void 0){let h=Se.get(n);gd.set(n,t),Se.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),wt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),qn(r,n,()=>GB(n),hd(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let m=a==="claude-cli",S=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(m?S.push(y):(c.push(y),u(y)),d||n===void 0)return;let p=dd(c.join(""));if(p!==null){d=!0,t.kill("SIGTERM");let b=Se.get(n),A=[b?.accumulatedOutput??"",p.partialOutput].filter(f=>f.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=A),gd.delete(n),qB(e,r,n,o,p.question,A,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),u(y)}),t.on("close",h=>{if(d)return;ch(a);let y=n!==void 0?Se.get(n):void 0,p=m?As(S.join("")):{output:c.join("").trim(),llmUsage:void 0},b=m?c.join("").trim():"",A=[p.output.trim(),b].filter(P=>P.length>0).join(`
`);m&&p.output.trim().length>0&&u(p.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${A}`.trim():A;Lo(e,r,n,o,h??-1,f,s,p.llmUsage)}),t.on("error",h=>{d||Lo(e,r,n,o,-1,h.message,s)})},CZ=(e,t,r,o,n,s,i,a,c)=>{let d=BB(r,c);s!==void 0&&(Se.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),wt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),qn(n,s,()=>Se.has(s),hd(e,n,s,o,i,a))),La(e,t,r,m=>{if(!(s===void 0||m.length===0)){if(ur(s)){wt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:m},requestId:o});return}Vr(s,m)}}).then(m=>{ch(t),Lo(e,n,s,o,m.exitCode,m.output,r,m.llmUsage)}).catch(m=>{let S=m instanceof Error?m.message:String(m);Lo(e,n,s,o,-1,S,r)})},yh=(e,t,r,o,n,s,i,a,c,d,u,m)=>{let S=BB(r,u);if(ma(e.layout),en(e,t)){$B(s),CZ(e,t,r,o,n,s,c,d,S);return}let h=Jt(t,r,vZ(e),i);if(h===null){Lo(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}$B(s);let y=VU({workspace:e.workspace,projectFolderPath:c}),p=()=>{let b=(0,HB.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:m??process.env});kZ(e,b,n,o,s,r,S,t)};if(s===void 0){p();return}Se.set(s,{originalPrompt:r,userTranscriptPrompt:S,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:Se.get(s)?.accumulatedOutput??""}),_Z(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&na({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),qn(n,s,()=>Se.has(s),hd(e,n,s,o,c,d)),dB({socket:n,sendMessage:wt,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:b=>{a!==void 0&&Ri(a,P=>{wt(n,P)},o);let A=Se.get(s),f=[A?.accumulatedOutput??"",b.partialOutput].filter(P=>P.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),qB(e,n,s,o,b.question,f,r)},onFinished:(b,A)=>{ch(t);let f=As(A),P=Se.get(s),_=P!==void 0&&P.accumulatedOutput.length>0?`${P.accumulatedOutput}

${f.output}`.trim():f.output;Lo(e,n,s,o,b,_,r,f.llmUsage)}}).then(b=>{if(!b){p();return}qn(n,s,()=>eC(s),hd(e,n,s,o,c,d))}).catch(b=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",b instanceof Error?b.message:b),p()})},bC=(e,t,r,o)=>{Yf(e.layout,t.agentRunId),t.shellSessionId!==void 0&&wt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=cB(t),s=Se.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;yh(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},PC=(e,t)=>{for(let r of IU(e.layout))Se.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:To(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),qn(t,r.agentRunId,()=>Gk(e.layout,r.agentRunId),{awaitingInput:!0}),wt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},wC=(e,t,r,o)=>{let n=Se.get(r);if(n===void 0)return!1;hC.add(r),ld(r);let s=gd.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(sB(r))return!0;Yf(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${UB}`:"Stopped by user.";return Lo(e,t,r,o,FB,i,n.originalPrompt),!0}});var TZ,_C,KB=l(()=>{"use strict";za();TZ=()=>`http://127.0.0.1:${Lt()}/restart`,_C=async()=>{try{let e=await fetch(TZ(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var JB=l(()=>{"use strict";_l()});var YB=l(()=>{"use strict";Gv()});var XB,ZB=l(()=>{"use strict";XB=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var yd,LZ,vC,QB=l(()=>{"use strict";J();se();JB();Ib();YB();ZB();us();yd=(e,t)=>{mo(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},LZ=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(lS(),aS)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},vC=async e=>{let t=De(e.layout.installDir)?.bundleVersion??null;if(!XB({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(Ct(e.layout)){fa({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),yd(e.layout,{summary:r,action:"install-bundle-update-start"}),hr({launchAgentLabel:Te(e.layout.installDir),installDir:e.layout.installDir});let o=await Ai({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),yd(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await LZ();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),yd(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),yd(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),yd(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var WZ,kC,eG=l(()=>{"use strict";WZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kC=e=>{if(!WZ(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var CC,TC,tG=l(()=>{"use strict";fb();hb();CC=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=ll({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},TC=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await kr(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var rG,EZ,RZ,xZ,Sd,oG=l(()=>{"use strict";rG=g(require("node:os"));ze();EZ="Default",RZ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),xZ=e=>{let t=rG.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Sd=()=>{let e=M(),t=xu(e),r=RZ(EZ);return`${xZ(t)}/${r.length>0?r:"project"}`}});var nG=l(()=>{"use strict";_l()});var sG,LC,iG=l(()=>{"use strict";nG();sG=!1,LC=e=>{sG||(sG=!0,process.on("uncaughtException",t=>{fn(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;fn(e,{kind:"crash",message:r,stack:o})}))}});var aG,IZ,WC,lG=l(()=>{"use strict";aG=require("node:child_process");ih();Tt();Zf();Xf();sd();Qf();IZ=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,aG.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},WC=async e=>{if(!ge(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&je(e.runConfig.writerExecutionBackend)==="api"){let r=at(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Re(e.layout.configPath),n=Je(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Kr(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await IZ(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var EC,cG=l(()=>{"use strict";EC=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var dG,RC,uG=l(()=>{"use strict";dG=require("node:crypto"),RC=()=>(0,dG.randomUUID)()});var Oi,pG,Sh=l(()=>{"use strict";Oi="[[WORKING_ESTIMATE]]",pG=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Oi,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var mG,gG=l(()=>{"use strict";mG=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var OZ,fG,hG=l(()=>{"use strict";Sh();OZ=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,fG=e=>{if(!e.includes(Oi))return null;let t=null;for(let r of e.matchAll(OZ)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var MZ,xC,yG=l(()=>{"use strict";hG();MZ=/^(\d{1,6})\b/,xC=e=>{let t=fG(e);if(t!==null)return t;let r=MZ.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var NZ,zZ,DZ,Ah,IC=l(()=>{"use strict";Tt();bl();NZ="http://127.0.0.1:11434",zZ=45e3,DZ=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Ah=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||NZ,o=t===void 0?(await Rt({commands:fe({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(zZ)});return n.ok?DZ(await n.json()):null}catch{return null}}});var OC,MC,NC,SG=l(()=>{"use strict";sa();Sh();fh();gG();yG();Mc();IC();OC=async e=>{let t=To(e.wrappedPrompt),r=tF(e.reportsDir);return{estimateOutput:await Ah(pG(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},MC=e=>{let t=xC(e.estimateOutput);t!==null&&Sf({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},NC=e=>{let t=xC(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=mG(t);return oa({reportKey:e.reportKey,agentRunId:e.agentRunId,status:qt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),Sf({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var bh,AG,zC=l(()=>{"use strict";bh="[[WORKING_TOKEN_ESTIMATE]]",AG=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",bh,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var bG,jZ,PG,wG=l(()=>{"use strict";zC();bG=/^(\d{1,8})\b/,jZ=e=>{let t=e.indexOf(bh);if(t<0)return null;let r=e.slice(t+bh.length).trim(),o=bG.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},PG=e=>{let t=jZ(e);if(t!==null)return t;let r=bG.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var DC,jC,_G=l(()=>{"use strict";zC();fh();wG();Mc();IC();DC=async e=>{let t=To(e.wrappedPrompt),r=nF(e.reportsDir);return{estimateOutput:await Ah(AG(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},jC=e=>{let t=PG(e.estimateOutput);return t===null?null:(rF({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var vG=l(()=>{"use strict";$k();_U();kU();WU();za();VB();ih();Tt();gC();rh();KB();wb();QB();us();eG();tG();eh();oG();iG();lG();Uu();cG();uG();Sh();sa();SG();_G();qk();bl();oh();iC()});var kG={};Ut(kG,{buildContinuationPromptWithContext:()=>FZ});var $Z,HZ,FZ,CG=l(()=>{"use strict";$Z=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,HZ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),FZ=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=HZ(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${$Z(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var TG={};Ut(TG,{readHarnessExportSets:()=>BZ});var Ad,$C,Ph,UZ,BZ,LG=l(()=>{"use strict";Ad=g(require("node:fs")),$C=g(require("node:path"));ze();Ph=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),UZ=e=>{if(!Ad.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Ad.default.readFileSync(e.harnessManifestPath,"utf8"));if(Ph(t))return t}catch{return null}return null},BZ=(e,t)=>{let r=M(t),o=UZ(r);if(o===null)return[];let n=Ph(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!Ph(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let u of c){if(!Ph(u))continue;let m=typeof u.path=="string"?u.path:void 0,S=typeof u.id=="string"?u.id:"",h=typeof u.kind=="string"?u.kind:"",y=typeof u.title=="string"?u.title:"";if(m===void 0||S.length===0||h.length===0||y.length===0)continue;let p=m.startsWith("shared/")?$C.default.join(r.harnessRootDir,m):$C.default.join(r.harnessSetsDir,i,m);Ad.default.existsSync(p)&&d.push({id:S,kind:h,title:y,content:Ad.default.readFileSync(p,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var VC,FC,Mi,WG,GZ,EG,RG,HC,xG,UC,BC,GC,ee,K,qC,qZ,bd,VZ,KZ,JZ,YZ,XZ,ZZ,QZ,eQ,Pd,IG=l(()=>{"use strict";VC=require("node:child_process"),FC=g(require("node:fs")),Mi=g(require("node:os"));gU();J();se();Xo();ok();SU();le();Kt();_l();FP();If();Tf();er();ao();Ub();gt();vG();WG=3e4,GZ=3e4,EG=new Map,RG=new Map,HC=new Map,xG=new Map,UC=new Map,BC=new Map,GC=new Map,ee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),K=(e,t,r)=>{e.readyState===Zc.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(mo(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Mm(r,"out",t)))},qC=e=>e,qZ=e=>{if(!FC.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(FC.default.readFileSync(e.harnessManifestPath,"utf8"));if(ee(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},bd=(e,t)=>{let r=qZ(t);r!==null&&K(e,{type:"harness.manifest.report",payload:{hostname:Mi.default.hostname(),manifest:r}})},VZ=async(e,t,r,o,n,s,i=!1,a,c,d,u,m)=>{let S=m?.trim()??"";if(!ge(t)){K(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=id({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await Rt({commands:fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),p=s!==void 0?OC({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,b=s!==void 0?DC({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=pd(t)&&!rC(t);if(A){try{await Kr(e.layout.installDir,t)}catch(H){let Ce=H instanceof Error?H.message:String(H);K(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Ce}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}ud(t)}else if(!pd(t))try{await Kr(e.layout.installDir,t)}catch(H){let Ce=H instanceof Error?H.message:String(H);K(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Ce}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Ea(d,Sd,m);if(f===null){K(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Ge({projectFolderPath:f,...S.length>0?{projectId:S}:{}}),i||$c(e.layout,t,f);let P=Cf({sessionContinuation:i,supportsWriterSessionContinuation:ah(t),isWriterConversationStarted:lh(t)}),_=i&&P==="first"?jc(e.layout,t,f):null,k=_!==null?Si(e.layout,_):null,C=k!==null&&k.turns.length>0,L=Rv({sessionContinuation:i,supportsWriterSessionContinuation:ah(t),isWriterConversationStarted:lh(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:C,userPromptCharacterCount:r.length}),R=r;if(L.continuationStrategy==="source_run_seed"){let H=typeof c=="string"&&c.length>0?md(e.layout,c):null;if(H!==null){let{buildContinuationPromptWithContext:Ce}=await Promise.resolve().then(()=>(CG(),kG));R=Ce({priorPrompt:H.prompt,priorOutput:H.resultOutput??"",userMessage:r})}}else L.continuationStrategy==="transcript_seed"&&k!==null&&k.turns.length>0&&(R=Pf({priorTurns:k.turns,userMessage:r}));let I=L.ragLimit>0?await Us({layout:e.layout,query:R,limit:L.ragLimit,minScore:L.ragMinScore,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],N=L.ragLimit>0&&f.trim().length>0?await $P({layout:e.layout,query:R,limit:2,minScore:.32,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],U=L.injectMemory?Pv(e.layout,f,S.length>0?S:void 0):[],G=`${_v(U,L.memoryEntryLimit)}${zP(I)}${HP(N)}${R}`,q=u?.trim()??(s!==void 0&&f.trim().length>0?RC():void 0);if(s!==void 0&&q!==void 0&&q.length>0&&f.trim().length>0){na({reportKey:q,agentRunId:s,userSummary:"Working on your Mac\u2026"});let H=G;p!==null&&p.then(Ce=>{if(Ce===null)return;let Jr=NC({estimateOutput:Ce.estimateOutput??"",reportKey:q,agentRunId:s,reportsDir:e.layout.reportsDir,task:Ce.task,writerLabel:Ce.writerLabel,embedding:Ce.embedding});if(Jr.estimateSeconds===null)return;SC(e.layout.reportsDir,s);let pr=`${Oi}
${Jr.estimateSeconds}
`;if(ur(s)){K(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:pr},requestId:o});return}Vr(s,pr)}).catch(()=>{}),G=EC(H),G=Oy(G,{agentRunId:s,reportKey:q,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&p!==null&&p.then(H=>{H!==null&&MC({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel,embedding:H.embedding})}).catch(()=>{}),s!==void 0&&b!==null&&b.then(H=>{H!==null&&jC({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel})}).catch(()=>{});let Ke=s!==void 0&&GC.get(s)===!0;if(s!==void 0&&f.trim().length>0){let H=await mm(f);BC.set(s,H),q!==void 0&&q.length>0&&UC.set(s,q)}yh(e,t,G,o,qC(n),s,{sessionTurn:L.sessionTurn},a,f,q,r,HS(e.layout,s,Ke)),A&&s!==void 0&&K(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:nC(t)},requestId:o})},KZ=async(e,t,r,o,n)=>{let s=(i,a)=>{K(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await sC({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,K(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:o})}}),c=ge(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?xi(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},JZ=(e,t,r)=>new Promise(o=>{if(!ge(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Jt(t,r,fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,VC.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),YZ=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;K(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Zt(t.bundle),s=ee(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let u=Le(e.wsUrl)??it,m=await CA({appOrigin:u,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return K(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=sn({bundle:i,layout:e.layout});return K(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&bd(o,e.layout),!0},XZ=async(e,t,r,o)=>{if(await YZ(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(K(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){K(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!ge(n)){K(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}ma(e.layout);let i=await(async()=>{try{await Kr(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return JZ(e,n,s)})().finally(()=>{ga(e.layout)});K(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),bd(o,e.layout)},ZZ=e=>{let t=1e3*2**e;return Math.min(GZ,t)},QZ=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=p=>{if(!t.restartInFlight){if(Ct(e.layout)){tS(p),console.log(`[agent-witch] Deferring local restart (${p}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${p})\u2026`),t.wakeError=`restart:${p}`,_C().then(b=>{if(b.ok){console.log("[agent-witch] Local restart completed.");return}if(!b.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",b.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(p,b="system.ack")=>{if(!t.selfUpdateInFlight){if(Ct(e.layout)){fa({layout:e.layout,remoteBundleVersion:p,trigger:b}),console.log(`[agent-witch] Deferring install bundle update (${p} via ${b}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,vC({layout:e.layout,remoteBundleVersion:p,trigger:b}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let p=he(e.layout);p!==null&&We(p,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let p=t.socket;t.socket=void 0,t.wsConnected=!1,p.removeAllListeners("open"),p.removeAllListeners("message"),p.removeAllListeners("close"),p.on("error",()=>{}),(p.readyState===Zc.OPEN||p.readyState===Zc.CONNECTING)&&p.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,WG)},u=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let p=ZZ(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${p}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},p)},m=p=>{s();let b=()=>{let A=ca(e.layout.installDir),f=Lt();K(p,{type:"agent.heartbeat",payload:{hostname:Mi.default.hostname(),macOsUsername:Mi.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:A}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};b(),t.heartbeatTimer=setInterval(b,WG)},S=(p,b)=>{if(typeof p.type!="string")return;if(Fb(p)){t.stopped=!0,s(),a(),c(),jb({layout:e.layout}).finally(()=>{ed(),process.exit(0)});return}mo(e.layout,{direction:"in",type:p.type,summary:"inbound WS frame"}),Mm(e.layout,"in",p);let A=typeof p.requestId=="string"?p.requestId:void 0;if(p.type==="device.auth.attestation"&&ee(p.payload)){let f=typeof p.payload.serverPublicKey=="string"?p.payload.serverPublicKey:"",P=typeof p.payload.origin=="string"?p.payload.origin:"",_=typeof p.payload.devicePublicKey=="string"?p.payload.devicePublicKey:"",k=typeof p.payload.challenge=="string"?p.payload.challenge:"",C=typeof p.payload.serverAttestation=="string"?p.payload.serverAttestation:"";if(!rk({serverPublicKey:f,origin:P,devicePublicKey:_,challenge:k,serverAttestation:C})){t.wakeError="Server attestation verification failed",mo(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(p.type==="writer.ensure"&&ee(p.payload)){let f=typeof p.payload.writerAgent=="string"?p.payload.writerAgent:"";mo(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),WC({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(P=>{K(b,{type:"writer.status",payload:P},e.layout)})}if(p.type==="install.bundle.update"&&ee(p.payload)){let f=typeof p.payload.bundleVersion=="string"?p.payload.bundleVersion.trim():"";f.length>0&&o(f,"install.bundle.update")}if(p.type==="system.ack"){sp(e.layout,{wsUrl:e.wsUrl});let f=ee(p.payload)?p.payload:null,P=kC(f);P!==null&&o(P)}if(p.type==="device.restart"&&r("cloud-device-restart"),p.type==="automations.sync"&&ee(p.payload)&&CC(p.payload),p.type==="automations.run"&&ee(p.payload)&&TC(p.payload),p.type==="terminal.stream.accepted"&&ee(p.payload)){let f=typeof p.payload.runId=="string"?p.payload.runId:"";if(f.length>0){let P=Xk(f);for(let _ of P)K(b,{type:"terminal.stream.chunk",payload:{runId:f,chunk:_},requestId:A})}}if(p.type==="agent.agentRun.list"&&K(b,{type:"dashboard.agentRun.list.result",payload:{runs:mC(e.layout)},requestId:A}),p.type==="agent.agentRun.get"&&ee(p.payload)){let f=typeof p.payload.runId=="string"?p.payload.runId:"",P=f.length>0?md(e.layout,f):null;K(b,{type:"dashboard.agentRun.get.result",payload:{run:P},requestId:A})}if(p.type==="command.claude.run"&&ee(p.payload)){let f=p.payload.prompt,P=typeof p.payload.writerAgent=="string"&&ge(p.payload.writerAgent)?p.payload.writerAgent:"claude-cli",_=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,k=p.payload.sessionContinuation===!0,C=typeof p.payload.sourceRunId=="string"?p.payload.sourceRunId:void 0,L=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:void 0,R=typeof p.payload.projectId=="string"?p.payload.projectId:void 0,I=Ea(typeof p.payload.projectFolderPath=="string"?p.payload.projectFolderPath:void 0,Sd,R),N=OS(p.payload.compositionSnapshot),U=typeof p.payload.reportKey=="string"?p.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${P} task (${k?"continue":"first"})\u2026`),I===null){K(b,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",..._!==void 0?{agentRunId:_}:{}},requestId:A});return}if(N!==null){let G=NS(e.layout,N);if(G!==null){K(b,{type:"command.claude.result",payload:{exitCode:-1,output:G,..._!==void 0?{agentRunId:_}:{}},requestId:A});return}if(_!==void 0){let q=DS(e.layout,_,N);if(!q.ok){K(b,{type:"command.claude.result",payload:{exitCode:-1,output:q.errorMessage,..._!==void 0?{agentRunId:_}:{}},requestId:A});return}GC.set(_,N.entries.some(Ke=>Ke.scope==="run"))}}_!==void 0&&L!==void 0&&EG.set(_,L),_!==void 0&&(RG.set(_,I),R!==void 0&&R.trim().length>0&&HC.set(_,R.trim()),xG.set(_,f.trim()),Ge({projectFolderPath:I,...R!==void 0&&R.trim().length>0?{projectId:R.trim()}:{}})),VZ(e,P,f.trim(),A,b,_,k,L,C,I,U,R)}}if(p.type==="shell.session.open"&&ee(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",P=typeof p.payload.cols=="number"?p.payload.cols:120,_=typeof p.payload.rows=="number"?p.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),tC({shellSessionId:f,cwd:e.workspace,cols:P,rows:_,send:k=>{K(b,k)},requestId:A}))}if(p.type==="shell.session.close"&&ee(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"";f.length>0&&Ri(f,P=>{K(b,P)},A)}if(p.type==="shell.input"&&ee(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",P=typeof p.payload.data=="string"?p.payload.data:"";f.length>0&&P.length>0&&Zk(f,P)}if(p.type==="shell.resize"&&ee(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",P=typeof p.payload.cols=="number"?p.payload.cols:0,_=typeof p.payload.rows=="number"?p.payload.rows:0;f.length>0&&P>0&&_>0&&Qk(f,P,_)}if(p.type==="command.writer.session.end"&&ee(p.payload)){let f=p.payload.writerAgent;typeof f=="string"&&ge(f)&&(oC(f),vf(e.layout,f))}if(p.type==="command.writer.session.start"&&ee(p.payload)){let f=p.payload.writerAgent,P=typeof p.payload.writerSessionId=="string"?p.payload.writerSessionId:"";typeof f=="string"&&ge(f)&&P.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),KZ(e,f,P,A,b))}if(p.type==="command.claude.stop"&&ee(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),wC(e,qC(b),f,A))}if(p.type==="command.claude.input_respond"&&ee(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"",P=typeof p.payload.response=="string"?p.payload.response.trim():"",_=typeof p.payload.originalPrompt=="string"?p.payload.originalPrompt:"",k=typeof p.payload.partialOutput=="string"?p.payload.partialOutput:"",C=typeof p.payload.question=="string"?p.payload.question:"";f.length>0&&P.length>0&&_.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),bC(e,{agentRunId:f,originalPrompt:_,partialOutput:k,question:C,response:P,shellSessionId:EG.get(f)},A,qC(b)))}if(p.type==="dispatch.approval.required"&&ee(p.payload)){let f=typeof p.payload.requesterEmail=="string"?p.payload.requesterEmail:"A teammate",P=typeof p.payload.prompt=="string"?p.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${P}`),process.platform==="darwin"&&(0,VC.spawn)("osascript",["-e",`display notification "${P.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(p.type==="harness.request"&&ee(p.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),XZ(e,p.payload,A,b)),p.type==="harness.export.request"&&ee(p.payload)){let f=typeof p.payload.borrowerUserId=="string"?p.payload.borrowerUserId:"",P=typeof p.payload.targetDeviceId=="string"?p.payload.targetDeviceId:void 0,_=Array.isArray(p.payload.setSlugs)?p.payload.setSlugs.filter(k=>typeof k=="string"):[];f.length>0&&_.length>0&&(async()=>{let{readHarnessExportSets:k}=await Promise.resolve().then(()=>(LG(),TG)),C=k(_,e.email);K(b,{type:"harness.export.result",payload:{success:C.length>0,borrowerUserId:f,...P!==void 0?{targetDeviceId:P}:{},sets:C,errorMessage:C.length>0?void 0:"No readable harness sets were found on this machine."},requestId:A})})()}if(p.type==="harness.manifest.request"&&bd(b,e.layout),p.type==="command.claude.result"&&ee(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,P=typeof p.payload.output=="string"?p.payload.output:"",_=typeof p.payload.exitCode=="number"?p.payload.exitCode:null,k=Ea(f!==void 0?RG.get(f):void 0,Sd),C=f!==void 0?HC.get(f):void 0,L=f!==void 0?xG.get(f)??"":"",R=rb({exitCode:_,output:P});if(R&&k!==null&&NP({layout:e.layout,text:P,source:f??"command.claude.result",projectFolderPath:k,...C!==void 0?{projectId:C}:{}}),_!=null&&_!==0&&P.trim().length>0&&k!==null&&(RP({layout:e.layout,errorText:P,projectFolderPath:k,...C!==void 0?{projectId:C}:{}}),jP({layout:e.layout,text:P,source:f??"command.claude.result.failure",projectFolderPath:k,...C!==void 0?{projectId:C}:{}})),R&&L.trim().length>0&&k!==null&&wv({layout:e.layout,projectFolderPath:k,...C!==void 0?{projectId:C}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:L,output:P,createdAt:new Date().toISOString()}}),f!==void 0&&k!==null){let N=UC.get(f),U=BC.get(f);N!==void 0&&U!==void 0&&mm(k).then(G=>{let q=ib({before:U,after:G});My(N,q),BC.delete(f),UC.delete(f)})}if(R&&C!==void 0&&C.trim().length>0){let N=$(),U=N===null?null:X({wsUrl:N.wsUrl,pairingToken:N.pairingToken});U!==null&&lb(U,C,{...f!==void 0?{sourceRunId:f}:{},lesson:ab({prompt:L,output:P})})}f!==void 0&&(xa(e.layout,f),GC.delete(f),HC.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let p=new Zc(e.wsUrl);t.socket=p,p.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),yC(X({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),AC(e.layout);let b=Le(e.wsUrl)??"http://localhost:3000",A=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=tk({layout:e.layout,origin:b,...A!==void 0&&A.length>0?{claimToken:A}:{}});K(p,{type:"agent.register",payload:{role:"agent",hostname:Mi.default.hostname(),macOsUsername:Mi.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),bd(p,e.layout),PC(e,p),m(p)}),p.on("message",b=>{let A=typeof b=="string"?b:b.toString("utf8");try{let f=JSON.parse(A);if(!ee(f))return;S(f,p)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),p.on("close",(b,A)=>{s(),t.socket=void 0,t.wsConnected=!1,dS(e.layout),t.reconnectAttempt+=1;let f=typeof A=="string"?A:A.toString("utf8");fn(e.layout,{kind:"ws_close",message:"WebSocket closed",code:b,reason:f}),console.log("[agent-witch] Disconnected from server."),u()}),p.on("error",b=>{t.wakeError=b.message,fn(e.layout,{kind:"ws_error",message:b.message,stack:b.stack}),console.error(`[agent-witch] Socket error: ${b.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return eS(()=>{let p=rS();p!==null&&p.layout.installDir===e.layout.installDir&&p.layout.profileEmail===e.layout.profileEmail&&o(p.remoteBundleVersion,p.trigger);let b=oS();b!==null&&r(b)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Pa(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Bc(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let p=t.socket;return!t.wsConnected||p===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(bd(p,e.layout),{ok:!0})}}},eQ=async()=>{nt("agent-witch");let e=Mk(),t=T();jk().ok||(process.platform==="darwin"?(await jo(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),Uk(t);let o=Fk({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(hr({launchAgentLabel:Te(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),Yi());let n=await JS(),s=n[0];s!==void 0&&LC(s.layout);for(let h of n){let y=Le(h.wsUrl)??it;da(h.layout.installDir,y)}let i=n.map(h=>QZ(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),ed(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let p=i[y];if(p===void 0)return;let b=he(h.layout);uS(b,{socketOpen:p.hasMacSocketOpen(),staleAfterMs:12e4})&&p.reviveWebSocket()})},d=()=>{},u=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(Ct(h)||pl(h.installDir))},m=await Bk({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:u,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):Uc({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let S=yr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Xi(),d()});d=()=>{S(),m.stop(),ed(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Pd=eQ});var KC=l(()=>{"use strict";IG()});var OG={};Ut(OG,{startAgentWitchClient:()=>Pd});var MG=l(()=>{"use strict";KC();KC();Fo();Ny();Gu();if(!st()&&Uo(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Bu(process.argv.slice(e))),Pd()}});xy();Ny();Fo();Gu();var RW="20.x",xW="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var HK=e=>[`Node.js ${RW} or newer is required (found ${e}).`,xW].join(" "),IW=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${HK(process.version)}
`),process.exit(1))};var tQ=async()=>{nt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(lS(),aS)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},rQ=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(j0(),D0)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},oQ=async()=>{if(!Uo(st()?void 0:__agentWitchImportMetaUrl))return;IW();let e=process.argv.indexOf("report");e>=0&&process.exit(Bu(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await tQ();return}if(t==="wake"){await rQ();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>($I(),jI));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(c1(),l1));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(MG(),OG));await r()};oQ();
