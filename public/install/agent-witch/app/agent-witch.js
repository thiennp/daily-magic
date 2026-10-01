#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var lG=Object.create;var rh=Object.defineProperty;var cG=Object.getOwnPropertyDescriptor;var dG=Object.getOwnPropertyNames;var uG=Object.getPrototypeOf,pG=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var v=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Nt=(e,t)=>{for(var r in t)rh(e,r,{get:t[r],enumerable:!0})},mG=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of dG(t))!pG.call(e,n)&&n!==r&&rh(e,n,{get:()=>t[n],enumerable:!(o=cG(t,n))||o.enumerable});return e};var g=(e,t,r)=>(r=e!=null?lG(uG(e)):{},mG(t||!e||!e.__esModule?rh(r,"default",{value:e,enumerable:!0}):r,e));var Li,vL,CL,bo,oh,bZ,LL,ad,zt,sr,ld,cd,Dn,jn,ir,nh,dd,ud,pd,ki,ft,$n,Hn,md,Fr,sh,kL,Be=l(()=>{"use strict";Li={production:".agent-witch",localhost:".local-agent-witch"},vL={production:47892,localhost:47893},CL={production:"com.agent-witch",localhost:"com.local-agent-witch"},bo={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},oh="app",bZ=`${oh}/agent-witch.js`,LL=`${oh}/command`,ad={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},zt=Li.production,sr=Li.localhost,ld=vL.production,cd=vL.localhost,Dn=CL.production,jn=CL.localhost,ir="profiles",nh=bo.activeProfile,dd="harness",ud="sets",pd="manifest.json",ki=ad.projectsDir,ft=ad.logsDir,$n="agent-witch.log",Hn="agent-witch.error.log",md=ad.reportsDir,Fr=ad.deviceKeypairJson,sh=oh,kL="agent-witch.js"});var WL=l(()=>{"use strict";Be()});var TL,Po,Wi,gd=l(()=>{"use strict";TL=g(require("node:path"));Be();Po=e=>TL.default.basename(e)===sr,Wi=e=>Po(e)?jn:Dn});var EL=l(()=>{"use strict";WL();gd()});var xL,ih,gG,Ti,fG,hG,RL,yG,SG,IL=l(()=>{"use strict";EL();Be();xL=g(require("node:os")),ih=g(require("node:path")),gG=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?ih.default.resolve(e):ih.default.join(xL.default.homedir(),zt)},Ti=Wi(gG()),fG=`${Ti}-wake`,hG=`${Ti}-live`,RL=`${Ti}-watchdog`,yG=`${Ti}-automation-scheduler`,SG=`${Ti}-updater`});var Fn=v(ah=>{"use strict";Object.defineProperty(ah,"__esModule",{value:!0});ah.stringify=AG;function AG(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=v(lh=>{"use strict";Object.defineProperty(lh,"__esModule",{value:!0});lh.generateTypeGuardError=bG;var OL=Fn();function bG(e,t,r){return(0,OL.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,OL.stringify)(e)}) to be "${r}"`}});var Ur=v(fd=>{"use strict";Object.defineProperty(fd,"__esModule",{value:!0});fd.isNonNullObject=void 0;var PG=O(),wG=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,PG.generateTypeGuardError)(e,t.identifier,"non-null object")),r};fd.isNonNullObject=wG});var Dt=v(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.attachTypeGuardMeta=he.isArrayTypeGuard=he.isNestedObjectTypeGuard=he.getTypeGuardWrapperKind=he.getTypeGuardInnerGuard=he.getTypeGuardItemGuard=he.getTypeGuardSchema=void 0;var _G=e=>e.schema;he.getTypeGuardSchema=_G;var vG=e=>e.itemGuard;he.getTypeGuardItemGuard=vG;var CG=e=>e.innerGuard;he.getTypeGuardInnerGuard=CG;var LG=e=>e.wrapperKind;he.getTypeGuardWrapperKind=LG;var kG=e=>{if((0,he.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};he.isNestedObjectTypeGuard=kG;var WG=e=>{if((0,he.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};he.isArrayTypeGuard=WG;var TG=(e,t)=>Object.assign(e,t);he.attachTypeGuardMeta=TG});var Ei=v(wo=>{"use strict";Object.defineProperty(wo,"__esModule",{value:!0});wo.getExpectedTypeName=wo.getTypeGuardDisplayName=void 0;var ML=Dt(),EG=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};wo.getTypeGuardDisplayName=EG;var xG=e=>{let t=(0,ML.getTypeGuardWrapperKind)(e),r=(0,ML.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,wo.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};wo.getExpectedTypeName=xG});var _o=v(hd=>{"use strict";Object.defineProperty(hd,"__esModule",{value:!0});hd.createValidationResult=void 0;var RG=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});hd.createValidationResult=RG});var Un=v(yd=>{"use strict";Object.defineProperty(yd,"__esModule",{value:!0});yd.createValidationError=void 0;var IG=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});yd.createValidationError=IG});var Bn=v(Sd=>{"use strict";Object.defineProperty(Sd,"__esModule",{value:!0});Sd.createTreeNode=void 0;var OG=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Sd.createTreeNode=OG});var xi=v(Ad=>{"use strict";Object.defineProperty(Ad,"__esModule",{value:!0});Ad.combineResults=void 0;var MG=_o(),NG=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,MG.createValidationResult)(r,o,n)};Ad.combineResults=NG});var Pd=v(bd=>{"use strict";Object.defineProperty(bd,"__esModule",{value:!0});bd.createSimplifiedTree=void 0;var NL=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=NL(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},zG=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=NL(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};bd.createSimplifiedTree=zG});var Ii=v(_d=>{"use strict";Object.defineProperty(_d,"__esModule",{value:!0});_d.validateObject=void 0;var DG=Ur(),Ri=_o(),jG=Un(),wd=Bn(),$G=xi(),zL=vd(),HG=(e,t,r)=>{let o=()=>{let i=(0,jG.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,wd.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Ri.createValidationResult)(!1,[],a):(0,Ri.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Ri.createValidationResult)(!0,[],(0,wd.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...u]=c,m=d,S=t[m],f=e[m],y=(0,zL.validateProperty)(m,f,S,r);return y.valid?u.length===0?(0,Ri.createValidationResult)(!0,[],(0,wd.createTreeNode)(r.path,!0,"object",e)):a(u):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let u=t[d];return(0,zL.validateProperty)(d,e[d],u,r)}),a=(0,$G.combineResults)(i,r.path),c=(0,wd.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let u=d.tree.path.split(".").pop()||"unknown";c.children[u]=d.tree}}),(0,Ri.createValidationResult)(a.valid,a.errors,c)};return(0,DG.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};_d.validateObject=HG});var jL=v(kd=>{"use strict";Object.defineProperty(kd,"__esModule",{value:!0});kd.validateArray=void 0;var FG=Fn(),Cd=_o(),DL=Un(),Ld=Bn(),UG=xi(),BG=Ii(),GG=Ei(),qG=Dt(),VG=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,DL.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,Ld.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,Cd.createValidationResult)(!1,[c],d)}let n=(0,qG.getTypeGuardSchema)(t),s=e.map((c,d)=>{let u=`${o}[${d}]`,m={path:u,config:r.config||null};if(n)return(0,BG.validateObject)(c,n,m);let S=t(c,null),f=(0,GG.getExpectedTypeName)(t),y=(0,FG.stringify)(c);if(S)return(0,Cd.createValidationResult)(!0,[],(0,Ld.createTreeNode)(u,!0,f,c));let p=y.length>200?`Expected ${u} to be "${f}"`:`Expected ${u} (${y}) to be "${f}"`,A=(0,DL.createValidationError)(u,f,c,p),b=(0,Ld.createTreeNode)(u,!1,f,c);return b.errors=[A],(0,Cd.createValidationResult)(!1,[A],b)}),i=(0,UG.combineResults)(s,o),a=(0,Ld.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,Cd.createValidationResult)(i.valid,i.errors,a)};kd.validateArray=VG});var vd=v(Td=>{"use strict";Object.defineProperty(Td,"__esModule",{value:!0});Td.validateProperty=void 0;var $L=_o(),KG=Un(),HL=Bn(),JG=Ei(),Wd=Dt(),YG=Ii(),XG=jL(),ZG=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,Wd.getTypeGuardSchema)(r),c=(0,Wd.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,YG.validateObject)(t,a,s);if(c&&(0,Wd.isArrayTypeGuard)(r))return(0,XG.validateArray)(t,c,s)}let d=u=>{let m=r(t,u),S=(0,JG.getExpectedTypeName)(r);return m?(0,$L.createValidationResult)(!0,[],(0,HL.createTreeNode)(n,!0,S,t)):(()=>{let f=(0,KG.createValidationError)(n,S,t,`Expected ${n} (${JSON.stringify(t)}) to be "${S}"`),y=(0,HL.createTreeNode)(n,!1,S,t);return y.errors=[f],(0,$L.createValidationResult)(!1,[f],y)})()};if((0,Wd.isNestedObjectTypeGuard)(r)){let u=o.config?{...o.config,identifier:n}:null;return d(u)}return d(null)};Td.validateProperty=ZG});var xd=v(Ed=>{"use strict";Object.defineProperty(Ed,"__esModule",{value:!0});Ed.isNil=void 0;var QG=O(),e2=function(e,t){return e!=null?(t&&t.callbackOnError((0,QG.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Ed.isNil=e2});var ch=v(Rd=>{"use strict";Object.defineProperty(Rd,"__esModule",{value:!0});Rd.isDefined=void 0;var t2=O(),r2=xd(),o2=function(e,t){return(0,r2.isNil)(e,null)?(t&&t.callbackOnError((0,t2.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Rd.isDefined=o2});var dh=v(Id=>{"use strict";Object.defineProperty(Id,"__esModule",{value:!0});Id.reportValidationResults=void 0;var n2=Pd(),FL=ch(),s2=xd(),i2=(e,t)=>{if(e.valid===!0||(0,s2.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,FL.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,n2.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,FL.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Id.reportValidationResults=i2});var uh=v(ee=>{"use strict";Object.defineProperty(ee,"__esModule",{value:!0});ee.Validation=ee.reportValidationResults=ee.validateObject=ee.validateProperty=ee.createSimplifiedTree=ee.combineResults=ee.createTreeNode=ee.createValidationError=ee.createValidationResult=ee.getExpectedTypeName=void 0;var a2=Ei();Object.defineProperty(ee,"getExpectedTypeName",{enumerable:!0,get:function(){return a2.getExpectedTypeName}});var l2=_o();Object.defineProperty(ee,"createValidationResult",{enumerable:!0,get:function(){return l2.createValidationResult}});var c2=Un();Object.defineProperty(ee,"createValidationError",{enumerable:!0,get:function(){return c2.createValidationError}});var d2=Bn();Object.defineProperty(ee,"createTreeNode",{enumerable:!0,get:function(){return d2.createTreeNode}});var u2=xi();Object.defineProperty(ee,"combineResults",{enumerable:!0,get:function(){return u2.combineResults}});var p2=Pd();Object.defineProperty(ee,"createSimplifiedTree",{enumerable:!0,get:function(){return p2.createSimplifiedTree}});var m2=vd();Object.defineProperty(ee,"validateProperty",{enumerable:!0,get:function(){return m2.validateProperty}});var g2=Ii();Object.defineProperty(ee,"validateObject",{enumerable:!0,get:function(){return g2.validateObject}});var f2=dh();Object.defineProperty(ee,"reportValidationResults",{enumerable:!0,get:function(){return f2.reportValidationResults}});var h2=_o(),y2=xi(),S2=Un(),A2=Bn(),b2=vd(),P2=Ii(),w2=dh(),_2=Pd();ee.Validation={result:h2.createValidationResult,combine:y2.combineResults,error:S2.createValidationError,treeNode:A2.createTreeNode,property:b2.validateProperty,object:P2.validateObject,report:w2.reportValidationResults,createSimplifiedTree:_2.createSimplifiedTree}});var Od=v(ph=>{"use strict";Object.defineProperty(ph,"__esModule",{value:!0});ph.isType=C2;var UL=Ur(),BL=uh(),v2=Dt();function C2(e){if(!(0,UL.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,BL.validateObject)(r,e,s);return(0,BL.reportValidationResults)(i,o||null),i.valid}return(0,UL.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,v2.attachTypeGuardMeta)(t,{schema:e})}});var KL=v(vo=>{"use strict";Object.defineProperty(vo,"__esModule",{value:!0});vo.isNestedType=vo.isShape=void 0;vo.isSchema=Oi;var GL=Ur(),qL=uh(),VL=Dt();function Oi(e){if(!(0,GL.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=k2(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,qL.validateObject)(o,t,i);return(0,qL.reportValidationResults)(a,n||null),a.valid}return(0,GL.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,VL.attachTypeGuardMeta)(r,{schema:t})}function L2(e){return typeof e=="function"?e:Array.isArray(e)?W2(e):typeof e=="object"&&e!==null?Oi(e):e}function k2(e){let t={};for(let[r,o]of Object.entries(e))t[r]=L2(o);return t}function W2(e){let t=e[0],r=Oi(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,VL.attachTypeGuardMeta)(o,{itemGuard:r})}vo.isShape=Oi;vo.isNestedType=Oi});var JL=v(mh=>{"use strict";Object.defineProperty(mh,"__esModule",{value:!0});mh.isObjectWith=E2;var T2=Od();function E2(e){return(0,T2.isType)(e)}});var YL=v(gh=>{"use strict";Object.defineProperty(gh,"__esModule",{value:!0});gh.isObject=R2;var x2=Od();function R2(e){return(0,x2.isType)(e)}});var XL=v(fh=>{"use strict";Object.defineProperty(fh,"__esModule",{value:!0});fh.guardWithTolerance=I2;function I2(e,t,r){return t(e,r),e}});var ZL=v(hh=>{"use strict";Object.defineProperty(hh,"__esModule",{value:!0});hh.isBranded=M2;var O2=O();function M2(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,O2.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var QL=v(Md=>{"use strict";Object.defineProperty(Md,"__esModule",{value:!0});Md.BrandSymbols=void 0;Md.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var ek=v(Nd=>{"use strict";Object.defineProperty(Nd,"__esModule",{value:!0});Nd.isAny=void 0;var N2=function(e){return!0};Nd.isAny=N2});var Mi=v(yh=>{"use strict";Object.defineProperty(yh,"__esModule",{value:!0});yh.reportTypeGuardError=D2;var z2=O();function D2(e,t,r){e&&e.callbackOnError((0,z2.generateTypeGuardError)(t,e.identifier,r))}});var tk=v(zd=>{"use strict";Object.defineProperty(zd,"__esModule",{value:!0});zd.isBoolean=void 0;var j2=Mi(),$2=function(t,r){return typeof t!="boolean"?((0,j2.reportTypeGuardError)(r,t,"boolean"),!1):!0};zd.isBoolean=$2});var rk=v(Dd=>{"use strict";Object.defineProperty(Dd,"__esModule",{value:!0});Dd.isDate=void 0;var H2=O(),F2=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,H2.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Dd.isDate=F2});var Sh=v(jd=>{"use strict";Object.defineProperty(jd,"__esModule",{value:!0});jd.isNumber=void 0;var U2=Mi(),B2=function(t,r){return typeof t!="number"||isNaN(t)?((0,U2.reportTypeGuardError)(r,t,"number"),!1):!0};jd.isNumber=B2});var ok=v($d=>{"use strict";Object.defineProperty($d,"__esModule",{value:!0});$d.isString=void 0;var G2=Mi(),q2=function(t,r){return typeof t!="string"?((0,G2.reportTypeGuardError)(r,t,"string"),!1):!0};$d.isString=q2});var nk=v(Hd=>{"use strict";Object.defineProperty(Hd,"__esModule",{value:!0});Hd.isUnknown=void 0;var V2=function(e){return!0};Hd.isUnknown=V2});var sk=v(Fd=>{"use strict";Object.defineProperty(Fd,"__esModule",{value:!0});Fd.isFunction=void 0;var K2=O(),J2=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,K2.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Fd.isFunction=J2});var ak=v(Ud=>{"use strict";Object.defineProperty(Ud,"__esModule",{value:!0});Ud.isFile=void 0;var ik=O(),Y2=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,ik.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,ik.generateTypeGuardError)(e,t.identifier,"File")),!1)};Ud.isFile=Y2});var ck=v(Bd=>{"use strict";Object.defineProperty(Bd,"__esModule",{value:!0});Bd.isFileList=void 0;var lk=O(),X2=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,lk.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,lk.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Bd.isFileList=X2});var uk=v(Gd=>{"use strict";Object.defineProperty(Gd,"__esModule",{value:!0});Gd.isBlob=void 0;var dk=O(),Z2=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,dk.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,dk.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Gd.isBlob=Z2});var mk=v(qd=>{"use strict";Object.defineProperty(qd,"__esModule",{value:!0});qd.isFormData=void 0;var pk=O(),Q2=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,pk.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,pk.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};qd.isFormData=Q2});var fk=v(Vd=>{"use strict";Object.defineProperty(Vd,"__esModule",{value:!0});Vd.isURL=void 0;var gk=O(),e5=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,gk.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,gk.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Vd.isURL=e5});var yk=v(Kd=>{"use strict";Object.defineProperty(Kd,"__esModule",{value:!0});Kd.isURLSearchParams=void 0;var hk=O(),t5=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,hk.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,hk.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Kd.isURLSearchParams=t5});var Sk=v(Jd=>{"use strict";Object.defineProperty(Jd,"__esModule",{value:!0});Jd.isMap=void 0;var r5=O(),o5=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,r5.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Jd.isMap=o5});var Ak=v(Yd=>{"use strict";Object.defineProperty(Yd,"__esModule",{value:!0});Yd.isSet=void 0;var n5=O(),s5=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,n5.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Yd.isSet=s5});var bk=v(Ah=>{"use strict";Object.defineProperty(Ah,"__esModule",{value:!0});Ah.isIndexSignature=a5;var i5=O();function a5(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,i5.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,u)=>{let m=s[d],S=e(d,o?{...o,identifier:`${o.identifier}[key:${u}]`}:null),f=t(m,o?{...o,identifier:`${o.identifier}[value:${u}]`}:null);return S&&f})}}});var Pk=v(Xd=>{"use strict";Object.defineProperty(Xd,"__esModule",{value:!0});Xd.isError=void 0;var l5=Mi(),c5=function(t,r){return t instanceof Error?!0:((0,l5.reportTypeGuardError)(r,t,"Error"),!1)};Xd.isError=c5});var Ph=v(bh=>{"use strict";Object.defineProperty(bh,"__esModule",{value:!0});bh.isArrayWithEachItem=p5;var d5=O(),u5=Dt();function p5(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,d5.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,u5.attachTypeGuardMeta)(t,{itemGuard:e})}});var wh=v(Zd=>{"use strict";Object.defineProperty(Zd,"__esModule",{value:!0});Zd.isNonEmptyArray=void 0;var m5=O(),g5=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,m5.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Zd.isNonEmptyArray=g5});var wk=v(_h=>{"use strict";Object.defineProperty(_h,"__esModule",{value:!0});_h.isNonEmptyArrayWithEachItem=y5;var f5=Ph(),h5=wh();function y5(e){return function(t,r){return(0,f5.isArrayWithEachItem)(e)(t,r)&&(0,h5.isNonEmptyArray)(t,r)}}});var vk=v(vh=>{"use strict";Object.defineProperty(vh,"__esModule",{value:!0});vh.isTuple=S5;var _k=O();function S5(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,_k.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,_k.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var Ck=v(Ch=>{"use strict";Object.defineProperty(Ch,"__esModule",{value:!0});Ch.isObjectWithEachItem=b5;var A5=O();function b5(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,A5.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var Lk=v(Lh=>{"use strict";Object.defineProperty(Lh,"__esModule",{value:!0});Lh.isPartialOf=w5;var P5=Ur();function w5(e){return function(t,r){if(!(0,P5.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var kk=v(kh=>{"use strict";Object.defineProperty(kh,"__esModule",{value:!0});kh.isPick=v5;var _5=Ur();function v5(e,...t){return function(r,o){if(!(0,_5.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var Wk=v(Wh=>{"use strict";Object.defineProperty(Wh,"__esModule",{value:!0});Wh.isOmit=L5;var C5=Ur();function L5(e,...t){return function(r,o){if(!(0,C5.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let u=d.slice(9),m=u.indexOf(" ("),S=m>=0?u.slice(0,m):u;if(a.has(S))return!1;let f=S.startsWith(s+".")&&S.slice(s.length+1).split(".")[0]||"";return!(f&&!Object.prototype.hasOwnProperty.call(r,f))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var Tk=v(Qd=>{"use strict";Object.defineProperty(Qd,"__esModule",{value:!0});Qd.isNonEmptyString=void 0;var k5=O(),W5=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,k5.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Qd.isNonEmptyString=W5});var Ek=v(eu=>{"use strict";Object.defineProperty(eu,"__esModule",{value:!0});eu.isNonNegativeNumber=void 0;var T5=O(),E5=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,T5.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};eu.isNonNegativeNumber=E5});var xk=v(tu=>{"use strict";Object.defineProperty(tu,"__esModule",{value:!0});tu.isPositiveNumber=void 0;var x5=O(),R5=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,x5.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};tu.isPositiveNumber=R5});var Rk=v(ru=>{"use strict";Object.defineProperty(ru,"__esModule",{value:!0});ru.isNonPositiveNumber=void 0;var I5=O(),O5=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,I5.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};ru.isNonPositiveNumber=O5});var Ik=v(ou=>{"use strict";Object.defineProperty(ou,"__esModule",{value:!0});ou.isNegativeNumber=void 0;var M5=O(),N5=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,M5.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};ou.isNegativeNumber=N5});var Ok=v(nu=>{"use strict";Object.defineProperty(nu,"__esModule",{value:!0});nu.isInteger=void 0;var z5=O(),D5=Sh(),j5=function(e,t){return!(0,D5.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,z5.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};nu.isInteger=j5});var Mk=v(su=>{"use strict";Object.defineProperty(su,"__esModule",{value:!0});su.isPositiveInteger=void 0;var $5=O(),H5=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,$5.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};su.isPositiveInteger=H5});var Nk=v(iu=>{"use strict";Object.defineProperty(iu,"__esModule",{value:!0});iu.isNegativeInteger=void 0;var F5=O(),U5=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,F5.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};iu.isNegativeInteger=U5});var zk=v(au=>{"use strict";Object.defineProperty(au,"__esModule",{value:!0});au.isNonNegativeInteger=void 0;var B5=O(),G5=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,B5.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};au.isNonNegativeInteger=G5});var Dk=v(lu=>{"use strict";Object.defineProperty(lu,"__esModule",{value:!0});lu.isNonPositiveInteger=void 0;var q5=O(),V5=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,q5.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};lu.isNonPositiveInteger=V5});var jk=v(du=>{"use strict";Object.defineProperty(du,"__esModule",{value:!0});du.isNumeric=void 0;var cu=O(),K5=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,cu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,cu.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,cu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,cu.generateTypeGuardError)(e,t.identifier,"number key")),!1};du.isNumeric=K5});var $k=v(uu=>{"use strict";Object.defineProperty(uu,"__esModule",{value:!0});uu.isBooleanLike=void 0;var Th=O(),J5=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Th.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Th.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};uu.isBooleanLike=J5});var Hk=v(pu=>{"use strict";Object.defineProperty(pu,"__esModule",{value:!0});pu.isDateLike=void 0;var Ni=O(),Y5=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Ni.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Ni.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Ni.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Ni.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Ni.generateTypeGuardError)(e,t.identifier,"date-like")),!1};pu.isDateLike=Y5});var Fk=v(mu=>{"use strict";Object.defineProperty(mu,"__esModule",{value:!0});mu.isBigInt=void 0;var X5=O(),Z5=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,X5.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};mu.isBigInt=Z5});var xh=v(Eh=>{"use strict";Object.defineProperty(Eh,"__esModule",{value:!0});Eh.isOneOf=Q5;var Uk=Fn();function Q5(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,Uk.stringify)(t)}) must be one of following values ${e.map(Uk.stringify).join(" | ")}`),o}}});var Bk=v(Rh=>{"use strict";Object.defineProperty(Rh,"__esModule",{value:!0});Rh.isOneOfTypes=rq;var eq=Fn(),tq=Ei();function rq(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,eq.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,tq.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let u=`- ${d}`;a.includes(u)||a.push(u)}})),r.callbackOnError(a.join(`
`))}return n}}});var Gk=v(Ih=>{"use strict";Object.defineProperty(Ih,"__esModule",{value:!0});Ih.isIntersectionOf=oq;function oq(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var qk=v(Oh=>{"use strict";Object.defineProperty(Oh,"__esModule",{value:!0});Oh.isExtensionOf=nq;function nq(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var Vk=v(Mh=>{"use strict";Object.defineProperty(Mh,"__esModule",{value:!0});Mh.isNullOr=iq;var sq=Dt();function iq(e){function t(r,o){return r===null?!0:e(r,o)}return(0,sq.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var Kk=v(Nh=>{"use strict";Object.defineProperty(Nh,"__esModule",{value:!0});Nh.isUndefinedOr=lq;var aq=Dt();function lq(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,aq.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var Jk=v(zh=>{"use strict";Object.defineProperty(zh,"__esModule",{value:!0});zh.isNilOr=dq;var cq=Dt();function dq(e){function t(r,o){return r==null?!0:e(r,o)}return(0,cq.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var Yk=v(Dh=>{"use strict";Object.defineProperty(Dh,"__esModule",{value:!0});Dh.isAsserted=uq;function uq(e){return!0}});var Xk=v(jh=>{"use strict";Object.defineProperty(jh,"__esModule",{value:!0});jh.isEnum=mq;var pq=xh();function mq(e){return function(t,r){return(0,pq.isOneOf)(...Object.values(e))(t,r)}}});var Zk=v($h=>{"use strict";Object.defineProperty($h,"__esModule",{value:!0});$h.isEqualTo=hq;var gq=O(),fq=Fn();function hq(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,gq.generateTypeGuardError)(t,r.identifier,`equal to ${(0,fq.stringify)(e)}`)),!1):!0}}});var Qk=v(gu=>{"use strict";Object.defineProperty(gu,"__esModule",{value:!0});gu.isRegex=void 0;var yq=O(),Sq=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,yq.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};gu.isRegex=Sq});var tW=v(Hh=>{"use strict";Object.defineProperty(Hh,"__esModule",{value:!0});Hh.isPattern=Aq;var eW=O();function Aq(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,eW.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,eW.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var rW=v(Fh=>{"use strict";Object.defineProperty(Fh,"__esModule",{value:!0});Fh.by=bq;function bq(e){return function(t){return e(t,null)}}});var oW=v(Uh=>{"use strict";Object.defineProperty(Uh,"__esModule",{value:!0});Uh.toNumber=Pq;function Pq(e){return typeof e=="number"?e:Number(e)}});var nW=v(Bh=>{"use strict";Object.defineProperty(Bh,"__esModule",{value:!0});Bh.toDate=wq;function wq(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var sW=v(Gh=>{"use strict";Object.defineProperty(Gh,"__esModule",{value:!0});Gh.toBoolean=_q;function _q(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var iW=v(fu=>{"use strict";Object.defineProperty(fu,"__esModule",{value:!0});fu.isSymbol=void 0;var vq=O(),Cq=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,vq.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};fu.isSymbol=Cq});var Gn=v(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var Lq=Od();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return Lq.isType}});var qh=KL();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return qh.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return qh.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return qh.isNestedType}});var kq=JL();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return kq.isObjectWith}});var Wq=YL();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return Wq.isObject}});var Tq=XL();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return Tq.guardWithTolerance}});var Eq=ZL();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return Eq.isBranded}});var xq=QL();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return xq.BrandSymbols}});var Rq=ek();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return Rq.isAny}});var Iq=tk();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return Iq.isBoolean}});var Oq=rk();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return Oq.isDate}});var Mq=ch();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return Mq.isDefined}});var Nq=xd();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return Nq.isNil}});var zq=Sh();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return zq.isNumber}});var Dq=ok();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return Dq.isString}});var jq=nk();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return jq.isUnknown}});var $q=sk();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return $q.isFunction}});var Hq=ak();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return Hq.isFile}});var Fq=ck();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return Fq.isFileList}});var Uq=uk();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return Uq.isBlob}});var Bq=mk();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return Bq.isFormData}});var Gq=fk();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return Gq.isURL}});var qq=yk();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return qq.isURLSearchParams}});var Vq=Sk();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return Vq.isMap}});var Kq=Ak();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return Kq.isSet}});var Jq=bk();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return Jq.isIndexSignature}});var Yq=Pk();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return Yq.isError}});var Xq=Ph();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return Xq.isArrayWithEachItem}});var Zq=wh();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return Zq.isNonEmptyArray}});var Qq=wk();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return Qq.isNonEmptyArrayWithEachItem}});var eV=vk();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return eV.isTuple}});var tV=Ur();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return tV.isNonNullObject}});var rV=Ck();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return rV.isObjectWithEachItem}});var oV=Lk();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return oV.isPartialOf}});var nV=kk();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return nV.isPick}});var sV=Wk();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return sV.isOmit}});var iV=Tk();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return iV.isNonEmptyString}});var aV=Ek();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return aV.isNonNegativeNumber}});var lV=xk();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return lV.isPositiveNumber}});var cV=Rk();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return cV.isNonPositiveNumber}});var dV=Ik();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return dV.isNegativeNumber}});var uV=Ok();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return uV.isInteger}});var pV=Mk();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return pV.isPositiveInteger}});var mV=Nk();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return mV.isNegativeInteger}});var gV=zk();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return gV.isNonNegativeInteger}});var fV=Dk();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return fV.isNonPositiveInteger}});var hV=jk();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return hV.isNumeric}});var yV=$k();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return yV.isBooleanLike}});var SV=Hk();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return SV.isDateLike}});var AV=Fk();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return AV.isBigInt}});var bV=xh();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return bV.isOneOf}});var PV=Bk();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return PV.isOneOfTypes}});var wV=Gk();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return wV.isIntersectionOf}});var _V=qk();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return _V.isExtensionOf}});var vV=Vk();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return vV.isNullOr}});var CV=Kk();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return CV.isUndefinedOr}});var LV=Jk();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return LV.isNilOr}});var kV=Yk();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return kV.isAsserted}});var WV=Xk();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return WV.isEnum}});var TV=Zk();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return TV.isEqualTo}});var EV=Qk();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return EV.isRegex}});var xV=tW();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return xV.isPattern}});var RV=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return RV.generateTypeGuardError}});var IV=rW();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return IV.by}});var OV=oW();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return OV.toNumber}});var MV=nW();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return MV.toDate}});var NV=sW();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return NV.toBoolean}});var zV=iW();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return zV.isSymbol}})});var qn,aW,DV,lW,cW=l(()=>{"use strict";qn=g(require("node:path")),aW=require("node:url"),DV=()=>!0,lW=()=>{if(DV()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?qn.default.dirname(qn.default.resolve(e)):qn.default.dirname(qn.default.resolve(__filename))}return qn.default.dirname((0,aW.fileURLToPath)(__agentWitchImportMetaUrl))}});var Vh,dW,D,uW,jV,Br,W,hu,ar,pW,yu,Vn,Su,_e,ht,Kh,yt,Jh,N,Yh=l(()=>{"use strict";Vh=g(require("node:fs")),dW=g(require("node:os")),D=g(require("node:path")),uW=g(Gn());Be();cW();gd();gd();jV=lW(),Br=e=>e.trim().toLowerCase(),W=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return D.default.resolve(e);let t=D.default.resolve(jV),r=D.default.basename(t),o=D.default.basename(D.default.dirname(t));return r===sh&&(o===zt||o===sr)?D.default.dirname(t):r===zt||r===sr?t:D.default.join(dW.default.homedir(),zt)},hu=(e=W())=>D.default.join(e,sh),ar=(e=W())=>D.default.join(hu(e),kL),pW=(e,t,r)=>t!==null?D.default.join(e,ir,t,r):D.default.join(e,r),yu=e=>pW(e.installDir,e.profileEmail,ki),Vn=e=>pW(e.installDir,e.profileEmail,ft),Su=e=>e.profileEmail!==null?D.default.join(e.installDir,ir,e.profileEmail,Fr):D.default.join(e.installDir,Fr),_e=(e=W())=>Wi(e),ht=(e=W())=>Po(e)?cd:ld,Kh=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Br(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Br(t):null},yt=(e=W())=>{let t=D.default.join(e,nh);if(!Vh.default.existsSync(t))return null;try{let r=JSON.parse(Vh.default.readFileSync(t,"utf8"));if((0,uW.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Br(r.email)}catch{return null}return null},Jh=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Br(r):null}let t=Kh();return t!==null?t:yt()},N=e=>{let t=W(),r=hu(t),o=ar(t),n=Jh(e);if(n!==null){let S=D.default.join(t,ir,n),f=D.default.join(S,dd),y=D.default.join(S,ki),p=D.default.join(S,ft),A=D.default.join(S,md),b=D.default.join(S,Fr),h=D.default.join(S,ft,$n),w=D.default.join(S,ft,Hn);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:p,mainLogPath:h,errorLogPath:w,reportsDir:A,deviceKeypairPath:b,configPath:D.default.join(S,"config.json"),harnessRootDir:f,harnessManifestPath:D.default.join(f,pd),harnessSetsDir:D.default.join(f,ud)}}let s=D.default.join(t,dd),i=D.default.join(t,ki),a=D.default.join(t,ft),c=D.default.join(t,md),d=D.default.join(t,Fr),u=D.default.join(t,ft,$n),m=D.default.join(t,ft,Hn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:u,errorLogPath:m,reportsDir:c,deviceKeypairPath:d,configPath:D.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:D.default.join(s,pd),harnessSetsDir:D.default.join(s,ud)}}});var Xh,mW,$V,HV,gW,Zh,fW=l(()=>{"use strict";Xh=g(require("node:fs")),mW=g(require("node:path"));Be();Yh();$V=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),HV=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,gW=e=>{let t=mW.default.join(e,bo.wakePort);if(!Xh.default.existsSync(t))return null;try{let r=JSON.parse(Xh.default.readFileSync(t,"utf8"));if($V(r)&&HV(r.wakePort))return r.wakePort}catch{return null}return null},Zh=(e=W())=>gW(e)??ht(e)});var J=l(()=>{"use strict";Yh();fW()});var Qh,ey,Au=l(()=>{"use strict";Qh=new Set(["","loginwindow","_mbsetupuser","root"]),ey=5e3});var hW,qV,yW,ty,ry=l(()=>{"use strict";hW=require("node:child_process");Au();qV=e=>e.trim().toLowerCase(),yW=e=>e==null?!1:!Qh.has(qV(e)),ty=()=>{if(process.platform!=="darwin")return null;try{let t=(0,hW.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return yW(t)?t:null}catch{return null}}});var AW,SW,St,zi=l(()=>{"use strict";AW=g(require("node:os"));ry();SW=e=>e.trim().toLowerCase(),St=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?ty():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??AW.default.userInfo().username;return SW(r)===SW(o)}});var bW,PW,Co,wW=l(()=>{"use strict";bW=require("node:child_process"),PW=g(require("node:fs"));J();zi();Co=(e=W())=>{let t=ar(e);if(!PW.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!St())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=yt(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,bW.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var _W,Di,bu=l(()=>{"use strict";_W=require("node:child_process"),Di=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,_W.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Pu,oy,vW,te,wu,ji=l(()=>{"use strict";Pu=g(require("node:fs")),oy=g(require("node:path"));J();Be();vW=e=>{let t=oy.default.join(e,ir);return Pu.default.existsSync(t)?Pu.default.readdirSync(t).filter(r=>Pu.default.statSync(oy.default.join(t,r)).isDirectory()).map(r=>Br(r)).toSorted():[]},te=(e=W())=>{let t=_e(e);return[{profileEmail:vW(e)[0]??null,launchAgentLabel:t}]},wu=(e=W())=>vW(e)});var ny,CW,LW,VV,lr,_u=l(()=>{"use strict";ny=g(require("node:fs")),CW=g(require("node:os")),LW=g(require("node:path"));J();ji();VV=()=>LW.default.join(CW.default.homedir(),"Library","LaunchAgents"),lr=(e=W())=>{let t=_e(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of te(e))r.add(n.launchAgentLabel);let o=VV();if(ny.default.existsSync(o))for(let n of ny.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var kW,$i,WW=l(()=>{"use strict";J();bu();_u();ji();kW=(e=W())=>{let t=new Set(te(e).map(r=>r.launchAgentLabel));return lr(e).filter(r=>!t.has(r))},$i=(e=W())=>{for(let t of kW(e))Di(t)}});var Hi,sy=l(()=>{"use strict";J();bu();_u();Hi=(e=W())=>{for(let t of lr(e))Di(t)}});var TW,EW,KV,Lo,xW=l(()=>{"use strict";TW=require("node:child_process"),EW=require("node:util"),KV=(0,EW.promisify)(TW.execFile),Lo=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await KV("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var ko,JV,iy,ay=l(()=>{"use strict";ko=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),JV=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,iy=e=>{let t=e.pathValue??JV(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${ko(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${ko(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${ko(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${ko(e.homeDir)}</string>
    <key>PATH</key>
    <string>${ko(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${ko(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${ko(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var vu,ly=l(()=>{"use strict";vu=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Wo,cy,Fi,YV,XV,ZV,RW,cr,dy=l(()=>{"use strict";Wo=g(require("node:fs")),cy=g(require("node:os")),Fi=g(require("node:path"));Be();J();ay();ly();YV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),XV=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,ZV=e=>{let t=Fi.default.join(e,bo.wakePort);if(!Wo.default.existsSync(t))return ht(e);try{let r=JSON.parse(Wo.default.readFileSync(t,"utf8"));if(YV(r)&&XV(r.wakePort))return r.wakePort}catch{return ht(e)}return ht(e)},RW=(e,t=cy.default.homedir())=>Fi.default.join(t,"Library","LaunchAgents",`${e}.plist`),cr=e=>{let t=e.installDir??W(),r=e.homeDir??cy.default.homedir(),o=RW(e.launchAgentLabel,r),n=Wo.default.existsSync(o)?Wo.default.readFileSync(o,"utf8"):null;if(n!==null&&vu(n))return{ok:!0,rewritten:!1,plistPath:o};let s=iy({launchAgentLabel:e.launchAgentLabel,runPath:Fi.default.join(t,LL,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??ZV(t)});if(!vu(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Wo.default.mkdirSync(Fi.default.dirname(o),{recursive:!0}),Wo.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var OW,MW,NW,Ui,QV,eK,IW,xe,uy=l(()=>{"use strict";OW=require("node:child_process"),MW=g(require("node:fs")),NW=require("node:util");J();dy();zi();Ui=(0,NW.promisify)(OW.execFile),QV=async e=>{try{return await Ui("launchctl",["print",e]),!0}catch{return!1}},eK=async(e,t,r)=>{await QV(t)&&await Ui("launchctl",["bootout",t]).catch(()=>{}),await Ui("launchctl",["bootstrap",e,r]),await Ui("launchctl",["enable",t])},IW=async e=>{try{return await Ui("launchctl",["kickstart","-k",e]),!0}catch{return!1}},xe=async(e,t=W())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!St())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=cr({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await IW(n))return{ok:!0};let i=s.plistPath;if(!MW.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await eK(o,n,i),await IW(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var To,zW=l(()=>{"use strict";J();uy();ji();To=async(e=W())=>{let t=[];for(let r of te(e))(await xe(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var Xe,dr,DW=l(()=>{"use strict";sy();zi();Au();Xe=e=>{St()||(Hi(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},dr=(e,t=ey)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{St()||e()},t);return()=>{clearInterval(r)}}});var re=l(()=>{"use strict";IL();wW();bu();WW();sy();_u();zi();xW();zW();uy();dy();ly();ay();ji();ry();Au();DW()});var py=l(()=>{"use strict";re()});var jW,$W,Cu,HW,Kn,FW,UW,Eo=l(()=>{"use strict";jW=".agent-witch",$W="memory",Cu="project.json",HW="chunks.ndjson",Kn="runs.ndjson",FW="reports",UW=".json"});var BW=l(()=>{"use strict";Eo()});var GW,Lu,my=l(()=>{"use strict";GW=g(require("node:path"));BW();Lu=(e,t)=>GW.default.join(e.trim(),`${t.trim()}${UW}`)});var Bi,qW,VW=l(()=>{"use strict";Bi="agent-witch.js",qW="command"});var ku=l(()=>{"use strict";VW()});var xo,KW,JW=l(()=>{"use strict";ku();xo=e=>`'${e.replace(/'/g,"'\\''")}'`,KW=e=>{let t=`${e.installDir.trim()}/${"app"}/${Bi}`,r=[xo("node"),xo(t),"report","write","--key",xo(e.reportKey.trim()),"--agent-run-id",xo(e.agentRunId.trim()),"--status",xo(e.status),"--summary",xo(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",xo(e.details.trim())),r.join(" ")}});var jt,YW,tK,gy,Wu=l(()=>{"use strict";my();JW();jt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},YW=e=>e===jt.COMPLETED||e===jt.FAILED,tK=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),gy=(e,t)=>{let r=Lu(t.reportsDir,t.reportKey),o=KW({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:jt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${tK({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Re=l(()=>{"use strict";Be();J()});var qi,ZW,XW,QW,rK,Jn,oK,eT,Vi,Ki,fy,tT,rT,Ji=l(()=>{"use strict";qi=g(require("node:fs")),ZW=g(require("node:path"));Wu();my();Re();XW=50,QW=e=>{let t=N(),r=Lu(t.reportsDir,e);return qi.default.mkdirSync(ZW.default.dirname(r),{recursive:!0}),r},rK=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Jn=e=>{let t=QW(e);if(!qi.default.existsSync(t))return null;try{let r=JSON.parse(qi.default.readFileSync(t,"utf8"));return rK(r)?r:null}catch{return null}},oK=(e,t)=>{let r=[...e,t];return r.length>XW?r.slice(r.length-XW):r},eT=e=>{let t=QW(e.reportKey);qi.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Vi=e=>{let t=Jn(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:oK(t?.history??[],o)};return eT(n),n},Ki=e=>{let t=Jn(e.reportKey);return t!==null?t:Vi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:jt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},fy=(e,t)=>{let r=t.trim();if(r.length===0)return Jn(e);let o=Jn(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return eT(s),s},tT=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},rT=e=>{if(e===null||!YW(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===jt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var nK,sK,Yi,oT,Tu,hy=l(()=>{"use strict";Wu();Ji();nK=new Set(Object.values(jt)),sK=e=>nK.has(e),Yi=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},oT=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Tu=e=>{if(e[0]!=="write")return oT(),1;let r=Yi(e,"--key"),o=Yi(e,"--agent-run-id"),n=Yi(e,"--status"),s=Yi(e,"--summary"),i=Yi(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!sK(n)?(oT(),1):(Vi({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var Ze,Ro=l(()=>{"use strict";Ze=()=>!0});var yy,nT,Io,Eu=l(()=>{"use strict";yy=g(require("node:path")),nT=require("node:url");Ro();Io=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=yy.default.resolve(t);return Ze()?r===yy.default.resolve(__filename):e===void 0?!1:r===(0,nT.fileURLToPath)(e)}});var xu,Yn,lK,cre,Xn=l(()=>{"use strict";xu="agent-witch.js",Yn="deps.tar.gz",lK="install.sh",cre={mainScript:`app/${xu}`,depsArchive:`app/${Yn}`,installShell:lK}});var lT=l(()=>{"use strict";Xn()});var cT=l(()=>{"use strict";Xn();lT()});var Xi,Ay,Ru,cK,Zi,Ie,Qn,Qi,ea,Oo,by=l(()=>{"use strict";Xi=g(require("node:fs")),Ay=g(require("node:path"));cT();J();Ru="install-version.json",cK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Zi=(e=W())=>Ay.default.join(e,Ru),Ie=(e=W())=>{let t=Zi(e);if(!Xi.default.existsSync(t))return null;try{let r=JSON.parse(Xi.default.readFileSync(t,"utf8"));return!cK(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Qn=(e,t=W())=>{let r=Zi(t);Xi.default.mkdirSync(Ay.default.dirname(r),{recursive:!0}),Xi.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Qi=(e=W())=>Ie(e)?.bundleVersion??"202",ea=(e,t)=>{let r=Ie(e);if(r!==null)return r;let o={bundleVersion:"202",appOrigin:t,updatedAt:new Date().toISOString()};return Qn(o,e),o},Oo=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var dT,Mo,Py,wy,_y,Iu,$t,No,vy=l(()=>{"use strict";dT=require("node:crypto"),Mo=g(require("node:fs")),Py=g(require("node:path"));J();wy="self-update-log.ndjson",_y=100,Iu=(e=W())=>{let t=N(),r=t.installDir===e?t.logsDir:Vn({installDir:e,profileEmail:t.profileEmail});return Py.default.join(r,wy)},$t=(e,t=W())=>{let r={id:(0,dT.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Iu(t);Mo.default.mkdirSync(Py.default.dirname(o),{recursive:!0});let n=Mo.default.existsSync(o)?Mo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-_y+1)),JSON.stringify(r)];return Mo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},No=(e=20,t=W())=>{let r=Iu(t);if(!Mo.default.existsSync(r))return[];let o=Mo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var Cy,Lre,Ly=l(()=>{"use strict";Xn();Cy="deps",Lre=`${"app"}/${Yn}`});var uT=l(()=>{"use strict";Ly()});var pT,Gr,zo,mT,ky,Wy,gT=l(()=>{"use strict";pT=require("node:child_process"),Gr=g(require("node:fs")),zo=g(require("node:path"));Xn();Ly();mT=e=>zo.default.join(e,"app",Cy),ky=e=>{let t=zo.default.join(e,"app"),r=zo.default.join(t,Yn);Gr.default.existsSync(r)&&(Gr.default.rmSync(mT(e),{recursive:!0,force:!0}),Gr.default.mkdirSync(t,{recursive:!0}),(0,pT.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Gr.default.rmSync(r,{force:!0}))},Wy=e=>{Gr.default.rmSync(zo.default.join(e,"node_modules"),{recursive:!0,force:!0}),Gr.default.rmSync(zo.default.join(e,"package.json"),{force:!0}),Gr.default.rmSync(zo.default.join(e,"package-lock.json"),{force:!0})}});var fT=l(()=>{"use strict";uT();gT()});var At,Ou,hT=l(()=>{"use strict";At="https://www.agentwitch.com",Ou="wss://www.agentwitch.com/api/agent-witch/ws"});var ta,ur,yT=l(()=>{"use strict";ta="127.0.0.1",ur=`http://${ta}:43347`});var bt=l(()=>{"use strict";hT();yT()});var ra,Mu,ST,Ey,dK,AT,Iy,bT,Pt,oa,na,Oy,xy,Ry,sa,My,Ny,zy,es=l(()=>{"use strict";ra=g(require("node:fs")),Mu=g(require("node:path")),ST="active-writer-work.json",Ey=new Set,dK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),AT=e=>e.profileEmail===null?Mu.default.join(e.installDir,ST):Mu.default.join(e.installDir,"profiles",e.profileEmail,ST),Iy=e=>{let t=AT(e);if(!ra.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(ra.default.readFileSync(t,"utf8"));return!dK(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},bT=(e,t)=>{let r=AT(e);ra.default.mkdirSync(Mu.default.dirname(r),{recursive:!0}),ra.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Pt=e=>Iy(e).activeCount>0,oa=e=>{let t=Iy(e);bT(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},na=e=>{let t=Iy(e),r=Math.max(0,t.activeCount-1);if(bT(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of Ey)o()},Oy=e=>(Ey.add(e),()=>{Ey.delete(e)}),xy=null,Ry=null,sa=e=>{xy=e},My=e=>{Ry=e},Ny=()=>{let e=xy;return xy=null,e},zy=()=>{let e=Ry;return Ry=null,e}});var ve,Nu=l(()=>{"use strict";ve=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var ts,zu,ia,Dy=l(()=>{"use strict";ts="qwen2.5:7b",zu="nomic-embed-text",ia="Install Ollama from https://ollama.com/download"});var aa,jy,Du=l(()=>{"use strict";Dy();aa=()=>`
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
    echo "Ollama is missing. ${ia}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${ia}" >&2
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
  agent_witch_ensure_ollama_model "${ts}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${zu}" "\${pull_log}"
}
`,jy=()=>`
${aa()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var PT,uK,ju,$y=l(()=>{"use strict";PT=require("node:child_process");J();Du();uK=e=>new Promise(t=>{let r=(0,PT.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:W()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),ju=async(e=uK)=>{let t=`${aa()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var qr,$u,wT,pK,_T,os,mK,gK,fK,rs,Do,jo,vT=l(()=>{"use strict";qr=g(require("node:fs")),$u=g(require("node:path"));fT();re();J();Xn();bt();by();es();Nu();vy();$y();wT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pK=e=>{let t=yt(e),r=t===null?N():N(t);if(!qr.default.existsSync(r.configPath))return null;try{let o=JSON.parse(qr.default.readFileSync(r.configPath,"utf8"));return!wT(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},_T=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!wT(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},os=async e=>(await _T(e))?.bundleVersion??null,mK=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=$u.default.join(t,r);qr.default.mkdirSync($u.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());qr.default.writeFileSync(n,s),r.endsWith(".js")&&qr.default.chmodSync(n,493)},gK=async()=>{$i(),await To()},fK=(e,t)=>e!==null?ve(e):t??At,rs=(e,t)=>({localBundleVersion:t,...e}),Do=async e=>{let t=W(),r=Ie(t),o=r?.bundleVersion??null,n=await ju();$t({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=pK(t),i=fK(s,r?.appOrigin);if(i===null){let d=rs({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return $t({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await _T(i);if(a===null){let d=rs({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return $t({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||Oo(o,a.bundleVersion))){let d=rs({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return $t({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let S of a.scripts)await mK(i,t,S);let d=$u.default.join(t,xu);qr.default.existsSync(d)&&qr.default.rmSync(d,{force:!0}),ky(t),Wy(t),Qn({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let u=N(yt(t));if(Pt(u)){let S=rs({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return $t({event:"update_applied",ok:!0,message:S.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),S}await gK();let m=rs({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return $t({event:"update_applied",ok:!0,message:m.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}catch(d){let u=d instanceof Error?d.message:"Agent Witch self-update failed.",m=rs({ok:!1,updated:!1,message:u,remoteBundleVersion:a.bundleVersion},o);return $t({event:"update_failed",ok:!1,message:u,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},jo=()=>{let e=W();return{local:Ie(e),logs:No(20,e)}}});var CT={};Nt(CT,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>Ru,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>ia,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>zu,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>ts,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>wy,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>_y,appendAgentWitchSelfUpdateLog:()=>$t,buildAgentWitchEnsureOllamaShell:()=>aa,buildAgentWitchInstallScriptOllama:()=>jy,buildAgentWitchSelfUpdateStatus:()=>jo,ensureAgentWitchInstallVersionRecorded:()=>ea,ensureAgentWitchOllamaInstalled:()=>ju,fetchAgentWitchRemoteInstallBundleVersion:()=>os,isRemoteAgentWitchBundleVersionNewer:()=>Oo,readAgentWitchInstallVersion:()=>Ie,readAgentWitchSelfUpdateLogs:()=>No,resolveAgentWitchAppOriginFromWsUrl:()=>ve,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Qi,resolveAgentWitchInstallVersionPath:()=>Zi,resolveAgentWitchSelfUpdateLogPath:()=>Iu,runAgentWitchSelfUpdate:()=>Do,writeAgentWitchInstallVersion:()=>Qn});var Ht=l(()=>{"use strict";by();vy();vT();Nu();Dy();Du();$y()});var Hy={};Nt(Hy,{buildAgentWitchSelfUpdateStatus:()=>jo,fetchAgentWitchRemoteInstallBundleVersion:()=>os,runAgentWitchSelfUpdate:()=>Do});var Fy=l(()=>{"use strict";Ht()});function ns(e){return(0,LT.createHash)("sha256").update(e.trim()).digest("hex")}var LT,Uy=l(()=>{"use strict";LT=require("node:crypto")});var ss,la,hK,kT,By,WT=l(()=>{"use strict";ss=g(require("node:fs")),la=g(require("node:path"));Uy();Re();hK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kT=e=>{if(!ss.default.existsSync(e))return null;try{let t=JSON.parse(ss.default.readFileSync(e,"utf8"));return!hK(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:ns(t.pairingToken.trim())}catch{return null}},By=(e=W())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(kT(la.default.join(e,"config.json")));let n=la.default.join(e,ir);if(!ss.default.existsSync(n))return t;for(let s of ss.default.readdirSync(n)){let i=la.default.join(n,s);ss.default.statSync(i).isDirectory()&&o(kT(la.default.join(i,"config.json")))}return t}});var Gy,TT,Hu,ca,da,yK,SK,AK,ET,de,ue,Fu,Ft,wt=l(()=>{"use strict";Gy=g(require("node:fs")),TT=g(require("node:os")),Hu=g(require("node:path")),ca={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},da=e=>e.trim().length>0,yK=e=>{let t=Hu.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},SK=()=>{let e=TT.default.homedir(),t=Hu.default.join(e,".local","bin","agent");if(Gy.default.existsSync(t))return t;let r=Hu.default.join(e,".local","bin","cursor-agent");return Gy.default.existsSync(r)?r:ca.cursorCommand},AK=e=>{let t=e.trim();return!da(t)||t===ca.cursorCommand?SK():t},ET=(e,t)=>yK(e)?t:["agent",...t],de=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ue=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:da(t)?t.trim():ca.claudeCommand,codexCommand:da(r)?r.trim():ca.codexCommand,cursorCommand:AK(o),antigravityCommand:da(n)?n.trim():ca.antigravityCommand}},Fu=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:ET(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Ft=(e,t,r,o)=>{let n=t.trim();if(!da(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:ET(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",n]}}});var Vr,bK,$o,PK,is,ua=l(()=>{"use strict";Vr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,bK=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:Vr(s.inputTokens)+Vr(s.outputTokens)+Vr(s.cacheReadInputTokens)+Vr(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},$o=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=Vr(a.input_tokens)+Vr(a.cache_creation_input_tokens)+Vr(a.cache_read_input_tokens),d=Vr(a.output_tokens),u=c+d;return u<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:u,model:bK(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},PK=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),is=(e,t)=>{let r=$o(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??PK(r)}}});var qy,wK,_K,Vy,Ky=l(()=>{"use strict";qy=e=>e.toLocaleString("en-US"),wK=e=>e<.01?e.toFixed(4):e.toFixed(3),_K=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${wK(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${qy(e.inputTokens)} in / ${qy(e.outputTokens)} out (${qy(e.totalTokens)} total)`,t].join(`
`)},Vy=(e,t)=>{if(t===void 0)return e;let r=_K(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Uu,Jy=l(()=>{"use strict";Uu={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Ho,Yy,Bu,Xy=l(()=>{"use strict";Jy();Ho="auto",Yy=e=>({value:Ho,label:`Auto (${Uu[e]})`}),Bu={anthropic:[Yy("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[Yy("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[Yy("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var as,pa,Gu,ls=l(()=>{"use strict";Jy();Xy();as=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Ho))return t},pa=(e,t)=>{let r=as(t);return r===void 0?Uu[e]:r},Gu=e=>{let t=as(e);return t===void 0?Ho:t}});var qu,vK,CK,Vu,xT=l(()=>{"use strict";qu={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},vK=e=>{let t=qu[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?qu["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?qu["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?qu["gemini-2.0-flash"]:null},CK=(e,t,r)=>{let o=vK(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},Vu=e=>{let t=CK(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var cs,LK,kK,WK,Ku,RT=l(()=>{"use strict";xT();cs=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),LK=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=cs(r.input_tokens),n=cs(r.output_tokens);return o===0&&n===0?null:Vu({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},kK=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=cs(r.prompt_tokens),n=cs(r.completion_tokens);return o===0&&n===0?null:Vu({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},WK=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=cs(r.promptTokenCount),n=cs(r.candidatesTokenCount);return o===0&&n===0?null:Vu({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Ku=(e,t,r)=>e==="anthropic"?LK(t,r):e==="openai"?kK(t,r):WK(t,r)});var TK,Zy,EK,xK,RK,IK,OK,Qy,eS=l(()=>{"use strict";ls();RT();TK=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},Zy=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:pa(e,t.model)},EK=async e=>{let t=Zy("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=TK(o);n.length>0&&e.onChunk?.(n);let s=Ku("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},xK=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},RK=async e=>{let t=Zy("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=xK(o);n.length>0&&e.onChunk?.(n);let s=Ku("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},IK=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},OK=async e=>{let t=Zy("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=IK(n);s.length>0&&e.onChunk?.(s);let i=Ku("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},Qy=async e=>{try{return e.provider==="anthropic"?await EK(e):e.provider==="openai"?await RK(e):await OK(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Qe,ma=l(()=>{"use strict";Qe=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var IT,MK,Ju,tS=l(()=>{"use strict";IT=g(require("node:path")),MK="writer-api-secrets.json",Ju=e=>IT.default.join(e,MK)});var rS,OT,NK,Kr,Ge,Jr=l(()=>{"use strict";rS=g(require("node:fs"));ls();tS();OT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),NK=e=>{if(!OT(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=as(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},Kr=e=>{let t=Ju(e);if(!rS.default.existsSync(t))return{};try{let r=JSON.parse(rS.default.readFileSync(t,"utf8"));if(!OT(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=NK(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Ge=(e,t)=>Kr(e)[t]??null});var Oe,ga=l(()=>{"use strict";Oe=e=>e==="api"?"api":"cli"});var MT,Ce,Fo,pr=l(()=>{"use strict";MT=g(require("node:path"));ma();Jr();ga();Ce=e=>MT.default.dirname(e),Fo=(e,t)=>{if(Oe(e.writerExecutionBackend)!=="api")return!1;let r=Qe(t);if(r===null)return!1;let o=Ce(e.layout.configPath),n=Ge(o,r);return n!==null&&n.apiKey.length>0}});var fa,oS=l(()=>{"use strict";Ky();eS();ma();Jr();pr();fa=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Qe(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Ce(e.layout.configPath),a=Ge(i,s);if(a===null){let d=Object.keys(Kr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await Qy({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:Vy(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var NT,ds,nS=l(()=>{"use strict";NT=require("node:child_process");wt();ua();oS();pr();ds=(e,t,r)=>new Promise(o=>{if(!de(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(Fo(e,t)){fa(e,t,r).then(o);return}let n=Ft(t,r,ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,NT.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=is(i.join("")),u=a.join("").trim(),m=[d.output.trim(),u].filter(S=>S.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var zT=l(()=>{"use strict"});var DT=l(()=>{"use strict";Ky();nS();eS();zT();Jr();pr()});var jT,$T,HT,FT=l(()=>{"use strict";jT="claude",$T="codex",HT="cursor"});var UT,zK,sS,ha,Yu=l(()=>{"use strict";UT=g(require("node:path"));bt();Be();zK="ws://localhost:3000/api/agent-witch/ws",sS=e=>e.replace(/\/$/,""),ha=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return sS(t);let r=UT.default.basename(e.installDir);if(r===Li.production)return Ou;let o=e.configWsUrl?.trim()??"";return r===Li.localhost?o.length>0?sS(o):zK:o.length>0?sS(o):Ou}});var jK,iS,aS=l(()=>{"use strict";FT();Yu();ga();jK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),iS=e=>{if(!jK(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=ha({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??jT,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??$T,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??HT,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",u=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:u,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Oe(t.writerExecutionBackend),layout:e.layout}}}});var lS,cS,dS=l(()=>{"use strict";lS=g(require("node:fs"));J();aS();cS=e=>{let t=N(e);if(!lS.default.existsSync(t.configPath))return null;try{let r=JSON.parse(lS.default.readFileSync(t.configPath,"utf8")),o=iS({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var ya,BT=l(()=>{"use strict";ya=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var uS,$K,pS,GT=l(()=>{"use strict";uS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$K=e=>{if(!uS(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!uS(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let u=s.items.flatMap(m=>{if(!uS(m))return[];let S=typeof m.itemKey=="string"?m.itemKey.trim():"",f=typeof m.relativePath=="string"?m.relativePath:"",y=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return S.length===0||y.length===0?[]:[{itemKey:S,relativePath:f,contentSha256:y}]});return u.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:u}]});return{id:t,projectId:r,digest:o,entries:n}},pS=$K});var qT,HK,Xu,mS=l(()=>{"use strict";qT=g(require("node:path")),HK=(e,t)=>{let r=t.trim();return qT.default.join(e,"components","store",r.slice(0,2),r)},Xu=HK});var VT,FK,gS,KT=l(()=>{"use strict";VT=g(require("node:fs"));mS();FK=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Xu(e.installDir,n.contentSha256);VT.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},gS=FK});var Sa,us,UK,fS,BK,hS,yS=l(()=>{"use strict";Sa=g(require("node:fs")),us=g(require("node:path"));mS();UK=(e,t)=>us.default.join(e.installDir,"runs",t,"overlay"),fS=(e,t)=>us.default.join(UK(e,t),".cursor"),BK=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=fS(e,t);Sa.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Xu(e.installDir,i.contentSha256);if(!Sa.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?us.default.join(n,c):us.default.join(n,i.itemKey);Sa.default.mkdirSync(us.default.dirname(d),{recursive:!0}),Sa.default.copyFileSync(a,d)}return{ok:!0}},hS=BK});var SS,JT,GK,Aa,YT=l(()=>{"use strict";SS=g(require("node:fs")),JT=g(require("node:path")),GK=(e,t)=>{let r=JT.default.join(e.installDir,"runs",t);SS.default.existsSync(r)&&SS.default.rmSync(r,{recursive:!0,force:!0})},Aa=GK});var qK,AS,XT=l(()=>{"use strict";yS();qK=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=fS(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},AS=qK});var bS,VK,KK,JK,YK,XK,H,ZT=l(()=>{"use strict";bS=g(require("node:fs"));Yu();J();ga();VK="claude",KK="codex",JK="cursor",YK="agy",XK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H=()=>{let e=N();if(!bS.default.existsSync(e.configPath))return null;try{let t=JSON.parse(bS.default.readFileSync(e.configPath,"utf8"));if(!XK(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=ha({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Oe(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:VK,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:KK,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:JK,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:YK,pairingToken:s,layout:e}}catch{return null}}});var Zu,QT,eE=l(()=>{"use strict";Zu=g(require("node:fs"));tS();QT=(e,t)=>{let r=Ju(e);Zu.default.mkdirSync(e,{recursive:!0}),Zu.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Zu.default.chmodSync(r,384)}catch{}}});var ba,tE,Qu=l(()=>{"use strict";ba=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},tE=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===ba(t)}});var Pa,ZK,PS,wS,rE=l(()=>{"use strict";Pa=g(require("node:fs"));Jr();eE();Qu();ls();pr();ZK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),PS=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=tE(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?as(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},wS=e=>{let t=Ce(e.configPath),r={};if(Pa.default.existsSync(e.configPath))try{let n=JSON.parse(Pa.default.readFileSync(e.configPath,"utf8"));ZK(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,Pa.default.mkdirSync(t,{recursive:!0}),Pa.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=PS(PS(PS(Kr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);QT(t,o)}});var ep,_S=l(()=>{"use strict";ep={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var vS,oE=l(()=>{"use strict";ma();Jr();pr();pr();vS=(e,t)=>{if(Fo(e,t))return!1;let r=Qe(t);if(r===null)return!1;let o=Ce(e.layout.configPath),n=Ge(o,r);return n===null||n.apiKey.trim().length===0}});var nE,CS,LS=l(()=>{"use strict";nE=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},CS=async e=>{let t=nE(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=nE(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var QK,kS,sE=l(()=>{"use strict";re();dS();LS();QK=1e4,kS=()=>CS({listProfileEmails:wu,readConfig:cS,pollIntervalMs:QK,logWaiting:e=>{console.error(e)}})});var me=l(()=>{"use strict";nS();DT();dS();Yu();BT();GT();KT();yS();YT();XT();ga();ZT();rE();Jr();pr();Qu();ls();_S();oS();pr();oE();ma();Jr();sE();aS();LS()});var tp,iE,e4,t4,aE,rp,wa,op,_a=l(()=>{"use strict";tp=g(require("node:fs")),iE=g(require("node:path")),e4="wake-port.json",t4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),aE=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,rp=e=>iE.default.join(e,e4),wa=e=>{let t=rp(e);if(!tp.default.existsSync(t))return null;try{let r=JSON.parse(tp.default.readFileSync(t,"utf8"));if(t4(r)&&aE(r.wakePort))return r.wakePort}catch{return null}return null},op=(e,t)=>{if(!aE(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=rp(e);tp.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var $se,Hse,Fse,_t,lE,va=l(()=>{"use strict";_a();Re();_a();$se=ht(),Hse=`${_e()}-wake`,Fse=_e(),_t=()=>{let e=W(),t=wa(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return ht()},lE=e=>{let t=W();wa(t)===null&&op(t,e)}});var cE=l(()=>{"use strict";Uy();re();WT();me();va()});var WS,Ca,La,dE=l(()=>{"use strict";WS=g(require("node:os"));cE();Ca=()=>{let e=te();return{ok:!0,port:_t(),hostname:WS.default.hostname(),profileCount:e.length}},La=()=>{let e=te(),t=H()?.pairingToken.trim()??"",r=t.length>0?ns(t):null,o=By();return{hostname:WS.default.hostname(),port:_t(),tokenHash:r,tokenHashes:o.length>0?o:r!==null?[r]:[],profiles:e.map(n=>({email:n.profileEmail,launchAgentLabel:n.launchAgentLabel}))}}});var TS=l(()=>{"use strict";dE()});var uE,pE,mE,np,ps=l(()=>{"use strict";uE="materialization.json",pE="backups",mE=".gitignore",np=e=>`harness-set:${e.trim()}`});var gE,fE,sp,hE=l(()=>{"use strict";gE=g(require("node:crypto")),fE=g(require("node:fs")),sp=e=>{try{let t=fE.default.readFileSync(e);return gE.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Yr,Uo,r4,yE,ES,SE=l(()=>{"use strict";Yr=g(require("node:fs")),Uo=g(require("node:path"));hE();r4=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=Uo.default.join(t,n,o);return Yr.default.mkdirSync(Uo.default.dirname(s),{recursive:!0}),Yr.default.copyFileSync(r,s),Uo.default.relative(e,s).replaceAll("\\","/")},yE=e=>{let t=Uo.default.join(e.repoRoot,e.repoRelativeDestination),r=sp(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(Yr.default.existsSync(t)){let n=sp(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=r4(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Yr.default.mkdirSync(Uo.default.dirname(t),{recursive:!0}),Yr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Yr.default.mkdirSync(Uo.default.dirname(t),{recursive:!0}),Yr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},ES=e=>{let t=sp(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var xS,AE,ip,RS=l(()=>{"use strict";xS=g(require("node:fs"));ps();AE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ip=e=>{if(!xS.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(xS.default.readFileSync(e,"utf8"));if(AE(t)&&t.version===1&&AE(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var Xr,ap,bE,PE=l(()=>{"use strict";Xr=g(require("node:fs")),ap=g(require("node:path"));ps();bE=e=>{let t=new Set(e.setSlugs.map(s=>np(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=ap.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=ap.default.join(e.repoRoot,i.backupPath);Xr.default.existsSync(c)?(Xr.default.mkdirSync(ap.default.dirname(a),{recursive:!0}),Xr.default.copyFileSync(c,a),o.push(s)):Xr.default.existsSync(a)&&Xr.default.rmSync(a,{force:!0})}else Xr.default.existsSync(a)&&Xr.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var IS,lp,OS=l(()=>{"use strict";IS=g(require("node:path"));ps();lp=e=>({ledgerFilePath:IS.default.join(e.metaDirPath,uE),backupsDirPath:IS.default.join(e.metaDirPath,pE)})});var MS,wE,_E=l(()=>{"use strict";MS=g(require("node:path")),wE=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return MS.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return MS.default.posix.join(s,e,n)}});var NS,vE,zS,CE=l(()=>{"use strict";NS=g(require("node:fs")),vE=g(require("node:path")),zS=(e,t)=>{NS.default.mkdirSync(vE.default.dirname(e),{recursive:!0}),NS.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var DS,o4,it,ms=l(()=>{"use strict";DS=g(require("node:os")),o4=e=>{let t=e.trim();return t.startsWith("~/")?`${DS.default.homedir()}${t.slice(1)}`:t==="~"?DS.default.homedir():t},it=o4});var cp,LE,n4,kE,WE=l(()=>{"use strict";cp=g(require("node:fs")),LE=g(require("node:path"));ps();Eo();n4=`*
!${Cu}
`,kE=e=>{let t=LE.default.join(e,mE);cp.default.existsSync(t)||(cp.default.mkdirSync(e,{recursive:!0}),cp.default.writeFileSync(t,n4))}});var Bo,at,Go=l(()=>{"use strict";Bo=g(require("node:path"));Eo();ms();at=e=>{let t=it(e),r=Bo.default.join(t,jW);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Bo.default.join(r,"rag"),memoryDirPath:Bo.default.join(r,$W),reportsDirPath:Bo.default.join(r,FW),metaFilePath:Bo.default.join(r,Cu),ragChunksFilePath:Bo.default.join(r,"rag",HW)}}});var Ut,EE,s4,i4,et,jS=l(()=>{"use strict";Ut=g(require("node:fs")),EE=g(require("node:path"));Eo();WE();Go();s4=(e,t)=>{if(Ut.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Ut.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},i4=e=>{Ut.default.existsSync(e.ragChunksFilePath)||Ut.default.writeFileSync(e.ragChunksFilePath,"");let t=EE.default.join(e.memoryDirPath,Kn);Ut.default.existsSync(t)||Ut.default.writeFileSync(t,"")},et=e=>{let t=at(e.projectFolderPath);return Ut.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Ut.default.mkdirSync(t.ragDirPath,{recursive:!0}),Ut.default.mkdirSync(t.memoryDirPath,{recursive:!0}),kE(t.metaDirPath),s4(t,e),i4(t),{ok:!0,layout:t}}});var xE,RE,IE,OE,dp,up=l(()=>{"use strict";xE="components",RE="store",IE="versions",OE="installed.json",dp=e=>`harness-set:${e.trim()}`});var $S,ME,pp,HS=l(()=>{"use strict";$S=g(require("node:fs")),ME=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pp=e=>{if(!$S.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse($S.default.readFileSync(e,"utf8"));if(ME(t)&&t.version===1&&ME(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var Wa,gs,mp=l(()=>{"use strict";Wa=g(require("node:path"));up();gs=e=>{let t=Wa.default.join(e,xE);return{componentsRootDir:t,storeDir:Wa.default.join(t,RE),versionsDir:Wa.default.join(t,IE),installedFilePath:Wa.default.join(t,OE)}}});var FS,NE,gp,fp,hp=l(()=>{"use strict";FS=g(require("node:crypto")),NE=g(require("node:fs")),gp=e=>FS.default.createHash("sha256").update(e,"utf8").digest("hex"),fp=e=>{try{let t=NE.default.readFileSync(e);return FS.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var US,zE,DE,jE=l(()=>{"use strict";US=g(require("node:fs")),zE=g(require("node:path")),DE=(e,t)=>{US.default.mkdirSync(zE.default.dirname(e),{recursive:!0}),US.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var BS,GS,$E,HE=l(()=>{"use strict";BS=g(require("node:fs")),GS=g(require("node:path")),$E=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=GS.default.join(e,r),n=GS.default.join(o,`${t.versionId}.json`);BS.default.mkdirSync(o,{recursive:!0}),BS.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var yp,FE,UE,BE=l(()=>{"use strict";yp=g(require("node:fs")),FE=g(require("node:path"));hp();UE=e=>{let t=gp(e.content),r=FE.default.join(e.storeDir,t);return yp.default.existsSync(r)||(yp.default.mkdirSync(e.storeDir,{recursive:!0}),yp.default.writeFileSync(r,e.content)),t}});var qS,GE,a4,Sp,VS=l(()=>{"use strict";qS=g(require("node:fs")),GE=g(require("node:path"));up();HS();mp();hp();jE();HE();BE();a4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Sp=e=>{let t=gs(e.installDir),r=dp(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!a4(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=GE.default.join(e.harnessRootDir,a);if(!qS.default.existsSync(c))continue;let d=qS.default.readFileSync(c,"utf8"),u=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:fp(c);if(u!==null){if(gp(d)!==u)throw new Error(`Harness item "${i.id}" failed content hash verification.`);UE({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:u})}}if(n.length===0)return;$E(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=pp(t.installedFilePath);DE(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var JS,KS,qE,VE=l(()=>{"use strict";JS=g(require("node:fs"));VS();HS();mp();KS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qE=e=>{if(!JS.default.existsSync(e.harnessManifestPath))return;let t=gs(e.installDir),r=pp(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(JS.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!KS(o)||o.version!==1||!KS(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!KS(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Sp({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var YS,KE,JE,YE=l(()=>{"use strict";YS=g(require("node:fs")),KE=g(require("node:path")),JE=e=>{let t=e.componentId.replaceAll("/","_"),r=KE.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!YS.default.existsSync(r))return null;try{let o=JSON.parse(YS.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Ap,bp,XE,ZE=l(()=>{"use strict";Ap=g(require("node:fs")),bp=g(require("node:path"));up();VE();YE();mp();hp();XE=e=>{qE({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=gs(e.layout.installDir),r=dp(e.setSlug),o=JE({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=bp.default.join(t.storeDir,i.contentSha256);if(Ap.default.existsSync(a)&&fp(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?bp.default.join(e.layout.harnessRootDir,n):bp.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Ap.default.existsSync(s))return null;try{if(!Ap.default.statSync(s).isFile())return null}catch{return null}return s}});var QE,l4,c4,Zr,Pp=l(()=>{"use strict";RS();OS();Go();QE="harness-set:",l4=e=>{let t=e.trim();if(!t.startsWith(QE))return null;let r=t.slice(QE.length).trim();return r.length>0?r:null},c4=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=l4(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Zr=e=>{let t=at(e),{ledgerFilePath:r}=lp(t),o=ip(r);return c4(o)}});var wp,XS,Ta,d4,mr,Ea,fs=l(()=>{"use strict";wp=g(require("node:fs")),XS=g(require("node:os")),Ta=g(require("node:path")),d4=()=>wp.default.realpathSync(Ta.default.resolve(XS.default.homedir())),mr=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Ta.default.join(XS.default.homedir(),t.slice(1)):t,o;try{o=wp.default.realpathSync(Ta.default.resolve(r))}catch{return null}let n=d4();return o===n||o.startsWith(`${n}${Ta.default.sep}`)?o:null},Ea=e=>{let t=mr(e);if(t===null)return null;try{if(!wp.default.statSync(t).isFile())return null}catch{return null}return t}});var ZS,QS=l(()=>{"use strict";ZS=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var vp,ex,_p,u4,xa,eA=l(()=>{"use strict";vp=g(require("node:fs")),ex=g(require("node:path"));ps();SE();RS();PE();OS();_E();CE();ms();jS();ZE();Pp();fs();QS();_p=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),u4=e=>{if(!vp.default.existsSync(e))return null;try{let t=JSON.parse(vp.default.readFileSync(e,"utf8"));if(_p(t)&&t.version===1)return t}catch{return null}return null},xa=e=>{let t=[...new Set(e.setSlugs.map(b=>b.trim()).filter(b=>b.length>0))],r=it(e.projectFolderPath),o=mr(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=vp.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=et({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=lp(s.layout),d=Zr(o).filter(b=>!t.includes(b)),u=ip(i),m=0;if(d.length>0){let b=bE({repoRoot:o,setSlugs:d,ledger:u});u=b.ledger,m=b.summary.removedPaths.length}if(t.length===0)return zS(i,u),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let S=u4(e.layout.harnessManifestPath);if(S===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let f=_p(S.sets)?S.sets:{},y=0,p=0,A=0;for(let b of t){let h=f[b];if(!_p(h))return{ok:!1,errorMessage:`Harness set "${b}" is not installed locally.`};let w=typeof h.version=="number"?String(h.version):"1",_=np(b),C=Array.isArray(h.items)?h.items:[];for(let L of C){if(!_p(L))continue;let k=typeof L.path=="string"?L.path.trim():"";if(k.length===0)continue;let x=ZS(k);if(x===null)continue;let I=wE(b,x),M=ex.default.posix.join(".cursor",I).replaceAll("\\","/"),F=typeof L.id=="string"?L.id.trim():"",q=XE({layout:e.layout,setSlug:b,setVersion:typeof h.version=="number"?h.version:1,manifestItemPath:k,manifestItemId:F});if(q===null)continue;let B=yE({repoRoot:o,backupsDir:a,repoRelativeDestination:M,sourceAbsolutePath:q,componentId:_,versionId:w,ledger:u});if(B.kind==="skipped_unchanged"){p+=1;continue}if(B.kind==="backed_up_user_file"){A+=1,y+=1,u={version:1,entries:{...u.entries,[M]:ES({componentId:_,versionId:w,sourceAbsolutePath:q,backupPath:B.backupPath})}};continue}y+=1,u={version:1,entries:{...u.entries,[M]:ES({componentId:_,versionId:w,sourceAbsolutePath:q})}}}}return y===0&&p===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(zS(i,u),{ok:!0,writtenFileCount:y,skippedFileCount:p,backedUpFileCount:A,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var tx,Cp,p4,m4,g4,f4,h4,y4,S4,A4,b4,Ra,Lp=l(()=>{"use strict";tx=g(require("node:crypto")),Cp=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},p4=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},m4=(e,t)=>{let r=p4(t),o=Cp(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},g4=(e,t,r)=>{let o=m4(t,r);return`shared/items/${e}/${o}`},f4=["rules","skills","commands","instructions","agents"],h4=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),y4=(e,t)=>[...e.filter(o=>o.id!==t.id),t],S4=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},A4=e=>tx.default.createHash("sha256").update(e,"utf8").digest("hex"),b4=e=>({id:e.id,kind:e.kind,title:e.title,path:g4(e.id,e.kind,e.title),contentSha256:A4(e.content)}),Ra=e=>{let t=new Date().toISOString(),r=e.existingManifest??h4(e.hostname,t),o=Cp(e.bundle.slug),n=S4(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...f4.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,u)=>{let m=b4(u);return{files:[...d.files,{relativePath:m.path,content:u.content}],nextItems:y4(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var Qr,rx,kp,P4,qo,tA=l(()=>{"use strict";Qr=g(require("node:fs")),rx=g(require("node:os")),kp=g(require("node:path"));Lp();P4=e=>{if(!Qr.default.existsSync(e))return null;try{let t=JSON.parse(Qr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},qo=e=>{try{let t=P4(e.layout.harnessManifestPath),r=Ra({bundle:e.bundle,hostname:rx.default.hostname(),existingManifest:t});Qr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)Qr.default.mkdirSync(kp.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=kp.default.join(e.layout.harnessRootDir,o.relativePath);Qr.default.mkdirSync(kp.default.dirname(n),{recursive:!0}),Qr.default.writeFileSync(n,o.content)}return Qr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var rA,ox=l(()=>{"use strict";tA();eA();rA=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=qo({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return xa({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var nx,sx=l(()=>{"use strict";nx=["rule","skill","command","instruction","agent"]});var ix,w4,_4,Bt,oA=l(()=>{"use strict";sx();ix=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),w4=e=>typeof e=="string"&&nx.includes(e),_4=e=>{if(!ix(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!w4(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Bt=e=>{if(!ix(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=_4(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var ax,v4,nA,lx=l(()=>{"use strict";ax=require("node:zlib");oA();v4="x-agent-witch-token",nA=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[v4]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,ax.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=Bt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var iA,sA,eo,cx=l(()=>{"use strict";iA=g(require("node:fs")),sA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eo=e=>{if(!iA.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(iA.default.readFileSync(e.harnessManifestPath,"utf8"));if(!sA(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=sA(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!sA(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",u=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:u.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Wp,dx=l(()=>{"use strict";Wp=()=>"~"});var ux,px,mx=l(()=>{"use strict";ux=require("node:crypto"),px=e=>`local-${(0,ux.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var aA,gx=l(()=>{"use strict";aA=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Ia,Tp,lA=l(()=>{"use strict";Ia=g(require("node:path")),Tp=e=>{let t=Ia.default.dirname(e),r=Ia.default.basename(t);return r==="agents"?Ia.default.basename(Ia.default.dirname(t)):r}});var Oa,gr,fx,C4,L4,k4,Ep,hx,cA=l(()=>{"use strict";Oa=g(require("node:fs")),gr=g(require("node:path"));mx();gx();lA();fx=new Set(["node_modules",".git","dist","build",".next","coverage"]),C4=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},L4=(e,t)=>{let r=gr.default.basename(t);if(e==="skill"){let o=t.split(gr.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},k4=e=>{let t=[],r=(n,s)=>{let i;try{i=Oa.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&fx.has(a.name))continue;let c=gr.default.join(n,a.name),d=s?gr.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;aA(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=gr.default.join(e,n);Oa.default.existsSync(s)&&r(s,n)}let o=gr.default.join(e,"skills");return Oa.default.existsSync(o)&&r(o,"skills"),t},Ep=e=>{let t=k4(e);if(t.length===0)return null;let r=gr.default.dirname(e),o=Tp(e),n=C4(o),s=t.map(i=>{let a=aA(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:px(i.absolutePath),kind:a,title:L4(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},hx=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Oa.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||fx.has(a.name))continue;let c=gr.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var yx,dA,W4,uA,Sx=l(()=>{"use strict";yx=g(require("node:fs")),dA=g(require("node:path"));cA();fs();W4=e=>{let t=mr(e.trim());if(t===null)return null;if(dA.default.basename(t)===".cursor")return t;let r=dA.default.join(t,".cursor");try{if(yx.default.statSync(r).isDirectory())return mr(r)}catch{return null}return null},uA=e=>{let t=W4(e.projectPath);if(t===null)return null;let r=Ep(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var Ax,T4,xp,pA,bx=l(()=>{"use strict";Ax=g(require("node:path"));cA();fs();lA();T4=5,xp=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},pA=e=>{let t=mr(e.scanRoot.trim());if(t===null)return xp(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of hx(t,T4,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=mr(s);if(i===null)continue;let a=Tp(i);xp(e.response,"folder",{cursorDir:i,groupName:a,repoPath:Ax.default.dirname(i)});let c=Ep(i);c!==null&&(r.push(c),xp(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return xp(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var Px,wx,_x=l(()=>{"use strict";Px=g(require("node:path")),wx=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:Px.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var $e,vx,mA,E4,gA,fA,Rp,hA,Ma,Cx=l(()=>{"use strict";$e=g(require("node:fs")),vx=g(require("node:os")),mA=g(require("node:path"));Lp();VS();fs();_x();E4=e=>{if(!$e.default.existsSync(e))return null;try{let t=JSON.parse($e.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},gA=e=>{let t=e.hostname??vx.default.hostname(),r=E4(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(u=>u.include);if(a.length===0)continue;let c=[];for(let u of a){let m=Ea(u.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let S=$e.default.readFileSync(m,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:S,setSlugs:[i.slug]})}let d=Ra({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)n.add(u);for(let u of d.files)s.push(u),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{$e.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)$e.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=mA.default.join(e.layout.harnessRootDir,i.relativePath);$e.default.mkdirSync(mA.default.dirname(a),{recursive:!0}),$e.default.writeFileSync(a,i.content)}$e.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(u=>u.include))continue;let c=Cp(i.slug),d=r.sets[c];d!==void 0&&Sp({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},fA="reveal-cache.json",Rp=(e,t)=>{$e.default.mkdirSync(e.harnessRootDir,{recursive:!0}),$e.default.writeFileSync(`${e.harnessRootDir}/${fA}`,`${JSON.stringify(t,null,2)}
`)},hA=e=>{let t=`${e.harnessRootDir}/${fA}`;$e.default.existsSync(t)&&$e.default.unlinkSync(t)},Ma=e=>{let t=`${e.harnessRootDir}/${fA}`;if(!$e.default.existsSync(t))return null;try{let r=JSON.parse($e.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return wx(r)}catch{return null}return null}});var Vo=l(()=>{"use strict";eA();ox();QS();tA();lx();oA();Lp();cx();dx();Sx();fs();bx();Cx()});var yA,Lx=l(()=>{"use strict";Vo();Re();yA=e=>{let t=N(e.profileEmail);return qo({bundle:e.bundle,layout:t})}});var kx=l(()=>{"use strict";Lx();Vo()});var x4,Wx,R4,Tx,Ko,Ip,Ex=l(()=>{"use strict";x4=["agentwitch.com","www.agentwitch.com"],Wx=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,R4=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},Tx=e=>{let t=R4(e);return!!(x4.includes(t)||Wx.test(e.trim().toLowerCase()))},Ko=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return Tx(r)?Wx.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Ip=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Ko(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Na=l(()=>{"use strict";Ex()});var fr,za=l(()=>{"use strict";fr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Da,xx=l(()=>{"use strict";kx();Na();za();Da=e=>{if(!fr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Bt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Ko(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=yA({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var SA=l(()=>{"use strict";xx()});var I4,hs,AA=l(()=>{"use strict";I4=e=>e==="hourly"||e==="daily"||e==="weekdays",hs=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!I4(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var ja,Op,Rx,Ix,bA,vt,Mp,Np,zp,Dp,jp=l(()=>{"use strict";ja=g(require("node:fs")),Op=g(require("node:path"));AA();Rx="automations.json",Ix=e=>e.profileEmail!==null?Op.default.join(e.installDir,"profiles",e.profileEmail,Rx):Op.default.join(e.installDir,Rx),bA=()=>({version:1,automations:[]}),vt=e=>{let t=Ix(e);if(!ja.default.existsSync(t))return bA();try{let r=JSON.parse(ja.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?bA():{version:1,automations:r.automations.flatMap(n=>{let s=hs(n);return s!==null?[s]:[]})}}catch{return bA()}},Mp=(e,t)=>{let r=Ix(e);ja.default.mkdirSync(Op.default.dirname(r),{recursive:!0}),ja.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Np=(e,t)=>{Mp(e,{version:1,automations:t})},zp=(e,t)=>{let o=vt(e).automations.filter(n=>n.id!==t.id);Mp(e,{version:1,automations:[...o,t]})},Dp=(e,t)=>vt(e).automations.find(r=>r.id===t)??null});var Me,hr=l(()=>{"use strict";Me="x-agent-witch-token"});var PA=l(()=>{"use strict";Nu();Du()});var Y,Jo,wA,$a,_A,O4,vA,Ha,Fa,CA,Ua=l(()=>{"use strict";hr();PA();Y=e=>{let t=ve(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Jo=e=>({[Me]:e,"Content-Type":"application/json"}),wA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Jo(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},$a=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Jo(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},_A=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Jo(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},O4=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},vA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:Jo(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Ha=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:Jo(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return O4(r)}catch{return null}},Fa=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:Jo(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},CA=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Jo(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var Yo,Ox,Mx,M4,LA,Nx,kA=l(()=>{"use strict";Yo=g(require("node:fs")),Ox=g(require("node:path")),Mx=e=>Ox.default.join(e.harnessRootDir,"projects-registry.json"),M4=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),LA=e=>{let t=Mx(e);if(!Yo.default.existsSync(t))return[];try{let r=JSON.parse(Yo.default.readFileSync(t,"utf8"));return M4(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},Nx=e=>{let t=Mx(e);if(!Yo.default.existsSync(t))return;let r=`${t}.migrated`;if(Yo.default.existsSync(r)){Yo.default.unlinkSync(t);return}Yo.default.renameSync(t,r)}});var zx,N4,z4,Dx,jx=l(()=>{"use strict";ms();zx=e=>it(e),N4=e=>new Set(e.map(t=>zx(t.folderPath))),z4=e=>new Set(e.map(t=>t.id)),Dx=(e,t)=>{let r=N4(t),o=z4(t),n=[],s=new Set;for(let i of e){let a=zx(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var WA,TA=l(()=>{"use strict";Ua();kA();jx();WA=async(e,t)=>{let r=LA(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Ha(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=Dx(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await vA(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&Nx(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var EA,Xo,$p=l(()=>{"use strict";EA=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),Xo=(e,t)=>e.find(r=>r.id===t)??null});var ys,Hp=l(()=>{"use strict";Ua();TA();$p();ys=async(e,t)=>{t!==void 0&&await WA(t,e);let r=Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Ha(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=EA(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var $x=l(()=>{"use strict"});var D4,j4,Fp,xA=l(()=>{"use strict";D4="Default",j4=e=>e.trim().toLowerCase()===D4.toLowerCase(),Fp=j4});var Le,Hx,$4,H4,F4,U4,Ss,RA=l(()=>{"use strict";xA();Le=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hx=(e,t)=>e.length===0?`<p class="empty">${Le(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Le(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Le(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,$4=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,H4=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Le(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,F4=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?H4(e.project):$4();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${Le(o.slug)}"${t.size===0||t.has(o.slug)?" checked":""} />
            <span><strong>${Le(o.name)}</strong> <span class="muted mono">(${Le(o.slug)})</span></span>
          </label>
          <p class="muted">${o.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`<form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${Le(e.project.id)}" />
        <p class="field-label">Installed</p>
        <p class="lede">Check the sets to write into this repo&apos;s <code>.cursor</code> tree, then pull.</p>
        ${r}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`},U4=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Le(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Le(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},Ss=e=>{let t=e.flashError?`<div class="alert-error">${Le(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Le(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(u,m)=>`<a class="project-tab${e.activeTab===u?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${u}">${Le(m)}</a>`,n=e.composition?.items.filter(u=>u.kind==="workflow")??[],s=e.composition?.items.filter(u=>u.kind==="agent")??[],i="";e.activeTab==="harness"?i=F4({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=Hx(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=Hx(s,"No agents installed for this project yet."):i=U4({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});let a=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}?rename=1`,c=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${Le(a)}" target="_blank" rel="noopener noreferrer">Rename in Agent Witch Cloud\u2026</a>
    </div>`,d=Fp(e.project.name)?"":`<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from Agent Witch Cloud only. The folder on this Mac is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from Agent Witch Cloud? Your repo folder on this Mac will stay.');">
          <input type="hidden" name="projectId" value="${Le(e.project.id)}" />
          <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
      </section>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Le(e.project.name)}</h1>
      <p class="muted mono">${Le(e.project.projectFolderPath)}</p>
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
    </section>${d}`}});var B4,G4,Fx,Ux=l(()=>{"use strict";Vo();hr();B4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),G4=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[Me]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!B4(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Bt(n);return s===null?[]:[s]})}catch{return null}},Fx=G4});var Bx,IA,Gx=l(()=>{"use strict";me();Vo();RA();Hp();Ux();$p();Pp();Ua();bt();Bx=e=>({kind:"page",title:e.project.name,body:Ss({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:eo(e.layout),linkedSetSlugs:Zr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),IA=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=H();if(r===null)return{kind:"not_found"};let o=await ys(r,e.layout),n=Xo(o.projects,t);if(n===null)return{kind:"not_found"};let s=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??At,a=s===null?null:await Fx(s,n.id);if(a===null)return Bx({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=rA({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return Bx({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await Fa(s,n.id,c.appliedSetSlugs),u=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${u.toString()}`}}});var q4,OA,qx=l(()=>{"use strict";q4=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,OA=q4});var Vx=l(()=>{"use strict"});var Kx=l(()=>{"use strict"});var Jx=l(()=>{"use strict";Vx();Kx()});var V4,to,Yx=l(()=>{"use strict";V4=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],to=(e=process.env)=>{let t={...e};for(let r of V4)delete t[r];return t}});var Xx=l(()=>{"use strict";Yx()});var MA,Zx=l(()=>{"use strict";MA={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var NA=l(()=>{"use strict";Zx()});var Up,zA=l(()=>{"use strict";Up={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var Bp=l(()=>{"use strict";Jx();Xx();bt();NA();zA()});var Qx,eR,K4,Gp,qp,tR=l(()=>{"use strict";Qx=require("node:child_process"),eR=require("node:util");Bp();K4=(0,eR.promisify)(Qx.execFile),Gp=async(e,t)=>{try{let{stdout:r}=await K4("git",t,{cwd:e,env:to(),maxBuffer:1048576});return r.trim()}catch{return null}},qp=async e=>{let t=await Gp(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await Gp(e,["rev-parse","--abbrev-ref","HEAD"]),o=await Gp(e,["status","--porcelain"]),n=await Gp(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var DA,rR=l(()=>{"use strict";DA=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var J4,jA,oR=l(()=>{"use strict";J4=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},jA=J4});var Y4,$A,nR=l(()=>{"use strict";hr();Y4=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[Me]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},$A=Y4});var sR,ro,iR=l(()=>{"use strict";sR=require("node:child_process"),ro=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,sR.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var aR=l(()=>{"use strict";Hp()});var Ba,lR=l(()=>{"use strict";hr();Ba=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[Me]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var HA,cR=l(()=>{"use strict";hr();HA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[Me]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var Gt=l(()=>{"use strict";Hp();$p();$x();ms();jS();Gx();Pp();qx();tR();rR();oR();nR();iR();aR();lR();cR();TA();kA();Ua()});var Vp,Ga,dR,FA,Zo,UA=l(()=>{"use strict";Vp=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},Ga=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Vp(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},dR=e=>e>=1&&e<=5,FA=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Vp(t,"UTC")},Zo=e=>{let t=e.from??new Date,r=Vp(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Ga(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=Ga(r,e.timeZone,o,0),s=Vp(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?Ga(FA(r),e.timeZone,o,0):n;if(!i&&dR(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=FA(a),dR(a.weekday))return Ga(a,e.timeZone,o,0);return Ga(FA(r),e.timeZone,o,0)}});var uR,BA,yr,GA=l(()=>{"use strict";uR=require("node:crypto");me();Gt();UA();jp();BA=!1,yr=async e=>{if(BA)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=H();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=Dp(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};BA=!0;let n=(0,uR.randomUUID)();try{let s=await ds(t,"claude-cli",o.prompt);await CA(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=Zo({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return zp(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{BA=!1}}});var Kp,pR=l(()=>{"use strict";me();GA();jp();Kp=async()=>{let e=H();if(e===null)return;let t=vt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await yr(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var qa=l(()=>{"use strict";jp();pR();GA();UA()});var mR=l(()=>{"use strict";qa()});var gR=l(()=>{"use strict";AA()});var fR=l(()=>{"use strict";gR()});var qA=l(()=>{"use strict";qa()});var X4,Z4,Va,VA=l(()=>{"use strict";mR();fR();qA();Re();X4=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),Z4=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??Zo({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??Zo({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Va=e=>{let t=X4(e.profileEmail),r=vt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=hs(s);return i!==null?[Z4(i,o.get(i.id))]:[]});return Np(t,n),{ok:!0,writtenCount:n.length}}});var KA=l(()=>{"use strict";qa()});var hR=l(()=>{"use strict";me()});var yR=l(()=>{"use strict";VA();KA();qA();hR()});var SR,Ka,Ja,Ya,AR=l(()=>{"use strict";SR=g(require("node:os"));yR();Na();za();Ka=e=>{if(!fr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Ko(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=Va({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Ja=async e=>{if(!fr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Ko(t)?yr(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Ya=()=>{let e=H(),t=e!==null?vt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:SR.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var JA=l(()=>{"use strict";AR()});var Jp=l(()=>{"use strict";re()});var Yp=l(()=>{"use strict";re()});var Xp,PR,wR,bR,Q4,e8,As,YA=l(()=>{"use strict";Xp=g(require("node:fs")),PR=g(require("node:os")),wR=g(require("node:path"));Jp();Yp();_a();Re();bR=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},Q4=e=>wR.default.join(PR.default.homedir(),"Library","LaunchAgents",`${e}.plist`),e8=async e=>Xp.default.existsSync(Q4(e))?(await xe(e)).ok:!1,As=async(e=W())=>{let t=Xp.default.existsSync(rp(e)),r=!Xp.default.existsSync(ar(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=wa(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await bR(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${_e(e)}-wake`;await e8(i)&&s.push(i);for(let c of te(e))(await xe(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await bR(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var _R=l(()=>{"use strict";re()});var bs,Xa=l(()=>{"use strict";bs="connection-health.json"});var Qo,Zp,t8,Za,ke,XA,Qp,He,em=l(()=>{"use strict";Qo=g(require("node:fs")),Zp=g(require("node:path"));Xa();t8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Za=e=>e.profileEmail===null?Zp.default.join(e.installDir,bs):Zp.default.join(e.installDir,"profiles",e.profileEmail,bs),ke=e=>{let t=Za(e);if(!Qo.default.existsSync(t))return null;try{let r=JSON.parse(Qo.default.readFileSync(t,"utf8"));return!t8(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},XA=e=>{let t=Za(e);Qo.default.existsSync(t)&&Qo.default.rmSync(t,{force:!0})},Qp=(e,t)=>{let r=Za(e),o=ke(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Qo.default.mkdirSync(Zp.default.dirname(r),{recursive:!0}),Qo.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},He=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var Qa,vR=l(()=>{"use strict";Xa();em();Qa=(e,t)=>{if(!t.socketOpen)return!1;let r=ke(e);return r===null?!1:!He(r,t.staleAfterMs??12e4,t.nowMs)}});var ZA,CR=l(()=>{"use strict";em();ZA=(e,t)=>!(e!==null&&!He(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Ps=l(()=>{"use strict";em();vR();CR();Xa()});var QA=l(()=>{"use strict";Ps();re()});var eb=l(()=>{"use strict";Ps()});var tb=l(()=>{"use strict";re()});var kR,LR,el,rb=l(()=>{"use strict";kR=g(require("node:fs"));bt();Jp();Yp();Re();LR=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},el=async(e=W())=>{if(!kR.default.existsSync(ar(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await LR())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of te(e))(await xe(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await LR();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var WR=l(()=>{"use strict";re()});var TR,en,ob,r8,o8,n8,ER,s8,xR,ws,tm=l(()=>{"use strict";TR=require("node:crypto"),en=g(require("node:fs")),ob=g(require("node:path"));Re();r8="watchdog-log.ndjson",o8=200,n8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ER=(e=W())=>{let t=N(),r=t.installDir===e?t.logsDir:Vn({installDir:e,profileEmail:t.profileEmail});return ob.default.join(r,r8)},s8=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!n8(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},xR=(e,t=W())=>{let r={id:(0,TR.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=ER(t);en.default.mkdirSync(ob.default.dirname(o),{recursive:!0});let n=en.default.existsSync(o)?en.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-o8+1)),JSON.stringify(r)];return en.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},ws=(e=20,t=W())=>{let r=ER(t);if(!en.default.existsSync(r))return[];let o=en.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=s8(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var nb,sb,ib,ab=l(()=>{"use strict";Be();nb=bo.watchdogReinstallState,sb=900*1e3,ib=3e3});var RR=l(()=>{"use strict";ab()});var IR={};Nt(IR,{verifyAgentWitchReviveAfterKickstart:()=>a8});var i8,a8,OR=l(()=>{"use strict";RR();eb();tb();Re();i8=e=>new Promise(t=>{setTimeout(t,e)}),a8=async e=>{if(await i8(e.verifyDelayMs??ib),!await Lo(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),o=ke(r);return!He(o,e.staleAfterMs)}});var tl,lb,l8,MR,NR,cb,db,ub=l(()=>{"use strict";tl=g(require("node:fs")),lb=g(require("node:path"));J();ab();l8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),MR=e=>lb.default.join(e,nb),NR=(e=W())=>{let t=MR(e);if(!tl.default.existsSync(t))return null;try{let r=JSON.parse(tl.default.readFileSync(t,"utf8"));return!l8(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},cb=(e=W(),t=Date.now())=>{let r=NR(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=sb:!0},db=(e=W(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=MR(e);return tl.default.mkdirSync(lb.default.dirname(o),{recursive:!0}),tl.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var pb,zR=l(()=>{"use strict";re();ub();pb=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!cb())return{attempted:!1,ok:!1,targets:e};db();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await xe(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var DR=l(()=>{"use strict";ub();zR()});var mb=l(()=>{"use strict";Ht()});var jR=l(()=>{"use strict";Ht()});var $R,_s,HR,FR,UR,c8,d8,BR,u8,p8,GR,qR=l(()=>{"use strict";$R=require("node:child_process"),_s=g(require("node:fs")),HR=g(require("node:os")),FR=g(require("node:path")),UR=require("node:util");mb();jR();Re();c8=(0,UR.promisify)($R.execFile),d8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),BR=e=>{let t=yt(e),r=t===null?N():N(t);if(!_s.default.existsSync(r.configPath))return null;try{let o=JSON.parse(_s.default.readFileSync(r.configPath,"utf8"));return!d8(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},u8=e=>BR(e)?.wsUrl??null,p8=e=>{let t=u8(e);return t!==null?ve(t):Ie(e)?.appOrigin??null},GR=async e=>{let t=e?.installDir??W(),r=BR(t),o=r!==null?ve(r.wsUrl):p8(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=FR.default.join(HR.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{_s.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??yt(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await c8("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{_s.default.existsSync(i)&&_s.default.unlinkSync(i)}}});var VR={};Nt(VR,{attemptAgentWitchWatchdogReinstall:()=>m8});var m8,KR=l(()=>{"use strict";DR();qR();m8=async e=>pb(e,()=>GR())});var JR,YR,XR,g8,f8,h8,rl,gb=l(()=>{"use strict";_R();QA();eb();tb();rb();YA();Jp();Yp();Re();es();WR();tm();JR=e=>e===null?N():N(e),YR=async(e,t,r)=>{if(!await Lo(e))return"not_running";let n=JR(t);if(Pt(n))return"healthy";let s=ke(n);return He(s,r)?"stale_connection":"healthy"},XR=async e=>{let t=e?.staleAfterMs??12e4,r=W(),o=te(r);return Promise.all(o.map(async n=>{let s=await YR(n.launchAgentLabel,n.profileEmail,t),i=JR(n.profileEmail),a=ke(i),c=await Lo(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:He(a,t),needsRevive:s!=="healthy",reason:s}}))},g8=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},f8=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",h8=async e=>{let t=await xe(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(OR(),IR)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},rl=async e=>{if(!St())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=W();await As(r),await el(r);let o=te(r),n=[];for(let u of o){let m=await YR(u.launchAgentLabel,u.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:m});continue}n.push(await h8({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let u=Co();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(KR(),VR)),m=await u(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(u){s=!0,i=!1,a=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&xR({event:f8(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:g8(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var ZR,rm,QR=l(()=>{"use strict";ZR=g(require("node:os"));QA();tm();gb();rm=async()=>{let e=await XR(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:ZR.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:ws(1)[0]??null}}});var fb=l(()=>{"use strict";YA();gb();QR();tm()});var ol,nl,sl,e0=l(()=>{"use strict";re();fb();ol=async()=>{await As();let e=te(),t=[];for(let r of e){let o=await xe(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Co();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},nl=rl,sl=rl});var hb=l(()=>{"use strict";e0()});var nm,om,t0,yb,r0,y8,S8,A8,b8,P8,sm,o0=l(()=>{"use strict";nm=require("node:child_process"),om=g(require("node:fs")),t0=g(require("node:os")),yb=g(require("node:path")),r0=require("node:util");re();J();y8=(0,r0.promisify)(nm.execFile),S8=()=>yb.default.join(t0.default.homedir(),"Library","LaunchAgents"),A8=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await y8("launchctl",["bootout",r]).catch(()=>{})},b8=e=>{let t=yb.default.join(S8(),`${e}.plist`);om.default.existsSync(t)&&om.default.unlinkSync(t)},P8=e=>{(0,nm.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},sm=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=W();if(!om.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=lr(e);for(let r of t)await A8(r),b8(r);return P8(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var n0,im,s0,vs,i0,w8,_8,v8,Sb,C8,Ab,a0=l(()=>{"use strict";n0=require("node:child_process"),im=g(require("node:fs")),s0=g(require("node:os")),vs=g(require("node:path")),i0=require("node:util");re();w8=(0,i0.promisify)(n0.execFile),_8=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],v8=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],Sb=e=>{im.default.existsSync(e)&&im.default.rmSync(e,{force:!0})},C8=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await w8("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},Ab=async e=>{let r=(e.listLaunchAgentLabels??lr)(e.layout.installDir),o=e.launchAgentsDir??vs.default.join(s0.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??C8;for(let i of r)await n(i),Sb(vs.default.join(o,`${i}.plist`));let s=vs.default.dirname(e.layout.configPath);for(let i of _8)Sb(vs.default.join(s,i));for(let i of v8)Sb(vs.default.join(e.layout.installDir,i));return im.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var bb,l0=l(()=>{"use strict";bb="unknown_identity"});var Pb=l(()=>{"use strict";zA();l0()});var L8,wb,c0=l(()=>{"use strict";Pb();L8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wb=e=>e.type!=="system.error"||!L8(e.payload)?!1:e.payload.errorCode===bb});var _b=l(()=>{"use strict";o0();a0();c0()});var am=l(()=>{"use strict";re();Ht();_b();fb()});var Cs,lm,cm=l(()=>{"use strict";am();Cs=(e=20)=>ws(e),lm=rm});var dm,Ls,um,pm=l(()=>{"use strict";am();dm=jo,Ls=(e=20)=>No(e),um=e=>Do(e)});var mm,vb=l(()=>{"use strict";am();mm=()=>sm()});var d0=l(()=>{"use strict";TS();SA();JA();hb();cm();pm();vb()});var u0={};Nt(u0,{buildAgentWitchAutomationStatusFromWakeServer:()=>Ya,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>dm,buildAgentWitchWakeHealthResponse:()=>Ca,buildAgentWitchWakeIdentityResponse:()=>La,buildAgentWitchWatchdogStatus:()=>lm,installHarnessFromWakeServer:()=>Da,readAgentWitchSelfUpdateLogEntries:()=>Ls,readAgentWitchWatchdogLogEntries:()=>Cs,restartAgentWitchFromWakeServer:()=>sl,reviveAgentWitchWebSocketFromWakeServer:()=>nl,runAgentWitchSelfUpdateFromWakeServer:()=>um,runAgentWitchUninstallLocalFromWakeServer:()=>mm,runAutomationFromWakeServer:()=>Ja,syncAutomationsFromWakeServer:()=>Ka,wakeAgentWitchLaunchAgents:()=>ol});var p0=l(()=>{"use strict";d0()});var m0,g0,Cb,Lb,f0=l(()=>{"use strict";m0=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),g0=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?m0(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?m0(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},Cb=e=>{let t=e.watchdogLogs.map(g0).join(""),r=e.updateLogs.map(g0).join("");return`<!doctype html>
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
</html>`},Lb=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var h0,y0,S0=l(()=>{"use strict";h0=g(require("node:net")),y0=()=>new Promise((e,t)=>{let r=h0.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var A0,k8,kb,b0=l(()=>{"use strict";A0=g(require("node:net"));S0();va();_a();Re();k8=e=>new Promise(t=>{let r=A0.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),kb=async()=>{let e=W(),t=_t();if(await k8(t))return lE(t),t;let r=await y0();return op(e,r),r}});var W8,Wb,P0=l(()=>{"use strict";W8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Wb=e=>({force:W8(e)&&e.force===!0})});var il=l(()=>{"use strict";Na();f0();b0();P0();py();Eu();Ro()});var Tb,j,Eb,xb,al,w0=l(()=>{"use strict";Tb=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},Eb=e=>{e.writeHead(403),e.end()},xb=e=>e.url?.split("?")[0]??"/",al=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var Ct=l(()=>{"use strict";w0()});var T8,_0,v0=l(()=>{"use strict";JA();Ct();T8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},_0=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,Ya(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await T8(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=Ka(t);return j(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Ja(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var E8,L0,C0,k0,Rb,W0,Ib=l(()=>{"use strict";E8=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],L0=e=>/embed|minilm|^bge-/i.test(e),C0=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),k0=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),Rb=e=>e.filter(t=>t.trim().length>0&&!L0(t)),W0=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!L0(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>C0(s,o));if(n!==void 0)return n}for(let n of E8){let s=r.find(i=>C0(i,n));if(s!==void 0)return s}return r[0]??null}});var Ob,x0,R0,gm,I0,T0,E0,x8,R8,I8,O8,M8,N8,Lt,ll=l(()=>{"use strict";Ob=require("node:child_process"),x0=g(require("node:fs")),R0=g(require("node:os")),gm=g(require("node:path"));Ht();wt();Ib();I0=3e3,T0=["claude-cli","codex","cursor","antigravity"],E0={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},x8=(e,t)=>new Promise(r=>{let o=(0,Ob.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},I0);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),R8=()=>{let e=R0.default.homedir();return["ollama",gm.default.join(e,".local","bin","ollama"),gm.default.join(e,".agent-witch","ollama","ollama"),gm.default.join(e,".local-agent-witch","ollama","ollama")]},I8=e=>new Promise(t=>{let r=(0,Ob.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},I0);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(k0(Buffer.concat(o).toString("utf8")))})}),O8=async()=>{for(let e of R8()){if(e!=="ollama"&&!x0.default.existsSync(e))continue;let t=await I8(e);if(t!==null)return t}return[]},M8=e=>{let t=e.installedWriterIds.map(s=>E0[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=de(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${E0[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},N8=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:ts},Lt=async e=>{let t=T0.map(i=>{let a=Fu(i,e.commands);return x8(a.command,a.args)}),[r,...o]=await Promise.all([O8(),...t]),n=T0.flatMap((i,a)=>o[a]===!0?[i]:[]),s=W0(r,N8());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:M8({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var z8,D8,Mb,O0=l(()=>{"use strict";z8="http://127.0.0.1:11434",D8=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Mb=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||z8;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?D8(await o.json()):null}catch{return null}}});var Nb=l(()=>{"use strict";wt();ll();O0();Ib()});var j8,M0,N0=l(()=>{"use strict";Nb();j8={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},M0=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:j8[t]})),ollamaModels:Rb(e.ollamaModels)})});var $8,z0,D0=l(()=>{"use strict";Nb();Ct();N0();$8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},z0=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Lt({commands:ue({})});return j(e.response,200,{ok:!0,...M0({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await $8(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await Mb({model:r,prompt:o});return n===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var H8,j0,$0=l(()=>{"use strict";SA();Ct();H8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},j0=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await H8(e);if(t===null)return!0;let r=Da(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var H0=l(()=>{"use strict";Gt()});var zb,F0=l(()=>{"use strict";H0();za();zb=e=>{if(!fr(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:et({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var U0,Db,jb=l(()=>{"use strict";me();Gt();za();U0=e=>{if(!fr(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},Db=async e=>{let t=U0(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=ro("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=H();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=Y({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(et({projectFolderPath:r}),await Ba(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var B0=l(()=>{"use strict";F0();jb()});var G0,q0=l(()=>{"use strict";B0();jb();Ct();G0=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=zb(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await Db(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,o,r,e.cors.headers),!0}return!1}});var V0,K0=l(()=>{"use strict";il();pm();cm();V0=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Cs(50),r=Ls(50);return e.response.writeHead(200,Lb()),e.response.end(Cb({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var J0,Y0=l(()=>{"use strict";TS();Ct();J0=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,Ca(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,La(),e.cors.headers),!0):!1});var X0,Z0=l(()=>{"use strict";vb();Ct();X0=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await mm();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var Q0,eI=l(()=>{"use strict";hb();Ct();Q0=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await nl();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await sl();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await ol();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var tI,rI=l(()=>{"use strict";il();pm();Ct();tI=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=dm();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=al(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:Ls(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=Wb(t),o=await um({force:r});return j(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var oI,nI=l(()=>{"use strict";cm();Ct();oI=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await lm();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=al(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:Cs(t)},e.cors.headers),!0}return!1}});var sI,iI=l(()=>{"use strict";v0();D0();$0();q0();K0();Y0();Z0();eI();rI();nI();sI=[J0,V0,oI,Q0,tI,X0,j0,G0,_0,z0]});var aI,lI=l(()=>{"use strict";iI();aI=async e=>{for(let t of sI)if(await t(e))return!0;return!1}});var F8,cI,dI=l(()=>{"use strict";Na();Ct();lI();F8=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:xb(e),readJsonBody:()=>Tb(e)}),cI=async(e,t,r)=>{let o=e.headers.origin,n=Ip(o);try{if(o!==void 0&&o.length>0&&!n.allowed){Eb(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=F8(e,t,r,n);if(await aI(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var uI,tn,fm,hm=l(()=>{"use strict";uI=g(require("node:http"));il();dI();tn=async()=>{let e=await kb(),t=uI.default.createServer((r,o)=>{cI(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},fm=tn});var pI={};Nt(pI,{runAgentWitchBridgeCli:()=>U8});var U8,mI=l(()=>{"use strict";re();hm();U8=async()=>{Xe("agent-witch-bridge");let e=await tn(),t=dr(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var gI=l(()=>{"use strict";bt()});var ks,$b,fI=l(()=>{"use strict";ks=(e,t,r)=>e===1?t:r,$b=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${ks(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${ks(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${ks(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${ks(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${ks(d,"month","months")} ago`;let u=Math.floor(a/365);return`${u} ${ks(u,"year","years")} ago`}});var rn,Hb,B8,G8,Fb,oo,cl,Ub,hI=l(()=>{"use strict";rn=g(require("node:fs")),Hb=g(require("node:path")),B8="local-ws-traffic.ndjson",G8=500,Fb=e=>Hb.default.join(e.logsDir,B8),oo=(e,t)=>{let r=Fb(e);rn.default.mkdirSync(Hb.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});rn.default.appendFileSync(r,`${o}
`,"utf8")},cl=(e,t=G8)=>{let r=Fb(e);if(!rn.default.existsSync(r))return[];let n=rn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},Ub=e=>{let t=Fb(e);rn.default.existsSync(t)&&rn.default.writeFileSync(t,"","utf8")}});var q8,yI,SI,AI=l(()=>{"use strict";Pb();q8=new Set(Object.values(Up)),yI=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),SI=e=>{if(!yI(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!q8.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!yI(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var bI,PI=l(()=>{"use strict";bI=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var V8,K8,J8,dl,wI=l(()=>{"use strict";PI();V8=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,K8=e=>V8.test(e),J8=e=>bI(e),dl=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>dl(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&K8(o)){r[o]=J8(n);continue}r[o]=dl(n)}return r}});var qt,Bb,Y8,X8,Z8,Gb,_I,vI,CI,Q8,ym,on,Sm,qb,LI=l(()=>{"use strict";qt=g(require("node:fs")),Bb=g(require("node:path"));AI();wI();Y8="local-ws-trace.ndjson",X8=1e4,Z8=1440*60*1e3,Gb=e=>Bb.default.join(e.logsDir,Y8),_I=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},vI=e=>{if(!qt.default.existsSync(e))return;let t=qt.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-Z8,n=t.filter(s=>{let i=_I(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-X8);qt.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},CI=(e,t)=>{let r=Gb(e);qt.default.mkdirSync(Bb.default.dirname(r),{recursive:!0}),qt.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),vI(r)},Q8=e=>e.parsed===null?{_empty:!0}:dl(e.parsed),ym=(e,t,r)=>{let o=SI(r);CI(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:Q8(o)})},on=(e,t)=>{CI(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:dl({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Sm=(e,t=80)=>{let r=Gb(e);if(vI(r),!qt.default.existsSync(r))return[];let o=qt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=_I(s);i!==null&&n.push(i)}return n.reverse()},qb=e=>{let t=Gb(e);qt.default.existsSync(t)&&qt.default.writeFileSync(t,"","utf8")}});var no,kI,e3,Vb,Am,WI=l(()=>{"use strict";no=g(require("node:fs")),kI=g(require("node:path")),e3=256e3,Vb=e=>{no.default.mkdirSync(kI.default.dirname(e),{recursive:!0}),no.default.writeFileSync(e,"","utf8")},Am=(e,t=e3)=>{if(!no.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=no.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=no.default.openSync(e,"r");try{no.default.readSync(a,i,0,s,n)}finally{no.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var ul=l(()=>{"use strict";hI();LI();WI()});var Kb,Jb,TI=l(()=>{"use strict";Kb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Jb=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${Kb(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${Kb(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${Kb(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var EI=l(()=>{"use strict";TI()});var Yb,Xb=l(()=>{"use strict";Yb=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var Zb=l(()=>{"use strict";Xa()});var Qb,eP,xI=l(()=>{"use strict";Zb();Qb=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},eP=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var RI=l(()=>{"use strict";Xb();xI()});var II,pl,tP,ml=l(()=>{"use strict";Xb();II=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pl=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=II(e),r=II(Yb(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},tP=`(function () {
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
})();`});var nn,t3,rP,OI=l(()=>{"use strict";nn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),t3=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},rP=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${nn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?nn(r.direction):nn(r.kind),i=`trace-body-${o}`,a=nn(t3(r.body));return`<tr>
        <td title="${nn(r.at)}">${nn(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${nn(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var NI,r3,MI,oP,zI=l(()=>{"use strict";Be();bt();NI=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},r3=e=>NI(e)===sr?jn:Dn,MI=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oP=e=>{let t=r3(e.installDir),o=`AW_HOME="$HOME/${NI(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${MI(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${MI(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var DI=l(()=>{"use strict";ml();OI();zI();ml()});var o3,Sr,gl=l(()=>{"use strict";o3=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Sr=o3});var jI,$I,HI,FI,UI,BI,GI,Ws=l(()=>{"use strict";jI="projects",$I="knowledge",HI="chunks.ndjson",FI="lessons.ndjson",UI="error-chunks.ndjson",BI="usage-stats.json",GI="knowledge-location.json"});var bm,n3,Pm,nP=l(()=>{"use strict";bm=g(require("node:path"));Ws();n3=(e,t)=>{let r=t.trim(),o=bm.default.join(e.installDir,jI,r,$I);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:bm.default.join(o,HI),memoryRunsFilePath:bm.default.join(o,FI)}},Pm=n3});var sP,s3,qI,VI=l(()=>{"use strict";sP=g(require("node:fs"));Ws();Go();s3=e=>{let t=at(e.projectFolderPath),r=`${t.metaDirPath}/${GI}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};sP.default.mkdirSync(t.metaDirPath,{recursive:!0}),sP.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},qI=s3});var Ts,JI,KI,i3,YI,XI=l(()=>{"use strict";Ts=g(require("node:fs")),JI=g(require("node:path"));Eo();Go();nP();VI();KI=(e,t)=>{Ts.default.existsSync(e)&&(Ts.default.existsSync(t)&&Ts.default.statSync(t).size>0||(Ts.default.mkdirSync(JI.default.dirname(t),{recursive:!0}),Ts.default.copyFileSync(e,t)))},i3=e=>{let t=at(e.projectFolderPath),r=Pm(e.layout,e.projectId),o=`${t.memoryDirPath}/${Kn}`;KI(t.ragChunksFilePath,r.ragChunksFilePath),KI(o,r.memoryRunsFilePath),qI({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},YI=i3});var iP,a3,ZI,QI=l(()=>{"use strict";iP=g(require("node:fs"));Go();a3=e=>{let t=at(e);if(!iP.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(iP.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},ZI=a3});var eO,l3,Es,wm=l(()=>{"use strict";eO=g(require("node:path"));Eo();Go();XI();QI();nP();l3=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=ZI(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){YI({layout:e.layout,projectFolderPath:t,projectId:o});let s=Pm(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=at(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:eO.default.join(n.memoryDirPath,Kn),projectId:null}},Es=l3});var _m,d3,vm,aP=l(()=>{"use strict";_m=g(require("node:fs"));Ws();d3=(e,t=500)=>{if(!_m.default.existsSync(e))return;let r=_m.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);_m.default.writeFileSync(e,`${o.join(`
`)}
`)},vm=d3});var Cm,u3,sn,lP=l(()=>{"use strict";Cm=g(require("node:path"));Ws();wm();u3=e=>{let t=Es(e);if(t===null)return null;let r=Cm.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Cm.default.join(r,BI),errorChunksFilePath:Cm.default.join(r,UI)}},sn=u3});var rO,fl,oO,tO,cP,nO,g3,dP,sO,uP,pP,mP,gP=l(()=>{"use strict";rO=require("node:crypto"),fl=g(require("node:fs")),oO=g(require("node:path"));gl();Ws();lP();tO=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),cP=e=>{if(!fl.default.existsSync(e))return tO();try{let t=JSON.parse(fl.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return tO()},nO=(e,t)=>{fl.default.mkdirSync(oO.default.dirname(e),{recursive:!0}),fl.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},g3=e=>{let t=Sr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,rO.createHash)("sha256").update(o).digest("hex").slice(0,16)},dP=e=>{let t=sn(e);return t===null?null:cP(t.usageStatsFilePath)},sO=e=>{if(e.chunkIds.length===0)return;let t=sn(e);if(t===null)return;let r=cP(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;nO(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},uP=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=sn(e);if(r===null)return null;let o=g3(t),n=cP(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return nO(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},pP=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,mP=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var hl,iO,f3,h3,aO,y3,fP,yl,xs,hP,Rs,yP,SP=l(()=>{"use strict";hl=g(require("node:fs")),iO=g(require("node:path"));gl();wm();aP();gP();f3="http://127.0.0.1:11434",h3="nomic-embed-text",aO=(e,t,r)=>Es({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,y3=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},fP=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},yl=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||f3,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||h3;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},xs=(e,t,r)=>{let o=aO(e,t,r);if(o===null||!hl.default.existsSync(o))return[];let n=hl.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},hP=async e=>{let t=Sr(e.text),r=fP(t);if(r.length===0)return 0;let o=aO(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;hl.default.mkdirSync(iO.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await yl(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};hl.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return vm(o),n},Rs=async e=>{let t=await yl(e.query);if(t===null)return[];let r=e.minScore??0,s=xs(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:y3(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return sO({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},yP=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Sl,lO,S3,A3,AP,bP,PP,cO=l(()=>{"use strict";Sl=g(require("node:fs")),lO=g(require("node:path"));gl();lP();aP();SP();S3=e=>{if(!Sl.default.existsSync(e))return[];let t=Sl.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},A3=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},AP=async e=>{let t=sn(e);if(t===null)return 0;let r=Sr(e.text),o=fP(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;Sl.default.mkdirSync(lO.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await yl(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};Sl.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return vm(n,200),s},bP=async e=>{let t=sn(e);if(t===null)return[];let r=await yl(e.query);if(r===null)return[];let o=e.minScore??.3;return S3(t.errorChunksFilePath).map(s=>({chunk:s,score:A3(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},PP=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var wP=l(()=>{"use strict";SP();gP();cO()});var ye,_P,vP=l(()=>{"use strict";NA();ye=MA,_P=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${ye.gray50};
  --aw-zinc-100: ${ye.gray100};
  --aw-zinc-200: ${ye.gray200};
  --aw-zinc-400: ${ye.gray400};
  --aw-zinc-500: ${ye.gray500};
  --aw-zinc-600: ${ye.gray600};
  --aw-zinc-700: ${ye.gray700};
  --aw-zinc-800: ${ye.gray900};
  --aw-zinc-900: ${ye.gray900};
  --aw-brand-600: ${ye.brand600};
  --aw-brand-700: ${ye.brand700};
  --aw-brand-50: ${ye.brand50};
  --aw-emerald-50: ${ye.success50};
  --aw-emerald-700: ${ye.success700};
  --aw-amber-50: ${ye.warning50};
  --aw-amber-900: ${ye.warning900};
  --aw-red-50: ${ye.error50};
  --aw-red-700: ${ye.error700};
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
  justify-content: flex-end;
  gap: 0.5rem 0.65rem;
  padding-top: 0.25rem;
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
`.trim()});var b3,P3,CP,dO,LP,uO=l(()=>{"use strict";vP();ml();b3=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,P3=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],CP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dO=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${b3}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,LP=e=>{let t=P3.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=CP(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=CP(e.installBundleVersionLabel?.trim()??"unknown"),s=dO("brand brand-in-sidebar",n),i=dO("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${CP(e.title)} \xB7 Agent Witch Local</title>
  <style>${_P}</style>
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
  <script>${tP}</script>
</body>
</html>`}});var Lm,Al,km=l(()=>{"use strict";Lm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Al=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Lm(e.syncMessage)}</p>`:"",o=Lm(e.manageHref),n=Lm(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Lm(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var kP,WP,TP,pO=l(()=>{"use strict";kP=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,WP=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,TP=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var mO=l(()=>{"use strict";uO();km();pO()});var Is,EP,gO=l(()=>{"use strict";ml();Is=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),EP=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Is(e.wakeError)}</div>`:"",a=pl(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Is(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${Is(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Is(o)}</p>
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
        <p class="home-card-meta">${Is(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Is(n)}</p>
      </a>
    </div>`}});var fO=l(()=>{"use strict";gO()});var T,Os=l(()=>{"use strict";T=e=>e==="passed"||e==="stopped"||e==="failed"});var hO,xP,an,RP,Wm=l(()=>{"use strict";hO="Stopped at the round limit. The best prompt is kept.",xP="Stopped because the score stopped rising. The best prompt is kept.",an="Finished. The best prompt is the result.",RP="Wizard ended. Progress from finished steps is kept."});var so,IP=l(()=>{"use strict";so=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var w3,_3,bl,yO,Tm=l(()=>{"use strict";w3=/\n+|;\s+/,_3=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,bl=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(w3).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,_3(s)]},[]);return[...t,...o]},[]),yO=e=>{let t=bl(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var se,Ms=l(()=>{"use strict";se=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Pl,OP=l(()=>{"use strict";Tm();Ms();Pl=e=>{let t=[...e.priorRounds,e.current],r=se(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:yO(o)}}});var MP,v3,C3,Em,NP=l(()=>{"use strict";MP={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},v3=e=>{try{let t=JSON.parse(e.fragment);return{...MP,objects:[...e.objects,t]}}catch{return{...MP,objects:e.objects}}},C3=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:v3(r)},Em=e=>[...e].reduce(C3,MP).objects});var L3,zP,k3,SO,DP=l(()=>{"use strict";NP();L3=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},zP=e=>{let t=Em(e).filter(L3),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},k3=(e,t)=>({...e,passed:e.score>=t}),SO=(e,t)=>{let r=zP(e);return r===null?null:k3(r,t)}});var jP,$P,xm=l(()=>{"use strict";jP="The judge reply needs a score and a reason.",$P="The improver reply was empty."});var AO,bO=l(()=>{"use strict";AO=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var PO,wO=l(()=>{"use strict";PO=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var T3,_O,vO=l(()=>{"use strict";bO();wO();Wm();Tm();T3=e=>{let t=bl(e);return t.length===0?xP:`${xP} Avoid: ${t.join("; ")}.`},_O=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:hO};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(AO(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:T3(PO(r))}}return null}});var io,E3,ln,CO,Rm=l(()=>{"use strict";io=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},E3=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,ln=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",E3(e.tokens),`Delay: ${io(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},CO=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var x3,LO,kO=l(()=>{"use strict";DP();x3=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,LO=e=>{let r=(x3.exec(e)?.[1]??e).trim();return r.length===0||zP(r)!==null?null:r}});var WO,Im,TO=l(()=>{"use strict";Rm();kO();xm();WO=e=>({type:"call",role:"judge",choice:e.choice,prompt:CO({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),Im=e=>{let t=LO(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:$P}}:{nextPrompt:t,continuation:WO({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var HP,EO=l(()=>{"use strict";IP();OP();DP();xm();Wm();vO();xm();TO();HP=e=>{let t=SO(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:jP}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=_O({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=Pl({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:so({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var wl,FP=l(()=>{"use strict";wl=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var xO=l(()=>{"use strict"});var RO=l(()=>{"use strict";xO()});var cn,IO=l(()=>{"use strict";cn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var R3,UP,OO=l(()=>{"use strict";Rm();R3=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,UP=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",R3(e.tokens),`Delay: ${io(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var I3,O3,M3,BP,MO=l(()=>{"use strict";I3=/[A-Za-z0-9_./~-]{3,180}/g,O3=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,M3=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||O3.test(t)},BP=(e,t=12)=>{let r=[];for(let o of e.matchAll(I3)){let n=o[0].replace(/\.+$/,"");if(!(!M3(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var _l,NO=l(()=>{"use strict";_l=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var Om,GP,zO,vl,qP=l(()=>{"use strict";Om=e=>Math.floor(e/2),GP=e=>Math.max(Om(e)+1,e-20),zO=(e,t)=>e>=t?"passes":e>=GP(t)?"close":e>=Om(t)?"weak":"bad",vl=e=>[{band:"bad",label:`0\u2013${Om(e)-1} bad`},{band:"weak",label:`${Om(e)}\u2013${GP(e)-1} weak`},{band:"close",label:`${GP(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var Mm,VP=l(()=>{"use strict";qP();Mm=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${zO(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var kt,KP=l(()=>{"use strict";kt=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var DO,jO=l(()=>{"use strict";DO=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var N3,z3,$O,HO=l(()=>{"use strict";Os();VP();KP();jO();N3=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],z3=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",$O=e=>{let t=e.wizard;if(t===void 0)return[];let r=kt(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=N3.map((f,y)=>{let p=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:f,state:p,detail:null}}).filter((f,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=Mm(e),d=c.filter(f=>f.id==="round-0"),u=DO(t)&&(!n||a)?c.filter(f=>f.id!=="round-0"):[],m=T(e.status)&&!s,S=m?[{id:"end",label:z3(e),state:"done",detail:e.errorMessage}]:[];if(m&&S.length>0){let f=Math.min(r,i.length),y=i.slice(0,f).map(p=>({...p,state:"done"}));return[...d,...y,...S,...u]}return[...d,...i,...u,...S]}});var D3,JP,FO=l(()=>{"use strict";Os();VP();HO();D3=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",JP=e=>{if(e.wizard!==void 0)return $O(e);let t=Mm(e),r=T(e.status)?[{id:"end",label:D3(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var Cl,UO=l(()=>{"use strict";Cl=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var BO=l(()=>{"use strict";bt()});var GO,Ll,kl,zs,Nm,YP,qO=l(()=>{"use strict";BO();GO="/prompt-optimizer/agent",Ll=`${ur}${GO}`,kl=`${ur}/prompt-optimizer`,zs="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",Nm=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${zs}`,YP="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var Ar=l(()=>{"use strict"});var oe,Wl=l(()=>{"use strict";Ar();oe=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var XP,VO=l(()=>{"use strict";XP="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var KO,JO=l(()=>{"use strict";KO=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Tl,XO=l(()=>{"use strict";JO();Ar();Tl=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:KO(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null})});var ZP,ZO=l(()=>{"use strict";Ar();ZP=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null})});var QP,QO=l(()=>{"use strict";Ar();QP=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var eM,El,tM=l(()=>{"use strict";eM=["generalize","evaluate","separate","optimize_modules"],El=(e,t)=>{let r=eM.indexOf(t);if(r===-1)return e;let o=eM.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var zm,ew=l(()=>{"use strict";Tm();zm=e=>{let t=bl(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var xl,rM=l(()=>{"use strict";ew();xl=e=>{let t=zm(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var $3,H3,F3,oM,nM=l(()=>{"use strict";$3=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),H3=/^\{\{[a-zA-Z0-9_-]+\}\}$/,F3=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp($3(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let u=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),u}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},oM=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>H3.test(n)?n:F3(n,r)).join("")}});var tw,sM=l(()=>{"use strict";nM();tw=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:oM(o.prompt,t)}))}))});var U3,Rl,iM=l(()=>{"use strict";Ar();ew();U3=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Rl=e=>{let t=zm(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=U3(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Il,aM=l(()=>{"use strict";FP();Il=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return wl({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Ol,ow=l(()=>{"use strict";Ms();Ol=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var nw,lM=l(()=>{"use strict";ow();nw=e=>{let t=Ol({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var dn,cM=l(()=>{"use strict";dn=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var B3,G3,Q,Dm=l(()=>{"use strict";Wl();B3=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},G3=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,Q=e=>{let t=oe(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:B3(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>G3(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var dM,uM=l(()=>{"use strict";Wl();Dm();dM=e=>{let t=Q(e.wizard),r=oe(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var sw,pM=l(()=>{"use strict";uM();sw=e=>{let t=dM({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var q3,mM,gM=l(()=>{"use strict";q3=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},mM=e=>[...e].reduce(q3,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var V3,fM,hM=l(()=>{"use strict";V3=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},fM=e=>[...e].reduce(V3,{out:"",inString:!1,escaped:!1}).out});var K3,J3,yM,SM=l(()=>{"use strict";gM();hM();K3=e=>e.charCodeAt(0)===65279?e.slice(1):e,J3=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},yM=e=>fM(mM(J3(K3(e))))});var Y3,X3,Z3,AM,Q3,Ds,jm=l(()=>{"use strict";NP();SM();Y3=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},X3=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},Z3=e=>[...e].reduce(X3,{out:"",inString:!1,escaped:!1}).out,AM=e=>{let t=Em(e);return t.length===0?null:t[t.length-1]},Q3=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Ds=e=>{let t=yM(Y3(e)),r=AM(t);if(r!==null)return r;let o=Z3(t),n=AM(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw Q3(i)}}});var e6,t6,iw,bM,PM=l(()=>{"use strict";e6=/^[a-z0-9][a-z0-9-]{0,62}$/,t6=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return e6.test(t)?t:""},iw=e=>e.replace(/\s+/gu," ").trim(),bM=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=t6(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=iw(n.name),a=iw(n.description),c=iw(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var wM,_M,vM=l(()=>{"use strict";wM=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},_M=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var aw,CM=l(()=>{"use strict";jm();PM();vM();aw=(e,t)=>{let r=(()=>{try{return Ds(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(wM(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(_M).filter(a=>a!==null),i=bM({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var lw,LM=l(()=>{"use strict";lw=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var cw,kM=l(()=>{"use strict";cw=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var dw,WM=l(()=>{"use strict";Wl();Dm();dw=e=>{let t=Q(e.wizard),r=oe(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var Ml,TM=l(()=>{"use strict";Ml=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var Wt,r6,uw,EM=l(()=>{"use strict";Wt=g(Gn());jm();r6=(0,Wt.isType)({name:Wt.isNonEmptyString,description:Wt.isString,sampleValue:Wt.isString}),uw=e=>{let t=Ds(e);if(!(0,Wt.isType)({templatedPrompt:Wt.isNonEmptyString,variables:(0,Wt.isArrayWithEachItem)(r6)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var ie,o6,n6,pw,xM=l(()=>{"use strict";ie=g(Gn());Ar();jm();o6=(0,ie.isType)({id:ie.isNonEmptyString,title:ie.isNonEmptyString,prompt:ie.isNonEmptyString,order:ie.isNumber}),n6=(0,ie.isType)({id:ie.isNonEmptyString,title:ie.isNonEmptyString,summary:ie.isString,topology:(0,ie.isOneOf)("chain","parallel"),modules:(0,ie.isArrayWithEachItem)(o6),recommended:ie.isBoolean}),pw=e=>{let t=Ds(e);if(!(0,ie.isType)({options:(0,ie.isArrayWithEachItem)(n6)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var js,RM=l(()=>{"use strict";js=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var s6,mw,gw=l(()=>{"use strict";s6=/\{\{([a-zA-Z0-9_-]+)\}\}/g,mw=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(s6,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Tt,Et,IM=l(()=>{"use strict";Ms();gw();Tt=e=>mw(e.templatedPrompt,e.variables),Et=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return se(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Tt(e.wizard)}});var i6,un,OM=l(()=>{"use strict";i6=/\{\{([a-zA-Z0-9_-]+)\}\}/g,un=(e,t)=>e.replace(i6,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var a6,pn,$m=l(()=>{"use strict";a6=/\{\{([a-zA-Z0-9_-]+)\}\}/g,pn=e=>{let t=new Set,r=[];for(let o of e.matchAll(a6)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Nl,MM=l(()=>{"use strict";$m();Nl=e=>e.variables.length>0||pn(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var fw,hw=l(()=>{"use strict";Ar();fw=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var zl,NM=l(()=>{"use strict";Ms();hw();zl=e=>{let t=e.wizard.evaluateSelectedRound??se(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:fw(r.judgement,e.passScore)}});var Dl,zM=l(()=>{"use strict";Dl=e=>e.length===1&&e[0].modules.length===1});var yw,DM=l(()=>{"use strict";yw=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Se,Hm,jl=l(()=>{"use strict";Se=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),Hm=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var jM,$M=l(()=>{"use strict";jl();jM=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Se("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Se("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Se("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var HM,FM=l(()=>{"use strict";Os();jl();HM=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!T(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Se("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),Se("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Se("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",Hm(e.writerLabel,e.folder)),Se("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Se("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var UM,BM=l(()=>{"use strict";jl();UM=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Se("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Se("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Se("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var GM,qM=l(()=>{"use strict";jl();GM=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Se("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Se("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",Hm(e.writerLabel,e.folder)),...r?[Se("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var Fm,VM=l(()=>{"use strict";Os();$M();FM();BM();qM();Fm=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(T(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return HM(r);case"evaluate":return jM({...r,currentRound:e.currentRound});case"separate":return GM(r);case"optimize_modules":return UM({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var $l,br,KM=l(()=>{"use strict";$l=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),br=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var l6,Um,Sw,JM=l(()=>{"use strict";$m();l6="wizardParam_",Um=e=>`${l6}${e}`,Sw=e=>{let t=pn(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=Um(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var rt,YM=l(()=>{"use strict";rt=["generalize","evaluate","separate","optimize_modules"]});var Hl,mn,$s,Hs=l(()=>{"use strict";Hl="Stopped because the confirmed token or spend budget was exceeded.",mn="Approaching the confirmed budget. Further trials may hard-stop.",$s="Confirm the Step 4 token and spend budget before optimizing modules."});var Pr,Fl=l(()=>{"use strict";Pr=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var wr,Bm=l(()=>{"use strict";Hs();wr=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var ZM,QM,Aw,eN=l(()=>{"use strict";Hs();Fl();Bm();ZM=e=>{let t=e.fromJudge;if(t!=null&&typeof t.targetTokenBudget=="number"&&Number.isFinite(t.targetTokenBudget)&&t.targetTokenBudget>0&&typeof t.estimatedSpendUsd=="number"&&Number.isFinite(t.estimatedSpendUsd)&&t.estimatedSpendUsd>=0)return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??.01,stub:!1};let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:Pr({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},QM=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),Aw=e=>{let t=e.existing??wr(),r=ZM({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return QM(t,r)}});var Ul,tN=l(()=>{"use strict";Fl();Hs();Bm();Ul=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??wr(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=Pr({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var Pw,Fs,rN=l(()=>{"use strict";Hs();Fl();Pw=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=Pr({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:Hl,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:Hl,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,u=s!==null&&s>0&&o>=s*c;return(d||u)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:mn,costControls:{...t,softWarnFired:!0,softWarnMessage:mn}}:null},Fs=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var ww,oN=l(()=>{"use strict";ww=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var E=l(()=>{"use strict";Os();Wm();EO();IP();Rm();FP();RO();IO();OO();MO();OP();NO();Ms();FO();KP();qP();UO();qO();Ar();Wl();VO();XO();ZO();QO();tM();rM();sM();iM();aM();ow();lM();cM();Dm();pM();CM();LM();kM();WM();TM();EM();xM();RM();IM();gw();OM();$m();MM();NM();zM();hw();DM();VM();KM();JM();YM();Hs();Fl();Bm();eN();tN();rN();oN()});var _w=l(()=>{"use strict";ua()});var c6,iN,aN=l(()=>{"use strict";_w();c6=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,iN=e=>{let t=$o(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(c6)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var cN,d6,u6,Vt,p6,m6,lN,qm,dN,g6,ct,uN,pN,mN,xt=l(()=>{"use strict";_w();aN();cN=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),d6=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,u6=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,Vt=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(d6.test(e.errorMessage))return"usage_limit";if(u6.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},p6="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",m6="The writer waited on terminal input and did not return a prompt.",lN=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,qm=e=>{let t=e.trim();if(t.length===0||t.length>=500||!lN.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>lN.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},dN=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},g6=e=>qm(e.stdout)??qm(e.stderr)??(dN(e.replyFile)?qm(e.replyFile):null),ct=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return p6;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?m6:null},uN=e=>{let t=e.trim();return t.length===0?null:ct(t)!==null?t:qm(t)??(dN(t)?t:null)},pN=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],mN=e=>{let t=e.replyFileText?.trim()??"",r=ct([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=g6({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=Vt({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=iN([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=$o(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var gN,Us,Vm=l(()=>{"use strict";xt();gN=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:uN(e.promptText)},Us=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t===void 0?null:gN(t);if(r!==null)return r.trim();for(let o=e.revisions.length-1;o>=0;o-=1){let n=gN(e.revisions[o]);if(n!==null)return n.trim()}return null}});var R,f6,Km,ne,hn,hN,fN,yN,SN,Ae=l(()=>{"use strict";R="manual",f6=["claude-cli","codex","cursor","antigravity"],Km={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ne=e=>e===R?"You":e in Km?Km[e]:e,hn=e=>f6.filter(t=>e.includes(t)),hN=e=>{let t=hn(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},fN=(e,t)=>t===R?R:e.find(r=>r===t)??null,yN=(e,t,r)=>{let o=hn(e),n=fN(o,t),s=fN(o,r);return n===null||s===null?null:{judge:n,improver:s}},SN=(e,t,r)=>{let o=hn(e);return t===null||t.trim()===""?r!==R?r:o[0]??null:t===R?null:o.find(n=>n===t)??null}});var AN,Jm,vw,yn,Cw,ot,_r,ae,Fe=l(()=>{"use strict";AN=g(require("node:fs")),Jm=g(require("node:os")),vw=g(require("node:path"));ms();yn="~",Cw=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,ot=e=>{let t=Jm.default.homedir(),r=Cw(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},_r=e=>{let t=e.trim().length===0?"~":e.trim(),r=it(t),o=vw.default.isAbsolute(r)?Cw(r):Cw(vw.default.resolve(Jm.default.homedir(),r));try{if(!AN.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:ot(o)}},ae=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Jm.default.homedir()});var Kt,Bs=l(()=>{"use strict";Kt='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var Lw,bN,h6,PN,wN,kw=l(()=>{"use strict";E();Ae();Fe();Bs();Lw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bN=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',h6=e=>{let t=bN(e.state),r=`<h2>${Lw(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${Lw(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Kt}</button></div><template>${r}</template></li>`},PN=e=>{let t=e.wizard;if(t===void 0)return"";let r=Fm({status:e.status,wizard:t,writerLabel:ne(e.judgeModel),runnerLabel:ne(e.runnerModel??e.judgeModel),folderDisplay:ot(ae(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(h6).join("")}</ol>`},wN=e=>{let t=e.wizard;if(t===void 0)return"";let r=Fm({status:e.status,wizard:t,writerLabel:ne(e.judgeModel),runnerLabel:ne(e.runnerModel??e.judgeModel),folderDisplay:ot(ae(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${bN(n.state)}<span class="sdlc-pipeline-label">${Lw(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var Rt,_N,vN,CN,Ww=l(()=>{"use strict";E();Rt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_N="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",vN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Rt(_N)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${Rt(i.name)}}}</strong> \u2014 ${Rt(i.description)} (sample: ${Rt(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${Rt(r)}</pre>`,n=Tt(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${Rt(n)}</pre>`;return`${t}${o}${s}`},CN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Rt(_N)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${Rt(n.name)}}}</strong> \u2014 ${Rt(n.description)} (sample: ${Rt(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${Rt(r)}</pre>`;return`${t}${o}`}});var Bl,Tw=l(()=>{"use strict";Bl=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var LN,kN=l(()=>{"use strict";E();LN=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=cn({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=ln({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var Ew,Ym,xw=l(()=>{"use strict";Bs();kN();Ew=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ym=e=>{let t=LN(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${Ew(r)}">${Kt}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${Ew(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${Ew(t)}</pre></template>`}});var Xm,Gs,Rw=l(()=>{"use strict";Tw();xw();Xm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Gs=e=>{let t=Bl(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${Xm(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,u=e.cycle.revisions.map(m=>{let S=m.judgement?.score,f=S==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${S}`,y=m.judgement?.reasons?.trim()??"",p=y.length===0?"":`<br><span class="muted">${Xm(y)}</span>`,A=Ym({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run});if(e.interactive){let b=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${b}> <span class="sdlc-wizard-revision-title">${Xm(f)}</span></label>${A}${p}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Xm(f)}</span>${A}${p}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${u}</ul>`}});var Iw,WN,TN,EN,Ow=l(()=>{"use strict";Iw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WN=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${Iw(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Iw(t.prompt)}</pre></li>`).join("")}</ol>`,TN=e=>WN([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),EN=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${Iw(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${WN(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var Gl,y6,Zm,Mw=l(()=>{"use strict";E();Ow();Gl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),y6=e=>{let t=e.wizard;return t===void 0?"":Et({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},Zm=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=y6(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Gl(n.orchestratorSkill.fileName)}</code> \u2014 ${Gl(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${Gl(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=TN(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${Gl(r)} <span class="muted">${Gl(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var ze,S6,A6,b6,P6,Qm,w6,_6,v6,C6,L6,k6,qs,eg=l(()=>{"use strict";E();kw();Ww();Rw();xw();Mw();ze=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),S6={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},A6=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${ze(o)}</pre>`:`<p class="sdlc-pre-preview mono">${ze(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${ze(o)}</pre></details>`;return`<h2>${ze(e)}</h2>${n}`},b6=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=Tt(t).trim(),n=Et({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!T(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${A6("What is being evaluated",i)}`},P6=(e,t)=>{let r=e.wizard;if(r===void 0||T(e.status))return"";let o=S6[t];return o===void 0||r.phase!==o?"":wN(e)},Qm=(e,t,r)=>{let o=P6(e,t),n=t==="wizard-2"?b6(e):"";return`${o}${n}${r}`},w6=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},_6=e=>{let t=e.wizard;return t===void 0?"":vN(t)},v6=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${ze(a)}</span>`,d=Ym({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${ze(s)}${i}</span>${d}${c}</li>`}).join("")}</ul>`,C6=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Gs({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=w6(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${v6(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=Et({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${ze(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${ze(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},L6=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${ze(n.title)}</strong> <span class="muted">(${ze(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${ze(o.title)}</strong>${n}${ze(s)}${Zm(e,o)}</li>`}).join("")}</ul>`},k6=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${ze(i)}</span> <strong>${ze(n.title)}</strong>${ze(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${ze(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Gs({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},qs=(e,t)=>{switch(t){case"wizard-1":return Qm(e,t,_6(e));case"wizard-2":return Qm(e,t,C6(e));case"wizard-3":return Qm(e,t,L6(e));case"wizard-4":return Qm(e,t,k6(e));default:return""}}});var W6,T6,xN,RN,IN=l(()=>{"use strict";E();Vm();xt();eg();W6=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},T6=e=>{let t=e.goal.trim();return t.length===0?null:t},xN=(e,t,r,o,n)=>{let s=ct(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},RN=(e,t)=>{let r=T6(e);if(t.id.startsWith("wizard-")){let s=qs(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=Cl(e,t);if(s!==null){let a=Us(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=se(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:xN(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:W6(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:xN(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var Sn,ON,MN=l(()=>{"use strict";Sn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ON=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${Sn(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Sn(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${Sn(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${Sn(n)}</h2><pre class="mono">${Sn(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${Sn(e.goal)}</dd></div></dl>`;return`<h2>${Sn(e.title)}</h2>${i}${t}${r}${o}${s}`}});var E6,NN,ql,Nw,tg=l(()=>{"use strict";E();E6=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),NN=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||T(e.status))return null;let r=kt(t);return r<0||r>3?null:`wizard-${r+1}`},ql=(e,t)=>E6.has(t)?NN(e)===t:!1,Nw="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var x6,rg,zw=l(()=>{"use strict";x6='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',rg=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${x6}</button>`});var An,og=l(()=>{"use strict";E();An=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Pl({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:_l(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var R6,zN,I6,Dw,DN,O6,M6,N6,z6,jN,$N=l(()=>{"use strict";E();og();R6={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},zN=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},I6=e=>R6[e]??null,Dw=(e,t)=>{let r=e.wizard,o=I6(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=kt(r);return o<n||o===n},DN=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},O6=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:Tt(t).trim();return o.length===0?null:xl({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:zN(e,"generalize")})},M6=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=An(e);return n===null?null:so({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=DN(e)?.promptText.trim()??Et({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:cn({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},N6=e=>{let t=e.wizard;if(t===void 0)return null;let r=Et({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:Rl({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:zN(e,"separate")})},z6=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=br(t),s=un(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=An(e);return c===null?null:so({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=DN(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||T(e.status)&&i?.judgement!==null)?ln({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):Il({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:dn(t,r).output,moduleTitle:o.title})},jN=(e,t)=>{if(!Dw(e,t))return null;switch(t){case"wizard-1":return O6(e);case"wizard-2":return M6(e);case"wizard-3":return N6(e);case"wizard-4":return z6(e);default:return null}}});var D6,ng,jw=l(()=>{"use strict";E();D6=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},ng=(e,t)=>{let r=e.wizard,o=D6(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=kt(r);return o<n?"done":o===n&&T(e.status)&&e.status==="failed"?"failed":o<=n&&T(e.status)?"done":"pending"}});var j6,Vs,sg=l(()=>{"use strict";Bs();$N();jw();j6=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Vs=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(ng(e,t)==="pending")return""}else if(!Dw(e,t))return"";let o=jN(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Kt}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${j6(o)}</pre></template>`}});var bn,vr,Ks=l(()=>{"use strict";bn=e=>e.toLocaleString("en-US"),vr=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var Jt,$6,HN,ig,FN,UN,ag=l(()=>{"use strict";E();IN();MN();tg();zw();Bs();Vm();kw();sg();Ks();Jt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$6=(e,t)=>{let r=Cl(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?vr(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${bn(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Jt(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${Jt(r)}</span>`:"",d=ON(RN(t,e)),u=t.wizard!==void 0&&t.wizard.phase==="complete"&&T(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${Jt(e.id)}"`:"",m=ql(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${Jt(Nw)}"><input type="hidden" name="cycleId" value="${Jt(t.id)}"><input type="hidden" name="wizardStepId" value="${Jt(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",S=e.state==="active"&&e.id.startsWith("wizard-")?PN(t):"",f=o?"failed":e.state,y=o?Us(t):null,p=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Kt}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${Jt(y)}</pre></template>`:"",A=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?Vs(t,e.id):"";return`<li class="sdlc-node sdlc-node-${f}" data-sdlc-step-id="${Jt(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${u} data-sdlc-node>${n}<span class="sdlc-node-label">${Jt(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${A}${p}</div></div>${S}<template>${d}</template></li>`},HN=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>$6(r,t)).join("")}</ol>`,ig=e=>`<div class="sdlc-score" aria-label="What the score means">${vl(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Jt(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,FN=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${rg({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,UN=`<script>
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
</script>`});var lg,cg,dg,BN,$w=l(()=>{"use strict";lg="support-reply",cg="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",dg=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),BN=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var ug,GN,qN=l(()=>{"use strict";E();ag();$w();ug=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GN=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${ig(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${ug(cg)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${ug(dg)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${ug(BN)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${ug(lg)}">Run this sample</a>
      </div>
    </section>`});var Hw,pg,H6,VN,KN=l(()=>{"use strict";Hw=g(require("node:fs")),pg=g(require("node:path")),H6=e=>pg.default.join(pg.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),VN=(e,t)=>{let r=H6(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;Hw.default.mkdirSync(pg.default.dirname(r),{recursive:!0}),Hw.default.appendFileSync(r,o,"utf8")}});var Js,JN,F6,YN,U6,XN,Yt,K,ZN,z,nt=l(()=>{"use strict";Js=g(require("node:fs")),JN=g(require("node:path"));E();KN();F6=e=>e.wizard===void 0?e:{...e,wizard:ZP(e.wizard)},YN=new Set,U6=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),XN=(e,t)=>{Js.default.mkdirSync(JN.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;Js.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),Js.default.renameSync(r,e)},Yt=e=>{if(!Js.default.existsSync(e))return[];try{let t=JSON.parse(Js.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(U6).map(F6):[]}catch{return[]}},K=(e,t)=>Yt(e).find(r=>r.id===t)??null,ZN=(e,t)=>{YN.add(t);let r=Yt(e).filter(o=>o.id!==t);XN(e,r)},z=(e,t)=>{if(YN.has(t.id))return;let r=Yt(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];XN(e,o),VN(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var Ys,Xt,Vl,QN,mg,B6,ez,tz,rz,Fw=l(()=>{"use strict";Ys=g(require("node:fs")),Xt=g(require("node:path")),Vl=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},QN=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),mg=(e,t)=>{let r=Vl(e);return r.length>0?r:Vl(t)},B6=e=>{let t=mg(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${QN(o)}`,...n.length>0?[`description: ${QN(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},ez=e=>`.cursor/skills/${e}/SKILL.md`,tz=(e,t)=>{let r=Vl(t);if(r.length===0)return!1;let o=Xt.default.resolve(e),n=Xt.default.resolve(o,".cursor","skills"),s=Xt.default.resolve(o,ez(r));return s.startsWith(`${n}${Xt.default.sep}`)?Ys.default.existsSync(s):!1},rz=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(mg(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Xt.default.resolve(e.workingDirectory);try{if(!Ys.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=B6({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=ez(r.slug),n=Xt.default.resolve(t,".cursor","skills"),s=Xt.default.resolve(t,o);if(!s.startsWith(`${n}${Xt.default.sep}`))return{ok:!1,errorCode:"path"};if(Ys.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Ys.default.mkdirSync(Xt.default.dirname(s),{recursive:!0}),Ys.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var G6,oz,nz,sz=l(()=>{"use strict";E();nt();Fe();xt();Fw();G6=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,oz=e=>{let t=e.get("savedSkill");return t!==null&&G6.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},nz=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=K(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!T(r.status))return{kind:"redirect",location:o("skillError=working")};let n=se(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||ct(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=rz({workingDirectory:ae(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var ao,Kl=l(()=>{"use strict";E();ao=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=yw(t),n=Aw({moduleCount:o.length,existing:e.costControls});return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:n,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:$l(r.variables)},updatedAt:new Date().toISOString()}}});var lo,Jl=l(()=>{"use strict";lo=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var Uw=l(()=>{"use strict";wt();ll();ua()});var Bw,iz,Gw,az,lz=l(()=>{"use strict";Bw={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},iz=e=>e.exitCode===null&&e.signalCode===null,Gw=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!iz(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!iz(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),az=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),Gw(e).then(s=>{r({...Bw,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var cz,Yl,dz,qw,q6,Kw,Jw,V6,K6,J6,uz,Y6,Vw,pz,Xl,mz,X6,Z6,Ve,Pn=l(()=>{"use strict";cz=require("node:child_process"),Yl=g(require("node:fs")),dz=g(require("node:os")),qw=g(require("node:path"));Uw();lz();xt();q6=["claude-cli","codex","cursor","antigravity"],Kw=18e4,Jw=6e5,V6=12e4,K6=9e5,J6="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",uz="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",Y6="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",Vw=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},pz=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=Vw(process.env[uz])??Math.max(r,Jw));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:Vw(process.env[Y6])??K6;return Math.min(o,Math.max(V6,r))},Xl=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?Vw(process.env[uz])??Jw:Kw,mz=e=>`The writer timed out after ${e}ms.`,X6=e=>q6.includes(e),Z6=e=>e===!0||process.env[J6]==="1",Ve=e=>new Promise(t=>{if(e.signal?.aborted){t(Bw);return}if(Z6(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!X6(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=Ft(r,e.prompt,ue({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!Yl.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:Kw,s=qw.default.join(Yl.default.mkdtempSync(qw.default.join(dz.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=pN({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},u=(0,cz.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),m=S=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(S))};az(u,e.signal,m,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",Gw(u).then(S=>{m({ok:!1,errorMessage:mz(n),errorKind:"writer_timeout",killSignal:S})})},n),u.stdout.on("data",S=>{a.push(Buffer.from(S))}),u.stderr.on("data",S=>{c.push(Buffer.from(S))}),u.on("error",()=>m({ok:!1,errorMessage:"The writer failed to start."})),u.on("close",()=>{if(d.settled)return;let S=Yl.default.existsSync(s)?Yl.default.readFileSync(s,"utf8"):null,f=mN({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:S});if(f.ok&&d.stopReason!=="abort"){m(f);return}d.stopReason===null&&m(f)})})});var Q6,Zl,Yw=l(()=>{"use strict";E();Ks();Q6=e=>{if(e.wizard!==void 0){let t=Ml(e.wizard),r=vr(e);return(t??0)+r}return vr(e)},Zl=e=>{let t=Pw({costControls:e.costControls,spentTokens:Q6(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var gz,eJ,Ql,gg,fg=l(()=>{"use strict";E();Ae();Yw();gz=e=>e===R?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},eJ=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Ql=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=HP({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:gz(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?ww({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:_l(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=eJ(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?Zl({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):Zl({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},gg=(e,t,r=null)=>{let o=Im({raw:t,judge:gz(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var hg,Xw=l(()=>{"use strict";hg=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var yz,yg,Sg,fz,hz,Zw,tJ,Sz,Qw,rJ,Az,oJ,nJ,bz,Pz=l(()=>{"use strict";yz=require("node:child_process"),yg=g(require("node:fs")),Sg=g(require("node:path"));Bp();E();fz=4e3,hz=12e3,Zw=(e,t)=>{let r=(0,yz.spawnSync)("git",[...t],{cwd:e,env:to(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},tJ=e=>Zw(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",Sz=e=>{let t=Zw(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},Qw=(e,t)=>{let r=Sg.default.resolve(e,t),o=Sg.default.relative(e,r);if(o.startsWith("..")||Sg.default.isAbsolute(o)||!yg.default.existsSync(r)||!yg.default.statSync(r).isFile())return null;let n=yg.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>fz?`${n.slice(0,fz)}
\u2026truncated`:n},rJ=e=>e.length>hz?`${e.slice(0,hz)}
\u2026truncated`:e,Az=e=>{let t=BP(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,Qw(e.workingDirectory,n)])),o=tJ(e.workingDirectory);return{git:o,status:o?Sz(e.workingDirectory):{},files:r,paths:t}},oJ=(e,t)=>{let r=Zw(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=Qw(e,t);return o===null?`${t} is missing.`:o},nJ=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",bz=e=>{let t=e.before.git?Sz(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=Qw(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>oJ(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:nJ(e.before.git,e.before.paths.length>0),evidence:rJ(i.join(`

`))}}});var r_,U,o_,Te,wz,sJ,iJ,_z,Xs,vz,Zs,aJ,lJ,ec,e_,t_,cJ,Cz,dJ,uJ,pJ,Lz,mJ,kz,Wz,gJ,fJ,Tz,Ez=l(()=>{"use strict";r_=require("node:child_process"),U=g(require("node:fs")),o_=g(require("node:os")),Te=g(require("node:path"));Bp();wz=8e6,sJ=16e6,iJ=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],_z=(e,t)=>{let r=(0,r_.spawnSync)("git",[...t],{cwd:e,env:to(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Xs=(e,t)=>(0,r_.spawnSync)("git",[...t],{cwd:e,env:to(),timeout:8e3}).status===0,vz=e=>{let t=_z(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},Zs=(e,t)=>{let r=Te.default.resolve(e,t),o=Te.default.relative(e,r);return o.startsWith("..")||Te.default.isAbsolute(o)?null:r},aJ=(e,t)=>{let r=Zs(e,t);if(r===null||!U.default.existsSync(r))return null;let o=U.default.statSync(r);return!o.isFile()||o.size>wz?null:U.default.readFileSync(r)},lJ=(e,t,r)=>{let o=Zs(e,t);o!==null&&(U.default.mkdirSync(Te.default.dirname(o),{recursive:!0}),U.default.writeFileSync(o,r))},ec=(e,t)=>{let r=Zs(e,t);r===null||!U.default.existsSync(r)||U.default.rmSync(r,{recursive:!0,force:!0})},e_=(e,t)=>Xs(e,["cat-file","-e",`HEAD:${t}`]),t_=e=>{let t=_z(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},cJ=e=>Te.default.resolve(e)!==Te.default.resolve(o_.default.homedir()),Cz=e=>{if(!U.default.existsSync(e))return 0;let t=U.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?U.default.readdirSync(e).reduce((r,o)=>r+Cz(Te.default.join(e,o)),0):0},dJ=(e,t,r)=>{let o=Zs(e,r);if(o===null||!U.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(Cz(o)>sJ)return{relativePath:r,existed:!0,copyDir:null};let n=Te.default.join(t,"cache",r);return U.default.mkdirSync(Te.default.dirname(n),{recursive:!0}),U.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},uJ=400,pJ=32e6,Lz=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!U.default.existsSync(s)))for(let i of U.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=Te.default.join(s,i),c=U.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>wz)){if(t.length>=uJ||r+c.size>pJ){o=!1;return}r+=c.size,t.push(Te.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},mJ=(e,t,r)=>{let o=Zs(e,r);if(o===null||!U.default.existsSync(o))return null;let n=aJ(e,r);if(n===null)return"skip";let s=Te.default.join(t,"files",r);return U.default.mkdirSync(Te.default.dirname(s),{recursive:!0}),U.default.writeFileSync(s,n),s},kz=e=>{let t=U.default.mkdtempSync(Te.default.join(o_.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?vz(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:Lz(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,mJ(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?t_(e.workingDirectory):null,isolateCaches:cJ(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:iJ.map(i=>dJ(e.workingDirectory,t,i))}},Wz=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){ec(e.workingDirectory,t);return}lJ(e.workingDirectory,t,U.default.readFileSync(r))}},gJ=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?Wz(e,t):e_(e.workingDirectory,t)?Xs(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):ec(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&e_(e.workingDirectory,t)&&Xs(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!e_(e.workingDirectory,t)&&Xs(e.workingDirectory,["reset","-q","HEAD","--",t])},fJ=(e,t)=>{let r=Zs(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){ec(e.workingDirectory,t.relativePath),U.default.mkdirSync(Te.default.dirname(r),{recursive:!0}),U.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){ec(e.workingDirectory,t.relativePath);return}if(U.default.existsSync(r))for(let o of U.default.readdirSync(r)){let n=Te.default.join(r,o);U.default.statSync(n).mtimeMs>=e.startedMs-1e3&&U.default.rmSync(n,{recursive:!0,force:!0})}}}},Tz=e=>{try{if(e.git){if(t_(e.workingDirectory)!==e.head&&(!(e.head===null?Xs(e.workingDirectory,["update-ref","-d","HEAD"]):Xs(e.workingDirectory,["reset","--hard",e.head]))||t_(e.workingDirectory)!==e.head))throw new Error("head");let r=vz(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))gJ(e,o)}else{if(e.complete)for(let t of Lz(e.workingDirectory).paths)e.files[t]===void 0&&ec(e.workingDirectory,t);for(let t of Object.keys(e.files))Wz(e,t)}for(let t of e.caches)fJ(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{U.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Ag,bg,hJ,yJ,SJ,AJ,bJ,xz,PJ,Rz,Iz=l(()=>{"use strict";E();fg();Xw();Pz();Ez();Ae();Fe();xt();Pn();Ag=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),bg=e=>({...e,status:"stopped",errorMessage:an,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),hJ=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),yJ=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==R?t:e.improverModel!==R?e.improverModel:null}return e.judgeModel!==R?e.judgeModel:e.improverModel!==R?e.improverModel:null},SJ=async e=>{let t=ae(e.cycle),r=Az({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=kz({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Il({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:dn(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):wl({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=pz({promptText:e.revision.promptText,isModuleRun:i}),c=Xl({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},u=await Ve({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),m=u.ok?bz({workingDirectory:t,before:r,writerReply:u.text}):null,S=Tz(o),f={...e.cycle,revisions:e.cycle.revisions.map(y=>y.roundNumber===e.cycle.currentRound?d:y)};return u.ok?!S.ok||m===null?{ok:!1,cycle:Ag(f,S.ok?"Could not put the folder back after the run.":S.errorMessage)}:{ok:!0,cycle:f,run:{output:u.text.trim(),tokens:u.tokens,delayMs:Date.now()-n,lookedAt:m.lookedAt,evidence:m.evidence}}:u.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:bg(f)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Ag(f,u.errorMessage,Vt(u))})},AJ=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:SJ({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),bJ=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),xz=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Ve({writerAgent:e.reviewer,workingDirectory:ae(e.cycle),prompt:UP({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:bg(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},PJ=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===R)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Ve({writerAgent:t.judgeModel,workingDirectory:ae(t),prompt:cn({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Ql(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?bg(o):(e.onWriterFailure?.(t.judgeModel),Ag(o,n.errorMessage,Vt(n)))},Rz=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return PJ(e);let o=yJ(t),n=await AJ({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?hJ(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===R){let u=await xz({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return u.kind==="stopped"?u.cycle:{...bJ(s,u.text),judgePhase:void 0}}let i=await Ve({writerAgent:t.judgeModel,workingDirectory:ae(t),prompt:ln({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?bg(s):(e.onWriterFailure?.(t.judgeModel),Ag(s,i.errorMessage,Vt(i)));let a=await xz({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Ql(s,i.text,c);return hg(d,a.text)}});var Pg,wJ,_J,n_,Oz=l(()=>{"use strict";E();fg();Iz();og();xt();Ae();Yw();Fe();Pn();Pg=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),wJ=e=>({...e,status:"stopped",errorMessage:an,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),_J=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?wJ(e):(n?.(r),Pg(e,t.errorMessage,Vt(t))),n_=async(e,t,r,o)=>{let n=Zl(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return Pg(e,"This round has no prompt.");if(e.status==="judging")return Rz({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return Pg(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===R)return e;let i=An(e);if(i===null)return Pg(e,"The improver needs the score and the reason.");let a=await Ve({writerAgent:e.improverModel,workingDirectory:ae(e),prompt:so({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:Xl()}),c=_J(e,a,e.improverModel,r,t);return c!==null?c:gg(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var tc,s_,vJ,Nz,Mz,CJ,LJ,wg,zz,Dz,kJ,WJ,wn,jz,$z,rc=l(()=>{"use strict";E();Kl();Jl();Ae();Fe();xt();Pn();Oz();Tw();tc=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),s_=(e,t,r)=>e.wizard===void 0||t===null?tc(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},vJ=e=>{let t=Vt(e);return cN(e)||t==="usage_limit"||t==="action_required"},Nz=(e,t,r)=>vJ(r)?tc(e,r.errorMessage,Vt(r)):s_(e,t,r.errorMessage),Mz=e=>{let t=e.wizard;return t===void 0||Bl(e).length===0?e:{...e,wizard:js({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},CJ=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",LJ=e=>{let t=e.wizard;if(t===void 0)return e;let r=Ol({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:js({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},wg=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),zz=e=>e.judgeModel!==R?e.judgeModel:e.improverModel!==R?e.improverModel:null,Dz=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},kJ=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=zz(e);if(n===null)return tc(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Tt(o),i=xl({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:Dz(e,"generalize")}),a=await Ve({writerAgent:n,prompt:i,workingDirectory:ae(e),signal:t});if(!a.ok)return r?.(n),Nz(e,"generalize",a);try{let c=uw(a.text),d=js({wizard:{...o,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:$l(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),u={...e,wizard:d};return Nl(d)?wn({...u,wizard:{...d,gate:null}}):wg(u,"generalize")}catch(c){return s_(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},WJ=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=zz(e);if(n===null)return tc(e,"Choose a writer to suggest splits.");let s=Et({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Rl({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:Dz(e,"separate")}),a=await Ve({writerAgent:n,prompt:i,workingDirectory:ae(e),signal:t});if(!a.ok)return r?.(n),Nz(e,"separate",a);try{let c=pw(a.text),d=tw(c,o.variables),u=js({wizard:{...o,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:u};return Dl(d)?ao(m,d[0]):wg(m,"separate")}catch(c){return s_(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},wn=e=>{let t=e.wizard;if(t===void 0)return e;let r=Tt(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},jz=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return tc(e,"This module is missing.");let n=br(r),s=un(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==R?e.runnerModel:e.judgeModel!==R?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:oe(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},$z=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return n_(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return kJ(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return WJ(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await n_(e,t,r,o);if(T(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Bl(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=se(s.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??0,reasons:S.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&zl({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let u=Mz(wg(a,i));return lo(u)}let c=wg(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let u=nw({wizard:{...c.wizard,modules:c.wizard.modules.map((m,S)=>S===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:CJ(s.status)});return{...c,wizard:u}})():c;return i==="evaluate"?Mz(d):LJ(d)}return s}return n.phase==="complete",e}});var Qs,_g=l(()=>{"use strict";E();Ae();Qs=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:lw(r,e.judgeModel===R),updatedAt:new Date().toISOString()}}});var ei,vg=l(()=>{"use strict";ei=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var dt,Hz,TJ,Fz=l(()=>{"use strict";E();Fe();vg();xt();Fw();dt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hz=e=>{if(!T(e.status))return"";let t=se(e.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??null,reasons:S.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=ct(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${dt(t.reasons.trim())}</p>`,i=e.status==="passed",a=ei(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${dt(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${dt(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',u=n!==null?`<div class="alert-error">${dt(n)}</div>`:i?TJ({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:ae(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${dt(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${dt(t.promptText)}</pre></details>`,m=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${m}</h2>${d}${o}${s}${u}</section>`},TJ=e=>{let t=e.sourceSkill?.fileName??Vl(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=mg(t,r),s=n.length>0&&tz(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${dt(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${dt(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${dt(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${dt(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${dt(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${dt(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var Uz,Bz=l(()=>{"use strict";Uz=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var Gz,EJ,Cg,Ke,Lg,i_=l(()=>{"use strict";E();Ae();Bz();Vm();xt();vg();Gz=["Generalize","Evaluate","Separate","Optimize modules"],EJ=e=>{let t=kt(e),r=t>=0&&t<Gz.length?Gz[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},Cg=(e,t)=>{let r=Us(e),o=r===null?null:Uz(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},Ke=(e,t)=>({title:e,detail:t,replyPreview:null}),Lg=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:null}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!T(e.status)){let t=e.judgeModel;return Ke(`${ne(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!T(e.status)){let t=e.judgeModel;return Ke(`${ne(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===R?Ke(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?Ke(`${ne(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):Ke(`${ne(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===R){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==R?Ke(`${ne(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):Ke(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return Ke(`${ne(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=oe(t);return Ke(`${ne(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return Ke(`${ne(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=oe(t);return Ke(`${ne(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return Ke(`${ne(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===R){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return Ke("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return Ke(`${ne(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>ct(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=Q(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||T(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?Cg(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=ei(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?Cg(e,{title:`${EJ(r)}${s}`,detail:t.length>0?t:n}):Cg(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(T(e.status)){let t=e.errorMessage?.trim()??"";return Cg(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var Zt,oc=l(()=>{"use strict";Ae();Zt=e=>{if(e.status==="improving"&&e.improverModel===R)return!0;if(e.status!=="judging"||e.judgeModel!==R)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===R}});var qz,Vz=l(()=>{"use strict";qz=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var co,xJ,Kz,Jz=l(()=>{"use strict";E();co=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xJ=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${co(r)}</p>`},Kz=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${co(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${co(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${co(a)}.</p>`}<pre class="mono">${co(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${io(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${co(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let u=e.avoid?.trim()??"",m=u.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${co(u)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${xJ(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${co(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var nc,RJ,Yz,Xz=l(()=>{"use strict";E();xt();nc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RJ=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=ct(t.promptText),n=t.judgement?.reasons?`<p class="muted">${nc(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${nc(i)}.</p>`}<pre class="mono">${nc(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${io(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,u=o===null?`<pre class="mono">${nc(d)}</pre>`:`<div class="alert-error">${nc(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${u}</article>`},Yz=e=>e.revisions.map(t=>RJ(e,t)).join("")});var Zz,Qz=l(()=>{"use strict";E();Zz=e=>{if(T(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Qt,IJ,a_,OJ,MJ,NJ,zJ,eD,tD,l_=l(()=>{"use strict";Qz();Qt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IJ="Stop this run? Writers will stop and the best prompt is kept.",a_="End the wizard? Writers will stop and progress from finished steps is kept.",OJ="Skip this module and pause at the step gate?",MJ=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${Qt(IJ)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Qt(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,NJ=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${Qt(a_)}"><input type="hidden" name="cycleId" value="${Qt(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,zJ=e=>{let t=Qt(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Qt(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${Qt(OJ)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${Qt(a_)}">End wizard</button>
    </form>
  </div>`},eD=e=>{let t=Zz(e);return t==="none"?"":t==="legacy_stop"?MJ(e.id):t==="wizard_end_only"?NJ(e.id):zJ(e)},tD=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=Qt(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${Qt(a_)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var rD,oD=l(()=>{"use strict";E();Ks();rD=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=Q(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${bn(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${bn(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${oe(r)}`}return""}});var DJ,jJ,nD,$J,sD,iD=l(()=>{"use strict";E();oD();jw();eg();sg();DJ=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',jJ=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',nD=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$J=(e,t,r)=>{let o=qs(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=rD(e,t),i=ng(e,t),a=DJ(i),c=jJ(i),d=Vs(e,t,{forOutcomeSummary:!0}),u=`${a}<span class="sdlc-wizard-outcome-step-title">${nD(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${nD(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",S=i==="failed"&&t!=="wizard-4"?" open":"",f=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${f}"${m}${S}><summary aria-controls="${f}-body">${u}</summary><div class="sdlc-wizard-outcome-step-body" id="${f}-body">${o}</div></details>`},sD=e=>{let t=e.wizard;if(t===void 0||!T(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>$J(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var aD,lD,cD=l(()=>{"use strict";aD=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lD=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${aD(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${aD(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var c_,dD,d_=l(()=>{"use strict";c_=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,dD=(e,t)=>{if(c_(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var uD,pD=l(()=>{"use strict";uD=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var kg,mD,gD=l(()=>{"use strict";E();d_();d_();pD();kg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mD=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=Q(t),o=oe(t),n=r.terminalStatusSuggestion==="passed"?"":uD(r,o),s=o-10,i=r.rows.map((c,d)=>{let u=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,f=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=u===void 0?c.status:dD(u,o),p=u!==void 0&&c_(u,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':y==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':y==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':kg(y);return`<tr${f}><td>${kg(c.title)}</td><td>${kg(m)}</td><td>${c.tokens??"\u2014"}</td><td>${p}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${kg(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var _n,Wg,u_=l(()=>{"use strict";_n=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Wg=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${_n(r.fileName)}</code> \u2014 ${_n(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${_n(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${_n(i.name)}</strong> <code>.cursor/skills/${_n(i.fileName)}/SKILL.md</code></p><p class="muted">${_n(i.description)}</p><p>${_n(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var HJ,fD,hD=l(()=>{"use strict";E();cD();gD();u_();HJ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fD=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!T(e.status)||t.modules.length===0)return"";let r=mD(e),o=lD(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=Q(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${HJ(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${Wg(e)}${a}${r}${o}</section>`}});var pe,Tg=l(()=>{"use strict";E();pe={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",estimatedSpendLabel:"Estimated spend (USD)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",rateLabel:"Rate (USD / 1k tokens)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var Eg,p_=l(()=>{"use strict";Eg=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var yD,SD=l(()=>{"use strict";Tg();p_();yD=e=>{let t=Eg({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:pe.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var Cr,sc=l(()=>{"use strict";Cr=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var Lr,xg,m_=l(()=>{"use strict";E();ag();Fz();i_();oc();Vz();og();Jz();Xz();l_();iD();hD();Ks();SD();Fe();sc();Lr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xg=e=>{let t=!T(e.status)&&e.status!=="wizard_paused"&&!Zt(e),r=Lg(e),o=HN(JP(qz(e)),e),n=T(e.status)?"":eD(e),s=sD(e),i=fD(e),a=Hz(e),c=e.errorMessage===null?"":`<div class="alert-error">${Lr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",u=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?Q(e.wizard):null,S=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,f=!t&&e.wizard!==void 0&&T(e.status)&&(e.wizard.phase==="complete"||Q(e.wizard).passedModuleCount>0),y=f?S?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",p=f&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Lr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",A=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${Lr(r.replyPreview)}</pre>`,b=r.detail.length===0&&p.length===0&&A.length===0||r.detail.length===0&&A.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Lr(r.detail)}${u}</p>`}${A}</div>`,h=e.revisions.find(Ao=>Ao.roundNumber===e.currentRound),w=e.status==="improving"?An(e):null,_=vr(e),C=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),L=Zt(e)?Kz({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:w?.promptText??h?.promptText??"",score:w?.score??h?.judgement?.score??null,reasons:w?.reasons??h?.judgement?.reasons??null,avoid:w?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:h?.run??null,minJudgeScore:C?1:0}):"",k=e.wizard!==void 0&&e.wizard.phase==="complete"&&T(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!k&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?oe(e.wizard):e.passScore,M=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${ig(I)}</div>`:"",F=e.status==="failed"?yD({status:e.status,errorKind:e.errorKind}):null,q=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':T(e.status)?F!==null?`<span class="${F.badgeClass}">${F.badgeLabel}</span>`:k&&m!==null&&!S?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",B=t?d:f?S?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',Ue=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Lr(ot(ae(e)))}</li>`:"",_>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${bn(_)} so far</li>`:""].filter(Ao=>Ao.length>0),$=Ue.length===0?"":`<ul class="sdlc-run-meta">${Ue.join("")}</ul>`,we=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,Hr=k?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,nr=k?"":M.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${Hr}</div>`:`<div class="sdlc-run-grid">${Hr}${M}</div>`,_L=Yz(e),rG=e.wizard!==void 0&&T(e.status)&&e.revisions.every(Ao=>Ao.roundNumber===0&&(Ao.judgement===void 0||Ao.judgement===null)),oG=_L.length===0||rG?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${_L}</div></section>`,nG=`<p class="sdlc-run-goal" title="${Lr(e.goal.trim())}">${Lr(Cr(e.goal))}</p>`,sG=k?`${c}${i}${s}${L}${a}`:`${c}${nr}${L}${s}${a}`,iG='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',aG=k?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Lr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${iG}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${q}</div>${nG}<div class="sdlc-run-activity${y}"${f?' role="status"':""}><div class="sdlc-run-activity-icon">${B}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Lr(r.title)}</h2>${b}${p}${aG}</div></div>${$}${we}</header>${sG}</section>${oG}`}});var AD,bD=l(()=>{"use strict";E();Jl();AD=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!zl({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:lo(e)}});var PD,wD=l(()=>{"use strict";E();rc();PD=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Nl(t)?e:wn({...e,wizard:{...t,gate:null}})}});var _D,vD=l(()=>{"use strict";E();Kl();_D=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Dl(t.splitOptions))return e;let r=t.splitOptions[0];return ao(e,r)}});var FJ,vn,Rg=l(()=>{"use strict";bD();wD();vD();nt();FJ=e=>{let t=PD(e),r=AD(t);return _D(r)},vn=(e,t)=>{let r=FJ(t);return r!==t?(z(e,r),r):t}});var CD,kr,ic=l(()=>{"use strict";E();CD=e=>rt.indexOf(e),kr=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||T(e.status)?rt.length:t.gate!==null?CD(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?CD(t.phase):null}});var LD,kD=l(()=>{"use strict";LD=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Cn,WD,TD=l(()=>{"use strict";E();kD();Cn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WD=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=dn(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Cn(LD(o))}</pre></div>`:"",s=pn(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=br(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),u=Um(c),m=i[c]??"",S=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,f=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Cn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Cn(u)}">${Cn(S)}</label>
        ${f}
        <input class="input" type="text" id="${Cn(u)}" name="${Cn(u)}" value="${Cn(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var ED,xD=l(()=>{"use strict";ED={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var ac,UJ,le,uo=l(()=>{"use strict";xD();Bs();ac=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UJ=e=>{let t=ED[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${ac(t.title)}" aria-describedby="${r}" aria-expanded="false">${Kt}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${ac(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${ac(t.example)}</span></span></button>`},le=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${ac(r)}"`}>${ac(e)}</span>${UJ(t)}</span>`});var It,RD,ID,OD=l(()=>{"use strict";E();Tg();uo();It=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RD=e=>{let t=e.costControls;if(t===void 0||Fs(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??Pr({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${It(pe.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${It(t.softWarnMessage??mn)}</p>`:"",d=e.wizard?.modules.length??0,u=d>0?`<p class="muted">Step 4 will optimize ${d} module${d===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${It(pe.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${It(pe.confirmLede)}</p>
  ${u}
  ${a}
  ${c}
  <p class="muted sdlc-cost-confirm-required" hidden>${It($s)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${It(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${It(pe.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${It(pe.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${It(pe.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
    </dl>
    <div class="field">
      ${le(pe.confirmedTokenLabel,"confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${s}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${le(pe.confirmedSpendLabel,"confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${i}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${It(pe.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${It(pe.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},ID=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!Fs(r)}});var lc,MD,ND=l(()=>{"use strict";E();Ww();TD();Rw();l_();u_();Mw();OD();lc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),MD=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(ID(e))return RD(e);let n=oe(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?CN(r):"",a=o==="evaluate"?Wg(e):"",c=o==="evaluate"?Gs({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",u=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(x=>{let I=x.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',M=x.recommended?' <span class="sdlc-badge">Recommended</span>':"",F=r.selectedSplitOptionId===x.id||r.selectedSplitOptionId===null&&x.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${lc(x.id)}" required${F}> <strong>${lc(x.title)}</strong>${I}${M}</label>${Zm(e,x)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],f=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=m?.title??"Module",p=m?.prompt??"",A=m?.status==="pending",b=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${lc(y)}</p>${A?WD({cycle:e,modulePrompt:p}):""}<p class="muted">Test run prompt preview: ${lc(un(p,br(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${Gs({cycle:e,interactive:!1,caption:A?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",h=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":A?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",w=Ml(r),_=w===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${w}</p>`,C=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",L=t?.active===!0?" sdlc-wizard-gate-active":"",k=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${C}"`:"";return`<section class="card sdlc-wizard-gate${L}"${k}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${h}</p>
    ${_}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${lc(e.id)}">
    ${i}
    ${a}
    ${c}
    ${u}
    ${b}
      <div class="field">
        <label class="field-label" for="wizardFeedback">Feedback to rerun this step</label>
        <textarea class="input textarea" id="wizardFeedback" name="wizardFeedback" rows="3" placeholder="What should change?"></textarea>
      </div>
      <div class="field">
        <label class="field-label" for="wizardStepInstructions">Extra instructions (optional)</label>
        <textarea class="input textarea" id="wizardStepInstructions" name="wizardStepInstructions" rows="2" placeholder="Added to this step only when you rerun with feedback."></textarea>
      </div>
      <div class="sdlc-wizard-actions">
        <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue"${f}>Continue</button>
        <button class="btn btn-secondary" type="submit" name="intent" value="wizard-feedback-rerun" formnovalidate>Rerun with feedback</button>
      </div>
    </form>
    ${tD(e)}
  </section>`}});var BJ,zD,DD=l(()=>{"use strict";E();sg();BJ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zD=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||T(e.status))return"";let r=(o,n)=>{let s=Vs(e,o);return`<h2 class="sdlc-wizard-active-head">${BJ(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var g_,jD,$D,po,HD,ti=l(()=>{"use strict";E();nt();g_=new Map,jD=e=>{let t=new AbortController;return g_.set(e,t),t.signal},$D=e=>{g_.delete(e)},po=e=>{g_.get(e)?.abort()},HD=(e,t)=>{let r=K(e,t);return r===null||r.wizard!==void 0?!1:(T(r.status)||(z(e,{...r,status:"stopped",errorMessage:an,updatedAt:new Date().toISOString()}),po(t)),!0)}});var FD,UD,f_,BD,h_=l(()=>{"use strict";E();ic();ti();FD="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",UD=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return rt[r]??null},f_=(e,t)=>{let r=UD(t);if(r===null||e.wizard===void 0)return!1;let o=rt.indexOf(r);if(o===-1)return!1;let n=kr(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<rt.length)},BD=(e,t)=>{let r=UD(t);if(r===null||e.wizard===void 0||!f_(e,t))return e;po(e.id);let o=rt.slice(rt.indexOf(r)),n=El(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var y_,GD,qD=l(()=>{"use strict";h_();y_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GD=(e,t)=>f_(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${y_(FD)}"><input type="hidden" name="cycleId" value="${y_(e.id)}"><input type="hidden" name="wizardStepId" value="${y_(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var GJ,qJ,VJ,VD,KD=l(()=>{"use strict";E();ic();ND();DD();qD();eg();GJ={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},qJ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),VJ=(e,t,r)=>{let o=GD(e,t);return`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${qJ(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${qs(e,t)}</div>
</details>`},VD=e=>{let t=e.wizard;if(t===void 0)return"";let r=kr(e);if(r===null)return"";let o=rt.slice(0,r).map((i,a)=>VJ(e,`wizard-${a+1}`,GJ[i])),n=t.gate!==null?MD(e,{active:!0}):zD(e),s=r>=rt.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var Ig,S_=l(()=>{"use strict";KD();Ow();E();Ig=e=>{if(e===null||e.wizard!==void 0&&T(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=VD(e),r=EN(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var KJ,A_,JD=l(()=>{"use strict";E();Ae();Fe();Pn();KJ=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},A_=async(e,t,r)=>{if(!KJ(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===R)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=sw({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Ve({writerAgent:e.judgeModel,prompt:n,workingDirectory:ae(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=aw(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var cc,Og,YD,b_,XD,ZD,QD,Mg,P_=l(()=>{"use strict";cc=g(require("node:fs")),Og=g(require("node:path")),YD=e=>Og.default.join(Og.default.dirname(e),"prompt-optimizer-writer-ready.json"),b_=e=>{let t=YD(e);if(!cc.default.existsSync(t))return{};try{let r=JSON.parse(cc.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},XD=(e,t)=>{cc.default.mkdirSync(Og.default.dirname(e),{recursive:!0}),cc.default.writeFileSync(YD(e),`${JSON.stringify(t,null,2)}
`)},ZD=(e,t)=>b_(e)[t]?.message??null,QD=(e,t,r)=>{XD(e,{...b_(e),[t]:{message:r}})},Mg=(e,t)=>{let r=b_(e);r[t]!==void 0&&XD(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var w_,Ng,zg,ej,be,Ln=l(()=>{"use strict";E();Uw();rc();JD();oc();ti();P_();Rg();nt();w_=new Set,Ng={atMs:0,ids:[]},zg=async()=>{if(Date.now()-Ng.atMs<3e4)return Ng.ids;let e=await Lt({commands:ue({})});return Ng.atMs=Date.now(),Ng.ids=e.installedWriterIds,e.installedWriterIds},ej=async(e,t,r)=>{let o=K(e,t);if(o===null||r.aborted)return;let n=vn(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(T(n.status)&&!s||n.status==="wizard_paused"||Zt(n))return;if(s){let c=await A_(n,r,d=>{Mg(e,d)});z(e,c);return}let i=await $z(n,c=>{Mg(e,c)},r,c=>{K(e,t)?.status==="stopped"||r.aborted||z(e,c)});if(!(K(e,t)?.status==="stopped"||r.aborted)){if(z(e,i),T(i.status)){let c=await A_(i,r,d=>{Mg(e,d)});z(e,c);return}await ej(e,t,r)}},be=(e,t)=>{if(w_.has(t))return;let r=K(e,t);if(r===null)return;let o=vn(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(T(o.status)&&!n||o.status==="wizard_paused"||Zt(o))return;w_.add(t);let s=jD(t);ej(e,t,s).finally(()=>{w_.delete(t),$D(t)})}});var mo,dc=l(()=>{"use strict";m_();Rg();S_();Ln();mo=(e,t)=>{let r=vn(e,t);return be(e,r.id),`${xg(r)}${Ig(r)}`}});var tj,rj,oj=l(()=>{"use strict";tj=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,rj=e=>e!==null&&e>0});var JJ,YJ,XJ,nj,sj=l(()=>{"use strict";E();rc();_g();Kl();Jl();ti();tg();tg();JJ=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),YJ=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},XJ=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=Q(o);return Qs({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},nj=(e,t)=>{if(!ql(e,t))return e;po(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return wn({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return lo(YJ(r));if(t==="wizard-3"){let n=o.splitOptions[0]??JJ(o.templatedPrompt);return ao(r,n)}return t==="wizard-4"?XJ(r):e}});var Dg,ij,__=l(()=>{"use strict";E();_g();ti();Dg=e=>(po(e.id),{...Qs(e,"stopped"),errorMessage:RP}),ij=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;po(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var ZJ,aj,lj,cj=l(()=>{"use strict";E();rc();_g();Kl();Jl();dc();nt();Ln();oj();h_();sj();__();ZJ="Pick a revision scored above 0 before continuing to Separate.",aj=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),lj=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=K(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=K(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(mo(e.storePath,d))};if(o==="wizard-stop-all"){let c=Dg(s);return z(e.storePath,c),be(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=ij(s);return z(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=BD(s,c);return z(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=nj(s,c);return z(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&be(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let u=t.get("wizardStepInstructions")?.trim()??"",m=QP(s.wizard,d,c);m=El(m,d),m={...m,pendingStepInstructions:u};let S={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return z(e.storePath,S),be(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(S=>S.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?aj(s):wn({...s,wizard:{...s.wizard,gate:null}});return z(e.storePath,m),be(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),u=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=tj(s,u??-1);if(!rj(m)){let f={...s,errorMessage:ZJ,updatedAt:new Date().toISOString()};return z(e.storePath,f),a(n),!0}let S=lo({...s,wizard:{...s.wizard,evaluateSelectedRound:u}});return z(e.storePath,S),be(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let f=aj(s);return z(e.storePath,f),be(e.storePath,n),a(n),!0}let u=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(f=>f.id===u);if(m===void 0){let f={...s,errorMessage:u.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return z(e.storePath,f),a(n),!0}let S=ao(s,m);return z(e.storePath,S),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,u=d.currentModuleIndex,m=d.modules[u];if(m===void 0)return a(n),!0;if(!Fs(s.costControls)){let A=t.get("confirmedTokenBudget")?.trim()??"",b=t.get("confirmedMaxSpendUsd")?.trim()??"";if(A.length===0){let w={...s,errorMessage:$s,updatedAt:new Date().toISOString()};return z(e.storePath,w),a(n),!0}let h=Ul({existing:s.costControls,confirmedTokenBudget:Number(A),confirmedMaxSpendUsd:b.length===0?null:Number(b),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!h.ok){let w={...s,errorMessage:h.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,w),a(n),!0}s={...s,costControls:h.costControls,errorMessage:null,updatedAt:new Date().toISOString()},z(e.storePath,s)}let S=Sw({wizard:d,modulePrompt:m.prompt,posted:t});if(!S.ok){let A={...s,errorMessage:S.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,A),a(n),!0}let f={...d,parameterValues:S.parameterValues};if(m.status==="pending"){let A=jz({...s,wizard:{...f,gate:null}},u);return z(e.storePath,A),be(e.storePath,n),a(n),!0}let y=u+1;if(y>=d.modules.length){let A=Q(f),b=Qs({...s,wizard:f},A.terminalStatusSuggestion);return z(e.storePath,b),be(e.storePath,n),a(n),!0}let p={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...f,gate:"optimize_modules",currentModuleIndex:y},updatedAt:new Date().toISOString()};return z(e.storePath,p),a(n),!0}}return a(n),!0}});var QJ,dj,e7,v_,t7,uj,pj=l(()=>{"use strict";Ae();ti();__();Xw();fg();oc();nt();QJ="Add a score from 0 to 100 and the reason for it.",dj="Add a score from 1 to 100 and the reason for it.",e7="Write the next prompt.",v_="This step is not waiting for you.",t7=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},uj=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=K(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(z(e.storePath,Dg(a)),{kind:"saved",cycleId:i}):HD(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=K(e.storePath,r);if(o===null||!Zt(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:v_};if(t==="manual-judge"){if(o.judgeModel!==R)return{kind:"invalid",cycle:o,errorMessage:v_};let i=t7(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?dj:QJ};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:dj};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",u=hg(Ql(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return z(e.storePath,u),{kind:"saved",cycleId:o.id}}if(o.improverModel!==R)return{kind:"invalid",cycle:o,errorMessage:v_};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:e7};let s=gg(o,n);return z(e.storePath,s),{kind:"saved",cycleId:o.id}}});var mj,gj=l(()=>{"use strict";mj=`<script>
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
    gateSlot.replaceWith(incomingGateSlot);
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
</script>`});var fj,hj=l(()=>{"use strict";fj=`<script>
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
    if (incomingGateSlot !== null && gateSlot !== null) {
      gateSlot.replaceWith(incomingGateSlot);
      applied = true;
    } else if (incomingGateSlot !== null && gateSlot === null) {
      const runAnchor = document.getElementById("prompt-optimizer-run");
      const resume = document.querySelector(".sdlc-wizard-resume");
      const compose = document.getElementById("prompt-optimizer-compose");
      const insertAfter =
        runAnchor ?? resume ?? compose;
      insertAfter?.insertAdjacentElement("afterend", incomingGateSlot);
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
</script>`});var yj,Sj=l(()=>{"use strict";yj=`<script>
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
    const passStep2 = form.querySelector('[name="passScore"]');
    const passStep4 = form.querySelector('[name="modulePassScore"]');
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
      "</dd>";
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
</script>`});var Aj,bj=l(()=>{"use strict";E();Fe();Aj=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:ot(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(oe(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!T(t.status)}}});var Pj,wj=l(()=>{"use strict";Pj=`<script>
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
</script>`});var _j,vj=l(()=>{"use strict";E();ic();vg();_j=e=>{let t=ei(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:T(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=kr(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=Q(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=Q(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return T(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var Cj,Lj=l(()=>{"use strict";Cj=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Wr,r7,o7,kj,Wj=l(()=>{"use strict";vj();Lj();sc();Wr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),r7=e=>e.wizard===void 0?"legacy":"wizard",o7=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Wr(t)}">`,o=_j(e),n=Cj(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Wr(o.badgeClass)}">${Wr(o.badgeLabel)}</span>`,u=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Wr(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Wr(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${r7(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Wr(e.id)}">${Wr(Cr(e.goal))}</a><p class="muted">${Wr(a)}</p></div></div><div class="sdlc-history-row-actions">${u}${m}</div></li>`},kj=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>o7(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Wr(s)}</summary>${i}</details>`:i}});var C_,jg,Tj,n7,s7,uc,Ej,$g=l(()=>{"use strict";C_=g(require("node:fs")),jg=g(require("node:path"));Fe();Tj=/^[a-z0-9-]+$/,n7=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},s7=(e,t)=>{if(!Tj.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let u=/^(name|description):\s*(.*)$/.exec(d.trim());if(u===null)continue;let m=n7(u[2]??"");u[1]==="name"&&m.length>0&&(o=m),u[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},uc=e=>{let t=_r(e);if(!t.ok)return[];let r=jg.default.resolve(t.path,".cursor","skills"),o=[];try{o=C_.default.readdirSync(r)}catch{return[]}return o.filter(n=>Tj.test(n)).flatMap(n=>{let s=jg.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${jg.default.sep}`))return[];try{let i=s7(C_.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},Ej=(e,t)=>uc(e).find(r=>r.fileName===t)??null});var xj,i7,Rj,Ij,Oj=l(()=>{"use strict";uo();xj=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),i7=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),Rj=e=>{if(e.length===0)return`<div class="field">${le("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${xj(r.fileName)}">${xj(r.fileName)}</option>`).join("");return`<div class="field">${le("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${i7(e)}</script>`},Ij=`<script>
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
</script>`});var pc,Mj,Nj=l(()=>{"use strict";E();Tg();uo();pc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Mj=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=pc(e.maxSpendUsd),n=e.earlyStop?" checked":"";return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${pc(pe.knobsSectionTitle)}</p>
  <p class="muted">${pc(pe.knobsSectionLede)}</p>
  <div class="field">
    ${le(pe.maxTrialsLabel,"maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${30}" step="1" value="${r}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${le(pe.maxSpendUsdLabel,"maxSpendUsd")}
    <input class="input" type="number" name="maxSpendUsd" id="sdlc-max-spend-usd" min="0" step="0.01" value="${o}" placeholder="Optional" data-sdlc-max-spend-usd>
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${n}>
      <span>${pc(pe.earlyStopLabel)}</span>
    </label>
    <p class="muted">${pc(pe.earlyStopHint)}</p>
  </div>
</div>`}});var De,zj,Dj,a7,jj,$j,Hj,Fj=l(()=>{"use strict";E();i_();Ae();sc();ic();De=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zj=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",Dj=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,a7=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},jj=e=>e===R?"You":ne(e),$j=e=>{let t=a7(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ne(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${De(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${De(t)}</dd></div>
      <div><dt>Judge</dt><dd>${De(jj(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${De(jj(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${De(r)}</dd></div>
    </dl>
  </details>`},Hj=e=>{let t=e.wizard;if(t===void 0)return"";let r=Cr(e.goal),o=e.status==="wizard_paused",n=!T(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let u=Lg(e),m=Dj(t),S=m===null?"":zj(m),f=kr(e),y=S.length===0?"":f===null||f>=4?` <strong>${De(S)}</strong>`:` <strong>${De(S)}</strong> (step ${f+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${De(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${De(u.title)}${y}</p>
    <p class="muted">${De(u.detail)}</p>
    <div class="actions">
      ${$j(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${De(e.id)}">Open this run</a>
    </div>
  </section>`}let s=Dj(t),i=s===null?"Wizard":zj(s),a=kr(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${De(r)}</h2>
    <p class="lede">Paused at <strong>${De(i)}</strong>${De(c)} (last updated ${De(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${$j(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${De(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var mc,Uj,Bj=l(()=>{"use strict";uo();mc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Uj=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${mc(n.id)}"${n.id===e.runner?" selected":""}>${mc(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${mc(e.runner)}">Checking ${mc(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${le("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${le("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${mc(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var Gj,qj=l(()=>{"use strict";Gj=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var ri,Vj,Kj,Jj,Yj,Xj=l(()=>{"use strict";uo();ri=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Vj=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${ri(c.id)}"${c.id===r?" selected":""}>${ri(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${ri(n)}</option>`;return`<div class="field">${le(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},Kj=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${ri(t)}">Checking ${ri(o)}\u2026</p>`},Jj=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${le(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${ri(r)}</textarea><span class="muted">${o}</span></div></details>`,Yj=e=>{let t=`<div class="sdlc-writer">${Vj("judge","Judge",e.judge,e.writers,"I'll score it")}${Kj("judge",e.judge,e.writers)}${Jj("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${Vj("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${Kj("improver",e.improver,e.writers)}${Jj("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var Zj,Qj=l(()=>{"use strict";Zj=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var L_,e$,t$=l(()=>{"use strict";Qj();L_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),e$=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${Zj.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${L_(t.goal)}" title="${L_(t.goal)}">${L_(t.label)}</button>`).join("")}</div>`});var gc,l7,c7,k_,r$=l(()=>{"use strict";E();uo();gc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),l7=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},c7=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,k_=e=>{let t=l7(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=vl(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${le(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${gc(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${gc(e.inputId)}" class="sdlc-pass-range" type="range" name="${gc(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${gc(a)}"><span class="sdlc-pass-mark" style="left:${c7(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${gc(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var u7,Tr,o$,n$=l(()=>{"use strict";oc();m_();gj();hj();ag();Sj();bj();wj();Wj();$g();Oj();uo();S_();Nj();Fj();sc();Bj();qj();Xj();E();t$();r$();u7=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Tr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),o$=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Tr(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Tr(e.skillNotice??"")}</div>`,o=`${FN}${UN}`,n=e.resumableWizardCycle??null,s=n===null?"":Hj(n),i=Ig(e.cycle),a=e.cycle===null?"":xg(e.cycle),c=e.cycle!==null&&Zt(e.cycle),d=Aj(e),u=u7(d.goal,d.prompt,e.canRun),m=Yj({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),S=Uj({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),f=`${k_({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${k_({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=Mj({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop}),p=XP,A=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",b=e.cycle!==null&&T(e.cycle.status),h=d.running&&!b,w=b||h?"":" open",_=h?" sdlc-compose-run-focus":"",L=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${b?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,k=b?(()=>{let $=e.cycle!==null?Cr(e.cycle.goal):Cr(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Tr($)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${L}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${L}</summary>`,x=b?" sdlc-compose-viewing-finished":"",I=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",M=c?"waiting":d.running?"running":"idle",F=d.running&&!c?' aria-busy="true"':"",q=`<section class="card sdlc-compose${x}${_}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${w}>
        ${k}
        <div class="sdlc-compose-details-body">
      <p class="lede">${p} ${Tr(e.modelNote)}</p>
        <ol class="sdlc-compose-stepper" aria-label="Compose steps" data-sdlc-compose-stepper>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="1" aria-current="step"><span class="sdlc-compose-stepper-index">1</span><span class="sdlc-compose-stepper-label">Project</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="2"><span class="sdlc-compose-stepper-index">2</span><span class="sdlc-compose-stepper-label">Prompt and goal</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="3"><span class="sdlc-compose-stepper-index">3</span><span class="sdlc-compose-stepper-label">CLI</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="4"><span class="sdlc-compose-stepper-index">4</span><span class="sdlc-compose-stepper-label">Summary</span></li>
        </ol>
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${A}
        <p class="alert-error sdlc-compose-step-error" data-sdlc-compose-step-error hidden role="alert"></p>
        <div class="sdlc-compose-step" data-sdlc-compose-step="1" id="sdlc-compose-step-1">
          <h3 class="sdlc-compose-step-title">Project</h3>
          <p class="muted sdlc-compose-step-lede">Choose the folder writers run in and optionally load a skill into the prompt on the next step.</p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="sdlc-folder">
          <div class="field">
            ${le("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Tr(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${Rj(uc(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <input type="hidden" name="orchestratorSkillFile" value="" data-orchestrator-skill-file>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <p class="muted sdlc-compose-orchestrator-note" data-orchestrator-skill-note hidden></p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${le("Goal","goal")}
            ${e$()}
            <textarea class="input textarea" name="goal" rows="4" required>${Tr(d.goal)}</textarea>
          </div>
          <div class="field">
            ${le("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Tr(d.prompt)}</textarea>
          </div>
          ${f}
          ${y}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
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
        ${Gj()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${Tr(d.passScore)}; Step 4 pass \u2265 ${Tr(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${M}" data-can-run="${u?"true":"false"}"${F}${d.running?" disabled":""}>${I}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,B=e.history.length>0?Pj:"",Ue=`${""}${mj}${fj}${yj}${Ij}${B}`;return`${t}${r}${q}${s}${a}${i}${o}${kj(e.history,e.cycle?.id??null)}${Ue}`}});var fc,W_=l(()=>{"use strict";n$();fc=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:o$(t)}))}});var s$,i$=l(()=>{"use strict";pj();dc();W_();nt();Ln();s$=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:uj({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=K(e.storePath,o.cycleId);return be(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(mo(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await fc(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:Yt(e.storePath),resumableWizardCycle:null}),!0)}});var a$,Hg,T_=l(()=>{"use strict";E();a$=g(require("node:os")),Hg=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??a$.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??wr()}}});var l$,oi,E_,c$,d$,hc=l(()=>{"use strict";E();Ae();$w();l$=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,oi=e=>{let t=hN(e),r=hn(e).map(s=>({id:s,label:Km[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},E_=(e,t,r)=>t===R||t!==null&&e.writers.some(o=>o.id===t)?t:r,c$=(e,t,r,o=null)=>({judge:E_(e,t,e.judge),improver:E_(e,r,e.improver),runner:E_(e,o,e.runner)}),d$=e=>e===lg?{goal:cg,prompt:dg}:{goal:"",prompt:""}});var Fg,u$=l(()=>{"use strict";Fg=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var p$,p7,m$,g$,f$,h$=l(()=>{"use strict";E();p$=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},p7=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},m$=(e,t)=>e.has("earlyStop")?!0:t!=="run",g$=e=>{let t=p$(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=p7(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=p$(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},f$=e=>wr(e)});var y$,Ug,x_=l(()=>{"use strict";E();Ae();Fe();hc();u$();h$();y$=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=Fg(o);return n.ok?String(n.passScore):String(r)},Ug=e=>{let t=c$(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=y$(e.posted,"passScore",70),o=y$(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),u=e.posted?.get("maxSpendUsd")?.trim()??"",m=e.posted?.get("intent")??"",S=e.posted===null?!0:m$(e.posted,m),f=(k,x)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:k,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:x,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:u,earlyStop:S});if(e.posted===null)return f(e.defaultFolder??yn,null);let y=e.posted.get("folder")??yn;if(e.posted.get("intent")==="choose-folder"){let k=e.pickFolder();return f(k===null?y:ot(k),null)}if((e.posted.get("intent")??"")!=="run")return f(y,null);let A=l$(e.goal,e.prompt);if(A!==null)return f(y,A);let b=Fg(e.posted.get("passScore")??r);if(!b.ok)return f(y,b.errorMessage);let h=Fg(e.posted.get("modulePassScore")??o);if(!h.ok)return f(y,h.errorMessage);let w=yN(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(w===null)return f(y,"Choose a judge and an improver.");let _=_r(y);if(!_.ok)return f(y,_.errorMessage);let C=SN(e.installedIds,c,w.judge);if(C===null)return f(y,"Choose a runner for wizard step 4.");let L=g$({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off"});return L.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:w.judge,improver:w.improver,workingDirectory:_.path,passScore:b.passScore,modulePassScore:h.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:C,runnerInstructions:a,costControls:f$(L.knobs)}:f(y,L.errorMessage)}});var ni,Gg,m7,R_,S$,Bg,A$,g7,b$,I_,f7,h7,y7,O_,P$,w$,_$=l(()=>{"use strict";ni=g(require("node:fs")),Gg=g(require("node:path"));Ae();Fe();m7=["remember","choose-folder","run"],R_=()=>({folder:yn,judge:"",improver:"",runner:""}),S$=e=>Gg.default.join(Gg.default.dirname(e),"prompt-optimizer-preferences.json"),Bg=e=>typeof e=="string"?e:"",A$=e=>{let t=S$(e);if(!ni.default.existsSync(t))return R_();try{let r=JSON.parse(ni.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return R_();let o=r,n=Bg(o.folder).trim();return{folder:n.length===0?yn:n,judge:Bg(o.judge),improver:Bg(o.improver),runner:Bg(o.runner)}}catch{return R_()}},g7=(e,t)=>{let r=S$(e);ni.default.mkdirSync(Gg.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;ni.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),ni.default.renameSync(o,r)},b$=(e,t)=>e===R||hn(t).some(r=>r===e),I_=(e,t,r)=>e===null?t:e.length===0?"":b$(e,r)?e:t,f7=(e,t)=>{if(e===null)return t;let r=_r(e);return r.ok?r.display:t},h7=e=>{let t=A$(e.storePath),r={folder:f7(e.folder,t.folder),judge:I_(e.judge,t.judge,e.installedIds),improver:I_(e.improver,t.improver,e.installedIds),runner:I_(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||g7(e.storePath,r)},y7=e=>{let t=_r(e);return t.ok?t.display:yn},O_=(e,t)=>b$(e,t)?e:"",P$=e=>{let t=A$(e.storePath);return{selection:{...e.selection,judge:O_(t.judge,e.installedIds)||e.selection.judge,improver:O_(t.improver,e.installedIds)||e.selection.improver,runner:O_(t.runner,e.installedIds)||e.selection.runner},defaultFolder:y7(t.folder)}},w$=e=>{let t=e.posted.get("intent")??"";if(!m7.includes(t))return;let r=e.posted.get("folder");h7({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var v$,S7,A7,M_,b7,qg,Vg=l(()=>{"use strict";v$=g(require("node:os"));Ae();P_();Pn();S7="Reply with the single word ok. Do not use tools.",A7=45e3,M_=async(e,t)=>{if(t===R)return{ok:!0,message:"You will do this step."};let r=ZD(e,t);if(r!==null)return{ok:!0,message:r};let o=await Ve({writerAgent:t,prompt:S7,workingDirectory:v$.default.tmpdir(),timeoutMs:A7});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ne(t)} is ready.`;return QD(e,t,n),{ok:!0,message:n}},b7=e=>[...new Set(e.filter(t=>t.length>0))],qg=async(e,t,r,o)=>{for(let n of b7([t,r,o??""])){let s=await M_(e,n);if(!s.ok)return s.message}return null}});var N_,C$=l(()=>{"use strict";E();N_=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!T(r.status)&&!(t!==null&&r.id===t))return r;return null}});var L$,k$=l(()=>{"use strict";Gt();E();dc();T_();x_();W_();nt();Fe();_$();$g();Vg();C$();Rg();Ln();L$=async e=>{let t=e.posted===null?P$({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=Ug({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>ro("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(w$({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?ot(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await qg(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await fc(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:ot(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:Yt(e.route.storePath),resumableWizardCycle:N_(Yt(e.route.storePath),null)});return}if(r.kind==="start"){let s=Ej(r.workingDirectory,r.sourceSkillFile),i=Hg({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:r.costControls,wizard:cw({...Tl(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(z(e.route.storePath,i),be(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(mo(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:K(e.route.storePath,e.cycleId);n!==null&&(n=vn(e.route.storePath,n),be(e.route.storePath,n.id)),await fc(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:Yt(e.route.storePath),resumableWizardCycle:N_(Yt(e.route.storePath),n?.id??null)})}});var W$,T$=l(()=>{"use strict";nt();W$=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";ZN(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var E$,x$=l(()=>{"use strict";E$=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var R$,I$=l(()=>{"use strict";sz();cj();i$();k$();T$();hc();x$();Ln();R$=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await zg(),o=oi(r),n=e.method==="POST"?E$(e.request.headers["content-type"],await e.readBody(e.request)):null;if(lj({posted:n,storePath:e.storePath,response:e.response})||await s$(e,n,o))return;let s=d$(t.searchParams.get("example")),i=W$({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=nz({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await L$({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:oz(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var P7,O$,M$=l(()=>{"use strict";E();nt();P7=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",O$=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=K(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!T(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=dw({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${P7(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var N$,z$=l(()=>{"use strict";dc();nt();N$=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:K(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":mo(e.storePath,o)),!0}});var w7,D$,j$=l(()=>{"use strict";Ae();Vg();w7=["claude-cli","codex","cursor","antigravity"],D$=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===R||w7.includes(t)?await M_(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var $$,H$=l(()=>{"use strict";E();$$=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:Ll,page:kl,context:zs,installedWriters:e,post:{method:"POST",url:Ll,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${Ll}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var Kg,F$=l(()=>{"use strict";E();p_();Ks();Kg=e=>{let t=e.revisions[e.revisions.length-1]??null,r=se(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=T(e.status),n=e.errorKind??null,s=Eg({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:vr(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:zs,page:`${kl}?cycle=${encodeURIComponent(e.id)}`}}});var je,_7,U$,B$,G$=l(()=>{"use strict";je=g(Gn());E();_7=(0,je.isType)({goal:je.isString,prompt:je.isString,workingDirectory:je.isString,judge:(0,je.isUndefinedOr)(je.isString),improver:(0,je.isUndefinedOr)(je.isString),passScore:(0,je.isUndefinedOr)(je.isNumber),maxRounds:(0,je.isUndefinedOr)(je.isNumber)}),U$=e=>{let t=e?.trim()??"";return t.length===0?null:t},B$=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return _7(t)?t.workingDirectory.trim().length===0?{ok:!1,error:Nm}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:U$(t.judge),improver:U$(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:Nm}}});var Er,v7,q$,V$,K$=l(()=>{"use strict";E();Er=g(Gn()),v7=(0,Er.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:Er.isNumber,confirmedMaxSpendUsd:(0,Er.isUndefinedOr)(Er.isNumber),rateUsdPer1kTokens:(0,Er.isUndefinedOr)(Er.isNumber)}),q$=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:v7(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},V$=(e,t)=>{let r=Ul({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var C7,J$,Y$=l(()=>{"use strict";E();Ae();x_();hc();C7=e=>e.map(t=>t.id).join(", "),J$=e=>{let t=oi(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===R||n===R)return{ok:!1,error:YP,installedWriters:t.writers};if(o===null||n===null){let a=C7(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o}),i=Ug({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var X$,Z$=l(()=>{"use strict";E();T_();H$();F$();hc();G$();K$();Y$();nt();X$=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=K(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:Kg(c)}}let r=await e.handlers.readInstalledIds(),o=oi(r);if(e.method==="GET")return{status:200,body:$$(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let c=q$(e.rawBody);if(c.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(c.kind==="invalid")return{status:400,body:{ok:!1,error:c.error}};let d=K(e.storePath,t);if(d===null)return{status:404,body:{ok:!1,error:"That run is not on this Mac."}};let u=V$(d,c.body);return u.ok?(z(e.storePath,u.cycle),{status:200,body:Kg(u.cycle)}):{status:400,body:{ok:!1,error:u.error}}}let n=B$(e.rawBody);if(!n.ok)return{status:400,body:{ok:!1,error:n.error,installedWriters:o.writers}};let s=J$({body:n.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver,s.runner);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:o.writers}};let a=Hg({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds,wizard:Tl(s.prompt),runnerModel:s.runner});return z(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:Kg(a)}}});var Q$,eH=l(()=>{"use strict";Ln();Vg();Z$();Q$=async e=>{let t=await X$({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:zg,readWritersReady:qg,startCycle:be}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var rH,L7,k7,tH,W7,oH,nH=l(()=>{"use strict";rH=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],L7=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},k7=e=>{let t={};for(let n of e)for(let s of new Set(rH(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},tH=(e,t)=>{let r=L7(rH(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},W7=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},oH=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=k7(e.map(i=>i.text)),s=tH(o,n);return e.map(i=>({id:i.id,score:W7(s,tH(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var z_,T7,E7,sH,x7,R7,I7,O7,D_,j_=l(()=>{"use strict";z_=g(require("node:path"));Fe();nH();$g();T7=5,E7=20,sH=280,x7=e=>[e.name,e.description,e.promptText].join(`
`),R7=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=sH?t:`${t.slice(0,sH-3)}...`},I7=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),O7=e=>e===void 0||!Number.isFinite(e)?T7:Math.min(E7,Math.max(1,Math.floor(e))),D_=e=>{let t=e.query.trim(),r=O7(e.limit),o=_r(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=uc(o.path),s=oH(n.map(d=>({id:d.fileName,text:x7(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=z_.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let u=i.get(d.id);return u===void 0?[]:[{skillId:u.fileName,name:u.name,description:u.description,score:d.score,sourcePath:z_.default.join(a,u.fileName,"SKILL.md"),excerpt:R7(u),source:"filesystem"}]});return{query:t,hits:c,context:I7(c)}}});var iH,aH=l(()=>{"use strict";j_();iH=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:D_({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var lH,cH=l(()=>{"use strict";aH();lH=async e=>{let t=iH({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var M7,$_,dH=l(()=>{"use strict";qN();I$();M$();z$();j$();eH();cH();M7=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},$_=async e=>{let t=M7(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await Q$(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await lH(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:GN()})),!0):(await D$({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||O$({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||N$({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await R$(e),!0)}});var uH=l(()=>{"use strict";dH();j_();Pn()});var kn,yc,N7,z7,D7,j7,pH,mH=l(()=>{"use strict";kn=g(require("node:fs")),yc=g(require("node:path")),N7="prompt-optimizer-cycles.json",z7="prompt-optimizer-preferences.json",D7="prompt-sdlc-cycles.json",j7="prompt-sdlc-preferences.json",pH=e=>{let t=yc.default.join(e,N7),r=yc.default.join(e,D7);if(kn.default.existsSync(t)||!kn.default.existsSync(r))return t;try{kn.default.renameSync(r,t)}catch{return r}let o=yc.default.join(e,j7),n=yc.default.join(e,z7);if(kn.default.existsSync(o)&&!kn.default.existsSync(n))try{kn.default.renameSync(o,n)}catch{}return t}});var si,$7,H_,gH=l(()=>{"use strict";si=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$7=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],H_=e=>{let t=$7.map(i=>`<option value="${si(i.value)}">${si(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${si(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${si(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${si(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${si(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Sc,yH,H7,SH,F7,U7,AH,Yg,fH,hH,B7,G7,xr,Ac,Jg,q7,Xg,F_,V7,U_,bH,B_,PH,K7,J7,Y7,wH,_H,vH,bc=l(()=>{"use strict";Sc=g(require("node:fs")),yH=g(require("node:path")),H7="estimate-history.ndjson",SH=100,F7=500,U7=2e4,AH=e=>yH.default.join(e,H7),Yg=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,F7),fH=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,U7),hH=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,B7=e=>({...e,estimateTokens:hH(e.estimateTokens),actualTokens:hH(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),G7=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},xr=e=>{let t=AH(e);return Sc.default.existsSync(t)?Sc.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return G7(n)?[B7(n)]:[]}catch{return[]}}):[]},Ac=(e,t)=>{Sc.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Sc.default.writeFileSync(AH(e),r,"utf8")},Jg=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),q7=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${Jg(o.task)} | ${Jg(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},Xg=e=>{let t=xr(e.reportsDir),r=Yg(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ac(e.reportsDir,[...s,n])},F_=e=>{let t=xr(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?Yg(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Ac(e.reportsDir,[...i,s])},V7=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-SH),U_=e=>[...xr(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),bH=e=>{let t=xr(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=fH(e.input),n=fH(e.output),s=Yg(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Ac(e.reportsDir,[...c,a])},B_=(e,t)=>{let r=xr(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},PH=e=>({table:q7(V7(xr(e))),embedding:null}),K7=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},J7=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-SH),Y7=e=>{let t=K7(J7(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${Jg(s.task)} | ${Jg(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},wH=e=>{let t=xr(e.reportsDir),r=Yg(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ac(e.reportsDir,[...s,n])},_H=e=>{let t=xr(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ac(e.reportsDir,[...s,n])},vH=e=>Y7(xr(e))});var CH=l(()=>{"use strict";bc()});var Rr,G_,X7,q_,Z7,Q7,Zg,Qg,e9,V_,LH=l(()=>{"use strict";CH();zw();Rr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),G_=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},X7=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${G_(-r)} under`:`${G_(r)} over`},q_=e=>e.toLocaleString("en-US"),Z7=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${q_(-r)} under`:`${q_(r)} over`},Q7=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},Zg=e=>e===null?"\u2014":G_(e),Qg=e=>e===null?"\u2014":q_(e),e9=`(function () {
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
})();`,V_=e=>{let r=U_(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":X7(n.estimateSeconds,n.actualSeconds),u=n.estimateTokens===null||n.actualTokens===null?"no estimate":Z7(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${Rr(Q7(i))}</button></td>
        <td>${Rr(c)}</td>
        <td>${Zg(n.estimateSeconds)}</td>
        <td>${Zg(n.actualSeconds)}</td>
        <td>${Rr(d)}</td>
        <td>${Qg(n.estimateTokens)}</td>
        <td>${Qg(n.actualTokens)}</td>
        <td>${Rr(u)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${Rr(c)}</p>
        <h2>Input</h2>
        <pre>${Rr(i)}</pre>
        <h2>Output</h2>
        <pre>${Rr(a)}</pre>
        <p>Time: estimated ${Zg(n.estimateSeconds)} \xB7 actual ${Zg(n.actualSeconds)} \xB7 ${Rr(d)}</p>
        <p>Tokens: estimated ${Qg(n.estimateTokens)} \xB7 actual ${Qg(n.actualTokens)} \xB7 ${Rr(u)}</p>
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
            ${rg({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${e9}</script>`}
    </section>`}});var kH=l(()=>{"use strict";gH();LH()});var ii,t9,r9,K_,WH=l(()=>{"use strict";ii=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),t9=(e,t,r)=>{let o=ii(t),n=ii(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},r9=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${ii(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>t9(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${ii(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${ii(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${ii(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},K_=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(r9).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var TH=l(()=>{"use strict";WH()});var Pc,EH,xH,J_,Y_,X_,RH=l(()=>{"use strict";Pc=g(require("node:fs")),EH=g(require("node:path"));gl();wm();xH=(e,t,r)=>Es({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,J_=(e,t,r)=>{let o=xH(e,t,r);if(o===null)return[];if(!Pc.default.existsSync(o))return[];let n=Pc.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},Y_=e=>{let t=xH(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Sr(e.entry.prompt),output:Sr(e.entry.output)};Pc.default.mkdirSync(EH.default.dirname(t),{recursive:!0}),Pc.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},X_=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var o9,n9,wc,ef,Z_=l(()=>{"use strict";o9=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),n9=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,wc=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=o9(i.assistantOutput),d=c.length>0?`Assistant: ${n9(c,t)}`:null,u=[a,d].filter(m=>m!==null).join(`

`);if(u.length!==0){if(n+u.length>r&&o.length>0)break;o.unshift(u),n+=u.length}}return o.join(`

`)},ef=e=>{let t=e.userMessage.trim(),r=wc({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var er,_c,tv,s9,i9,Q_,a9,rv,tf,IH,OH,l9,ai,ov,ev,MH,c9,NH,li,rf,vc,d9,Cc,nv,of,nf,zH=l(()=>{"use strict";er=g(require("node:fs")),_c=g(require("node:path")),tv=require("node:crypto");Z_();s9="writer-sessions",i9="active-index.json",Q_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),a9=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",rv=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},tf=e=>{let t=_c.default.join(e.installDir,s9);return er.default.mkdirSync(t,{recursive:!0}),t},IH=e=>_c.default.join(tf(e),i9),OH=(e,t)=>_c.default.join(tf(e),`${t}.canonical.json`),l9=(e,t)=>_c.default.join(tf(e),`${t}.continuation.json`),ai=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,ov=e=>{let t=IH(e);if(!er.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(er.default.readFileSync(t,"utf8"));if(!Q_(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!Q_(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!a9(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},ev=(e,t)=>{er.default.writeFileSync(IH(e),JSON.stringify(t,null,2))},MH=(e,t)=>{er.default.writeFileSync(OH(e,t.sessionId),JSON.stringify(t,null,2))},c9=(e,t)=>{er.default.writeFileSync(l9(e,t.sessionId),JSON.stringify(t,null,2))},NH=(e,t)=>{let r=wc({turns:t.turns});c9(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},li=(e,t)=>{let r=OH(e,t);if(!er.default.existsSync(r))return null;try{let o=JSON.parse(er.default.readFileSync(r,"utf8"));return!Q_(o)||typeof o.sessionId!="string"?null:o}catch{return null}},rf=(e,t=20)=>{let r=tf(e),o=er.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=li(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},vc=(e,t,r)=>{let o=rv(r);return ov(e).entries.find(i=>ai(i)===ai({writerAgent:t,projectFolderPath:o}))?.sessionId??null},d9=(e,t,r,o)=>{let n=ov(e),s=ai({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>ai(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];ev(e,{entries:i})},Cc=(e,t,r)=>{let o=(0,tv.randomUUID)(),n=new Date().toISOString(),s=rv(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return MH(e,i),NH(e,i),d9(e,t,s,o),o},nv=(e,t,r)=>{let o=vc(e,t,r);return o!==null?o:Cc(e,t,r)},of=(e,t,r)=>{let o=rv(r),n=ov(e);if(o===null&&r===void 0){ev(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=ai({writerAgent:t,projectFolderPath:o});ev(e,{entries:n.entries.filter(i=>ai(i)!==s)})},nf=e=>{let t=nv(e.layout,e.writerAgent,e.projectFolderPath),r=li(e.layout,t);if(r===null)return;let o={id:(0,tv.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};MH(e.layout,n),NH(e.layout,n)}});var u9,p9,sf,sv,DH=l(()=>{"use strict";u9=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",p9=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},sf=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",sv=e=>{let t=sf(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=u9(r,e.userPromptCharacterCount),n=p9({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var af=l(()=>{"use strict";RH();zH();Z_();DH()});var jH=l(()=>{"use strict";Qu();ls();_S()});var $H=l(()=>{"use strict";Xy()});var Je,g9,f9,iv,av,lv,HH=l(()=>{"use strict";jH();$H();Je=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),g9=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},f9=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=ba(o);return`value="${Je(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${Je(r)}"`},iv=(e,t,r,o,n)=>{let s=ep[t];return`<label class="field">
          <span class="field-label">${Je(o)} API key \u2014 ${Je(g9(e,t))} \xB7 <a class="field-link" href="${Je(s.href)}" target="_blank" rel="noopener noreferrer">${Je(s.label)}</a></span>
          <input class="input mono" type="password" name="${Je(r)}" autocomplete="off" ${f9(e,t,n)} />
        </label>`},av=(e,t,r,o)=>{let n=Gu(e[t]?.model),s=new Set(Bu[t].map(c=>c.value)),i=Bu[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${Je(c.value)}"${d}>${Je(c.label)}</option>`}).join(""),a=n!==Ho&&!s.has(n)?`<option value="${Je(n)}" selected>${Je(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${Je(o)}</span>
          <select class="input mono" name="${Je(r)}">${i}${a}</select>
        </label>`},lv=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Je(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${iv(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${av(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${iv(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${av(e.secrets,"openai","openaiModel","OpenAI model")}
        ${iv(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${av(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var FH=l(()=>{"use strict";HH()});var lf,UH,BH=l(()=>{"use strict";lf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UH=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${lf(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${lf(s.name)}</strong> <span class="muted mono">(${lf(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${lf(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var h9,GH,qH,VH=l(()=>{"use strict";h9=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,GH=e=>e.kind==="folder",qH=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&GH(d)){s=d;continue}let u={kind:"folder",name:a,children:new Map};s.children.set(a,u),s=u}}let r=o=>{let n=[];for(let s of o.children.values()){if(GH(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(h9)};return r(t)}});var KH,cv,JH=l(()=>{"use strict";KH=g(require("node:path")),cv=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${cv(r.children,t)}</ul>
            </details>
          </li>`;let o=KH.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var YH,go,y9,S9,Lc,A9,dv,XH=l(()=>{"use strict";km();YH=g(require("node:path"));BH();VH();JH();go=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),y9=()=>`(() => {
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

})();`,S9=()=>`(() => {
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
})();`,Lc=e=>{let t=Al({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=UH({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${go(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${go(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':A9(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${go(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${go(s)}" />
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
    <script>${y9()}</script>
    <script>${S9()}</script>`;return`${t}${r}${o}${c}${d}`},A9=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=qH(a.items.map(S=>({...S,relativePath:typeof S.relativePath=="string"&&S.relativePath.length>0?S.relativePath:YH.default.relative(a.sourceRoot,S.sourcePath).replaceAll("\\","/")}))),u=cv(d,go),m=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${go(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${go(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${m} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${u}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${go(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},dv=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=a.trim();Number.isFinite(d)&&u.length>0&&n.set(d,u)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??u??a,S=t.sets[i];if(S===void 0)continue;let f=a.length>0?a:S.proposedSlug,y=m.length>0?m:S.proposedName,p=r.has(i),A=S.items.map(b=>({id:b.id,kind:b.kind,title:b.title,sourcePath:b.sourcePath,include:p}));s.push({slug:f,name:y,items:A})}return s}});var ZH=l(()=>{"use strict";XH()});var b9,uv,QH=l(()=>{"use strict";hr();b9=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[Me]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},uv=b9});var P9,eF,tF=l(()=>{"use strict";hr();P9=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[Me]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},eF=P9});var rF=l(()=>{"use strict"});var Wn,w9,pv,oF=l(()=>{"use strict";km();xA();Wn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),w9=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,pv=e=>{let t=e.flashError?`<div class="alert-error">${Wn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Wn(e.flashMessage)}</div>`:"",r=Al({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Wn(w9(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,u=`<a class="btn btn-secondary btn-compact" href="${Wn(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=Fp(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
                  <input type="hidden" name="projectId" value="${Wn(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Wn(n.name)}</strong>
                  <span class="muted mono">${Wn(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${u}${m}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var nF=l(()=>{"use strict";rF();RA();oF()});var cf,sF=l(()=>{"use strict";cf=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var iF,Ot,mv=l(()=>{"use strict";iF=g(require("node:path"));bt();Be();J();me();PA();Ot=e=>{let t=H()?.layout.installDir??W();if(iF.default.basename(t)===zt)return At;let r=H(),o=r!==null?ve(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):At}});var gv,aF=l(()=>{"use strict";Ht();mv();gv=async e=>{let t=Ie(e.installDir),r=t?.bundleVersion??null,o=Ot(t);try{let n=await os(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Oo(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var fv,lF=l(()=>{"use strict";fv=e=>!e});var hv,ci,yv=l(()=>{"use strict";J();hv=()=>`http://127.0.0.1:${Zh()}/update/run`,ci=async e=>{try{let t=await fetch(hv(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var _9,cF,Sv,dF=l(()=>{"use strict";J();re();yv();_9=()=>{cr({launchAgentLabel:_e(),installDir:W()})},cF=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Sv=async()=>{_9();let e=await ci({force:!0});if(e.ok)return{ok:!0,message:cF(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:cF(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Ht(),CT)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var Av=l(()=>{"use strict";vP();sF();mv();aF();lF();dF();yv()});var uF,pF=l(()=>{"use strict";uF=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var mF,gF,bv,Pv,fF=l(()=>{"use strict";mF=require("node:crypto"),gF=g(require("node:fs"));Gt();me();me();pF();bv=!1,Pv=async e=>{if(bv)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!uF(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=H();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&gF.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,mF.randomUUID)();bv=!0;try{if(await wA(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await ds({...r,workspace:n},e.writerAgent,t);return await $a(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{bv=!1}}});var hF=l(()=>{"use strict";fF()});var ut,v9,yF,SF,wv,_v,vv,Cv,Lv,kv,Wv=l(()=>{"use strict";ut=require("node:crypto"),v9=Buffer.from("302a300506032b6570032100","hex"),yF=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},SF=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,ut.createPublicKey)({key:Buffer.concat([v9,t]),format:"der",type:"spki"})},wv=()=>{let{publicKey:e,privateKey:t}=(0,ut.generateKeyPairSync)("ed25519");return{publicKeyRaw:yF(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},_v=e=>(0,ut.createPrivateKey)(e),vv=(e,t)=>(0,ut.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),Cv=(e,t,r)=>{try{let o=SF(e);return(0,ut.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},Lv=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,kv=()=>(0,ut.randomBytes)(32).toString("base64url")});var Ir,df,AF,C9,L9,uf,Tv,Ev,bF=l(()=>{"use strict";Ir=g(require("node:fs")),df=g(require("node:path"));Wv();J();Be();AF=e=>df.default.join(e.installDir,Fr),C9=(e,t)=>{if(e.profileEmail===null||t===AF(e)||Ir.default.existsSync(t))return;let r=AF(e);Ir.default.existsSync(r)&&(Ir.default.mkdirSync(df.default.dirname(t),{recursive:!0}),Ir.default.renameSync(r,t))},L9=e=>{if(!Ir.default.existsSync(e))return null;try{let t=Ir.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},uf=e=>{let t=Su(e);C9(e,t);let r=L9(t);if(r!==null)return r;let o=wv();return Ir.default.mkdirSync(df.default.dirname(t),{recursive:!0}),Ir.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},Tv=e=>{let t=uf(e.layout),r=kv(),o=Lv({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=_v(t.privateKeyPem),s=vv(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Ev=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return Cv(e.serverPublicKey,t,e.serverAttestation)}});var xv=l(()=>{"use strict";bF();Wv()});var vF,kc,Ov,Mv,PF,k9,Rv,pf,ce,CF,W9,Iv,T9,E9,Nv,ge,Ee,tr,x9,wF,_F,Wc,Tc,LF=l(()=>{"use strict";vF=g(require("node:http")),kc=g(require("node:fs")),Ov=g(require("node:path"));mf();ul();EI();RI();DI();Ps();Zb();wP();mO();fO();uH();mH();kH();TH();af();FH();ZH();Vo();Gt();hr();QH();tF();nF();Av();Ht();hF();me();xv();Mv=e=>$b(e)??"never",PF=48e3,k9=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,Rv=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Wp(),reveal:t.reveal,installed:eo(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),pf=async e=>{let t=H();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:ys(t,e)},ce=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),CF=200,W9=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',Iv=e=>{let t=e.trim().slice(0,CF),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},T9=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ce(t)}</div>`,E9=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ce(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',Nv={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},ge=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...Nv}),e.end(JSON.stringify(r))},Ee=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},tr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},x9=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=W9(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${ce(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=fv(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${pl(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${ce(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ce(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ce(Mv(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ce(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},wF=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},_F=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,CF)},Wc=e=>{let t=Ov.default.join(e.layout.installDir,"link-code.txt"),r=()=>Ie(e.layout.installDir),o=()=>{let f=r();return{installBundleVersion:cf(f),installBundleUpdatedAt:f?.updatedAt??null,installVersion:f}},n=async f=>{let y=f.installVersion??r(),p=await i(),A=WP(p),b=f.updateFlash??null,h=TP(b),w=T9(b,f.updateError??null);return LP({title:f.title,activePath:f.activePath,body:f.body,cloudAppOrigin:Ot(y),installBundleVersionLabel:cf(y),prependBody:`${h}${w}${A}`,headerUpdateButtonHtml:kP(p)})},s=null,i=async()=>{let f=Date.now();if(s!==null&&f-s.cachedAtMs<6e4)return s.offer;let y=await gv(e.layout);return s={cachedAtMs:f,offer:y},y},a=()=>{s=null},c=!1,d=async f=>{if(a(),!(await i()).updateAvailable){f.writeHead(303,{Location:"/?update=ok"}),f.end();return}if(c){f.writeHead(303,{Location:Iv("An update is already running.")}),f.end();return}c=!0;try{let p=await Sv(),A=p.ok?"/?update=ok":Iv(p.message);f.writeHead(303,{Location:A}),f.end()}catch(p){let A=p instanceof Error&&p.message.trim().length>0?p.message:"Install bundle update failed.";f.writeHead(303,{Location:Iv(A)}),f.end()}finally{c=!1,a()}},u=async(f,y)=>{let p=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",A=o(),b=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:A.installVersion,body:`<section class="card">
      <h1>${ce(y)}</h1>
      <p>${ce(p)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});f.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),f.end(b)},m=()=>{if(kc.default.existsSync(t))return kc.default.readFileSync(t,"utf8").trim();let f=Math.random().toString(36).slice(2,8).toUpperCase();return kc.default.writeFileSync(t,f,"utf8"),f},S=vF.default.createServer((f,y)=>{(async()=>{let p=f.url?.split("?")[0]??"/",A=f.method??"GET";if(A==="OPTIONS"){y.writeHead(204,Nv),y.end();return}if(!await $_({method:A,pathname:p,request:f,response:y,requestUrl:f.url??"/",storePath:pH(Ov.default.dirname(e.layout.configPath)),readBody:tr,sendHtml:Ee,renderShell:n})){if(A==="GET"&&p==="/health"){let b=e.controllers.getStatus(),h=o();ge(y,200,{ok:!0,...b,installBundleVersion:h.installBundleVersion,installBundleUpdatedAt:h.installBundleUpdatedAt});return}if(A==="GET"&&p==="/api/status"){let b=o();ge(y,200,{...e.controllers.getStatus(),linkCode:m(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt});return}if(A==="GET"&&p==="/api/traffic"){ge(y,200,{entries:cl(e.layout)});return}if(A==="DELETE"&&p==="/api/traffic"||A==="POST"&&p==="/api/traffic/clear"){if(Ub(e.layout),A==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}ge(y,200,{ok:!0});return}if(A==="GET"&&p==="/api/trace"){ge(y,200,{entries:Sm(e.layout)});return}if(A==="DELETE"&&p==="/api/trace"||A==="POST"&&p==="/api/trace/clear"){if(qb(e.layout),A==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}ge(y,200,{ok:!0});return}if(A==="POST"&&p==="/api/errors/clear"){Vb(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(A==="GET"&&p==="/api/knowledge"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(h.length>0){let w=await Rs({layout:e.layout,query:h,limit:20});ge(y,200,{chunks:w,query:h});return}ge(y,200,{chunks:xs(e.layout).slice(-50).reverse()});return}if(A==="POST"&&p==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(A==="GET"&&p==="/api/update-status"){let b=await i();ge(y,200,{ok:!0,...b});return}if((A==="GET"||A==="POST")&&p==="/api/update"){await d(y);return}if(A==="GET"&&p==="/"){let b=e.controllers.getStatus(),h=o(),w=eo(e.layout),_=Am(e.layout.errorLogPath);Ee(y,await n({title:"Home",activePath:"/",installVersion:h.installVersion,updateFlash:wF(f.url??void 0),updateError:_F(f.url??void 0),body:EP({wsConnected:b.wsConnected,lastHeartbeatAt:b.lastHeartbeatAt,installBundleVersion:h.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:xs(e.layout).length,trafficEntryCount:cl(e.layout).length,wakeError:b.wakeError,errorLogByteSize:_.byteSize,errorLogExists:_.exists})}));return}if(A==="GET"&&p==="/task"){let b=e.controllers.getStatus(),h=o(),w=H(),_=new URL(f.url??"/",`http://127.0.0.1:${43347}`),C=_.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,L=_.searchParams.get("failed")==="1"?_.searchParams.get("error")?.trim()??"Task failed.":null,k=_.searchParams.get("runId");Ee(y,await n({title:"Task",activePath:"/task",installVersion:h.installVersion,body:H_({defaultWorkspace:w?.workspace??"",wsConnected:b.wsConnected,flashMessage:C,flashError:L,lastRunId:k})}));return}if(A==="POST"&&p==="/task/dispatch"){let b=await tr(f),h=new URLSearchParams(b),w=h.get("prompt")?.trim()??"",_=h.get("writerAgent")?.trim()??"claude-cli",C=h.get("projectFolder")?.trim()??"",L=await Pv({prompt:w,writerAgent:_,...C.length>0?{projectFolderPath:C}:{}}),k=new URLSearchParams;L.ok?k.set("ok","1"):(k.set("failed","1"),L.errorMessage!==void 0&&k.set("error",L.errorMessage.slice(0,240))),L.agentRunId!==void 0&&k.set("runId",L.agentRunId),y.writeHead(303,{Location:`/task?${k.toString()}`}),y.end();return}if(A==="GET"&&p==="/writer-sessions"){let b=o(),h=rf(e.layout,12);Ee(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:b.installVersion,updateFlash:wF(f.url??void 0),updateError:_F(f.url??void 0),body:K_({sessions:h})}));return}if(A==="GET"&&p==="/errors"){let b=o(),h=Am(e.layout.errorLogPath);Ee(y,await n({title:"Errors",activePath:"/errors",installVersion:b.installVersion,body:Jb({errorLogPath:e.layout.errorLogPath,content:h.content,exists:h.exists,truncated:h.truncated,byteSize:h.byteSize,cleared:new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(A==="GET"&&p==="/status"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=e.controllers.getStatus(),w=ke(e.layout),_=w!==null?He(w,12e4):Qb(h.lastHeartbeatAt,12e4),C=eP({lastHeartbeatAt:h.lastHeartbeatAt,heartbeatIsStale:_}),L=o();Ee(y,await n({title:"Status",activePath:"/status",installVersion:L.installVersion,body:`${x9({status:h,healthBadge:C,revived:b.searchParams.get("revived")==="1",linkCode:m(),installBundleVersion:L.installBundleVersion,installBundleUpdatedAt:L.installBundleUpdatedAt})}${oP({installDir:e.layout.installDir})}${rP({entries:Sm(e.layout)})}`}));return}if(A==="GET"&&p==="/traffic"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=cl(e.layout),w=o(),_=h.map(k=>`<tr><td title="${ce(k.at)}">${ce(Mv(k.at))}</td><td>${ce(k.direction)}</td><td><code>${ce(k.type)}</code></td><td>${ce(k.summary)}</td><td>${ce(k.action??"")}</td></tr>`).join(""),C=h.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${_}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',L=b.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Ee(y,await n({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${L}
              ${C}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(A==="GET"&&p==="/projects"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=o(),w=Ot(h.installVersion),_=await pf(e.layout),C=b.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":b.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,L=b.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,k=H(),x=k===null?null:Y({wsUrl:k.wsUrl,pairingToken:k.pairingToken}),I=x===null?{}:Object.fromEntries((await Promise.all(_.projects.map(async M=>{let F=await uv(x,M.id);return[M.id,F?.counts??null]}))).filter(M=>M[1]!==null));Ee(y,await n({title:"Projects",activePath:"/projects",installVersion:h.installVersion,body:pv({projects:_.projects,compositionCountsByProjectId:I,cloudAppOrigin:w,syncMessage:_.message,syncOk:_.ok,flashMessage:L,flashError:C})}));return}if(A==="GET"&&p==="/projects/select-folder"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=H(),_=w===null?null:Y({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),C=h.length>0&&_!==null?ro():null;if(C===null||_===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(et({projectFolderPath:C}),!await Ba(_,h,C)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(h)}&folderUpdated=1`}),y.end();return}if(A==="POST"&&p==="/projects/delete"){let b=await tr(f),h=new URLSearchParams(b).get("projectId")?.trim()??"",w=H(),_=w===null?null:Y({wsUrl:w.wsUrl,pairingToken:w.pairingToken});if(_===null||h.length===0){y.writeHead(303,{Location:"/projects?deleteError=1"}),y.end();return}let C=await HA(_,h);y.writeHead(303,{Location:C.ok?"/projects?deleted=1":"/projects?deleteError=1"}),y.end();return}if(A==="GET"&&p==="/project"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=b.searchParams.get("id")?.trim()??"",w=o(),_=Ot(w.installVersion),C=await pf(e.layout),L=Xo(C.projects,h);if(L===null){await u(y,"Project not found");return}let k=b.searchParams.get("linked")==="1"?b.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${b.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${b.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:b.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,x=b.searchParams.get("knowledgePromoted"),I=x!==null?`Marked ${x} lesson(s) as promoted in Agent Witch.`:null,M=b.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,F=b.searchParams.get("tab")?.trim()??"harness",q=F==="workflows"||F==="agents"||F==="knowledge"?F:"harness",B=H(),Ue=B===null?null:Y({wsUrl:B.wsUrl,pairingToken:B.pairingToken}),$=Ue===null?null:await uv(Ue,L.id),we=0;if(Ue!==null)try{let Hr=await fetch(`${Ue.appOrigin}/api/agent-witch/projects/${encodeURIComponent(L.id)}/knowledge`,{method:"GET",headers:{[Me]:Ue.pairingToken},signal:AbortSignal.timeout(1e4)});if(Hr.ok){let nr=await Hr.json();typeof nr=="object"&&nr!==null&&typeof nr.candidateCount=="number"&&(we=nr.candidateCount)}}catch{we=0}Ee(y,await n({title:L.name,activePath:"/projects",installVersion:w.installVersion,body:Ss({project:L,cloudAppOrigin:_,installed:eo(e.layout),linkedSetSlugs:Zr(L.projectFolderPath),composition:$,knowledgeCandidateCount:we,activeTab:q,flashMessage:k??I,flashError:M})}));return}if(A==="POST"&&p==="/projects/pull-bound-harness"){let b=await tr(f),h=await IA({rawBody:b,layout:e.layout});if(h.kind==="not_found"){await u(y,"Project not found");return}if(h.kind==="redirect"){y.writeHead(303,{Location:h.location}),y.end();return}let w=o();Ee(y,await n({title:h.title,activePath:"/projects",installVersion:w.installVersion,body:h.body}));return}if(A==="POST"&&p==="/projects/link-harness"){let b=await tr(f),h=new URLSearchParams(b),w=h.get("projectId")?.trim()??"",_=await pf(e.layout),C=Xo(_.projects,w);if(C===null){await u(y,"Project not found");return}let L=h.getAll("applySet").map(q=>String(q)),k=xa({layout:e.layout,projectFolderPath:C.projectFolderPath,setSlugs:L});if(!k.ok){let q=o(),B=Ot(q.installVersion);Ee(y,await n({title:C.name,activePath:"/projects",installVersion:q.installVersion,body:Ss({project:C,cloudAppOrigin:B,installed:eo(e.layout),linkedSetSlugs:Zr(C.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:k.errorMessage})}));return}let x=H(),I=x===null?null:Y({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),M=I===null?!1:await Fa(I,C.id,k.appliedSetSlugs),F=new URLSearchParams({linked:"1",files:String(k.writtenFileCount),bindingsSynced:M?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(C.id)}&${F.toString()}`}),y.end();return}if(A==="POST"&&p==="/project/knowledge/promote-all"){let b=await tr(f),w=new URLSearchParams(b).get("projectId")?.trim()??"",_=await pf(e.layout),C=Xo(_.projects,w);if(C===null){await u(y,"Project not found");return}let L=H(),k=L===null?null:Y({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),x=k===null?{ok:!1,promotedCount:0}:await eF(k,C.id),I=new URLSearchParams({tab:"knowledge",...x.ok?{knowledgePromoted:String(x.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(C.id)}&${I.toString()}`}),y.end();return}if(A==="GET"&&p==="/harness"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=o(),w=Ma(e.layout),_=b.searchParams.get("submitted")==="1",C=_?b.searchParams.get("syncFailed")==="1"?`Local harness updated (${b.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:b.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${b.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":b.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:b.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,L=w?.scanRoots[0]??Wp(),k=k9(e.layout,{reveal:w,importQuery:b.searchParams.get("import")==="1",justSubmitted:_}),x=Ot(h.installVersion);Ee(y,await n({title:"Harness",activePath:"/harness",installVersion:h.installVersion,body:Lc(Rv(e.layout,{cloudAppOrigin:x,reveal:w,scanFolder:L,flashMessage:C,importSectionExpanded:k}))}));return}if(A==="POST"&&p==="/api/harness/pick-folder"){let b=ro();if(b===null){ge(y,200,{cancelled:!0});return}ge(y,200,{path:b});return}if(A==="GET"&&p==="/api/harness/file-content"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=Ea(h);if(w===null){ge(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let _=kc.default.readFileSync(w,"utf8"),C=_.length>PF?`${_.slice(0,PF)}
\u2026 (truncated)`:_;ge(y,200,{content:C})}catch{ge(y,500,{errorMessage:"Could not read file."})}return}if(A==="POST"&&p==="/api/harness/reveal/add-project"){let b=await tr(f),h="";try{let C=JSON.parse(b);typeof C=="object"&&C!==null&&typeof C.projectPath=="string"&&(h=C.projectPath.trim())}catch{ge(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(h.length===0){ge(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=Ma(e.layout),_=uA({reveal:w,projectPath:h});if(_===null||_.sets.length===0){ge(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Rp(e.layout,_),ge(y,200,{ok:!0,setCount:_.sets.length});return}if(A==="GET"&&p==="/api/harness/reveal/stream"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(h.length===0){ge(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;f.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...Nv});let _=pA({scanRoot:h,response:y,shouldAbort:()=>w});Rp(e.layout,_),y.end();return}if(A==="POST"&&p==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(A==="POST"&&p==="/harness/submit"){let b=Ma(e.layout);if(b===null){let x=o(),I=Ot(x.installVersion);Ee(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Lc(Rv(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let h=await tr(f),w=new URLSearchParams(h),_=dv(w,b),C=gA({layout:e.layout,sets:_});if(!C.ok){let x=o(),I=Ot(x.installVersion);Ee(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Lc(Rv(e.layout,{cloudAppOrigin:I,reveal:b,flashError:C.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}hA(e.layout);let k=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${C.writtenItemCount??0}${k}`}),y.end();return}if(A==="GET"&&p==="/writer-api"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),w=H()?.writerExecutionBackend??Oe(void 0),_=Ce(e.layout.configPath),C=Kr(_),L=b.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,k=o();Ee(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:k.installVersion,body:lv({writerExecutionBackend:w,secrets:C,flashMessage:L})}));return}if(A==="POST"&&p==="/writer-api"){let b=await tr(f),h=new URLSearchParams(b),w=h.get("writerExecutionBackend")?.trim()??"cli";wS({configPath:e.layout.configPath,writerExecutionBackend:Oe(w),anthropicApiKey:h.get("anthropicApiKey")??void 0,anthropicModel:h.get("anthropicModel")??void 0,openaiApiKey:h.get("openaiApiKey")??void 0,openaiModel:h.get("openaiModel")??void 0,googleApiKey:h.get("googleApiKey")??void 0,googleModel:h.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(A==="GET"&&p==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(A==="GET"&&p==="/history"){let b=o();Ee(y,await n({title:"History",activePath:"/history",installVersion:b.installVersion,body:V_({reportsDir:e.layout.reportsDir})}));return}if(A==="GET"&&p==="/knowledge"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=o(),_=dP({layout:e.layout}),C=mP(_),L=h.length>0?await Rs({layout:e.layout,query:h,limit:20}):xs(e.layout).slice(-50).reverse(),k=L.map(I=>{let M=pP(_,I.id),F=M>0?` \xB7 used in ${M} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ce(I.createdAt)}">${ce(Mv(I.createdAt))}${I.source?` \xB7 ${ce(I.source)}`:""}${F}</div><pre>${ce(I.text)}</pre></article>`}).join(""),x=C.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${C.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${ce(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Ee(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ce(h)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${x}${k}${E9(h,L.length)}`}));return}A==="POST"&&await tr(f),await u(y,"Not found")}})().catch(p=>{console.error("[agent-witch-local-app]",p),y.writeHead(500),y.end("Internal error")})});return S.on("error",f=>{if(f.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",f)}),S.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${ur}`)}),S},Tc=e=>uf(e).publicKeyRaw});var mf=l(()=>{"use strict";gI();fI();LF()});var WF={};Nt(WF,{runAgentWitchExternalLiveCli:()=>I9});var zv,kF,R9,I9,TF=l(()=>{"use strict";zv=g(require("node:fs")),kF=g(require("node:path"));Ps();J();re();mf();re();R9=e=>{let t=kF.default.join(e,"link-code.txt");if(!zv.default.existsSync(t))return null;let r=zv.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},I9=()=>{Xe("agent-witch-live");let e=W(),t=N(),r=R9(e),o=Tc(t);Wc({layout:t,controllers:{getStatus:()=>{let n=ke(t);return{wsConnected:Qa(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{To(e)}}})}});var Or=v((rIe,RF)=>{"use strict";var EF=["nodebuffer","arraybuffer","fragments"],xF=typeof Blob<"u";xF&&EF.push("blob");RF.exports={BINARY_TYPES:EF,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:xF,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Ec=v((oIe,gf)=>{"use strict";var{EMPTY_BUFFER:O9}=Or(),Dv=Buffer[Symbol.species];function M9(e,t){if(e.length===0)return O9;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new Dv(r.buffer,r.byteOffset,o):r}function IF(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function OF(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function N9(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function jv(e){if(jv.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Dv(e):ArrayBuffer.isView(e)?t=new Dv(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),jv.readOnly=!1),t}gf.exports={concat:M9,mask:IF,toArrayBuffer:N9,toBuffer:jv,unmask:OF};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");gf.exports.mask=function(t,r,o,n,s){s<48?IF(t,r,o,n,s):e.mask(t,r,o,n,s)},gf.exports.unmask=function(t,r){t.length<32?OF(t,r):e.unmask(t,r)}}catch{}});var zF=v((nIe,NF)=>{"use strict";var MF=Symbol("kDone"),$v=Symbol("kRun"),Hv=class{constructor(t){this[MF]=()=>{this.pending--,this[$v]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[$v]()}[$v](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[MF])}}};NF.exports=Hv});var pi=v((sIe,HF)=>{"use strict";var xc=require("zlib"),DF=Ec(),z9=zF(),{kStatusCode:jF}=Or(),D9=Buffer[Symbol.species],j9=Buffer.from([0,0,255,255]),hf=Symbol("permessage-deflate"),Mr=Symbol("total-length"),di=Symbol("callback"),fo=Symbol("buffers"),ui=Symbol("error"),ff,Fv=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!ff){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;ff=new z9(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[di];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){ff.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){ff.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?xc.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=xc.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[hf]=this,this._inflate[Mr]=0,this._inflate[fo]=[],this._inflate.on("error",H9),this._inflate.on("data",$F)}this._inflate[di]=o,this._inflate.write(t),r&&this._inflate.write(j9),this._inflate.flush(()=>{let s=this._inflate[ui];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=DF.concat(this._inflate[fo],this._inflate[Mr]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Mr]=0,this._inflate[fo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?xc.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=xc.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Mr]=0,this._deflate[fo]=[],this._deflate.on("data",$9)}this._deflate[di]=o,this._deflate.write(t),this._deflate.flush(xc.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=DF.concat(this._deflate[fo],this._deflate[Mr]);r&&(s=new D9(s.buffer,s.byteOffset,s.length-4)),this._deflate[di]=null,this._deflate[Mr]=0,this._deflate[fo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};HF.exports=Fv;function $9(e){this[fo].push(e),this[Mr]+=e.length}function $F(e){if(this[Mr]+=e.length,this[hf]._maxPayload<1||this[Mr]<=this[hf]._maxPayload){this[fo].push(e);return}this[ui]=new RangeError("Max payload size exceeded"),this[ui].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[ui][jF]=1009,this.removeListener("data",$F),this.reset()}function H9(e){if(this[hf]._inflate=null,this[ui]){this[di](this[ui]);return}e[jF]=1007,this[di](e)}});var mi=v((iIe,yf)=>{"use strict";var{isUtf8:FF}=require("buffer"),{hasBlob:F9}=Or(),U9=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function B9(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Uv(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function G9(e){return F9&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}yf.exports={isBlob:G9,isValidStatusCode:B9,isValidUTF8:Uv,tokenChars:U9};if(FF)yf.exports.isValidUTF8=function(e){return e.length<24?Uv(e):FF(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");yf.exports.isValidUTF8=function(t){return t.length<32?Uv(t):e(t)}}catch{}});var Kv=v((aIe,JF)=>{"use strict";var{Writable:q9}=require("stream"),UF=pi(),{BINARY_TYPES:V9,EMPTY_BUFFER:BF,kStatusCode:K9,kWebSocket:J9}=Or(),{concat:Bv,toArrayBuffer:Y9,unmask:X9}=Ec(),{isValidStatusCode:Z9,isValidUTF8:GF}=mi(),Sf=Buffer[Symbol.species],pt=0,qF=1,VF=2,KF=3,Gv=4,qv=5,Af=6,Vv=class extends q9{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||V9[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[J9]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=pt}_write(t,r,o){if(this._opcode===8&&this._state==pt)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new Sf(o.buffer,o.byteOffset+t,o.length-t),new Sf(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new Sf(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case pt:this.getInfo(t);break;case qF:this.getPayloadLength16(t);break;case VF:this.getPayloadLength64(t);break;case KF:this.getMask();break;case Gv:this.getData(t);break;case qv:case Af:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[UF.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=qF:this._payloadLength===127?this._state=VF:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=KF:this._state=Gv}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=Gv}getData(t){let r=BF;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&X9(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=qv,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[UF.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===pt&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=pt;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=Bv(o,r):this._binaryType==="arraybuffer"?n=Y9(Bv(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=pt):(this._state=Af,setImmediate(()=>{this.emit("message",n,!0),this._state=pt,this.startLoop(t)}))}else{let n=Bv(o,r);if(!this._skipUTF8Validation&&!GF(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===qv||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=pt):(this._state=Af,setImmediate(()=>{this.emit("message",n,!1),this._state=pt,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,BF),this.end();else{let o=t.readUInt16BE(0);if(!Z9(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new Sf(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!GF(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=pt;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=pt):(this._state=Af,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=pt,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[K9]=n,i}};JF.exports=Vv});var Xv=v((cIe,ZF)=>{"use strict";var{Duplex:lIe}=require("stream"),{randomFillSync:Q9}=require("crypto"),{types:{isUint8Array:eY}}=require("util"),YF=pi(),{EMPTY_BUFFER:tY,kWebSocket:rY,NOOP:oY}=Or(),{isBlob:gi,isValidStatusCode:nY}=mi(),{mask:XF,toBuffer:Tn}=Ec(),mt=Symbol("kByteLength"),sY=Buffer.alloc(4),bf=8*1024,En,fi=bf,Mt=0,iY=1,aY=2,Jv=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Mt,this.onerror=oY,this[rY]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||sY,r.generateMask?r.generateMask(o):(fi===bf&&(En===void 0&&(En=Buffer.alloc(bf)),Q9(En,0,bf),fi=0),o[0]=En[fi++],o[1]=En[fi++],o[2]=En[fi++],o[3]=En[fi++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[mt]!==void 0?a=r[mt]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(XF(t,o,d,s,a),[d]):(XF(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=tY;else{if(typeof t!="number"||!nY(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(eY(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[mt]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Mt?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):gi(t)?(n=t.size,s=!1):(t=Tn(t),n=t.length,s=Tn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[mt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};gi(t)?this._state!==Mt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Mt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):gi(t)?(n=t.size,s=!1):(t=Tn(t),n=t.length,s=Tn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[mt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};gi(t)?this._state!==Mt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Mt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[YF.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):gi(t)?(a=t.size,c=!1):(t=Tn(t),a=t.length,c=Tn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[mt]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};gi(t)?this._state!==Mt?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Mt?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[mt],this._state=aY,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(Yv,this,a,n);return}this._bufferedBytes-=o[mt];let i=Tn(s);r?this.dispatch(i,r,o,n):(this._state=Mt,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(lY,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[YF.extensionName];this._bufferedBytes+=o[mt],this._state=iY,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");Yv(this,c,n);return}this._bufferedBytes-=o[mt],this._state=Mt,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Mt&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][mt],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][mt],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};ZF.exports=Jv;function Yv(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function lY(e,t,r){Yv(e,t,r),e.onerror(t)}});var a1=v((dIe,i1)=>{"use strict";var{kForOnEventAttribute:Rc,kListener:Zv}=Or(),QF=Symbol("kCode"),e1=Symbol("kData"),t1=Symbol("kError"),r1=Symbol("kMessage"),o1=Symbol("kReason"),hi=Symbol("kTarget"),n1=Symbol("kType"),s1=Symbol("kWasClean"),Nr=class{constructor(t){this[hi]=null,this[n1]=t}get target(){return this[hi]}get type(){return this[n1]}};Object.defineProperty(Nr.prototype,"target",{enumerable:!0});Object.defineProperty(Nr.prototype,"type",{enumerable:!0});var xn=class extends Nr{constructor(t,r={}){super(t),this[QF]=r.code===void 0?0:r.code,this[o1]=r.reason===void 0?"":r.reason,this[s1]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[QF]}get reason(){return this[o1]}get wasClean(){return this[s1]}};Object.defineProperty(xn.prototype,"code",{enumerable:!0});Object.defineProperty(xn.prototype,"reason",{enumerable:!0});Object.defineProperty(xn.prototype,"wasClean",{enumerable:!0});var yi=class extends Nr{constructor(t,r={}){super(t),this[t1]=r.error===void 0?null:r.error,this[r1]=r.message===void 0?"":r.message}get error(){return this[t1]}get message(){return this[r1]}};Object.defineProperty(yi.prototype,"error",{enumerable:!0});Object.defineProperty(yi.prototype,"message",{enumerable:!0});var Ic=class extends Nr{constructor(t,r={}){super(t),this[e1]=r.data===void 0?null:r.data}get data(){return this[e1]}};Object.defineProperty(Ic.prototype,"data",{enumerable:!0});var cY={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[Rc]&&n[Zv]===t&&!n[Rc])return;let o;if(e==="message")o=function(s,i){let a=new Ic("message",{data:i?s:s.toString()});a[hi]=this,Pf(t,this,a)};else if(e==="close")o=function(s,i){let a=new xn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[hi]=this,Pf(t,this,a)};else if(e==="error")o=function(s){let i=new yi("error",{error:s,message:s.message});i[hi]=this,Pf(t,this,i)};else if(e==="open")o=function(){let s=new Nr("open");s[hi]=this,Pf(t,this,s)};else return;o[Rc]=!!r[Rc],o[Zv]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[Zv]===t&&!r[Rc]){this.removeListener(e,r);break}}};i1.exports={CloseEvent:xn,ErrorEvent:yi,Event:Nr,EventTarget:cY,MessageEvent:Ic};function Pf(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var wf=v((uIe,l1)=>{"use strict";var{tokenChars:Oc}=mi();function rr(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function dY(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,u=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(u===-1&&Oc[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let f=e.slice(c,u);d===44?(rr(t,f,r),r=Object.create(null)):i=f,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(u===-1&&Oc[d]===1)c===-1&&(c=m);else if(d===32||d===9)u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m),rr(r,e.slice(c,u),!0),d===44&&(rr(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)a=e.slice(c,m),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if(Oc[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if(Oc[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,u=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(u===-1&&Oc[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))u===-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let f=e.slice(c,u);o&&(f=f.replace(/\\/g,""),o=!1),rr(r,a,f),d===44&&(rr(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=m);let S=e.slice(c,u);return i===void 0?rr(t,S,r):(a===void 0?rr(r,S,!0):o?rr(r,a,S.replace(/\\/g,"")):rr(r,a,S),rr(t,i,r)),t}function uY(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}l1.exports={format:uY,parse:dY}});var Lf=v((gIe,b1)=>{"use strict";var pY=require("events"),mY=require("https"),gY=require("http"),u1=require("net"),fY=require("tls"),{randomBytes:hY,createHash:yY}=require("crypto"),{Duplex:pIe,Readable:mIe}=require("stream"),{URL:Qv}=require("url"),ho=pi(),SY=Kv(),AY=Xv(),{isBlob:bY}=mi(),{BINARY_TYPES:c1,CLOSE_TIMEOUT:PY,EMPTY_BUFFER:_f,GUID:wY,kForOnEventAttribute:eC,kListener:_Y,kStatusCode:vY,kWebSocket:Pe,NOOP:p1}=Or(),{EventTarget:{addEventListener:CY,removeEventListener:LY}}=a1(),{format:kY,parse:WY}=wf(),{toBuffer:TY}=Ec(),m1=Symbol("kAborted"),tC=[8,13],zr=["CONNECTING","OPEN","CLOSING","CLOSED"],EY=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,X=class e extends pY{constructor(t,r,o){super(),this._binaryType=c1[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=_f,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),g1(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){c1.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new SY({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new AY(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[Pe]=this,s[Pe]=this,t[Pe]=this,n.on("conclude",IY),n.on("drain",OY),n.on("error",MY),n.on("message",NY),n.on("ping",zY),n.on("pong",DY),s.onerror=jY,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",y1),t.on("data",Cf),t.on("end",S1),t.on("error",A1),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[ho.extensionName]&&this._extensions[ho.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){st(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,h1(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){rC(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||_f,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){rC(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||_f,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){rC(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[ho.extensionName]||(n.compress=!1),this._sender.send(t||_f,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){st(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(X,"CONNECTING",{enumerable:!0,value:zr.indexOf("CONNECTING")});Object.defineProperty(X.prototype,"CONNECTING",{enumerable:!0,value:zr.indexOf("CONNECTING")});Object.defineProperty(X,"OPEN",{enumerable:!0,value:zr.indexOf("OPEN")});Object.defineProperty(X.prototype,"OPEN",{enumerable:!0,value:zr.indexOf("OPEN")});Object.defineProperty(X,"CLOSING",{enumerable:!0,value:zr.indexOf("CLOSING")});Object.defineProperty(X.prototype,"CLOSING",{enumerable:!0,value:zr.indexOf("CLOSING")});Object.defineProperty(X,"CLOSED",{enumerable:!0,value:zr.indexOf("CLOSED")});Object.defineProperty(X.prototype,"CLOSED",{enumerable:!0,value:zr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(X.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(X.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[eC])return t[_Y];return null},set(t){for(let r of this.listeners(e))if(r[eC]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[eC]:!0})}})});X.prototype.addEventListener=CY;X.prototype.removeEventListener=LY;b1.exports=X;function g1(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:PY,protocolVersion:tC[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!tC.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${tC.join(", ")})`);let s;if(t instanceof Qv)s=t;else try{s=new Qv(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let p=new SyntaxError(c);if(e._redirects===0)throw p;vf(e,p);return}let d=i?443:80,u=hY(16).toString("base64"),m=i?mY.request:gY.request,S=new Set,f;if(n.createConnection=n.createConnection||(i?RY:xY),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(f=new ho({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=kY({[ho.extensionName]:f.offer()})),r.length){for(let p of r){if(typeof p!="string"||!EY.test(p)||S.has(p))throw new SyntaxError("An invalid or duplicated subprotocol was specified");S.add(p)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let p=n.path.split(":");n.socketPath=p[0],n.path=p[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let p=o&&o.headers;if(o={...o,headers:{}},p)for(let[A,b]of Object.entries(p))o.headers[A.toLowerCase()]=b}else if(e.listenerCount("redirect")===0){let p=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!p||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,p||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=m(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=m(n);n.timeout&&y.on("timeout",()=>{st(e,y,"Opening handshake has timed out")}),y.on("error",p=>{y===null||y[m1]||(y=e._req=null,vf(e,p))}),y.on("response",p=>{let A=p.headers.location,b=p.statusCode;if(A&&n.followRedirects&&b>=300&&b<400){if(++e._redirects>n.maxRedirects){st(e,y,"Maximum redirects exceeded");return}y.abort();let h;try{h=new Qv(A,t)}catch{let _=new SyntaxError(`Invalid URL: ${A}`);vf(e,_);return}g1(e,h,r,o)}else e.emit("unexpected-response",y,p)||st(e,y,`Unexpected server response: ${p.statusCode}`)}),y.on("upgrade",(p,A,b)=>{if(e.emit("upgrade",p),e.readyState!==X.CONNECTING)return;y=e._req=null;let h=p.headers.upgrade;if(h===void 0||h.toLowerCase()!=="websocket"){st(e,A,"Invalid Upgrade header");return}let w=yY("sha1").update(u+wY).digest("base64");if(p.headers["sec-websocket-accept"]!==w){st(e,A,"Invalid Sec-WebSocket-Accept header");return}let _=p.headers["sec-websocket-protocol"],C;if(_!==void 0?S.size?S.has(_)||(C="Server sent an invalid subprotocol"):C="Server sent a subprotocol but none was requested":S.size&&(C="Server sent no subprotocol"),C){st(e,A,C);return}_&&(e._protocol=_);let L=p.headers["sec-websocket-extensions"];if(L!==void 0){if(!f){st(e,A,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let k;try{k=WY(L)}catch{st(e,A,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(k);if(x.length!==1||x[0]!==ho.extensionName){st(e,A,"Server indicated an extension that was not requested");return}try{f.accept(k[ho.extensionName])}catch{st(e,A,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[ho.extensionName]=f}e.setSocket(A,b,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function vf(e,t){e._readyState=X.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function xY(e){return e.path=e.socketPath,u1.connect(e)}function RY(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=u1.isIP(e.host)?"":e.host),fY.connect(e)}function st(e,t,r){e._readyState=X.CLOSING;let o=new Error(r);Error.captureStackTrace(o,st),t.setHeader?(t[m1]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(vf,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function rC(e,t,r){if(t){let o=bY(t)?t.size:TY(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${zr[e.readyState]})`);process.nextTick(r,o)}}function IY(e,t){let r=this[Pe];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[Pe]!==void 0&&(r._socket.removeListener("data",Cf),process.nextTick(f1,r._socket),e===1005?r.close():r.close(e,t))}function OY(){let e=this[Pe];e.isPaused||e._socket.resume()}function MY(e){let t=this[Pe];t._socket[Pe]!==void 0&&(t._socket.removeListener("data",Cf),process.nextTick(f1,t._socket),t.close(e[vY])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function d1(){this[Pe].emitClose()}function NY(e,t){this[Pe].emit("message",e,t)}function zY(e){let t=this[Pe];t._autoPong&&t.pong(e,!this._isServer,p1),t.emit("ping",e)}function DY(e){this[Pe].emit("pong",e)}function f1(e){e.resume()}function jY(e){let t=this[Pe];t.readyState!==X.CLOSED&&(t.readyState===X.OPEN&&(t._readyState=X.CLOSING,h1(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function h1(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function y1(){let e=this[Pe];if(this.removeListener("close",y1),this.removeListener("data",Cf),this.removeListener("end",S1),e._readyState=X.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[Pe]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",d1),e._receiver.on("finish",d1))}function Cf(e){this[Pe]._receiver.write(e)||this.pause()}function S1(){let e=this[Pe];e._readyState=X.CLOSING,e._receiver.end(),this.end()}function A1(){let e=this[Pe];this.removeListener("error",A1),this.on("error",p1),e&&(e._readyState=X.CLOSING,this.destroy())}});var v1=v((hIe,_1)=>{"use strict";var fIe=Lf(),{Duplex:$Y}=require("stream");function P1(e){e.emit("close")}function HY(){!this.destroyed&&this._writableState.finished&&this.destroy()}function w1(e){this.removeListener("error",w1),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function FY(e,t){let r=!0,o=new $Y({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(P1,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(P1,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",HY),o.on("error",w1),o}_1.exports=FY});var oC=v((yIe,C1)=>{"use strict";var{tokenChars:UY}=mi();function BY(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&UY[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}C1.exports={parse:BY}});var R1=v((AIe,x1)=>{"use strict";var GY=require("events"),kf=require("http"),{Duplex:SIe}=require("stream"),{createHash:qY}=require("crypto"),L1=wf(),Rn=pi(),VY=oC(),KY=Lf(),{CLOSE_TIMEOUT:JY,GUID:YY,kWebSocket:XY}=Or(),ZY=/^[+/0-9A-Za-z]{22}==$/,k1=0,W1=1,E1=2,nC=class extends GY{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:JY,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:KY,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=kf.createServer((o,n)=>{let s=kf.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=QY(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=k1}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===E1){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Mc,this);return}if(t&&this.once("close",t),this._state!==W1)if(this._state=W1,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Mc,this):process.nextTick(Mc,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Mc(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",T1);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){In(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){In(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!ZY.test(s)){In(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){In(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Nc(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=VY.parse(c)}catch{In(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&u!==void 0){let S=new Rn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let f=L1.parse(u);f[Rn.extensionName]&&(S.accept(f[Rn.extensionName]),m[Rn.extensionName]=S)}catch{In(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let S={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(S,(f,y,p,A)=>{if(!f)return Nc(r,y||401,p,A);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(S))return Nc(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[XY])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>k1)return Nc(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${qY("sha1").update(r+YY).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),u._protocol=m)}if(t[Rn.extensionName]){let m=t[Rn.extensionName].params,S=L1.format({[Rn.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${S}`),u._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",T1),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Mc,this)})),a(u,n)}};x1.exports=nC;function QY(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function Mc(e){e._state=E1,e.emit("close")}function T1(){this.destroy()}function Nc(e,t,r,o){r=r||kf.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${kf.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function In(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,In),e.emit("wsClientError",i,r,t)}else Nc(r,o,n,s)}});var eX,tX,rX,oX,nX,sX,I1,iX,zc,O1=l(()=>{eX=g(v1(),1),tX=g(wf(),1),rX=g(pi(),1),oX=g(Kv(),1),nX=g(Xv(),1),sX=g(oC(),1),I1=g(Lf(),1),iX=g(R1(),1),zc=I1.default});var sC,iC,aC=l(()=>{"use strict";sC="AGENT_WITCH_EXTERNAL_BRIDGE",iC="AGENT_WITCH_EXTERNAL_LIVE"});var lC,M1=l(()=>{"use strict";lC=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var aX,cC,N1=l(()=>{"use strict";aC();M1();aX=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",cC=(e={})=>{let t=e.env??process.env,r=lC(t[sC]),o=lC(t[iC]);return{mode:aX(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var z1=l(()=>{"use strict";aC()});var D1=l(()=>{"use strict";N1();z1()});var dC=l(()=>{"use strict"});var Dr,Dc=l(()=>{"use strict";Dr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Si,On,j1,cX,uC,pC,$1,H1,mC,F1,jc,gC=l(()=>{"use strict";Si=g(require("node:fs")),On=g(require("node:os")),j1=g(require("node:path"));dC();Dc();cX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),uC=(e=On.default.hostname())=>j1.default.join(On.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),pC=e=>{if(!Si.default.existsSync(e))return null;try{let t=JSON.parse(Si.default.readFileSync(e,"utf8"));return!cX(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},$1=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},H1=(e,t)=>{Si.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},mC=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??uC(),o=pC(r);if(o!==null&&o.pid!==process.pid&&Dr(o.pid)&&$1(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:On.default.hostname(),macOsUsername:On.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return H1(r,n),{ok:!0}},F1=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??uC(),o=pC(r);return o!==null&&o.pid!==process.pid&&Dr(o.pid)&&$1(o)?{ok:!1}:(H1(r,{hostname:On.default.hostname(),macOsUsername:On.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},jc=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??uC();pC(r)?.pid===process.pid&&Si.default.existsSync(r)&&Si.default.unlinkSync(r)}});var fC,$c,dX,uX,pX,mX,hC,U1=l(()=>{"use strict";fC=require("node:child_process"),$c=g(require("node:path"));Dc();ku();dX=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),uX=(e,t)=>{if(dX(e)||!/\bnode\b/.test(e))return!1;let r=$c.default.resolve(t),o=$c.default.join(r,"app",Bi),n=$c.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Bi||i==="agent-witch.ts")return e.includes(r);try{let a=$c.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},pX=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,fC.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},mX=(e,t,r)=>{let o=pX(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||uX(d,t)&&n.push(c)}return n},hC=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,fC.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=mX(r,e.installDir,t),n=[];for(let s of o)if(Dr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var Hc,Fc,B1,gX,yC,G1=l(()=>{"use strict";Hc=g(require("node:fs")),Fc=g(require("node:path"));Re();B1=(e,t)=>{!Hc.default.existsSync(e)||Hc.default.existsSync(t)||(Hc.default.mkdirSync(Fc.default.dirname(t),{recursive:!0}),Hc.default.renameSync(e,t))},gX=e=>{if(e.profileEmail===null)return;let t=Fc.default.join(e.installDir,ft);B1(Fc.default.join(t,$n),e.mainLogPath),B1(Fc.default.join(t,Hn),e.errorLogPath)},yC=e=>{let t=N();e!==void 0&&t.installDir!==e||gX(t)}});var q1=l(()=>{"use strict";il();hm();hm();!Ze()&&Io(__agentWitchImportMetaUrl)&&(async()=>{Xe("agent-witch-wake-server");let e=await tn(),t=dr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var V1=l(()=>{"use strict";q1()});var K1=l(()=>{"use strict";qa()});var SC,J1=l(()=>{"use strict";dC();V1();gC();K1();SC=async(e={})=>{let t=e.skipInProcessBridge?null:await fm();Kp();let r=setInterval(()=>{Kp()},6e4),o=setInterval(()=>{if(!F1().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var Uc,Wf,yX,Y1,X1,Tf,Z1,Q1,AC,eU,Ef,tU=l(()=>{"use strict";Uc=g(require("node:fs")),Wf=g(require("node:path")),yX="pending-run-inputs.json",Y1=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),X1=e=>{let t=e.profileEmail?Wf.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Wf.default.join(t,yX)},Tf=e=>{let t=X1(e);if(!Uc.default.existsSync(t))return{};try{let r=JSON.parse(Uc.default.readFileSync(t,"utf8"));return Y1(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!Y1(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},Z1=(e,t)=>{let r=X1(e);Uc.default.mkdirSync(Wf.default.dirname(r),{recursive:!0}),Uc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Q1=e=>Object.values(Tf(e)),AC=(e,t)=>Tf(e)[t]!==void 0,eU=(e,t)=>{let r=Tf(e);r[t.agentRunId]=t,Z1(e,r)},Ef=(e,t)=>{let r=Tf(e);delete r[t],Z1(e,r)}});var xf=l(()=>{"use strict";me()});var rU=l(()=>{"use strict";me()});var Rf=l(()=>{"use strict";me()});var If=l(()=>{"use strict";me()});var Bc=l(()=>{"use strict";me()});var SX,AX,Gc,bC=l(()=>{"use strict";wt();xf();rU();Rf();If();Bc();SX={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},AX={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Gc=e=>{if(!de(e.writerAgent))return"the selected writer";let t=Qe(e.writerAgent);if(Oe(e.writerExecutionBackend)==="api"&&t!==null){let r=Ge(Ce(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=pa(t,r.model);return`${AX[t]} model ${o}`}}return SX[e.writerAgent]}});var bX,PX,oU,nU,sU=l(()=>{"use strict";bX=/"input_tokens"\s*:\s*(\d+)/,PX=/"output_tokens"\s*:\s*(\d+)/,oU=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},nU=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=oU(bX.exec(t)),o=oU(PX.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var Of=l(()=>{"use strict";Gt()});var qc,Mf,wX,PC,iU,aU,lU,wC,cU=l(()=>{"use strict";qc=g(require("node:fs")),Mf=g(require("node:path"));Of();wX="run-completion-outbox.json",PC=e=>{let t=e.profileEmail?Mf.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Mf.default.join(t,wX)},iU=e=>{let t=PC(e);if(!qc.default.existsSync(t))return[];try{let r=JSON.parse(qc.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},aU=(e,t)=>{qc.default.mkdirSync(Mf.default.dirname(PC(e)),{recursive:!0}),qc.default.writeFileSync(PC(e),JSON.stringify(t,null,2),"utf8")},lU=(e,t)=>{let r=[...iU(e).filter(o=>o.runId!==t.runId),t];aU(e,r)},wC=async e=>{if(e.cloudApi===null)return;let t=iU(e.layout);if(t.length===0)return;let r=[];for(let o of t)await $a(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);aU(e.layout,r)}});var dU=l(()=>{"use strict"});var _C,Vc,vX,Mn,uU=l(()=>{"use strict";dU();_C=new Map,Vc=e=>{let t=_C.get(e);t!==void 0&&(clearInterval(t),_C.delete(e))},vX=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},Mn=(e,t,r,o={})=>{Vc(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){Vc(t);return}let i=o.onTick?.()??{};vX(e,t,n,i)};s(),_C.set(t,setInterval(s,15e3))}});var pU=l(()=>{"use strict";Gt()});var mU,gU=l(()=>{"use strict";pU();mU=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:it(t)}});var vC,Kc,jr,CC,or,fU,Nf=l(()=>{"use strict";vC=new Set,Kc=new Map,jr=(e,t)=>{if(t.length===0)return;let r=Kc.get(e)??[];r.push(t),Kc.set(e,r)},CC=e=>{vC.add(e);let t=Kc.get(e)??[];return Kc.delete(e),t},or=e=>vC.has(e),fU=e=>{vC.delete(e),Kc.delete(e)}});var Ai,hU,yU,SU=l(()=>{"use strict";Ai=g(require("node:path")),hU=require("node:url");Ro();yU=()=>{if(Ze()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Ai.default.dirname(Ai.default.resolve(e)):Ai.default.dirname(Ai.default.resolve(__filename))}return Ai.default.dirname((0,hU.fileURLToPath)(__agentWitchImportMetaUrl))}});var AU,bU,PU,wU,Ye,bi,_U,vU,Pi,LC,kC,WC,CU,TC,LU,zf=l(()=>{"use strict";AU=require("node:crypto"),bU=g(require("node:fs")),PU=g(require("node:path")),wU=require("node:url");Dc();Ro();SU();Ye=new Map,_U=async()=>{if(bi!==void 0)return bi;try{if(Ze()){let e=yU(),t=PU.default.join(e,"deps","node-pty","lib","index.js");if(bU.default.existsSync(t)){let r=await import((0,wU.pathToFileURL)(t).href);return bi=r,r}}return bi=await import("node-pty"),bi}catch{return bi=null,null}},vU=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Pi=(e,t,r)=>{let o=Ye.get(e);if(o!==void 0){Ye.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},LC=(e,t)=>{let r=Ye.get(e);return r===void 0?!1:(r.pty.write(t),!0)},kC=(e,t,r)=>{let o=Ye.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},WC=e=>{for(let t of Ye.values())if(!(t.mode!=="agent"||t.runId!==e))return Dr(t.pty.pid);return!1},CU=e=>{for(let[t,r]of Ye.entries())if(!(r.mode!=="agent"||r.runId!==e)){Ye.delete(t);try{r.pty.kill()}catch{}return!0}return!1},TC=async e=>{let t=await _U();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;Ye.get(e.shellSessionId)!==void 0&&Pi(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return Ye.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{vU(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{Ye.get(e.shellSessionId)?.pty===n&&(Ye.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},LU=async e=>{let t=e.shellSessionId??(0,AU.randomUUID)(),r=await _U();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return Ye.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{vU(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{Ye.get(t)?.pty===o&&(Ye.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var Df,kU,WU=l(()=>{"use strict";Df="[[AWAITING_INPUT]]",kU=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Df,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Jc,TU,jf=l(()=>{"use strict";WU();Jc=e=>{let t=e.indexOf(Df);if(t<0)return null;let o=e.slice(t+Df.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},TU=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",kU].join(`
`)});var EU,xU=l(()=>{"use strict";Nf();zf();jf();EU=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(or(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}jr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await LU({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Jc(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var RU,IU,OU,$r,$f=l(()=>{"use strict";RU=require("node:child_process"),IU=g(require("node:fs")),OU=g(require("node:path"));ku();$r=(e,t)=>{let r=OU.default.join(e,"app",qW,"ensure-writer.sh");return IU.default.existsSync(r)?new Promise((o,n)=>{let s=(0,RU.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{n(i)}),s.on("close",i=>{if(i===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var MU,Nn,Xc,Hf,EC,Yc,Ff,Uf,xC,RC,CX,wi,LX,kX,IC,OC=l(()=>{"use strict";MU=require("node:child_process");wt();$f();Rf();xf();Bc();If();Nn=new Map,Xc=e=>e==="cursor"||e==="antigravity",Hf=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",EC=e=>Nn.get(e)?.warmed===!0,Yc=e=>{let t=Nn.get(e);Nn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Ff=e=>Nn.get(e)?.conversationStarted===!0,Uf=e=>{let t=Nn.get(e);Nn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},xC=e=>{Nn.delete(e)},RC=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",CX={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},wi=e=>`${CX[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,LX=(e,t,r,o)=>new Promise(n=>{let s=Fu(t,r),i=[],a=(0,MU.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),o?.(u)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),kX=(e,t)=>{let r=wi(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},IC=async e=>{if(!de(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Oe(e.runConfig.writerExecutionBackend)==="api"){let r=Qe(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Ce(e.runConfig.layout.configPath);return Ge(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),Yc(e.writerAgent),{exitCode:0,output:wi(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await $r(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}Xc(e.writerAgent)&&Yc(e.writerAgent);let t=await LX(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?kX(e.writerAgent,t.output):wi(e.writerAgent)}}});var zn,MC=l(()=>{"use strict";zn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var NU,WX,TX,zU,EX,NC,DU=l(()=>{"use strict";MC();NU=/you(?:'|')ve hit your session limit/i,WX=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],TX=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,zU=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},EX=e=>{let t=TX.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},NC=e=>{let t=e.trim();if(t.length===0)return null;if(NU.test(t))return{code:zn.SESSION_LIMIT,resetHint:EX(t),matchedLine:zU(t,NU)};for(let r of WX)if(r.test(t))return{code:zn.PROVIDER_QUOTA,resetHint:null,matchedLine:zU(t,r)};return null}});var Bf,Gf,zC,DC=l(()=>{"use strict";Bf="[[AGENT_RUN_WRITER_EXECUTION]]",Gf="cli-writer-api-key-missing",zC="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var jC=l(()=>{"use strict";DC()});var jU=l(()=>{"use strict";jC()});var qf=l(()=>{"use strict";MC();DU();DC();jC();jU()});var Vf,$U=l(()=>{"use strict";Vf={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var HU,FU=l(()=>{"use strict";HU="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var UU,BU=l(()=>{"use strict";qf();FU();UU=e=>e.code===zn.SESSION_LIMIT?HU:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var GU,qU=l(()=>{"use strict";qf();$U();BU();GU=e=>{let t=NC(e.output);return t!==null?{status:Vf.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:UU(t)}:{status:e.exitCode===0?Vf.COMPLETED:Vf.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var $C,kMe,VU=l(()=>{"use strict";$C={OPEN:"open",APPROVAL:"approval"},kMe=$C.APPROVAL});var _i,Kf,KU,IX,JU,YU,XU,Zc,HC,FC=l(()=>{"use strict";_i=g(require("node:fs")),Kf=g(require("node:path")),KU="runs",IX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),JU=e=>{let t=e.profileEmail!==null?Kf.default.join(e.installDir,"profiles",e.profileEmail,KU):Kf.default.join(e.installDir,KU);return _i.default.mkdirSync(t,{recursive:!0}),t},YU=(e,t)=>Kf.default.join(JU(e),`${t}.json`),XU=(e,t)=>{_i.default.writeFileSync(YU(e,t.id),JSON.stringify(t,null,2))},Zc=(e,t)=>{let r=YU(e,t);if(!_i.default.existsSync(r))return null;try{let o=JSON.parse(_i.default.readFileSync(r,"utf8"));return!IX(o)||typeof o.id!="string"?null:o}catch{return null}},HC=e=>{let t=JU(e),r=_i.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=Zc(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var OX,ZU,QU=l(()=>{"use strict";qU();VU();FC();OX=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=GU({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:$C.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},ZU=(e,t)=>{let r=OX(t);return XU(e,r),r}});var eB=l(()=>{"use strict";af()});var tB,rB=l(()=>{"use strict";qf();tB=()=>[Bf,`agentRunWriterExecutionBackend=${Gf}`,`agentRunWriterExecutionReasonCode=${zC}`].join(`
`)});var yo,Jf=l(()=>{"use strict";yo=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var UC,MX,NX,oB,nB=l(()=>{"use strict";UC=e=>e.toLocaleString("en-US"),MX=e=>e<.01?e.toFixed(4):e.toFixed(3),NX=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${MX(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${UC(e.inputTokens)} in / ${UC(e.outputTokens)} out (${UC(e.totalTokens)} total)`,t].join(`
`)},oB=(e,t)=>{if(t===void 0)return e;let r=NX(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var sB=l(()=>{"use strict";me()});var aB,Qc,fe,BC,Yf,iB,zX,DX,lB,cB,dB,ed,GC,qC,VC,uB,jX,gt,td,So,pB,$X,HX,Xf,KC,JC,YC,mB=l(()=>{"use strict";aB=require("node:child_process");me();wt();tU();bc();bC();sU();ua();cU();Of();uU();Dc();gU();Nf();zf();jf();xU();OC();QU();eB();rB();Jf();nB();es();sB();Bc();Ji();jf();Qc=new Map,fe=new Map,BC=new Set,Yf=new Map,iB=e=>{e!==void 0&&!Yf.has(e)&&Yf.set(e,Date.now())},zX=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(or(t)){gt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}jr(t,n)},DX=(e,t,r,o,n)=>{if(!vS(e,n))return;let s=`${tB()}
`;zX(t,r,o,s);let i=fe.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},lB=130,cB=`

Stopped by user.`,dB=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:yo(e)},ed=null,GC=e=>{ed=e},qC=(e,t)=>{if(ed===null)return;let r=B_(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||_A(ed,t,r)},VC=async e=>{await wC({layout:e,cloudApi:ed})},uB=e=>{let t=Qc.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Dr(t.pid)},jX=e=>ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),gt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},td=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Jn(s),c=fe.get(r);if(a!==null&&c!==void 0){let d=rT(a),u=uB(r)||WC(r);d!==null&&!u&&So(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return tT(a)}}),So=(e,t,r,o,n,s,i,a)=>{let c=is(s,a),d=n,u=oB(c.output,c.llmUsage);if(r!==void 0){let S=Yf.get(r);Yf.delete(r),S!==void 0&&F_({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-S)/1e3))});let f=nU(c.llmUsage,u);f!==null&&_H({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:f})}r!==void 0&&BC.has(r)&&(BC.delete(r),d=lB,u=u.trim().length>0&&!u.includes("Stopped by user.")?`${u.trim()}${cB}`:"Stopped by user.");let m=r!==void 0?B_(e.layout.reportsDir,r):null;if(r!==void 0){Vc(r),Aa(e.layout,r),or(r)&&(gt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),fU(r));let S=fe.get(r);bH({reportsDir:e.layout.reportsDir,agentRunId:r,input:yo(i),output:u,...S!==void 0?{writerLabel:Gc({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&nf({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:u,agentRunId:r}),ZU(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:u,layout:e.layout}),lU(e.layout,{runId:r,exitCode:d,output:u,createdAt:new Date().toISOString(),...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{}}),wC({layout:e.layout,cloudApi:ed}),fe.delete(r),Qc.delete(r),Ef(e.layout,r)}gt(t,{type:"command.claude.result",payload:{exitCode:d,output:u,...r!==void 0?{agentRunId:r}:{},...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),na(e.layout)},pB=(e,t,r,o,n,s,i)=>{let a=fe.get(r),c=a?.accumulatedOutput??s;eU(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),Mn(t,r,()=>AC(e.layout,r),td(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),gt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},$X=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,u=f=>{if(!(n===void 0||f.length===0)){if(or(n)){gt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:f},requestId:o});return}jr(n,f)}};if(n!==void 0){let f=fe.get(n);Qc.set(n,t),fe.set(n,{originalPrompt:s,userTranscriptPrompt:f?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:f?.projectFolderPath,reportKey:f?.reportKey,accumulatedOutput:f?.accumulatedOutput??""}),gt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),Mn(r,n,()=>uB(n),td(e,r,n,o,f?.projectFolderPath,f?.reportKey))}let m=a==="claude-cli",S=[];t.stdout?.on("data",f=>{let y=f.toString("utf8");if(m?S.push(y):(c.push(y),u(y)),d||n===void 0)return;let p=Jc(c.join(""));if(p!==null){d=!0,t.kill("SIGTERM");let A=fe.get(n),b=[A?.accumulatedOutput??"",p.partialOutput].filter(h=>h.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=b),Qc.delete(n),pB(e,r,n,o,p.question,b,s)}}),t.stderr?.on("data",f=>{let y=f.toString("utf8");c.push(y),u(y)}),t.on("close",f=>{if(d)return;Uf(a);let y=n!==void 0?fe.get(n):void 0,p=m?is(S.join("")):{output:c.join("").trim(),llmUsage:void 0},A=m?c.join("").trim():"",b=[p.output.trim(),A].filter(w=>w.length>0).join(`
`);m&&p.output.trim().length>0&&u(p.output);let h=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${b}`.trim():b;So(e,r,n,o,f??-1,h,s,p.llmUsage)}),t.on("error",f=>{d||So(e,r,n,o,-1,f.message,s)})},HX=(e,t,r,o,n,s,i,a,c)=>{let d=dB(r,c);s!==void 0&&(fe.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),gt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),Mn(n,s,()=>fe.has(s),td(e,n,s,o,i,a))),fa(e,t,r,m=>{if(!(s===void 0||m.length===0)){if(or(s)){gt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:m},requestId:o});return}jr(s,m)}}).then(m=>{Uf(t),So(e,n,s,o,m.exitCode,m.output,r,m.llmUsage)}).catch(m=>{let S=m instanceof Error?m.message:String(m);So(e,n,s,o,-1,S,r)})},Xf=(e,t,r,o,n,s,i,a,c,d,u,m)=>{let S=dB(r,u);if(oa(e.layout),Fo(e,t)){iB(s),HX(e,t,r,o,n,s,c,d,S);return}let f=Ft(t,r,jX(e),i);if(f===null){So(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}iB(s);let y=mU({workspace:e.workspace,projectFolderPath:c}),p=()=>{let A=(0,aB.spawn)(f.command,[...f.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:m??process.env});$X(e,A,n,o,s,r,S,t)};if(s===void 0){p();return}fe.set(s,{originalPrompt:r,userTranscriptPrompt:S,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:fe.get(s)?.accumulatedOutput??""}),DX(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Ki({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),Mn(n,s,()=>fe.has(s),td(e,n,s,o,c,d)),EU({socket:n,sendMessage:gt,requestId:o,agentRunId:s,shellSessionId:a,command:f.command,args:f.args,cwd:y,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:A=>{a!==void 0&&Pi(a,w=>{gt(n,w)},o);let b=fe.get(s),h=[b?.accumulatedOutput??"",A.partialOutput].filter(w=>w.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=h),pB(e,n,s,o,A.question,h,r)},onFinished:(A,b)=>{Uf(t);let h=is(b),w=fe.get(s),_=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${h.output}`.trim():h.output;So(e,n,s,o,A,_,r,h.llmUsage)}}).then(A=>{if(!A){p();return}Mn(n,s,()=>WC(s),td(e,n,s,o,c,d))}).catch(A=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",A instanceof Error?A.message:A),p()})},KC=(e,t,r,o)=>{Ef(e.layout,t.agentRunId),t.shellSessionId!==void 0&&gt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=TU(t),s=fe.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;Xf(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},JC=(e,t)=>{for(let r of Q1(e.layout))fe.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:yo(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Mn(t,r.agentRunId,()=>AC(e.layout,r.agentRunId),{awaitingInput:!0}),gt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},YC=(e,t,r,o)=>{let n=fe.get(r);if(n===void 0)return!1;BC.add(r),Vc(r);let s=Qc.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(CU(r))return!0;Ef(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${cB}`:"Stopped by user.";return So(e,t,r,o,lB,i,n.originalPrompt),!0}});var FX,XC,gB=l(()=>{"use strict";va();FX=()=>`http://127.0.0.1:${_t()}/restart`,XC=async()=>{try{let e=await fetch(FX(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var fB=l(()=>{"use strict";ul()});var hB=l(()=>{"use strict";Av()});var yB,SB=l(()=>{"use strict";yB=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var rd,UX,ZC,AB=l(()=>{"use strict";J();re();fB();mb();hB();SB();es();rd=(e,t)=>{oo(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},UX=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Fy(),Hy)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},ZC=async e=>{let t=Ie(e.layout.installDir)?.bundleVersion??null;if(!yB({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(Pt(e.layout)){sa({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),rd(e.layout,{summary:r,action:"install-bundle-update-start"}),cr({launchAgentLabel:_e(e.layout.installDir),installDir:e.layout.installDir});let o=await ci({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),rd(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await UX();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),rd(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),rd(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),rd(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var BX,QC,bB=l(()=>{"use strict";BX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),QC=e=>{if(!BX(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var eL,tL,PB=l(()=>{"use strict";VA();KA();eL=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Va({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},tL=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await yr(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var wB,GX,qX,VX,od,_B=l(()=>{"use strict";wB=g(require("node:os"));Re();GX="Default",qX=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),VX=e=>{let t=wB.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},od=()=>{let e=N(),t=yu(e),r=qX(GX);return`${VX(t)}/${r.length>0?r:"project"}`}});var vB=l(()=>{"use strict";ul()});var CB,rL,LB=l(()=>{"use strict";vB();CB=!1,rL=e=>{CB||(CB=!0,process.on("uncaughtException",t=>{on(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;on(e,{kind:"crash",message:r,stack:o})}))}});var kB,KX,oL,WB=l(()=>{"use strict";kB=require("node:child_process");$f();wt();Rf();xf();Bc();If();KX=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,kB.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},oL=async e=>{if(!de(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Oe(e.runConfig.writerExecutionBackend)==="api"){let r=Qe(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Ce(e.layout.configPath),n=Ge(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await $r(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await KX(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var nL,TB=l(()=>{"use strict";nL=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var EB,sL,xB=l(()=>{"use strict";EB=require("node:crypto"),sL=()=>(0,EB.randomUUID)()});var vi,RB,Zf=l(()=>{"use strict";vi="[[WORKING_ESTIMATE]]",RB=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",vi,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var IB,OB=l(()=>{"use strict";IB=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var JX,MB,NB=l(()=>{"use strict";Zf();JX=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,MB=e=>{if(!e.includes(vi))return null;let t=null;for(let r of e.matchAll(JX)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var YX,iL,zB=l(()=>{"use strict";NB();YX=/^(\d{1,6})\b/,iL=e=>{let t=MB(e);if(t!==null)return t;let r=YX.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var XX,ZX,QX,Qf,aL=l(()=>{"use strict";wt();ll();XX="http://127.0.0.1:11434",ZX=45e3,QX=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Qf=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||XX,o=t===void 0?(await Lt({commands:ue({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(ZX)});return n.ok?QX(await n.json()):null}catch{return null}}});var lL,cL,dL,DB=l(()=>{"use strict";Ji();Zf();Jf();OB();zB();bc();aL();lL=async e=>{let t=yo(e.wrappedPrompt),r=PH(e.reportsDir);return{estimateOutput:await Qf(RB(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},cL=e=>{let t=iL(e.estimateOutput);t!==null&&Xg({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},dL=e=>{let t=iL(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=IB(t);return Vi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:jt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),Xg({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var eh,jB,uL=l(()=>{"use strict";eh="[[WORKING_TOKEN_ESTIMATE]]",jB=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",eh,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var $B,eZ,HB,FB=l(()=>{"use strict";uL();$B=/^(\d{1,8})\b/,eZ=e=>{let t=e.indexOf(eh);if(t<0)return null;let r=e.slice(t+eh.length).trim(),o=$B.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},HB=e=>{let t=eZ(e);if(t!==null)return t;let r=$B.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var pL,mL,UB=l(()=>{"use strict";uL();Jf();FB();bc();aL();pL=async e=>{let t=yo(e.wrappedPrompt),r=vH(e.reportsDir);return{estimateOutput:await Qf(jB(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},mL=e=>{let t=HB(e.estimateOutput);return t===null?null:(wH({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var BB=l(()=>{"use strict";gC();U1();G1();J1();va();mB();$f();wt();FC();Nf();gB();rb();AB();es();bB();PB();Of();_B();LB();WB();Wu();TB();xB();Zf();Ji();DB();UB();bC();ll();zf();OC()});var GB={};Nt(GB,{buildContinuationPromptWithContext:()=>oZ});var tZ,rZ,oZ,qB=l(()=>{"use strict";tZ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,rZ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),oZ=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=rZ(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${tZ(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var VB={};Nt(VB,{readHarnessExportSets:()=>sZ});var nd,gL,th,nZ,sZ,KB=l(()=>{"use strict";nd=g(require("node:fs")),gL=g(require("node:path"));Re();th=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nZ=e=>{if(!nd.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(nd.default.readFileSync(e.harnessManifestPath,"utf8"));if(th(t))return t}catch{return null}return null},sZ=(e,t)=>{let r=N(t),o=nZ(r);if(o===null)return[];let n=th(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!th(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let u of c){if(!th(u))continue;let m=typeof u.path=="string"?u.path:void 0,S=typeof u.id=="string"?u.id:"",f=typeof u.kind=="string"?u.kind:"",y=typeof u.title=="string"?u.title:"";if(m===void 0||S.length===0||f.length===0||y.length===0)continue;let p=m.startsWith("shared/")?gL.default.join(r.harnessRootDir,m):gL.default.join(r.harnessSetsDir,i,m);nd.default.existsSync(p)&&d.push({id:S,kind:f,title:y,content:nd.default.readFileSync(p,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var PL,hL,Ci,JB,iZ,YB,XB,fL,ZB,yL,SL,AL,Z,G,bL,aZ,sd,lZ,cZ,dZ,uZ,pZ,mZ,gZ,fZ,id,QB=l(()=>{"use strict";PL=require("node:child_process"),hL=g(require("node:fs")),Ci=g(require("node:os"));O1();J();re();Ps();xv();D1();me();Ht();ul();wP();mf();af();Gt();Vo();_b();bt();BB();JB=3e4,iZ=3e4,YB=new Map,XB=new Map,fL=new Map,ZB=new Map,yL=new Map,SL=new Map,AL=new Map,Z=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),G=(e,t,r)=>{e.readyState===zc.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(oo(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),ym(r,"out",t)))},bL=e=>e,aZ=e=>{if(!hL.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(hL.default.readFileSync(e.harnessManifestPath,"utf8"));if(Z(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},sd=(e,t)=>{let r=aZ(t);r!==null&&G(e,{type:"harness.manifest.report",payload:{hostname:Ci.default.hostname(),manifest:r}})},lZ=async(e,t,r,o,n,s,i=!1,a,c,d,u,m)=>{let S=m?.trim()??"";if(!de(t)){G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Gc({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await Lt({commands:ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),p=s!==void 0?lL({wrappedPrompt:r,writerLabel:f,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=s!==void 0?pL({wrappedPrompt:r,writerLabel:f,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,b=Xc(t)&&!EC(t);if(b){try{await $r(e.layout.installDir,t)}catch($){let we=$ instanceof Error?$.message:String($);G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${we}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Yc(t)}else if(!Xc(t))try{await $r(e.layout.installDir,t)}catch($){let we=$ instanceof Error?$.message:String($);G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${we}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=ya(d,od,m);if(h===null){G(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}et({projectFolderPath:h,...S.length>0?{projectId:S}:{}}),i||Cc(e.layout,t,h);let w=sf({sessionContinuation:i,supportsWriterSessionContinuation:Hf(t),isWriterConversationStarted:Ff(t)}),_=i&&w==="first"?vc(e.layout,t,h):null,C=_!==null?li(e.layout,_):null,L=C!==null&&C.turns.length>0,k=sv({sessionContinuation:i,supportsWriterSessionContinuation:Hf(t),isWriterConversationStarted:Ff(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:L,userPromptCharacterCount:r.length}),x=r;if(k.continuationStrategy==="source_run_seed"){let $=typeof c=="string"&&c.length>0?Zc(e.layout,c):null;if($!==null){let{buildContinuationPromptWithContext:we}=await Promise.resolve().then(()=>(qB(),GB));x=we({priorPrompt:$.prompt,priorOutput:$.resultOutput??"",userMessage:r})}}else k.continuationStrategy==="transcript_seed"&&C!==null&&C.turns.length>0&&(x=ef({priorTurns:C.turns,userMessage:r}));let I=k.ragLimit>0?await Rs({layout:e.layout,query:x,limit:k.ragLimit,minScore:k.ragMinScore,projectFolderPath:h,...S.length>0?{projectId:S}:{}}):[],M=k.ragLimit>0&&h.trim().length>0?await bP({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:h,...S.length>0?{projectId:S}:{}}):[],F=k.injectMemory?J_(e.layout,h,S.length>0?S:void 0):[],q=`${X_(F,k.memoryEntryLimit)}${yP(I)}${PP(M)}${x}`,B=u?.trim()??(s!==void 0&&h.trim().length>0?sL():void 0);if(s!==void 0&&B!==void 0&&B.length>0&&h.trim().length>0){Ki({reportKey:B,agentRunId:s,userSummary:"Working on your Mac\u2026"});let $=q;p!==null&&p.then(we=>{if(we===null)return;let Hr=dL({estimateOutput:we.estimateOutput??"",reportKey:B,agentRunId:s,reportsDir:e.layout.reportsDir,task:we.task,writerLabel:we.writerLabel,embedding:we.embedding});if(Hr.estimateSeconds===null)return;qC(e.layout.reportsDir,s);let nr=`${vi}
${Hr.estimateSeconds}
`;if(or(s)){G(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:nr},requestId:o});return}jr(s,nr)}).catch(()=>{}),q=nL($),q=gy(q,{agentRunId:s,reportKey:B,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&p!==null&&p.then($=>{$!==null&&cL({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel,embedding:$.embedding})}).catch(()=>{}),s!==void 0&&A!==null&&A.then($=>{$!==null&&mL({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel})}).catch(()=>{});let Ue=s!==void 0&&AL.get(s)===!0;if(s!==void 0&&h.trim().length>0){let $=await qp(h);SL.set(s,$),B!==void 0&&B.length>0&&yL.set(s,B)}Xf(e,t,q,o,bL(n),s,{sessionTurn:k.sessionTurn},a,h,B,r,AS(e.layout,s,Ue)),b&&s!==void 0&&G(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:RC(t)},requestId:o})},cZ=async(e,t,r,o,n)=>{let s=(i,a)=>{G(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await IC({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,G(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:o})}}),c=de(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?wi(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},dZ=(e,t,r)=>new Promise(o=>{if(!de(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Ft(t,r,ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,PL.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),uZ=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;G(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Bt(t.bundle),s=Z(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let u=ve(e.wsUrl)??At,m=await nA({appOrigin:u,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=qo({bundle:i,layout:e.layout});return G(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&sd(o,e.layout),!0},pZ=async(e,t,r,o)=>{if(await uZ(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(G(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!de(n)){G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}oa(e.layout);let i=await(async()=>{try{await $r(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return dZ(e,n,s)})().finally(()=>{na(e.layout)});G(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),sd(o,e.layout)},mZ=e=>{let t=1e3*2**e;return Math.min(iZ,t)},gZ=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=p=>{if(!t.restartInFlight){if(Pt(e.layout)){My(p),console.log(`[agent-witch] Deferring local restart (${p}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${p})\u2026`),t.wakeError=`restart:${p}`,XC().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(p,A="system.ack")=>{if(!t.selfUpdateInFlight){if(Pt(e.layout)){sa({layout:e.layout,remoteBundleVersion:p,trigger:A}),console.log(`[agent-witch] Deferring install bundle update (${p} via ${A}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,ZC({layout:e.layout,remoteBundleVersion:p,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let p=ke(e.layout);p!==null&&He(p,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),f())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let p=t.socket;t.socket=void 0,t.wsConnected=!1,p.removeAllListeners("open"),p.removeAllListeners("message"),p.removeAllListeners("close"),p.on("error",()=>{}),(p.readyState===zc.OPEN||p.readyState===zc.CONNECTING)&&p.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,JB)},u=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let p=mZ(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${p}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,f()},p)},m=p=>{s();let A=()=>{let b=Qi(e.layout.installDir),h=_t();G(p,{type:"agent.heartbeat",payload:{hostname:Ci.default.hostname(),macOsUsername:Ci.default.userInfo().username,wakeError:t.wakeError,wakePort:h,...e.email!==null?{email:e.email}:{},installBundleVersion:b}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,JB)},S=(p,A)=>{if(typeof p.type!="string")return;if(wb(p)){t.stopped=!0,s(),a(),c(),Ab({layout:e.layout}).finally(()=>{jc(),process.exit(0)});return}oo(e.layout,{direction:"in",type:p.type,summary:"inbound WS frame"}),ym(e.layout,"in",p);let b=typeof p.requestId=="string"?p.requestId:void 0;if(p.type==="device.auth.attestation"&&Z(p.payload)){let h=typeof p.payload.serverPublicKey=="string"?p.payload.serverPublicKey:"",w=typeof p.payload.origin=="string"?p.payload.origin:"",_=typeof p.payload.devicePublicKey=="string"?p.payload.devicePublicKey:"",C=typeof p.payload.challenge=="string"?p.payload.challenge:"",L=typeof p.payload.serverAttestation=="string"?p.payload.serverAttestation:"";if(!Ev({serverPublicKey:h,origin:w,devicePublicKey:_,challenge:C,serverAttestation:L})){t.wakeError="Server attestation verification failed",oo(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(p.type==="writer.ensure"&&Z(p.payload)){let h=typeof p.payload.writerAgent=="string"?p.payload.writerAgent:"";oo(e.layout,{direction:"local",type:"writer.ensure",summary:h,action:"ensure-writer"}),oL({layout:e.layout,writerAgent:h,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{G(A,{type:"writer.status",payload:w},e.layout)})}if(p.type==="install.bundle.update"&&Z(p.payload)){let h=typeof p.payload.bundleVersion=="string"?p.payload.bundleVersion.trim():"";h.length>0&&o(h,"install.bundle.update")}if(p.type==="system.ack"){Qp(e.layout,{wsUrl:e.wsUrl});let h=Z(p.payload)?p.payload:null,w=QC(h);w!==null&&o(w)}if(p.type==="device.restart"&&r("cloud-device-restart"),p.type==="automations.sync"&&Z(p.payload)&&eL(p.payload),p.type==="automations.run"&&Z(p.payload)&&tL(p.payload),p.type==="terminal.stream.accepted"&&Z(p.payload)){let h=typeof p.payload.runId=="string"?p.payload.runId:"";if(h.length>0){let w=CC(h);for(let _ of w)G(A,{type:"terminal.stream.chunk",payload:{runId:h,chunk:_},requestId:b})}}if(p.type==="agent.agentRun.list"&&G(A,{type:"dashboard.agentRun.list.result",payload:{runs:HC(e.layout)},requestId:b}),p.type==="agent.agentRun.get"&&Z(p.payload)){let h=typeof p.payload.runId=="string"?p.payload.runId:"",w=h.length>0?Zc(e.layout,h):null;G(A,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:b})}if(p.type==="command.claude.run"&&Z(p.payload)){let h=p.payload.prompt,w=typeof p.payload.writerAgent=="string"&&de(p.payload.writerAgent)?p.payload.writerAgent:"claude-cli",_=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,C=p.payload.sessionContinuation===!0,L=typeof p.payload.sourceRunId=="string"?p.payload.sourceRunId:void 0,k=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:void 0,x=typeof p.payload.projectId=="string"?p.payload.projectId:void 0,I=ya(typeof p.payload.projectFolderPath=="string"?p.payload.projectFolderPath:void 0,od,x),M=pS(p.payload.compositionSnapshot),F=typeof p.payload.reportKey=="string"?p.payload.reportKey:void 0;if(typeof h=="string"&&h.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${C?"continue":"first"})\u2026`),I===null){G(A,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(M!==null){let q=gS(e.layout,M);if(q!==null){G(A,{type:"command.claude.result",payload:{exitCode:-1,output:q,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(_!==void 0){let B=hS(e.layout,_,M);if(!B.ok){G(A,{type:"command.claude.result",payload:{exitCode:-1,output:B.errorMessage,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}AL.set(_,M.entries.some(Ue=>Ue.scope==="run"))}}_!==void 0&&k!==void 0&&YB.set(_,k),_!==void 0&&(XB.set(_,I),x!==void 0&&x.trim().length>0&&fL.set(_,x.trim()),ZB.set(_,h.trim()),et({projectFolderPath:I,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),lZ(e,w,h.trim(),b,A,_,C,k,L,I,F,x)}}if(p.type==="shell.session.open"&&Z(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",w=typeof p.payload.cols=="number"?p.payload.cols:120,_=typeof p.payload.rows=="number"?p.payload.rows:32;h.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),TC({shellSessionId:h,cwd:e.workspace,cols:w,rows:_,send:C=>{G(A,C)},requestId:b}))}if(p.type==="shell.session.close"&&Z(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"";h.length>0&&Pi(h,w=>{G(A,w)},b)}if(p.type==="shell.input"&&Z(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",w=typeof p.payload.data=="string"?p.payload.data:"";h.length>0&&w.length>0&&LC(h,w)}if(p.type==="shell.resize"&&Z(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",w=typeof p.payload.cols=="number"?p.payload.cols:0,_=typeof p.payload.rows=="number"?p.payload.rows:0;h.length>0&&w>0&&_>0&&kC(h,w,_)}if(p.type==="command.writer.session.end"&&Z(p.payload)){let h=p.payload.writerAgent;typeof h=="string"&&de(h)&&(xC(h),of(e.layout,h))}if(p.type==="command.writer.session.start"&&Z(p.payload)){let h=p.payload.writerAgent,w=typeof p.payload.writerSessionId=="string"?p.payload.writerSessionId:"";typeof h=="string"&&de(h)&&w.length>0&&(console.log(`[agent-witch] Starting ${h} session\u2026`),cZ(e,h,w,b,A))}if(p.type==="command.claude.stop"&&Z(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"";h.length>0&&(console.log(`[agent-witch] Stopping run ${h}\u2026`),YC(e,bL(A),h,b))}if(p.type==="command.claude.input_respond"&&Z(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"",w=typeof p.payload.response=="string"?p.payload.response.trim():"",_=typeof p.payload.originalPrompt=="string"?p.payload.originalPrompt:"",C=typeof p.payload.partialOutput=="string"?p.payload.partialOutput:"",L=typeof p.payload.question=="string"?p.payload.question:"";h.length>0&&w.length>0&&_.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),KC(e,{agentRunId:h,originalPrompt:_,partialOutput:C,question:L,response:w,shellSessionId:YB.get(h)},b,bL(A)))}if(p.type==="dispatch.approval.required"&&Z(p.payload)){let h=typeof p.payload.requesterEmail=="string"?p.payload.requesterEmail:"A teammate",w=typeof p.payload.prompt=="string"?p.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${h}: ${w}`),process.platform==="darwin"&&(0,PL.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${h.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(p.type==="harness.request"&&Z(p.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),pZ(e,p.payload,b,A)),p.type==="harness.export.request"&&Z(p.payload)){let h=typeof p.payload.borrowerUserId=="string"?p.payload.borrowerUserId:"",w=typeof p.payload.targetDeviceId=="string"?p.payload.targetDeviceId:void 0,_=Array.isArray(p.payload.setSlugs)?p.payload.setSlugs.filter(C=>typeof C=="string"):[];h.length>0&&_.length>0&&(async()=>{let{readHarnessExportSets:C}=await Promise.resolve().then(()=>(KB(),VB)),L=C(_,e.email);G(A,{type:"harness.export.result",payload:{success:L.length>0,borrowerUserId:h,...w!==void 0?{targetDeviceId:w}:{},sets:L,errorMessage:L.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(p.type==="harness.manifest.request"&&sd(A,e.layout),p.type==="command.claude.result"&&Z(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,w=typeof p.payload.output=="string"?p.payload.output:"",_=typeof p.payload.exitCode=="number"?p.payload.exitCode:null,C=ya(h!==void 0?XB.get(h):void 0,od),L=h!==void 0?fL.get(h):void 0,k=h!==void 0?ZB.get(h)??"":"",x=OA({exitCode:_,output:w});if(x&&C!==null&&hP({layout:e.layout,text:w,source:h??"command.claude.result",projectFolderPath:C,...L!==void 0?{projectId:L}:{}}),_!=null&&_!==0&&w.trim().length>0&&C!==null&&(uP({layout:e.layout,errorText:w,projectFolderPath:C,...L!==void 0?{projectId:L}:{}}),AP({layout:e.layout,text:w,source:h??"command.claude.result.failure",projectFolderPath:C,...L!==void 0?{projectId:L}:{}})),x&&k.trim().length>0&&C!==null&&Y_({layout:e.layout,projectFolderPath:C,...L!==void 0?{projectId:L}:{},entry:{id:`${Date.now()}-${h??"run"}`,...h!==void 0?{agentRunId:h}:{},prompt:k,output:w,createdAt:new Date().toISOString()}}),h!==void 0&&C!==null){let M=yL.get(h),F=SL.get(h);M!==void 0&&F!==void 0&&qp(C).then(q=>{let B=DA({before:F,after:q});fy(M,B),SL.delete(h),yL.delete(h)})}if(x&&L!==void 0&&L.trim().length>0){let M=H(),F=M===null?null:Y({wsUrl:M.wsUrl,pairingToken:M.pairingToken});F!==null&&$A(F,L,{...h!==void 0?{sourceRunId:h}:{},lesson:jA({prompt:k,output:w})})}h!==void 0&&(Aa(e.layout,h),AL.delete(h),fL.delete(h))}},f=()=>{if(t.stopped)return;a(),c();let p=new zc(e.wsUrl);t.socket=p,p.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),GC(Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),VC(e.layout);let A=ve(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),h=Tv({layout:e.layout,origin:A,...b!==void 0&&b.length>0?{claimToken:b}:{}});G(p,{type:"agent.register",payload:{role:"agent",hostname:Ci.default.hostname(),macOsUsername:Ci.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...h}},e.layout),sd(p,e.layout),JC(e,p),m(p)}),p.on("message",A=>{let b=typeof A=="string"?A:A.toString("utf8");try{let h=JSON.parse(b);if(!Z(h))return;S(h,p)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),p.on("close",(A,b)=>{s(),t.socket=void 0,t.wsConnected=!1,XA(e.layout),t.reconnectAttempt+=1;let h=typeof b=="string"?b:b.toString("utf8");on(e.layout,{kind:"ws_close",message:"WebSocket closed",code:A,reason:h}),console.log("[agent-witch] Disconnected from server."),u()}),p.on("error",A=>{t.wakeError=A.message,on(e.layout,{kind:"ws_error",message:A.message,stack:A.stack}),console.error(`[agent-witch] Socket error: ${A.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return Oy(()=>{let p=Ny();p!==null&&p.layout.installDir===e.layout.installDir&&p.layout.profileEmail===e.layout.profileEmail&&o(p.remoteBundleVersion,p.trigger);let A=zy();A!==null&&r(A)}),{connect:f,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Qa(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Tc(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,f()},reportHarnessManifestIfConnected:()=>{let p=t.socket;return!t.wsConnected||p===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(sd(p,e.layout),{ok:!0})}}},fZ=async()=>{Xe("agent-witch");let e=cC(),t=W();mC().ok||(process.platform==="darwin"?(await To(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),yC(t);let o=hC({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(cr({launchAgentLabel:_e(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),$i());let n=await kS(),s=n[0];s!==void 0&&rL(s.layout);for(let f of n){let y=ve(f.wsUrl)??At;ea(f.layout.installDir,y)}let i=n.map(f=>gZ(f)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),jc(),process.exit(0));let c=()=>{n.forEach((f,y)=>{let p=i[y];if(p===void 0)return;let A=ke(f.layout);ZA(A,{socketOpen:p.hasMacSocketOpen(),staleAfterMs:12e4})&&p.reviveWebSocket()})},d=()=>{},u=()=>{if(e.skipInProcessLive)return;let f=n[0]?.layout;f!==void 0&&(Pt(f)||el(f.installDir))},m=await SC({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:u,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):Wc({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let f of i)f.startLocalHealthCheck(),f.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let S=dr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Hi(),d()});d=()=>{S(),m.stop(),jc(),console.log("[agent-witch] Shutting down.");for(let f of i)f.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},id=fZ});var wL=l(()=>{"use strict";QB()});var eG={};Nt(eG,{startAgentWitchClient:()=>id});var tG=l(()=>{"use strict";wL();wL();Ro();hy();Eu();if(!Ze()&&Io(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Tu(process.argv.slice(e))),id()}});py();hy();Ro();Eu();var sT="20.x",iT="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var aK=e=>[`Node.js ${sT} or newer is required (found ${e}).`,iT].join(" "),aT=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${aK(process.version)}
`),process.exit(1))};var hZ=async()=>{Xe("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Fy(),Hy)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},yZ=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(p0(),u0)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},SZ=async()=>{if(!Io(Ze()?void 0:__agentWitchImportMetaUrl))return;aT();let e=process.argv.indexOf("report");e>=0&&process.exit(Tu(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await hZ();return}if(t==="wake"){await yZ();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(mI(),pI));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(TF(),WF));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(tG(),eG));await r()};SZ();
