#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var vU=Object.create;var pf=Object.defineProperty;var _U=Object.getOwnPropertyDescriptor;var WU=Object.getOwnPropertyNames;var LU=Object.getPrototypeOf,kU=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var _=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Rt=(e,t)=>{for(var r in t)pf(e,r,{get:t[r],enumerable:!0})},EU=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of WU(t))!kU.call(e,n)&&n!==r&&pf(e,n,{get:()=>t[n],enumerable:!(o=_U(t,n))||o.enumerable});return e};var g=(e,t,r)=>(r=e!=null?vU(LU(e)):{},EU(t||!e||!e.__esModule?pf(r,"default",{value:e,enumerable:!0}):r,e));var wn=_(mf=>{"use strict";Object.defineProperty(mf,"__esModule",{value:!0});mf.stringify=CU;function CU(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=_(gf=>{"use strict";Object.defineProperty(gf,"__esModule",{value:!0});gf.generateTypeGuardError=RU;var EW=wn();function RU(e,t,r){return(0,EW.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,EW.stringify)(e)}) to be "${r}"`}});var kr=_(Ic=>{"use strict";Object.defineProperty(Ic,"__esModule",{value:!0});Ic.isNonNullObject=void 0;var xU=O(),TU=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,xU.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Ic.isNonNullObject=TU});var xt=_(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.attachTypeGuardMeta=he.isArrayTypeGuard=he.isNestedObjectTypeGuard=he.getTypeGuardWrapperKind=he.getTypeGuardInnerGuard=he.getTypeGuardItemGuard=he.getTypeGuardSchema=void 0;var IU=e=>e.schema;he.getTypeGuardSchema=IU;var OU=e=>e.itemGuard;he.getTypeGuardItemGuard=OU;var MU=e=>e.innerGuard;he.getTypeGuardInnerGuard=MU;var NU=e=>e.wrapperKind;he.getTypeGuardWrapperKind=NU;var zU=e=>{if((0,he.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};he.isNestedObjectTypeGuard=zU;var jU=e=>{if((0,he.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};he.isArrayTypeGuard=jU;var DU=(e,t)=>Object.assign(e,t);he.attachTypeGuardMeta=DU});var oi=_(so=>{"use strict";Object.defineProperty(so,"__esModule",{value:!0});so.getExpectedTypeName=so.getTypeGuardDisplayName=void 0;var CW=xt(),$U=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};so.getTypeGuardDisplayName=$U;var HU=e=>{let t=(0,CW.getTypeGuardWrapperKind)(e),r=(0,CW.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,so.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};so.getExpectedTypeName=HU});var io=_(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.createValidationResult=void 0;var FU=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Oc.createValidationResult=FU});var vn=_(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.createValidationError=void 0;var UU=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Mc.createValidationError=UU});var _n=_(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.createTreeNode=void 0;var BU=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Nc.createTreeNode=BU});var ni=_(zc=>{"use strict";Object.defineProperty(zc,"__esModule",{value:!0});zc.combineResults=void 0;var GU=io(),VU=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,GU.createValidationResult)(r,o,n)};zc.combineResults=VU});var Dc=_(jc=>{"use strict";Object.defineProperty(jc,"__esModule",{value:!0});jc.createSimplifiedTree=void 0;var RW=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=RW(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},qU=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=RW(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};jc.createSimplifiedTree=qU});var ii=_(Hc=>{"use strict";Object.defineProperty(Hc,"__esModule",{value:!0});Hc.validateObject=void 0;var KU=kr(),si=io(),JU=vn(),$c=_n(),YU=ni(),xW=Fc(),XU=(e,t,r)=>{let o=()=>{let i=(0,JU.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,$c.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,si.createValidationResult)(!1,[],a):(0,si.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,si.createValidationResult)(!0,[],(0,$c.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,m=d,b=t[m],h=e[m],y=(0,xW.validateProperty)(m,h,b,r);return y.valid?p.length===0?(0,si.createValidationResult)(!0,[],(0,$c.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,xW.validateProperty)(d,e[d],p,r)}),a=(0,YU.combineResults)(i,r.path),c=(0,$c.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,si.createValidationResult)(a.valid,a.errors,c)};return(0,KU.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};Hc.validateObject=XU});var IW=_(Gc=>{"use strict";Object.defineProperty(Gc,"__esModule",{value:!0});Gc.validateArray=void 0;var ZU=wn(),Uc=io(),TW=vn(),Bc=_n(),QU=ni(),eB=ii(),tB=oi(),rB=xt(),oB=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,TW.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,Bc.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,Uc.createValidationResult)(!1,[c],d)}let n=(0,rB.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,m={path:p,config:r.config||null};if(n)return(0,eB.validateObject)(c,n,m);let b=t(c,null),h=(0,tB.getExpectedTypeName)(t),y=(0,ZU.stringify)(c);if(b)return(0,Uc.createValidationResult)(!0,[],(0,Bc.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,S=(0,TW.createValidationError)(p,h,c,u),A=(0,Bc.createTreeNode)(p,!1,h,c);return A.errors=[S],(0,Uc.createValidationResult)(!1,[S],A)}),i=(0,QU.combineResults)(s,o),a=(0,Bc.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,Uc.createValidationResult)(i.valid,i.errors,a)};Gc.validateArray=oB});var Fc=_(qc=>{"use strict";Object.defineProperty(qc,"__esModule",{value:!0});qc.validateProperty=void 0;var OW=io(),nB=vn(),MW=_n(),sB=oi(),Vc=xt(),iB=ii(),aB=IW(),lB=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,Vc.getTypeGuardSchema)(r),c=(0,Vc.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,iB.validateObject)(t,a,s);if(c&&(0,Vc.isArrayTypeGuard)(r))return(0,aB.validateArray)(t,c,s)}let d=p=>{let m=r(t,p),b=(0,sB.getExpectedTypeName)(r);return m?(0,OW.createValidationResult)(!0,[],(0,MW.createTreeNode)(n,!0,b,t)):(()=>{let h=(0,nB.createValidationError)(n,b,t,`Expected ${n} (${JSON.stringify(t)}) to be "${b}"`),y=(0,MW.createTreeNode)(n,!1,b,t);return y.errors=[h],(0,OW.createValidationResult)(!1,[h],y)})()};if((0,Vc.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};qc.validateProperty=lB});var Jc=_(Kc=>{"use strict";Object.defineProperty(Kc,"__esModule",{value:!0});Kc.isNil=void 0;var cB=O(),dB=function(e,t){return e!=null?(t&&t.callbackOnError((0,cB.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Kc.isNil=dB});var ff=_(Yc=>{"use strict";Object.defineProperty(Yc,"__esModule",{value:!0});Yc.isDefined=void 0;var uB=O(),pB=Jc(),mB=function(e,t){return(0,pB.isNil)(e,null)?(t&&t.callbackOnError((0,uB.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Yc.isDefined=mB});var hf=_(Xc=>{"use strict";Object.defineProperty(Xc,"__esModule",{value:!0});Xc.reportValidationResults=void 0;var gB=Dc(),NW=ff(),fB=Jc(),hB=(e,t)=>{if(e.valid===!0||(0,fB.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,NW.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,gB.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,NW.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Xc.reportValidationResults=hB});var yf=_(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.Validation=Q.reportValidationResults=Q.validateObject=Q.validateProperty=Q.createSimplifiedTree=Q.combineResults=Q.createTreeNode=Q.createValidationError=Q.createValidationResult=Q.getExpectedTypeName=void 0;var yB=oi();Object.defineProperty(Q,"getExpectedTypeName",{enumerable:!0,get:function(){return yB.getExpectedTypeName}});var SB=io();Object.defineProperty(Q,"createValidationResult",{enumerable:!0,get:function(){return SB.createValidationResult}});var AB=vn();Object.defineProperty(Q,"createValidationError",{enumerable:!0,get:function(){return AB.createValidationError}});var bB=_n();Object.defineProperty(Q,"createTreeNode",{enumerable:!0,get:function(){return bB.createTreeNode}});var PB=ni();Object.defineProperty(Q,"combineResults",{enumerable:!0,get:function(){return PB.combineResults}});var wB=Dc();Object.defineProperty(Q,"createSimplifiedTree",{enumerable:!0,get:function(){return wB.createSimplifiedTree}});var vB=Fc();Object.defineProperty(Q,"validateProperty",{enumerable:!0,get:function(){return vB.validateProperty}});var _B=ii();Object.defineProperty(Q,"validateObject",{enumerable:!0,get:function(){return _B.validateObject}});var WB=hf();Object.defineProperty(Q,"reportValidationResults",{enumerable:!0,get:function(){return WB.reportValidationResults}});var LB=io(),kB=ni(),EB=vn(),CB=_n(),RB=Fc(),xB=ii(),TB=hf(),IB=Dc();Q.Validation={result:LB.createValidationResult,combine:kB.combineResults,error:EB.createValidationError,treeNode:CB.createTreeNode,property:RB.validateProperty,object:xB.validateObject,report:TB.reportValidationResults,createSimplifiedTree:IB.createSimplifiedTree}});var Zc=_(Sf=>{"use strict";Object.defineProperty(Sf,"__esModule",{value:!0});Sf.isType=MB;var zW=kr(),jW=yf(),OB=xt();function MB(e){if(!(0,zW.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,jW.validateObject)(r,e,s);return(0,jW.reportValidationResults)(i,o||null),i.valid}return(0,zW.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,OB.attachTypeGuardMeta)(t,{schema:e})}});var FW=_(ao=>{"use strict";Object.defineProperty(ao,"__esModule",{value:!0});ao.isNestedType=ao.isShape=void 0;ao.isSchema=ai;var DW=kr(),$W=yf(),HW=xt();function ai(e){if(!(0,DW.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=zB(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,$W.validateObject)(o,t,i);return(0,$W.reportValidationResults)(a,n||null),a.valid}return(0,DW.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,HW.attachTypeGuardMeta)(r,{schema:t})}function NB(e){return typeof e=="function"?e:Array.isArray(e)?jB(e):typeof e=="object"&&e!==null?ai(e):e}function zB(e){let t={};for(let[r,o]of Object.entries(e))t[r]=NB(o);return t}function jB(e){let t=e[0],r=ai(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,HW.attachTypeGuardMeta)(o,{itemGuard:r})}ao.isShape=ai;ao.isNestedType=ai});var UW=_(Af=>{"use strict";Object.defineProperty(Af,"__esModule",{value:!0});Af.isObjectWith=$B;var DB=Zc();function $B(e){return(0,DB.isType)(e)}});var BW=_(bf=>{"use strict";Object.defineProperty(bf,"__esModule",{value:!0});bf.isObject=FB;var HB=Zc();function FB(e){return(0,HB.isType)(e)}});var GW=_(Pf=>{"use strict";Object.defineProperty(Pf,"__esModule",{value:!0});Pf.guardWithTolerance=UB;function UB(e,t,r){return t(e,r),e}});var VW=_(wf=>{"use strict";Object.defineProperty(wf,"__esModule",{value:!0});wf.isBranded=GB;var BB=O();function GB(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,BB.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var qW=_(Qc=>{"use strict";Object.defineProperty(Qc,"__esModule",{value:!0});Qc.BrandSymbols=void 0;Qc.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var KW=_(ed=>{"use strict";Object.defineProperty(ed,"__esModule",{value:!0});ed.isAny=void 0;var VB=function(e){return!0};ed.isAny=VB});var li=_(vf=>{"use strict";Object.defineProperty(vf,"__esModule",{value:!0});vf.reportTypeGuardError=KB;var qB=O();function KB(e,t,r){e&&e.callbackOnError((0,qB.generateTypeGuardError)(t,e.identifier,r))}});var JW=_(td=>{"use strict";Object.defineProperty(td,"__esModule",{value:!0});td.isBoolean=void 0;var JB=li(),YB=function(t,r){return typeof t!="boolean"?((0,JB.reportTypeGuardError)(r,t,"boolean"),!1):!0};td.isBoolean=YB});var YW=_(rd=>{"use strict";Object.defineProperty(rd,"__esModule",{value:!0});rd.isDate=void 0;var XB=O(),ZB=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,XB.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};rd.isDate=ZB});var _f=_(od=>{"use strict";Object.defineProperty(od,"__esModule",{value:!0});od.isNumber=void 0;var QB=li(),eG=function(t,r){return typeof t!="number"||isNaN(t)?((0,QB.reportTypeGuardError)(r,t,"number"),!1):!0};od.isNumber=eG});var XW=_(nd=>{"use strict";Object.defineProperty(nd,"__esModule",{value:!0});nd.isString=void 0;var tG=li(),rG=function(t,r){return typeof t!="string"?((0,tG.reportTypeGuardError)(r,t,"string"),!1):!0};nd.isString=rG});var ZW=_(sd=>{"use strict";Object.defineProperty(sd,"__esModule",{value:!0});sd.isUnknown=void 0;var oG=function(e){return!0};sd.isUnknown=oG});var QW=_(id=>{"use strict";Object.defineProperty(id,"__esModule",{value:!0});id.isFunction=void 0;var nG=O(),sG=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,nG.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};id.isFunction=sG});var tL=_(ad=>{"use strict";Object.defineProperty(ad,"__esModule",{value:!0});ad.isFile=void 0;var eL=O(),iG=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,eL.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,eL.generateTypeGuardError)(e,t.identifier,"File")),!1)};ad.isFile=iG});var oL=_(ld=>{"use strict";Object.defineProperty(ld,"__esModule",{value:!0});ld.isFileList=void 0;var rL=O(),aG=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,rL.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,rL.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};ld.isFileList=aG});var sL=_(cd=>{"use strict";Object.defineProperty(cd,"__esModule",{value:!0});cd.isBlob=void 0;var nL=O(),lG=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,nL.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,nL.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};cd.isBlob=lG});var aL=_(dd=>{"use strict";Object.defineProperty(dd,"__esModule",{value:!0});dd.isFormData=void 0;var iL=O(),cG=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,iL.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,iL.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};dd.isFormData=cG});var cL=_(ud=>{"use strict";Object.defineProperty(ud,"__esModule",{value:!0});ud.isURL=void 0;var lL=O(),dG=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,lL.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,lL.generateTypeGuardError)(e,t.identifier,"URL")),!1)};ud.isURL=dG});var uL=_(pd=>{"use strict";Object.defineProperty(pd,"__esModule",{value:!0});pd.isURLSearchParams=void 0;var dL=O(),uG=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,dL.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,dL.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};pd.isURLSearchParams=uG});var pL=_(md=>{"use strict";Object.defineProperty(md,"__esModule",{value:!0});md.isMap=void 0;var pG=O(),mG=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,pG.generateTypeGuardError)(e,t.identifier,"Map")),!1)};md.isMap=mG});var mL=_(gd=>{"use strict";Object.defineProperty(gd,"__esModule",{value:!0});gd.isSet=void 0;var gG=O(),fG=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,gG.generateTypeGuardError)(e,t.identifier,"Set")),!1)};gd.isSet=fG});var gL=_(Wf=>{"use strict";Object.defineProperty(Wf,"__esModule",{value:!0});Wf.isIndexSignature=yG;var hG=O();function yG(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,hG.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let m=s[d],b=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),h=t(m,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return b&&h})}}});var fL=_(fd=>{"use strict";Object.defineProperty(fd,"__esModule",{value:!0});fd.isError=void 0;var SG=li(),AG=function(t,r){return t instanceof Error?!0:((0,SG.reportTypeGuardError)(r,t,"Error"),!1)};fd.isError=AG});var kf=_(Lf=>{"use strict";Object.defineProperty(Lf,"__esModule",{value:!0});Lf.isArrayWithEachItem=wG;var bG=O(),PG=xt();function wG(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,bG.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,PG.attachTypeGuardMeta)(t,{itemGuard:e})}});var Ef=_(hd=>{"use strict";Object.defineProperty(hd,"__esModule",{value:!0});hd.isNonEmptyArray=void 0;var vG=O(),_G=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,vG.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};hd.isNonEmptyArray=_G});var hL=_(Cf=>{"use strict";Object.defineProperty(Cf,"__esModule",{value:!0});Cf.isNonEmptyArrayWithEachItem=kG;var WG=kf(),LG=Ef();function kG(e){return function(t,r){return(0,WG.isArrayWithEachItem)(e)(t,r)&&(0,LG.isNonEmptyArray)(t,r)}}});var SL=_(Rf=>{"use strict";Object.defineProperty(Rf,"__esModule",{value:!0});Rf.isTuple=EG;var yL=O();function EG(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,yL.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,yL.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var AL=_(xf=>{"use strict";Object.defineProperty(xf,"__esModule",{value:!0});xf.isObjectWithEachItem=RG;var CG=O();function RG(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,CG.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var bL=_(Tf=>{"use strict";Object.defineProperty(Tf,"__esModule",{value:!0});Tf.isPartialOf=TG;var xG=kr();function TG(e){return function(t,r){if(!(0,xG.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var PL=_(If=>{"use strict";Object.defineProperty(If,"__esModule",{value:!0});If.isPick=OG;var IG=kr();function OG(e,...t){return function(r,o){if(!(0,IG.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var wL=_(Of=>{"use strict";Object.defineProperty(Of,"__esModule",{value:!0});Of.isOmit=NG;var MG=kr();function NG(e,...t){return function(r,o){if(!(0,MG.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),m=p.indexOf(" ("),b=m>=0?p.slice(0,m):p;if(a.has(b))return!1;let h=b.startsWith(s+".")&&b.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var vL=_(yd=>{"use strict";Object.defineProperty(yd,"__esModule",{value:!0});yd.isNonEmptyString=void 0;var zG=O(),jG=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,zG.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};yd.isNonEmptyString=jG});var _L=_(Sd=>{"use strict";Object.defineProperty(Sd,"__esModule",{value:!0});Sd.isNonNegativeNumber=void 0;var DG=O(),$G=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,DG.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Sd.isNonNegativeNumber=$G});var WL=_(Ad=>{"use strict";Object.defineProperty(Ad,"__esModule",{value:!0});Ad.isPositiveNumber=void 0;var HG=O(),FG=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,HG.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Ad.isPositiveNumber=FG});var LL=_(bd=>{"use strict";Object.defineProperty(bd,"__esModule",{value:!0});bd.isNonPositiveNumber=void 0;var UG=O(),BG=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,UG.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};bd.isNonPositiveNumber=BG});var kL=_(Pd=>{"use strict";Object.defineProperty(Pd,"__esModule",{value:!0});Pd.isNegativeNumber=void 0;var GG=O(),VG=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,GG.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Pd.isNegativeNumber=VG});var EL=_(wd=>{"use strict";Object.defineProperty(wd,"__esModule",{value:!0});wd.isInteger=void 0;var qG=O(),KG=_f(),JG=function(e,t){return!(0,KG.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,qG.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};wd.isInteger=JG});var CL=_(vd=>{"use strict";Object.defineProperty(vd,"__esModule",{value:!0});vd.isPositiveInteger=void 0;var YG=O(),XG=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,YG.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};vd.isPositiveInteger=XG});var RL=_(_d=>{"use strict";Object.defineProperty(_d,"__esModule",{value:!0});_d.isNegativeInteger=void 0;var ZG=O(),QG=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,ZG.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};_d.isNegativeInteger=QG});var xL=_(Wd=>{"use strict";Object.defineProperty(Wd,"__esModule",{value:!0});Wd.isNonNegativeInteger=void 0;var e2=O(),t2=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,e2.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Wd.isNonNegativeInteger=t2});var TL=_(Ld=>{"use strict";Object.defineProperty(Ld,"__esModule",{value:!0});Ld.isNonPositiveInteger=void 0;var r2=O(),o2=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,r2.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Ld.isNonPositiveInteger=o2});var IL=_(Ed=>{"use strict";Object.defineProperty(Ed,"__esModule",{value:!0});Ed.isNumeric=void 0;var kd=O(),n2=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,kd.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,kd.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,kd.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,kd.generateTypeGuardError)(e,t.identifier,"number key")),!1};Ed.isNumeric=n2});var OL=_(Cd=>{"use strict";Object.defineProperty(Cd,"__esModule",{value:!0});Cd.isBooleanLike=void 0;var Mf=O(),s2=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Mf.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Mf.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Cd.isBooleanLike=s2});var ML=_(Rd=>{"use strict";Object.defineProperty(Rd,"__esModule",{value:!0});Rd.isDateLike=void 0;var ci=O(),i2=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,ci.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,ci.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,ci.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,ci.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,ci.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Rd.isDateLike=i2});var NL=_(xd=>{"use strict";Object.defineProperty(xd,"__esModule",{value:!0});xd.isBigInt=void 0;var a2=O(),l2=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,a2.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};xd.isBigInt=l2});var zf=_(Nf=>{"use strict";Object.defineProperty(Nf,"__esModule",{value:!0});Nf.isOneOf=c2;var zL=wn();function c2(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,zL.stringify)(t)}) must be one of following values ${e.map(zL.stringify).join(" | ")}`),o}}});var jL=_(jf=>{"use strict";Object.defineProperty(jf,"__esModule",{value:!0});jf.isOneOfTypes=p2;var d2=wn(),u2=oi();function p2(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,d2.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,u2.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var DL=_(Df=>{"use strict";Object.defineProperty(Df,"__esModule",{value:!0});Df.isIntersectionOf=m2;function m2(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var $L=_($f=>{"use strict";Object.defineProperty($f,"__esModule",{value:!0});$f.isExtensionOf=g2;function g2(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var HL=_(Hf=>{"use strict";Object.defineProperty(Hf,"__esModule",{value:!0});Hf.isNullOr=h2;var f2=xt();function h2(e){function t(r,o){return r===null?!0:e(r,o)}return(0,f2.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var FL=_(Ff=>{"use strict";Object.defineProperty(Ff,"__esModule",{value:!0});Ff.isUndefinedOr=S2;var y2=xt();function S2(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,y2.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var UL=_(Uf=>{"use strict";Object.defineProperty(Uf,"__esModule",{value:!0});Uf.isNilOr=b2;var A2=xt();function b2(e){function t(r,o){return r==null?!0:e(r,o)}return(0,A2.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var BL=_(Bf=>{"use strict";Object.defineProperty(Bf,"__esModule",{value:!0});Bf.isAsserted=P2;function P2(e){return!0}});var GL=_(Gf=>{"use strict";Object.defineProperty(Gf,"__esModule",{value:!0});Gf.isEnum=v2;var w2=zf();function v2(e){return function(t,r){return(0,w2.isOneOf)(...Object.values(e))(t,r)}}});var VL=_(Vf=>{"use strict";Object.defineProperty(Vf,"__esModule",{value:!0});Vf.isEqualTo=L2;var _2=O(),W2=wn();function L2(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,_2.generateTypeGuardError)(t,r.identifier,`equal to ${(0,W2.stringify)(e)}`)),!1):!0}}});var qL=_(Td=>{"use strict";Object.defineProperty(Td,"__esModule",{value:!0});Td.isRegex=void 0;var k2=O(),E2=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,k2.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Td.isRegex=E2});var JL=_(qf=>{"use strict";Object.defineProperty(qf,"__esModule",{value:!0});qf.isPattern=C2;var KL=O();function C2(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,KL.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,KL.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var YL=_(Kf=>{"use strict";Object.defineProperty(Kf,"__esModule",{value:!0});Kf.by=R2;function R2(e){return function(t){return e(t,null)}}});var XL=_(Jf=>{"use strict";Object.defineProperty(Jf,"__esModule",{value:!0});Jf.toNumber=x2;function x2(e){return typeof e=="number"?e:Number(e)}});var ZL=_(Yf=>{"use strict";Object.defineProperty(Yf,"__esModule",{value:!0});Yf.toDate=T2;function T2(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var QL=_(Xf=>{"use strict";Object.defineProperty(Xf,"__esModule",{value:!0});Xf.toBoolean=I2;function I2(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var ek=_(Id=>{"use strict";Object.defineProperty(Id,"__esModule",{value:!0});Id.isSymbol=void 0;var O2=O(),M2=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,O2.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Id.isSymbol=M2});var di=_(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var N2=Zc();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return N2.isType}});var Zf=FW();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return Zf.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return Zf.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return Zf.isNestedType}});var z2=UW();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return z2.isObjectWith}});var j2=BW();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return j2.isObject}});var D2=GW();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return D2.guardWithTolerance}});var $2=VW();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return $2.isBranded}});var H2=qW();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return H2.BrandSymbols}});var F2=KW();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return F2.isAny}});var U2=JW();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return U2.isBoolean}});var B2=YW();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return B2.isDate}});var G2=ff();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return G2.isDefined}});var V2=Jc();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return V2.isNil}});var q2=_f();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return q2.isNumber}});var K2=XW();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return K2.isString}});var J2=ZW();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return J2.isUnknown}});var Y2=QW();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return Y2.isFunction}});var X2=tL();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return X2.isFile}});var Z2=oL();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return Z2.isFileList}});var Q2=sL();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return Q2.isBlob}});var e5=aL();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return e5.isFormData}});var t5=cL();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return t5.isURL}});var r5=uL();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return r5.isURLSearchParams}});var o5=pL();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return o5.isMap}});var n5=mL();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return n5.isSet}});var s5=gL();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return s5.isIndexSignature}});var i5=fL();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return i5.isError}});var a5=kf();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return a5.isArrayWithEachItem}});var l5=Ef();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return l5.isNonEmptyArray}});var c5=hL();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return c5.isNonEmptyArrayWithEachItem}});var d5=SL();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return d5.isTuple}});var u5=kr();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return u5.isNonNullObject}});var p5=AL();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return p5.isObjectWithEachItem}});var m5=bL();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return m5.isPartialOf}});var g5=PL();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return g5.isPick}});var f5=wL();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return f5.isOmit}});var h5=vL();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return h5.isNonEmptyString}});var y5=_L();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return y5.isNonNegativeNumber}});var S5=WL();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return S5.isPositiveNumber}});var A5=LL();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return A5.isNonPositiveNumber}});var b5=kL();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return b5.isNegativeNumber}});var P5=EL();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return P5.isInteger}});var w5=CL();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return w5.isPositiveInteger}});var v5=RL();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return v5.isNegativeInteger}});var _5=xL();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return _5.isNonNegativeInteger}});var W5=TL();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return W5.isNonPositiveInteger}});var L5=IL();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return L5.isNumeric}});var k5=OL();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return k5.isBooleanLike}});var E5=ML();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return E5.isDateLike}});var C5=NL();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return C5.isBigInt}});var R5=zf();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return R5.isOneOf}});var x5=jL();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return x5.isOneOfTypes}});var T5=DL();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return T5.isIntersectionOf}});var I5=$L();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return I5.isExtensionOf}});var O5=HL();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return O5.isNullOr}});var M5=FL();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return M5.isUndefinedOr}});var N5=UL();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return N5.isNilOr}});var z5=BL();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return z5.isAsserted}});var j5=GL();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return j5.isEnum}});var D5=VL();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return D5.isEqualTo}});var $5=qL();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return $5.isRegex}});var H5=JL();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return H5.isPattern}});var F5=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return F5.generateTypeGuardError}});var U5=YL();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return U5.by}});var B5=XL();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return B5.toNumber}});var G5=ZL();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return G5.toDate}});var V5=QL();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return V5.toBoolean}});var q5=ek();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return q5.isSymbol}})});var ui,tk,rk,lo,Qf,UX,ok,Od,co,pi,eh,th,rh,oh,Yt,nh,Md,Nd,zd,mi,dt,Wn,Ln,jd,Er,sh,nk,Tt=l(()=>{"use strict";ui={production:".agent-witch",localhost:".local-agent-witch"},tk={production:47892,localhost:47893},rk={production:"com.agent-witch",localhost:"com.local-agent-witch"},lo={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Qf="app",UX=`${Qf}/agent-witch.js`,ok=`${Qf}/command`,Od={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},co=ui.production,pi=ui.localhost,eh=tk.production,th=tk.localhost,rh=rk.production,oh=rk.localhost,Yt="profiles",nh=lo.activeProfile,Md="harness",Nd="sets",zd="manifest.json",mi=Od.projectsDir,dt=Od.logsDir,Wn="agent-witch.log",Ln="agent-witch.error.log",jd=Od.reportsDir,Er=Od.deviceKeypairJson,sh=Qf,nk="agent-witch.js"});var kn,sk,K5,ik,ak=l(()=>{"use strict";kn=g(require("node:path")),sk=require("node:url"),K5=()=>!0,ik=()=>{if(K5()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?kn.default.dirname(kn.default.resolve(e)):kn.default.dirname(kn.default.resolve(__filename))}return kn.default.dirname((0,sk.fileURLToPath)(__agentWitchImportMetaUrl))}});var ih,lk,z,ck,J5,Cr,k,Dd,Xt,dk,$d,En,Hd,Fd,se,ut,ah,pt,lh,N,ch=l(()=>{"use strict";ih=g(require("node:fs")),lk=g(require("node:os")),z=g(require("node:path")),ck=g(di());Tt();ak();J5=ik(),Cr=e=>e.trim().toLowerCase(),k=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return z.default.resolve(e);let t=z.default.resolve(J5),r=z.default.basename(t),o=z.default.basename(z.default.dirname(t));return r===sh&&(o===co||o===pi)?z.default.dirname(t):r===co||r===pi?t:z.default.join(lk.default.homedir(),co)},Dd=(e=k())=>z.default.join(e,sh),Xt=(e=k())=>z.default.join(Dd(e),nk),dk=(e,t,r)=>t!==null?z.default.join(e,Yt,t,r):z.default.join(e,r),$d=e=>dk(e.installDir,e.profileEmail,mi),En=e=>dk(e.installDir,e.profileEmail,dt),Hd=e=>e.profileEmail!==null?z.default.join(e.installDir,Yt,e.profileEmail,Er):z.default.join(e.installDir,Er),Fd=e=>z.default.basename(e)===pi,se=(e=k())=>Fd(e)?oh:rh,ut=(e=k())=>Fd(e)?th:eh,ah=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Cr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Cr(t):null},pt=(e=k())=>{let t=z.default.join(e,nh);if(!ih.default.existsSync(t))return null;try{let r=JSON.parse(ih.default.readFileSync(t,"utf8"));if((0,ck.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Cr(r.email)}catch{return null}return null},lh=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Cr(r):null}let t=ah();return t!==null?t:pt()},N=e=>{let t=k(),r=Dd(t),o=Xt(t),n=lh(e);if(n!==null){let b=z.default.join(t,Yt,n),h=z.default.join(b,Md),y=z.default.join(b,mi),u=z.default.join(b,dt),S=z.default.join(b,jd),A=z.default.join(b,Er),f=z.default.join(b,dt,Wn),w=z.default.join(b,dt,Ln);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:u,mainLogPath:f,errorLogPath:w,reportsDir:S,deviceKeypairPath:A,configPath:z.default.join(b,"config.json"),harnessRootDir:h,harnessManifestPath:z.default.join(h,zd),harnessSetsDir:z.default.join(h,Nd)}}let s=z.default.join(t,Md),i=z.default.join(t,mi),a=z.default.join(t,dt),c=z.default.join(t,jd),d=z.default.join(t,Er),p=z.default.join(t,dt,Wn),m=z.default.join(t,dt,Ln);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:m,reportsDir:c,deviceKeypairPath:d,configPath:z.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:z.default.join(s,zd),harnessSetsDir:z.default.join(s,Nd)}}});var dh,uk,Y5,X5,pk,uh,mk=l(()=>{"use strict";dh=g(require("node:fs")),uk=g(require("node:path"));Tt();ch();Y5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),X5=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,pk=e=>{let t=uk.default.join(e,lo.wakePort);if(!dh.default.existsSync(t))return null;try{let r=JSON.parse(dh.default.readFileSync(t,"utf8"));if(Y5(r)&&X5(r.wakePort))return r.wakePort}catch{return null}return null},uh=(e=k())=>pk(e)??ut(e)});var V=l(()=>{"use strict";ch();mk()});var gi,rV,oV,gk,nV,sV,fk=l(()=>{"use strict";V();gi=se(),rV=`${gi}-wake`,oV=`${gi}-live`,gk=`${gi}-watchdog`,nV=`${gi}-automation-scheduler`,sV=`${gi}-updater`});var ph,mh,Ud=l(()=>{"use strict";ph=new Set(["","loginwindow","_mbsetupuser","root"]),mh=5e3});var hk,iV,yk,gh,fh=l(()=>{"use strict";hk=require("node:child_process");Ud();iV=e=>e.trim().toLowerCase(),yk=e=>e==null?!1:!ph.has(iV(e)),gh=()=>{if(process.platform!=="darwin")return null;try{let t=(0,hk.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return yk(t)?t:null}catch{return null}}});var Ak,Sk,mt,fi=l(()=>{"use strict";Ak=g(require("node:os"));fh();Sk=e=>e.trim().toLowerCase(),mt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?gh():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??Ak.default.userInfo().username;return Sk(r)===Sk(o)}});var bk,Pk,uo,wk=l(()=>{"use strict";bk=require("node:child_process"),Pk=g(require("node:fs"));V();fi();uo=(e=k())=>{let t=Xt(e);if(!Pk.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!mt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=pt(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,bk.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var vk,hi,Bd=l(()=>{"use strict";vk=require("node:child_process"),hi=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,vk.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Gd,hh,_k,ee,Vd,yi=l(()=>{"use strict";Gd=g(require("node:fs")),hh=g(require("node:path"));V();Tt();_k=e=>{let t=hh.default.join(e,Yt);return Gd.default.existsSync(t)?Gd.default.readdirSync(t).filter(r=>Gd.default.statSync(hh.default.join(t,r)).isDirectory()).map(r=>Cr(r)).toSorted():[]},ee=(e=k())=>{let t=se(e);return[{profileEmail:_k(e)[0]??null,launchAgentLabel:t}]},Vd=(e=k())=>_k(e)});var yh,Wk,Lk,aV,Zt,qd=l(()=>{"use strict";yh=g(require("node:fs")),Wk=g(require("node:os")),Lk=g(require("node:path"));V();yi();aV=()=>Lk.default.join(Wk.default.homedir(),"Library","LaunchAgents"),Zt=(e=k())=>{let t=se(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ee(e))r.add(n.launchAgentLabel);let o=aV();if(yh.default.existsSync(o))for(let n of yh.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var kk,Si,Ek=l(()=>{"use strict";V();Bd();qd();yi();kk=(e=k())=>{let t=new Set(ee(e).map(r=>r.launchAgentLabel));return Zt(e).filter(r=>!t.has(r))},Si=(e=k())=>{for(let t of kk(e))hi(t)}});var Ai,Sh=l(()=>{"use strict";V();Bd();qd();Ai=(e=k())=>{for(let t of Zt(e))hi(t)}});var Ck,Rk,lV,po,xk=l(()=>{"use strict";Ck=require("node:child_process"),Rk=require("node:util"),lV=(0,Rk.promisify)(Ck.execFile),po=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await lV("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var mo,cV,Ah,bh=l(()=>{"use strict";mo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cV=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,Ah=e=>{let t=e.pathValue??cV(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${mo(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${mo(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${mo(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${mo(e.homeDir)}</string>
    <key>PATH</key>
    <string>${mo(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${mo(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${mo(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var Kd,Ph=l(()=>{"use strict";Kd=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var go,wh,bi,dV,uV,pV,Tk,Qt,vh=l(()=>{"use strict";go=g(require("node:fs")),wh=g(require("node:os")),bi=g(require("node:path"));Tt();V();bh();Ph();dV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),uV=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,pV=e=>{let t=bi.default.join(e,lo.wakePort);if(!go.default.existsSync(t))return ut(e);try{let r=JSON.parse(go.default.readFileSync(t,"utf8"));if(dV(r)&&uV(r.wakePort))return r.wakePort}catch{return ut(e)}return ut(e)},Tk=(e,t=wh.default.homedir())=>bi.default.join(t,"Library","LaunchAgents",`${e}.plist`),Qt=e=>{let t=e.installDir??k(),r=e.homeDir??wh.default.homedir(),o=Tk(e.launchAgentLabel,r),n=go.default.existsSync(o)?go.default.readFileSync(o,"utf8"):null;if(n!==null&&Kd(n))return{ok:!0,rewritten:!1,plistPath:o};let s=Ah({launchAgentLabel:e.launchAgentLabel,runPath:bi.default.join(t,ok,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??pV(t)});if(!Kd(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{go.default.mkdirSync(bi.default.dirname(o),{recursive:!0}),go.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var Ok,Mk,Nk,Pi,mV,gV,Ik,Ee,_h=l(()=>{"use strict";Ok=require("node:child_process"),Mk=g(require("node:fs")),Nk=require("node:util");V();vh();fi();Pi=(0,Nk.promisify)(Ok.execFile),mV=async e=>{try{return await Pi("launchctl",["print",e]),!0}catch{return!1}},gV=async(e,t,r)=>{await mV(t)&&await Pi("launchctl",["bootout",t]).catch(()=>{}),await Pi("launchctl",["bootstrap",e,r]),await Pi("launchctl",["enable",t])},Ik=async e=>{try{return await Pi("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Ee=async(e,t=k())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!mt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=Qt({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await Ik(n))return{ok:!0};let i=s.plistPath;if(!Mk.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await gV(o,n,i),await Ik(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var fo,zk=l(()=>{"use strict";V();_h();yi();fo=async(e=k())=>{let t=[];for(let r of ee(e))(await Ee(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var Ve,er,jk=l(()=>{"use strict";Sh();fi();Ud();Ve=e=>{mt()||(Ai(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},er=(e,t=mh)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{mt()||e()},t);return()=>{clearInterval(r)}}});var te=l(()=>{"use strict";fk();wk();Bd();Ek();Sh();qd();fi();xk();zk();_h();vh();Ph();bh();yi();fh();Ud();jk()});var Wh=l(()=>{"use strict";te()});var Dk,$k,Jd,Hk,Cn,Fk,Uk,ho=l(()=>{"use strict";Dk=".agent-witch",$k="memory",Jd="project.json",Hk="chunks.ndjson",Cn="runs.ndjson",Fk="reports",Uk=".json"});var Bk=l(()=>{"use strict";ho()});var Gk,Yd,Lh=l(()=>{"use strict";Gk=g(require("node:path"));Bk();Yd=(e,t)=>Gk.default.join(e.trim(),`${t.trim()}${Uk}`)});var wi,Vk,qk=l(()=>{"use strict";wi="agent-witch.js",Vk="command"});var Xd=l(()=>{"use strict";qk()});var yo,Kk,Jk=l(()=>{"use strict";Xd();yo=e=>`'${e.replace(/'/g,"'\\''")}'`,Kk=e=>{let t=`${e.installDir.trim()}/${"app"}/${wi}`,r=[yo("node"),yo(t),"report","write","--key",yo(e.reportKey.trim()),"--agent-run-id",yo(e.agentRunId.trim()),"--status",yo(e.status),"--summary",yo(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",yo(e.details.trim())),r.join(" ")}});var It,Yk,fV,kh,Zd=l(()=>{"use strict";Lh();Jk();It={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},Yk=e=>e===It.COMPLETED||e===It.FAILED,fV=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),kh=(e,t)=>{let r=Yd(t.reportsDir,t.reportKey),o=Kk({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:It.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${fV({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Ce=l(()=>{"use strict";Tt();V()});var _i,Zk,Xk,Qk,hV,Rn,yV,eE,Wi,Li,Eh,tE,rE,ki=l(()=>{"use strict";_i=g(require("node:fs")),Zk=g(require("node:path"));Zd();Lh();Ce();Xk=50,Qk=e=>{let t=N(),r=Yd(t.reportsDir,e);return _i.default.mkdirSync(Zk.default.dirname(r),{recursive:!0}),r},hV=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Rn=e=>{let t=Qk(e);if(!_i.default.existsSync(t))return null;try{let r=JSON.parse(_i.default.readFileSync(t,"utf8"));return hV(r)?r:null}catch{return null}},yV=(e,t)=>{let r=[...e,t];return r.length>Xk?r.slice(r.length-Xk):r},eE=e=>{let t=Qk(e.reportKey);_i.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Wi=e=>{let t=Rn(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:yV(t?.history??[],o)};return eE(n),n},Li=e=>{let t=Rn(e.reportKey);return t!==null?t:Wi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:It.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},Eh=(e,t)=>{let r=t.trim();if(r.length===0)return Rn(e);let o=Rn(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return eE(s),s},tE=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},rE=e=>{if(e===null||!Yk(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===It.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var SV,AV,Ei,oE,Qd,Ch=l(()=>{"use strict";Zd();ki();SV=new Set(Object.values(It)),AV=e=>SV.has(e),Ei=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},oE=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Qd=e=>{if(e[0]!=="write")return oE(),1;let r=Ei(e,"--key"),o=Ei(e,"--agent-run-id"),n=Ei(e,"--status"),s=Ei(e,"--summary"),i=Ei(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!AV(n)?(oE(),1):(Wi({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var qe,So=l(()=>{"use strict";qe=()=>!0});var Rh,nE,Ao,eu=l(()=>{"use strict";Rh=g(require("node:path")),nE=require("node:url");So();Ao=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Rh.default.resolve(t);return qe()?r===Rh.default.resolve(__filename):e===void 0?!1:r===(0,nE.fileURLToPath)(e)}});var tu,xn,wV,BQ,Tn=l(()=>{"use strict";tu="agent-witch.js",xn="deps.tar.gz",wV="install.sh",BQ={mainScript:`app/${tu}`,depsArchive:`app/${xn}`,installShell:wV}});var lE=l(()=>{"use strict";Tn()});var cE=l(()=>{"use strict";Tn();lE()});var Ci,Th,ru,vV,Ri,Re,On,xi,Ti,bo,Ih=l(()=>{"use strict";Ci=g(require("node:fs")),Th=g(require("node:path"));cE();V();ru="install-version.json",vV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ri=(e=k())=>Th.default.join(e,ru),Re=(e=k())=>{let t=Ri(e);if(!Ci.default.existsSync(t))return null;try{let r=JSON.parse(Ci.default.readFileSync(t,"utf8"));return!vV(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},On=(e,t=k())=>{let r=Ri(t);Ci.default.mkdirSync(Th.default.dirname(r),{recursive:!0}),Ci.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},xi=(e=k())=>Re(e)?.bundleVersion??"239",Ti=(e,t)=>{let r=Re(e);if(r!==null)return r;let o={bundleVersion:"239",appOrigin:t,updatedAt:new Date().toISOString()};return On(o,e),o},bo=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var dE,Po,Oh,Mh,Nh,ou,Ot,wo,zh=l(()=>{"use strict";dE=require("node:crypto"),Po=g(require("node:fs")),Oh=g(require("node:path"));V();Mh="self-update-log.ndjson",Nh=100,ou=(e=k())=>{let t=N(),r=t.installDir===e?t.logsDir:En({installDir:e,profileEmail:t.profileEmail});return Oh.default.join(r,Mh)},Ot=(e,t=k())=>{let r={id:(0,dE.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=ou(t);Po.default.mkdirSync(Oh.default.dirname(o),{recursive:!0});let n=Po.default.existsSync(o)?Po.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Nh+1)),JSON.stringify(r)];return Po.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},wo=(e=20,t=k())=>{let r=ou(t);if(!Po.default.existsSync(r))return[];let o=Po.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var jh,aee,Dh=l(()=>{"use strict";Tn();jh="deps",aee=`${"app"}/${xn}`});var uE=l(()=>{"use strict";Dh()});var pE,Rr,vo,mE,$h,Hh,gE=l(()=>{"use strict";pE=require("node:child_process"),Rr=g(require("node:fs")),vo=g(require("node:path"));Tn();Dh();mE=e=>vo.default.join(e,"app",jh),$h=e=>{let t=vo.default.join(e,"app"),r=vo.default.join(t,xn);Rr.default.existsSync(r)&&(Rr.default.rmSync(mE(e),{recursive:!0,force:!0}),Rr.default.mkdirSync(t,{recursive:!0}),(0,pE.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Rr.default.rmSync(r,{force:!0}))},Hh=e=>{Rr.default.rmSync(vo.default.join(e,"node_modules"),{recursive:!0,force:!0}),Rr.default.rmSync(vo.default.join(e,"package.json"),{force:!0}),Rr.default.rmSync(vo.default.join(e,"package-lock.json"),{force:!0})}});var fE=l(()=>{"use strict";uE();gE()});var gt,nu,hE=l(()=>{"use strict";gt="https://www.agentwitch.com",nu="wss://www.agentwitch.com/api/agent-witch/ws"});var Ii,tr,yE=l(()=>{"use strict";Ii="127.0.0.1",tr=`http://${Ii}:43347`});var Mt=l(()=>{"use strict";hE();yE()});var Oi,su,SE,Uh,_V,AE,Vh,bE,ft,Mi,Ni,qh,Bh,Gh,zi,Kh,Jh,Yh,Mn=l(()=>{"use strict";Oi=g(require("node:fs")),su=g(require("node:path")),SE="active-writer-work.json",Uh=new Set,_V=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),AE=e=>e.profileEmail===null?su.default.join(e.installDir,SE):su.default.join(e.installDir,"profiles",e.profileEmail,SE),Vh=e=>{let t=AE(e);if(!Oi.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Oi.default.readFileSync(t,"utf8"));return!_V(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},bE=(e,t)=>{let r=AE(e);Oi.default.mkdirSync(su.default.dirname(r),{recursive:!0}),Oi.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},ft=e=>Vh(e).activeCount>0,Mi=e=>{let t=Vh(e);bE(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},Ni=e=>{let t=Vh(e),r=Math.max(0,t.activeCount-1);if(bE(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of Uh)o()},qh=e=>(Uh.add(e),()=>{Uh.delete(e)}),Bh=null,Gh=null,zi=e=>{Bh=e},Kh=e=>{Gh=e},Jh=()=>{let e=Bh;return Bh=null,e},Yh=()=>{let e=Gh;return Gh=null,e}});var xe,Xh=l(()=>{"use strict";xe=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Nn,iu,ji,Zh=l(()=>{"use strict";Nn="qwen2.5:7b",iu="nomic-embed-text",ji="Install Ollama from https://ollama.com/download"});var Di,PE,Qh=l(()=>{"use strict";Zh();Di=()=>`
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
    echo "Ollama is missing. ${ji}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${ji}" >&2
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
  agent_witch_ensure_ollama_model "${Nn}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${iu}" "\${pull_log}"
}
`,PE=()=>`
${Di()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var wE,WV,au,ey=l(()=>{"use strict";wE=require("node:child_process");V();Qh();WV=e=>new Promise(t=>{let r=(0,wE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:k()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),au=async(e=WV)=>{let t=`${Di()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var xr,lu,vE,LV,_E,jn,kV,EV,CV,zn,_o,Wo,WE=l(()=>{"use strict";xr=g(require("node:fs")),lu=g(require("node:path"));fE();te();V();Tn();Mt();Ih();Mn();Xh();zh();ey();vE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),LV=e=>{let t=pt(e),r=t===null?N():N(t);if(!xr.default.existsSync(r.configPath))return null;try{let o=JSON.parse(xr.default.readFileSync(r.configPath,"utf8"));return!vE(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},_E=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!vE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},jn=async e=>(await _E(e))?.bundleVersion??null,kV=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=lu.default.join(t,r);xr.default.mkdirSync(lu.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());xr.default.writeFileSync(n,s),r.endsWith(".js")&&xr.default.chmodSync(n,493)},EV=async()=>{Si(),await fo()},CV=(e,t)=>e!==null?xe(e):t??gt,zn=(e,t)=>({localBundleVersion:t,...e}),_o=async e=>{let t=k(),r=Re(t),o=r?.bundleVersion??null,n=await au();Ot({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=LV(t),i=CV(s,r?.appOrigin);if(i===null){let d=zn({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return Ot({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await _E(i);if(a===null){let d=zn({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return Ot({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||bo(o,a.bundleVersion))){let d=zn({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Ot({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let b of a.scripts)await kV(i,t,b);let d=lu.default.join(t,tu);xr.default.existsSync(d)&&xr.default.rmSync(d,{force:!0}),$h(t),Hh(t),On({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=N(pt(t));if(ft(p)){let b=zn({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Ot({event:"update_applied",ok:!0,message:b.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),b}await EV();let m=zn({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Ot({event:"update_applied",ok:!0,message:m.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",m=zn({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return Ot({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},Wo=()=>{let e=k();return{local:Re(e),logs:wo(20,e)}}});var LE={};Rt(LE,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>ru,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>ji,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>iu,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>Nn,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Mh,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Nh,appendAgentWitchSelfUpdateLog:()=>Ot,buildAgentWitchEnsureOllamaShell:()=>Di,buildAgentWitchInstallScriptOllama:()=>PE,buildAgentWitchSelfUpdateStatus:()=>Wo,ensureAgentWitchInstallVersionRecorded:()=>Ti,ensureAgentWitchOllamaInstalled:()=>au,fetchAgentWitchRemoteInstallBundleVersion:()=>jn,isRemoteAgentWitchBundleVersionNewer:()=>bo,readAgentWitchInstallVersion:()=>Re,readAgentWitchSelfUpdateLogs:()=>wo,resolveAgentWitchAppOriginFromWsUrl:()=>xe,resolveAgentWitchHeartbeatInstallBundleVersion:()=>xi,resolveAgentWitchInstallVersionPath:()=>Ri,resolveAgentWitchSelfUpdateLogPath:()=>ou,runAgentWitchSelfUpdate:()=>_o,writeAgentWitchInstallVersion:()=>On});var tt=l(()=>{"use strict";Ih();zh();WE();Xh();Zh();Qh();ey()});var ty={};Rt(ty,{buildAgentWitchSelfUpdateStatus:()=>Wo,fetchAgentWitchRemoteInstallBundleVersion:()=>jn,runAgentWitchSelfUpdate:()=>_o});var ry=l(()=>{"use strict";tt()});function Dn(e){return(0,kE.createHash)("sha256").update(e.trim()).digest("hex")}var kE,oy=l(()=>{"use strict";kE=require("node:crypto")});var $n,$i,RV,EE,ny,CE=l(()=>{"use strict";$n=g(require("node:fs")),$i=g(require("node:path"));oy();Ce();RV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),EE=e=>{if(!$n.default.existsSync(e))return null;try{let t=JSON.parse($n.default.readFileSync(e,"utf8"));return!RV(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Dn(t.pairingToken.trim())}catch{return null}},ny=(e=k())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(EE($i.default.join(e,"config.json")));let n=$i.default.join(e,Yt);if(!$n.default.existsSync(n))return t;for(let s of $n.default.readdirSync(n)){let i=$i.default.join(n,s);$n.default.statSync(i).isDirectory()&&o(EE($i.default.join(i,"config.json")))}return t}});var sy,RE,cu,Hi,Fi,xV,TV,IV,xE,de,ue,du,Nt,ht=l(()=>{"use strict";sy=g(require("node:fs")),RE=g(require("node:os")),cu=g(require("node:path")),Hi={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Fi=e=>e.trim().length>0,xV=e=>{let t=cu.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},TV=()=>{let e=RE.default.homedir(),t=cu.default.join(e,".local","bin","agent");if(sy.default.existsSync(t))return t;let r=cu.default.join(e,".local","bin","cursor-agent");return sy.default.existsSync(r)?r:Hi.cursorCommand},IV=e=>{let t=e.trim();return!Fi(t)||t===Hi.cursorCommand?TV():t},xE=(e,t)=>xV(e)?t:["agent",...t],de=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ue=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:Fi(t)?t.trim():Hi.claudeCommand,codexCommand:Fi(r)?r.trim():Hi.codexCommand,cursorCommand:IV(o),antigravityCommand:Fi(n)?n.trim():Hi.antigravityCommand}},du=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:xE(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Nt=(e,t,r,o)=>{let n=t.trim();if(!Fi(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:xE(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",n]}}});var Tr,OV,Hn,MV,Fn,uu=l(()=>{"use strict";Tr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,OV=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:Tr(s.inputTokens)+Tr(s.outputTokens)+Tr(s.cacheReadInputTokens)+Tr(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Hn=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=Tr(a.input_tokens)+Tr(a.cache_creation_input_tokens)+Tr(a.cache_read_input_tokens),d=Tr(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:OV(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},MV=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),Fn=(e,t)=>{let r=Hn(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??MV(r)}}});var iy,NV,zV,ay,ly=l(()=>{"use strict";iy=e=>e.toLocaleString("en-US"),NV=e=>e<.01?e.toFixed(4):e.toFixed(3),zV=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${NV(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${iy(e.inputTokens)} in / ${iy(e.outputTokens)} out (${iy(e.totalTokens)} total)`,t].join(`
`)},ay=(e,t)=>{if(t===void 0)return e;let r=zV(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var pu,cy=l(()=>{"use strict";pu={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Lo,dy,mu,uy=l(()=>{"use strict";cy();Lo="auto",dy=e=>({value:Lo,label:`Auto (${pu[e]})`}),mu={anthropic:[dy("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[dy("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[dy("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Un,Ui,py,Bi=l(()=>{"use strict";cy();uy();Un=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Lo))return t},Ui=(e,t)=>{let r=Un(t);return r===void 0?pu[e]:r},py=e=>{let t=Un(e);return t===void 0?Lo:t}});var gu,jV,DV,fu,TE=l(()=>{"use strict";gu={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},jV=e=>{let t=gu[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?gu["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?gu["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?gu["gemini-2.0-flash"]:null},DV=(e,t,r)=>{let o=jV(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},fu=e=>{let t=DV(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Bn,$V,HV,FV,hu,IE=l(()=>{"use strict";TE();Bn=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),$V=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Bn(r.input_tokens),n=Bn(r.output_tokens);return o===0&&n===0?null:fu({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},HV=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Bn(r.prompt_tokens),n=Bn(r.completion_tokens);return o===0&&n===0?null:fu({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},FV=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=Bn(r.promptTokenCount),n=Bn(r.candidatesTokenCount);return o===0&&n===0?null:fu({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},hu=(e,t,r)=>e==="anthropic"?$V(t,r):e==="openai"?HV(t,r):FV(t,r)});var UV,my,BV,GV,VV,qV,KV,gy,fy=l(()=>{"use strict";Bi();IE();UV=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},my=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Ui(e,t.model)},BV=async e=>{let t=my("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=UV(o);n.length>0&&e.onChunk?.(n);let s=hu("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},GV=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},VV=async e=>{let t=my("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=GV(o);n.length>0&&e.onChunk?.(n);let s=hu("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},qV=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},KV=async e=>{let t=my("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=qV(n);s.length>0&&e.onChunk?.(s);let i=hu("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},gy=async e=>{try{return e.provider==="anthropic"?await BV(e):e.provider==="openai"?await VV(e):await KV(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Ke,Gi=l(()=>{"use strict";Ke=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var OE,JV,yu,hy=l(()=>{"use strict";OE=g(require("node:path")),JV="writer-api-secrets.json",yu=e=>OE.default.join(e,JV)});var yy,ME,YV,Ir,$e,Or=l(()=>{"use strict";yy=g(require("node:fs"));Bi();hy();ME=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),YV=e=>{if(!ME(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=Un(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},Ir=e=>{let t=yu(e);if(!yy.default.existsSync(t))return{};try{let r=JSON.parse(yy.default.readFileSync(t,"utf8"));if(!ME(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=YV(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},$e=(e,t)=>Ir(e)[t]??null});var Te,Vi=l(()=>{"use strict";Te=e=>e==="api"?"api":"cli"});var NE,we,ko,rr=l(()=>{"use strict";NE=g(require("node:path"));Gi();Or();Vi();we=e=>NE.default.dirname(e),ko=(e,t)=>{if(Te(e.writerExecutionBackend)!=="api")return!1;let r=Ke(t);if(r===null)return!1;let o=we(e.layout.configPath),n=$e(o,r);return n!==null&&n.apiKey.length>0}});var qi,Sy=l(()=>{"use strict";ly();fy();Gi();Or();rr();qi=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Ke(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=we(e.layout.configPath),a=$e(i,s);if(a===null){let d=Object.keys(Ir(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await gy({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:ay(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var zE,Gn,Ay=l(()=>{"use strict";zE=require("node:child_process");ht();uu();Sy();rr();Gn=(e,t,r)=>new Promise(o=>{if(!de(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(ko(e,t)){qi(e,t,r).then(o);return}let n=Nt(t,r,ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,zE.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=Fn(i.join("")),p=a.join("").trim(),m=[d.output.trim(),p].filter(b=>b.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var jE=l(()=>{"use strict"});var DE=l(()=>{"use strict";ly();Ay();fy();jE();Or();rr()});var $E,HE,FE,UE=l(()=>{"use strict";$E="claude",HE="codex",FE="cursor"});var BE,XV,by,Ki,Su=l(()=>{"use strict";BE=g(require("node:path"));Mt();Tt();XV="ws://localhost:3000/api/agent-witch/ws",by=e=>e.replace(/\/$/,""),Ki=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return by(t);let r=BE.default.basename(e.installDir);if(r===ui.production)return nu;let o=e.configWsUrl?.trim()??"";return r===ui.localhost?o.length>0?by(o):XV:o.length>0?by(o):nu}});var QV,Py,wy=l(()=>{"use strict";UE();Su();Vi();QV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Py=e=>{if(!QV(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Ki({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??$E,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??HE,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??FE,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Te(t.writerExecutionBackend),layout:e.layout}}}});var vy,_y,Wy=l(()=>{"use strict";vy=g(require("node:fs"));V();wy();_y=e=>{let t=N(e);if(!vy.default.existsSync(t.configPath))return null;try{let r=JSON.parse(vy.default.readFileSync(t.configPath,"utf8")),o=Py({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Ji,GE=l(()=>{"use strict";Ji=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var Ly,eq,ky,VE=l(()=>{"use strict";Ly=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eq=e=>{if(!Ly(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!Ly(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(m=>{if(!Ly(m))return[];let b=typeof m.itemKey=="string"?m.itemKey.trim():"",h=typeof m.relativePath=="string"?m.relativePath:"",y=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return b.length===0||y.length===0?[]:[{itemKey:b,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},ky=eq});var qE,tq,Au,Ey=l(()=>{"use strict";qE=g(require("node:path")),tq=(e,t)=>{let r=t.trim();return qE.default.join(e,"components","store",r.slice(0,2),r)},Au=tq});var KE,rq,Cy,JE=l(()=>{"use strict";KE=g(require("node:fs"));Ey();rq=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Au(e.installDir,n.contentSha256);KE.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},Cy=rq});var Yi,Vn,oq,Ry,nq,xy,Ty=l(()=>{"use strict";Yi=g(require("node:fs")),Vn=g(require("node:path"));Ey();oq=(e,t)=>Vn.default.join(e.installDir,"runs",t,"overlay"),Ry=(e,t)=>Vn.default.join(oq(e,t),".cursor"),nq=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=Ry(e,t);Yi.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Au(e.installDir,i.contentSha256);if(!Yi.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Vn.default.join(n,c):Vn.default.join(n,i.itemKey);Yi.default.mkdirSync(Vn.default.dirname(d),{recursive:!0}),Yi.default.copyFileSync(a,d)}return{ok:!0}},xy=nq});var Iy,YE,sq,Xi,XE=l(()=>{"use strict";Iy=g(require("node:fs")),YE=g(require("node:path")),sq=(e,t)=>{let r=YE.default.join(e.installDir,"runs",t);Iy.default.existsSync(r)&&Iy.default.rmSync(r,{recursive:!0,force:!0})},Xi=sq});var iq,Oy,ZE=l(()=>{"use strict";Ty();iq=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=Ry(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},Oy=iq});var My,aq,lq,cq,dq,uq,$,QE=l(()=>{"use strict";My=g(require("node:fs"));Su();V();Vi();aq="claude",lq="codex",cq="cursor",dq="agy",uq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=N();if(!My.default.existsSync(e.configPath))return null;try{let t=JSON.parse(My.default.readFileSync(e.configPath,"utf8"));if(!uq(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Ki({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Te(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:aq,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:lq,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:cq,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:dq,pairingToken:s,layout:e}}catch{return null}}});var bu,eC,tC=l(()=>{"use strict";bu=g(require("node:fs"));hy();eC=(e,t)=>{let r=yu(e);bu.default.mkdirSync(e,{recursive:!0}),bu.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{bu.default.chmodSync(r,384)}catch{}}});var Pu,rC,Ny=l(()=>{"use strict";Pu=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},rC=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Pu(t)}});var Zi,pq,zy,jy,oC=l(()=>{"use strict";Zi=g(require("node:fs"));Or();tC();Ny();Bi();rr();pq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zy=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=rC(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?Un(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},jy=e=>{let t=we(e.configPath),r={};if(Zi.default.existsSync(e.configPath))try{let n=JSON.parse(Zi.default.readFileSync(e.configPath,"utf8"));pq(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,Zi.default.mkdirSync(t,{recursive:!0}),Zi.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=zy(zy(zy(Ir(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);eC(t,o)}});var Dy,nC=l(()=>{"use strict";Dy={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var $y,sC=l(()=>{"use strict";Gi();Or();rr();rr();$y=(e,t)=>{if(ko(e,t))return!1;let r=Ke(t);if(r===null)return!1;let o=we(e.layout.configPath),n=$e(o,r);return n===null||n.apiKey.trim().length===0}});var iC,Hy,Fy=l(()=>{"use strict";iC=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},Hy=async e=>{let t=iC(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=iC(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var mq,Uy,aC=l(()=>{"use strict";te();Wy();Fy();mq=1e4,Uy=()=>Hy({listProfileEmails:Vd,readConfig:_y,pollIntervalMs:mq,logWaiting:e=>{console.error(e)}})});var pe=l(()=>{"use strict";Ay();DE();Wy();Su();GE();VE();JE();Ty();XE();ZE();Vi();QE();oC();Or();rr();Ny();Bi();nC();Sy();rr();sC();Gi();Or();aC();wy();Fy()});var wu,lC,gq,fq,cC,vu,Qi,_u,ea=l(()=>{"use strict";wu=g(require("node:fs")),lC=g(require("node:path")),gq="wake-port.json",fq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cC=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,vu=e=>lC.default.join(e,gq),Qi=e=>{let t=vu(e);if(!wu.default.existsSync(t))return null;try{let r=JSON.parse(wu.default.readFileSync(t,"utf8"));if(fq(r)&&cC(r.wakePort))return r.wakePort}catch{return null}return null},_u=(e,t)=>{if(!cC(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=vu(e);wu.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Poe,woe,voe,yt,dC,ta=l(()=>{"use strict";ea();Ce();ea();Poe=ut(),woe=`${se()}-wake`,voe=se(),yt=()=>{let e=k(),t=Qi(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return ut()},dC=e=>{let t=k();Qi(t)===null&&_u(t,e)}});var uC=l(()=>{"use strict";oy();te();CE();pe();ta()});var By,ra,oa,pC=l(()=>{"use strict";By=g(require("node:os"));uC();ra=()=>{let e=ee();return{ok:!0,port:yt(),hostname:By.default.hostname(),profileCount:e.length}},oa=()=>{let e=ee(),t=$()?.pairingToken.trim()??"",r=t.length>0?Dn(t):null,o=ny();return{hostname:By.default.hostname(),port:yt(),tokenHash:r,tokenHashes:o.length>0?o:r!==null?[r]:[],profiles:e.map(n=>({email:n.profileEmail,launchAgentLabel:n.launchAgentLabel}))}}});var Gy=l(()=>{"use strict";pC()});var mC,gC,fC,Wu,qn=l(()=>{"use strict";mC="materialization.json",gC="backups",fC=".gitignore",Wu=e=>`harness-set:${e.trim()}`});var hC,yC,Lu,SC=l(()=>{"use strict";hC=g(require("node:crypto")),yC=g(require("node:fs")),Lu=e=>{try{let t=yC.default.readFileSync(e);return hC.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Mr,Eo,hq,AC,Vy,bC=l(()=>{"use strict";Mr=g(require("node:fs")),Eo=g(require("node:path"));SC();hq=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=Eo.default.join(t,n,o);return Mr.default.mkdirSync(Eo.default.dirname(s),{recursive:!0}),Mr.default.copyFileSync(r,s),Eo.default.relative(e,s).replaceAll("\\","/")},AC=e=>{let t=Eo.default.join(e.repoRoot,e.repoRelativeDestination),r=Lu(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(Mr.default.existsSync(t)){let n=Lu(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=hq(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Mr.default.mkdirSync(Eo.default.dirname(t),{recursive:!0}),Mr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Mr.default.mkdirSync(Eo.default.dirname(t),{recursive:!0}),Mr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},Vy=e=>{let t=Lu(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var qy,PC,ku,Ky=l(()=>{"use strict";qy=g(require("node:fs"));qn();PC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ku=e=>{if(!qy.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(qy.default.readFileSync(e,"utf8"));if(PC(t)&&t.version===1&&PC(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var Nr,Eu,wC,vC=l(()=>{"use strict";Nr=g(require("node:fs")),Eu=g(require("node:path"));qn();wC=e=>{let t=new Set(e.setSlugs.map(s=>Wu(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=Eu.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=Eu.default.join(e.repoRoot,i.backupPath);Nr.default.existsSync(c)?(Nr.default.mkdirSync(Eu.default.dirname(a),{recursive:!0}),Nr.default.copyFileSync(c,a),o.push(s)):Nr.default.existsSync(a)&&Nr.default.rmSync(a,{force:!0})}else Nr.default.existsSync(a)&&Nr.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var Jy,Cu,Yy=l(()=>{"use strict";Jy=g(require("node:path"));qn();Cu=e=>({ledgerFilePath:Jy.default.join(e.metaDirPath,mC),backupsDirPath:Jy.default.join(e.metaDirPath,gC)})});var Xy,_C,WC=l(()=>{"use strict";Xy=g(require("node:path")),_C=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return Xy.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return Xy.default.posix.join(s,e,n)}});var Zy,LC,Qy,kC=l(()=>{"use strict";Zy=g(require("node:fs")),LC=g(require("node:path")),Qy=(e,t)=>{Zy.default.mkdirSync(LC.default.dirname(e),{recursive:!0}),Zy.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var eS,yq,rt,sa=l(()=>{"use strict";eS=g(require("node:os")),yq=e=>{let t=e.trim();return t.startsWith("~/")?`${eS.default.homedir()}${t.slice(1)}`:t==="~"?eS.default.homedir():t},rt=yq});var Ru,EC,Sq,CC,RC=l(()=>{"use strict";Ru=g(require("node:fs")),EC=g(require("node:path"));qn();ho();Sq=`*
!${Jd}
`,CC=e=>{let t=EC.default.join(e,fC);Ru.default.existsSync(t)||(Ru.default.mkdirSync(e,{recursive:!0}),Ru.default.writeFileSync(t,Sq))}});var Co,ot,Ro=l(()=>{"use strict";Co=g(require("node:path"));ho();sa();ot=e=>{let t=rt(e),r=Co.default.join(t,Dk);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Co.default.join(r,"rag"),memoryDirPath:Co.default.join(r,$k),reportsDirPath:Co.default.join(r,Fk),metaFilePath:Co.default.join(r,Jd),ragChunksFilePath:Co.default.join(r,"rag",Hk)}}});var zt,TC,Aq,bq,Je,tS=l(()=>{"use strict";zt=g(require("node:fs")),TC=g(require("node:path"));ho();RC();Ro();Aq=(e,t)=>{if(zt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};zt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},bq=e=>{zt.default.existsSync(e.ragChunksFilePath)||zt.default.writeFileSync(e.ragChunksFilePath,"");let t=TC.default.join(e.memoryDirPath,Cn);zt.default.existsSync(t)||zt.default.writeFileSync(t,"")},Je=e=>{let t=ot(e.projectFolderPath);return zt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),zt.default.mkdirSync(t.ragDirPath,{recursive:!0}),zt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),CC(t.metaDirPath),Aq(t,e),bq(t),{ok:!0,layout:t}}});var IC,OC,MC,NC,xu,Tu=l(()=>{"use strict";IC="components",OC="store",MC="versions",NC="installed.json",xu=e=>`harness-set:${e.trim()}`});var rS,zC,Iu,oS=l(()=>{"use strict";rS=g(require("node:fs")),zC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Iu=e=>{if(!rS.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(rS.default.readFileSync(e,"utf8"));if(zC(t)&&t.version===1&&zC(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var ia,Kn,Ou=l(()=>{"use strict";ia=g(require("node:path"));Tu();Kn=e=>{let t=ia.default.join(e,IC);return{componentsRootDir:t,storeDir:ia.default.join(t,OC),versionsDir:ia.default.join(t,MC),installedFilePath:ia.default.join(t,NC)}}});var nS,jC,Mu,Nu,zu=l(()=>{"use strict";nS=g(require("node:crypto")),jC=g(require("node:fs")),Mu=e=>nS.default.createHash("sha256").update(e,"utf8").digest("hex"),Nu=e=>{try{let t=jC.default.readFileSync(e);return nS.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var sS,DC,$C,HC=l(()=>{"use strict";sS=g(require("node:fs")),DC=g(require("node:path")),$C=(e,t)=>{sS.default.mkdirSync(DC.default.dirname(e),{recursive:!0}),sS.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var iS,aS,FC,UC=l(()=>{"use strict";iS=g(require("node:fs")),aS=g(require("node:path")),FC=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=aS.default.join(e,r),n=aS.default.join(o,`${t.versionId}.json`);iS.default.mkdirSync(o,{recursive:!0}),iS.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var ju,BC,GC,VC=l(()=>{"use strict";ju=g(require("node:fs")),BC=g(require("node:path"));zu();GC=e=>{let t=Mu(e.content),r=BC.default.join(e.storeDir,t);return ju.default.existsSync(r)||(ju.default.mkdirSync(e.storeDir,{recursive:!0}),ju.default.writeFileSync(r,e.content)),t}});var lS,qC,Pq,Du,cS=l(()=>{"use strict";lS=g(require("node:fs")),qC=g(require("node:path"));Tu();oS();Ou();zu();HC();UC();VC();Pq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Du=e=>{let t=Kn(e.installDir),r=xu(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!Pq(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=qC.default.join(e.harnessRootDir,a);if(!lS.default.existsSync(c))continue;let d=lS.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Nu(c);if(p!==null){if(Mu(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);GC({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;FC(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=Iu(t.installedFilePath);$C(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var uS,dS,KC,JC=l(()=>{"use strict";uS=g(require("node:fs"));cS();oS();Ou();dS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),KC=e=>{if(!uS.default.existsSync(e.harnessManifestPath))return;let t=Kn(e.installDir),r=Iu(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(uS.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!dS(o)||o.version!==1||!dS(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!dS(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Du({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var pS,YC,XC,ZC=l(()=>{"use strict";pS=g(require("node:fs")),YC=g(require("node:path")),XC=e=>{let t=e.componentId.replaceAll("/","_"),r=YC.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!pS.default.existsSync(r))return null;try{let o=JSON.parse(pS.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var $u,Hu,QC,eR=l(()=>{"use strict";$u=g(require("node:fs")),Hu=g(require("node:path"));Tu();JC();ZC();Ou();zu();QC=e=>{KC({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Kn(e.layout.installDir),r=xu(e.setSlug),o=XC({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Hu.default.join(t.storeDir,i.contentSha256);if($u.default.existsSync(a)&&Nu(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Hu.default.join(e.layout.harnessRootDir,n):Hu.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!$u.default.existsSync(s))return null;try{if(!$u.default.statSync(s).isFile())return null}catch{return null}return s}});var tR,wq,vq,zr,Fu=l(()=>{"use strict";Ky();Yy();Ro();tR="harness-set:",wq=e=>{let t=e.trim();if(!t.startsWith(tR))return null;let r=t.slice(tR.length).trim();return r.length>0?r:null},vq=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=wq(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},zr=e=>{let t=ot(e),{ledgerFilePath:r}=Cu(t),o=ku(r);return vq(o)}});var Uu,mS,aa,_q,or,la,Jn=l(()=>{"use strict";Uu=g(require("node:fs")),mS=g(require("node:os")),aa=g(require("node:path")),_q=()=>Uu.default.realpathSync(aa.default.resolve(mS.default.homedir())),or=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?aa.default.join(mS.default.homedir(),t.slice(1)):t,o;try{o=Uu.default.realpathSync(aa.default.resolve(r))}catch{return null}let n=_q();return o===n||o.startsWith(`${n}${aa.default.sep}`)?o:null},la=e=>{let t=or(e);if(t===null)return null;try{if(!Uu.default.statSync(t).isFile())return null}catch{return null}return t}});var gS,fS=l(()=>{"use strict";gS=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Gu,rR,Bu,Wq,ca,hS=l(()=>{"use strict";Gu=g(require("node:fs")),rR=g(require("node:path"));qn();bC();Ky();vC();Yy();WC();kC();sa();tS();eR();Fu();Jn();fS();Bu=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Wq=e=>{if(!Gu.default.existsSync(e))return null;try{let t=JSON.parse(Gu.default.readFileSync(e,"utf8"));if(Bu(t)&&t.version===1)return t}catch{return null}return null},ca=e=>{let t=[...new Set(e.setSlugs.map(A=>A.trim()).filter(A=>A.length>0))],r=rt(e.projectFolderPath),o=or(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Gu.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Je({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Cu(s.layout),d=zr(o).filter(A=>!t.includes(A)),p=ku(i),m=0;if(d.length>0){let A=wC({repoRoot:o,setSlugs:d,ledger:p});p=A.ledger,m=A.summary.removedPaths.length}if(t.length===0)return Qy(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let b=Wq(e.layout.harnessManifestPath);if(b===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=Bu(b.sets)?b.sets:{},y=0,u=0,S=0;for(let A of t){let f=h[A];if(!Bu(f))return{ok:!1,errorMessage:`Harness set "${A}" is not installed locally.`};let w=typeof f.version=="number"?String(f.version):"1",v=Wu(A),W=Array.isArray(f.items)?f.items:[];for(let L of W){if(!Bu(L))continue;let E=typeof L.path=="string"?L.path.trim():"";if(E.length===0)continue;let x=gS(E);if(x===null)continue;let I=_C(A,x),M=rR.default.posix.join(".cursor",I).replaceAll("\\","/"),B=typeof L.id=="string"?L.id.trim():"",q=QC({layout:e.layout,setSlug:A,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:E,manifestItemId:B});if(q===null)continue;let F=AC({repoRoot:o,backupsDir:a,repoRelativeDestination:M,sourceAbsolutePath:q,componentId:v,versionId:w,ledger:p});if(F.kind==="skipped_unchanged"){u+=1;continue}if(F.kind==="backed_up_user_file"){S+=1,y+=1,p={version:1,entries:{...p.entries,[M]:Vy({componentId:v,versionId:w,sourceAbsolutePath:q,backupPath:F.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[M]:Vy({componentId:v,versionId:w,sourceAbsolutePath:q})}}}}return y===0&&u===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(Qy(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:S,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var oR,Vu,Lq,kq,Eq,Cq,Rq,xq,Tq,Iq,Oq,da,qu=l(()=>{"use strict";oR=g(require("node:crypto")),Vu=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Lq=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},kq=(e,t)=>{let r=Lq(t),o=Vu(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},Eq=(e,t,r)=>{let o=kq(t,r);return`shared/items/${e}/${o}`},Cq=["rules","skills","commands","instructions","agents"],Rq=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),xq=(e,t)=>[...e.filter(o=>o.id!==t.id),t],Tq=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},Iq=e=>oR.default.createHash("sha256").update(e,"utf8").digest("hex"),Oq=e=>({id:e.id,kind:e.kind,title:e.title,path:Eq(e.id,e.kind,e.title),contentSha256:Iq(e.content)}),da=e=>{let t=new Date().toISOString(),r=e.existingManifest??Rq(e.hostname,t),o=Vu(e.bundle.slug),n=Tq(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...Cq.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let m=Oq(p);return{files:[...d.files,{relativePath:m.path,content:p.content}],nextItems:xq(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var jr,nR,Ku,Mq,xo,yS=l(()=>{"use strict";jr=g(require("node:fs")),nR=g(require("node:os")),Ku=g(require("node:path"));qu();Mq=e=>{if(!jr.default.existsSync(e))return null;try{let t=JSON.parse(jr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},xo=e=>{try{let t=Mq(e.layout.harnessManifestPath),r=da({bundle:e.bundle,hostname:nR.default.hostname(),existingManifest:t});jr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)jr.default.mkdirSync(Ku.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Ku.default.join(e.layout.harnessRootDir,o.relativePath);jr.default.mkdirSync(Ku.default.dirname(n),{recursive:!0}),jr.default.writeFileSync(n,o.content)}return jr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var SS,sR=l(()=>{"use strict";yS();hS();SS=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=xo({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return ca({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var iR,aR=l(()=>{"use strict";iR=["rule","skill","command","instruction","agent"]});var lR,Nq,zq,jt,AS=l(()=>{"use strict";aR();lR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Nq=e=>typeof e=="string"&&iR.includes(e),zq=e=>{if(!lR(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!Nq(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},jt=e=>{if(!lR(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=zq(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var cR,jq,bS,dR=l(()=>{"use strict";cR=require("node:zlib");AS();jq="x-agent-witch-token",bS=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[jq]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,cR.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=jt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var wS,PS,Dr,uR=l(()=>{"use strict";wS=g(require("node:fs")),PS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Dr=e=>{if(!wS.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(wS.default.readFileSync(e.harnessManifestPath,"utf8"));if(!PS(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=PS(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!PS(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Ju,pR=l(()=>{"use strict";Ju=()=>"~"});var mR,gR,fR=l(()=>{"use strict";mR=require("node:crypto"),gR=e=>`local-${(0,mR.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var vS,hR=l(()=>{"use strict";vS=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var ua,Yu,_S=l(()=>{"use strict";ua=g(require("node:path")),Yu=e=>{let t=ua.default.dirname(e),r=ua.default.basename(t);return r==="agents"?ua.default.basename(ua.default.dirname(t)):r}});var pa,nr,yR,Dq,$q,Hq,Xu,SR,WS=l(()=>{"use strict";pa=g(require("node:fs")),nr=g(require("node:path"));fR();hR();_S();yR=new Set(["node_modules",".git","dist","build",".next","coverage"]),Dq=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},$q=(e,t)=>{let r=nr.default.basename(t);if(e==="skill"){let o=t.split(nr.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},Hq=e=>{let t=[],r=(n,s)=>{let i;try{i=pa.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&yR.has(a.name))continue;let c=nr.default.join(n,a.name),d=s?nr.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;vS(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=nr.default.join(e,n);pa.default.existsSync(s)&&r(s,n)}let o=nr.default.join(e,"skills");return pa.default.existsSync(o)&&r(o,"skills"),t},Xu=e=>{let t=Hq(e);if(t.length===0)return null;let r=nr.default.dirname(e),o=Yu(e),n=Dq(o),s=t.map(i=>{let a=vS(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:gR(i.absolutePath),kind:a,title:$q(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},SR=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=pa.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||yR.has(a.name))continue;let c=nr.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var AR,LS,Fq,kS,bR=l(()=>{"use strict";AR=g(require("node:fs")),LS=g(require("node:path"));WS();Jn();Fq=e=>{let t=or(e.trim());if(t===null)return null;if(LS.default.basename(t)===".cursor")return t;let r=LS.default.join(t,".cursor");try{if(AR.default.statSync(r).isDirectory())return or(r)}catch{return null}return null},kS=e=>{let t=Fq(e.projectPath);if(t===null)return null;let r=Xu(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var PR,Uq,Zu,ES,wR=l(()=>{"use strict";PR=g(require("node:path"));WS();Jn();_S();Uq=5,Zu=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},ES=e=>{let t=or(e.scanRoot.trim());if(t===null)return Zu(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of SR(t,Uq,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=or(s);if(i===null)continue;let a=Yu(i);Zu(e.response,"folder",{cursorDir:i,groupName:a,repoPath:PR.default.dirname(i)});let c=Xu(i);c!==null&&(r.push(c),Zu(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Zu(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var vR,_R,WR=l(()=>{"use strict";vR=g(require("node:path")),_R=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:vR.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var ze,LR,CS,Bq,RS,xS,Qu,TS,ma,kR=l(()=>{"use strict";ze=g(require("node:fs")),LR=g(require("node:os")),CS=g(require("node:path"));qu();cS();Jn();WR();Bq=e=>{if(!ze.default.existsSync(e))return null;try{let t=JSON.parse(ze.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},RS=e=>{let t=e.hostname??LR.default.hostname(),r=Bq(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let m=la(p.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let b=ze.default.readFileSync(m,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:b,setSlugs:[i.slug]})}let d=da({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{ze.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)ze.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=CS.default.join(e.layout.harnessRootDir,i.relativePath);ze.default.mkdirSync(CS.default.dirname(a),{recursive:!0}),ze.default.writeFileSync(a,i.content)}ze.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=Vu(i.slug),d=r.sets[c];d!==void 0&&Du({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},xS="reveal-cache.json",Qu=(e,t)=>{ze.default.mkdirSync(e.harnessRootDir,{recursive:!0}),ze.default.writeFileSync(`${e.harnessRootDir}/${xS}`,`${JSON.stringify(t,null,2)}
`)},TS=e=>{let t=`${e.harnessRootDir}/${xS}`;ze.default.existsSync(t)&&ze.default.unlinkSync(t)},ma=e=>{let t=`${e.harnessRootDir}/${xS}`;if(!ze.default.existsSync(t))return null;try{let r=JSON.parse(ze.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return _R(r)}catch{return null}return null}});var To=l(()=>{"use strict";hS();sR();fS();yS();dR();AS();qu();uR();pR();bR();Jn();wR();kR()});var IS,ER=l(()=>{"use strict";To();Ce();IS=e=>{let t=N(e.profileEmail);return xo({bundle:e.bundle,layout:t})}});var CR=l(()=>{"use strict";ER();To()});var Gq,RR,Vq,xR,Io,ep,TR=l(()=>{"use strict";Gq=["agentwitch.com","www.agentwitch.com"],RR=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,Vq=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},xR=e=>{let t=Vq(e);return!!(Gq.includes(t)||RR.test(e.trim().toLowerCase()))},Io=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return xR(r)?RR.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},ep=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Io(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var ga=l(()=>{"use strict";TR()});var sr,fa=l(()=>{"use strict";sr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var ha,IR=l(()=>{"use strict";CR();ga();fa();ha=e=>{if(!sr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=jt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Io(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=IS({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var OS=l(()=>{"use strict";IR()});var qq,Yn,MS=l(()=>{"use strict";qq=e=>e==="hourly"||e==="daily"||e==="weekdays",Yn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!qq(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var ya,tp,OR,MR,NS,St,rp,op,np,sp,ip=l(()=>{"use strict";ya=g(require("node:fs")),tp=g(require("node:path"));MS();OR="automations.json",MR=e=>e.profileEmail!==null?tp.default.join(e.installDir,"profiles",e.profileEmail,OR):tp.default.join(e.installDir,OR),NS=()=>({version:1,automations:[]}),St=e=>{let t=MR(e);if(!ya.default.existsSync(t))return NS();try{let r=JSON.parse(ya.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?NS():{version:1,automations:r.automations.flatMap(n=>{let s=Yn(n);return s!==null?[s]:[]})}}catch{return NS()}},rp=(e,t)=>{let r=MR(e);ya.default.mkdirSync(tp.default.dirname(r),{recursive:!0}),ya.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},op=(e,t)=>{rp(e,{version:1,automations:t})},np=(e,t)=>{let o=St(e).automations.filter(n=>n.id!==t.id);rp(e,{version:1,automations:[...o,t]})},sp=(e,t)=>St(e).automations.find(r=>r.id===t)??null});var Ie,ir=l(()=>{"use strict";Ie="x-agent-witch-token"});var Y,Oo,zS,Sa,jS,Kq,DS,Aa,ba,$S,Pa=l(()=>{"use strict";ir();tt();Y=e=>{let t=xe(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Oo=e=>({[Ie]:e,"Content-Type":"application/json"}),zS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Oo(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Sa=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Oo(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},jS=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Oo(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Kq=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},DS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:Oo(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Aa=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:Oo(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return Kq(r)}catch{return null}},ba=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:Oo(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},$S=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Oo(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var Mo,NR,zR,Jq,HS,jR,FS=l(()=>{"use strict";Mo=g(require("node:fs")),NR=g(require("node:path")),zR=e=>NR.default.join(e.harnessRootDir,"projects-registry.json"),Jq=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),HS=e=>{let t=zR(e);if(!Mo.default.existsSync(t))return[];try{let r=JSON.parse(Mo.default.readFileSync(t,"utf8"));return Jq(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},jR=e=>{let t=zR(e);if(!Mo.default.existsSync(t))return;let r=`${t}.migrated`;if(Mo.default.existsSync(r)){Mo.default.unlinkSync(t);return}Mo.default.renameSync(t,r)}});var DR,Yq,Xq,$R,HR=l(()=>{"use strict";sa();DR=e=>rt(e),Yq=e=>new Set(e.map(t=>DR(t.folderPath))),Xq=e=>new Set(e.map(t=>t.id)),$R=(e,t)=>{let r=Yq(t),o=Xq(t),n=[],s=new Set;for(let i of e){let a=DR(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var US,BS=l(()=>{"use strict";Pa();FS();HR();US=async(e,t)=>{let r=HS(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Aa(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=$R(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await DS(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&jR(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var GS,No,ap=l(()=>{"use strict";GS=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),No=(e,t)=>e.find(r=>r.id===t)??null});var Xn,lp=l(()=>{"use strict";Pa();BS();ap();Xn=async(e,t)=>{t!==void 0&&await US(t,e);let r=Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Aa(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=GS(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var FR=l(()=>{"use strict"});var Zq,Qq,cp,VS=l(()=>{"use strict";Zq="Default",Qq=e=>e.trim().toLowerCase()===Zq.toLowerCase(),cp=Qq});var ve,UR,eK,tK,rK,oK,Zn,qS=l(()=>{"use strict";VS();ve=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UR=(e,t)=>e.length===0?`<p class="empty">${ve(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${ve(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${ve(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,eK=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,tK=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${ve(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,rK=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?tK(e.project):eK();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${ve(o.slug)}"${t.size===0||t.has(o.slug)?" checked":""} />
            <span><strong>${ve(o.name)}</strong> <span class="muted mono">(${ve(o.slug)})</span></span>
          </label>
          <p class="muted">${o.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`<form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${ve(e.project.id)}" />
        <p class="field-label">Installed</p>
        <p class="lede">Check the sets to write into this repo&apos;s <code>.cursor</code> tree, then pull.</p>
        ${r}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`},oK=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${ve(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${ve(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},Zn=e=>{let t=e.flashError?`<div class="alert-error">${ve(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${ve(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(p,m)=>`<a class="project-tab${e.activeTab===p?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${p}">${ve(m)}</a>`,n=e.composition?.items.filter(p=>p.kind==="workflow")??[],s=e.composition?.items.filter(p=>p.kind==="agent")??[],i="";e.activeTab==="harness"?i=rK({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=UR(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=UR(s,"No agents installed for this project yet."):i=oK({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});let a=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}?rename=1`,c=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${ve(a)}" target="_blank" rel="noopener noreferrer">Rename in Agent Witch Cloud\u2026</a>
    </div>`,d=cp(e.project.name)?"":`<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from Agent Witch Cloud only. The folder on this Mac is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from Agent Witch Cloud? Your repo folder on this Mac will stay.');">
          <input type="hidden" name="projectId" value="${ve(e.project.id)}" />
          <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
      </section>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${ve(e.project.name)}</h1>
      <p class="muted mono">${ve(e.project.projectFolderPath)}</p>
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
    </section>${d}`}});var nK,sK,BR,GR=l(()=>{"use strict";To();ir();nK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sK=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[Ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!nK(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=jt(n);return s===null?[]:[s]})}catch{return null}},BR=sK});var VR,KS,qR=l(()=>{"use strict";pe();To();qS();lp();GR();ap();Fu();Pa();Mt();VR=e=>({kind:"page",title:e.project.name,body:Zn({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Dr(e.layout),linkedSetSlugs:zr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),KS=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let o=await Xn(r,e.layout),n=No(o.projects,t);if(n===null)return{kind:"not_found"};let s=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??gt,a=s===null?null:await BR(s,n.id);if(a===null)return VR({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=SS({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return VR({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await ba(s,n.id,c.appliedSetSlugs),p=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${p.toString()}`}}});var iK,JS,KR=l(()=>{"use strict";iK=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,JS=iK});var JR,YR,aK,lK,dp,up,XR=l(()=>{"use strict";JR=require("node:child_process"),YR=require("node:util"),aK=(0,YR.promisify)(JR.execFile),lK=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},dp=async(e,t)=>{try{let{stdout:r}=await aK("git",t,{cwd:e,env:lK(),maxBuffer:1048576});return r.trim()}catch{return null}},up=async e=>{let t=await dp(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await dp(e,["rev-parse","--abbrev-ref","HEAD"]),o=await dp(e,["status","--porcelain"]),n=await dp(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var YS,ZR=l(()=>{"use strict";YS=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var cK,XS,QR=l(()=>{"use strict";cK=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},XS=cK});var dK,ZS,ex=l(()=>{"use strict";ir();dK=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[Ie]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},ZS=dK});var tx,$r,rx=l(()=>{"use strict";tx=require("node:child_process"),$r=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,tx.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var ox=l(()=>{"use strict";lp()});var wa,nx=l(()=>{"use strict";ir();wa=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[Ie]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var QS,sx=l(()=>{"use strict";ir();QS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[Ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var At=l(()=>{"use strict";lp();ap();FR();sa();tS();qR();Fu();KR();XR();ZR();QR();ex();rx();ox();nx();sx();BS();FS();Pa()});var pp,va,ix,eA,zo,tA=l(()=>{"use strict";pp=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},va=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=pp(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},ix=e=>e>=1&&e<=5,eA=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return pp(t,"UTC")},zo=e=>{let t=e.from??new Date,r=pp(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return va(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=va(r,e.timeZone,o,0),s=pp(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?va(eA(r),e.timeZone,o,0):n;if(!i&&ix(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=eA(a),ix(a.weekday))return va(a,e.timeZone,o,0);return va(eA(r),e.timeZone,o,0)}});var ax,rA,ar,oA=l(()=>{"use strict";ax=require("node:crypto");pe();At();tA();ip();rA=!1,ar=async e=>{if(rA)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=sp(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};rA=!0;let n=(0,ax.randomUUID)();try{let s=await Gn(t,"claude-cli",o.prompt);await $S(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=zo({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return np(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{rA=!1}}});var mp,lx=l(()=>{"use strict";pe();oA();ip();mp=async()=>{let e=$();if(e===null)return;let t=St(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await ar(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var _a=l(()=>{"use strict";ip();lx();oA();tA()});var cx=l(()=>{"use strict";_a()});var dx=l(()=>{"use strict";MS()});var ux=l(()=>{"use strict";dx()});var nA=l(()=>{"use strict";_a()});var uK,pK,Wa,sA=l(()=>{"use strict";cx();ux();nA();Ce();uK=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),pK=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??zo({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??zo({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Wa=e=>{let t=uK(e.profileEmail),r=St(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Yn(s);return i!==null?[pK(i,o.get(i.id))]:[]});return op(t,n),{ok:!0,writtenCount:n.length}}});var iA=l(()=>{"use strict";_a()});var px=l(()=>{"use strict";pe()});var mx=l(()=>{"use strict";sA();iA();nA();px()});var gx,La,ka,Ea,fx=l(()=>{"use strict";gx=g(require("node:os"));mx();ga();fa();La=e=>{if(!sr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Io(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=Wa({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},ka=async e=>{if(!sr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Io(t)?ar(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Ea=()=>{let e=$(),t=e!==null?St(e.layout):{version:1,automations:[]};return{ok:!0,hostname:gx.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var aA=l(()=>{"use strict";fx()});var gp=l(()=>{"use strict";te()});var fp=l(()=>{"use strict";te()});var hp,yx,Sx,hx,mK,gK,Qn,lA=l(()=>{"use strict";hp=g(require("node:fs")),yx=g(require("node:os")),Sx=g(require("node:path"));gp();fp();ea();Ce();hx=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},mK=e=>Sx.default.join(yx.default.homedir(),"Library","LaunchAgents",`${e}.plist`),gK=async e=>hp.default.existsSync(mK(e))?(await Ee(e)).ok:!1,Qn=async(e=k())=>{let t=hp.default.existsSync(vu(e)),r=!hp.default.existsSync(Xt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Qi(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await hx(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${se(e)}-wake`;await gK(i)&&s.push(i);for(let c of ee(e))(await Ee(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await hx(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var Ax=l(()=>{"use strict";te()});var es,Ca=l(()=>{"use strict";es="connection-health.json"});var jo,yp,fK,Ra,_e,cA,Sp,je,Ap=l(()=>{"use strict";jo=g(require("node:fs")),yp=g(require("node:path"));Ca();fK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ra=e=>e.profileEmail===null?yp.default.join(e.installDir,es):yp.default.join(e.installDir,"profiles",e.profileEmail,es),_e=e=>{let t=Ra(e);if(!jo.default.existsSync(t))return null;try{let r=JSON.parse(jo.default.readFileSync(t,"utf8"));return!fK(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},cA=e=>{let t=Ra(e);jo.default.existsSync(t)&&jo.default.rmSync(t,{force:!0})},Sp=(e,t)=>{let r=Ra(e),o=_e(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};jo.default.mkdirSync(yp.default.dirname(r),{recursive:!0}),jo.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},je=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var xa,bx=l(()=>{"use strict";Ca();Ap();xa=(e,t)=>{if(!t.socketOpen)return!1;let r=_e(e);return r===null?!1:!je(r,t.staleAfterMs??12e4,t.nowMs)}});var dA,Px=l(()=>{"use strict";Ap();dA=(e,t)=>!(e!==null&&!je(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var ts=l(()=>{"use strict";Ap();bx();Px();Ca()});var uA=l(()=>{"use strict";ts();te()});var pA=l(()=>{"use strict";ts()});var mA=l(()=>{"use strict";te()});var vx,wx,Ta,gA=l(()=>{"use strict";vx=g(require("node:fs"));Mt();gp();fp();Ce();wx=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},Ta=async(e=k())=>{if(!vx.default.existsSync(Xt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await wx())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of ee(e))(await Ee(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await wx();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var _x=l(()=>{"use strict";te()});var Wx,Do,fA,hK,yK,SK,Lx,AK,kx,rs,bp=l(()=>{"use strict";Wx=require("node:crypto"),Do=g(require("node:fs")),fA=g(require("node:path"));Ce();hK="watchdog-log.ndjson",yK=200,SK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Lx=(e=k())=>{let t=N(),r=t.installDir===e?t.logsDir:En({installDir:e,profileEmail:t.profileEmail});return fA.default.join(r,hK)},AK=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!SK(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},kx=(e,t=k())=>{let r={id:(0,Wx.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=Lx(t);Do.default.mkdirSync(fA.default.dirname(o),{recursive:!0});let n=Do.default.existsSync(o)?Do.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-yK+1)),JSON.stringify(r)];return Do.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},rs=(e=20,t=k())=>{let r=Lx(t);if(!Do.default.existsSync(r))return[];let o=Do.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=AK(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var hA,yA,SA,AA=l(()=>{"use strict";Tt();hA=lo.watchdogReinstallState,yA=900*1e3,SA=3e3});var Ex=l(()=>{"use strict";AA()});var Cx={};Rt(Cx,{verifyAgentWitchReviveAfterKickstart:()=>PK});var bK,PK,Rx=l(()=>{"use strict";Ex();pA();mA();Ce();bK=e=>new Promise(t=>{setTimeout(t,e)}),PK=async e=>{if(await bK(e.verifyDelayMs??SA),!await po(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),o=_e(r);return!je(o,e.staleAfterMs)}});var Ia,bA,wK,xx,Tx,PA,wA,vA=l(()=>{"use strict";Ia=g(require("node:fs")),bA=g(require("node:path"));V();AA();wK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xx=e=>bA.default.join(e,hA),Tx=(e=k())=>{let t=xx(e);if(!Ia.default.existsSync(t))return null;try{let r=JSON.parse(Ia.default.readFileSync(t,"utf8"));return!wK(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},PA=(e=k(),t=Date.now())=>{let r=Tx(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=yA:!0},wA=(e=k(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=xx(e);return Ia.default.mkdirSync(bA.default.dirname(o),{recursive:!0}),Ia.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var _A,Ix=l(()=>{"use strict";te();vA();_A=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!PA())return{attempted:!1,ok:!1,targets:e};wA();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Ee(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var Ox=l(()=>{"use strict";vA();Ix()});var WA=l(()=>{"use strict";tt()});var Mx=l(()=>{"use strict";tt()});var Nx,os,zx,jx,Dx,vK,_K,$x,WK,LK,Hx,Fx=l(()=>{"use strict";Nx=require("node:child_process"),os=g(require("node:fs")),zx=g(require("node:os")),jx=g(require("node:path")),Dx=require("node:util");WA();Mx();Ce();vK=(0,Dx.promisify)(Nx.execFile),_K=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$x=e=>{let t=pt(e),r=t===null?N():N(t);if(!os.default.existsSync(r.configPath))return null;try{let o=JSON.parse(os.default.readFileSync(r.configPath,"utf8"));return!_K(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},WK=e=>$x(e)?.wsUrl??null,LK=e=>{let t=WK(e);return t!==null?xe(t):Re(e)?.appOrigin??null},Hx=async e=>{let t=e?.installDir??k(),r=$x(t),o=r!==null?xe(r.wsUrl):LK(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=jx.default.join(zx.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{os.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??pt(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await vK("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{os.default.existsSync(i)&&os.default.unlinkSync(i)}}});var Ux={};Rt(Ux,{attemptAgentWitchWatchdogReinstall:()=>kK});var kK,Bx=l(()=>{"use strict";Ox();Fx();kK=async e=>_A(e,()=>Hx())});var Gx,Vx,qx,EK,CK,RK,Oa,LA=l(()=>{"use strict";Ax();uA();pA();mA();gA();lA();gp();fp();Ce();Mn();_x();bp();Gx=e=>e===null?N():N(e),Vx=async(e,t,r)=>{if(!await po(e))return"not_running";let n=Gx(t);if(ft(n))return"healthy";let s=_e(n);return je(s,r)?"stale_connection":"healthy"},qx=async e=>{let t=e?.staleAfterMs??12e4,r=k(),o=ee(r);return Promise.all(o.map(async n=>{let s=await Vx(n.launchAgentLabel,n.profileEmail,t),i=Gx(n.profileEmail),a=_e(i),c=await po(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:je(a,t),needsRevive:s!=="healthy",reason:s}}))},EK=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},CK=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",RK=async e=>{let t=await Ee(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(Rx(),Cx)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},Oa=async e=>{if(!mt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=k();await Qn(r),await Ta(r);let o=ee(r),n=[];for(let p of o){let m=await Vx(p.launchAgentLabel,p.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:m});continue}n.push(await RK({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let p=uo();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(Bx(),Ux)),m=await p(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&kx({event:CK(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:EK(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var Kx,Pp,Jx=l(()=>{"use strict";Kx=g(require("node:os"));uA();bp();LA();Pp=async()=>{let e=await qx(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:Kx.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:rs(1)[0]??null}}});var kA=l(()=>{"use strict";lA();LA();Jx();bp()});var Ma,Na,za,Yx=l(()=>{"use strict";te();kA();Ma=async()=>{await Qn();let e=ee(),t=[];for(let r of e){let o=await Ee(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=uo();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Na=Oa,za=Oa});var EA=l(()=>{"use strict";Yx()});var vp,wp,Xx,CA,Zx,xK,TK,IK,OK,MK,_p,Qx=l(()=>{"use strict";vp=require("node:child_process"),wp=g(require("node:fs")),Xx=g(require("node:os")),CA=g(require("node:path")),Zx=require("node:util");te();V();xK=(0,Zx.promisify)(vp.execFile),TK=()=>CA.default.join(Xx.default.homedir(),"Library","LaunchAgents"),IK=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await xK("launchctl",["bootout",r]).catch(()=>{})},OK=e=>{let t=CA.default.join(TK(),`${e}.plist`);wp.default.existsSync(t)&&wp.default.unlinkSync(t)},MK=e=>{(0,vp.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},_p=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=k();if(!wp.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Zt(e);for(let r of t)await IK(r),OK(r);return MK(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var e0,Wp,t0,ns,r0,NK,zK,jK,RA,DK,xA,o0=l(()=>{"use strict";e0=require("node:child_process"),Wp=g(require("node:fs")),t0=g(require("node:os")),ns=g(require("node:path")),r0=require("node:util");te();NK=(0,r0.promisify)(e0.execFile),zK=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],jK=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],RA=e=>{Wp.default.existsSync(e)&&Wp.default.rmSync(e,{force:!0})},DK=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await NK("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},xA=async e=>{let r=(e.listLaunchAgentLabels??Zt)(e.layout.installDir),o=e.launchAgentsDir??ns.default.join(t0.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??DK;for(let i of r)await n(i),RA(ns.default.join(o,`${i}.plist`));let s=ns.default.dirname(e.layout.configPath);for(let i of zK)RA(ns.default.join(s,i));for(let i of jK)RA(ns.default.join(e.layout.installDir,i));return Wp.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var TA,n0=l(()=>{"use strict";TA={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var IA,s0=l(()=>{"use strict";IA="unknown_identity"});var OA=l(()=>{"use strict";n0();s0()});var $K,MA,i0=l(()=>{"use strict";OA();$K=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),MA=e=>e.type!=="system.error"||!$K(e.payload)?!1:e.payload.errorCode===IA});var NA=l(()=>{"use strict";Qx();o0();i0()});var Lp=l(()=>{"use strict";te();tt();NA();kA()});var ss,kp,Ep=l(()=>{"use strict";Lp();ss=(e=20)=>rs(e),kp=Pp});var Cp,is,Rp,xp=l(()=>{"use strict";Lp();Cp=Wo,is=(e=20)=>wo(e),Rp=e=>_o(e)});var Tp,zA=l(()=>{"use strict";Lp();Tp=()=>_p()});var a0=l(()=>{"use strict";Gy();OS();aA();EA();Ep();xp();zA()});var l0={};Rt(l0,{buildAgentWitchAutomationStatusFromWakeServer:()=>Ea,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Cp,buildAgentWitchWakeHealthResponse:()=>ra,buildAgentWitchWakeIdentityResponse:()=>oa,buildAgentWitchWatchdogStatus:()=>kp,installHarnessFromWakeServer:()=>ha,readAgentWitchSelfUpdateLogEntries:()=>is,readAgentWitchWatchdogLogEntries:()=>ss,restartAgentWitchFromWakeServer:()=>za,reviveAgentWitchWebSocketFromWakeServer:()=>Na,runAgentWitchSelfUpdateFromWakeServer:()=>Rp,runAgentWitchUninstallLocalFromWakeServer:()=>Tp,runAutomationFromWakeServer:()=>ka,syncAutomationsFromWakeServer:()=>La,wakeAgentWitchLaunchAgents:()=>Ma});var c0=l(()=>{"use strict";a0()});var d0,u0,jA,DA,p0=l(()=>{"use strict";d0=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),u0=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?d0(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?d0(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},jA=e=>{let t=e.watchdogLogs.map(u0).join(""),r=e.updateLogs.map(u0).join("");return`<!doctype html>
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
</html>`},DA=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var m0,g0,f0=l(()=>{"use strict";m0=g(require("node:net")),g0=()=>new Promise((e,t)=>{let r=m0.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var h0,HK,$A,y0=l(()=>{"use strict";h0=g(require("node:net"));f0();ta();ea();Ce();HK=e=>new Promise(t=>{let r=h0.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),$A=async()=>{let e=k(),t=yt();if(await HK(t))return dC(t),t;let r=await g0();return _u(e,r),r}});var FK,HA,S0=l(()=>{"use strict";FK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),HA=e=>({force:FK(e)&&e.force===!0})});var ja=l(()=>{"use strict";ga();p0();y0();S0();Wh();eu();So()});var FA,j,UA,BA,Da,A0=l(()=>{"use strict";FA=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},UA=e=>{e.writeHead(403),e.end()},BA=e=>e.url?.split("?")[0]??"/",Da=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var bt=l(()=>{"use strict";A0()});var UK,b0,P0=l(()=>{"use strict";aA();bt();UK=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},b0=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,Ea(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await UK(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=La(t);return j(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await ka(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var BK,v0,w0,_0,GA,W0,VA=l(()=>{"use strict";BK=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],v0=e=>/embed|minilm|^bge-/i.test(e),w0=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),_0=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),GA=e=>e.filter(t=>t.trim().length>0&&!v0(t)),W0=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!v0(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>w0(s,o));if(n!==void 0)return n}for(let n of BK){let s=r.find(i=>w0(i,n));if(s!==void 0)return s}return r[0]??null}});var qA,E0,C0,Ip,R0,L0,k0,GK,VK,qK,KK,JK,YK,Pt,$a=l(()=>{"use strict";qA=require("node:child_process"),E0=g(require("node:fs")),C0=g(require("node:os")),Ip=g(require("node:path"));tt();ht();VA();R0=3e3,L0=["claude-cli","codex","cursor","antigravity"],k0={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},GK=(e,t)=>new Promise(r=>{let o=(0,qA.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},R0);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),VK=()=>{let e=C0.default.homedir();return["ollama",Ip.default.join(e,".local","bin","ollama"),Ip.default.join(e,".agent-witch","ollama","ollama"),Ip.default.join(e,".local-agent-witch","ollama","ollama")]},qK=e=>new Promise(t=>{let r=(0,qA.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},R0);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(_0(Buffer.concat(o).toString("utf8")))})}),KK=async()=>{for(let e of VK()){if(e!=="ollama"&&!E0.default.existsSync(e))continue;let t=await qK(e);if(t!==null)return t}return[]},JK=e=>{let t=e.installedWriterIds.map(s=>k0[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=de(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${k0[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},YK=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:Nn},Pt=async e=>{let t=L0.map(i=>{let a=du(i,e.commands);return GK(a.command,a.args)}),[r,...o]=await Promise.all([KK(),...t]),n=L0.flatMap((i,a)=>o[a]===!0?[i]:[]),s=W0(r,YK());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:JK({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var XK,ZK,KA,x0=l(()=>{"use strict";XK="http://127.0.0.1:11434",ZK=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},KA=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||XK;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?ZK(await o.json()):null}catch{return null}}});var JA=l(()=>{"use strict";ht();$a();x0();VA()});var QK,T0,I0=l(()=>{"use strict";JA();QK={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},T0=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:QK[t]})),ollamaModels:GA(e.ollamaModels)})});var e8,O0,M0=l(()=>{"use strict";JA();bt();I0();e8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},O0=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Pt({commands:ue({})});return j(e.response,200,{ok:!0,...T0({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await e8(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await KA({model:r,prompt:o});return n===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var t8,N0,z0=l(()=>{"use strict";OS();bt();t8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},N0=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await t8(e);if(t===null)return!0;let r=ha(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var j0=l(()=>{"use strict";At()});var YA,D0=l(()=>{"use strict";j0();fa();YA=e=>{if(!sr(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Je({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var $0,XA,ZA=l(()=>{"use strict";pe();At();fa();$0=e=>{if(!sr(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},XA=async e=>{let t=$0(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=$r("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=$();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=Y({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Je({projectFolderPath:r}),await wa(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var H0=l(()=>{"use strict";D0();ZA()});var F0,U0=l(()=>{"use strict";H0();ZA();bt();F0=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=YA(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await XA(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,o,r,e.cors.headers),!0}return!1}});var B0,G0=l(()=>{"use strict";ja();xp();Ep();B0=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=ss(50),r=is(50);return e.response.writeHead(200,DA()),e.response.end(jA({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var V0,q0=l(()=>{"use strict";Gy();bt();V0=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,ra(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,oa(),e.cors.headers),!0):!1});var K0,J0=l(()=>{"use strict";zA();bt();K0=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Tp();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var Y0,X0=l(()=>{"use strict";EA();bt();Y0=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Na();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await za();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Ma();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var Z0,Q0=l(()=>{"use strict";ja();xp();bt();Z0=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Cp();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=Da(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:is(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=HA(t),o=await Rp({force:r});return j(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var eT,tT=l(()=>{"use strict";Ep();bt();eT=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await kp();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=Da(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:ss(t)},e.cors.headers),!0}return!1}});var rT,oT=l(()=>{"use strict";P0();M0();z0();U0();G0();q0();J0();X0();Q0();tT();rT=[V0,B0,eT,Y0,Z0,K0,N0,F0,b0,O0]});var nT,sT=l(()=>{"use strict";oT();nT=async e=>{for(let t of rT)if(await t(e))return!0;return!1}});var r8,iT,aT=l(()=>{"use strict";ga();bt();sT();r8=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:BA(e),readJsonBody:()=>FA(e)}),iT=async(e,t,r)=>{let o=e.headers.origin,n=ep(o);try{if(o!==void 0&&o.length>0&&!n.allowed){UA(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=r8(e,t,r,n);if(await nT(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var lT,$o,Op,Mp=l(()=>{"use strict";lT=g(require("node:http"));ja();aT();$o=async()=>{let e=await $A(),t=lT.default.createServer((r,o)=>{iT(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Op=$o});var cT={};Rt(cT,{runAgentWitchBridgeCli:()=>o8});var o8,dT=l(()=>{"use strict";te();Mp();o8=async()=>{Ve("agent-witch-bridge");let e=await $o(),t=er(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var uT=l(()=>{"use strict";Mt()});var as,QA,pT=l(()=>{"use strict";as=(e,t,r)=>e===1?t:r,QA=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${as(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${as(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${as(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${as(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${as(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${as(p,"year","years")} ago`}});var Ho,eb,n8,s8,tb,Hr,Ha,rb,mT=l(()=>{"use strict";Ho=g(require("node:fs")),eb=g(require("node:path")),n8="local-ws-traffic.ndjson",s8=500,tb=e=>eb.default.join(e.logsDir,n8),Hr=(e,t)=>{let r=tb(e);Ho.default.mkdirSync(eb.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});Ho.default.appendFileSync(r,`${o}
`,"utf8")},Ha=(e,t=s8)=>{let r=tb(e);if(!Ho.default.existsSync(r))return[];let n=Ho.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},rb=e=>{let t=tb(e);Ho.default.existsSync(t)&&Ho.default.writeFileSync(t,"","utf8")}});var i8,gT,fT,hT=l(()=>{"use strict";OA();i8=new Set(Object.values(TA)),gT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fT=e=>{if(!gT(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!i8.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!gT(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var yT,ST=l(()=>{"use strict";yT=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var a8,l8,c8,Fa,AT=l(()=>{"use strict";ST();a8=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,l8=e=>a8.test(e),c8=e=>yT(e),Fa=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>Fa(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&l8(o)){r[o]=c8(n);continue}r[o]=Fa(n)}return r}});var Dt,ob,d8,u8,p8,nb,bT,PT,wT,m8,Np,Fo,zp,sb,vT=l(()=>{"use strict";Dt=g(require("node:fs")),ob=g(require("node:path"));hT();AT();d8="local-ws-trace.ndjson",u8=1e4,p8=1440*60*1e3,nb=e=>ob.default.join(e.logsDir,d8),bT=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},PT=e=>{if(!Dt.default.existsSync(e))return;let t=Dt.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-p8,n=t.filter(s=>{let i=bT(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-u8);Dt.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},wT=(e,t)=>{let r=nb(e);Dt.default.mkdirSync(ob.default.dirname(r),{recursive:!0}),Dt.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),PT(r)},m8=e=>e.parsed===null?{_empty:!0}:Fa(e.parsed),Np=(e,t,r)=>{let o=fT(r);wT(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:m8(o)})},Fo=(e,t)=>{wT(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Fa({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},zp=(e,t=80)=>{let r=nb(e);if(PT(r),!Dt.default.existsSync(r))return[];let o=Dt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=bT(s);i!==null&&n.push(i)}return n.reverse()},sb=e=>{let t=nb(e);Dt.default.existsSync(t)&&Dt.default.writeFileSync(t,"","utf8")}});var Fr,_T,g8,ib,jp,WT=l(()=>{"use strict";Fr=g(require("node:fs")),_T=g(require("node:path")),g8=256e3,ib=e=>{Fr.default.mkdirSync(_T.default.dirname(e),{recursive:!0}),Fr.default.writeFileSync(e,"","utf8")},jp=(e,t=g8)=>{if(!Fr.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Fr.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=Fr.default.openSync(e,"r");try{Fr.default.readSync(a,i,0,s,n)}finally{Fr.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var Ua=l(()=>{"use strict";mT();vT();WT()});var ab,lb,LT=l(()=>{"use strict";ab=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lb=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${ab(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${ab(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${ab(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var kT=l(()=>{"use strict";LT()});var cb,db=l(()=>{"use strict";cb=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var ub=l(()=>{"use strict";Ca()});var pb,mb,ET=l(()=>{"use strict";ub();pb=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},mb=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var CT=l(()=>{"use strict";db();ET()});var RT,Ba,gb,Ga=l(()=>{"use strict";db();RT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ba=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=RT(e),r=RT(cb(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},gb=`(function () {
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
})();`});var Uo,f8,fb,xT=l(()=>{"use strict";Uo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),f8=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},fb=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Uo(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Uo(r.direction):Uo(r.kind),i=`trace-body-${o}`,a=Uo(f8(r.body));return`<tr>
        <td title="${Uo(r.at)}">${Uo(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${Uo(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var IT,TT,hb,OT=l(()=>{"use strict";IT=g(require("node:path"));V();Mt();TT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hb=e=>{let t=se(e.installDir),o=`AW_HOME="$HOME/${IT.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${TT(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${TT(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var MT=l(()=>{"use strict";Ga();xT();OT();Ga()});var h8,lr,Va=l(()=>{"use strict";h8=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),lr=h8});var NT,zT,jT,DT,$T,HT,FT,ls=l(()=>{"use strict";NT="projects",zT="knowledge",jT="chunks.ndjson",DT="lessons.ndjson",$T="error-chunks.ndjson",HT="usage-stats.json",FT="knowledge-location.json"});var Dp,y8,$p,yb=l(()=>{"use strict";Dp=g(require("node:path"));ls();y8=(e,t)=>{let r=t.trim(),o=Dp.default.join(e.installDir,NT,r,zT);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:Dp.default.join(o,jT),memoryRunsFilePath:Dp.default.join(o,DT)}},$p=y8});var Sb,S8,UT,BT=l(()=>{"use strict";Sb=g(require("node:fs"));ls();Ro();S8=e=>{let t=ot(e.projectFolderPath),r=`${t.metaDirPath}/${FT}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};Sb.default.mkdirSync(t.metaDirPath,{recursive:!0}),Sb.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},UT=S8});var cs,VT,GT,A8,qT,KT=l(()=>{"use strict";cs=g(require("node:fs")),VT=g(require("node:path"));ho();Ro();yb();BT();GT=(e,t)=>{cs.default.existsSync(e)&&(cs.default.existsSync(t)&&cs.default.statSync(t).size>0||(cs.default.mkdirSync(VT.default.dirname(t),{recursive:!0}),cs.default.copyFileSync(e,t)))},A8=e=>{let t=ot(e.projectFolderPath),r=$p(e.layout,e.projectId),o=`${t.memoryDirPath}/${Cn}`;GT(t.ragChunksFilePath,r.ragChunksFilePath),GT(o,r.memoryRunsFilePath),UT({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},qT=A8});var Ab,b8,JT,YT=l(()=>{"use strict";Ab=g(require("node:fs"));Ro();b8=e=>{let t=ot(e);if(!Ab.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(Ab.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},JT=b8});var XT,P8,ds,Hp=l(()=>{"use strict";XT=g(require("node:path"));ho();Ro();KT();YT();yb();P8=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=JT(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){qT({layout:e.layout,projectFolderPath:t,projectId:o});let s=$p(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=ot(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:XT.default.join(n.memoryDirPath,Cn),projectId:null}},ds=P8});var Fp,v8,Up,bb=l(()=>{"use strict";Fp=g(require("node:fs"));ls();v8=(e,t=500)=>{if(!Fp.default.existsSync(e))return;let r=Fp.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Fp.default.writeFileSync(e,`${o.join(`
`)}
`)},Up=v8});var Bp,_8,Bo,Pb=l(()=>{"use strict";Bp=g(require("node:path"));ls();Hp();_8=e=>{let t=ds(e);if(t===null)return null;let r=Bp.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Bp.default.join(r,HT),errorChunksFilePath:Bp.default.join(r,$T)}},Bo=_8});var QT,qa,eI,ZT,wb,tI,k8,vb,rI,_b,Wb,Lb,kb=l(()=>{"use strict";QT=require("node:crypto"),qa=g(require("node:fs")),eI=g(require("node:path"));Va();ls();Pb();ZT=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),wb=e=>{if(!qa.default.existsSync(e))return ZT();try{let t=JSON.parse(qa.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return ZT()},tI=(e,t)=>{qa.default.mkdirSync(eI.default.dirname(e),{recursive:!0}),qa.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},k8=e=>{let t=lr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,QT.createHash)("sha256").update(o).digest("hex").slice(0,16)},vb=e=>{let t=Bo(e);return t===null?null:wb(t.usageStatsFilePath)},rI=e=>{if(e.chunkIds.length===0)return;let t=Bo(e);if(t===null)return;let r=wb(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;tI(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},_b=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=Bo(e);if(r===null)return null;let o=k8(t),n=wb(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return tI(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},Wb=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,Lb=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var Ka,oI,E8,C8,nI,R8,Eb,Ja,us,Cb,ps,Rb,xb=l(()=>{"use strict";Ka=g(require("node:fs")),oI=g(require("node:path"));Va();Hp();bb();kb();E8="http://127.0.0.1:11434",C8="nomic-embed-text",nI=(e,t,r)=>ds({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,R8=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},Eb=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},Ja=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||E8,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||C8;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},us=(e,t,r)=>{let o=nI(e,t,r);if(o===null||!Ka.default.existsSync(o))return[];let n=Ka.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},Cb=async e=>{let t=lr(e.text),r=Eb(t);if(r.length===0)return 0;let o=nI(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;Ka.default.mkdirSync(oI.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await Ja(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};Ka.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return Up(o),n},ps=async e=>{let t=await Ja(e.query);if(t===null)return[];let r=e.minScore??0,s=us(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:R8(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return rI({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},Rb=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Ya,sI,x8,T8,Tb,Ib,Ob,iI=l(()=>{"use strict";Ya=g(require("node:fs")),sI=g(require("node:path"));Va();Pb();bb();xb();x8=e=>{if(!Ya.default.existsSync(e))return[];let t=Ya.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},T8=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},Tb=async e=>{let t=Bo(e);if(t===null)return 0;let r=lr(e.text),o=Eb(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;Ya.default.mkdirSync(sI.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await Ja(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};Ya.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Up(n,200),s},Ib=async e=>{let t=Bo(e);if(t===null)return[];let r=await Ja(e.query);if(r===null)return[];let o=e.minScore??.3;return x8(t.errorChunksFilePath).map(s=>({chunk:s,score:T8(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},Ob=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Mb=l(()=>{"use strict";xb();kb();iI()});var Nb,aI=l(()=>{"use strict";Nb={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var lI=l(()=>{"use strict";aI()});var ye,zb,jb=l(()=>{"use strict";lI();ye=Nb,zb=`
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
`.trim()});var I8,O8,Db,cI,$b,dI=l(()=>{"use strict";jb();Ga();I8=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,O8=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],Db=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cI=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${I8}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,$b=e=>{let t=O8.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=Db(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=Db(e.installBundleVersionLabel?.trim()??"unknown"),s=cI("brand brand-in-sidebar",n),i=cI("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${Db(e.title)} \xB7 Agent Witch Local</title>
  <style>${zb}</style>
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
  <script>${gb}</script>
</body>
</html>`}});var Gp,Xa,Vp=l(()=>{"use strict";Gp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Xa=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Gp(e.syncMessage)}</p>`:"",o=Gp(e.manageHref),n=Gp(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Gp(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var Hb,Fb,Ub,uI=l(()=>{"use strict";Hb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,Fb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,Ub=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var pI=l(()=>{"use strict";dI();Vp();uI()});var ms,Bb,mI=l(()=>{"use strict";Ga();ms=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bb=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${ms(e.wakeError)}</div>`:"",a=Ba(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${ms(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${ms(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${ms(o)}</p>
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
        <p class="home-card-meta">${ms(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${ms(n)}</p>
      </a>
    </div>`}});var gI=l(()=>{"use strict";mI()});var qp,Kp,Jp,fI,Gb=l(()=>{"use strict";qp="support-reply",Kp="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",Jp=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),fI=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Yp,hI,yI=l(()=>{"use strict";Gb();Yp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hI=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions (pass <strong>70</strong>, up to <strong>5</strong> scored revisions; judge scores prompt text only), (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Writers and folder</h2>
      <p>You choose the judge and the improver. Each one has an optional instructions field, used with the goal. In wizard step 2 the judge scores prompt wording only. In step 4 the runner executes in the folder you chose and the judge scores that run. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves the judge and improver blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder. When only one writer is installed, omit judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${Yp(Kp)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Yp(Jp)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Yp(fI)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Yp(qp)}">Run this sample</a>
      </div>
    </section>`});var C,gs=l(()=>{"use strict";C=e=>e==="passed"||e==="stopped"||e==="failed"});var SI,Vb,Go,qb,Za=l(()=>{"use strict";SI="Stopped at the round limit. The best prompt is kept.",Vb="Stopped because the score stopped rising. The best prompt is kept.",Go="Finished. The best prompt is the result.",qb="Wizard ended. Progress from finished steps is kept."});var Ur,Kb=l(()=>{"use strict";Ur=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var M8,N8,Qa,AI,Xp=l(()=>{"use strict";M8=/\n+|;\s+/,N8=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,Qa=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(M8).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,N8(s)]},[]);return[...t,...o]},[]),AI=e=>{let t=Qa(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ie,fs=l(()=>{"use strict";ie=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var el,Jb=l(()=>{"use strict";Xp();fs();el=e=>{let t=[...e.priorRounds,e.current],r=ie(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:AI(o)}}});var Yb,z8,j8,Zp,Xb=l(()=>{"use strict";Yb={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},z8=e=>{try{let t=JSON.parse(e.fragment);return{...Yb,objects:[...e.objects,t]}}catch{return{...Yb,objects:e.objects}}},j8=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:z8(r)},Zp=e=>[...e].reduce(j8,Yb).objects});var D8,Zb,$8,bI,Qb=l(()=>{"use strict";Xb();D8=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},Zb=e=>{let t=Zp(e).filter(D8),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},$8=(e,t)=>({...e,passed:e.score>=t}),bI=(e,t)=>{let r=Zb(e);return r===null?null:$8(r,t)}});var eP,tP,Qp=l(()=>{"use strict";eP="The judge reply needs a score and a reason.",tP="The improver reply was empty."});var PI,wI=l(()=>{"use strict";PI=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var vI,_I=l(()=>{"use strict";vI=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var F8,WI,LI=l(()=>{"use strict";wI();_I();Za();Xp();F8=e=>{let t=Qa(e);return t.length===0?Vb:`${Vb} Avoid: ${t.join("; ")}.`},WI=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:SI};if(PI(e.scores)>=3){let t=e.scores.map((r,o)=>({score:r,reasons:e.reasons?.[o]??""}));return{type:"stopped",errorMessage:F8(vI(t))}}return null}});var Br,U8,Vo,kI,em=l(()=>{"use strict";Br=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},U8=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,Vo=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",U8(e.tokens),`Delay: ${Br(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},kI=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var B8,EI,CI=l(()=>{"use strict";Qb();B8=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,EI=e=>{let r=(B8.exec(e)?.[1]??e).trim();return r.length===0||Zb(r)!==null?null:r}});var RI,tm,xI=l(()=>{"use strict";em();CI();Qp();RI=e=>({type:"call",role:"judge",choice:e.choice,prompt:kI({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),tm=e=>{let t=EI(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:tP}}:{nextPrompt:t,continuation:RI({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var rP,TI=l(()=>{"use strict";Kb();Jb();Qb();Qp();Za();LI();Qp();xI();rP=e=>{let t=bI(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:eP}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=WI({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=el({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:Ur({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var tl,oP=l(()=>{"use strict";tl=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var II=l(()=>{"use strict"});var OI=l(()=>{"use strict"});var G8,MI,NI=l(()=>{"use strict";G8=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},MI=e=>[...e].reduce(G8,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var V8,zI,jI=l(()=>{"use strict";V8=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},zI=e=>[...e].reduce(V8,{out:"",inString:!1,escaped:!1}).out});var q8,K8,DI,$I=l(()=>{"use strict";NI();jI();q8=e=>e.charCodeAt(0)===65279?e.slice(1):e,K8=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},DI=e=>zI(MI(K8(q8(e))))});var J8,Y8,X8,HI,Z8,qo,rl=l(()=>{"use strict";Xb();$I();J8=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},Y8=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},X8=e=>[...e].reduce(Y8,{out:"",inString:!1,escaped:!1}).out,HI=e=>{let t=Zp(e);return t.length===0?null:t[t.length-1]},Z8=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},qo=e=>{let t=DI(J8(e)),r=HI(t);if(r!==null)return r;let o=X8(t),n=HI(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw Z8(i)}}});var FI=l(()=>{"use strict";Za();rl()});var UI=l(()=>{"use strict"});var BI=l(()=>{"use strict";UI()});var Ko,GI=l(()=>{"use strict";Ko=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var Q8,sP,VI=l(()=>{"use strict";em();Q8=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,sP=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",Q8(e.tokens),`Delay: ${Br(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var e4,t4,r4,iP,qI=l(()=>{"use strict";e4=/[A-Za-z0-9_./~-]{3,180}/g,t4=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,r4=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||t4.test(t)},iP=(e,t=12)=>{let r=[];for(let o of e.matchAll(e4)){let n=o[0].replace(/\.+$/,"");if(!(!r4(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var ol,KI=l(()=>{"use strict";ol=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var rm,aP,JI,nl,lP=l(()=>{"use strict";rm=e=>Math.floor(e/2),aP=e=>Math.max(rm(e)+1,e-20),JI=(e,t)=>e>=t?"passes":e>=aP(t)?"close":e>=rm(t)?"weak":"bad",nl=e=>[{band:"bad",label:`0\u2013${rm(e)-1} bad`},{band:"weak",label:`${rm(e)}\u2013${aP(e)-1} weak`},{band:"close",label:`${aP(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var om,cP=l(()=>{"use strict";lP();om=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${JI(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var wt,dP=l(()=>{"use strict";wt=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var YI,XI=l(()=>{"use strict";YI=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var o4,n4,ZI,QI=l(()=>{"use strict";gs();cP();dP();XI();o4=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],n4=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",ZI=e=>{let t=e.wizard;if(t===void 0)return[];let r=wt(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=o4.map((h,y)=>{let u=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:h,state:u,detail:null}}).filter((h,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=om(e),d=c.filter(h=>h.id==="round-0"),p=YI(t)&&(!n||a)?c.filter(h=>h.id!=="round-0"):[],m=C(e.status)&&!s,b=m?[{id:"end",label:n4(e),state:"done",detail:e.errorMessage}]:[];if(m&&b.length>0){let h=Math.min(r,i.length),y=i.slice(0,h).map(u=>({...u,state:"done"}));return[...d,...y,...b,...p]}return[...d,...i,...p,...b]}});var s4,uP,eO=l(()=>{"use strict";gs();cP();QI();s4=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",uP=e=>{if(e.wizard!==void 0)return ZI(e);let t=om(e),r=C(e.status)?[{id:"end",label:s4(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var sl,tO=l(()=>{"use strict";sl=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var rO=l(()=>{"use strict";Mt()});var oO,il,al,ys,nm,pP,nO=l(()=>{"use strict";rO();oO="/prompt-optimizer/agent",il=`${tr}${oO}`,al=`${tr}/prompt-optimizer`,ys="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",nm=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${ys}`,pP="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var cr=l(()=>{"use strict"});var re,ll=l(()=>{"use strict";cr();re=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var mP,sO=l(()=>{"use strict";mP="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var iO,aO=l(()=>{"use strict";iO=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var cl,cO=l(()=>{"use strict";aO();cr();cl=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:iO(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null})});var gP,dO=l(()=>{"use strict";cr();gP=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null})});var fP,uO=l(()=>{"use strict";cr();fP=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var pO,dl,mO=l(()=>{"use strict";pO=["generalize","evaluate","separate","optimize_modules"],dl=(e,t)=>{let r=pO.indexOf(t);if(r===-1)return e;let o=pO.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var sm,hP=l(()=>{"use strict";Xp();sm=e=>{let t=Qa(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var ul,gO=l(()=>{"use strict";hP();ul=e=>{let t=sm(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var a4,l4,c4,fO,hO=l(()=>{"use strict";a4=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l4=/^\{\{[a-zA-Z0-9_-]+\}\}$/,c4=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(a4(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},fO=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>l4.test(n)?n:c4(n,r)).join("")}});var yP,yO=l(()=>{"use strict";hO();yP=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:fO(o.prompt,t)}))}))});var d4,pl,SO=l(()=>{"use strict";cr();hP();d4=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),pl=e=>{let t=sm(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=d4(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var ml,AO=l(()=>{"use strict";oP();ml=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return tl({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var gl,AP=l(()=>{"use strict";fs();gl=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ie(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var bP,bO=l(()=>{"use strict";AP();bP=e=>{let t=gl({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Jo,PO=l(()=>{"use strict";Jo=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var u4,p4,oe,im=l(()=>{"use strict";ll();u4=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},p4=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,oe=e=>{let t=re(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:u4(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>p4(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var wO,vO=l(()=>{"use strict";ll();im();wO=e=>{let t=oe(e.wizard),r=re(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var PP,_O=l(()=>{"use strict";vO();PP=e=>{let t=wO({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var m4,g4,wP,WO,LO=l(()=>{"use strict";m4=/^[a-z0-9][a-z0-9-]{0,62}$/,g4=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return m4.test(t)?t:""},wP=e=>e.replace(/\s+/gu," ").trim(),WO=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=g4(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=wP(n.name),a=wP(n.description),c=wP(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var kO,EO,CO=l(()=>{"use strict";kO=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},EO=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var vP,RO=l(()=>{"use strict";rl();LO();CO();vP=(e,t)=>{let r=(()=>{try{return qo(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(kO(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(EO).filter(a=>a!==null),i=WO({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var _P,xO=l(()=>{"use strict";_P=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var WP,TO=l(()=>{"use strict";WP=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var LP,IO=l(()=>{"use strict";ll();im();LP=e=>{let t=oe(e.wizard),r=re(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var kP,OO=l(()=>{"use strict";kP=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var vt,f4,EP,MO=l(()=>{"use strict";vt=g(di());rl();f4=(0,vt.isType)({name:vt.isNonEmptyString,description:vt.isString,sampleValue:vt.isString}),EP=e=>{let t=qo(e);if(!(0,vt.isType)({templatedPrompt:vt.isNonEmptyString,variables:(0,vt.isArrayWithEachItem)(f4)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var ae,h4,y4,CP,NO=l(()=>{"use strict";ae=g(di());cr();rl();h4=(0,ae.isType)({id:ae.isNonEmptyString,title:ae.isNonEmptyString,prompt:ae.isNonEmptyString,order:ae.isNumber}),y4=(0,ae.isType)({id:ae.isNonEmptyString,title:ae.isNonEmptyString,summary:ae.isString,topology:(0,ae.isOneOf)("chain","parallel"),modules:(0,ae.isArrayWithEachItem)(h4),recommended:ae.isBoolean}),CP=e=>{let t=qo(e);if(!(0,ae.isType)({options:(0,ae.isArrayWithEachItem)(y4)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Ss,zO=l(()=>{"use strict";Ss=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var S4,RP,xP=l(()=>{"use strict";S4=/\{\{([a-zA-Z0-9_-]+)\}\}/g,RP=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(S4,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var _t,Wt,jO=l(()=>{"use strict";fs();xP();_t=e=>RP(e.templatedPrompt,e.variables),Wt=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ie(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??_t(e.wizard)}});var A4,Yo,DO=l(()=>{"use strict";A4=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Yo=(e,t)=>e.replace(A4,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var b4,Xo,am=l(()=>{"use strict";b4=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Xo=e=>{let t=new Set,r=[];for(let o of e.matchAll(b4)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var fl,$O=l(()=>{"use strict";am();fl=e=>e.variables.length>0||Xo(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var TP,IP=l(()=>{"use strict";cr();TP=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var hl,HO=l(()=>{"use strict";fs();IP();hl=e=>{let t=e.wizard.evaluateSelectedRound??ie(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:TP(r.judgement,e.passScore)}});var yl,FO=l(()=>{"use strict";yl=e=>e.length===1&&e[0].modules.length===1});var OP,UO=l(()=>{"use strict";OP=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Se,lm,Sl=l(()=>{"use strict";Se=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),lm=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var BO,GO=l(()=>{"use strict";Sl();BO=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Se("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Se("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Se("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var VO,qO=l(()=>{"use strict";gs();Sl();VO=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!C(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Se("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),Se("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Se("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",lm(e.writerLabel,e.folder)),Se("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Se("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var KO,JO=l(()=>{"use strict";Sl();KO=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Se("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Se("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Se("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var YO,XO=l(()=>{"use strict";Sl();YO=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Se("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Se("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",lm(e.writerLabel,e.folder)),...r?[Se("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var cm,ZO=l(()=>{"use strict";gs();GO();qO();JO();XO();cm=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(C(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return VO(r);case"evaluate":return BO({...r,currentRound:e.currentRound});case"separate":return YO(r);case"optimize_modules":return KO({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Al,ur,QO=l(()=>{"use strict";Al=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),ur=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var P4,dm,MP,eM=l(()=>{"use strict";am();P4="wizardParam_",dm=e=>`${P4}${e}`,MP=e=>{let t=Xo(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=dm(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var Xe,tM=l(()=>{"use strict";Xe=["generalize","evaluate","separate","optimize_modules"]});var R=l(()=>{"use strict";gs();Za();TI();Kb();em();oP();II();OI();FI();BI();GI();VI();qI();Jb();KI();fs();eO();dP();lP();tO();nO();cr();ll();sO();cO();dO();uO();mO();gO();yO();SO();AO();AP();bO();PO();im();_O();RO();xO();TO();IO();OO();MO();NO();zO();jO();xP();DO();am();$O();HO();FO();IP();UO();ZO();QO();eM();tM()});var NP,pm,w4,oM,nM=l(()=>{"use strict";NP=g(require("node:fs")),pm=g(require("node:path")),w4=e=>pm.default.join(pm.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),oM=(e,t)=>{let r=w4(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;NP.default.mkdirSync(pm.default.dirname(r),{recursive:!0}),NP.default.appendFileSync(r,o,"utf8")}});var As,sM,v4,iM,_4,aM,$t,J,lM,D,Ze=l(()=>{"use strict";As=g(require("node:fs")),sM=g(require("node:path"));R();nM();v4=e=>e.wizard===void 0?e:{...e,wizard:gP(e.wizard)},iM=new Set,_4=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),aM=(e,t)=>{As.default.mkdirSync(sM.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;As.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),As.default.renameSync(r,e)},$t=e=>{if(!As.default.existsSync(e))return[];try{let t=JSON.parse(As.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(_4).map(v4):[]}catch{return[]}},J=(e,t)=>$t(e).find(r=>r.id===t)??null,lM=(e,t)=>{iM.add(t);let r=$t(e).filter(o=>o.id!==t);aM(e,r)},D=(e,t)=>{if(iM.has(t.id))return;let r=$t(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];aM(e,o),oM(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var cM,mm,zP,Qo,jP,Qe,en,le,He=l(()=>{"use strict";cM=g(require("node:fs")),mm=g(require("node:os")),zP=g(require("node:path"));At();Qo="~",jP=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Qe=e=>{let t=mm.default.homedir(),r=jP(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},en=e=>{let t=e.trim().length===0?"~":e.trim(),r=rt(t),o=zP.default.isAbsolute(r)?jP(r):jP(zP.default.resolve(mm.default.homedir(),r));try{if(!cM.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:Qe(o)}},le=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:mm.default.homedir()});var bl=l(()=>{"use strict";ht();$a();uu()});var W4,dM,uM=l(()=>{"use strict";bl();W4=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,dM=e=>{let t=Hn(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(W4)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var L4,k4,pM,gm,mM,E4,nt,gM,fM,hM,Gr=l(()=>{"use strict";bl();uM();L4="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",k4="The writer waited on terminal input and did not return a prompt.",pM=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,gm=e=>{let t=e.trim();if(t.length===0||t.length>=500||!pM.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>pM.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},mM=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},E4=e=>gm(e.stdout)??gm(e.stderr)??(mM(e.replyFile)?gm(e.replyFile):null),nt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return L4;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?k4:null},gM=e=>{let t=e.trim();return t.length===0?null:nt(t)!==null?t:gm(t)??(mM(t)?t:null)},fM=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],hM=e=>{let t=e.replyFileText?.trim()??"",r=nt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=E4({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null)return{ok:!1,errorMessage:o};let n=dM([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Hn(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply."}}});var bs,Ht,Pl,yM,fm,C4,SM,AM,bM,DP=l(()=>{"use strict";bs=g(require("node:fs")),Ht=g(require("node:path")),Pl=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},yM=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),fm=(e,t)=>{let r=Pl(e);return r.length>0?r:Pl(t)},C4=e=>{let t=fm(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${yM(o)}`,...n.length>0?[`description: ${yM(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},SM=e=>`.cursor/skills/${e}/SKILL.md`,AM=(e,t)=>{let r=Pl(t);if(r.length===0)return!1;let o=Ht.default.resolve(e),n=Ht.default.resolve(o,".cursor","skills"),s=Ht.default.resolve(o,SM(r));return s.startsWith(`${n}${Ht.default.sep}`)?bs.default.existsSync(s):!1},bM=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(fm(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Ht.default.resolve(e.workingDirectory);try{if(!bs.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=C4({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=SM(r.slug),n=Ht.default.resolve(t,".cursor","skills"),s=Ht.default.resolve(t,o);if(!s.startsWith(`${n}${Ht.default.sep}`))return{ok:!1,errorCode:"path"};if(bs.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{bs.default.mkdirSync(Ht.default.dirname(s),{recursive:!0}),bs.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var R4,PM,wM,vM=l(()=>{"use strict";R();R();Ze();He();Gr();DP();R4=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,PM=e=>{let t=e.get("savedSkill");return t!==null&&R4.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},wM=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=J(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!C(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ie(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||nt(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=bM({workingDirectory:le(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var Vr,wl=l(()=>{"use strict";R();Vr=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=OP(t);return{...e,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Al(r.variables)},updatedAt:new Date().toISOString()}}});var qr,vl=l(()=>{"use strict";qr=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var T,x4,hm,ne,tn,WM,_M,LM,kM,Ae=l(()=>{"use strict";T="manual",x4=["claude-cli","codex","cursor","antigravity"],hm={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ne=e=>e===T?"You":e in hm?hm[e]:e,tn=e=>x4.filter(t=>e.includes(t)),WM=e=>{let t=tn(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},_M=(e,t)=>t===T?T:e.find(r=>r===t)??null,LM=(e,t,r)=>{let o=tn(e),n=_M(o,t),s=_M(o,r);return n===null||s===null?null:{judge:n,improver:s}},kM=(e,t,r)=>{let o=tn(e);return t===null||t.trim()===""?r!==T?r:o[0]??null:t===T?null:o.find(n=>n===t)??null}});var $P,EM,CM=l(()=>{"use strict";$P={ok:!1,errorMessage:"Stopped.",stopped:!0},EM=(e,t,r)=>{if(t===void 0)return;let o=()=>{e.kill("SIGTERM"),r($P)};if(t.aborted){o();return}t.addEventListener("abort",o,{once:!0})}});var RM,_l,xM,HP,T4,I4,O4,Fe,Ps=l(()=>{"use strict";RM=require("node:child_process"),_l=g(require("node:fs")),xM=g(require("node:os")),HP=g(require("node:path"));bl();CM();Gr();T4=["claude-cli","codex","cursor","antigravity"],I4=18e4,O4=e=>T4.includes(e),Fe=e=>new Promise(t=>{if(e.signal?.aborted){t($P);return}if(!O4(e.writerAgent)){t({ok:!1,errorMessage:"The writer did not reply."});return}let r=e.writerAgent,o=Nt(r,e.prompt,ue({}));if(o===null){t({ok:!1,errorMessage:"The writer did not reply."});return}if(!_l.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=HP.default.join(_l.default.mkdtempSync(HP.default.join(xM.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),s=fM({writerAgent:r,baseArgs:o.args,replyPath:n}),i=[],a=[],c={settled:!1,timer:void 0},d=(0,RM.spawn)(o.command,[...s],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),p=m=>{c.settled||(c.settled=!0,clearTimeout(c.timer),t(m))};EM(d,e.signal,p),c.timer=setTimeout(()=>{d.kill("SIGTERM"),p({ok:!1,errorMessage:"The writer did not reply."})},e.timeoutMs??I4),d.stdout.on("data",m=>{i.push(Buffer.from(m))}),d.stderr.on("data",m=>{a.push(Buffer.from(m))}),d.on("error",()=>p({ok:!1,errorMessage:"The writer did not reply."})),d.on("close",()=>{let m=_l.default.existsSync(n)?_l.default.readFileSync(n,"utf8"):null;p(hM({writerAgent:r,stdout:Buffer.concat(i).toString("utf8"),stderr:Buffer.concat(a).toString("utf8"),replyFileText:m}))})})});var TM,M4,Wl,ym,Sm=l(()=>{"use strict";R();Ae();TM=e=>e===T?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},M4=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Wl=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=rP({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:TM(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:ol(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=M4(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i}},ym=(e,t,r=null)=>{let o=tm({raw:t,judge:TM(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Am,FP=l(()=>{"use strict";Am=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var MM,bm,Pm,IM,OM,UP,N4,NM,BP,z4,zM,j4,D4,jM,DM=l(()=>{"use strict";MM=require("node:child_process"),bm=g(require("node:fs")),Pm=g(require("node:path"));R();IM=4e3,OM=12e3,UP=(e,t)=>{let r=(0,MM.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},N4=e=>UP(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",NM=e=>{let t=UP(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},BP=(e,t)=>{let r=Pm.default.resolve(e,t),o=Pm.default.relative(e,r);if(o.startsWith("..")||Pm.default.isAbsolute(o)||!bm.default.existsSync(r)||!bm.default.statSync(r).isFile())return null;let n=bm.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>IM?`${n.slice(0,IM)}
\u2026truncated`:n},z4=e=>e.length>OM?`${e.slice(0,OM)}
\u2026truncated`:e,zM=e=>{let t=iP(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,BP(e.workingDirectory,n)])),o=N4(e.workingDirectory);return{git:o,status:o?NM(e.workingDirectory):{},files:r,paths:t}},j4=(e,t)=>{let r=UP(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=BP(e,t);return o===null?`${t} is missing.`:o},D4=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",jM=e=>{let t=e.before.git?NM(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=BP(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>j4(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:D4(e.before.git,e.before.paths.length>0),evidence:z4(i.join(`

`))}}});var qP,U,KP,Le,$M,$4,H4,HM,ws,FM,vs,F4,U4,Ll,GP,VP,B4,UM,G4,V4,q4,BM,K4,GM,VM,J4,Y4,qM,KM=l(()=>{"use strict";qP=require("node:child_process"),U=g(require("node:fs")),KP=g(require("node:os")),Le=g(require("node:path")),$M=8e6,$4=16e6,H4=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],HM=(e,t)=>{let r=(0,qP.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},ws=(e,t)=>(0,qP.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,FM=e=>{let t=HM(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},vs=(e,t)=>{let r=Le.default.resolve(e,t),o=Le.default.relative(e,r);return o.startsWith("..")||Le.default.isAbsolute(o)?null:r},F4=(e,t)=>{let r=vs(e,t);if(r===null||!U.default.existsSync(r))return null;let o=U.default.statSync(r);return!o.isFile()||o.size>$M?null:U.default.readFileSync(r)},U4=(e,t,r)=>{let o=vs(e,t);o!==null&&(U.default.mkdirSync(Le.default.dirname(o),{recursive:!0}),U.default.writeFileSync(o,r))},Ll=(e,t)=>{let r=vs(e,t);r===null||!U.default.existsSync(r)||U.default.rmSync(r,{recursive:!0,force:!0})},GP=(e,t)=>ws(e,["cat-file","-e",`HEAD:${t}`]),VP=e=>{let t=HM(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},B4=e=>Le.default.resolve(e)!==Le.default.resolve(KP.default.homedir()),UM=e=>{if(!U.default.existsSync(e))return 0;let t=U.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?U.default.readdirSync(e).reduce((r,o)=>r+UM(Le.default.join(e,o)),0):0},G4=(e,t,r)=>{let o=vs(e,r);if(o===null||!U.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(UM(o)>$4)return{relativePath:r,existed:!0,copyDir:null};let n=Le.default.join(t,"cache",r);return U.default.mkdirSync(Le.default.dirname(n),{recursive:!0}),U.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},V4=400,q4=32e6,BM=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!U.default.existsSync(s)))for(let i of U.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=Le.default.join(s,i),c=U.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>$M)){if(t.length>=V4||r+c.size>q4){o=!1;return}r+=c.size,t.push(Le.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},K4=(e,t,r)=>{let o=vs(e,r);if(o===null||!U.default.existsSync(o))return null;let n=F4(e,r);if(n===null)return"skip";let s=Le.default.join(t,"files",r);return U.default.mkdirSync(Le.default.dirname(s),{recursive:!0}),U.default.writeFileSync(s,n),s},GM=e=>{let t=U.default.mkdtempSync(Le.default.join(KP.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?FM(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:BM(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,K4(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?VP(e.workingDirectory):null,isolateCaches:B4(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:H4.map(i=>G4(e.workingDirectory,t,i))}},VM=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Ll(e.workingDirectory,t);return}U4(e.workingDirectory,t,U.default.readFileSync(r))}},J4=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?VM(e,t):GP(e.workingDirectory,t)?ws(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Ll(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&GP(e.workingDirectory,t)&&ws(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!GP(e.workingDirectory,t)&&ws(e.workingDirectory,["reset","-q","HEAD","--",t])},Y4=(e,t)=>{let r=vs(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Ll(e.workingDirectory,t.relativePath),U.default.mkdirSync(Le.default.dirname(r),{recursive:!0}),U.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Ll(e.workingDirectory,t.relativePath);return}if(U.default.existsSync(r))for(let o of U.default.readdirSync(r)){let n=Le.default.join(r,o);U.default.statSync(n).mtimeMs>=e.startedMs-1e3&&U.default.rmSync(n,{recursive:!0,force:!0})}}}},qM=e=>{try{if(e.git){if(VP(e.workingDirectory)!==e.head&&(!(e.head===null?ws(e.workingDirectory,["update-ref","-d","HEAD"]):ws(e.workingDirectory,["reset","--hard",e.head]))||VP(e.workingDirectory)!==e.head))throw new Error("head");let r=FM(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))J4(e,o)}else{if(e.complete)for(let t of BM(e.workingDirectory).paths)e.files[t]===void 0&&Ll(e.workingDirectory,t);for(let t of Object.keys(e.files))VM(e,t)}for(let t of e.caches)Y4(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{U.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var wm,vm,X4,Z4,Q4,e3,t3,JM,r3,YM,XM=l(()=>{"use strict";R();Sm();FP();DM();KM();Ae();He();Ps();wm=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),vm=e=>({...e,status:"stopped",errorMessage:Go,judgePhase:void 0,updatedAt:new Date().toISOString()}),X4=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),Z4=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==T?t:e.improverModel!==T?e.improverModel:null}return e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null},Q4=async e=>{let t=le(e.cycle),r=zM({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=GM({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?ml({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Jo(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):tl({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=await Fe({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal}),a=i.ok?jM({workingDirectory:t,before:r,writerReply:i.text}):null,c=qM(o);return i.ok?!c.ok||a===null?{ok:!1,cycle:wm(e.cycle,c.ok?"Could not put the folder back after the run.":c.errorMessage)}:{ok:!0,run:{output:i.text.trim(),tokens:i.tokens,delayMs:Date.now()-n,lookedAt:a.lookedAt,evidence:a.evidence}}:i.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:vm(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:wm(e.cycle,i.errorMessage)})},e3=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:Q4({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),t3=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),JM=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Fe({writerAgent:e.reviewer,workingDirectory:le(e.cycle),prompt:sP({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:vm(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},r3=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===T)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Fe({writerAgent:t.judgeModel,workingDirectory:le(t),prompt:Ko({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Wl(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?vm(o):(e.onWriterFailure?.(t.judgeModel),wm(o,n.errorMessage))},YM=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return r3(e);let o=Z4(t),n=await e3({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?X4(t,n.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===T){let p=await JM({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...t3(s,p.text),judgePhase:void 0}}let i=await Fe({writerAgent:t.judgeModel,workingDirectory:le(t),prompt:Vo({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?vm(s):(e.onWriterFailure?.(t.judgeModel),wm(s,i.errorMessage));let a=await JM({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Wl(s,i.text,c);return Am(d,a.text)}});var rn,_m=l(()=>{"use strict";R();rn=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:el({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:ol(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var Wm,o3,n3,JP,ZM=l(()=>{"use strict";R();Sm();XM();_m();Ae();He();Ps();Wm=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),o3=e=>({...e,status:"stopped",errorMessage:Go,updatedAt:new Date().toISOString()}),n3=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?o3(e):(n?.(r),Wm(e,t.errorMessage)),JP=async(e,t,r,o)=>{let n=e.revisions.find(c=>c.roundNumber===e.currentRound);if(n===void 0)return Wm(e,"This round has no prompt.");if(e.status==="judging")return YM({cycle:e,revision:n,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return Wm(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===T)return e;let s=rn(e);if(s===null)return Wm(e,"The improver needs the score and the reason.");let i=await Fe({writerAgent:e.improverModel,workingDirectory:le(e),prompt:Ur({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r}),a=n3(e,i,e.improverModel,r,t);return a!==null?a:ym(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var kl,YP=l(()=>{"use strict";kl=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var Em,Lm,QM,s3,i3,km,eN,tN,a3,l3,on,rN,oN,El=l(()=>{"use strict";R();wl();vl();Ae();He();Ps();ZM();YP();Em=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),Lm=(e,t,r)=>e.wizard===void 0||t===null?Em(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},QM=e=>{let t=e.wizard;return t===void 0||kl(e).length===0?e:{...e,wizard:Ss({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},s3=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",i3=e=>{let t=e.wizard;if(t===void 0)return e;let r=gl({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Ss({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},km=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),eN=e=>e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null,tN=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},a3=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=eN(e);if(n===null)return Em(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??_t(o),i=ul({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:tN(e,"generalize")}),a=await Fe({writerAgent:n,prompt:i,workingDirectory:le(e),signal:t});if(!a.ok)return r?.(n),Lm(e,"generalize",a.errorMessage);try{let c=EP(a.text),d=Ss({wizard:{...o,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Al(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return fl(d)?on({...p,wizard:{...d,gate:null}}):km(p,"generalize")}catch(c){return Lm(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},l3=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=eN(e);if(n===null)return Em(e,"Choose a writer to suggest splits.");let s=Wt({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=pl({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:tN(e,"separate")}),a=await Fe({writerAgent:n,prompt:i,workingDirectory:le(e),signal:t});if(!a.ok)return r?.(n),Lm(e,"separate",a.errorMessage);try{let c=CP(a.text),d=yP(c,o.variables),p=Ss({wizard:{...o,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:p};return yl(d)?Vr(m,d[0]):km(m,"separate")}catch(c){return Lm(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},on=e=>{let t=e.wizard;if(t===void 0)return e;let r=_t(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},rN=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Em(e,"This module is missing.");let n=ur(r),s=Yo(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==T?e.runnerModel:e.judgeModel!==T?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:re(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},oN=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return JP(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return a3(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return l3(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await JP(e,t,r,o);if(C(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&kl(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=ie(s.revisions.map(b=>({roundNumber:b.roundNumber,promptText:b.promptText,score:b.judgement?.score??0,reasons:b.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&hl({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let p=QM(km(a,i));return qr(p)}let c=km(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=bP({wizard:{...c.wizard,modules:c.wizard.modules.map((m,b)=>b===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:s3(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?QM(d):i3(d)}return s}return n.phase==="complete",e}});var _s,Cm=l(()=>{"use strict";R();Ae();_s=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:_P(r,e.judgeModel===T),updatedAt:new Date().toISOString()}}});var nN,Ws,Rm=l(()=>{"use strict";Gr();nN=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:gM(e.promptText)},Ws=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t===void 0?null:nN(t);if(r!==null)return r.trim();for(let o=e.revisions.length-1;o>=0;o-=1){let n=nN(e.revisions[o]);if(n!==null)return n.trim()}return null}});var Ft,Ls=l(()=>{"use strict";Ft='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var XP,sN,c3,iN,aN,ZP=l(()=>{"use strict";R();Ae();He();Ls();XP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sN=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',c3=e=>{let t=sN(e.state),r=`<h2>${XP(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${XP(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Ft}</button></div><template>${r}</template></li>`},iN=e=>{let t=e.wizard;if(t===void 0)return"";let r=cm({status:e.status,wizard:t,writerLabel:ne(e.judgeModel),runnerLabel:ne(e.runnerModel??e.judgeModel),folderDisplay:Qe(le(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(c3).join("")}</ol>`},aN=e=>{let t=e.wizard;if(t===void 0)return"";let r=cm({status:e.status,wizard:t,writerLabel:ne(e.judgeModel),runnerLabel:ne(e.runnerModel??e.judgeModel),folderDisplay:Qe(le(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${sN(n.state)}<span class="sdlc-pipeline-label">${XP(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var Lt,lN,cN,dN,QP=l(()=>{"use strict";R();Lt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lN="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",cN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Lt(lN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${Lt(i.name)}}}</strong> \u2014 ${Lt(i.description)} (sample: ${Lt(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${Lt(r)}</pre>`,n=_t(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${Lt(n)}</pre>`;return`${t}${o}${s}`},dN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Lt(lN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${Lt(n.name)}}}</strong> \u2014 ${Lt(n.description)} (sample: ${Lt(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${Lt(r)}</pre>`;return`${t}${o}`}});var uN,pN=l(()=>{"use strict";R();uN=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=Ko({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=Vo({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var ew,xm,tw=l(()=>{"use strict";Ls();pN();ew=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xm=e=>{let t=uN(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${ew(r)}">${Ft}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${ew(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${ew(t)}</pre></template>`}});var Tm,ks,rw=l(()=>{"use strict";YP();tw();Tm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ks=e=>{let t=kl(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${Tm(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,p=e.cycle.revisions.map(m=>{let b=m.judgement?.score,h=b==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${b}`,y=m.judgement?.reasons?.trim()??"",u=y.length===0?"":`<br><span class="muted">${Tm(y)}</span>`,S=xm({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run});if(e.interactive){let A=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${A}> <span class="sdlc-wizard-revision-title">${Tm(h)}</span></label>${S}${u}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Tm(h)}</span>${S}${u}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var ow,mN,gN,fN,nw=l(()=>{"use strict";ow=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mN=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${ow(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${ow(t.prompt)}</pre></li>`).join("")}</ol>`,gN=e=>mN([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),fN=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${ow(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${mN(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var Cl,d3,Im,sw=l(()=>{"use strict";R();nw();Cl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),d3=e=>{let t=e.wizard;return t===void 0?"":Wt({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},Im=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=d3(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Cl(n.orchestratorSkill.fileName)}</code> \u2014 ${Cl(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${Cl(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=gN(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${Cl(r)} <span class="muted">${Cl(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Oe,u3,p3,m3,g3,Om,f3,h3,y3,S3,A3,b3,Es,Mm=l(()=>{"use strict";R();ZP();QP();rw();tw();sw();Oe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),u3={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},p3=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Oe(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Oe(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Oe(o)}</pre></details>`;return`<h2>${Oe(e)}</h2>${n}`},m3=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=_t(t).trim(),n=Wt({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!C(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${p3("What is being evaluated",i)}`},g3=(e,t)=>{let r=e.wizard;if(r===void 0||C(e.status))return"";let o=u3[t];return o===void 0||r.phase!==o?"":aN(e)},Om=(e,t,r)=>{let o=g3(e,t),n=t==="wizard-2"?m3(e):"";return`${o}${n}${r}`},f3=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},h3=e=>{let t=e.wizard;return t===void 0?"":cN(t)},y3=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Oe(a)}</span>`,d=xm({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Oe(s)}${i}</span>${d}${c}</li>`}).join("")}</ul>`,S3=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return ks({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=f3(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${y3(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=Wt({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Oe(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Oe(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},A3=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Oe(n.title)}</strong> <span class="muted">(${Oe(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Oe(o.title)}</strong>${n}${Oe(s)}${Im(e,o)}</li>`}).join("")}</ul>`},b3=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Oe(i)}</span> <strong>${Oe(n.title)}</strong>${Oe(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Oe(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?ks({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},Es=(e,t)=>{switch(t){case"wizard-1":return Om(e,t,h3(e));case"wizard-2":return Om(e,t,S3(e));case"wizard-3":return Om(e,t,A3(e));case"wizard-4":return Om(e,t,b3(e));default:return""}}});var P3,w3,hN,yN,SN=l(()=>{"use strict";R();Rm();Gr();Mm();P3=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},w3=e=>{let t=e.goal.trim();return t.length===0?null:t},hN=(e,t,r,o,n)=>{let s=nt(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},yN=(e,t)=>{let r=w3(e);if(t.id.startsWith("wizard-")){let s=Es(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=sl(e,t);if(s!==null){let a=Ws(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ie(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:hN(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:P3(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:hN(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var nn,AN,bN=l(()=>{"use strict";nn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AN=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${nn(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${nn(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${nn(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${nn(n)}</h2><pre class="mono">${nn(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${nn(e.goal)}</dd></div></dl>`;return`<h2>${nn(e.title)}</h2>${i}${t}${r}${o}${s}`}});var iw,PN,wN,Kr,vN,Cs=l(()=>{"use strict";R();Ze();iw=new Map,PN=e=>{let t=new AbortController;return iw.set(e,t),t.signal},wN=e=>{iw.delete(e)},Kr=e=>{iw.get(e)?.abort()},vN=(e,t)=>{let r=J(e,t);return r===null||r.wizard!==void 0?!1:(C(r.status)||(D(e,{...r,status:"stopped",errorMessage:Go,updatedAt:new Date().toISOString()}),Kr(t)),!0)}});var v3,_3,aw,W3,L3,k3,_N,WN,lw=l(()=>{"use strict";R();El();Cm();wl();vl();Cs();v3=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),_3=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||C(e.status))return null;let r=wt(t);return r<0||r>3?null:`wizard-${r+1}`},aw=(e,t)=>v3.has(t)?_3(e)===t:!1,W3=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),L3=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ie(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},k3=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=oe(o);return _s({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},_N=(e,t)=>{if(!aw(e,t))return e;Kr(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return on({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return qr(L3(r));if(t==="wizard-3"){let n=o.splitOptions[0]??W3(o.templatedPrompt);return Vr(r,n)}return t==="wizard-4"?k3(r):e},WN="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var E3,Nm,cw=l(()=>{"use strict";E3='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Nm=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${E3}</button>`});var C3,LN,R3,dw,kN,x3,T3,I3,O3,EN,CN=l(()=>{"use strict";R();_m();C3={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},LN=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},R3=e=>C3[e]??null,dw=(e,t)=>{let r=e.wizard,o=R3(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=wt(r);return o<n||o===n},kN=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},x3=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:_t(t).trim();return o.length===0?null:ul({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:LN(e,"generalize")})},T3=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=rn(e);return n===null?null:Ur({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=kN(e)?.promptText.trim()??Wt({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:Ko({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},I3=e=>{let t=e.wizard;if(t===void 0)return null;let r=Wt({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:pl({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:LN(e,"separate")})},O3=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=ur(t),s=Yo(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=rn(e);return c===null?null:Ur({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=kN(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||C(e.status)&&i?.judgement!==null)?Vo({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):ml({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:Jo(t,r).output,moduleTitle:o.title})},EN=(e,t)=>{if(!dw(e,t))return null;switch(t){case"wizard-1":return x3(e);case"wizard-2":return T3(e);case"wizard-3":return I3(e);case"wizard-4":return O3(e);default:return null}}});var M3,zm,uw=l(()=>{"use strict";R();M3=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},zm=(e,t)=>{let r=e.wizard,o=M3(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=wt(r);return o<n?"done":o===n&&C(e.status)&&e.status==="failed"?"failed":o<=n&&C(e.status)?"done":"pending"}});var N3,Rs,jm=l(()=>{"use strict";Ls();CN();uw();N3=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Rs=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(zm(e,t)==="pending")return""}else if(!dw(e,t))return"";let o=EN(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Ft}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${N3(o)}</pre></template>`}});var sn,xs,Rl=l(()=>{"use strict";sn=e=>e.toLocaleString("en-US"),xs=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var Ut,z3,RN,xN,TN,IN,pw=l(()=>{"use strict";R();SN();bN();lw();cw();Ls();Rm();ZP();jm();Rl();Ut=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),z3=(e,t)=>{let r=sl(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?xs(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${sn(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Ut(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${Ut(r)}</span>`:"",d=AN(yN(t,e)),p=t.wizard!==void 0&&t.wizard.phase==="complete"&&C(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${Ut(e.id)}"`:"",m=aw(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${Ut(WN)}"><input type="hidden" name="cycleId" value="${Ut(t.id)}"><input type="hidden" name="wizardStepId" value="${Ut(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",b=e.state==="active"&&e.id.startsWith("wizard-")?iN(t):"",h=o?"failed":e.state,y=o?Ws(t):null,u=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Ft}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${Ut(y)}</pre></template>`:"",S=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?Rs(t,e.id):"";return`<li class="sdlc-node sdlc-node-${h}" data-sdlc-step-id="${Ut(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${p} data-sdlc-node>${n}<span class="sdlc-node-label">${Ut(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${S}${u}</div></div>${b}<template>${d}</template></li>`},RN=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>z3(r,t)).join("")}</ol>`,xN=e=>`<div class="sdlc-score" aria-label="What the score means">${nl(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Ut(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,TN=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${Nm({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,IN=`<script>
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
</script>`});var Jr,ON,j3,MN=l(()=>{"use strict";R();He();Gr();DP();Jr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ON=e=>{if(!C(e.status))return"";let t=ie(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=nt(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Jr(t.reasons.trim())}</p>`,i=n===null?j3({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:le(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${Jr(n)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${o}${s}${i}</section>`},j3=e=>{let t=e.sourceSkill?.fileName??Pl(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=fm(t,r),s=n.length>0&&AM(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Jr(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Jr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Jr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Jr(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Jr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Jr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var NN,zN=l(()=>{"use strict";NN=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var jN,D3,Dm,Ue,$m,mw=l(()=>{"use strict";R();R();Ae();zN();Rm();Gr();jN=["Generalize","Evaluate","Separate","Optimize modules"],D3=e=>{let t=wt(e),r=t>=0&&t<jN.length?jN[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},Dm=(e,t)=>{let r=Ws(e),o=r===null?null:NN(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},Ue=(e,t)=>({title:e,detail:t,replyPreview:null}),$m=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:null}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!C(e.status)){let t=e.judgeModel;return Ue(`${ne(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!C(e.status)){let t=e.judgeModel;return Ue(`${ne(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===T?Ue(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?Ue(`${ne(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):Ue(`${ne(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===T){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==T?Ue(`${ne(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):Ue(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return Ue(`${ne(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=re(t);return Ue(`${ne(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return Ue(`${ne(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=re(t);return Ue(`${ne(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return Ue(`${ne(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===T){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return Ue("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return Ue(`${ne(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>nt(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=oe(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||C(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?Dm(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o="A writer or judge reply could not be used. Start a new run after fixing the issue.";return r!==void 0?Dm(e,{title:D3(r),detail:t.length>0?t:o}):Dm(e,{title:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(C(e.status)){let t=e.errorMessage?.trim()??"";return Dm(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var Bt,xl=l(()=>{"use strict";Ae();Bt=e=>{if(e.status==="improving"&&e.improverModel===T)return!0;if(e.status!=="judging"||e.judgeModel!==T)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===T}});var DN,$N=l(()=>{"use strict";DN=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Yr,$3,HN,FN=l(()=>{"use strict";R();Yr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$3=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Yr(r)}</p>`},HN=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Yr(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${Yr(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Yr(a)}.</p>`}<pre class="mono">${Yr(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Br(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Yr(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",m=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Yr(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${$3(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Yr(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Tl,H3,UN,BN=l(()=>{"use strict";R();Gr();Tl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),H3=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=nt(t.promptText),n=t.judgement?.reasons?`<p class="muted">${Tl(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Tl(i)}.</p>`}<pre class="mono">${Tl(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Br(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${Tl(d)}</pre>`:`<div class="alert-error">${Tl(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},UN=e=>e.revisions.map(t=>H3(e,t)).join("")});var GN,VN=l(()=>{"use strict";R();GN=e=>{if(C(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Gt,F3,gw,U3,B3,G3,V3,qN,KN,fw=l(()=>{"use strict";VN();Gt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),F3="Stop this run? Writers will stop and the best prompt is kept.",gw="End the wizard? Writers will stop and progress from finished steps is kept.",U3="Skip this module and pause at the step gate?",B3=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${Gt(F3)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Gt(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,G3=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${Gt(gw)}"><input type="hidden" name="cycleId" value="${Gt(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,V3=e=>{let t=Gt(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Gt(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${Gt(U3)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${Gt(gw)}">End wizard</button>
    </form>
  </div>`},qN=e=>{let t=GN(e);return t==="none"?"":t==="classic"?B3(e.id):t==="wizard_end_only"?G3(e.id):V3(e)},KN=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=Gt(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${Gt(gw)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var JN,YN=l(()=>{"use strict";R();Rl();JN=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=oe(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${sn(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${sn(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${re(r)}`}return""}});var q3,K3,XN,J3,ZN,QN=l(()=>{"use strict";R();YN();uw();Mm();jm();q3=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',K3=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',XN=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),J3=(e,t,r)=>{let o=Es(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=JN(e,t),i=zm(e,t),a=q3(i),c=K3(i),d=Rs(e,t,{forOutcomeSummary:!0}),p=`${a}<span class="sdlc-wizard-outcome-step-title">${XN(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${XN(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",b=i==="failed"&&t!=="wizard-4"?" open":"",h=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${h}"${m}${b}><summary aria-controls="${h}-body">${p}</summary><div class="sdlc-wizard-outcome-step-body" id="${h}-body">${o}</div></details>`},ZN=e=>{let t=e.wizard;if(t===void 0||!C(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>J3(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var ez,tz,rz=l(()=>{"use strict";ez=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tz=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${ez(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${ez(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var hw,oz,yw=l(()=>{"use strict";hw=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,oz=(e,t)=>{if(hw(e,t))return"Passed";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var nz,sz=l(()=>{"use strict";nz=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var Hm,iz,az=l(()=>{"use strict";R();yw();yw();sz();Hm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),iz=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=oe(t),o=re(t),n=r.terminalStatusSuggestion==="passed"?"":nz(r,o),s=o-10,i=r.rows.map((c,d)=>{let p=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,h=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=p===void 0?c.status:oz(p,o),u=p!==void 0&&hw(p,o)?'<span aria-label="Passed">\u2713</span>':Hm(y);return`<tr${h}><td>${Hm(c.title)}</td><td>${Hm(m)}</td><td>${c.tokens??"\u2014"}</td><td>${u}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${Hm(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var an,Fm,Sw=l(()=>{"use strict";an=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Fm=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${an(r.fileName)}</code> \u2014 ${an(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${an(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${an(i.name)}</strong> <code>.cursor/skills/${an(i.fileName)}/SKILL.md</code></p><p class="muted">${an(i.description)}</p><p>${an(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var Y3,lz,cz=l(()=>{"use strict";R();R();rz();az();Sw();Y3=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lz=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!C(e.status)||t.modules.length===0)return"";let r=iz(e),o=tz(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=oe(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${Y3(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${Fm(e)}${a}${r}${o}</section>`}});var pr,Il=l(()=>{"use strict";pr=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var mr,Um,Aw=l(()=>{"use strict";R();pw();MN();mw();xl();$N();_m();FN();BN();fw();QN();cz();Rl();He();Il();mr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Um=e=>{let t=!C(e.status)&&e.status!=="wizard_paused"&&!Bt(e),r=$m(e),o=RN(uP(DN(e)),e),n=C(e.status)?"":qN(e),s=ZN(e),i=lz(e),a=ON(e),c=e.errorMessage===null?"":`<div class="alert-error">${mr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?oe(e.wizard):null,b=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,h=!t&&e.wizard!==void 0&&C(e.status)&&(e.wizard.phase==="complete"||oe(e.wizard).passedModuleCount>0),y=h?b?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",u=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${mr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",S=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${mr(r.replyPreview)}</pre>`,A=r.detail.length===0&&u.length===0&&S.length===0||r.detail.length===0&&S.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${mr(r.detail)}${p}</p>`}${S}</div>`,f=e.revisions.find(no=>no.roundNumber===e.currentRound),w=e.status==="improving"?rn(e):null,v=xs(e),W=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),L=Bt(e)?HN({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:w?.promptText??f?.promptText??"",score:w?.score??f?.judgement?.score??null,reasons:w?.reasons??f?.judgement?.reasons??null,avoid:w?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:W?1:0}):"",E=e.wizard!==void 0&&e.wizard.phase==="complete"&&C(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!E&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?re(e.wizard):e.passScore,M=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${xN(I)}</div>`:"",B=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':C(e.status)?e.status==="failed"?'<span class="sdlc-run-badge sdlc-run-badge-failed">Failed</span>':E&&m!==null&&!b?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",q=t?d:h?b?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',F=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${mr(Qe(le(e)))}</li>`:"",v>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${sn(v)} so far</li>`:""].filter(no=>no.length>0),ct=F.length===0?"":`<ul class="sdlc-run-meta">${F.join("")}</ul>`,H=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,fe=E?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,oo=E?"":M.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${fe}</div>`:`<div class="sdlc-run-grid">${fe}${M}</div>`,Ct=UN(e),yU=e.wizard!==void 0&&C(e.status)&&e.revisions.every(no=>no.roundNumber===0&&(no.judgement===void 0||no.judgement===null)),SU=Ct.length===0||yU?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${Ct}</div></section>`,AU=`<p class="sdlc-run-goal" title="${mr(e.goal.trim())}">${mr(pr(e.goal))}</p>`,bU=E?`${c}${i}${s}${L}${a}`:`${c}${oo}${L}${s}${a}`,PU='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',wU=E?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${mr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${PU}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${B}</div>${AU}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${q}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${mr(r.title)}</h2>${A}${u}${wU}</div></div>${ct}${H}</header>${bU}</section>${SU}`}});var dz,uz=l(()=>{"use strict";R();vl();dz=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!hl({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:qr(e)}});var pz,mz=l(()=>{"use strict";R();El();pz=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!fl(t)?e:on({...e,wizard:{...t,gate:null}})}});var gz,fz=l(()=>{"use strict";R();wl();gz=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!yl(t.splitOptions))return e;let r=t.splitOptions[0];return Vr(e,r)}});var X3,ln,Bm=l(()=>{"use strict";uz();mz();fz();Ze();X3=e=>{let t=pz(e),r=dz(t);return gz(r)},ln=(e,t)=>{let r=X3(t);return r!==t?(D(e,r),r):t}});var hz,gr,Ol=l(()=>{"use strict";R();hz=e=>Xe.indexOf(e),gr=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||C(e.status)?Xe.length:t.gate!==null?hz(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?hz(t.phase):null}});var yz,Sz=l(()=>{"use strict";yz=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var cn,Az,bz=l(()=>{"use strict";R();Sz();cn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Az=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Jo(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${cn(yz(o))}</pre></div>`:"",s=Xo(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=ur(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=dm(c),m=i[c]??"",b=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${cn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${cn(p)}">${cn(b)}</label>
        ${h}
        <input class="input" type="text" id="${cn(p)}" name="${cn(p)}" value="${cn(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var Ml,Pz,wz=l(()=>{"use strict";R();QP();bz();rw();fw();Sw();sw();Ml=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Pz=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate,n=re(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?dN(r):"",a=o==="evaluate"?Fm(e):"",c=o==="evaluate"?ks({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",p=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(x=>{let I=x.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',M=x.recommended?' <span class="sdlc-badge">Recommended</span>':"",B=r.selectedSplitOptionId===x.id||r.selectedSplitOptionId===null&&x.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${Ml(x.id)}" required${B}> <strong>${Ml(x.title)}</strong>${I}${M}</label>${Im(e,x)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],h=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=m?.title??"Module",u=m?.prompt??"",S=m?.status==="pending",A=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Ml(y)}</p>${S?Az({cycle:e,modulePrompt:u}):""}<p class="muted">Test run prompt preview: ${Ml(Yo(u,ur(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${ks({cycle:e,interactive:!1,caption:S?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",f=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":S?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",w=kP(r),v=w===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${w}</p>`,W=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",L=t?.active===!0?" sdlc-wizard-gate-active":"",E=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${W}"`:"";return`<section class="card sdlc-wizard-gate${L}"${E}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${f}</p>
    ${v}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Ml(e.id)}">
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
    ${KN(e)}
  </section>`}});var Z3,vz,_z=l(()=>{"use strict";R();jm();Z3=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vz=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||C(e.status))return"";let r=(o,n)=>{let s=Rs(e,o);return`<h2 class="sdlc-wizard-active-head">${Z3(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var Wz,Lz,bw,kz,Pw=l(()=>{"use strict";R();Ol();Cs();Wz="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",Lz=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return Xe[r]??null},bw=(e,t)=>{let r=Lz(t);if(r===null||e.wizard===void 0)return!1;let o=Xe.indexOf(r);if(o===-1)return!1;let n=gr(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<Xe.length)},kz=(e,t)=>{let r=Lz(t);if(r===null||e.wizard===void 0||!bw(e,t))return e;Kr(e.id);let o=Xe.slice(Xe.indexOf(r)),n=dl(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var ww,Ez,Cz=l(()=>{"use strict";Pw();ww=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ez=(e,t)=>bw(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${ww(Wz)}"><input type="hidden" name="cycleId" value="${ww(e.id)}"><input type="hidden" name="wizardStepId" value="${ww(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var Q3,e6,t6,Rz,xz=l(()=>{"use strict";R();Ol();wz();_z();Cz();Mm();Q3={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},e6=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),t6=(e,t,r)=>{let o=Ez(e,t);return`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${e6(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${Es(e,t)}</div>
</details>`},Rz=e=>{let t=e.wizard;if(t===void 0)return"";let r=gr(e);if(r===null)return"";let o=Xe.slice(0,r).map((i,a)=>t6(e,`wizard-${a+1}`,Q3[i])),n=t.gate!==null?Pz(e,{active:!0}):vz(e),s=r>=Xe.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var Gm,vw=l(()=>{"use strict";xz();nw();R();Gm=e=>{if(e===null||e.wizard!==void 0&&C(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=Rz(e),r=fN(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var r6,_w,Tz=l(()=>{"use strict";R();Ae();He();Ps();r6=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},_w=async(e,t,r)=>{if(!r6(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===T)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=PP({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Fe({writerAgent:e.judgeModel,prompt:n,workingDirectory:le(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=vP(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var Nl,Vm,Iz,Ww,Oz,Mz,Nz,qm,Lw=l(()=>{"use strict";Nl=g(require("node:fs")),Vm=g(require("node:path")),Iz=e=>Vm.default.join(Vm.default.dirname(e),"prompt-optimizer-writer-ready.json"),Ww=e=>{let t=Iz(e);if(!Nl.default.existsSync(t))return{};try{let r=JSON.parse(Nl.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},Oz=(e,t)=>{Nl.default.mkdirSync(Vm.default.dirname(e),{recursive:!0}),Nl.default.writeFileSync(Iz(e),`${JSON.stringify(t,null,2)}
`)},Mz=(e,t)=>Ww(e)[t]?.message??null,Nz=(e,t,r)=>{Oz(e,{...Ww(e),[t]:{message:r}})},qm=(e,t)=>{let r=Ww(e);r[t]!==void 0&&Oz(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var kw,Km,Jm,zz,be,dn=l(()=>{"use strict";R();bl();El();Tz();xl();Cs();Lw();Bm();Ze();kw=new Set,Km={atMs:0,ids:[]},Jm=async()=>{if(Date.now()-Km.atMs<3e4)return Km.ids;let e=await Pt({commands:ue({})});return Km.atMs=Date.now(),Km.ids=e.installedWriterIds,e.installedWriterIds},zz=async(e,t,r)=>{let o=J(e,t);if(o===null||r.aborted)return;let n=ln(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(C(n.status)&&!s||n.status==="wizard_paused"||Bt(n))return;if(s){let c=await _w(n,r,d=>{qm(e,d)});D(e,c);return}let i=await oN(n,c=>{qm(e,c)},r,c=>{J(e,t)?.status==="stopped"||r.aborted||D(e,c)});if(!(J(e,t)?.status==="stopped"||r.aborted)){if(D(e,i),C(i.status)){let c=await _w(i,r,d=>{qm(e,d)});D(e,c);return}await zz(e,t,r)}},be=(e,t)=>{if(kw.has(t))return;let r=J(e,t);if(r===null)return;let o=ln(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(C(o.status)&&!n||o.status==="wizard_paused"||Bt(o))return;kw.add(t);let s=PN(t);zz(e,t,s).finally(()=>{kw.delete(t),wN(t)})}});var Xr,zl=l(()=>{"use strict";Aw();Bm();vw();dn();Xr=(e,t)=>{let r=ln(e,t);return be(e,r.id),`${Um(r)}${Gm(r)}`}});var jz,Dz,$z=l(()=>{"use strict";jz=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,Dz=e=>e!==null&&e>0});var Ym,Hz,Ew=l(()=>{"use strict";R();Cm();Cs();Ym=e=>(Kr(e.id),{..._s(e,"stopped"),errorMessage:qb}),Hz=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;Kr(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var o6,Fz,Uz,Bz=l(()=>{"use strict";R();El();Cm();wl();vl();zl();Ze();dn();$z();Pw();lw();Ew();o6="Pick a revision scored above 0 before continuing to Separate.",Fz=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),Uz=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=J(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=J(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Xr(e.storePath,d))};if(o==="wizard-stop-all"){let c=Ym(s);return D(e.storePath,c),be(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=Hz(s);return D(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=kz(s,c);return D(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=_N(s,c);return D(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&be(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",m=fP(s.wizard,d,c);m=dl(m,d),m={...m,pendingStepInstructions:p};let b={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return D(e.storePath,b),be(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(b=>b.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?Fz(s):on({...s,wizard:{...s.wizard,gate:null}});return D(e.storePath,m),be(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=jz(s,p??-1);if(!Dz(m)){let h={...s,errorMessage:o6,updatedAt:new Date().toISOString()};return D(e.storePath,h),a(n),!0}let b=qr({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return D(e.storePath,b),be(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=Fz(s);return D(e.storePath,h),be(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(h=>h.id===p);if(m===void 0){let h={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return D(e.storePath,h),a(n),!0}let b=Vr(s,m);return D(e.storePath,b),a(n),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(n),!0;let m=MP({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!m.ok){let u={...s,errorMessage:m.errorMessage,updatedAt:new Date().toISOString()};return D(e.storePath,u),a(n),!0}let b={...s.wizard,parameterValues:m.parameterValues};if(p.status==="pending"){let u=rN({...s,wizard:{...b,gate:null}},d);return D(e.storePath,u),be(e.storePath,n),a(n),!0}let h=d+1;if(h>=s.wizard.modules.length){let u=oe(b),S=_s({...s,wizard:b},u.terminalStatusSuggestion);return D(e.storePath,S),be(e.storePath,n),a(n),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...b,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return D(e.storePath,y),a(n),!0}}return a(n),!0}});var n6,Gz,s6,Cw,i6,Vz,qz=l(()=>{"use strict";Ae();Cs();Ew();FP();Sm();xl();Ze();n6="Add a score from 0 to 100 and the reason for it.",Gz="Add a score from 1 to 100 and the reason for it.",s6="Write the next prompt.",Cw="This step is not waiting for you.",i6=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},Vz=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=J(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(D(e.storePath,Ym(a)),{kind:"saved",cycleId:i}):vN(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=J(e.storePath,r);if(o===null||!Bt(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:Cw};if(t==="manual-judge"){if(o.judgeModel!==T)return{kind:"invalid",cycle:o,errorMessage:Cw};let i=i6(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?Gz:n6};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:Gz};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",p=Am(Wl(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return D(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==T)return{kind:"invalid",cycle:o,errorMessage:Cw};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:s6};let s=ym(o,n);return D(e.storePath,s),{kind:"saved",cycleId:o.id}}});var Kz,Jz=l(()=>{"use strict";Kz=`<script>
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
</script>`});var Yz,Xz=l(()=>{"use strict";Yz=`<script>
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
</script>`});var Zz,Qz=l(()=>{"use strict";Zz=`<script>
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
  const paintPassRange = (pass) => {
    if (!(pass instanceof HTMLInputElement)) return;
    const score = Number(pass.value);
    const weak = Math.floor(score / 2);
    const close = Math.max(weak + 1, score - 20);
    const group = pass.closest("[data-sdlc-pass-group]");
    const scale = group?.querySelector(".sdlc-pass-scale");
    if (scale instanceof HTMLElement) {
      scale.style.setProperty("--sdlc-weak", weak + "%");
      scale.style.setProperty("--sdlc-close", close + "%");
      scale.style.setProperty("--sdlc-pass", score + "%");
    }
    const value = group?.querySelector("[data-sdlc-pass-value]");
    const legend = group?.querySelector("[data-sdlc-pass-legend]");
    if (value) value.textContent = String(score);
    if (legend) {
      legend.textContent =
        "0\u2013" +
        (weak - 1) +
        " bad \xB7 " +
        weak +
        "\u2013" +
        (close - 1) +
        " weak \xB7 " +
        close +
        "\u2013" +
        (score - 1) +
        " close \xB7 " +
        score +
        "\u2013100 passes";
    }
  };
  document.querySelectorAll("[data-sdlc-pass]").forEach((pass) => {
    if (!(pass instanceof HTMLInputElement)) return;
    pass.addEventListener("input", () => {
      paintPassRange(pass);
      paintComposeReview();
    });
    paintPassRange(pass);
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
</script>`});var ej,tj=l(()=>{"use strict";R();He();ej=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:Qe(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(re(t.wizard)),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!C(t.status)}}});var rj,oj=l(()=>{"use strict";R();Ol();rj=e=>{if(e.wizard===void 0)return C(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let t=gr(e);if(e.status==="wizard_paused"&&t!==null&&t<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${t+1} of 4`};if(C(e.status)){if(e.wizard.phase==="complete"){let r=oe(e.wizard),o=r.rows.reduce((s,i)=>i.bestScore===null?s:s===null?i.bestScore:Math.min(s,i.bestScore),null),n=o===null?"":` \xB7 lowest ${o}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Wizard \xB7 ${r.passedModuleCount}/${r.totalModules} modules${n}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}}return t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${t+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var nj,sj=l(()=>{"use strict";nj=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var fr,a6,l6,ij,aj=l(()=>{"use strict";oj();sj();Il();fr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),a6=e=>e.wizard===void 0?"classic":"wizard",l6=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${fr(t)}">`,o=rj(e),n=nj(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${fr(o.badgeClass)}">${fr(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${fr(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${fr(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${a6(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${fr(e.id)}">${fr(pr(e.goal))}</a><p class="muted">${fr(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${m}</div></li>`},ij=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(i=>l6(i,t)).join(""),o=Math.min(e.length,20),n=o===e.length?`History \xB7 ${e.length}`:`History \xB7 ${o} of ${e.length}`,s=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2><ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${fr(n)}</summary>${s}</details>`:s}});var Rw,Xm,lj,c6,d6,xw,cj,Tw=l(()=>{"use strict";Rw=g(require("node:fs")),Xm=g(require("node:path"));He();lj=/^[a-z0-9-]+$/,c6=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},d6=(e,t)=>{if(!lj.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let m=c6(p[2]??"");p[1]==="name"&&m.length>0&&(o=m),p[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},xw=e=>{let t=en(e);if(!t.ok)return[];let r=Xm.default.resolve(t.path,".cursor","skills"),o=[];try{o=Rw.default.readdirSync(r)}catch{return[]}return o.filter(n=>lj.test(n)).flatMap(n=>{let s=Xm.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${Xm.default.sep}`))return[];try{let i=d6(Rw.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},cj=(e,t)=>xw(e).find(r=>r.fileName===t)??null});var dj,uj=l(()=>{"use strict";dj={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var jl,u6,De,Ts=l(()=>{"use strict";uj();Ls();jl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),u6=e=>{let t=dj[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${jl(t.title)}" aria-describedby="${r}" aria-expanded="false">${Ft}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${jl(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${jl(t.example)}</span></span></button>`},De=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${jl(r)}"`}>${jl(e)}</span>${u6(t)}</span>`});var pj,p6,mj,gj,fj=l(()=>{"use strict";Ts();pj=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p6=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),mj=e=>{if(e.length===0)return`<div class="field">${De("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${pj(r.fileName)}">${pj(r.fileName)}</option>`).join("");return`<div class="field">${De("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${p6(e)}</script>`},gj=`<script>
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
</script>`});var Me,hj,yj,m6,Sj,Aj,bj,Pj=l(()=>{"use strict";R();mw();Ae();Il();Ol();Me=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hj=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",yj=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,m6=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},Sj=e=>e===T?"You":ne(e),Aj=e=>{let t=m6(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ne(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Me(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Me(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Me(Sj(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Me(Sj(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Me(r)}</dd></div>
    </dl>
  </details>`},bj=e=>{let t=e.wizard;if(t===void 0)return"";let r=pr(e.goal),o=e.status==="wizard_paused",n=!C(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=$m(e),m=yj(t),b=m===null?"":hj(m),h=gr(e),y=b.length===0?"":h===null||h>=4?` <strong>${Me(b)}</strong>`:` <strong>${Me(b)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Me(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Me(p.title)}${y}</p>
    <p class="muted">${Me(p.detail)}</p>
    <div class="actions">
      ${Aj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Me(e.id)}">Open this run</a>
    </div>
  </section>`}let s=yj(t),i=s===null?"Wizard":hj(s),a=gr(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Me(r)}</h2>
    <p class="lede">Paused at <strong>${Me(i)}</strong>${Me(c)} (last updated ${Me(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${Aj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Me(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Dl,wj,vj=l(()=>{"use strict";Ts();Dl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wj=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${Dl(n.id)}"${n.id===e.runner?" selected":""}>${Dl(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Dl(e.runner)}">Checking ${Dl(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${De("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${De("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Dl(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var _j,Wj=l(()=>{"use strict";_j=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var Is,Lj,kj,Ej,Cj,Rj=l(()=>{"use strict";Ts();Is=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lj=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${Is(c.id)}"${c.id===r?" selected":""}>${Is(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Is(n)}</option>`;return`<div class="field">${De(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},kj=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Is(t)}">Checking ${Is(o)}\u2026</p>`},Ej=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${De(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Is(r)}</textarea><span class="muted">${o}</span></div></details>`,Cj=e=>{let t=`<div class="sdlc-writer">${Lj("judge","Judge",e.judge,e.writers,"I'll score it")}${kj("judge",e.judge,e.writers)}${Ej("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${Lj("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${kj("improver",e.improver,e.writers)}${Ej("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var xj,Tj=l(()=>{"use strict";xj=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var Iw,Ij,Oj=l(()=>{"use strict";Tj();Iw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ij=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${xj.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${Iw(t.goal)}" title="${Iw(t.goal)}">${Iw(t.label)}</button>`).join("")}</div>`});var $l,g6,f6,Ow,Mj=l(()=>{"use strict";R();Ts();$l=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),g6=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},f6=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,Ow=e=>{let t=g6(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=nl(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${De(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${$l(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${$l(e.inputId)}" class="sdlc-pass-range" type="range" name="${$l(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${$l(a)}"><span class="sdlc-pass-mark" style="left:${f6(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${$l(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var y6,hr,Nj,zj=l(()=>{"use strict";xl();Aw();Jz();Xz();pw();Qz();tj();aj();Tw();fj();Ts();vw();Pj();Il();vj();Wj();Rj();R();Oj();Mj();y6=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,hr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Nj=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${hr(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${hr(e.skillNotice??"")}</div>`,o=`${TN}${IN}`,n=e.resumableWizardCycle??null,s=n===null?"":bj(n),i=Gm(e.cycle),a=e.cycle===null?"":Um(e.cycle),c=e.cycle!==null&&Bt(e.cycle),d=ej(e),p=y6(d.goal,d.prompt,e.canRun),m=Cj({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),b=wj({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=`${Ow({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${Ow({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=mP,u=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",S=e.cycle!==null&&C(e.cycle.status),A=d.running&&!S,f=S||A?"":" open",w=A?" sdlc-compose-run-focus":"",W=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${S?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,L=S?(()=>{let F=e.cycle!==null?pr(e.cycle.goal):pr(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${hr(F)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${W}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${W}</summary>`,E=S?" sdlc-compose-viewing-finished":"",x=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",I=c?"waiting":d.running?"running":"idle",M=d.running&&!c?' aria-busy="true"':"",B=`<section class="card sdlc-compose${E}${w}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${f}>
        ${L}
        <div class="sdlc-compose-details-body">
      <p class="lede">${y} ${hr(e.modelNote)}</p>
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
            ${De("Folder","folder")}
            <input class="input" type="text" name="folder" value="${hr(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${mj(xw(d.folder))}
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
            ${De("Goal","goal")}
            ${Ij()}
            <textarea class="input textarea" name="goal" rows="4" required>${hr(d.goal)}</textarea>
          </div>
          <div class="field">
            ${De("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${hr(d.prompt)}</textarea>
          </div>
          ${h}
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
        ${b}
        ${_j()}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${hr(d.passScore)}; Step 4 pass \u2265 ${hr(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${I}" data-can-run="${p?"true":"false"}"${M}${d.running?" disabled":""}>${x}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,q=`${""}${Kz}${Yz}${Zz}${gj}`;return`${t}${r}${B}${s}${a}${i}${o}${ij(e.history,e.cycle?.id??null)}${q}`}});var Hl,Mw=l(()=>{"use strict";zj();Hl=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:Nj(t)}))}});var jj,Dj=l(()=>{"use strict";qz();zl();Mw();Ze();dn();jj=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:Vz({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=J(e.storePath,o.cycleId);return be(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(Xr(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Hl(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:$t(e.storePath),resumableWizardCycle:null}),!0)}});var $j,Zm,Nw=l(()=>{"use strict";$j=g(require("node:os"));R();Zm=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??$j.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var Hj,Os,zw,Fj,Uj,Fl=l(()=>{"use strict";R();Ae();Gb();Hj=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Os=e=>{let t=WM(e),r=tn(e).map(s=>({id:s,label:hm[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},zw=(e,t,r)=>t===T||t!==null&&e.writers.some(o=>o.id===t)?t:r,Fj=(e,t,r,o=null)=>({judge:zw(e,t,e.judge),improver:zw(e,r,e.improver),runner:zw(e,o,e.runner)}),Uj=e=>e===qp?{goal:Kp,prompt:Jp}:{goal:"",prompt:""}});var Qm,Bj=l(()=>{"use strict";Qm=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var Gj,eg,jw=l(()=>{"use strict";R();Ae();He();Fl();Bj();Gj=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=Qm(o);return n.ok?String(n.passScore):String(r)},eg=e=>{let t=Fj(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=Gj(e.posted,"passScore",70),o=Gj(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=(f,w)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:f,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:w,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a});if(e.posted===null)return d(e.defaultFolder??Qo,null);let p=e.posted.get("folder")??Qo;if(e.posted.get("intent")==="choose-folder"){let f=e.pickFolder();return d(f===null?p:Qe(f),null)}if((e.posted.get("intent")??"")!=="run")return d(p,null);let b=Hj(e.goal,e.prompt);if(b!==null)return d(p,b);let h=Qm(e.posted.get("passScore")??r);if(!h.ok)return d(p,h.errorMessage);let y=Qm(e.posted.get("modulePassScore")??o);if(!y.ok)return d(p,y.errorMessage);let u=LM(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(u===null)return d(p,"Choose a judge and an improver.");let S=en(p);if(!S.ok)return d(p,S.errorMessage);let A=kM(e.installedIds,c,u.judge);return A===null?d(p,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:u.judge,improver:u.improver,workingDirectory:S.path,passScore:h.passScore,modulePassScore:y.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:A,runnerInstructions:a}}});var Ms,rg,S6,Dw,Vj,tg,qj,A6,Kj,$w,b6,P6,w6,Hw,Jj,Yj,Xj=l(()=>{"use strict";Ms=g(require("node:fs")),rg=g(require("node:path"));Ae();He();S6=["remember","choose-folder","run"],Dw=()=>({folder:Qo,judge:"",improver:"",runner:""}),Vj=e=>rg.default.join(rg.default.dirname(e),"prompt-optimizer-preferences.json"),tg=e=>typeof e=="string"?e:"",qj=e=>{let t=Vj(e);if(!Ms.default.existsSync(t))return Dw();try{let r=JSON.parse(Ms.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return Dw();let o=r,n=tg(o.folder).trim();return{folder:n.length===0?Qo:n,judge:tg(o.judge),improver:tg(o.improver),runner:tg(o.runner)}}catch{return Dw()}},A6=(e,t)=>{let r=Vj(e);Ms.default.mkdirSync(rg.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;Ms.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),Ms.default.renameSync(o,r)},Kj=(e,t)=>e===T||tn(t).some(r=>r===e),$w=(e,t,r)=>e===null?t:e.length===0?"":Kj(e,r)?e:t,b6=(e,t)=>{if(e===null)return t;let r=en(e);return r.ok?r.display:t},P6=e=>{let t=qj(e.storePath),r={folder:b6(e.folder,t.folder),judge:$w(e.judge,t.judge,e.installedIds),improver:$w(e.improver,t.improver,e.installedIds),runner:$w(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||A6(e.storePath,r)},w6=e=>{let t=en(e);return t.ok?t.display:Qo},Hw=(e,t)=>Kj(e,t)?e:"",Jj=e=>{let t=qj(e.storePath);return{selection:{...e.selection,judge:Hw(t.judge,e.installedIds)||e.selection.judge,improver:Hw(t.improver,e.installedIds)||e.selection.improver,runner:Hw(t.runner,e.installedIds)||e.selection.runner},defaultFolder:w6(t.folder)}},Yj=e=>{let t=e.posted.get("intent")??"";if(!S6.includes(t))return;let r=e.posted.get("folder");P6({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var Zj,v6,_6,Fw,W6,og,ng=l(()=>{"use strict";Zj=g(require("node:os"));Ae();Lw();Ps();v6="Reply with the single word ok. Do not use tools.",_6=45e3,Fw=async(e,t)=>{if(t===T)return{ok:!0,message:"You will do this step."};let r=Mz(e,t);if(r!==null)return{ok:!0,message:r};let o=await Fe({writerAgent:t,prompt:v6,workingDirectory:Zj.default.tmpdir(),timeoutMs:_6});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ne(t)} is ready.`;return Nz(e,t,n),{ok:!0,message:n}},W6=e=>[...new Set(e.filter(t=>t.length>0))],og=async(e,t,r,o)=>{for(let n of W6([t,r,o??""])){let s=await Fw(e,n);if(!s.ok)return s.message}return null}});var Uw,Qj=l(()=>{"use strict";R();Uw=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!C(r.status)&&!(t!==null&&r.id===t))return r;return null}});var eD,tD=l(()=>{"use strict";At();R();zl();Nw();jw();Mw();Ze();He();Xj();Tw();ng();Qj();Bm();dn();eD=async e=>{let t=e.posted===null?Jj({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=eg({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>$r("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(Yj({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Qe(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await og(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await Hl(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Qe(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:$t(e.route.storePath),resumableWizardCycle:Uw($t(e.route.storePath),null)});return}if(r.kind==="start"){let s=cj(r.workingDirectory,r.sourceSkillFile),i=Zm({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,wizard:WP({...cl(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(D(e.route.storePath,i),be(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(Xr(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:J(e.route.storePath,e.cycleId);n!==null&&(n=ln(e.route.storePath,n),be(e.route.storePath,n.id)),await Hl(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:$t(e.route.storePath),resumableWizardCycle:Uw($t(e.route.storePath),n?.id??null)})}});var rD,oD=l(()=>{"use strict";Ze();rD=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";lM(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var nD,sD=l(()=>{"use strict";nD=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var iD,aD=l(()=>{"use strict";vM();Bz();Dj();tD();oD();Fl();sD();dn();iD=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await Jm(),o=Os(r),n=e.method==="POST"?nD(e.request.headers["content-type"],await e.readBody(e.request)):null;if(Uz({posted:n,storePath:e.storePath,response:e.response})||await jj(e,n,o))return;let s=Uj(t.searchParams.get("example")),i=rD({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=wM({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await eD({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:PM(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var L6,lD,cD=l(()=>{"use strict";R();Ze();L6=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",lD=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=J(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!C(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=LP({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${L6(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var dD,uD=l(()=>{"use strict";zl();Ze();dD=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:J(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":Xr(e.storePath,o)),!0}});var k6,pD,mD=l(()=>{"use strict";Ae();ng();k6=["claude-cli","codex","cursor","antigravity"],pD=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===T||k6.includes(t)?await Fw(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var gD,fD=l(()=>{"use strict";R();gD=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:il,page:al,context:ys,installedWriters:e,post:{method:"POST",url:il,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${il}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var Bw,hD=l(()=>{"use strict";R();Rl();Bw=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ie(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null}))),o=C(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:o,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:xs(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:ys,page:`${al}?cycle=${encodeURIComponent(e.id)}`}}});var Ne,E6,yD,SD,AD=l(()=>{"use strict";Ne=g(di());R();E6=(0,Ne.isType)({goal:Ne.isString,prompt:Ne.isString,workingDirectory:Ne.isString,judge:(0,Ne.isUndefinedOr)(Ne.isString),improver:(0,Ne.isUndefinedOr)(Ne.isString),passScore:(0,Ne.isUndefinedOr)(Ne.isNumber),maxRounds:(0,Ne.isUndefinedOr)(Ne.isNumber)}),yD=e=>{let t=e?.trim()??"";return t.length===0?null:t},SD=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return E6(t)?t.workingDirectory.trim().length===0?{ok:!1,error:nm}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:yD(t.judge),improver:yD(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:nm}}});var C6,bD,PD=l(()=>{"use strict";R();Ae();jw();Fl();C6=e=>e.map(t=>t.id).join(", "),bD=e=>{let t=Os(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===T||n===T)return{ok:!1,error:pP,installedWriters:t.writers};if(o===null||n===null){let a=C6(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o}),i=eg({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var wD,vD=l(()=>{"use strict";R();Nw();fD();hD();Fl();AD();PD();Ze();wD=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=J(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:Bw(c)}}let r=await e.handlers.readInstalledIds(),o=Os(r);if(e.method==="GET")return{status:200,body:gD(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let n=SD(e.rawBody);if(!n.ok)return{status:400,body:{ok:!1,error:n.error,installedWriters:o.writers}};let s=bD({body:n.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver,s.runner);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:o.writers}};let a=Zm({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds,wizard:cl(s.prompt),runnerModel:s.runner});return D(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:Bw(a)}}});var _D,WD=l(()=>{"use strict";dn();ng();vD();_D=async e=>{let t=await wD({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:Jm,readWritersReady:og,startCycle:be}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var R6,Gw,LD=l(()=>{"use strict";yI();aD();cD();uD();mD();WD();R6=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},Gw=async e=>{let t=R6(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await _D(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:hI()})),!0):(await pD({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||lD({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||dD({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await iD(e),!0)}});var kD=l(()=>{"use strict";LD()});var un,Ul,x6,T6,I6,O6,ED,CD=l(()=>{"use strict";un=g(require("node:fs")),Ul=g(require("node:path")),x6="prompt-optimizer-cycles.json",T6="prompt-optimizer-preferences.json",I6="prompt-sdlc-cycles.json",O6="prompt-sdlc-preferences.json",ED=e=>{let t=Ul.default.join(e,x6),r=Ul.default.join(e,I6);if(un.default.existsSync(t)||!un.default.existsSync(r))return t;try{un.default.renameSync(r,t)}catch{return r}let o=Ul.default.join(e,O6),n=Ul.default.join(e,T6);if(un.default.existsSync(o)&&!un.default.existsSync(n))try{un.default.renameSync(o,n)}catch{}return t}});var Ns,M6,Vw,RD=l(()=>{"use strict";Ns=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),M6=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],Vw=e=>{let t=M6.map(i=>`<option value="${Ns(i.value)}">${Ns(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Ns(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Ns(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Ns(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Ns(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Bl,ID,N6,OD,z6,j6,MD,ig,xD,TD,D6,$6,yr,Gl,sg,H6,ag,qw,F6,Kw,ND,Jw,zD,U6,B6,G6,jD,DD,$D,Vl=l(()=>{"use strict";Bl=g(require("node:fs")),ID=g(require("node:path")),N6="estimate-history.ndjson",OD=100,z6=500,j6=2e4,MD=e=>ID.default.join(e,N6),ig=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,z6),xD=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,j6),TD=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,D6=e=>({...e,estimateTokens:TD(e.estimateTokens),actualTokens:TD(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),$6=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},yr=e=>{let t=MD(e);return Bl.default.existsSync(t)?Bl.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return $6(n)?[D6(n)]:[]}catch{return[]}}):[]},Gl=(e,t)=>{Bl.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Bl.default.writeFileSync(MD(e),r,"utf8")},sg=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),H6=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${sg(o.task)} | ${sg(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},ag=e=>{let t=yr(e.reportsDir),r=ig(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Gl(e.reportsDir,[...s,n])},qw=e=>{let t=yr(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?ig(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Gl(e.reportsDir,[...i,s])},F6=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-OD),Kw=e=>[...yr(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),ND=e=>{let t=yr(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=xD(e.input),n=xD(e.output),s=ig(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Gl(e.reportsDir,[...c,a])},Jw=(e,t)=>{let r=yr(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},zD=e=>({table:H6(F6(yr(e))),embedding:null}),U6=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},B6=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-OD),G6=e=>{let t=U6(B6(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${sg(s.task)} | ${sg(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},jD=e=>{let t=yr(e.reportsDir),r=ig(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Gl(e.reportsDir,[...s,n])},DD=e=>{let t=yr(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Gl(e.reportsDir,[...s,n])},$D=e=>G6(yr(e))});var HD=l(()=>{"use strict";Vl()});var Sr,Yw,V6,Xw,q6,K6,lg,cg,J6,Zw,FD=l(()=>{"use strict";HD();cw();Sr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Yw=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},V6=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${Yw(-r)} under`:`${Yw(r)} over`},Xw=e=>e.toLocaleString("en-US"),q6=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${Xw(-r)} under`:`${Xw(r)} over`},K6=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},lg=e=>e===null?"\u2014":Yw(e),cg=e=>e===null?"\u2014":Xw(e),J6=`(function () {
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
})();`,Zw=e=>{let r=Kw(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":V6(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":q6(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${Sr(K6(i))}</button></td>
        <td>${Sr(c)}</td>
        <td>${lg(n.estimateSeconds)}</td>
        <td>${lg(n.actualSeconds)}</td>
        <td>${Sr(d)}</td>
        <td>${cg(n.estimateTokens)}</td>
        <td>${cg(n.actualTokens)}</td>
        <td>${Sr(p)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${Sr(c)}</p>
        <h2>Input</h2>
        <pre>${Sr(i)}</pre>
        <h2>Output</h2>
        <pre>${Sr(a)}</pre>
        <p>Time: estimated ${lg(n.estimateSeconds)} \xB7 actual ${lg(n.actualSeconds)} \xB7 ${Sr(d)}</p>
        <p>Tokens: estimated ${cg(n.estimateTokens)} \xB7 actual ${cg(n.actualTokens)} \xB7 ${Sr(p)}</p>
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
            ${Nm({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${J6}</script>`}
    </section>`}});var UD=l(()=>{"use strict";RD();FD()});var zs,Y6,X6,Qw,BD=l(()=>{"use strict";zs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Y6=(e,t,r)=>{let o=zs(t),n=zs(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},X6=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${zs(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>Y6(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${zs(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${zs(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${zs(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},Qw=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(X6).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var GD=l(()=>{"use strict";BD()});var ql,VD,qD,ev,tv,rv,KD=l(()=>{"use strict";ql=g(require("node:fs")),VD=g(require("node:path"));Va();Hp();qD=(e,t,r)=>ds({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,ev=(e,t,r)=>{let o=qD(e,t,r);if(o===null)return[];if(!ql.default.existsSync(o))return[];let n=ql.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},tv=e=>{let t=qD(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:lr(e.entry.prompt),output:lr(e.entry.output)};ql.default.mkdirSync(VD.default.dirname(t),{recursive:!0}),ql.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},rv=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var Z6,Q6,Kl,dg,ov=l(()=>{"use strict";Z6=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Q6=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Kl=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=Z6(i.assistantOutput),d=c.length>0?`Assistant: ${Q6(c,t)}`:null,p=[a,d].filter(m=>m!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},dg=e=>{let t=e.userMessage.trim(),r=Kl({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Vt,Jl,iv,eJ,tJ,nv,rJ,av,ug,JD,YD,oJ,js,lv,sv,XD,nJ,ZD,Ds,pg,Yl,sJ,Xl,cv,mg,gg,QD=l(()=>{"use strict";Vt=g(require("node:fs")),Jl=g(require("node:path")),iv=require("node:crypto");ov();eJ="writer-sessions",tJ="active-index.json",nv=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rJ=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",av=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},ug=e=>{let t=Jl.default.join(e.installDir,eJ);return Vt.default.mkdirSync(t,{recursive:!0}),t},JD=e=>Jl.default.join(ug(e),tJ),YD=(e,t)=>Jl.default.join(ug(e),`${t}.canonical.json`),oJ=(e,t)=>Jl.default.join(ug(e),`${t}.continuation.json`),js=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,lv=e=>{let t=JD(e);if(!Vt.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Vt.default.readFileSync(t,"utf8"));if(!nv(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!nv(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!rJ(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},sv=(e,t)=>{Vt.default.writeFileSync(JD(e),JSON.stringify(t,null,2))},XD=(e,t)=>{Vt.default.writeFileSync(YD(e,t.sessionId),JSON.stringify(t,null,2))},nJ=(e,t)=>{Vt.default.writeFileSync(oJ(e,t.sessionId),JSON.stringify(t,null,2))},ZD=(e,t)=>{let r=Kl({turns:t.turns});nJ(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Ds=(e,t)=>{let r=YD(e,t);if(!Vt.default.existsSync(r))return null;try{let o=JSON.parse(Vt.default.readFileSync(r,"utf8"));return!nv(o)||typeof o.sessionId!="string"?null:o}catch{return null}},pg=(e,t=20)=>{let r=ug(e),o=Vt.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Ds(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Yl=(e,t,r)=>{let o=av(r);return lv(e).entries.find(i=>js(i)===js({writerAgent:t,projectFolderPath:o}))?.sessionId??null},sJ=(e,t,r,o)=>{let n=lv(e),s=js({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>js(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];sv(e,{entries:i})},Xl=(e,t,r)=>{let o=(0,iv.randomUUID)(),n=new Date().toISOString(),s=av(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return XD(e,i),ZD(e,i),sJ(e,t,s,o),o},cv=(e,t,r)=>{let o=Yl(e,t,r);return o!==null?o:Xl(e,t,r)},mg=(e,t,r)=>{let o=av(r),n=lv(e);if(o===null&&r===void 0){sv(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=js({writerAgent:t,projectFolderPath:o});sv(e,{entries:n.entries.filter(i=>js(i)!==s)})},gg=e=>{let t=cv(e.layout,e.writerAgent,e.projectFolderPath),r=Ds(e.layout,t);if(r===null)return;let o={id:(0,iv.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};XD(e.layout,n),ZD(e.layout,n)}});var iJ,aJ,fg,dv,e$=l(()=>{"use strict";iJ=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",aJ=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},fg=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",dv=e=>{let t=fg(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=iJ(r,e.userPromptCharacterCount),n=aJ({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var hg=l(()=>{"use strict";KD();QD();ov();e$()});var t$=l(()=>{"use strict";uy()});var Be,cJ,dJ,uv,pv,mv,r$=l(()=>{"use strict";pe();t$();Be=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cJ=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},dJ=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=Pu(o);return`value="${Be(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${Be(r)}"`},uv=(e,t,r,o,n)=>{let s=Dy[t];return`<label class="field">
          <span class="field-label">${Be(o)} API key \u2014 ${Be(cJ(e,t))} \xB7 <a class="field-link" href="${Be(s.href)}" target="_blank" rel="noopener noreferrer">${Be(s.label)}</a></span>
          <input class="input mono" type="password" name="${Be(r)}" autocomplete="off" ${dJ(e,t,n)} />
        </label>`},pv=(e,t,r,o)=>{let n=py(e[t]?.model),s=new Set(mu[t].map(c=>c.value)),i=mu[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${Be(c.value)}"${d}>${Be(c.label)}</option>`}).join(""),a=n!==Lo&&!s.has(n)?`<option value="${Be(n)}" selected>${Be(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${Be(o)}</span>
          <select class="input mono" name="${Be(r)}">${i}${a}</select>
        </label>`},mv=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Be(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${uv(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${pv(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${uv(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${pv(e.secrets,"openai","openaiModel","OpenAI model")}
        ${uv(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${pv(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var o$=l(()=>{"use strict";r$()});var yg,n$,s$=l(()=>{"use strict";yg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),n$=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${yg(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${yg(s.name)}</strong> <span class="muted mono">(${yg(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${yg(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var uJ,i$,a$,l$=l(()=>{"use strict";uJ=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,i$=e=>e.kind==="folder",a$=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&i$(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(i$(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(uJ)};return r(t)}});var c$,gv,d$=l(()=>{"use strict";c$=g(require("node:path")),gv=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${gv(r.children,t)}</ul>
            </details>
          </li>`;let o=c$.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var u$,Zr,pJ,mJ,Zl,gJ,fv,p$=l(()=>{"use strict";Vp();u$=g(require("node:path"));s$();l$();d$();Zr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pJ=()=>`(() => {
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

})();`,mJ=()=>`(() => {
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
})();`,Zl=e=>{let t=Xa({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=n$({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${Zr(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Zr(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':gJ(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Zr(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Zr(s)}" />
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
    <script>${pJ()}</script>
    <script>${mJ()}</script>`;return`${t}${r}${o}${c}${d}`},gJ=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=a$(a.items.map(b=>({...b,relativePath:typeof b.relativePath=="string"&&b.relativePath.length>0?b.relativePath:u$.default.relative(a.sourceRoot,b.sourcePath).replaceAll("\\","/")}))),p=gv(d,Zr),m=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Zr(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Zr(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${m} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Zr(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},fv=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??p??a,b=t.sets[i];if(b===void 0)continue;let h=a.length>0?a:b.proposedSlug,y=m.length>0?m:b.proposedName,u=r.has(i),S=b.items.map(A=>({id:A.id,kind:A.kind,title:A.title,sourcePath:A.sourcePath,include:u}));s.push({slug:h,name:y,items:S})}return s}});var m$=l(()=>{"use strict";p$()});var fJ,hv,g$=l(()=>{"use strict";ir();fJ=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[Ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},hv=fJ});var hJ,f$,h$=l(()=>{"use strict";ir();hJ=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[Ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},f$=hJ});var y$=l(()=>{"use strict"});var pn,yJ,yv,S$=l(()=>{"use strict";Vp();VS();pn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yJ=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,yv=e=>{let t=e.flashError?`<div class="alert-error">${pn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${pn(e.flashMessage)}</div>`:"",r=Xa({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${pn(yJ(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,p=`<a class="btn btn-secondary btn-compact" href="${pn(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=cp(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
                  <input type="hidden" name="projectId" value="${pn(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${pn(n.name)}</strong>
                  <span class="muted mono">${pn(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${p}${m}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var A$=l(()=>{"use strict";y$();qS();S$()});var Sg,b$=l(()=>{"use strict";Sg=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var P$,kt,Sv=l(()=>{"use strict";P$=g(require("node:path"));Mt();Tt();V();pe();tt();kt=e=>{let t=$()?.layout.installDir??k();if(P$.default.basename(t)===co)return gt;let r=$(),o=r!==null?xe(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):gt}});var Av,w$=l(()=>{"use strict";tt();Sv();Av=async e=>{let t=Re(e.installDir),r=t?.bundleVersion??null,o=kt(t);try{let n=await jn(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:bo(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var bv,v$=l(()=>{"use strict";bv=e=>!e});var Pv,$s,wv=l(()=>{"use strict";V();Pv=()=>`http://127.0.0.1:${uh()}/update/run`,$s=async e=>{try{let t=await fetch(Pv(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var SJ,_$,vv,W$=l(()=>{"use strict";V();te();wv();SJ=()=>{Qt({launchAgentLabel:se(),installDir:k()})},_$=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},vv=async()=>{SJ();let e=await $s({force:!0});if(e.ok)return{ok:!0,message:_$(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:_$(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(tt(),LE)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var _v=l(()=>{"use strict";jb();b$();Sv();w$();v$();W$();wv()});var L$,k$=l(()=>{"use strict";L$=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var E$,C$,Wv,Lv,R$=l(()=>{"use strict";E$=require("node:crypto"),C$=g(require("node:fs"));At();pe();pe();k$();Wv=!1,Lv=async e=>{if(Wv)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!L$(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&C$.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,E$.randomUUID)();Wv=!0;try{if(await zS(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Gn({...r,workspace:n},e.writerAgent,t);return await Sa(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Wv=!1}}});var x$=l(()=>{"use strict";R$()});var st,AJ,T$,I$,kv,Ev,Cv,Rv,xv,Tv,Iv=l(()=>{"use strict";st=require("node:crypto"),AJ=Buffer.from("302a300506032b6570032100","hex"),T$=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},I$=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,st.createPublicKey)({key:Buffer.concat([AJ,t]),format:"der",type:"spki"})},kv=()=>{let{publicKey:e,privateKey:t}=(0,st.generateKeyPairSync)("ed25519");return{publicKeyRaw:T$(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Ev=e=>(0,st.createPrivateKey)(e),Cv=(e,t)=>(0,st.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),Rv=(e,t,r)=>{try{let o=I$(e);return(0,st.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},xv=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,Tv=()=>(0,st.randomBytes)(32).toString("base64url")});var Ar,Ag,O$,bJ,PJ,bg,Ov,Mv,M$=l(()=>{"use strict";Ar=g(require("node:fs")),Ag=g(require("node:path"));Iv();V();Tt();O$=e=>Ag.default.join(e.installDir,Er),bJ=(e,t)=>{if(e.profileEmail===null||t===O$(e)||Ar.default.existsSync(t))return;let r=O$(e);Ar.default.existsSync(r)&&(Ar.default.mkdirSync(Ag.default.dirname(t),{recursive:!0}),Ar.default.renameSync(r,t))},PJ=e=>{if(!Ar.default.existsSync(e))return null;try{let t=Ar.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},bg=e=>{let t=Hd(e);bJ(e,t);let r=PJ(t);if(r!==null)return r;let o=kv();return Ar.default.mkdirSync(Ag.default.dirname(t),{recursive:!0}),Ar.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},Ov=e=>{let t=bg(e.layout),r=Tv(),o=xv({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=Ev(t.privateKeyPem),s=Cv(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Mv=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return Rv(e.serverPublicKey,t,e.serverAttestation)}});var Nv=l(()=>{"use strict";M$();Iv()});var D$,Ql,Dv,$v,N$,wJ,zv,Pg,ce,$$,vJ,jv,_J,WJ,Hv,me,ke,qt,LJ,z$,j$,ec,tc,H$=l(()=>{"use strict";D$=g(require("node:http")),Ql=g(require("node:fs")),Dv=g(require("node:path"));wg();Ua();kT();CT();MT();ts();ub();Mb();pI();gI();kD();CD();UD();GD();hg();o$();m$();To();At();ir();g$();h$();A$();_v();tt();x$();pe();Nv();$v=e=>QA(e)??"never",N$=48e3,wJ=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,zv=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Ju(),reveal:t.reveal,installed:Dr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Pg=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:Xn(t,e)},ce=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$$=200,vJ=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',jv=e=>{let t=e.trim().slice(0,$$),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},_J=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ce(t)}</div>`,WJ=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ce(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',Hv={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},me=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...Hv}),e.end(JSON.stringify(r))},ke=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},qt=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},LJ=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=vJ(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${ce(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=bv(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Ba(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${ce(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ce(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ce($v(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ce(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},z$=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},j$=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,$$)},ec=e=>{let t=Dv.default.join(e.layout.installDir,"link-code.txt"),r=()=>Re(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:Sg(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let y=h.installVersion??r(),u=await i(),S=Fb(u),A=h.updateFlash??null,f=Ub(A),w=_J(A,h.updateError??null);return $b({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:kt(y),installBundleVersionLabel:Sg(y),prependBody:`${f}${w}${S}`,headerUpdateButtonHtml:Hb(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await Av(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:jv("An update is already running.")}),h.end();return}c=!0;try{let u=await vv(),S=u.ok?"/?update=ok":jv(u.message);h.writeHead(303,{Location:S}),h.end()}catch(u){let S=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:jv(S)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",S=o(),A=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:S.installVersion,body:`<section class="card">
      <h1>${ce(y)}</h1>
      <p>${ce(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(A)},m=()=>{if(Ql.default.existsSync(t))return Ql.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return Ql.default.writeFileSync(t,h,"utf8"),h},b=D$.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",S=h.method??"GET";if(S==="OPTIONS"){y.writeHead(204,Hv),y.end();return}if(!await Gw({method:S,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:ED(Dv.default.dirname(e.layout.configPath)),readBody:qt,sendHtml:ke,renderShell:n})){if(S==="GET"&&u==="/health"){let A=e.controllers.getStatus(),f=o();me(y,200,{ok:!0,...A,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/status"){let A=o();me(y,200,{...e.controllers.getStatus(),linkCode:m(),installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/traffic"){me(y,200,{entries:Ha(e.layout)});return}if(S==="DELETE"&&u==="/api/traffic"||S==="POST"&&u==="/api/traffic/clear"){if(rb(e.layout),S==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}me(y,200,{ok:!0});return}if(S==="GET"&&u==="/api/trace"){me(y,200,{entries:zp(e.layout)});return}if(S==="DELETE"&&u==="/api/trace"||S==="POST"&&u==="/api/trace/clear"){if(sb(e.layout),S==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}me(y,200,{ok:!0});return}if(S==="POST"&&u==="/api/errors/clear"){ib(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(S==="GET"&&u==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let w=await ps({layout:e.layout,query:f,limit:20});me(y,200,{chunks:w,query:f});return}me(y,200,{chunks:us(e.layout).slice(-50).reverse()});return}if(S==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(S==="GET"&&u==="/api/update-status"){let A=await i();me(y,200,{ok:!0,...A});return}if((S==="GET"||S==="POST")&&u==="/api/update"){await d(y);return}if(S==="GET"&&u==="/"){let A=e.controllers.getStatus(),f=o(),w=Dr(e.layout),v=jp(e.layout.errorLogPath);ke(y,await n({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:z$(h.url??void 0),updateError:j$(h.url??void 0),body:Bb({wsConnected:A.wsConnected,lastHeartbeatAt:A.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:us(e.layout).length,trafficEntryCount:Ha(e.layout).length,wakeError:A.wakeError,errorLogByteSize:v.byteSize,errorLogExists:v.exists})}));return}if(S==="GET"&&u==="/task"){let A=e.controllers.getStatus(),f=o(),w=$(),v=new URL(h.url??"/",`http://127.0.0.1:${43347}`),W=v.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,L=v.searchParams.get("failed")==="1"?v.searchParams.get("error")?.trim()??"Task failed.":null,E=v.searchParams.get("runId");ke(y,await n({title:"Task",activePath:"/task",installVersion:f.installVersion,body:Vw({defaultWorkspace:w?.workspace??"",wsConnected:A.wsConnected,flashMessage:W,flashError:L,lastRunId:E})}));return}if(S==="POST"&&u==="/task/dispatch"){let A=await qt(h),f=new URLSearchParams(A),w=f.get("prompt")?.trim()??"",v=f.get("writerAgent")?.trim()??"claude-cli",W=f.get("projectFolder")?.trim()??"",L=await Lv({prompt:w,writerAgent:v,...W.length>0?{projectFolderPath:W}:{}}),E=new URLSearchParams;L.ok?E.set("ok","1"):(E.set("failed","1"),L.errorMessage!==void 0&&E.set("error",L.errorMessage.slice(0,240))),L.agentRunId!==void 0&&E.set("runId",L.agentRunId),y.writeHead(303,{Location:`/task?${E.toString()}`}),y.end();return}if(S==="GET"&&u==="/writer-sessions"){let A=o(),f=pg(e.layout,12);ke(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:A.installVersion,updateFlash:z$(h.url??void 0),updateError:j$(h.url??void 0),body:Qw({sessions:f})}));return}if(S==="GET"&&u==="/errors"){let A=o(),f=jp(e.layout.errorLogPath);ke(y,await n({title:"Errors",activePath:"/errors",installVersion:A.installVersion,body:lb({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(S==="GET"&&u==="/status"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),w=_e(e.layout),v=w!==null?je(w,12e4):pb(f.lastHeartbeatAt,12e4),W=mb({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:v}),L=o();ke(y,await n({title:"Status",activePath:"/status",installVersion:L.installVersion,body:`${LJ({status:f,healthBadge:W,revived:A.searchParams.get("revived")==="1",linkCode:m(),installBundleVersion:L.installBundleVersion,installBundleUpdatedAt:L.installBundleUpdatedAt})}${hb({installDir:e.layout.installDir})}${fb({entries:zp(e.layout)})}`}));return}if(S==="GET"&&u==="/traffic"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=Ha(e.layout),w=o(),v=f.map(E=>`<tr><td title="${ce(E.at)}">${ce($v(E.at))}</td><td>${ce(E.direction)}</td><td><code>${ce(E.type)}</code></td><td>${ce(E.summary)}</td><td>${ce(E.action??"")}</td></tr>`).join(""),W=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${v}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',L=A.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";ke(y,await n({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${L}
              ${W}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(S==="GET"&&u==="/projects"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=kt(f.installVersion),v=await Pg(e.layout),W=A.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":A.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,L=A.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,E=$(),x=E===null?null:Y({wsUrl:E.wsUrl,pairingToken:E.pairingToken}),I=x===null?{}:Object.fromEntries((await Promise.all(v.projects.map(async M=>{let B=await hv(x,M.id);return[M.id,B?.counts??null]}))).filter(M=>M[1]!==null));ke(y,await n({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:yv({projects:v.projects,compositionCountsByProjectId:I,cloudAppOrigin:w,syncMessage:v.message,syncOk:v.ok,flashMessage:L,flashError:W})}));return}if(S==="GET"&&u==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=$(),v=w===null?null:Y({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),W=f.length>0&&v!==null?$r():null;if(W===null||v===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Je({projectFolderPath:W}),!await wa(v,f,W)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(S==="POST"&&u==="/projects/delete"){let A=await qt(h),f=new URLSearchParams(A).get("projectId")?.trim()??"",w=$(),v=w===null?null:Y({wsUrl:w.wsUrl,pairingToken:w.pairingToken});if(v===null||f.length===0){y.writeHead(303,{Location:"/projects?deleteError=1"}),y.end();return}let W=await QS(v,f);y.writeHead(303,{Location:W.ok?"/projects?deleted=1":"/projects?deleteError=1"}),y.end();return}if(S==="GET"&&u==="/project"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=A.searchParams.get("id")?.trim()??"",w=o(),v=kt(w.installVersion),W=await Pg(e.layout),L=No(W.projects,f);if(L===null){await p(y,"Project not found");return}let E=A.searchParams.get("linked")==="1"?A.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${A.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${A.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:A.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,x=A.searchParams.get("knowledgePromoted"),I=x!==null?`Marked ${x} lesson(s) as promoted in Agent Witch.`:null,M=A.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,B=A.searchParams.get("tab")?.trim()??"harness",q=B==="workflows"||B==="agents"||B==="knowledge"?B:"harness",F=$(),ct=F===null?null:Y({wsUrl:F.wsUrl,pairingToken:F.pairingToken}),H=ct===null?null:await hv(ct,L.id),fe=0;if(ct!==null)try{let oo=await fetch(`${ct.appOrigin}/api/agent-witch/projects/${encodeURIComponent(L.id)}/knowledge`,{method:"GET",headers:{[Ie]:ct.pairingToken},signal:AbortSignal.timeout(1e4)});if(oo.ok){let Ct=await oo.json();typeof Ct=="object"&&Ct!==null&&typeof Ct.candidateCount=="number"&&(fe=Ct.candidateCount)}}catch{fe=0}ke(y,await n({title:L.name,activePath:"/projects",installVersion:w.installVersion,body:Zn({project:L,cloudAppOrigin:v,installed:Dr(e.layout),linkedSetSlugs:zr(L.projectFolderPath),composition:H,knowledgeCandidateCount:fe,activeTab:q,flashMessage:E??I,flashError:M})}));return}if(S==="POST"&&u==="/projects/pull-bound-harness"){let A=await qt(h),f=await KS({rawBody:A,layout:e.layout});if(f.kind==="not_found"){await p(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let w=o();ke(y,await n({title:f.title,activePath:"/projects",installVersion:w.installVersion,body:f.body}));return}if(S==="POST"&&u==="/projects/link-harness"){let A=await qt(h),f=new URLSearchParams(A),w=f.get("projectId")?.trim()??"",v=await Pg(e.layout),W=No(v.projects,w);if(W===null){await p(y,"Project not found");return}let L=f.getAll("applySet").map(q=>String(q)),E=ca({layout:e.layout,projectFolderPath:W.projectFolderPath,setSlugs:L});if(!E.ok){let q=o(),F=kt(q.installVersion);ke(y,await n({title:W.name,activePath:"/projects",installVersion:q.installVersion,body:Zn({project:W,cloudAppOrigin:F,installed:Dr(e.layout),linkedSetSlugs:zr(W.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:E.errorMessage})}));return}let x=$(),I=x===null?null:Y({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),M=I===null?!1:await ba(I,W.id,E.appliedSetSlugs),B=new URLSearchParams({linked:"1",files:String(E.writtenFileCount),bindingsSynced:M?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(W.id)}&${B.toString()}`}),y.end();return}if(S==="POST"&&u==="/project/knowledge/promote-all"){let A=await qt(h),w=new URLSearchParams(A).get("projectId")?.trim()??"",v=await Pg(e.layout),W=No(v.projects,w);if(W===null){await p(y,"Project not found");return}let L=$(),E=L===null?null:Y({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),x=E===null?{ok:!1,promotedCount:0}:await f$(E,W.id),I=new URLSearchParams({tab:"knowledge",...x.ok?{knowledgePromoted:String(x.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(W.id)}&${I.toString()}`}),y.end();return}if(S==="GET"&&u==="/harness"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=ma(e.layout),v=A.searchParams.get("submitted")==="1",W=v?A.searchParams.get("syncFailed")==="1"?`Local harness updated (${A.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:A.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${A.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":A.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:A.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,L=w?.scanRoots[0]??Ju(),E=wJ(e.layout,{reveal:w,importQuery:A.searchParams.get("import")==="1",justSubmitted:v}),x=kt(f.installVersion);ke(y,await n({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:Zl(zv(e.layout,{cloudAppOrigin:x,reveal:w,scanFolder:L,flashMessage:W,importSectionExpanded:E}))}));return}if(S==="POST"&&u==="/api/harness/pick-folder"){let A=$r();if(A===null){me(y,200,{cancelled:!0});return}me(y,200,{path:A});return}if(S==="GET"&&u==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=la(f);if(w===null){me(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let v=Ql.default.readFileSync(w,"utf8"),W=v.length>N$?`${v.slice(0,N$)}
\u2026 (truncated)`:v;me(y,200,{content:W})}catch{me(y,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&u==="/api/harness/reveal/add-project"){let A=await qt(h),f="";try{let W=JSON.parse(A);typeof W=="object"&&W!==null&&typeof W.projectPath=="string"&&(f=W.projectPath.trim())}catch{me(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){me(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=ma(e.layout),v=kS({reveal:w,projectPath:f});if(v===null||v.sets.length===0){me(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Qu(e.layout,v),me(y,200,{ok:!0,setCount:v.sets.length});return}if(S==="GET"&&u==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){me(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;h.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...Hv});let v=ES({scanRoot:f,response:y,shouldAbort:()=>w});Qu(e.layout,v),y.end();return}if(S==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&u==="/harness/submit"){let A=ma(e.layout);if(A===null){let x=o(),I=kt(x.installVersion);ke(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Zl(zv(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await qt(h),w=new URLSearchParams(f),v=fv(w,A),W=RS({layout:e.layout,sets:v});if(!W.ok){let x=o(),I=kt(x.installVersion);ke(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Zl(zv(e.layout,{cloudAppOrigin:I,reveal:A,flashError:W.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}TS(e.layout);let E=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${W.writtenItemCount??0}${E}`}),y.end();return}if(S==="GET"&&u==="/writer-api"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),w=$()?.writerExecutionBackend??Te(void 0),v=we(e.layout.configPath),W=Ir(v),L=A.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,E=o();ke(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:E.installVersion,body:mv({writerExecutionBackend:w,secrets:W,flashMessage:L})}));return}if(S==="POST"&&u==="/writer-api"){let A=await qt(h),f=new URLSearchParams(A),w=f.get("writerExecutionBackend")?.trim()??"cli";jy({configPath:e.layout.configPath,writerExecutionBackend:Te(w),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(S==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(S==="GET"&&u==="/history"){let A=o();ke(y,await n({title:"History",activePath:"/history",installVersion:A.installVersion,body:Zw({reportsDir:e.layout.reportsDir})}));return}if(S==="GET"&&u==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=o(),v=vb({layout:e.layout}),W=Lb(v),L=f.length>0?await ps({layout:e.layout,query:f,limit:20}):us(e.layout).slice(-50).reverse(),E=L.map(I=>{let M=Wb(v,I.id),B=M>0?` \xB7 used in ${M} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ce(I.createdAt)}">${ce($v(I.createdAt))}${I.source?` \xB7 ${ce(I.source)}`:""}${B}</div><pre>${ce(I.text)}</pre></article>`}).join(""),x=W.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${W.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${ce(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";ke(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ce(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${x}${E}${WJ(f,L.length)}`}));return}S==="POST"&&await qt(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return b.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),b.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${tr}`)}),b},tc=e=>bg(e).publicKeyRaw});var wg=l(()=>{"use strict";uT();pT();H$()});var U$={};Rt(U$,{runAgentWitchExternalLiveCli:()=>EJ});var Fv,F$,kJ,EJ,B$=l(()=>{"use strict";Fv=g(require("node:fs")),F$=g(require("node:path"));ts();V();te();wg();te();kJ=e=>{let t=F$.default.join(e,"link-code.txt");if(!Fv.default.existsSync(t))return null;let r=Fv.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},EJ=()=>{Ve("agent-witch-live");let e=k(),t=N(),r=kJ(e),o=tc(t);ec({layout:t,controllers:{getStatus:()=>{let n=_e(t);return{wsConnected:xa(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{fo(e)}}})}});var br=_((XCe,q$)=>{"use strict";var G$=["nodebuffer","arraybuffer","fragments"],V$=typeof Blob<"u";V$&&G$.push("blob");q$.exports={BINARY_TYPES:G$,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:V$,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var rc=_((ZCe,vg)=>{"use strict";var{EMPTY_BUFFER:CJ}=br(),Uv=Buffer[Symbol.species];function RJ(e,t){if(e.length===0)return CJ;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new Uv(r.buffer,r.byteOffset,o):r}function K$(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function J$(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function xJ(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Bv(e){if(Bv.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Uv(e):ArrayBuffer.isView(e)?t=new Uv(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Bv.readOnly=!1),t}vg.exports={concat:RJ,mask:K$,toArrayBuffer:xJ,toBuffer:Bv,unmask:J$};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");vg.exports.mask=function(t,r,o,n,s){s<48?K$(t,r,o,n,s):e.mask(t,r,o,n,s)},vg.exports.unmask=function(t,r){t.length<32?J$(t,r):e.unmask(t,r)}}catch{}});var Z$=_((QCe,X$)=>{"use strict";var Y$=Symbol("kDone"),Gv=Symbol("kRun"),Vv=class{constructor(t){this[Y$]=()=>{this.pending--,this[Gv]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Gv]()}[Gv](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[Y$])}}};X$.exports=Vv});var Us=_((eRe,rH)=>{"use strict";var oc=require("zlib"),Q$=rc(),TJ=Z$(),{kStatusCode:eH}=br(),IJ=Buffer[Symbol.species],OJ=Buffer.from([0,0,255,255]),Wg=Symbol("permessage-deflate"),Pr=Symbol("total-length"),Hs=Symbol("callback"),Qr=Symbol("buffers"),Fs=Symbol("error"),_g,qv=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!_g){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;_g=new TJ(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Hs];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!n.client_max_window_bits));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){_g.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){_g.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?oc.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=oc.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Wg]=this,this._inflate[Pr]=0,this._inflate[Qr]=[],this._inflate.on("error",NJ),this._inflate.on("data",tH)}this._inflate[Hs]=o,this._inflate.write(t),r&&this._inflate.write(OJ),this._inflate.flush(()=>{let s=this._inflate[Fs];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=Q$.concat(this._inflate[Qr],this._inflate[Pr]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Pr]=0,this._inflate[Qr]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?oc.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=oc.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Pr]=0,this._deflate[Qr]=[],this._deflate.on("data",MJ)}this._deflate[Hs]=o,this._deflate.write(t),this._deflate.flush(oc.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=Q$.concat(this._deflate[Qr],this._deflate[Pr]);r&&(s=new IJ(s.buffer,s.byteOffset,s.length-4)),this._deflate[Hs]=null,this._deflate[Pr]=0,this._deflate[Qr]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};rH.exports=qv;function MJ(e){this[Qr].push(e),this[Pr]+=e.length}function tH(e){if(this[Pr]+=e.length,this[Wg]._maxPayload<1||this[Pr]<=this[Wg]._maxPayload){this[Qr].push(e);return}this[Fs]=new RangeError("Max payload size exceeded"),this[Fs].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Fs][eH]=1009,this.removeListener("data",tH),this.reset()}function NJ(e){if(this[Wg]._inflate=null,this[Fs]){this[Hs](this[Fs]);return}e[eH]=1007,this[Hs](e)}});var Bs=_((tRe,Lg)=>{"use strict";var{isUtf8:oH}=require("buffer"),{hasBlob:zJ}=br(),jJ=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function DJ(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Kv(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function $J(e){return zJ&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Lg.exports={isBlob:$J,isValidStatusCode:DJ,isValidUTF8:Kv,tokenChars:jJ};if(oH)Lg.exports.isValidUTF8=function(e){return e.length<24?Kv(e):oH(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Lg.exports.isValidUTF8=function(t){return t.length<32?Kv(t):e(t)}}catch{}});var Qv=_((rRe,dH)=>{"use strict";var{Writable:HJ}=require("stream"),nH=Us(),{BINARY_TYPES:FJ,EMPTY_BUFFER:sH,kStatusCode:UJ,kWebSocket:BJ}=br(),{concat:Jv,toArrayBuffer:GJ,unmask:VJ}=rc(),{isValidStatusCode:qJ,isValidUTF8:iH}=Bs(),kg=Buffer[Symbol.species],it=0,aH=1,lH=2,cH=3,Yv=4,Xv=5,Eg=6,Zv=class extends HJ{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||FJ[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[BJ]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=it}_write(t,r,o){if(this._opcode===8&&this._state==it)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new kg(o.buffer,o.byteOffset+t,o.length-t),new kg(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new kg(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case it:this.getInfo(t);break;case aH:this.getPayloadLength16(t);break;case lH:this.getPayloadLength64(t);break;case cH:this.getMask();break;case Yv:this.getData(t);break;case Xv:case Eg:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[nH.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=aH:this._payloadLength===127?this._state=lH:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=cH:this._state=Yv}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=Yv}getData(t){let r=sH;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&VJ(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=Xv,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[nH.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===it&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=it;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=Jv(o,r):this._binaryType==="arraybuffer"?n=GJ(Jv(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=it):(this._state=Eg,setImmediate(()=>{this.emit("message",n,!0),this._state=it,this.startLoop(t)}))}else{let n=Jv(o,r);if(!this._skipUTF8Validation&&!iH(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===Xv||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=it):(this._state=Eg,setImmediate(()=>{this.emit("message",n,!1),this._state=it,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,sH),this.end();else{let o=t.readUInt16BE(0);if(!qJ(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new kg(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!iH(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=it;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=it):(this._state=Eg,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=it,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[UJ]=n,i}};dH.exports=Zv});var r_=_((nRe,mH)=>{"use strict";var{Duplex:oRe}=require("stream"),{randomFillSync:KJ}=require("crypto"),{types:{isUint8Array:JJ}}=require("util"),uH=Us(),{EMPTY_BUFFER:YJ,kWebSocket:XJ,NOOP:ZJ}=br(),{isBlob:Gs,isValidStatusCode:QJ}=Bs(),{mask:pH,toBuffer:mn}=rc(),at=Symbol("kByteLength"),e7=Buffer.alloc(4),Cg=8*1024,gn,Vs=Cg,Et=0,t7=1,r7=2,e_=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Et,this.onerror=ZJ,this[XJ]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||e7,r.generateMask?r.generateMask(o):(Vs===Cg&&(gn===void 0&&(gn=Buffer.alloc(Cg)),KJ(gn,0,Cg),Vs=0),o[0]=gn[Vs++],o[1]=gn[Vs++],o[2]=gn[Vs++],o[3]=gn[Vs++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[at]!==void 0?a=r[at]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(pH(t,o,d,s,a),[d]):(pH(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=YJ;else{if(typeof t!="number"||!QJ(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(JJ(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[at]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Et?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Gs(t)?(n=t.size,s=!1):(t=mn(t),n=t.length,s=mn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[at]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Gs(t)?this._state!==Et?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Et?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Gs(t)?(n=t.size,s=!1):(t=mn(t),n=t.length,s=mn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[at]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Gs(t)?this._state!==Et?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Et?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[uH.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Gs(t)?(a=t.size,c=!1):(t=mn(t),a=t.length,c=mn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[at]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Gs(t)?this._state!==Et?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Et?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[at],this._state=r7,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(t_,this,a,n);return}this._bufferedBytes-=o[at];let i=mn(s);r?this.dispatch(i,r,o,n):(this._state=Et,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(o7,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[uH.extensionName];this._bufferedBytes+=o[at],this._state=t7,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");t_(this,c,n);return}this._bufferedBytes-=o[at],this._state=Et,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Et&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][at],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][at],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};mH.exports=e_;function t_(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function o7(e,t,r){t_(e,t,r),e.onerror(t)}});var wH=_((sRe,PH)=>{"use strict";var{kForOnEventAttribute:nc,kListener:o_}=br(),gH=Symbol("kCode"),fH=Symbol("kData"),hH=Symbol("kError"),yH=Symbol("kMessage"),SH=Symbol("kReason"),qs=Symbol("kTarget"),AH=Symbol("kType"),bH=Symbol("kWasClean"),wr=class{constructor(t){this[qs]=null,this[AH]=t}get target(){return this[qs]}get type(){return this[AH]}};Object.defineProperty(wr.prototype,"target",{enumerable:!0});Object.defineProperty(wr.prototype,"type",{enumerable:!0});var fn=class extends wr{constructor(t,r={}){super(t),this[gH]=r.code===void 0?0:r.code,this[SH]=r.reason===void 0?"":r.reason,this[bH]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[gH]}get reason(){return this[SH]}get wasClean(){return this[bH]}};Object.defineProperty(fn.prototype,"code",{enumerable:!0});Object.defineProperty(fn.prototype,"reason",{enumerable:!0});Object.defineProperty(fn.prototype,"wasClean",{enumerable:!0});var Ks=class extends wr{constructor(t,r={}){super(t),this[hH]=r.error===void 0?null:r.error,this[yH]=r.message===void 0?"":r.message}get error(){return this[hH]}get message(){return this[yH]}};Object.defineProperty(Ks.prototype,"error",{enumerable:!0});Object.defineProperty(Ks.prototype,"message",{enumerable:!0});var sc=class extends wr{constructor(t,r={}){super(t),this[fH]=r.data===void 0?null:r.data}get data(){return this[fH]}};Object.defineProperty(sc.prototype,"data",{enumerable:!0});var n7={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[nc]&&n[o_]===t&&!n[nc])return;let o;if(e==="message")o=function(s,i){let a=new sc("message",{data:i?s:s.toString()});a[qs]=this,Rg(t,this,a)};else if(e==="close")o=function(s,i){let a=new fn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[qs]=this,Rg(t,this,a)};else if(e==="error")o=function(s){let i=new Ks("error",{error:s,message:s.message});i[qs]=this,Rg(t,this,i)};else if(e==="open")o=function(){let s=new wr("open");s[qs]=this,Rg(t,this,s)};else return;o[nc]=!!r[nc],o[o_]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[o_]===t&&!r[nc]){this.removeListener(e,r);break}}};PH.exports={CloseEvent:fn,ErrorEvent:Ks,Event:wr,EventTarget:n7,MessageEvent:sc};function Rg(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var xg=_((iRe,vH)=>{"use strict";var{tokenChars:ic}=Bs();function Kt(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function s7(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(p===-1&&ic[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);p===-1&&(p=m);let h=e.slice(c,p);d===44?(Kt(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(p===-1&&ic[d]===1)c===-1&&(c=m);else if(d===32||d===9)p===-1&&c!==-1&&(p=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);p===-1&&(p=m),Kt(r,e.slice(c,p),!0),d===44&&(Kt(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,m),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if(ic[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if(ic[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,p=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(p===-1&&ic[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))p===-1&&(p=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);p===-1&&(p=m);let h=e.slice(c,p);o&&(h=h.replace(/\\/g,""),o=!1),Kt(r,a,h),d===44&&(Kt(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=m);let b=e.slice(c,p);return i===void 0?Kt(t,b,r):(a===void 0?Kt(r,b,!0):o?Kt(r,a,b.replace(/\\/g,"")):Kt(r,a,b),Kt(t,i,r)),t}function i7(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}vH.exports={format:i7,parse:s7}});var Mg=_((cRe,MH)=>{"use strict";var a7=require("events"),l7=require("https"),c7=require("http"),LH=require("net"),d7=require("tls"),{randomBytes:u7,createHash:p7}=require("crypto"),{Duplex:aRe,Readable:lRe}=require("stream"),{URL:n_}=require("url"),eo=Us(),m7=Qv(),g7=r_(),{isBlob:f7}=Bs(),{BINARY_TYPES:_H,CLOSE_TIMEOUT:h7,EMPTY_BUFFER:Tg,GUID:y7,kForOnEventAttribute:s_,kListener:S7,kStatusCode:A7,kWebSocket:Pe,NOOP:kH}=br(),{EventTarget:{addEventListener:b7,removeEventListener:P7}}=wH(),{format:w7,parse:v7}=xg(),{toBuffer:_7}=rc(),EH=Symbol("kAborted"),i_=[8,13],vr=["CONNECTING","OPEN","CLOSING","CLOSED"],W7=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,X=class e extends a7{constructor(t,r,o){super(),this._binaryType=_H[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Tg,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,r=[]):r=[r]),CH(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){_H.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new m7({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new g7(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[Pe]=this,s[Pe]=this,t[Pe]=this,n.on("conclude",E7),n.on("drain",C7),n.on("error",R7),n.on("message",x7),n.on("ping",T7),n.on("pong",I7),s.onerror=O7,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",TH),t.on("data",Og),t.on("end",IH),t.on("error",OH),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[eo.extensionName]&&this._extensions[eo.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){et(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),xH(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){a_(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Tg,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){a_(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Tg,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){a_(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[eo.extensionName]||(n.compress=!1),this._sender.send(t||Tg,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){et(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(X,"CONNECTING",{enumerable:!0,value:vr.indexOf("CONNECTING")});Object.defineProperty(X.prototype,"CONNECTING",{enumerable:!0,value:vr.indexOf("CONNECTING")});Object.defineProperty(X,"OPEN",{enumerable:!0,value:vr.indexOf("OPEN")});Object.defineProperty(X.prototype,"OPEN",{enumerable:!0,value:vr.indexOf("OPEN")});Object.defineProperty(X,"CLOSING",{enumerable:!0,value:vr.indexOf("CLOSING")});Object.defineProperty(X.prototype,"CLOSING",{enumerable:!0,value:vr.indexOf("CLOSING")});Object.defineProperty(X,"CLOSED",{enumerable:!0,value:vr.indexOf("CLOSED")});Object.defineProperty(X.prototype,"CLOSED",{enumerable:!0,value:vr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(X.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(X.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[s_])return t[S7];return null},set(t){for(let r of this.listeners(e))if(r[s_]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[s_]:!0})}})});X.prototype.addEventListener=b7;X.prototype.removeEventListener=P7;MH.exports=X;function CH(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:h7,protocolVersion:i_[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!i_.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${i_.join(", ")})`);let s;if(t instanceof n_)s=t;else try{s=new n_(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;Ig(e,u);return}let d=i?443:80,p=u7(16).toString("base64"),m=i?l7.request:c7.request,b=new Set,h;if(n.createConnection=n.createConnection||(i?k7:L7),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new eo({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=w7({[eo.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!W7.test(u)||b.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");b.add(u)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let u=n.path.split(":");n.socketPath=u[0],n.path=u[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let u=o&&o.headers;if(o={...o,headers:{}},u)for(let[S,A]of Object.entries(u))o.headers[S.toLowerCase()]=A}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,u||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=m(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=m(n);n.timeout&&y.on("timeout",()=>{et(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[EH]||(y=e._req=null,Ig(e,u))}),y.on("response",u=>{let S=u.headers.location,A=u.statusCode;if(S&&n.followRedirects&&A>=300&&A<400){if(++e._redirects>n.maxRedirects){et(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new n_(S,t)}catch{let v=new SyntaxError(`Invalid URL: ${S}`);Ig(e,v);return}CH(e,f,r,o)}else e.emit("unexpected-response",y,u)||et(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,S,A)=>{if(e.emit("upgrade",u),e.readyState!==X.CONNECTING)return;y=e._req=null;let f=u.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){et(e,S,"Invalid Upgrade header");return}let w=p7("sha1").update(p+y7).digest("base64");if(u.headers["sec-websocket-accept"]!==w){et(e,S,"Invalid Sec-WebSocket-Accept header");return}let v=u.headers["sec-websocket-protocol"],W;if(v!==void 0?b.size?b.has(v)||(W="Server sent an invalid subprotocol"):W="Server sent a subprotocol but none was requested":b.size&&(W="Server sent no subprotocol"),W){et(e,S,W);return}v&&(e._protocol=v);let L=u.headers["sec-websocket-extensions"];if(L!==void 0){if(!h){et(e,S,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let E;try{E=v7(L)}catch{et(e,S,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(E);if(x.length!==1||x[0]!==eo.extensionName){et(e,S,"Server indicated an extension that was not requested");return}try{h.accept(E[eo.extensionName])}catch{et(e,S,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[eo.extensionName]=h}e.setSocket(S,A,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function Ig(e,t){e._readyState=X.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function L7(e){return e.path=e.socketPath,LH.connect(e)}function k7(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=LH.isIP(e.host)?"":e.host),d7.connect(e)}function et(e,t,r){e._readyState=X.CLOSING;let o=new Error(r);Error.captureStackTrace(o,et),t.setHeader?(t[EH]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Ig,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function a_(e,t,r){if(t){let o=f7(t)?t.size:_7(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${vr[e.readyState]})`);process.nextTick(r,o)}}function E7(e,t){let r=this[Pe];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[Pe]!==void 0&&(r._socket.removeListener("data",Og),process.nextTick(RH,r._socket),e===1005?r.close():r.close(e,t))}function C7(){let e=this[Pe];e.isPaused||e._socket.resume()}function R7(e){let t=this[Pe];t._socket[Pe]!==void 0&&(t._socket.removeListener("data",Og),process.nextTick(RH,t._socket),t.close(e[A7])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function WH(){this[Pe].emitClose()}function x7(e,t){this[Pe].emit("message",e,t)}function T7(e){let t=this[Pe];t._autoPong&&t.pong(e,!this._isServer,kH),t.emit("ping",e)}function I7(e){this[Pe].emit("pong",e)}function RH(e){e.resume()}function O7(e){let t=this[Pe];t.readyState!==X.CLOSED&&(t.readyState===X.OPEN&&(t._readyState=X.CLOSING,xH(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function xH(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function TH(){let e=this[Pe];if(this.removeListener("close",TH),this.removeListener("data",Og),this.removeListener("end",IH),e._readyState=X.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[Pe]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",WH),e._receiver.on("finish",WH))}function Og(e){this[Pe]._receiver.write(e)||this.pause()}function IH(){let e=this[Pe];e._readyState=X.CLOSING,e._receiver.end(),this.end()}function OH(){let e=this[Pe];this.removeListener("error",OH),this.on("error",kH),e&&(e._readyState=X.CLOSING,this.destroy())}});var DH=_((uRe,jH)=>{"use strict";var dRe=Mg(),{Duplex:M7}=require("stream");function NH(e){e.emit("close")}function N7(){!this.destroyed&&this._writableState.finished&&this.destroy()}function zH(e){this.removeListener("error",zH),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function z7(e,t){let r=!0,o=new M7({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(NH,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(NH,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",N7),o.on("error",zH),o}jH.exports=z7});var l_=_((pRe,$H)=>{"use strict";var{tokenChars:j7}=Bs();function D7(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&j7[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}$H.exports={parse:D7}});var qH=_((gRe,VH)=>{"use strict";var $7=require("events"),Ng=require("http"),{Duplex:mRe}=require("stream"),{createHash:H7}=require("crypto"),HH=xg(),hn=Us(),F7=l_(),U7=Mg(),{CLOSE_TIMEOUT:B7,GUID:G7,kWebSocket:V7}=br(),q7=/^[+/0-9A-Za-z]{22}==$/,FH=0,UH=1,GH=2,c_=class extends $7{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:B7,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:U7,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Ng.createServer((o,n)=>{let s=Ng.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=K7(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=FH}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===GH){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(ac,this);return}if(t&&this.once("close",t),this._state!==UH)if(this._state=UH,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(ac,this):process.nextTick(ac,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{ac(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",BH);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){yn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){yn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!q7.test(s)){yn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){yn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){lc(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=F7.parse(c)}catch{yn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&p!==void 0){let b=new hn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=HH.parse(p);h[hn.extensionName]&&(b.accept(h[hn.extensionName]),m[hn.extensionName]=b)}catch{yn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let b={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(b,(h,y,u,S)=>{if(!h)return lc(r,y||401,u,S);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(b))return lc(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[V7])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>FH)return lc(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${H7("sha1").update(r+G7).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),p._protocol=m)}if(t[hn.extensionName]){let m=t[hn.extensionName].params,b=HH.format({[hn.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${b}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",BH),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(ac,this)})),a(p,n)}};VH.exports=c_;function K7(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function ac(e){e._state=GH,e.emit("close")}function BH(){this.destroy()}function lc(e,t,r,o){r=r||Ng.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Ng.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function yn(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,yn),e.emit("wsClientError",i,r,t)}else lc(r,o,n,s)}});var J7,Y7,X7,Z7,Q7,e9,KH,t9,cc,JH=l(()=>{J7=g(DH(),1),Y7=g(xg(),1),X7=g(Us(),1),Z7=g(Qv(),1),Q7=g(r_(),1),e9=g(l_(),1),KH=g(Mg(),1),t9=g(qH(),1),cc=KH.default});var d_,u_,p_=l(()=>{"use strict";d_="AGENT_WITCH_EXTERNAL_BRIDGE",u_="AGENT_WITCH_EXTERNAL_LIVE"});var m_,YH=l(()=>{"use strict";m_=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var r9,g_,XH=l(()=>{"use strict";p_();YH();r9=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",g_=(e={})=>{let t=e.env??process.env,r=m_(t[d_]),o=m_(t[u_]);return{mode:r9(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var ZH=l(()=>{"use strict";p_()});var QH=l(()=>{"use strict";XH();ZH()});var f_=l(()=>{"use strict"});var _r,dc=l(()=>{"use strict";_r=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Js,Sn,eF,n9,h_,y_,tF,rF,S_,oF,uc,A_=l(()=>{"use strict";Js=g(require("node:fs")),Sn=g(require("node:os")),eF=g(require("node:path"));f_();dc();n9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),h_=(e=Sn.default.hostname())=>eF.default.join(Sn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),y_=e=>{if(!Js.default.existsSync(e))return null;try{let t=JSON.parse(Js.default.readFileSync(e,"utf8"));return!n9(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},tF=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},rF=(e,t)=>{Js.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},S_=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??h_(),o=y_(r);if(o!==null&&o.pid!==process.pid&&_r(o.pid)&&tF(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Sn.default.hostname(),macOsUsername:Sn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return rF(r,n),{ok:!0}},oF=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??h_(),o=y_(r);return o!==null&&o.pid!==process.pid&&_r(o.pid)&&tF(o)?{ok:!1}:(rF(r,{hostname:Sn.default.hostname(),macOsUsername:Sn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},uc=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??h_();y_(r)?.pid===process.pid&&Js.default.existsSync(r)&&Js.default.unlinkSync(r)}});var b_,pc,s9,i9,a9,l9,P_,nF=l(()=>{"use strict";b_=require("node:child_process"),pc=g(require("node:path"));dc();Xd();s9=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),i9=(e,t)=>{if(s9(e)||!/\bnode\b/.test(e))return!1;let r=pc.default.resolve(t),o=pc.default.join(r,"app",wi),n=pc.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===wi||i==="agent-witch.ts")return e.includes(r);try{let a=pc.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},a9=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,b_.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},l9=(e,t,r)=>{let o=a9(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||i9(d,t)&&n.push(c)}return n},P_=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,b_.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=l9(r,e.installDir,t),n=[];for(let s of o)if(_r(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var mc,gc,sF,c9,w_,iF=l(()=>{"use strict";mc=g(require("node:fs")),gc=g(require("node:path"));Ce();sF=(e,t)=>{!mc.default.existsSync(e)||mc.default.existsSync(t)||(mc.default.mkdirSync(gc.default.dirname(t),{recursive:!0}),mc.default.renameSync(e,t))},c9=e=>{if(e.profileEmail===null)return;let t=gc.default.join(e.installDir,dt);sF(gc.default.join(t,Wn),e.mainLogPath),sF(gc.default.join(t,Ln),e.errorLogPath)},w_=e=>{let t=N();e!==void 0&&t.installDir!==e||c9(t)}});var aF=l(()=>{"use strict";ja();Mp();Mp();!qe()&&Ao(__agentWitchImportMetaUrl)&&(async()=>{Ve("agent-witch-wake-server");let e=await $o(),t=er(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var lF=l(()=>{"use strict";aF()});var cF=l(()=>{"use strict";_a()});var v_,dF=l(()=>{"use strict";f_();lF();A_();cF();v_=async(e={})=>{let t=e.skipInProcessBridge?null:await Op();mp();let r=setInterval(()=>{mp()},6e4),o=setInterval(()=>{if(!oF().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var fc,zg,p9,uF,pF,jg,mF,gF,__,fF,Dg,hF=l(()=>{"use strict";fc=g(require("node:fs")),zg=g(require("node:path")),p9="pending-run-inputs.json",uF=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pF=e=>{let t=e.profileEmail?zg.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return zg.default.join(t,p9)},jg=e=>{let t=pF(e);if(!fc.default.existsSync(t))return{};try{let r=JSON.parse(fc.default.readFileSync(t,"utf8"));return uF(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!uF(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},mF=(e,t)=>{let r=pF(e);fc.default.mkdirSync(zg.default.dirname(r),{recursive:!0}),fc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},gF=e=>Object.values(jg(e)),__=(e,t)=>jg(e)[t]!==void 0,fF=(e,t)=>{let r=jg(e);r[t.agentRunId]=t,mF(e,r)},Dg=(e,t)=>{let r=jg(e);delete r[t],mF(e,r)}});var $g=l(()=>{"use strict";pe()});var yF=l(()=>{"use strict";pe()});var Hg=l(()=>{"use strict";pe()});var Fg=l(()=>{"use strict";pe()});var hc=l(()=>{"use strict";pe()});var m9,g9,yc,W_=l(()=>{"use strict";ht();$g();yF();Hg();Fg();hc();m9={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},g9={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},yc=e=>{if(!de(e.writerAgent))return"the selected writer";let t=Ke(e.writerAgent);if(Te(e.writerExecutionBackend)==="api"&&t!==null){let r=$e(we(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Ui(t,r.model);return`${g9[t]} model ${o}`}}return m9[e.writerAgent]}});var f9,h9,SF,AF,bF=l(()=>{"use strict";f9=/"input_tokens"\s*:\s*(\d+)/,h9=/"output_tokens"\s*:\s*(\d+)/,SF=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},AF=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=SF(f9.exec(t)),o=SF(h9.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var Ug=l(()=>{"use strict";At()});var Sc,Bg,y9,L_,PF,wF,vF,k_,_F=l(()=>{"use strict";Sc=g(require("node:fs")),Bg=g(require("node:path"));Ug();y9="run-completion-outbox.json",L_=e=>{let t=e.profileEmail?Bg.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Bg.default.join(t,y9)},PF=e=>{let t=L_(e);if(!Sc.default.existsSync(t))return[];try{let r=JSON.parse(Sc.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},wF=(e,t)=>{Sc.default.mkdirSync(Bg.default.dirname(L_(e)),{recursive:!0}),Sc.default.writeFileSync(L_(e),JSON.stringify(t,null,2),"utf8")},vF=(e,t)=>{let r=[...PF(e).filter(o=>o.runId!==t.runId),t];wF(e,r)},k_=async e=>{if(e.cloudApi===null)return;let t=PF(e.layout);if(t.length===0)return;let r=[];for(let o of t)await Sa(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);wF(e.layout,r)}});var WF=l(()=>{"use strict"});var E_,Ac,A9,An,LF=l(()=>{"use strict";WF();E_=new Map,Ac=e=>{let t=E_.get(e);t!==void 0&&(clearInterval(t),E_.delete(e))},A9=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},An=(e,t,r,o={})=>{Ac(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){Ac(t);return}let i=o.onTick?.()??{};A9(e,t,n,i)};s(),E_.set(t,setInterval(s,15e3))}});var kF=l(()=>{"use strict";At()});var EF,CF=l(()=>{"use strict";kF();EF=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:rt(t)}});var C_,bc,Wr,R_,Jt,RF,Gg=l(()=>{"use strict";C_=new Set,bc=new Map,Wr=(e,t)=>{if(t.length===0)return;let r=bc.get(e)??[];r.push(t),bc.set(e,r)},R_=e=>{C_.add(e);let t=bc.get(e)??[];return bc.delete(e),t},Jt=e=>C_.has(e),RF=e=>{C_.delete(e),bc.delete(e)}});var Ys,xF,TF,IF=l(()=>{"use strict";Ys=g(require("node:path")),xF=require("node:url");So();TF=()=>{if(qe()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Ys.default.dirname(Ys.default.resolve(e)):Ys.default.dirname(Ys.default.resolve(__filename))}return Ys.default.dirname((0,xF.fileURLToPath)(__agentWitchImportMetaUrl))}});var OF,MF,NF,zF,Ge,Xs,jF,DF,Zs,x_,T_,I_,$F,O_,HF,Vg=l(()=>{"use strict";OF=require("node:crypto"),MF=g(require("node:fs")),NF=g(require("node:path")),zF=require("node:url");dc();So();IF();Ge=new Map,jF=async()=>{if(Xs!==void 0)return Xs;try{if(qe()){let e=TF(),t=NF.default.join(e,"deps","node-pty","lib","index.js");if(MF.default.existsSync(t)){let r=await import((0,zF.pathToFileURL)(t).href);return Xs=r,r}}return Xs=await import("node-pty"),Xs}catch{return Xs=null,null}},DF=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Zs=(e,t,r)=>{let o=Ge.get(e);if(o!==void 0){Ge.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},x_=(e,t)=>{let r=Ge.get(e);return r===void 0?!1:(r.pty.write(t),!0)},T_=(e,t,r)=>{let o=Ge.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},I_=e=>{for(let t of Ge.values())if(!(t.mode!=="agent"||t.runId!==e))return _r(t.pty.pid);return!1},$F=e=>{for(let[t,r]of Ge.entries())if(!(r.mode!=="agent"||r.runId!==e)){Ge.delete(t);try{r.pty.kill()}catch{}return!0}return!1},O_=async e=>{let t=await jF();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;Ge.get(e.shellSessionId)!==void 0&&Zs(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return Ge.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{DF(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{Ge.get(e.shellSessionId)?.pty===n&&(Ge.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},HF=async e=>{let t=e.shellSessionId??(0,OF.randomUUID)(),r=await jF();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return Ge.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{DF(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{Ge.get(t)?.pty===o&&(Ge.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var qg,FF,UF=l(()=>{"use strict";qg="[[AWAITING_INPUT]]",FF=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",qg,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Pc,BF,Kg=l(()=>{"use strict";UF();Pc=e=>{let t=e.indexOf(qg);if(t<0)return null;let o=e.slice(t+qg.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},BF=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",FF].join(`
`)});var GF,VF=l(()=>{"use strict";Gg();Vg();Kg();GF=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(Jt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Wr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await HF({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Pc(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var qF,KF,JF,Lr,Jg=l(()=>{"use strict";qF=require("node:child_process"),KF=g(require("node:fs")),JF=g(require("node:path"));Xd();Lr=(e,t)=>{let r=JF.default.join(e,"app",Vk,"ensure-writer.sh");return KF.default.existsSync(r)?new Promise((o,n)=>{let s=(0,qF.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{n(i)}),s.on("close",i=>{if(i===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var YF,bn,vc,Yg,M_,wc,Xg,Zg,N_,z_,b9,Qs,P9,w9,j_,D_=l(()=>{"use strict";YF=require("node:child_process");ht();Jg();Hg();$g();hc();Fg();bn=new Map,vc=e=>e==="cursor"||e==="antigravity",Yg=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",M_=e=>bn.get(e)?.warmed===!0,wc=e=>{let t=bn.get(e);bn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Xg=e=>bn.get(e)?.conversationStarted===!0,Zg=e=>{let t=bn.get(e);bn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},N_=e=>{bn.delete(e)},z_=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",b9={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Qs=e=>`${b9[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,P9=(e,t,r,o)=>new Promise(n=>{let s=du(t,r),i=[],a=(0,YF.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),w9=(e,t)=>{let r=Qs(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},j_=async e=>{if(!de(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Te(e.runConfig.writerExecutionBackend)==="api"){let r=Ke(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=we(e.runConfig.layout.configPath);return $e(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),wc(e.writerAgent),{exitCode:0,output:Qs(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Lr(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}vc(e.writerAgent)&&wc(e.writerAgent);let t=await P9(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?w9(e.writerAgent,t.output):Qs(e.writerAgent)}}});var Pn,$_=l(()=>{"use strict";Pn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var XF,v9,_9,ZF,W9,H_,QF=l(()=>{"use strict";$_();XF=/you(?:'|')ve hit your session limit/i,v9=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],_9=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,ZF=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},W9=e=>{let t=_9.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},H_=e=>{let t=e.trim();if(t.length===0)return null;if(XF.test(t))return{code:Pn.SESSION_LIMIT,resetHint:W9(t),matchedLine:ZF(t,XF)};for(let r of v9)if(r.test(t))return{code:Pn.PROVIDER_QUOTA,resetHint:null,matchedLine:ZF(t,r)};return null}});var Qg,ef,F_,U_=l(()=>{"use strict";Qg="[[AGENT_RUN_WRITER_EXECUTION]]",ef="cli-writer-api-key-missing",F_="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var B_=l(()=>{"use strict";U_()});var e1=l(()=>{"use strict";B_()});var tf=l(()=>{"use strict";$_();QF();U_();B_();e1()});var rf,t1=l(()=>{"use strict";rf={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var r1,o1=l(()=>{"use strict";r1="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var n1,s1=l(()=>{"use strict";tf();o1();n1=e=>e.code===Pn.SESSION_LIMIT?r1:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var i1,a1=l(()=>{"use strict";tf();t1();s1();i1=e=>{let t=H_(e.output);return t!==null?{status:rf.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:n1(t)}:{status:e.exitCode===0?rf.COMPLETED:rf.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var G_,w0e,l1=l(()=>{"use strict";G_={OPEN:"open",APPROVAL:"approval"},w0e=G_.APPROVAL});var ei,of,c1,E9,d1,u1,p1,_c,V_,q_=l(()=>{"use strict";ei=g(require("node:fs")),of=g(require("node:path")),c1="runs",E9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),d1=e=>{let t=e.profileEmail!==null?of.default.join(e.installDir,"profiles",e.profileEmail,c1):of.default.join(e.installDir,c1);return ei.default.mkdirSync(t,{recursive:!0}),t},u1=(e,t)=>of.default.join(d1(e),`${t}.json`),p1=(e,t)=>{ei.default.writeFileSync(u1(e,t.id),JSON.stringify(t,null,2))},_c=(e,t)=>{let r=u1(e,t);if(!ei.default.existsSync(r))return null;try{let o=JSON.parse(ei.default.readFileSync(r,"utf8"));return!E9(o)||typeof o.id!="string"?null:o}catch{return null}},V_=e=>{let t=d1(e),r=ei.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=_c(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var C9,m1,g1=l(()=>{"use strict";a1();l1();q_();C9=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=i1({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:G_.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},m1=(e,t)=>{let r=C9(t);return p1(e,r),r}});var f1=l(()=>{"use strict";hg()});var h1,y1=l(()=>{"use strict";tf();h1=()=>[Qg,`agentRunWriterExecutionBackend=${ef}`,`agentRunWriterExecutionReasonCode=${F_}`].join(`
`)});var to,nf=l(()=>{"use strict";to=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var K_,R9,x9,S1,A1=l(()=>{"use strict";K_=e=>e.toLocaleString("en-US"),R9=e=>e<.01?e.toFixed(4):e.toFixed(3),x9=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${R9(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${K_(e.inputTokens)} in / ${K_(e.outputTokens)} out (${K_(e.totalTokens)} total)`,t].join(`
`)},S1=(e,t)=>{if(t===void 0)return e;let r=x9(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var b1=l(()=>{"use strict";pe()});var w1,Wc,ge,J_,sf,P1,T9,I9,v1,_1,W1,Lc,Y_,X_,Z_,L1,O9,lt,kc,ro,k1,M9,N9,af,Q_,eW,tW,E1=l(()=>{"use strict";w1=require("node:child_process");pe();ht();hF();Vl();W_();bF();uu();_F();Ug();LF();dc();CF();Gg();Vg();Kg();VF();D_();g1();f1();y1();nf();A1();Mn();b1();hc();ki();Kg();Wc=new Map,ge=new Map,J_=new Set,sf=new Map,P1=e=>{e!==void 0&&!sf.has(e)&&sf.set(e,Date.now())},T9=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(Jt(t)){lt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}Wr(t,n)},I9=(e,t,r,o,n)=>{if(!$y(e,n))return;let s=`${h1()}
`;T9(t,r,o,s);let i=ge.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},v1=130,_1=`

Stopped by user.`,W1=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:to(e)},Lc=null,Y_=e=>{Lc=e},X_=(e,t)=>{if(Lc===null)return;let r=Jw(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||jS(Lc,t,r)},Z_=async e=>{await k_({layout:e,cloudApi:Lc})},L1=e=>{let t=Wc.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:_r(t.pid)},O9=e=>ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),lt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},kc=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Rn(s),c=ge.get(r);if(a!==null&&c!==void 0){let d=rE(a),p=L1(r)||I_(r);d!==null&&!p&&ro(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return tE(a)}}),ro=(e,t,r,o,n,s,i,a)=>{let c=Fn(s,a),d=n,p=S1(c.output,c.llmUsage);if(r!==void 0){let b=sf.get(r);sf.delete(r),b!==void 0&&qw({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-b)/1e3))});let h=AF(c.llmUsage,p);h!==null&&DD({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&J_.has(r)&&(J_.delete(r),d=v1,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${_1}`:"Stopped by user.");let m=r!==void 0?Jw(e.layout.reportsDir,r):null;if(r!==void 0){Ac(r),Xi(e.layout,r),Jt(r)&&(lt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),RF(r));let b=ge.get(r);ND({reportsDir:e.layout.reportsDir,agentRunId:r,input:to(i),output:p,...b!==void 0?{writerLabel:yc({writerAgent:b.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),b!==void 0&&gg({layout:e.layout,writerAgent:b.writerAgent,projectFolderPath:b.projectFolderPath,userPrompt:b.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),m1(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),vF(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{}}),k_({layout:e.layout,cloudApi:Lc}),ge.delete(r),Wc.delete(r),Dg(e.layout,r)}lt(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),Ni(e.layout)},k1=(e,t,r,o,n,s,i)=>{let a=ge.get(r),c=a?.accumulatedOutput??s;fF(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),An(t,r,()=>__(e.layout,r),kc(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),lt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},M9=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(n===void 0||h.length===0)){if(Jt(n)){lt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}Wr(n,h)}};if(n!==void 0){let h=ge.get(n);Wc.set(n,t),ge.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),lt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),An(r,n,()=>L1(n),kc(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let m=a==="claude-cli",b=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(m?b.push(y):(c.push(y),p(y)),d||n===void 0)return;let u=Pc(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let S=ge.get(n),A=[S?.accumulatedOutput??"",u.partialOutput].filter(f=>f.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=A),Wc.delete(n),k1(e,r,n,o,u.question,A,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;Zg(a);let y=n!==void 0?ge.get(n):void 0,u=m?Fn(b.join("")):{output:c.join("").trim(),llmUsage:void 0},S=m?c.join("").trim():"",A=[u.output.trim(),S].filter(w=>w.length>0).join(`
`);m&&u.output.trim().length>0&&p(u.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${A}`.trim():A;ro(e,r,n,o,h??-1,f,s,u.llmUsage)}),t.on("error",h=>{d||ro(e,r,n,o,-1,h.message,s)})},N9=(e,t,r,o,n,s,i,a,c)=>{let d=W1(r,c);s!==void 0&&(ge.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),lt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),An(n,s,()=>ge.has(s),kc(e,n,s,o,i,a))),qi(e,t,r,m=>{if(!(s===void 0||m.length===0)){if(Jt(s)){lt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:m},requestId:o});return}Wr(s,m)}}).then(m=>{Zg(t),ro(e,n,s,o,m.exitCode,m.output,r,m.llmUsage)}).catch(m=>{let b=m instanceof Error?m.message:String(m);ro(e,n,s,o,-1,b,r)})},af=(e,t,r,o,n,s,i,a,c,d,p,m)=>{let b=W1(r,p);if(Mi(e.layout),ko(e,t)){P1(s),N9(e,t,r,o,n,s,c,d,b);return}let h=Nt(t,r,O9(e),i);if(h===null){ro(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}P1(s);let y=EF({workspace:e.workspace,projectFolderPath:c}),u=()=>{let S=(0,w1.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:m??process.env});M9(e,S,n,o,s,r,b,t)};if(s===void 0){u();return}ge.set(s,{originalPrompt:r,userTranscriptPrompt:b,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:ge.get(s)?.accumulatedOutput??""}),I9(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Li({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),An(n,s,()=>ge.has(s),kc(e,n,s,o,c,d)),GF({socket:n,sendMessage:lt,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:S=>{a!==void 0&&Zs(a,w=>{lt(n,w)},o);let A=ge.get(s),f=[A?.accumulatedOutput??"",S.partialOutput].filter(w=>w.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),k1(e,n,s,o,S.question,f,r)},onFinished:(S,A)=>{Zg(t);let f=Fn(A),w=ge.get(s),v=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${f.output}`.trim():f.output;ro(e,n,s,o,S,v,r,f.llmUsage)}}).then(S=>{if(!S){u();return}An(n,s,()=>I_(s),kc(e,n,s,o,c,d))}).catch(S=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",S instanceof Error?S.message:S),u()})},Q_=(e,t,r,o)=>{Dg(e.layout,t.agentRunId),t.shellSessionId!==void 0&&lt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=BF(t),s=ge.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;af(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},eW=(e,t)=>{for(let r of gF(e.layout))ge.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:to(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),An(t,r.agentRunId,()=>__(e.layout,r.agentRunId),{awaitingInput:!0}),lt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},tW=(e,t,r,o)=>{let n=ge.get(r);if(n===void 0)return!1;J_.add(r),Ac(r);let s=Wc.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if($F(r))return!0;Dg(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${_1}`:"Stopped by user.";return ro(e,t,r,o,v1,i,n.originalPrompt),!0}});var z9,rW,C1=l(()=>{"use strict";ta();z9=()=>`http://127.0.0.1:${yt()}/restart`,rW=async()=>{try{let e=await fetch(z9(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var R1=l(()=>{"use strict";Ua()});var x1=l(()=>{"use strict";_v()});var T1,I1=l(()=>{"use strict";T1=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Ec,j9,oW,O1=l(()=>{"use strict";V();te();R1();WA();x1();I1();Mn();Ec=(e,t)=>{Hr(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},j9=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(ry(),ty)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},oW=async e=>{let t=Re(e.layout.installDir)?.bundleVersion??null;if(!T1({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(ft(e.layout)){zi({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Ec(e.layout,{summary:r,action:"install-bundle-update-start"}),Qt({launchAgentLabel:se(e.layout.installDir),installDir:e.layout.installDir});let o=await $s({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),Ec(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await j9();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Ec(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),Ec(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),Ec(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var D9,nW,M1=l(()=>{"use strict";D9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nW=e=>{if(!D9(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var sW,iW,N1=l(()=>{"use strict";sA();iA();sW=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Wa({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},iW=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await ar(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var z1,$9,H9,F9,Cc,j1=l(()=>{"use strict";z1=g(require("node:os"));Ce();$9="Default",H9=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),F9=e=>{let t=z1.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Cc=()=>{let e=N(),t=$d(e),r=H9($9);return`${F9(t)}/${r.length>0?r:"project"}`}});var D1=l(()=>{"use strict";Ua()});var $1,aW,H1=l(()=>{"use strict";D1();$1=!1,aW=e=>{$1||($1=!0,process.on("uncaughtException",t=>{Fo(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;Fo(e,{kind:"crash",message:r,stack:o})}))}});var F1,U9,lW,U1=l(()=>{"use strict";F1=require("node:child_process");Jg();ht();Hg();$g();hc();Fg();U9=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,F1.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},lW=async e=>{if(!de(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Te(e.runConfig.writerExecutionBackend)==="api"){let r=Ke(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=we(e.layout.configPath),n=$e(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Lr(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await U9(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var cW,B1=l(()=>{"use strict";cW=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var G1,dW,V1=l(()=>{"use strict";G1=require("node:crypto"),dW=()=>(0,G1.randomUUID)()});var ti,q1,lf=l(()=>{"use strict";ti="[[WORKING_ESTIMATE]]",q1=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",ti,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var K1,J1=l(()=>{"use strict";K1=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var B9,Y1,X1=l(()=>{"use strict";lf();B9=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,Y1=e=>{if(!e.includes(ti))return null;let t=null;for(let r of e.matchAll(B9)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var G9,uW,Z1=l(()=>{"use strict";X1();G9=/^(\d{1,6})\b/,uW=e=>{let t=Y1(e);if(t!==null)return t;let r=G9.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var V9,q9,K9,cf,pW=l(()=>{"use strict";ht();$a();V9="http://127.0.0.1:11434",q9=45e3,K9=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},cf=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||V9,o=t===void 0?(await Pt({commands:ue({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(q9)});return n.ok?K9(await n.json()):null}catch{return null}}});var mW,gW,fW,Q1=l(()=>{"use strict";ki();lf();nf();J1();Z1();Vl();pW();mW=async e=>{let t=to(e.wrappedPrompt),r=zD(e.reportsDir);return{estimateOutput:await cf(q1(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},gW=e=>{let t=uW(e.estimateOutput);t!==null&&ag({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},fW=e=>{let t=uW(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=K1(t);return Wi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:It.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),ag({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var df,eU,hW=l(()=>{"use strict";df="[[WORKING_TOKEN_ESTIMATE]]",eU=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",df,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var tU,J9,rU,oU=l(()=>{"use strict";hW();tU=/^(\d{1,8})\b/,J9=e=>{let t=e.indexOf(df);if(t<0)return null;let r=e.slice(t+df.length).trim(),o=tU.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},rU=e=>{let t=J9(e);if(t!==null)return t;let r=tU.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var yW,SW,nU=l(()=>{"use strict";hW();nf();oU();Vl();pW();yW=async e=>{let t=to(e.wrappedPrompt),r=$D(e.reportsDir);return{estimateOutput:await cf(eU(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},SW=e=>{let t=rU(e.estimateOutput);return t===null?null:(jD({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var sU=l(()=>{"use strict";A_();nF();iF();dF();ta();E1();Jg();ht();q_();Gg();C1();gA();O1();Mn();M1();N1();Ug();j1();H1();U1();Zd();B1();V1();lf();ki();Q1();nU();W_();$a();Vg();D_()});var iU={};Rt(iU,{buildContinuationPromptWithContext:()=>Z9});var Y9,X9,Z9,aU=l(()=>{"use strict";Y9=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,X9=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Z9=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=X9(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${Y9(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var lU={};Rt(lU,{readHarnessExportSets:()=>eY});var Rc,AW,uf,Q9,eY,cU=l(()=>{"use strict";Rc=g(require("node:fs")),AW=g(require("node:path"));Ce();uf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Q9=e=>{if(!Rc.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Rc.default.readFileSync(e.harnessManifestPath,"utf8"));if(uf(t))return t}catch{return null}return null},eY=(e,t)=>{let r=N(t),o=Q9(r);if(o===null)return[];let n=uf(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!uf(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!uf(p))continue;let m=typeof p.path=="string"?p.path:void 0,b=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(m===void 0||b.length===0||h.length===0||y.length===0)continue;let u=m.startsWith("shared/")?AW.default.join(r.harnessRootDir,m):AW.default.join(r.harnessSetsDir,i,m);Rc.default.existsSync(u)&&d.push({id:b,kind:h,title:y,content:Rc.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var LW,PW,ri,dU,tY,uU,pU,bW,mU,wW,vW,_W,Z,G,WW,rY,xc,oY,nY,sY,iY,aY,lY,cY,dY,Tc,gU=l(()=>{"use strict";LW=require("node:child_process"),PW=g(require("node:fs")),ri=g(require("node:os"));JH();V();te();ts();Nv();QH();pe();tt();Ua();Mb();wg();hg();At();To();NA();Mt();sU();dU=3e4,tY=3e4,uU=new Map,pU=new Map,bW=new Map,mU=new Map,wW=new Map,vW=new Map,_W=new Map,Z=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),G=(e,t,r)=>{e.readyState===cc.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Hr(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Np(r,"out",t)))},WW=e=>e,rY=e=>{if(!PW.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(PW.default.readFileSync(e.harnessManifestPath,"utf8"));if(Z(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},xc=(e,t)=>{let r=rY(t);r!==null&&G(e,{type:"harness.manifest.report",payload:{hostname:ri.default.hostname(),manifest:r}})},oY=async(e,t,r,o,n,s,i=!1,a,c,d,p,m)=>{let b=m?.trim()??"";if(!de(t)){G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=yc({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await Pt({commands:ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?mW({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,S=s!==void 0?yW({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=vc(t)&&!M_(t);if(A){try{await Lr(e.layout.installDir,t)}catch(H){let fe=H instanceof Error?H.message:String(H);G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${fe}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}wc(t)}else if(!vc(t))try{await Lr(e.layout.installDir,t)}catch(H){let fe=H instanceof Error?H.message:String(H);G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${fe}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Ji(d,Cc,m);if(f===null){G(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Je({projectFolderPath:f,...b.length>0?{projectId:b}:{}}),i||Xl(e.layout,t,f);let w=fg({sessionContinuation:i,supportsWriterSessionContinuation:Yg(t),isWriterConversationStarted:Xg(t)}),v=i&&w==="first"?Yl(e.layout,t,f):null,W=v!==null?Ds(e.layout,v):null,L=W!==null&&W.turns.length>0,E=dv({sessionContinuation:i,supportsWriterSessionContinuation:Yg(t),isWriterConversationStarted:Xg(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:L,userPromptCharacterCount:r.length}),x=r;if(E.continuationStrategy==="source_run_seed"){let H=typeof c=="string"&&c.length>0?_c(e.layout,c):null;if(H!==null){let{buildContinuationPromptWithContext:fe}=await Promise.resolve().then(()=>(aU(),iU));x=fe({priorPrompt:H.prompt,priorOutput:H.resultOutput??"",userMessage:r})}}else E.continuationStrategy==="transcript_seed"&&W!==null&&W.turns.length>0&&(x=dg({priorTurns:W.turns,userMessage:r}));let I=E.ragLimit>0?await ps({layout:e.layout,query:x,limit:E.ragLimit,minScore:E.ragMinScore,projectFolderPath:f,...b.length>0?{projectId:b}:{}}):[],M=E.ragLimit>0&&f.trim().length>0?await Ib({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:f,...b.length>0?{projectId:b}:{}}):[],B=E.injectMemory?ev(e.layout,f,b.length>0?b:void 0):[],q=`${rv(B,E.memoryEntryLimit)}${Rb(I)}${Ob(M)}${x}`,F=p?.trim()??(s!==void 0&&f.trim().length>0?dW():void 0);if(s!==void 0&&F!==void 0&&F.length>0&&f.trim().length>0){Li({reportKey:F,agentRunId:s,userSummary:"Working on your Mac\u2026"});let H=q;u!==null&&u.then(fe=>{if(fe===null)return;let oo=fW({estimateOutput:fe.estimateOutput??"",reportKey:F,agentRunId:s,reportsDir:e.layout.reportsDir,task:fe.task,writerLabel:fe.writerLabel,embedding:fe.embedding});if(oo.estimateSeconds===null)return;X_(e.layout.reportsDir,s);let Ct=`${ti}
${oo.estimateSeconds}
`;if(Jt(s)){G(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Ct},requestId:o});return}Wr(s,Ct)}).catch(()=>{}),q=cW(H),q=kh(q,{agentRunId:s,reportKey:F,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then(H=>{H!==null&&gW({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel,embedding:H.embedding})}).catch(()=>{}),s!==void 0&&S!==null&&S.then(H=>{H!==null&&SW({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel})}).catch(()=>{});let ct=s!==void 0&&_W.get(s)===!0;if(s!==void 0&&f.trim().length>0){let H=await up(f);vW.set(s,H),F!==void 0&&F.length>0&&wW.set(s,F)}af(e,t,q,o,WW(n),s,{sessionTurn:E.sessionTurn},a,f,F,r,Oy(e.layout,s,ct)),A&&s!==void 0&&G(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:z_(t)},requestId:o})},nY=async(e,t,r,o,n)=>{let s=(i,a)=>{G(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await j_({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,G(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=de(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Qs(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},sY=(e,t,r)=>new Promise(o=>{if(!de(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Nt(t,r,ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,LW.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),iY=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;G(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=jt(t.bundle),s=Z(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=xe(e.wsUrl)??gt,m=await bS({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=xo({bundle:i,layout:e.layout});return G(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&xc(o,e.layout),!0},aY=async(e,t,r,o)=>{if(await iY(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(G(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!de(n)){G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}Mi(e.layout);let i=await(async()=>{try{await Lr(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return sY(e,n,s)})().finally(()=>{Ni(e.layout)});G(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),xc(o,e.layout)},lY=e=>{let t=1e3*2**e;return Math.min(tY,t)},cY=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(ft(e.layout)){Kh(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,rW().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(u,S="system.ack")=>{if(!t.selfUpdateInFlight){if(ft(e.layout)){zi({layout:e.layout,remoteBundleVersion:u,trigger:S}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${S}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,oW({layout:e.layout,remoteBundleVersion:u,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let u=_e(e.layout);u!==null&&je(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===cc.OPEN||u.readyState===cc.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,dU)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=lY(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},m=u=>{s();let S=()=>{let A=xi(e.layout.installDir),f=yt();G(u,{type:"agent.heartbeat",payload:{hostname:ri.default.hostname(),macOsUsername:ri.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:A}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,dU)},b=(u,S)=>{if(typeof u.type!="string")return;if(MA(u)){t.stopped=!0,s(),a(),c(),xA({layout:e.layout}).finally(()=>{uc(),process.exit(0)});return}Hr(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),Np(e.layout,"in",u);let A=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&Z(u.payload)){let f=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",w=typeof u.payload.origin=="string"?u.payload.origin:"",v=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",W=typeof u.payload.challenge=="string"?u.payload.challenge:"",L=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!Mv({serverPublicKey:f,origin:w,devicePublicKey:v,challenge:W,serverAttestation:L})){t.wakeError="Server attestation verification failed",Hr(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&Z(u.payload)){let f=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";Hr(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),lW({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{G(S,{type:"writer.status",payload:w},e.layout)})}if(u.type==="install.bundle.update"&&Z(u.payload)){let f=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";f.length>0&&o(f,"install.bundle.update")}if(u.type==="system.ack"){Sp(e.layout,{wsUrl:e.wsUrl});let f=Z(u.payload)?u.payload:null,w=nW(f);w!==null&&o(w)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&Z(u.payload)&&sW(u.payload),u.type==="automations.run"&&Z(u.payload)&&iW(u.payload),u.type==="terminal.stream.accepted"&&Z(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"";if(f.length>0){let w=R_(f);for(let v of w)G(S,{type:"terminal.stream.chunk",payload:{runId:f,chunk:v},requestId:A})}}if(u.type==="agent.agentRun.list"&&G(S,{type:"dashboard.agentRun.list.result",payload:{runs:V_(e.layout)},requestId:A}),u.type==="agent.agentRun.get"&&Z(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"",w=f.length>0?_c(e.layout,f):null;G(S,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:A})}if(u.type==="command.claude.run"&&Z(u.payload)){let f=u.payload.prompt,w=typeof u.payload.writerAgent=="string"&&de(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",v=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,W=u.payload.sessionContinuation===!0,L=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,E=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,x=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=Ji(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,Cc,x),M=ky(u.payload.compositionSnapshot),B=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${W?"continue":"first"})\u2026`),I===null){G(S,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...v!==void 0?{agentRunId:v}:{}},requestId:A});return}if(M!==null){let q=Cy(e.layout,M);if(q!==null){G(S,{type:"command.claude.result",payload:{exitCode:-1,output:q,...v!==void 0?{agentRunId:v}:{}},requestId:A});return}if(v!==void 0){let F=xy(e.layout,v,M);if(!F.ok){G(S,{type:"command.claude.result",payload:{exitCode:-1,output:F.errorMessage,...v!==void 0?{agentRunId:v}:{}},requestId:A});return}_W.set(v,M.entries.some(ct=>ct.scope==="run"))}}v!==void 0&&E!==void 0&&uU.set(v,E),v!==void 0&&(pU.set(v,I),x!==void 0&&x.trim().length>0&&bW.set(v,x.trim()),mU.set(v,f.trim()),Je({projectFolderPath:I,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),oY(e,w,f.trim(),A,S,v,W,E,L,I,B,x)}}if(u.type==="shell.session.open"&&Z(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:120,v=typeof u.payload.rows=="number"?u.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),O_({shellSessionId:f,cwd:e.workspace,cols:w,rows:v,send:W=>{G(S,W)},requestId:A}))}if(u.type==="shell.session.close"&&Z(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";f.length>0&&Zs(f,w=>{G(S,w)},A)}if(u.type==="shell.input"&&Z(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.data=="string"?u.payload.data:"";f.length>0&&w.length>0&&x_(f,w)}if(u.type==="shell.resize"&&Z(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:0,v=typeof u.payload.rows=="number"?u.payload.rows:0;f.length>0&&w>0&&v>0&&T_(f,w,v)}if(u.type==="command.writer.session.end"&&Z(u.payload)){let f=u.payload.writerAgent;typeof f=="string"&&de(f)&&(N_(f),mg(e.layout,f))}if(u.type==="command.writer.session.start"&&Z(u.payload)){let f=u.payload.writerAgent,w=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof f=="string"&&de(f)&&w.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),nY(e,f,w,A,S))}if(u.type==="command.claude.stop"&&Z(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),tW(e,WW(S),f,A))}if(u.type==="command.claude.input_respond"&&Z(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",w=typeof u.payload.response=="string"?u.payload.response.trim():"",v=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",W=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",L=typeof u.payload.question=="string"?u.payload.question:"";f.length>0&&w.length>0&&v.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),Q_(e,{agentRunId:f,originalPrompt:v,partialOutput:W,question:L,response:w,shellSessionId:uU.get(f)},A,WW(S)))}if(u.type==="dispatch.approval.required"&&Z(u.payload)){let f=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",w=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${w}`),process.platform==="darwin"&&(0,LW.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&Z(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),aY(e,u.payload,A,S)),u.type==="harness.export.request"&&Z(u.payload)){let f=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",w=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,v=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(W=>typeof W=="string"):[];f.length>0&&v.length>0&&(async()=>{let{readHarnessExportSets:W}=await Promise.resolve().then(()=>(cU(),lU)),L=W(v,e.email);G(S,{type:"harness.export.result",payload:{success:L.length>0,borrowerUserId:f,...w!==void 0?{targetDeviceId:w}:{},sets:L,errorMessage:L.length>0?void 0:"No readable harness sets were found on this machine."},requestId:A})})()}if(u.type==="harness.manifest.request"&&xc(S,e.layout),u.type==="command.claude.result"&&Z(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,w=typeof u.payload.output=="string"?u.payload.output:"",v=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,W=Ji(f!==void 0?pU.get(f):void 0,Cc),L=f!==void 0?bW.get(f):void 0,E=f!==void 0?mU.get(f)??"":"",x=JS({exitCode:v,output:w});if(x&&W!==null&&Cb({layout:e.layout,text:w,source:f??"command.claude.result",projectFolderPath:W,...L!==void 0?{projectId:L}:{}}),v!=null&&v!==0&&w.trim().length>0&&W!==null&&(_b({layout:e.layout,errorText:w,projectFolderPath:W,...L!==void 0?{projectId:L}:{}}),Tb({layout:e.layout,text:w,source:f??"command.claude.result.failure",projectFolderPath:W,...L!==void 0?{projectId:L}:{}})),x&&E.trim().length>0&&W!==null&&tv({layout:e.layout,projectFolderPath:W,...L!==void 0?{projectId:L}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:E,output:w,createdAt:new Date().toISOString()}}),f!==void 0&&W!==null){let M=wW.get(f),B=vW.get(f);M!==void 0&&B!==void 0&&up(W).then(q=>{let F=YS({before:B,after:q});Eh(M,F),vW.delete(f),wW.delete(f)})}if(x&&L!==void 0&&L.trim().length>0){let M=$(),B=M===null?null:Y({wsUrl:M.wsUrl,pairingToken:M.pairingToken});B!==null&&ZS(B,L,{...f!==void 0?{sourceRunId:f}:{},lesson:XS({prompt:E,output:w})})}f!==void 0&&(Xi(e.layout,f),_W.delete(f),bW.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let u=new cc(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),Y_(Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),Z_(e.layout);let S=xe(e.wsUrl)??"http://localhost:3000",A=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=Ov({layout:e.layout,origin:S,...A!==void 0&&A.length>0?{claimToken:A}:{}});G(u,{type:"agent.register",payload:{role:"agent",hostname:ri.default.hostname(),macOsUsername:ri.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),xc(u,e.layout),eW(e,u),m(u)}),u.on("message",S=>{let A=typeof S=="string"?S:S.toString("utf8");try{let f=JSON.parse(A);if(!Z(f))return;b(f,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(S,A)=>{s(),t.socket=void 0,t.wsConnected=!1,cA(e.layout),t.reconnectAttempt+=1;let f=typeof A=="string"?A:A.toString("utf8");Fo(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:f}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",S=>{t.wakeError=S.message,Fo(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return qh(()=>{let u=Jh();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&o(u.remoteBundleVersion,u.trigger);let S=Yh();S!==null&&r(S)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:xa(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:tc(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(xc(u,e.layout),{ok:!0})}}},dY=async()=>{Ve("agent-witch");let e=g_(),t=k();S_().ok||(process.platform==="darwin"?(await fo(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),w_(t);let o=P_({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(Qt({launchAgentLabel:se(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),Si());let n=await Uy(),s=n[0];s!==void 0&&aW(s.layout);for(let h of n){let y=xe(h.wsUrl)??gt;Ti(h.layout.installDir,y)}let i=n.map(h=>cY(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),uc(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let S=_e(h.layout);dA(S,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(ft(h)||Ta(h.installDir))},m=await v_({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):ec({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let b=er(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Ai(),d()});d=()=>{b(),m.stop(),uc(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Tc=dY});var kW=l(()=>{"use strict";gU()});var fU={};Rt(fU,{startAgentWitchClient:()=>Tc});var hU=l(()=>{"use strict";kW();kW();So();Ch();eu();if(!qe()&&Ao(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Qd(process.argv.slice(e))),Tc()}});Wh();Ch();So();eu();var sE="20.x",iE="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var PV=e=>[`Node.js ${sE} or newer is required (found ${e}).`,iE].join(" "),aE=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${PV(process.version)}
`),process.exit(1))};var uY=async()=>{Ve("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(ry(),ty)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},pY=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(c0(),l0)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},mY=async()=>{if(!Ao(qe()?void 0:__agentWitchImportMetaUrl))return;aE();let e=process.argv.indexOf("report");e>=0&&process.exit(Qd(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await uY();return}if(t==="wake"){await pY();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(dT(),cT));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(B$(),U$));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(hU(),fU));await r()};mY();
