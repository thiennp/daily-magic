#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var _K=Object.create;var Zy=Object.defineProperty;var wK=Object.getOwnPropertyDescriptor;var TK=Object.getOwnPropertyNames;var vK=Object.getPrototypeOf,kK=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var k=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},St=(e,t)=>{for(var r in t)Zy(e,r,{get:t[r],enumerable:!0})},CK=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of TK(t))!kK.call(e,n)&&n!==r&&Zy(e,n,{get:()=>t[n],enumerable:!(o=wK(t,n))||o.enumerable});return e};var g=(e,t,r)=>(r=e!=null?_K(vK(e)):{},CK(t||!e||!e.__esModule?Zy(r,"default",{value:e,enumerable:!0}):r,e));var ca,CL,EL,da,Qy,xne,LL,Au,Jt,wr,bu,_u,hs,ys,xe,eS,wu,Tu,vu,ua,Lt,Vo,qo,pa,io,tS,RL,we=l(()=>{"use strict";ca={production:".agent-witch",localhost:".local-agent-witch"},CL={production:47892,localhost:47893},EL={production:"com.agent-witch",localhost:"com.local-agent-witch"},da={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Qy="app",xne=`${Qy}/agent-witch.js`,LL=`${Qy}/command`,Au={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Jt=ca.production,wr=ca.localhost,bu=CL.production,_u=CL.localhost,hs=EL.production,ys=EL.localhost,xe="profiles",eS=da.activeProfile,wu="harness",Tu="sets",vu="manifest.json",ua=Au.projectsDir,Lt=Au.logsDir,Vo="agent-witch.log",qo="agent-witch.error.log",pa=Au.reportsDir,io=Au.deviceKeypairJson,tS=Qy,RL="agent-witch.js"});var xL=l(()=>{"use strict";we()});var WL,ao,ma,ku=l(()=>{"use strict";WL=g(require("node:path"));we();ao=e=>WL.default.basename(e)===wr,ma=e=>ao(e)?ys:hs});var IL=l(()=>{"use strict";xL();ku()});var OL,rS,EK,ga,LK,RK,ML,xK,WK,NL=l(()=>{"use strict";IL();we();OL=g(require("node:os")),rS=g(require("node:path")),EK=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?rS.default.resolve(e):rS.default.join(OL.default.homedir(),Jt)},ga=ma(EK()),LK=`${ga}-wake`,RK=`${ga}-live`,ML=`${ga}-watchdog`,xK=`${ga}-automation-scheduler`,WK=`${ga}-updater`});var Ss=k(oS=>{"use strict";Object.defineProperty(oS,"__esModule",{value:!0});oS.stringify=IK;function IK(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var N=k(nS=>{"use strict";Object.defineProperty(nS,"__esModule",{value:!0});nS.generateTypeGuardError=OK;var jL=Ss();function OK(e,t,r){return(0,jL.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,jL.stringify)(e)}) to be "${r}"`}});var lo=k(Cu=>{"use strict";Object.defineProperty(Cu,"__esModule",{value:!0});Cu.isNonNullObject=void 0;var MK=N(),NK=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,MK.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Cu.isNonNullObject=NK});var Xt=k(Te=>{"use strict";Object.defineProperty(Te,"__esModule",{value:!0});Te.attachTypeGuardMeta=Te.isArrayTypeGuard=Te.isNestedObjectTypeGuard=Te.getTypeGuardWrapperKind=Te.getTypeGuardInnerGuard=Te.getTypeGuardItemGuard=Te.getTypeGuardSchema=void 0;var jK=e=>e.schema;Te.getTypeGuardSchema=jK;var DK=e=>e.itemGuard;Te.getTypeGuardItemGuard=DK;var zK=e=>e.innerGuard;Te.getTypeGuardInnerGuard=zK;var $K=e=>e.wrapperKind;Te.getTypeGuardWrapperKind=$K;var FK=e=>{if((0,Te.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};Te.isNestedObjectTypeGuard=FK;var HK=e=>{if((0,Te.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};Te.isArrayTypeGuard=HK;var UK=(e,t)=>Object.assign(e,t);Te.attachTypeGuardMeta=UK});var fa=k(Ko=>{"use strict";Object.defineProperty(Ko,"__esModule",{value:!0});Ko.getExpectedTypeName=Ko.getTypeGuardDisplayName=void 0;var DL=Xt(),BK=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};Ko.getTypeGuardDisplayName=BK;var GK=e=>{let t=(0,DL.getTypeGuardWrapperKind)(e),r=(0,DL.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,Ko.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};Ko.getExpectedTypeName=GK});var Jo=k(Eu=>{"use strict";Object.defineProperty(Eu,"__esModule",{value:!0});Eu.createValidationResult=void 0;var VK=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Eu.createValidationResult=VK});var Ps=k(Lu=>{"use strict";Object.defineProperty(Lu,"__esModule",{value:!0});Lu.createValidationError=void 0;var qK=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Lu.createValidationError=qK});var As=k(Ru=>{"use strict";Object.defineProperty(Ru,"__esModule",{value:!0});Ru.createTreeNode=void 0;var KK=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Ru.createTreeNode=KK});var ha=k(xu=>{"use strict";Object.defineProperty(xu,"__esModule",{value:!0});xu.combineResults=void 0;var JK=Jo(),XK=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,JK.createValidationResult)(r,o,n)};xu.combineResults=XK});var Iu=k(Wu=>{"use strict";Object.defineProperty(Wu,"__esModule",{value:!0});Wu.createSimplifiedTree=void 0;var zL=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=zL(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},YK=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=zL(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Wu.createSimplifiedTree=YK});var Sa=k(Mu=>{"use strict";Object.defineProperty(Mu,"__esModule",{value:!0});Mu.validateObject=void 0;var ZK=lo(),ya=Jo(),QK=Ps(),Ou=As(),e4=ha(),$L=Nu(),t4=(e,t,r)=>{let o=()=>{let i=(0,QK.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Ou.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,ya.createValidationResult)(!1,[],a):(0,ya.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,ya.createValidationResult)(!0,[],(0,Ou.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...u]=c,m=d,S=t[m],f=e[m],y=(0,$L.validateProperty)(m,f,S,r);return y.valid?u.length===0?(0,ya.createValidationResult)(!0,[],(0,Ou.createTreeNode)(r.path,!0,"object",e)):a(u):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let u=t[d];return(0,$L.validateProperty)(d,e[d],u,r)}),a=(0,e4.combineResults)(i,r.path),c=(0,Ou.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let u=d.tree.path.split(".").pop()||"unknown";c.children[u]=d.tree}}),(0,ya.createValidationResult)(a.valid,a.errors,c)};return(0,ZK.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};Mu.validateObject=t4});var HL=k(zu=>{"use strict";Object.defineProperty(zu,"__esModule",{value:!0});zu.validateArray=void 0;var r4=Ss(),ju=Jo(),FL=Ps(),Du=As(),o4=ha(),n4=Sa(),s4=fa(),i4=Xt(),a4=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,FL.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,Du.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,ju.createValidationResult)(!1,[c],d)}let n=(0,i4.getTypeGuardSchema)(t),s=e.map((c,d)=>{let u=`${o}[${d}]`,m={path:u,config:r.config||null};if(n)return(0,n4.validateObject)(c,n,m);let S=t(c,null),f=(0,s4.getExpectedTypeName)(t),y=(0,r4.stringify)(c);if(S)return(0,ju.createValidationResult)(!0,[],(0,Du.createTreeNode)(u,!0,f,c));let p=y.length>200?`Expected ${u} to be "${f}"`:`Expected ${u} (${y}) to be "${f}"`,P=(0,FL.createValidationError)(u,f,c,p),w=(0,Du.createTreeNode)(u,!1,f,c);return w.errors=[P],(0,ju.createValidationResult)(!1,[P],w)}),i=(0,o4.combineResults)(s,o),a=(0,Du.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,ju.createValidationResult)(i.valid,i.errors,a)};zu.validateArray=a4});var Nu=k(Fu=>{"use strict";Object.defineProperty(Fu,"__esModule",{value:!0});Fu.validateProperty=void 0;var UL=Jo(),l4=Ps(),BL=As(),c4=fa(),$u=Xt(),d4=Sa(),u4=HL(),p4=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,$u.getTypeGuardSchema)(r),c=(0,$u.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,d4.validateObject)(t,a,s);if(c&&(0,$u.isArrayTypeGuard)(r))return(0,u4.validateArray)(t,c,s)}let d=u=>{let m=r(t,u),S=(0,c4.getExpectedTypeName)(r);return m?(0,UL.createValidationResult)(!0,[],(0,BL.createTreeNode)(n,!0,S,t)):(()=>{let f=(0,l4.createValidationError)(n,S,t,`Expected ${n} (${JSON.stringify(t)}) to be "${S}"`),y=(0,BL.createTreeNode)(n,!1,S,t);return y.errors=[f],(0,UL.createValidationResult)(!1,[f],y)})()};if((0,$u.isNestedObjectTypeGuard)(r)){let u=o.config?{...o.config,identifier:n}:null;return d(u)}return d(null)};Fu.validateProperty=p4});var Uu=k(Hu=>{"use strict";Object.defineProperty(Hu,"__esModule",{value:!0});Hu.isNil=void 0;var m4=N(),g4=function(e,t){return e!=null?(t&&t.callbackOnError((0,m4.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Hu.isNil=g4});var sS=k(Bu=>{"use strict";Object.defineProperty(Bu,"__esModule",{value:!0});Bu.isDefined=void 0;var f4=N(),h4=Uu(),y4=function(e,t){return(0,h4.isNil)(e,null)?(t&&t.callbackOnError((0,f4.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Bu.isDefined=y4});var iS=k(Gu=>{"use strict";Object.defineProperty(Gu,"__esModule",{value:!0});Gu.reportValidationResults=void 0;var S4=Iu(),GL=sS(),P4=Uu(),A4=(e,t)=>{if(e.valid===!0||(0,P4.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,GL.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,S4.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,GL.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Gu.reportValidationResults=A4});var aS=k(ne=>{"use strict";Object.defineProperty(ne,"__esModule",{value:!0});ne.Validation=ne.reportValidationResults=ne.validateObject=ne.validateProperty=ne.createSimplifiedTree=ne.combineResults=ne.createTreeNode=ne.createValidationError=ne.createValidationResult=ne.getExpectedTypeName=void 0;var b4=fa();Object.defineProperty(ne,"getExpectedTypeName",{enumerable:!0,get:function(){return b4.getExpectedTypeName}});var _4=Jo();Object.defineProperty(ne,"createValidationResult",{enumerable:!0,get:function(){return _4.createValidationResult}});var w4=Ps();Object.defineProperty(ne,"createValidationError",{enumerable:!0,get:function(){return w4.createValidationError}});var T4=As();Object.defineProperty(ne,"createTreeNode",{enumerable:!0,get:function(){return T4.createTreeNode}});var v4=ha();Object.defineProperty(ne,"combineResults",{enumerable:!0,get:function(){return v4.combineResults}});var k4=Iu();Object.defineProperty(ne,"createSimplifiedTree",{enumerable:!0,get:function(){return k4.createSimplifiedTree}});var C4=Nu();Object.defineProperty(ne,"validateProperty",{enumerable:!0,get:function(){return C4.validateProperty}});var E4=Sa();Object.defineProperty(ne,"validateObject",{enumerable:!0,get:function(){return E4.validateObject}});var L4=iS();Object.defineProperty(ne,"reportValidationResults",{enumerable:!0,get:function(){return L4.reportValidationResults}});var R4=Jo(),x4=ha(),W4=Ps(),I4=As(),O4=Nu(),M4=Sa(),N4=iS(),j4=Iu();ne.Validation={result:R4.createValidationResult,combine:x4.combineResults,error:W4.createValidationError,treeNode:I4.createTreeNode,property:O4.validateProperty,object:M4.validateObject,report:N4.reportValidationResults,createSimplifiedTree:j4.createSimplifiedTree}});var Vu=k(lS=>{"use strict";Object.defineProperty(lS,"__esModule",{value:!0});lS.isType=z4;var VL=lo(),qL=aS(),D4=Xt();function z4(e){if(!(0,VL.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,qL.validateObject)(r,e,s);return(0,qL.reportValidationResults)(i,o||null),i.valid}return(0,VL.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,D4.attachTypeGuardMeta)(t,{schema:e})}});var YL=k(Xo=>{"use strict";Object.defineProperty(Xo,"__esModule",{value:!0});Xo.isNestedType=Xo.isShape=void 0;Xo.isSchema=Pa;var KL=lo(),JL=aS(),XL=Xt();function Pa(e){if(!(0,KL.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=F4(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,JL.validateObject)(o,t,i);return(0,JL.reportValidationResults)(a,n||null),a.valid}return(0,KL.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,XL.attachTypeGuardMeta)(r,{schema:t})}function $4(e){return typeof e=="function"?e:Array.isArray(e)?H4(e):typeof e=="object"&&e!==null?Pa(e):e}function F4(e){let t={};for(let[r,o]of Object.entries(e))t[r]=$4(o);return t}function H4(e){let t=e[0],r=Pa(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,XL.attachTypeGuardMeta)(o,{itemGuard:r})}Xo.isShape=Pa;Xo.isNestedType=Pa});var ZL=k(cS=>{"use strict";Object.defineProperty(cS,"__esModule",{value:!0});cS.isObjectWith=B4;var U4=Vu();function B4(e){return(0,U4.isType)(e)}});var QL=k(dS=>{"use strict";Object.defineProperty(dS,"__esModule",{value:!0});dS.isObject=V4;var G4=Vu();function V4(e){return(0,G4.isType)(e)}});var eR=k(uS=>{"use strict";Object.defineProperty(uS,"__esModule",{value:!0});uS.guardWithTolerance=q4;function q4(e,t,r){return t(e,r),e}});var tR=k(pS=>{"use strict";Object.defineProperty(pS,"__esModule",{value:!0});pS.isBranded=J4;var K4=N();function J4(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,K4.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var rR=k(qu=>{"use strict";Object.defineProperty(qu,"__esModule",{value:!0});qu.BrandSymbols=void 0;qu.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var oR=k(Ku=>{"use strict";Object.defineProperty(Ku,"__esModule",{value:!0});Ku.isAny=void 0;var X4=function(e){return!0};Ku.isAny=X4});var Aa=k(mS=>{"use strict";Object.defineProperty(mS,"__esModule",{value:!0});mS.reportTypeGuardError=Z4;var Y4=N();function Z4(e,t,r){e&&e.callbackOnError((0,Y4.generateTypeGuardError)(t,e.identifier,r))}});var nR=k(Ju=>{"use strict";Object.defineProperty(Ju,"__esModule",{value:!0});Ju.isBoolean=void 0;var Q4=Aa(),eJ=function(t,r){return typeof t!="boolean"?((0,Q4.reportTypeGuardError)(r,t,"boolean"),!1):!0};Ju.isBoolean=eJ});var sR=k(Xu=>{"use strict";Object.defineProperty(Xu,"__esModule",{value:!0});Xu.isDate=void 0;var tJ=N(),rJ=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,tJ.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Xu.isDate=rJ});var gS=k(Yu=>{"use strict";Object.defineProperty(Yu,"__esModule",{value:!0});Yu.isNumber=void 0;var oJ=Aa(),nJ=function(t,r){return typeof t!="number"||isNaN(t)?((0,oJ.reportTypeGuardError)(r,t,"number"),!1):!0};Yu.isNumber=nJ});var iR=k(Zu=>{"use strict";Object.defineProperty(Zu,"__esModule",{value:!0});Zu.isString=void 0;var sJ=Aa(),iJ=function(t,r){return typeof t!="string"?((0,sJ.reportTypeGuardError)(r,t,"string"),!1):!0};Zu.isString=iJ});var aR=k(Qu=>{"use strict";Object.defineProperty(Qu,"__esModule",{value:!0});Qu.isUnknown=void 0;var aJ=function(e){return!0};Qu.isUnknown=aJ});var lR=k(ep=>{"use strict";Object.defineProperty(ep,"__esModule",{value:!0});ep.isFunction=void 0;var lJ=N(),cJ=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,lJ.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};ep.isFunction=cJ});var dR=k(tp=>{"use strict";Object.defineProperty(tp,"__esModule",{value:!0});tp.isFile=void 0;var cR=N(),dJ=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,cR.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,cR.generateTypeGuardError)(e,t.identifier,"File")),!1)};tp.isFile=dJ});var pR=k(rp=>{"use strict";Object.defineProperty(rp,"__esModule",{value:!0});rp.isFileList=void 0;var uR=N(),uJ=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,uR.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,uR.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};rp.isFileList=uJ});var gR=k(op=>{"use strict";Object.defineProperty(op,"__esModule",{value:!0});op.isBlob=void 0;var mR=N(),pJ=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,mR.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,mR.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};op.isBlob=pJ});var hR=k(np=>{"use strict";Object.defineProperty(np,"__esModule",{value:!0});np.isFormData=void 0;var fR=N(),mJ=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,fR.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,fR.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};np.isFormData=mJ});var SR=k(sp=>{"use strict";Object.defineProperty(sp,"__esModule",{value:!0});sp.isURL=void 0;var yR=N(),gJ=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,yR.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,yR.generateTypeGuardError)(e,t.identifier,"URL")),!1)};sp.isURL=gJ});var AR=k(ip=>{"use strict";Object.defineProperty(ip,"__esModule",{value:!0});ip.isURLSearchParams=void 0;var PR=N(),fJ=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,PR.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,PR.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};ip.isURLSearchParams=fJ});var bR=k(ap=>{"use strict";Object.defineProperty(ap,"__esModule",{value:!0});ap.isMap=void 0;var hJ=N(),yJ=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,hJ.generateTypeGuardError)(e,t.identifier,"Map")),!1)};ap.isMap=yJ});var _R=k(lp=>{"use strict";Object.defineProperty(lp,"__esModule",{value:!0});lp.isSet=void 0;var SJ=N(),PJ=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,SJ.generateTypeGuardError)(e,t.identifier,"Set")),!1)};lp.isSet=PJ});var wR=k(fS=>{"use strict";Object.defineProperty(fS,"__esModule",{value:!0});fS.isIndexSignature=bJ;var AJ=N();function bJ(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,AJ.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,u)=>{let m=s[d],S=e(d,o?{...o,identifier:`${o.identifier}[key:${u}]`}:null),f=t(m,o?{...o,identifier:`${o.identifier}[value:${u}]`}:null);return S&&f})}}});var TR=k(cp=>{"use strict";Object.defineProperty(cp,"__esModule",{value:!0});cp.isError=void 0;var _J=Aa(),wJ=function(t,r){return t instanceof Error?!0:((0,_J.reportTypeGuardError)(r,t,"Error"),!1)};cp.isError=wJ});var yS=k(hS=>{"use strict";Object.defineProperty(hS,"__esModule",{value:!0});hS.isArrayWithEachItem=kJ;var TJ=N(),vJ=Xt();function kJ(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,TJ.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,vJ.attachTypeGuardMeta)(t,{itemGuard:e})}});var SS=k(dp=>{"use strict";Object.defineProperty(dp,"__esModule",{value:!0});dp.isNonEmptyArray=void 0;var CJ=N(),EJ=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,CJ.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};dp.isNonEmptyArray=EJ});var vR=k(PS=>{"use strict";Object.defineProperty(PS,"__esModule",{value:!0});PS.isNonEmptyArrayWithEachItem=xJ;var LJ=yS(),RJ=SS();function xJ(e){return function(t,r){return(0,LJ.isArrayWithEachItem)(e)(t,r)&&(0,RJ.isNonEmptyArray)(t,r)}}});var CR=k(AS=>{"use strict";Object.defineProperty(AS,"__esModule",{value:!0});AS.isTuple=WJ;var kR=N();function WJ(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,kR.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,kR.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var ER=k(bS=>{"use strict";Object.defineProperty(bS,"__esModule",{value:!0});bS.isObjectWithEachItem=OJ;var IJ=N();function OJ(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,IJ.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var LR=k(_S=>{"use strict";Object.defineProperty(_S,"__esModule",{value:!0});_S.isPartialOf=NJ;var MJ=lo();function NJ(e){return function(t,r){if(!(0,MJ.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var RR=k(wS=>{"use strict";Object.defineProperty(wS,"__esModule",{value:!0});wS.isPick=DJ;var jJ=lo();function DJ(e,...t){return function(r,o){if(!(0,jJ.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var xR=k(TS=>{"use strict";Object.defineProperty(TS,"__esModule",{value:!0});TS.isOmit=$J;var zJ=lo();function $J(e,...t){return function(r,o){if(!(0,zJ.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let u=d.slice(9),m=u.indexOf(" ("),S=m>=0?u.slice(0,m):u;if(a.has(S))return!1;let f=S.startsWith(s+".")&&S.slice(s.length+1).split(".")[0]||"";return!(f&&!Object.prototype.hasOwnProperty.call(r,f))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var WR=k(up=>{"use strict";Object.defineProperty(up,"__esModule",{value:!0});up.isNonEmptyString=void 0;var FJ=N(),HJ=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,FJ.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};up.isNonEmptyString=HJ});var IR=k(pp=>{"use strict";Object.defineProperty(pp,"__esModule",{value:!0});pp.isNonNegativeNumber=void 0;var UJ=N(),BJ=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,UJ.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};pp.isNonNegativeNumber=BJ});var OR=k(mp=>{"use strict";Object.defineProperty(mp,"__esModule",{value:!0});mp.isPositiveNumber=void 0;var GJ=N(),VJ=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,GJ.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};mp.isPositiveNumber=VJ});var MR=k(gp=>{"use strict";Object.defineProperty(gp,"__esModule",{value:!0});gp.isNonPositiveNumber=void 0;var qJ=N(),KJ=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,qJ.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};gp.isNonPositiveNumber=KJ});var NR=k(fp=>{"use strict";Object.defineProperty(fp,"__esModule",{value:!0});fp.isNegativeNumber=void 0;var JJ=N(),XJ=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,JJ.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};fp.isNegativeNumber=XJ});var jR=k(hp=>{"use strict";Object.defineProperty(hp,"__esModule",{value:!0});hp.isInteger=void 0;var YJ=N(),ZJ=gS(),QJ=function(e,t){return!(0,ZJ.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,YJ.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};hp.isInteger=QJ});var DR=k(yp=>{"use strict";Object.defineProperty(yp,"__esModule",{value:!0});yp.isPositiveInteger=void 0;var e8=N(),t8=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,e8.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};yp.isPositiveInteger=t8});var zR=k(Sp=>{"use strict";Object.defineProperty(Sp,"__esModule",{value:!0});Sp.isNegativeInteger=void 0;var r8=N(),o8=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,r8.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Sp.isNegativeInteger=o8});var $R=k(Pp=>{"use strict";Object.defineProperty(Pp,"__esModule",{value:!0});Pp.isNonNegativeInteger=void 0;var n8=N(),s8=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,n8.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Pp.isNonNegativeInteger=s8});var FR=k(Ap=>{"use strict";Object.defineProperty(Ap,"__esModule",{value:!0});Ap.isNonPositiveInteger=void 0;var i8=N(),a8=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,i8.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Ap.isNonPositiveInteger=a8});var HR=k(_p=>{"use strict";Object.defineProperty(_p,"__esModule",{value:!0});_p.isNumeric=void 0;var bp=N(),l8=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,bp.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,bp.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,bp.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,bp.generateTypeGuardError)(e,t.identifier,"number key")),!1};_p.isNumeric=l8});var UR=k(wp=>{"use strict";Object.defineProperty(wp,"__esModule",{value:!0});wp.isBooleanLike=void 0;var vS=N(),c8=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,vS.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,vS.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};wp.isBooleanLike=c8});var BR=k(Tp=>{"use strict";Object.defineProperty(Tp,"__esModule",{value:!0});Tp.isDateLike=void 0;var ba=N(),d8=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,ba.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,ba.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,ba.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,ba.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,ba.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Tp.isDateLike=d8});var GR=k(vp=>{"use strict";Object.defineProperty(vp,"__esModule",{value:!0});vp.isBigInt=void 0;var u8=N(),p8=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,u8.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};vp.isBigInt=p8});var CS=k(kS=>{"use strict";Object.defineProperty(kS,"__esModule",{value:!0});kS.isOneOf=m8;var VR=Ss();function m8(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,VR.stringify)(t)}) must be one of following values ${e.map(VR.stringify).join(" | ")}`),o}}});var qR=k(ES=>{"use strict";Object.defineProperty(ES,"__esModule",{value:!0});ES.isOneOfTypes=h8;var g8=Ss(),f8=fa();function h8(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,g8.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,f8.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let u=`- ${d}`;a.includes(u)||a.push(u)}})),r.callbackOnError(a.join(`
`))}return n}}});var KR=k(LS=>{"use strict";Object.defineProperty(LS,"__esModule",{value:!0});LS.isIntersectionOf=y8;function y8(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var JR=k(RS=>{"use strict";Object.defineProperty(RS,"__esModule",{value:!0});RS.isExtensionOf=S8;function S8(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var XR=k(xS=>{"use strict";Object.defineProperty(xS,"__esModule",{value:!0});xS.isNullOr=A8;var P8=Xt();function A8(e){function t(r,o){return r===null?!0:e(r,o)}return(0,P8.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var YR=k(WS=>{"use strict";Object.defineProperty(WS,"__esModule",{value:!0});WS.isUndefinedOr=_8;var b8=Xt();function _8(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,b8.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var ZR=k(IS=>{"use strict";Object.defineProperty(IS,"__esModule",{value:!0});IS.isNilOr=T8;var w8=Xt();function T8(e){function t(r,o){return r==null?!0:e(r,o)}return(0,w8.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var QR=k(OS=>{"use strict";Object.defineProperty(OS,"__esModule",{value:!0});OS.isAsserted=v8;function v8(e){return!0}});var ex=k(MS=>{"use strict";Object.defineProperty(MS,"__esModule",{value:!0});MS.isEnum=C8;var k8=CS();function C8(e){return function(t,r){return(0,k8.isOneOf)(...Object.values(e))(t,r)}}});var tx=k(NS=>{"use strict";Object.defineProperty(NS,"__esModule",{value:!0});NS.isEqualTo=R8;var E8=N(),L8=Ss();function R8(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,E8.generateTypeGuardError)(t,r.identifier,`equal to ${(0,L8.stringify)(e)}`)),!1):!0}}});var rx=k(kp=>{"use strict";Object.defineProperty(kp,"__esModule",{value:!0});kp.isRegex=void 0;var x8=N(),W8=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,x8.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};kp.isRegex=W8});var nx=k(jS=>{"use strict";Object.defineProperty(jS,"__esModule",{value:!0});jS.isPattern=I8;var ox=N();function I8(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,ox.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,ox.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var sx=k(DS=>{"use strict";Object.defineProperty(DS,"__esModule",{value:!0});DS.by=O8;function O8(e){return function(t){return e(t,null)}}});var ix=k(zS=>{"use strict";Object.defineProperty(zS,"__esModule",{value:!0});zS.toNumber=M8;function M8(e){return typeof e=="number"?e:Number(e)}});var ax=k($S=>{"use strict";Object.defineProperty($S,"__esModule",{value:!0});$S.toDate=N8;function N8(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var lx=k(FS=>{"use strict";Object.defineProperty(FS,"__esModule",{value:!0});FS.toBoolean=j8;function j8(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var cx=k(Cp=>{"use strict";Object.defineProperty(Cp,"__esModule",{value:!0});Cp.isSymbol=void 0;var D8=N(),z8=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,D8.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Cp.isSymbol=z8});var bs=k(b=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});b.isDateLike=b.isBooleanLike=b.isNumeric=b.isNonPositiveInteger=b.isNonNegativeInteger=b.isNegativeInteger=b.isPositiveInteger=b.isInteger=b.isNegativeNumber=b.isNonPositiveNumber=b.isPositiveNumber=b.isNonNegativeNumber=b.isNonEmptyString=b.isOmit=b.isPick=b.isPartialOf=b.isObjectWithEachItem=b.isNonNullObject=b.isTuple=b.isNonEmptyArrayWithEachItem=b.isNonEmptyArray=b.isArrayWithEachItem=b.isError=b.isIndexSignature=b.isSet=b.isMap=b.isURLSearchParams=b.isURL=b.isFormData=b.isBlob=b.isFileList=b.isFile=b.isFunction=b.isUnknown=b.isString=b.isNumber=b.isNil=b.isDefined=b.isDate=b.isBoolean=b.isAny=b.BrandSymbols=b.isBranded=b.guardWithTolerance=b.isObject=b.isObjectWith=b.isNestedType=b.isShape=b.isSchema=b.isType=void 0;b.isSymbol=b.toBoolean=b.toDate=b.toNumber=b.by=b.generateTypeGuardError=b.isPattern=b.isRegex=b.isEqualTo=b.isEnum=b.isAsserted=b.isNilOr=b.isUndefinedOr=b.isNullOr=b.isExtensionOf=b.isIntersectionOf=b.isOneOfTypes=b.isOneOf=b.isBigInt=void 0;var $8=Vu();Object.defineProperty(b,"isType",{enumerable:!0,get:function(){return $8.isType}});var HS=YL();Object.defineProperty(b,"isSchema",{enumerable:!0,get:function(){return HS.isSchema}});Object.defineProperty(b,"isShape",{enumerable:!0,get:function(){return HS.isShape}});Object.defineProperty(b,"isNestedType",{enumerable:!0,get:function(){return HS.isNestedType}});var F8=ZL();Object.defineProperty(b,"isObjectWith",{enumerable:!0,get:function(){return F8.isObjectWith}});var H8=QL();Object.defineProperty(b,"isObject",{enumerable:!0,get:function(){return H8.isObject}});var U8=eR();Object.defineProperty(b,"guardWithTolerance",{enumerable:!0,get:function(){return U8.guardWithTolerance}});var B8=tR();Object.defineProperty(b,"isBranded",{enumerable:!0,get:function(){return B8.isBranded}});var G8=rR();Object.defineProperty(b,"BrandSymbols",{enumerable:!0,get:function(){return G8.BrandSymbols}});var V8=oR();Object.defineProperty(b,"isAny",{enumerable:!0,get:function(){return V8.isAny}});var q8=nR();Object.defineProperty(b,"isBoolean",{enumerable:!0,get:function(){return q8.isBoolean}});var K8=sR();Object.defineProperty(b,"isDate",{enumerable:!0,get:function(){return K8.isDate}});var J8=sS();Object.defineProperty(b,"isDefined",{enumerable:!0,get:function(){return J8.isDefined}});var X8=Uu();Object.defineProperty(b,"isNil",{enumerable:!0,get:function(){return X8.isNil}});var Y8=gS();Object.defineProperty(b,"isNumber",{enumerable:!0,get:function(){return Y8.isNumber}});var Z8=iR();Object.defineProperty(b,"isString",{enumerable:!0,get:function(){return Z8.isString}});var Q8=aR();Object.defineProperty(b,"isUnknown",{enumerable:!0,get:function(){return Q8.isUnknown}});var e3=lR();Object.defineProperty(b,"isFunction",{enumerable:!0,get:function(){return e3.isFunction}});var t3=dR();Object.defineProperty(b,"isFile",{enumerable:!0,get:function(){return t3.isFile}});var r3=pR();Object.defineProperty(b,"isFileList",{enumerable:!0,get:function(){return r3.isFileList}});var o3=gR();Object.defineProperty(b,"isBlob",{enumerable:!0,get:function(){return o3.isBlob}});var n3=hR();Object.defineProperty(b,"isFormData",{enumerable:!0,get:function(){return n3.isFormData}});var s3=SR();Object.defineProperty(b,"isURL",{enumerable:!0,get:function(){return s3.isURL}});var i3=AR();Object.defineProperty(b,"isURLSearchParams",{enumerable:!0,get:function(){return i3.isURLSearchParams}});var a3=bR();Object.defineProperty(b,"isMap",{enumerable:!0,get:function(){return a3.isMap}});var l3=_R();Object.defineProperty(b,"isSet",{enumerable:!0,get:function(){return l3.isSet}});var c3=wR();Object.defineProperty(b,"isIndexSignature",{enumerable:!0,get:function(){return c3.isIndexSignature}});var d3=TR();Object.defineProperty(b,"isError",{enumerable:!0,get:function(){return d3.isError}});var u3=yS();Object.defineProperty(b,"isArrayWithEachItem",{enumerable:!0,get:function(){return u3.isArrayWithEachItem}});var p3=SS();Object.defineProperty(b,"isNonEmptyArray",{enumerable:!0,get:function(){return p3.isNonEmptyArray}});var m3=vR();Object.defineProperty(b,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return m3.isNonEmptyArrayWithEachItem}});var g3=CR();Object.defineProperty(b,"isTuple",{enumerable:!0,get:function(){return g3.isTuple}});var f3=lo();Object.defineProperty(b,"isNonNullObject",{enumerable:!0,get:function(){return f3.isNonNullObject}});var h3=ER();Object.defineProperty(b,"isObjectWithEachItem",{enumerable:!0,get:function(){return h3.isObjectWithEachItem}});var y3=LR();Object.defineProperty(b,"isPartialOf",{enumerable:!0,get:function(){return y3.isPartialOf}});var S3=RR();Object.defineProperty(b,"isPick",{enumerable:!0,get:function(){return S3.isPick}});var P3=xR();Object.defineProperty(b,"isOmit",{enumerable:!0,get:function(){return P3.isOmit}});var A3=WR();Object.defineProperty(b,"isNonEmptyString",{enumerable:!0,get:function(){return A3.isNonEmptyString}});var b3=IR();Object.defineProperty(b,"isNonNegativeNumber",{enumerable:!0,get:function(){return b3.isNonNegativeNumber}});var _3=OR();Object.defineProperty(b,"isPositiveNumber",{enumerable:!0,get:function(){return _3.isPositiveNumber}});var w3=MR();Object.defineProperty(b,"isNonPositiveNumber",{enumerable:!0,get:function(){return w3.isNonPositiveNumber}});var T3=NR();Object.defineProperty(b,"isNegativeNumber",{enumerable:!0,get:function(){return T3.isNegativeNumber}});var v3=jR();Object.defineProperty(b,"isInteger",{enumerable:!0,get:function(){return v3.isInteger}});var k3=DR();Object.defineProperty(b,"isPositiveInteger",{enumerable:!0,get:function(){return k3.isPositiveInteger}});var C3=zR();Object.defineProperty(b,"isNegativeInteger",{enumerable:!0,get:function(){return C3.isNegativeInteger}});var E3=$R();Object.defineProperty(b,"isNonNegativeInteger",{enumerable:!0,get:function(){return E3.isNonNegativeInteger}});var L3=FR();Object.defineProperty(b,"isNonPositiveInteger",{enumerable:!0,get:function(){return L3.isNonPositiveInteger}});var R3=HR();Object.defineProperty(b,"isNumeric",{enumerable:!0,get:function(){return R3.isNumeric}});var x3=UR();Object.defineProperty(b,"isBooleanLike",{enumerable:!0,get:function(){return x3.isBooleanLike}});var W3=BR();Object.defineProperty(b,"isDateLike",{enumerable:!0,get:function(){return W3.isDateLike}});var I3=GR();Object.defineProperty(b,"isBigInt",{enumerable:!0,get:function(){return I3.isBigInt}});var O3=CS();Object.defineProperty(b,"isOneOf",{enumerable:!0,get:function(){return O3.isOneOf}});var M3=qR();Object.defineProperty(b,"isOneOfTypes",{enumerable:!0,get:function(){return M3.isOneOfTypes}});var N3=KR();Object.defineProperty(b,"isIntersectionOf",{enumerable:!0,get:function(){return N3.isIntersectionOf}});var j3=JR();Object.defineProperty(b,"isExtensionOf",{enumerable:!0,get:function(){return j3.isExtensionOf}});var D3=XR();Object.defineProperty(b,"isNullOr",{enumerable:!0,get:function(){return D3.isNullOr}});var z3=YR();Object.defineProperty(b,"isUndefinedOr",{enumerable:!0,get:function(){return z3.isUndefinedOr}});var $3=ZR();Object.defineProperty(b,"isNilOr",{enumerable:!0,get:function(){return $3.isNilOr}});var F3=QR();Object.defineProperty(b,"isAsserted",{enumerable:!0,get:function(){return F3.isAsserted}});var H3=ex();Object.defineProperty(b,"isEnum",{enumerable:!0,get:function(){return H3.isEnum}});var U3=tx();Object.defineProperty(b,"isEqualTo",{enumerable:!0,get:function(){return U3.isEqualTo}});var B3=rx();Object.defineProperty(b,"isRegex",{enumerable:!0,get:function(){return B3.isRegex}});var G3=nx();Object.defineProperty(b,"isPattern",{enumerable:!0,get:function(){return G3.isPattern}});var V3=N();Object.defineProperty(b,"generateTypeGuardError",{enumerable:!0,get:function(){return V3.generateTypeGuardError}});var q3=sx();Object.defineProperty(b,"by",{enumerable:!0,get:function(){return q3.by}});var K3=ix();Object.defineProperty(b,"toNumber",{enumerable:!0,get:function(){return K3.toNumber}});var J3=ax();Object.defineProperty(b,"toDate",{enumerable:!0,get:function(){return J3.toDate}});var X3=lx();Object.defineProperty(b,"toBoolean",{enumerable:!0,get:function(){return X3.toBoolean}});var Y3=cx();Object.defineProperty(b,"isSymbol",{enumerable:!0,get:function(){return Y3.isSymbol}})});var _s,dx,Z3,ux,px=l(()=>{"use strict";_s=g(require("node:path")),dx=require("node:url"),Z3=()=>!0,ux=()=>{if(Z3()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?_s.default.dirname(_s.default.resolve(e)):_s.default.dirname(_s.default.resolve(__filename))}return _s.default.dirname((0,dx.fileURLToPath)(__agentWitchImportMetaUrl))}});var US,mx,j,gx,Q3,Yt,BS,E,_a,Zt,GS,wa,Yo,VS,qS,KS,Ta,he,co,Ep,$e,Lp,M,JS=l(()=>{"use strict";US=g(require("node:fs")),mx=g(require("node:os")),j=g(require("node:path")),gx=g(bs());we();px();ku();ku();Q3=ux(),Yt=e=>e.trim().toLowerCase(),BS=e=>Yt(e).replace(/@/g,"-at-").replace(/\./g,"-").replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,""),E=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return j.default.resolve(e);let t=j.default.resolve(Q3),r=j.default.basename(t),o=j.default.basename(j.default.dirname(t));return r===tS&&(o===Jt||o===wr)?j.default.dirname(t):r===Jt||r===wr?t:j.default.join(mx.default.homedir(),Jt)},_a=(e=E())=>j.default.join(e,tS),Zt=(e=E())=>j.default.join(_a(e),RL),GS=(e,t,r)=>t!==null?j.default.join(e,xe,t,r):j.default.join(e,r),wa=e=>GS(e.installDir,e.profileEmail,ua),Yo=e=>GS(e.installDir,e.profileEmail,Lt),VS=e=>j.default.join(e.logsDir,Vo),qS=e=>j.default.join(e.logsDir,qo),KS=e=>GS(e.installDir,e.profileEmail,pa),Ta=e=>e.profileEmail!==null?j.default.join(e.installDir,xe,e.profileEmail,io):j.default.join(e.installDir,io),he=(e=E())=>ma(e),co=(e=E())=>ao(e)?_u:bu,Ep=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Yt(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Yt(t):null},$e=(e=E())=>{let t=j.default.join(e,eS);if(!US.default.existsSync(t))return null;try{let r=JSON.parse(US.default.readFileSync(t,"utf8"));if((0,gx.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Yt(r.email)}catch{return null}return null},Lp=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Yt(r):null}let t=Ep();return t!==null?t:$e()},M=e=>{let t=E(),r=_a(t),o=Zt(t),n=Lp(e);if(n!==null){let S=j.default.join(t,xe,n),f=j.default.join(S,wu),y=j.default.join(S,ua),p=j.default.join(S,Lt),P=j.default.join(S,pa),w=j.default.join(S,io),h=j.default.join(S,Lt,Vo),A=j.default.join(S,Lt,qo);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:p,mainLogPath:h,errorLogPath:A,reportsDir:P,deviceKeypairPath:w,configPath:j.default.join(S,"config.json"),harnessRootDir:f,harnessManifestPath:j.default.join(f,vu),harnessSetsDir:j.default.join(f,Tu)}}let s=j.default.join(t,wu),i=j.default.join(t,ua),a=j.default.join(t,Lt),c=j.default.join(t,pa),d=j.default.join(t,io),u=j.default.join(t,Lt,Vo),m=j.default.join(t,Lt,qo);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:u,errorLogPath:m,reportsDir:c,deviceKeypairPath:d,configPath:j.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:j.default.join(s,vu),harnessSetsDir:j.default.join(s,Tu)}}});var e6,ws,XS=l(()=>{"use strict";e6=e=>{let t=e?.trim();if(t===void 0||!/^\d+$/.test(t))return null;let r=Number.parseInt(t,10);return r>0&&r<=65535?r:null},ws=e=>e.filePort??e6(e.envValue)??e.defaultPort});var YS,fx,t6,r6,ZS,Ts,hx=l(()=>{"use strict";YS=g(require("node:fs")),fx=g(require("node:path"));we();JS();XS();t6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),r6=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,ZS=e=>{let t=fx.default.join(e,da.wakePort);if(!YS.default.existsSync(t))return null;try{let r=JSON.parse(YS.default.readFileSync(t,"utf8"));if(t6(r)&&r6(r.wakePort))return r.wakePort}catch{return null}return null},Ts=(e=E())=>ws({filePort:ZS(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:co(e)})});var yx={};St(yx,{isAgentWitchLocalInstallDir:()=>ao,readActiveProfileEmailFromFile:()=>$e,readAgentWitchWakePortFromFile:()=>ZS,resolveActiveProfileEmail:()=>Lp,resolveActiveProfileEmailFromEnv:()=>Ep,resolveAgentWitchAppBundlePath:()=>Zt,resolveAgentWitchAppDir:()=>_a,resolveAgentWitchDefaultWakePort:()=>co,resolveAgentWitchDeviceKeypairPath:()=>Ta,resolveAgentWitchErrorLogPath:()=>qS,resolveAgentWitchInstallDir:()=>E,resolveAgentWitchLaunchAgentPrefix:()=>he,resolveAgentWitchLocalLayout:()=>M,resolveAgentWitchLogsDir:()=>Yo,resolveAgentWitchMainLogPath:()=>VS,resolveAgentWitchProjectsDir:()=>wa,resolveAgentWitchReportsDir:()=>KS,resolveAgentWitchRuntimeWakePort:()=>Ts,resolveAgentWitchWakePortFromSources:()=>ws,sanitizeProfileEmailForDir:()=>Yt,sanitizeProfileEmailForLaunchAgentLabel:()=>BS});var V=l(()=>{"use strict";JS();hx();XS()});var QS,eP,Rp=l(()=>{"use strict";QS=new Set(["","loginwindow","_mbsetupuser","root"]),eP=5e3});var Sx,o6,Px,tP,rP=l(()=>{"use strict";Sx=require("node:child_process");Rp();o6=e=>e.trim().toLowerCase(),Px=e=>e==null?!1:!QS.has(o6(e)),tP=()=>{if(process.platform!=="darwin")return null;try{let t=(0,Sx.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return Px(t)?t:null}catch{return null}}});var bx,Ax,Rt,va=l(()=>{"use strict";bx=g(require("node:os"));rP();Ax=e=>e.trim().toLowerCase(),Rt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?tP():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??bx.default.userInfo().username;return Ax(r)===Ax(o)}});var _x,wx,Zo,Tx=l(()=>{"use strict";_x=require("node:child_process"),wx=g(require("node:fs"));V();va();Zo=(e=E())=>{let t=Zt(e);if(!wx.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!Rt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=$e(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,_x.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var vx,ka,xp=l(()=>{"use strict";vx=require("node:child_process"),ka=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,vx.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Wp,oP,kx,se,Ip,Ca=l(()=>{"use strict";Wp=g(require("node:fs")),oP=g(require("node:path"));V();we();kx=e=>{let t=oP.default.join(e,xe);return Wp.default.existsSync(t)?Wp.default.readdirSync(t).filter(r=>Wp.default.statSync(oP.default.join(t,r)).isDirectory()).map(r=>Yt(r)).toSorted():[]},se=(e=E())=>{let t=he(e),r=kx(e);return[{profileEmail:$e(e)??r[0]??null,launchAgentLabel:t}]},Ip=(e=E())=>kx(e)});var nP,Cx,Ex,n6,Tr,Op=l(()=>{"use strict";nP=g(require("node:fs")),Cx=g(require("node:os")),Ex=g(require("node:path"));V();Ca();n6=()=>Ex.default.join(Cx.default.homedir(),"Library","LaunchAgents"),Tr=(e=E())=>{let t=he(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of se(e))r.add(n.launchAgentLabel);let o=n6();if(nP.default.existsSync(o))for(let n of nP.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var Lx,Ea,Rx=l(()=>{"use strict";V();xp();Op();Ca();Lx=(e=E())=>{let t=new Set(se(e).map(r=>r.launchAgentLabel));return Tr(e).filter(r=>!t.has(r))},Ea=(e=E())=>{for(let t of Lx(e))ka(t)}});var La,sP=l(()=>{"use strict";V();xp();Op();La=(e=E())=>{for(let t of Tr(e))ka(t)}});var xx,Wx,s6,Qo,Ix=l(()=>{"use strict";xx=require("node:child_process"),Wx=require("node:util"),s6=(0,Wx.promisify)(xx.execFile),Qo=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await s6("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var en,i6,iP,aP=l(()=>{"use strict";en=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),i6=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,iP=e=>{let t=e.pathValue??i6(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${en(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${en(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${en(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${en(e.homeDir)}</string>
    <key>PATH</key>
    <string>${en(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${en(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${en(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var Mp,lP=l(()=>{"use strict";Mp=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Ra,cP,Np,jp,vr,Dp=l(()=>{"use strict";Ra=g(require("node:fs")),cP=g(require("node:os")),Np=g(require("node:path"));we();V();aP();lP();jp=(e,t=cP.default.homedir())=>Np.default.join(t,"Library","LaunchAgents",`${e}.plist`),vr=e=>{let t=e.installDir??E(),r=e.homeDir??cP.default.homedir(),o=jp(e.launchAgentLabel,r),n=Ra.default.existsSync(o)?Ra.default.readFileSync(o,"utf8"):null;if(n!==null&&Mp(n))return{ok:!0,rewritten:!1,plistPath:o};let s=iP({launchAgentLabel:e.launchAgentLabel,runPath:Np.default.join(t,LL,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??Ts(t)});if(!Mp(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Ra.default.mkdirSync(Np.default.dirname(o),{recursive:!0}),Ra.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var Mx,Nx,jx,xa,a6,l6,Ox,Fe,dP=l(()=>{"use strict";Mx=require("node:child_process"),Nx=g(require("node:fs")),jx=require("node:util");V();Dp();va();xa=(0,jx.promisify)(Mx.execFile),a6=async e=>{try{return await xa("launchctl",["print",e]),!0}catch{return!1}},l6=async(e,t,r)=>{await a6(t)&&await xa("launchctl",["bootout",t]).catch(()=>{}),await xa("launchctl",["bootstrap",e,r]),await xa("launchctl",["enable",t])},Ox=async e=>{try{return await xa("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Fe=async(e,t=E())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!Rt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=vr({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await Ox(n))return{ok:!0};let i=s.plistPath;if(!Nx.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await l6(o,n,i),await Ox(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var tn,Dx=l(()=>{"use strict";V();dP();Ca();tn=async(e=E())=>{let t=[];for(let r of se(e))(await Fe(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var zx,$x,Fx=l(()=>{"use strict";zx=/(<key>AGENT_WITCH_WAKE_PORT<\/key>\s*<string>)[^<]*(<\/string>)/,$x=(e,t)=>zx.test(e)?e.replace(zx,`$1${String(t)}$2`):null});var zp,Hx,uP,Ux=l(()=>{"use strict";zp=g(require("node:fs")),Hx=g(require("node:os"));Dp();Fx();uP=e=>{let t=e.homeDir??Hx.default.homedir(),r=[e.launchAgentPrefix,`${e.launchAgentPrefix}-wake`,`${e.launchAgentPrefix}-live`],o=[];for(let n of r){let s=jp(n,t);if(!zp.default.existsSync(s))continue;let i=zp.default.readFileSync(s,"utf8"),a=$x(i,e.wakePort);a===null||a===i||(zp.default.writeFileSync(s,a,"utf8"),o.push(s))}return o}});var at,kr,Bx=l(()=>{"use strict";sP();va();Rp();at=e=>{Rt()||(La(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},kr=(e,t=eP)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{Rt()||e()},t);return()=>{clearInterval(r)}}});var re=l(()=>{"use strict";NL();Tx();xp();Rx();sP();Op();va();Ix();Dx();dP();Dp();lP();Ux();aP();Ca();rP();Rp();Bx()});var pP=l(()=>{"use strict";re()});var Gx,Vx,$p,qx,vs,Kx,Jx,rn=l(()=>{"use strict";Gx=".agent-witch",Vx="memory",$p="project.json",qx="chunks.ndjson",vs="runs.ndjson",Kx="reports",Jx=".json"});var Xx=l(()=>{"use strict";rn()});var Yx,Fp,mP=l(()=>{"use strict";Yx=g(require("node:path"));Xx();Fp=(e,t)=>Yx.default.join(e.trim(),`${t.trim()}${Jx}`)});var Wa,Zx,Qx=l(()=>{"use strict";Wa="agent-witch.js",Zx="command"});var Hp=l(()=>{"use strict";Qx()});var on,eW,tW=l(()=>{"use strict";Hp();on=e=>`'${e.replace(/'/g,"'\\''")}'`,eW=e=>{let t=`${e.installDir.trim()}/${"app"}/${Wa}`,r=[on("node"),on(t),"report","write","--key",on(e.reportKey.trim()),"--agent-run-id",on(e.agentRunId.trim()),"--status",on(e.status),"--summary",on(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",on(e.details.trim())),r.join(" ")}});var Qt,rW,c6,gP,Up=l(()=>{"use strict";mP();tW();Qt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},rW=e=>e===Qt.COMPLETED||e===Qt.FAILED,c6=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),gP=(e,t)=>{let r=Fp(t.reportsDir,t.reportKey),o=eW({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Qt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${c6({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var He=l(()=>{"use strict";we();V()});var Oa,nW,oW,sW,d6,ks,u6,iW,Ma,Na,fP,aW,lW,ja=l(()=>{"use strict";Oa=g(require("node:fs")),nW=g(require("node:path"));Up();mP();He();oW=50,sW=e=>{let t=M(),r=Fp(t.reportsDir,e);return Oa.default.mkdirSync(nW.default.dirname(r),{recursive:!0}),r},d6=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},ks=e=>{let t=sW(e);if(!Oa.default.existsSync(t))return null;try{let r=JSON.parse(Oa.default.readFileSync(t,"utf8"));return d6(r)?r:null}catch{return null}},u6=(e,t)=>{let r=[...e,t];return r.length>oW?r.slice(r.length-oW):r},iW=e=>{let t=sW(e.reportKey);Oa.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Ma=e=>{let t=ks(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:u6(t?.history??[],o)};return iW(n),n},Na=e=>{let t=ks(e.reportKey);return t!==null?t:Ma({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Qt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},fP=(e,t)=>{let r=t.trim();if(r.length===0)return ks(e);let o=ks(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return iW(s),s},aW=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},lW=e=>{if(e===null||!rW(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Qt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var p6,m6,Da,cW,Bp,hP=l(()=>{"use strict";Up();ja();p6=new Set(Object.values(Qt)),m6=e=>p6.has(e),Da=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},cW=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Bp=e=>{if(e[0]!=="write")return cW(),1;let r=Da(e,"--key"),o=Da(e,"--agent-run-id"),n=Da(e,"--status"),s=Da(e,"--summary"),i=Da(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!m6(n)?(cW(),1):(Ma({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var lt,nn=l(()=>{"use strict";lt=()=>!0});var yP,dW,sn,Gp=l(()=>{"use strict";yP=g(require("node:path")),dW=require("node:url");nn();sn=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=yP.default.resolve(t);return lt()?r===yP.default.resolve(__filename):e===void 0?!1:r===(0,dW.fileURLToPath)(e)}});var Vp,Cs,h6,Cle,Es=l(()=>{"use strict";Vp="agent-witch.js",Cs="deps.tar.gz",h6="install.sh",Cle={mainScript:`app/${Vp}`,depsArchive:`app/${Cs}`,installShell:h6}});var gW=l(()=>{"use strict";Es()});var fW=l(()=>{"use strict";Es();gW()});var za,PP,qp,y6,$a,Ue,Rs,Fa,Ha,an,AP=l(()=>{"use strict";za=g(require("node:fs")),PP=g(require("node:path"));fW();V();qp="install-version.json",y6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$a=(e=E())=>PP.default.join(e,qp),Ue=(e=E())=>{let t=$a(e);if(!za.default.existsSync(t))return null;try{let r=JSON.parse(za.default.readFileSync(t,"utf8"));return!y6(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Rs=(e,t=E())=>{let r=$a(t);za.default.mkdirSync(PP.default.dirname(r),{recursive:!0}),za.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Fa=(e=E())=>Ue(e)?.bundleVersion??"260",Ha=(e,t)=>{let r=Ue(e);if(r!==null)return r;let o={bundleVersion:"260",appOrigin:t,updatedAt:new Date().toISOString()};return Rs(o,e),o},an=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var hW,ln,bP,_P,wP,Kp,er,cn,TP=l(()=>{"use strict";hW=require("node:crypto"),ln=g(require("node:fs")),bP=g(require("node:path"));V();_P="self-update-log.ndjson",wP=100,Kp=(e=E())=>{let t=M(),r=t.installDir===e?t.logsDir:Yo({installDir:e,profileEmail:t.profileEmail});return bP.default.join(r,_P)},er=(e,t=E())=>{let r={id:(0,hW.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Kp(t);ln.default.mkdirSync(bP.default.dirname(o),{recursive:!0});let n=ln.default.existsSync(o)?ln.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-wP+1)),JSON.stringify(r)];return ln.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},cn=(e=20,t=E())=>{let r=Kp(t);if(!ln.default.existsSync(r))return[];let o=ln.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var vP,Ble,kP=l(()=>{"use strict";Es();vP="deps",Ble=`${"app"}/${Cs}`});var yW=l(()=>{"use strict";kP()});var SW,uo,dn,PW,CP,EP,AW=l(()=>{"use strict";SW=require("node:child_process"),uo=g(require("node:fs")),dn=g(require("node:path"));Es();kP();PW=e=>dn.default.join(e,"app",vP),CP=e=>{let t=dn.default.join(e,"app"),r=dn.default.join(t,Cs);uo.default.existsSync(r)&&(uo.default.rmSync(PW(e),{recursive:!0,force:!0}),uo.default.mkdirSync(t,{recursive:!0}),(0,SW.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),uo.default.rmSync(r,{force:!0}))},EP=e=>{uo.default.rmSync(dn.default.join(e,"node_modules"),{recursive:!0,force:!0}),uo.default.rmSync(dn.default.join(e,"package.json"),{force:!0}),uo.default.rmSync(dn.default.join(e,"package-lock.json"),{force:!0})}});var bW=l(()=>{"use strict";yW();AW()});var Ua,Ba=l(()=>{"use strict";Ua="agent-witch.service"});var _W=l(()=>{"use strict";Ba()});var Jp,Xp,Yp=l(()=>{"use strict";Jp="AGENT_WITCH_EXTERNAL_BRIDGE",Xp="AGENT_WITCH_EXTERNAL_LIVE"});var wW=l(()=>{"use strict";Yp();Ba()});var TW,LP,vW=l(()=>{"use strict";TW=require("node:child_process");Ba();LP=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,TW.spawn)("systemctl",["--user","restart",Ua],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${Ua} exited ${o??"unknown"}`))})})});var kW=l(()=>{"use strict";Ba();_W();wW();vW()});var ct,Zp,CW=l(()=>{"use strict";ct="https://www.agentwitch.com",Zp="wss://www.agentwitch.com/api/agent-witch/ws"});var Ga,Cr,EW=l(()=>{"use strict";Ga="127.0.0.1",Cr=`http://${Ga}:43347`});var Pt=l(()=>{"use strict";CW();EW()});var Va,Qp,LW,xP,P6,RW,OP,xW,xt,qa,Ka,MP,WP,IP,Ja,Xa,NP,jP,xs=l(()=>{"use strict";Va=g(require("node:fs")),Qp=g(require("node:path")),LW="active-writer-work.json",xP=new Set,P6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),RW=e=>e.profileEmail===null?Qp.default.join(e.installDir,LW):Qp.default.join(e.installDir,"profiles",e.profileEmail,LW),OP=e=>{let t=RW(e);if(!Va.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Va.default.readFileSync(t,"utf8"));return!P6(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},xW=(e,t)=>{let r=RW(e);Va.default.mkdirSync(Qp.default.dirname(r),{recursive:!0}),Va.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},xt=e=>OP(e).activeCount>0,qa=e=>{let t=OP(e);xW(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},Ka=e=>{let t=OP(e),r=Math.max(0,t.activeCount-1);if(xW(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of xP)o()},MP=e=>(xP.add(e),()=>{xP.delete(e)}),WP=null,IP=null,Ja=e=>{WP=e},Xa=e=>{IP=e},NP=()=>{let e=WP;return WP=null,e},jP=()=>{let e=IP;return IP=null,e}});var We,em=l(()=>{"use strict";We=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Ws,tm,Ya,DP=l(()=>{"use strict";Ws="qwen2.5:7b",tm="nomic-embed-text",Ya="Install Ollama from https://ollama.com/download"});var Za,zP,rm=l(()=>{"use strict";DP();Za=()=>`
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
    echo "Ollama is missing. ${Ya}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${Ya}" >&2
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
  agent_witch_ensure_ollama_model "${Ws}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${tm}" "\${pull_log}"
}
`,zP=()=>`
${Za()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var WW,A6,om,$P=l(()=>{"use strict";WW=require("node:child_process");V();rm();A6=e=>new Promise(t=>{let r=(0,WW.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:E()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),om=async(e=A6)=>{let t=`${Za()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var po,nm,IW,b6,OW,Os,_6,w6,T6,Is,un,pn,MW=l(()=>{"use strict";po=g(require("node:fs")),nm=g(require("node:path"));bW();kW();re();V();Es();Pt();AP();xs();em();TP();$P();IW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),b6=e=>{let t=$e(e),r=t===null?M():M(t);if(!po.default.existsSync(r.configPath))return null;try{let o=JSON.parse(po.default.readFileSync(r.configPath,"utf8"));return!IW(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},OW=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!IW(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},Os=async e=>(await OW(e))?.bundleVersion??null,_6=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=nm.default.join(t,r);po.default.mkdirSync(nm.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());po.default.writeFileSync(n,s),r.endsWith(".js")&&po.default.chmodSync(n,493)},w6=async()=>{if(process.platform==="linux"){try{await LP()}catch(e){let t=e instanceof Error?e.message:String(e);console.warn(`[agent-witch-self-update] Linux service restart skipped: ${t}`)}return}Ea(),await tn()},T6=(e,t)=>e!==null?We(e):t??ct,Is=(e,t)=>({localBundleVersion:t,...e}),un=async e=>{let t=E(),r=Ue(t),o=r?.bundleVersion??null,n=await om();er({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=b6(t),i=T6(s,r?.appOrigin);if(i===null){let d=Is({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return er({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await OW(i);if(a===null){let d=Is({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return er({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||an(o,a.bundleVersion))){let d=Is({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return er({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let S of a.scripts)await _6(i,t,S);let d=nm.default.join(t,Vp);po.default.existsSync(d)&&po.default.rmSync(d,{force:!0}),CP(t),EP(t),Rs({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let u=M($e(t));if(xt(u)){Xa("install-bundle-update");let S=Is({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return er({event:"update_applied",ok:!0,message:S.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),S}await w6();let m=Is({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return er({event:"update_applied",ok:!0,message:m.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}catch(d){let u=d instanceof Error?d.message:"Agent Witch self-update failed.",m=Is({ok:!1,updated:!1,message:u,remoteBundleVersion:a.bundleVersion},o);return er({event:"update_failed",ok:!1,message:u,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},pn=()=>{let e=E();return{local:Ue(e),logs:cn(20,e)}}});var NW={};St(NW,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>qp,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Ya,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>tm,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>Ws,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>_P,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>wP,appendAgentWitchSelfUpdateLog:()=>er,buildAgentWitchEnsureOllamaShell:()=>Za,buildAgentWitchInstallScriptOllama:()=>zP,buildAgentWitchSelfUpdateStatus:()=>pn,ensureAgentWitchInstallVersionRecorded:()=>Ha,ensureAgentWitchOllamaInstalled:()=>om,fetchAgentWitchRemoteInstallBundleVersion:()=>Os,isRemoteAgentWitchBundleVersionNewer:()=>an,readAgentWitchInstallVersion:()=>Ue,readAgentWitchSelfUpdateLogs:()=>cn,resolveAgentWitchAppOriginFromWsUrl:()=>We,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Fa,resolveAgentWitchInstallVersionPath:()=>$a,resolveAgentWitchSelfUpdateLogPath:()=>Kp,runAgentWitchSelfUpdate:()=>un,writeAgentWitchInstallVersion:()=>Rs});var tr=l(()=>{"use strict";AP();TP();MW();em();DP();rm();$P()});var FP={};St(FP,{buildAgentWitchSelfUpdateStatus:()=>pn,fetchAgentWitchRemoteInstallBundleVersion:()=>Os,runAgentWitchSelfUpdate:()=>un});var HP=l(()=>{"use strict";tr()});function Ms(e){return(0,jW.createHash)("sha256").update(e.trim()).digest("hex")}var jW,sm=l(()=>{"use strict";jW=require("node:crypto")});var Ns,Qa,v6,js,UP,im=l(()=>{"use strict";Ns=g(require("node:fs")),Qa=g(require("node:path"));sm();He();v6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),js=e=>{if(!Ns.default.existsSync(e))return null;try{let t=JSON.parse(Ns.default.readFileSync(e,"utf8"));return!v6(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Ms(t.pairingToken.trim())}catch{return null}},UP=(e=E())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(js(Qa.default.join(e,"config.json")));let n=Qa.default.join(e,xe);if(!Ns.default.existsSync(n))return t;for(let s of Ns.default.readdirSync(n)){let i=Qa.default.join(n,s);Ns.default.statSync(i).isDirectory()&&o(js(Qa.default.join(i,"config.json")))}return t}});var Ds,el=l(()=>{"use strict";Ds="connection-health.json"});var mn,am,k6,tl,Ae,BP,lm,Ie,cm=l(()=>{"use strict";mn=g(require("node:fs")),am=g(require("node:path"));el();k6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),tl=e=>e.profileEmail===null?am.default.join(e.installDir,Ds):am.default.join(e.installDir,"profiles",e.profileEmail,Ds),Ae=e=>{let t=tl(e);if(!mn.default.existsSync(t))return null;try{let r=JSON.parse(mn.default.readFileSync(t,"utf8"));return!k6(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},BP=e=>{let t=tl(e);mn.default.existsSync(t)&&mn.default.rmSync(t,{force:!0})},lm=(e,t)=>{let r=tl(e),o=Ae(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};mn.default.mkdirSync(am.default.dirname(r),{recursive:!0}),mn.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Ie=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var rl,DW=l(()=>{"use strict";el();cm();rl=(e,t)=>{if(!t.socketOpen)return!1;let r=Ae(e);return r===null?!1:!Ie(r,t.staleAfterMs??12e4,t.nowMs)}});var GP,zW=l(()=>{"use strict";cm();GP=(e,t)=>!(e!==null&&!Ie(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var gn=l(()=>{"use strict";cm();DW();zW();el()});var dm,VP,C6,E6,$W,FW=l(()=>{"use strict";dm=g(require("node:fs")),VP=g(require("node:path"));V();we();gn();im();C6=12e4,E6=e=>{let t=VP.default.join(e,xe);return dm.default.existsSync(t)?dm.default.readdirSync(t).filter(r=>dm.default.statSync(VP.default.join(t,r)).isDirectory()):[]},$W=(e=E())=>{let t=null,r=-1;for(let o of E6(e)){let n=M(o),s=Ae(n);if(s===null||Ie(s,C6))continue;let i=js(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var qP,HW,um,ol,nl,L6,R6,x6,UW,ye,Se,pm,rr,Wt=l(()=>{"use strict";qP=g(require("node:fs")),HW=g(require("node:os")),um=g(require("node:path")),ol={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},nl=e=>e.trim().length>0,L6=e=>{let t=um.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},R6=()=>{let e=HW.default.homedir(),t=um.default.join(e,".local","bin","agent");if(qP.default.existsSync(t))return t;let r=um.default.join(e,".local","bin","cursor-agent");return qP.default.existsSync(r)?r:ol.cursorCommand},x6=e=>{let t=e.trim();return!nl(t)||t===ol.cursorCommand?R6():t},UW=(e,t)=>L6(e)?t:["agent",...t],ye=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Se=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:nl(t)?t.trim():ol.claudeCommand,codexCommand:nl(r)?r.trim():ol.codexCommand,cursorCommand:x6(o),antigravityCommand:nl(n)?n.trim():ol.antigravityCommand}},pm=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:UW(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},rr=(e,t,r,o)=>{let n=t.trim();if(!nl(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:UW(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"--dangerously-skip-permissions","-p",n]}}});var mo,W6,fn,I6,zs,sl=l(()=>{"use strict";mo=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,W6=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:mo(s.inputTokens)+mo(s.outputTokens)+mo(s.cacheReadInputTokens)+mo(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},fn=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=mo(a.input_tokens)+mo(a.cache_creation_input_tokens)+mo(a.cache_read_input_tokens),d=mo(a.output_tokens),u=c+d;return u<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:u,model:W6(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},I6=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),zs=(e,t)=>{let r=fn(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??I6(r)}}});var KP,O6,M6,JP,XP=l(()=>{"use strict";KP=e=>e.toLocaleString("en-US"),O6=e=>e<.01?e.toFixed(4):e.toFixed(3),M6=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${O6(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${KP(e.inputTokens)} in / ${KP(e.outputTokens)} out (${KP(e.totalTokens)} total)`,t].join(`
`)},JP=(e,t)=>{if(t===void 0)return e;let r=M6(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var mm,YP=l(()=>{"use strict";mm={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var hn,ZP,gm,QP=l(()=>{"use strict";YP();hn="auto",ZP=e=>({value:hn,label:`Auto (${mm[e]})`}),gm={anthropic:[ZP("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[ZP("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[ZP("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var $s,il,fm,Fs=l(()=>{"use strict";YP();QP();$s=e=>{let t=e?.trim()??"";if(!(t.length===0||t===hn))return t},il=(e,t)=>{let r=$s(t);return r===void 0?mm[e]:r},fm=e=>{let t=$s(e);return t===void 0?hn:t}});var hm,N6,j6,ym,BW=l(()=>{"use strict";hm={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},N6=e=>{let t=hm[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?hm["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?hm["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?hm["gemini-2.0-flash"]:null},j6=(e,t,r)=>{let o=N6(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},ym=e=>{let t=j6(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Hs,D6,z6,$6,Sm,GW=l(()=>{"use strict";BW();Hs=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),D6=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Hs(r.input_tokens),n=Hs(r.output_tokens);return o===0&&n===0?null:ym({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},z6=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Hs(r.prompt_tokens),n=Hs(r.completion_tokens);return o===0&&n===0?null:ym({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},$6=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=Hs(r.promptTokenCount),n=Hs(r.candidatesTokenCount);return o===0&&n===0?null:ym({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Sm=(e,t,r)=>e==="anthropic"?D6(t,r):e==="openai"?z6(t,r):$6(t,r)});var F6,eA,H6,U6,B6,G6,V6,tA,rA=l(()=>{"use strict";Fs();GW();F6=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},eA=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:il(e,t.model)},H6=async e=>{let t=eA("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=F6(o);n.length>0&&e.onChunk?.(n);let s=Sm("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},U6=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},B6=async e=>{let t=eA("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=U6(o);n.length>0&&e.onChunk?.(n);let s=Sm("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},G6=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},V6=async e=>{let t=eA("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=G6(n);s.length>0&&e.onChunk?.(s);let i=Sm("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},tA=async e=>{try{return e.provider==="anthropic"?await H6(e):e.provider==="openai"?await B6(e):await V6(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var dt,al=l(()=>{"use strict";dt=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var VW,q6,Pm,oA=l(()=>{"use strict";VW=g(require("node:path")),q6="writer-api-secrets.json",Pm=e=>VW.default.join(e,q6)});var nA,qW,K6,go,Ze,fo=l(()=>{"use strict";nA=g(require("node:fs"));Fs();oA();qW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),K6=e=>{if(!qW(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=$s(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},go=e=>{let t=Pm(e);if(!nA.default.existsSync(t))return{};try{let r=JSON.parse(nA.default.readFileSync(t,"utf8"));if(!qW(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=K6(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Ze=(e,t)=>go(e)[t]??null});var Be,ll=l(()=>{"use strict";Be=e=>e==="api"?"api":"cli"});var KW,Me,yn,Er=l(()=>{"use strict";KW=g(require("node:path"));al();fo();ll();Me=e=>KW.default.dirname(e),yn=(e,t)=>{if(Be(e.writerExecutionBackend)!=="api")return!1;let r=dt(t);if(r===null)return!1;let o=Me(e.layout.configPath),n=Ze(o,r);return n!==null&&n.apiKey.length>0}});var cl,sA=l(()=>{"use strict";XP();rA();al();fo();Er();cl=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=dt(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Me(e.layout.configPath),a=Ze(i,s);if(a===null){let d=Object.keys(go(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await tA({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:JP(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var JW,Us,iA=l(()=>{"use strict";JW=require("node:child_process");Wt();sl();sA();Er();Us=(e,t,r)=>new Promise(o=>{if(!ye(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(yn(e,t)){cl(e,t,r).then(o);return}let n=rr(t,r,Se({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,JW.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=zs(i.join("")),u=a.join("").trim(),m=[d.output.trim(),u].filter(S=>S.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var XW=l(()=>{"use strict"});var YW=l(()=>{"use strict";XP();iA();rA();XW();fo();Er()});var ZW,QW,e0,t0=l(()=>{"use strict";ZW="claude",QW="codex",e0="cursor"});var r0,J6,aA,dl,Am=l(()=>{"use strict";r0=g(require("node:path"));Pt();we();J6="ws://localhost:3000/api/agent-witch/ws",aA=e=>e.replace(/\/$/,""),dl=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return aA(t);let r=r0.default.basename(e.installDir);if(r===ca.production)return Zp;let o=e.configWsUrl?.trim()??"";return r===ca.localhost?o.length>0?aA(o):J6:o.length>0?aA(o):Zp}});var Y6,lA,cA=l(()=>{"use strict";t0();Am();ll();Y6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lA=e=>{if(!Y6(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=dl({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??ZW,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??QW,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??e0,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",u=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:u,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Be(t.writerExecutionBackend),layout:e.layout}}}});var dA,uA,pA=l(()=>{"use strict";dA=g(require("node:fs"));V();cA();uA=e=>{let t=M(e);if(!dA.default.existsSync(t.configPath))return null;try{let r=JSON.parse(dA.default.readFileSync(t.configPath,"utf8")),o=lA({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var ul,o0=l(()=>{"use strict";ul=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var mA,Z6,gA,n0=l(()=>{"use strict";mA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Z6=e=>{if(!mA(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!mA(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let u=s.items.flatMap(m=>{if(!mA(m))return[];let S=typeof m.itemKey=="string"?m.itemKey.trim():"",f=typeof m.relativePath=="string"?m.relativePath:"",y=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return S.length===0||y.length===0?[]:[{itemKey:S,relativePath:f,contentSha256:y}]});return u.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:u}]});return{id:t,projectId:r,digest:o,entries:n}},gA=Z6});var s0,Q6,bm,fA=l(()=>{"use strict";s0=g(require("node:path")),Q6=(e,t)=>{let r=t.trim();return s0.default.join(e,"components","store",r.slice(0,2),r)},bm=Q6});var i0,e7,hA,a0=l(()=>{"use strict";i0=g(require("node:fs"));fA();e7=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=bm(e.installDir,n.contentSha256);i0.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},hA=e7});var pl,Bs,t7,yA,r7,SA,PA=l(()=>{"use strict";pl=g(require("node:fs")),Bs=g(require("node:path"));fA();t7=(e,t)=>Bs.default.join(e.installDir,"runs",t,"overlay"),yA=(e,t)=>Bs.default.join(t7(e,t),".cursor"),r7=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=yA(e,t);pl.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=bm(e.installDir,i.contentSha256);if(!pl.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Bs.default.join(n,c):Bs.default.join(n,i.itemKey);pl.default.mkdirSync(Bs.default.dirname(d),{recursive:!0}),pl.default.copyFileSync(a,d)}return{ok:!0}},SA=r7});var AA,l0,o7,ml,c0=l(()=>{"use strict";AA=g(require("node:fs")),l0=g(require("node:path")),o7=(e,t)=>{let r=l0.default.join(e.installDir,"runs",t);AA.default.existsSync(r)&&AA.default.rmSync(r,{recursive:!0,force:!0})},ml=o7});var n7,bA,d0=l(()=>{"use strict";PA();n7=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=yA(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},bA=n7});var _A,s7,i7,a7,l7,c7,$,u0=l(()=>{"use strict";_A=g(require("node:fs"));Am();V();ll();s7="claude",i7="codex",a7="cursor",l7="agy",c7=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=M();if(!_A.default.existsSync(e.configPath))return null;try{let t=JSON.parse(_A.default.readFileSync(e.configPath,"utf8"));if(!c7(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=dl({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Be(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:s7,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:i7,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:a7,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:l7,pairingToken:s,layout:e}}catch{return null}}});var _m,p0,m0=l(()=>{"use strict";_m=g(require("node:fs"));oA();p0=(e,t)=>{let r=Pm(e);_m.default.mkdirSync(e,{recursive:!0}),_m.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{_m.default.chmodSync(r,384)}catch{}}});var gl,g0,wm=l(()=>{"use strict";gl=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},g0=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===gl(t)}});var fl,d7,wA,TA,f0=l(()=>{"use strict";fl=g(require("node:fs"));fo();m0();wm();Fs();Er();d7=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wA=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=g0(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?$s(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},TA=e=>{let t=Me(e.configPath),r={};if(fl.default.existsSync(e.configPath))try{let n=JSON.parse(fl.default.readFileSync(e.configPath,"utf8"));d7(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,fl.default.mkdirSync(t,{recursive:!0}),fl.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=wA(wA(wA(go(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);p0(t,o)}});var Tm,vA=l(()=>{"use strict";Tm={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var kA,h0=l(()=>{"use strict";al();fo();Er();Er();kA=(e,t)=>{if(yn(e,t)||t==="antigravity")return!1;let r=dt(t);if(r===null)return!1;let o=Me(e.layout.configPath),n=Ze(o,r);return n===null||n.apiKey.trim().length===0}});var y0,CA,EA=l(()=>{"use strict";y0=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},CA=async e=>{let t=y0(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=y0(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var u7,LA,S0=l(()=>{"use strict";re();pA();EA();u7=1e4,LA=()=>CA({listProfileEmails:Ip,readConfig:uA,pollIntervalMs:u7,logWaiting:e=>{console.error(e)}})});var le=l(()=>{"use strict";iA();YW();pA();Am();o0();n0();a0();PA();c0();d0();ll();u0();f0();fo();Er();wm();Fs();vA();sA();Er();h0();al();fo();S0();cA();EA()});var P0,RA,A0=l(()=>{"use strict";P0=g(require("node:path"));V();we();FW();sm();im();le();RA=(e=E())=>{let t=$W(e);if(t!==null)return t;let r=$e(e);if(r!==null){let n=js(P0.default.join(e,xe,r,"config.json"));if(n!==null)return n}let o=$()?.pairingToken.trim()??"";return o.length===0?null:Ms(o)}});var vm,b0,p7,m7,_0,km,hl,Cm,yl=l(()=>{"use strict";vm=g(require("node:fs")),b0=g(require("node:path")),p7="wake-port.json",m7=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_0=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,km=e=>b0.default.join(e,p7),hl=e=>{let t=km(e);if(!vm.default.existsSync(t))return null;try{let r=JSON.parse(vm.default.readFileSync(t,"utf8"));if(m7(r)&&_0(r.wakePort))return r.wakePort}catch{return null}return null},Cm=(e,t)=>{if(!_0(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=km(e);vm.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var qpe,Kpe,Jpe,It,w0,Sl=l(()=>{"use strict";V();yl();He();yl();qpe=co(),Kpe=`${he()}-wake`,Jpe=he(),It=()=>{let e=E();return ws({filePort:hl(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:co(e)})},w0=e=>{let t=E();hl(t)===null&&Cm(t,e)}});var T0=l(()=>{"use strict";sm();re();im();A0();le();Sl()});var xA,Pl,Al,v0=l(()=>{"use strict";xA=g(require("node:os"));T0();Pl=()=>{let e=se();return{ok:!0,port:It(),hostname:xA.default.hostname(),profileCount:e.length}},Al=()=>{let e=se(),t=RA(),r=UP();return{hostname:xA.default.hostname(),port:It(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var WA=l(()=>{"use strict";v0()});var k0,C0,E0,Em,Gs=l(()=>{"use strict";k0="materialization.json",C0="backups",E0=".gitignore",Em=e=>`harness-set:${e.trim()}`});var L0,R0,Lm,x0=l(()=>{"use strict";L0=g(require("node:crypto")),R0=g(require("node:fs")),Lm=e=>{try{let t=R0.default.readFileSync(e);return L0.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var ho,Sn,g7,W0,IA,I0=l(()=>{"use strict";ho=g(require("node:fs")),Sn=g(require("node:path"));x0();g7=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=Sn.default.join(t,n,o);return ho.default.mkdirSync(Sn.default.dirname(s),{recursive:!0}),ho.default.copyFileSync(r,s),Sn.default.relative(e,s).replaceAll("\\","/")},W0=e=>{let t=Sn.default.join(e.repoRoot,e.repoRelativeDestination),r=Lm(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(ho.default.existsSync(t)){let n=Lm(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=g7(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return ho.default.mkdirSync(Sn.default.dirname(t),{recursive:!0}),ho.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return ho.default.mkdirSync(Sn.default.dirname(t),{recursive:!0}),ho.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},IA=e=>{let t=Lm(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var OA,O0,Vs,Rm=l(()=>{"use strict";OA=g(require("node:fs"));Gs();O0=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Vs=e=>{if(!OA.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(OA.default.readFileSync(e,"utf8"));if(O0(t)&&t.version===1&&O0(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var yo,xm,Wm,MA=l(()=>{"use strict";yo=g(require("node:fs")),xm=g(require("node:path"));Gs();Wm=e=>{let t=new Set(e.setSlugs.map(s=>Em(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=xm.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=xm.default.join(e.repoRoot,i.backupPath);yo.default.existsSync(c)?(yo.default.mkdirSync(xm.default.dirname(a),{recursive:!0}),yo.default.copyFileSync(c,a),o.push(s)):yo.default.existsSync(a)&&yo.default.rmSync(a,{force:!0})}else yo.default.existsSync(a)&&yo.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var NA,qs,Im=l(()=>{"use strict";NA=g(require("node:path"));Gs();qs=e=>({ledgerFilePath:NA.default.join(e.metaDirPath,k0),backupsDirPath:NA.default.join(e.metaDirPath,C0)})});var jA,M0,N0=l(()=>{"use strict";jA=g(require("node:path")),M0=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return jA.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return jA.default.posix.join(s,e,n)}});var DA,j0,_l,zA=l(()=>{"use strict";DA=g(require("node:fs")),j0=g(require("node:path")),_l=(e,t)=>{DA.default.mkdirSync(j0.default.dirname(e),{recursive:!0}),DA.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var $A,f7,Ge,So=l(()=>{"use strict";$A=g(require("node:os")),f7=e=>{let t=e.trim();return t.startsWith("~/")?`${$A.default.homedir()}${t.slice(1)}`:t==="~"?$A.default.homedir():t},Ge=f7});var Om,D0,h7,z0,$0=l(()=>{"use strict";Om=g(require("node:fs")),D0=g(require("node:path"));Gs();rn();h7=`*
!${$p}
`,z0=e=>{let t=D0.default.join(e,E0);Om.default.existsSync(t)||(Om.default.mkdirSync(e,{recursive:!0}),Om.default.writeFileSync(t,h7))}});var Pn,At,An=l(()=>{"use strict";Pn=g(require("node:path"));rn();So();At=e=>{let t=Ge(e),r=Pn.default.join(t,Gx);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Pn.default.join(r,"rag"),memoryDirPath:Pn.default.join(r,Vx),reportsDirPath:Pn.default.join(r,Kx),metaFilePath:Pn.default.join(r,$p),ragChunksFilePath:Pn.default.join(r,"rag",qx)}}});var or,H0,y7,S7,Je,Mm=l(()=>{"use strict";or=g(require("node:fs")),H0=g(require("node:path"));rn();$0();An();y7=(e,t)=>{if(or.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};or.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},S7=e=>{or.default.existsSync(e.ragChunksFilePath)||or.default.writeFileSync(e.ragChunksFilePath,"");let t=H0.default.join(e.memoryDirPath,vs);or.default.existsSync(t)||or.default.writeFileSync(t,"")},Je=e=>{let t=At(e.projectFolderPath);return or.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),or.default.mkdirSync(t.ragDirPath,{recursive:!0}),or.default.mkdirSync(t.memoryDirPath,{recursive:!0}),z0(t.metaDirPath),y7(t,e),S7(t),{ok:!0,layout:t}}});var U0,B0,G0,V0,Nm,jm=l(()=>{"use strict";U0="components",B0="store",G0="versions",V0="installed.json",Nm=e=>`harness-set:${e.trim()}`});var FA,q0,Dm,HA=l(()=>{"use strict";FA=g(require("node:fs")),q0=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Dm=e=>{if(!FA.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(FA.default.readFileSync(e,"utf8"));if(q0(t)&&t.version===1&&q0(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var wl,Ks,zm=l(()=>{"use strict";wl=g(require("node:path"));jm();Ks=e=>{let t=wl.default.join(e,U0);return{componentsRootDir:t,storeDir:wl.default.join(t,B0),versionsDir:wl.default.join(t,G0),installedFilePath:wl.default.join(t,V0)}}});var UA,K0,$m,Fm,Hm=l(()=>{"use strict";UA=g(require("node:crypto")),K0=g(require("node:fs")),$m=e=>UA.default.createHash("sha256").update(e,"utf8").digest("hex"),Fm=e=>{try{let t=K0.default.readFileSync(e);return UA.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var BA,J0,X0,Y0=l(()=>{"use strict";BA=g(require("node:fs")),J0=g(require("node:path")),X0=(e,t)=>{BA.default.mkdirSync(J0.default.dirname(e),{recursive:!0}),BA.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var GA,VA,Z0,Q0=l(()=>{"use strict";GA=g(require("node:fs")),VA=g(require("node:path")),Z0=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=VA.default.join(e,r),n=VA.default.join(o,`${t.versionId}.json`);GA.default.mkdirSync(o,{recursive:!0}),GA.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var Um,eI,tI,rI=l(()=>{"use strict";Um=g(require("node:fs")),eI=g(require("node:path"));Hm();tI=e=>{let t=$m(e.content),r=eI.default.join(e.storeDir,t);return Um.default.existsSync(r)||(Um.default.mkdirSync(e.storeDir,{recursive:!0}),Um.default.writeFileSync(r,e.content)),t}});var qA,oI,P7,Bm,KA=l(()=>{"use strict";qA=g(require("node:fs")),oI=g(require("node:path"));jm();HA();zm();Hm();Y0();Q0();rI();P7=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Bm=e=>{let t=Ks(e.installDir),r=Nm(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!P7(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=oI.default.join(e.harnessRootDir,a);if(!qA.default.existsSync(c))continue;let d=qA.default.readFileSync(c,"utf8"),u=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Fm(c);if(u!==null){if($m(d)!==u)throw new Error(`Harness item "${i.id}" failed content hash verification.`);tI({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:u})}}if(n.length===0)return;Z0(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=Dm(t.installedFilePath);X0(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var XA,JA,nI,sI=l(()=>{"use strict";XA=g(require("node:fs"));KA();HA();zm();JA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nI=e=>{if(!XA.default.existsSync(e.harnessManifestPath))return;let t=Ks(e.installDir),r=Dm(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(XA.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!JA(o)||o.version!==1||!JA(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!JA(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Bm({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var YA,iI,aI,lI=l(()=>{"use strict";YA=g(require("node:fs")),iI=g(require("node:path")),aI=e=>{let t=e.componentId.replaceAll("/","_"),r=iI.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!YA.default.existsSync(r))return null;try{let o=JSON.parse(YA.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Gm,Vm,cI,dI=l(()=>{"use strict";Gm=g(require("node:fs")),Vm=g(require("node:path"));jm();sI();lI();zm();Hm();cI=e=>{nI({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Ks(e.layout.installDir),r=Nm(e.setSlug),o=aI({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Vm.default.join(t.storeDir,i.contentSha256);if(Gm.default.existsSync(a)&&Fm(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Vm.default.join(e.layout.harnessRootDir,n):Vm.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Gm.default.existsSync(s))return null;try{if(!Gm.default.statSync(s).isFile())return null}catch{return null}return s}});var uI,A7,ZA,nr,Tl=l(()=>{"use strict";Rm();Im();An();uI="harness-set:",A7=e=>{let t=e.trim();if(!t.startsWith(uI))return null;let r=t.slice(uI.length).trim();return r.length>0?r:null},ZA=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=A7(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},nr=e=>{let t=At(e),{ledgerFilePath:r}=qs(t),o=Vs(r);return ZA(o)}});var qm,QA,vl,b7,Lr,kl,Js=l(()=>{"use strict";qm=g(require("node:fs")),QA=g(require("node:os")),vl=g(require("node:path")),b7=()=>qm.default.realpathSync(vl.default.resolve(QA.default.homedir())),Lr=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?vl.default.join(QA.default.homedir(),t.slice(1)):t,o;try{o=qm.default.realpathSync(vl.default.resolve(r))}catch{return null}let n=b7();return o===n||o.startsWith(`${n}${vl.default.sep}`)?o:null},kl=e=>{let t=Lr(e);if(t===null)return null;try{if(!qm.default.statSync(t).isFile())return null}catch{return null}return t}});var eb,tb=l(()=>{"use strict";eb=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Jm,pI,Km,_7,Cl,rb=l(()=>{"use strict";Jm=g(require("node:fs")),pI=g(require("node:path"));Gs();I0();Rm();MA();Im();N0();zA();So();Mm();dI();Tl();Js();tb();Km=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_7=e=>{if(!Jm.default.existsSync(e))return null;try{let t=JSON.parse(Jm.default.readFileSync(e,"utf8"));if(Km(t)&&t.version===1)return t}catch{return null}return null},Cl=e=>{let t=[...new Set(e.setSlugs.map(w=>w.trim()).filter(w=>w.length>0))],r=Ge(e.projectFolderPath),o=Lr(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Jm.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Je({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=qs(s.layout),d=nr(o).filter(w=>!t.includes(w)),u=Vs(i),m=0;if(d.length>0){let w=Wm({repoRoot:o,setSlugs:d,ledger:u});u=w.ledger,m=w.summary.removedPaths.length}if(t.length===0)return _l(i,u),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let S=_7(e.layout.harnessManifestPath);if(S===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let f=Km(S.sets)?S.sets:{},y=0,p=0,P=0;for(let w of t){let h=f[w];if(!Km(h))return{ok:!1,errorMessage:`Harness set "${w}" is not installed locally.`};let A=typeof h.version=="number"?String(h.version):"1",_=Em(w),T=Array.isArray(h.items)?h.items:[];for(let v of T){if(!Km(v))continue;let C=typeof v.path=="string"?v.path.trim():"";if(C.length===0)continue;let L=eb(C);if(L===null)continue;let I=M0(w,L),W=pI.default.posix.join(".cursor",I).replaceAll("\\","/"),U=typeof v.id=="string"?v.id.trim():"",F=cI({layout:e.layout,setSlug:w,setVersion:typeof h.version=="number"?h.version:1,manifestItemPath:C,manifestItemId:U});if(F===null)continue;let G=W0({repoRoot:o,backupsDir:a,repoRelativeDestination:W,sourceAbsolutePath:F,componentId:_,versionId:A,ledger:u});if(G.kind==="skipped_unchanged"){p+=1;continue}if(G.kind==="backed_up_user_file"){P+=1,y+=1,u={version:1,entries:{...u.entries,[W]:IA({componentId:_,versionId:A,sourceAbsolutePath:F,backupPath:G.backupPath})}};continue}y+=1,u={version:1,entries:{...u.entries,[W]:IA({componentId:_,versionId:A,sourceAbsolutePath:F})}}}}return y===0&&p===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(_l(i,u),{ok:!0,writtenFileCount:y,skippedFileCount:p,backedUpFileCount:P,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var mI,Xm,w7,T7,v7,k7,C7,E7,L7,R7,x7,El,Ym=l(()=>{"use strict";mI=g(require("node:crypto")),Xm=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},w7=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},T7=(e,t)=>{let r=w7(t),o=Xm(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},v7=(e,t,r)=>{let o=T7(t,r);return`shared/items/${e}/${o}`},k7=["rules","skills","commands","instructions","agents"],C7=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),E7=(e,t)=>[...e.filter(o=>o.id!==t.id),t],L7=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},R7=e=>mI.default.createHash("sha256").update(e,"utf8").digest("hex"),x7=e=>({id:e.id,kind:e.kind,title:e.title,path:v7(e.id,e.kind,e.title),contentSha256:R7(e.content)}),El=e=>{let t=new Date().toISOString(),r=e.existingManifest??C7(e.hostname,t),o=Xm(e.bundle.slug),n=L7(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...k7.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,u)=>{let m=x7(u);return{files:[...d.files,{relativePath:m.path,content:u.content}],nextItems:E7(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var Po,gI,Zm,W7,bn,ob=l(()=>{"use strict";Po=g(require("node:fs")),gI=g(require("node:os")),Zm=g(require("node:path"));Ym();W7=e=>{if(!Po.default.existsSync(e))return null;try{let t=JSON.parse(Po.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},bn=e=>{try{let t=W7(e.layout.harnessManifestPath),r=El({bundle:e.bundle,hostname:gI.default.hostname(),existingManifest:t});Po.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)Po.default.mkdirSync(Zm.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Zm.default.join(e.layout.harnessRootDir,o.relativePath);Po.default.mkdirSync(Zm.default.dirname(n),{recursive:!0}),Po.default.writeFileSync(n,o.content)}return Po.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var nb,fI=l(()=>{"use strict";ob();rb();nb=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=bn({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Cl({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var hI,yI=l(()=>{"use strict";hI=["rule","skill","command","instruction","agent"]});var SI,I7,O7,sr,sb=l(()=>{"use strict";yI();SI=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),I7=e=>typeof e=="string"&&hI.includes(e),O7=e=>{if(!SI(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!I7(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},sr=e=>{if(!SI(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=O7(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var PI,M7,ib,AI=l(()=>{"use strict";PI=require("node:zlib");sb();M7="x-agent-witch-token",ib=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[M7]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,PI.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=sr(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var lb,ab,ir,bI=l(()=>{"use strict";lb=g(require("node:fs")),ab=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ir=e=>{if(!lb.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(lb.default.readFileSync(e.harnessManifestPath,"utf8"));if(!ab(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=ab(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!ab(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",u=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:u.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Qm,_I=l(()=>{"use strict";Qm=()=>"~"});var wI,TI,vI=l(()=>{"use strict";wI=require("node:crypto"),TI=e=>`local-${(0,wI.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var cb,kI=l(()=>{"use strict";cb=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Ll,eg,db=l(()=>{"use strict";Ll=g(require("node:path")),eg=e=>{let t=Ll.default.dirname(e),r=Ll.default.basename(t);return r==="agents"?Ll.default.basename(Ll.default.dirname(t)):r}});var Rl,Rr,CI,N7,j7,D7,tg,EI,ub=l(()=>{"use strict";Rl=g(require("node:fs")),Rr=g(require("node:path"));vI();kI();db();CI=new Set(["node_modules",".git","dist","build",".next","coverage"]),N7=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},j7=(e,t)=>{let r=Rr.default.basename(t);if(e==="skill"){let o=t.split(Rr.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},D7=e=>{let t=[],r=(n,s)=>{let i;try{i=Rl.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&CI.has(a.name))continue;let c=Rr.default.join(n,a.name),d=s?Rr.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;cb(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=Rr.default.join(e,n);Rl.default.existsSync(s)&&r(s,n)}let o=Rr.default.join(e,"skills");return Rl.default.existsSync(o)&&r(o,"skills"),t},tg=e=>{let t=D7(e);if(t.length===0)return null;let r=Rr.default.dirname(e),o=eg(e),n=N7(o),s=t.map(i=>{let a=cb(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:TI(i.absolutePath),kind:a,title:j7(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},EI=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Rl.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||CI.has(a.name))continue;let c=Rr.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var LI,pb,z7,mb,RI=l(()=>{"use strict";LI=g(require("node:fs")),pb=g(require("node:path"));ub();Js();z7=e=>{let t=Lr(e.trim());if(t===null)return null;if(pb.default.basename(t)===".cursor")return t;let r=pb.default.join(t,".cursor");try{if(LI.default.statSync(r).isDirectory())return Lr(r)}catch{return null}return null},mb=e=>{let t=z7(e.projectPath);if(t===null)return null;let r=tg(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var xI,$7,rg,gb,WI=l(()=>{"use strict";xI=g(require("node:path"));ub();Js();db();$7=5,rg=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},gb=e=>{let t=Lr(e.scanRoot.trim());if(t===null)return rg(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of EI(t,$7,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=Lr(s);if(i===null)continue;let a=eg(i);rg(e.response,"folder",{cursorDir:i,groupName:a,repoPath:xI.default.dirname(i)});let c=tg(i);c!==null&&(r.push(c),rg(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return rg(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var II,OI,MI=l(()=>{"use strict";II=g(require("node:path")),OI=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:II.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Xe,NI,fb,F7,hb,yb,og,Sb,xl,jI=l(()=>{"use strict";Xe=g(require("node:fs")),NI=g(require("node:os")),fb=g(require("node:path"));Ym();KA();Js();MI();F7=e=>{if(!Xe.default.existsSync(e))return null;try{let t=JSON.parse(Xe.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},hb=e=>{let t=e.hostname??NI.default.hostname(),r=F7(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(u=>u.include);if(a.length===0)continue;let c=[];for(let u of a){let m=kl(u.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let S=Xe.default.readFileSync(m,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:S,setSlugs:[i.slug]})}let d=El({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)n.add(u);for(let u of d.files)s.push(u),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Xe.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Xe.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=fb.default.join(e.layout.harnessRootDir,i.relativePath);Xe.default.mkdirSync(fb.default.dirname(a),{recursive:!0}),Xe.default.writeFileSync(a,i.content)}Xe.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(u=>u.include))continue;let c=Xm(i.slug),d=r.sets[c];d!==void 0&&Bm({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},yb="reveal-cache.json",og=(e,t)=>{Xe.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Xe.default.writeFileSync(`${e.harnessRootDir}/${yb}`,`${JSON.stringify(t,null,2)}
`)},Sb=e=>{let t=`${e.harnessRootDir}/${yb}`;Xe.default.existsSync(t)&&Xe.default.unlinkSync(t)},xl=e=>{let t=`${e.harnessRootDir}/${yb}`;if(!Xe.default.existsSync(t))return null;try{let r=JSON.parse(Xe.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return OI(r)}catch{return null}return null}});var Ao=l(()=>{"use strict";rb();fI();tb();ob();AI();sb();Ym();bI();_I();RI();Js();WI();jI()});var Pb,DI=l(()=>{"use strict";Ao();He();Pb=e=>{let t=M(e.profileEmail);return bn({bundle:e.bundle,layout:t})}});var zI=l(()=>{"use strict";DI();Ao()});var H7,$I,U7,FI,_n,ng,HI=l(()=>{"use strict";H7=["agentwitch.com","www.agentwitch.com"],$I=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,U7=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},FI=e=>{let t=U7(e);return!!(H7.includes(t)||$I.test(e.trim().toLowerCase()))},_n=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return FI(r)?$I.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},ng=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:_n(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Wl=l(()=>{"use strict";HI()});var xr,Il=l(()=>{"use strict";xr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Ol,UI=l(()=>{"use strict";zI();Wl();Il();Ol=e=>{if(!xr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=sr(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!_n(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=Pb({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var Ab=l(()=>{"use strict";UI()});var B7,Xs,bb=l(()=>{"use strict";B7=e=>e==="hourly"||e==="daily"||e==="weekdays",Xs=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!B7(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Ml,sg,BI,GI,_b,Ot,ig,ag,lg,cg,dg=l(()=>{"use strict";Ml=g(require("node:fs")),sg=g(require("node:path"));bb();BI="automations.json",GI=e=>e.profileEmail!==null?sg.default.join(e.installDir,"profiles",e.profileEmail,BI):sg.default.join(e.installDir,BI),_b=()=>({version:1,automations:[]}),Ot=e=>{let t=GI(e);if(!Ml.default.existsSync(t))return _b();try{let r=JSON.parse(Ml.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?_b():{version:1,automations:r.automations.flatMap(n=>{let s=Xs(n);return s!==null?[s]:[]})}}catch{return _b()}},ig=(e,t)=>{let r=GI(e);Ml.default.mkdirSync(sg.default.dirname(r),{recursive:!0}),Ml.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},ag=(e,t)=>{ig(e,{version:1,automations:t})},lg=(e,t)=>{let o=Ot(e).automations.filter(n=>n.id!==t.id);ig(e,{version:1,automations:[...o,t]})},cg=(e,t)=>Ot(e).automations.find(r=>r.id===t)??null});var be,ar=l(()=>{"use strict";be="x-agent-witch-token"});var wb=l(()=>{"use strict";em();rm()});var X,wn,Tb,Nl,vb,G7,kb,jl,Tn,Cb,Ys=l(()=>{"use strict";ar();wb();X=e=>{let t=We(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},wn=e=>({[be]:e,"Content-Type":"application/json"}),Tb=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:wn(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Nl=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:wn(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},vb=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:wn(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},G7=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},kb=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:wn(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},jl=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:wn(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return G7(r)}catch{return null}},Tn=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:wn(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},Cb=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:wn(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var vn,VI,qI,V7,Eb,KI,Lb=l(()=>{"use strict";vn=g(require("node:fs")),VI=g(require("node:path")),qI=e=>VI.default.join(e.harnessRootDir,"projects-registry.json"),V7=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),Eb=e=>{let t=qI(e);if(!vn.default.existsSync(t))return[];try{let r=JSON.parse(vn.default.readFileSync(t,"utf8"));return V7(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},KI=e=>{let t=qI(e);if(!vn.default.existsSync(t))return;let r=`${t}.migrated`;if(vn.default.existsSync(r)){vn.default.unlinkSync(t);return}vn.default.renameSync(t,r)}});var JI,q7,K7,XI,YI=l(()=>{"use strict";So();JI=e=>Ge(e),q7=e=>new Set(e.map(t=>JI(t.folderPath))),K7=e=>new Set(e.map(t=>t.id)),XI=(e,t)=>{let r=q7(t),o=K7(t),n=[],s=new Set;for(let i of e){let a=JI(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var Rb,xb=l(()=>{"use strict";Ys();Lb();YI();Rb=async(e,t)=>{let r=Eb(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=X({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await jl(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=XI(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await kb(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&KI(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var Wb,lr,Dl=l(()=>{"use strict";Wb=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),lr=(e,t)=>e.find(r=>r.id===t)??null});var bo,zl=l(()=>{"use strict";Ys();xb();Dl();bo=async(e,t)=>{t!==void 0&&await Rb(t,e);let r=X({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await jl(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=Wb(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var ZI=l(()=>{"use strict"});var Ib,J7,ug,Ob=l(()=>{"use strict";Ib=g(require("node:fs"));An();J7=e=>{let t=At(e);if(!Ib.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(Ib.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},ug=J7});var Mb,Nb,QI=l(()=>{"use strict";Mb=g(require("node:path"));So();Ob();Nb=e=>{let t=Mb.default.resolve(Ge(e)),r=o=>{let{projectId:n}=ug(o);if(n!==null)return n;let s=Mb.default.dirname(o);return s===o?null:r(s)};return r(t)}});var X7,Y7,pg,jb=l(()=>{"use strict";X7="Default",Y7=e=>e.trim().toLowerCase()===X7.toLowerCase(),pg=Y7});var Db,zb,$b,Pe,Fb=l(()=>{"use strict";Db=["block","warn","info"],zb=["seed","project","retired"],$b="warn",Pe={symptom:120,cause:200,avoidance:280,checkValue:280,keyword:40,keywords:24,tag:32,tags:12,id:64}});var Hb,Wr,eO,tO,Ub,_o,rO=l(()=>{"use strict";Fb();Hb=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Wr=e=>typeof e=="string"?e:null,eO=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],tO=e=>{if(!Hb(e))return null;let t=Wr(e.id)?.trim()??"",r=Wr(e.symptom)?.trim()??"";if(t.length===0||r.length===0)return null;let o=zb.find(d=>d===e.source)??"project",n=Db.find(d=>d===e.severity)??$b,s=Hb(e.check)?e.check:null,i=s?.kind==="command"?"command":"id",a=Wr(s?.value)?.trim()??"",c=Wr(e.projectId)?.trim()??null;return{id:t,projectId:c!==null&&c.length>0?c:null,symptom:r,cause:Wr(e.cause)?.trim()??"",avoidance:Wr(e.avoidance)?.trim()??"",check:{kind:i,value:a.length>0?a:t},keywords:eO(e.keywords),tags:eO(e.tags),source:o,overridesSeed:e.overridesSeed===!0,hitCount:typeof e.hitCount=="number"&&Number.isFinite(e.hitCount)?Math.max(0,Math.floor(e.hitCount)):0,lastSeenAt:Wr(e.lastSeenAt),updatedAt:Wr(e.updatedAt),severity:n}},Ub=e=>!Hb(e)||!Array.isArray(e.pitfalls)?null:{items:e.pitfalls.map(t=>tO(t)).filter(t=>t!==null),syncedAt:Wr(e.syncedAt)},_o=e=>e.filter(t=>t.source!=="retired").length});var kn,Bb=l(()=>{"use strict";kn=e=>e.replace(/\s+/g," ").trim()});var wo,Gb=l(()=>{"use strict";wo=e=>Math.ceil(e.length/4)});var mg,oO=l(()=>{"use strict";Gb();mg=(e,t)=>{if(t<=0)return"";if(wo(e)<=t)return e;let r=t*4;return e.slice(0,r).trimEnd()}});var $l,nO=l(()=>{"use strict";Bb();$l=e=>`${kn(e.id)}|${kn(e.avoidance)}`});var sO=l(()=>{"use strict"});var Mt=l(()=>{"use strict";Fb();rO();Bb();Gb();oO();nO();sO()});var Vb,iO,Q7,eX,tX,rX,aO,lO=l(()=>{"use strict";Mt();Vb=e=>e.replace(/\s+/g," ").trim(),iO=(e,t,r)=>{let o=new Set,n=[];for(let s of e.split(/[,\n]/)){let i=Vb(s).slice(0,r).toLowerCase();i.length>0&&!o.has(i)&&(o.add(i),n.push(i))}return n.slice(0,t)},Q7=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40).replace(/-+$/g,""),eX=(e,t)=>{let r=Q7(e);return`project-${r.length>0?r:"pitfall"}-${t}`.slice(0,Pe.id).replace(/-+$/g,"")},tX=e=>e==="block"||e==="info"?e:"warn",rX=e=>{let{form:t}=e,r=Vb(t.get("symptom")??""),o=(t.get("avoidance")??"").trim(),n=(t.get("cause")??"").trim(),s=Vb(t.get("checkCommand")??"");if(r.length===0||o.length===0||n.length===0||r.length>Pe.symptom||o.length>Pe.avoidance||n.length>Pe.cause||s.length>Pe.checkValue)return{ok:!1};let i=(t.get("pitfallId")??"").trim(),a=i.length>0?i:eX(r,e.randomSuffix());return{ok:!0,pitfall:{id:a,symptom:r,cause:n,avoidance:o,check:s.length>0?{kind:"command",value:s}:{kind:"id",value:a},keywords:iO(t.get("keywords")??"",Pe.keywords,Pe.keyword),tags:iO(t.get("tags")??"",Pe.tags,Pe.tag),source:"project",severity:tX(t.get("severity"))}}},aO=rX});var dO,Fl,uO,oX,Ir,cO,nX,pO,qb=l(()=>{"use strict";dO=require("node:crypto");Mt();lO();Fl={save:"/project/pitfalls/save",retire:"/project/pitfalls/retire",restore:"/project/pitfalls/restore"},uO=e=>{let t=Object.entries(Fl).find(([,r])=>r===e);return t===void 0?null:t[0]},oX=()=>(0,dO.randomBytes)(3).toString("hex"),Ir=(e,t,r={})=>{let o=new URLSearchParams({tab:"pitfalls",...r,pitfall:t});return`/project?id=${encodeURIComponent(e)}&${o.toString()}`},cO=(e,t)=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:t}),nX=async e=>{let{projectId:t,store:r}=e,o=e.form.get("showRetired")==="1"?{retired:"1"}:{};if(r===null)return Ir(t,"unavailable",o);let n=await r.listPitfalls(t,{includeRetired:!0});if(!n.ok)return Ir(t,"unavailable",o);if(e.action==="save"){let c=aO({form:e.form,randomSuffix:e.randomSuffix??oX});if(!c.ok)return Ir(t,"invalid",o);let d=n.items.find(S=>S.id===c.pitfall.id);if((d===void 0||d.source==="retired")&&_o(n.items)>=64)return Ir(t,"limit",o);let m=await r.upsertPitfall(t,c.pitfall);return Ir(t,m.ok?"saved":m.reason==="active_limit"?"limit":m.reason,o)}let s=(e.form.get("pitfallId")??"").trim(),i=n.items.find(c=>c.id===s);if(i===void 0)return Ir(t,"missing",o);if(e.action==="restore"){if(i.source==="retired"&&_o(n.items)>=64)return Ir(t,"limit",o);let c=await r.upsertPitfall(t,cO(i,"project"));return Ir(t,c.ok?"restored":c.reason==="active_limit"?"limit":c.reason,o)}let a=await r.upsertPitfall(t,cO(i,"retired"));return Ir(t,a.ok?"retired":a.reason==="active_limit"?"limit":a.reason,o)},pO=nX});var mO,ce,fO,sX,Kb,Jb,gO,iX,aX,Hl,Xb,lX,cX,dX,hO,yO=l(()=>{"use strict";Mt();qb();mO="new",ce=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),fO={block:"Must fix",warn:"Warning",info:"Note"},sX={seed:"Built-in",project:"This project",retired:"Retired"},Kb=6e4,Jb=60*Kb,gO=24*Jb,iX=(e,t)=>{if(e===null)return"Never hit";let r=new Date(e).getTime();if(Number.isNaN(r))return"Never hit";let o=Math.max(0,t-r);if(o<Kb)return"Last hit just now";if(o<Jb)return`Last hit ${Math.floor(o/Kb)} min ago`;if(o<gO)return`Last hit ${Math.floor(o/Jb)}h ago`;let n=Math.floor(o/gO);return n<30?`Last hit ${n} ${n===1?"day":"days"} ago`:`Last hit ${new Date(r).toISOString().slice(0,10)}`},aX=e=>{if(e===null)return"Not updated yet";let t=new Date(e).getTime();return Number.isNaN(t)?"Not updated yet":`Updated ${new Date(t).toISOString().slice(0,10)}`},Hl=(e,t)=>`/project?${new URLSearchParams({id:e,tab:"pitfalls",...t}).toString()}`,Xb=e=>e?{retired:"1"}:{},lX=e=>{let{item:t}=e,r=t?.severity??"warn",o=t?.check.kind==="command"?t.check.value:"",n=t===null?"Add pitfall":"Edit pitfall",s=t?.source==="seed"?'<p class="muted">This is a built-in pitfall. Your changes apply to this project only.</p>':"",i=a=>`<option value="${a}"${r===a?" selected":""}>${fO[a]}</option>`;return`<form method="POST" action="${Fl.save}" class="stack pitfall-form" aria-label="${n}">
      <p class="field-label">${n}</p>
      ${s}
      <input type="hidden" name="projectId" value="${ce(e.projectId)}" />
      <input type="hidden" name="pitfallId" value="${ce(t?.id??"")}" />
      <input type="hidden" name="tags" value="${ce((t?.tags??[]).join(", "))}" />
      ${e.showRetired?'<input type="hidden" name="showRetired" value="1" />':""}
      <label class="stack">
        <span>Title</span>
        <input type="text" name="symptom" required maxlength="${Pe.symptom}" value="${ce(t?.symptom??"")}" placeholder="What goes wrong, in one line" />
      </label>
      <label class="stack">
        <span>Fix</span>
        <textarea name="avoidance" required maxlength="${Pe.avoidance}" rows="3" placeholder="What to do instead">${ce(t?.avoidance??"")}</textarea>
      </label>
      <label class="stack">
        <span>Why it happens</span>
        <textarea name="cause" required maxlength="${Pe.cause}" rows="2" placeholder="What leads to this trap">${ce(t?.cause??"")}</textarea>
      </label>
      <label class="stack">
        <span>Triggers</span>
        <input type="text" name="keywords" value="${ce((t?.keywords??[]).join(", "))}" placeholder="Words that point to this trap, separated by commas" />
      </label>
      <label class="stack">
        <span>How to check <span class="muted">(optional)</span></span>
        <input type="text" name="checkCommand" class="mono" maxlength="${Pe.checkValue}" value="${ce(o)}" placeholder="A command that shows the trap, like npm run lint" />
      </label>
      <label class="stack">
        <span>How serious</span>
        <select name="severity">${i("block")}${i("warn")}${i("info")}</select>
      </label>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Save pitfall</button>
        <a class="btn btn-secondary" href="${ce(Hl(e.projectId,Xb(e.showRetired)))}">Cancel</a>
      </div>
    </form>`},cX=e=>{let{item:t,projectId:r,showRetired:o}=e,n=t.source==="retired",s=`<input type="hidden" name="projectId" value="${ce(r)}" />
            <input type="hidden" name="pitfallId" value="${ce(t.id)}" />
            ${o?'<input type="hidden" name="showRetired" value="1" />':""}`,i=n?`<form method="POST" action="${Fl.restore}" class="inline-form">
            ${s}
            <button class="btn btn-secondary btn-compact" type="submit">Bring back</button>
          </form>`:`<a class="btn btn-secondary btn-compact" href="${ce(Hl(r,{...Xb(o),edit:t.id}))}">Edit</a>
          <form method="POST" action="${Fl.retire}" class="inline-form" onsubmit="return confirm('Retire this pitfall? You can bring it back later.');">
            ${s}
            <button class="btn btn-danger btn-compact" type="submit">Retire</button>
          </form>`,a=t.keywords.length>0?`<p class="muted">Triggers: ${t.keywords.map(c=>ce(c)).join(", ")}</p>`:"";return`<li class="harness-installed-set pitfall-row${n?" pitfall-row-retired":""}" data-pitfall-id="${ce(t.id)}">
        <p><strong>${ce(t.symptom)}</strong> <span class="muted">\xB7 ${fO[t.severity]} \xB7 ${sX[t.source]}</span></p>
        <p>Fix: ${ce(t.avoidance)}</p>
        ${a}
        <p class="muted">${ce(iX(t.lastSeenAt,e.nowMs))}</p>
        <p class="muted">${ce(aX(t.updatedAt))}</p>
        <div class="actions">${i}</div>
      </li>`},dX=e=>{if(e.list===null||!e.list.ok)return'<p class="empty">Could not load pitfalls. Check this Mac on Status, then reload.</p>';let t=e.nowMs??Date.now(),r=e.list.items,o=_o(r),n=o>=64,s=e.showRetired?r:r.filter(m=>m.source!=="retired"),i=e.editId===null?null:e.editId===mO?n?null:{item:null}:(()=>{let m=r.find(S=>S.id===e.editId&&S.source!=="retired");return m===void 0?null:{item:m}})(),a=i===null?"":lX({projectId:e.projectId,item:i.item,showRetired:e.showRetired}),c=n?`<p class="muted">${64} of ${64} active. Retire one to add another.</p>`:`<a class="btn btn-primary" href="${ce(Hl(e.projectId,{...Xb(e.showRetired),edit:mO}))}">Add pitfall</a>`,d=e.showRetired?`<a class="btn btn-secondary" href="${ce(Hl(e.projectId,{}))}">Hide retired</a>`:`<a class="btn btn-secondary" href="${ce(Hl(e.projectId,{retired:"1"}))}">Show retired</a>`,u=s.length===0?'<p class="empty">No pitfalls for this project. Add one when you spot a mistake that keeps coming back.</p>':`<ul class="harness-installed-set-list">${s.map(m=>cX({projectId:e.projectId,item:m,showRetired:e.showRetired,nowMs:t})).join("")}</ul>`;return`<section class="stack">
      <p class="lede">Pitfalls are known traps in this project. Each one says what goes wrong and how to avoid it.</p>
      <p class="muted">${o} of ${64} active</p>
      <div class="actions">${i===null?c:""}${d}</div>
      ${a}
      ${u}
    </section>`},hO=dX});var Q,SO,uX,pX,mX,gX,fX,To,gg=l(()=>{"use strict";jb();Mt();yO();Q=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SO=(e,t)=>e.length===0?`<p class="empty">${Q(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Q(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Q(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,uX=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,pX=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from Agent Witch Cloud.":"This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Q(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},mX=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
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
      </div>`},gX=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?mX({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?pX({project:e.project,alreadyInRepo:!1}):uX();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",a=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),u=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this Mac.');">
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
      </div>`},fX=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Q(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Q(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},To=e=>{let t=e.flashError?`<div class="alert-error">${Q(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Q(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(S,f)=>`<a class="project-tab${e.activeTab===S?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${S}">${Q(f)}</a>`,n=e.composition?.items.filter(S=>S.kind==="workflow")??[],s=e.composition?.items.filter(S=>S.kind==="agent")??[],i="";e.activeTab==="harness"?i=gX({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=SO(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=SO(s,"No agents installed for this project yet."):e.activeTab==="knowledge"?i=fX({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount}):i=hO({projectId:e.project.id,list:e.pitfalls??null,showRetired:e.pitfallsShowRetired??!1,editId:e.pitfallsEditId??null});let a=e.pitfalls!==void 0&&e.pitfalls!==null&&e.pitfalls.ok?`Pitfalls (${_o(e.pitfalls.items)})`:"Pitfalls",c=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,d=`${c}?rename=1`,u=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${Q(c)}" target="_blank" rel="noopener noreferrer">Open in Agent Witch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${Q(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,m=pg(e.project.name)?"":`<section class="danger-zone stack">
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
    </section>${m}`}});var hX,yX,PO,AO=l(()=>{"use strict";Ao();ar();hX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yX=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[be]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!hX(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=sr(n);return s===null?[]:[s]})}catch{return null}},PO=yX});var bO,Yb,_O=l(()=>{"use strict";le();Ao();gg();zl();AO();Dl();Tl();Ys();Pt();bO=e=>({kind:"page",title:e.project.name,body:To({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:ir(e.layout),linkedSetSlugs:nr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),Yb=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let o=await bo(r,e.layout),n=lr(o.projects,t);if(n===null)return{kind:"not_found"};let s=X({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??ct,a=s===null?null:await PO(s,n.id);if(a===null)return bO({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=nb({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return bO({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await Tn(s,n.id,c.appliedSetSlugs),u=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${u.toString()}`}}});var wO,Zb,TO=l(()=>{"use strict";le();Ao();Pt();Ys();gg();Mm();So();zl();Dl();Tl();Rm();MA();Im();zA();wO=e=>({kind:"page",title:e.project.name,body:To({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:ir(e.layout),linkedSetSlugs:nr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),Zb=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=$();if(n===null)return{kind:"not_found"};let s=await bo(n,e.layout),i=lr(s.projects,r);if(i===null)return{kind:"not_found"};let a=X({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=a?.appOrigin??ct;if(o.length===0)return wO({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=Ge(i.projectFolderPath),u=Je({projectFolderPath:d}),{ledgerFilePath:m}=qs(u.layout),S=Vs(m),f=ZA(S);if(!f.includes(o))return wO({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let y=f.filter(h=>h!==o),p=Wm({repoRoot:u.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:S});_l(m,p.ledger);let P=a===null?!1:await Tn(a,i.id,y),w=new URLSearchParams({linked:"1",removed:o,files:String(p.summary.removedPaths.length),bindingsSynced:P?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${w.toString()}`}}});var SX,Qb,vO=l(()=>{"use strict";SX=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,Qb=SX});var kO=l(()=>{"use strict"});var CO=l(()=>{"use strict"});var EO=l(()=>{"use strict";kO();CO()});var PX,vo,LO=l(()=>{"use strict";PX=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],vo=(e=process.env)=>{let t={...e};for(let r of PX)delete t[r];return t}});var RO=l(()=>{"use strict";LO()});var e_,xO=l(()=>{"use strict";e_={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var t_=l(()=>{"use strict";xO()});var fg,r_=l(()=>{"use strict";fg={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var hg=l(()=>{"use strict";EO();RO();Pt();t_();r_()});var WO,IO,AX,yg,Sg,OO=l(()=>{"use strict";WO=require("node:child_process"),IO=require("node:util");hg();AX=(0,IO.promisify)(WO.execFile),yg=async(e,t)=>{try{let{stdout:r}=await AX("git",t,{cwd:e,env:vo(),maxBuffer:1048576});return r.trim()}catch{return null}},Sg=async e=>{let t=await yg(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await yg(e,["rev-parse","--abbrev-ref","HEAD"]),o=await yg(e,["status","--porcelain"]),n=await yg(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var o_,MO=l(()=>{"use strict";o_=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var bX,n_,NO=l(()=>{"use strict";bX=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},n_=bX});var _X,s_,jO=l(()=>{"use strict";ar();_X=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[be]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},s_=_X});var DO,ko,zO=l(()=>{"use strict";DO=require("node:child_process"),ko=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,DO.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var $O=l(()=>{"use strict";zl()});var Ul,FO=l(()=>{"use strict";ar();Ul=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[be]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var i_,HO=l(()=>{"use strict";ar();i_=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[be]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var Nt=l(()=>{"use strict";zl();Dl();ZI();So();Mm();QI();_O();TO();Tl();vO();OO();MO();NO();jO();zO();$O();FO();HO();xb();Lb();Ys()});var Pg,Bl,UO,a_,Cn,l_=l(()=>{"use strict";Pg=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},Bl=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Pg(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},UO=e=>e>=1&&e<=5,a_=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Pg(t,"UTC")},Cn=e=>{let t=e.from??new Date,r=Pg(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Bl(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=Bl(r,e.timeZone,o,0),s=Pg(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?Bl(a_(r),e.timeZone,o,0):n;if(!i&&UO(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=a_(a),UO(a.weekday))return Bl(a,e.timeZone,o,0);return Bl(a_(r),e.timeZone,o,0)}});var BO,c_,Or,d_=l(()=>{"use strict";BO=require("node:crypto");le();Nt();l_();dg();c_=!1,Or=async e=>{if(c_)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=X({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=cg(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};c_=!0;let n=(0,BO.randomUUID)();try{let s=await Us(t,"claude-cli",o.prompt);await Cb(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=Cn({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return lg(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{c_=!1}}});var Ag,GO=l(()=>{"use strict";le();d_();dg();Ag=async()=>{let e=$();if(e===null)return;let t=Ot(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await Or(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var Gl=l(()=>{"use strict";dg();GO();d_();l_()});var VO=l(()=>{"use strict";Gl()});var qO=l(()=>{"use strict";bb()});var KO=l(()=>{"use strict";qO()});var u_=l(()=>{"use strict";Gl()});var wX,TX,Vl,p_=l(()=>{"use strict";VO();KO();u_();He();wX=e=>e!==void 0&&e.trim().length>0?M(e.trim()):M(),TX=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??Cn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??Cn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Vl=e=>{let t=wX(e.profileEmail),r=Ot(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Xs(s);return i!==null?[TX(i,o.get(i.id))]:[]});return ag(t,n),{ok:!0,writtenCount:n.length}}});var m_=l(()=>{"use strict";Gl()});var JO=l(()=>{"use strict";le()});var XO=l(()=>{"use strict";p_();m_();u_();JO()});var YO,ql,Kl,Jl,ZO=l(()=>{"use strict";YO=g(require("node:os"));XO();Wl();Il();ql=e=>{if(!xr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!_n(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=Vl({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Kl=async e=>{if(!xr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:_n(t)?Or(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Jl=()=>{let e=$(),t=e!==null?Ot(e.layout):{version:1,automations:[]};return{ok:!0,hostname:YO.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var g_=l(()=>{"use strict";ZO()});var bg=l(()=>{"use strict";re()});var _g=l(()=>{"use strict";re()});var wg,eM,tM,QO,vX,kX,Zs,f_=l(()=>{"use strict";wg=g(require("node:fs")),eM=g(require("node:os")),tM=g(require("node:path"));bg();_g();yl();He();QO=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},vX=e=>tM.default.join(eM.default.homedir(),"Library","LaunchAgents",`${e}.plist`),kX=async e=>wg.default.existsSync(vX(e))?(await Fe(e)).ok:!1,Zs=async(e=E())=>{let t=wg.default.existsSync(km(e)),r=!wg.default.existsSync(Zt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=hl(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await QO(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${he(e)}-wake`;await kX(i)&&s.push(i);for(let c of se(e))(await Fe(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await QO(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var rM=l(()=>{"use strict";re()});var h_=l(()=>{"use strict";gn();re()});var y_=l(()=>{"use strict";gn()});var S_=l(()=>{"use strict";re()});var nM,oM,Xl,P_=l(()=>{"use strict";nM=g(require("node:fs"));Pt();bg();_g();He();oM=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},Xl=async(e=E())=>{if(!nM.default.existsSync(Zt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await oM())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of se(e))(await Fe(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await oM();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var sM=l(()=>{"use strict";re()});var iM,En,A_,CX,EX,LX,aM,RX,lM,Qs,Tg=l(()=>{"use strict";iM=require("node:crypto"),En=g(require("node:fs")),A_=g(require("node:path"));He();CX="watchdog-log.ndjson",EX=200,LX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),aM=(e=E())=>{let t=M(),r=t.installDir===e?t.logsDir:Yo({installDir:e,profileEmail:t.profileEmail});return A_.default.join(r,CX)},RX=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!LX(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},lM=(e,t=E())=>{let r={id:(0,iM.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=aM(t);En.default.mkdirSync(A_.default.dirname(o),{recursive:!0});let n=En.default.existsSync(o)?En.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-EX+1)),JSON.stringify(r)];return En.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Qs=(e=20,t=E())=>{let r=aM(t);if(!En.default.existsSync(r))return[];let o=En.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=RX(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var b_,__,w_,T_=l(()=>{"use strict";we();b_=da.watchdogReinstallState,__=900*1e3,w_=3e3});var cM=l(()=>{"use strict";T_()});var dM={};St(dM,{verifyAgentWitchReviveAfterKickstart:()=>WX});var xX,WX,uM=l(()=>{"use strict";cM();y_();S_();He();xX=e=>new Promise(t=>{setTimeout(t,e)}),WX=async e=>{if(await xX(e.verifyDelayMs??w_),!await Qo(e.launchAgentLabel))return!1;let r=e.profileEmail===null?M():M(e.profileEmail),o=Ae(r);return!Ie(o,e.staleAfterMs)}});var Yl,v_,IX,pM,mM,k_,C_,E_=l(()=>{"use strict";Yl=g(require("node:fs")),v_=g(require("node:path"));V();T_();IX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pM=e=>v_.default.join(e,b_),mM=(e=E())=>{let t=pM(e);if(!Yl.default.existsSync(t))return null;try{let r=JSON.parse(Yl.default.readFileSync(t,"utf8"));return!IX(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},k_=(e=E(),t=Date.now())=>{let r=mM(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=__:!0},C_=(e=E(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=pM(e);return Yl.default.mkdirSync(v_.default.dirname(o),{recursive:!0}),Yl.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var L_,gM=l(()=>{"use strict";re();E_();L_=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!k_())return{attempted:!1,ok:!1,targets:e};C_();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Fe(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var fM=l(()=>{"use strict";E_();gM()});var R_=l(()=>{"use strict";tr()});var hM=l(()=>{"use strict";tr()});var yM,ei,SM,PM,AM,OX,MX,bM,NX,jX,_M,wM=l(()=>{"use strict";yM=require("node:child_process"),ei=g(require("node:fs")),SM=g(require("node:os")),PM=g(require("node:path")),AM=require("node:util");R_();hM();He();OX=(0,AM.promisify)(yM.execFile),MX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bM=e=>{let t=$e(e),r=t===null?M():M(t);if(!ei.default.existsSync(r.configPath))return null;try{let o=JSON.parse(ei.default.readFileSync(r.configPath,"utf8"));return!MX(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},NX=e=>bM(e)?.wsUrl??null,jX=e=>{let t=NX(e);return t!==null?We(t):Ue(e)?.appOrigin??null},_M=async e=>{let t=e?.installDir??E(),r=bM(t),o=r!==null?We(r.wsUrl):jX(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=PM.default.join(SM.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{ei.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??$e(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await OX("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{ei.default.existsSync(i)&&ei.default.unlinkSync(i)}}});var TM={};St(TM,{attemptAgentWitchWatchdogReinstall:()=>DX});var DX,vM=l(()=>{"use strict";fM();wM();DX=async e=>L_(e,()=>_M())});var kM,CM,EM,zX,$X,FX,Zl,x_=l(()=>{"use strict";rM();h_();y_();S_();P_();f_();bg();_g();He();xs();sM();Tg();kM=e=>e===null?M():M(e),CM=async(e,t,r)=>{if(!await Qo(e))return"not_running";let n=kM(t);if(xt(n))return"healthy";let s=Ae(n);return Ie(s,r)?"stale_connection":"healthy"},EM=async e=>{let t=e?.staleAfterMs??12e4,r=E(),o=se(r);return Promise.all(o.map(async n=>{let s=await CM(n.launchAgentLabel,n.profileEmail,t),i=kM(n.profileEmail),a=Ae(i),c=await Qo(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Ie(a,t),needsRevive:s!=="healthy",reason:s}}))},zX=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},$X=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",FX=async e=>{let t=await Fe(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(uM(),dM)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},Zl=async e=>{if(!Rt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=E();await Zs(r),await Xl(r);let o=se(r),n=[];for(let u of o){let m=await CM(u.launchAgentLabel,u.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:m});continue}n.push(await FX({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let u=Zo();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(vM(),TM)),m=await u(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(u){s=!0,i=!1,a=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&lM({event:$X(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:zX(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var LM,vg,RM=l(()=>{"use strict";LM=g(require("node:os"));h_();Tg();x_();vg=async()=>{let e=await EM(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:LM.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Qs(1)[0]??null}}});var W_=l(()=>{"use strict";f_();x_();RM();Tg()});var Ql,ec,tc,xM=l(()=>{"use strict";re();W_();Ql=async()=>{await Zs();let e=se(),t=[];for(let r of e){let o=await Fe(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Zo();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},ec=Zl,tc=Zl});var I_=l(()=>{"use strict";xM()});var Cg,kg,WM,O_,IM,HX,UX,BX,GX,VX,Eg,OM=l(()=>{"use strict";Cg=require("node:child_process"),kg=g(require("node:fs")),WM=g(require("node:os")),O_=g(require("node:path")),IM=require("node:util");re();V();HX=(0,IM.promisify)(Cg.execFile),UX=()=>O_.default.join(WM.default.homedir(),"Library","LaunchAgents"),BX=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await HX("launchctl",["bootout",r]).catch(()=>{})},GX=e=>{let t=O_.default.join(UX(),`${e}.plist`);kg.default.existsSync(t)&&kg.default.unlinkSync(t)},VX=e=>{(0,Cg.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Eg=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=E();if(!kg.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Tr(e);for(let r of t)await BX(r),GX(r);return VX(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var MM,Lg,NM,ti,jM,qX,KX,JX,M_,XX,N_,DM=l(()=>{"use strict";MM=require("node:child_process"),Lg=g(require("node:fs")),NM=g(require("node:os")),ti=g(require("node:path")),jM=require("node:util");re();qX=(0,jM.promisify)(MM.execFile),KX=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],JX=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],M_=e=>{Lg.default.existsSync(e)&&Lg.default.rmSync(e,{force:!0})},XX=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await qX("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},N_=async e=>{let r=(e.listLaunchAgentLabels??Tr)(e.layout.installDir),o=e.launchAgentsDir??ti.default.join(NM.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??XX;for(let i of r)await n(i),M_(ti.default.join(o,`${i}.plist`));let s=ti.default.dirname(e.layout.configPath);for(let i of KX)M_(ti.default.join(s,i));for(let i of JX)M_(ti.default.join(e.layout.installDir,i));return Lg.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var j_,zM=l(()=>{"use strict";j_="unknown_identity"});var D_=l(()=>{"use strict";r_();zM()});var YX,z_,$M=l(()=>{"use strict";D_();YX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),z_=e=>e.type!=="system.error"||!YX(e.payload)?!1:e.payload.errorCode===j_});var $_=l(()=>{"use strict";OM();DM();$M()});var Rg=l(()=>{"use strict";re();tr();$_();W_()});var ri,xg,Wg=l(()=>{"use strict";Rg();ri=(e=20)=>Qs(e),xg=vg});var Ig,oi,Og,Mg=l(()=>{"use strict";Rg();Ig=pn,oi=(e=20)=>cn(e),Og=e=>un(e)});var Ng,F_=l(()=>{"use strict";Rg();Ng=()=>Eg()});var FM=l(()=>{"use strict";WA();Ab();g_();I_();Wg();Mg();F_()});var HM={};St(HM,{buildAgentWitchAutomationStatusFromWakeServer:()=>Jl,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Ig,buildAgentWitchWakeHealthResponse:()=>Pl,buildAgentWitchWakeIdentityResponse:()=>Al,buildAgentWitchWatchdogStatus:()=>xg,installHarnessFromWakeServer:()=>Ol,readAgentWitchSelfUpdateLogEntries:()=>oi,readAgentWitchWatchdogLogEntries:()=>ri,restartAgentWitchFromWakeServer:()=>tc,reviveAgentWitchWebSocketFromWakeServer:()=>ec,runAgentWitchSelfUpdateFromWakeServer:()=>Og,runAgentWitchUninstallLocalFromWakeServer:()=>Ng,runAutomationFromWakeServer:()=>Kl,syncAutomationsFromWakeServer:()=>ql,wakeAgentWitchLaunchAgents:()=>Ql});var UM=l(()=>{"use strict";FM()});var BM,GM,H_,U_,VM=l(()=>{"use strict";BM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),GM=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?BM(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?BM(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},H_=e=>{let t=e.watchdogLogs.map(GM).join(""),r=e.updateLogs.map(GM).join("");return`<!doctype html>
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
</html>`},U_=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var qM,KM,JM=l(()=>{"use strict";qM=g(require("node:net")),KM=()=>new Promise((e,t)=>{let r=qM.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var XM,ZX,QX,B_,YM=l(()=>{"use strict";XM=g(require("node:net"));re();JM();Sl();yl();He();ZX=e=>new Promise(t=>{let r=XM.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),QX=e=>new Promise(t=>{setTimeout(t,e)}),B_=async(e={})=>{let t=E(),r=It(),o=Math.max(1,e.attempts??10),n=e.retryDelayMs??500;for(let i=1;i<=o;i+=1){if(await ZX(r))return w0(r),r;i<o&&await QX(n)}let s=await KM();Cm(t,s),process.env.AGENT_WITCH_WAKE_PORT=String(s);try{uP({launchAgentPrefix:he(t),wakePort:s})}catch(i){console.error(`[agent-witch] Could not update LaunchAgent wake port: ${i instanceof Error?i.message:String(i)}`)}return s}});var e9,G_,ZM=l(()=>{"use strict";e9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),G_=e=>({force:e9(e)&&e.force===!0})});var rc=l(()=>{"use strict";Wl();VM();YM();ZM();pP();Gp();nn()});var V_,z,q_,K_,oc,QM=l(()=>{"use strict";V_=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},z=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},q_=e=>{e.writeHead(403),e.end()},K_=e=>e.url?.split("?")[0]??"/",oc=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var jt=l(()=>{"use strict";QM()});var t9,eN,tN=l(()=>{"use strict";g_();jt();t9=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return z(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},eN=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return z(e.response,200,Jl(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await t9(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=ql(t);return z(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Kl(t);return z(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var r9,oN,rN,nN,J_,sN,X_=l(()=>{"use strict";r9=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],oN=e=>/embed|minilm|^bge-/i.test(e),rN=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),nN=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),J_=e=>e.filter(t=>t.trim().length>0&&!oN(t)),sN=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!oN(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>rN(s,o));if(n!==void 0)return n}for(let n of r9){let s=r.find(i=>rN(i,n));if(s!==void 0)return s}return r[0]??null}});var Y_,lN,cN,jg,dN,iN,aN,o9,n9,s9,i9,a9,l9,Dt,nc=l(()=>{"use strict";Y_=require("node:child_process"),lN=g(require("node:fs")),cN=g(require("node:os")),jg=g(require("node:path"));tr();Wt();X_();dN=3e3,iN=["claude-cli","codex","cursor","antigravity"],aN={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},o9=(e,t)=>new Promise(r=>{let o=(0,Y_.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},dN);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),n9=()=>{let e=cN.default.homedir();return["ollama",jg.default.join(e,".local","bin","ollama"),jg.default.join(e,".agent-witch","ollama","ollama"),jg.default.join(e,".local-agent-witch","ollama","ollama")]},s9=e=>new Promise(t=>{let r=(0,Y_.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},dN);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(nN(Buffer.concat(o).toString("utf8")))})}),i9=async()=>{for(let e of n9()){if(e!=="ollama"&&!lN.default.existsSync(e))continue;let t=await s9(e);if(t!==null)return t}return[]},a9=e=>{let t=e.installedWriterIds.map(s=>aN[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=ye(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${aN[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},l9=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:Ws},Dt=async e=>{let t=iN.map(i=>{let a=pm(i,e.commands);return o9(a.command,a.args)}),[r,...o]=await Promise.all([i9(),...t]),n=iN.flatMap((i,a)=>o[a]===!0?[i]:[]),s=sN(r,l9());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:a9({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var c9,d9,Z_,uN=l(()=>{"use strict";c9="http://127.0.0.1:11434",d9=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Z_=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||c9;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?d9(await o.json()):null}catch{return null}}});var Q_=l(()=>{"use strict";Wt();nc();uN();X_()});var u9,pN,mN=l(()=>{"use strict";Q_();u9={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},pN=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:u9[t]})),ollamaModels:J_(e.ollamaModels)})});var p9,gN,fN=l(()=>{"use strict";Q_();jt();mN();p9=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return z(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},gN=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Dt({commands:Se({})});return z(e.response,200,{ok:!0,...pN({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await p9(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await Z_({model:r,prompt:o});return n===null?(z(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(z(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var m9,hN,yN=l(()=>{"use strict";Ab();jt();m9=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return z(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},hN=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await m9(e);if(t===null)return!0;let r=Ol(t);return z(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var SN=l(()=>{"use strict";Nt()});var ew,PN=l(()=>{"use strict";SN();Il();ew=e=>{if(!xr(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Je({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var AN,tw,rw=l(()=>{"use strict";le();Nt();Il();AN=e=>{if(!xr(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},tw=async e=>{let t=AN(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=ko("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=$();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=X({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Je({projectFolderPath:r}),await Ul(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var bN=l(()=>{"use strict";PN();rw()});var _N,wN=l(()=>{"use strict";bN();rw();jt();_N=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=ew(t);return z(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await tw(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return z(e.response,o,r,e.cors.headers),!0}return!1}});var TN,vN=l(()=>{"use strict";rc();Mg();Wg();TN=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=ri(50),r=oi(50);return e.response.writeHead(200,U_()),e.response.end(H_({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var kN,CN=l(()=>{"use strict";WA();jt();kN=e=>e.request.method==="GET"&&e.pathname==="/health"?(z(e.response,200,Pl(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(z(e.response,200,Al(),e.cors.headers),!0):!1});var EN,LN=l(()=>{"use strict";F_();jt();EN=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Ng();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}});var RN,xN=l(()=>{"use strict";I_();jt();RN=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await ec();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await tc();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Ql();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var WN,IN=l(()=>{"use strict";rc();Mg();jt();WN=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Ig();return z(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=oc(e.request,"/update/logs",20,200);return z(e.response,200,{ok:!0,logs:oi(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=G_(t),o=await Og({force:r});return z(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var ON,MN=l(()=>{"use strict";Wg();jt();ON=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await xg();return z(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=oc(e.request,"/watchdog/logs",20,200);return z(e.response,200,{ok:!0,logs:ri(t)},e.cors.headers),!0}return!1}});var NN,jN=l(()=>{"use strict";tN();fN();yN();wN();vN();CN();LN();xN();IN();MN();NN=[kN,TN,ON,RN,WN,EN,hN,_N,eN,gN]});var DN,zN=l(()=>{"use strict";jN();DN=async e=>{for(let t of NN)if(await t(e))return!0;return!1}});var g9,$N,FN=l(()=>{"use strict";Wl();jt();zN();g9=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:K_(e),readJsonBody:()=>V_(e)}),$N=async(e,t,r)=>{let o=e.headers.origin,n=ng(o);try{if(o!==void 0&&o.length>0&&!n.allowed){q_(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=g9(e,t,r,n);if(await DN(s))return;z(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{z(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var HN,Ln,Dg,zg=l(()=>{"use strict";HN=g(require("node:http"));rc();FN();Ln=async()=>{let e=await B_(),t=HN.default.createServer((r,o)=>{$N(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Dg=Ln});var UN={};St(UN,{runAgentWitchBridgeCli:()=>f9});var f9,BN=l(()=>{"use strict";re();zg();f9=async()=>{at("agent-witch-bridge");let e=await Ln(),t=kr(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var GN=l(()=>{"use strict";Pt()});var ni,ow,VN=l(()=>{"use strict";ni=(e,t,r)=>e===1?t:r,ow=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${ni(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${ni(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${ni(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${ni(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${ni(d,"month","months")} ago`;let u=Math.floor(a/365);return`${u} ${ni(u,"year","years")} ago`}});var Rn,nw,h9,y9,sw,Co,sc,iw,qN=l(()=>{"use strict";Rn=g(require("node:fs")),nw=g(require("node:path")),h9="local-ws-traffic.ndjson",y9=500,sw=e=>nw.default.join(e.logsDir,h9),Co=(e,t)=>{let r=sw(e);Rn.default.mkdirSync(nw.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});Rn.default.appendFileSync(r,`${o}
`,"utf8")},sc=(e,t=y9)=>{let r=sw(e);if(!Rn.default.existsSync(r))return[];let n=Rn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},iw=e=>{let t=sw(e);Rn.default.existsSync(t)&&Rn.default.writeFileSync(t,"","utf8")}});var S9,KN,JN,XN=l(()=>{"use strict";D_();S9=new Set(Object.values(fg)),KN=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),JN=e=>{if(!KN(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!S9.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!KN(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var YN,ZN=l(()=>{"use strict";YN=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var P9,A9,b9,ic,QN=l(()=>{"use strict";ZN();P9=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,A9=e=>P9.test(e),b9=e=>YN(e),ic=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>ic(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&A9(o)){r[o]=b9(n);continue}r[o]=ic(n)}return r}});var dr,aw,_9,w9,T9,lw,ej,tj,rj,v9,$g,xn,Fg,cw,oj=l(()=>{"use strict";dr=g(require("node:fs")),aw=g(require("node:path"));XN();QN();_9="local-ws-trace.ndjson",w9=1e4,T9=1440*60*1e3,lw=e=>aw.default.join(e.logsDir,_9),ej=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},tj=e=>{if(!dr.default.existsSync(e))return;let t=dr.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-T9,n=t.filter(s=>{let i=ej(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-w9);dr.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},rj=(e,t)=>{let r=lw(e);dr.default.mkdirSync(aw.default.dirname(r),{recursive:!0}),dr.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),tj(r)},v9=e=>e.parsed===null?{_empty:!0}:ic(e.parsed),$g=(e,t,r)=>{let o=JN(r);rj(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:v9(o)})},xn=(e,t)=>{rj(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:ic({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Fg=(e,t=80)=>{let r=lw(e);if(tj(r),!dr.default.existsSync(r))return[];let o=dr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=ej(s);i!==null&&n.push(i)}return n.reverse()},cw=e=>{let t=lw(e);dr.default.existsSync(t)&&dr.default.writeFileSync(t,"","utf8")}});var Eo,nj,k9,dw,Hg,sj=l(()=>{"use strict";Eo=g(require("node:fs")),nj=g(require("node:path")),k9=256e3,dw=e=>{Eo.default.mkdirSync(nj.default.dirname(e),{recursive:!0}),Eo.default.writeFileSync(e,"","utf8")},Hg=(e,t=k9)=>{if(!Eo.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Eo.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=Eo.default.openSync(e,"r");try{Eo.default.readSync(a,i,0,s,n)}finally{Eo.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var ac=l(()=>{"use strict";qN();oj();sj()});var uw,pw,ij=l(()=>{"use strict";uw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pw=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${uw(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${uw(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${uw(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var aj=l(()=>{"use strict";ij()});var mw,gw=l(()=>{"use strict";mw=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var fw=l(()=>{"use strict";el()});var hw,yw,lj=l(()=>{"use strict";fw();hw=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},yw=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var cj=l(()=>{"use strict";gw();lj()});var dj,lc,Sw,cc=l(()=>{"use strict";gw();dj=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lc=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=dj(e),r=dj(mw(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},Sw=`(function () {
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
})();`});var Wn,C9,Pw,uj=l(()=>{"use strict";Wn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),C9=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},Pw=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Wn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Wn(r.direction):Wn(r.kind),i=`trace-body-${o}`,a=Wn(C9(r.body));return`<tr>
        <td title="${Wn(r.at)}">${Wn(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${Wn(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var mj,E9,pj,Aw,gj=l(()=>{"use strict";we();Pt();mj=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},E9=e=>mj(e)===wr?ys:hs,pj=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Aw=e=>{let t=E9(e.installDir),o=`AW_HOME="$HOME/${mj(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${pj(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${pj(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var fj=l(()=>{"use strict";cc();uj();gj();cc()});var L9,Mr,dc=l(()=>{"use strict";L9=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Mr=L9});var hj,yj,Sj,Pj,Aj,bj,_j,si=l(()=>{"use strict";hj="projects",yj="knowledge",Sj="chunks.ndjson",Pj="lessons.ndjson",Aj="error-chunks.ndjson",bj="usage-stats.json",_j="knowledge-location.json"});var Ug,R9,Bg,bw=l(()=>{"use strict";Ug=g(require("node:path"));si();R9=(e,t)=>{let r=t.trim(),o=Ug.default.join(e.installDir,hj,r,yj);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:Ug.default.join(o,Sj),memoryRunsFilePath:Ug.default.join(o,Pj)}},Bg=R9});var _w,x9,wj,Tj=l(()=>{"use strict";_w=g(require("node:fs"));si();An();x9=e=>{let t=At(e.projectFolderPath),r=`${t.metaDirPath}/${_j}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};_w.default.mkdirSync(t.metaDirPath,{recursive:!0}),_w.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},wj=x9});var ii,kj,vj,W9,Cj,Ej=l(()=>{"use strict";ii=g(require("node:fs")),kj=g(require("node:path"));rn();An();bw();Tj();vj=(e,t)=>{ii.default.existsSync(e)&&(ii.default.existsSync(t)&&ii.default.statSync(t).size>0||(ii.default.mkdirSync(kj.default.dirname(t),{recursive:!0}),ii.default.copyFileSync(e,t)))},W9=e=>{let t=At(e.projectFolderPath),r=Bg(e.layout,e.projectId),o=`${t.memoryDirPath}/${vs}`;vj(t.ragChunksFilePath,r.ragChunksFilePath),vj(o,r.memoryRunsFilePath),wj({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},Cj=W9});var Lj,I9,ai,Gg=l(()=>{"use strict";Lj=g(require("node:path"));rn();An();Ej();Ob();bw();I9=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=ug(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){Cj({layout:e.layout,projectFolderPath:t,projectId:o});let s=Bg(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=At(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:Lj.default.join(n.memoryDirPath,vs),projectId:null}},ai=I9});var Vg,M9,qg,ww=l(()=>{"use strict";Vg=g(require("node:fs"));si();M9=(e,t=500)=>{if(!Vg.default.existsSync(e))return;let r=Vg.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Vg.default.writeFileSync(e,`${o.join(`
`)}
`)},qg=M9});var Kg,N9,In,Tw=l(()=>{"use strict";Kg=g(require("node:path"));si();Gg();N9=e=>{let t=ai(e);if(t===null)return null;let r=Kg.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Kg.default.join(r,bj),errorChunksFilePath:Kg.default.join(r,Aj)}},In=N9});var xj,uc,Wj,Rj,vw,Ij,z9,kw,Oj,Cw,Ew,Lw,Rw=l(()=>{"use strict";xj=require("node:crypto"),uc=g(require("node:fs")),Wj=g(require("node:path"));dc();si();Tw();Rj=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),vw=e=>{if(!uc.default.existsSync(e))return Rj();try{let t=JSON.parse(uc.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return Rj()},Ij=(e,t)=>{uc.default.mkdirSync(Wj.default.dirname(e),{recursive:!0}),uc.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},z9=e=>{let t=Mr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,xj.createHash)("sha256").update(o).digest("hex").slice(0,16)},kw=e=>{let t=In(e);return t===null?null:vw(t.usageStatsFilePath)},Oj=e=>{if(e.chunkIds.length===0)return;let t=In(e);if(t===null)return;let r=vw(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;Ij(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},Cw=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=In(e);if(r===null)return null;let o=z9(t),n=vw(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return Ij(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},Ew=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,Lw=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var pc,Mj,$9,F9,Nj,H9,xw,mc,li,Ww,ci,Iw,Ow=l(()=>{"use strict";pc=g(require("node:fs")),Mj=g(require("node:path"));dc();Gg();ww();Rw();$9="http://127.0.0.1:11434",F9="nomic-embed-text",Nj=(e,t,r)=>ai({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,H9=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},xw=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},mc=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||$9,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||F9;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},li=(e,t,r)=>{let o=Nj(e,t,r);if(o===null||!pc.default.existsSync(o))return[];let n=pc.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},Ww=async e=>{let t=Mr(e.text),r=xw(t);if(r.length===0)return 0;let o=Nj(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;pc.default.mkdirSync(Mj.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await mc(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};pc.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return qg(o),n},ci=async e=>{let t=await mc(e.query);if(t===null)return[];let r=e.minScore??0,s=li(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:H9(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return Oj({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},Iw=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var gc,jj,U9,B9,Mw,Nw,jw,Dj=l(()=>{"use strict";gc=g(require("node:fs")),jj=g(require("node:path"));dc();Tw();ww();Ow();U9=e=>{if(!gc.default.existsSync(e))return[];let t=gc.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},B9=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},Mw=async e=>{let t=In(e);if(t===null)return 0;let r=Mr(e.text),o=xw(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;gc.default.mkdirSync(jj.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await mc(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};gc.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return qg(n,200),s},Nw=async e=>{let t=In(e);if(t===null)return[];let r=await mc(e.query);if(r===null)return[];let o=e.minScore??.3;return U9(t.errorChunksFilePath).map(s=>({chunk:s,score:B9(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},jw=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Dw=l(()=>{"use strict";Ow();Rw();Dj()});var ve,zw,$w=l(()=>{"use strict";t_();ve=e_,zw=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${ve.gray50};
  --aw-zinc-100: ${ve.gray100};
  --aw-zinc-200: ${ve.gray200};
  --aw-zinc-400: ${ve.gray400};
  --aw-zinc-500: ${ve.gray500};
  --aw-zinc-600: ${ve.gray600};
  --aw-zinc-700: ${ve.gray700};
  --aw-zinc-800: ${ve.gray900};
  --aw-zinc-900: ${ve.gray900};
  --aw-brand-600: ${ve.brand600};
  --aw-brand-700: ${ve.brand700};
  --aw-brand-50: ${ve.brand50};
  --aw-emerald-50: ${ve.success50};
  --aw-emerald-700: ${ve.success700};
  --aw-amber-50: ${ve.warning50};
  --aw-amber-900: ${ve.warning900};
  --aw-red-50: ${ve.error50};
  --aw-red-700: ${ve.error700};
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
`.trim()});var G9,V9,Fw,zj,Hw,$j=l(()=>{"use strict";$w();cc();G9=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,V9=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],Fw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zj=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${G9}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,Hw=e=>{let t=V9.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=Fw(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=Fw(e.installBundleVersionLabel?.trim()??"unknown"),s=zj("brand brand-in-sidebar",n),i=zj("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${Fw(e.title)} \xB7 Agent Witch Local</title>
  <style>${zw}</style>
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
  <script>${Sw}</script>
</body>
</html>`}});var Jg,fc,Xg=l(()=>{"use strict";Jg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fc=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Jg(e.syncMessage)}</p>`:"",o=Jg(e.manageHref),n=Jg(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Jg(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var Uw,Bw,Gw,Fj=l(()=>{"use strict";Uw=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,Bw=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,Gw=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var Hj=l(()=>{"use strict";$j();Xg();Fj()});var di,Vw,Uj=l(()=>{"use strict";cc();di=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Vw=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${di(e.wakeError)}</div>`:"",a=lc(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${di(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${di(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${di(o)}</p>
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
        <p class="home-card-meta">${di(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${di(n)}</p>
      </a>
    </div>`}});var Bj=l(()=>{"use strict";Uj()});var R,ui=l(()=>{"use strict";R=e=>e==="passed"||e==="stopped"||e==="failed"});var Gj,qw,On,Kw,Yg=l(()=>{"use strict";Gj="Stopped at the round limit. The best prompt is kept.",qw="Stopped because the score stopped rising. The best prompt is kept.",On="Finished. The best prompt is the result.",Kw="Wizard ended. Progress from finished steps is kept."});var Lo,Jw=l(()=>{"use strict";Lo=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var q9,K9,hc,Vj,Zg=l(()=>{"use strict";q9=/\n+|;\s+/,K9=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,hc=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(q9).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,K9(s)]},[]);return[...t,...o]},[]),Vj=e=>{let t=hc(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var de,pi=l(()=>{"use strict";de=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var yc,Xw=l(()=>{"use strict";Zg();pi();yc=e=>{let t=[...e.priorRounds,e.current],r=de(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:Vj(o)}}});var Yw,J9,X9,Qg,Zw=l(()=>{"use strict";Yw={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},J9=e=>{try{let t=JSON.parse(e.fragment);return{...Yw,objects:[...e.objects,t]}}catch{return{...Yw,objects:e.objects}}},X9=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:J9(r)},Qg=e=>[...e].reduce(X9,Yw).objects});var Y9,Qw,Z9,qj,eT=l(()=>{"use strict";Zw();Y9=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},Qw=e=>{let t=Qg(e).filter(Y9),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},Z9=(e,t)=>({...e,passed:e.score>=t}),qj=(e,t)=>{let r=Qw(e);return r===null?null:Z9(r,t)}});var tT,rT,ef=l(()=>{"use strict";tT="The judge reply needs a score and a reason.",rT="The improver reply was empty."});var Kj,Jj=l(()=>{"use strict";Kj=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var Xj,Yj=l(()=>{"use strict";Xj=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var eY,Zj,Qj=l(()=>{"use strict";Jj();Yj();Yg();Zg();eY=e=>{let t=hc(e);return t.length===0?qw:`${qw} Avoid: ${t.join("; ")}.`},Zj=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:Gj};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(Kj(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:eY(Xj(r))}}return null}});var Ro,tY,Mn,eD,tf=l(()=>{"use strict";Ro=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},tY=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,Mn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",tY(e.tokens),`Delay: ${Ro(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},eD=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var rY,tD,rD=l(()=>{"use strict";eT();rY=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,tD=e=>{let r=(rY.exec(e)?.[1]??e).trim();return r.length===0||Qw(r)!==null?null:r}});var oD,rf,nD=l(()=>{"use strict";tf();rD();ef();oD=e=>({type:"call",role:"judge",choice:e.choice,prompt:eD({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),rf=e=>{let t=tD(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:rT}}:{nextPrompt:t,continuation:oD({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var oT,sD=l(()=>{"use strict";Jw();Xw();eT();ef();Yg();Qj();ef();nD();oT=e=>{let t=qj(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:tT}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=Zj({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=yc({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:Lo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var Sc,nT=l(()=>{"use strict";Sc=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var iD=l(()=>{"use strict"});var aD=l(()=>{"use strict";iD()});var Nn,lD=l(()=>{"use strict";Nn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var oY,sT,cD=l(()=>{"use strict";tf();oY=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,sT=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",oY(e.tokens),`Delay: ${Ro(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var nY,sY,iY,iT,dD=l(()=>{"use strict";nY=/[A-Za-z0-9_./~-]{3,180}/g,sY=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,iY=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||sY.test(t)},iT=(e,t=12)=>{let r=[];for(let o of e.matchAll(nY)){let n=o[0].replace(/\.+$/,"");if(!(!iY(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var Pc,uD=l(()=>{"use strict";Pc=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var of,aT,pD,Ac,lT=l(()=>{"use strict";of=e=>Math.floor(e/2),aT=e=>Math.max(of(e)+1,e-20),pD=(e,t)=>e>=t?"passes":e>=aT(t)?"close":e>=of(t)?"weak":"bad",Ac=e=>[{band:"bad",label:`0\u2013${of(e)-1} bad`},{band:"weak",label:`${of(e)}\u2013${aT(e)-1} weak`},{band:"close",label:`${aT(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var nf,cT=l(()=>{"use strict";lT();nf=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${pD(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var zt,dT=l(()=>{"use strict";zt=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var mD,gD=l(()=>{"use strict";mD=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var aY,lY,fD,hD=l(()=>{"use strict";ui();cT();dT();gD();aY=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],lY=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",fD=e=>{let t=e.wizard;if(t===void 0)return[];let r=zt(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=aY.map((f,y)=>{let p=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:f,state:p,detail:null}}).filter((f,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=nf(e),d=c.filter(f=>f.id==="round-0"),u=mD(t)&&(!n||a)?c.filter(f=>f.id!=="round-0"):[],m=R(e.status)&&!s,S=m?[{id:"end",label:lY(e),state:"done",detail:e.errorMessage}]:[];if(m&&S.length>0){let f=Math.min(r,i.length),y=i.slice(0,f).map(p=>({...p,state:"done"}));return[...d,...y,...S,...u]}return[...d,...i,...u,...S]}});var cY,uT,yD=l(()=>{"use strict";ui();cT();hD();cY=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",uT=e=>{if(e.wizard!==void 0)return fD(e);let t=nf(e),r=R(e.status)?[{id:"end",label:cY(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var bc,SD=l(()=>{"use strict";bc=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var PD=l(()=>{"use strict";Pt()});var AD,_c,wc,gi,sf,pT,bD=l(()=>{"use strict";PD();AD="/prompt-optimizer/agent",_c=`${Cr}${AD}`,wc=`${Cr}/prompt-optimizer`,gi="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",sf=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${gi}`,pT="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var ur=l(()=>{"use strict"});var ie,Tc=l(()=>{"use strict";ur();ie=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var mT,_D=l(()=>{"use strict";mT="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var wD,TD=l(()=>{"use strict";wD=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var vc,kD=l(()=>{"use strict";TD();ur();vc=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:wD(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var gT,CD=l(()=>{"use strict";ur();gT=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var fT,ED=l(()=>{"use strict";ur();fT=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var LD,kc,RD=l(()=>{"use strict";LD=["generalize","evaluate","separate","optimize_modules"],kc=(e,t)=>{let r=LD.indexOf(t);if(r===-1)return e;let o=LD.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var af,hT=l(()=>{"use strict";Zg();af=e=>{let t=hc(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var Cc,xD=l(()=>{"use strict";hT();Cc=e=>{let t=af(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var uY,pY,mY,WD,ID=l(()=>{"use strict";uY=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),pY=/^\{\{[a-zA-Z0-9_-]+\}\}$/,mY=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(uY(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let u=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),u}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},WD=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>pY.test(n)?n:mY(n,r)).join("")}});var yT,OD=l(()=>{"use strict";ID();yT=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:WD(o.prompt,t)}))}))});var gY,Ec,MD=l(()=>{"use strict";ur();hT();gY=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Ec=e=>{let t=af(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=gY(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Lc,ND=l(()=>{"use strict";nT();Lc=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return Sc({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Rc,PT=l(()=>{"use strict";pi();Rc=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=de(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var AT,jD=l(()=>{"use strict";PT();AT=e=>{let t=Rc({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var jn,DD=l(()=>{"use strict";jn=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var fY,hY,oe,lf=l(()=>{"use strict";Tc();fY=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},hY=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,oe=e=>{let t=ie(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:fY(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>hY(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var zD,$D=l(()=>{"use strict";Tc();lf();zD=e=>{let t=oe(e.wizard),r=ie(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var bT,FD=l(()=>{"use strict";$D();bT=e=>{let t=zD({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var yY,HD,UD=l(()=>{"use strict";yY=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},HD=e=>[...e].reduce(yY,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var SY,BD,GD=l(()=>{"use strict";SY=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},BD=e=>[...e].reduce(SY,{out:"",inString:!1,escaped:!1}).out});var PY,AY,VD,qD=l(()=>{"use strict";UD();GD();PY=e=>e.charCodeAt(0)===65279?e.slice(1):e,AY=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},VD=e=>BD(HD(AY(PY(e))))});var bY,_Y,wY,KD,TY,fi,cf=l(()=>{"use strict";Zw();qD();bY=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},_Y=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},wY=e=>[...e].reduce(_Y,{out:"",inString:!1,escaped:!1}).out,KD=e=>{let t=Qg(e);return t.length===0?null:t[t.length-1]},TY=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},fi=e=>{let t=VD(bY(e)),r=KD(t);if(r!==null)return r;let o=wY(t),n=KD(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw TY(i)}}});var vY,kY,_T,JD,XD=l(()=>{"use strict";vY=/^[a-z0-9][a-z0-9-]{0,62}$/,kY=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return vY.test(t)?t:""},_T=e=>e.replace(/\s+/gu," ").trim(),JD=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=kY(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=_T(n.name),a=_T(n.description),c=_T(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var YD,ZD,QD=l(()=>{"use strict";YD=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},ZD=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var wT,ez=l(()=>{"use strict";cf();XD();QD();wT=(e,t)=>{let r=(()=>{try{return fi(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(YD(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(ZD).filter(a=>a!==null),i=JD({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var TT,tz=l(()=>{"use strict";TT=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var vT,rz=l(()=>{"use strict";vT=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var kT,oz=l(()=>{"use strict";Tc();lf();kT=e=>{let t=oe(e.wizard),r=ie(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var xc,nz=l(()=>{"use strict";xc=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var $t,CY,CT,sz=l(()=>{"use strict";$t=g(bs());cf();CY=(0,$t.isType)({name:$t.isNonEmptyString,description:$t.isString,sampleValue:$t.isString}),CT=e=>{let t=fi(e);if(!(0,$t.isType)({templatedPrompt:$t.isNonEmptyString,variables:(0,$t.isArrayWithEachItem)(CY)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var ue,EY,LY,ET,iz=l(()=>{"use strict";ue=g(bs());ur();cf();EY=(0,ue.isType)({id:ue.isNonEmptyString,title:ue.isNonEmptyString,prompt:ue.isNonEmptyString,order:ue.isNumber}),LY=(0,ue.isType)({id:ue.isNonEmptyString,title:ue.isNonEmptyString,summary:ue.isString,topology:(0,ue.isOneOf)("chain","parallel"),modules:(0,ue.isArrayWithEachItem)(EY),recommended:ue.isBoolean}),ET=e=>{let t=fi(e);if(!(0,ue.isType)({options:(0,ue.isArrayWithEachItem)(LY)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var hi,az=l(()=>{"use strict";hi=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var RY,LT,RT=l(()=>{"use strict";RY=/\{\{([a-zA-Z0-9_-]+)\}\}/g,LT=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(RY,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Ft,Ht,lz=l(()=>{"use strict";pi();RT();Ft=e=>LT(e.templatedPrompt,e.variables),Ht=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return de(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Ft(e.wizard)}});var xY,Dn,cz=l(()=>{"use strict";xY=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Dn=(e,t)=>e.replace(xY,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var WY,zn,df=l(()=>{"use strict";WY=/\{\{([a-zA-Z0-9_-]+)\}\}/g,zn=e=>{let t=new Set,r=[];for(let o of e.matchAll(WY)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Wc,dz=l(()=>{"use strict";df();Wc=e=>e.variables.length>0||zn(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var xT,WT=l(()=>{"use strict";ur();xT=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Ic,uz=l(()=>{"use strict";pi();WT();Ic=e=>{let t=e.wizard.evaluateSelectedRound??de(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:xT(r.judgement,e.passScore)}});var Oc,pz=l(()=>{"use strict";Oc=e=>e.length===1&&e[0].modules.length===1});var IT,mz=l(()=>{"use strict";IT=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var ke,uf,Mc=l(()=>{"use strict";ke=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),uf=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var gz,fz=l(()=>{"use strict";Mc();gz=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[ke("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),ke("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[ke("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var hz,yz=l(()=>{"use strict";ui();Mc();hz=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!R(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[ke("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),ke("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),ke("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",uf(e.writerLabel,e.folder)),ke("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[ke("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var Sz,Pz=l(()=>{"use strict";Mc();Sz=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[ke("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),ke("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[ke("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var Az,bz=l(()=>{"use strict";Mc();Az=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[ke("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),ke("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",uf(e.writerLabel,e.folder)),...r?[ke("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var pf,_z=l(()=>{"use strict";ui();fz();yz();Pz();bz();pf=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(R(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return hz(r);case"evaluate":return gz({...r,currentRound:e.currentRound});case"separate":return Az(r);case"optimize_modules":return Sz({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Nc,Nr,wz=l(()=>{"use strict";Nc=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),Nr=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var IY,mf,OT,Tz=l(()=>{"use strict";df();IY="wizardParam_",mf=e=>`${IY}${e}`,OT=e=>{let t=zn(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=mf(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var pt,vz=l(()=>{"use strict";pt=["generalize","evaluate","separate","optimize_modules"]});var jc,$n,yi,jr=l(()=>{"use strict";jc="Stopped because the confirmed token or spend budget was exceeded.",$n="Approaching the confirmed budget. Further trials may hard-stop.",yi="Confirm the Step 4 token and spend budget before optimizing modules."});var mt,Si=l(()=>{"use strict";mt=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var Bt,Dc=l(()=>{"use strict";jr();Bt=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var OY,Dr,zc=l(()=>{"use strict";jr();OY={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},Dr=e=>{let t=e?.trim()??"";return t.length===0?.01:OY[t]??.01}});var gf,MT=l(()=>{"use strict";jr();zc();gf=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=Dr(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var kz,hf,NT,jT=l(()=>{"use strict";jr();Si();Dc();MT();zc();kz=e=>{let t=gf({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??Dr(e.writerId)??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:mt({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},hf=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),NT=e=>{let t=e.existing??Bt(),r=kz({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return hf(t,r)}});var Pi,$c,Lz=l(()=>{"use strict";jr();ur();Si();Dc();jT();MT();zc();Pi=e=>{let t=gf({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??Dr(e.writerId),i=r*4e3,a=n*o*8e3,c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:mt({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},$c=e=>{let t=e.existing??Bt();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=Pi({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return hf(t,r)}});var zr,Rz=l(()=>{"use strict";Si();jr();Dc();zr=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??Bt(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=mt({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var zT,Ai,xz=l(()=>{"use strict";jr();Si();zT=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=mt({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:jc,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:jc,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,u=s!==null&&s>0&&o>=s*c;return(d||u)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:$n,costControls:{...t,softWarnFired:!0,softWarnMessage:$n}}:null},Ai=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var $T,Wz=l(()=>{"use strict";$T=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var x=l(()=>{"use strict";ui();Yg();sD();Jw();tf();nT();aD();lD();cD();dD();Xw();uD();pi();yD();dT();lT();SD();bD();ur();Tc();_D();kD();CD();ED();RD();xD();OD();MD();ND();PT();jD();DD();lf();FD();ez();tz();rz();oz();nz();sz();iz();az();lz();RT();cz();df();dz();uz();pz();WT();mz();_z();wz();Tz();vz();jr();Si();Dc();jT();Lz();zc();Rz();xz();Wz()});var FT=l(()=>{"use strict";sl()});var MY,Mz,Nz=l(()=>{"use strict";FT();MY=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,Mz=e=>{let t=fn(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(MY)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var Dz,NY,jY,pr,DY,zY,jz,Sf,zz,$Y,bt,$z,Fz,Hz,Gt=l(()=>{"use strict";FT();Nz();Dz=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),NY=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,jY=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,pr=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(NY.test(e.errorMessage))return"usage_limit";if(jY.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},DY="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",zY="The writer waited on terminal input and did not return a prompt.",jz=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Sf=e=>{let t=e.trim();if(t.length===0||t.length>=500||!jz.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>jz.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},zz=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},$Y=e=>Sf(e.stdout)??Sf(e.stderr)??(zz(e.replyFile)?Sf(e.replyFile):null),bt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return DY;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?zY:null},$z=e=>{let t=e.trim();return t.length===0?null:bt(t)!==null?t:Sf(t)??(zz(t)?t:null)},Fz=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],Hz=e=>{let t=e.replyFileText?.trim()??"",r=bt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=$Y({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=pr({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=Mz([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=fn(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var FY,Bz,Uz,Hn,Pf=l(()=>{"use strict";Gt();FY=400,Bz=(e,t=FY)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},Uz=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:$z(e.promptText)},Hn=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:Uz(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=Uz(e.revisions[n]);if(s!==null)return s.trim()}return null}});var O,HY,Af,ae,Un,Vz,Gz,qz,Kz,Ce=l(()=>{"use strict";O="manual",HY=["claude-cli","codex","cursor","antigravity"],Af={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ae=e=>e===O?"You":e in Af?Af[e]:e,Un=e=>HY.filter(t=>e.includes(t)),Vz=e=>{let t=Un(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},Gz=(e,t)=>t===O?O:e.find(r=>r===t)??null,qz=(e,t,r)=>{let o=Un(e),n=Gz(o,t),s=Gz(o,r);return n===null||s===null?null:{judge:n,improver:s}},Kz=(e,t,r)=>{let o=Un(e);return t===null||t.trim()===""?r!==O?r:o[0]??null:t===O?null:o.find(n=>n===t)??null}});var Jz,bf,HT,Bn,UT,gt,$r,pe,Ye=l(()=>{"use strict";Jz=g(require("node:fs")),bf=g(require("node:os")),HT=g(require("node:path"));So();Bn="~",UT=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,gt=e=>{let t=bf.default.homedir(),r=UT(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},$r=e=>{let t=e.trim().length===0?"~":e.trim(),r=Ge(t),o=HT.default.isAbsolute(r)?UT(r):UT(HT.default.resolve(bf.default.homedir(),r));try{if(!Jz.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:gt(o)}},pe=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:bf.default.homedir()});var Qe,xo=l(()=>{"use strict";Qe='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var BT,Xz,UY,Yz,Zz,GT=l(()=>{"use strict";x();Ce();Ye();xo();BT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Xz=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',UY=e=>{let t=Xz(e.state),r=`<h2>${BT(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${BT(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Qe}</button></div><template>${r}</template></li>`},Yz=e=>{let t=e.wizard;if(t===void 0)return"";let r=pf({status:e.status,wizard:t,writerLabel:ae(e.judgeModel),runnerLabel:ae(e.runnerModel??e.judgeModel),folderDisplay:gt(pe(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(UY).join("")}</ol>`},Zz=e=>{let t=e.wizard;if(t===void 0)return"";let r=pf({status:e.status,wizard:t,writerLabel:ae(e.judgeModel),runnerLabel:ae(e.runnerModel??e.judgeModel),folderDisplay:gt(pe(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${Xz(n.state)}<span class="sdlc-pipeline-label">${BT(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var Vt,Qz,e$,t$,VT=l(()=>{"use strict";x();Vt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Qz="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",e$=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Vt(Qz)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${Vt(i.name)}}}</strong> \u2014 ${Vt(i.description)} (sample: ${Vt(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${Vt(r)}</pre>`,n=Ft(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${Vt(n)}</pre>`;return`${t}${o}${s}`},t$=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Vt(Qz)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${Vt(n.name)}}}</strong> \u2014 ${Vt(n.description)} (sample: ${Vt(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${Vt(r)}</pre>`;return`${t}${o}`}});var Fc,qT=l(()=>{"use strict";Fc=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var r$,o$=l(()=>{"use strict";x();r$=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=Nn({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=Mn({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var KT,Hc,JT=l(()=>{"use strict";xo();o$();KT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hc=e=>{let t=r$(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${KT(r)}">${Qe}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${KT(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${KT(t)}</pre></template>`}});var XT,Uc,YT=l(()=>{"use strict";xo();XT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Uc=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${XT(r)}">${Qe}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${XT(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${XT(t)}</pre></template>`}});var _f,bi,ZT=l(()=>{"use strict";qT();JT();YT();_f=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bi=e=>{let t=Fc(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${_f(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,u=e.cycle.revisions.map(m=>{let S=m.judgement?.score,f=S==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${S}`,y=m.judgement?.reasons?.trim()??"",p=y.length===0?"":`<br><span class="muted">${_f(y)}</span>`,P=Uc({roundLabel:d(m.roundNumber),promptText:m.promptText}),w=Hc({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run}),h=`${P}${w}`;if(e.interactive){let A=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${A}> <span class="sdlc-wizard-revision-title">${_f(f)}</span></label>${h}${p}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${_f(f)}</span>${h}${p}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${u}</ul>`}});var QT,n$,s$,i$,ev=l(()=>{"use strict";QT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),n$=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${QT(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${QT(t.prompt)}</pre></li>`).join("")}</ol>`,s$=e=>n$([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),i$=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${QT(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${n$(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var Bc,BY,wf,tv=l(()=>{"use strict";x();ev();Bc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),BY=e=>{let t=e.wizard;return t===void 0?"":Ht({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},wf=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=BY(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Bc(n.orchestratorSkill.fileName)}</code> \u2014 ${Bc(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${Bc(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=s$(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${Bc(r)} <span class="muted">${Bc(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var je,GY,VY,qY,KY,Tf,JY,XY,YY,ZY,QY,eZ,_i,vf=l(()=>{"use strict";x();GT();VT();ZT();JT();YT();tv();je=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GY={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},VY=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${je(o)}</pre>`:`<p class="sdlc-pre-preview mono">${je(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${je(o)}</pre></details>`;return`<h2>${je(e)}</h2>${n}`},qY=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=Ft(t).trim(),n=Ht({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!R(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${VY("What is being evaluated",i)}`},KY=(e,t)=>{let r=e.wizard;if(r===void 0||R(e.status))return"";let o=GY[t];return o===void 0||r.phase!==o?"":Zz(e)},Tf=(e,t,r)=>{let o=KY(e,t),n=t==="wizard-2"?qY(e):"";return`${o}${n}${r}`},JY=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},XY=e=>{let t=e.wizard;return t===void 0?"":e$(t)},YY=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${je(a)}</span>`,d=`Round ${n.roundNumber}`,u=Uc({roundLabel:d,promptText:n.promptText}),m=Hc({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${je(s)}${i}</span>${u}${m}${c}</li>`}).join("")}</ul>`,ZY=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return bi({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=JY(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${YY(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=Ht({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${je(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",u=`Round ${c.roundNumber} \u2014 score ${d}`,m=Uc({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),S=Hc({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${je(u)}</span>${m}${S}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${je(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},QY=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${je(n.title)}</strong> <span class="muted">(${je(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${je(o.title)}</strong>${n}${je(s)}${wf(e,o)}</li>`}).join("")}</ul>`},eZ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${je(i)}</span> <strong>${je(n.title)}</strong>${je(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${je(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?bi({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},_i=(e,t)=>{switch(t){case"wizard-1":return Tf(e,t,XY(e));case"wizard-2":return Tf(e,t,ZY(e));case"wizard-3":return Tf(e,t,QY(e));case"wizard-4":return Tf(e,t,eZ(e));default:return""}}});var tZ,rZ,a$,l$,c$=l(()=>{"use strict";x();Pf();Gt();vf();tZ=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},rZ=e=>{let t=e.goal.trim();return t.length===0?null:t},a$=(e,t,r,o,n)=>{let s=bt(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},l$=(e,t)=>{let r=rZ(e);if(t.id.startsWith("wizard-")){let s=_i(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=bc(e,t);if(s!==null){let a=Hn(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=de(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:a$(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:tZ(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:a$(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var Gn,d$,u$=l(()=>{"use strict";Gn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),d$=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${Gn(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Gn(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${Gn(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${Gn(n)}</h2><pre class="mono">${Gn(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${Gn(e.goal)}</dd></div></dl>`;return`<h2>${Gn(e.title)}</h2>${i}${t}${r}${o}${s}`}});var oZ,p$,Gc,rv,kf=l(()=>{"use strict";x();oZ=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),p$=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||R(e.status))return null;let r=zt(t);return r<0||r>3?null:`wizard-${r+1}`},Gc=(e,t)=>oZ.has(t)?p$(e)===t:!1,rv="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var nZ,Cf,ov=l(()=>{"use strict";nZ='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Cf=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${nZ}</button>`});var Vn,Ef=l(()=>{"use strict";x();Vn=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:yc({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:Pc(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var sZ,m$,iZ,nv,g$,aZ,lZ,cZ,dZ,f$,h$=l(()=>{"use strict";x();Ef();sZ={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},m$=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},iZ=e=>sZ[e]??null,nv=(e,t)=>{let r=e.wizard,o=iZ(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=zt(r);return o<n||o===n},g$=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},aZ=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:Ft(t).trim();return o.length===0?null:Cc({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:m$(e,"generalize")})},lZ=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=Vn(e);return n===null?null:Lo({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=g$(e)?.promptText.trim()??Ht({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:Nn({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},cZ=e=>{let t=e.wizard;if(t===void 0)return null;let r=Ht({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:Ec({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:m$(e,"separate")})},dZ=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=Nr(t),s=Dn(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=Vn(e);return c===null?null:Lo({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=g$(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||R(e.status)&&i?.judgement!==null)?Mn({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):Lc({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:jn(t,r).output,moduleTitle:o.title})},f$=(e,t)=>{if(!nv(e,t))return null;switch(t){case"wizard-1":return aZ(e);case"wizard-2":return lZ(e);case"wizard-3":return cZ(e);case"wizard-4":return dZ(e);default:return null}}});var uZ,Lf,sv=l(()=>{"use strict";x();uZ=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},Lf=(e,t)=>{let r=e.wizard,o=uZ(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=zt(r);return o<n?"done":o===n&&R(e.status)&&e.status==="failed"?"failed":o<=n&&R(e.status)?"done":"pending"}});var pZ,wi,Rf=l(()=>{"use strict";xo();h$();sv();pZ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wi=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(Lf(e,t)==="pending")return""}else if(!nv(e,t))return"";let o=f$(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Qe}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${pZ(o)}</pre></template>`}});var qn,Fr,Ti=l(()=>{"use strict";qn=e=>e.toLocaleString("en-US"),Fr=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var mr,mZ,y$,xf,S$,P$,Wf=l(()=>{"use strict";x();c$();u$();kf();ov();xo();Pf();GT();Rf();Ti();mr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mZ=(e,t)=>{let r=bc(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?Fr(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${qn(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${mr(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${mr(r)}</span>`:"",d=d$(l$(t,e)),u=t.wizard!==void 0&&t.wizard.phase==="complete"&&R(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${mr(e.id)}"`:"",m=Gc(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${mr(rv)}"><input type="hidden" name="cycleId" value="${mr(t.id)}"><input type="hidden" name="wizardStepId" value="${mr(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",S=e.state==="active"&&e.id.startsWith("wizard-")?Yz(t):"",f=o?"failed":e.state,y=o?Hn(t):null,p=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Qe}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${mr(y)}</pre></template>`:"",P=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?wi(t,e.id):"";return`<li class="sdlc-node sdlc-node-${f}" data-sdlc-step-id="${mr(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${u} data-sdlc-node>${n}<span class="sdlc-node-label">${mr(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${P}${p}</div></div>${S}<template>${d}</template></li>`},y$=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>mZ(r,t)).join("")}</ol>`,xf=e=>`<div class="sdlc-score" aria-label="What the score means">${Ac(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${mr(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,S$=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${Cf({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,P$=`<script>
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
</script>`});var If,Of,Mf,A$,iv=l(()=>{"use strict";If="support-reply",Of="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",Mf=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),A$=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Nf,b$,_$=l(()=>{"use strict";x();Wf();iv();Nf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),b$=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${xf(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${Nf(Of)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Nf(Mf)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Nf(A$)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Nf(If)}">Run this sample</a>
      </div>
    </section>`});var av,jf,gZ,w$,T$=l(()=>{"use strict";av=g(require("node:fs")),jf=g(require("node:path")),gZ=e=>jf.default.join(jf.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),w$=(e,t)=>{let r=gZ(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;av.default.mkdirSync(jf.default.dirname(r),{recursive:!0}),av.default.appendFileSync(r,o,"utf8")}});var vi,v$,fZ,k$,hZ,C$,gr,Z,E$,D,ft=l(()=>{"use strict";vi=g(require("node:fs")),v$=g(require("node:path"));x();T$();fZ=e=>e.wizard===void 0?e:{...e,wizard:gT(e.wizard)},k$=new Set,hZ=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),C$=(e,t)=>{vi.default.mkdirSync(v$.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;vi.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),vi.default.renameSync(r,e)},gr=e=>{if(!vi.default.existsSync(e))return[];try{let t=JSON.parse(vi.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(hZ).map(fZ):[]}catch{return[]}},Z=(e,t)=>gr(e).find(r=>r.id===t)??null,E$=(e,t)=>{k$.add(t);let r=gr(e).filter(o=>o.id!==t);C$(e,r)},D=(e,t)=>{if(k$.has(t.id))return;let r=gr(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];C$(e,o),w$(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var ki,fr,Vc,L$,Df,yZ,R$,x$,W$,lv=l(()=>{"use strict";ki=g(require("node:fs")),fr=g(require("node:path")),Vc=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},L$=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Df=(e,t)=>{let r=Vc(e);return r.length>0?r:Vc(t)},yZ=e=>{let t=Df(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${L$(o)}`,...n.length>0?[`description: ${L$(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},R$=e=>`.cursor/skills/${e}/SKILL.md`,x$=(e,t)=>{let r=Vc(t);if(r.length===0)return!1;let o=fr.default.resolve(e),n=fr.default.resolve(o,".cursor","skills"),s=fr.default.resolve(o,R$(r));return s.startsWith(`${n}${fr.default.sep}`)?ki.default.existsSync(s):!1},W$=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Df(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=fr.default.resolve(e.workingDirectory);try{if(!ki.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=yZ({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=R$(r.slug),n=fr.default.resolve(t,".cursor","skills"),s=fr.default.resolve(t,o);if(!s.startsWith(`${n}${fr.default.sep}`))return{ok:!1,errorCode:"path"};if(ki.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{ki.default.mkdirSync(fr.default.dirname(s),{recursive:!0}),ki.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var SZ,I$,O$,M$=l(()=>{"use strict";x();ft();Ye();Gt();lv();SZ=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,I$=e=>{let t=e.get("savedSkill");return t!==null&&SZ.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},O$=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=Z(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!R(r.status))return{kind:"redirect",location:o("skillError=working")};let n=de(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||bt(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=W$({workingDirectory:pe(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var zf,$f,qc=l(()=>{"use strict";x();zf=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=zr({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},$f=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var Wo,Kc=l(()=>{"use strict";x();qc();Wo=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=IT(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=NT({moduleCount:o.length,existing:e.costControls,writerId:n}),i=zf(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Nc(r.variables)},updatedAt:new Date().toISOString()}}});var Io,Jc=l(()=>{"use strict";Io=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var cv=l(()=>{"use strict";Wt();nc();sl()});var dv,N$,uv,j$,D$=l(()=>{"use strict";dv={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},N$=e=>e.exitCode===null&&e.signalCode===null,uv=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!N$(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!N$(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),j$=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),uv(e).then(s=>{r({...dv,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var z$,Xc,$$,pv,PZ,gv,fv,AZ,bZ,_Z,F$,wZ,mv,H$,Yc,U$,TZ,vZ,et,Kn=l(()=>{"use strict";z$=require("node:child_process"),Xc=g(require("node:fs")),$$=g(require("node:os")),pv=g(require("node:path"));cv();D$();Gt();PZ=["claude-cli","codex","cursor","antigravity"],gv=18e4,fv=6e5,AZ=12e4,bZ=9e5,_Z="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",F$="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",wZ="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",mv=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},H$=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=mv(process.env[F$])??Math.max(r,fv));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:mv(process.env[wZ])??bZ;return Math.min(o,Math.max(AZ,r))},Yc=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?mv(process.env[F$])??fv:gv,U$=e=>`The writer timed out after ${e}ms.`,TZ=e=>PZ.includes(e),vZ=e=>e===!0||process.env[_Z]==="1",et=e=>new Promise(t=>{if(e.signal?.aborted){t(dv);return}if(vZ(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!TZ(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=rr(r,e.prompt,Se({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!Xc.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:gv,s=pv.default.join(Xc.default.mkdtempSync(pv.default.join($$.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=Fz({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},u=(0,z$.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),m=S=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(S))};j$(u,e.signal,m,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",uv(u).then(S=>{m({ok:!1,errorMessage:U$(n),errorKind:"writer_timeout",killSignal:S})})},n),u.stdout.on("data",S=>{a.push(Buffer.from(S))}),u.stderr.on("data",S=>{c.push(Buffer.from(S))}),u.on("error",()=>m({ok:!1,errorMessage:"The writer failed to start."})),u.on("close",()=>{if(d.settled)return;let S=Xc.default.existsSync(s)?Xc.default.readFileSync(s,"utf8"):null,f=Hz({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:S});if(f.ok&&d.stopReason!=="abort"){m(f);return}d.stopReason===null&&m(f)})})});var kZ,Zc,hv=l(()=>{"use strict";x();Ti();kZ=e=>{if(e.wizard!==void 0){let t=xc(e.wizard),r=Fr(e);return(t??0)+r}return Fr(e)},Zc=e=>{let t=zT({costControls:e.costControls,spentTokens:kZ(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var B$,CZ,Qc,Ff,Hf=l(()=>{"use strict";x();Ce();hv();B$=e=>e===O?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},CZ=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Qc=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=oT({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:B$(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?$T({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:Pc(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=CZ(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?Zc({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):Zc({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},Ff=(e,t,r=null)=>{let o=rf({raw:t,judge:B$(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Uf,yv=l(()=>{"use strict";Uf=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var q$,Bf,Gf,G$,V$,Sv,EZ,K$,Pv,LZ,J$,RZ,xZ,X$,Y$=l(()=>{"use strict";q$=require("node:child_process"),Bf=g(require("node:fs")),Gf=g(require("node:path"));hg();x();G$=4e3,V$=12e3,Sv=(e,t)=>{let r=(0,q$.spawnSync)("git",[...t],{cwd:e,env:vo(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},EZ=e=>Sv(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",K$=e=>{let t=Sv(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},Pv=(e,t)=>{let r=Gf.default.resolve(e,t),o=Gf.default.relative(e,r);if(o.startsWith("..")||Gf.default.isAbsolute(o)||!Bf.default.existsSync(r)||!Bf.default.statSync(r).isFile())return null;let n=Bf.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>G$?`${n.slice(0,G$)}
\u2026truncated`:n},LZ=e=>e.length>V$?`${e.slice(0,V$)}
\u2026truncated`:e,J$=e=>{let t=iT(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,Pv(e.workingDirectory,n)])),o=EZ(e.workingDirectory);return{git:o,status:o?K$(e.workingDirectory):{},files:r,paths:t}},RZ=(e,t)=>{let r=Sv(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=Pv(e,t);return o===null?`${t} is missing.`:o},xZ=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",X$=e=>{let t=e.before.git?K$(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=Pv(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>RZ(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:xZ(e.before.git,e.before.paths.length>0),evidence:LZ(i.join(`

`))}}});var _v,q,wv,De,Z$,WZ,IZ,Q$,Ci,eF,Ei,OZ,MZ,ed,Av,bv,NZ,tF,jZ,DZ,zZ,rF,$Z,oF,nF,FZ,HZ,sF,iF=l(()=>{"use strict";_v=require("node:child_process"),q=g(require("node:fs")),wv=g(require("node:os")),De=g(require("node:path"));hg();Z$=8e6,WZ=16e6,IZ=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],Q$=(e,t)=>{let r=(0,_v.spawnSync)("git",[...t],{cwd:e,env:vo(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Ci=(e,t)=>(0,_v.spawnSync)("git",[...t],{cwd:e,env:vo(),timeout:8e3}).status===0,eF=e=>{let t=Q$(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},Ei=(e,t)=>{let r=De.default.resolve(e,t),o=De.default.relative(e,r);return o.startsWith("..")||De.default.isAbsolute(o)?null:r},OZ=(e,t)=>{let r=Ei(e,t);if(r===null||!q.default.existsSync(r))return null;let o=q.default.statSync(r);return!o.isFile()||o.size>Z$?null:q.default.readFileSync(r)},MZ=(e,t,r)=>{let o=Ei(e,t);o!==null&&(q.default.mkdirSync(De.default.dirname(o),{recursive:!0}),q.default.writeFileSync(o,r))},ed=(e,t)=>{let r=Ei(e,t);r===null||!q.default.existsSync(r)||q.default.rmSync(r,{recursive:!0,force:!0})},Av=(e,t)=>Ci(e,["cat-file","-e",`HEAD:${t}`]),bv=e=>{let t=Q$(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},NZ=e=>De.default.resolve(e)!==De.default.resolve(wv.default.homedir()),tF=e=>{if(!q.default.existsSync(e))return 0;let t=q.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?q.default.readdirSync(e).reduce((r,o)=>r+tF(De.default.join(e,o)),0):0},jZ=(e,t,r)=>{let o=Ei(e,r);if(o===null||!q.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(tF(o)>WZ)return{relativePath:r,existed:!0,copyDir:null};let n=De.default.join(t,"cache",r);return q.default.mkdirSync(De.default.dirname(n),{recursive:!0}),q.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},DZ=400,zZ=32e6,rF=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!q.default.existsSync(s)))for(let i of q.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=De.default.join(s,i),c=q.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>Z$)){if(t.length>=DZ||r+c.size>zZ){o=!1;return}r+=c.size,t.push(De.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},$Z=(e,t,r)=>{let o=Ei(e,r);if(o===null||!q.default.existsSync(o))return null;let n=OZ(e,r);if(n===null)return"skip";let s=De.default.join(t,"files",r);return q.default.mkdirSync(De.default.dirname(s),{recursive:!0}),q.default.writeFileSync(s,n),s},oF=e=>{let t=q.default.mkdtempSync(De.default.join(wv.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?eF(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:rF(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,$Z(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?bv(e.workingDirectory):null,isolateCaches:NZ(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:IZ.map(i=>jZ(e.workingDirectory,t,i))}},nF=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){ed(e.workingDirectory,t);return}MZ(e.workingDirectory,t,q.default.readFileSync(r))}},FZ=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?nF(e,t):Av(e.workingDirectory,t)?Ci(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):ed(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&Av(e.workingDirectory,t)&&Ci(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!Av(e.workingDirectory,t)&&Ci(e.workingDirectory,["reset","-q","HEAD","--",t])},HZ=(e,t)=>{let r=Ei(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){ed(e.workingDirectory,t.relativePath),q.default.mkdirSync(De.default.dirname(r),{recursive:!0}),q.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){ed(e.workingDirectory,t.relativePath);return}if(q.default.existsSync(r))for(let o of q.default.readdirSync(r)){let n=De.default.join(r,o);q.default.statSync(n).mtimeMs>=e.startedMs-1e3&&q.default.rmSync(n,{recursive:!0,force:!0})}}}},sF=e=>{try{if(e.git){if(bv(e.workingDirectory)!==e.head&&(!(e.head===null?Ci(e.workingDirectory,["update-ref","-d","HEAD"]):Ci(e.workingDirectory,["reset","--hard",e.head]))||bv(e.workingDirectory)!==e.head))throw new Error("head");let r=eF(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))FZ(e,o)}else{if(e.complete)for(let t of rF(e.workingDirectory).paths)e.files[t]===void 0&&ed(e.workingDirectory,t);for(let t of Object.keys(e.files))nF(e,t)}for(let t of e.caches)HZ(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{q.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Vf,qf,UZ,BZ,GZ,VZ,qZ,aF,KZ,lF,cF=l(()=>{"use strict";x();Hf();yv();Y$();iF();Ce();Ye();Gt();Kn();Vf=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),qf=e=>({...e,status:"stopped",errorMessage:On,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),UZ=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),BZ=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==O?t:e.improverModel!==O?e.improverModel:null}return e.judgeModel!==O?e.judgeModel:e.improverModel!==O?e.improverModel:null},GZ=async e=>{let t=pe(e.cycle),r=J$({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=oF({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Lc({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:jn(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):Sc({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=H$({promptText:e.revision.promptText,isModuleRun:i}),c=Yc({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},u=await et({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),m=u.ok?X$({workingDirectory:t,before:r,writerReply:u.text}):null,S=sF(o),f={...e.cycle,revisions:e.cycle.revisions.map(y=>y.roundNumber===e.cycle.currentRound?d:y)};return u.ok?!S.ok||m===null?{ok:!1,cycle:Vf(f,S.ok?"Could not put the folder back after the run.":S.errorMessage)}:{ok:!0,cycle:f,run:{output:u.text.trim(),tokens:u.tokens,delayMs:Date.now()-n,lookedAt:m.lookedAt,evidence:m.evidence}}:u.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:qf(f)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Vf(f,u.errorMessage,pr(u))})},VZ=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:GZ({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),qZ=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),aF=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await et({writerAgent:e.reviewer,workingDirectory:pe(e.cycle),prompt:sT({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:qf(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},KZ=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===O)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await et({writerAgent:t.judgeModel,workingDirectory:pe(t),prompt:Nn({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Qc(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?qf(o):(e.onWriterFailure?.(t.judgeModel),Vf(o,n.errorMessage,pr(n)))},lF=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return KZ(e);let o=BZ(t),n=await VZ({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?UZ(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===O){let u=await aF({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return u.kind==="stopped"?u.cycle:{...qZ(s,u.text),judgePhase:void 0}}let i=await et({writerAgent:t.judgeModel,workingDirectory:pe(t),prompt:Mn({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?qf(s):(e.onWriterFailure?.(t.judgeModel),Vf(s,i.errorMessage,pr(i)));let a=await aF({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Qc(s,i.text,c);return Uf(d,a.text)}});var Kf,JZ,XZ,Tv,dF=l(()=>{"use strict";x();Hf();cF();Ef();Gt();Ce();hv();Ye();Kn();Kf=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),JZ=e=>({...e,status:"stopped",errorMessage:On,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),XZ=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?JZ(e):(n?.(r),Kf(e,t.errorMessage,pr(t))),Tv=async(e,t,r,o)=>{let n=Zc(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return Kf(e,"This round has no prompt.");if(e.status==="judging")return lF({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return Kf(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===O)return e;let i=Vn(e);if(i===null)return Kf(e,"The improver needs the score and the reason.");let a=await et({writerAgent:e.improverModel,workingDirectory:pe(e),prompt:Lo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:Yc()}),c=XZ(e,a,e.improverModel,r,t);return c!==null?c:Ff(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var td,vv,YZ,pF,uF,ZZ,QZ,Jf,mF,gF,eQ,tQ,Jn,fF,hF,rd=l(()=>{"use strict";x();Kc();Jc();Ce();Ye();Gt();Kn();dF();qT();td=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),vv=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return td(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},YZ=e=>{let t=pr(e);return Dz(e)||t==="usage_limit"||t==="action_required"},pF=(e,t,r)=>YZ(r)?td(e,r.errorMessage,pr(r)):vv(e,t,r.errorMessage),uF=e=>{let t=e.wizard;return t===void 0||Fc(e).length===0?e:{...e,wizard:hi({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},ZZ=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",QZ=e=>{let t=e.wizard;if(t===void 0)return e;let r=Rc({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:hi({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Jf=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),mF=e=>e.judgeModel!==O?e.judgeModel:e.improverModel!==O?e.improverModel:null,gF=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},eQ=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=mF(e);if(n===null)return td(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Ft(o),i=Cc({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:gF(e,"generalize")}),a=await et({writerAgent:n,prompt:i,workingDirectory:pe(e),signal:t});if(!a.ok)return r?.(n),pF(e,"generalize",a);try{let c=CT(a.text),d=hi({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Nc(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),u={...e,wizard:d};return Wc(d)?Jn({...u,wizard:{...d,gate:null}}):Jf(u,"generalize")}catch(c){return vv(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},tQ=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=mF(e);if(n===null)return td(e,"Choose a writer to suggest splits.");let s=Ht({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Ec({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:gF(e,"separate")}),a=await et({writerAgent:n,prompt:i,workingDirectory:pe(e),signal:t});if(!a.ok)return r?.(n),pF(e,"separate",a);try{let c=ET(a.text),d=yT(c,o.variables),u=hi({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:u};return Oc(d)?Wo(m,d[0]):Jf(m,"separate")}catch(c){return vv(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},Jn=e=>{let t=e.wizard;if(t===void 0)return e;let r=Ft(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},fF=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return td(e,"This module is missing.");let n=Nr(r),s=Dn(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==O?e.runnerModel:e.judgeModel!==O?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:ie(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},hF=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return Tv(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return eQ(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return tQ(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await Tv(e,t,r,o);if(R(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Fc(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=de(s.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??0,reasons:S.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&Ic({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let u=uF(Jf(a,i));return Io(u)}let c=Jf(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let u=AT({wizard:{...c.wizard,modules:c.wizard.modules.map((m,S)=>S===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:ZZ(s.status)});return{...c,wizard:u}})():c;return i==="evaluate"?uF(d):QZ(d)}return s}return n.phase==="complete",e}});var Li,Xf=l(()=>{"use strict";x();Ce();Li=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:TT(r,e.judgeModel===O),updatedAt:new Date().toISOString()}}});var Ri,Yf=l(()=>{"use strict";Ri=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var _t,yF,rQ,SF=l(()=>{"use strict";x();Ye();Yf();Gt();lv();_t=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yF=e=>{if(!R(e.status))return"";let t=de(e.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??null,reasons:S.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=bt(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${_t(t.reasons.trim())}</p>`,i=e.status==="passed",a=Ri(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${_t(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${_t(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',u=n!==null?`<div class="alert-error">${_t(n)}</div>`:i?rQ({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:pe(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${_t(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${_t(t.promptText)}</pre></details>`,m=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${m}</h2>${d}${o}${s}${u}</section>`},rQ=e=>{let t=e.sourceSkill?.fileName??Vc(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=Df(t,r),s=n.length>0&&x$(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${_t(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${_t(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${_t(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${_t(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${_t(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${_t(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var PF,AF=l(()=>{"use strict";PF=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var bF,oQ,Zf,tt,Qf,kv=l(()=>{"use strict";x();Ce();AF();Pf();Gt();Yf();bF=["Generalize","Evaluate","Separate","Optimize modules"],oQ=e=>{let t=zt(e),r=t>=0&&t<bF.length?bF[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},Zf=(e,t)=>{let r=Hn(e),o=r===null?null:PF(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},tt=(e,t)=>({title:e,detail:t,replyPreview:null}),Qf=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=Hn(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:Bz(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!R(e.status)){let t=e.judgeModel;return tt(`${ae(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!R(e.status)){let t=e.judgeModel;return tt(`${ae(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===O?tt(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?tt(`${ae(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):tt(`${ae(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===O){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==O?tt(`${ae(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):tt(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return tt(`${ae(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ie(t);return tt(`${ae(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return tt(`${ae(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ie(t);return tt(`${ae(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return tt(`${ae(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===O){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return tt("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return tt(`${ae(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>bt(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=oe(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||R(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?Zf(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=Ri(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?Zf(e,{title:`${oQ(r)}${s}`,detail:t.length>0?t:n}):Zf(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(R(e.status)){let t=e.errorMessage?.trim()??"";return Zf(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var hr,od=l(()=>{"use strict";Ce();hr=e=>{if(e.status==="improving"&&e.improverModel===O)return!0;if(e.status!=="judging"||e.judgeModel!==O)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===O}});var _F,wF=l(()=>{"use strict";_F=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Oo,nQ,TF,vF=l(()=>{"use strict";x();Oo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nQ=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Oo(r)}</p>`},TF=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Oo(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${Oo(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Oo(a)}.</p>`}<pre class="mono">${Oo(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Ro(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Oo(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let u=e.avoid?.trim()??"",m=u.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Oo(u)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${nQ(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Oo(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var nd,sQ,kF,CF=l(()=>{"use strict";x();Gt();nd=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sQ=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=bt(t.promptText),n=t.judgement?.reasons?`<p class="muted">${nd(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${nd(i)}.</p>`}<pre class="mono">${nd(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Ro(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,u=o===null?`<pre class="mono">${nd(d)}</pre>`:`<div class="alert-error">${nd(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${u}</article>`},kF=e=>e.revisions.map(t=>sQ(e,t)).join("")});var EF,LF=l(()=>{"use strict";x();EF=e=>{if(R(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var yr,iQ,Cv,aQ,lQ,cQ,dQ,RF,xF,Ev=l(()=>{"use strict";LF();yr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),iQ="Stop this run? Writers will stop and the best prompt is kept.",Cv="End the wizard? Writers will stop and progress from finished steps is kept.",aQ="Skip this module and pause at the step gate?",lQ=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${yr(iQ)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${yr(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,cQ=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${yr(Cv)}"><input type="hidden" name="cycleId" value="${yr(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,dQ=e=>{let t=yr(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${yr(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${yr(aQ)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${yr(Cv)}">End wizard</button>
    </form>
  </div>`},RF=e=>{let t=EF(e);return t==="none"?"":t==="legacy_stop"?lQ(e.id):t==="wizard_end_only"?cQ(e.id):dQ(e)},xF=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=yr(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${yr(Cv)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var WF,IF=l(()=>{"use strict";x();Ti();WF=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=oe(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${qn(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${qn(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${ie(r)}`}return""}});var uQ,pQ,OF,mQ,MF,NF=l(()=>{"use strict";x();IF();sv();vf();Rf();uQ=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',pQ=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',OF=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mQ=(e,t,r)=>{let o=_i(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=WF(e,t),i=Lf(e,t),a=uQ(i),c=pQ(i),d=wi(e,t,{forOutcomeSummary:!0}),u=`${a}<span class="sdlc-wizard-outcome-step-title">${OF(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${OF(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",S=i==="failed"&&t!=="wizard-4"?" open":"",f=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${f}"${m}${S}><summary aria-controls="${f}-body">${u}</summary><div class="sdlc-wizard-outcome-step-body" id="${f}-body">${o}</div></details>`},MF=e=>{let t=e.wizard;if(t===void 0||!R(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>mQ(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var jF,DF,zF=l(()=>{"use strict";jF=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),DF=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${jF(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${jF(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var Lv,$F,Rv=l(()=>{"use strict";Lv=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,$F=(e,t)=>{if(Lv(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var FF,HF=l(()=>{"use strict";FF=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var eh,UF,BF=l(()=>{"use strict";x();Rv();Rv();HF();eh=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UF=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=oe(t),o=ie(t),n=r.terminalStatusSuggestion==="passed"?"":FF(r,o),s=o-10,i=r.rows.map((c,d)=>{let u=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,f=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=u===void 0?c.status:$F(u,o),p=u!==void 0&&Lv(u,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':y==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':y==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':eh(y);return`<tr${f}><td>${eh(c.title)}</td><td>${eh(m)}</td><td>${c.tokens??"\u2014"}</td><td>${p}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${eh(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var Xn,th,xv=l(()=>{"use strict";Xn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),th=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Xn(r.fileName)}</code> \u2014 ${Xn(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${Xn(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${Xn(i.name)}</strong> <code>.cursor/skills/${Xn(i.fileName)}/SKILL.md</code></p><p class="muted">${Xn(i.description)}</p><p>${Xn(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var gQ,GF,VF=l(()=>{"use strict";x();zF();BF();xv();gQ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GF=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!R(e.status)||t.modules.length===0)return"";let r=UF(e),o=DF(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=oe(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${gQ(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${th(e)}${a}${r}${o}</section>`}});var K,rh=l(()=>{"use strict";x();K={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var oh,Wv=l(()=>{"use strict";oh=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var qF,KF=l(()=>{"use strict";rh();Wv();qF=e=>{let t=oh({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:K.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var Hr,sd=l(()=>{"use strict";Hr=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var Ur,nh,Iv=l(()=>{"use strict";x();Wf();SF();kv();od();wF();Ef();vF();CF();Ev();NF();VF();Ti();KF();Ye();sd();Ur=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nh=e=>{let t=!R(e.status)&&e.status!=="wizard_paused"&&!hr(e),r=Qf(e),o=y$(uT(_F(e)),e),n=R(e.status)?"":RF(e),s=MF(e),i=GF(e),a=yF(e),c=e.errorMessage===null?"":`<div class="alert-error">${Ur(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",u=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?oe(e.wizard):null,S=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,f=!t&&e.wizard!==void 0&&R(e.status)&&(e.wizard.phase==="complete"||oe(e.wizard).passedModuleCount>0),y=f?S?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",p=f&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ur(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",P=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${Ur(r.replyPreview)}</pre>`,w=r.detail.length===0&&p.length===0&&P.length===0||r.detail.length===0&&P.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Ur(r.detail)}${u}</p>`}${P}</div>`,h=e.revisions.find(Go=>Go.roundNumber===e.currentRound),A=e.status==="improving"?Vn(e):null,_=Fr(e),T=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),v=hr(e)?TF({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:A?.promptText??h?.promptText??"",score:A?.score??h?.judgement?.score??null,reasons:A?.reasons??h?.judgement?.reasons??null,avoid:A?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:h?.run??null,minJudgeScore:T?1:0}):"",C=e.wizard!==void 0&&e.wizard.phase==="complete"&&R(e.status),L=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!C&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?ie(e.wizard):e.passScore,W=L?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${xf(I)}</div>`:"",U=e.status==="failed"?qF({status:e.status,errorKind:e.errorKind}):null,F=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':R(e.status)?U!==null?`<span class="${U.badgeClass}">${U.badgeLabel}</span>`:C&&m!==null&&!S?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",G=t?d:f?S?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',it=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Ur(gt(pe(e)))}</li>`:"",_>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${qn(_)} so far</li>`:""].filter(Go=>Go.length>0),H=it.length===0?"":`<ul class="sdlc-run-meta">${it.join("")}</ul>`,ze=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,_r=C?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,yt=C?"":W.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${_r}</div>`:`<div class="sdlc-run-grid">${_r}${W}</div>`,Su=kF(e),la=e.wizard!==void 0&&R(e.status)&&e.revisions.every(Go=>Go.roundNumber===0&&(Go.judgement===void 0||Go.judgement===null)),Yy=Su.length===0||la?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${Su}</div></section>`,Pu=`<p class="sdlc-run-goal" title="${Ur(e.goal.trim())}">${Ur(Hr(e.goal))}</p>`,fs=C?`${c}${i}${s}${v}${a}`:`${c}${yt}${v}${s}${a}`,AK='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',bK=C?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Ur(e.updatedAt)}" aria-busy="${t?"true":"false"}">${AK}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${F}</div>${Pu}<div class="sdlc-run-activity${y}"${f?' role="status"':""}><div class="sdlc-run-activity-icon">${G}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Ur(r.title)}</h2>${w}${p}${bK}</div></div>${H}${ze}</header>${fs}</section>${Yy}`}});var JF,XF=l(()=>{"use strict";x();Jc();JF=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Ic({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:Io(e)}});var YF,ZF=l(()=>{"use strict";x();rd();YF=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Wc(t)?e:Jn({...e,wizard:{...t,gate:null}})}});var QF,eH=l(()=>{"use strict";x();Kc();QF=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Oc(t.splitOptions))return e;let r=t.splitOptions[0];return Wo(e,r)}});var fQ,Yn,sh=l(()=>{"use strict";XF();ZF();eH();ft();fQ=e=>{let t=YF(e),r=JF(t);return QF(r)},Yn=(e,t)=>{let r=fQ(t);return r!==t?(D(e,r),r):t}});var tH,Br,id=l(()=>{"use strict";x();tH=e=>pt.indexOf(e),Br=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||R(e.status)?pt.length:t.gate!==null?tH(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?tH(t.phase):null}});var rH,oH=l(()=>{"use strict";rH=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Zn,nH,sH=l(()=>{"use strict";x();oH();Zn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nH=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=jn(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Zn(rH(o))}</pre></div>`:"",s=zn(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=Nr(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),u=mf(c),m=i[c]??"",S=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,f=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Zn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Zn(u)}">${Zn(S)}</label>
        ${f}
        <input class="input" type="text" id="${Zn(u)}" name="${Zn(u)}" value="${Zn(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var iH,aH=l(()=>{"use strict";iH={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var ad,hQ,me,Mo=l(()=>{"use strict";aH();xo();ad=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hQ=e=>{let t=iH[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${ad(t.title)}" aria-describedby="${r}" aria-expanded="false">${Qe}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${ad(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${ad(t.example)}</span></span></button>`},me=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${ad(r)}"`}>${ad(e)}</span>${hQ(t)}</span>`});var wt,lH,cH,dH=l(()=>{"use strict";x();qc();rh();Mo();wt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lH=e=>{let t=e.costControls;if(t===void 0||Ai(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??mt({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${wt(K.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${wt(t.softWarnMessage??$n)}</p>`:"",d=$f({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${wt(K.estimateOverCeilingWarn)}</p>`:"",u=e.wizard?.modules.length??0,m=u>0?`<p class="muted">Step 4 will optimize ${u} module${u===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${wt(K.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${wt(K.confirmLede)}</p>
  ${m}
  ${a}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${wt(yi)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${wt(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${wt(K.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${wt(K.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${wt(K.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
    </dl>
    <div class="field">
      ${me(K.confirmedTokenLabel,"confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${s}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${me(K.confirmedSpendLabel,"confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${i}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${wt(K.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${wt(K.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},cH=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!Ai(r)}});var yQ,uH,pH=l(()=>{"use strict";xo();yQ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uH=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${Qe}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${yQ(t)}</pre></template>`}});var ld,mH,gH=l(()=>{"use strict";x();VT();sH();ZT();Ev();xv();tv();dH();pH();ld=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mH=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(cH(e))return lH(e);let n=ie(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?t$(r):"",a=o==="evaluate"?th(e):"",c=o==="evaluate"?bi({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",u=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(I=>{let W=I.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',U=I.recommended?' <span class="sdlc-badge">Recommended</span>':"",F=r.selectedSplitOptionId===I.id||r.selectedSplitOptionId===null&&I.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${ld(I.id)}" required${F}> <strong>${ld(I.title)}</strong>${W}${U}</label>${wf(e,I)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],f=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=m?.title??"Module",p=m?.prompt??"",P=m?.status==="pending",w=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${ld(y)}</p>${P?nH({cycle:e,modulePrompt:p}):""}<p class="muted">Test run prompt preview: ${ld(Dn(p,Nr(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${bi({cycle:e,interactive:!1,caption:P?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",h=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":P?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",A=xc(r),_=A===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${A}</p>`,T=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?uH(r.lastWriterParseFailureReply??""):"",v=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",C=t?.active===!0?" sdlc-wizard-gate-active":"",L=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${v}"`:"";return`<section class="card sdlc-wizard-gate${C}"${L}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${h}</p>
    ${T}
    ${_}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${ld(e.id)}">
    ${i}
    ${a}
    ${c}
    ${u}
    ${w}
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
    ${xF(e)}
  </section>`}});var SQ,fH,hH=l(()=>{"use strict";x();Rf();SQ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fH=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||R(e.status))return"";let r=(o,n)=>{let s=wi(e,o);return`<h2 class="sdlc-wizard-active-head">${SQ(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var Ov,yH,SH,No,PH,xi=l(()=>{"use strict";x();ft();Ov=new Map,yH=e=>{let t=new AbortController;return Ov.set(e,t),t.signal},SH=e=>{Ov.delete(e)},No=e=>{Ov.get(e)?.abort()},PH=(e,t)=>{let r=Z(e,t);return r===null||r.wizard!==void 0?!1:(R(r.status)||(D(e,{...r,status:"stopped",errorMessage:On,updatedAt:new Date().toISOString()}),No(t)),!0)}});var AH,bH,Mv,_H,Nv=l(()=>{"use strict";x();id();xi();AH="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",bH=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return pt[r]??null},Mv=(e,t)=>{let r=bH(t);if(r===null||e.wizard===void 0)return!1;let o=pt.indexOf(r);if(o===-1)return!1;let n=Br(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<pt.length)},_H=(e,t)=>{let r=bH(t);if(r===null||e.wizard===void 0||!Mv(e,t))return e;No(e.id);let o=pt.slice(pt.indexOf(r)),n=kc(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var jv,wH,TH=l(()=>{"use strict";Nv();jv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wH=(e,t)=>Mv(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${jv(AH)}"><input type="hidden" name="cycleId" value="${jv(e.id)}"><input type="hidden" name="wizardStepId" value="${jv(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var PQ,vH,AQ,kH,CH=l(()=>{"use strict";x();id();gH();hH();TH();vf();PQ={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},vH=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AQ=(e,t,r)=>{let o=wH(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${vH(t)}">
  <summary class="sdlc-wizard-accordion-summary">${vH(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${_i(e,t)}</div>
</details>`},kH=e=>{let t=e.wizard;if(t===void 0)return"";let r=Br(e);if(r===null)return"";let o=pt.slice(0,r).map((i,a)=>AQ(e,`wizard-${a+1}`,PQ[i])),n=t.gate!==null?mH(e,{active:!0}):fH(e),s=r>=pt.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var ih,Dv=l(()=>{"use strict";CH();ev();x();ih=e=>{if(e===null||e.wizard!==void 0&&R(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=kH(e),r=i$(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var bQ,zv,EH=l(()=>{"use strict";x();Ce();Ye();Kn();bQ=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},zv=async(e,t,r)=>{if(!bQ(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===O)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=bT({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await et({writerAgent:e.judgeModel,prompt:n,workingDirectory:pe(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=wT(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var cd,ah,LH,$v,RH,xH,WH,lh,Fv=l(()=>{"use strict";cd=g(require("node:fs")),ah=g(require("node:path")),LH=e=>ah.default.join(ah.default.dirname(e),"prompt-optimizer-writer-ready.json"),$v=e=>{let t=LH(e);if(!cd.default.existsSync(t))return{};try{let r=JSON.parse(cd.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},RH=(e,t)=>{cd.default.mkdirSync(ah.default.dirname(e),{recursive:!0}),cd.default.writeFileSync(LH(e),`${JSON.stringify(t,null,2)}
`)},xH=(e,t)=>$v(e)[t]?.message??null,WH=(e,t,r)=>{RH(e,{...$v(e),[t]:{message:r}})},lh=(e,t)=>{let r=$v(e);r[t]!==void 0&&RH(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var Hv,ch,dh,IH,Ee,Qn=l(()=>{"use strict";x();cv();rd();EH();od();xi();Fv();sh();ft();Hv=new Set,ch={atMs:0,ids:[]},dh=async()=>{if(Date.now()-ch.atMs<3e4)return ch.ids;let e=await Dt({commands:Se({})});return ch.atMs=Date.now(),ch.ids=e.installedWriterIds,e.installedWriterIds},IH=async(e,t,r)=>{let o=Z(e,t);if(o===null||r.aborted)return;let n=Yn(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(R(n.status)&&!s||n.status==="wizard_paused"||hr(n))return;if(s){let c=await zv(n,r,d=>{lh(e,d)});D(e,c);return}let i=await hF(n,c=>{lh(e,c)},r,c=>{Z(e,t)?.status==="stopped"||r.aborted||D(e,c)});if(!(Z(e,t)?.status==="stopped"||r.aborted)){if(D(e,i),R(i.status)){let c=await zv(i,r,d=>{lh(e,d)});D(e,c);return}await IH(e,t,r)}},Ee=(e,t)=>{if(Hv.has(t))return;let r=Z(e,t);if(r===null)return;let o=Yn(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(R(o.status)&&!n||o.status==="wizard_paused"||hr(o))return;Hv.add(t);let s=yH(t);IH(e,t,s).finally(()=>{Hv.delete(t),SH(t)})}});var jo,dd=l(()=>{"use strict";Iv();sh();Dv();Qn();jo=(e,t)=>{let r=Yn(e,t);return Ee(e,r.id),`${nh(r)}${ih(r)}`}});var OH,MH,NH=l(()=>{"use strict";OH=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,MH=e=>e!==null&&e>0});var _Q,wQ,TQ,jH,DH=l(()=>{"use strict";x();rd();Xf();Kc();Jc();xi();kf();kf();_Q=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),wQ=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=de(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},TQ=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=oe(o);return Li({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},jH=(e,t)=>{if(!Gc(e,t))return e;No(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return Jn({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return Io(wQ(r));if(t==="wizard-3"){let n=o.splitOptions[0]??_Q(o.templatedPrompt);return Wo(r,n)}return t==="wizard-4"?TQ(r):e}});var uh,zH,Uv=l(()=>{"use strict";x();Xf();xi();uh=e=>(No(e.id),{...Li(e,"stopped"),errorMessage:Kw}),zH=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;No(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var vQ,$H,FH,HH=l(()=>{"use strict";x();rd();Xf();Kc();Jc();dd();ft();Qn();NH();Nv();DH();Uv();vQ="Pick a revision scored above 0 before continuing to Separate.",$H=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),FH=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=Z(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=Z(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(jo(e.storePath,d))};if(o==="wizard-stop-all"){let c=uh(s);return D(e.storePath,c),Ee(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=zH(s);return D(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=_H(s,c);return D(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=jH(s,c);return D(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&Ee(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let u=t.get("wizardStepInstructions")?.trim()??"",m=fT(s.wizard,d,c);m=kc(m,d),m={...m,pendingStepInstructions:u};let S={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return D(e.storePath,S),Ee(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(S=>S.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?$H(s):Jn({...s,wizard:{...s.wizard,gate:null}});return D(e.storePath,m),Ee(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),u=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=OH(s,u??-1);if(!MH(m)){let f={...s,errorMessage:vQ,updatedAt:new Date().toISOString()};return D(e.storePath,f),a(n),!0}let S=Io({...s,wizard:{...s.wizard,evaluateSelectedRound:u}});return D(e.storePath,S),Ee(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let f=$H(s);return D(e.storePath,f),Ee(e.storePath,n),a(n),!0}let u=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(f=>f.id===u);if(m===void 0){let f={...s,errorMessage:u.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return D(e.storePath,f),a(n),!0}let S=Wo(s,m);return D(e.storePath,S),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,u=d.currentModuleIndex,m=d.modules[u];if(m===void 0)return a(n),!0;if(!Ai(s.costControls)){let P=t.get("confirmedTokenBudget")?.trim()??"",w=t.get("confirmedMaxSpendUsd")?.trim()??"";if(P.length===0){let A={...s,errorMessage:yi,updatedAt:new Date().toISOString()};return D(e.storePath,A),a(n),!0}let h=zr({existing:s.costControls,confirmedTokenBudget:Number(P),confirmedMaxSpendUsd:w.length===0?null:Number(w),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!h.ok){let A={...s,errorMessage:h.errorMessage,updatedAt:new Date().toISOString()};return D(e.storePath,A),a(n),!0}s={...s,costControls:h.costControls,errorMessage:null,updatedAt:new Date().toISOString()},D(e.storePath,s)}let S=OT({wizard:d,modulePrompt:m.prompt,posted:t});if(!S.ok){let P={...s,errorMessage:S.errorMessage,updatedAt:new Date().toISOString()};return D(e.storePath,P),a(n),!0}let f={...d,parameterValues:S.parameterValues};if(m.status==="pending"){let P=fF({...s,wizard:{...f,gate:null}},u);return D(e.storePath,P),Ee(e.storePath,n),a(n),!0}let y=u+1;if(y>=d.modules.length){let P=oe(f),w=Li({...s,wizard:f},P.terminalStatusSuggestion);return D(e.storePath,w),Ee(e.storePath,n),a(n),!0}let p={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...f,gate:"optimize_modules",currentModuleIndex:y},updatedAt:new Date().toISOString()};return D(e.storePath,p),a(n),!0}}return a(n),!0}});var kQ,UH,CQ,Bv,EQ,BH,GH=l(()=>{"use strict";Ce();xi();Uv();yv();Hf();od();ft();kQ="Add a score from 0 to 100 and the reason for it.",UH="Add a score from 1 to 100 and the reason for it.",CQ="Write the next prompt.",Bv="This step is not waiting for you.",EQ=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},BH=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=Z(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(D(e.storePath,uh(a)),{kind:"saved",cycleId:i}):PH(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=Z(e.storePath,r);if(o===null||!hr(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:Bv};if(t==="manual-judge"){if(o.judgeModel!==O)return{kind:"invalid",cycle:o,errorMessage:Bv};let i=EQ(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?UH:kQ};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:UH};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",u=Uf(Qc(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return D(e.storePath,u),{kind:"saved",cycleId:o.id}}if(o.improverModel!==O)return{kind:"invalid",cycle:o,errorMessage:Bv};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:CQ};let s=Ff(o,n);return D(e.storePath,s),{kind:"saved",cycleId:o.id}}});var VH,qH=l(()=>{"use strict";VH=`<script>
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
</script>`});var KH,JH=l(()=>{"use strict";KH=`<script>
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
</script>`});var XH,YH=l(()=>{"use strict";XH=`<script>
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
</script>`});var ZH,QH=l(()=>{"use strict";ZH=`<script>
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
</script>`});var e1,t1=l(()=>{"use strict";x();Ye();e1=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:gt(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(ie(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!R(t.status)}}});var r1,o1=l(()=>{"use strict";r1=`<script>
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
</script>`});var n1,s1=l(()=>{"use strict";x();id();Yf();n1=e=>{let t=Ri(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:R(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=Br(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=oe(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=oe(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return R(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var i1,a1=l(()=>{"use strict";i1=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Gr,LQ,RQ,l1,c1=l(()=>{"use strict";s1();a1();sd();Gr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),LQ=e=>e.wizard===void 0?"legacy":"wizard",RQ=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Gr(t)}">`,o=n1(e),n=i1(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Gr(o.badgeClass)}">${Gr(o.badgeLabel)}</span>`,u=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Gr(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Gr(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${LQ(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Gr(e.id)}">${Gr(Hr(e.goal))}</a><p class="muted">${Gr(a)}</p></div></div><div class="sdlc-history-row-actions">${u}${m}</div></li>`},l1=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>RQ(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Gr(s)}</summary>${i}</details>`:i}});var Gv,ph,d1,xQ,WQ,ud,u1,mh=l(()=>{"use strict";Gv=g(require("node:fs")),ph=g(require("node:path"));Ye();d1=/^[a-z0-9-]+$/,xQ=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},WQ=(e,t)=>{if(!d1.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let u=/^(name|description):\s*(.*)$/.exec(d.trim());if(u===null)continue;let m=xQ(u[2]??"");u[1]==="name"&&m.length>0&&(o=m),u[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},ud=e=>{let t=$r(e);if(!t.ok)return[];let r=ph.default.resolve(t.path,".cursor","skills"),o=[];try{o=Gv.default.readdirSync(r)}catch{return[]}return o.filter(n=>d1.test(n)).flatMap(n=>{let s=ph.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${ph.default.sep}`))return[];try{let i=WQ(Gv.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},u1=(e,t)=>ud(e).find(r=>r.fileName===t)??null});var p1,IQ,m1,g1,f1=l(()=>{"use strict";Mo();p1=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IQ=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),m1=e=>{if(e.length===0)return`<div class="field">${me("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${p1(r.fileName)}">${p1(r.fileName)}</option>`).join("");return`<div class="field">${me("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${IQ(e)}</script>`},g1=`<script>
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
</script>`});var rt,h1,y1=l(()=>{"use strict";x();rh();qc();Mo();rt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),h1=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=rt(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=Pi({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??Dr(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),m=$f({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",S=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${rt(K.knobsSectionTitle)}</p>
  <p class="muted">${rt(K.knobsSectionLede)}</p>
  <div class="field">
    ${me(K.maxTrialsLabel,"maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${30}" step="1" value="${r}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${me(K.maxSpendUsdLabel,"maxSpendUsd")}
    <input class="input" type="number" name="maxSpendUsd" id="sdlc-max-spend-usd" min="0" step="0.01" value="${o}" placeholder="Optional" data-sdlc-max-spend-usd>
    <p class="muted">${rt(K.autoConfirmHint)}</p>
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${n}>
      <span>${rt(K.earlyStopLabel)}</span>
    </label>
    <p class="muted">${rt(K.earlyStopHint)}</p>
  </div>
  <div class="sdlc-cost-estimate" data-sdlc-cost-estimate>
    <p class="sdlc-block-title">${rt(K.estimateSectionTitle)}</p>
    <p class="muted">${rt(K.estimateSectionLede)}</p>
    <dl class="sdlc-cost-proposal sdlc-cost-estimate-proposal">
      <div><dt>${rt(K.targetTokenLabel)}</dt><dd data-sdlc-target-tokens data-sdlc-proposed-tokens>${a.targetTokenBudget.toLocaleString("en-US")}</dd></div>
      <div><dt>${rt(K.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${a.estimatedSpendUsd.toFixed(4)}</dd></div>
      <div><dt>${rt(K.rateChipLabel)}</dt><dd><span class="sdlc-cost-rate-chip" data-sdlc-writer-rate-chip data-writer-id="${rt(S)}">$${c.toFixed(4)} / 1k \xB7 ${rt(S)}</span></dd></div>
    </dl>
    <input type="hidden" name="targetTokenBudget" value="${a.targetTokenBudget}" data-sdlc-target-token-budget-input>
    <input type="hidden" name="estimatedSpendUsd" value="${a.estimatedSpendUsd}" data-sdlc-estimated-spend-input>
    <input type="hidden" name="rateUsdPer1kTokens" value="${c}" data-sdlc-cost-rate>
    <p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling${m}>${rt(K.estimateOverCeilingWarn)}</p>
  </div>
</div>`}});var Ke,S1,P1,OQ,A1,b1,_1,w1=l(()=>{"use strict";x();kv();Ce();sd();id();Ke=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),S1=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",P1=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,OQ=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},A1=e=>e===O?"You":ae(e),b1=e=>{let t=OQ(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ae(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Ke(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Ke(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Ke(A1(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Ke(A1(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Ke(r)}</dd></div>
    </dl>
  </details>`},_1=e=>{let t=e.wizard;if(t===void 0)return"";let r=Hr(e.goal),o=e.status==="wizard_paused",n=!R(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let u=Qf(e),m=P1(t),S=m===null?"":S1(m),f=Br(e),y=S.length===0?"":f===null||f>=4?` <strong>${Ke(S)}</strong>`:` <strong>${Ke(S)}</strong> (step ${f+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Ke(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Ke(u.title)}${y}</p>
    <p class="muted">${Ke(u.detail)}</p>
    <div class="actions">
      ${b1(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ke(e.id)}">Open this run</a>
    </div>
  </section>`}let s=P1(t),i=s===null?"Wizard":S1(s),a=Br(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ke(r)}</h2>
    <p class="lede">Paused at <strong>${Ke(i)}</strong>${Ke(c)} (last updated ${Ke(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${b1(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ke(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var pd,T1,v1=l(()=>{"use strict";Mo();pd=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),T1=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${pd(n.id)}"${n.id===e.runner?" selected":""}>${pd(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${pd(e.runner)}">Checking ${pd(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${me("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${me("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${pd(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var k1,C1=l(()=>{"use strict";k1=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var Wi,E1,L1,R1,x1,W1=l(()=>{"use strict";Mo();Wi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),E1=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${Wi(c.id)}"${c.id===r?" selected":""}>${Wi(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Wi(n)}</option>`;return`<div class="field">${me(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},L1=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Wi(t)}">Checking ${Wi(o)}\u2026</p>`},R1=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${me(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Wi(r)}</textarea><span class="muted">${o}</span></div></details>`,x1=e=>{let t=`<div class="sdlc-writer">${E1("judge","Judge",e.judge,e.writers,"I'll score it")}${L1("judge",e.judge,e.writers)}${R1("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${E1("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${L1("improver",e.improver,e.writers)}${R1("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var I1,O1=l(()=>{"use strict";I1=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var Vv,M1,N1=l(()=>{"use strict";O1();Vv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),M1=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${I1.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${Vv(t.goal)}" title="${Vv(t.goal)}">${Vv(t.label)}</button>`).join("")}</div>`});var md,MQ,NQ,qv,j1=l(()=>{"use strict";x();Mo();md=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),MQ=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},NQ=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,qv=e=>{let t=MQ(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=Ac(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${me(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${md(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${md(e.inputId)}" class="sdlc-pass-range" type="range" name="${md(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${md(a)}"><span class="sdlc-pass-mark" style="left:${NQ(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${md(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var DQ,Kv,Vr,D1,z1=l(()=>{"use strict";od();Iv();qH();JH();Wf();YH();QH();t1();o1();c1();mh();f1();Mo();Dv();y1();w1();sd();v1();C1();W1();x();N1();j1();DQ=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Kv='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',Vr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),D1=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Vr(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Vr(e.skillNotice??"")}</div>`,o=`${S$}${P$}`,n=e.resumableWizardCycle??null,s=n===null?"":_1(n),i=ih(e.cycle),a=e.cycle===null?"":nh(e.cycle),c=e.cycle!==null&&hr(e.cycle),d=e1(e),u=DQ(d.goal,d.prompt,e.canRun),m=x1({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),S=T1({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),f=`${qv({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${qv({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=h1({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),p=mT,P=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",w=e.cycle!==null&&R(e.cycle.status),h=d.running&&!w,A=w||h?"":" open",_=h?" sdlc-compose-run-focus":"",v=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${w?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,C=w?(()=>{let H=e.cycle!==null?Hr(e.cycle.goal):Hr(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Vr(H)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${v}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${v}</summary>`,L=w?" sdlc-compose-viewing-finished":"",I=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",W=c?"waiting":d.running?"running":"idle",U=d.running&&!c?' aria-busy="true"':"",F=`<section class="card sdlc-compose${L}${_}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${A}>
        ${C}
        <div class="sdlc-compose-details-body">
      <p class="lede">${p} ${Vr(e.modelNote)}</p>
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
            ${me("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Vr(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${m1(ud(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${Kv}
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <input type="hidden" name="orchestratorSkillFile" value="" data-orchestrator-skill-file>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <p class="muted sdlc-compose-orchestrator-note" data-orchestrator-skill-note hidden></p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${me("Goal","goal")}
            ${M1()}
            <textarea class="input textarea" name="goal" rows="4" required>${Vr(d.goal)}</textarea>
          </div>
          <div class="field">
            ${me("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Vr(d.prompt)}</textarea>
          </div>
          ${f}
          ${y}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${Kv}
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
        ${k1()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${Kv}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${Vr(d.passScore)}; Step 4 pass \u2265 ${Vr(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${W}" data-can-run="${u?"true":"false"}"${U}${d.running?" disabled":""}>${I}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,G=e.history.length>0?r1:"",it=`${""}${ZH}${VH}${KH}${XH}${g1}${G}`;return`${t}${r}${F}${s}${a}${i}${o}${l1(e.history,e.cycle?.id??null)}${it}`}});var gd,Jv=l(()=>{"use strict";z1();gd=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:D1(t)}))}});var $1,F1=l(()=>{"use strict";GH();dd();Jv();ft();Qn();$1=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:BH({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=Z(e.storePath,o.cycleId);return Ee(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(jo(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await gd(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:gr(e.storePath),resumableWizardCycle:null}),!0)}});var H1,gh,Xv=l(()=>{"use strict";x();H1=g(require("node:os")),gh=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??H1.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??Bt()}}});var U1,Ii,Yv,B1,G1,fd=l(()=>{"use strict";x();Ce();iv();U1=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Ii=e=>{let t=Vz(e),r=Un(e).map(s=>({id:s,label:Af[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},Yv=(e,t,r)=>t===O||t!==null&&e.writers.some(o=>o.id===t)?t:r,B1=(e,t,r,o=null)=>({judge:Yv(e,t,e.judge),improver:Yv(e,r,e.improver),runner:Yv(e,o,e.runner)}),G1=e=>e===If?{goal:Of,prompt:Mf}:{goal:"",prompt:""}});var Zv,V1=l(()=>{"use strict";Zv=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var q1,zQ,K1,J1,X1,Y1=l(()=>{"use strict";x();q1=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},zQ=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},K1=(e,t)=>e.has("earlyStop")?!0:t!=="run",J1=e=>{let t=q1(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=zQ(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=q1(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},X1=e=>Bt(e)});var Z1,Q1,fh,Qv=l(()=>{"use strict";x();Ce();Ye();fd();V1();Y1();Z1=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=Zv(o);return n.ok?String(n.passScore):String(r)},Q1=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return Zv(n)},fh=e=>{let t=B1(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=Z1(e.posted,"passScore",70),o=Z1(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),u=e.posted?.get("maxSpendUsd")?.trim()??"",m=e.posted?.get("intent")??"",S=e.posted===null?!0:K1(e.posted,m),f=(C,L)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:C,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:L,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:u,earlyStop:S});if(e.posted===null)return f(e.defaultFolder??Bn,null);let y=e.posted.get("folder")??Bn;if(e.posted.get("intent")==="choose-folder"){let C=e.pickFolder();return f(C===null?y:gt(C),null)}if((e.posted.get("intent")??"")!=="run")return f(y,null);let P=U1(e.goal,e.prompt);if(P!==null)return f(y,P);let w=Q1(e.posted,"passScore",r);if(!w.ok)return f(y,w.errorMessage);let h=Q1(e.posted,"modulePassScore",o);if(!h.ok)return f(y,h.errorMessage);let A=qz(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(A===null)return f(y,"Choose a judge and an improver.");let _=$r(y);if(!_.ok)return f(y,_.errorMessage);let T=Kz(e.installedIds,c,A.judge);if(T===null)return f(y,"Choose a runner for wizard step 4.");let v=J1({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return v.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:A.judge,improver:A.improver,workingDirectory:_.path,passScore:w.passScore,modulePassScore:h.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:T,runnerInstructions:a,costControls:X1(v.knobs)}:f(y,v.errorMessage)}});var Oi,yh,$Q,ek,eU,hh,tU,FQ,rU,tk,HQ,UQ,BQ,rk,oU,nU,sU=l(()=>{"use strict";Oi=g(require("node:fs")),yh=g(require("node:path"));Ce();Ye();$Q=["remember","choose-folder","run"],ek=()=>({folder:Bn,judge:"",improver:"",runner:""}),eU=e=>yh.default.join(yh.default.dirname(e),"prompt-optimizer-preferences.json"),hh=e=>typeof e=="string"?e:"",tU=e=>{let t=eU(e);if(!Oi.default.existsSync(t))return ek();try{let r=JSON.parse(Oi.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return ek();let o=r,n=hh(o.folder).trim();return{folder:n.length===0?Bn:n,judge:hh(o.judge),improver:hh(o.improver),runner:hh(o.runner)}}catch{return ek()}},FQ=(e,t)=>{let r=eU(e);Oi.default.mkdirSync(yh.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;Oi.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),Oi.default.renameSync(o,r)},rU=(e,t)=>e===O||Un(t).some(r=>r===e),tk=(e,t,r)=>e===null?t:e.length===0?"":rU(e,r)?e:t,HQ=(e,t)=>{if(e===null)return t;let r=$r(e);return r.ok?r.display:t},UQ=e=>{let t=tU(e.storePath),r={folder:HQ(e.folder,t.folder),judge:tk(e.judge,t.judge,e.installedIds),improver:tk(e.improver,t.improver,e.installedIds),runner:tk(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||FQ(e.storePath,r)},BQ=e=>{let t=$r(e);return t.ok?t.display:Bn},rk=(e,t)=>rU(e,t)?e:"",oU=e=>{let t=tU(e.storePath);return{selection:{...e.selection,judge:rk(t.judge,e.installedIds)||e.selection.judge,improver:rk(t.improver,e.installedIds)||e.selection.improver,runner:rk(t.runner,e.installedIds)||e.selection.runner},defaultFolder:BQ(t.folder)}},nU=e=>{let t=e.posted.get("intent")??"";if(!$Q.includes(t))return;let r=e.posted.get("folder");UQ({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var iU,GQ,VQ,ok,qQ,Sh,Ph=l(()=>{"use strict";iU=g(require("node:os"));Ce();Fv();Kn();GQ="Reply with the single word ok. Do not use tools.",VQ=45e3,ok=async(e,t)=>{if(t===O)return{ok:!0,message:"You will do this step."};let r=xH(e,t);if(r!==null)return{ok:!0,message:r};let o=await et({writerAgent:t,prompt:GQ,workingDirectory:iU.default.tmpdir(),timeoutMs:VQ});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ae(t)} is ready.`;return WH(e,t,n),{ok:!0,message:n}},qQ=e=>[...new Set(e.filter(t=>t.length>0))],Sh=async(e,t,r,o)=>{for(let n of qQ([t,r,o??""])){let s=await ok(e,n);if(!s.ok)return s.message}return null}});var nk,aU=l(()=>{"use strict";x();nk=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!R(r.status)&&!(t!==null&&r.id===t))return r;return null}});var lU,cU=l(()=>{"use strict";Nt();x();qc();dd();Xv();Qv();Jv();ft();Ye();sU();mh();Ph();aU();sh();Qn();lU=async e=>{let t=e.posted===null?oU({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=fh({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>ko("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(nU({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?gt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await Sh(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await gd(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:gt(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:gr(e.route.storePath),resumableWizardCycle:nk(gr(e.route.storePath),null)});return}if(r.kind==="start"){let s=u1(r.workingDirectory,r.sourceSkillFile),i=zf($c({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=gh({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:vT({...vc(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(D(e.route.storePath,a),Ee(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(jo(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:Z(e.route.storePath,e.cycleId);n!==null&&(n=Yn(e.route.storePath,n),Ee(e.route.storePath,n.id)),await gd(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:gr(e.route.storePath),resumableWizardCycle:nk(gr(e.route.storePath),n?.id??null)})}});var dU,uU=l(()=>{"use strict";ft();dU=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";E$(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var pU,mU=l(()=>{"use strict";pU=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var gU,fU=l(()=>{"use strict";M$();HH();F1();cU();uU();fd();mU();Qn();gU=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await dh(),o=Ii(r),n=e.method==="POST"?pU(e.request.headers["content-type"],await e.readBody(e.request)):null;if(FH({posted:n,storePath:e.storePath,response:e.response})||await $1(e,n,o))return;let s=G1(t.searchParams.get("example")),i=dU({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=O$({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await lU({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:I$(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var KQ,hU,yU=l(()=>{"use strict";x();ft();KQ=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",hU=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=Z(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!R(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=kT({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${KQ(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var SU,PU=l(()=>{"use strict";dd();ft();SU=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:Z(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":jo(e.storePath,o)),!0}});var JQ,AU,bU=l(()=>{"use strict";Ce();Ph();JQ=["claude-cli","codex","cursor","antigravity"],AU=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===O||JQ.includes(t)?await ok(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var _U,wU=l(()=>{"use strict";x();_U=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:_c,page:wc,context:gi,installedWriters:e,post:{method:"POST",url:_c,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${_c}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var Ah,TU=l(()=>{"use strict";x();Wv();Ti();Ah=e=>{let t=e.revisions[e.revisions.length-1]??null,r=de(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=R(e.status),n=e.errorKind??null,s=oh({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:Fr(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:gi,page:`${wc}?cycle=${encodeURIComponent(e.id)}`}}});var B,XQ,vU,kU,CU=l(()=>{"use strict";B=g(bs());x();XQ=(0,B.isType)({goal:B.isString,prompt:B.isString,workingDirectory:B.isString,judge:(0,B.isUndefinedOr)(B.isString),improver:(0,B.isUndefinedOr)(B.isString),passScore:(0,B.isUndefinedOr)(B.isNumber),maxRounds:(0,B.isUndefinedOr)(B.isNumber),maxTrials:(0,B.isUndefinedOr)(B.isNumber),maxSpendUsd:(0,B.isUndefinedOr)(B.isNumber),earlyStop:(0,B.isUndefinedOr)(B.isBoolean),earlyStopFlatRounds:(0,B.isUndefinedOr)(B.isNumber),confirmedTokenBudget:(0,B.isUndefinedOr)(B.isNumber),confirmedMaxSpendUsd:(0,B.isUndefinedOr)(B.isNumber),rateUsdPer1kTokens:(0,B.isUndefinedOr)(B.isNumber)}),vU=e=>{let t=e?.trim()??"";return t.length===0?null:t},kU=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return XQ(t)?t.workingDirectory.trim().length===0?{ok:!1,error:sf}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:vU(t.judge),improver:vU(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:sf}}});var qr,YQ,EU,LU,RU=l(()=>{"use strict";x();qr=g(bs()),YQ=(0,qr.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:qr.isNumber,confirmedMaxSpendUsd:(0,qr.isUndefinedOr)(qr.isNumber),rateUsdPer1kTokens:(0,qr.isUndefinedOr)(qr.isNumber)}),EU=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:YQ(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},LU=(e,t)=>{let r=zr({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var ZQ,xU,WU=l(()=>{"use strict";x();Ce();Qv();fd();ZQ=e=>e.map(t=>t.id).join(", "),xU=e=>{let t=Ii(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===O||n===O)return{ok:!1,error:pT,installedWriters:t.writers};if(o===null||n===null){let a=ZQ(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=fh({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var QQ,IU,OU=l(()=>{"use strict";x();Xv();wU();TU();fd();CU();RU();WU();ft();QQ=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},IU=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let u=Z(e.storePath,t);return u===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:Ah(u)}}let r=await e.handlers.readInstalledIds(),o=Ii(r);if(e.method==="GET")return{status:200,body:_U(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let u=EU(e.rawBody);if(u.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(u.kind==="invalid")return{status:400,body:{ok:!1,error:u.error}};let m=Z(e.storePath,t);if(m===null)return{status:404,body:{ok:!1,error:"That run is not on this Mac."}};let S=LU(m,u.body);return S.ok?(D(e.storePath,S.cycle),{status:200,body:Ah(S.cycle)}):{status:400,body:{ok:!1,error:S.error}}}let n=QQ(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let u=Pi({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:u.targetTokenBudget,proposedTokenBudget:u.targetTokenBudget,estimatedSpendUsd:u.estimatedSpendUsd,rateUsdPer1kTokens:u.rateUsdPer1kTokens??null,proposalStub:u.stub===!0,confirmationRequired:!0}}}let s=kU(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=xU({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=$c({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:mt({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let u=zr({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!u.ok)return{status:400,body:{ok:!1,error:u.errorMessage}};c=u.costControls}let d=gh({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:vc(i.prompt),runnerModel:i.runner,costControls:c});return D(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:Ah(d)}}});var MU,NU=l(()=>{"use strict";Qn();Ph();OU();MU=async e=>{let t=await IU({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:dh,readWritersReady:Sh,startCycle:Ee}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var DU,eee,tee,jU,ree,zU,$U=l(()=>{"use strict";DU=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],eee=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},tee=e=>{let t={};for(let n of e)for(let s of new Set(DU(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},jU=(e,t)=>{let r=eee(DU(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},ree=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},zU=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=tee(e.map(i=>i.text)),s=jU(o,n);return e.map(i=>({id:i.id,score:ree(s,jU(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var sk,oee,nee,FU,see,iee,aee,lee,ik,ak=l(()=>{"use strict";sk=g(require("node:path"));Ye();$U();mh();oee=5,nee=20,FU=280,see=e=>[e.name,e.description,e.promptText].join(`
`),iee=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=FU?t:`${t.slice(0,FU-3)}...`},aee=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),lee=e=>e===void 0||!Number.isFinite(e)?oee:Math.min(nee,Math.max(1,Math.floor(e))),ik=e=>{let t=e.query.trim(),r=lee(e.limit),o=$r(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=ud(o.path),s=zU(n.map(d=>({id:d.fileName,text:see(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=sk.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let u=i.get(d.id);return u===void 0?[]:[{skillId:u.fileName,name:u.name,description:u.description,score:d.score,sourcePath:sk.default.join(a,u.fileName,"SKILL.md"),excerpt:iee(u),source:"filesystem"}]});return{query:t,hits:c,context:aee(c)}}});var HU,UU=l(()=>{"use strict";ak();HU=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:ik({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var BU,GU=l(()=>{"use strict";UU();BU=async e=>{let t=HU({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var cee,lk,VU=l(()=>{"use strict";_$();fU();yU();PU();bU();NU();GU();cee=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},lk=async e=>{let t=cee(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await MU(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await BU(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:b$()})),!0):(await AU({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||hU({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||SU({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await gU(e),!0)}});var qU=l(()=>{"use strict";VU();ak();Kn()});var KU,dee,Kr,ck,dk=l(()=>{"use strict";KU=e=>{let t=JSON.parse(e);return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]},dee=e=>e===""?null:e,Kr=e=>e??"",ck=e=>({id:e.id,projectId:dee(e.project_id),symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:{kind:e.check_kind,value:e.check_value},keywords:KU(e.keywords_json),tags:KU(e.tags_json),source:e.source,hitCount:e.hit_count,lastSeenAt:e.last_seen_at,severity:e.severity})});var JU,uee,pee,uk,Mi,bh,hd=l(()=>{"use strict";dk();JU=`
  SELECT p.project_id, p.id, p.symptom, p.cause, p.avoidance,
    p.check_kind, p.check_value, p.keywords_json, p.tags_json,
    p.source, p.severity,
    COALESCE(h.hit_count, 0) AS hit_count,
    h.last_seen_at AS last_seen_at
  FROM pitfalls p
  LEFT JOIN pitfall_hits h
    ON h.project_id = ? AND h.pitfall_id = p.id
  WHERE p.project_id = ?`,uee=e=>e,pee=e=>e??null,uk=(e,t,r=t)=>uee(e.prepare(JU).all(Kr(r),Kr(t))).map(ck),Mi=(e,t,r,o=t)=>{let n=pee(e.prepare(`${JU} AND p.id = ?`).get(Kr(o),Kr(t),r));return n===null?null:ck(n)},bh=(e,t)=>{e.prepare(`INSERT INTO pitfalls (
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
      severity = excluded.severity`).run(Kr(t.projectId),t.id,t.symptom,t.cause,t.avoidance,t.check.kind,t.check.value,JSON.stringify(t.keywords),JSON.stringify(t.tags),t.source,t.severity)}});var _h,pk=l(()=>{"use strict";Mt();_h=e=>e.map(t=>({id:kn(t.id),avoidance:kn(t.avoidance)}))});var mk,XU,wh=l(()=>{"use strict";mk=e=>{let t=new Map;e.seeds.forEach(o=>{t.set(o.id,o)}),e.projectRows.forEach(o=>{t.set(o.id,o)});let r=[...t.values()];return e.includeRetired===!0?r:r.filter(o=>o.source!=="retired")},XU=e=>e.filter(t=>t.source!=="retired").length});var es,YU,yd=l(()=>{"use strict";Mt();pk();hd();wh();es=(e,t={})=>{let r=t.projectId??null,o=uk(e,null,r),n=r===null||r===""?[]:uk(e,r);return mk({seeds:o,projectRows:n,includeRetired:t.includeRetired===!0})},YU=(e,t={})=>{let r=es(e,t);return t.format==="bot"?{format:"bot",items:_h(r),lines:r.map(o=>$l(o))}:{format:"full",items:r}}});var Th,gk=l(()=>{"use strict";hd();yd();Th=(e,t)=>{let r=t.id.trim();if(r.length===0)return null;let o=t.projectId??null;return o===null||o===""?Mi(e,null,r):es(e,{projectId:o,includeRetired:!0}).find(s=>s.id===r)??null}});var fk=l(()=>{"use strict"});var Do,Ni,ZU,QU,eB=l(()=>{"use strict";Do=e=>({type:"string",description:e}),Ni={name:"check_context",description:"Match the current prompt against project pitfalls. Call on the first user message. Returns hit, miss, or none. Miss stays silent.",inputSchema:{type:"object",properties:{cwd:Do("Absolute working directory for the current session."),message:Do("User prompt or task text to match."),sessionId:Do("Optional session id for first-message tracking."),projectId:Do("Optional project id when already known.")},additionalProperties:!1}},ZU={name:"get_context",description:"Compact project briefing: id, folder, and feature flags. Not a full docs dump.",inputSchema:{type:"object",properties:{cwd:Do("Absolute working directory."),projectId:Do("Optional project id when already known.")},additionalProperties:!1}},QU={name:"get_pitfalls",description:"List or search project pitfalls in a short bot-friendly form.",inputSchema:{type:"object",properties:{projectId:Do("Project id."),q:Do("Optional search text."),limit:{type:"number",description:"Max rows to return."}},additionalProperties:!1}}});var ts,tB,rB,oB=l(()=>{"use strict";ts=e=>({type:"string",description:e}),tB={name:"get_skill",description:"Read one project skill by id or search. Same idea as the cloud skill tools.",inputSchema:{type:"object",properties:{projectId:ts("Project id."),skillId:ts("Skill id when known."),q:ts("Optional search text.")},required:["projectId"],additionalProperties:!1}},rB={name:"record_outcome",description:"Record whether a tip or preflight check helped. Pitfall wins call the cloud hit route.",inputSchema:{type:"object",properties:{projectId:ts("Project id."),kind:{type:"string",description:"pitfall | preflight | other"},pitfallId:ts("Pitfall id when kind is pitfall."),preflightId:ts("Preflight check id when kind is preflight."),ok:{type:"boolean",description:"Whether the step helped."},notes:ts("Optional short note. No secret values.")},required:["projectId","kind","ok"],additionalProperties:!1}}});var nB=l(()=>{"use strict";eB();oB()});var hk,sB=l(()=>{"use strict";Mt();fk();hk=e=>{let t=mg("Agent Witch tip \xB7 check_context",120);if(wo(t)>=120)return t;let r=[t],o=wo(t);for(let n of e){if(r.length-1>=4)break;let s=$l(n),i=wo(s);if(o+i>120){if(r.length===1){let a=120-o,c=mg(s,a);c.length>0&&(r.push(c),o+=wo(c));continue}continue}r.push(s),o+=i}return r.join(`
`)}});var iB=l(()=>{"use strict";Mt()});var kh=l(()=>{"use strict";fk();nB();sB();iB()});var mee,gee,yk,Sk=l(()=>{"use strict";kh();mee=e=>e.toLowerCase(),gee=(e,t)=>{let r=mee(e);return t.reduce((o,n)=>{let s=n.trim().toLowerCase();return s.length===0?o:r.includes(s)?o+1:o},0)},yk=e=>{let t=e.pitfalls.map(r=>({pitfall:r,score:gee(e.text,r.keywords)})).filter(r=>r.score>0).sort((r,o)=>o.score-r.score||r.pitfall.id.localeCompare(o.pitfall.id));return t.length===0?[]:t.slice(0,4).map(r=>r.pitfall)}});var aB,lB=l(()=>{"use strict";yd();Sk();aB=(e,t)=>{let r=es(e,{projectId:t.projectId,includeRetired:!1});return yk({pitfalls:r,text:t.text})}});var Ch,Eh,Lh,Rh,xh,Pd,cB=l(()=>{"use strict";Mt();Ch=Pe.symptom,Eh=Pe.cause,Lh=Pe.avoidance,Rh=64,xh="token-saver.db",Pd=1});var dB,Ad=l(()=>{"use strict";cB();dB=3e3});var uB,pB=l(()=>{"use strict";Ad();uB=`
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
`});var mB,gB,fB,fee,hee,hB,yB,SB=l(()=>{"use strict";mB=g(require("node:fs")),gB=g(require("node:path")),fB=require("node:sqlite");Ad();pB();fee=e=>{let t=e.prepare("SELECT value FROM pitfall_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},hee=(e,t)=>{e.prepare(`INSERT INTO pitfall_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},hB=e=>{mB.default.mkdirSync(gB.default.dirname(e),{recursive:!0});let t=new fB.DatabaseSync(e);return t.exec(`PRAGMA busy_timeout = ${dB}`),t.exec(uB),fee(t)<Pd&&hee(t,Pd),t},yB=e=>{e.close()}});var PB,AB,Pk=l(()=>{"use strict";dk();PB=(e,t,r,o)=>{let n=e.prepare(`INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(project_id, pitfall_id) DO UPDATE SET
         hit_count = pitfall_hits.hit_count + 1,
         last_seen_at = excluded.last_seen_at
       RETURNING hit_count, last_seen_at`).get(Kr(t),r,o);return{hitCount:n.hit_count,lastSeenAt:n.last_seen_at}},AB=(e,t,r)=>{let o=e.prepare(`SELECT hit_count, last_seen_at FROM pitfall_hits
       WHERE project_id = ? AND pitfall_id = ?`).get(Kr(t),r);return o===void 0?{hitCount:0,lastSeenAt:null}:{hitCount:o.hit_count,lastSeenAt:o.last_seen_at}}});var bB,_B=l(()=>{"use strict";gk();Pk();bB=(e,t)=>{let r=t.id.trim(),o=r.length===0?null:Th(e,{projectId:t.projectId,id:r});if(o===null)return{ok:!1,reason:"not_found"};let n=t.nowIso??new Date().toISOString(),s=PB(e,t.projectId,o.id,n);return{ok:!0,pitfall:{...o,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt}}}});var Ak,bk,_k=l(()=>{"use strict";Ak=g(require("node:path"));we();Ad();bk=e=>e.profileEmail!==null?Ak.default.join(e.installDir,xe,e.profileEmail,xh):Ak.default.join(e.installDir,xh)});var TB,wB=l(()=>{TB=[{id:"arch-max-lines",symptom:"ci:architecture fails at land (handler >100 / test >100 effective lines)",cause:"Max-effective-lines=100 only enforced late",avoidance:"Run `npm run ci:architecture` before tipping Arch",check:{kind:"command",value:"npm run ci:architecture"},keywords:["architecture","land","ci:architecture","max-effective","lines"],tags:["architecture","ci"]},{id:"symlink-node-modules",symptom:'Turbopack: "points out of the filesystem root"',cause:"Mac worktree with symlinked node_modules",avoidance:"APFS clone: `cp -Rc` (not symlink) into worktree",check:{kind:"id",value:"pit.symlink-node-modules"},keywords:["build","turbopack","symlink","node_modules","filesystem root"],tags:["build"]},{id:"install-bundle-clobber",symptom:"Missing/broken public/install/agent-witch/app/deps.tar.gz or agent-witch.js after build",cause:"Build overwrites install bundle artifacts",avoidance:"Restore those two paths after `build`",check:{kind:"command",value:"test -f public/install/agent-witch/app/deps.tar.gz && test -f public/install/agent-witch/app/agent-witch.js"},keywords:["build","deps.tar.gz","agent-witch.js","install bundle","clobber"],tags:["build","awi"]},{id:"stale-next",symptom:"Typecheck fails spuriously",cause:"Stale .next",avoidance:"`rm -rf .next` then typecheck",check:{kind:"id",value:"pit.stale-next"},keywords:["build","typecheck",".next","stale","turbopack"],tags:["build"]},{id:"main-moved-rebase",symptom:"FF/SHIP fails; main advanced",cause:"main moved between SHIP and FF",avoidance:"`git fetch`; pure-rebase onto new `-rN` branch; **never** force-push",check:{kind:"id",value:"pit.main-moved-rebase"},keywords:["ship","ff","push","rebase","main moved","force-push"],tags:["git"]},{id:"health-lag",symptom:"Declare done on exit 0 / HTTP 200 too early",cause:"Deploy health lags ~1\u20132 min after push",avoidance:"Poll until health `commitSha` == main tip + smoke",check:{kind:"id",value:"pf.health-matches-main"},keywords:["ship","ff","push","health","commitSha","deploy"],tags:["deploy"]},{id:"dirty-home-checkout",symptom:"Accidental reset/clean of ~/daily-magic",cause:"Home checkout left dirty",avoidance:"Use `/tmp` worktrees; never reset/clean home",check:{kind:"id",value:"pit.dirty-home-checkout"},keywords:["reset","clean","home checkout","daily-magic","worktree"],tags:["git"]},{id:"box-no-gh-auth",symptom:"Push from box fails",cause:"Box git has no GitHub auth",avoidance:"Push from the Mac",check:{kind:"id",value:"pit.box-no-gh-auth"},keywords:["ship","ff","push","box","github","auth"],tags:["git"]},{id:"ci-yml-main-only",symptom:"Expecting GH Actions on non-main push",cause:"Old ci.yml push trigger covered only main; CI being removed \u2014 gate is local suite",avoidance:"Run local `npm run ci` (or suite subset); do not wait on Actions",check:{kind:"id",value:"pit.local-suite-gate"},keywords:["ci","actions","github actions","npm run ci","main only"],tags:["ci"]},{id:"secrets-in-logs",symptom:"Secrets printed in logs/CLI",cause:"Verbose dump of env/files",avoidance:"Print existence / path / fingerprint only",check:{kind:"id",value:"pit.secrets-in-logs"},keywords:["secrets","logs","token","keypair","env","fingerprint"],tags:["secrets"]},{id:"no-prs-daily-magic",symptom:"PR windows opened in Mac Chrome",cause:"Habit from other repos",avoidance:"No PRs for daily-magic; never open PR UI",check:{kind:"id",value:"pit.no-prs"},keywords:["pr","pull request","chrome","daily-magic"],tags:["git"]}]});var See,Pee,wk,Tk=l(()=>{"use strict";wB();See=TB,Pee=e=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags??[],projectId:null,source:"seed",hitCount:0,lastSeenAt:null,severity:"warn"}),wk=()=>See.map(Pee)});var vB,kB=l(()=>{"use strict";Tk();hd();vB=e=>wk().reduce((r,o)=>Mi(e,null,o.id)!==null?r:(bh(e,o),r+1),0)});var CB,EB,LB=l(()=>{"use strict";Ad();CB=e=>e.id.trim().length===0?{kind:"empty_id"}:e.projectId.trim().length===0?{kind:"empty_project_id"}:e.symptom.length>Ch?{kind:"field_too_long",field:"symptom",max:Ch}:e.cause.length>Eh?{kind:"field_too_long",field:"cause",max:Eh}:e.avoidance.length>Lh?{kind:"field_too_long",field:"avoidance",max:Lh}:null,EB=e=>e.activeCountAfter>Rh?{kind:"active_cap",max:Rh}:null});var RB,xB=l(()=>{"use strict";hd();Pk();yd();wh();LB();RB=(e,t)=>{let r=CB(t);if(r!==null)return{ok:!1,error:r};let o=t.id.trim(),n=Mi(e,t.projectId,o),s=AB(e,t.projectId,o),i=t.source??"project",a={id:o,projectId:t.projectId,symptom:t.symptom,cause:t.cause,avoidance:t.avoidance,check:t.check,keywords:t.keywords,tags:t.tags??[],source:i,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt,severity:t.severity??n?.severity??"warn"},d=es(e,{projectId:t.projectId,includeRetired:!0}).filter(S=>S.id!==a.id),u=XU([...d,a]),m=EB({activeCountAfter:u});return m!==null?{ok:!1,error:m}:(bh(e,a),{ok:!0,pitfall:a})}});var vk,kk=l(()=>{"use strict";gk();yd();lB();SB();_B();_k();kB();xB();vk=e=>{let t=e.dbPath??(e.layout!==void 0?bk(e.layout):(()=>{throw new Error("createPitfallRegistry requires dbPath or layout")})()),r=hB(t);return vB(r),{dbPath:t,listPitfalls:o=>YU(r,o),getPitfall:o=>Th(r,o),upsertPitfall:o=>RB(r,o),recordHit:o=>bB(r,o),matchPitfalls:o=>aB(r,o),close:()=>yB(r)}}});var Aee,bee,Ck,Ek=l(()=>{"use strict";kh();pk();Aee=(e,t,r)=>{let o=t.projectId?.trim();return o!==void 0&&o.length>0?o:r===null||e.resolveProjectId===void 0?null:e.resolveProjectId(r)},bee=(e,t,r,o)=>{for(let n of o)try{t.recordHit({projectId:r,id:n.id})}catch(s){e.logError?.(s)}},Ck=(e,t)=>{try{let r=t.cwd?.trim()??"",o=r.length>0?r:null;if(o!==null&&e.isDeclined?.(o)===!0)return{status:"none"};let n=Aee(e,t,o);if(n===null||e.registry===null)return{status:"none",promptCreate:o!==null};let s=e.registry.matchPitfalls({projectId:n,text:t.message??""});if(s.length===0)return{status:"miss",projectId:n};bee(e,e.registry,n,s);let i=_h(s);return{status:"hit",projectId:n,pitfalls:i,tip:hk(i)}}catch(r){return e.logError?.(r),{status:"none"}}}});var Lk,WB=l(()=>{"use strict";kh();Lk={name:Ni.name,description:Ni.description,inputSchema:Ni.inputSchema}});var rs,IB,bd,_ee,Wh,_d=l(()=>{"use strict";rs=g(require("node:fs")),IB=g(require("node:os")),bd=()=>({readUtf8:e=>rs.default.readFileSync(e,"utf8"),writeUtf8:(e,t)=>{rs.default.writeFileSync(e,t,"utf8")},exists:e=>rs.default.existsSync(e),mkdirp:e=>{rs.default.mkdirSync(e,{recursive:!0})},rename:(e,t)=>{rs.default.renameSync(e,t)},realpath:e=>rs.default.realpathSync.native(e)}),_ee=()=>({homedir:()=>IB.default.homedir()}),Wh=()=>({...bd(),..._ee()})});var OB,MB=l(()=>{"use strict";OB=(e,t)=>{let r=e.trim();if(r.length===0)return r;try{return t.exists(r)?t.realpath(r):r}catch{return r}}});var os,ji,Di,NB,jB,DB,zB,$B,FB,Rk,wd,Ih,Oh,xk,Sr=l(()=>{"use strict";os="agent-witch-token-saver",ji=`# BEGIN ${os}`,Di=`# END ${os}`,NB=`<!-- BEGIN ${os} -->`,jB=`<!-- END ${os} -->`,DB=".cursor/mcp.json",zB=".codex/config.toml",$B=".codex/AGENTS.md",FB=".claude/settings.json",Rk="declined-projects.json",wd="agent-witch",Ih="agent-witch",Oh=["mcp"],xk="agent-witch mcp-hook check_context"});var Wk,HB,UB=l(()=>{"use strict";Wk=g(require("node:path"));we();Sr();HB=e=>e.profileEmail!==null?Wk.default.join(e.installDir,xe,e.profileEmail,Rk):Wk.default.join(e.installDir,Rk)});var BB,Tt,Jr=l(()=>{"use strict";BB=g(require("node:path")),Tt=e=>{let{fs:t,filePath:r,contents:o}=e;t.mkdirp(BB.default.dirname(r));let n;e.backup===!0&&t.exists(r)&&(n=`${r}.aw-bak.${new Date().toISOString().replaceAll(":","-")}`,t.writeUtf8(n,t.readUtf8(r)));let s=`${r}.aw-tmp`;return t.writeUtf8(s,o),t.rename(s,r),n!==void 0?{backupPath:n}:{}}});var Mh,wee,GB,Nh,jh=l(()=>{"use strict";_d();MB();UB();Jr();Mh=()=>({byRealpath:{}}),wee=e=>{try{let t=JSON.parse(e);if(typeof t!="object"||t===null)return Mh();let r=t.byRealpath;return typeof r!="object"||r===null?Mh():{byRealpath:r}}catch{return Mh()}},GB=(e,t=bd())=>{let r=HB(e);return t.exists(r)?wee(t.readUtf8(r)):Mh()},Nh=e=>{let t=e.fs??bd(),r=OB(e.cwd,t);return GB(e.layout,t).byRealpath[r]!==void 0}});var zo,Dh,Ik=l(()=>{"use strict";zo=(e,t)=>{let r=e[t];if(typeof r!="string")return;let o=r.trim();return o.length>0?o:void 0},Dh=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return{};let t=e;return{...zo(t,"cwd")!==void 0?{cwd:zo(t,"cwd")}:{},...zo(t,"message")!==void 0?{message:zo(t,"message")}:{},...zo(t,"sessionId")!==void 0?{sessionId:zo(t,"sessionId")}:{},...zo(t,"projectId")!==void 0?{projectId:zo(t,"projectId")}:{}}}});var Td,Ok=l(()=>{"use strict";Nt();Ek();kk();jh();Ik();Td=e=>{let t=e.logError??(o=>{let n=o instanceof Error?o.message:String(o);console.error(`[agent-witch] check_context: ${n}`)}),r=e.isDeclined??(o=>Nh({layout:e.layout,cwd:o}));return o=>{let n=Dh(o),s=null;try{return s=vk({layout:e.layout}),Ck({registry:s,resolveProjectId:Nb,isDeclined:r,logError:t},n)}catch(i){return t(i),{status:"none"}}finally{s?.close()}}}});var Tee,Mk,VB=l(()=>{"use strict";Ok();Ik();Tee="/api/local/check-context",Mk=async e=>{if(e.pathname!==Tee)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t={};try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{return e.sendJson(e.response,400,{status:"none"}),!0}let r=Td({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,r(Dh(t))),!0}});var qB,zh,vee,kee,KB,JB=l(()=>{"use strict";qB=g(require("node:path"));Sr();Jr();zh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vee={hooks:[{type:"command",command:xk,timeout:3,[os]:!0}]},kee=e=>Array.isArray(e)&&e.some(t=>zh(t)&&Array.isArray(t.hooks)&&t.hooks.some(r=>zh(r)&&(r.command===xk||r[os]===!0))),KB=e=>{let t=qB.default.join(e.io.homedir(),FB),r={};if(e.io.exists(t))try{let a=JSON.parse(e.io.readUtf8(t));zh(a)&&(r={...a})}catch{r={}}let o=zh(r.hooks)?{...r.hooks}:{},n=o.UserPromptSubmit;if(kee(n))return{ok:!0,path:t,wrote:!1};let s=Array.isArray(n)?[...n]:[];s.push(vee),o.UserPromptSubmit=s;let{backupPath:i}=Tt({fs:e.io,filePath:t,contents:`${JSON.stringify({...r,hooks:o},null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:i}}});var vd,$h=l(()=>{"use strict";Sr();vd=e=>{let t=e.begin??ji,r=e.end??Di,o=`${t}
${e.blockBody.trimEnd()}
${r}
`,n=e.existing.indexOf(t);if(n<0){let u=`${e.existing.length===0||e.existing.endsWith(`
`)?e.existing:`${e.existing}
`}${o}`;return{next:u,changed:u!==e.existing}}let s=e.existing.indexOf(r,n);if(s<0){let d=`${e.existing.slice(0,n)}${o}`;return{next:d,changed:d!==e.existing}}let i=s+r.length,a=e.existing.slice(i).replace(/^\n/,""),c=`${e.existing.slice(0,n)}${o}${a}`;return{next:c,changed:c!==e.existing}}});var XB,Cee,YB,ZB=l(()=>{"use strict";XB=g(require("node:path"));$h();Sr();Jr();Cee=["On the first user message of a session, call the Agent Witch MCP tool","`check_context` with the current cwd.","If status is miss or none (declined), stay silent. If hit, follow the tip."].join(`
`),YB=e=>{let t=XB.default.join(e.io.homedir(),$B),r=e.io.exists(t)?e.io.readUtf8(t):"",{next:o,changed:n}=vd({existing:r,blockBody:Cee,begin:ji,end:Di});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=Tt({fs:e.io,filePath:t,contents:o,backup:r.length>0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var QB,eG,tG=l(()=>{"use strict";QB=g(require("node:path"));$h();Sr();Jr();eG=e=>{let t=QB.default.join(e.io.homedir(),zB),r=Oh.map(c=>`"${c}"`).join(", "),o=[`[mcp_servers.${wd}]`,`command = "${Ih}"`,`args = [${r}]`].join(`
`),n=e.io.exists(t)?e.io.readUtf8(t):"",{next:s,changed:i}=vd({existing:n,blockBody:o,begin:ji,end:Di});if(!i)return{ok:!0,path:t,wrote:!1};let{backupPath:a}=Tt({fs:e.io,filePath:t,contents:s,backup:n.length>0});return{ok:!0,path:t,wrote:!0,backupPath:a}}});var rG,Nk,oG,nG=l(()=>{"use strict";rG=g(require("node:path"));Sr();Jr();Nk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),oG=e=>{let t=rG.default.join(e.io.homedir(),DB),r={command:Ih,args:[...Oh]},o={};if(e.io.exists(t))try{let d=JSON.parse(e.io.readUtf8(t));Nk(d)&&(o={...d})}catch{o={}}let n=Nk(o.mcpServers)?{...o.mcpServers}:{},s=n[wd];if(Nk(s)&&s.command===r.command&&Array.isArray(s.args)&&JSON.stringify(s.args)===JSON.stringify(r.args))return{ok:!0,path:t,wrote:!1};n[wd]=r;let a={...o,mcpServers:n},{backupPath:c}=Tt({fs:e.io,filePath:t,contents:`${JSON.stringify(a,null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:c}}});var Fh,jk=l(()=>{"use strict";_d();JB();ZB();tG();nG();Fh=e=>{let t=e?.io??Wh();return{ok:!0,cursorMcp:oG({io:t}),codexConfig:eG({io:t}),codexAgents:YB({io:t}),claudeHook:KB({io:t})}}});var sG=l(()=>{"use strict";Sr()});var iG=l(()=>{"use strict";sG();Sr();$h();Jr()});var aG=l(()=>{"use strict";Jr()});var Dk=l(()=>{"use strict";Sr();iG();aG()});var zk=l(()=>{"use strict"});var lG=l(()=>{"use strict";zk()});var cG=l(()=>{"use strict";zk();lG()});var dG,UFe,uG=l(()=>{"use strict";dG=g(require("node:path"));cG();Jr();UFe=dG.default.join(".agent-witch","token-saver.json")});var $k=l(()=>{"use strict"});var pG=l(()=>{"use strict";uG();_d();jh();$k();jk();Dk()});var Fk=l(()=>{"use strict";kk();_k();Sk();wh();Tk();Ek();WB();Ok();VB();jk();Dk();pG();jh();$k();_d()});var Hk,Uk,Bk=l(()=>{"use strict";Hk="2025-03-26",Uk={name:"agent-witch",version:"1.0.0"}});var zi,Hh,mG,Dee,kd,gG=l(()=>{"use strict";Bk();zi=(e,t,r)=>({jsonrpc:"2.0",id:e??null,error:{code:t,message:r}}),Hh=(e,t)=>({jsonrpc:"2.0",id:e??null,result:t}),mG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?e:null,Dee=async(e,t,r,o)=>{let n=t?.name;if(typeof n!="string")return zi(e,-32602,"tool name is required");let s=r.tools.find(i=>i.definition.name===n);if(s===void 0)return zi(e,-32602,`Unknown tool: ${n}`);try{let i=await s.call(t?.arguments??{},o);return Hh(e,i)}catch(i){let a=i instanceof Error?i.message:String(i);return zi(e,-32603,`Tool ${n} failed: ${a}`)}},kd=async(e,t,r)=>{let o=mG(e);if(o===null)return zi(null,-32700,"Parse error");let n=o.id??null,s=o.method;return typeof s!="string"?zi(n,-32600,"Invalid Request"):s==="initialize"?Hh(n,{protocolVersion:Hk,capabilities:{tools:{listChanged:!1}},serverInfo:t.serverInfo}):s==="ping"||s==="notifications/initialized"?Hh(n,{}):s==="tools/list"?Hh(n,{tools:t.tools.map(i=>i.definition)}):s==="tools/call"?Dee(n,mG(o.params),t,r):zi(n,-32601,"Method not found")}});var Gk,fG=l(()=>{"use strict";Gk=(e,t)=>({content:[{type:"text",text:e}],...t===!0?{isError:!0}:{}})});var Uh=l(()=>{"use strict";gG();fG();Bk()});var $i,Bh=l(()=>{"use strict";Fk();Uh();$i=e=>{let t=Td({layout:e.layout,isDeclined:e.isDeclined});return{serverInfo:Uk,tools:[{definition:Lk,call:r=>Gk(JSON.stringify(t(r)))}]}}});var hG,zee,$ee,yG,SG=l(()=>{"use strict";Uh();Bh();hG=(e,t)=>{let r=JSON.stringify(t);e.write(`Content-Length: ${Buffer.byteLength(r,"utf8")}\r
\r
${r}`)},zee=async(e,t)=>{let r=Buffer.alloc(0);for await(let o of e.stdin)for(r=Buffer.concat([r,Buffer.isBuffer(o)?o:Buffer.from(String(o),"utf8")]);;){let n=r.indexOf(`\r
\r
`);if(n<0)break;let s=r.subarray(0,n).toString("utf8"),i=/Content-Length:\s*(\d+)/i.exec(s);if(i===null){r=r.subarray(n+4);continue}let a=Number.parseInt(i[1]??"0",10),c=n+4+a;if(r.length<c)break;let d=r.subarray(n+4,c).toString("utf8");r=r.subarray(c);let u;try{u=JSON.parse(d)}catch{u=null}await t(u)}},$ee=async(e,t)=>{await zee(t,async r=>{let o=typeof r=="object"&&r!==null?r:null,n=o?.method,s=await kd(r,e,void 0);if(typeof n=="string"&&n.startsWith("notifications/")){o?.id!==void 0&&hG(t.stdout,s);return}hG(t.stdout,s)})},yG=async e=>{await $ee($i({layout:e.layout}),{stdin:process.stdin,stdout:process.stdout})}});var Fee,Gh,PG=l(()=>{"use strict";Uh();Bh();Fee="/mcp",Gh=async e=>{if(e.pathname!==Fee)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t=null;try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{t=null}let r=e.server??$i({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,await kd(t,r,void 0)),!0}});var AG={};St(AG,{createAwlMcpServer:()=>$i,runAwlMcpStdio:()=>yG,tryHandleAwlMcpHttpRequest:()=>Gh});var Vk=l(()=>{"use strict";Bh();SG();PG()});var ns,Cd,Hee,Uee,Bee,Gee,bG,_G=l(()=>{"use strict";ns=g(require("node:fs")),Cd=g(require("node:path")),Hee="prompt-optimizer-cycles.json",Uee="prompt-optimizer-preferences.json",Bee="prompt-sdlc-cycles.json",Gee="prompt-sdlc-preferences.json",bG=e=>{let t=Cd.default.join(e,Hee),r=Cd.default.join(e,Bee);if(ns.default.existsSync(t)||!ns.default.existsSync(r))return t;try{ns.default.renameSync(r,t)}catch{return r}let o=Cd.default.join(e,Gee),n=Cd.default.join(e,Uee);if(ns.default.existsSync(o)&&!ns.default.existsSync(n))try{ns.default.renameSync(o,n)}catch{}return t}});var Fi,Vee,qk,wG=l(()=>{"use strict";Fi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Vee=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],qk=e=>{let t=Vee.map(i=>`<option value="${Fi(i.value)}">${Fi(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Fi(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Fi(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Fi(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Fi(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Ed,kG,qee,CG,Kee,Jee,EG,qh,TG,vG,Xee,Yee,Xr,Ld,Vh,Zee,Kh,Kk,Qee,Jk,LG,Xk,RG,ete,tte,rte,xG,WG,IG,Rd=l(()=>{"use strict";Ed=g(require("node:fs")),kG=g(require("node:path")),qee="estimate-history.ndjson",CG=100,Kee=500,Jee=2e4,EG=e=>kG.default.join(e,qee),qh=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,Kee),TG=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,Jee),vG=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,Xee=e=>({...e,estimateTokens:vG(e.estimateTokens),actualTokens:vG(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),Yee=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Xr=e=>{let t=EG(e);return Ed.default.existsSync(t)?Ed.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return Yee(n)?[Xee(n)]:[]}catch{return[]}}):[]},Ld=(e,t)=>{Ed.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Ed.default.writeFileSync(EG(e),r,"utf8")},Vh=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),Zee=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${Vh(o.task)} | ${Vh(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},Kh=e=>{let t=Xr(e.reportsDir),r=qh(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ld(e.reportsDir,[...s,n])},Kk=e=>{let t=Xr(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?qh(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Ld(e.reportsDir,[...i,s])},Qee=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-CG),Jk=e=>[...Xr(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),LG=e=>{let t=Xr(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=TG(e.input),n=TG(e.output),s=qh(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Ld(e.reportsDir,[...c,a])},Xk=(e,t)=>{let r=Xr(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},RG=e=>({table:Zee(Qee(Xr(e))),embedding:null}),ete=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},tte=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-CG),rte=e=>{let t=ete(tte(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${Vh(s.task)} | ${Vh(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},xG=e=>{let t=Xr(e.reportsDir),r=qh(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ld(e.reportsDir,[...s,n])},WG=e=>{let t=Xr(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ld(e.reportsDir,[...s,n])},IG=e=>rte(Xr(e))});var OG=l(()=>{"use strict";Rd()});var Yr,Yk,ote,Zk,nte,ste,Jh,Xh,ite,Qk,MG=l(()=>{"use strict";OG();ov();Yr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Yk=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},ote=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${Yk(-r)} under`:`${Yk(r)} over`},Zk=e=>e.toLocaleString("en-US"),nte=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${Zk(-r)} under`:`${Zk(r)} over`},ste=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},Jh=e=>e===null?"\u2014":Yk(e),Xh=e=>e===null?"\u2014":Zk(e),ite=`(function () {
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
})();`,Qk=e=>{let r=Jk(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":ote(n.estimateSeconds,n.actualSeconds),u=n.estimateTokens===null||n.actualTokens===null?"no estimate":nte(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${Yr(ste(i))}</button></td>
        <td>${Yr(c)}</td>
        <td>${Jh(n.estimateSeconds)}</td>
        <td>${Jh(n.actualSeconds)}</td>
        <td>${Yr(d)}</td>
        <td>${Xh(n.estimateTokens)}</td>
        <td>${Xh(n.actualTokens)}</td>
        <td>${Yr(u)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${Yr(c)}</p>
        <h2>Input</h2>
        <pre>${Yr(i)}</pre>
        <h2>Output</h2>
        <pre>${Yr(a)}</pre>
        <p>Time: estimated ${Jh(n.estimateSeconds)} \xB7 actual ${Jh(n.actualSeconds)} \xB7 ${Yr(d)}</p>
        <p>Tokens: estimated ${Xh(n.estimateTokens)} \xB7 actual ${Xh(n.actualTokens)} \xB7 ${Yr(u)}</p>
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
            ${Cf({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${ite}</script>`}
    </section>`}});var NG=l(()=>{"use strict";wG();MG()});var Hi,ate,lte,eC,jG=l(()=>{"use strict";Hi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ate=(e,t,r)=>{let o=Hi(t),n=Hi(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},lte=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${Hi(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>ate(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${Hi(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${Hi(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${Hi(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},eC=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(lte).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var DG=l(()=>{"use strict";jG()});var xd,zG,$G,tC,rC,oC,FG=l(()=>{"use strict";xd=g(require("node:fs")),zG=g(require("node:path"));dc();Gg();$G=(e,t,r)=>ai({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,tC=(e,t,r)=>{let o=$G(e,t,r);if(o===null)return[];if(!xd.default.existsSync(o))return[];let n=xd.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},rC=e=>{let t=$G(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Mr(e.entry.prompt),output:Mr(e.entry.output)};xd.default.mkdirSync(zG.default.dirname(t),{recursive:!0}),xd.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},oC=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var cte,dte,Wd,Yh,nC=l(()=>{"use strict";cte=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),dte=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Wd=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=cte(i.assistantOutput),d=c.length>0?`Assistant: ${dte(c,t)}`:null,u=[a,d].filter(m=>m!==null).join(`

`);if(u.length!==0){if(n+u.length>r&&o.length>0)break;o.unshift(u),n+=u.length}}return o.join(`

`)},Yh=e=>{let t=e.userMessage.trim(),r=Wd({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Pr,Id,aC,ute,pte,sC,mte,lC,Zh,HG,UG,gte,Ui,cC,iC,BG,fte,GG,Bi,Qh,Od,hte,Md,dC,ey,ty,VG=l(()=>{"use strict";Pr=g(require("node:fs")),Id=g(require("node:path")),aC=require("node:crypto");nC();ute="writer-sessions",pte="active-index.json",sC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mte=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",lC=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},Zh=e=>{let t=Id.default.join(e.installDir,ute);return Pr.default.mkdirSync(t,{recursive:!0}),t},HG=e=>Id.default.join(Zh(e),pte),UG=(e,t)=>Id.default.join(Zh(e),`${t}.canonical.json`),gte=(e,t)=>Id.default.join(Zh(e),`${t}.continuation.json`),Ui=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,cC=e=>{let t=HG(e);if(!Pr.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Pr.default.readFileSync(t,"utf8"));if(!sC(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!sC(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!mte(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},iC=(e,t)=>{Pr.default.writeFileSync(HG(e),JSON.stringify(t,null,2))},BG=(e,t)=>{Pr.default.writeFileSync(UG(e,t.sessionId),JSON.stringify(t,null,2))},fte=(e,t)=>{Pr.default.writeFileSync(gte(e,t.sessionId),JSON.stringify(t,null,2))},GG=(e,t)=>{let r=Wd({turns:t.turns});fte(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Bi=(e,t)=>{let r=UG(e,t);if(!Pr.default.existsSync(r))return null;try{let o=JSON.parse(Pr.default.readFileSync(r,"utf8"));return!sC(o)||typeof o.sessionId!="string"?null:o}catch{return null}},Qh=(e,t=20)=>{let r=Zh(e),o=Pr.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Bi(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Od=(e,t,r)=>{let o=lC(r);return cC(e).entries.find(i=>Ui(i)===Ui({writerAgent:t,projectFolderPath:o}))?.sessionId??null},hte=(e,t,r,o)=>{let n=cC(e),s=Ui({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>Ui(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];iC(e,{entries:i})},Md=(e,t,r)=>{let o=(0,aC.randomUUID)(),n=new Date().toISOString(),s=lC(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return BG(e,i),GG(e,i),hte(e,t,s,o),o},dC=(e,t,r)=>{let o=Od(e,t,r);return o!==null?o:Md(e,t,r)},ey=(e,t,r)=>{let o=lC(r),n=cC(e);if(o===null&&r===void 0){iC(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=Ui({writerAgent:t,projectFolderPath:o});iC(e,{entries:n.entries.filter(i=>Ui(i)!==s)})},ty=e=>{let t=dC(e.layout,e.writerAgent,e.projectFolderPath),r=Bi(e.layout,t);if(r===null)return;let o={id:(0,aC.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};BG(e.layout,n),GG(e.layout,n)}});var yte,Ste,ry,uC,qG=l(()=>{"use strict";yte=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",Ste=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},ry=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",uC=e=>{let t=ry(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=yte(r,e.userPromptCharacterCount),n=Ste({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var oy=l(()=>{"use strict";FG();VG();nC();qG()});var KG=l(()=>{"use strict";wm();Fs();vA()});var JG=l(()=>{"use strict";QP()});var ot,Ate,bte,pC,mC,gC,XG=l(()=>{"use strict";KG();JG();ot=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ate=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},bte=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=gl(o);return`value="${ot(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${ot(r)}"`},pC=(e,t,r,o,n)=>{let s=Tm[t];return`<label class="field">
          <span class="field-label">${ot(o)} API key \u2014 ${ot(Ate(e,t))} \xB7 <a class="field-link" href="${ot(s.href)}" target="_blank" rel="noopener noreferrer">${ot(s.label)}</a></span>
          <input class="input mono" type="password" name="${ot(r)}" autocomplete="off" ${bte(e,t,n)} />
        </label>`},mC=(e,t,r,o)=>{let n=fm(e[t]?.model),s=new Set(gm[t].map(c=>c.value)),i=gm[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${ot(c.value)}"${d}>${ot(c.label)}</option>`}).join(""),a=n!==hn&&!s.has(n)?`<option value="${ot(n)}" selected>${ot(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${ot(o)}</span>
          <select class="input mono" name="${ot(r)}">${i}${a}</select>
        </label>`},gC=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${ot(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${pC(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${mC(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${pC(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${mC(e.secrets,"openai","openaiModel","OpenAI model")}
        ${pC(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${mC(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var YG=l(()=>{"use strict";XG()});var ny,ZG,QG=l(()=>{"use strict";ny=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ZG=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${ny(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${ny(s.name)}</strong> <span class="muted mono">(${ny(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${ny(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var _te,e2,t2,r2=l(()=>{"use strict";_te=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,e2=e=>e.kind==="folder",t2=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&e2(d)){s=d;continue}let u={kind:"folder",name:a,children:new Map};s.children.set(a,u),s=u}}let r=o=>{let n=[];for(let s of o.children.values()){if(e2(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(_te)};return r(t)}});var o2,fC,n2=l(()=>{"use strict";o2=g(require("node:path")),fC=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${fC(r.children,t)}</ul>
            </details>
          </li>`;let o=o2.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var s2,$o,wte,Tte,Nd,vte,hC,i2=l(()=>{"use strict";Xg();s2=g(require("node:path"));QG();r2();n2();$o=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wte=()=>`(() => {
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

})();`,Tte=()=>`(() => {
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
})();`,Nd=e=>{let t=fc({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=ZG({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${$o(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${$o(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':vte(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${$o(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${$o(s)}" />
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
    <script>${wte()}</script>
    <script>${Tte()}</script>`;return`${t}${r}${o}${c}${d}`},vte=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=t2(a.items.map(S=>({...S,relativePath:typeof S.relativePath=="string"&&S.relativePath.length>0?S.relativePath:s2.default.relative(a.sourceRoot,S.sourcePath).replaceAll("\\","/")}))),u=fC(d,$o),m=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${$o(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${$o(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${m} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${u}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${$o(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},hC=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=a.trim();Number.isFinite(d)&&u.length>0&&n.set(d,u)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??u??a,S=t.sets[i];if(S===void 0)continue;let f=a.length>0?a:S.proposedSlug,y=m.length>0?m:S.proposedName,p=r.has(i),P=S.items.map(w=>({id:w.id,kind:w.kind,title:w.title,sourcePath:w.sourcePath,include:p}));s.push({slug:f,name:y,items:P})}return s}});var a2=l(()=>{"use strict";i2()});var kte,yC,l2=l(()=>{"use strict";ar();kte=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[be]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},yC=kte});var Cte,c2,d2=l(()=>{"use strict";ar();Cte=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[be]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},c2=Cte});var Ete,Lte,u2,Rte,xte,SC,p2=l(()=>{"use strict";Mt();ar();Ete=1e4,Lte=15e3,u2=(e,t,r)=>{let o=`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/pitfalls`;return r===void 0?o:`${o}/${encodeURIComponent(r)}`},Rte=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return t.errorMessage==="limit_exceeded"||t.code==="limit_exceeded"},xte=(e,t=fetch)=>({listPitfalls:async(r,o)=>{try{let n=new URL(u2(e.appOrigin,r));n.searchParams.set("includeRetired",o.includeRetired?"1":"0");let s=await t(n.toString(),{method:"GET",headers:{[be]:e.pairingToken},signal:AbortSignal.timeout(Ete)});if(!s.ok)return{ok:!1,reason:"unavailable"};let i=Ub(await s.json());return i===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:i.items,syncedAt:i.syncedAt}}catch{return{ok:!1,reason:"unavailable"}}},upsertPitfall:async(r,o)=>{try{let n=await t(u2(e.appOrigin,r),{method:"PUT",headers:{[be]:e.pairingToken,"content-type":"application/json"},body:JSON.stringify(o),signal:AbortSignal.timeout(Lte)});if(n.ok)return{ok:!0};if(n.status===409){let s=await n.json().catch(()=>null);return{ok:!1,reason:Rte(s)?"active_limit":"rejected"}}return n.status===400?{ok:!1,reason:"rejected"}:{ok:!1,reason:n.status>=500?"unavailable":"rejected"}}catch{return{ok:!1,reason:"unavailable"}}}}),SC=xte});var m2,Wte,g2,f2=l(()=>{"use strict";m2={saved:{message:"Pitfall saved.",error:null},retired:{message:"Pitfall retired. Turn on Show retired to see it again.",error:null},restored:{message:"Pitfall is active again.",error:null},invalid:{message:null,error:"Add a title, why it happens, and a fix. Keep them short, then save again."},limit:{message:null,error:"This project has 64 active pitfalls. Retire one, then try again."},missing:{message:null,error:"That pitfall is gone. Reload the page and try again."},rejected:{message:null,error:"Agent Witch Cloud did not accept this change. Check the fields and try again."},unavailable:{message:null,error:"Could not reach Agent Witch Cloud. Check this Mac on Status, then try again."}},Wte=e=>e!==null&&Object.prototype.hasOwnProperty.call(m2,e)?m2[e]:null,g2=Wte});var h2=l(()=>{"use strict"});var ss,Ite,PC,y2=l(()=>{"use strict";Xg();jb();ss=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ite=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,PC=e=>{let t=e.flashError?`<div class="alert-error">${ss(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${ss(e.flashMessage)}</div>`:"",r=fc({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${ss(Ite(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,u=`<a class="btn btn-secondary btn-compact" href="${ss(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=pg(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
                  <input type="hidden" name="projectId" value="${ss(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${ss(n.name)}</strong>
                  <span class="muted mono">${ss(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${u}${m}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then pull playbooks into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var S2=l(()=>{"use strict";h2();gg();y2()});var sy,P2=l(()=>{"use strict";sy=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var A2,qt,AC=l(()=>{"use strict";A2=g(require("node:path"));Pt();we();V();le();wb();qt=e=>{let t=$()?.layout.installDir??E();if(A2.default.basename(t)===Jt)return ct;let r=$(),o=r!==null?We(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):ct}});var bC,b2=l(()=>{"use strict";tr();AC();bC=async e=>{let t=Ue(e.installDir),r=t?.bundleVersion??null,o=qt(t);try{let n=await Os(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:an(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var _C,_2=l(()=>{"use strict";_C=e=>!e});var wC,Gi,TC=l(()=>{"use strict";V();wC=()=>`http://127.0.0.1:${Ts()}/update/run`,Gi=async e=>{try{let t=await fetch(wC(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Ote,w2,vC,T2=l(()=>{"use strict";V();re();TC();Ote=()=>{vr({launchAgentLabel:he(),installDir:E()})},w2=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},vC=async()=>{Ote();let e=await Gi({force:!0});if(e.ok)return{ok:!0,message:w2(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:w2(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(tr(),NW)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var kC=l(()=>{"use strict";$w();P2();AC();b2();_2();T2();TC()});var v2,k2=l(()=>{"use strict";v2=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var C2,E2,CC,EC,L2=l(()=>{"use strict";C2=require("node:crypto"),E2=g(require("node:fs"));Nt();le();le();k2();CC=!1,EC=async e=>{if(CC)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!v2(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=X({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&E2.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,C2.randomUUID)();CC=!0;try{if(await Tb(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Us({...r,workspace:n},e.writerAgent,t);return await Nl(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{CC=!1}}});var R2=l(()=>{"use strict";L2()});var vt,Mte,x2,W2,LC,RC,xC,WC,IC,OC,MC=l(()=>{"use strict";vt=require("node:crypto"),Mte=Buffer.from("302a300506032b6570032100","hex"),x2=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},W2=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,vt.createPublicKey)({key:Buffer.concat([Mte,t]),format:"der",type:"spki"})},LC=()=>{let{publicKey:e,privateKey:t}=(0,vt.generateKeyPairSync)("ed25519");return{publicKeyRaw:x2(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},RC=e=>(0,vt.createPrivateKey)(e),xC=(e,t)=>(0,vt.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),WC=(e,t,r)=>{try{let o=W2(e);return(0,vt.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},IC=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,OC=()=>(0,vt.randomBytes)(32).toString("base64url")});var Zr,iy,I2,Nte,jte,ay,NC,jC,O2=l(()=>{"use strict";Zr=g(require("node:fs")),iy=g(require("node:path"));MC();V();we();I2=e=>iy.default.join(e.installDir,io),Nte=(e,t)=>{if(e.profileEmail===null||t===I2(e)||Zr.default.existsSync(t))return;let r=I2(e);Zr.default.existsSync(r)&&(Zr.default.mkdirSync(iy.default.dirname(t),{recursive:!0}),Zr.default.renameSync(r,t))},jte=e=>{if(!Zr.default.existsSync(e))return null;try{let t=Zr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},ay=e=>{let t=Ta(e);Nte(e,t);let r=jte(t);if(r!==null)return r;let o=LC();return Zr.default.mkdirSync(iy.default.dirname(t),{recursive:!0}),Zr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},NC=e=>{let t=ay(e.layout),r=OC(),o=IC({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=RC(t.privateKeyPem),s=xC(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},jC=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return WC(e.serverPublicKey,t,e.serverAttestation)}});var DC=l(()=>{"use strict";O2();MC()});var M2,N2,j2=l(()=>{"use strict";M2=g(require("node:path")),N2=e=>({osUid:typeof e.uid=="number"&&Number.isInteger(e.uid)&&e.uid>=0?e.uid:null,installRootName:M2.default.basename(e.installDir)})});var F2,Dd,FC,HC,D2,Dte,zC,jd,fe,H2,zte,$C,$te,Fte,UC,ge,Le,nt,Hte,z2,$2,zd,$d,U2=l(()=>{"use strict";F2=g(require("node:http")),Dd=g(require("node:fs")),FC=g(require("node:path"));ly();ac();aj();cj();fj();gn();fw();Dw();Hj();Bj();qU();Fk();Vk();_G();NG();DG();oy();YG();a2();Ao();Nt();ar();l2();d2();p2();qb();f2();S2();kC();tr();R2();le();DC();j2();HC=e=>ow(e)??"never",D2=48e3,Dte=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,zC=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Qm(),reveal:t.reveal,installed:ir(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),jd=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:bo(t,e)},fe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),H2=200,zte=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',$C=e=>{let t=e.trim().slice(0,H2),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},$te=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${fe(t)}</div>`,Fte=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${fe(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',UC={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},ge=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...UC}),e.end(JSON.stringify(r))},Le=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},nt=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},Hte=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=zte(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${fe(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=_C(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${lc(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${fe(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${fe(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${fe(HC(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${fe(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},z2=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},$2=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,H2)},zd=e=>{let t=FC.default.join(e.layout.installDir,"link-code.txt"),r=()=>Ue(e.layout.installDir),o=()=>{let f=r();return{installBundleVersion:sy(f),installBundleUpdatedAt:f?.updatedAt??null,installVersion:f}},n=async f=>{let y=f.installVersion??r(),p=await i(),P=Bw(p),w=f.updateFlash??null,h=Gw(w),A=$te(w,f.updateError??null);return Hw({title:f.title,activePath:f.activePath,body:f.body,cloudAppOrigin:qt(y),installBundleVersionLabel:sy(y),prependBody:`${h}${A}${P}`,headerUpdateButtonHtml:Uw(p)})},s=null,i=async()=>{let f=Date.now();if(s!==null&&f-s.cachedAtMs<6e4)return s.offer;let y=await bC(e.layout);return s={cachedAtMs:f,offer:y},y},a=()=>{s=null},c=!1,d=async f=>{if(a(),!(await i()).updateAvailable){f.writeHead(303,{Location:"/?update=ok"}),f.end();return}if(c){f.writeHead(303,{Location:$C("An update is already running.")}),f.end();return}c=!0;try{let p=await vC(),P=p.ok?"/?update=ok":$C(p.message);f.writeHead(303,{Location:P}),f.end()}catch(p){let P=p instanceof Error&&p.message.trim().length>0?p.message:"Install bundle update failed.";f.writeHead(303,{Location:$C(P)}),f.end()}finally{c=!1,a()}},u=async(f,y)=>{let p=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",P=o(),w=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:P.installVersion,body:`<section class="card">
      <h1>${fe(y)}</h1>
      <p>${fe(p)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});f.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),f.end(w)},m=()=>{if(Dd.default.existsSync(t))return Dd.default.readFileSync(t,"utf8").trim();let f=Math.random().toString(36).slice(2,8).toUpperCase();return Dd.default.writeFileSync(t,f,"utf8"),f},S=F2.default.createServer((f,y)=>{(async()=>{let p=f.url?.split("?")[0]??"/",P=f.method??"GET";if(P==="OPTIONS"){y.writeHead(204,UC),y.end();return}if(await lk({method:P,pathname:p,request:f,response:y,requestUrl:f.url??"/",storePath:bG(FC.default.dirname(e.layout.configPath)),readBody:nt,sendHtml:Le,renderShell:n})||await Mk({method:P,pathname:p,request:f,response:y,layout:e.layout,readBody:nt,sendJson:ge})||await Gh({method:P,pathname:p,request:f,response:y,layout:e.layout,readBody:nt,sendJson:ge}))return;if(P==="GET"&&p==="/health"){let h=e.controllers.getStatus(),A=o();ge(y,200,{ok:!0,...h,installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt,...N2({uid:process.getuid?.(),installDir:e.layout.installDir})});return}if(P==="GET"&&p==="/api/status"){let h=o();ge(y,200,{...e.controllers.getStatus(),linkCode:m(),installBundleVersion:h.installBundleVersion,installBundleUpdatedAt:h.installBundleUpdatedAt});return}if(P==="GET"&&p==="/api/traffic"){ge(y,200,{entries:sc(e.layout)});return}if(P==="DELETE"&&p==="/api/traffic"||P==="POST"&&p==="/api/traffic/clear"){if(iw(e.layout),P==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}ge(y,200,{ok:!0});return}if(P==="GET"&&p==="/api/trace"){ge(y,200,{entries:Fg(e.layout)});return}if(P==="DELETE"&&p==="/api/trace"||P==="POST"&&p==="/api/trace/clear"){if(cw(e.layout),P==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}ge(y,200,{ok:!0});return}if(P==="POST"&&p==="/api/errors/clear"){dw(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(P==="GET"&&p==="/api/knowledge"){let A=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(A.length>0){let _=await ci({layout:e.layout,query:A,limit:20});ge(y,200,{chunks:_,query:A});return}ge(y,200,{chunks:li(e.layout).slice(-50).reverse()});return}if(P==="POST"&&p==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(P==="GET"&&p==="/api/update-status"){let h=await i();ge(y,200,{ok:!0,...h});return}if((P==="GET"||P==="POST")&&p==="/api/update"){await d(y);return}if(P==="GET"&&p==="/"){let h=e.controllers.getStatus(),A=o(),_=ir(e.layout),T=Hg(e.layout.errorLogPath);Le(y,await n({title:"Home",activePath:"/",installVersion:A.installVersion,updateFlash:z2(f.url??void 0),updateError:$2(f.url??void 0),body:Vw({wsConnected:h.wsConnected,lastHeartbeatAt:h.lastHeartbeatAt,installBundleVersion:A.installBundleVersion,harnessSetCount:_.sets.length,knowledgeChunkCount:li(e.layout).length,trafficEntryCount:sc(e.layout).length,wakeError:h.wakeError,errorLogByteSize:T.byteSize,errorLogExists:T.exists})}));return}if(P==="GET"&&p==="/task"){let h=e.controllers.getStatus(),A=o(),_=$(),T=new URL(f.url??"/",`http://127.0.0.1:${43347}`),v=T.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,C=T.searchParams.get("failed")==="1"?T.searchParams.get("error")?.trim()??"Task failed.":null,L=T.searchParams.get("runId");Le(y,await n({title:"Task",activePath:"/task",installVersion:A.installVersion,body:qk({defaultWorkspace:_?.workspace??"",wsConnected:h.wsConnected,flashMessage:v,flashError:C,lastRunId:L})}));return}if(P==="POST"&&p==="/task/dispatch"){let h=await nt(f),A=new URLSearchParams(h),_=A.get("prompt")?.trim()??"",T=A.get("writerAgent")?.trim()??"claude-cli",v=A.get("projectFolder")?.trim()??"",C=await EC({prompt:_,writerAgent:T,...v.length>0?{projectFolderPath:v}:{}}),L=new URLSearchParams;C.ok?L.set("ok","1"):(L.set("failed","1"),C.errorMessage!==void 0&&L.set("error",C.errorMessage.slice(0,240))),C.agentRunId!==void 0&&L.set("runId",C.agentRunId),y.writeHead(303,{Location:`/task?${L.toString()}`}),y.end();return}if(P==="GET"&&p==="/writer-sessions"){let h=o(),A=Qh(e.layout,12);Le(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:h.installVersion,updateFlash:z2(f.url??void 0),updateError:$2(f.url??void 0),body:eC({sessions:A})}));return}if(P==="GET"&&p==="/errors"){let h=o(),A=Hg(e.layout.errorLogPath);Le(y,await n({title:"Errors",activePath:"/errors",installVersion:h.installVersion,body:pw({errorLogPath:e.layout.errorLogPath,content:A.content,exists:A.exists,truncated:A.truncated,byteSize:A.byteSize,cleared:new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(P==="GET"&&p==="/status"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`),A=e.controllers.getStatus(),_=Ae(e.layout),T=_!==null?Ie(_,12e4):hw(A.lastHeartbeatAt,12e4),v=yw({lastHeartbeatAt:A.lastHeartbeatAt,heartbeatIsStale:T}),C=o();Le(y,await n({title:"Status",activePath:"/status",installVersion:C.installVersion,body:`${Hte({status:A,healthBadge:v,revived:h.searchParams.get("revived")==="1",linkCode:m(),installBundleVersion:C.installBundleVersion,installBundleUpdatedAt:C.installBundleUpdatedAt})}${Aw({installDir:e.layout.installDir})}${Pw({entries:Fg(e.layout)})}`}));return}if(P==="GET"&&p==="/traffic"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`),A=sc(e.layout),_=o(),T=A.map(L=>`<tr><td title="${fe(L.at)}">${fe(HC(L.at))}</td><td>${fe(L.direction)}</td><td><code>${fe(L.type)}</code></td><td>${fe(L.summary)}</td><td>${fe(L.action??"")}</td></tr>`).join(""),v=A.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${T}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',C=h.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Le(y,await n({title:"Traffic",activePath:"/traffic",installVersion:_.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${C}
              ${v}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(P==="GET"&&p==="/projects"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`),A=o(),_=qt(A.installVersion),T=await jd(e.layout),v=h.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":h.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,C=h.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,L=$(),I=L===null?null:X({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),W=I===null?{}:Object.fromEntries((await Promise.all(T.projects.map(async U=>{let F=await yC(I,U.id);return[U.id,F?.counts??null]}))).filter(U=>U[1]!==null));Le(y,await n({title:"Projects",activePath:"/projects",installVersion:A.installVersion,body:PC({projects:T.projects,compositionCountsByProjectId:W,cloudAppOrigin:_,syncMessage:T.message,syncOk:T.ok,flashMessage:C,flashError:v})}));return}if(P==="GET"&&p==="/projects/select-folder"){let A=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",_=$(),T=_===null?null:X({wsUrl:_.wsUrl,pairingToken:_.pairingToken}),v=A.length>0&&T!==null?ko():null;if(v===null||T===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Je({projectFolderPath:v}),!await Ul(T,A,v)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(A)}&folderUpdated=1`}),y.end();return}if(P==="POST"&&p==="/projects/delete"){let h=await nt(f),A=new URLSearchParams(h).get("projectId")?.trim()??"",_=$(),T=_===null?null:X({wsUrl:_.wsUrl,pairingToken:_.pairingToken});if(T===null||A.length===0){y.writeHead(303,{Location:"/projects?deleteError=1"}),y.end();return}let v=await i_(T,A);y.writeHead(303,{Location:v.ok?"/projects?deleted=1":"/projects?deleteError=1"}),y.end();return}if(P==="GET"&&p==="/project"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`),A=h.searchParams.get("id")?.trim()??"",_=o(),T=qt(_.installVersion),v=await jd(e.layout),C=lr(v.projects,A);if(C===null){await u(y,"Project not found");return}let L=h.searchParams.get("linked")==="1"?h.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${h.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${h.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:h.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,I=h.searchParams.get("knowledgePromoted"),W=I!==null?`Marked ${I} lesson(s) as promoted in Agent Witch.`:null,U=h.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,F=h.searchParams.get("tab")?.trim()??"harness",G=F==="workflows"||F==="agents"||F==="knowledge"||F==="pitfalls"?F:"harness",it=h.searchParams.get("retired")==="1",H=h.searchParams.get("edit")?.trim()||null,ze=g2(h.searchParams.get("pitfall")),_r=$(),yt=_r===null?null:X({wsUrl:_r.wsUrl,pairingToken:_r.pairingToken}),Su=yt===null?null:await yC(yt,C.id),la=0;if(yt!==null)try{let Pu=await fetch(`${yt.appOrigin}/api/agent-witch/projects/${encodeURIComponent(C.id)}/knowledge`,{method:"GET",headers:{[be]:yt.pairingToken},signal:AbortSignal.timeout(1e4)});if(Pu.ok){let fs=await Pu.json();typeof fs=="object"&&fs!==null&&typeof fs.candidateCount=="number"&&(la=fs.candidateCount)}}catch{la=0}let Yy=yt===null?null:await SC(yt).listPitfalls(C.id,{includeRetired:it||G==="pitfalls"});Le(y,await n({title:C.name,activePath:"/projects",installVersion:_.installVersion,body:To({project:C,cloudAppOrigin:T,installed:ir(e.layout),linkedSetSlugs:nr(C.projectFolderPath),composition:Su,knowledgeCandidateCount:la,pitfalls:Yy,pitfallsShowRetired:it,pitfallsEditId:H,activeTab:G,flashMessage:L??W??ze?.message??null,flashError:U??ze?.error??null})}));return}if(P==="POST"&&p==="/projects/pull-bound-harness"){let h=await nt(f),A=await Yb({rawBody:h,layout:e.layout});if(A.kind==="not_found"){await u(y,"Project not found");return}if(A.kind==="redirect"){y.writeHead(303,{Location:A.location}),y.end();return}let _=o();Le(y,await n({title:A.title,activePath:"/projects",installVersion:_.installVersion,body:A.body}));return}if(P==="POST"&&p==="/projects/link-harness"){let h=await nt(f),A=new URLSearchParams(h),_=A.get("projectId")?.trim()??"",T=await jd(e.layout),v=lr(T.projects,_);if(v===null){await u(y,"Project not found");return}let C=A.getAll("applySet").map(G=>String(G)),L=Cl({layout:e.layout,projectFolderPath:v.projectFolderPath,setSlugs:C});if(!L.ok){let G=o(),it=qt(G.installVersion);Le(y,await n({title:v.name,activePath:"/projects",installVersion:G.installVersion,body:To({project:v,cloudAppOrigin:it,installed:ir(e.layout),linkedSetSlugs:nr(v.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:L.errorMessage})}));return}let I=$(),W=I===null?null:X({wsUrl:I.wsUrl,pairingToken:I.pairingToken}),U=W===null?!1:await Tn(W,v.id,L.appliedSetSlugs),F=new URLSearchParams({linked:"1",files:String(L.writtenFileCount),bindingsSynced:U?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(v.id)}&${F.toString()}`}),y.end();return}if(P==="POST"&&p==="/projects/remove-harness-set"){let h=await nt(f),A=await Zb({rawBody:h,layout:e.layout});if(A.kind==="not_found"){await u(y,"Project not found");return}if(A.kind==="redirect"){y.writeHead(303,{Location:A.location}),y.end();return}let _=o();Le(y,await n({title:A.title,activePath:"/projects",installVersion:_.installVersion,body:A.body}));return}if(P==="POST"&&p==="/project/knowledge/promote-all"){let h=await nt(f),_=new URLSearchParams(h).get("projectId")?.trim()??"",T=await jd(e.layout),v=lr(T.projects,_);if(v===null){await u(y,"Project not found");return}let C=$(),L=C===null?null:X({wsUrl:C.wsUrl,pairingToken:C.pairingToken}),I=L===null?{ok:!1,promotedCount:0}:await c2(L,v.id),W=new URLSearchParams({tab:"knowledge",...I.ok?{knowledgePromoted:String(I.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(v.id)}&${W.toString()}`}),y.end();return}let w=uO(p);if(P==="POST"&&w!==null){let h=await nt(f),A=new URLSearchParams(h),_=A.get("projectId")?.trim()??"",T=await jd(e.layout),v=lr(T.projects,_);if(v===null){await u(y,"Project not found");return}let C=$(),L=C===null?null:X({wsUrl:C.wsUrl,pairingToken:C.pairingToken}),I=L===null?null:SC(L),W=await pO({action:w,form:A,projectId:v.id,store:I});y.writeHead(303,{Location:W}),y.end();return}if(P==="GET"&&p==="/harness"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`),A=o(),_=xl(e.layout),T=h.searchParams.get("submitted")==="1",v=T?h.searchParams.get("syncFailed")==="1"?`Local harness updated (${h.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:h.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${h.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":h.searchParams.get("stopped")==="1"?`Reveal stopped. ${_?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:h.searchParams.get("revealed")==="1"?`Reveal found ${_?.sets.length??0} set(s).`:null,C=_?.scanRoots[0]??Qm(),L=Dte(e.layout,{reveal:_,importQuery:h.searchParams.get("import")==="1",justSubmitted:T}),I=qt(A.installVersion);Le(y,await n({title:"Harness",activePath:"/harness",installVersion:A.installVersion,body:Nd(zC(e.layout,{cloudAppOrigin:I,reveal:_,scanFolder:C,flashMessage:v,importSectionExpanded:L}))}));return}if(P==="POST"&&p==="/api/harness/pick-folder"){let h=ko();if(h===null){ge(y,200,{cancelled:!0});return}ge(y,200,{path:h});return}if(P==="GET"&&p==="/api/harness/file-content"){let A=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",_=kl(A);if(_===null){ge(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let T=Dd.default.readFileSync(_,"utf8"),v=T.length>D2?`${T.slice(0,D2)}
\u2026 (truncated)`:T;ge(y,200,{content:v})}catch{ge(y,500,{errorMessage:"Could not read file."})}return}if(P==="POST"&&p==="/api/harness/reveal/add-project"){let h=await nt(f),A="";try{let v=JSON.parse(h);typeof v=="object"&&v!==null&&typeof v.projectPath=="string"&&(A=v.projectPath.trim())}catch{ge(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(A.length===0){ge(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let _=xl(e.layout),T=mb({reveal:_,projectPath:A});if(T===null||T.sets.length===0){ge(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}og(e.layout,T),ge(y,200,{ok:!0,setCount:T.sets.length});return}if(P==="GET"&&p==="/api/harness/reveal/stream"){let A=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(A.length===0){ge(y,400,{errorMessage:"Choose a folder to scan first."});return}let _=!1;f.on("close",()=>{_=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...UC});let T=gb({scanRoot:A,response:y,shouldAbort:()=>_});og(e.layout,T),y.end();return}if(P==="POST"&&p==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(P==="POST"&&p==="/harness/submit"){let h=xl(e.layout);if(h===null){let I=o(),W=qt(I.installVersion);Le(y,await n({title:"Harness",activePath:"/harness",installVersion:I.installVersion,body:Nd(zC(e.layout,{cloudAppOrigin:W,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let A=await nt(f),_=new URLSearchParams(A),T=hC(_,h),v=hb({layout:e.layout,sets:T});if(!v.ok){let I=o(),W=qt(I.installVersion);Le(y,await n({title:"Harness",activePath:"/harness",installVersion:I.installVersion,body:Nd(zC(e.layout,{cloudAppOrigin:W,reveal:h,flashError:v.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}Sb(e.layout);let L=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${v.writtenItemCount??0}${L}`}),y.end();return}if(P==="GET"&&p==="/writer-api"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`),_=$()?.writerExecutionBackend??Be(void 0),T=Me(e.layout.configPath),v=go(T),C=h.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,L=o();Le(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:L.installVersion,body:gC({writerExecutionBackend:_,secrets:v,flashMessage:C})}));return}if(P==="POST"&&p==="/writer-api"){let h=await nt(f),A=new URLSearchParams(h),_=A.get("writerExecutionBackend")?.trim()??"cli";TA({configPath:e.layout.configPath,writerExecutionBackend:Be(_),anthropicApiKey:A.get("anthropicApiKey")??void 0,anthropicModel:A.get("anthropicModel")??void 0,openaiApiKey:A.get("openaiApiKey")??void 0,openaiModel:A.get("openaiModel")??void 0,googleApiKey:A.get("googleApiKey")??void 0,googleModel:A.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(P==="GET"&&p==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(P==="GET"&&p==="/history"){let h=o();Le(y,await n({title:"History",activePath:"/history",installVersion:h.installVersion,body:Qk({reportsDir:e.layout.reportsDir})}));return}if(P==="GET"&&p==="/knowledge"){let A=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",_=o(),T=kw({layout:e.layout}),v=Lw(T),C=A.length>0?await ci({layout:e.layout,query:A,limit:20}):li(e.layout).slice(-50).reverse(),L=C.map(W=>{let U=Ew(T,W.id),F=U>0?` \xB7 used in ${U} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${fe(W.createdAt)}">${fe(HC(W.createdAt))}${W.source?` \xB7 ${fe(W.source)}`:""}${F}</div><pre>${fe(W.text)}</pre></article>`}).join(""),I=v.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${v.map(W=>`<li><strong>P${W.priority}</strong> \u2014 ${fe(W.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Le(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:_.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${fe(A)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${Fte(A,C.length)}
            </section>${I}${L}`}));return}P==="POST"&&await nt(f),await u(y,"Not found")})().catch(p=>{console.error("[agent-witch-local-app]",p),y.writeHead(500),y.end("Internal error")})});return S.on("error",f=>{if(f.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",f)}),S.listen(43347,"127.0.0.1",()=>{try{Fh()}catch(f){let y=f instanceof Error?f.message:String(f);console.error(`[agent-witch] writeGlobalTriggers failed: ${y}`)}console.log(`[agent-witch] Local app ${Cr}`)}),S},$d=e=>ay(e).publicKeyRaw});var ly=l(()=>{"use strict";GN();VN();U2()});var G2={};St(G2,{runAgentWitchExternalLiveCli:()=>Bte});var BC,B2,Ute,Bte,V2=l(()=>{"use strict";BC=g(require("node:fs")),B2=g(require("node:path"));gn();V();re();ly();re();Ute=e=>{let t=B2.default.join(e,"link-code.txt");if(!BC.default.existsSync(t))return null;let r=BC.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},Bte=()=>{at("agent-witch-live");let e=E(),t=M(),r=Ute(e),o=$d(t);zd({layout:t,controllers:{getStatus:()=>{let n=Ae(t);return{wsConnected:rl(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{tn(e)}}})}});var Qr=k((CBe,J2)=>{"use strict";var q2=["nodebuffer","arraybuffer","fragments"],K2=typeof Blob<"u";K2&&q2.push("blob");J2.exports={BINARY_TYPES:q2,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:K2,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Fd=k((EBe,cy)=>{"use strict";var{EMPTY_BUFFER:Gte}=Qr(),GC=Buffer[Symbol.species];function Vte(e,t){if(e.length===0)return Gte;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new GC(r.buffer,r.byteOffset,o):r}function X2(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function Y2(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function qte(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function VC(e){if(VC.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new GC(e):ArrayBuffer.isView(e)?t=new GC(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),VC.readOnly=!1),t}cy.exports={concat:Vte,mask:X2,toArrayBuffer:qte,toBuffer:VC,unmask:Y2};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");cy.exports.mask=function(t,r,o,n,s){s<48?X2(t,r,o,n,s):e.mask(t,r,o,n,s)},cy.exports.unmask=function(t,r){t.length<32?Y2(t,r):e.unmask(t,r)}}catch{}});var e5=k((LBe,Q2)=>{"use strict";var Z2=Symbol("kDone"),qC=Symbol("kRun"),KC=class{constructor(t){this[Z2]=()=>{this.pending--,this[qC]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[qC]()}[qC](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[Z2])}}};Q2.exports=KC});var Ki=k((RBe,n5)=>{"use strict";var Hd=require("zlib"),t5=Fd(),Kte=e5(),{kStatusCode:r5}=Qr(),Jte=Buffer[Symbol.species],Xte=Buffer.from([0,0,255,255]),uy=Symbol("permessage-deflate"),eo=Symbol("total-length"),Vi=Symbol("callback"),Fo=Symbol("buffers"),qi=Symbol("error"),dy,JC=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!dy){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;dy=new Kte(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Vi];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){dy.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){dy.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Hd.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Hd.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[uy]=this,this._inflate[eo]=0,this._inflate[Fo]=[],this._inflate.on("error",Zte),this._inflate.on("data",o5)}this._inflate[Vi]=o,this._inflate.write(t),r&&this._inflate.write(Xte),this._inflate.flush(()=>{let s=this._inflate[qi];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=t5.concat(this._inflate[Fo],this._inflate[eo]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[eo]=0,this._inflate[Fo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Hd.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Hd.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[eo]=0,this._deflate[Fo]=[],this._deflate.on("data",Yte)}this._deflate[Vi]=o,this._deflate.write(t),this._deflate.flush(Hd.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=t5.concat(this._deflate[Fo],this._deflate[eo]);r&&(s=new Jte(s.buffer,s.byteOffset,s.length-4)),this._deflate[Vi]=null,this._deflate[eo]=0,this._deflate[Fo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};n5.exports=JC;function Yte(e){this[Fo].push(e),this[eo]+=e.length}function o5(e){if(this[eo]+=e.length,this[uy]._maxPayload<1||this[eo]<=this[uy]._maxPayload){this[Fo].push(e);return}this[qi]=new RangeError("Max payload size exceeded"),this[qi].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[qi][r5]=1009,this.removeListener("data",o5),this.reset()}function Zte(e){if(this[uy]._inflate=null,this[qi]){this[Vi](this[qi]);return}e[r5]=1007,this[Vi](e)}});var Ji=k((xBe,py)=>{"use strict";var{isUtf8:s5}=require("buffer"),{hasBlob:Qte}=Qr(),ere=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function tre(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function XC(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function rre(e){return Qte&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}py.exports={isBlob:rre,isValidStatusCode:tre,isValidUTF8:XC,tokenChars:ere};if(s5)py.exports.isValidUTF8=function(e){return e.length<24?XC(e):s5(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");py.exports.isValidUTF8=function(t){return t.length<32?XC(t):e(t)}}catch{}});var tE=k((WBe,p5)=>{"use strict";var{Writable:ore}=require("stream"),i5=Ki(),{BINARY_TYPES:nre,EMPTY_BUFFER:a5,kStatusCode:sre,kWebSocket:ire}=Qr(),{concat:YC,toArrayBuffer:are,unmask:lre}=Fd(),{isValidStatusCode:cre,isValidUTF8:l5}=Ji(),my=Buffer[Symbol.species],kt=0,c5=1,d5=2,u5=3,ZC=4,QC=5,gy=6,eE=class extends ore{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||nre[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[ire]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=kt}_write(t,r,o){if(this._opcode===8&&this._state==kt)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new my(o.buffer,o.byteOffset+t,o.length-t),new my(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new my(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case kt:this.getInfo(t);break;case c5:this.getPayloadLength16(t);break;case d5:this.getPayloadLength64(t);break;case u5:this.getMask();break;case ZC:this.getData(t);break;case QC:case gy:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[i5.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=c5:this._payloadLength===127?this._state=d5:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=u5:this._state=ZC}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=ZC}getData(t){let r=a5;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&lre(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=QC,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[i5.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===kt&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=kt;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=YC(o,r):this._binaryType==="arraybuffer"?n=are(YC(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=kt):(this._state=gy,setImmediate(()=>{this.emit("message",n,!0),this._state=kt,this.startLoop(t)}))}else{let n=YC(o,r);if(!this._skipUTF8Validation&&!l5(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===QC||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=kt):(this._state=gy,setImmediate(()=>{this.emit("message",n,!1),this._state=kt,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,a5),this.end();else{let o=t.readUInt16BE(0);if(!cre(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new my(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!l5(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=kt;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=kt):(this._state=gy,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=kt,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[sre]=n,i}};p5.exports=eE});var nE=k((OBe,f5)=>{"use strict";var{Duplex:IBe}=require("stream"),{randomFillSync:dre}=require("crypto"),{types:{isUint8Array:ure}}=require("util"),m5=Ki(),{EMPTY_BUFFER:pre,kWebSocket:mre,NOOP:gre}=Qr(),{isBlob:Xi,isValidStatusCode:fre}=Ji(),{mask:g5,toBuffer:is}=Fd(),Ct=Symbol("kByteLength"),hre=Buffer.alloc(4),fy=8*1024,as,Yi=fy,Kt=0,yre=1,Sre=2,rE=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Kt,this.onerror=gre,this[mre]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||hre,r.generateMask?r.generateMask(o):(Yi===fy&&(as===void 0&&(as=Buffer.alloc(fy)),dre(as,0,fy),Yi=0),o[0]=as[Yi++],o[1]=as[Yi++],o[2]=as[Yi++],o[3]=as[Yi++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[Ct]!==void 0?a=r[Ct]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(g5(t,o,d,s,a),[d]):(g5(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=pre;else{if(typeof t!="number"||!fre(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(ure(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[Ct]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Kt?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Xi(t)?(n=t.size,s=!1):(t=is(t),n=t.length,s=is.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Ct]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Xi(t)?this._state!==Kt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Kt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Xi(t)?(n=t.size,s=!1):(t=is(t),n=t.length,s=is.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Ct]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Xi(t)?this._state!==Kt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Kt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[m5.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Xi(t)?(a=t.size,c=!1):(t=is(t),a=t.length,c=is.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[Ct]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Xi(t)?this._state!==Kt?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Kt?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[Ct],this._state=Sre,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(oE,this,a,n);return}this._bufferedBytes-=o[Ct];let i=is(s);r?this.dispatch(i,r,o,n):(this._state=Kt,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(Pre,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[m5.extensionName];this._bufferedBytes+=o[Ct],this._state=yre,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");oE(this,c,n);return}this._bufferedBytes-=o[Ct],this._state=Kt,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Kt&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][Ct],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][Ct],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};f5.exports=rE;function oE(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function Pre(e,t,r){oE(e,t,r),e.onerror(t)}});var T5=k((MBe,w5)=>{"use strict";var{kForOnEventAttribute:Ud,kListener:sE}=Qr(),h5=Symbol("kCode"),y5=Symbol("kData"),S5=Symbol("kError"),P5=Symbol("kMessage"),A5=Symbol("kReason"),Zi=Symbol("kTarget"),b5=Symbol("kType"),_5=Symbol("kWasClean"),to=class{constructor(t){this[Zi]=null,this[b5]=t}get target(){return this[Zi]}get type(){return this[b5]}};Object.defineProperty(to.prototype,"target",{enumerable:!0});Object.defineProperty(to.prototype,"type",{enumerable:!0});var ls=class extends to{constructor(t,r={}){super(t),this[h5]=r.code===void 0?0:r.code,this[A5]=r.reason===void 0?"":r.reason,this[_5]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[h5]}get reason(){return this[A5]}get wasClean(){return this[_5]}};Object.defineProperty(ls.prototype,"code",{enumerable:!0});Object.defineProperty(ls.prototype,"reason",{enumerable:!0});Object.defineProperty(ls.prototype,"wasClean",{enumerable:!0});var Qi=class extends to{constructor(t,r={}){super(t),this[S5]=r.error===void 0?null:r.error,this[P5]=r.message===void 0?"":r.message}get error(){return this[S5]}get message(){return this[P5]}};Object.defineProperty(Qi.prototype,"error",{enumerable:!0});Object.defineProperty(Qi.prototype,"message",{enumerable:!0});var Bd=class extends to{constructor(t,r={}){super(t),this[y5]=r.data===void 0?null:r.data}get data(){return this[y5]}};Object.defineProperty(Bd.prototype,"data",{enumerable:!0});var Are={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[Ud]&&n[sE]===t&&!n[Ud])return;let o;if(e==="message")o=function(s,i){let a=new Bd("message",{data:i?s:s.toString()});a[Zi]=this,hy(t,this,a)};else if(e==="close")o=function(s,i){let a=new ls("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Zi]=this,hy(t,this,a)};else if(e==="error")o=function(s){let i=new Qi("error",{error:s,message:s.message});i[Zi]=this,hy(t,this,i)};else if(e==="open")o=function(){let s=new to("open");s[Zi]=this,hy(t,this,s)};else return;o[Ud]=!!r[Ud],o[sE]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[sE]===t&&!r[Ud]){this.removeListener(e,r);break}}};w5.exports={CloseEvent:ls,ErrorEvent:Qi,Event:to,EventTarget:Are,MessageEvent:Bd};function hy(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var yy=k((NBe,v5)=>{"use strict";var{tokenChars:Gd}=Ji();function Ar(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function bre(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,u=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(u===-1&&Gd[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let f=e.slice(c,u);d===44?(Ar(t,f,r),r=Object.create(null)):i=f,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(u===-1&&Gd[d]===1)c===-1&&(c=m);else if(d===32||d===9)u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m),Ar(r,e.slice(c,u),!0),d===44&&(Ar(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)a=e.slice(c,m),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if(Gd[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if(Gd[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,u=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(u===-1&&Gd[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))u===-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let f=e.slice(c,u);o&&(f=f.replace(/\\/g,""),o=!1),Ar(r,a,f),d===44&&(Ar(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=m);let S=e.slice(c,u);return i===void 0?Ar(t,S,r):(a===void 0?Ar(r,S,!0):o?Ar(r,a,S.replace(/\\/g,"")):Ar(r,a,S),Ar(t,i,r)),t}function _re(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}v5.exports={format:_re,parse:bre}});var by=k((zBe,j5)=>{"use strict";var wre=require("events"),Tre=require("https"),vre=require("http"),E5=require("net"),kre=require("tls"),{randomBytes:Cre,createHash:Ere}=require("crypto"),{Duplex:jBe,Readable:DBe}=require("stream"),{URL:iE}=require("url"),Ho=Ki(),Lre=tE(),Rre=nE(),{isBlob:xre}=Ji(),{BINARY_TYPES:k5,CLOSE_TIMEOUT:Wre,EMPTY_BUFFER:Sy,GUID:Ire,kForOnEventAttribute:aE,kListener:Ore,kStatusCode:Mre,kWebSocket:Re,NOOP:L5}=Qr(),{EventTarget:{addEventListener:Nre,removeEventListener:jre}}=T5(),{format:Dre,parse:zre}=yy(),{toBuffer:$re}=Fd(),R5=Symbol("kAborted"),lE=[8,13],ro=["CONNECTING","OPEN","CLOSING","CLOSED"],Fre=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,ee=class e extends wre{constructor(t,r,o){super(),this._binaryType=k5[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Sy,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),x5(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){k5.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new Lre({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new Rre(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[Re]=this,s[Re]=this,t[Re]=this,n.on("conclude",Bre),n.on("drain",Gre),n.on("error",Vre),n.on("message",qre),n.on("ping",Kre),n.on("pong",Jre),s.onerror=Xre,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",O5),t.on("data",Ay),t.on("end",M5),t.on("error",N5),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Ho.extensionName]&&this._extensions[Ho.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){ht(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,I5(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){cE(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Sy,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){cE(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Sy,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){cE(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Ho.extensionName]||(n.compress=!1),this._sender.send(t||Sy,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){ht(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(ee,"CONNECTING",{enumerable:!0,value:ro.indexOf("CONNECTING")});Object.defineProperty(ee.prototype,"CONNECTING",{enumerable:!0,value:ro.indexOf("CONNECTING")});Object.defineProperty(ee,"OPEN",{enumerable:!0,value:ro.indexOf("OPEN")});Object.defineProperty(ee.prototype,"OPEN",{enumerable:!0,value:ro.indexOf("OPEN")});Object.defineProperty(ee,"CLOSING",{enumerable:!0,value:ro.indexOf("CLOSING")});Object.defineProperty(ee.prototype,"CLOSING",{enumerable:!0,value:ro.indexOf("CLOSING")});Object.defineProperty(ee,"CLOSED",{enumerable:!0,value:ro.indexOf("CLOSED")});Object.defineProperty(ee.prototype,"CLOSED",{enumerable:!0,value:ro.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(ee.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(ee.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[aE])return t[Ore];return null},set(t){for(let r of this.listeners(e))if(r[aE]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[aE]:!0})}})});ee.prototype.addEventListener=Nre;ee.prototype.removeEventListener=jre;j5.exports=ee;function x5(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:Wre,protocolVersion:lE[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!lE.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${lE.join(", ")})`);let s;if(t instanceof iE)s=t;else try{s=new iE(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let p=new SyntaxError(c);if(e._redirects===0)throw p;Py(e,p);return}let d=i?443:80,u=Cre(16).toString("base64"),m=i?Tre.request:vre.request,S=new Set,f;if(n.createConnection=n.createConnection||(i?Ure:Hre),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(f=new Ho({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=Dre({[Ho.extensionName]:f.offer()})),r.length){for(let p of r){if(typeof p!="string"||!Fre.test(p)||S.has(p))throw new SyntaxError("An invalid or duplicated subprotocol was specified");S.add(p)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let p=n.path.split(":");n.socketPath=p[0],n.path=p[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let p=o&&o.headers;if(o={...o,headers:{}},p)for(let[P,w]of Object.entries(p))o.headers[P.toLowerCase()]=w}else if(e.listenerCount("redirect")===0){let p=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!p||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,p||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=m(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=m(n);n.timeout&&y.on("timeout",()=>{ht(e,y,"Opening handshake has timed out")}),y.on("error",p=>{y===null||y[R5]||(y=e._req=null,Py(e,p))}),y.on("response",p=>{let P=p.headers.location,w=p.statusCode;if(P&&n.followRedirects&&w>=300&&w<400){if(++e._redirects>n.maxRedirects){ht(e,y,"Maximum redirects exceeded");return}y.abort();let h;try{h=new iE(P,t)}catch{let _=new SyntaxError(`Invalid URL: ${P}`);Py(e,_);return}x5(e,h,r,o)}else e.emit("unexpected-response",y,p)||ht(e,y,`Unexpected server response: ${p.statusCode}`)}),y.on("upgrade",(p,P,w)=>{if(e.emit("upgrade",p),e.readyState!==ee.CONNECTING)return;y=e._req=null;let h=p.headers.upgrade;if(h===void 0||h.toLowerCase()!=="websocket"){ht(e,P,"Invalid Upgrade header");return}let A=Ere("sha1").update(u+Ire).digest("base64");if(p.headers["sec-websocket-accept"]!==A){ht(e,P,"Invalid Sec-WebSocket-Accept header");return}let _=p.headers["sec-websocket-protocol"],T;if(_!==void 0?S.size?S.has(_)||(T="Server sent an invalid subprotocol"):T="Server sent a subprotocol but none was requested":S.size&&(T="Server sent no subprotocol"),T){ht(e,P,T);return}_&&(e._protocol=_);let v=p.headers["sec-websocket-extensions"];if(v!==void 0){if(!f){ht(e,P,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let C;try{C=zre(v)}catch{ht(e,P,"Invalid Sec-WebSocket-Extensions header");return}let L=Object.keys(C);if(L.length!==1||L[0]!==Ho.extensionName){ht(e,P,"Server indicated an extension that was not requested");return}try{f.accept(C[Ho.extensionName])}catch{ht(e,P,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Ho.extensionName]=f}e.setSocket(P,w,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function Py(e,t){e._readyState=ee.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function Hre(e){return e.path=e.socketPath,E5.connect(e)}function Ure(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=E5.isIP(e.host)?"":e.host),kre.connect(e)}function ht(e,t,r){e._readyState=ee.CLOSING;let o=new Error(r);Error.captureStackTrace(o,ht),t.setHeader?(t[R5]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Py,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function cE(e,t,r){if(t){let o=xre(t)?t.size:$re(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${ro[e.readyState]})`);process.nextTick(r,o)}}function Bre(e,t){let r=this[Re];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[Re]!==void 0&&(r._socket.removeListener("data",Ay),process.nextTick(W5,r._socket),e===1005?r.close():r.close(e,t))}function Gre(){let e=this[Re];e.isPaused||e._socket.resume()}function Vre(e){let t=this[Re];t._socket[Re]!==void 0&&(t._socket.removeListener("data",Ay),process.nextTick(W5,t._socket),t.close(e[Mre])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function C5(){this[Re].emitClose()}function qre(e,t){this[Re].emit("message",e,t)}function Kre(e){let t=this[Re];t._autoPong&&t.pong(e,!this._isServer,L5),t.emit("ping",e)}function Jre(e){this[Re].emit("pong",e)}function W5(e){e.resume()}function Xre(e){let t=this[Re];t.readyState!==ee.CLOSED&&(t.readyState===ee.OPEN&&(t._readyState=ee.CLOSING,I5(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function I5(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function O5(){let e=this[Re];if(this.removeListener("close",O5),this.removeListener("data",Ay),this.removeListener("end",M5),e._readyState=ee.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[Re]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",C5),e._receiver.on("finish",C5))}function Ay(e){this[Re]._receiver.write(e)||this.pause()}function M5(){let e=this[Re];e._readyState=ee.CLOSING,e._receiver.end(),this.end()}function N5(){let e=this[Re];this.removeListener("error",N5),this.on("error",L5),e&&(e._readyState=ee.CLOSING,this.destroy())}});var F5=k((FBe,$5)=>{"use strict";var $Be=by(),{Duplex:Yre}=require("stream");function D5(e){e.emit("close")}function Zre(){!this.destroyed&&this._writableState.finished&&this.destroy()}function z5(e){this.removeListener("error",z5),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function Qre(e,t){let r=!0,o=new Yre({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(D5,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(D5,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",Zre),o.on("error",z5),o}$5.exports=Qre});var dE=k((HBe,H5)=>{"use strict";var{tokenChars:eoe}=Ji();function toe(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&eoe[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}H5.exports={parse:toe}});var J5=k((BBe,K5)=>{"use strict";var roe=require("events"),_y=require("http"),{Duplex:UBe}=require("stream"),{createHash:ooe}=require("crypto"),U5=yy(),cs=Ki(),noe=dE(),soe=by(),{CLOSE_TIMEOUT:ioe,GUID:aoe,kWebSocket:loe}=Qr(),coe=/^[+/0-9A-Za-z]{22}==$/,B5=0,G5=1,q5=2,uE=class extends roe{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:ioe,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:soe,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=_y.createServer((o,n)=>{let s=_y.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=doe(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=B5}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===q5){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Vd,this);return}if(t&&this.once("close",t),this._state!==G5)if(this._state=G5,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Vd,this):process.nextTick(Vd,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Vd(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",V5);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){ds(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){ds(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!coe.test(s)){ds(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){ds(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){qd(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=noe.parse(c)}catch{ds(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&u!==void 0){let S=new cs({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let f=U5.parse(u);f[cs.extensionName]&&(S.accept(f[cs.extensionName]),m[cs.extensionName]=S)}catch{ds(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let S={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(S,(f,y,p,P)=>{if(!f)return qd(r,y||401,p,P);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(S))return qd(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[loe])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>B5)return qd(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${ooe("sha1").update(r+aoe).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),u._protocol=m)}if(t[cs.extensionName]){let m=t[cs.extensionName].params,S=U5.format({[cs.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${S}`),u._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",V5),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Vd,this)})),a(u,n)}};K5.exports=uE;function doe(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function Vd(e){e._state=q5,e.emit("close")}function V5(){this.destroy()}function qd(e,t,r,o){r=r||_y.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${_y.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function ds(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,ds),e.emit("wsClientError",i,r,t)}else qd(r,o,n,s)}});var uoe,poe,moe,goe,foe,hoe,X5,yoe,Kd,Y5=l(()=>{uoe=g(F5(),1),poe=g(yy(),1),moe=g(Ki(),1),goe=g(tE(),1),foe=g(nE(),1),hoe=g(dE(),1),X5=g(by(),1),yoe=g(J5(),1),Kd=X5.default});var pE,Z5=l(()=>{"use strict";pE=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var Soe,mE,Q5=l(()=>{"use strict";Yp();Z5();Soe=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",mE=(e={})=>{let t=e.env??process.env,r=pE(t[Jp]),o=pE(t[Xp]);return{mode:Soe(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var eV=l(()=>{"use strict";Yp()});var tV=l(()=>{"use strict";Q5();eV()});var gE=l(()=>{"use strict"});var oo,Jd=l(()=>{"use strict";oo=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var ea,us,rV,Aoe,fE,hE,oV,nV,yE,sV,Xd,SE=l(()=>{"use strict";ea=g(require("node:fs")),us=g(require("node:os")),rV=g(require("node:path"));gE();Jd();Aoe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fE=(e=us.default.hostname())=>rV.default.join(us.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),hE=e=>{if(!ea.default.existsSync(e))return null;try{let t=JSON.parse(ea.default.readFileSync(e,"utf8"));return!Aoe(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},oV=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},nV=(e,t)=>{ea.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},yE=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??fE(),o=hE(r);if(o!==null&&o.pid!==process.pid&&oo(o.pid)&&oV(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:us.default.hostname(),macOsUsername:us.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return nV(r,n),{ok:!0}},sV=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??fE(),o=hE(r);return o!==null&&o.pid!==process.pid&&oo(o.pid)&&oV(o)?{ok:!1}:(nV(r,{hostname:us.default.hostname(),macOsUsername:us.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},Xd=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??fE();hE(r)?.pid===process.pid&&ea.default.existsSync(r)&&ea.default.unlinkSync(r)}});var PE,Yd,boe,_oe,woe,Toe,AE,iV=l(()=>{"use strict";PE=require("node:child_process"),Yd=g(require("node:path"));Jd();Hp();boe=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),_oe=(e,t)=>{if(boe(e)||!/\bnode\b/.test(e))return!1;let r=Yd.default.resolve(t),o=Yd.default.join(r,"app",Wa),n=Yd.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Wa||i==="agent-witch.ts")return e.includes(r);try{let a=Yd.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},woe=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,PE.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},Toe=(e,t,r)=>{let o=woe(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||_oe(d,t)&&n.push(c)}return n},AE=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,PE.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=Toe(r,e.installDir,t),n=[];for(let s of o)if(oo(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var Zd,Qd,aV,voe,bE,lV=l(()=>{"use strict";Zd=g(require("node:fs")),Qd=g(require("node:path"));He();aV=(e,t)=>{!Zd.default.existsSync(e)||Zd.default.existsSync(t)||(Zd.default.mkdirSync(Qd.default.dirname(t),{recursive:!0}),Zd.default.renameSync(e,t))},voe=e=>{if(e.profileEmail===null)return;let t=Qd.default.join(e.installDir,Lt);aV(Qd.default.join(t,Vo),e.mainLogPath),aV(Qd.default.join(t,qo),e.errorLogPath)},bE=e=>{let t=M();e!==void 0&&t.installDir!==e||voe(t)}});var cV=l(()=>{"use strict";rc();zg();zg();!lt()&&sn(__agentWitchImportMetaUrl)&&(async()=>{at("agent-witch-wake-server");let e=await Ln(),t=kr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var dV=l(()=>{"use strict";cV()});var uV=l(()=>{"use strict";Gl()});var _E,pV=l(()=>{"use strict";gE();dV();SE();uV();_E=async(e={})=>{let t=e.skipInProcessBridge?null:await Dg();Ag();let r=setInterval(()=>{Ag()},6e4),o=setInterval(()=>{if(!sV().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var eu,wy,Eoe,mV,gV,Ty,fV,hV,wE,yV,vy,SV=l(()=>{"use strict";eu=g(require("node:fs")),wy=g(require("node:path")),Eoe="pending-run-inputs.json",mV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gV=e=>{let t=e.profileEmail?wy.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return wy.default.join(t,Eoe)},Ty=e=>{let t=gV(e);if(!eu.default.existsSync(t))return{};try{let r=JSON.parse(eu.default.readFileSync(t,"utf8"));return mV(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!mV(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},fV=(e,t)=>{let r=gV(e);eu.default.mkdirSync(wy.default.dirname(r),{recursive:!0}),eu.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},hV=e=>Object.values(Ty(e)),wE=(e,t)=>Ty(e)[t]!==void 0,yV=(e,t)=>{let r=Ty(e);r[t.agentRunId]=t,fV(e,r)},vy=(e,t)=>{let r=Ty(e);delete r[t],fV(e,r)}});var ky=l(()=>{"use strict";le()});var PV=l(()=>{"use strict";le()});var Cy=l(()=>{"use strict";le()});var Ey=l(()=>{"use strict";le()});var tu=l(()=>{"use strict";le()});var Loe,Roe,ru,TE=l(()=>{"use strict";Wt();ky();PV();Cy();Ey();tu();Loe={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},Roe={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},ru=e=>{if(!ye(e.writerAgent))return"the selected writer";let t=dt(e.writerAgent);if(Be(e.writerExecutionBackend)==="api"&&t!==null){let r=Ze(Me(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=il(t,r.model);return`${Roe[t]} model ${o}`}}return Loe[e.writerAgent]}});var xoe,Woe,AV,bV,_V=l(()=>{"use strict";xoe=/"input_tokens"\s*:\s*(\d+)/,Woe=/"output_tokens"\s*:\s*(\d+)/,AV=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},bV=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=AV(xoe.exec(t)),o=AV(Woe.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var Ly=l(()=>{"use strict";Nt()});var ou,Ry,Ioe,vE,wV,TV,vV,kE,kV=l(()=>{"use strict";ou=g(require("node:fs")),Ry=g(require("node:path"));Ly();Ioe="run-completion-outbox.json",vE=e=>{let t=e.profileEmail?Ry.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Ry.default.join(t,Ioe)},wV=e=>{let t=vE(e);if(!ou.default.existsSync(t))return[];try{let r=JSON.parse(ou.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},TV=(e,t)=>{ou.default.mkdirSync(Ry.default.dirname(vE(e)),{recursive:!0}),ou.default.writeFileSync(vE(e),JSON.stringify(t,null,2),"utf8")},vV=(e,t)=>{let r=[...wV(e).filter(o=>o.runId!==t.runId),t];TV(e,r)},kE=async e=>{if(e.cloudApi===null)return;let t=wV(e.layout);if(t.length===0)return;let r=[];for(let o of t)await Nl(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);TV(e.layout,r)}});var CV=l(()=>{"use strict"});var CE,nu,Moe,ps,EV=l(()=>{"use strict";CV();CE=new Map,nu=e=>{let t=CE.get(e);t!==void 0&&(clearInterval(t),CE.delete(e))},Moe=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},ps=(e,t,r,o={})=>{nu(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){nu(t);return}let i=o.onTick?.()??{};Moe(e,t,n,i)};s(),CE.set(t,setInterval(s,15e3))}});var LV=l(()=>{"use strict";Nt()});var RV,xV=l(()=>{"use strict";LV();RV=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Ge(t)}});var EE,su,no,LE,br,WV,xy=l(()=>{"use strict";EE=new Set,su=new Map,no=(e,t)=>{if(t.length===0)return;let r=su.get(e)??[];r.push(t),su.set(e,r)},LE=e=>{EE.add(e);let t=su.get(e)??[];return su.delete(e),t},br=e=>EE.has(e),WV=e=>{EE.delete(e),su.delete(e)}});var ta,IV,OV,MV=l(()=>{"use strict";ta=g(require("node:path")),IV=require("node:url");nn();OV=()=>{if(lt()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?ta.default.dirname(ta.default.resolve(e)):ta.default.dirname(ta.default.resolve(__filename))}return ta.default.dirname((0,IV.fileURLToPath)(__agentWitchImportMetaUrl))}});var NV,jV,DV,zV,st,ra,$V,FV,oa,RE,xE,WE,HV,IE,UV,Wy=l(()=>{"use strict";NV=require("node:crypto"),jV=g(require("node:fs")),DV=g(require("node:path")),zV=require("node:url");Jd();nn();MV();st=new Map,$V=async()=>{if(ra!==void 0)return ra;try{if(lt()){let e=OV(),t=DV.default.join(e,"deps","node-pty","lib","index.js");if(jV.default.existsSync(t)){let r=await import((0,zV.pathToFileURL)(t).href);return ra=r,r}}return ra=await import("node-pty"),ra}catch{return ra=null,null}},FV=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},oa=(e,t,r)=>{let o=st.get(e);if(o!==void 0){st.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},RE=(e,t)=>{let r=st.get(e);return r===void 0?!1:(r.pty.write(t),!0)},xE=(e,t,r)=>{let o=st.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},WE=e=>{for(let t of st.values())if(!(t.mode!=="agent"||t.runId!==e))return oo(t.pty.pid);return!1},HV=e=>{for(let[t,r]of st.entries())if(!(r.mode!=="agent"||r.runId!==e)){st.delete(t);try{r.pty.kill()}catch{}return!0}return!1},IE=async e=>{let t=await $V();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;st.get(e.shellSessionId)!==void 0&&oa(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return st.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{FV(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{st.get(e.shellSessionId)?.pty===n&&(st.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},UV=async e=>{let t=e.shellSessionId??(0,NV.randomUUID)(),r=await $V();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return st.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{FV(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{st.get(t)?.pty===o&&(st.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var Iy,BV,GV=l(()=>{"use strict";Iy="[[AWAITING_INPUT]]",BV=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Iy,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var iu,VV,Oy=l(()=>{"use strict";GV();iu=e=>{let t=e.indexOf(Iy);if(t<0)return null;let o=e.slice(t+Iy.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},VV=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",BV].join(`
`)});var qV,KV=l(()=>{"use strict";xy();Wy();Oy();qV=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(br(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}no(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await UV({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=iu(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var XV,YV,ZV,JV,so,My=l(()=>{"use strict";XV=require("node:child_process"),YV=g(require("node:fs")),ZV=g(require("node:path"));Hp();JV=12e4,so=(e,t)=>{let r=ZV.default.join(e,"app",Zx,"ensure-writer.sh");return YV.default.existsSync(r)?new Promise((o,n)=>{let s=(0,XV.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},a=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String(JV/1e3)}s`))},JV);s.on("error",c=>{clearTimeout(a),n(c)}),s.on("close",c=>{if(clearTimeout(a),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var QV,ms,lu,Ny,OE,au,jy,Dy,ME,NE,Noe,na,joe,Doe,jE,DE=l(()=>{"use strict";QV=require("node:child_process");Wt();My();Cy();ky();tu();Ey();ms=new Map,lu=e=>e==="cursor"||e==="antigravity",Ny=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",OE=e=>ms.get(e)?.warmed===!0,au=e=>{let t=ms.get(e);ms.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},jy=e=>ms.get(e)?.conversationStarted===!0,Dy=e=>{let t=ms.get(e);ms.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},ME=e=>{ms.delete(e)},NE=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",Noe={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},na=e=>`${Noe[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,joe=(e,t,r,o)=>new Promise(n=>{let s=pm(t,r),i=[],a=(0,QV.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),o?.(u)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),Doe=(e,t)=>{let r=na(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},jE=async e=>{if(!ye(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Be(e.runConfig.writerExecutionBackend)==="api"){let r=dt(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Me(e.runConfig.layout.configPath);return Ze(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),au(e.writerAgent),{exitCode:0,output:na(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await so(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}lu(e.writerAgent)&&au(e.writerAgent);let t=await joe(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?Doe(e.writerAgent,t.output):na(e.writerAgent)}}});var gs,zE=l(()=>{"use strict";gs={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var eq,zoe,$oe,tq,Foe,$E,rq=l(()=>{"use strict";zE();eq=/you(?:'|')ve hit your session limit/i,zoe=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],$oe=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,tq=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},Foe=e=>{let t=$oe.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},$E=e=>{let t=e.trim();if(t.length===0)return null;if(eq.test(t))return{code:gs.SESSION_LIMIT,resetHint:Foe(t),matchedLine:tq(t,eq)};for(let r of zoe)if(r.test(t))return{code:gs.PROVIDER_QUOTA,resetHint:null,matchedLine:tq(t,r)};return null}});var zy,$y,FE,HE=l(()=>{"use strict";zy="[[AGENT_RUN_WRITER_EXECUTION]]",$y="cli-writer-api-key-missing",FE="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var UE=l(()=>{"use strict";HE()});var oq=l(()=>{"use strict";UE()});var Fy=l(()=>{"use strict";zE();rq();HE();UE();oq()});var Hy,nq=l(()=>{"use strict";Hy={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var sq,iq=l(()=>{"use strict";sq="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var aq,lq=l(()=>{"use strict";Fy();iq();aq=e=>e.code===gs.SESSION_LIMIT?sq:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var cq,dq=l(()=>{"use strict";Fy();nq();lq();cq=e=>{let t=$E(e.output);return t!==null?{status:Hy.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:aq(t)}:{status:e.exitCode===0?Hy.COMPLETED:Hy.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var BE,Y2e,uq=l(()=>{"use strict";BE={OPEN:"open",APPROVAL:"approval"},Y2e=BE.APPROVAL});var sa,Uy,pq,Boe,mq,gq,fq,cu,GE,VE=l(()=>{"use strict";sa=g(require("node:fs")),Uy=g(require("node:path")),pq="runs",Boe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mq=e=>{let t=e.profileEmail!==null?Uy.default.join(e.installDir,"profiles",e.profileEmail,pq):Uy.default.join(e.installDir,pq);return sa.default.mkdirSync(t,{recursive:!0}),t},gq=(e,t)=>Uy.default.join(mq(e),`${t}.json`),fq=(e,t)=>{sa.default.writeFileSync(gq(e,t.id),JSON.stringify(t,null,2))},cu=(e,t)=>{let r=gq(e,t);if(!sa.default.existsSync(r))return null;try{let o=JSON.parse(sa.default.readFileSync(r,"utf8"));return!Boe(o)||typeof o.id!="string"?null:o}catch{return null}},GE=e=>{let t=mq(e),r=sa.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=cu(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var Goe,hq,yq=l(()=>{"use strict";dq();uq();VE();Goe=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=cq({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:BE.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},hq=(e,t)=>{let r=Goe(t);return fq(e,r),r}});var Sq=l(()=>{"use strict";oy()});var Pq,Aq=l(()=>{"use strict";Fy();Pq=()=>[zy,`agentRunWriterExecutionBackend=${$y}`,`agentRunWriterExecutionReasonCode=${FE}`].join(`
`)});var Uo,By=l(()=>{"use strict";Uo=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var qE,Voe,qoe,bq,_q=l(()=>{"use strict";qE=e=>e.toLocaleString("en-US"),Voe=e=>e<.01?e.toFixed(4):e.toFixed(3),qoe=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${Voe(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${qE(e.inputTokens)} in / ${qE(e.outputTokens)} out (${qE(e.totalTokens)} total)`,t].join(`
`)},bq=(e,t)=>{if(t===void 0)return e;let r=qoe(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var wq=l(()=>{"use strict";le()});var vq,du,_e,KE,Gy,Tq,Koe,Joe,kq,Cq,Eq,uu,JE,XE,YE,Lq,Xoe,Et,pu,Bo,Rq,Yoe,Zoe,Vy,ZE,QE,eL,xq=l(()=>{"use strict";vq=require("node:child_process");le();Wt();SV();Rd();TE();_V();sl();kV();Ly();EV();Jd();xV();xy();Wy();Oy();KV();DE();yq();Sq();Aq();By();_q();xs();wq();tu();ja();Oy();du=new Map,_e=new Map,KE=new Set,Gy=new Map,Tq=e=>{e!==void 0&&!Gy.has(e)&&Gy.set(e,Date.now())},Koe=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(br(t)){Et(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}no(t,n)},Joe=(e,t,r,o,n)=>{if(!kA(e,n))return;let s=`${Pq()}
`;Koe(t,r,o,s);let i=_e.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},kq=130,Cq=`

Stopped by user.`,Eq=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:Uo(e)},uu=null,JE=e=>{uu=e},XE=(e,t)=>{if(uu===null)return;let r=Xk(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||vb(uu,t,r)},YE=async e=>{await kE({layout:e,cloudApi:uu})},Lq=e=>{let t=du.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:oo(t.pid)},Xoe=e=>Se({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),Et=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},pu=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=ks(s),c=_e.get(r);if(a!==null&&c!==void 0){let d=lW(a),u=Lq(r)||WE(r);d!==null&&!u&&Bo(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return aW(a)}}),Bo=(e,t,r,o,n,s,i,a)=>{let c=zs(s,a),d=n,u=bq(c.output,c.llmUsage);if(r!==void 0){let S=Gy.get(r);Gy.delete(r),S!==void 0&&Kk({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-S)/1e3))});let f=bV(c.llmUsage,u);f!==null&&WG({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:f})}r!==void 0&&KE.has(r)&&(KE.delete(r),d=kq,u=u.trim().length>0&&!u.includes("Stopped by user.")?`${u.trim()}${Cq}`:"Stopped by user.");let m=r!==void 0?Xk(e.layout.reportsDir,r):null;if(r!==void 0){nu(r),ml(e.layout,r),br(r)&&(Et(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),WV(r));let S=_e.get(r);LG({reportsDir:e.layout.reportsDir,agentRunId:r,input:Uo(i),output:u,...S!==void 0?{writerLabel:ru({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&ty({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:u,agentRunId:r}),hq(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:u,layout:e.layout}),vV(e.layout,{runId:r,exitCode:d,output:u,createdAt:new Date().toISOString(),...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{}}),kE({layout:e.layout,cloudApi:uu}),_e.delete(r),du.delete(r),vy(e.layout,r)}Et(t,{type:"command.claude.result",payload:{exitCode:d,output:u,...r!==void 0?{agentRunId:r}:{},...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),Ka(e.layout)},Rq=(e,t,r,o,n,s,i)=>{let a=_e.get(r),c=a?.accumulatedOutput??s;yV(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),ps(t,r,()=>wE(e.layout,r),pu(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),Et(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},Yoe=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,u=f=>{if(!(n===void 0||f.length===0)){if(br(n)){Et(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:f},requestId:o});return}no(n,f)}};if(n!==void 0){let f=_e.get(n);du.set(n,t),_e.set(n,{originalPrompt:s,userTranscriptPrompt:f?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:f?.projectFolderPath,reportKey:f?.reportKey,accumulatedOutput:f?.accumulatedOutput??""}),Et(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),ps(r,n,()=>Lq(n),pu(e,r,n,o,f?.projectFolderPath,f?.reportKey))}let m=a==="claude-cli",S=[];t.stdout?.on("data",f=>{let y=f.toString("utf8");if(m?S.push(y):(c.push(y),u(y)),d||n===void 0)return;let p=iu(c.join(""));if(p!==null){d=!0,t.kill("SIGTERM");let P=_e.get(n),w=[P?.accumulatedOutput??"",p.partialOutput].filter(h=>h.length>0).join(`

`);P!==void 0&&(P.accumulatedOutput=w),du.delete(n),Rq(e,r,n,o,p.question,w,s)}}),t.stderr?.on("data",f=>{let y=f.toString("utf8");c.push(y),u(y)}),t.on("close",f=>{if(d)return;Dy(a);let y=n!==void 0?_e.get(n):void 0,p=m?zs(S.join("")):{output:c.join("").trim(),llmUsage:void 0},P=m?c.join("").trim():"",w=[p.output.trim(),P].filter(A=>A.length>0).join(`
`);m&&p.output.trim().length>0&&u(p.output);let h=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${w}`.trim():w;Bo(e,r,n,o,f??-1,h,s,p.llmUsage)}),t.on("error",f=>{d||Bo(e,r,n,o,-1,f.message,s)})},Zoe=(e,t,r,o,n,s,i,a,c)=>{let d=Eq(r,c);s!==void 0&&(_e.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),Et(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),ps(n,s,()=>_e.has(s),pu(e,n,s,o,i,a))),cl(e,t,r,m=>{if(!(s===void 0||m.length===0)){if(br(s)){Et(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:m},requestId:o});return}no(s,m)}}).then(m=>{Dy(t),Bo(e,n,s,o,m.exitCode,m.output,r,m.llmUsage)}).catch(m=>{let S=m instanceof Error?m.message:String(m);Bo(e,n,s,o,-1,S,r)})},Vy=(e,t,r,o,n,s,i,a,c,d,u,m)=>{let S=Eq(r,u);if(qa(e.layout),yn(e,t)){Tq(s),Zoe(e,t,r,o,n,s,c,d,S);return}let f=rr(t,r,Xoe(e),i);if(f===null){Bo(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}Tq(s);let y=RV({workspace:e.workspace,projectFolderPath:c}),p=()=>{let P=(0,vq.spawn)(f.command,[...f.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:m??process.env});Yoe(e,P,n,o,s,r,S,t)};if(s===void 0){p();return}_e.set(s,{originalPrompt:r,userTranscriptPrompt:S,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:_e.get(s)?.accumulatedOutput??""}),Joe(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Na({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),ps(n,s,()=>_e.has(s),pu(e,n,s,o,c,d)),qV({socket:n,sendMessage:Et,requestId:o,agentRunId:s,shellSessionId:a,command:f.command,args:f.args,cwd:y,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:P=>{a!==void 0&&oa(a,A=>{Et(n,A)},o);let w=_e.get(s),h=[w?.accumulatedOutput??"",P.partialOutput].filter(A=>A.length>0).join(`

`);w!==void 0&&(w.accumulatedOutput=h),Rq(e,n,s,o,P.question,h,r)},onFinished:(P,w)=>{Dy(t);let h=zs(w),A=_e.get(s),_=A!==void 0&&A.accumulatedOutput.length>0?`${A.accumulatedOutput}

${h.output}`.trim():h.output;Bo(e,n,s,o,P,_,r,h.llmUsage)}}).then(P=>{if(!P){p();return}ps(n,s,()=>WE(s),pu(e,n,s,o,c,d))}).catch(P=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",P instanceof Error?P.message:P),p()})},ZE=(e,t,r,o)=>{vy(e.layout,t.agentRunId),t.shellSessionId!==void 0&&Et(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=VV(t),s=_e.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;Vy(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},QE=(e,t)=>{for(let r of hV(e.layout))_e.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:Uo(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),ps(t,r.agentRunId,()=>wE(e.layout,r.agentRunId),{awaitingInput:!0}),Et(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},eL=(e,t,r,o)=>{let n=_e.get(r);if(n===void 0)return!1;KE.add(r),nu(r);let s=du.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(HV(r))return!0;vy(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${Cq}`:"Stopped by user.";return Bo(e,t,r,o,kq,i,n.originalPrompt),!0}});var Qoe,tL,Wq=l(()=>{"use strict";Sl();Qoe=()=>`http://127.0.0.1:${It()}/restart`,tL=async()=>{try{let e=await fetch(Qoe(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Iq=l(()=>{"use strict";ac()});var Oq=l(()=>{"use strict";kC()});var Mq,Nq=l(()=>{"use strict";Mq=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var mu,ene,rL,jq=l(()=>{"use strict";V();re();Iq();R_();Oq();Nq();xs();mu=(e,t)=>{Co(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},ene=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(HP(),FP)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},rL=async e=>{let t=Ue(e.layout.installDir)?.bundleVersion??null;if(!Mq({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(xt(e.layout)){Ja({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),mu(e.layout,{summary:r,action:"install-bundle-update-start"}),vr({launchAgentLabel:he(e.layout.installDir),installDir:e.layout.installDir});let o=await Gi({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),mu(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await ene();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),mu(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),mu(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),mu(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var tne,oL,Dq=l(()=>{"use strict";tne=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),oL=e=>{if(!tne(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var nL,sL,zq=l(()=>{"use strict";p_();m_();nL=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Vl({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},sL=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Or(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var $q,rne,one,nne,gu,Fq=l(()=>{"use strict";$q=g(require("node:os"));He();rne="Default",one=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),nne=e=>{let t=$q.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},gu=()=>{let e=M(),t=wa(e),r=one(rne);return`${nne(t)}/${r.length>0?r:"project"}`}});var Hq=l(()=>{"use strict";ac()});var Uq,iL,Bq=l(()=>{"use strict";Hq();Uq=!1,iL=e=>{Uq||(Uq=!0,process.on("uncaughtException",t=>{xn(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;xn(e,{kind:"crash",message:r,stack:o})}))}});var Gq,sne,aL,Vq=l(()=>{"use strict";Gq=require("node:child_process");My();Wt();Cy();ky();tu();Ey();sne=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,Gq.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},aL=async e=>{if(!ye(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Be(e.runConfig.writerExecutionBackend)==="api"){let r=dt(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Me(e.layout.configPath),n=Ze(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await so(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await sne(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var lL,qq=l(()=>{"use strict";lL=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var Kq,cL,Jq=l(()=>{"use strict";Kq=require("node:crypto"),cL=()=>(0,Kq.randomUUID)()});var ia,Xq,qy=l(()=>{"use strict";ia="[[WORKING_ESTIMATE]]",Xq=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",ia,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var Yq,Zq=l(()=>{"use strict";Yq=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var ine,Qq,eK=l(()=>{"use strict";qy();ine=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,Qq=e=>{if(!e.includes(ia))return null;let t=null;for(let r of e.matchAll(ine)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var ane,dL,tK=l(()=>{"use strict";eK();ane=/^(\d{1,6})\b/,dL=e=>{let t=Qq(e);if(t!==null)return t;let r=ane.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var lne,cne,dne,Ky,uL=l(()=>{"use strict";Wt();nc();lne="http://127.0.0.1:11434",cne=45e3,dne=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Ky=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||lne,o=t===void 0?(await Dt({commands:Se({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(cne)});return n.ok?dne(await n.json()):null}catch{return null}}});var pL,mL,gL,rK=l(()=>{"use strict";ja();qy();By();Zq();tK();Rd();uL();pL=async e=>{let t=Uo(e.wrappedPrompt),r=RG(e.reportsDir);return{estimateOutput:await Ky(Xq(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},mL=e=>{let t=dL(e.estimateOutput);t!==null&&Kh({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},gL=e=>{let t=dL(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=Yq(t);return Ma({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Qt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),Kh({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var Jy,oK,fL=l(()=>{"use strict";Jy="[[WORKING_TOKEN_ESTIMATE]]",oK=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Jy,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var nK,une,sK,iK=l(()=>{"use strict";fL();nK=/^(\d{1,8})\b/,une=e=>{let t=e.indexOf(Jy);if(t<0)return null;let r=e.slice(t+Jy.length).trim(),o=nK.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},sK=e=>{let t=une(e);if(t!==null)return t;let r=nK.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var hL,yL,aK=l(()=>{"use strict";fL();By();iK();Rd();uL();hL=async e=>{let t=Uo(e.wrappedPrompt),r=IG(e.reportsDir);return{estimateOutput:await Ky(oK(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},yL=e=>{let t=sK(e.estimateOutput);return t===null?null:(xG({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var lK=l(()=>{"use strict";SE();iV();lV();pV();Sl();xq();My();Wt();VE();xy();Wq();P_();jq();xs();Dq();zq();Ly();Fq();Bq();Vq();Up();qq();Jq();qy();ja();rK();aK();TE();nc();Wy();DE()});var cK={};St(cK,{buildContinuationPromptWithContext:()=>gne});var pne,mne,gne,dK=l(()=>{"use strict";pne=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,mne=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),gne=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=mne(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${pne(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var uK={};St(uK,{readHarnessExportSets:()=>hne});var fu,SL,Xy,fne,hne,pK=l(()=>{"use strict";fu=g(require("node:fs")),SL=g(require("node:path"));He();Xy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fne=e=>{if(!fu.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(fu.default.readFileSync(e.harnessManifestPath,"utf8"));if(Xy(t))return t}catch{return null}return null},hne=(e,t)=>{let r=M(t),o=fne(r);if(o===null)return[];let n=Xy(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!Xy(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let u of c){if(!Xy(u))continue;let m=typeof u.path=="string"?u.path:void 0,S=typeof u.id=="string"?u.id:"",f=typeof u.kind=="string"?u.kind:"",y=typeof u.title=="string"?u.title:"";if(m===void 0||S.length===0||f.length===0||y.length===0)continue;let p=m.startsWith("shared/")?SL.default.join(r.harnessRootDir,m):SL.default.join(r.harnessSetsDir,i,m);fu.default.existsSync(p)&&d.push({id:S,kind:f,title:y,content:fu.default.readFileSync(p,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var vL,AL,aa,mK,yne,gK,fK,PL,hK,bL,_L,wL,te,J,TL,Sne,hu,Pne,Ane,bne,_ne,wne,Tne,vne,kne,yu,yK=l(()=>{"use strict";vL=require("node:child_process"),AL=g(require("node:fs")),aa=g(require("node:os"));Y5();V();re();gn();DC();tV();le();tr();ac();Dw();ly();oy();Nt();Ao();$_();Pt();lK();mK=3e4,yne=3e4,gK=new Map,fK=new Map,PL=new Map,hK=new Map,bL=new Map,_L=new Map,wL=new Map,te=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),J=(e,t,r)=>{e.readyState===Kd.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Co(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),$g(r,"out",t)))},TL=e=>e,Sne=e=>{if(!AL.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(AL.default.readFileSync(e.harnessManifestPath,"utf8"));if(te(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},hu=(e,t)=>{let r=Sne(t);r!==null&&J(e,{type:"harness.manifest.report",payload:{hostname:aa.default.hostname(),manifest:r}})},Pne=async(e,t,r,o,n,s,i=!1,a,c,d,u,m)=>{let S=m?.trim()??"";if(!ye(t)){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=ru({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await Dt({commands:Se({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),p=s!==void 0?pL({wrappedPrompt:r,writerLabel:f,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,P=s!==void 0?hL({wrappedPrompt:r,writerLabel:f,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,w=lu(t)&&!OE(t);if(w){try{await so(e.layout.installDir,t)}catch(H){let ze=H instanceof Error?H.message:String(H);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${ze}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}au(t)}else if(!lu(t))try{await so(e.layout.installDir,t)}catch(H){let ze=H instanceof Error?H.message:String(H);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${ze}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=ul(d,gu,m);if(h===null){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Je({projectFolderPath:h,...S.length>0?{projectId:S}:{}}),i||Md(e.layout,t,h);let A=ry({sessionContinuation:i,supportsWriterSessionContinuation:Ny(t),isWriterConversationStarted:jy(t)}),_=i&&A==="first"?Od(e.layout,t,h):null,T=_!==null?Bi(e.layout,_):null,v=T!==null&&T.turns.length>0,C=uC({sessionContinuation:i,supportsWriterSessionContinuation:Ny(t),isWriterConversationStarted:jy(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:v,userPromptCharacterCount:r.length}),L=r;if(C.continuationStrategy==="source_run_seed"){let H=typeof c=="string"&&c.length>0?cu(e.layout,c):null;if(H!==null){let{buildContinuationPromptWithContext:ze}=await Promise.resolve().then(()=>(dK(),cK));L=ze({priorPrompt:H.prompt,priorOutput:H.resultOutput??"",userMessage:r})}}else C.continuationStrategy==="transcript_seed"&&T!==null&&T.turns.length>0&&(L=Yh({priorTurns:T.turns,userMessage:r}));let I=C.ragLimit>0?await ci({layout:e.layout,query:L,limit:C.ragLimit,minScore:C.ragMinScore,projectFolderPath:h,...S.length>0?{projectId:S}:{}}):[],W=C.ragLimit>0&&h.trim().length>0?await Nw({layout:e.layout,query:L,limit:2,minScore:.32,projectFolderPath:h,...S.length>0?{projectId:S}:{}}):[],U=C.injectMemory?tC(e.layout,h,S.length>0?S:void 0):[],F=`${oC(U,C.memoryEntryLimit)}${Iw(I)}${jw(W)}${L}`,G=u?.trim()??(s!==void 0&&h.trim().length>0?cL():void 0);if(s!==void 0&&G!==void 0&&G.length>0&&h.trim().length>0){Na({reportKey:G,agentRunId:s,userSummary:"Working on your Mac\u2026"});let H=F;p!==null&&p.then(ze=>{if(ze===null)return;let _r=gL({estimateOutput:ze.estimateOutput??"",reportKey:G,agentRunId:s,reportsDir:e.layout.reportsDir,task:ze.task,writerLabel:ze.writerLabel,embedding:ze.embedding});if(_r.estimateSeconds===null)return;XE(e.layout.reportsDir,s);let yt=`${ia}
${_r.estimateSeconds}
`;if(br(s)){J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:yt},requestId:o});return}no(s,yt)}).catch(()=>{}),F=lL(H),F=gP(F,{agentRunId:s,reportKey:G,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&p!==null&&p.then(H=>{H!==null&&mL({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel,embedding:H.embedding})}).catch(()=>{}),s!==void 0&&P!==null&&P.then(H=>{H!==null&&yL({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel})}).catch(()=>{});let it=s!==void 0&&wL.get(s)===!0;if(s!==void 0&&h.trim().length>0){let H=await Sg(h);_L.set(s,H),G!==void 0&&G.length>0&&bL.set(s,G)}Vy(e,t,F,o,TL(n),s,{sessionTurn:C.sessionTurn},a,h,G,r,bA(e.layout,s,it)),w&&s!==void 0&&J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:NE(t)},requestId:o})},Ane=async(e,t,r,o,n)=>{let s=(i,a)=>{J(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await jE({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:Se({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,J(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:o})}}),c=ye(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?na(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},bne=(e,t,r)=>new Promise(o=>{if(!ye(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=rr(t,r,Se({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,vL.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),_ne=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;J(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=sr(t.bundle),s=te(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let u=We(e.wsUrl)??ct,m=await ib({appOrigin:u,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=bn({bundle:i,layout:e.layout});return J(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&hu(o,e.layout),!0},wne=async(e,t,r,o)=>{if(await _ne(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(J(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!ye(n)){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}qa(e.layout);let i=await(async()=>{try{await so(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return bne(e,n,s)})().finally(()=>{Ka(e.layout)});J(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),hu(o,e.layout)},Tne=e=>{let t=1e3*2**e;return Math.min(yne,t)},vne=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=p=>{if(!t.restartInFlight){if(xt(e.layout)){Xa(p),console.log(`[agent-witch] Deferring local restart (${p}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${p})\u2026`),t.wakeError=`restart:${p}`,tL().then(P=>{if(P.ok){console.log("[agent-witch] Local restart completed.");return}if(!P.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",P.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(p,P="system.ack")=>{if(!t.selfUpdateInFlight){if(xt(e.layout)){Ja({layout:e.layout,remoteBundleVersion:p,trigger:P}),console.log(`[agent-witch] Deferring install bundle update (${p} via ${P}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,rL({layout:e.layout,remoteBundleVersion:p,trigger:P}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let p=Ae(e.layout);p!==null&&Ie(p,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),f())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let p=t.socket;t.socket=void 0,t.wsConnected=!1,p.removeAllListeners("open"),p.removeAllListeners("message"),p.removeAllListeners("close"),p.on("error",()=>{}),(p.readyState===Kd.OPEN||p.readyState===Kd.CONNECTING)&&p.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,mK)},u=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let p=Tne(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${p}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,f()},p)},m=p=>{s();let P=()=>{let w=Fa(e.layout.installDir),h=It();J(p,{type:"agent.heartbeat",payload:{hostname:aa.default.hostname(),macOsUsername:aa.default.userInfo().username,wakeError:t.wakeError,wakePort:h,...e.email!==null?{email:e.email}:{},installBundleVersion:w}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};P(),t.heartbeatTimer=setInterval(P,mK)},S=(p,P)=>{if(typeof p.type!="string")return;if(z_(p)){t.stopped=!0,s(),a(),c(),N_({layout:e.layout}).finally(()=>{Xd(),process.exit(0)});return}Co(e.layout,{direction:"in",type:p.type,summary:"inbound WS frame"}),$g(e.layout,"in",p);let w=typeof p.requestId=="string"?p.requestId:void 0;if(p.type==="device.auth.attestation"&&te(p.payload)){let h=typeof p.payload.serverPublicKey=="string"?p.payload.serverPublicKey:"",A=typeof p.payload.origin=="string"?p.payload.origin:"",_=typeof p.payload.devicePublicKey=="string"?p.payload.devicePublicKey:"",T=typeof p.payload.challenge=="string"?p.payload.challenge:"",v=typeof p.payload.serverAttestation=="string"?p.payload.serverAttestation:"";if(!jC({serverPublicKey:h,origin:A,devicePublicKey:_,challenge:T,serverAttestation:v})){t.wakeError="Server attestation verification failed",Co(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(p.type==="writer.ensure"&&te(p.payload)){let h=typeof p.payload.writerAgent=="string"?p.payload.writerAgent:"";Co(e.layout,{direction:"local",type:"writer.ensure",summary:h,action:"ensure-writer"}),aL({layout:e.layout,writerAgent:h,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(A=>{J(P,{type:"writer.status",payload:A},e.layout)})}if(p.type==="install.bundle.update"&&te(p.payload)){let h=typeof p.payload.bundleVersion=="string"?p.payload.bundleVersion.trim():"";h.length>0&&o(h,"install.bundle.update")}if(p.type==="system.ack"){lm(e.layout,{wsUrl:e.wsUrl});let h=te(p.payload)?p.payload:null,A=oL(h);A!==null&&o(A)}if(p.type==="device.restart"&&r("cloud-device-restart"),p.type==="automations.sync"&&te(p.payload)&&nL(p.payload),p.type==="automations.run"&&te(p.payload)&&sL(p.payload),p.type==="terminal.stream.accepted"&&te(p.payload)){let h=typeof p.payload.runId=="string"?p.payload.runId:"";if(h.length>0){let A=LE(h);for(let _ of A)J(P,{type:"terminal.stream.chunk",payload:{runId:h,chunk:_},requestId:w})}}if(p.type==="agent.agentRun.list"&&J(P,{type:"dashboard.agentRun.list.result",payload:{runs:GE(e.layout)},requestId:w}),p.type==="agent.agentRun.get"&&te(p.payload)){let h=typeof p.payload.runId=="string"?p.payload.runId:"",A=h.length>0?cu(e.layout,h):null;J(P,{type:"dashboard.agentRun.get.result",payload:{run:A},requestId:w})}if(p.type==="command.claude.run"&&te(p.payload)){let h=p.payload.prompt,A=typeof p.payload.writerAgent=="string"&&ye(p.payload.writerAgent)?p.payload.writerAgent:"claude-cli",_=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,T=p.payload.sessionContinuation===!0,v=typeof p.payload.sourceRunId=="string"?p.payload.sourceRunId:void 0,C=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:void 0,L=typeof p.payload.projectId=="string"?p.payload.projectId:void 0,I=ul(typeof p.payload.projectFolderPath=="string"?p.payload.projectFolderPath:void 0,gu,L),W=gA(p.payload.compositionSnapshot),U=typeof p.payload.reportKey=="string"?p.payload.reportKey:void 0;if(typeof h=="string"&&h.trim().length>0){if(console.log(`[agent-witch] Running ${A} task (${T?"continue":"first"})\u2026`),I===null){J(P,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",..._!==void 0?{agentRunId:_}:{}},requestId:w});return}if(W!==null){let F=hA(e.layout,W);if(F!==null){J(P,{type:"command.claude.result",payload:{exitCode:-1,output:F,..._!==void 0?{agentRunId:_}:{}},requestId:w});return}if(_!==void 0){let G=SA(e.layout,_,W);if(!G.ok){J(P,{type:"command.claude.result",payload:{exitCode:-1,output:G.errorMessage,..._!==void 0?{agentRunId:_}:{}},requestId:w});return}wL.set(_,W.entries.some(it=>it.scope==="run"))}}_!==void 0&&C!==void 0&&gK.set(_,C),_!==void 0&&(fK.set(_,I),L!==void 0&&L.trim().length>0&&PL.set(_,L.trim()),hK.set(_,h.trim()),Je({projectFolderPath:I,...L!==void 0&&L.trim().length>0?{projectId:L.trim()}:{}})),Pne(e,A,h.trim(),w,P,_,T,C,v,I,U,L)}}if(p.type==="shell.session.open"&&te(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",A=typeof p.payload.cols=="number"?p.payload.cols:120,_=typeof p.payload.rows=="number"?p.payload.rows:32;h.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),IE({shellSessionId:h,cwd:e.workspace,cols:A,rows:_,send:T=>{J(P,T)},requestId:w}))}if(p.type==="shell.session.close"&&te(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"";h.length>0&&oa(h,A=>{J(P,A)},w)}if(p.type==="shell.input"&&te(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",A=typeof p.payload.data=="string"?p.payload.data:"";h.length>0&&A.length>0&&RE(h,A)}if(p.type==="shell.resize"&&te(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",A=typeof p.payload.cols=="number"?p.payload.cols:0,_=typeof p.payload.rows=="number"?p.payload.rows:0;h.length>0&&A>0&&_>0&&xE(h,A,_)}if(p.type==="command.writer.session.end"&&te(p.payload)){let h=p.payload.writerAgent;typeof h=="string"&&ye(h)&&(ME(h),ey(e.layout,h))}if(p.type==="command.writer.session.start"&&te(p.payload)){let h=p.payload.writerAgent,A=typeof p.payload.writerSessionId=="string"?p.payload.writerSessionId:"";typeof h=="string"&&ye(h)&&A.length>0&&(console.log(`[agent-witch] Starting ${h} session\u2026`),Ane(e,h,A,w,P))}if(p.type==="command.claude.stop"&&te(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"";h.length>0&&(console.log(`[agent-witch] Stopping run ${h}\u2026`),eL(e,TL(P),h,w))}if(p.type==="command.claude.input_respond"&&te(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"",A=typeof p.payload.response=="string"?p.payload.response.trim():"",_=typeof p.payload.originalPrompt=="string"?p.payload.originalPrompt:"",T=typeof p.payload.partialOutput=="string"?p.payload.partialOutput:"",v=typeof p.payload.question=="string"?p.payload.question:"";h.length>0&&A.length>0&&_.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),ZE(e,{agentRunId:h,originalPrompt:_,partialOutput:T,question:v,response:A,shellSessionId:gK.get(h)},w,TL(P)))}if(p.type==="dispatch.approval.required"&&te(p.payload)){let h=typeof p.payload.requesterEmail=="string"?p.payload.requesterEmail:"A teammate",A=typeof p.payload.prompt=="string"?p.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${h}: ${A}`),process.platform==="darwin"&&(0,vL.spawn)("osascript",["-e",`display notification "${A.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${h.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(p.type==="harness.request"&&te(p.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),wne(e,p.payload,w,P)),p.type==="harness.export.request"&&te(p.payload)){let h=typeof p.payload.borrowerUserId=="string"?p.payload.borrowerUserId:"",A=typeof p.payload.targetDeviceId=="string"?p.payload.targetDeviceId:void 0,_=Array.isArray(p.payload.setSlugs)?p.payload.setSlugs.filter(T=>typeof T=="string"):[];h.length>0&&_.length>0&&(async()=>{let{readHarnessExportSets:T}=await Promise.resolve().then(()=>(pK(),uK)),v=T(_,e.email);J(P,{type:"harness.export.result",payload:{success:v.length>0,borrowerUserId:h,...A!==void 0?{targetDeviceId:A}:{},sets:v,errorMessage:v.length>0?void 0:"No readable harness sets were found on this machine."},requestId:w})})()}if(p.type==="harness.manifest.request"&&hu(P,e.layout),p.type==="command.claude.result"&&te(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,A=typeof p.payload.output=="string"?p.payload.output:"",_=typeof p.payload.exitCode=="number"?p.payload.exitCode:null,T=ul(h!==void 0?fK.get(h):void 0,gu),v=h!==void 0?PL.get(h):void 0,C=h!==void 0?hK.get(h)??"":"",L=Qb({exitCode:_,output:A});if(L&&T!==null&&Ww({layout:e.layout,text:A,source:h??"command.claude.result",projectFolderPath:T,...v!==void 0?{projectId:v}:{}}),_!=null&&_!==0&&A.trim().length>0&&T!==null&&(Cw({layout:e.layout,errorText:A,projectFolderPath:T,...v!==void 0?{projectId:v}:{}}),Mw({layout:e.layout,text:A,source:h??"command.claude.result.failure",projectFolderPath:T,...v!==void 0?{projectId:v}:{}})),L&&C.trim().length>0&&T!==null&&rC({layout:e.layout,projectFolderPath:T,...v!==void 0?{projectId:v}:{},entry:{id:`${Date.now()}-${h??"run"}`,...h!==void 0?{agentRunId:h}:{},prompt:C,output:A,createdAt:new Date().toISOString()}}),h!==void 0&&T!==null){let W=bL.get(h),U=_L.get(h);W!==void 0&&U!==void 0&&Sg(T).then(F=>{let G=o_({before:U,after:F});fP(W,G),_L.delete(h),bL.delete(h)})}if(L&&v!==void 0&&v.trim().length>0){let W=$(),U=W===null?null:X({wsUrl:W.wsUrl,pairingToken:W.pairingToken});U!==null&&s_(U,v,{...h!==void 0?{sourceRunId:h}:{},lesson:n_({prompt:C,output:A})})}h!==void 0&&(ml(e.layout,h),wL.delete(h),PL.delete(h))}},f=()=>{if(t.stopped)return;a(),c();let p=new Kd(e.wsUrl);t.socket=p,p.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),JE(X({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),YE(e.layout);let P=We(e.wsUrl)??"http://localhost:3000",w=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),h=NC({layout:e.layout,origin:P,...w!==void 0&&w.length>0?{claimToken:w}:{}});J(p,{type:"agent.register",payload:{role:"agent",hostname:aa.default.hostname(),macOsUsername:aa.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...h}},e.layout),hu(p,e.layout),QE(e,p),m(p)}),p.on("message",P=>{let w=typeof P=="string"?P:P.toString("utf8");try{let h=JSON.parse(w);if(!te(h))return;S(h,p)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),p.on("close",(P,w)=>{s(),t.socket=void 0,t.wsConnected=!1,BP(e.layout),t.reconnectAttempt+=1;let h=typeof w=="string"?w:w.toString("utf8");xn(e.layout,{kind:"ws_close",message:"WebSocket closed",code:P,reason:h}),console.log("[agent-witch] Disconnected from server."),u()}),p.on("error",P=>{t.wakeError=P.message,xn(e.layout,{kind:"ws_error",message:P.message,stack:P.stack}),console.error(`[agent-witch] Socket error: ${P.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return MP(()=>{let p=NP();p!==null&&p.layout.installDir===e.layout.installDir&&p.layout.profileEmail===e.layout.profileEmail&&o(p.remoteBundleVersion,p.trigger);let P=jP();P!==null&&r(P)}),{connect:f,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:rl(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:$d(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,f()},reportHarnessManifestIfConnected:()=>{let p=t.socket;return!t.wsConnected||p===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(hu(p,e.layout),{ok:!0})}}},kne=async()=>{at("agent-witch");let e=mE(),t=E();yE().ok||(process.platform==="darwin"?(await tn(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),bE(t);let o=AE({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(vr({launchAgentLabel:he(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),Ea());let n=await LA(),s=n[0];s!==void 0&&iL(s.layout);for(let f of n){let y=We(f.wsUrl)??ct;Ha(f.layout.installDir,y)}let i=n.map(f=>vne(f)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),Xd(),process.exit(0));let c=()=>{n.forEach((f,y)=>{let p=i[y];if(p===void 0)return;let P=Ae(f.layout);GP(P,{socketOpen:p.hasMacSocketOpen(),staleAfterMs:12e4})&&p.reviveWebSocket()})},d=()=>{},u=()=>{if(e.skipInProcessLive)return;let f=n[0]?.layout;f!==void 0&&(xt(f)||Xl(f.installDir))},m=await _E({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:u,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):zd({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let f of i)f.startLocalHealthCheck(),f.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let S=kr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),La(),d()});d=()=>{S(),m.stop(),Xd(),console.log("[agent-witch] Shutting down.");for(let f of i)f.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},yu=kne});var kL=l(()=>{"use strict";yK()});var SK={};St(SK,{startAgentWitchClient:()=>yu});var PK=l(()=>{"use strict";kL();kL();nn();hP();Gp();if(!lt()&&sn(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Bp(process.argv.slice(e))),yu()}});pP();hP();nn();Gp();var uW="20.x",pW="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var f6=e=>[`Node.js ${uW} or newer is required (found ${e}).`,pW].join(" "),mW=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${f6(process.version)}
`),process.exit(1))};var Cne=async()=>{at("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(HP(),FP)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},Ene=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(UM(),HM)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},Lne=async()=>{if(!sn(lt()?void 0:__agentWitchImportMetaUrl))return;mW();let e=process.argv.indexOf("report");e>=0&&process.exit(Bp(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await Cne();return}if(t==="wake"){await Ene();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(BN(),UN));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(V2(),G2));o();return}if(t==="mcp"){let{resolveAgentWitchLocalLayout:o}=await Promise.resolve().then(()=>(V(),yx)),{runAwlMcpStdio:n}=await Promise.resolve().then(()=>(Vk(),AG));await n({layout:o()});return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(PK(),SK));await r()};Lne();
