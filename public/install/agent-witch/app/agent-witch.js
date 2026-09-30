#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var _1=Object.create;var rf=Object.defineProperty;var W1=Object.getOwnPropertyDescriptor;var L1=Object.getOwnPropertyNames;var E1=Object.getPrototypeOf,C1=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var W=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},wt=(e,t)=>{for(var r in t)rf(e,r,{get:t[r],enumerable:!0})},k1=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of L1(t))!C1.call(e,n)&&n!==r&&rf(e,n,{get:()=>t[n],enumerable:!(o=W1(t,n))||o.enumerable});return e};var m=(e,t,r)=>(r=e!=null?_1(E1(e)):{},k1(t||!e||!e.__esModule?rf(r,"default",{value:e,enumerable:!0}):r,e));var fn=W(of=>{"use strict";Object.defineProperty(of,"__esModule",{value:!0});of.stringify=R1;function R1(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=W(nf=>{"use strict";Object.defineProperty(nf,"__esModule",{value:!0});nf.generateTypeGuardError=x1;var rW=fn();function x1(e,t,r){return(0,rW.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,rW.stringify)(e)}) to be "${r}"`}});var wr=W(Lc=>{"use strict";Object.defineProperty(Lc,"__esModule",{value:!0});Lc.isNonNullObject=void 0;var T1=O(),I1=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,T1.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Lc.isNonNullObject=I1});var vt=W(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.attachTypeGuardMeta=he.isArrayTypeGuard=he.isNestedObjectTypeGuard=he.getTypeGuardWrapperKind=he.getTypeGuardInnerGuard=he.getTypeGuardItemGuard=he.getTypeGuardSchema=void 0;var O1=e=>e.schema;he.getTypeGuardSchema=O1;var M1=e=>e.itemGuard;he.getTypeGuardItemGuard=M1;var N1=e=>e.innerGuard;he.getTypeGuardInnerGuard=N1;var j1=e=>e.wrapperKind;he.getTypeGuardWrapperKind=j1;var z1=e=>{if((0,he.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};he.isNestedObjectTypeGuard=z1;var D1=e=>{if((0,he.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};he.isArrayTypeGuard=D1;var $1=(e,t)=>Object.assign(e,t);he.attachTypeGuardMeta=$1});var Ks=W(to=>{"use strict";Object.defineProperty(to,"__esModule",{value:!0});to.getExpectedTypeName=to.getTypeGuardDisplayName=void 0;var oW=vt(),H1=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};to.getTypeGuardDisplayName=H1;var F1=e=>{let t=(0,oW.getTypeGuardWrapperKind)(e),r=(0,oW.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,to.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};to.getExpectedTypeName=F1});var ro=W(Ec=>{"use strict";Object.defineProperty(Ec,"__esModule",{value:!0});Ec.createValidationResult=void 0;var U1=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Ec.createValidationResult=U1});var hn=W(Cc=>{"use strict";Object.defineProperty(Cc,"__esModule",{value:!0});Cc.createValidationError=void 0;var B1=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Cc.createValidationError=B1});var yn=W(kc=>{"use strict";Object.defineProperty(kc,"__esModule",{value:!0});kc.createTreeNode=void 0;var G1=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});kc.createTreeNode=G1});var Js=W(Rc=>{"use strict";Object.defineProperty(Rc,"__esModule",{value:!0});Rc.combineResults=void 0;var V1=ro(),q1=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,V1.createValidationResult)(r,o,n)};Rc.combineResults=q1});var Tc=W(xc=>{"use strict";Object.defineProperty(xc,"__esModule",{value:!0});xc.createSimplifiedTree=void 0;var nW=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=nW(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},K1=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=nW(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};xc.createSimplifiedTree=K1});var Xs=W(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.validateObject=void 0;var J1=wr(),Ys=ro(),Y1=hn(),Ic=yn(),X1=Js(),sW=Mc(),Z1=(e,t,r)=>{let o=()=>{let i=(0,Y1.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Ic.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Ys.createValidationResult)(!1,[],a):(0,Ys.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Ys.createValidationResult)(!0,[],(0,Ic.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,g=d,A=t[g],h=e[g],y=(0,sW.validateProperty)(g,h,A,r);return y.valid?p.length===0?(0,Ys.createValidationResult)(!0,[],(0,Ic.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,sW.validateProperty)(d,e[d],p,r)}),a=(0,X1.combineResults)(i,r.path),c=(0,Ic.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,Ys.createValidationResult)(a.valid,a.errors,c)};return(0,J1.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};Oc.validateObject=Z1});var aW=W(zc=>{"use strict";Object.defineProperty(zc,"__esModule",{value:!0});zc.validateArray=void 0;var Q1=fn(),Nc=ro(),iW=hn(),jc=yn(),eU=Js(),tU=Xs(),rU=Ks(),oU=vt(),nU=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,iW.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,jc.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,Nc.createValidationResult)(!1,[c],d)}let n=(0,oU.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,g={path:p,config:r.config||null};if(n)return(0,tU.validateObject)(c,n,g);let A=t(c,null),h=(0,rU.getExpectedTypeName)(t),y=(0,Q1.stringify)(c);if(A)return(0,Nc.createValidationResult)(!0,[],(0,jc.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,S=(0,iW.createValidationError)(p,h,c,u),b=(0,jc.createTreeNode)(p,!1,h,c);return b.errors=[S],(0,Nc.createValidationResult)(!1,[S],b)}),i=(0,eU.combineResults)(s,o),a=(0,jc.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,Nc.createValidationResult)(i.valid,i.errors,a)};zc.validateArray=nU});var Mc=W($c=>{"use strict";Object.defineProperty($c,"__esModule",{value:!0});$c.validateProperty=void 0;var lW=ro(),sU=hn(),cW=yn(),iU=Ks(),Dc=vt(),aU=Xs(),lU=aW(),cU=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,Dc.getTypeGuardSchema)(r),c=(0,Dc.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,aU.validateObject)(t,a,s);if(c&&(0,Dc.isArrayTypeGuard)(r))return(0,lU.validateArray)(t,c,s)}let d=p=>{let g=r(t,p),A=(0,iU.getExpectedTypeName)(r);return g?(0,lW.createValidationResult)(!0,[],(0,cW.createTreeNode)(n,!0,A,t)):(()=>{let h=(0,sU.createValidationError)(n,A,t,`Expected ${n} (${JSON.stringify(t)}) to be "${A}"`),y=(0,cW.createTreeNode)(n,!1,A,t);return y.errors=[h],(0,lW.createValidationResult)(!1,[h],y)})()};if((0,Dc.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};$c.validateProperty=cU});var Fc=W(Hc=>{"use strict";Object.defineProperty(Hc,"__esModule",{value:!0});Hc.isNil=void 0;var dU=O(),uU=function(e,t){return e!=null?(t&&t.callbackOnError((0,dU.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Hc.isNil=uU});var sf=W(Uc=>{"use strict";Object.defineProperty(Uc,"__esModule",{value:!0});Uc.isDefined=void 0;var pU=O(),mU=Fc(),gU=function(e,t){return(0,mU.isNil)(e,null)?(t&&t.callbackOnError((0,pU.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Uc.isDefined=gU});var af=W(Bc=>{"use strict";Object.defineProperty(Bc,"__esModule",{value:!0});Bc.reportValidationResults=void 0;var fU=Tc(),dW=sf(),hU=Fc(),yU=(e,t)=>{if(e.valid===!0||(0,hU.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,dW.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,fU.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,dW.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Bc.reportValidationResults=yU});var lf=W(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.Validation=Q.reportValidationResults=Q.validateObject=Q.validateProperty=Q.createSimplifiedTree=Q.combineResults=Q.createTreeNode=Q.createValidationError=Q.createValidationResult=Q.getExpectedTypeName=void 0;var SU=Ks();Object.defineProperty(Q,"getExpectedTypeName",{enumerable:!0,get:function(){return SU.getExpectedTypeName}});var AU=ro();Object.defineProperty(Q,"createValidationResult",{enumerable:!0,get:function(){return AU.createValidationResult}});var bU=hn();Object.defineProperty(Q,"createValidationError",{enumerable:!0,get:function(){return bU.createValidationError}});var PU=yn();Object.defineProperty(Q,"createTreeNode",{enumerable:!0,get:function(){return PU.createTreeNode}});var wU=Js();Object.defineProperty(Q,"combineResults",{enumerable:!0,get:function(){return wU.combineResults}});var vU=Tc();Object.defineProperty(Q,"createSimplifiedTree",{enumerable:!0,get:function(){return vU.createSimplifiedTree}});var _U=Mc();Object.defineProperty(Q,"validateProperty",{enumerable:!0,get:function(){return _U.validateProperty}});var WU=Xs();Object.defineProperty(Q,"validateObject",{enumerable:!0,get:function(){return WU.validateObject}});var LU=af();Object.defineProperty(Q,"reportValidationResults",{enumerable:!0,get:function(){return LU.reportValidationResults}});var EU=ro(),CU=Js(),kU=hn(),RU=yn(),xU=Mc(),TU=Xs(),IU=af(),OU=Tc();Q.Validation={result:EU.createValidationResult,combine:CU.combineResults,error:kU.createValidationError,treeNode:RU.createTreeNode,property:xU.validateProperty,object:TU.validateObject,report:IU.reportValidationResults,createSimplifiedTree:OU.createSimplifiedTree}});var Gc=W(cf=>{"use strict";Object.defineProperty(cf,"__esModule",{value:!0});cf.isType=NU;var uW=wr(),pW=lf(),MU=vt();function NU(e){if(!(0,uW.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,pW.validateObject)(r,e,s);return(0,pW.reportValidationResults)(i,o||null),i.valid}return(0,uW.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,MU.attachTypeGuardMeta)(t,{schema:e})}});var hW=W(oo=>{"use strict";Object.defineProperty(oo,"__esModule",{value:!0});oo.isNestedType=oo.isShape=void 0;oo.isSchema=Zs;var mW=wr(),gW=lf(),fW=vt();function Zs(e){if(!(0,mW.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=zU(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,gW.validateObject)(o,t,i);return(0,gW.reportValidationResults)(a,n||null),a.valid}return(0,mW.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,fW.attachTypeGuardMeta)(r,{schema:t})}function jU(e){return typeof e=="function"?e:Array.isArray(e)?DU(e):typeof e=="object"&&e!==null?Zs(e):e}function zU(e){let t={};for(let[r,o]of Object.entries(e))t[r]=jU(o);return t}function DU(e){let t=e[0],r=Zs(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,fW.attachTypeGuardMeta)(o,{itemGuard:r})}oo.isShape=Zs;oo.isNestedType=Zs});var yW=W(df=>{"use strict";Object.defineProperty(df,"__esModule",{value:!0});df.isObjectWith=HU;var $U=Gc();function HU(e){return(0,$U.isType)(e)}});var SW=W(uf=>{"use strict";Object.defineProperty(uf,"__esModule",{value:!0});uf.isObject=UU;var FU=Gc();function UU(e){return(0,FU.isType)(e)}});var AW=W(pf=>{"use strict";Object.defineProperty(pf,"__esModule",{value:!0});pf.guardWithTolerance=BU;function BU(e,t,r){return t(e,r),e}});var bW=W(mf=>{"use strict";Object.defineProperty(mf,"__esModule",{value:!0});mf.isBranded=VU;var GU=O();function VU(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,GU.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var PW=W(Vc=>{"use strict";Object.defineProperty(Vc,"__esModule",{value:!0});Vc.BrandSymbols=void 0;Vc.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var wW=W(qc=>{"use strict";Object.defineProperty(qc,"__esModule",{value:!0});qc.isAny=void 0;var qU=function(e){return!0};qc.isAny=qU});var Qs=W(gf=>{"use strict";Object.defineProperty(gf,"__esModule",{value:!0});gf.reportTypeGuardError=JU;var KU=O();function JU(e,t,r){e&&e.callbackOnError((0,KU.generateTypeGuardError)(t,e.identifier,r))}});var vW=W(Kc=>{"use strict";Object.defineProperty(Kc,"__esModule",{value:!0});Kc.isBoolean=void 0;var YU=Qs(),XU=function(t,r){return typeof t!="boolean"?((0,YU.reportTypeGuardError)(r,t,"boolean"),!1):!0};Kc.isBoolean=XU});var _W=W(Jc=>{"use strict";Object.defineProperty(Jc,"__esModule",{value:!0});Jc.isDate=void 0;var ZU=O(),QU=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,ZU.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Jc.isDate=QU});var ff=W(Yc=>{"use strict";Object.defineProperty(Yc,"__esModule",{value:!0});Yc.isNumber=void 0;var eB=Qs(),tB=function(t,r){return typeof t!="number"||isNaN(t)?((0,eB.reportTypeGuardError)(r,t,"number"),!1):!0};Yc.isNumber=tB});var WW=W(Xc=>{"use strict";Object.defineProperty(Xc,"__esModule",{value:!0});Xc.isString=void 0;var rB=Qs(),oB=function(t,r){return typeof t!="string"?((0,rB.reportTypeGuardError)(r,t,"string"),!1):!0};Xc.isString=oB});var LW=W(Zc=>{"use strict";Object.defineProperty(Zc,"__esModule",{value:!0});Zc.isUnknown=void 0;var nB=function(e){return!0};Zc.isUnknown=nB});var EW=W(Qc=>{"use strict";Object.defineProperty(Qc,"__esModule",{value:!0});Qc.isFunction=void 0;var sB=O(),iB=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,sB.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Qc.isFunction=iB});var kW=W(ed=>{"use strict";Object.defineProperty(ed,"__esModule",{value:!0});ed.isFile=void 0;var CW=O(),aB=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,CW.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,CW.generateTypeGuardError)(e,t.identifier,"File")),!1)};ed.isFile=aB});var xW=W(td=>{"use strict";Object.defineProperty(td,"__esModule",{value:!0});td.isFileList=void 0;var RW=O(),lB=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,RW.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,RW.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};td.isFileList=lB});var IW=W(rd=>{"use strict";Object.defineProperty(rd,"__esModule",{value:!0});rd.isBlob=void 0;var TW=O(),cB=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,TW.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,TW.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};rd.isBlob=cB});var MW=W(od=>{"use strict";Object.defineProperty(od,"__esModule",{value:!0});od.isFormData=void 0;var OW=O(),dB=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,OW.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,OW.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};od.isFormData=dB});var jW=W(nd=>{"use strict";Object.defineProperty(nd,"__esModule",{value:!0});nd.isURL=void 0;var NW=O(),uB=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,NW.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,NW.generateTypeGuardError)(e,t.identifier,"URL")),!1)};nd.isURL=uB});var DW=W(sd=>{"use strict";Object.defineProperty(sd,"__esModule",{value:!0});sd.isURLSearchParams=void 0;var zW=O(),pB=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,zW.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,zW.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};sd.isURLSearchParams=pB});var $W=W(id=>{"use strict";Object.defineProperty(id,"__esModule",{value:!0});id.isMap=void 0;var mB=O(),gB=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,mB.generateTypeGuardError)(e,t.identifier,"Map")),!1)};id.isMap=gB});var HW=W(ad=>{"use strict";Object.defineProperty(ad,"__esModule",{value:!0});ad.isSet=void 0;var fB=O(),hB=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,fB.generateTypeGuardError)(e,t.identifier,"Set")),!1)};ad.isSet=hB});var FW=W(hf=>{"use strict";Object.defineProperty(hf,"__esModule",{value:!0});hf.isIndexSignature=SB;var yB=O();function SB(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,yB.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let g=s[d],A=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),h=t(g,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return A&&h})}}});var UW=W(ld=>{"use strict";Object.defineProperty(ld,"__esModule",{value:!0});ld.isError=void 0;var AB=Qs(),bB=function(t,r){return t instanceof Error?!0:((0,AB.reportTypeGuardError)(r,t,"Error"),!1)};ld.isError=bB});var Sf=W(yf=>{"use strict";Object.defineProperty(yf,"__esModule",{value:!0});yf.isArrayWithEachItem=vB;var PB=O(),wB=vt();function vB(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,PB.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,wB.attachTypeGuardMeta)(t,{itemGuard:e})}});var Af=W(cd=>{"use strict";Object.defineProperty(cd,"__esModule",{value:!0});cd.isNonEmptyArray=void 0;var _B=O(),WB=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,_B.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};cd.isNonEmptyArray=WB});var BW=W(bf=>{"use strict";Object.defineProperty(bf,"__esModule",{value:!0});bf.isNonEmptyArrayWithEachItem=CB;var LB=Sf(),EB=Af();function CB(e){return function(t,r){return(0,LB.isArrayWithEachItem)(e)(t,r)&&(0,EB.isNonEmptyArray)(t,r)}}});var VW=W(Pf=>{"use strict";Object.defineProperty(Pf,"__esModule",{value:!0});Pf.isTuple=kB;var GW=O();function kB(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,GW.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,GW.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var qW=W(wf=>{"use strict";Object.defineProperty(wf,"__esModule",{value:!0});wf.isObjectWithEachItem=xB;var RB=O();function xB(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,RB.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var KW=W(vf=>{"use strict";Object.defineProperty(vf,"__esModule",{value:!0});vf.isPartialOf=IB;var TB=wr();function IB(e){return function(t,r){if(!(0,TB.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var JW=W(_f=>{"use strict";Object.defineProperty(_f,"__esModule",{value:!0});_f.isPick=MB;var OB=wr();function MB(e,...t){return function(r,o){if(!(0,OB.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var YW=W(Wf=>{"use strict";Object.defineProperty(Wf,"__esModule",{value:!0});Wf.isOmit=jB;var NB=wr();function jB(e,...t){return function(r,o){if(!(0,NB.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),g=p.indexOf(" ("),A=g>=0?p.slice(0,g):p;if(a.has(A))return!1;let h=A.startsWith(s+".")&&A.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var XW=W(dd=>{"use strict";Object.defineProperty(dd,"__esModule",{value:!0});dd.isNonEmptyString=void 0;var zB=O(),DB=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,zB.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};dd.isNonEmptyString=DB});var ZW=W(ud=>{"use strict";Object.defineProperty(ud,"__esModule",{value:!0});ud.isNonNegativeNumber=void 0;var $B=O(),HB=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,$B.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};ud.isNonNegativeNumber=HB});var QW=W(pd=>{"use strict";Object.defineProperty(pd,"__esModule",{value:!0});pd.isPositiveNumber=void 0;var FB=O(),UB=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,FB.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};pd.isPositiveNumber=UB});var eL=W(md=>{"use strict";Object.defineProperty(md,"__esModule",{value:!0});md.isNonPositiveNumber=void 0;var BB=O(),GB=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,BB.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};md.isNonPositiveNumber=GB});var tL=W(gd=>{"use strict";Object.defineProperty(gd,"__esModule",{value:!0});gd.isNegativeNumber=void 0;var VB=O(),qB=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,VB.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};gd.isNegativeNumber=qB});var rL=W(fd=>{"use strict";Object.defineProperty(fd,"__esModule",{value:!0});fd.isInteger=void 0;var KB=O(),JB=ff(),YB=function(e,t){return!(0,JB.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,KB.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};fd.isInteger=YB});var oL=W(hd=>{"use strict";Object.defineProperty(hd,"__esModule",{value:!0});hd.isPositiveInteger=void 0;var XB=O(),ZB=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,XB.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};hd.isPositiveInteger=ZB});var nL=W(yd=>{"use strict";Object.defineProperty(yd,"__esModule",{value:!0});yd.isNegativeInteger=void 0;var QB=O(),eG=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,QB.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};yd.isNegativeInteger=eG});var sL=W(Sd=>{"use strict";Object.defineProperty(Sd,"__esModule",{value:!0});Sd.isNonNegativeInteger=void 0;var tG=O(),rG=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,tG.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Sd.isNonNegativeInteger=rG});var iL=W(Ad=>{"use strict";Object.defineProperty(Ad,"__esModule",{value:!0});Ad.isNonPositiveInteger=void 0;var oG=O(),nG=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,oG.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Ad.isNonPositiveInteger=nG});var aL=W(Pd=>{"use strict";Object.defineProperty(Pd,"__esModule",{value:!0});Pd.isNumeric=void 0;var bd=O(),sG=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,bd.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,bd.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,bd.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,bd.generateTypeGuardError)(e,t.identifier,"number key")),!1};Pd.isNumeric=sG});var lL=W(wd=>{"use strict";Object.defineProperty(wd,"__esModule",{value:!0});wd.isBooleanLike=void 0;var Lf=O(),iG=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Lf.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Lf.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};wd.isBooleanLike=iG});var cL=W(vd=>{"use strict";Object.defineProperty(vd,"__esModule",{value:!0});vd.isDateLike=void 0;var ei=O(),aG=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,ei.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,ei.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,ei.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,ei.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,ei.generateTypeGuardError)(e,t.identifier,"date-like")),!1};vd.isDateLike=aG});var dL=W(_d=>{"use strict";Object.defineProperty(_d,"__esModule",{value:!0});_d.isBigInt=void 0;var lG=O(),cG=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,lG.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};_d.isBigInt=cG});var Cf=W(Ef=>{"use strict";Object.defineProperty(Ef,"__esModule",{value:!0});Ef.isOneOf=dG;var uL=fn();function dG(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,uL.stringify)(t)}) must be one of following values ${e.map(uL.stringify).join(" | ")}`),o}}});var pL=W(kf=>{"use strict";Object.defineProperty(kf,"__esModule",{value:!0});kf.isOneOfTypes=mG;var uG=fn(),pG=Ks();function mG(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,uG.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,pG.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var mL=W(Rf=>{"use strict";Object.defineProperty(Rf,"__esModule",{value:!0});Rf.isIntersectionOf=gG;function gG(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var gL=W(xf=>{"use strict";Object.defineProperty(xf,"__esModule",{value:!0});xf.isExtensionOf=fG;function fG(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var fL=W(Tf=>{"use strict";Object.defineProperty(Tf,"__esModule",{value:!0});Tf.isNullOr=yG;var hG=vt();function yG(e){function t(r,o){return r===null?!0:e(r,o)}return(0,hG.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var hL=W(If=>{"use strict";Object.defineProperty(If,"__esModule",{value:!0});If.isUndefinedOr=AG;var SG=vt();function AG(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,SG.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var yL=W(Of=>{"use strict";Object.defineProperty(Of,"__esModule",{value:!0});Of.isNilOr=PG;var bG=vt();function PG(e){function t(r,o){return r==null?!0:e(r,o)}return(0,bG.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var SL=W(Mf=>{"use strict";Object.defineProperty(Mf,"__esModule",{value:!0});Mf.isAsserted=wG;function wG(e){return!0}});var AL=W(Nf=>{"use strict";Object.defineProperty(Nf,"__esModule",{value:!0});Nf.isEnum=_G;var vG=Cf();function _G(e){return function(t,r){return(0,vG.isOneOf)(...Object.values(e))(t,r)}}});var bL=W(jf=>{"use strict";Object.defineProperty(jf,"__esModule",{value:!0});jf.isEqualTo=EG;var WG=O(),LG=fn();function EG(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,WG.generateTypeGuardError)(t,r.identifier,`equal to ${(0,LG.stringify)(e)}`)),!1):!0}}});var PL=W(Wd=>{"use strict";Object.defineProperty(Wd,"__esModule",{value:!0});Wd.isRegex=void 0;var CG=O(),kG=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,CG.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Wd.isRegex=kG});var vL=W(zf=>{"use strict";Object.defineProperty(zf,"__esModule",{value:!0});zf.isPattern=RG;var wL=O();function RG(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,wL.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,wL.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var _L=W(Df=>{"use strict";Object.defineProperty(Df,"__esModule",{value:!0});Df.by=xG;function xG(e){return function(t){return e(t,null)}}});var WL=W($f=>{"use strict";Object.defineProperty($f,"__esModule",{value:!0});$f.toNumber=TG;function TG(e){return typeof e=="number"?e:Number(e)}});var LL=W(Hf=>{"use strict";Object.defineProperty(Hf,"__esModule",{value:!0});Hf.toDate=IG;function IG(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var EL=W(Ff=>{"use strict";Object.defineProperty(Ff,"__esModule",{value:!0});Ff.toBoolean=OG;function OG(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var CL=W(Ld=>{"use strict";Object.defineProperty(Ld,"__esModule",{value:!0});Ld.isSymbol=void 0;var MG=O(),NG=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,MG.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Ld.isSymbol=NG});var ti=W(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var jG=Gc();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return jG.isType}});var Uf=hW();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return Uf.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return Uf.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return Uf.isNestedType}});var zG=yW();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return zG.isObjectWith}});var DG=SW();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return DG.isObject}});var $G=AW();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return $G.guardWithTolerance}});var HG=bW();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return HG.isBranded}});var FG=PW();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return FG.BrandSymbols}});var UG=wW();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return UG.isAny}});var BG=vW();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return BG.isBoolean}});var GG=_W();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return GG.isDate}});var VG=sf();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return VG.isDefined}});var qG=Fc();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return qG.isNil}});var KG=ff();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return KG.isNumber}});var JG=WW();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return JG.isString}});var YG=LW();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return YG.isUnknown}});var XG=EW();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return XG.isFunction}});var ZG=kW();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return ZG.isFile}});var QG=xW();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return QG.isFileList}});var e2=IW();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return e2.isBlob}});var t2=MW();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return t2.isFormData}});var r2=jW();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return r2.isURL}});var o2=DW();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return o2.isURLSearchParams}});var n2=$W();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return n2.isMap}});var s2=HW();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return s2.isSet}});var i2=FW();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return i2.isIndexSignature}});var a2=UW();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return a2.isError}});var l2=Sf();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return l2.isArrayWithEachItem}});var c2=Af();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return c2.isNonEmptyArray}});var d2=BW();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return d2.isNonEmptyArrayWithEachItem}});var u2=VW();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return u2.isTuple}});var p2=wr();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return p2.isNonNullObject}});var m2=qW();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return m2.isObjectWithEachItem}});var g2=KW();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return g2.isPartialOf}});var f2=JW();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return f2.isPick}});var h2=YW();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return h2.isOmit}});var y2=XW();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return y2.isNonEmptyString}});var S2=ZW();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return S2.isNonNegativeNumber}});var A2=QW();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return A2.isPositiveNumber}});var b2=eL();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return b2.isNonPositiveNumber}});var P2=tL();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return P2.isNegativeNumber}});var w2=rL();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return w2.isInteger}});var v2=oL();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return v2.isPositiveInteger}});var _2=nL();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return _2.isNegativeInteger}});var W2=sL();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return W2.isNonNegativeInteger}});var L2=iL();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return L2.isNonPositiveInteger}});var E2=aL();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return E2.isNumeric}});var C2=lL();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return C2.isBooleanLike}});var k2=cL();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return k2.isDateLike}});var R2=dL();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return R2.isBigInt}});var x2=Cf();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return x2.isOneOf}});var T2=pL();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return T2.isOneOfTypes}});var I2=mL();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return I2.isIntersectionOf}});var O2=gL();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return O2.isExtensionOf}});var M2=fL();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return M2.isNullOr}});var N2=hL();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return N2.isUndefinedOr}});var j2=yL();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return j2.isNilOr}});var z2=SL();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return z2.isAsserted}});var D2=AL();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return D2.isEnum}});var $2=bL();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return $2.isEqualTo}});var H2=PL();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return H2.isRegex}});var F2=vL();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return F2.isPattern}});var U2=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return U2.generateTypeGuardError}});var B2=_L();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return B2.by}});var G2=WL();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return G2.toNumber}});var V2=LL();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return V2.toDate}});var q2=EL();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return q2.toBoolean}});var K2=CL();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return K2.isSymbol}})});var ri,kL,RL,no,Bf,zY,xL,Ed,so,oi,Gf,Vf,qf,Kf,Ht,Jf,Cd,kd,Rd,ni,lt,Sn,An,xd,vr,Yf,TL,_t=l(()=>{"use strict";ri={production:".agent-witch",localhost:".local-agent-witch"},kL={production:47892,localhost:47893},RL={production:"com.agent-witch",localhost:"com.local-agent-witch"},no={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Bf="app",zY=`${Bf}/agent-witch.js`,xL=`${Bf}/command`,Ed={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},so=ri.production,oi=ri.localhost,Gf=kL.production,Vf=kL.localhost,qf=RL.production,Kf=RL.localhost,Ht="profiles",Jf=no.activeProfile,Cd="harness",kd="sets",Rd="manifest.json",ni=Ed.projectsDir,lt=Ed.logsDir,Sn="agent-witch.log",An="agent-witch.error.log",xd=Ed.reportsDir,vr=Ed.deviceKeypairJson,Yf=Bf,TL="agent-witch.js"});var bn,IL,J2,OL,ML=l(()=>{"use strict";bn=m(require("node:path")),IL=require("node:url"),J2=()=>!0,OL=()=>{if(J2()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?bn.default.dirname(bn.default.resolve(e)):bn.default.dirname(bn.default.resolve(__filename))}return bn.default.dirname((0,IL.fileURLToPath)(__agentWitchImportMetaUrl))}});var Xf,NL,j,jL,Y2,_r,E,Td,Ft,zL,Id,Pn,Od,Md,ne,ct,Zf,dt,Qf,N,eh=l(()=>{"use strict";Xf=m(require("node:fs")),NL=m(require("node:os")),j=m(require("node:path")),jL=m(ti());_t();ML();Y2=OL(),_r=e=>e.trim().toLowerCase(),E=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return j.default.resolve(e);let t=j.default.resolve(Y2),r=j.default.basename(t),o=j.default.basename(j.default.dirname(t));return r===Yf&&(o===so||o===oi)?j.default.dirname(t):r===so||r===oi?t:j.default.join(NL.default.homedir(),so)},Td=(e=E())=>j.default.join(e,Yf),Ft=(e=E())=>j.default.join(Td(e),TL),zL=(e,t,r)=>t!==null?j.default.join(e,Ht,t,r):j.default.join(e,r),Id=e=>zL(e.installDir,e.profileEmail,ni),Pn=e=>zL(e.installDir,e.profileEmail,lt),Od=e=>e.profileEmail!==null?j.default.join(e.installDir,Ht,e.profileEmail,vr):j.default.join(e.installDir,vr),Md=e=>j.default.basename(e)===oi,ne=(e=E())=>Md(e)?Kf:qf,ct=(e=E())=>Md(e)?Vf:Gf,Zf=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return _r(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?_r(t):null},dt=(e=E())=>{let t=j.default.join(e,Jf);if(!Xf.default.existsSync(t))return null;try{let r=JSON.parse(Xf.default.readFileSync(t,"utf8"));if((0,jL.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return _r(r.email)}catch{return null}return null},Qf=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?_r(r):null}let t=Zf();return t!==null?t:dt()},N=e=>{let t=E(),r=Td(t),o=Ft(t),n=Qf(e);if(n!==null){let A=j.default.join(t,Ht,n),h=j.default.join(A,Cd),y=j.default.join(A,ni),u=j.default.join(A,lt),S=j.default.join(A,xd),b=j.default.join(A,vr),f=j.default.join(A,lt,Sn),w=j.default.join(A,lt,An);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:u,mainLogPath:f,errorLogPath:w,reportsDir:S,deviceKeypairPath:b,configPath:j.default.join(A,"config.json"),harnessRootDir:h,harnessManifestPath:j.default.join(h,Rd),harnessSetsDir:j.default.join(h,kd)}}let s=j.default.join(t,Cd),i=j.default.join(t,ni),a=j.default.join(t,lt),c=j.default.join(t,xd),d=j.default.join(t,vr),p=j.default.join(t,lt,Sn),g=j.default.join(t,lt,An);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:g,reportsDir:c,deviceKeypairPath:d,configPath:j.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:j.default.join(s,Rd),harnessSetsDir:j.default.join(s,kd)}}});var th,DL,X2,Z2,$L,rh,HL=l(()=>{"use strict";th=m(require("node:fs")),DL=m(require("node:path"));_t();eh();X2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Z2=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,$L=e=>{let t=DL.default.join(e,no.wakePort);if(!th.default.existsSync(t))return null;try{let r=JSON.parse(th.default.readFileSync(t,"utf8"));if(X2(r)&&Z2(r.wakePort))return r.wakePort}catch{return null}return null},rh=(e=E())=>$L(e)??ct(e)});var V=l(()=>{"use strict";eh();HL()});var si,o5,n5,FL,s5,i5,UL=l(()=>{"use strict";V();si=ne(),o5=`${si}-wake`,n5=`${si}-live`,FL=`${si}-watchdog`,s5=`${si}-automation-scheduler`,i5=`${si}-updater`});var oh,nh,Nd=l(()=>{"use strict";oh=new Set(["","loginwindow","_mbsetupuser","root"]),nh=5e3});var BL,a5,GL,sh,ih=l(()=>{"use strict";BL=require("node:child_process");Nd();a5=e=>e.trim().toLowerCase(),GL=e=>e==null?!1:!oh.has(a5(e)),sh=()=>{if(process.platform!=="darwin")return null;try{let t=(0,BL.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return GL(t)?t:null}catch{return null}}});var qL,VL,ut,ii=l(()=>{"use strict";qL=m(require("node:os"));ih();VL=e=>e.trim().toLowerCase(),ut=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?sh():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??qL.default.userInfo().username;return VL(r)===VL(o)}});var KL,JL,io,YL=l(()=>{"use strict";KL=require("node:child_process"),JL=m(require("node:fs"));V();ii();io=(e=E())=>{let t=Ft(e);if(!JL.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!ut())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=dt(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,KL.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var XL,ai,jd=l(()=>{"use strict";XL=require("node:child_process"),ai=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,XL.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var zd,ah,ZL,ee,Dd,li=l(()=>{"use strict";zd=m(require("node:fs")),ah=m(require("node:path"));V();_t();ZL=e=>{let t=ah.default.join(e,Ht);return zd.default.existsSync(t)?zd.default.readdirSync(t).filter(r=>zd.default.statSync(ah.default.join(t,r)).isDirectory()).map(r=>_r(r)).toSorted():[]},ee=(e=E())=>{let t=ne(e);return[{profileEmail:ZL(e)[0]??null,launchAgentLabel:t}]},Dd=(e=E())=>ZL(e)});var lh,QL,eE,l5,Ut,$d=l(()=>{"use strict";lh=m(require("node:fs")),QL=m(require("node:os")),eE=m(require("node:path"));V();li();l5=()=>eE.default.join(QL.default.homedir(),"Library","LaunchAgents"),Ut=(e=E())=>{let t=ne(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ee(e))r.add(n.launchAgentLabel);let o=l5();if(lh.default.existsSync(o))for(let n of lh.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var tE,ci,rE=l(()=>{"use strict";V();jd();$d();li();tE=(e=E())=>{let t=new Set(ee(e).map(r=>r.launchAgentLabel));return Ut(e).filter(r=>!t.has(r))},ci=(e=E())=>{for(let t of tE(e))ai(t)}});var di,ch=l(()=>{"use strict";V();jd();$d();di=(e=E())=>{for(let t of Ut(e))ai(t)}});var oE,nE,c5,ao,sE=l(()=>{"use strict";oE=require("node:child_process"),nE=require("node:util"),c5=(0,nE.promisify)(oE.execFile),ao=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await c5("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var lo,d5,dh,uh=l(()=>{"use strict";lo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),d5=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,dh=e=>{let t=e.pathValue??d5(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${lo(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${lo(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${lo(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${lo(e.homeDir)}</string>
    <key>PATH</key>
    <string>${lo(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${lo(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${lo(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var Hd,ph=l(()=>{"use strict";Hd=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var co,mh,ui,u5,p5,m5,iE,Bt,gh=l(()=>{"use strict";co=m(require("node:fs")),mh=m(require("node:os")),ui=m(require("node:path"));_t();V();uh();ph();u5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),p5=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,m5=e=>{let t=ui.default.join(e,no.wakePort);if(!co.default.existsSync(t))return ct(e);try{let r=JSON.parse(co.default.readFileSync(t,"utf8"));if(u5(r)&&p5(r.wakePort))return r.wakePort}catch{return ct(e)}return ct(e)},iE=(e,t=mh.default.homedir())=>ui.default.join(t,"Library","LaunchAgents",`${e}.plist`),Bt=e=>{let t=e.installDir??E(),r=e.homeDir??mh.default.homedir(),o=iE(e.launchAgentLabel,r),n=co.default.existsSync(o)?co.default.readFileSync(o,"utf8"):null;if(n!==null&&Hd(n))return{ok:!0,rewritten:!1,plistPath:o};let s=dh({launchAgentLabel:e.launchAgentLabel,runPath:ui.default.join(t,xL,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??m5(t)});if(!Hd(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{co.default.mkdirSync(ui.default.dirname(o),{recursive:!0}),co.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var lE,cE,dE,pi,g5,f5,aE,Le,fh=l(()=>{"use strict";lE=require("node:child_process"),cE=m(require("node:fs")),dE=require("node:util");V();gh();ii();pi=(0,dE.promisify)(lE.execFile),g5=async e=>{try{return await pi("launchctl",["print",e]),!0}catch{return!1}},f5=async(e,t,r)=>{await g5(t)&&await pi("launchctl",["bootout",t]).catch(()=>{}),await pi("launchctl",["bootstrap",e,r]),await pi("launchctl",["enable",t])},aE=async e=>{try{return await pi("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Le=async(e,t=E())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!ut())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=Bt({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await aE(n))return{ok:!0};let i=s.plistPath;if(!cE.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await f5(o,n,i),await aE(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var uo,uE=l(()=>{"use strict";V();fh();li();uo=async(e=E())=>{let t=[];for(let r of ee(e))(await Le(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var Be,Gt,pE=l(()=>{"use strict";ch();ii();Nd();Be=e=>{ut()||(di(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Gt=(e,t=nh)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{ut()||e()},t);return()=>{clearInterval(r)}}});var te=l(()=>{"use strict";UL();YL();jd();rE();ch();$d();ii();sE();uE();fh();gh();ph();uh();li();ih();Nd();pE()});var hh=l(()=>{"use strict";te()});var mE,gE,Fd,fE,wn,hE,yE,po=l(()=>{"use strict";mE=".agent-witch",gE="memory",Fd="project.json",fE="chunks.ndjson",wn="runs.ndjson",hE="reports",yE=".json"});var SE=l(()=>{"use strict";po()});var AE,Ud,yh=l(()=>{"use strict";AE=m(require("node:path"));SE();Ud=(e,t)=>AE.default.join(e.trim(),`${t.trim()}${yE}`)});var mi,bE,PE=l(()=>{"use strict";mi="agent-witch.js",bE="command"});var Bd=l(()=>{"use strict";PE()});var mo,wE,vE=l(()=>{"use strict";Bd();mo=e=>`'${e.replace(/'/g,"'\\''")}'`,wE=e=>{let t=`${e.installDir.trim()}/${"app"}/${mi}`,r=[mo("node"),mo(t),"report","write","--key",mo(e.reportKey.trim()),"--agent-run-id",mo(e.agentRunId.trim()),"--status",mo(e.status),"--summary",mo(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",mo(e.details.trim())),r.join(" ")}});var Wt,_E,h5,Sh,Gd=l(()=>{"use strict";yh();vE();Wt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},_E=e=>e===Wt.COMPLETED||e===Wt.FAILED,h5=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Sh=(e,t)=>{let r=Ud(t.reportsDir,t.reportKey),o=wE({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Wt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${h5({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Ee=l(()=>{"use strict";_t();V()});var fi,LE,WE,EE,y5,vn,S5,CE,hi,yi,Ah,kE,RE,Si=l(()=>{"use strict";fi=m(require("node:fs")),LE=m(require("node:path"));Gd();yh();Ee();WE=50,EE=e=>{let t=N(),r=Ud(t.reportsDir,e);return fi.default.mkdirSync(LE.default.dirname(r),{recursive:!0}),r},y5=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},vn=e=>{let t=EE(e);if(!fi.default.existsSync(t))return null;try{let r=JSON.parse(fi.default.readFileSync(t,"utf8"));return y5(r)?r:null}catch{return null}},S5=(e,t)=>{let r=[...e,t];return r.length>WE?r.slice(r.length-WE):r},CE=e=>{let t=EE(e.reportKey);fi.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},hi=e=>{let t=vn(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:S5(t?.history??[],o)};return CE(n),n},yi=e=>{let t=vn(e.reportKey);return t!==null?t:hi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Wt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},Ah=(e,t)=>{let r=t.trim();if(r.length===0)return vn(e);let o=vn(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return CE(s),s},kE=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},RE=e=>{if(e===null||!_E(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Wt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var A5,b5,Ai,xE,Vd,bh=l(()=>{"use strict";Gd();Si();A5=new Set(Object.values(Wt)),b5=e=>A5.has(e),Ai=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},xE=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Vd=e=>{if(e[0]!=="write")return xE(),1;let r=Ai(e,"--key"),o=Ai(e,"--agent-run-id"),n=Ai(e,"--status"),s=Ai(e,"--summary"),i=Ai(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!b5(n)?(xE(),1):(hi({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var Ge,go=l(()=>{"use strict";Ge=()=>!0});var Ph,TE,fo,qd=l(()=>{"use strict";Ph=m(require("node:path")),TE=require("node:url");go();fo=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Ph.default.resolve(t);return Ge()?r===Ph.default.resolve(__filename):e===void 0?!1:r===(0,TE.fileURLToPath)(e)}});var Kd,_n,v5,DZ,Wn=l(()=>{"use strict";Kd="agent-witch.js",_n="deps.tar.gz",v5="install.sh",DZ={mainScript:`app/${Kd}`,depsArchive:`app/${_n}`,installShell:v5}});var NE=l(()=>{"use strict";Wn()});var jE=l(()=>{"use strict";Wn();NE()});var bi,vh,Jd,_5,Pi,Ce,En,wi,vi,ho,_h=l(()=>{"use strict";bi=m(require("node:fs")),vh=m(require("node:path"));jE();V();Jd="install-version.json",_5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Pi=(e=E())=>vh.default.join(e,Jd),Ce=(e=E())=>{let t=Pi(e);if(!bi.default.existsSync(t))return null;try{let r=JSON.parse(bi.default.readFileSync(t,"utf8"));return!_5(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},En=(e,t=E())=>{let r=Pi(t);bi.default.mkdirSync(vh.default.dirname(r),{recursive:!0}),bi.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},wi=(e=E())=>Ce(e)?.bundleVersion??"229",vi=(e,t)=>{let r=Ce(e);if(r!==null)return r;let o={bundleVersion:"229",appOrigin:t,updatedAt:new Date().toISOString()};return En(o,e),o},ho=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var zE,yo,Wh,Lh,Eh,Yd,Lt,So,Ch=l(()=>{"use strict";zE=require("node:crypto"),yo=m(require("node:fs")),Wh=m(require("node:path"));V();Lh="self-update-log.ndjson",Eh=100,Yd=(e=E())=>{let t=N(),r=t.installDir===e?t.logsDir:Pn({installDir:e,profileEmail:t.profileEmail});return Wh.default.join(r,Lh)},Lt=(e,t=E())=>{let r={id:(0,zE.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Yd(t);yo.default.mkdirSync(Wh.default.dirname(o),{recursive:!0});let n=yo.default.existsSync(o)?yo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Eh+1)),JSON.stringify(r)];return yo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},So=(e=20,t=E())=>{let r=Yd(t);if(!yo.default.existsSync(r))return[];let o=yo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var kh,rQ,Rh=l(()=>{"use strict";Wn();kh="deps",rQ=`${"app"}/${_n}`});var DE=l(()=>{"use strict";Rh()});var $E,Wr,Ao,HE,xh,Th,FE=l(()=>{"use strict";$E=require("node:child_process"),Wr=m(require("node:fs")),Ao=m(require("node:path"));Wn();Rh();HE=e=>Ao.default.join(e,"app",kh),xh=e=>{let t=Ao.default.join(e,"app"),r=Ao.default.join(t,_n);Wr.default.existsSync(r)&&(Wr.default.rmSync(HE(e),{recursive:!0,force:!0}),Wr.default.mkdirSync(t,{recursive:!0}),(0,$E.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Wr.default.rmSync(r,{force:!0}))},Th=e=>{Wr.default.rmSync(Ao.default.join(e,"node_modules"),{recursive:!0,force:!0}),Wr.default.rmSync(Ao.default.join(e,"package.json"),{force:!0}),Wr.default.rmSync(Ao.default.join(e,"package-lock.json"),{force:!0})}});var UE=l(()=>{"use strict";DE();FE()});var Vt,Xd,BE=l(()=>{"use strict";Vt="https://www.agentwitch.com",Xd="wss://www.agentwitch.com/api/agent-witch/ws"});var _i,qt,GE=l(()=>{"use strict";_i="127.0.0.1",qt=`http://${_i}:43347`});var Kt=l(()=>{"use strict";BE();GE()});var Wi,Zd,VE,Oh,W5,qE,jh,KE,pt,Li,Ei,zh,Mh,Nh,Ci,Dh,$h,Hh,Cn=l(()=>{"use strict";Wi=m(require("node:fs")),Zd=m(require("node:path")),VE="active-writer-work.json",Oh=new Set,W5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qE=e=>e.profileEmail===null?Zd.default.join(e.installDir,VE):Zd.default.join(e.installDir,"profiles",e.profileEmail,VE),jh=e=>{let t=qE(e);if(!Wi.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Wi.default.readFileSync(t,"utf8"));return!W5(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},KE=(e,t)=>{let r=qE(e);Wi.default.mkdirSync(Zd.default.dirname(r),{recursive:!0}),Wi.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},pt=e=>jh(e).activeCount>0,Li=e=>{let t=jh(e);KE(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},Ei=e=>{let t=jh(e),r=Math.max(0,t.activeCount-1);if(KE(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of Oh)o()},zh=e=>(Oh.add(e),()=>{Oh.delete(e)}),Mh=null,Nh=null,Ci=e=>{Mh=e},Dh=e=>{Nh=e},$h=()=>{let e=Mh;return Mh=null,e},Hh=()=>{let e=Nh;return Nh=null,e}});var ke,Fh=l(()=>{"use strict";ke=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var kn,Qd,ki,Uh=l(()=>{"use strict";kn="qwen2.5:7b",Qd="nomic-embed-text",ki="Install Ollama from https://ollama.com/download"});var Ri,JE,Bh=l(()=>{"use strict";Uh();Ri=()=>`
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
    echo "Ollama is missing. ${ki}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${ki}" >&2
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
  agent_witch_ensure_ollama_model "${kn}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${Qd}" "\${pull_log}"
}
`,JE=()=>`
${Ri()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var YE,L5,eu,Gh=l(()=>{"use strict";YE=require("node:child_process");V();Bh();L5=e=>new Promise(t=>{let r=(0,YE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:E()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),eu=async(e=L5)=>{let t=`${Ri()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var Lr,tu,XE,E5,ZE,xn,C5,k5,R5,Rn,bo,Po,QE=l(()=>{"use strict";Lr=m(require("node:fs")),tu=m(require("node:path"));UE();te();V();Wn();Kt();_h();Cn();Fh();Ch();Gh();XE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),E5=e=>{let t=dt(e),r=t===null?N():N(t);if(!Lr.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Lr.default.readFileSync(r.configPath,"utf8"));return!XE(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},ZE=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!XE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},xn=async e=>(await ZE(e))?.bundleVersion??null,C5=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=tu.default.join(t,r);Lr.default.mkdirSync(tu.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());Lr.default.writeFileSync(n,s),r.endsWith(".js")&&Lr.default.chmodSync(n,493)},k5=async()=>{ci(),await uo()},R5=(e,t)=>e!==null?ke(e):t??Vt,Rn=(e,t)=>({localBundleVersion:t,...e}),bo=async e=>{let t=E(),r=Ce(t),o=r?.bundleVersion??null,n=await eu();Lt({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=E5(t),i=R5(s,r?.appOrigin);if(i===null){let d=Rn({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return Lt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await ZE(i);if(a===null){let d=Rn({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return Lt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||ho(o,a.bundleVersion))){let d=Rn({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Lt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let A of a.scripts)await C5(i,t,A);let d=tu.default.join(t,Kd);Lr.default.existsSync(d)&&Lr.default.rmSync(d,{force:!0}),xh(t),Th(t),En({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=N(dt(t));if(pt(p)){let A=Rn({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Lt({event:"update_applied",ok:!0,message:A.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),A}await k5();let g=Rn({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Lt({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",g=Rn({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return Lt({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}},Po=()=>{let e=E();return{local:Ce(e),logs:So(20,e)}}});var eC={};wt(eC,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>Jd,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>ki,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Qd,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>kn,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Lh,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Eh,appendAgentWitchSelfUpdateLog:()=>Lt,buildAgentWitchEnsureOllamaShell:()=>Ri,buildAgentWitchInstallScriptOllama:()=>JE,buildAgentWitchSelfUpdateStatus:()=>Po,ensureAgentWitchInstallVersionRecorded:()=>vi,ensureAgentWitchOllamaInstalled:()=>eu,fetchAgentWitchRemoteInstallBundleVersion:()=>xn,isRemoteAgentWitchBundleVersionNewer:()=>ho,readAgentWitchInstallVersion:()=>Ce,readAgentWitchSelfUpdateLogs:()=>So,resolveAgentWitchAppOriginFromWsUrl:()=>ke,resolveAgentWitchHeartbeatInstallBundleVersion:()=>wi,resolveAgentWitchInstallVersionPath:()=>Pi,resolveAgentWitchSelfUpdateLogPath:()=>Yd,runAgentWitchSelfUpdate:()=>bo,writeAgentWitchInstallVersion:()=>En});var Qe=l(()=>{"use strict";_h();Ch();QE();Fh();Uh();Bh();Gh()});var Vh={};wt(Vh,{buildAgentWitchSelfUpdateStatus:()=>Po,fetchAgentWitchRemoteInstallBundleVersion:()=>xn,runAgentWitchSelfUpdate:()=>bo});var qh=l(()=>{"use strict";Qe()});function Tn(e){return(0,tC.createHash)("sha256").update(e.trim()).digest("hex")}var tC,Kh=l(()=>{"use strict";tC=require("node:crypto")});var In,xi,x5,rC,Jh,oC=l(()=>{"use strict";In=m(require("node:fs")),xi=m(require("node:path"));Kh();Ee();x5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rC=e=>{if(!In.default.existsSync(e))return null;try{let t=JSON.parse(In.default.readFileSync(e,"utf8"));return!x5(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Tn(t.pairingToken.trim())}catch{return null}},Jh=(e=E())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(rC(xi.default.join(e,"config.json")));let n=xi.default.join(e,Ht);if(!In.default.existsSync(n))return t;for(let s of In.default.readdirSync(n)){let i=xi.default.join(n,s);In.default.statSync(i).isDirectory()&&o(rC(xi.default.join(i,"config.json")))}return t}});var Yh,nC,ru,Ti,Ii,T5,I5,O5,sC,le,ce,ou,Et,mt=l(()=>{"use strict";Yh=m(require("node:fs")),nC=m(require("node:os")),ru=m(require("node:path")),Ti={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Ii=e=>e.trim().length>0,T5=e=>{let t=ru.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},I5=()=>{let e=nC.default.homedir(),t=ru.default.join(e,".local","bin","agent");if(Yh.default.existsSync(t))return t;let r=ru.default.join(e,".local","bin","cursor-agent");return Yh.default.existsSync(r)?r:Ti.cursorCommand},O5=e=>{let t=e.trim();return!Ii(t)||t===Ti.cursorCommand?I5():t},sC=(e,t)=>T5(e)?t:["agent",...t],le=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ce=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:Ii(t)?t.trim():Ti.claudeCommand,codexCommand:Ii(r)?r.trim():Ti.codexCommand,cursorCommand:O5(o),antigravityCommand:Ii(n)?n.trim():Ti.antigravityCommand}},ou=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:sC(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Et=(e,t,r,o)=>{let n=t.trim();if(!Ii(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:sC(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",n]}}});var Er,M5,On,N5,Mn,nu=l(()=>{"use strict";Er=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,M5=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:Er(s.inputTokens)+Er(s.outputTokens)+Er(s.cacheReadInputTokens)+Er(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},On=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=Er(a.input_tokens)+Er(a.cache_creation_input_tokens)+Er(a.cache_read_input_tokens),d=Er(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:M5(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},N5=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),Mn=(e,t)=>{let r=On(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??N5(r)}}});var Xh,j5,z5,Zh,Qh=l(()=>{"use strict";Xh=e=>e.toLocaleString("en-US"),j5=e=>e<.01?e.toFixed(4):e.toFixed(3),z5=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${j5(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Xh(e.inputTokens)} in / ${Xh(e.outputTokens)} out (${Xh(e.totalTokens)} total)`,t].join(`
`)},Zh=(e,t)=>{if(t===void 0)return e;let r=z5(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var su,ey=l(()=>{"use strict";su={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var wo,ty,iu,ry=l(()=>{"use strict";ey();wo="auto",ty=e=>({value:wo,label:`Auto (${su[e]})`}),iu={anthropic:[ty("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[ty("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[ty("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Nn,Oi,oy,Mi=l(()=>{"use strict";ey();ry();Nn=e=>{let t=e?.trim()??"";if(!(t.length===0||t===wo))return t},Oi=(e,t)=>{let r=Nn(t);return r===void 0?su[e]:r},oy=e=>{let t=Nn(e);return t===void 0?wo:t}});var au,D5,$5,lu,iC=l(()=>{"use strict";au={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},D5=e=>{let t=au[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?au["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?au["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?au["gemini-2.0-flash"]:null},$5=(e,t,r)=>{let o=D5(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},lu=e=>{let t=$5(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var jn,H5,F5,U5,cu,aC=l(()=>{"use strict";iC();jn=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),H5=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=jn(r.input_tokens),n=jn(r.output_tokens);return o===0&&n===0?null:lu({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},F5=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=jn(r.prompt_tokens),n=jn(r.completion_tokens);return o===0&&n===0?null:lu({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},U5=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=jn(r.promptTokenCount),n=jn(r.candidatesTokenCount);return o===0&&n===0?null:lu({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},cu=(e,t,r)=>e==="anthropic"?H5(t,r):e==="openai"?F5(t,r):U5(t,r)});var B5,ny,G5,V5,q5,K5,J5,sy,iy=l(()=>{"use strict";Mi();aC();B5=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},ny=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Oi(e,t.model)},G5=async e=>{let t=ny("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=B5(o);n.length>0&&e.onChunk?.(n);let s=cu("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},V5=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},q5=async e=>{let t=ny("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=V5(o);n.length>0&&e.onChunk?.(n);let s=cu("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},K5=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},J5=async e=>{let t=ny("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=K5(n);s.length>0&&e.onChunk?.(s);let i=cu("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},sy=async e=>{try{return e.provider==="anthropic"?await G5(e):e.provider==="openai"?await q5(e):await J5(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Ve,Ni=l(()=>{"use strict";Ve=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var lC,Y5,du,ay=l(()=>{"use strict";lC=m(require("node:path")),Y5="writer-api-secrets.json",du=e=>lC.default.join(e,Y5)});var ly,cC,X5,Cr,De,kr=l(()=>{"use strict";ly=m(require("node:fs"));Mi();ay();cC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),X5=e=>{if(!cC(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=Nn(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},Cr=e=>{let t=du(e);if(!ly.default.existsSync(t))return{};try{let r=JSON.parse(ly.default.readFileSync(t,"utf8"));if(!cC(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=X5(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},De=(e,t)=>Cr(e)[t]??null});var Re,ji=l(()=>{"use strict";Re=e=>e==="api"?"api":"cli"});var dC,Pe,vo,Jt=l(()=>{"use strict";dC=m(require("node:path"));Ni();kr();ji();Pe=e=>dC.default.dirname(e),vo=(e,t)=>{if(Re(e.writerExecutionBackend)!=="api")return!1;let r=Ve(t);if(r===null)return!1;let o=Pe(e.layout.configPath),n=De(o,r);return n!==null&&n.apiKey.length>0}});var zi,cy=l(()=>{"use strict";Qh();iy();Ni();kr();Jt();zi=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Ve(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Pe(e.layout.configPath),a=De(i,s);if(a===null){let d=Object.keys(Cr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await sy({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:Zh(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var uC,zn,dy=l(()=>{"use strict";uC=require("node:child_process");mt();nu();cy();Jt();zn=(e,t,r)=>new Promise(o=>{if(!le(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(vo(e,t)){zi(e,t,r).then(o);return}let n=Et(t,r,ce({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,uC.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=Mn(i.join("")),p=a.join("").trim(),g=[d.output.trim(),p].filter(A=>A.length>0).join(`
`);o({exitCode:c??-1,output:g})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var pC=l(()=>{"use strict"});var mC=l(()=>{"use strict";Qh();dy();iy();pC();kr();Jt()});var gC,fC,hC,yC=l(()=>{"use strict";gC="claude",fC="codex",hC="cursor"});var SC,Z5,uy,Di,uu=l(()=>{"use strict";SC=m(require("node:path"));Kt();_t();Z5="ws://localhost:3000/api/agent-witch/ws",uy=e=>e.replace(/\/$/,""),Di=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return uy(t);let r=SC.default.basename(e.installDir);if(r===ri.production)return Xd;let o=e.configWsUrl?.trim()??"";return r===ri.localhost?o.length>0?uy(o):Z5:o.length>0?uy(o):Xd}});var eV,py,my=l(()=>{"use strict";yC();uu();ji();eV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),py=e=>{if(!eV(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Di({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??gC,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??fC,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??hC,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Re(t.writerExecutionBackend),layout:e.layout}}}});var gy,fy,hy=l(()=>{"use strict";gy=m(require("node:fs"));V();my();fy=e=>{let t=N(e);if(!gy.default.existsSync(t.configPath))return null;try{let r=JSON.parse(gy.default.readFileSync(t.configPath,"utf8")),o=py({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var $i,AC=l(()=>{"use strict";$i=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var yy,tV,Sy,bC=l(()=>{"use strict";yy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),tV=e=>{if(!yy(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!yy(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(g=>{if(!yy(g))return[];let A=typeof g.itemKey=="string"?g.itemKey.trim():"",h=typeof g.relativePath=="string"?g.relativePath:"",y=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return A.length===0||y.length===0?[]:[{itemKey:A,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},Sy=tV});var PC,rV,pu,Ay=l(()=>{"use strict";PC=m(require("node:path")),rV=(e,t)=>{let r=t.trim();return PC.default.join(e,"components","store",r.slice(0,2),r)},pu=rV});var wC,oV,by,vC=l(()=>{"use strict";wC=m(require("node:fs"));Ay();oV=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=pu(e.installDir,n.contentSha256);wC.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},by=oV});var Hi,Dn,nV,Py,sV,wy,vy=l(()=>{"use strict";Hi=m(require("node:fs")),Dn=m(require("node:path"));Ay();nV=(e,t)=>Dn.default.join(e.installDir,"runs",t,"overlay"),Py=(e,t)=>Dn.default.join(nV(e,t),".cursor"),sV=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=Py(e,t);Hi.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=pu(e.installDir,i.contentSha256);if(!Hi.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Dn.default.join(n,c):Dn.default.join(n,i.itemKey);Hi.default.mkdirSync(Dn.default.dirname(d),{recursive:!0}),Hi.default.copyFileSync(a,d)}return{ok:!0}},wy=sV});var _y,_C,iV,Fi,WC=l(()=>{"use strict";_y=m(require("node:fs")),_C=m(require("node:path")),iV=(e,t)=>{let r=_C.default.join(e.installDir,"runs",t);_y.default.existsSync(r)&&_y.default.rmSync(r,{recursive:!0,force:!0})},Fi=iV});var aV,Wy,LC=l(()=>{"use strict";vy();aV=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=Py(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},Wy=aV});var Ly,lV,cV,dV,uV,pV,$,EC=l(()=>{"use strict";Ly=m(require("node:fs"));uu();V();ji();lV="claude",cV="codex",dV="cursor",uV="agy",pV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=N();if(!Ly.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Ly.default.readFileSync(e.configPath,"utf8"));if(!pV(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Di({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Re(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:lV,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:cV,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:dV,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:uV,pairingToken:s,layout:e}}catch{return null}}});var mu,CC,kC=l(()=>{"use strict";mu=m(require("node:fs"));ay();CC=(e,t)=>{let r=du(e);mu.default.mkdirSync(e,{recursive:!0}),mu.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{mu.default.chmodSync(r,384)}catch{}}});var gu,RC,Ey=l(()=>{"use strict";gu=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},RC=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===gu(t)}});var Ui,mV,Cy,ky,xC=l(()=>{"use strict";Ui=m(require("node:fs"));kr();kC();Ey();Mi();Jt();mV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Cy=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=RC(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?Nn(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},ky=e=>{let t=Pe(e.configPath),r={};if(Ui.default.existsSync(e.configPath))try{let n=JSON.parse(Ui.default.readFileSync(e.configPath,"utf8"));mV(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,Ui.default.mkdirSync(t,{recursive:!0}),Ui.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=Cy(Cy(Cy(Cr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);CC(t,o)}});var Ry,TC=l(()=>{"use strict";Ry={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var xy,IC=l(()=>{"use strict";Ni();kr();Jt();Jt();xy=(e,t)=>{if(vo(e,t))return!1;let r=Ve(t);if(r===null)return!1;let o=Pe(e.layout.configPath),n=De(o,r);return n===null||n.apiKey.trim().length===0}});var OC,Ty,Iy=l(()=>{"use strict";OC=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},Ty=async e=>{let t=OC(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=OC(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var gV,Oy,MC=l(()=>{"use strict";te();hy();Iy();gV=1e4,Oy=()=>Ty({listProfileEmails:Dd,readConfig:fy,pollIntervalMs:gV,logWaiting:e=>{console.error(e)}})});var de=l(()=>{"use strict";dy();mC();hy();uu();AC();bC();vC();vy();WC();LC();ji();EC();xC();kr();Jt();Ey();Mi();TC();cy();Jt();IC();Ni();kr();MC();my();Iy()});var fu,NC,fV,hV,jC,hu,Bi,yu,Gi=l(()=>{"use strict";fu=m(require("node:fs")),NC=m(require("node:path")),fV="wake-port.json",hV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jC=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,hu=e=>NC.default.join(e,fV),Bi=e=>{let t=hu(e);if(!fu.default.existsSync(t))return null;try{let r=JSON.parse(fu.default.readFileSync(t,"utf8"));if(hV(r)&&jC(r.wakePort))return r.wakePort}catch{return null}return null},yu=(e,t)=>{if(!jC(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=hu(e);fu.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var hre,yre,Sre,gt,zC,Vi=l(()=>{"use strict";Gi();Ee();Gi();hre=ct(),yre=`${ne()}-wake`,Sre=ne(),gt=()=>{let e=E(),t=Bi(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return ct()},zC=e=>{let t=E();Bi(t)===null&&yu(t,e)}});var DC=l(()=>{"use strict";Kh();te();oC();de();Vi()});var My,qi,Ki,$C=l(()=>{"use strict";My=m(require("node:os"));DC();qi=()=>{let e=ee();return{ok:!0,port:gt(),hostname:My.default.hostname(),profileCount:e.length}},Ki=()=>{let e=ee(),t=$()?.pairingToken.trim()??"",r=t.length>0?Tn(t):null,o=Jh();return{hostname:My.default.hostname(),port:gt(),tokenHash:r,tokenHashes:o.length>0?o:r!==null?[r]:[],profiles:e.map(n=>({email:n.profileEmail,launchAgentLabel:n.launchAgentLabel}))}}});var Ny=l(()=>{"use strict";$C()});var HC,FC,UC,Su,$n=l(()=>{"use strict";HC="materialization.json",FC="backups",UC=".gitignore",Su=e=>`harness-set:${e.trim()}`});var BC,GC,Au,VC=l(()=>{"use strict";BC=m(require("node:crypto")),GC=m(require("node:fs")),Au=e=>{try{let t=GC.default.readFileSync(e);return BC.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Rr,_o,yV,qC,jy,KC=l(()=>{"use strict";Rr=m(require("node:fs")),_o=m(require("node:path"));VC();yV=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=_o.default.join(t,n,o);return Rr.default.mkdirSync(_o.default.dirname(s),{recursive:!0}),Rr.default.copyFileSync(r,s),_o.default.relative(e,s).replaceAll("\\","/")},qC=e=>{let t=_o.default.join(e.repoRoot,e.repoRelativeDestination),r=Au(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(Rr.default.existsSync(t)){let n=Au(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=yV(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Rr.default.mkdirSync(_o.default.dirname(t),{recursive:!0}),Rr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Rr.default.mkdirSync(_o.default.dirname(t),{recursive:!0}),Rr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},jy=e=>{let t=Au(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var zy,JC,bu,Dy=l(()=>{"use strict";zy=m(require("node:fs"));$n();JC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bu=e=>{if(!zy.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(zy.default.readFileSync(e,"utf8"));if(JC(t)&&t.version===1&&JC(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var xr,Pu,YC,XC=l(()=>{"use strict";xr=m(require("node:fs")),Pu=m(require("node:path"));$n();YC=e=>{let t=new Set(e.setSlugs.map(s=>Su(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=Pu.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=Pu.default.join(e.repoRoot,i.backupPath);xr.default.existsSync(c)?(xr.default.mkdirSync(Pu.default.dirname(a),{recursive:!0}),xr.default.copyFileSync(c,a),o.push(s)):xr.default.existsSync(a)&&xr.default.rmSync(a,{force:!0})}else xr.default.existsSync(a)&&xr.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var $y,wu,Hy=l(()=>{"use strict";$y=m(require("node:path"));$n();wu=e=>({ledgerFilePath:$y.default.join(e.metaDirPath,HC),backupsDirPath:$y.default.join(e.metaDirPath,FC)})});var Fy,ZC,QC=l(()=>{"use strict";Fy=m(require("node:path")),ZC=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return Fy.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return Fy.default.posix.join(s,e,n)}});var Uy,ek,By,tk=l(()=>{"use strict";Uy=m(require("node:fs")),ek=m(require("node:path")),By=(e,t)=>{Uy.default.mkdirSync(ek.default.dirname(e),{recursive:!0}),Uy.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var Gy,SV,et,Yi=l(()=>{"use strict";Gy=m(require("node:os")),SV=e=>{let t=e.trim();return t.startsWith("~/")?`${Gy.default.homedir()}${t.slice(1)}`:t==="~"?Gy.default.homedir():t},et=SV});var vu,rk,AV,ok,nk=l(()=>{"use strict";vu=m(require("node:fs")),rk=m(require("node:path"));$n();po();AV=`*
!${Fd}
`,ok=e=>{let t=rk.default.join(e,UC);vu.default.existsSync(t)||(vu.default.mkdirSync(e,{recursive:!0}),vu.default.writeFileSync(t,AV))}});var Wo,tt,Lo=l(()=>{"use strict";Wo=m(require("node:path"));po();Yi();tt=e=>{let t=et(e),r=Wo.default.join(t,mE);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Wo.default.join(r,"rag"),memoryDirPath:Wo.default.join(r,gE),reportsDirPath:Wo.default.join(r,hE),metaFilePath:Wo.default.join(r,Fd),ragChunksFilePath:Wo.default.join(r,"rag",fE)}}});var Ct,ik,bV,PV,qe,Vy=l(()=>{"use strict";Ct=m(require("node:fs")),ik=m(require("node:path"));po();nk();Lo();bV=(e,t)=>{if(Ct.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Ct.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},PV=e=>{Ct.default.existsSync(e.ragChunksFilePath)||Ct.default.writeFileSync(e.ragChunksFilePath,"");let t=ik.default.join(e.memoryDirPath,wn);Ct.default.existsSync(t)||Ct.default.writeFileSync(t,"")},qe=e=>{let t=tt(e.projectFolderPath);return Ct.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Ct.default.mkdirSync(t.ragDirPath,{recursive:!0}),Ct.default.mkdirSync(t.memoryDirPath,{recursive:!0}),ok(t.metaDirPath),bV(t,e),PV(t),{ok:!0,layout:t}}});var ak,lk,ck,dk,_u,Wu=l(()=>{"use strict";ak="components",lk="store",ck="versions",dk="installed.json",_u=e=>`harness-set:${e.trim()}`});var qy,uk,Lu,Ky=l(()=>{"use strict";qy=m(require("node:fs")),uk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Lu=e=>{if(!qy.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(qy.default.readFileSync(e,"utf8"));if(uk(t)&&t.version===1&&uk(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var Xi,Hn,Eu=l(()=>{"use strict";Xi=m(require("node:path"));Wu();Hn=e=>{let t=Xi.default.join(e,ak);return{componentsRootDir:t,storeDir:Xi.default.join(t,lk),versionsDir:Xi.default.join(t,ck),installedFilePath:Xi.default.join(t,dk)}}});var Jy,pk,Cu,ku,Ru=l(()=>{"use strict";Jy=m(require("node:crypto")),pk=m(require("node:fs")),Cu=e=>Jy.default.createHash("sha256").update(e,"utf8").digest("hex"),ku=e=>{try{let t=pk.default.readFileSync(e);return Jy.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Yy,mk,gk,fk=l(()=>{"use strict";Yy=m(require("node:fs")),mk=m(require("node:path")),gk=(e,t)=>{Yy.default.mkdirSync(mk.default.dirname(e),{recursive:!0}),Yy.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var Xy,Zy,hk,yk=l(()=>{"use strict";Xy=m(require("node:fs")),Zy=m(require("node:path")),hk=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=Zy.default.join(e,r),n=Zy.default.join(o,`${t.versionId}.json`);Xy.default.mkdirSync(o,{recursive:!0}),Xy.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var xu,Sk,Ak,bk=l(()=>{"use strict";xu=m(require("node:fs")),Sk=m(require("node:path"));Ru();Ak=e=>{let t=Cu(e.content),r=Sk.default.join(e.storeDir,t);return xu.default.existsSync(r)||(xu.default.mkdirSync(e.storeDir,{recursive:!0}),xu.default.writeFileSync(r,e.content)),t}});var Qy,Pk,wV,Tu,eS=l(()=>{"use strict";Qy=m(require("node:fs")),Pk=m(require("node:path"));Wu();Ky();Eu();Ru();fk();yk();bk();wV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Tu=e=>{let t=Hn(e.installDir),r=_u(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!wV(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=Pk.default.join(e.harnessRootDir,a);if(!Qy.default.existsSync(c))continue;let d=Qy.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:ku(c);if(p!==null){if(Cu(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);Ak({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;hk(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=Lu(t.installedFilePath);gk(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var rS,tS,wk,vk=l(()=>{"use strict";rS=m(require("node:fs"));eS();Ky();Eu();tS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wk=e=>{if(!rS.default.existsSync(e.harnessManifestPath))return;let t=Hn(e.installDir),r=Lu(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(rS.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!tS(o)||o.version!==1||!tS(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!tS(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Tu({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var oS,_k,Wk,Lk=l(()=>{"use strict";oS=m(require("node:fs")),_k=m(require("node:path")),Wk=e=>{let t=e.componentId.replaceAll("/","_"),r=_k.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!oS.default.existsSync(r))return null;try{let o=JSON.parse(oS.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Iu,Ou,Ek,Ck=l(()=>{"use strict";Iu=m(require("node:fs")),Ou=m(require("node:path"));Wu();vk();Lk();Eu();Ru();Ek=e=>{wk({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Hn(e.layout.installDir),r=_u(e.setSlug),o=Wk({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Ou.default.join(t.storeDir,i.contentSha256);if(Iu.default.existsSync(a)&&ku(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Ou.default.join(e.layout.harnessRootDir,n):Ou.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Iu.default.existsSync(s))return null;try{if(!Iu.default.statSync(s).isFile())return null}catch{return null}return s}});var kk,vV,_V,Tr,Mu=l(()=>{"use strict";Dy();Hy();Lo();kk="harness-set:",vV=e=>{let t=e.trim();if(!t.startsWith(kk))return null;let r=t.slice(kk.length).trim();return r.length>0?r:null},_V=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=vV(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Tr=e=>{let t=tt(e),{ledgerFilePath:r}=wu(t),o=bu(r);return _V(o)}});var Nu,nS,Zi,WV,Yt,Qi,Fn=l(()=>{"use strict";Nu=m(require("node:fs")),nS=m(require("node:os")),Zi=m(require("node:path")),WV=()=>Nu.default.realpathSync(Zi.default.resolve(nS.default.homedir())),Yt=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Zi.default.join(nS.default.homedir(),t.slice(1)):t,o;try{o=Nu.default.realpathSync(Zi.default.resolve(r))}catch{return null}let n=WV();return o===n||o.startsWith(`${n}${Zi.default.sep}`)?o:null},Qi=e=>{let t=Yt(e);if(t===null)return null;try{if(!Nu.default.statSync(t).isFile())return null}catch{return null}return t}});var sS,iS=l(()=>{"use strict";sS=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var zu,Rk,ju,LV,ea,aS=l(()=>{"use strict";zu=m(require("node:fs")),Rk=m(require("node:path"));$n();KC();Dy();XC();Hy();QC();tk();Yi();Vy();Ck();Mu();Fn();iS();ju=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),LV=e=>{if(!zu.default.existsSync(e))return null;try{let t=JSON.parse(zu.default.readFileSync(e,"utf8"));if(ju(t)&&t.version===1)return t}catch{return null}return null},ea=e=>{let t=[...new Set(e.setSlugs.map(b=>b.trim()).filter(b=>b.length>0))],r=et(e.projectFolderPath),o=Yt(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=zu.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=qe({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=wu(s.layout),d=Tr(o).filter(b=>!t.includes(b)),p=bu(i),g=0;if(d.length>0){let b=YC({repoRoot:o,setSlugs:d,ledger:p});p=b.ledger,g=b.summary.removedPaths.length}if(t.length===0)return By(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:[]};let A=LV(e.layout.harnessManifestPath);if(A===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=ju(A.sets)?A.sets:{},y=0,u=0,S=0;for(let b of t){let f=h[b];if(!ju(f))return{ok:!1,errorMessage:`Harness set "${b}" is not installed locally.`};let w=typeof f.version=="number"?String(f.version):"1",v=Su(b),_=Array.isArray(f.items)?f.items:[];for(let C of _){if(!ju(C))continue;let L=typeof C.path=="string"?C.path.trim():"";if(L.length===0)continue;let x=sS(L);if(x===null)continue;let I=ZC(b,x),M=Rk.default.posix.join(".cursor",I).replaceAll("\\","/"),oe=typeof C.id=="string"?C.id.trim():"",G=Ek({layout:e.layout,setSlug:b,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:L,manifestItemId:oe});if(G===null)continue;let F=qC({repoRoot:o,backupsDir:a,repoRelativeDestination:M,sourceAbsolutePath:G,componentId:v,versionId:w,ledger:p});if(F.kind==="skipped_unchanged"){u+=1;continue}if(F.kind==="backed_up_user_file"){S+=1,y+=1,p={version:1,entries:{...p.entries,[M]:jy({componentId:v,versionId:w,sourceAbsolutePath:G,backupPath:F.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[M]:jy({componentId:v,versionId:w,sourceAbsolutePath:G})}}}}return y===0&&u===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(By(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:S,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:t})}});var xk,Du,EV,CV,kV,RV,xV,TV,IV,OV,MV,ta,$u=l(()=>{"use strict";xk=m(require("node:crypto")),Du=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},EV=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},CV=(e,t)=>{let r=EV(t),o=Du(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},kV=(e,t,r)=>{let o=CV(t,r);return`shared/items/${e}/${o}`},RV=["rules","skills","commands","instructions","agents"],xV=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),TV=(e,t)=>[...e.filter(o=>o.id!==t.id),t],IV=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},OV=e=>xk.default.createHash("sha256").update(e,"utf8").digest("hex"),MV=e=>({id:e.id,kind:e.kind,title:e.title,path:kV(e.id,e.kind,e.title),contentSha256:OV(e.content)}),ta=e=>{let t=new Date().toISOString(),r=e.existingManifest??xV(e.hostname,t),o=Du(e.bundle.slug),n=IV(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...RV.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let g=MV(p);return{files:[...d.files,{relativePath:g.path,content:p.content}],nextItems:TV(d.nextItems,g)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var Ir,Tk,Hu,NV,Eo,lS=l(()=>{"use strict";Ir=m(require("node:fs")),Tk=m(require("node:os")),Hu=m(require("node:path"));$u();NV=e=>{if(!Ir.default.existsSync(e))return null;try{let t=JSON.parse(Ir.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Eo=e=>{try{let t=NV(e.layout.harnessManifestPath),r=ta({bundle:e.bundle,hostname:Tk.default.hostname(),existingManifest:t});Ir.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)Ir.default.mkdirSync(Hu.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Hu.default.join(e.layout.harnessRootDir,o.relativePath);Ir.default.mkdirSync(Hu.default.dirname(n),{recursive:!0}),Ir.default.writeFileSync(n,o.content)}return Ir.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var cS,Ik=l(()=>{"use strict";lS();aS();cS=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=Eo({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return ea({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var Ok,Mk=l(()=>{"use strict";Ok=["rule","skill","command","instruction","agent"]});var Nk,jV,zV,kt,dS=l(()=>{"use strict";Mk();Nk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jV=e=>typeof e=="string"&&Ok.includes(e),zV=e=>{if(!Nk(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!jV(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},kt=e=>{if(!Nk(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=zV(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var jk,DV,uS,zk=l(()=>{"use strict";jk=require("node:zlib");dS();DV="x-agent-witch-token",uS=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[DV]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,jk.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=kt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var mS,pS,Or,Dk=l(()=>{"use strict";mS=m(require("node:fs")),pS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Or=e=>{if(!mS.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(mS.default.readFileSync(e.harnessManifestPath,"utf8"));if(!pS(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=pS(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!pS(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Fu,$k=l(()=>{"use strict";Fu=()=>"~"});var Hk,Fk,Uk=l(()=>{"use strict";Hk=require("node:crypto"),Fk=e=>`local-${(0,Hk.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var gS,Bk=l(()=>{"use strict";gS=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var ra,Uu,fS=l(()=>{"use strict";ra=m(require("node:path")),Uu=e=>{let t=ra.default.dirname(e),r=ra.default.basename(t);return r==="agents"?ra.default.basename(ra.default.dirname(t)):r}});var oa,Xt,Gk,$V,HV,FV,Bu,Vk,hS=l(()=>{"use strict";oa=m(require("node:fs")),Xt=m(require("node:path"));Uk();Bk();fS();Gk=new Set(["node_modules",".git","dist","build",".next","coverage"]),$V=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},HV=(e,t)=>{let r=Xt.default.basename(t);if(e==="skill"){let o=t.split(Xt.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},FV=e=>{let t=[],r=(n,s)=>{let i;try{i=oa.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&Gk.has(a.name))continue;let c=Xt.default.join(n,a.name),d=s?Xt.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;gS(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=Xt.default.join(e,n);oa.default.existsSync(s)&&r(s,n)}let o=Xt.default.join(e,"skills");return oa.default.existsSync(o)&&r(o,"skills"),t},Bu=e=>{let t=FV(e);if(t.length===0)return null;let r=Xt.default.dirname(e),o=Uu(e),n=$V(o),s=t.map(i=>{let a=gS(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:Fk(i.absolutePath),kind:a,title:HV(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},Vk=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=oa.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||Gk.has(a.name))continue;let c=Xt.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var qk,yS,UV,SS,Kk=l(()=>{"use strict";qk=m(require("node:fs")),yS=m(require("node:path"));hS();Fn();UV=e=>{let t=Yt(e.trim());if(t===null)return null;if(yS.default.basename(t)===".cursor")return t;let r=yS.default.join(t,".cursor");try{if(qk.default.statSync(r).isDirectory())return Yt(r)}catch{return null}return null},SS=e=>{let t=UV(e.projectPath);if(t===null)return null;let r=Bu(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var Jk,BV,Gu,AS,Yk=l(()=>{"use strict";Jk=m(require("node:path"));hS();Fn();fS();BV=5,Gu=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},AS=e=>{let t=Yt(e.scanRoot.trim());if(t===null)return Gu(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of Vk(t,BV,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=Yt(s);if(i===null)continue;let a=Uu(i);Gu(e.response,"folder",{cursorDir:i,groupName:a,repoPath:Jk.default.dirname(i)});let c=Bu(i);c!==null&&(r.push(c),Gu(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Gu(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var Xk,Zk,Qk=l(()=>{"use strict";Xk=m(require("node:path")),Zk=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:Xk.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Me,eR,bS,GV,PS,wS,Vu,vS,na,tR=l(()=>{"use strict";Me=m(require("node:fs")),eR=m(require("node:os")),bS=m(require("node:path"));$u();eS();Fn();Qk();GV=e=>{if(!Me.default.existsSync(e))return null;try{let t=JSON.parse(Me.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},PS=e=>{let t=e.hostname??eR.default.hostname(),r=GV(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let g=Qi(p.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let A=Me.default.readFileSync(g,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:A,setSlugs:[i.slug]})}let d=ta({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Me.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Me.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=bS.default.join(e.layout.harnessRootDir,i.relativePath);Me.default.mkdirSync(bS.default.dirname(a),{recursive:!0}),Me.default.writeFileSync(a,i.content)}Me.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=Du(i.slug),d=r.sets[c];d!==void 0&&Tu({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},wS="reveal-cache.json",Vu=(e,t)=>{Me.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Me.default.writeFileSync(`${e.harnessRootDir}/${wS}`,`${JSON.stringify(t,null,2)}
`)},vS=e=>{let t=`${e.harnessRootDir}/${wS}`;Me.default.existsSync(t)&&Me.default.unlinkSync(t)},na=e=>{let t=`${e.harnessRootDir}/${wS}`;if(!Me.default.existsSync(t))return null;try{let r=JSON.parse(Me.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return Zk(r)}catch{return null}return null}});var Co=l(()=>{"use strict";aS();Ik();iS();lS();zk();dS();$u();Dk();$k();Kk();Fn();Yk();tR()});var _S,rR=l(()=>{"use strict";Co();Ee();_S=e=>{let t=N(e.profileEmail);return Eo({bundle:e.bundle,layout:t})}});var oR=l(()=>{"use strict";rR();Co()});var VV,nR,qV,sR,ko,qu,iR=l(()=>{"use strict";VV=["agentwitch.com","www.agentwitch.com"],nR=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,qV=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},sR=e=>{let t=qV(e);return!!(VV.includes(t)||nR.test(e.trim().toLowerCase()))},ko=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return sR(r)?nR.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},qu=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:ko(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var sa=l(()=>{"use strict";iR()});var Zt,ia=l(()=>{"use strict";Zt=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var aa,aR=l(()=>{"use strict";oR();sa();ia();aa=e=>{if(!Zt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=kt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!ko(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=_S({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var WS=l(()=>{"use strict";aR()});var KV,Un,LS=l(()=>{"use strict";KV=e=>e==="hourly"||e==="daily"||e==="weekdays",Un=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!KV(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var la,Ku,lR,cR,ES,ft,Ju,Yu,Xu,Zu,Qu=l(()=>{"use strict";la=m(require("node:fs")),Ku=m(require("node:path"));LS();lR="automations.json",cR=e=>e.profileEmail!==null?Ku.default.join(e.installDir,"profiles",e.profileEmail,lR):Ku.default.join(e.installDir,lR),ES=()=>({version:1,automations:[]}),ft=e=>{let t=cR(e);if(!la.default.existsSync(t))return ES();try{let r=JSON.parse(la.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?ES():{version:1,automations:r.automations.flatMap(n=>{let s=Un(n);return s!==null?[s]:[]})}}catch{return ES()}},Ju=(e,t)=>{let r=cR(e);la.default.mkdirSync(Ku.default.dirname(r),{recursive:!0}),la.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Yu=(e,t)=>{Ju(e,{version:1,automations:t})},Xu=(e,t)=>{let o=ft(e).automations.filter(n=>n.id!==t.id);Ju(e,{version:1,automations:[...o,t]})},Zu=(e,t)=>ft(e).automations.find(r=>r.id===t)??null});var $e,Mr=l(()=>{"use strict";$e="x-agent-witch-token"});var X,Ro,CS,ca,kS,JV,RS,da,ua,xS,pa=l(()=>{"use strict";Mr();Qe();X=e=>{let t=ke(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Ro=e=>({[$e]:e,"Content-Type":"application/json"}),CS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Ro(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},ca=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Ro(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},kS=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Ro(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},JV=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},RS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:Ro(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},da=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:Ro(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return JV(r)}catch{return null}},ua=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:Ro(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},xS=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Ro(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var xo,dR,uR,YV,TS,pR,IS=l(()=>{"use strict";xo=m(require("node:fs")),dR=m(require("node:path")),uR=e=>dR.default.join(e.harnessRootDir,"projects-registry.json"),YV=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),TS=e=>{let t=uR(e);if(!xo.default.existsSync(t))return[];try{let r=JSON.parse(xo.default.readFileSync(t,"utf8"));return YV(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},pR=e=>{let t=uR(e);if(!xo.default.existsSync(t))return;let r=`${t}.migrated`;if(xo.default.existsSync(r)){xo.default.unlinkSync(t);return}xo.default.renameSync(t,r)}});var mR,XV,ZV,gR,fR=l(()=>{"use strict";Yi();mR=e=>et(e),XV=e=>new Set(e.map(t=>mR(t.folderPath))),ZV=e=>new Set(e.map(t=>t.id)),gR=(e,t)=>{let r=XV(t),o=ZV(t),n=[],s=new Set;for(let i of e){let a=mR(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var OS,MS=l(()=>{"use strict";pa();IS();fR();OS=async(e,t)=>{let r=TS(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=X({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await da(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=gR(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await RS(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&pR(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var NS,To,ep=l(()=>{"use strict";NS=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),To=(e,t)=>e.find(r=>r.id===t)??null});var Bn,tp=l(()=>{"use strict";pa();MS();ep();Bn=async(e,t)=>{t!==void 0&&await OS(t,e);let r=X({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await da(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Console. Check the Mac connection and try again."};let n=NS(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Console, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Console.`}}});var hR=l(()=>{"use strict"});var Ne,yR,QV,eq,tq,rq,Gn,jS=l(()=>{"use strict";Ne=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yR=(e,t)=>e.length===0?`<p class="empty">${Ne(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Ne(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Ne(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Console \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,QV=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,eq=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ne(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Console. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,tq=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?eq(e.project):QV();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
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
      </form>`},rq=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Ne(t)} from recent runs. Review in Agent Witch Console or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Ne(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},Gn=e=>{let t=e.flashError?`<div class="alert-error">${Ne(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ne(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(a,c)=>`<a class="project-tab${e.activeTab===a?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${a}">${Ne(c)}</a>`,n=e.composition?.items.filter(a=>a.kind==="workflow")??[],s=e.composition?.items.filter(a=>a.kind==="agent")??[],i="";return e.activeTab==="harness"?i=tq({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=yR(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=yR(s,"No agents installed for this project yet."):i=rq({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount}),`${t}<section class="card">
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
    </section>`}});var oq,nq,SR,AR=l(()=>{"use strict";Co();Mr();oq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nq=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!oq(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=kt(n);return s===null?[]:[s]})}catch{return null}},SR=nq});var bR,zS,PR=l(()=>{"use strict";de();Co();jS();tp();AR();ep();Mu();pa();bR=e=>({kind:"page",title:e.project.name,body:Gn({project:e.project,installed:Or(e.layout),linkedSetSlugs:Tr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),zS=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let o=await Bn(r,e.layout),n=To(o.projects,t);if(n===null)return{kind:"not_found"};let s=X({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s===null?null:await SR(s,n.id);if(i===null)return bR({layout:e.layout,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Console."});let a=cS({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:i});if(!a.ok)return bR({layout:e.layout,project:n,errorMessage:a.errorMessage});let c=s===null?!1:await ua(s,n.id,a.appliedSetSlugs),d=new URLSearchParams({linked:"1",files:String(a.writtenFileCount),bindingsSynced:c?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${d.toString()}`}}});var sq,DS,wR=l(()=>{"use strict";sq=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,DS=sq});var vR,_R,iq,aq,rp,op,WR=l(()=>{"use strict";vR=require("node:child_process"),_R=require("node:util"),iq=(0,_R.promisify)(vR.execFile),aq=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},rp=async(e,t)=>{try{let{stdout:r}=await iq("git",t,{cwd:e,env:aq(),maxBuffer:1048576});return r.trim()}catch{return null}},op=async e=>{let t=await rp(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await rp(e,["rev-parse","--abbrev-ref","HEAD"]),o=await rp(e,["status","--porcelain"]),n=await rp(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var $S,LR=l(()=>{"use strict";$S=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var lq,HS,ER=l(()=>{"use strict";lq=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},HS=lq});var cq,FS,CR=l(()=>{"use strict";Mr();cq=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[$e]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},FS=cq});var kR,Nr,RR=l(()=>{"use strict";kR=require("node:child_process"),Nr=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,kR.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var xR=l(()=>{"use strict";tp()});var ma,TR=l(()=>{"use strict";Mr();ma=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[$e]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var ht=l(()=>{"use strict";tp();ep();hR();Yi();Vy();PR();Mu();wR();WR();LR();ER();CR();RR();xR();TR();MS();IS();pa()});var np,ga,IR,US,Io,BS=l(()=>{"use strict";np=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},ga=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=np(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},IR=e=>e>=1&&e<=5,US=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return np(t,"UTC")},Io=e=>{let t=e.from??new Date,r=np(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return ga(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=ga(r,e.timeZone,o,0),s=np(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?ga(US(r),e.timeZone,o,0):n;if(!i&&IR(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=US(a),IR(a.weekday))return ga(a,e.timeZone,o,0);return ga(US(r),e.timeZone,o,0)}});var OR,GS,Qt,VS=l(()=>{"use strict";OR=require("node:crypto");de();ht();BS();Qu();GS=!1,Qt=async e=>{if(GS)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=X({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=Zu(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};GS=!0;let n=(0,OR.randomUUID)();try{let s=await zn(t,"claude-cli",o.prompt);await xS(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=Io({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return Xu(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{GS=!1}}});var sp,MR=l(()=>{"use strict";de();VS();Qu();sp=async()=>{let e=$();if(e===null)return;let t=ft(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await Qt(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var fa=l(()=>{"use strict";Qu();MR();VS();BS()});var NR=l(()=>{"use strict";fa()});var jR=l(()=>{"use strict";LS()});var zR=l(()=>{"use strict";jR()});var qS=l(()=>{"use strict";fa()});var dq,uq,ha,KS=l(()=>{"use strict";NR();zR();qS();Ee();dq=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),uq=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??Io({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??Io({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},ha=e=>{let t=dq(e.profileEmail),r=ft(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Un(s);return i!==null?[uq(i,o.get(i.id))]:[]});return Yu(t,n),{ok:!0,writtenCount:n.length}}});var JS=l(()=>{"use strict";fa()});var DR=l(()=>{"use strict";de()});var $R=l(()=>{"use strict";KS();JS();qS();DR()});var HR,ya,Sa,Aa,FR=l(()=>{"use strict";HR=m(require("node:os"));$R();sa();ia();ya=e=>{if(!Zt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!ko(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=ha({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Sa=async e=>{if(!Zt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:ko(t)?Qt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Aa=()=>{let e=$(),t=e!==null?ft(e.layout):{version:1,automations:[]};return{ok:!0,hostname:HR.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var YS=l(()=>{"use strict";FR()});var ip=l(()=>{"use strict";te()});var ap=l(()=>{"use strict";te()});var lp,BR,GR,UR,pq,mq,Vn,XS=l(()=>{"use strict";lp=m(require("node:fs")),BR=m(require("node:os")),GR=m(require("node:path"));ip();ap();Gi();Ee();UR=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},pq=e=>GR.default.join(BR.default.homedir(),"Library","LaunchAgents",`${e}.plist`),mq=async e=>lp.default.existsSync(pq(e))?(await Le(e)).ok:!1,Vn=async(e=E())=>{let t=lp.default.existsSync(hu(e)),r=!lp.default.existsSync(Ft(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Bi(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await UR(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${ne(e)}-wake`;await mq(i)&&s.push(i);for(let c of ee(e))(await Le(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await UR(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var VR=l(()=>{"use strict";te()});var qn,ba=l(()=>{"use strict";qn="connection-health.json"});var Oo,cp,gq,Pa,we,ZS,dp,je,up=l(()=>{"use strict";Oo=m(require("node:fs")),cp=m(require("node:path"));ba();gq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Pa=e=>e.profileEmail===null?cp.default.join(e.installDir,qn):cp.default.join(e.installDir,"profiles",e.profileEmail,qn),we=e=>{let t=Pa(e);if(!Oo.default.existsSync(t))return null;try{let r=JSON.parse(Oo.default.readFileSync(t,"utf8"));return!gq(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},ZS=e=>{let t=Pa(e);Oo.default.existsSync(t)&&Oo.default.rmSync(t,{force:!0})},dp=(e,t)=>{let r=Pa(e),o=we(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Oo.default.mkdirSync(cp.default.dirname(r),{recursive:!0}),Oo.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},je=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var wa,qR=l(()=>{"use strict";ba();up();wa=(e,t)=>{if(!t.socketOpen)return!1;let r=we(e);return r===null?!1:!je(r,t.staleAfterMs??12e4,t.nowMs)}});var QS,KR=l(()=>{"use strict";up();QS=(e,t)=>!(e!==null&&!je(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Kn=l(()=>{"use strict";up();qR();KR();ba()});var eA=l(()=>{"use strict";Kn();te()});var tA=l(()=>{"use strict";Kn()});var rA=l(()=>{"use strict";te()});var YR,JR,va,oA=l(()=>{"use strict";YR=m(require("node:fs"));Kt();ip();ap();Ee();JR=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},va=async(e=E())=>{if(!YR.default.existsSync(Ft(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await JR())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of ee(e))(await Le(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await JR();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var XR=l(()=>{"use strict";te()});var ZR,Mo,nA,fq,hq,yq,QR,Sq,ex,Jn,pp=l(()=>{"use strict";ZR=require("node:crypto"),Mo=m(require("node:fs")),nA=m(require("node:path"));Ee();fq="watchdog-log.ndjson",hq=200,yq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),QR=(e=E())=>{let t=N(),r=t.installDir===e?t.logsDir:Pn({installDir:e,profileEmail:t.profileEmail});return nA.default.join(r,fq)},Sq=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!yq(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},ex=(e,t=E())=>{let r={id:(0,ZR.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=QR(t);Mo.default.mkdirSync(nA.default.dirname(o),{recursive:!0});let n=Mo.default.existsSync(o)?Mo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-hq+1)),JSON.stringify(r)];return Mo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Jn=(e=20,t=E())=>{let r=QR(t);if(!Mo.default.existsSync(r))return[];let o=Mo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=Sq(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var sA,iA,aA,lA=l(()=>{"use strict";_t();sA=no.watchdogReinstallState,iA=900*1e3,aA=3e3});var tx=l(()=>{"use strict";lA()});var rx={};wt(rx,{verifyAgentWitchReviveAfterKickstart:()=>bq});var Aq,bq,ox=l(()=>{"use strict";tx();tA();rA();Ee();Aq=e=>new Promise(t=>{setTimeout(t,e)}),bq=async e=>{if(await Aq(e.verifyDelayMs??aA),!await ao(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),o=we(r);return!je(o,e.staleAfterMs)}});var _a,cA,Pq,nx,sx,dA,uA,pA=l(()=>{"use strict";_a=m(require("node:fs")),cA=m(require("node:path"));V();lA();Pq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nx=e=>cA.default.join(e,sA),sx=(e=E())=>{let t=nx(e);if(!_a.default.existsSync(t))return null;try{let r=JSON.parse(_a.default.readFileSync(t,"utf8"));return!Pq(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},dA=(e=E(),t=Date.now())=>{let r=sx(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=iA:!0},uA=(e=E(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=nx(e);return _a.default.mkdirSync(cA.default.dirname(o),{recursive:!0}),_a.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var mA,ix=l(()=>{"use strict";te();pA();mA=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!dA())return{attempted:!1,ok:!1,targets:e};uA();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Le(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var ax=l(()=>{"use strict";pA();ix()});var gA=l(()=>{"use strict";Qe()});var lx=l(()=>{"use strict";Qe()});var cx,Yn,dx,ux,px,wq,vq,mx,_q,Wq,gx,fx=l(()=>{"use strict";cx=require("node:child_process"),Yn=m(require("node:fs")),dx=m(require("node:os")),ux=m(require("node:path")),px=require("node:util");gA();lx();Ee();wq=(0,px.promisify)(cx.execFile),vq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mx=e=>{let t=dt(e),r=t===null?N():N(t);if(!Yn.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Yn.default.readFileSync(r.configPath,"utf8"));return!vq(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},_q=e=>mx(e)?.wsUrl??null,Wq=e=>{let t=_q(e);return t!==null?ke(t):Ce(e)?.appOrigin??null},gx=async e=>{let t=e?.installDir??E(),r=mx(t),o=r!==null?ke(r.wsUrl):Wq(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=ux.default.join(dx.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Yn.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??dt(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await wq("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Yn.default.existsSync(i)&&Yn.default.unlinkSync(i)}}});var hx={};wt(hx,{attemptAgentWitchWatchdogReinstall:()=>Lq});var Lq,yx=l(()=>{"use strict";ax();fx();Lq=async e=>mA(e,()=>gx())});var Sx,Ax,bx,Eq,Cq,kq,Wa,fA=l(()=>{"use strict";VR();eA();tA();rA();oA();XS();ip();ap();Ee();Cn();XR();pp();Sx=e=>e===null?N():N(e),Ax=async(e,t,r)=>{if(!await ao(e))return"not_running";let n=Sx(t);if(pt(n))return"healthy";let s=we(n);return je(s,r)?"stale_connection":"healthy"},bx=async e=>{let t=e?.staleAfterMs??12e4,r=E(),o=ee(r);return Promise.all(o.map(async n=>{let s=await Ax(n.launchAgentLabel,n.profileEmail,t),i=Sx(n.profileEmail),a=we(i),c=await ao(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:je(a,t),needsRevive:s!=="healthy",reason:s}}))},Eq=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},Cq=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",kq=async e=>{let t=await Le(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(ox(),rx)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},Wa=async e=>{if(!ut())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=E();await Vn(r),await va(r);let o=ee(r),n=[];for(let p of o){let g=await Ax(p.launchAgentLabel,p.profileEmail,t);if(g==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:g});continue}n.push(await kq({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:g,staleAfterMs:t}))}if(n.length===0){let p=io();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(yx(),hx)),g=await p(n);s=g.attempted,i=g.ok,a=g.errorMessage,c=[...g.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&ex({event:Cq(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:Eq(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var Px,mp,wx=l(()=>{"use strict";Px=m(require("node:os"));eA();pp();fA();mp=async()=>{let e=await bx(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:Px.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Jn(1)[0]??null}}});var hA=l(()=>{"use strict";XS();fA();wx();pp()});var La,Ea,Ca,vx=l(()=>{"use strict";te();hA();La=async()=>{await Vn();let e=ee(),t=[];for(let r of e){let o=await Le(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=io();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Ea=Wa,Ca=Wa});var yA=l(()=>{"use strict";vx()});var fp,gp,_x,SA,Wx,Rq,xq,Tq,Iq,Oq,hp,Lx=l(()=>{"use strict";fp=require("node:child_process"),gp=m(require("node:fs")),_x=m(require("node:os")),SA=m(require("node:path")),Wx=require("node:util");te();V();Rq=(0,Wx.promisify)(fp.execFile),xq=()=>SA.default.join(_x.default.homedir(),"Library","LaunchAgents"),Tq=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await Rq("launchctl",["bootout",r]).catch(()=>{})},Iq=e=>{let t=SA.default.join(xq(),`${e}.plist`);gp.default.existsSync(t)&&gp.default.unlinkSync(t)},Oq=e=>{(0,fp.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},hp=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=E();if(!gp.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Ut(e);for(let r of t)await Tq(r),Iq(r);return Oq(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var Ex,yp,Cx,Xn,kx,Mq,Nq,jq,AA,zq,bA,Rx=l(()=>{"use strict";Ex=require("node:child_process"),yp=m(require("node:fs")),Cx=m(require("node:os")),Xn=m(require("node:path")),kx=require("node:util");te();Mq=(0,kx.promisify)(Ex.execFile),Nq=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],jq=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],AA=e=>{yp.default.existsSync(e)&&yp.default.rmSync(e,{force:!0})},zq=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await Mq("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},bA=async e=>{let r=(e.listLaunchAgentLabels??Ut)(e.layout.installDir),o=e.launchAgentsDir??Xn.default.join(Cx.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??zq;for(let i of r)await n(i),AA(Xn.default.join(o,`${i}.plist`));let s=Xn.default.dirname(e.layout.configPath);for(let i of Nq)AA(Xn.default.join(s,i));for(let i of jq)AA(Xn.default.join(e.layout.installDir,i));return yp.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var PA,xx=l(()=>{"use strict";PA={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var wA,Tx=l(()=>{"use strict";wA="unknown_identity"});var vA=l(()=>{"use strict";xx();Tx()});var Dq,_A,Ix=l(()=>{"use strict";vA();Dq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_A=e=>e.type!=="system.error"||!Dq(e.payload)?!1:e.payload.errorCode===wA});var WA=l(()=>{"use strict";Lx();Rx();Ix()});var Sp=l(()=>{"use strict";te();Qe();WA();hA()});var Zn,Ap,bp=l(()=>{"use strict";Sp();Zn=(e=20)=>Jn(e),Ap=mp});var Pp,Qn,wp,vp=l(()=>{"use strict";Sp();Pp=Po,Qn=(e=20)=>So(e),wp=e=>bo(e)});var _p,LA=l(()=>{"use strict";Sp();_p=()=>hp()});var Ox=l(()=>{"use strict";Ny();WS();YS();yA();bp();vp();LA()});var Mx={};wt(Mx,{buildAgentWitchAutomationStatusFromWakeServer:()=>Aa,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Pp,buildAgentWitchWakeHealthResponse:()=>qi,buildAgentWitchWakeIdentityResponse:()=>Ki,buildAgentWitchWatchdogStatus:()=>Ap,installHarnessFromWakeServer:()=>aa,readAgentWitchSelfUpdateLogEntries:()=>Qn,readAgentWitchWatchdogLogEntries:()=>Zn,restartAgentWitchFromWakeServer:()=>Ca,reviveAgentWitchWebSocketFromWakeServer:()=>Ea,runAgentWitchSelfUpdateFromWakeServer:()=>wp,runAgentWitchUninstallLocalFromWakeServer:()=>_p,runAutomationFromWakeServer:()=>Sa,syncAutomationsFromWakeServer:()=>ya,wakeAgentWitchLaunchAgents:()=>La});var Nx=l(()=>{"use strict";Ox()});var jx,zx,EA,CA,Dx=l(()=>{"use strict";jx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),zx=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?jx(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?jx(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},EA=e=>{let t=e.watchdogLogs.map(zx).join(""),r=e.updateLogs.map(zx).join("");return`<!doctype html>
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
</html>`},CA=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var $x,Hx,Fx=l(()=>{"use strict";$x=m(require("node:net")),Hx=()=>new Promise((e,t)=>{let r=$x.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var Ux,$q,kA,Bx=l(()=>{"use strict";Ux=m(require("node:net"));Fx();Vi();Gi();Ee();$q=e=>new Promise(t=>{let r=Ux.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),kA=async()=>{let e=E(),t=gt();if(await $q(t))return zC(t),t;let r=await Hx();return yu(e,r),r}});var Hq,RA,Gx=l(()=>{"use strict";Hq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),RA=e=>({force:Hq(e)&&e.force===!0})});var ka=l(()=>{"use strict";sa();Dx();Bx();Gx();hh();qd();go()});var xA,z,TA,IA,Ra,Vx=l(()=>{"use strict";xA=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},z=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},TA=e=>{e.writeHead(403),e.end()},IA=e=>e.url?.split("?")[0]??"/",Ra=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var yt=l(()=>{"use strict";Vx()});var Fq,qx,Kx=l(()=>{"use strict";YS();yt();Fq=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return z(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},qx=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return z(e.response,200,Aa(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await Fq(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=ya(t);return z(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Sa(t);return z(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var Uq,Yx,Jx,Xx,OA,Zx,MA=l(()=>{"use strict";Uq=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],Yx=e=>/embed|minilm|^bge-/i.test(e),Jx=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),Xx=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),OA=e=>e.filter(t=>t.trim().length>0&&!Yx(t)),Zx=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!Yx(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>Jx(s,o));if(n!==void 0)return n}for(let n of Uq){let s=r.find(i=>Jx(i,n));if(s!==void 0)return s}return r[0]??null}});var NA,t0,r0,Wp,o0,Qx,e0,Bq,Gq,Vq,qq,Kq,Jq,St,xa=l(()=>{"use strict";NA=require("node:child_process"),t0=m(require("node:fs")),r0=m(require("node:os")),Wp=m(require("node:path"));Qe();mt();MA();o0=3e3,Qx=["claude-cli","codex","cursor","antigravity"],e0={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},Bq=(e,t)=>new Promise(r=>{let o=(0,NA.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},o0);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),Gq=()=>{let e=r0.default.homedir();return["ollama",Wp.default.join(e,".local","bin","ollama"),Wp.default.join(e,".agent-witch","ollama","ollama"),Wp.default.join(e,".local-agent-witch","ollama","ollama")]},Vq=e=>new Promise(t=>{let r=(0,NA.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},o0);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(Xx(Buffer.concat(o).toString("utf8")))})}),qq=async()=>{for(let e of Gq()){if(e!=="ollama"&&!t0.default.existsSync(e))continue;let t=await Vq(e);if(t!==null)return t}return[]},Kq=e=>{let t=e.installedWriterIds.map(s=>e0[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=le(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${e0[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},Jq=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:kn},St=async e=>{let t=Qx.map(i=>{let a=ou(i,e.commands);return Bq(a.command,a.args)}),[r,...o]=await Promise.all([qq(),...t]),n=Qx.flatMap((i,a)=>o[a]===!0?[i]:[]),s=Zx(r,Jq());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:Kq({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var Yq,Xq,jA,n0=l(()=>{"use strict";Yq="http://127.0.0.1:11434",Xq=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},jA=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Yq;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?Xq(await o.json()):null}catch{return null}}});var zA=l(()=>{"use strict";mt();xa();n0();MA()});var Zq,s0,i0=l(()=>{"use strict";zA();Zq={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},s0=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:Zq[t]})),ollamaModels:OA(e.ollamaModels)})});var Qq,a0,l0=l(()=>{"use strict";zA();yt();i0();Qq=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return z(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},a0=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await St({commands:ce({})});return z(e.response,200,{ok:!0,...s0({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await Qq(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await jA({model:r,prompt:o});return n===null?(z(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(z(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var eK,c0,d0=l(()=>{"use strict";WS();yt();eK=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return z(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},c0=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await eK(e);if(t===null)return!0;let r=aa(t);return z(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var u0=l(()=>{"use strict";ht()});var DA,p0=l(()=>{"use strict";u0();ia();DA=e=>{if(!Zt(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:qe({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var m0,$A,HA=l(()=>{"use strict";de();ht();ia();m0=e=>{if(!Zt(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},$A=async e=>{let t=m0(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Nr("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=$();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=X({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(qe({projectFolderPath:r}),await ma(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Console."})}});var g0=l(()=>{"use strict";p0();HA()});var f0,h0=l(()=>{"use strict";g0();HA();yt();f0=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=DA(t);return z(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await $A(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return z(e.response,o,r,e.cors.headers),!0}return!1}});var y0,S0=l(()=>{"use strict";ka();vp();bp();y0=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Zn(50),r=Qn(50);return e.response.writeHead(200,CA()),e.response.end(EA({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var A0,b0=l(()=>{"use strict";Ny();yt();A0=e=>e.request.method==="GET"&&e.pathname==="/health"?(z(e.response,200,qi(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(z(e.response,200,Ki(),e.cors.headers),!0):!1});var P0,w0=l(()=>{"use strict";LA();yt();P0=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await _p();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}});var v0,_0=l(()=>{"use strict";yA();yt();v0=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Ea();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Ca();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await La();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var W0,L0=l(()=>{"use strict";ka();vp();yt();W0=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Pp();return z(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=Ra(e.request,"/update/logs",20,200);return z(e.response,200,{ok:!0,logs:Qn(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=RA(t),o=await wp({force:r});return z(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var E0,C0=l(()=>{"use strict";bp();yt();E0=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await Ap();return z(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=Ra(e.request,"/watchdog/logs",20,200);return z(e.response,200,{ok:!0,logs:Zn(t)},e.cors.headers),!0}return!1}});var k0,R0=l(()=>{"use strict";Kx();l0();d0();h0();S0();b0();w0();_0();L0();C0();k0=[A0,y0,E0,v0,W0,P0,c0,f0,qx,a0]});var x0,T0=l(()=>{"use strict";R0();x0=async e=>{for(let t of k0)if(await t(e))return!0;return!1}});var tK,I0,O0=l(()=>{"use strict";sa();yt();T0();tK=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:IA(e),readJsonBody:()=>xA(e)}),I0=async(e,t,r)=>{let o=e.headers.origin,n=qu(o);try{if(o!==void 0&&o.length>0&&!n.allowed){TA(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=tK(e,t,r,n);if(await x0(s))return;z(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{z(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var M0,No,Lp,Ep=l(()=>{"use strict";M0=m(require("node:http"));ka();O0();No=async()=>{let e=await kA(),t=M0.default.createServer((r,o)=>{I0(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Lp=No});var N0={};wt(N0,{runAgentWitchBridgeCli:()=>rK});var rK,j0=l(()=>{"use strict";te();Ep();rK=async()=>{Be("agent-witch-bridge");let e=await No(),t=Gt(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var z0=l(()=>{"use strict";Kt()});var es,FA,D0=l(()=>{"use strict";es=(e,t,r)=>e===1?t:r,FA=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${es(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${es(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${es(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${es(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${es(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${es(p,"year","years")} ago`}});var jo,UA,oK,nK,BA,jr,Ta,GA,$0=l(()=>{"use strict";jo=m(require("node:fs")),UA=m(require("node:path")),oK="local-ws-traffic.ndjson",nK=500,BA=e=>UA.default.join(e.logsDir,oK),jr=(e,t)=>{let r=BA(e);jo.default.mkdirSync(UA.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});jo.default.appendFileSync(r,`${o}
`,"utf8")},Ta=(e,t=nK)=>{let r=BA(e);if(!jo.default.existsSync(r))return[];let n=jo.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},GA=e=>{let t=BA(e);jo.default.existsSync(t)&&jo.default.writeFileSync(t,"","utf8")}});var sK,H0,F0,U0=l(()=>{"use strict";vA();sK=new Set(Object.values(PA)),H0=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),F0=e=>{if(!H0(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!sK.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!H0(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var B0,G0=l(()=>{"use strict";B0=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var iK,aK,lK,Ia,V0=l(()=>{"use strict";G0();iK=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,aK=e=>iK.test(e),lK=e=>B0(e),Ia=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>Ia(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&aK(o)){r[o]=lK(n);continue}r[o]=Ia(n)}return r}});var Rt,VA,cK,dK,uK,qA,q0,K0,J0,pK,Cp,zo,kp,KA,Y0=l(()=>{"use strict";Rt=m(require("node:fs")),VA=m(require("node:path"));U0();V0();cK="local-ws-trace.ndjson",dK=1e4,uK=1440*60*1e3,qA=e=>VA.default.join(e.logsDir,cK),q0=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},K0=e=>{if(!Rt.default.existsSync(e))return;let t=Rt.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-uK,n=t.filter(s=>{let i=q0(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-dK);Rt.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},J0=(e,t)=>{let r=qA(e);Rt.default.mkdirSync(VA.default.dirname(r),{recursive:!0}),Rt.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),K0(r)},pK=e=>e.parsed===null?{_empty:!0}:Ia(e.parsed),Cp=(e,t,r)=>{let o=F0(r);J0(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:pK(o)})},zo=(e,t)=>{J0(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Ia({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},kp=(e,t=80)=>{let r=qA(e);if(K0(r),!Rt.default.existsSync(r))return[];let o=Rt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=q0(s);i!==null&&n.push(i)}return n.reverse()},KA=e=>{let t=qA(e);Rt.default.existsSync(t)&&Rt.default.writeFileSync(t,"","utf8")}});var zr,X0,mK,JA,Rp,Z0=l(()=>{"use strict";zr=m(require("node:fs")),X0=m(require("node:path")),mK=256e3,JA=e=>{zr.default.mkdirSync(X0.default.dirname(e),{recursive:!0}),zr.default.writeFileSync(e,"","utf8")},Rp=(e,t=mK)=>{if(!zr.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=zr.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=zr.default.openSync(e,"r");try{zr.default.readSync(a,i,0,s,n)}finally{zr.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var Oa=l(()=>{"use strict";$0();Y0();Z0()});var YA,XA,Q0=l(()=>{"use strict";YA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),XA=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${YA(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${YA(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${YA(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var eT=l(()=>{"use strict";Q0()});var ZA,QA=l(()=>{"use strict";ZA=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var eb=l(()=>{"use strict";ba()});var tb,rb,tT=l(()=>{"use strict";eb();tb=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},rb=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var rT=l(()=>{"use strict";QA();tT()});var oT,Ma,ob,Na=l(()=>{"use strict";QA();oT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ma=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=oT(e),r=oT(ZA(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},ob=`(function () {
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
})();`});var Do,gK,nb,nT=l(()=>{"use strict";Do=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gK=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},nb=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Do(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Do(r.direction):Do(r.kind),i=`trace-body-${o}`,a=Do(gK(r.body));return`<tr>
        <td title="${Do(r.at)}">${Do(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${Do(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var iT,sT,sb,aT=l(()=>{"use strict";iT=m(require("node:path"));V();Kt();sT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sb=e=>{let t=ne(e.installDir),o=`AW_HOME="$HOME/${iT.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Live</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Console cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${sT(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${sT(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var lT=l(()=>{"use strict";Na();nT();aT();Na()});var fK,er,ja=l(()=>{"use strict";fK=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),er=fK});var cT,dT,uT,pT,mT,gT,fT,ts=l(()=>{"use strict";cT="projects",dT="knowledge",uT="chunks.ndjson",pT="lessons.ndjson",mT="error-chunks.ndjson",gT="usage-stats.json",fT="knowledge-location.json"});var xp,hK,Tp,ib=l(()=>{"use strict";xp=m(require("node:path"));ts();hK=(e,t)=>{let r=t.trim(),o=xp.default.join(e.installDir,cT,r,dT);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:xp.default.join(o,uT),memoryRunsFilePath:xp.default.join(o,pT)}},Tp=hK});var ab,yK,hT,yT=l(()=>{"use strict";ab=m(require("node:fs"));ts();Lo();yK=e=>{let t=tt(e.projectFolderPath),r=`${t.metaDirPath}/${fT}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};ab.default.mkdirSync(t.metaDirPath,{recursive:!0}),ab.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},hT=yK});var rs,AT,ST,SK,bT,PT=l(()=>{"use strict";rs=m(require("node:fs")),AT=m(require("node:path"));po();Lo();ib();yT();ST=(e,t)=>{rs.default.existsSync(e)&&(rs.default.existsSync(t)&&rs.default.statSync(t).size>0||(rs.default.mkdirSync(AT.default.dirname(t),{recursive:!0}),rs.default.copyFileSync(e,t)))},SK=e=>{let t=tt(e.projectFolderPath),r=Tp(e.layout,e.projectId),o=`${t.memoryDirPath}/${wn}`;ST(t.ragChunksFilePath,r.ragChunksFilePath),ST(o,r.memoryRunsFilePath),hT({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},bT=SK});var lb,AK,wT,vT=l(()=>{"use strict";lb=m(require("node:fs"));Lo();AK=e=>{let t=tt(e);if(!lb.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(lb.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},wT=AK});var _T,bK,os,Ip=l(()=>{"use strict";_T=m(require("node:path"));po();Lo();PT();vT();ib();bK=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=wT(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){bT({layout:e.layout,projectFolderPath:t,projectId:o});let s=Tp(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=tt(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:_T.default.join(n.memoryDirPath,wn),projectId:null}},os=bK});var Op,wK,Mp,cb=l(()=>{"use strict";Op=m(require("node:fs"));ts();wK=(e,t=500)=>{if(!Op.default.existsSync(e))return;let r=Op.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Op.default.writeFileSync(e,`${o.join(`
`)}
`)},Mp=wK});var Np,vK,$o,db=l(()=>{"use strict";Np=m(require("node:path"));ts();Ip();vK=e=>{let t=os(e);if(t===null)return null;let r=Np.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Np.default.join(r,gT),errorChunksFilePath:Np.default.join(r,mT)}},$o=vK});var LT,za,ET,WT,ub,CT,LK,pb,kT,mb,gb,fb,hb=l(()=>{"use strict";LT=require("node:crypto"),za=m(require("node:fs")),ET=m(require("node:path"));ja();ts();db();WT=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),ub=e=>{if(!za.default.existsSync(e))return WT();try{let t=JSON.parse(za.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return WT()},CT=(e,t)=>{za.default.mkdirSync(ET.default.dirname(e),{recursive:!0}),za.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},LK=e=>{let t=er(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,LT.createHash)("sha256").update(o).digest("hex").slice(0,16)},pb=e=>{let t=$o(e);return t===null?null:ub(t.usageStatsFilePath)},kT=e=>{if(e.chunkIds.length===0)return;let t=$o(e);if(t===null)return;let r=ub(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;CT(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},mb=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=$o(e);if(r===null)return null;let o=LK(t),n=ub(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return CT(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},gb=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,fb=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var Da,RT,EK,CK,xT,kK,yb,$a,ns,Sb,ss,Ab,bb=l(()=>{"use strict";Da=m(require("node:fs")),RT=m(require("node:path"));ja();Ip();cb();hb();EK="http://127.0.0.1:11434",CK="nomic-embed-text",xT=(e,t,r)=>os({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,kK=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},yb=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},$a=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||EK,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||CK;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},ns=(e,t,r)=>{let o=xT(e,t,r);if(o===null||!Da.default.existsSync(o))return[];let n=Da.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},Sb=async e=>{let t=er(e.text),r=yb(t);if(r.length===0)return 0;let o=xT(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;Da.default.mkdirSync(RT.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await $a(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};Da.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return Mp(o),n},ss=async e=>{let t=await $a(e.query);if(t===null)return[];let r=e.minScore??0,s=ns(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:kK(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return kT({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},Ab=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Ha,TT,RK,xK,Pb,wb,vb,IT=l(()=>{"use strict";Ha=m(require("node:fs")),TT=m(require("node:path"));ja();db();cb();bb();RK=e=>{if(!Ha.default.existsSync(e))return[];let t=Ha.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},xK=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},Pb=async e=>{let t=$o(e);if(t===null)return 0;let r=er(e.text),o=yb(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;Ha.default.mkdirSync(TT.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await $a(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};Ha.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Mp(n,200),s},wb=async e=>{let t=$o(e);if(t===null)return[];let r=await $a(e.query);if(r===null)return[];let o=e.minScore??.3;return RK(t.errorChunksFilePath).map(s=>({chunk:s,score:xK(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},vb=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var _b=l(()=>{"use strict";bb();hb();IT()});var Wb,OT=l(()=>{"use strict";Wb={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var MT=l(()=>{"use strict";OT()});var ye,Lb,Eb=l(()=>{"use strict";MT();ye=Wb,Lb=`
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
.sdlc-wizard-splits {
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}
.sdlc-wizard-split-option {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
.sdlc-node-skip { flex-shrink: 0; margin: 0; padding: 0; }
.sdlc-node-skip-btn { font-size: 0.75rem; line-height: 1.2; padding: 0.2rem 0.55rem; min-height: 0; }
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
`.trim()});var TK,IK,Cb,NT,kb,jT=l(()=>{"use strict";Eb();Na();TK=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,IK=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],Cb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),NT=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${TK}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,kb=e=>{let t=IK.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=Cb(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=Cb(e.installBundleVersionLabel?.trim()??"unknown"),s=NT("brand brand-in-sidebar",n),i=NT("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${Cb(e.title)} \xB7 Agent Witch Local</title>
  <style>${Lb}</style>
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
  <script>${ob}</script>
</body>
</html>`}});var jp,Fa,zp=l(()=>{"use strict";jp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Fa=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${jp(e.syncMessage)}</p>`:"",o=jp(e.manageHref),n=jp(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${jp(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var Rb,xb,Tb,zT=l(()=>{"use strict";Rb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,xb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,Tb=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var DT=l(()=>{"use strict";jT();zp();zT()});var is,Ib,$T=l(()=>{"use strict";Na();is=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ib=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${is(e.wakeError)}</div>`:"",a=Ma(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${is(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${is(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${is(o)}</p>
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
        <p class="home-card-meta">${is(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${is(n)}</p>
      </a>
    </div>`}});var HT=l(()=>{"use strict";$T()});var Dp,$p,Hp,FT,Ob=l(()=>{"use strict";Dp="support-reply",$p="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",Hp=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),FT=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Fp,UT,BT=l(()=>{"use strict";Ob();Fp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UT=()=>`<section class="card">
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
      <p>${Fp($p)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Fp(Hp)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Fp(FT)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Fp(Dp)}">Run this sample</a>
      </div>
    </section>`});var k,as=l(()=>{"use strict";k=e=>e==="passed"||e==="stopped"||e==="failed"});var GT,Mb,Ho,Nb,Ua=l(()=>{"use strict";GT="Stopped at the round limit. The best prompt is kept.",Mb="Stopped because the score stopped rising. The best prompt is kept.",Ho="Finished. The best prompt is the result.",Nb="Wizard ended. Progress from finished steps is kept."});var Dr,jb=l(()=>{"use strict";Dr=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var OK,MK,Ba,VT,Up=l(()=>{"use strict";OK=/\n+|;\s+/,MK=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,Ba=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(OK).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,MK(s)]},[]);return[...t,...o]},[]),VT=e=>{let t=Ba(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var se,ls=l(()=>{"use strict";se=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Ga,zb=l(()=>{"use strict";Up();ls();Ga=e=>{let t=[...e.priorRounds,e.current],r=se(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:VT(o)}}});var Db,NK,jK,Bp,$b=l(()=>{"use strict";Db={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},NK=e=>{try{let t=JSON.parse(e.fragment);return{...Db,objects:[...e.objects,t]}}catch{return{...Db,objects:e.objects}}},jK=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:NK(r)},Bp=e=>[...e].reduce(jK,Db).objects});var zK,Hb,DK,qT,Fb=l(()=>{"use strict";$b();zK=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},Hb=e=>{let t=Bp(e).filter(zK),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},DK=(e,t)=>({...e,passed:e.score>=t}),qT=(e,t)=>{let r=Hb(e);return r===null?null:DK(r,t)}});var Ub,Bb,Gp=l(()=>{"use strict";Ub="The judge reply needs a score and a reason.",Bb="The improver reply was empty."});var KT,JT=l(()=>{"use strict";KT=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var YT,XT=l(()=>{"use strict";YT=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var HK,ZT,QT=l(()=>{"use strict";JT();XT();Ua();Up();HK=e=>{let t=Ba(e);return t.length===0?Mb:`${Mb} Avoid: ${t.join("; ")}.`},ZT=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:GT};if(KT(e.scores)>=3){let t=e.scores.map((r,o)=>({score:r,reasons:e.reasons?.[o]??""}));return{type:"stopped",errorMessage:HK(YT(t))}}return null}});var $r,FK,Va,eI,Vp=l(()=>{"use strict";$r=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},FK=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,Va=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",FK(e.tokens),`Delay: ${$r(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},eI=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var UK,tI,rI=l(()=>{"use strict";Fb();UK=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,tI=e=>{let r=(UK.exec(e)?.[1]??e).trim();return r.length===0||Hb(r)!==null?null:r}});var oI,qp,nI=l(()=>{"use strict";Vp();rI();Gp();oI=e=>({type:"call",role:"judge",choice:e.choice,prompt:eI({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),qp=e=>{let t=tI(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:Bb}}:{nextPrompt:t,continuation:oI({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var Gb,sI=l(()=>{"use strict";jb();zb();Fb();Gp();Ua();QT();Gp();nI();Gb=e=>{let t=qT(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:Ub}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=ZT({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=Ga({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:Dr({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var qa,Vb=l(()=>{"use strict";qa=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var iI=l(()=>{"use strict"});var aI=l(()=>{"use strict"});var BK,lI,cI=l(()=>{"use strict";BK=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},lI=e=>[...e].reduce(BK,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var GK,dI,uI=l(()=>{"use strict";GK=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},dI=e=>[...e].reduce(GK,{out:"",inString:!1,escaped:!1}).out});var VK,qK,pI,mI=l(()=>{"use strict";cI();uI();VK=e=>e.charCodeAt(0)===65279?e.slice(1):e,qK=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},pI=e=>dI(lI(qK(VK(e))))});var KK,JK,YK,gI,XK,Ka,Kp=l(()=>{"use strict";$b();mI();KK=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},JK=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},YK=e=>[...e].reduce(JK,{out:"",inString:!1,escaped:!1}).out,gI=e=>{let t=Bp(e);return t.length===0?null:t[t.length-1]},XK=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Ka=e=>{let t=pI(KK(e)),r=gI(t);if(r!==null)return r;let o=YK(t),n=gI(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw XK(i)}}});var fI=l(()=>{"use strict";Ua();Kp()});var hI=l(()=>{"use strict"});var yI=l(()=>{"use strict";hI()});var Ja,SI=l(()=>{"use strict";Ja=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var ZK,Kb,AI=l(()=>{"use strict";Vp();ZK=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,Kb=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",ZK(e.tokens),`Delay: ${$r(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var QK,e8,t8,Jb,bI=l(()=>{"use strict";QK=/[A-Za-z0-9_./~-]{3,180}/g,e8=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,t8=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||e8.test(t)},Jb=(e,t=12)=>{let r=[];for(let o of e.matchAll(QK)){let n=o[0].replace(/\.+$/,"");if(!(!t8(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var Ya,PI=l(()=>{"use strict";Ya=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var Jp,Yb,wI,Xa,Xb=l(()=>{"use strict";Jp=e=>Math.floor(e/2),Yb=e=>Math.max(Jp(e)+1,e-20),wI=(e,t)=>e>=t?"passes":e>=Yb(t)?"close":e>=Jp(t)?"weak":"bad",Xa=e=>[{band:"bad",label:`0\u2013${Jp(e)-1} bad`},{band:"weak",label:`${Jp(e)}\u2013${Yb(e)-1} weak`},{band:"close",label:`${Yb(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var Yp,Zb=l(()=>{"use strict";Xb();Yp=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${wI(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var At,Qb=l(()=>{"use strict";At=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var vI,_I=l(()=>{"use strict";vI=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var r8,o8,WI,LI=l(()=>{"use strict";as();Zb();Qb();_I();r8=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],o8=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",WI=e=>{let t=e.wizard;if(t===void 0)return[];let r=At(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=r8.map((h,y)=>{let u=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:h,state:u,detail:null}}).filter((h,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=Yp(e),d=c.filter(h=>h.id==="round-0"),p=vI(t)&&(!n||a)?c.filter(h=>h.id!=="round-0"):[],g=k(e.status)&&!s,A=g?[{id:"end",label:o8(e),state:"done",detail:e.errorMessage}]:[];if(g&&A.length>0){let h=Math.min(r,i.length),y=i.slice(0,h).map(u=>({...u,state:"done"}));return[...d,...y,...A,...p]}return[...d,...i,...p,...A]}});var n8,eP,EI=l(()=>{"use strict";as();Zb();LI();n8=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",eP=e=>{if(e.wizard!==void 0)return WI(e);let t=Yp(e),r=k(e.status)?[{id:"end",label:n8(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var Za,CI=l(()=>{"use strict";Za=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var kI=l(()=>{"use strict";Kt()});var RI,Qa,el,ds,Xp,tP,xI=l(()=>{"use strict";kI();RI="/prompt-optimizer/agent",Qa=`${qt}${RI}`,el=`${qt}/prompt-optimizer`,ds="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",Xp=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${ds}`,tP="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var tr=l(()=>{"use strict"});var ue,Zp=l(()=>{"use strict";tr();ue=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var rP,TI=l(()=>{"use strict";rP="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var II,OI=l(()=>{"use strict";II=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var tl,NI=l(()=>{"use strict";OI();tr();tl=e=>({schemaVersion:4,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:II(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90})});var oP,jI=l(()=>{"use strict";tr();oP=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null}))})});var nP,zI=l(()=>{"use strict";tr();nP=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var DI,sP,$I=l(()=>{"use strict";DI=["generalize","evaluate","separate","optimize_modules"],sP=(e,t)=>{let r=DI.indexOf(t);if(r===-1)return e;let o=DI.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var Qp,iP=l(()=>{"use strict";Up();Qp=e=>{let t=Ba(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var rl,HI=l(()=>{"use strict";iP();rl=e=>{let t=Qp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var i8,a8,l8,FI,UI=l(()=>{"use strict";i8=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),a8=/^\{\{[a-zA-Z0-9_-]+\}\}$/,l8=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(i8(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},FI=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>a8.test(n)?n:l8(n,r)).join("")}});var aP,BI=l(()=>{"use strict";UI();aP=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:FI(o.prompt,t)}))}))});var c8,ol,GI=l(()=>{"use strict";tr();iP();c8=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),ol=e=>{let t=Qp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=c8(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var nl,VI=l(()=>{"use strict";Vb();nl=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return qa({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var sl,cP=l(()=>{"use strict";ls();sl=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var dP,qI=l(()=>{"use strict";cP();dP=e=>{let t=sl({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Fo,KI=l(()=>{"use strict";Fo=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var d8,u8,pe,uP=l(()=>{"use strict";Zp();d8=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},u8=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,pe=e=>{let t=ue(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:d8(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>u8(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var pP,JI=l(()=>{"use strict";Zp();uP();pP=e=>{let t=pe(e.wizard),r=ue(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var mP,YI=l(()=>{"use strict";mP=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var bt,p8,gP,XI=l(()=>{"use strict";bt=m(ti());Kp();p8=(0,bt.isType)({name:bt.isNonEmptyString,description:bt.isString,sampleValue:bt.isString}),gP=e=>{let t=Ka(e);if(!(0,bt.isType)({templatedPrompt:bt.isNonEmptyString,variables:(0,bt.isArrayWithEachItem)(p8)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var ie,m8,g8,fP,ZI=l(()=>{"use strict";ie=m(ti());tr();Kp();m8=(0,ie.isType)({id:ie.isNonEmptyString,title:ie.isNonEmptyString,prompt:ie.isNonEmptyString,order:ie.isNumber}),g8=(0,ie.isType)({id:ie.isNonEmptyString,title:ie.isNonEmptyString,summary:ie.isString,topology:(0,ie.isOneOf)("chain","parallel"),modules:(0,ie.isArrayWithEachItem)(m8),recommended:ie.isBoolean}),fP=e=>{let t=Ka(e);if(!(0,ie.isType)({options:(0,ie.isArrayWithEachItem)(g8)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var us,QI=l(()=>{"use strict";us=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var f8,il,hP=l(()=>{"use strict";f8=/\{\{([a-zA-Z0-9_-]+)\}\}/g,il=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(f8,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var rr,or,eO=l(()=>{"use strict";ls();hP();rr=e=>il(e.templatedPrompt,e.variables),or=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return se(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??rr(e.wizard)}});var h8,Uo,tO=l(()=>{"use strict";h8=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Uo=(e,t)=>e.replace(h8,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var y8,Bo,em=l(()=>{"use strict";y8=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Bo=e=>{let t=new Set,r=[];for(let o of e.matchAll(y8)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var al,rO=l(()=>{"use strict";em();al=e=>e.variables.length>0||Bo(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var yP,SP=l(()=>{"use strict";tr();yP=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var ll,oO=l(()=>{"use strict";ls();SP();ll=e=>{let t=e.wizard.evaluateSelectedRound??se(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:yP(r.judgement,e.passScore)}});var cl,nO=l(()=>{"use strict";cl=e=>e.length===1&&e[0].modules.length===1});var AP,sO=l(()=>{"use strict";AP=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Se,tm,dl=l(()=>{"use strict";Se=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),tm=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var iO,aO=l(()=>{"use strict";dl();iO=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Se("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Se("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Se("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var lO,cO=l(()=>{"use strict";as();dl();lO=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!k(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Se("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),Se("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Se("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",tm(e.writerLabel,e.folder)),Se("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Se("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var dO,uO=l(()=>{"use strict";dl();dO=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Se("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Se("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Se("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var pO,mO=l(()=>{"use strict";dl();pO=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Se("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Se("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",tm(e.writerLabel,e.folder)),...r?[Se("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var rm,gO=l(()=>{"use strict";as();aO();cO();uO();mO();rm=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(k(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return lO(r);case"evaluate":return iO({...r,currentRound:e.currentRound});case"separate":return pO(r);case"optimize_modules":return dO({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var ul,sr,fO=l(()=>{"use strict";ul=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),sr=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var S8,om,bP,hO=l(()=>{"use strict";em();S8="wizardParam_",om=e=>`${S8}${e}`,bP=e=>{let t=Bo(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=om(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var Go,yO=l(()=>{"use strict";Go=["generalize","evaluate","separate","optimize_modules"]});var R=l(()=>{"use strict";as();Ua();sI();jb();Vp();Vb();iI();aI();fI();yI();SI();AI();bI();zb();PI();ls();EI();Qb();Xb();CI();xI();tr();Zp();TI();NI();jI();zI();$I();HI();BI();GI();VI();cP();qI();KI();uP();JI();YI();XI();ZI();QI();eO();hP();tO();em();rO();oO();nO();SP();sO();gO();fO();hO();yO()});var PP,sm,A8,AO,bO=l(()=>{"use strict";PP=m(require("node:fs")),sm=m(require("node:path")),A8=e=>sm.default.join(sm.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),AO=(e,t)=>{let r=A8(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;PP.default.mkdirSync(sm.default.dirname(r),{recursive:!0}),PP.default.appendFileSync(r,o,"utf8")}});var ps,PO,b8,wO,P8,vO,xt,K,_O,H,Je=l(()=>{"use strict";ps=m(require("node:fs")),PO=m(require("node:path"));R();bO();b8=e=>e.wizard===void 0?e:{...e,wizard:oP(e.wizard)},wO=new Set,P8=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),vO=(e,t)=>{ps.default.mkdirSync(PO.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;ps.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),ps.default.renameSync(r,e)},xt=e=>{if(!ps.default.existsSync(e))return[];try{let t=JSON.parse(ps.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(P8).map(b8):[]}catch{return[]}},K=(e,t)=>xt(e).find(r=>r.id===t)??null,_O=(e,t)=>{wO.add(t);let r=xt(e).filter(o=>o.id!==t);vO(e,r)},H=(e,t)=>{if(wO.has(t.id))return;let r=xt(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];vO(e,o),AO(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var WO,im,wP,qo,vP,Ye,Ko,me,Xe=l(()=>{"use strict";WO=m(require("node:fs")),im=m(require("node:os")),wP=m(require("node:path"));ht();qo="~",vP=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Ye=e=>{let t=im.default.homedir(),r=vP(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Ko=e=>{let t=e.trim().length===0?"~":e.trim(),r=et(t),o=wP.default.isAbsolute(r)?vP(r):vP(wP.default.resolve(im.default.homedir(),r));try{if(!WO.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:Ye(o)}},me=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:im.default.homedir()});var pl=l(()=>{"use strict";mt();xa();nu()});var w8,LO,EO=l(()=>{"use strict";pl();w8=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,LO=e=>{let t=On(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(w8)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var v8,_8,CO,am,kO,W8,rt,RO,xO,TO,Hr=l(()=>{"use strict";pl();EO();v8="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",_8="The writer waited on terminal input and did not return a prompt.",CO=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,am=e=>{let t=e.trim();if(t.length===0||t.length>=500||!CO.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>CO.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},kO=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},W8=e=>am(e.stdout)??am(e.stderr)??(kO(e.replyFile)?am(e.replyFile):null),rt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return v8;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?_8:null},RO=e=>{let t=e.trim();return t.length===0?null:rt(t)!==null?t:am(t)??(kO(t)?t:null)},xO=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],TO=e=>{let t=e.replyFileText?.trim()??"",r=rt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=W8({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null)return{ok:!1,errorMessage:o};let n=LO([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=On(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply."}}});var ms,Tt,ml,IO,lm,L8,OO,MO,NO,_P=l(()=>{"use strict";ms=m(require("node:fs")),Tt=m(require("node:path")),ml=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},IO=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),lm=(e,t)=>{let r=ml(e);return r.length>0?r:ml(t)},L8=e=>{let t=lm(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${IO(o)}`,...n.length>0?[`description: ${IO(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},OO=e=>`.cursor/skills/${e}/SKILL.md`,MO=(e,t)=>{let r=ml(t);if(r.length===0)return!1;let o=Tt.default.resolve(e),n=Tt.default.resolve(o,".cursor","skills"),s=Tt.default.resolve(o,OO(r));return s.startsWith(`${n}${Tt.default.sep}`)?ms.default.existsSync(s):!1},NO=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(lm(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Tt.default.resolve(e.workingDirectory);try{if(!ms.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=L8({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=OO(r.slug),n=Tt.default.resolve(t,".cursor","skills"),s=Tt.default.resolve(t,o);if(!s.startsWith(`${n}${Tt.default.sep}`))return{ok:!1,errorCode:"path"};if(ms.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{ms.default.mkdirSync(Tt.default.dirname(s),{recursive:!0}),ms.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var E8,jO,zO,DO=l(()=>{"use strict";R();R();Je();Xe();Hr();_P();E8=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,jO=e=>{let t=e.get("savedSkill");return t!==null&&E8.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},zO=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=K(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!k(r.status))return{kind:"redirect",location:o("skillError=working")};let n=se(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||rt(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=NO({workingDirectory:me(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var Fr,gl=l(()=>{"use strict";R();Fr=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=AP(t);return{...e,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:ul(r.variables)},updatedAt:new Date().toISOString()}}});var Ur,fl=l(()=>{"use strict";Ur=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var T,C8,cm,re,Jo,HO,$O,FO,UO,xe=l(()=>{"use strict";T="manual",C8=["claude-cli","codex","cursor","antigravity"],cm={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},re=e=>e===T?"You":e in cm?cm[e]:e,Jo=e=>C8.filter(t=>e.includes(t)),HO=e=>{let t=Jo(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},$O=(e,t)=>t===T?T:e.find(r=>r===t)??null,FO=(e,t,r)=>{let o=Jo(e),n=$O(o,t),s=$O(o,r);return n===null||s===null?null:{judge:n,improver:s}},UO=(e,t,r)=>{let o=Jo(e);return t===null||t.trim()===""?r!==T?r:o[0]??null:t===T?null:o.find(n=>n===t)??null}});var WP,BO,GO=l(()=>{"use strict";WP={ok:!1,errorMessage:"Stopped.",stopped:!0},BO=(e,t,r)=>{if(t===void 0)return;let o=()=>{e.kill("SIGTERM"),r(WP)};if(t.aborted){o();return}t.addEventListener("abort",o,{once:!0})}});var VO,hl,qO,LP,k8,R8,x8,ot,yl=l(()=>{"use strict";VO=require("node:child_process"),hl=m(require("node:fs")),qO=m(require("node:os")),LP=m(require("node:path"));pl();GO();Hr();k8=["claude-cli","codex","cursor","antigravity"],R8=18e4,x8=e=>k8.includes(e),ot=e=>new Promise(t=>{if(e.signal?.aborted){t(WP);return}if(!x8(e.writerAgent)){t({ok:!1,errorMessage:"The writer did not reply."});return}let r=e.writerAgent,o=Et(r,e.prompt,ce({}));if(o===null){t({ok:!1,errorMessage:"The writer did not reply."});return}if(!hl.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=LP.default.join(hl.default.mkdtempSync(LP.default.join(qO.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),s=xO({writerAgent:r,baseArgs:o.args,replyPath:n}),i=[],a=[],c={settled:!1,timer:void 0},d=(0,VO.spawn)(o.command,[...s],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),p=g=>{c.settled||(c.settled=!0,clearTimeout(c.timer),t(g))};BO(d,e.signal,p),c.timer=setTimeout(()=>{d.kill("SIGTERM"),p({ok:!1,errorMessage:"The writer did not reply."})},e.timeoutMs??R8),d.stdout.on("data",g=>{i.push(Buffer.from(g))}),d.stderr.on("data",g=>{a.push(Buffer.from(g))}),d.on("error",()=>p({ok:!1,errorMessage:"The writer did not reply."})),d.on("close",()=>{let g=hl.default.existsSync(n)?hl.default.readFileSync(n,"utf8"):null;p(TO({writerAgent:r,stdout:Buffer.concat(i).toString("utf8"),stderr:Buffer.concat(a).toString("utf8"),replyFileText:g}))})})});var KO,T8,Sl,dm,um=l(()=>{"use strict";R();xe();KO=e=>e===T?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},T8=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Sl=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=Gb({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:KO(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:Ya(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=T8(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i}},dm=(e,t,r=null)=>{let o=qp({raw:t,judge:KO(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var pm,EP=l(()=>{"use strict";pm=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var XO,mm,gm,JO,YO,CP,I8,ZO,kP,O8,QO,M8,N8,eM,tM=l(()=>{"use strict";XO=require("node:child_process"),mm=m(require("node:fs")),gm=m(require("node:path"));R();JO=4e3,YO=12e3,CP=(e,t)=>{let r=(0,XO.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},I8=e=>CP(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",ZO=e=>{let t=CP(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},kP=(e,t)=>{let r=gm.default.resolve(e,t),o=gm.default.relative(e,r);if(o.startsWith("..")||gm.default.isAbsolute(o)||!mm.default.existsSync(r)||!mm.default.statSync(r).isFile())return null;let n=mm.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>JO?`${n.slice(0,JO)}
\u2026truncated`:n},O8=e=>e.length>YO?`${e.slice(0,YO)}
\u2026truncated`:e,QO=e=>{let t=Jb(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,kP(e.workingDirectory,n)])),o=I8(e.workingDirectory);return{git:o,status:o?ZO(e.workingDirectory):{},files:r,paths:t}},M8=(e,t)=>{let r=CP(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=kP(e,t);return o===null?`${t} is missing.`:o},N8=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",eM=e=>{let t=e.before.git?ZO(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=kP(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>M8(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:N8(e.before.git,e.before.paths.length>0),evidence:O8(i.join(`

`))}}});var TP,U,IP,_e,rM,j8,z8,oM,gs,nM,fs,D8,$8,Al,RP,xP,H8,sM,F8,U8,B8,iM,G8,aM,lM,V8,q8,cM,dM=l(()=>{"use strict";TP=require("node:child_process"),U=m(require("node:fs")),IP=m(require("node:os")),_e=m(require("node:path")),rM=8e6,j8=16e6,z8=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],oM=(e,t)=>{let r=(0,TP.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},gs=(e,t)=>(0,TP.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,nM=e=>{let t=oM(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},fs=(e,t)=>{let r=_e.default.resolve(e,t),o=_e.default.relative(e,r);return o.startsWith("..")||_e.default.isAbsolute(o)?null:r},D8=(e,t)=>{let r=fs(e,t);if(r===null||!U.default.existsSync(r))return null;let o=U.default.statSync(r);return!o.isFile()||o.size>rM?null:U.default.readFileSync(r)},$8=(e,t,r)=>{let o=fs(e,t);o!==null&&(U.default.mkdirSync(_e.default.dirname(o),{recursive:!0}),U.default.writeFileSync(o,r))},Al=(e,t)=>{let r=fs(e,t);r===null||!U.default.existsSync(r)||U.default.rmSync(r,{recursive:!0,force:!0})},RP=(e,t)=>gs(e,["cat-file","-e",`HEAD:${t}`]),xP=e=>{let t=oM(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},H8=e=>_e.default.resolve(e)!==_e.default.resolve(IP.default.homedir()),sM=e=>{if(!U.default.existsSync(e))return 0;let t=U.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?U.default.readdirSync(e).reduce((r,o)=>r+sM(_e.default.join(e,o)),0):0},F8=(e,t,r)=>{let o=fs(e,r);if(o===null||!U.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(sM(o)>j8)return{relativePath:r,existed:!0,copyDir:null};let n=_e.default.join(t,"cache",r);return U.default.mkdirSync(_e.default.dirname(n),{recursive:!0}),U.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},U8=400,B8=32e6,iM=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!U.default.existsSync(s)))for(let i of U.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=_e.default.join(s,i),c=U.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>rM)){if(t.length>=U8||r+c.size>B8){o=!1;return}r+=c.size,t.push(_e.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},G8=(e,t,r)=>{let o=fs(e,r);if(o===null||!U.default.existsSync(o))return null;let n=D8(e,r);if(n===null)return"skip";let s=_e.default.join(t,"files",r);return U.default.mkdirSync(_e.default.dirname(s),{recursive:!0}),U.default.writeFileSync(s,n),s},aM=e=>{let t=U.default.mkdtempSync(_e.default.join(IP.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?nM(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:iM(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,G8(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?xP(e.workingDirectory):null,isolateCaches:H8(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:z8.map(i=>F8(e.workingDirectory,t,i))}},lM=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Al(e.workingDirectory,t);return}$8(e.workingDirectory,t,U.default.readFileSync(r))}},V8=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?lM(e,t):RP(e.workingDirectory,t)?gs(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Al(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&RP(e.workingDirectory,t)&&gs(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!RP(e.workingDirectory,t)&&gs(e.workingDirectory,["reset","-q","HEAD","--",t])},q8=(e,t)=>{let r=fs(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Al(e.workingDirectory,t.relativePath),U.default.mkdirSync(_e.default.dirname(r),{recursive:!0}),U.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Al(e.workingDirectory,t.relativePath);return}if(U.default.existsSync(r))for(let o of U.default.readdirSync(r)){let n=_e.default.join(r,o);U.default.statSync(n).mtimeMs>=e.startedMs-1e3&&U.default.rmSync(n,{recursive:!0,force:!0})}}}},cM=e=>{try{if(e.git){if(xP(e.workingDirectory)!==e.head&&(!(e.head===null?gs(e.workingDirectory,["update-ref","-d","HEAD"]):gs(e.workingDirectory,["reset","--hard",e.head]))||xP(e.workingDirectory)!==e.head))throw new Error("head");let r=nM(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))V8(e,o)}else{if(e.complete)for(let t of iM(e.workingDirectory).paths)e.files[t]===void 0&&Al(e.workingDirectory,t);for(let t of Object.keys(e.files))lM(e,t)}for(let t of e.caches)q8(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{U.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var fm,hm,K8,J8,Y8,X8,Z8,uM,Q8,pM,mM=l(()=>{"use strict";R();um();EP();tM();dM();xe();Xe();yl();fm=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),hm=e=>({...e,status:"stopped",errorMessage:Ho,judgePhase:void 0,updatedAt:new Date().toISOString()}),K8=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),J8=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==T?t:e.improverModel!==T?e.improverModel:null}return e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null},Y8=async e=>{let t=me(e.cycle),r=QO({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=aM({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?nl({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Fo(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):qa({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=await ot({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal}),a=i.ok?eM({workingDirectory:t,before:r,writerReply:i.text}):null,c=cM(o);return i.ok?!c.ok||a===null?{ok:!1,cycle:fm(e.cycle,c.ok?"Could not put the folder back after the run.":c.errorMessage)}:{ok:!0,run:{output:i.text.trim(),tokens:i.tokens,delayMs:Date.now()-n,lookedAt:a.lookedAt,evidence:a.evidence}}:i.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:hm(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:fm(e.cycle,i.errorMessage)})},X8=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:Y8({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),Z8=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),uM=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await ot({writerAgent:e.reviewer,workingDirectory:me(e.cycle),prompt:Kb({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:hm(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},Q8=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===T)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await ot({writerAgent:t.judgeModel,workingDirectory:me(t),prompt:Ja({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Sl(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?hm(o):(e.onWriterFailure?.(t.judgeModel),fm(o,n.errorMessage))},pM=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return Q8(e);let o=J8(t),n=await X8({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?K8(t,n.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===T){let p=await uM({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...Z8(s,p.text),judgePhase:void 0}}let i=await ot({writerAgent:t.judgeModel,workingDirectory:me(t),prompt:Va({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?hm(s):(e.onWriterFailure?.(t.judgeModel),fm(s,i.errorMessage));let a=await uM({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Sl(s,i.text,c);return pm(d,a.text)}});var Yo,ym=l(()=>{"use strict";R();Yo=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Ga({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:Ya(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var Sm,e4,t4,OP,gM=l(()=>{"use strict";R();um();mM();ym();xe();Xe();yl();Sm=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),e4=e=>({...e,status:"stopped",errorMessage:Ho,updatedAt:new Date().toISOString()}),t4=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?e4(e):(n?.(r),Sm(e,t.errorMessage)),OP=async(e,t,r,o)=>{let n=e.revisions.find(c=>c.roundNumber===e.currentRound);if(n===void 0)return Sm(e,"This round has no prompt.");if(e.status==="judging")return pM({cycle:e,revision:n,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return Sm(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===T)return e;let s=Yo(e);if(s===null)return Sm(e,"The improver needs the score and the reason.");let i=await ot({writerAgent:e.improverModel,workingDirectory:me(e),prompt:Dr({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r}),a=t4(e,i,e.improverModel,r,t);return a!==null?a:dm(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var bl,MP=l(()=>{"use strict";bl=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var Pm,Am,fM,r4,o4,bm,hM,yM,n4,s4,Xo,SM,AM,Pl=l(()=>{"use strict";R();gl();fl();xe();Xe();yl();gM();MP();Pm=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),Am=(e,t,r)=>e.wizard===void 0||t===null?Pm(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},fM=e=>{let t=e.wizard;return t===void 0||bl(e).length===0?e:{...e,wizard:us({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},r4=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",o4=e=>{let t=e.wizard;if(t===void 0)return e;let r=sl({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:us({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},bm=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),hM=e=>e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null,yM=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},n4=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=hM(e);if(n===null)return Pm(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??rr(o),i=rl({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:yM(e,"generalize")}),a=await ot({writerAgent:n,prompt:i,workingDirectory:me(e),signal:t});if(!a.ok)return r?.(n),Am(e,"generalize",a.errorMessage);try{let c=gP(a.text),d=us({wizard:{...o,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:ul(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return al(d)?Xo({...p,wizard:{...d,gate:null}}):bm(p,"generalize")}catch(c){return Am(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},s4=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=hM(e);if(n===null)return Pm(e,"Choose a writer to suggest splits.");let s=or({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=ol({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:yM(e,"separate")}),a=await ot({writerAgent:n,prompt:i,workingDirectory:me(e),signal:t});if(!a.ok)return r?.(n),Am(e,"separate",a.errorMessage);try{let c=fP(a.text),d=aP(c,o.variables),p=us({wizard:{...o,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),g={...e,wizard:p};return cl(d)?Fr(g,d[0]):bm(g,"separate")}catch(c){return Am(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},Xo=e=>{let t=e.wizard;if(t===void 0)return e;let r=rr(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},SM=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Pm(e,"This module is missing.");let n=sr(r),s=Uo(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==T?e.runnerModel:e.judgeModel!==T?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:ue(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},AM=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return OP(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return n4(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return s4(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await OP(e,t,r,o);if(k(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&bl(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let g=se(s.revisions.map(A=>({roundNumber:A.roundNumber,promptText:A.promptText,score:A.judgement?.score??0,reasons:A.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:g}}}if(i==="evaluate"&&ll({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let p=fM(bm(a,i));return Ur(p)}let c=bm(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=dP({wizard:{...c.wizard,modules:c.wizard.modules.map((g,A)=>A===c.wizard.currentModuleIndex&&g.status==="running"?{...g,status:"paused"}:g)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:r4(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?fM(d):o4(d)}return s}return n.phase==="complete",e}});var bM,hs,wm=l(()=>{"use strict";Hr();bM=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:RO(e.promptText)},hs=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t===void 0?null:bM(t);if(r!==null)return r.trim();for(let o=e.revisions.length-1;o>=0;o-=1){let n=bM(e.revisions[o]);if(n!==null)return n.trim()}return null}});var Br,wl=l(()=>{"use strict";Br='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var NP,PM,i4,wM,vM,jP=l(()=>{"use strict";R();xe();Xe();wl();NP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),PM=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',i4=e=>{let t=PM(e.state),r=`<h2>${NP(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${NP(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Br}</button></div><template>${r}</template></li>`},wM=e=>{let t=e.wizard;if(t===void 0)return"";let r=rm({status:e.status,wizard:t,writerLabel:re(e.judgeModel),runnerLabel:re(e.runnerModel??e.judgeModel),folderDisplay:Ye(me(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(i4).join("")}</ol>`},vM=e=>{let t=e.wizard;if(t===void 0)return"";let r=rm({status:e.status,wizard:t,writerLabel:re(e.judgeModel),runnerLabel:re(e.runnerModel??e.judgeModel),folderDisplay:Ye(me(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${PM(n.state)}<span class="sdlc-pipeline-label">${NP(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var vm,ys,zP=l(()=>{"use strict";MP();vm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ys=e=>{let t=bl(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${vm(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,p=e.cycle.revisions.map(g=>{let A=g.judgement?.score,h=A==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${A}`,y=g.judgement?.reasons?.trim()??"",u=y.length===0?"":`<br><span class="muted">${vm(y)}</span>`;if(e.interactive){let S=e.selectedRound===g.roundNumber?" checked":"";return`<li><label><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${S}> ${vm(h)}</label>${u}</li>`}return`<li>${vm(h)}${u}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var DP,_M,_m,WM,Wm=l(()=>{"use strict";DP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_M=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${DP(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${DP(t.prompt)}</pre></li>`).join("")}</ol>`,_m=e=>_M([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),WM=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${DP(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${_M(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var Z,a4,l4,c4,d4,Lm,u4,p4,m4,g4,f4,h4,Ss,Em=l(()=>{"use strict";R();jP();zP();Wm();Z=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),a4={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},l4=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Z(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Z(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Z(o)}</pre></details>`;return`<h2>${Z(e)}</h2>${n}`},c4=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=rr(t).trim(),n=or({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!k(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${l4("What is being evaluated",i)}`},d4=(e,t)=>{let r=e.wizard;if(r===void 0||k(e.status))return"";let o=a4[t];return o===void 0||r.phase!==o?"":vM(e)},Lm=(e,t,r)=>{let o=d4(e,t),n=t==="wizard-2"?c4(e):"";return`${o}${n}${r}`},u4=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},p4=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.variables.length===0?'<p class="muted">No variables yet.</p>':`<ul class="sdlc-wizard-vars">${t.variables.map(a=>`<li><strong>{{${Z(a.name)}}}</strong> \u2014 ${Z(a.description)} (sample: ${Z(a.sampleValue)})</li>`).join("")}</ul>`,o=t.templatedPrompt.trim(),n=o.length===0?'<p class="muted">No templated prompt yet.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${Z(o)}</pre>`,s=il(t.templatedPrompt,t.variables).trim(),i=s.length===0||s===o?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${Z(s)}</pre>`;return`${r}${n}${i}`},m4=(e,t)=>`<ul class="sdlc-wizard-revisions">${e.map(o=>{let n=o.score===null?`Round ${o.roundNumber} \u2014 not scored`:`Round ${o.roundNumber} \u2014 ${o.score}`,s=t===o.roundNumber?" (selected)":"",i=o.reasons?.trim()??"",a=i.length===0?"":`<br><span class="muted">${Z(i)}</span>`;return`<li>${Z(n)}${s}${a}</li>`}).join("")}</ul>`,g4=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return ys({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=u4(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${m4(o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=or({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Z(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Z(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},f4=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Z(n.title)}</strong> <span class="muted">(${Z(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Z(o.title)}</strong>${n}${Z(s)}<br><span class="muted">${Z(o.summary)} (${Z(o.topology)})</span>${_m(o)}</li>`}).join("")}</ul>`},h4=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Z(i)}</span> <strong>${Z(n.title)}</strong>${Z(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Z(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?ys({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},Ss=(e,t)=>{switch(t){case"wizard-1":return Lm(e,t,p4(e));case"wizard-2":return Lm(e,t,g4(e));case"wizard-3":return Lm(e,t,f4(e));case"wizard-4":return Lm(e,t,h4(e));default:return""}}});var y4,S4,LM,EM,CM=l(()=>{"use strict";R();wm();Hr();Em();y4=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},S4=e=>{let t=e.goal.trim();return t.length===0?null:t},LM=(e,t,r,o,n)=>{let s=rt(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},EM=(e,t)=>{let r=S4(e);if(t.id.startsWith("wizard-")){let s=Ss(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=Za(e,t);if(s!==null){let a=hs(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=se(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:LM(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:y4(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:LM(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var Zo,kM,RM=l(()=>{"use strict";Zo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kM=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${Zo(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Zo(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${Zo(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${Zo(n)}</h2><pre class="mono">${Zo(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${Zo(e.goal)}</dd></div></dl>`;return`<h2>${Zo(e.title)}</h2>${i}${t}${r}${o}${s}`}});var $P,xM,TM,As,IM,vl=l(()=>{"use strict";R();Je();$P=new Map,xM=e=>{let t=new AbortController;return $P.set(e,t),t.signal},TM=e=>{$P.delete(e)},As=e=>{$P.get(e)?.abort()},IM=(e,t)=>{let r=K(e,t);return r===null||r.wizard!==void 0?!1:(k(r.status)||(H(e,{...r,status:"stopped",errorMessage:Ho,updatedAt:new Date().toISOString()}),As(t)),!0)}});var A4,b4,HP,P4,w4,v4,OM,MM,FP=l(()=>{"use strict";R();Pl();gl();fl();vl();A4=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),b4=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||k(e.status))return null;let r=At(t);return r<0||r>3?null:`wizard-${r+1}`},HP=(e,t)=>A4.has(t)?b4(e)===t:!1,P4=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),w4=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},v4=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null,phase:"complete"},n=pe(o);return{...e,status:n.terminalStatusSuggestion,errorMessage:null,wizard:o,updatedAt:new Date().toISOString()}},OM=(e,t)=>{if(!HP(e,t))return e;As(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return Xo({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return Ur(w4(r));if(t==="wizard-3"){let n=o.splitOptions[0]??P4(o.templatedPrompt);return Fr(r,n)}return t==="wizard-4"?v4(r):e},MM="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var _4,Cm,UP=l(()=>{"use strict";_4='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Cm=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${_4}</button>`});var W4,NM,L4,BP,jM,E4,C4,k4,R4,zM,DM=l(()=>{"use strict";R();ym();W4={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},NM=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},L4=e=>W4[e]??null,BP=(e,t)=>{let r=e.wizard,o=L4(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=At(r);return o<n||o===n},jM=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},E4=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:rr(t).trim();return o.length===0?null:rl({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:NM(e,"generalize")})},C4=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=Yo(e);return n===null?null:Dr({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=jM(e)?.promptText.trim()??or({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:Ja({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},k4=e=>{let t=e.wizard;if(t===void 0)return null;let r=or({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:ol({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:NM(e,"separate")})},R4=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=sr(t),s=Uo(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=Yo(e);return c===null?null:Dr({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=jM(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||k(e.status)&&i?.judgement!==null)?Va({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):nl({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:Fo(t,r).output,moduleTitle:o.title})},zM=(e,t)=>{if(!BP(e,t))return null;switch(t){case"wizard-1":return E4(e);case"wizard-2":return C4(e);case"wizard-3":return k4(e);case"wizard-4":return R4(e);default:return null}}});var x4,km,GP=l(()=>{"use strict";R();x4=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},km=(e,t)=>{let r=e.wizard,o=x4(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=At(r);return o<n?"done":o===n&&k(e.status)&&e.status==="failed"?"failed":o<=n&&k(e.status)?"done":"pending"}});var T4,bs,Rm=l(()=>{"use strict";wl();DM();GP();T4=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bs=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(km(e,t)==="pending")return""}else if(!BP(e,t))return"";let o=zM(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Br}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${T4(o)}</pre></template>`}});var Qo,Ps,_l=l(()=>{"use strict";Qo=e=>e.toLocaleString("en-US"),Ps=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var It,I4,$M,HM,FM,UM,VP=l(()=>{"use strict";R();CM();RM();FP();UP();wl();wm();jP();Rm();_l();It=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),I4=(e,t)=>{let r=Za(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?Ps(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${Qo(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${It(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${It(r)}</span>`:"",d=kM(EM(t,e)),p=t.wizard!==void 0&&t.wizard.phase==="complete"&&k(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${It(e.id)}"`:"",g=HP(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${It(MM)}"><input type="hidden" name="cycleId" value="${It(t.id)}"><input type="hidden" name="wizardStepId" value="${It(e.id)}"><button class="btn btn-secondary sdlc-node-skip-btn" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",A=e.state==="active"&&e.id.startsWith("wizard-")?wM(t):"",h=o?"failed":e.state,y=o?hs(t):null,u=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Br}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${It(y)}</pre></template>`:"",S=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?bs(t,e.id):"";return`<li class="sdlc-node sdlc-node-${h}" data-sdlc-step-id="${It(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${p} data-sdlc-node>${n}<span class="sdlc-node-label">${It(e.label)}${c}${a}</span></button>${S}${u}${g}</div>${A}<template>${d}</template></li>`},$M=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>I4(r,t)).join("")}</ol>`,HM=e=>`<div class="sdlc-score" aria-label="What the score means">${Xa(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${It(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,FM=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${Cm({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,UM=`<script>
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
    const opener = target.closest("[data-sdlc-node]");
    if (!opener) return;
    const node = opener.closest(".sdlc-node");
    const template = readNodeTemplate(node);
    if (template === null) return;
    openFromTemplate(template, readStepId(node));
  });
})();
</script>`});var Gr,BM,O4,GM=l(()=>{"use strict";R();Xe();Hr();_P();Gr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),BM=e=>{if(!k(e.status))return"";let t=se(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=rt(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Gr(t.reasons.trim())}</p>`,i=n===null?O4({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:me(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${Gr(n)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${o}${s}${i}</section>`},O4=e=>{let t=e.sourceSkill?.fileName??ml(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=lm(t,r),s=n.length>0&&MO(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Gr(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Gr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Gr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Gr(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Gr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Gr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var VM,qM=l(()=>{"use strict";VM=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var KM,M4,xm,He,Tm,qP=l(()=>{"use strict";R();R();xe();qM();wm();Hr();KM=["Generalize","Evaluate","Separate","Optimize modules"],M4=e=>{let t=At(e),r=t>=0&&t<KM.length?KM[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},xm=(e,t)=>{let r=hs(e),o=r===null?null:VM(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},He=(e,t)=>({title:e,detail:t,replyPreview:null}),Tm=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:null}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!k(e.status)){let t=e.judgeModel;return He(`${re(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!k(e.status)){let t=e.judgeModel;return He(`${re(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===T?He(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?He(`${re(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):He(`${re(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===T){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==T?He(`${re(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):He(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return He(`${re(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ue(t);return He(`${re(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return He(`${re(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ue(t);return He(`${re(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return He(`${re(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===T){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return He("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return He(`${re(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>rt(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=pe(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||k(e.status));return{title:i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",detail:r.length>0?r:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?xm(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o="A writer or judge reply could not be used. Start a new run after fixing the issue.";return r!==void 0?xm(e,{title:M4(r),detail:t.length>0?t:o}):xm(e,{title:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(k(e.status)){let t=e.errorMessage?.trim()??"";return xm(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var Ot,Wl=l(()=>{"use strict";xe();Ot=e=>{if(e.status==="improving"&&e.improverModel===T)return!0;if(e.status!=="judging"||e.judgeModel!==T)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===T}});var JM,YM=l(()=>{"use strict";JM=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Vr,N4,XM,ZM=l(()=>{"use strict";R();Vr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),N4=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Vr(r)}</p>`},XM=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Vr(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${Vr(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Vr(a)}.</p>`}<pre class="mono">${Vr(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${$r(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Vr(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",g=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Vr(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${N4(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Vr(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Ll,j4,QM,eN=l(()=>{"use strict";R();Hr();Ll=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),j4=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=rt(t.promptText),n=t.judgement?.reasons?`<p class="muted">${Ll(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Ll(i)}.</p>`}<pre class="mono">${Ll(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${$r(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${Ll(d)}</pre>`:`<div class="alert-error">${Ll(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},QM=e=>e.revisions.map(t=>j4(e,t)).join("")});var tN,rN=l(()=>{"use strict";R();tN=e=>{if(k(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Mt,z4,KP,D4,$4,H4,F4,oN,nN,JP=l(()=>{"use strict";rN();Mt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),z4="Stop this run? Writers will stop and the best prompt is kept.",KP="End the wizard? Writers will stop and progress from finished steps is kept.",D4="Skip this module and pause at the step gate?",$4=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${Mt(z4)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Mt(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,H4=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${Mt(KP)}"><input type="hidden" name="cycleId" value="${Mt(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,F4=e=>{let t=Mt(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Mt(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${Mt(D4)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${Mt(KP)}">End wizard</button>
    </form>
  </div>`},oN=e=>{let t=tN(e);return t==="none"?"":t==="classic"?$4(e.id):t==="wizard_end_only"?H4(e.id):F4(e)},nN=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=Mt(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${Mt(KP)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var sN,iN=l(()=>{"use strict";R();_l();sN=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=pe(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${Qo(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${Qo(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${ue(r)}`}return""}});var U4,B4,aN,G4,lN,cN=l(()=>{"use strict";R();iN();GP();Em();Rm();U4=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',B4=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',aN=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),G4=(e,t,r)=>{let o=Ss(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=sN(e,t),i=km(e,t),a=U4(i),c=B4(i),d=bs(e,t,{forOutcomeSummary:!0}),p=`${a}<span class="sdlc-wizard-outcome-step-title">${aN(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${aN(s)}</span>`,g=t==="wizard-4"&&r.phase==="complete"?" open":"",A=i==="failed"&&t!=="wizard-4"?" open":"",h=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${h}"${g}${A}><summary aria-controls="${h}-body">${p}</summary><div class="sdlc-wizard-outcome-step-body" id="${h}-body">${o}</div></details>`},lN=e=>{let t=e.wizard;if(t===void 0||!k(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>G4(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var dN,uN,pN=l(()=>{"use strict";dN=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uN=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${dN(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${dN(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var YP,mN,XP=l(()=>{"use strict";YP=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,mN=(e,t)=>{if(YP(e,t))return"Passed";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var gN,fN=l(()=>{"use strict";gN=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var Im,hN,yN=l(()=>{"use strict";R();XP();XP();fN();Im=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hN=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=pe(t),o=ue(t),n=r.terminalStatusSuggestion==="passed"?"":gN(r,o),s=o-10,i=r.rows.map((c,d)=>{let p=t.modules[d],g=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,h=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=p===void 0?c.status:mN(p,o),u=p!==void 0&&YP(p,o)?'<span aria-label="Passed">\u2713</span>':Im(y);return`<tr${h}><td>${Im(c.title)}</td><td>${Im(g)}</td><td>${c.tokens??"\u2014"}</td><td>${u}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${Im(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var V4,SN,AN=l(()=>{"use strict";R();R();pN();yN();V4=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SN=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!k(e.status)||t.modules.length===0)return"";let r=hN(e),o=uN(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=pe(t),i=s.passedModuleCount<s.totalModules?" open":"";return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${V4(n)}</pre></details>`}${r}${o}</section>`}});var ir,El=l(()=>{"use strict";ir=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var ar,Om,ZP=l(()=>{"use strict";R();VP();GM();qP();Wl();YM();ym();ZM();eN();JP();cN();AN();_l();Xe();El();ar=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Om=e=>{let t=!k(e.status)&&e.status!=="wizard_paused"&&!Ot(e),r=Tm(e),o=$M(eP(JM(e)),e),n=k(e.status)?"":oN(e),s=lN(e),i=SN(e),a=BM(e),c=e.errorMessage===null?"":`<div class="alert-error">${ar(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?pe(e.wizard):null,A=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,h=!t&&e.wizard!==void 0&&k(e.status)&&(e.wizard.phase==="complete"||pe(e.wizard).passedModuleCount>0),y=h?A?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",u=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${ar(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",S=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${ar(r.replyPreview)}</pre>`,b=r.detail.length===0&&u.length===0&&S.length===0||r.detail.length===0&&S.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${ar(r.detail)}${p}</p>`}${S}</div>`,f=e.revisions.find(eo=>eo.roundNumber===e.currentRound),w=e.status==="improving"?Yo(e):null,v=Ps(e),_=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),C=Ot(e)?XM({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:w?.promptText??f?.promptText??"",score:w?.score??f?.judgement?.score??null,reasons:w?.reasons??f?.judgement?.reasons??null,avoid:w?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:_?1:0}):"",L=e.wizard!==void 0&&e.wizard.phase==="complete"&&k(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!L&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?ue(e.wizard):e.passScore,M=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${HM(I)}</div>`:"",oe=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':k(e.status)?e.status==="failed"?'<span class="sdlc-run-badge sdlc-run-badge-failed">Failed</span>':L&&g!==null&&!A?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",G=t?d:h?A?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',F=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${ar(Ye(me(e)))}</li>`:"",v>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${Qo(v)} so far</li>`:""].filter(eo=>eo.length>0),Qr=F.length===0?"":`<ul class="sdlc-run-meta">${F.join("")}</ul>`,D=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,be=L?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,$t=L?"":M.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${be}</div>`:`<div class="sdlc-run-grid">${be}${M}</div>`,qs=QM(e),S1=e.wizard!==void 0&&k(e.status)&&e.revisions.every(eo=>eo.roundNumber===0&&(eo.judgement===void 0||eo.judgement===null)),A1=qs.length===0||S1?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${qs}</div></section>`,b1=`<p class="sdlc-run-goal" title="${ar(e.goal.trim())}">${ar(ir(e.goal))}</p>`,P1=L?`${c}${i}${s}${C}${a}`:`${c}${$t}${C}${s}${a}`,w1='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',v1=L?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${ar(e.updatedAt)}" aria-busy="${t?"true":"false"}">${w1}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${oe}</div>${b1}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${G}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${ar(r.title)}</h2>${b}${u}${v1}</div></div>${Qr}${D}</header>${P1}</section>${A1}`}});var bN,PN=l(()=>{"use strict";R();fl();bN=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!ll({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:Ur(e)}});var wN,vN=l(()=>{"use strict";R();Pl();wN=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!al(t)?e:Xo({...e,wizard:{...t,gate:null}})}});var _N,WN=l(()=>{"use strict";R();gl();_N=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!cl(t.splitOptions))return e;let r=t.splitOptions[0];return Fr(e,r)}});var q4,en,Mm=l(()=>{"use strict";PN();vN();WN();Je();q4=e=>{let t=wN(e),r=bN(t);return _N(r)},en=(e,t)=>{let r=q4(t);return r!==t?(H(e,r),r):t}});var LN,tn,Nm=l(()=>{"use strict";R();LN=e=>Go.indexOf(e),tn=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||k(e.status)?Go.length:t.gate!==null?LN(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?LN(t.phase):null}});var EN,CN=l(()=>{"use strict";EN=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var rn,kN,RN=l(()=>{"use strict";R();CN();rn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kN=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Fo(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${rn(EN(o))}</pre></div>`:"",s=Bo(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=sr(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=om(c),g=i[c]??"",A=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${rn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${rn(p)}">${rn(A)}</label>
        ${h}
        <input class="input" type="text" id="${rn(p)}" name="${rn(p)}" value="${rn(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var Nt,xN,TN=l(()=>{"use strict";R();RN();zP();Wm();JP();Nt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xN=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate,n=ue(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?`<ul class="sdlc-wizard-vars">${r.variables.map(L=>`<li><strong>{{${Nt(L.name)}}}</strong> \u2014 ${Nt(L.description)} (sample: ${Nt(L.sampleValue)})</li>`).join("")}</ul><pre class="sdlc-pre">${Nt(r.templatedPrompt)}</pre>`:"",a=o==="evaluate"?ys({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",d=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(L=>{let x=L.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',I=L.recommended?' <span class="sdlc-badge">Recommended</span>':"",M=r.selectedSplitOptionId===L.id||r.selectedSplitOptionId===null&&L.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label><input type="radio" name="wizardSplitOptionId" value="${Nt(L.id)}" required${M}> <strong>${Nt(L.title)}</strong>${x}${I}<br><span class="muted">${Nt(L.summary)}</span></label>${_m(L)}</li>`}).join("")}</ul>`:"",p=r.modules[r.currentModuleIndex],A=o==="optimize_modules"&&p?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",h=p?.title??"Module",y=p?.prompt??"",u=p?.status==="pending",S=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Nt(h)}</p>${u?kN({cycle:e,modulePrompt:y}):""}<p class="muted">Test run prompt preview: ${Nt(Uo(y,sr(r)))}</p>${p?.statistics===null||p?.statistics===void 0?"":`<p class="muted">Module stats: best ${p.statistics.bestScore??"\u2014"} / \u2265${n} (round ${p.statistics.bestRound??"\u2014"}).</p>`}${ys({cycle:e,interactive:!1,caption:u?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${h}\u201D (runner + judge).`})}`:"",b=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":u?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",f=mP(r),w=f===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${f}</p>`,v=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",_=t?.active===!0?" sdlc-wizard-gate-active":"",C=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${v}"`:"";return`<section class="card sdlc-wizard-gate${_}"${C}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${b}</p>
    ${w}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Nt(e.id)}">
    ${i}
    ${a}
    ${d}
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
        <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue"${A}>Continue</button>
        <button class="btn btn-secondary" type="submit" name="intent" value="wizard-feedback-rerun" formnovalidate>Rerun with feedback</button>
      </div>
    </form>
    ${nN(e)}
  </section>`}});var K4,IN,ON=l(()=>{"use strict";R();Rm();K4=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IN=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||k(e.status))return"";let r=(o,n)=>{let s=bs(e,o);return`<h2 class="sdlc-wizard-active-head">${K4(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var J4,Y4,X4,MN,NN=l(()=>{"use strict";R();Nm();TN();ON();Em();J4={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},Y4=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),X4=(e,t,r)=>`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${Y4(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${Ss(e,t)}</div>
</details>`,MN=e=>{let t=e.wizard;if(t===void 0)return"";let r=tn(e);if(r===null)return"";let o=Go.slice(0,r).map((i,a)=>X4(e,`wizard-${a+1}`,J4[i])),n=t.gate!==null?xN(e,{active:!0}):IN(e),s=r>=Go.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var jm,QP=l(()=>{"use strict";NN();Wm();R();jm=e=>{if(e===null||e.wizard!==void 0&&k(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=MN(e),r=WM(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var Cl,zm,jN,ew,zN,DN,$N,HN,tw=l(()=>{"use strict";Cl=m(require("node:fs")),zm=m(require("node:path")),jN=e=>zm.default.join(zm.default.dirname(e),"prompt-optimizer-writer-ready.json"),ew=e=>{let t=jN(e);if(!Cl.default.existsSync(t))return{};try{let r=JSON.parse(Cl.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},zN=(e,t)=>{Cl.default.mkdirSync(zm.default.dirname(e),{recursive:!0}),Cl.default.writeFileSync(jN(e),`${JSON.stringify(t,null,2)}
`)},DN=(e,t)=>ew(e)[t]?.message??null,$N=(e,t,r)=>{zN(e,{...ew(e),[t]:{message:r}})},HN=(e,t)=>{let r=ew(e);r[t]!==void 0&&zN(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var rw,Dm,$m,FN,Te,on=l(()=>{"use strict";R();pl();Pl();Wl();vl();tw();Mm();Je();rw=new Set,Dm={atMs:0,ids:[]},$m=async()=>{if(Date.now()-Dm.atMs<3e4)return Dm.ids;let e=await St({commands:ce({})});return Dm.atMs=Date.now(),Dm.ids=e.installedWriterIds,e.installedWriterIds},FN=async(e,t,r)=>{let o=K(e,t);if(o===null||r.aborted)return;let n=en(e,o);if(k(n.status)||n.status==="wizard_paused"||Ot(n))return;let s=await AM(n,a=>{HN(e,a)},r,a=>{K(e,t)?.status==="stopped"||r.aborted||H(e,a)});K(e,t)?.status==="stopped"||r.aborted||(H(e,s),k(s.status)||await FN(e,t,r))},Te=(e,t)=>{if(rw.has(t))return;let r=K(e,t);if(r===null)return;let o=en(e,r);if(k(o.status)||o.status==="wizard_paused"||Ot(o))return;rw.add(t);let n=xM(t);FN(e,t,n).finally(()=>{rw.delete(t),TM(t)})}});var qr,kl=l(()=>{"use strict";ZP();Mm();QP();on();qr=(e,t)=>{let r=en(e,t);return Te(e,r.id),`${Om(r)}${jm(r)}`}});var UN,BN,GN=l(()=>{"use strict";UN=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,BN=e=>e!==null&&e>0});var Hm,VN,ow=l(()=>{"use strict";R();vl();Hm=e=>(As(e.id),{...e,status:"stopped",errorMessage:Nb,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null,phase:"complete"},updatedAt:new Date().toISOString()}),VN=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;As(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var Z4,qN,KN,JN=l(()=>{"use strict";R();Pl();gl();fl();kl();Je();on();GN();FP();ow();Z4="Pick a revision scored above 0 before continuing to Separate.",qN=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),KN=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=K(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=K(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(qr(e.storePath,d))};if(o==="wizard-stop-all"){let c=Hm(s);return H(e.storePath,c),a(n),!0}if(o==="wizard-skip-module"){let c=VN(s);return H(e.storePath,c),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=OM(s,c);return H(e.storePath,d),d.status==="judging"&&Te(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",g=nP(s.wizard,d,c);g=sP(g,d),g={...g,pendingStepInstructions:p};let A={...s,status:"judging",errorMessage:null,wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return H(e.storePath,A),Te(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(A=>A.step==="generalize"),g=(s.errorMessage?.trim().length??0)>0&&!d?qN(s):Xo({...s,wizard:{...s.wizard,gate:null}});return H(e.storePath,g),Te(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=UN(s,p??-1);if(!BN(g)){let h={...s,errorMessage:Z4,updatedAt:new Date().toISOString()};return H(e.storePath,h),a(n),!0}let A=Ur({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return H(e.storePath,A),Te(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=qN(s);return H(e.storePath,h),Te(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(h=>h.id===p);if(g===void 0){let h={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return H(e.storePath,h),a(n),!0}let A=Fr(s,g);return H(e.storePath,A),a(n),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(n),!0;let g=bP({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!g.ok){let u={...s,errorMessage:g.errorMessage,updatedAt:new Date().toISOString()};return H(e.storePath,u),a(n),!0}let A={...s.wizard,parameterValues:g.parameterValues};if(p.status==="pending"){let u=SM({...s,wizard:{...A,gate:null}},d);return H(e.storePath,u),Te(e.storePath,n),a(n),!0}let h=d+1;if(h>=s.wizard.modules.length){let u=pe(A),S={...s,status:u.terminalStatusSuggestion,wizard:{...A,gate:null,phase:"complete"},updatedAt:new Date().toISOString()};return H(e.storePath,S),a(n),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...A,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return H(e.storePath,y),a(n),!0}}return a(n),!0}});var Q4,YN,e3,nw,t3,XN,ZN=l(()=>{"use strict";xe();vl();ow();EP();um();Wl();Je();Q4="Add a score from 0 to 100 and the reason for it.",YN="Add a score from 1 to 100 and the reason for it.",e3="Write the next prompt.",nw="This step is not waiting for you.",t3=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},XN=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=K(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(H(e.storePath,Hm(a)),{kind:"saved",cycleId:i}):IM(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=K(e.storePath,r);if(o===null||!Ot(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:nw};if(t==="manual-judge"){if(o.judgeModel!==T)return{kind:"invalid",cycle:o,errorMessage:nw};let i=t3(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?YN:Q4};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:YN};let d=o.revisions.find(g=>g.roundNumber===o.currentRound)?.run?.tokenReview??"",p=pm(Sl(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return H(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==T)return{kind:"invalid",cycle:o,errorMessage:nw};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:e3};let s=dm(o,n);return H(e.storePath,s),{kind:"saved",cycleId:o.id}}});var QN,ej=l(()=>{"use strict";QN=`<script>
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
</script>`});var tj,rj=l(()=>{"use strict";tj=`<script>
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
</script>`});var oj,nj=l(()=>{"use strict";oj=`<script>
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
</script>`});var sj,ij=l(()=>{"use strict";R();Xe();sj=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:Ye(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(ue(t.wizard)),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!k(t.status)}}});var aj,lj=l(()=>{"use strict";R();Nm();aj=e=>{if(e.wizard===void 0)return k(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let t=tn(e);if(e.status==="wizard_paused"&&t!==null&&t<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${t+1} of 4`};if(k(e.status)){if(e.wizard.phase==="complete"){let r=pe(e.wizard),o=r.rows.reduce((s,i)=>i.bestScore===null?s:s===null?i.bestScore:Math.min(s,i.bestScore),null),n=o===null?"":` \xB7 lowest ${o}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Wizard \xB7 ${r.passedModuleCount}/${r.totalModules} modules${n}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}}return t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${t+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var cj,dj=l(()=>{"use strict";cj=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var lr,r3,o3,uj,pj=l(()=>{"use strict";lj();dj();El();lr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),r3=e=>e.wizard===void 0?"classic":"wizard",o3=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${lr(t)}">`,o=aj(e),n=cj(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${lr(o.badgeClass)}">${lr(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${lr(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${lr(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${r3(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${lr(e.id)}">${lr(ir(e.goal))}</a><p class="muted">${lr(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${g}</div></li>`},uj=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(i=>o3(i,t)).join(""),o=Math.min(e.length,20),n=o===e.length?`History \xB7 ${e.length}`:`History \xB7 ${o} of ${e.length}`,s=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2><ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${lr(n)}</summary>${s}</details>`:s}});var sw,Fm,mj,n3,s3,iw,gj,aw=l(()=>{"use strict";sw=m(require("node:fs")),Fm=m(require("node:path"));Xe();mj=/^[a-z0-9-]+$/,n3=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},s3=(e,t)=>{if(!mj.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let g=n3(p[2]??"");p[1]==="name"&&g.length>0&&(o=g),p[1]==="description"&&(n=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},iw=e=>{let t=Ko(e);if(!t.ok)return[];let r=Fm.default.resolve(t.path,".cursor","skills"),o=[];try{o=sw.default.readdirSync(r)}catch{return[]}return o.filter(n=>mj.test(n)).flatMap(n=>{let s=Fm.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${Fm.default.sep}`))return[];try{let i=s3(sw.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},gj=(e,t)=>iw(e).find(r=>r.fileName===t)??null});var fj,hj=l(()=>{"use strict";fj={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var Rl,i3,ze,ws=l(()=>{"use strict";hj();wl();Rl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),i3=e=>{let t=fj[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${Rl(t.title)}" aria-describedby="${r}" aria-expanded="false">${Br}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${Rl(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${Rl(t.example)}</span></span></button>`},ze=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${Rl(r)}"`}>${Rl(e)}</span>${i3(t)}</span>`});var yj,a3,Sj,Aj,bj=l(()=>{"use strict";ws();yj=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),a3=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),Sj=e=>{if(e.length===0)return`<div class="field">${ze("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${yj(r.fileName)}">${yj(r.fileName)}</option>`).join("");return`<div class="field">${ze("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${a3(e)}</script>`},Aj=`<script>
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
  select.addEventListener("change", () => {
    const skill = skills.find((item) => item.fileName === select.value);
    const prompt = document.querySelector('textarea[name="prompt"]');
    if (!(prompt instanceof HTMLTextAreaElement) || skill === undefined) return;
    if (typeof skill.promptText !== "string") return;
    prompt.value = skill.promptText;
    prompt.dispatchEvent(new Event("input"));
  });
})();
</script>`});var Ie,Pj,wj,l3,vj,_j,Wj,Lj=l(()=>{"use strict";R();qP();xe();El();Nm();Ie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Pj=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",wj=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,l3=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},vj=e=>e===T?"You":re(e),_j=e=>{let t=l3(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":re(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Ie(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Ie(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Ie(vj(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Ie(vj(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Ie(r)}</dd></div>
    </dl>
  </details>`},Wj=e=>{let t=e.wizard;if(t===void 0)return"";let r=ir(e.goal),o=e.status==="wizard_paused",n=!k(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=Tm(e),g=wj(t),A=g===null?"":Pj(g),h=tn(e),y=A.length===0?"":h===null||h>=4?` <strong>${Ie(A)}</strong>`:` <strong>${Ie(A)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Ie(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Ie(p.title)}${y}</p>
    <p class="muted">${Ie(p.detail)}</p>
    <div class="actions">
      ${_j(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ie(e.id)}">Open this run</a>
    </div>
  </section>`}let s=wj(t),i=s===null?"Wizard":Pj(s),a=tn(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ie(r)}</h2>
    <p class="lede">Paused at <strong>${Ie(i)}</strong>${Ie(c)} (last updated ${Ie(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${_j(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ie(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var xl,Ej,Cj=l(()=>{"use strict";ws();xl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ej=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${xl(n.id)}"${n.id===e.runner?" selected":""}>${xl(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${xl(e.runner)}">Checking ${xl(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${ze("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${ze("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${xl(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var kj,Rj=l(()=>{"use strict";kj=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var vs,xj,Tj,Ij,Oj,Mj=l(()=>{"use strict";ws();vs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xj=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${vs(c.id)}"${c.id===r?" selected":""}>${vs(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${vs(n)}</option>`;return`<div class="field">${ze(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},Tj=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${vs(t)}">Checking ${vs(o)}\u2026</p>`},Ij=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${ze(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${vs(r)}</textarea><span class="muted">${o}</span></div></details>`,Oj=e=>{let t=`<div class="sdlc-writer">${xj("judge","Judge",e.judge,e.writers,"I'll score it")}${Tj("judge",e.judge,e.writers)}${Ij("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${xj("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${Tj("improver",e.improver,e.writers)}${Ij("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var Tl,c3,d3,lw,Nj=l(()=>{"use strict";R();ws();Tl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),c3=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},d3=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,lw=e=>{let t=c3(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=Xa(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${ze(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${Tl(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${Tl(e.inputId)}" class="sdlc-pass-range" type="range" name="${Tl(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${Tl(a)}"><span class="sdlc-pass-mark" style="left:${d3(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${Tl(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var p3,cr,jj,zj=l(()=>{"use strict";Wl();ZP();ej();rj();VP();nj();ij();pj();aw();bj();ws();QP();Lj();El();Cj();Rj();Mj();R();Nj();p3=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,cr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jj=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${cr(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${cr(e.skillNotice??"")}</div>`,o=`${FM}${UM}`,n=e.resumableWizardCycle??null,s=n===null?"":Wj(n),i=jm(e.cycle),a=e.cycle===null?"":Om(e.cycle),c=e.cycle!==null&&Ot(e.cycle),d=sj(e),p=p3(d.goal,d.prompt,e.canRun),g=Oj({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),A=Ej({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=`${lw({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${lw({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=rP,u=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",S=e.cycle!==null&&k(e.cycle.status),b=d.running&&!S,f=S||b?"":" open",w=b?" sdlc-compose-run-focus":"",_=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${S?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,C=S?(()=>{let F=e.cycle!==null?ir(e.cycle.goal):ir(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${cr(F)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${_}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${_}</summary>`,L=S?" sdlc-compose-viewing-finished":"",x=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",I=c?"waiting":d.running?"running":"idle",M=d.running&&!c?' aria-busy="true"':"",oe=`<section class="card sdlc-compose${L}${w}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${f}>
        ${C}
        <div class="sdlc-compose-details-body">
      <p class="lede">${y} ${cr(e.modelNote)}</p>
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
            ${ze("Folder","folder")}
            <input class="input" type="text" name="folder" value="${cr(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${Sj(iw(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${ze("Goal","goal")}
            <textarea class="input textarea" name="goal" rows="4" required>${cr(d.goal)}</textarea>
          </div>
          <div class="field">
            ${ze("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${cr(d.prompt)}</textarea>
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
        ${kj()}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${cr(d.passScore)}; Step 4 pass \u2265 ${cr(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
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
    </section>`,G=`${""}${QN}${tj}${oj}${Aj}`;return`${t}${r}${oe}${s}${a}${i}${o}${uj(e.history,e.cycle?.id??null)}${G}`}});var Il,cw=l(()=>{"use strict";zj();Il=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:jj(t)}))}});var Dj,$j=l(()=>{"use strict";ZN();kl();cw();Je();on();Dj=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:XN({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=K(e.storePath,o.cycleId);return Te(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(qr(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Il(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:xt(e.storePath),resumableWizardCycle:null}),!0)}});var Hj,Um,dw=l(()=>{"use strict";Hj=m(require("node:os"));R();Um=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??Hj.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var Fj,_s,uw,Uj,Bj,Ol=l(()=>{"use strict";R();xe();Ob();Fj=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,_s=e=>{let t=HO(e),r=Jo(e).map(s=>({id:s,label:cm[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},uw=(e,t,r)=>t===T||t!==null&&e.writers.some(o=>o.id===t)?t:r,Uj=(e,t,r,o=null)=>({judge:uw(e,t,e.judge),improver:uw(e,r,e.improver),runner:uw(e,o,e.runner)}),Bj=e=>e===Dp?{goal:$p,prompt:Hp}:{goal:"",prompt:""}});var Bm,Gj=l(()=>{"use strict";Bm=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var Vj,Gm,pw=l(()=>{"use strict";R();xe();Xe();Ol();Gj();Vj=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=Bm(o);return n.ok?String(n.passScore):String(r)},Gm=e=>{let t=Uj(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=Vj(e.posted,"passScore",70),o=Vj(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=(f,w)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:f,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:w,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a});if(e.posted===null)return d(e.defaultFolder??qo,null);let p=e.posted.get("folder")??qo;if(e.posted.get("intent")==="choose-folder"){let f=e.pickFolder();return d(f===null?p:Ye(f),null)}if((e.posted.get("intent")??"")!=="run")return d(p,null);let A=Fj(e.goal,e.prompt);if(A!==null)return d(p,A);let h=Bm(e.posted.get("passScore")??r);if(!h.ok)return d(p,h.errorMessage);let y=Bm(e.posted.get("modulePassScore")??o);if(!y.ok)return d(p,y.errorMessage);let u=FO(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(u===null)return d(p,"Choose a judge and an improver.");let S=Ko(p);if(!S.ok)return d(p,S.errorMessage);let b=UO(e.installedIds,c,u.judge);return b===null?d(p,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:u.judge,improver:u.improver,workingDirectory:S.path,passScore:h.passScore,modulePassScore:y.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:b,runnerInstructions:a}}});var Ws,qm,m3,mw,qj,Vm,Kj,g3,Jj,gw,f3,h3,y3,fw,Yj,Xj,Zj=l(()=>{"use strict";Ws=m(require("node:fs")),qm=m(require("node:path"));xe();Xe();m3=["remember","choose-folder","run"],mw=()=>({folder:qo,judge:"",improver:"",runner:""}),qj=e=>qm.default.join(qm.default.dirname(e),"prompt-optimizer-preferences.json"),Vm=e=>typeof e=="string"?e:"",Kj=e=>{let t=qj(e);if(!Ws.default.existsSync(t))return mw();try{let r=JSON.parse(Ws.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return mw();let o=r,n=Vm(o.folder).trim();return{folder:n.length===0?qo:n,judge:Vm(o.judge),improver:Vm(o.improver),runner:Vm(o.runner)}}catch{return mw()}},g3=(e,t)=>{let r=qj(e);Ws.default.mkdirSync(qm.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;Ws.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),Ws.default.renameSync(o,r)},Jj=(e,t)=>e===T||Jo(t).some(r=>r===e),gw=(e,t,r)=>e===null?t:e.length===0?"":Jj(e,r)?e:t,f3=(e,t)=>{if(e===null)return t;let r=Ko(e);return r.ok?r.display:t},h3=e=>{let t=Kj(e.storePath),r={folder:f3(e.folder,t.folder),judge:gw(e.judge,t.judge,e.installedIds),improver:gw(e.improver,t.improver,e.installedIds),runner:gw(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||g3(e.storePath,r)},y3=e=>{let t=Ko(e);return t.ok?t.display:qo},fw=(e,t)=>Jj(e,t)?e:"",Yj=e=>{let t=Kj(e.storePath);return{selection:{...e.selection,judge:fw(t.judge,e.installedIds)||e.selection.judge,improver:fw(t.improver,e.installedIds)||e.selection.improver,runner:fw(t.runner,e.installedIds)||e.selection.runner},defaultFolder:y3(t.folder)}},Xj=e=>{let t=e.posted.get("intent")??"";if(!m3.includes(t))return;let r=e.posted.get("folder");h3({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var Qj,S3,A3,hw,b3,Km,Jm=l(()=>{"use strict";Qj=m(require("node:os"));xe();tw();yl();S3="Reply with the single word ok. Do not use tools.",A3=45e3,hw=async(e,t)=>{if(t===T)return{ok:!0,message:"You will do this step."};let r=DN(e,t);if(r!==null)return{ok:!0,message:r};let o=await ot({writerAgent:t,prompt:S3,workingDirectory:Qj.default.tmpdir(),timeoutMs:A3});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${re(t)} is ready.`;return $N(e,t,n),{ok:!0,message:n}},b3=e=>[...new Set(e.filter(t=>t.length>0))],Km=async(e,t,r,o)=>{for(let n of b3([t,r,o??""])){let s=await hw(e,n);if(!s.ok)return s.message}return null}});var yw,ez=l(()=>{"use strict";R();yw=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!k(r.status)&&!(t!==null&&r.id===t))return r;return null}});var tz,rz=l(()=>{"use strict";ht();R();kl();dw();pw();cw();Je();Xe();Zj();aw();Jm();ez();Mm();on();tz=async e=>{let t=e.posted===null?Yj({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=Gm({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Nr("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(Xj({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Ye(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await Km(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await Il(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Ye(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:xt(e.route.storePath),resumableWizardCycle:yw(xt(e.route.storePath),null)});return}if(r.kind==="start"){let s=gj(r.workingDirectory,r.sourceSkillFile),i=Um({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,wizard:{...tl(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(H(e.route.storePath,i),Te(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(qr(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:K(e.route.storePath,e.cycleId);n!==null&&(n=en(e.route.storePath,n),Te(e.route.storePath,n.id)),await Il(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:xt(e.route.storePath),resumableWizardCycle:yw(xt(e.route.storePath),n?.id??null)})}});var oz,nz=l(()=>{"use strict";Je();oz=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";_O(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var sz,iz=l(()=>{"use strict";sz=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var az,lz=l(()=>{"use strict";DO();JN();$j();rz();nz();Ol();iz();on();az=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await $m(),o=_s(r),n=e.method==="POST"?sz(e.request.headers["content-type"],await e.readBody(e.request)):null;if(KN({posted:n,storePath:e.storePath,response:e.response})||await Dj(e,n,o))return;let s=Bj(t.searchParams.get("example")),i=oz({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=zO({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await tz({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:jO(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var P3,cz,dz=l(()=>{"use strict";R();Je();P3=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",cz=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=K(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!k(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=pP({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${P3(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var uz,pz=l(()=>{"use strict";kl();Je();uz=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:K(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":qr(e.storePath,o)),!0}});var w3,mz,gz=l(()=>{"use strict";xe();Jm();w3=["claude-cli","codex","cursor","antigravity"],mz=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===T||w3.includes(t)?await hw(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var fz,hz=l(()=>{"use strict";R();fz=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:Qa,page:el,context:ds,installedWriters:e,post:{method:"POST",url:Qa,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${Qa}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var Sw,yz=l(()=>{"use strict";R();_l();Sw=e=>{let t=e.revisions[e.revisions.length-1]??null,r=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null}))),o=k(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:o,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:Ps(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:ds,page:`${el}?cycle=${encodeURIComponent(e.id)}`}}});var Oe,v3,Sz,Az,bz=l(()=>{"use strict";Oe=m(ti());R();v3=(0,Oe.isType)({goal:Oe.isString,prompt:Oe.isString,workingDirectory:Oe.isString,judge:(0,Oe.isUndefinedOr)(Oe.isString),improver:(0,Oe.isUndefinedOr)(Oe.isString),passScore:(0,Oe.isUndefinedOr)(Oe.isNumber),maxRounds:(0,Oe.isUndefinedOr)(Oe.isNumber)}),Sz=e=>{let t=e?.trim()??"";return t.length===0?null:t},Az=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return v3(t)?t.workingDirectory.trim().length===0?{ok:!1,error:Xp}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:Sz(t.judge),improver:Sz(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:Xp}}});var _3,Pz,wz=l(()=>{"use strict";R();xe();pw();Ol();_3=e=>e.map(t=>t.id).join(", "),Pz=e=>{let t=_s(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===T||n===T)return{ok:!1,error:tP,installedWriters:t.writers};if(o===null||n===null){let a=_3(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o}),i=Gm({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var vz,_z=l(()=>{"use strict";R();dw();hz();yz();Ol();bz();wz();Je();vz=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=K(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:Sw(c)}}let r=await e.handlers.readInstalledIds(),o=_s(r);if(e.method==="GET")return{status:200,body:fz(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let n=Az(e.rawBody);if(!n.ok)return{status:400,body:{ok:!1,error:n.error,installedWriters:o.writers}};let s=Pz({body:n.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver,s.runner);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:o.writers}};let a=Um({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds,wizard:tl(s.prompt),runnerModel:s.runner});return H(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:Sw(a)}}});var Wz,Lz=l(()=>{"use strict";on();Jm();_z();Wz=async e=>{let t=await vz({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:$m,readWritersReady:Km,startCycle:Te}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var W3,Aw,Ez=l(()=>{"use strict";BT();lz();dz();pz();gz();Lz();W3=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},Aw=async e=>{let t=W3(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await Wz(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:UT()})),!0):(await mz({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||cz({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||uz({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await az(e),!0)}});var Cz=l(()=>{"use strict";Ez()});var nn,Ml,L3,E3,C3,k3,kz,Rz=l(()=>{"use strict";nn=m(require("node:fs")),Ml=m(require("node:path")),L3="prompt-optimizer-cycles.json",E3="prompt-optimizer-preferences.json",C3="prompt-sdlc-cycles.json",k3="prompt-sdlc-preferences.json",kz=e=>{let t=Ml.default.join(e,L3),r=Ml.default.join(e,C3);if(nn.default.existsSync(t)||!nn.default.existsSync(r))return t;try{nn.default.renameSync(r,t)}catch{return r}let o=Ml.default.join(e,k3),n=Ml.default.join(e,E3);if(nn.default.existsSync(o)&&!nn.default.existsSync(n))try{nn.default.renameSync(o,n)}catch{}return t}});var Ls,R3,bw,xz=l(()=>{"use strict";Ls=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),R3=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],bw=e=>{let t=R3.map(i=>`<option value="${Ls(i.value)}">${Ls(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Ls(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Ls(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Ls(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Ls(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Nl,Oz,x3,Mz,T3,I3,Nz,Xm,Tz,Iz,O3,M3,dr,jl,Ym,N3,Zm,Pw,j3,ww,jz,vw,zz,z3,D3,$3,Dz,$z,Hz,zl=l(()=>{"use strict";Nl=m(require("node:fs")),Oz=m(require("node:path")),x3="estimate-history.ndjson",Mz=100,T3=500,I3=2e4,Nz=e=>Oz.default.join(e,x3),Xm=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,T3),Tz=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,I3),Iz=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,O3=e=>({...e,estimateTokens:Iz(e.estimateTokens),actualTokens:Iz(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),M3=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},dr=e=>{let t=Nz(e);return Nl.default.existsSync(t)?Nl.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return M3(n)?[O3(n)]:[]}catch{return[]}}):[]},jl=(e,t)=>{Nl.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Nl.default.writeFileSync(Nz(e),r,"utf8")},Ym=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),N3=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${Ym(o.task)} | ${Ym(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},Zm=e=>{let t=dr(e.reportsDir),r=Xm(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);jl(e.reportsDir,[...s,n])},Pw=e=>{let t=dr(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?Xm(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);jl(e.reportsDir,[...i,s])},j3=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-Mz),ww=e=>[...dr(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),jz=e=>{let t=dr(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=Tz(e.input),n=Tz(e.output),s=Xm(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);jl(e.reportsDir,[...c,a])},vw=(e,t)=>{let r=dr(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},zz=e=>({table:N3(j3(dr(e))),embedding:null}),z3=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},D3=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-Mz),$3=e=>{let t=z3(D3(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${Ym(s.task)} | ${Ym(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},Dz=e=>{let t=dr(e.reportsDir),r=Xm(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);jl(e.reportsDir,[...s,n])},$z=e=>{let t=dr(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);jl(e.reportsDir,[...s,n])},Hz=e=>$3(dr(e))});var Fz=l(()=>{"use strict";zl()});var ur,_w,H3,Ww,F3,U3,Qm,eg,B3,Lw,Uz=l(()=>{"use strict";Fz();UP();ur=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_w=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},H3=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${_w(-r)} under`:`${_w(r)} over`},Ww=e=>e.toLocaleString("en-US"),F3=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${Ww(-r)} under`:`${Ww(r)} over`},U3=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},Qm=e=>e===null?"\u2014":_w(e),eg=e=>e===null?"\u2014":Ww(e),B3=`(function () {
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
})();`,Lw=e=>{let r=ww(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":H3(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":F3(n.estimateTokens,n.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${ur(U3(i))}</button></td>
        <td>${ur(c)}</td>
        <td>${Qm(n.estimateSeconds)}</td>
        <td>${Qm(n.actualSeconds)}</td>
        <td>${ur(d)}</td>
        <td>${eg(n.estimateTokens)}</td>
        <td>${eg(n.actualTokens)}</td>
        <td>${ur(p)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${ur(c)}</p>
        <h2>Input</h2>
        <pre>${ur(i)}</pre>
        <h2>Output</h2>
        <pre>${ur(a)}</pre>
        <p>Time: estimated ${Qm(n.estimateSeconds)} \xB7 actual ${Qm(n.actualSeconds)} \xB7 ${ur(d)}</p>
        <p>Tokens: estimated ${eg(n.estimateTokens)} \xB7 actual ${eg(n.actualTokens)} \xB7 ${ur(p)}</p>
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
            ${Cm({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${B3}</script>`}
    </section>`}});var Bz=l(()=>{"use strict";xz();Uz()});var Es,G3,V3,Ew,Gz=l(()=>{"use strict";Es=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),G3=(e,t,r)=>{let o=Es(t),n=Es(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},V3=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${Es(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>G3(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${Es(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${Es(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${Es(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},Ew=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(V3).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var Vz=l(()=>{"use strict";Gz()});var Dl,qz,Kz,Cw,kw,Rw,Jz=l(()=>{"use strict";Dl=m(require("node:fs")),qz=m(require("node:path"));ja();Ip();Kz=(e,t,r)=>os({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,Cw=(e,t,r)=>{let o=Kz(e,t,r);if(o===null)return[];if(!Dl.default.existsSync(o))return[];let n=Dl.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},kw=e=>{let t=Kz(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:er(e.entry.prompt),output:er(e.entry.output)};Dl.default.mkdirSync(qz.default.dirname(t),{recursive:!0}),Dl.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},Rw=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var q3,K3,$l,tg,xw=l(()=>{"use strict";q3=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),K3=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,$l=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=q3(i.assistantOutput),d=c.length>0?`Assistant: ${K3(c,t)}`:null,p=[a,d].filter(g=>g!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},tg=e=>{let t=e.userMessage.trim(),r=$l({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var jt,Hl,Ow,J3,Y3,Tw,X3,Mw,rg,Yz,Xz,Z3,Cs,Nw,Iw,Zz,Q3,Qz,ks,og,Fl,e6,Ul,jw,ng,sg,eD=l(()=>{"use strict";jt=m(require("node:fs")),Hl=m(require("node:path")),Ow=require("node:crypto");xw();J3="writer-sessions",Y3="active-index.json",Tw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),X3=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Mw=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},rg=e=>{let t=Hl.default.join(e.installDir,J3);return jt.default.mkdirSync(t,{recursive:!0}),t},Yz=e=>Hl.default.join(rg(e),Y3),Xz=(e,t)=>Hl.default.join(rg(e),`${t}.canonical.json`),Z3=(e,t)=>Hl.default.join(rg(e),`${t}.continuation.json`),Cs=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,Nw=e=>{let t=Yz(e);if(!jt.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(jt.default.readFileSync(t,"utf8"));if(!Tw(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!Tw(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!X3(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},Iw=(e,t)=>{jt.default.writeFileSync(Yz(e),JSON.stringify(t,null,2))},Zz=(e,t)=>{jt.default.writeFileSync(Xz(e,t.sessionId),JSON.stringify(t,null,2))},Q3=(e,t)=>{jt.default.writeFileSync(Z3(e,t.sessionId),JSON.stringify(t,null,2))},Qz=(e,t)=>{let r=$l({turns:t.turns});Q3(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},ks=(e,t)=>{let r=Xz(e,t);if(!jt.default.existsSync(r))return null;try{let o=JSON.parse(jt.default.readFileSync(r,"utf8"));return!Tw(o)||typeof o.sessionId!="string"?null:o}catch{return null}},og=(e,t=20)=>{let r=rg(e),o=jt.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=ks(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Fl=(e,t,r)=>{let o=Mw(r);return Nw(e).entries.find(i=>Cs(i)===Cs({writerAgent:t,projectFolderPath:o}))?.sessionId??null},e6=(e,t,r,o)=>{let n=Nw(e),s=Cs({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>Cs(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];Iw(e,{entries:i})},Ul=(e,t,r)=>{let o=(0,Ow.randomUUID)(),n=new Date().toISOString(),s=Mw(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return Zz(e,i),Qz(e,i),e6(e,t,s,o),o},jw=(e,t,r)=>{let o=Fl(e,t,r);return o!==null?o:Ul(e,t,r)},ng=(e,t,r)=>{let o=Mw(r),n=Nw(e);if(o===null&&r===void 0){Iw(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=Cs({writerAgent:t,projectFolderPath:o});Iw(e,{entries:n.entries.filter(i=>Cs(i)!==s)})},sg=e=>{let t=jw(e.layout,e.writerAgent,e.projectFolderPath),r=ks(e.layout,t);if(r===null)return;let o={id:(0,Ow.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};Zz(e.layout,n),Qz(e.layout,n)}});var t6,r6,ig,zw,tD=l(()=>{"use strict";t6=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",r6=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},ig=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",zw=e=>{let t=ig(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=t6(r,e.userPromptCharacterCount),n=r6({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var ag=l(()=>{"use strict";Jz();eD();xw();tD()});var rD=l(()=>{"use strict";ry()});var Fe,n6,s6,Dw,$w,Hw,oD=l(()=>{"use strict";de();rD();Fe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),n6=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},s6=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=gu(o);return`value="${Fe(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${Fe(r)}"`},Dw=(e,t,r,o,n)=>{let s=Ry[t];return`<label class="field">
          <span class="field-label">${Fe(o)} API key \u2014 ${Fe(n6(e,t))} \xB7 <a class="field-link" href="${Fe(s.href)}" target="_blank" rel="noopener noreferrer">${Fe(s.label)}</a></span>
          <input class="input mono" type="password" name="${Fe(r)}" autocomplete="off" ${s6(e,t,n)} />
        </label>`},$w=(e,t,r,o)=>{let n=oy(e[t]?.model),s=new Set(iu[t].map(c=>c.value)),i=iu[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${Fe(c.value)}"${d}>${Fe(c.label)}</option>`}).join(""),a=n!==wo&&!s.has(n)?`<option value="${Fe(n)}" selected>${Fe(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${Fe(o)}</span>
          <select class="input mono" name="${Fe(r)}">${i}${a}</select>
        </label>`},Hw=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Fe(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${Dw(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${$w(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${Dw(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${$w(e.secrets,"openai","openaiModel","OpenAI model")}
        ${Dw(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${$w(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var nD=l(()=>{"use strict";oD()});var lg,sD,iD=l(()=>{"use strict";lg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sD=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${lg(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Console</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Console \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${lg(s.name)}</strong> <span class="muted mono">(${lg(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${lg(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) from Agent Witch Live. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var i6,aD,lD,cD=l(()=>{"use strict";i6=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,aD=e=>e.kind==="folder",lD=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&aD(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(aD(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(i6)};return r(t)}});var dD,Fw,uD=l(()=>{"use strict";dD=m(require("node:path")),Fw=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Fw(r.children,t)}</ul>
            </details>
          </li>`;let o=dD.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var pD,Kr,a6,l6,Bl,c6,Uw,mD=l(()=>{"use strict";zp();pD=m(require("node:path"));iD();cD();uD();Kr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),a6=()=>`(() => {
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

})();`,l6=()=>`(() => {
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
})();`,Bl=e=>{let t=Fa({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Console",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=sD({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${Kr(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Kr(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':c6(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Kr(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Kr(s)}" />
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
    <script>${a6()}</script>
    <script>${l6()}</script>`;return`${t}${r}${o}${c}${d}`},c6=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=lD(a.items.map(A=>({...A,relativePath:typeof A.relativePath=="string"&&A.relativePath.length>0?A.relativePath:pD.default.relative(a.sourceRoot,A.sourcePath).replaceAll("\\","/")}))),p=Fw(d,Kr),g=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Kr(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Kr(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${g} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Kr(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},Uw=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??p??a,A=t.sets[i];if(A===void 0)continue;let h=a.length>0?a:A.proposedSlug,y=g.length>0?g:A.proposedName,u=r.has(i),S=A.items.map(b=>({id:b.id,kind:b.kind,title:b.title,sourcePath:b.sourcePath,include:u}));s.push({slug:h,name:y,items:S})}return s}});var gD=l(()=>{"use strict";mD()});var d6,Bw,fD=l(()=>{"use strict";Mr();d6=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},Bw=d6});var u6,hD,yD=l(()=>{"use strict";Mr();u6=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},hD=u6});var SD=l(()=>{"use strict"});var Gl,p6,Gw,AD=l(()=>{"use strict";zp();Gl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p6=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,Gw=e=>{let t=e.flashError?`<div class="alert-error">${Gl(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Gl(e.flashMessage)}</div>`:"",r=Fa({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Console",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Console, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Gl(p6(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Gl(n.name)}</strong>
                  <span class="muted mono">${Gl(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Console for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var bD=l(()=>{"use strict";SD();jS();AD()});var cg,PD=l(()=>{"use strict";cg=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var wD,pr,Vw=l(()=>{"use strict";wD=m(require("node:path"));Kt();_t();V();de();Qe();pr=e=>{let t=$()?.layout.installDir??E();if(wD.default.basename(t)===so)return Vt;let r=$(),o=r!==null?ke(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):Vt}});var qw,vD=l(()=>{"use strict";Qe();Vw();qw=async e=>{let t=Ce(e.installDir),r=t?.bundleVersion??null,o=pr(t);try{let n=await xn(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:ho(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var Kw,_D=l(()=>{"use strict";Kw=e=>!e});var Jw,Rs,Yw=l(()=>{"use strict";V();Jw=()=>`http://127.0.0.1:${rh()}/update/run`,Rs=async e=>{try{let t=await fetch(Jw(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var m6,WD,Xw,LD=l(()=>{"use strict";V();te();Yw();m6=()=>{Bt({launchAgentLabel:ne(),installDir:E()})},WD=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Xw=async()=>{m6();let e=await Rs({force:!0});if(e.ok)return{ok:!0,message:WD(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:WD(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Qe(),eC)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var Zw=l(()=>{"use strict";Eb();PD();Vw();vD();_D();LD();Yw()});var ED,CD=l(()=>{"use strict";ED=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var kD,RD,Qw,ev,xD=l(()=>{"use strict";kD=require("node:crypto"),RD=m(require("node:fs"));ht();de();de();CD();Qw=!1,ev=async e=>{if(Qw)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!ED(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=X({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&RD.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,kD.randomUUID)();Qw=!0;try{if(await CS(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await zn({...r,workspace:n},e.writerAgent,t);return await ca(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Qw=!1}}});var TD=l(()=>{"use strict";xD()});var nt,g6,ID,OD,tv,rv,ov,nv,sv,iv,av=l(()=>{"use strict";nt=require("node:crypto"),g6=Buffer.from("302a300506032b6570032100","hex"),ID=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},OD=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,nt.createPublicKey)({key:Buffer.concat([g6,t]),format:"der",type:"spki"})},tv=()=>{let{publicKey:e,privateKey:t}=(0,nt.generateKeyPairSync)("ed25519");return{publicKeyRaw:ID(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},rv=e=>(0,nt.createPrivateKey)(e),ov=(e,t)=>(0,nt.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),nv=(e,t,r)=>{try{let o=OD(e);return(0,nt.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},sv=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,iv=()=>(0,nt.randomBytes)(32).toString("base64url")});var mr,dg,MD,f6,h6,ug,lv,cv,ND=l(()=>{"use strict";mr=m(require("node:fs")),dg=m(require("node:path"));av();V();_t();MD=e=>dg.default.join(e.installDir,vr),f6=(e,t)=>{if(e.profileEmail===null||t===MD(e)||mr.default.existsSync(t))return;let r=MD(e);mr.default.existsSync(r)&&(mr.default.mkdirSync(dg.default.dirname(t),{recursive:!0}),mr.default.renameSync(r,t))},h6=e=>{if(!mr.default.existsSync(e))return null;try{let t=mr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},ug=e=>{let t=Od(e);f6(e,t);let r=h6(t);if(r!==null)return r;let o=tv();return mr.default.mkdirSync(dg.default.dirname(t),{recursive:!0}),mr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},lv=e=>{let t=ug(e.layout),r=iv(),o=sv({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=rv(t.privateKeyPem),s=ov(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},cv=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return nv(e.serverPublicKey,t,e.serverAttestation)}});var dv=l(()=>{"use strict";ND();av()});var $D,Vl,mv,gv,jD,y6,uv,pg,ae,HD,S6,pv,A6,b6,fv,ge,We,gr,P6,zD,DD,ql,Kl,FD=l(()=>{"use strict";$D=m(require("node:http")),Vl=m(require("node:fs")),mv=m(require("node:path"));mg();Oa();eT();rT();lT();Kn();eb();_b();DT();HT();Cz();Rz();Bz();Vz();ag();nD();gD();Co();ht();Mr();fD();yD();bD();Zw();Qe();TD();de();dv();gv=e=>FA(e)??"never",jD=48e3,y6=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,uv=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Fu(),reveal:t.reveal,installed:Or(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),pg=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Console to load projects."}:Bn(t,e)},ae=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HD=200,S6=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',pv=e=>{let t=e.trim().slice(0,HD),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},A6=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ae(t)}</div>`,b6=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ae(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',fv={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},ge=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...fv}),e.end(JSON.stringify(r))},We=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},gr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},P6=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=S6(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${ae(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=Kw(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Ma(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${ae(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ae(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ae(gv(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ae(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},zD=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},DD=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,HD)},ql=e=>{let t=mv.default.join(e.layout.installDir,"link-code.txt"),r=()=>Ce(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:cg(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let y=h.installVersion??r(),u=await i(),S=xb(u),b=h.updateFlash??null,f=Tb(b),w=A6(b,h.updateError??null);return kb({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:pr(y),installBundleVersionLabel:cg(y),prependBody:`${f}${w}${S}`,headerUpdateButtonHtml:Rb(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await qw(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:pv("An update is already running.")}),h.end();return}c=!0;try{let u=await Xw(),S=u.ok?"/?update=ok":pv(u.message);h.writeHead(303,{Location:S}),h.end()}catch(u){let S=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:pv(S)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",S=o(),b=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:S.installVersion,body:`<section class="card">
      <h1>${ae(y)}</h1>
      <p>${ae(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(b)},g=()=>{if(Vl.default.existsSync(t))return Vl.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return Vl.default.writeFileSync(t,h,"utf8"),h},A=$D.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",S=h.method??"GET";if(S==="OPTIONS"){y.writeHead(204,fv),y.end();return}if(!await Aw({method:S,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:kz(mv.default.dirname(e.layout.configPath)),readBody:gr,sendHtml:We,renderShell:n})){if(S==="GET"&&u==="/health"){let b=e.controllers.getStatus(),f=o();ge(y,200,{ok:!0,...b,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/status"){let b=o();ge(y,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/traffic"){ge(y,200,{entries:Ta(e.layout)});return}if(S==="DELETE"&&u==="/api/traffic"||S==="POST"&&u==="/api/traffic/clear"){if(GA(e.layout),S==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}ge(y,200,{ok:!0});return}if(S==="GET"&&u==="/api/trace"){ge(y,200,{entries:kp(e.layout)});return}if(S==="DELETE"&&u==="/api/trace"||S==="POST"&&u==="/api/trace/clear"){if(KA(e.layout),S==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}ge(y,200,{ok:!0});return}if(S==="POST"&&u==="/api/errors/clear"){JA(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(S==="GET"&&u==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let w=await ss({layout:e.layout,query:f,limit:20});ge(y,200,{chunks:w,query:f});return}ge(y,200,{chunks:ns(e.layout).slice(-50).reverse()});return}if(S==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(S==="GET"&&u==="/api/update-status"){let b=await i();ge(y,200,{ok:!0,...b});return}if((S==="GET"||S==="POST")&&u==="/api/update"){await d(y);return}if(S==="GET"&&u==="/"){let b=e.controllers.getStatus(),f=o(),w=Or(e.layout),v=Rp(e.layout.errorLogPath);We(y,await n({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:zD(h.url??void 0),updateError:DD(h.url??void 0),body:Ib({wsConnected:b.wsConnected,lastHeartbeatAt:b.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:ns(e.layout).length,trafficEntryCount:Ta(e.layout).length,wakeError:b.wakeError,errorLogByteSize:v.byteSize,errorLogExists:v.exists})}));return}if(S==="GET"&&u==="/task"){let b=e.controllers.getStatus(),f=o(),w=$(),v=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=v.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,C=v.searchParams.get("failed")==="1"?v.searchParams.get("error")?.trim()??"Task failed.":null,L=v.searchParams.get("runId");We(y,await n({title:"Task",activePath:"/task",installVersion:f.installVersion,body:bw({defaultWorkspace:w?.workspace??"",wsConnected:b.wsConnected,flashMessage:_,flashError:C,lastRunId:L})}));return}if(S==="POST"&&u==="/task/dispatch"){let b=await gr(h),f=new URLSearchParams(b),w=f.get("prompt")?.trim()??"",v=f.get("writerAgent")?.trim()??"claude-cli",_=f.get("projectFolder")?.trim()??"",C=await ev({prompt:w,writerAgent:v,..._.length>0?{projectFolderPath:_}:{}}),L=new URLSearchParams;C.ok?L.set("ok","1"):(L.set("failed","1"),C.errorMessage!==void 0&&L.set("error",C.errorMessage.slice(0,240))),C.agentRunId!==void 0&&L.set("runId",C.agentRunId),y.writeHead(303,{Location:`/task?${L.toString()}`}),y.end();return}if(S==="GET"&&u==="/writer-sessions"){let b=o(),f=og(e.layout,12);We(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:b.installVersion,updateFlash:zD(h.url??void 0),updateError:DD(h.url??void 0),body:Ew({sessions:f})}));return}if(S==="GET"&&u==="/errors"){let b=o(),f=Rp(e.layout.errorLogPath);We(y,await n({title:"Errors",activePath:"/errors",installVersion:b.installVersion,body:XA({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(S==="GET"&&u==="/status"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),w=we(e.layout),v=w!==null?je(w,12e4):tb(f.lastHeartbeatAt,12e4),_=rb({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:v}),C=o();We(y,await n({title:"Status",activePath:"/status",installVersion:C.installVersion,body:`${P6({status:f,healthBadge:_,revived:b.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:C.installBundleVersion,installBundleUpdatedAt:C.installBundleUpdatedAt})}${sb({installDir:e.layout.installDir})}${nb({entries:kp(e.layout)})}`}));return}if(S==="GET"&&u==="/traffic"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=Ta(e.layout),w=o(),v=f.map(L=>`<tr><td title="${ae(L.at)}">${ae(gv(L.at))}</td><td>${ae(L.direction)}</td><td><code>${ae(L.type)}</code></td><td>${ae(L.summary)}</td><td>${ae(L.action??"")}</td></tr>`).join(""),_=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${v}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',C=b.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";We(y,await n({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${C}
              ${_}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(S==="GET"&&u==="/projects"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=pr(f.installVersion),v=await pg(e.layout),_=b.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":null,C=$(),L=C===null?null:X({wsUrl:C.wsUrl,pairingToken:C.pairingToken}),x=L===null?{}:Object.fromEntries((await Promise.all(v.projects.map(async I=>{let M=await Bw(L,I.id);return[I.id,M?.counts??null]}))).filter(I=>I[1]!==null));We(y,await n({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:Gw({projects:v.projects,compositionCountsByProjectId:x,cloudAppOrigin:w,syncMessage:v.message,syncOk:v.ok,flashMessage:null,flashError:_})}));return}if(S==="GET"&&u==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=$(),v=w===null?null:X({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),_=f.length>0&&v!==null?Nr():null;if(_===null||v===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(qe({projectFolderPath:_}),!await ma(v,f,_)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(S==="GET"&&u==="/project"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=b.searchParams.get("id")?.trim()??"",w=o(),v=await pg(e.layout),_=To(v.projects,f);if(_===null){await p(y,"Project not found");return}let C=b.searchParams.get("linked")==="1"?b.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${b.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${b.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:b.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,L=b.searchParams.get("knowledgePromoted"),x=L!==null?`Marked ${L} lesson(s) as promoted in Agent Witch.`:null,I=b.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,M=b.searchParams.get("tab")?.trim()??"harness",oe=M==="workflows"||M==="agents"||M==="knowledge"?M:"harness",G=$(),F=G===null?null:X({wsUrl:G.wsUrl,pairingToken:G.pairingToken}),Qr=F===null?null:await Bw(F,_.id),D=0;if(F!==null)try{let be=await fetch(`${F.appOrigin}/api/agent-witch/projects/${encodeURIComponent(_.id)}/knowledge`,{method:"GET",headers:{[$e]:F.pairingToken},signal:AbortSignal.timeout(1e4)});if(be.ok){let $t=await be.json();typeof $t=="object"&&$t!==null&&typeof $t.candidateCount=="number"&&(D=$t.candidateCount)}}catch{D=0}We(y,await n({title:_.name,activePath:"/projects",installVersion:w.installVersion,body:Gn({project:_,installed:Or(e.layout),linkedSetSlugs:Tr(_.projectFolderPath),composition:Qr,knowledgeCandidateCount:D,activeTab:oe,flashMessage:C??x,flashError:I})}));return}if(S==="POST"&&u==="/projects/pull-bound-harness"){let b=await gr(h),f=await zS({rawBody:b,layout:e.layout});if(f.kind==="not_found"){await p(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let w=o();We(y,await n({title:f.title,activePath:"/projects",installVersion:w.installVersion,body:f.body}));return}if(S==="POST"&&u==="/projects/link-harness"){let b=await gr(h),f=new URLSearchParams(b),w=f.get("projectId")?.trim()??"",v=await pg(e.layout),_=To(v.projects,w);if(_===null){await p(y,"Project not found");return}let C=f.getAll("applySet").map(G=>String(G)),L=ea({layout:e.layout,projectFolderPath:_.projectFolderPath,setSlugs:C});if(!L.ok){let G=o();We(y,await n({title:_.name,activePath:"/projects",installVersion:G.installVersion,body:Gn({project:_,installed:Or(e.layout),linkedSetSlugs:Tr(_.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:L.errorMessage})}));return}let x=$(),I=x===null?null:X({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),M=I===null?!1:await ua(I,_.id,L.appliedSetSlugs),oe=new URLSearchParams({linked:"1",files:String(L.writtenFileCount),bindingsSynced:M?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(_.id)}&${oe.toString()}`}),y.end();return}if(S==="POST"&&u==="/project/knowledge/promote-all"){let b=await gr(h),w=new URLSearchParams(b).get("projectId")?.trim()??"",v=await pg(e.layout),_=To(v.projects,w);if(_===null){await p(y,"Project not found");return}let C=$(),L=C===null?null:X({wsUrl:C.wsUrl,pairingToken:C.pairingToken}),x=L===null?{ok:!1,promotedCount:0}:await hD(L,_.id),I=new URLSearchParams({tab:"knowledge",...x.ok?{knowledgePromoted:String(x.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(_.id)}&${I.toString()}`}),y.end();return}if(S==="GET"&&u==="/harness"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=na(e.layout),v=b.searchParams.get("submitted")==="1",_=v?b.searchParams.get("syncFailed")==="1"?`Local harness updated (${b.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:b.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${b.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":b.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:b.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,C=w?.scanRoots[0]??Fu(),L=y6(e.layout,{reveal:w,importQuery:b.searchParams.get("import")==="1",justSubmitted:v}),x=pr(f.installVersion);We(y,await n({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:Bl(uv(e.layout,{cloudAppOrigin:x,reveal:w,scanFolder:C,flashMessage:_,importSectionExpanded:L}))}));return}if(S==="POST"&&u==="/api/harness/pick-folder"){let b=Nr();if(b===null){ge(y,200,{cancelled:!0});return}ge(y,200,{path:b});return}if(S==="GET"&&u==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=Qi(f);if(w===null){ge(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let v=Vl.default.readFileSync(w,"utf8"),_=v.length>jD?`${v.slice(0,jD)}
\u2026 (truncated)`:v;ge(y,200,{content:_})}catch{ge(y,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&u==="/api/harness/reveal/add-project"){let b=await gr(h),f="";try{let _=JSON.parse(b);typeof _=="object"&&_!==null&&typeof _.projectPath=="string"&&(f=_.projectPath.trim())}catch{ge(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){ge(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=na(e.layout),v=SS({reveal:w,projectPath:f});if(v===null||v.sets.length===0){ge(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Vu(e.layout,v),ge(y,200,{ok:!0,setCount:v.sets.length});return}if(S==="GET"&&u==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){ge(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;h.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...fv});let v=AS({scanRoot:f,response:y,shouldAbort:()=>w});Vu(e.layout,v),y.end();return}if(S==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&u==="/harness/submit"){let b=na(e.layout);if(b===null){let x=o(),I=pr(x.installVersion);We(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Bl(uv(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await gr(h),w=new URLSearchParams(f),v=Uw(w,b),_=PS({layout:e.layout,sets:v});if(!_.ok){let x=o(),I=pr(x.installVersion);We(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Bl(uv(e.layout,{cloudAppOrigin:I,reveal:b,flashError:_.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}vS(e.layout);let L=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${_.writtenItemCount??0}${L}`}),y.end();return}if(S==="GET"&&u==="/writer-api"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),w=$()?.writerExecutionBackend??Re(void 0),v=Pe(e.layout.configPath),_=Cr(v),C=b.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,L=o();We(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:L.installVersion,body:Hw({writerExecutionBackend:w,secrets:_,flashMessage:C})}));return}if(S==="POST"&&u==="/writer-api"){let b=await gr(h),f=new URLSearchParams(b),w=f.get("writerExecutionBackend")?.trim()??"cli";ky({configPath:e.layout.configPath,writerExecutionBackend:Re(w),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(S==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(S==="GET"&&u==="/history"){let b=o();We(y,await n({title:"History",activePath:"/history",installVersion:b.installVersion,body:Lw({reportsDir:e.layout.reportsDir})}));return}if(S==="GET"&&u==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=o(),v=pb({layout:e.layout}),_=fb(v),C=f.length>0?await ss({layout:e.layout,query:f,limit:20}):ns(e.layout).slice(-50).reverse(),L=C.map(I=>{let M=gb(v,I.id),oe=M>0?` \xB7 used in ${M} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ae(I.createdAt)}">${ae(gv(I.createdAt))}${I.source?` \xB7 ${ae(I.source)}`:""}${oe}</div><pre>${ae(I.text)}</pre></article>`}).join(""),x=_.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${_.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${ae(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";We(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ae(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${x}${L}${b6(f,C.length)}`}));return}S==="POST"&&await gr(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return A.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),A.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${qt}`)}),A},Kl=e=>ug(e).publicKeyRaw});var mg=l(()=>{"use strict";z0();D0();FD()});var BD={};wt(BD,{runAgentWitchExternalLiveCli:()=>v6});var hv,UD,w6,v6,GD=l(()=>{"use strict";hv=m(require("node:fs")),UD=m(require("node:path"));Kn();V();te();mg();te();w6=e=>{let t=UD.default.join(e,"link-code.txt");if(!hv.default.existsSync(t))return null;let r=hv.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},v6=()=>{Be("agent-witch-live");let e=E(),t=N(),r=w6(e),o=Kl(t);ql({layout:t,controllers:{getStatus:()=>{let n=we(t);return{wsConnected:wa(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{uo(e)}}})}});var fr=W((MEe,KD)=>{"use strict";var VD=["nodebuffer","arraybuffer","fragments"],qD=typeof Blob<"u";qD&&VD.push("blob");KD.exports={BINARY_TYPES:VD,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:qD,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Jl=W((NEe,gg)=>{"use strict";var{EMPTY_BUFFER:_6}=fr(),yv=Buffer[Symbol.species];function W6(e,t){if(e.length===0)return _6;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new yv(r.buffer,r.byteOffset,o):r}function JD(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function YD(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function L6(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Sv(e){if(Sv.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new yv(e):ArrayBuffer.isView(e)?t=new yv(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Sv.readOnly=!1),t}gg.exports={concat:W6,mask:JD,toArrayBuffer:L6,toBuffer:Sv,unmask:YD};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");gg.exports.mask=function(t,r,o,n,s){s<48?JD(t,r,o,n,s):e.mask(t,r,o,n,s)},gg.exports.unmask=function(t,r){t.length<32?YD(t,r):e.unmask(t,r)}}catch{}});var QD=W((jEe,ZD)=>{"use strict";var XD=Symbol("kDone"),Av=Symbol("kRun"),bv=class{constructor(t){this[XD]=()=>{this.pending--,this[Av]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Av]()}[Av](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[XD])}}};ZD.exports=bv});var Is=W((zEe,o$)=>{"use strict";var Yl=require("zlib"),e$=Jl(),E6=QD(),{kStatusCode:t$}=fr(),C6=Buffer[Symbol.species],k6=Buffer.from([0,0,255,255]),hg=Symbol("permessage-deflate"),hr=Symbol("total-length"),xs=Symbol("callback"),Jr=Symbol("buffers"),Ts=Symbol("error"),fg,Pv=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!fg){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;fg=new E6(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[xs];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!n.client_max_window_bits));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){fg.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){fg.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Yl.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Yl.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[hg]=this,this._inflate[hr]=0,this._inflate[Jr]=[],this._inflate.on("error",x6),this._inflate.on("data",r$)}this._inflate[xs]=o,this._inflate.write(t),r&&this._inflate.write(k6),this._inflate.flush(()=>{let s=this._inflate[Ts];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=e$.concat(this._inflate[Jr],this._inflate[hr]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[hr]=0,this._inflate[Jr]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Yl.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Yl.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[hr]=0,this._deflate[Jr]=[],this._deflate.on("data",R6)}this._deflate[xs]=o,this._deflate.write(t),this._deflate.flush(Yl.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=e$.concat(this._deflate[Jr],this._deflate[hr]);r&&(s=new C6(s.buffer,s.byteOffset,s.length-4)),this._deflate[xs]=null,this._deflate[hr]=0,this._deflate[Jr]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};o$.exports=Pv;function R6(e){this[Jr].push(e),this[hr]+=e.length}function r$(e){if(this[hr]+=e.length,this[hg]._maxPayload<1||this[hr]<=this[hg]._maxPayload){this[Jr].push(e);return}this[Ts]=new RangeError("Max payload size exceeded"),this[Ts].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Ts][t$]=1009,this.removeListener("data",r$),this.reset()}function x6(e){if(this[hg]._inflate=null,this[Ts]){this[xs](this[Ts]);return}e[t$]=1007,this[xs](e)}});var Os=W((DEe,yg)=>{"use strict";var{isUtf8:n$}=require("buffer"),{hasBlob:T6}=fr(),I6=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function O6(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function wv(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function M6(e){return T6&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}yg.exports={isBlob:M6,isValidStatusCode:O6,isValidUTF8:wv,tokenChars:I6};if(n$)yg.exports.isValidUTF8=function(e){return e.length<24?wv(e):n$(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");yg.exports.isValidUTF8=function(t){return t.length<32?wv(t):e(t)}}catch{}});var Ev=W(($Ee,u$)=>{"use strict";var{Writable:N6}=require("stream"),s$=Is(),{BINARY_TYPES:j6,EMPTY_BUFFER:i$,kStatusCode:z6,kWebSocket:D6}=fr(),{concat:vv,toArrayBuffer:$6,unmask:H6}=Jl(),{isValidStatusCode:F6,isValidUTF8:a$}=Os(),Sg=Buffer[Symbol.species],st=0,l$=1,c$=2,d$=3,_v=4,Wv=5,Ag=6,Lv=class extends N6{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||j6[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[D6]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=st}_write(t,r,o){if(this._opcode===8&&this._state==st)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new Sg(o.buffer,o.byteOffset+t,o.length-t),new Sg(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new Sg(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case st:this.getInfo(t);break;case l$:this.getPayloadLength16(t);break;case c$:this.getPayloadLength64(t);break;case d$:this.getMask();break;case _v:this.getData(t);break;case Wv:case Ag:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[s$.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=l$:this._payloadLength===127?this._state=c$:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=d$:this._state=_v}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=_v}getData(t){let r=i$;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&H6(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=Wv,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[s$.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===st&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=st;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=vv(o,r):this._binaryType==="arraybuffer"?n=$6(vv(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=st):(this._state=Ag,setImmediate(()=>{this.emit("message",n,!0),this._state=st,this.startLoop(t)}))}else{let n=vv(o,r);if(!this._skipUTF8Validation&&!a$(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===Wv||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=st):(this._state=Ag,setImmediate(()=>{this.emit("message",n,!1),this._state=st,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,i$),this.end();else{let o=t.readUInt16BE(0);if(!F6(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new Sg(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!a$(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=st;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=st):(this._state=Ag,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=st,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[z6]=n,i}};u$.exports=Lv});var Rv=W((FEe,g$)=>{"use strict";var{Duplex:HEe}=require("stream"),{randomFillSync:U6}=require("crypto"),{types:{isUint8Array:B6}}=require("util"),p$=Is(),{EMPTY_BUFFER:G6,kWebSocket:V6,NOOP:q6}=fr(),{isBlob:Ms,isValidStatusCode:K6}=Os(),{mask:m$,toBuffer:sn}=Jl(),it=Symbol("kByteLength"),J6=Buffer.alloc(4),bg=8*1024,an,Ns=bg,Pt=0,Y6=1,X6=2,Cv=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Pt,this.onerror=q6,this[V6]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||J6,r.generateMask?r.generateMask(o):(Ns===bg&&(an===void 0&&(an=Buffer.alloc(bg)),U6(an,0,bg),Ns=0),o[0]=an[Ns++],o[1]=an[Ns++],o[2]=an[Ns++],o[3]=an[Ns++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[it]!==void 0?a=r[it]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(m$(t,o,d,s,a),[d]):(m$(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=G6;else{if(typeof t!="number"||!K6(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(B6(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[it]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Pt?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Ms(t)?(n=t.size,s=!1):(t=sn(t),n=t.length,s=sn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[it]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Ms(t)?this._state!==Pt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Pt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Ms(t)?(n=t.size,s=!1):(t=sn(t),n=t.length,s=sn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[it]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Ms(t)?this._state!==Pt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Pt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[p$.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Ms(t)?(a=t.size,c=!1):(t=sn(t),a=t.length,c=sn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[it]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Ms(t)?this._state!==Pt?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Pt?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[it],this._state=X6,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(kv,this,a,n);return}this._bufferedBytes-=o[it];let i=sn(s);r?this.dispatch(i,r,o,n):(this._state=Pt,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(Z6,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[p$.extensionName];this._bufferedBytes+=o[it],this._state=Y6,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");kv(this,c,n);return}this._bufferedBytes-=o[it],this._state=Pt,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Pt&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][it],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][it],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};g$.exports=Cv;function kv(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function Z6(e,t,r){kv(e,t,r),e.onerror(t)}});var v$=W((UEe,w$)=>{"use strict";var{kForOnEventAttribute:Xl,kListener:xv}=fr(),f$=Symbol("kCode"),h$=Symbol("kData"),y$=Symbol("kError"),S$=Symbol("kMessage"),A$=Symbol("kReason"),js=Symbol("kTarget"),b$=Symbol("kType"),P$=Symbol("kWasClean"),yr=class{constructor(t){this[js]=null,this[b$]=t}get target(){return this[js]}get type(){return this[b$]}};Object.defineProperty(yr.prototype,"target",{enumerable:!0});Object.defineProperty(yr.prototype,"type",{enumerable:!0});var ln=class extends yr{constructor(t,r={}){super(t),this[f$]=r.code===void 0?0:r.code,this[A$]=r.reason===void 0?"":r.reason,this[P$]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[f$]}get reason(){return this[A$]}get wasClean(){return this[P$]}};Object.defineProperty(ln.prototype,"code",{enumerable:!0});Object.defineProperty(ln.prototype,"reason",{enumerable:!0});Object.defineProperty(ln.prototype,"wasClean",{enumerable:!0});var zs=class extends yr{constructor(t,r={}){super(t),this[y$]=r.error===void 0?null:r.error,this[S$]=r.message===void 0?"":r.message}get error(){return this[y$]}get message(){return this[S$]}};Object.defineProperty(zs.prototype,"error",{enumerable:!0});Object.defineProperty(zs.prototype,"message",{enumerable:!0});var Zl=class extends yr{constructor(t,r={}){super(t),this[h$]=r.data===void 0?null:r.data}get data(){return this[h$]}};Object.defineProperty(Zl.prototype,"data",{enumerable:!0});var Q6={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[Xl]&&n[xv]===t&&!n[Xl])return;let o;if(e==="message")o=function(s,i){let a=new Zl("message",{data:i?s:s.toString()});a[js]=this,Pg(t,this,a)};else if(e==="close")o=function(s,i){let a=new ln("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[js]=this,Pg(t,this,a)};else if(e==="error")o=function(s){let i=new zs("error",{error:s,message:s.message});i[js]=this,Pg(t,this,i)};else if(e==="open")o=function(){let s=new yr("open");s[js]=this,Pg(t,this,s)};else return;o[Xl]=!!r[Xl],o[xv]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[xv]===t&&!r[Xl]){this.removeListener(e,r);break}}};w$.exports={CloseEvent:ln,ErrorEvent:zs,Event:yr,EventTarget:Q6,MessageEvent:Zl};function Pg(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var wg=W((BEe,_$)=>{"use strict";var{tokenChars:Ql}=Os();function zt(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function eJ(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(p===-1&&Ql[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);d===44?(zt(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(p===-1&&Ql[d]===1)c===-1&&(c=g);else if(d===32||d===9)p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g),zt(r,e.slice(c,p),!0),d===44&&(zt(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,g),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(n){if(Ql[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:o||(o=!0),n=!1}else if(s)if(Ql[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,p=g;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(p===-1&&Ql[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))p===-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);o&&(h=h.replace(/\\/g,""),o=!1),zt(r,a,h),d===44&&(zt(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=g);let A=e.slice(c,p);return i===void 0?zt(t,A,r):(a===void 0?zt(r,A,!0):o?zt(r,a,A.replace(/\\/g,"")):zt(r,a,A),zt(t,i,r)),t}function tJ(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}_$.exports={format:tJ,parse:eJ}});var Lg=W((qEe,N$)=>{"use strict";var rJ=require("events"),oJ=require("https"),nJ=require("http"),E$=require("net"),sJ=require("tls"),{randomBytes:iJ,createHash:aJ}=require("crypto"),{Duplex:GEe,Readable:VEe}=require("stream"),{URL:Tv}=require("url"),Yr=Is(),lJ=Ev(),cJ=Rv(),{isBlob:dJ}=Os(),{BINARY_TYPES:W$,CLOSE_TIMEOUT:uJ,EMPTY_BUFFER:vg,GUID:pJ,kForOnEventAttribute:Iv,kListener:mJ,kStatusCode:gJ,kWebSocket:Ae,NOOP:C$}=fr(),{EventTarget:{addEventListener:fJ,removeEventListener:hJ}}=v$(),{format:yJ,parse:SJ}=wg(),{toBuffer:AJ}=Jl(),k$=Symbol("kAborted"),Ov=[8,13],Sr=["CONNECTING","OPEN","CLOSING","CLOSED"],bJ=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,J=class e extends rJ{constructor(t,r,o){super(),this._binaryType=W$[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=vg,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,r=[]):r=[r]),R$(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){W$.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new lJ({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new cJ(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[Ae]=this,s[Ae]=this,t[Ae]=this,n.on("conclude",vJ),n.on("drain",_J),n.on("error",WJ),n.on("message",LJ),n.on("ping",EJ),n.on("pong",CJ),s.onerror=kJ,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",I$),t.on("data",Wg),t.on("end",O$),t.on("error",M$),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Yr.extensionName]&&this._extensions[Yr.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ze(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),T$(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Mv(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||vg,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Mv(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||vg,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Mv(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Yr.extensionName]||(n.compress=!1),this._sender.send(t||vg,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ze(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(J,"CONNECTING",{enumerable:!0,value:Sr.indexOf("CONNECTING")});Object.defineProperty(J.prototype,"CONNECTING",{enumerable:!0,value:Sr.indexOf("CONNECTING")});Object.defineProperty(J,"OPEN",{enumerable:!0,value:Sr.indexOf("OPEN")});Object.defineProperty(J.prototype,"OPEN",{enumerable:!0,value:Sr.indexOf("OPEN")});Object.defineProperty(J,"CLOSING",{enumerable:!0,value:Sr.indexOf("CLOSING")});Object.defineProperty(J.prototype,"CLOSING",{enumerable:!0,value:Sr.indexOf("CLOSING")});Object.defineProperty(J,"CLOSED",{enumerable:!0,value:Sr.indexOf("CLOSED")});Object.defineProperty(J.prototype,"CLOSED",{enumerable:!0,value:Sr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(J.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(J.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[Iv])return t[mJ];return null},set(t){for(let r of this.listeners(e))if(r[Iv]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[Iv]:!0})}})});J.prototype.addEventListener=fJ;J.prototype.removeEventListener=hJ;N$.exports=J;function R$(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:uJ,protocolVersion:Ov[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!Ov.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${Ov.join(", ")})`);let s;if(t instanceof Tv)s=t;else try{s=new Tv(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;_g(e,u);return}let d=i?443:80,p=iJ(16).toString("base64"),g=i?oJ.request:nJ.request,A=new Set,h;if(n.createConnection=n.createConnection||(i?wJ:PJ),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new Yr({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=yJ({[Yr.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!bJ.test(u)||A.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");A.add(u)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let u=n.path.split(":");n.socketPath=u[0],n.path=u[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let u=o&&o.headers;if(o={...o,headers:{}},u)for(let[S,b]of Object.entries(u))o.headers[S.toLowerCase()]=b}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,u||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=g(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=g(n);n.timeout&&y.on("timeout",()=>{Ze(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[k$]||(y=e._req=null,_g(e,u))}),y.on("response",u=>{let S=u.headers.location,b=u.statusCode;if(S&&n.followRedirects&&b>=300&&b<400){if(++e._redirects>n.maxRedirects){Ze(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new Tv(S,t)}catch{let v=new SyntaxError(`Invalid URL: ${S}`);_g(e,v);return}R$(e,f,r,o)}else e.emit("unexpected-response",y,u)||Ze(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,S,b)=>{if(e.emit("upgrade",u),e.readyState!==J.CONNECTING)return;y=e._req=null;let f=u.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){Ze(e,S,"Invalid Upgrade header");return}let w=aJ("sha1").update(p+pJ).digest("base64");if(u.headers["sec-websocket-accept"]!==w){Ze(e,S,"Invalid Sec-WebSocket-Accept header");return}let v=u.headers["sec-websocket-protocol"],_;if(v!==void 0?A.size?A.has(v)||(_="Server sent an invalid subprotocol"):_="Server sent a subprotocol but none was requested":A.size&&(_="Server sent no subprotocol"),_){Ze(e,S,_);return}v&&(e._protocol=v);let C=u.headers["sec-websocket-extensions"];if(C!==void 0){if(!h){Ze(e,S,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let L;try{L=SJ(C)}catch{Ze(e,S,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(L);if(x.length!==1||x[0]!==Yr.extensionName){Ze(e,S,"Server indicated an extension that was not requested");return}try{h.accept(L[Yr.extensionName])}catch{Ze(e,S,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Yr.extensionName]=h}e.setSocket(S,b,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function _g(e,t){e._readyState=J.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function PJ(e){return e.path=e.socketPath,E$.connect(e)}function wJ(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=E$.isIP(e.host)?"":e.host),sJ.connect(e)}function Ze(e,t,r){e._readyState=J.CLOSING;let o=new Error(r);Error.captureStackTrace(o,Ze),t.setHeader?(t[k$]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(_g,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function Mv(e,t,r){if(t){let o=dJ(t)?t.size:AJ(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${Sr[e.readyState]})`);process.nextTick(r,o)}}function vJ(e,t){let r=this[Ae];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[Ae]!==void 0&&(r._socket.removeListener("data",Wg),process.nextTick(x$,r._socket),e===1005?r.close():r.close(e,t))}function _J(){let e=this[Ae];e.isPaused||e._socket.resume()}function WJ(e){let t=this[Ae];t._socket[Ae]!==void 0&&(t._socket.removeListener("data",Wg),process.nextTick(x$,t._socket),t.close(e[gJ])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function L$(){this[Ae].emitClose()}function LJ(e,t){this[Ae].emit("message",e,t)}function EJ(e){let t=this[Ae];t._autoPong&&t.pong(e,!this._isServer,C$),t.emit("ping",e)}function CJ(e){this[Ae].emit("pong",e)}function x$(e){e.resume()}function kJ(e){let t=this[Ae];t.readyState!==J.CLOSED&&(t.readyState===J.OPEN&&(t._readyState=J.CLOSING,T$(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function T$(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function I$(){let e=this[Ae];if(this.removeListener("close",I$),this.removeListener("data",Wg),this.removeListener("end",O$),e._readyState=J.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[Ae]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",L$),e._receiver.on("finish",L$))}function Wg(e){this[Ae]._receiver.write(e)||this.pause()}function O$(){let e=this[Ae];e._readyState=J.CLOSING,e._receiver.end(),this.end()}function M$(){let e=this[Ae];this.removeListener("error",M$),this.on("error",C$),e&&(e._readyState=J.CLOSING,this.destroy())}});var $$=W((JEe,D$)=>{"use strict";var KEe=Lg(),{Duplex:RJ}=require("stream");function j$(e){e.emit("close")}function xJ(){!this.destroyed&&this._writableState.finished&&this.destroy()}function z$(e){this.removeListener("error",z$),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function TJ(e,t){let r=!0,o=new RJ({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(j$,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(j$,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",xJ),o.on("error",z$),o}D$.exports=TJ});var Nv=W((YEe,H$)=>{"use strict";var{tokenChars:IJ}=Os();function OJ(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&IJ[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}H$.exports={parse:OJ}});var K$=W((ZEe,q$)=>{"use strict";var MJ=require("events"),Eg=require("http"),{Duplex:XEe}=require("stream"),{createHash:NJ}=require("crypto"),F$=wg(),cn=Is(),jJ=Nv(),zJ=Lg(),{CLOSE_TIMEOUT:DJ,GUID:$J,kWebSocket:HJ}=fr(),FJ=/^[+/0-9A-Za-z]{22}==$/,U$=0,B$=1,V$=2,jv=class extends MJ{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:DJ,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:zJ,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Eg.createServer((o,n)=>{let s=Eg.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=UJ(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=U$}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===V$){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(ec,this);return}if(t&&this.once("close",t),this._state!==B$)if(this._state=B$,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(ec,this):process.nextTick(ec,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{ec(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",G$);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){dn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){dn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!FJ.test(s)){dn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){dn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){tc(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=jJ.parse(c)}catch{dn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&p!==void 0){let A=new cn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=F$.parse(p);h[cn.extensionName]&&(A.accept(h[cn.extensionName]),g[cn.extensionName]=A)}catch{dn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let A={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(A,(h,y,u,S)=>{if(!h)return tc(r,y||401,u,S);this.completeUpgrade(g,s,d,t,r,o,n)});return}if(!this.options.verifyClient(A))return tc(r,401)}this.completeUpgrade(g,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[HJ])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>U$)return tc(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${NJ("sha1").update(r+$J).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let g=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),p._protocol=g)}if(t[cn.extensionName]){let g=t[cn.extensionName].params,A=F$.format({[cn.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${A}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",G$),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(ec,this)})),a(p,n)}};q$.exports=jv;function UJ(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function ec(e){e._state=V$,e.emit("close")}function G$(){this.destroy()}function tc(e,t,r,o){r=r||Eg.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Eg.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function dn(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,dn),e.emit("wsClientError",i,r,t)}else tc(r,o,n,s)}});var BJ,GJ,VJ,qJ,KJ,JJ,J$,YJ,rc,Y$=l(()=>{BJ=m($$(),1),GJ=m(wg(),1),VJ=m(Is(),1),qJ=m(Ev(),1),KJ=m(Rv(),1),JJ=m(Nv(),1),J$=m(Lg(),1),YJ=m(K$(),1),rc=J$.default});var zv,Dv,$v=l(()=>{"use strict";zv="AGENT_WITCH_EXTERNAL_BRIDGE",Dv="AGENT_WITCH_EXTERNAL_LIVE"});var Hv,X$=l(()=>{"use strict";Hv=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var XJ,Fv,Z$=l(()=>{"use strict";$v();X$();XJ=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",Fv=(e={})=>{let t=e.env??process.env,r=Hv(t[zv]),o=Hv(t[Dv]);return{mode:XJ(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var Q$=l(()=>{"use strict";$v()});var eH=l(()=>{"use strict";Z$();Q$()});var Uv=l(()=>{"use strict"});var Ar,oc=l(()=>{"use strict";Ar=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Ds,un,tH,QJ,Bv,Gv,rH,oH,Vv,nH,nc,qv=l(()=>{"use strict";Ds=m(require("node:fs")),un=m(require("node:os")),tH=m(require("node:path"));Uv();oc();QJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Bv=(e=un.default.hostname())=>tH.default.join(un.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),Gv=e=>{if(!Ds.default.existsSync(e))return null;try{let t=JSON.parse(Ds.default.readFileSync(e,"utf8"));return!QJ(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},rH=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},oH=(e,t)=>{Ds.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Vv=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Bv(),o=Gv(r);if(o!==null&&o.pid!==process.pid&&Ar(o.pid)&&rH(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:un.default.hostname(),macOsUsername:un.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return oH(r,n),{ok:!0}},nH=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Bv(),o=Gv(r);return o!==null&&o.pid!==process.pid&&Ar(o.pid)&&rH(o)?{ok:!1}:(oH(r,{hostname:un.default.hostname(),macOsUsername:un.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},nc=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??Bv();Gv(r)?.pid===process.pid&&Ds.default.existsSync(r)&&Ds.default.unlinkSync(r)}});var Kv,sc,e7,t7,r7,o7,Jv,sH=l(()=>{"use strict";Kv=require("node:child_process"),sc=m(require("node:path"));oc();Bd();e7=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),t7=(e,t)=>{if(e7(e)||!/\bnode\b/.test(e))return!1;let r=sc.default.resolve(t),o=sc.default.join(r,"app",mi),n=sc.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===mi||i==="agent-witch.ts")return e.includes(r);try{let a=sc.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},r7=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,Kv.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},o7=(e,t,r)=>{let o=r7(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||t7(d,t)&&n.push(c)}return n},Jv=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,Kv.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=o7(r,e.installDir,t),n=[];for(let s of o)if(Ar(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var ic,ac,iH,n7,Yv,aH=l(()=>{"use strict";ic=m(require("node:fs")),ac=m(require("node:path"));Ee();iH=(e,t)=>{!ic.default.existsSync(e)||ic.default.existsSync(t)||(ic.default.mkdirSync(ac.default.dirname(t),{recursive:!0}),ic.default.renameSync(e,t))},n7=e=>{if(e.profileEmail===null)return;let t=ac.default.join(e.installDir,lt);iH(ac.default.join(t,Sn),e.mainLogPath),iH(ac.default.join(t,An),e.errorLogPath)},Yv=e=>{let t=N();e!==void 0&&t.installDir!==e||n7(t)}});var lH=l(()=>{"use strict";ka();Ep();Ep();!Ge()&&fo(__agentWitchImportMetaUrl)&&(async()=>{Be("agent-witch-wake-server");let e=await No(),t=Gt(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var cH=l(()=>{"use strict";lH()});var dH=l(()=>{"use strict";fa()});var Xv,uH=l(()=>{"use strict";Uv();cH();qv();dH();Xv=async(e={})=>{let t=e.skipInProcessBridge?null:await Lp();sp();let r=setInterval(()=>{sp()},6e4),o=setInterval(()=>{if(!nH().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var lc,Cg,a7,pH,mH,kg,gH,fH,Zv,hH,Rg,yH=l(()=>{"use strict";lc=m(require("node:fs")),Cg=m(require("node:path")),a7="pending-run-inputs.json",pH=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mH=e=>{let t=e.profileEmail?Cg.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Cg.default.join(t,a7)},kg=e=>{let t=mH(e);if(!lc.default.existsSync(t))return{};try{let r=JSON.parse(lc.default.readFileSync(t,"utf8"));return pH(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!pH(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},gH=(e,t)=>{let r=mH(e);lc.default.mkdirSync(Cg.default.dirname(r),{recursive:!0}),lc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},fH=e=>Object.values(kg(e)),Zv=(e,t)=>kg(e)[t]!==void 0,hH=(e,t)=>{let r=kg(e);r[t.agentRunId]=t,gH(e,r)},Rg=(e,t)=>{let r=kg(e);delete r[t],gH(e,r)}});var xg=l(()=>{"use strict";de()});var SH=l(()=>{"use strict";de()});var Tg=l(()=>{"use strict";de()});var Ig=l(()=>{"use strict";de()});var cc=l(()=>{"use strict";de()});var l7,c7,dc,Qv=l(()=>{"use strict";mt();xg();SH();Tg();Ig();cc();l7={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},c7={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},dc=e=>{if(!le(e.writerAgent))return"the selected writer";let t=Ve(e.writerAgent);if(Re(e.writerExecutionBackend)==="api"&&t!==null){let r=De(Pe(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Oi(t,r.model);return`${c7[t]} model ${o}`}}return l7[e.writerAgent]}});var d7,u7,AH,bH,PH=l(()=>{"use strict";d7=/"input_tokens"\s*:\s*(\d+)/,u7=/"output_tokens"\s*:\s*(\d+)/,AH=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},bH=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=AH(d7.exec(t)),o=AH(u7.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var Og=l(()=>{"use strict";ht()});var uc,Mg,p7,e_,wH,vH,_H,t_,WH=l(()=>{"use strict";uc=m(require("node:fs")),Mg=m(require("node:path"));Og();p7="run-completion-outbox.json",e_=e=>{let t=e.profileEmail?Mg.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Mg.default.join(t,p7)},wH=e=>{let t=e_(e);if(!uc.default.existsSync(t))return[];try{let r=JSON.parse(uc.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},vH=(e,t)=>{uc.default.mkdirSync(Mg.default.dirname(e_(e)),{recursive:!0}),uc.default.writeFileSync(e_(e),JSON.stringify(t,null,2),"utf8")},_H=(e,t)=>{let r=[...wH(e).filter(o=>o.runId!==t.runId),t];vH(e,r)},t_=async e=>{if(e.cloudApi===null)return;let t=wH(e.layout);if(t.length===0)return;let r=[];for(let o of t)await ca(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);vH(e.layout,r)}});var LH=l(()=>{"use strict"});var r_,pc,g7,pn,EH=l(()=>{"use strict";LH();r_=new Map,pc=e=>{let t=r_.get(e);t!==void 0&&(clearInterval(t),r_.delete(e))},g7=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},pn=(e,t,r,o={})=>{pc(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){pc(t);return}let i=o.onTick?.()??{};g7(e,t,n,i)};s(),r_.set(t,setInterval(s,15e3))}});var CH=l(()=>{"use strict";ht()});var kH,RH=l(()=>{"use strict";CH();kH=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:et(t)}});var o_,mc,br,n_,Dt,xH,Ng=l(()=>{"use strict";o_=new Set,mc=new Map,br=(e,t)=>{if(t.length===0)return;let r=mc.get(e)??[];r.push(t),mc.set(e,r)},n_=e=>{o_.add(e);let t=mc.get(e)??[];return mc.delete(e),t},Dt=e=>o_.has(e),xH=e=>{o_.delete(e),mc.delete(e)}});var $s,TH,IH,OH=l(()=>{"use strict";$s=m(require("node:path")),TH=require("node:url");go();IH=()=>{if(Ge()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?$s.default.dirname($s.default.resolve(e)):$s.default.dirname($s.default.resolve(__filename))}return $s.default.dirname((0,TH.fileURLToPath)(__agentWitchImportMetaUrl))}});var MH,NH,jH,zH,Ue,Hs,DH,$H,Fs,s_,i_,a_,HH,l_,FH,jg=l(()=>{"use strict";MH=require("node:crypto"),NH=m(require("node:fs")),jH=m(require("node:path")),zH=require("node:url");oc();go();OH();Ue=new Map,DH=async()=>{if(Hs!==void 0)return Hs;try{if(Ge()){let e=IH(),t=jH.default.join(e,"deps","node-pty","lib","index.js");if(NH.default.existsSync(t)){let r=await import((0,zH.pathToFileURL)(t).href);return Hs=r,r}}return Hs=await import("node-pty"),Hs}catch{return Hs=null,null}},$H=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Fs=(e,t,r)=>{let o=Ue.get(e);if(o!==void 0){Ue.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},s_=(e,t)=>{let r=Ue.get(e);return r===void 0?!1:(r.pty.write(t),!0)},i_=(e,t,r)=>{let o=Ue.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},a_=e=>{for(let t of Ue.values())if(!(t.mode!=="agent"||t.runId!==e))return Ar(t.pty.pid);return!1},HH=e=>{for(let[t,r]of Ue.entries())if(!(r.mode!=="agent"||r.runId!==e)){Ue.delete(t);try{r.pty.kill()}catch{}return!0}return!1},l_=async e=>{let t=await DH();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;Ue.get(e.shellSessionId)!==void 0&&Fs(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return Ue.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{$H(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{Ue.get(e.shellSessionId)?.pty===n&&(Ue.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},FH=async e=>{let t=e.shellSessionId??(0,MH.randomUUID)(),r=await DH();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return Ue.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{$H(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{Ue.get(t)?.pty===o&&(Ue.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var zg,UH,BH=l(()=>{"use strict";zg="[[AWAITING_INPUT]]",UH=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",zg,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var gc,GH,Dg=l(()=>{"use strict";BH();gc=e=>{let t=e.indexOf(zg);if(t<0)return null;let o=e.slice(t+zg.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},GH=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",UH].join(`
`)});var VH,qH=l(()=>{"use strict";Ng();jg();Dg();VH=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(Dt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}br(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await FH({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=gc(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var KH,JH,YH,Pr,$g=l(()=>{"use strict";KH=require("node:child_process"),JH=m(require("node:fs")),YH=m(require("node:path"));Bd();Pr=(e,t)=>{let r=YH.default.join(e,"app",bE,"ensure-writer.sh");return JH.default.existsSync(r)?new Promise((o,n)=>{let s=(0,KH.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{n(i)}),s.on("close",i=>{if(i===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var XH,mn,hc,Hg,c_,fc,Fg,Ug,d_,u_,f7,Us,h7,y7,p_,m_=l(()=>{"use strict";XH=require("node:child_process");mt();$g();Tg();xg();cc();Ig();mn=new Map,hc=e=>e==="cursor"||e==="antigravity",Hg=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",c_=e=>mn.get(e)?.warmed===!0,fc=e=>{let t=mn.get(e);mn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Fg=e=>mn.get(e)?.conversationStarted===!0,Ug=e=>{let t=mn.get(e);mn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},d_=e=>{mn.delete(e)},u_=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",f7={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Us=e=>`${f7[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,h7=(e,t,r,o)=>new Promise(n=>{let s=ou(t,r),i=[],a=(0,XH.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),y7=(e,t)=>{let r=Us(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},p_=async e=>{if(!le(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Re(e.runConfig.writerExecutionBackend)==="api"){let r=Ve(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Pe(e.runConfig.layout.configPath);return De(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),fc(e.writerAgent),{exitCode:0,output:Us(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Pr(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}hc(e.writerAgent)&&fc(e.writerAgent);let t=await h7(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?y7(e.writerAgent,t.output):Us(e.writerAgent)}}});var gn,g_=l(()=>{"use strict";gn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var ZH,S7,A7,QH,b7,f_,eF=l(()=>{"use strict";g_();ZH=/you(?:'|')ve hit your session limit/i,S7=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],A7=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,QH=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},b7=e=>{let t=A7.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},f_=e=>{let t=e.trim();if(t.length===0)return null;if(ZH.test(t))return{code:gn.SESSION_LIMIT,resetHint:b7(t),matchedLine:QH(t,ZH)};for(let r of S7)if(r.test(t))return{code:gn.PROVIDER_QUOTA,resetHint:null,matchedLine:QH(t,r)};return null}});var Bg,Gg,h_,y_=l(()=>{"use strict";Bg="[[AGENT_RUN_WRITER_EXECUTION]]",Gg="cli-writer-api-key-missing",h_="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var S_=l(()=>{"use strict";y_()});var tF=l(()=>{"use strict";S_()});var Vg=l(()=>{"use strict";g_();eF();y_();S_();tF()});var qg,rF=l(()=>{"use strict";qg={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var oF,nF=l(()=>{"use strict";oF="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var sF,iF=l(()=>{"use strict";Vg();nF();sF=e=>e.code===gn.SESSION_LIMIT?oF:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var aF,lF=l(()=>{"use strict";Vg();rF();iF();aF=e=>{let t=f_(e.output);return t!==null?{status:qg.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:sF(t)}:{status:e.exitCode===0?qg.COMPLETED:qg.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var A_,iRe,cF=l(()=>{"use strict";A_={OPEN:"open",APPROVAL:"approval"},iRe=A_.APPROVAL});var Bs,Kg,dF,v7,uF,pF,mF,yc,b_,P_=l(()=>{"use strict";Bs=m(require("node:fs")),Kg=m(require("node:path")),dF="runs",v7=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),uF=e=>{let t=e.profileEmail!==null?Kg.default.join(e.installDir,"profiles",e.profileEmail,dF):Kg.default.join(e.installDir,dF);return Bs.default.mkdirSync(t,{recursive:!0}),t},pF=(e,t)=>Kg.default.join(uF(e),`${t}.json`),mF=(e,t)=>{Bs.default.writeFileSync(pF(e,t.id),JSON.stringify(t,null,2))},yc=(e,t)=>{let r=pF(e,t);if(!Bs.default.existsSync(r))return null;try{let o=JSON.parse(Bs.default.readFileSync(r,"utf8"));return!v7(o)||typeof o.id!="string"?null:o}catch{return null}},b_=e=>{let t=uF(e),r=Bs.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=yc(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var _7,gF,fF=l(()=>{"use strict";lF();cF();P_();_7=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=aF({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:A_.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},gF=(e,t)=>{let r=_7(t);return mF(e,r),r}});var hF=l(()=>{"use strict";ag()});var yF,SF=l(()=>{"use strict";Vg();yF=()=>[Bg,`agentRunWriterExecutionBackend=${Gg}`,`agentRunWriterExecutionReasonCode=${h_}`].join(`
`)});var Xr,Jg=l(()=>{"use strict";Xr=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var w_,W7,L7,AF,bF=l(()=>{"use strict";w_=e=>e.toLocaleString("en-US"),W7=e=>e<.01?e.toFixed(4):e.toFixed(3),L7=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${W7(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${w_(e.inputTokens)} in / ${w_(e.outputTokens)} out (${w_(e.totalTokens)} total)`,t].join(`
`)},AF=(e,t)=>{if(t===void 0)return e;let r=L7(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var PF=l(()=>{"use strict";de()});var vF,Sc,fe,v_,Yg,wF,E7,C7,_F,WF,LF,Ac,__,W_,L_,EF,k7,at,bc,Zr,CF,R7,x7,Xg,E_,C_,k_,kF=l(()=>{"use strict";vF=require("node:child_process");de();mt();yH();zl();Qv();PH();nu();WH();Og();EH();oc();RH();Ng();jg();Dg();qH();m_();fF();hF();SF();Jg();bF();Cn();PF();cc();Si();Dg();Sc=new Map,fe=new Map,v_=new Set,Yg=new Map,wF=e=>{e!==void 0&&!Yg.has(e)&&Yg.set(e,Date.now())},E7=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(Dt(t)){at(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}br(t,n)},C7=(e,t,r,o,n)=>{if(!xy(e,n))return;let s=`${yF()}
`;E7(t,r,o,s);let i=fe.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},_F=130,WF=`

Stopped by user.`,LF=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:Xr(e)},Ac=null,__=e=>{Ac=e},W_=(e,t)=>{if(Ac===null)return;let r=vw(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||kS(Ac,t,r)},L_=async e=>{await t_({layout:e,cloudApi:Ac})},EF=e=>{let t=Sc.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Ar(t.pid)},k7=e=>ce({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),at=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},bc=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=vn(s),c=fe.get(r);if(a!==null&&c!==void 0){let d=RE(a),p=EF(r)||a_(r);d!==null&&!p&&Zr(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return kE(a)}}),Zr=(e,t,r,o,n,s,i,a)=>{let c=Mn(s,a),d=n,p=AF(c.output,c.llmUsage);if(r!==void 0){let A=Yg.get(r);Yg.delete(r),A!==void 0&&Pw({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-A)/1e3))});let h=bH(c.llmUsage,p);h!==null&&$z({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&v_.has(r)&&(v_.delete(r),d=_F,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${WF}`:"Stopped by user.");let g=r!==void 0?vw(e.layout.reportsDir,r):null;if(r!==void 0){pc(r),Fi(e.layout,r),Dt(r)&&(at(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),xH(r));let A=fe.get(r);jz({reportsDir:e.layout.reportsDir,agentRunId:r,input:Xr(i),output:p,...A!==void 0?{writerLabel:dc({writerAgent:A.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),A!==void 0&&sg({layout:e.layout,writerAgent:A.writerAgent,projectFolderPath:A.projectFolderPath,userPrompt:A.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),gF(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),_H(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),t_({layout:e.layout,cloudApi:Ac}),fe.delete(r),Sc.delete(r),Rg(e.layout,r)}at(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),Ei(e.layout)},CF=(e,t,r,o,n,s,i)=>{let a=fe.get(r),c=a?.accumulatedOutput??s;hH(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),pn(t,r,()=>Zv(e.layout,r),bc(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),at(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},R7=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(n===void 0||h.length===0)){if(Dt(n)){at(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}br(n,h)}};if(n!==void 0){let h=fe.get(n);Sc.set(n,t),fe.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),at(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),pn(r,n,()=>EF(n),bc(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let g=a==="claude-cli",A=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(g?A.push(y):(c.push(y),p(y)),d||n===void 0)return;let u=gc(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let S=fe.get(n),b=[S?.accumulatedOutput??"",u.partialOutput].filter(f=>f.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=b),Sc.delete(n),CF(e,r,n,o,u.question,b,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;Ug(a);let y=n!==void 0?fe.get(n):void 0,u=g?Mn(A.join("")):{output:c.join("").trim(),llmUsage:void 0},S=g?c.join("").trim():"",b=[u.output.trim(),S].filter(w=>w.length>0).join(`
`);g&&u.output.trim().length>0&&p(u.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${b}`.trim():b;Zr(e,r,n,o,h??-1,f,s,u.llmUsage)}),t.on("error",h=>{d||Zr(e,r,n,o,-1,h.message,s)})},x7=(e,t,r,o,n,s,i,a,c)=>{let d=LF(r,c);s!==void 0&&(fe.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),at(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),pn(n,s,()=>fe.has(s),bc(e,n,s,o,i,a))),zi(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(Dt(s)){at(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}br(s,g)}}).then(g=>{Ug(t),Zr(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let A=g instanceof Error?g.message:String(g);Zr(e,n,s,o,-1,A,r)})},Xg=(e,t,r,o,n,s,i,a,c,d,p,g)=>{let A=LF(r,p);if(Li(e.layout),vo(e,t)){wF(s),x7(e,t,r,o,n,s,c,d,A);return}let h=Et(t,r,k7(e),i);if(h===null){Zr(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}wF(s);let y=kH({workspace:e.workspace,projectFolderPath:c}),u=()=>{let S=(0,vF.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:g??process.env});R7(e,S,n,o,s,r,A,t)};if(s===void 0){u();return}fe.set(s,{originalPrompt:r,userTranscriptPrompt:A,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:fe.get(s)?.accumulatedOutput??""}),C7(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&yi({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),pn(n,s,()=>fe.has(s),bc(e,n,s,o,c,d)),VH({socket:n,sendMessage:at,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:S=>{a!==void 0&&Fs(a,w=>{at(n,w)},o);let b=fe.get(s),f=[b?.accumulatedOutput??"",S.partialOutput].filter(w=>w.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=f),CF(e,n,s,o,S.question,f,r)},onFinished:(S,b)=>{Ug(t);let f=Mn(b),w=fe.get(s),v=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${f.output}`.trim():f.output;Zr(e,n,s,o,S,v,r,f.llmUsage)}}).then(S=>{if(!S){u();return}pn(n,s,()=>a_(s),bc(e,n,s,o,c,d))}).catch(S=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",S instanceof Error?S.message:S),u()})},E_=(e,t,r,o)=>{Rg(e.layout,t.agentRunId),t.shellSessionId!==void 0&&at(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=GH(t),s=fe.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;Xg(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},C_=(e,t)=>{for(let r of fH(e.layout))fe.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:Xr(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),pn(t,r.agentRunId,()=>Zv(e.layout,r.agentRunId),{awaitingInput:!0}),at(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},k_=(e,t,r,o)=>{let n=fe.get(r);if(n===void 0)return!1;v_.add(r),pc(r);let s=Sc.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(HH(r))return!0;Rg(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${WF}`:"Stopped by user.";return Zr(e,t,r,o,_F,i,n.originalPrompt),!0}});var T7,R_,RF=l(()=>{"use strict";Vi();T7=()=>`http://127.0.0.1:${gt()}/restart`,R_=async()=>{try{let e=await fetch(T7(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var xF=l(()=>{"use strict";Oa()});var TF=l(()=>{"use strict";Zw()});var IF,OF=l(()=>{"use strict";IF=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Pc,I7,x_,MF=l(()=>{"use strict";V();te();xF();gA();TF();OF();Cn();Pc=(e,t)=>{jr(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},I7=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(qh(),Vh)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},x_=async e=>{let t=Ce(e.layout.installDir)?.bundleVersion??null;if(!IF({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(pt(e.layout)){Ci({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Pc(e.layout,{summary:r,action:"install-bundle-update-start"}),Bt({launchAgentLabel:ne(e.layout.installDir),installDir:e.layout.installDir});let o=await Rs({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),Pc(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await I7();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Pc(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),Pc(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),Pc(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var O7,T_,NF=l(()=>{"use strict";O7=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),T_=e=>{if(!O7(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var I_,O_,jF=l(()=>{"use strict";KS();JS();I_=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=ha({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},O_=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Qt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var zF,M7,N7,j7,wc,DF=l(()=>{"use strict";zF=m(require("node:os"));Ee();M7="Default",N7=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),j7=e=>{let t=zF.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},wc=()=>{let e=N(),t=Id(e),r=N7(M7);return`${j7(t)}/${r.length>0?r:"project"}`}});var $F=l(()=>{"use strict";Oa()});var HF,M_,FF=l(()=>{"use strict";$F();HF=!1,M_=e=>{HF||(HF=!0,process.on("uncaughtException",t=>{zo(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;zo(e,{kind:"crash",message:r,stack:o})}))}});var UF,z7,N_,BF=l(()=>{"use strict";UF=require("node:child_process");$g();mt();Tg();xg();cc();Ig();z7=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,UF.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},N_=async e=>{if(!le(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Re(e.runConfig.writerExecutionBackend)==="api"){let r=Ve(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Pe(e.layout.configPath),n=De(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Pr(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await z7(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var j_,GF=l(()=>{"use strict";j_=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var VF,z_,qF=l(()=>{"use strict";VF=require("node:crypto"),z_=()=>(0,VF.randomUUID)()});var Gs,KF,Zg=l(()=>{"use strict";Gs="[[WORKING_ESTIMATE]]",KF=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Gs,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var JF,YF=l(()=>{"use strict";JF=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var D7,XF,ZF=l(()=>{"use strict";Zg();D7=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,XF=e=>{if(!e.includes(Gs))return null;let t=null;for(let r of e.matchAll(D7)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var $7,D_,QF=l(()=>{"use strict";ZF();$7=/^(\d{1,6})\b/,D_=e=>{let t=XF(e);if(t!==null)return t;let r=$7.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var H7,F7,U7,Qg,$_=l(()=>{"use strict";mt();xa();H7="http://127.0.0.1:11434",F7=45e3,U7=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Qg=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||H7,o=t===void 0?(await St({commands:ce({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(F7)});return n.ok?U7(await n.json()):null}catch{return null}}});var H_,F_,U_,e1=l(()=>{"use strict";Si();Zg();Jg();YF();QF();zl();$_();H_=async e=>{let t=Xr(e.wrappedPrompt),r=zz(e.reportsDir);return{estimateOutput:await Qg(KF(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},F_=e=>{let t=D_(e.estimateOutput);t!==null&&Zm({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},U_=e=>{let t=D_(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=JF(t);return hi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Wt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),Zm({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var ef,t1,B_=l(()=>{"use strict";ef="[[WORKING_TOKEN_ESTIMATE]]",t1=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",ef,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var r1,B7,o1,n1=l(()=>{"use strict";B_();r1=/^(\d{1,8})\b/,B7=e=>{let t=e.indexOf(ef);if(t<0)return null;let r=e.slice(t+ef.length).trim(),o=r1.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},o1=e=>{let t=B7(e);if(t!==null)return t;let r=r1.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var G_,V_,s1=l(()=>{"use strict";B_();Jg();n1();zl();$_();G_=async e=>{let t=Xr(e.wrappedPrompt),r=Hz(e.reportsDir);return{estimateOutput:await Qg(t1(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},V_=e=>{let t=o1(e.estimateOutput);return t===null?null:(Dz({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var i1=l(()=>{"use strict";qv();sH();aH();uH();Vi();kF();$g();mt();P_();Ng();RF();oA();MF();Cn();NF();jF();Og();DF();FF();BF();Gd();GF();qF();Zg();Si();e1();s1();Qv();xa();jg();m_()});var a1={};wt(a1,{buildContinuationPromptWithContext:()=>q7});var G7,V7,q7,l1=l(()=>{"use strict";G7=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,V7=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),q7=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=V7(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${G7(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var c1={};wt(c1,{readHarnessExportSets:()=>J7});var vc,q_,tf,K7,J7,d1=l(()=>{"use strict";vc=m(require("node:fs")),q_=m(require("node:path"));Ee();tf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),K7=e=>{if(!vc.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(vc.default.readFileSync(e.harnessManifestPath,"utf8"));if(tf(t))return t}catch{return null}return null},J7=(e,t)=>{let r=N(t),o=K7(r);if(o===null)return[];let n=tf(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!tf(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!tf(p))continue;let g=typeof p.path=="string"?p.path:void 0,A=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(g===void 0||A.length===0||h.length===0||y.length===0)continue;let u=g.startsWith("shared/")?q_.default.join(r.harnessRootDir,g):q_.default.join(r.harnessSetsDir,i,g);vc.default.existsSync(u)&&d.push({id:A,kind:h,title:y,content:vc.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var eW,J_,Vs,u1,Y7,p1,m1,K_,g1,Y_,X_,Z_,Y,B,Q_,X7,_c,Z7,Q7,e9,t9,r9,o9,n9,s9,Wc,f1=l(()=>{"use strict";eW=require("node:child_process"),J_=m(require("node:fs")),Vs=m(require("node:os"));Y$();V();te();Kn();dv();eH();de();Qe();Oa();_b();mg();ag();ht();Co();WA();Kt();i1();u1=3e4,Y7=3e4,p1=new Map,m1=new Map,K_=new Map,g1=new Map,Y_=new Map,X_=new Map,Z_=new Map,Y=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),B=(e,t,r)=>{e.readyState===rc.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(jr(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Cp(r,"out",t)))},Q_=e=>e,X7=e=>{if(!J_.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(J_.default.readFileSync(e.harnessManifestPath,"utf8"));if(Y(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},_c=(e,t)=>{let r=X7(t);r!==null&&B(e,{type:"harness.manifest.report",payload:{hostname:Vs.default.hostname(),manifest:r}})},Z7=async(e,t,r,o,n,s,i=!1,a,c,d,p,g)=>{let A=g?.trim()??"";if(!le(t)){B(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=dc({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await St({commands:ce({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?H_({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,S=s!==void 0?G_({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,b=hc(t)&&!c_(t);if(b){try{await Pr(e.layout.installDir,t)}catch(D){let be=D instanceof Error?D.message:String(D);B(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${be}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}fc(t)}else if(!hc(t))try{await Pr(e.layout.installDir,t)}catch(D){let be=D instanceof Error?D.message:String(D);B(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${be}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=$i(d,wc,g);if(f===null){B(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}qe({projectFolderPath:f,...A.length>0?{projectId:A}:{}}),i||Ul(e.layout,t,f);let w=ig({sessionContinuation:i,supportsWriterSessionContinuation:Hg(t),isWriterConversationStarted:Fg(t)}),v=i&&w==="first"?Fl(e.layout,t,f):null,_=v!==null?ks(e.layout,v):null,C=_!==null&&_.turns.length>0,L=zw({sessionContinuation:i,supportsWriterSessionContinuation:Hg(t),isWriterConversationStarted:Fg(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:C,userPromptCharacterCount:r.length}),x=r;if(L.continuationStrategy==="source_run_seed"){let D=typeof c=="string"&&c.length>0?yc(e.layout,c):null;if(D!==null){let{buildContinuationPromptWithContext:be}=await Promise.resolve().then(()=>(l1(),a1));x=be({priorPrompt:D.prompt,priorOutput:D.resultOutput??"",userMessage:r})}}else L.continuationStrategy==="transcript_seed"&&_!==null&&_.turns.length>0&&(x=tg({priorTurns:_.turns,userMessage:r}));let I=L.ragLimit>0?await ss({layout:e.layout,query:x,limit:L.ragLimit,minScore:L.ragMinScore,projectFolderPath:f,...A.length>0?{projectId:A}:{}}):[],M=L.ragLimit>0&&f.trim().length>0?await wb({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:f,...A.length>0?{projectId:A}:{}}):[],oe=L.injectMemory?Cw(e.layout,f,A.length>0?A:void 0):[],G=`${Rw(oe,L.memoryEntryLimit)}${Ab(I)}${vb(M)}${x}`,F=p?.trim()??(s!==void 0&&f.trim().length>0?z_():void 0);if(s!==void 0&&F!==void 0&&F.length>0&&f.trim().length>0){yi({reportKey:F,agentRunId:s,userSummary:"Working on your Mac\u2026"});let D=G;u!==null&&u.then(be=>{if(be===null)return;let $t=U_({estimateOutput:be.estimateOutput??"",reportKey:F,agentRunId:s,reportsDir:e.layout.reportsDir,task:be.task,writerLabel:be.writerLabel,embedding:be.embedding});if($t.estimateSeconds===null)return;W_(e.layout.reportsDir,s);let qs=`${Gs}
${$t.estimateSeconds}
`;if(Dt(s)){B(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:qs},requestId:o});return}br(s,qs)}).catch(()=>{}),G=j_(D),G=Sh(G,{agentRunId:s,reportKey:F,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then(D=>{D!==null&&F_({estimateOutput:D.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:D.task,writerLabel:D.writerLabel,embedding:D.embedding})}).catch(()=>{}),s!==void 0&&S!==null&&S.then(D=>{D!==null&&V_({estimateOutput:D.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:D.task,writerLabel:D.writerLabel})}).catch(()=>{});let Qr=s!==void 0&&Z_.get(s)===!0;if(s!==void 0&&f.trim().length>0){let D=await op(f);X_.set(s,D),F!==void 0&&F.length>0&&Y_.set(s,F)}Xg(e,t,G,o,Q_(n),s,{sessionTurn:L.sessionTurn},a,f,F,r,Wy(e.layout,s,Qr)),b&&s!==void 0&&B(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:u_(t)},requestId:o})},Q7=async(e,t,r,o,n)=>{let s=(i,a)=>{B(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await p_({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ce({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,B(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=le(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Us(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},e9=(e,t,r)=>new Promise(o=>{if(!le(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Et(t,r,ce({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,eW.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),t9=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;B(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=kt(t.bundle),s=Y(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=ke(e.wsUrl)??Vt,g=await uS({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return B(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=Eo({bundle:i,layout:e.layout});return B(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&_c(o,e.layout),!0},r9=async(e,t,r,o)=>{if(await t9(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(B(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){B(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!le(n)){B(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}Li(e.layout);let i=await(async()=>{try{await Pr(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return e9(e,n,s)})().finally(()=>{Ei(e.layout)});B(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),_c(o,e.layout)},o9=e=>{let t=1e3*2**e;return Math.min(Y7,t)},n9=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(pt(e.layout)){Dh(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,R_().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(u,S="system.ack")=>{if(!t.selfUpdateInFlight){if(pt(e.layout)){Ci({layout:e.layout,remoteBundleVersion:u,trigger:S}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${S}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,x_({layout:e.layout,remoteBundleVersion:u,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let u=we(e.layout);u!==null&&je(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===rc.OPEN||u.readyState===rc.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,u1)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=o9(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},g=u=>{s();let S=()=>{let b=wi(e.layout.installDir),f=gt();B(u,{type:"agent.heartbeat",payload:{hostname:Vs.default.hostname(),macOsUsername:Vs.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:b}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,u1)},A=(u,S)=>{if(typeof u.type!="string")return;if(_A(u)){t.stopped=!0,s(),a(),c(),bA({layout:e.layout}).finally(()=>{nc(),process.exit(0)});return}jr(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),Cp(e.layout,"in",u);let b=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&Y(u.payload)){let f=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",w=typeof u.payload.origin=="string"?u.payload.origin:"",v=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",_=typeof u.payload.challenge=="string"?u.payload.challenge:"",C=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!cv({serverPublicKey:f,origin:w,devicePublicKey:v,challenge:_,serverAttestation:C})){t.wakeError="Server attestation verification failed",jr(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&Y(u.payload)){let f=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";jr(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),N_({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{B(S,{type:"writer.status",payload:w},e.layout)})}if(u.type==="install.bundle.update"&&Y(u.payload)){let f=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";f.length>0&&o(f,"install.bundle.update")}if(u.type==="system.ack"){dp(e.layout,{wsUrl:e.wsUrl});let f=Y(u.payload)?u.payload:null,w=T_(f);w!==null&&o(w)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&Y(u.payload)&&I_(u.payload),u.type==="automations.run"&&Y(u.payload)&&O_(u.payload),u.type==="terminal.stream.accepted"&&Y(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"";if(f.length>0){let w=n_(f);for(let v of w)B(S,{type:"terminal.stream.chunk",payload:{runId:f,chunk:v},requestId:b})}}if(u.type==="agent.agentRun.list"&&B(S,{type:"dashboard.agentRun.list.result",payload:{runs:b_(e.layout)},requestId:b}),u.type==="agent.agentRun.get"&&Y(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"",w=f.length>0?yc(e.layout,f):null;B(S,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:b})}if(u.type==="command.claude.run"&&Y(u.payload)){let f=u.payload.prompt,w=typeof u.payload.writerAgent=="string"&&le(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",v=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,_=u.payload.sessionContinuation===!0,C=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,L=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,x=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=$i(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,wc,x),M=Sy(u.payload.compositionSnapshot),oe=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${_?"continue":"first"})\u2026`),I===null){B(S,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...v!==void 0?{agentRunId:v}:{}},requestId:b});return}if(M!==null){let G=by(e.layout,M);if(G!==null){B(S,{type:"command.claude.result",payload:{exitCode:-1,output:G,...v!==void 0?{agentRunId:v}:{}},requestId:b});return}if(v!==void 0){let F=wy(e.layout,v,M);if(!F.ok){B(S,{type:"command.claude.result",payload:{exitCode:-1,output:F.errorMessage,...v!==void 0?{agentRunId:v}:{}},requestId:b});return}Z_.set(v,M.entries.some(Qr=>Qr.scope==="run"))}}v!==void 0&&L!==void 0&&p1.set(v,L),v!==void 0&&(m1.set(v,I),x!==void 0&&x.trim().length>0&&K_.set(v,x.trim()),g1.set(v,f.trim()),qe({projectFolderPath:I,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),Z7(e,w,f.trim(),b,S,v,_,L,C,I,oe,x)}}if(u.type==="shell.session.open"&&Y(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:120,v=typeof u.payload.rows=="number"?u.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),l_({shellSessionId:f,cwd:e.workspace,cols:w,rows:v,send:_=>{B(S,_)},requestId:b}))}if(u.type==="shell.session.close"&&Y(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";f.length>0&&Fs(f,w=>{B(S,w)},b)}if(u.type==="shell.input"&&Y(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.data=="string"?u.payload.data:"";f.length>0&&w.length>0&&s_(f,w)}if(u.type==="shell.resize"&&Y(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:0,v=typeof u.payload.rows=="number"?u.payload.rows:0;f.length>0&&w>0&&v>0&&i_(f,w,v)}if(u.type==="command.writer.session.end"&&Y(u.payload)){let f=u.payload.writerAgent;typeof f=="string"&&le(f)&&(d_(f),ng(e.layout,f))}if(u.type==="command.writer.session.start"&&Y(u.payload)){let f=u.payload.writerAgent,w=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof f=="string"&&le(f)&&w.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),Q7(e,f,w,b,S))}if(u.type==="command.claude.stop"&&Y(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),k_(e,Q_(S),f,b))}if(u.type==="command.claude.input_respond"&&Y(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",w=typeof u.payload.response=="string"?u.payload.response.trim():"",v=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",_=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",C=typeof u.payload.question=="string"?u.payload.question:"";f.length>0&&w.length>0&&v.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),E_(e,{agentRunId:f,originalPrompt:v,partialOutput:_,question:C,response:w,shellSessionId:p1.get(f)},b,Q_(S)))}if(u.type==="dispatch.approval.required"&&Y(u.payload)){let f=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",w=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${w}`),process.platform==="darwin"&&(0,eW.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&Y(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),r9(e,u.payload,b,S)),u.type==="harness.export.request"&&Y(u.payload)){let f=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",w=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,v=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(_=>typeof _=="string"):[];f.length>0&&v.length>0&&(async()=>{let{readHarnessExportSets:_}=await Promise.resolve().then(()=>(d1(),c1)),C=_(v,e.email);B(S,{type:"harness.export.result",payload:{success:C.length>0,borrowerUserId:f,...w!==void 0?{targetDeviceId:w}:{},sets:C,errorMessage:C.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(u.type==="harness.manifest.request"&&_c(S,e.layout),u.type==="command.claude.result"&&Y(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,w=typeof u.payload.output=="string"?u.payload.output:"",v=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,_=$i(f!==void 0?m1.get(f):void 0,wc),C=f!==void 0?K_.get(f):void 0,L=f!==void 0?g1.get(f)??"":"",x=DS({exitCode:v,output:w});if(x&&_!==null&&Sb({layout:e.layout,text:w,source:f??"command.claude.result",projectFolderPath:_,...C!==void 0?{projectId:C}:{}}),v!=null&&v!==0&&w.trim().length>0&&_!==null&&(mb({layout:e.layout,errorText:w,projectFolderPath:_,...C!==void 0?{projectId:C}:{}}),Pb({layout:e.layout,text:w,source:f??"command.claude.result.failure",projectFolderPath:_,...C!==void 0?{projectId:C}:{}})),x&&L.trim().length>0&&_!==null&&kw({layout:e.layout,projectFolderPath:_,...C!==void 0?{projectId:C}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:L,output:w,createdAt:new Date().toISOString()}}),f!==void 0&&_!==null){let M=Y_.get(f),oe=X_.get(f);M!==void 0&&oe!==void 0&&op(_).then(G=>{let F=$S({before:oe,after:G});Ah(M,F),X_.delete(f),Y_.delete(f)})}if(x&&C!==void 0&&C.trim().length>0){let M=$(),oe=M===null?null:X({wsUrl:M.wsUrl,pairingToken:M.pairingToken});oe!==null&&FS(oe,C,{...f!==void 0?{sourceRunId:f}:{},lesson:HS({prompt:L,output:w})})}f!==void 0&&(Fi(e.layout,f),Z_.delete(f),K_.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let u=new rc(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),__(X({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),L_(e.layout);let S=ke(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=lv({layout:e.layout,origin:S,...b!==void 0&&b.length>0?{claimToken:b}:{}});B(u,{type:"agent.register",payload:{role:"agent",hostname:Vs.default.hostname(),macOsUsername:Vs.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),_c(u,e.layout),C_(e,u),g(u)}),u.on("message",S=>{let b=typeof S=="string"?S:S.toString("utf8");try{let f=JSON.parse(b);if(!Y(f))return;A(f,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(S,b)=>{s(),t.socket=void 0,t.wsConnected=!1,ZS(e.layout),t.reconnectAttempt+=1;let f=typeof b=="string"?b:b.toString("utf8");zo(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:f}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",S=>{t.wakeError=S.message,zo(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return zh(()=>{let u=$h();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&o(u.remoteBundleVersion,u.trigger);let S=Hh();S!==null&&r(S)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:wa(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Kl(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(_c(u,e.layout),{ok:!0})}}},s9=async()=>{Be("agent-witch");let e=Fv(),t=E();Vv().ok||(process.platform==="darwin"?(await uo(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),Yv(t);let o=Jv({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(Bt({launchAgentLabel:ne(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),ci());let n=await Oy(),s=n[0];s!==void 0&&M_(s.layout);for(let h of n){let y=ke(h.wsUrl)??Vt;vi(h.layout.installDir,y)}let i=n.map(h=>n9(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),nc(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let S=we(h.layout);QS(S,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(pt(h)||va(h.installDir))},g=await Xv({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):ql({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let A=Gt(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),di(),d()});d=()=>{A(),g.stop(),nc(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Wc=s9});var tW=l(()=>{"use strict";f1()});var h1={};wt(h1,{startAgentWitchClient:()=>Wc});var y1=l(()=>{"use strict";tW();tW();go();bh();qd();if(!Ge()&&fo(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Vd(process.argv.slice(e))),Wc()}});hh();bh();go();qd();var IE="20.x",OE="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var w5=e=>[`Node.js ${IE} or newer is required (found ${e}).`,OE].join(" "),ME=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${w5(process.version)}
`),process.exit(1))};var i9=async()=>{Be("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(qh(),Vh)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},a9=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(Nx(),Mx)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},l9=async()=>{if(!fo(Ge()?void 0:__agentWitchImportMetaUrl))return;ME();let e=process.argv.indexOf("report");e>=0&&process.exit(Vd(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await i9();return}if(t==="wake"){await a9();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(j0(),N0));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(GD(),BD));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(y1(),h1));await r()};l9();
