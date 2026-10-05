#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var E6=Object.create;var NP=Object.defineProperty;var R6=Object.getOwnPropertyDescriptor;var C6=Object.getOwnPropertyNames;var v6=Object.getPrototypeOf,L6=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var R=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Rt=(e,t)=>{for(var r in t)NP(e,r,{get:t[r],enumerable:!0})},I6=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of C6(t))!L6.call(e,n)&&n!==r&&NP(e,n,{get:()=>t[n],enumerable:!(o=R6(t,n))||o.enumerable});return e};var m=(e,t,r)=>(r=e!=null?E6(v6(e)):{},I6(t||!e||!e.__esModule?NP(r,"default",{value:e,enumerable:!0}):r,e));var Ka,mW,gW,qa,DP,Ade,fW,mn,cr,Nr,ku,wu,Bs,Gs,He,HP,Tu,Eu,Ru,Ja,Ft,gn,fn,Ya,To,FP,yW,Ie=l(()=>{"use strict";Ka={production:".agent-witch",localhost:".local-agent-witch"},mW={production:47892,localhost:47893},gW={production:"com.agent-witch",localhost:"com.local-agent-witch"},qa={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},DP="app",Ade=`${DP}/agent-witch.js`,fW=`${DP}/command`,mn={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",projectDataDir:"project-data",harnessDir:"harness"},cr=Ka.production,Nr=Ka.localhost,ku=mW.production,wu=mW.localhost,Bs=gW.production,Gs=gW.localhost,He="profiles",HP=qa.activeProfile,Tu="harness",Eu="sets",Ru="manifest.json",Ja=mn.projectsDir,Ft=mn.logsDir,gn="agent-witch.log",fn="agent-witch.error.log",Ya=mn.reportsDir,To=mn.deviceKeypairJson,FP=DP,yW="agent-witch.js"});var hW=l(()=>{"use strict";Ie()});var SW,Eo,Xa,Cu=l(()=>{"use strict";SW=m(require("node:path"));Ie();Eo=e=>SW.default.basename(e)===Nr,Xa=e=>Eo(e)?Gs:Bs});var PW=l(()=>{"use strict";hW();Cu()});var AW,zP,x6,Za,W6,O6,bW,M6,j6,_W=l(()=>{"use strict";PW();Ie();AW=m(require("node:os")),zP=m(require("node:path")),x6=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?zP.default.resolve(e):zP.default.join(AW.default.homedir(),cr)},Za=Xa(x6()),W6=`${Za}-wake`,O6=`${Za}-live`,bW=`${Za}-watchdog`,M6=`${Za}-automation-scheduler`,j6=`${Za}-updater`});var Vs=R($P=>{"use strict";Object.defineProperty($P,"__esModule",{value:!0});$P.stringify=N6;function N6(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var N=R(UP=>{"use strict";Object.defineProperty(UP,"__esModule",{value:!0});UP.generateTypeGuardError=D6;var kW=Vs();function D6(e,t,r){return(0,kW.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,kW.stringify)(e)}) to be "${r}"`}});var Ro=R(vu=>{"use strict";Object.defineProperty(vu,"__esModule",{value:!0});vu.isNonNullObject=void 0;var H6=N(),F6=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,H6.generateTypeGuardError)(e,t.identifier,"non-null object")),r};vu.isNonNullObject=F6});var dr=R(xe=>{"use strict";Object.defineProperty(xe,"__esModule",{value:!0});xe.attachTypeGuardMeta=xe.isArrayTypeGuard=xe.isNestedObjectTypeGuard=xe.getTypeGuardWrapperKind=xe.getTypeGuardInnerGuard=xe.getTypeGuardItemGuard=xe.getTypeGuardSchema=void 0;var z6=e=>e.schema;xe.getTypeGuardSchema=z6;var $6=e=>e.itemGuard;xe.getTypeGuardItemGuard=$6;var U6=e=>e.innerGuard;xe.getTypeGuardInnerGuard=U6;var B6=e=>e.wrapperKind;xe.getTypeGuardWrapperKind=B6;var G6=e=>{if((0,xe.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};xe.isNestedObjectTypeGuard=G6;var V6=e=>{if((0,xe.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};xe.isArrayTypeGuard=V6;var K6=(e,t)=>Object.assign(e,t);xe.attachTypeGuardMeta=K6});var Qa=R(yn=>{"use strict";Object.defineProperty(yn,"__esModule",{value:!0});yn.getExpectedTypeName=yn.getTypeGuardDisplayName=void 0;var wW=dr(),q6=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};yn.getTypeGuardDisplayName=q6;var J6=e=>{let t=(0,wW.getTypeGuardWrapperKind)(e),r=(0,wW.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,yn.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};yn.getExpectedTypeName=J6});var hn=R(Lu=>{"use strict";Object.defineProperty(Lu,"__esModule",{value:!0});Lu.createValidationResult=void 0;var Y6=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Lu.createValidationResult=Y6});var Ks=R(Iu=>{"use strict";Object.defineProperty(Iu,"__esModule",{value:!0});Iu.createValidationError=void 0;var X6=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Iu.createValidationError=X6});var qs=R(xu=>{"use strict";Object.defineProperty(xu,"__esModule",{value:!0});xu.createTreeNode=void 0;var Z6=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});xu.createTreeNode=Z6});var el=R(Wu=>{"use strict";Object.defineProperty(Wu,"__esModule",{value:!0});Wu.combineResults=void 0;var Q6=hn(),eY=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,Q6.createValidationResult)(r,o,n)};Wu.combineResults=eY});var Mu=R(Ou=>{"use strict";Object.defineProperty(Ou,"__esModule",{value:!0});Ou.createSimplifiedTree=void 0;var TW=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=TW(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},tY=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=TW(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Ou.createSimplifiedTree=tY});var rl=R(Nu=>{"use strict";Object.defineProperty(Nu,"__esModule",{value:!0});Nu.validateObject=void 0;var rY=Ro(),tl=hn(),oY=Ks(),ju=qs(),nY=el(),EW=Du(),sY=(e,t,r)=>{let o=()=>{let i=(0,oY.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,ju.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,tl.createValidationResult)(!1,[],a):(0,tl.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,tl.createValidationResult)(!0,[],(0,ju.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,g=d,f=t[g],h=e[g],y=(0,EW.validateProperty)(g,h,f,r);return y.valid?p.length===0?(0,tl.createValidationResult)(!0,[],(0,ju.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,EW.validateProperty)(d,e[d],p,r)}),a=(0,nY.combineResults)(i,r.path),c=(0,ju.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,tl.createValidationResult)(a.valid,a.errors,c)};return(0,rY.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};Nu.validateObject=sY});var CW=R(zu=>{"use strict";Object.defineProperty(zu,"__esModule",{value:!0});zu.validateArray=void 0;var iY=Vs(),Hu=hn(),RW=Ks(),Fu=qs(),aY=el(),lY=rl(),cY=Qa(),dY=dr(),pY=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,RW.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,Fu.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,Hu.createValidationResult)(!1,[c],d)}let n=(0,dY.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,g={path:p,config:r.config||null};if(n)return(0,lY.validateObject)(c,n,g);let f=t(c,null),h=(0,cY.getExpectedTypeName)(t),y=(0,iY.stringify)(c);if(f)return(0,Hu.createValidationResult)(!0,[],(0,Fu.createTreeNode)(p,!0,h,c));let S=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,u=(0,RW.createValidationError)(p,h,c,S),A=(0,Fu.createTreeNode)(p,!1,h,c);return A.errors=[u],(0,Hu.createValidationResult)(!1,[u],A)}),i=(0,aY.combineResults)(s,o),a=(0,Fu.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,Hu.createValidationResult)(i.valid,i.errors,a)};zu.validateArray=pY});var Du=R(Uu=>{"use strict";Object.defineProperty(Uu,"__esModule",{value:!0});Uu.validateProperty=void 0;var vW=hn(),uY=Ks(),LW=qs(),mY=Qa(),$u=dr(),gY=rl(),fY=CW(),yY=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,$u.getTypeGuardSchema)(r),c=(0,$u.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,gY.validateObject)(t,a,s);if(c&&(0,$u.isArrayTypeGuard)(r))return(0,fY.validateArray)(t,c,s)}let d=p=>{let g=r(t,p),f=(0,mY.getExpectedTypeName)(r);return g?(0,vW.createValidationResult)(!0,[],(0,LW.createTreeNode)(n,!0,f,t)):(()=>{let h=(0,uY.createValidationError)(n,f,t,`Expected ${n} (${JSON.stringify(t)}) to be "${f}"`),y=(0,LW.createTreeNode)(n,!1,f,t);return y.errors=[h],(0,vW.createValidationResult)(!1,[h],y)})()};if((0,$u.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};Uu.validateProperty=yY});var Gu=R(Bu=>{"use strict";Object.defineProperty(Bu,"__esModule",{value:!0});Bu.isNil=void 0;var hY=N(),SY=function(e,t){return e!=null?(t&&t.callbackOnError((0,hY.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Bu.isNil=SY});var BP=R(Vu=>{"use strict";Object.defineProperty(Vu,"__esModule",{value:!0});Vu.isDefined=void 0;var PY=N(),AY=Gu(),bY=function(e,t){return(0,AY.isNil)(e,null)?(t&&t.callbackOnError((0,PY.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Vu.isDefined=bY});var GP=R(Ku=>{"use strict";Object.defineProperty(Ku,"__esModule",{value:!0});Ku.reportValidationResults=void 0;var _Y=Mu(),IW=BP(),kY=Gu(),wY=(e,t)=>{if(e.valid===!0||(0,kY.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,IW.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,_Y.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,IW.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Ku.reportValidationResults=wY});var VP=R(ce=>{"use strict";Object.defineProperty(ce,"__esModule",{value:!0});ce.Validation=ce.reportValidationResults=ce.validateObject=ce.validateProperty=ce.createSimplifiedTree=ce.combineResults=ce.createTreeNode=ce.createValidationError=ce.createValidationResult=ce.getExpectedTypeName=void 0;var TY=Qa();Object.defineProperty(ce,"getExpectedTypeName",{enumerable:!0,get:function(){return TY.getExpectedTypeName}});var EY=hn();Object.defineProperty(ce,"createValidationResult",{enumerable:!0,get:function(){return EY.createValidationResult}});var RY=Ks();Object.defineProperty(ce,"createValidationError",{enumerable:!0,get:function(){return RY.createValidationError}});var CY=qs();Object.defineProperty(ce,"createTreeNode",{enumerable:!0,get:function(){return CY.createTreeNode}});var vY=el();Object.defineProperty(ce,"combineResults",{enumerable:!0,get:function(){return vY.combineResults}});var LY=Mu();Object.defineProperty(ce,"createSimplifiedTree",{enumerable:!0,get:function(){return LY.createSimplifiedTree}});var IY=Du();Object.defineProperty(ce,"validateProperty",{enumerable:!0,get:function(){return IY.validateProperty}});var xY=rl();Object.defineProperty(ce,"validateObject",{enumerable:!0,get:function(){return xY.validateObject}});var WY=GP();Object.defineProperty(ce,"reportValidationResults",{enumerable:!0,get:function(){return WY.reportValidationResults}});var OY=hn(),MY=el(),jY=Ks(),NY=qs(),DY=Du(),HY=rl(),FY=GP(),zY=Mu();ce.Validation={result:OY.createValidationResult,combine:MY.combineResults,error:jY.createValidationError,treeNode:NY.createTreeNode,property:DY.validateProperty,object:HY.validateObject,report:FY.reportValidationResults,createSimplifiedTree:zY.createSimplifiedTree}});var qu=R(KP=>{"use strict";Object.defineProperty(KP,"__esModule",{value:!0});KP.isType=UY;var xW=Ro(),WW=VP(),$Y=dr();function UY(e){if(!(0,xW.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,WW.validateObject)(r,e,s);return(0,WW.reportValidationResults)(i,o||null),i.valid}return(0,xW.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,$Y.attachTypeGuardMeta)(t,{schema:e})}});var NW=R(Sn=>{"use strict";Object.defineProperty(Sn,"__esModule",{value:!0});Sn.isNestedType=Sn.isShape=void 0;Sn.isSchema=ol;var OW=Ro(),MW=VP(),jW=dr();function ol(e){if(!(0,OW.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=GY(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,MW.validateObject)(o,t,i);return(0,MW.reportValidationResults)(a,n||null),a.valid}return(0,OW.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,jW.attachTypeGuardMeta)(r,{schema:t})}function BY(e){return typeof e=="function"?e:Array.isArray(e)?VY(e):typeof e=="object"&&e!==null?ol(e):e}function GY(e){let t={};for(let[r,o]of Object.entries(e))t[r]=BY(o);return t}function VY(e){let t=e[0],r=ol(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,jW.attachTypeGuardMeta)(o,{itemGuard:r})}Sn.isShape=ol;Sn.isNestedType=ol});var DW=R(qP=>{"use strict";Object.defineProperty(qP,"__esModule",{value:!0});qP.isObjectWith=qY;var KY=qu();function qY(e){return(0,KY.isType)(e)}});var HW=R(JP=>{"use strict";Object.defineProperty(JP,"__esModule",{value:!0});JP.isObject=YY;var JY=qu();function YY(e){return(0,JY.isType)(e)}});var FW=R(YP=>{"use strict";Object.defineProperty(YP,"__esModule",{value:!0});YP.guardWithTolerance=XY;function XY(e,t,r){return t(e,r),e}});var zW=R(XP=>{"use strict";Object.defineProperty(XP,"__esModule",{value:!0});XP.isBranded=QY;var ZY=N();function QY(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,ZY.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var $W=R(Ju=>{"use strict";Object.defineProperty(Ju,"__esModule",{value:!0});Ju.BrandSymbols=void 0;Ju.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var UW=R(Yu=>{"use strict";Object.defineProperty(Yu,"__esModule",{value:!0});Yu.isAny=void 0;var e7=function(e){return!0};Yu.isAny=e7});var nl=R(ZP=>{"use strict";Object.defineProperty(ZP,"__esModule",{value:!0});ZP.reportTypeGuardError=r7;var t7=N();function r7(e,t,r){e&&e.callbackOnError((0,t7.generateTypeGuardError)(t,e.identifier,r))}});var BW=R(Xu=>{"use strict";Object.defineProperty(Xu,"__esModule",{value:!0});Xu.isBoolean=void 0;var o7=nl(),n7=function(t,r){return typeof t!="boolean"?((0,o7.reportTypeGuardError)(r,t,"boolean"),!1):!0};Xu.isBoolean=n7});var GW=R(Zu=>{"use strict";Object.defineProperty(Zu,"__esModule",{value:!0});Zu.isDate=void 0;var s7=N(),i7=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,s7.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Zu.isDate=i7});var QP=R(Qu=>{"use strict";Object.defineProperty(Qu,"__esModule",{value:!0});Qu.isNumber=void 0;var a7=nl(),l7=function(t,r){return typeof t!="number"||isNaN(t)?((0,a7.reportTypeGuardError)(r,t,"number"),!1):!0};Qu.isNumber=l7});var VW=R(em=>{"use strict";Object.defineProperty(em,"__esModule",{value:!0});em.isString=void 0;var c7=nl(),d7=function(t,r){return typeof t!="string"?((0,c7.reportTypeGuardError)(r,t,"string"),!1):!0};em.isString=d7});var KW=R(tm=>{"use strict";Object.defineProperty(tm,"__esModule",{value:!0});tm.isUnknown=void 0;var p7=function(e){return!0};tm.isUnknown=p7});var qW=R(rm=>{"use strict";Object.defineProperty(rm,"__esModule",{value:!0});rm.isFunction=void 0;var u7=N(),m7=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,u7.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};rm.isFunction=m7});var YW=R(om=>{"use strict";Object.defineProperty(om,"__esModule",{value:!0});om.isFile=void 0;var JW=N(),g7=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,JW.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,JW.generateTypeGuardError)(e,t.identifier,"File")),!1)};om.isFile=g7});var ZW=R(nm=>{"use strict";Object.defineProperty(nm,"__esModule",{value:!0});nm.isFileList=void 0;var XW=N(),f7=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,XW.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,XW.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};nm.isFileList=f7});var e0=R(sm=>{"use strict";Object.defineProperty(sm,"__esModule",{value:!0});sm.isBlob=void 0;var QW=N(),y7=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,QW.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,QW.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};sm.isBlob=y7});var r0=R(im=>{"use strict";Object.defineProperty(im,"__esModule",{value:!0});im.isFormData=void 0;var t0=N(),h7=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,t0.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,t0.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};im.isFormData=h7});var n0=R(am=>{"use strict";Object.defineProperty(am,"__esModule",{value:!0});am.isURL=void 0;var o0=N(),S7=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,o0.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,o0.generateTypeGuardError)(e,t.identifier,"URL")),!1)};am.isURL=S7});var i0=R(lm=>{"use strict";Object.defineProperty(lm,"__esModule",{value:!0});lm.isURLSearchParams=void 0;var s0=N(),P7=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,s0.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,s0.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};lm.isURLSearchParams=P7});var a0=R(cm=>{"use strict";Object.defineProperty(cm,"__esModule",{value:!0});cm.isMap=void 0;var A7=N(),b7=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,A7.generateTypeGuardError)(e,t.identifier,"Map")),!1)};cm.isMap=b7});var l0=R(dm=>{"use strict";Object.defineProperty(dm,"__esModule",{value:!0});dm.isSet=void 0;var _7=N(),k7=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,_7.generateTypeGuardError)(e,t.identifier,"Set")),!1)};dm.isSet=k7});var c0=R(eA=>{"use strict";Object.defineProperty(eA,"__esModule",{value:!0});eA.isIndexSignature=T7;var w7=N();function T7(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,w7.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let g=s[d],f=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),h=t(g,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return f&&h})}}});var d0=R(pm=>{"use strict";Object.defineProperty(pm,"__esModule",{value:!0});pm.isError=void 0;var E7=nl(),R7=function(t,r){return t instanceof Error?!0:((0,E7.reportTypeGuardError)(r,t,"Error"),!1)};pm.isError=R7});var rA=R(tA=>{"use strict";Object.defineProperty(tA,"__esModule",{value:!0});tA.isArrayWithEachItem=L7;var C7=N(),v7=dr();function L7(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,C7.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,v7.attachTypeGuardMeta)(t,{itemGuard:e})}});var oA=R(um=>{"use strict";Object.defineProperty(um,"__esModule",{value:!0});um.isNonEmptyArray=void 0;var I7=N(),x7=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,I7.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};um.isNonEmptyArray=x7});var p0=R(nA=>{"use strict";Object.defineProperty(nA,"__esModule",{value:!0});nA.isNonEmptyArrayWithEachItem=M7;var W7=rA(),O7=oA();function M7(e){return function(t,r){return(0,W7.isArrayWithEachItem)(e)(t,r)&&(0,O7.isNonEmptyArray)(t,r)}}});var m0=R(sA=>{"use strict";Object.defineProperty(sA,"__esModule",{value:!0});sA.isTuple=j7;var u0=N();function j7(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,u0.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,u0.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var g0=R(iA=>{"use strict";Object.defineProperty(iA,"__esModule",{value:!0});iA.isObjectWithEachItem=D7;var N7=N();function D7(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,N7.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var f0=R(aA=>{"use strict";Object.defineProperty(aA,"__esModule",{value:!0});aA.isPartialOf=F7;var H7=Ro();function F7(e){return function(t,r){if(!(0,H7.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var y0=R(lA=>{"use strict";Object.defineProperty(lA,"__esModule",{value:!0});lA.isPick=$7;var z7=Ro();function $7(e,...t){return function(r,o){if(!(0,z7.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var h0=R(cA=>{"use strict";Object.defineProperty(cA,"__esModule",{value:!0});cA.isOmit=B7;var U7=Ro();function B7(e,...t){return function(r,o){if(!(0,U7.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),g=p.indexOf(" ("),f=g>=0?p.slice(0,g):p;if(a.has(f))return!1;let h=f.startsWith(s+".")&&f.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var S0=R(mm=>{"use strict";Object.defineProperty(mm,"__esModule",{value:!0});mm.isNonEmptyString=void 0;var G7=N(),V7=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,G7.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};mm.isNonEmptyString=V7});var P0=R(gm=>{"use strict";Object.defineProperty(gm,"__esModule",{value:!0});gm.isNonNegativeNumber=void 0;var K7=N(),q7=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,K7.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};gm.isNonNegativeNumber=q7});var A0=R(fm=>{"use strict";Object.defineProperty(fm,"__esModule",{value:!0});fm.isPositiveNumber=void 0;var J7=N(),Y7=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,J7.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};fm.isPositiveNumber=Y7});var b0=R(ym=>{"use strict";Object.defineProperty(ym,"__esModule",{value:!0});ym.isNonPositiveNumber=void 0;var X7=N(),Z7=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,X7.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};ym.isNonPositiveNumber=Z7});var _0=R(hm=>{"use strict";Object.defineProperty(hm,"__esModule",{value:!0});hm.isNegativeNumber=void 0;var Q7=N(),eX=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,Q7.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};hm.isNegativeNumber=eX});var k0=R(Sm=>{"use strict";Object.defineProperty(Sm,"__esModule",{value:!0});Sm.isInteger=void 0;var tX=N(),rX=QP(),oX=function(e,t){return!(0,rX.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,tX.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Sm.isInteger=oX});var w0=R(Pm=>{"use strict";Object.defineProperty(Pm,"__esModule",{value:!0});Pm.isPositiveInteger=void 0;var nX=N(),sX=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,nX.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};Pm.isPositiveInteger=sX});var T0=R(Am=>{"use strict";Object.defineProperty(Am,"__esModule",{value:!0});Am.isNegativeInteger=void 0;var iX=N(),aX=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,iX.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Am.isNegativeInteger=aX});var E0=R(bm=>{"use strict";Object.defineProperty(bm,"__esModule",{value:!0});bm.isNonNegativeInteger=void 0;var lX=N(),cX=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,lX.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};bm.isNonNegativeInteger=cX});var R0=R(_m=>{"use strict";Object.defineProperty(_m,"__esModule",{value:!0});_m.isNonPositiveInteger=void 0;var dX=N(),pX=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,dX.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};_m.isNonPositiveInteger=pX});var C0=R(wm=>{"use strict";Object.defineProperty(wm,"__esModule",{value:!0});wm.isNumeric=void 0;var km=N(),uX=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,km.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,km.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,km.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,km.generateTypeGuardError)(e,t.identifier,"number key")),!1};wm.isNumeric=uX});var v0=R(Tm=>{"use strict";Object.defineProperty(Tm,"__esModule",{value:!0});Tm.isBooleanLike=void 0;var dA=N(),mX=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,dA.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,dA.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Tm.isBooleanLike=mX});var L0=R(Em=>{"use strict";Object.defineProperty(Em,"__esModule",{value:!0});Em.isDateLike=void 0;var sl=N(),gX=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,sl.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,sl.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,sl.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,sl.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,sl.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Em.isDateLike=gX});var I0=R(Rm=>{"use strict";Object.defineProperty(Rm,"__esModule",{value:!0});Rm.isBigInt=void 0;var fX=N(),yX=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,fX.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Rm.isBigInt=yX});var uA=R(pA=>{"use strict";Object.defineProperty(pA,"__esModule",{value:!0});pA.isOneOf=hX;var x0=Vs();function hX(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,x0.stringify)(t)}) must be one of following values ${e.map(x0.stringify).join(" | ")}`),o}}});var W0=R(mA=>{"use strict";Object.defineProperty(mA,"__esModule",{value:!0});mA.isOneOfTypes=AX;var SX=Vs(),PX=Qa();function AX(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,SX.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,PX.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var O0=R(gA=>{"use strict";Object.defineProperty(gA,"__esModule",{value:!0});gA.isIntersectionOf=bX;function bX(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var M0=R(fA=>{"use strict";Object.defineProperty(fA,"__esModule",{value:!0});fA.isExtensionOf=_X;function _X(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var j0=R(yA=>{"use strict";Object.defineProperty(yA,"__esModule",{value:!0});yA.isNullOr=wX;var kX=dr();function wX(e){function t(r,o){return r===null?!0:e(r,o)}return(0,kX.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var N0=R(hA=>{"use strict";Object.defineProperty(hA,"__esModule",{value:!0});hA.isUndefinedOr=EX;var TX=dr();function EX(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,TX.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var D0=R(SA=>{"use strict";Object.defineProperty(SA,"__esModule",{value:!0});SA.isNilOr=CX;var RX=dr();function CX(e){function t(r,o){return r==null?!0:e(r,o)}return(0,RX.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var H0=R(PA=>{"use strict";Object.defineProperty(PA,"__esModule",{value:!0});PA.isAsserted=vX;function vX(e){return!0}});var F0=R(AA=>{"use strict";Object.defineProperty(AA,"__esModule",{value:!0});AA.isEnum=IX;var LX=uA();function IX(e){return function(t,r){return(0,LX.isOneOf)(...Object.values(e))(t,r)}}});var z0=R(bA=>{"use strict";Object.defineProperty(bA,"__esModule",{value:!0});bA.isEqualTo=OX;var xX=N(),WX=Vs();function OX(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,xX.generateTypeGuardError)(t,r.identifier,`equal to ${(0,WX.stringify)(e)}`)),!1):!0}}});var $0=R(Cm=>{"use strict";Object.defineProperty(Cm,"__esModule",{value:!0});Cm.isRegex=void 0;var MX=N(),jX=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,MX.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Cm.isRegex=jX});var B0=R(_A=>{"use strict";Object.defineProperty(_A,"__esModule",{value:!0});_A.isPattern=NX;var U0=N();function NX(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,U0.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,U0.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var G0=R(kA=>{"use strict";Object.defineProperty(kA,"__esModule",{value:!0});kA.by=DX;function DX(e){return function(t){return e(t,null)}}});var V0=R(wA=>{"use strict";Object.defineProperty(wA,"__esModule",{value:!0});wA.toNumber=HX;function HX(e){return typeof e=="number"?e:Number(e)}});var K0=R(TA=>{"use strict";Object.defineProperty(TA,"__esModule",{value:!0});TA.toDate=FX;function FX(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var q0=R(EA=>{"use strict";Object.defineProperty(EA,"__esModule",{value:!0});EA.toBoolean=zX;function zX(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var J0=R(vm=>{"use strict";Object.defineProperty(vm,"__esModule",{value:!0});vm.isSymbol=void 0;var $X=N(),UX=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,$X.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};vm.isSymbol=UX});var Js=R(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.isDateLike=_.isBooleanLike=_.isNumeric=_.isNonPositiveInteger=_.isNonNegativeInteger=_.isNegativeInteger=_.isPositiveInteger=_.isInteger=_.isNegativeNumber=_.isNonPositiveNumber=_.isPositiveNumber=_.isNonNegativeNumber=_.isNonEmptyString=_.isOmit=_.isPick=_.isPartialOf=_.isObjectWithEachItem=_.isNonNullObject=_.isTuple=_.isNonEmptyArrayWithEachItem=_.isNonEmptyArray=_.isArrayWithEachItem=_.isError=_.isIndexSignature=_.isSet=_.isMap=_.isURLSearchParams=_.isURL=_.isFormData=_.isBlob=_.isFileList=_.isFile=_.isFunction=_.isUnknown=_.isString=_.isNumber=_.isNil=_.isDefined=_.isDate=_.isBoolean=_.isAny=_.BrandSymbols=_.isBranded=_.guardWithTolerance=_.isObject=_.isObjectWith=_.isNestedType=_.isShape=_.isSchema=_.isType=void 0;_.isSymbol=_.toBoolean=_.toDate=_.toNumber=_.by=_.generateTypeGuardError=_.isPattern=_.isRegex=_.isEqualTo=_.isEnum=_.isAsserted=_.isNilOr=_.isUndefinedOr=_.isNullOr=_.isExtensionOf=_.isIntersectionOf=_.isOneOfTypes=_.isOneOf=_.isBigInt=void 0;var BX=qu();Object.defineProperty(_,"isType",{enumerable:!0,get:function(){return BX.isType}});var RA=NW();Object.defineProperty(_,"isSchema",{enumerable:!0,get:function(){return RA.isSchema}});Object.defineProperty(_,"isShape",{enumerable:!0,get:function(){return RA.isShape}});Object.defineProperty(_,"isNestedType",{enumerable:!0,get:function(){return RA.isNestedType}});var GX=DW();Object.defineProperty(_,"isObjectWith",{enumerable:!0,get:function(){return GX.isObjectWith}});var VX=HW();Object.defineProperty(_,"isObject",{enumerable:!0,get:function(){return VX.isObject}});var KX=FW();Object.defineProperty(_,"guardWithTolerance",{enumerable:!0,get:function(){return KX.guardWithTolerance}});var qX=zW();Object.defineProperty(_,"isBranded",{enumerable:!0,get:function(){return qX.isBranded}});var JX=$W();Object.defineProperty(_,"BrandSymbols",{enumerable:!0,get:function(){return JX.BrandSymbols}});var YX=UW();Object.defineProperty(_,"isAny",{enumerable:!0,get:function(){return YX.isAny}});var XX=BW();Object.defineProperty(_,"isBoolean",{enumerable:!0,get:function(){return XX.isBoolean}});var ZX=GW();Object.defineProperty(_,"isDate",{enumerable:!0,get:function(){return ZX.isDate}});var QX=BP();Object.defineProperty(_,"isDefined",{enumerable:!0,get:function(){return QX.isDefined}});var e9=Gu();Object.defineProperty(_,"isNil",{enumerable:!0,get:function(){return e9.isNil}});var t9=QP();Object.defineProperty(_,"isNumber",{enumerable:!0,get:function(){return t9.isNumber}});var r9=VW();Object.defineProperty(_,"isString",{enumerable:!0,get:function(){return r9.isString}});var o9=KW();Object.defineProperty(_,"isUnknown",{enumerable:!0,get:function(){return o9.isUnknown}});var n9=qW();Object.defineProperty(_,"isFunction",{enumerable:!0,get:function(){return n9.isFunction}});var s9=YW();Object.defineProperty(_,"isFile",{enumerable:!0,get:function(){return s9.isFile}});var i9=ZW();Object.defineProperty(_,"isFileList",{enumerable:!0,get:function(){return i9.isFileList}});var a9=e0();Object.defineProperty(_,"isBlob",{enumerable:!0,get:function(){return a9.isBlob}});var l9=r0();Object.defineProperty(_,"isFormData",{enumerable:!0,get:function(){return l9.isFormData}});var c9=n0();Object.defineProperty(_,"isURL",{enumerable:!0,get:function(){return c9.isURL}});var d9=i0();Object.defineProperty(_,"isURLSearchParams",{enumerable:!0,get:function(){return d9.isURLSearchParams}});var p9=a0();Object.defineProperty(_,"isMap",{enumerable:!0,get:function(){return p9.isMap}});var u9=l0();Object.defineProperty(_,"isSet",{enumerable:!0,get:function(){return u9.isSet}});var m9=c0();Object.defineProperty(_,"isIndexSignature",{enumerable:!0,get:function(){return m9.isIndexSignature}});var g9=d0();Object.defineProperty(_,"isError",{enumerable:!0,get:function(){return g9.isError}});var f9=rA();Object.defineProperty(_,"isArrayWithEachItem",{enumerable:!0,get:function(){return f9.isArrayWithEachItem}});var y9=oA();Object.defineProperty(_,"isNonEmptyArray",{enumerable:!0,get:function(){return y9.isNonEmptyArray}});var h9=p0();Object.defineProperty(_,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return h9.isNonEmptyArrayWithEachItem}});var S9=m0();Object.defineProperty(_,"isTuple",{enumerable:!0,get:function(){return S9.isTuple}});var P9=Ro();Object.defineProperty(_,"isNonNullObject",{enumerable:!0,get:function(){return P9.isNonNullObject}});var A9=g0();Object.defineProperty(_,"isObjectWithEachItem",{enumerable:!0,get:function(){return A9.isObjectWithEachItem}});var b9=f0();Object.defineProperty(_,"isPartialOf",{enumerable:!0,get:function(){return b9.isPartialOf}});var _9=y0();Object.defineProperty(_,"isPick",{enumerable:!0,get:function(){return _9.isPick}});var k9=h0();Object.defineProperty(_,"isOmit",{enumerable:!0,get:function(){return k9.isOmit}});var w9=S0();Object.defineProperty(_,"isNonEmptyString",{enumerable:!0,get:function(){return w9.isNonEmptyString}});var T9=P0();Object.defineProperty(_,"isNonNegativeNumber",{enumerable:!0,get:function(){return T9.isNonNegativeNumber}});var E9=A0();Object.defineProperty(_,"isPositiveNumber",{enumerable:!0,get:function(){return E9.isPositiveNumber}});var R9=b0();Object.defineProperty(_,"isNonPositiveNumber",{enumerable:!0,get:function(){return R9.isNonPositiveNumber}});var C9=_0();Object.defineProperty(_,"isNegativeNumber",{enumerable:!0,get:function(){return C9.isNegativeNumber}});var v9=k0();Object.defineProperty(_,"isInteger",{enumerable:!0,get:function(){return v9.isInteger}});var L9=w0();Object.defineProperty(_,"isPositiveInteger",{enumerable:!0,get:function(){return L9.isPositiveInteger}});var I9=T0();Object.defineProperty(_,"isNegativeInteger",{enumerable:!0,get:function(){return I9.isNegativeInteger}});var x9=E0();Object.defineProperty(_,"isNonNegativeInteger",{enumerable:!0,get:function(){return x9.isNonNegativeInteger}});var W9=R0();Object.defineProperty(_,"isNonPositiveInteger",{enumerable:!0,get:function(){return W9.isNonPositiveInteger}});var O9=C0();Object.defineProperty(_,"isNumeric",{enumerable:!0,get:function(){return O9.isNumeric}});var M9=v0();Object.defineProperty(_,"isBooleanLike",{enumerable:!0,get:function(){return M9.isBooleanLike}});var j9=L0();Object.defineProperty(_,"isDateLike",{enumerable:!0,get:function(){return j9.isDateLike}});var N9=I0();Object.defineProperty(_,"isBigInt",{enumerable:!0,get:function(){return N9.isBigInt}});var D9=uA();Object.defineProperty(_,"isOneOf",{enumerable:!0,get:function(){return D9.isOneOf}});var H9=W0();Object.defineProperty(_,"isOneOfTypes",{enumerable:!0,get:function(){return H9.isOneOfTypes}});var F9=O0();Object.defineProperty(_,"isIntersectionOf",{enumerable:!0,get:function(){return F9.isIntersectionOf}});var z9=M0();Object.defineProperty(_,"isExtensionOf",{enumerable:!0,get:function(){return z9.isExtensionOf}});var $9=j0();Object.defineProperty(_,"isNullOr",{enumerable:!0,get:function(){return $9.isNullOr}});var U9=N0();Object.defineProperty(_,"isUndefinedOr",{enumerable:!0,get:function(){return U9.isUndefinedOr}});var B9=D0();Object.defineProperty(_,"isNilOr",{enumerable:!0,get:function(){return B9.isNilOr}});var G9=H0();Object.defineProperty(_,"isAsserted",{enumerable:!0,get:function(){return G9.isAsserted}});var V9=F0();Object.defineProperty(_,"isEnum",{enumerable:!0,get:function(){return V9.isEnum}});var K9=z0();Object.defineProperty(_,"isEqualTo",{enumerable:!0,get:function(){return K9.isEqualTo}});var q9=$0();Object.defineProperty(_,"isRegex",{enumerable:!0,get:function(){return q9.isRegex}});var J9=B0();Object.defineProperty(_,"isPattern",{enumerable:!0,get:function(){return J9.isPattern}});var Y9=N();Object.defineProperty(_,"generateTypeGuardError",{enumerable:!0,get:function(){return Y9.generateTypeGuardError}});var X9=G0();Object.defineProperty(_,"by",{enumerable:!0,get:function(){return X9.by}});var Z9=V0();Object.defineProperty(_,"toNumber",{enumerable:!0,get:function(){return Z9.toNumber}});var Q9=K0();Object.defineProperty(_,"toDate",{enumerable:!0,get:function(){return Q9.toDate}});var eZ=q0();Object.defineProperty(_,"toBoolean",{enumerable:!0,get:function(){return eZ.toBoolean}});var tZ=J0();Object.defineProperty(_,"isSymbol",{enumerable:!0,get:function(){return tZ.isSymbol}})});var Ys,Y0,rZ,X0,Z0=l(()=>{"use strict";Ys=m(require("node:path")),Y0=require("node:url"),rZ=()=>!0,X0=()=>{if(rZ()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Ys.default.dirname(Ys.default.resolve(e)):Ys.default.dirname(Ys.default.resolve(__filename))}return Ys.default.dirname((0,Y0.fileURLToPath)(__agentWitchImportMetaUrl))}});var CA,Q0,D,eO,oZ,pr,vA,C,il,ur,LA,al,Pn,IA,xA,WA,ll,ge,Co,Lm,Ke,Im,M,OA=l(()=>{"use strict";CA=m(require("node:fs")),Q0=m(require("node:os")),D=m(require("node:path")),eO=m(Js());Ie();Z0();Cu();Cu();oZ=X0(),pr=e=>e.trim().toLowerCase(),vA=e=>pr(e).replace(/@/g,"-at-").replace(/\./g,"-").replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,""),C=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return D.default.resolve(e);let t=D.default.resolve(oZ),r=D.default.basename(t),o=D.default.basename(D.default.dirname(t));return r===FP&&(o===cr||o===Nr)?D.default.dirname(t):r===cr||r===Nr?t:D.default.join(Q0.default.homedir(),cr)},il=(e=C())=>D.default.join(e,FP),ur=(e=C())=>D.default.join(il(e),yW),LA=(e,t,r)=>t!==null?D.default.join(e,He,t,r):D.default.join(e,r),al=e=>LA(e.installDir,e.profileEmail,Ja),Pn=e=>LA(e.installDir,e.profileEmail,Ft),IA=e=>D.default.join(e.logsDir,gn),xA=e=>D.default.join(e.logsDir,fn),WA=e=>LA(e.installDir,e.profileEmail,Ya),ll=e=>e.profileEmail!==null?D.default.join(e.installDir,He,e.profileEmail,To):D.default.join(e.installDir,To),ge=(e=C())=>Xa(e),Co=(e=C())=>Eo(e)?wu:ku,Lm=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return pr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?pr(t):null},Ke=(e=C())=>{let t=D.default.join(e,HP);if(!CA.default.existsSync(t))return null;try{let r=JSON.parse(CA.default.readFileSync(t,"utf8"));if((0,eO.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return pr(r.email)}catch{return null}return null},Im=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?pr(r):null}let t=Lm();return t!==null?t:Ke()},M=e=>{let t=C(),r=il(t),o=ur(t),n=Im(e);if(n!==null){let h=D.default.join(t,He,n),y=D.default.join(h,Tu),S=D.default.join(h,Ja),u=D.default.join(h,mn.projectDataDir),A=D.default.join(h,Ft),T=D.default.join(h,Ya),P=D.default.join(h,To),b=D.default.join(h,Ft,gn),k=D.default.join(h,Ft,fn);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:S,projectDataDir:u,logsDir:A,mainLogPath:b,errorLogPath:k,reportsDir:T,deviceKeypairPath:P,configPath:D.default.join(h,"config.json"),harnessRootDir:y,harnessManifestPath:D.default.join(y,Ru),harnessSetsDir:D.default.join(y,Eu)}}let s=D.default.join(t,Tu),i=D.default.join(t,Ja),a=D.default.join(t,mn.projectDataDir),c=D.default.join(t,Ft),d=D.default.join(t,Ya),p=D.default.join(t,To),g=D.default.join(t,Ft,gn),f=D.default.join(t,Ft,fn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,projectDataDir:a,logsDir:c,mainLogPath:g,errorLogPath:f,reportsDir:d,deviceKeypairPath:p,configPath:D.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:D.default.join(s,Ru),harnessSetsDir:D.default.join(s,Eu)}}});var Xs,MA=l(()=>{"use strict";Xs=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535});var nZ,Zs,jA=l(()=>{"use strict";nZ=e=>{let t=e?.trim();if(t===void 0||!/^\d+$/.test(t))return null;let r=Number.parseInt(t,10);return r>0&&r<=65535?r:null},Zs=e=>e.filePort??nZ(e.envValue)??e.defaultPort});var NA,tO,sZ,cl,Qs,rO=l(()=>{"use strict";NA=m(require("node:fs")),tO=m(require("node:path"));Ie();OA();MA();jA();sZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cl=e=>{let t=tO.default.join(e,qa.wakePort);if(!NA.default.existsSync(t))return null;try{let r=JSON.parse(NA.default.readFileSync(t,"utf8"));if(sZ(r)&&Xs(r.wakePort))return r.wakePort}catch{return null}return null},Qs=(e=C())=>Zs({filePort:cl(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:Co(e)})});var oO={};Rt(oO,{isAgentWitchLocalInstallDir:()=>Eo,isValidAgentWitchWakePort:()=>Xs,readActiveProfileEmailFromFile:()=>Ke,readAgentWitchWakePortFromFile:()=>cl,resolveActiveProfileEmail:()=>Im,resolveActiveProfileEmailFromEnv:()=>Lm,resolveAgentWitchAppBundlePath:()=>ur,resolveAgentWitchAppDir:()=>il,resolveAgentWitchDefaultWakePort:()=>Co,resolveAgentWitchDeviceKeypairPath:()=>ll,resolveAgentWitchErrorLogPath:()=>xA,resolveAgentWitchInstallDir:()=>C,resolveAgentWitchLaunchAgentPrefix:()=>ge,resolveAgentWitchLocalLayout:()=>M,resolveAgentWitchLogsDir:()=>Pn,resolveAgentWitchMainLogPath:()=>IA,resolveAgentWitchProjectsDir:()=>al,resolveAgentWitchReportsDir:()=>WA,resolveAgentWitchRuntimeWakePort:()=>Qs,resolveAgentWitchWakePortFromSources:()=>Zs,sanitizeProfileEmailForDir:()=>pr,sanitizeProfileEmailForLaunchAgentLabel:()=>vA});var G=l(()=>{"use strict";OA();MA();rO();jA()});var DA,HA,xm=l(()=>{"use strict";DA=new Set(["","loginwindow","_mbsetupuser","root"]),HA=5e3});var nO,iZ,sO,FA,zA=l(()=>{"use strict";nO=require("node:child_process");xm();iZ=e=>e.trim().toLowerCase(),sO=e=>e==null?!1:!DA.has(iZ(e)),FA=()=>{if(process.platform!=="darwin")return null;try{let t=(0,nO.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return sO(t)?t:null}catch{return null}}});var aO,iO,zt,dl=l(()=>{"use strict";aO=m(require("node:os"));zA();iO=e=>e.trim().toLowerCase(),zt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?FA():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??aO.default.userInfo().username;return iO(r)===iO(o)}});var lO,cO,An,dO=l(()=>{"use strict";lO=require("node:child_process"),cO=m(require("node:fs"));G();dl();An=(e=C())=>{let t=ur(e);if(!cO.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!zt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Ke(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,lO.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var pO,pl,Wm=l(()=>{"use strict";pO=require("node:child_process"),pl=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,pO.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Om,$A,uO,de,Mm,ul=l(()=>{"use strict";Om=m(require("node:fs")),$A=m(require("node:path"));G();Ie();uO=e=>{let t=$A.default.join(e,He);return Om.default.existsSync(t)?Om.default.readdirSync(t).filter(r=>Om.default.statSync($A.default.join(t,r)).isDirectory()).map(r=>pr(r)).toSorted():[]},de=(e=C())=>{let t=ge(e),r=uO(e);return[{profileEmail:Ke(e)??r[0]??null,launchAgentLabel:t}]},Mm=(e=C())=>uO(e)});var UA,mO,gO,aZ,Dr,jm=l(()=>{"use strict";UA=m(require("node:fs")),mO=m(require("node:os")),gO=m(require("node:path"));G();ul();aZ=()=>gO.default.join(mO.default.homedir(),"Library","LaunchAgents"),Dr=(e=C())=>{let t=ge(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of de(e))r.add(n.launchAgentLabel);let o=aZ();if(UA.default.existsSync(o))for(let n of UA.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var fO,ml,yO=l(()=>{"use strict";G();Wm();jm();ul();fO=(e=C())=>{let t=new Set(de(e).map(r=>r.launchAgentLabel));return Dr(e).filter(r=>!t.has(r))},ml=(e=C())=>{for(let t of fO(e))pl(t)}});var gl,BA=l(()=>{"use strict";G();Wm();jm();gl=(e=C())=>{for(let t of Dr(e))pl(t)}});var hO,SO,lZ,bn,PO=l(()=>{"use strict";hO=require("node:child_process"),SO=require("node:util"),lZ=(0,SO.promisify)(hO.execFile),bn=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await lZ("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var _n,cZ,GA,VA=l(()=>{"use strict";_n=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cZ=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,GA=e=>{let t=e.pathValue??cZ(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${_n(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${_n(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${_n(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${_n(e.homeDir)}</string>
    <key>PATH</key>
    <string>${_n(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${_n(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${_n(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var Nm,KA=l(()=>{"use strict";Nm=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var fl,qA,Dm,Hm,Hr,Fm=l(()=>{"use strict";fl=m(require("node:fs")),qA=m(require("node:os")),Dm=m(require("node:path"));Ie();G();VA();KA();Hm=(e,t=qA.default.homedir())=>Dm.default.join(t,"Library","LaunchAgents",`${e}.plist`),Hr=e=>{let t=e.installDir??C(),r=e.homeDir??qA.default.homedir(),o=Hm(e.launchAgentLabel,r),n=fl.default.existsSync(o)?fl.default.readFileSync(o,"utf8"):null;if(n!==null&&Nm(n))return{ok:!0,rewritten:!1,plistPath:o};let s=GA({launchAgentLabel:e.launchAgentLabel,runPath:Dm.default.join(t,fW,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??Qs(t)});if(!Nm(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{fl.default.mkdirSync(Dm.default.dirname(o),{recursive:!0}),fl.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var bO,_O,kO,yl,dZ,pZ,AO,qe,JA=l(()=>{"use strict";bO=require("node:child_process"),_O=m(require("node:fs")),kO=require("node:util");G();Fm();dl();yl=(0,kO.promisify)(bO.execFile),dZ=async e=>{try{return await yl("launchctl",["print",e]),!0}catch{return!1}},pZ=async(e,t,r)=>{await dZ(t)&&await yl("launchctl",["bootout",t]).catch(()=>{}),await yl("launchctl",["bootstrap",e,r]),await yl("launchctl",["enable",t])},AO=async e=>{try{return await yl("launchctl",["kickstart","-k",e]),!0}catch{return!1}},qe=async(e,t=C())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!zt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=Hr({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await AO(n))return{ok:!0};let i=s.plistPath;if(!_O.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await pZ(o,n,i),await AO(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var kn,wO=l(()=>{"use strict";G();JA();ul();kn=async(e=C())=>{let t=[];for(let r of de(e))(await qe(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var zm,ei,TO,EO,RO,CO=l(()=>{"use strict";zm=require("node:child_process"),ei=m(require("node:fs")),TO="EnvironmentVariables.AGENT_WITCH_WAKE_PORT",EO=e=>{try{return(0,zm.execFileSync)("plutil",["-extract",TO,"raw","-o","-",e],{encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim()}catch{return null}},RO=(e,t)=>{let r=`${e}.${String(process.pid)}.wake-port.tmp`,{mode:o}=ei.default.statSync(e);try{ei.default.copyFileSync(e,r),(0,zm.execFileSync)("plutil",["-replace",TO,"-string",String(t),r],{stdio:"ignore"}),(0,zm.execFileSync)("plutil",["-lint","-s",r],{stdio:"ignore"}),ei.default.chmodSync(r,o&4095),ei.default.renameSync(r,e)}finally{ei.default.rmSync(r,{force:!0})}}});var vO,LO=l(()=>{"use strict";G();vO=e=>Xs(e.filePort)?e.plistValue===null?{kind:"skip-no-entry"}:e.plistValue.trim()===String(e.filePort)?{kind:"noop"}:{kind:"sync",wakePort:e.filePort}:{kind:"skip-invalid"}});var IO,xO,uZ,hl,WO=l(()=>{"use strict";IO=m(require("node:fs")),xO=m(require("node:os"));CO();LO();Fm();uZ=(e,t)=>{let r=vO({filePort:t,plistValue:EO(e)});return r.kind!=="sync"?!1:(RO(e,r.wakePort),!0)},hl=e=>{let t=e.homeDir??xO.default.homedir();return[e.launchAgentPrefix,`${e.launchAgentPrefix}-wake`,`${e.launchAgentPrefix}-live`].map(o=>Hm(o,t)).filter(o=>IO.default.existsSync(o)).filter(o=>uZ(o,e.wakePort))}});var ht,Fr,OO=l(()=>{"use strict";BA();dl();xm();ht=e=>{zt()||(gl(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Fr=(e,t=HA)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{zt()||e()},t);return()=>{clearInterval(r)}}});var ie=l(()=>{"use strict";_W();dO();Wm();yO();BA();jm();dl();PO();wO();JA();Fm();KA();WO();VA();ul();zA();xm();OO()});var YA=l(()=>{"use strict";ie()});var MO,jO,$m,NO,ti,DO,HO,wn=l(()=>{"use strict";MO=".agent-witch",jO="memory",$m="project.json",NO="chunks.ndjson",ti="runs.ndjson",DO="reports",HO=".json"});var FO=l(()=>{"use strict";wn()});var zO,Um,XA=l(()=>{"use strict";zO=m(require("node:path"));FO();Um=(e,t)=>zO.default.join(e.trim(),`${t.trim()}${HO}`)});var Sl,$O,UO=l(()=>{"use strict";Sl="agent-witch.js",$O="command"});var Bm=l(()=>{"use strict";UO()});var Tn,BO,GO=l(()=>{"use strict";Bm();Tn=e=>`'${e.replace(/'/g,"'\\''")}'`,BO=e=>{let t=`${e.installDir.trim()}/${"app"}/${Sl}`,r=[Tn("node"),Tn(t),"report","write","--key",Tn(e.reportKey.trim()),"--agent-run-id",Tn(e.agentRunId.trim()),"--status",Tn(e.status),"--summary",Tn(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Tn(e.details.trim())),r.join(" ")}});var mr,VO,mZ,ZA,Gm=l(()=>{"use strict";XA();GO();mr={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},VO=e=>e===mr.COMPLETED||e===mr.FAILED,mZ=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),ZA=(e,t)=>{let r=Um(t.reportsDir,t.reportKey),o=BO({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:mr.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${mZ({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Je=l(()=>{"use strict";Ie();G()});var Al,qO,KO,JO,gZ,ri,fZ,YO,bl,_l,QA,XO,ZO,kl=l(()=>{"use strict";Al=m(require("node:fs")),qO=m(require("node:path"));Gm();XA();Je();KO=50,JO=e=>{let t=M(),r=Um(t.reportsDir,e);return Al.default.mkdirSync(qO.default.dirname(r),{recursive:!0}),r},gZ=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},ri=e=>{let t=JO(e);if(!Al.default.existsSync(t))return null;try{let r=JSON.parse(Al.default.readFileSync(t,"utf8"));return gZ(r)?r:null}catch{return null}},fZ=(e,t)=>{let r=[...e,t];return r.length>KO?r.slice(r.length-KO):r},YO=e=>{let t=JO(e.reportKey);Al.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},bl=e=>{let t=ri(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:fZ(t?.history??[],o)};return YO(n),n},_l=e=>{let t=ri(e.reportKey);return t!==null?t:bl({reportKey:e.reportKey,agentRunId:e.agentRunId,status:mr.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},QA=(e,t)=>{let r=t.trim();if(r.length===0)return ri(e);let o=ri(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return YO(s),s},XO=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},ZO=e=>{if(e===null||!VO(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===mr.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var yZ,hZ,wl,QO,Vm,eb=l(()=>{"use strict";Gm();kl();yZ=new Set(Object.values(mr)),hZ=e=>yZ.has(e),wl=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},QO=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Vm=e=>{if(e[0]!=="write")return QO(),1;let r=wl(e,"--key"),o=wl(e,"--agent-run-id"),n=wl(e,"--status"),s=wl(e,"--summary"),i=wl(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!hZ(n)?(QO(),1):(bl({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var St,En=l(()=>{"use strict";St=()=>!0});var tb,eM,Rn,Km=l(()=>{"use strict";tb=m(require("node:path")),eM=require("node:url");En();Rn=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=tb.default.resolve(t);return St()?r===tb.default.resolve(__filename):e===void 0?!1:r===(0,eM.fileURLToPath)(e)}});var qm,oi,AZ,_ge,ni=l(()=>{"use strict";qm="agent-witch.js",oi="deps.tar.gz",AZ="install.sh",_ge={mainScript:`app/${qm}`,depsArchive:`app/${oi}`,installShell:AZ}});var nM=l(()=>{"use strict";ni()});var sM=l(()=>{"use strict";ni();nM()});var Tl,ob,Jm,bZ,El,Ye,ii,Rl,Cl,Cn,nb=l(()=>{"use strict";Tl=m(require("node:fs")),ob=m(require("node:path"));sM();G();Jm="install-version.json",bZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),El=(e=C())=>ob.default.join(e,Jm),Ye=(e=C())=>{let t=El(e);if(!Tl.default.existsSync(t))return null;try{let r=JSON.parse(Tl.default.readFileSync(t,"utf8"));return!bZ(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},ii=(e,t=C())=>{let r=El(t);Tl.default.mkdirSync(ob.default.dirname(r),{recursive:!0}),Tl.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Rl=(e=C())=>Ye(e)?.bundleVersion??"262",Cl=(e,t)=>{let r=Ye(e);if(r!==null)return r;let o={bundleVersion:"262",appOrigin:t,updatedAt:new Date().toISOString()};return ii(o,e),o},Cn=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var iM,vn,sb,ib,ab,Ym,gr,Ln,lb=l(()=>{"use strict";iM=require("node:crypto"),vn=m(require("node:fs")),sb=m(require("node:path"));G();ib="self-update-log.ndjson",ab=100,Ym=(e=C())=>{let t=M(),r=t.installDir===e?t.logsDir:Pn({installDir:e,profileEmail:t.profileEmail});return sb.default.join(r,ib)},gr=(e,t=C())=>{let r={id:(0,iM.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Ym(t);vn.default.mkdirSync(sb.default.dirname(o),{recursive:!0});let n=vn.default.existsSync(o)?vn.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-ab+1)),JSON.stringify(r)];return vn.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Ln=(e=20,t=C())=>{let r=Ym(t);if(!vn.default.existsSync(r))return[];let o=vn.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var cb,Hge,db=l(()=>{"use strict";ni();cb="deps",Hge=`${"app"}/${oi}`});var aM=l(()=>{"use strict";db()});var lM,vo,In,cM,pb,ub,dM=l(()=>{"use strict";lM=require("node:child_process"),vo=m(require("node:fs")),In=m(require("node:path"));ni();db();cM=e=>In.default.join(e,"app",cb),pb=e=>{let t=In.default.join(e,"app"),r=In.default.join(t,oi);vo.default.existsSync(r)&&(vo.default.rmSync(cM(e),{recursive:!0,force:!0}),vo.default.mkdirSync(t,{recursive:!0}),(0,lM.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),vo.default.rmSync(r,{force:!0}))},ub=e=>{vo.default.rmSync(In.default.join(e,"node_modules"),{recursive:!0,force:!0}),vo.default.rmSync(In.default.join(e,"package.json"),{force:!0}),vo.default.rmSync(In.default.join(e,"package-lock.json"),{force:!0})}});var pM=l(()=>{"use strict";aM();dM()});var vl,Ll=l(()=>{"use strict";vl="agent-witch.service"});var uM=l(()=>{"use strict";Ll()});var Xm,Zm,Qm=l(()=>{"use strict";Xm="AGENT_WITCH_EXTERNAL_BRIDGE",Zm="AGENT_WITCH_EXTERNAL_LIVE"});var mM=l(()=>{"use strict";Qm();Ll()});var gM,mb,fM=l(()=>{"use strict";gM=require("node:child_process");Ll();mb=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,gM.spawn)("systemctl",["--user","restart",vl],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${vl} exited ${o??"unknown"}`))})})});var yM=l(()=>{"use strict";Ll();uM();mM();fM()});var Pt,eg,hM=l(()=>{"use strict";Pt="https://www.agentwitch.com",eg="wss://www.agentwitch.com/api/agent-witch/ws"});var Il,zr,SM=l(()=>{"use strict";Il="127.0.0.1",zr=`http://${Il}:43347`});var Ct=l(()=>{"use strict";hM();SM()});var xl,tg,PM,fb,kZ,AM,Sb,bM,$t,Wl,Ol,Pb,yb,hb,Ml,jl,Ab,bb,ai=l(()=>{"use strict";xl=m(require("node:fs")),tg=m(require("node:path")),PM="active-writer-work.json",fb=new Set,kZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),AM=e=>e.profileEmail===null?tg.default.join(e.installDir,PM):tg.default.join(e.installDir,"profiles",e.profileEmail,PM),Sb=e=>{let t=AM(e);if(!xl.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(xl.default.readFileSync(t,"utf8"));return!kZ(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},bM=(e,t)=>{let r=AM(e);xl.default.mkdirSync(tg.default.dirname(r),{recursive:!0}),xl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},$t=e=>Sb(e).activeCount>0,Wl=e=>{let t=Sb(e);bM(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},Ol=e=>{let t=Sb(e),r=Math.max(0,t.activeCount-1);if(bM(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of fb)o()},Pb=e=>(fb.add(e),()=>{fb.delete(e)}),yb=null,hb=null,Ml=e=>{yb=e},jl=e=>{hb=e},Ab=()=>{let e=yb;return yb=null,e},bb=()=>{let e=hb;return hb=null,e}});var Fe,rg=l(()=>{"use strict";Fe=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var li,og,Nl,_b=l(()=>{"use strict";li="qwen2.5:7b",og="nomic-embed-text",Nl="Install Ollama from https://ollama.com/download"});var Dl,kb,ng=l(()=>{"use strict";_b();Dl=()=>`
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
    echo "Ollama is missing. ${Nl}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${Nl}" >&2
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
  agent_witch_ensure_ollama_model "${li}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${og}" "\${pull_log}"
}
`,kb=()=>`
${Dl()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var _M,wZ,sg,wb=l(()=>{"use strict";_M=require("node:child_process");G();ng();wZ=e=>new Promise(t=>{let r=(0,_M.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:C()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),sg=async(e=wZ)=>{let t=`${Dl()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var Lo,ig,kM,TZ,wM,di,EZ,RZ,CZ,ci,xn,Wn,TM=l(()=>{"use strict";Lo=m(require("node:fs")),ig=m(require("node:path"));pM();yM();ie();G();ni();Ct();nb();ai();rg();lb();wb();kM=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),TZ=e=>{let t=Ke(e),r=t===null?M():M(t);if(!Lo.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Lo.default.readFileSync(r.configPath,"utf8"));return!kM(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},wM=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!kM(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},di=async e=>(await wM(e))?.bundleVersion??null,EZ=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=ig.default.join(t,r);Lo.default.mkdirSync(ig.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());Lo.default.writeFileSync(n,s),r.endsWith(".js")&&Lo.default.chmodSync(n,493)},RZ=async()=>{if(process.platform==="linux"){try{await mb()}catch(e){let t=e instanceof Error?e.message:String(e);console.warn(`[agent-witch-self-update] Linux service restart skipped: ${t}`)}return}ml(),await kn()},CZ=(e,t)=>e!==null?Fe(e):t??Pt,ci=(e,t)=>({localBundleVersion:t,...e}),xn=async e=>{let t=C(),r=Ye(t),o=r?.bundleVersion??null,n=await sg();gr({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=TZ(t),i=CZ(s,r?.appOrigin);if(i===null){let d=ci({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return gr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await wM(i);if(a===null){let d=ci({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return gr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||Cn(o,a.bundleVersion))){let d=ci({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return gr({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let f of a.scripts)await EZ(i,t,f);let d=ig.default.join(t,qm);Lo.default.existsSync(d)&&Lo.default.rmSync(d,{force:!0}),pb(t),ub(t),ii({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=M(Ke(t));if($t(p)){jl("install-bundle-update");let f=ci({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return gr({event:"update_applied",ok:!0,message:f.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),f}await RZ();let g=ci({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return gr({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",g=ci({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return gr({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}},Wn=()=>{let e=C();return{local:Ye(e),logs:Ln(20,e)}}});var EM={};Rt(EM,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>Jm,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Nl,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>og,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>li,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>ib,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>ab,appendAgentWitchSelfUpdateLog:()=>gr,buildAgentWitchEnsureOllamaShell:()=>Dl,buildAgentWitchInstallScriptOllama:()=>kb,buildAgentWitchSelfUpdateStatus:()=>Wn,ensureAgentWitchInstallVersionRecorded:()=>Cl,ensureAgentWitchOllamaInstalled:()=>sg,fetchAgentWitchRemoteInstallBundleVersion:()=>di,isRemoteAgentWitchBundleVersionNewer:()=>Cn,readAgentWitchInstallVersion:()=>Ye,readAgentWitchSelfUpdateLogs:()=>Ln,resolveAgentWitchAppOriginFromWsUrl:()=>Fe,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Rl,resolveAgentWitchInstallVersionPath:()=>El,resolveAgentWitchSelfUpdateLogPath:()=>Ym,runAgentWitchSelfUpdate:()=>xn,writeAgentWitchInstallVersion:()=>ii});var fr=l(()=>{"use strict";nb();lb();TM();rg();_b();ng();wb()});var Tb={};Rt(Tb,{buildAgentWitchSelfUpdateStatus:()=>Wn,fetchAgentWitchRemoteInstallBundleVersion:()=>di,runAgentWitchSelfUpdate:()=>xn});var Eb=l(()=>{"use strict";fr()});function pi(e){return(0,RM.createHash)("sha256").update(e.trim()).digest("hex")}var RM,ag=l(()=>{"use strict";RM=require("node:crypto")});var ui,Hl,vZ,mi,Rb,lg=l(()=>{"use strict";ui=m(require("node:fs")),Hl=m(require("node:path"));ag();Je();vZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mi=e=>{if(!ui.default.existsSync(e))return null;try{let t=JSON.parse(ui.default.readFileSync(e,"utf8"));return!vZ(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:pi(t.pairingToken.trim())}catch{return null}},Rb=(e=C())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(mi(Hl.default.join(e,"config.json")));let n=Hl.default.join(e,He);if(!ui.default.existsSync(n))return t;for(let s of ui.default.readdirSync(n)){let i=Hl.default.join(n,s);ui.default.statSync(i).isDirectory()&&o(mi(Hl.default.join(i,"config.json")))}return t}});var gi,Fl=l(()=>{"use strict";gi="connection-health.json"});var On,cg,LZ,zl,ve,Cb,dg,ze,pg=l(()=>{"use strict";On=m(require("node:fs")),cg=m(require("node:path"));Fl();LZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zl=e=>e.profileEmail===null?cg.default.join(e.installDir,gi):cg.default.join(e.installDir,"profiles",e.profileEmail,gi),ve=e=>{let t=zl(e);if(!On.default.existsSync(t))return null;try{let r=JSON.parse(On.default.readFileSync(t,"utf8"));return!LZ(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},Cb=e=>{let t=zl(e);On.default.existsSync(t)&&On.default.rmSync(t,{force:!0})},dg=(e,t)=>{let r=zl(e),o=ve(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};On.default.mkdirSync(cg.default.dirname(r),{recursive:!0}),On.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},ze=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var $l,CM=l(()=>{"use strict";Fl();pg();$l=(e,t)=>{if(!t.socketOpen)return!1;let r=ve(e);return r===null?!1:!ze(r,t.staleAfterMs??12e4,t.nowMs)}});var vb,vM=l(()=>{"use strict";pg();vb=(e,t)=>!(e!==null&&!ze(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Mn=l(()=>{"use strict";pg();CM();vM();Fl()});var ug,Lb,IZ,xZ,LM,IM=l(()=>{"use strict";ug=m(require("node:fs")),Lb=m(require("node:path"));G();Ie();Mn();lg();IZ=12e4,xZ=e=>{let t=Lb.default.join(e,He);return ug.default.existsSync(t)?ug.default.readdirSync(t).filter(r=>ug.default.statSync(Lb.default.join(t,r)).isDirectory()):[]},LM=(e=C())=>{let t=null,r=-1;for(let o of xZ(e)){let n=M(o),s=ve(n);if(s===null||ze(s,IZ))continue;let i=mi(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var Ib,xM,mg,Ul,Bl,WZ,OZ,MZ,WM,_e,ke,gg,yr,Ut=l(()=>{"use strict";Ib=m(require("node:fs")),xM=m(require("node:os")),mg=m(require("node:path")),Ul={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Bl=e=>e.trim().length>0,WZ=e=>{let t=mg.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},OZ=()=>{let e=xM.default.homedir(),t=mg.default.join(e,".local","bin","agent");if(Ib.default.existsSync(t))return t;let r=mg.default.join(e,".local","bin","cursor-agent");return Ib.default.existsSync(r)?r:Ul.cursorCommand},MZ=e=>{let t=e.trim();return!Bl(t)||t===Ul.cursorCommand?OZ():t},WM=(e,t)=>WZ(e)?t:["agent",...t],_e=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ke=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:Bl(t)?t.trim():Ul.claudeCommand,codexCommand:Bl(r)?r.trim():Ul.codexCommand,cursorCommand:MZ(o),antigravityCommand:Bl(n)?n.trim():Ul.antigravityCommand}},gg=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:WM(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},yr=(e,t,r,o)=>{let n=t.trim();if(!Bl(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:WM(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"--dangerously-skip-permissions","-p",n]}}});var Io,jZ,jn,NZ,fi,Gl=l(()=>{"use strict";Io=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,jZ=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:Io(s.inputTokens)+Io(s.outputTokens)+Io(s.cacheReadInputTokens)+Io(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},jn=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=Io(a.input_tokens)+Io(a.cache_creation_input_tokens)+Io(a.cache_read_input_tokens),d=Io(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:jZ(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},NZ=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),fi=(e,t)=>{let r=jn(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??NZ(r)}}});var xb,DZ,HZ,Wb,Ob=l(()=>{"use strict";xb=e=>e.toLocaleString("en-US"),DZ=e=>e<.01?e.toFixed(4):e.toFixed(3),HZ=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${DZ(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${xb(e.inputTokens)} in / ${xb(e.outputTokens)} out (${xb(e.totalTokens)} total)`,t].join(`
`)},Wb=(e,t)=>{if(t===void 0)return e;let r=HZ(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var fg,Mb=l(()=>{"use strict";fg={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Nn,jb,yg,Nb=l(()=>{"use strict";Mb();Nn="auto",jb=e=>({value:Nn,label:`Auto (${fg[e]})`}),yg={anthropic:[jb("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[jb("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[jb("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var yi,Vl,hg,hi=l(()=>{"use strict";Mb();Nb();yi=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Nn))return t},Vl=(e,t)=>{let r=yi(t);return r===void 0?fg[e]:r},hg=e=>{let t=yi(e);return t===void 0?Nn:t}});var Sg,FZ,zZ,Pg,OM=l(()=>{"use strict";Sg={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},FZ=e=>{let t=Sg[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Sg["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Sg["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Sg["gemini-2.0-flash"]:null},zZ=(e,t,r)=>{let o=FZ(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},Pg=e=>{let t=zZ(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Si,$Z,UZ,BZ,Ag,MM=l(()=>{"use strict";OM();Si=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),$Z=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Si(r.input_tokens),n=Si(r.output_tokens);return o===0&&n===0?null:Pg({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},UZ=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Si(r.prompt_tokens),n=Si(r.completion_tokens);return o===0&&n===0?null:Pg({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},BZ=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=Si(r.promptTokenCount),n=Si(r.candidatesTokenCount);return o===0&&n===0?null:Pg({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Ag=(e,t,r)=>e==="anthropic"?$Z(t,r):e==="openai"?UZ(t,r):BZ(t,r)});var GZ,Db,VZ,KZ,qZ,JZ,YZ,Hb,Fb=l(()=>{"use strict";hi();MM();GZ=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},Db=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Vl(e,t.model)},VZ=async e=>{let t=Db("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=GZ(o);n.length>0&&e.onChunk?.(n);let s=Ag("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},KZ=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},qZ=async e=>{let t=Db("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=KZ(o);n.length>0&&e.onChunk?.(n);let s=Ag("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},JZ=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},YZ=async e=>{let t=Db("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=JZ(n);s.length>0&&e.onChunk?.(s);let i=Ag("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},Hb=async e=>{try{return e.provider==="anthropic"?await VZ(e):e.provider==="openai"?await qZ(e):await YZ(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var At,Kl=l(()=>{"use strict";At=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var jM,XZ,bg,zb=l(()=>{"use strict";jM=m(require("node:path")),XZ="writer-api-secrets.json",bg=e=>jM.default.join(e,XZ)});var $b,NM,ZZ,xo,lt,Wo=l(()=>{"use strict";$b=m(require("node:fs"));hi();zb();NM=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ZZ=e=>{if(!NM(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=yi(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},xo=e=>{let t=bg(e);if(!$b.default.existsSync(t))return{};try{let r=JSON.parse($b.default.readFileSync(t,"utf8"));if(!NM(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=ZZ(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},lt=(e,t)=>xo(e)[t]??null});var Xe,ql=l(()=>{"use strict";Xe=e=>e==="api"?"api":"cli"});var DM,Ue,Dn,$r=l(()=>{"use strict";DM=m(require("node:path"));Kl();Wo();ql();Ue=e=>DM.default.dirname(e),Dn=(e,t)=>{if(Xe(e.writerExecutionBackend)!=="api")return!1;let r=At(t);if(r===null)return!1;let o=Ue(e.layout.configPath),n=lt(o,r);return n!==null&&n.apiKey.length>0}});var Jl,Ub=l(()=>{"use strict";Ob();Fb();Kl();Wo();$r();Jl=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=At(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Ue(e.layout.configPath),a=lt(i,s);if(a===null){let d=Object.keys(xo(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await Hb({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:Wb(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var HM,Pi,Bb=l(()=>{"use strict";HM=require("node:child_process");Ut();Gl();Ub();$r();Pi=(e,t,r)=>new Promise(o=>{if(!_e(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(Dn(e,t)){Jl(e,t,r).then(o);return}let n=yr(t,r,ke({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,HM.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=fi(i.join("")),p=a.join("").trim(),g=[d.output.trim(),p].filter(f=>f.length>0).join(`
`);o({exitCode:c??-1,output:g})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var FM=l(()=>{"use strict"});var zM=l(()=>{"use strict";Ob();Bb();Fb();FM();Wo();$r()});var $M,UM,BM,GM=l(()=>{"use strict";$M="claude",UM="codex",BM="cursor"});var VM,QZ,Gb,Yl,_g=l(()=>{"use strict";VM=m(require("node:path"));Ct();Ie();QZ="ws://localhost:3000/api/agent-witch/ws",Gb=e=>e.replace(/\/$/,""),Yl=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return Gb(t);let r=VM.default.basename(e.installDir);if(r===Ka.production)return eg;let o=e.configWsUrl?.trim()??"";return r===Ka.localhost?o.length>0?Gb(o):QZ:o.length>0?Gb(o):eg}});var tQ,Vb,Kb=l(()=>{"use strict";GM();_g();ql();tQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Vb=e=>{if(!tQ(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Yl({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??$M,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??UM,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??BM,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Xe(t.writerExecutionBackend),layout:e.layout}}}});var qb,Jb,Yb=l(()=>{"use strict";qb=m(require("node:fs"));G();Kb();Jb=e=>{let t=M(e);if(!qb.default.existsSync(t.configPath))return null;try{let r=JSON.parse(qb.default.readFileSync(t.configPath,"utf8")),o=Vb({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Xl,KM=l(()=>{"use strict";Xl=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var Xb,rQ,Zb,qM=l(()=>{"use strict";Xb=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rQ=e=>{if(!Xb(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!Xb(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(g=>{if(!Xb(g))return[];let f=typeof g.itemKey=="string"?g.itemKey.trim():"",h=typeof g.relativePath=="string"?g.relativePath:"",y=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return f.length===0||y.length===0?[]:[{itemKey:f,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},Zb=rQ});var JM,oQ,kg,Qb=l(()=>{"use strict";JM=m(require("node:path")),oQ=(e,t)=>{let r=t.trim();return JM.default.join(e,"components","store",r.slice(0,2),r)},kg=oQ});var YM,nQ,e_,XM=l(()=>{"use strict";YM=m(require("node:fs"));Qb();nQ=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=kg(e.installDir,n.contentSha256);YM.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},e_=nQ});var Zl,Ai,sQ,t_,iQ,r_,o_=l(()=>{"use strict";Zl=m(require("node:fs")),Ai=m(require("node:path"));Qb();sQ=(e,t)=>Ai.default.join(e.installDir,"runs",t,"overlay"),t_=(e,t)=>Ai.default.join(sQ(e,t),".cursor"),iQ=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=t_(e,t);Zl.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=kg(e.installDir,i.contentSha256);if(!Zl.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Ai.default.join(n,c):Ai.default.join(n,i.itemKey);Zl.default.mkdirSync(Ai.default.dirname(d),{recursive:!0}),Zl.default.copyFileSync(a,d)}return{ok:!0}},r_=iQ});var n_,ZM,aQ,Ql,QM=l(()=>{"use strict";n_=m(require("node:fs")),ZM=m(require("node:path")),aQ=(e,t)=>{let r=ZM.default.join(e.installDir,"runs",t);n_.default.existsSync(r)&&n_.default.rmSync(r,{recursive:!0,force:!0})},Ql=aQ});var lQ,s_,ej=l(()=>{"use strict";o_();lQ=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=t_(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},s_=lQ});var i_,cQ,dQ,pQ,uQ,mQ,H,tj=l(()=>{"use strict";i_=m(require("node:fs"));_g();G();ql();cQ="claude",dQ="codex",pQ="cursor",uQ="agy",mQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H=()=>{let e=M();if(!i_.default.existsSync(e.configPath))return null;try{let t=JSON.parse(i_.default.readFileSync(e.configPath,"utf8"));if(!mQ(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Yl({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Xe(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:cQ,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:dQ,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:pQ,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:uQ,pairingToken:s,layout:e}}catch{return null}}});var wg,rj,oj=l(()=>{"use strict";wg=m(require("node:fs"));zb();rj=(e,t)=>{let r=bg(e);wg.default.mkdirSync(e,{recursive:!0}),wg.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{wg.default.chmodSync(r,384)}catch{}}});var ec,nj,Tg=l(()=>{"use strict";ec=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},nj=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===ec(t)}});var tc,gQ,a_,l_,sj=l(()=>{"use strict";tc=m(require("node:fs"));Wo();oj();Tg();hi();$r();gQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),a_=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=nj(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?yi(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},l_=e=>{let t=Ue(e.configPath),r={};if(tc.default.existsSync(e.configPath))try{let n=JSON.parse(tc.default.readFileSync(e.configPath,"utf8"));gQ(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,tc.default.mkdirSync(t,{recursive:!0}),tc.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=a_(a_(a_(xo(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);rj(t,o)}});var Eg,c_=l(()=>{"use strict";Eg={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var d_,ij=l(()=>{"use strict";Kl();Wo();$r();$r();d_=(e,t)=>{if(Dn(e,t)||t==="antigravity")return!1;let r=At(t);if(r===null)return!1;let o=Ue(e.layout.configPath),n=lt(o,r);return n===null||n.apiKey.trim().length===0}});var aj,p_,u_=l(()=>{"use strict";aj=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},p_=async e=>{let t=aj(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=aj(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var fQ,m_,lj=l(()=>{"use strict";ie();Yb();u_();fQ=1e4,m_=()=>p_({listProfileEmails:Mm,readConfig:Jb,pollIntervalMs:fQ,logWaiting:e=>{console.error(e)}})});var yQ,g_,cj=l(()=>{"use strict";yQ={accepted:"Restart accepted; Local is restarting.",already_in_progress:"Restart already in progress.",deferred_writer_busy:"Restart deferred until the active writer task finishes.",unsupported:"This Agent Witch Local cannot handle Connect/restart. Update from /download."},g_=e=>({status:e.status,reason:e.reason,message:yQ[e.status]})});var ee=l(()=>{"use strict";Bb();zM();Yb();_g();KM();qM();XM();o_();QM();ej();ql();tj();sj();Wo();$r();Tg();hi();c_();Ub();$r();ij();Kl();Wo();lj();Kb();u_();cj()});var dj,f_,pj=l(()=>{"use strict";dj=m(require("node:path"));G();Ie();IM();ag();lg();ee();f_=(e=C())=>{let t=LM(e);if(t!==null)return t;let r=Ke(e);if(r!==null){let n=mi(dj.default.join(e,He,r,"config.json"));if(n!==null)return n}let o=H()?.pairingToken.trim()??"";return o.length===0?null:pi(o)}});var Rg,uj,hQ,SQ,mj,Cg,rc,vg,oc=l(()=>{"use strict";Rg=m(require("node:fs")),uj=m(require("node:path")),hQ="wake-port.json",SQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mj=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Cg=e=>uj.default.join(e,hQ),rc=e=>{let t=Cg(e);if(!Rg.default.existsSync(t))return null;try{let r=JSON.parse(Rg.default.readFileSync(t,"utf8"));if(SQ(r)&&mj(r.wakePort))return r.wakePort}catch{return null}return null},vg=(e,t)=>{if(!mj(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Cg(e);Rg.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var BSe,GSe,VSe,Bt,gj,nc=l(()=>{"use strict";G();oc();Je();oc();BSe=Co(),GSe=`${ge()}-wake`,VSe=ge(),Bt=()=>{let e=C();return Zs({filePort:rc(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:Co(e)})},gj=e=>{let t=C();rc(t)===null&&vg(t,e)}});var fj=l(()=>{"use strict";ag();ie();lg();pj();ee();nc()});var y_,sc,ic,yj=l(()=>{"use strict";y_=m(require("node:os"));fj();sc=()=>{let e=de();return{ok:!0,port:Bt(),hostname:y_.default.hostname(),profileCount:e.length}},ic=()=>{let e=de(),t=f_(),r=Rb();return{hostname:y_.default.hostname(),port:Bt(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var h_=l(()=>{"use strict";yj()});var hj,Sj,Pj,Lg,bi=l(()=>{"use strict";hj="materialization.json",Sj="backups",Pj=".gitignore",Lg=e=>`harness-set:${e.trim()}`});var Aj,bj,Ig,_j=l(()=>{"use strict";Aj=m(require("node:crypto")),bj=m(require("node:fs")),Ig=e=>{try{let t=bj.default.readFileSync(e);return Aj.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Oo,Hn,PQ,kj,S_,wj=l(()=>{"use strict";Oo=m(require("node:fs")),Hn=m(require("node:path"));_j();PQ=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=Hn.default.join(t,n,o);return Oo.default.mkdirSync(Hn.default.dirname(s),{recursive:!0}),Oo.default.copyFileSync(r,s),Hn.default.relative(e,s).replaceAll("\\","/")},kj=e=>{let t=Hn.default.join(e.repoRoot,e.repoRelativeDestination),r=Ig(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(Oo.default.existsSync(t)){let n=Ig(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=PQ(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Oo.default.mkdirSync(Hn.default.dirname(t),{recursive:!0}),Oo.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Oo.default.mkdirSync(Hn.default.dirname(t),{recursive:!0}),Oo.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},S_=e=>{let t=Ig(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var P_,Tj,_i,xg=l(()=>{"use strict";P_=m(require("node:fs"));bi();Tj=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_i=e=>{if(!P_.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(P_.default.readFileSync(e,"utf8"));if(Tj(t)&&t.version===1&&Tj(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var Mo,Wg,Og,A_=l(()=>{"use strict";Mo=m(require("node:fs")),Wg=m(require("node:path"));bi();Og=e=>{let t=new Set(e.setSlugs.map(s=>Lg(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=Wg.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=Wg.default.join(e.repoRoot,i.backupPath);Mo.default.existsSync(c)?(Mo.default.mkdirSync(Wg.default.dirname(a),{recursive:!0}),Mo.default.copyFileSync(c,a),o.push(s)):Mo.default.existsSync(a)&&Mo.default.rmSync(a,{force:!0})}else Mo.default.existsSync(a)&&Mo.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var b_,ki,Mg=l(()=>{"use strict";b_=m(require("node:path"));bi();ki=e=>({ledgerFilePath:b_.default.join(e.metaDirPath,hj),backupsDirPath:b_.default.join(e.metaDirPath,Sj)})});var __,Ej,Rj=l(()=>{"use strict";__=m(require("node:path")),Ej=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return __.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return __.default.posix.join(s,e,n)}});var k_,Cj,lc,w_=l(()=>{"use strict";k_=m(require("node:fs")),Cj=m(require("node:path")),lc=(e,t)=>{k_.default.mkdirSync(Cj.default.dirname(e),{recursive:!0}),k_.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var T_,AQ,Ze,jo=l(()=>{"use strict";T_=m(require("node:os")),AQ=e=>{let t=e.trim();return t.startsWith("~/")?`${T_.default.homedir()}${t.slice(1)}`:t==="~"?T_.default.homedir():t},Ze=AQ});var jg,vj,bQ,Lj,Ij=l(()=>{"use strict";jg=m(require("node:fs")),vj=m(require("node:path"));bi();wn();bQ=`*
!${$m}
`,Lj=e=>{let t=vj.default.join(e,Pj);jg.default.existsSync(t)||(jg.default.mkdirSync(e,{recursive:!0}),jg.default.writeFileSync(t,bQ))}});var Fn,vt,zn=l(()=>{"use strict";Fn=m(require("node:path"));wn();jo();vt=e=>{let t=Ze(e),r=Fn.default.join(t,MO);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Fn.default.join(r,"rag"),memoryDirPath:Fn.default.join(r,jO),reportsDirPath:Fn.default.join(r,DO),metaFilePath:Fn.default.join(r,$m),ragChunksFilePath:Fn.default.join(r,"rag",NO)}}});var hr,Wj,_Q,kQ,st,Ng=l(()=>{"use strict";hr=m(require("node:fs")),Wj=m(require("node:path"));wn();Ij();zn();_Q=(e,t)=>{if(hr.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};hr.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},kQ=e=>{hr.default.existsSync(e.ragChunksFilePath)||hr.default.writeFileSync(e.ragChunksFilePath,"");let t=Wj.default.join(e.memoryDirPath,ti);hr.default.existsSync(t)||hr.default.writeFileSync(t,"")},st=e=>{let t=vt(e.projectFolderPath);return hr.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),hr.default.mkdirSync(t.ragDirPath,{recursive:!0}),hr.default.mkdirSync(t.memoryDirPath,{recursive:!0}),Lj(t.metaDirPath),_Q(t,e),kQ(t),{ok:!0,layout:t}}});var Oj,Mj,jj,Nj,Dg,Hg=l(()=>{"use strict";Oj="components",Mj="store",jj="versions",Nj="installed.json",Dg=e=>`harness-set:${e.trim()}`});var E_,Dj,Fg,R_=l(()=>{"use strict";E_=m(require("node:fs")),Dj=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Fg=e=>{if(!E_.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(E_.default.readFileSync(e,"utf8"));if(Dj(t)&&t.version===1&&Dj(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var cc,wi,zg=l(()=>{"use strict";cc=m(require("node:path"));Hg();wi=e=>{let t=cc.default.join(e,Oj);return{componentsRootDir:t,storeDir:cc.default.join(t,Mj),versionsDir:cc.default.join(t,jj),installedFilePath:cc.default.join(t,Nj)}}});var C_,Hj,$g,Ug,Bg=l(()=>{"use strict";C_=m(require("node:crypto")),Hj=m(require("node:fs")),$g=e=>C_.default.createHash("sha256").update(e,"utf8").digest("hex"),Ug=e=>{try{let t=Hj.default.readFileSync(e);return C_.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var v_,Fj,zj,$j=l(()=>{"use strict";v_=m(require("node:fs")),Fj=m(require("node:path")),zj=(e,t)=>{v_.default.mkdirSync(Fj.default.dirname(e),{recursive:!0}),v_.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var L_,I_,Uj,Bj=l(()=>{"use strict";L_=m(require("node:fs")),I_=m(require("node:path")),Uj=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=I_.default.join(e,r),n=I_.default.join(o,`${t.versionId}.json`);L_.default.mkdirSync(o,{recursive:!0}),L_.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var Gg,Gj,Vj,Kj=l(()=>{"use strict";Gg=m(require("node:fs")),Gj=m(require("node:path"));Bg();Vj=e=>{let t=$g(e.content),r=Gj.default.join(e.storeDir,t);return Gg.default.existsSync(r)||(Gg.default.mkdirSync(e.storeDir,{recursive:!0}),Gg.default.writeFileSync(r,e.content)),t}});var x_,qj,wQ,Vg,W_=l(()=>{"use strict";x_=m(require("node:fs")),qj=m(require("node:path"));Hg();R_();zg();Bg();$j();Bj();Kj();wQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Vg=e=>{let t=wi(e.installDir),r=Dg(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!wQ(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=qj.default.join(e.harnessRootDir,a);if(!x_.default.existsSync(c))continue;let d=x_.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Ug(c);if(p!==null){if($g(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);Vj({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;Uj(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=Fg(t.installedFilePath);zj(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var M_,O_,Jj,Yj=l(()=>{"use strict";M_=m(require("node:fs"));W_();R_();zg();O_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Jj=e=>{if(!M_.default.existsSync(e.harnessManifestPath))return;let t=wi(e.installDir),r=Fg(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(M_.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!O_(o)||o.version!==1||!O_(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!O_(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Vg({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var j_,Xj,Zj,Qj=l(()=>{"use strict";j_=m(require("node:fs")),Xj=m(require("node:path")),Zj=e=>{let t=e.componentId.replaceAll("/","_"),r=Xj.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!j_.default.existsSync(r))return null;try{let o=JSON.parse(j_.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Kg,qg,eN,tN=l(()=>{"use strict";Kg=m(require("node:fs")),qg=m(require("node:path"));Hg();Yj();Qj();zg();Bg();eN=e=>{Jj({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=wi(e.layout.installDir),r=Dg(e.setSlug),o=Zj({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=qg.default.join(t.storeDir,i.contentSha256);if(Kg.default.existsSync(a)&&Ug(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?qg.default.join(e.layout.harnessRootDir,n):qg.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Kg.default.existsSync(s))return null;try{if(!Kg.default.statSync(s).isFile())return null}catch{return null}return s}});var rN,TQ,N_,Sr,dc=l(()=>{"use strict";xg();Mg();zn();rN="harness-set:",TQ=e=>{let t=e.trim();if(!t.startsWith(rN))return null;let r=t.slice(rN.length).trim();return r.length>0?r:null},N_=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=TQ(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Sr=e=>{let t=vt(e),{ledgerFilePath:r}=ki(t),o=_i(r);return N_(o)}});var Jg,D_,pc,EQ,Ur,uc,Ti=l(()=>{"use strict";Jg=m(require("node:fs")),D_=m(require("node:os")),pc=m(require("node:path")),EQ=()=>Jg.default.realpathSync(pc.default.resolve(D_.default.homedir())),Ur=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?pc.default.join(D_.default.homedir(),t.slice(1)):t,o;try{o=Jg.default.realpathSync(pc.default.resolve(r))}catch{return null}let n=EQ();return o===n||o.startsWith(`${n}${pc.default.sep}`)?o:null},uc=e=>{let t=Ur(e);if(t===null)return null;try{if(!Jg.default.statSync(t).isFile())return null}catch{return null}return t}});var H_,F_=l(()=>{"use strict";H_=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Xg,oN,Yg,RQ,mc,z_=l(()=>{"use strict";Xg=m(require("node:fs")),oN=m(require("node:path"));bi();wj();xg();A_();Mg();Rj();w_();jo();Ng();tN();dc();Ti();F_();Yg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),RQ=e=>{if(!Xg.default.existsSync(e))return null;try{let t=JSON.parse(Xg.default.readFileSync(e,"utf8"));if(Yg(t)&&t.version===1)return t}catch{return null}return null},mc=e=>{let t=[...new Set(e.setSlugs.map(A=>A.trim()).filter(A=>A.length>0))],r=Ze(e.projectFolderPath),o=Ur(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Xg.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=st({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=ki(s.layout),d=Sr(o).filter(A=>!t.includes(A)),p=_i(i),g=0;if(d.length>0){let A=Og({repoRoot:o,setSlugs:d,ledger:p});p=A.ledger,g=A.summary.removedPaths.length}if(t.length===0)return lc(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:[]};let f=RQ(e.layout.harnessManifestPath);if(f===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=Yg(f.sets)?f.sets:{},y=0,S=0,u=0;for(let A of t){let T=h[A];if(!Yg(T))return{ok:!1,errorMessage:`Harness set "${A}" is not installed locally.`};let P=typeof T.version=="number"?String(T.version):"1",b=Lg(A),k=Array.isArray(T.items)?T.items:[];for(let E of k){if(!Yg(E))continue;let w=typeof E.path=="string"?E.path.trim():"";if(w.length===0)continue;let x=H_(w);if(x===null)continue;let I=Ej(A,x),j=oN.default.posix.join(".cursor",I).replaceAll("\\","/"),O=typeof E.id=="string"?E.id.trim():"",$=eN({layout:e.layout,setSlug:A,setVersion:typeof T.version=="number"?T.version:1,manifestItemPath:w,manifestItemId:O});if($===null)continue;let B=kj({repoRoot:o,backupsDir:a,repoRelativeDestination:j,sourceAbsolutePath:$,componentId:b,versionId:P,ledger:p});if(B.kind==="skipped_unchanged"){S+=1;continue}if(B.kind==="backed_up_user_file"){u+=1,y+=1,p={version:1,entries:{...p.entries,[j]:S_({componentId:b,versionId:P,sourceAbsolutePath:$,backupPath:B.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[j]:S_({componentId:b,versionId:P,sourceAbsolutePath:$})}}}}return y===0&&S===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(lc(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:S,backedUpFileCount:u,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:t})}});var nN,Zg,CQ,vQ,LQ,IQ,xQ,WQ,OQ,MQ,jQ,gc,Qg=l(()=>{"use strict";nN=m(require("node:crypto")),Zg=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},CQ=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},vQ=(e,t)=>{let r=CQ(t),o=Zg(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},LQ=(e,t,r)=>{let o=vQ(t,r);return`shared/items/${e}/${o}`},IQ=["rules","skills","commands","instructions","agents"],xQ=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),WQ=(e,t)=>[...e.filter(o=>o.id!==t.id),t],OQ=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},MQ=e=>nN.default.createHash("sha256").update(e,"utf8").digest("hex"),jQ=e=>({id:e.id,kind:e.kind,title:e.title,path:LQ(e.id,e.kind,e.title),contentSha256:MQ(e.content)}),gc=e=>{let t=new Date().toISOString(),r=e.existingManifest??xQ(e.hostname,t),o=Zg(e.bundle.slug),n=OQ(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...IQ.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let g=jQ(p);return{files:[...d.files,{relativePath:g.path,content:p.content}],nextItems:WQ(d.nextItems,g)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var No,sN,ef,NQ,$n,$_=l(()=>{"use strict";No=m(require("node:fs")),sN=m(require("node:os")),ef=m(require("node:path"));Qg();NQ=e=>{if(!No.default.existsSync(e))return null;try{let t=JSON.parse(No.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},$n=e=>{try{let t=NQ(e.layout.harnessManifestPath),r=gc({bundle:e.bundle,hostname:sN.default.hostname(),existingManifest:t});No.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)No.default.mkdirSync(ef.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=ef.default.join(e.layout.harnessRootDir,o.relativePath);No.default.mkdirSync(ef.default.dirname(n),{recursive:!0}),No.default.writeFileSync(n,o.content)}return No.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var U_,iN=l(()=>{"use strict";$_();z_();U_=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=$n({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return mc({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var aN,lN=l(()=>{"use strict";aN=["rule","skill","command","instruction","agent"]});var cN,DQ,HQ,Pr,B_=l(()=>{"use strict";lN();cN=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),DQ=e=>typeof e=="string"&&aN.includes(e),HQ=e=>{if(!cN(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!DQ(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Pr=e=>{if(!cN(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=HQ(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var dN,FQ,G_,pN=l(()=>{"use strict";dN=require("node:zlib");B_();FQ="x-agent-witch-token",G_=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[FQ]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,dN.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=Pr(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var K_,V_,Ar,uN=l(()=>{"use strict";K_=m(require("node:fs")),V_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ar=e=>{if(!K_.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(K_.default.readFileSync(e.harnessManifestPath,"utf8"));if(!V_(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=V_(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!V_(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var tf,mN=l(()=>{"use strict";tf=()=>"~"});var gN,fN,yN=l(()=>{"use strict";gN=require("node:crypto"),fN=e=>`local-${(0,gN.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var q_,hN=l(()=>{"use strict";q_=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var fc,rf,J_=l(()=>{"use strict";fc=m(require("node:path")),rf=e=>{let t=fc.default.dirname(e),r=fc.default.basename(t);return r==="agents"?fc.default.basename(fc.default.dirname(t)):r}});var yc,Br,SN,zQ,$Q,UQ,of,PN,Y_=l(()=>{"use strict";yc=m(require("node:fs")),Br=m(require("node:path"));yN();hN();J_();SN=new Set(["node_modules",".git","dist","build",".next","coverage"]),zQ=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},$Q=(e,t)=>{let r=Br.default.basename(t);if(e==="skill"){let o=t.split(Br.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},UQ=e=>{let t=[],r=(n,s)=>{let i;try{i=yc.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&SN.has(a.name))continue;let c=Br.default.join(n,a.name),d=s?Br.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;q_(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=Br.default.join(e,n);yc.default.existsSync(s)&&r(s,n)}let o=Br.default.join(e,"skills");return yc.default.existsSync(o)&&r(o,"skills"),t},of=e=>{let t=UQ(e);if(t.length===0)return null;let r=Br.default.dirname(e),o=rf(e),n=zQ(o),s=t.map(i=>{let a=q_(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:fN(i.absolutePath),kind:a,title:$Q(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},PN=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=yc.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||SN.has(a.name))continue;let c=Br.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var AN,X_,BQ,Z_,bN=l(()=>{"use strict";AN=m(require("node:fs")),X_=m(require("node:path"));Y_();Ti();BQ=e=>{let t=Ur(e.trim());if(t===null)return null;if(X_.default.basename(t)===".cursor")return t;let r=X_.default.join(t,".cursor");try{if(AN.default.statSync(r).isDirectory())return Ur(r)}catch{return null}return null},Z_=e=>{let t=BQ(e.projectPath);if(t===null)return null;let r=of(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var _N,GQ,nf,Q_,kN=l(()=>{"use strict";_N=m(require("node:path"));Y_();Ti();J_();GQ=5,nf=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},Q_=e=>{let t=Ur(e.scanRoot.trim());if(t===null)return nf(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of PN(t,GQ,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=Ur(s);if(i===null)continue;let a=rf(i);nf(e.response,"folder",{cursorDir:i,groupName:a,repoPath:_N.default.dirname(i)});let c=of(i);c!==null&&(r.push(c),nf(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return nf(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var wN,TN,EN=l(()=>{"use strict";wN=m(require("node:path")),TN=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:wN.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var it,RN,ek,VQ,tk,rk,sf,ok,hc,CN=l(()=>{"use strict";it=m(require("node:fs")),RN=m(require("node:os")),ek=m(require("node:path"));Qg();W_();Ti();EN();VQ=e=>{if(!it.default.existsSync(e))return null;try{let t=JSON.parse(it.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},tk=e=>{let t=e.hostname??RN.default.hostname(),r=VQ(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let g=uc(p.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let f=it.default.readFileSync(g,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:f,setSlugs:[i.slug]})}let d=gc({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{it.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)it.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=ek.default.join(e.layout.harnessRootDir,i.relativePath);it.default.mkdirSync(ek.default.dirname(a),{recursive:!0}),it.default.writeFileSync(a,i.content)}it.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=Zg(i.slug),d=r.sets[c];d!==void 0&&Vg({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},rk="reveal-cache.json",sf=(e,t)=>{it.default.mkdirSync(e.harnessRootDir,{recursive:!0}),it.default.writeFileSync(`${e.harnessRootDir}/${rk}`,`${JSON.stringify(t,null,2)}
`)},ok=e=>{let t=`${e.harnessRootDir}/${rk}`;it.default.existsSync(t)&&it.default.unlinkSync(t)},hc=e=>{let t=`${e.harnessRootDir}/${rk}`;if(!it.default.existsSync(t))return null;try{let r=JSON.parse(it.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return TN(r)}catch{return null}return null}});var Do=l(()=>{"use strict";z_();iN();F_();$_();pN();B_();Qg();uN();mN();bN();Ti();kN();CN()});var nk,vN=l(()=>{"use strict";Do();Je();nk=e=>{let t=M(e.profileEmail);return $n({bundle:e.bundle,layout:t})}});var LN=l(()=>{"use strict";vN();Do()});var KQ,IN,qQ,xN,Un,af,WN=l(()=>{"use strict";KQ=["agentwitch.com","www.agentwitch.com"],IN=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,qQ=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},xN=e=>{let t=qQ(e);return!!(KQ.includes(t)||IN.test(e.trim().toLowerCase()))},Un=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return xN(r)?IN.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},af=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Un(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Sc=l(()=>{"use strict";WN()});var Gr,Pc=l(()=>{"use strict";Gr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Ac,ON=l(()=>{"use strict";LN();Sc();Pc();Ac=e=>{if(!Gr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Pr(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Un(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=nk({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var sk=l(()=>{"use strict";ON()});var JQ,Ei,ik=l(()=>{"use strict";JQ=e=>e==="hourly"||e==="daily"||e==="weekdays",Ei=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!JQ(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var bc,lf,MN,jN,ak,Gt,cf,df,pf,uf,mf=l(()=>{"use strict";bc=m(require("node:fs")),lf=m(require("node:path"));ik();MN="automations.json",jN=e=>e.profileEmail!==null?lf.default.join(e.installDir,"profiles",e.profileEmail,MN):lf.default.join(e.installDir,MN),ak=()=>({version:1,automations:[]}),Gt=e=>{let t=jN(e);if(!bc.default.existsSync(t))return ak();try{let r=JSON.parse(bc.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?ak():{version:1,automations:r.automations.flatMap(n=>{let s=Ei(n);return s!==null?[s]:[]})}}catch{return ak()}},cf=(e,t)=>{let r=jN(e);bc.default.mkdirSync(lf.default.dirname(r),{recursive:!0}),bc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},df=(e,t)=>{cf(e,{version:1,automations:t})},pf=(e,t)=>{let o=Gt(e).automations.filter(n=>n.id!==t.id);cf(e,{version:1,automations:[...o,t]})},uf=(e,t)=>Gt(e).automations.find(r=>r.id===t)??null});var ae,Lt=l(()=>{"use strict";ae="x-agent-witch-token"});var lk=l(()=>{"use strict";rg();ng()});var V,Bn,ck,_c,dk,YQ,pk,kc,Gn,uk,Vr=l(()=>{"use strict";Lt();lk();V=e=>{let t=Fe(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Bn=e=>({[ae]:e,"Content-Type":"application/json"}),ck=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Bn(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},_c=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Bn(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},dk=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Bn(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},YQ=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},pk=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:Bn(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},kc=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:Bn(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return YQ(r)}catch{return null}},Gn=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:Bn(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},uk=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Bn(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var Vn,NN,DN,XQ,mk,HN,gk=l(()=>{"use strict";Vn=m(require("node:fs")),NN=m(require("node:path")),DN=e=>NN.default.join(e.harnessRootDir,"projects-registry.json"),XQ=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),mk=e=>{let t=DN(e);if(!Vn.default.existsSync(t))return[];try{let r=JSON.parse(Vn.default.readFileSync(t,"utf8"));return XQ(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},HN=e=>{let t=DN(e);if(!Vn.default.existsSync(t))return;let r=`${t}.migrated`;if(Vn.default.existsSync(r)){Vn.default.unlinkSync(t);return}Vn.default.renameSync(t,r)}});var FN,ZQ,QQ,zN,$N=l(()=>{"use strict";jo();FN=e=>Ze(e),ZQ=e=>new Set(e.map(t=>FN(t.folderPath))),QQ=e=>new Set(e.map(t=>t.id)),zN=(e,t)=>{let r=ZQ(t),o=QQ(t),n=[],s=new Set;for(let i of e){let a=FN(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var fk,yk=l(()=>{"use strict";Vr();gk();$N();fk=async(e,t)=>{let r=mk(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=V({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await kc(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=zN(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await pk(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&HN(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var hk,Vt,Ri=l(()=>{"use strict";hk=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),Vt=(e,t)=>e.find(r=>r.id===t)??null});var br,Ci=l(()=>{"use strict";Vr();yk();Ri();br=async(e,t)=>{t!==void 0&&await fk(t,e);let r=V({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await kc(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=hk(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var UN=l(()=>{"use strict"});var Sk,eee,gf,Pk=l(()=>{"use strict";Sk=m(require("node:fs"));zn();eee=e=>{let t=vt(e);if(!Sk.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(Sk.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},gf=eee});var Ak,bk,BN=l(()=>{"use strict";Ak=m(require("node:path"));jo();Pk();bk=e=>{let t=Ak.default.resolve(Ze(e)),r=o=>{let{projectId:n}=gf(o);if(n!==null)return n;let s=Ak.default.dirname(o);return s===o?null:r(s)};return r(t)}});var tee,ree,ff,_k=l(()=>{"use strict";tee="Default",ree=e=>e.trim().toLowerCase()===tee.toLowerCase(),ff=ree});var kk,wk,Tk,we,Ek=l(()=>{"use strict";kk=["block","warn","info"],wk=["seed","project","retired"],Tk="warn",we={symptom:120,cause:200,avoidance:280,checkValue:280,keyword:40,keywords:24,tag:32,tags:12,id:64}});var Rk,Kr,GN,VN,Ck,Ho,KN=l(()=>{"use strict";Ek();Rk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Kr=e=>typeof e=="string"?e:null,GN=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],VN=e=>{if(!Rk(e))return null;let t=Kr(e.id)?.trim()??"",r=Kr(e.symptom)?.trim()??"";if(t.length===0||r.length===0)return null;let o=wk.find(d=>d===e.source)??"project",n=kk.find(d=>d===e.severity)??Tk,s=Rk(e.check)?e.check:null,i=s?.kind==="command"?"command":"id",a=Kr(s?.value)?.trim()??"",c=Kr(e.projectId)?.trim()??null;return{id:t,projectId:c!==null&&c.length>0?c:null,symptom:r,cause:Kr(e.cause)?.trim()??"",avoidance:Kr(e.avoidance)?.trim()??"",check:{kind:i,value:a.length>0?a:t},keywords:GN(e.keywords),tags:GN(e.tags),source:o,overridesSeed:e.overridesSeed===!0,hitCount:typeof e.hitCount=="number"&&Number.isFinite(e.hitCount)?Math.max(0,Math.floor(e.hitCount)):0,lastSeenAt:Kr(e.lastSeenAt),updatedAt:Kr(e.updatedAt),severity:n}},Ck=e=>!Rk(e)||!Array.isArray(e.pitfalls)?null:{items:e.pitfalls.map(t=>VN(t)).filter(t=>t!==null),syncedAt:Kr(e.syncedAt)},Ho=e=>e.filter(t=>t.source!=="retired").length});var Kn,vk=l(()=>{"use strict";Kn=e=>e.replace(/\s+/g," ").trim()});var Fo,Lk=l(()=>{"use strict";Fo=e=>Math.ceil(e.length/4)});var yf,qN=l(()=>{"use strict";Lk();yf=(e,t)=>{if(t<=0)return"";if(Fo(e)<=t)return e;let r=t*4;return e.slice(0,r).trimEnd()}});var wc,JN=l(()=>{"use strict";vk();wc=e=>`${Kn(e.id)}|${Kn(e.avoidance)}`});var YN=l(()=>{"use strict"});var Kt=l(()=>{"use strict";Ek();KN();vk();Lk();qN();JN();YN()});var hf,Sf,Pf=l(()=>{"use strict";hf={save:"/project/pitfalls/save",retire:"/project/pitfalls/retire",restore:"/project/pitfalls/restore"},Sf=e=>{let t=Object.entries(hf).find(([,r])=>r===e);return t===void 0?null:t[0]}});var XN,fe,QN,nee,Ik,xk,ZN,see,iee,Tc,Wk,aee,lee,cee,eD,tD=l(()=>{"use strict";Kt();Pf();XN="new",fe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),QN={block:"Must fix",warn:"Warning",info:"Note"},nee={seed:"Built-in",project:"This project",retired:"Retired"},Ik=6e4,xk=60*Ik,ZN=24*xk,see=(e,t)=>{if(e===null)return"Never hit";let r=new Date(e).getTime();if(Number.isNaN(r))return"Never hit";let o=Math.max(0,t-r);if(o<Ik)return"Last hit just now";if(o<xk)return`Last hit ${Math.floor(o/Ik)} min ago`;if(o<ZN)return`Last hit ${Math.floor(o/xk)}h ago`;let n=Math.floor(o/ZN);return n<30?`Last hit ${n} ${n===1?"day":"days"} ago`:`Last hit ${new Date(r).toISOString().slice(0,10)}`},iee=e=>{if(e===null)return"Not updated yet";let t=new Date(e).getTime();return Number.isNaN(t)?"Not updated yet":`Updated ${new Date(t).toISOString().slice(0,10)}`},Tc=(e,t)=>`/project?${new URLSearchParams({id:e,tab:"pitfalls",...t}).toString()}`,Wk=e=>e?{retired:"1"}:{},aee=e=>{let{item:t}=e,r=t?.severity??"warn",o=t?.check.kind==="command"?t.check.value:"",n=t===null?"Add pitfall":"Edit pitfall",s=t?.source==="seed"?'<p class="muted">This is a built-in pitfall. Your changes apply to this project only.</p>':"",i=a=>`<option value="${a}"${r===a?" selected":""}>${QN[a]}</option>`;return`<form method="POST" action="${e.postPaths.save}" class="stack pitfall-form" aria-label="${n}" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
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
        <a class="btn btn-secondary" href="${fe(Tc(e.projectId,Wk(e.showRetired)))}">Cancel</a>
      </div>
    </form>`},lee=e=>{let{item:t,projectId:r,showRetired:o}=e,n=t.source==="retired",s=`<input type="hidden" name="projectId" value="${fe(r)}" />
            <input type="hidden" name="pitfallId" value="${fe(t.id)}" />
            ${o?'<input type="hidden" name="showRetired" value="1" />':""}`,i=n?`<form method="POST" action="${e.postPaths.restore}" class="inline-form" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-secondary btn-compact" type="submit">Bring back</button>
          </form>`:`<a class="btn btn-secondary btn-compact" href="${fe(Tc(r,{...Wk(o),edit:t.id}))}">Edit</a>
          <form method="POST" action="${e.postPaths.retire}" class="inline-form" onsubmit="if(!confirm('Retire this pitfall? You can bring it back later.'))return false;this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-danger btn-compact" type="submit">Retire</button>
          </form>`,a=t.keywords.length>0?`<p class="muted">Triggers: ${t.keywords.map(c=>fe(c)).join(", ")}</p>`:"";return`<li class="harness-installed-set pitfall-row${n?" pitfall-row-retired":""}" data-pitfall-id="${fe(t.id)}">
        <p><strong>${fe(t.symptom)}</strong> <span class="muted">\xB7 ${QN[t.severity]} \xB7 ${nee[t.source]}</span></p>
        <p>Fix: ${fe(t.avoidance)}</p>
        ${a}
        <p class="muted">${fe(see(t.lastSeenAt,e.nowMs))}</p>
        <p class="muted">${fe(iee(t.updatedAt))}</p>
        <div class="actions">${i}</div>
      </li>`},cee=e=>{let t=e.postPaths??hf;if(e.list===null||!e.list.ok)return'<p class="empty">Could not load pitfalls. Check this Mac on Status, then reload.</p>';let r=e.nowMs??Date.now(),o=e.list.items,n=Ho(o),s=n>=64,i=e.showRetired?o:o.filter(f=>f.source!=="retired"),a=e.editId===null?null:e.editId===XN?s?null:{item:null}:(()=>{let f=o.find(h=>h.id===e.editId&&h.source!=="retired");return f===void 0?null:{item:f}})(),c=a===null?"":aee({projectId:e.projectId,item:a.item,showRetired:e.showRetired,postPaths:t}),d=s?`<p class="muted">${64} of ${64} active. Retire one to add another.</p>`:`<a class="btn btn-primary" href="${fe(Tc(e.projectId,{...Wk(e.showRetired),edit:XN}))}">Add pitfall</a>`,p=e.showRetired?`<a class="btn btn-secondary" href="${fe(Tc(e.projectId,{}))}">Hide retired</a>`:`<a class="btn btn-secondary" href="${fe(Tc(e.projectId,{retired:"1"}))}">Show retired</a>`,g=i.length===0?'<p class="empty">No pitfalls for this project. Add one when you spot a mistake that keeps coming back.</p>':`<ul class="harness-installed-set-list">${i.map(f=>lee({projectId:e.projectId,item:f,showRetired:e.showRetired,nowMs:r,postPaths:t})).join("")}</ul>`;return`<section class="stack">
      <p class="lede">Pitfalls are known traps in this project. Each one says what goes wrong and how to avoid it.</p>
      <p class="muted">${n} of ${64} active</p>
      <div class="actions">${a===null?d:""}${p}</div>
      ${c}
      ${g}
    </section>`},eD=cee});var re,rD,dee,pee,uee,mee,gee,zo,Af=l(()=>{"use strict";_k();Kt();tD();re=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rD=(e,t)=>e.length===0?`<p class="empty">${re(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${re(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${re(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,dee=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,pee=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from Agent Witch Cloud.":"This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${re(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},uee=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
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
      </div>`},mee=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?uee({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?pee({project:e.project,alreadyInRepo:!1}):dee();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",a=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),p=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this Mac.');">
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
      </div>`},gee=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${re(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${re(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},zo=e=>{let t=e.flashError?`<div class="alert-error">${re(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${re(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(f,h)=>`<a class="project-tab${e.activeTab===f?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${f}">${re(h)}</a>`,n=e.composition?.items.filter(f=>f.kind==="workflow")??[],s=e.composition?.items.filter(f=>f.kind==="agent")??[],i=(()=>{switch(e.activeTab){case"harness":return mee({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0});case"workflows":return rD(n,"No workflows installed for this project yet.");case"agents":return rD(s,"No agents installed for this project yet.");case"knowledge":return gee({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});case"pitfalls":return eD({projectId:e.project.id,list:e.pitfalls??null,showRetired:e.pitfallsShowRetired??!1,editId:e.pitfallsEditId??null});default:return e.activeTab}})(),a=e.pitfalls!==void 0&&e.pitfalls!==null&&e.pitfalls.ok?`Pitfalls (${Ho(e.pitfalls.items)})`:"Pitfalls",c=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,d=`${c}?rename=1`,p=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${re(c)}" target="_blank" rel="noopener noreferrer">Open in Agent Witch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${re(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,g=ff(e.project.name)?"":`<section class="danger-zone stack">
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
    </section>${g}`}});var fee,yee,oD,nD=l(()=>{"use strict";Do();Lt();fee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yee=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!fee(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Pr(n);return s===null?[]:[s]})}catch{return null}},oD=yee});var sD,Ok,iD=l(()=>{"use strict";ee();Do();Af();Ci();nD();Ri();dc();Vr();Ct();sD=e=>({kind:"page",title:e.project.name,body:zo({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Ar(e.layout),linkedSetSlugs:Sr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),Ok=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=H();if(r===null)return{kind:"not_found"};let o=await br(r,e.layout),n=Vt(o.projects,t);if(n===null)return{kind:"not_found"};let s=V({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??Pt,a=s===null?null:await oD(s,n.id);if(a===null)return sD({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=U_({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return sD({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await Gn(s,n.id,c.appliedSetSlugs),p=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${p.toString()}`}}});var aD,Mk,lD=l(()=>{"use strict";ee();Do();Ct();Vr();Af();Ng();jo();Ci();Ri();dc();xg();A_();Mg();w_();aD=e=>({kind:"page",title:e.project.name,body:zo({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Ar(e.layout),linkedSetSlugs:Sr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),Mk=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=H();if(n===null)return{kind:"not_found"};let s=await br(n,e.layout),i=Vt(s.projects,r);if(i===null)return{kind:"not_found"};let a=V({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=a?.appOrigin??Pt;if(o.length===0)return aD({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=Ze(i.projectFolderPath),p=st({projectFolderPath:d}),{ledgerFilePath:g}=ki(p.layout),f=_i(g),h=N_(f);if(!h.includes(o))return aD({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let y=h.filter(T=>T!==o),S=Og({repoRoot:p.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:f});lc(g,S.ledger);let u=a===null?!1:await Gn(a,i.id,y),A=new URLSearchParams({linked:"1",removed:o,files:String(S.summary.removedPaths.length),bindingsSynced:u?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${A.toString()}`}}});var hee,See,cD,Pee,Aee,Ec,jk=l(()=>{"use strict";Kt();Lt();hee=1e4,See=15e3,cD=(e,t,r)=>{let o=`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/pitfalls`;return r===void 0?o:`${o}/${encodeURIComponent(r)}`},Pee=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return t.errorMessage==="limit_exceeded"||t.code==="limit_exceeded"},Aee=(e,t=fetch)=>({listPitfalls:async(r,o)=>{try{let n=new URL(cD(e.appOrigin,r));n.searchParams.set("includeRetired",o.includeRetired?"1":"0");let s=await t(n.toString(),{method:"GET",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(hee)});if(!s.ok)return{ok:!1,reason:"unavailable"};let i=Ck(await s.json());return i===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:i.items,syncedAt:i.syncedAt}}catch{return{ok:!1,reason:"unavailable"}}},upsertPitfall:async(r,o)=>{try{let n=await t(cD(e.appOrigin,r),{method:"PUT",headers:{[ae]:e.pairingToken,"content-type":"application/json"},body:JSON.stringify(o),signal:AbortSignal.timeout(See)});if(n.ok)return{ok:!0};if(n.status===409){let s=await n.json().catch(()=>null);return{ok:!1,reason:Pee(s)?"active_limit":"rejected"}}return n.status===400?{ok:!1,reason:"rejected"}:{ok:!1,reason:n.status>=500?"unavailable":"rejected"}}catch{return{ok:!1,reason:"unavailable"}}}}),Ec=Aee});var Nk,dD,bee,_ee,kee,wee,pD,uD=l(()=>{"use strict";Kt();Nk=e=>e.replace(/\s+/g," ").trim(),dD=(e,t,r)=>{let o=new Set,n=[];for(let s of e.split(/[,\n]/)){let i=Nk(s).slice(0,r).toLowerCase();i.length>0&&!o.has(i)&&(o.add(i),n.push(i))}return n.slice(0,t)},bee=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40).replace(/-+$/g,""),_ee=(e,t)=>{let r=bee(e);return`project-${r.length>0?r:"pitfall"}-${t}`.slice(0,we.id).replace(/-+$/g,"")},kee=e=>e==="block"||e==="info"?e:"warn",wee=e=>{let{form:t}=e,r=Nk(t.get("symptom")??""),o=(t.get("avoidance")??"").trim(),n=(t.get("cause")??"").trim(),s=Nk(t.get("checkCommand")??"");if(r.length===0||o.length===0||n.length===0||r.length>we.symptom||o.length>we.avoidance||n.length>we.cause||s.length>we.checkValue)return{ok:!1};let i=(t.get("pitfallId")??"").trim(),a=i.length>0?i:_ee(r,e.randomSuffix());return{ok:!0,pitfall:{id:a,symptom:r,cause:n,avoidance:o,check:s.length>0?{kind:"command",value:s}:{kind:"id",value:a},keywords:dD(t.get("keywords")??"",we.keywords,we.keyword),tags:dD(t.get("tags")??"",we.tags,we.tag),source:"project",severity:kee(t.get("severity"))}}},pD=wee});var gD,Tee,qr,mD,bf,Eee,Ree,fD,yD=l(()=>{"use strict";gD=require("node:crypto");Kt();uD();Pf();Tee=()=>(0,gD.randomBytes)(3).toString("hex"),qr=(e,t,r={})=>{let o=new URLSearchParams({tab:"pitfalls",...r,pitfall:t});return`/project?id=${encodeURIComponent(e)}&${o.toString()}`},mD=(e,t)=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:t}),bf=new Map,Eee=async(e,t)=>{let r=bf.get(e)??Promise.resolve(),o,n=new Promise(i=>{o=i}),s=r.catch(()=>{}).then(()=>n);bf.set(e,s),await r.catch(()=>{});try{return await t()}finally{o(),bf.get(e)===s&&bf.delete(e)}},Ree=async e=>{let t=(e.form.get("pitfallId")??"").trim(),r=`${e.projectId}:${t||"__new__"}`;return Eee(r,async()=>{let{projectId:o,store:n}=e,s=e.form.get("showRetired")==="1"?{retired:"1"}:{};if(n===null)return qr(o,"unavailable",s);let i=await n.listPitfalls(o,{includeRetired:!0});if(!i.ok)return qr(o,"unavailable",s);if(e.action==="save"){let d=pD({form:e.form,randomSuffix:e.randomSuffix??Tee});if(!d.ok)return qr(o,"invalid",s);let p=i.items.find(h=>h.id===d.pitfall.id);if((p===void 0||p.source==="retired")&&Ho(i.items)>=64)return qr(o,"limit",s);let f=await n.upsertPitfall(o,d.pitfall);return qr(o,f.ok?"saved":f.reason==="active_limit"?"limit":f.reason,s)}let a=i.items.find(d=>d.id===t);if(a===void 0)return qr(o,"missing",s);if(e.action==="restore"){if(a.source==="retired"&&Ho(i.items)>=64)return qr(o,"limit",s);let d=await n.upsertPitfall(o,mD(a,"project"));return qr(o,d.ok?"restored":d.reason==="active_limit"?"limit":d.reason,s)}let c=await n.upsertPitfall(o,mD(a,"retired"));return qr(o,c.ok?"retired":c.reason==="active_limit"?"limit":c.reason,s)})},fD=Ree});var _f,hD,SD,Dk=l(()=>{"use strict";_f=new Map,hD=async e=>{let t=e.nowMs??Date.now(),r=e.ttlMs??3e4,o=_f.get(e.projectId);if(o!==void 0&&o.includeRetired===e.includeRetired&&t-o.fetchedAtMs<r)return o.result;let n=await e.store.listPitfalls(e.projectId,{includeRetired:e.includeRetired});return n.ok&&_f.set(e.projectId,{result:n,includeRetired:e.includeRetired,fetchedAtMs:t}),n},SD=e=>{if(e===void 0){_f.clear();return}_f.delete(e)}});var Hk,PD=l(()=>{"use strict";ee();Vr();Ci();Ri();jk();yD();Dk();Hk=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=H();if(o===null)return{kind:"not_found"};let n=await br(o,e.layout),s=Vt(n.projects,r);if(s===null)return{kind:"not_found"};let i=V({wsUrl:o.wsUrl,pairingToken:o.pairingToken}),a=e.createStore??Ec,c=i===null?null:a(i),d=await fD({action:e.action,form:t,projectId:s.id,store:c});return SD(s.id),{kind:"redirect",location:d}}});var Cee,Fk,AD=l(()=>{"use strict";Cee=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,Fk=Cee});var bD=l(()=>{"use strict"});var _D=l(()=>{"use strict"});var kD=l(()=>{"use strict";bD();_D()});var vee,$o,wD=l(()=>{"use strict";vee=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],$o=(e=process.env)=>{let t={...e};for(let r of vee)delete t[r];return t}});var TD=l(()=>{"use strict";wD()});var zk,ED=l(()=>{"use strict";zk={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var $k=l(()=>{"use strict";ED()});var kf,Uk=l(()=>{"use strict";kf={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",DEVICE_RESTART_ACK:"device.restart.ack",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status",PROJECT_MESSAGE_HISTORY:"project.message.history"}});var wf=l(()=>{"use strict";kD();TD();Ct();$k();Uk()});var RD,CD,Lee,Tf,Ef,vD=l(()=>{"use strict";RD=require("node:child_process"),CD=require("node:util");wf();Lee=(0,CD.promisify)(RD.execFile),Tf=async(e,t)=>{try{let{stdout:r}=await Lee("git",t,{cwd:e,env:$o(),maxBuffer:1048576});return r.trim()}catch{return null}},Ef=async e=>{let t=await Tf(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await Tf(e,["rev-parse","--abbrev-ref","HEAD"]),o=await Tf(e,["status","--porcelain"]),n=await Tf(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var Bk,LD=l(()=>{"use strict";Bk=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var Iee,Gk,ID=l(()=>{"use strict";Iee=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},Gk=Iee});var xee,Vk,xD=l(()=>{"use strict";Lt();xee=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[ae]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},Vk=xee});var WD,Uo,OD=l(()=>{"use strict";WD=require("node:child_process"),Uo=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,WD.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var MD=l(()=>{"use strict";Ci()});var Rc,jD=l(()=>{"use strict";Lt();Rc=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[ae]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var Kk,ND=l(()=>{"use strict";Lt();Kk=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var DD,Wee,Jr,qk,Jk=l(()=>{"use strict";DD=e=>{let t=JSON.parse(e);return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]},Wee=e=>e===""?null:e,Jr=e=>e??"",qk=e=>({id:e.id,projectId:Wee(e.project_id),symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:{kind:e.check_kind,value:e.check_value},keywords:DD(e.keywords_json),tags:DD(e.tags_json),source:e.source,hitCount:e.hit_count,lastSeenAt:e.last_seen_at,severity:e.severity})});var HD,Oee,Mee,Yk,vi,Rf,Cc=l(()=>{"use strict";Jk();HD=`
  SELECT p.project_id, p.id, p.symptom, p.cause, p.avoidance,
    p.check_kind, p.check_value, p.keywords_json, p.tags_json,
    p.source, p.severity,
    COALESCE(h.hit_count, 0) AS hit_count,
    h.last_seen_at AS last_seen_at
  FROM pitfalls p
  LEFT JOIN pitfall_hits h
    ON h.project_id = ? AND h.pitfall_id = p.id
  WHERE p.project_id = ?`,Oee=e=>e,Mee=e=>e??null,Yk=(e,t,r=t)=>Oee(e.prepare(HD).all(Jr(r),Jr(t))).map(qk),vi=(e,t,r,o=t)=>{let n=Mee(e.prepare(`${HD} AND p.id = ?`).get(Jr(o),Jr(t),r));return n===null?null:qk(n)},Rf=(e,t)=>{e.prepare(`INSERT INTO pitfalls (
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
      severity = excluded.severity`).run(Jr(t.projectId),t.id,t.symptom,t.cause,t.avoidance,t.check.kind,t.check.value,JSON.stringify(t.keywords),JSON.stringify(t.tags),t.source,t.severity)}});var Cf,Xk=l(()=>{"use strict";Kt();Cf=e=>e.map(t=>({id:Kn(t.id),avoidance:Kn(t.avoidance)}))});var Zk,FD,vf=l(()=>{"use strict";Zk=e=>{let t=new Map;e.seeds.forEach(o=>{t.set(o.id,o)}),e.projectRows.forEach(o=>{t.set(o.id,o)});let r=[...t.values()];return e.includeRetired===!0?r:r.filter(o=>o.source!=="retired")},FD=e=>e.filter(t=>t.source!=="retired").length});var qn,zD,vc=l(()=>{"use strict";Kt();Xk();Cc();vf();qn=(e,t={})=>{let r=t.projectId??null,o=Yk(e,null,r),n=r===null||r===""?[]:Yk(e,r);return Zk({seeds:o,projectRows:n,includeRetired:t.includeRetired===!0})},zD=(e,t={})=>{let r=qn(e,t);return t.format==="bot"?{format:"bot",items:Cf(r),lines:r.map(o=>wc(o))}:{format:"full",items:r}}});var Lf,Qk=l(()=>{"use strict";Cc();vc();Lf=(e,t)=>{let r=t.id.trim();if(r.length===0)return null;let o=t.projectId??null;return o===null||o===""?vi(e,null,r):qn(e,{projectId:o,includeRetired:!0}).find(s=>s.id===r)??null}});var ew=l(()=>{"use strict"});var Bo,Li,$D,UD,BD=l(()=>{"use strict";Bo=e=>({type:"string",description:e}),Li={name:"check_context",description:"Match the current prompt against project pitfalls. Call on the first user message. Returns hit, miss, or none. Miss stays silent.",inputSchema:{type:"object",properties:{cwd:Bo("Absolute working directory for the current session."),message:Bo("User prompt or task text to match."),sessionId:Bo("Optional session id for first-message tracking."),projectId:Bo("Optional project id when already known.")},additionalProperties:!1}},$D={name:"get_context",description:"Compact project briefing: id, folder, and feature flags. Not a full docs dump.",inputSchema:{type:"object",properties:{cwd:Bo("Absolute working directory."),projectId:Bo("Optional project id when already known.")},additionalProperties:!1}},UD={name:"get_pitfalls",description:"List or search project pitfalls in a short bot-friendly form.",inputSchema:{type:"object",properties:{projectId:Bo("Project id."),q:Bo("Optional search text."),limit:{type:"number",description:"Max rows to return."}},additionalProperties:!1}}});var Jn,GD,VD,KD=l(()=>{"use strict";Jn=e=>({type:"string",description:e}),GD={name:"get_skill",description:"Read one project skill by id or search. Same idea as the cloud skill tools.",inputSchema:{type:"object",properties:{projectId:Jn("Project id."),skillId:Jn("Skill id when known."),q:Jn("Optional search text.")},required:["projectId"],additionalProperties:!1}},VD={name:"record_outcome",description:"Record whether a tip or preflight check helped. Pitfall wins call the cloud hit route.",inputSchema:{type:"object",properties:{projectId:Jn("Project id."),kind:{type:"string",description:"pitfall | preflight | other"},pitfallId:Jn("Pitfall id when kind is pitfall."),preflightId:Jn("Preflight check id when kind is preflight."),ok:{type:"boolean",description:"Whether the step helped."},notes:Jn("Optional short note. No secret values.")},required:["projectId","kind","ok"],additionalProperties:!1}}});var qD=l(()=>{"use strict";BD();KD()});var tw,JD=l(()=>{"use strict";Kt();ew();tw=e=>{let t=yf("Agent Witch tip \xB7 check_context",120);if(Fo(t)>=120)return t;let r=[t],o=Fo(t);for(let n of e){if(r.length-1>=4)break;let s=wc(n),i=Fo(s);if(o+i>120){if(r.length===1){let a=120-o,c=yf(s,a);c.length>0&&(r.push(c),o+=Fo(c));continue}continue}r.push(s),o+=i}return r.join(`
`)}});var YD=l(()=>{"use strict";Kt()});var xf=l(()=>{"use strict";ew();qD();JD();YD()});var jee,Nee,rw,ow=l(()=>{"use strict";xf();jee=e=>e.toLowerCase(),Nee=(e,t)=>{let r=jee(e);return t.reduce((o,n)=>{let s=n.trim().toLowerCase();return s.length===0?o:r.includes(s)?o+1:o},0)},rw=e=>{let t=e.pitfalls.map(r=>({pitfall:r,score:Nee(e.text,r.keywords)})).filter(r=>r.score>0).sort((r,o)=>o.score-r.score||r.pitfall.id.localeCompare(o.pitfall.id));return t.length===0?[]:t.slice(0,4).map(r=>r.pitfall)}});var XD,ZD=l(()=>{"use strict";vc();ow();XD=(e,t)=>{let r=qn(e,{projectId:t.projectId,includeRetired:!1});return rw({pitfalls:r,text:t.text})}});var Wf,Of,Mf,Ii,jf,Ic,nw=l(()=>{"use strict";Kt();Wf=we.symptom,Of=we.cause,Mf=we.avoidance,Ii=64,jf="token-saver.db",Ic=1});var QD,xc=l(()=>{"use strict";nw();QD=3e3});var eH,tH=l(()=>{"use strict";xc();eH=`
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
`});var rH,oH,nH,Dee,Hee,sH,iH,aH=l(()=>{"use strict";rH=m(require("node:fs")),oH=m(require("node:path")),nH=require("node:sqlite");xc();tH();Dee=e=>{let t=e.prepare("SELECT value FROM pitfall_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},Hee=(e,t)=>{e.prepare(`INSERT INTO pitfall_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},sH=e=>{rH.default.mkdirSync(oH.default.dirname(e),{recursive:!0});let t=new nH.DatabaseSync(e);return t.exec(`PRAGMA busy_timeout = ${QD}`),t.exec(eH),Dee(t)<Ic&&Hee(t,Ic),t},iH=e=>{e.close()}});var lH,cH,sw=l(()=>{"use strict";Jk();lH=(e,t,r,o)=>{let n=e.prepare(`INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(project_id, pitfall_id) DO UPDATE SET
         hit_count = pitfall_hits.hit_count + 1,
         last_seen_at = excluded.last_seen_at
       RETURNING hit_count, last_seen_at`).get(Jr(t),r,o);return{hitCount:n.hit_count,lastSeenAt:n.last_seen_at}},cH=(e,t,r)=>{let o=e.prepare(`SELECT hit_count, last_seen_at FROM pitfall_hits
       WHERE project_id = ? AND pitfall_id = ?`).get(Jr(t),r);return o===void 0?{hitCount:0,lastSeenAt:null}:{hitCount:o.hit_count,lastSeenAt:o.last_seen_at}}});var dH,pH=l(()=>{"use strict";Qk();sw();dH=(e,t)=>{let r=t.id.trim(),o=r.length===0?null:Lf(e,{projectId:t.projectId,id:r});if(o===null)return{ok:!1,reason:"not_found"};let n=t.nowIso??new Date().toISOString(),s=lH(e,t.projectId,o.id,n);return{ok:!0,pitfall:{...o,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt}}}});var iw,Wc,aw=l(()=>{"use strict";iw=m(require("node:path"));Ie();xc();Wc=e=>e.profileEmail!==null?iw.default.join(e.installDir,He,e.profileEmail,jf):iw.default.join(e.installDir,jf)});var mH,uH=l(()=>{mH=[{id:"arch-max-lines",symptom:"ci:architecture fails at land (handler >100 / test >100 effective lines)",cause:"Max-effective-lines=100 only enforced late",avoidance:"Run `npm run ci:architecture` before tipping Arch",check:{kind:"command",value:"npm run ci:architecture"},keywords:["architecture","land","ci:architecture","max-effective","lines"],tags:["architecture","ci"]},{id:"symlink-node-modules",symptom:'Turbopack: "points out of the filesystem root"',cause:"Mac worktree with symlinked node_modules",avoidance:"APFS clone: `cp -Rc` (not symlink) into worktree",check:{kind:"id",value:"pit.symlink-node-modules"},keywords:["build","turbopack","symlink","node_modules","filesystem root"],tags:["build"]},{id:"install-bundle-clobber",symptom:"Missing/broken public/install/agent-witch/app/deps.tar.gz or agent-witch.js after build",cause:"Build overwrites install bundle artifacts",avoidance:"Restore those two paths after `build`",check:{kind:"command",value:"test -f public/install/agent-witch/app/deps.tar.gz && test -f public/install/agent-witch/app/agent-witch.js"},keywords:["build","deps.tar.gz","agent-witch.js","install bundle","clobber"],tags:["build","awi"]},{id:"stale-next",symptom:"Typecheck fails spuriously",cause:"Stale .next",avoidance:"`rm -rf .next` then typecheck",check:{kind:"id",value:"pit.stale-next"},keywords:["build","typecheck",".next","stale","turbopack"],tags:["build"]},{id:"main-moved-rebase",symptom:"FF/SHIP fails; main advanced",cause:"main moved between SHIP and FF",avoidance:"`git fetch`; pure-rebase onto new `-rN` branch; **never** force-push",check:{kind:"id",value:"pit.main-moved-rebase"},keywords:["ship","ff","push","rebase","main moved","force-push"],tags:["git"]},{id:"health-lag",symptom:"Declare done on exit 0 / HTTP 200 too early",cause:"Deploy health lags ~1\u20132 min after push",avoidance:"Poll until health `commitSha` == main tip + smoke",check:{kind:"id",value:"pf.health-matches-main"},keywords:["ship","ff","push","health","commitSha","deploy"],tags:["deploy"]},{id:"dirty-home-checkout",symptom:"Accidental reset/clean of ~/daily-magic",cause:"Home checkout left dirty",avoidance:"Use `/tmp` worktrees; never reset/clean home",check:{kind:"id",value:"pit.dirty-home-checkout"},keywords:["reset","clean","home checkout","daily-magic","worktree"],tags:["git"]},{id:"box-no-gh-auth",symptom:"Push from box fails",cause:"Box git has no GitHub auth",avoidance:"Push from the Mac",check:{kind:"id",value:"pit.box-no-gh-auth"},keywords:["ship","ff","push","box","github","auth"],tags:["git"]},{id:"ci-yml-main-only",symptom:"Expecting GH Actions on non-main push",cause:"Old ci.yml push trigger covered only main; CI being removed \u2014 gate is local suite",avoidance:"Run local `npm run ci` (or suite subset); do not wait on Actions",check:{kind:"id",value:"pit.local-suite-gate"},keywords:["ci","actions","github actions","npm run ci","main only"],tags:["ci"]},{id:"secrets-in-logs",symptom:"Secrets printed in logs/CLI",cause:"Verbose dump of env/files",avoidance:"Print existence / path / fingerprint only",check:{kind:"id",value:"pit.secrets-in-logs"},keywords:["secrets","logs","token","keypair","env","fingerprint"],tags:["secrets"]},{id:"no-prs-daily-magic",symptom:"PR windows opened in Mac Chrome",cause:"Habit from other repos",avoidance:"No PRs for daily-magic; never open PR UI",check:{kind:"id",value:"pit.no-prs"},keywords:["pr","pull request","chrome","daily-magic"],tags:["git"]}]});var zee,$ee,lw,cw=l(()=>{"use strict";uH();zee=mH,$ee=e=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags??[],projectId:null,source:"seed",hitCount:0,lastSeenAt:null,severity:"warn"}),lw=()=>zee.map($ee)});var gH,fH=l(()=>{"use strict";cw();Cc();gH=e=>lw().reduce((r,o)=>vi(e,null,o.id)!==null?r:(Rf(e,o),r+1),0)});var yH,hH,SH=l(()=>{"use strict";xc();yH=e=>e.id.trim().length===0?{kind:"empty_id"}:e.projectId.trim().length===0?{kind:"empty_project_id"}:e.symptom.length>Wf?{kind:"field_too_long",field:"symptom",max:Wf}:e.cause.length>Of?{kind:"field_too_long",field:"cause",max:Of}:e.avoidance.length>Mf?{kind:"field_too_long",field:"avoidance",max:Mf}:null,hH=e=>e.activeCountAfter>Ii?{kind:"active_cap",max:Ii}:null});var PH,AH=l(()=>{"use strict";Cc();sw();vc();vf();SH();PH=(e,t)=>{let r=yH(t);if(r!==null)return{ok:!1,error:r};let o=t.id.trim(),n=vi(e,t.projectId,o),s=cH(e,t.projectId,o),i=t.source??"project",a={id:o,projectId:t.projectId,symptom:t.symptom,cause:t.cause,avoidance:t.avoidance,check:t.check,keywords:t.keywords,tags:t.tags??[],source:i,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt,severity:t.severity??n?.severity??"warn"},d=qn(e,{projectId:t.projectId,includeRetired:!0}).filter(f=>f.id!==a.id),p=FD([...d,a]),g=hH({activeCountAfter:p});return g!==null?{ok:!1,error:g}:(Rf(e,a),{ok:!0,pitfall:a})}});var xi,dw=l(()=>{"use strict";Qk();vc();ZD();aH();pH();aw();fH();AH();xi=e=>{let t=e.dbPath??(e.layout!==void 0?Wc(e.layout):(()=>{throw new Error("createPitfallRegistry requires dbPath or layout")})()),r=sH(t);return gH(r),{dbPath:t,listPitfalls:o=>zD(r,o),getPitfall:o=>Lf(r,o),upsertPitfall:o=>PH(r,o),recordHit:o=>dH(r,o),matchPitfalls:o=>XD(r,o),close:()=>iH(r)}}});var Uee,Bee,pw,uw=l(()=>{"use strict";xf();Xk();Uee=(e,t,r)=>{let o=t.projectId?.trim();return o!==void 0&&o.length>0?o:r===null||e.resolveProjectId===void 0?null:e.resolveProjectId(r)},Bee=(e,t,r,o)=>{for(let n of o)try{t.recordHit({projectId:r,id:n.id})}catch(s){e.logError?.(s)}},pw=(e,t)=>{try{let r=t.cwd?.trim()??"",o=r.length>0?r:null;if(o!==null&&e.isDeclined?.(o)===!0)return{status:"none"};let n=Uee(e,t,o);if(n===null||e.registry===null)return{status:"none",promptCreate:o!==null};let s=e.registry.matchPitfalls({projectId:n,text:t.message??""});if(s.length===0)return{status:"miss",projectId:n};Bee(e,e.registry,n,s);let i=Cf(s);return{status:"hit",projectId:n,pitfalls:i,tip:tw(i)}}catch(r){return e.logError?.(r),{status:"none"}}}});var mw,bH=l(()=>{"use strict";xf();mw={name:Li.name,description:Li.description,inputSchema:Li.inputSchema}});var Yn,_H,Oc,Gee,Nf,Mc=l(()=>{"use strict";Yn=m(require("node:fs")),_H=m(require("node:os")),Oc=()=>({readUtf8:e=>Yn.default.readFileSync(e,"utf8"),writeUtf8:(e,t)=>{Yn.default.writeFileSync(e,t,"utf8")},exists:e=>Yn.default.existsSync(e),mkdirp:e=>{Yn.default.mkdirSync(e,{recursive:!0})},rename:(e,t)=>{Yn.default.renameSync(e,t)},realpath:e=>Yn.default.realpathSync.native(e)}),Gee=()=>({homedir:()=>_H.default.homedir()}),Nf=()=>({...Oc(),...Gee()})});var kH,wH=l(()=>{"use strict";kH=(e,t)=>{let r=e.trim();if(r.length===0)return r;try{return t.exists(r)?t.realpath(r):r}catch{return r}}});var Xn,Wi,Oi,TH,EH,RH,CH,vH,LH,gw,jc,Df,Hf,fw,kr=l(()=>{"use strict";Xn="agent-witch-token-saver",Wi=`# BEGIN ${Xn}`,Oi=`# END ${Xn}`,TH=`<!-- BEGIN ${Xn} -->`,EH=`<!-- END ${Xn} -->`,RH=".cursor/mcp.json",CH=".codex/config.toml",vH=".codex/AGENTS.md",LH=".claude/settings.json",gw="declined-projects.json",jc="agent-witch",Df="agent-witch",Hf=["mcp"],fw="agent-witch mcp-hook check_context"});var yw,IH,xH=l(()=>{"use strict";yw=m(require("node:path"));Ie();kr();IH=e=>e.profileEmail!==null?yw.default.join(e.installDir,He,e.profileEmail,gw):yw.default.join(e.installDir,gw)});var WH,It,Yr=l(()=>{"use strict";WH=m(require("node:path")),It=e=>{let{fs:t,filePath:r,contents:o}=e;t.mkdirp(WH.default.dirname(r));let n;e.backup===!0&&t.exists(r)&&(n=`${r}.aw-bak.${new Date().toISOString().replaceAll(":","-")}`,t.writeUtf8(n,t.readUtf8(r)));let s=`${r}.aw-tmp`;return t.writeUtf8(s,o),t.rename(s,r),n!==void 0?{backupPath:n}:{}}});var Ff,Vee,OH,zf,$f=l(()=>{"use strict";Mc();wH();xH();Yr();Ff=()=>({byRealpath:{}}),Vee=e=>{try{let t=JSON.parse(e);if(typeof t!="object"||t===null)return Ff();let r=t.byRealpath;return typeof r!="object"||r===null?Ff():{byRealpath:r}}catch{return Ff()}},OH=(e,t=Oc())=>{let r=IH(e);return t.exists(r)?Vee(t.readUtf8(r)):Ff()},zf=e=>{let t=e.fs??Oc(),r=kH(e.cwd,t);return OH(e.layout,t).byRealpath[r]!==void 0}});var Go,Uf,hw=l(()=>{"use strict";Go=(e,t)=>{let r=e[t];if(typeof r!="string")return;let o=r.trim();return o.length>0?o:void 0},Uf=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return{};let t=e;return{...Go(t,"cwd")!==void 0?{cwd:Go(t,"cwd")}:{},...Go(t,"message")!==void 0?{message:Go(t,"message")}:{},...Go(t,"sessionId")!==void 0?{sessionId:Go(t,"sessionId")}:{},...Go(t,"projectId")!==void 0?{projectId:Go(t,"projectId")}:{}}}});var Nc,Sw=l(()=>{"use strict";qt();uw();dw();$f();hw();Nc=e=>{let t=e.logError??(o=>{let n=o instanceof Error?o.message:String(o);console.error(`[agent-witch] check_context: ${n}`)}),r=e.isDeclined??(o=>zf({layout:e.layout,cwd:o}));return o=>{let n=Uf(o),s=null;try{return s=xi({layout:e.layout}),pw({registry:s,resolveProjectId:bk,isDeclined:r,logError:t},n)}catch(i){return t(i),{status:"none"}}finally{s?.close()}}}});var Kee,Pw,MH=l(()=>{"use strict";Sw();hw();Kee="/api/local/check-context",Pw=async e=>{if(e.pathname!==Kee)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t={};try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{return e.sendJson(e.response,400,{status:"none"}),!0}let r=Nc({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,r(Uf(t))),!0}});var jH,Bf,qee,Jee,NH,DH=l(()=>{"use strict";jH=m(require("node:path"));kr();Yr();Bf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qee={hooks:[{type:"command",command:fw,timeout:3,[Xn]:!0}]},Jee=e=>Array.isArray(e)&&e.some(t=>Bf(t)&&Array.isArray(t.hooks)&&t.hooks.some(r=>Bf(r)&&(r.command===fw||r[Xn]===!0))),NH=e=>{let t=jH.default.join(e.io.homedir(),LH),r={};if(e.io.exists(t))try{let a=JSON.parse(e.io.readUtf8(t));Bf(a)&&(r={...a})}catch{r={}}let o=Bf(r.hooks)?{...r.hooks}:{},n=o.UserPromptSubmit;if(Jee(n))return{ok:!0,path:t,wrote:!1};let s=Array.isArray(n)?[...n]:[];s.push(qee),o.UserPromptSubmit=s;let{backupPath:i}=It({fs:e.io,filePath:t,contents:`${JSON.stringify({...r,hooks:o},null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:i}}});var Dc,Gf=l(()=>{"use strict";kr();Dc=e=>{let t=e.begin??Wi,r=e.end??Oi,o=`${t}
${e.blockBody.trimEnd()}
${r}
`,n=e.existing.indexOf(t);if(n<0){let p=`${e.existing.length===0||e.existing.endsWith(`
`)?e.existing:`${e.existing}
`}${o}`;return{next:p,changed:p!==e.existing}}let s=e.existing.indexOf(r,n);if(s<0){let d=`${e.existing.slice(0,n)}${o}`;return{next:d,changed:d!==e.existing}}let i=s+r.length,a=e.existing.slice(i).replace(/^\n/,""),c=`${e.existing.slice(0,n)}${o}${a}`;return{next:c,changed:c!==e.existing}}});var HH,Yee,FH,zH=l(()=>{"use strict";HH=m(require("node:path"));Gf();kr();Yr();Yee=["On the first user message of a session, call the Agent Witch MCP tool","`check_context` with the current cwd.","If status is miss or none (declined), stay silent. If hit, follow the tip."].join(`
`),FH=e=>{let t=HH.default.join(e.io.homedir(),vH),r=e.io.exists(t)?e.io.readUtf8(t):"",{next:o,changed:n}=Dc({existing:r,blockBody:Yee,begin:Wi,end:Oi});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=It({fs:e.io,filePath:t,contents:o,backup:r.length>0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var $H,UH,BH=l(()=>{"use strict";$H=m(require("node:path"));Gf();kr();Yr();UH=e=>{let t=$H.default.join(e.io.homedir(),CH),r=Hf.map(c=>`"${c}"`).join(", "),o=[`[mcp_servers.${jc}]`,`command = "${Df}"`,`args = [${r}]`].join(`
`),n=e.io.exists(t)?e.io.readUtf8(t):"",{next:s,changed:i}=Dc({existing:n,blockBody:o,begin:Wi,end:Oi});if(!i)return{ok:!0,path:t,wrote:!1};let{backupPath:a}=It({fs:e.io,filePath:t,contents:s,backup:n.length>0});return{ok:!0,path:t,wrote:!0,backupPath:a}}});var GH,Aw,VH,KH=l(()=>{"use strict";GH=m(require("node:path"));kr();Yr();Aw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),VH=e=>{let t=GH.default.join(e.io.homedir(),RH),r={command:Df,args:[...Hf]},o={};if(e.io.exists(t))try{let d=JSON.parse(e.io.readUtf8(t));Aw(d)&&(o={...d})}catch{o={}}let n=Aw(o.mcpServers)?{...o.mcpServers}:{},s=n[jc];if(Aw(s)&&s.command===r.command&&Array.isArray(s.args)&&JSON.stringify(s.args)===JSON.stringify(r.args))return{ok:!0,path:t,wrote:!1};n[jc]=r;let a={...o,mcpServers:n},{backupPath:c}=It({fs:e.io,filePath:t,contents:`${JSON.stringify(a,null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:c}}});var Vf,bw=l(()=>{"use strict";Mc();DH();zH();BH();KH();Vf=e=>{let t=e?.io??Nf();return{ok:!0,cursorMcp:VH({io:t}),codexConfig:UH({io:t}),codexAgents:FH({io:t}),claudeHook:NH({io:t})}}});var qH=l(()=>{"use strict";kr()});var JH=l(()=>{"use strict";qH();kr();Gf();Yr()});var YH=l(()=>{"use strict";Yr()});var _w=l(()=>{"use strict";kr();JH();YH()});var kw=l(()=>{"use strict"});var XH=l(()=>{"use strict";kw()});var ZH=l(()=>{"use strict";kw();XH()});var QH,oRe,eF=l(()=>{"use strict";QH=m(require("node:path"));ZH();Yr();oRe=QH.default.join(".agent-witch","token-saver.json")});var ww=l(()=>{"use strict"});var tF=l(()=>{"use strict";eF();Mc();$f();ww();bw();_w()});var Kf=l(()=>{"use strict";dw();aw();ow();vf();cw();uw();bH();Sw();MH();bw();_w();tF();$f();ww();Mc()});var Tw,rF=l(()=>{"use strict";Tw=e=>({id:e.id,projectId:e.projectId,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:e.source,overridesSeed:e.source!=="seed",hitCount:e.hitCount,lastSeenAt:e.lastSeenAt,updatedAt:null})});var oF,nF,ate,lte,cte,qf,Ew=l(()=>{"use strict";Kf();nw();rF();oF=e=>{try{return e.dbPath!==void 0?xi({dbPath:e.dbPath}):e.layout!==void 0?(Wc(e.layout),xi({layout:e.layout})):null}catch{return null}},nF=(e,t,r)=>{let o=e.listPitfalls({projectId:t,includeRetired:r,format:"full"});return o.format==="full"?o.items:[]},ate=(e,t,r)=>{for(let o of r)o.source!=="seed"&&e.upsertPitfall({id:o.id,projectId:t,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source==="retired"?"retired":"project"})},lte=e=>e.kind==="active_cap"?{ok:!1,reason:"active_limit"}:{ok:!1,reason:"rejected"},cte=e=>{let t=e.cloud??null;return{listPitfalls:async(r,o)=>{let n=oF(e);try{if(t!==null){let i=await t.listPitfalls(r,o);if(i.ok)return n!==null?(ate(n,r,i.items),{ok:!0,items:nF(n,r,o.includeRetired).map(Tw),syncedAt:i.syncedAt}):i}return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:nF(n,r,o.includeRetired).map(Tw),syncedAt:null}}finally{n?.close()}},upsertPitfall:async(r,o)=>{if(t!==null){let s=await t.upsertPitfall(r,o);if(!s.ok)return s}let n=oF(e);if(n===null)return t!==null?{ok:!0}:{ok:!1,reason:"unavailable"};try{let s=n.upsertPitfall({id:o.id,projectId:r,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source});return s.ok?{ok:!0}:lte(s.error)}finally{n.close()}}}},qf=cte});var qt=l(()=>{"use strict";Ci();Ri();UN();jo();Ng();BN();iD();lD();PD();Pf();dc();AD();vD();LD();ID();xD();OD();MD();jD();ND();yk();gk();Vr();Ew()});var Jf,Hc,sF,Rw,Zn,Cw=l(()=>{"use strict";Jf=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},Hc=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Jf(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},sF=e=>e>=1&&e<=5,Rw=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Jf(t,"UTC")},Zn=e=>{let t=e.from??new Date,r=Jf(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Hc(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=Hc(r,e.timeZone,o,0),s=Jf(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?Hc(Rw(r),e.timeZone,o,0):n;if(!i&&sF(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=Rw(a),sF(a.weekday))return Hc(a,e.timeZone,o,0);return Hc(Rw(r),e.timeZone,o,0)}});var iF,vw,Xr,Lw=l(()=>{"use strict";iF=require("node:crypto");ee();qt();Cw();mf();vw=!1,Xr=async e=>{if(vw)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=H();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=V({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=uf(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};vw=!0;let n=(0,iF.randomUUID)();try{let s=await Pi(t,"claude-cli",o.prompt);await uk(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=Zn({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return pf(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{vw=!1}}});var Yf,aF=l(()=>{"use strict";ee();Lw();mf();Yf=async()=>{let e=H();if(e===null)return;let t=Gt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await Xr(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var Fc=l(()=>{"use strict";mf();aF();Lw();Cw()});var lF=l(()=>{"use strict";Fc()});var cF=l(()=>{"use strict";ik()});var dF=l(()=>{"use strict";cF()});var Iw=l(()=>{"use strict";Fc()});var dte,pte,zc,xw=l(()=>{"use strict";lF();dF();Iw();Je();dte=e=>e!==void 0&&e.trim().length>0?M(e.trim()):M(),pte=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??Zn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??Zn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},zc=e=>{let t=dte(e.profileEmail),r=Gt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Ei(s);return i!==null?[pte(i,o.get(i.id))]:[]});return df(t,n),{ok:!0,writtenCount:n.length}}});var Ww=l(()=>{"use strict";Fc()});var pF=l(()=>{"use strict";ee()});var uF=l(()=>{"use strict";xw();Ww();Iw();pF()});var mF,$c,Uc,Bc,gF=l(()=>{"use strict";mF=m(require("node:os"));uF();Sc();Pc();$c=e=>{if(!Gr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Un(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=zc({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Uc=async e=>{if(!Gr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Un(t)?Xr(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Bc=()=>{let e=H(),t=e!==null?Gt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:mF.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var Ow=l(()=>{"use strict";gF()});var Xf=l(()=>{"use strict";ie()});var Zf=l(()=>{"use strict";ie()});var Qf,yF,hF,fF,ute,mte,Mi,Mw=l(()=>{"use strict";Qf=m(require("node:fs")),yF=m(require("node:os")),hF=m(require("node:path"));Xf();Zf();oc();Je();fF=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},ute=e=>hF.default.join(yF.default.homedir(),"Library","LaunchAgents",`${e}.plist`),mte=async e=>Qf.default.existsSync(ute(e))?(await qe(e)).ok:!1,Mi=async(e=C())=>{let t=Qf.default.existsSync(Cg(e)),r=!Qf.default.existsSync(ur(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=rc(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await fF(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${ge(e)}-wake`;await mte(i)&&s.push(i);for(let c of de(e))(await qe(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await fF(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var SF=l(()=>{"use strict";ie()});var jw=l(()=>{"use strict";Mn();ie()});var Nw=l(()=>{"use strict";Mn()});var Dw=l(()=>{"use strict";ie()});var AF,PF,Gc,Hw=l(()=>{"use strict";AF=m(require("node:fs"));Ct();Xf();Zf();Je();PF=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},Gc=async(e=C())=>{if(!AF.default.existsSync(ur(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await PF())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of de(e))(await qe(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await PF();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var bF=l(()=>{"use strict";ie()});var _F,Qn,Fw,gte,fte,yte,kF,hte,wF,ji,ey=l(()=>{"use strict";_F=require("node:crypto"),Qn=m(require("node:fs")),Fw=m(require("node:path"));Je();gte="watchdog-log.ndjson",fte=200,yte=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kF=(e=C())=>{let t=M(),r=t.installDir===e?t.logsDir:Pn({installDir:e,profileEmail:t.profileEmail});return Fw.default.join(r,gte)},hte=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!yte(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},wF=(e,t=C())=>{let r={id:(0,_F.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=kF(t);Qn.default.mkdirSync(Fw.default.dirname(o),{recursive:!0});let n=Qn.default.existsSync(o)?Qn.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-fte+1)),JSON.stringify(r)];return Qn.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},ji=(e=20,t=C())=>{let r=kF(t);if(!Qn.default.existsSync(r))return[];let o=Qn.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=hte(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var zw,$w,Uw,Bw=l(()=>{"use strict";Ie();zw=qa.watchdogReinstallState,$w=900*1e3,Uw=3e3});var TF=l(()=>{"use strict";Bw()});var EF={};Rt(EF,{verifyAgentWitchReviveAfterKickstart:()=>Pte});var Ste,Pte,RF=l(()=>{"use strict";TF();Nw();Dw();Je();Ste=e=>new Promise(t=>{setTimeout(t,e)}),Pte=async e=>{if(await Ste(e.verifyDelayMs??Uw),!await bn(e.launchAgentLabel))return!1;let r=e.profileEmail===null?M():M(e.profileEmail),o=ve(r);return!ze(o,e.staleAfterMs)}});var Vc,Gw,Ate,CF,vF,Vw,Kw,qw=l(()=>{"use strict";Vc=m(require("node:fs")),Gw=m(require("node:path"));G();Bw();Ate=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),CF=e=>Gw.default.join(e,zw),vF=(e=C())=>{let t=CF(e);if(!Vc.default.existsSync(t))return null;try{let r=JSON.parse(Vc.default.readFileSync(t,"utf8"));return!Ate(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},Vw=(e=C(),t=Date.now())=>{let r=vF(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=$w:!0},Kw=(e=C(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=CF(e);return Vc.default.mkdirSync(Gw.default.dirname(o),{recursive:!0}),Vc.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var Jw,LF=l(()=>{"use strict";ie();qw();Jw=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!Vw())return{attempted:!1,ok:!1,targets:e};Kw();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await qe(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var IF=l(()=>{"use strict";qw();LF()});var Yw=l(()=>{"use strict";fr()});var xF=l(()=>{"use strict";fr()});var WF,Ni,OF,MF,jF,bte,_te,NF,kte,wte,DF,HF=l(()=>{"use strict";WF=require("node:child_process"),Ni=m(require("node:fs")),OF=m(require("node:os")),MF=m(require("node:path")),jF=require("node:util");Yw();xF();Je();bte=(0,jF.promisify)(WF.execFile),_te=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),NF=e=>{let t=Ke(e),r=t===null?M():M(t);if(!Ni.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Ni.default.readFileSync(r.configPath,"utf8"));return!_te(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},kte=e=>NF(e)?.wsUrl??null,wte=e=>{let t=kte(e);return t!==null?Fe(t):Ye(e)?.appOrigin??null},DF=async e=>{let t=e?.installDir??C(),r=NF(t),o=r!==null?Fe(r.wsUrl):wte(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=MF.default.join(OF.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Ni.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??Ke(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await bte("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Ni.default.existsSync(i)&&Ni.default.unlinkSync(i)}}});var FF={};Rt(FF,{attemptAgentWitchWatchdogReinstall:()=>Tte});var Tte,zF=l(()=>{"use strict";IF();HF();Tte=async e=>Jw(e,()=>DF())});var $F,UF,BF,Ete,Rte,Cte,Kc,Xw=l(()=>{"use strict";SF();jw();Nw();Dw();Hw();Mw();Xf();Zf();Je();ai();bF();ey();$F=e=>e===null?M():M(e),UF=async(e,t,r)=>{if(!await bn(e))return"not_running";let n=$F(t);if($t(n))return"healthy";let s=ve(n);return ze(s,r)?"stale_connection":"healthy"},BF=async e=>{let t=e?.staleAfterMs??12e4,r=C(),o=de(r);return Promise.all(o.map(async n=>{let s=await UF(n.launchAgentLabel,n.profileEmail,t),i=$F(n.profileEmail),a=ve(i),c=await bn(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:ze(a,t),needsRevive:s!=="healthy",reason:s}}))},Ete=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},Rte=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",Cte=async e=>{let t=await qe(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(RF(),EF)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},Kc=async e=>{if(!zt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=C();await Mi(r),await Gc(r);let o=de(r),n=[];for(let p of o){let g=await UF(p.launchAgentLabel,p.profileEmail,t);if(g==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:g});continue}n.push(await Cte({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:g,staleAfterMs:t}))}if(n.length===0){let p=An();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(zF(),FF)),g=await p(n);s=g.attempted,i=g.ok,a=g.errorMessage,c=[...g.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&wF({event:Rte(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:Ete(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var GF,ty,VF=l(()=>{"use strict";GF=m(require("node:os"));jw();ey();Xw();ty=async()=>{let e=await BF(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:GF.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:ji(1)[0]??null}}});var Zw=l(()=>{"use strict";Mw();Xw();VF();ey()});var qc,Jc,Yc,KF=l(()=>{"use strict";ie();Zw();qc=async()=>{await Mi();let e=de(),t=[];for(let r of e){let o=await qe(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=An();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Jc=Kc,Yc=Kc});var Qw=l(()=>{"use strict";KF()});var oy,ry,qF,eT,JF,vte,Lte,Ite,xte,Wte,ny,YF=l(()=>{"use strict";oy=require("node:child_process"),ry=m(require("node:fs")),qF=m(require("node:os")),eT=m(require("node:path")),JF=require("node:util");ie();G();vte=(0,JF.promisify)(oy.execFile),Lte=()=>eT.default.join(qF.default.homedir(),"Library","LaunchAgents"),Ite=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await vte("launchctl",["bootout",r]).catch(()=>{})},xte=e=>{let t=eT.default.join(Lte(),`${e}.plist`);ry.default.existsSync(t)&&ry.default.unlinkSync(t)},Wte=e=>{(0,oy.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},ny=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=C();if(!ry.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Dr(e);for(let r of t)await Ite(r),xte(r);return Wte(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var XF,sy,ZF,Di,QF,Ote,Mte,jte,tT,Nte,rT,ez=l(()=>{"use strict";XF=require("node:child_process"),sy=m(require("node:fs")),ZF=m(require("node:os")),Di=m(require("node:path")),QF=require("node:util");ie();Ote=(0,QF.promisify)(XF.execFile),Mte=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],jte=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],tT=e=>{sy.default.existsSync(e)&&sy.default.rmSync(e,{force:!0})},Nte=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await Ote("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},rT=async e=>{let r=(e.listLaunchAgentLabels??Dr)(e.layout.installDir),o=e.launchAgentsDir??Di.default.join(ZF.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??Nte;for(let i of r)await n(i),tT(Di.default.join(o,`${i}.plist`));let s=Di.default.dirname(e.layout.configPath);for(let i of Mte)tT(Di.default.join(s,i));for(let i of jte)tT(Di.default.join(e.layout.installDir,i));return sy.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var oT,tz=l(()=>{"use strict";oT="unknown_identity"});var nT=l(()=>{"use strict";Uk();tz()});var Dte,sT,rz=l(()=>{"use strict";nT();Dte=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sT=e=>e.type!=="system.error"||!Dte(e.payload)?!1:e.payload.errorCode===oT});var iT=l(()=>{"use strict";YF();ez();rz()});var iy=l(()=>{"use strict";ie();fr();iT();Zw()});var Hi,ay,ly=l(()=>{"use strict";iy();Hi=(e=20)=>ji(e),ay=ty});var cy,Fi,dy,py=l(()=>{"use strict";iy();cy=Wn,Fi=(e=20)=>Ln(e),dy=e=>xn(e)});var uy,aT=l(()=>{"use strict";iy();uy=()=>ny()});var oz=l(()=>{"use strict";h_();sk();Ow();Qw();ly();py();aT()});var nz={};Rt(nz,{buildAgentWitchAutomationStatusFromWakeServer:()=>Bc,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>cy,buildAgentWitchWakeHealthResponse:()=>sc,buildAgentWitchWakeIdentityResponse:()=>ic,buildAgentWitchWatchdogStatus:()=>ay,installHarnessFromWakeServer:()=>Ac,readAgentWitchSelfUpdateLogEntries:()=>Fi,readAgentWitchWatchdogLogEntries:()=>Hi,restartAgentWitchFromWakeServer:()=>Yc,reviveAgentWitchWebSocketFromWakeServer:()=>Jc,runAgentWitchSelfUpdateFromWakeServer:()=>dy,runAgentWitchUninstallLocalFromWakeServer:()=>uy,runAutomationFromWakeServer:()=>Uc,syncAutomationsFromWakeServer:()=>$c,wakeAgentWitchLaunchAgents:()=>qc});var sz=l(()=>{"use strict";oz()});var iz,az,lT,cT,lz=l(()=>{"use strict";iz=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),az=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?iz(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?iz(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},lT=e=>{let t=e.watchdogLogs.map(az).join(""),r=e.updateLogs.map(az).join("");return`<!doctype html>
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
</html>`},cT=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var cz,dz,pz=l(()=>{"use strict";cz=m(require("node:net")),dz=()=>new Promise((e,t)=>{let r=cz.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var uz,Hte,Fte,dT,mz=l(()=>{"use strict";uz=m(require("node:net"));ie();pz();nc();oc();Je();Hte=e=>new Promise(t=>{let r=uz.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Fte=e=>new Promise(t=>{setTimeout(t,e)}),dT=async(e={})=>{let t=C(),r=Bt(),o=Math.max(1,e.attempts??10),n=e.retryDelayMs??500;for(let i=1;i<=o;i+=1){if(await Hte(r))return gj(r),r;i<o&&await Fte(n)}let s=await dz();vg(t,s),process.env.AGENT_WITCH_WAKE_PORT=String(s);try{hl({launchAgentPrefix:ge(t),wakePort:s})}catch(i){console.error(`[agent-witch] Could not update LaunchAgent wake port: ${i instanceof Error?i.message:String(i)}`)}return s}});var zte,pT,gz=l(()=>{"use strict";zte=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pT=e=>({force:zte(e)&&e.force===!0})});var Xc=l(()=>{"use strict";Sc();lz();mz();gz();YA();Km();En()});var uT,U,mT,gT,Zc,fz=l(()=>{"use strict";uT=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},U=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},mT=e=>{e.writeHead(403),e.end()},gT=e=>e.url?.split("?")[0]??"/",Zc=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var Jt=l(()=>{"use strict";fz()});var $te,yz,hz=l(()=>{"use strict";Ow();Jt();$te=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return U(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},yz=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return U(e.response,200,Bc(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await $te(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=$c(t);return U(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Uc(t);return U(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var Ute,Pz,Sz,Az,fT,bz,yT=l(()=>{"use strict";Ute=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],Pz=e=>/embed|minilm|^bge-/i.test(e),Sz=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),Az=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),fT=e=>e.filter(t=>t.trim().length>0&&!Pz(t)),bz=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!Pz(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>Sz(s,o));if(n!==void 0)return n}for(let n of Ute){let s=r.find(i=>Sz(i,n));if(s!==void 0)return s}return r[0]??null}});var hT,wz,Tz,my,Ez,_z,kz,Bte,Gte,Vte,Kte,qte,Jte,Yt,Qc=l(()=>{"use strict";hT=require("node:child_process"),wz=m(require("node:fs")),Tz=m(require("node:os")),my=m(require("node:path"));fr();Ut();yT();Ez=3e3,_z=["claude-cli","codex","cursor","antigravity"],kz={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},Bte=(e,t)=>new Promise(r=>{let o=(0,hT.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},Ez);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),Gte=()=>{let e=Tz.default.homedir();return["ollama",my.default.join(e,".local","bin","ollama"),my.default.join(e,".agent-witch","ollama","ollama"),my.default.join(e,".local-agent-witch","ollama","ollama")]},Vte=e=>new Promise(t=>{let r=(0,hT.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},Ez);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(Az(Buffer.concat(o).toString("utf8")))})}),Kte=async()=>{for(let e of Gte()){if(e!=="ollama"&&!wz.default.existsSync(e))continue;let t=await Vte(e);if(t!==null)return t}return[]},qte=e=>{let t=e.installedWriterIds.map(s=>kz[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=_e(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${kz[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},Jte=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:li},Yt=async e=>{let t=_z.map(i=>{let a=gg(i,e.commands);return Bte(a.command,a.args)}),[r,...o]=await Promise.all([Kte(),...t]),n=_z.flatMap((i,a)=>o[a]===!0?[i]:[]),s=bz(r,Jte());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:qte({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var Yte,Xte,ST,Rz=l(()=>{"use strict";Yte="http://127.0.0.1:11434",Xte=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},ST=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Yte;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?Xte(await o.json()):null}catch{return null}}});var PT=l(()=>{"use strict";Ut();Qc();Rz();yT()});var Zte,Cz,vz=l(()=>{"use strict";PT();Zte={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},Cz=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:Zte[t]})),ollamaModels:fT(e.ollamaModels)})});var Qte,Lz,Iz=l(()=>{"use strict";PT();Jt();vz();Qte=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return U(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},Lz=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Yt({commands:ke({})});return U(e.response,200,{ok:!0,...Cz({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await Qte(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await ST({model:r,prompt:o});return n===null?(U(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(U(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var ere,xz,Wz=l(()=>{"use strict";sk();Jt();ere=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return U(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},xz=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await ere(e);if(t===null)return!0;let r=Ac(t);return U(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var Oz=l(()=>{"use strict";qt()});var AT,Mz=l(()=>{"use strict";Oz();Pc();AT=e=>{if(!Gr(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:st({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var jz,bT,_T=l(()=>{"use strict";ee();qt();Pc();jz=e=>{if(!Gr(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},bT=async e=>{let t=jz(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Uo("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=H();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=V({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(st({projectFolderPath:r}),await Rc(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var Nz=l(()=>{"use strict";Mz();_T()});var Dz,Hz=l(()=>{"use strict";Nz();_T();Jt();Dz=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=AT(t);return U(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await bT(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return U(e.response,o,r,e.cors.headers),!0}return!1}});var Fz,zz=l(()=>{"use strict";Xc();py();ly();Fz=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Hi(50),r=Fi(50);return e.response.writeHead(200,cT()),e.response.end(lT({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var $z,Uz=l(()=>{"use strict";h_();Jt();$z=e=>e.request.method==="GET"&&e.pathname==="/health"?(U(e.response,200,sc(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(U(e.response,200,ic(),e.cors.headers),!0):!1});var Bz,Gz=l(()=>{"use strict";aT();Jt();Bz=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await uy();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}});var Vz,Kz=l(()=>{"use strict";Qw();Jt();Vz=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Jc();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Yc();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await qc();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var qz,Jz=l(()=>{"use strict";Xc();py();Jt();qz=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=cy();return U(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=Zc(e.request,"/update/logs",20,200);return U(e.response,200,{ok:!0,logs:Fi(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=pT(t),o=await dy({force:r});return U(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var Yz,Xz=l(()=>{"use strict";ly();Jt();Yz=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await ay();return U(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=Zc(e.request,"/watchdog/logs",20,200);return U(e.response,200,{ok:!0,logs:Hi(t)},e.cors.headers),!0}return!1}});var Zz,Qz=l(()=>{"use strict";hz();Iz();Wz();Hz();zz();Uz();Gz();Kz();Jz();Xz();Zz=[$z,Fz,Yz,Vz,qz,Bz,xz,Dz,yz,Lz]});var e$,t$=l(()=>{"use strict";Qz();e$=async e=>{for(let t of Zz)if(await t(e))return!0;return!1}});var tre,r$,o$=l(()=>{"use strict";Sc();Jt();t$();tre=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:gT(e),readJsonBody:()=>uT(e)}),r$=async(e,t,r)=>{let o=e.headers.origin,n=af(o);try{if(o!==void 0&&o.length>0&&!n.allowed){mT(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=tre(e,t,r,n);if(await e$(s))return;U(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{U(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var n$,es,gy,fy=l(()=>{"use strict";n$=m(require("node:http"));Xc();o$();es=async()=>{let e=await dT(),t=n$.default.createServer((r,o)=>{r$(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},gy=es});var s$={};Rt(s$,{runAgentWitchBridgeCli:()=>rre});var rre,i$=l(()=>{"use strict";ie();fy();rre=async()=>{ht("agent-witch-bridge");let e=await es(),t=Fr(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var a$=l(()=>{"use strict";Ct()});var zi,kT,l$=l(()=>{"use strict";zi=(e,t,r)=>e===1?t:r,kT=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${zi(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${zi(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${zi(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${zi(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${zi(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${zi(p,"year","years")} ago`}});var ts,wT,ore,nre,TT,Vo,ed,ET,c$=l(()=>{"use strict";ts=m(require("node:fs")),wT=m(require("node:path")),ore="local-ws-traffic.ndjson",nre=500,TT=e=>wT.default.join(e.logsDir,ore),Vo=(e,t)=>{let r=TT(e);ts.default.mkdirSync(wT.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});ts.default.appendFileSync(r,`${o}
`,"utf8")},ed=(e,t=nre)=>{let r=TT(e);if(!ts.default.existsSync(r))return[];let n=ts.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},ET=e=>{let t=TT(e);ts.default.existsSync(t)&&ts.default.writeFileSync(t,"","utf8")}});var sre,d$,p$,u$=l(()=>{"use strict";nT();sre=new Set(Object.values(kf)),d$=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),p$=e=>{if(!d$(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!sre.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!d$(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var m$,g$=l(()=>{"use strict";m$=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var ire,are,lre,td,f$=l(()=>{"use strict";g$();ire=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,are=e=>ire.test(e),lre=e=>m$(e),td=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>td(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&are(o)){r[o]=lre(n);continue}r[o]=td(n)}return r}});var wr,RT,cre,dre,pre,CT,y$,h$,S$,ure,yy,rs,hy,vT,P$=l(()=>{"use strict";wr=m(require("node:fs")),RT=m(require("node:path"));u$();f$();cre="local-ws-trace.ndjson",dre=1e4,pre=1440*60*1e3,CT=e=>RT.default.join(e.logsDir,cre),y$=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},h$=e=>{if(!wr.default.existsSync(e))return;let t=wr.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-pre,n=t.filter(s=>{let i=y$(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-dre);wr.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},S$=(e,t)=>{let r=CT(e);wr.default.mkdirSync(RT.default.dirname(r),{recursive:!0}),wr.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),h$(r)},ure=e=>e.parsed===null?{_empty:!0}:td(e.parsed),yy=(e,t,r)=>{let o=p$(r);S$(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:ure(o)})},rs=(e,t)=>{S$(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:td({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},hy=(e,t=80)=>{let r=CT(e);if(h$(r),!wr.default.existsSync(r))return[];let o=wr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=y$(s);i!==null&&n.push(i)}return n.reverse()},vT=e=>{let t=CT(e);wr.default.existsSync(t)&&wr.default.writeFileSync(t,"","utf8")}});var Ko,A$,mre,LT,Sy,b$=l(()=>{"use strict";Ko=m(require("node:fs")),A$=m(require("node:path")),mre=256e3,LT=e=>{Ko.default.mkdirSync(A$.default.dirname(e),{recursive:!0}),Ko.default.writeFileSync(e,"","utf8")},Sy=(e,t=mre)=>{if(!Ko.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Ko.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=Ko.default.openSync(e,"r");try{Ko.default.readSync(a,i,0,s,n)}finally{Ko.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var rd=l(()=>{"use strict";c$();P$();b$()});var IT,xT,_$=l(()=>{"use strict";IT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xT=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${IT(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${IT(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${IT(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var k$=l(()=>{"use strict";_$()});var WT,OT=l(()=>{"use strict";WT=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var MT=l(()=>{"use strict";Fl()});var jT,NT,w$=l(()=>{"use strict";MT();jT=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},NT=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var T$=l(()=>{"use strict";OT();w$()});var E$,od,DT,nd=l(()=>{"use strict";OT();E$=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),od=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=E$(e),r=E$(WT(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},DT=`(function () {
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
})();`});var os,gre,HT,R$=l(()=>{"use strict";os=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gre=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},HT=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${os(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?os(r.direction):os(r.kind),i=`trace-body-${o}`,a=os(gre(r.body));return`<tr>
        <td title="${os(r.at)}">${os(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${os(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var v$,fre,C$,FT,L$=l(()=>{"use strict";Ie();Ct();v$=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},fre=e=>v$(e)===Nr?Gs:Bs,C$=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),FT=e=>{let t=fre(e.installDir),o=`AW_HOME="$HOME/${v$(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${C$(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${C$(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var I$=l(()=>{"use strict";nd();R$();L$();nd()});var yre,Zr,sd=l(()=>{"use strict";yre=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Zr=yre});var x$,W$,O$,M$,j$,N$,D$,$i=l(()=>{"use strict";x$="projects",W$="knowledge",O$="chunks.ndjson",M$="lessons.ndjson",j$="error-chunks.ndjson",N$="usage-stats.json",D$="knowledge-location.json"});var Py,hre,Ay,zT=l(()=>{"use strict";Py=m(require("node:path"));$i();hre=(e,t)=>{let r=t.trim(),o=Py.default.join(e.installDir,x$,r,W$);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:Py.default.join(o,O$),memoryRunsFilePath:Py.default.join(o,M$)}},Ay=hre});var $T,Sre,H$,F$=l(()=>{"use strict";$T=m(require("node:fs"));$i();zn();Sre=e=>{let t=vt(e.projectFolderPath),r=`${t.metaDirPath}/${D$}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};$T.default.mkdirSync(t.metaDirPath,{recursive:!0}),$T.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},H$=Sre});var Ui,$$,z$,Pre,U$,B$=l(()=>{"use strict";Ui=m(require("node:fs")),$$=m(require("node:path"));wn();zn();zT();F$();z$=(e,t)=>{Ui.default.existsSync(e)&&(Ui.default.existsSync(t)&&Ui.default.statSync(t).size>0||(Ui.default.mkdirSync($$.default.dirname(t),{recursive:!0}),Ui.default.copyFileSync(e,t)))},Pre=e=>{let t=vt(e.projectFolderPath),r=Ay(e.layout,e.projectId),o=`${t.memoryDirPath}/${ti}`;z$(t.ragChunksFilePath,r.ragChunksFilePath),z$(o,r.memoryRunsFilePath),H$({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},U$=Pre});var G$,Are,Bi,by=l(()=>{"use strict";G$=m(require("node:path"));wn();zn();B$();Pk();zT();Are=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=gf(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){U$({layout:e.layout,projectFolderPath:t,projectId:o});let s=Ay(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=vt(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:G$.default.join(n.memoryDirPath,ti),projectId:null}},Bi=Are});var _y,_re,ky,UT=l(()=>{"use strict";_y=m(require("node:fs"));$i();_re=(e,t=500)=>{if(!_y.default.existsSync(e))return;let r=_y.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);_y.default.writeFileSync(e,`${o.join(`
`)}
`)},ky=_re});var wy,kre,ns,BT=l(()=>{"use strict";wy=m(require("node:path"));$i();by();kre=e=>{let t=Bi(e);if(t===null)return null;let r=wy.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:wy.default.join(r,N$),errorChunksFilePath:wy.default.join(r,j$)}},ns=kre});var K$,id,q$,V$,GT,J$,Ere,VT,Y$,KT,qT,JT,YT=l(()=>{"use strict";K$=require("node:crypto"),id=m(require("node:fs")),q$=m(require("node:path"));sd();$i();BT();V$=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),GT=e=>{if(!id.default.existsSync(e))return V$();try{let t=JSON.parse(id.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return V$()},J$=(e,t)=>{id.default.mkdirSync(q$.default.dirname(e),{recursive:!0}),id.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Ere=e=>{let t=Zr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,K$.createHash)("sha256").update(o).digest("hex").slice(0,16)},VT=e=>{let t=ns(e);return t===null?null:GT(t.usageStatsFilePath)},Y$=e=>{if(e.chunkIds.length===0)return;let t=ns(e);if(t===null)return;let r=GT(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;J$(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},KT=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=ns(e);if(r===null)return null;let o=Ere(t),n=GT(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return J$(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},qT=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,JT=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var ad,X$,Rre,Cre,Z$,vre,XT,ld,Gi,ZT,Vi,QT,eE=l(()=>{"use strict";ad=m(require("node:fs")),X$=m(require("node:path"));sd();by();UT();YT();Rre="http://127.0.0.1:11434",Cre="nomic-embed-text",Z$=(e,t,r)=>Bi({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,vre=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},XT=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},ld=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Rre,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||Cre;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},Gi=(e,t,r)=>{let o=Z$(e,t,r);if(o===null||!ad.default.existsSync(o))return[];let n=ad.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},ZT=async e=>{let t=Zr(e.text),r=XT(t);if(r.length===0)return 0;let o=Z$(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;ad.default.mkdirSync(X$.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await ld(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};ad.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return ky(o),n},Vi=async e=>{let t=await ld(e.query);if(t===null)return[];let r=e.minScore??0,s=Gi(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:vre(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return Y$({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},QT=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var cd,Q$,Lre,Ire,tE,rE,oE,eU=l(()=>{"use strict";cd=m(require("node:fs")),Q$=m(require("node:path"));sd();BT();UT();eE();Lre=e=>{if(!cd.default.existsSync(e))return[];let t=cd.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},Ire=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},tE=async e=>{let t=ns(e);if(t===null)return 0;let r=Zr(e.text),o=XT(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;cd.default.mkdirSync(Q$.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await ld(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};cd.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return ky(n,200),s},rE=async e=>{let t=ns(e);if(t===null)return[];let r=await ld(e.query);if(r===null)return[];let o=e.minScore??.3;return Lre(t.errorChunksFilePath).map(s=>({chunk:s,score:Ire(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},oE=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var nE=l(()=>{"use strict";eE();YT();eU()});var We,sE,iE=l(()=>{"use strict";$k();We=zk,sE=`
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
`.trim()});var xre,Wre,aE,tU,lE,rU=l(()=>{"use strict";iE();nd();xre=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,Wre=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],aE=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tU=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${xre}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,lE=e=>{let t=Wre.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=aE(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=aE(e.installBundleVersionLabel?.trim()??"unknown"),s=tU("brand brand-in-sidebar",n),i=tU("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${aE(e.title)} \xB7 Agent Witch Local</title>
  <style>${sE}</style>
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
  <script>${DT}</script>
</body>
</html>`}});var Ty,dd,Ey=l(()=>{"use strict";Ty=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dd=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Ty(e.syncMessage)}</p>`:"",o=Ty(e.manageHref),n=Ty(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Ty(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var cE,dE,pE,oU=l(()=>{"use strict";cE=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,dE=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,pE=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var nU=l(()=>{"use strict";rU();Ey();oU()});var Ki,uE,sU=l(()=>{"use strict";nd();Ki=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uE=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Ki(e.wakeError)}</div>`:"",a=od(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Ki(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${Ki(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Ki(o)}</p>
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
        <p class="home-card-meta">${Ki(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Ki(n)}</p>
      </a>
    </div>`}});var iU=l(()=>{"use strict";sU()});var v,qi=l(()=>{"use strict";v=e=>e==="passed"||e==="stopped"||e==="failed"});var aU,mE,ss,gE,Ry=l(()=>{"use strict";aU="Stopped at the round limit. The best prompt is kept.",mE="Stopped because the score stopped rising. The best prompt is kept.",ss="Finished. The best prompt is the result.",gE="Wizard ended. Progress from finished steps is kept."});var qo,fE=l(()=>{"use strict";qo=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var Ore,Mre,pd,lU,Cy=l(()=>{"use strict";Ore=/\n+|;\s+/,Mre=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,pd=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(Ore).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,Mre(s)]},[]);return[...t,...o]},[]),lU=e=>{let t=pd(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ye,Ji=l(()=>{"use strict";ye=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var ud,yE=l(()=>{"use strict";Cy();Ji();ud=e=>{let t=[...e.priorRounds,e.current],r=ye(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:lU(o)}}});var hE,jre,Nre,vy,SE=l(()=>{"use strict";hE={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},jre=e=>{try{let t=JSON.parse(e.fragment);return{...hE,objects:[...e.objects,t]}}catch{return{...hE,objects:e.objects}}},Nre=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:jre(r)},vy=e=>[...e].reduce(Nre,hE).objects});var Dre,PE,Hre,cU,AE=l(()=>{"use strict";SE();Dre=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},PE=e=>{let t=vy(e).filter(Dre),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},Hre=(e,t)=>({...e,passed:e.score>=t}),cU=(e,t)=>{let r=PE(e);return r===null?null:Hre(r,t)}});var bE,_E,Ly=l(()=>{"use strict";bE="The judge reply needs a score and a reason.",_E="The improver reply was empty."});var dU,pU=l(()=>{"use strict";dU=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var uU,mU=l(()=>{"use strict";uU=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var zre,gU,fU=l(()=>{"use strict";pU();mU();Ry();Cy();zre=e=>{let t=pd(e);return t.length===0?mE:`${mE} Avoid: ${t.join("; ")}.`},gU=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:aU};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(dU(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:zre(uU(r))}}return null}});var Jo,$re,is,yU,Iy=l(()=>{"use strict";Jo=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},$re=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,is=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",$re(e.tokens),`Delay: ${Jo(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},yU=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var Ure,hU,SU=l(()=>{"use strict";AE();Ure=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,hU=e=>{let r=(Ure.exec(e)?.[1]??e).trim();return r.length===0||PE(r)!==null?null:r}});var PU,xy,AU=l(()=>{"use strict";Iy();SU();Ly();PU=e=>({type:"call",role:"judge",choice:e.choice,prompt:yU({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),xy=e=>{let t=hU(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:_E}}:{nextPrompt:t,continuation:PU({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var kE,bU=l(()=>{"use strict";fE();yE();AE();Ly();Ry();fU();Ly();AU();kE=e=>{let t=cU(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:bE}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=gU({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=ud({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:qo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var md,wE=l(()=>{"use strict";md=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var _U=l(()=>{"use strict"});var kU=l(()=>{"use strict";_U()});var as,wU=l(()=>{"use strict";as=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var Bre,TE,TU=l(()=>{"use strict";Iy();Bre=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,TE=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",Bre(e.tokens),`Delay: ${Jo(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var Gre,Vre,Kre,EE,EU=l(()=>{"use strict";Gre=/[A-Za-z0-9_./~-]{3,180}/g,Vre=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,Kre=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||Vre.test(t)},EE=(e,t=12)=>{let r=[];for(let o of e.matchAll(Gre)){let n=o[0].replace(/\.+$/,"");if(!(!Kre(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var gd,RU=l(()=>{"use strict";gd=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var Wy,RE,CU,fd,CE=l(()=>{"use strict";Wy=e=>Math.floor(e/2),RE=e=>Math.max(Wy(e)+1,e-20),CU=(e,t)=>e>=t?"passes":e>=RE(t)?"close":e>=Wy(t)?"weak":"bad",fd=e=>[{band:"bad",label:`0\u2013${Wy(e)-1} bad`},{band:"weak",label:`${Wy(e)}\u2013${RE(e)-1} weak`},{band:"close",label:`${RE(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var Oy,vE=l(()=>{"use strict";CE();Oy=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${CU(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var Xt,LE=l(()=>{"use strict";Xt=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var vU,LU=l(()=>{"use strict";vU=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var qre,Jre,IU,xU=l(()=>{"use strict";qi();vE();LE();LU();qre=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],Jre=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",IU=e=>{let t=e.wizard;if(t===void 0)return[];let r=Xt(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=qre.map((h,y)=>{let S=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:h,state:S,detail:null}}).filter((h,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=Oy(e),d=c.filter(h=>h.id==="round-0"),p=vU(t)&&(!n||a)?c.filter(h=>h.id!=="round-0"):[],g=v(e.status)&&!s,f=g?[{id:"end",label:Jre(e),state:"done",detail:e.errorMessage}]:[];if(g&&f.length>0){let h=Math.min(r,i.length),y=i.slice(0,h).map(S=>({...S,state:"done"}));return[...d,...y,...f,...p]}return[...d,...i,...p,...f]}});var Yre,IE,WU=l(()=>{"use strict";qi();vE();xU();Yre=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",IE=e=>{if(e.wizard!==void 0)return IU(e);let t=Oy(e),r=v(e.status)?[{id:"end",label:Yre(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var yd,OU=l(()=>{"use strict";yd=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var MU=l(()=>{"use strict";Ct()});var jU,hd,Sd,Xi,My,xE,NU=l(()=>{"use strict";MU();jU="/prompt-optimizer/agent",hd=`${zr}${jU}`,Sd=`${zr}/prompt-optimizer`,Xi="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",My=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${Xi}`,xE="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var Tr=l(()=>{"use strict"});var pe,Pd=l(()=>{"use strict";Tr();pe=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var WE,DU=l(()=>{"use strict";WE="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var HU,FU=l(()=>{"use strict";HU=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Ad,$U=l(()=>{"use strict";FU();Tr();Ad=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:HU(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var OE,UU=l(()=>{"use strict";Tr();OE=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var ME,BU=l(()=>{"use strict";Tr();ME=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var GU,bd,VU=l(()=>{"use strict";GU=["generalize","evaluate","separate","optimize_modules"],bd=(e,t)=>{let r=GU.indexOf(t);if(r===-1)return e;let o=GU.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var jy,jE=l(()=>{"use strict";Cy();jy=e=>{let t=pd(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var _d,KU=l(()=>{"use strict";jE();_d=e=>{let t=jy(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var Zre,Qre,eoe,qU,JU=l(()=>{"use strict";Zre=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),Qre=/^\{\{[a-zA-Z0-9_-]+\}\}$/,eoe=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(Zre(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},qU=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>Qre.test(n)?n:eoe(n,r)).join("")}});var NE,YU=l(()=>{"use strict";JU();NE=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:qU(o.prompt,t)}))}))});var toe,kd,XU=l(()=>{"use strict";Tr();jE();toe=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),kd=e=>{let t=jy(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=toe(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var wd,ZU=l(()=>{"use strict";wE();wd=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return md({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Td,HE=l(()=>{"use strict";Ji();Td=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ye(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var FE,QU=l(()=>{"use strict";HE();FE=e=>{let t=Td({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var ls,e1=l(()=>{"use strict";ls=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var roe,ooe,le,Ny=l(()=>{"use strict";Pd();roe=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},ooe=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,le=e=>{let t=pe(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:roe(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>ooe(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var t1,r1=l(()=>{"use strict";Pd();Ny();t1=e=>{let t=le(e.wizard),r=pe(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var zE,o1=l(()=>{"use strict";r1();zE=e=>{let t=t1({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var noe,n1,s1=l(()=>{"use strict";noe=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},n1=e=>[...e].reduce(noe,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var soe,i1,a1=l(()=>{"use strict";soe=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},i1=e=>[...e].reduce(soe,{out:"",inString:!1,escaped:!1}).out});var ioe,aoe,l1,c1=l(()=>{"use strict";s1();a1();ioe=e=>e.charCodeAt(0)===65279?e.slice(1):e,aoe=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},l1=e=>i1(n1(aoe(ioe(e))))});var loe,coe,doe,d1,poe,Zi,Dy=l(()=>{"use strict";SE();c1();loe=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},coe=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},doe=e=>[...e].reduce(coe,{out:"",inString:!1,escaped:!1}).out,d1=e=>{let t=vy(e);return t.length===0?null:t[t.length-1]},poe=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Zi=e=>{let t=l1(loe(e)),r=d1(t);if(r!==null)return r;let o=doe(t),n=d1(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw poe(i)}}});var uoe,moe,$E,p1,u1=l(()=>{"use strict";uoe=/^[a-z0-9][a-z0-9-]{0,62}$/,moe=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return uoe.test(t)?t:""},$E=e=>e.replace(/\s+/gu," ").trim(),p1=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=moe(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=$E(n.name),a=$E(n.description),c=$E(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var m1,g1,f1=l(()=>{"use strict";m1=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},g1=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var UE,y1=l(()=>{"use strict";Dy();u1();f1();UE=(e,t)=>{let r=(()=>{try{return Zi(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(m1(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(g1).filter(a=>a!==null),i=p1({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var BE,h1=l(()=>{"use strict";BE=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var GE,S1=l(()=>{"use strict";GE=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var VE,P1=l(()=>{"use strict";Pd();Ny();VE=e=>{let t=le(e.wizard),r=pe(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var Ed,A1=l(()=>{"use strict";Ed=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var Zt,goe,KE,b1=l(()=>{"use strict";Zt=m(Js());Dy();goe=(0,Zt.isType)({name:Zt.isNonEmptyString,description:Zt.isString,sampleValue:Zt.isString}),KE=e=>{let t=Zi(e);if(!(0,Zt.isType)({templatedPrompt:Zt.isNonEmptyString,variables:(0,Zt.isArrayWithEachItem)(goe)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var he,foe,yoe,qE,_1=l(()=>{"use strict";he=m(Js());Tr();Dy();foe=(0,he.isType)({id:he.isNonEmptyString,title:he.isNonEmptyString,prompt:he.isNonEmptyString,order:he.isNumber}),yoe=(0,he.isType)({id:he.isNonEmptyString,title:he.isNonEmptyString,summary:he.isString,topology:(0,he.isOneOf)("chain","parallel"),modules:(0,he.isArrayWithEachItem)(foe),recommended:he.isBoolean}),qE=e=>{let t=Zi(e);if(!(0,he.isType)({options:(0,he.isArrayWithEachItem)(yoe)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Qi,k1=l(()=>{"use strict";Qi=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var hoe,JE,YE=l(()=>{"use strict";hoe=/\{\{([a-zA-Z0-9_-]+)\}\}/g,JE=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(hoe,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Qt,er,w1=l(()=>{"use strict";Ji();YE();Qt=e=>JE(e.templatedPrompt,e.variables),er=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ye(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Qt(e.wizard)}});var Soe,cs,T1=l(()=>{"use strict";Soe=/\{\{([a-zA-Z0-9_-]+)\}\}/g,cs=(e,t)=>e.replace(Soe,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var Poe,ds,Hy=l(()=>{"use strict";Poe=/\{\{([a-zA-Z0-9_-]+)\}\}/g,ds=e=>{let t=new Set,r=[];for(let o of e.matchAll(Poe)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Rd,E1=l(()=>{"use strict";Hy();Rd=e=>e.variables.length>0||ds(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var XE,ZE=l(()=>{"use strict";Tr();XE=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Cd,R1=l(()=>{"use strict";Ji();ZE();Cd=e=>{let t=e.wizard.evaluateSelectedRound??ye(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:XE(r.judgement,e.passScore)}});var vd,C1=l(()=>{"use strict";vd=e=>e.length===1&&e[0].modules.length===1});var QE,v1=l(()=>{"use strict";QE=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Oe,Fy,Ld=l(()=>{"use strict";Oe=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),Fy=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var L1,I1=l(()=>{"use strict";Ld();L1=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Oe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Oe("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Oe("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var x1,W1=l(()=>{"use strict";qi();Ld();x1=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!v(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Oe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),Oe("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Oe("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",Fy(e.writerLabel,e.folder)),Oe("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Oe("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var O1,M1=l(()=>{"use strict";Ld();O1=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Oe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Oe("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Oe("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var j1,N1=l(()=>{"use strict";Ld();j1=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Oe("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Oe("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",Fy(e.writerLabel,e.folder)),...r?[Oe("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var zy,D1=l(()=>{"use strict";qi();I1();W1();M1();N1();zy=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(v(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return x1(r);case"evaluate":return L1({...r,currentRound:e.currentRound});case"separate":return j1(r);case"optimize_modules":return O1({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Id,Qr,H1=l(()=>{"use strict";Id=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),Qr=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var Aoe,$y,eR,F1=l(()=>{"use strict";Hy();Aoe="wizardParam_",$y=e=>`${Aoe}${e}`,eR=e=>{let t=ds(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=$y(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var _t,z1=l(()=>{"use strict";_t=["generalize","evaluate","separate","optimize_modules"]});var xd,ps,ea,eo=l(()=>{"use strict";xd="Stopped because the confirmed token or spend budget was exceeded.",ps="Approaching the confirmed budget. Further trials may hard-stop.",ea="Confirm the Step 4 token and spend budget before optimizing modules."});var kt,ta=l(()=>{"use strict";kt=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var rr,Wd=l(()=>{"use strict";eo();rr=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var boe,to,Od=l(()=>{"use strict";eo();boe={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},to=e=>{let t=e?.trim()??"";return t.length===0?.01:boe[t]??.01}});var Uy,tR=l(()=>{"use strict";eo();Od();Uy=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=to(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var $1,Gy,rR,oR=l(()=>{"use strict";eo();ta();Wd();tR();Od();$1=e=>{let t=Uy({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??to(e.writerId)??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:kt({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},Gy=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),rR=e=>{let t=e.existing??rr(),r=$1({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return Gy(t,r)}});var ra,Md,G1=l(()=>{"use strict";eo();Tr();ta();Wd();oR();tR();Od();ra=e=>{let t=Uy({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??to(e.writerId),i=r*4e3,a=n*o*8e3,c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:kt({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},Md=e=>{let t=e.existing??rr();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=ra({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return Gy(t,r)}});var ro,V1=l(()=>{"use strict";ta();eo();Wd();ro=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??rr(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=kt({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var sR,oa,K1=l(()=>{"use strict";eo();ta();sR=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=kt({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:xd,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:xd,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,p=s!==null&&s>0&&o>=s*c;return(d||p)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:ps,costControls:{...t,softWarnFired:!0,softWarnMessage:ps}}:null},oa=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var iR,q1=l(()=>{"use strict";iR=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var L=l(()=>{"use strict";qi();Ry();bU();fE();Iy();wE();kU();wU();TU();EU();yE();RU();Ji();WU();LE();CE();OU();NU();Tr();Pd();DU();$U();UU();BU();VU();KU();YU();XU();ZU();HE();QU();e1();Ny();o1();y1();h1();S1();P1();A1();b1();_1();k1();w1();YE();T1();Hy();E1();R1();C1();ZE();v1();D1();H1();F1();z1();eo();ta();Wd();oR();G1();Od();V1();K1();q1()});var aR=l(()=>{"use strict";Gl()});var _oe,X1,Z1=l(()=>{"use strict";aR();_oe=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,X1=e=>{let t=jn(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(_oe)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var eB,koe,woe,Er,Toe,Eoe,Q1,Ky,tB,Roe,xt,rB,oB,nB,or=l(()=>{"use strict";aR();Z1();eB=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),koe=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,woe=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,Er=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(koe.test(e.errorMessage))return"usage_limit";if(woe.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},Toe="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",Eoe="The writer waited on terminal input and did not return a prompt.",Q1=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Ky=e=>{let t=e.trim();if(t.length===0||t.length>=500||!Q1.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>Q1.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},tB=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},Roe=e=>Ky(e.stdout)??Ky(e.stderr)??(tB(e.replyFile)?Ky(e.replyFile):null),xt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return Toe;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?Eoe:null},rB=e=>{let t=e.trim();return t.length===0?null:xt(t)!==null?t:Ky(t)??(tB(t)?t:null)},oB=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],nB=e=>{let t=e.replyFileText?.trim()??"",r=xt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=Roe({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=Er({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=X1([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=jn(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var Coe,iB,sB,ms,qy=l(()=>{"use strict";or();Coe=400,iB=(e,t=Coe)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},sB=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:rB(e.promptText)},ms=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:sB(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=sB(e.revisions[n]);if(s!==null)return s.trim()}return null}});var W,voe,Jy,ue,gs,lB,aB,cB,dB,Me=l(()=>{"use strict";W="manual",voe=["claude-cli","codex","cursor","antigravity"],Jy={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ue=e=>e===W?"You":e in Jy?Jy[e]:e,gs=e=>voe.filter(t=>e.includes(t)),lB=e=>{let t=gs(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},aB=(e,t)=>t===W?W:e.find(r=>r===t)??null,cB=(e,t,r)=>{let o=gs(e),n=aB(o,t),s=aB(o,r);return n===null||s===null?null:{judge:n,improver:s}},dB=(e,t,r)=>{let o=gs(e);return t===null||t.trim()===""?r!==W?r:o[0]??null:t===W?null:o.find(n=>n===t)??null}});var pB,Yy,lR,fs,cR,wt,oo,Se,at=l(()=>{"use strict";pB=m(require("node:fs")),Yy=m(require("node:os")),lR=m(require("node:path"));jo();fs="~",cR=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,wt=e=>{let t=Yy.default.homedir(),r=cR(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},oo=e=>{let t=e.trim().length===0?"~":e.trim(),r=Ze(t),o=lR.default.isAbsolute(r)?cR(r):cR(lR.default.resolve(Yy.default.homedir(),r));try{if(!pB.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:wt(o)}},Se=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Yy.default.homedir()});var ct,Yo=l(()=>{"use strict";ct='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var dR,uB,Loe,mB,gB,pR=l(()=>{"use strict";L();Me();at();Yo();dR=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uB=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',Loe=e=>{let t=uB(e.state),r=`<h2>${dR(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${dR(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${ct}</button></div><template>${r}</template></li>`},mB=e=>{let t=e.wizard;if(t===void 0)return"";let r=zy({status:e.status,wizard:t,writerLabel:ue(e.judgeModel),runnerLabel:ue(e.runnerModel??e.judgeModel),folderDisplay:wt(Se(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(Loe).join("")}</ol>`},gB=e=>{let t=e.wizard;if(t===void 0)return"";let r=zy({status:e.status,wizard:t,writerLabel:ue(e.judgeModel),runnerLabel:ue(e.runnerModel??e.judgeModel),folderDisplay:wt(Se(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${uB(n.state)}<span class="sdlc-pipeline-label">${dR(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var nr,fB,yB,hB,uR=l(()=>{"use strict";L();nr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fB="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",yB=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${nr(fB)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${nr(i.name)}}}</strong> \u2014 ${nr(i.description)} (sample: ${nr(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${nr(r)}</pre>`,n=Qt(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${nr(n)}</pre>`;return`${t}${o}${s}`},hB=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${nr(fB)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${nr(n.name)}}}</strong> \u2014 ${nr(n.description)} (sample: ${nr(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${nr(r)}</pre>`;return`${t}${o}`}});var jd,mR=l(()=>{"use strict";jd=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var SB,PB=l(()=>{"use strict";L();SB=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=as({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=is({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var gR,Nd,fR=l(()=>{"use strict";Yo();PB();gR=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Nd=e=>{let t=SB(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${gR(r)}">${ct}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${gR(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${gR(t)}</pre></template>`}});var yR,Dd,hR=l(()=>{"use strict";Yo();yR=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Dd=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${yR(r)}">${ct}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${yR(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${yR(t)}</pre></template>`}});var Xy,na,SR=l(()=>{"use strict";mR();fR();hR();Xy=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),na=e=>{let t=jd(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${Xy(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,p=e.cycle.revisions.map(g=>{let f=g.judgement?.score,h=f==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${f}`,y=g.judgement?.reasons?.trim()??"",S=y.length===0?"":`<br><span class="muted">${Xy(y)}</span>`,u=Dd({roundLabel:d(g.roundNumber),promptText:g.promptText}),A=Nd({cycle:e.cycle,roundNumber:g.roundNumber,promptText:g.promptText,run:g.run}),T=`${u}${A}`;if(e.interactive){let P=e.selectedRound===g.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${P}> <span class="sdlc-wizard-revision-title">${Xy(h)}</span></label>${T}${S}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Xy(h)}</span>${T}${S}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var PR,AB,bB,_B,AR=l(()=>{"use strict";PR=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AB=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${PR(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${PR(t.prompt)}</pre></li>`).join("")}</ol>`,bB=e=>AB([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),_B=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${PR(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${AB(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var Hd,Ioe,Zy,bR=l(()=>{"use strict";L();AR();Hd=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ioe=e=>{let t=e.wizard;return t===void 0?"":er({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},Zy=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=Ioe(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Hd(n.orchestratorSkill.fileName)}</code> \u2014 ${Hd(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${Hd(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=bB(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${Hd(r)} <span class="muted">${Hd(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Ge,xoe,Woe,Ooe,Moe,Qy,joe,Noe,Doe,Hoe,Foe,zoe,sa,eh=l(()=>{"use strict";L();pR();uR();SR();fR();hR();bR();Ge=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xoe={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},Woe=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Ge(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Ge(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Ge(o)}</pre></details>`;return`<h2>${Ge(e)}</h2>${n}`},Ooe=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=Qt(t).trim(),n=er({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!v(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${Woe("What is being evaluated",i)}`},Moe=(e,t)=>{let r=e.wizard;if(r===void 0||v(e.status))return"";let o=xoe[t];return o===void 0||r.phase!==o?"":gB(e)},Qy=(e,t,r)=>{let o=Moe(e,t),n=t==="wizard-2"?Ooe(e):"";return`${o}${n}${r}`},joe=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},Noe=e=>{let t=e.wizard;return t===void 0?"":yB(t)},Doe=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Ge(a)}</span>`,d=`Round ${n.roundNumber}`,p=Dd({roundLabel:d,promptText:n.promptText}),g=Nd({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ge(s)}${i}</span>${p}${g}${c}</li>`}).join("")}</ul>`,Hoe=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return na({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=joe(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${Doe(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=er({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Ge(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",p=`Round ${c.roundNumber} \u2014 score ${d}`,g=Dd({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),f=Nd({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ge(p)}</span>${g}${f}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Ge(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},Foe=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Ge(n.title)}</strong> <span class="muted">(${Ge(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Ge(o.title)}</strong>${n}${Ge(s)}${Zy(e,o)}</li>`}).join("")}</ul>`},zoe=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Ge(i)}</span> <strong>${Ge(n.title)}</strong>${Ge(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Ge(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?na({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},sa=(e,t)=>{switch(t){case"wizard-1":return Qy(e,t,Noe(e));case"wizard-2":return Qy(e,t,Hoe(e));case"wizard-3":return Qy(e,t,Foe(e));case"wizard-4":return Qy(e,t,zoe(e));default:return""}}});var $oe,Uoe,kB,wB,TB=l(()=>{"use strict";L();qy();or();eh();$oe=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},Uoe=e=>{let t=e.goal.trim();return t.length===0?null:t},kB=(e,t,r,o,n)=>{let s=xt(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},wB=(e,t)=>{let r=Uoe(e);if(t.id.startsWith("wizard-")){let s=sa(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=yd(e,t);if(s!==null){let a=ms(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ye(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:kB(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:$oe(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:kB(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var ys,EB,RB=l(()=>{"use strict";ys=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),EB=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${ys(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${ys(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${ys(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${ys(n)}</h2><pre class="mono">${ys(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${ys(e.goal)}</dd></div></dl>`;return`<h2>${ys(e.title)}</h2>${i}${t}${r}${o}${s}`}});var Boe,CB,Fd,_R,th=l(()=>{"use strict";L();Boe=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),CB=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||v(e.status))return null;let r=Xt(t);return r<0||r>3?null:`wizard-${r+1}`},Fd=(e,t)=>Boe.has(t)?CB(e)===t:!1,_R="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var Goe,rh,kR=l(()=>{"use strict";Goe='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',rh=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${Goe}</button>`});var hs,oh=l(()=>{"use strict";L();hs=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:ud({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:gd(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var Voe,vB,Koe,wR,LB,qoe,Joe,Yoe,Xoe,IB,xB=l(()=>{"use strict";L();oh();Voe={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},vB=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},Koe=e=>Voe[e]??null,wR=(e,t)=>{let r=e.wizard,o=Koe(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=Xt(r);return o<n||o===n},LB=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},qoe=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:Qt(t).trim();return o.length===0?null:_d({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:vB(e,"generalize")})},Joe=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=hs(e);return n===null?null:qo({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=LB(e)?.promptText.trim()??er({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:as({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},Yoe=e=>{let t=e.wizard;if(t===void 0)return null;let r=er({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:kd({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:vB(e,"separate")})},Xoe=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=Qr(t),s=cs(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=hs(e);return c===null?null:qo({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=LB(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||v(e.status)&&i?.judgement!==null)?is({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):wd({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:ls(t,r).output,moduleTitle:o.title})},IB=(e,t)=>{if(!wR(e,t))return null;switch(t){case"wizard-1":return qoe(e);case"wizard-2":return Joe(e);case"wizard-3":return Yoe(e);case"wizard-4":return Xoe(e);default:return null}}});var Zoe,nh,TR=l(()=>{"use strict";L();Zoe=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},nh=(e,t)=>{let r=e.wizard,o=Zoe(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=Xt(r);return o<n?"done":o===n&&v(e.status)&&e.status==="failed"?"failed":o<=n&&v(e.status)?"done":"pending"}});var Qoe,ia,sh=l(()=>{"use strict";Yo();xB();TR();Qoe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ia=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(nh(e,t)==="pending")return""}else if(!wR(e,t))return"";let o=IB(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${ct}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${Qoe(o)}</pre></template>`}});var Ss,no,aa=l(()=>{"use strict";Ss=e=>e.toLocaleString("en-US"),no=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var Rr,ene,WB,ih,OB,MB,ah=l(()=>{"use strict";L();TB();RB();th();kR();Yo();qy();pR();sh();aa();Rr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ene=(e,t)=>{let r=yd(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?no(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${Ss(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Rr(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${Rr(r)}</span>`:"",d=EB(wB(t,e)),p=t.wizard!==void 0&&t.wizard.phase==="complete"&&v(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${Rr(e.id)}"`:"",g=Fd(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${Rr(_R)}"><input type="hidden" name="cycleId" value="${Rr(t.id)}"><input type="hidden" name="wizardStepId" value="${Rr(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",f=e.state==="active"&&e.id.startsWith("wizard-")?mB(t):"",h=o?"failed":e.state,y=o?ms(t):null,S=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${ct}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${Rr(y)}</pre></template>`:"",u=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?ia(t,e.id):"";return`<li class="sdlc-node sdlc-node-${h}" data-sdlc-step-id="${Rr(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${p} data-sdlc-node>${n}<span class="sdlc-node-label">${Rr(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${g}${u}${S}</div></div>${f}<template>${d}</template></li>`},WB=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>ene(r,t)).join("")}</ol>`,ih=e=>`<div class="sdlc-score" aria-label="What the score means">${fd(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Rr(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,OB=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${rh({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,MB=`<script>
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
</script>`});var lh,ch,dh,jB,ER=l(()=>{"use strict";lh="support-reply",ch="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",dh=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),jB=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var ph,NB,DB=l(()=>{"use strict";L();ah();ER();ph=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),NB=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${ih(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${ph(ch)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${ph(dh)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${ph(jB)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${ph(lh)}">Run this sample</a>
      </div>
    </section>`});var RR,uh,tne,HB,FB=l(()=>{"use strict";RR=m(require("node:fs")),uh=m(require("node:path")),tne=e=>uh.default.join(uh.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),HB=(e,t)=>{let r=tne(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;RR.default.mkdirSync(uh.default.dirname(r),{recursive:!0}),RR.default.appendFileSync(r,o,"utf8")}});var la,zB,rne,$B,one,UB,Cr,Q,BB,z,Tt=l(()=>{"use strict";la=m(require("node:fs")),zB=m(require("node:path"));L();FB();rne=e=>e.wizard===void 0?e:{...e,wizard:OE(e.wizard)},$B=new Set,one=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),UB=(e,t)=>{la.default.mkdirSync(zB.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;la.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),la.default.renameSync(r,e)},Cr=e=>{if(!la.default.existsSync(e))return[];try{let t=JSON.parse(la.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(one).map(rne):[]}catch{return[]}},Q=(e,t)=>Cr(e).find(r=>r.id===t)??null,BB=(e,t)=>{$B.add(t);let r=Cr(e).filter(o=>o.id!==t);UB(e,r)},z=(e,t)=>{if($B.has(t.id))return;let r=Cr(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];UB(e,o),HB(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var ca,vr,zd,GB,mh,nne,VB,KB,qB,CR=l(()=>{"use strict";ca=m(require("node:fs")),vr=m(require("node:path")),zd=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},GB=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),mh=(e,t)=>{let r=zd(e);return r.length>0?r:zd(t)},nne=e=>{let t=mh(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${GB(o)}`,...n.length>0?[`description: ${GB(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},VB=e=>`.cursor/skills/${e}/SKILL.md`,KB=(e,t)=>{let r=zd(t);if(r.length===0)return!1;let o=vr.default.resolve(e),n=vr.default.resolve(o,".cursor","skills"),s=vr.default.resolve(o,VB(r));return s.startsWith(`${n}${vr.default.sep}`)?ca.default.existsSync(s):!1},qB=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(mh(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=vr.default.resolve(e.workingDirectory);try{if(!ca.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=nne({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=VB(r.slug),n=vr.default.resolve(t,".cursor","skills"),s=vr.default.resolve(t,o);if(!s.startsWith(`${n}${vr.default.sep}`))return{ok:!1,errorCode:"path"};if(ca.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{ca.default.mkdirSync(vr.default.dirname(s),{recursive:!0}),ca.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var sne,JB,YB,XB=l(()=>{"use strict";L();Tt();at();or();CR();sne=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,JB=e=>{let t=e.get("savedSkill");return t!==null&&sne.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},YB=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=Q(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!v(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ye(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||xt(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=qB({workingDirectory:Se(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var gh,fh,$d=l(()=>{"use strict";L();gh=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=ro({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},fh=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var Xo,Ud=l(()=>{"use strict";L();$d();Xo=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=QE(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=rR({moduleCount:o.length,existing:e.costControls,writerId:n}),i=gh(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Id(r.variables)},updatedAt:new Date().toISOString()}}});var Zo,Bd=l(()=>{"use strict";Zo=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var vR=l(()=>{"use strict";Ut();Qc();Gl()});var LR,ZB,IR,QB,eG=l(()=>{"use strict";LR={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},ZB=e=>e.exitCode===null&&e.signalCode===null,IR=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!ZB(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!ZB(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),QB=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),IR(e).then(s=>{r({...LR,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var tG,Gd,rG,xR,ine,OR,MR,ane,lne,cne,oG,dne,WR,nG,Vd,sG,pne,une,dt,Ps=l(()=>{"use strict";tG=require("node:child_process"),Gd=m(require("node:fs")),rG=m(require("node:os")),xR=m(require("node:path"));vR();eG();or();ine=["claude-cli","codex","cursor","antigravity"],OR=18e4,MR=6e5,ane=12e4,lne=9e5,cne="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",oG="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",dne="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",WR=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},nG=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=WR(process.env[oG])??Math.max(r,MR));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:WR(process.env[dne])??lne;return Math.min(o,Math.max(ane,r))},Vd=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?WR(process.env[oG])??MR:OR,sG=e=>`The writer timed out after ${e}ms.`,pne=e=>ine.includes(e),une=e=>e===!0||process.env[cne]==="1",dt=e=>new Promise(t=>{if(e.signal?.aborted){t(LR);return}if(une(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!pne(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=yr(r,e.prompt,ke({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!Gd.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:OR,s=xR.default.join(Gd.default.mkdtempSync(xR.default.join(rG.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=oB({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},p=(0,tG.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),g=f=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(f))};QB(p,e.signal,g,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",IR(p).then(f=>{g({ok:!1,errorMessage:sG(n),errorKind:"writer_timeout",killSignal:f})})},n),p.stdout.on("data",f=>{a.push(Buffer.from(f))}),p.stderr.on("data",f=>{c.push(Buffer.from(f))}),p.on("error",()=>g({ok:!1,errorMessage:"The writer failed to start."})),p.on("close",()=>{if(d.settled)return;let f=Gd.default.existsSync(s)?Gd.default.readFileSync(s,"utf8"):null,h=nB({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:f});if(h.ok&&d.stopReason!=="abort"){g(h);return}d.stopReason===null&&g(h)})})});var mne,Kd,jR=l(()=>{"use strict";L();aa();mne=e=>{if(e.wizard!==void 0){let t=Ed(e.wizard),r=no(e);return(t??0)+r}return no(e)},Kd=e=>{let t=sR({costControls:e.costControls,spentTokens:mne(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var iG,gne,qd,yh,hh=l(()=>{"use strict";L();Me();jR();iG=e=>e===W?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},gne=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),qd=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=kE({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:iG(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?iR({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:gd(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=gne(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?Kd({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):Kd({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},yh=(e,t,r=null)=>{let o=xy({raw:t,judge:iG(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Sh,NR=l(()=>{"use strict";Sh=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var cG,Ph,Ah,aG,lG,DR,fne,dG,HR,yne,pG,hne,Sne,uG,mG=l(()=>{"use strict";cG=require("node:child_process"),Ph=m(require("node:fs")),Ah=m(require("node:path"));wf();L();aG=4e3,lG=12e3,DR=(e,t)=>{let r=(0,cG.spawnSync)("git",[...t],{cwd:e,env:$o(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},fne=e=>DR(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",dG=e=>{let t=DR(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},HR=(e,t)=>{let r=Ah.default.resolve(e,t),o=Ah.default.relative(e,r);if(o.startsWith("..")||Ah.default.isAbsolute(o)||!Ph.default.existsSync(r)||!Ph.default.statSync(r).isFile())return null;let n=Ph.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>aG?`${n.slice(0,aG)}
\u2026truncated`:n},yne=e=>e.length>lG?`${e.slice(0,lG)}
\u2026truncated`:e,pG=e=>{let t=EE(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,HR(e.workingDirectory,n)])),o=fne(e.workingDirectory);return{git:o,status:o?dG(e.workingDirectory):{},files:r,paths:t}},hne=(e,t)=>{let r=DR(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=HR(e,t);return o===null?`${t} is missing.`:o},Sne=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",uG=e=>{let t=e.before.git?dG(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=HR(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>hne(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:Sne(e.before.git,e.before.paths.length>0),evidence:yne(i.join(`

`))}}});var $R,q,UR,Ve,gG,Pne,Ane,fG,da,yG,pa,bne,_ne,Jd,FR,zR,kne,hG,wne,Tne,Ene,SG,Rne,PG,AG,Cne,vne,bG,_G=l(()=>{"use strict";$R=require("node:child_process"),q=m(require("node:fs")),UR=m(require("node:os")),Ve=m(require("node:path"));wf();gG=8e6,Pne=16e6,Ane=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],fG=(e,t)=>{let r=(0,$R.spawnSync)("git",[...t],{cwd:e,env:$o(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},da=(e,t)=>(0,$R.spawnSync)("git",[...t],{cwd:e,env:$o(),timeout:8e3}).status===0,yG=e=>{let t=fG(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},pa=(e,t)=>{let r=Ve.default.resolve(e,t),o=Ve.default.relative(e,r);return o.startsWith("..")||Ve.default.isAbsolute(o)?null:r},bne=(e,t)=>{let r=pa(e,t);if(r===null||!q.default.existsSync(r))return null;let o=q.default.statSync(r);return!o.isFile()||o.size>gG?null:q.default.readFileSync(r)},_ne=(e,t,r)=>{let o=pa(e,t);o!==null&&(q.default.mkdirSync(Ve.default.dirname(o),{recursive:!0}),q.default.writeFileSync(o,r))},Jd=(e,t)=>{let r=pa(e,t);r===null||!q.default.existsSync(r)||q.default.rmSync(r,{recursive:!0,force:!0})},FR=(e,t)=>da(e,["cat-file","-e",`HEAD:${t}`]),zR=e=>{let t=fG(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},kne=e=>Ve.default.resolve(e)!==Ve.default.resolve(UR.default.homedir()),hG=e=>{if(!q.default.existsSync(e))return 0;let t=q.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?q.default.readdirSync(e).reduce((r,o)=>r+hG(Ve.default.join(e,o)),0):0},wne=(e,t,r)=>{let o=pa(e,r);if(o===null||!q.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(hG(o)>Pne)return{relativePath:r,existed:!0,copyDir:null};let n=Ve.default.join(t,"cache",r);return q.default.mkdirSync(Ve.default.dirname(n),{recursive:!0}),q.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},Tne=400,Ene=32e6,SG=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!q.default.existsSync(s)))for(let i of q.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=Ve.default.join(s,i),c=q.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>gG)){if(t.length>=Tne||r+c.size>Ene){o=!1;return}r+=c.size,t.push(Ve.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},Rne=(e,t,r)=>{let o=pa(e,r);if(o===null||!q.default.existsSync(o))return null;let n=bne(e,r);if(n===null)return"skip";let s=Ve.default.join(t,"files",r);return q.default.mkdirSync(Ve.default.dirname(s),{recursive:!0}),q.default.writeFileSync(s,n),s},PG=e=>{let t=q.default.mkdtempSync(Ve.default.join(UR.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?yG(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:SG(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,Rne(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?zR(e.workingDirectory):null,isolateCaches:kne(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:Ane.map(i=>wne(e.workingDirectory,t,i))}},AG=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Jd(e.workingDirectory,t);return}_ne(e.workingDirectory,t,q.default.readFileSync(r))}},Cne=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?AG(e,t):FR(e.workingDirectory,t)?da(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Jd(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&FR(e.workingDirectory,t)&&da(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!FR(e.workingDirectory,t)&&da(e.workingDirectory,["reset","-q","HEAD","--",t])},vne=(e,t)=>{let r=pa(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Jd(e.workingDirectory,t.relativePath),q.default.mkdirSync(Ve.default.dirname(r),{recursive:!0}),q.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Jd(e.workingDirectory,t.relativePath);return}if(q.default.existsSync(r))for(let o of q.default.readdirSync(r)){let n=Ve.default.join(r,o);q.default.statSync(n).mtimeMs>=e.startedMs-1e3&&q.default.rmSync(n,{recursive:!0,force:!0})}}}},bG=e=>{try{if(e.git){if(zR(e.workingDirectory)!==e.head&&(!(e.head===null?da(e.workingDirectory,["update-ref","-d","HEAD"]):da(e.workingDirectory,["reset","--hard",e.head]))||zR(e.workingDirectory)!==e.head))throw new Error("head");let r=yG(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))Cne(e,o)}else{if(e.complete)for(let t of SG(e.workingDirectory).paths)e.files[t]===void 0&&Jd(e.workingDirectory,t);for(let t of Object.keys(e.files))AG(e,t)}for(let t of e.caches)vne(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{q.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var bh,_h,Lne,Ine,xne,Wne,One,kG,Mne,wG,TG=l(()=>{"use strict";L();hh();NR();mG();_G();Me();at();or();Ps();bh=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),_h=e=>({...e,status:"stopped",errorMessage:ss,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),Lne=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),Ine=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==W?t:e.improverModel!==W?e.improverModel:null}return e.judgeModel!==W?e.judgeModel:e.improverModel!==W?e.improverModel:null},xne=async e=>{let t=Se(e.cycle),r=pG({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=PG({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?wd({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:ls(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):md({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=nG({promptText:e.revision.promptText,isModuleRun:i}),c=Vd({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},p=await dt({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),g=p.ok?uG({workingDirectory:t,before:r,writerReply:p.text}):null,f=bG(o),h={...e.cycle,revisions:e.cycle.revisions.map(y=>y.roundNumber===e.cycle.currentRound?d:y)};return p.ok?!f.ok||g===null?{ok:!1,cycle:bh(h,f.ok?"Could not put the folder back after the run.":f.errorMessage)}:{ok:!0,cycle:h,run:{output:p.text.trim(),tokens:p.tokens,delayMs:Date.now()-n,lookedAt:g.lookedAt,evidence:g.evidence}}:p.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:_h(h)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:bh(h,p.errorMessage,Er(p))})},Wne=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:xne({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),One=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),kG=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await dt({writerAgent:e.reviewer,workingDirectory:Se(e.cycle),prompt:TE({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:_h(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},Mne=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===W)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await dt({writerAgent:t.judgeModel,workingDirectory:Se(t),prompt:as({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...qd(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?_h(o):(e.onWriterFailure?.(t.judgeModel),bh(o,n.errorMessage,Er(n)))},wG=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return Mne(e);let o=Ine(t),n=await Wne({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?Lne(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===W){let p=await kG({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...One(s,p.text),judgePhase:void 0}}let i=await dt({writerAgent:t.judgeModel,workingDirectory:Se(t),prompt:is({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?_h(s):(e.onWriterFailure?.(t.judgeModel),bh(s,i.errorMessage,Er(i)));let a=await kG({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=qd(s,i.text,c);return Sh(d,a.text)}});var kh,jne,Nne,BR,EG=l(()=>{"use strict";L();hh();TG();oh();or();Me();jR();at();Ps();kh=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),jne=e=>({...e,status:"stopped",errorMessage:ss,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),Nne=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?jne(e):(n?.(r),kh(e,t.errorMessage,Er(t))),BR=async(e,t,r,o)=>{let n=Kd(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return kh(e,"This round has no prompt.");if(e.status==="judging")return wG({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return kh(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===W)return e;let i=hs(e);if(i===null)return kh(e,"The improver needs the score and the reason.");let a=await dt({writerAgent:e.improverModel,workingDirectory:Se(e),prompt:qo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:Vd()}),c=Nne(e,a,e.improverModel,r,t);return c!==null?c:yh(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var Yd,GR,Dne,CG,RG,Hne,Fne,wh,vG,LG,zne,$ne,As,IG,xG,Xd=l(()=>{"use strict";L();Ud();Bd();Me();at();or();Ps();EG();mR();Yd=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),GR=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return Yd(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},Dne=e=>{let t=Er(e);return eB(e)||t==="usage_limit"||t==="action_required"},CG=(e,t,r)=>Dne(r)?Yd(e,r.errorMessage,Er(r)):GR(e,t,r.errorMessage),RG=e=>{let t=e.wizard;return t===void 0||jd(e).length===0?e:{...e,wizard:Qi({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},Hne=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",Fne=e=>{let t=e.wizard;if(t===void 0)return e;let r=Td({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Qi({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},wh=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),vG=e=>e.judgeModel!==W?e.judgeModel:e.improverModel!==W?e.improverModel:null,LG=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},zne=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=vG(e);if(n===null)return Yd(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Qt(o),i=_d({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:LG(e,"generalize")}),a=await dt({writerAgent:n,prompt:i,workingDirectory:Se(e),signal:t});if(!a.ok)return r?.(n),CG(e,"generalize",a);try{let c=KE(a.text),d=Qi({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Id(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return Rd(d)?As({...p,wizard:{...d,gate:null}}):wh(p,"generalize")}catch(c){return GR(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},$ne=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=vG(e);if(n===null)return Yd(e,"Choose a writer to suggest splits.");let s=er({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=kd({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:LG(e,"separate")}),a=await dt({writerAgent:n,prompt:i,workingDirectory:Se(e),signal:t});if(!a.ok)return r?.(n),CG(e,"separate",a);try{let c=qE(a.text),d=NE(c,o.variables),p=Qi({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),g={...e,wizard:p};return vd(d)?Xo(g,d[0]):wh(g,"separate")}catch(c){return GR(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},As=e=>{let t=e.wizard;if(t===void 0)return e;let r=Qt(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},IG=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Yd(e,"This module is missing.");let n=Qr(r),s=cs(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==W?e.runnerModel:e.judgeModel!==W?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:pe(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},xG=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return BR(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return zne(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return $ne(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await BR(e,t,r,o);if(v(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&jd(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let g=ye(s.revisions.map(f=>({roundNumber:f.roundNumber,promptText:f.promptText,score:f.judgement?.score??0,reasons:f.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:g}}}if(i==="evaluate"&&Cd({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let p=RG(wh(a,i));return Zo(p)}let c=wh(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=FE({wizard:{...c.wizard,modules:c.wizard.modules.map((g,f)=>f===c.wizard.currentModuleIndex&&g.status==="running"?{...g,status:"paused"}:g)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:Hne(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?RG(d):Fne(d)}return s}return n.phase==="complete",e}});var ua,Th=l(()=>{"use strict";L();Me();ua=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:BE(r,e.judgeModel===W),updatedAt:new Date().toISOString()}}});var ma,Eh=l(()=>{"use strict";ma=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var Wt,WG,Une,OG=l(()=>{"use strict";L();at();Eh();or();CR();Wt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WG=e=>{if(!v(e.status))return"";let t=ye(e.revisions.map(f=>({roundNumber:f.roundNumber,promptText:f.promptText,score:f.judgement?.score??null,reasons:f.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=xt(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Wt(t.reasons.trim())}</p>`,i=e.status==="passed",a=ma(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${Wt(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${Wt(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',p=n!==null?`<div class="alert-error">${Wt(n)}</div>`:i?Une({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:Se(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${Wt(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${Wt(t.promptText)}</pre></details>`,g=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${g}</h2>${d}${o}${s}${p}</section>`},Une=e=>{let t=e.sourceSkill?.fileName??zd(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=mh(t,r),s=n.length>0&&KB(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Wt(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Wt(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Wt(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Wt(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Wt(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Wt(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var MG,jG=l(()=>{"use strict";MG=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var NG,Bne,Rh,pt,Ch,VR=l(()=>{"use strict";L();Me();jG();qy();or();Eh();NG=["Generalize","Evaluate","Separate","Optimize modules"],Bne=e=>{let t=Xt(e),r=t>=0&&t<NG.length?NG[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},Rh=(e,t)=>{let r=ms(e),o=r===null?null:MG(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},pt=(e,t)=>({title:e,detail:t,replyPreview:null}),Ch=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=ms(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:iB(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!v(e.status)){let t=e.judgeModel;return pt(`${ue(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!v(e.status)){let t=e.judgeModel;return pt(`${ue(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===W?pt(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?pt(`${ue(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):pt(`${ue(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===W){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==W?pt(`${ue(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):pt(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return pt(`${ue(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=pe(t);return pt(`${ue(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return pt(`${ue(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=pe(t);return pt(`${ue(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return pt(`${ue(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===W){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return pt("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return pt(`${ue(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>xt(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=le(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||v(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?Rh(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=ma(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?Rh(e,{title:`${Bne(r)}${s}`,detail:t.length>0?t:n}):Rh(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(v(e.status)){let t=e.errorMessage?.trim()??"";return Rh(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var Lr,Zd=l(()=>{"use strict";Me();Lr=e=>{if(e.status==="improving"&&e.improverModel===W)return!0;if(e.status!=="judging"||e.judgeModel!==W)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===W}});var DG,HG=l(()=>{"use strict";DG=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Qo,Gne,FG,zG=l(()=>{"use strict";L();Qo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Gne=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Qo(r)}</p>`},FG=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Qo(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${Qo(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Qo(a)}.</p>`}<pre class="mono">${Qo(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Jo(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Qo(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",g=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Qo(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${Gne(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Qo(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Qd,Vne,$G,UG=l(()=>{"use strict";L();or();Qd=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Vne=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=xt(t.promptText),n=t.judgement?.reasons?`<p class="muted">${Qd(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Qd(i)}.</p>`}<pre class="mono">${Qd(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Jo(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${Qd(d)}</pre>`:`<div class="alert-error">${Qd(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},$G=e=>e.revisions.map(t=>Vne(e,t)).join("")});var BG,GG=l(()=>{"use strict";L();BG=e=>{if(v(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Ir,Kne,KR,qne,Jne,Yne,Xne,VG,KG,qR=l(()=>{"use strict";GG();Ir=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Kne="Stop this run? Writers will stop and the best prompt is kept.",KR="End the wizard? Writers will stop and progress from finished steps is kept.",qne="Skip this module and pause at the step gate?",Jne=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${Ir(Kne)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Ir(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,Yne=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${Ir(KR)}"><input type="hidden" name="cycleId" value="${Ir(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,Xne=e=>{let t=Ir(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Ir(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${Ir(qne)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${Ir(KR)}">End wizard</button>
    </form>
  </div>`},VG=e=>{let t=BG(e);return t==="none"?"":t==="legacy_stop"?Jne(e.id):t==="wizard_end_only"?Yne(e.id):Xne(e)},KG=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=Ir(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${Ir(KR)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var qG,JG=l(()=>{"use strict";L();aa();qG=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=le(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${Ss(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${Ss(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${pe(r)}`}return""}});var Zne,Qne,YG,ese,XG,ZG=l(()=>{"use strict";L();JG();TR();eh();sh();Zne=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',Qne=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',YG=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ese=(e,t,r)=>{let o=sa(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=qG(e,t),i=nh(e,t),a=Zne(i),c=Qne(i),d=ia(e,t,{forOutcomeSummary:!0}),p=`${a}<span class="sdlc-wizard-outcome-step-title">${YG(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${YG(s)}</span>`,g=t==="wizard-4"&&r.phase==="complete"?" open":"",f=i==="failed"&&t!=="wizard-4"?" open":"",h=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${h}"${g}${f}><summary aria-controls="${h}-body">${p}</summary><div class="sdlc-wizard-outcome-step-body" id="${h}-body">${o}</div></details>`},XG=e=>{let t=e.wizard;if(t===void 0||!v(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>ese(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var QG,e2,t2=l(()=>{"use strict";QG=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),e2=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${QG(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${QG(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var JR,r2,YR=l(()=>{"use strict";JR=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,r2=(e,t)=>{if(JR(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var o2,n2=l(()=>{"use strict";o2=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var vh,s2,i2=l(()=>{"use strict";L();YR();YR();n2();vh=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),s2=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=le(t),o=pe(t),n=r.terminalStatusSuggestion==="passed"?"":o2(r,o),s=o-10,i=r.rows.map((c,d)=>{let p=t.modules[d],g=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,h=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=p===void 0?c.status:r2(p,o),S=p!==void 0&&JR(p,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':y==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':y==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':vh(y);return`<tr${h}><td>${vh(c.title)}</td><td>${vh(g)}</td><td>${c.tokens??"\u2014"}</td><td>${S}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${vh(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var bs,Lh,XR=l(()=>{"use strict";bs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lh=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${bs(r.fileName)}</code> \u2014 ${bs(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${bs(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${bs(i.name)}</strong> <code>.cursor/skills/${bs(i.fileName)}/SKILL.md</code></p><p class="muted">${bs(i.description)}</p><p>${bs(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var tse,a2,l2=l(()=>{"use strict";L();t2();i2();XR();tse=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),a2=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!v(e.status)||t.modules.length===0)return"";let r=s2(e),o=e2(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=le(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${tse(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${Lh(e)}${a}${r}${o}</section>`}});var Y,Ih=l(()=>{"use strict";L();Y={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var xh,ZR=l(()=>{"use strict";xh=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var c2,d2=l(()=>{"use strict";Ih();ZR();c2=e=>{let t=xh({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:Y.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var so,ep=l(()=>{"use strict";so=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var io,Wh,QR=l(()=>{"use strict";L();ah();OG();VR();Zd();HG();oh();zG();UG();qR();ZG();l2();aa();d2();at();ep();io=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Wh=e=>{let t=!v(e.status)&&e.status!=="wizard_paused"&&!Lr(e),r=Ch(e),o=WB(IE(DG(e)),e),n=v(e.status)?"":VG(e),s=XG(e),i=a2(e),a=WG(e),c=e.errorMessage===null?"":`<div class="alert-error">${io(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?le(e.wizard):null,f=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,h=!t&&e.wizard!==void 0&&v(e.status)&&(e.wizard.phase==="complete"||le(e.wizard).passedModuleCount>0),y=h?f?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",S=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${io(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",u=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${io(r.replyPreview)}</pre>`,A=r.detail.length===0&&S.length===0&&u.length===0||r.detail.length===0&&u.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${io(r.detail)}${p}</p>`}${u}</div>`,T=e.revisions.find(un=>un.roundNumber===e.currentRound),P=e.status==="improving"?hs(e):null,b=no(e),k=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),E=Lr(e)?FG({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:P?.promptText??T?.promptText??"",score:P?.score??T?.judgement?.score??null,reasons:P?.reasons??T?.judgement?.reasons??null,avoid:P?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:T?.run??null,minJudgeScore:k?1:0}):"",w=e.wizard!==void 0&&e.wizard.phase==="complete"&&v(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!w&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?pe(e.wizard):e.passScore,j=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${ih(I)}</div>`:"",O=e.status==="failed"?c2({status:e.status,errorKind:e.errorKind}):null,$=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':v(e.status)?O!==null?`<span class="${O.badgeClass}">${O.badgeLabel}</span>`:w&&g!==null&&!f?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",B=t?d:h?f?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',Ce=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${io(wt(Se(e)))}</li>`:"",b>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${Ss(b)} so far</li>`:""].filter(un=>un.length>0),F=Ce.length===0?"":`<ul class="sdlc-run-meta">${Ce.join("")}</ul>`,nt=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,ko=w?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,wo=w?"":j.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${ko}</div>`:`<div class="sdlc-run-grid">${ko}${j}</div>`,lr=$G(e),MP=e.wizard!==void 0&&v(e.status)&&e.revisions.every(un=>un.roundNumber===0&&(un.judgement===void 0||un.judgement===null)),Va=lr.length===0||MP?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${lr}</div></section>`,jP=`<p class="sdlc-run-goal" title="${io(e.goal.trim())}">${io(so(e.goal))}</p>`,_u=w?`${c}${i}${s}${E}${a}`:`${c}${wo}${E}${s}${a}`,Us='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',T6=w?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${io(e.updatedAt)}" aria-busy="${t?"true":"false"}">${Us}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${$}</div>${jP}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${B}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${io(r.title)}</h2>${A}${S}${T6}</div></div>${F}${nt}</header>${_u}</section>${Va}`}});var p2,u2=l(()=>{"use strict";L();Bd();p2=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Cd({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:Zo(e)}});var m2,g2=l(()=>{"use strict";L();Xd();m2=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Rd(t)?e:As({...e,wizard:{...t,gate:null}})}});var f2,y2=l(()=>{"use strict";L();Ud();f2=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!vd(t.splitOptions))return e;let r=t.splitOptions[0];return Xo(e,r)}});var rse,_s,Oh=l(()=>{"use strict";u2();g2();y2();Tt();rse=e=>{let t=m2(e),r=p2(t);return f2(r)},_s=(e,t)=>{let r=rse(t);return r!==t?(z(e,r),r):t}});var h2,ao,tp=l(()=>{"use strict";L();h2=e=>_t.indexOf(e),ao=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||v(e.status)?_t.length:t.gate!==null?h2(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?h2(t.phase):null}});var S2,P2=l(()=>{"use strict";S2=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var ks,A2,b2=l(()=>{"use strict";L();P2();ks=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),A2=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=ls(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${ks(S2(o))}</pre></div>`:"",s=ds(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=Qr(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=$y(c),g=i[c]??"",f=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${ks(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${ks(p)}">${ks(f)}</label>
        ${h}
        <input class="input" type="text" id="${ks(p)}" name="${ks(p)}" value="${ks(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var _2,k2=l(()=>{"use strict";_2={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var rp,ose,Pe,en=l(()=>{"use strict";k2();Yo();rp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ose=e=>{let t=_2[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${rp(t.title)}" aria-describedby="${r}" aria-expanded="false">${ct}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${rp(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${rp(t.example)}</span></span></button>`},Pe=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${rp(r)}"`}>${rp(e)}</span>${ose(t)}</span>`});var Ot,w2,T2,E2=l(()=>{"use strict";L();$d();Ih();en();Ot=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),w2=e=>{let t=e.costControls;if(t===void 0||oa(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??kt({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${Ot(Y.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${Ot(t.softWarnMessage??ps)}</p>`:"",d=fh({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${Ot(Y.estimateOverCeilingWarn)}</p>`:"",p=e.wizard?.modules.length??0,g=p>0?`<p class="muted">Step 4 will optimize ${p} module${p===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${Ot(Y.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${Ot(Y.confirmLede)}</p>
  ${g}
  ${a}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${Ot(ea)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${Ot(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${Ot(Y.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${Ot(Y.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${Ot(Y.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
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
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${Ot(Y.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${Ot(Y.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},T2=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!oa(r)}});var nse,R2,C2=l(()=>{"use strict";Yo();nse=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),R2=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${ct}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${nse(t)}</pre></template>`}});var op,v2,L2=l(()=>{"use strict";L();uR();b2();SR();qR();XR();bR();E2();C2();op=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),v2=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(T2(e))return w2(e);let n=pe(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?hB(r):"",a=o==="evaluate"?Lh(e):"",c=o==="evaluate"?na({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",p=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(I=>{let j=I.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',O=I.recommended?' <span class="sdlc-badge">Recommended</span>':"",$=r.selectedSplitOptionId===I.id||r.selectedSplitOptionId===null&&I.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${op(I.id)}" required${$}> <strong>${op(I.title)}</strong>${j}${O}</label>${Zy(e,I)}</li>`}).join("")}</ul>`:"",g=r.modules[r.currentModuleIndex],h=o==="optimize_modules"&&g?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=g?.title??"Module",S=g?.prompt??"",u=g?.status==="pending",A=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${op(y)}</p>${u?A2({cycle:e,modulePrompt:S}):""}<p class="muted">Test run prompt preview: ${op(cs(S,Qr(r)))}</p>${g?.statistics===null||g?.statistics===void 0?"":`<p class="muted">Module stats: best ${g.statistics.bestScore??"\u2014"} / \u2265${n} (round ${g.statistics.bestRound??"\u2014"}).</p>`}${na({cycle:e,interactive:!1,caption:u?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",T=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":u?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",P=Ed(r),b=P===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${P}</p>`,k=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?R2(r.lastWriterParseFailureReply??""):"",E=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",w=t?.active===!0?" sdlc-wizard-gate-active":"",x=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${E}"`:"";return`<section class="card sdlc-wizard-gate${w}"${x}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${T}</p>
    ${k}
    ${b}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${op(e.id)}">
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
    ${KG(e)}
  </section>`}});var sse,I2,x2=l(()=>{"use strict";L();sh();sse=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),I2=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||v(e.status))return"";let r=(o,n)=>{let s=ia(e,o);return`<h2 class="sdlc-wizard-active-head">${sse(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var eC,W2,O2,tn,M2,ga=l(()=>{"use strict";L();Tt();eC=new Map,W2=e=>{let t=new AbortController;return eC.set(e,t),t.signal},O2=e=>{eC.delete(e)},tn=e=>{eC.get(e)?.abort()},M2=(e,t)=>{let r=Q(e,t);return r===null||r.wizard!==void 0?!1:(v(r.status)||(z(e,{...r,status:"stopped",errorMessage:ss,updatedAt:new Date().toISOString()}),tn(t)),!0)}});var j2,N2,tC,D2,rC=l(()=>{"use strict";L();tp();ga();j2="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",N2=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return _t[r]??null},tC=(e,t)=>{let r=N2(t);if(r===null||e.wizard===void 0)return!1;let o=_t.indexOf(r);if(o===-1)return!1;let n=ao(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<_t.length)},D2=(e,t)=>{let r=N2(t);if(r===null||e.wizard===void 0||!tC(e,t))return e;tn(e.id);let o=_t.slice(_t.indexOf(r)),n=bd(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var oC,H2,F2=l(()=>{"use strict";rC();oC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),H2=(e,t)=>tC(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${oC(j2)}"><input type="hidden" name="cycleId" value="${oC(e.id)}"><input type="hidden" name="wizardStepId" value="${oC(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var ise,z2,ase,$2,U2=l(()=>{"use strict";L();tp();L2();x2();F2();eh();ise={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},z2=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ase=(e,t,r)=>{let o=H2(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${z2(t)}">
  <summary class="sdlc-wizard-accordion-summary">${z2(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${sa(e,t)}</div>
</details>`},$2=e=>{let t=e.wizard;if(t===void 0)return"";let r=ao(e);if(r===null)return"";let o=_t.slice(0,r).map((i,a)=>ase(e,`wizard-${a+1}`,ise[i])),n=t.gate!==null?v2(e,{active:!0}):I2(e),s=r>=_t.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var Mh,nC=l(()=>{"use strict";U2();AR();L();Mh=e=>{if(e===null||e.wizard!==void 0&&v(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=$2(e),r=_B(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var lse,sC,B2=l(()=>{"use strict";L();Me();at();Ps();lse=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},sC=async(e,t,r)=>{if(!lse(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===W)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=zE({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await dt({writerAgent:e.judgeModel,prompt:n,workingDirectory:Se(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=UE(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var np,jh,G2,iC,V2,K2,q2,Nh,aC=l(()=>{"use strict";np=m(require("node:fs")),jh=m(require("node:path")),G2=e=>jh.default.join(jh.default.dirname(e),"prompt-optimizer-writer-ready.json"),iC=e=>{let t=G2(e);if(!np.default.existsSync(t))return{};try{let r=JSON.parse(np.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},V2=(e,t)=>{np.default.mkdirSync(jh.default.dirname(e),{recursive:!0}),np.default.writeFileSync(G2(e),`${JSON.stringify(t,null,2)}
`)},K2=(e,t)=>iC(e)[t]?.message??null,q2=(e,t,r)=>{V2(e,{...iC(e),[t]:{message:r}})},Nh=(e,t)=>{let r=iC(e);r[t]!==void 0&&V2(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var lC,Dh,Hh,J2,je,ws=l(()=>{"use strict";L();vR();Xd();B2();Zd();ga();aC();Oh();Tt();lC=new Set,Dh={atMs:0,ids:[]},Hh=async()=>{if(Date.now()-Dh.atMs<3e4)return Dh.ids;let e=await Yt({commands:ke({})});return Dh.atMs=Date.now(),Dh.ids=e.installedWriterIds,e.installedWriterIds},J2=async(e,t,r)=>{let o=Q(e,t);if(o===null||r.aborted)return;let n=_s(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(v(n.status)&&!s||n.status==="wizard_paused"||Lr(n))return;if(s){let c=await sC(n,r,d=>{Nh(e,d)});z(e,c);return}let i=await xG(n,c=>{Nh(e,c)},r,c=>{Q(e,t)?.status==="stopped"||r.aborted||z(e,c)});if(!(Q(e,t)?.status==="stopped"||r.aborted)){if(z(e,i),v(i.status)){let c=await sC(i,r,d=>{Nh(e,d)});z(e,c);return}await J2(e,t,r)}},je=(e,t)=>{if(lC.has(t))return;let r=Q(e,t);if(r===null)return;let o=_s(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(v(o.status)&&!n||o.status==="wizard_paused"||Lr(o))return;lC.add(t);let s=W2(t);J2(e,t,s).finally(()=>{lC.delete(t),O2(t)})}});var rn,sp=l(()=>{"use strict";QR();Oh();nC();ws();rn=(e,t)=>{let r=_s(e,t);return je(e,r.id),`${Wh(r)}${Mh(r)}`}});var Y2,X2,Z2=l(()=>{"use strict";Y2=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,X2=e=>e!==null&&e>0});var cse,dse,pse,Q2,e5=l(()=>{"use strict";L();Xd();Th();Ud();Bd();ga();th();th();cse=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),dse=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ye(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},pse=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=le(o);return ua({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},Q2=(e,t)=>{if(!Fd(e,t))return e;tn(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return As({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return Zo(dse(r));if(t==="wizard-3"){let n=o.splitOptions[0]??cse(o.templatedPrompt);return Xo(r,n)}return t==="wizard-4"?pse(r):e}});var Fh,t5,cC=l(()=>{"use strict";L();Th();ga();Fh=e=>(tn(e.id),{...ua(e,"stopped"),errorMessage:gE}),t5=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;tn(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var use,r5,o5,n5=l(()=>{"use strict";L();Xd();Th();Ud();Bd();sp();Tt();ws();Z2();rC();e5();cC();use="Pick a revision scored above 0 before continuing to Separate.",r5=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),o5=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=Q(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=Q(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(rn(e.storePath,d))};if(o==="wizard-stop-all"){let c=Fh(s);return z(e.storePath,c),je(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=t5(s);return z(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=D2(s,c);return z(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=Q2(s,c);return z(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&je(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",g=ME(s.wizard,d,c);g=bd(g,d),g={...g,pendingStepInstructions:p};let f={...s,status:"judging",errorMessage:null,wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return z(e.storePath,f),je(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(f=>f.step==="generalize"),g=(s.errorMessage?.trim().length??0)>0&&!d?r5(s):As({...s,wizard:{...s.wizard,gate:null}});return z(e.storePath,g),je(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=Y2(s,p??-1);if(!X2(g)){let h={...s,errorMessage:use,updatedAt:new Date().toISOString()};return z(e.storePath,h),a(n),!0}let f=Zo({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return z(e.storePath,f),je(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=r5(s);return z(e.storePath,h),je(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(h=>h.id===p);if(g===void 0){let h={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return z(e.storePath,h),a(n),!0}let f=Xo(s,g);return z(e.storePath,f),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,p=d.currentModuleIndex,g=d.modules[p];if(g===void 0)return a(n),!0;if(!oa(s.costControls)){let u=t.get("confirmedTokenBudget")?.trim()??"",A=t.get("confirmedMaxSpendUsd")?.trim()??"";if(u.length===0){let P={...s,errorMessage:ea,updatedAt:new Date().toISOString()};return z(e.storePath,P),a(n),!0}let T=ro({existing:s.costControls,confirmedTokenBudget:Number(u),confirmedMaxSpendUsd:A.length===0?null:Number(A),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!T.ok){let P={...s,errorMessage:T.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,P),a(n),!0}s={...s,costControls:T.costControls,errorMessage:null,updatedAt:new Date().toISOString()},z(e.storePath,s)}let f=eR({wizard:d,modulePrompt:g.prompt,posted:t});if(!f.ok){let u={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,u),a(n),!0}let h={...d,parameterValues:f.parameterValues};if(g.status==="pending"){let u=IG({...s,wizard:{...h,gate:null}},p);return z(e.storePath,u),je(e.storePath,n),a(n),!0}let y=p+1;if(y>=d.modules.length){let u=le(h),A=ua({...s,wizard:h},u.terminalStatusSuggestion);return z(e.storePath,A),je(e.storePath,n),a(n),!0}let S={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...h,gate:"optimize_modules",currentModuleIndex:y},updatedAt:new Date().toISOString()};return z(e.storePath,S),a(n),!0}}return a(n),!0}});var mse,s5,gse,dC,fse,i5,a5=l(()=>{"use strict";Me();ga();cC();NR();hh();Zd();Tt();mse="Add a score from 0 to 100 and the reason for it.",s5="Add a score from 1 to 100 and the reason for it.",gse="Write the next prompt.",dC="This step is not waiting for you.",fse=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},i5=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=Q(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(z(e.storePath,Fh(a)),{kind:"saved",cycleId:i}):M2(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=Q(e.storePath,r);if(o===null||!Lr(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:dC};if(t==="manual-judge"){if(o.judgeModel!==W)return{kind:"invalid",cycle:o,errorMessage:dC};let i=fse(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?s5:mse};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:s5};let d=o.revisions.find(g=>g.roundNumber===o.currentRound)?.run?.tokenReview??"",p=Sh(qd(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return z(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==W)return{kind:"invalid",cycle:o,errorMessage:dC};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:gse};let s=yh(o,n);return z(e.storePath,s),{kind:"saved",cycleId:o.id}}});var l5,c5=l(()=>{"use strict";l5=`<script>
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
</script>`});var d5,p5=l(()=>{"use strict";d5=`<script>
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
</script>`});var u5,m5=l(()=>{"use strict";u5=`<script>
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
</script>`});var g5,f5=l(()=>{"use strict";g5=`<script>
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
</script>`});var y5,h5=l(()=>{"use strict";L();at();y5=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:wt(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(pe(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!v(t.status)}}});var S5,P5=l(()=>{"use strict";S5=`<script>
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
</script>`});var A5,b5=l(()=>{"use strict";L();tp();Eh();A5=e=>{let t=ma(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:v(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=ao(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=le(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=le(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return v(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var _5,k5=l(()=>{"use strict";_5=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var lo,yse,hse,w5,T5=l(()=>{"use strict";b5();k5();ep();lo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yse=e=>e.wizard===void 0?"legacy":"wizard",hse=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${lo(t)}">`,o=A5(e),n=_5(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${lo(o.badgeClass)}">${lo(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${lo(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${lo(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${yse(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${lo(e.id)}">${lo(so(e.goal))}</a><p class="muted">${lo(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${g}</div></li>`},w5=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>hse(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${lo(s)}</summary>${i}</details>`:i}});var pC,zh,E5,Sse,Pse,ip,R5,$h=l(()=>{"use strict";pC=m(require("node:fs")),zh=m(require("node:path"));at();E5=/^[a-z0-9-]+$/,Sse=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},Pse=(e,t)=>{if(!E5.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let g=Sse(p[2]??"");p[1]==="name"&&g.length>0&&(o=g),p[1]==="description"&&(n=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},ip=e=>{let t=oo(e);if(!t.ok)return[];let r=zh.default.resolve(t.path,".cursor","skills"),o=[];try{o=pC.default.readdirSync(r)}catch{return[]}return o.filter(n=>E5.test(n)).flatMap(n=>{let s=zh.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${zh.default.sep}`))return[];try{let i=Pse(pC.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},R5=(e,t)=>ip(e).find(r=>r.fileName===t)??null});var C5,Ase,v5,L5,I5=l(()=>{"use strict";en();C5=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ase=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),v5=e=>{if(e.length===0)return`<div class="field">${Pe("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${C5(r.fileName)}">${C5(r.fileName)}</option>`).join("");return`<div class="field">${Pe("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${Ase(e)}</script>`},L5=`<script>
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
</script>`});var ut,x5,W5=l(()=>{"use strict";L();Ih();$d();en();ut=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),x5=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=ut(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=ra({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??to(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),g=fh({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",f=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
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
</div>`}});var tt,O5,M5,bse,j5,N5,D5,H5=l(()=>{"use strict";L();VR();Me();ep();tp();tt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),O5=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",M5=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,bse=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},j5=e=>e===W?"You":ue(e),N5=e=>{let t=bse(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ue(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${tt(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${tt(t)}</dd></div>
      <div><dt>Judge</dt><dd>${tt(j5(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${tt(j5(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${tt(r)}</dd></div>
    </dl>
  </details>`},D5=e=>{let t=e.wizard;if(t===void 0)return"";let r=so(e.goal),o=e.status==="wizard_paused",n=!v(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=Ch(e),g=M5(t),f=g===null?"":O5(g),h=ao(e),y=f.length===0?"":h===null||h>=4?` <strong>${tt(f)}</strong>`:` <strong>${tt(f)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${tt(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${tt(p.title)}${y}</p>
    <p class="muted">${tt(p.detail)}</p>
    <div class="actions">
      ${N5(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${tt(e.id)}">Open this run</a>
    </div>
  </section>`}let s=M5(t),i=s===null?"Wizard":O5(s),a=ao(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${tt(r)}</h2>
    <p class="lede">Paused at <strong>${tt(i)}</strong>${tt(c)} (last updated ${tt(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${N5(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${tt(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var ap,F5,z5=l(()=>{"use strict";en();ap=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),F5=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${ap(n.id)}"${n.id===e.runner?" selected":""}>${ap(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${ap(e.runner)}">Checking ${ap(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Pe("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Pe("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${ap(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var $5,U5=l(()=>{"use strict";$5=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var fa,B5,G5,V5,K5,q5=l(()=>{"use strict";en();fa=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),B5=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${fa(c.id)}"${c.id===r?" selected":""}>${fa(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${fa(n)}</option>`;return`<div class="field">${Pe(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},G5=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${fa(t)}">Checking ${fa(o)}\u2026</p>`},V5=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Pe(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${fa(r)}</textarea><span class="muted">${o}</span></div></details>`,K5=e=>{let t=`<div class="sdlc-writer">${B5("judge","Judge",e.judge,e.writers,"I'll score it")}${G5("judge",e.judge,e.writers)}${V5("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${B5("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${G5("improver",e.improver,e.writers)}${V5("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var J5,Y5=l(()=>{"use strict";J5=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var uC,X5,Z5=l(()=>{"use strict";Y5();uC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),X5=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${J5.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${uC(t.goal)}" title="${uC(t.goal)}">${uC(t.label)}</button>`).join("")}</div>`});var lp,_se,kse,mC,Q5=l(()=>{"use strict";L();en();lp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_se=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},kse=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,mC=e=>{let t=_se(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=fd(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${Pe(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${lp(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${lp(e.inputId)}" class="sdlc-pass-range" type="range" name="${lp(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${lp(a)}"><span class="sdlc-pass-mark" style="left:${kse(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${lp(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var Tse,gC,co,eV,tV=l(()=>{"use strict";Zd();QR();c5();p5();ah();m5();f5();h5();P5();T5();$h();I5();en();nC();W5();H5();ep();z5();U5();q5();L();Z5();Q5();Tse=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,gC='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',co=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eV=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${co(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${co(e.skillNotice??"")}</div>`,o=`${OB}${MB}`,n=e.resumableWizardCycle??null,s=n===null?"":D5(n),i=Mh(e.cycle),a=e.cycle===null?"":Wh(e.cycle),c=e.cycle!==null&&Lr(e.cycle),d=y5(e),p=Tse(d.goal,d.prompt,e.canRun),g=K5({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),f=F5({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=`${mC({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${mC({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=x5({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),S=WE,u=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",A=e.cycle!==null&&v(e.cycle.status),T=d.running&&!A,P=A||T?"":" open",b=T?" sdlc-compose-run-focus":"",E=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${A?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,w=A?(()=>{let F=e.cycle!==null?so(e.cycle.goal):so(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${co(F)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${E}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${E}</summary>`,x=A?" sdlc-compose-viewing-finished":"",I=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",j=c?"waiting":d.running?"running":"idle",O=d.running&&!c?' aria-busy="true"':"",$=`<section class="card sdlc-compose${x}${b}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${P}>
        ${w}
        <div class="sdlc-compose-details-body">
      <p class="lede">${S} ${co(e.modelNote)}</p>
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
            <input class="input" type="text" name="folder" value="${co(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${v5(ip(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${gC}
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
            ${X5()}
            <textarea class="input textarea" name="goal" rows="4" required>${co(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Pe("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${co(d.prompt)}</textarea>
          </div>
          ${h}
          ${y}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${gC}
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
        ${$5()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${gC}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${co(d.passScore)}; Step 4 pass \u2265 ${co(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
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
    </section>`,B=e.history.length>0?S5:"",Ce=`${""}${g5}${l5}${d5}${u5}${L5}${B}`;return`${t}${r}${$}${s}${a}${i}${o}${w5(e.history,e.cycle?.id??null)}${Ce}`}});var cp,fC=l(()=>{"use strict";tV();cp=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:eV(t)}))}});var rV,oV=l(()=>{"use strict";a5();sp();fC();Tt();ws();rV=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:i5({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=Q(e.storePath,o.cycleId);return je(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(rn(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await cp(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:Cr(e.storePath),resumableWizardCycle:null}),!0)}});var nV,Uh,yC=l(()=>{"use strict";L();nV=m(require("node:os")),Uh=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??nV.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??rr()}}});var sV,ya,hC,iV,aV,dp=l(()=>{"use strict";L();Me();ER();sV=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,ya=e=>{let t=lB(e),r=gs(e).map(s=>({id:s,label:Jy[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},hC=(e,t,r)=>t===W||t!==null&&e.writers.some(o=>o.id===t)?t:r,iV=(e,t,r,o=null)=>({judge:hC(e,t,e.judge),improver:hC(e,r,e.improver),runner:hC(e,o,e.runner)}),aV=e=>e===lh?{goal:ch,prompt:dh}:{goal:"",prompt:""}});var SC,lV=l(()=>{"use strict";SC=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var cV,Ese,dV,pV,uV,mV=l(()=>{"use strict";L();cV=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},Ese=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},dV=(e,t)=>e.has("earlyStop")?!0:t!=="run",pV=e=>{let t=cV(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=Ese(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=cV(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},uV=e=>rr(e)});var gV,fV,Bh,PC=l(()=>{"use strict";L();Me();at();dp();lV();mV();gV=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=SC(o);return n.ok?String(n.passScore):String(r)},fV=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return SC(n)},Bh=e=>{let t=iV(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=gV(e.posted,"passScore",70),o=gV(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),p=e.posted?.get("maxSpendUsd")?.trim()??"",g=e.posted?.get("intent")??"",f=e.posted===null?!0:dV(e.posted,g),h=(w,x)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:w,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:x,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:p,earlyStop:f});if(e.posted===null)return h(e.defaultFolder??fs,null);let y=e.posted.get("folder")??fs;if(e.posted.get("intent")==="choose-folder"){let w=e.pickFolder();return h(w===null?y:wt(w),null)}if((e.posted.get("intent")??"")!=="run")return h(y,null);let u=sV(e.goal,e.prompt);if(u!==null)return h(y,u);let A=fV(e.posted,"passScore",r);if(!A.ok)return h(y,A.errorMessage);let T=fV(e.posted,"modulePassScore",o);if(!T.ok)return h(y,T.errorMessage);let P=cB(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(P===null)return h(y,"Choose a judge and an improver.");let b=oo(y);if(!b.ok)return h(y,b.errorMessage);let k=dB(e.installedIds,c,P.judge);if(k===null)return h(y,"Choose a runner for wizard step 4.");let E=pV({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return E.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:P.judge,improver:P.improver,workingDirectory:b.path,passScore:A.passScore,modulePassScore:T.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:k,runnerInstructions:a,costControls:uV(E.knobs)}:h(y,E.errorMessage)}});var ha,Vh,Rse,AC,yV,Gh,hV,Cse,SV,bC,vse,Lse,Ise,_C,PV,AV,bV=l(()=>{"use strict";ha=m(require("node:fs")),Vh=m(require("node:path"));Me();at();Rse=["remember","choose-folder","run"],AC=()=>({folder:fs,judge:"",improver:"",runner:""}),yV=e=>Vh.default.join(Vh.default.dirname(e),"prompt-optimizer-preferences.json"),Gh=e=>typeof e=="string"?e:"",hV=e=>{let t=yV(e);if(!ha.default.existsSync(t))return AC();try{let r=JSON.parse(ha.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return AC();let o=r,n=Gh(o.folder).trim();return{folder:n.length===0?fs:n,judge:Gh(o.judge),improver:Gh(o.improver),runner:Gh(o.runner)}}catch{return AC()}},Cse=(e,t)=>{let r=yV(e);ha.default.mkdirSync(Vh.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;ha.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),ha.default.renameSync(o,r)},SV=(e,t)=>e===W||gs(t).some(r=>r===e),bC=(e,t,r)=>e===null?t:e.length===0?"":SV(e,r)?e:t,vse=(e,t)=>{if(e===null)return t;let r=oo(e);return r.ok?r.display:t},Lse=e=>{let t=hV(e.storePath),r={folder:vse(e.folder,t.folder),judge:bC(e.judge,t.judge,e.installedIds),improver:bC(e.improver,t.improver,e.installedIds),runner:bC(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||Cse(e.storePath,r)},Ise=e=>{let t=oo(e);return t.ok?t.display:fs},_C=(e,t)=>SV(e,t)?e:"",PV=e=>{let t=hV(e.storePath);return{selection:{...e.selection,judge:_C(t.judge,e.installedIds)||e.selection.judge,improver:_C(t.improver,e.installedIds)||e.selection.improver,runner:_C(t.runner,e.installedIds)||e.selection.runner},defaultFolder:Ise(t.folder)}},AV=e=>{let t=e.posted.get("intent")??"";if(!Rse.includes(t))return;let r=e.posted.get("folder");Lse({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var _V,xse,Wse,kC,Ose,Kh,qh=l(()=>{"use strict";_V=m(require("node:os"));Me();aC();Ps();xse="Reply with the single word ok. Do not use tools.",Wse=45e3,kC=async(e,t)=>{if(t===W)return{ok:!0,message:"You will do this step."};let r=K2(e,t);if(r!==null)return{ok:!0,message:r};let o=await dt({writerAgent:t,prompt:xse,workingDirectory:_V.default.tmpdir(),timeoutMs:Wse});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ue(t)} is ready.`;return q2(e,t,n),{ok:!0,message:n}},Ose=e=>[...new Set(e.filter(t=>t.length>0))],Kh=async(e,t,r,o)=>{for(let n of Ose([t,r,o??""])){let s=await kC(e,n);if(!s.ok)return s.message}return null}});var wC,kV=l(()=>{"use strict";L();wC=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!v(r.status)&&!(t!==null&&r.id===t))return r;return null}});var wV,TV=l(()=>{"use strict";qt();L();$d();sp();yC();PC();fC();Tt();at();bV();$h();qh();kV();Oh();ws();wV=async e=>{let t=e.posted===null?PV({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=Bh({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Uo("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(AV({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?wt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await Kh(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await cp(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:wt(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:Cr(e.route.storePath),resumableWizardCycle:wC(Cr(e.route.storePath),null)});return}if(r.kind==="start"){let s=R5(r.workingDirectory,r.sourceSkillFile),i=gh(Md({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=Uh({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:GE({...Ad(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(z(e.route.storePath,a),je(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(rn(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:Q(e.route.storePath,e.cycleId);n!==null&&(n=_s(e.route.storePath,n),je(e.route.storePath,n.id)),await cp(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:Cr(e.route.storePath),resumableWizardCycle:wC(Cr(e.route.storePath),n?.id??null)})}});var EV,RV=l(()=>{"use strict";Tt();EV=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";BB(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var CV,vV=l(()=>{"use strict";CV=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var LV,IV=l(()=>{"use strict";XB();n5();oV();TV();RV();dp();vV();ws();LV=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await Hh(),o=ya(r),n=e.method==="POST"?CV(e.request.headers["content-type"],await e.readBody(e.request)):null;if(o5({posted:n,storePath:e.storePath,response:e.response})||await rV(e,n,o))return;let s=aV(t.searchParams.get("example")),i=EV({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=YB({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await wV({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:JB(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var Mse,xV,WV=l(()=>{"use strict";L();Tt();Mse=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",xV=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=Q(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!v(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=VE({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${Mse(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var OV,MV=l(()=>{"use strict";sp();Tt();OV=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:Q(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":rn(e.storePath,o)),!0}});var jse,jV,NV=l(()=>{"use strict";Me();qh();jse=["claude-cli","codex","cursor","antigravity"],jV=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===W||jse.includes(t)?await kC(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var DV,HV=l(()=>{"use strict";L();DV=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:hd,page:Sd,context:Xi,installedWriters:e,post:{method:"POST",url:hd,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${hd}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var Jh,FV=l(()=>{"use strict";L();ZR();aa();Jh=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ye(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=v(e.status),n=e.errorKind??null,s=xh({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:no(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:Xi,page:`${Sd}?cycle=${encodeURIComponent(e.id)}`}}});var K,Nse,zV,$V,UV=l(()=>{"use strict";K=m(Js());L();Nse=(0,K.isType)({goal:K.isString,prompt:K.isString,workingDirectory:K.isString,judge:(0,K.isUndefinedOr)(K.isString),improver:(0,K.isUndefinedOr)(K.isString),passScore:(0,K.isUndefinedOr)(K.isNumber),maxRounds:(0,K.isUndefinedOr)(K.isNumber),maxTrials:(0,K.isUndefinedOr)(K.isNumber),maxSpendUsd:(0,K.isUndefinedOr)(K.isNumber),earlyStop:(0,K.isUndefinedOr)(K.isBoolean),earlyStopFlatRounds:(0,K.isUndefinedOr)(K.isNumber),confirmedTokenBudget:(0,K.isUndefinedOr)(K.isNumber),confirmedMaxSpendUsd:(0,K.isUndefinedOr)(K.isNumber),rateUsdPer1kTokens:(0,K.isUndefinedOr)(K.isNumber)}),zV=e=>{let t=e?.trim()??"";return t.length===0?null:t},$V=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return Nse(t)?t.workingDirectory.trim().length===0?{ok:!1,error:My}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:zV(t.judge),improver:zV(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:My}}});var po,Dse,BV,GV,VV=l(()=>{"use strict";L();po=m(Js()),Dse=(0,po.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:po.isNumber,confirmedMaxSpendUsd:(0,po.isUndefinedOr)(po.isNumber),rateUsdPer1kTokens:(0,po.isUndefinedOr)(po.isNumber)}),BV=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:Dse(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},GV=(e,t)=>{let r=ro({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var Hse,KV,qV=l(()=>{"use strict";L();Me();PC();dp();Hse=e=>e.map(t=>t.id).join(", "),KV=e=>{let t=ya(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===W||n===W)return{ok:!1,error:xE,installedWriters:t.writers};if(o===null||n===null){let a=Hse(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=Bh({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var Fse,JV,YV=l(()=>{"use strict";L();yC();HV();FV();dp();UV();VV();qV();Tt();Fse=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},JV=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let p=Q(e.storePath,t);return p===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:Jh(p)}}let r=await e.handlers.readInstalledIds(),o=ya(r);if(e.method==="GET")return{status:200,body:DV(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let p=BV(e.rawBody);if(p.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(p.kind==="invalid")return{status:400,body:{ok:!1,error:p.error}};let g=Q(e.storePath,t);if(g===null)return{status:404,body:{ok:!1,error:"That run is not on this Mac."}};let f=GV(g,p.body);return f.ok?(z(e.storePath,f.cycle),{status:200,body:Jh(f.cycle)}):{status:400,body:{ok:!1,error:f.error}}}let n=Fse(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let p=ra({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:p.targetTokenBudget,proposedTokenBudget:p.targetTokenBudget,estimatedSpendUsd:p.estimatedSpendUsd,rateUsdPer1kTokens:p.rateUsdPer1kTokens??null,proposalStub:p.stub===!0,confirmationRequired:!0}}}let s=$V(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=KV({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=Md({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:kt({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let p=ro({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!p.ok)return{status:400,body:{ok:!1,error:p.errorMessage}};c=p.costControls}let d=Uh({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:Ad(i.prompt),runnerModel:i.runner,costControls:c});return z(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:Jh(d)}}});var XV,ZV=l(()=>{"use strict";ws();qh();YV();XV=async e=>{let t=await JV({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:Hh,readWritersReady:Kh,startCycle:je}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var eK,zse,$se,QV,Use,tK,rK=l(()=>{"use strict";eK=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],zse=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},$se=e=>{let t={};for(let n of e)for(let s of new Set(eK(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},QV=(e,t)=>{let r=zse(eK(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},Use=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},tK=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=$se(e.map(i=>i.text)),s=QV(o,n);return e.map(i=>({id:i.id,score:Use(s,QV(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var TC,Bse,Gse,oK,Vse,Kse,qse,Jse,EC,RC=l(()=>{"use strict";TC=m(require("node:path"));at();rK();$h();Bse=5,Gse=20,oK=280,Vse=e=>[e.name,e.description,e.promptText].join(`
`),Kse=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=oK?t:`${t.slice(0,oK-3)}...`},qse=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),Jse=e=>e===void 0||!Number.isFinite(e)?Bse:Math.min(Gse,Math.max(1,Math.floor(e))),EC=e=>{let t=e.query.trim(),r=Jse(e.limit),o=oo(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=ip(o.path),s=tK(n.map(d=>({id:d.fileName,text:Vse(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=TC.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let p=i.get(d.id);return p===void 0?[]:[{skillId:p.fileName,name:p.name,description:p.description,score:d.score,sourcePath:TC.default.join(a,p.fileName,"SKILL.md"),excerpt:Kse(p),source:"filesystem"}]});return{query:t,hits:c,context:qse(c)}}});var nK,sK=l(()=>{"use strict";RC();nK=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:EC({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var iK,aK=l(()=>{"use strict";sK();iK=async e=>{let t=nK({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var Yse,CC,lK=l(()=>{"use strict";DB();IV();WV();MV();NV();ZV();aK();Yse=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},CC=async e=>{let t=Yse(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await XV(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await iK(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:NB()})),!0):(await jV({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||xV({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||OV({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await LV(e),!0)}});var cK=l(()=>{"use strict";lK();RC();Ps()});var vC,LC,IC=l(()=>{"use strict";vC="2025-03-26",LC={name:"agent-witch",version:"1.0.0"}});var Sa,Yh,dK,Xse,pp,pK=l(()=>{"use strict";IC();Sa=(e,t,r)=>({jsonrpc:"2.0",id:e??null,error:{code:t,message:r}}),Yh=(e,t)=>({jsonrpc:"2.0",id:e??null,result:t}),dK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?e:null,Xse=async(e,t,r,o)=>{let n=t?.name;if(typeof n!="string")return Sa(e,-32602,"tool name is required");let s=r.tools.find(i=>i.definition.name===n);if(s===void 0)return Sa(e,-32602,`Unknown tool: ${n}`);try{let i=await s.call(t?.arguments??{},o);return Yh(e,i)}catch(i){let a=i instanceof Error?i.message:String(i);return Sa(e,-32603,`Tool ${n} failed: ${a}`)}},pp=async(e,t,r)=>{let o=dK(e);if(o===null)return Sa(null,-32700,"Parse error");let n=o.id??null,s=o.method;return typeof s!="string"?Sa(n,-32600,"Invalid Request"):s==="initialize"?Yh(n,{protocolVersion:vC,capabilities:{tools:{listChanged:!1}},serverInfo:t.serverInfo}):s==="ping"||s==="notifications/initialized"?Yh(n,{}):s==="tools/list"?Yh(n,{tools:t.tools.map(i=>i.definition)}):s==="tools/call"?Xse(n,dK(o.params),t,r):Sa(n,-32601,"Method not found")}});var xC,uK=l(()=>{"use strict";xC=(e,t)=>({content:[{type:"text",text:e}],...t===!0?{isError:!0}:{}})});var Xh=l(()=>{"use strict";pK();uK();IC()});var Pa,Zh=l(()=>{"use strict";Kf();Xh();Pa=e=>{let t=Nc({layout:e.layout,isDeclined:e.isDeclined});return{serverInfo:LC,tools:[{definition:mw,call:r=>xC(JSON.stringify(t(r)))}]}}});var mK,Zse,Qse,gK,fK=l(()=>{"use strict";Xh();Zh();mK=(e,t)=>{let r=JSON.stringify(t);e.write(`Content-Length: ${Buffer.byteLength(r,"utf8")}\r
\r
${r}`)},Zse=async(e,t)=>{let r=Buffer.alloc(0);for await(let o of e.stdin)for(r=Buffer.concat([r,Buffer.isBuffer(o)?o:Buffer.from(String(o),"utf8")]);;){let n=r.indexOf(`\r
\r
`);if(n<0)break;let s=r.subarray(0,n).toString("utf8"),i=/Content-Length:\s*(\d+)/i.exec(s);if(i===null){r=r.subarray(n+4);continue}let a=Number.parseInt(i[1]??"0",10),c=n+4+a;if(r.length<c)break;let d=r.subarray(n+4,c).toString("utf8");r=r.subarray(c);let p;try{p=JSON.parse(d)}catch{p=null}await t(p)}},Qse=async(e,t)=>{await Zse(t,async r=>{let o=typeof r=="object"&&r!==null?r:null,n=o?.method,s=await pp(r,e,void 0);if(typeof n=="string"&&n.startsWith("notifications/")){o?.id!==void 0&&mK(t.stdout,s);return}mK(t.stdout,s)})},gK=async e=>{await Qse(Pa({layout:e.layout}),{stdin:process.stdin,stdout:process.stdout})}});var eie,Qh,yK=l(()=>{"use strict";Xh();Zh();eie="/mcp",Qh=async e=>{if(e.pathname!==eie)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t=null;try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{t=null}let r=e.server??Pa({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,await pp(t,r,void 0)),!0}});var hK={};Rt(hK,{createAwlMcpServer:()=>Pa,runAwlMcpStdio:()=>gK,tryHandleAwlMcpHttpRequest:()=>Qh});var WC=l(()=>{"use strict";Zh();fK();yK()});var Ts,up,tie,rie,oie,nie,SK,PK=l(()=>{"use strict";Ts=m(require("node:fs")),up=m(require("node:path")),tie="prompt-optimizer-cycles.json",rie="prompt-optimizer-preferences.json",oie="prompt-sdlc-cycles.json",nie="prompt-sdlc-preferences.json",SK=e=>{let t=up.default.join(e,tie),r=up.default.join(e,oie);if(Ts.default.existsSync(t)||!Ts.default.existsSync(r))return t;try{Ts.default.renameSync(r,t)}catch{return r}let o=up.default.join(e,nie),n=up.default.join(e,rie);if(Ts.default.existsSync(o)&&!Ts.default.existsSync(n))try{Ts.default.renameSync(o,n)}catch{}return t}});var Aa,sie,OC,AK=l(()=>{"use strict";Aa=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sie=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],OC=e=>{let t=sie.map(i=>`<option value="${Aa(i.value)}">${Aa(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Aa(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Aa(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Aa(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Aa(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var mp,kK,iie,wK,aie,lie,TK,tS,bK,_K,cie,die,uo,gp,eS,pie,rS,MC,uie,jC,EK,NC,RK,mie,gie,fie,CK,vK,LK,fp=l(()=>{"use strict";mp=m(require("node:fs")),kK=m(require("node:path")),iie="estimate-history.ndjson",wK=100,aie=500,lie=2e4,TK=e=>kK.default.join(e,iie),tS=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,aie),bK=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,lie),_K=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,cie=e=>({...e,estimateTokens:_K(e.estimateTokens),actualTokens:_K(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),die=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},uo=e=>{let t=TK(e);return mp.default.existsSync(t)?mp.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return die(n)?[cie(n)]:[]}catch{return[]}}):[]},gp=(e,t)=>{mp.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;mp.default.writeFileSync(TK(e),r,"utf8")},eS=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),pie=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${eS(o.task)} | ${eS(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},rS=e=>{let t=uo(e.reportsDir),r=tS(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);gp(e.reportsDir,[...s,n])},MC=e=>{let t=uo(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?tS(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);gp(e.reportsDir,[...i,s])},uie=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-wK),jC=e=>[...uo(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),EK=e=>{let t=uo(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=bK(e.input),n=bK(e.output),s=tS(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);gp(e.reportsDir,[...c,a])},NC=(e,t)=>{let r=uo(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},RK=e=>({table:pie(uie(uo(e))),embedding:null}),mie=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},gie=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-wK),fie=e=>{let t=mie(gie(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${eS(s.task)} | ${eS(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},CK=e=>{let t=uo(e.reportsDir),r=tS(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);gp(e.reportsDir,[...s,n])},vK=e=>{let t=uo(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);gp(e.reportsDir,[...s,n])},LK=e=>fie(uo(e))});var IK=l(()=>{"use strict";fp()});var mo,DC,yie,HC,hie,Sie,oS,nS,Pie,FC,xK=l(()=>{"use strict";IK();kR();mo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),DC=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},yie=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${DC(-r)} under`:`${DC(r)} over`},HC=e=>e.toLocaleString("en-US"),hie=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${HC(-r)} under`:`${HC(r)} over`},Sie=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},oS=e=>e===null?"\u2014":DC(e),nS=e=>e===null?"\u2014":HC(e),Pie=`(function () {
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
})();`,FC=e=>{let r=jC(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":yie(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":hie(n.estimateTokens,n.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${mo(Sie(i))}</button></td>
        <td>${mo(c)}</td>
        <td>${oS(n.estimateSeconds)}</td>
        <td>${oS(n.actualSeconds)}</td>
        <td>${mo(d)}</td>
        <td>${nS(n.estimateTokens)}</td>
        <td>${nS(n.actualTokens)}</td>
        <td>${mo(p)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${mo(c)}</p>
        <h2>Input</h2>
        <pre>${mo(i)}</pre>
        <h2>Output</h2>
        <pre>${mo(a)}</pre>
        <p>Time: estimated ${oS(n.estimateSeconds)} \xB7 actual ${oS(n.actualSeconds)} \xB7 ${mo(d)}</p>
        <p>Tokens: estimated ${nS(n.estimateTokens)} \xB7 actual ${nS(n.actualTokens)} \xB7 ${mo(p)}</p>
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
            ${rh({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${Pie}</script>`}
    </section>`}});var WK=l(()=>{"use strict";AK();xK()});var ba,Aie,bie,zC,OK=l(()=>{"use strict";ba=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Aie=(e,t,r)=>{let o=ba(t),n=ba(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},bie=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${ba(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>Aie(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${ba(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${ba(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${ba(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},zC=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(bie).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var MK=l(()=>{"use strict";OK()});var yp,jK,NK,$C,UC,BC,DK=l(()=>{"use strict";yp=m(require("node:fs")),jK=m(require("node:path"));sd();by();NK=(e,t,r)=>Bi({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,$C=(e,t,r)=>{let o=NK(e,t,r);if(o===null)return[];if(!yp.default.existsSync(o))return[];let n=yp.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},UC=e=>{let t=NK(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Zr(e.entry.prompt),output:Zr(e.entry.output)};yp.default.mkdirSync(jK.default.dirname(t),{recursive:!0}),yp.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},BC=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var _ie,kie,hp,sS,GC=l(()=>{"use strict";_ie=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),kie=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,hp=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=_ie(i.assistantOutput),d=c.length>0?`Assistant: ${kie(c,t)}`:null,p=[a,d].filter(g=>g!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},sS=e=>{let t=e.userMessage.trim(),r=hp({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var xr,Sp,qC,wie,Tie,VC,Eie,JC,iS,HK,FK,Rie,_a,YC,KC,zK,Cie,$K,ka,aS,Pp,vie,Ap,XC,lS,cS,UK=l(()=>{"use strict";xr=m(require("node:fs")),Sp=m(require("node:path")),qC=require("node:crypto");GC();wie="writer-sessions",Tie="active-index.json",VC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Eie=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",JC=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},iS=e=>{let t=Sp.default.join(e.installDir,wie);return xr.default.mkdirSync(t,{recursive:!0}),t},HK=e=>Sp.default.join(iS(e),Tie),FK=(e,t)=>Sp.default.join(iS(e),`${t}.canonical.json`),Rie=(e,t)=>Sp.default.join(iS(e),`${t}.continuation.json`),_a=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,YC=e=>{let t=HK(e);if(!xr.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(xr.default.readFileSync(t,"utf8"));if(!VC(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!VC(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!Eie(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},KC=(e,t)=>{xr.default.writeFileSync(HK(e),JSON.stringify(t,null,2))},zK=(e,t)=>{xr.default.writeFileSync(FK(e,t.sessionId),JSON.stringify(t,null,2))},Cie=(e,t)=>{xr.default.writeFileSync(Rie(e,t.sessionId),JSON.stringify(t,null,2))},$K=(e,t)=>{let r=hp({turns:t.turns});Cie(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},ka=(e,t)=>{let r=FK(e,t);if(!xr.default.existsSync(r))return null;try{let o=JSON.parse(xr.default.readFileSync(r,"utf8"));return!VC(o)||typeof o.sessionId!="string"?null:o}catch{return null}},aS=(e,t=20)=>{let r=iS(e),o=xr.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=ka(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Pp=(e,t,r)=>{let o=JC(r);return YC(e).entries.find(i=>_a(i)===_a({writerAgent:t,projectFolderPath:o}))?.sessionId??null},vie=(e,t,r,o)=>{let n=YC(e),s=_a({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>_a(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];KC(e,{entries:i})},Ap=(e,t,r)=>{let o=(0,qC.randomUUID)(),n=new Date().toISOString(),s=JC(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return zK(e,i),$K(e,i),vie(e,t,s,o),o},XC=(e,t,r)=>{let o=Pp(e,t,r);return o!==null?o:Ap(e,t,r)},lS=(e,t,r)=>{let o=JC(r),n=YC(e);if(o===null&&r===void 0){KC(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=_a({writerAgent:t,projectFolderPath:o});KC(e,{entries:n.entries.filter(i=>_a(i)!==s)})},cS=e=>{let t=XC(e.layout,e.writerAgent,e.projectFolderPath),r=ka(e.layout,t);if(r===null)return;let o={id:(0,qC.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};zK(e.layout,n),$K(e.layout,n)}});var Lie,Iie,dS,ZC,BK=l(()=>{"use strict";Lie=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",Iie=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},dS=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",ZC=e=>{let t=dS(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=Lie(r,e.userPromptCharacterCount),n=Iie({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var pS=l(()=>{"use strict";DK();UK();GC();BK()});var GK=l(()=>{"use strict";Tg();hi();c_()});var VK=l(()=>{"use strict";Nb()});var mt,Wie,Oie,QC,ev,tv,KK=l(()=>{"use strict";GK();VK();mt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Wie=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},Oie=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=ec(o);return`value="${mt(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${mt(r)}"`},QC=(e,t,r,o,n)=>{let s=Eg[t];return`<label class="field">
          <span class="field-label">${mt(o)} API key \u2014 ${mt(Wie(e,t))} \xB7 <a class="field-link" href="${mt(s.href)}" target="_blank" rel="noopener noreferrer">${mt(s.label)}</a></span>
          <input class="input mono" type="password" name="${mt(r)}" autocomplete="off" ${Oie(e,t,n)} />
        </label>`},ev=(e,t,r,o)=>{let n=hg(e[t]?.model),s=new Set(yg[t].map(c=>c.value)),i=yg[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${mt(c.value)}"${d}>${mt(c.label)}</option>`}).join(""),a=n!==Nn&&!s.has(n)?`<option value="${mt(n)}" selected>${mt(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${mt(o)}</span>
          <select class="input mono" name="${mt(r)}">${i}${a}</select>
        </label>`},tv=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${mt(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${QC(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${ev(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${QC(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${ev(e.secrets,"openai","openaiModel","OpenAI model")}
        ${QC(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${ev(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var qK=l(()=>{"use strict";KK()});var uS,JK,YK=l(()=>{"use strict";uS=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),JK=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${uS(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${uS(s.name)}</strong> <span class="muted mono">(${uS(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${uS(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var Mie,XK,ZK,QK=l(()=>{"use strict";Mie=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,XK=e=>e.kind==="folder",ZK=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&XK(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(XK(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(Mie)};return r(t)}});var eq,rv,tq=l(()=>{"use strict";eq=m(require("node:path")),rv=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${rv(r.children,t)}</ul>
            </details>
          </li>`;let o=eq.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var rq,on,jie,Nie,bp,Die,ov,oq=l(()=>{"use strict";Ey();rq=m(require("node:path"));YK();QK();tq();on=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jie=()=>`(() => {
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

})();`,Nie=()=>`(() => {
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
})();`,bp=e=>{let t=dd({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=JK({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${on(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${on(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':Die(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${on(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${on(s)}" />
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
    <script>${jie()}</script>
    <script>${Nie()}</script>`;return`${t}${r}${o}${c}${d}`},Die=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=ZK(a.items.map(f=>({...f,relativePath:typeof f.relativePath=="string"&&f.relativePath.length>0?f.relativePath:rq.default.relative(a.sourceRoot,f.sourcePath).replaceAll("\\","/")}))),p=rv(d,on),g=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${on(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${on(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${g} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${on(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},ov=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??p??a,f=t.sets[i];if(f===void 0)continue;let h=a.length>0?a:f.proposedSlug,y=g.length>0?g:f.proposedName,S=r.has(i),u=f.items.map(A=>({id:A.id,kind:A.kind,title:A.title,sourcePath:A.sourcePath,include:S}));s.push({slug:h,name:y,items:u})}return s}});var nq=l(()=>{"use strict";oq()});var Hie,nv,sq=l(()=>{"use strict";Lt();Hie=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},nv=Hie});var Fie,iq,aq=l(()=>{"use strict";Lt();Fie=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},iq=Fie});var lq,zie,cq,dq=l(()=>{"use strict";lq={saved:{message:"Pitfall saved.",error:null},retired:{message:"Pitfall retired. Turn on Show retired to see it again.",error:null},restored:{message:"Pitfall is active again.",error:null},invalid:{message:null,error:"Add a title, why it happens, and a fix. Keep them short, then save again."},limit:{message:null,error:"This project has 64 active pitfalls. Retire one, then try again."},missing:{message:null,error:"That pitfall is gone. Reload the page and try again."},rejected:{message:null,error:"Agent Witch Cloud did not accept this change. Check the fields and try again."},unavailable:{message:null,error:"Could not reach Agent Witch Cloud. Check this Mac on Status, then try again."}},zie=e=>e!==null&&Object.prototype.hasOwnProperty.call(lq,e)?lq[e]:null,cq=zie});var pq=l(()=>{"use strict"});var Es,$ie,sv,uq=l(()=>{"use strict";Ey();_k();Es=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$ie=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,sv=e=>{let t=e.flashError?`<div class="alert-error">${Es(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Es(e.flashMessage)}</div>`:"",r=dd({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Es($ie(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,p=`<a class="btn btn-secondary btn-compact" href="${Es(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,g=ff(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
                  <input type="hidden" name="projectId" value="${Es(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Es(n.name)}</strong>
                  <span class="muted mono">${Es(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${p}${g}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then pull playbooks into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var mq=l(()=>{"use strict";pq();Af();uq()});var mS,gq=l(()=>{"use strict";mS=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var fq,sr,iv=l(()=>{"use strict";fq=m(require("node:path"));Ct();Ie();G();ee();lk();sr=e=>{let t=H()?.layout.installDir??C();if(fq.default.basename(t)===cr)return Pt;let r=H(),o=r!==null?Fe(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):Pt}});var av,yq=l(()=>{"use strict";fr();iv();av=async e=>{let t=Ye(e.installDir),r=t?.bundleVersion??null,o=sr(t);try{let n=await di(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Cn(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var lv,hq=l(()=>{"use strict";lv=e=>!e});var cv,wa,dv=l(()=>{"use strict";G();cv=()=>`http://127.0.0.1:${Qs()}/update/run`,wa=async e=>{try{let t=await fetch(cv(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Uie,Sq,pv,Pq=l(()=>{"use strict";G();ie();dv();Uie=()=>{Hr({launchAgentLabel:ge(),installDir:C()})},Sq=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},pv=async()=>{Uie();let e=await wa({force:!0});if(e.ok)return{ok:!0,message:Sq(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:Sq(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(fr(),EM)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var uv=l(()=>{"use strict";iE();gq();iv();yq();hq();Pq();dv()});var Aq,bq=l(()=>{"use strict";Aq=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var _q,kq,mv,gv,wq=l(()=>{"use strict";_q=require("node:crypto"),kq=m(require("node:fs"));qt();ee();ee();bq();mv=!1,gv=async e=>{if(mv)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!Aq(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=H();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=V({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&kq.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,_q.randomUUID)();mv=!0;try{if(await ck(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Pi({...r,workspace:n},e.writerAgent,t);return await _c(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{mv=!1}}});var Tq=l(()=>{"use strict";wq()});var _p,fv=l(()=>{"use strict";_p=e=>{if(typeof e!="string")return!1;let t=e.trim();return t.length===0||t.startsWith(".")||t.includes("/")||t.includes("\\")||t.includes("..")?!1:t===e}});var ir,Te,nn,Rs,Eq,sn,Ee,gS,fS,Rq,yS,hS,SS,yv,oe=l(()=>{"use strict";ir="history",Te="skills",nn="_drafts",Rs="_tombstones",Eq="state.json",sn="meta.json",Ee="skillgen",gS="episodes.json",fS="budget.json",Rq="metrics.jsonl",yS="SKILL.md",hS="meta.json",SS="learned-pitfalls.json",yv="flags.json"});var Cs,vq,gt,Re,Mt=l(()=>{"use strict";Cs=m(require("node:fs")),vq=m(require("node:path"));oe();gt=e=>{Cs.default.mkdirSync(e,{recursive:!0,mode:448});try{Cs.default.chmodSync(e,448)}catch{}},Re=(e,t)=>{gt(vq.default.dirname(e));let r=`${e}.${process.pid}.${Date.now()}.tmp`;Cs.default.writeFileSync(r,t,{mode:384});try{Cs.default.chmodSync(r,384)}catch{}Cs.default.renameSync(r,e);try{Cs.default.chmodSync(e,384)}catch{}}});var vs,X,me,ne=l(()=>{"use strict";vs=m(require("node:path"));G();fv();Mt();oe();X=e=>{if(!_p(e))throw new Error("invalid_project_id");let t=M();return vs.default.join(t.projectDataDir,e)},me=e=>{let t=X(e);gt(t),gt(vs.default.join(t,ir));let r=vs.default.join(t,Te);return gt(r),gt(vs.default.join(r,nn)),gt(vs.default.join(r,Rs)),gt(vs.default.join(t,Ee)),t}});var hv,Sv,PS=l(()=>{"use strict";hv=/^[a-z0-9][a-z0-9_-]{0,63}$/,Sv="sha256:"});var Lq,rt,kp=l(()=>{"use strict";Lq=require("node:crypto");PS();rt=e=>`${Sv}${(0,Lq.createHash)("sha256").update(Buffer.from(e,"utf8")).digest("hex")}`});var Ls,wp=l(()=>{"use strict";PS();Ls=e=>hv.test(e)});var Tp,AS=l(()=>{"use strict";Tp=e=>e.onPublishedSet?e.localContentHash===e.expectedHash?"skip":"fetch_write":"remove"});var Pv,Av=l(()=>{"use strict";Pv=async e=>{try{return await e.port.isHistoryEnabled(e.projectId)===!0}catch{return!1}}});var bv,_v=l(()=>{"use strict";wp();bv=async e=>{try{return(await e.port.listProjectSkillIds({projectId:e.projectId})).filter(r=>Ls(r.skillId))}catch{return[]}}});var kv,wv=l(()=>{"use strict";kv=async e=>{try{let t=await e.awc.listPublished(e.projectId);return Array.isArray(t)?{ok:!0,published:t}:{ok:!1}}catch{return{ok:!1}}}});var Tv,Ev=l(()=>{"use strict";kp();Tv=async e=>{try{let t=await e.port.readProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version});return t===null?null:rt(t.body)===t.contentHash?t:null}catch{return null}}});var Rv,Cv=l(()=>{"use strict";kp();wp();Rv=async e=>{if(!Ls(e.skillId))return{ok:!1,code:"unavailable"};let t=rt(e.body);try{let r=await e.port.writeProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version,body:e.body});return r.contentHash===t?{ok:!0,path:r.path,contentHash:r.contentHash}:{ok:!1,code:"hash_mismatch"}}catch{return{ok:!1,code:"unavailable"}}}});var vv,Lv=l(()=>{"use strict";wp();vv=async e=>{if(!Ls(e.skillId))throw new Error("invalid_project_skill_id");return e.port.tombstoneProjectSkill({projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}})}});var Iv,xv=l(()=>{"use strict";kp();AS();Ev();Cv();Iv=async e=>{let{meta:t,projectId:r}=e,o={skillId:t.skillId,version:t.publishedVersion},n=await Tv({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion});if(Tp({onPublishedSet:!0,expectedHash:t.contentHash,localContentHash:n?.contentHash??null})==="skip")return{...o,action:"skipped"};let i=await e.awc.getPublishedBody({projectId:r,skillId:t.skillId,version:t.publishedVersion,skillRowId:t.skillRowId});if(i===null)return{...o,action:"missing_awc"};if(i.contentHash!==t.contentHash||rt(i.body)!==t.contentHash)return{...o,action:"hash_mismatch"};let a=await Rv({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion,body:i.body});return a.ok?a.contentHash===t.contentHash?{...o,action:"mirrored"}:{...o,action:"hash_mismatch"}:{...o,action:a.code==="hash_mismatch"?"hash_mismatch":"unavailable"}}});var Wv,Ov=l(()=>{"use strict";AS();Lv();Wv=async e=>Tp({onPublishedSet:!1})!=="remove"?{skillId:e.skillId,version:0,action:"unavailable"}:(await vv({port:e.port,projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}}),{skillId:e.skillId,version:0,action:"removed"})});var Ep,bS,Iq=l(()=>{"use strict";Av();_v();wv();xv();Ov();Ep="[project-skill-pull-mirror]",bS=async e=>{let t=e.deps.history,r=e.deps.awcPublished;try{if(!await Pv({port:t,projectId:e.projectId}))return{ok:!0,skipped:!0,skills:[]};let n=await kv({awc:r,projectId:e.projectId});if(!n.ok)return console.warn(Ep,"list_failed",e.projectId),{ok:!1,skipped:!1,skills:[]};let s=new Set(n.published.map(d=>d.skillId)),i=[];for(let d of n.published)try{i.push(await Iv({projectId:e.projectId,meta:d,port:t,awc:r}))}catch(p){console.warn(Ep,"skill_failed",d.skillId,p),i.push({skillId:d.skillId,version:d.publishedVersion,action:"unavailable"})}let a=await bv({port:t,projectId:e.projectId});for(let d of a)if(!s.has(d.skillId))try{i.push(await Wv({projectId:e.projectId,skillId:d.skillId,lastContentHash:d.contentHash,port:t}))}catch(p){console.warn(Ep,"orphan_tombstone_failed",d.skillId,p),i.push({skillId:d.skillId,version:0,action:"unavailable"})}let c=i.some(d=>d.action==="unavailable"||d.action==="hash_mismatch"||d.action==="missing_awc");return c&&console.warn(Ep,"partial_failure",e.projectId,i),{ok:!c,skipped:!1,skills:i}}catch(o){return console.warn(Ep,"tick_failed",e.projectId,o),{ok:!1,skipped:!1,skills:[]}}}});var Is=l(()=>{"use strict";PS();kp();wp();AS();Av();_v();wv();Ev();Cv();Lv();xv();Ov();Iq()});var xs,Rp,Bie,Gie,jv,Nv=l(()=>{"use strict";xs=m(require("node:fs")),Rp=m(require("node:path"));Mt();Is();oe();ne();Bie=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),Gie=e=>`v${String(e).padStart(4,"0")}.md`,jv=e=>{if(!Bie(e.skillId))throw new Error("invalid_project_skill_id");if(!Number.isInteger(e.version)||e.version<1)throw new Error("invalid_project_skill_version");let t=me(e.projectId),r=Rp.default.join(t,Te,e.skillId),o=Rp.default.join(r,Gie(e.version)),n=Rp.default.join(r,sn),s=rt(e.body);if(xs.default.existsSync(o)&&xs.default.existsSync(n))try{let a=JSON.parse(xs.default.readFileSync(n,"utf8"));if(a.version===e.version&&a.contentHash===s&&xs.default.readFileSync(o,"utf8")===e.body)return{path:o,contentHash:s}}catch{}Re(o,e.body),Re(n,`${JSON.stringify({skillId:e.skillId,version:e.version,contentHash:s,updatedAt:new Date().toISOString()})}
`);let i=Rp.default.join(t,Te,Rs,`${e.skillId}.json`);return xs.default.existsSync(i)&&xs.default.unlinkSync(i),{path:o,contentHash:s}}});var Cp,_S,Dv,Hv=l(()=>{"use strict";Cp=m(require("node:fs")),_S=m(require("node:path"));Is();oe();ne();Dv=e=>{if(e.skillId.length===0||e.skillId.startsWith("_")||e.skillId.includes("/")||e.skillId.includes("\\"))return null;let t;try{t=X(e.projectId)}catch{return null}let r=_S.default.join(t,Te,e.skillId),o=_S.default.join(r,`v${String(e.version).padStart(4,"0")}.md`),n=_S.default.join(r,sn);if(!Cp.default.existsSync(o)||!Cp.default.existsSync(n))return null;try{let s=Cp.default.readFileSync(o,"utf8"),i=JSON.parse(Cp.default.readFileSync(n,"utf8")),a=typeof i.contentHash=="string"?i.contentHash:null;return a===null||i.version!==e.version||rt(s)!==a?null:{body:s,contentHash:a}}catch{return null}}});var go,an,xq,Vie,Fv,zv,$v=l(()=>{"use strict";go=m(require("node:fs")),an=m(require("node:path"));Mt();oe();ne();xq=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),Vie=(e,t)=>{if(!go.default.existsSync(e))return;let r=`.${t}.`;for(let o of go.default.readdirSync(e)){if(!o.startsWith(r))continue;let n=an.default.join(e,o);try{go.default.rmSync(n,{recursive:!0,force:!0})}catch{}}},Fv=e=>{if(!xq(e.skillId))throw new Error("invalid_project_skill_id");let t=me(e.projectId),r=an.default.join(t,Te),o=an.default.join(r,e.skillId),n=!1;if(go.default.existsSync(o)){let c=an.default.join(r,`.${e.skillId}.${process.pid}.${Date.now()}`);try{go.default.renameSync(o,c),go.default.rmSync(c,{recursive:!0,force:!0}),n=!0}catch{}}Vie(r,e.skillId);let s=an.default.join(r,Rs);gt(s);let i=an.default.join(s,`${e.skillId}.json`),a={skillId:e.skillId,revokedAt:e.revokedAt??new Date().toISOString(),lastContentHash:e.lastContentHash};return Re(i,`${JSON.stringify(a)}
`),{removed:n}},zv=e=>{if(!xq(e.skillId))return null;let t;try{t=X(e.projectId)}catch{return null}let r=an.default.join(t,Te,Rs,`${e.skillId}.json`);if(!go.default.existsSync(r))return null;try{let o=JSON.parse(go.default.readFileSync(r,"utf8"));if(typeof o!="object"||o===null||typeof o.skillId!="string"||typeof o.revokedAt!="string"||typeof o.lastContentHash!="string")return null;let n=o;return{skillId:n.skillId,revokedAt:n.revokedAt,lastContentHash:n.lastContentHash}}catch{return null}}});var vp,Uv,Bv,Gv=l(()=>{"use strict";vp=m(require("node:fs")),Uv=m(require("node:path"));oe();ne();Bv=e=>{let t;try{t=X(e.projectId)}catch{return[]}let r=Uv.default.join(t,Te);if(!vp.default.existsSync(r))return[];let o=[];for(let n of vp.default.readdirSync(r)){if(n.startsWith("_")||n.startsWith("."))continue;let s=Uv.default.join(r,n,sn);if(vp.default.existsSync(s))try{let i=JSON.parse(vp.default.readFileSync(s,"utf8"));if(typeof i.contentHash!="string")continue;o.push({skillId:n,contentHash:i.contentHash})}catch{continue}}return o}});var Vv,Wq,Kv,qv=l(()=>{"use strict";Vv=m(require("node:fs")),Wq=m(require("node:path"));Mt();oe();ne();Kv=e=>{let t=e.messageId.trim();if(t.length===0||t.includes("/")||t.includes("\\")||t.includes(".."))throw new Error("invalid_message_id");let r=me(e.projectId),o=Wq.default.join(r,ir,`${t}.json`);if(Vv.default.existsSync(o))try{let s=JSON.parse(Vv.default.readFileSync(o,"utf8"));if(s.messageId===t)return s}catch{}let n={messageId:t,projectId:e.projectId,message:e.message,savedAt:new Date().toISOString()};return Re(o,`${JSON.stringify(n)}
`),n}});var Lp,Oq,Mq,Ea,kS,Jv,Ra=l(()=>{"use strict";Lp=m(require("node:fs")),Oq=m(require("node:path"));Mt();oe();ne();G();Mq=e=>Oq.default.join(X(e),ir,Eq),Ea=e=>{try{let t=Mq(e);if(!Lp.default.existsSync(t))return null;let r=JSON.parse(Lp.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null||typeof r.state!="string"||typeof r.updatedAt!="string")return null;let o=r.state;return o!=="on_ready"&&o!=="degraded"&&o!=="on_configuring"&&o!=="off"?null:{state:o,updatedAt:r.updatedAt}}catch{return null}},kS=e=>{me(e.projectId);let t={state:e.state,updatedAt:new Date().toISOString()};return Re(Mq(e.projectId),`${JSON.stringify(t)}
`),t},Jv=()=>{let t=M().projectDataDir;if(!Lp.default.existsSync(t))return[];let r=[];for(let o of Lp.default.readdirSync(t)){if(!_p(o))continue;let n=Ea(o);n!==null&&(n.state==="on_ready"||n.state==="degraded")&&r.push(o)}return r}});var jq,Nq=l(()=>{"use strict";Lt();jq=async e=>{let t=await fetch(`${e.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(e.projectId)}/computer-history/acks`,{method:"POST",headers:{[ae]:e.cloudApi.pairingToken,"Content-Type":"application/json"},body:JSON.stringify({messageId:e.messageId}),signal:AbortSignal.timeout(3e4)});return{ok:t.ok,status:t.status}}});var Ip,Dq,Kie,Yv,Hq=l(()=>{"use strict";Vr();ee();Ra();Nq();qv();Ip="[project-history-dispatch]",Dq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Kie=()=>{let e=H();return e===null?null:V({wsUrl:e.wsUrl,pairingToken:e.pairingToken})},Yv=async e=>{if(!Dq(e.payload))return{ok:!1,reason:"invalid_payload"};let t=typeof e.payload.projectId=="string"?e.payload.projectId.trim():"",r=e.payload.message;if(t.length===0||!Dq(r))return{ok:!1,reason:"invalid_payload"};let o=typeof r.messageId=="string"?r.messageId.trim():"";if(o.length===0)return{ok:!1,reason:"missing_message_id"};try{Kv({projectId:t,messageId:o,message:r}),kS({projectId:t,state:"on_ready"})}catch(s){console.error(Ip,"write_failed",t,o,s);try{kS({projectId:t,state:"degraded"})}catch(i){console.error(Ip,"degraded_mark_failed",t,i)}return{ok:!1,reason:"write_failed"}}let n=e.cloudApi===void 0?Kie():e.cloudApi;if(n===null)return console.error(Ip,"ack_skipped_no_cloud_api",t,o),{ok:!0,messageId:o,acked:!1};try{let s=await jq({cloudApi:n,projectId:t,messageId:o});return s.ok?{ok:!0,messageId:o,acked:!0}:(console.error(Ip,"ack_http_failed",t,o,s.status),{ok:!0,messageId:o,acked:!1})}catch(s){return console.error(Ip,"ack_failed",t,o,s),{ok:!0,messageId:o,acked:!1}}}});var ot=l(()=>{"use strict"});var Xv,Zv=l(()=>{"use strict";Gv();Ra();Hv();ne();$v();Nv();Xv=()=>({isHistoryEnabled:e=>{let t=Ea(e);return t?.state==="on_ready"||t?.state==="degraded"},resolveProjectDataDir:e=>X(e),writeProjectSkillVersion:e=>jv(e),readProjectSkillVersion:e=>Dv(e),tombstoneProjectSkill:e=>Fv(e),readProjectSkillTombstone:e=>zv(e),listProjectSkillIds:e=>Bv(e)})});var Fq,Qv,eL=l(()=>{"use strict";Lt();Fq=e=>({[ae]:e,Accept:"application/json"}),Qv=e=>({listPublished:async t=>{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/skills/published`,{method:"GET",headers:Fq(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(!r.ok)throw new Error(`listPublished http ${r.status}`);let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0||!Array.isArray(o.skills))throw new Error("listPublished malformed body");return o.skills.map((s,i)=>{if(typeof s!="object"||s===null||typeof s.skillId!="string"||typeof s.publishedVersion!="number"||typeof s.contentHash!="string")throw new Error(`listPublished row ${i} missing version/contentHash`);let a=s;return{skillId:a.skillId,publishedVersion:a.publishedVersion,contentHash:a.contentHash,...typeof a.skillRowId=="string"?{skillRowId:a.skillRowId}:{}}})},getPublishedBody:async t=>{let r=new URL(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t.projectId)}/skills/published/${encodeURIComponent(t.skillId)}`);r.searchParams.set("version",String(t.version));let o=await fetch(r.toString(),{method:"GET",headers:Fq(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(o.status===404)return null;if(!o.ok)throw new Error(`getPublishedBody http ${o.status}`);let n=await o.json();if(typeof n!="object"||n===null||n.ok!==!0||typeof n.body!="string"||typeof n.contentHash!="string")throw new Error("getPublishedBody malformed body");return{body:n.body,contentHash:n.contentHash}}})});var tL,rL=l(()=>{"use strict";ot();tL=e=>{let t=e.runCap??3e4,r=e.dayCap??1e5,o=Math.max(0,e.tokensUsedToday),n=Math.max(0,r-o),s=Math.max(0,e.estimatedRunTokens??0);return n<=0?{ok:!1,reason:"day_cap",remainingToday:0}:s>t?{ok:!1,reason:"run_cap",remainingToday:n}:s>n?{ok:!1,reason:"day_cap",remainingToday:n}:{ok:!0,remainingToday:n,runCap:Math.min(t,n)}}});var oL,nL=l(()=>{"use strict";ot();oL=e=>{let t=e.messageCountCap??20,r=e.idleMs??18e5,o=e.maxIntervalMs??864e5,n=e.messages;if(n.length===0)return{ready:!1,reason:"empty"};let s=Math.max(...n.map(p=>p.createdAtMs)),i=n.length>=t,a=e.nowMs-s>=r,c=e.lastClosedAtMs===null||e.nowMs-e.lastClosedAtMs>=o;return!i&&!a&&!c?{ready:!1,reason:"below_triggers"}:{ready:!0,reason:i?"count":a?"idle":"max_interval",messageIds:n.map(p=>p.messageId)}}});var wS,sL=l(()=>{"use strict";ot();wS=e=>{let t=e.maxOpenDrafts??20,r=Math.max(0,e.openDraftCount),o=r>=t;return{draftWaitingCount:r,capReached:o,miningPaused:o}}});var Kq,qq,Jie,TS,iL=l(()=>{"use strict";ot();Kq=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),qq=e=>e.trim().toLowerCase().replace(/\s+/g," "),Jie=(e,t)=>{let r=new Set(e.map(qq).filter(i=>i.length>0)),o=new Set(t.map(qq).filter(i=>i.length>0));if(r.size===0||o.size===0)return 0;let n=0;for(let i of r)o.has(i)&&(n+=1);let s=r.size+o.size-n;return s===0?0:n/s},TS=e=>{let t=e.nearDupJaccard??.6,r=Kq(e.name);for(let o of e.existingPublished)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"published",matchId:o.id};for(let o of e.existingDrafts)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"draft",matchId:o.id};for(let o of e.existingDrafts){if(Kq(o.name)===r&&r.length>0)return{action:"update_draft",draftId:o.id,reason:"same_name"};if(Jie(e.stepLines,o.stepLines)>=t)return{action:"update_draft",draftId:o.id,reason:"similar_steps"}}return{action:"create_new"}}});var aL,lL=l(()=>{"use strict";aL=e=>e.estimatedInputTokens>e.inputTokenCap?"reflect_then_write":"write"});var cL,Xie,dL,Zie,pL,uL=l(()=>{"use strict";ot();cL=e=>{let t=e.minMessages??3,r=Math.max(0,e.messageCount);return e.ownerMarkedSaveAsSkill?r<1?{ok:!1,reason:"too_short"}:{ok:!0,reason:"owner_mark"}:r<t?{ok:!1,reason:"too_short"}:e.hasSuccessSignal?{ok:!0,reason:"success_signal"}:{ok:!1,reason:"no_success_signal"}},Xie=/\b(done|landed|tests?\s+green|thumbs?\s*-?\s*up|all\s+tests?\s+pass(?:ed)?|shipped)\b/i,dL=e=>Xie.test(e),Zie=/\b(save\s+as\s+skill|mark\s+as\s+skill|promote\s+to\s+skill)\b/i,pL=e=>Zie.test(e)});var xp,ES=l(()=>{"use strict";xp=e=>({at:e.nowIso??new Date().toISOString(),projectId:e.projectId,episodeId:e.episodeId,fromState:e.fromState,toState:e.toState,reason:e.reason??null,tokensUsed:Math.max(0,e.tokensUsed??0),openDraftCount:Math.max(0,e.openDraftCount??0)})});var Qie,Jq,Ca,Yq,Wp=l(()=>{"use strict";Qie=[{pattern:/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----/g,replacement:"[redacted-private-key]"},{pattern:/\bsk-[a-zA-Z0-9]{20,}\b/g,replacement:"[redacted-secret]"},{pattern:/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/g,replacement:"[redacted-secret]"},{pattern:/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g,replacement:"[redacted-secret]"},{pattern:/\bAKIA[0-9A-Z]{16}\b/g,replacement:"[redacted-secret]"},{pattern:/\bBearer\s+[A-Za-z0-9\-._~+/]+=*\b/gi,replacement:"Bearer [redacted-secret]"},{pattern:/\b(?:api[_-]?key|secret|token|password|passwd|credential)\s*[:=]\s*["']?[^\s"'\\]{8,}["']?/gi,replacement:"[redacted-secret]"},{pattern:/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,replacement:"[redacted-email]"}],Jq=[/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----/,/\bsk-[a-zA-Z0-9]{20,}\b/,/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/,/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/,/\bAKIA[0-9A-Z]{16}\b/,/\bBearer\s+[A-Za-z0-9\-._~+/]{12,}/i],Ca=e=>{let t=e,r=0;for(let n of Qie)t=t.replace(n.pattern,()=>(r+=1,n.replacement));let o=Jq.some(n=>n.test(t));return{scrubbed:t,residualSecret:o,replacementCount:r}},Yq=e=>Jq.some(t=>t.test(e))});var mL,gL,fL,Op=l(()=>{"use strict";mL=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE","AWAITING_REVIEW","PUBLISHED","SKIPPED_COST","SKIPPED_FILTER","SKIPPED_DEDUP","QUARANTINED","FAILED_EXTRACT","FAILED_VALIDATE","REJECTED"],gL={CAPTURING:{episode_closed:"EPISODE_READY"},EPISODE_READY:{budget_ok:"SCRUBBING",budget_exceeded:"SKIPPED_COST",draft_cap_reached:"EPISODE_READY"},SCRUBBING:{scrub_ok:"TRIAGE",scrub_quarantine:"QUARANTINED"},TRIAGE:{qualify_ok:"DEDUP",qualify_reject:"SKIPPED_FILTER"},DEDUP:{dedup_novel:"EXTRACT",dedup_merge:"EXTRACT",dedup_skip:"SKIPPED_DEDUP"},EXTRACT:{extract_ok:"VALIDATE",extract_fail:"FAILED_EXTRACT"},VALIDATE:{validate_ok:"AWAITING_REVIEW",validate_retry:"EXTRACT",validate_fail:"FAILED_VALIDATE"},AWAITING_REVIEW:{owner_publish:"PUBLISHED",owner_discard:"REJECTED"},PUBLISHED:{},SKIPPED_COST:{},SKIPPED_FILTER:{},SKIPPED_DEDUP:{},QUARANTINED:{},FAILED_EXTRACT:{},FAILED_VALIDATE:{},REJECTED:{}},fL=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE"]});var yL,hL=l(()=>{"use strict";Op();yL=(e,t)=>{let r=gL[e][t];return r===void 0?{ok:!1,from:e,event:t}:{ok:!0,state:r}}});var eae,Wr,PL=l(()=>{"use strict";hL();ot();eae=(e,t)=>{switch(t.kind){case"close":return e==="CAPTURING"&&t.ready?"episode_closed":null;case"draft_cap":return e==="EPISODE_READY"&&t.reached?"draft_cap_reached":null;case"budget":return e!=="EPISODE_READY"?null:t.ok?"budget_ok":"budget_exceeded";case"scrub":return e!=="SCRUBBING"?null:t.residualSecret?"scrub_quarantine":"scrub_ok";case"qualify":return e!=="TRIAGE"?null:t.ok?"qualify_ok":"qualify_reject";case"dedup":return e!=="DEDUP"?null:t.action==="skip_exact"?"dedup_skip":t.action==="update_draft"||t.action==="create_new"?t.action==="update_draft"?"dedup_merge":"dedup_novel":null;case"extract":return e!=="EXTRACT"?null:t.ok?"extract_ok":"extract_fail";case"validate":return e!=="VALIDATE"?null:t.ok?"validate_ok":t.attempts<=1?"validate_retry":"validate_fail";case"owner":return e!=="AWAITING_REVIEW"?null:t.decision==="publish"?"owner_publish":"owner_discard";default:return t}},Wr=e=>{let t=eae(e.state,e.verdict);if(t===null)return{ok:!1,reason:e.verdict.kind==="close"&&!e.verdict.ready?"not_ready":"no_transition",state:e.state};let r=yL(e.state,t);return r.ok?{ok:!0,event:t,nextState:r.state}:{ok:!1,reason:"illegal_event",state:e.state,event:t}}});var oae,Xq,nae,sae,AL,Mp,RS=l(()=>{"use strict";ot();Wp();oae=/^[a-z0-9][a-z0-9-]{0,63}$/,Xq=e=>{let t=e.replace(/^\uFEFF/,"");if(!t.startsWith("---"))return null;let r=t.indexOf(`
---`,3);if(r<0)return null;let o=t.slice(3,r).replace(/^\r?\n/,""),n=t.slice(r+4).replace(/^\r?\n/,""),s={};for(let i of o.split(/\r?\n/)){let a=i.indexOf(":");if(a<=0)continue;let c=i.slice(0,a).trim(),d=i.slice(a+1).trim().replace(/^["']|["']$/g,"");c.length>0&&(s[c]=d)}return{fm:s,body:n}},nae=e=>(e.match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??e).match(/^\s*(?:\d+\.|[-*])\s+\S+/gm)?.length??0,sae=e=>{if(e===void 0||e.trim().length===0)return null;let t=e.trim();if(t.startsWith("["))try{let r=JSON.parse(t.replace(/'/g,'"'));return Array.isArray(r)?r.filter(o=>typeof o=="string"):null}catch{return t.replace(/^\[|\]$/g,"").split(",").map(r=>r.trim().replace(/^["']|["']$/g,"")).filter(r=>r.length>0)}return t.split(",").map(r=>r.trim()).filter(r=>r.length>0)},AL=e=>{let t=e.minSteps??2,r=e.maxBodyBytes??65536,o=e.skillMarkdown;if(o.trim().length===0)return{ok:!1,reason:"empty"};let n=Buffer.byteLength(o,"utf8");if(n>r)return{ok:!1,reason:"body_too_large"};if(Yq(o))return{ok:!1,reason:"residual_secret"};let s=Xq(o);if(s===null)return{ok:!1,reason:"missing_frontmatter"};let{fm:i,body:a}=s,c=i.name??"";if(!oae.test(c))return{ok:!1,reason:"invalid_name"};let d=i.description??"";if(d.trim().length===0)return{ok:!1,reason:"missing_description"};let p=i.version??"";if(p.trim().length===0)return{ok:!1,reason:"missing_version"};if((i.status??"").trim()!=="draft")return{ok:!1,reason:"missing_status_draft"};let g=sae(i.source_message_ids??i.source_message_ids);if(g===null||g.length===0)return{ok:!1,reason:"missing_source_message_ids"};let f=nae(a);return f<t?{ok:!1,reason:"too_few_steps"}:{ok:!0,name:c,description:d,version:p,sourceMessageIds:g,stepCount:f,bodyBytes:n}},Mp=e=>(((Xq(e)?.body??e).match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??"").match(/^\s*(?:\d+\.|[-*])\s+(.+)$/gm)??[]).map(i=>i.replace(/^\s*(?:\d+\.|[-*])\s+/,"").trim())});var Zq,aae,Or,CS,vS=l(()=>{"use strict";Zq=require("node:crypto");Is();ot();rL();nL();sL();iL();lL();uL();ES();Wp();PL();RS();aae=e=>Math.ceil(e.length/4),Or=(e,t,r,o={})=>({...e,...o,state:t,reason:r}),CS=async e=>{let t=e.episode,r=[],o=null,n=0,s=null,i=e.deps.estimateTokens??aae,a=e.messages.map(p=>p.text).join(`
`),c=(p,g,f)=>{r.push(xp({projectId:t.projectId,episodeId:t.episodeId,fromState:p,toState:g,reason:f,tokensUsed:n,openDraftCount:e.deps.openDraftCount(),nowIso:new Date(e.nowMs).toISOString()}))};for(let p=0;p<16;p+=1){let g=wS({openDraftCount:e.deps.openDraftCount()});if(t.state==="CAPTURING"){let f=oL({messages:e.messages.map(S=>({messageId:S.messageId,createdAtMs:S.createdAtMs})),nowMs:e.nowMs,lastClosedAtMs:e.lastClosedAtMs}),h=Wr({state:t.state,verdict:{kind:"close",ready:f.ready}});if(!h.ok)break;let y=t.state;t=Or(t,h.nextState,f.ready?f.reason:null,{messageIds:f.ready?f.messageIds:t.messageIds,closedAtMs:f.ready?e.nowMs:t.closedAtMs,ownerMarkedSaveAsSkill:e.messages.some(S=>pL(S.text)),hasSuccessSignal:e.messages.some(S=>dL(S.text))}),c(y,t.state,t.reason);continue}if(t.state==="EPISODE_READY"){if(g.capReached){let S=Wr({state:t.state,verdict:{kind:"draft_cap",reached:!0}});S.ok&&(c(t.state,S.nextState,"draft_cap_reached"),t=Or(t,S.nextState,"draft_cap_reached"));break}let f=tL({tokensUsedToday:e.tokensUsedToday+n}),h=Wr({state:t.state,verdict:{kind:"budget",ok:f.ok}});if(!h.ok)break;let y=t.state;t=Or(t,h.nextState,f.ok?"budget_ok":f.reason),c(y,t.state,t.reason);continue}if(t.state==="SCRUBBING"){let f=Ca(a),h=Wr({state:t.state,verdict:{kind:"scrub",residualSecret:f.residualSecret}});if(!h.ok)break;let y=t.state;t=Or(t,h.nextState,f.residualSecret?"scrub_quarantine":"scrub_ok",{scrubbedTranscript:f.scrubbed}),c(y,t.state,t.reason);continue}if(t.state==="TRIAGE"){let f=cL({messageCount:t.messageIds.length,ownerMarkedSaveAsSkill:t.ownerMarkedSaveAsSkill,hasSuccessSignal:t.hasSuccessSignal}),h=Wr({state:t.state,verdict:{kind:"qualify",ok:f.ok}});if(!h.ok)break;let y=t.state;t=Or(t,h.nextState,f.reason),c(y,t.state,t.reason);continue}if(t.state==="DEDUP"){let f=rt(t.scrubbedTranscript??a),h=TS({contentHash:f,name:"",stepLines:[],existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if((h.action==="create_new"||h.action==="update_draft")&&e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let y=Wr({state:t.state,verdict:{kind:"dedup",action:h.action}});if(!y.ok)break;let S=t.state;t=Or(t,y.nextState,h.action,{contentHash:f,mergeDraftId:h.action==="update_draft"?h.draftId:t.mergeDraftId}),c(S,t.state,t.reason);continue}if(t.state==="EXTRACT"){if(e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let f=t.scrubbedTranscript??"",h=aL({estimatedInputTokens:i(f),inputTokenCap:12e3}),y=await e.deps.ownerLlm({scrubbedTranscript:f,similarDraftHints:[],mode:h});n+=y.tokensUsed;let S=Wr({state:t.state,verdict:{kind:"extract",ok:y.ok}});if(!S.ok)break;let u=t.state;y.ok&&(s=y.skillMarkdown),t=Or(t,S.nextState,y.ok?"extract_ok":y.reason,{tokensUsed:t.tokensUsed+y.tokensUsed}),c(u,t.state,t.reason);continue}if(t.state==="VALIDATE"){let f=s??"",h=AL({skillMarkdown:f}),y=t.validateAttempts+(h.ok?0:1),S=Wr({state:t.state,verdict:{kind:"validate",ok:h.ok,attempts:h.ok?t.validateAttempts:Math.max(1,y)}});if(!S.ok)break;let u=t.state;if(h.ok){let A=rt(f),T=Mp(f),P=TS({contentHash:A,name:h.name,stepLines:T,existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if(P.action==="skip_exact"){t=Or(t,"SKIPPED_DEDUP","skip_exact",{contentHash:A,validateAttempts:y}),c(u,t.state,"skip_exact");break}let b=P.action==="update_draft"?P.draftId:t.mergeDraftId??(0,Zq.randomUUID)();o=e.deps.writeDraft({projectId:t.projectId,draftId:b,skillMarkdown:f,episodeId:t.episodeId,sourceMessageIds:h.sourceMessageIds,name:h.name,description:h.description}),t=Or(t,S.nextState,"validate_ok",{draftId:b,contentHash:o.contentHash,validateAttempts:y}),c(u,t.state,t.reason);break}if(S.nextState==="EXTRACT"&&(s=null),t=Or(t,S.nextState,h.reason,{validateAttempts:y}),c(u,t.state,t.reason),S.nextState==="EXTRACT"&&y>1)break;continue}break}let d=wS({openDraftCount:e.deps.openDraftCount()});return{episode:t,metrics:r,reviewFlag:d,draftWritten:o,tokensSpent:n}}});var bL,_L,jp,LS=l(()=>{"use strict";bL=m(require("node:fs")),_L=m(require("node:path"));Mt();oe();ne();jp=e=>{if(e.events.length===0)return;let t=me(e.projectId),r=_L.default.join(t,Ee);gt(r);let o=_L.default.join(r,Rq),n=`${e.events.map(s=>JSON.stringify(s)).join(`
`)}
`;bL.default.appendFileSync(o,n,{mode:384});try{bL.default.chmodSync(o,384)}catch{}}});var va,IS=l(()=>{"use strict";va=e=>e.trim().toLowerCase().replace(/\s+/g," ").replace(/[.,;:!?]+$/g,"")});var rJ,Qq,eJ,cae,dae,kL,wL=l(()=>{"use strict";rJ=require("node:crypto");ot();IS();Wp();Qq=(e,t)=>e.length<=t?e:`${e.slice(0,Math.max(0,t-1)).trimEnd()}\u2026`,eJ=e=>e.toLowerCase().replace(/_/g," "),cae=(e,t)=>`sha256:${(0,rJ.createHash)("sha256").update(`${e}
${t}`,"utf8").digest("hex")}`,dae=(e,t)=>{let r=t.replace(/^sha256:/,"").slice(0,12);return`hist-${e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40)||"ep"}-${r}`.slice(0,64)},kL=e=>{let t=e.maxPerDraft??8,r=e.maxStored??64,o=e.nowIso??new Date().toISOString(),n=new Set,s=[],i=[],a=0;for(let c of e.failures){let d=c.reason!==null&&c.reason.trim().length>0?c.reason.trim():eJ(c.state),p=Ca(d);if(p.residualSecret){a+=1;continue}let g=`Avoid repeating this history failure (${eJ(c.state)}).`,f=Ca(g);if(f.residualSecret){a+=1;continue}let h=Qq(p.scrubbed.replace(/\s+/g," ").trim(),120),y=Qq(f.scrubbed.replace(/\s+/g," ").trim(),280);if(h.length===0||y.length===0)continue;let S=va(`${h}|${y}`);if(n.has(S))continue;n.add(S);let u=cae(h,y),A=`- **${h}:** ${y}`;s.length<t&&s.push(A),i.length<r&&i.push({id:dae(c.episodeId,u),symptom:h,avoidance:y,sourceEpisodeId:c.episodeId,sourceState:c.state,contentHash:u,createdAt:o})}return{skillPitfallLines:s,localEntries:i,skippedSecretCount:a}}});var pae,TL,EL=l(()=>{"use strict";IS();ot();pae=e=>{let t=[];for(let r of e.split(/\r?\n/)){let o=r.trim();/^[-*]\s+\S/.test(o)?t.push(o.replace(/^\*\s+/,"- ")):/^\d+\.\s+\S/.test(o)&&t.push(o.replace(/^\d+\.\s+/,"- "))}return t},TL=e=>{let t=e.maxBullets??8,r=e.skillMarkdown,o=/(^|\n)(##\s*Pitfalls\s*\n)([\s\S]*?)(?=\n##\s+\S|$)/i,n=r.match(o),s=n?pae(n[3]??""):[],i=new Set(s.map(g=>va(g))),a=[...s],c=0;for(let g of e.newPitfallLines){let f=g.trim();if(f.length===0)continue;let h=f.startsWith("- ")?f:`- ${f}`,y=va(h);if(!i.has(y)){if(a.length>=t)break;i.add(y),a.push(h),c+=1}}let d=a.length>0?`${a.join(`
`)}
`:`(none yet)
`;if(n)return{skillMarkdown:r.replace(o,(f,h,y)=>`${h}${y}${d}`),appendedCount:c,totalPitfallBullets:a.length};let p=r.endsWith(`
`)?"":`
`;return{skillMarkdown:`${r}${p}
## Pitfalls
${d}`,appendedCount:c,totalPitfallBullets:a.length}}});var RL,nJ,oJ,OS,CL,vL=l(()=>{"use strict";RL=m(require("node:fs")),nJ=m(require("node:path"));oe();ne();oJ="[project-history-skillgen]",OS=()=>({items:[],updatedAt:new Date(0).toISOString()}),CL=e=>{let t=nJ.default.join(X(e),Ee,SS);if(!RL.default.existsSync(t))return OS();try{let r=JSON.parse(RL.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.items)?(console.error(oJ,"learned_pitfalls_corrupt",e),OS()):{items:r.items,updatedAt:typeof r.updatedAt=="string"?r.updatedAt:OS().updatedAt}}catch(r){return console.error(oJ,"learned_pitfalls_read_failed",e,r),OS()}}});var uae,sJ,iJ=l(()=>{"use strict";uae=["FAILED_EXTRACT","FAILED_VALIDATE","QUARANTINED","SKIPPED_FILTER"],sJ=e=>uae.includes(e)});var LL,IL=l(()=>{"use strict";iJ();LL=e=>{let t=[];for(let r of e.episodes)e.excludeEpisodeId!==void 0&&e.excludeEpisodeId!==null&&r.episodeId===e.excludeEpisodeId||sJ(r.state)&&t.push({episodeId:r.episodeId,state:r.state,reason:r.reason});return t}});var xL,Np,mae,Dp,WL,MS=l(()=>{"use strict";xL=m(require("node:fs")),Np=m(require("node:path"));Is();Mt();oe();ne();mae=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),Dp=e=>{if(!mae(e.draftId))throw new Error("invalid_draft_id");let t=me(e.projectId),r=Np.default.join(t,Te,nn,e.draftId);gt(r);let o=Np.default.join(r,yS),n=Np.default.join(r,hS),s=rt(e.skillMarkdown);return Re(o,e.skillMarkdown),Re(n,`${JSON.stringify({draftId:e.draftId,episodeId:e.episodeId,name:e.name,description:e.description,sourceMessageIds:e.sourceMessageIds,contentHash:s,status:"draft",updatedAt:new Date().toISOString()})}
`),{draftDir:r,skillPath:o,metaPath:n,contentHash:s}},WL=e=>{let t=me(e),r=Np.default.join(t,Te,nn);return xL.default.existsSync(r)?xL.default.readdirSync(r,{withFileTypes:!0}).filter(o=>o.isDirectory()&&!o.name.startsWith(".")).length:0}});var aJ,OL,ML=l(()=>{"use strict";aJ=m(require("node:path"));Mt();oe();ne();OL=e=>{let t=me(e.projectId),r=aJ.default.join(t,Ee,SS),o={...e.file,updatedAt:new Date().toISOString()};return Re(r,`${JSON.stringify(o)}
`),o}});var lJ,jL,NL=l(()=>{"use strict";lJ=m(require("node:path"));Mt();oe();ne();jL=e=>{let t=me(e.projectId),r=lJ.default.join(t,Ee,yv),o={...e.file,updatedAt:new Date().toISOString()};return Re(r,`${JSON.stringify(o)}
`),o}});var HL,cJ,DL,gae,fae,jS,FL,zL=l(()=>{"use strict";HL=m(require("node:fs")),cJ=m(require("node:path"));LS();wL();EL();ot();vL();ES();IL();MS();ML();NL();DL="[project-history-skillgen]",gae=(e,t)=>{let r=new Map;for(let o of e)r.set(o.contentHash,o);for(let o of t)r.set(o.contentHash,o);return[...r.values()].slice(-64)},fae=e=>{try{let t=JSON.parse(HL.default.readFileSync(e,"utf8"));return{name:typeof t.name=="string"?t.name:"draft",description:typeof t.description=="string"?t.description:"",sourceMessageIds:Array.isArray(t.sourceMessageIds)?t.sourceMessageIds.filter(r=>typeof r=="string"):[]}}catch{return{name:"draft",description:"",sourceMessageIds:[]}}},jS=e=>{try{jp({projectId:e.projectId,events:[xp({projectId:e.projectId,episodeId:e.episodeId,fromState:e.state,toState:e.state,reason:e.reason,tokensUsed:0,nowIso:e.nowIso})]})}catch{}},FL=e=>{let t=new Date(e.nowMs).toISOString();try{let r=LL({episodes:e.episodes,excludeEpisodeId:e.successEpisode.episodeId}),o=kL({failures:r,nowIso:t});if(o.skillPitfallLines.length===0&&o.localEntries.length===0)return{appendedCount:0,storedCount:0,ok:!0};let n=0;try{let s=fae(e.draftWritten.metaPath),i=HL.default.readFileSync(e.draftWritten.skillPath,"utf8"),a=TL({skillMarkdown:i,newPitfallLines:o.skillPitfallLines});n=a.appendedCount,a.skillMarkdown!==i&&Dp({projectId:e.projectId,draftId:cJ.default.basename(e.draftWritten.draftDir),skillMarkdown:a.skillMarkdown,episodeId:e.successEpisode.episodeId,sourceMessageIds:s.sourceMessageIds,name:s.name,description:s.description})}catch(s){console.error(DL,"pitfalls_draft_merge_failed",e.projectId,s),jS({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_draft_merge_failed",nowIso:t})}try{let s=CL(e.projectId),i=gae(s.items,o.localEntries);return OL({projectId:e.projectId,file:{items:i,updatedAt:t}}),jL({projectId:e.projectId,file:{historyLearnedPitfalls:i.length===0?null:{active:!0,count:i.length,updatedAt:t,summary:`${i.length} recent pitfalls from project history (local)`},updatedAt:t}}),jS({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attached",nowIso:t}),{appendedCount:n,storedCount:i.length,ok:!0}}catch(s){return console.error(DL,"pitfalls_store_failed",e.projectId,s),jS({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_store_failed",nowIso:t}),{appendedCount:n,storedCount:0,ok:!1}}}catch(r){return console.error(DL,"pitfalls_attach_failed",e.projectId,r),jS({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attach_failed",nowIso:t}),{appendedCount:0,storedCount:0,ok:!1}}}});var Hp,NS=l(()=>{"use strict";Hp=e=>{let t=e.message;for(let r of["summary","text","body","content"]){let o=t[r];if(typeof o=="string"&&o.trim().length>0)return o}return""}});var dJ,pJ=l(()=>{"use strict";Op();dJ=(e,t)=>{for(let r=e.length-1;r>=0;r-=1){let o=e[r];if(o.projectId===t&&fL.includes(o.state))return o}return null}});var $L,UL=l(()=>{"use strict";$L=e=>e==="on_ready"||e==="degraded"||e==="on_configuring"});var BL,uJ,yae,GL,VL=l(()=>{"use strict";BL=m(require("node:fs")),uJ=m(require("node:path"));oe();ne();yae=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.messageId=="string"&&typeof t.projectId=="string"&&typeof t.savedAt=="string"&&typeof t.message=="object"&&t.message!==null&&!Array.isArray(t.message)},GL=e=>{let t=e.messageId.trim();if(t.length===0||t.includes("/")||t.includes("\\")||t.includes(".."))return null;let r=uJ.default.join(X(e.projectId),ir,`${t}.json`);if(!BL.default.existsSync(r))return null;try{let o=JSON.parse(BL.default.readFileSync(r,"utf8"));return yae(o)?o:null}catch{return null}}});var KL,mJ,Fp,DS=l(()=>{"use strict";KL=m(require("node:fs")),mJ=m(require("node:path"));oe();VL();ne();Fp=e=>{let t=mJ.default.join(X(e),ir);if(!KL.default.existsSync(t))return[];let r=KL.default.readdirSync(t).filter(n=>n.endsWith(".json")&&n!=="state.json").map(n=>n.slice(0,-5)),o=[];for(let n of r){let s=GL({projectId:e,messageId:n});s!==null&&o.push(s)}return o.sort((n,s)=>{let i=Date.parse(n.savedAt),a=Date.parse(s.savedAt);return i!==a?i-a:n.messageId.localeCompare(s.messageId)})}});var Ws,HS,gJ,fJ=l(()=>{"use strict";Ws=m(require("node:fs")),HS=m(require("node:path"));oe();ne();RS();gJ=e=>{let t=HS.default.join(X(e),Te,nn);if(!Ws.default.existsSync(t))return[];let r=[];for(let o of Ws.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("."))continue;let n=HS.default.join(t,o.name,yS),s=HS.default.join(t,o.name,hS);if(Ws.default.existsSync(n))try{let i=Ws.default.readFileSync(n,"utf8"),a="",c=o.name;if(Ws.default.existsSync(s)){let d=JSON.parse(Ws.default.readFileSync(s,"utf8"));typeof d.contentHash=="string"&&(a=d.contentHash),typeof d.name=="string"&&d.name.length>0&&(c=d.name)}if(a.length===0)continue;r.push({id:o.name,contentHash:a,name:c,stepLines:Mp(i)})}catch{}}return r}});var zp,qL,yJ,hJ=l(()=>{"use strict";zp=m(require("node:fs")),qL=m(require("node:path"));oe();ne();yJ=e=>{let t=qL.default.join(X(e),Te);if(!zp.default.existsSync(t))return[];let r=[];for(let o of zp.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("_"))continue;let n=qL.default.join(t,o.name,sn);if(zp.default.existsSync(n))try{let s=JSON.parse(zp.default.readFileSync(n,"utf8"));if(typeof s.contentHash!="string")continue;r.push({id:o.name,contentHash:s.contentHash,name:typeof s.skillId=="string"?s.skillId:o.name,stepLines:[]})}catch{}}return r}});var hae,JL,YL=l(()=>{"use strict";NS();DS();hae=(e,t,r,o)=>r===null||e>r?!0:e<r?!1:o===null?!0:t.localeCompare(o)>0,JL=e=>{let t=Fp(e.projectId),r=[];for(let o of t){let n=Date.parse(o.savedAt);Number.isNaN(n)||hae(n,o.messageId,e.cursorSavedAtMs,e.cursorMessageId)&&r.push({messageId:o.messageId,createdAtMs:n,text:Hp(o)})}return r}});var SJ,PJ=l(()=>{"use strict";SJ=(e,t)=>{let r=e.findIndex(o=>o.episodeId===t.episodeId);return r<0?[...e,t]:e.map((o,n)=>n===r?t:o)}});var AJ,XL,ZL=l(()=>{"use strict";AJ=m(require("node:path"));Mt();oe();ne();XL=e=>{let t=me(e.projectId),r=AJ.default.join(t,Ee,fS),o={...e.budget,updatedAt:new Date().toISOString()};return Re(r,`${JSON.stringify(o)}
`),o}});var bJ,QL,eI=l(()=>{"use strict";bJ=m(require("node:path"));Mt();oe();ne();QL=e=>{let t=me(e.projectId),r=bJ.default.join(t,Ee,gS),o={...e.file,updatedAt:new Date().toISOString()};return Re(r,`${JSON.stringify(o)}
`),o}});var _J,kJ=l(()=>{"use strict";LS();PJ();ZL();eI();_J=e=>{let{result:t,episodesFile:r,budget:o,projectId:n,nowMs:s}=e,i=r.cursorMessageId,a=r.cursorSavedAtMs;t.episode.state!=="CAPTURING"&&t.episode.messageIds.length>0&&(i=t.episode.messageIds[t.episode.messageIds.length-1],a=t.episode.lastMessageAtMs??a),QL({projectId:n,file:{episodes:SJ(r.episodes,t.episode),cursorMessageId:i,cursorSavedAtMs:a,updatedAt:new Date(s).toISOString()}}),XL({projectId:n,budget:{dayKey:o.dayKey,tokensUsedToday:o.tokensUsedToday+t.tokensSpent,lastClosedAtMs:t.episode.closedAtMs??o.lastClosedAtMs,updatedAt:new Date(s).toISOString()}}),jp({projectId:n,events:t.metrics})}});var FS,tI=l(()=>{"use strict";FS=e=>new Date(e).toISOString().slice(0,10)});var zS,wJ=l(()=>{"use strict";tI();zS=e=>({dayKey:FS(e),tokensUsedToday:0,lastClosedAtMs:null,updatedAt:new Date(e).toISOString()})});var rI,EJ,TJ,Sae,oI,nI=l(()=>{"use strict";rI=m(require("node:fs")),EJ=m(require("node:path"));wJ();oe();ne();tI();TJ="[project-history-skillgen]",Sae=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e;if(typeof r.dayKey!="string"||typeof r.tokensUsedToday!="number"||!(r.lastClosedAtMs===null||typeof r.lastClosedAtMs=="number")||typeof r.updatedAt!="string")return null;let o=FS(t);return r.dayKey!==o?{dayKey:o,tokensUsedToday:0,lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}:{dayKey:r.dayKey,tokensUsedToday:Math.max(0,r.tokensUsedToday),lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}},oI=e=>{let t=EJ.default.join(X(e.projectId),Ee,fS);if(!rI.default.existsSync(t))return zS(e.nowMs);try{let r=JSON.parse(rI.default.readFileSync(t,"utf8")),o=Sae(r,e.nowMs);return o===null?(console.error(TJ,"budget_corrupt",e.projectId),zS(e.nowMs)):o}catch(r){return console.error(TJ,"budget_read_failed",e.projectId,r),zS(e.nowMs)}}});var $S,RJ=l(()=>{"use strict";$S=(e=new Date(0).toISOString())=>({episodes:[],cursorMessageId:null,cursorSavedAtMs:null,updatedAt:e})});var sI,vJ,CJ,Pae,Aae,bae,iI,aI=l(()=>{"use strict";sI=m(require("node:fs")),vJ=m(require("node:path"));RJ();Op();oe();ne();CJ="[project-history-skillgen]",Pae=e=>typeof e=="string"&&mL.includes(e),Aae=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.episodeId=="string"&&typeof t.projectId=="string"&&Pae(t.state)&&Array.isArray(t.messageIds)&&typeof t.startedAtMs=="number"&&typeof t.lastMessageAtMs=="number"},bae=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(!Array.isArray(t.episodes))return null;let r=t.episodes.filter(Aae);if(r.length!==t.episodes.length||typeof t.updatedAt!="string")return null;let o=t.cursorMessageId===null||typeof t.cursorMessageId=="string"?t.cursorMessageId:null,n=t.cursorSavedAtMs===null||typeof t.cursorSavedAtMs=="number"?t.cursorSavedAtMs:null;return{episodes:r,cursorMessageId:o,cursorSavedAtMs:n,updatedAt:t.updatedAt}},iI=e=>{let t=vJ.default.join(X(e),Ee,gS);if(!sI.default.existsSync(t))return $S();try{let r=JSON.parse(sI.default.readFileSync(t,"utf8")),o=bae(r);return o===null?(console.error(CJ,"episodes_corrupt",e),$S()):o}catch(r){return console.error(CJ,"episodes_read_failed",e,r),$S()}}});var LJ,_ae,kae,lI,cI=l(()=>{"use strict";LJ=require("node:crypto");vS();zL();NS();pJ();UL();DS();fJ();hJ();YL();Ra();kJ();nI();aI();MS();_ae="[project-history-skillgen]",kae=(e,t)=>{let r=new Map;for(let o of Fp(e)){let n=Date.parse(o.savedAt);Number.isNaN(n)||r.set(o.messageId,{messageId:o.messageId,createdAtMs:n,text:Hp(o)})}return t.map(o=>r.get(o)).filter(o=>o!==void 0)},lI=(e={})=>{let t=e.ownerLlm??null,r=e.nowMs??Date.now;return async o=>{try{let n=Ea(o.projectId);if(!$L(n?.state))return;let s=r(),i=iI(o.projectId),a=oI({projectId:o.projectId,nowMs:s}),c=JL({projectId:o.projectId,cursorMessageId:i.cursorMessageId,cursorSavedAtMs:i.cursorSavedAtMs}),d=dJ(i.episodes,o.projectId);if(d===null){if(c.length===0)return;let f=c[0],h=c[c.length-1];d={episodeId:(0,LJ.randomUUID)(),projectId:o.projectId,state:"CAPTURING",messageIds:c.map(y=>y.messageId),startedAtMs:f.createdAtMs,lastMessageAtMs:h.createdAtMs,closedAtMs:null,reason:null,scrubbedTranscript:null,ownerMarkedSaveAsSkill:!1,hasSuccessSignal:!1,validateAttempts:0,draftId:null,contentHash:null,mergeDraftId:null,tokensUsed:0}}else if(d.state==="CAPTURING"&&c.length>0){let f=new Set(d.messageIds),h=[...d.messageIds],y=d.lastMessageAtMs;for(let S of c)f.has(S.messageId)||(h.push(S.messageId),f.add(S.messageId),y=Math.max(y,S.createdAtMs));d={...d,messageIds:h,lastMessageAtMs:y}}let p=kae(o.projectId,d.messageIds);if(p.length===0)return;let g=await CS({episode:d,messages:p,tokensUsedToday:a.tokensUsedToday,lastClosedAtMs:a.lastClosedAtMs,nowMs:s,deps:{ownerLlm:t,writeDraft:Dp,listDraftFingerprints:()=>gJ(o.projectId),listPublishedFingerprints:()=>yJ(o.projectId),openDraftCount:()=>WL(o.projectId)}});if(_J({projectId:o.projectId,episodesFile:i,budget:a,result:g,nowMs:s}),g.draftWritten!==null&&g.episode.state==="AWAITING_REVIEW"){let f=[...i.episodes.filter(h=>h.episodeId!==g.episode.episodeId),g.episode];FL({projectId:o.projectId,successEpisode:g.episode,episodes:f,draftWritten:g.draftWritten,nowMs:s})}}catch(n){console.error(_ae,"run_failed",o.projectId,n)}}}});var dI,pI,uI=l(()=>{"use strict";Is();ee();Vr();eL();Zv();cI();Ra();dI="[project-history-tick]",pI=async(e={})=>{let t=e.listProjectIds?.()??Jv();if(t.length===0)return;let r=H(),o=e.cloudApi!==void 0?e.cloudApi:r===null?null:V({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),n=Xv(),s=e.pullSkills??bS,i=e.runSkillgen??lI({ownerLlm:e.ownerLlm??null});for(let a of t){try{await i({projectId:a})}catch(c){console.error(dI,"skillgen_failed",a,c)}if(o===null){console.error(dI,"pull_skipped_no_cloud_api",a);continue}try{await s({projectId:a,deps:{history:n,awcPublished:Qv(o)}})}catch(c){console.error(dI,"pull_failed",a,c)}}}});var mI,xJ=l(()=>{"use strict";ot();uI();mI=e=>{let t=e?.intervalMs??6e4,r=e?.tick??(()=>pI());r();let o=setInterval(()=>{r()},t);return{stop:()=>{clearInterval(o)}}}});var WJ=l(()=>{"use strict";oe();ne()});var OJ=l(()=>{"use strict";vS()});var MJ=l(()=>{"use strict";oe();ne()});var gI=l(()=>{"use strict";fv();ne();Nv();Hv();$v();Gv();qv();Hq();ot();Zv();eL();uI();Is();xJ();Ra();ot();nL();rL();uL();Wp();iL();lL();RS();MS();sL();ES();WJ();hL();PL();vS();OJ();Op();VL();DS();NS();YL();aI();eI();nI();ZL();LS();cI();UL();IS();IL();wL();EL();zL();vL();ML();MJ();NL();ot()});var jt,wae,jJ,NJ,fI,yI,hI,SI,PI,AI,bI=l(()=>{"use strict";jt=require("node:crypto"),wae=Buffer.from("302a300506032b6570032100","hex"),jJ=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},NJ=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,jt.createPublicKey)({key:Buffer.concat([wae,t]),format:"der",type:"spki"})},fI=()=>{let{publicKey:e,privateKey:t}=(0,jt.generateKeyPairSync)("ed25519");return{publicKeyRaw:jJ(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},yI=e=>(0,jt.createPrivateKey)(e),hI=(e,t)=>(0,jt.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),SI=(e,t,r)=>{try{let o=NJ(e);return(0,jt.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},PI=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,AI=()=>(0,jt.randomBytes)(32).toString("base64url")});var fo,US,DJ,Tae,Eae,BS,_I,kI,HJ=l(()=>{"use strict";fo=m(require("node:fs")),US=m(require("node:path"));bI();G();Ie();DJ=e=>US.default.join(e.installDir,To),Tae=(e,t)=>{if(e.profileEmail===null||t===DJ(e)||fo.default.existsSync(t))return;let r=DJ(e);fo.default.existsSync(r)&&(fo.default.mkdirSync(US.default.dirname(t),{recursive:!0}),fo.default.renameSync(r,t))},Eae=e=>{if(!fo.default.existsSync(e))return null;try{let t=fo.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},BS=e=>{let t=ll(e);Tae(e,t);let r=Eae(t);if(r!==null)return r;let o=fI();return fo.default.mkdirSync(US.default.dirname(t),{recursive:!0}),fo.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},_I=e=>{let t=BS(e.layout),r=AI(),o=PI({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=yI(t.privateKeyPem),s=hI(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},kI=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return SI(e.serverPublicKey,t,e.serverAttestation)}});var wI=l(()=>{"use strict";HJ();bI()});var FJ,zJ,$J=l(()=>{"use strict";FJ=m(require("node:path")),zJ=e=>({osUid:typeof e.uid=="number"&&Number.isInteger(e.uid)&&e.uid>=0?e.uid:null,installRootName:FJ.default.basename(e.installDir)})});var VJ,$p,RI,CI,UJ,Rae,TI,GS,be,KJ,Cae,EI,vae,Lae,vI,Ae,Ne,ft,Iae,BJ,GJ,Up,Bp,qJ=l(()=>{"use strict";VJ=m(require("node:http")),$p=m(require("node:fs")),RI=m(require("node:path"));VS();rd();k$();T$();I$();Mn();MT();nE();nU();iU();cK();Kf();WC();PK();WK();MK();pS();qK();nq();Do();qt();Lt();sq();aq();jk();Ew();Dk();dq();mq();uv();fr();Tq();gI();ee();wI();$J();CI=e=>kT(e)??"never",UJ=48e3,Rae=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,TI=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??tf(),reveal:t.reveal,installed:Ar(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),GS=async e=>{let t=H();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:br(t,e)},be=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),KJ=200,Cae=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',EI=e=>{let t=e.trim().slice(0,KJ),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},vae=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${be(t)}</div>`,Lae=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${be(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',vI={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},Ae=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...vI}),e.end(JSON.stringify(r))},Ne=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},ft=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},Iae=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=Cae(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${be(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=lv(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${od(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${be(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${be(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${be(CI(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${be(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},BJ=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},GJ=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,KJ)},Up=e=>{let t=RI.default.join(e.layout.installDir,"link-code.txt"),r=()=>Ye(e.layout.installDir),o=()=>{let y=r();return{installBundleVersion:mS(y),installBundleUpdatedAt:y?.updatedAt??null,installVersion:y}},n=async y=>{let S=y.installVersion??r(),u=await i(),A=dE(u),T=y.updateFlash??null,P=pE(T),b=vae(T,y.updateError??null);return lE({title:y.title,activePath:y.activePath,body:y.body,cloudAppOrigin:sr(S),installBundleVersionLabel:mS(S),prependBody:`${P}${b}${A}`,headerUpdateButtonHtml:cE(u)})},s=null,i=async()=>{let y=Date.now();if(s!==null&&y-s.cachedAtMs<6e4)return s.offer;let S=await av(e.layout);return s={cachedAtMs:y,offer:S},S},a=()=>{s=null},c=!1,d=async y=>{if(a(),!(await i()).updateAvailable){y.writeHead(303,{Location:"/?update=ok"}),y.end();return}if(c){y.writeHead(303,{Location:EI("An update is already running.")}),y.end();return}c=!0;try{let u=await pv(),A=u.ok?"/?update=ok":EI(u.message);y.writeHead(303,{Location:A}),y.end()}catch(u){let A=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";y.writeHead(303,{Location:EI(A)}),y.end()}finally{c=!1,a()}},p=async(y,S)=>{let u=S==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",A=o(),T=await n({title:S,activePath:S==="Project not found"?"/projects":"/",installVersion:A.installVersion,body:`<section class="card">
      <h1>${be(S)}</h1>
      <p>${be(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});y.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),y.end(T)},g=()=>{if($p.default.existsSync(t))return $p.default.readFileSync(t,"utf8").trim();let y=Math.random().toString(36).slice(2,8).toUpperCase();return $p.default.writeFileSync(t,y,"utf8"),y},f=VJ.default.createServer((y,S)=>{(async()=>{let u=y.url?.split("?")[0]??"/",A=y.method??"GET";if(A==="OPTIONS"){S.writeHead(204,vI),S.end();return}if(await CC({method:A,pathname:u,request:y,response:S,requestUrl:y.url??"/",storePath:SK(RI.default.dirname(e.layout.configPath)),readBody:ft,sendHtml:Ne,renderShell:n})||await Pw({method:A,pathname:u,request:y,response:S,layout:e.layout,readBody:ft,sendJson:Ae})||await Qh({method:A,pathname:u,request:y,response:S,layout:e.layout,readBody:ft,sendJson:Ae}))return;if(A==="GET"&&u==="/health"){let P=e.controllers.getStatus(),b=o();Ae(S,200,{ok:!0,...P,installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt,...zJ({uid:process.getuid?.(),installDir:e.layout.installDir})});return}if(A==="GET"&&u==="/api/status"){let P=o();Ae(S,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:P.installBundleVersion,installBundleUpdatedAt:P.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/traffic"){Ae(S,200,{entries:ed(e.layout)});return}if(A==="DELETE"&&u==="/api/traffic"||A==="POST"&&u==="/api/traffic/clear"){if(ET(e.layout),A==="POST"){S.writeHead(303,{Location:"/traffic?cleared=1"}),S.end();return}Ae(S,200,{ok:!0});return}if(A==="GET"&&u==="/api/trace"){Ae(S,200,{entries:hy(e.layout)});return}if(A==="DELETE"&&u==="/api/trace"||A==="POST"&&u==="/api/trace/clear"){if(vT(e.layout),A==="POST"){S.writeHead(303,{Location:"/status"}),S.end();return}Ae(S,200,{ok:!0});return}if(A==="POST"&&u==="/api/errors/clear"){LT(e.layout.errorLogPath),S.writeHead(303,{Location:"/errors?cleared=1"}),S.end();return}if(A==="GET"&&u==="/api/knowledge"){let b=new URL(y.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(b.length>0){let k=await Vi({layout:e.layout,query:b,limit:20});Ae(S,200,{chunks:k,query:b});return}Ae(S,200,{chunks:Gi(e.layout).slice(-50).reverse()});return}if(A==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),S.writeHead(303,{Location:"/status?revived=1"}),S.end();return}if(A==="GET"&&u==="/api/update-status"){let P=await i();Ae(S,200,{ok:!0,...P});return}if((A==="GET"||A==="POST")&&u==="/api/update"){await d(S);return}if(A==="GET"&&u==="/"){let P=e.controllers.getStatus(),b=o(),k=Ar(e.layout),E=Sy(e.layout.errorLogPath);Ne(S,await n({title:"Home",activePath:"/",installVersion:b.installVersion,updateFlash:BJ(y.url??void 0),updateError:GJ(y.url??void 0),body:uE({wsConnected:P.wsConnected,lastHeartbeatAt:P.lastHeartbeatAt,installBundleVersion:b.installBundleVersion,harnessSetCount:k.sets.length,knowledgeChunkCount:Gi(e.layout).length,trafficEntryCount:ed(e.layout).length,wakeError:P.wakeError,errorLogByteSize:E.byteSize,errorLogExists:E.exists})}));return}if(A==="GET"&&u==="/task"){let P=e.controllers.getStatus(),b=o(),k=H(),E=new URL(y.url??"/",`http://127.0.0.1:${43347}`),w=E.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,x=E.searchParams.get("failed")==="1"?E.searchParams.get("error")?.trim()??"Task failed.":null,I=E.searchParams.get("runId");Ne(S,await n({title:"Task",activePath:"/task",installVersion:b.installVersion,body:OC({defaultWorkspace:k?.workspace??"",wsConnected:P.wsConnected,flashMessage:w,flashError:x,lastRunId:I})}));return}if(A==="POST"&&u==="/task/dispatch"){let P=await ft(y),b=new URLSearchParams(P),k=b.get("prompt")?.trim()??"",E=b.get("writerAgent")?.trim()??"claude-cli",w=b.get("projectFolder")?.trim()??"",x=await gv({prompt:k,writerAgent:E,...w.length>0?{projectFolderPath:w}:{}}),I=new URLSearchParams;x.ok?I.set("ok","1"):(I.set("failed","1"),x.errorMessage!==void 0&&I.set("error",x.errorMessage.slice(0,240))),x.agentRunId!==void 0&&I.set("runId",x.agentRunId),S.writeHead(303,{Location:`/task?${I.toString()}`}),S.end();return}if(A==="GET"&&u==="/writer-sessions"){let P=o(),b=aS(e.layout,12);Ne(S,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:P.installVersion,updateFlash:BJ(y.url??void 0),updateError:GJ(y.url??void 0),body:zC({sessions:b})}));return}if(A==="GET"&&u==="/errors"){let P=o(),b=Sy(e.layout.errorLogPath);Ne(S,await n({title:"Errors",activePath:"/errors",installVersion:P.installVersion,body:xT({errorLogPath:e.layout.errorLogPath,content:b.content,exists:b.exists,truncated:b.truncated,byteSize:b.byteSize,cleared:new URL(y.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(A==="GET"&&u==="/status"){let P=new URL(y.url??"/",`http://127.0.0.1:${43347}`),b=e.controllers.getStatus(),k=ve(e.layout),E=k!==null?ze(k,12e4):jT(b.lastHeartbeatAt,12e4),w=NT({lastHeartbeatAt:b.lastHeartbeatAt,heartbeatIsStale:E}),x=o();Ne(S,await n({title:"Status",activePath:"/status",installVersion:x.installVersion,body:`${Iae({status:b,healthBadge:w,revived:P.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:x.installBundleVersion,installBundleUpdatedAt:x.installBundleUpdatedAt})}${FT({installDir:e.layout.installDir})}${HT({entries:hy(e.layout)})}`}));return}if(A==="GET"&&u==="/traffic"){let P=new URL(y.url??"/",`http://127.0.0.1:${43347}`),b=ed(e.layout),k=o(),E=b.map(I=>`<tr><td title="${be(I.at)}">${be(CI(I.at))}</td><td>${be(I.direction)}</td><td><code>${be(I.type)}</code></td><td>${be(I.summary)}</td><td>${be(I.action??"")}</td></tr>`).join(""),w=b.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${E}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',x=P.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Ne(S,await n({title:"Traffic",activePath:"/traffic",installVersion:k.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${x}
              ${w}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(A==="GET"&&u==="/projects"){let P=new URL(y.url??"/",`http://127.0.0.1:${43347}`),b=o(),k=sr(b.installVersion),E=await GS(e.layout),w=P.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":P.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,x=P.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,I=H(),j=I===null?null:V({wsUrl:I.wsUrl,pairingToken:I.pairingToken}),O=j===null?{}:Object.fromEntries((await Promise.all(E.projects.map(async $=>{let B=await nv(j,$.id);return[$.id,B?.counts??null]}))).filter($=>$[1]!==null));Ne(S,await n({title:"Projects",activePath:"/projects",installVersion:b.installVersion,body:sv({projects:E.projects,compositionCountsByProjectId:O,cloudAppOrigin:k,syncMessage:E.message,syncOk:E.ok,flashMessage:x,flashError:w})}));return}if(A==="GET"&&u==="/projects/select-folder"){let b=new URL(y.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",k=H(),E=k===null?null:V({wsUrl:k.wsUrl,pairingToken:k.pairingToken}),w=b.length>0&&E!==null?Uo():null;if(w===null||E===null){S.writeHead(303,{Location:"/projects"}),S.end();return}if(st({projectFolderPath:w}),!await Rc(E,b,w)){S.writeHead(303,{Location:"/projects?folderError=1"}),S.end();return}S.writeHead(303,{Location:`/project?id=${encodeURIComponent(b)}&folderUpdated=1`}),S.end();return}if(A==="POST"&&u==="/projects/delete"){let P=await ft(y),b=new URLSearchParams(P).get("projectId")?.trim()??"",k=H(),E=k===null?null:V({wsUrl:k.wsUrl,pairingToken:k.pairingToken});if(E===null||b.length===0){S.writeHead(303,{Location:"/projects?deleteError=1"}),S.end();return}let w=await Kk(E,b);S.writeHead(303,{Location:w.ok?"/projects?deleted=1":"/projects?deleteError=1"}),S.end();return}if(A==="GET"&&u==="/project"){let P=new URL(y.url??"/",`http://127.0.0.1:${43347}`),b=P.searchParams.get("id")?.trim()??"",k=o(),E=sr(k.installVersion),w=await GS(e.layout),x=Vt(w.projects,b);if(x===null){await p(S,"Project not found");return}let I=P.searchParams.get("linked")==="1"?P.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${P.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${P.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:P.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,j=P.searchParams.get("knowledgePromoted"),O=j!==null?`Marked ${j} lesson(s) as promoted in Agent Witch.`:null,$=P.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,B=P.searchParams.get("tab")?.trim()??"harness",Ce=B==="workflows"||B==="agents"||B==="knowledge"||B==="pitfalls"?B:"harness",F=P.searchParams.get("retired")==="1",nt=P.searchParams.get("edit")?.trim()||null,ko=cq(P.searchParams.get("pitfall")),wo=H(),lr=wo===null?null:V({wsUrl:wo.wsUrl,pairingToken:wo.pairingToken}),MP=lr===null?null:await nv(lr,x.id),Va=0;if(lr!==null)try{let _u=await fetch(`${lr.appOrigin}/api/agent-witch/projects/${encodeURIComponent(x.id)}/knowledge`,{method:"GET",headers:{[ae]:lr.pairingToken},signal:AbortSignal.timeout(1e4)});if(_u.ok){let Us=await _u.json();typeof Us=="object"&&Us!==null&&typeof Us.candidateCount=="number"&&(Va=Us.candidateCount)}}catch{Va=0}let jP=Ce!=="pitfalls"?void 0:await hD({store:qf({layout:e.layout,cloud:lr===null?null:Ec(lr)}),projectId:x.id,includeRetired:F});Ne(S,await n({title:x.name,activePath:"/projects",installVersion:k.installVersion,body:zo({project:x,cloudAppOrigin:E,installed:Ar(e.layout),linkedSetSlugs:Sr(x.projectFolderPath),composition:MP,knowledgeCandidateCount:Va,pitfalls:jP,pitfallsShowRetired:F,pitfallsEditId:nt,activeTab:Ce,flashMessage:I??O??ko?.message??null,flashError:$??ko?.error??null})}));return}if(A==="POST"&&u==="/projects/pull-bound-harness"){let P=await ft(y),b=await Ok({rawBody:P,layout:e.layout});if(b.kind==="not_found"){await p(S,"Project not found");return}if(b.kind==="redirect"){S.writeHead(303,{Location:b.location}),S.end();return}let k=o();Ne(S,await n({title:b.title,activePath:"/projects",installVersion:k.installVersion,body:b.body}));return}if(A==="POST"&&u==="/projects/link-harness"){let P=await ft(y),b=new URLSearchParams(P),k=b.get("projectId")?.trim()??"",E=await GS(e.layout),w=Vt(E.projects,k);if(w===null){await p(S,"Project not found");return}let x=b.getAll("applySet").map(Ce=>String(Ce)),I=mc({layout:e.layout,projectFolderPath:w.projectFolderPath,setSlugs:x});if(!I.ok){let Ce=o(),F=sr(Ce.installVersion);Ne(S,await n({title:w.name,activePath:"/projects",installVersion:Ce.installVersion,body:zo({project:w,cloudAppOrigin:F,installed:Ar(e.layout),linkedSetSlugs:Sr(w.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:I.errorMessage})}));return}let j=H(),O=j===null?null:V({wsUrl:j.wsUrl,pairingToken:j.pairingToken}),$=O===null?!1:await Gn(O,w.id,I.appliedSetSlugs),B=new URLSearchParams({linked:"1",files:String(I.writtenFileCount),bindingsSynced:$?"1":"0"});S.writeHead(303,{Location:`/project?id=${encodeURIComponent(w.id)}&${B.toString()}`}),S.end();return}if(A==="POST"&&u==="/projects/remove-harness-set"){let P=await ft(y),b=await Mk({rawBody:P,layout:e.layout});if(b.kind==="not_found"){await p(S,"Project not found");return}if(b.kind==="redirect"){S.writeHead(303,{Location:b.location}),S.end();return}let k=o();Ne(S,await n({title:b.title,activePath:"/projects",installVersion:k.installVersion,body:b.body}));return}if(A==="POST"&&u==="/project/knowledge/promote-all"){let P=await ft(y),k=new URLSearchParams(P).get("projectId")?.trim()??"",E=await GS(e.layout),w=Vt(E.projects,k);if(w===null){await p(S,"Project not found");return}let x=H(),I=x===null?null:V({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),j=I===null?{ok:!1,promotedCount:0}:await iq(I,w.id),O=new URLSearchParams({tab:"knowledge",...j.ok?{knowledgePromoted:String(j.promotedCount)}:{knowledgePromoteFailed:"1"}});S.writeHead(303,{Location:`/project?id=${encodeURIComponent(w.id)}&${O.toString()}`}),S.end();return}let T=Sf(u);if(A==="POST"&&T!==null){let P=await ft(y),b=await Hk({rawBody:P,action:T,layout:e.layout,createStore:k=>qf({layout:e.layout,cloud:Ec(k)})});if(b.kind==="not_found"){await p(S,"Project not found");return}S.writeHead(303,{Location:b.location}),S.end();return}if(A==="GET"&&u==="/harness"){let P=new URL(y.url??"/",`http://127.0.0.1:${43347}`),b=o(),k=hc(e.layout),E=P.searchParams.get("submitted")==="1",w=E?P.searchParams.get("syncFailed")==="1"?`Local harness updated (${P.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:P.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${P.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":P.searchParams.get("stopped")==="1"?`Reveal stopped. ${k?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:P.searchParams.get("revealed")==="1"?`Reveal found ${k?.sets.length??0} set(s).`:null,x=k?.scanRoots[0]??tf(),I=Rae(e.layout,{reveal:k,importQuery:P.searchParams.get("import")==="1",justSubmitted:E}),j=sr(b.installVersion);Ne(S,await n({title:"Harness",activePath:"/harness",installVersion:b.installVersion,body:bp(TI(e.layout,{cloudAppOrigin:j,reveal:k,scanFolder:x,flashMessage:w,importSectionExpanded:I}))}));return}if(A==="POST"&&u==="/api/harness/pick-folder"){let P=Uo();if(P===null){Ae(S,200,{cancelled:!0});return}Ae(S,200,{path:P});return}if(A==="GET"&&u==="/api/harness/file-content"){let b=new URL(y.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",k=uc(b);if(k===null){Ae(S,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let E=$p.default.readFileSync(k,"utf8"),w=E.length>UJ?`${E.slice(0,UJ)}
\u2026 (truncated)`:E;Ae(S,200,{content:w})}catch{Ae(S,500,{errorMessage:"Could not read file."})}return}if(A==="POST"&&u==="/api/harness/reveal/add-project"){let P=await ft(y),b="";try{let w=JSON.parse(P);typeof w=="object"&&w!==null&&typeof w.projectPath=="string"&&(b=w.projectPath.trim())}catch{Ae(S,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(b.length===0){Ae(S,400,{ok:!1,errorMessage:"projectPath is required."});return}let k=hc(e.layout),E=Z_({reveal:k,projectPath:b});if(E===null||E.sets.length===0){Ae(S,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}sf(e.layout,E),Ae(S,200,{ok:!0,setCount:E.sets.length});return}if(A==="GET"&&u==="/api/harness/reveal/stream"){let b=new URL(y.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(b.length===0){Ae(S,400,{errorMessage:"Choose a folder to scan first."});return}let k=!1;y.on("close",()=>{k=!0}),S.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...vI});let E=Q_({scanRoot:b,response:S,shouldAbort:()=>k});sf(e.layout,E),S.end();return}if(A==="POST"&&u==="/harness/reveal"){S.writeHead(410,{"Content-Type":"text/plain"}),S.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(A==="POST"&&u==="/harness/submit"){let P=hc(e.layout);if(P===null){let j=o(),O=sr(j.installVersion);Ne(S,await n({title:"Harness",activePath:"/harness",installVersion:j.installVersion,body:bp(TI(e.layout,{cloudAppOrigin:O,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let b=await ft(y),k=new URLSearchParams(b),E=ov(k,P),w=tk({layout:e.layout,sets:E});if(!w.ok){let j=o(),O=sr(j.installVersion);Ne(S,await n({title:"Harness",activePath:"/harness",installVersion:j.installVersion,body:bp(TI(e.layout,{cloudAppOrigin:O,reveal:P,flashError:w.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}ok(e.layout);let I=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";S.writeHead(303,{Location:`/harness?submitted=1&count=${w.writtenItemCount??0}${I}`}),S.end();return}if(A==="GET"&&u==="/writer-api"){let P=new URL(y.url??"/",`http://127.0.0.1:${43347}`),k=H()?.writerExecutionBackend??Xe(void 0),E=Ue(e.layout.configPath),w=xo(E),x=P.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,I=o();Ne(S,await n({title:"Writer API",activePath:"/writer-api",installVersion:I.installVersion,body:tv({writerExecutionBackend:k,secrets:w,flashMessage:x})}));return}if(A==="POST"&&u==="/writer-api"){let P=await ft(y),b=new URLSearchParams(P),k=b.get("writerExecutionBackend")?.trim()??"cli";l_({configPath:e.layout.configPath,writerExecutionBackend:Xe(k),anthropicApiKey:b.get("anthropicApiKey")??void 0,anthropicModel:b.get("anthropicModel")??void 0,openaiApiKey:b.get("openaiApiKey")??void 0,openaiModel:b.get("openaiModel")??void 0,googleApiKey:b.get("googleApiKey")??void 0,googleModel:b.get("googleModel")??void 0}),S.writeHead(303,{Location:"/writer-api?saved=1"}),S.end();return}if(A==="GET"&&u==="/estimates"){S.writeHead(302,{Location:"/history"}),S.end();return}if(A==="GET"&&u==="/history"){let P=o();Ne(S,await n({title:"History",activePath:"/history",installVersion:P.installVersion,body:FC({reportsDir:e.layout.reportsDir})}));return}if(A==="GET"&&u==="/knowledge"){let b=new URL(y.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",k=o(),E=VT({layout:e.layout}),w=JT(E),x=b.length>0?await Vi({layout:e.layout,query:b,limit:20}):Gi(e.layout).slice(-50).reverse(),I=x.map(O=>{let $=qT(E,O.id),B=$>0?` \xB7 used in ${$} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${be(O.createdAt)}">${be(CI(O.createdAt))}${O.source?` \xB7 ${be(O.source)}`:""}${B}</div><pre>${be(O.text)}</pre></article>`}).join(""),j=w.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${w.map(O=>`<li><strong>P${O.priority}</strong> \u2014 ${be(O.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Ne(S,await n({title:"Knowledge",activePath:"/knowledge",installVersion:k.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${be(b)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${Lae(b,x.length)}
            </section>${j}${I}`}));return}A==="POST"&&await ft(y),await p(S,"Not found")})().catch(u=>{console.error("[agent-witch-local-app]",u),S.writeHead(500),S.end("Internal error")})});f.on("error",y=>{if(y.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",y)});let h=mI();return f.on("close",()=>{h.stop()}),f.listen(43347,"127.0.0.1",()=>{try{Vf()}catch(y){let S=y instanceof Error?y.message:String(y);console.error(`[agent-witch] writeGlobalTriggers failed: ${S}`)}console.log(`[agent-witch] Local app ${zr}`)}),f},Bp=e=>BS(e).publicKeyRaw});var VS=l(()=>{"use strict";a$();l$();qJ()});var YJ={};Rt(YJ,{runAgentWitchExternalLiveCli:()=>Wae});var LI,JJ,xae,Wae,XJ=l(()=>{"use strict";LI=m(require("node:fs")),JJ=m(require("node:path"));Mn();G();ie();VS();ie();xae=e=>{let t=JJ.default.join(e,"link-code.txt");if(!LI.default.existsSync(t))return null;let r=LI.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},Wae=()=>{ht("agent-witch-live");let e=C(),t=M(),r=xae(e),o=Bp(t);Up({layout:t,controllers:{getStatus:()=>{let n=ve(t);return{wsConnected:$l(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{kn(e)}}})}});var yo=R((jYe,e4)=>{"use strict";var ZJ=["nodebuffer","arraybuffer","fragments"],QJ=typeof Blob<"u";QJ&&ZJ.push("blob");e4.exports={BINARY_TYPES:ZJ,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:QJ,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Gp=R((NYe,KS)=>{"use strict";var{EMPTY_BUFFER:Oae}=yo(),II=Buffer[Symbol.species];function Mae(e,t){if(e.length===0)return Oae;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new II(r.buffer,r.byteOffset,o):r}function t4(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function r4(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function jae(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function xI(e){if(xI.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new II(e):ArrayBuffer.isView(e)?t=new II(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),xI.readOnly=!1),t}KS.exports={concat:Mae,mask:t4,toArrayBuffer:jae,toBuffer:xI,unmask:r4};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");KS.exports.mask=function(t,r,o,n,s){s<48?t4(t,r,o,n,s):e.mask(t,r,o,n,s)},KS.exports.unmask=function(t,r){t.length<32?r4(t,r):e.unmask(t,r)}}catch{}});var s4=R((DYe,n4)=>{"use strict";var o4=Symbol("kDone"),WI=Symbol("kRun"),OI=class{constructor(t){this[o4]=()=>{this.pending--,this[WI]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[WI]()}[WI](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[o4])}}};n4.exports=OI});var xa=R((HYe,c4)=>{"use strict";var Vp=require("zlib"),i4=Gp(),Nae=s4(),{kStatusCode:a4}=yo(),Dae=Buffer[Symbol.species],Hae=Buffer.from([0,0,255,255]),JS=Symbol("permessage-deflate"),ho=Symbol("total-length"),La=Symbol("callback"),ln=Symbol("buffers"),Ia=Symbol("error"),qS,MI=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!qS){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;qS=new Nae(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[La];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){qS.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){qS.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Vp.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Vp.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[JS]=this,this._inflate[ho]=0,this._inflate[ln]=[],this._inflate.on("error",zae),this._inflate.on("data",l4)}this._inflate[La]=o,this._inflate.write(t),r&&this._inflate.write(Hae),this._inflate.flush(()=>{let s=this._inflate[Ia];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=i4.concat(this._inflate[ln],this._inflate[ho]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[ho]=0,this._inflate[ln]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Vp.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Vp.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[ho]=0,this._deflate[ln]=[],this._deflate.on("data",Fae)}this._deflate[La]=o,this._deflate.write(t),this._deflate.flush(Vp.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=i4.concat(this._deflate[ln],this._deflate[ho]);r&&(s=new Dae(s.buffer,s.byteOffset,s.length-4)),this._deflate[La]=null,this._deflate[ho]=0,this._deflate[ln]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};c4.exports=MI;function Fae(e){this[ln].push(e),this[ho]+=e.length}function l4(e){if(this[ho]+=e.length,this[JS]._maxPayload<1||this[ho]<=this[JS]._maxPayload){this[ln].push(e);return}this[Ia]=new RangeError("Max payload size exceeded"),this[Ia].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Ia][a4]=1009,this.removeListener("data",l4),this.reset()}function zae(e){if(this[JS]._inflate=null,this[Ia]){this[La](this[Ia]);return}e[a4]=1007,this[La](e)}});var Wa=R((FYe,YS)=>{"use strict";var{isUtf8:d4}=require("buffer"),{hasBlob:$ae}=yo(),Uae=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function Bae(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function jI(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function Gae(e){return $ae&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}YS.exports={isBlob:Gae,isValidStatusCode:Bae,isValidUTF8:jI,tokenChars:Uae};if(d4)YS.exports.isValidUTF8=function(e){return e.length<24?jI(e):d4(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");YS.exports.isValidUTF8=function(t){return t.length<32?jI(t):e(t)}}catch{}});var zI=R((zYe,h4)=>{"use strict";var{Writable:Vae}=require("stream"),p4=xa(),{BINARY_TYPES:Kae,EMPTY_BUFFER:u4,kStatusCode:qae,kWebSocket:Jae}=yo(),{concat:NI,toArrayBuffer:Yae,unmask:Xae}=Gp(),{isValidStatusCode:Zae,isValidUTF8:m4}=Wa(),XS=Buffer[Symbol.species],Nt=0,g4=1,f4=2,y4=3,DI=4,HI=5,ZS=6,FI=class extends Vae{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||Kae[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[Jae]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Nt}_write(t,r,o){if(this._opcode===8&&this._state==Nt)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new XS(o.buffer,o.byteOffset+t,o.length-t),new XS(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new XS(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case Nt:this.getInfo(t);break;case g4:this.getPayloadLength16(t);break;case f4:this.getPayloadLength64(t);break;case y4:this.getMask();break;case DI:this.getData(t);break;case HI:case ZS:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[p4.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=g4:this._payloadLength===127?this._state=f4:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=y4:this._state=DI}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=DI}getData(t){let r=u4;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&Xae(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=HI,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[p4.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===Nt&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=Nt;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=NI(o,r):this._binaryType==="arraybuffer"?n=Yae(NI(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=Nt):(this._state=ZS,setImmediate(()=>{this.emit("message",n,!0),this._state=Nt,this.startLoop(t)}))}else{let n=NI(o,r);if(!this._skipUTF8Validation&&!m4(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===HI||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=Nt):(this._state=ZS,setImmediate(()=>{this.emit("message",n,!1),this._state=Nt,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,u4),this.end();else{let o=t.readUInt16BE(0);if(!Zae(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new XS(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!m4(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=Nt;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=Nt):(this._state=ZS,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=Nt,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[qae]=n,i}};h4.exports=FI});var BI=R((UYe,A4)=>{"use strict";var{Duplex:$Ye}=require("stream"),{randomFillSync:Qae}=require("crypto"),{types:{isUint8Array:ele}}=require("util"),S4=xa(),{EMPTY_BUFFER:tle,kWebSocket:rle,NOOP:ole}=yo(),{isBlob:Oa,isValidStatusCode:nle}=Wa(),{mask:P4,toBuffer:Os}=Gp(),Dt=Symbol("kByteLength"),sle=Buffer.alloc(4),QS=8*1024,Ms,Ma=QS,ar=0,ile=1,ale=2,$I=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=ar,this.onerror=ole,this[rle]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||sle,r.generateMask?r.generateMask(o):(Ma===QS&&(Ms===void 0&&(Ms=Buffer.alloc(QS)),Qae(Ms,0,QS),Ma=0),o[0]=Ms[Ma++],o[1]=Ms[Ma++],o[2]=Ms[Ma++],o[3]=Ms[Ma++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[Dt]!==void 0?a=r[Dt]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(P4(t,o,d,s,a),[d]):(P4(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=tle;else{if(typeof t!="number"||!nle(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(ele(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[Dt]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==ar?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Oa(t)?(n=t.size,s=!1):(t=Os(t),n=t.length,s=Os.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Dt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Oa(t)?this._state!==ar?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==ar?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Oa(t)?(n=t.size,s=!1):(t=Os(t),n=t.length,s=Os.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Dt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Oa(t)?this._state!==ar?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==ar?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[S4.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Oa(t)?(a=t.size,c=!1):(t=Os(t),a=t.length,c=Os.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[Dt]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Oa(t)?this._state!==ar?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==ar?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[Dt],this._state=ale,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(UI,this,a,n);return}this._bufferedBytes-=o[Dt];let i=Os(s);r?this.dispatch(i,r,o,n):(this._state=ar,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(lle,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[S4.extensionName];this._bufferedBytes+=o[Dt],this._state=ile,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");UI(this,c,n);return}this._bufferedBytes-=o[Dt],this._state=ar,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===ar&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][Dt],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][Dt],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};A4.exports=$I;function UI(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function lle(e,t,r){UI(e,t,r),e.onerror(t)}});var v4=R((BYe,C4)=>{"use strict";var{kForOnEventAttribute:Kp,kListener:GI}=yo(),b4=Symbol("kCode"),_4=Symbol("kData"),k4=Symbol("kError"),w4=Symbol("kMessage"),T4=Symbol("kReason"),ja=Symbol("kTarget"),E4=Symbol("kType"),R4=Symbol("kWasClean"),So=class{constructor(t){this[ja]=null,this[E4]=t}get target(){return this[ja]}get type(){return this[E4]}};Object.defineProperty(So.prototype,"target",{enumerable:!0});Object.defineProperty(So.prototype,"type",{enumerable:!0});var js=class extends So{constructor(t,r={}){super(t),this[b4]=r.code===void 0?0:r.code,this[T4]=r.reason===void 0?"":r.reason,this[R4]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[b4]}get reason(){return this[T4]}get wasClean(){return this[R4]}};Object.defineProperty(js.prototype,"code",{enumerable:!0});Object.defineProperty(js.prototype,"reason",{enumerable:!0});Object.defineProperty(js.prototype,"wasClean",{enumerable:!0});var Na=class extends So{constructor(t,r={}){super(t),this[k4]=r.error===void 0?null:r.error,this[w4]=r.message===void 0?"":r.message}get error(){return this[k4]}get message(){return this[w4]}};Object.defineProperty(Na.prototype,"error",{enumerable:!0});Object.defineProperty(Na.prototype,"message",{enumerable:!0});var qp=class extends So{constructor(t,r={}){super(t),this[_4]=r.data===void 0?null:r.data}get data(){return this[_4]}};Object.defineProperty(qp.prototype,"data",{enumerable:!0});var cle={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[Kp]&&n[GI]===t&&!n[Kp])return;let o;if(e==="message")o=function(s,i){let a=new qp("message",{data:i?s:s.toString()});a[ja]=this,eP(t,this,a)};else if(e==="close")o=function(s,i){let a=new js("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[ja]=this,eP(t,this,a)};else if(e==="error")o=function(s){let i=new Na("error",{error:s,message:s.message});i[ja]=this,eP(t,this,i)};else if(e==="open")o=function(){let s=new So("open");s[ja]=this,eP(t,this,s)};else return;o[Kp]=!!r[Kp],o[GI]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[GI]===t&&!r[Kp]){this.removeListener(e,r);break}}};C4.exports={CloseEvent:js,ErrorEvent:Na,Event:So,EventTarget:cle,MessageEvent:qp};function eP(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var tP=R((GYe,L4)=>{"use strict";var{tokenChars:Jp}=Wa();function Mr(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function dle(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(p===-1&&Jp[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);d===44?(Mr(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(p===-1&&Jp[d]===1)c===-1&&(c=g);else if(d===32||d===9)p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g),Mr(r,e.slice(c,p),!0),d===44&&(Mr(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,g),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(n){if(Jp[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:o||(o=!0),n=!1}else if(s)if(Jp[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,p=g;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(p===-1&&Jp[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))p===-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);o&&(h=h.replace(/\\/g,""),o=!1),Mr(r,a,h),d===44&&(Mr(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=g);let f=e.slice(c,p);return i===void 0?Mr(t,f,r):(a===void 0?Mr(r,f,!0):o?Mr(r,a,f.replace(/\\/g,"")):Mr(r,a,f),Mr(t,i,r)),t}function ple(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}L4.exports={format:ple,parse:dle}});var sP=R((qYe,$4)=>{"use strict";var ule=require("events"),mle=require("https"),gle=require("http"),W4=require("net"),fle=require("tls"),{randomBytes:yle,createHash:hle}=require("crypto"),{Duplex:VYe,Readable:KYe}=require("stream"),{URL:VI}=require("url"),cn=xa(),Sle=zI(),Ple=BI(),{isBlob:Ale}=Wa(),{BINARY_TYPES:I4,CLOSE_TIMEOUT:ble,EMPTY_BUFFER:rP,GUID:_le,kForOnEventAttribute:KI,kListener:kle,kStatusCode:wle,kWebSocket:De,NOOP:O4}=yo(),{EventTarget:{addEventListener:Tle,removeEventListener:Ele}}=v4(),{format:Rle,parse:Cle}=tP(),{toBuffer:vle}=Gp(),M4=Symbol("kAborted"),qI=[8,13],Po=["CONNECTING","OPEN","CLOSING","CLOSED"],Lle=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,se=class e extends ule{constructor(t,r,o){super(),this._binaryType=I4[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=rP,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),j4(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){I4.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new Sle({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new Ple(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[De]=this,s[De]=this,t[De]=this,n.on("conclude",Wle),n.on("drain",Ole),n.on("error",Mle),n.on("message",jle),n.on("ping",Nle),n.on("pong",Dle),s.onerror=Hle,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",H4),t.on("data",nP),t.on("end",F4),t.on("error",z4),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[cn.extensionName]&&this._extensions[cn.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Et(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,D4(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){JI(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||rP,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){JI(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||rP,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){JI(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[cn.extensionName]||(n.compress=!1),this._sender.send(t||rP,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Et(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(se,"CONNECTING",{enumerable:!0,value:Po.indexOf("CONNECTING")});Object.defineProperty(se.prototype,"CONNECTING",{enumerable:!0,value:Po.indexOf("CONNECTING")});Object.defineProperty(se,"OPEN",{enumerable:!0,value:Po.indexOf("OPEN")});Object.defineProperty(se.prototype,"OPEN",{enumerable:!0,value:Po.indexOf("OPEN")});Object.defineProperty(se,"CLOSING",{enumerable:!0,value:Po.indexOf("CLOSING")});Object.defineProperty(se.prototype,"CLOSING",{enumerable:!0,value:Po.indexOf("CLOSING")});Object.defineProperty(se,"CLOSED",{enumerable:!0,value:Po.indexOf("CLOSED")});Object.defineProperty(se.prototype,"CLOSED",{enumerable:!0,value:Po.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(se.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(se.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[KI])return t[kle];return null},set(t){for(let r of this.listeners(e))if(r[KI]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[KI]:!0})}})});se.prototype.addEventListener=Tle;se.prototype.removeEventListener=Ele;$4.exports=se;function j4(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:ble,protocolVersion:qI[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!qI.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${qI.join(", ")})`);let s;if(t instanceof VI)s=t;else try{s=new VI(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let S=new SyntaxError(c);if(e._redirects===0)throw S;oP(e,S);return}let d=i?443:80,p=yle(16).toString("base64"),g=i?mle.request:gle.request,f=new Set,h;if(n.createConnection=n.createConnection||(i?xle:Ile),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new cn({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=Rle({[cn.extensionName]:h.offer()})),r.length){for(let S of r){if(typeof S!="string"||!Lle.test(S)||f.has(S))throw new SyntaxError("An invalid or duplicated subprotocol was specified");f.add(S)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let S=n.path.split(":");n.socketPath=S[0],n.path=S[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let S=o&&o.headers;if(o={...o,headers:{}},S)for(let[u,A]of Object.entries(S))o.headers[u.toLowerCase()]=A}else if(e.listenerCount("redirect")===0){let S=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!S||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,S||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=g(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=g(n);n.timeout&&y.on("timeout",()=>{Et(e,y,"Opening handshake has timed out")}),y.on("error",S=>{y===null||y[M4]||(y=e._req=null,oP(e,S))}),y.on("response",S=>{let u=S.headers.location,A=S.statusCode;if(u&&n.followRedirects&&A>=300&&A<400){if(++e._redirects>n.maxRedirects){Et(e,y,"Maximum redirects exceeded");return}y.abort();let T;try{T=new VI(u,t)}catch{let b=new SyntaxError(`Invalid URL: ${u}`);oP(e,b);return}j4(e,T,r,o)}else e.emit("unexpected-response",y,S)||Et(e,y,`Unexpected server response: ${S.statusCode}`)}),y.on("upgrade",(S,u,A)=>{if(e.emit("upgrade",S),e.readyState!==se.CONNECTING)return;y=e._req=null;let T=S.headers.upgrade;if(T===void 0||T.toLowerCase()!=="websocket"){Et(e,u,"Invalid Upgrade header");return}let P=hle("sha1").update(p+_le).digest("base64");if(S.headers["sec-websocket-accept"]!==P){Et(e,u,"Invalid Sec-WebSocket-Accept header");return}let b=S.headers["sec-websocket-protocol"],k;if(b!==void 0?f.size?f.has(b)||(k="Server sent an invalid subprotocol"):k="Server sent a subprotocol but none was requested":f.size&&(k="Server sent no subprotocol"),k){Et(e,u,k);return}b&&(e._protocol=b);let E=S.headers["sec-websocket-extensions"];if(E!==void 0){if(!h){Et(e,u,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let w;try{w=Cle(E)}catch{Et(e,u,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(w);if(x.length!==1||x[0]!==cn.extensionName){Et(e,u,"Server indicated an extension that was not requested");return}try{h.accept(w[cn.extensionName])}catch{Et(e,u,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[cn.extensionName]=h}e.setSocket(u,A,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function oP(e,t){e._readyState=se.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function Ile(e){return e.path=e.socketPath,W4.connect(e)}function xle(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=W4.isIP(e.host)?"":e.host),fle.connect(e)}function Et(e,t,r){e._readyState=se.CLOSING;let o=new Error(r);Error.captureStackTrace(o,Et),t.setHeader?(t[M4]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(oP,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function JI(e,t,r){if(t){let o=Ale(t)?t.size:vle(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${Po[e.readyState]})`);process.nextTick(r,o)}}function Wle(e,t){let r=this[De];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[De]!==void 0&&(r._socket.removeListener("data",nP),process.nextTick(N4,r._socket),e===1005?r.close():r.close(e,t))}function Ole(){let e=this[De];e.isPaused||e._socket.resume()}function Mle(e){let t=this[De];t._socket[De]!==void 0&&(t._socket.removeListener("data",nP),process.nextTick(N4,t._socket),t.close(e[wle])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function x4(){this[De].emitClose()}function jle(e,t){this[De].emit("message",e,t)}function Nle(e){let t=this[De];t._autoPong&&t.pong(e,!this._isServer,O4),t.emit("ping",e)}function Dle(e){this[De].emit("pong",e)}function N4(e){e.resume()}function Hle(e){let t=this[De];t.readyState!==se.CLOSED&&(t.readyState===se.OPEN&&(t._readyState=se.CLOSING,D4(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function D4(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function H4(){let e=this[De];if(this.removeListener("close",H4),this.removeListener("data",nP),this.removeListener("end",F4),e._readyState=se.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[De]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",x4),e._receiver.on("finish",x4))}function nP(e){this[De]._receiver.write(e)||this.pause()}function F4(){let e=this[De];e._readyState=se.CLOSING,e._receiver.end(),this.end()}function z4(){let e=this[De];this.removeListener("error",z4),this.on("error",O4),e&&(e._readyState=se.CLOSING,this.destroy())}});var V4=R((YYe,G4)=>{"use strict";var JYe=sP(),{Duplex:Fle}=require("stream");function U4(e){e.emit("close")}function zle(){!this.destroyed&&this._writableState.finished&&this.destroy()}function B4(e){this.removeListener("error",B4),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function $le(e,t){let r=!0,o=new Fle({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(U4,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(U4,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",zle),o.on("error",B4),o}G4.exports=$le});var YI=R((XYe,K4)=>{"use strict";var{tokenChars:Ule}=Wa();function Ble(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&Ule[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}K4.exports={parse:Ble}});var e8=R((QYe,Q4)=>{"use strict";var Gle=require("events"),iP=require("http"),{Duplex:ZYe}=require("stream"),{createHash:Vle}=require("crypto"),q4=tP(),Ns=xa(),Kle=YI(),qle=sP(),{CLOSE_TIMEOUT:Jle,GUID:Yle,kWebSocket:Xle}=yo(),Zle=/^[+/0-9A-Za-z]{22}==$/,J4=0,Y4=1,Z4=2,XI=class extends Gle{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:Jle,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:qle,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=iP.createServer((o,n)=>{let s=iP.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=Qle(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=J4}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===Z4){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Yp,this);return}if(t&&this.once("close",t),this._state!==Y4)if(this._state=Y4,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Yp,this):process.nextTick(Yp,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Yp(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",X4);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Ds(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Ds(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!Zle.test(s)){Ds(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Ds(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Xp(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=Kle.parse(c)}catch{Ds(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&p!==void 0){let f=new Ns({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=q4.parse(p);h[Ns.extensionName]&&(f.accept(h[Ns.extensionName]),g[Ns.extensionName]=f)}catch{Ds(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let f={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(f,(h,y,S,u)=>{if(!h)return Xp(r,y||401,S,u);this.completeUpgrade(g,s,d,t,r,o,n)});return}if(!this.options.verifyClient(f))return Xp(r,401)}this.completeUpgrade(g,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[Xle])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>J4)return Xp(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${Vle("sha1").update(r+Yle).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let g=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),p._protocol=g)}if(t[Ns.extensionName]){let g=t[Ns.extensionName].params,f=q4.format({[Ns.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${f}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",X4),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Yp,this)})),a(p,n)}};Q4.exports=XI;function Qle(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function Yp(e){e._state=Z4,e.emit("close")}function X4(){this.destroy()}function Xp(e,t,r,o){r=r||iP.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${iP.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Ds(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Ds),e.emit("wsClientError",i,r,t)}else Xp(r,o,n,s)}});var ece,tce,rce,oce,nce,sce,t8,ice,Zp,r8=l(()=>{ece=m(V4(),1),tce=m(tP(),1),rce=m(xa(),1),oce=m(zI(),1),nce=m(BI(),1),sce=m(YI(),1),t8=m(sP(),1),ice=m(e8(),1),Zp=t8.default});var ZI,o8=l(()=>{"use strict";ZI=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var ace,QI,n8=l(()=>{"use strict";Qm();o8();ace=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",QI=(e={})=>{let t=e.env??process.env,r=ZI(t[Xm]),o=ZI(t[Zm]);return{mode:ace(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var s8=l(()=>{"use strict";Qm()});var i8=l(()=>{"use strict";n8();s8()});var ex=l(()=>{"use strict"});var Ao,Qp=l(()=>{"use strict";Ao=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Da,Hs,a8,cce,tx,rx,l8,c8,ox,d8,eu,nx=l(()=>{"use strict";Da=m(require("node:fs")),Hs=m(require("node:os")),a8=m(require("node:path"));ex();Qp();cce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),tx=(e=Hs.default.hostname())=>a8.default.join(Hs.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),rx=e=>{if(!Da.default.existsSync(e))return null;try{let t=JSON.parse(Da.default.readFileSync(e,"utf8"));return!cce(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},l8=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},c8=(e,t)=>{Da.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},ox=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??tx(),o=rx(r);if(o!==null&&o.pid!==process.pid&&Ao(o.pid)&&l8(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Hs.default.hostname(),macOsUsername:Hs.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return c8(r,n),{ok:!0}},d8=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??tx(),o=rx(r);return o!==null&&o.pid!==process.pid&&Ao(o.pid)&&l8(o)?{ok:!1}:(c8(r,{hostname:Hs.default.hostname(),macOsUsername:Hs.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},eu=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??tx();rx(r)?.pid===process.pid&&Da.default.existsSync(r)&&Da.default.unlinkSync(r)}});var sx,tu,dce,pce,uce,mce,ix,p8=l(()=>{"use strict";sx=require("node:child_process"),tu=m(require("node:path"));Qp();Bm();dce=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),pce=(e,t)=>{if(dce(e)||!/\bnode\b/.test(e))return!1;let r=tu.default.resolve(t),o=tu.default.join(r,"app",Sl),n=tu.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Sl||i==="agent-witch.ts")return e.includes(r);try{let a=tu.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},uce=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,sx.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},mce=(e,t,r)=>{let o=uce(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||pce(d,t)&&n.push(c)}return n},ix=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,sx.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=mce(r,e.installDir,t),n=[];for(let s of o)if(Ao(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var ru,ou,u8,gce,ax,m8=l(()=>{"use strict";ru=m(require("node:fs")),ou=m(require("node:path"));Je();u8=(e,t)=>{!ru.default.existsSync(e)||ru.default.existsSync(t)||(ru.default.mkdirSync(ou.default.dirname(t),{recursive:!0}),ru.default.renameSync(e,t))},gce=e=>{if(e.profileEmail===null)return;let t=ou.default.join(e.installDir,Ft);u8(ou.default.join(t,gn),e.mainLogPath),u8(ou.default.join(t,fn),e.errorLogPath)},ax=e=>{let t=M();e!==void 0&&t.installDir!==e||gce(t)}});var g8=l(()=>{"use strict";Xc();fy();fy();!St()&&Rn(__agentWitchImportMetaUrl)&&(async()=>{ht("agent-witch-wake-server");let e=await es(),t=Fr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var f8=l(()=>{"use strict";g8()});var y8=l(()=>{"use strict";Fc()});var lx,h8=l(()=>{"use strict";ex();f8();nx();y8();lx=async(e={})=>{let t=e.skipInProcessBridge?null:await gy();Yf();let r=setInterval(()=>{Yf()},6e4),o=setInterval(()=>{if(!d8().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var nu,aP,hce,S8,P8,lP,A8,b8,cx,_8,cP,k8=l(()=>{"use strict";nu=m(require("node:fs")),aP=m(require("node:path")),hce="pending-run-inputs.json",S8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),P8=e=>{let t=e.profileEmail?aP.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return aP.default.join(t,hce)},lP=e=>{let t=P8(e);if(!nu.default.existsSync(t))return{};try{let r=JSON.parse(nu.default.readFileSync(t,"utf8"));return S8(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!S8(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},A8=(e,t)=>{let r=P8(e);nu.default.mkdirSync(aP.default.dirname(r),{recursive:!0}),nu.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},b8=e=>Object.values(lP(e)),cx=(e,t)=>lP(e)[t]!==void 0,_8=(e,t)=>{let r=lP(e);r[t.agentRunId]=t,A8(e,r)},cP=(e,t)=>{let r=lP(e);delete r[t],A8(e,r)}});var dP=l(()=>{"use strict";ee()});var w8=l(()=>{"use strict";ee()});var pP=l(()=>{"use strict";ee()});var uP=l(()=>{"use strict";ee()});var su=l(()=>{"use strict";ee()});var Sce,Pce,iu,dx=l(()=>{"use strict";Ut();dP();w8();pP();uP();su();Sce={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},Pce={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},iu=e=>{if(!_e(e.writerAgent))return"the selected writer";let t=At(e.writerAgent);if(Xe(e.writerExecutionBackend)==="api"&&t!==null){let r=lt(Ue(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Vl(t,r.model);return`${Pce[t]} model ${o}`}}return Sce[e.writerAgent]}});var Ace,bce,T8,E8,R8=l(()=>{"use strict";Ace=/"input_tokens"\s*:\s*(\d+)/,bce=/"output_tokens"\s*:\s*(\d+)/,T8=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},E8=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=T8(Ace.exec(t)),o=T8(bce.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var mP=l(()=>{"use strict";qt()});var au,gP,_ce,px,C8,v8,L8,ux,I8=l(()=>{"use strict";au=m(require("node:fs")),gP=m(require("node:path"));mP();_ce="run-completion-outbox.json",px=e=>{let t=e.profileEmail?gP.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return gP.default.join(t,_ce)},C8=e=>{let t=px(e);if(!au.default.existsSync(t))return[];try{let r=JSON.parse(au.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},v8=(e,t)=>{au.default.mkdirSync(gP.default.dirname(px(e)),{recursive:!0}),au.default.writeFileSync(px(e),JSON.stringify(t,null,2),"utf8")},L8=(e,t)=>{let r=[...C8(e).filter(o=>o.runId!==t.runId),t];v8(e,r)},ux=async e=>{if(e.cloudApi===null)return;let t=C8(e.layout);if(t.length===0)return;let r=[];for(let o of t)await _c(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);v8(e.layout,r)}});var x8=l(()=>{"use strict"});var mx,lu,wce,Fs,W8=l(()=>{"use strict";x8();mx=new Map,lu=e=>{let t=mx.get(e);t!==void 0&&(clearInterval(t),mx.delete(e))},wce=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},Fs=(e,t,r,o={})=>{lu(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){lu(t);return}let i=o.onTick?.()??{};wce(e,t,n,i)};s(),mx.set(t,setInterval(s,15e3))}});var O8=l(()=>{"use strict";qt()});var M8,j8=l(()=>{"use strict";O8();M8=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Ze(t)}});var gx,cu,bo,fx,jr,N8,fP=l(()=>{"use strict";gx=new Set,cu=new Map,bo=(e,t)=>{if(t.length===0)return;let r=cu.get(e)??[];r.push(t),cu.set(e,r)},fx=e=>{gx.add(e);let t=cu.get(e)??[];return cu.delete(e),t},jr=e=>gx.has(e),N8=e=>{gx.delete(e),cu.delete(e)}});var Ha,D8,H8,F8=l(()=>{"use strict";Ha=m(require("node:path")),D8=require("node:url");En();H8=()=>{if(St()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Ha.default.dirname(Ha.default.resolve(e)):Ha.default.dirname(Ha.default.resolve(__filename))}return Ha.default.dirname((0,D8.fileURLToPath)(__agentWitchImportMetaUrl))}});var z8,$8,U8,B8,yt,Fa,G8,V8,za,yx,hx,Sx,K8,Px,q8,yP=l(()=>{"use strict";z8=require("node:crypto"),$8=m(require("node:fs")),U8=m(require("node:path")),B8=require("node:url");Qp();En();F8();yt=new Map,G8=async()=>{if(Fa!==void 0)return Fa;try{if(St()){let e=H8(),t=U8.default.join(e,"deps","node-pty","lib","index.js");if($8.default.existsSync(t)){let r=await import((0,B8.pathToFileURL)(t).href);return Fa=r,r}}return Fa=await import("node-pty"),Fa}catch{return Fa=null,null}},V8=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},za=(e,t,r)=>{let o=yt.get(e);if(o!==void 0){yt.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},yx=(e,t)=>{let r=yt.get(e);return r===void 0?!1:(r.pty.write(t),!0)},hx=(e,t,r)=>{let o=yt.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},Sx=e=>{for(let t of yt.values())if(!(t.mode!=="agent"||t.runId!==e))return Ao(t.pty.pid);return!1},K8=e=>{for(let[t,r]of yt.entries())if(!(r.mode!=="agent"||r.runId!==e)){yt.delete(t);try{r.pty.kill()}catch{}return!0}return!1},Px=async e=>{let t=await G8();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;yt.get(e.shellSessionId)!==void 0&&za(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return yt.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{V8(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{yt.get(e.shellSessionId)?.pty===n&&(yt.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},q8=async e=>{let t=e.shellSessionId??(0,z8.randomUUID)(),r=await G8();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return yt.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{V8(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{yt.get(t)?.pty===o&&(yt.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var hP,J8,Y8=l(()=>{"use strict";hP="[[AWAITING_INPUT]]",J8=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",hP,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var du,X8,SP=l(()=>{"use strict";Y8();du=e=>{let t=e.indexOf(hP);if(t<0)return null;let o=e.slice(t+hP.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},X8=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",J8].join(`
`)});var Z8,Q8=l(()=>{"use strict";fP();yP();SP();Z8=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(jr(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}bo(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await q8({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=du(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var t3,r3,o3,e3,_o,PP=l(()=>{"use strict";t3=require("node:child_process"),r3=m(require("node:fs")),o3=m(require("node:path"));Bm();e3=12e4,_o=(e,t)=>{let r=o3.default.join(e,"app",$O,"ensure-writer.sh");return r3.default.existsSync(r)?new Promise((o,n)=>{let s=(0,t3.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},a=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String(e3/1e3)}s`))},e3);s.on("error",c=>{clearTimeout(a),n(c)}),s.on("close",c=>{if(clearTimeout(a),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var n3,zs,uu,AP,Ax,pu,bP,_P,bx,_x,Tce,$a,Ece,Rce,kx,wx=l(()=>{"use strict";n3=require("node:child_process");Ut();PP();pP();dP();su();uP();zs=new Map,uu=e=>e==="cursor"||e==="antigravity",AP=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",Ax=e=>zs.get(e)?.warmed===!0,pu=e=>{let t=zs.get(e);zs.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},bP=e=>zs.get(e)?.conversationStarted===!0,_P=e=>{let t=zs.get(e);zs.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},bx=e=>{zs.delete(e)},_x=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",Tce={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},$a=e=>`${Tce[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,Ece=(e,t,r,o)=>new Promise(n=>{let s=gg(t,r),i=[],a=(0,n3.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),Rce=(e,t)=>{let r=$a(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},kx=async e=>{if(!_e(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Xe(e.runConfig.writerExecutionBackend)==="api"){let r=At(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Ue(e.runConfig.layout.configPath);return lt(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),pu(e.writerAgent),{exitCode:0,output:$a(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await _o(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}uu(e.writerAgent)&&pu(e.writerAgent);let t=await Ece(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?Rce(e.writerAgent,t.output):$a(e.writerAgent)}}});var $s,Tx=l(()=>{"use strict";$s={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var s3,Cce,vce,i3,Lce,Ex,a3=l(()=>{"use strict";Tx();s3=/you(?:'|')ve hit your session limit/i,Cce=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],vce=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,i3=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},Lce=e=>{let t=vce.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},Ex=e=>{let t=e.trim();if(t.length===0)return null;if(s3.test(t))return{code:$s.SESSION_LIMIT,resetHint:Lce(t),matchedLine:i3(t,s3)};for(let r of Cce)if(r.test(t))return{code:$s.PROVIDER_QUOTA,resetHint:null,matchedLine:i3(t,r)};return null}});var kP,wP,Rx,Cx=l(()=>{"use strict";kP="[[AGENT_RUN_WRITER_EXECUTION]]",wP="cli-writer-api-key-missing",Rx="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var vx=l(()=>{"use strict";Cx()});var l3=l(()=>{"use strict";vx()});var TP=l(()=>{"use strict";Tx();a3();Cx();vx();l3()});var EP,c3=l(()=>{"use strict";EP={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var d3,p3=l(()=>{"use strict";d3="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var u3,m3=l(()=>{"use strict";TP();p3();u3=e=>e.code===$s.SESSION_LIMIT?d3:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var g3,f3=l(()=>{"use strict";TP();c3();m3();g3=e=>{let t=Ex(e.output);return t!==null?{status:EP.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:u3(t)}:{status:e.exitCode===0?EP.COMPLETED:EP.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var Lx,i9e,y3=l(()=>{"use strict";Lx={OPEN:"open",APPROVAL:"approval"},i9e=Lx.APPROVAL});var Ua,RP,h3,Wce,S3,P3,A3,mu,Ix,xx=l(()=>{"use strict";Ua=m(require("node:fs")),RP=m(require("node:path")),h3="runs",Wce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),S3=e=>{let t=e.profileEmail!==null?RP.default.join(e.installDir,"profiles",e.profileEmail,h3):RP.default.join(e.installDir,h3);return Ua.default.mkdirSync(t,{recursive:!0}),t},P3=(e,t)=>RP.default.join(S3(e),`${t}.json`),A3=(e,t)=>{Ua.default.writeFileSync(P3(e,t.id),JSON.stringify(t,null,2))},mu=(e,t)=>{let r=P3(e,t);if(!Ua.default.existsSync(r))return null;try{let o=JSON.parse(Ua.default.readFileSync(r,"utf8"));return!Wce(o)||typeof o.id!="string"?null:o}catch{return null}},Ix=e=>{let t=S3(e),r=Ua.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=mu(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var Oce,b3,_3=l(()=>{"use strict";f3();y3();xx();Oce=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=g3({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:Lx.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},b3=(e,t)=>{let r=Oce(t);return A3(e,r),r}});var k3=l(()=>{"use strict";pS()});var w3,T3=l(()=>{"use strict";TP();w3=()=>[kP,`agentRunWriterExecutionBackend=${wP}`,`agentRunWriterExecutionReasonCode=${Rx}`].join(`
`)});var dn,CP=l(()=>{"use strict";dn=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Wx,Mce,jce,E3,R3=l(()=>{"use strict";Wx=e=>e.toLocaleString("en-US"),Mce=e=>e<.01?e.toFixed(4):e.toFixed(3),jce=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${Mce(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Wx(e.inputTokens)} in / ${Wx(e.outputTokens)} out (${Wx(e.totalTokens)} total)`,t].join(`
`)},E3=(e,t)=>{if(t===void 0)return e;let r=jce(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var C3=l(()=>{"use strict";ee()});var L3,gu,Le,Ox,vP,v3,Nce,Dce,I3,x3,W3,fu,Mx,jx,Nx,O3,Hce,Ht,yu,pn,M3,Fce,zce,LP,Dx,Hx,Fx,j3=l(()=>{"use strict";L3=require("node:child_process");ee();Ut();k8();fp();dx();R8();Gl();I8();mP();W8();Qp();j8();fP();yP();SP();Q8();wx();_3();k3();T3();CP();R3();ai();C3();su();kl();SP();gu=new Map,Le=new Map,Ox=new Set,vP=new Map,v3=e=>{e!==void 0&&!vP.has(e)&&vP.set(e,Date.now())},Nce=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(jr(t)){Ht(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}bo(t,n)},Dce=(e,t,r,o,n)=>{if(!d_(e,n))return;let s=`${w3()}
`;Nce(t,r,o,s);let i=Le.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},I3=130,x3=`

Stopped by user.`,W3=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:dn(e)},fu=null,Mx=e=>{fu=e},jx=(e,t)=>{if(fu===null)return;let r=NC(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||dk(fu,t,r)},Nx=async e=>{await ux({layout:e,cloudApi:fu})},O3=e=>{let t=gu.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Ao(t.pid)},Hce=e=>ke({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),Ht=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},yu=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=ri(s),c=Le.get(r);if(a!==null&&c!==void 0){let d=ZO(a),p=O3(r)||Sx(r);d!==null&&!p&&pn(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return XO(a)}}),pn=(e,t,r,o,n,s,i,a)=>{let c=fi(s,a),d=n,p=E3(c.output,c.llmUsage);if(r!==void 0){let f=vP.get(r);vP.delete(r),f!==void 0&&MC({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-f)/1e3))});let h=E8(c.llmUsage,p);h!==null&&vK({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&Ox.has(r)&&(Ox.delete(r),d=I3,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${x3}`:"Stopped by user.");let g=r!==void 0?NC(e.layout.reportsDir,r):null;if(r!==void 0){lu(r),Ql(e.layout,r),jr(r)&&(Ht(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),N8(r));let f=Le.get(r);EK({reportsDir:e.layout.reportsDir,agentRunId:r,input:dn(i),output:p,...f!==void 0?{writerLabel:iu({writerAgent:f.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),f!==void 0&&cS({layout:e.layout,writerAgent:f.writerAgent,projectFolderPath:f.projectFolderPath,userPrompt:f.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),b3(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),L8(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),ux({layout:e.layout,cloudApi:fu}),Le.delete(r),gu.delete(r),cP(e.layout,r)}Ht(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),Ol(e.layout)},M3=(e,t,r,o,n,s,i)=>{let a=Le.get(r),c=a?.accumulatedOutput??s;_8(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),Fs(t,r,()=>cx(e.layout,r),yu(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),Ht(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},Fce=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(n===void 0||h.length===0)){if(jr(n)){Ht(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}bo(n,h)}};if(n!==void 0){let h=Le.get(n);gu.set(n,t),Le.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),Ht(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),Fs(r,n,()=>O3(n),yu(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let g=a==="claude-cli",f=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(g?f.push(y):(c.push(y),p(y)),d||n===void 0)return;let S=du(c.join(""));if(S!==null){d=!0,t.kill("SIGTERM");let u=Le.get(n),A=[u?.accumulatedOutput??"",S.partialOutput].filter(T=>T.length>0).join(`

`);u!==void 0&&(u.accumulatedOutput=A),gu.delete(n),M3(e,r,n,o,S.question,A,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;_P(a);let y=n!==void 0?Le.get(n):void 0,S=g?fi(f.join("")):{output:c.join("").trim(),llmUsage:void 0},u=g?c.join("").trim():"",A=[S.output.trim(),u].filter(P=>P.length>0).join(`
`);g&&S.output.trim().length>0&&p(S.output);let T=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${A}`.trim():A;pn(e,r,n,o,h??-1,T,s,S.llmUsage)}),t.on("error",h=>{d||pn(e,r,n,o,-1,h.message,s)})},zce=(e,t,r,o,n,s,i,a,c)=>{let d=W3(r,c);s!==void 0&&(Le.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),Ht(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),Fs(n,s,()=>Le.has(s),yu(e,n,s,o,i,a))),Jl(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(jr(s)){Ht(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}bo(s,g)}}).then(g=>{_P(t),pn(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let f=g instanceof Error?g.message:String(g);pn(e,n,s,o,-1,f,r)})},LP=(e,t,r,o,n,s,i,a,c,d,p,g)=>{let f=W3(r,p);if(Wl(e.layout),Dn(e,t)){v3(s),zce(e,t,r,o,n,s,c,d,f);return}let h=yr(t,r,Hce(e),i);if(h===null){pn(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}v3(s);let y=M8({workspace:e.workspace,projectFolderPath:c}),S=()=>{let u=(0,L3.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:g??process.env});Fce(e,u,n,o,s,r,f,t)};if(s===void 0){S();return}Le.set(s,{originalPrompt:r,userTranscriptPrompt:f,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:Le.get(s)?.accumulatedOutput??""}),Dce(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&_l({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),Fs(n,s,()=>Le.has(s),yu(e,n,s,o,c,d)),Z8({socket:n,sendMessage:Ht,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:u=>{a!==void 0&&za(a,P=>{Ht(n,P)},o);let A=Le.get(s),T=[A?.accumulatedOutput??"",u.partialOutput].filter(P=>P.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=T),M3(e,n,s,o,u.question,T,r)},onFinished:(u,A)=>{_P(t);let T=fi(A),P=Le.get(s),b=P!==void 0&&P.accumulatedOutput.length>0?`${P.accumulatedOutput}

${T.output}`.trim():T.output;pn(e,n,s,o,u,b,r,T.llmUsage)}}).then(u=>{if(!u){S();return}Fs(n,s,()=>Sx(s),yu(e,n,s,o,c,d))}).catch(u=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",u instanceof Error?u.message:u),S()})},Dx=(e,t,r,o)=>{cP(e.layout,t.agentRunId),t.shellSessionId!==void 0&&Ht(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=X8(t),s=Le.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;LP(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},Hx=(e,t)=>{for(let r of b8(e.layout))Le.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:dn(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Fs(t,r.agentRunId,()=>cx(e.layout,r.agentRunId),{awaitingInput:!0}),Ht(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Fx=(e,t,r,o)=>{let n=Le.get(r);if(n===void 0)return!1;Ox.add(r),lu(r);let s=gu.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(K8(r))return!0;cP(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${x3}`:"Stopped by user.";return pn(e,t,r,o,I3,i,n.originalPrompt),!0}});var $ce,zx,N3=l(()=>{"use strict";nc();$ce=()=>`http://127.0.0.1:${Bt()}/restart`,zx=async()=>{try{let e=await fetch($ce(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var D3=l(()=>{"use strict";rd()});var H3=l(()=>{"use strict";uv()});var F3,z3=l(()=>{"use strict";F3=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var hu,Uce,$x,$3=l(()=>{"use strict";G();ie();D3();Yw();H3();z3();ai();hu=(e,t)=>{Vo(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},Uce=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Eb(),Tb)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},$x=async e=>{let t=Ye(e.layout.installDir)?.bundleVersion??null;if(!F3({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if($t(e.layout)){Ml({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),hu(e.layout,{summary:r,action:"install-bundle-update-start"}),Hr({launchAgentLabel:ge(e.layout.installDir),installDir:e.layout.installDir});let o=await wa({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),hu(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await Uce();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),hu(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),hu(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),hu(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var Bce,Ux,U3=l(()=>{"use strict";Bce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ux=e=>{if(!Bce(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var Bx,Gx,B3=l(()=>{"use strict";xw();Ww();Bx=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=zc({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},Gx=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Xr(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var G3,Gce,Vce,Kce,Su,V3=l(()=>{"use strict";G3=m(require("node:os"));Je();Gce="Default",Vce=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),Kce=e=>{let t=G3.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Su=()=>{let e=M(),t=al(e),r=Vce(Gce);return`${Kce(t)}/${r.length>0?r:"project"}`}});var K3=l(()=>{"use strict";rd()});var q3,Vx,J3=l(()=>{"use strict";K3();q3=!1,Vx=e=>{q3||(q3=!0,process.on("uncaughtException",t=>{rs(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;rs(e,{kind:"crash",message:r,stack:o})}))}});var Y3,qce,Kx,X3=l(()=>{"use strict";Y3=require("node:child_process");PP();Ut();pP();dP();su();uP();qce=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,Y3.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},Kx=async e=>{if(!_e(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Xe(e.runConfig.writerExecutionBackend)==="api"){let r=At(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Ue(e.layout.configPath),n=lt(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await _o(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await qce(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var qx,Z3=l(()=>{"use strict";qx=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var Q3,Jx,e6=l(()=>{"use strict";Q3=require("node:crypto"),Jx=()=>(0,Q3.randomUUID)()});var Ba,t6,IP=l(()=>{"use strict";Ba="[[WORKING_ESTIMATE]]",t6=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Ba,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var r6,o6=l(()=>{"use strict";r6=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var Jce,n6,s6=l(()=>{"use strict";IP();Jce=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,n6=e=>{if(!e.includes(Ba))return null;let t=null;for(let r of e.matchAll(Jce)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var Yce,Yx,i6=l(()=>{"use strict";s6();Yce=/^(\d{1,6})\b/,Yx=e=>{let t=n6(e);if(t!==null)return t;let r=Yce.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var Xce,Zce,Qce,xP,Xx=l(()=>{"use strict";Ut();Qc();Xce="http://127.0.0.1:11434",Zce=45e3,Qce=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},xP=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Xce,o=t===void 0?(await Yt({commands:ke({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(Zce)});return n.ok?Qce(await n.json()):null}catch{return null}}});var Zx,Qx,eW,a6=l(()=>{"use strict";kl();IP();CP();o6();i6();fp();Xx();Zx=async e=>{let t=dn(e.wrappedPrompt),r=RK(e.reportsDir);return{estimateOutput:await xP(t6(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},Qx=e=>{let t=Yx(e.estimateOutput);t!==null&&rS({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},eW=e=>{let t=Yx(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=r6(t);return bl({reportKey:e.reportKey,agentRunId:e.agentRunId,status:mr.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),rS({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var WP,l6,tW=l(()=>{"use strict";WP="[[WORKING_TOKEN_ESTIMATE]]",l6=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",WP,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var c6,ede,d6,p6=l(()=>{"use strict";tW();c6=/^(\d{1,8})\b/,ede=e=>{let t=e.indexOf(WP);if(t<0)return null;let r=e.slice(t+WP.length).trim(),o=c6.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},d6=e=>{let t=ede(e);if(t!==null)return t;let r=c6.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var rW,oW,u6=l(()=>{"use strict";tW();CP();p6();fp();Xx();rW=async e=>{let t=dn(e.wrappedPrompt),r=LK(e.reportsDir);return{estimateOutput:await xP(l6(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},oW=e=>{let t=d6(e.estimateOutput);return t===null?null:(CK({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var m6=l(()=>{"use strict";nx();p8();m8();h8();nc();j3();PP();Ut();xx();fP();N3();Hw();$3();ai();U3();B3();mP();V3();J3();X3();Gm();Z3();e6();IP();kl();a6();u6();dx();Qc();yP();wx()});var g6={};Rt(g6,{buildContinuationPromptWithContext:()=>ode});var tde,rde,ode,f6=l(()=>{"use strict";tde=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,rde=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),ode=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=rde(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${tde(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var y6={};Rt(y6,{readHarnessExportSets:()=>sde});var Pu,nW,OP,nde,sde,h6=l(()=>{"use strict";Pu=m(require("node:fs")),nW=m(require("node:path"));Je();OP=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nde=e=>{if(!Pu.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Pu.default.readFileSync(e.harnessManifestPath,"utf8"));if(OP(t))return t}catch{return null}return null},sde=(e,t)=>{let r=M(t),o=nde(r);if(o===null)return[];let n=OP(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!OP(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!OP(p))continue;let g=typeof p.path=="string"?p.path:void 0,f=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(g===void 0||f.length===0||h.length===0||y.length===0)continue;let S=g.startsWith("shared/")?nW.default.join(r.harnessRootDir,g):nW.default.join(r.harnessSetsDir,i,g);Pu.default.existsSync(S)&&d.push({id:f,kind:h,title:y,content:Pu.default.readFileSync(S,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var pW,iW,Ga,S6,ide,P6,A6,sW,b6,aW,lW,cW,te,J,dW,ade,Au,lde,cde,dde,pde,ude,mde,gde,fde,bu,_6=l(()=>{"use strict";pW=require("node:child_process"),iW=m(require("node:fs")),Ga=m(require("node:os"));r8();G();ie();Mn();wI();i8();ee();gI();ee();fr();rd();nE();VS();pS();qt();Do();iT();Ct();m6();S6=3e4,ide=3e4,P6=new Map,A6=new Map,sW=new Map,b6=new Map,aW=new Map,lW=new Map,cW=new Map,te=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),J=(e,t,r)=>{e.readyState===Zp.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Vo(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),yy(r,"out",t)))},dW=e=>e,ade=e=>{if(!iW.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(iW.default.readFileSync(e.harnessManifestPath,"utf8"));if(te(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Au=(e,t)=>{let r=ade(t);r!==null&&J(e,{type:"harness.manifest.report",payload:{hostname:Ga.default.hostname(),manifest:r}})},lde=async(e,t,r,o,n,s,i=!1,a,c,d,p,g)=>{let f=g?.trim()??"";if(!_e(t)){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=iu({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await Yt({commands:ke({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),S=s!==void 0?Zx({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,u=s!==void 0?rW({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=uu(t)&&!Ax(t);if(A){try{await _o(e.layout.installDir,t)}catch(F){let nt=F instanceof Error?F.message:String(F);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${nt}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}pu(t)}else if(!uu(t))try{await _o(e.layout.installDir,t)}catch(F){let nt=F instanceof Error?F.message:String(F);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${nt}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let T=Xl(d,Su,g);if(T===null){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}st({projectFolderPath:T,...f.length>0?{projectId:f}:{}}),i||Ap(e.layout,t,T);let P=dS({sessionContinuation:i,supportsWriterSessionContinuation:AP(t),isWriterConversationStarted:bP(t)}),b=i&&P==="first"?Pp(e.layout,t,T):null,k=b!==null?ka(e.layout,b):null,E=k!==null&&k.turns.length>0,w=ZC({sessionContinuation:i,supportsWriterSessionContinuation:AP(t),isWriterConversationStarted:bP(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:E,userPromptCharacterCount:r.length}),x=r;if(w.continuationStrategy==="source_run_seed"){let F=typeof c=="string"&&c.length>0?mu(e.layout,c):null;if(F!==null){let{buildContinuationPromptWithContext:nt}=await Promise.resolve().then(()=>(f6(),g6));x=nt({priorPrompt:F.prompt,priorOutput:F.resultOutput??"",userMessage:r})}}else w.continuationStrategy==="transcript_seed"&&k!==null&&k.turns.length>0&&(x=sS({priorTurns:k.turns,userMessage:r}));let I=w.ragLimit>0?await Vi({layout:e.layout,query:x,limit:w.ragLimit,minScore:w.ragMinScore,projectFolderPath:T,...f.length>0?{projectId:f}:{}}):[],j=w.ragLimit>0&&T.trim().length>0?await rE({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:T,...f.length>0?{projectId:f}:{}}):[],O=w.injectMemory?$C(e.layout,T,f.length>0?f:void 0):[],$=`${BC(O,w.memoryEntryLimit)}${QT(I)}${oE(j)}${x}`,B=p?.trim()??(s!==void 0&&T.trim().length>0?Jx():void 0);if(s!==void 0&&B!==void 0&&B.length>0&&T.trim().length>0){_l({reportKey:B,agentRunId:s,userSummary:"Working on your Mac\u2026"});let F=$;S!==null&&S.then(nt=>{if(nt===null)return;let ko=eW({estimateOutput:nt.estimateOutput??"",reportKey:B,agentRunId:s,reportsDir:e.layout.reportsDir,task:nt.task,writerLabel:nt.writerLabel,embedding:nt.embedding});if(ko.estimateSeconds===null)return;jx(e.layout.reportsDir,s);let wo=`${Ba}
${ko.estimateSeconds}
`;if(jr(s)){J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:wo},requestId:o});return}bo(s,wo)}).catch(()=>{}),$=qx(F),$=ZA($,{agentRunId:s,reportKey:B,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&S!==null&&S.then(F=>{F!==null&&Qx({estimateOutput:F.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:F.task,writerLabel:F.writerLabel,embedding:F.embedding})}).catch(()=>{}),s!==void 0&&u!==null&&u.then(F=>{F!==null&&oW({estimateOutput:F.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:F.task,writerLabel:F.writerLabel})}).catch(()=>{});let Ce=s!==void 0&&cW.get(s)===!0;if(s!==void 0&&T.trim().length>0){let F=await Ef(T);lW.set(s,F),B!==void 0&&B.length>0&&aW.set(s,B)}LP(e,t,$,o,dW(n),s,{sessionTurn:w.sessionTurn},a,T,B,r,s_(e.layout,s,Ce)),A&&s!==void 0&&J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:_x(t)},requestId:o})},cde=async(e,t,r,o,n)=>{let s=(i,a)=>{J(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await kx({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ke({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,J(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=_e(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?$a(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},dde=(e,t,r)=>new Promise(o=>{if(!_e(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=yr(t,r,ke({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,pW.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),pde=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;J(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Pr(t.bundle),s=te(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=Fe(e.wsUrl)??Pt,g=await G_({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=$n({bundle:i,layout:e.layout});return J(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&Au(o,e.layout),!0},ude=async(e,t,r,o)=>{if(await pde(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(J(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!_e(n)){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}Wl(e.layout);let i=await(async()=>{try{await _o(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return dde(e,n,s)})().finally(()=>{Ol(e.layout)});J(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),Au(o,e.layout)},mde=e=>{let t=1e3*2**e;return Math.min(ide,t)},gde=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>t.restartInFlight?"already_in_progress":$t(e.layout)?(jl(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`),"deferred_writer_busy"):(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,zx().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1}),"accepted"),o=(u,A,T,P)=>{J(u,{type:"device.restart.ack",payload:g_({status:T,reason:A}),...P!==void 0?{requestId:P}:{}},e.layout)},n=(u,A="system.ack")=>{if(!t.selfUpdateInFlight){if($t(e.layout)){Ml({layout:e.layout,remoteBundleVersion:u,trigger:A}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${A}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,$x({layout:e.layout,remoteBundleVersion:u,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1})}},s=()=>{let u=ve(e.layout);u!==null&&ze(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,c(),d(),y())},i=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},a=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},c=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},d=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===Zp.OPEN||u.readyState===Zp.CONNECTING)&&u.close()},p=()=>{a(),t.localHealthTimer=setInterval(s,S6)},g=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=mde(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,y()},u)},f=u=>{i();let A=()=>{let T=Rl(e.layout.installDir),P=Bt();J(u,{type:"agent.heartbeat",payload:{hostname:Ga.default.hostname(),macOsUsername:Ga.default.userInfo().username,wakeError:t.wakeError,wakePort:P,...e.email!==null?{email:e.email}:{},installBundleVersion:T}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,S6)},h=(u,A)=>{if(typeof u.type!="string")return;if(sT(u)){t.stopped=!0,i(),c(),d(),rT({layout:e.layout}).finally(()=>{eu(),process.exit(0)});return}Vo(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),yy(e.layout,"in",u);let T=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&te(u.payload)){let P=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",b=typeof u.payload.origin=="string"?u.payload.origin:"",k=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",E=typeof u.payload.challenge=="string"?u.payload.challenge:"",w=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!kI({serverPublicKey:P,origin:b,devicePublicKey:k,challenge:E,serverAttestation:w})){t.wakeError="Server attestation verification failed",Vo(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&te(u.payload)){let P=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";Vo(e.layout,{direction:"local",type:"writer.ensure",summary:P,action:"ensure-writer"}),Kx({layout:e.layout,writerAgent:P,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(b=>{J(A,{type:"writer.status",payload:b},e.layout)})}if(u.type==="install.bundle.update"&&te(u.payload)){let P=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";P.length>0&&n(P,"install.bundle.update")}if(u.type==="system.ack"){dg(e.layout,{wsUrl:e.wsUrl});let P=te(u.payload)?u.payload:null,b=Ux(P);b!==null&&n(b)}if(u.type==="device.restart"){let P=r("cloud-device-restart");o(A,"cloud-device-restart",P,T)}if(u.type==="automations.sync"&&te(u.payload)&&Bx(u.payload),u.type==="project.message.history"&&te(u.payload)){Yv({payload:u.payload});return}if(u.type==="automations.run"&&te(u.payload)&&Gx(u.payload),u.type==="terminal.stream.accepted"&&te(u.payload)){let P=typeof u.payload.runId=="string"?u.payload.runId:"";if(P.length>0){let b=fx(P);for(let k of b)J(A,{type:"terminal.stream.chunk",payload:{runId:P,chunk:k},requestId:T})}}if(u.type==="agent.agentRun.list"&&J(A,{type:"dashboard.agentRun.list.result",payload:{runs:Ix(e.layout)},requestId:T}),u.type==="agent.agentRun.get"&&te(u.payload)){let P=typeof u.payload.runId=="string"?u.payload.runId:"",b=P.length>0?mu(e.layout,P):null;J(A,{type:"dashboard.agentRun.get.result",payload:{run:b},requestId:T})}if(u.type==="command.claude.run"&&te(u.payload)){let P=u.payload.prompt,b=typeof u.payload.writerAgent=="string"&&_e(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",k=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,E=u.payload.sessionContinuation===!0,w=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,x=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,I=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,j=Xl(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,Su,I),O=Zb(u.payload.compositionSnapshot),$=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof P=="string"&&P.trim().length>0){if(console.log(`[agent-witch] Running ${b} task (${E?"continue":"first"})\u2026`),j===null){J(A,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...k!==void 0?{agentRunId:k}:{}},requestId:T});return}if(O!==null){let B=e_(e.layout,O);if(B!==null){J(A,{type:"command.claude.result",payload:{exitCode:-1,output:B,...k!==void 0?{agentRunId:k}:{}},requestId:T});return}if(k!==void 0){let Ce=r_(e.layout,k,O);if(!Ce.ok){J(A,{type:"command.claude.result",payload:{exitCode:-1,output:Ce.errorMessage,...k!==void 0?{agentRunId:k}:{}},requestId:T});return}cW.set(k,O.entries.some(F=>F.scope==="run"))}}k!==void 0&&x!==void 0&&P6.set(k,x),k!==void 0&&(A6.set(k,j),I!==void 0&&I.trim().length>0&&sW.set(k,I.trim()),b6.set(k,P.trim()),st({projectFolderPath:j,...I!==void 0&&I.trim().length>0?{projectId:I.trim()}:{}})),lde(e,b,P.trim(),T,A,k,E,x,w,j,$,I)}}if(u.type==="shell.session.open"&&te(u.payload)){let P=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",b=typeof u.payload.cols=="number"?u.payload.cols:120,k=typeof u.payload.rows=="number"?u.payload.rows:32;P.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),Px({shellSessionId:P,cwd:e.workspace,cols:b,rows:k,send:E=>{J(A,E)},requestId:T}))}if(u.type==="shell.session.close"&&te(u.payload)){let P=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";P.length>0&&za(P,b=>{J(A,b)},T)}if(u.type==="shell.input"&&te(u.payload)){let P=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",b=typeof u.payload.data=="string"?u.payload.data:"";P.length>0&&b.length>0&&yx(P,b)}if(u.type==="shell.resize"&&te(u.payload)){let P=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",b=typeof u.payload.cols=="number"?u.payload.cols:0,k=typeof u.payload.rows=="number"?u.payload.rows:0;P.length>0&&b>0&&k>0&&hx(P,b,k)}if(u.type==="command.writer.session.end"&&te(u.payload)){let P=u.payload.writerAgent;typeof P=="string"&&_e(P)&&(bx(P),lS(e.layout,P))}if(u.type==="command.writer.session.start"&&te(u.payload)){let P=u.payload.writerAgent,b=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof P=="string"&&_e(P)&&b.length>0&&(console.log(`[agent-witch] Starting ${P} session\u2026`),cde(e,P,b,T,A))}if(u.type==="command.claude.stop"&&te(u.payload)){let P=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";P.length>0&&(console.log(`[agent-witch] Stopping run ${P}\u2026`),Fx(e,dW(A),P,T))}if(u.type==="command.claude.input_respond"&&te(u.payload)){let P=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",b=typeof u.payload.response=="string"?u.payload.response.trim():"",k=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",E=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",w=typeof u.payload.question=="string"?u.payload.question:"";P.length>0&&b.length>0&&k.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),Dx(e,{agentRunId:P,originalPrompt:k,partialOutput:E,question:w,response:b,shellSessionId:P6.get(P)},T,dW(A)))}if(u.type==="dispatch.approval.required"&&te(u.payload)){let P=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",b=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${P}: ${b}`),process.platform==="darwin"&&(0,pW.spawn)("osascript",["-e",`display notification "${b.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${P.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&te(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),ude(e,u.payload,T,A)),u.type==="harness.export.request"&&te(u.payload)){let P=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",b=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,k=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(E=>typeof E=="string"):[];P.length>0&&k.length>0&&(async()=>{let{readHarnessExportSets:E}=await Promise.resolve().then(()=>(h6(),y6)),w=E(k,e.email);J(A,{type:"harness.export.result",payload:{success:w.length>0,borrowerUserId:P,...b!==void 0?{targetDeviceId:b}:{},sets:w,errorMessage:w.length>0?void 0:"No readable harness sets were found on this machine."},requestId:T})})()}if(u.type==="harness.manifest.request"&&Au(A,e.layout),u.type==="command.claude.result"&&te(u.payload)){let P=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,b=typeof u.payload.output=="string"?u.payload.output:"",k=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,E=Xl(P!==void 0?A6.get(P):void 0,Su),w=P!==void 0?sW.get(P):void 0,x=P!==void 0?b6.get(P)??"":"",I=Fk({exitCode:k,output:b});if(I&&E!==null&&ZT({layout:e.layout,text:b,source:P??"command.claude.result",projectFolderPath:E,...w!==void 0?{projectId:w}:{}}),k!=null&&k!==0&&b.trim().length>0&&E!==null&&(KT({layout:e.layout,errorText:b,projectFolderPath:E,...w!==void 0?{projectId:w}:{}}),tE({layout:e.layout,text:b,source:P??"command.claude.result.failure",projectFolderPath:E,...w!==void 0?{projectId:w}:{}})),I&&x.trim().length>0&&E!==null&&UC({layout:e.layout,projectFolderPath:E,...w!==void 0?{projectId:w}:{},entry:{id:`${Date.now()}-${P??"run"}`,...P!==void 0?{agentRunId:P}:{},prompt:x,output:b,createdAt:new Date().toISOString()}}),P!==void 0&&E!==null){let O=aW.get(P),$=lW.get(P);O!==void 0&&$!==void 0&&Ef(E).then(B=>{let Ce=Bk({before:$,after:B});QA(O,Ce),lW.delete(P),aW.delete(P)})}if(I&&w!==void 0&&w.trim().length>0){let O=H(),$=O===null?null:V({wsUrl:O.wsUrl,pairingToken:O.pairingToken});$!==null&&Vk($,w,{...P!==void 0?{sourceRunId:P}:{},lesson:Gk({prompt:x,output:b})})}P!==void 0&&(Ql(e.layout,P),cW.delete(P),sW.delete(P))}},y=()=>{if(t.stopped)return;c(),d();let u=new Zp(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),Mx(V({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),Nx(e.layout);let A=Fe(e.wsUrl)??"http://localhost:3000",T=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),P=_I({layout:e.layout,origin:A,...T!==void 0&&T.length>0?{claimToken:T}:{}});J(u,{type:"agent.register",payload:{role:"agent",hostname:Ga.default.hostname(),macOsUsername:Ga.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...P}},e.layout),Au(u,e.layout),Hx(e,u),f(u)}),u.on("message",A=>{let T=typeof A=="string"?A:A.toString("utf8");try{let P=JSON.parse(T);if(!te(P))return;h(P,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(A,T)=>{i(),t.socket=void 0,t.wsConnected=!1,Cb(e.layout),t.reconnectAttempt+=1;let P=typeof T=="string"?T:T.toString("utf8");rs(e.layout,{kind:"ws_close",message:"WebSocket closed",code:A,reason:P}),console.log("[agent-witch] Disconnected from server."),g()}),u.on("error",A=>{t.wakeError=A.message,rs(e.layout,{kind:"ws_error",message:A.message,stack:A.stack}),console.error(`[agent-witch] Socket error: ${A.message}`)})},S=()=>{t.stopped=!0,i(),a(),c(),d()};return Pb(()=>{let u=Ab();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&n(u.remoteBundleVersion,u.trigger);let A=bb();A!==null&&r(A)}),{connect:y,startLocalHealthCheck:p,stop:S,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:$l(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Bp(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,y()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Au(u,e.layout),{ok:!0})}}},fde=async()=>{ht("agent-witch");let e=QI(),t=C();ox().ok||(process.platform==="darwin"?(await kn(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),ax(t);let o=ix({installDir:t});if(o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"){Hr({launchAgentLabel:ge(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067).");try{let y=hl({launchAgentPrefix:ge(t),wakePort:cl(t)});y.length>0&&console.log(`[agent-witch] Synced AGENT_WITCH_WAKE_PORT to wake-port.json in ${String(y.length)} LaunchAgent plist(s).`)}catch(y){console.error(`[agent-witch] Could not sync LaunchAgent wake port: ${y instanceof Error?y.message:String(y)}`)}ml()}let n=await m_(),s=n[0];s!==void 0&&Vx(s.layout);for(let h of n){let y=Fe(h.wsUrl)??Pt;Cl(h.layout.installDir,y)}let i=n.map(h=>gde(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),eu(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let S=i[y];if(S===void 0)return;let u=ve(h.layout);vb(u,{socketOpen:S.hasMacSocketOpen(),staleAfterMs:12e4})&&S.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&($t(h)||Gc(h.installDir))},g=await lx({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):Up({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let f=Fr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),gl(),d()});d=()=>{f(),g.stop(),eu(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},bu=fde});var uW=l(()=>{"use strict";_6()});var k6={};Rt(k6,{startAgentWitchClient:()=>bu});var w6=l(()=>{"use strict";uW();uW();En();eb();Km();if(!St()&&Rn(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Vm(process.argv.slice(e))),bu()}});YA();eb();En();Km();var tM="20.x",rM="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var PZ=e=>[`Node.js ${tM} or newer is required (found ${e}).`,rM].join(" "),oM=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${PZ(process.version)}
`),process.exit(1))};var yde=async()=>{ht("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Eb(),Tb)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},hde=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(sz(),nz)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},Sde=async()=>{if(!Rn(St()?void 0:__agentWitchImportMetaUrl))return;oM();let e=process.argv.indexOf("report");e>=0&&process.exit(Vm(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await yde();return}if(t==="wake"){await hde();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(i$(),s$));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(XJ(),YJ));o();return}if(t==="mcp"){let{resolveAgentWitchLocalLayout:o}=await Promise.resolve().then(()=>(G(),oO)),{runAwlMcpStdio:n}=await Promise.resolve().then(()=>(WC(),hK));await n({layout:o()});return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(w6(),k6));await r()};Sde();
