#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var gU=Object.create;var uf=Object.defineProperty;var fU=Object.getOwnPropertyDescriptor;var hU=Object.getOwnPropertyNames;var yU=Object.getPrototypeOf,SU=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var W=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Lt=(e,t)=>{for(var r in t)uf(e,r,{get:t[r],enumerable:!0})},AU=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of hU(t))!SU.call(e,n)&&n!==r&&uf(e,n,{get:()=>t[n],enumerable:!(o=fU(t,n))||o.enumerable});return e};var m=(e,t,r)=>(r=e!=null?gU(yU(e)):{},AU(t||!e||!e.__esModule?uf(r,"default",{value:e,enumerable:!0}):r,e));var bn=W(pf=>{"use strict";Object.defineProperty(pf,"__esModule",{value:!0});pf.stringify=bU;function bU(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=W(mf=>{"use strict";Object.defineProperty(mf,"__esModule",{value:!0});mf.generateTypeGuardError=PU;var _W=bn();function PU(e,t,r){return(0,_W.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,_W.stringify)(e)}) to be "${r}"`}});var Wr=W(Ic=>{"use strict";Object.defineProperty(Ic,"__esModule",{value:!0});Ic.isNonNullObject=void 0;var wU=O(),vU=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,wU.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Ic.isNonNullObject=vU});var kt=W(fe=>{"use strict";Object.defineProperty(fe,"__esModule",{value:!0});fe.attachTypeGuardMeta=fe.isArrayTypeGuard=fe.isNestedObjectTypeGuard=fe.getTypeGuardWrapperKind=fe.getTypeGuardInnerGuard=fe.getTypeGuardItemGuard=fe.getTypeGuardSchema=void 0;var _U=e=>e.schema;fe.getTypeGuardSchema=_U;var WU=e=>e.itemGuard;fe.getTypeGuardItemGuard=WU;var LU=e=>e.innerGuard;fe.getTypeGuardInnerGuard=LU;var kU=e=>e.wrapperKind;fe.getTypeGuardWrapperKind=kU;var EU=e=>{if((0,fe.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};fe.isNestedObjectTypeGuard=EU;var CU=e=>{if((0,fe.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};fe.isArrayTypeGuard=CU;var RU=(e,t)=>Object.assign(e,t);fe.attachTypeGuardMeta=RU});var ri=W(no=>{"use strict";Object.defineProperty(no,"__esModule",{value:!0});no.getExpectedTypeName=no.getTypeGuardDisplayName=void 0;var WW=kt(),xU=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};no.getTypeGuardDisplayName=xU;var TU=e=>{let t=(0,WW.getTypeGuardWrapperKind)(e),r=(0,WW.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,no.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};no.getExpectedTypeName=TU});var so=W(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.createValidationResult=void 0;var IU=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Oc.createValidationResult=IU});var Pn=W(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.createValidationError=void 0;var OU=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Mc.createValidationError=OU});var wn=W(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.createTreeNode=void 0;var MU=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Nc.createTreeNode=MU});var oi=W(zc=>{"use strict";Object.defineProperty(zc,"__esModule",{value:!0});zc.combineResults=void 0;var NU=so(),zU=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,NU.createValidationResult)(r,o,n)};zc.combineResults=zU});var Dc=W(jc=>{"use strict";Object.defineProperty(jc,"__esModule",{value:!0});jc.createSimplifiedTree=void 0;var LW=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=LW(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},jU=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=LW(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};jc.createSimplifiedTree=jU});var si=W(Hc=>{"use strict";Object.defineProperty(Hc,"__esModule",{value:!0});Hc.validateObject=void 0;var DU=Wr(),ni=so(),$U=Pn(),$c=wn(),HU=oi(),kW=Fc(),FU=(e,t,r)=>{let o=()=>{let i=(0,$U.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,$c.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,ni.createValidationResult)(!1,[],a):(0,ni.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,ni.createValidationResult)(!0,[],(0,$c.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,g=d,A=t[g],h=e[g],y=(0,kW.validateProperty)(g,h,A,r);return y.valid?p.length===0?(0,ni.createValidationResult)(!0,[],(0,$c.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,kW.validateProperty)(d,e[d],p,r)}),a=(0,HU.combineResults)(i,r.path),c=(0,$c.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,ni.createValidationResult)(a.valid,a.errors,c)};return(0,DU.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};Hc.validateObject=FU});var CW=W(Gc=>{"use strict";Object.defineProperty(Gc,"__esModule",{value:!0});Gc.validateArray=void 0;var UU=bn(),Uc=so(),EW=Pn(),Bc=wn(),BU=oi(),GU=si(),VU=ri(),qU=kt(),KU=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,EW.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,Bc.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,Uc.createValidationResult)(!1,[c],d)}let n=(0,qU.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,g={path:p,config:r.config||null};if(n)return(0,GU.validateObject)(c,n,g);let A=t(c,null),h=(0,VU.getExpectedTypeName)(t),y=(0,UU.stringify)(c);if(A)return(0,Uc.createValidationResult)(!0,[],(0,Bc.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,S=(0,EW.createValidationError)(p,h,c,u),b=(0,Bc.createTreeNode)(p,!1,h,c);return b.errors=[S],(0,Uc.createValidationResult)(!1,[S],b)}),i=(0,BU.combineResults)(s,o),a=(0,Bc.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,Uc.createValidationResult)(i.valid,i.errors,a)};Gc.validateArray=KU});var Fc=W(qc=>{"use strict";Object.defineProperty(qc,"__esModule",{value:!0});qc.validateProperty=void 0;var RW=so(),JU=Pn(),xW=wn(),YU=ri(),Vc=kt(),XU=si(),ZU=CW(),QU=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,Vc.getTypeGuardSchema)(r),c=(0,Vc.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,XU.validateObject)(t,a,s);if(c&&(0,Vc.isArrayTypeGuard)(r))return(0,ZU.validateArray)(t,c,s)}let d=p=>{let g=r(t,p),A=(0,YU.getExpectedTypeName)(r);return g?(0,RW.createValidationResult)(!0,[],(0,xW.createTreeNode)(n,!0,A,t)):(()=>{let h=(0,JU.createValidationError)(n,A,t,`Expected ${n} (${JSON.stringify(t)}) to be "${A}"`),y=(0,xW.createTreeNode)(n,!1,A,t);return y.errors=[h],(0,RW.createValidationResult)(!1,[h],y)})()};if((0,Vc.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};qc.validateProperty=QU});var Jc=W(Kc=>{"use strict";Object.defineProperty(Kc,"__esModule",{value:!0});Kc.isNil=void 0;var eB=O(),tB=function(e,t){return e!=null?(t&&t.callbackOnError((0,eB.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Kc.isNil=tB});var gf=W(Yc=>{"use strict";Object.defineProperty(Yc,"__esModule",{value:!0});Yc.isDefined=void 0;var rB=O(),oB=Jc(),nB=function(e,t){return(0,oB.isNil)(e,null)?(t&&t.callbackOnError((0,rB.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Yc.isDefined=nB});var ff=W(Xc=>{"use strict";Object.defineProperty(Xc,"__esModule",{value:!0});Xc.reportValidationResults=void 0;var sB=Dc(),TW=gf(),iB=Jc(),aB=(e,t)=>{if(e.valid===!0||(0,iB.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,TW.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,sB.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,TW.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Xc.reportValidationResults=aB});var hf=W(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.Validation=Q.reportValidationResults=Q.validateObject=Q.validateProperty=Q.createSimplifiedTree=Q.combineResults=Q.createTreeNode=Q.createValidationError=Q.createValidationResult=Q.getExpectedTypeName=void 0;var lB=ri();Object.defineProperty(Q,"getExpectedTypeName",{enumerable:!0,get:function(){return lB.getExpectedTypeName}});var cB=so();Object.defineProperty(Q,"createValidationResult",{enumerable:!0,get:function(){return cB.createValidationResult}});var dB=Pn();Object.defineProperty(Q,"createValidationError",{enumerable:!0,get:function(){return dB.createValidationError}});var uB=wn();Object.defineProperty(Q,"createTreeNode",{enumerable:!0,get:function(){return uB.createTreeNode}});var pB=oi();Object.defineProperty(Q,"combineResults",{enumerable:!0,get:function(){return pB.combineResults}});var mB=Dc();Object.defineProperty(Q,"createSimplifiedTree",{enumerable:!0,get:function(){return mB.createSimplifiedTree}});var gB=Fc();Object.defineProperty(Q,"validateProperty",{enumerable:!0,get:function(){return gB.validateProperty}});var fB=si();Object.defineProperty(Q,"validateObject",{enumerable:!0,get:function(){return fB.validateObject}});var hB=ff();Object.defineProperty(Q,"reportValidationResults",{enumerable:!0,get:function(){return hB.reportValidationResults}});var yB=so(),SB=oi(),AB=Pn(),bB=wn(),PB=Fc(),wB=si(),vB=ff(),_B=Dc();Q.Validation={result:yB.createValidationResult,combine:SB.combineResults,error:AB.createValidationError,treeNode:bB.createTreeNode,property:PB.validateProperty,object:wB.validateObject,report:vB.reportValidationResults,createSimplifiedTree:_B.createSimplifiedTree}});var Zc=W(yf=>{"use strict";Object.defineProperty(yf,"__esModule",{value:!0});yf.isType=LB;var IW=Wr(),OW=hf(),WB=kt();function LB(e){if(!(0,IW.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,OW.validateObject)(r,e,s);return(0,OW.reportValidationResults)(i,o||null),i.valid}return(0,IW.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,WB.attachTypeGuardMeta)(t,{schema:e})}});var jW=W(io=>{"use strict";Object.defineProperty(io,"__esModule",{value:!0});io.isNestedType=io.isShape=void 0;io.isSchema=ii;var MW=Wr(),NW=hf(),zW=kt();function ii(e){if(!(0,MW.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=EB(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,NW.validateObject)(o,t,i);return(0,NW.reportValidationResults)(a,n||null),a.valid}return(0,MW.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,zW.attachTypeGuardMeta)(r,{schema:t})}function kB(e){return typeof e=="function"?e:Array.isArray(e)?CB(e):typeof e=="object"&&e!==null?ii(e):e}function EB(e){let t={};for(let[r,o]of Object.entries(e))t[r]=kB(o);return t}function CB(e){let t=e[0],r=ii(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,zW.attachTypeGuardMeta)(o,{itemGuard:r})}io.isShape=ii;io.isNestedType=ii});var DW=W(Sf=>{"use strict";Object.defineProperty(Sf,"__esModule",{value:!0});Sf.isObjectWith=xB;var RB=Zc();function xB(e){return(0,RB.isType)(e)}});var $W=W(Af=>{"use strict";Object.defineProperty(Af,"__esModule",{value:!0});Af.isObject=IB;var TB=Zc();function IB(e){return(0,TB.isType)(e)}});var HW=W(bf=>{"use strict";Object.defineProperty(bf,"__esModule",{value:!0});bf.guardWithTolerance=OB;function OB(e,t,r){return t(e,r),e}});var FW=W(Pf=>{"use strict";Object.defineProperty(Pf,"__esModule",{value:!0});Pf.isBranded=NB;var MB=O();function NB(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,MB.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var UW=W(Qc=>{"use strict";Object.defineProperty(Qc,"__esModule",{value:!0});Qc.BrandSymbols=void 0;Qc.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var BW=W(ed=>{"use strict";Object.defineProperty(ed,"__esModule",{value:!0});ed.isAny=void 0;var zB=function(e){return!0};ed.isAny=zB});var ai=W(wf=>{"use strict";Object.defineProperty(wf,"__esModule",{value:!0});wf.reportTypeGuardError=DB;var jB=O();function DB(e,t,r){e&&e.callbackOnError((0,jB.generateTypeGuardError)(t,e.identifier,r))}});var GW=W(td=>{"use strict";Object.defineProperty(td,"__esModule",{value:!0});td.isBoolean=void 0;var $B=ai(),HB=function(t,r){return typeof t!="boolean"?((0,$B.reportTypeGuardError)(r,t,"boolean"),!1):!0};td.isBoolean=HB});var VW=W(rd=>{"use strict";Object.defineProperty(rd,"__esModule",{value:!0});rd.isDate=void 0;var FB=O(),UB=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,FB.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};rd.isDate=UB});var vf=W(od=>{"use strict";Object.defineProperty(od,"__esModule",{value:!0});od.isNumber=void 0;var BB=ai(),GB=function(t,r){return typeof t!="number"||isNaN(t)?((0,BB.reportTypeGuardError)(r,t,"number"),!1):!0};od.isNumber=GB});var qW=W(nd=>{"use strict";Object.defineProperty(nd,"__esModule",{value:!0});nd.isString=void 0;var VB=ai(),qB=function(t,r){return typeof t!="string"?((0,VB.reportTypeGuardError)(r,t,"string"),!1):!0};nd.isString=qB});var KW=W(sd=>{"use strict";Object.defineProperty(sd,"__esModule",{value:!0});sd.isUnknown=void 0;var KB=function(e){return!0};sd.isUnknown=KB});var JW=W(id=>{"use strict";Object.defineProperty(id,"__esModule",{value:!0});id.isFunction=void 0;var JB=O(),YB=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,JB.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};id.isFunction=YB});var XW=W(ad=>{"use strict";Object.defineProperty(ad,"__esModule",{value:!0});ad.isFile=void 0;var YW=O(),XB=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,YW.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,YW.generateTypeGuardError)(e,t.identifier,"File")),!1)};ad.isFile=XB});var QW=W(ld=>{"use strict";Object.defineProperty(ld,"__esModule",{value:!0});ld.isFileList=void 0;var ZW=O(),ZB=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,ZW.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,ZW.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};ld.isFileList=ZB});var tL=W(cd=>{"use strict";Object.defineProperty(cd,"__esModule",{value:!0});cd.isBlob=void 0;var eL=O(),QB=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,eL.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,eL.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};cd.isBlob=QB});var oL=W(dd=>{"use strict";Object.defineProperty(dd,"__esModule",{value:!0});dd.isFormData=void 0;var rL=O(),eG=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,rL.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,rL.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};dd.isFormData=eG});var sL=W(ud=>{"use strict";Object.defineProperty(ud,"__esModule",{value:!0});ud.isURL=void 0;var nL=O(),tG=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,nL.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,nL.generateTypeGuardError)(e,t.identifier,"URL")),!1)};ud.isURL=tG});var aL=W(pd=>{"use strict";Object.defineProperty(pd,"__esModule",{value:!0});pd.isURLSearchParams=void 0;var iL=O(),rG=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,iL.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,iL.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};pd.isURLSearchParams=rG});var lL=W(md=>{"use strict";Object.defineProperty(md,"__esModule",{value:!0});md.isMap=void 0;var oG=O(),nG=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,oG.generateTypeGuardError)(e,t.identifier,"Map")),!1)};md.isMap=nG});var cL=W(gd=>{"use strict";Object.defineProperty(gd,"__esModule",{value:!0});gd.isSet=void 0;var sG=O(),iG=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,sG.generateTypeGuardError)(e,t.identifier,"Set")),!1)};gd.isSet=iG});var dL=W(_f=>{"use strict";Object.defineProperty(_f,"__esModule",{value:!0});_f.isIndexSignature=lG;var aG=O();function lG(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,aG.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let g=s[d],A=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),h=t(g,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return A&&h})}}});var uL=W(fd=>{"use strict";Object.defineProperty(fd,"__esModule",{value:!0});fd.isError=void 0;var cG=ai(),dG=function(t,r){return t instanceof Error?!0:((0,cG.reportTypeGuardError)(r,t,"Error"),!1)};fd.isError=dG});var Lf=W(Wf=>{"use strict";Object.defineProperty(Wf,"__esModule",{value:!0});Wf.isArrayWithEachItem=mG;var uG=O(),pG=kt();function mG(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,uG.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,pG.attachTypeGuardMeta)(t,{itemGuard:e})}});var kf=W(hd=>{"use strict";Object.defineProperty(hd,"__esModule",{value:!0});hd.isNonEmptyArray=void 0;var gG=O(),fG=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,gG.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};hd.isNonEmptyArray=fG});var pL=W(Ef=>{"use strict";Object.defineProperty(Ef,"__esModule",{value:!0});Ef.isNonEmptyArrayWithEachItem=SG;var hG=Lf(),yG=kf();function SG(e){return function(t,r){return(0,hG.isArrayWithEachItem)(e)(t,r)&&(0,yG.isNonEmptyArray)(t,r)}}});var gL=W(Cf=>{"use strict";Object.defineProperty(Cf,"__esModule",{value:!0});Cf.isTuple=AG;var mL=O();function AG(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,mL.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,mL.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var fL=W(Rf=>{"use strict";Object.defineProperty(Rf,"__esModule",{value:!0});Rf.isObjectWithEachItem=PG;var bG=O();function PG(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,bG.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var hL=W(xf=>{"use strict";Object.defineProperty(xf,"__esModule",{value:!0});xf.isPartialOf=vG;var wG=Wr();function vG(e){return function(t,r){if(!(0,wG.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var yL=W(Tf=>{"use strict";Object.defineProperty(Tf,"__esModule",{value:!0});Tf.isPick=WG;var _G=Wr();function WG(e,...t){return function(r,o){if(!(0,_G.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var SL=W(If=>{"use strict";Object.defineProperty(If,"__esModule",{value:!0});If.isOmit=kG;var LG=Wr();function kG(e,...t){return function(r,o){if(!(0,LG.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),g=p.indexOf(" ("),A=g>=0?p.slice(0,g):p;if(a.has(A))return!1;let h=A.startsWith(s+".")&&A.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var AL=W(yd=>{"use strict";Object.defineProperty(yd,"__esModule",{value:!0});yd.isNonEmptyString=void 0;var EG=O(),CG=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,EG.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};yd.isNonEmptyString=CG});var bL=W(Sd=>{"use strict";Object.defineProperty(Sd,"__esModule",{value:!0});Sd.isNonNegativeNumber=void 0;var RG=O(),xG=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,RG.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Sd.isNonNegativeNumber=xG});var PL=W(Ad=>{"use strict";Object.defineProperty(Ad,"__esModule",{value:!0});Ad.isPositiveNumber=void 0;var TG=O(),IG=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,TG.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Ad.isPositiveNumber=IG});var wL=W(bd=>{"use strict";Object.defineProperty(bd,"__esModule",{value:!0});bd.isNonPositiveNumber=void 0;var OG=O(),MG=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,OG.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};bd.isNonPositiveNumber=MG});var vL=W(Pd=>{"use strict";Object.defineProperty(Pd,"__esModule",{value:!0});Pd.isNegativeNumber=void 0;var NG=O(),zG=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,NG.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Pd.isNegativeNumber=zG});var _L=W(wd=>{"use strict";Object.defineProperty(wd,"__esModule",{value:!0});wd.isInteger=void 0;var jG=O(),DG=vf(),$G=function(e,t){return!(0,DG.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,jG.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};wd.isInteger=$G});var WL=W(vd=>{"use strict";Object.defineProperty(vd,"__esModule",{value:!0});vd.isPositiveInteger=void 0;var HG=O(),FG=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,HG.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};vd.isPositiveInteger=FG});var LL=W(_d=>{"use strict";Object.defineProperty(_d,"__esModule",{value:!0});_d.isNegativeInteger=void 0;var UG=O(),BG=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,UG.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};_d.isNegativeInteger=BG});var kL=W(Wd=>{"use strict";Object.defineProperty(Wd,"__esModule",{value:!0});Wd.isNonNegativeInteger=void 0;var GG=O(),VG=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,GG.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Wd.isNonNegativeInteger=VG});var EL=W(Ld=>{"use strict";Object.defineProperty(Ld,"__esModule",{value:!0});Ld.isNonPositiveInteger=void 0;var qG=O(),KG=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,qG.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Ld.isNonPositiveInteger=KG});var CL=W(Ed=>{"use strict";Object.defineProperty(Ed,"__esModule",{value:!0});Ed.isNumeric=void 0;var kd=O(),JG=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,kd.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,kd.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,kd.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,kd.generateTypeGuardError)(e,t.identifier,"number key")),!1};Ed.isNumeric=JG});var RL=W(Cd=>{"use strict";Object.defineProperty(Cd,"__esModule",{value:!0});Cd.isBooleanLike=void 0;var Of=O(),YG=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Of.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Of.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Cd.isBooleanLike=YG});var xL=W(Rd=>{"use strict";Object.defineProperty(Rd,"__esModule",{value:!0});Rd.isDateLike=void 0;var li=O(),XG=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,li.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,li.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,li.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,li.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,li.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Rd.isDateLike=XG});var TL=W(xd=>{"use strict";Object.defineProperty(xd,"__esModule",{value:!0});xd.isBigInt=void 0;var ZG=O(),QG=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,ZG.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};xd.isBigInt=QG});var Nf=W(Mf=>{"use strict";Object.defineProperty(Mf,"__esModule",{value:!0});Mf.isOneOf=e2;var IL=bn();function e2(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,IL.stringify)(t)}) must be one of following values ${e.map(IL.stringify).join(" | ")}`),o}}});var OL=W(zf=>{"use strict";Object.defineProperty(zf,"__esModule",{value:!0});zf.isOneOfTypes=o2;var t2=bn(),r2=ri();function o2(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,t2.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,r2.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var ML=W(jf=>{"use strict";Object.defineProperty(jf,"__esModule",{value:!0});jf.isIntersectionOf=n2;function n2(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var NL=W(Df=>{"use strict";Object.defineProperty(Df,"__esModule",{value:!0});Df.isExtensionOf=s2;function s2(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var zL=W($f=>{"use strict";Object.defineProperty($f,"__esModule",{value:!0});$f.isNullOr=a2;var i2=kt();function a2(e){function t(r,o){return r===null?!0:e(r,o)}return(0,i2.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var jL=W(Hf=>{"use strict";Object.defineProperty(Hf,"__esModule",{value:!0});Hf.isUndefinedOr=c2;var l2=kt();function c2(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,l2.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var DL=W(Ff=>{"use strict";Object.defineProperty(Ff,"__esModule",{value:!0});Ff.isNilOr=u2;var d2=kt();function u2(e){function t(r,o){return r==null?!0:e(r,o)}return(0,d2.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var $L=W(Uf=>{"use strict";Object.defineProperty(Uf,"__esModule",{value:!0});Uf.isAsserted=p2;function p2(e){return!0}});var HL=W(Bf=>{"use strict";Object.defineProperty(Bf,"__esModule",{value:!0});Bf.isEnum=g2;var m2=Nf();function g2(e){return function(t,r){return(0,m2.isOneOf)(...Object.values(e))(t,r)}}});var FL=W(Gf=>{"use strict";Object.defineProperty(Gf,"__esModule",{value:!0});Gf.isEqualTo=y2;var f2=O(),h2=bn();function y2(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,f2.generateTypeGuardError)(t,r.identifier,`equal to ${(0,h2.stringify)(e)}`)),!1):!0}}});var UL=W(Td=>{"use strict";Object.defineProperty(Td,"__esModule",{value:!0});Td.isRegex=void 0;var S2=O(),A2=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,S2.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Td.isRegex=A2});var GL=W(Vf=>{"use strict";Object.defineProperty(Vf,"__esModule",{value:!0});Vf.isPattern=b2;var BL=O();function b2(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,BL.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,BL.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var VL=W(qf=>{"use strict";Object.defineProperty(qf,"__esModule",{value:!0});qf.by=P2;function P2(e){return function(t){return e(t,null)}}});var qL=W(Kf=>{"use strict";Object.defineProperty(Kf,"__esModule",{value:!0});Kf.toNumber=w2;function w2(e){return typeof e=="number"?e:Number(e)}});var KL=W(Jf=>{"use strict";Object.defineProperty(Jf,"__esModule",{value:!0});Jf.toDate=v2;function v2(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var JL=W(Yf=>{"use strict";Object.defineProperty(Yf,"__esModule",{value:!0});Yf.toBoolean=_2;function _2(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var YL=W(Id=>{"use strict";Object.defineProperty(Id,"__esModule",{value:!0});Id.isSymbol=void 0;var W2=O(),L2=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,W2.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Id.isSymbol=L2});var ci=W(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var k2=Zc();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return k2.isType}});var Xf=jW();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return Xf.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return Xf.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return Xf.isNestedType}});var E2=DW();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return E2.isObjectWith}});var C2=$W();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return C2.isObject}});var R2=HW();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return R2.guardWithTolerance}});var x2=FW();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return x2.isBranded}});var T2=UW();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return T2.BrandSymbols}});var I2=BW();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return I2.isAny}});var O2=GW();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return O2.isBoolean}});var M2=VW();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return M2.isDate}});var N2=gf();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return N2.isDefined}});var z2=Jc();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return z2.isNil}});var j2=vf();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return j2.isNumber}});var D2=qW();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return D2.isString}});var $2=KW();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return $2.isUnknown}});var H2=JW();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return H2.isFunction}});var F2=XW();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return F2.isFile}});var U2=QW();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return U2.isFileList}});var B2=tL();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return B2.isBlob}});var G2=oL();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return G2.isFormData}});var V2=sL();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return V2.isURL}});var q2=aL();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return q2.isURLSearchParams}});var K2=lL();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return K2.isMap}});var J2=cL();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return J2.isSet}});var Y2=dL();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return Y2.isIndexSignature}});var X2=uL();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return X2.isError}});var Z2=Lf();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return Z2.isArrayWithEachItem}});var Q2=kf();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return Q2.isNonEmptyArray}});var e5=pL();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return e5.isNonEmptyArrayWithEachItem}});var t5=gL();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return t5.isTuple}});var r5=Wr();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return r5.isNonNullObject}});var o5=fL();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return o5.isObjectWithEachItem}});var n5=hL();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return n5.isPartialOf}});var s5=yL();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return s5.isPick}});var i5=SL();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return i5.isOmit}});var a5=AL();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return a5.isNonEmptyString}});var l5=bL();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return l5.isNonNegativeNumber}});var c5=PL();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return c5.isPositiveNumber}});var d5=wL();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return d5.isNonPositiveNumber}});var u5=vL();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return u5.isNegativeNumber}});var p5=_L();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return p5.isInteger}});var m5=WL();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return m5.isPositiveInteger}});var g5=LL();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return g5.isNegativeInteger}});var f5=kL();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return f5.isNonNegativeInteger}});var h5=EL();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return h5.isNonPositiveInteger}});var y5=CL();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return y5.isNumeric}});var S5=RL();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return S5.isBooleanLike}});var A5=xL();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return A5.isDateLike}});var b5=TL();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return b5.isBigInt}});var P5=Nf();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return P5.isOneOf}});var w5=OL();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return w5.isOneOfTypes}});var v5=ML();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return v5.isIntersectionOf}});var _5=NL();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return _5.isExtensionOf}});var W5=zL();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return W5.isNullOr}});var L5=jL();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return L5.isUndefinedOr}});var k5=DL();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return k5.isNilOr}});var E5=$L();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return E5.isAsserted}});var C5=HL();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return C5.isEnum}});var R5=FL();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return R5.isEqualTo}});var x5=UL();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return x5.isRegex}});var T5=GL();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return T5.isPattern}});var I5=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return I5.generateTypeGuardError}});var O5=VL();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return O5.by}});var M5=qL();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return M5.toNumber}});var N5=KL();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return N5.toDate}});var z5=JL();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return z5.toBoolean}});var j5=YL();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return j5.isSymbol}})});var di,XL,ZL,ao,Zf,TX,QL,Od,lo,ui,Qf,eh,th,rh,Gt,oh,Md,Nd,zd,pi,ct,vn,_n,jd,Lr,nh,ek,Et=l(()=>{"use strict";di={production:".agent-witch",localhost:".local-agent-witch"},XL={production:47892,localhost:47893},ZL={production:"com.agent-witch",localhost:"com.local-agent-witch"},ao={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Zf="app",TX=`${Zf}/agent-witch.js`,QL=`${Zf}/command`,Od={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},lo=di.production,ui=di.localhost,Qf=XL.production,eh=XL.localhost,th=ZL.production,rh=ZL.localhost,Gt="profiles",oh=ao.activeProfile,Md="harness",Nd="sets",zd="manifest.json",pi=Od.projectsDir,ct=Od.logsDir,vn="agent-witch.log",_n="agent-witch.error.log",jd=Od.reportsDir,Lr=Od.deviceKeypairJson,nh=Zf,ek="agent-witch.js"});var Wn,tk,D5,rk,ok=l(()=>{"use strict";Wn=m(require("node:path")),tk=require("node:url"),D5=()=>!0,rk=()=>{if(D5()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Wn.default.dirname(Wn.default.resolve(e)):Wn.default.dirname(Wn.default.resolve(__filename))}return Wn.default.dirname((0,tk.fileURLToPath)(__agentWitchImportMetaUrl))}});var sh,nk,z,sk,$5,kr,L,Dd,Vt,ik,$d,Ln,Hd,Fd,se,dt,ih,ut,ah,N,lh=l(()=>{"use strict";sh=m(require("node:fs")),nk=m(require("node:os")),z=m(require("node:path")),sk=m(ci());Et();ok();$5=rk(),kr=e=>e.trim().toLowerCase(),L=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return z.default.resolve(e);let t=z.default.resolve($5),r=z.default.basename(t),o=z.default.basename(z.default.dirname(t));return r===nh&&(o===lo||o===ui)?z.default.dirname(t):r===lo||r===ui?t:z.default.join(nk.default.homedir(),lo)},Dd=(e=L())=>z.default.join(e,nh),Vt=(e=L())=>z.default.join(Dd(e),ek),ik=(e,t,r)=>t!==null?z.default.join(e,Gt,t,r):z.default.join(e,r),$d=e=>ik(e.installDir,e.profileEmail,pi),Ln=e=>ik(e.installDir,e.profileEmail,ct),Hd=e=>e.profileEmail!==null?z.default.join(e.installDir,Gt,e.profileEmail,Lr):z.default.join(e.installDir,Lr),Fd=e=>z.default.basename(e)===ui,se=(e=L())=>Fd(e)?rh:th,dt=(e=L())=>Fd(e)?eh:Qf,ih=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return kr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?kr(t):null},ut=(e=L())=>{let t=z.default.join(e,oh);if(!sh.default.existsSync(t))return null;try{let r=JSON.parse(sh.default.readFileSync(t,"utf8"));if((0,sk.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return kr(r.email)}catch{return null}return null},ah=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?kr(r):null}let t=ih();return t!==null?t:ut()},N=e=>{let t=L(),r=Dd(t),o=Vt(t),n=ah(e);if(n!==null){let A=z.default.join(t,Gt,n),h=z.default.join(A,Md),y=z.default.join(A,pi),u=z.default.join(A,ct),S=z.default.join(A,jd),b=z.default.join(A,Lr),f=z.default.join(A,ct,vn),w=z.default.join(A,ct,_n);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:u,mainLogPath:f,errorLogPath:w,reportsDir:S,deviceKeypairPath:b,configPath:z.default.join(A,"config.json"),harnessRootDir:h,harnessManifestPath:z.default.join(h,zd),harnessSetsDir:z.default.join(h,Nd)}}let s=z.default.join(t,Md),i=z.default.join(t,pi),a=z.default.join(t,ct),c=z.default.join(t,jd),d=z.default.join(t,Lr),p=z.default.join(t,ct,vn),g=z.default.join(t,ct,_n);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:g,reportsDir:c,deviceKeypairPath:d,configPath:z.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:z.default.join(s,zd),harnessSetsDir:z.default.join(s,Nd)}}});var ch,ak,H5,F5,lk,dh,ck=l(()=>{"use strict";ch=m(require("node:fs")),ak=m(require("node:path"));Et();lh();H5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),F5=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,lk=e=>{let t=ak.default.join(e,ao.wakePort);if(!ch.default.existsSync(t))return null;try{let r=JSON.parse(ch.default.readFileSync(t,"utf8"));if(H5(r)&&F5(r.wakePort))return r.wakePort}catch{return null}return null},dh=(e=L())=>lk(e)??dt(e)});var V=l(()=>{"use strict";lh();ck()});var mi,q5,K5,dk,J5,Y5,uk=l(()=>{"use strict";V();mi=se(),q5=`${mi}-wake`,K5=`${mi}-live`,dk=`${mi}-watchdog`,J5=`${mi}-automation-scheduler`,Y5=`${mi}-updater`});var uh,ph,Ud=l(()=>{"use strict";uh=new Set(["","loginwindow","_mbsetupuser","root"]),ph=5e3});var pk,X5,mk,mh,gh=l(()=>{"use strict";pk=require("node:child_process");Ud();X5=e=>e.trim().toLowerCase(),mk=e=>e==null?!1:!uh.has(X5(e)),mh=()=>{if(process.platform!=="darwin")return null;try{let t=(0,pk.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return mk(t)?t:null}catch{return null}}});var fk,gk,pt,gi=l(()=>{"use strict";fk=m(require("node:os"));gh();gk=e=>e.trim().toLowerCase(),pt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?mh():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??fk.default.userInfo().username;return gk(r)===gk(o)}});var hk,yk,co,Sk=l(()=>{"use strict";hk=require("node:child_process"),yk=m(require("node:fs"));V();gi();co=(e=L())=>{let t=Vt(e);if(!yk.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!pt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=ut(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,hk.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var Ak,fi,Bd=l(()=>{"use strict";Ak=require("node:child_process"),fi=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,Ak.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Gd,fh,bk,ee,Vd,hi=l(()=>{"use strict";Gd=m(require("node:fs")),fh=m(require("node:path"));V();Et();bk=e=>{let t=fh.default.join(e,Gt);return Gd.default.existsSync(t)?Gd.default.readdirSync(t).filter(r=>Gd.default.statSync(fh.default.join(t,r)).isDirectory()).map(r=>kr(r)).toSorted():[]},ee=(e=L())=>{let t=se(e);return[{profileEmail:bk(e)[0]??null,launchAgentLabel:t}]},Vd=(e=L())=>bk(e)});var hh,Pk,wk,Z5,qt,qd=l(()=>{"use strict";hh=m(require("node:fs")),Pk=m(require("node:os")),wk=m(require("node:path"));V();hi();Z5=()=>wk.default.join(Pk.default.homedir(),"Library","LaunchAgents"),qt=(e=L())=>{let t=se(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ee(e))r.add(n.launchAgentLabel);let o=Z5();if(hh.default.existsSync(o))for(let n of hh.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var vk,yi,_k=l(()=>{"use strict";V();Bd();qd();hi();vk=(e=L())=>{let t=new Set(ee(e).map(r=>r.launchAgentLabel));return qt(e).filter(r=>!t.has(r))},yi=(e=L())=>{for(let t of vk(e))fi(t)}});var Si,yh=l(()=>{"use strict";V();Bd();qd();Si=(e=L())=>{for(let t of qt(e))fi(t)}});var Wk,Lk,Q5,uo,kk=l(()=>{"use strict";Wk=require("node:child_process"),Lk=require("node:util"),Q5=(0,Lk.promisify)(Wk.execFile),uo=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await Q5("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var po,eV,Sh,Ah=l(()=>{"use strict";po=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eV=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,Sh=e=>{let t=e.pathValue??eV(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${po(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${po(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${po(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${po(e.homeDir)}</string>
    <key>PATH</key>
    <string>${po(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${po(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${po(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var Kd,bh=l(()=>{"use strict";Kd=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var mo,Ph,Ai,tV,rV,oV,Ek,Kt,wh=l(()=>{"use strict";mo=m(require("node:fs")),Ph=m(require("node:os")),Ai=m(require("node:path"));Et();V();Ah();bh();tV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rV=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,oV=e=>{let t=Ai.default.join(e,ao.wakePort);if(!mo.default.existsSync(t))return dt(e);try{let r=JSON.parse(mo.default.readFileSync(t,"utf8"));if(tV(r)&&rV(r.wakePort))return r.wakePort}catch{return dt(e)}return dt(e)},Ek=(e,t=Ph.default.homedir())=>Ai.default.join(t,"Library","LaunchAgents",`${e}.plist`),Kt=e=>{let t=e.installDir??L(),r=e.homeDir??Ph.default.homedir(),o=Ek(e.launchAgentLabel,r),n=mo.default.existsSync(o)?mo.default.readFileSync(o,"utf8"):null;if(n!==null&&Kd(n))return{ok:!0,rewritten:!1,plistPath:o};let s=Sh({launchAgentLabel:e.launchAgentLabel,runPath:Ai.default.join(t,QL,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??oV(t)});if(!Kd(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{mo.default.mkdirSync(Ai.default.dirname(o),{recursive:!0}),mo.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var Rk,xk,Tk,bi,nV,sV,Ck,ke,vh=l(()=>{"use strict";Rk=require("node:child_process"),xk=m(require("node:fs")),Tk=require("node:util");V();wh();gi();bi=(0,Tk.promisify)(Rk.execFile),nV=async e=>{try{return await bi("launchctl",["print",e]),!0}catch{return!1}},sV=async(e,t,r)=>{await nV(t)&&await bi("launchctl",["bootout",t]).catch(()=>{}),await bi("launchctl",["bootstrap",e,r]),await bi("launchctl",["enable",t])},Ck=async e=>{try{return await bi("launchctl",["kickstart","-k",e]),!0}catch{return!1}},ke=async(e,t=L())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!pt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=Kt({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await Ck(n))return{ok:!0};let i=s.plistPath;if(!xk.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await sV(o,n,i),await Ck(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var go,Ik=l(()=>{"use strict";V();vh();hi();go=async(e=L())=>{let t=[];for(let r of ee(e))(await ke(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var Ve,Jt,Ok=l(()=>{"use strict";yh();gi();Ud();Ve=e=>{pt()||(Si(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Jt=(e,t=ph)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{pt()||e()},t);return()=>{clearInterval(r)}}});var te=l(()=>{"use strict";uk();Sk();Bd();_k();yh();qd();gi();kk();Ik();vh();wh();bh();Ah();hi();gh();Ud();Ok()});var _h=l(()=>{"use strict";te()});var Mk,Nk,Jd,zk,kn,jk,Dk,fo=l(()=>{"use strict";Mk=".agent-witch",Nk="memory",Jd="project.json",zk="chunks.ndjson",kn="runs.ndjson",jk="reports",Dk=".json"});var $k=l(()=>{"use strict";fo()});var Hk,Yd,Wh=l(()=>{"use strict";Hk=m(require("node:path"));$k();Yd=(e,t)=>Hk.default.join(e.trim(),`${t.trim()}${Dk}`)});var Pi,Fk,Uk=l(()=>{"use strict";Pi="agent-witch.js",Fk="command"});var Xd=l(()=>{"use strict";Uk()});var ho,Bk,Gk=l(()=>{"use strict";Xd();ho=e=>`'${e.replace(/'/g,"'\\''")}'`,Bk=e=>{let t=`${e.installDir.trim()}/${"app"}/${Pi}`,r=[ho("node"),ho(t),"report","write","--key",ho(e.reportKey.trim()),"--agent-run-id",ho(e.agentRunId.trim()),"--status",ho(e.status),"--summary",ho(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",ho(e.details.trim())),r.join(" ")}});var Ct,Vk,iV,Lh,Zd=l(()=>{"use strict";Wh();Gk();Ct={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},Vk=e=>e===Ct.COMPLETED||e===Ct.FAILED,iV=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Lh=(e,t)=>{let r=Yd(t.reportsDir,t.reportKey),o=Bk({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Ct.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${iV({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Ee=l(()=>{"use strict";Et();V()});var vi,Kk,qk,Jk,aV,En,lV,Yk,_i,Wi,kh,Xk,Zk,Li=l(()=>{"use strict";vi=m(require("node:fs")),Kk=m(require("node:path"));Zd();Wh();Ee();qk=50,Jk=e=>{let t=N(),r=Yd(t.reportsDir,e);return vi.default.mkdirSync(Kk.default.dirname(r),{recursive:!0}),r},aV=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},En=e=>{let t=Jk(e);if(!vi.default.existsSync(t))return null;try{let r=JSON.parse(vi.default.readFileSync(t,"utf8"));return aV(r)?r:null}catch{return null}},lV=(e,t)=>{let r=[...e,t];return r.length>qk?r.slice(r.length-qk):r},Yk=e=>{let t=Jk(e.reportKey);vi.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},_i=e=>{let t=En(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:lV(t?.history??[],o)};return Yk(n),n},Wi=e=>{let t=En(e.reportKey);return t!==null?t:_i({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Ct.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},kh=(e,t)=>{let r=t.trim();if(r.length===0)return En(e);let o=En(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return Yk(s),s},Xk=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},Zk=e=>{if(e===null||!Vk(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Ct.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var cV,dV,ki,Qk,Qd,Eh=l(()=>{"use strict";Zd();Li();cV=new Set(Object.values(Ct)),dV=e=>cV.has(e),ki=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},Qk=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Qd=e=>{if(e[0]!=="write")return Qk(),1;let r=ki(e,"--key"),o=ki(e,"--agent-run-id"),n=ki(e,"--status"),s=ki(e,"--summary"),i=ki(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!dV(n)?(Qk(),1):(_i({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var qe,yo=l(()=>{"use strict";qe=()=>!0});var Ch,eE,So,eu=l(()=>{"use strict";Ch=m(require("node:path")),eE=require("node:url");yo();So=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Ch.default.resolve(t);return qe()?r===Ch.default.resolve(__filename):e===void 0?!1:r===(0,eE.fileURLToPath)(e)}});var tu,Cn,mV,IQ,Rn=l(()=>{"use strict";tu="agent-witch.js",Cn="deps.tar.gz",mV="install.sh",IQ={mainScript:`app/${tu}`,depsArchive:`app/${Cn}`,installShell:mV}});var nE=l(()=>{"use strict";Rn()});var sE=l(()=>{"use strict";Rn();nE()});var Ei,xh,ru,gV,Ci,Ce,Tn,Ri,xi,Ao,Th=l(()=>{"use strict";Ei=m(require("node:fs")),xh=m(require("node:path"));sE();V();ru="install-version.json",gV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ci=(e=L())=>xh.default.join(e,ru),Ce=(e=L())=>{let t=Ci(e);if(!Ei.default.existsSync(t))return null;try{let r=JSON.parse(Ei.default.readFileSync(t,"utf8"));return!gV(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Tn=(e,t=L())=>{let r=Ci(t);Ei.default.mkdirSync(xh.default.dirname(r),{recursive:!0}),Ei.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Ri=(e=L())=>Ce(e)?.bundleVersion??"235",xi=(e,t)=>{let r=Ce(e);if(r!==null)return r;let o={bundleVersion:"235",appOrigin:t,updatedAt:new Date().toISOString()};return Tn(o,e),o},Ao=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var iE,bo,Ih,Oh,Mh,ou,Rt,Po,Nh=l(()=>{"use strict";iE=require("node:crypto"),bo=m(require("node:fs")),Ih=m(require("node:path"));V();Oh="self-update-log.ndjson",Mh=100,ou=(e=L())=>{let t=N(),r=t.installDir===e?t.logsDir:Ln({installDir:e,profileEmail:t.profileEmail});return Ih.default.join(r,Oh)},Rt=(e,t=L())=>{let r={id:(0,iE.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=ou(t);bo.default.mkdirSync(Ih.default.dirname(o),{recursive:!0});let n=bo.default.existsSync(o)?bo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Mh+1)),JSON.stringify(r)];return bo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Po=(e=20,t=L())=>{let r=ou(t);if(!bo.default.existsSync(r))return[];let o=bo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var zh,YQ,jh=l(()=>{"use strict";Rn();zh="deps",YQ=`${"app"}/${Cn}`});var aE=l(()=>{"use strict";jh()});var lE,Er,wo,cE,Dh,$h,dE=l(()=>{"use strict";lE=require("node:child_process"),Er=m(require("node:fs")),wo=m(require("node:path"));Rn();jh();cE=e=>wo.default.join(e,"app",zh),Dh=e=>{let t=wo.default.join(e,"app"),r=wo.default.join(t,Cn);Er.default.existsSync(r)&&(Er.default.rmSync(cE(e),{recursive:!0,force:!0}),Er.default.mkdirSync(t,{recursive:!0}),(0,lE.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Er.default.rmSync(r,{force:!0}))},$h=e=>{Er.default.rmSync(wo.default.join(e,"node_modules"),{recursive:!0,force:!0}),Er.default.rmSync(wo.default.join(e,"package.json"),{force:!0}),Er.default.rmSync(wo.default.join(e,"package-lock.json"),{force:!0})}});var uE=l(()=>{"use strict";aE();dE()});var Yt,nu,pE=l(()=>{"use strict";Yt="https://www.agentwitch.com",nu="wss://www.agentwitch.com/api/agent-witch/ws"});var Ti,Xt,mE=l(()=>{"use strict";Ti="127.0.0.1",Xt=`http://${Ti}:43347`});var Zt=l(()=>{"use strict";pE();mE()});var Ii,su,gE,Fh,fV,fE,Gh,hE,mt,Oi,Mi,Vh,Uh,Bh,Ni,qh,Kh,Jh,In=l(()=>{"use strict";Ii=m(require("node:fs")),su=m(require("node:path")),gE="active-writer-work.json",Fh=new Set,fV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fE=e=>e.profileEmail===null?su.default.join(e.installDir,gE):su.default.join(e.installDir,"profiles",e.profileEmail,gE),Gh=e=>{let t=fE(e);if(!Ii.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Ii.default.readFileSync(t,"utf8"));return!fV(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},hE=(e,t)=>{let r=fE(e);Ii.default.mkdirSync(su.default.dirname(r),{recursive:!0}),Ii.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},mt=e=>Gh(e).activeCount>0,Oi=e=>{let t=Gh(e);hE(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},Mi=e=>{let t=Gh(e),r=Math.max(0,t.activeCount-1);if(hE(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of Fh)o()},Vh=e=>(Fh.add(e),()=>{Fh.delete(e)}),Uh=null,Bh=null,Ni=e=>{Uh=e},qh=e=>{Bh=e},Kh=()=>{let e=Uh;return Uh=null,e},Jh=()=>{let e=Bh;return Bh=null,e}});var Re,Yh=l(()=>{"use strict";Re=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var On,iu,zi,Xh=l(()=>{"use strict";On="qwen2.5:7b",iu="nomic-embed-text",zi="Install Ollama from https://ollama.com/download"});var ji,yE,Zh=l(()=>{"use strict";Xh();ji=()=>`
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
    echo "Ollama is missing. ${zi}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${zi}" >&2
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
  agent_witch_ensure_ollama_model "${On}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${iu}" "\${pull_log}"
}
`,yE=()=>`
${ji()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var SE,hV,au,Qh=l(()=>{"use strict";SE=require("node:child_process");V();Zh();hV=e=>new Promise(t=>{let r=(0,SE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:L()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),au=async(e=hV)=>{let t=`${ji()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var Cr,lu,AE,yV,bE,Nn,SV,AV,bV,Mn,vo,_o,PE=l(()=>{"use strict";Cr=m(require("node:fs")),lu=m(require("node:path"));uE();te();V();Rn();Zt();Th();In();Yh();Nh();Qh();AE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yV=e=>{let t=ut(e),r=t===null?N():N(t);if(!Cr.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Cr.default.readFileSync(r.configPath,"utf8"));return!AE(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},bE=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!AE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},Nn=async e=>(await bE(e))?.bundleVersion??null,SV=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=lu.default.join(t,r);Cr.default.mkdirSync(lu.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());Cr.default.writeFileSync(n,s),r.endsWith(".js")&&Cr.default.chmodSync(n,493)},AV=async()=>{yi(),await go()},bV=(e,t)=>e!==null?Re(e):t??Yt,Mn=(e,t)=>({localBundleVersion:t,...e}),vo=async e=>{let t=L(),r=Ce(t),o=r?.bundleVersion??null,n=await au();Rt({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=yV(t),i=bV(s,r?.appOrigin);if(i===null){let d=Mn({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return Rt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await bE(i);if(a===null){let d=Mn({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return Rt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||Ao(o,a.bundleVersion))){let d=Mn({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Rt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let A of a.scripts)await SV(i,t,A);let d=lu.default.join(t,tu);Cr.default.existsSync(d)&&Cr.default.rmSync(d,{force:!0}),Dh(t),$h(t),Tn({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=N(ut(t));if(mt(p)){let A=Mn({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Rt({event:"update_applied",ok:!0,message:A.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),A}await AV();let g=Mn({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Rt({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",g=Mn({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return Rt({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}},_o=()=>{let e=L();return{local:Ce(e),logs:Po(20,e)}}});var wE={};Lt(wE,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>ru,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>zi,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>iu,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>On,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Oh,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Mh,appendAgentWitchSelfUpdateLog:()=>Rt,buildAgentWitchEnsureOllamaShell:()=>ji,buildAgentWitchInstallScriptOllama:()=>yE,buildAgentWitchSelfUpdateStatus:()=>_o,ensureAgentWitchInstallVersionRecorded:()=>xi,ensureAgentWitchOllamaInstalled:()=>au,fetchAgentWitchRemoteInstallBundleVersion:()=>Nn,isRemoteAgentWitchBundleVersionNewer:()=>Ao,readAgentWitchInstallVersion:()=>Ce,readAgentWitchSelfUpdateLogs:()=>Po,resolveAgentWitchAppOriginFromWsUrl:()=>Re,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Ri,resolveAgentWitchInstallVersionPath:()=>Ci,resolveAgentWitchSelfUpdateLogPath:()=>ou,runAgentWitchSelfUpdate:()=>vo,writeAgentWitchInstallVersion:()=>Tn});var tt=l(()=>{"use strict";Th();Nh();PE();Yh();Xh();Zh();Qh()});var ey={};Lt(ey,{buildAgentWitchSelfUpdateStatus:()=>_o,fetchAgentWitchRemoteInstallBundleVersion:()=>Nn,runAgentWitchSelfUpdate:()=>vo});var ty=l(()=>{"use strict";tt()});function zn(e){return(0,vE.createHash)("sha256").update(e.trim()).digest("hex")}var vE,ry=l(()=>{"use strict";vE=require("node:crypto")});var jn,Di,PV,_E,oy,WE=l(()=>{"use strict";jn=m(require("node:fs")),Di=m(require("node:path"));ry();Ee();PV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_E=e=>{if(!jn.default.existsSync(e))return null;try{let t=JSON.parse(jn.default.readFileSync(e,"utf8"));return!PV(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:zn(t.pairingToken.trim())}catch{return null}},oy=(e=L())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(_E(Di.default.join(e,"config.json")));let n=Di.default.join(e,Gt);if(!jn.default.existsSync(n))return t;for(let s of jn.default.readdirSync(n)){let i=Di.default.join(n,s);jn.default.statSync(i).isDirectory()&&o(_E(Di.default.join(i,"config.json")))}return t}});var ny,LE,cu,$i,Hi,wV,vV,_V,kE,de,ue,du,xt,gt=l(()=>{"use strict";ny=m(require("node:fs")),LE=m(require("node:os")),cu=m(require("node:path")),$i={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Hi=e=>e.trim().length>0,wV=e=>{let t=cu.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},vV=()=>{let e=LE.default.homedir(),t=cu.default.join(e,".local","bin","agent");if(ny.default.existsSync(t))return t;let r=cu.default.join(e,".local","bin","cursor-agent");return ny.default.existsSync(r)?r:$i.cursorCommand},_V=e=>{let t=e.trim();return!Hi(t)||t===$i.cursorCommand?vV():t},kE=(e,t)=>wV(e)?t:["agent",...t],de=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ue=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:Hi(t)?t.trim():$i.claudeCommand,codexCommand:Hi(r)?r.trim():$i.codexCommand,cursorCommand:_V(o),antigravityCommand:Hi(n)?n.trim():$i.antigravityCommand}},du=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:kE(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},xt=(e,t,r,o)=>{let n=t.trim();if(!Hi(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:kE(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",n]}}});var Rr,WV,Dn,LV,$n,uu=l(()=>{"use strict";Rr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,WV=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:Rr(s.inputTokens)+Rr(s.outputTokens)+Rr(s.cacheReadInputTokens)+Rr(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Dn=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=Rr(a.input_tokens)+Rr(a.cache_creation_input_tokens)+Rr(a.cache_read_input_tokens),d=Rr(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:WV(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},LV=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),$n=(e,t)=>{let r=Dn(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??LV(r)}}});var sy,kV,EV,iy,ay=l(()=>{"use strict";sy=e=>e.toLocaleString("en-US"),kV=e=>e<.01?e.toFixed(4):e.toFixed(3),EV=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${kV(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${sy(e.inputTokens)} in / ${sy(e.outputTokens)} out (${sy(e.totalTokens)} total)`,t].join(`
`)},iy=(e,t)=>{if(t===void 0)return e;let r=EV(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var pu,ly=l(()=>{"use strict";pu={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Wo,cy,mu,dy=l(()=>{"use strict";ly();Wo="auto",cy=e=>({value:Wo,label:`Auto (${pu[e]})`}),mu={anthropic:[cy("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[cy("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[cy("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Hn,Fi,uy,Ui=l(()=>{"use strict";ly();dy();Hn=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Wo))return t},Fi=(e,t)=>{let r=Hn(t);return r===void 0?pu[e]:r},uy=e=>{let t=Hn(e);return t===void 0?Wo:t}});var gu,CV,RV,fu,EE=l(()=>{"use strict";gu={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},CV=e=>{let t=gu[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?gu["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?gu["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?gu["gemini-2.0-flash"]:null},RV=(e,t,r)=>{let o=CV(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},fu=e=>{let t=RV(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Fn,xV,TV,IV,hu,CE=l(()=>{"use strict";EE();Fn=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),xV=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Fn(r.input_tokens),n=Fn(r.output_tokens);return o===0&&n===0?null:fu({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},TV=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Fn(r.prompt_tokens),n=Fn(r.completion_tokens);return o===0&&n===0?null:fu({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},IV=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=Fn(r.promptTokenCount),n=Fn(r.candidatesTokenCount);return o===0&&n===0?null:fu({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},hu=(e,t,r)=>e==="anthropic"?xV(t,r):e==="openai"?TV(t,r):IV(t,r)});var OV,py,MV,NV,zV,jV,DV,my,gy=l(()=>{"use strict";Ui();CE();OV=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},py=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Fi(e,t.model)},MV=async e=>{let t=py("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=OV(o);n.length>0&&e.onChunk?.(n);let s=hu("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},NV=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},zV=async e=>{let t=py("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=NV(o);n.length>0&&e.onChunk?.(n);let s=hu("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},jV=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},DV=async e=>{let t=py("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=jV(n);s.length>0&&e.onChunk?.(s);let i=hu("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},my=async e=>{try{return e.provider==="anthropic"?await MV(e):e.provider==="openai"?await zV(e):await DV(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Ke,Bi=l(()=>{"use strict";Ke=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var RE,$V,yu,fy=l(()=>{"use strict";RE=m(require("node:path")),$V="writer-api-secrets.json",yu=e=>RE.default.join(e,$V)});var hy,xE,HV,xr,De,Tr=l(()=>{"use strict";hy=m(require("node:fs"));Ui();fy();xE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),HV=e=>{if(!xE(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=Hn(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},xr=e=>{let t=yu(e);if(!hy.default.existsSync(t))return{};try{let r=JSON.parse(hy.default.readFileSync(t,"utf8"));if(!xE(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=HV(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},De=(e,t)=>xr(e)[t]??null});var xe,Gi=l(()=>{"use strict";xe=e=>e==="api"?"api":"cli"});var TE,we,Lo,Qt=l(()=>{"use strict";TE=m(require("node:path"));Bi();Tr();Gi();we=e=>TE.default.dirname(e),Lo=(e,t)=>{if(xe(e.writerExecutionBackend)!=="api")return!1;let r=Ke(t);if(r===null)return!1;let o=we(e.layout.configPath),n=De(o,r);return n!==null&&n.apiKey.length>0}});var Vi,yy=l(()=>{"use strict";ay();gy();Bi();Tr();Qt();Vi=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Ke(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=we(e.layout.configPath),a=De(i,s);if(a===null){let d=Object.keys(xr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await my({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:iy(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var IE,Un,Sy=l(()=>{"use strict";IE=require("node:child_process");gt();uu();yy();Qt();Un=(e,t,r)=>new Promise(o=>{if(!de(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(Lo(e,t)){Vi(e,t,r).then(o);return}let n=xt(t,r,ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,IE.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=$n(i.join("")),p=a.join("").trim(),g=[d.output.trim(),p].filter(A=>A.length>0).join(`
`);o({exitCode:c??-1,output:g})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var OE=l(()=>{"use strict"});var ME=l(()=>{"use strict";ay();Sy();gy();OE();Tr();Qt()});var NE,zE,jE,DE=l(()=>{"use strict";NE="claude",zE="codex",jE="cursor"});var $E,FV,Ay,qi,Su=l(()=>{"use strict";$E=m(require("node:path"));Zt();Et();FV="ws://localhost:3000/api/agent-witch/ws",Ay=e=>e.replace(/\/$/,""),qi=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return Ay(t);let r=$E.default.basename(e.installDir);if(r===di.production)return nu;let o=e.configWsUrl?.trim()??"";return r===di.localhost?o.length>0?Ay(o):FV:o.length>0?Ay(o):nu}});var BV,by,Py=l(()=>{"use strict";DE();Su();Gi();BV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),by=e=>{if(!BV(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=qi({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??NE,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??zE,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??jE,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:xe(t.writerExecutionBackend),layout:e.layout}}}});var wy,vy,_y=l(()=>{"use strict";wy=m(require("node:fs"));V();Py();vy=e=>{let t=N(e);if(!wy.default.existsSync(t.configPath))return null;try{let r=JSON.parse(wy.default.readFileSync(t.configPath,"utf8")),o=by({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Ki,HE=l(()=>{"use strict";Ki=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var Wy,GV,Ly,FE=l(()=>{"use strict";Wy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GV=e=>{if(!Wy(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!Wy(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(g=>{if(!Wy(g))return[];let A=typeof g.itemKey=="string"?g.itemKey.trim():"",h=typeof g.relativePath=="string"?g.relativePath:"",y=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return A.length===0||y.length===0?[]:[{itemKey:A,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},Ly=GV});var UE,VV,Au,ky=l(()=>{"use strict";UE=m(require("node:path")),VV=(e,t)=>{let r=t.trim();return UE.default.join(e,"components","store",r.slice(0,2),r)},Au=VV});var BE,qV,Ey,GE=l(()=>{"use strict";BE=m(require("node:fs"));ky();qV=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Au(e.installDir,n.contentSha256);BE.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},Ey=qV});var Ji,Bn,KV,Cy,JV,Ry,xy=l(()=>{"use strict";Ji=m(require("node:fs")),Bn=m(require("node:path"));ky();KV=(e,t)=>Bn.default.join(e.installDir,"runs",t,"overlay"),Cy=(e,t)=>Bn.default.join(KV(e,t),".cursor"),JV=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=Cy(e,t);Ji.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Au(e.installDir,i.contentSha256);if(!Ji.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Bn.default.join(n,c):Bn.default.join(n,i.itemKey);Ji.default.mkdirSync(Bn.default.dirname(d),{recursive:!0}),Ji.default.copyFileSync(a,d)}return{ok:!0}},Ry=JV});var Ty,VE,YV,Yi,qE=l(()=>{"use strict";Ty=m(require("node:fs")),VE=m(require("node:path")),YV=(e,t)=>{let r=VE.default.join(e.installDir,"runs",t);Ty.default.existsSync(r)&&Ty.default.rmSync(r,{recursive:!0,force:!0})},Yi=YV});var XV,Iy,KE=l(()=>{"use strict";xy();XV=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=Cy(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},Iy=XV});var Oy,ZV,QV,eq,tq,rq,H,JE=l(()=>{"use strict";Oy=m(require("node:fs"));Su();V();Gi();ZV="claude",QV="codex",eq="cursor",tq="agy",rq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H=()=>{let e=N();if(!Oy.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Oy.default.readFileSync(e.configPath,"utf8"));if(!rq(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=qi({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:xe(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:ZV,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:QV,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:eq,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:tq,pairingToken:s,layout:e}}catch{return null}}});var bu,YE,XE=l(()=>{"use strict";bu=m(require("node:fs"));fy();YE=(e,t)=>{let r=yu(e);bu.default.mkdirSync(e,{recursive:!0}),bu.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{bu.default.chmodSync(r,384)}catch{}}});var Pu,ZE,My=l(()=>{"use strict";Pu=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},ZE=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Pu(t)}});var Xi,oq,Ny,zy,QE=l(()=>{"use strict";Xi=m(require("node:fs"));Tr();XE();My();Ui();Qt();oq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ny=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=ZE(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?Hn(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},zy=e=>{let t=we(e.configPath),r={};if(Xi.default.existsSync(e.configPath))try{let n=JSON.parse(Xi.default.readFileSync(e.configPath,"utf8"));oq(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,Xi.default.mkdirSync(t,{recursive:!0}),Xi.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=Ny(Ny(Ny(xr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);YE(t,o)}});var jy,eC=l(()=>{"use strict";jy={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var Dy,tC=l(()=>{"use strict";Bi();Tr();Qt();Qt();Dy=(e,t)=>{if(Lo(e,t))return!1;let r=Ke(t);if(r===null)return!1;let o=we(e.layout.configPath),n=De(o,r);return n===null||n.apiKey.trim().length===0}});var rC,$y,Hy=l(()=>{"use strict";rC=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},$y=async e=>{let t=rC(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=rC(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var nq,Fy,oC=l(()=>{"use strict";te();_y();Hy();nq=1e4,Fy=()=>$y({listProfileEmails:Vd,readConfig:vy,pollIntervalMs:nq,logWaiting:e=>{console.error(e)}})});var pe=l(()=>{"use strict";Sy();ME();_y();Su();HE();FE();GE();xy();qE();KE();Gi();JE();QE();Tr();Qt();My();Ui();eC();yy();Qt();tC();Bi();Tr();oC();Py();Hy()});var wu,nC,sq,iq,sC,vu,Zi,_u,Qi=l(()=>{"use strict";wu=m(require("node:fs")),nC=m(require("node:path")),sq="wake-port.json",iq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sC=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,vu=e=>nC.default.join(e,sq),Zi=e=>{let t=vu(e);if(!wu.default.existsSync(t))return null;try{let r=JSON.parse(wu.default.readFileSync(t,"utf8"));if(iq(r)&&sC(r.wakePort))return r.wakePort}catch{return null}return null},_u=(e,t)=>{if(!sC(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=vu(e);wu.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var doe,uoe,poe,ft,iC,ea=l(()=>{"use strict";Qi();Ee();Qi();doe=dt(),uoe=`${se()}-wake`,poe=se(),ft=()=>{let e=L(),t=Zi(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return dt()},iC=e=>{let t=L();Zi(t)===null&&_u(t,e)}});var aC=l(()=>{"use strict";ry();te();WE();pe();ea()});var Uy,ta,ra,lC=l(()=>{"use strict";Uy=m(require("node:os"));aC();ta=()=>{let e=ee();return{ok:!0,port:ft(),hostname:Uy.default.hostname(),profileCount:e.length}},ra=()=>{let e=ee(),t=H()?.pairingToken.trim()??"",r=t.length>0?zn(t):null,o=oy();return{hostname:Uy.default.hostname(),port:ft(),tokenHash:r,tokenHashes:o.length>0?o:r!==null?[r]:[],profiles:e.map(n=>({email:n.profileEmail,launchAgentLabel:n.launchAgentLabel}))}}});var By=l(()=>{"use strict";lC()});var cC,dC,uC,Wu,Gn=l(()=>{"use strict";cC="materialization.json",dC="backups",uC=".gitignore",Wu=e=>`harness-set:${e.trim()}`});var pC,mC,Lu,gC=l(()=>{"use strict";pC=m(require("node:crypto")),mC=m(require("node:fs")),Lu=e=>{try{let t=mC.default.readFileSync(e);return pC.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Ir,ko,aq,fC,Gy,hC=l(()=>{"use strict";Ir=m(require("node:fs")),ko=m(require("node:path"));gC();aq=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=ko.default.join(t,n,o);return Ir.default.mkdirSync(ko.default.dirname(s),{recursive:!0}),Ir.default.copyFileSync(r,s),ko.default.relative(e,s).replaceAll("\\","/")},fC=e=>{let t=ko.default.join(e.repoRoot,e.repoRelativeDestination),r=Lu(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(Ir.default.existsSync(t)){let n=Lu(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=aq(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Ir.default.mkdirSync(ko.default.dirname(t),{recursive:!0}),Ir.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Ir.default.mkdirSync(ko.default.dirname(t),{recursive:!0}),Ir.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},Gy=e=>{let t=Lu(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var Vy,yC,ku,qy=l(()=>{"use strict";Vy=m(require("node:fs"));Gn();yC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ku=e=>{if(!Vy.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(Vy.default.readFileSync(e,"utf8"));if(yC(t)&&t.version===1&&yC(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var Or,Eu,SC,AC=l(()=>{"use strict";Or=m(require("node:fs")),Eu=m(require("node:path"));Gn();SC=e=>{let t=new Set(e.setSlugs.map(s=>Wu(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=Eu.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=Eu.default.join(e.repoRoot,i.backupPath);Or.default.existsSync(c)?(Or.default.mkdirSync(Eu.default.dirname(a),{recursive:!0}),Or.default.copyFileSync(c,a),o.push(s)):Or.default.existsSync(a)&&Or.default.rmSync(a,{force:!0})}else Or.default.existsSync(a)&&Or.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var Ky,Cu,Jy=l(()=>{"use strict";Ky=m(require("node:path"));Gn();Cu=e=>({ledgerFilePath:Ky.default.join(e.metaDirPath,cC),backupsDirPath:Ky.default.join(e.metaDirPath,dC)})});var Yy,bC,PC=l(()=>{"use strict";Yy=m(require("node:path")),bC=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return Yy.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return Yy.default.posix.join(s,e,n)}});var Xy,wC,Zy,vC=l(()=>{"use strict";Xy=m(require("node:fs")),wC=m(require("node:path")),Zy=(e,t)=>{Xy.default.mkdirSync(wC.default.dirname(e),{recursive:!0}),Xy.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var Qy,lq,rt,na=l(()=>{"use strict";Qy=m(require("node:os")),lq=e=>{let t=e.trim();return t.startsWith("~/")?`${Qy.default.homedir()}${t.slice(1)}`:t==="~"?Qy.default.homedir():t},rt=lq});var Ru,_C,cq,WC,LC=l(()=>{"use strict";Ru=m(require("node:fs")),_C=m(require("node:path"));Gn();fo();cq=`*
!${Jd}
`,WC=e=>{let t=_C.default.join(e,uC);Ru.default.existsSync(t)||(Ru.default.mkdirSync(e,{recursive:!0}),Ru.default.writeFileSync(t,cq))}});var Eo,ot,Co=l(()=>{"use strict";Eo=m(require("node:path"));fo();na();ot=e=>{let t=rt(e),r=Eo.default.join(t,Mk);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Eo.default.join(r,"rag"),memoryDirPath:Eo.default.join(r,Nk),reportsDirPath:Eo.default.join(r,jk),metaFilePath:Eo.default.join(r,Jd),ragChunksFilePath:Eo.default.join(r,"rag",zk)}}});var Tt,EC,dq,uq,Je,eS=l(()=>{"use strict";Tt=m(require("node:fs")),EC=m(require("node:path"));fo();LC();Co();dq=(e,t)=>{if(Tt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Tt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},uq=e=>{Tt.default.existsSync(e.ragChunksFilePath)||Tt.default.writeFileSync(e.ragChunksFilePath,"");let t=EC.default.join(e.memoryDirPath,kn);Tt.default.existsSync(t)||Tt.default.writeFileSync(t,"")},Je=e=>{let t=ot(e.projectFolderPath);return Tt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Tt.default.mkdirSync(t.ragDirPath,{recursive:!0}),Tt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),WC(t.metaDirPath),dq(t,e),uq(t),{ok:!0,layout:t}}});var CC,RC,xC,TC,xu,Tu=l(()=>{"use strict";CC="components",RC="store",xC="versions",TC="installed.json",xu=e=>`harness-set:${e.trim()}`});var tS,IC,Iu,rS=l(()=>{"use strict";tS=m(require("node:fs")),IC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Iu=e=>{if(!tS.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(tS.default.readFileSync(e,"utf8"));if(IC(t)&&t.version===1&&IC(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var sa,Vn,Ou=l(()=>{"use strict";sa=m(require("node:path"));Tu();Vn=e=>{let t=sa.default.join(e,CC);return{componentsRootDir:t,storeDir:sa.default.join(t,RC),versionsDir:sa.default.join(t,xC),installedFilePath:sa.default.join(t,TC)}}});var oS,OC,Mu,Nu,zu=l(()=>{"use strict";oS=m(require("node:crypto")),OC=m(require("node:fs")),Mu=e=>oS.default.createHash("sha256").update(e,"utf8").digest("hex"),Nu=e=>{try{let t=OC.default.readFileSync(e);return oS.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var nS,MC,NC,zC=l(()=>{"use strict";nS=m(require("node:fs")),MC=m(require("node:path")),NC=(e,t)=>{nS.default.mkdirSync(MC.default.dirname(e),{recursive:!0}),nS.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var sS,iS,jC,DC=l(()=>{"use strict";sS=m(require("node:fs")),iS=m(require("node:path")),jC=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=iS.default.join(e,r),n=iS.default.join(o,`${t.versionId}.json`);sS.default.mkdirSync(o,{recursive:!0}),sS.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var ju,$C,HC,FC=l(()=>{"use strict";ju=m(require("node:fs")),$C=m(require("node:path"));zu();HC=e=>{let t=Mu(e.content),r=$C.default.join(e.storeDir,t);return ju.default.existsSync(r)||(ju.default.mkdirSync(e.storeDir,{recursive:!0}),ju.default.writeFileSync(r,e.content)),t}});var aS,UC,pq,Du,lS=l(()=>{"use strict";aS=m(require("node:fs")),UC=m(require("node:path"));Tu();rS();Ou();zu();zC();DC();FC();pq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Du=e=>{let t=Vn(e.installDir),r=xu(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!pq(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=UC.default.join(e.harnessRootDir,a);if(!aS.default.existsSync(c))continue;let d=aS.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Nu(c);if(p!==null){if(Mu(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);HC({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;jC(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=Iu(t.installedFilePath);NC(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var dS,cS,BC,GC=l(()=>{"use strict";dS=m(require("node:fs"));lS();rS();Ou();cS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),BC=e=>{if(!dS.default.existsSync(e.harnessManifestPath))return;let t=Vn(e.installDir),r=Iu(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(dS.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!cS(o)||o.version!==1||!cS(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!cS(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Du({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var uS,VC,qC,KC=l(()=>{"use strict";uS=m(require("node:fs")),VC=m(require("node:path")),qC=e=>{let t=e.componentId.replaceAll("/","_"),r=VC.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!uS.default.existsSync(r))return null;try{let o=JSON.parse(uS.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var $u,Hu,JC,YC=l(()=>{"use strict";$u=m(require("node:fs")),Hu=m(require("node:path"));Tu();GC();KC();Ou();zu();JC=e=>{BC({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Vn(e.layout.installDir),r=xu(e.setSlug),o=qC({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Hu.default.join(t.storeDir,i.contentSha256);if($u.default.existsSync(a)&&Nu(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Hu.default.join(e.layout.harnessRootDir,n):Hu.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!$u.default.existsSync(s))return null;try{if(!$u.default.statSync(s).isFile())return null}catch{return null}return s}});var XC,mq,gq,Mr,Fu=l(()=>{"use strict";qy();Jy();Co();XC="harness-set:",mq=e=>{let t=e.trim();if(!t.startsWith(XC))return null;let r=t.slice(XC.length).trim();return r.length>0?r:null},gq=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=mq(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Mr=e=>{let t=ot(e),{ledgerFilePath:r}=Cu(t),o=ku(r);return gq(o)}});var Uu,pS,ia,fq,er,aa,qn=l(()=>{"use strict";Uu=m(require("node:fs")),pS=m(require("node:os")),ia=m(require("node:path")),fq=()=>Uu.default.realpathSync(ia.default.resolve(pS.default.homedir())),er=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?ia.default.join(pS.default.homedir(),t.slice(1)):t,o;try{o=Uu.default.realpathSync(ia.default.resolve(r))}catch{return null}let n=fq();return o===n||o.startsWith(`${n}${ia.default.sep}`)?o:null},aa=e=>{let t=er(e);if(t===null)return null;try{if(!Uu.default.statSync(t).isFile())return null}catch{return null}return t}});var mS,gS=l(()=>{"use strict";mS=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Gu,ZC,Bu,hq,la,fS=l(()=>{"use strict";Gu=m(require("node:fs")),ZC=m(require("node:path"));Gn();hC();qy();AC();Jy();PC();vC();na();eS();YC();Fu();qn();gS();Bu=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hq=e=>{if(!Gu.default.existsSync(e))return null;try{let t=JSON.parse(Gu.default.readFileSync(e,"utf8"));if(Bu(t)&&t.version===1)return t}catch{return null}return null},la=e=>{let t=[...new Set(e.setSlugs.map(b=>b.trim()).filter(b=>b.length>0))],r=rt(e.projectFolderPath),o=er(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Gu.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Je({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Cu(s.layout),d=Mr(o).filter(b=>!t.includes(b)),p=ku(i),g=0;if(d.length>0){let b=SC({repoRoot:o,setSlugs:d,ledger:p});p=b.ledger,g=b.summary.removedPaths.length}if(t.length===0)return Zy(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:[]};let A=hq(e.layout.harnessManifestPath);if(A===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=Bu(A.sets)?A.sets:{},y=0,u=0,S=0;for(let b of t){let f=h[b];if(!Bu(f))return{ok:!1,errorMessage:`Harness set "${b}" is not installed locally.`};let w=typeof f.version=="number"?String(f.version):"1",v=Wu(b),_=Array.isArray(f.items)?f.items:[];for(let k of _){if(!Bu(k))continue;let E=typeof k.path=="string"?k.path.trim():"";if(E.length===0)continue;let x=mS(E);if(x===null)continue;let I=bC(b,x),M=ZC.default.posix.join(".cursor",I).replaceAll("\\","/"),X=typeof k.id=="string"?k.id.trim():"",G=JC({layout:e.layout,setSlug:b,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:E,manifestItemId:X});if(G===null)continue;let F=fC({repoRoot:o,backupsDir:a,repoRelativeDestination:M,sourceAbsolutePath:G,componentId:v,versionId:w,ledger:p});if(F.kind==="skipped_unchanged"){u+=1;continue}if(F.kind==="backed_up_user_file"){S+=1,y+=1,p={version:1,entries:{...p.entries,[M]:Gy({componentId:v,versionId:w,sourceAbsolutePath:G,backupPath:F.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[M]:Gy({componentId:v,versionId:w,sourceAbsolutePath:G})}}}}return y===0&&u===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(Zy(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:S,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:t})}});var QC,Vu,yq,Sq,Aq,bq,Pq,wq,vq,_q,Wq,ca,qu=l(()=>{"use strict";QC=m(require("node:crypto")),Vu=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},yq=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},Sq=(e,t)=>{let r=yq(t),o=Vu(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},Aq=(e,t,r)=>{let o=Sq(t,r);return`shared/items/${e}/${o}`},bq=["rules","skills","commands","instructions","agents"],Pq=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),wq=(e,t)=>[...e.filter(o=>o.id!==t.id),t],vq=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},_q=e=>QC.default.createHash("sha256").update(e,"utf8").digest("hex"),Wq=e=>({id:e.id,kind:e.kind,title:e.title,path:Aq(e.id,e.kind,e.title),contentSha256:_q(e.content)}),ca=e=>{let t=new Date().toISOString(),r=e.existingManifest??Pq(e.hostname,t),o=Vu(e.bundle.slug),n=vq(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...bq.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let g=Wq(p);return{files:[...d.files,{relativePath:g.path,content:p.content}],nextItems:wq(d.nextItems,g)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var Nr,eR,Ku,Lq,Ro,hS=l(()=>{"use strict";Nr=m(require("node:fs")),eR=m(require("node:os")),Ku=m(require("node:path"));qu();Lq=e=>{if(!Nr.default.existsSync(e))return null;try{let t=JSON.parse(Nr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Ro=e=>{try{let t=Lq(e.layout.harnessManifestPath),r=ca({bundle:e.bundle,hostname:eR.default.hostname(),existingManifest:t});Nr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)Nr.default.mkdirSync(Ku.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Ku.default.join(e.layout.harnessRootDir,o.relativePath);Nr.default.mkdirSync(Ku.default.dirname(n),{recursive:!0}),Nr.default.writeFileSync(n,o.content)}return Nr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var yS,tR=l(()=>{"use strict";hS();fS();yS=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=Ro({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return la({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var rR,oR=l(()=>{"use strict";rR=["rule","skill","command","instruction","agent"]});var nR,kq,Eq,It,SS=l(()=>{"use strict";oR();nR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kq=e=>typeof e=="string"&&rR.includes(e),Eq=e=>{if(!nR(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!kq(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},It=e=>{if(!nR(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=Eq(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var sR,Cq,AS,iR=l(()=>{"use strict";sR=require("node:zlib");SS();Cq="x-agent-witch-token",AS=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[Cq]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,sR.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=It(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var PS,bS,zr,aR=l(()=>{"use strict";PS=m(require("node:fs")),bS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zr=e=>{if(!PS.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(PS.default.readFileSync(e.harnessManifestPath,"utf8"));if(!bS(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=bS(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!bS(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Ju,lR=l(()=>{"use strict";Ju=()=>"~"});var cR,dR,uR=l(()=>{"use strict";cR=require("node:crypto"),dR=e=>`local-${(0,cR.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var wS,pR=l(()=>{"use strict";wS=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var da,Yu,vS=l(()=>{"use strict";da=m(require("node:path")),Yu=e=>{let t=da.default.dirname(e),r=da.default.basename(t);return r==="agents"?da.default.basename(da.default.dirname(t)):r}});var ua,tr,mR,Rq,xq,Tq,Xu,gR,_S=l(()=>{"use strict";ua=m(require("node:fs")),tr=m(require("node:path"));uR();pR();vS();mR=new Set(["node_modules",".git","dist","build",".next","coverage"]),Rq=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},xq=(e,t)=>{let r=tr.default.basename(t);if(e==="skill"){let o=t.split(tr.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},Tq=e=>{let t=[],r=(n,s)=>{let i;try{i=ua.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&mR.has(a.name))continue;let c=tr.default.join(n,a.name),d=s?tr.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;wS(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=tr.default.join(e,n);ua.default.existsSync(s)&&r(s,n)}let o=tr.default.join(e,"skills");return ua.default.existsSync(o)&&r(o,"skills"),t},Xu=e=>{let t=Tq(e);if(t.length===0)return null;let r=tr.default.dirname(e),o=Yu(e),n=Rq(o),s=t.map(i=>{let a=wS(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:dR(i.absolutePath),kind:a,title:xq(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},gR=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=ua.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||mR.has(a.name))continue;let c=tr.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var fR,WS,Iq,LS,hR=l(()=>{"use strict";fR=m(require("node:fs")),WS=m(require("node:path"));_S();qn();Iq=e=>{let t=er(e.trim());if(t===null)return null;if(WS.default.basename(t)===".cursor")return t;let r=WS.default.join(t,".cursor");try{if(fR.default.statSync(r).isDirectory())return er(r)}catch{return null}return null},LS=e=>{let t=Iq(e.projectPath);if(t===null)return null;let r=Xu(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var yR,Oq,Zu,kS,SR=l(()=>{"use strict";yR=m(require("node:path"));_S();qn();vS();Oq=5,Zu=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},kS=e=>{let t=er(e.scanRoot.trim());if(t===null)return Zu(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of gR(t,Oq,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=er(s);if(i===null)continue;let a=Yu(i);Zu(e.response,"folder",{cursorDir:i,groupName:a,repoPath:yR.default.dirname(i)});let c=Xu(i);c!==null&&(r.push(c),Zu(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Zu(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var AR,bR,PR=l(()=>{"use strict";AR=m(require("node:path")),bR=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:AR.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Me,wR,ES,Mq,CS,RS,Qu,xS,pa,vR=l(()=>{"use strict";Me=m(require("node:fs")),wR=m(require("node:os")),ES=m(require("node:path"));qu();lS();qn();PR();Mq=e=>{if(!Me.default.existsSync(e))return null;try{let t=JSON.parse(Me.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},CS=e=>{let t=e.hostname??wR.default.hostname(),r=Mq(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let g=aa(p.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let A=Me.default.readFileSync(g,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:A,setSlugs:[i.slug]})}let d=ca({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Me.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Me.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=ES.default.join(e.layout.harnessRootDir,i.relativePath);Me.default.mkdirSync(ES.default.dirname(a),{recursive:!0}),Me.default.writeFileSync(a,i.content)}Me.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=Vu(i.slug),d=r.sets[c];d!==void 0&&Du({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},RS="reveal-cache.json",Qu=(e,t)=>{Me.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Me.default.writeFileSync(`${e.harnessRootDir}/${RS}`,`${JSON.stringify(t,null,2)}
`)},xS=e=>{let t=`${e.harnessRootDir}/${RS}`;Me.default.existsSync(t)&&Me.default.unlinkSync(t)},pa=e=>{let t=`${e.harnessRootDir}/${RS}`;if(!Me.default.existsSync(t))return null;try{let r=JSON.parse(Me.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return bR(r)}catch{return null}return null}});var xo=l(()=>{"use strict";fS();tR();gS();hS();iR();SS();qu();aR();lR();hR();qn();SR();vR()});var TS,_R=l(()=>{"use strict";xo();Ee();TS=e=>{let t=N(e.profileEmail);return Ro({bundle:e.bundle,layout:t})}});var WR=l(()=>{"use strict";_R();xo()});var Nq,LR,zq,kR,To,ep,ER=l(()=>{"use strict";Nq=["agentwitch.com","www.agentwitch.com"],LR=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,zq=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},kR=e=>{let t=zq(e);return!!(Nq.includes(t)||LR.test(e.trim().toLowerCase()))},To=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return kR(r)?LR.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},ep=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:To(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var ma=l(()=>{"use strict";ER()});var rr,ga=l(()=>{"use strict";rr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var fa,CR=l(()=>{"use strict";WR();ma();ga();fa=e=>{if(!rr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=It(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!To(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=TS({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var IS=l(()=>{"use strict";CR()});var jq,Kn,OS=l(()=>{"use strict";jq=e=>e==="hourly"||e==="daily"||e==="weekdays",Kn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!jq(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var ha,tp,RR,xR,MS,ht,rp,op,np,sp,ip=l(()=>{"use strict";ha=m(require("node:fs")),tp=m(require("node:path"));OS();RR="automations.json",xR=e=>e.profileEmail!==null?tp.default.join(e.installDir,"profiles",e.profileEmail,RR):tp.default.join(e.installDir,RR),MS=()=>({version:1,automations:[]}),ht=e=>{let t=xR(e);if(!ha.default.existsSync(t))return MS();try{let r=JSON.parse(ha.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?MS():{version:1,automations:r.automations.flatMap(n=>{let s=Kn(n);return s!==null?[s]:[]})}}catch{return MS()}},rp=(e,t)=>{let r=xR(e);ha.default.mkdirSync(tp.default.dirname(r),{recursive:!0}),ha.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},op=(e,t)=>{rp(e,{version:1,automations:t})},np=(e,t)=>{let o=ht(e).automations.filter(n=>n.id!==t.id);rp(e,{version:1,automations:[...o,t]})},sp=(e,t)=>ht(e).automations.find(r=>r.id===t)??null});var $e,jr=l(()=>{"use strict";$e="x-agent-witch-token"});var Z,Io,NS,ya,zS,Dq,jS,Sa,Aa,DS,ba=l(()=>{"use strict";jr();tt();Z=e=>{let t=Re(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Io=e=>({[$e]:e,"Content-Type":"application/json"}),NS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Io(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},ya=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Io(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},zS=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Io(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Dq=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},jS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:Io(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Sa=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:Io(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return Dq(r)}catch{return null}},Aa=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:Io(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},DS=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Io(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var Oo,TR,IR,$q,$S,OR,HS=l(()=>{"use strict";Oo=m(require("node:fs")),TR=m(require("node:path")),IR=e=>TR.default.join(e.harnessRootDir,"projects-registry.json"),$q=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),$S=e=>{let t=IR(e);if(!Oo.default.existsSync(t))return[];try{let r=JSON.parse(Oo.default.readFileSync(t,"utf8"));return $q(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},OR=e=>{let t=IR(e);if(!Oo.default.existsSync(t))return;let r=`${t}.migrated`;if(Oo.default.existsSync(r)){Oo.default.unlinkSync(t);return}Oo.default.renameSync(t,r)}});var MR,Hq,Fq,NR,zR=l(()=>{"use strict";na();MR=e=>rt(e),Hq=e=>new Set(e.map(t=>MR(t.folderPath))),Fq=e=>new Set(e.map(t=>t.id)),NR=(e,t)=>{let r=Hq(t),o=Fq(t),n=[],s=new Set;for(let i of e){let a=MR(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var FS,US=l(()=>{"use strict";ba();HS();zR();FS=async(e,t)=>{let r=$S(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Sa(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=NR(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await jS(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&OR(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var BS,Mo,ap=l(()=>{"use strict";BS=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),Mo=(e,t)=>e.find(r=>r.id===t)??null});var Jn,lp=l(()=>{"use strict";ba();US();ap();Jn=async(e,t)=>{t!==void 0&&await FS(t,e);let r=Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Sa(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Console. Check the Mac connection and try again."};let n=BS(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Console, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Console.`}}});var jR=l(()=>{"use strict"});var Ne,DR,Uq,Bq,Gq,Vq,Yn,GS=l(()=>{"use strict";Ne=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),DR=(e,t)=>e.length===0?`<p class="empty">${Ne(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Ne(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Ne(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Console \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,Uq=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,Bq=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ne(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Console. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,Gq=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?Bq(e.project):Uq();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${Ne(o.slug)}"${t.size===0||t.has(o.slug)?" checked":""} />
            <span><strong>${Ne(o.name)}</strong> <span class="muted mono">(${Ne(o.slug)})</span></span>
          </label>
          <p class="muted">${o.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`<form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ne(e.project.id)}" />
        <p class="field-label">Installed</p>
        <p class="lede">Check the sets to write into this repo&apos;s <code>.cursor</code> tree, then pull.</p>
        ${r}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`},Vq=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Ne(t)} from recent runs. Review in Agent Witch Console or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Ne(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},Yn=e=>{let t=e.flashError?`<div class="alert-error">${Ne(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ne(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(a,c)=>`<a class="project-tab${e.activeTab===a?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${a}">${Ne(c)}</a>`,n=e.composition?.items.filter(a=>a.kind==="workflow")??[],s=e.composition?.items.filter(a=>a.kind==="agent")??[],i="";return e.activeTab==="harness"?i=Gq({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=DR(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=DR(s,"No agents installed for this project yet."):i=Vq({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount}),`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Ne(e.project.name)}</h1>
      <p class="muted mono">${Ne(e.project.projectFolderPath)}</p>
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
    </section>`}});var qq,Kq,$R,HR=l(()=>{"use strict";xo();jr();qq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Kq=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!qq(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=It(n);return s===null?[]:[s]})}catch{return null}},$R=Kq});var FR,VS,UR=l(()=>{"use strict";pe();xo();GS();lp();HR();ap();Fu();ba();FR=e=>({kind:"page",title:e.project.name,body:Yn({project:e.project,installed:zr(e.layout),linkedSetSlugs:Mr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),VS=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=H();if(r===null)return{kind:"not_found"};let o=await Jn(r,e.layout),n=Mo(o.projects,t);if(n===null)return{kind:"not_found"};let s=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s===null?null:await $R(s,n.id);if(i===null)return FR({layout:e.layout,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Console."});let a=yS({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:i});if(!a.ok)return FR({layout:e.layout,project:n,errorMessage:a.errorMessage});let c=s===null?!1:await Aa(s,n.id,a.appliedSetSlugs),d=new URLSearchParams({linked:"1",files:String(a.writtenFileCount),bindingsSynced:c?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${d.toString()}`}}});var Jq,qS,BR=l(()=>{"use strict";Jq=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,qS=Jq});var GR,VR,Yq,Xq,cp,dp,qR=l(()=>{"use strict";GR=require("node:child_process"),VR=require("node:util"),Yq=(0,VR.promisify)(GR.execFile),Xq=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},cp=async(e,t)=>{try{let{stdout:r}=await Yq("git",t,{cwd:e,env:Xq(),maxBuffer:1048576});return r.trim()}catch{return null}},dp=async e=>{let t=await cp(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await cp(e,["rev-parse","--abbrev-ref","HEAD"]),o=await cp(e,["status","--porcelain"]),n=await cp(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var KS,KR=l(()=>{"use strict";KS=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var Zq,JS,JR=l(()=>{"use strict";Zq=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},JS=Zq});var Qq,YS,YR=l(()=>{"use strict";jr();Qq=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[$e]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},YS=Qq});var XR,Dr,ZR=l(()=>{"use strict";XR=require("node:child_process"),Dr=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,XR.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var QR=l(()=>{"use strict";lp()});var Pa,ex=l(()=>{"use strict";jr();Pa=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[$e]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var yt=l(()=>{"use strict";lp();ap();jR();na();eS();UR();Fu();BR();qR();KR();JR();YR();ZR();QR();ex();US();HS();ba()});var up,wa,tx,XS,No,ZS=l(()=>{"use strict";up=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},wa=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=up(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},tx=e=>e>=1&&e<=5,XS=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return up(t,"UTC")},No=e=>{let t=e.from??new Date,r=up(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return wa(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=wa(r,e.timeZone,o,0),s=up(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?wa(XS(r),e.timeZone,o,0):n;if(!i&&tx(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=XS(a),tx(a.weekday))return wa(a,e.timeZone,o,0);return wa(XS(r),e.timeZone,o,0)}});var rx,QS,or,eA=l(()=>{"use strict";rx=require("node:crypto");pe();yt();ZS();ip();QS=!1,or=async e=>{if(QS)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=H();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=sp(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};QS=!0;let n=(0,rx.randomUUID)();try{let s=await Un(t,"claude-cli",o.prompt);await DS(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=No({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return np(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{QS=!1}}});var pp,ox=l(()=>{"use strict";pe();eA();ip();pp=async()=>{let e=H();if(e===null)return;let t=ht(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await or(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var va=l(()=>{"use strict";ip();ox();eA();ZS()});var nx=l(()=>{"use strict";va()});var sx=l(()=>{"use strict";OS()});var ix=l(()=>{"use strict";sx()});var tA=l(()=>{"use strict";va()});var eK,tK,_a,rA=l(()=>{"use strict";nx();ix();tA();Ee();eK=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),tK=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??No({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??No({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},_a=e=>{let t=eK(e.profileEmail),r=ht(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Kn(s);return i!==null?[tK(i,o.get(i.id))]:[]});return op(t,n),{ok:!0,writtenCount:n.length}}});var oA=l(()=>{"use strict";va()});var ax=l(()=>{"use strict";pe()});var lx=l(()=>{"use strict";rA();oA();tA();ax()});var cx,Wa,La,ka,dx=l(()=>{"use strict";cx=m(require("node:os"));lx();ma();ga();Wa=e=>{if(!rr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!To(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=_a({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},La=async e=>{if(!rr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:To(t)?or(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},ka=()=>{let e=H(),t=e!==null?ht(e.layout):{version:1,automations:[]};return{ok:!0,hostname:cx.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var nA=l(()=>{"use strict";dx()});var mp=l(()=>{"use strict";te()});var gp=l(()=>{"use strict";te()});var fp,px,mx,ux,rK,oK,Xn,sA=l(()=>{"use strict";fp=m(require("node:fs")),px=m(require("node:os")),mx=m(require("node:path"));mp();gp();Qi();Ee();ux=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},rK=e=>mx.default.join(px.default.homedir(),"Library","LaunchAgents",`${e}.plist`),oK=async e=>fp.default.existsSync(rK(e))?(await ke(e)).ok:!1,Xn=async(e=L())=>{let t=fp.default.existsSync(vu(e)),r=!fp.default.existsSync(Vt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Zi(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await ux(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${se(e)}-wake`;await oK(i)&&s.push(i);for(let c of ee(e))(await ke(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await ux(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var gx=l(()=>{"use strict";te()});var Zn,Ea=l(()=>{"use strict";Zn="connection-health.json"});var zo,hp,nK,Ca,ve,iA,yp,ze,Sp=l(()=>{"use strict";zo=m(require("node:fs")),hp=m(require("node:path"));Ea();nK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ca=e=>e.profileEmail===null?hp.default.join(e.installDir,Zn):hp.default.join(e.installDir,"profiles",e.profileEmail,Zn),ve=e=>{let t=Ca(e);if(!zo.default.existsSync(t))return null;try{let r=JSON.parse(zo.default.readFileSync(t,"utf8"));return!nK(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},iA=e=>{let t=Ca(e);zo.default.existsSync(t)&&zo.default.rmSync(t,{force:!0})},yp=(e,t)=>{let r=Ca(e),o=ve(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};zo.default.mkdirSync(hp.default.dirname(r),{recursive:!0}),zo.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},ze=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var Ra,fx=l(()=>{"use strict";Ea();Sp();Ra=(e,t)=>{if(!t.socketOpen)return!1;let r=ve(e);return r===null?!1:!ze(r,t.staleAfterMs??12e4,t.nowMs)}});var aA,hx=l(()=>{"use strict";Sp();aA=(e,t)=>!(e!==null&&!ze(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Qn=l(()=>{"use strict";Sp();fx();hx();Ea()});var lA=l(()=>{"use strict";Qn();te()});var cA=l(()=>{"use strict";Qn()});var dA=l(()=>{"use strict";te()});var Sx,yx,xa,uA=l(()=>{"use strict";Sx=m(require("node:fs"));Zt();mp();gp();Ee();yx=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},xa=async(e=L())=>{if(!Sx.default.existsSync(Vt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await yx())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of ee(e))(await ke(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await yx();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var Ax=l(()=>{"use strict";te()});var bx,jo,pA,sK,iK,aK,Px,lK,wx,es,Ap=l(()=>{"use strict";bx=require("node:crypto"),jo=m(require("node:fs")),pA=m(require("node:path"));Ee();sK="watchdog-log.ndjson",iK=200,aK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Px=(e=L())=>{let t=N(),r=t.installDir===e?t.logsDir:Ln({installDir:e,profileEmail:t.profileEmail});return pA.default.join(r,sK)},lK=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!aK(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},wx=(e,t=L())=>{let r={id:(0,bx.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=Px(t);jo.default.mkdirSync(pA.default.dirname(o),{recursive:!0});let n=jo.default.existsSync(o)?jo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-iK+1)),JSON.stringify(r)];return jo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},es=(e=20,t=L())=>{let r=Px(t);if(!jo.default.existsSync(r))return[];let o=jo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=lK(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var mA,gA,fA,hA=l(()=>{"use strict";Et();mA=ao.watchdogReinstallState,gA=900*1e3,fA=3e3});var vx=l(()=>{"use strict";hA()});var _x={};Lt(_x,{verifyAgentWitchReviveAfterKickstart:()=>dK});var cK,dK,Wx=l(()=>{"use strict";vx();cA();dA();Ee();cK=e=>new Promise(t=>{setTimeout(t,e)}),dK=async e=>{if(await cK(e.verifyDelayMs??fA),!await uo(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),o=ve(r);return!ze(o,e.staleAfterMs)}});var Ta,yA,uK,Lx,kx,SA,AA,bA=l(()=>{"use strict";Ta=m(require("node:fs")),yA=m(require("node:path"));V();hA();uK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Lx=e=>yA.default.join(e,mA),kx=(e=L())=>{let t=Lx(e);if(!Ta.default.existsSync(t))return null;try{let r=JSON.parse(Ta.default.readFileSync(t,"utf8"));return!uK(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},SA=(e=L(),t=Date.now())=>{let r=kx(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=gA:!0},AA=(e=L(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=Lx(e);return Ta.default.mkdirSync(yA.default.dirname(o),{recursive:!0}),Ta.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var PA,Ex=l(()=>{"use strict";te();bA();PA=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!SA())return{attempted:!1,ok:!1,targets:e};AA();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await ke(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var Cx=l(()=>{"use strict";bA();Ex()});var wA=l(()=>{"use strict";tt()});var Rx=l(()=>{"use strict";tt()});var xx,ts,Tx,Ix,Ox,pK,mK,Mx,gK,fK,Nx,zx=l(()=>{"use strict";xx=require("node:child_process"),ts=m(require("node:fs")),Tx=m(require("node:os")),Ix=m(require("node:path")),Ox=require("node:util");wA();Rx();Ee();pK=(0,Ox.promisify)(xx.execFile),mK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Mx=e=>{let t=ut(e),r=t===null?N():N(t);if(!ts.default.existsSync(r.configPath))return null;try{let o=JSON.parse(ts.default.readFileSync(r.configPath,"utf8"));return!mK(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},gK=e=>Mx(e)?.wsUrl??null,fK=e=>{let t=gK(e);return t!==null?Re(t):Ce(e)?.appOrigin??null},Nx=async e=>{let t=e?.installDir??L(),r=Mx(t),o=r!==null?Re(r.wsUrl):fK(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=Ix.default.join(Tx.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{ts.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??ut(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await pK("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{ts.default.existsSync(i)&&ts.default.unlinkSync(i)}}});var jx={};Lt(jx,{attemptAgentWitchWatchdogReinstall:()=>hK});var hK,Dx=l(()=>{"use strict";Cx();zx();hK=async e=>PA(e,()=>Nx())});var $x,Hx,Fx,yK,SK,AK,Ia,vA=l(()=>{"use strict";gx();lA();cA();dA();uA();sA();mp();gp();Ee();In();Ax();Ap();$x=e=>e===null?N():N(e),Hx=async(e,t,r)=>{if(!await uo(e))return"not_running";let n=$x(t);if(mt(n))return"healthy";let s=ve(n);return ze(s,r)?"stale_connection":"healthy"},Fx=async e=>{let t=e?.staleAfterMs??12e4,r=L(),o=ee(r);return Promise.all(o.map(async n=>{let s=await Hx(n.launchAgentLabel,n.profileEmail,t),i=$x(n.profileEmail),a=ve(i),c=await uo(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:ze(a,t),needsRevive:s!=="healthy",reason:s}}))},yK=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},SK=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",AK=async e=>{let t=await ke(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(Wx(),_x)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},Ia=async e=>{if(!pt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=L();await Xn(r),await xa(r);let o=ee(r),n=[];for(let p of o){let g=await Hx(p.launchAgentLabel,p.profileEmail,t);if(g==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:g});continue}n.push(await AK({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:g,staleAfterMs:t}))}if(n.length===0){let p=co();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(Dx(),jx)),g=await p(n);s=g.attempted,i=g.ok,a=g.errorMessage,c=[...g.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&wx({event:SK(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:yK(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var Ux,bp,Bx=l(()=>{"use strict";Ux=m(require("node:os"));lA();Ap();vA();bp=async()=>{let e=await Fx(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:Ux.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:es(1)[0]??null}}});var _A=l(()=>{"use strict";sA();vA();Bx();Ap()});var Oa,Ma,Na,Gx=l(()=>{"use strict";te();_A();Oa=async()=>{await Xn();let e=ee(),t=[];for(let r of e){let o=await ke(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=co();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Ma=Ia,Na=Ia});var WA=l(()=>{"use strict";Gx()});var wp,Pp,Vx,LA,qx,bK,PK,wK,vK,_K,vp,Kx=l(()=>{"use strict";wp=require("node:child_process"),Pp=m(require("node:fs")),Vx=m(require("node:os")),LA=m(require("node:path")),qx=require("node:util");te();V();bK=(0,qx.promisify)(wp.execFile),PK=()=>LA.default.join(Vx.default.homedir(),"Library","LaunchAgents"),wK=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await bK("launchctl",["bootout",r]).catch(()=>{})},vK=e=>{let t=LA.default.join(PK(),`${e}.plist`);Pp.default.existsSync(t)&&Pp.default.unlinkSync(t)},_K=e=>{(0,wp.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},vp=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=L();if(!Pp.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=qt(e);for(let r of t)await wK(r),vK(r);return _K(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var Jx,_p,Yx,rs,Xx,WK,LK,kK,kA,EK,EA,Zx=l(()=>{"use strict";Jx=require("node:child_process"),_p=m(require("node:fs")),Yx=m(require("node:os")),rs=m(require("node:path")),Xx=require("node:util");te();WK=(0,Xx.promisify)(Jx.execFile),LK=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],kK=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],kA=e=>{_p.default.existsSync(e)&&_p.default.rmSync(e,{force:!0})},EK=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await WK("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},EA=async e=>{let r=(e.listLaunchAgentLabels??qt)(e.layout.installDir),o=e.launchAgentsDir??rs.default.join(Yx.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??EK;for(let i of r)await n(i),kA(rs.default.join(o,`${i}.plist`));let s=rs.default.dirname(e.layout.configPath);for(let i of LK)kA(rs.default.join(s,i));for(let i of kK)kA(rs.default.join(e.layout.installDir,i));return _p.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var CA,Qx=l(()=>{"use strict";CA={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var RA,e0=l(()=>{"use strict";RA="unknown_identity"});var xA=l(()=>{"use strict";Qx();e0()});var CK,TA,t0=l(()=>{"use strict";xA();CK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),TA=e=>e.type!=="system.error"||!CK(e.payload)?!1:e.payload.errorCode===RA});var IA=l(()=>{"use strict";Kx();Zx();t0()});var Wp=l(()=>{"use strict";te();tt();IA();_A()});var os,Lp,kp=l(()=>{"use strict";Wp();os=(e=20)=>es(e),Lp=bp});var Ep,ns,Cp,Rp=l(()=>{"use strict";Wp();Ep=_o,ns=(e=20)=>Po(e),Cp=e=>vo(e)});var xp,OA=l(()=>{"use strict";Wp();xp=()=>vp()});var r0=l(()=>{"use strict";By();IS();nA();WA();kp();Rp();OA()});var o0={};Lt(o0,{buildAgentWitchAutomationStatusFromWakeServer:()=>ka,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Ep,buildAgentWitchWakeHealthResponse:()=>ta,buildAgentWitchWakeIdentityResponse:()=>ra,buildAgentWitchWatchdogStatus:()=>Lp,installHarnessFromWakeServer:()=>fa,readAgentWitchSelfUpdateLogEntries:()=>ns,readAgentWitchWatchdogLogEntries:()=>os,restartAgentWitchFromWakeServer:()=>Na,reviveAgentWitchWebSocketFromWakeServer:()=>Ma,runAgentWitchSelfUpdateFromWakeServer:()=>Cp,runAgentWitchUninstallLocalFromWakeServer:()=>xp,runAutomationFromWakeServer:()=>La,syncAutomationsFromWakeServer:()=>Wa,wakeAgentWitchLaunchAgents:()=>Oa});var n0=l(()=>{"use strict";r0()});var s0,i0,MA,NA,a0=l(()=>{"use strict";s0=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),i0=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?s0(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?s0(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},MA=e=>{let t=e.watchdogLogs.map(i0).join(""),r=e.updateLogs.map(i0).join("");return`<!doctype html>
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
</html>`},NA=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var l0,c0,d0=l(()=>{"use strict";l0=m(require("node:net")),c0=()=>new Promise((e,t)=>{let r=l0.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var u0,RK,zA,p0=l(()=>{"use strict";u0=m(require("node:net"));d0();ea();Qi();Ee();RK=e=>new Promise(t=>{let r=u0.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),zA=async()=>{let e=L(),t=ft();if(await RK(t))return iC(t),t;let r=await c0();return _u(e,r),r}});var xK,jA,m0=l(()=>{"use strict";xK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jA=e=>({force:xK(e)&&e.force===!0})});var za=l(()=>{"use strict";ma();a0();p0();m0();_h();eu();yo()});var DA,j,$A,HA,ja,g0=l(()=>{"use strict";DA=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},$A=e=>{e.writeHead(403),e.end()},HA=e=>e.url?.split("?")[0]??"/",ja=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var St=l(()=>{"use strict";g0()});var TK,f0,h0=l(()=>{"use strict";nA();St();TK=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},f0=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,ka(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await TK(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=Wa(t);return j(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await La(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var IK,S0,y0,A0,FA,b0,UA=l(()=>{"use strict";IK=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],S0=e=>/embed|minilm|^bge-/i.test(e),y0=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),A0=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),FA=e=>e.filter(t=>t.trim().length>0&&!S0(t)),b0=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!S0(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>y0(s,o));if(n!==void 0)return n}for(let n of IK){let s=r.find(i=>y0(i,n));if(s!==void 0)return s}return r[0]??null}});var BA,v0,_0,Tp,W0,P0,w0,OK,MK,NK,zK,jK,DK,At,Da=l(()=>{"use strict";BA=require("node:child_process"),v0=m(require("node:fs")),_0=m(require("node:os")),Tp=m(require("node:path"));tt();gt();UA();W0=3e3,P0=["claude-cli","codex","cursor","antigravity"],w0={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},OK=(e,t)=>new Promise(r=>{let o=(0,BA.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},W0);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),MK=()=>{let e=_0.default.homedir();return["ollama",Tp.default.join(e,".local","bin","ollama"),Tp.default.join(e,".agent-witch","ollama","ollama"),Tp.default.join(e,".local-agent-witch","ollama","ollama")]},NK=e=>new Promise(t=>{let r=(0,BA.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},W0);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(A0(Buffer.concat(o).toString("utf8")))})}),zK=async()=>{for(let e of MK()){if(e!=="ollama"&&!v0.default.existsSync(e))continue;let t=await NK(e);if(t!==null)return t}return[]},jK=e=>{let t=e.installedWriterIds.map(s=>w0[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=de(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${w0[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},DK=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:On},At=async e=>{let t=P0.map(i=>{let a=du(i,e.commands);return OK(a.command,a.args)}),[r,...o]=await Promise.all([zK(),...t]),n=P0.flatMap((i,a)=>o[a]===!0?[i]:[]),s=b0(r,DK());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:jK({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var $K,HK,GA,L0=l(()=>{"use strict";$K="http://127.0.0.1:11434",HK=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},GA=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||$K;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?HK(await o.json()):null}catch{return null}}});var VA=l(()=>{"use strict";gt();Da();L0();UA()});var FK,k0,E0=l(()=>{"use strict";VA();FK={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},k0=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:FK[t]})),ollamaModels:FA(e.ollamaModels)})});var UK,C0,R0=l(()=>{"use strict";VA();St();E0();UK=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},C0=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await At({commands:ue({})});return j(e.response,200,{ok:!0,...k0({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await UK(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await GA({model:r,prompt:o});return n===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var BK,x0,T0=l(()=>{"use strict";IS();St();BK=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},x0=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await BK(e);if(t===null)return!0;let r=fa(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var I0=l(()=>{"use strict";yt()});var qA,O0=l(()=>{"use strict";I0();ga();qA=e=>{if(!rr(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Je({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var M0,KA,JA=l(()=>{"use strict";pe();yt();ga();M0=e=>{if(!rr(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},KA=async e=>{let t=M0(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Dr("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=H();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=Z({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Je({projectFolderPath:r}),await Pa(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Console."})}});var N0=l(()=>{"use strict";O0();JA()});var z0,j0=l(()=>{"use strict";N0();JA();St();z0=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=qA(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await KA(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,o,r,e.cors.headers),!0}return!1}});var D0,$0=l(()=>{"use strict";za();Rp();kp();D0=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=os(50),r=ns(50);return e.response.writeHead(200,NA()),e.response.end(MA({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var H0,F0=l(()=>{"use strict";By();St();H0=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,ta(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,ra(),e.cors.headers),!0):!1});var U0,B0=l(()=>{"use strict";OA();St();U0=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await xp();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var G0,V0=l(()=>{"use strict";WA();St();G0=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Ma();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Na();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Oa();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var q0,K0=l(()=>{"use strict";za();Rp();St();q0=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Ep();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=ja(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:ns(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=jA(t),o=await Cp({force:r});return j(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var J0,Y0=l(()=>{"use strict";kp();St();J0=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await Lp();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=ja(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:os(t)},e.cors.headers),!0}return!1}});var X0,Z0=l(()=>{"use strict";h0();R0();T0();j0();$0();F0();B0();V0();K0();Y0();X0=[H0,D0,J0,G0,q0,U0,x0,z0,f0,C0]});var Q0,eT=l(()=>{"use strict";Z0();Q0=async e=>{for(let t of X0)if(await t(e))return!0;return!1}});var GK,tT,rT=l(()=>{"use strict";ma();St();eT();GK=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:HA(e),readJsonBody:()=>DA(e)}),tT=async(e,t,r)=>{let o=e.headers.origin,n=ep(o);try{if(o!==void 0&&o.length>0&&!n.allowed){$A(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=GK(e,t,r,n);if(await Q0(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var oT,Do,Ip,Op=l(()=>{"use strict";oT=m(require("node:http"));za();rT();Do=async()=>{let e=await zA(),t=oT.default.createServer((r,o)=>{tT(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Ip=Do});var nT={};Lt(nT,{runAgentWitchBridgeCli:()=>VK});var VK,sT=l(()=>{"use strict";te();Op();VK=async()=>{Ve("agent-witch-bridge");let e=await Do(),t=Jt(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var iT=l(()=>{"use strict";Zt()});var ss,YA,aT=l(()=>{"use strict";ss=(e,t,r)=>e===1?t:r,YA=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${ss(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${ss(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${ss(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${ss(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${ss(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${ss(p,"year","years")} ago`}});var $o,XA,qK,KK,ZA,$r,$a,QA,lT=l(()=>{"use strict";$o=m(require("node:fs")),XA=m(require("node:path")),qK="local-ws-traffic.ndjson",KK=500,ZA=e=>XA.default.join(e.logsDir,qK),$r=(e,t)=>{let r=ZA(e);$o.default.mkdirSync(XA.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});$o.default.appendFileSync(r,`${o}
`,"utf8")},$a=(e,t=KK)=>{let r=ZA(e);if(!$o.default.existsSync(r))return[];let n=$o.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},QA=e=>{let t=ZA(e);$o.default.existsSync(t)&&$o.default.writeFileSync(t,"","utf8")}});var JK,cT,dT,uT=l(()=>{"use strict";xA();JK=new Set(Object.values(CA)),cT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),dT=e=>{if(!cT(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!JK.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!cT(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var pT,mT=l(()=>{"use strict";pT=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var YK,XK,ZK,Ha,gT=l(()=>{"use strict";mT();YK=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,XK=e=>YK.test(e),ZK=e=>pT(e),Ha=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>Ha(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&XK(o)){r[o]=ZK(n);continue}r[o]=Ha(n)}return r}});var Ot,eb,QK,e8,t8,tb,fT,hT,yT,r8,Mp,Ho,Np,rb,ST=l(()=>{"use strict";Ot=m(require("node:fs")),eb=m(require("node:path"));uT();gT();QK="local-ws-trace.ndjson",e8=1e4,t8=1440*60*1e3,tb=e=>eb.default.join(e.logsDir,QK),fT=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},hT=e=>{if(!Ot.default.existsSync(e))return;let t=Ot.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-t8,n=t.filter(s=>{let i=fT(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-e8);Ot.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},yT=(e,t)=>{let r=tb(e);Ot.default.mkdirSync(eb.default.dirname(r),{recursive:!0}),Ot.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),hT(r)},r8=e=>e.parsed===null?{_empty:!0}:Ha(e.parsed),Mp=(e,t,r)=>{let o=dT(r);yT(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:r8(o)})},Ho=(e,t)=>{yT(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Ha({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Np=(e,t=80)=>{let r=tb(e);if(hT(r),!Ot.default.existsSync(r))return[];let o=Ot.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=fT(s);i!==null&&n.push(i)}return n.reverse()},rb=e=>{let t=tb(e);Ot.default.existsSync(t)&&Ot.default.writeFileSync(t,"","utf8")}});var Hr,AT,o8,ob,zp,bT=l(()=>{"use strict";Hr=m(require("node:fs")),AT=m(require("node:path")),o8=256e3,ob=e=>{Hr.default.mkdirSync(AT.default.dirname(e),{recursive:!0}),Hr.default.writeFileSync(e,"","utf8")},zp=(e,t=o8)=>{if(!Hr.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Hr.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=Hr.default.openSync(e,"r");try{Hr.default.readSync(a,i,0,s,n)}finally{Hr.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var Fa=l(()=>{"use strict";lT();ST();bT()});var nb,sb,PT=l(()=>{"use strict";nb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sb=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${nb(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${nb(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${nb(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var wT=l(()=>{"use strict";PT()});var ib,ab=l(()=>{"use strict";ib=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var lb=l(()=>{"use strict";Ea()});var cb,db,vT=l(()=>{"use strict";lb();cb=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},db=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var _T=l(()=>{"use strict";ab();vT()});var WT,Ua,ub,Ba=l(()=>{"use strict";ab();WT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ua=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=WT(e),r=WT(ib(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},ub=`(function () {
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
})();`});var Fo,n8,pb,LT=l(()=>{"use strict";Fo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),n8=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},pb=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Fo(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Fo(r.direction):Fo(r.kind),i=`trace-body-${o}`,a=Fo(n8(r.body));return`<tr>
        <td title="${Fo(r.at)}">${Fo(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${Fo(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var ET,kT,mb,CT=l(()=>{"use strict";ET=m(require("node:path"));V();Zt();kT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mb=e=>{let t=se(e.installDir),o=`AW_HOME="$HOME/${ET.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Live</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Console cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${kT(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${kT(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var RT=l(()=>{"use strict";Ba();LT();CT();Ba()});var s8,nr,Ga=l(()=>{"use strict";s8=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),nr=s8});var xT,TT,IT,OT,MT,NT,zT,is=l(()=>{"use strict";xT="projects",TT="knowledge",IT="chunks.ndjson",OT="lessons.ndjson",MT="error-chunks.ndjson",NT="usage-stats.json",zT="knowledge-location.json"});var jp,i8,Dp,gb=l(()=>{"use strict";jp=m(require("node:path"));is();i8=(e,t)=>{let r=t.trim(),o=jp.default.join(e.installDir,xT,r,TT);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:jp.default.join(o,IT),memoryRunsFilePath:jp.default.join(o,OT)}},Dp=i8});var fb,a8,jT,DT=l(()=>{"use strict";fb=m(require("node:fs"));is();Co();a8=e=>{let t=ot(e.projectFolderPath),r=`${t.metaDirPath}/${zT}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};fb.default.mkdirSync(t.metaDirPath,{recursive:!0}),fb.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},jT=a8});var as,HT,$T,l8,FT,UT=l(()=>{"use strict";as=m(require("node:fs")),HT=m(require("node:path"));fo();Co();gb();DT();$T=(e,t)=>{as.default.existsSync(e)&&(as.default.existsSync(t)&&as.default.statSync(t).size>0||(as.default.mkdirSync(HT.default.dirname(t),{recursive:!0}),as.default.copyFileSync(e,t)))},l8=e=>{let t=ot(e.projectFolderPath),r=Dp(e.layout,e.projectId),o=`${t.memoryDirPath}/${kn}`;$T(t.ragChunksFilePath,r.ragChunksFilePath),$T(o,r.memoryRunsFilePath),jT({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},FT=l8});var hb,c8,BT,GT=l(()=>{"use strict";hb=m(require("node:fs"));Co();c8=e=>{let t=ot(e);if(!hb.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(hb.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},BT=c8});var VT,d8,ls,$p=l(()=>{"use strict";VT=m(require("node:path"));fo();Co();UT();GT();gb();d8=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=BT(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){FT({layout:e.layout,projectFolderPath:t,projectId:o});let s=Dp(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=ot(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:VT.default.join(n.memoryDirPath,kn),projectId:null}},ls=d8});var Hp,p8,Fp,yb=l(()=>{"use strict";Hp=m(require("node:fs"));is();p8=(e,t=500)=>{if(!Hp.default.existsSync(e))return;let r=Hp.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Hp.default.writeFileSync(e,`${o.join(`
`)}
`)},Fp=p8});var Up,m8,Uo,Sb=l(()=>{"use strict";Up=m(require("node:path"));is();$p();m8=e=>{let t=ls(e);if(t===null)return null;let r=Up.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Up.default.join(r,NT),errorChunksFilePath:Up.default.join(r,MT)}},Uo=m8});var KT,Va,JT,qT,Ab,YT,h8,bb,XT,Pb,wb,vb,_b=l(()=>{"use strict";KT=require("node:crypto"),Va=m(require("node:fs")),JT=m(require("node:path"));Ga();is();Sb();qT=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),Ab=e=>{if(!Va.default.existsSync(e))return qT();try{let t=JSON.parse(Va.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return qT()},YT=(e,t)=>{Va.default.mkdirSync(JT.default.dirname(e),{recursive:!0}),Va.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},h8=e=>{let t=nr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,KT.createHash)("sha256").update(o).digest("hex").slice(0,16)},bb=e=>{let t=Uo(e);return t===null?null:Ab(t.usageStatsFilePath)},XT=e=>{if(e.chunkIds.length===0)return;let t=Uo(e);if(t===null)return;let r=Ab(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;YT(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},Pb=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=Uo(e);if(r===null)return null;let o=h8(t),n=Ab(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return YT(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},wb=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,vb=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var qa,ZT,y8,S8,QT,A8,Wb,Ka,cs,Lb,ds,kb,Eb=l(()=>{"use strict";qa=m(require("node:fs")),ZT=m(require("node:path"));Ga();$p();yb();_b();y8="http://127.0.0.1:11434",S8="nomic-embed-text",QT=(e,t,r)=>ls({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,A8=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},Wb=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},Ka=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||y8,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||S8;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},cs=(e,t,r)=>{let o=QT(e,t,r);if(o===null||!qa.default.existsSync(o))return[];let n=qa.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},Lb=async e=>{let t=nr(e.text),r=Wb(t);if(r.length===0)return 0;let o=QT(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;qa.default.mkdirSync(ZT.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await Ka(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};qa.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return Fp(o),n},ds=async e=>{let t=await Ka(e.query);if(t===null)return[];let r=e.minScore??0,s=cs(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:A8(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return XT({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},kb=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Ja,eI,b8,P8,Cb,Rb,xb,tI=l(()=>{"use strict";Ja=m(require("node:fs")),eI=m(require("node:path"));Ga();Sb();yb();Eb();b8=e=>{if(!Ja.default.existsSync(e))return[];let t=Ja.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},P8=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},Cb=async e=>{let t=Uo(e);if(t===null)return 0;let r=nr(e.text),o=Wb(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;Ja.default.mkdirSync(eI.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await Ka(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};Ja.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Fp(n,200),s},Rb=async e=>{let t=Uo(e);if(t===null)return[];let r=await Ka(e.query);if(r===null)return[];let o=e.minScore??.3;return b8(t.errorChunksFilePath).map(s=>({chunk:s,score:P8(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},xb=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Tb=l(()=>{"use strict";Eb();_b();tI()});var Ib,rI=l(()=>{"use strict";Ib={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var oI=l(()=>{"use strict";rI()});var he,Ob,Mb=l(()=>{"use strict";oI();he=Ib,Ob=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${he.gray50};
  --aw-zinc-100: ${he.gray100};
  --aw-zinc-200: ${he.gray200};
  --aw-zinc-400: ${he.gray400};
  --aw-zinc-500: ${he.gray500};
  --aw-zinc-600: ${he.gray600};
  --aw-zinc-700: ${he.gray700};
  --aw-zinc-800: ${he.gray900};
  --aw-zinc-900: ${he.gray900};
  --aw-brand-600: ${he.brand600};
  --aw-brand-700: ${he.brand700};
  --aw-brand-50: ${he.brand50};
  --aw-emerald-50: ${he.success50};
  --aw-emerald-700: ${he.success700};
  --aw-amber-50: ${he.warning50};
  --aw-amber-900: ${he.warning900};
  --aw-red-50: ${he.error50};
  --aw-red-700: ${he.error700};
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
`.trim()});var w8,v8,Nb,nI,zb,sI=l(()=>{"use strict";Mb();Ba();w8=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,v8=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],Nb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nI=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${w8}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,zb=e=>{let t=v8.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=Nb(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=Nb(e.installBundleVersionLabel?.trim()??"unknown"),s=nI("brand brand-in-sidebar",n),i=nI("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${Nb(e.title)} \xB7 Agent Witch Local</title>
  <style>${Ob}</style>
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
  <script>${ub}</script>
</body>
</html>`}});var Bp,Ya,Gp=l(()=>{"use strict";Bp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ya=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Bp(e.syncMessage)}</p>`:"",o=Bp(e.manageHref),n=Bp(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Bp(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var jb,Db,$b,iI=l(()=>{"use strict";jb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,Db=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,$b=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var aI=l(()=>{"use strict";sI();Gp();iI()});var us,Hb,lI=l(()=>{"use strict";Ba();us=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hb=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${us(e.wakeError)}</div>`:"",a=Ua(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${us(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${us(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${us(o)}</p>
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
        <p class="home-card-meta">${us(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${us(n)}</p>
      </a>
    </div>`}});var cI=l(()=>{"use strict";lI()});var Vp,qp,Kp,dI,Fb=l(()=>{"use strict";Vp="support-reply",qp="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",Kp=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),dI=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Jp,uI,pI=l(()=>{"use strict";Fb();Jp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uI=()=>`<section class="card">
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
      <p>${Jp(qp)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Jp(Kp)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Jp(dI)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Jp(Vp)}">Run this sample</a>
      </div>
    </section>`});var C,ps=l(()=>{"use strict";C=e=>e==="passed"||e==="stopped"||e==="failed"});var mI,Ub,Bo,Bb,Xa=l(()=>{"use strict";mI="Stopped at the round limit. The best prompt is kept.",Ub="Stopped because the score stopped rising. The best prompt is kept.",Bo="Finished. The best prompt is the result.",Bb="Wizard ended. Progress from finished steps is kept."});var Fr,Gb=l(()=>{"use strict";Fr=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var _8,W8,Za,gI,Yp=l(()=>{"use strict";_8=/\n+|;\s+/,W8=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,Za=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(_8).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,W8(s)]},[]);return[...t,...o]},[]),gI=e=>{let t=Za(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ie,ms=l(()=>{"use strict";ie=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Qa,Vb=l(()=>{"use strict";Yp();ms();Qa=e=>{let t=[...e.priorRounds,e.current],r=ie(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:gI(o)}}});var qb,L8,k8,Xp,Kb=l(()=>{"use strict";qb={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},L8=e=>{try{let t=JSON.parse(e.fragment);return{...qb,objects:[...e.objects,t]}}catch{return{...qb,objects:e.objects}}},k8=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:L8(r)},Xp=e=>[...e].reduce(k8,qb).objects});var E8,Jb,C8,fI,Yb=l(()=>{"use strict";Kb();E8=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},Jb=e=>{let t=Xp(e).filter(E8),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},C8=(e,t)=>({...e,passed:e.score>=t}),fI=(e,t)=>{let r=Jb(e);return r===null?null:C8(r,t)}});var Xb,Zb,Zp=l(()=>{"use strict";Xb="The judge reply needs a score and a reason.",Zb="The improver reply was empty."});var hI,yI=l(()=>{"use strict";hI=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var SI,AI=l(()=>{"use strict";SI=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var x8,bI,PI=l(()=>{"use strict";yI();AI();Xa();Yp();x8=e=>{let t=Za(e);return t.length===0?Ub:`${Ub} Avoid: ${t.join("; ")}.`},bI=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:mI};if(hI(e.scores)>=3){let t=e.scores.map((r,o)=>({score:r,reasons:e.reasons?.[o]??""}));return{type:"stopped",errorMessage:x8(SI(t))}}return null}});var Ur,T8,Go,wI,Qp=l(()=>{"use strict";Ur=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},T8=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,Go=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",T8(e.tokens),`Delay: ${Ur(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},wI=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var I8,vI,_I=l(()=>{"use strict";Yb();I8=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,vI=e=>{let r=(I8.exec(e)?.[1]??e).trim();return r.length===0||Jb(r)!==null?null:r}});var WI,em,LI=l(()=>{"use strict";Qp();_I();Zp();WI=e=>({type:"call",role:"judge",choice:e.choice,prompt:wI({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),em=e=>{let t=vI(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:Zb}}:{nextPrompt:t,continuation:WI({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var Qb,kI=l(()=>{"use strict";Gb();Vb();Yb();Zp();Xa();PI();Zp();LI();Qb=e=>{let t=fI(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:Xb}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=bI({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=Qa({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:Fr({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var el,eP=l(()=>{"use strict";el=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var EI=l(()=>{"use strict"});var CI=l(()=>{"use strict"});var O8,RI,xI=l(()=>{"use strict";O8=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},RI=e=>[...e].reduce(O8,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var M8,TI,II=l(()=>{"use strict";M8=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},TI=e=>[...e].reduce(M8,{out:"",inString:!1,escaped:!1}).out});var N8,z8,OI,MI=l(()=>{"use strict";xI();II();N8=e=>e.charCodeAt(0)===65279?e.slice(1):e,z8=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},OI=e=>TI(RI(z8(N8(e))))});var j8,D8,$8,NI,H8,Vo,tl=l(()=>{"use strict";Kb();MI();j8=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},D8=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},$8=e=>[...e].reduce(D8,{out:"",inString:!1,escaped:!1}).out,NI=e=>{let t=Xp(e);return t.length===0?null:t[t.length-1]},H8=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Vo=e=>{let t=OI(j8(e)),r=NI(t);if(r!==null)return r;let o=$8(t),n=NI(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw H8(i)}}});var zI=l(()=>{"use strict";Xa();tl()});var jI=l(()=>{"use strict"});var DI=l(()=>{"use strict";jI()});var qo,$I=l(()=>{"use strict";qo=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var F8,rP,HI=l(()=>{"use strict";Qp();F8=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,rP=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",F8(e.tokens),`Delay: ${Ur(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var U8,B8,G8,oP,FI=l(()=>{"use strict";U8=/[A-Za-z0-9_./~-]{3,180}/g,B8=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,G8=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||B8.test(t)},oP=(e,t=12)=>{let r=[];for(let o of e.matchAll(U8)){let n=o[0].replace(/\.+$/,"");if(!(!G8(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var rl,UI=l(()=>{"use strict";rl=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var tm,nP,BI,ol,sP=l(()=>{"use strict";tm=e=>Math.floor(e/2),nP=e=>Math.max(tm(e)+1,e-20),BI=(e,t)=>e>=t?"passes":e>=nP(t)?"close":e>=tm(t)?"weak":"bad",ol=e=>[{band:"bad",label:`0\u2013${tm(e)-1} bad`},{band:"weak",label:`${tm(e)}\u2013${nP(e)-1} weak`},{band:"close",label:`${nP(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var rm,iP=l(()=>{"use strict";sP();rm=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${BI(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var bt,aP=l(()=>{"use strict";bt=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var GI,VI=l(()=>{"use strict";GI=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var V8,q8,qI,KI=l(()=>{"use strict";ps();iP();aP();VI();V8=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],q8=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",qI=e=>{let t=e.wizard;if(t===void 0)return[];let r=bt(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=V8.map((h,y)=>{let u=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:h,state:u,detail:null}}).filter((h,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=rm(e),d=c.filter(h=>h.id==="round-0"),p=GI(t)&&(!n||a)?c.filter(h=>h.id!=="round-0"):[],g=C(e.status)&&!s,A=g?[{id:"end",label:q8(e),state:"done",detail:e.errorMessage}]:[];if(g&&A.length>0){let h=Math.min(r,i.length),y=i.slice(0,h).map(u=>({...u,state:"done"}));return[...d,...y,...A,...p]}return[...d,...i,...p,...A]}});var K8,lP,JI=l(()=>{"use strict";ps();iP();KI();K8=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",lP=e=>{if(e.wizard!==void 0)return qI(e);let t=rm(e),r=C(e.status)?[{id:"end",label:K8(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var nl,YI=l(()=>{"use strict";nl=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var XI=l(()=>{"use strict";Zt()});var ZI,sl,il,fs,om,cP,QI=l(()=>{"use strict";XI();ZI="/prompt-optimizer/agent",sl=`${Xt}${ZI}`,il=`${Xt}/prompt-optimizer`,fs="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",om=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${fs}`,cP="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var sr=l(()=>{"use strict"});var re,al=l(()=>{"use strict";sr();re=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var dP,eO=l(()=>{"use strict";dP="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var tO,rO=l(()=>{"use strict";tO=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var ll,nO=l(()=>{"use strict";rO();sr();ll=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:tO(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null})});var uP,sO=l(()=>{"use strict";sr();uP=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null})});var pP,iO=l(()=>{"use strict";sr();pP=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var aO,cl,lO=l(()=>{"use strict";aO=["generalize","evaluate","separate","optimize_modules"],cl=(e,t)=>{let r=aO.indexOf(t);if(r===-1)return e;let o=aO.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var nm,mP=l(()=>{"use strict";Yp();nm=e=>{let t=Za(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var dl,cO=l(()=>{"use strict";mP();dl=e=>{let t=nm(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var Y8,X8,Z8,dO,uO=l(()=>{"use strict";Y8=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),X8=/^\{\{[a-zA-Z0-9_-]+\}\}$/,Z8=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(Y8(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},dO=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>X8.test(n)?n:Z8(n,r)).join("")}});var gP,pO=l(()=>{"use strict";uO();gP=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:dO(o.prompt,t)}))}))});var Q8,ul,mO=l(()=>{"use strict";sr();mP();Q8=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),ul=e=>{let t=nm(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=Q8(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var pl,gO=l(()=>{"use strict";eP();pl=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return el({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var ml,hP=l(()=>{"use strict";ms();ml=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ie(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var yP,fO=l(()=>{"use strict";hP();yP=e=>{let t=ml({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Ko,hO=l(()=>{"use strict";Ko=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var e4,t4,oe,sm=l(()=>{"use strict";al();e4=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},t4=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,oe=e=>{let t=re(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:e4(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>t4(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var yO,SO=l(()=>{"use strict";al();sm();yO=e=>{let t=oe(e.wizard),r=re(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var SP,AO=l(()=>{"use strict";SO();SP=e=>{let t=yO({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var r4,o4,AP,bO,PO=l(()=>{"use strict";r4=/^[a-z0-9][a-z0-9-]{0,62}$/,o4=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return r4.test(t)?t:""},AP=e=>e.replace(/\s+/gu," ").trim(),bO=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=o4(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=AP(n.name),a=AP(n.description),c=AP(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var wO,vO,_O=l(()=>{"use strict";wO=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},vO=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var bP,WO=l(()=>{"use strict";tl();PO();_O();bP=(e,t)=>{let r=(()=>{try{return Vo(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(wO(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(vO).filter(a=>a!==null),i=bO({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var PP,LO=l(()=>{"use strict";PP=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var wP,kO=l(()=>{"use strict";wP=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var vP,EO=l(()=>{"use strict";al();sm();vP=e=>{let t=oe(e.wizard),r=re(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var _P,CO=l(()=>{"use strict";_P=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var Pt,n4,WP,RO=l(()=>{"use strict";Pt=m(ci());tl();n4=(0,Pt.isType)({name:Pt.isNonEmptyString,description:Pt.isString,sampleValue:Pt.isString}),WP=e=>{let t=Vo(e);if(!(0,Pt.isType)({templatedPrompt:Pt.isNonEmptyString,variables:(0,Pt.isArrayWithEachItem)(n4)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var ae,s4,i4,LP,xO=l(()=>{"use strict";ae=m(ci());sr();tl();s4=(0,ae.isType)({id:ae.isNonEmptyString,title:ae.isNonEmptyString,prompt:ae.isNonEmptyString,order:ae.isNumber}),i4=(0,ae.isType)({id:ae.isNonEmptyString,title:ae.isNonEmptyString,summary:ae.isString,topology:(0,ae.isOneOf)("chain","parallel"),modules:(0,ae.isArrayWithEachItem)(s4),recommended:ae.isBoolean}),LP=e=>{let t=Vo(e);if(!(0,ae.isType)({options:(0,ae.isArrayWithEachItem)(i4)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var hs,TO=l(()=>{"use strict";hs=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var a4,kP,EP=l(()=>{"use strict";a4=/\{\{([a-zA-Z0-9_-]+)\}\}/g,kP=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(a4,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var wt,vt,IO=l(()=>{"use strict";ms();EP();wt=e=>kP(e.templatedPrompt,e.variables),vt=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ie(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??wt(e.wizard)}});var l4,Jo,OO=l(()=>{"use strict";l4=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Jo=(e,t)=>e.replace(l4,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var c4,Yo,im=l(()=>{"use strict";c4=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Yo=e=>{let t=new Set,r=[];for(let o of e.matchAll(c4)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var gl,MO=l(()=>{"use strict";im();gl=e=>e.variables.length>0||Yo(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var CP,RP=l(()=>{"use strict";sr();CP=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var fl,NO=l(()=>{"use strict";ms();RP();fl=e=>{let t=e.wizard.evaluateSelectedRound??ie(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:CP(r.judgement,e.passScore)}});var hl,zO=l(()=>{"use strict";hl=e=>e.length===1&&e[0].modules.length===1});var xP,jO=l(()=>{"use strict";xP=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var ye,am,yl=l(()=>{"use strict";ye=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),am=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var DO,$O=l(()=>{"use strict";yl();DO=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[ye("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),ye("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[ye("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var HO,FO=l(()=>{"use strict";ps();yl();HO=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!C(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[ye("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),ye("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),ye("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",am(e.writerLabel,e.folder)),ye("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[ye("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var UO,BO=l(()=>{"use strict";yl();UO=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[ye("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),ye("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[ye("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var GO,VO=l(()=>{"use strict";yl();GO=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[ye("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),ye("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",am(e.writerLabel,e.folder)),...r?[ye("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var lm,qO=l(()=>{"use strict";ps();$O();FO();BO();VO();lm=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(C(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return HO(r);case"evaluate":return DO({...r,currentRound:e.currentRound});case"separate":return GO(r);case"optimize_modules":return UO({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Sl,ar,KO=l(()=>{"use strict";Sl=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),ar=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var d4,cm,TP,JO=l(()=>{"use strict";im();d4="wizardParam_",cm=e=>`${d4}${e}`,TP=e=>{let t=Yo(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=cm(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var Xe,YO=l(()=>{"use strict";Xe=["generalize","evaluate","separate","optimize_modules"]});var R=l(()=>{"use strict";ps();Xa();kI();Gb();Qp();eP();EI();CI();zI();DI();$I();HI();FI();Vb();UI();ms();JI();aP();sP();YI();QI();sr();al();eO();nO();sO();iO();lO();cO();pO();mO();gO();hP();fO();hO();sm();AO();WO();LO();kO();EO();CO();RO();xO();TO();IO();EP();OO();im();MO();NO();zO();RP();jO();qO();KO();JO();YO()});var IP,um,u4,ZO,QO=l(()=>{"use strict";IP=m(require("node:fs")),um=m(require("node:path")),u4=e=>um.default.join(um.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),ZO=(e,t)=>{let r=u4(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;IP.default.mkdirSync(um.default.dirname(r),{recursive:!0}),IP.default.appendFileSync(r,o,"utf8")}});var ys,eM,p4,tM,m4,rM,Mt,K,oM,D,Ze=l(()=>{"use strict";ys=m(require("node:fs")),eM=m(require("node:path"));R();QO();p4=e=>e.wizard===void 0?e:{...e,wizard:uP(e.wizard)},tM=new Set,m4=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),rM=(e,t)=>{ys.default.mkdirSync(eM.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;ys.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),ys.default.renameSync(r,e)},Mt=e=>{if(!ys.default.existsSync(e))return[];try{let t=JSON.parse(ys.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(m4).map(p4):[]}catch{return[]}},K=(e,t)=>Mt(e).find(r=>r.id===t)??null,oM=(e,t)=>{tM.add(t);let r=Mt(e).filter(o=>o.id!==t);rM(e,r)},D=(e,t)=>{if(tM.has(t.id))return;let r=Mt(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];rM(e,o),ZO(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var nM,pm,OP,Zo,MP,Qe,Qo,le,He=l(()=>{"use strict";nM=m(require("node:fs")),pm=m(require("node:os")),OP=m(require("node:path"));yt();Zo="~",MP=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Qe=e=>{let t=pm.default.homedir(),r=MP(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Qo=e=>{let t=e.trim().length===0?"~":e.trim(),r=rt(t),o=OP.default.isAbsolute(r)?MP(r):MP(OP.default.resolve(pm.default.homedir(),r));try{if(!nM.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:Qe(o)}},le=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:pm.default.homedir()});var Al=l(()=>{"use strict";gt();Da();uu()});var g4,sM,iM=l(()=>{"use strict";Al();g4=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,sM=e=>{let t=Dn(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(g4)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var f4,h4,aM,mm,lM,y4,nt,cM,dM,uM,Br=l(()=>{"use strict";Al();iM();f4="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",h4="The writer waited on terminal input and did not return a prompt.",aM=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,mm=e=>{let t=e.trim();if(t.length===0||t.length>=500||!aM.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>aM.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},lM=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},y4=e=>mm(e.stdout)??mm(e.stderr)??(lM(e.replyFile)?mm(e.replyFile):null),nt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return f4;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?h4:null},cM=e=>{let t=e.trim();return t.length===0?null:nt(t)!==null?t:mm(t)??(lM(t)?t:null)},dM=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],uM=e=>{let t=e.replyFileText?.trim()??"",r=nt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=y4({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null)return{ok:!1,errorMessage:o};let n=sM([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Dn(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply."}}});var Ss,Nt,bl,pM,gm,S4,mM,gM,fM,NP=l(()=>{"use strict";Ss=m(require("node:fs")),Nt=m(require("node:path")),bl=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},pM=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),gm=(e,t)=>{let r=bl(e);return r.length>0?r:bl(t)},S4=e=>{let t=gm(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${pM(o)}`,...n.length>0?[`description: ${pM(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},mM=e=>`.cursor/skills/${e}/SKILL.md`,gM=(e,t)=>{let r=bl(t);if(r.length===0)return!1;let o=Nt.default.resolve(e),n=Nt.default.resolve(o,".cursor","skills"),s=Nt.default.resolve(o,mM(r));return s.startsWith(`${n}${Nt.default.sep}`)?Ss.default.existsSync(s):!1},fM=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(gm(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Nt.default.resolve(e.workingDirectory);try{if(!Ss.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=S4({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=mM(r.slug),n=Nt.default.resolve(t,".cursor","skills"),s=Nt.default.resolve(t,o);if(!s.startsWith(`${n}${Nt.default.sep}`))return{ok:!1,errorCode:"path"};if(Ss.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Ss.default.mkdirSync(Nt.default.dirname(s),{recursive:!0}),Ss.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var A4,hM,yM,SM=l(()=>{"use strict";R();R();Ze();He();Br();NP();A4=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,hM=e=>{let t=e.get("savedSkill");return t!==null&&A4.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},yM=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=K(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!C(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ie(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||nt(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=fM({workingDirectory:le(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var Gr,Pl=l(()=>{"use strict";R();Gr=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=xP(t);return{...e,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Sl(r.variables)},updatedAt:new Date().toISOString()}}});var Vr,wl=l(()=>{"use strict";Vr=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var T,b4,fm,ne,en,bM,AM,PM,wM,Se=l(()=>{"use strict";T="manual",b4=["claude-cli","codex","cursor","antigravity"],fm={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ne=e=>e===T?"You":e in fm?fm[e]:e,en=e=>b4.filter(t=>e.includes(t)),bM=e=>{let t=en(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},AM=(e,t)=>t===T?T:e.find(r=>r===t)??null,PM=(e,t,r)=>{let o=en(e),n=AM(o,t),s=AM(o,r);return n===null||s===null?null:{judge:n,improver:s}},wM=(e,t,r)=>{let o=en(e);return t===null||t.trim()===""?r!==T?r:o[0]??null:t===T?null:o.find(n=>n===t)??null}});var zP,vM,_M=l(()=>{"use strict";zP={ok:!1,errorMessage:"Stopped.",stopped:!0},vM=(e,t,r)=>{if(t===void 0)return;let o=()=>{e.kill("SIGTERM"),r(zP)};if(t.aborted){o();return}t.addEventListener("abort",o,{once:!0})}});var WM,vl,LM,jP,P4,w4,v4,Fe,As=l(()=>{"use strict";WM=require("node:child_process"),vl=m(require("node:fs")),LM=m(require("node:os")),jP=m(require("node:path"));Al();_M();Br();P4=["claude-cli","codex","cursor","antigravity"],w4=18e4,v4=e=>P4.includes(e),Fe=e=>new Promise(t=>{if(e.signal?.aborted){t(zP);return}if(!v4(e.writerAgent)){t({ok:!1,errorMessage:"The writer did not reply."});return}let r=e.writerAgent,o=xt(r,e.prompt,ue({}));if(o===null){t({ok:!1,errorMessage:"The writer did not reply."});return}if(!vl.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=jP.default.join(vl.default.mkdtempSync(jP.default.join(LM.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),s=dM({writerAgent:r,baseArgs:o.args,replyPath:n}),i=[],a=[],c={settled:!1,timer:void 0},d=(0,WM.spawn)(o.command,[...s],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),p=g=>{c.settled||(c.settled=!0,clearTimeout(c.timer),t(g))};vM(d,e.signal,p),c.timer=setTimeout(()=>{d.kill("SIGTERM"),p({ok:!1,errorMessage:"The writer did not reply."})},e.timeoutMs??w4),d.stdout.on("data",g=>{i.push(Buffer.from(g))}),d.stderr.on("data",g=>{a.push(Buffer.from(g))}),d.on("error",()=>p({ok:!1,errorMessage:"The writer did not reply."})),d.on("close",()=>{let g=vl.default.existsSync(n)?vl.default.readFileSync(n,"utf8"):null;p(uM({writerAgent:r,stdout:Buffer.concat(i).toString("utf8"),stderr:Buffer.concat(a).toString("utf8"),replyFileText:g}))})})});var kM,_4,_l,hm,ym=l(()=>{"use strict";R();Se();kM=e=>e===T?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},_4=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),_l=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=Qb({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:kM(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:rl(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=_4(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i}},hm=(e,t,r=null)=>{let o=em({raw:t,judge:kM(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Sm,DP=l(()=>{"use strict";Sm=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var RM,Am,bm,EM,CM,$P,W4,xM,HP,L4,TM,k4,E4,IM,OM=l(()=>{"use strict";RM=require("node:child_process"),Am=m(require("node:fs")),bm=m(require("node:path"));R();EM=4e3,CM=12e3,$P=(e,t)=>{let r=(0,RM.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},W4=e=>$P(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",xM=e=>{let t=$P(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},HP=(e,t)=>{let r=bm.default.resolve(e,t),o=bm.default.relative(e,r);if(o.startsWith("..")||bm.default.isAbsolute(o)||!Am.default.existsSync(r)||!Am.default.statSync(r).isFile())return null;let n=Am.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>EM?`${n.slice(0,EM)}
\u2026truncated`:n},L4=e=>e.length>CM?`${e.slice(0,CM)}
\u2026truncated`:e,TM=e=>{let t=oP(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,HP(e.workingDirectory,n)])),o=W4(e.workingDirectory);return{git:o,status:o?xM(e.workingDirectory):{},files:r,paths:t}},k4=(e,t)=>{let r=$P(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=HP(e,t);return o===null?`${t} is missing.`:o},E4=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",IM=e=>{let t=e.before.git?xM(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=HP(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>k4(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:E4(e.before.git,e.before.paths.length>0),evidence:L4(i.join(`

`))}}});var BP,U,GP,We,MM,C4,R4,NM,bs,zM,Ps,x4,T4,Wl,FP,UP,I4,jM,O4,M4,N4,DM,z4,$M,HM,j4,D4,FM,UM=l(()=>{"use strict";BP=require("node:child_process"),U=m(require("node:fs")),GP=m(require("node:os")),We=m(require("node:path")),MM=8e6,C4=16e6,R4=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],NM=(e,t)=>{let r=(0,BP.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},bs=(e,t)=>(0,BP.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,zM=e=>{let t=NM(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},Ps=(e,t)=>{let r=We.default.resolve(e,t),o=We.default.relative(e,r);return o.startsWith("..")||We.default.isAbsolute(o)?null:r},x4=(e,t)=>{let r=Ps(e,t);if(r===null||!U.default.existsSync(r))return null;let o=U.default.statSync(r);return!o.isFile()||o.size>MM?null:U.default.readFileSync(r)},T4=(e,t,r)=>{let o=Ps(e,t);o!==null&&(U.default.mkdirSync(We.default.dirname(o),{recursive:!0}),U.default.writeFileSync(o,r))},Wl=(e,t)=>{let r=Ps(e,t);r===null||!U.default.existsSync(r)||U.default.rmSync(r,{recursive:!0,force:!0})},FP=(e,t)=>bs(e,["cat-file","-e",`HEAD:${t}`]),UP=e=>{let t=NM(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},I4=e=>We.default.resolve(e)!==We.default.resolve(GP.default.homedir()),jM=e=>{if(!U.default.existsSync(e))return 0;let t=U.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?U.default.readdirSync(e).reduce((r,o)=>r+jM(We.default.join(e,o)),0):0},O4=(e,t,r)=>{let o=Ps(e,r);if(o===null||!U.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(jM(o)>C4)return{relativePath:r,existed:!0,copyDir:null};let n=We.default.join(t,"cache",r);return U.default.mkdirSync(We.default.dirname(n),{recursive:!0}),U.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},M4=400,N4=32e6,DM=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!U.default.existsSync(s)))for(let i of U.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=We.default.join(s,i),c=U.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>MM)){if(t.length>=M4||r+c.size>N4){o=!1;return}r+=c.size,t.push(We.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},z4=(e,t,r)=>{let o=Ps(e,r);if(o===null||!U.default.existsSync(o))return null;let n=x4(e,r);if(n===null)return"skip";let s=We.default.join(t,"files",r);return U.default.mkdirSync(We.default.dirname(s),{recursive:!0}),U.default.writeFileSync(s,n),s},$M=e=>{let t=U.default.mkdtempSync(We.default.join(GP.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?zM(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:DM(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,z4(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?UP(e.workingDirectory):null,isolateCaches:I4(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:R4.map(i=>O4(e.workingDirectory,t,i))}},HM=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Wl(e.workingDirectory,t);return}T4(e.workingDirectory,t,U.default.readFileSync(r))}},j4=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?HM(e,t):FP(e.workingDirectory,t)?bs(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Wl(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&FP(e.workingDirectory,t)&&bs(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!FP(e.workingDirectory,t)&&bs(e.workingDirectory,["reset","-q","HEAD","--",t])},D4=(e,t)=>{let r=Ps(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Wl(e.workingDirectory,t.relativePath),U.default.mkdirSync(We.default.dirname(r),{recursive:!0}),U.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Wl(e.workingDirectory,t.relativePath);return}if(U.default.existsSync(r))for(let o of U.default.readdirSync(r)){let n=We.default.join(r,o);U.default.statSync(n).mtimeMs>=e.startedMs-1e3&&U.default.rmSync(n,{recursive:!0,force:!0})}}}},FM=e=>{try{if(e.git){if(UP(e.workingDirectory)!==e.head&&(!(e.head===null?bs(e.workingDirectory,["update-ref","-d","HEAD"]):bs(e.workingDirectory,["reset","--hard",e.head]))||UP(e.workingDirectory)!==e.head))throw new Error("head");let r=zM(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))j4(e,o)}else{if(e.complete)for(let t of DM(e.workingDirectory).paths)e.files[t]===void 0&&Wl(e.workingDirectory,t);for(let t of Object.keys(e.files))HM(e,t)}for(let t of e.caches)D4(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{U.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Pm,wm,$4,H4,F4,U4,B4,BM,G4,GM,VM=l(()=>{"use strict";R();ym();DP();OM();UM();Se();He();As();Pm=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),wm=e=>({...e,status:"stopped",errorMessage:Bo,judgePhase:void 0,updatedAt:new Date().toISOString()}),$4=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),H4=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==T?t:e.improverModel!==T?e.improverModel:null}return e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null},F4=async e=>{let t=le(e.cycle),r=TM({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=$M({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?pl({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Ko(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):el({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=await Fe({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal}),a=i.ok?IM({workingDirectory:t,before:r,writerReply:i.text}):null,c=FM(o);return i.ok?!c.ok||a===null?{ok:!1,cycle:Pm(e.cycle,c.ok?"Could not put the folder back after the run.":c.errorMessage)}:{ok:!0,run:{output:i.text.trim(),tokens:i.tokens,delayMs:Date.now()-n,lookedAt:a.lookedAt,evidence:a.evidence}}:i.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:wm(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Pm(e.cycle,i.errorMessage)})},U4=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:F4({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),B4=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),BM=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Fe({writerAgent:e.reviewer,workingDirectory:le(e.cycle),prompt:rP({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:wm(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},G4=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===T)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Fe({writerAgent:t.judgeModel,workingDirectory:le(t),prompt:qo({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{..._l(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?wm(o):(e.onWriterFailure?.(t.judgeModel),Pm(o,n.errorMessage))},GM=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return G4(e);let o=H4(t),n=await U4({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?$4(t,n.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===T){let p=await BM({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...B4(s,p.text),judgePhase:void 0}}let i=await Fe({writerAgent:t.judgeModel,workingDirectory:le(t),prompt:Go({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?wm(s):(e.onWriterFailure?.(t.judgeModel),Pm(s,i.errorMessage));let a=await BM({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=_l(s,i.text,c);return Sm(d,a.text)}});var tn,vm=l(()=>{"use strict";R();tn=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Qa({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:rl(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var _m,V4,q4,VP,qM=l(()=>{"use strict";R();ym();VM();vm();Se();He();As();_m=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),V4=e=>({...e,status:"stopped",errorMessage:Bo,updatedAt:new Date().toISOString()}),q4=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?V4(e):(n?.(r),_m(e,t.errorMessage)),VP=async(e,t,r,o)=>{let n=e.revisions.find(c=>c.roundNumber===e.currentRound);if(n===void 0)return _m(e,"This round has no prompt.");if(e.status==="judging")return GM({cycle:e,revision:n,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return _m(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===T)return e;let s=tn(e);if(s===null)return _m(e,"The improver needs the score and the reason.");let i=await Fe({writerAgent:e.improverModel,workingDirectory:le(e),prompt:Fr({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r}),a=q4(e,i,e.improverModel,r,t);return a!==null?a:hm(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var Ll,qP=l(()=>{"use strict";Ll=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var km,Wm,KM,K4,J4,Lm,JM,YM,Y4,X4,rn,XM,ZM,kl=l(()=>{"use strict";R();Pl();wl();Se();He();As();qM();qP();km=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),Wm=(e,t,r)=>e.wizard===void 0||t===null?km(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},KM=e=>{let t=e.wizard;return t===void 0||Ll(e).length===0?e:{...e,wizard:hs({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},K4=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",J4=e=>{let t=e.wizard;if(t===void 0)return e;let r=ml({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:hs({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Lm=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),JM=e=>e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null,YM=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},Y4=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=JM(e);if(n===null)return km(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??wt(o),i=dl({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:YM(e,"generalize")}),a=await Fe({writerAgent:n,prompt:i,workingDirectory:le(e),signal:t});if(!a.ok)return r?.(n),Wm(e,"generalize",a.errorMessage);try{let c=WP(a.text),d=hs({wizard:{...o,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Sl(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return gl(d)?rn({...p,wizard:{...d,gate:null}}):Lm(p,"generalize")}catch(c){return Wm(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},X4=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=JM(e);if(n===null)return km(e,"Choose a writer to suggest splits.");let s=vt({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=ul({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:YM(e,"separate")}),a=await Fe({writerAgent:n,prompt:i,workingDirectory:le(e),signal:t});if(!a.ok)return r?.(n),Wm(e,"separate",a.errorMessage);try{let c=LP(a.text),d=gP(c,o.variables),p=hs({wizard:{...o,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),g={...e,wizard:p};return hl(d)?Gr(g,d[0]):Lm(g,"separate")}catch(c){return Wm(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},rn=e=>{let t=e.wizard;if(t===void 0)return e;let r=wt(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},XM=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return km(e,"This module is missing.");let n=ar(r),s=Jo(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==T?e.runnerModel:e.judgeModel!==T?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:re(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},ZM=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return VP(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return Y4(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return X4(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await VP(e,t,r,o);if(C(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Ll(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let g=ie(s.revisions.map(A=>({roundNumber:A.roundNumber,promptText:A.promptText,score:A.judgement?.score??0,reasons:A.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:g}}}if(i==="evaluate"&&fl({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let p=KM(Lm(a,i));return Vr(p)}let c=Lm(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=yP({wizard:{...c.wizard,modules:c.wizard.modules.map((g,A)=>A===c.wizard.currentModuleIndex&&g.status==="running"?{...g,status:"paused"}:g)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:K4(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?KM(d):J4(d)}return s}return n.phase==="complete",e}});var ws,Em=l(()=>{"use strict";R();Se();ws=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:PP(r,e.judgeModel===T),updatedAt:new Date().toISOString()}}});var QM,vs,Cm=l(()=>{"use strict";Br();QM=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:cM(e.promptText)},vs=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t===void 0?null:QM(t);if(r!==null)return r.trim();for(let o=e.revisions.length-1;o>=0;o-=1){let n=QM(e.revisions[o]);if(n!==null)return n.trim()}return null}});var zt,_s=l(()=>{"use strict";zt='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var KP,eN,Z4,tN,rN,JP=l(()=>{"use strict";R();Se();He();_s();KP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eN=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',Z4=e=>{let t=eN(e.state),r=`<h2>${KP(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${KP(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${zt}</button></div><template>${r}</template></li>`},tN=e=>{let t=e.wizard;if(t===void 0)return"";let r=lm({status:e.status,wizard:t,writerLabel:ne(e.judgeModel),runnerLabel:ne(e.runnerModel??e.judgeModel),folderDisplay:Qe(le(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(Z4).join("")}</ol>`},rN=e=>{let t=e.wizard;if(t===void 0)return"";let r=lm({status:e.status,wizard:t,writerLabel:ne(e.judgeModel),runnerLabel:ne(e.runnerModel??e.judgeModel),folderDisplay:Qe(le(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${eN(n.state)}<span class="sdlc-pipeline-label">${KP(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var _t,oN,nN,sN,YP=l(()=>{"use strict";R();_t=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oN="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",nN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${_t(oN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${_t(i.name)}}}</strong> \u2014 ${_t(i.description)} (sample: ${_t(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${_t(r)}</pre>`,n=wt(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${_t(n)}</pre>`;return`${t}${o}${s}`},sN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${_t(oN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${_t(n.name)}}}</strong> \u2014 ${_t(n.description)} (sample: ${_t(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${_t(r)}</pre>`;return`${t}${o}`}});var iN,aN=l(()=>{"use strict";R();iN=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=qo({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=Go({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var XP,Rm,ZP=l(()=>{"use strict";_s();aN();XP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Rm=e=>{let t=iN(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${XP(r)}">${zt}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${XP(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${XP(t)}</pre></template>`}});var xm,Ws,QP=l(()=>{"use strict";qP();ZP();xm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ws=e=>{let t=Ll(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${xm(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,p=e.cycle.revisions.map(g=>{let A=g.judgement?.score,h=A==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${A}`,y=g.judgement?.reasons?.trim()??"",u=y.length===0?"":`<br><span class="muted">${xm(y)}</span>`,S=Rm({cycle:e.cycle,roundNumber:g.roundNumber,promptText:g.promptText,run:g.run});if(e.interactive){let b=e.selectedRound===g.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${b}> <span class="sdlc-wizard-revision-title">${xm(h)}</span></label>${S}${u}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${xm(h)}</span>${S}${u}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var ew,lN,cN,dN,tw=l(()=>{"use strict";ew=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lN=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${ew(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${ew(t.prompt)}</pre></li>`).join("")}</ol>`,cN=e=>lN([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),dN=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${ew(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${lN(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var El,Q4,Tm,rw=l(()=>{"use strict";R();tw();El=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Q4=e=>{let t=e.wizard;return t===void 0?"":vt({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},Tm=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=Q4(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${El(n.orchestratorSkill.fileName)}</code> \u2014 ${El(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${El(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=cN(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${El(r)} <span class="muted">${El(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Te,e3,t3,r3,o3,Im,n3,s3,i3,a3,l3,c3,Ls,Om=l(()=>{"use strict";R();JP();YP();QP();ZP();rw();Te=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),e3={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},t3=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Te(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Te(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Te(o)}</pre></details>`;return`<h2>${Te(e)}</h2>${n}`},r3=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=wt(t).trim(),n=vt({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!C(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${t3("What is being evaluated",i)}`},o3=(e,t)=>{let r=e.wizard;if(r===void 0||C(e.status))return"";let o=e3[t];return o===void 0||r.phase!==o?"":rN(e)},Im=(e,t,r)=>{let o=o3(e,t),n=t==="wizard-2"?r3(e):"";return`${o}${n}${r}`},n3=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},s3=e=>{let t=e.wizard;return t===void 0?"":nN(t)},i3=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Te(a)}</span>`,d=Rm({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Te(s)}${i}</span>${d}${c}</li>`}).join("")}</ul>`,a3=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Ws({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=n3(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${i3(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=vt({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Te(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Te(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},l3=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Te(n.title)}</strong> <span class="muted">(${Te(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Te(o.title)}</strong>${n}${Te(s)}${Tm(e,o)}</li>`}).join("")}</ul>`},c3=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Te(i)}</span> <strong>${Te(n.title)}</strong>${Te(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Te(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Ws({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},Ls=(e,t)=>{switch(t){case"wizard-1":return Im(e,t,s3(e));case"wizard-2":return Im(e,t,a3(e));case"wizard-3":return Im(e,t,l3(e));case"wizard-4":return Im(e,t,c3(e));default:return""}}});var d3,u3,uN,pN,mN=l(()=>{"use strict";R();Cm();Br();Om();d3=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},u3=e=>{let t=e.goal.trim();return t.length===0?null:t},uN=(e,t,r,o,n)=>{let s=nt(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},pN=(e,t)=>{let r=u3(e);if(t.id.startsWith("wizard-")){let s=Ls(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=nl(e,t);if(s!==null){let a=vs(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ie(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:uN(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:d3(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:uN(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var on,gN,fN=l(()=>{"use strict";on=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gN=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${on(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${on(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${on(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${on(n)}</h2><pre class="mono">${on(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${on(e.goal)}</dd></div></dl>`;return`<h2>${on(e.title)}</h2>${i}${t}${r}${o}${s}`}});var ow,hN,yN,qr,SN,ks=l(()=>{"use strict";R();Ze();ow=new Map,hN=e=>{let t=new AbortController;return ow.set(e,t),t.signal},yN=e=>{ow.delete(e)},qr=e=>{ow.get(e)?.abort()},SN=(e,t)=>{let r=K(e,t);return r===null||r.wizard!==void 0?!1:(C(r.status)||(D(e,{...r,status:"stopped",errorMessage:Bo,updatedAt:new Date().toISOString()}),qr(t)),!0)}});var p3,m3,nw,g3,f3,h3,AN,bN,sw=l(()=>{"use strict";R();kl();Em();Pl();wl();ks();p3=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),m3=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||C(e.status))return null;let r=bt(t);return r<0||r>3?null:`wizard-${r+1}`},nw=(e,t)=>p3.has(t)?m3(e)===t:!1,g3=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),f3=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ie(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},h3=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=oe(o);return ws({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},AN=(e,t)=>{if(!nw(e,t))return e;qr(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return rn({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return Vr(f3(r));if(t==="wizard-3"){let n=o.splitOptions[0]??g3(o.templatedPrompt);return Gr(r,n)}return t==="wizard-4"?h3(r):e},bN="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var y3,Mm,iw=l(()=>{"use strict";y3='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Mm=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${y3}</button>`});var S3,PN,A3,aw,wN,b3,P3,w3,v3,vN,_N=l(()=>{"use strict";R();vm();S3={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},PN=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},A3=e=>S3[e]??null,aw=(e,t)=>{let r=e.wizard,o=A3(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=bt(r);return o<n||o===n},wN=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},b3=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:wt(t).trim();return o.length===0?null:dl({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:PN(e,"generalize")})},P3=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=tn(e);return n===null?null:Fr({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=wN(e)?.promptText.trim()??vt({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:qo({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},w3=e=>{let t=e.wizard;if(t===void 0)return null;let r=vt({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:ul({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:PN(e,"separate")})},v3=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=ar(t),s=Jo(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=tn(e);return c===null?null:Fr({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=wN(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||C(e.status)&&i?.judgement!==null)?Go({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):pl({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:Ko(t,r).output,moduleTitle:o.title})},vN=(e,t)=>{if(!aw(e,t))return null;switch(t){case"wizard-1":return b3(e);case"wizard-2":return P3(e);case"wizard-3":return w3(e);case"wizard-4":return v3(e);default:return null}}});var _3,Nm,lw=l(()=>{"use strict";R();_3=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},Nm=(e,t)=>{let r=e.wizard,o=_3(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=bt(r);return o<n?"done":o===n&&C(e.status)&&e.status==="failed"?"failed":o<=n&&C(e.status)?"done":"pending"}});var W3,Es,zm=l(()=>{"use strict";_s();_N();lw();W3=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Es=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(Nm(e,t)==="pending")return""}else if(!aw(e,t))return"";let o=vN(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${zt}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${W3(o)}</pre></template>`}});var nn,Cs,Cl=l(()=>{"use strict";nn=e=>e.toLocaleString("en-US"),Cs=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var jt,L3,WN,LN,kN,EN,cw=l(()=>{"use strict";R();mN();fN();sw();iw();_s();Cm();JP();zm();Cl();jt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),L3=(e,t)=>{let r=nl(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?Cs(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${nn(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${jt(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${jt(r)}</span>`:"",d=gN(pN(t,e)),p=t.wizard!==void 0&&t.wizard.phase==="complete"&&C(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${jt(e.id)}"`:"",g=nw(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${jt(bN)}"><input type="hidden" name="cycleId" value="${jt(t.id)}"><input type="hidden" name="wizardStepId" value="${jt(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",A=e.state==="active"&&e.id.startsWith("wizard-")?tN(t):"",h=o?"failed":e.state,y=o?vs(t):null,u=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${zt}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${jt(y)}</pre></template>`:"",S=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?Es(t,e.id):"";return`<li class="sdlc-node sdlc-node-${h}" data-sdlc-step-id="${jt(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${p} data-sdlc-node>${n}<span class="sdlc-node-label">${jt(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${g}${S}${u}</div></div>${A}<template>${d}</template></li>`},WN=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>L3(r,t)).join("")}</ol>`,LN=e=>`<div class="sdlc-score" aria-label="What the score means">${ol(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${jt(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,kN=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${Mm({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,EN=`<script>
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
</script>`});var Kr,CN,k3,RN=l(()=>{"use strict";R();He();Br();NP();Kr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),CN=e=>{if(!C(e.status))return"";let t=ie(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=nt(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Kr(t.reasons.trim())}</p>`,i=n===null?k3({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:le(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${Kr(n)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${o}${s}${i}</section>`},k3=e=>{let t=e.sourceSkill?.fileName??bl(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=gm(t,r),s=n.length>0&&gM(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Kr(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Kr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Kr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Kr(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Kr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Kr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var xN,TN=l(()=>{"use strict";xN=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var IN,E3,jm,Ue,Dm,dw=l(()=>{"use strict";R();R();Se();TN();Cm();Br();IN=["Generalize","Evaluate","Separate","Optimize modules"],E3=e=>{let t=bt(e),r=t>=0&&t<IN.length?IN[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},jm=(e,t)=>{let r=vs(e),o=r===null?null:xN(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},Ue=(e,t)=>({title:e,detail:t,replyPreview:null}),Dm=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:null}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!C(e.status)){let t=e.judgeModel;return Ue(`${ne(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!C(e.status)){let t=e.judgeModel;return Ue(`${ne(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===T?Ue(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?Ue(`${ne(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):Ue(`${ne(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===T){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==T?Ue(`${ne(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):Ue(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return Ue(`${ne(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=re(t);return Ue(`${ne(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return Ue(`${ne(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=re(t);return Ue(`${ne(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return Ue(`${ne(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===T){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return Ue("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return Ue(`${ne(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>nt(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=oe(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||C(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?jm(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o="A writer or judge reply could not be used. Start a new run after fixing the issue.";return r!==void 0?jm(e,{title:E3(r),detail:t.length>0?t:o}):jm(e,{title:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(C(e.status)){let t=e.errorMessage?.trim()??"";return jm(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var Dt,Rl=l(()=>{"use strict";Se();Dt=e=>{if(e.status==="improving"&&e.improverModel===T)return!0;if(e.status!=="judging"||e.judgeModel!==T)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===T}});var ON,MN=l(()=>{"use strict";ON=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Jr,C3,NN,zN=l(()=>{"use strict";R();Jr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),C3=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Jr(r)}</p>`},NN=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Jr(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${Jr(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Jr(a)}.</p>`}<pre class="mono">${Jr(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Ur(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Jr(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",g=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Jr(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${C3(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Jr(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var xl,R3,jN,DN=l(()=>{"use strict";R();Br();xl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),R3=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=nt(t.promptText),n=t.judgement?.reasons?`<p class="muted">${xl(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${xl(i)}.</p>`}<pre class="mono">${xl(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Ur(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${xl(d)}</pre>`:`<div class="alert-error">${xl(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},jN=e=>e.revisions.map(t=>R3(e,t)).join("")});var $N,HN=l(()=>{"use strict";R();$N=e=>{if(C(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var $t,x3,uw,T3,I3,O3,M3,FN,UN,pw=l(()=>{"use strict";HN();$t=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),x3="Stop this run? Writers will stop and the best prompt is kept.",uw="End the wizard? Writers will stop and progress from finished steps is kept.",T3="Skip this module and pause at the step gate?",I3=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${$t(x3)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${$t(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,O3=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${$t(uw)}"><input type="hidden" name="cycleId" value="${$t(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,M3=e=>{let t=$t(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${$t(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${$t(T3)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${$t(uw)}">End wizard</button>
    </form>
  </div>`},FN=e=>{let t=$N(e);return t==="none"?"":t==="classic"?I3(e.id):t==="wizard_end_only"?O3(e.id):M3(e)},UN=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=$t(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${$t(uw)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var BN,GN=l(()=>{"use strict";R();Cl();BN=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=oe(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${nn(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${nn(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${re(r)}`}return""}});var N3,z3,VN,j3,qN,KN=l(()=>{"use strict";R();GN();lw();Om();zm();N3=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',z3=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',VN=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),j3=(e,t,r)=>{let o=Ls(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=BN(e,t),i=Nm(e,t),a=N3(i),c=z3(i),d=Es(e,t,{forOutcomeSummary:!0}),p=`${a}<span class="sdlc-wizard-outcome-step-title">${VN(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${VN(s)}</span>`,g=t==="wizard-4"&&r.phase==="complete"?" open":"",A=i==="failed"&&t!=="wizard-4"?" open":"",h=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${h}"${g}${A}><summary aria-controls="${h}-body">${p}</summary><div class="sdlc-wizard-outcome-step-body" id="${h}-body">${o}</div></details>`},qN=e=>{let t=e.wizard;if(t===void 0||!C(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>j3(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var JN,YN,XN=l(()=>{"use strict";JN=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),YN=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${JN(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${JN(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var mw,ZN,gw=l(()=>{"use strict";mw=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,ZN=(e,t)=>{if(mw(e,t))return"Passed";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var QN,ez=l(()=>{"use strict";QN=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var $m,tz,rz=l(()=>{"use strict";R();gw();gw();ez();$m=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tz=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=oe(t),o=re(t),n=r.terminalStatusSuggestion==="passed"?"":QN(r,o),s=o-10,i=r.rows.map((c,d)=>{let p=t.modules[d],g=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,h=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=p===void 0?c.status:ZN(p,o),u=p!==void 0&&mw(p,o)?'<span aria-label="Passed">\u2713</span>':$m(y);return`<tr${h}><td>${$m(c.title)}</td><td>${$m(g)}</td><td>${c.tokens??"\u2014"}</td><td>${u}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${$m(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var sn,Hm,fw=l(()=>{"use strict";sn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hm=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${sn(r.fileName)}</code> \u2014 ${sn(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${sn(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${sn(i.name)}</strong> <code>.cursor/skills/${sn(i.fileName)}/SKILL.md</code></p><p class="muted">${sn(i.description)}</p><p>${sn(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var D3,oz,nz=l(()=>{"use strict";R();R();XN();rz();fw();D3=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oz=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!C(e.status)||t.modules.length===0)return"";let r=tz(e),o=YN(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=oe(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${D3(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${Hm(e)}${a}${r}${o}</section>`}});var lr,Tl=l(()=>{"use strict";lr=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var cr,Fm,hw=l(()=>{"use strict";R();cw();RN();dw();Rl();MN();vm();zN();DN();pw();KN();nz();Cl();He();Tl();cr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Fm=e=>{let t=!C(e.status)&&e.status!=="wizard_paused"&&!Dt(e),r=Dm(e),o=WN(lP(ON(e)),e),n=C(e.status)?"":FN(e),s=qN(e),i=oz(e),a=CN(e),c=e.errorMessage===null?"":`<div class="alert-error">${cr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?oe(e.wizard):null,A=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,h=!t&&e.wizard!==void 0&&C(e.status)&&(e.wizard.phase==="complete"||oe(e.wizard).passedModuleCount>0),y=h?A?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",u=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${cr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",S=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${cr(r.replyPreview)}</pre>`,b=r.detail.length===0&&u.length===0&&S.length===0||r.detail.length===0&&S.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${cr(r.detail)}${p}</p>`}${S}</div>`,f=e.revisions.find(oo=>oo.roundNumber===e.currentRound),w=e.status==="improving"?tn(e):null,v=Cs(e),_=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),k=Dt(e)?NN({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:w?.promptText??f?.promptText??"",score:w?.score??f?.judgement?.score??null,reasons:w?.reasons??f?.judgement?.reasons??null,avoid:w?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:_?1:0}):"",E=e.wizard!==void 0&&e.wizard.phase==="complete"&&C(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!E&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?re(e.wizard):e.passScore,M=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${LN(I)}</div>`:"",X=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':C(e.status)?e.status==="failed"?'<span class="sdlc-run-badge sdlc-run-badge-failed">Failed</span>':E&&g!==null&&!A?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",G=t?d:h?A?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',F=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${cr(Qe(le(e)))}</li>`:"",v>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${nn(v)} so far</li>`:""].filter(oo=>oo.length>0),ro=F.length===0?"":`<ul class="sdlc-run-meta">${F.join("")}</ul>`,$=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,Pe=E?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,Bt=E?"":M.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${Pe}</div>`:`<div class="sdlc-run-grid">${Pe}${M}</div>`,ti=jN(e),lU=e.wizard!==void 0&&C(e.status)&&e.revisions.every(oo=>oo.roundNumber===0&&(oo.judgement===void 0||oo.judgement===null)),cU=ti.length===0||lU?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${ti}</div></section>`,dU=`<p class="sdlc-run-goal" title="${cr(e.goal.trim())}">${cr(lr(e.goal))}</p>`,uU=E?`${c}${i}${s}${k}${a}`:`${c}${Bt}${k}${s}${a}`,pU='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',mU=E?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${cr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${pU}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${X}</div>${dU}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${G}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${cr(r.title)}</h2>${b}${u}${mU}</div></div>${ro}${$}</header>${uU}</section>${cU}`}});var sz,iz=l(()=>{"use strict";R();wl();sz=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!fl({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:Vr(e)}});var az,lz=l(()=>{"use strict";R();kl();az=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!gl(t)?e:rn({...e,wizard:{...t,gate:null}})}});var cz,dz=l(()=>{"use strict";R();Pl();cz=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!hl(t.splitOptions))return e;let r=t.splitOptions[0];return Gr(e,r)}});var $3,an,Um=l(()=>{"use strict";iz();lz();dz();Ze();$3=e=>{let t=az(e),r=sz(t);return cz(r)},an=(e,t)=>{let r=$3(t);return r!==t?(D(e,r),r):t}});var uz,dr,Il=l(()=>{"use strict";R();uz=e=>Xe.indexOf(e),dr=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||C(e.status)?Xe.length:t.gate!==null?uz(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?uz(t.phase):null}});var pz,mz=l(()=>{"use strict";pz=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var ln,gz,fz=l(()=>{"use strict";R();mz();ln=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gz=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Ko(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${ln(pz(o))}</pre></div>`:"",s=Yo(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=ar(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=cm(c),g=i[c]??"",A=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${ln(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${ln(p)}">${ln(A)}</label>
        ${h}
        <input class="input" type="text" id="${ln(p)}" name="${ln(p)}" value="${ln(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var Ol,hz,yz=l(()=>{"use strict";R();YP();fz();QP();pw();fw();rw();Ol=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hz=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate,n=re(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?sN(r):"",a=o==="evaluate"?Hm(e):"",c=o==="evaluate"?Ws({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",p=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(x=>{let I=x.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',M=x.recommended?' <span class="sdlc-badge">Recommended</span>':"",X=r.selectedSplitOptionId===x.id||r.selectedSplitOptionId===null&&x.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${Ol(x.id)}" required${X}> <strong>${Ol(x.title)}</strong>${I}${M}</label>${Tm(e,x)}</li>`}).join("")}</ul>`:"",g=r.modules[r.currentModuleIndex],h=o==="optimize_modules"&&g?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=g?.title??"Module",u=g?.prompt??"",S=g?.status==="pending",b=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Ol(y)}</p>${S?gz({cycle:e,modulePrompt:u}):""}<p class="muted">Test run prompt preview: ${Ol(Jo(u,ar(r)))}</p>${g?.statistics===null||g?.statistics===void 0?"":`<p class="muted">Module stats: best ${g.statistics.bestScore??"\u2014"} / \u2265${n} (round ${g.statistics.bestRound??"\u2014"}).</p>`}${Ws({cycle:e,interactive:!1,caption:S?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",f=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":S?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",w=_P(r),v=w===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${w}</p>`,_=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",k=t?.active===!0?" sdlc-wizard-gate-active":"",E=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${_}"`:"";return`<section class="card sdlc-wizard-gate${k}"${E}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${f}</p>
    ${v}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Ol(e.id)}">
    ${i}
    ${a}
    ${c}
    ${p}
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
        <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue"${h}>Continue</button>
        <button class="btn btn-secondary" type="submit" name="intent" value="wizard-feedback-rerun" formnovalidate>Rerun with feedback</button>
      </div>
    </form>
    ${UN(e)}
  </section>`}});var H3,Sz,Az=l(()=>{"use strict";R();zm();H3=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Sz=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||C(e.status))return"";let r=(o,n)=>{let s=Es(e,o);return`<h2 class="sdlc-wizard-active-head">${H3(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var bz,Pz,yw,wz,Sw=l(()=>{"use strict";R();Il();ks();bz="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",Pz=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return Xe[r]??null},yw=(e,t)=>{let r=Pz(t);if(r===null||e.wizard===void 0)return!1;let o=Xe.indexOf(r);if(o===-1)return!1;let n=dr(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<Xe.length)},wz=(e,t)=>{let r=Pz(t);if(r===null||e.wizard===void 0||!yw(e,t))return e;qr(e.id);let o=Xe.slice(Xe.indexOf(r)),n=cl(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var Aw,vz,_z=l(()=>{"use strict";Sw();Aw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vz=(e,t)=>yw(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${Aw(bz)}"><input type="hidden" name="cycleId" value="${Aw(e.id)}"><input type="hidden" name="wizardStepId" value="${Aw(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var F3,U3,B3,Wz,Lz=l(()=>{"use strict";R();Il();yz();Az();_z();Om();F3={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},U3=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),B3=(e,t,r)=>{let o=vz(e,t);return`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${U3(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${Ls(e,t)}</div>
</details>`},Wz=e=>{let t=e.wizard;if(t===void 0)return"";let r=dr(e);if(r===null)return"";let o=Xe.slice(0,r).map((i,a)=>B3(e,`wizard-${a+1}`,F3[i])),n=t.gate!==null?hz(e,{active:!0}):Sz(e),s=r>=Xe.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var Bm,bw=l(()=>{"use strict";Lz();tw();R();Bm=e=>{if(e===null||e.wizard!==void 0&&C(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=Wz(e),r=dN(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var G3,Pw,kz=l(()=>{"use strict";R();Se();He();As();G3=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},Pw=async(e,t,r)=>{if(!G3(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===T)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=SP({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Fe({writerAgent:e.judgeModel,prompt:n,workingDirectory:le(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=bP(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var Ml,Gm,Ez,ww,Cz,Rz,xz,Vm,vw=l(()=>{"use strict";Ml=m(require("node:fs")),Gm=m(require("node:path")),Ez=e=>Gm.default.join(Gm.default.dirname(e),"prompt-optimizer-writer-ready.json"),ww=e=>{let t=Ez(e);if(!Ml.default.existsSync(t))return{};try{let r=JSON.parse(Ml.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},Cz=(e,t)=>{Ml.default.mkdirSync(Gm.default.dirname(e),{recursive:!0}),Ml.default.writeFileSync(Ez(e),`${JSON.stringify(t,null,2)}
`)},Rz=(e,t)=>ww(e)[t]?.message??null,xz=(e,t,r)=>{Cz(e,{...ww(e),[t]:{message:r}})},Vm=(e,t)=>{let r=ww(e);r[t]!==void 0&&Cz(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var _w,qm,Km,Tz,Ae,cn=l(()=>{"use strict";R();Al();kl();kz();Rl();ks();vw();Um();Ze();_w=new Set,qm={atMs:0,ids:[]},Km=async()=>{if(Date.now()-qm.atMs<3e4)return qm.ids;let e=await At({commands:ue({})});return qm.atMs=Date.now(),qm.ids=e.installedWriterIds,e.installedWriterIds},Tz=async(e,t,r)=>{let o=K(e,t);if(o===null||r.aborted)return;let n=an(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(C(n.status)&&!s||n.status==="wizard_paused"||Dt(n))return;if(s){let c=await Pw(n,r,d=>{Vm(e,d)});D(e,c);return}let i=await ZM(n,c=>{Vm(e,c)},r,c=>{K(e,t)?.status==="stopped"||r.aborted||D(e,c)});if(!(K(e,t)?.status==="stopped"||r.aborted)){if(D(e,i),C(i.status)){let c=await Pw(i,r,d=>{Vm(e,d)});D(e,c);return}await Tz(e,t,r)}},Ae=(e,t)=>{if(_w.has(t))return;let r=K(e,t);if(r===null)return;let o=an(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(C(o.status)&&!n||o.status==="wizard_paused"||Dt(o))return;_w.add(t);let s=hN(t);Tz(e,t,s).finally(()=>{_w.delete(t),yN(t)})}});var Yr,Nl=l(()=>{"use strict";hw();Um();bw();cn();Yr=(e,t)=>{let r=an(e,t);return Ae(e,r.id),`${Fm(r)}${Bm(r)}`}});var Iz,Oz,Mz=l(()=>{"use strict";Iz=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,Oz=e=>e!==null&&e>0});var Jm,Nz,Ww=l(()=>{"use strict";R();Em();ks();Jm=e=>(qr(e.id),{...ws(e,"stopped"),errorMessage:Bb}),Nz=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;qr(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var V3,zz,jz,Dz=l(()=>{"use strict";R();kl();Em();Pl();wl();Nl();Ze();cn();Mz();Sw();sw();Ww();V3="Pick a revision scored above 0 before continuing to Separate.",zz=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),jz=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=K(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=K(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Yr(e.storePath,d))};if(o==="wizard-stop-all"){let c=Jm(s);return D(e.storePath,c),Ae(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=Nz(s);return D(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=wz(s,c);return D(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=AN(s,c);return D(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&Ae(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",g=pP(s.wizard,d,c);g=cl(g,d),g={...g,pendingStepInstructions:p};let A={...s,status:"judging",errorMessage:null,wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return D(e.storePath,A),Ae(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(A=>A.step==="generalize"),g=(s.errorMessage?.trim().length??0)>0&&!d?zz(s):rn({...s,wizard:{...s.wizard,gate:null}});return D(e.storePath,g),Ae(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=Iz(s,p??-1);if(!Oz(g)){let h={...s,errorMessage:V3,updatedAt:new Date().toISOString()};return D(e.storePath,h),a(n),!0}let A=Vr({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return D(e.storePath,A),Ae(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=zz(s);return D(e.storePath,h),Ae(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(h=>h.id===p);if(g===void 0){let h={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return D(e.storePath,h),a(n),!0}let A=Gr(s,g);return D(e.storePath,A),a(n),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(n),!0;let g=TP({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!g.ok){let u={...s,errorMessage:g.errorMessage,updatedAt:new Date().toISOString()};return D(e.storePath,u),a(n),!0}let A={...s.wizard,parameterValues:g.parameterValues};if(p.status==="pending"){let u=XM({...s,wizard:{...A,gate:null}},d);return D(e.storePath,u),Ae(e.storePath,n),a(n),!0}let h=d+1;if(h>=s.wizard.modules.length){let u=oe(A),S=ws({...s,wizard:A},u.terminalStatusSuggestion);return D(e.storePath,S),Ae(e.storePath,n),a(n),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...A,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return D(e.storePath,y),a(n),!0}}return a(n),!0}});var q3,$z,K3,Lw,J3,Hz,Fz=l(()=>{"use strict";Se();ks();Ww();DP();ym();Rl();Ze();q3="Add a score from 0 to 100 and the reason for it.",$z="Add a score from 1 to 100 and the reason for it.",K3="Write the next prompt.",Lw="This step is not waiting for you.",J3=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},Hz=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=K(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(D(e.storePath,Jm(a)),{kind:"saved",cycleId:i}):SN(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=K(e.storePath,r);if(o===null||!Dt(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:Lw};if(t==="manual-judge"){if(o.judgeModel!==T)return{kind:"invalid",cycle:o,errorMessage:Lw};let i=J3(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?$z:q3};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:$z};let d=o.revisions.find(g=>g.roundNumber===o.currentRound)?.run?.tokenReview??"",p=Sm(_l(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return D(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==T)return{kind:"invalid",cycle:o,errorMessage:Lw};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:K3};let s=hm(o,n);return D(e.storePath,s),{kind:"saved",cycleId:o.id}}});var Uz,Bz=l(()=>{"use strict";Uz=`<script>
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
</script>`});var Gz,Vz=l(()=>{"use strict";Gz=`<script>
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
</script>`});var qz,Kz=l(()=>{"use strict";qz=`<script>
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
  const goalInput = document.querySelector('form.sdlc-form [name="goal"]');
  const promptInput = document.querySelector('form.sdlc-form [name="prompt"]');
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
</script>`});var Jz,Yz=l(()=>{"use strict";R();He();Jz=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:Qe(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(re(t.wizard)),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!C(t.status)}}});var Xz,Zz=l(()=>{"use strict";R();Il();Xz=e=>{if(e.wizard===void 0)return C(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let t=dr(e);if(e.status==="wizard_paused"&&t!==null&&t<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${t+1} of 4`};if(C(e.status)){if(e.wizard.phase==="complete"){let r=oe(e.wizard),o=r.rows.reduce((s,i)=>i.bestScore===null?s:s===null?i.bestScore:Math.min(s,i.bestScore),null),n=o===null?"":` \xB7 lowest ${o}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Wizard \xB7 ${r.passedModuleCount}/${r.totalModules} modules${n}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}}return t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${t+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var Qz,ej=l(()=>{"use strict";Qz=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var ur,Y3,X3,tj,rj=l(()=>{"use strict";Zz();ej();Tl();ur=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Y3=e=>e.wizard===void 0?"classic":"wizard",X3=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${ur(t)}">`,o=Xz(e),n=Qz(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${ur(o.badgeClass)}">${ur(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${ur(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${ur(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${Y3(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${ur(e.id)}">${ur(lr(e.goal))}</a><p class="muted">${ur(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${g}</div></li>`},tj=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(i=>X3(i,t)).join(""),o=Math.min(e.length,20),n=o===e.length?`History \xB7 ${e.length}`:`History \xB7 ${o} of ${e.length}`,s=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2><ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${ur(n)}</summary>${s}</details>`:s}});var kw,Ym,oj,Z3,Q3,Ew,nj,Cw=l(()=>{"use strict";kw=m(require("node:fs")),Ym=m(require("node:path"));He();oj=/^[a-z0-9-]+$/,Z3=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},Q3=(e,t)=>{if(!oj.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let g=Z3(p[2]??"");p[1]==="name"&&g.length>0&&(o=g),p[1]==="description"&&(n=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},Ew=e=>{let t=Qo(e);if(!t.ok)return[];let r=Ym.default.resolve(t.path,".cursor","skills"),o=[];try{o=kw.default.readdirSync(r)}catch{return[]}return o.filter(n=>oj.test(n)).flatMap(n=>{let s=Ym.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${Ym.default.sep}`))return[];try{let i=Q3(kw.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},nj=(e,t)=>Ew(e).find(r=>r.fileName===t)??null});var sj,ij=l(()=>{"use strict";sj={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var zl,eJ,je,Rs=l(()=>{"use strict";ij();_s();zl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eJ=e=>{let t=sj[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${zl(t.title)}" aria-describedby="${r}" aria-expanded="false">${zt}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${zl(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${zl(t.example)}</span></span></button>`},je=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${zl(r)}"`}>${zl(e)}</span>${eJ(t)}</span>`});var aj,tJ,lj,cj,dj=l(()=>{"use strict";Rs();aj=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tJ=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),lj=e=>{if(e.length===0)return`<div class="field">${je("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${aj(r.fileName)}">${aj(r.fileName)}</option>`).join("");return`<div class="field">${je("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${tJ(e)}</script>`},cj=`<script>
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
</script>`});var Ie,uj,pj,rJ,mj,gj,fj,hj=l(()=>{"use strict";R();dw();Se();Tl();Il();Ie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uj=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",pj=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,rJ=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},mj=e=>e===T?"You":ne(e),gj=e=>{let t=rJ(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ne(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Ie(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Ie(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Ie(mj(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Ie(mj(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Ie(r)}</dd></div>
    </dl>
  </details>`},fj=e=>{let t=e.wizard;if(t===void 0)return"";let r=lr(e.goal),o=e.status==="wizard_paused",n=!C(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=Dm(e),g=pj(t),A=g===null?"":uj(g),h=dr(e),y=A.length===0?"":h===null||h>=4?` <strong>${Ie(A)}</strong>`:` <strong>${Ie(A)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Ie(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Ie(p.title)}${y}</p>
    <p class="muted">${Ie(p.detail)}</p>
    <div class="actions">
      ${gj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ie(e.id)}">Open this run</a>
    </div>
  </section>`}let s=pj(t),i=s===null?"Wizard":uj(s),a=dr(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ie(r)}</h2>
    <p class="lede">Paused at <strong>${Ie(i)}</strong>${Ie(c)} (last updated ${Ie(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${gj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ie(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var jl,yj,Sj=l(()=>{"use strict";Rs();jl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yj=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${jl(n.id)}"${n.id===e.runner?" selected":""}>${jl(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${jl(e.runner)}">Checking ${jl(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${je("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${je("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${jl(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var Aj,bj=l(()=>{"use strict";Aj=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var xs,Pj,wj,vj,_j,Wj=l(()=>{"use strict";Rs();xs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Pj=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${xs(c.id)}"${c.id===r?" selected":""}>${xs(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${xs(n)}</option>`;return`<div class="field">${je(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},wj=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${xs(t)}">Checking ${xs(o)}\u2026</p>`},vj=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${je(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${xs(r)}</textarea><span class="muted">${o}</span></div></details>`,_j=e=>{let t=`<div class="sdlc-writer">${Pj("judge","Judge",e.judge,e.writers,"I'll score it")}${wj("judge",e.judge,e.writers)}${vj("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${Pj("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${wj("improver",e.improver,e.writers)}${vj("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var Dl,oJ,nJ,Rw,Lj=l(()=>{"use strict";R();Rs();Dl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oJ=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},nJ=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,Rw=e=>{let t=oJ(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=ol(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${je(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${Dl(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${Dl(e.inputId)}" class="sdlc-pass-range" type="range" name="${Dl(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${Dl(a)}"><span class="sdlc-pass-mark" style="left:${nJ(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${Dl(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var iJ,pr,kj,Ej=l(()=>{"use strict";Rl();hw();Bz();Vz();cw();Kz();Yz();rj();Cw();dj();Rs();bw();hj();Tl();Sj();bj();Wj();R();Lj();iJ=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,pr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kj=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${pr(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${pr(e.skillNotice??"")}</div>`,o=`${kN}${EN}`,n=e.resumableWizardCycle??null,s=n===null?"":fj(n),i=Bm(e.cycle),a=e.cycle===null?"":Fm(e.cycle),c=e.cycle!==null&&Dt(e.cycle),d=Jz(e),p=iJ(d.goal,d.prompt,e.canRun),g=_j({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),A=yj({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=`${Rw({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${Rw({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=dP,u=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",S=e.cycle!==null&&C(e.cycle.status),b=d.running&&!S,f=S||b?"":" open",w=b?" sdlc-compose-run-focus":"",_=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${S?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,k=S?(()=>{let F=e.cycle!==null?lr(e.cycle.goal):lr(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${pr(F)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${_}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${_}</summary>`,E=S?" sdlc-compose-viewing-finished":"",x=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",I=c?"waiting":d.running?"running":"idle",M=d.running&&!c?' aria-busy="true"':"",X=`<section class="card sdlc-compose${E}${w}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${f}>
        ${k}
        <div class="sdlc-compose-details-body">
      <p class="lede">${y} ${pr(e.modelNote)}</p>
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
            ${je("Folder","folder")}
            <input class="input" type="text" name="folder" value="${pr(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${lj(Ew(d.folder))}
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
            ${je("Goal","goal")}
            <textarea class="input textarea" name="goal" rows="4" required>${pr(d.goal)}</textarea>
          </div>
          <div class="field">
            ${je("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${pr(d.prompt)}</textarea>
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
          ${g}
        </div>
        ${A}
        ${Aj()}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${pr(d.passScore)}; Step 4 pass \u2265 ${pr(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
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
    </section>`,G=`${""}${Uz}${Gz}${qz}${cj}`;return`${t}${r}${X}${s}${a}${i}${o}${tj(e.history,e.cycle?.id??null)}${G}`}});var $l,xw=l(()=>{"use strict";Ej();$l=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:kj(t)}))}});var Cj,Rj=l(()=>{"use strict";Fz();Nl();xw();Ze();cn();Cj=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:Hz({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=K(e.storePath,o.cycleId);return Ae(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(Yr(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await $l(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:Mt(e.storePath),resumableWizardCycle:null}),!0)}});var xj,Xm,Tw=l(()=>{"use strict";xj=m(require("node:os"));R();Xm=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??xj.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var Tj,Ts,Iw,Ij,Oj,Hl=l(()=>{"use strict";R();Se();Fb();Tj=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Ts=e=>{let t=bM(e),r=en(e).map(s=>({id:s,label:fm[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},Iw=(e,t,r)=>t===T||t!==null&&e.writers.some(o=>o.id===t)?t:r,Ij=(e,t,r,o=null)=>({judge:Iw(e,t,e.judge),improver:Iw(e,r,e.improver),runner:Iw(e,o,e.runner)}),Oj=e=>e===Vp?{goal:qp,prompt:Kp}:{goal:"",prompt:""}});var Zm,Mj=l(()=>{"use strict";Zm=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var Nj,Qm,Ow=l(()=>{"use strict";R();Se();He();Hl();Mj();Nj=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=Zm(o);return n.ok?String(n.passScore):String(r)},Qm=e=>{let t=Ij(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=Nj(e.posted,"passScore",70),o=Nj(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=(f,w)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:f,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:w,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a});if(e.posted===null)return d(e.defaultFolder??Zo,null);let p=e.posted.get("folder")??Zo;if(e.posted.get("intent")==="choose-folder"){let f=e.pickFolder();return d(f===null?p:Qe(f),null)}if((e.posted.get("intent")??"")!=="run")return d(p,null);let A=Tj(e.goal,e.prompt);if(A!==null)return d(p,A);let h=Zm(e.posted.get("passScore")??r);if(!h.ok)return d(p,h.errorMessage);let y=Zm(e.posted.get("modulePassScore")??o);if(!y.ok)return d(p,y.errorMessage);let u=PM(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(u===null)return d(p,"Choose a judge and an improver.");let S=Qo(p);if(!S.ok)return d(p,S.errorMessage);let b=wM(e.installedIds,c,u.judge);return b===null?d(p,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:u.judge,improver:u.improver,workingDirectory:S.path,passScore:h.passScore,modulePassScore:y.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:b,runnerInstructions:a}}});var Is,tg,aJ,Mw,zj,eg,jj,lJ,Dj,Nw,cJ,dJ,uJ,zw,$j,Hj,Fj=l(()=>{"use strict";Is=m(require("node:fs")),tg=m(require("node:path"));Se();He();aJ=["remember","choose-folder","run"],Mw=()=>({folder:Zo,judge:"",improver:"",runner:""}),zj=e=>tg.default.join(tg.default.dirname(e),"prompt-optimizer-preferences.json"),eg=e=>typeof e=="string"?e:"",jj=e=>{let t=zj(e);if(!Is.default.existsSync(t))return Mw();try{let r=JSON.parse(Is.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return Mw();let o=r,n=eg(o.folder).trim();return{folder:n.length===0?Zo:n,judge:eg(o.judge),improver:eg(o.improver),runner:eg(o.runner)}}catch{return Mw()}},lJ=(e,t)=>{let r=zj(e);Is.default.mkdirSync(tg.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;Is.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),Is.default.renameSync(o,r)},Dj=(e,t)=>e===T||en(t).some(r=>r===e),Nw=(e,t,r)=>e===null?t:e.length===0?"":Dj(e,r)?e:t,cJ=(e,t)=>{if(e===null)return t;let r=Qo(e);return r.ok?r.display:t},dJ=e=>{let t=jj(e.storePath),r={folder:cJ(e.folder,t.folder),judge:Nw(e.judge,t.judge,e.installedIds),improver:Nw(e.improver,t.improver,e.installedIds),runner:Nw(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||lJ(e.storePath,r)},uJ=e=>{let t=Qo(e);return t.ok?t.display:Zo},zw=(e,t)=>Dj(e,t)?e:"",$j=e=>{let t=jj(e.storePath);return{selection:{...e.selection,judge:zw(t.judge,e.installedIds)||e.selection.judge,improver:zw(t.improver,e.installedIds)||e.selection.improver,runner:zw(t.runner,e.installedIds)||e.selection.runner},defaultFolder:uJ(t.folder)}},Hj=e=>{let t=e.posted.get("intent")??"";if(!aJ.includes(t))return;let r=e.posted.get("folder");dJ({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var Uj,pJ,mJ,jw,gJ,rg,og=l(()=>{"use strict";Uj=m(require("node:os"));Se();vw();As();pJ="Reply with the single word ok. Do not use tools.",mJ=45e3,jw=async(e,t)=>{if(t===T)return{ok:!0,message:"You will do this step."};let r=Rz(e,t);if(r!==null)return{ok:!0,message:r};let o=await Fe({writerAgent:t,prompt:pJ,workingDirectory:Uj.default.tmpdir(),timeoutMs:mJ});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ne(t)} is ready.`;return xz(e,t,n),{ok:!0,message:n}},gJ=e=>[...new Set(e.filter(t=>t.length>0))],rg=async(e,t,r,o)=>{for(let n of gJ([t,r,o??""])){let s=await jw(e,n);if(!s.ok)return s.message}return null}});var Dw,Bj=l(()=>{"use strict";R();Dw=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!C(r.status)&&!(t!==null&&r.id===t))return r;return null}});var Gj,Vj=l(()=>{"use strict";yt();R();Nl();Tw();Ow();xw();Ze();He();Fj();Cw();og();Bj();Um();cn();Gj=async e=>{let t=e.posted===null?$j({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=Qm({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Dr("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(Hj({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Qe(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await rg(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await $l(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Qe(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:Mt(e.route.storePath),resumableWizardCycle:Dw(Mt(e.route.storePath),null)});return}if(r.kind==="start"){let s=nj(r.workingDirectory,r.sourceSkillFile),i=Xm({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,wizard:wP({...ll(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(D(e.route.storePath,i),Ae(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(Yr(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:K(e.route.storePath,e.cycleId);n!==null&&(n=an(e.route.storePath,n),Ae(e.route.storePath,n.id)),await $l(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:Mt(e.route.storePath),resumableWizardCycle:Dw(Mt(e.route.storePath),n?.id??null)})}});var qj,Kj=l(()=>{"use strict";Ze();qj=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";oM(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var Jj,Yj=l(()=>{"use strict";Jj=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var Xj,Zj=l(()=>{"use strict";SM();Dz();Rj();Vj();Kj();Hl();Yj();cn();Xj=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await Km(),o=Ts(r),n=e.method==="POST"?Jj(e.request.headers["content-type"],await e.readBody(e.request)):null;if(jz({posted:n,storePath:e.storePath,response:e.response})||await Cj(e,n,o))return;let s=Oj(t.searchParams.get("example")),i=qj({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=yM({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await Gj({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:hM(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var fJ,Qj,eD=l(()=>{"use strict";R();Ze();fJ=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",Qj=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=K(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!C(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=vP({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${fJ(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var tD,rD=l(()=>{"use strict";Nl();Ze();tD=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:K(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":Yr(e.storePath,o)),!0}});var hJ,oD,nD=l(()=>{"use strict";Se();og();hJ=["claude-cli","codex","cursor","antigravity"],oD=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===T||hJ.includes(t)?await jw(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var sD,iD=l(()=>{"use strict";R();sD=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:sl,page:il,context:fs,installedWriters:e,post:{method:"POST",url:sl,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${sl}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var $w,aD=l(()=>{"use strict";R();Cl();$w=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ie(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null}))),o=C(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:o,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:Cs(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:fs,page:`${il}?cycle=${encodeURIComponent(e.id)}`}}});var Oe,yJ,lD,cD,dD=l(()=>{"use strict";Oe=m(ci());R();yJ=(0,Oe.isType)({goal:Oe.isString,prompt:Oe.isString,workingDirectory:Oe.isString,judge:(0,Oe.isUndefinedOr)(Oe.isString),improver:(0,Oe.isUndefinedOr)(Oe.isString),passScore:(0,Oe.isUndefinedOr)(Oe.isNumber),maxRounds:(0,Oe.isUndefinedOr)(Oe.isNumber)}),lD=e=>{let t=e?.trim()??"";return t.length===0?null:t},cD=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return yJ(t)?t.workingDirectory.trim().length===0?{ok:!1,error:om}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:lD(t.judge),improver:lD(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:om}}});var SJ,uD,pD=l(()=>{"use strict";R();Se();Ow();Hl();SJ=e=>e.map(t=>t.id).join(", "),uD=e=>{let t=Ts(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===T||n===T)return{ok:!1,error:cP,installedWriters:t.writers};if(o===null||n===null){let a=SJ(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o}),i=Qm({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var mD,gD=l(()=>{"use strict";R();Tw();iD();aD();Hl();dD();pD();Ze();mD=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=K(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:$w(c)}}let r=await e.handlers.readInstalledIds(),o=Ts(r);if(e.method==="GET")return{status:200,body:sD(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let n=cD(e.rawBody);if(!n.ok)return{status:400,body:{ok:!1,error:n.error,installedWriters:o.writers}};let s=uD({body:n.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver,s.runner);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:o.writers}};let a=Xm({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds,wizard:ll(s.prompt),runnerModel:s.runner});return D(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:$w(a)}}});var fD,hD=l(()=>{"use strict";cn();og();gD();fD=async e=>{let t=await mD({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:Km,readWritersReady:rg,startCycle:Ae}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var AJ,Hw,yD=l(()=>{"use strict";pI();Zj();eD();rD();nD();hD();AJ=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},Hw=async e=>{let t=AJ(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await fD(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:uI()})),!0):(await oD({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||Qj({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||tD({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await Xj(e),!0)}});var SD=l(()=>{"use strict";yD()});var dn,Fl,bJ,PJ,wJ,vJ,AD,bD=l(()=>{"use strict";dn=m(require("node:fs")),Fl=m(require("node:path")),bJ="prompt-optimizer-cycles.json",PJ="prompt-optimizer-preferences.json",wJ="prompt-sdlc-cycles.json",vJ="prompt-sdlc-preferences.json",AD=e=>{let t=Fl.default.join(e,bJ),r=Fl.default.join(e,wJ);if(dn.default.existsSync(t)||!dn.default.existsSync(r))return t;try{dn.default.renameSync(r,t)}catch{return r}let o=Fl.default.join(e,vJ),n=Fl.default.join(e,PJ);if(dn.default.existsSync(o)&&!dn.default.existsSync(n))try{dn.default.renameSync(o,n)}catch{}return t}});var Os,_J,Fw,PD=l(()=>{"use strict";Os=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_J=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],Fw=e=>{let t=_J.map(i=>`<option value="${Os(i.value)}">${Os(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Os(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Os(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Os(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Os(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Ul,_D,WJ,WD,LJ,kJ,LD,sg,wD,vD,EJ,CJ,mr,Bl,ng,RJ,ig,Uw,xJ,Bw,kD,Gw,ED,TJ,IJ,OJ,CD,RD,xD,Gl=l(()=>{"use strict";Ul=m(require("node:fs")),_D=m(require("node:path")),WJ="estimate-history.ndjson",WD=100,LJ=500,kJ=2e4,LD=e=>_D.default.join(e,WJ),sg=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,LJ),wD=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,kJ),vD=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,EJ=e=>({...e,estimateTokens:vD(e.estimateTokens),actualTokens:vD(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),CJ=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},mr=e=>{let t=LD(e);return Ul.default.existsSync(t)?Ul.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return CJ(n)?[EJ(n)]:[]}catch{return[]}}):[]},Bl=(e,t)=>{Ul.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Ul.default.writeFileSync(LD(e),r,"utf8")},ng=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),RJ=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${ng(o.task)} | ${ng(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},ig=e=>{let t=mr(e.reportsDir),r=sg(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Bl(e.reportsDir,[...s,n])},Uw=e=>{let t=mr(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?sg(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Bl(e.reportsDir,[...i,s])},xJ=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-WD),Bw=e=>[...mr(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),kD=e=>{let t=mr(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=wD(e.input),n=wD(e.output),s=sg(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Bl(e.reportsDir,[...c,a])},Gw=(e,t)=>{let r=mr(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},ED=e=>({table:RJ(xJ(mr(e))),embedding:null}),TJ=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},IJ=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-WD),OJ=e=>{let t=TJ(IJ(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${ng(s.task)} | ${ng(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},CD=e=>{let t=mr(e.reportsDir),r=sg(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Bl(e.reportsDir,[...s,n])},RD=e=>{let t=mr(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Bl(e.reportsDir,[...s,n])},xD=e=>OJ(mr(e))});var TD=l(()=>{"use strict";Gl()});var gr,Vw,MJ,qw,NJ,zJ,ag,lg,jJ,Kw,ID=l(()=>{"use strict";TD();iw();gr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Vw=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},MJ=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${Vw(-r)} under`:`${Vw(r)} over`},qw=e=>e.toLocaleString("en-US"),NJ=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${qw(-r)} under`:`${qw(r)} over`},zJ=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},ag=e=>e===null?"\u2014":Vw(e),lg=e=>e===null?"\u2014":qw(e),jJ=`(function () {
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
})();`,Kw=e=>{let r=Bw(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":MJ(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":NJ(n.estimateTokens,n.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${gr(zJ(i))}</button></td>
        <td>${gr(c)}</td>
        <td>${ag(n.estimateSeconds)}</td>
        <td>${ag(n.actualSeconds)}</td>
        <td>${gr(d)}</td>
        <td>${lg(n.estimateTokens)}</td>
        <td>${lg(n.actualTokens)}</td>
        <td>${gr(p)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${gr(c)}</p>
        <h2>Input</h2>
        <pre>${gr(i)}</pre>
        <h2>Output</h2>
        <pre>${gr(a)}</pre>
        <p>Time: estimated ${ag(n.estimateSeconds)} \xB7 actual ${ag(n.actualSeconds)} \xB7 ${gr(d)}</p>
        <p>Tokens: estimated ${lg(n.estimateTokens)} \xB7 actual ${lg(n.actualTokens)} \xB7 ${gr(p)}</p>
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
            ${Mm({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${jJ}</script>`}
    </section>`}});var OD=l(()=>{"use strict";PD();ID()});var Ms,DJ,$J,Jw,MD=l(()=>{"use strict";Ms=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),DJ=(e,t,r)=>{let o=Ms(t),n=Ms(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},$J=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${Ms(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>DJ(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${Ms(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${Ms(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${Ms(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},Jw=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map($J).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var ND=l(()=>{"use strict";MD()});var Vl,zD,jD,Yw,Xw,Zw,DD=l(()=>{"use strict";Vl=m(require("node:fs")),zD=m(require("node:path"));Ga();$p();jD=(e,t,r)=>ls({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,Yw=(e,t,r)=>{let o=jD(e,t,r);if(o===null)return[];if(!Vl.default.existsSync(o))return[];let n=Vl.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},Xw=e=>{let t=jD(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:nr(e.entry.prompt),output:nr(e.entry.output)};Vl.default.mkdirSync(zD.default.dirname(t),{recursive:!0}),Vl.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},Zw=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var HJ,FJ,ql,cg,Qw=l(()=>{"use strict";HJ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),FJ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,ql=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=HJ(i.assistantOutput),d=c.length>0?`Assistant: ${FJ(c,t)}`:null,p=[a,d].filter(g=>g!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},cg=e=>{let t=e.userMessage.trim(),r=ql({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Ht,Kl,rv,UJ,BJ,ev,GJ,ov,dg,$D,HD,VJ,Ns,nv,tv,FD,qJ,UD,zs,ug,Jl,KJ,Yl,sv,pg,mg,BD=l(()=>{"use strict";Ht=m(require("node:fs")),Kl=m(require("node:path")),rv=require("node:crypto");Qw();UJ="writer-sessions",BJ="active-index.json",ev=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GJ=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ov=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},dg=e=>{let t=Kl.default.join(e.installDir,UJ);return Ht.default.mkdirSync(t,{recursive:!0}),t},$D=e=>Kl.default.join(dg(e),BJ),HD=(e,t)=>Kl.default.join(dg(e),`${t}.canonical.json`),VJ=(e,t)=>Kl.default.join(dg(e),`${t}.continuation.json`),Ns=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,nv=e=>{let t=$D(e);if(!Ht.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Ht.default.readFileSync(t,"utf8"));if(!ev(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!ev(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!GJ(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},tv=(e,t)=>{Ht.default.writeFileSync($D(e),JSON.stringify(t,null,2))},FD=(e,t)=>{Ht.default.writeFileSync(HD(e,t.sessionId),JSON.stringify(t,null,2))},qJ=(e,t)=>{Ht.default.writeFileSync(VJ(e,t.sessionId),JSON.stringify(t,null,2))},UD=(e,t)=>{let r=ql({turns:t.turns});qJ(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},zs=(e,t)=>{let r=HD(e,t);if(!Ht.default.existsSync(r))return null;try{let o=JSON.parse(Ht.default.readFileSync(r,"utf8"));return!ev(o)||typeof o.sessionId!="string"?null:o}catch{return null}},ug=(e,t=20)=>{let r=dg(e),o=Ht.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=zs(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Jl=(e,t,r)=>{let o=ov(r);return nv(e).entries.find(i=>Ns(i)===Ns({writerAgent:t,projectFolderPath:o}))?.sessionId??null},KJ=(e,t,r,o)=>{let n=nv(e),s=Ns({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>Ns(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];tv(e,{entries:i})},Yl=(e,t,r)=>{let o=(0,rv.randomUUID)(),n=new Date().toISOString(),s=ov(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return FD(e,i),UD(e,i),KJ(e,t,s,o),o},sv=(e,t,r)=>{let o=Jl(e,t,r);return o!==null?o:Yl(e,t,r)},pg=(e,t,r)=>{let o=ov(r),n=nv(e);if(o===null&&r===void 0){tv(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=Ns({writerAgent:t,projectFolderPath:o});tv(e,{entries:n.entries.filter(i=>Ns(i)!==s)})},mg=e=>{let t=sv(e.layout,e.writerAgent,e.projectFolderPath),r=zs(e.layout,t);if(r===null)return;let o={id:(0,rv.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};FD(e.layout,n),UD(e.layout,n)}});var JJ,YJ,gg,iv,GD=l(()=>{"use strict";JJ=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",YJ=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},gg=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",iv=e=>{let t=gg(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=JJ(r,e.userPromptCharacterCount),n=YJ({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var fg=l(()=>{"use strict";DD();BD();Qw();GD()});var VD=l(()=>{"use strict";dy()});var Be,ZJ,QJ,av,lv,cv,qD=l(()=>{"use strict";pe();VD();Be=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ZJ=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},QJ=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=Pu(o);return`value="${Be(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${Be(r)}"`},av=(e,t,r,o,n)=>{let s=jy[t];return`<label class="field">
          <span class="field-label">${Be(o)} API key \u2014 ${Be(ZJ(e,t))} \xB7 <a class="field-link" href="${Be(s.href)}" target="_blank" rel="noopener noreferrer">${Be(s.label)}</a></span>
          <input class="input mono" type="password" name="${Be(r)}" autocomplete="off" ${QJ(e,t,n)} />
        </label>`},lv=(e,t,r,o)=>{let n=uy(e[t]?.model),s=new Set(mu[t].map(c=>c.value)),i=mu[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${Be(c.value)}"${d}>${Be(c.label)}</option>`}).join(""),a=n!==Wo&&!s.has(n)?`<option value="${Be(n)}" selected>${Be(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${Be(o)}</span>
          <select class="input mono" name="${Be(r)}">${i}${a}</select>
        </label>`},cv=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Be(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${av(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${lv(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${av(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${lv(e.secrets,"openai","openaiModel","OpenAI model")}
        ${av(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${lv(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var KD=l(()=>{"use strict";qD()});var hg,JD,YD=l(()=>{"use strict";hg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),JD=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${hg(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Console</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Console \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${hg(s.name)}</strong> <span class="muted mono">(${hg(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${hg(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) from Agent Witch Live. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var e6,XD,ZD,QD=l(()=>{"use strict";e6=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,XD=e=>e.kind==="folder",ZD=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&XD(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(XD(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(e6)};return r(t)}});var e$,dv,t$=l(()=>{"use strict";e$=m(require("node:path")),dv=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${dv(r.children,t)}</ul>
            </details>
          </li>`;let o=e$.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var r$,Xr,t6,r6,Xl,o6,uv,o$=l(()=>{"use strict";Gp();r$=m(require("node:path"));YD();QD();t$();Xr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),t6=()=>`(() => {
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

})();`,r6=()=>`(() => {
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
})();`,Xl=e=>{let t=Ya({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Console",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=JD({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${Xr(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Xr(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':o6(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
        <p class="muted">Advanced: pull rules from an existing folder on disk (does not replace installing from Agent Witch Live).</p>
        <div class="actions">
          <a class="btn btn-secondary" href="/harness?import=1">Import from folder\u2026</a>
        </div>
      </section>`:"",d=a?"":`<section class="card">
      <p class="eyebrow">Advanced</p>
      <h1>Import from disk</h1>
      <p class="lede">Scan a folder for existing <code>.cursor</code> rules and copy them into the profile harness on this Mac. Prefer installing playbooks from Agent Witch Live when possible.</p>
      <div class="stack">
        <label class="field">
          <span class="field-label">Scan folder (required)</span>
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Xr(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Xr(s)}" />
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
    <script>${t6()}</script>
    <script>${r6()}</script>`;return`${t}${r}${o}${c}${d}`},o6=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=ZD(a.items.map(A=>({...A,relativePath:typeof A.relativePath=="string"&&A.relativePath.length>0?A.relativePath:r$.default.relative(a.sourceRoot,A.sourcePath).replaceAll("\\","/")}))),p=dv(d,Xr),g=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Xr(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Xr(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${g} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Xr(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},uv=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??p??a,A=t.sets[i];if(A===void 0)continue;let h=a.length>0?a:A.proposedSlug,y=g.length>0?g:A.proposedName,u=r.has(i),S=A.items.map(b=>({id:b.id,kind:b.kind,title:b.title,sourcePath:b.sourcePath,include:u}));s.push({slug:h,name:y,items:S})}return s}});var n$=l(()=>{"use strict";o$()});var n6,pv,s$=l(()=>{"use strict";jr();n6=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},pv=n6});var s6,i$,a$=l(()=>{"use strict";jr();s6=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},i$=s6});var l$=l(()=>{"use strict"});var Zl,i6,mv,c$=l(()=>{"use strict";Gp();Zl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),i6=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,mv=e=>{let t=e.flashError?`<div class="alert-error">${Zl(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Zl(e.flashMessage)}</div>`:"",r=Ya({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Console",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Console, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Zl(i6(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Zl(n.name)}</strong>
                  <span class="muted mono">${Zl(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Console for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var d$=l(()=>{"use strict";l$();GS();c$()});var yg,u$=l(()=>{"use strict";yg=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var p$,fr,gv=l(()=>{"use strict";p$=m(require("node:path"));Zt();Et();V();pe();tt();fr=e=>{let t=H()?.layout.installDir??L();if(p$.default.basename(t)===lo)return Yt;let r=H(),o=r!==null?Re(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):Yt}});var fv,m$=l(()=>{"use strict";tt();gv();fv=async e=>{let t=Ce(e.installDir),r=t?.bundleVersion??null,o=fr(t);try{let n=await Nn(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Ao(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var hv,g$=l(()=>{"use strict";hv=e=>!e});var yv,js,Sv=l(()=>{"use strict";V();yv=()=>`http://127.0.0.1:${dh()}/update/run`,js=async e=>{try{let t=await fetch(yv(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var a6,f$,Av,h$=l(()=>{"use strict";V();te();Sv();a6=()=>{Kt({launchAgentLabel:se(),installDir:L()})},f$=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Av=async()=>{a6();let e=await js({force:!0});if(e.ok)return{ok:!0,message:f$(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:f$(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(tt(),wE)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var bv=l(()=>{"use strict";Mb();u$();gv();m$();g$();h$();Sv()});var y$,S$=l(()=>{"use strict";y$=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var A$,b$,Pv,wv,P$=l(()=>{"use strict";A$=require("node:crypto"),b$=m(require("node:fs"));yt();pe();pe();S$();Pv=!1,wv=async e=>{if(Pv)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!y$(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=H();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&b$.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,A$.randomUUID)();Pv=!0;try{if(await NS(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Un({...r,workspace:n},e.writerAgent,t);return await ya(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Pv=!1}}});var w$=l(()=>{"use strict";P$()});var st,l6,v$,_$,vv,_v,Wv,Lv,kv,Ev,Cv=l(()=>{"use strict";st=require("node:crypto"),l6=Buffer.from("302a300506032b6570032100","hex"),v$=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},_$=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,st.createPublicKey)({key:Buffer.concat([l6,t]),format:"der",type:"spki"})},vv=()=>{let{publicKey:e,privateKey:t}=(0,st.generateKeyPairSync)("ed25519");return{publicKeyRaw:v$(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},_v=e=>(0,st.createPrivateKey)(e),Wv=(e,t)=>(0,st.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),Lv=(e,t,r)=>{try{let o=_$(e);return(0,st.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},kv=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,Ev=()=>(0,st.randomBytes)(32).toString("base64url")});var hr,Sg,W$,c6,d6,Ag,Rv,xv,L$=l(()=>{"use strict";hr=m(require("node:fs")),Sg=m(require("node:path"));Cv();V();Et();W$=e=>Sg.default.join(e.installDir,Lr),c6=(e,t)=>{if(e.profileEmail===null||t===W$(e)||hr.default.existsSync(t))return;let r=W$(e);hr.default.existsSync(r)&&(hr.default.mkdirSync(Sg.default.dirname(t),{recursive:!0}),hr.default.renameSync(r,t))},d6=e=>{if(!hr.default.existsSync(e))return null;try{let t=hr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Ag=e=>{let t=Hd(e);c6(e,t);let r=d6(t);if(r!==null)return r;let o=vv();return hr.default.mkdirSync(Sg.default.dirname(t),{recursive:!0}),hr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},Rv=e=>{let t=Ag(e.layout),r=Ev(),o=kv({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=_v(t.privateKeyPem),s=Wv(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},xv=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return Lv(e.serverPublicKey,t,e.serverAttestation)}});var Tv=l(()=>{"use strict";L$();Cv()});var R$,Ql,Mv,Nv,k$,u6,Iv,bg,ce,x$,p6,Ov,m6,g6,zv,me,Le,yr,f6,E$,C$,ec,tc,T$=l(()=>{"use strict";R$=m(require("node:http")),Ql=m(require("node:fs")),Mv=m(require("node:path"));Pg();Fa();wT();_T();RT();Qn();lb();Tb();aI();cI();SD();bD();OD();ND();fg();KD();n$();xo();yt();jr();s$();a$();d$();bv();tt();w$();pe();Tv();Nv=e=>YA(e)??"never",k$=48e3,u6=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,Iv=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Ju(),reveal:t.reveal,installed:zr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),bg=async e=>{let t=H();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Console to load projects."}:Jn(t,e)},ce=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),x$=200,p6=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',Ov=e=>{let t=e.trim().slice(0,x$),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},m6=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ce(t)}</div>`,g6=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ce(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',zv={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},me=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...zv}),e.end(JSON.stringify(r))},Le=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},yr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},f6=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=p6(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${ce(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=hv(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Ua(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${ce(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ce(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ce(Nv(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ce(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},E$=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},C$=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,x$)},ec=e=>{let t=Mv.default.join(e.layout.installDir,"link-code.txt"),r=()=>Ce(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:yg(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let y=h.installVersion??r(),u=await i(),S=Db(u),b=h.updateFlash??null,f=$b(b),w=m6(b,h.updateError??null);return zb({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:fr(y),installBundleVersionLabel:yg(y),prependBody:`${f}${w}${S}`,headerUpdateButtonHtml:jb(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await fv(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:Ov("An update is already running.")}),h.end();return}c=!0;try{let u=await Av(),S=u.ok?"/?update=ok":Ov(u.message);h.writeHead(303,{Location:S}),h.end()}catch(u){let S=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:Ov(S)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",S=o(),b=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:S.installVersion,body:`<section class="card">
      <h1>${ce(y)}</h1>
      <p>${ce(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(b)},g=()=>{if(Ql.default.existsSync(t))return Ql.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return Ql.default.writeFileSync(t,h,"utf8"),h},A=R$.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",S=h.method??"GET";if(S==="OPTIONS"){y.writeHead(204,zv),y.end();return}if(!await Hw({method:S,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:AD(Mv.default.dirname(e.layout.configPath)),readBody:yr,sendHtml:Le,renderShell:n})){if(S==="GET"&&u==="/health"){let b=e.controllers.getStatus(),f=o();me(y,200,{ok:!0,...b,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/status"){let b=o();me(y,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/traffic"){me(y,200,{entries:$a(e.layout)});return}if(S==="DELETE"&&u==="/api/traffic"||S==="POST"&&u==="/api/traffic/clear"){if(QA(e.layout),S==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}me(y,200,{ok:!0});return}if(S==="GET"&&u==="/api/trace"){me(y,200,{entries:Np(e.layout)});return}if(S==="DELETE"&&u==="/api/trace"||S==="POST"&&u==="/api/trace/clear"){if(rb(e.layout),S==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}me(y,200,{ok:!0});return}if(S==="POST"&&u==="/api/errors/clear"){ob(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(S==="GET"&&u==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let w=await ds({layout:e.layout,query:f,limit:20});me(y,200,{chunks:w,query:f});return}me(y,200,{chunks:cs(e.layout).slice(-50).reverse()});return}if(S==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(S==="GET"&&u==="/api/update-status"){let b=await i();me(y,200,{ok:!0,...b});return}if((S==="GET"||S==="POST")&&u==="/api/update"){await d(y);return}if(S==="GET"&&u==="/"){let b=e.controllers.getStatus(),f=o(),w=zr(e.layout),v=zp(e.layout.errorLogPath);Le(y,await n({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:E$(h.url??void 0),updateError:C$(h.url??void 0),body:Hb({wsConnected:b.wsConnected,lastHeartbeatAt:b.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:cs(e.layout).length,trafficEntryCount:$a(e.layout).length,wakeError:b.wakeError,errorLogByteSize:v.byteSize,errorLogExists:v.exists})}));return}if(S==="GET"&&u==="/task"){let b=e.controllers.getStatus(),f=o(),w=H(),v=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=v.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,k=v.searchParams.get("failed")==="1"?v.searchParams.get("error")?.trim()??"Task failed.":null,E=v.searchParams.get("runId");Le(y,await n({title:"Task",activePath:"/task",installVersion:f.installVersion,body:Fw({defaultWorkspace:w?.workspace??"",wsConnected:b.wsConnected,flashMessage:_,flashError:k,lastRunId:E})}));return}if(S==="POST"&&u==="/task/dispatch"){let b=await yr(h),f=new URLSearchParams(b),w=f.get("prompt")?.trim()??"",v=f.get("writerAgent")?.trim()??"claude-cli",_=f.get("projectFolder")?.trim()??"",k=await wv({prompt:w,writerAgent:v,..._.length>0?{projectFolderPath:_}:{}}),E=new URLSearchParams;k.ok?E.set("ok","1"):(E.set("failed","1"),k.errorMessage!==void 0&&E.set("error",k.errorMessage.slice(0,240))),k.agentRunId!==void 0&&E.set("runId",k.agentRunId),y.writeHead(303,{Location:`/task?${E.toString()}`}),y.end();return}if(S==="GET"&&u==="/writer-sessions"){let b=o(),f=ug(e.layout,12);Le(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:b.installVersion,updateFlash:E$(h.url??void 0),updateError:C$(h.url??void 0),body:Jw({sessions:f})}));return}if(S==="GET"&&u==="/errors"){let b=o(),f=zp(e.layout.errorLogPath);Le(y,await n({title:"Errors",activePath:"/errors",installVersion:b.installVersion,body:sb({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(S==="GET"&&u==="/status"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),w=ve(e.layout),v=w!==null?ze(w,12e4):cb(f.lastHeartbeatAt,12e4),_=db({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:v}),k=o();Le(y,await n({title:"Status",activePath:"/status",installVersion:k.installVersion,body:`${f6({status:f,healthBadge:_,revived:b.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:k.installBundleVersion,installBundleUpdatedAt:k.installBundleUpdatedAt})}${mb({installDir:e.layout.installDir})}${pb({entries:Np(e.layout)})}`}));return}if(S==="GET"&&u==="/traffic"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=$a(e.layout),w=o(),v=f.map(E=>`<tr><td title="${ce(E.at)}">${ce(Nv(E.at))}</td><td>${ce(E.direction)}</td><td><code>${ce(E.type)}</code></td><td>${ce(E.summary)}</td><td>${ce(E.action??"")}</td></tr>`).join(""),_=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${v}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',k=b.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Le(y,await n({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${k}
              ${_}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(S==="GET"&&u==="/projects"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=fr(f.installVersion),v=await bg(e.layout),_=b.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":null,k=H(),E=k===null?null:Z({wsUrl:k.wsUrl,pairingToken:k.pairingToken}),x=E===null?{}:Object.fromEntries((await Promise.all(v.projects.map(async I=>{let M=await pv(E,I.id);return[I.id,M?.counts??null]}))).filter(I=>I[1]!==null));Le(y,await n({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:mv({projects:v.projects,compositionCountsByProjectId:x,cloudAppOrigin:w,syncMessage:v.message,syncOk:v.ok,flashMessage:null,flashError:_})}));return}if(S==="GET"&&u==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=H(),v=w===null?null:Z({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),_=f.length>0&&v!==null?Dr():null;if(_===null||v===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Je({projectFolderPath:_}),!await Pa(v,f,_)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(S==="GET"&&u==="/project"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=b.searchParams.get("id")?.trim()??"",w=o(),v=await bg(e.layout),_=Mo(v.projects,f);if(_===null){await p(y,"Project not found");return}let k=b.searchParams.get("linked")==="1"?b.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${b.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${b.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:b.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,E=b.searchParams.get("knowledgePromoted"),x=E!==null?`Marked ${E} lesson(s) as promoted in Agent Witch.`:null,I=b.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,M=b.searchParams.get("tab")?.trim()??"harness",X=M==="workflows"||M==="agents"||M==="knowledge"?M:"harness",G=H(),F=G===null?null:Z({wsUrl:G.wsUrl,pairingToken:G.pairingToken}),ro=F===null?null:await pv(F,_.id),$=0;if(F!==null)try{let Pe=await fetch(`${F.appOrigin}/api/agent-witch/projects/${encodeURIComponent(_.id)}/knowledge`,{method:"GET",headers:{[$e]:F.pairingToken},signal:AbortSignal.timeout(1e4)});if(Pe.ok){let Bt=await Pe.json();typeof Bt=="object"&&Bt!==null&&typeof Bt.candidateCount=="number"&&($=Bt.candidateCount)}}catch{$=0}Le(y,await n({title:_.name,activePath:"/projects",installVersion:w.installVersion,body:Yn({project:_,installed:zr(e.layout),linkedSetSlugs:Mr(_.projectFolderPath),composition:ro,knowledgeCandidateCount:$,activeTab:X,flashMessage:k??x,flashError:I})}));return}if(S==="POST"&&u==="/projects/pull-bound-harness"){let b=await yr(h),f=await VS({rawBody:b,layout:e.layout});if(f.kind==="not_found"){await p(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let w=o();Le(y,await n({title:f.title,activePath:"/projects",installVersion:w.installVersion,body:f.body}));return}if(S==="POST"&&u==="/projects/link-harness"){let b=await yr(h),f=new URLSearchParams(b),w=f.get("projectId")?.trim()??"",v=await bg(e.layout),_=Mo(v.projects,w);if(_===null){await p(y,"Project not found");return}let k=f.getAll("applySet").map(G=>String(G)),E=la({layout:e.layout,projectFolderPath:_.projectFolderPath,setSlugs:k});if(!E.ok){let G=o();Le(y,await n({title:_.name,activePath:"/projects",installVersion:G.installVersion,body:Yn({project:_,installed:zr(e.layout),linkedSetSlugs:Mr(_.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:E.errorMessage})}));return}let x=H(),I=x===null?null:Z({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),M=I===null?!1:await Aa(I,_.id,E.appliedSetSlugs),X=new URLSearchParams({linked:"1",files:String(E.writtenFileCount),bindingsSynced:M?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(_.id)}&${X.toString()}`}),y.end();return}if(S==="POST"&&u==="/project/knowledge/promote-all"){let b=await yr(h),w=new URLSearchParams(b).get("projectId")?.trim()??"",v=await bg(e.layout),_=Mo(v.projects,w);if(_===null){await p(y,"Project not found");return}let k=H(),E=k===null?null:Z({wsUrl:k.wsUrl,pairingToken:k.pairingToken}),x=E===null?{ok:!1,promotedCount:0}:await i$(E,_.id),I=new URLSearchParams({tab:"knowledge",...x.ok?{knowledgePromoted:String(x.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(_.id)}&${I.toString()}`}),y.end();return}if(S==="GET"&&u==="/harness"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=pa(e.layout),v=b.searchParams.get("submitted")==="1",_=v?b.searchParams.get("syncFailed")==="1"?`Local harness updated (${b.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:b.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${b.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":b.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:b.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,k=w?.scanRoots[0]??Ju(),E=u6(e.layout,{reveal:w,importQuery:b.searchParams.get("import")==="1",justSubmitted:v}),x=fr(f.installVersion);Le(y,await n({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:Xl(Iv(e.layout,{cloudAppOrigin:x,reveal:w,scanFolder:k,flashMessage:_,importSectionExpanded:E}))}));return}if(S==="POST"&&u==="/api/harness/pick-folder"){let b=Dr();if(b===null){me(y,200,{cancelled:!0});return}me(y,200,{path:b});return}if(S==="GET"&&u==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=aa(f);if(w===null){me(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let v=Ql.default.readFileSync(w,"utf8"),_=v.length>k$?`${v.slice(0,k$)}
\u2026 (truncated)`:v;me(y,200,{content:_})}catch{me(y,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&u==="/api/harness/reveal/add-project"){let b=await yr(h),f="";try{let _=JSON.parse(b);typeof _=="object"&&_!==null&&typeof _.projectPath=="string"&&(f=_.projectPath.trim())}catch{me(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){me(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=pa(e.layout),v=LS({reveal:w,projectPath:f});if(v===null||v.sets.length===0){me(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Qu(e.layout,v),me(y,200,{ok:!0,setCount:v.sets.length});return}if(S==="GET"&&u==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){me(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;h.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...zv});let v=kS({scanRoot:f,response:y,shouldAbort:()=>w});Qu(e.layout,v),y.end();return}if(S==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&u==="/harness/submit"){let b=pa(e.layout);if(b===null){let x=o(),I=fr(x.installVersion);Le(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Xl(Iv(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await yr(h),w=new URLSearchParams(f),v=uv(w,b),_=CS({layout:e.layout,sets:v});if(!_.ok){let x=o(),I=fr(x.installVersion);Le(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Xl(Iv(e.layout,{cloudAppOrigin:I,reveal:b,flashError:_.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}xS(e.layout);let E=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${_.writtenItemCount??0}${E}`}),y.end();return}if(S==="GET"&&u==="/writer-api"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),w=H()?.writerExecutionBackend??xe(void 0),v=we(e.layout.configPath),_=xr(v),k=b.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,E=o();Le(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:E.installVersion,body:cv({writerExecutionBackend:w,secrets:_,flashMessage:k})}));return}if(S==="POST"&&u==="/writer-api"){let b=await yr(h),f=new URLSearchParams(b),w=f.get("writerExecutionBackend")?.trim()??"cli";zy({configPath:e.layout.configPath,writerExecutionBackend:xe(w),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(S==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(S==="GET"&&u==="/history"){let b=o();Le(y,await n({title:"History",activePath:"/history",installVersion:b.installVersion,body:Kw({reportsDir:e.layout.reportsDir})}));return}if(S==="GET"&&u==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=o(),v=bb({layout:e.layout}),_=vb(v),k=f.length>0?await ds({layout:e.layout,query:f,limit:20}):cs(e.layout).slice(-50).reverse(),E=k.map(I=>{let M=wb(v,I.id),X=M>0?` \xB7 used in ${M} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ce(I.createdAt)}">${ce(Nv(I.createdAt))}${I.source?` \xB7 ${ce(I.source)}`:""}${X}</div><pre>${ce(I.text)}</pre></article>`}).join(""),x=_.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${_.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${ce(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Le(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ce(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${x}${E}${g6(f,k.length)}`}));return}S==="POST"&&await yr(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return A.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),A.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Xt}`)}),A},tc=e=>Ag(e).publicKeyRaw});var Pg=l(()=>{"use strict";iT();aT();T$()});var O$={};Lt(O$,{runAgentWitchExternalLiveCli:()=>y6});var jv,I$,h6,y6,M$=l(()=>{"use strict";jv=m(require("node:fs")),I$=m(require("node:path"));Qn();V();te();Pg();te();h6=e=>{let t=I$.default.join(e,"link-code.txt");if(!jv.default.existsSync(t))return null;let r=jv.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},y6=()=>{Ve("agent-witch-live");let e=L(),t=N(),r=h6(e),o=tc(t);ec({layout:t,controllers:{getStatus:()=>{let n=ve(t);return{wsConnected:Ra(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{go(e)}}})}});var Sr=W((CCe,j$)=>{"use strict";var N$=["nodebuffer","arraybuffer","fragments"],z$=typeof Blob<"u";z$&&N$.push("blob");j$.exports={BINARY_TYPES:N$,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:z$,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var rc=W((RCe,wg)=>{"use strict";var{EMPTY_BUFFER:S6}=Sr(),Dv=Buffer[Symbol.species];function A6(e,t){if(e.length===0)return S6;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new Dv(r.buffer,r.byteOffset,o):r}function D$(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function $$(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function b6(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function $v(e){if($v.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Dv(e):ArrayBuffer.isView(e)?t=new Dv(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),$v.readOnly=!1),t}wg.exports={concat:A6,mask:D$,toArrayBuffer:b6,toBuffer:$v,unmask:$$};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");wg.exports.mask=function(t,r,o,n,s){s<48?D$(t,r,o,n,s):e.mask(t,r,o,n,s)},wg.exports.unmask=function(t,r){t.length<32?$$(t,r):e.unmask(t,r)}}catch{}});var U$=W((xCe,F$)=>{"use strict";var H$=Symbol("kDone"),Hv=Symbol("kRun"),Fv=class{constructor(t){this[H$]=()=>{this.pending--,this[Hv]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Hv]()}[Hv](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[H$])}}};F$.exports=Fv});var Hs=W((TCe,q$)=>{"use strict";var oc=require("zlib"),B$=rc(),P6=U$(),{kStatusCode:G$}=Sr(),w6=Buffer[Symbol.species],v6=Buffer.from([0,0,255,255]),_g=Symbol("permessage-deflate"),Ar=Symbol("total-length"),Ds=Symbol("callback"),Zr=Symbol("buffers"),$s=Symbol("error"),vg,Uv=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!vg){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;vg=new P6(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Ds];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!n.client_max_window_bits));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){vg.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){vg.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?oc.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=oc.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[_g]=this,this._inflate[Ar]=0,this._inflate[Zr]=[],this._inflate.on("error",W6),this._inflate.on("data",V$)}this._inflate[Ds]=o,this._inflate.write(t),r&&this._inflate.write(v6),this._inflate.flush(()=>{let s=this._inflate[$s];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=B$.concat(this._inflate[Zr],this._inflate[Ar]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Ar]=0,this._inflate[Zr]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?oc.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=oc.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Ar]=0,this._deflate[Zr]=[],this._deflate.on("data",_6)}this._deflate[Ds]=o,this._deflate.write(t),this._deflate.flush(oc.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=B$.concat(this._deflate[Zr],this._deflate[Ar]);r&&(s=new w6(s.buffer,s.byteOffset,s.length-4)),this._deflate[Ds]=null,this._deflate[Ar]=0,this._deflate[Zr]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};q$.exports=Uv;function _6(e){this[Zr].push(e),this[Ar]+=e.length}function V$(e){if(this[Ar]+=e.length,this[_g]._maxPayload<1||this[Ar]<=this[_g]._maxPayload){this[Zr].push(e);return}this[$s]=new RangeError("Max payload size exceeded"),this[$s].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[$s][G$]=1009,this.removeListener("data",V$),this.reset()}function W6(e){if(this[_g]._inflate=null,this[$s]){this[Ds](this[$s]);return}e[G$]=1007,this[Ds](e)}});var Fs=W((ICe,Wg)=>{"use strict";var{isUtf8:K$}=require("buffer"),{hasBlob:L6}=Sr(),k6=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function E6(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Bv(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function C6(e){return L6&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Wg.exports={isBlob:C6,isValidStatusCode:E6,isValidUTF8:Bv,tokenChars:k6};if(K$)Wg.exports.isValidUTF8=function(e){return e.length<24?Bv(e):K$(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Wg.exports.isValidUTF8=function(t){return t.length<32?Bv(t):e(t)}}catch{}});var Jv=W((OCe,tH)=>{"use strict";var{Writable:R6}=require("stream"),J$=Hs(),{BINARY_TYPES:x6,EMPTY_BUFFER:Y$,kStatusCode:T6,kWebSocket:I6}=Sr(),{concat:Gv,toArrayBuffer:O6,unmask:M6}=rc(),{isValidStatusCode:N6,isValidUTF8:X$}=Fs(),Lg=Buffer[Symbol.species],it=0,Z$=1,Q$=2,eH=3,Vv=4,qv=5,kg=6,Kv=class extends R6{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||x6[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[I6]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=it}_write(t,r,o){if(this._opcode===8&&this._state==it)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new Lg(o.buffer,o.byteOffset+t,o.length-t),new Lg(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new Lg(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case it:this.getInfo(t);break;case Z$:this.getPayloadLength16(t);break;case Q$:this.getPayloadLength64(t);break;case eH:this.getMask();break;case Vv:this.getData(t);break;case qv:case kg:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[J$.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=Z$:this._payloadLength===127?this._state=Q$:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=eH:this._state=Vv}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=Vv}getData(t){let r=Y$;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&M6(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=qv,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[J$.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===it&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=it;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=Gv(o,r):this._binaryType==="arraybuffer"?n=O6(Gv(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=it):(this._state=kg,setImmediate(()=>{this.emit("message",n,!0),this._state=it,this.startLoop(t)}))}else{let n=Gv(o,r);if(!this._skipUTF8Validation&&!X$(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===qv||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=it):(this._state=kg,setImmediate(()=>{this.emit("message",n,!1),this._state=it,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,Y$),this.end();else{let o=t.readUInt16BE(0);if(!N6(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new Lg(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!X$(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=it;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=it):(this._state=kg,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=it,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[T6]=n,i}};tH.exports=Kv});var Zv=W((NCe,nH)=>{"use strict";var{Duplex:MCe}=require("stream"),{randomFillSync:z6}=require("crypto"),{types:{isUint8Array:j6}}=require("util"),rH=Hs(),{EMPTY_BUFFER:D6,kWebSocket:$6,NOOP:H6}=Sr(),{isBlob:Us,isValidStatusCode:F6}=Fs(),{mask:oH,toBuffer:un}=rc(),at=Symbol("kByteLength"),U6=Buffer.alloc(4),Eg=8*1024,pn,Bs=Eg,Wt=0,B6=1,G6=2,Yv=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Wt,this.onerror=H6,this[$6]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||U6,r.generateMask?r.generateMask(o):(Bs===Eg&&(pn===void 0&&(pn=Buffer.alloc(Eg)),z6(pn,0,Eg),Bs=0),o[0]=pn[Bs++],o[1]=pn[Bs++],o[2]=pn[Bs++],o[3]=pn[Bs++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[at]!==void 0?a=r[at]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(oH(t,o,d,s,a),[d]):(oH(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=D6;else{if(typeof t!="number"||!F6(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(j6(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[at]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Wt?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Us(t)?(n=t.size,s=!1):(t=un(t),n=t.length,s=un.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[at]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Us(t)?this._state!==Wt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Wt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Us(t)?(n=t.size,s=!1):(t=un(t),n=t.length,s=un.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[at]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Us(t)?this._state!==Wt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Wt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[rH.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Us(t)?(a=t.size,c=!1):(t=un(t),a=t.length,c=un.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[at]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Us(t)?this._state!==Wt?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Wt?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[at],this._state=G6,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(Xv,this,a,n);return}this._bufferedBytes-=o[at];let i=un(s);r?this.dispatch(i,r,o,n):(this._state=Wt,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(V6,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[rH.extensionName];this._bufferedBytes+=o[at],this._state=B6,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");Xv(this,c,n);return}this._bufferedBytes-=o[at],this._state=Wt,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Wt&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][at],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][at],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};nH.exports=Yv;function Xv(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function V6(e,t,r){Xv(e,t,r),e.onerror(t)}});var mH=W((zCe,pH)=>{"use strict";var{kForOnEventAttribute:nc,kListener:Qv}=Sr(),sH=Symbol("kCode"),iH=Symbol("kData"),aH=Symbol("kError"),lH=Symbol("kMessage"),cH=Symbol("kReason"),Gs=Symbol("kTarget"),dH=Symbol("kType"),uH=Symbol("kWasClean"),br=class{constructor(t){this[Gs]=null,this[dH]=t}get target(){return this[Gs]}get type(){return this[dH]}};Object.defineProperty(br.prototype,"target",{enumerable:!0});Object.defineProperty(br.prototype,"type",{enumerable:!0});var mn=class extends br{constructor(t,r={}){super(t),this[sH]=r.code===void 0?0:r.code,this[cH]=r.reason===void 0?"":r.reason,this[uH]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[sH]}get reason(){return this[cH]}get wasClean(){return this[uH]}};Object.defineProperty(mn.prototype,"code",{enumerable:!0});Object.defineProperty(mn.prototype,"reason",{enumerable:!0});Object.defineProperty(mn.prototype,"wasClean",{enumerable:!0});var Vs=class extends br{constructor(t,r={}){super(t),this[aH]=r.error===void 0?null:r.error,this[lH]=r.message===void 0?"":r.message}get error(){return this[aH]}get message(){return this[lH]}};Object.defineProperty(Vs.prototype,"error",{enumerable:!0});Object.defineProperty(Vs.prototype,"message",{enumerable:!0});var sc=class extends br{constructor(t,r={}){super(t),this[iH]=r.data===void 0?null:r.data}get data(){return this[iH]}};Object.defineProperty(sc.prototype,"data",{enumerable:!0});var q6={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[nc]&&n[Qv]===t&&!n[nc])return;let o;if(e==="message")o=function(s,i){let a=new sc("message",{data:i?s:s.toString()});a[Gs]=this,Cg(t,this,a)};else if(e==="close")o=function(s,i){let a=new mn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Gs]=this,Cg(t,this,a)};else if(e==="error")o=function(s){let i=new Vs("error",{error:s,message:s.message});i[Gs]=this,Cg(t,this,i)};else if(e==="open")o=function(){let s=new br("open");s[Gs]=this,Cg(t,this,s)};else return;o[nc]=!!r[nc],o[Qv]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[Qv]===t&&!r[nc]){this.removeListener(e,r);break}}};pH.exports={CloseEvent:mn,ErrorEvent:Vs,Event:br,EventTarget:q6,MessageEvent:sc};function Cg(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Rg=W((jCe,gH)=>{"use strict";var{tokenChars:ic}=Fs();function Ft(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function K6(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(p===-1&&ic[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);d===44?(Ft(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(p===-1&&ic[d]===1)c===-1&&(c=g);else if(d===32||d===9)p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g),Ft(r,e.slice(c,p),!0),d===44&&(Ft(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,g),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(n){if(ic[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:o||(o=!0),n=!1}else if(s)if(ic[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,p=g;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(p===-1&&ic[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))p===-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);o&&(h=h.replace(/\\/g,""),o=!1),Ft(r,a,h),d===44&&(Ft(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=g);let A=e.slice(c,p);return i===void 0?Ft(t,A,r):(a===void 0?Ft(r,A,!0):o?Ft(r,a,A.replace(/\\/g,"")):Ft(r,a,A),Ft(t,i,r)),t}function J6(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}gH.exports={format:J6,parse:K6}});var Og=W((HCe,LH)=>{"use strict";var Y6=require("events"),X6=require("https"),Z6=require("http"),yH=require("net"),Q6=require("tls"),{randomBytes:e7,createHash:t7}=require("crypto"),{Duplex:DCe,Readable:$Ce}=require("stream"),{URL:e_}=require("url"),Qr=Hs(),r7=Jv(),o7=Zv(),{isBlob:n7}=Fs(),{BINARY_TYPES:fH,CLOSE_TIMEOUT:s7,EMPTY_BUFFER:xg,GUID:i7,kForOnEventAttribute:t_,kListener:a7,kStatusCode:l7,kWebSocket:be,NOOP:SH}=Sr(),{EventTarget:{addEventListener:c7,removeEventListener:d7}}=mH(),{format:u7,parse:p7}=Rg(),{toBuffer:m7}=rc(),AH=Symbol("kAborted"),r_=[8,13],Pr=["CONNECTING","OPEN","CLOSING","CLOSED"],g7=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,J=class e extends Y6{constructor(t,r,o){super(),this._binaryType=fH[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=xg,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,r=[]):r=[r]),bH(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){fH.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new r7({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new o7(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[be]=this,s[be]=this,t[be]=this,n.on("conclude",y7),n.on("drain",S7),n.on("error",A7),n.on("message",b7),n.on("ping",P7),n.on("pong",w7),s.onerror=v7,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",vH),t.on("data",Ig),t.on("end",_H),t.on("error",WH),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Qr.extensionName]&&this._extensions[Qr.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){et(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),wH(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){o_(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||xg,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){o_(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||xg,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){o_(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Qr.extensionName]||(n.compress=!1),this._sender.send(t||xg,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){et(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(J,"CONNECTING",{enumerable:!0,value:Pr.indexOf("CONNECTING")});Object.defineProperty(J.prototype,"CONNECTING",{enumerable:!0,value:Pr.indexOf("CONNECTING")});Object.defineProperty(J,"OPEN",{enumerable:!0,value:Pr.indexOf("OPEN")});Object.defineProperty(J.prototype,"OPEN",{enumerable:!0,value:Pr.indexOf("OPEN")});Object.defineProperty(J,"CLOSING",{enumerable:!0,value:Pr.indexOf("CLOSING")});Object.defineProperty(J.prototype,"CLOSING",{enumerable:!0,value:Pr.indexOf("CLOSING")});Object.defineProperty(J,"CLOSED",{enumerable:!0,value:Pr.indexOf("CLOSED")});Object.defineProperty(J.prototype,"CLOSED",{enumerable:!0,value:Pr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(J.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(J.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[t_])return t[a7];return null},set(t){for(let r of this.listeners(e))if(r[t_]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[t_]:!0})}})});J.prototype.addEventListener=c7;J.prototype.removeEventListener=d7;LH.exports=J;function bH(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:s7,protocolVersion:r_[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!r_.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${r_.join(", ")})`);let s;if(t instanceof e_)s=t;else try{s=new e_(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;Tg(e,u);return}let d=i?443:80,p=e7(16).toString("base64"),g=i?X6.request:Z6.request,A=new Set,h;if(n.createConnection=n.createConnection||(i?h7:f7),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new Qr({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=u7({[Qr.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!g7.test(u)||A.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");A.add(u)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let u=n.path.split(":");n.socketPath=u[0],n.path=u[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let u=o&&o.headers;if(o={...o,headers:{}},u)for(let[S,b]of Object.entries(u))o.headers[S.toLowerCase()]=b}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,u||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=g(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=g(n);n.timeout&&y.on("timeout",()=>{et(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[AH]||(y=e._req=null,Tg(e,u))}),y.on("response",u=>{let S=u.headers.location,b=u.statusCode;if(S&&n.followRedirects&&b>=300&&b<400){if(++e._redirects>n.maxRedirects){et(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new e_(S,t)}catch{let v=new SyntaxError(`Invalid URL: ${S}`);Tg(e,v);return}bH(e,f,r,o)}else e.emit("unexpected-response",y,u)||et(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,S,b)=>{if(e.emit("upgrade",u),e.readyState!==J.CONNECTING)return;y=e._req=null;let f=u.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){et(e,S,"Invalid Upgrade header");return}let w=t7("sha1").update(p+i7).digest("base64");if(u.headers["sec-websocket-accept"]!==w){et(e,S,"Invalid Sec-WebSocket-Accept header");return}let v=u.headers["sec-websocket-protocol"],_;if(v!==void 0?A.size?A.has(v)||(_="Server sent an invalid subprotocol"):_="Server sent a subprotocol but none was requested":A.size&&(_="Server sent no subprotocol"),_){et(e,S,_);return}v&&(e._protocol=v);let k=u.headers["sec-websocket-extensions"];if(k!==void 0){if(!h){et(e,S,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let E;try{E=p7(k)}catch{et(e,S,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(E);if(x.length!==1||x[0]!==Qr.extensionName){et(e,S,"Server indicated an extension that was not requested");return}try{h.accept(E[Qr.extensionName])}catch{et(e,S,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Qr.extensionName]=h}e.setSocket(S,b,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function Tg(e,t){e._readyState=J.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function f7(e){return e.path=e.socketPath,yH.connect(e)}function h7(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=yH.isIP(e.host)?"":e.host),Q6.connect(e)}function et(e,t,r){e._readyState=J.CLOSING;let o=new Error(r);Error.captureStackTrace(o,et),t.setHeader?(t[AH]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Tg,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function o_(e,t,r){if(t){let o=n7(t)?t.size:m7(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${Pr[e.readyState]})`);process.nextTick(r,o)}}function y7(e,t){let r=this[be];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[be]!==void 0&&(r._socket.removeListener("data",Ig),process.nextTick(PH,r._socket),e===1005?r.close():r.close(e,t))}function S7(){let e=this[be];e.isPaused||e._socket.resume()}function A7(e){let t=this[be];t._socket[be]!==void 0&&(t._socket.removeListener("data",Ig),process.nextTick(PH,t._socket),t.close(e[l7])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function hH(){this[be].emitClose()}function b7(e,t){this[be].emit("message",e,t)}function P7(e){let t=this[be];t._autoPong&&t.pong(e,!this._isServer,SH),t.emit("ping",e)}function w7(e){this[be].emit("pong",e)}function PH(e){e.resume()}function v7(e){let t=this[be];t.readyState!==J.CLOSED&&(t.readyState===J.OPEN&&(t._readyState=J.CLOSING,wH(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function wH(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function vH(){let e=this[be];if(this.removeListener("close",vH),this.removeListener("data",Ig),this.removeListener("end",_H),e._readyState=J.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[be]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",hH),e._receiver.on("finish",hH))}function Ig(e){this[be]._receiver.write(e)||this.pause()}function _H(){let e=this[be];e._readyState=J.CLOSING,e._receiver.end(),this.end()}function WH(){let e=this[be];this.removeListener("error",WH),this.on("error",SH),e&&(e._readyState=J.CLOSING,this.destroy())}});var RH=W((UCe,CH)=>{"use strict";var FCe=Og(),{Duplex:_7}=require("stream");function kH(e){e.emit("close")}function W7(){!this.destroyed&&this._writableState.finished&&this.destroy()}function EH(e){this.removeListener("error",EH),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function L7(e,t){let r=!0,o=new _7({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(kH,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(kH,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",W7),o.on("error",EH),o}CH.exports=L7});var n_=W((BCe,xH)=>{"use strict";var{tokenChars:k7}=Fs();function E7(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&k7[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}xH.exports={parse:E7}});var jH=W((VCe,zH)=>{"use strict";var C7=require("events"),Mg=require("http"),{Duplex:GCe}=require("stream"),{createHash:R7}=require("crypto"),TH=Rg(),gn=Hs(),x7=n_(),T7=Og(),{CLOSE_TIMEOUT:I7,GUID:O7,kWebSocket:M7}=Sr(),N7=/^[+/0-9A-Za-z]{22}==$/,IH=0,OH=1,NH=2,s_=class extends C7{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:I7,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:T7,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Mg.createServer((o,n)=>{let s=Mg.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=z7(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=IH}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===NH){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(ac,this);return}if(t&&this.once("close",t),this._state!==OH)if(this._state=OH,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(ac,this):process.nextTick(ac,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{ac(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",MH);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){fn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){fn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!N7.test(s)){fn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){fn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){lc(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=x7.parse(c)}catch{fn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&p!==void 0){let A=new gn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=TH.parse(p);h[gn.extensionName]&&(A.accept(h[gn.extensionName]),g[gn.extensionName]=A)}catch{fn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let A={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(A,(h,y,u,S)=>{if(!h)return lc(r,y||401,u,S);this.completeUpgrade(g,s,d,t,r,o,n)});return}if(!this.options.verifyClient(A))return lc(r,401)}this.completeUpgrade(g,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[M7])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>IH)return lc(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${R7("sha1").update(r+O7).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let g=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),p._protocol=g)}if(t[gn.extensionName]){let g=t[gn.extensionName].params,A=TH.format({[gn.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${A}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",MH),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(ac,this)})),a(p,n)}};zH.exports=s_;function z7(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function ac(e){e._state=NH,e.emit("close")}function MH(){this.destroy()}function lc(e,t,r,o){r=r||Mg.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Mg.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function fn(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,fn),e.emit("wsClientError",i,r,t)}else lc(r,o,n,s)}});var j7,D7,$7,H7,F7,U7,DH,B7,cc,$H=l(()=>{j7=m(RH(),1),D7=m(Rg(),1),$7=m(Hs(),1),H7=m(Jv(),1),F7=m(Zv(),1),U7=m(n_(),1),DH=m(Og(),1),B7=m(jH(),1),cc=DH.default});var i_,a_,l_=l(()=>{"use strict";i_="AGENT_WITCH_EXTERNAL_BRIDGE",a_="AGENT_WITCH_EXTERNAL_LIVE"});var c_,HH=l(()=>{"use strict";c_=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var G7,d_,FH=l(()=>{"use strict";l_();HH();G7=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",d_=(e={})=>{let t=e.env??process.env,r=c_(t[i_]),o=c_(t[a_]);return{mode:G7(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var UH=l(()=>{"use strict";l_()});var BH=l(()=>{"use strict";FH();UH()});var u_=l(()=>{"use strict"});var wr,dc=l(()=>{"use strict";wr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var qs,hn,GH,q7,p_,m_,VH,qH,g_,KH,uc,f_=l(()=>{"use strict";qs=m(require("node:fs")),hn=m(require("node:os")),GH=m(require("node:path"));u_();dc();q7=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),p_=(e=hn.default.hostname())=>GH.default.join(hn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),m_=e=>{if(!qs.default.existsSync(e))return null;try{let t=JSON.parse(qs.default.readFileSync(e,"utf8"));return!q7(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},VH=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},qH=(e,t)=>{qs.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},g_=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??p_(),o=m_(r);if(o!==null&&o.pid!==process.pid&&wr(o.pid)&&VH(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:hn.default.hostname(),macOsUsername:hn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return qH(r,n),{ok:!0}},KH=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??p_(),o=m_(r);return o!==null&&o.pid!==process.pid&&wr(o.pid)&&VH(o)?{ok:!1}:(qH(r,{hostname:hn.default.hostname(),macOsUsername:hn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},uc=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??p_();m_(r)?.pid===process.pid&&qs.default.existsSync(r)&&qs.default.unlinkSync(r)}});var h_,pc,K7,J7,Y7,X7,y_,JH=l(()=>{"use strict";h_=require("node:child_process"),pc=m(require("node:path"));dc();Xd();K7=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),J7=(e,t)=>{if(K7(e)||!/\bnode\b/.test(e))return!1;let r=pc.default.resolve(t),o=pc.default.join(r,"app",Pi),n=pc.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Pi||i==="agent-witch.ts")return e.includes(r);try{let a=pc.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},Y7=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,h_.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},X7=(e,t,r)=>{let o=Y7(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||J7(d,t)&&n.push(c)}return n},y_=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,h_.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=X7(r,e.installDir,t),n=[];for(let s of o)if(wr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var mc,gc,YH,Z7,S_,XH=l(()=>{"use strict";mc=m(require("node:fs")),gc=m(require("node:path"));Ee();YH=(e,t)=>{!mc.default.existsSync(e)||mc.default.existsSync(t)||(mc.default.mkdirSync(gc.default.dirname(t),{recursive:!0}),mc.default.renameSync(e,t))},Z7=e=>{if(e.profileEmail===null)return;let t=gc.default.join(e.installDir,ct);YH(gc.default.join(t,vn),e.mainLogPath),YH(gc.default.join(t,_n),e.errorLogPath)},S_=e=>{let t=N();e!==void 0&&t.installDir!==e||Z7(t)}});var ZH=l(()=>{"use strict";za();Op();Op();!qe()&&So(__agentWitchImportMetaUrl)&&(async()=>{Ve("agent-witch-wake-server");let e=await Do(),t=Jt(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var QH=l(()=>{"use strict";ZH()});var eF=l(()=>{"use strict";va()});var A_,tF=l(()=>{"use strict";u_();QH();f_();eF();A_=async(e={})=>{let t=e.skipInProcessBridge?null:await Ip();pp();let r=setInterval(()=>{pp()},6e4),o=setInterval(()=>{if(!KH().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var fc,Ng,t9,rF,oF,zg,nF,sF,b_,iF,jg,aF=l(()=>{"use strict";fc=m(require("node:fs")),Ng=m(require("node:path")),t9="pending-run-inputs.json",rF=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),oF=e=>{let t=e.profileEmail?Ng.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Ng.default.join(t,t9)},zg=e=>{let t=oF(e);if(!fc.default.existsSync(t))return{};try{let r=JSON.parse(fc.default.readFileSync(t,"utf8"));return rF(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!rF(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},nF=(e,t)=>{let r=oF(e);fc.default.mkdirSync(Ng.default.dirname(r),{recursive:!0}),fc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},sF=e=>Object.values(zg(e)),b_=(e,t)=>zg(e)[t]!==void 0,iF=(e,t)=>{let r=zg(e);r[t.agentRunId]=t,nF(e,r)},jg=(e,t)=>{let r=zg(e);delete r[t],nF(e,r)}});var Dg=l(()=>{"use strict";pe()});var lF=l(()=>{"use strict";pe()});var $g=l(()=>{"use strict";pe()});var Hg=l(()=>{"use strict";pe()});var hc=l(()=>{"use strict";pe()});var r9,o9,yc,P_=l(()=>{"use strict";gt();Dg();lF();$g();Hg();hc();r9={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},o9={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},yc=e=>{if(!de(e.writerAgent))return"the selected writer";let t=Ke(e.writerAgent);if(xe(e.writerExecutionBackend)==="api"&&t!==null){let r=De(we(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Fi(t,r.model);return`${o9[t]} model ${o}`}}return r9[e.writerAgent]}});var n9,s9,cF,dF,uF=l(()=>{"use strict";n9=/"input_tokens"\s*:\s*(\d+)/,s9=/"output_tokens"\s*:\s*(\d+)/,cF=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},dF=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=cF(n9.exec(t)),o=cF(s9.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var Fg=l(()=>{"use strict";yt()});var Sc,Ug,i9,w_,pF,mF,gF,v_,fF=l(()=>{"use strict";Sc=m(require("node:fs")),Ug=m(require("node:path"));Fg();i9="run-completion-outbox.json",w_=e=>{let t=e.profileEmail?Ug.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Ug.default.join(t,i9)},pF=e=>{let t=w_(e);if(!Sc.default.existsSync(t))return[];try{let r=JSON.parse(Sc.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},mF=(e,t)=>{Sc.default.mkdirSync(Ug.default.dirname(w_(e)),{recursive:!0}),Sc.default.writeFileSync(w_(e),JSON.stringify(t,null,2),"utf8")},gF=(e,t)=>{let r=[...pF(e).filter(o=>o.runId!==t.runId),t];mF(e,r)},v_=async e=>{if(e.cloudApi===null)return;let t=pF(e.layout);if(t.length===0)return;let r=[];for(let o of t)await ya(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);mF(e.layout,r)}});var hF=l(()=>{"use strict"});var __,Ac,l9,yn,yF=l(()=>{"use strict";hF();__=new Map,Ac=e=>{let t=__.get(e);t!==void 0&&(clearInterval(t),__.delete(e))},l9=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},yn=(e,t,r,o={})=>{Ac(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){Ac(t);return}let i=o.onTick?.()??{};l9(e,t,n,i)};s(),__.set(t,setInterval(s,15e3))}});var SF=l(()=>{"use strict";yt()});var AF,bF=l(()=>{"use strict";SF();AF=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:rt(t)}});var W_,bc,vr,L_,Ut,PF,Bg=l(()=>{"use strict";W_=new Set,bc=new Map,vr=(e,t)=>{if(t.length===0)return;let r=bc.get(e)??[];r.push(t),bc.set(e,r)},L_=e=>{W_.add(e);let t=bc.get(e)??[];return bc.delete(e),t},Ut=e=>W_.has(e),PF=e=>{W_.delete(e),bc.delete(e)}});var Ks,wF,vF,_F=l(()=>{"use strict";Ks=m(require("node:path")),wF=require("node:url");yo();vF=()=>{if(qe()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Ks.default.dirname(Ks.default.resolve(e)):Ks.default.dirname(Ks.default.resolve(__filename))}return Ks.default.dirname((0,wF.fileURLToPath)(__agentWitchImportMetaUrl))}});var WF,LF,kF,EF,Ge,Js,CF,RF,Ys,k_,E_,C_,xF,R_,TF,Gg=l(()=>{"use strict";WF=require("node:crypto"),LF=m(require("node:fs")),kF=m(require("node:path")),EF=require("node:url");dc();yo();_F();Ge=new Map,CF=async()=>{if(Js!==void 0)return Js;try{if(qe()){let e=vF(),t=kF.default.join(e,"deps","node-pty","lib","index.js");if(LF.default.existsSync(t)){let r=await import((0,EF.pathToFileURL)(t).href);return Js=r,r}}return Js=await import("node-pty"),Js}catch{return Js=null,null}},RF=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Ys=(e,t,r)=>{let o=Ge.get(e);if(o!==void 0){Ge.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},k_=(e,t)=>{let r=Ge.get(e);return r===void 0?!1:(r.pty.write(t),!0)},E_=(e,t,r)=>{let o=Ge.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},C_=e=>{for(let t of Ge.values())if(!(t.mode!=="agent"||t.runId!==e))return wr(t.pty.pid);return!1},xF=e=>{for(let[t,r]of Ge.entries())if(!(r.mode!=="agent"||r.runId!==e)){Ge.delete(t);try{r.pty.kill()}catch{}return!0}return!1},R_=async e=>{let t=await CF();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;Ge.get(e.shellSessionId)!==void 0&&Ys(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return Ge.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{RF(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{Ge.get(e.shellSessionId)?.pty===n&&(Ge.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},TF=async e=>{let t=e.shellSessionId??(0,WF.randomUUID)(),r=await CF();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return Ge.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{RF(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{Ge.get(t)?.pty===o&&(Ge.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var Vg,IF,OF=l(()=>{"use strict";Vg="[[AWAITING_INPUT]]",IF=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Vg,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Pc,MF,qg=l(()=>{"use strict";OF();Pc=e=>{let t=e.indexOf(Vg);if(t<0)return null;let o=e.slice(t+Vg.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},MF=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",IF].join(`
`)});var NF,zF=l(()=>{"use strict";Bg();Gg();qg();NF=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(Ut(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}vr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await TF({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Pc(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var jF,DF,$F,_r,Kg=l(()=>{"use strict";jF=require("node:child_process"),DF=m(require("node:fs")),$F=m(require("node:path"));Xd();_r=(e,t)=>{let r=$F.default.join(e,"app",Fk,"ensure-writer.sh");return DF.default.existsSync(r)?new Promise((o,n)=>{let s=(0,jF.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{n(i)}),s.on("close",i=>{if(i===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var HF,Sn,vc,Jg,x_,wc,Yg,Xg,T_,I_,c9,Xs,d9,u9,O_,M_=l(()=>{"use strict";HF=require("node:child_process");gt();Kg();$g();Dg();hc();Hg();Sn=new Map,vc=e=>e==="cursor"||e==="antigravity",Jg=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",x_=e=>Sn.get(e)?.warmed===!0,wc=e=>{let t=Sn.get(e);Sn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Yg=e=>Sn.get(e)?.conversationStarted===!0,Xg=e=>{let t=Sn.get(e);Sn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},T_=e=>{Sn.delete(e)},I_=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",c9={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Xs=e=>`${c9[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,d9=(e,t,r,o)=>new Promise(n=>{let s=du(t,r),i=[],a=(0,HF.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),u9=(e,t)=>{let r=Xs(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},O_=async e=>{if(!de(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&xe(e.runConfig.writerExecutionBackend)==="api"){let r=Ke(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=we(e.runConfig.layout.configPath);return De(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),wc(e.writerAgent),{exitCode:0,output:Xs(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await _r(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}vc(e.writerAgent)&&wc(e.writerAgent);let t=await d9(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?u9(e.writerAgent,t.output):Xs(e.writerAgent)}}});var An,N_=l(()=>{"use strict";An={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var FF,p9,m9,UF,g9,z_,BF=l(()=>{"use strict";N_();FF=/you(?:'|')ve hit your session limit/i,p9=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],m9=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,UF=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},g9=e=>{let t=m9.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},z_=e=>{let t=e.trim();if(t.length===0)return null;if(FF.test(t))return{code:An.SESSION_LIMIT,resetHint:g9(t),matchedLine:UF(t,FF)};for(let r of p9)if(r.test(t))return{code:An.PROVIDER_QUOTA,resetHint:null,matchedLine:UF(t,r)};return null}});var Zg,Qg,j_,D_=l(()=>{"use strict";Zg="[[AGENT_RUN_WRITER_EXECUTION]]",Qg="cli-writer-api-key-missing",j_="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var $_=l(()=>{"use strict";D_()});var GF=l(()=>{"use strict";$_()});var ef=l(()=>{"use strict";N_();BF();D_();$_();GF()});var tf,VF=l(()=>{"use strict";tf={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var qF,KF=l(()=>{"use strict";qF="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var JF,YF=l(()=>{"use strict";ef();KF();JF=e=>e.code===An.SESSION_LIMIT?qF:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var XF,ZF=l(()=>{"use strict";ef();VF();YF();XF=e=>{let t=z_(e.output);return t!==null?{status:tf.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:JF(t)}:{status:e.exitCode===0?tf.COMPLETED:tf.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var H_,e0e,QF=l(()=>{"use strict";H_={OPEN:"open",APPROVAL:"approval"},e0e=H_.APPROVAL});var Zs,rf,e1,y9,t1,r1,o1,_c,F_,U_=l(()=>{"use strict";Zs=m(require("node:fs")),rf=m(require("node:path")),e1="runs",y9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),t1=e=>{let t=e.profileEmail!==null?rf.default.join(e.installDir,"profiles",e.profileEmail,e1):rf.default.join(e.installDir,e1);return Zs.default.mkdirSync(t,{recursive:!0}),t},r1=(e,t)=>rf.default.join(t1(e),`${t}.json`),o1=(e,t)=>{Zs.default.writeFileSync(r1(e,t.id),JSON.stringify(t,null,2))},_c=(e,t)=>{let r=r1(e,t);if(!Zs.default.existsSync(r))return null;try{let o=JSON.parse(Zs.default.readFileSync(r,"utf8"));return!y9(o)||typeof o.id!="string"?null:o}catch{return null}},F_=e=>{let t=t1(e),r=Zs.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=_c(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var S9,n1,s1=l(()=>{"use strict";ZF();QF();U_();S9=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=XF({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:H_.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},n1=(e,t)=>{let r=S9(t);return o1(e,r),r}});var i1=l(()=>{"use strict";fg()});var a1,l1=l(()=>{"use strict";ef();a1=()=>[Zg,`agentRunWriterExecutionBackend=${Qg}`,`agentRunWriterExecutionReasonCode=${j_}`].join(`
`)});var eo,of=l(()=>{"use strict";eo=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var B_,A9,b9,c1,d1=l(()=>{"use strict";B_=e=>e.toLocaleString("en-US"),A9=e=>e<.01?e.toFixed(4):e.toFixed(3),b9=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${A9(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${B_(e.inputTokens)} in / ${B_(e.outputTokens)} out (${B_(e.totalTokens)} total)`,t].join(`
`)},c1=(e,t)=>{if(t===void 0)return e;let r=b9(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var u1=l(()=>{"use strict";pe()});var m1,Wc,ge,G_,nf,p1,P9,w9,g1,f1,h1,Lc,V_,q_,K_,y1,v9,lt,kc,to,S1,_9,W9,sf,J_,Y_,X_,A1=l(()=>{"use strict";m1=require("node:child_process");pe();gt();aF();Gl();P_();uF();uu();fF();Fg();yF();dc();bF();Bg();Gg();qg();zF();M_();s1();i1();l1();of();d1();In();u1();hc();Li();qg();Wc=new Map,ge=new Map,G_=new Set,nf=new Map,p1=e=>{e!==void 0&&!nf.has(e)&&nf.set(e,Date.now())},P9=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(Ut(t)){lt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}vr(t,n)},w9=(e,t,r,o,n)=>{if(!Dy(e,n))return;let s=`${a1()}
`;P9(t,r,o,s);let i=ge.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},g1=130,f1=`

Stopped by user.`,h1=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:eo(e)},Lc=null,V_=e=>{Lc=e},q_=(e,t)=>{if(Lc===null)return;let r=Gw(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||zS(Lc,t,r)},K_=async e=>{await v_({layout:e,cloudApi:Lc})},y1=e=>{let t=Wc.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:wr(t.pid)},v9=e=>ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),lt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},kc=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=En(s),c=ge.get(r);if(a!==null&&c!==void 0){let d=Zk(a),p=y1(r)||C_(r);d!==null&&!p&&to(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return Xk(a)}}),to=(e,t,r,o,n,s,i,a)=>{let c=$n(s,a),d=n,p=c1(c.output,c.llmUsage);if(r!==void 0){let A=nf.get(r);nf.delete(r),A!==void 0&&Uw({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-A)/1e3))});let h=dF(c.llmUsage,p);h!==null&&RD({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&G_.has(r)&&(G_.delete(r),d=g1,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${f1}`:"Stopped by user.");let g=r!==void 0?Gw(e.layout.reportsDir,r):null;if(r!==void 0){Ac(r),Yi(e.layout,r),Ut(r)&&(lt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),PF(r));let A=ge.get(r);kD({reportsDir:e.layout.reportsDir,agentRunId:r,input:eo(i),output:p,...A!==void 0?{writerLabel:yc({writerAgent:A.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),A!==void 0&&mg({layout:e.layout,writerAgent:A.writerAgent,projectFolderPath:A.projectFolderPath,userPrompt:A.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),n1(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),gF(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),v_({layout:e.layout,cloudApi:Lc}),ge.delete(r),Wc.delete(r),jg(e.layout,r)}lt(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),Mi(e.layout)},S1=(e,t,r,o,n,s,i)=>{let a=ge.get(r),c=a?.accumulatedOutput??s;iF(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),yn(t,r,()=>b_(e.layout,r),kc(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),lt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},_9=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(n===void 0||h.length===0)){if(Ut(n)){lt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}vr(n,h)}};if(n!==void 0){let h=ge.get(n);Wc.set(n,t),ge.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),lt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),yn(r,n,()=>y1(n),kc(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let g=a==="claude-cli",A=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(g?A.push(y):(c.push(y),p(y)),d||n===void 0)return;let u=Pc(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let S=ge.get(n),b=[S?.accumulatedOutput??"",u.partialOutput].filter(f=>f.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=b),Wc.delete(n),S1(e,r,n,o,u.question,b,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;Xg(a);let y=n!==void 0?ge.get(n):void 0,u=g?$n(A.join("")):{output:c.join("").trim(),llmUsage:void 0},S=g?c.join("").trim():"",b=[u.output.trim(),S].filter(w=>w.length>0).join(`
`);g&&u.output.trim().length>0&&p(u.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${b}`.trim():b;to(e,r,n,o,h??-1,f,s,u.llmUsage)}),t.on("error",h=>{d||to(e,r,n,o,-1,h.message,s)})},W9=(e,t,r,o,n,s,i,a,c)=>{let d=h1(r,c);s!==void 0&&(ge.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),lt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),yn(n,s,()=>ge.has(s),kc(e,n,s,o,i,a))),Vi(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(Ut(s)){lt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}vr(s,g)}}).then(g=>{Xg(t),to(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let A=g instanceof Error?g.message:String(g);to(e,n,s,o,-1,A,r)})},sf=(e,t,r,o,n,s,i,a,c,d,p,g)=>{let A=h1(r,p);if(Oi(e.layout),Lo(e,t)){p1(s),W9(e,t,r,o,n,s,c,d,A);return}let h=xt(t,r,v9(e),i);if(h===null){to(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}p1(s);let y=AF({workspace:e.workspace,projectFolderPath:c}),u=()=>{let S=(0,m1.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:g??process.env});_9(e,S,n,o,s,r,A,t)};if(s===void 0){u();return}ge.set(s,{originalPrompt:r,userTranscriptPrompt:A,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:ge.get(s)?.accumulatedOutput??""}),w9(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Wi({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),yn(n,s,()=>ge.has(s),kc(e,n,s,o,c,d)),NF({socket:n,sendMessage:lt,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:S=>{a!==void 0&&Ys(a,w=>{lt(n,w)},o);let b=ge.get(s),f=[b?.accumulatedOutput??"",S.partialOutput].filter(w=>w.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=f),S1(e,n,s,o,S.question,f,r)},onFinished:(S,b)=>{Xg(t);let f=$n(b),w=ge.get(s),v=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${f.output}`.trim():f.output;to(e,n,s,o,S,v,r,f.llmUsage)}}).then(S=>{if(!S){u();return}yn(n,s,()=>C_(s),kc(e,n,s,o,c,d))}).catch(S=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",S instanceof Error?S.message:S),u()})},J_=(e,t,r,o)=>{jg(e.layout,t.agentRunId),t.shellSessionId!==void 0&&lt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=MF(t),s=ge.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;sf(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},Y_=(e,t)=>{for(let r of sF(e.layout))ge.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:eo(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),yn(t,r.agentRunId,()=>b_(e.layout,r.agentRunId),{awaitingInput:!0}),lt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},X_=(e,t,r,o)=>{let n=ge.get(r);if(n===void 0)return!1;G_.add(r),Ac(r);let s=Wc.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(xF(r))return!0;jg(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${f1}`:"Stopped by user.";return to(e,t,r,o,g1,i,n.originalPrompt),!0}});var L9,Z_,b1=l(()=>{"use strict";ea();L9=()=>`http://127.0.0.1:${ft()}/restart`,Z_=async()=>{try{let e=await fetch(L9(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var P1=l(()=>{"use strict";Fa()});var w1=l(()=>{"use strict";bv()});var v1,_1=l(()=>{"use strict";v1=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Ec,k9,Q_,W1=l(()=>{"use strict";V();te();P1();wA();w1();_1();In();Ec=(e,t)=>{$r(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},k9=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(ty(),ey)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},Q_=async e=>{let t=Ce(e.layout.installDir)?.bundleVersion??null;if(!v1({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(mt(e.layout)){Ni({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Ec(e.layout,{summary:r,action:"install-bundle-update-start"}),Kt({launchAgentLabel:se(e.layout.installDir),installDir:e.layout.installDir});let o=await js({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),Ec(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await k9();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Ec(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),Ec(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),Ec(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var E9,eW,L1=l(()=>{"use strict";E9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eW=e=>{if(!E9(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var tW,rW,k1=l(()=>{"use strict";rA();oA();tW=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=_a({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},rW=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await or(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var E1,C9,R9,x9,Cc,C1=l(()=>{"use strict";E1=m(require("node:os"));Ee();C9="Default",R9=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),x9=e=>{let t=E1.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Cc=()=>{let e=N(),t=$d(e),r=R9(C9);return`${x9(t)}/${r.length>0?r:"project"}`}});var R1=l(()=>{"use strict";Fa()});var x1,oW,T1=l(()=>{"use strict";R1();x1=!1,oW=e=>{x1||(x1=!0,process.on("uncaughtException",t=>{Ho(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;Ho(e,{kind:"crash",message:r,stack:o})}))}});var I1,T9,nW,O1=l(()=>{"use strict";I1=require("node:child_process");Kg();gt();$g();Dg();hc();Hg();T9=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,I1.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},nW=async e=>{if(!de(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&xe(e.runConfig.writerExecutionBackend)==="api"){let r=Ke(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=we(e.layout.configPath),n=De(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await _r(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await T9(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var sW,M1=l(()=>{"use strict";sW=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var N1,iW,z1=l(()=>{"use strict";N1=require("node:crypto"),iW=()=>(0,N1.randomUUID)()});var Qs,j1,af=l(()=>{"use strict";Qs="[[WORKING_ESTIMATE]]",j1=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Qs,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var D1,$1=l(()=>{"use strict";D1=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var I9,H1,F1=l(()=>{"use strict";af();I9=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,H1=e=>{if(!e.includes(Qs))return null;let t=null;for(let r of e.matchAll(I9)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var O9,aW,U1=l(()=>{"use strict";F1();O9=/^(\d{1,6})\b/,aW=e=>{let t=H1(e);if(t!==null)return t;let r=O9.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var M9,N9,z9,lf,lW=l(()=>{"use strict";gt();Da();M9="http://127.0.0.1:11434",N9=45e3,z9=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},lf=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||M9,o=t===void 0?(await At({commands:ue({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(N9)});return n.ok?z9(await n.json()):null}catch{return null}}});var cW,dW,uW,B1=l(()=>{"use strict";Li();af();of();$1();U1();Gl();lW();cW=async e=>{let t=eo(e.wrappedPrompt),r=ED(e.reportsDir);return{estimateOutput:await lf(j1(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},dW=e=>{let t=aW(e.estimateOutput);t!==null&&ig({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},uW=e=>{let t=aW(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=D1(t);return _i({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Ct.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),ig({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var cf,G1,pW=l(()=>{"use strict";cf="[[WORKING_TOKEN_ESTIMATE]]",G1=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",cf,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var V1,j9,q1,K1=l(()=>{"use strict";pW();V1=/^(\d{1,8})\b/,j9=e=>{let t=e.indexOf(cf);if(t<0)return null;let r=e.slice(t+cf.length).trim(),o=V1.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},q1=e=>{let t=j9(e);if(t!==null)return t;let r=V1.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var mW,gW,J1=l(()=>{"use strict";pW();of();K1();Gl();lW();mW=async e=>{let t=eo(e.wrappedPrompt),r=xD(e.reportsDir);return{estimateOutput:await lf(G1(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},gW=e=>{let t=q1(e.estimateOutput);return t===null?null:(CD({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var Y1=l(()=>{"use strict";f_();JH();XH();tF();ea();A1();Kg();gt();U_();Bg();b1();uA();W1();In();L1();k1();Fg();C1();T1();O1();Zd();M1();z1();af();Li();B1();J1();P_();Da();Gg();M_()});var X1={};Lt(X1,{buildContinuationPromptWithContext:()=>H9});var D9,$9,H9,Z1=l(()=>{"use strict";D9=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,$9=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),H9=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=$9(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${D9(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var Q1={};Lt(Q1,{readHarnessExportSets:()=>U9});var Rc,fW,df,F9,U9,eU=l(()=>{"use strict";Rc=m(require("node:fs")),fW=m(require("node:path"));Ee();df=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),F9=e=>{if(!Rc.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Rc.default.readFileSync(e.harnessManifestPath,"utf8"));if(df(t))return t}catch{return null}return null},U9=(e,t)=>{let r=N(t),o=F9(r);if(o===null)return[];let n=df(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!df(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!df(p))continue;let g=typeof p.path=="string"?p.path:void 0,A=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(g===void 0||A.length===0||h.length===0||y.length===0)continue;let u=g.startsWith("shared/")?fW.default.join(r.harnessRootDir,g):fW.default.join(r.harnessSetsDir,i,g);Rc.default.existsSync(u)&&d.push({id:A,kind:h,title:y,content:Rc.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var wW,yW,ei,tU,B9,rU,oU,hW,nU,SW,AW,bW,Y,B,PW,G9,xc,V9,q9,K9,J9,Y9,X9,Z9,Q9,Tc,sU=l(()=>{"use strict";wW=require("node:child_process"),yW=m(require("node:fs")),ei=m(require("node:os"));$H();V();te();Qn();Tv();BH();pe();tt();Fa();Tb();Pg();fg();yt();xo();IA();Zt();Y1();tU=3e4,B9=3e4,rU=new Map,oU=new Map,hW=new Map,nU=new Map,SW=new Map,AW=new Map,bW=new Map,Y=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),B=(e,t,r)=>{e.readyState===cc.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&($r(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Mp(r,"out",t)))},PW=e=>e,G9=e=>{if(!yW.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(yW.default.readFileSync(e.harnessManifestPath,"utf8"));if(Y(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},xc=(e,t)=>{let r=G9(t);r!==null&&B(e,{type:"harness.manifest.report",payload:{hostname:ei.default.hostname(),manifest:r}})},V9=async(e,t,r,o,n,s,i=!1,a,c,d,p,g)=>{let A=g?.trim()??"";if(!de(t)){B(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=yc({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await At({commands:ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?cW({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,S=s!==void 0?mW({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,b=vc(t)&&!x_(t);if(b){try{await _r(e.layout.installDir,t)}catch($){let Pe=$ instanceof Error?$.message:String($);B(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Pe}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}wc(t)}else if(!vc(t))try{await _r(e.layout.installDir,t)}catch($){let Pe=$ instanceof Error?$.message:String($);B(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Pe}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Ki(d,Cc,g);if(f===null){B(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Je({projectFolderPath:f,...A.length>0?{projectId:A}:{}}),i||Yl(e.layout,t,f);let w=gg({sessionContinuation:i,supportsWriterSessionContinuation:Jg(t),isWriterConversationStarted:Yg(t)}),v=i&&w==="first"?Jl(e.layout,t,f):null,_=v!==null?zs(e.layout,v):null,k=_!==null&&_.turns.length>0,E=iv({sessionContinuation:i,supportsWriterSessionContinuation:Jg(t),isWriterConversationStarted:Yg(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:k,userPromptCharacterCount:r.length}),x=r;if(E.continuationStrategy==="source_run_seed"){let $=typeof c=="string"&&c.length>0?_c(e.layout,c):null;if($!==null){let{buildContinuationPromptWithContext:Pe}=await Promise.resolve().then(()=>(Z1(),X1));x=Pe({priorPrompt:$.prompt,priorOutput:$.resultOutput??"",userMessage:r})}}else E.continuationStrategy==="transcript_seed"&&_!==null&&_.turns.length>0&&(x=cg({priorTurns:_.turns,userMessage:r}));let I=E.ragLimit>0?await ds({layout:e.layout,query:x,limit:E.ragLimit,minScore:E.ragMinScore,projectFolderPath:f,...A.length>0?{projectId:A}:{}}):[],M=E.ragLimit>0&&f.trim().length>0?await Rb({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:f,...A.length>0?{projectId:A}:{}}):[],X=E.injectMemory?Yw(e.layout,f,A.length>0?A:void 0):[],G=`${Zw(X,E.memoryEntryLimit)}${kb(I)}${xb(M)}${x}`,F=p?.trim()??(s!==void 0&&f.trim().length>0?iW():void 0);if(s!==void 0&&F!==void 0&&F.length>0&&f.trim().length>0){Wi({reportKey:F,agentRunId:s,userSummary:"Working on your Mac\u2026"});let $=G;u!==null&&u.then(Pe=>{if(Pe===null)return;let Bt=uW({estimateOutput:Pe.estimateOutput??"",reportKey:F,agentRunId:s,reportsDir:e.layout.reportsDir,task:Pe.task,writerLabel:Pe.writerLabel,embedding:Pe.embedding});if(Bt.estimateSeconds===null)return;q_(e.layout.reportsDir,s);let ti=`${Qs}
${Bt.estimateSeconds}
`;if(Ut(s)){B(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:ti},requestId:o});return}vr(s,ti)}).catch(()=>{}),G=sW($),G=Lh(G,{agentRunId:s,reportKey:F,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then($=>{$!==null&&dW({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel,embedding:$.embedding})}).catch(()=>{}),s!==void 0&&S!==null&&S.then($=>{$!==null&&gW({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel})}).catch(()=>{});let ro=s!==void 0&&bW.get(s)===!0;if(s!==void 0&&f.trim().length>0){let $=await dp(f);AW.set(s,$),F!==void 0&&F.length>0&&SW.set(s,F)}sf(e,t,G,o,PW(n),s,{sessionTurn:E.sessionTurn},a,f,F,r,Iy(e.layout,s,ro)),b&&s!==void 0&&B(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:I_(t)},requestId:o})},q9=async(e,t,r,o,n)=>{let s=(i,a)=>{B(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await O_({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,B(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=de(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Xs(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},K9=(e,t,r)=>new Promise(o=>{if(!de(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=xt(t,r,ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,wW.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),J9=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;B(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=It(t.bundle),s=Y(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=Re(e.wsUrl)??Yt,g=await AS({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return B(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=Ro({bundle:i,layout:e.layout});return B(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&xc(o,e.layout),!0},Y9=async(e,t,r,o)=>{if(await J9(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(B(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){B(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!de(n)){B(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}Oi(e.layout);let i=await(async()=>{try{await _r(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return K9(e,n,s)})().finally(()=>{Mi(e.layout)});B(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),xc(o,e.layout)},X9=e=>{let t=1e3*2**e;return Math.min(B9,t)},Z9=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(mt(e.layout)){qh(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,Z_().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(u,S="system.ack")=>{if(!t.selfUpdateInFlight){if(mt(e.layout)){Ni({layout:e.layout,remoteBundleVersion:u,trigger:S}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${S}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,Q_({layout:e.layout,remoteBundleVersion:u,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let u=ve(e.layout);u!==null&&ze(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===cc.OPEN||u.readyState===cc.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,tU)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=X9(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},g=u=>{s();let S=()=>{let b=Ri(e.layout.installDir),f=ft();B(u,{type:"agent.heartbeat",payload:{hostname:ei.default.hostname(),macOsUsername:ei.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:b}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,tU)},A=(u,S)=>{if(typeof u.type!="string")return;if(TA(u)){t.stopped=!0,s(),a(),c(),EA({layout:e.layout}).finally(()=>{uc(),process.exit(0)});return}$r(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),Mp(e.layout,"in",u);let b=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&Y(u.payload)){let f=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",w=typeof u.payload.origin=="string"?u.payload.origin:"",v=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",_=typeof u.payload.challenge=="string"?u.payload.challenge:"",k=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!xv({serverPublicKey:f,origin:w,devicePublicKey:v,challenge:_,serverAttestation:k})){t.wakeError="Server attestation verification failed",$r(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&Y(u.payload)){let f=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";$r(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),nW({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{B(S,{type:"writer.status",payload:w},e.layout)})}if(u.type==="install.bundle.update"&&Y(u.payload)){let f=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";f.length>0&&o(f,"install.bundle.update")}if(u.type==="system.ack"){yp(e.layout,{wsUrl:e.wsUrl});let f=Y(u.payload)?u.payload:null,w=eW(f);w!==null&&o(w)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&Y(u.payload)&&tW(u.payload),u.type==="automations.run"&&Y(u.payload)&&rW(u.payload),u.type==="terminal.stream.accepted"&&Y(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"";if(f.length>0){let w=L_(f);for(let v of w)B(S,{type:"terminal.stream.chunk",payload:{runId:f,chunk:v},requestId:b})}}if(u.type==="agent.agentRun.list"&&B(S,{type:"dashboard.agentRun.list.result",payload:{runs:F_(e.layout)},requestId:b}),u.type==="agent.agentRun.get"&&Y(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"",w=f.length>0?_c(e.layout,f):null;B(S,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:b})}if(u.type==="command.claude.run"&&Y(u.payload)){let f=u.payload.prompt,w=typeof u.payload.writerAgent=="string"&&de(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",v=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,_=u.payload.sessionContinuation===!0,k=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,E=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,x=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=Ki(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,Cc,x),M=Ly(u.payload.compositionSnapshot),X=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${_?"continue":"first"})\u2026`),I===null){B(S,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...v!==void 0?{agentRunId:v}:{}},requestId:b});return}if(M!==null){let G=Ey(e.layout,M);if(G!==null){B(S,{type:"command.claude.result",payload:{exitCode:-1,output:G,...v!==void 0?{agentRunId:v}:{}},requestId:b});return}if(v!==void 0){let F=Ry(e.layout,v,M);if(!F.ok){B(S,{type:"command.claude.result",payload:{exitCode:-1,output:F.errorMessage,...v!==void 0?{agentRunId:v}:{}},requestId:b});return}bW.set(v,M.entries.some(ro=>ro.scope==="run"))}}v!==void 0&&E!==void 0&&rU.set(v,E),v!==void 0&&(oU.set(v,I),x!==void 0&&x.trim().length>0&&hW.set(v,x.trim()),nU.set(v,f.trim()),Je({projectFolderPath:I,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),V9(e,w,f.trim(),b,S,v,_,E,k,I,X,x)}}if(u.type==="shell.session.open"&&Y(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:120,v=typeof u.payload.rows=="number"?u.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),R_({shellSessionId:f,cwd:e.workspace,cols:w,rows:v,send:_=>{B(S,_)},requestId:b}))}if(u.type==="shell.session.close"&&Y(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";f.length>0&&Ys(f,w=>{B(S,w)},b)}if(u.type==="shell.input"&&Y(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.data=="string"?u.payload.data:"";f.length>0&&w.length>0&&k_(f,w)}if(u.type==="shell.resize"&&Y(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:0,v=typeof u.payload.rows=="number"?u.payload.rows:0;f.length>0&&w>0&&v>0&&E_(f,w,v)}if(u.type==="command.writer.session.end"&&Y(u.payload)){let f=u.payload.writerAgent;typeof f=="string"&&de(f)&&(T_(f),pg(e.layout,f))}if(u.type==="command.writer.session.start"&&Y(u.payload)){let f=u.payload.writerAgent,w=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof f=="string"&&de(f)&&w.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),q9(e,f,w,b,S))}if(u.type==="command.claude.stop"&&Y(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),X_(e,PW(S),f,b))}if(u.type==="command.claude.input_respond"&&Y(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",w=typeof u.payload.response=="string"?u.payload.response.trim():"",v=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",_=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",k=typeof u.payload.question=="string"?u.payload.question:"";f.length>0&&w.length>0&&v.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),J_(e,{agentRunId:f,originalPrompt:v,partialOutput:_,question:k,response:w,shellSessionId:rU.get(f)},b,PW(S)))}if(u.type==="dispatch.approval.required"&&Y(u.payload)){let f=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",w=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${w}`),process.platform==="darwin"&&(0,wW.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&Y(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),Y9(e,u.payload,b,S)),u.type==="harness.export.request"&&Y(u.payload)){let f=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",w=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,v=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(_=>typeof _=="string"):[];f.length>0&&v.length>0&&(async()=>{let{readHarnessExportSets:_}=await Promise.resolve().then(()=>(eU(),Q1)),k=_(v,e.email);B(S,{type:"harness.export.result",payload:{success:k.length>0,borrowerUserId:f,...w!==void 0?{targetDeviceId:w}:{},sets:k,errorMessage:k.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(u.type==="harness.manifest.request"&&xc(S,e.layout),u.type==="command.claude.result"&&Y(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,w=typeof u.payload.output=="string"?u.payload.output:"",v=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,_=Ki(f!==void 0?oU.get(f):void 0,Cc),k=f!==void 0?hW.get(f):void 0,E=f!==void 0?nU.get(f)??"":"",x=qS({exitCode:v,output:w});if(x&&_!==null&&Lb({layout:e.layout,text:w,source:f??"command.claude.result",projectFolderPath:_,...k!==void 0?{projectId:k}:{}}),v!=null&&v!==0&&w.trim().length>0&&_!==null&&(Pb({layout:e.layout,errorText:w,projectFolderPath:_,...k!==void 0?{projectId:k}:{}}),Cb({layout:e.layout,text:w,source:f??"command.claude.result.failure",projectFolderPath:_,...k!==void 0?{projectId:k}:{}})),x&&E.trim().length>0&&_!==null&&Xw({layout:e.layout,projectFolderPath:_,...k!==void 0?{projectId:k}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:E,output:w,createdAt:new Date().toISOString()}}),f!==void 0&&_!==null){let M=SW.get(f),X=AW.get(f);M!==void 0&&X!==void 0&&dp(_).then(G=>{let F=KS({before:X,after:G});kh(M,F),AW.delete(f),SW.delete(f)})}if(x&&k!==void 0&&k.trim().length>0){let M=H(),X=M===null?null:Z({wsUrl:M.wsUrl,pairingToken:M.pairingToken});X!==null&&YS(X,k,{...f!==void 0?{sourceRunId:f}:{},lesson:JS({prompt:E,output:w})})}f!==void 0&&(Yi(e.layout,f),bW.delete(f),hW.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let u=new cc(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),V_(Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),K_(e.layout);let S=Re(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=Rv({layout:e.layout,origin:S,...b!==void 0&&b.length>0?{claimToken:b}:{}});B(u,{type:"agent.register",payload:{role:"agent",hostname:ei.default.hostname(),macOsUsername:ei.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),xc(u,e.layout),Y_(e,u),g(u)}),u.on("message",S=>{let b=typeof S=="string"?S:S.toString("utf8");try{let f=JSON.parse(b);if(!Y(f))return;A(f,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(S,b)=>{s(),t.socket=void 0,t.wsConnected=!1,iA(e.layout),t.reconnectAttempt+=1;let f=typeof b=="string"?b:b.toString("utf8");Ho(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:f}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",S=>{t.wakeError=S.message,Ho(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return Vh(()=>{let u=Kh();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&o(u.remoteBundleVersion,u.trigger);let S=Jh();S!==null&&r(S)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Ra(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:tc(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(xc(u,e.layout),{ok:!0})}}},Q9=async()=>{Ve("agent-witch");let e=d_(),t=L();g_().ok||(process.platform==="darwin"?(await go(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),S_(t);let o=y_({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(Kt({launchAgentLabel:se(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),yi());let n=await Fy(),s=n[0];s!==void 0&&oW(s.layout);for(let h of n){let y=Re(h.wsUrl)??Yt;xi(h.layout.installDir,y)}let i=n.map(h=>Z9(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),uc(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let S=ve(h.layout);aA(S,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(mt(h)||xa(h.installDir))},g=await A_({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):ec({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let A=Jt(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Si(),d()});d=()=>{A(),g.stop(),uc(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Tc=Q9});var vW=l(()=>{"use strict";sU()});var iU={};Lt(iU,{startAgentWitchClient:()=>Tc});var aU=l(()=>{"use strict";vW();vW();yo();Eh();eu();if(!qe()&&So(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Qd(process.argv.slice(e))),Tc()}});_h();Eh();yo();eu();var tE="20.x",rE="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var pV=e=>[`Node.js ${tE} or newer is required (found ${e}).`,rE].join(" "),oE=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${pV(process.version)}
`),process.exit(1))};var eY=async()=>{Ve("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(ty(),ey)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},tY=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(n0(),o0)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},rY=async()=>{if(!So(qe()?void 0:__agentWitchImportMetaUrl))return;oE();let e=process.argv.indexOf("report");e>=0&&process.exit(Qd(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await eY();return}if(t==="wake"){await tY();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(sT(),nT));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(M$(),O$));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(aU(),iU));await r()};rY();
