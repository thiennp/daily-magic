#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var f1=Object.create;var Vg=Object.defineProperty;var h1=Object.getOwnPropertyDescriptor;var y1=Object.getOwnPropertyNames;var S1=Object.getPrototypeOf,A1=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var W=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Pt=(e,t)=>{for(var r in t)Vg(e,r,{get:t[r],enumerable:!0})},b1=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of y1(t))!A1.call(e,n)&&n!==r&&Vg(e,n,{get:()=>t[n],enumerable:!(o=h1(t,n))||o.enumerable});return e};var m=(e,t,r)=>(r=e!=null?f1(S1(e)):{},b1(t||!e||!e.__esModule?Vg(r,"default",{value:e,enumerable:!0}):r,e));var cn=W(qg=>{"use strict";Object.defineProperty(qg,"__esModule",{value:!0});qg.stringify=P1;function P1(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=W(Kg=>{"use strict";Object.defineProperty(Kg,"__esModule",{value:!0});Kg.generateTypeGuardError=w1;var J_=cn();function w1(e,t,r){return(0,J_.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,J_.stringify)(e)}) to be "${r}"`}});var Ar=W(Sc=>{"use strict";Object.defineProperty(Sc,"__esModule",{value:!0});Sc.isNonNullObject=void 0;var v1=O(),_1=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,v1.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Sc.isNonNullObject=_1});var wt=W(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.attachTypeGuardMeta=he.isArrayTypeGuard=he.isNestedObjectTypeGuard=he.getTypeGuardWrapperKind=he.getTypeGuardInnerGuard=he.getTypeGuardItemGuard=he.getTypeGuardSchema=void 0;var W1=e=>e.schema;he.getTypeGuardSchema=W1;var L1=e=>e.itemGuard;he.getTypeGuardItemGuard=L1;var E1=e=>e.innerGuard;he.getTypeGuardInnerGuard=E1;var k1=e=>e.wrapperKind;he.getTypeGuardWrapperKind=k1;var C1=e=>{if((0,he.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};he.isNestedObjectTypeGuard=C1;var R1=e=>{if((0,he.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};he.isArrayTypeGuard=R1;var x1=(e,t)=>Object.assign(e,t);he.attachTypeGuardMeta=x1});var Us=W(Yr=>{"use strict";Object.defineProperty(Yr,"__esModule",{value:!0});Yr.getExpectedTypeName=Yr.getTypeGuardDisplayName=void 0;var Y_=wt(),T1=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};Yr.getTypeGuardDisplayName=T1;var I1=e=>{let t=(0,Y_.getTypeGuardWrapperKind)(e),r=(0,Y_.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,Yr.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};Yr.getExpectedTypeName=I1});var Xr=W(Ac=>{"use strict";Object.defineProperty(Ac,"__esModule",{value:!0});Ac.createValidationResult=void 0;var O1=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Ac.createValidationResult=O1});var dn=W(bc=>{"use strict";Object.defineProperty(bc,"__esModule",{value:!0});bc.createValidationError=void 0;var M1=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});bc.createValidationError=M1});var un=W(Pc=>{"use strict";Object.defineProperty(Pc,"__esModule",{value:!0});Pc.createTreeNode=void 0;var N1=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Pc.createTreeNode=N1});var Bs=W(wc=>{"use strict";Object.defineProperty(wc,"__esModule",{value:!0});wc.combineResults=void 0;var j1=Xr(),D1=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,j1.createValidationResult)(r,o,n)};wc.combineResults=D1});var _c=W(vc=>{"use strict";Object.defineProperty(vc,"__esModule",{value:!0});vc.createSimplifiedTree=void 0;var X_=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=X_(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},z1=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=X_(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};vc.createSimplifiedTree=z1});var Vs=W(Lc=>{"use strict";Object.defineProperty(Lc,"__esModule",{value:!0});Lc.validateObject=void 0;var $1=Ar(),Gs=Xr(),H1=dn(),Wc=un(),F1=Bs(),Z_=Ec(),U1=(e,t,r)=>{let o=()=>{let i=(0,H1.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Wc.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Gs.createValidationResult)(!1,[],a):(0,Gs.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Gs.createValidationResult)(!0,[],(0,Wc.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,g=d,A=t[g],h=e[g],y=(0,Z_.validateProperty)(g,h,A,r);return y.valid?p.length===0?(0,Gs.createValidationResult)(!0,[],(0,Wc.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,Z_.validateProperty)(d,e[d],p,r)}),a=(0,F1.combineResults)(i,r.path),c=(0,Wc.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,Gs.createValidationResult)(a.valid,a.errors,c)};return(0,$1.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};Lc.validateObject=U1});var eW=W(Rc=>{"use strict";Object.defineProperty(Rc,"__esModule",{value:!0});Rc.validateArray=void 0;var B1=cn(),kc=Xr(),Q_=dn(),Cc=un(),G1=Bs(),V1=Vs(),q1=Us(),K1=wt(),J1=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,Q_.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,Cc.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,kc.createValidationResult)(!1,[c],d)}let n=(0,K1.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,g={path:p,config:r.config||null};if(n)return(0,V1.validateObject)(c,n,g);let A=t(c,null),h=(0,q1.getExpectedTypeName)(t),y=(0,B1.stringify)(c);if(A)return(0,kc.createValidationResult)(!0,[],(0,Cc.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,S=(0,Q_.createValidationError)(p,h,c,u),b=(0,Cc.createTreeNode)(p,!1,h,c);return b.errors=[S],(0,kc.createValidationResult)(!1,[S],b)}),i=(0,G1.combineResults)(s,o),a=(0,Cc.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,kc.createValidationResult)(i.valid,i.errors,a)};Rc.validateArray=J1});var Ec=W(Tc=>{"use strict";Object.defineProperty(Tc,"__esModule",{value:!0});Tc.validateProperty=void 0;var tW=Xr(),Y1=dn(),rW=un(),X1=Us(),xc=wt(),Z1=Vs(),Q1=eW(),eU=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,xc.getTypeGuardSchema)(r),c=(0,xc.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,Z1.validateObject)(t,a,s);if(c&&(0,xc.isArrayTypeGuard)(r))return(0,Q1.validateArray)(t,c,s)}let d=p=>{let g=r(t,p),A=(0,X1.getExpectedTypeName)(r);return g?(0,tW.createValidationResult)(!0,[],(0,rW.createTreeNode)(n,!0,A,t)):(()=>{let h=(0,Y1.createValidationError)(n,A,t,`Expected ${n} (${JSON.stringify(t)}) to be "${A}"`),y=(0,rW.createTreeNode)(n,!1,A,t);return y.errors=[h],(0,tW.createValidationResult)(!1,[h],y)})()};if((0,xc.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};Tc.validateProperty=eU});var Oc=W(Ic=>{"use strict";Object.defineProperty(Ic,"__esModule",{value:!0});Ic.isNil=void 0;var tU=O(),rU=function(e,t){return e!=null?(t&&t.callbackOnError((0,tU.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Ic.isNil=rU});var Jg=W(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.isDefined=void 0;var oU=O(),nU=Oc(),sU=function(e,t){return(0,nU.isNil)(e,null)?(t&&t.callbackOnError((0,oU.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Mc.isDefined=sU});var Yg=W(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.reportValidationResults=void 0;var iU=_c(),oW=Jg(),aU=Oc(),lU=(e,t)=>{if(e.valid===!0||(0,aU.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,oW.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,iU.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,oW.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Nc.reportValidationResults=lU});var Xg=W(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.Validation=Q.reportValidationResults=Q.validateObject=Q.validateProperty=Q.createSimplifiedTree=Q.combineResults=Q.createTreeNode=Q.createValidationError=Q.createValidationResult=Q.getExpectedTypeName=void 0;var cU=Us();Object.defineProperty(Q,"getExpectedTypeName",{enumerable:!0,get:function(){return cU.getExpectedTypeName}});var dU=Xr();Object.defineProperty(Q,"createValidationResult",{enumerable:!0,get:function(){return dU.createValidationResult}});var uU=dn();Object.defineProperty(Q,"createValidationError",{enumerable:!0,get:function(){return uU.createValidationError}});var pU=un();Object.defineProperty(Q,"createTreeNode",{enumerable:!0,get:function(){return pU.createTreeNode}});var mU=Bs();Object.defineProperty(Q,"combineResults",{enumerable:!0,get:function(){return mU.combineResults}});var gU=_c();Object.defineProperty(Q,"createSimplifiedTree",{enumerable:!0,get:function(){return gU.createSimplifiedTree}});var fU=Ec();Object.defineProperty(Q,"validateProperty",{enumerable:!0,get:function(){return fU.validateProperty}});var hU=Vs();Object.defineProperty(Q,"validateObject",{enumerable:!0,get:function(){return hU.validateObject}});var yU=Yg();Object.defineProperty(Q,"reportValidationResults",{enumerable:!0,get:function(){return yU.reportValidationResults}});var SU=Xr(),AU=Bs(),bU=dn(),PU=un(),wU=Ec(),vU=Vs(),_U=Yg(),WU=_c();Q.Validation={result:SU.createValidationResult,combine:AU.combineResults,error:bU.createValidationError,treeNode:PU.createTreeNode,property:wU.validateProperty,object:vU.validateObject,report:_U.reportValidationResults,createSimplifiedTree:WU.createSimplifiedTree}});var jc=W(Zg=>{"use strict";Object.defineProperty(Zg,"__esModule",{value:!0});Zg.isType=EU;var nW=Ar(),sW=Xg(),LU=wt();function EU(e){if(!(0,nW.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,sW.validateObject)(r,e,s);return(0,sW.reportValidationResults)(i,o||null),i.valid}return(0,nW.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,LU.attachTypeGuardMeta)(t,{schema:e})}});var cW=W(Zr=>{"use strict";Object.defineProperty(Zr,"__esModule",{value:!0});Zr.isNestedType=Zr.isShape=void 0;Zr.isSchema=qs;var iW=Ar(),aW=Xg(),lW=wt();function qs(e){if(!(0,iW.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=CU(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,aW.validateObject)(o,t,i);return(0,aW.reportValidationResults)(a,n||null),a.valid}return(0,iW.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,lW.attachTypeGuardMeta)(r,{schema:t})}function kU(e){return typeof e=="function"?e:Array.isArray(e)?RU(e):typeof e=="object"&&e!==null?qs(e):e}function CU(e){let t={};for(let[r,o]of Object.entries(e))t[r]=kU(o);return t}function RU(e){let t=e[0],r=qs(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,lW.attachTypeGuardMeta)(o,{itemGuard:r})}Zr.isShape=qs;Zr.isNestedType=qs});var dW=W(Qg=>{"use strict";Object.defineProperty(Qg,"__esModule",{value:!0});Qg.isObjectWith=TU;var xU=jc();function TU(e){return(0,xU.isType)(e)}});var uW=W(ef=>{"use strict";Object.defineProperty(ef,"__esModule",{value:!0});ef.isObject=OU;var IU=jc();function OU(e){return(0,IU.isType)(e)}});var pW=W(tf=>{"use strict";Object.defineProperty(tf,"__esModule",{value:!0});tf.guardWithTolerance=MU;function MU(e,t,r){return t(e,r),e}});var mW=W(rf=>{"use strict";Object.defineProperty(rf,"__esModule",{value:!0});rf.isBranded=jU;var NU=O();function jU(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,NU.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var gW=W(Dc=>{"use strict";Object.defineProperty(Dc,"__esModule",{value:!0});Dc.BrandSymbols=void 0;Dc.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var fW=W(zc=>{"use strict";Object.defineProperty(zc,"__esModule",{value:!0});zc.isAny=void 0;var DU=function(e){return!0};zc.isAny=DU});var Ks=W(of=>{"use strict";Object.defineProperty(of,"__esModule",{value:!0});of.reportTypeGuardError=$U;var zU=O();function $U(e,t,r){e&&e.callbackOnError((0,zU.generateTypeGuardError)(t,e.identifier,r))}});var hW=W($c=>{"use strict";Object.defineProperty($c,"__esModule",{value:!0});$c.isBoolean=void 0;var HU=Ks(),FU=function(t,r){return typeof t!="boolean"?((0,HU.reportTypeGuardError)(r,t,"boolean"),!1):!0};$c.isBoolean=FU});var yW=W(Hc=>{"use strict";Object.defineProperty(Hc,"__esModule",{value:!0});Hc.isDate=void 0;var UU=O(),BU=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,UU.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Hc.isDate=BU});var nf=W(Fc=>{"use strict";Object.defineProperty(Fc,"__esModule",{value:!0});Fc.isNumber=void 0;var GU=Ks(),VU=function(t,r){return typeof t!="number"||isNaN(t)?((0,GU.reportTypeGuardError)(r,t,"number"),!1):!0};Fc.isNumber=VU});var SW=W(Uc=>{"use strict";Object.defineProperty(Uc,"__esModule",{value:!0});Uc.isString=void 0;var qU=Ks(),KU=function(t,r){return typeof t!="string"?((0,qU.reportTypeGuardError)(r,t,"string"),!1):!0};Uc.isString=KU});var AW=W(Bc=>{"use strict";Object.defineProperty(Bc,"__esModule",{value:!0});Bc.isUnknown=void 0;var JU=function(e){return!0};Bc.isUnknown=JU});var bW=W(Gc=>{"use strict";Object.defineProperty(Gc,"__esModule",{value:!0});Gc.isFunction=void 0;var YU=O(),XU=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,YU.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Gc.isFunction=XU});var wW=W(Vc=>{"use strict";Object.defineProperty(Vc,"__esModule",{value:!0});Vc.isFile=void 0;var PW=O(),ZU=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,PW.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,PW.generateTypeGuardError)(e,t.identifier,"File")),!1)};Vc.isFile=ZU});var _W=W(qc=>{"use strict";Object.defineProperty(qc,"__esModule",{value:!0});qc.isFileList=void 0;var vW=O(),QU=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,vW.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,vW.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};qc.isFileList=QU});var LW=W(Kc=>{"use strict";Object.defineProperty(Kc,"__esModule",{value:!0});Kc.isBlob=void 0;var WW=O(),eB=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,WW.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,WW.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Kc.isBlob=eB});var kW=W(Jc=>{"use strict";Object.defineProperty(Jc,"__esModule",{value:!0});Jc.isFormData=void 0;var EW=O(),tB=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,EW.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,EW.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};Jc.isFormData=tB});var RW=W(Yc=>{"use strict";Object.defineProperty(Yc,"__esModule",{value:!0});Yc.isURL=void 0;var CW=O(),rB=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,CW.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,CW.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Yc.isURL=rB});var TW=W(Xc=>{"use strict";Object.defineProperty(Xc,"__esModule",{value:!0});Xc.isURLSearchParams=void 0;var xW=O(),oB=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,xW.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,xW.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Xc.isURLSearchParams=oB});var IW=W(Zc=>{"use strict";Object.defineProperty(Zc,"__esModule",{value:!0});Zc.isMap=void 0;var nB=O(),sB=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,nB.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Zc.isMap=sB});var OW=W(Qc=>{"use strict";Object.defineProperty(Qc,"__esModule",{value:!0});Qc.isSet=void 0;var iB=O(),aB=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,iB.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Qc.isSet=aB});var MW=W(sf=>{"use strict";Object.defineProperty(sf,"__esModule",{value:!0});sf.isIndexSignature=cB;var lB=O();function cB(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,lB.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let g=s[d],A=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),h=t(g,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return A&&h})}}});var NW=W(ed=>{"use strict";Object.defineProperty(ed,"__esModule",{value:!0});ed.isError=void 0;var dB=Ks(),uB=function(t,r){return t instanceof Error?!0:((0,dB.reportTypeGuardError)(r,t,"Error"),!1)};ed.isError=uB});var lf=W(af=>{"use strict";Object.defineProperty(af,"__esModule",{value:!0});af.isArrayWithEachItem=gB;var pB=O(),mB=wt();function gB(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,pB.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,mB.attachTypeGuardMeta)(t,{itemGuard:e})}});var cf=W(td=>{"use strict";Object.defineProperty(td,"__esModule",{value:!0});td.isNonEmptyArray=void 0;var fB=O(),hB=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,fB.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};td.isNonEmptyArray=hB});var jW=W(df=>{"use strict";Object.defineProperty(df,"__esModule",{value:!0});df.isNonEmptyArrayWithEachItem=AB;var yB=lf(),SB=cf();function AB(e){return function(t,r){return(0,yB.isArrayWithEachItem)(e)(t,r)&&(0,SB.isNonEmptyArray)(t,r)}}});var zW=W(uf=>{"use strict";Object.defineProperty(uf,"__esModule",{value:!0});uf.isTuple=bB;var DW=O();function bB(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,DW.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,DW.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var $W=W(pf=>{"use strict";Object.defineProperty(pf,"__esModule",{value:!0});pf.isObjectWithEachItem=wB;var PB=O();function wB(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,PB.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var HW=W(mf=>{"use strict";Object.defineProperty(mf,"__esModule",{value:!0});mf.isPartialOf=_B;var vB=Ar();function _B(e){return function(t,r){if(!(0,vB.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var FW=W(gf=>{"use strict";Object.defineProperty(gf,"__esModule",{value:!0});gf.isPick=LB;var WB=Ar();function LB(e,...t){return function(r,o){if(!(0,WB.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var UW=W(ff=>{"use strict";Object.defineProperty(ff,"__esModule",{value:!0});ff.isOmit=kB;var EB=Ar();function kB(e,...t){return function(r,o){if(!(0,EB.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),g=p.indexOf(" ("),A=g>=0?p.slice(0,g):p;if(a.has(A))return!1;let h=A.startsWith(s+".")&&A.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var BW=W(rd=>{"use strict";Object.defineProperty(rd,"__esModule",{value:!0});rd.isNonEmptyString=void 0;var CB=O(),RB=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,CB.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};rd.isNonEmptyString=RB});var GW=W(od=>{"use strict";Object.defineProperty(od,"__esModule",{value:!0});od.isNonNegativeNumber=void 0;var xB=O(),TB=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,xB.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};od.isNonNegativeNumber=TB});var VW=W(nd=>{"use strict";Object.defineProperty(nd,"__esModule",{value:!0});nd.isPositiveNumber=void 0;var IB=O(),OB=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,IB.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};nd.isPositiveNumber=OB});var qW=W(sd=>{"use strict";Object.defineProperty(sd,"__esModule",{value:!0});sd.isNonPositiveNumber=void 0;var MB=O(),NB=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,MB.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};sd.isNonPositiveNumber=NB});var KW=W(id=>{"use strict";Object.defineProperty(id,"__esModule",{value:!0});id.isNegativeNumber=void 0;var jB=O(),DB=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,jB.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};id.isNegativeNumber=DB});var JW=W(ad=>{"use strict";Object.defineProperty(ad,"__esModule",{value:!0});ad.isInteger=void 0;var zB=O(),$B=nf(),HB=function(e,t){return!(0,$B.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,zB.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};ad.isInteger=HB});var YW=W(ld=>{"use strict";Object.defineProperty(ld,"__esModule",{value:!0});ld.isPositiveInteger=void 0;var FB=O(),UB=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,FB.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};ld.isPositiveInteger=UB});var XW=W(cd=>{"use strict";Object.defineProperty(cd,"__esModule",{value:!0});cd.isNegativeInteger=void 0;var BB=O(),GB=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,BB.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};cd.isNegativeInteger=GB});var ZW=W(dd=>{"use strict";Object.defineProperty(dd,"__esModule",{value:!0});dd.isNonNegativeInteger=void 0;var VB=O(),qB=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,VB.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};dd.isNonNegativeInteger=qB});var QW=W(ud=>{"use strict";Object.defineProperty(ud,"__esModule",{value:!0});ud.isNonPositiveInteger=void 0;var KB=O(),JB=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,KB.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};ud.isNonPositiveInteger=JB});var eL=W(md=>{"use strict";Object.defineProperty(md,"__esModule",{value:!0});md.isNumeric=void 0;var pd=O(),YB=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,pd.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,pd.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,pd.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,pd.generateTypeGuardError)(e,t.identifier,"number key")),!1};md.isNumeric=YB});var tL=W(gd=>{"use strict";Object.defineProperty(gd,"__esModule",{value:!0});gd.isBooleanLike=void 0;var hf=O(),XB=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,hf.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,hf.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};gd.isBooleanLike=XB});var rL=W(fd=>{"use strict";Object.defineProperty(fd,"__esModule",{value:!0});fd.isDateLike=void 0;var Js=O(),ZB=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Js.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Js.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Js.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Js.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Js.generateTypeGuardError)(e,t.identifier,"date-like")),!1};fd.isDateLike=ZB});var oL=W(hd=>{"use strict";Object.defineProperty(hd,"__esModule",{value:!0});hd.isBigInt=void 0;var QB=O(),eG=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,QB.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};hd.isBigInt=eG});var Sf=W(yf=>{"use strict";Object.defineProperty(yf,"__esModule",{value:!0});yf.isOneOf=tG;var nL=cn();function tG(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,nL.stringify)(t)}) must be one of following values ${e.map(nL.stringify).join(" | ")}`),o}}});var sL=W(Af=>{"use strict";Object.defineProperty(Af,"__esModule",{value:!0});Af.isOneOfTypes=nG;var rG=cn(),oG=Us();function nG(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,rG.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,oG.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var iL=W(bf=>{"use strict";Object.defineProperty(bf,"__esModule",{value:!0});bf.isIntersectionOf=sG;function sG(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var aL=W(Pf=>{"use strict";Object.defineProperty(Pf,"__esModule",{value:!0});Pf.isExtensionOf=iG;function iG(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var lL=W(wf=>{"use strict";Object.defineProperty(wf,"__esModule",{value:!0});wf.isNullOr=lG;var aG=wt();function lG(e){function t(r,o){return r===null?!0:e(r,o)}return(0,aG.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var cL=W(vf=>{"use strict";Object.defineProperty(vf,"__esModule",{value:!0});vf.isUndefinedOr=dG;var cG=wt();function dG(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,cG.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var dL=W(_f=>{"use strict";Object.defineProperty(_f,"__esModule",{value:!0});_f.isNilOr=pG;var uG=wt();function pG(e){function t(r,o){return r==null?!0:e(r,o)}return(0,uG.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var uL=W(Wf=>{"use strict";Object.defineProperty(Wf,"__esModule",{value:!0});Wf.isAsserted=mG;function mG(e){return!0}});var pL=W(Lf=>{"use strict";Object.defineProperty(Lf,"__esModule",{value:!0});Lf.isEnum=fG;var gG=Sf();function fG(e){return function(t,r){return(0,gG.isOneOf)(...Object.values(e))(t,r)}}});var mL=W(Ef=>{"use strict";Object.defineProperty(Ef,"__esModule",{value:!0});Ef.isEqualTo=SG;var hG=O(),yG=cn();function SG(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,hG.generateTypeGuardError)(t,r.identifier,`equal to ${(0,yG.stringify)(e)}`)),!1):!0}}});var gL=W(yd=>{"use strict";Object.defineProperty(yd,"__esModule",{value:!0});yd.isRegex=void 0;var AG=O(),bG=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,AG.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};yd.isRegex=bG});var hL=W(kf=>{"use strict";Object.defineProperty(kf,"__esModule",{value:!0});kf.isPattern=PG;var fL=O();function PG(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,fL.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,fL.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var yL=W(Cf=>{"use strict";Object.defineProperty(Cf,"__esModule",{value:!0});Cf.by=wG;function wG(e){return function(t){return e(t,null)}}});var SL=W(Rf=>{"use strict";Object.defineProperty(Rf,"__esModule",{value:!0});Rf.toNumber=vG;function vG(e){return typeof e=="number"?e:Number(e)}});var AL=W(xf=>{"use strict";Object.defineProperty(xf,"__esModule",{value:!0});xf.toDate=_G;function _G(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var bL=W(Tf=>{"use strict";Object.defineProperty(Tf,"__esModule",{value:!0});Tf.toBoolean=WG;function WG(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var PL=W(Sd=>{"use strict";Object.defineProperty(Sd,"__esModule",{value:!0});Sd.isSymbol=void 0;var LG=O(),EG=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,LG.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Sd.isSymbol=EG});var Ys=W(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var kG=jc();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return kG.isType}});var If=cW();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return If.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return If.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return If.isNestedType}});var CG=dW();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return CG.isObjectWith}});var RG=uW();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return RG.isObject}});var xG=pW();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return xG.guardWithTolerance}});var TG=mW();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return TG.isBranded}});var IG=gW();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return IG.BrandSymbols}});var OG=fW();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return OG.isAny}});var MG=hW();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return MG.isBoolean}});var NG=yW();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return NG.isDate}});var jG=Jg();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return jG.isDefined}});var DG=Oc();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return DG.isNil}});var zG=nf();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return zG.isNumber}});var $G=SW();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return $G.isString}});var HG=AW();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return HG.isUnknown}});var FG=bW();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return FG.isFunction}});var UG=wW();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return UG.isFile}});var BG=_W();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return BG.isFileList}});var GG=LW();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return GG.isBlob}});var VG=kW();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return VG.isFormData}});var qG=RW();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return qG.isURL}});var KG=TW();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return KG.isURLSearchParams}});var JG=IW();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return JG.isMap}});var YG=OW();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return YG.isSet}});var XG=MW();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return XG.isIndexSignature}});var ZG=NW();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return ZG.isError}});var QG=lf();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return QG.isArrayWithEachItem}});var e2=cf();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return e2.isNonEmptyArray}});var t2=jW();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return t2.isNonEmptyArrayWithEachItem}});var r2=zW();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return r2.isTuple}});var o2=Ar();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return o2.isNonNullObject}});var n2=$W();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return n2.isObjectWithEachItem}});var s2=HW();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return s2.isPartialOf}});var i2=FW();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return i2.isPick}});var a2=UW();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return a2.isOmit}});var l2=BW();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return l2.isNonEmptyString}});var c2=GW();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return c2.isNonNegativeNumber}});var d2=VW();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return d2.isPositiveNumber}});var u2=qW();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return u2.isNonPositiveNumber}});var p2=KW();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return p2.isNegativeNumber}});var m2=JW();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return m2.isInteger}});var g2=YW();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return g2.isPositiveInteger}});var f2=XW();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return f2.isNegativeInteger}});var h2=ZW();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return h2.isNonNegativeInteger}});var y2=QW();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return y2.isNonPositiveInteger}});var S2=eL();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return S2.isNumeric}});var A2=tL();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return A2.isBooleanLike}});var b2=rL();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return b2.isDateLike}});var P2=oL();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return P2.isBigInt}});var w2=Sf();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return w2.isOneOf}});var v2=sL();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return v2.isOneOfTypes}});var _2=iL();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return _2.isIntersectionOf}});var W2=aL();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return W2.isExtensionOf}});var L2=lL();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return L2.isNullOr}});var E2=cL();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return E2.isUndefinedOr}});var k2=dL();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return k2.isNilOr}});var C2=uL();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return C2.isAsserted}});var R2=pL();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return R2.isEnum}});var x2=mL();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return x2.isEqualTo}});var T2=gL();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return T2.isRegex}});var I2=hL();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return I2.isPattern}});var O2=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return O2.generateTypeGuardError}});var M2=yL();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return M2.by}});var N2=SL();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return N2.toNumber}});var j2=AL();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return j2.toDate}});var D2=bL();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return D2.toBoolean}});var z2=PL();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return z2.isSymbol}})});var Xs,wL,vL,Qr,Of,PY,_L,Ad,eo,Zs,Mf,Nf,jf,Df,$t,zf,bd,Pd,wd,Qs,lt,pn,mn,vd,br,$f,WL,vt=l(()=>{"use strict";Xs={production:".agent-witch",localhost:".local-agent-witch"},wL={production:47892,localhost:47893},vL={production:"com.agent-witch",localhost:"com.local-agent-witch"},Qr={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Of="app",PY=`${Of}/agent-witch.js`,_L=`${Of}/command`,Ad={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},eo=Xs.production,Zs=Xs.localhost,Mf=wL.production,Nf=wL.localhost,jf=vL.production,Df=vL.localhost,$t="profiles",zf=Qr.activeProfile,bd="harness",Pd="sets",wd="manifest.json",Qs=Ad.projectsDir,lt=Ad.logsDir,pn="agent-witch.log",mn="agent-witch.error.log",vd=Ad.reportsDir,br=Ad.deviceKeypairJson,$f=Of,WL="agent-witch.js"});var gn,LL,$2,EL,kL=l(()=>{"use strict";gn=m(require("node:path")),LL=require("node:url"),$2=()=>!0,EL=()=>{if($2()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?gn.default.dirname(gn.default.resolve(e)):gn.default.dirname(gn.default.resolve(__filename))}return gn.default.dirname((0,LL.fileURLToPath)(__agentWitchImportMetaUrl))}});var Hf,CL,N,RL,H2,Pr,E,_d,Ht,xL,Wd,fn,Ld,Ed,ne,ct,Ff,dt,Uf,M,Bf=l(()=>{"use strict";Hf=m(require("node:fs")),CL=m(require("node:os")),N=m(require("node:path")),RL=m(Ys());vt();kL();H2=EL(),Pr=e=>e.trim().toLowerCase(),E=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return N.default.resolve(e);let t=N.default.resolve(H2),r=N.default.basename(t),o=N.default.basename(N.default.dirname(t));return r===$f&&(o===eo||o===Zs)?N.default.dirname(t):r===eo||r===Zs?t:N.default.join(CL.default.homedir(),eo)},_d=(e=E())=>N.default.join(e,$f),Ht=(e=E())=>N.default.join(_d(e),WL),xL=(e,t,r)=>t!==null?N.default.join(e,$t,t,r):N.default.join(e,r),Wd=e=>xL(e.installDir,e.profileEmail,Qs),fn=e=>xL(e.installDir,e.profileEmail,lt),Ld=e=>e.profileEmail!==null?N.default.join(e.installDir,$t,e.profileEmail,br):N.default.join(e.installDir,br),Ed=e=>N.default.basename(e)===Zs,ne=(e=E())=>Ed(e)?Df:jf,ct=(e=E())=>Ed(e)?Nf:Mf,Ff=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Pr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Pr(t):null},dt=(e=E())=>{let t=N.default.join(e,zf);if(!Hf.default.existsSync(t))return null;try{let r=JSON.parse(Hf.default.readFileSync(t,"utf8"));if((0,RL.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Pr(r.email)}catch{return null}return null},Uf=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Pr(r):null}let t=Ff();return t!==null?t:dt()},M=e=>{let t=E(),r=_d(t),o=Ht(t),n=Uf(e);if(n!==null){let A=N.default.join(t,$t,n),h=N.default.join(A,bd),y=N.default.join(A,Qs),u=N.default.join(A,lt),S=N.default.join(A,vd),b=N.default.join(A,br),f=N.default.join(A,lt,pn),w=N.default.join(A,lt,mn);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:u,mainLogPath:f,errorLogPath:w,reportsDir:S,deviceKeypairPath:b,configPath:N.default.join(A,"config.json"),harnessRootDir:h,harnessManifestPath:N.default.join(h,wd),harnessSetsDir:N.default.join(h,Pd)}}let s=N.default.join(t,bd),i=N.default.join(t,Qs),a=N.default.join(t,lt),c=N.default.join(t,vd),d=N.default.join(t,br),p=N.default.join(t,lt,pn),g=N.default.join(t,lt,mn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:g,reportsDir:c,deviceKeypairPath:d,configPath:N.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:N.default.join(s,wd),harnessSetsDir:N.default.join(s,Pd)}}});var Gf,TL,F2,U2,IL,Vf,OL=l(()=>{"use strict";Gf=m(require("node:fs")),TL=m(require("node:path"));vt();Bf();F2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),U2=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,IL=e=>{let t=TL.default.join(e,Qr.wakePort);if(!Gf.default.existsSync(t))return null;try{let r=JSON.parse(Gf.default.readFileSync(t,"utf8"));if(F2(r)&&U2(r.wakePort))return r.wakePort}catch{return null}return null},Vf=(e=E())=>IL(e)??ct(e)});var V=l(()=>{"use strict";Bf();OL()});var ei,K2,J2,ML,Y2,X2,NL=l(()=>{"use strict";V();ei=ne(),K2=`${ei}-wake`,J2=`${ei}-live`,ML=`${ei}-watchdog`,Y2=`${ei}-automation-scheduler`,X2=`${ei}-updater`});var qf,Kf,kd=l(()=>{"use strict";qf=new Set(["","loginwindow","_mbsetupuser","root"]),Kf=5e3});var jL,Z2,DL,Jf,Yf=l(()=>{"use strict";jL=require("node:child_process");kd();Z2=e=>e.trim().toLowerCase(),DL=e=>e==null?!1:!qf.has(Z2(e)),Jf=()=>{if(process.platform!=="darwin")return null;try{let t=(0,jL.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return DL(t)?t:null}catch{return null}}});var $L,zL,ut,ti=l(()=>{"use strict";$L=m(require("node:os"));Yf();zL=e=>e.trim().toLowerCase(),ut=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?Jf():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??$L.default.userInfo().username;return zL(r)===zL(o)}});var HL,FL,to,UL=l(()=>{"use strict";HL=require("node:child_process"),FL=m(require("node:fs"));V();ti();to=(e=E())=>{let t=Ht(e);if(!FL.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!ut())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=dt(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,HL.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var BL,ri,Cd=l(()=>{"use strict";BL=require("node:child_process"),ri=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,BL.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Rd,Xf,GL,ee,xd,oi=l(()=>{"use strict";Rd=m(require("node:fs")),Xf=m(require("node:path"));V();vt();GL=e=>{let t=Xf.default.join(e,$t);return Rd.default.existsSync(t)?Rd.default.readdirSync(t).filter(r=>Rd.default.statSync(Xf.default.join(t,r)).isDirectory()).map(r=>Pr(r)).toSorted():[]},ee=(e=E())=>{let t=ne(e);return[{profileEmail:GL(e)[0]??null,launchAgentLabel:t}]},xd=(e=E())=>GL(e)});var Zf,VL,qL,Q2,Ft,Td=l(()=>{"use strict";Zf=m(require("node:fs")),VL=m(require("node:os")),qL=m(require("node:path"));V();oi();Q2=()=>qL.default.join(VL.default.homedir(),"Library","LaunchAgents"),Ft=(e=E())=>{let t=ne(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ee(e))r.add(n.launchAgentLabel);let o=Q2();if(Zf.default.existsSync(o))for(let n of Zf.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var KL,ni,JL=l(()=>{"use strict";V();Cd();Td();oi();KL=(e=E())=>{let t=new Set(ee(e).map(r=>r.launchAgentLabel));return Ft(e).filter(r=>!t.has(r))},ni=(e=E())=>{for(let t of KL(e))ri(t)}});var si,Qf=l(()=>{"use strict";V();Cd();Td();si=(e=E())=>{for(let t of Ft(e))ri(t)}});var YL,XL,e5,ro,ZL=l(()=>{"use strict";YL=require("node:child_process"),XL=require("node:util"),e5=(0,XL.promisify)(YL.execFile),ro=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await e5("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var oo,t5,eh,th=l(()=>{"use strict";oo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),t5=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,eh=e=>{let t=e.pathValue??t5(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${oo(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${oo(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${oo(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${oo(e.homeDir)}</string>
    <key>PATH</key>
    <string>${oo(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${oo(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${oo(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var Id,rh=l(()=>{"use strict";Id=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var no,oh,ii,r5,o5,n5,QL,Ut,nh=l(()=>{"use strict";no=m(require("node:fs")),oh=m(require("node:os")),ii=m(require("node:path"));vt();V();th();rh();r5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),o5=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,n5=e=>{let t=ii.default.join(e,Qr.wakePort);if(!no.default.existsSync(t))return ct(e);try{let r=JSON.parse(no.default.readFileSync(t,"utf8"));if(r5(r)&&o5(r.wakePort))return r.wakePort}catch{return ct(e)}return ct(e)},QL=(e,t=oh.default.homedir())=>ii.default.join(t,"Library","LaunchAgents",`${e}.plist`),Ut=e=>{let t=e.installDir??E(),r=e.homeDir??oh.default.homedir(),o=QL(e.launchAgentLabel,r),n=no.default.existsSync(o)?no.default.readFileSync(o,"utf8"):null;if(n!==null&&Id(n))return{ok:!0,rewritten:!1,plistPath:o};let s=eh({launchAgentLabel:e.launchAgentLabel,runPath:ii.default.join(t,_L,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??n5(t)});if(!Id(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{no.default.mkdirSync(ii.default.dirname(o),{recursive:!0}),no.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var tE,rE,oE,ai,s5,i5,eE,Le,sh=l(()=>{"use strict";tE=require("node:child_process"),rE=m(require("node:fs")),oE=require("node:util");V();nh();ti();ai=(0,oE.promisify)(tE.execFile),s5=async e=>{try{return await ai("launchctl",["print",e]),!0}catch{return!1}},i5=async(e,t,r)=>{await s5(t)&&await ai("launchctl",["bootout",t]).catch(()=>{}),await ai("launchctl",["bootstrap",e,r]),await ai("launchctl",["enable",t])},eE=async e=>{try{return await ai("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Le=async(e,t=E())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!ut())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=Ut({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await eE(n))return{ok:!0};let i=s.plistPath;if(!rE.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await i5(o,n,i),await eE(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var so,nE=l(()=>{"use strict";V();sh();oi();so=async(e=E())=>{let t=[];for(let r of ee(e))(await Le(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var Be,Bt,sE=l(()=>{"use strict";Qf();ti();kd();Be=e=>{ut()||(si(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Bt=(e,t=Kf)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{ut()||e()},t);return()=>{clearInterval(r)}}});var te=l(()=>{"use strict";NL();UL();Cd();JL();Qf();Td();ti();ZL();nE();sh();nh();rh();th();oi();Yf();kd();sE()});var ih=l(()=>{"use strict";te()});var iE,aE,Od,lE,hn,cE,dE,io=l(()=>{"use strict";iE=".agent-witch",aE="memory",Od="project.json",lE="chunks.ndjson",hn="runs.ndjson",cE="reports",dE=".json"});var uE=l(()=>{"use strict";io()});var pE,Md,ah=l(()=>{"use strict";pE=m(require("node:path"));uE();Md=(e,t)=>pE.default.join(e.trim(),`${t.trim()}${dE}`)});var li,mE,gE=l(()=>{"use strict";li="agent-witch.js",mE="command"});var Nd=l(()=>{"use strict";gE()});var ao,fE,hE=l(()=>{"use strict";Nd();ao=e=>`'${e.replace(/'/g,"'\\''")}'`,fE=e=>{let t=`${e.installDir.trim()}/${"app"}/${li}`,r=[ao("node"),ao(t),"report","write","--key",ao(e.reportKey.trim()),"--agent-run-id",ao(e.agentRunId.trim()),"--status",ao(e.status),"--summary",ao(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",ao(e.details.trim())),r.join(" ")}});var _t,yE,a5,lh,jd=l(()=>{"use strict";ah();hE();_t={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},yE=e=>e===_t.COMPLETED||e===_t.FAILED,a5=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),lh=(e,t)=>{let r=Md(t.reportsDir,t.reportKey),o=fE({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:_t.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${a5({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Ee=l(()=>{"use strict";vt();V()});var di,AE,SE,bE,l5,yn,c5,PE,ui,pi,ch,wE,vE,mi=l(()=>{"use strict";di=m(require("node:fs")),AE=m(require("node:path"));jd();ah();Ee();SE=50,bE=e=>{let t=M(),r=Md(t.reportsDir,e);return di.default.mkdirSync(AE.default.dirname(r),{recursive:!0}),r},l5=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},yn=e=>{let t=bE(e);if(!di.default.existsSync(t))return null;try{let r=JSON.parse(di.default.readFileSync(t,"utf8"));return l5(r)?r:null}catch{return null}},c5=(e,t)=>{let r=[...e,t];return r.length>SE?r.slice(r.length-SE):r},PE=e=>{let t=bE(e.reportKey);di.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},ui=e=>{let t=yn(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:c5(t?.history??[],o)};return PE(n),n},pi=e=>{let t=yn(e.reportKey);return t!==null?t:ui({reportKey:e.reportKey,agentRunId:e.agentRunId,status:_t.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},ch=(e,t)=>{let r=t.trim();if(r.length===0)return yn(e);let o=yn(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return PE(s),s},wE=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},vE=e=>{if(e===null||!yE(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===_t.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var d5,u5,gi,_E,Dd,dh=l(()=>{"use strict";jd();mi();d5=new Set(Object.values(_t)),u5=e=>d5.has(e),gi=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},_E=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Dd=e=>{if(e[0]!=="write")return _E(),1;let r=gi(e,"--key"),o=gi(e,"--agent-run-id"),n=gi(e,"--status"),s=gi(e,"--summary"),i=gi(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!u5(n)?(_E(),1):(ui({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var Ge,lo=l(()=>{"use strict";Ge=()=>!0});var uh,WE,co,zd=l(()=>{"use strict";uh=m(require("node:path")),WE=require("node:url");lo();co=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=uh.default.resolve(t);return Ge()?r===uh.default.resolve(__filename):e===void 0?!1:r===(0,WE.fileURLToPath)(e)}});var $d,Sn,g5,wZ,An=l(()=>{"use strict";$d="agent-witch.js",Sn="deps.tar.gz",g5="install.sh",wZ={mainScript:`app/${$d}`,depsArchive:`app/${Sn}`,installShell:g5}});var CE=l(()=>{"use strict";An()});var RE=l(()=>{"use strict";An();CE()});var fi,mh,Hd,f5,hi,ke,Pn,yi,Si,uo,gh=l(()=>{"use strict";fi=m(require("node:fs")),mh=m(require("node:path"));RE();V();Hd="install-version.json",f5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hi=(e=E())=>mh.default.join(e,Hd),ke=(e=E())=>{let t=hi(e);if(!fi.default.existsSync(t))return null;try{let r=JSON.parse(fi.default.readFileSync(t,"utf8"));return!f5(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Pn=(e,t=E())=>{let r=hi(t);fi.default.mkdirSync(mh.default.dirname(r),{recursive:!0}),fi.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},yi=(e=E())=>ke(e)?.bundleVersion??"226",Si=(e,t)=>{let r=ke(e);if(r!==null)return r;let o={bundleVersion:"226",appOrigin:t,updatedAt:new Date().toISOString()};return Pn(o,e),o},uo=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var xE,po,fh,hh,yh,Fd,Wt,mo,Sh=l(()=>{"use strict";xE=require("node:crypto"),po=m(require("node:fs")),fh=m(require("node:path"));V();hh="self-update-log.ndjson",yh=100,Fd=(e=E())=>{let t=M(),r=t.installDir===e?t.logsDir:fn({installDir:e,profileEmail:t.profileEmail});return fh.default.join(r,hh)},Wt=(e,t=E())=>{let r={id:(0,xE.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Fd(t);po.default.mkdirSync(fh.default.dirname(o),{recursive:!0});let n=po.default.existsSync(o)?po.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-yh+1)),JSON.stringify(r)];return po.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},mo=(e=20,t=E())=>{let r=Fd(t);if(!po.default.existsSync(r))return[];let o=po.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var Ah,zZ,bh=l(()=>{"use strict";An();Ah="deps",zZ=`${"app"}/${Sn}`});var TE=l(()=>{"use strict";bh()});var IE,wr,go,OE,Ph,wh,ME=l(()=>{"use strict";IE=require("node:child_process"),wr=m(require("node:fs")),go=m(require("node:path"));An();bh();OE=e=>go.default.join(e,"app",Ah),Ph=e=>{let t=go.default.join(e,"app"),r=go.default.join(t,Sn);wr.default.existsSync(r)&&(wr.default.rmSync(OE(e),{recursive:!0,force:!0}),wr.default.mkdirSync(t,{recursive:!0}),(0,IE.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),wr.default.rmSync(r,{force:!0}))},wh=e=>{wr.default.rmSync(go.default.join(e,"node_modules"),{recursive:!0,force:!0}),wr.default.rmSync(go.default.join(e,"package.json"),{force:!0}),wr.default.rmSync(go.default.join(e,"package-lock.json"),{force:!0})}});var NE=l(()=>{"use strict";TE();ME()});var Gt,Ud,jE=l(()=>{"use strict";Gt="https://www.agentwitch.com",Ud="wss://www.agentwitch.com/api/agent-witch/ws"});var Ai,Vt,DE=l(()=>{"use strict";Ai="127.0.0.1",Vt=`http://${Ai}:43347`});var qt=l(()=>{"use strict";jE();DE()});var bi,Bd,zE,_h,h5,$E,Eh,HE,pt,Pi,wi,kh,Wh,Lh,vi,Ch,Rh,xh,wn=l(()=>{"use strict";bi=m(require("node:fs")),Bd=m(require("node:path")),zE="active-writer-work.json",_h=new Set,h5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$E=e=>e.profileEmail===null?Bd.default.join(e.installDir,zE):Bd.default.join(e.installDir,"profiles",e.profileEmail,zE),Eh=e=>{let t=$E(e);if(!bi.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(bi.default.readFileSync(t,"utf8"));return!h5(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},HE=(e,t)=>{let r=$E(e);bi.default.mkdirSync(Bd.default.dirname(r),{recursive:!0}),bi.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},pt=e=>Eh(e).activeCount>0,Pi=e=>{let t=Eh(e);HE(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},wi=e=>{let t=Eh(e),r=Math.max(0,t.activeCount-1);if(HE(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of _h)o()},kh=e=>(_h.add(e),()=>{_h.delete(e)}),Wh=null,Lh=null,vi=e=>{Wh=e},Ch=e=>{Lh=e},Rh=()=>{let e=Wh;return Wh=null,e},xh=()=>{let e=Lh;return Lh=null,e}});var Ce,Th=l(()=>{"use strict";Ce=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var vn,Gd,_i,Ih=l(()=>{"use strict";vn="qwen2.5:7b",Gd="nomic-embed-text",_i="Install Ollama from https://ollama.com/download"});var Wi,FE,Oh=l(()=>{"use strict";Ih();Wi=()=>`
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
    echo "Ollama is missing. ${_i}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${_i}" >&2
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
  agent_witch_ensure_ollama_model "${vn}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${Gd}" "\${pull_log}"
}
`,FE=()=>`
${Wi()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var UE,y5,Vd,Mh=l(()=>{"use strict";UE=require("node:child_process");V();Oh();y5=e=>new Promise(t=>{let r=(0,UE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:E()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Vd=async(e=y5)=>{let t=`${Wi()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var vr,qd,BE,S5,GE,Wn,A5,b5,P5,_n,fo,ho,VE=l(()=>{"use strict";vr=m(require("node:fs")),qd=m(require("node:path"));NE();te();V();An();qt();gh();wn();Th();Sh();Mh();BE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),S5=e=>{let t=dt(e),r=t===null?M():M(t);if(!vr.default.existsSync(r.configPath))return null;try{let o=JSON.parse(vr.default.readFileSync(r.configPath,"utf8"));return!BE(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},GE=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!BE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},Wn=async e=>(await GE(e))?.bundleVersion??null,A5=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=qd.default.join(t,r);vr.default.mkdirSync(qd.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());vr.default.writeFileSync(n,s),r.endsWith(".js")&&vr.default.chmodSync(n,493)},b5=async()=>{ni(),await so()},P5=(e,t)=>e!==null?Ce(e):t??Gt,_n=(e,t)=>({localBundleVersion:t,...e}),fo=async e=>{let t=E(),r=ke(t),o=r?.bundleVersion??null,n=await Vd();Wt({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=S5(t),i=P5(s,r?.appOrigin);if(i===null){let d=_n({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return Wt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await GE(i);if(a===null){let d=_n({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return Wt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||uo(o,a.bundleVersion))){let d=_n({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Wt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let A of a.scripts)await A5(i,t,A);let d=qd.default.join(t,$d);vr.default.existsSync(d)&&vr.default.rmSync(d,{force:!0}),Ph(t),wh(t),Pn({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=M(dt(t));if(pt(p)){let A=_n({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Wt({event:"update_applied",ok:!0,message:A.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),A}await b5();let g=_n({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Wt({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",g=_n({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return Wt({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}},ho=()=>{let e=E();return{local:ke(e),logs:mo(20,e)}}});var qE={};Pt(qE,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>Hd,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>_i,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Gd,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>vn,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>hh,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>yh,appendAgentWitchSelfUpdateLog:()=>Wt,buildAgentWitchEnsureOllamaShell:()=>Wi,buildAgentWitchInstallScriptOllama:()=>FE,buildAgentWitchSelfUpdateStatus:()=>ho,ensureAgentWitchInstallVersionRecorded:()=>Si,ensureAgentWitchOllamaInstalled:()=>Vd,fetchAgentWitchRemoteInstallBundleVersion:()=>Wn,isRemoteAgentWitchBundleVersionNewer:()=>uo,readAgentWitchInstallVersion:()=>ke,readAgentWitchSelfUpdateLogs:()=>mo,resolveAgentWitchAppOriginFromWsUrl:()=>Ce,resolveAgentWitchHeartbeatInstallBundleVersion:()=>yi,resolveAgentWitchInstallVersionPath:()=>hi,resolveAgentWitchSelfUpdateLogPath:()=>Fd,runAgentWitchSelfUpdate:()=>fo,writeAgentWitchInstallVersion:()=>Pn});var Qe=l(()=>{"use strict";gh();Sh();VE();Th();Ih();Oh();Mh()});var Nh={};Pt(Nh,{buildAgentWitchSelfUpdateStatus:()=>ho,fetchAgentWitchRemoteInstallBundleVersion:()=>Wn,runAgentWitchSelfUpdate:()=>fo});var jh=l(()=>{"use strict";Qe()});function Ln(e){return(0,KE.createHash)("sha256").update(e.trim()).digest("hex")}var KE,Dh=l(()=>{"use strict";KE=require("node:crypto")});var En,Li,w5,JE,zh,YE=l(()=>{"use strict";En=m(require("node:fs")),Li=m(require("node:path"));Dh();Ee();w5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),JE=e=>{if(!En.default.existsSync(e))return null;try{let t=JSON.parse(En.default.readFileSync(e,"utf8"));return!w5(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Ln(t.pairingToken.trim())}catch{return null}},zh=(e=E())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(JE(Li.default.join(e,"config.json")));let n=Li.default.join(e,$t);if(!En.default.existsSync(n))return t;for(let s of En.default.readdirSync(n)){let i=Li.default.join(n,s);En.default.statSync(i).isDirectory()&&o(JE(Li.default.join(i,"config.json")))}return t}});var $h,XE,Kd,Ei,ki,v5,_5,W5,ZE,le,ce,Jd,Lt,mt=l(()=>{"use strict";$h=m(require("node:fs")),XE=m(require("node:os")),Kd=m(require("node:path")),Ei={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},ki=e=>e.trim().length>0,v5=e=>{let t=Kd.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},_5=()=>{let e=XE.default.homedir(),t=Kd.default.join(e,".local","bin","agent");if($h.default.existsSync(t))return t;let r=Kd.default.join(e,".local","bin","cursor-agent");return $h.default.existsSync(r)?r:Ei.cursorCommand},W5=e=>{let t=e.trim();return!ki(t)||t===Ei.cursorCommand?_5():t},ZE=(e,t)=>v5(e)?t:["agent",...t],le=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ce=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:ki(t)?t.trim():Ei.claudeCommand,codexCommand:ki(r)?r.trim():Ei.codexCommand,cursorCommand:W5(o),antigravityCommand:ki(n)?n.trim():Ei.antigravityCommand}},Jd=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:ZE(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Lt=(e,t,r,o)=>{let n=t.trim();if(!ki(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:ZE(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",n]}}});var _r,L5,kn,E5,Cn,Yd=l(()=>{"use strict";_r=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,L5=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:_r(s.inputTokens)+_r(s.outputTokens)+_r(s.cacheReadInputTokens)+_r(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},kn=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=_r(a.input_tokens)+_r(a.cache_creation_input_tokens)+_r(a.cache_read_input_tokens),d=_r(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:L5(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},E5=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),Cn=(e,t)=>{let r=kn(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??E5(r)}}});var Hh,k5,C5,Fh,Uh=l(()=>{"use strict";Hh=e=>e.toLocaleString("en-US"),k5=e=>e<.01?e.toFixed(4):e.toFixed(3),C5=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${k5(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Hh(e.inputTokens)} in / ${Hh(e.outputTokens)} out (${Hh(e.totalTokens)} total)`,t].join(`
`)},Fh=(e,t)=>{if(t===void 0)return e;let r=C5(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Xd,Bh=l(()=>{"use strict";Xd={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var yo,Gh,Zd,Vh=l(()=>{"use strict";Bh();yo="auto",Gh=e=>({value:yo,label:`Auto (${Xd[e]})`}),Zd={anthropic:[Gh("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[Gh("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[Gh("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Rn,Ci,qh,Ri=l(()=>{"use strict";Bh();Vh();Rn=e=>{let t=e?.trim()??"";if(!(t.length===0||t===yo))return t},Ci=(e,t)=>{let r=Rn(t);return r===void 0?Xd[e]:r},qh=e=>{let t=Rn(e);return t===void 0?yo:t}});var Qd,R5,x5,eu,QE=l(()=>{"use strict";Qd={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},R5=e=>{let t=Qd[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Qd["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Qd["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Qd["gemini-2.0-flash"]:null},x5=(e,t,r)=>{let o=R5(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},eu=e=>{let t=x5(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var xn,T5,I5,O5,tu,ek=l(()=>{"use strict";QE();xn=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),T5=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=xn(r.input_tokens),n=xn(r.output_tokens);return o===0&&n===0?null:eu({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},I5=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=xn(r.prompt_tokens),n=xn(r.completion_tokens);return o===0&&n===0?null:eu({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},O5=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=xn(r.promptTokenCount),n=xn(r.candidatesTokenCount);return o===0&&n===0?null:eu({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},tu=(e,t,r)=>e==="anthropic"?T5(t,r):e==="openai"?I5(t,r):O5(t,r)});var M5,Kh,N5,j5,D5,z5,$5,Jh,Yh=l(()=>{"use strict";Ri();ek();M5=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},Kh=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Ci(e,t.model)},N5=async e=>{let t=Kh("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=M5(o);n.length>0&&e.onChunk?.(n);let s=tu("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},j5=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},D5=async e=>{let t=Kh("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=j5(o);n.length>0&&e.onChunk?.(n);let s=tu("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},z5=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},$5=async e=>{let t=Kh("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=z5(n);s.length>0&&e.onChunk?.(s);let i=tu("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},Jh=async e=>{try{return e.provider==="anthropic"?await N5(e):e.provider==="openai"?await D5(e):await $5(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Ve,xi=l(()=>{"use strict";Ve=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var tk,H5,ru,Xh=l(()=>{"use strict";tk=m(require("node:path")),H5="writer-api-secrets.json",ru=e=>tk.default.join(e,H5)});var Zh,rk,F5,Wr,ze,Lr=l(()=>{"use strict";Zh=m(require("node:fs"));Ri();Xh();rk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),F5=e=>{if(!rk(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=Rn(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},Wr=e=>{let t=ru(e);if(!Zh.default.existsSync(t))return{};try{let r=JSON.parse(Zh.default.readFileSync(t,"utf8"));if(!rk(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=F5(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},ze=(e,t)=>Wr(e)[t]??null});var Re,Ti=l(()=>{"use strict";Re=e=>e==="api"?"api":"cli"});var ok,Pe,So,Kt=l(()=>{"use strict";ok=m(require("node:path"));xi();Lr();Ti();Pe=e=>ok.default.dirname(e),So=(e,t)=>{if(Re(e.writerExecutionBackend)!=="api")return!1;let r=Ve(t);if(r===null)return!1;let o=Pe(e.layout.configPath),n=ze(o,r);return n!==null&&n.apiKey.length>0}});var Ii,Qh=l(()=>{"use strict";Uh();Yh();xi();Lr();Kt();Ii=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Ve(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Pe(e.layout.configPath),a=ze(i,s);if(a===null){let d=Object.keys(Wr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await Jh({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:Fh(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var nk,Tn,ey=l(()=>{"use strict";nk=require("node:child_process");mt();Yd();Qh();Kt();Tn=(e,t,r)=>new Promise(o=>{if(!le(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(So(e,t)){Ii(e,t,r).then(o);return}let n=Lt(t,r,ce({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,nk.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=Cn(i.join("")),p=a.join("").trim(),g=[d.output.trim(),p].filter(A=>A.length>0).join(`
`);o({exitCode:c??-1,output:g})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var sk=l(()=>{"use strict"});var ik=l(()=>{"use strict";Uh();ey();Yh();sk();Lr();Kt()});var ak,lk,ck,dk=l(()=>{"use strict";ak="claude",lk="codex",ck="cursor"});var uk,U5,ty,Oi,ou=l(()=>{"use strict";uk=m(require("node:path"));qt();vt();U5="ws://localhost:3000/api/agent-witch/ws",ty=e=>e.replace(/\/$/,""),Oi=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return ty(t);let r=uk.default.basename(e.installDir);if(r===Xs.production)return Ud;let o=e.configWsUrl?.trim()??"";return r===Xs.localhost?o.length>0?ty(o):U5:o.length>0?ty(o):Ud}});var G5,ry,oy=l(()=>{"use strict";dk();ou();Ti();G5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ry=e=>{if(!G5(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Oi({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??ak,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??lk,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??ck,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Re(t.writerExecutionBackend),layout:e.layout}}}});var ny,sy,iy=l(()=>{"use strict";ny=m(require("node:fs"));V();oy();sy=e=>{let t=M(e);if(!ny.default.existsSync(t.configPath))return null;try{let r=JSON.parse(ny.default.readFileSync(t.configPath,"utf8")),o=ry({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Mi,pk=l(()=>{"use strict";Mi=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var ay,V5,ly,mk=l(()=>{"use strict";ay=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),V5=e=>{if(!ay(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!ay(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(g=>{if(!ay(g))return[];let A=typeof g.itemKey=="string"?g.itemKey.trim():"",h=typeof g.relativePath=="string"?g.relativePath:"",y=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return A.length===0||y.length===0?[]:[{itemKey:A,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},ly=V5});var gk,q5,nu,cy=l(()=>{"use strict";gk=m(require("node:path")),q5=(e,t)=>{let r=t.trim();return gk.default.join(e,"components","store",r.slice(0,2),r)},nu=q5});var fk,K5,dy,hk=l(()=>{"use strict";fk=m(require("node:fs"));cy();K5=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=nu(e.installDir,n.contentSha256);fk.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},dy=K5});var Ni,In,J5,uy,Y5,py,my=l(()=>{"use strict";Ni=m(require("node:fs")),In=m(require("node:path"));cy();J5=(e,t)=>In.default.join(e.installDir,"runs",t,"overlay"),uy=(e,t)=>In.default.join(J5(e,t),".cursor"),Y5=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=uy(e,t);Ni.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=nu(e.installDir,i.contentSha256);if(!Ni.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?In.default.join(n,c):In.default.join(n,i.itemKey);Ni.default.mkdirSync(In.default.dirname(d),{recursive:!0}),Ni.default.copyFileSync(a,d)}return{ok:!0}},py=Y5});var gy,yk,X5,ji,Sk=l(()=>{"use strict";gy=m(require("node:fs")),yk=m(require("node:path")),X5=(e,t)=>{let r=yk.default.join(e.installDir,"runs",t);gy.default.existsSync(r)&&gy.default.rmSync(r,{recursive:!0,force:!0})},ji=X5});var Z5,fy,Ak=l(()=>{"use strict";my();Z5=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=uy(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},fy=Z5});var hy,Q5,eV,tV,rV,oV,$,bk=l(()=>{"use strict";hy=m(require("node:fs"));ou();V();Ti();Q5="claude",eV="codex",tV="cursor",rV="agy",oV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=M();if(!hy.default.existsSync(e.configPath))return null;try{let t=JSON.parse(hy.default.readFileSync(e.configPath,"utf8"));if(!oV(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Oi({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Re(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:Q5,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:eV,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:tV,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:rV,pairingToken:s,layout:e}}catch{return null}}});var su,Pk,wk=l(()=>{"use strict";su=m(require("node:fs"));Xh();Pk=(e,t)=>{let r=ru(e);su.default.mkdirSync(e,{recursive:!0}),su.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{su.default.chmodSync(r,384)}catch{}}});var iu,vk,yy=l(()=>{"use strict";iu=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},vk=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===iu(t)}});var Di,nV,Sy,Ay,_k=l(()=>{"use strict";Di=m(require("node:fs"));Lr();wk();yy();Ri();Kt();nV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Sy=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=vk(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?Rn(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},Ay=e=>{let t=Pe(e.configPath),r={};if(Di.default.existsSync(e.configPath))try{let n=JSON.parse(Di.default.readFileSync(e.configPath,"utf8"));nV(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,Di.default.mkdirSync(t,{recursive:!0}),Di.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=Sy(Sy(Sy(Wr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);Pk(t,o)}});var by,Wk=l(()=>{"use strict";by={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var Py,Lk=l(()=>{"use strict";xi();Lr();Kt();Kt();Py=(e,t)=>{if(So(e,t))return!1;let r=Ve(t);if(r===null)return!1;let o=Pe(e.layout.configPath),n=ze(o,r);return n===null||n.apiKey.trim().length===0}});var Ek,wy,vy=l(()=>{"use strict";Ek=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},wy=async e=>{let t=Ek(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=Ek(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var sV,_y,kk=l(()=>{"use strict";te();iy();vy();sV=1e4,_y=()=>wy({listProfileEmails:xd,readConfig:sy,pollIntervalMs:sV,logWaiting:e=>{console.error(e)}})});var de=l(()=>{"use strict";ey();ik();iy();ou();pk();mk();hk();my();Sk();Ak();Ti();bk();_k();Lr();Kt();yy();Ri();Wk();Qh();Kt();Lk();xi();Lr();kk();oy();vy()});var au,Ck,iV,aV,Rk,lu,zi,cu,$i=l(()=>{"use strict";au=m(require("node:fs")),Ck=m(require("node:path")),iV="wake-port.json",aV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Rk=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,lu=e=>Ck.default.join(e,iV),zi=e=>{let t=lu(e);if(!au.default.existsSync(t))return null;try{let r=JSON.parse(au.default.readFileSync(t,"utf8"));if(aV(r)&&Rk(r.wakePort))return r.wakePort}catch{return null}return null},cu=(e,t)=>{if(!Rk(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=lu(e);au.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Qte,ere,tre,gt,xk,Hi=l(()=>{"use strict";$i();Ee();$i();Qte=ct(),ere=`${ne()}-wake`,tre=ne(),gt=()=>{let e=E(),t=zi(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return ct()},xk=e=>{let t=E();zi(t)===null&&cu(t,e)}});var Tk=l(()=>{"use strict";Dh();te();YE();de();Hi()});var Wy,Fi,Ui,Ik=l(()=>{"use strict";Wy=m(require("node:os"));Tk();Fi=()=>{let e=ee();return{ok:!0,port:gt(),hostname:Wy.default.hostname(),profileCount:e.length}},Ui=()=>{let e=ee(),t=$()?.pairingToken.trim()??"",r=t.length>0?Ln(t):null,o=zh();return{hostname:Wy.default.hostname(),port:gt(),tokenHash:r,tokenHashes:o.length>0?o:r!==null?[r]:[],profiles:e.map(n=>({email:n.profileEmail,launchAgentLabel:n.launchAgentLabel}))}}});var Ly=l(()=>{"use strict";Ik()});var Ok,Mk,Nk,du,On=l(()=>{"use strict";Ok="materialization.json",Mk="backups",Nk=".gitignore",du=e=>`harness-set:${e.trim()}`});var jk,Dk,uu,zk=l(()=>{"use strict";jk=m(require("node:crypto")),Dk=m(require("node:fs")),uu=e=>{try{let t=Dk.default.readFileSync(e);return jk.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Er,Ao,lV,$k,Ey,Hk=l(()=>{"use strict";Er=m(require("node:fs")),Ao=m(require("node:path"));zk();lV=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=Ao.default.join(t,n,o);return Er.default.mkdirSync(Ao.default.dirname(s),{recursive:!0}),Er.default.copyFileSync(r,s),Ao.default.relative(e,s).replaceAll("\\","/")},$k=e=>{let t=Ao.default.join(e.repoRoot,e.repoRelativeDestination),r=uu(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(Er.default.existsSync(t)){let n=uu(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=lV(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Er.default.mkdirSync(Ao.default.dirname(t),{recursive:!0}),Er.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Er.default.mkdirSync(Ao.default.dirname(t),{recursive:!0}),Er.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},Ey=e=>{let t=uu(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var ky,Fk,pu,Cy=l(()=>{"use strict";ky=m(require("node:fs"));On();Fk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pu=e=>{if(!ky.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(ky.default.readFileSync(e,"utf8"));if(Fk(t)&&t.version===1&&Fk(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var kr,mu,Uk,Bk=l(()=>{"use strict";kr=m(require("node:fs")),mu=m(require("node:path"));On();Uk=e=>{let t=new Set(e.setSlugs.map(s=>du(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=mu.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=mu.default.join(e.repoRoot,i.backupPath);kr.default.existsSync(c)?(kr.default.mkdirSync(mu.default.dirname(a),{recursive:!0}),kr.default.copyFileSync(c,a),o.push(s)):kr.default.existsSync(a)&&kr.default.rmSync(a,{force:!0})}else kr.default.existsSync(a)&&kr.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var Ry,gu,xy=l(()=>{"use strict";Ry=m(require("node:path"));On();gu=e=>({ledgerFilePath:Ry.default.join(e.metaDirPath,Ok),backupsDirPath:Ry.default.join(e.metaDirPath,Mk)})});var Ty,Gk,Vk=l(()=>{"use strict";Ty=m(require("node:path")),Gk=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return Ty.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return Ty.default.posix.join(s,e,n)}});var Iy,qk,Oy,Kk=l(()=>{"use strict";Iy=m(require("node:fs")),qk=m(require("node:path")),Oy=(e,t)=>{Iy.default.mkdirSync(qk.default.dirname(e),{recursive:!0}),Iy.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var My,cV,et,Gi=l(()=>{"use strict";My=m(require("node:os")),cV=e=>{let t=e.trim();return t.startsWith("~/")?`${My.default.homedir()}${t.slice(1)}`:t==="~"?My.default.homedir():t},et=cV});var fu,Jk,dV,Yk,Xk=l(()=>{"use strict";fu=m(require("node:fs")),Jk=m(require("node:path"));On();io();dV=`*
!${Od}
`,Yk=e=>{let t=Jk.default.join(e,Nk);fu.default.existsSync(t)||(fu.default.mkdirSync(e,{recursive:!0}),fu.default.writeFileSync(t,dV))}});var bo,tt,Po=l(()=>{"use strict";bo=m(require("node:path"));io();Gi();tt=e=>{let t=et(e),r=bo.default.join(t,iE);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:bo.default.join(r,"rag"),memoryDirPath:bo.default.join(r,aE),reportsDirPath:bo.default.join(r,cE),metaFilePath:bo.default.join(r,Od),ragChunksFilePath:bo.default.join(r,"rag",lE)}}});var Et,Qk,uV,pV,qe,Ny=l(()=>{"use strict";Et=m(require("node:fs")),Qk=m(require("node:path"));io();Xk();Po();uV=(e,t)=>{if(Et.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Et.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},pV=e=>{Et.default.existsSync(e.ragChunksFilePath)||Et.default.writeFileSync(e.ragChunksFilePath,"");let t=Qk.default.join(e.memoryDirPath,hn);Et.default.existsSync(t)||Et.default.writeFileSync(t,"")},qe=e=>{let t=tt(e.projectFolderPath);return Et.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Et.default.mkdirSync(t.ragDirPath,{recursive:!0}),Et.default.mkdirSync(t.memoryDirPath,{recursive:!0}),Yk(t.metaDirPath),uV(t,e),pV(t),{ok:!0,layout:t}}});var eC,tC,rC,oC,hu,yu=l(()=>{"use strict";eC="components",tC="store",rC="versions",oC="installed.json",hu=e=>`harness-set:${e.trim()}`});var jy,nC,Su,Dy=l(()=>{"use strict";jy=m(require("node:fs")),nC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Su=e=>{if(!jy.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(jy.default.readFileSync(e,"utf8"));if(nC(t)&&t.version===1&&nC(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var Vi,Mn,Au=l(()=>{"use strict";Vi=m(require("node:path"));yu();Mn=e=>{let t=Vi.default.join(e,eC);return{componentsRootDir:t,storeDir:Vi.default.join(t,tC),versionsDir:Vi.default.join(t,rC),installedFilePath:Vi.default.join(t,oC)}}});var zy,sC,bu,Pu,wu=l(()=>{"use strict";zy=m(require("node:crypto")),sC=m(require("node:fs")),bu=e=>zy.default.createHash("sha256").update(e,"utf8").digest("hex"),Pu=e=>{try{let t=sC.default.readFileSync(e);return zy.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var $y,iC,aC,lC=l(()=>{"use strict";$y=m(require("node:fs")),iC=m(require("node:path")),aC=(e,t)=>{$y.default.mkdirSync(iC.default.dirname(e),{recursive:!0}),$y.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var Hy,Fy,cC,dC=l(()=>{"use strict";Hy=m(require("node:fs")),Fy=m(require("node:path")),cC=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=Fy.default.join(e,r),n=Fy.default.join(o,`${t.versionId}.json`);Hy.default.mkdirSync(o,{recursive:!0}),Hy.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var vu,uC,pC,mC=l(()=>{"use strict";vu=m(require("node:fs")),uC=m(require("node:path"));wu();pC=e=>{let t=bu(e.content),r=uC.default.join(e.storeDir,t);return vu.default.existsSync(r)||(vu.default.mkdirSync(e.storeDir,{recursive:!0}),vu.default.writeFileSync(r,e.content)),t}});var Uy,gC,mV,_u,By=l(()=>{"use strict";Uy=m(require("node:fs")),gC=m(require("node:path"));yu();Dy();Au();wu();lC();dC();mC();mV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_u=e=>{let t=Mn(e.installDir),r=hu(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!mV(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=gC.default.join(e.harnessRootDir,a);if(!Uy.default.existsSync(c))continue;let d=Uy.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Pu(c);if(p!==null){if(bu(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);pC({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;cC(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=Su(t.installedFilePath);aC(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var Vy,Gy,fC,hC=l(()=>{"use strict";Vy=m(require("node:fs"));By();Dy();Au();Gy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fC=e=>{if(!Vy.default.existsSync(e.harnessManifestPath))return;let t=Mn(e.installDir),r=Su(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(Vy.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!Gy(o)||o.version!==1||!Gy(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!Gy(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];_u({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var qy,yC,SC,AC=l(()=>{"use strict";qy=m(require("node:fs")),yC=m(require("node:path")),SC=e=>{let t=e.componentId.replaceAll("/","_"),r=yC.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!qy.default.existsSync(r))return null;try{let o=JSON.parse(qy.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Wu,Lu,bC,PC=l(()=>{"use strict";Wu=m(require("node:fs")),Lu=m(require("node:path"));yu();hC();AC();Au();wu();bC=e=>{fC({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Mn(e.layout.installDir),r=hu(e.setSlug),o=SC({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Lu.default.join(t.storeDir,i.contentSha256);if(Wu.default.existsSync(a)&&Pu(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Lu.default.join(e.layout.harnessRootDir,n):Lu.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Wu.default.existsSync(s))return null;try{if(!Wu.default.statSync(s).isFile())return null}catch{return null}return s}});var wC,gV,fV,Cr,Eu=l(()=>{"use strict";Cy();xy();Po();wC="harness-set:",gV=e=>{let t=e.trim();if(!t.startsWith(wC))return null;let r=t.slice(wC.length).trim();return r.length>0?r:null},fV=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=gV(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Cr=e=>{let t=tt(e),{ledgerFilePath:r}=gu(t),o=pu(r);return fV(o)}});var ku,Ky,qi,hV,Jt,Ki,Nn=l(()=>{"use strict";ku=m(require("node:fs")),Ky=m(require("node:os")),qi=m(require("node:path")),hV=()=>ku.default.realpathSync(qi.default.resolve(Ky.default.homedir())),Jt=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?qi.default.join(Ky.default.homedir(),t.slice(1)):t,o;try{o=ku.default.realpathSync(qi.default.resolve(r))}catch{return null}let n=hV();return o===n||o.startsWith(`${n}${qi.default.sep}`)?o:null},Ki=e=>{let t=Jt(e);if(t===null)return null;try{if(!ku.default.statSync(t).isFile())return null}catch{return null}return t}});var Jy,Yy=l(()=>{"use strict";Jy=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Ru,vC,Cu,yV,Ji,Xy=l(()=>{"use strict";Ru=m(require("node:fs")),vC=m(require("node:path"));On();Hk();Cy();Bk();xy();Vk();Kk();Gi();Ny();PC();Eu();Nn();Yy();Cu=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yV=e=>{if(!Ru.default.existsSync(e))return null;try{let t=JSON.parse(Ru.default.readFileSync(e,"utf8"));if(Cu(t)&&t.version===1)return t}catch{return null}return null},Ji=e=>{let t=[...new Set(e.setSlugs.map(b=>b.trim()).filter(b=>b.length>0))],r=et(e.projectFolderPath),o=Jt(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Ru.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=qe({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=gu(s.layout),d=Cr(o).filter(b=>!t.includes(b)),p=pu(i),g=0;if(d.length>0){let b=Uk({repoRoot:o,setSlugs:d,ledger:p});p=b.ledger,g=b.summary.removedPaths.length}if(t.length===0)return Oy(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:[]};let A=yV(e.layout.harnessManifestPath);if(A===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=Cu(A.sets)?A.sets:{},y=0,u=0,S=0;for(let b of t){let f=h[b];if(!Cu(f))return{ok:!1,errorMessage:`Harness set "${b}" is not installed locally.`};let w=typeof f.version=="number"?String(f.version):"1",v=du(b),_=Array.isArray(f.items)?f.items:[];for(let L of _){if(!Cu(L))continue;let k=typeof L.path=="string"?L.path.trim():"";if(k.length===0)continue;let x=Jy(k);if(x===null)continue;let I=Gk(b,x),j=vC.default.posix.join(".cursor",I).replaceAll("\\","/"),oe=typeof L.id=="string"?L.id.trim():"",G=bC({layout:e.layout,setSlug:b,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:k,manifestItemId:oe});if(G===null)continue;let F=$k({repoRoot:o,backupsDir:a,repoRelativeDestination:j,sourceAbsolutePath:G,componentId:v,versionId:w,ledger:p});if(F.kind==="skipped_unchanged"){u+=1;continue}if(F.kind==="backed_up_user_file"){S+=1,y+=1,p={version:1,entries:{...p.entries,[j]:Ey({componentId:v,versionId:w,sourceAbsolutePath:G,backupPath:F.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[j]:Ey({componentId:v,versionId:w,sourceAbsolutePath:G})}}}}return y===0&&u===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(Oy(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:S,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:t})}});var _C,xu,SV,AV,bV,PV,wV,vV,_V,WV,LV,Yi,Tu=l(()=>{"use strict";_C=m(require("node:crypto")),xu=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},SV=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},AV=(e,t)=>{let r=SV(t),o=xu(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},bV=(e,t,r)=>{let o=AV(t,r);return`shared/items/${e}/${o}`},PV=["rules","skills","commands","instructions","agents"],wV=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),vV=(e,t)=>[...e.filter(o=>o.id!==t.id),t],_V=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},WV=e=>_C.default.createHash("sha256").update(e,"utf8").digest("hex"),LV=e=>({id:e.id,kind:e.kind,title:e.title,path:bV(e.id,e.kind,e.title),contentSha256:WV(e.content)}),Yi=e=>{let t=new Date().toISOString(),r=e.existingManifest??wV(e.hostname,t),o=xu(e.bundle.slug),n=_V(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...PV.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let g=LV(p);return{files:[...d.files,{relativePath:g.path,content:p.content}],nextItems:vV(d.nextItems,g)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var Rr,WC,Iu,EV,wo,Zy=l(()=>{"use strict";Rr=m(require("node:fs")),WC=m(require("node:os")),Iu=m(require("node:path"));Tu();EV=e=>{if(!Rr.default.existsSync(e))return null;try{let t=JSON.parse(Rr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},wo=e=>{try{let t=EV(e.layout.harnessManifestPath),r=Yi({bundle:e.bundle,hostname:WC.default.hostname(),existingManifest:t});Rr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)Rr.default.mkdirSync(Iu.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Iu.default.join(e.layout.harnessRootDir,o.relativePath);Rr.default.mkdirSync(Iu.default.dirname(n),{recursive:!0}),Rr.default.writeFileSync(n,o.content)}return Rr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var Qy,LC=l(()=>{"use strict";Zy();Xy();Qy=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=wo({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Ji({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var EC,kC=l(()=>{"use strict";EC=["rule","skill","command","instruction","agent"]});var CC,kV,CV,kt,eS=l(()=>{"use strict";kC();CC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kV=e=>typeof e=="string"&&EC.includes(e),CV=e=>{if(!CC(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!kV(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},kt=e=>{if(!CC(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=CV(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var RC,RV,tS,xC=l(()=>{"use strict";RC=require("node:zlib");eS();RV="x-agent-witch-token",tS=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[RV]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,RC.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=kt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var oS,rS,xr,TC=l(()=>{"use strict";oS=m(require("node:fs")),rS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xr=e=>{if(!oS.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(oS.default.readFileSync(e.harnessManifestPath,"utf8"));if(!rS(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=rS(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!rS(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Ou,IC=l(()=>{"use strict";Ou=()=>"~"});var OC,MC,NC=l(()=>{"use strict";OC=require("node:crypto"),MC=e=>`local-${(0,OC.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var nS,jC=l(()=>{"use strict";nS=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Xi,Mu,sS=l(()=>{"use strict";Xi=m(require("node:path")),Mu=e=>{let t=Xi.default.dirname(e),r=Xi.default.basename(t);return r==="agents"?Xi.default.basename(Xi.default.dirname(t)):r}});var Zi,Yt,DC,xV,TV,IV,Nu,zC,iS=l(()=>{"use strict";Zi=m(require("node:fs")),Yt=m(require("node:path"));NC();jC();sS();DC=new Set(["node_modules",".git","dist","build",".next","coverage"]),xV=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},TV=(e,t)=>{let r=Yt.default.basename(t);if(e==="skill"){let o=t.split(Yt.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},IV=e=>{let t=[],r=(n,s)=>{let i;try{i=Zi.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&DC.has(a.name))continue;let c=Yt.default.join(n,a.name),d=s?Yt.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;nS(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=Yt.default.join(e,n);Zi.default.existsSync(s)&&r(s,n)}let o=Yt.default.join(e,"skills");return Zi.default.existsSync(o)&&r(o,"skills"),t},Nu=e=>{let t=IV(e);if(t.length===0)return null;let r=Yt.default.dirname(e),o=Mu(e),n=xV(o),s=t.map(i=>{let a=nS(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:MC(i.absolutePath),kind:a,title:TV(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},zC=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Zi.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||DC.has(a.name))continue;let c=Yt.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var $C,aS,OV,lS,HC=l(()=>{"use strict";$C=m(require("node:fs")),aS=m(require("node:path"));iS();Nn();OV=e=>{let t=Jt(e.trim());if(t===null)return null;if(aS.default.basename(t)===".cursor")return t;let r=aS.default.join(t,".cursor");try{if($C.default.statSync(r).isDirectory())return Jt(r)}catch{return null}return null},lS=e=>{let t=OV(e.projectPath);if(t===null)return null;let r=Nu(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var FC,MV,ju,cS,UC=l(()=>{"use strict";FC=m(require("node:path"));iS();Nn();sS();MV=5,ju=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},cS=e=>{let t=Jt(e.scanRoot.trim());if(t===null)return ju(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of zC(t,MV,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=Jt(s);if(i===null)continue;let a=Mu(i);ju(e.response,"folder",{cursorDir:i,groupName:a,repoPath:FC.default.dirname(i)});let c=Nu(i);c!==null&&(r.push(c),ju(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return ju(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var BC,GC,VC=l(()=>{"use strict";BC=m(require("node:path")),GC=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:BC.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Me,qC,dS,NV,uS,pS,Du,mS,Qi,KC=l(()=>{"use strict";Me=m(require("node:fs")),qC=m(require("node:os")),dS=m(require("node:path"));Tu();By();Nn();VC();NV=e=>{if(!Me.default.existsSync(e))return null;try{let t=JSON.parse(Me.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},uS=e=>{let t=e.hostname??qC.default.hostname(),r=NV(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let g=Ki(p.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let A=Me.default.readFileSync(g,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:A,setSlugs:[i.slug]})}let d=Yi({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Me.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Me.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=dS.default.join(e.layout.harnessRootDir,i.relativePath);Me.default.mkdirSync(dS.default.dirname(a),{recursive:!0}),Me.default.writeFileSync(a,i.content)}Me.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=xu(i.slug),d=r.sets[c];d!==void 0&&_u({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},pS="reveal-cache.json",Du=(e,t)=>{Me.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Me.default.writeFileSync(`${e.harnessRootDir}/${pS}`,`${JSON.stringify(t,null,2)}
`)},mS=e=>{let t=`${e.harnessRootDir}/${pS}`;Me.default.existsSync(t)&&Me.default.unlinkSync(t)},Qi=e=>{let t=`${e.harnessRootDir}/${pS}`;if(!Me.default.existsSync(t))return null;try{let r=JSON.parse(Me.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return GC(r)}catch{return null}return null}});var vo=l(()=>{"use strict";Xy();LC();Yy();Zy();xC();eS();Tu();TC();IC();HC();Nn();UC();KC()});var gS,JC=l(()=>{"use strict";vo();Ee();gS=e=>{let t=M(e.profileEmail);return wo({bundle:e.bundle,layout:t})}});var YC=l(()=>{"use strict";JC();vo()});var jV,XC,DV,ZC,_o,zu,QC=l(()=>{"use strict";jV=["agentwitch.com","www.agentwitch.com"],XC=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,DV=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},ZC=e=>{let t=DV(e);return!!(jV.includes(t)||XC.test(e.trim().toLowerCase()))},_o=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return ZC(r)?XC.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},zu=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:_o(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var ea=l(()=>{"use strict";QC()});var Xt,ta=l(()=>{"use strict";Xt=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var ra,eR=l(()=>{"use strict";YC();ea();ta();ra=e=>{if(!Xt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=kt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!_o(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=gS({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var fS=l(()=>{"use strict";eR()});var zV,jn,hS=l(()=>{"use strict";zV=e=>e==="hourly"||e==="daily"||e==="weekdays",jn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!zV(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var oa,$u,tR,rR,yS,ft,Hu,Fu,Uu,Bu,Gu=l(()=>{"use strict";oa=m(require("node:fs")),$u=m(require("node:path"));hS();tR="automations.json",rR=e=>e.profileEmail!==null?$u.default.join(e.installDir,"profiles",e.profileEmail,tR):$u.default.join(e.installDir,tR),yS=()=>({version:1,automations:[]}),ft=e=>{let t=rR(e);if(!oa.default.existsSync(t))return yS();try{let r=JSON.parse(oa.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?yS():{version:1,automations:r.automations.flatMap(n=>{let s=jn(n);return s!==null?[s]:[]})}}catch{return yS()}},Hu=(e,t)=>{let r=rR(e);oa.default.mkdirSync($u.default.dirname(r),{recursive:!0}),oa.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Fu=(e,t)=>{Hu(e,{version:1,automations:t})},Uu=(e,t)=>{let o=ft(e).automations.filter(n=>n.id!==t.id);Hu(e,{version:1,automations:[...o,t]})},Bu=(e,t)=>ft(e).automations.find(r=>r.id===t)??null});var $e,Tr=l(()=>{"use strict";$e="x-agent-witch-token"});var X,Wo,SS,na,AS,$V,bS,sa,ia,PS,aa=l(()=>{"use strict";Tr();Qe();X=e=>{let t=Ce(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Wo=e=>({[$e]:e,"Content-Type":"application/json"}),SS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Wo(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},na=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Wo(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},AS=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Wo(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},$V=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},bS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:Wo(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},sa=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:Wo(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return $V(r)}catch{return null}},ia=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:Wo(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},PS=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Wo(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var Lo,oR,nR,HV,wS,sR,vS=l(()=>{"use strict";Lo=m(require("node:fs")),oR=m(require("node:path")),nR=e=>oR.default.join(e.harnessRootDir,"projects-registry.json"),HV=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),wS=e=>{let t=nR(e);if(!Lo.default.existsSync(t))return[];try{let r=JSON.parse(Lo.default.readFileSync(t,"utf8"));return HV(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},sR=e=>{let t=nR(e);if(!Lo.default.existsSync(t))return;let r=`${t}.migrated`;if(Lo.default.existsSync(r)){Lo.default.unlinkSync(t);return}Lo.default.renameSync(t,r)}});var iR,FV,UV,aR,lR=l(()=>{"use strict";Gi();iR=e=>et(e),FV=e=>new Set(e.map(t=>iR(t.folderPath))),UV=e=>new Set(e.map(t=>t.id)),aR=(e,t)=>{let r=FV(t),o=UV(t),n=[],s=new Set;for(let i of e){let a=iR(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var _S,WS=l(()=>{"use strict";aa();vS();lR();_S=async(e,t)=>{let r=wS(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=X({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await sa(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=aR(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await bS(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&sR(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var LS,Eo,Vu=l(()=>{"use strict";LS=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),Eo=(e,t)=>e.find(r=>r.id===t)??null});var Dn,qu=l(()=>{"use strict";aa();WS();Vu();Dn=async(e,t)=>{t!==void 0&&await _S(t,e);let r=X({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await sa(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Console. Check the Mac connection and try again."};let n=LS(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Console, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Console.`}}});var cR=l(()=>{"use strict"});var Ne,dR,BV,GV,VV,qV,zn,ES=l(()=>{"use strict";Ne=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dR=(e,t)=>e.length===0?`<p class="empty">${Ne(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Ne(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Ne(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Console \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,BV=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,GV=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ne(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Console. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,VV=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?GV(e.project):BV();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
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
      </form>`},qV=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Ne(t)} from recent runs. Review in Agent Witch Console or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Ne(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},zn=e=>{let t=e.flashError?`<div class="alert-error">${Ne(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ne(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(a,c)=>`<a class="project-tab${e.activeTab===a?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${a}">${Ne(c)}</a>`,n=e.composition?.items.filter(a=>a.kind==="workflow")??[],s=e.composition?.items.filter(a=>a.kind==="agent")??[],i="";return e.activeTab==="harness"?i=VV({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=dR(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=dR(s,"No agents installed for this project yet."):i=qV({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount}),`${t}<section class="card">
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
    </section>`}});var KV,JV,uR,pR=l(()=>{"use strict";vo();Tr();KV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),JV=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!KV(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=kt(n);return s===null?[]:[s]})}catch{return null}},uR=JV});var mR,kS,gR=l(()=>{"use strict";de();vo();ES();qu();pR();Vu();Eu();aa();mR=e=>({kind:"page",title:e.project.name,body:zn({project:e.project,installed:xr(e.layout),linkedSetSlugs:Cr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),kS=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let o=await Dn(r,e.layout),n=Eo(o.projects,t);if(n===null)return{kind:"not_found"};let s=X({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s===null?null:await uR(s,n.id);if(i===null)return mR({layout:e.layout,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Console."});let a=Qy({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:i});if(!a.ok)return mR({layout:e.layout,project:n,errorMessage:a.errorMessage});let c=s===null?!1:await ia(s,n.id,a.appliedSetSlugs),d=new URLSearchParams({linked:"1",files:String(a.writtenFileCount),bindingsSynced:c?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${d.toString()}`}}});var YV,CS,fR=l(()=>{"use strict";YV=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,CS=YV});var hR,yR,XV,ZV,Ku,Ju,SR=l(()=>{"use strict";hR=require("node:child_process"),yR=require("node:util"),XV=(0,yR.promisify)(hR.execFile),ZV=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},Ku=async(e,t)=>{try{let{stdout:r}=await XV("git",t,{cwd:e,env:ZV(),maxBuffer:1048576});return r.trim()}catch{return null}},Ju=async e=>{let t=await Ku(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await Ku(e,["rev-parse","--abbrev-ref","HEAD"]),o=await Ku(e,["status","--porcelain"]),n=await Ku(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var RS,AR=l(()=>{"use strict";RS=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var QV,xS,bR=l(()=>{"use strict";QV=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},xS=QV});var eq,TS,PR=l(()=>{"use strict";Tr();eq=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[$e]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},TS=eq});var wR,Ir,vR=l(()=>{"use strict";wR=require("node:child_process"),Ir=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,wR.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var _R=l(()=>{"use strict";qu()});var la,WR=l(()=>{"use strict";Tr();la=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[$e]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var ht=l(()=>{"use strict";qu();Vu();cR();Gi();Ny();gR();Eu();fR();SR();AR();bR();PR();vR();_R();WR();WS();vS();aa()});var Yu,ca,LR,IS,ko,OS=l(()=>{"use strict";Yu=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},ca=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Yu(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},LR=e=>e>=1&&e<=5,IS=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Yu(t,"UTC")},ko=e=>{let t=e.from??new Date,r=Yu(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return ca(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=ca(r,e.timeZone,o,0),s=Yu(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?ca(IS(r),e.timeZone,o,0):n;if(!i&&LR(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=IS(a),LR(a.weekday))return ca(a,e.timeZone,o,0);return ca(IS(r),e.timeZone,o,0)}});var ER,MS,Zt,NS=l(()=>{"use strict";ER=require("node:crypto");de();ht();OS();Gu();MS=!1,Zt=async e=>{if(MS)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=X({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=Bu(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};MS=!0;let n=(0,ER.randomUUID)();try{let s=await Tn(t,"claude-cli",o.prompt);await PS(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=ko({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return Uu(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{MS=!1}}});var Xu,kR=l(()=>{"use strict";de();NS();Gu();Xu=async()=>{let e=$();if(e===null)return;let t=ft(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await Zt(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var da=l(()=>{"use strict";Gu();kR();NS();OS()});var CR=l(()=>{"use strict";da()});var RR=l(()=>{"use strict";hS()});var xR=l(()=>{"use strict";RR()});var jS=l(()=>{"use strict";da()});var tq,rq,ua,DS=l(()=>{"use strict";CR();xR();jS();Ee();tq=e=>e!==void 0&&e.trim().length>0?M(e.trim()):M(),rq=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??ko({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??ko({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},ua=e=>{let t=tq(e.profileEmail),r=ft(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=jn(s);return i!==null?[rq(i,o.get(i.id))]:[]});return Fu(t,n),{ok:!0,writtenCount:n.length}}});var zS=l(()=>{"use strict";da()});var TR=l(()=>{"use strict";de()});var IR=l(()=>{"use strict";DS();zS();jS();TR()});var OR,pa,ma,ga,MR=l(()=>{"use strict";OR=m(require("node:os"));IR();ea();ta();pa=e=>{if(!Xt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!_o(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=ua({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},ma=async e=>{if(!Xt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:_o(t)?Zt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},ga=()=>{let e=$(),t=e!==null?ft(e.layout):{version:1,automations:[]};return{ok:!0,hostname:OR.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var $S=l(()=>{"use strict";MR()});var Zu=l(()=>{"use strict";te()});var Qu=l(()=>{"use strict";te()});var ep,jR,DR,NR,oq,nq,$n,HS=l(()=>{"use strict";ep=m(require("node:fs")),jR=m(require("node:os")),DR=m(require("node:path"));Zu();Qu();$i();Ee();NR=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},oq=e=>DR.default.join(jR.default.homedir(),"Library","LaunchAgents",`${e}.plist`),nq=async e=>ep.default.existsSync(oq(e))?(await Le(e)).ok:!1,$n=async(e=E())=>{let t=ep.default.existsSync(lu(e)),r=!ep.default.existsSync(Ht(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=zi(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await NR(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${ne(e)}-wake`;await nq(i)&&s.push(i);for(let c of ee(e))(await Le(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await NR(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var zR=l(()=>{"use strict";te()});var Hn,fa=l(()=>{"use strict";Hn="connection-health.json"});var Co,tp,sq,ha,we,FS,rp,je,op=l(()=>{"use strict";Co=m(require("node:fs")),tp=m(require("node:path"));fa();sq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ha=e=>e.profileEmail===null?tp.default.join(e.installDir,Hn):tp.default.join(e.installDir,"profiles",e.profileEmail,Hn),we=e=>{let t=ha(e);if(!Co.default.existsSync(t))return null;try{let r=JSON.parse(Co.default.readFileSync(t,"utf8"));return!sq(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},FS=e=>{let t=ha(e);Co.default.existsSync(t)&&Co.default.rmSync(t,{force:!0})},rp=(e,t)=>{let r=ha(e),o=we(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Co.default.mkdirSync(tp.default.dirname(r),{recursive:!0}),Co.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},je=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var ya,$R=l(()=>{"use strict";fa();op();ya=(e,t)=>{if(!t.socketOpen)return!1;let r=we(e);return r===null?!1:!je(r,t.staleAfterMs??12e4,t.nowMs)}});var US,HR=l(()=>{"use strict";op();US=(e,t)=>!(e!==null&&!je(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Fn=l(()=>{"use strict";op();$R();HR();fa()});var BS=l(()=>{"use strict";Fn();te()});var GS=l(()=>{"use strict";Fn()});var VS=l(()=>{"use strict";te()});var UR,FR,Sa,qS=l(()=>{"use strict";UR=m(require("node:fs"));qt();Zu();Qu();Ee();FR=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},Sa=async(e=E())=>{if(!UR.default.existsSync(Ht(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await FR())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of ee(e))(await Le(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await FR();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var BR=l(()=>{"use strict";te()});var GR,Ro,KS,iq,aq,lq,VR,cq,qR,Un,np=l(()=>{"use strict";GR=require("node:crypto"),Ro=m(require("node:fs")),KS=m(require("node:path"));Ee();iq="watchdog-log.ndjson",aq=200,lq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),VR=(e=E())=>{let t=M(),r=t.installDir===e?t.logsDir:fn({installDir:e,profileEmail:t.profileEmail});return KS.default.join(r,iq)},cq=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!lq(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},qR=(e,t=E())=>{let r={id:(0,GR.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=VR(t);Ro.default.mkdirSync(KS.default.dirname(o),{recursive:!0});let n=Ro.default.existsSync(o)?Ro.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-aq+1)),JSON.stringify(r)];return Ro.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Un=(e=20,t=E())=>{let r=VR(t);if(!Ro.default.existsSync(r))return[];let o=Ro.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=cq(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var JS,YS,XS,ZS=l(()=>{"use strict";vt();JS=Qr.watchdogReinstallState,YS=900*1e3,XS=3e3});var KR=l(()=>{"use strict";ZS()});var JR={};Pt(JR,{verifyAgentWitchReviveAfterKickstart:()=>uq});var dq,uq,YR=l(()=>{"use strict";KR();GS();VS();Ee();dq=e=>new Promise(t=>{setTimeout(t,e)}),uq=async e=>{if(await dq(e.verifyDelayMs??XS),!await ro(e.launchAgentLabel))return!1;let r=e.profileEmail===null?M():M(e.profileEmail),o=we(r);return!je(o,e.staleAfterMs)}});var Aa,QS,pq,XR,ZR,eA,tA,rA=l(()=>{"use strict";Aa=m(require("node:fs")),QS=m(require("node:path"));V();ZS();pq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),XR=e=>QS.default.join(e,JS),ZR=(e=E())=>{let t=XR(e);if(!Aa.default.existsSync(t))return null;try{let r=JSON.parse(Aa.default.readFileSync(t,"utf8"));return!pq(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},eA=(e=E(),t=Date.now())=>{let r=ZR(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=YS:!0},tA=(e=E(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=XR(e);return Aa.default.mkdirSync(QS.default.dirname(o),{recursive:!0}),Aa.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var oA,QR=l(()=>{"use strict";te();rA();oA=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!eA())return{attempted:!1,ok:!1,targets:e};tA();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Le(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var ex=l(()=>{"use strict";rA();QR()});var nA=l(()=>{"use strict";Qe()});var tx=l(()=>{"use strict";Qe()});var rx,Bn,ox,nx,sx,mq,gq,ix,fq,hq,ax,lx=l(()=>{"use strict";rx=require("node:child_process"),Bn=m(require("node:fs")),ox=m(require("node:os")),nx=m(require("node:path")),sx=require("node:util");nA();tx();Ee();mq=(0,sx.promisify)(rx.execFile),gq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ix=e=>{let t=dt(e),r=t===null?M():M(t);if(!Bn.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Bn.default.readFileSync(r.configPath,"utf8"));return!gq(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},fq=e=>ix(e)?.wsUrl??null,hq=e=>{let t=fq(e);return t!==null?Ce(t):ke(e)?.appOrigin??null},ax=async e=>{let t=e?.installDir??E(),r=ix(t),o=r!==null?Ce(r.wsUrl):hq(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=nx.default.join(ox.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Bn.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??dt(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await mq("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Bn.default.existsSync(i)&&Bn.default.unlinkSync(i)}}});var cx={};Pt(cx,{attemptAgentWitchWatchdogReinstall:()=>yq});var yq,dx=l(()=>{"use strict";ex();lx();yq=async e=>oA(e,()=>ax())});var ux,px,mx,Sq,Aq,bq,ba,sA=l(()=>{"use strict";zR();BS();GS();VS();qS();HS();Zu();Qu();Ee();wn();BR();np();ux=e=>e===null?M():M(e),px=async(e,t,r)=>{if(!await ro(e))return"not_running";let n=ux(t);if(pt(n))return"healthy";let s=we(n);return je(s,r)?"stale_connection":"healthy"},mx=async e=>{let t=e?.staleAfterMs??12e4,r=E(),o=ee(r);return Promise.all(o.map(async n=>{let s=await px(n.launchAgentLabel,n.profileEmail,t),i=ux(n.profileEmail),a=we(i),c=await ro(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:je(a,t),needsRevive:s!=="healthy",reason:s}}))},Sq=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},Aq=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",bq=async e=>{let t=await Le(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(YR(),JR)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},ba=async e=>{if(!ut())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=E();await $n(r),await Sa(r);let o=ee(r),n=[];for(let p of o){let g=await px(p.launchAgentLabel,p.profileEmail,t);if(g==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:g});continue}n.push(await bq({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:g,staleAfterMs:t}))}if(n.length===0){let p=to();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(dx(),cx)),g=await p(n);s=g.attempted,i=g.ok,a=g.errorMessage,c=[...g.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&qR({event:Aq(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:Sq(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var gx,sp,fx=l(()=>{"use strict";gx=m(require("node:os"));BS();np();sA();sp=async()=>{let e=await mx(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:gx.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Un(1)[0]??null}}});var iA=l(()=>{"use strict";HS();sA();fx();np()});var Pa,wa,va,hx=l(()=>{"use strict";te();iA();Pa=async()=>{await $n();let e=ee(),t=[];for(let r of e){let o=await Le(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=to();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},wa=ba,va=ba});var aA=l(()=>{"use strict";hx()});var ap,ip,yx,lA,Sx,Pq,wq,vq,_q,Wq,lp,Ax=l(()=>{"use strict";ap=require("node:child_process"),ip=m(require("node:fs")),yx=m(require("node:os")),lA=m(require("node:path")),Sx=require("node:util");te();V();Pq=(0,Sx.promisify)(ap.execFile),wq=()=>lA.default.join(yx.default.homedir(),"Library","LaunchAgents"),vq=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await Pq("launchctl",["bootout",r]).catch(()=>{})},_q=e=>{let t=lA.default.join(wq(),`${e}.plist`);ip.default.existsSync(t)&&ip.default.unlinkSync(t)},Wq=e=>{(0,ap.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},lp=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=E();if(!ip.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Ft(e);for(let r of t)await vq(r),_q(r);return Wq(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var bx,cp,Px,Gn,wx,Lq,Eq,kq,cA,Cq,dA,vx=l(()=>{"use strict";bx=require("node:child_process"),cp=m(require("node:fs")),Px=m(require("node:os")),Gn=m(require("node:path")),wx=require("node:util");te();Lq=(0,wx.promisify)(bx.execFile),Eq=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],kq=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],cA=e=>{cp.default.existsSync(e)&&cp.default.rmSync(e,{force:!0})},Cq=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await Lq("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},dA=async e=>{let r=(e.listLaunchAgentLabels??Ft)(e.layout.installDir),o=e.launchAgentsDir??Gn.default.join(Px.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??Cq;for(let i of r)await n(i),cA(Gn.default.join(o,`${i}.plist`));let s=Gn.default.dirname(e.layout.configPath);for(let i of Eq)cA(Gn.default.join(s,i));for(let i of kq)cA(Gn.default.join(e.layout.installDir,i));return cp.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var uA,_x=l(()=>{"use strict";uA={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var pA,Wx=l(()=>{"use strict";pA="unknown_identity"});var mA=l(()=>{"use strict";_x();Wx()});var Rq,gA,Lx=l(()=>{"use strict";mA();Rq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gA=e=>e.type!=="system.error"||!Rq(e.payload)?!1:e.payload.errorCode===pA});var fA=l(()=>{"use strict";Ax();vx();Lx()});var dp=l(()=>{"use strict";te();Qe();fA();iA()});var Vn,up,pp=l(()=>{"use strict";dp();Vn=(e=20)=>Un(e),up=sp});var mp,qn,gp,fp=l(()=>{"use strict";dp();mp=ho,qn=(e=20)=>mo(e),gp=e=>fo(e)});var hp,hA=l(()=>{"use strict";dp();hp=()=>lp()});var Ex=l(()=>{"use strict";Ly();fS();$S();aA();pp();fp();hA()});var kx={};Pt(kx,{buildAgentWitchAutomationStatusFromWakeServer:()=>ga,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>mp,buildAgentWitchWakeHealthResponse:()=>Fi,buildAgentWitchWakeIdentityResponse:()=>Ui,buildAgentWitchWatchdogStatus:()=>up,installHarnessFromWakeServer:()=>ra,readAgentWitchSelfUpdateLogEntries:()=>qn,readAgentWitchWatchdogLogEntries:()=>Vn,restartAgentWitchFromWakeServer:()=>va,reviveAgentWitchWebSocketFromWakeServer:()=>wa,runAgentWitchSelfUpdateFromWakeServer:()=>gp,runAgentWitchUninstallLocalFromWakeServer:()=>hp,runAutomationFromWakeServer:()=>ma,syncAutomationsFromWakeServer:()=>pa,wakeAgentWitchLaunchAgents:()=>Pa});var Cx=l(()=>{"use strict";Ex()});var Rx,xx,yA,SA,Tx=l(()=>{"use strict";Rx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),xx=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?Rx(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?Rx(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},yA=e=>{let t=e.watchdogLogs.map(xx).join(""),r=e.updateLogs.map(xx).join("");return`<!doctype html>
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
</html>`},SA=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var Ix,Ox,Mx=l(()=>{"use strict";Ix=m(require("node:net")),Ox=()=>new Promise((e,t)=>{let r=Ix.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var Nx,xq,AA,jx=l(()=>{"use strict";Nx=m(require("node:net"));Mx();Hi();$i();Ee();xq=e=>new Promise(t=>{let r=Nx.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),AA=async()=>{let e=E(),t=gt();if(await xq(t))return xk(t),t;let r=await Ox();return cu(e,r),r}});var Tq,bA,Dx=l(()=>{"use strict";Tq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bA=e=>({force:Tq(e)&&e.force===!0})});var _a=l(()=>{"use strict";ea();Tx();jx();Dx();ih();zd();lo()});var PA,D,wA,vA,Wa,zx=l(()=>{"use strict";PA=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},D=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},wA=e=>{e.writeHead(403),e.end()},vA=e=>e.url?.split("?")[0]??"/",Wa=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var yt=l(()=>{"use strict";zx()});var Iq,$x,Hx=l(()=>{"use strict";$S();yt();Iq=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return D(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},$x=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return D(e.response,200,ga(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await Iq(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=pa(t);return D(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await ma(t);return D(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var Oq,Ux,Fx,Bx,_A,Gx,WA=l(()=>{"use strict";Oq=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],Ux=e=>/embed|minilm|^bge-/i.test(e),Fx=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),Bx=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),_A=e=>e.filter(t=>t.trim().length>0&&!Ux(t)),Gx=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!Ux(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>Fx(s,o));if(n!==void 0)return n}for(let n of Oq){let s=r.find(i=>Fx(i,n));if(s!==void 0)return s}return r[0]??null}});var LA,Kx,Jx,yp,Yx,Vx,qx,Mq,Nq,jq,Dq,zq,$q,St,La=l(()=>{"use strict";LA=require("node:child_process"),Kx=m(require("node:fs")),Jx=m(require("node:os")),yp=m(require("node:path"));Qe();mt();WA();Yx=3e3,Vx=["claude-cli","codex","cursor","antigravity"],qx={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},Mq=(e,t)=>new Promise(r=>{let o=(0,LA.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},Yx);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),Nq=()=>{let e=Jx.default.homedir();return["ollama",yp.default.join(e,".local","bin","ollama"),yp.default.join(e,".agent-witch","ollama","ollama"),yp.default.join(e,".local-agent-witch","ollama","ollama")]},jq=e=>new Promise(t=>{let r=(0,LA.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},Yx);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(Bx(Buffer.concat(o).toString("utf8")))})}),Dq=async()=>{for(let e of Nq()){if(e!=="ollama"&&!Kx.default.existsSync(e))continue;let t=await jq(e);if(t!==null)return t}return[]},zq=e=>{let t=e.installedWriterIds.map(s=>qx[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=le(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${qx[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},$q=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:vn},St=async e=>{let t=Vx.map(i=>{let a=Jd(i,e.commands);return Mq(a.command,a.args)}),[r,...o]=await Promise.all([Dq(),...t]),n=Vx.flatMap((i,a)=>o[a]===!0?[i]:[]),s=Gx(r,$q());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:zq({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var Hq,Fq,EA,Xx=l(()=>{"use strict";Hq="http://127.0.0.1:11434",Fq=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},EA=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Hq;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?Fq(await o.json()):null}catch{return null}}});var kA=l(()=>{"use strict";mt();La();Xx();WA()});var Uq,Zx,Qx=l(()=>{"use strict";kA();Uq={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},Zx=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:Uq[t]})),ollamaModels:_A(e.ollamaModels)})});var Bq,e0,t0=l(()=>{"use strict";kA();yt();Qx();Bq=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return D(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},e0=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await St({commands:ce({})});return D(e.response,200,{ok:!0,...Zx({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await Bq(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await EA({model:r,prompt:o});return n===null?(D(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(D(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var Gq,r0,o0=l(()=>{"use strict";fS();yt();Gq=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return D(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},r0=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await Gq(e);if(t===null)return!0;let r=ra(t);return D(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var n0=l(()=>{"use strict";ht()});var CA,s0=l(()=>{"use strict";n0();ta();CA=e=>{if(!Xt(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:qe({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var i0,RA,xA=l(()=>{"use strict";de();ht();ta();i0=e=>{if(!Xt(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},RA=async e=>{let t=i0(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Ir("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=$();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=X({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(qe({projectFolderPath:r}),await la(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Console."})}});var a0=l(()=>{"use strict";s0();xA()});var l0,c0=l(()=>{"use strict";a0();xA();yt();l0=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=CA(t);return D(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await RA(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return D(e.response,o,r,e.cors.headers),!0}return!1}});var d0,u0=l(()=>{"use strict";_a();fp();pp();d0=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Vn(50),r=qn(50);return e.response.writeHead(200,SA()),e.response.end(yA({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var p0,m0=l(()=>{"use strict";Ly();yt();p0=e=>e.request.method==="GET"&&e.pathname==="/health"?(D(e.response,200,Fi(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(D(e.response,200,Ui(),e.cors.headers),!0):!1});var g0,f0=l(()=>{"use strict";hA();yt();g0=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await hp();return D(e.response,t.ok?200:503,t,e.cors.headers),!0}});var h0,y0=l(()=>{"use strict";aA();yt();h0=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await wa();return D(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await va();return D(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Pa();return D(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var S0,A0=l(()=>{"use strict";_a();fp();yt();S0=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=mp();return D(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=Wa(e.request,"/update/logs",20,200);return D(e.response,200,{ok:!0,logs:qn(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=bA(t),o=await gp({force:r});return D(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var b0,P0=l(()=>{"use strict";pp();yt();b0=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await up();return D(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=Wa(e.request,"/watchdog/logs",20,200);return D(e.response,200,{ok:!0,logs:Vn(t)},e.cors.headers),!0}return!1}});var w0,v0=l(()=>{"use strict";Hx();t0();o0();c0();u0();m0();f0();y0();A0();P0();w0=[p0,d0,b0,h0,S0,g0,r0,l0,$x,e0]});var _0,W0=l(()=>{"use strict";v0();_0=async e=>{for(let t of w0)if(await t(e))return!0;return!1}});var Vq,L0,E0=l(()=>{"use strict";ea();yt();W0();Vq=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:vA(e),readJsonBody:()=>PA(e)}),L0=async(e,t,r)=>{let o=e.headers.origin,n=zu(o);try{if(o!==void 0&&o.length>0&&!n.allowed){wA(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=Vq(e,t,r,n);if(await _0(s))return;D(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{D(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var k0,xo,Sp,Ap=l(()=>{"use strict";k0=m(require("node:http"));_a();E0();xo=async()=>{let e=await AA(),t=k0.default.createServer((r,o)=>{L0(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Sp=xo});var C0={};Pt(C0,{runAgentWitchBridgeCli:()=>qq});var qq,R0=l(()=>{"use strict";te();Ap();qq=async()=>{Be("agent-witch-bridge");let e=await xo(),t=Bt(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var x0=l(()=>{"use strict";qt()});var Kn,TA,T0=l(()=>{"use strict";Kn=(e,t,r)=>e===1?t:r,TA=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Kn(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Kn(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${Kn(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Kn(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Kn(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${Kn(p,"year","years")} ago`}});var To,IA,Kq,Jq,OA,Or,Ea,MA,I0=l(()=>{"use strict";To=m(require("node:fs")),IA=m(require("node:path")),Kq="local-ws-traffic.ndjson",Jq=500,OA=e=>IA.default.join(e.logsDir,Kq),Or=(e,t)=>{let r=OA(e);To.default.mkdirSync(IA.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});To.default.appendFileSync(r,`${o}
`,"utf8")},Ea=(e,t=Jq)=>{let r=OA(e);if(!To.default.existsSync(r))return[];let n=To.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},MA=e=>{let t=OA(e);To.default.existsSync(t)&&To.default.writeFileSync(t,"","utf8")}});var Yq,O0,M0,N0=l(()=>{"use strict";mA();Yq=new Set(Object.values(uA)),O0=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),M0=e=>{if(!O0(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!Yq.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!O0(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var j0,D0=l(()=>{"use strict";j0=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var Xq,Zq,Qq,ka,z0=l(()=>{"use strict";D0();Xq=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,Zq=e=>Xq.test(e),Qq=e=>j0(e),ka=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>ka(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&Zq(o)){r[o]=Qq(n);continue}r[o]=ka(n)}return r}});var Ct,NA,eK,tK,rK,jA,$0,H0,F0,oK,bp,Io,Pp,DA,U0=l(()=>{"use strict";Ct=m(require("node:fs")),NA=m(require("node:path"));N0();z0();eK="local-ws-trace.ndjson",tK=1e4,rK=1440*60*1e3,jA=e=>NA.default.join(e.logsDir,eK),$0=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},H0=e=>{if(!Ct.default.existsSync(e))return;let t=Ct.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-rK,n=t.filter(s=>{let i=$0(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-tK);Ct.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},F0=(e,t)=>{let r=jA(e);Ct.default.mkdirSync(NA.default.dirname(r),{recursive:!0}),Ct.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),H0(r)},oK=e=>e.parsed===null?{_empty:!0}:ka(e.parsed),bp=(e,t,r)=>{let o=M0(r);F0(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:oK(o)})},Io=(e,t)=>{F0(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:ka({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Pp=(e,t=80)=>{let r=jA(e);if(H0(r),!Ct.default.existsSync(r))return[];let o=Ct.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=$0(s);i!==null&&n.push(i)}return n.reverse()},DA=e=>{let t=jA(e);Ct.default.existsSync(t)&&Ct.default.writeFileSync(t,"","utf8")}});var Mr,B0,nK,zA,wp,G0=l(()=>{"use strict";Mr=m(require("node:fs")),B0=m(require("node:path")),nK=256e3,zA=e=>{Mr.default.mkdirSync(B0.default.dirname(e),{recursive:!0}),Mr.default.writeFileSync(e,"","utf8")},wp=(e,t=nK)=>{if(!Mr.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Mr.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=Mr.default.openSync(e,"r");try{Mr.default.readSync(a,i,0,s,n)}finally{Mr.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var Ca=l(()=>{"use strict";I0();U0();G0()});var $A,HA,V0=l(()=>{"use strict";$A=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HA=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${$A(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${$A(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${$A(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var q0=l(()=>{"use strict";V0()});var FA,UA=l(()=>{"use strict";FA=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var BA=l(()=>{"use strict";fa()});var GA,VA,K0=l(()=>{"use strict";BA();GA=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},VA=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var J0=l(()=>{"use strict";UA();K0()});var Y0,Ra,qA,xa=l(()=>{"use strict";UA();Y0=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ra=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=Y0(e),r=Y0(FA(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},qA=`(function () {
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
})();`});var Oo,sK,KA,X0=l(()=>{"use strict";Oo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sK=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},KA=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Oo(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Oo(r.direction):Oo(r.kind),i=`trace-body-${o}`,a=Oo(sK(r.body));return`<tr>
        <td title="${Oo(r.at)}">${Oo(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${Oo(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var Q0,Z0,JA,eT=l(()=>{"use strict";Q0=m(require("node:path"));V();qt();Z0=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),JA=e=>{let t=ne(e.installDir),o=`AW_HOME="$HOME/${Q0.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Live</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Console cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${Z0(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${Z0(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var tT=l(()=>{"use strict";xa();X0();eT();xa()});var iK,Qt,Ta=l(()=>{"use strict";iK=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Qt=iK});var rT,oT,nT,sT,iT,aT,lT,Jn=l(()=>{"use strict";rT="projects",oT="knowledge",nT="chunks.ndjson",sT="lessons.ndjson",iT="error-chunks.ndjson",aT="usage-stats.json",lT="knowledge-location.json"});var vp,aK,_p,YA=l(()=>{"use strict";vp=m(require("node:path"));Jn();aK=(e,t)=>{let r=t.trim(),o=vp.default.join(e.installDir,rT,r,oT);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:vp.default.join(o,nT),memoryRunsFilePath:vp.default.join(o,sT)}},_p=aK});var XA,lK,cT,dT=l(()=>{"use strict";XA=m(require("node:fs"));Jn();Po();lK=e=>{let t=tt(e.projectFolderPath),r=`${t.metaDirPath}/${lT}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};XA.default.mkdirSync(t.metaDirPath,{recursive:!0}),XA.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},cT=lK});var Yn,pT,uT,cK,mT,gT=l(()=>{"use strict";Yn=m(require("node:fs")),pT=m(require("node:path"));io();Po();YA();dT();uT=(e,t)=>{Yn.default.existsSync(e)&&(Yn.default.existsSync(t)&&Yn.default.statSync(t).size>0||(Yn.default.mkdirSync(pT.default.dirname(t),{recursive:!0}),Yn.default.copyFileSync(e,t)))},cK=e=>{let t=tt(e.projectFolderPath),r=_p(e.layout,e.projectId),o=`${t.memoryDirPath}/${hn}`;uT(t.ragChunksFilePath,r.ragChunksFilePath),uT(o,r.memoryRunsFilePath),cT({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},mT=cK});var ZA,dK,fT,hT=l(()=>{"use strict";ZA=m(require("node:fs"));Po();dK=e=>{let t=tt(e);if(!ZA.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(ZA.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},fT=dK});var yT,uK,Xn,Wp=l(()=>{"use strict";yT=m(require("node:path"));io();Po();gT();hT();YA();uK=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=fT(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){mT({layout:e.layout,projectFolderPath:t,projectId:o});let s=_p(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=tt(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:yT.default.join(n.memoryDirPath,hn),projectId:null}},Xn=uK});var Lp,mK,Ep,QA=l(()=>{"use strict";Lp=m(require("node:fs"));Jn();mK=(e,t=500)=>{if(!Lp.default.existsSync(e))return;let r=Lp.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Lp.default.writeFileSync(e,`${o.join(`
`)}
`)},Ep=mK});var kp,gK,Mo,eb=l(()=>{"use strict";kp=m(require("node:path"));Jn();Wp();gK=e=>{let t=Xn(e);if(t===null)return null;let r=kp.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:kp.default.join(r,aT),errorChunksFilePath:kp.default.join(r,iT)}},Mo=gK});var AT,Ia,bT,ST,tb,PT,yK,rb,wT,ob,nb,sb,ib=l(()=>{"use strict";AT=require("node:crypto"),Ia=m(require("node:fs")),bT=m(require("node:path"));Ta();Jn();eb();ST=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),tb=e=>{if(!Ia.default.existsSync(e))return ST();try{let t=JSON.parse(Ia.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return ST()},PT=(e,t)=>{Ia.default.mkdirSync(bT.default.dirname(e),{recursive:!0}),Ia.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},yK=e=>{let t=Qt(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,AT.createHash)("sha256").update(o).digest("hex").slice(0,16)},rb=e=>{let t=Mo(e);return t===null?null:tb(t.usageStatsFilePath)},wT=e=>{if(e.chunkIds.length===0)return;let t=Mo(e);if(t===null)return;let r=tb(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;PT(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},ob=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=Mo(e);if(r===null)return null;let o=yK(t),n=tb(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return PT(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},nb=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,sb=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var Oa,vT,SK,AK,_T,bK,ab,Ma,Zn,lb,Qn,cb,db=l(()=>{"use strict";Oa=m(require("node:fs")),vT=m(require("node:path"));Ta();Wp();QA();ib();SK="http://127.0.0.1:11434",AK="nomic-embed-text",_T=(e,t,r)=>Xn({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,bK=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},ab=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},Ma=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||SK,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||AK;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},Zn=(e,t,r)=>{let o=_T(e,t,r);if(o===null||!Oa.default.existsSync(o))return[];let n=Oa.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},lb=async e=>{let t=Qt(e.text),r=ab(t);if(r.length===0)return 0;let o=_T(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;Oa.default.mkdirSync(vT.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await Ma(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};Oa.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return Ep(o),n},Qn=async e=>{let t=await Ma(e.query);if(t===null)return[];let r=e.minScore??0,s=Zn(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:bK(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return wT({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},cb=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Na,WT,PK,wK,ub,pb,mb,LT=l(()=>{"use strict";Na=m(require("node:fs")),WT=m(require("node:path"));Ta();eb();QA();db();PK=e=>{if(!Na.default.existsSync(e))return[];let t=Na.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},wK=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},ub=async e=>{let t=Mo(e);if(t===null)return 0;let r=Qt(e.text),o=ab(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;Na.default.mkdirSync(WT.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await Ma(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};Na.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Ep(n,200),s},pb=async e=>{let t=Mo(e);if(t===null)return[];let r=await Ma(e.query);if(r===null)return[];let o=e.minScore??.3;return PK(t.errorChunksFilePath).map(s=>({chunk:s,score:wK(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},mb=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var gb=l(()=>{"use strict";db();ib();LT()});var fb,ET=l(()=>{"use strict";fb={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var kT=l(()=>{"use strict";ET()});var ye,hb,yb=l(()=>{"use strict";kT();ye=fb,hb=`
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
`.trim()});var vK,_K,Sb,CT,Ab,RT=l(()=>{"use strict";yb();xa();vK=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,_K=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],Sb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),CT=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${vK}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,Ab=e=>{let t=_K.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=Sb(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=Sb(e.installBundleVersionLabel?.trim()??"unknown"),s=CT("brand brand-in-sidebar",n),i=CT("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${Sb(e.title)} \xB7 Agent Witch Local</title>
  <style>${hb}</style>
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
  <script>${qA}</script>
</body>
</html>`}});var Cp,ja,Rp=l(()=>{"use strict";Cp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ja=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Cp(e.syncMessage)}</p>`:"",o=Cp(e.manageHref),n=Cp(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Cp(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var bb,Pb,wb,xT=l(()=>{"use strict";bb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,Pb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,wb=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var TT=l(()=>{"use strict";RT();Rp();xT()});var es,vb,IT=l(()=>{"use strict";xa();es=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vb=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${es(e.wakeError)}</div>`:"",a=Ra(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${es(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${es(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${es(o)}</p>
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
        <p class="home-card-meta">${es(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${es(n)}</p>
      </a>
    </div>`}});var OT=l(()=>{"use strict";IT()});var xp,Tp,Ip,MT,_b=l(()=>{"use strict";xp="support-reply",Tp="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",Ip=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),MT=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Op,NT,jT=l(()=>{"use strict";_b();Op=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),NT=()=>`<section class="card">
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
      <p>${Op(Tp)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Op(Ip)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Op(MT)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Op(xp)}">Run this sample</a>
      </div>
    </section>`});var C,ts=l(()=>{"use strict";C=e=>e==="passed"||e==="stopped"||e==="failed"});var DT,Wb,No,Lb,Da=l(()=>{"use strict";DT="Stopped at the round limit. The best prompt is kept.",Wb="Stopped because the score stopped rising. The best prompt is kept.",No="Finished. The best prompt is the result.",Lb="Wizard ended. Progress from finished steps is kept."});var za,Eb=l(()=>{"use strict";za=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var WK,LK,$a,zT,Mp=l(()=>{"use strict";WK=/\n+|;\s+/,LK=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,$a=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(WK).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,LK(s)]},[]);return[...t,...o]},[]),zT=e=>{let t=$a(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var se,rs=l(()=>{"use strict";se=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Ha,kb=l(()=>{"use strict";Mp();rs();Ha=e=>{let t=[...e.priorRounds,e.current],r=se(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:zT(o)}}});var Cb,EK,kK,Np,Rb=l(()=>{"use strict";Cb={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},EK=e=>{try{let t=JSON.parse(e.fragment);return{...Cb,objects:[...e.objects,t]}}catch{return{...Cb,objects:e.objects}}},kK=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:EK(r)},Np=e=>[...e].reduce(kK,Cb).objects});var CK,xb,RK,$T,Tb=l(()=>{"use strict";Rb();CK=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},xb=e=>{let t=Np(e).filter(CK),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},RK=(e,t)=>({...e,passed:e.score>=t}),$T=(e,t)=>{let r=xb(e);return r===null?null:RK(r,t)}});var Ib,Ob,jp=l(()=>{"use strict";Ib="The judge reply needs a score and a reason.",Ob="The improver reply was empty."});var HT,FT=l(()=>{"use strict";HT=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var UT,BT=l(()=>{"use strict";UT=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var TK,GT,VT=l(()=>{"use strict";FT();BT();Da();Mp();TK=e=>{let t=$a(e);return t.length===0?Wb:`${Wb} Avoid: ${t.join("; ")}.`},GT=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:DT};if(HT(e.scores)>=3){let t=e.scores.map((r,o)=>({score:r,reasons:e.reasons?.[o]??""}));return{type:"stopped",errorMessage:TK(UT(t))}}return null}});var Nr,IK,Mb,qT,Dp=l(()=>{"use strict";Nr=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},IK=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,Mb=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",IK(e.tokens),`Delay: ${Nr(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},qT=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var OK,KT,JT=l(()=>{"use strict";Tb();OK=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,KT=e=>{let r=(OK.exec(e)?.[1]??e).trim();return r.length===0||xb(r)!==null?null:r}});var YT,zp,XT=l(()=>{"use strict";Dp();JT();jp();YT=e=>({type:"call",role:"judge",choice:e.choice,prompt:qT({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),zp=e=>{let t=KT(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:Ob}}:{nextPrompt:t,continuation:YT({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var Nb,ZT=l(()=>{"use strict";Eb();kb();Tb();jp();Da();VT();jp();XT();Nb=e=>{let t=$T(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:Ib}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=GT({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=Ha({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:za({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var Fa,jb=l(()=>{"use strict";Fa=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var QT=l(()=>{"use strict"});var eI=l(()=>{"use strict"});var MK,tI,rI=l(()=>{"use strict";MK=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},tI=e=>[...e].reduce(MK,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var NK,oI,nI=l(()=>{"use strict";NK=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},oI=e=>[...e].reduce(NK,{out:"",inString:!1,escaped:!1}).out});var jK,DK,sI,iI=l(()=>{"use strict";rI();nI();jK=e=>e.charCodeAt(0)===65279?e.slice(1):e,DK=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},sI=e=>oI(tI(DK(jK(e))))});var zK,$K,HK,aI,FK,Ua,$p=l(()=>{"use strict";Rb();iI();zK=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},$K=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},HK=e=>[...e].reduce($K,{out:"",inString:!1,escaped:!1}).out,aI=e=>{let t=Np(e);return t.length===0?null:t[t.length-1]},FK=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Ua=e=>{let t=sI(zK(e)),r=aI(t);if(r!==null)return r;let o=HK(t),n=aI(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw FK(i)}}});var lI=l(()=>{"use strict";Da();$p()});var cI=l(()=>{"use strict"});var dI=l(()=>{"use strict";cI()});var zb,uI=l(()=>{"use strict";zb=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var UK,$b,pI=l(()=>{"use strict";Dp();UK=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,$b=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",UK(e.tokens),`Delay: ${Nr(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var BK,GK,VK,Hb,mI=l(()=>{"use strict";BK=/[A-Za-z0-9_./~-]{3,180}/g,GK=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,VK=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||GK.test(t)},Hb=(e,t=12)=>{let r=[];for(let o of e.matchAll(BK)){let n=o[0].replace(/\.+$/,"");if(!(!VK(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var Ba,gI=l(()=>{"use strict";Ba=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var Hp,Fb,fI,Ga,Ub=l(()=>{"use strict";Hp=e=>Math.floor(e/2),Fb=e=>Math.max(Hp(e)+1,e-20),fI=(e,t)=>e>=t?"passes":e>=Fb(t)?"close":e>=Hp(t)?"weak":"bad",Ga=e=>[{band:"bad",label:`0\u2013${Hp(e)-1} bad`},{band:"weak",label:`${Hp(e)}\u2013${Fb(e)-1} weak`},{band:"close",label:`${Fb(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var Fp,Bb=l(()=>{"use strict";Ub();Fp=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${fI(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var er,Gb=l(()=>{"use strict";er=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var hI,yI=l(()=>{"use strict";hI=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var qK,KK,SI,AI=l(()=>{"use strict";ts();Bb();Gb();yI();qK=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],KK=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",SI=e=>{let t=e.wizard;if(t===void 0)return[];let r=er(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=qK.map((h,y)=>{let u=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:h,state:u,detail:null}}).filter((h,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=Fp(e),d=c.filter(h=>h.id==="round-0"),p=hI(t)&&(!n||a)?c.filter(h=>h.id!=="round-0"):[],g=C(e.status)&&!s,A=g?[{id:"end",label:KK(e),state:"done",detail:e.errorMessage}]:[];if(g&&A.length>0){let h=Math.min(r,i.length),y=i.slice(0,h).map(u=>({...u,state:"done"}));return[...d,...y,...A,...p]}return[...d,...i,...p,...A]}});var JK,Vb,bI=l(()=>{"use strict";ts();Bb();AI();JK=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",Vb=e=>{if(e.wizard!==void 0)return SI(e);let t=Fp(e),r=C(e.status)?[{id:"end",label:JK(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var Va,PI=l(()=>{"use strict";Va=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var wI=l(()=>{"use strict";qt()});var vI,qa,Ka,ns,Up,qb,_I=l(()=>{"use strict";wI();vI="/prompt-optimizer/agent",qa=`${Vt}${vI}`,Ka=`${Vt}/prompt-optimizer`,ns="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",Up=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${ns}`,qb="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var tr=l(()=>{"use strict"});var ue,Bp=l(()=>{"use strict";tr();ue=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var Kb,WI=l(()=>{"use strict";Kb="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var LI,EI=l(()=>{"use strict";LI=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Ja,CI=l(()=>{"use strict";EI();tr();Ja=e=>({schemaVersion:4,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:LI(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90})});var Jb,RI=l(()=>{"use strict";tr();Jb=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null}))})});var Yb,xI=l(()=>{"use strict";tr();Yb=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var TI,Xb,II=l(()=>{"use strict";TI=["generalize","evaluate","separate","optimize_modules"],Xb=(e,t)=>{let r=TI.indexOf(t);if(r===-1)return e;let o=TI.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var Gp,Zb=l(()=>{"use strict";Mp();Gp=e=>{let t=$a(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var Qb,OI=l(()=>{"use strict";Zb();Qb=e=>{let t=Gp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var XK,ZK,QK,MI,NI=l(()=>{"use strict";XK=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),ZK=/^\{\{[a-zA-Z0-9_-]+\}\}$/,QK=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(XK(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},MI=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>ZK.test(n)?n:QK(n,r)).join("")}});var eP,jI=l(()=>{"use strict";NI();eP=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:MI(o.prompt,t)}))}))});var e8,rP,DI=l(()=>{"use strict";tr();Zb();e8=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),rP=e=>{let t=Gp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=e8(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var oP,zI=l(()=>{"use strict";jb();oP=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return Fa({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Ya,nP=l(()=>{"use strict";rs();Ya=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var sP,$I=l(()=>{"use strict";nP();sP=e=>{let t=Ya({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Xa,HI=l(()=>{"use strict";Xa=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var t8,r8,pe,iP=l(()=>{"use strict";Bp();t8=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},r8=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,pe=e=>{let t=ue(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:t8(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>r8(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var aP,FI=l(()=>{"use strict";Bp();iP();aP=e=>{let t=pe(e.wizard),r=ue(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var lP,UI=l(()=>{"use strict";lP=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var At,o8,cP,BI=l(()=>{"use strict";At=m(Ys());$p();o8=(0,At.isType)({name:At.isNonEmptyString,description:At.isString,sampleValue:At.isString}),cP=e=>{let t=Ua(e);if(!(0,At.isType)({templatedPrompt:At.isNonEmptyString,variables:(0,At.isArrayWithEachItem)(o8)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var ie,n8,s8,dP,GI=l(()=>{"use strict";ie=m(Ys());tr();$p();n8=(0,ie.isType)({id:ie.isNonEmptyString,title:ie.isNonEmptyString,prompt:ie.isNonEmptyString,order:ie.isNumber}),s8=(0,ie.isType)({id:ie.isNonEmptyString,title:ie.isNonEmptyString,summary:ie.isString,topology:(0,ie.isOneOf)("chain","parallel"),modules:(0,ie.isArrayWithEachItem)(n8),recommended:ie.isBoolean}),dP=e=>{let t=Ua(e);if(!(0,ie.isType)({options:(0,ie.isArrayWithEachItem)(s8)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var ss,VI=l(()=>{"use strict";ss=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var i8,Za,uP=l(()=>{"use strict";i8=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Za=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(i8,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var jo,is,qI=l(()=>{"use strict";rs();uP();jo=e=>Za(e.templatedPrompt,e.variables),is=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return se(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??jo(e.wizard)}});var a8,Qa,KI=l(()=>{"use strict";a8=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Qa=(e,t)=>e.replace(a8,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var l8,Do,Vp=l(()=>{"use strict";l8=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Do=e=>{let t=new Set,r=[];for(let o of e.matchAll(l8)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var el,JI=l(()=>{"use strict";Vp();el=e=>e.variables.length>0||Do(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var pP,mP=l(()=>{"use strict";tr();pP=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var tl,YI=l(()=>{"use strict";rs();mP();tl=e=>{let t=e.wizard.evaluateSelectedRound??se(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:pP(r.judgement,e.passScore)}});var rl,XI=l(()=>{"use strict";rl=e=>e.length===1&&e[0].modules.length===1});var gP,ZI=l(()=>{"use strict";gP=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Se,qp,ol=l(()=>{"use strict";Se=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),qp=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var QI,eO=l(()=>{"use strict";ol();QI=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Se("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Se("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Se("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var tO,rO=l(()=>{"use strict";ts();ol();tO=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!C(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Se("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),Se("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Se("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",qp(e.writerLabel,e.folder)),Se("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Se("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var oO,nO=l(()=>{"use strict";ol();oO=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Se("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Se("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Se("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var sO,iO=l(()=>{"use strict";ol();sO=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Se("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Se("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",qp(e.writerLabel,e.folder)),...r?[Se("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var Kp,aO=l(()=>{"use strict";ts();eO();rO();nO();iO();Kp=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(C(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return tO(r);case"evaluate":return QI({...r,currentRound:e.currentRound});case"separate":return sO(r);case"optimize_modules":return oO({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var nl,zo,lO=l(()=>{"use strict";nl=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),zo=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var c8,Jp,fP,cO=l(()=>{"use strict";Vp();c8="wizardParam_",Jp=e=>`${c8}${e}`,fP=e=>{let t=Do(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=Jp(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var $o,dO=l(()=>{"use strict";$o=["generalize","evaluate","separate","optimize_modules"]});var R=l(()=>{"use strict";ts();Da();ZT();Eb();Dp();jb();QT();eI();lI();dI();uI();pI();mI();kb();gI();rs();bI();Gb();Ub();PI();_I();tr();Bp();WI();CI();RI();xI();II();OI();jI();DI();zI();nP();$I();HI();iP();FI();UI();BI();GI();VI();qI();uP();KI();Vp();JI();YI();XI();mP();ZI();aO();lO();cO();dO()});var hP,Xp,d8,pO,mO=l(()=>{"use strict";hP=m(require("node:fs")),Xp=m(require("node:path")),d8=e=>Xp.default.join(Xp.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),pO=(e,t)=>{let r=d8(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;hP.default.mkdirSync(Xp.default.dirname(r),{recursive:!0}),hP.default.appendFileSync(r,o,"utf8")}});var as,gO,u8,fO,p8,hO,Rt,K,yO,H,Je=l(()=>{"use strict";as=m(require("node:fs")),gO=m(require("node:path"));R();mO();u8=e=>e.wizard===void 0?e:{...e,wizard:Jb(e.wizard)},fO=new Set,p8=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),hO=(e,t)=>{as.default.mkdirSync(gO.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;as.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),as.default.renameSync(r,e)},Rt=e=>{if(!as.default.existsSync(e))return[];try{let t=JSON.parse(as.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(p8).map(u8):[]}catch{return[]}},K=(e,t)=>Rt(e).find(r=>r.id===t)??null,yO=(e,t)=>{fO.add(t);let r=Rt(e).filter(o=>o.id!==t);hO(e,r)},H=(e,t)=>{if(fO.has(t.id))return;let r=Rt(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];hO(e,o),pO(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var SO,Zp,yP,Fo,SP,Ye,Uo,me,Xe=l(()=>{"use strict";SO=m(require("node:fs")),Zp=m(require("node:os")),yP=m(require("node:path"));ht();Fo="~",SP=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Ye=e=>{let t=Zp.default.homedir(),r=SP(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Uo=e=>{let t=e.trim().length===0?"~":e.trim(),r=et(t),o=yP.default.isAbsolute(r)?SP(r):SP(yP.default.resolve(Zp.default.homedir(),r));try{if(!SO.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:Ye(o)}},me=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Zp.default.homedir()});var sl=l(()=>{"use strict";mt();La();Yd()});var m8,AO,bO=l(()=>{"use strict";sl();m8=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,AO=e=>{let t=kn(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(m8)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var g8,f8,PO,Qp,wO,h8,rt,vO,_O,WO,jr=l(()=>{"use strict";sl();bO();g8="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",f8="The writer waited on terminal input and did not return a prompt.",PO=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Qp=e=>{let t=e.trim();if(t.length===0||t.length>=500||!PO.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>PO.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},wO=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},h8=e=>Qp(e.stdout)??Qp(e.stderr)??(wO(e.replyFile)?Qp(e.replyFile):null),rt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return g8;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?f8:null},vO=e=>{let t=e.trim();return t.length===0?null:rt(t)!==null?t:Qp(t)??(wO(t)?t:null)},_O=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],WO=e=>{let t=e.replyFileText?.trim()??"",r=rt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=h8({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null)return{ok:!1,errorMessage:o};let n=AO([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=kn(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply."}}});var ls,xt,il,LO,em,y8,EO,kO,CO,AP=l(()=>{"use strict";ls=m(require("node:fs")),xt=m(require("node:path")),il=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},LO=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),em=(e,t)=>{let r=il(e);return r.length>0?r:il(t)},y8=e=>{let t=em(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${LO(o)}`,...n.length>0?[`description: ${LO(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},EO=e=>`.cursor/skills/${e}/SKILL.md`,kO=(e,t)=>{let r=il(t);if(r.length===0)return!1;let o=xt.default.resolve(e),n=xt.default.resolve(o,".cursor","skills"),s=xt.default.resolve(o,EO(r));return s.startsWith(`${n}${xt.default.sep}`)?ls.default.existsSync(s):!1},CO=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(em(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=xt.default.resolve(e.workingDirectory);try{if(!ls.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=y8({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=EO(r.slug),n=xt.default.resolve(t,".cursor","skills"),s=xt.default.resolve(t,o);if(!s.startsWith(`${n}${xt.default.sep}`))return{ok:!1,errorCode:"path"};if(ls.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{ls.default.mkdirSync(xt.default.dirname(s),{recursive:!0}),ls.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var S8,RO,xO,TO=l(()=>{"use strict";R();R();Je();Xe();jr();AP();S8=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,RO=e=>{let t=e.get("savedSkill");return t!==null&&S8.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},xO=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=K(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!C(r.status))return{kind:"redirect",location:o("skillError=working")};let n=se(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||rt(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=CO({workingDirectory:me(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var Dr,al=l(()=>{"use strict";R();Dr=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=gP(t);return{...e,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:nl(r.variables)},updatedAt:new Date().toISOString()}}});var zr,ll=l(()=>{"use strict";zr=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var T,A8,tm,re,Bo,OO,IO,MO,NO,xe=l(()=>{"use strict";T="manual",A8=["claude-cli","codex","cursor","antigravity"],tm={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},re=e=>e===T?"You":e in tm?tm[e]:e,Bo=e=>A8.filter(t=>e.includes(t)),OO=e=>{let t=Bo(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},IO=(e,t)=>t===T?T:e.find(r=>r===t)??null,MO=(e,t,r)=>{let o=Bo(e),n=IO(o,t),s=IO(o,r);return n===null||s===null?null:{judge:n,improver:s}},NO=(e,t,r)=>{let o=Bo(e);return t===null||t.trim()===""?r!==T?r:o[0]??null:t===T?null:o.find(n=>n===t)??null}});var bP,jO,DO=l(()=>{"use strict";bP={ok:!1,errorMessage:"Stopped.",stopped:!0},jO=(e,t,r)=>{if(t===void 0)return;let o=()=>{e.kill("SIGTERM"),r(bP)};if(t.aborted){o();return}t.addEventListener("abort",o,{once:!0})}});var zO,cl,$O,PP,b8,P8,w8,ot,dl=l(()=>{"use strict";zO=require("node:child_process"),cl=m(require("node:fs")),$O=m(require("node:os")),PP=m(require("node:path"));sl();DO();jr();b8=["claude-cli","codex","cursor","antigravity"],P8=18e4,w8=e=>b8.includes(e),ot=e=>new Promise(t=>{if(e.signal?.aborted){t(bP);return}if(!w8(e.writerAgent)){t({ok:!1,errorMessage:"The writer did not reply."});return}let r=e.writerAgent,o=Lt(r,e.prompt,ce({}));if(o===null){t({ok:!1,errorMessage:"The writer did not reply."});return}if(!cl.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=PP.default.join(cl.default.mkdtempSync(PP.default.join($O.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),s=_O({writerAgent:r,baseArgs:o.args,replyPath:n}),i=[],a=[],c={settled:!1,timer:void 0},d=(0,zO.spawn)(o.command,[...s],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),p=g=>{c.settled||(c.settled=!0,clearTimeout(c.timer),t(g))};jO(d,e.signal,p),c.timer=setTimeout(()=>{d.kill("SIGTERM"),p({ok:!1,errorMessage:"The writer did not reply."})},e.timeoutMs??P8),d.stdout.on("data",g=>{i.push(Buffer.from(g))}),d.stderr.on("data",g=>{a.push(Buffer.from(g))}),d.on("error",()=>p({ok:!1,errorMessage:"The writer did not reply."})),d.on("close",()=>{let g=cl.default.existsSync(n)?cl.default.readFileSync(n,"utf8"):null;p(WO({writerAgent:r,stdout:Buffer.concat(i).toString("utf8"),stderr:Buffer.concat(a).toString("utf8"),replyFileText:g}))})})});var HO,v8,ul,rm,om=l(()=>{"use strict";R();xe();HO=e=>e===T?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},v8=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),ul=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=Nb({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:HO(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:Ba(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=v8(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i}},rm=(e,t,r=null)=>{let o=zp({raw:t,judge:HO(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var nm,wP=l(()=>{"use strict";nm=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var BO,sm,im,FO,UO,vP,_8,GO,_P,W8,VO,L8,E8,qO,KO=l(()=>{"use strict";BO=require("node:child_process"),sm=m(require("node:fs")),im=m(require("node:path"));R();FO=4e3,UO=12e3,vP=(e,t)=>{let r=(0,BO.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},_8=e=>vP(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",GO=e=>{let t=vP(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},_P=(e,t)=>{let r=im.default.resolve(e,t),o=im.default.relative(e,r);if(o.startsWith("..")||im.default.isAbsolute(o)||!sm.default.existsSync(r)||!sm.default.statSync(r).isFile())return null;let n=sm.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>FO?`${n.slice(0,FO)}
\u2026truncated`:n},W8=e=>e.length>UO?`${e.slice(0,UO)}
\u2026truncated`:e,VO=e=>{let t=Hb(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,_P(e.workingDirectory,n)])),o=_8(e.workingDirectory);return{git:o,status:o?GO(e.workingDirectory):{},files:r,paths:t}},L8=(e,t)=>{let r=vP(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=_P(e,t);return o===null?`${t} is missing.`:o},E8=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",qO=e=>{let t=e.before.git?GO(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=_P(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>L8(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:E8(e.before.git,e.before.paths.length>0),evidence:W8(i.join(`

`))}}});var EP,U,kP,_e,JO,k8,C8,YO,cs,XO,ds,R8,x8,pl,WP,LP,T8,ZO,I8,O8,M8,QO,N8,eM,tM,j8,D8,rM,oM=l(()=>{"use strict";EP=require("node:child_process"),U=m(require("node:fs")),kP=m(require("node:os")),_e=m(require("node:path")),JO=8e6,k8=16e6,C8=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],YO=(e,t)=>{let r=(0,EP.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},cs=(e,t)=>(0,EP.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,XO=e=>{let t=YO(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},ds=(e,t)=>{let r=_e.default.resolve(e,t),o=_e.default.relative(e,r);return o.startsWith("..")||_e.default.isAbsolute(o)?null:r},R8=(e,t)=>{let r=ds(e,t);if(r===null||!U.default.existsSync(r))return null;let o=U.default.statSync(r);return!o.isFile()||o.size>JO?null:U.default.readFileSync(r)},x8=(e,t,r)=>{let o=ds(e,t);o!==null&&(U.default.mkdirSync(_e.default.dirname(o),{recursive:!0}),U.default.writeFileSync(o,r))},pl=(e,t)=>{let r=ds(e,t);r===null||!U.default.existsSync(r)||U.default.rmSync(r,{recursive:!0,force:!0})},WP=(e,t)=>cs(e,["cat-file","-e",`HEAD:${t}`]),LP=e=>{let t=YO(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},T8=e=>_e.default.resolve(e)!==_e.default.resolve(kP.default.homedir()),ZO=e=>{if(!U.default.existsSync(e))return 0;let t=U.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?U.default.readdirSync(e).reduce((r,o)=>r+ZO(_e.default.join(e,o)),0):0},I8=(e,t,r)=>{let o=ds(e,r);if(o===null||!U.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(ZO(o)>k8)return{relativePath:r,existed:!0,copyDir:null};let n=_e.default.join(t,"cache",r);return U.default.mkdirSync(_e.default.dirname(n),{recursive:!0}),U.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},O8=400,M8=32e6,QO=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!U.default.existsSync(s)))for(let i of U.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=_e.default.join(s,i),c=U.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>JO)){if(t.length>=O8||r+c.size>M8){o=!1;return}r+=c.size,t.push(_e.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},N8=(e,t,r)=>{let o=ds(e,r);if(o===null||!U.default.existsSync(o))return null;let n=R8(e,r);if(n===null)return"skip";let s=_e.default.join(t,"files",r);return U.default.mkdirSync(_e.default.dirname(s),{recursive:!0}),U.default.writeFileSync(s,n),s},eM=e=>{let t=U.default.mkdtempSync(_e.default.join(kP.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?XO(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:QO(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,N8(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?LP(e.workingDirectory):null,isolateCaches:T8(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:C8.map(i=>I8(e.workingDirectory,t,i))}},tM=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){pl(e.workingDirectory,t);return}x8(e.workingDirectory,t,U.default.readFileSync(r))}},j8=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?tM(e,t):WP(e.workingDirectory,t)?cs(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):pl(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&WP(e.workingDirectory,t)&&cs(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!WP(e.workingDirectory,t)&&cs(e.workingDirectory,["reset","-q","HEAD","--",t])},D8=(e,t)=>{let r=ds(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){pl(e.workingDirectory,t.relativePath),U.default.mkdirSync(_e.default.dirname(r),{recursive:!0}),U.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){pl(e.workingDirectory,t.relativePath);return}if(U.default.existsSync(r))for(let o of U.default.readdirSync(r)){let n=_e.default.join(r,o);U.default.statSync(n).mtimeMs>=e.startedMs-1e3&&U.default.rmSync(n,{recursive:!0,force:!0})}}}},rM=e=>{try{if(e.git){if(LP(e.workingDirectory)!==e.head&&(!(e.head===null?cs(e.workingDirectory,["update-ref","-d","HEAD"]):cs(e.workingDirectory,["reset","--hard",e.head]))||LP(e.workingDirectory)!==e.head))throw new Error("head");let r=XO(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))j8(e,o)}else{if(e.complete)for(let t of QO(e.workingDirectory).paths)e.files[t]===void 0&&pl(e.workingDirectory,t);for(let t of Object.keys(e.files))tM(e,t)}for(let t of e.caches)D8(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{U.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var am,lm,z8,$8,H8,F8,U8,nM,B8,sM,iM=l(()=>{"use strict";R();om();wP();KO();oM();xe();Xe();dl();am=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),lm=e=>({...e,status:"stopped",errorMessage:No,judgePhase:void 0,updatedAt:new Date().toISOString()}),z8=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),$8=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==T?t:e.improverModel!==T?e.improverModel:null}return e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null},H8=async e=>{let t=me(e.cycle),r=VO({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=eM({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?oP({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Xa(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):Fa({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=await ot({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal}),a=i.ok?qO({workingDirectory:t,before:r,writerReply:i.text}):null,c=rM(o);return i.ok?!c.ok||a===null?{ok:!1,cycle:am(e.cycle,c.ok?"Could not put the folder back after the run.":c.errorMessage)}:{ok:!0,run:{output:i.text.trim(),tokens:i.tokens,delayMs:Date.now()-n,lookedAt:a.lookedAt,evidence:a.evidence}}:i.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:lm(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:am(e.cycle,i.errorMessage)})},F8=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:H8({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),U8=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),nM=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await ot({writerAgent:e.reviewer,workingDirectory:me(e.cycle),prompt:$b({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:lm(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},B8=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===T)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await ot({writerAgent:t.judgeModel,workingDirectory:me(t),prompt:zb({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...ul(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?lm(o):(e.onWriterFailure?.(t.judgeModel),am(o,n.errorMessage))},sM=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return B8(e);let o=$8(t),n=await F8({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?z8(t,n.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===T){let p=await nM({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...U8(s,p.text),judgePhase:void 0}}let i=await ot({writerAgent:t.judgeModel,workingDirectory:me(t),prompt:Mb({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?lm(s):(e.onWriterFailure?.(t.judgeModel),am(s,i.errorMessage));let a=await nM({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=ul(s,i.text,c);return nm(d,a.text)}});var cm,CP=l(()=>{"use strict";R();cm=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Ha({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:Ba(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var dm,G8,V8,RP,aM=l(()=>{"use strict";R();om();iM();CP();xe();Xe();dl();dm=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),G8=e=>({...e,status:"stopped",errorMessage:No,updatedAt:new Date().toISOString()}),V8=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?G8(e):(n?.(r),dm(e,t.errorMessage)),RP=async(e,t,r,o)=>{let n=e.revisions.find(c=>c.roundNumber===e.currentRound);if(n===void 0)return dm(e,"This round has no prompt.");if(e.status==="judging")return sM({cycle:e,revision:n,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return dm(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===T)return e;let s=cm(e);if(s===null)return dm(e,"The improver needs the score and the reason.");let i=await ot({writerAgent:e.improverModel,workingDirectory:me(e),prompt:za({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r}),a=V8(e,i,e.improverModel,r,t);return a!==null?a:rm(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var ml,xP=l(()=>{"use strict";ml=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var mm,um,lM,q8,K8,pm,cM,dM,J8,Y8,Go,uM,pM,gl=l(()=>{"use strict";R();al();ll();xe();Xe();dl();aM();xP();mm=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),um=(e,t,r)=>e.wizard===void 0||t===null?mm(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},lM=e=>{let t=e.wizard;return t===void 0||ml(e).length===0?e:{...e,wizard:ss({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},q8=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",K8=e=>{let t=e.wizard;if(t===void 0)return e;let r=Ya({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:ss({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},pm=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),cM=e=>e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null,dM=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},J8=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=cM(e);if(n===null)return mm(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??jo(o),i=Qb({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:dM(e,"generalize")}),a=await ot({writerAgent:n,prompt:i,workingDirectory:me(e),signal:t});if(!a.ok)return r?.(n),um(e,"generalize",a.errorMessage);try{let c=cP(a.text),d=ss({wizard:{...o,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:nl(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return el(d)?Go({...p,wizard:{...d,gate:null}}):pm(p,"generalize")}catch(c){return um(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},Y8=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=cM(e);if(n===null)return mm(e,"Choose a writer to suggest splits.");let s=is({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=rP({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:dM(e,"separate")}),a=await ot({writerAgent:n,prompt:i,workingDirectory:me(e),signal:t});if(!a.ok)return r?.(n),um(e,"separate",a.errorMessage);try{let c=dP(a.text),d=eP(c,o.variables),p=ss({wizard:{...o,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),g={...e,wizard:p};return rl(d)?Dr(g,d[0]):pm(g,"separate")}catch(c){return um(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},Go=e=>{let t=e.wizard;if(t===void 0)return e;let r=jo(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},uM=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return mm(e,"This module is missing.");let n=zo(r),s=Qa(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==T?e.runnerModel:e.judgeModel!==T?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:ue(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},pM=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return RP(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return J8(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return Y8(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await RP(e,t,r,o);if(C(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&ml(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let g=se(s.revisions.map(A=>({roundNumber:A.roundNumber,promptText:A.promptText,score:A.judgement?.score??0,reasons:A.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:g}}}if(i==="evaluate"&&tl({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let p=lM(pm(a,i));return zr(p)}let c=pm(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=sP({wizard:{...c.wizard,modules:c.wizard.modules.map((g,A)=>A===c.wizard.currentModuleIndex&&g.status==="running"?{...g,status:"paused"}:g)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:q8(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?lM(d):K8(d)}return s}return n.phase==="complete",e}});var mM,us,gm=l(()=>{"use strict";jr();mM=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:vO(e.promptText)},us=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t===void 0?null:mM(t);if(r!==null)return r.trim();for(let o=e.revisions.length-1;o>=0;o-=1){let n=mM(e.revisions[o]);if(n!==null)return n.trim()}return null}});var ps,fm=l(()=>{"use strict";ps='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var TP,gM,X8,fM,hM,IP=l(()=>{"use strict";R();xe();Xe();fm();TP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gM=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',X8=e=>{let t=gM(e.state),r=`<h2>${TP(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${TP(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${ps}</button></div><template>${r}</template></li>`},fM=e=>{let t=e.wizard;if(t===void 0)return"";let r=Kp({status:e.status,wizard:t,writerLabel:re(e.judgeModel),runnerLabel:re(e.runnerModel??e.judgeModel),folderDisplay:Ye(me(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(X8).join("")}</ol>`},hM=e=>{let t=e.wizard;if(t===void 0)return"";let r=Kp({status:e.status,wizard:t,writerLabel:re(e.judgeModel),runnerLabel:re(e.runnerModel??e.judgeModel),folderDisplay:Ye(me(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${gM(n.state)}<span class="sdlc-pipeline-label">${TP(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var hm,ms,OP=l(()=>{"use strict";xP();hm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ms=e=>{let t=ml(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${hm(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,p=e.cycle.revisions.map(g=>{let A=g.judgement?.score,h=A==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${A}`,y=g.judgement?.reasons?.trim()??"",u=y.length===0?"":`<br><span class="muted">${hm(y)}</span>`;if(e.interactive){let S=e.selectedRound===g.roundNumber?" checked":"";return`<li><label><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${S}> ${hm(h)}</label>${u}</li>`}return`<li>${hm(h)}${u}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var MP,yM,ym,SM,Sm=l(()=>{"use strict";MP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yM=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${MP(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${MP(t.prompt)}</pre></li>`).join("")}</ol>`,ym=e=>yM([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),SM=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${MP(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${yM(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var Z,Z8,Q8,e4,t4,Am,r4,o4,n4,s4,i4,a4,gs,bm=l(()=>{"use strict";R();IP();OP();Sm();Z=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Z8={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},Q8=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Z(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Z(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Z(o)}</pre></details>`;return`<h2>${Z(e)}</h2>${n}`},e4=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=jo(t).trim(),n=is({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!C(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${Q8("What is being evaluated",i)}`},t4=(e,t)=>{let r=e.wizard;if(r===void 0||C(e.status))return"";let o=Z8[t];return o===void 0||r.phase!==o?"":hM(e)},Am=(e,t,r)=>{let o=t4(e,t),n=t==="wizard-2"?e4(e):"";return`${o}${n}${r}`},r4=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},o4=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.variables.length===0?'<p class="muted">No variables yet.</p>':`<ul class="sdlc-wizard-vars">${t.variables.map(a=>`<li><strong>{{${Z(a.name)}}}</strong> \u2014 ${Z(a.description)} (sample: ${Z(a.sampleValue)})</li>`).join("")}</ul>`,o=t.templatedPrompt.trim(),n=o.length===0?'<p class="muted">No templated prompt yet.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${Z(o)}</pre>`,s=Za(t.templatedPrompt,t.variables).trim(),i=s.length===0||s===o?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${Z(s)}</pre>`;return`${r}${n}${i}`},n4=(e,t)=>`<ul class="sdlc-wizard-revisions">${e.map(o=>{let n=o.score===null?`Round ${o.roundNumber} \u2014 not scored`:`Round ${o.roundNumber} \u2014 ${o.score}`,s=t===o.roundNumber?" (selected)":"",i=o.reasons?.trim()??"",a=i.length===0?"":`<br><span class="muted">${Z(i)}</span>`;return`<li>${Z(n)}${s}${a}</li>`}).join("")}</ul>`,s4=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return ms({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=r4(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${n4(o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=is({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Z(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Z(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},i4=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Z(n.title)}</strong> <span class="muted">(${Z(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Z(o.title)}</strong>${n}${Z(s)}<br><span class="muted">${Z(o.summary)} (${Z(o.topology)})</span>${ym(o)}</li>`}).join("")}</ul>`},a4=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Z(i)}</span> <strong>${Z(n.title)}</strong>${Z(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Z(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?ms({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},gs=(e,t)=>{switch(t){case"wizard-1":return Am(e,t,o4(e));case"wizard-2":return Am(e,t,s4(e));case"wizard-3":return Am(e,t,i4(e));case"wizard-4":return Am(e,t,a4(e));default:return""}}});var l4,c4,AM,bM,PM=l(()=>{"use strict";R();gm();jr();bm();l4=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},c4=e=>{let t=e.goal.trim();return t.length===0?null:t},AM=(e,t,r,o,n)=>{let s=rt(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},bM=(e,t)=>{let r=c4(e);if(t.id.startsWith("wizard-")){let s=gs(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=Va(e,t);if(s!==null){let a=us(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=se(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:AM(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:l4(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:AM(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var Vo,wM,vM=l(()=>{"use strict";Vo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wM=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${Vo(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Vo(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${Vo(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${Vo(n)}</h2><pre class="mono">${Vo(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${Vo(e.goal)}</dd></div></dl>`;return`<h2>${Vo(e.title)}</h2>${i}${t}${r}${o}${s}`}});var NP,_M,WM,fs,LM,fl=l(()=>{"use strict";R();Je();NP=new Map,_M=e=>{let t=new AbortController;return NP.set(e,t),t.signal},WM=e=>{NP.delete(e)},fs=e=>{NP.get(e)?.abort()},LM=(e,t)=>{let r=K(e,t);return r===null||r.wizard!==void 0?!1:(C(r.status)||(H(e,{...r,status:"stopped",errorMessage:No,updatedAt:new Date().toISOString()}),fs(t)),!0)}});var d4,u4,jP,p4,m4,g4,EM,kM,DP=l(()=>{"use strict";R();gl();al();ll();fl();d4=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),u4=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||C(e.status))return null;let r=er(t);return r<0||r>3?null:`wizard-${r+1}`},jP=(e,t)=>d4.has(t)?u4(e)===t:!1,p4=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),m4=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},g4=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null,phase:"complete"},n=pe(o);return{...e,status:n.terminalStatusSuggestion,errorMessage:null,wizard:o,updatedAt:new Date().toISOString()}},EM=(e,t)=>{if(!jP(e,t))return e;fs(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return Go({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return zr(m4(r));if(t==="wizard-3"){let n=o.splitOptions[0]??p4(o.templatedPrompt);return Dr(r,n)}return t==="wizard-4"?g4(r):e},kM="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var qo,hs,hl=l(()=>{"use strict";qo=e=>e.toLocaleString("en-US"),hs=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var Tt,f4,CM,RM,xM,TM,zP=l(()=>{"use strict";R();PM();vM();DP();fm();gm();IP();hl();Tt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),f4=(e,t)=>{let r=Va(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?hs(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${qo(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Tt(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${Tt(r)}</span>`:"",d=wM(bM(t,e)),p=t.wizard!==void 0&&t.wizard.phase==="complete"&&C(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${Tt(e.id)}"`:"",g=jP(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${Tt(kM)}"><input type="hidden" name="cycleId" value="${Tt(t.id)}"><input type="hidden" name="wizardStepId" value="${Tt(e.id)}"><button class="btn btn-secondary sdlc-node-skip-btn" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",A=e.state==="active"&&e.id.startsWith("wizard-")?fM(t):"",h=o?"failed":e.state,y=o?us(t):null,u=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${ps}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${Tt(y)}</pre></template>`:"";return`<li class="sdlc-node sdlc-node-${h}" data-sdlc-step-id="${Tt(e.id)}"${e.state==="active"&&e.id.startsWith("wizard-")?' id="prompt-optimizer-wizard-active-step"':""}><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${p} data-sdlc-node>${n}<span class="sdlc-node-label">${Tt(e.label)}${c}${a}</span></button>${u}${g}</div>${A}<template>${d}</template></li>`},CM=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>f4(r,t)).join("")}</ol>`,RM=e=>`<div class="sdlc-score" aria-label="What the score means">${Ga(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Tt(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,xM='<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog"><button class="btn btn-secondary" type="submit">Close</button></form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>',TM=`<script>
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
</script>`});var $r,IM,h4,OM=l(()=>{"use strict";R();Xe();jr();AP();$r=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IM=e=>{if(!C(e.status))return"";let t=se(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=rt(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${$r(t.reasons.trim())}</p>`,i=n===null?h4({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:me(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${$r(n)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${o}${s}${i}</section>`},h4=e=>{let t=e.sourceSkill?.fileName??il(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=em(t,r),s=n.length>0&&kO(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${$r(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${$r(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${$r(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${$r(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${$r(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${$r(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var MM,NM=l(()=>{"use strict";MM=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return r!==null?`The judge CLI returned an error instead of a score: ${r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}`:"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var jM,y4,Pm,He,wm,$P=l(()=>{"use strict";R();R();xe();NM();gm();jr();jM=["Generalize","Evaluate","Separate","Optimize modules"],y4=e=>{let t=er(e),r=t>=0&&t<jM.length?jM[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},Pm=(e,t)=>{let r=us(e),o=r===null?null:MM(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},He=(e,t)=>({title:e,detail:t,replyPreview:null}),wm=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:null}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!C(e.status)){let t=e.judgeModel;return He(`${re(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!C(e.status)){let t=e.judgeModel;return He(`${re(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===T?He(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?He(`${re(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):He(`${re(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===T){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==T?He(`${re(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):He(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return He(`${re(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ue(t);return He(`${re(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return He(`${re(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ue(t);return He(`${re(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return He(`${re(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===T){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return He("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return He(`${re(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>rt(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=pe(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||C(e.status));return{title:i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",detail:r.length>0?r:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?Pm(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o="A writer or judge reply could not be used. Start a new run after fixing the issue.";return r!==void 0?Pm(e,{title:y4(r),detail:t.length>0?t:o}):Pm(e,{title:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(C(e.status)){let t=e.errorMessage?.trim()??"";return Pm(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var It,yl=l(()=>{"use strict";xe();It=e=>{if(e.status==="improving"&&e.improverModel===T)return!0;if(e.status!=="judging"||e.judgeModel!==T)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===T}});var DM,zM=l(()=>{"use strict";DM=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Hr,S4,$M,HM=l(()=>{"use strict";R();Hr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),S4=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Hr(r)}</p>`},$M=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Hr(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${Hr(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Hr(a)}.</p>`}<pre class="mono">${Hr(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Nr(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Hr(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",g=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Hr(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${S4(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Hr(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Sl,A4,FM,UM=l(()=>{"use strict";R();jr();Sl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),A4=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=rt(t.promptText),n=t.judgement?.reasons?`<p class="muted">${Sl(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Sl(i)}.</p>`}<pre class="mono">${Sl(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Nr(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${Sl(d)}</pre>`:`<div class="alert-error">${Sl(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},FM=e=>e.revisions.map(t=>A4(e,t)).join("")});var BM,GM=l(()=>{"use strict";R();BM=e=>{if(C(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Ot,b4,HP,P4,w4,v4,_4,VM,qM,FP=l(()=>{"use strict";GM();Ot=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),b4="Stop this run? Writers will stop and the best prompt is kept.",HP="End the wizard? Writers will stop and progress from finished steps is kept.",P4="Skip this module and pause at the step gate?",w4=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${Ot(b4)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Ot(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,v4=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${Ot(HP)}"><input type="hidden" name="cycleId" value="${Ot(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,_4=e=>{let t=Ot(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Ot(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${Ot(P4)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${Ot(HP)}">End wizard</button>
    </form>
  </div>`},VM=e=>{let t=BM(e);return t==="none"?"":t==="classic"?w4(e.id):t==="wizard_end_only"?v4(e.id):_4(e)},qM=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=Ot(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${Ot(HP)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var KM,JM=l(()=>{"use strict";R();hl();KM=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=pe(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${qo(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${qo(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${ue(r)}`}return""}});var W4,YM,XM=l(()=>{"use strict";R();W4=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},YM=(e,t)=>{let r=e.wizard,o=W4(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=er(r);return o<n?"done":o===n&&C(e.status)&&e.status==="failed"?"failed":o<=n&&C(e.status)?"done":"pending"}});var L4,E4,ZM,k4,QM,eN=l(()=>{"use strict";R();JM();XM();bm();L4=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',E4=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',ZM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),k4=(e,t,r)=>{let o=gs(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=KM(e,t),i=YM(e,t),a=L4(i),c=E4(i),d=`${a}<span class="sdlc-wizard-outcome-step-title">${ZM(n)}</span>${c}<span class="muted sdlc-wizard-outcome-step-hint">${ZM(s)}</span>`,p=t==="wizard-4"&&r.phase==="complete"?" open":"",g=i==="failed"&&t!=="wizard-4"?" open":"",A=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${A}"${p}${g}><summary aria-controls="${A}-body">${d}</summary><div class="sdlc-wizard-outcome-step-body" id="${A}-body">${o}</div></details>`},QM=e=>{let t=e.wizard;if(t===void 0||!C(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>k4(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var tN,rN,oN=l(()=>{"use strict";tN=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rN=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${tN(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${tN(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var UP,nN,BP=l(()=>{"use strict";UP=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,nN=(e,t)=>{if(UP(e,t))return"Passed";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var sN,iN=l(()=>{"use strict";sN=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var vm,aN,lN=l(()=>{"use strict";R();BP();BP();iN();vm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aN=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=pe(t),o=ue(t),n=r.terminalStatusSuggestion==="passed"?"":sN(r,o),s=o-10,i=r.rows.map((c,d)=>{let p=t.modules[d],g=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,h=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=p===void 0?c.status:nN(p,o),u=p!==void 0&&UP(p,o)?'<span aria-label="Passed">\u2713</span>':vm(y);return`<tr${h}><td>${vm(c.title)}</td><td>${vm(g)}</td><td>${c.tokens??"\u2014"}</td><td>${u}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${vm(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var C4,cN,dN=l(()=>{"use strict";R();R();oN();lN();C4=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cN=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!C(e.status)||t.modules.length===0)return"";let r=aN(e),o=rN(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=pe(t),i=s.passedModuleCount<s.totalModules?" open":"";return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${C4(n)}</pre></details>`}${r}${o}</section>`}});var or,Al=l(()=>{"use strict";or=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var nr,_m,GP=l(()=>{"use strict";R();zP();OM();$P();yl();zM();CP();HM();UM();FP();eN();dN();hl();Xe();Al();nr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_m=e=>{let t=!C(e.status)&&e.status!=="wizard_paused"&&!It(e),r=wm(e),o=CM(Vb(DM(e)),e),n=C(e.status)?"":VM(e),s=QM(e),i=cN(e),a=IM(e),c=e.errorMessage===null?"":`<div class="alert-error">${nr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?pe(e.wizard):null,A=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,h=!t&&e.wizard!==void 0&&C(e.status)&&(e.wizard.phase==="complete"||pe(e.wizard).passedModuleCount>0),y=h?A?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",u=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${nr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",S=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${nr(r.replyPreview)}</pre>`,b=r.detail.length===0&&u.length===0&&S.length===0||r.detail.length===0&&S.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${nr(r.detail)}${p}</p>`}${S}</div>`,f=e.revisions.find(Jr=>Jr.roundNumber===e.currentRound),w=e.status==="improving"?cm(e):null,v=hs(e),_=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),L=It(e)?$M({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:w?.promptText??f?.promptText??"",score:w?.score??f?.judgement?.score??null,reasons:w?.reasons??f?.judgement?.reasons??null,avoid:w?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:_?1:0}):"",k=e.wizard!==void 0&&e.wizard.phase==="complete"&&C(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!k&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?ue(e.wizard):e.passScore,j=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${RM(I)}</div>`:"",oe=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':C(e.status)?e.status==="failed"?'<span class="sdlc-run-badge sdlc-run-badge-failed">Failed</span>':k&&g!==null&&!A?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",G=t?d:h?A?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',F=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${nr(Ye(me(e)))}</li>`:"",v>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${qo(v)} so far</li>`:""].filter(Jr=>Jr.length>0),Kr=F.length===0?"":`<ul class="sdlc-run-meta">${F.join("")}</ul>`,z=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,be=k?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,zt=k?"":j.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${be}</div>`:`<div class="sdlc-run-grid">${be}${j}</div>`,Fs=FM(e),c1=e.wizard!==void 0&&C(e.status)&&e.revisions.every(Jr=>Jr.roundNumber===0&&(Jr.judgement===void 0||Jr.judgement===null)),d1=Fs.length===0||c1?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${Fs}</div></section>`,u1=`<p class="sdlc-run-goal" title="${nr(e.goal.trim())}">${nr(or(e.goal))}</p>`,p1=k?`${c}${i}${s}${L}${a}`:`${c}${zt}${L}${s}${a}`,m1='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',g1=k?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${nr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${m1}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${oe}</div>${u1}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${G}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${nr(r.title)}</h2>${b}${u}${g1}</div></div>${Kr}${z}</header>${p1}</section>${d1}`}});var uN,pN=l(()=>{"use strict";R();ll();uN=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!tl({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:zr(e)}});var mN,gN=l(()=>{"use strict";R();gl();mN=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!el(t)?e:Go({...e,wizard:{...t,gate:null}})}});var fN,hN=l(()=>{"use strict";R();al();fN=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!rl(t.splitOptions))return e;let r=t.splitOptions[0];return Dr(e,r)}});var R4,Ko,Wm=l(()=>{"use strict";pN();gN();hN();Je();R4=e=>{let t=mN(e),r=uN(t);return fN(r)},Ko=(e,t)=>{let r=R4(t);return r!==t?(H(e,r),r):t}});var yN,Jo,Lm=l(()=>{"use strict";R();yN=e=>$o.indexOf(e),Jo=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||C(e.status)?$o.length:t.gate!==null?yN(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?yN(t.phase):null}});var SN,AN=l(()=>{"use strict";SN=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Yo,bN,PN=l(()=>{"use strict";R();AN();Yo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bN=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Xa(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Yo(SN(o))}</pre></div>`:"",s=Do(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=zo(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=Jp(c),g=i[c]??"",A=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Yo(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Yo(p)}">${Yo(A)}</label>
        ${h}
        <input class="input" type="text" id="${Yo(p)}" name="${Yo(p)}" value="${Yo(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var Mt,wN,vN=l(()=>{"use strict";R();PN();OP();Sm();FP();Mt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wN=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate,n=ue(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?`<ul class="sdlc-wizard-vars">${r.variables.map(L=>`<li><strong>{{${Mt(L.name)}}}</strong> \u2014 ${Mt(L.description)} (sample: ${Mt(L.sampleValue)})</li>`).join("")}</ul><pre class="sdlc-pre">${Mt(r.templatedPrompt)}</pre>`:"",a=o==="evaluate"?ms({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",d=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(L=>{let k=L.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',x=L.recommended?' <span class="sdlc-badge">Recommended</span>':"",I=r.selectedSplitOptionId===L.id||r.selectedSplitOptionId===null&&L.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label><input type="radio" name="wizardSplitOptionId" value="${Mt(L.id)}" required${I}> <strong>${Mt(L.title)}</strong>${k}${x}<br><span class="muted">${Mt(L.summary)}</span></label>${ym(L)}</li>`}).join("")}</ul>`:"",p=r.modules[r.currentModuleIndex],A=o==="optimize_modules"&&p?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",h=p?.title??"Module",y=p?.prompt??"",u=p?.status==="pending",S=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Mt(h)}</p>${u?bN({cycle:e,modulePrompt:y}):""}<p class="muted">Test run prompt preview: ${Mt(Qa(y,zo(r)))}</p>${p?.statistics===null||p?.statistics===void 0?"":`<p class="muted">Module stats: best ${p.statistics.bestScore??"\u2014"} / \u2265${n} (round ${p.statistics.bestRound??"\u2014"}).</p>`}${ms({cycle:e,interactive:!1,caption:u?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${h}\u201D (runner + judge).`})}`:"",b=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":u?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",f=lP(r),w=f===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${f}</p>`,v=t?.active===!0?" sdlc-wizard-gate-active":"",_=t?.active===!0?' id="prompt-optimizer-wizard-active-step"':"";return`<section class="card sdlc-wizard-gate${v}"${_}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${b}</p>
    ${w}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Mt(e.id)}">
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
    ${qM(e)}
  </section>`}});var x4,_N,WN=l(()=>{"use strict";R();x4=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_N=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||C(e.status))return"";if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>Suggesting module splits</h2>
    <p class="muted">The writer is proposing split options. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;if(t.phase==="optimize_modules"&&t.modules.length>0){let r=t.currentModuleIndex,n=t.modules[r]?.title??"Module";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 4 \u2014 Optimize modules</p>
    <h2>Module ${r+1} of ${t.modules.length}: ${x4(n)}</h2>
    <p class="muted">The runner executes this module in your folder, then the judge scores it. When the round finishes, the Step 4 review gate appears here. Until then, watch <strong>This run</strong> above.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`}return t.phase==="evaluate"?`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 2 \u2014 Evaluate</p>
    <h2>Scoring prompt revisions</h2>
    <p class="muted">The judge is revising and scoring prompt text. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`:t.phase==="generalize"?`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 1 \u2014 Generalize</p>
    <h2>Generalizing your prompt</h2>
    <p class="muted">The writer is building {{variables}}. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`:""}});var T4,I4,O4,LN,EN=l(()=>{"use strict";R();Lm();vN();WN();bm();T4={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},I4=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),O4=(e,t,r)=>`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${I4(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${gs(e,t)}</div>
</details>`,LN=e=>{let t=e.wizard;if(t===void 0)return"";let r=Jo(e);if(r===null)return"";let o=$o.slice(0,r).map((i,a)=>O4(e,`wizard-${a+1}`,T4[i])),n=t.gate!==null?wN(e,{active:!0}):_N(e),s=r>=$o.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var Em,VP=l(()=>{"use strict";EN();Sm();R();Em=e=>{if(e===null||e.wizard!==void 0&&C(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=LN(e),r=SM(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var bl,km,kN,qP,CN,RN,xN,TN,KP=l(()=>{"use strict";bl=m(require("node:fs")),km=m(require("node:path")),kN=e=>km.default.join(km.default.dirname(e),"prompt-optimizer-writer-ready.json"),qP=e=>{let t=kN(e);if(!bl.default.existsSync(t))return{};try{let r=JSON.parse(bl.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},CN=(e,t)=>{bl.default.mkdirSync(km.default.dirname(e),{recursive:!0}),bl.default.writeFileSync(kN(e),`${JSON.stringify(t,null,2)}
`)},RN=(e,t)=>qP(e)[t]?.message??null,xN=(e,t,r)=>{CN(e,{...qP(e),[t]:{message:r}})},TN=(e,t)=>{let r=qP(e);r[t]!==void 0&&CN(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var JP,Cm,Rm,IN,Te,Xo=l(()=>{"use strict";R();sl();gl();yl();fl();KP();Wm();Je();JP=new Set,Cm={atMs:0,ids:[]},Rm=async()=>{if(Date.now()-Cm.atMs<3e4)return Cm.ids;let e=await St({commands:ce({})});return Cm.atMs=Date.now(),Cm.ids=e.installedWriterIds,e.installedWriterIds},IN=async(e,t,r)=>{let o=K(e,t);if(o===null||r.aborted)return;let n=Ko(e,o);if(C(n.status)||n.status==="wizard_paused"||It(n))return;let s=await pM(n,a=>{TN(e,a)},r,a=>{K(e,t)?.status==="stopped"||r.aborted||H(e,a)});K(e,t)?.status==="stopped"||r.aborted||(H(e,s),C(s.status)||await IN(e,t,r))},Te=(e,t)=>{if(JP.has(t))return;let r=K(e,t);if(r===null)return;let o=Ko(e,r);if(C(o.status)||o.status==="wizard_paused"||It(o))return;JP.add(t);let n=_M(t);IN(e,t,n).finally(()=>{JP.delete(t),WM(t)})}});var Fr,Pl=l(()=>{"use strict";GP();Wm();VP();Xo();Fr=(e,t)=>{let r=Ko(e,t);return Te(e,r.id),`${_m(r)}${Em(r)}`}});var ON,MN,NN=l(()=>{"use strict";ON=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,MN=e=>e!==null&&e>0});var xm,jN,YP=l(()=>{"use strict";R();fl();xm=e=>(fs(e.id),{...e,status:"stopped",errorMessage:Lb,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null,phase:"complete"},updatedAt:new Date().toISOString()}),jN=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;fs(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var M4,DN,zN,$N=l(()=>{"use strict";R();gl();al();ll();Pl();Je();Xo();NN();DP();YP();M4="Pick a revision scored above 0 before continuing to Separate.",DN=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),zN=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=K(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=K(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Fr(e.storePath,d))};if(o==="wizard-stop-all"){let c=xm(s);return H(e.storePath,c),a(n),!0}if(o==="wizard-skip-module"){let c=jN(s);return H(e.storePath,c),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=EM(s,c);return H(e.storePath,d),d.status==="judging"&&Te(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",g=Yb(s.wizard,d,c);g=Xb(g,d),g={...g,pendingStepInstructions:p};let A={...s,status:"judging",errorMessage:null,wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return H(e.storePath,A),Te(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(A=>A.step==="generalize"),g=(s.errorMessage?.trim().length??0)>0&&!d?DN(s):Go({...s,wizard:{...s.wizard,gate:null}});return H(e.storePath,g),Te(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=ON(s,p??-1);if(!MN(g)){let h={...s,errorMessage:M4,updatedAt:new Date().toISOString()};return H(e.storePath,h),a(n),!0}let A=zr({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return H(e.storePath,A),Te(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=DN(s);return H(e.storePath,h),Te(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(h=>h.id===p);if(g===void 0){let h={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return H(e.storePath,h),a(n),!0}let A=Dr(s,g);return H(e.storePath,A),a(n),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(n),!0;let g=fP({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!g.ok){let u={...s,errorMessage:g.errorMessage,updatedAt:new Date().toISOString()};return H(e.storePath,u),a(n),!0}let A={...s.wizard,parameterValues:g.parameterValues};if(p.status==="pending"){let u=uM({...s,wizard:{...A,gate:null}},d);return H(e.storePath,u),Te(e.storePath,n),a(n),!0}let h=d+1;if(h>=s.wizard.modules.length){let u=pe(A),S={...s,status:u.terminalStatusSuggestion,wizard:{...A,gate:null,phase:"complete"},updatedAt:new Date().toISOString()};return H(e.storePath,S),a(n),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...A,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return H(e.storePath,y),a(n),!0}}return a(n),!0}});var N4,HN,j4,XP,D4,FN,UN=l(()=>{"use strict";xe();fl();YP();wP();om();yl();Je();N4="Add a score from 0 to 100 and the reason for it.",HN="Add a score from 1 to 100 and the reason for it.",j4="Write the next prompt.",XP="This step is not waiting for you.",D4=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},FN=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=K(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(H(e.storePath,xm(a)),{kind:"saved",cycleId:i}):LM(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=K(e.storePath,r);if(o===null||!It(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:XP};if(t==="manual-judge"){if(o.judgeModel!==T)return{kind:"invalid",cycle:o,errorMessage:XP};let i=D4(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?HN:N4};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:HN};let d=o.revisions.find(g=>g.roundNumber===o.currentRound)?.run?.tokenReview??"",p=nm(ul(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return H(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==T)return{kind:"invalid",cycle:o,errorMessage:XP};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:j4};let s=rm(o,n);return H(e.storePath,s),{kind:"saved",cycleId:o.id}}});var BN,GN=l(()=>{"use strict";BN=`<script>
(() => {
  let root = null;
  let pollTimer = null;

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
    if (active !== null) {
      active.scrollIntoView({ behavior: "smooth", block: "start" });
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
</script>`});var VN,qN=l(()=>{"use strict";VN=`<script>
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

  const focusActiveWizardStep = () => {
    const active = document.getElementById("prompt-optimizer-wizard-active-step");
    if (active !== null) {
      active.scrollIntoView({ behavior: "smooth", block: "start" });
      const focusTarget = active.querySelector(
        "textarea, input:not([type=hidden]), button, select",
      );
      if (focusTarget instanceof HTMLElement) focusTarget.focus({ preventScroll: true });
    }
  };

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

  focusActiveWizardStep();
})();
</script>`});var KN,JN=l(()=>{"use strict";KN=`<script>
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
</script>`});var YN,XN=l(()=>{"use strict";R();Xe();YN=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:Ye(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(ue(t.wizard)),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!C(t.status)}}});var ZN,QN=l(()=>{"use strict";R();Lm();ZN=e=>{if(e.wizard===void 0)return C(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let t=Jo(e);if(e.status==="wizard_paused"&&t!==null&&t<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${t+1} of 4`};if(C(e.status)){if(e.wizard.phase==="complete"){let r=pe(e.wizard),o=r.rows.reduce((s,i)=>i.bestScore===null?s:s===null?i.bestScore:Math.min(s,i.bestScore),null),n=o===null?"":` \xB7 lowest ${o}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Wizard \xB7 ${r.passedModuleCount}/${r.totalModules} modules${n}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}}return t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${t+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var ej,tj=l(()=>{"use strict";ej=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var sr,z4,$4,rj,oj=l(()=>{"use strict";QN();tj();Al();sr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),z4=e=>e.wizard===void 0?"classic":"wizard",$4=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${sr(t)}">`,o=ZN(e),n=ej(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${sr(o.badgeClass)}">${sr(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${sr(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${sr(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${z4(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${sr(e.id)}">${sr(or(e.goal))}</a><p class="muted">${sr(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${g}</div></li>`},rj=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(i=>$4(i,t)).join(""),o=Math.min(e.length,20),n=o===e.length?`History \xB7 ${e.length}`:`History \xB7 ${o} of ${e.length}`,s=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2><ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${sr(n)}</summary>${s}</details>`:s}});var ZP,Tm,nj,H4,F4,QP,sj,ew=l(()=>{"use strict";ZP=m(require("node:fs")),Tm=m(require("node:path"));Xe();nj=/^[a-z0-9-]+$/,H4=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},F4=(e,t)=>{if(!nj.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let g=H4(p[2]??"");p[1]==="name"&&g.length>0&&(o=g),p[1]==="description"&&(n=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},QP=e=>{let t=Uo(e);if(!t.ok)return[];let r=Tm.default.resolve(t.path,".cursor","skills"),o=[];try{o=ZP.default.readdirSync(r)}catch{return[]}return o.filter(n=>nj.test(n)).flatMap(n=>{let s=Tm.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${Tm.default.sep}`))return[];try{let i=F4(ZP.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},sj=(e,t)=>QP(e).find(r=>r.fileName===t)??null});var ij,aj=l(()=>{"use strict";ij={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var wl,U4,De,ys=l(()=>{"use strict";aj();fm();wl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),U4=e=>{let t=ij[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${wl(t.title)}" aria-describedby="${r}" aria-expanded="false">${ps}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${wl(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${wl(t.example)}</span></span></button>`},De=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${wl(r)}"`}>${wl(e)}</span>${U4(t)}</span>`});var lj,B4,cj,dj,uj=l(()=>{"use strict";ys();lj=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),B4=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),cj=e=>{if(e.length===0)return`<div class="field">${De("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${lj(r.fileName)}">${lj(r.fileName)}</option>`).join("");return`<div class="field">${De("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${B4(e)}</script>`},dj=`<script>
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
</script>`});var Ie,pj,mj,G4,gj,fj,hj,yj=l(()=>{"use strict";R();$P();xe();Al();Lm();Ie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pj=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",mj=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,G4=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},gj=e=>e===T?"You":re(e),fj=e=>{let t=G4(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":re(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Ie(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Ie(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Ie(gj(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Ie(gj(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Ie(r)}</dd></div>
    </dl>
  </details>`},hj=e=>{let t=e.wizard;if(t===void 0)return"";let r=or(e.goal),o=e.status==="wizard_paused",n=!C(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=wm(e),g=mj(t),A=g===null?"":pj(g),h=Jo(e),y=A.length===0?"":h===null||h>=4?` <strong>${Ie(A)}</strong>`:` <strong>${Ie(A)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Ie(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Ie(p.title)}${y}</p>
    <p class="muted">${Ie(p.detail)}</p>
    <div class="actions">
      ${fj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ie(e.id)}">Open this run</a>
    </div>
  </section>`}let s=mj(t),i=s===null?"Wizard":pj(s),a=Jo(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ie(r)}</h2>
    <p class="lede">Paused at <strong>${Ie(i)}</strong>${Ie(c)} (last updated ${Ie(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${fj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ie(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var vl,Sj,Aj=l(()=>{"use strict";ys();vl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Sj=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${vl(n.id)}"${n.id===e.runner?" selected":""}>${vl(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${vl(e.runner)}">Checking ${vl(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${De("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${De("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${vl(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var bj,Pj=l(()=>{"use strict";bj=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var Ss,wj,vj,_j,Wj,Lj=l(()=>{"use strict";ys();Ss=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wj=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${Ss(c.id)}"${c.id===r?" selected":""}>${Ss(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Ss(n)}</option>`;return`<div class="field">${De(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},vj=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Ss(t)}">Checking ${Ss(o)}\u2026</p>`},_j=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${De(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Ss(r)}</textarea><span class="muted">${o}</span></div></details>`,Wj=e=>{let t=`<div class="sdlc-writer">${wj("judge","Judge",e.judge,e.writers,"I'll score it")}${vj("judge",e.judge,e.writers)}${_j("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${wj("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${vj("improver",e.improver,e.writers)}${_j("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var _l,V4,q4,tw,Ej=l(()=>{"use strict";R();ys();_l=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),V4=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},q4=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,tw=e=>{let t=V4(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=Ga(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${De(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${_l(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${_l(e.inputId)}" class="sdlc-pass-range" type="range" name="${_l(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${_l(a)}"><span class="sdlc-pass-mark" style="left:${q4(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${_l(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var J4,ir,kj,Cj=l(()=>{"use strict";yl();GP();GN();qN();zP();JN();XN();oj();ew();uj();ys();VP();yj();Al();Aj();Pj();Lj();R();Ej();J4=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,ir=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kj=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${ir(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${ir(e.skillNotice??"")}</div>`,o=`${xM}${TM}`,n=e.resumableWizardCycle??null,s=n===null?"":hj(n),i=Em(e.cycle),a=e.cycle===null?"":_m(e.cycle),c=e.cycle!==null&&It(e.cycle),d=YN(e),p=J4(d.goal,d.prompt,e.canRun),g=Wj({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),A=Sj({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=`${tw({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${tw({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=Kb,u=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",S=e.cycle!==null&&C(e.cycle.status),b=d.running&&!S,f=S||b?"":" open",w=b?" sdlc-compose-run-focus":"",_=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${S?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,L=S?(()=>{let F=e.cycle!==null?or(e.cycle.goal):or(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${ir(F)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${_}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${_}</summary>`,k=S?" sdlc-compose-viewing-finished":"",x=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",I=c?"waiting":d.running?"running":"idle",j=d.running&&!c?' aria-busy="true"':"",oe=`<section class="card sdlc-compose${k}${w}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${f}>
        ${L}
        <div class="sdlc-compose-details-body">
      <p class="lede">${y} ${ir(e.modelNote)}</p>
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
            <input class="input" type="text" name="folder" value="${ir(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${cj(QP(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${De("Goal","goal")}
            <textarea class="input textarea" name="goal" rows="4" required>${ir(d.goal)}</textarea>
          </div>
          <div class="field">
            ${De("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${ir(d.prompt)}</textarea>
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${ir(d.passScore)}; Step 4 pass \u2265 ${ir(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${I}" data-can-run="${p?"true":"false"}"${j}${d.running?" disabled":""}>${x}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,G=`${""}${BN}${VN}${KN}${dj}`;return`${t}${r}${oe}${s}${a}${i}${o}${rj(e.history,e.cycle?.id??null)}${G}`}});var Wl,rw=l(()=>{"use strict";Cj();Wl=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:kj(t)}))}});var Rj,xj=l(()=>{"use strict";UN();Pl();rw();Je();Xo();Rj=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:FN({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=K(e.storePath,o.cycleId);return Te(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(Fr(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Wl(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:Rt(e.storePath),resumableWizardCycle:null}),!0)}});var Tj,Im,ow=l(()=>{"use strict";Tj=m(require("node:os"));R();Im=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??Tj.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var Ij,As,nw,Oj,Mj,Ll=l(()=>{"use strict";R();xe();_b();Ij=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,As=e=>{let t=OO(e),r=Bo(e).map(s=>({id:s,label:tm[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},nw=(e,t,r)=>t===T||t!==null&&e.writers.some(o=>o.id===t)?t:r,Oj=(e,t,r,o=null)=>({judge:nw(e,t,e.judge),improver:nw(e,r,e.improver),runner:nw(e,o,e.runner)}),Mj=e=>e===xp?{goal:Tp,prompt:Ip}:{goal:"",prompt:""}});var Om,Nj=l(()=>{"use strict";Om=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var jj,Mm,sw=l(()=>{"use strict";R();xe();Xe();Ll();Nj();jj=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=Om(o);return n.ok?String(n.passScore):String(r)},Mm=e=>{let t=Oj(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=jj(e.posted,"passScore",70),o=jj(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=(f,w)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:f,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:w,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a});if(e.posted===null)return d(e.defaultFolder??Fo,null);let p=e.posted.get("folder")??Fo;if(e.posted.get("intent")==="choose-folder"){let f=e.pickFolder();return d(f===null?p:Ye(f),null)}if((e.posted.get("intent")??"")!=="run")return d(p,null);let A=Ij(e.goal,e.prompt);if(A!==null)return d(p,A);let h=Om(e.posted.get("passScore")??r);if(!h.ok)return d(p,h.errorMessage);let y=Om(e.posted.get("modulePassScore")??o);if(!y.ok)return d(p,y.errorMessage);let u=MO(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(u===null)return d(p,"Choose a judge and an improver.");let S=Uo(p);if(!S.ok)return d(p,S.errorMessage);let b=NO(e.installedIds,c,u.judge);return b===null?d(p,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:u.judge,improver:u.improver,workingDirectory:S.path,passScore:h.passScore,modulePassScore:y.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:b,runnerInstructions:a}}});var bs,jm,Y4,iw,Dj,Nm,zj,X4,$j,aw,Z4,Q4,e3,lw,Hj,Fj,Uj=l(()=>{"use strict";bs=m(require("node:fs")),jm=m(require("node:path"));xe();Xe();Y4=["remember","choose-folder","run"],iw=()=>({folder:Fo,judge:"",improver:"",runner:""}),Dj=e=>jm.default.join(jm.default.dirname(e),"prompt-optimizer-preferences.json"),Nm=e=>typeof e=="string"?e:"",zj=e=>{let t=Dj(e);if(!bs.default.existsSync(t))return iw();try{let r=JSON.parse(bs.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return iw();let o=r,n=Nm(o.folder).trim();return{folder:n.length===0?Fo:n,judge:Nm(o.judge),improver:Nm(o.improver),runner:Nm(o.runner)}}catch{return iw()}},X4=(e,t)=>{let r=Dj(e);bs.default.mkdirSync(jm.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;bs.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),bs.default.renameSync(o,r)},$j=(e,t)=>e===T||Bo(t).some(r=>r===e),aw=(e,t,r)=>e===null?t:e.length===0?"":$j(e,r)?e:t,Z4=(e,t)=>{if(e===null)return t;let r=Uo(e);return r.ok?r.display:t},Q4=e=>{let t=zj(e.storePath),r={folder:Z4(e.folder,t.folder),judge:aw(e.judge,t.judge,e.installedIds),improver:aw(e.improver,t.improver,e.installedIds),runner:aw(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||X4(e.storePath,r)},e3=e=>{let t=Uo(e);return t.ok?t.display:Fo},lw=(e,t)=>$j(e,t)?e:"",Hj=e=>{let t=zj(e.storePath);return{selection:{...e.selection,judge:lw(t.judge,e.installedIds)||e.selection.judge,improver:lw(t.improver,e.installedIds)||e.selection.improver,runner:lw(t.runner,e.installedIds)||e.selection.runner},defaultFolder:e3(t.folder)}},Fj=e=>{let t=e.posted.get("intent")??"";if(!Y4.includes(t))return;let r=e.posted.get("folder");Q4({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var Bj,t3,r3,cw,o3,Dm,zm=l(()=>{"use strict";Bj=m(require("node:os"));xe();KP();dl();t3="Reply with the single word ok. Do not use tools.",r3=45e3,cw=async(e,t)=>{if(t===T)return{ok:!0,message:"You will do this step."};let r=RN(e,t);if(r!==null)return{ok:!0,message:r};let o=await ot({writerAgent:t,prompt:t3,workingDirectory:Bj.default.tmpdir(),timeoutMs:r3});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${re(t)} is ready.`;return xN(e,t,n),{ok:!0,message:n}},o3=e=>[...new Set(e.filter(t=>t.length>0))],Dm=async(e,t,r,o)=>{for(let n of o3([t,r,o??""])){let s=await cw(e,n);if(!s.ok)return s.message}return null}});var dw,Gj=l(()=>{"use strict";R();dw=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!C(r.status)&&!(t!==null&&r.id===t))return r;return null}});var Vj,qj=l(()=>{"use strict";ht();R();Pl();ow();sw();rw();Je();Xe();Uj();ew();zm();Gj();Wm();Xo();Vj=async e=>{let t=e.posted===null?Hj({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=Mm({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Ir("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(Fj({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Ye(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await Dm(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await Wl(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Ye(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:Rt(e.route.storePath),resumableWizardCycle:dw(Rt(e.route.storePath),null)});return}if(r.kind==="start"){let s=sj(r.workingDirectory,r.sourceSkillFile),i=Im({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,wizard:{...Ja(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(H(e.route.storePath,i),Te(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(Fr(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:K(e.route.storePath,e.cycleId);n!==null&&(n=Ko(e.route.storePath,n),Te(e.route.storePath,n.id)),await Wl(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:Rt(e.route.storePath),resumableWizardCycle:dw(Rt(e.route.storePath),n?.id??null)})}});var Kj,Jj=l(()=>{"use strict";Je();Kj=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";yO(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var Yj,Xj=l(()=>{"use strict";Yj=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var Zj,Qj=l(()=>{"use strict";TO();$N();xj();qj();Jj();Ll();Xj();Xo();Zj=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await Rm(),o=As(r),n=e.method==="POST"?Yj(e.request.headers["content-type"],await e.readBody(e.request)):null;if(zN({posted:n,storePath:e.storePath,response:e.response})||await Rj(e,n,o))return;let s=Mj(t.searchParams.get("example")),i=Kj({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=xO({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await Vj({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:RO(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var n3,eD,tD=l(()=>{"use strict";R();Je();n3=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",eD=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=K(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!C(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=aP({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${n3(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var rD,oD=l(()=>{"use strict";Pl();Je();rD=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:K(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":Fr(e.storePath,o)),!0}});var s3,nD,sD=l(()=>{"use strict";xe();zm();s3=["claude-cli","codex","cursor","antigravity"],nD=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===T||s3.includes(t)?await cw(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var iD,aD=l(()=>{"use strict";R();iD=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:qa,page:Ka,context:ns,installedWriters:e,post:{method:"POST",url:qa,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${qa}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var uw,lD=l(()=>{"use strict";R();hl();uw=e=>{let t=e.revisions[e.revisions.length-1]??null,r=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null}))),o=C(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:o,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:hs(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:ns,page:`${Ka}?cycle=${encodeURIComponent(e.id)}`}}});var Oe,i3,cD,dD,uD=l(()=>{"use strict";Oe=m(Ys());R();i3=(0,Oe.isType)({goal:Oe.isString,prompt:Oe.isString,workingDirectory:Oe.isString,judge:(0,Oe.isUndefinedOr)(Oe.isString),improver:(0,Oe.isUndefinedOr)(Oe.isString),passScore:(0,Oe.isUndefinedOr)(Oe.isNumber),maxRounds:(0,Oe.isUndefinedOr)(Oe.isNumber)}),cD=e=>{let t=e?.trim()??"";return t.length===0?null:t},dD=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return i3(t)?t.workingDirectory.trim().length===0?{ok:!1,error:Up}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:cD(t.judge),improver:cD(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:Up}}});var a3,pD,mD=l(()=>{"use strict";R();xe();sw();Ll();a3=e=>e.map(t=>t.id).join(", "),pD=e=>{let t=As(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===T||n===T)return{ok:!1,error:qb,installedWriters:t.writers};if(o===null||n===null){let a=a3(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o}),i=Mm({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var gD,fD=l(()=>{"use strict";R();ow();aD();lD();Ll();uD();mD();Je();gD=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=K(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:uw(c)}}let r=await e.handlers.readInstalledIds(),o=As(r);if(e.method==="GET")return{status:200,body:iD(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let n=dD(e.rawBody);if(!n.ok)return{status:400,body:{ok:!1,error:n.error,installedWriters:o.writers}};let s=pD({body:n.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver,s.runner);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:o.writers}};let a=Im({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds,wizard:Ja(s.prompt),runnerModel:s.runner});return H(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:uw(a)}}});var hD,yD=l(()=>{"use strict";Xo();zm();fD();hD=async e=>{let t=await gD({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:Rm,readWritersReady:Dm,startCycle:Te}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var l3,pw,SD=l(()=>{"use strict";jT();Qj();tD();oD();sD();yD();l3=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},pw=async e=>{let t=l3(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await hD(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:NT()})),!0):(await nD({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||eD({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||rD({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await Zj(e),!0)}});var AD=l(()=>{"use strict";SD()});var Zo,El,c3,d3,u3,p3,bD,PD=l(()=>{"use strict";Zo=m(require("node:fs")),El=m(require("node:path")),c3="prompt-optimizer-cycles.json",d3="prompt-optimizer-preferences.json",u3="prompt-sdlc-cycles.json",p3="prompt-sdlc-preferences.json",bD=e=>{let t=El.default.join(e,c3),r=El.default.join(e,u3);if(Zo.default.existsSync(t)||!Zo.default.existsSync(r))return t;try{Zo.default.renameSync(r,t)}catch{return r}let o=El.default.join(e,p3),n=El.default.join(e,d3);if(Zo.default.existsSync(o)&&!Zo.default.existsSync(n))try{Zo.default.renameSync(o,n)}catch{}return t}});var Ps,m3,mw,wD=l(()=>{"use strict";Ps=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),m3=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],mw=e=>{let t=m3.map(i=>`<option value="${Ps(i.value)}">${Ps(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Ps(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Ps(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Ps(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Ps(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var kl,WD,g3,LD,f3,h3,ED,Hm,vD,_D,y3,S3,ar,Cl,$m,A3,Fm,gw,b3,fw,kD,hw,CD,P3,w3,v3,RD,xD,TD,Rl=l(()=>{"use strict";kl=m(require("node:fs")),WD=m(require("node:path")),g3="estimate-history.ndjson",LD=100,f3=500,h3=2e4,ED=e=>WD.default.join(e,g3),Hm=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,f3),vD=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,h3),_D=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,y3=e=>({...e,estimateTokens:_D(e.estimateTokens),actualTokens:_D(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),S3=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},ar=e=>{let t=ED(e);return kl.default.existsSync(t)?kl.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return S3(n)?[y3(n)]:[]}catch{return[]}}):[]},Cl=(e,t)=>{kl.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;kl.default.writeFileSync(ED(e),r,"utf8")},$m=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),A3=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${$m(o.task)} | ${$m(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},Fm=e=>{let t=ar(e.reportsDir),r=Hm(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Cl(e.reportsDir,[...s,n])},gw=e=>{let t=ar(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?Hm(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Cl(e.reportsDir,[...i,s])},b3=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-LD),fw=e=>[...ar(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),kD=e=>{let t=ar(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=vD(e.input),n=vD(e.output),s=Hm(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Cl(e.reportsDir,[...c,a])},hw=(e,t)=>{let r=ar(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},CD=e=>({table:A3(b3(ar(e))),embedding:null}),P3=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},w3=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-LD),v3=e=>{let t=P3(w3(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${$m(s.task)} | ${$m(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},RD=e=>{let t=ar(e.reportsDir),r=Hm(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Cl(e.reportsDir,[...s,n])},xD=e=>{let t=ar(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Cl(e.reportsDir,[...s,n])},TD=e=>v3(ar(e))});var ID=l(()=>{"use strict";Rl()});var lr,yw,_3,Sw,W3,L3,Um,Bm,E3,Aw,OD=l(()=>{"use strict";ID();lr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yw=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},_3=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${yw(-r)} under`:`${yw(r)} over`},Sw=e=>e.toLocaleString("en-US"),W3=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${Sw(-r)} under`:`${Sw(r)} over`},L3=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},Um=e=>e===null?"\u2014":yw(e),Bm=e=>e===null?"\u2014":Sw(e),E3=`(function () {
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
})();`,Aw=e=>{let r=fw(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":_3(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":W3(n.estimateTokens,n.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${lr(L3(i))}</button></td>
        <td>${lr(c)}</td>
        <td>${Um(n.estimateSeconds)}</td>
        <td>${Um(n.actualSeconds)}</td>
        <td>${lr(d)}</td>
        <td>${Bm(n.estimateTokens)}</td>
        <td>${Bm(n.actualTokens)}</td>
        <td>${lr(p)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${lr(c)}</p>
        <h2>Input</h2>
        <pre>${lr(i)}</pre>
        <h2>Output</h2>
        <pre>${lr(a)}</pre>
        <p>Time: estimated ${Um(n.estimateSeconds)} \xB7 actual ${Um(n.actualSeconds)} \xB7 ${lr(d)}</p>
        <p>Tokens: estimated ${Bm(n.estimateTokens)} \xB7 actual ${Bm(n.actualTokens)} \xB7 ${lr(p)}</p>
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
            <button type="button" class="btn btn-secondary btn-compact" id="history-detail-close">Close</button>
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${E3}</script>`}
    </section>`}});var MD=l(()=>{"use strict";wD();OD()});var ws,k3,C3,bw,ND=l(()=>{"use strict";ws=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),k3=(e,t,r)=>{let o=ws(t),n=ws(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},C3=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${ws(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>k3(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${ws(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${ws(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${ws(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},bw=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(C3).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var jD=l(()=>{"use strict";ND()});var xl,DD,zD,Pw,ww,vw,$D=l(()=>{"use strict";xl=m(require("node:fs")),DD=m(require("node:path"));Ta();Wp();zD=(e,t,r)=>Xn({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,Pw=(e,t,r)=>{let o=zD(e,t,r);if(o===null)return[];if(!xl.default.existsSync(o))return[];let n=xl.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},ww=e=>{let t=zD(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Qt(e.entry.prompt),output:Qt(e.entry.output)};xl.default.mkdirSync(DD.default.dirname(t),{recursive:!0}),xl.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},vw=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var R3,x3,Tl,Gm,_w=l(()=>{"use strict";R3=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),x3=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Tl=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=R3(i.assistantOutput),d=c.length>0?`Assistant: ${x3(c,t)}`:null,p=[a,d].filter(g=>g!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},Gm=e=>{let t=e.userMessage.trim(),r=Tl({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Nt,Il,Ew,T3,I3,Ww,O3,kw,Vm,HD,FD,M3,vs,Cw,Lw,UD,N3,BD,_s,qm,Ol,j3,Ml,Rw,Km,Jm,GD=l(()=>{"use strict";Nt=m(require("node:fs")),Il=m(require("node:path")),Ew=require("node:crypto");_w();T3="writer-sessions",I3="active-index.json",Ww=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),O3=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",kw=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},Vm=e=>{let t=Il.default.join(e.installDir,T3);return Nt.default.mkdirSync(t,{recursive:!0}),t},HD=e=>Il.default.join(Vm(e),I3),FD=(e,t)=>Il.default.join(Vm(e),`${t}.canonical.json`),M3=(e,t)=>Il.default.join(Vm(e),`${t}.continuation.json`),vs=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,Cw=e=>{let t=HD(e);if(!Nt.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Nt.default.readFileSync(t,"utf8"));if(!Ww(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!Ww(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!O3(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},Lw=(e,t)=>{Nt.default.writeFileSync(HD(e),JSON.stringify(t,null,2))},UD=(e,t)=>{Nt.default.writeFileSync(FD(e,t.sessionId),JSON.stringify(t,null,2))},N3=(e,t)=>{Nt.default.writeFileSync(M3(e,t.sessionId),JSON.stringify(t,null,2))},BD=(e,t)=>{let r=Tl({turns:t.turns});N3(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},_s=(e,t)=>{let r=FD(e,t);if(!Nt.default.existsSync(r))return null;try{let o=JSON.parse(Nt.default.readFileSync(r,"utf8"));return!Ww(o)||typeof o.sessionId!="string"?null:o}catch{return null}},qm=(e,t=20)=>{let r=Vm(e),o=Nt.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=_s(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Ol=(e,t,r)=>{let o=kw(r);return Cw(e).entries.find(i=>vs(i)===vs({writerAgent:t,projectFolderPath:o}))?.sessionId??null},j3=(e,t,r,o)=>{let n=Cw(e),s=vs({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>vs(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];Lw(e,{entries:i})},Ml=(e,t,r)=>{let o=(0,Ew.randomUUID)(),n=new Date().toISOString(),s=kw(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return UD(e,i),BD(e,i),j3(e,t,s,o),o},Rw=(e,t,r)=>{let o=Ol(e,t,r);return o!==null?o:Ml(e,t,r)},Km=(e,t,r)=>{let o=kw(r),n=Cw(e);if(o===null&&r===void 0){Lw(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=vs({writerAgent:t,projectFolderPath:o});Lw(e,{entries:n.entries.filter(i=>vs(i)!==s)})},Jm=e=>{let t=Rw(e.layout,e.writerAgent,e.projectFolderPath),r=_s(e.layout,t);if(r===null)return;let o={id:(0,Ew.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};UD(e.layout,n),BD(e.layout,n)}});var D3,z3,Ym,xw,VD=l(()=>{"use strict";D3=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",z3=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},Ym=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",xw=e=>{let t=Ym(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=D3(r,e.userPromptCharacterCount),n=z3({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var Xm=l(()=>{"use strict";$D();GD();_w();VD()});var qD=l(()=>{"use strict";Vh()});var Fe,H3,F3,Tw,Iw,Ow,KD=l(()=>{"use strict";de();qD();Fe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),H3=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},F3=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=iu(o);return`value="${Fe(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${Fe(r)}"`},Tw=(e,t,r,o,n)=>{let s=by[t];return`<label class="field">
          <span class="field-label">${Fe(o)} API key \u2014 ${Fe(H3(e,t))} \xB7 <a class="field-link" href="${Fe(s.href)}" target="_blank" rel="noopener noreferrer">${Fe(s.label)}</a></span>
          <input class="input mono" type="password" name="${Fe(r)}" autocomplete="off" ${F3(e,t,n)} />
        </label>`},Iw=(e,t,r,o)=>{let n=qh(e[t]?.model),s=new Set(Zd[t].map(c=>c.value)),i=Zd[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${Fe(c.value)}"${d}>${Fe(c.label)}</option>`}).join(""),a=n!==yo&&!s.has(n)?`<option value="${Fe(n)}" selected>${Fe(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${Fe(o)}</span>
          <select class="input mono" name="${Fe(r)}">${i}${a}</select>
        </label>`},Ow=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Fe(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${Tw(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${Iw(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${Tw(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${Iw(e.secrets,"openai","openaiModel","OpenAI model")}
        ${Tw(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${Iw(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var JD=l(()=>{"use strict";KD()});var Zm,YD,XD=l(()=>{"use strict";Zm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),YD=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${Zm(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Console</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Console \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${Zm(s.name)}</strong> <span class="muted mono">(${Zm(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${Zm(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) from Agent Witch Live. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var U3,ZD,QD,ez=l(()=>{"use strict";U3=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,ZD=e=>e.kind==="folder",QD=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&ZD(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(ZD(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(U3)};return r(t)}});var tz,Mw,rz=l(()=>{"use strict";tz=m(require("node:path")),Mw=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Mw(r.children,t)}</ul>
            </details>
          </li>`;let o=tz.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var oz,Ur,B3,G3,Nl,V3,Nw,nz=l(()=>{"use strict";Rp();oz=m(require("node:path"));XD();ez();rz();Ur=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),B3=()=>`(() => {
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

})();`,G3=()=>`(() => {
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
})();`,Nl=e=>{let t=ja({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Console",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=YD({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${Ur(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ur(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':V3(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Ur(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Ur(s)}" />
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
    <script>${B3()}</script>
    <script>${G3()}</script>`;return`${t}${r}${o}${c}${d}`},V3=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=QD(a.items.map(A=>({...A,relativePath:typeof A.relativePath=="string"&&A.relativePath.length>0?A.relativePath:oz.default.relative(a.sourceRoot,A.sourcePath).replaceAll("\\","/")}))),p=Mw(d,Ur),g=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Ur(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Ur(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${g} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Ur(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},Nw=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??p??a,A=t.sets[i];if(A===void 0)continue;let h=a.length>0?a:A.proposedSlug,y=g.length>0?g:A.proposedName,u=r.has(i),S=A.items.map(b=>({id:b.id,kind:b.kind,title:b.title,sourcePath:b.sourcePath,include:u}));s.push({slug:h,name:y,items:S})}return s}});var sz=l(()=>{"use strict";nz()});var q3,jw,iz=l(()=>{"use strict";Tr();q3=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},jw=q3});var K3,az,lz=l(()=>{"use strict";Tr();K3=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},az=K3});var cz=l(()=>{"use strict"});var jl,J3,Dw,dz=l(()=>{"use strict";Rp();jl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),J3=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,Dw=e=>{let t=e.flashError?`<div class="alert-error">${jl(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${jl(e.flashMessage)}</div>`:"",r=ja({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Console",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Console, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${jl(J3(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${jl(n.name)}</strong>
                  <span class="muted mono">${jl(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Console for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var uz=l(()=>{"use strict";cz();ES();dz()});var Qm,pz=l(()=>{"use strict";Qm=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var mz,cr,zw=l(()=>{"use strict";mz=m(require("node:path"));qt();vt();V();de();Qe();cr=e=>{let t=$()?.layout.installDir??E();if(mz.default.basename(t)===eo)return Gt;let r=$(),o=r!==null?Ce(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):Gt}});var $w,gz=l(()=>{"use strict";Qe();zw();$w=async e=>{let t=ke(e.installDir),r=t?.bundleVersion??null,o=cr(t);try{let n=await Wn(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:uo(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var Hw,fz=l(()=>{"use strict";Hw=e=>!e});var Fw,Ws,Uw=l(()=>{"use strict";V();Fw=()=>`http://127.0.0.1:${Vf()}/update/run`,Ws=async e=>{try{let t=await fetch(Fw(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Y3,hz,Bw,yz=l(()=>{"use strict";V();te();Uw();Y3=()=>{Ut({launchAgentLabel:ne(),installDir:E()})},hz=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Bw=async()=>{Y3();let e=await Ws({force:!0});if(e.ok)return{ok:!0,message:hz(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:hz(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Qe(),qE)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var Gw=l(()=>{"use strict";yb();pz();zw();gz();fz();yz();Uw()});var Sz,Az=l(()=>{"use strict";Sz=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var bz,Pz,Vw,qw,wz=l(()=>{"use strict";bz=require("node:crypto"),Pz=m(require("node:fs"));ht();de();de();Az();Vw=!1,qw=async e=>{if(Vw)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!Sz(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=X({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&Pz.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,bz.randomUUID)();Vw=!0;try{if(await SS(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Tn({...r,workspace:n},e.writerAgent,t);return await na(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Vw=!1}}});var vz=l(()=>{"use strict";wz()});var nt,X3,_z,Wz,Kw,Jw,Yw,Xw,Zw,Qw,ev=l(()=>{"use strict";nt=require("node:crypto"),X3=Buffer.from("302a300506032b6570032100","hex"),_z=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},Wz=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,nt.createPublicKey)({key:Buffer.concat([X3,t]),format:"der",type:"spki"})},Kw=()=>{let{publicKey:e,privateKey:t}=(0,nt.generateKeyPairSync)("ed25519");return{publicKeyRaw:_z(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Jw=e=>(0,nt.createPrivateKey)(e),Yw=(e,t)=>(0,nt.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),Xw=(e,t,r)=>{try{let o=Wz(e);return(0,nt.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},Zw=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,Qw=()=>(0,nt.randomBytes)(32).toString("base64url")});var dr,eg,Lz,Z3,Q3,tg,tv,rv,Ez=l(()=>{"use strict";dr=m(require("node:fs")),eg=m(require("node:path"));ev();V();vt();Lz=e=>eg.default.join(e.installDir,br),Z3=(e,t)=>{if(e.profileEmail===null||t===Lz(e)||dr.default.existsSync(t))return;let r=Lz(e);dr.default.existsSync(r)&&(dr.default.mkdirSync(eg.default.dirname(t),{recursive:!0}),dr.default.renameSync(r,t))},Q3=e=>{if(!dr.default.existsSync(e))return null;try{let t=dr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},tg=e=>{let t=Ld(e);Z3(e,t);let r=Q3(t);if(r!==null)return r;let o=Kw();return dr.default.mkdirSync(eg.default.dirname(t),{recursive:!0}),dr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},tv=e=>{let t=tg(e.layout),r=Qw(),o=Zw({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=Jw(t.privateKeyPem),s=Yw(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},rv=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return Xw(e.serverPublicKey,t,e.serverAttestation)}});var ov=l(()=>{"use strict";Ez();ev()});var xz,Dl,iv,av,kz,e6,nv,rg,ae,Tz,t6,sv,r6,o6,lv,ge,We,ur,n6,Cz,Rz,zl,$l,Iz=l(()=>{"use strict";xz=m(require("node:http")),Dl=m(require("node:fs")),iv=m(require("node:path"));og();Ca();q0();J0();tT();Fn();BA();gb();TT();OT();AD();PD();MD();jD();Xm();JD();sz();vo();ht();Tr();iz();lz();uz();Gw();Qe();vz();de();ov();av=e=>TA(e)??"never",kz=48e3,e6=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,nv=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Ou(),reveal:t.reveal,installed:xr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),rg=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Console to load projects."}:Dn(t,e)},ae=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Tz=200,t6=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',sv=e=>{let t=e.trim().slice(0,Tz),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},r6=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ae(t)}</div>`,o6=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ae(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',lv={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},ge=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...lv}),e.end(JSON.stringify(r))},We=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},ur=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},n6=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=t6(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${ae(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=Hw(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Ra(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${ae(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ae(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ae(av(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ae(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},Cz=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},Rz=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,Tz)},zl=e=>{let t=iv.default.join(e.layout.installDir,"link-code.txt"),r=()=>ke(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:Qm(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let y=h.installVersion??r(),u=await i(),S=Pb(u),b=h.updateFlash??null,f=wb(b),w=r6(b,h.updateError??null);return Ab({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:cr(y),installBundleVersionLabel:Qm(y),prependBody:`${f}${w}${S}`,headerUpdateButtonHtml:bb(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await $w(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:sv("An update is already running.")}),h.end();return}c=!0;try{let u=await Bw(),S=u.ok?"/?update=ok":sv(u.message);h.writeHead(303,{Location:S}),h.end()}catch(u){let S=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:sv(S)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",S=o(),b=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:S.installVersion,body:`<section class="card">
      <h1>${ae(y)}</h1>
      <p>${ae(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(b)},g=()=>{if(Dl.default.existsSync(t))return Dl.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return Dl.default.writeFileSync(t,h,"utf8"),h},A=xz.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",S=h.method??"GET";if(S==="OPTIONS"){y.writeHead(204,lv),y.end();return}if(!await pw({method:S,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:bD(iv.default.dirname(e.layout.configPath)),readBody:ur,sendHtml:We,renderShell:n})){if(S==="GET"&&u==="/health"){let b=e.controllers.getStatus(),f=o();ge(y,200,{ok:!0,...b,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/status"){let b=o();ge(y,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/traffic"){ge(y,200,{entries:Ea(e.layout)});return}if(S==="DELETE"&&u==="/api/traffic"||S==="POST"&&u==="/api/traffic/clear"){if(MA(e.layout),S==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}ge(y,200,{ok:!0});return}if(S==="GET"&&u==="/api/trace"){ge(y,200,{entries:Pp(e.layout)});return}if(S==="DELETE"&&u==="/api/trace"||S==="POST"&&u==="/api/trace/clear"){if(DA(e.layout),S==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}ge(y,200,{ok:!0});return}if(S==="POST"&&u==="/api/errors/clear"){zA(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(S==="GET"&&u==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let w=await Qn({layout:e.layout,query:f,limit:20});ge(y,200,{chunks:w,query:f});return}ge(y,200,{chunks:Zn(e.layout).slice(-50).reverse()});return}if(S==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(S==="GET"&&u==="/api/update-status"){let b=await i();ge(y,200,{ok:!0,...b});return}if((S==="GET"||S==="POST")&&u==="/api/update"){await d(y);return}if(S==="GET"&&u==="/"){let b=e.controllers.getStatus(),f=o(),w=xr(e.layout),v=wp(e.layout.errorLogPath);We(y,await n({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:Cz(h.url??void 0),updateError:Rz(h.url??void 0),body:vb({wsConnected:b.wsConnected,lastHeartbeatAt:b.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:Zn(e.layout).length,trafficEntryCount:Ea(e.layout).length,wakeError:b.wakeError,errorLogByteSize:v.byteSize,errorLogExists:v.exists})}));return}if(S==="GET"&&u==="/task"){let b=e.controllers.getStatus(),f=o(),w=$(),v=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=v.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,L=v.searchParams.get("failed")==="1"?v.searchParams.get("error")?.trim()??"Task failed.":null,k=v.searchParams.get("runId");We(y,await n({title:"Task",activePath:"/task",installVersion:f.installVersion,body:mw({defaultWorkspace:w?.workspace??"",wsConnected:b.wsConnected,flashMessage:_,flashError:L,lastRunId:k})}));return}if(S==="POST"&&u==="/task/dispatch"){let b=await ur(h),f=new URLSearchParams(b),w=f.get("prompt")?.trim()??"",v=f.get("writerAgent")?.trim()??"claude-cli",_=f.get("projectFolder")?.trim()??"",L=await qw({prompt:w,writerAgent:v,..._.length>0?{projectFolderPath:_}:{}}),k=new URLSearchParams;L.ok?k.set("ok","1"):(k.set("failed","1"),L.errorMessage!==void 0&&k.set("error",L.errorMessage.slice(0,240))),L.agentRunId!==void 0&&k.set("runId",L.agentRunId),y.writeHead(303,{Location:`/task?${k.toString()}`}),y.end();return}if(S==="GET"&&u==="/writer-sessions"){let b=o(),f=qm(e.layout,12);We(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:b.installVersion,updateFlash:Cz(h.url??void 0),updateError:Rz(h.url??void 0),body:bw({sessions:f})}));return}if(S==="GET"&&u==="/errors"){let b=o(),f=wp(e.layout.errorLogPath);We(y,await n({title:"Errors",activePath:"/errors",installVersion:b.installVersion,body:HA({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(S==="GET"&&u==="/status"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),w=we(e.layout),v=w!==null?je(w,12e4):GA(f.lastHeartbeatAt,12e4),_=VA({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:v}),L=o();We(y,await n({title:"Status",activePath:"/status",installVersion:L.installVersion,body:`${n6({status:f,healthBadge:_,revived:b.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:L.installBundleVersion,installBundleUpdatedAt:L.installBundleUpdatedAt})}${JA({installDir:e.layout.installDir})}${KA({entries:Pp(e.layout)})}`}));return}if(S==="GET"&&u==="/traffic"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=Ea(e.layout),w=o(),v=f.map(k=>`<tr><td title="${ae(k.at)}">${ae(av(k.at))}</td><td>${ae(k.direction)}</td><td><code>${ae(k.type)}</code></td><td>${ae(k.summary)}</td><td>${ae(k.action??"")}</td></tr>`).join(""),_=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${v}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',L=b.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";We(y,await n({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${L}
              ${_}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(S==="GET"&&u==="/projects"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=cr(f.installVersion),v=await rg(e.layout),_=b.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":null,L=$(),k=L===null?null:X({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),x=k===null?{}:Object.fromEntries((await Promise.all(v.projects.map(async I=>{let j=await jw(k,I.id);return[I.id,j?.counts??null]}))).filter(I=>I[1]!==null));We(y,await n({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:Dw({projects:v.projects,compositionCountsByProjectId:x,cloudAppOrigin:w,syncMessage:v.message,syncOk:v.ok,flashMessage:null,flashError:_})}));return}if(S==="GET"&&u==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=$(),v=w===null?null:X({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),_=f.length>0&&v!==null?Ir():null;if(_===null||v===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(qe({projectFolderPath:_}),!await la(v,f,_)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(S==="GET"&&u==="/project"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=b.searchParams.get("id")?.trim()??"",w=o(),v=await rg(e.layout),_=Eo(v.projects,f);if(_===null){await p(y,"Project not found");return}let L=b.searchParams.get("linked")==="1"?b.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${b.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${b.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:b.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,k=b.searchParams.get("knowledgePromoted"),x=k!==null?`Marked ${k} lesson(s) as promoted in Agent Witch.`:null,I=b.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,j=b.searchParams.get("tab")?.trim()??"harness",oe=j==="workflows"||j==="agents"||j==="knowledge"?j:"harness",G=$(),F=G===null?null:X({wsUrl:G.wsUrl,pairingToken:G.pairingToken}),Kr=F===null?null:await jw(F,_.id),z=0;if(F!==null)try{let be=await fetch(`${F.appOrigin}/api/agent-witch/projects/${encodeURIComponent(_.id)}/knowledge`,{method:"GET",headers:{[$e]:F.pairingToken},signal:AbortSignal.timeout(1e4)});if(be.ok){let zt=await be.json();typeof zt=="object"&&zt!==null&&typeof zt.candidateCount=="number"&&(z=zt.candidateCount)}}catch{z=0}We(y,await n({title:_.name,activePath:"/projects",installVersion:w.installVersion,body:zn({project:_,installed:xr(e.layout),linkedSetSlugs:Cr(_.projectFolderPath),composition:Kr,knowledgeCandidateCount:z,activeTab:oe,flashMessage:L??x,flashError:I})}));return}if(S==="POST"&&u==="/projects/pull-bound-harness"){let b=await ur(h),f=await kS({rawBody:b,layout:e.layout});if(f.kind==="not_found"){await p(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let w=o();We(y,await n({title:f.title,activePath:"/projects",installVersion:w.installVersion,body:f.body}));return}if(S==="POST"&&u==="/projects/link-harness"){let b=await ur(h),f=new URLSearchParams(b),w=f.get("projectId")?.trim()??"",v=await rg(e.layout),_=Eo(v.projects,w);if(_===null){await p(y,"Project not found");return}let L=f.getAll("applySet").map(G=>String(G)),k=Ji({layout:e.layout,projectFolderPath:_.projectFolderPath,setSlugs:L});if(!k.ok){let G=o();We(y,await n({title:_.name,activePath:"/projects",installVersion:G.installVersion,body:zn({project:_,installed:xr(e.layout),linkedSetSlugs:Cr(_.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:k.errorMessage})}));return}let x=$(),I=x===null?null:X({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),j=I===null?!1:await ia(I,_.id,k.appliedSetSlugs),oe=new URLSearchParams({linked:"1",files:String(k.writtenFileCount),bindingsSynced:j?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(_.id)}&${oe.toString()}`}),y.end();return}if(S==="POST"&&u==="/project/knowledge/promote-all"){let b=await ur(h),w=new URLSearchParams(b).get("projectId")?.trim()??"",v=await rg(e.layout),_=Eo(v.projects,w);if(_===null){await p(y,"Project not found");return}let L=$(),k=L===null?null:X({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),x=k===null?{ok:!1,promotedCount:0}:await az(k,_.id),I=new URLSearchParams({tab:"knowledge",...x.ok?{knowledgePromoted:String(x.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(_.id)}&${I.toString()}`}),y.end();return}if(S==="GET"&&u==="/harness"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=Qi(e.layout),v=b.searchParams.get("submitted")==="1",_=v?b.searchParams.get("syncFailed")==="1"?`Local harness updated (${b.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:b.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${b.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":b.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:b.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,L=w?.scanRoots[0]??Ou(),k=e6(e.layout,{reveal:w,importQuery:b.searchParams.get("import")==="1",justSubmitted:v}),x=cr(f.installVersion);We(y,await n({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:Nl(nv(e.layout,{cloudAppOrigin:x,reveal:w,scanFolder:L,flashMessage:_,importSectionExpanded:k}))}));return}if(S==="POST"&&u==="/api/harness/pick-folder"){let b=Ir();if(b===null){ge(y,200,{cancelled:!0});return}ge(y,200,{path:b});return}if(S==="GET"&&u==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=Ki(f);if(w===null){ge(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let v=Dl.default.readFileSync(w,"utf8"),_=v.length>kz?`${v.slice(0,kz)}
\u2026 (truncated)`:v;ge(y,200,{content:_})}catch{ge(y,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&u==="/api/harness/reveal/add-project"){let b=await ur(h),f="";try{let _=JSON.parse(b);typeof _=="object"&&_!==null&&typeof _.projectPath=="string"&&(f=_.projectPath.trim())}catch{ge(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){ge(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=Qi(e.layout),v=lS({reveal:w,projectPath:f});if(v===null||v.sets.length===0){ge(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Du(e.layout,v),ge(y,200,{ok:!0,setCount:v.sets.length});return}if(S==="GET"&&u==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){ge(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;h.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...lv});let v=cS({scanRoot:f,response:y,shouldAbort:()=>w});Du(e.layout,v),y.end();return}if(S==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&u==="/harness/submit"){let b=Qi(e.layout);if(b===null){let x=o(),I=cr(x.installVersion);We(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Nl(nv(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await ur(h),w=new URLSearchParams(f),v=Nw(w,b),_=uS({layout:e.layout,sets:v});if(!_.ok){let x=o(),I=cr(x.installVersion);We(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Nl(nv(e.layout,{cloudAppOrigin:I,reveal:b,flashError:_.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}mS(e.layout);let k=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${_.writtenItemCount??0}${k}`}),y.end();return}if(S==="GET"&&u==="/writer-api"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),w=$()?.writerExecutionBackend??Re(void 0),v=Pe(e.layout.configPath),_=Wr(v),L=b.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,k=o();We(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:k.installVersion,body:Ow({writerExecutionBackend:w,secrets:_,flashMessage:L})}));return}if(S==="POST"&&u==="/writer-api"){let b=await ur(h),f=new URLSearchParams(b),w=f.get("writerExecutionBackend")?.trim()??"cli";Ay({configPath:e.layout.configPath,writerExecutionBackend:Re(w),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(S==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(S==="GET"&&u==="/history"){let b=o();We(y,await n({title:"History",activePath:"/history",installVersion:b.installVersion,body:Aw({reportsDir:e.layout.reportsDir})}));return}if(S==="GET"&&u==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=o(),v=rb({layout:e.layout}),_=sb(v),L=f.length>0?await Qn({layout:e.layout,query:f,limit:20}):Zn(e.layout).slice(-50).reverse(),k=L.map(I=>{let j=nb(v,I.id),oe=j>0?` \xB7 used in ${j} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ae(I.createdAt)}">${ae(av(I.createdAt))}${I.source?` \xB7 ${ae(I.source)}`:""}${oe}</div><pre>${ae(I.text)}</pre></article>`}).join(""),x=_.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${_.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${ae(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";We(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ae(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${x}${k}${o6(f,L.length)}`}));return}S==="POST"&&await ur(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return A.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),A.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Vt}`)}),A},$l=e=>tg(e).publicKeyRaw});var og=l(()=>{"use strict";x0();T0();Iz()});var Mz={};Pt(Mz,{runAgentWitchExternalLiveCli:()=>i6});var cv,Oz,s6,i6,Nz=l(()=>{"use strict";cv=m(require("node:fs")),Oz=m(require("node:path"));Fn();V();te();og();te();s6=e=>{let t=Oz.default.join(e,"link-code.txt");if(!cv.default.existsSync(t))return null;let r=cv.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},i6=()=>{Be("agent-witch-live");let e=E(),t=M(),r=s6(e),o=$l(t);zl({layout:t,controllers:{getStatus:()=>{let n=we(t);return{wsConnected:ya(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{so(e)}}})}});var pr=W((sEe,zz)=>{"use strict";var jz=["nodebuffer","arraybuffer","fragments"],Dz=typeof Blob<"u";Dz&&jz.push("blob");zz.exports={BINARY_TYPES:jz,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:Dz,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Hl=W((iEe,ng)=>{"use strict";var{EMPTY_BUFFER:a6}=pr(),dv=Buffer[Symbol.species];function l6(e,t){if(e.length===0)return a6;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new dv(r.buffer,r.byteOffset,o):r}function $z(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function Hz(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function c6(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function uv(e){if(uv.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new dv(e):ArrayBuffer.isView(e)?t=new dv(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),uv.readOnly=!1),t}ng.exports={concat:l6,mask:$z,toArrayBuffer:c6,toBuffer:uv,unmask:Hz};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");ng.exports.mask=function(t,r,o,n,s){s<48?$z(t,r,o,n,s):e.mask(t,r,o,n,s)},ng.exports.unmask=function(t,r){t.length<32?Hz(t,r):e.unmask(t,r)}}catch{}});var Bz=W((aEe,Uz)=>{"use strict";var Fz=Symbol("kDone"),pv=Symbol("kRun"),mv=class{constructor(t){this[Fz]=()=>{this.pending--,this[pv]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[pv]()}[pv](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[Fz])}}};Uz.exports=mv});var ks=W((lEe,Kz)=>{"use strict";var Fl=require("zlib"),Gz=Hl(),d6=Bz(),{kStatusCode:Vz}=pr(),u6=Buffer[Symbol.species],p6=Buffer.from([0,0,255,255]),ig=Symbol("permessage-deflate"),mr=Symbol("total-length"),Ls=Symbol("callback"),Br=Symbol("buffers"),Es=Symbol("error"),sg,gv=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!sg){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;sg=new d6(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Ls];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!n.client_max_window_bits));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){sg.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){sg.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Fl.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Fl.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[ig]=this,this._inflate[mr]=0,this._inflate[Br]=[],this._inflate.on("error",g6),this._inflate.on("data",qz)}this._inflate[Ls]=o,this._inflate.write(t),r&&this._inflate.write(p6),this._inflate.flush(()=>{let s=this._inflate[Es];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=Gz.concat(this._inflate[Br],this._inflate[mr]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[mr]=0,this._inflate[Br]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Fl.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Fl.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[mr]=0,this._deflate[Br]=[],this._deflate.on("data",m6)}this._deflate[Ls]=o,this._deflate.write(t),this._deflate.flush(Fl.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=Gz.concat(this._deflate[Br],this._deflate[mr]);r&&(s=new u6(s.buffer,s.byteOffset,s.length-4)),this._deflate[Ls]=null,this._deflate[mr]=0,this._deflate[Br]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};Kz.exports=gv;function m6(e){this[Br].push(e),this[mr]+=e.length}function qz(e){if(this[mr]+=e.length,this[ig]._maxPayload<1||this[mr]<=this[ig]._maxPayload){this[Br].push(e);return}this[Es]=new RangeError("Max payload size exceeded"),this[Es].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Es][Vz]=1009,this.removeListener("data",qz),this.reset()}function g6(e){if(this[ig]._inflate=null,this[Es]){this[Ls](this[Es]);return}e[Vz]=1007,this[Ls](e)}});var Cs=W((cEe,ag)=>{"use strict";var{isUtf8:Jz}=require("buffer"),{hasBlob:f6}=pr(),h6=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function y6(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function fv(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function S6(e){return f6&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}ag.exports={isBlob:S6,isValidStatusCode:y6,isValidUTF8:fv,tokenChars:h6};if(Jz)ag.exports.isValidUTF8=function(e){return e.length<24?fv(e):Jz(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");ag.exports.isValidUTF8=function(t){return t.length<32?fv(t):e(t)}}catch{}});var bv=W((dEe,r$)=>{"use strict";var{Writable:A6}=require("stream"),Yz=ks(),{BINARY_TYPES:b6,EMPTY_BUFFER:Xz,kStatusCode:P6,kWebSocket:w6}=pr(),{concat:hv,toArrayBuffer:v6,unmask:_6}=Hl(),{isValidStatusCode:W6,isValidUTF8:Zz}=Cs(),lg=Buffer[Symbol.species],st=0,Qz=1,e$=2,t$=3,yv=4,Sv=5,cg=6,Av=class extends A6{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||b6[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[w6]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=st}_write(t,r,o){if(this._opcode===8&&this._state==st)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new lg(o.buffer,o.byteOffset+t,o.length-t),new lg(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new lg(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case st:this.getInfo(t);break;case Qz:this.getPayloadLength16(t);break;case e$:this.getPayloadLength64(t);break;case t$:this.getMask();break;case yv:this.getData(t);break;case Sv:case cg:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[Yz.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=Qz:this._payloadLength===127?this._state=e$:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=t$:this._state=yv}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=yv}getData(t){let r=Xz;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&_6(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=Sv,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[Yz.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===st&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=st;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=hv(o,r):this._binaryType==="arraybuffer"?n=v6(hv(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=st):(this._state=cg,setImmediate(()=>{this.emit("message",n,!0),this._state=st,this.startLoop(t)}))}else{let n=hv(o,r);if(!this._skipUTF8Validation&&!Zz(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===Sv||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=st):(this._state=cg,setImmediate(()=>{this.emit("message",n,!1),this._state=st,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,Xz),this.end();else{let o=t.readUInt16BE(0);if(!W6(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new lg(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!Zz(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=st;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=st):(this._state=cg,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=st,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[P6]=n,i}};r$.exports=Av});var vv=W((pEe,s$)=>{"use strict";var{Duplex:uEe}=require("stream"),{randomFillSync:L6}=require("crypto"),{types:{isUint8Array:E6}}=require("util"),o$=ks(),{EMPTY_BUFFER:k6,kWebSocket:C6,NOOP:R6}=pr(),{isBlob:Rs,isValidStatusCode:x6}=Cs(),{mask:n$,toBuffer:Qo}=Hl(),it=Symbol("kByteLength"),T6=Buffer.alloc(4),dg=8*1024,en,xs=dg,bt=0,I6=1,O6=2,Pv=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=bt,this.onerror=R6,this[C6]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||T6,r.generateMask?r.generateMask(o):(xs===dg&&(en===void 0&&(en=Buffer.alloc(dg)),L6(en,0,dg),xs=0),o[0]=en[xs++],o[1]=en[xs++],o[2]=en[xs++],o[3]=en[xs++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[it]!==void 0?a=r[it]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(n$(t,o,d,s,a),[d]):(n$(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=k6;else{if(typeof t!="number"||!x6(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(E6(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[it]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==bt?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Rs(t)?(n=t.size,s=!1):(t=Qo(t),n=t.length,s=Qo.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[it]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Rs(t)?this._state!==bt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==bt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Rs(t)?(n=t.size,s=!1):(t=Qo(t),n=t.length,s=Qo.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[it]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Rs(t)?this._state!==bt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==bt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[o$.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Rs(t)?(a=t.size,c=!1):(t=Qo(t),a=t.length,c=Qo.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[it]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Rs(t)?this._state!==bt?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==bt?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[it],this._state=O6,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(wv,this,a,n);return}this._bufferedBytes-=o[it];let i=Qo(s);r?this.dispatch(i,r,o,n):(this._state=bt,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(M6,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[o$.extensionName];this._bufferedBytes+=o[it],this._state=I6,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");wv(this,c,n);return}this._bufferedBytes-=o[it],this._state=bt,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===bt&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][it],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][it],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};s$.exports=Pv;function wv(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function M6(e,t,r){wv(e,t,r),e.onerror(t)}});var g$=W((mEe,m$)=>{"use strict";var{kForOnEventAttribute:Ul,kListener:_v}=pr(),i$=Symbol("kCode"),a$=Symbol("kData"),l$=Symbol("kError"),c$=Symbol("kMessage"),d$=Symbol("kReason"),Ts=Symbol("kTarget"),u$=Symbol("kType"),p$=Symbol("kWasClean"),gr=class{constructor(t){this[Ts]=null,this[u$]=t}get target(){return this[Ts]}get type(){return this[u$]}};Object.defineProperty(gr.prototype,"target",{enumerable:!0});Object.defineProperty(gr.prototype,"type",{enumerable:!0});var tn=class extends gr{constructor(t,r={}){super(t),this[i$]=r.code===void 0?0:r.code,this[d$]=r.reason===void 0?"":r.reason,this[p$]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[i$]}get reason(){return this[d$]}get wasClean(){return this[p$]}};Object.defineProperty(tn.prototype,"code",{enumerable:!0});Object.defineProperty(tn.prototype,"reason",{enumerable:!0});Object.defineProperty(tn.prototype,"wasClean",{enumerable:!0});var Is=class extends gr{constructor(t,r={}){super(t),this[l$]=r.error===void 0?null:r.error,this[c$]=r.message===void 0?"":r.message}get error(){return this[l$]}get message(){return this[c$]}};Object.defineProperty(Is.prototype,"error",{enumerable:!0});Object.defineProperty(Is.prototype,"message",{enumerable:!0});var Bl=class extends gr{constructor(t,r={}){super(t),this[a$]=r.data===void 0?null:r.data}get data(){return this[a$]}};Object.defineProperty(Bl.prototype,"data",{enumerable:!0});var N6={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[Ul]&&n[_v]===t&&!n[Ul])return;let o;if(e==="message")o=function(s,i){let a=new Bl("message",{data:i?s:s.toString()});a[Ts]=this,ug(t,this,a)};else if(e==="close")o=function(s,i){let a=new tn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Ts]=this,ug(t,this,a)};else if(e==="error")o=function(s){let i=new Is("error",{error:s,message:s.message});i[Ts]=this,ug(t,this,i)};else if(e==="open")o=function(){let s=new gr("open");s[Ts]=this,ug(t,this,s)};else return;o[Ul]=!!r[Ul],o[_v]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[_v]===t&&!r[Ul]){this.removeListener(e,r);break}}};m$.exports={CloseEvent:tn,ErrorEvent:Is,Event:gr,EventTarget:N6,MessageEvent:Bl};function ug(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var pg=W((gEe,f$)=>{"use strict";var{tokenChars:Gl}=Cs();function jt(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function j6(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(p===-1&&Gl[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);d===44?(jt(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(p===-1&&Gl[d]===1)c===-1&&(c=g);else if(d===32||d===9)p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g),jt(r,e.slice(c,p),!0),d===44&&(jt(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,g),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(n){if(Gl[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:o||(o=!0),n=!1}else if(s)if(Gl[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,p=g;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(p===-1&&Gl[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))p===-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);o&&(h=h.replace(/\\/g,""),o=!1),jt(r,a,h),d===44&&(jt(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=g);let A=e.slice(c,p);return i===void 0?jt(t,A,r):(a===void 0?jt(r,A,!0):o?jt(r,a,A.replace(/\\/g,"")):jt(r,a,A),jt(t,i,r)),t}function D6(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}f$.exports={format:D6,parse:j6}});var hg=W((yEe,E$)=>{"use strict";var z6=require("events"),$6=require("https"),H6=require("http"),S$=require("net"),F6=require("tls"),{randomBytes:U6,createHash:B6}=require("crypto"),{Duplex:fEe,Readable:hEe}=require("stream"),{URL:Wv}=require("url"),Gr=ks(),G6=bv(),V6=vv(),{isBlob:q6}=Cs(),{BINARY_TYPES:h$,CLOSE_TIMEOUT:K6,EMPTY_BUFFER:mg,GUID:J6,kForOnEventAttribute:Lv,kListener:Y6,kStatusCode:X6,kWebSocket:Ae,NOOP:A$}=pr(),{EventTarget:{addEventListener:Z6,removeEventListener:Q6}}=g$(),{format:eJ,parse:tJ}=pg(),{toBuffer:rJ}=Hl(),b$=Symbol("kAborted"),Ev=[8,13],fr=["CONNECTING","OPEN","CLOSING","CLOSED"],oJ=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,J=class e extends z6{constructor(t,r,o){super(),this._binaryType=h$[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=mg,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,r=[]):r=[r]),P$(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){h$.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new G6({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new V6(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[Ae]=this,s[Ae]=this,t[Ae]=this,n.on("conclude",iJ),n.on("drain",aJ),n.on("error",lJ),n.on("message",cJ),n.on("ping",dJ),n.on("pong",uJ),s.onerror=pJ,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",_$),t.on("data",fg),t.on("end",W$),t.on("error",L$),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Gr.extensionName]&&this._extensions[Gr.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ze(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),v$(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){kv(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||mg,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){kv(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||mg,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){kv(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Gr.extensionName]||(n.compress=!1),this._sender.send(t||mg,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ze(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(J,"CONNECTING",{enumerable:!0,value:fr.indexOf("CONNECTING")});Object.defineProperty(J.prototype,"CONNECTING",{enumerable:!0,value:fr.indexOf("CONNECTING")});Object.defineProperty(J,"OPEN",{enumerable:!0,value:fr.indexOf("OPEN")});Object.defineProperty(J.prototype,"OPEN",{enumerable:!0,value:fr.indexOf("OPEN")});Object.defineProperty(J,"CLOSING",{enumerable:!0,value:fr.indexOf("CLOSING")});Object.defineProperty(J.prototype,"CLOSING",{enumerable:!0,value:fr.indexOf("CLOSING")});Object.defineProperty(J,"CLOSED",{enumerable:!0,value:fr.indexOf("CLOSED")});Object.defineProperty(J.prototype,"CLOSED",{enumerable:!0,value:fr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(J.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(J.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[Lv])return t[Y6];return null},set(t){for(let r of this.listeners(e))if(r[Lv]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[Lv]:!0})}})});J.prototype.addEventListener=Z6;J.prototype.removeEventListener=Q6;E$.exports=J;function P$(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:K6,protocolVersion:Ev[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!Ev.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${Ev.join(", ")})`);let s;if(t instanceof Wv)s=t;else try{s=new Wv(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;gg(e,u);return}let d=i?443:80,p=U6(16).toString("base64"),g=i?$6.request:H6.request,A=new Set,h;if(n.createConnection=n.createConnection||(i?sJ:nJ),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new Gr({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=eJ({[Gr.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!oJ.test(u)||A.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");A.add(u)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let u=n.path.split(":");n.socketPath=u[0],n.path=u[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let u=o&&o.headers;if(o={...o,headers:{}},u)for(let[S,b]of Object.entries(u))o.headers[S.toLowerCase()]=b}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,u||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=g(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=g(n);n.timeout&&y.on("timeout",()=>{Ze(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[b$]||(y=e._req=null,gg(e,u))}),y.on("response",u=>{let S=u.headers.location,b=u.statusCode;if(S&&n.followRedirects&&b>=300&&b<400){if(++e._redirects>n.maxRedirects){Ze(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new Wv(S,t)}catch{let v=new SyntaxError(`Invalid URL: ${S}`);gg(e,v);return}P$(e,f,r,o)}else e.emit("unexpected-response",y,u)||Ze(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,S,b)=>{if(e.emit("upgrade",u),e.readyState!==J.CONNECTING)return;y=e._req=null;let f=u.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){Ze(e,S,"Invalid Upgrade header");return}let w=B6("sha1").update(p+J6).digest("base64");if(u.headers["sec-websocket-accept"]!==w){Ze(e,S,"Invalid Sec-WebSocket-Accept header");return}let v=u.headers["sec-websocket-protocol"],_;if(v!==void 0?A.size?A.has(v)||(_="Server sent an invalid subprotocol"):_="Server sent a subprotocol but none was requested":A.size&&(_="Server sent no subprotocol"),_){Ze(e,S,_);return}v&&(e._protocol=v);let L=u.headers["sec-websocket-extensions"];if(L!==void 0){if(!h){Ze(e,S,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let k;try{k=tJ(L)}catch{Ze(e,S,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(k);if(x.length!==1||x[0]!==Gr.extensionName){Ze(e,S,"Server indicated an extension that was not requested");return}try{h.accept(k[Gr.extensionName])}catch{Ze(e,S,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Gr.extensionName]=h}e.setSocket(S,b,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function gg(e,t){e._readyState=J.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function nJ(e){return e.path=e.socketPath,S$.connect(e)}function sJ(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=S$.isIP(e.host)?"":e.host),F6.connect(e)}function Ze(e,t,r){e._readyState=J.CLOSING;let o=new Error(r);Error.captureStackTrace(o,Ze),t.setHeader?(t[b$]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(gg,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function kv(e,t,r){if(t){let o=q6(t)?t.size:rJ(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${fr[e.readyState]})`);process.nextTick(r,o)}}function iJ(e,t){let r=this[Ae];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[Ae]!==void 0&&(r._socket.removeListener("data",fg),process.nextTick(w$,r._socket),e===1005?r.close():r.close(e,t))}function aJ(){let e=this[Ae];e.isPaused||e._socket.resume()}function lJ(e){let t=this[Ae];t._socket[Ae]!==void 0&&(t._socket.removeListener("data",fg),process.nextTick(w$,t._socket),t.close(e[X6])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function y$(){this[Ae].emitClose()}function cJ(e,t){this[Ae].emit("message",e,t)}function dJ(e){let t=this[Ae];t._autoPong&&t.pong(e,!this._isServer,A$),t.emit("ping",e)}function uJ(e){this[Ae].emit("pong",e)}function w$(e){e.resume()}function pJ(e){let t=this[Ae];t.readyState!==J.CLOSED&&(t.readyState===J.OPEN&&(t._readyState=J.CLOSING,v$(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function v$(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function _$(){let e=this[Ae];if(this.removeListener("close",_$),this.removeListener("data",fg),this.removeListener("end",W$),e._readyState=J.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[Ae]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",y$),e._receiver.on("finish",y$))}function fg(e){this[Ae]._receiver.write(e)||this.pause()}function W$(){let e=this[Ae];e._readyState=J.CLOSING,e._receiver.end(),this.end()}function L$(){let e=this[Ae];this.removeListener("error",L$),this.on("error",A$),e&&(e._readyState=J.CLOSING,this.destroy())}});var x$=W((AEe,R$)=>{"use strict";var SEe=hg(),{Duplex:mJ}=require("stream");function k$(e){e.emit("close")}function gJ(){!this.destroyed&&this._writableState.finished&&this.destroy()}function C$(e){this.removeListener("error",C$),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function fJ(e,t){let r=!0,o=new mJ({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(k$,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(k$,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",gJ),o.on("error",C$),o}R$.exports=fJ});var Cv=W((bEe,T$)=>{"use strict";var{tokenChars:hJ}=Cs();function yJ(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&hJ[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}T$.exports={parse:yJ}});var z$=W((wEe,D$)=>{"use strict";var SJ=require("events"),yg=require("http"),{Duplex:PEe}=require("stream"),{createHash:AJ}=require("crypto"),I$=pg(),rn=ks(),bJ=Cv(),PJ=hg(),{CLOSE_TIMEOUT:wJ,GUID:vJ,kWebSocket:_J}=pr(),WJ=/^[+/0-9A-Za-z]{22}==$/,O$=0,M$=1,j$=2,Rv=class extends SJ{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:wJ,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:PJ,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=yg.createServer((o,n)=>{let s=yg.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=LJ(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=O$}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===j$){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Vl,this);return}if(t&&this.once("close",t),this._state!==M$)if(this._state=M$,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Vl,this):process.nextTick(Vl,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Vl(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",N$);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){on(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){on(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!WJ.test(s)){on(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){on(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){ql(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=bJ.parse(c)}catch{on(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&p!==void 0){let A=new rn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=I$.parse(p);h[rn.extensionName]&&(A.accept(h[rn.extensionName]),g[rn.extensionName]=A)}catch{on(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let A={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(A,(h,y,u,S)=>{if(!h)return ql(r,y||401,u,S);this.completeUpgrade(g,s,d,t,r,o,n)});return}if(!this.options.verifyClient(A))return ql(r,401)}this.completeUpgrade(g,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[_J])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>O$)return ql(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${AJ("sha1").update(r+vJ).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let g=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),p._protocol=g)}if(t[rn.extensionName]){let g=t[rn.extensionName].params,A=I$.format({[rn.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${A}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",N$),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Vl,this)})),a(p,n)}};D$.exports=Rv;function LJ(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function Vl(e){e._state=j$,e.emit("close")}function N$(){this.destroy()}function ql(e,t,r,o){r=r||yg.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${yg.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function on(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,on),e.emit("wsClientError",i,r,t)}else ql(r,o,n,s)}});var EJ,kJ,CJ,RJ,xJ,TJ,$$,IJ,Kl,H$=l(()=>{EJ=m(x$(),1),kJ=m(pg(),1),CJ=m(ks(),1),RJ=m(bv(),1),xJ=m(vv(),1),TJ=m(Cv(),1),$$=m(hg(),1),IJ=m(z$(),1),Kl=$$.default});var xv,Tv,Iv=l(()=>{"use strict";xv="AGENT_WITCH_EXTERNAL_BRIDGE",Tv="AGENT_WITCH_EXTERNAL_LIVE"});var Ov,F$=l(()=>{"use strict";Ov=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var OJ,Mv,U$=l(()=>{"use strict";Iv();F$();OJ=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",Mv=(e={})=>{let t=e.env??process.env,r=Ov(t[xv]),o=Ov(t[Tv]);return{mode:OJ(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var B$=l(()=>{"use strict";Iv()});var G$=l(()=>{"use strict";U$();B$()});var Nv=l(()=>{"use strict"});var hr,Jl=l(()=>{"use strict";hr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Os,nn,V$,NJ,jv,Dv,q$,K$,zv,J$,Yl,$v=l(()=>{"use strict";Os=m(require("node:fs")),nn=m(require("node:os")),V$=m(require("node:path"));Nv();Jl();NJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jv=(e=nn.default.hostname())=>V$.default.join(nn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),Dv=e=>{if(!Os.default.existsSync(e))return null;try{let t=JSON.parse(Os.default.readFileSync(e,"utf8"));return!NJ(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},q$=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},K$=(e,t)=>{Os.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},zv=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??jv(),o=Dv(r);if(o!==null&&o.pid!==process.pid&&hr(o.pid)&&q$(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:nn.default.hostname(),macOsUsername:nn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return K$(r,n),{ok:!0}},J$=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??jv(),o=Dv(r);return o!==null&&o.pid!==process.pid&&hr(o.pid)&&q$(o)?{ok:!1}:(K$(r,{hostname:nn.default.hostname(),macOsUsername:nn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},Yl=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??jv();Dv(r)?.pid===process.pid&&Os.default.existsSync(r)&&Os.default.unlinkSync(r)}});var Hv,Xl,jJ,DJ,zJ,$J,Fv,Y$=l(()=>{"use strict";Hv=require("node:child_process"),Xl=m(require("node:path"));Jl();Nd();jJ=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),DJ=(e,t)=>{if(jJ(e)||!/\bnode\b/.test(e))return!1;let r=Xl.default.resolve(t),o=Xl.default.join(r,"app",li),n=Xl.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===li||i==="agent-witch.ts")return e.includes(r);try{let a=Xl.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},zJ=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,Hv.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},$J=(e,t,r)=>{let o=zJ(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||DJ(d,t)&&n.push(c)}return n},Fv=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,Hv.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=$J(r,e.installDir,t),n=[];for(let s of o)if(hr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var Zl,Ql,X$,HJ,Uv,Z$=l(()=>{"use strict";Zl=m(require("node:fs")),Ql=m(require("node:path"));Ee();X$=(e,t)=>{!Zl.default.existsSync(e)||Zl.default.existsSync(t)||(Zl.default.mkdirSync(Ql.default.dirname(t),{recursive:!0}),Zl.default.renameSync(e,t))},HJ=e=>{if(e.profileEmail===null)return;let t=Ql.default.join(e.installDir,lt);X$(Ql.default.join(t,pn),e.mainLogPath),X$(Ql.default.join(t,mn),e.errorLogPath)},Uv=e=>{let t=M();e!==void 0&&t.installDir!==e||HJ(t)}});var Q$=l(()=>{"use strict";_a();Ap();Ap();!Ge()&&co(__agentWitchImportMetaUrl)&&(async()=>{Be("agent-witch-wake-server");let e=await xo(),t=Bt(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var eH=l(()=>{"use strict";Q$()});var tH=l(()=>{"use strict";da()});var Bv,rH=l(()=>{"use strict";Nv();eH();$v();tH();Bv=async(e={})=>{let t=e.skipInProcessBridge?null:await Sp();Xu();let r=setInterval(()=>{Xu()},6e4),o=setInterval(()=>{if(!J$().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var ec,Sg,BJ,oH,nH,Ag,sH,iH,Gv,aH,bg,lH=l(()=>{"use strict";ec=m(require("node:fs")),Sg=m(require("node:path")),BJ="pending-run-inputs.json",oH=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nH=e=>{let t=e.profileEmail?Sg.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Sg.default.join(t,BJ)},Ag=e=>{let t=nH(e);if(!ec.default.existsSync(t))return{};try{let r=JSON.parse(ec.default.readFileSync(t,"utf8"));return oH(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!oH(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},sH=(e,t)=>{let r=nH(e);ec.default.mkdirSync(Sg.default.dirname(r),{recursive:!0}),ec.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},iH=e=>Object.values(Ag(e)),Gv=(e,t)=>Ag(e)[t]!==void 0,aH=(e,t)=>{let r=Ag(e);r[t.agentRunId]=t,sH(e,r)},bg=(e,t)=>{let r=Ag(e);delete r[t],sH(e,r)}});var Pg=l(()=>{"use strict";de()});var cH=l(()=>{"use strict";de()});var wg=l(()=>{"use strict";de()});var vg=l(()=>{"use strict";de()});var tc=l(()=>{"use strict";de()});var GJ,VJ,rc,Vv=l(()=>{"use strict";mt();Pg();cH();wg();vg();tc();GJ={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},VJ={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},rc=e=>{if(!le(e.writerAgent))return"the selected writer";let t=Ve(e.writerAgent);if(Re(e.writerExecutionBackend)==="api"&&t!==null){let r=ze(Pe(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Ci(t,r.model);return`${VJ[t]} model ${o}`}}return GJ[e.writerAgent]}});var qJ,KJ,dH,uH,pH=l(()=>{"use strict";qJ=/"input_tokens"\s*:\s*(\d+)/,KJ=/"output_tokens"\s*:\s*(\d+)/,dH=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},uH=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=dH(qJ.exec(t)),o=dH(KJ.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var _g=l(()=>{"use strict";ht()});var oc,Wg,JJ,qv,mH,gH,fH,Kv,hH=l(()=>{"use strict";oc=m(require("node:fs")),Wg=m(require("node:path"));_g();JJ="run-completion-outbox.json",qv=e=>{let t=e.profileEmail?Wg.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Wg.default.join(t,JJ)},mH=e=>{let t=qv(e);if(!oc.default.existsSync(t))return[];try{let r=JSON.parse(oc.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},gH=(e,t)=>{oc.default.mkdirSync(Wg.default.dirname(qv(e)),{recursive:!0}),oc.default.writeFileSync(qv(e),JSON.stringify(t,null,2),"utf8")},fH=(e,t)=>{let r=[...mH(e).filter(o=>o.runId!==t.runId),t];gH(e,r)},Kv=async e=>{if(e.cloudApi===null)return;let t=mH(e.layout);if(t.length===0)return;let r=[];for(let o of t)await na(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);gH(e.layout,r)}});var yH=l(()=>{"use strict"});var Jv,nc,XJ,sn,SH=l(()=>{"use strict";yH();Jv=new Map,nc=e=>{let t=Jv.get(e);t!==void 0&&(clearInterval(t),Jv.delete(e))},XJ=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},sn=(e,t,r,o={})=>{nc(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){nc(t);return}let i=o.onTick?.()??{};XJ(e,t,n,i)};s(),Jv.set(t,setInterval(s,15e3))}});var AH=l(()=>{"use strict";ht()});var bH,PH=l(()=>{"use strict";AH();bH=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:et(t)}});var Yv,sc,yr,Xv,Dt,wH,Lg=l(()=>{"use strict";Yv=new Set,sc=new Map,yr=(e,t)=>{if(t.length===0)return;let r=sc.get(e)??[];r.push(t),sc.set(e,r)},Xv=e=>{Yv.add(e);let t=sc.get(e)??[];return sc.delete(e),t},Dt=e=>Yv.has(e),wH=e=>{Yv.delete(e),sc.delete(e)}});var Ms,vH,_H,WH=l(()=>{"use strict";Ms=m(require("node:path")),vH=require("node:url");lo();_H=()=>{if(Ge()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Ms.default.dirname(Ms.default.resolve(e)):Ms.default.dirname(Ms.default.resolve(__filename))}return Ms.default.dirname((0,vH.fileURLToPath)(__agentWitchImportMetaUrl))}});var LH,EH,kH,CH,Ue,Ns,RH,xH,js,Zv,Qv,e_,TH,t_,IH,Eg=l(()=>{"use strict";LH=require("node:crypto"),EH=m(require("node:fs")),kH=m(require("node:path")),CH=require("node:url");Jl();lo();WH();Ue=new Map,RH=async()=>{if(Ns!==void 0)return Ns;try{if(Ge()){let e=_H(),t=kH.default.join(e,"deps","node-pty","lib","index.js");if(EH.default.existsSync(t)){let r=await import((0,CH.pathToFileURL)(t).href);return Ns=r,r}}return Ns=await import("node-pty"),Ns}catch{return Ns=null,null}},xH=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},js=(e,t,r)=>{let o=Ue.get(e);if(o!==void 0){Ue.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},Zv=(e,t)=>{let r=Ue.get(e);return r===void 0?!1:(r.pty.write(t),!0)},Qv=(e,t,r)=>{let o=Ue.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},e_=e=>{for(let t of Ue.values())if(!(t.mode!=="agent"||t.runId!==e))return hr(t.pty.pid);return!1},TH=e=>{for(let[t,r]of Ue.entries())if(!(r.mode!=="agent"||r.runId!==e)){Ue.delete(t);try{r.pty.kill()}catch{}return!0}return!1},t_=async e=>{let t=await RH();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;Ue.get(e.shellSessionId)!==void 0&&js(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return Ue.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{xH(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{Ue.get(e.shellSessionId)?.pty===n&&(Ue.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},IH=async e=>{let t=e.shellSessionId??(0,LH.randomUUID)(),r=await RH();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return Ue.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{xH(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{Ue.get(t)?.pty===o&&(Ue.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var kg,OH,MH=l(()=>{"use strict";kg="[[AWAITING_INPUT]]",OH=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",kg,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var ic,NH,Cg=l(()=>{"use strict";MH();ic=e=>{let t=e.indexOf(kg);if(t<0)return null;let o=e.slice(t+kg.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},NH=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",OH].join(`
`)});var jH,DH=l(()=>{"use strict";Lg();Eg();Cg();jH=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(Dt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}yr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await IH({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=ic(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var zH,$H,HH,Sr,Rg=l(()=>{"use strict";zH=require("node:child_process"),$H=m(require("node:fs")),HH=m(require("node:path"));Nd();Sr=(e,t)=>{let r=HH.default.join(e,"app",mE,"ensure-writer.sh");return $H.default.existsSync(r)?new Promise((o,n)=>{let s=(0,zH.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{n(i)}),s.on("close",i=>{if(i===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var FH,an,lc,xg,r_,ac,Tg,Ig,o_,n_,ZJ,Ds,QJ,e7,s_,i_=l(()=>{"use strict";FH=require("node:child_process");mt();Rg();wg();Pg();tc();vg();an=new Map,lc=e=>e==="cursor"||e==="antigravity",xg=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",r_=e=>an.get(e)?.warmed===!0,ac=e=>{let t=an.get(e);an.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Tg=e=>an.get(e)?.conversationStarted===!0,Ig=e=>{let t=an.get(e);an.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},o_=e=>{an.delete(e)},n_=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",ZJ={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Ds=e=>`${ZJ[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,QJ=(e,t,r,o)=>new Promise(n=>{let s=Jd(t,r),i=[],a=(0,FH.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),e7=(e,t)=>{let r=Ds(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},s_=async e=>{if(!le(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Re(e.runConfig.writerExecutionBackend)==="api"){let r=Ve(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Pe(e.runConfig.layout.configPath);return ze(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),ac(e.writerAgent),{exitCode:0,output:Ds(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Sr(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}lc(e.writerAgent)&&ac(e.writerAgent);let t=await QJ(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?e7(e.writerAgent,t.output):Ds(e.writerAgent)}}});var ln,a_=l(()=>{"use strict";ln={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var UH,t7,r7,BH,o7,l_,GH=l(()=>{"use strict";a_();UH=/you(?:'|')ve hit your session limit/i,t7=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],r7=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,BH=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},o7=e=>{let t=r7.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},l_=e=>{let t=e.trim();if(t.length===0)return null;if(UH.test(t))return{code:ln.SESSION_LIMIT,resetHint:o7(t),matchedLine:BH(t,UH)};for(let r of t7)if(r.test(t))return{code:ln.PROVIDER_QUOTA,resetHint:null,matchedLine:BH(t,r)};return null}});var Og,Mg,c_,d_=l(()=>{"use strict";Og="[[AGENT_RUN_WRITER_EXECUTION]]",Mg="cli-writer-api-key-missing",c_="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var u_=l(()=>{"use strict";d_()});var VH=l(()=>{"use strict";u_()});var Ng=l(()=>{"use strict";a_();GH();d_();u_();VH()});var jg,qH=l(()=>{"use strict";jg={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var KH,JH=l(()=>{"use strict";KH="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var YH,XH=l(()=>{"use strict";Ng();JH();YH=e=>e.code===ln.SESSION_LIMIT?KH:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var ZH,QH=l(()=>{"use strict";Ng();qH();XH();ZH=e=>{let t=l_(e.output);return t!==null?{status:jg.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:YH(t)}:{status:e.exitCode===0?jg.COMPLETED:jg.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var p_,RCe,eF=l(()=>{"use strict";p_={OPEN:"open",APPROVAL:"approval"},RCe=p_.APPROVAL});var zs,Dg,tF,i7,rF,oF,nF,cc,m_,g_=l(()=>{"use strict";zs=m(require("node:fs")),Dg=m(require("node:path")),tF="runs",i7=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rF=e=>{let t=e.profileEmail!==null?Dg.default.join(e.installDir,"profiles",e.profileEmail,tF):Dg.default.join(e.installDir,tF);return zs.default.mkdirSync(t,{recursive:!0}),t},oF=(e,t)=>Dg.default.join(rF(e),`${t}.json`),nF=(e,t)=>{zs.default.writeFileSync(oF(e,t.id),JSON.stringify(t,null,2))},cc=(e,t)=>{let r=oF(e,t);if(!zs.default.existsSync(r))return null;try{let o=JSON.parse(zs.default.readFileSync(r,"utf8"));return!i7(o)||typeof o.id!="string"?null:o}catch{return null}},m_=e=>{let t=rF(e),r=zs.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=cc(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var a7,sF,iF=l(()=>{"use strict";QH();eF();g_();a7=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=ZH({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:p_.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},sF=(e,t)=>{let r=a7(t);return nF(e,r),r}});var aF=l(()=>{"use strict";Xm()});var lF,cF=l(()=>{"use strict";Ng();lF=()=>[Og,`agentRunWriterExecutionBackend=${Mg}`,`agentRunWriterExecutionReasonCode=${c_}`].join(`
`)});var Vr,zg=l(()=>{"use strict";Vr=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var f_,l7,c7,dF,uF=l(()=>{"use strict";f_=e=>e.toLocaleString("en-US"),l7=e=>e<.01?e.toFixed(4):e.toFixed(3),c7=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${l7(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${f_(e.inputTokens)} in / ${f_(e.outputTokens)} out (${f_(e.totalTokens)} total)`,t].join(`
`)},dF=(e,t)=>{if(t===void 0)return e;let r=c7(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var pF=l(()=>{"use strict";de()});var gF,dc,fe,h_,$g,mF,d7,u7,fF,hF,yF,uc,y_,S_,A_,SF,p7,at,pc,qr,AF,m7,g7,Hg,b_,P_,w_,bF=l(()=>{"use strict";gF=require("node:child_process");de();mt();lH();Rl();Vv();pH();Yd();hH();_g();SH();Jl();PH();Lg();Eg();Cg();DH();i_();iF();aF();cF();zg();uF();wn();pF();tc();mi();Cg();dc=new Map,fe=new Map,h_=new Set,$g=new Map,mF=e=>{e!==void 0&&!$g.has(e)&&$g.set(e,Date.now())},d7=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(Dt(t)){at(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}yr(t,n)},u7=(e,t,r,o,n)=>{if(!Py(e,n))return;let s=`${lF()}
`;d7(t,r,o,s);let i=fe.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},fF=130,hF=`

Stopped by user.`,yF=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:Vr(e)},uc=null,y_=e=>{uc=e},S_=(e,t)=>{if(uc===null)return;let r=hw(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||AS(uc,t,r)},A_=async e=>{await Kv({layout:e,cloudApi:uc})},SF=e=>{let t=dc.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:hr(t.pid)},p7=e=>ce({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),at=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},pc=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=yn(s),c=fe.get(r);if(a!==null&&c!==void 0){let d=vE(a),p=SF(r)||e_(r);d!==null&&!p&&qr(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return wE(a)}}),qr=(e,t,r,o,n,s,i,a)=>{let c=Cn(s,a),d=n,p=dF(c.output,c.llmUsage);if(r!==void 0){let A=$g.get(r);$g.delete(r),A!==void 0&&gw({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-A)/1e3))});let h=uH(c.llmUsage,p);h!==null&&xD({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&h_.has(r)&&(h_.delete(r),d=fF,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${hF}`:"Stopped by user.");let g=r!==void 0?hw(e.layout.reportsDir,r):null;if(r!==void 0){nc(r),ji(e.layout,r),Dt(r)&&(at(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),wH(r));let A=fe.get(r);kD({reportsDir:e.layout.reportsDir,agentRunId:r,input:Vr(i),output:p,...A!==void 0?{writerLabel:rc({writerAgent:A.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),A!==void 0&&Jm({layout:e.layout,writerAgent:A.writerAgent,projectFolderPath:A.projectFolderPath,userPrompt:A.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),sF(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),fH(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),Kv({layout:e.layout,cloudApi:uc}),fe.delete(r),dc.delete(r),bg(e.layout,r)}at(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),wi(e.layout)},AF=(e,t,r,o,n,s,i)=>{let a=fe.get(r),c=a?.accumulatedOutput??s;aH(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),sn(t,r,()=>Gv(e.layout,r),pc(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),at(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},m7=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(n===void 0||h.length===0)){if(Dt(n)){at(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}yr(n,h)}};if(n!==void 0){let h=fe.get(n);dc.set(n,t),fe.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),at(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),sn(r,n,()=>SF(n),pc(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let g=a==="claude-cli",A=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(g?A.push(y):(c.push(y),p(y)),d||n===void 0)return;let u=ic(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let S=fe.get(n),b=[S?.accumulatedOutput??"",u.partialOutput].filter(f=>f.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=b),dc.delete(n),AF(e,r,n,o,u.question,b,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;Ig(a);let y=n!==void 0?fe.get(n):void 0,u=g?Cn(A.join("")):{output:c.join("").trim(),llmUsage:void 0},S=g?c.join("").trim():"",b=[u.output.trim(),S].filter(w=>w.length>0).join(`
`);g&&u.output.trim().length>0&&p(u.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${b}`.trim():b;qr(e,r,n,o,h??-1,f,s,u.llmUsage)}),t.on("error",h=>{d||qr(e,r,n,o,-1,h.message,s)})},g7=(e,t,r,o,n,s,i,a,c)=>{let d=yF(r,c);s!==void 0&&(fe.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),at(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),sn(n,s,()=>fe.has(s),pc(e,n,s,o,i,a))),Ii(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(Dt(s)){at(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}yr(s,g)}}).then(g=>{Ig(t),qr(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let A=g instanceof Error?g.message:String(g);qr(e,n,s,o,-1,A,r)})},Hg=(e,t,r,o,n,s,i,a,c,d,p,g)=>{let A=yF(r,p);if(Pi(e.layout),So(e,t)){mF(s),g7(e,t,r,o,n,s,c,d,A);return}let h=Lt(t,r,p7(e),i);if(h===null){qr(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}mF(s);let y=bH({workspace:e.workspace,projectFolderPath:c}),u=()=>{let S=(0,gF.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:g??process.env});m7(e,S,n,o,s,r,A,t)};if(s===void 0){u();return}fe.set(s,{originalPrompt:r,userTranscriptPrompt:A,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:fe.get(s)?.accumulatedOutput??""}),u7(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&pi({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),sn(n,s,()=>fe.has(s),pc(e,n,s,o,c,d)),jH({socket:n,sendMessage:at,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:S=>{a!==void 0&&js(a,w=>{at(n,w)},o);let b=fe.get(s),f=[b?.accumulatedOutput??"",S.partialOutput].filter(w=>w.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=f),AF(e,n,s,o,S.question,f,r)},onFinished:(S,b)=>{Ig(t);let f=Cn(b),w=fe.get(s),v=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${f.output}`.trim():f.output;qr(e,n,s,o,S,v,r,f.llmUsage)}}).then(S=>{if(!S){u();return}sn(n,s,()=>e_(s),pc(e,n,s,o,c,d))}).catch(S=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",S instanceof Error?S.message:S),u()})},b_=(e,t,r,o)=>{bg(e.layout,t.agentRunId),t.shellSessionId!==void 0&&at(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=NH(t),s=fe.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;Hg(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},P_=(e,t)=>{for(let r of iH(e.layout))fe.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:Vr(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),sn(t,r.agentRunId,()=>Gv(e.layout,r.agentRunId),{awaitingInput:!0}),at(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},w_=(e,t,r,o)=>{let n=fe.get(r);if(n===void 0)return!1;h_.add(r),nc(r);let s=dc.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(TH(r))return!0;bg(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${hF}`:"Stopped by user.";return qr(e,t,r,o,fF,i,n.originalPrompt),!0}});var f7,v_,PF=l(()=>{"use strict";Hi();f7=()=>`http://127.0.0.1:${gt()}/restart`,v_=async()=>{try{let e=await fetch(f7(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var wF=l(()=>{"use strict";Ca()});var vF=l(()=>{"use strict";Gw()});var _F,WF=l(()=>{"use strict";_F=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var mc,h7,__,LF=l(()=>{"use strict";V();te();wF();nA();vF();WF();wn();mc=(e,t)=>{Or(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},h7=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(jh(),Nh)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},__=async e=>{let t=ke(e.layout.installDir)?.bundleVersion??null;if(!_F({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(pt(e.layout)){vi({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),mc(e.layout,{summary:r,action:"install-bundle-update-start"}),Ut({launchAgentLabel:ne(e.layout.installDir),installDir:e.layout.installDir});let o=await Ws({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),mc(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await h7();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),mc(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),mc(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),mc(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var y7,W_,EF=l(()=>{"use strict";y7=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),W_=e=>{if(!y7(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var L_,E_,kF=l(()=>{"use strict";DS();zS();L_=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=ua({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},E_=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Zt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var CF,S7,A7,b7,gc,RF=l(()=>{"use strict";CF=m(require("node:os"));Ee();S7="Default",A7=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),b7=e=>{let t=CF.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},gc=()=>{let e=M(),t=Wd(e),r=A7(S7);return`${b7(t)}/${r.length>0?r:"project"}`}});var xF=l(()=>{"use strict";Ca()});var TF,k_,IF=l(()=>{"use strict";xF();TF=!1,k_=e=>{TF||(TF=!0,process.on("uncaughtException",t=>{Io(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;Io(e,{kind:"crash",message:r,stack:o})}))}});var OF,P7,C_,MF=l(()=>{"use strict";OF=require("node:child_process");Rg();mt();wg();Pg();tc();vg();P7=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,OF.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},C_=async e=>{if(!le(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Re(e.runConfig.writerExecutionBackend)==="api"){let r=Ve(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Pe(e.layout.configPath),n=ze(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Sr(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await P7(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var R_,NF=l(()=>{"use strict";R_=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var jF,x_,DF=l(()=>{"use strict";jF=require("node:crypto"),x_=()=>(0,jF.randomUUID)()});var $s,zF,Fg=l(()=>{"use strict";$s="[[WORKING_ESTIMATE]]",zF=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",$s,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var $F,HF=l(()=>{"use strict";$F=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var w7,FF,UF=l(()=>{"use strict";Fg();w7=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,FF=e=>{if(!e.includes($s))return null;let t=null;for(let r of e.matchAll(w7)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var v7,T_,BF=l(()=>{"use strict";UF();v7=/^(\d{1,6})\b/,T_=e=>{let t=FF(e);if(t!==null)return t;let r=v7.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var _7,W7,L7,Ug,I_=l(()=>{"use strict";mt();La();_7="http://127.0.0.1:11434",W7=45e3,L7=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Ug=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||_7,o=t===void 0?(await St({commands:ce({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(W7)});return n.ok?L7(await n.json()):null}catch{return null}}});var O_,M_,N_,GF=l(()=>{"use strict";mi();Fg();zg();HF();BF();Rl();I_();O_=async e=>{let t=Vr(e.wrappedPrompt),r=CD(e.reportsDir);return{estimateOutput:await Ug(zF(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},M_=e=>{let t=T_(e.estimateOutput);t!==null&&Fm({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},N_=e=>{let t=T_(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=$F(t);return ui({reportKey:e.reportKey,agentRunId:e.agentRunId,status:_t.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),Fm({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var Bg,VF,j_=l(()=>{"use strict";Bg="[[WORKING_TOKEN_ESTIMATE]]",VF=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Bg,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var qF,E7,KF,JF=l(()=>{"use strict";j_();qF=/^(\d{1,8})\b/,E7=e=>{let t=e.indexOf(Bg);if(t<0)return null;let r=e.slice(t+Bg.length).trim(),o=qF.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},KF=e=>{let t=E7(e);if(t!==null)return t;let r=qF.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var D_,z_,YF=l(()=>{"use strict";j_();zg();JF();Rl();I_();D_=async e=>{let t=Vr(e.wrappedPrompt),r=TD(e.reportsDir);return{estimateOutput:await Ug(VF(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},z_=e=>{let t=KF(e.estimateOutput);return t===null?null:(RD({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var XF=l(()=>{"use strict";$v();Y$();Z$();rH();Hi();bF();Rg();mt();g_();Lg();PF();qS();LF();wn();EF();kF();_g();RF();IF();MF();jd();NF();DF();Fg();mi();GF();YF();Vv();La();Eg();i_()});var ZF={};Pt(ZF,{buildContinuationPromptWithContext:()=>R7});var k7,C7,R7,QF=l(()=>{"use strict";k7=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,C7=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),R7=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=C7(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${k7(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var e1={};Pt(e1,{readHarnessExportSets:()=>T7});var fc,$_,Gg,x7,T7,t1=l(()=>{"use strict";fc=m(require("node:fs")),$_=m(require("node:path"));Ee();Gg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),x7=e=>{if(!fc.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(fc.default.readFileSync(e.harnessManifestPath,"utf8"));if(Gg(t))return t}catch{return null}return null},T7=(e,t)=>{let r=M(t),o=x7(r);if(o===null)return[];let n=Gg(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!Gg(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!Gg(p))continue;let g=typeof p.path=="string"?p.path:void 0,A=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(g===void 0||A.length===0||h.length===0||y.length===0)continue;let u=g.startsWith("shared/")?$_.default.join(r.harnessRootDir,g):$_.default.join(r.harnessSetsDir,i,g);fc.default.existsSync(u)&&d.push({id:A,kind:h,title:y,content:fc.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var q_,F_,Hs,r1,I7,o1,n1,H_,s1,U_,B_,G_,Y,B,V_,O7,hc,M7,N7,j7,D7,z7,$7,H7,F7,yc,i1=l(()=>{"use strict";q_=require("node:child_process"),F_=m(require("node:fs")),Hs=m(require("node:os"));H$();V();te();Fn();ov();G$();de();Qe();Ca();gb();og();Xm();ht();vo();fA();qt();XF();r1=3e4,I7=3e4,o1=new Map,n1=new Map,H_=new Map,s1=new Map,U_=new Map,B_=new Map,G_=new Map,Y=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),B=(e,t,r)=>{e.readyState===Kl.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Or(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),bp(r,"out",t)))},V_=e=>e,O7=e=>{if(!F_.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(F_.default.readFileSync(e.harnessManifestPath,"utf8"));if(Y(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},hc=(e,t)=>{let r=O7(t);r!==null&&B(e,{type:"harness.manifest.report",payload:{hostname:Hs.default.hostname(),manifest:r}})},M7=async(e,t,r,o,n,s,i=!1,a,c,d,p,g)=>{let A=g?.trim()??"";if(!le(t)){B(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=rc({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await St({commands:ce({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?O_({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,S=s!==void 0?D_({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,b=lc(t)&&!r_(t);if(b){try{await Sr(e.layout.installDir,t)}catch(z){let be=z instanceof Error?z.message:String(z);B(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${be}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}ac(t)}else if(!lc(t))try{await Sr(e.layout.installDir,t)}catch(z){let be=z instanceof Error?z.message:String(z);B(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${be}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Mi(d,gc,g);if(f===null){B(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}qe({projectFolderPath:f,...A.length>0?{projectId:A}:{}}),i||Ml(e.layout,t,f);let w=Ym({sessionContinuation:i,supportsWriterSessionContinuation:xg(t),isWriterConversationStarted:Tg(t)}),v=i&&w==="first"?Ol(e.layout,t,f):null,_=v!==null?_s(e.layout,v):null,L=_!==null&&_.turns.length>0,k=xw({sessionContinuation:i,supportsWriterSessionContinuation:xg(t),isWriterConversationStarted:Tg(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:L,userPromptCharacterCount:r.length}),x=r;if(k.continuationStrategy==="source_run_seed"){let z=typeof c=="string"&&c.length>0?cc(e.layout,c):null;if(z!==null){let{buildContinuationPromptWithContext:be}=await Promise.resolve().then(()=>(QF(),ZF));x=be({priorPrompt:z.prompt,priorOutput:z.resultOutput??"",userMessage:r})}}else k.continuationStrategy==="transcript_seed"&&_!==null&&_.turns.length>0&&(x=Gm({priorTurns:_.turns,userMessage:r}));let I=k.ragLimit>0?await Qn({layout:e.layout,query:x,limit:k.ragLimit,minScore:k.ragMinScore,projectFolderPath:f,...A.length>0?{projectId:A}:{}}):[],j=k.ragLimit>0&&f.trim().length>0?await pb({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:f,...A.length>0?{projectId:A}:{}}):[],oe=k.injectMemory?Pw(e.layout,f,A.length>0?A:void 0):[],G=`${vw(oe,k.memoryEntryLimit)}${cb(I)}${mb(j)}${x}`,F=p?.trim()??(s!==void 0&&f.trim().length>0?x_():void 0);if(s!==void 0&&F!==void 0&&F.length>0&&f.trim().length>0){pi({reportKey:F,agentRunId:s,userSummary:"Working on your Mac\u2026"});let z=G;u!==null&&u.then(be=>{if(be===null)return;let zt=N_({estimateOutput:be.estimateOutput??"",reportKey:F,agentRunId:s,reportsDir:e.layout.reportsDir,task:be.task,writerLabel:be.writerLabel,embedding:be.embedding});if(zt.estimateSeconds===null)return;S_(e.layout.reportsDir,s);let Fs=`${$s}
${zt.estimateSeconds}
`;if(Dt(s)){B(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Fs},requestId:o});return}yr(s,Fs)}).catch(()=>{}),G=R_(z),G=lh(G,{agentRunId:s,reportKey:F,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then(z=>{z!==null&&M_({estimateOutput:z.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:z.task,writerLabel:z.writerLabel,embedding:z.embedding})}).catch(()=>{}),s!==void 0&&S!==null&&S.then(z=>{z!==null&&z_({estimateOutput:z.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:z.task,writerLabel:z.writerLabel})}).catch(()=>{});let Kr=s!==void 0&&G_.get(s)===!0;if(s!==void 0&&f.trim().length>0){let z=await Ju(f);B_.set(s,z),F!==void 0&&F.length>0&&U_.set(s,F)}Hg(e,t,G,o,V_(n),s,{sessionTurn:k.sessionTurn},a,f,F,r,fy(e.layout,s,Kr)),b&&s!==void 0&&B(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:n_(t)},requestId:o})},N7=async(e,t,r,o,n)=>{let s=(i,a)=>{B(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await s_({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ce({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,B(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=le(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Ds(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},j7=(e,t,r)=>new Promise(o=>{if(!le(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Lt(t,r,ce({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,q_.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),D7=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;B(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=kt(t.bundle),s=Y(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=Ce(e.wsUrl)??Gt,g=await tS({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return B(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=wo({bundle:i,layout:e.layout});return B(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&hc(o,e.layout),!0},z7=async(e,t,r,o)=>{if(await D7(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(B(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){B(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!le(n)){B(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}Pi(e.layout);let i=await(async()=>{try{await Sr(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return j7(e,n,s)})().finally(()=>{wi(e.layout)});B(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),hc(o,e.layout)},$7=e=>{let t=1e3*2**e;return Math.min(I7,t)},H7=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(pt(e.layout)){Ch(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,v_().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(u,S="system.ack")=>{if(!t.selfUpdateInFlight){if(pt(e.layout)){vi({layout:e.layout,remoteBundleVersion:u,trigger:S}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${S}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,__({layout:e.layout,remoteBundleVersion:u,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let u=we(e.layout);u!==null&&je(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===Kl.OPEN||u.readyState===Kl.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,r1)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=$7(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},g=u=>{s();let S=()=>{let b=yi(e.layout.installDir),f=gt();B(u,{type:"agent.heartbeat",payload:{hostname:Hs.default.hostname(),macOsUsername:Hs.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:b}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,r1)},A=(u,S)=>{if(typeof u.type!="string")return;if(gA(u)){t.stopped=!0,s(),a(),c(),dA({layout:e.layout}).finally(()=>{Yl(),process.exit(0)});return}Or(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),bp(e.layout,"in",u);let b=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&Y(u.payload)){let f=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",w=typeof u.payload.origin=="string"?u.payload.origin:"",v=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",_=typeof u.payload.challenge=="string"?u.payload.challenge:"",L=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!rv({serverPublicKey:f,origin:w,devicePublicKey:v,challenge:_,serverAttestation:L})){t.wakeError="Server attestation verification failed",Or(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&Y(u.payload)){let f=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";Or(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),C_({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{B(S,{type:"writer.status",payload:w},e.layout)})}if(u.type==="install.bundle.update"&&Y(u.payload)){let f=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";f.length>0&&o(f,"install.bundle.update")}if(u.type==="system.ack"){rp(e.layout,{wsUrl:e.wsUrl});let f=Y(u.payload)?u.payload:null,w=W_(f);w!==null&&o(w)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&Y(u.payload)&&L_(u.payload),u.type==="automations.run"&&Y(u.payload)&&E_(u.payload),u.type==="terminal.stream.accepted"&&Y(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"";if(f.length>0){let w=Xv(f);for(let v of w)B(S,{type:"terminal.stream.chunk",payload:{runId:f,chunk:v},requestId:b})}}if(u.type==="agent.agentRun.list"&&B(S,{type:"dashboard.agentRun.list.result",payload:{runs:m_(e.layout)},requestId:b}),u.type==="agent.agentRun.get"&&Y(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"",w=f.length>0?cc(e.layout,f):null;B(S,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:b})}if(u.type==="command.claude.run"&&Y(u.payload)){let f=u.payload.prompt,w=typeof u.payload.writerAgent=="string"&&le(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",v=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,_=u.payload.sessionContinuation===!0,L=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,k=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,x=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=Mi(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,gc,x),j=ly(u.payload.compositionSnapshot),oe=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${_?"continue":"first"})\u2026`),I===null){B(S,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...v!==void 0?{agentRunId:v}:{}},requestId:b});return}if(j!==null){let G=dy(e.layout,j);if(G!==null){B(S,{type:"command.claude.result",payload:{exitCode:-1,output:G,...v!==void 0?{agentRunId:v}:{}},requestId:b});return}if(v!==void 0){let F=py(e.layout,v,j);if(!F.ok){B(S,{type:"command.claude.result",payload:{exitCode:-1,output:F.errorMessage,...v!==void 0?{agentRunId:v}:{}},requestId:b});return}G_.set(v,j.entries.some(Kr=>Kr.scope==="run"))}}v!==void 0&&k!==void 0&&o1.set(v,k),v!==void 0&&(n1.set(v,I),x!==void 0&&x.trim().length>0&&H_.set(v,x.trim()),s1.set(v,f.trim()),qe({projectFolderPath:I,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),M7(e,w,f.trim(),b,S,v,_,k,L,I,oe,x)}}if(u.type==="shell.session.open"&&Y(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:120,v=typeof u.payload.rows=="number"?u.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),t_({shellSessionId:f,cwd:e.workspace,cols:w,rows:v,send:_=>{B(S,_)},requestId:b}))}if(u.type==="shell.session.close"&&Y(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";f.length>0&&js(f,w=>{B(S,w)},b)}if(u.type==="shell.input"&&Y(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.data=="string"?u.payload.data:"";f.length>0&&w.length>0&&Zv(f,w)}if(u.type==="shell.resize"&&Y(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:0,v=typeof u.payload.rows=="number"?u.payload.rows:0;f.length>0&&w>0&&v>0&&Qv(f,w,v)}if(u.type==="command.writer.session.end"&&Y(u.payload)){let f=u.payload.writerAgent;typeof f=="string"&&le(f)&&(o_(f),Km(e.layout,f))}if(u.type==="command.writer.session.start"&&Y(u.payload)){let f=u.payload.writerAgent,w=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof f=="string"&&le(f)&&w.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),N7(e,f,w,b,S))}if(u.type==="command.claude.stop"&&Y(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),w_(e,V_(S),f,b))}if(u.type==="command.claude.input_respond"&&Y(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",w=typeof u.payload.response=="string"?u.payload.response.trim():"",v=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",_=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",L=typeof u.payload.question=="string"?u.payload.question:"";f.length>0&&w.length>0&&v.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),b_(e,{agentRunId:f,originalPrompt:v,partialOutput:_,question:L,response:w,shellSessionId:o1.get(f)},b,V_(S)))}if(u.type==="dispatch.approval.required"&&Y(u.payload)){let f=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",w=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${w}`),process.platform==="darwin"&&(0,q_.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&Y(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),z7(e,u.payload,b,S)),u.type==="harness.export.request"&&Y(u.payload)){let f=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",w=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,v=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(_=>typeof _=="string"):[];f.length>0&&v.length>0&&(async()=>{let{readHarnessExportSets:_}=await Promise.resolve().then(()=>(t1(),e1)),L=_(v,e.email);B(S,{type:"harness.export.result",payload:{success:L.length>0,borrowerUserId:f,...w!==void 0?{targetDeviceId:w}:{},sets:L,errorMessage:L.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(u.type==="harness.manifest.request"&&hc(S,e.layout),u.type==="command.claude.result"&&Y(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,w=typeof u.payload.output=="string"?u.payload.output:"",v=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,_=Mi(f!==void 0?n1.get(f):void 0,gc),L=f!==void 0?H_.get(f):void 0,k=f!==void 0?s1.get(f)??"":"",x=CS({exitCode:v,output:w});if(x&&_!==null&&lb({layout:e.layout,text:w,source:f??"command.claude.result",projectFolderPath:_,...L!==void 0?{projectId:L}:{}}),v!=null&&v!==0&&w.trim().length>0&&_!==null&&(ob({layout:e.layout,errorText:w,projectFolderPath:_,...L!==void 0?{projectId:L}:{}}),ub({layout:e.layout,text:w,source:f??"command.claude.result.failure",projectFolderPath:_,...L!==void 0?{projectId:L}:{}})),x&&k.trim().length>0&&_!==null&&ww({layout:e.layout,projectFolderPath:_,...L!==void 0?{projectId:L}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:k,output:w,createdAt:new Date().toISOString()}}),f!==void 0&&_!==null){let j=U_.get(f),oe=B_.get(f);j!==void 0&&oe!==void 0&&Ju(_).then(G=>{let F=RS({before:oe,after:G});ch(j,F),B_.delete(f),U_.delete(f)})}if(x&&L!==void 0&&L.trim().length>0){let j=$(),oe=j===null?null:X({wsUrl:j.wsUrl,pairingToken:j.pairingToken});oe!==null&&TS(oe,L,{...f!==void 0?{sourceRunId:f}:{},lesson:xS({prompt:k,output:w})})}f!==void 0&&(ji(e.layout,f),G_.delete(f),H_.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let u=new Kl(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),y_(X({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),A_(e.layout);let S=Ce(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=tv({layout:e.layout,origin:S,...b!==void 0&&b.length>0?{claimToken:b}:{}});B(u,{type:"agent.register",payload:{role:"agent",hostname:Hs.default.hostname(),macOsUsername:Hs.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),hc(u,e.layout),P_(e,u),g(u)}),u.on("message",S=>{let b=typeof S=="string"?S:S.toString("utf8");try{let f=JSON.parse(b);if(!Y(f))return;A(f,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(S,b)=>{s(),t.socket=void 0,t.wsConnected=!1,FS(e.layout),t.reconnectAttempt+=1;let f=typeof b=="string"?b:b.toString("utf8");Io(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:f}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",S=>{t.wakeError=S.message,Io(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return kh(()=>{let u=Rh();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&o(u.remoteBundleVersion,u.trigger);let S=xh();S!==null&&r(S)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:ya(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:$l(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(hc(u,e.layout),{ok:!0})}}},F7=async()=>{Be("agent-witch");let e=Mv(),t=E();zv().ok||(process.platform==="darwin"?(await so(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),Uv(t);let o=Fv({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(Ut({launchAgentLabel:ne(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),ni());let n=await _y(),s=n[0];s!==void 0&&k_(s.layout);for(let h of n){let y=Ce(h.wsUrl)??Gt;Si(h.layout.installDir,y)}let i=n.map(h=>H7(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),Yl(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let S=we(h.layout);US(S,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(pt(h)||Sa(h.installDir))},g=await Bv({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):zl({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let A=Bt(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),si(),d()});d=()=>{A(),g.stop(),Yl(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},yc=F7});var K_=l(()=>{"use strict";i1()});var a1={};Pt(a1,{startAgentWitchClient:()=>yc});var l1=l(()=>{"use strict";K_();K_();lo();dh();zd();if(!Ge()&&co(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Dd(process.argv.slice(e))),yc()}});ih();dh();lo();zd();var LE="20.x",EE="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var m5=e=>[`Node.js ${LE} or newer is required (found ${e}).`,EE].join(" "),kE=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${m5(process.version)}
`),process.exit(1))};var U7=async()=>{Be("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(jh(),Nh)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},B7=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(Cx(),kx)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},G7=async()=>{if(!co(Ge()?void 0:__agentWitchImportMetaUrl))return;kE();let e=process.argv.indexOf("report");e>=0&&process.exit(Dd(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await U7();return}if(t==="wake"){await B7();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(R0(),C0));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(Nz(),Mz));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(l1(),a1));await r()};G7();
