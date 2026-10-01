#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var AU=Object.create;var uf=Object.defineProperty;var bU=Object.getOwnPropertyDescriptor;var PU=Object.getOwnPropertyNames;var wU=Object.getPrototypeOf,vU=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var W=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Lt=(e,t)=>{for(var r in t)uf(e,r,{get:t[r],enumerable:!0})},_U=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of PU(t))!vU.call(e,n)&&n!==r&&uf(e,n,{get:()=>t[n],enumerable:!(o=bU(t,n))||o.enumerable});return e};var m=(e,t,r)=>(r=e!=null?AU(wU(e)):{},_U(t||!e||!e.__esModule?uf(r,"default",{value:e,enumerable:!0}):r,e));var bn=W(pf=>{"use strict";Object.defineProperty(pf,"__esModule",{value:!0});pf.stringify=WU;function WU(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=W(mf=>{"use strict";Object.defineProperty(mf,"__esModule",{value:!0});mf.generateTypeGuardError=LU;var WW=bn();function LU(e,t,r){return(0,WW.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,WW.stringify)(e)}) to be "${r}"`}});var Wr=W(Ic=>{"use strict";Object.defineProperty(Ic,"__esModule",{value:!0});Ic.isNonNullObject=void 0;var kU=O(),EU=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,kU.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Ic.isNonNullObject=EU});var kt=W(fe=>{"use strict";Object.defineProperty(fe,"__esModule",{value:!0});fe.attachTypeGuardMeta=fe.isArrayTypeGuard=fe.isNestedObjectTypeGuard=fe.getTypeGuardWrapperKind=fe.getTypeGuardInnerGuard=fe.getTypeGuardItemGuard=fe.getTypeGuardSchema=void 0;var CU=e=>e.schema;fe.getTypeGuardSchema=CU;var RU=e=>e.itemGuard;fe.getTypeGuardItemGuard=RU;var xU=e=>e.innerGuard;fe.getTypeGuardInnerGuard=xU;var TU=e=>e.wrapperKind;fe.getTypeGuardWrapperKind=TU;var IU=e=>{if((0,fe.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};fe.isNestedObjectTypeGuard=IU;var OU=e=>{if((0,fe.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};fe.isArrayTypeGuard=OU;var MU=(e,t)=>Object.assign(e,t);fe.attachTypeGuardMeta=MU});var ri=W(no=>{"use strict";Object.defineProperty(no,"__esModule",{value:!0});no.getExpectedTypeName=no.getTypeGuardDisplayName=void 0;var LW=kt(),NU=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};no.getTypeGuardDisplayName=NU;var zU=e=>{let t=(0,LW.getTypeGuardWrapperKind)(e),r=(0,LW.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,no.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};no.getExpectedTypeName=zU});var so=W(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.createValidationResult=void 0;var jU=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Oc.createValidationResult=jU});var Pn=W(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.createValidationError=void 0;var DU=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Mc.createValidationError=DU});var wn=W(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.createTreeNode=void 0;var $U=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Nc.createTreeNode=$U});var oi=W(zc=>{"use strict";Object.defineProperty(zc,"__esModule",{value:!0});zc.combineResults=void 0;var HU=so(),FU=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,HU.createValidationResult)(r,o,n)};zc.combineResults=FU});var Dc=W(jc=>{"use strict";Object.defineProperty(jc,"__esModule",{value:!0});jc.createSimplifiedTree=void 0;var kW=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=kW(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},UU=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=kW(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};jc.createSimplifiedTree=UU});var si=W(Hc=>{"use strict";Object.defineProperty(Hc,"__esModule",{value:!0});Hc.validateObject=void 0;var BU=Wr(),ni=so(),GU=Pn(),$c=wn(),VU=oi(),EW=Fc(),qU=(e,t,r)=>{let o=()=>{let i=(0,GU.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,$c.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,ni.createValidationResult)(!1,[],a):(0,ni.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,ni.createValidationResult)(!0,[],(0,$c.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,g=d,A=t[g],h=e[g],y=(0,EW.validateProperty)(g,h,A,r);return y.valid?p.length===0?(0,ni.createValidationResult)(!0,[],(0,$c.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,EW.validateProperty)(d,e[d],p,r)}),a=(0,VU.combineResults)(i,r.path),c=(0,$c.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,ni.createValidationResult)(a.valid,a.errors,c)};return(0,BU.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};Hc.validateObject=qU});var RW=W(Gc=>{"use strict";Object.defineProperty(Gc,"__esModule",{value:!0});Gc.validateArray=void 0;var KU=bn(),Uc=so(),CW=Pn(),Bc=wn(),JU=oi(),YU=si(),XU=ri(),ZU=kt(),QU=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,CW.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,Bc.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,Uc.createValidationResult)(!1,[c],d)}let n=(0,ZU.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,g={path:p,config:r.config||null};if(n)return(0,YU.validateObject)(c,n,g);let A=t(c,null),h=(0,XU.getExpectedTypeName)(t),y=(0,KU.stringify)(c);if(A)return(0,Uc.createValidationResult)(!0,[],(0,Bc.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,S=(0,CW.createValidationError)(p,h,c,u),b=(0,Bc.createTreeNode)(p,!1,h,c);return b.errors=[S],(0,Uc.createValidationResult)(!1,[S],b)}),i=(0,JU.combineResults)(s,o),a=(0,Bc.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,Uc.createValidationResult)(i.valid,i.errors,a)};Gc.validateArray=QU});var Fc=W(qc=>{"use strict";Object.defineProperty(qc,"__esModule",{value:!0});qc.validateProperty=void 0;var xW=so(),eB=Pn(),TW=wn(),tB=ri(),Vc=kt(),rB=si(),oB=RW(),nB=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,Vc.getTypeGuardSchema)(r),c=(0,Vc.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,rB.validateObject)(t,a,s);if(c&&(0,Vc.isArrayTypeGuard)(r))return(0,oB.validateArray)(t,c,s)}let d=p=>{let g=r(t,p),A=(0,tB.getExpectedTypeName)(r);return g?(0,xW.createValidationResult)(!0,[],(0,TW.createTreeNode)(n,!0,A,t)):(()=>{let h=(0,eB.createValidationError)(n,A,t,`Expected ${n} (${JSON.stringify(t)}) to be "${A}"`),y=(0,TW.createTreeNode)(n,!1,A,t);return y.errors=[h],(0,xW.createValidationResult)(!1,[h],y)})()};if((0,Vc.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};qc.validateProperty=nB});var Jc=W(Kc=>{"use strict";Object.defineProperty(Kc,"__esModule",{value:!0});Kc.isNil=void 0;var sB=O(),iB=function(e,t){return e!=null?(t&&t.callbackOnError((0,sB.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Kc.isNil=iB});var gf=W(Yc=>{"use strict";Object.defineProperty(Yc,"__esModule",{value:!0});Yc.isDefined=void 0;var aB=O(),lB=Jc(),cB=function(e,t){return(0,lB.isNil)(e,null)?(t&&t.callbackOnError((0,aB.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Yc.isDefined=cB});var ff=W(Xc=>{"use strict";Object.defineProperty(Xc,"__esModule",{value:!0});Xc.reportValidationResults=void 0;var dB=Dc(),IW=gf(),uB=Jc(),pB=(e,t)=>{if(e.valid===!0||(0,uB.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,IW.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,dB.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,IW.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Xc.reportValidationResults=pB});var hf=W(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.Validation=Q.reportValidationResults=Q.validateObject=Q.validateProperty=Q.createSimplifiedTree=Q.combineResults=Q.createTreeNode=Q.createValidationError=Q.createValidationResult=Q.getExpectedTypeName=void 0;var mB=ri();Object.defineProperty(Q,"getExpectedTypeName",{enumerable:!0,get:function(){return mB.getExpectedTypeName}});var gB=so();Object.defineProperty(Q,"createValidationResult",{enumerable:!0,get:function(){return gB.createValidationResult}});var fB=Pn();Object.defineProperty(Q,"createValidationError",{enumerable:!0,get:function(){return fB.createValidationError}});var hB=wn();Object.defineProperty(Q,"createTreeNode",{enumerable:!0,get:function(){return hB.createTreeNode}});var yB=oi();Object.defineProperty(Q,"combineResults",{enumerable:!0,get:function(){return yB.combineResults}});var SB=Dc();Object.defineProperty(Q,"createSimplifiedTree",{enumerable:!0,get:function(){return SB.createSimplifiedTree}});var AB=Fc();Object.defineProperty(Q,"validateProperty",{enumerable:!0,get:function(){return AB.validateProperty}});var bB=si();Object.defineProperty(Q,"validateObject",{enumerable:!0,get:function(){return bB.validateObject}});var PB=ff();Object.defineProperty(Q,"reportValidationResults",{enumerable:!0,get:function(){return PB.reportValidationResults}});var wB=so(),vB=oi(),_B=Pn(),WB=wn(),LB=Fc(),kB=si(),EB=ff(),CB=Dc();Q.Validation={result:wB.createValidationResult,combine:vB.combineResults,error:_B.createValidationError,treeNode:WB.createTreeNode,property:LB.validateProperty,object:kB.validateObject,report:EB.reportValidationResults,createSimplifiedTree:CB.createSimplifiedTree}});var Zc=W(yf=>{"use strict";Object.defineProperty(yf,"__esModule",{value:!0});yf.isType=xB;var OW=Wr(),MW=hf(),RB=kt();function xB(e){if(!(0,OW.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,MW.validateObject)(r,e,s);return(0,MW.reportValidationResults)(i,o||null),i.valid}return(0,OW.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,RB.attachTypeGuardMeta)(t,{schema:e})}});var DW=W(io=>{"use strict";Object.defineProperty(io,"__esModule",{value:!0});io.isNestedType=io.isShape=void 0;io.isSchema=ii;var NW=Wr(),zW=hf(),jW=kt();function ii(e){if(!(0,NW.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=IB(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,zW.validateObject)(o,t,i);return(0,zW.reportValidationResults)(a,n||null),a.valid}return(0,NW.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,jW.attachTypeGuardMeta)(r,{schema:t})}function TB(e){return typeof e=="function"?e:Array.isArray(e)?OB(e):typeof e=="object"&&e!==null?ii(e):e}function IB(e){let t={};for(let[r,o]of Object.entries(e))t[r]=TB(o);return t}function OB(e){let t=e[0],r=ii(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,jW.attachTypeGuardMeta)(o,{itemGuard:r})}io.isShape=ii;io.isNestedType=ii});var $W=W(Sf=>{"use strict";Object.defineProperty(Sf,"__esModule",{value:!0});Sf.isObjectWith=NB;var MB=Zc();function NB(e){return(0,MB.isType)(e)}});var HW=W(Af=>{"use strict";Object.defineProperty(Af,"__esModule",{value:!0});Af.isObject=jB;var zB=Zc();function jB(e){return(0,zB.isType)(e)}});var FW=W(bf=>{"use strict";Object.defineProperty(bf,"__esModule",{value:!0});bf.guardWithTolerance=DB;function DB(e,t,r){return t(e,r),e}});var UW=W(Pf=>{"use strict";Object.defineProperty(Pf,"__esModule",{value:!0});Pf.isBranded=HB;var $B=O();function HB(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,$B.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var BW=W(Qc=>{"use strict";Object.defineProperty(Qc,"__esModule",{value:!0});Qc.BrandSymbols=void 0;Qc.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var GW=W(ed=>{"use strict";Object.defineProperty(ed,"__esModule",{value:!0});ed.isAny=void 0;var FB=function(e){return!0};ed.isAny=FB});var ai=W(wf=>{"use strict";Object.defineProperty(wf,"__esModule",{value:!0});wf.reportTypeGuardError=BB;var UB=O();function BB(e,t,r){e&&e.callbackOnError((0,UB.generateTypeGuardError)(t,e.identifier,r))}});var VW=W(td=>{"use strict";Object.defineProperty(td,"__esModule",{value:!0});td.isBoolean=void 0;var GB=ai(),VB=function(t,r){return typeof t!="boolean"?((0,GB.reportTypeGuardError)(r,t,"boolean"),!1):!0};td.isBoolean=VB});var qW=W(rd=>{"use strict";Object.defineProperty(rd,"__esModule",{value:!0});rd.isDate=void 0;var qB=O(),KB=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,qB.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};rd.isDate=KB});var vf=W(od=>{"use strict";Object.defineProperty(od,"__esModule",{value:!0});od.isNumber=void 0;var JB=ai(),YB=function(t,r){return typeof t!="number"||isNaN(t)?((0,JB.reportTypeGuardError)(r,t,"number"),!1):!0};od.isNumber=YB});var KW=W(nd=>{"use strict";Object.defineProperty(nd,"__esModule",{value:!0});nd.isString=void 0;var XB=ai(),ZB=function(t,r){return typeof t!="string"?((0,XB.reportTypeGuardError)(r,t,"string"),!1):!0};nd.isString=ZB});var JW=W(sd=>{"use strict";Object.defineProperty(sd,"__esModule",{value:!0});sd.isUnknown=void 0;var QB=function(e){return!0};sd.isUnknown=QB});var YW=W(id=>{"use strict";Object.defineProperty(id,"__esModule",{value:!0});id.isFunction=void 0;var eG=O(),tG=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,eG.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};id.isFunction=tG});var ZW=W(ad=>{"use strict";Object.defineProperty(ad,"__esModule",{value:!0});ad.isFile=void 0;var XW=O(),rG=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,XW.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,XW.generateTypeGuardError)(e,t.identifier,"File")),!1)};ad.isFile=rG});var eL=W(ld=>{"use strict";Object.defineProperty(ld,"__esModule",{value:!0});ld.isFileList=void 0;var QW=O(),oG=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,QW.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,QW.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};ld.isFileList=oG});var rL=W(cd=>{"use strict";Object.defineProperty(cd,"__esModule",{value:!0});cd.isBlob=void 0;var tL=O(),nG=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,tL.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,tL.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};cd.isBlob=nG});var nL=W(dd=>{"use strict";Object.defineProperty(dd,"__esModule",{value:!0});dd.isFormData=void 0;var oL=O(),sG=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,oL.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,oL.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};dd.isFormData=sG});var iL=W(ud=>{"use strict";Object.defineProperty(ud,"__esModule",{value:!0});ud.isURL=void 0;var sL=O(),iG=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,sL.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,sL.generateTypeGuardError)(e,t.identifier,"URL")),!1)};ud.isURL=iG});var lL=W(pd=>{"use strict";Object.defineProperty(pd,"__esModule",{value:!0});pd.isURLSearchParams=void 0;var aL=O(),aG=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,aL.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,aL.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};pd.isURLSearchParams=aG});var cL=W(md=>{"use strict";Object.defineProperty(md,"__esModule",{value:!0});md.isMap=void 0;var lG=O(),cG=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,lG.generateTypeGuardError)(e,t.identifier,"Map")),!1)};md.isMap=cG});var dL=W(gd=>{"use strict";Object.defineProperty(gd,"__esModule",{value:!0});gd.isSet=void 0;var dG=O(),uG=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,dG.generateTypeGuardError)(e,t.identifier,"Set")),!1)};gd.isSet=uG});var uL=W(_f=>{"use strict";Object.defineProperty(_f,"__esModule",{value:!0});_f.isIndexSignature=mG;var pG=O();function mG(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,pG.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let g=s[d],A=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),h=t(g,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return A&&h})}}});var pL=W(fd=>{"use strict";Object.defineProperty(fd,"__esModule",{value:!0});fd.isError=void 0;var gG=ai(),fG=function(t,r){return t instanceof Error?!0:((0,gG.reportTypeGuardError)(r,t,"Error"),!1)};fd.isError=fG});var Lf=W(Wf=>{"use strict";Object.defineProperty(Wf,"__esModule",{value:!0});Wf.isArrayWithEachItem=SG;var hG=O(),yG=kt();function SG(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,hG.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,yG.attachTypeGuardMeta)(t,{itemGuard:e})}});var kf=W(hd=>{"use strict";Object.defineProperty(hd,"__esModule",{value:!0});hd.isNonEmptyArray=void 0;var AG=O(),bG=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,AG.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};hd.isNonEmptyArray=bG});var mL=W(Ef=>{"use strict";Object.defineProperty(Ef,"__esModule",{value:!0});Ef.isNonEmptyArrayWithEachItem=vG;var PG=Lf(),wG=kf();function vG(e){return function(t,r){return(0,PG.isArrayWithEachItem)(e)(t,r)&&(0,wG.isNonEmptyArray)(t,r)}}});var fL=W(Cf=>{"use strict";Object.defineProperty(Cf,"__esModule",{value:!0});Cf.isTuple=_G;var gL=O();function _G(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,gL.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,gL.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var hL=W(Rf=>{"use strict";Object.defineProperty(Rf,"__esModule",{value:!0});Rf.isObjectWithEachItem=LG;var WG=O();function LG(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,WG.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var yL=W(xf=>{"use strict";Object.defineProperty(xf,"__esModule",{value:!0});xf.isPartialOf=EG;var kG=Wr();function EG(e){return function(t,r){if(!(0,kG.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var SL=W(Tf=>{"use strict";Object.defineProperty(Tf,"__esModule",{value:!0});Tf.isPick=RG;var CG=Wr();function RG(e,...t){return function(r,o){if(!(0,CG.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var AL=W(If=>{"use strict";Object.defineProperty(If,"__esModule",{value:!0});If.isOmit=TG;var xG=Wr();function TG(e,...t){return function(r,o){if(!(0,xG.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),g=p.indexOf(" ("),A=g>=0?p.slice(0,g):p;if(a.has(A))return!1;let h=A.startsWith(s+".")&&A.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var bL=W(yd=>{"use strict";Object.defineProperty(yd,"__esModule",{value:!0});yd.isNonEmptyString=void 0;var IG=O(),OG=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,IG.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};yd.isNonEmptyString=OG});var PL=W(Sd=>{"use strict";Object.defineProperty(Sd,"__esModule",{value:!0});Sd.isNonNegativeNumber=void 0;var MG=O(),NG=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,MG.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Sd.isNonNegativeNumber=NG});var wL=W(Ad=>{"use strict";Object.defineProperty(Ad,"__esModule",{value:!0});Ad.isPositiveNumber=void 0;var zG=O(),jG=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,zG.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Ad.isPositiveNumber=jG});var vL=W(bd=>{"use strict";Object.defineProperty(bd,"__esModule",{value:!0});bd.isNonPositiveNumber=void 0;var DG=O(),$G=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,DG.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};bd.isNonPositiveNumber=$G});var _L=W(Pd=>{"use strict";Object.defineProperty(Pd,"__esModule",{value:!0});Pd.isNegativeNumber=void 0;var HG=O(),FG=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,HG.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Pd.isNegativeNumber=FG});var WL=W(wd=>{"use strict";Object.defineProperty(wd,"__esModule",{value:!0});wd.isInteger=void 0;var UG=O(),BG=vf(),GG=function(e,t){return!(0,BG.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,UG.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};wd.isInteger=GG});var LL=W(vd=>{"use strict";Object.defineProperty(vd,"__esModule",{value:!0});vd.isPositiveInteger=void 0;var VG=O(),qG=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,VG.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};vd.isPositiveInteger=qG});var kL=W(_d=>{"use strict";Object.defineProperty(_d,"__esModule",{value:!0});_d.isNegativeInteger=void 0;var KG=O(),JG=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,KG.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};_d.isNegativeInteger=JG});var EL=W(Wd=>{"use strict";Object.defineProperty(Wd,"__esModule",{value:!0});Wd.isNonNegativeInteger=void 0;var YG=O(),XG=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,YG.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Wd.isNonNegativeInteger=XG});var CL=W(Ld=>{"use strict";Object.defineProperty(Ld,"__esModule",{value:!0});Ld.isNonPositiveInteger=void 0;var ZG=O(),QG=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,ZG.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Ld.isNonPositiveInteger=QG});var RL=W(Ed=>{"use strict";Object.defineProperty(Ed,"__esModule",{value:!0});Ed.isNumeric=void 0;var kd=O(),e2=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,kd.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,kd.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,kd.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,kd.generateTypeGuardError)(e,t.identifier,"number key")),!1};Ed.isNumeric=e2});var xL=W(Cd=>{"use strict";Object.defineProperty(Cd,"__esModule",{value:!0});Cd.isBooleanLike=void 0;var Of=O(),t2=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Of.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Of.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Cd.isBooleanLike=t2});var TL=W(Rd=>{"use strict";Object.defineProperty(Rd,"__esModule",{value:!0});Rd.isDateLike=void 0;var li=O(),r2=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,li.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,li.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,li.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,li.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,li.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Rd.isDateLike=r2});var IL=W(xd=>{"use strict";Object.defineProperty(xd,"__esModule",{value:!0});xd.isBigInt=void 0;var o2=O(),n2=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,o2.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};xd.isBigInt=n2});var Nf=W(Mf=>{"use strict";Object.defineProperty(Mf,"__esModule",{value:!0});Mf.isOneOf=s2;var OL=bn();function s2(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,OL.stringify)(t)}) must be one of following values ${e.map(OL.stringify).join(" | ")}`),o}}});var ML=W(zf=>{"use strict";Object.defineProperty(zf,"__esModule",{value:!0});zf.isOneOfTypes=l2;var i2=bn(),a2=ri();function l2(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,i2.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,a2.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var NL=W(jf=>{"use strict";Object.defineProperty(jf,"__esModule",{value:!0});jf.isIntersectionOf=c2;function c2(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var zL=W(Df=>{"use strict";Object.defineProperty(Df,"__esModule",{value:!0});Df.isExtensionOf=d2;function d2(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var jL=W($f=>{"use strict";Object.defineProperty($f,"__esModule",{value:!0});$f.isNullOr=p2;var u2=kt();function p2(e){function t(r,o){return r===null?!0:e(r,o)}return(0,u2.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var DL=W(Hf=>{"use strict";Object.defineProperty(Hf,"__esModule",{value:!0});Hf.isUndefinedOr=g2;var m2=kt();function g2(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,m2.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var $L=W(Ff=>{"use strict";Object.defineProperty(Ff,"__esModule",{value:!0});Ff.isNilOr=h2;var f2=kt();function h2(e){function t(r,o){return r==null?!0:e(r,o)}return(0,f2.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var HL=W(Uf=>{"use strict";Object.defineProperty(Uf,"__esModule",{value:!0});Uf.isAsserted=y2;function y2(e){return!0}});var FL=W(Bf=>{"use strict";Object.defineProperty(Bf,"__esModule",{value:!0});Bf.isEnum=A2;var S2=Nf();function A2(e){return function(t,r){return(0,S2.isOneOf)(...Object.values(e))(t,r)}}});var UL=W(Gf=>{"use strict";Object.defineProperty(Gf,"__esModule",{value:!0});Gf.isEqualTo=w2;var b2=O(),P2=bn();function w2(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,b2.generateTypeGuardError)(t,r.identifier,`equal to ${(0,P2.stringify)(e)}`)),!1):!0}}});var BL=W(Td=>{"use strict";Object.defineProperty(Td,"__esModule",{value:!0});Td.isRegex=void 0;var v2=O(),_2=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,v2.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Td.isRegex=_2});var VL=W(Vf=>{"use strict";Object.defineProperty(Vf,"__esModule",{value:!0});Vf.isPattern=W2;var GL=O();function W2(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,GL.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,GL.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var qL=W(qf=>{"use strict";Object.defineProperty(qf,"__esModule",{value:!0});qf.by=L2;function L2(e){return function(t){return e(t,null)}}});var KL=W(Kf=>{"use strict";Object.defineProperty(Kf,"__esModule",{value:!0});Kf.toNumber=k2;function k2(e){return typeof e=="number"?e:Number(e)}});var JL=W(Jf=>{"use strict";Object.defineProperty(Jf,"__esModule",{value:!0});Jf.toDate=E2;function E2(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var YL=W(Yf=>{"use strict";Object.defineProperty(Yf,"__esModule",{value:!0});Yf.toBoolean=C2;function C2(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var XL=W(Id=>{"use strict";Object.defineProperty(Id,"__esModule",{value:!0});Id.isSymbol=void 0;var R2=O(),x2=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,R2.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Id.isSymbol=x2});var ci=W(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var T2=Zc();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return T2.isType}});var Xf=DW();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return Xf.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return Xf.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return Xf.isNestedType}});var I2=$W();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return I2.isObjectWith}});var O2=HW();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return O2.isObject}});var M2=FW();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return M2.guardWithTolerance}});var N2=UW();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return N2.isBranded}});var z2=BW();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return z2.BrandSymbols}});var j2=GW();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return j2.isAny}});var D2=VW();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return D2.isBoolean}});var $2=qW();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return $2.isDate}});var H2=gf();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return H2.isDefined}});var F2=Jc();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return F2.isNil}});var U2=vf();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return U2.isNumber}});var B2=KW();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return B2.isString}});var G2=JW();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return G2.isUnknown}});var V2=YW();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return V2.isFunction}});var q2=ZW();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return q2.isFile}});var K2=eL();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return K2.isFileList}});var J2=rL();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return J2.isBlob}});var Y2=nL();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return Y2.isFormData}});var X2=iL();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return X2.isURL}});var Z2=lL();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return Z2.isURLSearchParams}});var Q2=cL();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return Q2.isMap}});var e5=dL();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return e5.isSet}});var t5=uL();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return t5.isIndexSignature}});var r5=pL();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return r5.isError}});var o5=Lf();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return o5.isArrayWithEachItem}});var n5=kf();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return n5.isNonEmptyArray}});var s5=mL();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return s5.isNonEmptyArrayWithEachItem}});var i5=fL();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return i5.isTuple}});var a5=Wr();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return a5.isNonNullObject}});var l5=hL();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return l5.isObjectWithEachItem}});var c5=yL();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return c5.isPartialOf}});var d5=SL();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return d5.isPick}});var u5=AL();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return u5.isOmit}});var p5=bL();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return p5.isNonEmptyString}});var m5=PL();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return m5.isNonNegativeNumber}});var g5=wL();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return g5.isPositiveNumber}});var f5=vL();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return f5.isNonPositiveNumber}});var h5=_L();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return h5.isNegativeNumber}});var y5=WL();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return y5.isInteger}});var S5=LL();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return S5.isPositiveInteger}});var A5=kL();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return A5.isNegativeInteger}});var b5=EL();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return b5.isNonNegativeInteger}});var P5=CL();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return P5.isNonPositiveInteger}});var w5=RL();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return w5.isNumeric}});var v5=xL();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return v5.isBooleanLike}});var _5=TL();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return _5.isDateLike}});var W5=IL();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return W5.isBigInt}});var L5=Nf();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return L5.isOneOf}});var k5=ML();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return k5.isOneOfTypes}});var E5=NL();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return E5.isIntersectionOf}});var C5=zL();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return C5.isExtensionOf}});var R5=jL();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return R5.isNullOr}});var x5=DL();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return x5.isUndefinedOr}});var T5=$L();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return T5.isNilOr}});var I5=HL();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return I5.isAsserted}});var O5=FL();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return O5.isEnum}});var M5=UL();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return M5.isEqualTo}});var N5=BL();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return N5.isRegex}});var z5=VL();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return z5.isPattern}});var j5=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return j5.generateTypeGuardError}});var D5=qL();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return D5.by}});var $5=KL();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return $5.toNumber}});var H5=JL();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return H5.toDate}});var F5=YL();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return F5.toBoolean}});var U5=XL();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return U5.isSymbol}})});var di,ZL,QL,ao,Zf,zX,ek,Od,lo,ui,Qf,eh,th,rh,Gt,oh,Md,Nd,zd,pi,ct,vn,_n,jd,Lr,nh,tk,Et=l(()=>{"use strict";di={production:".agent-witch",localhost:".local-agent-witch"},ZL={production:47892,localhost:47893},QL={production:"com.agent-witch",localhost:"com.local-agent-witch"},ao={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Zf="app",zX=`${Zf}/agent-witch.js`,ek=`${Zf}/command`,Od={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},lo=di.production,ui=di.localhost,Qf=ZL.production,eh=ZL.localhost,th=QL.production,rh=QL.localhost,Gt="profiles",oh=ao.activeProfile,Md="harness",Nd="sets",zd="manifest.json",pi=Od.projectsDir,ct=Od.logsDir,vn="agent-witch.log",_n="agent-witch.error.log",jd=Od.reportsDir,Lr=Od.deviceKeypairJson,nh=Zf,tk="agent-witch.js"});var Wn,rk,B5,ok,nk=l(()=>{"use strict";Wn=m(require("node:path")),rk=require("node:url"),B5=()=>!0,ok=()=>{if(B5()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Wn.default.dirname(Wn.default.resolve(e)):Wn.default.dirname(Wn.default.resolve(__filename))}return Wn.default.dirname((0,rk.fileURLToPath)(__agentWitchImportMetaUrl))}});var sh,sk,z,ik,G5,kr,L,Dd,Vt,ak,$d,Ln,Hd,Fd,se,dt,ih,ut,ah,N,lh=l(()=>{"use strict";sh=m(require("node:fs")),sk=m(require("node:os")),z=m(require("node:path")),ik=m(ci());Et();nk();G5=ok(),kr=e=>e.trim().toLowerCase(),L=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return z.default.resolve(e);let t=z.default.resolve(G5),r=z.default.basename(t),o=z.default.basename(z.default.dirname(t));return r===nh&&(o===lo||o===ui)?z.default.dirname(t):r===lo||r===ui?t:z.default.join(sk.default.homedir(),lo)},Dd=(e=L())=>z.default.join(e,nh),Vt=(e=L())=>z.default.join(Dd(e),tk),ak=(e,t,r)=>t!==null?z.default.join(e,Gt,t,r):z.default.join(e,r),$d=e=>ak(e.installDir,e.profileEmail,pi),Ln=e=>ak(e.installDir,e.profileEmail,ct),Hd=e=>e.profileEmail!==null?z.default.join(e.installDir,Gt,e.profileEmail,Lr):z.default.join(e.installDir,Lr),Fd=e=>z.default.basename(e)===ui,se=(e=L())=>Fd(e)?rh:th,dt=(e=L())=>Fd(e)?eh:Qf,ih=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return kr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?kr(t):null},ut=(e=L())=>{let t=z.default.join(e,oh);if(!sh.default.existsSync(t))return null;try{let r=JSON.parse(sh.default.readFileSync(t,"utf8"));if((0,ik.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return kr(r.email)}catch{return null}return null},ah=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?kr(r):null}let t=ih();return t!==null?t:ut()},N=e=>{let t=L(),r=Dd(t),o=Vt(t),n=ah(e);if(n!==null){let A=z.default.join(t,Gt,n),h=z.default.join(A,Md),y=z.default.join(A,pi),u=z.default.join(A,ct),S=z.default.join(A,jd),b=z.default.join(A,Lr),f=z.default.join(A,ct,vn),w=z.default.join(A,ct,_n);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:u,mainLogPath:f,errorLogPath:w,reportsDir:S,deviceKeypairPath:b,configPath:z.default.join(A,"config.json"),harnessRootDir:h,harnessManifestPath:z.default.join(h,zd),harnessSetsDir:z.default.join(h,Nd)}}let s=z.default.join(t,Md),i=z.default.join(t,pi),a=z.default.join(t,ct),c=z.default.join(t,jd),d=z.default.join(t,Lr),p=z.default.join(t,ct,vn),g=z.default.join(t,ct,_n);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:g,reportsDir:c,deviceKeypairPath:d,configPath:z.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:z.default.join(s,zd),harnessSetsDir:z.default.join(s,Nd)}}});var ch,lk,V5,q5,ck,dh,dk=l(()=>{"use strict";ch=m(require("node:fs")),lk=m(require("node:path"));Et();lh();V5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),q5=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,ck=e=>{let t=lk.default.join(e,ao.wakePort);if(!ch.default.existsSync(t))return null;try{let r=JSON.parse(ch.default.readFileSync(t,"utf8"));if(V5(r)&&q5(r.wakePort))return r.wakePort}catch{return null}return null},dh=(e=L())=>ck(e)??dt(e)});var V=l(()=>{"use strict";lh();dk()});var mi,Z5,Q5,uk,eV,tV,pk=l(()=>{"use strict";V();mi=se(),Z5=`${mi}-wake`,Q5=`${mi}-live`,uk=`${mi}-watchdog`,eV=`${mi}-automation-scheduler`,tV=`${mi}-updater`});var uh,ph,Ud=l(()=>{"use strict";uh=new Set(["","loginwindow","_mbsetupuser","root"]),ph=5e3});var mk,rV,gk,mh,gh=l(()=>{"use strict";mk=require("node:child_process");Ud();rV=e=>e.trim().toLowerCase(),gk=e=>e==null?!1:!uh.has(rV(e)),mh=()=>{if(process.platform!=="darwin")return null;try{let t=(0,mk.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return gk(t)?t:null}catch{return null}}});var hk,fk,pt,gi=l(()=>{"use strict";hk=m(require("node:os"));gh();fk=e=>e.trim().toLowerCase(),pt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?mh():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??hk.default.userInfo().username;return fk(r)===fk(o)}});var yk,Sk,co,Ak=l(()=>{"use strict";yk=require("node:child_process"),Sk=m(require("node:fs"));V();gi();co=(e=L())=>{let t=Vt(e);if(!Sk.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!pt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=ut(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,yk.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var bk,fi,Bd=l(()=>{"use strict";bk=require("node:child_process"),fi=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,bk.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Gd,fh,Pk,ee,Vd,hi=l(()=>{"use strict";Gd=m(require("node:fs")),fh=m(require("node:path"));V();Et();Pk=e=>{let t=fh.default.join(e,Gt);return Gd.default.existsSync(t)?Gd.default.readdirSync(t).filter(r=>Gd.default.statSync(fh.default.join(t,r)).isDirectory()).map(r=>kr(r)).toSorted():[]},ee=(e=L())=>{let t=se(e);return[{profileEmail:Pk(e)[0]??null,launchAgentLabel:t}]},Vd=(e=L())=>Pk(e)});var hh,wk,vk,oV,qt,qd=l(()=>{"use strict";hh=m(require("node:fs")),wk=m(require("node:os")),vk=m(require("node:path"));V();hi();oV=()=>vk.default.join(wk.default.homedir(),"Library","LaunchAgents"),qt=(e=L())=>{let t=se(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ee(e))r.add(n.launchAgentLabel);let o=oV();if(hh.default.existsSync(o))for(let n of hh.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var _k,yi,Wk=l(()=>{"use strict";V();Bd();qd();hi();_k=(e=L())=>{let t=new Set(ee(e).map(r=>r.launchAgentLabel));return qt(e).filter(r=>!t.has(r))},yi=(e=L())=>{for(let t of _k(e))fi(t)}});var Si,yh=l(()=>{"use strict";V();Bd();qd();Si=(e=L())=>{for(let t of qt(e))fi(t)}});var Lk,kk,nV,uo,Ek=l(()=>{"use strict";Lk=require("node:child_process"),kk=require("node:util"),nV=(0,kk.promisify)(Lk.execFile),uo=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await nV("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var po,sV,Sh,Ah=l(()=>{"use strict";po=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sV=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,Sh=e=>{let t=e.pathValue??sV(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
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
`}});var Kd,bh=l(()=>{"use strict";Kd=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var mo,Ph,Ai,iV,aV,lV,Ck,Kt,wh=l(()=>{"use strict";mo=m(require("node:fs")),Ph=m(require("node:os")),Ai=m(require("node:path"));Et();V();Ah();bh();iV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),aV=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,lV=e=>{let t=Ai.default.join(e,ao.wakePort);if(!mo.default.existsSync(t))return dt(e);try{let r=JSON.parse(mo.default.readFileSync(t,"utf8"));if(iV(r)&&aV(r.wakePort))return r.wakePort}catch{return dt(e)}return dt(e)},Ck=(e,t=Ph.default.homedir())=>Ai.default.join(t,"Library","LaunchAgents",`${e}.plist`),Kt=e=>{let t=e.installDir??L(),r=e.homeDir??Ph.default.homedir(),o=Ck(e.launchAgentLabel,r),n=mo.default.existsSync(o)?mo.default.readFileSync(o,"utf8"):null;if(n!==null&&Kd(n))return{ok:!0,rewritten:!1,plistPath:o};let s=Sh({launchAgentLabel:e.launchAgentLabel,runPath:Ai.default.join(t,ek,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??lV(t)});if(!Kd(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{mo.default.mkdirSync(Ai.default.dirname(o),{recursive:!0}),mo.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var xk,Tk,Ik,bi,cV,dV,Rk,ke,vh=l(()=>{"use strict";xk=require("node:child_process"),Tk=m(require("node:fs")),Ik=require("node:util");V();wh();gi();bi=(0,Ik.promisify)(xk.execFile),cV=async e=>{try{return await bi("launchctl",["print",e]),!0}catch{return!1}},dV=async(e,t,r)=>{await cV(t)&&await bi("launchctl",["bootout",t]).catch(()=>{}),await bi("launchctl",["bootstrap",e,r]),await bi("launchctl",["enable",t])},Rk=async e=>{try{return await bi("launchctl",["kickstart","-k",e]),!0}catch{return!1}},ke=async(e,t=L())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!pt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=Kt({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await Rk(n))return{ok:!0};let i=s.plistPath;if(!Tk.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await dV(o,n,i),await Rk(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var go,Ok=l(()=>{"use strict";V();vh();hi();go=async(e=L())=>{let t=[];for(let r of ee(e))(await ke(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var Ve,Jt,Mk=l(()=>{"use strict";yh();gi();Ud();Ve=e=>{pt()||(Si(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Jt=(e,t=ph)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{pt()||e()},t);return()=>{clearInterval(r)}}});var te=l(()=>{"use strict";pk();Ak();Bd();Wk();yh();qd();gi();Ek();Ok();vh();wh();bh();Ah();hi();gh();Ud();Mk()});var _h=l(()=>{"use strict";te()});var Nk,zk,Jd,jk,kn,Dk,$k,fo=l(()=>{"use strict";Nk=".agent-witch",zk="memory",Jd="project.json",jk="chunks.ndjson",kn="runs.ndjson",Dk="reports",$k=".json"});var Hk=l(()=>{"use strict";fo()});var Fk,Yd,Wh=l(()=>{"use strict";Fk=m(require("node:path"));Hk();Yd=(e,t)=>Fk.default.join(e.trim(),`${t.trim()}${$k}`)});var Pi,Uk,Bk=l(()=>{"use strict";Pi="agent-witch.js",Uk="command"});var Xd=l(()=>{"use strict";Bk()});var ho,Gk,Vk=l(()=>{"use strict";Xd();ho=e=>`'${e.replace(/'/g,"'\\''")}'`,Gk=e=>{let t=`${e.installDir.trim()}/${"app"}/${Pi}`,r=[ho("node"),ho(t),"report","write","--key",ho(e.reportKey.trim()),"--agent-run-id",ho(e.agentRunId.trim()),"--status",ho(e.status),"--summary",ho(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",ho(e.details.trim())),r.join(" ")}});var Ct,qk,uV,Lh,Zd=l(()=>{"use strict";Wh();Vk();Ct={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},qk=e=>e===Ct.COMPLETED||e===Ct.FAILED,uV=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Lh=(e,t)=>{let r=Yd(t.reportsDir,t.reportKey),o=Gk({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Ct.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${uV({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Ee=l(()=>{"use strict";Et();V()});var vi,Jk,Kk,Yk,pV,En,mV,Xk,_i,Wi,kh,Zk,Qk,Li=l(()=>{"use strict";vi=m(require("node:fs")),Jk=m(require("node:path"));Zd();Wh();Ee();Kk=50,Yk=e=>{let t=N(),r=Yd(t.reportsDir,e);return vi.default.mkdirSync(Jk.default.dirname(r),{recursive:!0}),r},pV=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},En=e=>{let t=Yk(e);if(!vi.default.existsSync(t))return null;try{let r=JSON.parse(vi.default.readFileSync(t,"utf8"));return pV(r)?r:null}catch{return null}},mV=(e,t)=>{let r=[...e,t];return r.length>Kk?r.slice(r.length-Kk):r},Xk=e=>{let t=Yk(e.reportKey);vi.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},_i=e=>{let t=En(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:mV(t?.history??[],o)};return Xk(n),n},Wi=e=>{let t=En(e.reportKey);return t!==null?t:_i({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Ct.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},kh=(e,t)=>{let r=t.trim();if(r.length===0)return En(e);let o=En(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return Xk(s),s},Zk=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},Qk=e=>{if(e===null||!qk(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Ct.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var gV,fV,ki,eE,Qd,Eh=l(()=>{"use strict";Zd();Li();gV=new Set(Object.values(Ct)),fV=e=>gV.has(e),ki=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},eE=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Qd=e=>{if(e[0]!=="write")return eE(),1;let r=ki(e,"--key"),o=ki(e,"--agent-run-id"),n=ki(e,"--status"),s=ki(e,"--summary"),i=ki(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!fV(n)?(eE(),1):(_i({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var qe,yo=l(()=>{"use strict";qe=()=>!0});var Ch,tE,So,eu=l(()=>{"use strict";Ch=m(require("node:path")),tE=require("node:url");yo();So=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Ch.default.resolve(t);return qe()?r===Ch.default.resolve(__filename):e===void 0?!1:r===(0,tE.fileURLToPath)(e)}});var tu,Cn,SV,jQ,Rn=l(()=>{"use strict";tu="agent-witch.js",Cn="deps.tar.gz",SV="install.sh",jQ={mainScript:`app/${tu}`,depsArchive:`app/${Cn}`,installShell:SV}});var sE=l(()=>{"use strict";Rn()});var iE=l(()=>{"use strict";Rn();sE()});var Ei,xh,ru,AV,Ci,Ce,Tn,Ri,xi,Ao,Th=l(()=>{"use strict";Ei=m(require("node:fs")),xh=m(require("node:path"));iE();V();ru="install-version.json",AV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ci=(e=L())=>xh.default.join(e,ru),Ce=(e=L())=>{let t=Ci(e);if(!Ei.default.existsSync(t))return null;try{let r=JSON.parse(Ei.default.readFileSync(t,"utf8"));return!AV(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Tn=(e,t=L())=>{let r=Ci(t);Ei.default.mkdirSync(xh.default.dirname(r),{recursive:!0}),Ei.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Ri=(e=L())=>Ce(e)?.bundleVersion??"239",xi=(e,t)=>{let r=Ce(e);if(r!==null)return r;let o={bundleVersion:"239",appOrigin:t,updatedAt:new Date().toISOString()};return Tn(o,e),o},Ao=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var aE,bo,Ih,Oh,Mh,ou,Rt,Po,Nh=l(()=>{"use strict";aE=require("node:crypto"),bo=m(require("node:fs")),Ih=m(require("node:path"));V();Oh="self-update-log.ndjson",Mh=100,ou=(e=L())=>{let t=N(),r=t.installDir===e?t.logsDir:Ln({installDir:e,profileEmail:t.profileEmail});return Ih.default.join(r,Oh)},Rt=(e,t=L())=>{let r={id:(0,aE.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=ou(t);bo.default.mkdirSync(Ih.default.dirname(o),{recursive:!0});let n=bo.default.existsSync(o)?bo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Mh+1)),JSON.stringify(r)];return bo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Po=(e=20,t=L())=>{let r=ou(t);if(!bo.default.existsSync(r))return[];let o=bo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var zh,tee,jh=l(()=>{"use strict";Rn();zh="deps",tee=`${"app"}/${Cn}`});var lE=l(()=>{"use strict";jh()});var cE,Er,wo,dE,Dh,$h,uE=l(()=>{"use strict";cE=require("node:child_process"),Er=m(require("node:fs")),wo=m(require("node:path"));Rn();jh();dE=e=>wo.default.join(e,"app",zh),Dh=e=>{let t=wo.default.join(e,"app"),r=wo.default.join(t,Cn);Er.default.existsSync(r)&&(Er.default.rmSync(dE(e),{recursive:!0,force:!0}),Er.default.mkdirSync(t,{recursive:!0}),(0,cE.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Er.default.rmSync(r,{force:!0}))},$h=e=>{Er.default.rmSync(wo.default.join(e,"node_modules"),{recursive:!0,force:!0}),Er.default.rmSync(wo.default.join(e,"package.json"),{force:!0}),Er.default.rmSync(wo.default.join(e,"package-lock.json"),{force:!0})}});var pE=l(()=>{"use strict";lE();uE()});var Yt,nu,mE=l(()=>{"use strict";Yt="https://www.agentwitch.com",nu="wss://www.agentwitch.com/api/agent-witch/ws"});var Ti,Xt,gE=l(()=>{"use strict";Ti="127.0.0.1",Xt=`http://${Ti}:43347`});var Zt=l(()=>{"use strict";mE();gE()});var Ii,su,fE,Fh,bV,hE,Gh,yE,mt,Oi,Mi,Vh,Uh,Bh,Ni,qh,Kh,Jh,In=l(()=>{"use strict";Ii=m(require("node:fs")),su=m(require("node:path")),fE="active-writer-work.json",Fh=new Set,bV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hE=e=>e.profileEmail===null?su.default.join(e.installDir,fE):su.default.join(e.installDir,"profiles",e.profileEmail,fE),Gh=e=>{let t=hE(e);if(!Ii.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Ii.default.readFileSync(t,"utf8"));return!bV(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},yE=(e,t)=>{let r=hE(e);Ii.default.mkdirSync(su.default.dirname(r),{recursive:!0}),Ii.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},mt=e=>Gh(e).activeCount>0,Oi=e=>{let t=Gh(e);yE(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},Mi=e=>{let t=Gh(e),r=Math.max(0,t.activeCount-1);if(yE(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of Fh)o()},Vh=e=>(Fh.add(e),()=>{Fh.delete(e)}),Uh=null,Bh=null,Ni=e=>{Uh=e},qh=e=>{Bh=e},Kh=()=>{let e=Uh;return Uh=null,e},Jh=()=>{let e=Bh;return Bh=null,e}});var Re,Yh=l(()=>{"use strict";Re=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var On,iu,zi,Xh=l(()=>{"use strict";On="qwen2.5:7b",iu="nomic-embed-text",zi="Install Ollama from https://ollama.com/download"});var ji,SE,Zh=l(()=>{"use strict";Xh();ji=()=>`
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
`,SE=()=>`
${ji()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var AE,PV,au,Qh=l(()=>{"use strict";AE=require("node:child_process");V();Zh();PV=e=>new Promise(t=>{let r=(0,AE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:L()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),au=async(e=PV)=>{let t=`${ji()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var Cr,lu,bE,wV,PE,Nn,vV,_V,WV,Mn,vo,_o,wE=l(()=>{"use strict";Cr=m(require("node:fs")),lu=m(require("node:path"));pE();te();V();Rn();Zt();Th();In();Yh();Nh();Qh();bE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wV=e=>{let t=ut(e),r=t===null?N():N(t);if(!Cr.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Cr.default.readFileSync(r.configPath,"utf8"));return!bE(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},PE=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!bE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},Nn=async e=>(await PE(e))?.bundleVersion??null,vV=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=lu.default.join(t,r);Cr.default.mkdirSync(lu.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());Cr.default.writeFileSync(n,s),r.endsWith(".js")&&Cr.default.chmodSync(n,493)},_V=async()=>{yi(),await go()},WV=(e,t)=>e!==null?Re(e):t??Yt,Mn=(e,t)=>({localBundleVersion:t,...e}),vo=async e=>{let t=L(),r=Ce(t),o=r?.bundleVersion??null,n=await au();Rt({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=wV(t),i=WV(s,r?.appOrigin);if(i===null){let d=Mn({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return Rt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await PE(i);if(a===null){let d=Mn({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return Rt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||Ao(o,a.bundleVersion))){let d=Mn({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Rt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let A of a.scripts)await vV(i,t,A);let d=lu.default.join(t,tu);Cr.default.existsSync(d)&&Cr.default.rmSync(d,{force:!0}),Dh(t),$h(t),Tn({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=N(ut(t));if(mt(p)){let A=Mn({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Rt({event:"update_applied",ok:!0,message:A.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),A}await _V();let g=Mn({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Rt({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",g=Mn({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return Rt({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}},_o=()=>{let e=L();return{local:Ce(e),logs:Po(20,e)}}});var vE={};Lt(vE,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>ru,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>zi,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>iu,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>On,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Oh,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Mh,appendAgentWitchSelfUpdateLog:()=>Rt,buildAgentWitchEnsureOllamaShell:()=>ji,buildAgentWitchInstallScriptOllama:()=>SE,buildAgentWitchSelfUpdateStatus:()=>_o,ensureAgentWitchInstallVersionRecorded:()=>xi,ensureAgentWitchOllamaInstalled:()=>au,fetchAgentWitchRemoteInstallBundleVersion:()=>Nn,isRemoteAgentWitchBundleVersionNewer:()=>Ao,readAgentWitchInstallVersion:()=>Ce,readAgentWitchSelfUpdateLogs:()=>Po,resolveAgentWitchAppOriginFromWsUrl:()=>Re,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Ri,resolveAgentWitchInstallVersionPath:()=>Ci,resolveAgentWitchSelfUpdateLogPath:()=>ou,runAgentWitchSelfUpdate:()=>vo,writeAgentWitchInstallVersion:()=>Tn});var tt=l(()=>{"use strict";Th();Nh();wE();Yh();Xh();Zh();Qh()});var ey={};Lt(ey,{buildAgentWitchSelfUpdateStatus:()=>_o,fetchAgentWitchRemoteInstallBundleVersion:()=>Nn,runAgentWitchSelfUpdate:()=>vo});var ty=l(()=>{"use strict";tt()});function zn(e){return(0,_E.createHash)("sha256").update(e.trim()).digest("hex")}var _E,ry=l(()=>{"use strict";_E=require("node:crypto")});var jn,Di,LV,WE,oy,LE=l(()=>{"use strict";jn=m(require("node:fs")),Di=m(require("node:path"));ry();Ee();LV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),WE=e=>{if(!jn.default.existsSync(e))return null;try{let t=JSON.parse(jn.default.readFileSync(e,"utf8"));return!LV(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:zn(t.pairingToken.trim())}catch{return null}},oy=(e=L())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(WE(Di.default.join(e,"config.json")));let n=Di.default.join(e,Gt);if(!jn.default.existsSync(n))return t;for(let s of jn.default.readdirSync(n)){let i=Di.default.join(n,s);jn.default.statSync(i).isDirectory()&&o(WE(Di.default.join(i,"config.json")))}return t}});var ny,kE,cu,$i,Hi,kV,EV,CV,EE,de,ue,du,xt,gt=l(()=>{"use strict";ny=m(require("node:fs")),kE=m(require("node:os")),cu=m(require("node:path")),$i={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Hi=e=>e.trim().length>0,kV=e=>{let t=cu.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},EV=()=>{let e=kE.default.homedir(),t=cu.default.join(e,".local","bin","agent");if(ny.default.existsSync(t))return t;let r=cu.default.join(e,".local","bin","cursor-agent");return ny.default.existsSync(r)?r:$i.cursorCommand},CV=e=>{let t=e.trim();return!Hi(t)||t===$i.cursorCommand?EV():t},EE=(e,t)=>kV(e)?t:["agent",...t],de=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ue=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:Hi(t)?t.trim():$i.claudeCommand,codexCommand:Hi(r)?r.trim():$i.codexCommand,cursorCommand:CV(o),antigravityCommand:Hi(n)?n.trim():$i.antigravityCommand}},du=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:EE(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},xt=(e,t,r,o)=>{let n=t.trim();if(!Hi(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:EE(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",n]}}});var Rr,RV,Dn,xV,$n,uu=l(()=>{"use strict";Rr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,RV=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:Rr(s.inputTokens)+Rr(s.outputTokens)+Rr(s.cacheReadInputTokens)+Rr(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Dn=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=Rr(a.input_tokens)+Rr(a.cache_creation_input_tokens)+Rr(a.cache_read_input_tokens),d=Rr(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:RV(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},xV=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),$n=(e,t)=>{let r=Dn(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??xV(r)}}});var sy,TV,IV,iy,ay=l(()=>{"use strict";sy=e=>e.toLocaleString("en-US"),TV=e=>e<.01?e.toFixed(4):e.toFixed(3),IV=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${TV(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${sy(e.inputTokens)} in / ${sy(e.outputTokens)} out (${sy(e.totalTokens)} total)`,t].join(`
`)},iy=(e,t)=>{if(t===void 0)return e;let r=IV(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var pu,ly=l(()=>{"use strict";pu={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Wo,cy,mu,dy=l(()=>{"use strict";ly();Wo="auto",cy=e=>({value:Wo,label:`Auto (${pu[e]})`}),mu={anthropic:[cy("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[cy("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[cy("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Hn,Fi,uy,Ui=l(()=>{"use strict";ly();dy();Hn=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Wo))return t},Fi=(e,t)=>{let r=Hn(t);return r===void 0?pu[e]:r},uy=e=>{let t=Hn(e);return t===void 0?Wo:t}});var gu,OV,MV,fu,CE=l(()=>{"use strict";gu={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},OV=e=>{let t=gu[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?gu["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?gu["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?gu["gemini-2.0-flash"]:null},MV=(e,t,r)=>{let o=OV(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},fu=e=>{let t=MV(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Fn,NV,zV,jV,hu,RE=l(()=>{"use strict";CE();Fn=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),NV=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Fn(r.input_tokens),n=Fn(r.output_tokens);return o===0&&n===0?null:fu({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},zV=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Fn(r.prompt_tokens),n=Fn(r.completion_tokens);return o===0&&n===0?null:fu({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},jV=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=Fn(r.promptTokenCount),n=Fn(r.candidatesTokenCount);return o===0&&n===0?null:fu({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},hu=(e,t,r)=>e==="anthropic"?NV(t,r):e==="openai"?zV(t,r):jV(t,r)});var DV,py,$V,HV,FV,UV,BV,my,gy=l(()=>{"use strict";Ui();RE();DV=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},py=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Fi(e,t.model)},$V=async e=>{let t=py("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=DV(o);n.length>0&&e.onChunk?.(n);let s=hu("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},HV=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},FV=async e=>{let t=py("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=HV(o);n.length>0&&e.onChunk?.(n);let s=hu("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},UV=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},BV=async e=>{let t=py("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=UV(n);s.length>0&&e.onChunk?.(s);let i=hu("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},my=async e=>{try{return e.provider==="anthropic"?await $V(e):e.provider==="openai"?await FV(e):await BV(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Ke,Bi=l(()=>{"use strict";Ke=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var xE,GV,yu,fy=l(()=>{"use strict";xE=m(require("node:path")),GV="writer-api-secrets.json",yu=e=>xE.default.join(e,GV)});var hy,TE,VV,xr,De,Tr=l(()=>{"use strict";hy=m(require("node:fs"));Ui();fy();TE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),VV=e=>{if(!TE(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=Hn(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},xr=e=>{let t=yu(e);if(!hy.default.existsSync(t))return{};try{let r=JSON.parse(hy.default.readFileSync(t,"utf8"));if(!TE(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=VV(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},De=(e,t)=>xr(e)[t]??null});var xe,Gi=l(()=>{"use strict";xe=e=>e==="api"?"api":"cli"});var IE,we,Lo,Qt=l(()=>{"use strict";IE=m(require("node:path"));Bi();Tr();Gi();we=e=>IE.default.dirname(e),Lo=(e,t)=>{if(xe(e.writerExecutionBackend)!=="api")return!1;let r=Ke(t);if(r===null)return!1;let o=we(e.layout.configPath),n=De(o,r);return n!==null&&n.apiKey.length>0}});var Vi,yy=l(()=>{"use strict";ay();gy();Bi();Tr();Qt();Vi=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Ke(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=we(e.layout.configPath),a=De(i,s);if(a===null){let d=Object.keys(xr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await my({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:iy(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var OE,Un,Sy=l(()=>{"use strict";OE=require("node:child_process");gt();uu();yy();Qt();Un=(e,t,r)=>new Promise(o=>{if(!de(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(Lo(e,t)){Vi(e,t,r).then(o);return}let n=xt(t,r,ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,OE.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=$n(i.join("")),p=a.join("").trim(),g=[d.output.trim(),p].filter(A=>A.length>0).join(`
`);o({exitCode:c??-1,output:g})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var ME=l(()=>{"use strict"});var NE=l(()=>{"use strict";ay();Sy();gy();ME();Tr();Qt()});var zE,jE,DE,$E=l(()=>{"use strict";zE="claude",jE="codex",DE="cursor"});var HE,qV,Ay,qi,Su=l(()=>{"use strict";HE=m(require("node:path"));Zt();Et();qV="ws://localhost:3000/api/agent-witch/ws",Ay=e=>e.replace(/\/$/,""),qi=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return Ay(t);let r=HE.default.basename(e.installDir);if(r===di.production)return nu;let o=e.configWsUrl?.trim()??"";return r===di.localhost?o.length>0?Ay(o):qV:o.length>0?Ay(o):nu}});var JV,by,Py=l(()=>{"use strict";$E();Su();Gi();JV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),by=e=>{if(!JV(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=qi({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??zE,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??jE,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??DE,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:xe(t.writerExecutionBackend),layout:e.layout}}}});var wy,vy,_y=l(()=>{"use strict";wy=m(require("node:fs"));V();Py();vy=e=>{let t=N(e);if(!wy.default.existsSync(t.configPath))return null;try{let r=JSON.parse(wy.default.readFileSync(t.configPath,"utf8")),o=by({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Ki,FE=l(()=>{"use strict";Ki=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var Wy,YV,Ly,UE=l(()=>{"use strict";Wy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),YV=e=>{if(!Wy(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!Wy(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(g=>{if(!Wy(g))return[];let A=typeof g.itemKey=="string"?g.itemKey.trim():"",h=typeof g.relativePath=="string"?g.relativePath:"",y=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return A.length===0||y.length===0?[]:[{itemKey:A,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},Ly=YV});var BE,XV,Au,ky=l(()=>{"use strict";BE=m(require("node:path")),XV=(e,t)=>{let r=t.trim();return BE.default.join(e,"components","store",r.slice(0,2),r)},Au=XV});var GE,ZV,Ey,VE=l(()=>{"use strict";GE=m(require("node:fs"));ky();ZV=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Au(e.installDir,n.contentSha256);GE.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},Ey=ZV});var Ji,Bn,QV,Cy,eq,Ry,xy=l(()=>{"use strict";Ji=m(require("node:fs")),Bn=m(require("node:path"));ky();QV=(e,t)=>Bn.default.join(e.installDir,"runs",t,"overlay"),Cy=(e,t)=>Bn.default.join(QV(e,t),".cursor"),eq=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=Cy(e,t);Ji.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Au(e.installDir,i.contentSha256);if(!Ji.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Bn.default.join(n,c):Bn.default.join(n,i.itemKey);Ji.default.mkdirSync(Bn.default.dirname(d),{recursive:!0}),Ji.default.copyFileSync(a,d)}return{ok:!0}},Ry=eq});var Ty,qE,tq,Yi,KE=l(()=>{"use strict";Ty=m(require("node:fs")),qE=m(require("node:path")),tq=(e,t)=>{let r=qE.default.join(e.installDir,"runs",t);Ty.default.existsSync(r)&&Ty.default.rmSync(r,{recursive:!0,force:!0})},Yi=tq});var rq,Iy,JE=l(()=>{"use strict";xy();rq=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=Cy(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},Iy=rq});var Oy,oq,nq,sq,iq,aq,H,YE=l(()=>{"use strict";Oy=m(require("node:fs"));Su();V();Gi();oq="claude",nq="codex",sq="cursor",iq="agy",aq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H=()=>{let e=N();if(!Oy.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Oy.default.readFileSync(e.configPath,"utf8"));if(!aq(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=qi({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:xe(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:oq,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:nq,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:sq,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:iq,pairingToken:s,layout:e}}catch{return null}}});var bu,XE,ZE=l(()=>{"use strict";bu=m(require("node:fs"));fy();XE=(e,t)=>{let r=yu(e);bu.default.mkdirSync(e,{recursive:!0}),bu.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{bu.default.chmodSync(r,384)}catch{}}});var Pu,QE,My=l(()=>{"use strict";Pu=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},QE=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Pu(t)}});var Xi,lq,Ny,zy,eC=l(()=>{"use strict";Xi=m(require("node:fs"));Tr();ZE();My();Ui();Qt();lq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ny=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=QE(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?Hn(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},zy=e=>{let t=we(e.configPath),r={};if(Xi.default.existsSync(e.configPath))try{let n=JSON.parse(Xi.default.readFileSync(e.configPath,"utf8"));lq(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,Xi.default.mkdirSync(t,{recursive:!0}),Xi.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=Ny(Ny(Ny(xr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);XE(t,o)}});var jy,tC=l(()=>{"use strict";jy={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var Dy,rC=l(()=>{"use strict";Bi();Tr();Qt();Qt();Dy=(e,t)=>{if(Lo(e,t))return!1;let r=Ke(t);if(r===null)return!1;let o=we(e.layout.configPath),n=De(o,r);return n===null||n.apiKey.trim().length===0}});var oC,$y,Hy=l(()=>{"use strict";oC=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},$y=async e=>{let t=oC(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=oC(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var cq,Fy,nC=l(()=>{"use strict";te();_y();Hy();cq=1e4,Fy=()=>$y({listProfileEmails:Vd,readConfig:vy,pollIntervalMs:cq,logWaiting:e=>{console.error(e)}})});var pe=l(()=>{"use strict";Sy();NE();_y();Su();FE();UE();VE();xy();KE();JE();Gi();YE();eC();Tr();Qt();My();Ui();tC();yy();Qt();rC();Bi();Tr();nC();Py();Hy()});var wu,sC,dq,uq,iC,vu,Zi,_u,Qi=l(()=>{"use strict";wu=m(require("node:fs")),sC=m(require("node:path")),dq="wake-port.json",uq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),iC=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,vu=e=>sC.default.join(e,dq),Zi=e=>{let t=vu(e);if(!wu.default.existsSync(t))return null;try{let r=JSON.parse(wu.default.readFileSync(t,"utf8"));if(uq(r)&&iC(r.wakePort))return r.wakePort}catch{return null}return null},_u=(e,t)=>{if(!iC(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=vu(e);wu.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var foe,hoe,yoe,ft,aC,ea=l(()=>{"use strict";Qi();Ee();Qi();foe=dt(),hoe=`${se()}-wake`,yoe=se(),ft=()=>{let e=L(),t=Zi(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return dt()},aC=e=>{let t=L();Zi(t)===null&&_u(t,e)}});var lC=l(()=>{"use strict";ry();te();LE();pe();ea()});var Uy,ta,ra,cC=l(()=>{"use strict";Uy=m(require("node:os"));lC();ta=()=>{let e=ee();return{ok:!0,port:ft(),hostname:Uy.default.hostname(),profileCount:e.length}},ra=()=>{let e=ee(),t=H()?.pairingToken.trim()??"",r=t.length>0?zn(t):null,o=oy();return{hostname:Uy.default.hostname(),port:ft(),tokenHash:r,tokenHashes:o.length>0?o:r!==null?[r]:[],profiles:e.map(n=>({email:n.profileEmail,launchAgentLabel:n.launchAgentLabel}))}}});var By=l(()=>{"use strict";cC()});var dC,uC,pC,Wu,Gn=l(()=>{"use strict";dC="materialization.json",uC="backups",pC=".gitignore",Wu=e=>`harness-set:${e.trim()}`});var mC,gC,Lu,fC=l(()=>{"use strict";mC=m(require("node:crypto")),gC=m(require("node:fs")),Lu=e=>{try{let t=gC.default.readFileSync(e);return mC.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Ir,ko,pq,hC,Gy,yC=l(()=>{"use strict";Ir=m(require("node:fs")),ko=m(require("node:path"));fC();pq=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=ko.default.join(t,n,o);return Ir.default.mkdirSync(ko.default.dirname(s),{recursive:!0}),Ir.default.copyFileSync(r,s),ko.default.relative(e,s).replaceAll("\\","/")},hC=e=>{let t=ko.default.join(e.repoRoot,e.repoRelativeDestination),r=Lu(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(Ir.default.existsSync(t)){let n=Lu(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=pq(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Ir.default.mkdirSync(ko.default.dirname(t),{recursive:!0}),Ir.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Ir.default.mkdirSync(ko.default.dirname(t),{recursive:!0}),Ir.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},Gy=e=>{let t=Lu(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var Vy,SC,ku,qy=l(()=>{"use strict";Vy=m(require("node:fs"));Gn();SC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ku=e=>{if(!Vy.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(Vy.default.readFileSync(e,"utf8"));if(SC(t)&&t.version===1&&SC(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var Or,Eu,AC,bC=l(()=>{"use strict";Or=m(require("node:fs")),Eu=m(require("node:path"));Gn();AC=e=>{let t=new Set(e.setSlugs.map(s=>Wu(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=Eu.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=Eu.default.join(e.repoRoot,i.backupPath);Or.default.existsSync(c)?(Or.default.mkdirSync(Eu.default.dirname(a),{recursive:!0}),Or.default.copyFileSync(c,a),o.push(s)):Or.default.existsSync(a)&&Or.default.rmSync(a,{force:!0})}else Or.default.existsSync(a)&&Or.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var Ky,Cu,Jy=l(()=>{"use strict";Ky=m(require("node:path"));Gn();Cu=e=>({ledgerFilePath:Ky.default.join(e.metaDirPath,dC),backupsDirPath:Ky.default.join(e.metaDirPath,uC)})});var Yy,PC,wC=l(()=>{"use strict";Yy=m(require("node:path")),PC=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return Yy.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return Yy.default.posix.join(s,e,n)}});var Xy,vC,Zy,_C=l(()=>{"use strict";Xy=m(require("node:fs")),vC=m(require("node:path")),Zy=(e,t)=>{Xy.default.mkdirSync(vC.default.dirname(e),{recursive:!0}),Xy.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var Qy,mq,rt,na=l(()=>{"use strict";Qy=m(require("node:os")),mq=e=>{let t=e.trim();return t.startsWith("~/")?`${Qy.default.homedir()}${t.slice(1)}`:t==="~"?Qy.default.homedir():t},rt=mq});var Ru,WC,gq,LC,kC=l(()=>{"use strict";Ru=m(require("node:fs")),WC=m(require("node:path"));Gn();fo();gq=`*
!${Jd}
`,LC=e=>{let t=WC.default.join(e,pC);Ru.default.existsSync(t)||(Ru.default.mkdirSync(e,{recursive:!0}),Ru.default.writeFileSync(t,gq))}});var Eo,ot,Co=l(()=>{"use strict";Eo=m(require("node:path"));fo();na();ot=e=>{let t=rt(e),r=Eo.default.join(t,Nk);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Eo.default.join(r,"rag"),memoryDirPath:Eo.default.join(r,zk),reportsDirPath:Eo.default.join(r,Dk),metaFilePath:Eo.default.join(r,Jd),ragChunksFilePath:Eo.default.join(r,"rag",jk)}}});var Tt,CC,fq,hq,Je,eS=l(()=>{"use strict";Tt=m(require("node:fs")),CC=m(require("node:path"));fo();kC();Co();fq=(e,t)=>{if(Tt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Tt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},hq=e=>{Tt.default.existsSync(e.ragChunksFilePath)||Tt.default.writeFileSync(e.ragChunksFilePath,"");let t=CC.default.join(e.memoryDirPath,kn);Tt.default.existsSync(t)||Tt.default.writeFileSync(t,"")},Je=e=>{let t=ot(e.projectFolderPath);return Tt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Tt.default.mkdirSync(t.ragDirPath,{recursive:!0}),Tt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),LC(t.metaDirPath),fq(t,e),hq(t),{ok:!0,layout:t}}});var RC,xC,TC,IC,xu,Tu=l(()=>{"use strict";RC="components",xC="store",TC="versions",IC="installed.json",xu=e=>`harness-set:${e.trim()}`});var tS,OC,Iu,rS=l(()=>{"use strict";tS=m(require("node:fs")),OC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Iu=e=>{if(!tS.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(tS.default.readFileSync(e,"utf8"));if(OC(t)&&t.version===1&&OC(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var sa,Vn,Ou=l(()=>{"use strict";sa=m(require("node:path"));Tu();Vn=e=>{let t=sa.default.join(e,RC);return{componentsRootDir:t,storeDir:sa.default.join(t,xC),versionsDir:sa.default.join(t,TC),installedFilePath:sa.default.join(t,IC)}}});var oS,MC,Mu,Nu,zu=l(()=>{"use strict";oS=m(require("node:crypto")),MC=m(require("node:fs")),Mu=e=>oS.default.createHash("sha256").update(e,"utf8").digest("hex"),Nu=e=>{try{let t=MC.default.readFileSync(e);return oS.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var nS,NC,zC,jC=l(()=>{"use strict";nS=m(require("node:fs")),NC=m(require("node:path")),zC=(e,t)=>{nS.default.mkdirSync(NC.default.dirname(e),{recursive:!0}),nS.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var sS,iS,DC,$C=l(()=>{"use strict";sS=m(require("node:fs")),iS=m(require("node:path")),DC=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=iS.default.join(e,r),n=iS.default.join(o,`${t.versionId}.json`);sS.default.mkdirSync(o,{recursive:!0}),sS.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var ju,HC,FC,UC=l(()=>{"use strict";ju=m(require("node:fs")),HC=m(require("node:path"));zu();FC=e=>{let t=Mu(e.content),r=HC.default.join(e.storeDir,t);return ju.default.existsSync(r)||(ju.default.mkdirSync(e.storeDir,{recursive:!0}),ju.default.writeFileSync(r,e.content)),t}});var aS,BC,yq,Du,lS=l(()=>{"use strict";aS=m(require("node:fs")),BC=m(require("node:path"));Tu();rS();Ou();zu();jC();$C();UC();yq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Du=e=>{let t=Vn(e.installDir),r=xu(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!yq(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=BC.default.join(e.harnessRootDir,a);if(!aS.default.existsSync(c))continue;let d=aS.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Nu(c);if(p!==null){if(Mu(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);FC({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;DC(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=Iu(t.installedFilePath);zC(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var dS,cS,GC,VC=l(()=>{"use strict";dS=m(require("node:fs"));lS();rS();Ou();cS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GC=e=>{if(!dS.default.existsSync(e.harnessManifestPath))return;let t=Vn(e.installDir),r=Iu(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(dS.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!cS(o)||o.version!==1||!cS(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!cS(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Du({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var uS,qC,KC,JC=l(()=>{"use strict";uS=m(require("node:fs")),qC=m(require("node:path")),KC=e=>{let t=e.componentId.replaceAll("/","_"),r=qC.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!uS.default.existsSync(r))return null;try{let o=JSON.parse(uS.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var $u,Hu,YC,XC=l(()=>{"use strict";$u=m(require("node:fs")),Hu=m(require("node:path"));Tu();VC();JC();Ou();zu();YC=e=>{GC({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Vn(e.layout.installDir),r=xu(e.setSlug),o=KC({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Hu.default.join(t.storeDir,i.contentSha256);if($u.default.existsSync(a)&&Nu(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Hu.default.join(e.layout.harnessRootDir,n):Hu.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!$u.default.existsSync(s))return null;try{if(!$u.default.statSync(s).isFile())return null}catch{return null}return s}});var ZC,Sq,Aq,Mr,Fu=l(()=>{"use strict";qy();Jy();Co();ZC="harness-set:",Sq=e=>{let t=e.trim();if(!t.startsWith(ZC))return null;let r=t.slice(ZC.length).trim();return r.length>0?r:null},Aq=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=Sq(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Mr=e=>{let t=ot(e),{ledgerFilePath:r}=Cu(t),o=ku(r);return Aq(o)}});var Uu,pS,ia,bq,er,aa,qn=l(()=>{"use strict";Uu=m(require("node:fs")),pS=m(require("node:os")),ia=m(require("node:path")),bq=()=>Uu.default.realpathSync(ia.default.resolve(pS.default.homedir())),er=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?ia.default.join(pS.default.homedir(),t.slice(1)):t,o;try{o=Uu.default.realpathSync(ia.default.resolve(r))}catch{return null}let n=bq();return o===n||o.startsWith(`${n}${ia.default.sep}`)?o:null},aa=e=>{let t=er(e);if(t===null)return null;try{if(!Uu.default.statSync(t).isFile())return null}catch{return null}return t}});var mS,gS=l(()=>{"use strict";mS=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Gu,QC,Bu,Pq,la,fS=l(()=>{"use strict";Gu=m(require("node:fs")),QC=m(require("node:path"));Gn();yC();qy();bC();Jy();wC();_C();na();eS();XC();Fu();qn();gS();Bu=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Pq=e=>{if(!Gu.default.existsSync(e))return null;try{let t=JSON.parse(Gu.default.readFileSync(e,"utf8"));if(Bu(t)&&t.version===1)return t}catch{return null}return null},la=e=>{let t=[...new Set(e.setSlugs.map(b=>b.trim()).filter(b=>b.length>0))],r=rt(e.projectFolderPath),o=er(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Gu.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Je({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Cu(s.layout),d=Mr(o).filter(b=>!t.includes(b)),p=ku(i),g=0;if(d.length>0){let b=AC({repoRoot:o,setSlugs:d,ledger:p});p=b.ledger,g=b.summary.removedPaths.length}if(t.length===0)return Zy(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:[]};let A=Pq(e.layout.harnessManifestPath);if(A===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=Bu(A.sets)?A.sets:{},y=0,u=0,S=0;for(let b of t){let f=h[b];if(!Bu(f))return{ok:!1,errorMessage:`Harness set "${b}" is not installed locally.`};let w=typeof f.version=="number"?String(f.version):"1",v=Wu(b),_=Array.isArray(f.items)?f.items:[];for(let k of _){if(!Bu(k))continue;let E=typeof k.path=="string"?k.path.trim():"";if(E.length===0)continue;let x=mS(E);if(x===null)continue;let I=PC(b,x),M=QC.default.posix.join(".cursor",I).replaceAll("\\","/"),X=typeof k.id=="string"?k.id.trim():"",G=YC({layout:e.layout,setSlug:b,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:E,manifestItemId:X});if(G===null)continue;let F=hC({repoRoot:o,backupsDir:a,repoRelativeDestination:M,sourceAbsolutePath:G,componentId:v,versionId:w,ledger:p});if(F.kind==="skipped_unchanged"){u+=1;continue}if(F.kind==="backed_up_user_file"){S+=1,y+=1,p={version:1,entries:{...p.entries,[M]:Gy({componentId:v,versionId:w,sourceAbsolutePath:G,backupPath:F.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[M]:Gy({componentId:v,versionId:w,sourceAbsolutePath:G})}}}}return y===0&&u===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(Zy(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:S,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:t})}});var eR,Vu,wq,vq,_q,Wq,Lq,kq,Eq,Cq,Rq,ca,qu=l(()=>{"use strict";eR=m(require("node:crypto")),Vu=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},wq=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},vq=(e,t)=>{let r=wq(t),o=Vu(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},_q=(e,t,r)=>{let o=vq(t,r);return`shared/items/${e}/${o}`},Wq=["rules","skills","commands","instructions","agents"],Lq=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),kq=(e,t)=>[...e.filter(o=>o.id!==t.id),t],Eq=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},Cq=e=>eR.default.createHash("sha256").update(e,"utf8").digest("hex"),Rq=e=>({id:e.id,kind:e.kind,title:e.title,path:_q(e.id,e.kind,e.title),contentSha256:Cq(e.content)}),ca=e=>{let t=new Date().toISOString(),r=e.existingManifest??Lq(e.hostname,t),o=Vu(e.bundle.slug),n=Eq(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...Wq.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let g=Rq(p);return{files:[...d.files,{relativePath:g.path,content:p.content}],nextItems:kq(d.nextItems,g)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var Nr,tR,Ku,xq,Ro,hS=l(()=>{"use strict";Nr=m(require("node:fs")),tR=m(require("node:os")),Ku=m(require("node:path"));qu();xq=e=>{if(!Nr.default.existsSync(e))return null;try{let t=JSON.parse(Nr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Ro=e=>{try{let t=xq(e.layout.harnessManifestPath),r=ca({bundle:e.bundle,hostname:tR.default.hostname(),existingManifest:t});Nr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)Nr.default.mkdirSync(Ku.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Ku.default.join(e.layout.harnessRootDir,o.relativePath);Nr.default.mkdirSync(Ku.default.dirname(n),{recursive:!0}),Nr.default.writeFileSync(n,o.content)}return Nr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var yS,rR=l(()=>{"use strict";hS();fS();yS=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=Ro({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return la({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var oR,nR=l(()=>{"use strict";oR=["rule","skill","command","instruction","agent"]});var sR,Tq,Iq,It,SS=l(()=>{"use strict";nR();sR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Tq=e=>typeof e=="string"&&oR.includes(e),Iq=e=>{if(!sR(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!Tq(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},It=e=>{if(!sR(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=Iq(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var iR,Oq,AS,aR=l(()=>{"use strict";iR=require("node:zlib");SS();Oq="x-agent-witch-token",AS=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[Oq]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,iR.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=It(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var PS,bS,zr,lR=l(()=>{"use strict";PS=m(require("node:fs")),bS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zr=e=>{if(!PS.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(PS.default.readFileSync(e.harnessManifestPath,"utf8"));if(!bS(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=bS(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!bS(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Ju,cR=l(()=>{"use strict";Ju=()=>"~"});var dR,uR,pR=l(()=>{"use strict";dR=require("node:crypto"),uR=e=>`local-${(0,dR.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var wS,mR=l(()=>{"use strict";wS=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var da,Yu,vS=l(()=>{"use strict";da=m(require("node:path")),Yu=e=>{let t=da.default.dirname(e),r=da.default.basename(t);return r==="agents"?da.default.basename(da.default.dirname(t)):r}});var ua,tr,gR,Mq,Nq,zq,Xu,fR,_S=l(()=>{"use strict";ua=m(require("node:fs")),tr=m(require("node:path"));pR();mR();vS();gR=new Set(["node_modules",".git","dist","build",".next","coverage"]),Mq=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Nq=(e,t)=>{let r=tr.default.basename(t);if(e==="skill"){let o=t.split(tr.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},zq=e=>{let t=[],r=(n,s)=>{let i;try{i=ua.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&gR.has(a.name))continue;let c=tr.default.join(n,a.name),d=s?tr.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;wS(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=tr.default.join(e,n);ua.default.existsSync(s)&&r(s,n)}let o=tr.default.join(e,"skills");return ua.default.existsSync(o)&&r(o,"skills"),t},Xu=e=>{let t=zq(e);if(t.length===0)return null;let r=tr.default.dirname(e),o=Yu(e),n=Mq(o),s=t.map(i=>{let a=wS(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:uR(i.absolutePath),kind:a,title:Nq(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},fR=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=ua.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||gR.has(a.name))continue;let c=tr.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var hR,WS,jq,LS,yR=l(()=>{"use strict";hR=m(require("node:fs")),WS=m(require("node:path"));_S();qn();jq=e=>{let t=er(e.trim());if(t===null)return null;if(WS.default.basename(t)===".cursor")return t;let r=WS.default.join(t,".cursor");try{if(hR.default.statSync(r).isDirectory())return er(r)}catch{return null}return null},LS=e=>{let t=jq(e.projectPath);if(t===null)return null;let r=Xu(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var SR,Dq,Zu,kS,AR=l(()=>{"use strict";SR=m(require("node:path"));_S();qn();vS();Dq=5,Zu=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},kS=e=>{let t=er(e.scanRoot.trim());if(t===null)return Zu(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of fR(t,Dq,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=er(s);if(i===null)continue;let a=Yu(i);Zu(e.response,"folder",{cursorDir:i,groupName:a,repoPath:SR.default.dirname(i)});let c=Xu(i);c!==null&&(r.push(c),Zu(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Zu(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var bR,PR,wR=l(()=>{"use strict";bR=m(require("node:path")),PR=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:bR.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Me,vR,ES,$q,CS,RS,Qu,xS,pa,_R=l(()=>{"use strict";Me=m(require("node:fs")),vR=m(require("node:os")),ES=m(require("node:path"));qu();lS();qn();wR();$q=e=>{if(!Me.default.existsSync(e))return null;try{let t=JSON.parse(Me.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},CS=e=>{let t=e.hostname??vR.default.hostname(),r=$q(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let g=aa(p.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let A=Me.default.readFileSync(g,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:A,setSlugs:[i.slug]})}let d=ca({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Me.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Me.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=ES.default.join(e.layout.harnessRootDir,i.relativePath);Me.default.mkdirSync(ES.default.dirname(a),{recursive:!0}),Me.default.writeFileSync(a,i.content)}Me.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=Vu(i.slug),d=r.sets[c];d!==void 0&&Du({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},RS="reveal-cache.json",Qu=(e,t)=>{Me.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Me.default.writeFileSync(`${e.harnessRootDir}/${RS}`,`${JSON.stringify(t,null,2)}
`)},xS=e=>{let t=`${e.harnessRootDir}/${RS}`;Me.default.existsSync(t)&&Me.default.unlinkSync(t)},pa=e=>{let t=`${e.harnessRootDir}/${RS}`;if(!Me.default.existsSync(t))return null;try{let r=JSON.parse(Me.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return PR(r)}catch{return null}return null}});var xo=l(()=>{"use strict";fS();rR();gS();hS();aR();SS();qu();lR();cR();yR();qn();AR();_R()});var TS,WR=l(()=>{"use strict";xo();Ee();TS=e=>{let t=N(e.profileEmail);return Ro({bundle:e.bundle,layout:t})}});var LR=l(()=>{"use strict";WR();xo()});var Hq,kR,Fq,ER,To,ep,CR=l(()=>{"use strict";Hq=["agentwitch.com","www.agentwitch.com"],kR=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,Fq=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},ER=e=>{let t=Fq(e);return!!(Hq.includes(t)||kR.test(e.trim().toLowerCase()))},To=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return ER(r)?kR.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},ep=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:To(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var ma=l(()=>{"use strict";CR()});var rr,ga=l(()=>{"use strict";rr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var fa,RR=l(()=>{"use strict";LR();ma();ga();fa=e=>{if(!rr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=It(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!To(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=TS({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var IS=l(()=>{"use strict";RR()});var Uq,Kn,OS=l(()=>{"use strict";Uq=e=>e==="hourly"||e==="daily"||e==="weekdays",Kn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!Uq(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var ha,tp,xR,TR,MS,ht,rp,op,np,sp,ip=l(()=>{"use strict";ha=m(require("node:fs")),tp=m(require("node:path"));OS();xR="automations.json",TR=e=>e.profileEmail!==null?tp.default.join(e.installDir,"profiles",e.profileEmail,xR):tp.default.join(e.installDir,xR),MS=()=>({version:1,automations:[]}),ht=e=>{let t=TR(e);if(!ha.default.existsSync(t))return MS();try{let r=JSON.parse(ha.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?MS():{version:1,automations:r.automations.flatMap(n=>{let s=Kn(n);return s!==null?[s]:[]})}}catch{return MS()}},rp=(e,t)=>{let r=TR(e);ha.default.mkdirSync(tp.default.dirname(r),{recursive:!0}),ha.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},op=(e,t)=>{rp(e,{version:1,automations:t})},np=(e,t)=>{let o=ht(e).automations.filter(n=>n.id!==t.id);rp(e,{version:1,automations:[...o,t]})},sp=(e,t)=>ht(e).automations.find(r=>r.id===t)??null});var $e,jr=l(()=>{"use strict";$e="x-agent-witch-token"});var Z,Io,NS,ya,zS,Bq,jS,Sa,Aa,DS,ba=l(()=>{"use strict";jr();tt();Z=e=>{let t=Re(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Io=e=>({[$e]:e,"Content-Type":"application/json"}),NS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Io(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},ya=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Io(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},zS=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Io(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Bq=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},jS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:Io(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Sa=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:Io(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return Bq(r)}catch{return null}},Aa=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:Io(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},DS=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Io(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var Oo,IR,OR,Gq,$S,MR,HS=l(()=>{"use strict";Oo=m(require("node:fs")),IR=m(require("node:path")),OR=e=>IR.default.join(e.harnessRootDir,"projects-registry.json"),Gq=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),$S=e=>{let t=OR(e);if(!Oo.default.existsSync(t))return[];try{let r=JSON.parse(Oo.default.readFileSync(t,"utf8"));return Gq(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},MR=e=>{let t=OR(e);if(!Oo.default.existsSync(t))return;let r=`${t}.migrated`;if(Oo.default.existsSync(r)){Oo.default.unlinkSync(t);return}Oo.default.renameSync(t,r)}});var NR,Vq,qq,zR,jR=l(()=>{"use strict";na();NR=e=>rt(e),Vq=e=>new Set(e.map(t=>NR(t.folderPath))),qq=e=>new Set(e.map(t=>t.id)),zR=(e,t)=>{let r=Vq(t),o=qq(t),n=[],s=new Set;for(let i of e){let a=NR(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var FS,US=l(()=>{"use strict";ba();HS();jR();FS=async(e,t)=>{let r=$S(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Sa(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=zR(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await jS(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&MR(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var BS,Mo,ap=l(()=>{"use strict";BS=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),Mo=(e,t)=>e.find(r=>r.id===t)??null});var Jn,lp=l(()=>{"use strict";ba();US();ap();Jn=async(e,t)=>{t!==void 0&&await FS(t,e);let r=Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Sa(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=BS(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var DR=l(()=>{"use strict"});var Ne,$R,Kq,Jq,Yq,Xq,Yn,GS=l(()=>{"use strict";Ne=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$R=(e,t)=>e.length===0?`<p class="empty">${Ne(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Ne(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Ne(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,Kq=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,Jq=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ne(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,Yq=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?Jq(e.project):Kq();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
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
      </form>`},Xq=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Ne(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Ne(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},Yn=e=>{let t=e.flashError?`<div class="alert-error">${Ne(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ne(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(a,c)=>`<a class="project-tab${e.activeTab===a?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${a}">${Ne(c)}</a>`,n=e.composition?.items.filter(a=>a.kind==="workflow")??[],s=e.composition?.items.filter(a=>a.kind==="agent")??[],i="";return e.activeTab==="harness"?i=Yq({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=$R(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=$R(s,"No agents installed for this project yet."):i=Xq({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount}),`${t}<section class="card">
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
    </section>`}});var Zq,Qq,HR,FR=l(()=>{"use strict";xo();jr();Zq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qq=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!Zq(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=It(n);return s===null?[]:[s]})}catch{return null}},HR=Qq});var UR,VS,BR=l(()=>{"use strict";pe();xo();GS();lp();FR();ap();Fu();ba();UR=e=>({kind:"page",title:e.project.name,body:Yn({project:e.project,installed:zr(e.layout),linkedSetSlugs:Mr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),VS=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=H();if(r===null)return{kind:"not_found"};let o=await Jn(r,e.layout),n=Mo(o.projects,t);if(n===null)return{kind:"not_found"};let s=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s===null?null:await HR(s,n.id);if(i===null)return UR({layout:e.layout,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let a=yS({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:i});if(!a.ok)return UR({layout:e.layout,project:n,errorMessage:a.errorMessage});let c=s===null?!1:await Aa(s,n.id,a.appliedSetSlugs),d=new URLSearchParams({linked:"1",files:String(a.writtenFileCount),bindingsSynced:c?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${d.toString()}`}}});var eK,qS,GR=l(()=>{"use strict";eK=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,qS=eK});var VR,qR,tK,rK,cp,dp,KR=l(()=>{"use strict";VR=require("node:child_process"),qR=require("node:util"),tK=(0,qR.promisify)(VR.execFile),rK=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},cp=async(e,t)=>{try{let{stdout:r}=await tK("git",t,{cwd:e,env:rK(),maxBuffer:1048576});return r.trim()}catch{return null}},dp=async e=>{let t=await cp(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await cp(e,["rev-parse","--abbrev-ref","HEAD"]),o=await cp(e,["status","--porcelain"]),n=await cp(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var KS,JR=l(()=>{"use strict";KS=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var oK,JS,YR=l(()=>{"use strict";oK=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},JS=oK});var nK,YS,XR=l(()=>{"use strict";jr();nK=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[$e]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},YS=nK});var ZR,Dr,QR=l(()=>{"use strict";ZR=require("node:child_process"),Dr=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,ZR.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var ex=l(()=>{"use strict";lp()});var Pa,tx=l(()=>{"use strict";jr();Pa=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[$e]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var yt=l(()=>{"use strict";lp();ap();DR();na();eS();BR();Fu();GR();KR();JR();YR();XR();QR();ex();tx();US();HS();ba()});var up,wa,rx,XS,No,ZS=l(()=>{"use strict";up=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},wa=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=up(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},rx=e=>e>=1&&e<=5,XS=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return up(t,"UTC")},No=e=>{let t=e.from??new Date,r=up(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return wa(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=wa(r,e.timeZone,o,0),s=up(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?wa(XS(r),e.timeZone,o,0):n;if(!i&&rx(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=XS(a),rx(a.weekday))return wa(a,e.timeZone,o,0);return wa(XS(r),e.timeZone,o,0)}});var ox,QS,or,eA=l(()=>{"use strict";ox=require("node:crypto");pe();yt();ZS();ip();QS=!1,or=async e=>{if(QS)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=H();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=sp(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};QS=!0;let n=(0,ox.randomUUID)();try{let s=await Un(t,"claude-cli",o.prompt);await DS(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=No({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return np(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{QS=!1}}});var pp,nx=l(()=>{"use strict";pe();eA();ip();pp=async()=>{let e=H();if(e===null)return;let t=ht(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await or(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var va=l(()=>{"use strict";ip();nx();eA();ZS()});var sx=l(()=>{"use strict";va()});var ix=l(()=>{"use strict";OS()});var ax=l(()=>{"use strict";ix()});var tA=l(()=>{"use strict";va()});var sK,iK,_a,rA=l(()=>{"use strict";sx();ax();tA();Ee();sK=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),iK=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??No({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??No({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},_a=e=>{let t=sK(e.profileEmail),r=ht(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Kn(s);return i!==null?[iK(i,o.get(i.id))]:[]});return op(t,n),{ok:!0,writtenCount:n.length}}});var oA=l(()=>{"use strict";va()});var lx=l(()=>{"use strict";pe()});var cx=l(()=>{"use strict";rA();oA();tA();lx()});var dx,Wa,La,ka,ux=l(()=>{"use strict";dx=m(require("node:os"));cx();ma();ga();Wa=e=>{if(!rr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!To(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=_a({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},La=async e=>{if(!rr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:To(t)?or(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},ka=()=>{let e=H(),t=e!==null?ht(e.layout):{version:1,automations:[]};return{ok:!0,hostname:dx.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var nA=l(()=>{"use strict";ux()});var mp=l(()=>{"use strict";te()});var gp=l(()=>{"use strict";te()});var fp,mx,gx,px,aK,lK,Xn,sA=l(()=>{"use strict";fp=m(require("node:fs")),mx=m(require("node:os")),gx=m(require("node:path"));mp();gp();Qi();Ee();px=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},aK=e=>gx.default.join(mx.default.homedir(),"Library","LaunchAgents",`${e}.plist`),lK=async e=>fp.default.existsSync(aK(e))?(await ke(e)).ok:!1,Xn=async(e=L())=>{let t=fp.default.existsSync(vu(e)),r=!fp.default.existsSync(Vt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Zi(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await px(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${se(e)}-wake`;await lK(i)&&s.push(i);for(let c of ee(e))(await ke(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await px(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var fx=l(()=>{"use strict";te()});var Zn,Ea=l(()=>{"use strict";Zn="connection-health.json"});var zo,hp,cK,Ca,ve,iA,yp,ze,Sp=l(()=>{"use strict";zo=m(require("node:fs")),hp=m(require("node:path"));Ea();cK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ca=e=>e.profileEmail===null?hp.default.join(e.installDir,Zn):hp.default.join(e.installDir,"profiles",e.profileEmail,Zn),ve=e=>{let t=Ca(e);if(!zo.default.existsSync(t))return null;try{let r=JSON.parse(zo.default.readFileSync(t,"utf8"));return!cK(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},iA=e=>{let t=Ca(e);zo.default.existsSync(t)&&zo.default.rmSync(t,{force:!0})},yp=(e,t)=>{let r=Ca(e),o=ve(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};zo.default.mkdirSync(hp.default.dirname(r),{recursive:!0}),zo.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},ze=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var Ra,hx=l(()=>{"use strict";Ea();Sp();Ra=(e,t)=>{if(!t.socketOpen)return!1;let r=ve(e);return r===null?!1:!ze(r,t.staleAfterMs??12e4,t.nowMs)}});var aA,yx=l(()=>{"use strict";Sp();aA=(e,t)=>!(e!==null&&!ze(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Qn=l(()=>{"use strict";Sp();hx();yx();Ea()});var lA=l(()=>{"use strict";Qn();te()});var cA=l(()=>{"use strict";Qn()});var dA=l(()=>{"use strict";te()});var Ax,Sx,xa,uA=l(()=>{"use strict";Ax=m(require("node:fs"));Zt();mp();gp();Ee();Sx=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},xa=async(e=L())=>{if(!Ax.default.existsSync(Vt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await Sx())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of ee(e))(await ke(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await Sx();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var bx=l(()=>{"use strict";te()});var Px,jo,pA,dK,uK,pK,wx,mK,vx,es,Ap=l(()=>{"use strict";Px=require("node:crypto"),jo=m(require("node:fs")),pA=m(require("node:path"));Ee();dK="watchdog-log.ndjson",uK=200,pK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wx=(e=L())=>{let t=N(),r=t.installDir===e?t.logsDir:Ln({installDir:e,profileEmail:t.profileEmail});return pA.default.join(r,dK)},mK=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!pK(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},vx=(e,t=L())=>{let r={id:(0,Px.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=wx(t);jo.default.mkdirSync(pA.default.dirname(o),{recursive:!0});let n=jo.default.existsSync(o)?jo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-uK+1)),JSON.stringify(r)];return jo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},es=(e=20,t=L())=>{let r=wx(t);if(!jo.default.existsSync(r))return[];let o=jo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=mK(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var mA,gA,fA,hA=l(()=>{"use strict";Et();mA=ao.watchdogReinstallState,gA=900*1e3,fA=3e3});var _x=l(()=>{"use strict";hA()});var Wx={};Lt(Wx,{verifyAgentWitchReviveAfterKickstart:()=>fK});var gK,fK,Lx=l(()=>{"use strict";_x();cA();dA();Ee();gK=e=>new Promise(t=>{setTimeout(t,e)}),fK=async e=>{if(await gK(e.verifyDelayMs??fA),!await uo(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),o=ve(r);return!ze(o,e.staleAfterMs)}});var Ta,yA,hK,kx,Ex,SA,AA,bA=l(()=>{"use strict";Ta=m(require("node:fs")),yA=m(require("node:path"));V();hA();hK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kx=e=>yA.default.join(e,mA),Ex=(e=L())=>{let t=kx(e);if(!Ta.default.existsSync(t))return null;try{let r=JSON.parse(Ta.default.readFileSync(t,"utf8"));return!hK(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},SA=(e=L(),t=Date.now())=>{let r=Ex(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=gA:!0},AA=(e=L(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=kx(e);return Ta.default.mkdirSync(yA.default.dirname(o),{recursive:!0}),Ta.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var PA,Cx=l(()=>{"use strict";te();bA();PA=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!SA())return{attempted:!1,ok:!1,targets:e};AA();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await ke(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var Rx=l(()=>{"use strict";bA();Cx()});var wA=l(()=>{"use strict";tt()});var xx=l(()=>{"use strict";tt()});var Tx,ts,Ix,Ox,Mx,yK,SK,Nx,AK,bK,zx,jx=l(()=>{"use strict";Tx=require("node:child_process"),ts=m(require("node:fs")),Ix=m(require("node:os")),Ox=m(require("node:path")),Mx=require("node:util");wA();xx();Ee();yK=(0,Mx.promisify)(Tx.execFile),SK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Nx=e=>{let t=ut(e),r=t===null?N():N(t);if(!ts.default.existsSync(r.configPath))return null;try{let o=JSON.parse(ts.default.readFileSync(r.configPath,"utf8"));return!SK(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},AK=e=>Nx(e)?.wsUrl??null,bK=e=>{let t=AK(e);return t!==null?Re(t):Ce(e)?.appOrigin??null},zx=async e=>{let t=e?.installDir??L(),r=Nx(t),o=r!==null?Re(r.wsUrl):bK(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=Ox.default.join(Ix.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{ts.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??ut(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await yK("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{ts.default.existsSync(i)&&ts.default.unlinkSync(i)}}});var Dx={};Lt(Dx,{attemptAgentWitchWatchdogReinstall:()=>PK});var PK,$x=l(()=>{"use strict";Rx();jx();PK=async e=>PA(e,()=>zx())});var Hx,Fx,Ux,wK,vK,_K,Ia,vA=l(()=>{"use strict";fx();lA();cA();dA();uA();sA();mp();gp();Ee();In();bx();Ap();Hx=e=>e===null?N():N(e),Fx=async(e,t,r)=>{if(!await uo(e))return"not_running";let n=Hx(t);if(mt(n))return"healthy";let s=ve(n);return ze(s,r)?"stale_connection":"healthy"},Ux=async e=>{let t=e?.staleAfterMs??12e4,r=L(),o=ee(r);return Promise.all(o.map(async n=>{let s=await Fx(n.launchAgentLabel,n.profileEmail,t),i=Hx(n.profileEmail),a=ve(i),c=await uo(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:ze(a,t),needsRevive:s!=="healthy",reason:s}}))},wK=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},vK=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",_K=async e=>{let t=await ke(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(Lx(),Wx)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},Ia=async e=>{if(!pt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=L();await Xn(r),await xa(r);let o=ee(r),n=[];for(let p of o){let g=await Fx(p.launchAgentLabel,p.profileEmail,t);if(g==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:g});continue}n.push(await _K({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:g,staleAfterMs:t}))}if(n.length===0){let p=co();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>($x(),Dx)),g=await p(n);s=g.attempted,i=g.ok,a=g.errorMessage,c=[...g.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&vx({event:vK(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:wK(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var Bx,bp,Gx=l(()=>{"use strict";Bx=m(require("node:os"));lA();Ap();vA();bp=async()=>{let e=await Ux(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:Bx.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:es(1)[0]??null}}});var _A=l(()=>{"use strict";sA();vA();Gx();Ap()});var Oa,Ma,Na,Vx=l(()=>{"use strict";te();_A();Oa=async()=>{await Xn();let e=ee(),t=[];for(let r of e){let o=await ke(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=co();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Ma=Ia,Na=Ia});var WA=l(()=>{"use strict";Vx()});var wp,Pp,qx,LA,Kx,WK,LK,kK,EK,CK,vp,Jx=l(()=>{"use strict";wp=require("node:child_process"),Pp=m(require("node:fs")),qx=m(require("node:os")),LA=m(require("node:path")),Kx=require("node:util");te();V();WK=(0,Kx.promisify)(wp.execFile),LK=()=>LA.default.join(qx.default.homedir(),"Library","LaunchAgents"),kK=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await WK("launchctl",["bootout",r]).catch(()=>{})},EK=e=>{let t=LA.default.join(LK(),`${e}.plist`);Pp.default.existsSync(t)&&Pp.default.unlinkSync(t)},CK=e=>{(0,wp.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},vp=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=L();if(!Pp.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=qt(e);for(let r of t)await kK(r),EK(r);return CK(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var Yx,_p,Xx,rs,Zx,RK,xK,TK,kA,IK,EA,Qx=l(()=>{"use strict";Yx=require("node:child_process"),_p=m(require("node:fs")),Xx=m(require("node:os")),rs=m(require("node:path")),Zx=require("node:util");te();RK=(0,Zx.promisify)(Yx.execFile),xK=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],TK=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],kA=e=>{_p.default.existsSync(e)&&_p.default.rmSync(e,{force:!0})},IK=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await RK("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},EA=async e=>{let r=(e.listLaunchAgentLabels??qt)(e.layout.installDir),o=e.launchAgentsDir??rs.default.join(Xx.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??IK;for(let i of r)await n(i),kA(rs.default.join(o,`${i}.plist`));let s=rs.default.dirname(e.layout.configPath);for(let i of xK)kA(rs.default.join(s,i));for(let i of TK)kA(rs.default.join(e.layout.installDir,i));return _p.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var CA,e0=l(()=>{"use strict";CA={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var RA,t0=l(()=>{"use strict";RA="unknown_identity"});var xA=l(()=>{"use strict";e0();t0()});var OK,TA,r0=l(()=>{"use strict";xA();OK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),TA=e=>e.type!=="system.error"||!OK(e.payload)?!1:e.payload.errorCode===RA});var IA=l(()=>{"use strict";Jx();Qx();r0()});var Wp=l(()=>{"use strict";te();tt();IA();_A()});var os,Lp,kp=l(()=>{"use strict";Wp();os=(e=20)=>es(e),Lp=bp});var Ep,ns,Cp,Rp=l(()=>{"use strict";Wp();Ep=_o,ns=(e=20)=>Po(e),Cp=e=>vo(e)});var xp,OA=l(()=>{"use strict";Wp();xp=()=>vp()});var o0=l(()=>{"use strict";By();IS();nA();WA();kp();Rp();OA()});var n0={};Lt(n0,{buildAgentWitchAutomationStatusFromWakeServer:()=>ka,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Ep,buildAgentWitchWakeHealthResponse:()=>ta,buildAgentWitchWakeIdentityResponse:()=>ra,buildAgentWitchWatchdogStatus:()=>Lp,installHarnessFromWakeServer:()=>fa,readAgentWitchSelfUpdateLogEntries:()=>ns,readAgentWitchWatchdogLogEntries:()=>os,restartAgentWitchFromWakeServer:()=>Na,reviveAgentWitchWebSocketFromWakeServer:()=>Ma,runAgentWitchSelfUpdateFromWakeServer:()=>Cp,runAgentWitchUninstallLocalFromWakeServer:()=>xp,runAutomationFromWakeServer:()=>La,syncAutomationsFromWakeServer:()=>Wa,wakeAgentWitchLaunchAgents:()=>Oa});var s0=l(()=>{"use strict";o0()});var i0,a0,MA,NA,l0=l(()=>{"use strict";i0=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),a0=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?i0(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?i0(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},MA=e=>{let t=e.watchdogLogs.map(a0).join(""),r=e.updateLogs.map(a0).join("");return`<!doctype html>
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
</html>`},NA=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var c0,d0,u0=l(()=>{"use strict";c0=m(require("node:net")),d0=()=>new Promise((e,t)=>{let r=c0.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var p0,MK,zA,m0=l(()=>{"use strict";p0=m(require("node:net"));u0();ea();Qi();Ee();MK=e=>new Promise(t=>{let r=p0.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),zA=async()=>{let e=L(),t=ft();if(await MK(t))return aC(t),t;let r=await d0();return _u(e,r),r}});var NK,jA,g0=l(()=>{"use strict";NK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jA=e=>({force:NK(e)&&e.force===!0})});var za=l(()=>{"use strict";ma();l0();m0();g0();_h();eu();yo()});var DA,j,$A,HA,ja,f0=l(()=>{"use strict";DA=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},$A=e=>{e.writeHead(403),e.end()},HA=e=>e.url?.split("?")[0]??"/",ja=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var St=l(()=>{"use strict";f0()});var zK,h0,y0=l(()=>{"use strict";nA();St();zK=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},h0=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,ka(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await zK(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=Wa(t);return j(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await La(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var jK,A0,S0,b0,FA,P0,UA=l(()=>{"use strict";jK=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],A0=e=>/embed|minilm|^bge-/i.test(e),S0=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),b0=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),FA=e=>e.filter(t=>t.trim().length>0&&!A0(t)),P0=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!A0(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>S0(s,o));if(n!==void 0)return n}for(let n of jK){let s=r.find(i=>S0(i,n));if(s!==void 0)return s}return r[0]??null}});var BA,_0,W0,Tp,L0,w0,v0,DK,$K,HK,FK,UK,BK,At,Da=l(()=>{"use strict";BA=require("node:child_process"),_0=m(require("node:fs")),W0=m(require("node:os")),Tp=m(require("node:path"));tt();gt();UA();L0=3e3,w0=["claude-cli","codex","cursor","antigravity"],v0={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},DK=(e,t)=>new Promise(r=>{let o=(0,BA.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},L0);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),$K=()=>{let e=W0.default.homedir();return["ollama",Tp.default.join(e,".local","bin","ollama"),Tp.default.join(e,".agent-witch","ollama","ollama"),Tp.default.join(e,".local-agent-witch","ollama","ollama")]},HK=e=>new Promise(t=>{let r=(0,BA.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},L0);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(b0(Buffer.concat(o).toString("utf8")))})}),FK=async()=>{for(let e of $K()){if(e!=="ollama"&&!_0.default.existsSync(e))continue;let t=await HK(e);if(t!==null)return t}return[]},UK=e=>{let t=e.installedWriterIds.map(s=>v0[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=de(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${v0[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},BK=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:On},At=async e=>{let t=w0.map(i=>{let a=du(i,e.commands);return DK(a.command,a.args)}),[r,...o]=await Promise.all([FK(),...t]),n=w0.flatMap((i,a)=>o[a]===!0?[i]:[]),s=P0(r,BK());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:UK({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var GK,VK,GA,k0=l(()=>{"use strict";GK="http://127.0.0.1:11434",VK=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},GA=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||GK;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?VK(await o.json()):null}catch{return null}}});var VA=l(()=>{"use strict";gt();Da();k0();UA()});var qK,E0,C0=l(()=>{"use strict";VA();qK={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},E0=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:qK[t]})),ollamaModels:FA(e.ollamaModels)})});var KK,R0,x0=l(()=>{"use strict";VA();St();C0();KK=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},R0=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await At({commands:ue({})});return j(e.response,200,{ok:!0,...E0({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await KK(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await GA({model:r,prompt:o});return n===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var JK,T0,I0=l(()=>{"use strict";IS();St();JK=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},T0=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await JK(e);if(t===null)return!0;let r=fa(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var O0=l(()=>{"use strict";yt()});var qA,M0=l(()=>{"use strict";O0();ga();qA=e=>{if(!rr(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Je({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var N0,KA,JA=l(()=>{"use strict";pe();yt();ga();N0=e=>{if(!rr(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},KA=async e=>{let t=N0(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Dr("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=H();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=Z({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Je({projectFolderPath:r}),await Pa(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var z0=l(()=>{"use strict";M0();JA()});var j0,D0=l(()=>{"use strict";z0();JA();St();j0=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=qA(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await KA(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,o,r,e.cors.headers),!0}return!1}});var $0,H0=l(()=>{"use strict";za();Rp();kp();$0=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=os(50),r=ns(50);return e.response.writeHead(200,NA()),e.response.end(MA({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var F0,U0=l(()=>{"use strict";By();St();F0=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,ta(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,ra(),e.cors.headers),!0):!1});var B0,G0=l(()=>{"use strict";OA();St();B0=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await xp();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var V0,q0=l(()=>{"use strict";WA();St();V0=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Ma();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Na();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Oa();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var K0,J0=l(()=>{"use strict";za();Rp();St();K0=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Ep();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=ja(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:ns(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=jA(t),o=await Cp({force:r});return j(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var Y0,X0=l(()=>{"use strict";kp();St();Y0=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await Lp();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=ja(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:os(t)},e.cors.headers),!0}return!1}});var Z0,Q0=l(()=>{"use strict";y0();x0();I0();D0();H0();U0();G0();q0();J0();X0();Z0=[F0,$0,Y0,V0,K0,B0,T0,j0,h0,R0]});var eT,tT=l(()=>{"use strict";Q0();eT=async e=>{for(let t of Z0)if(await t(e))return!0;return!1}});var YK,rT,oT=l(()=>{"use strict";ma();St();tT();YK=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:HA(e),readJsonBody:()=>DA(e)}),rT=async(e,t,r)=>{let o=e.headers.origin,n=ep(o);try{if(o!==void 0&&o.length>0&&!n.allowed){$A(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=YK(e,t,r,n);if(await eT(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var nT,Do,Ip,Op=l(()=>{"use strict";nT=m(require("node:http"));za();oT();Do=async()=>{let e=await zA(),t=nT.default.createServer((r,o)=>{rT(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Ip=Do});var sT={};Lt(sT,{runAgentWitchBridgeCli:()=>XK});var XK,iT=l(()=>{"use strict";te();Op();XK=async()=>{Ve("agent-witch-bridge");let e=await Do(),t=Jt(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var aT=l(()=>{"use strict";Zt()});var ss,YA,lT=l(()=>{"use strict";ss=(e,t,r)=>e===1?t:r,YA=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${ss(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${ss(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${ss(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${ss(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${ss(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${ss(p,"year","years")} ago`}});var $o,XA,ZK,QK,ZA,$r,$a,QA,cT=l(()=>{"use strict";$o=m(require("node:fs")),XA=m(require("node:path")),ZK="local-ws-traffic.ndjson",QK=500,ZA=e=>XA.default.join(e.logsDir,ZK),$r=(e,t)=>{let r=ZA(e);$o.default.mkdirSync(XA.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});$o.default.appendFileSync(r,`${o}
`,"utf8")},$a=(e,t=QK)=>{let r=ZA(e);if(!$o.default.existsSync(r))return[];let n=$o.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},QA=e=>{let t=ZA(e);$o.default.existsSync(t)&&$o.default.writeFileSync(t,"","utf8")}});var e8,dT,uT,pT=l(()=>{"use strict";xA();e8=new Set(Object.values(CA)),dT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),uT=e=>{if(!dT(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!e8.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!dT(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var mT,gT=l(()=>{"use strict";mT=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var t8,r8,o8,Ha,fT=l(()=>{"use strict";gT();t8=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,r8=e=>t8.test(e),o8=e=>mT(e),Ha=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>Ha(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&r8(o)){r[o]=o8(n);continue}r[o]=Ha(n)}return r}});var Ot,eb,n8,s8,i8,tb,hT,yT,ST,a8,Mp,Ho,Np,rb,AT=l(()=>{"use strict";Ot=m(require("node:fs")),eb=m(require("node:path"));pT();fT();n8="local-ws-trace.ndjson",s8=1e4,i8=1440*60*1e3,tb=e=>eb.default.join(e.logsDir,n8),hT=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},yT=e=>{if(!Ot.default.existsSync(e))return;let t=Ot.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-i8,n=t.filter(s=>{let i=hT(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-s8);Ot.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},ST=(e,t)=>{let r=tb(e);Ot.default.mkdirSync(eb.default.dirname(r),{recursive:!0}),Ot.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),yT(r)},a8=e=>e.parsed===null?{_empty:!0}:Ha(e.parsed),Mp=(e,t,r)=>{let o=uT(r);ST(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:a8(o)})},Ho=(e,t)=>{ST(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Ha({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Np=(e,t=80)=>{let r=tb(e);if(yT(r),!Ot.default.existsSync(r))return[];let o=Ot.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=hT(s);i!==null&&n.push(i)}return n.reverse()},rb=e=>{let t=tb(e);Ot.default.existsSync(t)&&Ot.default.writeFileSync(t,"","utf8")}});var Hr,bT,l8,ob,zp,PT=l(()=>{"use strict";Hr=m(require("node:fs")),bT=m(require("node:path")),l8=256e3,ob=e=>{Hr.default.mkdirSync(bT.default.dirname(e),{recursive:!0}),Hr.default.writeFileSync(e,"","utf8")},zp=(e,t=l8)=>{if(!Hr.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Hr.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=Hr.default.openSync(e,"r");try{Hr.default.readSync(a,i,0,s,n)}finally{Hr.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var Fa=l(()=>{"use strict";cT();AT();PT()});var nb,sb,wT=l(()=>{"use strict";nb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sb=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${nb(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${nb(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
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
    </section>`}});var vT=l(()=>{"use strict";wT()});var ib,ab=l(()=>{"use strict";ib=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var lb=l(()=>{"use strict";Ea()});var cb,db,_T=l(()=>{"use strict";lb();cb=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},db=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var WT=l(()=>{"use strict";ab();_T()});var LT,Ua,ub,Ba=l(()=>{"use strict";ab();LT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ua=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=LT(e),r=LT(ib(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},ub=`(function () {
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
})();`});var Fo,c8,pb,kT=l(()=>{"use strict";Fo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),c8=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},pb=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Fo(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Fo(r.direction):Fo(r.kind),i=`trace-body-${o}`,a=Fo(c8(r.body));return`<tr>
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
    </section>`});var CT,ET,mb,RT=l(()=>{"use strict";CT=m(require("node:path"));V();Zt();ET=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mb=e=>{let t=se(e.installDir),o=`AW_HOME="$HOME/${CT.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${ET(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${ET(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var xT=l(()=>{"use strict";Ba();kT();RT();Ba()});var d8,nr,Ga=l(()=>{"use strict";d8=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),nr=d8});var TT,IT,OT,MT,NT,zT,jT,is=l(()=>{"use strict";TT="projects",IT="knowledge",OT="chunks.ndjson",MT="lessons.ndjson",NT="error-chunks.ndjson",zT="usage-stats.json",jT="knowledge-location.json"});var jp,u8,Dp,gb=l(()=>{"use strict";jp=m(require("node:path"));is();u8=(e,t)=>{let r=t.trim(),o=jp.default.join(e.installDir,TT,r,IT);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:jp.default.join(o,OT),memoryRunsFilePath:jp.default.join(o,MT)}},Dp=u8});var fb,p8,DT,$T=l(()=>{"use strict";fb=m(require("node:fs"));is();Co();p8=e=>{let t=ot(e.projectFolderPath),r=`${t.metaDirPath}/${jT}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};fb.default.mkdirSync(t.metaDirPath,{recursive:!0}),fb.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},DT=p8});var as,FT,HT,m8,UT,BT=l(()=>{"use strict";as=m(require("node:fs")),FT=m(require("node:path"));fo();Co();gb();$T();HT=(e,t)=>{as.default.existsSync(e)&&(as.default.existsSync(t)&&as.default.statSync(t).size>0||(as.default.mkdirSync(FT.default.dirname(t),{recursive:!0}),as.default.copyFileSync(e,t)))},m8=e=>{let t=ot(e.projectFolderPath),r=Dp(e.layout,e.projectId),o=`${t.memoryDirPath}/${kn}`;HT(t.ragChunksFilePath,r.ragChunksFilePath),HT(o,r.memoryRunsFilePath),DT({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},UT=m8});var hb,g8,GT,VT=l(()=>{"use strict";hb=m(require("node:fs"));Co();g8=e=>{let t=ot(e);if(!hb.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(hb.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},GT=g8});var qT,f8,ls,$p=l(()=>{"use strict";qT=m(require("node:path"));fo();Co();BT();VT();gb();f8=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=GT(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){UT({layout:e.layout,projectFolderPath:t,projectId:o});let s=Dp(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=ot(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:qT.default.join(n.memoryDirPath,kn),projectId:null}},ls=f8});var Hp,y8,Fp,yb=l(()=>{"use strict";Hp=m(require("node:fs"));is();y8=(e,t=500)=>{if(!Hp.default.existsSync(e))return;let r=Hp.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Hp.default.writeFileSync(e,`${o.join(`
`)}
`)},Fp=y8});var Up,S8,Uo,Sb=l(()=>{"use strict";Up=m(require("node:path"));is();$p();S8=e=>{let t=ls(e);if(t===null)return null;let r=Up.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Up.default.join(r,zT),errorChunksFilePath:Up.default.join(r,NT)}},Uo=S8});var JT,Va,YT,KT,Ab,XT,P8,bb,ZT,Pb,wb,vb,_b=l(()=>{"use strict";JT=require("node:crypto"),Va=m(require("node:fs")),YT=m(require("node:path"));Ga();is();Sb();KT=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),Ab=e=>{if(!Va.default.existsSync(e))return KT();try{let t=JSON.parse(Va.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return KT()},XT=(e,t)=>{Va.default.mkdirSync(YT.default.dirname(e),{recursive:!0}),Va.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},P8=e=>{let t=nr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,JT.createHash)("sha256").update(o).digest("hex").slice(0,16)},bb=e=>{let t=Uo(e);return t===null?null:Ab(t.usageStatsFilePath)},ZT=e=>{if(e.chunkIds.length===0)return;let t=Uo(e);if(t===null)return;let r=Ab(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;XT(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},Pb=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=Uo(e);if(r===null)return null;let o=P8(t),n=Ab(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return XT(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},wb=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,vb=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var qa,QT,w8,v8,eI,_8,Wb,Ka,cs,Lb,ds,kb,Eb=l(()=>{"use strict";qa=m(require("node:fs")),QT=m(require("node:path"));Ga();$p();yb();_b();w8="http://127.0.0.1:11434",v8="nomic-embed-text",eI=(e,t,r)=>ls({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,_8=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},Wb=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},Ka=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||w8,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||v8;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},cs=(e,t,r)=>{let o=eI(e,t,r);if(o===null||!qa.default.existsSync(o))return[];let n=qa.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},Lb=async e=>{let t=nr(e.text),r=Wb(t);if(r.length===0)return 0;let o=eI(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;qa.default.mkdirSync(QT.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await Ka(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};qa.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return Fp(o),n},ds=async e=>{let t=await Ka(e.query);if(t===null)return[];let r=e.minScore??0,s=cs(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:_8(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return ZT({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},kb=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Ja,tI,W8,L8,Cb,Rb,xb,rI=l(()=>{"use strict";Ja=m(require("node:fs")),tI=m(require("node:path"));Ga();Sb();yb();Eb();W8=e=>{if(!Ja.default.existsSync(e))return[];let t=Ja.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},L8=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},Cb=async e=>{let t=Uo(e);if(t===null)return 0;let r=nr(e.text),o=Wb(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;Ja.default.mkdirSync(tI.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await Ka(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};Ja.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Fp(n,200),s},Rb=async e=>{let t=Uo(e);if(t===null)return[];let r=await Ka(e.query);if(r===null)return[];let o=e.minScore??.3;return W8(t.errorChunksFilePath).map(s=>({chunk:s,score:L8(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},xb=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Tb=l(()=>{"use strict";Eb();_b();rI()});var Ib,oI=l(()=>{"use strict";Ib={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var nI=l(()=>{"use strict";oI()});var he,Ob,Mb=l(()=>{"use strict";nI();he=Ib,Ob=`
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
`.trim()});var k8,E8,Nb,sI,zb,iI=l(()=>{"use strict";Mb();Ba();k8=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,E8=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],Nb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sI=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${k8}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,zb=e=>{let t=E8.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=Nb(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=Nb(e.installBundleVersionLabel?.trim()??"unknown"),s=sI("brand brand-in-sidebar",n),i=sI("brand brand-in-header",n);return`<!DOCTYPE html>
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
    </div>`}});var jb,Db,$b,aI=l(()=>{"use strict";jb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
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
    </section>`,$b=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var lI=l(()=>{"use strict";iI();Gp();aI()});var us,Hb,cI=l(()=>{"use strict";Ba();us=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hb=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${us(e.wakeError)}</div>`:"",a=Ua(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
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
    </div>`}});var dI=l(()=>{"use strict";cI()});var Vp,qp,Kp,uI,Fb=l(()=>{"use strict";Vp="support-reply",qp="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",Kp=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),uI=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Jp,pI,mI=l(()=>{"use strict";Fb();Jp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pI=()=>`<section class="card">
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
      <pre class="mono">${Jp(uI)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Jp(Vp)}">Run this sample</a>
      </div>
    </section>`});var C,ps=l(()=>{"use strict";C=e=>e==="passed"||e==="stopped"||e==="failed"});var gI,Ub,Bo,Bb,Xa=l(()=>{"use strict";gI="Stopped at the round limit. The best prompt is kept.",Ub="Stopped because the score stopped rising. The best prompt is kept.",Bo="Finished. The best prompt is the result.",Bb="Wizard ended. Progress from finished steps is kept."});var Fr,Gb=l(()=>{"use strict";Fr=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var C8,R8,Za,fI,Yp=l(()=>{"use strict";C8=/\n+|;\s+/,R8=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,Za=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(C8).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,R8(s)]},[]);return[...t,...o]},[]),fI=e=>{let t=Za(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ie,ms=l(()=>{"use strict";ie=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Qa,Vb=l(()=>{"use strict";Yp();ms();Qa=e=>{let t=[...e.priorRounds,e.current],r=ie(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:fI(o)}}});var qb,x8,T8,Xp,Kb=l(()=>{"use strict";qb={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},x8=e=>{try{let t=JSON.parse(e.fragment);return{...qb,objects:[...e.objects,t]}}catch{return{...qb,objects:e.objects}}},T8=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:x8(r)},Xp=e=>[...e].reduce(T8,qb).objects});var I8,Jb,O8,hI,Yb=l(()=>{"use strict";Kb();I8=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},Jb=e=>{let t=Xp(e).filter(I8),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},O8=(e,t)=>({...e,passed:e.score>=t}),hI=(e,t)=>{let r=Jb(e);return r===null?null:O8(r,t)}});var Xb,Zb,Zp=l(()=>{"use strict";Xb="The judge reply needs a score and a reason.",Zb="The improver reply was empty."});var yI,SI=l(()=>{"use strict";yI=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var AI,bI=l(()=>{"use strict";AI=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var N8,PI,wI=l(()=>{"use strict";SI();bI();Xa();Yp();N8=e=>{let t=Za(e);return t.length===0?Ub:`${Ub} Avoid: ${t.join("; ")}.`},PI=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:gI};if(yI(e.scores)>=3){let t=e.scores.map((r,o)=>({score:r,reasons:e.reasons?.[o]??""}));return{type:"stopped",errorMessage:N8(AI(t))}}return null}});var Ur,z8,Go,vI,Qp=l(()=>{"use strict";Ur=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},z8=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,Go=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",z8(e.tokens),`Delay: ${Ur(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},vI=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var j8,_I,WI=l(()=>{"use strict";Yb();j8=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,_I=e=>{let r=(j8.exec(e)?.[1]??e).trim();return r.length===0||Jb(r)!==null?null:r}});var LI,em,kI=l(()=>{"use strict";Qp();WI();Zp();LI=e=>({type:"call",role:"judge",choice:e.choice,prompt:vI({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),em=e=>{let t=_I(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:Zb}}:{nextPrompt:t,continuation:LI({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var Qb,EI=l(()=>{"use strict";Gb();Vb();Yb();Zp();Xa();wI();Zp();kI();Qb=e=>{let t=hI(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:Xb}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=PI({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=Qa({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:Fr({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var el,eP=l(()=>{"use strict";el=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var CI=l(()=>{"use strict"});var RI=l(()=>{"use strict"});var D8,xI,TI=l(()=>{"use strict";D8=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},xI=e=>[...e].reduce(D8,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var $8,II,OI=l(()=>{"use strict";$8=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},II=e=>[...e].reduce($8,{out:"",inString:!1,escaped:!1}).out});var H8,F8,MI,NI=l(()=>{"use strict";TI();OI();H8=e=>e.charCodeAt(0)===65279?e.slice(1):e,F8=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},MI=e=>II(xI(F8(H8(e))))});var U8,B8,G8,zI,V8,Vo,tl=l(()=>{"use strict";Kb();NI();U8=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},B8=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},G8=e=>[...e].reduce(B8,{out:"",inString:!1,escaped:!1}).out,zI=e=>{let t=Xp(e);return t.length===0?null:t[t.length-1]},V8=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Vo=e=>{let t=MI(U8(e)),r=zI(t);if(r!==null)return r;let o=G8(t),n=zI(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw V8(i)}}});var jI=l(()=>{"use strict";Xa();tl()});var DI=l(()=>{"use strict"});var $I=l(()=>{"use strict";DI()});var qo,HI=l(()=>{"use strict";qo=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var q8,rP,FI=l(()=>{"use strict";Qp();q8=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,rP=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",q8(e.tokens),`Delay: ${Ur(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var K8,J8,Y8,oP,UI=l(()=>{"use strict";K8=/[A-Za-z0-9_./~-]{3,180}/g,J8=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,Y8=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||J8.test(t)},oP=(e,t=12)=>{let r=[];for(let o of e.matchAll(K8)){let n=o[0].replace(/\.+$/,"");if(!(!Y8(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var rl,BI=l(()=>{"use strict";rl=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var tm,nP,GI,ol,sP=l(()=>{"use strict";tm=e=>Math.floor(e/2),nP=e=>Math.max(tm(e)+1,e-20),GI=(e,t)=>e>=t?"passes":e>=nP(t)?"close":e>=tm(t)?"weak":"bad",ol=e=>[{band:"bad",label:`0\u2013${tm(e)-1} bad`},{band:"weak",label:`${tm(e)}\u2013${nP(e)-1} weak`},{band:"close",label:`${nP(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var rm,iP=l(()=>{"use strict";sP();rm=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${GI(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var bt,aP=l(()=>{"use strict";bt=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var VI,qI=l(()=>{"use strict";VI=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var X8,Z8,KI,JI=l(()=>{"use strict";ps();iP();aP();qI();X8=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],Z8=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",KI=e=>{let t=e.wizard;if(t===void 0)return[];let r=bt(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=X8.map((h,y)=>{let u=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:h,state:u,detail:null}}).filter((h,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=rm(e),d=c.filter(h=>h.id==="round-0"),p=VI(t)&&(!n||a)?c.filter(h=>h.id!=="round-0"):[],g=C(e.status)&&!s,A=g?[{id:"end",label:Z8(e),state:"done",detail:e.errorMessage}]:[];if(g&&A.length>0){let h=Math.min(r,i.length),y=i.slice(0,h).map(u=>({...u,state:"done"}));return[...d,...y,...A,...p]}return[...d,...i,...p,...A]}});var Q8,lP,YI=l(()=>{"use strict";ps();iP();JI();Q8=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",lP=e=>{if(e.wizard!==void 0)return KI(e);let t=rm(e),r=C(e.status)?[{id:"end",label:Q8(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var nl,XI=l(()=>{"use strict";nl=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var ZI=l(()=>{"use strict";Zt()});var QI,sl,il,fs,om,cP,eO=l(()=>{"use strict";ZI();QI="/prompt-optimizer/agent",sl=`${Xt}${QI}`,il=`${Xt}/prompt-optimizer`,fs="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",om=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${fs}`,cP="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var sr=l(()=>{"use strict"});var re,al=l(()=>{"use strict";sr();re=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var dP,tO=l(()=>{"use strict";dP="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var rO,oO=l(()=>{"use strict";rO=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var ll,sO=l(()=>{"use strict";oO();sr();ll=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:rO(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null})});var uP,iO=l(()=>{"use strict";sr();uP=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null})});var pP,aO=l(()=>{"use strict";sr();pP=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var lO,cl,cO=l(()=>{"use strict";lO=["generalize","evaluate","separate","optimize_modules"],cl=(e,t)=>{let r=lO.indexOf(t);if(r===-1)return e;let o=lO.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var nm,mP=l(()=>{"use strict";Yp();nm=e=>{let t=Za(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var dl,dO=l(()=>{"use strict";mP();dl=e=>{let t=nm(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var t4,r4,o4,uO,pO=l(()=>{"use strict";t4=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),r4=/^\{\{[a-zA-Z0-9_-]+\}\}$/,o4=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(t4(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},uO=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>r4.test(n)?n:o4(n,r)).join("")}});var gP,mO=l(()=>{"use strict";pO();gP=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:uO(o.prompt,t)}))}))});var n4,ul,gO=l(()=>{"use strict";sr();mP();n4=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),ul=e=>{let t=nm(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=n4(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var pl,fO=l(()=>{"use strict";eP();pl=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return el({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var ml,hP=l(()=>{"use strict";ms();ml=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ie(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var yP,hO=l(()=>{"use strict";hP();yP=e=>{let t=ml({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Ko,yO=l(()=>{"use strict";Ko=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var s4,i4,oe,sm=l(()=>{"use strict";al();s4=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},i4=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,oe=e=>{let t=re(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:s4(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>i4(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var SO,AO=l(()=>{"use strict";al();sm();SO=e=>{let t=oe(e.wizard),r=re(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var SP,bO=l(()=>{"use strict";AO();SP=e=>{let t=SO({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var a4,l4,AP,PO,wO=l(()=>{"use strict";a4=/^[a-z0-9][a-z0-9-]{0,62}$/,l4=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return a4.test(t)?t:""},AP=e=>e.replace(/\s+/gu," ").trim(),PO=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=l4(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=AP(n.name),a=AP(n.description),c=AP(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var vO,_O,WO=l(()=>{"use strict";vO=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},_O=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var bP,LO=l(()=>{"use strict";tl();wO();WO();bP=(e,t)=>{let r=(()=>{try{return Vo(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(vO(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(_O).filter(a=>a!==null),i=PO({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var PP,kO=l(()=>{"use strict";PP=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var wP,EO=l(()=>{"use strict";wP=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var vP,CO=l(()=>{"use strict";al();sm();vP=e=>{let t=oe(e.wizard),r=re(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var _P,RO=l(()=>{"use strict";_P=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var Pt,c4,WP,xO=l(()=>{"use strict";Pt=m(ci());tl();c4=(0,Pt.isType)({name:Pt.isNonEmptyString,description:Pt.isString,sampleValue:Pt.isString}),WP=e=>{let t=Vo(e);if(!(0,Pt.isType)({templatedPrompt:Pt.isNonEmptyString,variables:(0,Pt.isArrayWithEachItem)(c4)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var ae,d4,u4,LP,TO=l(()=>{"use strict";ae=m(ci());sr();tl();d4=(0,ae.isType)({id:ae.isNonEmptyString,title:ae.isNonEmptyString,prompt:ae.isNonEmptyString,order:ae.isNumber}),u4=(0,ae.isType)({id:ae.isNonEmptyString,title:ae.isNonEmptyString,summary:ae.isString,topology:(0,ae.isOneOf)("chain","parallel"),modules:(0,ae.isArrayWithEachItem)(d4),recommended:ae.isBoolean}),LP=e=>{let t=Vo(e);if(!(0,ae.isType)({options:(0,ae.isArrayWithEachItem)(u4)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var hs,IO=l(()=>{"use strict";hs=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var p4,kP,EP=l(()=>{"use strict";p4=/\{\{([a-zA-Z0-9_-]+)\}\}/g,kP=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(p4,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var wt,vt,OO=l(()=>{"use strict";ms();EP();wt=e=>kP(e.templatedPrompt,e.variables),vt=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ie(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??wt(e.wizard)}});var m4,Jo,MO=l(()=>{"use strict";m4=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Jo=(e,t)=>e.replace(m4,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var g4,Yo,im=l(()=>{"use strict";g4=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Yo=e=>{let t=new Set,r=[];for(let o of e.matchAll(g4)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var gl,NO=l(()=>{"use strict";im();gl=e=>e.variables.length>0||Yo(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var CP,RP=l(()=>{"use strict";sr();CP=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var fl,zO=l(()=>{"use strict";ms();RP();fl=e=>{let t=e.wizard.evaluateSelectedRound??ie(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:CP(r.judgement,e.passScore)}});var hl,jO=l(()=>{"use strict";hl=e=>e.length===1&&e[0].modules.length===1});var xP,DO=l(()=>{"use strict";xP=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var ye,am,yl=l(()=>{"use strict";ye=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),am=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var $O,HO=l(()=>{"use strict";yl();$O=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[ye("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),ye("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[ye("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var FO,UO=l(()=>{"use strict";ps();yl();FO=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!C(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[ye("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),ye("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),ye("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",am(e.writerLabel,e.folder)),ye("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[ye("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var BO,GO=l(()=>{"use strict";yl();BO=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[ye("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),ye("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[ye("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var VO,qO=l(()=>{"use strict";yl();VO=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[ye("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),ye("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",am(e.writerLabel,e.folder)),...r?[ye("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var lm,KO=l(()=>{"use strict";ps();HO();UO();GO();qO();lm=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(C(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return FO(r);case"evaluate":return $O({...r,currentRound:e.currentRound});case"separate":return VO(r);case"optimize_modules":return BO({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Sl,ar,JO=l(()=>{"use strict";Sl=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),ar=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var f4,cm,TP,YO=l(()=>{"use strict";im();f4="wizardParam_",cm=e=>`${f4}${e}`,TP=e=>{let t=Yo(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=cm(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var Xe,XO=l(()=>{"use strict";Xe=["generalize","evaluate","separate","optimize_modules"]});var R=l(()=>{"use strict";ps();Xa();EI();Gb();Qp();eP();CI();RI();jI();$I();HI();FI();UI();Vb();BI();ms();YI();aP();sP();XI();eO();sr();al();tO();sO();iO();aO();cO();dO();mO();gO();fO();hP();hO();yO();sm();bO();LO();kO();EO();CO();RO();xO();TO();IO();OO();EP();MO();im();NO();zO();jO();RP();DO();KO();JO();YO();XO()});var IP,um,h4,QO,eM=l(()=>{"use strict";IP=m(require("node:fs")),um=m(require("node:path")),h4=e=>um.default.join(um.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),QO=(e,t)=>{let r=h4(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;IP.default.mkdirSync(um.default.dirname(r),{recursive:!0}),IP.default.appendFileSync(r,o,"utf8")}});var ys,tM,y4,rM,S4,oM,Mt,K,nM,D,Ze=l(()=>{"use strict";ys=m(require("node:fs")),tM=m(require("node:path"));R();eM();y4=e=>e.wizard===void 0?e:{...e,wizard:uP(e.wizard)},rM=new Set,S4=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),oM=(e,t)=>{ys.default.mkdirSync(tM.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;ys.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),ys.default.renameSync(r,e)},Mt=e=>{if(!ys.default.existsSync(e))return[];try{let t=JSON.parse(ys.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(S4).map(y4):[]}catch{return[]}},K=(e,t)=>Mt(e).find(r=>r.id===t)??null,nM=(e,t)=>{rM.add(t);let r=Mt(e).filter(o=>o.id!==t);oM(e,r)},D=(e,t)=>{if(rM.has(t.id))return;let r=Mt(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];oM(e,o),QO(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var sM,pm,OP,Zo,MP,Qe,Qo,le,He=l(()=>{"use strict";sM=m(require("node:fs")),pm=m(require("node:os")),OP=m(require("node:path"));yt();Zo="~",MP=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Qe=e=>{let t=pm.default.homedir(),r=MP(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Qo=e=>{let t=e.trim().length===0?"~":e.trim(),r=rt(t),o=OP.default.isAbsolute(r)?MP(r):MP(OP.default.resolve(pm.default.homedir(),r));try{if(!sM.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:Qe(o)}},le=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:pm.default.homedir()});var Al=l(()=>{"use strict";gt();Da();uu()});var A4,iM,aM=l(()=>{"use strict";Al();A4=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,iM=e=>{let t=Dn(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(A4)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var b4,P4,lM,mm,cM,w4,nt,dM,uM,pM,Br=l(()=>{"use strict";Al();aM();b4="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",P4="The writer waited on terminal input and did not return a prompt.",lM=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,mm=e=>{let t=e.trim();if(t.length===0||t.length>=500||!lM.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>lM.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},cM=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},w4=e=>mm(e.stdout)??mm(e.stderr)??(cM(e.replyFile)?mm(e.replyFile):null),nt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return b4;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?P4:null},dM=e=>{let t=e.trim();return t.length===0?null:nt(t)!==null?t:mm(t)??(cM(t)?t:null)},uM=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],pM=e=>{let t=e.replyFileText?.trim()??"",r=nt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=w4({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null)return{ok:!1,errorMessage:o};let n=iM([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Dn(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply."}}});var Ss,Nt,bl,mM,gm,v4,gM,fM,hM,NP=l(()=>{"use strict";Ss=m(require("node:fs")),Nt=m(require("node:path")),bl=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},mM=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),gm=(e,t)=>{let r=bl(e);return r.length>0?r:bl(t)},v4=e=>{let t=gm(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${mM(o)}`,...n.length>0?[`description: ${mM(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},gM=e=>`.cursor/skills/${e}/SKILL.md`,fM=(e,t)=>{let r=bl(t);if(r.length===0)return!1;let o=Nt.default.resolve(e),n=Nt.default.resolve(o,".cursor","skills"),s=Nt.default.resolve(o,gM(r));return s.startsWith(`${n}${Nt.default.sep}`)?Ss.default.existsSync(s):!1},hM=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(gm(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Nt.default.resolve(e.workingDirectory);try{if(!Ss.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=v4({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=gM(r.slug),n=Nt.default.resolve(t,".cursor","skills"),s=Nt.default.resolve(t,o);if(!s.startsWith(`${n}${Nt.default.sep}`))return{ok:!1,errorCode:"path"};if(Ss.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Ss.default.mkdirSync(Nt.default.dirname(s),{recursive:!0}),Ss.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var _4,yM,SM,AM=l(()=>{"use strict";R();R();Ze();He();Br();NP();_4=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,yM=e=>{let t=e.get("savedSkill");return t!==null&&_4.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},SM=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=K(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!C(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ie(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||nt(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=hM({workingDirectory:le(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var Gr,Pl=l(()=>{"use strict";R();Gr=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=xP(t);return{...e,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Sl(r.variables)},updatedAt:new Date().toISOString()}}});var Vr,wl=l(()=>{"use strict";Vr=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var T,W4,fm,ne,en,PM,bM,wM,vM,Se=l(()=>{"use strict";T="manual",W4=["claude-cli","codex","cursor","antigravity"],fm={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ne=e=>e===T?"You":e in fm?fm[e]:e,en=e=>W4.filter(t=>e.includes(t)),PM=e=>{let t=en(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},bM=(e,t)=>t===T?T:e.find(r=>r===t)??null,wM=(e,t,r)=>{let o=en(e),n=bM(o,t),s=bM(o,r);return n===null||s===null?null:{judge:n,improver:s}},vM=(e,t,r)=>{let o=en(e);return t===null||t.trim()===""?r!==T?r:o[0]??null:t===T?null:o.find(n=>n===t)??null}});var zP,_M,WM=l(()=>{"use strict";zP={ok:!1,errorMessage:"Stopped.",stopped:!0},_M=(e,t,r)=>{if(t===void 0)return;let o=()=>{e.kill("SIGTERM"),r(zP)};if(t.aborted){o();return}t.addEventListener("abort",o,{once:!0})}});var LM,vl,kM,jP,L4,k4,E4,Fe,As=l(()=>{"use strict";LM=require("node:child_process"),vl=m(require("node:fs")),kM=m(require("node:os")),jP=m(require("node:path"));Al();WM();Br();L4=["claude-cli","codex","cursor","antigravity"],k4=18e4,E4=e=>L4.includes(e),Fe=e=>new Promise(t=>{if(e.signal?.aborted){t(zP);return}if(!E4(e.writerAgent)){t({ok:!1,errorMessage:"The writer did not reply."});return}let r=e.writerAgent,o=xt(r,e.prompt,ue({}));if(o===null){t({ok:!1,errorMessage:"The writer did not reply."});return}if(!vl.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=jP.default.join(vl.default.mkdtempSync(jP.default.join(kM.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),s=uM({writerAgent:r,baseArgs:o.args,replyPath:n}),i=[],a=[],c={settled:!1,timer:void 0},d=(0,LM.spawn)(o.command,[...s],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),p=g=>{c.settled||(c.settled=!0,clearTimeout(c.timer),t(g))};_M(d,e.signal,p),c.timer=setTimeout(()=>{d.kill("SIGTERM"),p({ok:!1,errorMessage:"The writer did not reply."})},e.timeoutMs??k4),d.stdout.on("data",g=>{i.push(Buffer.from(g))}),d.stderr.on("data",g=>{a.push(Buffer.from(g))}),d.on("error",()=>p({ok:!1,errorMessage:"The writer did not reply."})),d.on("close",()=>{let g=vl.default.existsSync(n)?vl.default.readFileSync(n,"utf8"):null;p(pM({writerAgent:r,stdout:Buffer.concat(i).toString("utf8"),stderr:Buffer.concat(a).toString("utf8"),replyFileText:g}))})})});var EM,C4,_l,hm,ym=l(()=>{"use strict";R();Se();EM=e=>e===T?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},C4=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),_l=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=Qb({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:EM(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:rl(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=C4(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i}},hm=(e,t,r=null)=>{let o=em({raw:t,judge:EM(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Sm,DP=l(()=>{"use strict";Sm=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var xM,Am,bm,CM,RM,$P,R4,TM,HP,x4,IM,T4,I4,OM,MM=l(()=>{"use strict";xM=require("node:child_process"),Am=m(require("node:fs")),bm=m(require("node:path"));R();CM=4e3,RM=12e3,$P=(e,t)=>{let r=(0,xM.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},R4=e=>$P(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",TM=e=>{let t=$P(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},HP=(e,t)=>{let r=bm.default.resolve(e,t),o=bm.default.relative(e,r);if(o.startsWith("..")||bm.default.isAbsolute(o)||!Am.default.existsSync(r)||!Am.default.statSync(r).isFile())return null;let n=Am.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>CM?`${n.slice(0,CM)}
\u2026truncated`:n},x4=e=>e.length>RM?`${e.slice(0,RM)}
\u2026truncated`:e,IM=e=>{let t=oP(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,HP(e.workingDirectory,n)])),o=R4(e.workingDirectory);return{git:o,status:o?TM(e.workingDirectory):{},files:r,paths:t}},T4=(e,t)=>{let r=$P(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=HP(e,t);return o===null?`${t} is missing.`:o},I4=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",OM=e=>{let t=e.before.git?TM(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=HP(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>T4(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:I4(e.before.git,e.before.paths.length>0),evidence:x4(i.join(`

`))}}});var BP,U,GP,We,NM,O4,M4,zM,bs,jM,Ps,N4,z4,Wl,FP,UP,j4,DM,D4,$4,H4,$M,F4,HM,FM,U4,B4,UM,BM=l(()=>{"use strict";BP=require("node:child_process"),U=m(require("node:fs")),GP=m(require("node:os")),We=m(require("node:path")),NM=8e6,O4=16e6,M4=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],zM=(e,t)=>{let r=(0,BP.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},bs=(e,t)=>(0,BP.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,jM=e=>{let t=zM(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},Ps=(e,t)=>{let r=We.default.resolve(e,t),o=We.default.relative(e,r);return o.startsWith("..")||We.default.isAbsolute(o)?null:r},N4=(e,t)=>{let r=Ps(e,t);if(r===null||!U.default.existsSync(r))return null;let o=U.default.statSync(r);return!o.isFile()||o.size>NM?null:U.default.readFileSync(r)},z4=(e,t,r)=>{let o=Ps(e,t);o!==null&&(U.default.mkdirSync(We.default.dirname(o),{recursive:!0}),U.default.writeFileSync(o,r))},Wl=(e,t)=>{let r=Ps(e,t);r===null||!U.default.existsSync(r)||U.default.rmSync(r,{recursive:!0,force:!0})},FP=(e,t)=>bs(e,["cat-file","-e",`HEAD:${t}`]),UP=e=>{let t=zM(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},j4=e=>We.default.resolve(e)!==We.default.resolve(GP.default.homedir()),DM=e=>{if(!U.default.existsSync(e))return 0;let t=U.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?U.default.readdirSync(e).reduce((r,o)=>r+DM(We.default.join(e,o)),0):0},D4=(e,t,r)=>{let o=Ps(e,r);if(o===null||!U.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(DM(o)>O4)return{relativePath:r,existed:!0,copyDir:null};let n=We.default.join(t,"cache",r);return U.default.mkdirSync(We.default.dirname(n),{recursive:!0}),U.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},$4=400,H4=32e6,$M=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!U.default.existsSync(s)))for(let i of U.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=We.default.join(s,i),c=U.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>NM)){if(t.length>=$4||r+c.size>H4){o=!1;return}r+=c.size,t.push(We.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},F4=(e,t,r)=>{let o=Ps(e,r);if(o===null||!U.default.existsSync(o))return null;let n=N4(e,r);if(n===null)return"skip";let s=We.default.join(t,"files",r);return U.default.mkdirSync(We.default.dirname(s),{recursive:!0}),U.default.writeFileSync(s,n),s},HM=e=>{let t=U.default.mkdtempSync(We.default.join(GP.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?jM(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:$M(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,F4(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?UP(e.workingDirectory):null,isolateCaches:j4(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:M4.map(i=>D4(e.workingDirectory,t,i))}},FM=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Wl(e.workingDirectory,t);return}z4(e.workingDirectory,t,U.default.readFileSync(r))}},U4=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?FM(e,t):FP(e.workingDirectory,t)?bs(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Wl(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&FP(e.workingDirectory,t)&&bs(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!FP(e.workingDirectory,t)&&bs(e.workingDirectory,["reset","-q","HEAD","--",t])},B4=(e,t)=>{let r=Ps(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Wl(e.workingDirectory,t.relativePath),U.default.mkdirSync(We.default.dirname(r),{recursive:!0}),U.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Wl(e.workingDirectory,t.relativePath);return}if(U.default.existsSync(r))for(let o of U.default.readdirSync(r)){let n=We.default.join(r,o);U.default.statSync(n).mtimeMs>=e.startedMs-1e3&&U.default.rmSync(n,{recursive:!0,force:!0})}}}},UM=e=>{try{if(e.git){if(UP(e.workingDirectory)!==e.head&&(!(e.head===null?bs(e.workingDirectory,["update-ref","-d","HEAD"]):bs(e.workingDirectory,["reset","--hard",e.head]))||UP(e.workingDirectory)!==e.head))throw new Error("head");let r=jM(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))U4(e,o)}else{if(e.complete)for(let t of $M(e.workingDirectory).paths)e.files[t]===void 0&&Wl(e.workingDirectory,t);for(let t of Object.keys(e.files))FM(e,t)}for(let t of e.caches)B4(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{U.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Pm,wm,G4,V4,q4,K4,J4,GM,Y4,VM,qM=l(()=>{"use strict";R();ym();DP();MM();BM();Se();He();As();Pm=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),wm=e=>({...e,status:"stopped",errorMessage:Bo,judgePhase:void 0,updatedAt:new Date().toISOString()}),G4=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),V4=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==T?t:e.improverModel!==T?e.improverModel:null}return e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null},q4=async e=>{let t=le(e.cycle),r=IM({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=HM({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?pl({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Ko(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):el({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=await Fe({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal}),a=i.ok?OM({workingDirectory:t,before:r,writerReply:i.text}):null,c=UM(o);return i.ok?!c.ok||a===null?{ok:!1,cycle:Pm(e.cycle,c.ok?"Could not put the folder back after the run.":c.errorMessage)}:{ok:!0,run:{output:i.text.trim(),tokens:i.tokens,delayMs:Date.now()-n,lookedAt:a.lookedAt,evidence:a.evidence}}:i.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:wm(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Pm(e.cycle,i.errorMessage)})},K4=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:q4({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),J4=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),GM=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Fe({writerAgent:e.reviewer,workingDirectory:le(e.cycle),prompt:rP({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:wm(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},Y4=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===T)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Fe({writerAgent:t.judgeModel,workingDirectory:le(t),prompt:qo({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{..._l(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?wm(o):(e.onWriterFailure?.(t.judgeModel),Pm(o,n.errorMessage))},VM=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return Y4(e);let o=V4(t),n=await K4({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?G4(t,n.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===T){let p=await GM({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...J4(s,p.text),judgePhase:void 0}}let i=await Fe({writerAgent:t.judgeModel,workingDirectory:le(t),prompt:Go({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?wm(s):(e.onWriterFailure?.(t.judgeModel),Pm(s,i.errorMessage));let a=await GM({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=_l(s,i.text,c);return Sm(d,a.text)}});var tn,vm=l(()=>{"use strict";R();tn=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Qa({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:rl(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var _m,X4,Z4,VP,KM=l(()=>{"use strict";R();ym();qM();vm();Se();He();As();_m=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),X4=e=>({...e,status:"stopped",errorMessage:Bo,updatedAt:new Date().toISOString()}),Z4=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?X4(e):(n?.(r),_m(e,t.errorMessage)),VP=async(e,t,r,o)=>{let n=e.revisions.find(c=>c.roundNumber===e.currentRound);if(n===void 0)return _m(e,"This round has no prompt.");if(e.status==="judging")return VM({cycle:e,revision:n,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return _m(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===T)return e;let s=tn(e);if(s===null)return _m(e,"The improver needs the score and the reason.");let i=await Fe({writerAgent:e.improverModel,workingDirectory:le(e),prompt:Fr({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r}),a=Z4(e,i,e.improverModel,r,t);return a!==null?a:hm(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var Ll,qP=l(()=>{"use strict";Ll=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var km,Wm,JM,Q4,e3,Lm,YM,XM,t3,r3,rn,ZM,QM,kl=l(()=>{"use strict";R();Pl();wl();Se();He();As();KM();qP();km=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),Wm=(e,t,r)=>e.wizard===void 0||t===null?km(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},JM=e=>{let t=e.wizard;return t===void 0||Ll(e).length===0?e:{...e,wizard:hs({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},Q4=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",e3=e=>{let t=e.wizard;if(t===void 0)return e;let r=ml({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:hs({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Lm=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),YM=e=>e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null,XM=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},t3=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=YM(e);if(n===null)return km(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??wt(o),i=dl({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:XM(e,"generalize")}),a=await Fe({writerAgent:n,prompt:i,workingDirectory:le(e),signal:t});if(!a.ok)return r?.(n),Wm(e,"generalize",a.errorMessage);try{let c=WP(a.text),d=hs({wizard:{...o,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Sl(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return gl(d)?rn({...p,wizard:{...d,gate:null}}):Lm(p,"generalize")}catch(c){return Wm(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},r3=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=YM(e);if(n===null)return km(e,"Choose a writer to suggest splits.");let s=vt({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=ul({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:XM(e,"separate")}),a=await Fe({writerAgent:n,prompt:i,workingDirectory:le(e),signal:t});if(!a.ok)return r?.(n),Wm(e,"separate",a.errorMessage);try{let c=LP(a.text),d=gP(c,o.variables),p=hs({wizard:{...o,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),g={...e,wizard:p};return hl(d)?Gr(g,d[0]):Lm(g,"separate")}catch(c){return Wm(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},rn=e=>{let t=e.wizard;if(t===void 0)return e;let r=wt(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},ZM=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return km(e,"This module is missing.");let n=ar(r),s=Jo(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==T?e.runnerModel:e.judgeModel!==T?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:re(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},QM=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return VP(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return t3(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return r3(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await VP(e,t,r,o);if(C(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Ll(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let g=ie(s.revisions.map(A=>({roundNumber:A.roundNumber,promptText:A.promptText,score:A.judgement?.score??0,reasons:A.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:g}}}if(i==="evaluate"&&fl({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let p=JM(Lm(a,i));return Vr(p)}let c=Lm(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=yP({wizard:{...c.wizard,modules:c.wizard.modules.map((g,A)=>A===c.wizard.currentModuleIndex&&g.status==="running"?{...g,status:"paused"}:g)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:Q4(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?JM(d):e3(d)}return s}return n.phase==="complete",e}});var ws,Em=l(()=>{"use strict";R();Se();ws=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:PP(r,e.judgeModel===T),updatedAt:new Date().toISOString()}}});var eN,vs,Cm=l(()=>{"use strict";Br();eN=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:dM(e.promptText)},vs=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t===void 0?null:eN(t);if(r!==null)return r.trim();for(let o=e.revisions.length-1;o>=0;o-=1){let n=eN(e.revisions[o]);if(n!==null)return n.trim()}return null}});var zt,_s=l(()=>{"use strict";zt='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var KP,tN,o3,rN,oN,JP=l(()=>{"use strict";R();Se();He();_s();KP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tN=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',o3=e=>{let t=tN(e.state),r=`<h2>${KP(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${KP(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${zt}</button></div><template>${r}</template></li>`},rN=e=>{let t=e.wizard;if(t===void 0)return"";let r=lm({status:e.status,wizard:t,writerLabel:ne(e.judgeModel),runnerLabel:ne(e.runnerModel??e.judgeModel),folderDisplay:Qe(le(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(o3).join("")}</ol>`},oN=e=>{let t=e.wizard;if(t===void 0)return"";let r=lm({status:e.status,wizard:t,writerLabel:ne(e.judgeModel),runnerLabel:ne(e.runnerModel??e.judgeModel),folderDisplay:Qe(le(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${tN(n.state)}<span class="sdlc-pipeline-label">${KP(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var _t,nN,sN,iN,YP=l(()=>{"use strict";R();_t=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nN="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",sN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${_t(nN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${_t(i.name)}}}</strong> \u2014 ${_t(i.description)} (sample: ${_t(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${_t(r)}</pre>`,n=wt(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${_t(n)}</pre>`;return`${t}${o}${s}`},iN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${_t(nN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${_t(n.name)}}}</strong> \u2014 ${_t(n.description)} (sample: ${_t(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${_t(r)}</pre>`;return`${t}${o}`}});var aN,lN=l(()=>{"use strict";R();aN=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=qo({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=Go({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var XP,Rm,ZP=l(()=>{"use strict";_s();lN();XP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Rm=e=>{let t=aN(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${XP(r)}">${zt}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${XP(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${XP(t)}</pre></template>`}});var xm,Ws,QP=l(()=>{"use strict";qP();ZP();xm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ws=e=>{let t=Ll(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${xm(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,p=e.cycle.revisions.map(g=>{let A=g.judgement?.score,h=A==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${A}`,y=g.judgement?.reasons?.trim()??"",u=y.length===0?"":`<br><span class="muted">${xm(y)}</span>`,S=Rm({cycle:e.cycle,roundNumber:g.roundNumber,promptText:g.promptText,run:g.run});if(e.interactive){let b=e.selectedRound===g.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${b}> <span class="sdlc-wizard-revision-title">${xm(h)}</span></label>${S}${u}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${xm(h)}</span>${S}${u}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var ew,cN,dN,uN,tw=l(()=>{"use strict";ew=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cN=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${ew(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${ew(t.prompt)}</pre></li>`).join("")}</ol>`,dN=e=>cN([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),uN=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${ew(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${cN(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var El,n3,Tm,rw=l(()=>{"use strict";R();tw();El=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),n3=e=>{let t=e.wizard;return t===void 0?"":vt({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},Tm=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=n3(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${El(n.orchestratorSkill.fileName)}</code> \u2014 ${El(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${El(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=dN(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${El(r)} <span class="muted">${El(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Te,s3,i3,a3,l3,Im,c3,d3,u3,p3,m3,g3,Ls,Om=l(()=>{"use strict";R();JP();YP();QP();ZP();rw();Te=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),s3={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},i3=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Te(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Te(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Te(o)}</pre></details>`;return`<h2>${Te(e)}</h2>${n}`},a3=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=wt(t).trim(),n=vt({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!C(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${i3("What is being evaluated",i)}`},l3=(e,t)=>{let r=e.wizard;if(r===void 0||C(e.status))return"";let o=s3[t];return o===void 0||r.phase!==o?"":oN(e)},Im=(e,t,r)=>{let o=l3(e,t),n=t==="wizard-2"?a3(e):"";return`${o}${n}${r}`},c3=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},d3=e=>{let t=e.wizard;return t===void 0?"":sN(t)},u3=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Te(a)}</span>`,d=Rm({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Te(s)}${i}</span>${d}${c}</li>`}).join("")}</ul>`,p3=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Ws({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=c3(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${u3(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=vt({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Te(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Te(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},m3=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Te(n.title)}</strong> <span class="muted">(${Te(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Te(o.title)}</strong>${n}${Te(s)}${Tm(e,o)}</li>`}).join("")}</ul>`},g3=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Te(i)}</span> <strong>${Te(n.title)}</strong>${Te(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Te(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Ws({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},Ls=(e,t)=>{switch(t){case"wizard-1":return Im(e,t,d3(e));case"wizard-2":return Im(e,t,p3(e));case"wizard-3":return Im(e,t,m3(e));case"wizard-4":return Im(e,t,g3(e));default:return""}}});var f3,h3,pN,mN,gN=l(()=>{"use strict";R();Cm();Br();Om();f3=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},h3=e=>{let t=e.goal.trim();return t.length===0?null:t},pN=(e,t,r,o,n)=>{let s=nt(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},mN=(e,t)=>{let r=h3(e);if(t.id.startsWith("wizard-")){let s=Ls(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=nl(e,t);if(s!==null){let a=vs(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ie(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:pN(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:f3(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:pN(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var on,fN,hN=l(()=>{"use strict";on=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fN=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${on(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${on(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${on(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${on(n)}</h2><pre class="mono">${on(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${on(e.goal)}</dd></div></dl>`;return`<h2>${on(e.title)}</h2>${i}${t}${r}${o}${s}`}});var ow,yN,SN,qr,AN,ks=l(()=>{"use strict";R();Ze();ow=new Map,yN=e=>{let t=new AbortController;return ow.set(e,t),t.signal},SN=e=>{ow.delete(e)},qr=e=>{ow.get(e)?.abort()},AN=(e,t)=>{let r=K(e,t);return r===null||r.wizard!==void 0?!1:(C(r.status)||(D(e,{...r,status:"stopped",errorMessage:Bo,updatedAt:new Date().toISOString()}),qr(t)),!0)}});var y3,S3,nw,A3,b3,P3,bN,PN,sw=l(()=>{"use strict";R();kl();Em();Pl();wl();ks();y3=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),S3=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||C(e.status))return null;let r=bt(t);return r<0||r>3?null:`wizard-${r+1}`},nw=(e,t)=>y3.has(t)?S3(e)===t:!1,A3=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),b3=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ie(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},P3=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=oe(o);return ws({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},bN=(e,t)=>{if(!nw(e,t))return e;qr(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return rn({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return Vr(b3(r));if(t==="wizard-3"){let n=o.splitOptions[0]??A3(o.templatedPrompt);return Gr(r,n)}return t==="wizard-4"?P3(r):e},PN="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var w3,Mm,iw=l(()=>{"use strict";w3='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Mm=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${w3}</button>`});var v3,wN,_3,aw,vN,W3,L3,k3,E3,_N,WN=l(()=>{"use strict";R();vm();v3={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},wN=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},_3=e=>v3[e]??null,aw=(e,t)=>{let r=e.wizard,o=_3(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=bt(r);return o<n||o===n},vN=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},W3=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:wt(t).trim();return o.length===0?null:dl({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:wN(e,"generalize")})},L3=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=tn(e);return n===null?null:Fr({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=vN(e)?.promptText.trim()??vt({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:qo({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},k3=e=>{let t=e.wizard;if(t===void 0)return null;let r=vt({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:ul({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:wN(e,"separate")})},E3=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=ar(t),s=Jo(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=tn(e);return c===null?null:Fr({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=vN(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||C(e.status)&&i?.judgement!==null)?Go({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):pl({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:Ko(t,r).output,moduleTitle:o.title})},_N=(e,t)=>{if(!aw(e,t))return null;switch(t){case"wizard-1":return W3(e);case"wizard-2":return L3(e);case"wizard-3":return k3(e);case"wizard-4":return E3(e);default:return null}}});var C3,Nm,lw=l(()=>{"use strict";R();C3=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},Nm=(e,t)=>{let r=e.wizard,o=C3(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=bt(r);return o<n?"done":o===n&&C(e.status)&&e.status==="failed"?"failed":o<=n&&C(e.status)?"done":"pending"}});var R3,Es,zm=l(()=>{"use strict";_s();WN();lw();R3=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Es=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(Nm(e,t)==="pending")return""}else if(!aw(e,t))return"";let o=_N(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${zt}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${R3(o)}</pre></template>`}});var nn,Cs,Cl=l(()=>{"use strict";nn=e=>e.toLocaleString("en-US"),Cs=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var jt,x3,LN,kN,EN,CN,cw=l(()=>{"use strict";R();gN();hN();sw();iw();_s();Cm();JP();zm();Cl();jt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),x3=(e,t)=>{let r=nl(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?Cs(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${nn(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${jt(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${jt(r)}</span>`:"",d=fN(mN(t,e)),p=t.wizard!==void 0&&t.wizard.phase==="complete"&&C(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${jt(e.id)}"`:"",g=nw(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${jt(PN)}"><input type="hidden" name="cycleId" value="${jt(t.id)}"><input type="hidden" name="wizardStepId" value="${jt(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",A=e.state==="active"&&e.id.startsWith("wizard-")?rN(t):"",h=o?"failed":e.state,y=o?vs(t):null,u=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${zt}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${jt(y)}</pre></template>`:"",S=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?Es(t,e.id):"";return`<li class="sdlc-node sdlc-node-${h}" data-sdlc-step-id="${jt(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${p} data-sdlc-node>${n}<span class="sdlc-node-label">${jt(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${g}${S}${u}</div></div>${A}<template>${d}</template></li>`},LN=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>x3(r,t)).join("")}</ol>`,kN=e=>`<div class="sdlc-score" aria-label="What the score means">${ol(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${jt(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,EN=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${Mm({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,CN=`<script>
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
</script>`});var Kr,RN,T3,xN=l(()=>{"use strict";R();He();Br();NP();Kr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RN=e=>{if(!C(e.status))return"";let t=ie(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=nt(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Kr(t.reasons.trim())}</p>`,i=n===null?T3({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:le(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${Kr(n)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${o}${s}${i}</section>`},T3=e=>{let t=e.sourceSkill?.fileName??bl(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=gm(t,r),s=n.length>0&&fM(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Kr(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Kr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Kr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Kr(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Kr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Kr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var TN,IN=l(()=>{"use strict";TN=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var ON,I3,jm,Ue,Dm,dw=l(()=>{"use strict";R();R();Se();IN();Cm();Br();ON=["Generalize","Evaluate","Separate","Optimize modules"],I3=e=>{let t=bt(e),r=t>=0&&t<ON.length?ON[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},jm=(e,t)=>{let r=vs(e),o=r===null?null:TN(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},Ue=(e,t)=>({title:e,detail:t,replyPreview:null}),Dm=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:null}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!C(e.status)){let t=e.judgeModel;return Ue(`${ne(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!C(e.status)){let t=e.judgeModel;return Ue(`${ne(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===T?Ue(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?Ue(`${ne(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):Ue(`${ne(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===T){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==T?Ue(`${ne(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):Ue(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return Ue(`${ne(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=re(t);return Ue(`${ne(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return Ue(`${ne(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=re(t);return Ue(`${ne(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return Ue(`${ne(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===T){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return Ue("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return Ue(`${ne(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>nt(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=oe(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||C(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?jm(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o="A writer or judge reply could not be used. Start a new run after fixing the issue.";return r!==void 0?jm(e,{title:I3(r),detail:t.length>0?t:o}):jm(e,{title:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(C(e.status)){let t=e.errorMessage?.trim()??"";return jm(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var Dt,Rl=l(()=>{"use strict";Se();Dt=e=>{if(e.status==="improving"&&e.improverModel===T)return!0;if(e.status!=="judging"||e.judgeModel!==T)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===T}});var MN,NN=l(()=>{"use strict";MN=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Jr,O3,zN,jN=l(()=>{"use strict";R();Jr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),O3=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Jr(r)}</p>`},zN=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Jr(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${Jr(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Jr(a)}.</p>`}<pre class="mono">${Jr(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Ur(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Jr(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",g=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Jr(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${O3(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Jr(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var xl,M3,DN,$N=l(()=>{"use strict";R();Br();xl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),M3=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=nt(t.promptText),n=t.judgement?.reasons?`<p class="muted">${xl(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${xl(i)}.</p>`}<pre class="mono">${xl(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Ur(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${xl(d)}</pre>`:`<div class="alert-error">${xl(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},DN=e=>e.revisions.map(t=>M3(e,t)).join("")});var HN,FN=l(()=>{"use strict";R();HN=e=>{if(C(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var $t,N3,uw,z3,j3,D3,$3,UN,BN,pw=l(()=>{"use strict";FN();$t=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),N3="Stop this run? Writers will stop and the best prompt is kept.",uw="End the wizard? Writers will stop and progress from finished steps is kept.",z3="Skip this module and pause at the step gate?",j3=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${$t(N3)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${$t(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,D3=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${$t(uw)}"><input type="hidden" name="cycleId" value="${$t(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,$3=e=>{let t=$t(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${$t(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${$t(z3)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${$t(uw)}">End wizard</button>
    </form>
  </div>`},UN=e=>{let t=HN(e);return t==="none"?"":t==="classic"?j3(e.id):t==="wizard_end_only"?D3(e.id):$3(e)},BN=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=$t(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${$t(uw)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var GN,VN=l(()=>{"use strict";R();Cl();GN=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=oe(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${nn(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${nn(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${re(r)}`}return""}});var H3,F3,qN,U3,KN,JN=l(()=>{"use strict";R();VN();lw();Om();zm();H3=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',F3=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',qN=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),U3=(e,t,r)=>{let o=Ls(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=GN(e,t),i=Nm(e,t),a=H3(i),c=F3(i),d=Es(e,t,{forOutcomeSummary:!0}),p=`${a}<span class="sdlc-wizard-outcome-step-title">${qN(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${qN(s)}</span>`,g=t==="wizard-4"&&r.phase==="complete"?" open":"",A=i==="failed"&&t!=="wizard-4"?" open":"",h=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${h}"${g}${A}><summary aria-controls="${h}-body">${p}</summary><div class="sdlc-wizard-outcome-step-body" id="${h}-body">${o}</div></details>`},KN=e=>{let t=e.wizard;if(t===void 0||!C(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>U3(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var YN,XN,ZN=l(()=>{"use strict";YN=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),XN=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${YN(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${YN(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var mw,QN,gw=l(()=>{"use strict";mw=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,QN=(e,t)=>{if(mw(e,t))return"Passed";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var ez,tz=l(()=>{"use strict";ez=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var $m,rz,oz=l(()=>{"use strict";R();gw();gw();tz();$m=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rz=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=oe(t),o=re(t),n=r.terminalStatusSuggestion==="passed"?"":ez(r,o),s=o-10,i=r.rows.map((c,d)=>{let p=t.modules[d],g=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,h=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=p===void 0?c.status:QN(p,o),u=p!==void 0&&mw(p,o)?'<span aria-label="Passed">\u2713</span>':$m(y);return`<tr${h}><td>${$m(c.title)}</td><td>${$m(g)}</td><td>${c.tokens??"\u2014"}</td><td>${u}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${$m(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var sn,Hm,fw=l(()=>{"use strict";sn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hm=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${sn(r.fileName)}</code> \u2014 ${sn(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${sn(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${sn(i.name)}</strong> <code>.cursor/skills/${sn(i.fileName)}/SKILL.md</code></p><p class="muted">${sn(i.description)}</p><p>${sn(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var B3,nz,sz=l(()=>{"use strict";R();R();ZN();oz();fw();B3=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nz=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!C(e.status)||t.modules.length===0)return"";let r=rz(e),o=XN(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=oe(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${B3(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${Hm(e)}${a}${r}${o}</section>`}});var lr,Tl=l(()=>{"use strict";lr=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var cr,Fm,hw=l(()=>{"use strict";R();cw();xN();dw();Rl();NN();vm();jN();$N();pw();JN();sz();Cl();He();Tl();cr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Fm=e=>{let t=!C(e.status)&&e.status!=="wizard_paused"&&!Dt(e),r=Dm(e),o=LN(lP(MN(e)),e),n=C(e.status)?"":UN(e),s=KN(e),i=nz(e),a=RN(e),c=e.errorMessage===null?"":`<div class="alert-error">${cr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?oe(e.wizard):null,A=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,h=!t&&e.wizard!==void 0&&C(e.status)&&(e.wizard.phase==="complete"||oe(e.wizard).passedModuleCount>0),y=h?A?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",u=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${cr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",S=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${cr(r.replyPreview)}</pre>`,b=r.detail.length===0&&u.length===0&&S.length===0||r.detail.length===0&&S.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${cr(r.detail)}${p}</p>`}${S}</div>`,f=e.revisions.find(oo=>oo.roundNumber===e.currentRound),w=e.status==="improving"?tn(e):null,v=Cs(e),_=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),k=Dt(e)?zN({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:w?.promptText??f?.promptText??"",score:w?.score??f?.judgement?.score??null,reasons:w?.reasons??f?.judgement?.reasons??null,avoid:w?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:_?1:0}):"",E=e.wizard!==void 0&&e.wizard.phase==="complete"&&C(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!E&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?re(e.wizard):e.passScore,M=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${kN(I)}</div>`:"",X=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':C(e.status)?e.status==="failed"?'<span class="sdlc-run-badge sdlc-run-badge-failed">Failed</span>':E&&g!==null&&!A?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",G=t?d:h?A?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',F=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${cr(Qe(le(e)))}</li>`:"",v>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${nn(v)} so far</li>`:""].filter(oo=>oo.length>0),ro=F.length===0?"":`<ul class="sdlc-run-meta">${F.join("")}</ul>`,$=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,Pe=E?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,Bt=E?"":M.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${Pe}</div>`:`<div class="sdlc-run-grid">${Pe}${M}</div>`,ti=DN(e),mU=e.wizard!==void 0&&C(e.status)&&e.revisions.every(oo=>oo.roundNumber===0&&(oo.judgement===void 0||oo.judgement===null)),gU=ti.length===0||mU?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${ti}</div></section>`,fU=`<p class="sdlc-run-goal" title="${cr(e.goal.trim())}">${cr(lr(e.goal))}</p>`,hU=E?`${c}${i}${s}${k}${a}`:`${c}${Bt}${k}${s}${a}`,yU='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',SU=E?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${cr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${yU}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${X}</div>${fU}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${G}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${cr(r.title)}</h2>${b}${u}${SU}</div></div>${ro}${$}</header>${hU}</section>${gU}`}});var iz,az=l(()=>{"use strict";R();wl();iz=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!fl({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:Vr(e)}});var lz,cz=l(()=>{"use strict";R();kl();lz=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!gl(t)?e:rn({...e,wizard:{...t,gate:null}})}});var dz,uz=l(()=>{"use strict";R();Pl();dz=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!hl(t.splitOptions))return e;let r=t.splitOptions[0];return Gr(e,r)}});var G3,an,Um=l(()=>{"use strict";az();cz();uz();Ze();G3=e=>{let t=lz(e),r=iz(t);return dz(r)},an=(e,t)=>{let r=G3(t);return r!==t?(D(e,r),r):t}});var pz,dr,Il=l(()=>{"use strict";R();pz=e=>Xe.indexOf(e),dr=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||C(e.status)?Xe.length:t.gate!==null?pz(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?pz(t.phase):null}});var mz,gz=l(()=>{"use strict";mz=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var ln,fz,hz=l(()=>{"use strict";R();gz();ln=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fz=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Ko(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${ln(mz(o))}</pre></div>`:"",s=Yo(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=ar(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=cm(c),g=i[c]??"",A=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${ln(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${ln(p)}">${ln(A)}</label>
        ${h}
        <input class="input" type="text" id="${ln(p)}" name="${ln(p)}" value="${ln(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var Ol,yz,Sz=l(()=>{"use strict";R();YP();hz();QP();pw();fw();rw();Ol=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yz=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate,n=re(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?iN(r):"",a=o==="evaluate"?Hm(e):"",c=o==="evaluate"?Ws({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",p=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(x=>{let I=x.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',M=x.recommended?' <span class="sdlc-badge">Recommended</span>':"",X=r.selectedSplitOptionId===x.id||r.selectedSplitOptionId===null&&x.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${Ol(x.id)}" required${X}> <strong>${Ol(x.title)}</strong>${I}${M}</label>${Tm(e,x)}</li>`}).join("")}</ul>`:"",g=r.modules[r.currentModuleIndex],h=o==="optimize_modules"&&g?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=g?.title??"Module",u=g?.prompt??"",S=g?.status==="pending",b=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Ol(y)}</p>${S?fz({cycle:e,modulePrompt:u}):""}<p class="muted">Test run prompt preview: ${Ol(Jo(u,ar(r)))}</p>${g?.statistics===null||g?.statistics===void 0?"":`<p class="muted">Module stats: best ${g.statistics.bestScore??"\u2014"} / \u2265${n} (round ${g.statistics.bestRound??"\u2014"}).</p>`}${Ws({cycle:e,interactive:!1,caption:S?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",f=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":S?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",w=_P(r),v=w===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${w}</p>`,_=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",k=t?.active===!0?" sdlc-wizard-gate-active":"",E=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${_}"`:"";return`<section class="card sdlc-wizard-gate${k}"${E}>
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
    ${BN(e)}
  </section>`}});var V3,Az,bz=l(()=>{"use strict";R();zm();V3=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Az=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||C(e.status))return"";let r=(o,n)=>{let s=Es(e,o);return`<h2 class="sdlc-wizard-active-head">${V3(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var Pz,wz,yw,vz,Sw=l(()=>{"use strict";R();Il();ks();Pz="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",wz=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return Xe[r]??null},yw=(e,t)=>{let r=wz(t);if(r===null||e.wizard===void 0)return!1;let o=Xe.indexOf(r);if(o===-1)return!1;let n=dr(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<Xe.length)},vz=(e,t)=>{let r=wz(t);if(r===null||e.wizard===void 0||!yw(e,t))return e;qr(e.id);let o=Xe.slice(Xe.indexOf(r)),n=cl(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var Aw,_z,Wz=l(()=>{"use strict";Sw();Aw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_z=(e,t)=>yw(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${Aw(Pz)}"><input type="hidden" name="cycleId" value="${Aw(e.id)}"><input type="hidden" name="wizardStepId" value="${Aw(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var q3,K3,J3,Lz,kz=l(()=>{"use strict";R();Il();Sz();bz();Wz();Om();q3={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},K3=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),J3=(e,t,r)=>{let o=_z(e,t);return`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${K3(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${Ls(e,t)}</div>
</details>`},Lz=e=>{let t=e.wizard;if(t===void 0)return"";let r=dr(e);if(r===null)return"";let o=Xe.slice(0,r).map((i,a)=>J3(e,`wizard-${a+1}`,q3[i])),n=t.gate!==null?yz(e,{active:!0}):Az(e),s=r>=Xe.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var Bm,bw=l(()=>{"use strict";kz();tw();R();Bm=e=>{if(e===null||e.wizard!==void 0&&C(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=Lz(e),r=uN(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var Y3,Pw,Ez=l(()=>{"use strict";R();Se();He();As();Y3=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},Pw=async(e,t,r)=>{if(!Y3(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===T)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=SP({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Fe({writerAgent:e.judgeModel,prompt:n,workingDirectory:le(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=bP(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var Ml,Gm,Cz,ww,Rz,xz,Tz,Vm,vw=l(()=>{"use strict";Ml=m(require("node:fs")),Gm=m(require("node:path")),Cz=e=>Gm.default.join(Gm.default.dirname(e),"prompt-optimizer-writer-ready.json"),ww=e=>{let t=Cz(e);if(!Ml.default.existsSync(t))return{};try{let r=JSON.parse(Ml.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},Rz=(e,t)=>{Ml.default.mkdirSync(Gm.default.dirname(e),{recursive:!0}),Ml.default.writeFileSync(Cz(e),`${JSON.stringify(t,null,2)}
`)},xz=(e,t)=>ww(e)[t]?.message??null,Tz=(e,t,r)=>{Rz(e,{...ww(e),[t]:{message:r}})},Vm=(e,t)=>{let r=ww(e);r[t]!==void 0&&Rz(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var _w,qm,Km,Iz,Ae,cn=l(()=>{"use strict";R();Al();kl();Ez();Rl();ks();vw();Um();Ze();_w=new Set,qm={atMs:0,ids:[]},Km=async()=>{if(Date.now()-qm.atMs<3e4)return qm.ids;let e=await At({commands:ue({})});return qm.atMs=Date.now(),qm.ids=e.installedWriterIds,e.installedWriterIds},Iz=async(e,t,r)=>{let o=K(e,t);if(o===null||r.aborted)return;let n=an(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(C(n.status)&&!s||n.status==="wizard_paused"||Dt(n))return;if(s){let c=await Pw(n,r,d=>{Vm(e,d)});D(e,c);return}let i=await QM(n,c=>{Vm(e,c)},r,c=>{K(e,t)?.status==="stopped"||r.aborted||D(e,c)});if(!(K(e,t)?.status==="stopped"||r.aborted)){if(D(e,i),C(i.status)){let c=await Pw(i,r,d=>{Vm(e,d)});D(e,c);return}await Iz(e,t,r)}},Ae=(e,t)=>{if(_w.has(t))return;let r=K(e,t);if(r===null)return;let o=an(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(C(o.status)&&!n||o.status==="wizard_paused"||Dt(o))return;_w.add(t);let s=yN(t);Iz(e,t,s).finally(()=>{_w.delete(t),SN(t)})}});var Yr,Nl=l(()=>{"use strict";hw();Um();bw();cn();Yr=(e,t)=>{let r=an(e,t);return Ae(e,r.id),`${Fm(r)}${Bm(r)}`}});var Oz,Mz,Nz=l(()=>{"use strict";Oz=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,Mz=e=>e!==null&&e>0});var Jm,zz,Ww=l(()=>{"use strict";R();Em();ks();Jm=e=>(qr(e.id),{...ws(e,"stopped"),errorMessage:Bb}),zz=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;qr(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var X3,jz,Dz,$z=l(()=>{"use strict";R();kl();Em();Pl();wl();Nl();Ze();cn();Nz();Sw();sw();Ww();X3="Pick a revision scored above 0 before continuing to Separate.",jz=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),Dz=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=K(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=K(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Yr(e.storePath,d))};if(o==="wizard-stop-all"){let c=Jm(s);return D(e.storePath,c),Ae(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=zz(s);return D(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=vz(s,c);return D(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=bN(s,c);return D(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&Ae(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",g=pP(s.wizard,d,c);g=cl(g,d),g={...g,pendingStepInstructions:p};let A={...s,status:"judging",errorMessage:null,wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return D(e.storePath,A),Ae(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(A=>A.step==="generalize"),g=(s.errorMessage?.trim().length??0)>0&&!d?jz(s):rn({...s,wizard:{...s.wizard,gate:null}});return D(e.storePath,g),Ae(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=Oz(s,p??-1);if(!Mz(g)){let h={...s,errorMessage:X3,updatedAt:new Date().toISOString()};return D(e.storePath,h),a(n),!0}let A=Vr({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return D(e.storePath,A),Ae(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=jz(s);return D(e.storePath,h),Ae(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(h=>h.id===p);if(g===void 0){let h={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return D(e.storePath,h),a(n),!0}let A=Gr(s,g);return D(e.storePath,A),a(n),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(n),!0;let g=TP({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!g.ok){let u={...s,errorMessage:g.errorMessage,updatedAt:new Date().toISOString()};return D(e.storePath,u),a(n),!0}let A={...s.wizard,parameterValues:g.parameterValues};if(p.status==="pending"){let u=ZM({...s,wizard:{...A,gate:null}},d);return D(e.storePath,u),Ae(e.storePath,n),a(n),!0}let h=d+1;if(h>=s.wizard.modules.length){let u=oe(A),S=ws({...s,wizard:A},u.terminalStatusSuggestion);return D(e.storePath,S),Ae(e.storePath,n),a(n),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...A,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return D(e.storePath,y),a(n),!0}}return a(n),!0}});var Z3,Hz,Q3,Lw,e6,Fz,Uz=l(()=>{"use strict";Se();ks();Ww();DP();ym();Rl();Ze();Z3="Add a score from 0 to 100 and the reason for it.",Hz="Add a score from 1 to 100 and the reason for it.",Q3="Write the next prompt.",Lw="This step is not waiting for you.",e6=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},Fz=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=K(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(D(e.storePath,Jm(a)),{kind:"saved",cycleId:i}):AN(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=K(e.storePath,r);if(o===null||!Dt(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:Lw};if(t==="manual-judge"){if(o.judgeModel!==T)return{kind:"invalid",cycle:o,errorMessage:Lw};let i=e6(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?Hz:Z3};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:Hz};let d=o.revisions.find(g=>g.roundNumber===o.currentRound)?.run?.tokenReview??"",p=Sm(_l(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return D(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==T)return{kind:"invalid",cycle:o,errorMessage:Lw};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:Q3};let s=hm(o,n);return D(e.storePath,s),{kind:"saved",cycleId:o.id}}});var Bz,Gz=l(()=>{"use strict";Bz=`<script>
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
</script>`});var Vz,qz=l(()=>{"use strict";Vz=`<script>
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
</script>`});var Kz,Jz=l(()=>{"use strict";Kz=`<script>
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
</script>`});var Yz,Xz=l(()=>{"use strict";R();He();Yz=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:Qe(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(re(t.wizard)),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!C(t.status)}}});var Zz,Qz=l(()=>{"use strict";R();Il();Zz=e=>{if(e.wizard===void 0)return C(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let t=dr(e);if(e.status==="wizard_paused"&&t!==null&&t<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${t+1} of 4`};if(C(e.status)){if(e.wizard.phase==="complete"){let r=oe(e.wizard),o=r.rows.reduce((s,i)=>i.bestScore===null?s:s===null?i.bestScore:Math.min(s,i.bestScore),null),n=o===null?"":` \xB7 lowest ${o}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Wizard \xB7 ${r.passedModuleCount}/${r.totalModules} modules${n}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}}return t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${t+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var ej,tj=l(()=>{"use strict";ej=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var ur,t6,r6,rj,oj=l(()=>{"use strict";Qz();tj();Tl();ur=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),t6=e=>e.wizard===void 0?"classic":"wizard",r6=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${ur(t)}">`,o=Zz(e),n=ej(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${ur(o.badgeClass)}">${ur(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${ur(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${ur(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${t6(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${ur(e.id)}">${ur(lr(e.goal))}</a><p class="muted">${ur(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${g}</div></li>`},rj=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(i=>r6(i,t)).join(""),o=Math.min(e.length,20),n=o===e.length?`History \xB7 ${e.length}`:`History \xB7 ${o} of ${e.length}`,s=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2><ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${ur(n)}</summary>${s}</details>`:s}});var kw,Ym,nj,o6,n6,Ew,sj,Cw=l(()=>{"use strict";kw=m(require("node:fs")),Ym=m(require("node:path"));He();nj=/^[a-z0-9-]+$/,o6=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},n6=(e,t)=>{if(!nj.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let g=o6(p[2]??"");p[1]==="name"&&g.length>0&&(o=g),p[1]==="description"&&(n=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},Ew=e=>{let t=Qo(e);if(!t.ok)return[];let r=Ym.default.resolve(t.path,".cursor","skills"),o=[];try{o=kw.default.readdirSync(r)}catch{return[]}return o.filter(n=>nj.test(n)).flatMap(n=>{let s=Ym.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${Ym.default.sep}`))return[];try{let i=n6(kw.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},sj=(e,t)=>Ew(e).find(r=>r.fileName===t)??null});var ij,aj=l(()=>{"use strict";ij={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var zl,s6,je,Rs=l(()=>{"use strict";aj();_s();zl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),s6=e=>{let t=ij[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${zl(t.title)}" aria-describedby="${r}" aria-expanded="false">${zt}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${zl(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${zl(t.example)}</span></span></button>`},je=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${zl(r)}"`}>${zl(e)}</span>${s6(t)}</span>`});var lj,i6,cj,dj,uj=l(()=>{"use strict";Rs();lj=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),i6=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),cj=e=>{if(e.length===0)return`<div class="field">${je("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${lj(r.fileName)}">${lj(r.fileName)}</option>`).join("");return`<div class="field">${je("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${i6(e)}</script>`},dj=`<script>
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
</script>`});var Ie,pj,mj,a6,gj,fj,hj,yj=l(()=>{"use strict";R();dw();Se();Tl();Il();Ie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pj=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",mj=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,a6=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},gj=e=>e===T?"You":ne(e),fj=e=>{let t=a6(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ne(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Ie(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Ie(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Ie(gj(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Ie(gj(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Ie(r)}</dd></div>
    </dl>
  </details>`},hj=e=>{let t=e.wizard;if(t===void 0)return"";let r=lr(e.goal),o=e.status==="wizard_paused",n=!C(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=Dm(e),g=mj(t),A=g===null?"":pj(g),h=dr(e),y=A.length===0?"":h===null||h>=4?` <strong>${Ie(A)}</strong>`:` <strong>${Ie(A)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Ie(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Ie(p.title)}${y}</p>
    <p class="muted">${Ie(p.detail)}</p>
    <div class="actions">
      ${fj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ie(e.id)}">Open this run</a>
    </div>
  </section>`}let s=mj(t),i=s===null?"Wizard":pj(s),a=dr(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ie(r)}</h2>
    <p class="lede">Paused at <strong>${Ie(i)}</strong>${Ie(c)} (last updated ${Ie(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${fj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ie(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var jl,Sj,Aj=l(()=>{"use strict";Rs();jl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Sj=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${jl(n.id)}"${n.id===e.runner?" selected":""}>${jl(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${jl(e.runner)}">Checking ${jl(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${je("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${je("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${jl(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var bj,Pj=l(()=>{"use strict";bj=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var xs,wj,vj,_j,Wj,Lj=l(()=>{"use strict";Rs();xs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wj=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${xs(c.id)}"${c.id===r?" selected":""}>${xs(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${xs(n)}</option>`;return`<div class="field">${je(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},vj=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${xs(t)}">Checking ${xs(o)}\u2026</p>`},_j=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${je(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${xs(r)}</textarea><span class="muted">${o}</span></div></details>`,Wj=e=>{let t=`<div class="sdlc-writer">${wj("judge","Judge",e.judge,e.writers,"I'll score it")}${vj("judge",e.judge,e.writers)}${_j("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${wj("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${vj("improver",e.improver,e.writers)}${_j("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var kj,Ej=l(()=>{"use strict";kj=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var Rw,Cj,Rj=l(()=>{"use strict";Ej();Rw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Cj=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${kj.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${Rw(t.goal)}" title="${Rw(t.goal)}">${Rw(t.label)}</button>`).join("")}</div>`});var Dl,l6,c6,xw,xj=l(()=>{"use strict";R();Rs();Dl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),l6=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},c6=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,xw=e=>{let t=l6(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=ol(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${je(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${Dl(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${Dl(e.inputId)}" class="sdlc-pass-range" type="range" name="${Dl(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${Dl(a)}"><span class="sdlc-pass-mark" style="left:${c6(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${Dl(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var u6,pr,Tj,Ij=l(()=>{"use strict";Rl();hw();Gz();qz();cw();Jz();Xz();oj();Cw();uj();Rs();bw();yj();Tl();Aj();Pj();Lj();R();Rj();xj();u6=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,pr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Tj=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${pr(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${pr(e.skillNotice??"")}</div>`,o=`${EN}${CN}`,n=e.resumableWizardCycle??null,s=n===null?"":hj(n),i=Bm(e.cycle),a=e.cycle===null?"":Fm(e.cycle),c=e.cycle!==null&&Dt(e.cycle),d=Yz(e),p=u6(d.goal,d.prompt,e.canRun),g=Wj({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),A=Sj({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=`${xw({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${xw({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=dP,u=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",S=e.cycle!==null&&C(e.cycle.status),b=d.running&&!S,f=S||b?"":" open",w=b?" sdlc-compose-run-focus":"",_=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${S?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,k=S?(()=>{let F=e.cycle!==null?lr(e.cycle.goal):lr(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${pr(F)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${_}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${_}</summary>`,E=S?" sdlc-compose-viewing-finished":"",x=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",I=c?"waiting":d.running?"running":"idle",M=d.running&&!c?' aria-busy="true"':"",X=`<section class="card sdlc-compose${E}${w}" id="prompt-optimizer-compose">
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
        ${cj(Ew(d.folder))}
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
            ${Cj()}
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
        ${bj()}
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
    </section>`,G=`${""}${Bz}${Vz}${Kz}${dj}`;return`${t}${r}${X}${s}${a}${i}${o}${rj(e.history,e.cycle?.id??null)}${G}`}});var $l,Tw=l(()=>{"use strict";Ij();$l=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:Tj(t)}))}});var Oj,Mj=l(()=>{"use strict";Uz();Nl();Tw();Ze();cn();Oj=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:Fz({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=K(e.storePath,o.cycleId);return Ae(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(Yr(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await $l(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:Mt(e.storePath),resumableWizardCycle:null}),!0)}});var Nj,Xm,Iw=l(()=>{"use strict";Nj=m(require("node:os"));R();Xm=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??Nj.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var zj,Ts,Ow,jj,Dj,Hl=l(()=>{"use strict";R();Se();Fb();zj=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Ts=e=>{let t=PM(e),r=en(e).map(s=>({id:s,label:fm[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},Ow=(e,t,r)=>t===T||t!==null&&e.writers.some(o=>o.id===t)?t:r,jj=(e,t,r,o=null)=>({judge:Ow(e,t,e.judge),improver:Ow(e,r,e.improver),runner:Ow(e,o,e.runner)}),Dj=e=>e===Vp?{goal:qp,prompt:Kp}:{goal:"",prompt:""}});var Zm,$j=l(()=>{"use strict";Zm=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var Hj,Qm,Mw=l(()=>{"use strict";R();Se();He();Hl();$j();Hj=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=Zm(o);return n.ok?String(n.passScore):String(r)},Qm=e=>{let t=jj(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=Hj(e.posted,"passScore",70),o=Hj(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=(f,w)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:f,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:w,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a});if(e.posted===null)return d(e.defaultFolder??Zo,null);let p=e.posted.get("folder")??Zo;if(e.posted.get("intent")==="choose-folder"){let f=e.pickFolder();return d(f===null?p:Qe(f),null)}if((e.posted.get("intent")??"")!=="run")return d(p,null);let A=zj(e.goal,e.prompt);if(A!==null)return d(p,A);let h=Zm(e.posted.get("passScore")??r);if(!h.ok)return d(p,h.errorMessage);let y=Zm(e.posted.get("modulePassScore")??o);if(!y.ok)return d(p,y.errorMessage);let u=wM(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(u===null)return d(p,"Choose a judge and an improver.");let S=Qo(p);if(!S.ok)return d(p,S.errorMessage);let b=vM(e.installedIds,c,u.judge);return b===null?d(p,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:u.judge,improver:u.improver,workingDirectory:S.path,passScore:h.passScore,modulePassScore:y.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:b,runnerInstructions:a}}});var Is,tg,p6,Nw,Fj,eg,Uj,m6,Bj,zw,g6,f6,h6,jw,Gj,Vj,qj=l(()=>{"use strict";Is=m(require("node:fs")),tg=m(require("node:path"));Se();He();p6=["remember","choose-folder","run"],Nw=()=>({folder:Zo,judge:"",improver:"",runner:""}),Fj=e=>tg.default.join(tg.default.dirname(e),"prompt-optimizer-preferences.json"),eg=e=>typeof e=="string"?e:"",Uj=e=>{let t=Fj(e);if(!Is.default.existsSync(t))return Nw();try{let r=JSON.parse(Is.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return Nw();let o=r,n=eg(o.folder).trim();return{folder:n.length===0?Zo:n,judge:eg(o.judge),improver:eg(o.improver),runner:eg(o.runner)}}catch{return Nw()}},m6=(e,t)=>{let r=Fj(e);Is.default.mkdirSync(tg.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;Is.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),Is.default.renameSync(o,r)},Bj=(e,t)=>e===T||en(t).some(r=>r===e),zw=(e,t,r)=>e===null?t:e.length===0?"":Bj(e,r)?e:t,g6=(e,t)=>{if(e===null)return t;let r=Qo(e);return r.ok?r.display:t},f6=e=>{let t=Uj(e.storePath),r={folder:g6(e.folder,t.folder),judge:zw(e.judge,t.judge,e.installedIds),improver:zw(e.improver,t.improver,e.installedIds),runner:zw(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||m6(e.storePath,r)},h6=e=>{let t=Qo(e);return t.ok?t.display:Zo},jw=(e,t)=>Bj(e,t)?e:"",Gj=e=>{let t=Uj(e.storePath);return{selection:{...e.selection,judge:jw(t.judge,e.installedIds)||e.selection.judge,improver:jw(t.improver,e.installedIds)||e.selection.improver,runner:jw(t.runner,e.installedIds)||e.selection.runner},defaultFolder:h6(t.folder)}},Vj=e=>{let t=e.posted.get("intent")??"";if(!p6.includes(t))return;let r=e.posted.get("folder");f6({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var Kj,y6,S6,Dw,A6,rg,og=l(()=>{"use strict";Kj=m(require("node:os"));Se();vw();As();y6="Reply with the single word ok. Do not use tools.",S6=45e3,Dw=async(e,t)=>{if(t===T)return{ok:!0,message:"You will do this step."};let r=xz(e,t);if(r!==null)return{ok:!0,message:r};let o=await Fe({writerAgent:t,prompt:y6,workingDirectory:Kj.default.tmpdir(),timeoutMs:S6});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ne(t)} is ready.`;return Tz(e,t,n),{ok:!0,message:n}},A6=e=>[...new Set(e.filter(t=>t.length>0))],rg=async(e,t,r,o)=>{for(let n of A6([t,r,o??""])){let s=await Dw(e,n);if(!s.ok)return s.message}return null}});var $w,Jj=l(()=>{"use strict";R();$w=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!C(r.status)&&!(t!==null&&r.id===t))return r;return null}});var Yj,Xj=l(()=>{"use strict";yt();R();Nl();Iw();Mw();Tw();Ze();He();qj();Cw();og();Jj();Um();cn();Yj=async e=>{let t=e.posted===null?Gj({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=Qm({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Dr("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(Vj({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Qe(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await rg(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await $l(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Qe(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:Mt(e.route.storePath),resumableWizardCycle:$w(Mt(e.route.storePath),null)});return}if(r.kind==="start"){let s=sj(r.workingDirectory,r.sourceSkillFile),i=Xm({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,wizard:wP({...ll(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(D(e.route.storePath,i),Ae(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(Yr(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:K(e.route.storePath,e.cycleId);n!==null&&(n=an(e.route.storePath,n),Ae(e.route.storePath,n.id)),await $l(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:Mt(e.route.storePath),resumableWizardCycle:$w(Mt(e.route.storePath),n?.id??null)})}});var Zj,Qj=l(()=>{"use strict";Ze();Zj=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";nM(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var eD,tD=l(()=>{"use strict";eD=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var rD,oD=l(()=>{"use strict";AM();$z();Mj();Xj();Qj();Hl();tD();cn();rD=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await Km(),o=Ts(r),n=e.method==="POST"?eD(e.request.headers["content-type"],await e.readBody(e.request)):null;if(Dz({posted:n,storePath:e.storePath,response:e.response})||await Oj(e,n,o))return;let s=Dj(t.searchParams.get("example")),i=Zj({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=SM({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await Yj({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:yM(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var b6,nD,sD=l(()=>{"use strict";R();Ze();b6=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",nD=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=K(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!C(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=vP({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${b6(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var iD,aD=l(()=>{"use strict";Nl();Ze();iD=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:K(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":Yr(e.storePath,o)),!0}});var P6,lD,cD=l(()=>{"use strict";Se();og();P6=["claude-cli","codex","cursor","antigravity"],lD=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===T||P6.includes(t)?await Dw(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var dD,uD=l(()=>{"use strict";R();dD=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:sl,page:il,context:fs,installedWriters:e,post:{method:"POST",url:sl,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${sl}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var Hw,pD=l(()=>{"use strict";R();Cl();Hw=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ie(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null}))),o=C(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:o,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:Cs(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:fs,page:`${il}?cycle=${encodeURIComponent(e.id)}`}}});var Oe,w6,mD,gD,fD=l(()=>{"use strict";Oe=m(ci());R();w6=(0,Oe.isType)({goal:Oe.isString,prompt:Oe.isString,workingDirectory:Oe.isString,judge:(0,Oe.isUndefinedOr)(Oe.isString),improver:(0,Oe.isUndefinedOr)(Oe.isString),passScore:(0,Oe.isUndefinedOr)(Oe.isNumber),maxRounds:(0,Oe.isUndefinedOr)(Oe.isNumber)}),mD=e=>{let t=e?.trim()??"";return t.length===0?null:t},gD=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return w6(t)?t.workingDirectory.trim().length===0?{ok:!1,error:om}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:mD(t.judge),improver:mD(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:om}}});var v6,hD,yD=l(()=>{"use strict";R();Se();Mw();Hl();v6=e=>e.map(t=>t.id).join(", "),hD=e=>{let t=Ts(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===T||n===T)return{ok:!1,error:cP,installedWriters:t.writers};if(o===null||n===null){let a=v6(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o}),i=Qm({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var SD,AD=l(()=>{"use strict";R();Iw();uD();pD();Hl();fD();yD();Ze();SD=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=K(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:Hw(c)}}let r=await e.handlers.readInstalledIds(),o=Ts(r);if(e.method==="GET")return{status:200,body:dD(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let n=gD(e.rawBody);if(!n.ok)return{status:400,body:{ok:!1,error:n.error,installedWriters:o.writers}};let s=hD({body:n.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver,s.runner);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:o.writers}};let a=Xm({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds,wizard:ll(s.prompt),runnerModel:s.runner});return D(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:Hw(a)}}});var bD,PD=l(()=>{"use strict";cn();og();AD();bD=async e=>{let t=await SD({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:Km,readWritersReady:rg,startCycle:Ae}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var _6,Fw,wD=l(()=>{"use strict";mI();oD();sD();aD();cD();PD();_6=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},Fw=async e=>{let t=_6(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await bD(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:pI()})),!0):(await lD({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||nD({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||iD({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await rD(e),!0)}});var vD=l(()=>{"use strict";wD()});var dn,Fl,W6,L6,k6,E6,_D,WD=l(()=>{"use strict";dn=m(require("node:fs")),Fl=m(require("node:path")),W6="prompt-optimizer-cycles.json",L6="prompt-optimizer-preferences.json",k6="prompt-sdlc-cycles.json",E6="prompt-sdlc-preferences.json",_D=e=>{let t=Fl.default.join(e,W6),r=Fl.default.join(e,k6);if(dn.default.existsSync(t)||!dn.default.existsSync(r))return t;try{dn.default.renameSync(r,t)}catch{return r}let o=Fl.default.join(e,E6),n=Fl.default.join(e,L6);if(dn.default.existsSync(o)&&!dn.default.existsSync(n))try{dn.default.renameSync(o,n)}catch{}return t}});var Os,C6,Uw,LD=l(()=>{"use strict";Os=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),C6=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],Uw=e=>{let t=C6.map(i=>`<option value="${Os(i.value)}">${Os(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Os(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Os(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Os(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
    </section>`}});var Ul,CD,R6,RD,x6,T6,xD,sg,kD,ED,I6,O6,mr,Bl,ng,M6,ig,Bw,N6,Gw,TD,Vw,ID,z6,j6,D6,OD,MD,ND,Gl=l(()=>{"use strict";Ul=m(require("node:fs")),CD=m(require("node:path")),R6="estimate-history.ndjson",RD=100,x6=500,T6=2e4,xD=e=>CD.default.join(e,R6),sg=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,x6),kD=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,T6),ED=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,I6=e=>({...e,estimateTokens:ED(e.estimateTokens),actualTokens:ED(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),O6=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},mr=e=>{let t=xD(e);return Ul.default.existsSync(t)?Ul.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return O6(n)?[I6(n)]:[]}catch{return[]}}):[]},Bl=(e,t)=>{Ul.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Ul.default.writeFileSync(xD(e),r,"utf8")},ng=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),M6=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${ng(o.task)} | ${ng(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},ig=e=>{let t=mr(e.reportsDir),r=sg(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Bl(e.reportsDir,[...s,n])},Bw=e=>{let t=mr(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?sg(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Bl(e.reportsDir,[...i,s])},N6=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-RD),Gw=e=>[...mr(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),TD=e=>{let t=mr(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=kD(e.input),n=kD(e.output),s=sg(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Bl(e.reportsDir,[...c,a])},Vw=(e,t)=>{let r=mr(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},ID=e=>({table:M6(N6(mr(e))),embedding:null}),z6=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},j6=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-RD),D6=e=>{let t=z6(j6(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${ng(s.task)} | ${ng(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},OD=e=>{let t=mr(e.reportsDir),r=sg(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Bl(e.reportsDir,[...s,n])},MD=e=>{let t=mr(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Bl(e.reportsDir,[...s,n])},ND=e=>D6(mr(e))});var zD=l(()=>{"use strict";Gl()});var gr,qw,$6,Kw,H6,F6,ag,lg,U6,Jw,jD=l(()=>{"use strict";zD();iw();gr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qw=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},$6=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${qw(-r)} under`:`${qw(r)} over`},Kw=e=>e.toLocaleString("en-US"),H6=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${Kw(-r)} under`:`${Kw(r)} over`},F6=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},ag=e=>e===null?"\u2014":qw(e),lg=e=>e===null?"\u2014":Kw(e),U6=`(function () {
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
})();`,Jw=e=>{let r=Gw(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":$6(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":H6(n.estimateTokens,n.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${gr(F6(i))}</button></td>
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
        <script>${U6}</script>`}
    </section>`}});var DD=l(()=>{"use strict";LD();jD()});var Ms,B6,G6,Yw,$D=l(()=>{"use strict";Ms=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),B6=(e,t,r)=>{let o=Ms(t),n=Ms(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},G6=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${Ms(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>B6(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${Ms(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${Ms(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${Ms(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},Yw=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(G6).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var HD=l(()=>{"use strict";$D()});var Vl,FD,UD,Xw,Zw,Qw,BD=l(()=>{"use strict";Vl=m(require("node:fs")),FD=m(require("node:path"));Ga();$p();UD=(e,t,r)=>ls({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,Xw=(e,t,r)=>{let o=UD(e,t,r);if(o===null)return[];if(!Vl.default.existsSync(o))return[];let n=Vl.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},Zw=e=>{let t=UD(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:nr(e.entry.prompt),output:nr(e.entry.output)};Vl.default.mkdirSync(FD.default.dirname(t),{recursive:!0}),Vl.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},Qw=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var V6,q6,ql,cg,ev=l(()=>{"use strict";V6=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),q6=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,ql=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=V6(i.assistantOutput),d=c.length>0?`Assistant: ${q6(c,t)}`:null,p=[a,d].filter(g=>g!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},cg=e=>{let t=e.userMessage.trim(),r=ql({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Ht,Kl,ov,K6,J6,tv,Y6,nv,dg,GD,VD,X6,Ns,sv,rv,qD,Z6,KD,zs,ug,Jl,Q6,Yl,iv,pg,mg,JD=l(()=>{"use strict";Ht=m(require("node:fs")),Kl=m(require("node:path")),ov=require("node:crypto");ev();K6="writer-sessions",J6="active-index.json",tv=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Y6=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",nv=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},dg=e=>{let t=Kl.default.join(e.installDir,K6);return Ht.default.mkdirSync(t,{recursive:!0}),t},GD=e=>Kl.default.join(dg(e),J6),VD=(e,t)=>Kl.default.join(dg(e),`${t}.canonical.json`),X6=(e,t)=>Kl.default.join(dg(e),`${t}.continuation.json`),Ns=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,sv=e=>{let t=GD(e);if(!Ht.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Ht.default.readFileSync(t,"utf8"));if(!tv(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!tv(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!Y6(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},rv=(e,t)=>{Ht.default.writeFileSync(GD(e),JSON.stringify(t,null,2))},qD=(e,t)=>{Ht.default.writeFileSync(VD(e,t.sessionId),JSON.stringify(t,null,2))},Z6=(e,t)=>{Ht.default.writeFileSync(X6(e,t.sessionId),JSON.stringify(t,null,2))},KD=(e,t)=>{let r=ql({turns:t.turns});Z6(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},zs=(e,t)=>{let r=VD(e,t);if(!Ht.default.existsSync(r))return null;try{let o=JSON.parse(Ht.default.readFileSync(r,"utf8"));return!tv(o)||typeof o.sessionId!="string"?null:o}catch{return null}},ug=(e,t=20)=>{let r=dg(e),o=Ht.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=zs(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Jl=(e,t,r)=>{let o=nv(r);return sv(e).entries.find(i=>Ns(i)===Ns({writerAgent:t,projectFolderPath:o}))?.sessionId??null},Q6=(e,t,r,o)=>{let n=sv(e),s=Ns({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>Ns(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];rv(e,{entries:i})},Yl=(e,t,r)=>{let o=(0,ov.randomUUID)(),n=new Date().toISOString(),s=nv(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return qD(e,i),KD(e,i),Q6(e,t,s,o),o},iv=(e,t,r)=>{let o=Jl(e,t,r);return o!==null?o:Yl(e,t,r)},pg=(e,t,r)=>{let o=nv(r),n=sv(e);if(o===null&&r===void 0){rv(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=Ns({writerAgent:t,projectFolderPath:o});rv(e,{entries:n.entries.filter(i=>Ns(i)!==s)})},mg=e=>{let t=iv(e.layout,e.writerAgent,e.projectFolderPath),r=zs(e.layout,t);if(r===null)return;let o={id:(0,ov.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};qD(e.layout,n),KD(e.layout,n)}});var eJ,tJ,gg,av,YD=l(()=>{"use strict";eJ=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",tJ=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},gg=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",av=e=>{let t=gg(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=eJ(r,e.userPromptCharacterCount),n=tJ({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var fg=l(()=>{"use strict";BD();JD();ev();YD()});var XD=l(()=>{"use strict";dy()});var Be,oJ,nJ,lv,cv,dv,ZD=l(()=>{"use strict";pe();XD();Be=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oJ=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},nJ=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=Pu(o);return`value="${Be(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${Be(r)}"`},lv=(e,t,r,o,n)=>{let s=jy[t];return`<label class="field">
          <span class="field-label">${Be(o)} API key \u2014 ${Be(oJ(e,t))} \xB7 <a class="field-link" href="${Be(s.href)}" target="_blank" rel="noopener noreferrer">${Be(s.label)}</a></span>
          <input class="input mono" type="password" name="${Be(r)}" autocomplete="off" ${nJ(e,t,n)} />
        </label>`},cv=(e,t,r,o)=>{let n=uy(e[t]?.model),s=new Set(mu[t].map(c=>c.value)),i=mu[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${Be(c.value)}"${d}>${Be(c.label)}</option>`}).join(""),a=n!==Wo&&!s.has(n)?`<option value="${Be(n)}" selected>${Be(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${Be(o)}</span>
          <select class="input mono" name="${Be(r)}">${i}${a}</select>
        </label>`},dv=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Be(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${lv(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${cv(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${lv(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${cv(e.secrets,"openai","openaiModel","OpenAI model")}
        ${lv(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${cv(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var QD=l(()=>{"use strict";ZD()});var hg,e$,t$=l(()=>{"use strict";hg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),e$=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${hg(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${hg(s.name)}</strong> <span class="muted mono">(${hg(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${hg(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var sJ,r$,o$,n$=l(()=>{"use strict";sJ=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,r$=e=>e.kind==="folder",o$=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&r$(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(r$(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(sJ)};return r(t)}});var s$,uv,i$=l(()=>{"use strict";s$=m(require("node:path")),uv=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${uv(r.children,t)}</ul>
            </details>
          </li>`;let o=s$.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var a$,Xr,iJ,aJ,Xl,lJ,pv,l$=l(()=>{"use strict";Gp();a$=m(require("node:path"));t$();n$();i$();Xr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),iJ=()=>`(() => {
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

})();`,aJ=()=>`(() => {
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
})();`,Xl=e=>{let t=Ya({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=e$({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${Xr(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Xr(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':lJ(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
    <script>${iJ()}</script>
    <script>${aJ()}</script>`;return`${t}${r}${o}${c}${d}`},lJ=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=o$(a.items.map(A=>({...A,relativePath:typeof A.relativePath=="string"&&A.relativePath.length>0?A.relativePath:a$.default.relative(a.sourceRoot,A.sourcePath).replaceAll("\\","/")}))),p=uv(d,Xr),g=a.items.length;return`<div class="harness-set-block">
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
    </form>`},pv=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??p??a,A=t.sets[i];if(A===void 0)continue;let h=a.length>0?a:A.proposedSlug,y=g.length>0?g:A.proposedName,u=r.has(i),S=A.items.map(b=>({id:b.id,kind:b.kind,title:b.title,sourcePath:b.sourcePath,include:u}));s.push({slug:h,name:y,items:S})}return s}});var c$=l(()=>{"use strict";l$()});var cJ,mv,d$=l(()=>{"use strict";jr();cJ=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},mv=cJ});var dJ,u$,p$=l(()=>{"use strict";jr();dJ=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},u$=dJ});var m$=l(()=>{"use strict"});var Zl,uJ,gv,g$=l(()=>{"use strict";Gp();Zl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uJ=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,gv=e=>{let t=e.flashError?`<div class="alert-error">${Zl(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Zl(e.flashMessage)}</div>`:"",r=Ya({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Zl(uJ(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Zl(n.name)}</strong>
                  <span class="muted mono">${Zl(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var f$=l(()=>{"use strict";m$();GS();g$()});var yg,h$=l(()=>{"use strict";yg=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var y$,fr,fv=l(()=>{"use strict";y$=m(require("node:path"));Zt();Et();V();pe();tt();fr=e=>{let t=H()?.layout.installDir??L();if(y$.default.basename(t)===lo)return Yt;let r=H(),o=r!==null?Re(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):Yt}});var hv,S$=l(()=>{"use strict";tt();fv();hv=async e=>{let t=Ce(e.installDir),r=t?.bundleVersion??null,o=fr(t);try{let n=await Nn(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Ao(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var yv,A$=l(()=>{"use strict";yv=e=>!e});var Sv,js,Av=l(()=>{"use strict";V();Sv=()=>`http://127.0.0.1:${dh()}/update/run`,js=async e=>{try{let t=await fetch(Sv(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var pJ,b$,bv,P$=l(()=>{"use strict";V();te();Av();pJ=()=>{Kt({launchAgentLabel:se(),installDir:L()})},b$=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},bv=async()=>{pJ();let e=await js({force:!0});if(e.ok)return{ok:!0,message:b$(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:b$(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(tt(),vE)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var Pv=l(()=>{"use strict";Mb();h$();fv();S$();A$();P$();Av()});var w$,v$=l(()=>{"use strict";w$=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var _$,W$,wv,vv,L$=l(()=>{"use strict";_$=require("node:crypto"),W$=m(require("node:fs"));yt();pe();pe();v$();wv=!1,vv=async e=>{if(wv)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!w$(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=H();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&W$.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,_$.randomUUID)();wv=!0;try{if(await NS(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Un({...r,workspace:n},e.writerAgent,t);return await ya(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{wv=!1}}});var k$=l(()=>{"use strict";L$()});var st,mJ,E$,C$,_v,Wv,Lv,kv,Ev,Cv,Rv=l(()=>{"use strict";st=require("node:crypto"),mJ=Buffer.from("302a300506032b6570032100","hex"),E$=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},C$=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,st.createPublicKey)({key:Buffer.concat([mJ,t]),format:"der",type:"spki"})},_v=()=>{let{publicKey:e,privateKey:t}=(0,st.generateKeyPairSync)("ed25519");return{publicKeyRaw:E$(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Wv=e=>(0,st.createPrivateKey)(e),Lv=(e,t)=>(0,st.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),kv=(e,t,r)=>{try{let o=C$(e);return(0,st.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},Ev=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,Cv=()=>(0,st.randomBytes)(32).toString("base64url")});var hr,Sg,R$,gJ,fJ,Ag,xv,Tv,x$=l(()=>{"use strict";hr=m(require("node:fs")),Sg=m(require("node:path"));Rv();V();Et();R$=e=>Sg.default.join(e.installDir,Lr),gJ=(e,t)=>{if(e.profileEmail===null||t===R$(e)||hr.default.existsSync(t))return;let r=R$(e);hr.default.existsSync(r)&&(hr.default.mkdirSync(Sg.default.dirname(t),{recursive:!0}),hr.default.renameSync(r,t))},fJ=e=>{if(!hr.default.existsSync(e))return null;try{let t=hr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Ag=e=>{let t=Hd(e);gJ(e,t);let r=fJ(t);if(r!==null)return r;let o=_v();return hr.default.mkdirSync(Sg.default.dirname(t),{recursive:!0}),hr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},xv=e=>{let t=Ag(e.layout),r=Cv(),o=Ev({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=Wv(t.privateKeyPem),s=Lv(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Tv=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return kv(e.serverPublicKey,t,e.serverAttestation)}});var Iv=l(()=>{"use strict";x$();Rv()});var M$,Ql,Nv,zv,T$,hJ,Ov,bg,ce,N$,yJ,Mv,SJ,AJ,jv,me,Le,yr,bJ,I$,O$,ec,tc,z$=l(()=>{"use strict";M$=m(require("node:http")),Ql=m(require("node:fs")),Nv=m(require("node:path"));Pg();Fa();vT();WT();xT();Qn();lb();Tb();lI();dI();vD();WD();DD();HD();fg();QD();c$();xo();yt();jr();d$();p$();f$();Pv();tt();k$();pe();Iv();zv=e=>YA(e)??"never",T$=48e3,hJ=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,Ov=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Ju(),reveal:t.reveal,installed:zr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),bg=async e=>{let t=H();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:Jn(t,e)},ce=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),N$=200,yJ=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',Mv=e=>{let t=e.trim().slice(0,N$),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},SJ=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ce(t)}</div>`,AJ=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ce(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',jv={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},me=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...jv}),e.end(JSON.stringify(r))},Le=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},yr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},bJ=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=yJ(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${ce(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=yv(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ce(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ce(zv(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ce(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},I$=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},O$=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,N$)},ec=e=>{let t=Nv.default.join(e.layout.installDir,"link-code.txt"),r=()=>Ce(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:yg(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let y=h.installVersion??r(),u=await i(),S=Db(u),b=h.updateFlash??null,f=$b(b),w=SJ(b,h.updateError??null);return zb({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:fr(y),installBundleVersionLabel:yg(y),prependBody:`${f}${w}${S}`,headerUpdateButtonHtml:jb(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await hv(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:Mv("An update is already running.")}),h.end();return}c=!0;try{let u=await bv(),S=u.ok?"/?update=ok":Mv(u.message);h.writeHead(303,{Location:S}),h.end()}catch(u){let S=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:Mv(S)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",S=o(),b=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:S.installVersion,body:`<section class="card">
      <h1>${ce(y)}</h1>
      <p>${ce(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(b)},g=()=>{if(Ql.default.existsSync(t))return Ql.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return Ql.default.writeFileSync(t,h,"utf8"),h},A=M$.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",S=h.method??"GET";if(S==="OPTIONS"){y.writeHead(204,jv),y.end();return}if(!await Fw({method:S,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:_D(Nv.default.dirname(e.layout.configPath)),readBody:yr,sendHtml:Le,renderShell:n})){if(S==="GET"&&u==="/health"){let b=e.controllers.getStatus(),f=o();me(y,200,{ok:!0,...b,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/status"){let b=o();me(y,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/traffic"){me(y,200,{entries:$a(e.layout)});return}if(S==="DELETE"&&u==="/api/traffic"||S==="POST"&&u==="/api/traffic/clear"){if(QA(e.layout),S==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}me(y,200,{ok:!0});return}if(S==="GET"&&u==="/api/trace"){me(y,200,{entries:Np(e.layout)});return}if(S==="DELETE"&&u==="/api/trace"||S==="POST"&&u==="/api/trace/clear"){if(rb(e.layout),S==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}me(y,200,{ok:!0});return}if(S==="POST"&&u==="/api/errors/clear"){ob(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(S==="GET"&&u==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let w=await ds({layout:e.layout,query:f,limit:20});me(y,200,{chunks:w,query:f});return}me(y,200,{chunks:cs(e.layout).slice(-50).reverse()});return}if(S==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(S==="GET"&&u==="/api/update-status"){let b=await i();me(y,200,{ok:!0,...b});return}if((S==="GET"||S==="POST")&&u==="/api/update"){await d(y);return}if(S==="GET"&&u==="/"){let b=e.controllers.getStatus(),f=o(),w=zr(e.layout),v=zp(e.layout.errorLogPath);Le(y,await n({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:I$(h.url??void 0),updateError:O$(h.url??void 0),body:Hb({wsConnected:b.wsConnected,lastHeartbeatAt:b.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:cs(e.layout).length,trafficEntryCount:$a(e.layout).length,wakeError:b.wakeError,errorLogByteSize:v.byteSize,errorLogExists:v.exists})}));return}if(S==="GET"&&u==="/task"){let b=e.controllers.getStatus(),f=o(),w=H(),v=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=v.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,k=v.searchParams.get("failed")==="1"?v.searchParams.get("error")?.trim()??"Task failed.":null,E=v.searchParams.get("runId");Le(y,await n({title:"Task",activePath:"/task",installVersion:f.installVersion,body:Uw({defaultWorkspace:w?.workspace??"",wsConnected:b.wsConnected,flashMessage:_,flashError:k,lastRunId:E})}));return}if(S==="POST"&&u==="/task/dispatch"){let b=await yr(h),f=new URLSearchParams(b),w=f.get("prompt")?.trim()??"",v=f.get("writerAgent")?.trim()??"claude-cli",_=f.get("projectFolder")?.trim()??"",k=await vv({prompt:w,writerAgent:v,..._.length>0?{projectFolderPath:_}:{}}),E=new URLSearchParams;k.ok?E.set("ok","1"):(E.set("failed","1"),k.errorMessage!==void 0&&E.set("error",k.errorMessage.slice(0,240))),k.agentRunId!==void 0&&E.set("runId",k.agentRunId),y.writeHead(303,{Location:`/task?${E.toString()}`}),y.end();return}if(S==="GET"&&u==="/writer-sessions"){let b=o(),f=ug(e.layout,12);Le(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:b.installVersion,updateFlash:I$(h.url??void 0),updateError:O$(h.url??void 0),body:Yw({sessions:f})}));return}if(S==="GET"&&u==="/errors"){let b=o(),f=zp(e.layout.errorLogPath);Le(y,await n({title:"Errors",activePath:"/errors",installVersion:b.installVersion,body:sb({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(S==="GET"&&u==="/status"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),w=ve(e.layout),v=w!==null?ze(w,12e4):cb(f.lastHeartbeatAt,12e4),_=db({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:v}),k=o();Le(y,await n({title:"Status",activePath:"/status",installVersion:k.installVersion,body:`${bJ({status:f,healthBadge:_,revived:b.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:k.installBundleVersion,installBundleUpdatedAt:k.installBundleUpdatedAt})}${mb({installDir:e.layout.installDir})}${pb({entries:Np(e.layout)})}`}));return}if(S==="GET"&&u==="/traffic"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=$a(e.layout),w=o(),v=f.map(E=>`<tr><td title="${ce(E.at)}">${ce(zv(E.at))}</td><td>${ce(E.direction)}</td><td><code>${ce(E.type)}</code></td><td>${ce(E.summary)}</td><td>${ce(E.action??"")}</td></tr>`).join(""),_=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${v}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',k=b.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Le(y,await n({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${k}
              ${_}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(S==="GET"&&u==="/projects"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=fr(f.installVersion),v=await bg(e.layout),_=b.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":null,k=H(),E=k===null?null:Z({wsUrl:k.wsUrl,pairingToken:k.pairingToken}),x=E===null?{}:Object.fromEntries((await Promise.all(v.projects.map(async I=>{let M=await mv(E,I.id);return[I.id,M?.counts??null]}))).filter(I=>I[1]!==null));Le(y,await n({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:gv({projects:v.projects,compositionCountsByProjectId:x,cloudAppOrigin:w,syncMessage:v.message,syncOk:v.ok,flashMessage:null,flashError:_})}));return}if(S==="GET"&&u==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=H(),v=w===null?null:Z({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),_=f.length>0&&v!==null?Dr():null;if(_===null||v===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Je({projectFolderPath:_}),!await Pa(v,f,_)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(S==="GET"&&u==="/project"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=b.searchParams.get("id")?.trim()??"",w=o(),v=await bg(e.layout),_=Mo(v.projects,f);if(_===null){await p(y,"Project not found");return}let k=b.searchParams.get("linked")==="1"?b.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${b.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${b.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:b.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,E=b.searchParams.get("knowledgePromoted"),x=E!==null?`Marked ${E} lesson(s) as promoted in Agent Witch.`:null,I=b.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,M=b.searchParams.get("tab")?.trim()??"harness",X=M==="workflows"||M==="agents"||M==="knowledge"?M:"harness",G=H(),F=G===null?null:Z({wsUrl:G.wsUrl,pairingToken:G.pairingToken}),ro=F===null?null:await mv(F,_.id),$=0;if(F!==null)try{let Pe=await fetch(`${F.appOrigin}/api/agent-witch/projects/${encodeURIComponent(_.id)}/knowledge`,{method:"GET",headers:{[$e]:F.pairingToken},signal:AbortSignal.timeout(1e4)});if(Pe.ok){let Bt=await Pe.json();typeof Bt=="object"&&Bt!==null&&typeof Bt.candidateCount=="number"&&($=Bt.candidateCount)}}catch{$=0}Le(y,await n({title:_.name,activePath:"/projects",installVersion:w.installVersion,body:Yn({project:_,installed:zr(e.layout),linkedSetSlugs:Mr(_.projectFolderPath),composition:ro,knowledgeCandidateCount:$,activeTab:X,flashMessage:k??x,flashError:I})}));return}if(S==="POST"&&u==="/projects/pull-bound-harness"){let b=await yr(h),f=await VS({rawBody:b,layout:e.layout});if(f.kind==="not_found"){await p(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let w=o();Le(y,await n({title:f.title,activePath:"/projects",installVersion:w.installVersion,body:f.body}));return}if(S==="POST"&&u==="/projects/link-harness"){let b=await yr(h),f=new URLSearchParams(b),w=f.get("projectId")?.trim()??"",v=await bg(e.layout),_=Mo(v.projects,w);if(_===null){await p(y,"Project not found");return}let k=f.getAll("applySet").map(G=>String(G)),E=la({layout:e.layout,projectFolderPath:_.projectFolderPath,setSlugs:k});if(!E.ok){let G=o();Le(y,await n({title:_.name,activePath:"/projects",installVersion:G.installVersion,body:Yn({project:_,installed:zr(e.layout),linkedSetSlugs:Mr(_.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:E.errorMessage})}));return}let x=H(),I=x===null?null:Z({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),M=I===null?!1:await Aa(I,_.id,E.appliedSetSlugs),X=new URLSearchParams({linked:"1",files:String(E.writtenFileCount),bindingsSynced:M?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(_.id)}&${X.toString()}`}),y.end();return}if(S==="POST"&&u==="/project/knowledge/promote-all"){let b=await yr(h),w=new URLSearchParams(b).get("projectId")?.trim()??"",v=await bg(e.layout),_=Mo(v.projects,w);if(_===null){await p(y,"Project not found");return}let k=H(),E=k===null?null:Z({wsUrl:k.wsUrl,pairingToken:k.pairingToken}),x=E===null?{ok:!1,promotedCount:0}:await u$(E,_.id),I=new URLSearchParams({tab:"knowledge",...x.ok?{knowledgePromoted:String(x.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(_.id)}&${I.toString()}`}),y.end();return}if(S==="GET"&&u==="/harness"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=pa(e.layout),v=b.searchParams.get("submitted")==="1",_=v?b.searchParams.get("syncFailed")==="1"?`Local harness updated (${b.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:b.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${b.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":b.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:b.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,k=w?.scanRoots[0]??Ju(),E=hJ(e.layout,{reveal:w,importQuery:b.searchParams.get("import")==="1",justSubmitted:v}),x=fr(f.installVersion);Le(y,await n({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:Xl(Ov(e.layout,{cloudAppOrigin:x,reveal:w,scanFolder:k,flashMessage:_,importSectionExpanded:E}))}));return}if(S==="POST"&&u==="/api/harness/pick-folder"){let b=Dr();if(b===null){me(y,200,{cancelled:!0});return}me(y,200,{path:b});return}if(S==="GET"&&u==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=aa(f);if(w===null){me(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let v=Ql.default.readFileSync(w,"utf8"),_=v.length>T$?`${v.slice(0,T$)}
\u2026 (truncated)`:v;me(y,200,{content:_})}catch{me(y,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&u==="/api/harness/reveal/add-project"){let b=await yr(h),f="";try{let _=JSON.parse(b);typeof _=="object"&&_!==null&&typeof _.projectPath=="string"&&(f=_.projectPath.trim())}catch{me(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){me(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=pa(e.layout),v=LS({reveal:w,projectPath:f});if(v===null||v.sets.length===0){me(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Qu(e.layout,v),me(y,200,{ok:!0,setCount:v.sets.length});return}if(S==="GET"&&u==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){me(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;h.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...jv});let v=kS({scanRoot:f,response:y,shouldAbort:()=>w});Qu(e.layout,v),y.end();return}if(S==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&u==="/harness/submit"){let b=pa(e.layout);if(b===null){let x=o(),I=fr(x.installVersion);Le(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Xl(Ov(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await yr(h),w=new URLSearchParams(f),v=pv(w,b),_=CS({layout:e.layout,sets:v});if(!_.ok){let x=o(),I=fr(x.installVersion);Le(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Xl(Ov(e.layout,{cloudAppOrigin:I,reveal:b,flashError:_.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}xS(e.layout);let E=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${_.writtenItemCount??0}${E}`}),y.end();return}if(S==="GET"&&u==="/writer-api"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),w=H()?.writerExecutionBackend??xe(void 0),v=we(e.layout.configPath),_=xr(v),k=b.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,E=o();Le(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:E.installVersion,body:dv({writerExecutionBackend:w,secrets:_,flashMessage:k})}));return}if(S==="POST"&&u==="/writer-api"){let b=await yr(h),f=new URLSearchParams(b),w=f.get("writerExecutionBackend")?.trim()??"cli";zy({configPath:e.layout.configPath,writerExecutionBackend:xe(w),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(S==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(S==="GET"&&u==="/history"){let b=o();Le(y,await n({title:"History",activePath:"/history",installVersion:b.installVersion,body:Jw({reportsDir:e.layout.reportsDir})}));return}if(S==="GET"&&u==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=o(),v=bb({layout:e.layout}),_=vb(v),k=f.length>0?await ds({layout:e.layout,query:f,limit:20}):cs(e.layout).slice(-50).reverse(),E=k.map(I=>{let M=wb(v,I.id),X=M>0?` \xB7 used in ${M} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ce(I.createdAt)}">${ce(zv(I.createdAt))}${I.source?` \xB7 ${ce(I.source)}`:""}${X}</div><pre>${ce(I.text)}</pre></article>`}).join(""),x=_.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${_.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${ce(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Le(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ce(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${x}${E}${AJ(f,k.length)}`}));return}S==="POST"&&await yr(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return A.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),A.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Xt}`)}),A},tc=e=>Ag(e).publicKeyRaw});var Pg=l(()=>{"use strict";aT();lT();z$()});var D$={};Lt(D$,{runAgentWitchExternalLiveCli:()=>wJ});var Dv,j$,PJ,wJ,$$=l(()=>{"use strict";Dv=m(require("node:fs")),j$=m(require("node:path"));Qn();V();te();Pg();te();PJ=e=>{let t=j$.default.join(e,"link-code.txt");if(!Dv.default.existsSync(t))return null;let r=Dv.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},wJ=()=>{Ve("agent-witch-live");let e=L(),t=N(),r=PJ(e),o=tc(t);ec({layout:t,controllers:{getStatus:()=>{let n=ve(t);return{wsConnected:Ra(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{go(e)}}})}});var Sr=W((jCe,U$)=>{"use strict";var H$=["nodebuffer","arraybuffer","fragments"],F$=typeof Blob<"u";F$&&H$.push("blob");U$.exports={BINARY_TYPES:H$,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:F$,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var rc=W((DCe,wg)=>{"use strict";var{EMPTY_BUFFER:vJ}=Sr(),$v=Buffer[Symbol.species];function _J(e,t){if(e.length===0)return vJ;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new $v(r.buffer,r.byteOffset,o):r}function B$(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function G$(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function WJ(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Hv(e){if(Hv.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new $v(e):ArrayBuffer.isView(e)?t=new $v(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Hv.readOnly=!1),t}wg.exports={concat:_J,mask:B$,toArrayBuffer:WJ,toBuffer:Hv,unmask:G$};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");wg.exports.mask=function(t,r,o,n,s){s<48?B$(t,r,o,n,s):e.mask(t,r,o,n,s)},wg.exports.unmask=function(t,r){t.length<32?G$(t,r):e.unmask(t,r)}}catch{}});var K$=W(($Ce,q$)=>{"use strict";var V$=Symbol("kDone"),Fv=Symbol("kRun"),Uv=class{constructor(t){this[V$]=()=>{this.pending--,this[Fv]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Fv]()}[Fv](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[V$])}}};q$.exports=Uv});var Hs=W((HCe,Z$)=>{"use strict";var oc=require("zlib"),J$=rc(),LJ=K$(),{kStatusCode:Y$}=Sr(),kJ=Buffer[Symbol.species],EJ=Buffer.from([0,0,255,255]),_g=Symbol("permessage-deflate"),Ar=Symbol("total-length"),Ds=Symbol("callback"),Zr=Symbol("buffers"),$s=Symbol("error"),vg,Bv=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!vg){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;vg=new LJ(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Ds];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!n.client_max_window_bits));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){vg.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){vg.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?oc.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=oc.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[_g]=this,this._inflate[Ar]=0,this._inflate[Zr]=[],this._inflate.on("error",RJ),this._inflate.on("data",X$)}this._inflate[Ds]=o,this._inflate.write(t),r&&this._inflate.write(EJ),this._inflate.flush(()=>{let s=this._inflate[$s];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=J$.concat(this._inflate[Zr],this._inflate[Ar]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Ar]=0,this._inflate[Zr]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?oc.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=oc.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Ar]=0,this._deflate[Zr]=[],this._deflate.on("data",CJ)}this._deflate[Ds]=o,this._deflate.write(t),this._deflate.flush(oc.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=J$.concat(this._deflate[Zr],this._deflate[Ar]);r&&(s=new kJ(s.buffer,s.byteOffset,s.length-4)),this._deflate[Ds]=null,this._deflate[Ar]=0,this._deflate[Zr]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};Z$.exports=Bv;function CJ(e){this[Zr].push(e),this[Ar]+=e.length}function X$(e){if(this[Ar]+=e.length,this[_g]._maxPayload<1||this[Ar]<=this[_g]._maxPayload){this[Zr].push(e);return}this[$s]=new RangeError("Max payload size exceeded"),this[$s].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[$s][Y$]=1009,this.removeListener("data",X$),this.reset()}function RJ(e){if(this[_g]._inflate=null,this[$s]){this[Ds](this[$s]);return}e[Y$]=1007,this[Ds](e)}});var Fs=W((FCe,Wg)=>{"use strict";var{isUtf8:Q$}=require("buffer"),{hasBlob:xJ}=Sr(),TJ=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function IJ(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Gv(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function OJ(e){return xJ&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Wg.exports={isBlob:OJ,isValidStatusCode:IJ,isValidUTF8:Gv,tokenChars:TJ};if(Q$)Wg.exports.isValidUTF8=function(e){return e.length<24?Gv(e):Q$(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Wg.exports.isValidUTF8=function(t){return t.length<32?Gv(t):e(t)}}catch{}});var Yv=W((UCe,iH)=>{"use strict";var{Writable:MJ}=require("stream"),eH=Hs(),{BINARY_TYPES:NJ,EMPTY_BUFFER:tH,kStatusCode:zJ,kWebSocket:jJ}=Sr(),{concat:Vv,toArrayBuffer:DJ,unmask:$J}=rc(),{isValidStatusCode:HJ,isValidUTF8:rH}=Fs(),Lg=Buffer[Symbol.species],it=0,oH=1,nH=2,sH=3,qv=4,Kv=5,kg=6,Jv=class extends MJ{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||NJ[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[jJ]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=it}_write(t,r,o){if(this._opcode===8&&this._state==it)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new Lg(o.buffer,o.byteOffset+t,o.length-t),new Lg(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new Lg(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case it:this.getInfo(t);break;case oH:this.getPayloadLength16(t);break;case nH:this.getPayloadLength64(t);break;case sH:this.getMask();break;case qv:this.getData(t);break;case Kv:case kg:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[eH.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=oH:this._payloadLength===127?this._state=nH:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=sH:this._state=qv}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=qv}getData(t){let r=tH;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&$J(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=Kv,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[eH.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===it&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=it;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=Vv(o,r):this._binaryType==="arraybuffer"?n=DJ(Vv(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=it):(this._state=kg,setImmediate(()=>{this.emit("message",n,!0),this._state=it,this.startLoop(t)}))}else{let n=Vv(o,r);if(!this._skipUTF8Validation&&!rH(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===Kv||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=it):(this._state=kg,setImmediate(()=>{this.emit("message",n,!1),this._state=it,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,tH),this.end();else{let o=t.readUInt16BE(0);if(!HJ(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new Lg(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!rH(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=it;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=it):(this._state=kg,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=it,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[zJ]=n,i}};iH.exports=Jv});var Qv=W((GCe,cH)=>{"use strict";var{Duplex:BCe}=require("stream"),{randomFillSync:FJ}=require("crypto"),{types:{isUint8Array:UJ}}=require("util"),aH=Hs(),{EMPTY_BUFFER:BJ,kWebSocket:GJ,NOOP:VJ}=Sr(),{isBlob:Us,isValidStatusCode:qJ}=Fs(),{mask:lH,toBuffer:un}=rc(),at=Symbol("kByteLength"),KJ=Buffer.alloc(4),Eg=8*1024,pn,Bs=Eg,Wt=0,JJ=1,YJ=2,Xv=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Wt,this.onerror=VJ,this[GJ]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||KJ,r.generateMask?r.generateMask(o):(Bs===Eg&&(pn===void 0&&(pn=Buffer.alloc(Eg)),FJ(pn,0,Eg),Bs=0),o[0]=pn[Bs++],o[1]=pn[Bs++],o[2]=pn[Bs++],o[3]=pn[Bs++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[at]!==void 0?a=r[at]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(lH(t,o,d,s,a),[d]):(lH(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=BJ;else{if(typeof t!="number"||!qJ(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(UJ(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[at]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Wt?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Us(t)?(n=t.size,s=!1):(t=un(t),n=t.length,s=un.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[at]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Us(t)?this._state!==Wt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Wt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Us(t)?(n=t.size,s=!1):(t=un(t),n=t.length,s=un.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[at]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Us(t)?this._state!==Wt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Wt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[aH.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Us(t)?(a=t.size,c=!1):(t=un(t),a=t.length,c=un.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[at]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Us(t)?this._state!==Wt?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Wt?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[at],this._state=YJ,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(Zv,this,a,n);return}this._bufferedBytes-=o[at];let i=un(s);r?this.dispatch(i,r,o,n):(this._state=Wt,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(XJ,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[aH.extensionName];this._bufferedBytes+=o[at],this._state=JJ,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");Zv(this,c,n);return}this._bufferedBytes-=o[at],this._state=Wt,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Wt&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][at],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][at],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};cH.exports=Xv;function Zv(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function XJ(e,t,r){Zv(e,t,r),e.onerror(t)}});var SH=W((VCe,yH)=>{"use strict";var{kForOnEventAttribute:nc,kListener:e_}=Sr(),dH=Symbol("kCode"),uH=Symbol("kData"),pH=Symbol("kError"),mH=Symbol("kMessage"),gH=Symbol("kReason"),Gs=Symbol("kTarget"),fH=Symbol("kType"),hH=Symbol("kWasClean"),br=class{constructor(t){this[Gs]=null,this[fH]=t}get target(){return this[Gs]}get type(){return this[fH]}};Object.defineProperty(br.prototype,"target",{enumerable:!0});Object.defineProperty(br.prototype,"type",{enumerable:!0});var mn=class extends br{constructor(t,r={}){super(t),this[dH]=r.code===void 0?0:r.code,this[gH]=r.reason===void 0?"":r.reason,this[hH]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[dH]}get reason(){return this[gH]}get wasClean(){return this[hH]}};Object.defineProperty(mn.prototype,"code",{enumerable:!0});Object.defineProperty(mn.prototype,"reason",{enumerable:!0});Object.defineProperty(mn.prototype,"wasClean",{enumerable:!0});var Vs=class extends br{constructor(t,r={}){super(t),this[pH]=r.error===void 0?null:r.error,this[mH]=r.message===void 0?"":r.message}get error(){return this[pH]}get message(){return this[mH]}};Object.defineProperty(Vs.prototype,"error",{enumerable:!0});Object.defineProperty(Vs.prototype,"message",{enumerable:!0});var sc=class extends br{constructor(t,r={}){super(t),this[uH]=r.data===void 0?null:r.data}get data(){return this[uH]}};Object.defineProperty(sc.prototype,"data",{enumerable:!0});var ZJ={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[nc]&&n[e_]===t&&!n[nc])return;let o;if(e==="message")o=function(s,i){let a=new sc("message",{data:i?s:s.toString()});a[Gs]=this,Cg(t,this,a)};else if(e==="close")o=function(s,i){let a=new mn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Gs]=this,Cg(t,this,a)};else if(e==="error")o=function(s){let i=new Vs("error",{error:s,message:s.message});i[Gs]=this,Cg(t,this,i)};else if(e==="open")o=function(){let s=new br("open");s[Gs]=this,Cg(t,this,s)};else return;o[nc]=!!r[nc],o[e_]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[e_]===t&&!r[nc]){this.removeListener(e,r);break}}};yH.exports={CloseEvent:mn,ErrorEvent:Vs,Event:br,EventTarget:ZJ,MessageEvent:sc};function Cg(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Rg=W((qCe,AH)=>{"use strict";var{tokenChars:ic}=Fs();function Ft(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function QJ(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(p===-1&&ic[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);d===44?(Ft(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(p===-1&&ic[d]===1)c===-1&&(c=g);else if(d===32||d===9)p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g),Ft(r,e.slice(c,p),!0),d===44&&(Ft(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,g),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(n){if(ic[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:o||(o=!0),n=!1}else if(s)if(ic[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,p=g;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(p===-1&&ic[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))p===-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);o&&(h=h.replace(/\\/g,""),o=!1),Ft(r,a,h),d===44&&(Ft(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=g);let A=e.slice(c,p);return i===void 0?Ft(t,A,r):(a===void 0?Ft(r,A,!0):o?Ft(r,a,A.replace(/\\/g,"")):Ft(r,a,A),Ft(t,i,r)),t}function e7(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}AH.exports={format:e7,parse:QJ}});var Og=W((YCe,xH)=>{"use strict";var t7=require("events"),r7=require("https"),o7=require("http"),wH=require("net"),n7=require("tls"),{randomBytes:s7,createHash:i7}=require("crypto"),{Duplex:KCe,Readable:JCe}=require("stream"),{URL:t_}=require("url"),Qr=Hs(),a7=Yv(),l7=Qv(),{isBlob:c7}=Fs(),{BINARY_TYPES:bH,CLOSE_TIMEOUT:d7,EMPTY_BUFFER:xg,GUID:u7,kForOnEventAttribute:r_,kListener:p7,kStatusCode:m7,kWebSocket:be,NOOP:vH}=Sr(),{EventTarget:{addEventListener:g7,removeEventListener:f7}}=SH(),{format:h7,parse:y7}=Rg(),{toBuffer:S7}=rc(),_H=Symbol("kAborted"),o_=[8,13],Pr=["CONNECTING","OPEN","CLOSING","CLOSED"],A7=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,J=class e extends t7{constructor(t,r,o){super(),this._binaryType=bH[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=xg,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,r=[]):r=[r]),WH(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){bH.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new a7({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new l7(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[be]=this,s[be]=this,t[be]=this,n.on("conclude",w7),n.on("drain",v7),n.on("error",_7),n.on("message",W7),n.on("ping",L7),n.on("pong",k7),s.onerror=E7,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",EH),t.on("data",Ig),t.on("end",CH),t.on("error",RH),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Qr.extensionName]&&this._extensions[Qr.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){et(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),kH(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){n_(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||xg,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){n_(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||xg,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){n_(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Qr.extensionName]||(n.compress=!1),this._sender.send(t||xg,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){et(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(J,"CONNECTING",{enumerable:!0,value:Pr.indexOf("CONNECTING")});Object.defineProperty(J.prototype,"CONNECTING",{enumerable:!0,value:Pr.indexOf("CONNECTING")});Object.defineProperty(J,"OPEN",{enumerable:!0,value:Pr.indexOf("OPEN")});Object.defineProperty(J.prototype,"OPEN",{enumerable:!0,value:Pr.indexOf("OPEN")});Object.defineProperty(J,"CLOSING",{enumerable:!0,value:Pr.indexOf("CLOSING")});Object.defineProperty(J.prototype,"CLOSING",{enumerable:!0,value:Pr.indexOf("CLOSING")});Object.defineProperty(J,"CLOSED",{enumerable:!0,value:Pr.indexOf("CLOSED")});Object.defineProperty(J.prototype,"CLOSED",{enumerable:!0,value:Pr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(J.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(J.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[r_])return t[p7];return null},set(t){for(let r of this.listeners(e))if(r[r_]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[r_]:!0})}})});J.prototype.addEventListener=g7;J.prototype.removeEventListener=f7;xH.exports=J;function WH(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:d7,protocolVersion:o_[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!o_.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${o_.join(", ")})`);let s;if(t instanceof t_)s=t;else try{s=new t_(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;Tg(e,u);return}let d=i?443:80,p=s7(16).toString("base64"),g=i?r7.request:o7.request,A=new Set,h;if(n.createConnection=n.createConnection||(i?P7:b7),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new Qr({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=h7({[Qr.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!A7.test(u)||A.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");A.add(u)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let u=n.path.split(":");n.socketPath=u[0],n.path=u[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let u=o&&o.headers;if(o={...o,headers:{}},u)for(let[S,b]of Object.entries(u))o.headers[S.toLowerCase()]=b}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,u||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=g(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=g(n);n.timeout&&y.on("timeout",()=>{et(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[_H]||(y=e._req=null,Tg(e,u))}),y.on("response",u=>{let S=u.headers.location,b=u.statusCode;if(S&&n.followRedirects&&b>=300&&b<400){if(++e._redirects>n.maxRedirects){et(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new t_(S,t)}catch{let v=new SyntaxError(`Invalid URL: ${S}`);Tg(e,v);return}WH(e,f,r,o)}else e.emit("unexpected-response",y,u)||et(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,S,b)=>{if(e.emit("upgrade",u),e.readyState!==J.CONNECTING)return;y=e._req=null;let f=u.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){et(e,S,"Invalid Upgrade header");return}let w=i7("sha1").update(p+u7).digest("base64");if(u.headers["sec-websocket-accept"]!==w){et(e,S,"Invalid Sec-WebSocket-Accept header");return}let v=u.headers["sec-websocket-protocol"],_;if(v!==void 0?A.size?A.has(v)||(_="Server sent an invalid subprotocol"):_="Server sent a subprotocol but none was requested":A.size&&(_="Server sent no subprotocol"),_){et(e,S,_);return}v&&(e._protocol=v);let k=u.headers["sec-websocket-extensions"];if(k!==void 0){if(!h){et(e,S,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let E;try{E=y7(k)}catch{et(e,S,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(E);if(x.length!==1||x[0]!==Qr.extensionName){et(e,S,"Server indicated an extension that was not requested");return}try{h.accept(E[Qr.extensionName])}catch{et(e,S,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Qr.extensionName]=h}e.setSocket(S,b,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function Tg(e,t){e._readyState=J.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function b7(e){return e.path=e.socketPath,wH.connect(e)}function P7(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=wH.isIP(e.host)?"":e.host),n7.connect(e)}function et(e,t,r){e._readyState=J.CLOSING;let o=new Error(r);Error.captureStackTrace(o,et),t.setHeader?(t[_H]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Tg,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function n_(e,t,r){if(t){let o=c7(t)?t.size:S7(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${Pr[e.readyState]})`);process.nextTick(r,o)}}function w7(e,t){let r=this[be];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[be]!==void 0&&(r._socket.removeListener("data",Ig),process.nextTick(LH,r._socket),e===1005?r.close():r.close(e,t))}function v7(){let e=this[be];e.isPaused||e._socket.resume()}function _7(e){let t=this[be];t._socket[be]!==void 0&&(t._socket.removeListener("data",Ig),process.nextTick(LH,t._socket),t.close(e[m7])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function PH(){this[be].emitClose()}function W7(e,t){this[be].emit("message",e,t)}function L7(e){let t=this[be];t._autoPong&&t.pong(e,!this._isServer,vH),t.emit("ping",e)}function k7(e){this[be].emit("pong",e)}function LH(e){e.resume()}function E7(e){let t=this[be];t.readyState!==J.CLOSED&&(t.readyState===J.OPEN&&(t._readyState=J.CLOSING,kH(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function kH(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function EH(){let e=this[be];if(this.removeListener("close",EH),this.removeListener("data",Ig),this.removeListener("end",CH),e._readyState=J.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[be]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",PH),e._receiver.on("finish",PH))}function Ig(e){this[be]._receiver.write(e)||this.pause()}function CH(){let e=this[be];e._readyState=J.CLOSING,e._receiver.end(),this.end()}function RH(){let e=this[be];this.removeListener("error",RH),this.on("error",vH),e&&(e._readyState=J.CLOSING,this.destroy())}});var MH=W((ZCe,OH)=>{"use strict";var XCe=Og(),{Duplex:C7}=require("stream");function TH(e){e.emit("close")}function R7(){!this.destroyed&&this._writableState.finished&&this.destroy()}function IH(e){this.removeListener("error",IH),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function x7(e,t){let r=!0,o=new C7({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(TH,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(TH,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",R7),o.on("error",IH),o}OH.exports=x7});var s_=W((QCe,NH)=>{"use strict";var{tokenChars:T7}=Fs();function I7(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&T7[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}NH.exports={parse:I7}});var UH=W((tRe,FH)=>{"use strict";var O7=require("events"),Mg=require("http"),{Duplex:eRe}=require("stream"),{createHash:M7}=require("crypto"),zH=Rg(),gn=Hs(),N7=s_(),z7=Og(),{CLOSE_TIMEOUT:j7,GUID:D7,kWebSocket:$7}=Sr(),H7=/^[+/0-9A-Za-z]{22}==$/,jH=0,DH=1,HH=2,i_=class extends O7{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:j7,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:z7,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Mg.createServer((o,n)=>{let s=Mg.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=F7(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=jH}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===HH){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(ac,this);return}if(t&&this.once("close",t),this._state!==DH)if(this._state=DH,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(ac,this):process.nextTick(ac,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{ac(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",$H);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){fn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){fn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!H7.test(s)){fn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){fn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){lc(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=N7.parse(c)}catch{fn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&p!==void 0){let A=new gn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=zH.parse(p);h[gn.extensionName]&&(A.accept(h[gn.extensionName]),g[gn.extensionName]=A)}catch{fn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let A={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(A,(h,y,u,S)=>{if(!h)return lc(r,y||401,u,S);this.completeUpgrade(g,s,d,t,r,o,n)});return}if(!this.options.verifyClient(A))return lc(r,401)}this.completeUpgrade(g,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[$7])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>jH)return lc(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${M7("sha1").update(r+D7).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let g=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),p._protocol=g)}if(t[gn.extensionName]){let g=t[gn.extensionName].params,A=zH.format({[gn.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${A}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",$H),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(ac,this)})),a(p,n)}};FH.exports=i_;function F7(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function ac(e){e._state=HH,e.emit("close")}function $H(){this.destroy()}function lc(e,t,r,o){r=r||Mg.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Mg.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function fn(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,fn),e.emit("wsClientError",i,r,t)}else lc(r,o,n,s)}});var U7,B7,G7,V7,q7,K7,BH,J7,cc,GH=l(()=>{U7=m(MH(),1),B7=m(Rg(),1),G7=m(Hs(),1),V7=m(Yv(),1),q7=m(Qv(),1),K7=m(s_(),1),BH=m(Og(),1),J7=m(UH(),1),cc=BH.default});var a_,l_,c_=l(()=>{"use strict";a_="AGENT_WITCH_EXTERNAL_BRIDGE",l_="AGENT_WITCH_EXTERNAL_LIVE"});var d_,VH=l(()=>{"use strict";d_=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var Y7,u_,qH=l(()=>{"use strict";c_();VH();Y7=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",u_=(e={})=>{let t=e.env??process.env,r=d_(t[a_]),o=d_(t[l_]);return{mode:Y7(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var KH=l(()=>{"use strict";c_()});var JH=l(()=>{"use strict";qH();KH()});var p_=l(()=>{"use strict"});var wr,dc=l(()=>{"use strict";wr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var qs,hn,YH,Z7,m_,g_,XH,ZH,f_,QH,uc,h_=l(()=>{"use strict";qs=m(require("node:fs")),hn=m(require("node:os")),YH=m(require("node:path"));p_();dc();Z7=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),m_=(e=hn.default.hostname())=>YH.default.join(hn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),g_=e=>{if(!qs.default.existsSync(e))return null;try{let t=JSON.parse(qs.default.readFileSync(e,"utf8"));return!Z7(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},XH=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},ZH=(e,t)=>{qs.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},f_=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??m_(),o=g_(r);if(o!==null&&o.pid!==process.pid&&wr(o.pid)&&XH(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:hn.default.hostname(),macOsUsername:hn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return ZH(r,n),{ok:!0}},QH=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??m_(),o=g_(r);return o!==null&&o.pid!==process.pid&&wr(o.pid)&&XH(o)?{ok:!1}:(ZH(r,{hostname:hn.default.hostname(),macOsUsername:hn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},uc=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??m_();g_(r)?.pid===process.pid&&qs.default.existsSync(r)&&qs.default.unlinkSync(r)}});var y_,pc,Q7,e9,t9,r9,S_,eF=l(()=>{"use strict";y_=require("node:child_process"),pc=m(require("node:path"));dc();Xd();Q7=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),e9=(e,t)=>{if(Q7(e)||!/\bnode\b/.test(e))return!1;let r=pc.default.resolve(t),o=pc.default.join(r,"app",Pi),n=pc.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Pi||i==="agent-witch.ts")return e.includes(r);try{let a=pc.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},t9=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,y_.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},r9=(e,t,r)=>{let o=t9(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||e9(d,t)&&n.push(c)}return n},S_=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,y_.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=r9(r,e.installDir,t),n=[];for(let s of o)if(wr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var mc,gc,tF,o9,A_,rF=l(()=>{"use strict";mc=m(require("node:fs")),gc=m(require("node:path"));Ee();tF=(e,t)=>{!mc.default.existsSync(e)||mc.default.existsSync(t)||(mc.default.mkdirSync(gc.default.dirname(t),{recursive:!0}),mc.default.renameSync(e,t))},o9=e=>{if(e.profileEmail===null)return;let t=gc.default.join(e.installDir,ct);tF(gc.default.join(t,vn),e.mainLogPath),tF(gc.default.join(t,_n),e.errorLogPath)},A_=e=>{let t=N();e!==void 0&&t.installDir!==e||o9(t)}});var oF=l(()=>{"use strict";za();Op();Op();!qe()&&So(__agentWitchImportMetaUrl)&&(async()=>{Ve("agent-witch-wake-server");let e=await Do(),t=Jt(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var nF=l(()=>{"use strict";oF()});var sF=l(()=>{"use strict";va()});var b_,iF=l(()=>{"use strict";p_();nF();h_();sF();b_=async(e={})=>{let t=e.skipInProcessBridge?null:await Ip();pp();let r=setInterval(()=>{pp()},6e4),o=setInterval(()=>{if(!QH().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var fc,Ng,i9,aF,lF,zg,cF,dF,P_,uF,jg,pF=l(()=>{"use strict";fc=m(require("node:fs")),Ng=m(require("node:path")),i9="pending-run-inputs.json",aF=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lF=e=>{let t=e.profileEmail?Ng.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Ng.default.join(t,i9)},zg=e=>{let t=lF(e);if(!fc.default.existsSync(t))return{};try{let r=JSON.parse(fc.default.readFileSync(t,"utf8"));return aF(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!aF(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},cF=(e,t)=>{let r=lF(e);fc.default.mkdirSync(Ng.default.dirname(r),{recursive:!0}),fc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},dF=e=>Object.values(zg(e)),P_=(e,t)=>zg(e)[t]!==void 0,uF=(e,t)=>{let r=zg(e);r[t.agentRunId]=t,cF(e,r)},jg=(e,t)=>{let r=zg(e);delete r[t],cF(e,r)}});var Dg=l(()=>{"use strict";pe()});var mF=l(()=>{"use strict";pe()});var $g=l(()=>{"use strict";pe()});var Hg=l(()=>{"use strict";pe()});var hc=l(()=>{"use strict";pe()});var a9,l9,yc,w_=l(()=>{"use strict";gt();Dg();mF();$g();Hg();hc();a9={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},l9={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},yc=e=>{if(!de(e.writerAgent))return"the selected writer";let t=Ke(e.writerAgent);if(xe(e.writerExecutionBackend)==="api"&&t!==null){let r=De(we(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Fi(t,r.model);return`${l9[t]} model ${o}`}}return a9[e.writerAgent]}});var c9,d9,gF,fF,hF=l(()=>{"use strict";c9=/"input_tokens"\s*:\s*(\d+)/,d9=/"output_tokens"\s*:\s*(\d+)/,gF=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},fF=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=gF(c9.exec(t)),o=gF(d9.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var Fg=l(()=>{"use strict";yt()});var Sc,Ug,u9,v_,yF,SF,AF,__,bF=l(()=>{"use strict";Sc=m(require("node:fs")),Ug=m(require("node:path"));Fg();u9="run-completion-outbox.json",v_=e=>{let t=e.profileEmail?Ug.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Ug.default.join(t,u9)},yF=e=>{let t=v_(e);if(!Sc.default.existsSync(t))return[];try{let r=JSON.parse(Sc.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},SF=(e,t)=>{Sc.default.mkdirSync(Ug.default.dirname(v_(e)),{recursive:!0}),Sc.default.writeFileSync(v_(e),JSON.stringify(t,null,2),"utf8")},AF=(e,t)=>{let r=[...yF(e).filter(o=>o.runId!==t.runId),t];SF(e,r)},__=async e=>{if(e.cloudApi===null)return;let t=yF(e.layout);if(t.length===0)return;let r=[];for(let o of t)await ya(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);SF(e.layout,r)}});var PF=l(()=>{"use strict"});var W_,Ac,m9,yn,wF=l(()=>{"use strict";PF();W_=new Map,Ac=e=>{let t=W_.get(e);t!==void 0&&(clearInterval(t),W_.delete(e))},m9=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},yn=(e,t,r,o={})=>{Ac(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){Ac(t);return}let i=o.onTick?.()??{};m9(e,t,n,i)};s(),W_.set(t,setInterval(s,15e3))}});var vF=l(()=>{"use strict";yt()});var _F,WF=l(()=>{"use strict";vF();_F=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:rt(t)}});var L_,bc,vr,k_,Ut,LF,Bg=l(()=>{"use strict";L_=new Set,bc=new Map,vr=(e,t)=>{if(t.length===0)return;let r=bc.get(e)??[];r.push(t),bc.set(e,r)},k_=e=>{L_.add(e);let t=bc.get(e)??[];return bc.delete(e),t},Ut=e=>L_.has(e),LF=e=>{L_.delete(e),bc.delete(e)}});var Ks,kF,EF,CF=l(()=>{"use strict";Ks=m(require("node:path")),kF=require("node:url");yo();EF=()=>{if(qe()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Ks.default.dirname(Ks.default.resolve(e)):Ks.default.dirname(Ks.default.resolve(__filename))}return Ks.default.dirname((0,kF.fileURLToPath)(__agentWitchImportMetaUrl))}});var RF,xF,TF,IF,Ge,Js,OF,MF,Ys,E_,C_,R_,NF,x_,zF,Gg=l(()=>{"use strict";RF=require("node:crypto"),xF=m(require("node:fs")),TF=m(require("node:path")),IF=require("node:url");dc();yo();CF();Ge=new Map,OF=async()=>{if(Js!==void 0)return Js;try{if(qe()){let e=EF(),t=TF.default.join(e,"deps","node-pty","lib","index.js");if(xF.default.existsSync(t)){let r=await import((0,IF.pathToFileURL)(t).href);return Js=r,r}}return Js=await import("node-pty"),Js}catch{return Js=null,null}},MF=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Ys=(e,t,r)=>{let o=Ge.get(e);if(o!==void 0){Ge.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},E_=(e,t)=>{let r=Ge.get(e);return r===void 0?!1:(r.pty.write(t),!0)},C_=(e,t,r)=>{let o=Ge.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},R_=e=>{for(let t of Ge.values())if(!(t.mode!=="agent"||t.runId!==e))return wr(t.pty.pid);return!1},NF=e=>{for(let[t,r]of Ge.entries())if(!(r.mode!=="agent"||r.runId!==e)){Ge.delete(t);try{r.pty.kill()}catch{}return!0}return!1},x_=async e=>{let t=await OF();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;Ge.get(e.shellSessionId)!==void 0&&Ys(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return Ge.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{MF(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{Ge.get(e.shellSessionId)?.pty===n&&(Ge.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},zF=async e=>{let t=e.shellSessionId??(0,RF.randomUUID)(),r=await OF();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return Ge.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{MF(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{Ge.get(t)?.pty===o&&(Ge.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var Vg,jF,DF=l(()=>{"use strict";Vg="[[AWAITING_INPUT]]",jF=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Vg,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Pc,$F,qg=l(()=>{"use strict";DF();Pc=e=>{let t=e.indexOf(Vg);if(t<0)return null;let o=e.slice(t+Vg.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},$F=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",jF].join(`
`)});var HF,FF=l(()=>{"use strict";Bg();Gg();qg();HF=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(Ut(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}vr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await zF({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Pc(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var UF,BF,GF,_r,Kg=l(()=>{"use strict";UF=require("node:child_process"),BF=m(require("node:fs")),GF=m(require("node:path"));Xd();_r=(e,t)=>{let r=GF.default.join(e,"app",Uk,"ensure-writer.sh");return BF.default.existsSync(r)?new Promise((o,n)=>{let s=(0,UF.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{n(i)}),s.on("close",i=>{if(i===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var VF,Sn,vc,Jg,T_,wc,Yg,Xg,I_,O_,g9,Xs,f9,h9,M_,N_=l(()=>{"use strict";VF=require("node:child_process");gt();Kg();$g();Dg();hc();Hg();Sn=new Map,vc=e=>e==="cursor"||e==="antigravity",Jg=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",T_=e=>Sn.get(e)?.warmed===!0,wc=e=>{let t=Sn.get(e);Sn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Yg=e=>Sn.get(e)?.conversationStarted===!0,Xg=e=>{let t=Sn.get(e);Sn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},I_=e=>{Sn.delete(e)},O_=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",g9={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Xs=e=>`${g9[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,f9=(e,t,r,o)=>new Promise(n=>{let s=du(t,r),i=[],a=(0,VF.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),h9=(e,t)=>{let r=Xs(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},M_=async e=>{if(!de(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&xe(e.runConfig.writerExecutionBackend)==="api"){let r=Ke(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=we(e.runConfig.layout.configPath);return De(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),wc(e.writerAgent),{exitCode:0,output:Xs(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await _r(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}vc(e.writerAgent)&&wc(e.writerAgent);let t=await f9(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?h9(e.writerAgent,t.output):Xs(e.writerAgent)}}});var An,z_=l(()=>{"use strict";An={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var qF,y9,S9,KF,A9,j_,JF=l(()=>{"use strict";z_();qF=/you(?:'|')ve hit your session limit/i,y9=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],S9=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,KF=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},A9=e=>{let t=S9.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},j_=e=>{let t=e.trim();if(t.length===0)return null;if(qF.test(t))return{code:An.SESSION_LIMIT,resetHint:A9(t),matchedLine:KF(t,qF)};for(let r of y9)if(r.test(t))return{code:An.PROVIDER_QUOTA,resetHint:null,matchedLine:KF(t,r)};return null}});var Zg,Qg,D_,$_=l(()=>{"use strict";Zg="[[AGENT_RUN_WRITER_EXECUTION]]",Qg="cli-writer-api-key-missing",D_="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var H_=l(()=>{"use strict";$_()});var YF=l(()=>{"use strict";H_()});var ef=l(()=>{"use strict";z_();JF();$_();H_();YF()});var tf,XF=l(()=>{"use strict";tf={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var ZF,QF=l(()=>{"use strict";ZF="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var e1,t1=l(()=>{"use strict";ef();QF();e1=e=>e.code===An.SESSION_LIMIT?ZF:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var r1,o1=l(()=>{"use strict";ef();XF();t1();r1=e=>{let t=j_(e.output);return t!==null?{status:tf.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:e1(t)}:{status:e.exitCode===0?tf.COMPLETED:tf.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var F_,c0e,n1=l(()=>{"use strict";F_={OPEN:"open",APPROVAL:"approval"},c0e=F_.APPROVAL});var Zs,rf,s1,w9,i1,a1,l1,_c,U_,B_=l(()=>{"use strict";Zs=m(require("node:fs")),rf=m(require("node:path")),s1="runs",w9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),i1=e=>{let t=e.profileEmail!==null?rf.default.join(e.installDir,"profiles",e.profileEmail,s1):rf.default.join(e.installDir,s1);return Zs.default.mkdirSync(t,{recursive:!0}),t},a1=(e,t)=>rf.default.join(i1(e),`${t}.json`),l1=(e,t)=>{Zs.default.writeFileSync(a1(e,t.id),JSON.stringify(t,null,2))},_c=(e,t)=>{let r=a1(e,t);if(!Zs.default.existsSync(r))return null;try{let o=JSON.parse(Zs.default.readFileSync(r,"utf8"));return!w9(o)||typeof o.id!="string"?null:o}catch{return null}},U_=e=>{let t=i1(e),r=Zs.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=_c(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var v9,c1,d1=l(()=>{"use strict";o1();n1();B_();v9=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=r1({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:F_.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},c1=(e,t)=>{let r=v9(t);return l1(e,r),r}});var u1=l(()=>{"use strict";fg()});var p1,m1=l(()=>{"use strict";ef();p1=()=>[Zg,`agentRunWriterExecutionBackend=${Qg}`,`agentRunWriterExecutionReasonCode=${D_}`].join(`
`)});var eo,of=l(()=>{"use strict";eo=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var G_,_9,W9,g1,f1=l(()=>{"use strict";G_=e=>e.toLocaleString("en-US"),_9=e=>e<.01?e.toFixed(4):e.toFixed(3),W9=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${_9(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${G_(e.inputTokens)} in / ${G_(e.outputTokens)} out (${G_(e.totalTokens)} total)`,t].join(`
`)},g1=(e,t)=>{if(t===void 0)return e;let r=W9(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var h1=l(()=>{"use strict";pe()});var S1,Wc,ge,V_,nf,y1,L9,k9,A1,b1,P1,Lc,q_,K_,J_,w1,E9,lt,kc,to,v1,C9,R9,sf,Y_,X_,Z_,_1=l(()=>{"use strict";S1=require("node:child_process");pe();gt();pF();Gl();w_();hF();uu();bF();Fg();wF();dc();WF();Bg();Gg();qg();FF();N_();d1();u1();m1();of();f1();In();h1();hc();Li();qg();Wc=new Map,ge=new Map,V_=new Set,nf=new Map,y1=e=>{e!==void 0&&!nf.has(e)&&nf.set(e,Date.now())},L9=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(Ut(t)){lt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}vr(t,n)},k9=(e,t,r,o,n)=>{if(!Dy(e,n))return;let s=`${p1()}
`;L9(t,r,o,s);let i=ge.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},A1=130,b1=`

Stopped by user.`,P1=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:eo(e)},Lc=null,q_=e=>{Lc=e},K_=(e,t)=>{if(Lc===null)return;let r=Vw(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||zS(Lc,t,r)},J_=async e=>{await __({layout:e,cloudApi:Lc})},w1=e=>{let t=Wc.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:wr(t.pid)},E9=e=>ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),lt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},kc=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=En(s),c=ge.get(r);if(a!==null&&c!==void 0){let d=Qk(a),p=w1(r)||R_(r);d!==null&&!p&&to(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return Zk(a)}}),to=(e,t,r,o,n,s,i,a)=>{let c=$n(s,a),d=n,p=g1(c.output,c.llmUsage);if(r!==void 0){let A=nf.get(r);nf.delete(r),A!==void 0&&Bw({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-A)/1e3))});let h=fF(c.llmUsage,p);h!==null&&MD({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&V_.has(r)&&(V_.delete(r),d=A1,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${b1}`:"Stopped by user.");let g=r!==void 0?Vw(e.layout.reportsDir,r):null;if(r!==void 0){Ac(r),Yi(e.layout,r),Ut(r)&&(lt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),LF(r));let A=ge.get(r);TD({reportsDir:e.layout.reportsDir,agentRunId:r,input:eo(i),output:p,...A!==void 0?{writerLabel:yc({writerAgent:A.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),A!==void 0&&mg({layout:e.layout,writerAgent:A.writerAgent,projectFolderPath:A.projectFolderPath,userPrompt:A.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),c1(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),AF(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),__({layout:e.layout,cloudApi:Lc}),ge.delete(r),Wc.delete(r),jg(e.layout,r)}lt(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),Mi(e.layout)},v1=(e,t,r,o,n,s,i)=>{let a=ge.get(r),c=a?.accumulatedOutput??s;uF(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),yn(t,r,()=>P_(e.layout,r),kc(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),lt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},C9=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(n===void 0||h.length===0)){if(Ut(n)){lt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}vr(n,h)}};if(n!==void 0){let h=ge.get(n);Wc.set(n,t),ge.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),lt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),yn(r,n,()=>w1(n),kc(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let g=a==="claude-cli",A=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(g?A.push(y):(c.push(y),p(y)),d||n===void 0)return;let u=Pc(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let S=ge.get(n),b=[S?.accumulatedOutput??"",u.partialOutput].filter(f=>f.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=b),Wc.delete(n),v1(e,r,n,o,u.question,b,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;Xg(a);let y=n!==void 0?ge.get(n):void 0,u=g?$n(A.join("")):{output:c.join("").trim(),llmUsage:void 0},S=g?c.join("").trim():"",b=[u.output.trim(),S].filter(w=>w.length>0).join(`
`);g&&u.output.trim().length>0&&p(u.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${b}`.trim():b;to(e,r,n,o,h??-1,f,s,u.llmUsage)}),t.on("error",h=>{d||to(e,r,n,o,-1,h.message,s)})},R9=(e,t,r,o,n,s,i,a,c)=>{let d=P1(r,c);s!==void 0&&(ge.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),lt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),yn(n,s,()=>ge.has(s),kc(e,n,s,o,i,a))),Vi(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(Ut(s)){lt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}vr(s,g)}}).then(g=>{Xg(t),to(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let A=g instanceof Error?g.message:String(g);to(e,n,s,o,-1,A,r)})},sf=(e,t,r,o,n,s,i,a,c,d,p,g)=>{let A=P1(r,p);if(Oi(e.layout),Lo(e,t)){y1(s),R9(e,t,r,o,n,s,c,d,A);return}let h=xt(t,r,E9(e),i);if(h===null){to(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}y1(s);let y=_F({workspace:e.workspace,projectFolderPath:c}),u=()=>{let S=(0,S1.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:g??process.env});C9(e,S,n,o,s,r,A,t)};if(s===void 0){u();return}ge.set(s,{originalPrompt:r,userTranscriptPrompt:A,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:ge.get(s)?.accumulatedOutput??""}),k9(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Wi({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),yn(n,s,()=>ge.has(s),kc(e,n,s,o,c,d)),HF({socket:n,sendMessage:lt,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:S=>{a!==void 0&&Ys(a,w=>{lt(n,w)},o);let b=ge.get(s),f=[b?.accumulatedOutput??"",S.partialOutput].filter(w=>w.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=f),v1(e,n,s,o,S.question,f,r)},onFinished:(S,b)=>{Xg(t);let f=$n(b),w=ge.get(s),v=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${f.output}`.trim():f.output;to(e,n,s,o,S,v,r,f.llmUsage)}}).then(S=>{if(!S){u();return}yn(n,s,()=>R_(s),kc(e,n,s,o,c,d))}).catch(S=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",S instanceof Error?S.message:S),u()})},Y_=(e,t,r,o)=>{jg(e.layout,t.agentRunId),t.shellSessionId!==void 0&&lt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=$F(t),s=ge.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;sf(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},X_=(e,t)=>{for(let r of dF(e.layout))ge.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:eo(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),yn(t,r.agentRunId,()=>P_(e.layout,r.agentRunId),{awaitingInput:!0}),lt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Z_=(e,t,r,o)=>{let n=ge.get(r);if(n===void 0)return!1;V_.add(r),Ac(r);let s=Wc.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(NF(r))return!0;jg(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${b1}`:"Stopped by user.";return to(e,t,r,o,A1,i,n.originalPrompt),!0}});var x9,Q_,W1=l(()=>{"use strict";ea();x9=()=>`http://127.0.0.1:${ft()}/restart`,Q_=async()=>{try{let e=await fetch(x9(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var L1=l(()=>{"use strict";Fa()});var k1=l(()=>{"use strict";Pv()});var E1,C1=l(()=>{"use strict";E1=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Ec,T9,eW,R1=l(()=>{"use strict";V();te();L1();wA();k1();C1();In();Ec=(e,t)=>{$r(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},T9=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(ty(),ey)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},eW=async e=>{let t=Ce(e.layout.installDir)?.bundleVersion??null;if(!E1({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(mt(e.layout)){Ni({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Ec(e.layout,{summary:r,action:"install-bundle-update-start"}),Kt({launchAgentLabel:se(e.layout.installDir),installDir:e.layout.installDir});let o=await js({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),Ec(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await T9();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Ec(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),Ec(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),Ec(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var I9,tW,x1=l(()=>{"use strict";I9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),tW=e=>{if(!I9(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var rW,oW,T1=l(()=>{"use strict";rA();oA();rW=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=_a({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},oW=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await or(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var I1,O9,M9,N9,Cc,O1=l(()=>{"use strict";I1=m(require("node:os"));Ee();O9="Default",M9=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),N9=e=>{let t=I1.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Cc=()=>{let e=N(),t=$d(e),r=M9(O9);return`${N9(t)}/${r.length>0?r:"project"}`}});var M1=l(()=>{"use strict";Fa()});var N1,nW,z1=l(()=>{"use strict";M1();N1=!1,nW=e=>{N1||(N1=!0,process.on("uncaughtException",t=>{Ho(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;Ho(e,{kind:"crash",message:r,stack:o})}))}});var j1,z9,sW,D1=l(()=>{"use strict";j1=require("node:child_process");Kg();gt();$g();Dg();hc();Hg();z9=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,j1.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},sW=async e=>{if(!de(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&xe(e.runConfig.writerExecutionBackend)==="api"){let r=Ke(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=we(e.layout.configPath),n=De(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await _r(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await z9(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var iW,$1=l(()=>{"use strict";iW=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var H1,aW,F1=l(()=>{"use strict";H1=require("node:crypto"),aW=()=>(0,H1.randomUUID)()});var Qs,U1,af=l(()=>{"use strict";Qs="[[WORKING_ESTIMATE]]",U1=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Qs,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var B1,G1=l(()=>{"use strict";B1=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var j9,V1,q1=l(()=>{"use strict";af();j9=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,V1=e=>{if(!e.includes(Qs))return null;let t=null;for(let r of e.matchAll(j9)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var D9,lW,K1=l(()=>{"use strict";q1();D9=/^(\d{1,6})\b/,lW=e=>{let t=V1(e);if(t!==null)return t;let r=D9.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var $9,H9,F9,lf,cW=l(()=>{"use strict";gt();Da();$9="http://127.0.0.1:11434",H9=45e3,F9=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},lf=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||$9,o=t===void 0?(await At({commands:ue({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(H9)});return n.ok?F9(await n.json()):null}catch{return null}}});var dW,uW,pW,J1=l(()=>{"use strict";Li();af();of();G1();K1();Gl();cW();dW=async e=>{let t=eo(e.wrappedPrompt),r=ID(e.reportsDir);return{estimateOutput:await lf(U1(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},uW=e=>{let t=lW(e.estimateOutput);t!==null&&ig({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},pW=e=>{let t=lW(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=B1(t);return _i({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Ct.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),ig({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var cf,Y1,mW=l(()=>{"use strict";cf="[[WORKING_TOKEN_ESTIMATE]]",Y1=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",cf,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var X1,U9,Z1,Q1=l(()=>{"use strict";mW();X1=/^(\d{1,8})\b/,U9=e=>{let t=e.indexOf(cf);if(t<0)return null;let r=e.slice(t+cf.length).trim(),o=X1.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},Z1=e=>{let t=U9(e);if(t!==null)return t;let r=X1.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var gW,fW,eU=l(()=>{"use strict";mW();of();Q1();Gl();cW();gW=async e=>{let t=eo(e.wrappedPrompt),r=ND(e.reportsDir);return{estimateOutput:await lf(Y1(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},fW=e=>{let t=Z1(e.estimateOutput);return t===null?null:(OD({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var tU=l(()=>{"use strict";h_();eF();rF();iF();ea();_1();Kg();gt();B_();Bg();W1();uA();R1();In();x1();T1();Fg();O1();z1();D1();Zd();$1();F1();af();Li();J1();eU();w_();Da();Gg();N_()});var rU={};Lt(rU,{buildContinuationPromptWithContext:()=>V9});var B9,G9,V9,oU=l(()=>{"use strict";B9=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,G9=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),V9=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=G9(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${B9(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var nU={};Lt(nU,{readHarnessExportSets:()=>K9});var Rc,hW,df,q9,K9,sU=l(()=>{"use strict";Rc=m(require("node:fs")),hW=m(require("node:path"));Ee();df=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),q9=e=>{if(!Rc.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Rc.default.readFileSync(e.harnessManifestPath,"utf8"));if(df(t))return t}catch{return null}return null},K9=(e,t)=>{let r=N(t),o=q9(r);if(o===null)return[];let n=df(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!df(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!df(p))continue;let g=typeof p.path=="string"?p.path:void 0,A=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(g===void 0||A.length===0||h.length===0||y.length===0)continue;let u=g.startsWith("shared/")?hW.default.join(r.harnessRootDir,g):hW.default.join(r.harnessSetsDir,i,g);Rc.default.existsSync(u)&&d.push({id:A,kind:h,title:y,content:Rc.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var vW,SW,ei,iU,J9,aU,lU,yW,cU,AW,bW,PW,Y,B,wW,Y9,xc,X9,Z9,Q9,eY,tY,rY,oY,nY,Tc,dU=l(()=>{"use strict";vW=require("node:child_process"),SW=m(require("node:fs")),ei=m(require("node:os"));GH();V();te();Qn();Iv();JH();pe();tt();Fa();Tb();Pg();fg();yt();xo();IA();Zt();tU();iU=3e4,J9=3e4,aU=new Map,lU=new Map,yW=new Map,cU=new Map,AW=new Map,bW=new Map,PW=new Map,Y=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),B=(e,t,r)=>{e.readyState===cc.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&($r(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Mp(r,"out",t)))},wW=e=>e,Y9=e=>{if(!SW.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(SW.default.readFileSync(e.harnessManifestPath,"utf8"));if(Y(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},xc=(e,t)=>{let r=Y9(t);r!==null&&B(e,{type:"harness.manifest.report",payload:{hostname:ei.default.hostname(),manifest:r}})},X9=async(e,t,r,o,n,s,i=!1,a,c,d,p,g)=>{let A=g?.trim()??"";if(!de(t)){B(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=yc({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await At({commands:ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?dW({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,S=s!==void 0?gW({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,b=vc(t)&&!T_(t);if(b){try{await _r(e.layout.installDir,t)}catch($){let Pe=$ instanceof Error?$.message:String($);B(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Pe}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}wc(t)}else if(!vc(t))try{await _r(e.layout.installDir,t)}catch($){let Pe=$ instanceof Error?$.message:String($);B(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Pe}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Ki(d,Cc,g);if(f===null){B(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Je({projectFolderPath:f,...A.length>0?{projectId:A}:{}}),i||Yl(e.layout,t,f);let w=gg({sessionContinuation:i,supportsWriterSessionContinuation:Jg(t),isWriterConversationStarted:Yg(t)}),v=i&&w==="first"?Jl(e.layout,t,f):null,_=v!==null?zs(e.layout,v):null,k=_!==null&&_.turns.length>0,E=av({sessionContinuation:i,supportsWriterSessionContinuation:Jg(t),isWriterConversationStarted:Yg(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:k,userPromptCharacterCount:r.length}),x=r;if(E.continuationStrategy==="source_run_seed"){let $=typeof c=="string"&&c.length>0?_c(e.layout,c):null;if($!==null){let{buildContinuationPromptWithContext:Pe}=await Promise.resolve().then(()=>(oU(),rU));x=Pe({priorPrompt:$.prompt,priorOutput:$.resultOutput??"",userMessage:r})}}else E.continuationStrategy==="transcript_seed"&&_!==null&&_.turns.length>0&&(x=cg({priorTurns:_.turns,userMessage:r}));let I=E.ragLimit>0?await ds({layout:e.layout,query:x,limit:E.ragLimit,minScore:E.ragMinScore,projectFolderPath:f,...A.length>0?{projectId:A}:{}}):[],M=E.ragLimit>0&&f.trim().length>0?await Rb({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:f,...A.length>0?{projectId:A}:{}}):[],X=E.injectMemory?Xw(e.layout,f,A.length>0?A:void 0):[],G=`${Qw(X,E.memoryEntryLimit)}${kb(I)}${xb(M)}${x}`,F=p?.trim()??(s!==void 0&&f.trim().length>0?aW():void 0);if(s!==void 0&&F!==void 0&&F.length>0&&f.trim().length>0){Wi({reportKey:F,agentRunId:s,userSummary:"Working on your Mac\u2026"});let $=G;u!==null&&u.then(Pe=>{if(Pe===null)return;let Bt=pW({estimateOutput:Pe.estimateOutput??"",reportKey:F,agentRunId:s,reportsDir:e.layout.reportsDir,task:Pe.task,writerLabel:Pe.writerLabel,embedding:Pe.embedding});if(Bt.estimateSeconds===null)return;K_(e.layout.reportsDir,s);let ti=`${Qs}
${Bt.estimateSeconds}
`;if(Ut(s)){B(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:ti},requestId:o});return}vr(s,ti)}).catch(()=>{}),G=iW($),G=Lh(G,{agentRunId:s,reportKey:F,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then($=>{$!==null&&uW({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel,embedding:$.embedding})}).catch(()=>{}),s!==void 0&&S!==null&&S.then($=>{$!==null&&fW({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel})}).catch(()=>{});let ro=s!==void 0&&PW.get(s)===!0;if(s!==void 0&&f.trim().length>0){let $=await dp(f);bW.set(s,$),F!==void 0&&F.length>0&&AW.set(s,F)}sf(e,t,G,o,wW(n),s,{sessionTurn:E.sessionTurn},a,f,F,r,Iy(e.layout,s,ro)),b&&s!==void 0&&B(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:O_(t)},requestId:o})},Z9=async(e,t,r,o,n)=>{let s=(i,a)=>{B(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await M_({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,B(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=de(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Xs(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},Q9=(e,t,r)=>new Promise(o=>{if(!de(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=xt(t,r,ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,vW.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),eY=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;B(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=It(t.bundle),s=Y(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=Re(e.wsUrl)??Yt,g=await AS({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return B(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=Ro({bundle:i,layout:e.layout});return B(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&xc(o,e.layout),!0},tY=async(e,t,r,o)=>{if(await eY(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(B(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){B(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!de(n)){B(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}Oi(e.layout);let i=await(async()=>{try{await _r(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return Q9(e,n,s)})().finally(()=>{Mi(e.layout)});B(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),xc(o,e.layout)},rY=e=>{let t=1e3*2**e;return Math.min(J9,t)},oY=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(mt(e.layout)){qh(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,Q_().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(u,S="system.ack")=>{if(!t.selfUpdateInFlight){if(mt(e.layout)){Ni({layout:e.layout,remoteBundleVersion:u,trigger:S}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${S}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,eW({layout:e.layout,remoteBundleVersion:u,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let u=ve(e.layout);u!==null&&ze(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===cc.OPEN||u.readyState===cc.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,iU)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=rY(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},g=u=>{s();let S=()=>{let b=Ri(e.layout.installDir),f=ft();B(u,{type:"agent.heartbeat",payload:{hostname:ei.default.hostname(),macOsUsername:ei.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:b}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,iU)},A=(u,S)=>{if(typeof u.type!="string")return;if(TA(u)){t.stopped=!0,s(),a(),c(),EA({layout:e.layout}).finally(()=>{uc(),process.exit(0)});return}$r(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),Mp(e.layout,"in",u);let b=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&Y(u.payload)){let f=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",w=typeof u.payload.origin=="string"?u.payload.origin:"",v=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",_=typeof u.payload.challenge=="string"?u.payload.challenge:"",k=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!Tv({serverPublicKey:f,origin:w,devicePublicKey:v,challenge:_,serverAttestation:k})){t.wakeError="Server attestation verification failed",$r(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&Y(u.payload)){let f=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";$r(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),sW({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{B(S,{type:"writer.status",payload:w},e.layout)})}if(u.type==="install.bundle.update"&&Y(u.payload)){let f=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";f.length>0&&o(f,"install.bundle.update")}if(u.type==="system.ack"){yp(e.layout,{wsUrl:e.wsUrl});let f=Y(u.payload)?u.payload:null,w=tW(f);w!==null&&o(w)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&Y(u.payload)&&rW(u.payload),u.type==="automations.run"&&Y(u.payload)&&oW(u.payload),u.type==="terminal.stream.accepted"&&Y(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"";if(f.length>0){let w=k_(f);for(let v of w)B(S,{type:"terminal.stream.chunk",payload:{runId:f,chunk:v},requestId:b})}}if(u.type==="agent.agentRun.list"&&B(S,{type:"dashboard.agentRun.list.result",payload:{runs:U_(e.layout)},requestId:b}),u.type==="agent.agentRun.get"&&Y(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"",w=f.length>0?_c(e.layout,f):null;B(S,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:b})}if(u.type==="command.claude.run"&&Y(u.payload)){let f=u.payload.prompt,w=typeof u.payload.writerAgent=="string"&&de(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",v=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,_=u.payload.sessionContinuation===!0,k=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,E=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,x=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=Ki(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,Cc,x),M=Ly(u.payload.compositionSnapshot),X=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${_?"continue":"first"})\u2026`),I===null){B(S,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...v!==void 0?{agentRunId:v}:{}},requestId:b});return}if(M!==null){let G=Ey(e.layout,M);if(G!==null){B(S,{type:"command.claude.result",payload:{exitCode:-1,output:G,...v!==void 0?{agentRunId:v}:{}},requestId:b});return}if(v!==void 0){let F=Ry(e.layout,v,M);if(!F.ok){B(S,{type:"command.claude.result",payload:{exitCode:-1,output:F.errorMessage,...v!==void 0?{agentRunId:v}:{}},requestId:b});return}PW.set(v,M.entries.some(ro=>ro.scope==="run"))}}v!==void 0&&E!==void 0&&aU.set(v,E),v!==void 0&&(lU.set(v,I),x!==void 0&&x.trim().length>0&&yW.set(v,x.trim()),cU.set(v,f.trim()),Je({projectFolderPath:I,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),X9(e,w,f.trim(),b,S,v,_,E,k,I,X,x)}}if(u.type==="shell.session.open"&&Y(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:120,v=typeof u.payload.rows=="number"?u.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),x_({shellSessionId:f,cwd:e.workspace,cols:w,rows:v,send:_=>{B(S,_)},requestId:b}))}if(u.type==="shell.session.close"&&Y(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";f.length>0&&Ys(f,w=>{B(S,w)},b)}if(u.type==="shell.input"&&Y(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.data=="string"?u.payload.data:"";f.length>0&&w.length>0&&E_(f,w)}if(u.type==="shell.resize"&&Y(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:0,v=typeof u.payload.rows=="number"?u.payload.rows:0;f.length>0&&w>0&&v>0&&C_(f,w,v)}if(u.type==="command.writer.session.end"&&Y(u.payload)){let f=u.payload.writerAgent;typeof f=="string"&&de(f)&&(I_(f),pg(e.layout,f))}if(u.type==="command.writer.session.start"&&Y(u.payload)){let f=u.payload.writerAgent,w=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof f=="string"&&de(f)&&w.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),Z9(e,f,w,b,S))}if(u.type==="command.claude.stop"&&Y(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),Z_(e,wW(S),f,b))}if(u.type==="command.claude.input_respond"&&Y(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",w=typeof u.payload.response=="string"?u.payload.response.trim():"",v=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",_=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",k=typeof u.payload.question=="string"?u.payload.question:"";f.length>0&&w.length>0&&v.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),Y_(e,{agentRunId:f,originalPrompt:v,partialOutput:_,question:k,response:w,shellSessionId:aU.get(f)},b,wW(S)))}if(u.type==="dispatch.approval.required"&&Y(u.payload)){let f=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",w=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${w}`),process.platform==="darwin"&&(0,vW.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&Y(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),tY(e,u.payload,b,S)),u.type==="harness.export.request"&&Y(u.payload)){let f=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",w=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,v=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(_=>typeof _=="string"):[];f.length>0&&v.length>0&&(async()=>{let{readHarnessExportSets:_}=await Promise.resolve().then(()=>(sU(),nU)),k=_(v,e.email);B(S,{type:"harness.export.result",payload:{success:k.length>0,borrowerUserId:f,...w!==void 0?{targetDeviceId:w}:{},sets:k,errorMessage:k.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(u.type==="harness.manifest.request"&&xc(S,e.layout),u.type==="command.claude.result"&&Y(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,w=typeof u.payload.output=="string"?u.payload.output:"",v=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,_=Ki(f!==void 0?lU.get(f):void 0,Cc),k=f!==void 0?yW.get(f):void 0,E=f!==void 0?cU.get(f)??"":"",x=qS({exitCode:v,output:w});if(x&&_!==null&&Lb({layout:e.layout,text:w,source:f??"command.claude.result",projectFolderPath:_,...k!==void 0?{projectId:k}:{}}),v!=null&&v!==0&&w.trim().length>0&&_!==null&&(Pb({layout:e.layout,errorText:w,projectFolderPath:_,...k!==void 0?{projectId:k}:{}}),Cb({layout:e.layout,text:w,source:f??"command.claude.result.failure",projectFolderPath:_,...k!==void 0?{projectId:k}:{}})),x&&E.trim().length>0&&_!==null&&Zw({layout:e.layout,projectFolderPath:_,...k!==void 0?{projectId:k}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:E,output:w,createdAt:new Date().toISOString()}}),f!==void 0&&_!==null){let M=AW.get(f),X=bW.get(f);M!==void 0&&X!==void 0&&dp(_).then(G=>{let F=KS({before:X,after:G});kh(M,F),bW.delete(f),AW.delete(f)})}if(x&&k!==void 0&&k.trim().length>0){let M=H(),X=M===null?null:Z({wsUrl:M.wsUrl,pairingToken:M.pairingToken});X!==null&&YS(X,k,{...f!==void 0?{sourceRunId:f}:{},lesson:JS({prompt:E,output:w})})}f!==void 0&&(Yi(e.layout,f),PW.delete(f),yW.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let u=new cc(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),q_(Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),J_(e.layout);let S=Re(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=xv({layout:e.layout,origin:S,...b!==void 0&&b.length>0?{claimToken:b}:{}});B(u,{type:"agent.register",payload:{role:"agent",hostname:ei.default.hostname(),macOsUsername:ei.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),xc(u,e.layout),X_(e,u),g(u)}),u.on("message",S=>{let b=typeof S=="string"?S:S.toString("utf8");try{let f=JSON.parse(b);if(!Y(f))return;A(f,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(S,b)=>{s(),t.socket=void 0,t.wsConnected=!1,iA(e.layout),t.reconnectAttempt+=1;let f=typeof b=="string"?b:b.toString("utf8");Ho(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:f}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",S=>{t.wakeError=S.message,Ho(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return Vh(()=>{let u=Kh();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&o(u.remoteBundleVersion,u.trigger);let S=Jh();S!==null&&r(S)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Ra(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:tc(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(xc(u,e.layout),{ok:!0})}}},nY=async()=>{Ve("agent-witch");let e=u_(),t=L();f_().ok||(process.platform==="darwin"?(await go(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),A_(t);let o=S_({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(Kt({launchAgentLabel:se(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),yi());let n=await Fy(),s=n[0];s!==void 0&&nW(s.layout);for(let h of n){let y=Re(h.wsUrl)??Yt;xi(h.layout.installDir,y)}let i=n.map(h=>oY(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),uc(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let S=ve(h.layout);aA(S,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(mt(h)||xa(h.installDir))},g=await b_({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):ec({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let A=Jt(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Si(),d()});d=()=>{A(),g.stop(),uc(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Tc=nY});var _W=l(()=>{"use strict";dU()});var uU={};Lt(uU,{startAgentWitchClient:()=>Tc});var pU=l(()=>{"use strict";_W();_W();yo();Eh();eu();if(!qe()&&So(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Qd(process.argv.slice(e))),Tc()}});_h();Eh();yo();eu();var rE="20.x",oE="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var yV=e=>[`Node.js ${rE} or newer is required (found ${e}).`,oE].join(" "),nE=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${yV(process.version)}
`),process.exit(1))};var sY=async()=>{Ve("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(ty(),ey)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},iY=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(s0(),n0)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},aY=async()=>{if(!So(qe()?void 0:__agentWitchImportMetaUrl))return;nE();let e=process.argv.indexOf("report");e>=0&&process.exit(Qd(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await sY();return}if(t==="wake"){await iY();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(iT(),sT));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>($$(),D$));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(pU(),uU));await r()};aY();
