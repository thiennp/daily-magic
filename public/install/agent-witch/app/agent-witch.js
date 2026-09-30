#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var GF=Object.create;var Rg=Object.defineProperty;var VF=Object.getOwnPropertyDescriptor;var qF=Object.getOwnPropertyNames;var KF=Object.getPrototypeOf,JF=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var W=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},bt=(e,t)=>{for(var r in t)Rg(e,r,{get:t[r],enumerable:!0})},YF=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of qF(t))!JF.call(e,n)&&n!==r&&Rg(e,n,{get:()=>t[n],enumerable:!(o=VF(t,n))||o.enumerable});return e};var m=(e,t,r)=>(r=e!=null?GF(KF(e)):{},YF(t||!e||!e.__esModule?Rg(r,"default",{value:e,enumerable:!0}):r,e));var on=W(xg=>{"use strict";Object.defineProperty(xg,"__esModule",{value:!0});xg.stringify=XF;function XF(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=W(Tg=>{"use strict";Object.defineProperty(Tg,"__esModule",{value:!0});Tg.generateTypeGuardError=ZF;var I_=on();function ZF(e,t,r){return(0,I_.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,I_.stringify)(e)}) to be "${r}"`}});var pr=W(uc=>{"use strict";Object.defineProperty(uc,"__esModule",{value:!0});uc.isNonNullObject=void 0;var QF=O(),e1=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,QF.generateTypeGuardError)(e,t.identifier,"non-null object")),r};uc.isNonNullObject=e1});var Pt=W(fe=>{"use strict";Object.defineProperty(fe,"__esModule",{value:!0});fe.attachTypeGuardMeta=fe.isArrayTypeGuard=fe.isNestedObjectTypeGuard=fe.getTypeGuardWrapperKind=fe.getTypeGuardInnerGuard=fe.getTypeGuardItemGuard=fe.getTypeGuardSchema=void 0;var t1=e=>e.schema;fe.getTypeGuardSchema=t1;var r1=e=>e.itemGuard;fe.getTypeGuardItemGuard=r1;var o1=e=>e.innerGuard;fe.getTypeGuardInnerGuard=o1;var n1=e=>e.wrapperKind;fe.getTypeGuardWrapperKind=n1;var s1=e=>{if((0,fe.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};fe.isNestedObjectTypeGuard=s1;var i1=e=>{if((0,fe.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};fe.isArrayTypeGuard=i1;var a1=(e,t)=>Object.assign(e,t);fe.attachTypeGuardMeta=a1});var Os=W(Br=>{"use strict";Object.defineProperty(Br,"__esModule",{value:!0});Br.getExpectedTypeName=Br.getTypeGuardDisplayName=void 0;var O_=Pt(),l1=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};Br.getTypeGuardDisplayName=l1;var c1=e=>{let t=(0,O_.getTypeGuardWrapperKind)(e),r=(0,O_.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,Br.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};Br.getExpectedTypeName=c1});var Gr=W(pc=>{"use strict";Object.defineProperty(pc,"__esModule",{value:!0});pc.createValidationResult=void 0;var d1=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});pc.createValidationResult=d1});var nn=W(mc=>{"use strict";Object.defineProperty(mc,"__esModule",{value:!0});mc.createValidationError=void 0;var u1=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});mc.createValidationError=u1});var sn=W(gc=>{"use strict";Object.defineProperty(gc,"__esModule",{value:!0});gc.createTreeNode=void 0;var p1=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});gc.createTreeNode=p1});var Ms=W(fc=>{"use strict";Object.defineProperty(fc,"__esModule",{value:!0});fc.combineResults=void 0;var m1=Gr(),g1=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,m1.createValidationResult)(r,o,n)};fc.combineResults=g1});var yc=W(hc=>{"use strict";Object.defineProperty(hc,"__esModule",{value:!0});hc.createSimplifiedTree=void 0;var M_=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=M_(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},f1=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=M_(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};hc.createSimplifiedTree=f1});var js=W(Ac=>{"use strict";Object.defineProperty(Ac,"__esModule",{value:!0});Ac.validateObject=void 0;var h1=pr(),Ns=Gr(),y1=nn(),Sc=sn(),S1=Ms(),N_=bc(),A1=(e,t,r)=>{let o=()=>{let i=(0,y1.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Sc.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Ns.createValidationResult)(!1,[],a):(0,Ns.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Ns.createValidationResult)(!0,[],(0,Sc.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,g=d,S=t[g],h=e[g],y=(0,N_.validateProperty)(g,h,S,r);return y.valid?p.length===0?(0,Ns.createValidationResult)(!0,[],(0,Sc.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,N_.validateProperty)(d,e[d],p,r)}),a=(0,S1.combineResults)(i,r.path),c=(0,Sc.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,Ns.createValidationResult)(a.valid,a.errors,c)};return(0,h1.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};Ac.validateObject=A1});var D_=W(vc=>{"use strict";Object.defineProperty(vc,"__esModule",{value:!0});vc.validateArray=void 0;var b1=on(),Pc=Gr(),j_=nn(),wc=sn(),P1=Ms(),w1=js(),v1=Os(),_1=Pt(),W1=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,j_.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,wc.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,Pc.createValidationResult)(!1,[c],d)}let n=(0,_1.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,g={path:p,config:r.config||null};if(n)return(0,w1.validateObject)(c,n,g);let S=t(c,null),h=(0,v1.getExpectedTypeName)(t),y=(0,b1.stringify)(c);if(S)return(0,Pc.createValidationResult)(!0,[],(0,wc.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,A=(0,j_.createValidationError)(p,h,c,u),b=(0,wc.createTreeNode)(p,!1,h,c);return b.errors=[A],(0,Pc.createValidationResult)(!1,[A],b)}),i=(0,P1.combineResults)(s,o),a=(0,wc.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,Pc.createValidationResult)(i.valid,i.errors,a)};vc.validateArray=W1});var bc=W(Wc=>{"use strict";Object.defineProperty(Wc,"__esModule",{value:!0});Wc.validateProperty=void 0;var z_=Gr(),L1=nn(),$_=sn(),E1=Os(),_c=Pt(),C1=js(),k1=D_(),R1=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,_c.getTypeGuardSchema)(r),c=(0,_c.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,C1.validateObject)(t,a,s);if(c&&(0,_c.isArrayTypeGuard)(r))return(0,k1.validateArray)(t,c,s)}let d=p=>{let g=r(t,p),S=(0,E1.getExpectedTypeName)(r);return g?(0,z_.createValidationResult)(!0,[],(0,$_.createTreeNode)(n,!0,S,t)):(()=>{let h=(0,L1.createValidationError)(n,S,t,`Expected ${n} (${JSON.stringify(t)}) to be "${S}"`),y=(0,$_.createTreeNode)(n,!1,S,t);return y.errors=[h],(0,z_.createValidationResult)(!1,[h],y)})()};if((0,_c.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};Wc.validateProperty=R1});var Ec=W(Lc=>{"use strict";Object.defineProperty(Lc,"__esModule",{value:!0});Lc.isNil=void 0;var x1=O(),T1=function(e,t){return e!=null?(t&&t.callbackOnError((0,x1.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Lc.isNil=T1});var Ig=W(Cc=>{"use strict";Object.defineProperty(Cc,"__esModule",{value:!0});Cc.isDefined=void 0;var I1=O(),O1=Ec(),M1=function(e,t){return(0,O1.isNil)(e,null)?(t&&t.callbackOnError((0,I1.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Cc.isDefined=M1});var Og=W(kc=>{"use strict";Object.defineProperty(kc,"__esModule",{value:!0});kc.reportValidationResults=void 0;var N1=yc(),H_=Ig(),j1=Ec(),D1=(e,t)=>{if(e.valid===!0||(0,j1.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,H_.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,N1.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,H_.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};kc.reportValidationResults=D1});var Mg=W(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.Validation=Q.reportValidationResults=Q.validateObject=Q.validateProperty=Q.createSimplifiedTree=Q.combineResults=Q.createTreeNode=Q.createValidationError=Q.createValidationResult=Q.getExpectedTypeName=void 0;var z1=Os();Object.defineProperty(Q,"getExpectedTypeName",{enumerable:!0,get:function(){return z1.getExpectedTypeName}});var $1=Gr();Object.defineProperty(Q,"createValidationResult",{enumerable:!0,get:function(){return $1.createValidationResult}});var H1=nn();Object.defineProperty(Q,"createValidationError",{enumerable:!0,get:function(){return H1.createValidationError}});var F1=sn();Object.defineProperty(Q,"createTreeNode",{enumerable:!0,get:function(){return F1.createTreeNode}});var U1=Ms();Object.defineProperty(Q,"combineResults",{enumerable:!0,get:function(){return U1.combineResults}});var B1=yc();Object.defineProperty(Q,"createSimplifiedTree",{enumerable:!0,get:function(){return B1.createSimplifiedTree}});var G1=bc();Object.defineProperty(Q,"validateProperty",{enumerable:!0,get:function(){return G1.validateProperty}});var V1=js();Object.defineProperty(Q,"validateObject",{enumerable:!0,get:function(){return V1.validateObject}});var q1=Og();Object.defineProperty(Q,"reportValidationResults",{enumerable:!0,get:function(){return q1.reportValidationResults}});var K1=Gr(),J1=Ms(),Y1=nn(),X1=sn(),Z1=bc(),Q1=js(),eU=Og(),tU=yc();Q.Validation={result:K1.createValidationResult,combine:J1.combineResults,error:Y1.createValidationError,treeNode:X1.createTreeNode,property:Z1.validateProperty,object:Q1.validateObject,report:eU.reportValidationResults,createSimplifiedTree:tU.createSimplifiedTree}});var Rc=W(Ng=>{"use strict";Object.defineProperty(Ng,"__esModule",{value:!0});Ng.isType=oU;var F_=pr(),U_=Mg(),rU=Pt();function oU(e){if(!(0,F_.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,U_.validateObject)(r,e,s);return(0,U_.reportValidationResults)(i,o||null),i.valid}return(0,F_.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,rU.attachTypeGuardMeta)(t,{schema:e})}});var q_=W(Vr=>{"use strict";Object.defineProperty(Vr,"__esModule",{value:!0});Vr.isNestedType=Vr.isShape=void 0;Vr.isSchema=Ds;var B_=pr(),G_=Mg(),V_=Pt();function Ds(e){if(!(0,B_.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=sU(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,G_.validateObject)(o,t,i);return(0,G_.reportValidationResults)(a,n||null),a.valid}return(0,B_.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,V_.attachTypeGuardMeta)(r,{schema:t})}function nU(e){return typeof e=="function"?e:Array.isArray(e)?iU(e):typeof e=="object"&&e!==null?Ds(e):e}function sU(e){let t={};for(let[r,o]of Object.entries(e))t[r]=nU(o);return t}function iU(e){let t=e[0],r=Ds(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,V_.attachTypeGuardMeta)(o,{itemGuard:r})}Vr.isShape=Ds;Vr.isNestedType=Ds});var K_=W(jg=>{"use strict";Object.defineProperty(jg,"__esModule",{value:!0});jg.isObjectWith=lU;var aU=Rc();function lU(e){return(0,aU.isType)(e)}});var J_=W(Dg=>{"use strict";Object.defineProperty(Dg,"__esModule",{value:!0});Dg.isObject=dU;var cU=Rc();function dU(e){return(0,cU.isType)(e)}});var Y_=W(zg=>{"use strict";Object.defineProperty(zg,"__esModule",{value:!0});zg.guardWithTolerance=uU;function uU(e,t,r){return t(e,r),e}});var X_=W($g=>{"use strict";Object.defineProperty($g,"__esModule",{value:!0});$g.isBranded=mU;var pU=O();function mU(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,pU.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var Z_=W(xc=>{"use strict";Object.defineProperty(xc,"__esModule",{value:!0});xc.BrandSymbols=void 0;xc.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var Q_=W(Tc=>{"use strict";Object.defineProperty(Tc,"__esModule",{value:!0});Tc.isAny=void 0;var gU=function(e){return!0};Tc.isAny=gU});var zs=W(Hg=>{"use strict";Object.defineProperty(Hg,"__esModule",{value:!0});Hg.reportTypeGuardError=hU;var fU=O();function hU(e,t,r){e&&e.callbackOnError((0,fU.generateTypeGuardError)(t,e.identifier,r))}});var eW=W(Ic=>{"use strict";Object.defineProperty(Ic,"__esModule",{value:!0});Ic.isBoolean=void 0;var yU=zs(),SU=function(t,r){return typeof t!="boolean"?((0,yU.reportTypeGuardError)(r,t,"boolean"),!1):!0};Ic.isBoolean=SU});var tW=W(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.isDate=void 0;var AU=O(),bU=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,AU.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Oc.isDate=bU});var Fg=W(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.isNumber=void 0;var PU=zs(),wU=function(t,r){return typeof t!="number"||isNaN(t)?((0,PU.reportTypeGuardError)(r,t,"number"),!1):!0};Mc.isNumber=wU});var rW=W(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.isString=void 0;var vU=zs(),_U=function(t,r){return typeof t!="string"?((0,vU.reportTypeGuardError)(r,t,"string"),!1):!0};Nc.isString=_U});var oW=W(jc=>{"use strict";Object.defineProperty(jc,"__esModule",{value:!0});jc.isUnknown=void 0;var WU=function(e){return!0};jc.isUnknown=WU});var nW=W(Dc=>{"use strict";Object.defineProperty(Dc,"__esModule",{value:!0});Dc.isFunction=void 0;var LU=O(),EU=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,LU.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Dc.isFunction=EU});var iW=W(zc=>{"use strict";Object.defineProperty(zc,"__esModule",{value:!0});zc.isFile=void 0;var sW=O(),CU=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,sW.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,sW.generateTypeGuardError)(e,t.identifier,"File")),!1)};zc.isFile=CU});var lW=W($c=>{"use strict";Object.defineProperty($c,"__esModule",{value:!0});$c.isFileList=void 0;var aW=O(),kU=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,aW.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,aW.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};$c.isFileList=kU});var dW=W(Hc=>{"use strict";Object.defineProperty(Hc,"__esModule",{value:!0});Hc.isBlob=void 0;var cW=O(),RU=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,cW.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,cW.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Hc.isBlob=RU});var pW=W(Fc=>{"use strict";Object.defineProperty(Fc,"__esModule",{value:!0});Fc.isFormData=void 0;var uW=O(),xU=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,uW.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,uW.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};Fc.isFormData=xU});var gW=W(Uc=>{"use strict";Object.defineProperty(Uc,"__esModule",{value:!0});Uc.isURL=void 0;var mW=O(),TU=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,mW.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,mW.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Uc.isURL=TU});var hW=W(Bc=>{"use strict";Object.defineProperty(Bc,"__esModule",{value:!0});Bc.isURLSearchParams=void 0;var fW=O(),IU=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,fW.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,fW.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Bc.isURLSearchParams=IU});var yW=W(Gc=>{"use strict";Object.defineProperty(Gc,"__esModule",{value:!0});Gc.isMap=void 0;var OU=O(),MU=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,OU.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Gc.isMap=MU});var SW=W(Vc=>{"use strict";Object.defineProperty(Vc,"__esModule",{value:!0});Vc.isSet=void 0;var NU=O(),jU=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,NU.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Vc.isSet=jU});var AW=W(Ug=>{"use strict";Object.defineProperty(Ug,"__esModule",{value:!0});Ug.isIndexSignature=zU;var DU=O();function zU(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,DU.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let g=s[d],S=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),h=t(g,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return S&&h})}}});var bW=W(qc=>{"use strict";Object.defineProperty(qc,"__esModule",{value:!0});qc.isError=void 0;var $U=zs(),HU=function(t,r){return t instanceof Error?!0:((0,$U.reportTypeGuardError)(r,t,"Error"),!1)};qc.isError=HU});var Gg=W(Bg=>{"use strict";Object.defineProperty(Bg,"__esModule",{value:!0});Bg.isArrayWithEachItem=BU;var FU=O(),UU=Pt();function BU(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,FU.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,UU.attachTypeGuardMeta)(t,{itemGuard:e})}});var Vg=W(Kc=>{"use strict";Object.defineProperty(Kc,"__esModule",{value:!0});Kc.isNonEmptyArray=void 0;var GU=O(),VU=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,GU.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Kc.isNonEmptyArray=VU});var PW=W(qg=>{"use strict";Object.defineProperty(qg,"__esModule",{value:!0});qg.isNonEmptyArrayWithEachItem=JU;var qU=Gg(),KU=Vg();function JU(e){return function(t,r){return(0,qU.isArrayWithEachItem)(e)(t,r)&&(0,KU.isNonEmptyArray)(t,r)}}});var vW=W(Kg=>{"use strict";Object.defineProperty(Kg,"__esModule",{value:!0});Kg.isTuple=YU;var wW=O();function YU(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,wW.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,wW.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var _W=W(Jg=>{"use strict";Object.defineProperty(Jg,"__esModule",{value:!0});Jg.isObjectWithEachItem=ZU;var XU=O();function ZU(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,XU.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var WW=W(Yg=>{"use strict";Object.defineProperty(Yg,"__esModule",{value:!0});Yg.isPartialOf=eB;var QU=pr();function eB(e){return function(t,r){if(!(0,QU.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var LW=W(Xg=>{"use strict";Object.defineProperty(Xg,"__esModule",{value:!0});Xg.isPick=rB;var tB=pr();function rB(e,...t){return function(r,o){if(!(0,tB.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var EW=W(Zg=>{"use strict";Object.defineProperty(Zg,"__esModule",{value:!0});Zg.isOmit=nB;var oB=pr();function nB(e,...t){return function(r,o){if(!(0,oB.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),g=p.indexOf(" ("),S=g>=0?p.slice(0,g):p;if(a.has(S))return!1;let h=S.startsWith(s+".")&&S.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var CW=W(Jc=>{"use strict";Object.defineProperty(Jc,"__esModule",{value:!0});Jc.isNonEmptyString=void 0;var sB=O(),iB=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,sB.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Jc.isNonEmptyString=iB});var kW=W(Yc=>{"use strict";Object.defineProperty(Yc,"__esModule",{value:!0});Yc.isNonNegativeNumber=void 0;var aB=O(),lB=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,aB.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Yc.isNonNegativeNumber=lB});var RW=W(Xc=>{"use strict";Object.defineProperty(Xc,"__esModule",{value:!0});Xc.isPositiveNumber=void 0;var cB=O(),dB=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,cB.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Xc.isPositiveNumber=dB});var xW=W(Zc=>{"use strict";Object.defineProperty(Zc,"__esModule",{value:!0});Zc.isNonPositiveNumber=void 0;var uB=O(),pB=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,uB.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Zc.isNonPositiveNumber=pB});var TW=W(Qc=>{"use strict";Object.defineProperty(Qc,"__esModule",{value:!0});Qc.isNegativeNumber=void 0;var mB=O(),gB=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,mB.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Qc.isNegativeNumber=gB});var IW=W(ed=>{"use strict";Object.defineProperty(ed,"__esModule",{value:!0});ed.isInteger=void 0;var fB=O(),hB=Fg(),yB=function(e,t){return!(0,hB.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,fB.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};ed.isInteger=yB});var OW=W(td=>{"use strict";Object.defineProperty(td,"__esModule",{value:!0});td.isPositiveInteger=void 0;var SB=O(),AB=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,SB.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};td.isPositiveInteger=AB});var MW=W(rd=>{"use strict";Object.defineProperty(rd,"__esModule",{value:!0});rd.isNegativeInteger=void 0;var bB=O(),PB=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,bB.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};rd.isNegativeInteger=PB});var NW=W(od=>{"use strict";Object.defineProperty(od,"__esModule",{value:!0});od.isNonNegativeInteger=void 0;var wB=O(),vB=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,wB.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};od.isNonNegativeInteger=vB});var jW=W(nd=>{"use strict";Object.defineProperty(nd,"__esModule",{value:!0});nd.isNonPositiveInteger=void 0;var _B=O(),WB=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,_B.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};nd.isNonPositiveInteger=WB});var DW=W(id=>{"use strict";Object.defineProperty(id,"__esModule",{value:!0});id.isNumeric=void 0;var sd=O(),LB=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,sd.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,sd.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,sd.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,sd.generateTypeGuardError)(e,t.identifier,"number key")),!1};id.isNumeric=LB});var zW=W(ad=>{"use strict";Object.defineProperty(ad,"__esModule",{value:!0});ad.isBooleanLike=void 0;var Qg=O(),EB=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Qg.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Qg.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};ad.isBooleanLike=EB});var $W=W(ld=>{"use strict";Object.defineProperty(ld,"__esModule",{value:!0});ld.isDateLike=void 0;var $s=O(),CB=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,$s.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,$s.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,$s.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,$s.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,$s.generateTypeGuardError)(e,t.identifier,"date-like")),!1};ld.isDateLike=CB});var HW=W(cd=>{"use strict";Object.defineProperty(cd,"__esModule",{value:!0});cd.isBigInt=void 0;var kB=O(),RB=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,kB.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};cd.isBigInt=RB});var tf=W(ef=>{"use strict";Object.defineProperty(ef,"__esModule",{value:!0});ef.isOneOf=xB;var FW=on();function xB(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,FW.stringify)(t)}) must be one of following values ${e.map(FW.stringify).join(" | ")}`),o}}});var UW=W(rf=>{"use strict";Object.defineProperty(rf,"__esModule",{value:!0});rf.isOneOfTypes=OB;var TB=on(),IB=Os();function OB(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,TB.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,IB.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var BW=W(of=>{"use strict";Object.defineProperty(of,"__esModule",{value:!0});of.isIntersectionOf=MB;function MB(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var GW=W(nf=>{"use strict";Object.defineProperty(nf,"__esModule",{value:!0});nf.isExtensionOf=NB;function NB(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var VW=W(sf=>{"use strict";Object.defineProperty(sf,"__esModule",{value:!0});sf.isNullOr=DB;var jB=Pt();function DB(e){function t(r,o){return r===null?!0:e(r,o)}return(0,jB.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var qW=W(af=>{"use strict";Object.defineProperty(af,"__esModule",{value:!0});af.isUndefinedOr=$B;var zB=Pt();function $B(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,zB.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var KW=W(lf=>{"use strict";Object.defineProperty(lf,"__esModule",{value:!0});lf.isNilOr=FB;var HB=Pt();function FB(e){function t(r,o){return r==null?!0:e(r,o)}return(0,HB.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var JW=W(cf=>{"use strict";Object.defineProperty(cf,"__esModule",{value:!0});cf.isAsserted=UB;function UB(e){return!0}});var YW=W(df=>{"use strict";Object.defineProperty(df,"__esModule",{value:!0});df.isEnum=GB;var BB=tf();function GB(e){return function(t,r){return(0,BB.isOneOf)(...Object.values(e))(t,r)}}});var XW=W(uf=>{"use strict";Object.defineProperty(uf,"__esModule",{value:!0});uf.isEqualTo=KB;var VB=O(),qB=on();function KB(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,VB.generateTypeGuardError)(t,r.identifier,`equal to ${(0,qB.stringify)(e)}`)),!1):!0}}});var ZW=W(dd=>{"use strict";Object.defineProperty(dd,"__esModule",{value:!0});dd.isRegex=void 0;var JB=O(),YB=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,JB.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};dd.isRegex=YB});var eL=W(pf=>{"use strict";Object.defineProperty(pf,"__esModule",{value:!0});pf.isPattern=XB;var QW=O();function XB(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,QW.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,QW.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var tL=W(mf=>{"use strict";Object.defineProperty(mf,"__esModule",{value:!0});mf.by=ZB;function ZB(e){return function(t){return e(t,null)}}});var rL=W(gf=>{"use strict";Object.defineProperty(gf,"__esModule",{value:!0});gf.toNumber=QB;function QB(e){return typeof e=="number"?e:Number(e)}});var oL=W(ff=>{"use strict";Object.defineProperty(ff,"__esModule",{value:!0});ff.toDate=eG;function eG(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var nL=W(hf=>{"use strict";Object.defineProperty(hf,"__esModule",{value:!0});hf.toBoolean=tG;function tG(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var sL=W(ud=>{"use strict";Object.defineProperty(ud,"__esModule",{value:!0});ud.isSymbol=void 0;var rG=O(),oG=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,rG.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};ud.isSymbol=oG});var Hs=W(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var nG=Rc();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return nG.isType}});var yf=q_();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return yf.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return yf.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return yf.isNestedType}});var sG=K_();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return sG.isObjectWith}});var iG=J_();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return iG.isObject}});var aG=Y_();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return aG.guardWithTolerance}});var lG=X_();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return lG.isBranded}});var cG=Z_();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return cG.BrandSymbols}});var dG=Q_();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return dG.isAny}});var uG=eW();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return uG.isBoolean}});var pG=tW();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return pG.isDate}});var mG=Ig();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return mG.isDefined}});var gG=Ec();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return gG.isNil}});var fG=Fg();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return fG.isNumber}});var hG=rW();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return hG.isString}});var yG=oW();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return yG.isUnknown}});var SG=nW();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return SG.isFunction}});var AG=iW();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return AG.isFile}});var bG=lW();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return bG.isFileList}});var PG=dW();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return PG.isBlob}});var wG=pW();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return wG.isFormData}});var vG=gW();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return vG.isURL}});var _G=hW();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return _G.isURLSearchParams}});var WG=yW();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return WG.isMap}});var LG=SW();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return LG.isSet}});var EG=AW();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return EG.isIndexSignature}});var CG=bW();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return CG.isError}});var kG=Gg();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return kG.isArrayWithEachItem}});var RG=Vg();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return RG.isNonEmptyArray}});var xG=PW();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return xG.isNonEmptyArrayWithEachItem}});var TG=vW();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return TG.isTuple}});var IG=pr();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return IG.isNonNullObject}});var OG=_W();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return OG.isObjectWithEachItem}});var MG=WW();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return MG.isPartialOf}});var NG=LW();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return NG.isPick}});var jG=EW();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return jG.isOmit}});var DG=CW();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return DG.isNonEmptyString}});var zG=kW();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return zG.isNonNegativeNumber}});var $G=RW();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return $G.isPositiveNumber}});var HG=xW();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return HG.isNonPositiveNumber}});var FG=TW();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return FG.isNegativeNumber}});var UG=IW();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return UG.isInteger}});var BG=OW();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return BG.isPositiveInteger}});var GG=MW();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return GG.isNegativeInteger}});var VG=NW();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return VG.isNonNegativeInteger}});var qG=jW();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return qG.isNonPositiveInteger}});var KG=DW();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return KG.isNumeric}});var JG=zW();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return JG.isBooleanLike}});var YG=$W();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return YG.isDateLike}});var XG=HW();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return XG.isBigInt}});var ZG=tf();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return ZG.isOneOf}});var QG=UW();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return QG.isOneOfTypes}});var e2=BW();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return e2.isIntersectionOf}});var t2=GW();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return t2.isExtensionOf}});var r2=VW();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return r2.isNullOr}});var o2=qW();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return o2.isUndefinedOr}});var n2=KW();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return n2.isNilOr}});var s2=JW();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return s2.isAsserted}});var i2=YW();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return i2.isEnum}});var a2=XW();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return a2.isEqualTo}});var l2=ZW();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return l2.isRegex}});var c2=eL();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return c2.isPattern}});var d2=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return d2.generateTypeGuardError}});var u2=tL();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return u2.by}});var p2=rL();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return p2.toNumber}});var m2=oL();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return m2.toDate}});var g2=nL();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return g2.toBoolean}});var f2=sL();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return f2.isSymbol}})});var Fs,iL,aL,qr,Sf,U9,lL,pd,Kr,Us,Af,bf,Pf,wf,jt,vf,md,gd,fd,Bs,st,an,ln,hd,mr,_f,cL,wt=l(()=>{"use strict";Fs={production:".agent-witch",localhost:".local-agent-witch"},iL={production:47892,localhost:47893},aL={production:"com.agent-witch",localhost:"com.local-agent-witch"},qr={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Sf="app",U9=`${Sf}/agent-witch.js`,lL=`${Sf}/command`,pd={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Kr=Fs.production,Us=Fs.localhost,Af=iL.production,bf=iL.localhost,Pf=aL.production,wf=aL.localhost,jt="profiles",vf=qr.activeProfile,md="harness",gd="sets",fd="manifest.json",Bs=pd.projectsDir,st=pd.logsDir,an="agent-witch.log",ln="agent-witch.error.log",hd=pd.reportsDir,mr=pd.deviceKeypairJson,_f=Sf,cL="agent-witch.js"});var cn,dL,h2,uL,pL=l(()=>{"use strict";cn=m(require("node:path")),dL=require("node:url"),h2=()=>!0,uL=()=>{if(h2()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?cn.default.dirname(cn.default.resolve(e)):cn.default.dirname(cn.default.resolve(__filename))}return cn.default.dirname((0,dL.fileURLToPath)(__agentWitchImportMetaUrl))}});var Wf,mL,N,gL,y2,gr,E,yd,Dt,fL,Sd,dn,Ad,bd,oe,it,Lf,at,Ef,M,Cf=l(()=>{"use strict";Wf=m(require("node:fs")),mL=m(require("node:os")),N=m(require("node:path")),gL=m(Hs());wt();pL();y2=uL(),gr=e=>e.trim().toLowerCase(),E=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return N.default.resolve(e);let t=N.default.resolve(y2),r=N.default.basename(t),o=N.default.basename(N.default.dirname(t));return r===_f&&(o===Kr||o===Us)?N.default.dirname(t):r===Kr||r===Us?t:N.default.join(mL.default.homedir(),Kr)},yd=(e=E())=>N.default.join(e,_f),Dt=(e=E())=>N.default.join(yd(e),cL),fL=(e,t,r)=>t!==null?N.default.join(e,jt,t,r):N.default.join(e,r),Sd=e=>fL(e.installDir,e.profileEmail,Bs),dn=e=>fL(e.installDir,e.profileEmail,st),Ad=e=>e.profileEmail!==null?N.default.join(e.installDir,jt,e.profileEmail,mr):N.default.join(e.installDir,mr),bd=e=>N.default.basename(e)===Us,oe=(e=E())=>bd(e)?wf:Pf,it=(e=E())=>bd(e)?bf:Af,Lf=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return gr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?gr(t):null},at=(e=E())=>{let t=N.default.join(e,vf);if(!Wf.default.existsSync(t))return null;try{let r=JSON.parse(Wf.default.readFileSync(t,"utf8"));if((0,gL.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return gr(r.email)}catch{return null}return null},Ef=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?gr(r):null}let t=Lf();return t!==null?t:at()},M=e=>{let t=E(),r=yd(t),o=Dt(t),n=Ef(e);if(n!==null){let S=N.default.join(t,jt,n),h=N.default.join(S,md),y=N.default.join(S,Bs),u=N.default.join(S,st),A=N.default.join(S,hd),b=N.default.join(S,mr),f=N.default.join(S,st,an),w=N.default.join(S,st,ln);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:u,mainLogPath:f,errorLogPath:w,reportsDir:A,deviceKeypairPath:b,configPath:N.default.join(S,"config.json"),harnessRootDir:h,harnessManifestPath:N.default.join(h,fd),harnessSetsDir:N.default.join(h,gd)}}let s=N.default.join(t,md),i=N.default.join(t,Bs),a=N.default.join(t,st),c=N.default.join(t,hd),d=N.default.join(t,mr),p=N.default.join(t,st,an),g=N.default.join(t,st,ln);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:g,reportsDir:c,deviceKeypairPath:d,configPath:N.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:N.default.join(s,fd),harnessSetsDir:N.default.join(s,gd)}}});var kf,hL,S2,A2,yL,Rf,SL=l(()=>{"use strict";kf=m(require("node:fs")),hL=m(require("node:path"));wt();Cf();S2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),A2=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,yL=e=>{let t=hL.default.join(e,qr.wakePort);if(!kf.default.existsSync(t))return null;try{let r=JSON.parse(kf.default.readFileSync(t,"utf8"));if(S2(r)&&A2(r.wakePort))return r.wakePort}catch{return null}return null},Rf=(e=E())=>yL(e)??it(e)});var V=l(()=>{"use strict";Cf();SL()});var Gs,_2,W2,AL,L2,E2,bL=l(()=>{"use strict";V();Gs=oe(),_2=`${Gs}-wake`,W2=`${Gs}-live`,AL=`${Gs}-watchdog`,L2=`${Gs}-automation-scheduler`,E2=`${Gs}-updater`});var xf,Tf,Pd=l(()=>{"use strict";xf=new Set(["","loginwindow","_mbsetupuser","root"]),Tf=5e3});var PL,C2,wL,If,Of=l(()=>{"use strict";PL=require("node:child_process");Pd();C2=e=>e.trim().toLowerCase(),wL=e=>e==null?!1:!xf.has(C2(e)),If=()=>{if(process.platform!=="darwin")return null;try{let t=(0,PL.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return wL(t)?t:null}catch{return null}}});var _L,vL,lt,Vs=l(()=>{"use strict";_L=m(require("node:os"));Of();vL=e=>e.trim().toLowerCase(),lt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?If():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??_L.default.userInfo().username;return vL(r)===vL(o)}});var WL,LL,Jr,EL=l(()=>{"use strict";WL=require("node:child_process"),LL=m(require("node:fs"));V();Vs();Jr=(e=E())=>{let t=Dt(e);if(!LL.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!lt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=at(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,WL.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var CL,qs,wd=l(()=>{"use strict";CL=require("node:child_process"),qs=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,CL.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var vd,Mf,kL,ee,_d,Ks=l(()=>{"use strict";vd=m(require("node:fs")),Mf=m(require("node:path"));V();wt();kL=e=>{let t=Mf.default.join(e,jt);return vd.default.existsSync(t)?vd.default.readdirSync(t).filter(r=>vd.default.statSync(Mf.default.join(t,r)).isDirectory()).map(r=>gr(r)).toSorted():[]},ee=(e=E())=>{let t=oe(e);return[{profileEmail:kL(e)[0]??null,launchAgentLabel:t}]},_d=(e=E())=>kL(e)});var Nf,RL,xL,k2,zt,Wd=l(()=>{"use strict";Nf=m(require("node:fs")),RL=m(require("node:os")),xL=m(require("node:path"));V();Ks();k2=()=>xL.default.join(RL.default.homedir(),"Library","LaunchAgents"),zt=(e=E())=>{let t=oe(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ee(e))r.add(n.launchAgentLabel);let o=k2();if(Nf.default.existsSync(o))for(let n of Nf.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var TL,Js,IL=l(()=>{"use strict";V();wd();Wd();Ks();TL=(e=E())=>{let t=new Set(ee(e).map(r=>r.launchAgentLabel));return zt(e).filter(r=>!t.has(r))},Js=(e=E())=>{for(let t of TL(e))qs(t)}});var Ys,jf=l(()=>{"use strict";V();wd();Wd();Ys=(e=E())=>{for(let t of zt(e))qs(t)}});var OL,ML,R2,Yr,NL=l(()=>{"use strict";OL=require("node:child_process"),ML=require("node:util"),R2=(0,ML.promisify)(OL.execFile),Yr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await R2("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Xr,x2,Df,zf=l(()=>{"use strict";Xr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),x2=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,Df=e=>{let t=e.pathValue??x2(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${Xr(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${Xr(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${Xr(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${Xr(e.homeDir)}</string>
    <key>PATH</key>
    <string>${Xr(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${Xr(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${Xr(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var Ld,$f=l(()=>{"use strict";Ld=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Zr,Hf,Xs,T2,I2,O2,jL,$t,Ff=l(()=>{"use strict";Zr=m(require("node:fs")),Hf=m(require("node:os")),Xs=m(require("node:path"));wt();V();zf();$f();T2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),I2=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,O2=e=>{let t=Xs.default.join(e,qr.wakePort);if(!Zr.default.existsSync(t))return it(e);try{let r=JSON.parse(Zr.default.readFileSync(t,"utf8"));if(T2(r)&&I2(r.wakePort))return r.wakePort}catch{return it(e)}return it(e)},jL=(e,t=Hf.default.homedir())=>Xs.default.join(t,"Library","LaunchAgents",`${e}.plist`),$t=e=>{let t=e.installDir??E(),r=e.homeDir??Hf.default.homedir(),o=jL(e.launchAgentLabel,r),n=Zr.default.existsSync(o)?Zr.default.readFileSync(o,"utf8"):null;if(n!==null&&Ld(n))return{ok:!0,rewritten:!1,plistPath:o};let s=Df({launchAgentLabel:e.launchAgentLabel,runPath:Xs.default.join(t,lL,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??O2(t)});if(!Ld(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Zr.default.mkdirSync(Xs.default.dirname(o),{recursive:!0}),Zr.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var zL,$L,HL,Zs,M2,N2,DL,Le,Uf=l(()=>{"use strict";zL=require("node:child_process"),$L=m(require("node:fs")),HL=require("node:util");V();Ff();Vs();Zs=(0,HL.promisify)(zL.execFile),M2=async e=>{try{return await Zs("launchctl",["print",e]),!0}catch{return!1}},N2=async(e,t,r)=>{await M2(t)&&await Zs("launchctl",["bootout",t]).catch(()=>{}),await Zs("launchctl",["bootstrap",e,r]),await Zs("launchctl",["enable",t])},DL=async e=>{try{return await Zs("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Le=async(e,t=E())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!lt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=$t({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await DL(n))return{ok:!0};let i=s.plistPath;if(!$L.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await N2(o,n,i),await DL(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Qr,FL=l(()=>{"use strict";V();Uf();Ks();Qr=async(e=E())=>{let t=[];for(let r of ee(e))(await Le(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var Fe,Ht,UL=l(()=>{"use strict";jf();Vs();Pd();Fe=e=>{lt()||(Ys(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Ht=(e,t=Tf)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{lt()||e()},t);return()=>{clearInterval(r)}}});var te=l(()=>{"use strict";bL();EL();wd();IL();jf();Wd();Vs();NL();FL();Uf();Ff();$f();zf();Ks();Of();Pd();UL()});var Bf=l(()=>{"use strict";te()});var BL,GL,Ed,VL,un,qL,KL,eo=l(()=>{"use strict";BL=".agent-witch",GL="memory",Ed="project.json",VL="chunks.ndjson",un="runs.ndjson",qL="reports",KL=".json"});var JL=l(()=>{"use strict";eo()});var YL,Cd,Gf=l(()=>{"use strict";YL=m(require("node:path"));JL();Cd=(e,t)=>YL.default.join(e.trim(),`${t.trim()}${KL}`)});var Qs,XL,ZL=l(()=>{"use strict";Qs="agent-witch.js",XL="command"});var kd=l(()=>{"use strict";ZL()});var to,QL,eE=l(()=>{"use strict";kd();to=e=>`'${e.replace(/'/g,"'\\''")}'`,QL=e=>{let t=`${e.installDir.trim()}/${"app"}/${Qs}`,r=[to("node"),to(t),"report","write","--key",to(e.reportKey.trim()),"--agent-run-id",to(e.agentRunId.trim()),"--status",to(e.status),"--summary",to(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",to(e.details.trim())),r.join(" ")}});var vt,tE,j2,Vf,Rd=l(()=>{"use strict";Gf();eE();vt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},tE=e=>e===vt.COMPLETED||e===vt.FAILED,j2=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Vf=(e,t)=>{let r=Cd(t.reportsDir,t.reportKey),o=QL({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:vt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${j2({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Ee=l(()=>{"use strict";wt();V()});var ti,oE,rE,nE,D2,pn,z2,sE,ri,oi,qf,iE,aE,ni=l(()=>{"use strict";ti=m(require("node:fs")),oE=m(require("node:path"));Rd();Gf();Ee();rE=50,nE=e=>{let t=M(),r=Cd(t.reportsDir,e);return ti.default.mkdirSync(oE.default.dirname(r),{recursive:!0}),r},D2=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},pn=e=>{let t=nE(e);if(!ti.default.existsSync(t))return null;try{let r=JSON.parse(ti.default.readFileSync(t,"utf8"));return D2(r)?r:null}catch{return null}},z2=(e,t)=>{let r=[...e,t];return r.length>rE?r.slice(r.length-rE):r},sE=e=>{let t=nE(e.reportKey);ti.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},ri=e=>{let t=pn(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:z2(t?.history??[],o)};return sE(n),n},oi=e=>{let t=pn(e.reportKey);return t!==null?t:ri({reportKey:e.reportKey,agentRunId:e.agentRunId,status:vt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},qf=(e,t)=>{let r=t.trim();if(r.length===0)return pn(e);let o=pn(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return sE(s),s},iE=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},aE=e=>{if(e===null||!tE(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===vt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var $2,H2,si,lE,xd,Kf=l(()=>{"use strict";Rd();ni();$2=new Set(Object.values(vt)),H2=e=>$2.has(e),si=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},lE=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},xd=e=>{if(e[0]!=="write")return lE(),1;let r=si(e,"--key"),o=si(e,"--agent-run-id"),n=si(e,"--status"),s=si(e,"--summary"),i=si(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!H2(n)?(lE(),1):(ri({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var Ue,ro=l(()=>{"use strict";Ue=()=>!0});var Jf,cE,oo,Td=l(()=>{"use strict";Jf=m(require("node:path")),cE=require("node:url");ro();oo=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Jf.default.resolve(t);return Ue()?r===Jf.default.resolve(__filename):e===void 0?!1:r===(0,cE.fileURLToPath)(e)}});var Id,mn,B2,BX,gn=l(()=>{"use strict";Id="agent-witch.js",mn="deps.tar.gz",B2="install.sh",BX={mainScript:`app/${Id}`,depsArchive:`app/${mn}`,installShell:B2}});var mE=l(()=>{"use strict";gn()});var gE=l(()=>{"use strict";gn();mE()});var ii,Xf,Od,G2,ai,Ce,hn,li,ci,no,Zf=l(()=>{"use strict";ii=m(require("node:fs")),Xf=m(require("node:path"));gE();V();Od="install-version.json",G2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ai=(e=E())=>Xf.default.join(e,Od),Ce=(e=E())=>{let t=ai(e);if(!ii.default.existsSync(t))return null;try{let r=JSON.parse(ii.default.readFileSync(t,"utf8"));return!G2(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},hn=(e,t=E())=>{let r=ai(t);ii.default.mkdirSync(Xf.default.dirname(r),{recursive:!0}),ii.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},li=(e=E())=>Ce(e)?.bundleVersion??"220",ci=(e,t)=>{let r=Ce(e);if(r!==null)return r;let o={bundleVersion:"220",appOrigin:t,updatedAt:new Date().toISOString()};return hn(o,e),o},no=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var fE,so,Qf,eh,th,Md,_t,io,rh=l(()=>{"use strict";fE=require("node:crypto"),so=m(require("node:fs")),Qf=m(require("node:path"));V();eh="self-update-log.ndjson",th=100,Md=(e=E())=>{let t=M(),r=t.installDir===e?t.logsDir:dn({installDir:e,profileEmail:t.profileEmail});return Qf.default.join(r,eh)},_t=(e,t=E())=>{let r={id:(0,fE.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Md(t);so.default.mkdirSync(Qf.default.dirname(o),{recursive:!0});let n=so.default.existsSync(o)?so.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-th+1)),JSON.stringify(r)];return so.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},io=(e=20,t=E())=>{let r=Md(t);if(!so.default.existsSync(r))return[];let o=so.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var oh,aZ,nh=l(()=>{"use strict";gn();oh="deps",aZ=`${"app"}/${mn}`});var hE=l(()=>{"use strict";nh()});var yE,fr,ao,SE,sh,ih,AE=l(()=>{"use strict";yE=require("node:child_process"),fr=m(require("node:fs")),ao=m(require("node:path"));gn();nh();SE=e=>ao.default.join(e,"app",oh),sh=e=>{let t=ao.default.join(e,"app"),r=ao.default.join(t,mn);fr.default.existsSync(r)&&(fr.default.rmSync(SE(e),{recursive:!0,force:!0}),fr.default.mkdirSync(t,{recursive:!0}),(0,yE.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),fr.default.rmSync(r,{force:!0}))},ih=e=>{fr.default.rmSync(ao.default.join(e,"node_modules"),{recursive:!0,force:!0}),fr.default.rmSync(ao.default.join(e,"package.json"),{force:!0}),fr.default.rmSync(ao.default.join(e,"package-lock.json"),{force:!0})}});var bE=l(()=>{"use strict";hE();AE()});var Ft,Nd,PE=l(()=>{"use strict";Ft="https://www.agentwitch.com",Nd="wss://www.agentwitch.com/api/agent-witch/ws"});var di,Ut,wE=l(()=>{"use strict";di="127.0.0.1",Ut=`http://${di}:43347`});var Bt=l(()=>{"use strict";PE();wE()});var ui,jd,vE,lh,V2,_E,uh,WE,ct,pi,mi,ph,ch,dh,gi,mh,gh,fh,yn=l(()=>{"use strict";ui=m(require("node:fs")),jd=m(require("node:path")),vE="active-writer-work.json",lh=new Set,V2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_E=e=>e.profileEmail===null?jd.default.join(e.installDir,vE):jd.default.join(e.installDir,"profiles",e.profileEmail,vE),uh=e=>{let t=_E(e);if(!ui.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(ui.default.readFileSync(t,"utf8"));return!V2(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},WE=(e,t)=>{let r=_E(e);ui.default.mkdirSync(jd.default.dirname(r),{recursive:!0}),ui.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},ct=e=>uh(e).activeCount>0,pi=e=>{let t=uh(e);WE(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},mi=e=>{let t=uh(e),r=Math.max(0,t.activeCount-1);if(WE(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of lh)o()},ph=e=>(lh.add(e),()=>{lh.delete(e)}),ch=null,dh=null,gi=e=>{ch=e},mh=e=>{dh=e},gh=()=>{let e=ch;return ch=null,e},fh=()=>{let e=dh;return dh=null,e}});var ke,hh=l(()=>{"use strict";ke=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Sn,Dd,fi,yh=l(()=>{"use strict";Sn="qwen2.5:7b",Dd="nomic-embed-text",fi="Install Ollama from https://ollama.com/download"});var hi,LE,Sh=l(()=>{"use strict";yh();hi=()=>`
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
    echo "Ollama is missing. ${fi}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${fi}" >&2
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
  agent_witch_ensure_ollama_model "${Sn}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${Dd}" "\${pull_log}"
}
`,LE=()=>`
${hi()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var EE,q2,zd,Ah=l(()=>{"use strict";EE=require("node:child_process");V();Sh();q2=e=>new Promise(t=>{let r=(0,EE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:E()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),zd=async(e=q2)=>{let t=`${hi()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var hr,$d,CE,K2,kE,bn,J2,Y2,X2,An,lo,co,RE=l(()=>{"use strict";hr=m(require("node:fs")),$d=m(require("node:path"));bE();te();V();gn();Bt();Zf();yn();hh();rh();Ah();CE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),K2=e=>{let t=at(e),r=t===null?M():M(t);if(!hr.default.existsSync(r.configPath))return null;try{let o=JSON.parse(hr.default.readFileSync(r.configPath,"utf8"));return!CE(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},kE=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!CE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},bn=async e=>(await kE(e))?.bundleVersion??null,J2=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=$d.default.join(t,r);hr.default.mkdirSync($d.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());hr.default.writeFileSync(n,s),r.endsWith(".js")&&hr.default.chmodSync(n,493)},Y2=async()=>{Js(),await Qr()},X2=(e,t)=>e!==null?ke(e):t??Ft,An=(e,t)=>({localBundleVersion:t,...e}),lo=async e=>{let t=E(),r=Ce(t),o=r?.bundleVersion??null,n=await zd();_t({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=K2(t),i=X2(s,r?.appOrigin);if(i===null){let d=An({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return _t({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await kE(i);if(a===null){let d=An({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return _t({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||no(o,a.bundleVersion))){let d=An({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return _t({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let S of a.scripts)await J2(i,t,S);let d=$d.default.join(t,Id);hr.default.existsSync(d)&&hr.default.rmSync(d,{force:!0}),sh(t),ih(t),hn({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=M(at(t));if(ct(p)){let S=An({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return _t({event:"update_applied",ok:!0,message:S.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),S}await Y2();let g=An({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return _t({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",g=An({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return _t({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}},co=()=>{let e=E();return{local:Ce(e),logs:io(20,e)}}});var xE={};bt(xE,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>Od,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>fi,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Dd,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>Sn,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>eh,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>th,appendAgentWitchSelfUpdateLog:()=>_t,buildAgentWitchEnsureOllamaShell:()=>hi,buildAgentWitchInstallScriptOllama:()=>LE,buildAgentWitchSelfUpdateStatus:()=>co,ensureAgentWitchInstallVersionRecorded:()=>ci,ensureAgentWitchOllamaInstalled:()=>zd,fetchAgentWitchRemoteInstallBundleVersion:()=>bn,isRemoteAgentWitchBundleVersionNewer:()=>no,readAgentWitchInstallVersion:()=>Ce,readAgentWitchSelfUpdateLogs:()=>io,resolveAgentWitchAppOriginFromWsUrl:()=>ke,resolveAgentWitchHeartbeatInstallBundleVersion:()=>li,resolveAgentWitchInstallVersionPath:()=>ai,resolveAgentWitchSelfUpdateLogPath:()=>Md,runAgentWitchSelfUpdate:()=>lo,writeAgentWitchInstallVersion:()=>hn});var Ye=l(()=>{"use strict";Zf();rh();RE();hh();yh();Sh();Ah()});var bh={};bt(bh,{buildAgentWitchSelfUpdateStatus:()=>co,fetchAgentWitchRemoteInstallBundleVersion:()=>bn,runAgentWitchSelfUpdate:()=>lo});var Ph=l(()=>{"use strict";Ye()});function Pn(e){return(0,TE.createHash)("sha256").update(e.trim()).digest("hex")}var TE,wh=l(()=>{"use strict";TE=require("node:crypto")});var wn,yi,Z2,IE,vh,OE=l(()=>{"use strict";wn=m(require("node:fs")),yi=m(require("node:path"));wh();Ee();Z2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),IE=e=>{if(!wn.default.existsSync(e))return null;try{let t=JSON.parse(wn.default.readFileSync(e,"utf8"));return!Z2(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Pn(t.pairingToken.trim())}catch{return null}},vh=(e=E())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(IE(yi.default.join(e,"config.json")));let n=yi.default.join(e,jt);if(!wn.default.existsSync(n))return t;for(let s of wn.default.readdirSync(n)){let i=yi.default.join(n,s);wn.default.statSync(i).isDirectory()&&o(IE(yi.default.join(i,"config.json")))}return t}});var _h,ME,Hd,Si,Ai,Q2,e5,t5,NE,ae,le,Fd,Wt,dt=l(()=>{"use strict";_h=m(require("node:fs")),ME=m(require("node:os")),Hd=m(require("node:path")),Si={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Ai=e=>e.trim().length>0,Q2=e=>{let t=Hd.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},e5=()=>{let e=ME.default.homedir(),t=Hd.default.join(e,".local","bin","agent");if(_h.default.existsSync(t))return t;let r=Hd.default.join(e,".local","bin","cursor-agent");return _h.default.existsSync(r)?r:Si.cursorCommand},t5=e=>{let t=e.trim();return!Ai(t)||t===Si.cursorCommand?e5():t},NE=(e,t)=>Q2(e)?t:["agent",...t],ae=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",le=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:Ai(t)?t.trim():Si.claudeCommand,codexCommand:Ai(r)?r.trim():Si.codexCommand,cursorCommand:t5(o),antigravityCommand:Ai(n)?n.trim():Si.antigravityCommand}},Fd=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:NE(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Wt=(e,t,r,o)=>{let n=t.trim();if(!Ai(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:NE(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",n]}}});var yr,r5,vn,o5,_n,Ud=l(()=>{"use strict";yr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,r5=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:yr(s.inputTokens)+yr(s.outputTokens)+yr(s.cacheReadInputTokens)+yr(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},vn=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=yr(a.input_tokens)+yr(a.cache_creation_input_tokens)+yr(a.cache_read_input_tokens),d=yr(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:r5(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},o5=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),_n=(e,t)=>{let r=vn(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??o5(r)}}});var Wh,n5,s5,Lh,Eh=l(()=>{"use strict";Wh=e=>e.toLocaleString("en-US"),n5=e=>e<.01?e.toFixed(4):e.toFixed(3),s5=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${n5(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Wh(e.inputTokens)} in / ${Wh(e.outputTokens)} out (${Wh(e.totalTokens)} total)`,t].join(`
`)},Lh=(e,t)=>{if(t===void 0)return e;let r=s5(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Bd,Ch=l(()=>{"use strict";Bd={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var uo,kh,Gd,Rh=l(()=>{"use strict";Ch();uo="auto",kh=e=>({value:uo,label:`Auto (${Bd[e]})`}),Gd={anthropic:[kh("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[kh("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[kh("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Wn,bi,xh,Pi=l(()=>{"use strict";Ch();Rh();Wn=e=>{let t=e?.trim()??"";if(!(t.length===0||t===uo))return t},bi=(e,t)=>{let r=Wn(t);return r===void 0?Bd[e]:r},xh=e=>{let t=Wn(e);return t===void 0?uo:t}});var Vd,i5,a5,qd,jE=l(()=>{"use strict";Vd={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},i5=e=>{let t=Vd[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Vd["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Vd["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Vd["gemini-2.0-flash"]:null},a5=(e,t,r)=>{let o=i5(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},qd=e=>{let t=a5(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Ln,l5,c5,d5,Kd,DE=l(()=>{"use strict";jE();Ln=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),l5=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Ln(r.input_tokens),n=Ln(r.output_tokens);return o===0&&n===0?null:qd({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},c5=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Ln(r.prompt_tokens),n=Ln(r.completion_tokens);return o===0&&n===0?null:qd({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},d5=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=Ln(r.promptTokenCount),n=Ln(r.candidatesTokenCount);return o===0&&n===0?null:qd({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Kd=(e,t,r)=>e==="anthropic"?l5(t,r):e==="openai"?c5(t,r):d5(t,r)});var u5,Th,p5,m5,g5,f5,h5,Ih,Oh=l(()=>{"use strict";Pi();DE();u5=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},Th=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:bi(e,t.model)},p5=async e=>{let t=Th("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=u5(o);n.length>0&&e.onChunk?.(n);let s=Kd("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},m5=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},g5=async e=>{let t=Th("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=m5(o);n.length>0&&e.onChunk?.(n);let s=Kd("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},f5=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},h5=async e=>{let t=Th("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=f5(n);s.length>0&&e.onChunk?.(s);let i=Kd("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},Ih=async e=>{try{return e.provider==="anthropic"?await p5(e):e.provider==="openai"?await g5(e):await h5(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Be,wi=l(()=>{"use strict";Be=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var zE,y5,Jd,Mh=l(()=>{"use strict";zE=m(require("node:path")),y5="writer-api-secrets.json",Jd=e=>zE.default.join(e,y5)});var Nh,$E,S5,Sr,De,Ar=l(()=>{"use strict";Nh=m(require("node:fs"));Pi();Mh();$E=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),S5=e=>{if(!$E(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=Wn(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},Sr=e=>{let t=Jd(e);if(!Nh.default.existsSync(t))return{};try{let r=JSON.parse(Nh.default.readFileSync(t,"utf8"));if(!$E(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=S5(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},De=(e,t)=>Sr(e)[t]??null});var Re,vi=l(()=>{"use strict";Re=e=>e==="api"?"api":"cli"});var HE,be,po,Gt=l(()=>{"use strict";HE=m(require("node:path"));wi();Ar();vi();be=e=>HE.default.dirname(e),po=(e,t)=>{if(Re(e.writerExecutionBackend)!=="api")return!1;let r=Be(t);if(r===null)return!1;let o=be(e.layout.configPath),n=De(o,r);return n!==null&&n.apiKey.length>0}});var _i,jh=l(()=>{"use strict";Eh();Oh();wi();Ar();Gt();_i=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Be(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=be(e.layout.configPath),a=De(i,s);if(a===null){let d=Object.keys(Sr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await Ih({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:Lh(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var FE,En,Dh=l(()=>{"use strict";FE=require("node:child_process");dt();Ud();jh();Gt();En=(e,t,r)=>new Promise(o=>{if(!ae(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(po(e,t)){_i(e,t,r).then(o);return}let n=Wt(t,r,le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,FE.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=_n(i.join("")),p=a.join("").trim(),g=[d.output.trim(),p].filter(S=>S.length>0).join(`
`);o({exitCode:c??-1,output:g})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var UE=l(()=>{"use strict"});var BE=l(()=>{"use strict";Eh();Dh();Oh();UE();Ar();Gt()});var GE,VE,qE,KE=l(()=>{"use strict";GE="claude",VE="codex",qE="cursor"});var JE,A5,zh,Wi,Yd=l(()=>{"use strict";JE=m(require("node:path"));Bt();wt();A5="ws://localhost:3000/api/agent-witch/ws",zh=e=>e.replace(/\/$/,""),Wi=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return zh(t);let r=JE.default.basename(e.installDir);if(r===Fs.production)return Nd;let o=e.configWsUrl?.trim()??"";return r===Fs.localhost?o.length>0?zh(o):A5:o.length>0?zh(o):Nd}});var P5,$h,Hh=l(()=>{"use strict";KE();Yd();vi();P5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$h=e=>{if(!P5(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Wi({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??GE,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??VE,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??qE,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Re(t.writerExecutionBackend),layout:e.layout}}}});var Fh,Uh,Bh=l(()=>{"use strict";Fh=m(require("node:fs"));V();Hh();Uh=e=>{let t=M(e);if(!Fh.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Fh.default.readFileSync(t.configPath,"utf8")),o=$h({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Li,YE=l(()=>{"use strict";Li=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var Gh,w5,Vh,XE=l(()=>{"use strict";Gh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),w5=e=>{if(!Gh(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!Gh(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(g=>{if(!Gh(g))return[];let S=typeof g.itemKey=="string"?g.itemKey.trim():"",h=typeof g.relativePath=="string"?g.relativePath:"",y=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return S.length===0||y.length===0?[]:[{itemKey:S,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},Vh=w5});var ZE,v5,Xd,qh=l(()=>{"use strict";ZE=m(require("node:path")),v5=(e,t)=>{let r=t.trim();return ZE.default.join(e,"components","store",r.slice(0,2),r)},Xd=v5});var QE,_5,Kh,eC=l(()=>{"use strict";QE=m(require("node:fs"));qh();_5=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Xd(e.installDir,n.contentSha256);QE.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},Kh=_5});var Ei,Cn,W5,Jh,L5,Yh,Xh=l(()=>{"use strict";Ei=m(require("node:fs")),Cn=m(require("node:path"));qh();W5=(e,t)=>Cn.default.join(e.installDir,"runs",t,"overlay"),Jh=(e,t)=>Cn.default.join(W5(e,t),".cursor"),L5=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=Jh(e,t);Ei.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Xd(e.installDir,i.contentSha256);if(!Ei.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Cn.default.join(n,c):Cn.default.join(n,i.itemKey);Ei.default.mkdirSync(Cn.default.dirname(d),{recursive:!0}),Ei.default.copyFileSync(a,d)}return{ok:!0}},Yh=L5});var Zh,tC,E5,Ci,rC=l(()=>{"use strict";Zh=m(require("node:fs")),tC=m(require("node:path")),E5=(e,t)=>{let r=tC.default.join(e.installDir,"runs",t);Zh.default.existsSync(r)&&Zh.default.rmSync(r,{recursive:!0,force:!0})},Ci=E5});var C5,Qh,oC=l(()=>{"use strict";Xh();C5=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=Jh(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},Qh=C5});var ey,k5,R5,x5,T5,I5,H,nC=l(()=>{"use strict";ey=m(require("node:fs"));Yd();V();vi();k5="claude",R5="codex",x5="cursor",T5="agy",I5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H=()=>{let e=M();if(!ey.default.existsSync(e.configPath))return null;try{let t=JSON.parse(ey.default.readFileSync(e.configPath,"utf8"));if(!I5(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Wi({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Re(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:k5,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:R5,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:x5,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:T5,pairingToken:s,layout:e}}catch{return null}}});var Zd,sC,iC=l(()=>{"use strict";Zd=m(require("node:fs"));Mh();sC=(e,t)=>{let r=Jd(e);Zd.default.mkdirSync(e,{recursive:!0}),Zd.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Zd.default.chmodSync(r,384)}catch{}}});var Qd,aC,ty=l(()=>{"use strict";Qd=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},aC=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Qd(t)}});var ki,O5,ry,oy,lC=l(()=>{"use strict";ki=m(require("node:fs"));Ar();iC();ty();Pi();Gt();O5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ry=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=aC(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?Wn(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},oy=e=>{let t=be(e.configPath),r={};if(ki.default.existsSync(e.configPath))try{let n=JSON.parse(ki.default.readFileSync(e.configPath,"utf8"));O5(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,ki.default.mkdirSync(t,{recursive:!0}),ki.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=ry(ry(ry(Sr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);sC(t,o)}});var ny,cC=l(()=>{"use strict";ny={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var sy,dC=l(()=>{"use strict";wi();Ar();Gt();Gt();sy=(e,t)=>{if(po(e,t))return!1;let r=Be(t);if(r===null)return!1;let o=be(e.layout.configPath),n=De(o,r);return n===null||n.apiKey.trim().length===0}});var uC,iy,ay=l(()=>{"use strict";uC=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},iy=async e=>{let t=uC(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=uC(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var M5,ly,pC=l(()=>{"use strict";te();Bh();ay();M5=1e4,ly=()=>iy({listProfileEmails:_d,readConfig:Uh,pollIntervalMs:M5,logWaiting:e=>{console.error(e)}})});var ce=l(()=>{"use strict";Dh();BE();Bh();Yd();YE();XE();eC();Xh();rC();oC();vi();nC();lC();Ar();Gt();ty();Pi();cC();jh();Gt();dC();wi();Ar();pC();Hh();ay()});var eu,mC,N5,j5,gC,tu,Ri,ru,xi=l(()=>{"use strict";eu=m(require("node:fs")),mC=m(require("node:path")),N5="wake-port.json",j5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gC=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,tu=e=>mC.default.join(e,N5),Ri=e=>{let t=tu(e);if(!eu.default.existsSync(t))return null;try{let r=JSON.parse(eu.default.readFileSync(t,"utf8"));if(j5(r)&&gC(r.wakePort))return r.wakePort}catch{return null}return null},ru=(e,t)=>{if(!gC(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=tu(e);eu.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Pte,wte,vte,ut,fC,Ti=l(()=>{"use strict";xi();Ee();xi();Pte=it(),wte=`${oe()}-wake`,vte=oe(),ut=()=>{let e=E(),t=Ri(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return it()},fC=e=>{let t=E();Ri(t)===null&&ru(t,e)}});var hC=l(()=>{"use strict";wh();te();OE();ce();Ti()});var cy,Ii,Oi,yC=l(()=>{"use strict";cy=m(require("node:os"));hC();Ii=()=>{let e=ee();return{ok:!0,port:ut(),hostname:cy.default.hostname(),profileCount:e.length}},Oi=()=>{let e=ee(),t=H()?.pairingToken.trim()??"",r=t.length>0?Pn(t):null,o=vh();return{hostname:cy.default.hostname(),port:ut(),tokenHash:r,tokenHashes:o.length>0?o:r!==null?[r]:[],profiles:e.map(n=>({email:n.profileEmail,launchAgentLabel:n.launchAgentLabel}))}}});var dy=l(()=>{"use strict";yC()});var SC,AC,bC,ou,kn=l(()=>{"use strict";SC="materialization.json",AC="backups",bC=".gitignore",ou=e=>`harness-set:${e.trim()}`});var PC,wC,nu,vC=l(()=>{"use strict";PC=m(require("node:crypto")),wC=m(require("node:fs")),nu=e=>{try{let t=wC.default.readFileSync(e);return PC.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var br,mo,D5,_C,uy,WC=l(()=>{"use strict";br=m(require("node:fs")),mo=m(require("node:path"));vC();D5=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=mo.default.join(t,n,o);return br.default.mkdirSync(mo.default.dirname(s),{recursive:!0}),br.default.copyFileSync(r,s),mo.default.relative(e,s).replaceAll("\\","/")},_C=e=>{let t=mo.default.join(e.repoRoot,e.repoRelativeDestination),r=nu(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(br.default.existsSync(t)){let n=nu(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=D5(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return br.default.mkdirSync(mo.default.dirname(t),{recursive:!0}),br.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return br.default.mkdirSync(mo.default.dirname(t),{recursive:!0}),br.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},uy=e=>{let t=nu(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var py,LC,su,my=l(()=>{"use strict";py=m(require("node:fs"));kn();LC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),su=e=>{if(!py.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(py.default.readFileSync(e,"utf8"));if(LC(t)&&t.version===1&&LC(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var Pr,iu,EC,CC=l(()=>{"use strict";Pr=m(require("node:fs")),iu=m(require("node:path"));kn();EC=e=>{let t=new Set(e.setSlugs.map(s=>ou(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=iu.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=iu.default.join(e.repoRoot,i.backupPath);Pr.default.existsSync(c)?(Pr.default.mkdirSync(iu.default.dirname(a),{recursive:!0}),Pr.default.copyFileSync(c,a),o.push(s)):Pr.default.existsSync(a)&&Pr.default.rmSync(a,{force:!0})}else Pr.default.existsSync(a)&&Pr.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var gy,au,fy=l(()=>{"use strict";gy=m(require("node:path"));kn();au=e=>({ledgerFilePath:gy.default.join(e.metaDirPath,SC),backupsDirPath:gy.default.join(e.metaDirPath,AC)})});var hy,kC,RC=l(()=>{"use strict";hy=m(require("node:path")),kC=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return hy.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return hy.default.posix.join(s,e,n)}});var yy,xC,Sy,TC=l(()=>{"use strict";yy=m(require("node:fs")),xC=m(require("node:path")),Sy=(e,t)=>{yy.default.mkdirSync(xC.default.dirname(e),{recursive:!0}),yy.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var Ay,z5,Xe,Ni=l(()=>{"use strict";Ay=m(require("node:os")),z5=e=>{let t=e.trim();return t.startsWith("~/")?`${Ay.default.homedir()}${t.slice(1)}`:t==="~"?Ay.default.homedir():t},Xe=z5});var lu,IC,$5,OC,MC=l(()=>{"use strict";lu=m(require("node:fs")),IC=m(require("node:path"));kn();eo();$5=`*
!${Ed}
`,OC=e=>{let t=IC.default.join(e,bC);lu.default.existsSync(t)||(lu.default.mkdirSync(e,{recursive:!0}),lu.default.writeFileSync(t,$5))}});var go,Ze,fo=l(()=>{"use strict";go=m(require("node:path"));eo();Ni();Ze=e=>{let t=Xe(e),r=go.default.join(t,BL);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:go.default.join(r,"rag"),memoryDirPath:go.default.join(r,GL),reportsDirPath:go.default.join(r,qL),metaFilePath:go.default.join(r,Ed),ragChunksFilePath:go.default.join(r,"rag",VL)}}});var Lt,jC,H5,F5,Ge,by=l(()=>{"use strict";Lt=m(require("node:fs")),jC=m(require("node:path"));eo();MC();fo();H5=(e,t)=>{if(Lt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Lt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},F5=e=>{Lt.default.existsSync(e.ragChunksFilePath)||Lt.default.writeFileSync(e.ragChunksFilePath,"");let t=jC.default.join(e.memoryDirPath,un);Lt.default.existsSync(t)||Lt.default.writeFileSync(t,"")},Ge=e=>{let t=Ze(e.projectFolderPath);return Lt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Lt.default.mkdirSync(t.ragDirPath,{recursive:!0}),Lt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),OC(t.metaDirPath),H5(t,e),F5(t),{ok:!0,layout:t}}});var DC,zC,$C,HC,cu,du=l(()=>{"use strict";DC="components",zC="store",$C="versions",HC="installed.json",cu=e=>`harness-set:${e.trim()}`});var Py,FC,uu,wy=l(()=>{"use strict";Py=m(require("node:fs")),FC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),uu=e=>{if(!Py.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(Py.default.readFileSync(e,"utf8"));if(FC(t)&&t.version===1&&FC(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var ji,Rn,pu=l(()=>{"use strict";ji=m(require("node:path"));du();Rn=e=>{let t=ji.default.join(e,DC);return{componentsRootDir:t,storeDir:ji.default.join(t,zC),versionsDir:ji.default.join(t,$C),installedFilePath:ji.default.join(t,HC)}}});var vy,UC,mu,gu,fu=l(()=>{"use strict";vy=m(require("node:crypto")),UC=m(require("node:fs")),mu=e=>vy.default.createHash("sha256").update(e,"utf8").digest("hex"),gu=e=>{try{let t=UC.default.readFileSync(e);return vy.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var _y,BC,GC,VC=l(()=>{"use strict";_y=m(require("node:fs")),BC=m(require("node:path")),GC=(e,t)=>{_y.default.mkdirSync(BC.default.dirname(e),{recursive:!0}),_y.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var Wy,Ly,qC,KC=l(()=>{"use strict";Wy=m(require("node:fs")),Ly=m(require("node:path")),qC=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=Ly.default.join(e,r),n=Ly.default.join(o,`${t.versionId}.json`);Wy.default.mkdirSync(o,{recursive:!0}),Wy.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var hu,JC,YC,XC=l(()=>{"use strict";hu=m(require("node:fs")),JC=m(require("node:path"));fu();YC=e=>{let t=mu(e.content),r=JC.default.join(e.storeDir,t);return hu.default.existsSync(r)||(hu.default.mkdirSync(e.storeDir,{recursive:!0}),hu.default.writeFileSync(r,e.content)),t}});var Ey,ZC,U5,yu,Cy=l(()=>{"use strict";Ey=m(require("node:fs")),ZC=m(require("node:path"));du();wy();pu();fu();VC();KC();XC();U5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yu=e=>{let t=Rn(e.installDir),r=cu(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!U5(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=ZC.default.join(e.harnessRootDir,a);if(!Ey.default.existsSync(c))continue;let d=Ey.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:gu(c);if(p!==null){if(mu(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);YC({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;qC(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=uu(t.installedFilePath);GC(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var Ry,ky,QC,ek=l(()=>{"use strict";Ry=m(require("node:fs"));Cy();wy();pu();ky=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),QC=e=>{if(!Ry.default.existsSync(e.harnessManifestPath))return;let t=Rn(e.installDir),r=uu(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(Ry.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!ky(o)||o.version!==1||!ky(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!ky(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];yu({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var xy,tk,rk,ok=l(()=>{"use strict";xy=m(require("node:fs")),tk=m(require("node:path")),rk=e=>{let t=e.componentId.replaceAll("/","_"),r=tk.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!xy.default.existsSync(r))return null;try{let o=JSON.parse(xy.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Su,Au,nk,sk=l(()=>{"use strict";Su=m(require("node:fs")),Au=m(require("node:path"));du();ek();ok();pu();fu();nk=e=>{QC({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Rn(e.layout.installDir),r=cu(e.setSlug),o=rk({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Au.default.join(t.storeDir,i.contentSha256);if(Su.default.existsSync(a)&&gu(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Au.default.join(e.layout.harnessRootDir,n):Au.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Su.default.existsSync(s))return null;try{if(!Su.default.statSync(s).isFile())return null}catch{return null}return s}});var ik,B5,G5,wr,bu=l(()=>{"use strict";my();fy();fo();ik="harness-set:",B5=e=>{let t=e.trim();if(!t.startsWith(ik))return null;let r=t.slice(ik.length).trim();return r.length>0?r:null},G5=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=B5(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},wr=e=>{let t=Ze(e),{ledgerFilePath:r}=au(t),o=su(r);return G5(o)}});var Pu,Ty,Di,V5,Vt,zi,xn=l(()=>{"use strict";Pu=m(require("node:fs")),Ty=m(require("node:os")),Di=m(require("node:path")),V5=()=>Pu.default.realpathSync(Di.default.resolve(Ty.default.homedir())),Vt=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Di.default.join(Ty.default.homedir(),t.slice(1)):t,o;try{o=Pu.default.realpathSync(Di.default.resolve(r))}catch{return null}let n=V5();return o===n||o.startsWith(`${n}${Di.default.sep}`)?o:null},zi=e=>{let t=Vt(e);if(t===null)return null;try{if(!Pu.default.statSync(t).isFile())return null}catch{return null}return t}});var Iy,Oy=l(()=>{"use strict";Iy=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var vu,ak,wu,q5,$i,My=l(()=>{"use strict";vu=m(require("node:fs")),ak=m(require("node:path"));kn();WC();my();CC();fy();RC();TC();Ni();by();sk();bu();xn();Oy();wu=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),q5=e=>{if(!vu.default.existsSync(e))return null;try{let t=JSON.parse(vu.default.readFileSync(e,"utf8"));if(wu(t)&&t.version===1)return t}catch{return null}return null},$i=e=>{let t=[...new Set(e.setSlugs.map(b=>b.trim()).filter(b=>b.length>0))],r=Xe(e.projectFolderPath),o=Vt(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=vu.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Ge({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=au(s.layout),d=wr(o).filter(b=>!t.includes(b)),p=su(i),g=0;if(d.length>0){let b=EC({repoRoot:o,setSlugs:d,ledger:p});p=b.ledger,g=b.summary.removedPaths.length}if(t.length===0)return Sy(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:[]};let S=q5(e.layout.harnessManifestPath);if(S===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=wu(S.sets)?S.sets:{},y=0,u=0,A=0;for(let b of t){let f=h[b];if(!wu(f))return{ok:!1,errorMessage:`Harness set "${b}" is not installed locally.`};let w=typeof f.version=="number"?String(f.version):"1",v=ou(b),_=Array.isArray(f.items)?f.items:[];for(let L of _){if(!wu(L))continue;let C=typeof L.path=="string"?L.path.trim():"";if(C.length===0)continue;let x=Iy(C);if(x===null)continue;let I=kC(b,x),D=ak.default.posix.join(".cursor",I).replaceAll("\\","/"),re=typeof L.id=="string"?L.id.trim():"",B=nk({layout:e.layout,setSlug:b,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:C,manifestItemId:re});if(B===null)continue;let q=_C({repoRoot:o,backupsDir:a,repoRelativeDestination:D,sourceAbsolutePath:B,componentId:v,versionId:w,ledger:p});if(q.kind==="skipped_unchanged"){u+=1;continue}if(q.kind==="backed_up_user_file"){A+=1,y+=1,p={version:1,entries:{...p.entries,[D]:uy({componentId:v,versionId:w,sourceAbsolutePath:B,backupPath:q.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[D]:uy({componentId:v,versionId:w,sourceAbsolutePath:B})}}}}return y===0&&u===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(Sy(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:A,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:t})}});var lk,_u,K5,J5,Y5,X5,Z5,Q5,eV,tV,rV,Hi,Wu=l(()=>{"use strict";lk=m(require("node:crypto")),_u=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},K5=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},J5=(e,t)=>{let r=K5(t),o=_u(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},Y5=(e,t,r)=>{let o=J5(t,r);return`shared/items/${e}/${o}`},X5=["rules","skills","commands","instructions","agents"],Z5=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),Q5=(e,t)=>[...e.filter(o=>o.id!==t.id),t],eV=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},tV=e=>lk.default.createHash("sha256").update(e,"utf8").digest("hex"),rV=e=>({id:e.id,kind:e.kind,title:e.title,path:Y5(e.id,e.kind,e.title),contentSha256:tV(e.content)}),Hi=e=>{let t=new Date().toISOString(),r=e.existingManifest??Z5(e.hostname,t),o=_u(e.bundle.slug),n=eV(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...X5.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let g=rV(p);return{files:[...d.files,{relativePath:g.path,content:p.content}],nextItems:Q5(d.nextItems,g)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var vr,ck,Lu,oV,ho,Ny=l(()=>{"use strict";vr=m(require("node:fs")),ck=m(require("node:os")),Lu=m(require("node:path"));Wu();oV=e=>{if(!vr.default.existsSync(e))return null;try{let t=JSON.parse(vr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},ho=e=>{try{let t=oV(e.layout.harnessManifestPath),r=Hi({bundle:e.bundle,hostname:ck.default.hostname(),existingManifest:t});vr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)vr.default.mkdirSync(Lu.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Lu.default.join(e.layout.harnessRootDir,o.relativePath);vr.default.mkdirSync(Lu.default.dirname(n),{recursive:!0}),vr.default.writeFileSync(n,o.content)}return vr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var jy,dk=l(()=>{"use strict";Ny();My();jy=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=ho({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return $i({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var uk,pk=l(()=>{"use strict";uk=["rule","skill","command","instruction","agent"]});var mk,nV,sV,Et,Dy=l(()=>{"use strict";pk();mk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nV=e=>typeof e=="string"&&uk.includes(e),sV=e=>{if(!mk(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!nV(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Et=e=>{if(!mk(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=sV(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var gk,iV,zy,fk=l(()=>{"use strict";gk=require("node:zlib");Dy();iV="x-agent-witch-token",zy=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[iV]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,gk.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=Et(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var Hy,$y,_r,hk=l(()=>{"use strict";Hy=m(require("node:fs")),$y=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_r=e=>{if(!Hy.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(Hy.default.readFileSync(e.harnessManifestPath,"utf8"));if(!$y(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=$y(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!$y(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Eu,yk=l(()=>{"use strict";Eu=()=>"~"});var Sk,Ak,bk=l(()=>{"use strict";Sk=require("node:crypto"),Ak=e=>`local-${(0,Sk.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var Fy,Pk=l(()=>{"use strict";Fy=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Fi,Cu,Uy=l(()=>{"use strict";Fi=m(require("node:path")),Cu=e=>{let t=Fi.default.dirname(e),r=Fi.default.basename(t);return r==="agents"?Fi.default.basename(Fi.default.dirname(t)):r}});var Ui,qt,wk,aV,lV,cV,ku,vk,By=l(()=>{"use strict";Ui=m(require("node:fs")),qt=m(require("node:path"));bk();Pk();Uy();wk=new Set(["node_modules",".git","dist","build",".next","coverage"]),aV=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},lV=(e,t)=>{let r=qt.default.basename(t);if(e==="skill"){let o=t.split(qt.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},cV=e=>{let t=[],r=(n,s)=>{let i;try{i=Ui.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&wk.has(a.name))continue;let c=qt.default.join(n,a.name),d=s?qt.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;Fy(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=qt.default.join(e,n);Ui.default.existsSync(s)&&r(s,n)}let o=qt.default.join(e,"skills");return Ui.default.existsSync(o)&&r(o,"skills"),t},ku=e=>{let t=cV(e);if(t.length===0)return null;let r=qt.default.dirname(e),o=Cu(e),n=aV(o),s=t.map(i=>{let a=Fy(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:Ak(i.absolutePath),kind:a,title:lV(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},vk=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Ui.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||wk.has(a.name))continue;let c=qt.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var _k,Gy,dV,Vy,Wk=l(()=>{"use strict";_k=m(require("node:fs")),Gy=m(require("node:path"));By();xn();dV=e=>{let t=Vt(e.trim());if(t===null)return null;if(Gy.default.basename(t)===".cursor")return t;let r=Gy.default.join(t,".cursor");try{if(_k.default.statSync(r).isDirectory())return Vt(r)}catch{return null}return null},Vy=e=>{let t=dV(e.projectPath);if(t===null)return null;let r=ku(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var Lk,uV,Ru,qy,Ek=l(()=>{"use strict";Lk=m(require("node:path"));By();xn();Uy();uV=5,Ru=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},qy=e=>{let t=Vt(e.scanRoot.trim());if(t===null)return Ru(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of vk(t,uV,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=Vt(s);if(i===null)continue;let a=Cu(i);Ru(e.response,"folder",{cursorDir:i,groupName:a,repoPath:Lk.default.dirname(i)});let c=ku(i);c!==null&&(r.push(c),Ru(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Ru(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var Ck,kk,Rk=l(()=>{"use strict";Ck=m(require("node:path")),kk=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:Ck.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Me,xk,Ky,pV,Jy,Yy,xu,Xy,Bi,Tk=l(()=>{"use strict";Me=m(require("node:fs")),xk=m(require("node:os")),Ky=m(require("node:path"));Wu();Cy();xn();Rk();pV=e=>{if(!Me.default.existsSync(e))return null;try{let t=JSON.parse(Me.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Jy=e=>{let t=e.hostname??xk.default.hostname(),r=pV(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let g=zi(p.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let S=Me.default.readFileSync(g,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:S,setSlugs:[i.slug]})}let d=Hi({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Me.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Me.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=Ky.default.join(e.layout.harnessRootDir,i.relativePath);Me.default.mkdirSync(Ky.default.dirname(a),{recursive:!0}),Me.default.writeFileSync(a,i.content)}Me.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=_u(i.slug),d=r.sets[c];d!==void 0&&yu({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},Yy="reveal-cache.json",xu=(e,t)=>{Me.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Me.default.writeFileSync(`${e.harnessRootDir}/${Yy}`,`${JSON.stringify(t,null,2)}
`)},Xy=e=>{let t=`${e.harnessRootDir}/${Yy}`;Me.default.existsSync(t)&&Me.default.unlinkSync(t)},Bi=e=>{let t=`${e.harnessRootDir}/${Yy}`;if(!Me.default.existsSync(t))return null;try{let r=JSON.parse(Me.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return kk(r)}catch{return null}return null}});var yo=l(()=>{"use strict";My();dk();Oy();Ny();fk();Dy();Wu();hk();yk();Wk();xn();Ek();Tk()});var Zy,Ik=l(()=>{"use strict";yo();Ee();Zy=e=>{let t=M(e.profileEmail);return ho({bundle:e.bundle,layout:t})}});var Ok=l(()=>{"use strict";Ik();yo()});var mV,Mk,gV,Nk,So,Tu,jk=l(()=>{"use strict";mV=["agentwitch.com","www.agentwitch.com"],Mk=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,gV=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},Nk=e=>{let t=gV(e);return!!(mV.includes(t)||Mk.test(e.trim().toLowerCase()))},So=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return Nk(r)?Mk.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Tu=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:So(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Gi=l(()=>{"use strict";jk()});var Kt,Vi=l(()=>{"use strict";Kt=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var qi,Dk=l(()=>{"use strict";Ok();Gi();Vi();qi=e=>{if(!Kt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Et(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!So(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=Zy({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var Qy=l(()=>{"use strict";Dk()});var fV,Tn,eS=l(()=>{"use strict";fV=e=>e==="hourly"||e==="daily"||e==="weekdays",Tn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!fV(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Ki,Iu,zk,$k,tS,pt,Ou,Mu,Nu,ju,Du=l(()=>{"use strict";Ki=m(require("node:fs")),Iu=m(require("node:path"));eS();zk="automations.json",$k=e=>e.profileEmail!==null?Iu.default.join(e.installDir,"profiles",e.profileEmail,zk):Iu.default.join(e.installDir,zk),tS=()=>({version:1,automations:[]}),pt=e=>{let t=$k(e);if(!Ki.default.existsSync(t))return tS();try{let r=JSON.parse(Ki.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?tS():{version:1,automations:r.automations.flatMap(n=>{let s=Tn(n);return s!==null?[s]:[]})}}catch{return tS()}},Ou=(e,t)=>{let r=$k(e);Ki.default.mkdirSync(Iu.default.dirname(r),{recursive:!0}),Ki.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Mu=(e,t)=>{Ou(e,{version:1,automations:t})},Nu=(e,t)=>{let o=pt(e).automations.filter(n=>n.id!==t.id);Ou(e,{version:1,automations:[...o,t]})},ju=(e,t)=>pt(e).automations.find(r=>r.id===t)??null});var ze,Wr=l(()=>{"use strict";ze="x-agent-witch-token"});var Z,Ao,rS,Ji,oS,hV,nS,Yi,Xi,sS,Zi=l(()=>{"use strict";Wr();Ye();Z=e=>{let t=ke(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Ao=e=>({[ze]:e,"Content-Type":"application/json"}),rS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Ao(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Ji=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Ao(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},oS=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Ao(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},hV=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},nS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:Ao(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Yi=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:Ao(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return hV(r)}catch{return null}},Xi=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:Ao(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},sS=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Ao(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var bo,Hk,Fk,yV,iS,Uk,aS=l(()=>{"use strict";bo=m(require("node:fs")),Hk=m(require("node:path")),Fk=e=>Hk.default.join(e.harnessRootDir,"projects-registry.json"),yV=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),iS=e=>{let t=Fk(e);if(!bo.default.existsSync(t))return[];try{let r=JSON.parse(bo.default.readFileSync(t,"utf8"));return yV(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},Uk=e=>{let t=Fk(e);if(!bo.default.existsSync(t))return;let r=`${t}.migrated`;if(bo.default.existsSync(r)){bo.default.unlinkSync(t);return}bo.default.renameSync(t,r)}});var Bk,SV,AV,Gk,Vk=l(()=>{"use strict";Ni();Bk=e=>Xe(e),SV=e=>new Set(e.map(t=>Bk(t.folderPath))),AV=e=>new Set(e.map(t=>t.id)),Gk=(e,t)=>{let r=SV(t),o=AV(t),n=[],s=new Set;for(let i of e){let a=Bk(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var lS,cS=l(()=>{"use strict";Zi();aS();Vk();lS=async(e,t)=>{let r=iS(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Yi(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=Gk(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await nS(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&Uk(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var dS,Po,zu=l(()=>{"use strict";dS=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),Po=(e,t)=>e.find(r=>r.id===t)??null});var In,$u=l(()=>{"use strict";Zi();cS();zu();In=async(e,t)=>{t!==void 0&&await lS(t,e);let r=Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Yi(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Console. Check the Mac connection and try again."};let n=dS(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Console, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Console.`}}});var qk=l(()=>{"use strict"});var Ne,Kk,bV,PV,wV,vV,On,uS=l(()=>{"use strict";Ne=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Kk=(e,t)=>e.length===0?`<p class="empty">${Ne(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Ne(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Ne(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Console \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,bV=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,PV=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ne(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Console. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,wV=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?PV(e.project):bV();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
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
      </form>`},vV=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Ne(t)} from recent runs. Review in Agent Witch Console or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Ne(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},On=e=>{let t=e.flashError?`<div class="alert-error">${Ne(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ne(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(a,c)=>`<a class="project-tab${e.activeTab===a?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${a}">${Ne(c)}</a>`,n=e.composition?.items.filter(a=>a.kind==="workflow")??[],s=e.composition?.items.filter(a=>a.kind==="agent")??[],i="";return e.activeTab==="harness"?i=wV({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=Kk(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=Kk(s,"No agents installed for this project yet."):i=vV({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount}),`${t}<section class="card">
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
    </section>`}});var _V,WV,Jk,Yk=l(()=>{"use strict";yo();Wr();_V=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),WV=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[ze]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!_V(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Et(n);return s===null?[]:[s]})}catch{return null}},Jk=WV});var Xk,pS,Zk=l(()=>{"use strict";ce();yo();uS();$u();Yk();zu();bu();Zi();Xk=e=>({kind:"page",title:e.project.name,body:On({project:e.project,installed:_r(e.layout),linkedSetSlugs:wr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),pS=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=H();if(r===null)return{kind:"not_found"};let o=await In(r,e.layout),n=Po(o.projects,t);if(n===null)return{kind:"not_found"};let s=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s===null?null:await Jk(s,n.id);if(i===null)return Xk({layout:e.layout,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Console."});let a=jy({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:i});if(!a.ok)return Xk({layout:e.layout,project:n,errorMessage:a.errorMessage});let c=s===null?!1:await Xi(s,n.id,a.appliedSetSlugs),d=new URLSearchParams({linked:"1",files:String(a.writtenFileCount),bindingsSynced:c?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${d.toString()}`}}});var LV,mS,Qk=l(()=>{"use strict";LV=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,mS=LV});var eR,tR,EV,CV,Hu,Fu,rR=l(()=>{"use strict";eR=require("node:child_process"),tR=require("node:util"),EV=(0,tR.promisify)(eR.execFile),CV=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},Hu=async(e,t)=>{try{let{stdout:r}=await EV("git",t,{cwd:e,env:CV(),maxBuffer:1048576});return r.trim()}catch{return null}},Fu=async e=>{let t=await Hu(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await Hu(e,["rev-parse","--abbrev-ref","HEAD"]),o=await Hu(e,["status","--porcelain"]),n=await Hu(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var gS,oR=l(()=>{"use strict";gS=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var kV,fS,nR=l(()=>{"use strict";kV=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},fS=kV});var RV,hS,sR=l(()=>{"use strict";Wr();RV=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[ze]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},hS=RV});var iR,Lr,aR=l(()=>{"use strict";iR=require("node:child_process"),Lr=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,iR.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var lR=l(()=>{"use strict";$u()});var Qi,cR=l(()=>{"use strict";Wr();Qi=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[ze]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var mt=l(()=>{"use strict";$u();zu();qk();Ni();by();Zk();bu();Qk();rR();oR();nR();sR();aR();lR();cR();cS();aS();Zi()});var Uu,ea,dR,yS,wo,SS=l(()=>{"use strict";Uu=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},ea=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Uu(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},dR=e=>e>=1&&e<=5,yS=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Uu(t,"UTC")},wo=e=>{let t=e.from??new Date,r=Uu(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return ea(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=ea(r,e.timeZone,o,0),s=Uu(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?ea(yS(r),e.timeZone,o,0):n;if(!i&&dR(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=yS(a),dR(a.weekday))return ea(a,e.timeZone,o,0);return ea(yS(r),e.timeZone,o,0)}});var uR,AS,Jt,bS=l(()=>{"use strict";uR=require("node:crypto");ce();mt();SS();Du();AS=!1,Jt=async e=>{if(AS)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=H();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=ju(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};AS=!0;let n=(0,uR.randomUUID)();try{let s=await En(t,"claude-cli",o.prompt);await sS(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=wo({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return Nu(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{AS=!1}}});var Bu,pR=l(()=>{"use strict";ce();bS();Du();Bu=async()=>{let e=H();if(e===null)return;let t=pt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await Jt(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var ta=l(()=>{"use strict";Du();pR();bS();SS()});var mR=l(()=>{"use strict";ta()});var gR=l(()=>{"use strict";eS()});var fR=l(()=>{"use strict";gR()});var PS=l(()=>{"use strict";ta()});var xV,TV,ra,wS=l(()=>{"use strict";mR();fR();PS();Ee();xV=e=>e!==void 0&&e.trim().length>0?M(e.trim()):M(),TV=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??wo({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??wo({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},ra=e=>{let t=xV(e.profileEmail),r=pt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Tn(s);return i!==null?[TV(i,o.get(i.id))]:[]});return Mu(t,n),{ok:!0,writtenCount:n.length}}});var vS=l(()=>{"use strict";ta()});var hR=l(()=>{"use strict";ce()});var yR=l(()=>{"use strict";wS();vS();PS();hR()});var SR,oa,na,sa,AR=l(()=>{"use strict";SR=m(require("node:os"));yR();Gi();Vi();oa=e=>{if(!Kt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!So(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=ra({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},na=async e=>{if(!Kt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:So(t)?Jt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},sa=()=>{let e=H(),t=e!==null?pt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:SR.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var _S=l(()=>{"use strict";AR()});var Gu=l(()=>{"use strict";te()});var Vu=l(()=>{"use strict";te()});var qu,PR,wR,bR,IV,OV,Mn,WS=l(()=>{"use strict";qu=m(require("node:fs")),PR=m(require("node:os")),wR=m(require("node:path"));Gu();Vu();xi();Ee();bR=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},IV=e=>wR.default.join(PR.default.homedir(),"Library","LaunchAgents",`${e}.plist`),OV=async e=>qu.default.existsSync(IV(e))?(await Le(e)).ok:!1,Mn=async(e=E())=>{let t=qu.default.existsSync(tu(e)),r=!qu.default.existsSync(Dt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Ri(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await bR(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${oe(e)}-wake`;await OV(i)&&s.push(i);for(let c of ee(e))(await Le(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await bR(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var vR=l(()=>{"use strict";te()});var Nn,ia=l(()=>{"use strict";Nn="connection-health.json"});var vo,Ku,MV,aa,Pe,LS,Ju,je,Yu=l(()=>{"use strict";vo=m(require("node:fs")),Ku=m(require("node:path"));ia();MV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),aa=e=>e.profileEmail===null?Ku.default.join(e.installDir,Nn):Ku.default.join(e.installDir,"profiles",e.profileEmail,Nn),Pe=e=>{let t=aa(e);if(!vo.default.existsSync(t))return null;try{let r=JSON.parse(vo.default.readFileSync(t,"utf8"));return!MV(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},LS=e=>{let t=aa(e);vo.default.existsSync(t)&&vo.default.rmSync(t,{force:!0})},Ju=(e,t)=>{let r=aa(e),o=Pe(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};vo.default.mkdirSync(Ku.default.dirname(r),{recursive:!0}),vo.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},je=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var la,_R=l(()=>{"use strict";ia();Yu();la=(e,t)=>{if(!t.socketOpen)return!1;let r=Pe(e);return r===null?!1:!je(r,t.staleAfterMs??12e4,t.nowMs)}});var ES,WR=l(()=>{"use strict";Yu();ES=(e,t)=>!(e!==null&&!je(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var jn=l(()=>{"use strict";Yu();_R();WR();ia()});var CS=l(()=>{"use strict";jn();te()});var kS=l(()=>{"use strict";jn()});var RS=l(()=>{"use strict";te()});var ER,LR,ca,xS=l(()=>{"use strict";ER=m(require("node:fs"));Bt();Gu();Vu();Ee();LR=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},ca=async(e=E())=>{if(!ER.default.existsSync(Dt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await LR())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of ee(e))(await Le(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await LR();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var CR=l(()=>{"use strict";te()});var kR,_o,TS,NV,jV,DV,RR,zV,xR,Dn,Xu=l(()=>{"use strict";kR=require("node:crypto"),_o=m(require("node:fs")),TS=m(require("node:path"));Ee();NV="watchdog-log.ndjson",jV=200,DV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),RR=(e=E())=>{let t=M(),r=t.installDir===e?t.logsDir:dn({installDir:e,profileEmail:t.profileEmail});return TS.default.join(r,NV)},zV=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!DV(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},xR=(e,t=E())=>{let r={id:(0,kR.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=RR(t);_o.default.mkdirSync(TS.default.dirname(o),{recursive:!0});let n=_o.default.existsSync(o)?_o.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-jV+1)),JSON.stringify(r)];return _o.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Dn=(e=20,t=E())=>{let r=RR(t);if(!_o.default.existsSync(r))return[];let o=_o.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=zV(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var IS,OS,MS,NS=l(()=>{"use strict";wt();IS=qr.watchdogReinstallState,OS=900*1e3,MS=3e3});var TR=l(()=>{"use strict";NS()});var IR={};bt(IR,{verifyAgentWitchReviveAfterKickstart:()=>HV});var $V,HV,OR=l(()=>{"use strict";TR();kS();RS();Ee();$V=e=>new Promise(t=>{setTimeout(t,e)}),HV=async e=>{if(await $V(e.verifyDelayMs??MS),!await Yr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?M():M(e.profileEmail),o=Pe(r);return!je(o,e.staleAfterMs)}});var da,jS,FV,MR,NR,DS,zS,$S=l(()=>{"use strict";da=m(require("node:fs")),jS=m(require("node:path"));V();NS();FV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),MR=e=>jS.default.join(e,IS),NR=(e=E())=>{let t=MR(e);if(!da.default.existsSync(t))return null;try{let r=JSON.parse(da.default.readFileSync(t,"utf8"));return!FV(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},DS=(e=E(),t=Date.now())=>{let r=NR(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=OS:!0},zS=(e=E(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=MR(e);return da.default.mkdirSync(jS.default.dirname(o),{recursive:!0}),da.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var HS,jR=l(()=>{"use strict";te();$S();HS=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!DS())return{attempted:!1,ok:!1,targets:e};zS();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Le(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var DR=l(()=>{"use strict";$S();jR()});var FS=l(()=>{"use strict";Ye()});var zR=l(()=>{"use strict";Ye()});var $R,zn,HR,FR,UR,UV,BV,BR,GV,VV,GR,VR=l(()=>{"use strict";$R=require("node:child_process"),zn=m(require("node:fs")),HR=m(require("node:os")),FR=m(require("node:path")),UR=require("node:util");FS();zR();Ee();UV=(0,UR.promisify)($R.execFile),BV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),BR=e=>{let t=at(e),r=t===null?M():M(t);if(!zn.default.existsSync(r.configPath))return null;try{let o=JSON.parse(zn.default.readFileSync(r.configPath,"utf8"));return!BV(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},GV=e=>BR(e)?.wsUrl??null,VV=e=>{let t=GV(e);return t!==null?ke(t):Ce(e)?.appOrigin??null},GR=async e=>{let t=e?.installDir??E(),r=BR(t),o=r!==null?ke(r.wsUrl):VV(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=FR.default.join(HR.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{zn.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??at(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await UV("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{zn.default.existsSync(i)&&zn.default.unlinkSync(i)}}});var qR={};bt(qR,{attemptAgentWitchWatchdogReinstall:()=>qV});var qV,KR=l(()=>{"use strict";DR();VR();qV=async e=>HS(e,()=>GR())});var JR,YR,XR,KV,JV,YV,ua,US=l(()=>{"use strict";vR();CS();kS();RS();xS();WS();Gu();Vu();Ee();yn();CR();Xu();JR=e=>e===null?M():M(e),YR=async(e,t,r)=>{if(!await Yr(e))return"not_running";let n=JR(t);if(ct(n))return"healthy";let s=Pe(n);return je(s,r)?"stale_connection":"healthy"},XR=async e=>{let t=e?.staleAfterMs??12e4,r=E(),o=ee(r);return Promise.all(o.map(async n=>{let s=await YR(n.launchAgentLabel,n.profileEmail,t),i=JR(n.profileEmail),a=Pe(i),c=await Yr(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:je(a,t),needsRevive:s!=="healthy",reason:s}}))},KV=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},JV=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",YV=async e=>{let t=await Le(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(OR(),IR)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},ua=async e=>{if(!lt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=E();await Mn(r),await ca(r);let o=ee(r),n=[];for(let p of o){let g=await YR(p.launchAgentLabel,p.profileEmail,t);if(g==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:g});continue}n.push(await YV({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:g,staleAfterMs:t}))}if(n.length===0){let p=Jr();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(KR(),qR)),g=await p(n);s=g.attempted,i=g.ok,a=g.errorMessage,c=[...g.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&xR({event:JV(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:KV(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var ZR,Zu,QR=l(()=>{"use strict";ZR=m(require("node:os"));CS();Xu();US();Zu=async()=>{let e=await XR(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:ZR.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Dn(1)[0]??null}}});var BS=l(()=>{"use strict";WS();US();QR();Xu()});var pa,ma,ga,ex=l(()=>{"use strict";te();BS();pa=async()=>{await Mn();let e=ee(),t=[];for(let r of e){let o=await Le(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Jr();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},ma=ua,ga=ua});var GS=l(()=>{"use strict";ex()});var ep,Qu,tx,VS,rx,XV,ZV,QV,eq,tq,tp,ox=l(()=>{"use strict";ep=require("node:child_process"),Qu=m(require("node:fs")),tx=m(require("node:os")),VS=m(require("node:path")),rx=require("node:util");te();V();XV=(0,rx.promisify)(ep.execFile),ZV=()=>VS.default.join(tx.default.homedir(),"Library","LaunchAgents"),QV=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await XV("launchctl",["bootout",r]).catch(()=>{})},eq=e=>{let t=VS.default.join(ZV(),`${e}.plist`);Qu.default.existsSync(t)&&Qu.default.unlinkSync(t)},tq=e=>{(0,ep.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},tp=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=E();if(!Qu.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=zt(e);for(let r of t)await QV(r),eq(r);return tq(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var nx,rp,sx,$n,ix,rq,oq,nq,qS,sq,KS,ax=l(()=>{"use strict";nx=require("node:child_process"),rp=m(require("node:fs")),sx=m(require("node:os")),$n=m(require("node:path")),ix=require("node:util");te();rq=(0,ix.promisify)(nx.execFile),oq=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],nq=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],qS=e=>{rp.default.existsSync(e)&&rp.default.rmSync(e,{force:!0})},sq=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await rq("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},KS=async e=>{let r=(e.listLaunchAgentLabels??zt)(e.layout.installDir),o=e.launchAgentsDir??$n.default.join(sx.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??sq;for(let i of r)await n(i),qS($n.default.join(o,`${i}.plist`));let s=$n.default.dirname(e.layout.configPath);for(let i of oq)qS($n.default.join(s,i));for(let i of nq)qS($n.default.join(e.layout.installDir,i));return rp.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var JS,lx=l(()=>{"use strict";JS={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var YS,cx=l(()=>{"use strict";YS="unknown_identity"});var XS=l(()=>{"use strict";lx();cx()});var iq,ZS,dx=l(()=>{"use strict";XS();iq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ZS=e=>e.type!=="system.error"||!iq(e.payload)?!1:e.payload.errorCode===YS});var QS=l(()=>{"use strict";ox();ax();dx()});var op=l(()=>{"use strict";te();Ye();QS();BS()});var Hn,np,sp=l(()=>{"use strict";op();Hn=(e=20)=>Dn(e),np=Zu});var ip,Fn,ap,lp=l(()=>{"use strict";op();ip=co,Fn=(e=20)=>io(e),ap=e=>lo(e)});var cp,eA=l(()=>{"use strict";op();cp=()=>tp()});var ux=l(()=>{"use strict";dy();Qy();_S();GS();sp();lp();eA()});var px={};bt(px,{buildAgentWitchAutomationStatusFromWakeServer:()=>sa,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>ip,buildAgentWitchWakeHealthResponse:()=>Ii,buildAgentWitchWakeIdentityResponse:()=>Oi,buildAgentWitchWatchdogStatus:()=>np,installHarnessFromWakeServer:()=>qi,readAgentWitchSelfUpdateLogEntries:()=>Fn,readAgentWitchWatchdogLogEntries:()=>Hn,restartAgentWitchFromWakeServer:()=>ga,reviveAgentWitchWebSocketFromWakeServer:()=>ma,runAgentWitchSelfUpdateFromWakeServer:()=>ap,runAgentWitchUninstallLocalFromWakeServer:()=>cp,runAutomationFromWakeServer:()=>na,syncAutomationsFromWakeServer:()=>oa,wakeAgentWitchLaunchAgents:()=>pa});var mx=l(()=>{"use strict";ux()});var gx,fx,tA,rA,hx=l(()=>{"use strict";gx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),fx=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?gx(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?gx(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},tA=e=>{let t=e.watchdogLogs.map(fx).join(""),r=e.updateLogs.map(fx).join("");return`<!doctype html>
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
</html>`},rA=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var yx,Sx,Ax=l(()=>{"use strict";yx=m(require("node:net")),Sx=()=>new Promise((e,t)=>{let r=yx.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var bx,aq,oA,Px=l(()=>{"use strict";bx=m(require("node:net"));Ax();Ti();xi();Ee();aq=e=>new Promise(t=>{let r=bx.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),oA=async()=>{let e=E(),t=ut();if(await aq(t))return fC(t),t;let r=await Sx();return ru(e,r),r}});var lq,nA,wx=l(()=>{"use strict";lq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nA=e=>({force:lq(e)&&e.force===!0})});var fa=l(()=>{"use strict";Gi();hx();Px();wx();Bf();Td();ro()});var sA,j,iA,aA,ha,vx=l(()=>{"use strict";sA=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},iA=e=>{e.writeHead(403),e.end()},aA=e=>e.url?.split("?")[0]??"/",ha=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var gt=l(()=>{"use strict";vx()});var cq,_x,Wx=l(()=>{"use strict";_S();gt();cq=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},_x=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,sa(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await cq(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=oa(t);return j(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await na(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var dq,Ex,Lx,Cx,lA,kx,cA=l(()=>{"use strict";dq=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],Ex=e=>/embed|minilm|^bge-/i.test(e),Lx=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),Cx=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),lA=e=>e.filter(t=>t.trim().length>0&&!Ex(t)),kx=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!Ex(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>Lx(s,o));if(n!==void 0)return n}for(let n of dq){let s=r.find(i=>Lx(i,n));if(s!==void 0)return s}return r[0]??null}});var dA,Tx,Ix,dp,Ox,Rx,xx,uq,pq,mq,gq,fq,hq,ft,ya=l(()=>{"use strict";dA=require("node:child_process"),Tx=m(require("node:fs")),Ix=m(require("node:os")),dp=m(require("node:path"));Ye();dt();cA();Ox=3e3,Rx=["claude-cli","codex","cursor","antigravity"],xx={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},uq=(e,t)=>new Promise(r=>{let o=(0,dA.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},Ox);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),pq=()=>{let e=Ix.default.homedir();return["ollama",dp.default.join(e,".local","bin","ollama"),dp.default.join(e,".agent-witch","ollama","ollama"),dp.default.join(e,".local-agent-witch","ollama","ollama")]},mq=e=>new Promise(t=>{let r=(0,dA.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},Ox);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(Cx(Buffer.concat(o).toString("utf8")))})}),gq=async()=>{for(let e of pq()){if(e!=="ollama"&&!Tx.default.existsSync(e))continue;let t=await mq(e);if(t!==null)return t}return[]},fq=e=>{let t=e.installedWriterIds.map(s=>xx[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=ae(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${xx[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},hq=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:Sn},ft=async e=>{let t=Rx.map(i=>{let a=Fd(i,e.commands);return uq(a.command,a.args)}),[r,...o]=await Promise.all([gq(),...t]),n=Rx.flatMap((i,a)=>o[a]===!0?[i]:[]),s=kx(r,hq());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:fq({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var yq,Sq,uA,Mx=l(()=>{"use strict";yq="http://127.0.0.1:11434",Sq=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},uA=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||yq;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?Sq(await o.json()):null}catch{return null}}});var pA=l(()=>{"use strict";dt();ya();Mx();cA()});var Aq,Nx,jx=l(()=>{"use strict";pA();Aq={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},Nx=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:Aq[t]})),ollamaModels:lA(e.ollamaModels)})});var bq,Dx,zx=l(()=>{"use strict";pA();gt();jx();bq=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},Dx=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await ft({commands:le({})});return j(e.response,200,{ok:!0,...Nx({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await bq(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await uA({model:r,prompt:o});return n===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var Pq,$x,Hx=l(()=>{"use strict";Qy();gt();Pq=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},$x=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await Pq(e);if(t===null)return!0;let r=qi(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var Fx=l(()=>{"use strict";mt()});var mA,Ux=l(()=>{"use strict";Fx();Vi();mA=e=>{if(!Kt(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Ge({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var Bx,gA,fA=l(()=>{"use strict";ce();mt();Vi();Bx=e=>{if(!Kt(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},gA=async e=>{let t=Bx(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Lr("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=H();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=Z({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Ge({projectFolderPath:r}),await Qi(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Console."})}});var Gx=l(()=>{"use strict";Ux();fA()});var Vx,qx=l(()=>{"use strict";Gx();fA();gt();Vx=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=mA(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await gA(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,o,r,e.cors.headers),!0}return!1}});var Kx,Jx=l(()=>{"use strict";fa();lp();sp();Kx=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Hn(50),r=Fn(50);return e.response.writeHead(200,rA()),e.response.end(tA({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var Yx,Xx=l(()=>{"use strict";dy();gt();Yx=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,Ii(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,Oi(),e.cors.headers),!0):!1});var Zx,Qx=l(()=>{"use strict";eA();gt();Zx=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await cp();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var eT,tT=l(()=>{"use strict";GS();gt();eT=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await ma();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await ga();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await pa();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var rT,oT=l(()=>{"use strict";fa();lp();gt();rT=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=ip();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=ha(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:Fn(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=nA(t),o=await ap({force:r});return j(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var nT,sT=l(()=>{"use strict";sp();gt();nT=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await np();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=ha(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:Hn(t)},e.cors.headers),!0}return!1}});var iT,aT=l(()=>{"use strict";Wx();zx();Hx();qx();Jx();Xx();Qx();tT();oT();sT();iT=[Yx,Kx,nT,eT,rT,Zx,$x,Vx,_x,Dx]});var lT,cT=l(()=>{"use strict";aT();lT=async e=>{for(let t of iT)if(await t(e))return!0;return!1}});var wq,dT,uT=l(()=>{"use strict";Gi();gt();cT();wq=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:aA(e),readJsonBody:()=>sA(e)}),dT=async(e,t,r)=>{let o=e.headers.origin,n=Tu(o);try{if(o!==void 0&&o.length>0&&!n.allowed){iA(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=wq(e,t,r,n);if(await lT(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var pT,Wo,up,pp=l(()=>{"use strict";pT=m(require("node:http"));fa();uT();Wo=async()=>{let e=await oA(),t=pT.default.createServer((r,o)=>{dT(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},up=Wo});var mT={};bt(mT,{runAgentWitchBridgeCli:()=>vq});var vq,gT=l(()=>{"use strict";te();pp();vq=async()=>{Fe("agent-witch-bridge");let e=await Wo(),t=Ht(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var fT=l(()=>{"use strict";Bt()});var Un,hA,hT=l(()=>{"use strict";Un=(e,t,r)=>e===1?t:r,hA=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Un(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Un(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${Un(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Un(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Un(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${Un(p,"year","years")} ago`}});var Lo,yA,_q,Wq,SA,Er,Sa,AA,yT=l(()=>{"use strict";Lo=m(require("node:fs")),yA=m(require("node:path")),_q="local-ws-traffic.ndjson",Wq=500,SA=e=>yA.default.join(e.logsDir,_q),Er=(e,t)=>{let r=SA(e);Lo.default.mkdirSync(yA.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});Lo.default.appendFileSync(r,`${o}
`,"utf8")},Sa=(e,t=Wq)=>{let r=SA(e);if(!Lo.default.existsSync(r))return[];let n=Lo.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},AA=e=>{let t=SA(e);Lo.default.existsSync(t)&&Lo.default.writeFileSync(t,"","utf8")}});var Lq,ST,AT,bT=l(()=>{"use strict";XS();Lq=new Set(Object.values(JS)),ST=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),AT=e=>{if(!ST(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!Lq.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!ST(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var PT,wT=l(()=>{"use strict";PT=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var Eq,Cq,kq,Aa,vT=l(()=>{"use strict";wT();Eq=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,Cq=e=>Eq.test(e),kq=e=>PT(e),Aa=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>Aa(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&Cq(o)){r[o]=kq(n);continue}r[o]=Aa(n)}return r}});var Ct,bA,Rq,xq,Tq,PA,_T,WT,LT,Iq,mp,Eo,gp,wA,ET=l(()=>{"use strict";Ct=m(require("node:fs")),bA=m(require("node:path"));bT();vT();Rq="local-ws-trace.ndjson",xq=1e4,Tq=1440*60*1e3,PA=e=>bA.default.join(e.logsDir,Rq),_T=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},WT=e=>{if(!Ct.default.existsSync(e))return;let t=Ct.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-Tq,n=t.filter(s=>{let i=_T(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-xq);Ct.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},LT=(e,t)=>{let r=PA(e);Ct.default.mkdirSync(bA.default.dirname(r),{recursive:!0}),Ct.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),WT(r)},Iq=e=>e.parsed===null?{_empty:!0}:Aa(e.parsed),mp=(e,t,r)=>{let o=AT(r);LT(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:Iq(o)})},Eo=(e,t)=>{LT(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Aa({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},gp=(e,t=80)=>{let r=PA(e);if(WT(r),!Ct.default.existsSync(r))return[];let o=Ct.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=_T(s);i!==null&&n.push(i)}return n.reverse()},wA=e=>{let t=PA(e);Ct.default.existsSync(t)&&Ct.default.writeFileSync(t,"","utf8")}});var Cr,CT,Oq,vA,fp,kT=l(()=>{"use strict";Cr=m(require("node:fs")),CT=m(require("node:path")),Oq=256e3,vA=e=>{Cr.default.mkdirSync(CT.default.dirname(e),{recursive:!0}),Cr.default.writeFileSync(e,"","utf8")},fp=(e,t=Oq)=>{if(!Cr.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Cr.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=Cr.default.openSync(e,"r");try{Cr.default.readSync(a,i,0,s,n)}finally{Cr.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var ba=l(()=>{"use strict";yT();ET();kT()});var _A,WA,RT=l(()=>{"use strict";_A=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WA=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${_A(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${_A(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${_A(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var xT=l(()=>{"use strict";RT()});var LA,EA=l(()=>{"use strict";LA=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var CA=l(()=>{"use strict";ia()});var kA,RA,TT=l(()=>{"use strict";CA();kA=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},RA=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var IT=l(()=>{"use strict";EA();TT()});var OT,Pa,xA,wa=l(()=>{"use strict";EA();OT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Pa=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=OT(e),r=OT(LA(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},xA=`(function () {
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
})();`});var Co,Mq,TA,MT=l(()=>{"use strict";Co=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Mq=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},TA=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Co(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Co(r.direction):Co(r.kind),i=`trace-body-${o}`,a=Co(Mq(r.body));return`<tr>
        <td title="${Co(r.at)}">${Co(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${Co(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var jT,NT,IA,DT=l(()=>{"use strict";jT=m(require("node:path"));V();Bt();NT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IA=e=>{let t=oe(e.installDir),o=`AW_HOME="$HOME/${jT.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Live</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Console cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${NT(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${NT(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var zT=l(()=>{"use strict";wa();MT();DT();wa()});var Nq,Yt,va=l(()=>{"use strict";Nq=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Yt=Nq});var $T,HT,FT,UT,BT,GT,VT,Bn=l(()=>{"use strict";$T="projects",HT="knowledge",FT="chunks.ndjson",UT="lessons.ndjson",BT="error-chunks.ndjson",GT="usage-stats.json",VT="knowledge-location.json"});var hp,jq,yp,OA=l(()=>{"use strict";hp=m(require("node:path"));Bn();jq=(e,t)=>{let r=t.trim(),o=hp.default.join(e.installDir,$T,r,HT);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:hp.default.join(o,FT),memoryRunsFilePath:hp.default.join(o,UT)}},yp=jq});var MA,Dq,qT,KT=l(()=>{"use strict";MA=m(require("node:fs"));Bn();fo();Dq=e=>{let t=Ze(e.projectFolderPath),r=`${t.metaDirPath}/${VT}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};MA.default.mkdirSync(t.metaDirPath,{recursive:!0}),MA.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},qT=Dq});var Gn,YT,JT,zq,XT,ZT=l(()=>{"use strict";Gn=m(require("node:fs")),YT=m(require("node:path"));eo();fo();OA();KT();JT=(e,t)=>{Gn.default.existsSync(e)&&(Gn.default.existsSync(t)&&Gn.default.statSync(t).size>0||(Gn.default.mkdirSync(YT.default.dirname(t),{recursive:!0}),Gn.default.copyFileSync(e,t)))},zq=e=>{let t=Ze(e.projectFolderPath),r=yp(e.layout,e.projectId),o=`${t.memoryDirPath}/${un}`;JT(t.ragChunksFilePath,r.ragChunksFilePath),JT(o,r.memoryRunsFilePath),qT({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},XT=zq});var NA,$q,QT,e0=l(()=>{"use strict";NA=m(require("node:fs"));fo();$q=e=>{let t=Ze(e);if(!NA.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(NA.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},QT=$q});var t0,Hq,Vn,Sp=l(()=>{"use strict";t0=m(require("node:path"));eo();fo();ZT();e0();OA();Hq=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=QT(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){XT({layout:e.layout,projectFolderPath:t,projectId:o});let s=yp(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=Ze(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:t0.default.join(n.memoryDirPath,un),projectId:null}},Vn=Hq});var Ap,Uq,bp,jA=l(()=>{"use strict";Ap=m(require("node:fs"));Bn();Uq=(e,t=500)=>{if(!Ap.default.existsSync(e))return;let r=Ap.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Ap.default.writeFileSync(e,`${o.join(`
`)}
`)},bp=Uq});var Pp,Bq,ko,DA=l(()=>{"use strict";Pp=m(require("node:path"));Bn();Sp();Bq=e=>{let t=Vn(e);if(t===null)return null;let r=Pp.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Pp.default.join(r,GT),errorChunksFilePath:Pp.default.join(r,BT)}},ko=Bq});var o0,_a,n0,r0,zA,s0,qq,$A,i0,HA,FA,UA,BA=l(()=>{"use strict";o0=require("node:crypto"),_a=m(require("node:fs")),n0=m(require("node:path"));va();Bn();DA();r0=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),zA=e=>{if(!_a.default.existsSync(e))return r0();try{let t=JSON.parse(_a.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return r0()},s0=(e,t)=>{_a.default.mkdirSync(n0.default.dirname(e),{recursive:!0}),_a.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},qq=e=>{let t=Yt(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,o0.createHash)("sha256").update(o).digest("hex").slice(0,16)},$A=e=>{let t=ko(e);return t===null?null:zA(t.usageStatsFilePath)},i0=e=>{if(e.chunkIds.length===0)return;let t=ko(e);if(t===null)return;let r=zA(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;s0(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},HA=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=ko(e);if(r===null)return null;let o=qq(t),n=zA(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return s0(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},FA=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,UA=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var Wa,a0,Kq,Jq,l0,Yq,GA,La,qn,VA,Kn,qA,KA=l(()=>{"use strict";Wa=m(require("node:fs")),a0=m(require("node:path"));va();Sp();jA();BA();Kq="http://127.0.0.1:11434",Jq="nomic-embed-text",l0=(e,t,r)=>Vn({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,Yq=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},GA=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},La=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Kq,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||Jq;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},qn=(e,t,r)=>{let o=l0(e,t,r);if(o===null||!Wa.default.existsSync(o))return[];let n=Wa.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},VA=async e=>{let t=Yt(e.text),r=GA(t);if(r.length===0)return 0;let o=l0(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;Wa.default.mkdirSync(a0.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await La(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};Wa.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return bp(o),n},Kn=async e=>{let t=await La(e.query);if(t===null)return[];let r=e.minScore??0,s=qn(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:Yq(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return i0({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},qA=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Ea,c0,Xq,Zq,JA,YA,XA,d0=l(()=>{"use strict";Ea=m(require("node:fs")),c0=m(require("node:path"));va();DA();jA();KA();Xq=e=>{if(!Ea.default.existsSync(e))return[];let t=Ea.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},Zq=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},JA=async e=>{let t=ko(e);if(t===null)return 0;let r=Yt(e.text),o=GA(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;Ea.default.mkdirSync(c0.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await La(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};Ea.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return bp(n,200),s},YA=async e=>{let t=ko(e);if(t===null)return[];let r=await La(e.query);if(r===null)return[];let o=e.minScore??.3;return Xq(t.errorChunksFilePath).map(s=>({chunk:s,score:Zq(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},XA=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var ZA=l(()=>{"use strict";KA();BA();d0()});var QA,u0=l(()=>{"use strict";QA={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var p0=l(()=>{"use strict";u0()});var he,eb,tb=l(()=>{"use strict";p0();he=QA,eb=`
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
.sdlc-wizard-outcome-step > summary {
  cursor: pointer;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
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
.sdlc-history-filter { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem; }
.sdlc-history-filter [aria-pressed="true"] { outline: 2px solid var(--accent, #2563eb); }
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
`.trim()});var Qq,eK,rb,m0,ob,g0=l(()=>{"use strict";tb();wa();Qq=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,eK=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],rb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),m0=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${Qq}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,ob=e=>{let t=eK.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=rb(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=rb(e.installBundleVersionLabel?.trim()??"unknown"),s=m0("brand brand-in-sidebar",n),i=m0("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${rb(e.title)} \xB7 Agent Witch Local</title>
  <style>${eb}</style>
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
  <script>${xA}</script>
</body>
</html>`}});var wp,Ca,vp=l(()=>{"use strict";wp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ca=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${wp(e.syncMessage)}</p>`:"",o=wp(e.manageHref),n=wp(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${wp(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var nb,sb,ib,f0=l(()=>{"use strict";nb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,sb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,ib=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var h0=l(()=>{"use strict";g0();vp();f0()});var Jn,ab,y0=l(()=>{"use strict";wa();Jn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ab=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Jn(e.wakeError)}</div>`:"",a=Pa(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Jn(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${Jn(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Jn(o)}</p>
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
        <p class="home-card-meta">${Jn(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Jn(n)}</p>
      </a>
    </div>`}});var S0=l(()=>{"use strict";y0()});var _p,Wp,Lp,A0,lb=l(()=>{"use strict";_p="support-reply",Wp="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",Lp=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),A0=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Ep,b0,P0=l(()=>{"use strict";lb();Ep=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),b0=()=>`<section class="card">
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
      <p>${Ep(Wp)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Ep(Lp)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Ep(A0)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Ep(_p)}">Run this sample</a>
      </div>
    </section>`});var k,Yn=l(()=>{"use strict";k=e=>e==="passed"||e==="stopped"||e==="failed"});var w0,cb,Ro,db,ka=l(()=>{"use strict";w0="Stopped at the round limit. The best prompt is kept.",cb="Stopped because the score stopped rising. The best prompt is kept.",Ro="Finished. The best prompt is the result.",db="Wizard ended. Progress from finished steps is kept."});var Ra,ub=l(()=>{"use strict";Ra=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var tK,rK,xa,v0,Cp=l(()=>{"use strict";tK=/\n+|;\s+/,rK=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,xa=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(tK).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,rK(s)]},[]);return[...t,...o]},[]),v0=e=>{let t=xa(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ne,Xn=l(()=>{"use strict";ne=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Ta,pb=l(()=>{"use strict";Cp();Xn();Ta=e=>{let t=[...e.priorRounds,e.current],r=ne(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:v0(o)}}});var mb,oK,nK,kp,gb=l(()=>{"use strict";mb={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},oK=e=>{try{let t=JSON.parse(e.fragment);return{...mb,objects:[...e.objects,t]}}catch{return{...mb,objects:e.objects}}},nK=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:oK(r)},kp=e=>[...e].reduce(nK,mb).objects});var sK,fb,iK,_0,hb=l(()=>{"use strict";gb();sK=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},fb=e=>{let t=kp(e).filter(sK),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},iK=(e,t)=>({...e,passed:e.score>=t}),_0=(e,t)=>{let r=fb(e);return r===null?null:iK(r,t)}});var yb,Sb,Rp=l(()=>{"use strict";yb="The judge reply needs a score and a reason.",Sb="The improver reply was empty."});var W0,L0=l(()=>{"use strict";W0=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var E0,C0=l(()=>{"use strict";E0=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var lK,k0,R0=l(()=>{"use strict";L0();C0();ka();Cp();lK=e=>{let t=xa(e);return t.length===0?cb:`${cb} Avoid: ${t.join("; ")}.`},k0=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:w0};if(W0(e.scores)>=3){let t=e.scores.map((r,o)=>({score:r,reasons:e.reasons?.[o]??""}));return{type:"stopped",errorMessage:lK(E0(t))}}return null}});var kr,cK,Ab,x0,xp=l(()=>{"use strict";kr=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},cK=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,Ab=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",cK(e.tokens),`Delay: ${kr(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},x0=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var dK,T0,I0=l(()=>{"use strict";hb();dK=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,T0=e=>{let r=(dK.exec(e)?.[1]??e).trim();return r.length===0||fb(r)!==null?null:r}});var O0,Tp,M0=l(()=>{"use strict";xp();I0();Rp();O0=e=>({type:"call",role:"judge",choice:e.choice,prompt:x0({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),Tp=e=>{let t=T0(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:Sb}}:{nextPrompt:t,continuation:O0({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var bb,N0=l(()=>{"use strict";ub();pb();hb();Rp();ka();R0();Rp();M0();bb=e=>{let t=_0(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:yb}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=k0({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=Ta({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:Ra({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var Ia,Pb=l(()=>{"use strict";Ia=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var j0=l(()=>{"use strict"});var D0=l(()=>{"use strict"});var uK,z0,$0=l(()=>{"use strict";uK=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},z0=e=>[...e].reduce(uK,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var pK,H0,F0=l(()=>{"use strict";pK=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},H0=e=>[...e].reduce(pK,{out:"",inString:!1,escaped:!1}).out});var mK,gK,U0,B0=l(()=>{"use strict";$0();F0();mK=e=>e.charCodeAt(0)===65279?e.slice(1):e,gK=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},U0=e=>H0(z0(gK(mK(e))))});var fK,hK,yK,G0,SK,Oa,Ip=l(()=>{"use strict";gb();B0();fK=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},hK=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},yK=e=>[...e].reduce(hK,{out:"",inString:!1,escaped:!1}).out,G0=e=>{let t=kp(e);return t.length===0?null:t[t.length-1]},SK=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Oa=e=>{let t=U0(fK(e)),r=G0(t);if(r!==null)return r;let o=yK(t),n=G0(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw SK(i)}}});var V0=l(()=>{"use strict";ka();Ip()});var q0=l(()=>{"use strict"});var K0=l(()=>{"use strict";q0()});var vb,J0=l(()=>{"use strict";vb=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var AK,_b,Y0=l(()=>{"use strict";xp();AK=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,_b=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",AK(e.tokens),`Delay: ${kr(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var bK,PK,wK,Wb,X0=l(()=>{"use strict";bK=/[A-Za-z0-9_./~-]{3,180}/g,PK=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,wK=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||PK.test(t)},Wb=(e,t=12)=>{let r=[];for(let o of e.matchAll(bK)){let n=o[0].replace(/\.+$/,"");if(!(!wK(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var Ma,Z0=l(()=>{"use strict";Ma=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var Op,Lb,Q0,Eb,Cb=l(()=>{"use strict";Op=e=>Math.floor(e/2),Lb=e=>Math.max(Op(e)+1,e-20),Q0=(e,t)=>e>=t?"passes":e>=Lb(t)?"close":e>=Op(t)?"weak":"bad",Eb=e=>[{band:"bad",label:`0\u2013${Op(e)-1} bad`},{band:"weak",label:`${Op(e)}\u2013${Lb(e)-1} weak`},{band:"close",label:`${Lb(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var Mp,kb=l(()=>{"use strict";Cb();Mp=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${Q0(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var xo,Rb=l(()=>{"use strict";xo=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var eI,tI=l(()=>{"use strict";eI=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var vK,_K,rI,oI=l(()=>{"use strict";Yn();kb();Rb();tI();vK=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],_K=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",rI=e=>{let t=e.wizard;if(t===void 0)return[];let r=xo(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=vK.map((p,g)=>{let S=!s&&!n&&g===r?"active":"done";return{id:`wizard-${g+1}`,label:p,state:S,detail:null}}).filter((p,g)=>s?!0:g<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=eI(t)&&(!n||a)?Mp(e):[],d=k(e.status)&&!s?[{id:"end",label:_K(e),state:"done",detail:e.errorMessage}]:[];return[...i,...c,...d]}});var WK,xb,nI=l(()=>{"use strict";Yn();kb();oI();WK=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",xb=e=>{if(e.wizard!==void 0)return rI(e);let t=Mp(e),r=k(e.status)?[{id:"end",label:WK(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var Na,sI=l(()=>{"use strict";Na=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var iI=l(()=>{"use strict";Bt()});var aI,ja,Da,Qn,Np,Tb,lI=l(()=>{"use strict";iI();aI="/prompt-optimizer/agent",ja=`${Ut}${aI}`,Da=`${Ut}/prompt-optimizer`,Qn="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",Np=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${Qn}`,Tb="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var Xt=l(()=>{"use strict"});var Ib,cI=l(()=>{"use strict";Ib="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var dI,uI=l(()=>{"use strict";dI=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var za,mI=l(()=>{"use strict";uI();Xt();za=e=>({schemaVersion:3,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:dI(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{}})});var Ob,gI=l(()=>{"use strict";Ob=e=>({...e,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null}))})});var Mb,fI=l(()=>{"use strict";Xt();Mb=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var hI,Nb,yI=l(()=>{"use strict";hI=["generalize","evaluate","separate","optimize_modules"],Nb=(e,t)=>{let r=hI.indexOf(t);if(r===-1)return e;let o=hI.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var jp,jb=l(()=>{"use strict";Cp();jp=e=>{let t=xa(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var Db,SI=l(()=>{"use strict";jb();Db=e=>{let t=jp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var EK,CK,kK,AI,bI=l(()=>{"use strict";EK=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),CK=/^\{\{[a-zA-Z0-9_-]+\}\}$/,kK=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(EK(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},AI=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>CK.test(n)?n:kK(n,r)).join("")}});var zb,PI=l(()=>{"use strict";bI();zb=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:AI(o.prompt,t)}))}))});var RK,Hb,wI=l(()=>{"use strict";Xt();jb();RK=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Hb=e=>{let t=jp(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=RK(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Fb,vI=l(()=>{"use strict";Pb();Fb=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return Ia({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var $a,Ub=l(()=>{"use strict";Xn();$a=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ne(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var Bb,_I=l(()=>{"use strict";Ub();Bb=e=>{let t=$a({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Ha,WI=l(()=>{"use strict";Ha=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var xK,TK,de,Gb=l(()=>{"use strict";Xt();xK=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},TK=e=>e.status==="passed"&&(e.statistics?.bestScore??0)>=70,de=e=>{let t=e.modules.map((s,i)=>({moduleId:s.moduleId,title:s.title,bestScore:s.statistics?.bestScore??null,tokens:xK(e,i),status:s.status})),r=t.length,o=t.filter((s,i)=>TK(e.modules[i])).length,n=r>0&&o===r?"passed":"stopped";return{passedModuleCount:o,totalModules:r,terminalStatusSuggestion:n,rows:t}}});var Vb,LI=l(()=>{"use strict";Xt();Gb();Vb=e=>{let t=de(e.wizard),r=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${70})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(o=>`| ${o.title.replaceAll("|","\\|")} | ${o.bestScore??"\u2014"} | ${o.tokens??"\u2014"} | ${o.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&r.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((o,n)=>{let s=o.statistics?.bestRunOutput?.trim();s===void 0||s.length===0||r.push("",`## Module ${n+1}: ${o.title}`,"","```",s,"```")}),`${r.join(`
`)}
`}});var qb,EI=l(()=>{"use strict";qb=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var ht,IK,Kb,CI=l(()=>{"use strict";ht=m(Hs());Ip();IK=(0,ht.isType)({name:ht.isNonEmptyString,description:ht.isString,sampleValue:ht.isString}),Kb=e=>{let t=Oa(e);if(!(0,ht.isType)({templatedPrompt:ht.isNonEmptyString,variables:(0,ht.isArrayWithEachItem)(IK)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var se,OK,MK,Jb,kI=l(()=>{"use strict";se=m(Hs());Xt();Ip();OK=(0,se.isType)({id:se.isNonEmptyString,title:se.isNonEmptyString,prompt:se.isNonEmptyString,order:se.isNumber}),MK=(0,se.isType)({id:se.isNonEmptyString,title:se.isNonEmptyString,summary:se.isString,topology:(0,se.isOneOf)("chain","parallel"),modules:(0,se.isArrayWithEachItem)(OK),recommended:se.isBoolean}),Jb=e=>{let t=Oa(e);if(!(0,se.isType)({options:(0,se.isArrayWithEachItem)(MK)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var es,RI=l(()=>{"use strict";es=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var NK,Fa,Yb=l(()=>{"use strict";NK=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Fa=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(NK,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Ua,Ba,xI=l(()=>{"use strict";Xn();Yb();Ua=e=>Fa(e.templatedPrompt,e.variables),Ba=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ne(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Ua(e.wizard)}});var jK,Ga,TI=l(()=>{"use strict";jK=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ga=(e,t)=>e.replace(jK,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var DK,To,Dp=l(()=>{"use strict";DK=/\{\{([a-zA-Z0-9_-]+)\}\}/g,To=e=>{let t=new Set,r=[];for(let o of e.matchAll(DK)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Va,II=l(()=>{"use strict";Dp();Va=e=>e.variables.length>0||To(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var Xb,Zb=l(()=>{"use strict";Xt();Xb=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var qa,OI=l(()=>{"use strict";Xn();Zb();qa=e=>{let t=e.wizard.evaluateSelectedRound??ne(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:Xb(r.judgement)}});var Ka,MI=l(()=>{"use strict";Ka=e=>e.length===1&&e[0].modules.length===1});var Qb,NI=l(()=>{"use strict";Qb=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var ye,zp,Ja=l(()=>{"use strict";ye=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),zp=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var jI,DI=l(()=>{"use strict";Ja();jI=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[ye("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),ye("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[ye("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var zI,$I=l(()=>{"use strict";Yn();Ja();zI=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!k(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[ye("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),ye("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),ye("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",zp(e.writerLabel,e.folder)),ye("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[ye("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var HI,FI=l(()=>{"use strict";Ja();HI=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[ye("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),ye("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[ye("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var UI,BI=l(()=>{"use strict";Ja();UI=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[ye("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),ye("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",zp(e.writerLabel,e.folder)),...r?[ye("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var eP,GI=l(()=>{"use strict";Yn();DI();$I();FI();BI();eP=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(k(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return zI(r);case"evaluate":return jI({...r,currentRound:e.currentRound});case"separate":return UI(r);case"optimize_modules":return HI({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Ya,Io,VI=l(()=>{"use strict";Ya=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),Io=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var zK,$p,tP,qI=l(()=>{"use strict";Dp();zK="wizardParam_",$p=e=>`${zK}${e}`,tP=e=>{let t=To(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=$p(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var Oo,KI=l(()=>{"use strict";Oo=["generalize","evaluate","separate","optimize_modules"]});var R=l(()=>{"use strict";Yn();ka();N0();ub();xp();Pb();j0();D0();V0();K0();J0();Y0();X0();pb();Z0();Xn();nI();Rb();Cb();sI();lI();Xt();cI();mI();gI();fI();yI();SI();PI();wI();vI();Ub();_I();WI();Gb();LI();EI();CI();kI();RI();xI();Yb();TI();Dp();II();OI();MI();Zb();NI();GI();VI();qI();KI()});var rP,Hp,$K,ZI,QI=l(()=>{"use strict";rP=m(require("node:fs")),Hp=m(require("node:path")),$K=e=>Hp.default.join(Hp.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),ZI=(e,t)=>{let r=$K(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;rP.default.mkdirSync(Hp.default.dirname(r),{recursive:!0}),rP.default.appendFileSync(r,o,"utf8")}});var ts,eO,HK,tO,FK,rO,kt,J,oO,F,Ve=l(()=>{"use strict";ts=m(require("node:fs")),eO=m(require("node:path"));R();QI();HK=e=>e.wizard===void 0?e:{...e,wizard:Ob(e.wizard)},tO=new Set,FK=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),rO=(e,t)=>{ts.default.mkdirSync(eO.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;ts.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),ts.default.renameSync(r,e)},kt=e=>{if(!ts.default.existsSync(e))return[];try{let t=JSON.parse(ts.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(FK).map(HK):[]}catch{return[]}},J=(e,t)=>kt(e).find(r=>r.id===t)??null,oO=(e,t)=>{tO.add(t);let r=kt(e).filter(o=>o.id!==t);rO(e,r)},F=(e,t)=>{if(tO.has(t.id))return;let r=kt(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];rO(e,o),ZI(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var nO,Fp,oP,No,nP,Qe,jo,Se,qe=l(()=>{"use strict";nO=m(require("node:fs")),Fp=m(require("node:os")),oP=m(require("node:path"));mt();No="~",nP=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Qe=e=>{let t=Fp.default.homedir(),r=nP(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},jo=e=>{let t=e.trim().length===0?"~":e.trim(),r=Xe(t),o=oP.default.isAbsolute(r)?nP(r):nP(oP.default.resolve(Fp.default.homedir(),r));try{if(!nO.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:Qe(o)}},Se=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Fp.default.homedir()});var Xa=l(()=>{"use strict";dt();ya();Ud()});var UK,sO,iO=l(()=>{"use strict";Xa();UK=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,sO=e=>{let t=vn(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(UK)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var BK,GK,aO,sP,VK,qK,yt,lO,cO,Do=l(()=>{"use strict";Xa();iO();BK="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",GK="The writer waited on terminal input and did not return a prompt.",aO=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,sP=e=>{let t=e.trim();if(t.length===0||t.length>=500||!aO.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>aO.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},VK=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},qK=e=>sP(e.stdout)??sP(e.stderr)??(VK(e.replyFile)?sP(e.replyFile):null),yt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return BK;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?GK:null},lO=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],cO=e=>{let t=e.replyFileText?.trim()??"",r=yt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=qK({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null)return{ok:!1,errorMessage:o};let n=sO([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=vn(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply."}}});var rs,Rt,Za,dO,Up,KK,uO,pO,mO,iP=l(()=>{"use strict";rs=m(require("node:fs")),Rt=m(require("node:path")),Za=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},dO=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Up=(e,t)=>{let r=Za(e);return r.length>0?r:Za(t)},KK=e=>{let t=Up(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${dO(o)}`,...n.length>0?[`description: ${dO(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},uO=e=>`.cursor/skills/${e}/SKILL.md`,pO=(e,t)=>{let r=Za(t);if(r.length===0)return!1;let o=Rt.default.resolve(e),n=Rt.default.resolve(o,".cursor","skills"),s=Rt.default.resolve(o,uO(r));return s.startsWith(`${n}${Rt.default.sep}`)?rs.default.existsSync(s):!1},mO=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Up(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Rt.default.resolve(e.workingDirectory);try{if(!rs.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=KK({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=uO(r.slug),n=Rt.default.resolve(t,".cursor","skills"),s=Rt.default.resolve(t,o);if(!s.startsWith(`${n}${Rt.default.sep}`))return{ok:!1,errorCode:"path"};if(rs.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{rs.default.mkdirSync(Rt.default.dirname(s),{recursive:!0}),rs.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var JK,gO,fO,hO=l(()=>{"use strict";R();R();Ve();qe();Do();iP();JK=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,gO=e=>{let t=e.get("savedSkill");return t!==null&&JK.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},fO=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=J(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!k(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ne(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||yt(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=mO({workingDirectory:Se(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var Rr,Qa=l(()=>{"use strict";R();Rr=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=Qb(t);return{...e,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Ya(r.variables)},updatedAt:new Date().toISOString()}}});var xr,el=l(()=>{"use strict";xr=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var T,YK,Bp,ue,zo,SO,yO,AO,bO,xe=l(()=>{"use strict";T="manual",YK=["claude-cli","codex","cursor","antigravity"],Bp={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ue=e=>e===T?"You":e in Bp?Bp[e]:e,zo=e=>YK.filter(t=>e.includes(t)),SO=e=>{let t=zo(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},yO=(e,t)=>t===T?T:e.find(r=>r===t)??null,AO=(e,t,r)=>{let o=zo(e),n=yO(o,t),s=yO(o,r);return n===null||s===null?null:{judge:n,improver:s}},bO=(e,t,r)=>{let o=zo(e);return t===null||t.trim()===""?r!==T?r:o[0]??null:t===T?null:o.find(n=>n===t)??null}});var aP,PO,wO=l(()=>{"use strict";aP={ok:!1,errorMessage:"Stopped.",stopped:!0},PO=(e,t,r)=>{if(t===void 0)return;let o=()=>{e.kill("SIGTERM"),r(aP)};if(t.aborted){o();return}t.addEventListener("abort",o,{once:!0})}});var vO,tl,_O,lP,XK,ZK,QK,et,rl=l(()=>{"use strict";vO=require("node:child_process"),tl=m(require("node:fs")),_O=m(require("node:os")),lP=m(require("node:path"));Xa();wO();Do();XK=["claude-cli","codex","cursor","antigravity"],ZK=18e4,QK=e=>XK.includes(e),et=e=>new Promise(t=>{if(e.signal?.aborted){t(aP);return}if(!QK(e.writerAgent)){t({ok:!1,errorMessage:"The writer did not reply."});return}let r=e.writerAgent,o=Wt(r,e.prompt,le({}));if(o===null){t({ok:!1,errorMessage:"The writer did not reply."});return}if(!tl.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=lP.default.join(tl.default.mkdtempSync(lP.default.join(_O.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),s=lO({writerAgent:r,baseArgs:o.args,replyPath:n}),i=[],a=[],c={settled:!1,timer:void 0},d=(0,vO.spawn)(o.command,[...s],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),p=g=>{c.settled||(c.settled=!0,clearTimeout(c.timer),t(g))};PO(d,e.signal,p),c.timer=setTimeout(()=>{d.kill("SIGTERM"),p({ok:!1,errorMessage:"The writer did not reply."})},e.timeoutMs??ZK),d.stdout.on("data",g=>{i.push(Buffer.from(g))}),d.stderr.on("data",g=>{a.push(Buffer.from(g))}),d.on("error",()=>p({ok:!1,errorMessage:"The writer did not reply."})),d.on("close",()=>{let g=tl.default.existsSync(n)?tl.default.readFileSync(n,"utf8"):null;p(cO({writerAgent:r,stdout:Buffer.concat(i).toString("utf8"),stderr:Buffer.concat(a).toString("utf8"),replyFileText:g}))})})});var WO,e8,ol,Gp,Vp=l(()=>{"use strict";R();xe();WO=e=>e===T?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},e8=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),ol=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=bb({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:WO(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:Ma(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=e8(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i}},Gp=(e,t,r=null)=>{let o=Tp({raw:t,judge:WO(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var qp,cP=l(()=>{"use strict";qp=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var CO,Kp,Jp,LO,EO,dP,t8,kO,uP,r8,RO,o8,n8,xO,TO=l(()=>{"use strict";CO=require("node:child_process"),Kp=m(require("node:fs")),Jp=m(require("node:path"));R();LO=4e3,EO=12e3,dP=(e,t)=>{let r=(0,CO.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},t8=e=>dP(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",kO=e=>{let t=dP(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},uP=(e,t)=>{let r=Jp.default.resolve(e,t),o=Jp.default.relative(e,r);if(o.startsWith("..")||Jp.default.isAbsolute(o)||!Kp.default.existsSync(r)||!Kp.default.statSync(r).isFile())return null;let n=Kp.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>LO?`${n.slice(0,LO)}
\u2026truncated`:n},r8=e=>e.length>EO?`${e.slice(0,EO)}
\u2026truncated`:e,RO=e=>{let t=Wb(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,uP(e.workingDirectory,n)])),o=t8(e.workingDirectory);return{git:o,status:o?kO(e.workingDirectory):{},files:r,paths:t}},o8=(e,t)=>{let r=dP(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=uP(e,t);return o===null?`${t} is missing.`:o},n8=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",xO=e=>{let t=e.before.git?kO(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=uP(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>o8(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:n8(e.before.git,e.before.paths.length>0),evidence:r8(i.join(`

`))}}});var gP,U,fP,ve,IO,s8,i8,OO,os,MO,ns,a8,l8,nl,pP,mP,c8,NO,d8,u8,p8,jO,m8,DO,zO,g8,f8,$O,HO=l(()=>{"use strict";gP=require("node:child_process"),U=m(require("node:fs")),fP=m(require("node:os")),ve=m(require("node:path")),IO=8e6,s8=16e6,i8=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],OO=(e,t)=>{let r=(0,gP.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},os=(e,t)=>(0,gP.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,MO=e=>{let t=OO(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},ns=(e,t)=>{let r=ve.default.resolve(e,t),o=ve.default.relative(e,r);return o.startsWith("..")||ve.default.isAbsolute(o)?null:r},a8=(e,t)=>{let r=ns(e,t);if(r===null||!U.default.existsSync(r))return null;let o=U.default.statSync(r);return!o.isFile()||o.size>IO?null:U.default.readFileSync(r)},l8=(e,t,r)=>{let o=ns(e,t);o!==null&&(U.default.mkdirSync(ve.default.dirname(o),{recursive:!0}),U.default.writeFileSync(o,r))},nl=(e,t)=>{let r=ns(e,t);r===null||!U.default.existsSync(r)||U.default.rmSync(r,{recursive:!0,force:!0})},pP=(e,t)=>os(e,["cat-file","-e",`HEAD:${t}`]),mP=e=>{let t=OO(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},c8=e=>ve.default.resolve(e)!==ve.default.resolve(fP.default.homedir()),NO=e=>{if(!U.default.existsSync(e))return 0;let t=U.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?U.default.readdirSync(e).reduce((r,o)=>r+NO(ve.default.join(e,o)),0):0},d8=(e,t,r)=>{let o=ns(e,r);if(o===null||!U.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(NO(o)>s8)return{relativePath:r,existed:!0,copyDir:null};let n=ve.default.join(t,"cache",r);return U.default.mkdirSync(ve.default.dirname(n),{recursive:!0}),U.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},u8=400,p8=32e6,jO=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!U.default.existsSync(s)))for(let i of U.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=ve.default.join(s,i),c=U.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>IO)){if(t.length>=u8||r+c.size>p8){o=!1;return}r+=c.size,t.push(ve.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},m8=(e,t,r)=>{let o=ns(e,r);if(o===null||!U.default.existsSync(o))return null;let n=a8(e,r);if(n===null)return"skip";let s=ve.default.join(t,"files",r);return U.default.mkdirSync(ve.default.dirname(s),{recursive:!0}),U.default.writeFileSync(s,n),s},DO=e=>{let t=U.default.mkdtempSync(ve.default.join(fP.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?MO(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:jO(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,m8(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?mP(e.workingDirectory):null,isolateCaches:c8(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:i8.map(i=>d8(e.workingDirectory,t,i))}},zO=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){nl(e.workingDirectory,t);return}l8(e.workingDirectory,t,U.default.readFileSync(r))}},g8=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?zO(e,t):pP(e.workingDirectory,t)?os(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):nl(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&pP(e.workingDirectory,t)&&os(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!pP(e.workingDirectory,t)&&os(e.workingDirectory,["reset","-q","HEAD","--",t])},f8=(e,t)=>{let r=ns(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){nl(e.workingDirectory,t.relativePath),U.default.mkdirSync(ve.default.dirname(r),{recursive:!0}),U.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){nl(e.workingDirectory,t.relativePath);return}if(U.default.existsSync(r))for(let o of U.default.readdirSync(r)){let n=ve.default.join(r,o);U.default.statSync(n).mtimeMs>=e.startedMs-1e3&&U.default.rmSync(n,{recursive:!0,force:!0})}}}},$O=e=>{try{if(e.git){if(mP(e.workingDirectory)!==e.head&&(!(e.head===null?os(e.workingDirectory,["update-ref","-d","HEAD"]):os(e.workingDirectory,["reset","--hard",e.head]))||mP(e.workingDirectory)!==e.head))throw new Error("head");let r=MO(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))g8(e,o)}else{if(e.complete)for(let t of jO(e.workingDirectory).paths)e.files[t]===void 0&&nl(e.workingDirectory,t);for(let t of Object.keys(e.files))zO(e,t)}for(let t of e.caches)f8(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{U.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Yp,Xp,h8,y8,S8,A8,b8,FO,P8,UO,BO=l(()=>{"use strict";R();Vp();cP();TO();HO();xe();qe();rl();Yp=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),Xp=e=>({...e,status:"stopped",errorMessage:Ro,judgePhase:void 0,updatedAt:new Date().toISOString()}),h8=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),y8=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==T?t:e.improverModel!==T?e.improverModel:null}return e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null},S8=async e=>{let t=Se(e.cycle),r=RO({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=DO({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Fb({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Ha(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):Ia({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=await et({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal}),a=i.ok?xO({workingDirectory:t,before:r,writerReply:i.text}):null,c=$O(o);return i.ok?!c.ok||a===null?{ok:!1,cycle:Yp(e.cycle,c.ok?"Could not put the folder back after the run.":c.errorMessage)}:{ok:!0,run:{output:i.text.trim(),tokens:i.tokens,delayMs:Date.now()-n,lookedAt:a.lookedAt,evidence:a.evidence}}:i.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:Xp(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Yp(e.cycle,i.errorMessage)})},A8=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:S8({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),b8=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),FO=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await et({writerAgent:e.reviewer,workingDirectory:Se(e.cycle),prompt:_b({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:Xp(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},P8=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===T)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await et({writerAgent:t.judgeModel,workingDirectory:Se(t),prompt:vb({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...ol(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?Xp(o):(e.onWriterFailure?.(t.judgeModel),Yp(o,n.errorMessage))},UO=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return P8(e);let o=y8(t),n=await A8({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?h8(t,n.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===T){let p=await FO({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...b8(s,p.text),judgePhase:void 0}}let i=await et({writerAgent:t.judgeModel,workingDirectory:Se(t),prompt:Ab({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?Xp(s):(e.onWriterFailure?.(t.judgeModel),Yp(s,i.errorMessage));let a=await FO({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=ol(s,i.text,c);return qp(d,a.text)}});var Zp,hP=l(()=>{"use strict";R();Zp=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Ta({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:Ma(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var Qp,w8,v8,yP,GO=l(()=>{"use strict";R();Vp();BO();hP();xe();qe();rl();Qp=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),w8=e=>({...e,status:"stopped",errorMessage:Ro,updatedAt:new Date().toISOString()}),v8=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?w8(e):(n?.(r),Qp(e,t.errorMessage)),yP=async(e,t,r,o)=>{let n=e.revisions.find(c=>c.roundNumber===e.currentRound);if(n===void 0)return Qp(e,"This round has no prompt.");if(e.status==="judging")return UO({cycle:e,revision:n,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return Qp(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===T)return e;let s=Zp(e);if(s===null)return Qp(e,"The improver needs the score and the reason.");let i=await et({writerAgent:e.improverModel,workingDirectory:Se(e),prompt:Ra({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r}),a=v8(e,i,e.improverModel,r,t);return a!==null?a:Gp(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var sl,SP=l(()=>{"use strict";sl=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var rm,em,VO,_8,W8,tm,qO,KO,L8,E8,$o,JO,YO,il=l(()=>{"use strict";R();Qa();el();xe();qe();rl();GO();SP();rm=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),em=(e,t,r)=>e.wizard===void 0||t===null?rm(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},VO=e=>{let t=e.wizard;return t===void 0||sl(e).length===0?e:{...e,wizard:es({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},_8=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",W8=e=>{let t=e.wizard;if(t===void 0)return e;let r=$a({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:es({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},tm=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),qO=e=>e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null,KO=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},L8=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=qO(e);if(n===null)return rm(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Ua(o),i=Db({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:KO(e,"generalize")}),a=await et({writerAgent:n,prompt:i,workingDirectory:Se(e),signal:t});if(!a.ok)return r?.(n),em(e,"generalize",a.errorMessage);try{let c=Kb(a.text),d=es({wizard:{...o,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Ya(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return Va(d)?$o({...p,wizard:{...d,gate:null}}):tm(p,"generalize")}catch(c){return em(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},E8=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=qO(e);if(n===null)return rm(e,"Choose a writer to suggest splits.");let s=Ba({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Hb({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:KO(e,"separate")}),a=await et({writerAgent:n,prompt:i,workingDirectory:Se(e),signal:t});if(!a.ok)return r?.(n),em(e,"separate",a.errorMessage);try{let c=Jb(a.text),d=zb(c,o.variables),p=es({wizard:{...o,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),g={...e,wizard:p};return Ka(d)?Rr(g,d[0]):tm(g,"separate")}catch(c){return em(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},$o=e=>{let t=e.wizard;if(t===void 0)return e;let r=Ua(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:70,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},JO=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return rm(e,"This module is missing.");let n=Io(r),s=Ga(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==T?e.runnerModel:e.judgeModel!==T?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:70,maxRounds:1,errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},YO=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return yP(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return L8(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return E8(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await yP(e,t,r,o);if(k(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&sl(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let g=ne(s.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??0,reasons:S.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:g}}}if(i==="evaluate"&&qa({revisions:a.revisions,wizard:a.wizard})){let p=VO(tm(a,i));return xr(p)}let c=tm(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=Bb({wizard:{...c.wizard,modules:c.wizard.modules.map((g,S)=>S===c.wizard.currentModuleIndex&&g.status==="running"?{...g,status:"paused"}:g)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:_8(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?VO(d):W8(d)}return s}return n.phase==="complete",e}});var om,ss,AP=l(()=>{"use strict";SP();om=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ss=e=>{let t=sl(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${om(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,p=e.cycle.revisions.map(g=>{let S=g.judgement?.score,h=S==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${S}`,y=g.judgement?.reasons?.trim()??"",u=y.length===0?"":`<br><span class="muted">${om(y)}</span>`;if(e.interactive){let A=e.selectedRound===g.roundNumber?" checked":"";return`<li><label><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${A}> ${om(h)}</label>${u}</li>`}return`<li>${om(h)}${u}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var bP,XO,nm,ZO,sm=l(()=>{"use strict";bP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),XO=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${bP(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${bP(t.prompt)}</pre></li>`).join("")}</ol>`,nm=e=>XO([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),ZO=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${bP(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${XO(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var pe,C8,k8,R8,x8,T8,I8,is,im=l(()=>{"use strict";R();AP();sm();pe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),C8=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},k8=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.variables.length===0?'<p class="muted">No variables yet.</p>':`<ul class="sdlc-wizard-vars">${t.variables.map(a=>`<li><strong>{{${pe(a.name)}}}</strong> \u2014 ${pe(a.description)} (sample: ${pe(a.sampleValue)})</li>`).join("")}</ul>`,o=t.templatedPrompt.trim(),n=o.length===0?'<p class="muted">No templated prompt yet.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${pe(o)}</pre>`,s=Fa(t.templatedPrompt,t.variables).trim(),i=s.length===0||s===o?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${pe(s)}</pre>`;return`${r}${n}${i}`},R8=(e,t)=>`<ul class="sdlc-wizard-revisions">${e.map(o=>{let n=o.score===null?`Round ${o.roundNumber} \u2014 not scored`:`Round ${o.roundNumber} \u2014 ${o.score}`,s=t===o.roundNumber?" (selected)":"",i=o.reasons?.trim()??"",a=i.length===0?"":`<br><span class="muted">${pe(i)}</span>`;return`<li>${pe(n)}${s}${a}</li>`}).join("")}</ul>`,x8=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return ss({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=C8(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${R8(o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=Ba({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${pe(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${pe(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},T8=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${pe(n.title)}</strong> <span class="muted">(${pe(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${pe(o.title)}</strong>${n}${pe(s)}<br><span class="muted">${pe(o.summary)} (${pe(o.topology)})</span>${nm(o)}</li>`}).join("")}</ul>`},I8=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${pe(i)}</span> <strong>${pe(n.title)}</strong>${pe(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${pe(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?ss({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},is=(e,t)=>{switch(t){case"wizard-1":return k8(e);case"wizard-2":return x8(e);case"wizard-3":return T8(e);case"wizard-4":return I8(e);default:return""}}});var O8,M8,QO,eM,tM=l(()=>{"use strict";R();Do();im();O8=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},M8=e=>{let t=e.goal.trim();return t.length===0?null:t},QO=(e,t,r,o,n)=>{let s=yt(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},eM=(e,t)=>{let r=M8(e);if(t.id.startsWith("wizard-")){let s=is(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=Na(e,t);if(s!==null)return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:null,promptNote:null,bodyHtml:null};let i=ne(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:QO(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:O8(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:QO(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var as,rM,oM=l(()=>{"use strict";as=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rM=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${as(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${as(e.feedback.trim())}</p>`,n=e.promptNote!==null?`<div class="alert-error">${as(e.promptNote)}</div>`:e.promptText===null?"":`<h2>Saved prompt</h2><pre class="mono">${as(e.promptText)}</pre>`,s=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${as(e.goal)}</dd></div></dl>`;return`<h2>${as(e.title)}</h2>${s}${t}${r}${o}${n}`}});var PP,nM,sM,ls,iM,al=l(()=>{"use strict";R();Ve();PP=new Map,nM=e=>{let t=new AbortController;return PP.set(e,t),t.signal},sM=e=>{PP.delete(e)},ls=e=>{PP.get(e)?.abort()},iM=(e,t)=>{let r=J(e,t);return r===null||r.wizard!==void 0?!1:(k(r.status)||(F(e,{...r,status:"stopped",errorMessage:Ro,updatedAt:new Date().toISOString()}),ls(t)),!0)}});var N8,j8,wP,D8,z8,$8,aM,lM,vP=l(()=>{"use strict";R();il();Qa();el();al();N8=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),j8=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||k(e.status))return null;let r=xo(t);return r<0||r>3?null:`wizard-${r+1}`},wP=(e,t)=>N8.has(t)?j8(e)===t:!1,D8=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),z8=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ne(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},$8=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null,phase:"complete"},n=de(o);return{...e,status:n.terminalStatusSuggestion,errorMessage:null,wizard:o,updatedAt:new Date().toISOString()}},aM=(e,t)=>{if(!wP(e,t))return e;ls(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return $o({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return xr(z8(r));if(t==="wizard-3"){let n=o.splitOptions[0]??D8(o.templatedPrompt);return Rr(r,n)}return t==="wizard-4"?$8(r):e},lM="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var cM,H8,dM,uM=l(()=>{"use strict";R();xe();qe();cM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),H8=e=>{let t=e.state==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e.state==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',r=`<h2>${cM(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${cM(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">i</button></div><template>${r}</template></li>`},dM=e=>{let t=e.wizard;if(t===void 0)return"";let r=eP({status:e.status,wizard:t,writerLabel:ue(e.judgeModel),runnerLabel:ue(e.runnerModel??e.judgeModel),folderDisplay:Qe(Se(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(H8).join("")}</ol>`}});var Ho,cs,ll=l(()=>{"use strict";Ho=e=>e.toLocaleString("en-US"),cs=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var Tr,F8,pM,mM,gM,fM,_P=l(()=>{"use strict";R();tM();oM();vP();uM();ll();Tr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),F8=(e,t)=>{let r=Na(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?cs(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${Ho(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Tr(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${Tr(r)}</span>`:"",d=rM(eM(t,e)),p=t.wizard!==void 0&&t.wizard.phase==="complete"&&k(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${Tr(e.id)}"`:"",g=wP(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${Tr(lM)}"><input type="hidden" name="cycleId" value="${Tr(t.id)}"><input type="hidden" name="wizardStepId" value="${Tr(e.id)}"><button class="btn btn-secondary sdlc-node-skip-btn" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",S=e.state==="active"&&e.id.startsWith("wizard-")?dM(t):"";return`<li class="sdlc-node sdlc-node-${o?"failed":e.state}"${e.state==="active"&&e.id.startsWith("wizard-")?' id="prompt-optimizer-wizard-active-step"':""}><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${p} data-sdlc-node>${n}<span class="sdlc-node-label">${Tr(e.label)}${c}${a}</span></button>${g}</div>${S}<template>${d}</template></li>`},pM=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>F8(r,t)).join("")}</ol>`,mM=e=>`<div class="sdlc-score" aria-label="What the score means">${Eb(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Tr(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,gM='<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog"><button class="btn btn-secondary" type="submit">Close</button></form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>',fM=`<script>
(() => {
  const dialog = document.getElementById("sdlc-node-dialog");
  const body = dialog?.querySelector("[data-sdlc-dialog-body]");
  if (!dialog || !body) return;
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const info = target.closest("[data-sdlc-pipeline-info]");
    if (info instanceof HTMLElement) {
      const template = info.closest(".sdlc-pipeline-step")?.querySelector("template");
      if (!template) return;
      body.replaceChildren(template.content.cloneNode(true));
      dialog.showModal();
      return;
    }
    const opener = target.closest("[data-sdlc-node]");
    if (!opener) return;
    const template = opener.parentElement?.querySelector("template");
    if (!template) return;
    body.replaceChildren(template.content.cloneNode(true));
    dialog.showModal();
  });
})();
</script>`});var Ir,hM,U8,yM=l(()=>{"use strict";R();qe();Do();iP();Ir=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hM=e=>{if(!k(e.status))return"";let t=ne(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=yt(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Ir(t.reasons.trim())}</p>`,i=n===null?U8({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:Se(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${Ir(n)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${o}${s}${i}</section>`},U8=e=>{let t=e.sourceSkill?.fileName??Za(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=Up(t,r),s=n.length>0&&pO(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Ir(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Ir(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Ir(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Ir(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Ir(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Ir(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var am,WP=l(()=>{"use strict";R();R();xe();Do();am=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!k(e.status)){let t=e.judgeModel;return{title:`${ue(t)} is suggesting module splits.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!k(e.status)){let t=e.judgeModel;return{title:`${ue(t)} is generalizing your prompt.`,detail:"This panel keeps updating while the writer works on this Mac."}}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===T?{title:`Score the prompt text for round ${e.currentRound+1}.`,detail:"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."}:e.judgePhase==="scoring"?{title:`${ue(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"No folder run in step 2. This panel keeps updating, so the page is not stuck."}:{title:`${ue(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,detail:"Wizard evaluate revises prompt wording before the runner executes in step 4."};if(e.status==="judging"&&e.judgeModel===T){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==T?{title:`${ue(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"You score the changes after this run."}:{title:`Score the changes from round ${e.currentRound+1}.`,detail:t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt."}}if(e.status==="judging"&&e.judgePhase==="reviewing")return{title:`${ue(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,detail:"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck."};if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length;return{title:`${ue(r)} is scoring module ${o} of ${n}.`,detail:`Step 4 runs one trial per module (pass \u2265 ${70}). This panel keeps updating.`}}return{title:`${ue(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,detail:"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck."}}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length;return{title:`${ue(r)} is running module ${o} of ${n}.`,detail:`The runner executes the module prompt; the judge scores output (pass \u2265 ${70}). This panel keeps updating.`}}return{title:`${ue(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,detail:"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck."}}if(e.status==="improving"&&e.improverModel===T){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return{title:"Rewrite the prompt.",detail:t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`}}if(e.status==="improving")return{title:`${ue(e.improverModel)} is rewriting the prompt.`,detail:"That writer is working on this Mac. This panel keeps updating, so the page is not stuck."};if(e.status==="passed")return{title:"This prompt passed.",detail:""};if(e.status==="stopped"){let t=e.revisions.some(n=>yt(n.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let n=de(e.wizard),s=n.totalModules>0&&(e.wizard.phase==="complete"||n.passedModuleCount>0||k(e.status));return{title:s&&n.totalModules>0?`Wizard finished \u2014 ${n.passedModuleCount}/${n.totalModules} modules passed`:"Wizard stopped before all steps finished",detail:r.length>0?r:s?"":"Progress from finished steps is kept."}}return{title:(e.errorMessage??"").startsWith("Finished")?"Finished.":"Stopped.",detail:r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept."}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard;if(r!==void 0){let o=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],n=xo(r);return{title:`Wizard failed during ${n>=0&&n<o.length?o[n]:"the wizard"}.`,detail:t.length>0?t:"A writer or judge reply could not be used. Start a new run after fixing the issue."}}return{title:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."}}return k(e.status)?{title:"This run stopped because a reply could not be used.",detail:""}:{title:"Working on this Mac.",detail:"This panel keeps updating."}}});var xt,cl=l(()=>{"use strict";xe();xt=e=>{if(e.status==="improving"&&e.improverModel===T)return!0;if(e.status!=="judging"||e.judgeModel!==T)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===T}});var SM,AM=l(()=>{"use strict";SM=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Or,B8,bM,PM=l(()=>{"use strict";R();Or=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),B8=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Or(r)}</p>`},bM=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Or(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${Or(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Or(a)}.</p>`}<pre class="mono">${Or(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${kr(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Or(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",g=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Or(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${B8(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Or(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var dl,G8,wM,vM=l(()=>{"use strict";R();Do();dl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),G8=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=yt(t.promptText),n=t.judgement?.reasons?`<p class="muted">${dl(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${dl(i)}.</p>`}<pre class="mono">${dl(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${kr(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${dl(d)}</pre>`:`<div class="alert-error">${dl(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},wM=e=>e.revisions.map(t=>G8(e,t)).join("")});var _M,WM=l(()=>{"use strict";R();_M=e=>{if(k(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Tt,V8,LP,q8,K8,J8,Y8,LM,EM,EP=l(()=>{"use strict";WM();Tt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),V8="Stop this run? Writers will stop and the best prompt is kept.",LP="End the wizard? Writers will stop and progress from finished steps is kept.",q8="Skip this module and pause at the step gate?",K8=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${Tt(V8)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Tt(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,J8=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${Tt(LP)}"><input type="hidden" name="cycleId" value="${Tt(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,Y8=e=>{let t=Tt(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Tt(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${Tt(q8)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${Tt(LP)}">End wizard</button>
    </form>
  </div>`},LM=e=>{let t=_M(e);return t==="none"?"":t==="classic"?K8(e.id):t==="wizard_end_only"?J8(e.id):Y8(e)},EM=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=Tt(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${Tt(LP)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var CM,kM=l(()=>{"use strict";R();ll();CM=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=de(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${Ho(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${Ho(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${70}`}return""}});var RM,X8,xM,TM=l(()=>{"use strict";R();kM();im();RM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),X8=(e,t,r)=>{let o=is(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=CM(e,t),i=`${RM(n)} <span class="muted sdlc-wizard-outcome-step-hint">${RM(s)}</span>`,a=t==="wizard-4"&&r.phase==="complete"?" open":"",c=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step" id="${c}"${a}><summary aria-controls="${c}-body">${i}</summary><div class="sdlc-wizard-outcome-step-body" id="${c}-body">${o}</div></details>`},xM=e=>{let t=e.wizard;if(t===void 0||!k(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>X8(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var IM,OM,MM=l(()=>{"use strict";IM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OM=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${IM(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${IM(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var CP,NM,kP=l(()=>{"use strict";R();CP=e=>e.status==="passed"&&(e.statistics?.bestScore??0)>=70,NM=e=>{if(CP(e))return"Passed";let t=e.statistics?.bestScore;return t!=null&&t<70?`Below pass (${t})`:e.status}});var jM,DM=l(()=>{"use strict";R();jM=e=>{if(e.terminalStatusSuggestion==="passed")return"";let t=e.rows.filter(r=>r.bestScore!==null&&r.bestScore<70).length;return t>0&&t===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${t} module${t===1?"":"s"} scored below ${70}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${70}.`}});var lm,zM,$M=l(()=>{"use strict";R();kP();kP();DM();lm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zM=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=de(t),o=r.terminalStatusSuggestion==="passed"?"":jM(r),n=60,s=r.rows.map((a,c)=>{let d=t.modules[c],p=a.bestScore===null?"\u2014":`${a.bestScore} / \u2265${70}`,S=a.bestScore!==null&&a.bestScore>=n&&a.bestScore<70?' class="sdlc-score-near-pass"':"",h=d===void 0?a.status:NM(d),y=d!==void 0&&CP(d)?'<span aria-label="Passed">\u2713</span>':lm(h);return`<tr${S}><td>${lm(a.title)}</td><td>${lm(p)}</td><td>${a.tokens??"\u2014"}</td><td>${y}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${o.length===0?"":`<p class="muted">${lm(o)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${s}</tbody></table></div>`}});var Z8,HM,FM=l(()=>{"use strict";R();R();MM();$M();Z8=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HM=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!k(e.status)||t.modules.length===0)return"";let r=zM(e),o=OM(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=de(t),i=s.passedModuleCount<s.totalModules?" open":"";return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${Z8(n)}</pre></details>`}${r}${o}</section>`}});var Zt,ul=l(()=>{"use strict";Zt=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var Mr,cm,RP=l(()=>{"use strict";R();_P();yM();WP();cl();AM();hP();PM();vM();EP();TM();FM();ll();qe();ul();Mr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cm=e=>{let t=!k(e.status)&&e.status!=="wizard_paused"&&!xt(e),r=am(e),o=pM(xb(SM(e)),e),n=k(e.status)?"":LM(e),s=xM(e),i=HM(e),a=hM(e),c=e.errorMessage===null?"":`<div class="alert-error">${Mr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?de(e.wizard):null,S=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,h=!t&&e.wizard!==void 0&&k(e.status)&&(e.wizard.phase==="complete"||de(e.wizard).passedModuleCount>0),y=h?S?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",u=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Mr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",A=r.detail.length===0&&u.length===0||r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Mr(r.detail)}${p}</p>`,b=e.revisions.find(Ur=>Ur.roundNumber===e.currentRound),f=e.status==="improving"?Zp(e):null,w=cs(e),v=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),_=xt(e)?bM({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:f?.promptText??b?.promptText??"",score:f?.score??b?.judgement?.score??null,reasons:f?.reasons??b?.judgement?.reasons??null,avoid:f?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:b?.run??null,minJudgeScore:v?1:0}):"",L=e.wizard!==void 0&&e.wizard.phase==="complete"&&k(e.status),C=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",x=e.wizard!==void 0&&!L?70:e.passScore,I=C?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${mM(x)}</div>`:"",D=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':k(e.status)?e.status==="failed"?'<span class="sdlc-run-badge sdlc-run-badge-failed">Failed</span>':L&&g!==null&&!S?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",re=t?d:h?S?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',B=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Mr(Qe(Se(e)))}</li>`:"",w>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${Ho(w)} so far</li>`:""].filter(Ur=>Ur.length>0),q=B.length===0?"":`<ul class="sdlc-run-meta">${B.join("")}</ul>`,Fr=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,$=L?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,We=L?"":I.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${$}</div>`:`<div class="sdlc-run-grid">${$}${I}</div>`,At=wM(e),dc=e.wizard!==void 0&&k(e.status)&&e.revisions.every(Ur=>Ur.roundNumber===0&&(Ur.judgement===void 0||Ur.judgement===null)),$F=At.length===0||dc?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${At}</div></section>`,HF=`<p class="sdlc-run-goal" title="${Mr(e.goal.trim())}">${Mr(Zt(e.goal))}</p>`,FF=L?`${c}${i}${s}${_}${a}`:`${c}${We}${_}${s}${a}`,UF='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',BF=L?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Mr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${UF}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${D}</div>${HF}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${re}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Mr(r.title)}</h2>${A}${u}${BF}</div></div>${q}${Fr}</header>${FF}</section>${$F}`}});var UM,BM=l(()=>{"use strict";R();el();UM=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!qa({revisions:e.revisions,wizard:t})?e:xr(e)}});var GM,VM=l(()=>{"use strict";R();il();GM=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Va(t)?e:$o({...e,wizard:{...t,gate:null}})}});var qM,KM=l(()=>{"use strict";R();Qa();qM=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Ka(t.splitOptions))return e;let r=t.splitOptions[0];return Rr(e,r)}});var Q8,Fo,dm=l(()=>{"use strict";BM();VM();KM();Ve();Q8=e=>{let t=GM(e),r=UM(t);return qM(r)},Fo=(e,t)=>{let r=Q8(t);return r!==t?(F(e,r),r):t}});var JM,Uo,um=l(()=>{"use strict";R();JM=e=>Oo.indexOf(e),Uo=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||k(e.status)?Oo.length:t.gate!==null?JM(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?JM(t.phase):null}});var YM,XM=l(()=>{"use strict";YM=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Bo,ZM,QM=l(()=>{"use strict";R();XM();Bo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ZM=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Ha(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Bo(YM(o))}</pre></div>`:"",s=To(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=Io(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=$p(c),g=i[c]??"",S=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Bo(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Bo(p)}">${Bo(S)}</label>
        ${h}
        <input class="input" type="text" id="${Bo(p)}" name="${Bo(p)}" value="${Bo(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var It,eN,tN=l(()=>{"use strict";R();QM();AP();sm();EP();It=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eN=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate,n=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=o==="generalize"?`<ul class="sdlc-wizard-vars">${r.variables.map(_=>`<li><strong>{{${It(_.name)}}}</strong> \u2014 ${It(_.description)} (sample: ${It(_.sampleValue)})</li>`).join("")}</ul><pre class="sdlc-pre">${It(r.templatedPrompt)}</pre>`:"",i=o==="evaluate"?ss({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",c=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(_=>{let L=_.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',C=_.recommended?' <span class="sdlc-badge">Recommended</span>':"",x=r.selectedSplitOptionId===_.id||r.selectedSplitOptionId===null&&_.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label><input type="radio" name="wizardSplitOptionId" value="${It(_.id)}" required${x}> <strong>${It(_.title)}</strong>${L}${C}<br><span class="muted">${It(_.summary)}</span></label>${nm(_)}</li>`}).join("")}</ul>`:"",d=r.modules[r.currentModuleIndex],g=o==="optimize_modules"&&d?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",S=d?.title??"Module",h=d?.prompt??"",y=d?.status==="pending",u=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${It(S)}</p>${y?ZM({cycle:e,modulePrompt:h}):""}<p class="muted">Test run prompt preview: ${It(Ga(h,Io(r)))}</p>${d?.statistics===null||d?.statistics===void 0?"":`<p class="muted">Module stats: best ${d.statistics.bestScore??"\u2014"} / \u2265${70} (round ${d.statistics.bestRound??"\u2014"}).</p>`}${ss({cycle:e,interactive:!1,caption:y?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${S}\u201D (runner + judge).`})}`:"",A=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":y?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",b=qb(r),f=b===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${b}</p>`,w=t?.active===!0?" sdlc-wizard-gate-active":"",v=t?.active===!0?' id="prompt-optimizer-wizard-active-step"':"";return`<section class="card sdlc-wizard-gate${w}"${v}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${n}</h2>
    <p class="sdlc-wizard-gate-lede">${A}</p>
    ${f}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${It(e.id)}">
    ${s}
    ${i}
    ${c}
    ${u}
      <div class="field">
        <label class="field-label" for="wizardFeedback">Feedback to rerun this step</label>
        <textarea class="input textarea" id="wizardFeedback" name="wizardFeedback" rows="3" placeholder="What should change?"></textarea>
      </div>
      <div class="field">
        <label class="field-label" for="wizardStepInstructions">Extra instructions (optional)</label>
        <textarea class="input textarea" id="wizardStepInstructions" name="wizardStepInstructions" rows="2" placeholder="Added to this step only when you rerun with feedback."></textarea>
      </div>
      <div class="sdlc-wizard-actions">
        <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue"${g}>Continue</button>
        <button class="btn btn-secondary" type="submit" name="intent" value="wizard-feedback-rerun" formnovalidate>Rerun with feedback</button>
      </div>
    </form>
    ${EM(e)}
  </section>`}});var e3,rN,oN=l(()=>{"use strict";R();e3=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rN=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||k(e.status))return"";if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>Suggesting module splits</h2>
    <p class="muted">The writer is proposing split options. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;if(t.phase==="optimize_modules"&&t.modules.length>0){let r=t.currentModuleIndex,n=t.modules[r]?.title??"Module";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 4 \u2014 Optimize modules</p>
    <h2>Module ${r+1} of ${t.modules.length}: ${e3(n)}</h2>
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
  </section>`:""}});var t3,r3,o3,nN,sN=l(()=>{"use strict";R();um();tN();oN();im();t3={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},r3=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),o3=(e,t,r)=>`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${r3(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${is(e,t)}</div>
</details>`,nN=e=>{let t=e.wizard;if(t===void 0)return"";let r=Uo(e);if(r===null)return"";let o=Oo.slice(0,r).map((i,a)=>o3(e,`wizard-${a+1}`,t3[i])),n=t.gate!==null?eN(e,{active:!0}):rN(e),s=r>=Oo.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var pm,xP=l(()=>{"use strict";sN();sm();R();pm=e=>{if(e===null||e.wizard!==void 0&&k(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=nN(e),r=ZO(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var pl,mm,iN,TP,aN,lN,cN,dN,IP=l(()=>{"use strict";pl=m(require("node:fs")),mm=m(require("node:path")),iN=e=>mm.default.join(mm.default.dirname(e),"prompt-optimizer-writer-ready.json"),TP=e=>{let t=iN(e);if(!pl.default.existsSync(t))return{};try{let r=JSON.parse(pl.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},aN=(e,t)=>{pl.default.mkdirSync(mm.default.dirname(e),{recursive:!0}),pl.default.writeFileSync(iN(e),`${JSON.stringify(t,null,2)}
`)},lN=(e,t)=>TP(e)[t]?.message??null,cN=(e,t,r)=>{aN(e,{...TP(e),[t]:{message:r}})},dN=(e,t)=>{let r=TP(e);r[t]!==void 0&&aN(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var OP,gm,fm,uN,Te,Go=l(()=>{"use strict";R();Xa();il();cl();al();IP();dm();Ve();OP=new Set,gm={atMs:0,ids:[]},fm=async()=>{if(Date.now()-gm.atMs<3e4)return gm.ids;let e=await ft({commands:le({})});return gm.atMs=Date.now(),gm.ids=e.installedWriterIds,e.installedWriterIds},uN=async(e,t,r)=>{let o=J(e,t);if(o===null||r.aborted)return;let n=Fo(e,o);if(k(n.status)||n.status==="wizard_paused"||xt(n))return;let s=await YO(n,a=>{dN(e,a)},r,a=>{J(e,t)?.status==="stopped"||r.aborted||F(e,a)});J(e,t)?.status==="stopped"||r.aborted||(F(e,s),k(s.status)||await uN(e,t,r))},Te=(e,t)=>{if(OP.has(t))return;let r=J(e,t);if(r===null)return;let o=Fo(e,r);if(k(o.status)||o.status==="wizard_paused"||xt(o))return;OP.add(t);let n=nM(t);uN(e,t,n).finally(()=>{OP.delete(t),sM(t)})}});var Nr,ml=l(()=>{"use strict";RP();dm();xP();Go();Nr=(e,t)=>{let r=Fo(e,t);return Te(e,r.id),`${cm(r)}${pm(r)}`}});var pN,mN,gN=l(()=>{"use strict";pN=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,mN=e=>e!==null&&e>0});var hm,fN,MP=l(()=>{"use strict";R();al();hm=e=>(ls(e.id),{...e,status:"stopped",errorMessage:db,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null,phase:"complete"},updatedAt:new Date().toISOString()}),fN=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;ls(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var n3,hN,yN,SN=l(()=>{"use strict";R();il();Qa();el();ml();Ve();Go();gN();vP();MP();n3="Pick a revision scored above 0 before continuing to Separate.",hN=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),yN=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=J(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=J(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Nr(e.storePath,d))};if(o==="wizard-stop-all"){let c=hm(s);return F(e.storePath,c),a(n),!0}if(o==="wizard-skip-module"){let c=fN(s);return F(e.storePath,c),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=aM(s,c);return F(e.storePath,d),d.status==="judging"&&Te(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",g=Mb(s.wizard,d,c);g=Nb(g,d),g={...g,pendingStepInstructions:p};let S={...s,status:"judging",errorMessage:null,wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return F(e.storePath,S),Te(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(S=>S.step==="generalize"),g=(s.errorMessage?.trim().length??0)>0&&!d?hN(s):$o({...s,wizard:{...s.wizard,gate:null}});return F(e.storePath,g),Te(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=pN(s,p??-1);if(!mN(g)){let h={...s,errorMessage:n3,updatedAt:new Date().toISOString()};return F(e.storePath,h),a(n),!0}let S=xr({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return F(e.storePath,S),Te(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=hN(s);return F(e.storePath,h),Te(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(h=>h.id===p);if(g===void 0){let h={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return F(e.storePath,h),a(n),!0}let S=Rr(s,g);return F(e.storePath,S),a(n),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(n),!0;let g=tP({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!g.ok){let u={...s,errorMessage:g.errorMessage,updatedAt:new Date().toISOString()};return F(e.storePath,u),a(n),!0}let S={...s.wizard,parameterValues:g.parameterValues};if(p.status==="pending"){let u=JO({...s,wizard:{...S,gate:null}},d);return F(e.storePath,u),Te(e.storePath,n),a(n),!0}let h=d+1;if(h>=s.wizard.modules.length){let u=de(S),A={...s,status:u.terminalStatusSuggestion,wizard:{...S,gate:null,phase:"complete"},updatedAt:new Date().toISOString()};return F(e.storePath,A),a(n),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...S,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return F(e.storePath,y),a(n),!0}}return a(n),!0}});var s3,AN,i3,NP,a3,bN,PN=l(()=>{"use strict";xe();al();MP();cP();Vp();cl();Ve();s3="Add a score from 0 to 100 and the reason for it.",AN="Add a score from 1 to 100 and the reason for it.",i3="Write the next prompt.",NP="This step is not waiting for you.",a3=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},bN=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=J(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(F(e.storePath,hm(a)),{kind:"saved",cycleId:i}):iM(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=J(e.storePath,r);if(o===null||!xt(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:NP};if(t==="manual-judge"){if(o.judgeModel!==T)return{kind:"invalid",cycle:o,errorMessage:NP};let i=a3(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?AN:s3};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:AN};let d=o.revisions.find(g=>g.roundNumber===o.currentRound)?.run?.tokenReview??"",p=qp(ol(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return F(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==T)return{kind:"invalid",cycle:o,errorMessage:NP};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:i3};let s=Gp(o,n);return F(e.storePath,s),{kind:"saved",cycleId:o.id}}});var wN,vN=l(()=>{"use strict";wN=`<script>
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
</script>`});var _N,WN=l(()=>{"use strict";_N=`<script>
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
</script>`});var LN,EN=l(()=>{"use strict";LN=`<script>
(() => {
  const list = document.querySelector(".sdlc-history");
  if (!(list instanceof HTMLUListElement)) return;
  const items = [...list.querySelectorAll("[data-sdlc-history-kind]")];
  const buttons = [...document.querySelectorAll("[data-sdlc-history-filter]")];
  const apply = (kind) => {
    items.forEach((item) => {
      if (!(item instanceof HTMLLIElement)) return;
      const itemKind = item.dataset.sdlcHistoryKind ?? "classic";
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
</script>`});var CN,kN=l(()=>{"use strict";CN=`<script>
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
  const pass = document.querySelector("[data-sdlc-pass]");
  const paintPass = () => {
    if (!(pass instanceof HTMLInputElement)) return;
    const score = Number(pass.value);
    const weak = Math.floor(score / 2);
    const close = Math.max(weak + 1, score - 20);
    const scale = pass.parentElement;
    if (scale) {
      scale.style.setProperty("--sdlc-weak", weak + "%");
      scale.style.setProperty("--sdlc-close", close + "%");
      scale.style.setProperty("--sdlc-pass", score + "%");
    }
    const value = document.querySelector("[data-sdlc-pass-value]");
    const legend = document.querySelector("[data-sdlc-pass-legend]");
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
  if (pass instanceof HTMLInputElement) {
    pass.addEventListener("input", paintPass);
    paintPass();
  }
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
</script>`});var RN,xN=l(()=>{"use strict";R();qe();RN=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:Qe(t.workingDirectory),passScore:String(t.passScore),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!k(t.status)}}});var TN,IN=l(()=>{"use strict";R();um();TN=e=>{if(e.wizard===void 0)return k(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let t=Uo(e);if(e.status==="wizard_paused"&&t!==null&&t<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${t+1} of 4`};if(k(e.status)){if(e.wizard.phase==="complete"){let r=de(e.wizard),o=r.rows.reduce((s,i)=>i.bestScore===null?s:s===null?i.bestScore:Math.min(s,i.bestScore),null),n=o===null?"":` \xB7 lowest ${o}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Wizard \xB7 ${r.passedModuleCount}/${r.totalModules} modules${n}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}}return t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${t+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var ON,MN=l(()=>{"use strict";ON=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Qt,l3,c3,NN,jN=l(()=>{"use strict";IN();MN();ul();Qt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),l3=e=>e.wizard===void 0?"classic":"wizard",c3=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Qt(t)}">`,o=TN(e),n=ON(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Qt(o.badgeClass)}">${Qt(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Qt(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Qt(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${l3(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Qt(e.id)}">${Qt(Zt(e.goal))}</a><p class="muted">${Qt(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${g}</div></li>`},NN=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>c3(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Qt(s)}</summary>${i}</details>`:i}});var jP,ym,DN,d3,u3,DP,zN,zP=l(()=>{"use strict";jP=m(require("node:fs")),ym=m(require("node:path"));qe();DN=/^[a-z0-9-]+$/,d3=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},u3=(e,t)=>{if(!DN.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let g=d3(p[2]??"");p[1]==="name"&&g.length>0&&(o=g),p[1]==="description"&&(n=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},DP=e=>{let t=jo(e);if(!t.ok)return[];let r=ym.default.resolve(t.path,".cursor","skills"),o=[];try{o=jP.default.readdirSync(r)}catch{return[]}return o.filter(n=>DN.test(n)).flatMap(n=>{let s=ym.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${ym.default.sep}`))return[];try{let i=u3(jP.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},zN=(e,t)=>DP(e).find(r=>r.fileName===t)??null});var $N,HN=l(()=>{"use strict";$N={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Pass score",practice:"The run passes at this score. 90 is the usual bar. Lower it when a useful prompt is enough.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var gl,p3,m3,Ke,fl=l(()=>{"use strict";HN();gl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p3='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>',m3=e=>{let t=$N[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${gl(t.title)}" aria-describedby="${r}" aria-expanded="false">${p3}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${gl(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${gl(t.example)}</span></span></button>`},Ke=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${gl(r)}"`}>${gl(e)}</span>${m3(t)}</span>`});var FN,g3,UN,BN,GN=l(()=>{"use strict";fl();FN=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),g3=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),UN=e=>{if(e.length===0)return`<div class="field">${Ke("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${FN(r.fileName)}">${FN(r.fileName)}</option>`).join("");return`<div class="field">${Ke("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${g3(e)}</script>`},BN=`<script>
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
</script>`});var Ie,VN,qN,f3,KN,JN,YN,XN=l(()=>{"use strict";R();WP();xe();ul();um();Ie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),VN=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",qN=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,f3=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},KN=e=>e===T?"You":ue(e),JN=e=>{let t=f3(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ue(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Ie(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Ie(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Ie(KN(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Ie(KN(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Ie(r)}</dd></div>
    </dl>
  </details>`},YN=e=>{let t=e.wizard;if(t===void 0)return"";let r=Zt(e.goal),o=e.status==="wizard_paused",n=!k(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=am(e),g=qN(t),S=g===null?"":VN(g),h=Uo(e),y=S.length===0?"":h===null||h>=4?` <strong>${Ie(S)}</strong>`:` <strong>${Ie(S)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Ie(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Ie(p.title)}${y}</p>
    <p class="muted">${Ie(p.detail)}</p>
    <div class="actions">
      ${JN(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ie(e.id)}">Open this run</a>
    </div>
  </section>`}let s=qN(t),i=s===null?"Wizard":VN(s),a=Uo(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ie(r)}</h2>
    <p class="lede">Paused at <strong>${Ie(i)}</strong>${Ie(c)} (last updated ${Ie(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${JN(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ie(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var hl,ZN,QN=l(()=>{"use strict";fl();hl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ZN=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${hl(n.id)}"${n.id===e.runner?" selected":""}>${hl(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${hl(e.runner)}">Checking ${hl(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Ke("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Ke("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${hl(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var ej,tj=l(()=>{"use strict";ej=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var ds,rj,oj,nj,sj,ij=l(()=>{"use strict";fl();ds=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rj=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${ds(c.id)}"${c.id===r?" selected":""}>${ds(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${ds(n)}</option>`;return`<div class="field">${Ke(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},oj=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${ds(t)}">Checking ${ds(o)}\u2026</p>`},nj=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Ke(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${ds(r)}</textarea><span class="muted">${o}</span></div></details>`,sj=e=>{let t=`<div class="sdlc-writer">${rj("judge","Judge",e.judge,e.writers,"I'll score it")}${oj("judge",e.judge,e.writers)}${nj("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${rj("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${oj("improver",e.improver,e.writers)}${nj("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var y3,Vo,aj,lj=l(()=>{"use strict";cl();RP();vN();WN();_P();EN();kN();xN();jN();zP();GN();fl();xP();XN();ul();QN();tj();ij();R();y3=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Vo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aj=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Vo(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Vo(e.skillNotice??"")}</div>`,o=`${gM}${fM}`,n=e.resumableWizardCycle??null,s=n===null?"":YN(n),i=pm(e.cycle),a=e.cycle===null?"":cm(e.cycle),c=e.cycle!==null&&xt(e.cycle),d=RN(e),p=y3(d.goal,d.prompt,e.canRun),g=sj({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),S=ZN({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=Ib,y=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",u=e.cycle!==null&&k(e.cycle.status),A=d.running&&!u,b=u||A?"":" open",f=A?" sdlc-compose-run-focus":"",v=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${u?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,_=u?(()=>{let B=e.cycle!==null?Zt(e.cycle.goal):Zt(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Vo(B)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${v}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${v}</summary>`,L=u?" sdlc-compose-viewing-finished":"",C=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",x=c?"waiting":d.running?"running":"idle",I=d.running&&!c?' aria-busy="true"':"",D=`<section class="card sdlc-compose${L}${f}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${b}>
        ${_}
        <div class="sdlc-compose-details-body">
      <p class="lede">${h} ${Vo(e.modelNote)}</p>
        <ol class="sdlc-compose-stepper" aria-label="Compose steps" data-sdlc-compose-stepper>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="1" aria-current="step"><span class="sdlc-compose-stepper-index">1</span><span class="sdlc-compose-stepper-label">Project</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="2"><span class="sdlc-compose-stepper-index">2</span><span class="sdlc-compose-stepper-label">Prompt and goal</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="3"><span class="sdlc-compose-stepper-index">3</span><span class="sdlc-compose-stepper-label">CLI</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="4"><span class="sdlc-compose-stepper-index">4</span><span class="sdlc-compose-stepper-label">Summary</span></li>
        </ol>
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${y}
        <p class="alert-error sdlc-compose-step-error" data-sdlc-compose-step-error hidden role="alert"></p>
        <div class="sdlc-compose-step" data-sdlc-compose-step="1" id="sdlc-compose-step-1">
          <h3 class="sdlc-compose-step-title">Project</h3>
          <p class="muted sdlc-compose-step-lede">Choose the folder writers run in and optionally load a skill into the prompt on the next step.</p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="sdlc-folder">
          <div class="field">
            ${Ke("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Vo(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${UN(DP(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${Ke("Goal","goal")}
            <textarea class="input textarea" name="goal" rows="4" required>${Vo(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Ke("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Vo(d.prompt)}</textarea>
          </div>
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
        ${S}
        ${ej()}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: pass score ${70}, up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${x}" data-can-run="${p?"true":"false"}"${I}${d.running?" disabled":""}>${C}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,re=`${""}${wN}${_N}${CN}${BN}${LN}`;return`${t}${r}${D}${s}${a}${i}${o}${NN(e.history,e.cycle?.id??null)}${re}`}});var yl,$P=l(()=>{"use strict";lj();yl=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:aj(t)}))}});var cj,dj=l(()=>{"use strict";PN();ml();$P();Ve();Go();cj=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:bN({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=J(e.storePath,o.cycleId);return Te(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(Nr(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await yl(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:kt(e.storePath),resumableWizardCycle:null}),!0)}});var uj,Sm,HP=l(()=>{"use strict";uj=m(require("node:os"));R();Sm=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??uj.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??90,maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var pj,us,FP,mj,gj,Sl=l(()=>{"use strict";R();xe();lb();pj=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,us=e=>{let t=SO(e),r=zo(e).map(s=>({id:s,label:Bp[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},FP=(e,t,r)=>t===T||t!==null&&e.writers.some(o=>o.id===t)?t:r,mj=(e,t,r,o=null)=>({judge:FP(e,t,e.judge),improver:FP(e,r,e.improver),runner:FP(e,o,e.runner)}),gj=e=>e===_p?{goal:Wp,prompt:Lp}:{goal:"",prompt:""}});var Am,UP=l(()=>{"use strict";R();xe();qe();Sl();Am=e=>{let t=mj(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=String(70),o=String(5),n=e.posted?.get("judgeInstructions")?.trim()??"",s=e.posted?.get("improverInstructions")?.trim()??"",i=e.posted?.get("runnerInstructions")?.trim()??"",a=e.posted?.get("runner")??null,c=(u,A)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:u,passScore:r,maxRounds:o,errorMessage:A,judge:t.judge,improver:t.improver,judgeInstructions:n,improverInstructions:s,runner:t.runner,runnerInstructions:i});if(e.posted===null)return c(e.defaultFolder??No,null);let d=e.posted.get("folder")??No;if(e.posted.get("intent")==="choose-folder"){let u=e.pickFolder();return c(u===null?d:Qe(u),null)}if((e.posted.get("intent")??"")!=="run")return c(d,null);let g=pj(e.goal,e.prompt);if(g!==null)return c(d,g);let S=AO(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(S===null)return c(d,"Choose a judge and an improver.");let h=jo(d);if(!h.ok)return c(d,h.errorMessage);let y=bO(e.installedIds,a,S.judge);return y===null?c(d,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:S.judge,improver:S.improver,workingDirectory:h.path,passScore:70,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:n,improverInstructions:s,runner:y,runnerInstructions:i}}});var ps,Pm,S3,BP,fj,bm,hj,A3,yj,GP,b3,P3,w3,VP,Sj,Aj,bj=l(()=>{"use strict";ps=m(require("node:fs")),Pm=m(require("node:path"));xe();qe();S3=["remember","choose-folder","run"],BP=()=>({folder:No,judge:"",improver:"",runner:""}),fj=e=>Pm.default.join(Pm.default.dirname(e),"prompt-optimizer-preferences.json"),bm=e=>typeof e=="string"?e:"",hj=e=>{let t=fj(e);if(!ps.default.existsSync(t))return BP();try{let r=JSON.parse(ps.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return BP();let o=r,n=bm(o.folder).trim();return{folder:n.length===0?No:n,judge:bm(o.judge),improver:bm(o.improver),runner:bm(o.runner)}}catch{return BP()}},A3=(e,t)=>{let r=fj(e);ps.default.mkdirSync(Pm.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;ps.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),ps.default.renameSync(o,r)},yj=(e,t)=>e===T||zo(t).some(r=>r===e),GP=(e,t,r)=>e===null?t:e.length===0?"":yj(e,r)?e:t,b3=(e,t)=>{if(e===null)return t;let r=jo(e);return r.ok?r.display:t},P3=e=>{let t=hj(e.storePath),r={folder:b3(e.folder,t.folder),judge:GP(e.judge,t.judge,e.installedIds),improver:GP(e.improver,t.improver,e.installedIds),runner:GP(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||A3(e.storePath,r)},w3=e=>{let t=jo(e);return t.ok?t.display:No},VP=(e,t)=>yj(e,t)?e:"",Sj=e=>{let t=hj(e.storePath);return{selection:{...e.selection,judge:VP(t.judge,e.installedIds)||e.selection.judge,improver:VP(t.improver,e.installedIds)||e.selection.improver,runner:VP(t.runner,e.installedIds)||e.selection.runner},defaultFolder:w3(t.folder)}},Aj=e=>{let t=e.posted.get("intent")??"";if(!S3.includes(t))return;let r=e.posted.get("folder");P3({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var Pj,v3,_3,qP,W3,wm,vm=l(()=>{"use strict";Pj=m(require("node:os"));xe();IP();rl();v3="Reply with the single word ok. Do not use tools.",_3=45e3,qP=async(e,t)=>{if(t===T)return{ok:!0,message:"You will do this step."};let r=lN(e,t);if(r!==null)return{ok:!0,message:r};let o=await et({writerAgent:t,prompt:v3,workingDirectory:Pj.default.tmpdir(),timeoutMs:_3});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ue(t)} is ready.`;return cN(e,t,n),{ok:!0,message:n}},W3=e=>[...new Set(e.filter(t=>t.length>0))],wm=async(e,t,r,o)=>{for(let n of W3([t,r,o??""])){let s=await qP(e,n);if(!s.ok)return s.message}return null}});var KP,wj=l(()=>{"use strict";R();KP=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!k(r.status)&&!(t!==null&&r.id===t))return r;return null}});var vj,_j=l(()=>{"use strict";mt();R();ml();HP();UP();$P();Ve();qe();bj();zP();vm();wj();dm();Go();vj=async e=>{let t=e.posted===null?Sj({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=Am({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Lr("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(Aj({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Qe(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await wm(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await yl(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Qe(r.workingDirectory),passScore:String(r.passScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:kt(e.route.storePath),resumableWizardCycle:KP(kt(e.route.storePath),null)});return}if(r.kind==="start"){let s=zN(r.workingDirectory,r.sourceSkillFile),i=Sm({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,wizard:{...za(r.prompt),runnerInstructions:r.runnerInstructions},runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(F(e.route.storePath,i),Te(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(Nr(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:J(e.route.storePath,e.cycleId);n!==null&&(n=Fo(e.route.storePath,n),Te(e.route.storePath,n.id)),await yl(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:kt(e.route.storePath),resumableWizardCycle:KP(kt(e.route.storePath),n?.id??null)})}});var Wj,Lj=l(()=>{"use strict";Ve();Wj=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";oO(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var Ej,Cj=l(()=>{"use strict";Ej=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var kj,Rj=l(()=>{"use strict";hO();SN();dj();_j();Lj();Sl();Cj();Go();kj=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await fm(),o=us(r),n=e.method==="POST"?Ej(e.request.headers["content-type"],await e.readBody(e.request)):null;if(yN({posted:n,storePath:e.storePath,response:e.response})||await cj(e,n,o))return;let s=gj(t.searchParams.get("example")),i=Wj({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=fO({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await vj({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:gO(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var L3,xj,Tj=l(()=>{"use strict";R();Ve();L3=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",xj=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=J(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!k(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=Vb({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${L3(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var Ij,Oj=l(()=>{"use strict";ml();Ve();Ij=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:J(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":Nr(e.storePath,o)),!0}});var E3,Mj,Nj=l(()=>{"use strict";xe();vm();E3=["claude-cli","codex","cursor","antigravity"],Mj=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===T||E3.includes(t)?await qP(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var jj,Dj=l(()=>{"use strict";R();jj=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:ja,page:Da,context:Qn,installedWriters:e,post:{method:"POST",url:ja,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${ja}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var JP,zj=l(()=>{"use strict";R();ll();JP=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ne(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null}))),o=k(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:o,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:cs(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:Qn,page:`${Da}?cycle=${encodeURIComponent(e.id)}`}}});var Oe,C3,$j,Hj,Fj=l(()=>{"use strict";Oe=m(Hs());R();C3=(0,Oe.isType)({goal:Oe.isString,prompt:Oe.isString,workingDirectory:Oe.isString,judge:(0,Oe.isUndefinedOr)(Oe.isString),improver:(0,Oe.isUndefinedOr)(Oe.isString),passScore:(0,Oe.isUndefinedOr)(Oe.isNumber),maxRounds:(0,Oe.isUndefinedOr)(Oe.isNumber)}),$j=e=>{let t=e?.trim()??"";return t.length===0?null:t},Hj=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return C3(t)?t.workingDirectory.trim().length===0?{ok:!1,error:Np}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:$j(t.judge),improver:$j(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:Np}}});var k3,Uj,Bj=l(()=>{"use strict";R();xe();UP();Sl();k3=e=>e.map(t=>t.id).join(", "),Uj=e=>{let t=us(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===T||n===T)return{ok:!1,error:Tb,installedWriters:t.writers};if(o===null||n===null){let a=k3(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o}),i=Am({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var Gj,Vj=l(()=>{"use strict";R();HP();Dj();zj();Sl();Fj();Bj();Ve();Gj=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=J(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:JP(c)}}let r=await e.handlers.readInstalledIds(),o=us(r);if(e.method==="GET")return{status:200,body:jj(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let n=Hj(e.rawBody);if(!n.ok)return{status:400,body:{ok:!1,error:n.error,installedWriters:o.writers}};let s=Uj({body:n.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver,s.runner);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:o.writers}};let a=Sm({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds,wizard:za(s.prompt),runnerModel:s.runner});return F(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:JP(a)}}});var qj,Kj=l(()=>{"use strict";Go();vm();Vj();qj=async e=>{let t=await Gj({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:fm,readWritersReady:wm,startCycle:Te}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var R3,YP,Jj=l(()=>{"use strict";P0();Rj();Tj();Oj();Nj();Kj();R3=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},YP=async e=>{let t=R3(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await qj(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:b0()})),!0):(await Mj({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||xj({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||Ij({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await kj(e),!0)}});var Yj=l(()=>{"use strict";Jj()});var qo,Al,x3,T3,I3,O3,Xj,Zj=l(()=>{"use strict";qo=m(require("node:fs")),Al=m(require("node:path")),x3="prompt-optimizer-cycles.json",T3="prompt-optimizer-preferences.json",I3="prompt-sdlc-cycles.json",O3="prompt-sdlc-preferences.json",Xj=e=>{let t=Al.default.join(e,x3),r=Al.default.join(e,I3);if(qo.default.existsSync(t)||!qo.default.existsSync(r))return t;try{qo.default.renameSync(r,t)}catch{return r}let o=Al.default.join(e,O3),n=Al.default.join(e,T3);if(qo.default.existsSync(o)&&!qo.default.existsSync(n))try{qo.default.renameSync(o,n)}catch{}return t}});var ms,M3,XP,Qj=l(()=>{"use strict";ms=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),M3=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],XP=e=>{let t=M3.map(i=>`<option value="${ms(i.value)}">${ms(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${ms(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${ms(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${ms(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${ms(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var bl,rD,N3,oD,j3,D3,nD,Wm,eD,tD,z3,$3,er,Pl,_m,H3,Lm,ZP,F3,QP,sD,ew,iD,U3,B3,G3,aD,lD,cD,wl=l(()=>{"use strict";bl=m(require("node:fs")),rD=m(require("node:path")),N3="estimate-history.ndjson",oD=100,j3=500,D3=2e4,nD=e=>rD.default.join(e,N3),Wm=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,j3),eD=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,D3),tD=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,z3=e=>({...e,estimateTokens:tD(e.estimateTokens),actualTokens:tD(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),$3=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},er=e=>{let t=nD(e);return bl.default.existsSync(t)?bl.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return $3(n)?[z3(n)]:[]}catch{return[]}}):[]},Pl=(e,t)=>{bl.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;bl.default.writeFileSync(nD(e),r,"utf8")},_m=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),H3=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${_m(o.task)} | ${_m(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},Lm=e=>{let t=er(e.reportsDir),r=Wm(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Pl(e.reportsDir,[...s,n])},ZP=e=>{let t=er(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?Wm(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Pl(e.reportsDir,[...i,s])},F3=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-oD),QP=e=>[...er(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),sD=e=>{let t=er(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=eD(e.input),n=eD(e.output),s=Wm(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Pl(e.reportsDir,[...c,a])},ew=(e,t)=>{let r=er(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},iD=e=>({table:H3(F3(er(e))),embedding:null}),U3=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},B3=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-oD),G3=e=>{let t=U3(B3(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${_m(s.task)} | ${_m(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},aD=e=>{let t=er(e.reportsDir),r=Wm(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Pl(e.reportsDir,[...s,n])},lD=e=>{let t=er(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Pl(e.reportsDir,[...s,n])},cD=e=>G3(er(e))});var dD=l(()=>{"use strict";wl()});var tr,tw,V3,rw,q3,K3,Em,Cm,J3,ow,uD=l(()=>{"use strict";dD();tr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tw=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},V3=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${tw(-r)} under`:`${tw(r)} over`},rw=e=>e.toLocaleString("en-US"),q3=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${rw(-r)} under`:`${rw(r)} over`},K3=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},Em=e=>e===null?"\u2014":tw(e),Cm=e=>e===null?"\u2014":rw(e),J3=`(function () {
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
})();`,ow=e=>{let r=QP(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":V3(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":q3(n.estimateTokens,n.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${tr(K3(i))}</button></td>
        <td>${tr(c)}</td>
        <td>${Em(n.estimateSeconds)}</td>
        <td>${Em(n.actualSeconds)}</td>
        <td>${tr(d)}</td>
        <td>${Cm(n.estimateTokens)}</td>
        <td>${Cm(n.actualTokens)}</td>
        <td>${tr(p)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${tr(c)}</p>
        <h2>Input</h2>
        <pre>${tr(i)}</pre>
        <h2>Output</h2>
        <pre>${tr(a)}</pre>
        <p>Time: estimated ${Em(n.estimateSeconds)} \xB7 actual ${Em(n.actualSeconds)} \xB7 ${tr(d)}</p>
        <p>Tokens: estimated ${Cm(n.estimateTokens)} \xB7 actual ${Cm(n.actualTokens)} \xB7 ${tr(p)}</p>
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
        <script>${J3}</script>`}
    </section>`}});var pD=l(()=>{"use strict";Qj();uD()});var gs,Y3,X3,nw,mD=l(()=>{"use strict";gs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Y3=(e,t,r)=>{let o=gs(t),n=gs(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},X3=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${gs(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>Y3(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${gs(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${gs(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${gs(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},nw=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(X3).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var gD=l(()=>{"use strict";mD()});var vl,fD,hD,sw,iw,aw,yD=l(()=>{"use strict";vl=m(require("node:fs")),fD=m(require("node:path"));va();Sp();hD=(e,t,r)=>Vn({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,sw=(e,t,r)=>{let o=hD(e,t,r);if(o===null)return[];if(!vl.default.existsSync(o))return[];let n=vl.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},iw=e=>{let t=hD(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Yt(e.entry.prompt),output:Yt(e.entry.output)};vl.default.mkdirSync(fD.default.dirname(t),{recursive:!0}),vl.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},aw=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var Z3,Q3,_l,km,lw=l(()=>{"use strict";Z3=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Q3=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,_l=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=Z3(i.assistantOutput),d=c.length>0?`Assistant: ${Q3(c,t)}`:null,p=[a,d].filter(g=>g!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},km=e=>{let t=e.userMessage.trim(),r=_l({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Ot,Wl,uw,e4,t4,cw,r4,pw,Rm,SD,AD,o4,fs,mw,dw,bD,n4,PD,hs,xm,Ll,s4,El,gw,Tm,Im,wD=l(()=>{"use strict";Ot=m(require("node:fs")),Wl=m(require("node:path")),uw=require("node:crypto");lw();e4="writer-sessions",t4="active-index.json",cw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),r4=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",pw=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},Rm=e=>{let t=Wl.default.join(e.installDir,e4);return Ot.default.mkdirSync(t,{recursive:!0}),t},SD=e=>Wl.default.join(Rm(e),t4),AD=(e,t)=>Wl.default.join(Rm(e),`${t}.canonical.json`),o4=(e,t)=>Wl.default.join(Rm(e),`${t}.continuation.json`),fs=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,mw=e=>{let t=SD(e);if(!Ot.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Ot.default.readFileSync(t,"utf8"));if(!cw(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!cw(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!r4(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},dw=(e,t)=>{Ot.default.writeFileSync(SD(e),JSON.stringify(t,null,2))},bD=(e,t)=>{Ot.default.writeFileSync(AD(e,t.sessionId),JSON.stringify(t,null,2))},n4=(e,t)=>{Ot.default.writeFileSync(o4(e,t.sessionId),JSON.stringify(t,null,2))},PD=(e,t)=>{let r=_l({turns:t.turns});n4(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},hs=(e,t)=>{let r=AD(e,t);if(!Ot.default.existsSync(r))return null;try{let o=JSON.parse(Ot.default.readFileSync(r,"utf8"));return!cw(o)||typeof o.sessionId!="string"?null:o}catch{return null}},xm=(e,t=20)=>{let r=Rm(e),o=Ot.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=hs(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Ll=(e,t,r)=>{let o=pw(r);return mw(e).entries.find(i=>fs(i)===fs({writerAgent:t,projectFolderPath:o}))?.sessionId??null},s4=(e,t,r,o)=>{let n=mw(e),s=fs({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>fs(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];dw(e,{entries:i})},El=(e,t,r)=>{let o=(0,uw.randomUUID)(),n=new Date().toISOString(),s=pw(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return bD(e,i),PD(e,i),s4(e,t,s,o),o},gw=(e,t,r)=>{let o=Ll(e,t,r);return o!==null?o:El(e,t,r)},Tm=(e,t,r)=>{let o=pw(r),n=mw(e);if(o===null&&r===void 0){dw(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=fs({writerAgent:t,projectFolderPath:o});dw(e,{entries:n.entries.filter(i=>fs(i)!==s)})},Im=e=>{let t=gw(e.layout,e.writerAgent,e.projectFolderPath),r=hs(e.layout,t);if(r===null)return;let o={id:(0,uw.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};bD(e.layout,n),PD(e.layout,n)}});var i4,a4,Om,fw,vD=l(()=>{"use strict";i4=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",a4=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},Om=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",fw=e=>{let t=Om(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=i4(r,e.userPromptCharacterCount),n=a4({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var Mm=l(()=>{"use strict";yD();wD();lw();vD()});var _D=l(()=>{"use strict";Rh()});var $e,c4,d4,hw,yw,Sw,WD=l(()=>{"use strict";ce();_D();$e=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),c4=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},d4=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=Qd(o);return`value="${$e(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${$e(r)}"`},hw=(e,t,r,o,n)=>{let s=ny[t];return`<label class="field">
          <span class="field-label">${$e(o)} API key \u2014 ${$e(c4(e,t))} \xB7 <a class="field-link" href="${$e(s.href)}" target="_blank" rel="noopener noreferrer">${$e(s.label)}</a></span>
          <input class="input mono" type="password" name="${$e(r)}" autocomplete="off" ${d4(e,t,n)} />
        </label>`},yw=(e,t,r,o)=>{let n=xh(e[t]?.model),s=new Set(Gd[t].map(c=>c.value)),i=Gd[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${$e(c.value)}"${d}>${$e(c.label)}</option>`}).join(""),a=n!==uo&&!s.has(n)?`<option value="${$e(n)}" selected>${$e(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${$e(o)}</span>
          <select class="input mono" name="${$e(r)}">${i}${a}</select>
        </label>`},Sw=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${$e(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${hw(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${yw(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${hw(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${yw(e.secrets,"openai","openaiModel","OpenAI model")}
        ${hw(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${yw(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var LD=l(()=>{"use strict";WD()});var Nm,ED,CD=l(()=>{"use strict";Nm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ED=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${Nm(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Console</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Console \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${Nm(s.name)}</strong> <span class="muted mono">(${Nm(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${Nm(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) from Agent Witch Live. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var u4,kD,RD,xD=l(()=>{"use strict";u4=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,kD=e=>e.kind==="folder",RD=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&kD(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(kD(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(u4)};return r(t)}});var TD,Aw,ID=l(()=>{"use strict";TD=m(require("node:path")),Aw=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Aw(r.children,t)}</ul>
            </details>
          </li>`;let o=TD.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var OD,jr,p4,m4,Cl,g4,bw,MD=l(()=>{"use strict";vp();OD=m(require("node:path"));CD();xD();ID();jr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p4=()=>`(() => {
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

})();`,m4=()=>`(() => {
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
})();`,Cl=e=>{let t=Ca({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Console",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=ED({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${jr(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${jr(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':g4(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${jr(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${jr(s)}" />
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
    <script>${p4()}</script>
    <script>${m4()}</script>`;return`${t}${r}${o}${c}${d}`},g4=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=RD(a.items.map(S=>({...S,relativePath:typeof S.relativePath=="string"&&S.relativePath.length>0?S.relativePath:OD.default.relative(a.sourceRoot,S.sourcePath).replaceAll("\\","/")}))),p=Aw(d,jr),g=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${jr(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${jr(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${g} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${jr(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},bw=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??p??a,S=t.sets[i];if(S===void 0)continue;let h=a.length>0?a:S.proposedSlug,y=g.length>0?g:S.proposedName,u=r.has(i),A=S.items.map(b=>({id:b.id,kind:b.kind,title:b.title,sourcePath:b.sourcePath,include:u}));s.push({slug:h,name:y,items:A})}return s}});var ND=l(()=>{"use strict";MD()});var f4,Pw,jD=l(()=>{"use strict";Wr();f4=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[ze]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},Pw=f4});var h4,DD,zD=l(()=>{"use strict";Wr();h4=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[ze]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},DD=h4});var $D=l(()=>{"use strict"});var kl,y4,ww,HD=l(()=>{"use strict";vp();kl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),y4=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,ww=e=>{let t=e.flashError?`<div class="alert-error">${kl(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${kl(e.flashMessage)}</div>`:"",r=Ca({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Console",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Console, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${kl(y4(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${kl(n.name)}</strong>
                  <span class="muted mono">${kl(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Console for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var FD=l(()=>{"use strict";$D();uS();HD()});var jm,UD=l(()=>{"use strict";jm=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var BD,rr,vw=l(()=>{"use strict";BD=m(require("node:path"));Bt();wt();V();ce();Ye();rr=e=>{let t=H()?.layout.installDir??E();if(BD.default.basename(t)===Kr)return Ft;let r=H(),o=r!==null?ke(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):Ft}});var _w,GD=l(()=>{"use strict";Ye();vw();_w=async e=>{let t=Ce(e.installDir),r=t?.bundleVersion??null,o=rr(t);try{let n=await bn(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:no(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var Ww,VD=l(()=>{"use strict";Ww=e=>!e});var Lw,ys,Ew=l(()=>{"use strict";V();Lw=()=>`http://127.0.0.1:${Rf()}/update/run`,ys=async e=>{try{let t=await fetch(Lw(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var S4,qD,Cw,KD=l(()=>{"use strict";V();te();Ew();S4=()=>{$t({launchAgentLabel:oe(),installDir:E()})},qD=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Cw=async()=>{S4();let e=await ys({force:!0});if(e.ok)return{ok:!0,message:qD(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:qD(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Ye(),xE)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var kw=l(()=>{"use strict";tb();UD();vw();GD();VD();KD();Ew()});var JD,YD=l(()=>{"use strict";JD=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var XD,ZD,Rw,xw,QD=l(()=>{"use strict";XD=require("node:crypto"),ZD=m(require("node:fs"));mt();ce();ce();YD();Rw=!1,xw=async e=>{if(Rw)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!JD(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=H();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&ZD.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,XD.randomUUID)();Rw=!0;try{if(await rS(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await En({...r,workspace:n},e.writerAgent,t);return await Ji(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Rw=!1}}});var ez=l(()=>{"use strict";QD()});var tt,A4,tz,rz,Tw,Iw,Ow,Mw,Nw,jw,Dw=l(()=>{"use strict";tt=require("node:crypto"),A4=Buffer.from("302a300506032b6570032100","hex"),tz=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},rz=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,tt.createPublicKey)({key:Buffer.concat([A4,t]),format:"der",type:"spki"})},Tw=()=>{let{publicKey:e,privateKey:t}=(0,tt.generateKeyPairSync)("ed25519");return{publicKeyRaw:tz(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Iw=e=>(0,tt.createPrivateKey)(e),Ow=(e,t)=>(0,tt.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),Mw=(e,t,r)=>{try{let o=rz(e);return(0,tt.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},Nw=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,jw=()=>(0,tt.randomBytes)(32).toString("base64url")});var or,Dm,oz,b4,P4,zm,zw,$w,nz=l(()=>{"use strict";or=m(require("node:fs")),Dm=m(require("node:path"));Dw();V();wt();oz=e=>Dm.default.join(e.installDir,mr),b4=(e,t)=>{if(e.profileEmail===null||t===oz(e)||or.default.existsSync(t))return;let r=oz(e);or.default.existsSync(r)&&(or.default.mkdirSync(Dm.default.dirname(t),{recursive:!0}),or.default.renameSync(r,t))},P4=e=>{if(!or.default.existsSync(e))return null;try{let t=or.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},zm=e=>{let t=Ad(e);b4(e,t);let r=P4(t);if(r!==null)return r;let o=Tw();return or.default.mkdirSync(Dm.default.dirname(t),{recursive:!0}),or.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},zw=e=>{let t=zm(e.layout),r=jw(),o=Nw({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=Iw(t.privateKeyPem),s=Ow(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},$w=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return Mw(e.serverPublicKey,t,e.serverAttestation)}});var Hw=l(()=>{"use strict";nz();Dw()});var lz,Rl,Bw,Gw,sz,w4,Fw,$m,ie,cz,v4,Uw,_4,W4,Vw,me,_e,nr,L4,iz,az,xl,Tl,dz=l(()=>{"use strict";lz=m(require("node:http")),Rl=m(require("node:fs")),Bw=m(require("node:path"));Hm();ba();xT();IT();zT();jn();CA();ZA();h0();S0();Yj();Zj();pD();gD();Mm();LD();ND();yo();mt();Wr();jD();zD();FD();kw();Ye();ez();ce();Hw();Gw=e=>hA(e)??"never",sz=48e3,w4=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,Fw=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Eu(),reveal:t.reveal,installed:_r(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),$m=async e=>{let t=H();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Console to load projects."}:In(t,e)},ie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cz=200,v4=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',Uw=e=>{let t=e.trim().slice(0,cz),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},_4=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ie(t)}</div>`,W4=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ie(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',Vw={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},me=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...Vw}),e.end(JSON.stringify(r))},_e=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},nr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},L4=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=v4(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${ie(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=Ww(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Pa(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${ie(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ie(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ie(Gw(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ie(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},iz=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},az=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,cz)},xl=e=>{let t=Bw.default.join(e.layout.installDir,"link-code.txt"),r=()=>Ce(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:jm(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let y=h.installVersion??r(),u=await i(),A=sb(u),b=h.updateFlash??null,f=ib(b),w=_4(b,h.updateError??null);return ob({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:rr(y),installBundleVersionLabel:jm(y),prependBody:`${f}${w}${A}`,headerUpdateButtonHtml:nb(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await _w(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:Uw("An update is already running.")}),h.end();return}c=!0;try{let u=await Cw(),A=u.ok?"/?update=ok":Uw(u.message);h.writeHead(303,{Location:A}),h.end()}catch(u){let A=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:Uw(A)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",A=o(),b=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:A.installVersion,body:`<section class="card">
      <h1>${ie(y)}</h1>
      <p>${ie(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(b)},g=()=>{if(Rl.default.existsSync(t))return Rl.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return Rl.default.writeFileSync(t,h,"utf8"),h},S=lz.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",A=h.method??"GET";if(A==="OPTIONS"){y.writeHead(204,Vw),y.end();return}if(!await YP({method:A,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:Xj(Bw.default.dirname(e.layout.configPath)),readBody:nr,sendHtml:_e,renderShell:n})){if(A==="GET"&&u==="/health"){let b=e.controllers.getStatus(),f=o();me(y,200,{ok:!0,...b,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/status"){let b=o();me(y,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/traffic"){me(y,200,{entries:Sa(e.layout)});return}if(A==="DELETE"&&u==="/api/traffic"||A==="POST"&&u==="/api/traffic/clear"){if(AA(e.layout),A==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}me(y,200,{ok:!0});return}if(A==="GET"&&u==="/api/trace"){me(y,200,{entries:gp(e.layout)});return}if(A==="DELETE"&&u==="/api/trace"||A==="POST"&&u==="/api/trace/clear"){if(wA(e.layout),A==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}me(y,200,{ok:!0});return}if(A==="POST"&&u==="/api/errors/clear"){vA(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(A==="GET"&&u==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let w=await Kn({layout:e.layout,query:f,limit:20});me(y,200,{chunks:w,query:f});return}me(y,200,{chunks:qn(e.layout).slice(-50).reverse()});return}if(A==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(A==="GET"&&u==="/api/update-status"){let b=await i();me(y,200,{ok:!0,...b});return}if((A==="GET"||A==="POST")&&u==="/api/update"){await d(y);return}if(A==="GET"&&u==="/"){let b=e.controllers.getStatus(),f=o(),w=_r(e.layout),v=fp(e.layout.errorLogPath);_e(y,await n({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:iz(h.url??void 0),updateError:az(h.url??void 0),body:ab({wsConnected:b.wsConnected,lastHeartbeatAt:b.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:qn(e.layout).length,trafficEntryCount:Sa(e.layout).length,wakeError:b.wakeError,errorLogByteSize:v.byteSize,errorLogExists:v.exists})}));return}if(A==="GET"&&u==="/task"){let b=e.controllers.getStatus(),f=o(),w=H(),v=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=v.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,L=v.searchParams.get("failed")==="1"?v.searchParams.get("error")?.trim()??"Task failed.":null,C=v.searchParams.get("runId");_e(y,await n({title:"Task",activePath:"/task",installVersion:f.installVersion,body:XP({defaultWorkspace:w?.workspace??"",wsConnected:b.wsConnected,flashMessage:_,flashError:L,lastRunId:C})}));return}if(A==="POST"&&u==="/task/dispatch"){let b=await nr(h),f=new URLSearchParams(b),w=f.get("prompt")?.trim()??"",v=f.get("writerAgent")?.trim()??"claude-cli",_=f.get("projectFolder")?.trim()??"",L=await xw({prompt:w,writerAgent:v,..._.length>0?{projectFolderPath:_}:{}}),C=new URLSearchParams;L.ok?C.set("ok","1"):(C.set("failed","1"),L.errorMessage!==void 0&&C.set("error",L.errorMessage.slice(0,240))),L.agentRunId!==void 0&&C.set("runId",L.agentRunId),y.writeHead(303,{Location:`/task?${C.toString()}`}),y.end();return}if(A==="GET"&&u==="/writer-sessions"){let b=o(),f=xm(e.layout,12);_e(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:b.installVersion,updateFlash:iz(h.url??void 0),updateError:az(h.url??void 0),body:nw({sessions:f})}));return}if(A==="GET"&&u==="/errors"){let b=o(),f=fp(e.layout.errorLogPath);_e(y,await n({title:"Errors",activePath:"/errors",installVersion:b.installVersion,body:WA({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(A==="GET"&&u==="/status"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),w=Pe(e.layout),v=w!==null?je(w,12e4):kA(f.lastHeartbeatAt,12e4),_=RA({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:v}),L=o();_e(y,await n({title:"Status",activePath:"/status",installVersion:L.installVersion,body:`${L4({status:f,healthBadge:_,revived:b.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:L.installBundleVersion,installBundleUpdatedAt:L.installBundleUpdatedAt})}${IA({installDir:e.layout.installDir})}${TA({entries:gp(e.layout)})}`}));return}if(A==="GET"&&u==="/traffic"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=Sa(e.layout),w=o(),v=f.map(C=>`<tr><td title="${ie(C.at)}">${ie(Gw(C.at))}</td><td>${ie(C.direction)}</td><td><code>${ie(C.type)}</code></td><td>${ie(C.summary)}</td><td>${ie(C.action??"")}</td></tr>`).join(""),_=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${v}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',L=b.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";_e(y,await n({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${L}
              ${_}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(A==="GET"&&u==="/projects"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=rr(f.installVersion),v=await $m(e.layout),_=b.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":null,L=H(),C=L===null?null:Z({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),x=C===null?{}:Object.fromEntries((await Promise.all(v.projects.map(async I=>{let D=await Pw(C,I.id);return[I.id,D?.counts??null]}))).filter(I=>I[1]!==null));_e(y,await n({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:ww({projects:v.projects,compositionCountsByProjectId:x,cloudAppOrigin:w,syncMessage:v.message,syncOk:v.ok,flashMessage:null,flashError:_})}));return}if(A==="GET"&&u==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=H(),v=w===null?null:Z({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),_=f.length>0&&v!==null?Lr():null;if(_===null||v===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Ge({projectFolderPath:_}),!await Qi(v,f,_)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(A==="GET"&&u==="/project"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=b.searchParams.get("id")?.trim()??"",w=o(),v=await $m(e.layout),_=Po(v.projects,f);if(_===null){await p(y,"Project not found");return}let L=b.searchParams.get("linked")==="1"?b.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${b.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${b.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:b.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,C=b.searchParams.get("knowledgePromoted"),x=C!==null?`Marked ${C} lesson(s) as promoted in Agent Witch.`:null,I=b.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,D=b.searchParams.get("tab")?.trim()??"harness",re=D==="workflows"||D==="agents"||D==="knowledge"?D:"harness",B=H(),q=B===null?null:Z({wsUrl:B.wsUrl,pairingToken:B.pairingToken}),Fr=q===null?null:await Pw(q,_.id),$=0;if(q!==null)try{let We=await fetch(`${q.appOrigin}/api/agent-witch/projects/${encodeURIComponent(_.id)}/knowledge`,{method:"GET",headers:{[ze]:q.pairingToken},signal:AbortSignal.timeout(1e4)});if(We.ok){let At=await We.json();typeof At=="object"&&At!==null&&typeof At.candidateCount=="number"&&($=At.candidateCount)}}catch{$=0}_e(y,await n({title:_.name,activePath:"/projects",installVersion:w.installVersion,body:On({project:_,installed:_r(e.layout),linkedSetSlugs:wr(_.projectFolderPath),composition:Fr,knowledgeCandidateCount:$,activeTab:re,flashMessage:L??x,flashError:I})}));return}if(A==="POST"&&u==="/projects/pull-bound-harness"){let b=await nr(h),f=await pS({rawBody:b,layout:e.layout});if(f.kind==="not_found"){await p(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let w=o();_e(y,await n({title:f.title,activePath:"/projects",installVersion:w.installVersion,body:f.body}));return}if(A==="POST"&&u==="/projects/link-harness"){let b=await nr(h),f=new URLSearchParams(b),w=f.get("projectId")?.trim()??"",v=await $m(e.layout),_=Po(v.projects,w);if(_===null){await p(y,"Project not found");return}let L=f.getAll("applySet").map(B=>String(B)),C=$i({layout:e.layout,projectFolderPath:_.projectFolderPath,setSlugs:L});if(!C.ok){let B=o();_e(y,await n({title:_.name,activePath:"/projects",installVersion:B.installVersion,body:On({project:_,installed:_r(e.layout),linkedSetSlugs:wr(_.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:C.errorMessage})}));return}let x=H(),I=x===null?null:Z({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),D=I===null?!1:await Xi(I,_.id,C.appliedSetSlugs),re=new URLSearchParams({linked:"1",files:String(C.writtenFileCount),bindingsSynced:D?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(_.id)}&${re.toString()}`}),y.end();return}if(A==="POST"&&u==="/project/knowledge/promote-all"){let b=await nr(h),w=new URLSearchParams(b).get("projectId")?.trim()??"",v=await $m(e.layout),_=Po(v.projects,w);if(_===null){await p(y,"Project not found");return}let L=H(),C=L===null?null:Z({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),x=C===null?{ok:!1,promotedCount:0}:await DD(C,_.id),I=new URLSearchParams({tab:"knowledge",...x.ok?{knowledgePromoted:String(x.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(_.id)}&${I.toString()}`}),y.end();return}if(A==="GET"&&u==="/harness"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=Bi(e.layout),v=b.searchParams.get("submitted")==="1",_=v?b.searchParams.get("syncFailed")==="1"?`Local harness updated (${b.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:b.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${b.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":b.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:b.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,L=w?.scanRoots[0]??Eu(),C=w4(e.layout,{reveal:w,importQuery:b.searchParams.get("import")==="1",justSubmitted:v}),x=rr(f.installVersion);_e(y,await n({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:Cl(Fw(e.layout,{cloudAppOrigin:x,reveal:w,scanFolder:L,flashMessage:_,importSectionExpanded:C}))}));return}if(A==="POST"&&u==="/api/harness/pick-folder"){let b=Lr();if(b===null){me(y,200,{cancelled:!0});return}me(y,200,{path:b});return}if(A==="GET"&&u==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=zi(f);if(w===null){me(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let v=Rl.default.readFileSync(w,"utf8"),_=v.length>sz?`${v.slice(0,sz)}
\u2026 (truncated)`:v;me(y,200,{content:_})}catch{me(y,500,{errorMessage:"Could not read file."})}return}if(A==="POST"&&u==="/api/harness/reveal/add-project"){let b=await nr(h),f="";try{let _=JSON.parse(b);typeof _=="object"&&_!==null&&typeof _.projectPath=="string"&&(f=_.projectPath.trim())}catch{me(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){me(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=Bi(e.layout),v=Vy({reveal:w,projectPath:f});if(v===null||v.sets.length===0){me(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}xu(e.layout,v),me(y,200,{ok:!0,setCount:v.sets.length});return}if(A==="GET"&&u==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){me(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;h.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...Vw});let v=qy({scanRoot:f,response:y,shouldAbort:()=>w});xu(e.layout,v),y.end();return}if(A==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(A==="POST"&&u==="/harness/submit"){let b=Bi(e.layout);if(b===null){let x=o(),I=rr(x.installVersion);_e(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Cl(Fw(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await nr(h),w=new URLSearchParams(f),v=bw(w,b),_=Jy({layout:e.layout,sets:v});if(!_.ok){let x=o(),I=rr(x.installVersion);_e(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Cl(Fw(e.layout,{cloudAppOrigin:I,reveal:b,flashError:_.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}Xy(e.layout);let C=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${_.writtenItemCount??0}${C}`}),y.end();return}if(A==="GET"&&u==="/writer-api"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),w=H()?.writerExecutionBackend??Re(void 0),v=be(e.layout.configPath),_=Sr(v),L=b.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,C=o();_e(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:C.installVersion,body:Sw({writerExecutionBackend:w,secrets:_,flashMessage:L})}));return}if(A==="POST"&&u==="/writer-api"){let b=await nr(h),f=new URLSearchParams(b),w=f.get("writerExecutionBackend")?.trim()??"cli";oy({configPath:e.layout.configPath,writerExecutionBackend:Re(w),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(A==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(A==="GET"&&u==="/history"){let b=o();_e(y,await n({title:"History",activePath:"/history",installVersion:b.installVersion,body:ow({reportsDir:e.layout.reportsDir})}));return}if(A==="GET"&&u==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=o(),v=$A({layout:e.layout}),_=UA(v),L=f.length>0?await Kn({layout:e.layout,query:f,limit:20}):qn(e.layout).slice(-50).reverse(),C=L.map(I=>{let D=FA(v,I.id),re=D>0?` \xB7 used in ${D} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ie(I.createdAt)}">${ie(Gw(I.createdAt))}${I.source?` \xB7 ${ie(I.source)}`:""}${re}</div><pre>${ie(I.text)}</pre></article>`}).join(""),x=_.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${_.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${ie(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";_e(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ie(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${x}${C}${W4(f,L.length)}`}));return}A==="POST"&&await nr(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return S.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),S.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Ut}`)}),S},Tl=e=>zm(e).publicKeyRaw});var Hm=l(()=>{"use strict";fT();hT();dz()});var pz={};bt(pz,{runAgentWitchExternalLiveCli:()=>C4});var qw,uz,E4,C4,mz=l(()=>{"use strict";qw=m(require("node:fs")),uz=m(require("node:path"));jn();V();te();Hm();te();E4=e=>{let t=uz.default.join(e,"link-code.txt");if(!qw.default.existsSync(t))return null;let r=qw.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},C4=()=>{Fe("agent-witch-live");let e=E(),t=M(),r=E4(e),o=Tl(t);xl({layout:t,controllers:{getStatus:()=>{let n=Pe(t);return{wsConnected:la(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{Qr(e)}}})}});var sr=W((oLe,hz)=>{"use strict";var gz=["nodebuffer","arraybuffer","fragments"],fz=typeof Blob<"u";fz&&gz.push("blob");hz.exports={BINARY_TYPES:gz,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:fz,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Il=W((nLe,Fm)=>{"use strict";var{EMPTY_BUFFER:k4}=sr(),Kw=Buffer[Symbol.species];function R4(e,t){if(e.length===0)return k4;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new Kw(r.buffer,r.byteOffset,o):r}function yz(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function Sz(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function x4(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Jw(e){if(Jw.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Kw(e):ArrayBuffer.isView(e)?t=new Kw(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Jw.readOnly=!1),t}Fm.exports={concat:R4,mask:yz,toArrayBuffer:x4,toBuffer:Jw,unmask:Sz};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Fm.exports.mask=function(t,r,o,n,s){s<48?yz(t,r,o,n,s):e.mask(t,r,o,n,s)},Fm.exports.unmask=function(t,r){t.length<32?Sz(t,r):e.unmask(t,r)}}catch{}});var Pz=W((sLe,bz)=>{"use strict";var Az=Symbol("kDone"),Yw=Symbol("kRun"),Xw=class{constructor(t){this[Az]=()=>{this.pending--,this[Yw]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Yw]()}[Yw](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[Az])}}};bz.exports=Xw});var bs=W((iLe,Wz)=>{"use strict";var Ol=require("zlib"),wz=Il(),T4=Pz(),{kStatusCode:vz}=sr(),I4=Buffer[Symbol.species],O4=Buffer.from([0,0,255,255]),Bm=Symbol("permessage-deflate"),ir=Symbol("total-length"),Ss=Symbol("callback"),Dr=Symbol("buffers"),As=Symbol("error"),Um,Zw=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Um){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Um=new T4(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Ss];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!n.client_max_window_bits));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){Um.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){Um.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Ol.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Ol.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Bm]=this,this._inflate[ir]=0,this._inflate[Dr]=[],this._inflate.on("error",N4),this._inflate.on("data",_z)}this._inflate[Ss]=o,this._inflate.write(t),r&&this._inflate.write(O4),this._inflate.flush(()=>{let s=this._inflate[As];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=wz.concat(this._inflate[Dr],this._inflate[ir]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[ir]=0,this._inflate[Dr]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Ol.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Ol.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[ir]=0,this._deflate[Dr]=[],this._deflate.on("data",M4)}this._deflate[Ss]=o,this._deflate.write(t),this._deflate.flush(Ol.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=wz.concat(this._deflate[Dr],this._deflate[ir]);r&&(s=new I4(s.buffer,s.byteOffset,s.length-4)),this._deflate[Ss]=null,this._deflate[ir]=0,this._deflate[Dr]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};Wz.exports=Zw;function M4(e){this[Dr].push(e),this[ir]+=e.length}function _z(e){if(this[ir]+=e.length,this[Bm]._maxPayload<1||this[ir]<=this[Bm]._maxPayload){this[Dr].push(e);return}this[As]=new RangeError("Max payload size exceeded"),this[As].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[As][vz]=1009,this.removeListener("data",_z),this.reset()}function N4(e){if(this[Bm]._inflate=null,this[As]){this[Ss](this[As]);return}e[vz]=1007,this[Ss](e)}});var Ps=W((aLe,Gm)=>{"use strict";var{isUtf8:Lz}=require("buffer"),{hasBlob:j4}=sr(),D4=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function z4(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Qw(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function $4(e){return j4&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Gm.exports={isBlob:$4,isValidStatusCode:z4,isValidUTF8:Qw,tokenChars:D4};if(Lz)Gm.exports.isValidUTF8=function(e){return e.length<24?Qw(e):Lz(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Gm.exports.isValidUTF8=function(t){return t.length<32?Qw(t):e(t)}}catch{}});var nv=W((lLe,Iz)=>{"use strict";var{Writable:H4}=require("stream"),Ez=bs(),{BINARY_TYPES:F4,EMPTY_BUFFER:Cz,kStatusCode:U4,kWebSocket:B4}=sr(),{concat:ev,toArrayBuffer:G4,unmask:V4}=Il(),{isValidStatusCode:q4,isValidUTF8:kz}=Ps(),Vm=Buffer[Symbol.species],rt=0,Rz=1,xz=2,Tz=3,tv=4,rv=5,qm=6,ov=class extends H4{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||F4[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[B4]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=rt}_write(t,r,o){if(this._opcode===8&&this._state==rt)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new Vm(o.buffer,o.byteOffset+t,o.length-t),new Vm(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new Vm(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case rt:this.getInfo(t);break;case Rz:this.getPayloadLength16(t);break;case xz:this.getPayloadLength64(t);break;case Tz:this.getMask();break;case tv:this.getData(t);break;case rv:case qm:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[Ez.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=Rz:this._payloadLength===127?this._state=xz:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=Tz:this._state=tv}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=tv}getData(t){let r=Cz;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&V4(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=rv,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[Ez.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===rt&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=rt;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=ev(o,r):this._binaryType==="arraybuffer"?n=G4(ev(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=rt):(this._state=qm,setImmediate(()=>{this.emit("message",n,!0),this._state=rt,this.startLoop(t)}))}else{let n=ev(o,r);if(!this._skipUTF8Validation&&!kz(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===rv||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=rt):(this._state=qm,setImmediate(()=>{this.emit("message",n,!1),this._state=rt,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,Cz),this.end();else{let o=t.readUInt16BE(0);if(!q4(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new Vm(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!kz(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=rt;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=rt):(this._state=qm,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=rt,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[U4]=n,i}};Iz.exports=ov});var av=W((dLe,Nz)=>{"use strict";var{Duplex:cLe}=require("stream"),{randomFillSync:K4}=require("crypto"),{types:{isUint8Array:J4}}=require("util"),Oz=bs(),{EMPTY_BUFFER:Y4,kWebSocket:X4,NOOP:Z4}=sr(),{isBlob:ws,isValidStatusCode:Q4}=Ps(),{mask:Mz,toBuffer:Ko}=Il(),ot=Symbol("kByteLength"),e6=Buffer.alloc(4),Km=8*1024,Jo,vs=Km,St=0,t6=1,r6=2,sv=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=St,this.onerror=Z4,this[X4]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||e6,r.generateMask?r.generateMask(o):(vs===Km&&(Jo===void 0&&(Jo=Buffer.alloc(Km)),K4(Jo,0,Km),vs=0),o[0]=Jo[vs++],o[1]=Jo[vs++],o[2]=Jo[vs++],o[3]=Jo[vs++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[ot]!==void 0?a=r[ot]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(Mz(t,o,d,s,a),[d]):(Mz(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=Y4;else{if(typeof t!="number"||!Q4(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(J4(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[ot]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==St?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):ws(t)?(n=t.size,s=!1):(t=Ko(t),n=t.length,s=Ko.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[ot]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};ws(t)?this._state!==St?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==St?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):ws(t)?(n=t.size,s=!1):(t=Ko(t),n=t.length,s=Ko.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[ot]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};ws(t)?this._state!==St?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==St?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[Oz.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):ws(t)?(a=t.size,c=!1):(t=Ko(t),a=t.length,c=Ko.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[ot]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};ws(t)?this._state!==St?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==St?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[ot],this._state=r6,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(iv,this,a,n);return}this._bufferedBytes-=o[ot];let i=Ko(s);r?this.dispatch(i,r,o,n):(this._state=St,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(o6,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[Oz.extensionName];this._bufferedBytes+=o[ot],this._state=t6,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");iv(this,c,n);return}this._bufferedBytes-=o[ot],this._state=St,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===St&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][ot],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][ot],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};Nz.exports=sv;function iv(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function o6(e,t,r){iv(e,t,r),e.onerror(t)}});var Gz=W((uLe,Bz)=>{"use strict";var{kForOnEventAttribute:Ml,kListener:lv}=sr(),jz=Symbol("kCode"),Dz=Symbol("kData"),zz=Symbol("kError"),$z=Symbol("kMessage"),Hz=Symbol("kReason"),_s=Symbol("kTarget"),Fz=Symbol("kType"),Uz=Symbol("kWasClean"),ar=class{constructor(t){this[_s]=null,this[Fz]=t}get target(){return this[_s]}get type(){return this[Fz]}};Object.defineProperty(ar.prototype,"target",{enumerable:!0});Object.defineProperty(ar.prototype,"type",{enumerable:!0});var Yo=class extends ar{constructor(t,r={}){super(t),this[jz]=r.code===void 0?0:r.code,this[Hz]=r.reason===void 0?"":r.reason,this[Uz]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[jz]}get reason(){return this[Hz]}get wasClean(){return this[Uz]}};Object.defineProperty(Yo.prototype,"code",{enumerable:!0});Object.defineProperty(Yo.prototype,"reason",{enumerable:!0});Object.defineProperty(Yo.prototype,"wasClean",{enumerable:!0});var Ws=class extends ar{constructor(t,r={}){super(t),this[zz]=r.error===void 0?null:r.error,this[$z]=r.message===void 0?"":r.message}get error(){return this[zz]}get message(){return this[$z]}};Object.defineProperty(Ws.prototype,"error",{enumerable:!0});Object.defineProperty(Ws.prototype,"message",{enumerable:!0});var Nl=class extends ar{constructor(t,r={}){super(t),this[Dz]=r.data===void 0?null:r.data}get data(){return this[Dz]}};Object.defineProperty(Nl.prototype,"data",{enumerable:!0});var n6={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[Ml]&&n[lv]===t&&!n[Ml])return;let o;if(e==="message")o=function(s,i){let a=new Nl("message",{data:i?s:s.toString()});a[_s]=this,Jm(t,this,a)};else if(e==="close")o=function(s,i){let a=new Yo("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[_s]=this,Jm(t,this,a)};else if(e==="error")o=function(s){let i=new Ws("error",{error:s,message:s.message});i[_s]=this,Jm(t,this,i)};else if(e==="open")o=function(){let s=new ar("open");s[_s]=this,Jm(t,this,s)};else return;o[Ml]=!!r[Ml],o[lv]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[lv]===t&&!r[Ml]){this.removeListener(e,r);break}}};Bz.exports={CloseEvent:Yo,ErrorEvent:Ws,Event:ar,EventTarget:n6,MessageEvent:Nl};function Jm(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Ym=W((pLe,Vz)=>{"use strict";var{tokenChars:jl}=Ps();function Mt(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function s6(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(p===-1&&jl[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);d===44?(Mt(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(p===-1&&jl[d]===1)c===-1&&(c=g);else if(d===32||d===9)p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g),Mt(r,e.slice(c,p),!0),d===44&&(Mt(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,g),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(n){if(jl[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:o||(o=!0),n=!1}else if(s)if(jl[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,p=g;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(p===-1&&jl[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))p===-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);o&&(h=h.replace(/\\/g,""),o=!1),Mt(r,a,h),d===44&&(Mt(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=g);let S=e.slice(c,p);return i===void 0?Mt(t,S,r):(a===void 0?Mt(r,S,!0):o?Mt(r,a,S.replace(/\\/g,"")):Mt(r,a,S),Mt(t,i,r)),t}function i6(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}Vz.exports={format:i6,parse:s6}});var eg=W((fLe,n$)=>{"use strict";var a6=require("events"),l6=require("https"),c6=require("http"),Jz=require("net"),d6=require("tls"),{randomBytes:u6,createHash:p6}=require("crypto"),{Duplex:mLe,Readable:gLe}=require("stream"),{URL:cv}=require("url"),zr=bs(),m6=nv(),g6=av(),{isBlob:f6}=Ps(),{BINARY_TYPES:qz,CLOSE_TIMEOUT:h6,EMPTY_BUFFER:Xm,GUID:y6,kForOnEventAttribute:dv,kListener:S6,kStatusCode:A6,kWebSocket:Ae,NOOP:Yz}=sr(),{EventTarget:{addEventListener:b6,removeEventListener:P6}}=Gz(),{format:w6,parse:v6}=Ym(),{toBuffer:_6}=Il(),Xz=Symbol("kAborted"),uv=[8,13],lr=["CONNECTING","OPEN","CLOSING","CLOSED"],W6=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,Y=class e extends a6{constructor(t,r,o){super(),this._binaryType=qz[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Xm,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,r=[]):r=[r]),Zz(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){qz.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new m6({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new g6(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[Ae]=this,s[Ae]=this,t[Ae]=this,n.on("conclude",C6),n.on("drain",k6),n.on("error",R6),n.on("message",x6),n.on("ping",T6),n.on("pong",I6),s.onerror=O6,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",t$),t.on("data",Qm),t.on("end",r$),t.on("error",o$),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[zr.extensionName]&&this._extensions[zr.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Je(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),e$(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){pv(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Xm,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){pv(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Xm,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){pv(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[zr.extensionName]||(n.compress=!1),this._sender.send(t||Xm,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Je(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(Y,"CONNECTING",{enumerable:!0,value:lr.indexOf("CONNECTING")});Object.defineProperty(Y.prototype,"CONNECTING",{enumerable:!0,value:lr.indexOf("CONNECTING")});Object.defineProperty(Y,"OPEN",{enumerable:!0,value:lr.indexOf("OPEN")});Object.defineProperty(Y.prototype,"OPEN",{enumerable:!0,value:lr.indexOf("OPEN")});Object.defineProperty(Y,"CLOSING",{enumerable:!0,value:lr.indexOf("CLOSING")});Object.defineProperty(Y.prototype,"CLOSING",{enumerable:!0,value:lr.indexOf("CLOSING")});Object.defineProperty(Y,"CLOSED",{enumerable:!0,value:lr.indexOf("CLOSED")});Object.defineProperty(Y.prototype,"CLOSED",{enumerable:!0,value:lr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(Y.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(Y.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[dv])return t[S6];return null},set(t){for(let r of this.listeners(e))if(r[dv]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[dv]:!0})}})});Y.prototype.addEventListener=b6;Y.prototype.removeEventListener=P6;n$.exports=Y;function Zz(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:h6,protocolVersion:uv[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!uv.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${uv.join(", ")})`);let s;if(t instanceof cv)s=t;else try{s=new cv(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;Zm(e,u);return}let d=i?443:80,p=u6(16).toString("base64"),g=i?l6.request:c6.request,S=new Set,h;if(n.createConnection=n.createConnection||(i?E6:L6),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new zr({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=w6({[zr.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!W6.test(u)||S.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");S.add(u)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let u=n.path.split(":");n.socketPath=u[0],n.path=u[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let u=o&&o.headers;if(o={...o,headers:{}},u)for(let[A,b]of Object.entries(u))o.headers[A.toLowerCase()]=b}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,u||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=g(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=g(n);n.timeout&&y.on("timeout",()=>{Je(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[Xz]||(y=e._req=null,Zm(e,u))}),y.on("response",u=>{let A=u.headers.location,b=u.statusCode;if(A&&n.followRedirects&&b>=300&&b<400){if(++e._redirects>n.maxRedirects){Je(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new cv(A,t)}catch{let v=new SyntaxError(`Invalid URL: ${A}`);Zm(e,v);return}Zz(e,f,r,o)}else e.emit("unexpected-response",y,u)||Je(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,A,b)=>{if(e.emit("upgrade",u),e.readyState!==Y.CONNECTING)return;y=e._req=null;let f=u.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){Je(e,A,"Invalid Upgrade header");return}let w=p6("sha1").update(p+y6).digest("base64");if(u.headers["sec-websocket-accept"]!==w){Je(e,A,"Invalid Sec-WebSocket-Accept header");return}let v=u.headers["sec-websocket-protocol"],_;if(v!==void 0?S.size?S.has(v)||(_="Server sent an invalid subprotocol"):_="Server sent a subprotocol but none was requested":S.size&&(_="Server sent no subprotocol"),_){Je(e,A,_);return}v&&(e._protocol=v);let L=u.headers["sec-websocket-extensions"];if(L!==void 0){if(!h){Je(e,A,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let C;try{C=v6(L)}catch{Je(e,A,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(C);if(x.length!==1||x[0]!==zr.extensionName){Je(e,A,"Server indicated an extension that was not requested");return}try{h.accept(C[zr.extensionName])}catch{Je(e,A,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[zr.extensionName]=h}e.setSocket(A,b,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function Zm(e,t){e._readyState=Y.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function L6(e){return e.path=e.socketPath,Jz.connect(e)}function E6(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=Jz.isIP(e.host)?"":e.host),d6.connect(e)}function Je(e,t,r){e._readyState=Y.CLOSING;let o=new Error(r);Error.captureStackTrace(o,Je),t.setHeader?(t[Xz]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Zm,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function pv(e,t,r){if(t){let o=f6(t)?t.size:_6(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${lr[e.readyState]})`);process.nextTick(r,o)}}function C6(e,t){let r=this[Ae];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[Ae]!==void 0&&(r._socket.removeListener("data",Qm),process.nextTick(Qz,r._socket),e===1005?r.close():r.close(e,t))}function k6(){let e=this[Ae];e.isPaused||e._socket.resume()}function R6(e){let t=this[Ae];t._socket[Ae]!==void 0&&(t._socket.removeListener("data",Qm),process.nextTick(Qz,t._socket),t.close(e[A6])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function Kz(){this[Ae].emitClose()}function x6(e,t){this[Ae].emit("message",e,t)}function T6(e){let t=this[Ae];t._autoPong&&t.pong(e,!this._isServer,Yz),t.emit("ping",e)}function I6(e){this[Ae].emit("pong",e)}function Qz(e){e.resume()}function O6(e){let t=this[Ae];t.readyState!==Y.CLOSED&&(t.readyState===Y.OPEN&&(t._readyState=Y.CLOSING,e$(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function e$(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function t$(){let e=this[Ae];if(this.removeListener("close",t$),this.removeListener("data",Qm),this.removeListener("end",r$),e._readyState=Y.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[Ae]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",Kz),e._receiver.on("finish",Kz))}function Qm(e){this[Ae]._receiver.write(e)||this.pause()}function r$(){let e=this[Ae];e._readyState=Y.CLOSING,e._receiver.end(),this.end()}function o$(){let e=this[Ae];this.removeListener("error",o$),this.on("error",Yz),e&&(e._readyState=Y.CLOSING,this.destroy())}});var l$=W((yLe,a$)=>{"use strict";var hLe=eg(),{Duplex:M6}=require("stream");function s$(e){e.emit("close")}function N6(){!this.destroyed&&this._writableState.finished&&this.destroy()}function i$(e){this.removeListener("error",i$),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function j6(e,t){let r=!0,o=new M6({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(s$,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(s$,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",N6),o.on("error",i$),o}a$.exports=j6});var mv=W((SLe,c$)=>{"use strict";var{tokenChars:D6}=Ps();function z6(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&D6[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}c$.exports={parse:z6}});var h$=W((bLe,f$)=>{"use strict";var $6=require("events"),tg=require("http"),{Duplex:ALe}=require("stream"),{createHash:H6}=require("crypto"),d$=Ym(),Xo=bs(),F6=mv(),U6=eg(),{CLOSE_TIMEOUT:B6,GUID:G6,kWebSocket:V6}=sr(),q6=/^[+/0-9A-Za-z]{22}==$/,u$=0,p$=1,g$=2,gv=class extends $6{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:B6,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:U6,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=tg.createServer((o,n)=>{let s=tg.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=K6(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=u$}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===g$){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Dl,this);return}if(t&&this.once("close",t),this._state!==p$)if(this._state=p$,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Dl,this):process.nextTick(Dl,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Dl(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",m$);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Zo(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Zo(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!q6.test(s)){Zo(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Zo(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){zl(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=F6.parse(c)}catch{Zo(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&p!==void 0){let S=new Xo({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=d$.parse(p);h[Xo.extensionName]&&(S.accept(h[Xo.extensionName]),g[Xo.extensionName]=S)}catch{Zo(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let S={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(S,(h,y,u,A)=>{if(!h)return zl(r,y||401,u,A);this.completeUpgrade(g,s,d,t,r,o,n)});return}if(!this.options.verifyClient(S))return zl(r,401)}this.completeUpgrade(g,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[V6])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>u$)return zl(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${H6("sha1").update(r+G6).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let g=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),p._protocol=g)}if(t[Xo.extensionName]){let g=t[Xo.extensionName].params,S=d$.format({[Xo.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${S}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",m$),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Dl,this)})),a(p,n)}};f$.exports=gv;function K6(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function Dl(e){e._state=g$,e.emit("close")}function m$(){this.destroy()}function zl(e,t,r,o){r=r||tg.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${tg.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Zo(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Zo),e.emit("wsClientError",i,r,t)}else zl(r,o,n,s)}});var J6,Y6,X6,Z6,Q6,eJ,y$,tJ,$l,S$=l(()=>{J6=m(l$(),1),Y6=m(Ym(),1),X6=m(bs(),1),Z6=m(nv(),1),Q6=m(av(),1),eJ=m(mv(),1),y$=m(eg(),1),tJ=m(h$(),1),$l=y$.default});var fv,hv,yv=l(()=>{"use strict";fv="AGENT_WITCH_EXTERNAL_BRIDGE",hv="AGENT_WITCH_EXTERNAL_LIVE"});var Sv,A$=l(()=>{"use strict";Sv=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var rJ,Av,b$=l(()=>{"use strict";yv();A$();rJ=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",Av=(e={})=>{let t=e.env??process.env,r=Sv(t[fv]),o=Sv(t[hv]);return{mode:rJ(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var P$=l(()=>{"use strict";yv()});var w$=l(()=>{"use strict";b$();P$()});var bv=l(()=>{"use strict"});var cr,Hl=l(()=>{"use strict";cr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Ls,Qo,v$,nJ,Pv,wv,_$,W$,vv,L$,Fl,_v=l(()=>{"use strict";Ls=m(require("node:fs")),Qo=m(require("node:os")),v$=m(require("node:path"));bv();Hl();nJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Pv=(e=Qo.default.hostname())=>v$.default.join(Qo.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),wv=e=>{if(!Ls.default.existsSync(e))return null;try{let t=JSON.parse(Ls.default.readFileSync(e,"utf8"));return!nJ(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},_$=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},W$=(e,t)=>{Ls.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},vv=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Pv(),o=wv(r);if(o!==null&&o.pid!==process.pid&&cr(o.pid)&&_$(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Qo.default.hostname(),macOsUsername:Qo.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return W$(r,n),{ok:!0}},L$=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Pv(),o=wv(r);return o!==null&&o.pid!==process.pid&&cr(o.pid)&&_$(o)?{ok:!1}:(W$(r,{hostname:Qo.default.hostname(),macOsUsername:Qo.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},Fl=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??Pv();wv(r)?.pid===process.pid&&Ls.default.existsSync(r)&&Ls.default.unlinkSync(r)}});var Wv,Ul,sJ,iJ,aJ,lJ,Lv,E$=l(()=>{"use strict";Wv=require("node:child_process"),Ul=m(require("node:path"));Hl();kd();sJ=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),iJ=(e,t)=>{if(sJ(e)||!/\bnode\b/.test(e))return!1;let r=Ul.default.resolve(t),o=Ul.default.join(r,"app",Qs),n=Ul.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Qs||i==="agent-witch.ts")return e.includes(r);try{let a=Ul.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},aJ=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,Wv.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},lJ=(e,t,r)=>{let o=aJ(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||iJ(d,t)&&n.push(c)}return n},Lv=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,Wv.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=lJ(r,e.installDir,t),n=[];for(let s of o)if(cr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var Bl,Gl,C$,cJ,Ev,k$=l(()=>{"use strict";Bl=m(require("node:fs")),Gl=m(require("node:path"));Ee();C$=(e,t)=>{!Bl.default.existsSync(e)||Bl.default.existsSync(t)||(Bl.default.mkdirSync(Gl.default.dirname(t),{recursive:!0}),Bl.default.renameSync(e,t))},cJ=e=>{if(e.profileEmail===null)return;let t=Gl.default.join(e.installDir,st);C$(Gl.default.join(t,an),e.mainLogPath),C$(Gl.default.join(t,ln),e.errorLogPath)},Ev=e=>{let t=M();e!==void 0&&t.installDir!==e||cJ(t)}});var R$=l(()=>{"use strict";fa();pp();pp();!Ue()&&oo(__agentWitchImportMetaUrl)&&(async()=>{Fe("agent-witch-wake-server");let e=await Wo(),t=Ht(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var x$=l(()=>{"use strict";R$()});var T$=l(()=>{"use strict";ta()});var Cv,I$=l(()=>{"use strict";bv();x$();_v();T$();Cv=async(e={})=>{let t=e.skipInProcessBridge?null:await up();Bu();let r=setInterval(()=>{Bu()},6e4),o=setInterval(()=>{if(!L$().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var Vl,rg,pJ,O$,M$,og,N$,j$,kv,D$,ng,z$=l(()=>{"use strict";Vl=m(require("node:fs")),rg=m(require("node:path")),pJ="pending-run-inputs.json",O$=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),M$=e=>{let t=e.profileEmail?rg.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return rg.default.join(t,pJ)},og=e=>{let t=M$(e);if(!Vl.default.existsSync(t))return{};try{let r=JSON.parse(Vl.default.readFileSync(t,"utf8"));return O$(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!O$(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},N$=(e,t)=>{let r=M$(e);Vl.default.mkdirSync(rg.default.dirname(r),{recursive:!0}),Vl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},j$=e=>Object.values(og(e)),kv=(e,t)=>og(e)[t]!==void 0,D$=(e,t)=>{let r=og(e);r[t.agentRunId]=t,N$(e,r)},ng=(e,t)=>{let r=og(e);delete r[t],N$(e,r)}});var sg=l(()=>{"use strict";ce()});var $$=l(()=>{"use strict";ce()});var ig=l(()=>{"use strict";ce()});var ag=l(()=>{"use strict";ce()});var ql=l(()=>{"use strict";ce()});var mJ,gJ,Kl,Rv=l(()=>{"use strict";dt();sg();$$();ig();ag();ql();mJ={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},gJ={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Kl=e=>{if(!ae(e.writerAgent))return"the selected writer";let t=Be(e.writerAgent);if(Re(e.writerExecutionBackend)==="api"&&t!==null){let r=De(be(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=bi(t,r.model);return`${gJ[t]} model ${o}`}}return mJ[e.writerAgent]}});var fJ,hJ,H$,F$,U$=l(()=>{"use strict";fJ=/"input_tokens"\s*:\s*(\d+)/,hJ=/"output_tokens"\s*:\s*(\d+)/,H$=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},F$=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=H$(fJ.exec(t)),o=H$(hJ.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var lg=l(()=>{"use strict";mt()});var Jl,cg,yJ,xv,B$,G$,V$,Tv,q$=l(()=>{"use strict";Jl=m(require("node:fs")),cg=m(require("node:path"));lg();yJ="run-completion-outbox.json",xv=e=>{let t=e.profileEmail?cg.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return cg.default.join(t,yJ)},B$=e=>{let t=xv(e);if(!Jl.default.existsSync(t))return[];try{let r=JSON.parse(Jl.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},G$=(e,t)=>{Jl.default.mkdirSync(cg.default.dirname(xv(e)),{recursive:!0}),Jl.default.writeFileSync(xv(e),JSON.stringify(t,null,2),"utf8")},V$=(e,t)=>{let r=[...B$(e).filter(o=>o.runId!==t.runId),t];G$(e,r)},Tv=async e=>{if(e.cloudApi===null)return;let t=B$(e.layout);if(t.length===0)return;let r=[];for(let o of t)await Ji(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);G$(e.layout,r)}});var K$=l(()=>{"use strict"});var Iv,Yl,AJ,en,J$=l(()=>{"use strict";K$();Iv=new Map,Yl=e=>{let t=Iv.get(e);t!==void 0&&(clearInterval(t),Iv.delete(e))},AJ=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},en=(e,t,r,o={})=>{Yl(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){Yl(t);return}let i=o.onTick?.()??{};AJ(e,t,n,i)};s(),Iv.set(t,setInterval(s,15e3))}});var Y$=l(()=>{"use strict";mt()});var X$,Z$=l(()=>{"use strict";Y$();X$=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Xe(t)}});var Ov,Xl,dr,Mv,Nt,Q$,dg=l(()=>{"use strict";Ov=new Set,Xl=new Map,dr=(e,t)=>{if(t.length===0)return;let r=Xl.get(e)??[];r.push(t),Xl.set(e,r)},Mv=e=>{Ov.add(e);let t=Xl.get(e)??[];return Xl.delete(e),t},Nt=e=>Ov.has(e),Q$=e=>{Ov.delete(e),Xl.delete(e)}});var Es,eH,tH,rH=l(()=>{"use strict";Es=m(require("node:path")),eH=require("node:url");ro();tH=()=>{if(Ue()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Es.default.dirname(Es.default.resolve(e)):Es.default.dirname(Es.default.resolve(__filename))}return Es.default.dirname((0,eH.fileURLToPath)(__agentWitchImportMetaUrl))}});var oH,nH,sH,iH,He,Cs,aH,lH,ks,Nv,jv,Dv,cH,zv,dH,ug=l(()=>{"use strict";oH=require("node:crypto"),nH=m(require("node:fs")),sH=m(require("node:path")),iH=require("node:url");Hl();ro();rH();He=new Map,aH=async()=>{if(Cs!==void 0)return Cs;try{if(Ue()){let e=tH(),t=sH.default.join(e,"deps","node-pty","lib","index.js");if(nH.default.existsSync(t)){let r=await import((0,iH.pathToFileURL)(t).href);return Cs=r,r}}return Cs=await import("node-pty"),Cs}catch{return Cs=null,null}},lH=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},ks=(e,t,r)=>{let o=He.get(e);if(o!==void 0){He.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},Nv=(e,t)=>{let r=He.get(e);return r===void 0?!1:(r.pty.write(t),!0)},jv=(e,t,r)=>{let o=He.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},Dv=e=>{for(let t of He.values())if(!(t.mode!=="agent"||t.runId!==e))return cr(t.pty.pid);return!1},cH=e=>{for(let[t,r]of He.entries())if(!(r.mode!=="agent"||r.runId!==e)){He.delete(t);try{r.pty.kill()}catch{}return!0}return!1},zv=async e=>{let t=await aH();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;He.get(e.shellSessionId)!==void 0&&ks(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return He.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{lH(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{He.get(e.shellSessionId)?.pty===n&&(He.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},dH=async e=>{let t=e.shellSessionId??(0,oH.randomUUID)(),r=await aH();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return He.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{lH(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{He.get(t)?.pty===o&&(He.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var pg,uH,pH=l(()=>{"use strict";pg="[[AWAITING_INPUT]]",uH=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",pg,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Zl,mH,mg=l(()=>{"use strict";pH();Zl=e=>{let t=e.indexOf(pg);if(t<0)return null;let o=e.slice(t+pg.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},mH=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",uH].join(`
`)});var gH,fH=l(()=>{"use strict";dg();ug();mg();gH=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(Nt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}dr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await dH({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Zl(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var hH,yH,SH,ur,gg=l(()=>{"use strict";hH=require("node:child_process"),yH=m(require("node:fs")),SH=m(require("node:path"));kd();ur=(e,t)=>{let r=SH.default.join(e,"app",XL,"ensure-writer.sh");return yH.default.existsSync(r)?new Promise((o,n)=>{let s=(0,hH.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{n(i)}),s.on("close",i=>{if(i===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var AH,tn,ec,fg,$v,Ql,hg,yg,Hv,Fv,bJ,Rs,PJ,wJ,Uv,Bv=l(()=>{"use strict";AH=require("node:child_process");dt();gg();ig();sg();ql();ag();tn=new Map,ec=e=>e==="cursor"||e==="antigravity",fg=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",$v=e=>tn.get(e)?.warmed===!0,Ql=e=>{let t=tn.get(e);tn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},hg=e=>tn.get(e)?.conversationStarted===!0,yg=e=>{let t=tn.get(e);tn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},Hv=e=>{tn.delete(e)},Fv=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",bJ={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Rs=e=>`${bJ[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,PJ=(e,t,r,o)=>new Promise(n=>{let s=Fd(t,r),i=[],a=(0,AH.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),wJ=(e,t)=>{let r=Rs(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},Uv=async e=>{if(!ae(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Re(e.runConfig.writerExecutionBackend)==="api"){let r=Be(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=be(e.runConfig.layout.configPath);return De(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),Ql(e.writerAgent),{exitCode:0,output:Rs(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await ur(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}ec(e.writerAgent)&&Ql(e.writerAgent);let t=await PJ(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?wJ(e.writerAgent,t.output):Rs(e.writerAgent)}}});var rn,Gv=l(()=>{"use strict";rn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var bH,vJ,_J,PH,WJ,Vv,wH=l(()=>{"use strict";Gv();bH=/you(?:'|')ve hit your session limit/i,vJ=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],_J=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,PH=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},WJ=e=>{let t=_J.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},Vv=e=>{let t=e.trim();if(t.length===0)return null;if(bH.test(t))return{code:rn.SESSION_LIMIT,resetHint:WJ(t),matchedLine:PH(t,bH)};for(let r of vJ)if(r.test(t))return{code:rn.PROVIDER_QUOTA,resetHint:null,matchedLine:PH(t,r)};return null}});var Sg,Ag,qv,Kv=l(()=>{"use strict";Sg="[[AGENT_RUN_WRITER_EXECUTION]]",Ag="cli-writer-api-key-missing",qv="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var Jv=l(()=>{"use strict";Kv()});var vH=l(()=>{"use strict";Jv()});var bg=l(()=>{"use strict";Gv();wH();Kv();Jv();vH()});var Pg,_H=l(()=>{"use strict";Pg={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var WH,LH=l(()=>{"use strict";WH="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var EH,CH=l(()=>{"use strict";bg();LH();EH=e=>e.code===rn.SESSION_LIMIT?WH:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var kH,RH=l(()=>{"use strict";bg();_H();CH();kH=e=>{let t=Vv(e.output);return t!==null?{status:Pg.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:EH(t)}:{status:e.exitCode===0?Pg.COMPLETED:Pg.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var Yv,CCe,xH=l(()=>{"use strict";Yv={OPEN:"open",APPROVAL:"approval"},CCe=Yv.APPROVAL});var xs,wg,TH,CJ,IH,OH,MH,tc,Xv,Zv=l(()=>{"use strict";xs=m(require("node:fs")),wg=m(require("node:path")),TH="runs",CJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),IH=e=>{let t=e.profileEmail!==null?wg.default.join(e.installDir,"profiles",e.profileEmail,TH):wg.default.join(e.installDir,TH);return xs.default.mkdirSync(t,{recursive:!0}),t},OH=(e,t)=>wg.default.join(IH(e),`${t}.json`),MH=(e,t)=>{xs.default.writeFileSync(OH(e,t.id),JSON.stringify(t,null,2))},tc=(e,t)=>{let r=OH(e,t);if(!xs.default.existsSync(r))return null;try{let o=JSON.parse(xs.default.readFileSync(r,"utf8"));return!CJ(o)||typeof o.id!="string"?null:o}catch{return null}},Xv=e=>{let t=IH(e),r=xs.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=tc(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var kJ,NH,jH=l(()=>{"use strict";RH();xH();Zv();kJ=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=kH({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:Yv.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},NH=(e,t)=>{let r=kJ(t);return MH(e,r),r}});var DH=l(()=>{"use strict";Mm()});var zH,$H=l(()=>{"use strict";bg();zH=()=>[Sg,`agentRunWriterExecutionBackend=${Ag}`,`agentRunWriterExecutionReasonCode=${qv}`].join(`
`)});var $r,vg=l(()=>{"use strict";$r=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Qv,RJ,xJ,HH,FH=l(()=>{"use strict";Qv=e=>e.toLocaleString("en-US"),RJ=e=>e<.01?e.toFixed(4):e.toFixed(3),xJ=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${RJ(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Qv(e.inputTokens)} in / ${Qv(e.outputTokens)} out (${Qv(e.totalTokens)} total)`,t].join(`
`)},HH=(e,t)=>{if(t===void 0)return e;let r=xJ(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var UH=l(()=>{"use strict";ce()});var GH,rc,ge,e_,_g,BH,TJ,IJ,VH,qH,KH,oc,t_,r_,o_,JH,OJ,nt,nc,Hr,YH,MJ,NJ,Wg,n_,s_,i_,XH=l(()=>{"use strict";GH=require("node:child_process");ce();dt();z$();wl();Rv();U$();Ud();q$();lg();J$();Hl();Z$();dg();ug();mg();fH();Bv();jH();DH();$H();vg();FH();yn();UH();ql();ni();mg();rc=new Map,ge=new Map,e_=new Set,_g=new Map,BH=e=>{e!==void 0&&!_g.has(e)&&_g.set(e,Date.now())},TJ=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(Nt(t)){nt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}dr(t,n)},IJ=(e,t,r,o,n)=>{if(!sy(e,n))return;let s=`${zH()}
`;TJ(t,r,o,s);let i=ge.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},VH=130,qH=`

Stopped by user.`,KH=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:$r(e)},oc=null,t_=e=>{oc=e},r_=(e,t)=>{if(oc===null)return;let r=ew(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||oS(oc,t,r)},o_=async e=>{await Tv({layout:e,cloudApi:oc})},JH=e=>{let t=rc.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:cr(t.pid)},OJ=e=>le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),nt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},nc=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=pn(s),c=ge.get(r);if(a!==null&&c!==void 0){let d=aE(a),p=JH(r)||Dv(r);d!==null&&!p&&Hr(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return iE(a)}}),Hr=(e,t,r,o,n,s,i,a)=>{let c=_n(s,a),d=n,p=HH(c.output,c.llmUsage);if(r!==void 0){let S=_g.get(r);_g.delete(r),S!==void 0&&ZP({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-S)/1e3))});let h=F$(c.llmUsage,p);h!==null&&lD({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&e_.has(r)&&(e_.delete(r),d=VH,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${qH}`:"Stopped by user.");let g=r!==void 0?ew(e.layout.reportsDir,r):null;if(r!==void 0){Yl(r),Ci(e.layout,r),Nt(r)&&(nt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),Q$(r));let S=ge.get(r);sD({reportsDir:e.layout.reportsDir,agentRunId:r,input:$r(i),output:p,...S!==void 0?{writerLabel:Kl({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&Im({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),NH(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),V$(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),Tv({layout:e.layout,cloudApi:oc}),ge.delete(r),rc.delete(r),ng(e.layout,r)}nt(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),mi(e.layout)},YH=(e,t,r,o,n,s,i)=>{let a=ge.get(r),c=a?.accumulatedOutput??s;D$(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),en(t,r,()=>kv(e.layout,r),nc(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),nt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},MJ=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(n===void 0||h.length===0)){if(Nt(n)){nt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}dr(n,h)}};if(n!==void 0){let h=ge.get(n);rc.set(n,t),ge.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),nt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),en(r,n,()=>JH(n),nc(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let g=a==="claude-cli",S=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(g?S.push(y):(c.push(y),p(y)),d||n===void 0)return;let u=Zl(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let A=ge.get(n),b=[A?.accumulatedOutput??"",u.partialOutput].filter(f=>f.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=b),rc.delete(n),YH(e,r,n,o,u.question,b,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;yg(a);let y=n!==void 0?ge.get(n):void 0,u=g?_n(S.join("")):{output:c.join("").trim(),llmUsage:void 0},A=g?c.join("").trim():"",b=[u.output.trim(),A].filter(w=>w.length>0).join(`
`);g&&u.output.trim().length>0&&p(u.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${b}`.trim():b;Hr(e,r,n,o,h??-1,f,s,u.llmUsage)}),t.on("error",h=>{d||Hr(e,r,n,o,-1,h.message,s)})},NJ=(e,t,r,o,n,s,i,a,c)=>{let d=KH(r,c);s!==void 0&&(ge.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),nt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),en(n,s,()=>ge.has(s),nc(e,n,s,o,i,a))),_i(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(Nt(s)){nt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}dr(s,g)}}).then(g=>{yg(t),Hr(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let S=g instanceof Error?g.message:String(g);Hr(e,n,s,o,-1,S,r)})},Wg=(e,t,r,o,n,s,i,a,c,d,p,g)=>{let S=KH(r,p);if(pi(e.layout),po(e,t)){BH(s),NJ(e,t,r,o,n,s,c,d,S);return}let h=Wt(t,r,OJ(e),i);if(h===null){Hr(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}BH(s);let y=X$({workspace:e.workspace,projectFolderPath:c}),u=()=>{let A=(0,GH.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:g??process.env});MJ(e,A,n,o,s,r,S,t)};if(s===void 0){u();return}ge.set(s,{originalPrompt:r,userTranscriptPrompt:S,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:ge.get(s)?.accumulatedOutput??""}),IJ(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&oi({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),en(n,s,()=>ge.has(s),nc(e,n,s,o,c,d)),gH({socket:n,sendMessage:nt,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:A=>{a!==void 0&&ks(a,w=>{nt(n,w)},o);let b=ge.get(s),f=[b?.accumulatedOutput??"",A.partialOutput].filter(w=>w.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=f),YH(e,n,s,o,A.question,f,r)},onFinished:(A,b)=>{yg(t);let f=_n(b),w=ge.get(s),v=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${f.output}`.trim():f.output;Hr(e,n,s,o,A,v,r,f.llmUsage)}}).then(A=>{if(!A){u();return}en(n,s,()=>Dv(s),nc(e,n,s,o,c,d))}).catch(A=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",A instanceof Error?A.message:A),u()})},n_=(e,t,r,o)=>{ng(e.layout,t.agentRunId),t.shellSessionId!==void 0&&nt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=mH(t),s=ge.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;Wg(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},s_=(e,t)=>{for(let r of j$(e.layout))ge.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:$r(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),en(t,r.agentRunId,()=>kv(e.layout,r.agentRunId),{awaitingInput:!0}),nt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},i_=(e,t,r,o)=>{let n=ge.get(r);if(n===void 0)return!1;e_.add(r),Yl(r);let s=rc.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(cH(r))return!0;ng(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${qH}`:"Stopped by user.";return Hr(e,t,r,o,VH,i,n.originalPrompt),!0}});var jJ,a_,ZH=l(()=>{"use strict";Ti();jJ=()=>`http://127.0.0.1:${ut()}/restart`,a_=async()=>{try{let e=await fetch(jJ(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var QH=l(()=>{"use strict";ba()});var eF=l(()=>{"use strict";kw()});var tF,rF=l(()=>{"use strict";tF=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var sc,DJ,l_,oF=l(()=>{"use strict";V();te();QH();FS();eF();rF();yn();sc=(e,t)=>{Er(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},DJ=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Ph(),bh)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},l_=async e=>{let t=Ce(e.layout.installDir)?.bundleVersion??null;if(!tF({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(ct(e.layout)){gi({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),sc(e.layout,{summary:r,action:"install-bundle-update-start"}),$t({launchAgentLabel:oe(e.layout.installDir),installDir:e.layout.installDir});let o=await ys({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),sc(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await DJ();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),sc(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),sc(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),sc(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var zJ,c_,nF=l(()=>{"use strict";zJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),c_=e=>{if(!zJ(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var d_,u_,sF=l(()=>{"use strict";wS();vS();d_=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=ra({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},u_=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Jt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var iF,$J,HJ,FJ,ic,aF=l(()=>{"use strict";iF=m(require("node:os"));Ee();$J="Default",HJ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),FJ=e=>{let t=iF.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},ic=()=>{let e=M(),t=Sd(e),r=HJ($J);return`${FJ(t)}/${r.length>0?r:"project"}`}});var lF=l(()=>{"use strict";ba()});var cF,p_,dF=l(()=>{"use strict";lF();cF=!1,p_=e=>{cF||(cF=!0,process.on("uncaughtException",t=>{Eo(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;Eo(e,{kind:"crash",message:r,stack:o})}))}});var uF,UJ,m_,pF=l(()=>{"use strict";uF=require("node:child_process");gg();dt();ig();sg();ql();ag();UJ=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,uF.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},m_=async e=>{if(!ae(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Re(e.runConfig.writerExecutionBackend)==="api"){let r=Be(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=be(e.layout.configPath),n=De(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await ur(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await UJ(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var g_,mF=l(()=>{"use strict";g_=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var gF,f_,fF=l(()=>{"use strict";gF=require("node:crypto"),f_=()=>(0,gF.randomUUID)()});var Ts,hF,Lg=l(()=>{"use strict";Ts="[[WORKING_ESTIMATE]]",hF=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Ts,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var yF,SF=l(()=>{"use strict";yF=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var BJ,AF,bF=l(()=>{"use strict";Lg();BJ=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,AF=e=>{if(!e.includes(Ts))return null;let t=null;for(let r of e.matchAll(BJ)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var GJ,h_,PF=l(()=>{"use strict";bF();GJ=/^(\d{1,6})\b/,h_=e=>{let t=AF(e);if(t!==null)return t;let r=GJ.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var VJ,qJ,KJ,Eg,y_=l(()=>{"use strict";dt();ya();VJ="http://127.0.0.1:11434",qJ=45e3,KJ=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Eg=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||VJ,o=t===void 0?(await ft({commands:le({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(qJ)});return n.ok?KJ(await n.json()):null}catch{return null}}});var S_,A_,b_,wF=l(()=>{"use strict";ni();Lg();vg();SF();PF();wl();y_();S_=async e=>{let t=$r(e.wrappedPrompt),r=iD(e.reportsDir);return{estimateOutput:await Eg(hF(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},A_=e=>{let t=h_(e.estimateOutput);t!==null&&Lm({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},b_=e=>{let t=h_(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=yF(t);return ri({reportKey:e.reportKey,agentRunId:e.agentRunId,status:vt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),Lm({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var Cg,vF,P_=l(()=>{"use strict";Cg="[[WORKING_TOKEN_ESTIMATE]]",vF=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Cg,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var _F,JJ,WF,LF=l(()=>{"use strict";P_();_F=/^(\d{1,8})\b/,JJ=e=>{let t=e.indexOf(Cg);if(t<0)return null;let r=e.slice(t+Cg.length).trim(),o=_F.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},WF=e=>{let t=JJ(e);if(t!==null)return t;let r=_F.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var w_,v_,EF=l(()=>{"use strict";P_();vg();LF();wl();y_();w_=async e=>{let t=$r(e.wrappedPrompt),r=cD(e.reportsDir);return{estimateOutput:await Eg(vF(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},v_=e=>{let t=WF(e.estimateOutput);return t===null?null:(aD({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var CF=l(()=>{"use strict";_v();E$();k$();I$();Ti();XH();gg();dt();Zv();dg();ZH();xS();oF();yn();nF();sF();lg();aF();dF();pF();Rd();mF();fF();Lg();ni();wF();EF();Rv();ya();ug();Bv()});var kF={};bt(kF,{buildContinuationPromptWithContext:()=>ZJ});var YJ,XJ,ZJ,RF=l(()=>{"use strict";YJ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,XJ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),ZJ=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=XJ(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${YJ(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var xF={};bt(xF,{readHarnessExportSets:()=>e7});var ac,__,kg,QJ,e7,TF=l(()=>{"use strict";ac=m(require("node:fs")),__=m(require("node:path"));Ee();kg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),QJ=e=>{if(!ac.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(ac.default.readFileSync(e.harnessManifestPath,"utf8"));if(kg(t))return t}catch{return null}return null},e7=(e,t)=>{let r=M(t),o=QJ(r);if(o===null)return[];let n=kg(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!kg(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!kg(p))continue;let g=typeof p.path=="string"?p.path:void 0,S=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(g===void 0||S.length===0||h.length===0||y.length===0)continue;let u=g.startsWith("shared/")?__.default.join(r.harnessRootDir,g):__.default.join(r.harnessSetsDir,i,g);ac.default.existsSync(u)&&d.push({id:S,kind:h,title:y,content:ac.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var x_,L_,Is,IF,t7,OF,MF,W_,NF,E_,C_,k_,X,G,R_,r7,lc,o7,n7,s7,i7,a7,l7,c7,d7,cc,jF=l(()=>{"use strict";x_=require("node:child_process"),L_=m(require("node:fs")),Is=m(require("node:os"));S$();V();te();jn();Hw();w$();ce();Ye();ba();ZA();Hm();Mm();mt();yo();QS();Bt();CF();IF=3e4,t7=3e4,OF=new Map,MF=new Map,W_=new Map,NF=new Map,E_=new Map,C_=new Map,k_=new Map,X=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),G=(e,t,r)=>{e.readyState===$l.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Er(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),mp(r,"out",t)))},R_=e=>e,r7=e=>{if(!L_.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(L_.default.readFileSync(e.harnessManifestPath,"utf8"));if(X(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},lc=(e,t)=>{let r=r7(t);r!==null&&G(e,{type:"harness.manifest.report",payload:{hostname:Is.default.hostname(),manifest:r}})},o7=async(e,t,r,o,n,s,i=!1,a,c,d,p,g)=>{let S=g?.trim()??"";if(!ae(t)){G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=Kl({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await ft({commands:le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?S_({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=s!==void 0?w_({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,b=ec(t)&&!$v(t);if(b){try{await ur(e.layout.installDir,t)}catch($){let We=$ instanceof Error?$.message:String($);G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${We}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Ql(t)}else if(!ec(t))try{await ur(e.layout.installDir,t)}catch($){let We=$ instanceof Error?$.message:String($);G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${We}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Li(d,ic,g);if(f===null){G(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Ge({projectFolderPath:f,...S.length>0?{projectId:S}:{}}),i||El(e.layout,t,f);let w=Om({sessionContinuation:i,supportsWriterSessionContinuation:fg(t),isWriterConversationStarted:hg(t)}),v=i&&w==="first"?Ll(e.layout,t,f):null,_=v!==null?hs(e.layout,v):null,L=_!==null&&_.turns.length>0,C=fw({sessionContinuation:i,supportsWriterSessionContinuation:fg(t),isWriterConversationStarted:hg(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:L,userPromptCharacterCount:r.length}),x=r;if(C.continuationStrategy==="source_run_seed"){let $=typeof c=="string"&&c.length>0?tc(e.layout,c):null;if($!==null){let{buildContinuationPromptWithContext:We}=await Promise.resolve().then(()=>(RF(),kF));x=We({priorPrompt:$.prompt,priorOutput:$.resultOutput??"",userMessage:r})}}else C.continuationStrategy==="transcript_seed"&&_!==null&&_.turns.length>0&&(x=km({priorTurns:_.turns,userMessage:r}));let I=C.ragLimit>0?await Kn({layout:e.layout,query:x,limit:C.ragLimit,minScore:C.ragMinScore,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],D=C.ragLimit>0&&f.trim().length>0?await YA({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],re=C.injectMemory?sw(e.layout,f,S.length>0?S:void 0):[],B=`${aw(re,C.memoryEntryLimit)}${qA(I)}${XA(D)}${x}`,q=p?.trim()??(s!==void 0&&f.trim().length>0?f_():void 0);if(s!==void 0&&q!==void 0&&q.length>0&&f.trim().length>0){oi({reportKey:q,agentRunId:s,userSummary:"Working on your Mac\u2026"});let $=B;u!==null&&u.then(We=>{if(We===null)return;let At=b_({estimateOutput:We.estimateOutput??"",reportKey:q,agentRunId:s,reportsDir:e.layout.reportsDir,task:We.task,writerLabel:We.writerLabel,embedding:We.embedding});if(At.estimateSeconds===null)return;r_(e.layout.reportsDir,s);let dc=`${Ts}
${At.estimateSeconds}
`;if(Nt(s)){G(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:dc},requestId:o});return}dr(s,dc)}).catch(()=>{}),B=g_($),B=Vf(B,{agentRunId:s,reportKey:q,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then($=>{$!==null&&A_({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel,embedding:$.embedding})}).catch(()=>{}),s!==void 0&&A!==null&&A.then($=>{$!==null&&v_({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel})}).catch(()=>{});let Fr=s!==void 0&&k_.get(s)===!0;if(s!==void 0&&f.trim().length>0){let $=await Fu(f);C_.set(s,$),q!==void 0&&q.length>0&&E_.set(s,q)}Wg(e,t,B,o,R_(n),s,{sessionTurn:C.sessionTurn},a,f,q,r,Qh(e.layout,s,Fr)),b&&s!==void 0&&G(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Fv(t)},requestId:o})},n7=async(e,t,r,o,n)=>{let s=(i,a)=>{G(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await Uv({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,G(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=ae(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Rs(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},s7=(e,t,r)=>new Promise(o=>{if(!ae(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Wt(t,r,le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,x_.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),i7=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;G(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Et(t.bundle),s=X(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=ke(e.wsUrl)??Ft,g=await zy({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=ho({bundle:i,layout:e.layout});return G(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&lc(o,e.layout),!0},a7=async(e,t,r,o)=>{if(await i7(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(G(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!ae(n)){G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}pi(e.layout);let i=await(async()=>{try{await ur(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return s7(e,n,s)})().finally(()=>{mi(e.layout)});G(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),lc(o,e.layout)},l7=e=>{let t=1e3*2**e;return Math.min(t7,t)},c7=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(ct(e.layout)){mh(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,a_().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(u,A="system.ack")=>{if(!t.selfUpdateInFlight){if(ct(e.layout)){gi({layout:e.layout,remoteBundleVersion:u,trigger:A}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${A}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,l_({layout:e.layout,remoteBundleVersion:u,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let u=Pe(e.layout);u!==null&&je(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===$l.OPEN||u.readyState===$l.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,IF)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=l7(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},g=u=>{s();let A=()=>{let b=li(e.layout.installDir),f=ut();G(u,{type:"agent.heartbeat",payload:{hostname:Is.default.hostname(),macOsUsername:Is.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:b}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,IF)},S=(u,A)=>{if(typeof u.type!="string")return;if(ZS(u)){t.stopped=!0,s(),a(),c(),KS({layout:e.layout}).finally(()=>{Fl(),process.exit(0)});return}Er(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),mp(e.layout,"in",u);let b=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&X(u.payload)){let f=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",w=typeof u.payload.origin=="string"?u.payload.origin:"",v=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",_=typeof u.payload.challenge=="string"?u.payload.challenge:"",L=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!$w({serverPublicKey:f,origin:w,devicePublicKey:v,challenge:_,serverAttestation:L})){t.wakeError="Server attestation verification failed",Er(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&X(u.payload)){let f=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";Er(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),m_({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{G(A,{type:"writer.status",payload:w},e.layout)})}if(u.type==="install.bundle.update"&&X(u.payload)){let f=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";f.length>0&&o(f,"install.bundle.update")}if(u.type==="system.ack"){Ju(e.layout,{wsUrl:e.wsUrl});let f=X(u.payload)?u.payload:null,w=c_(f);w!==null&&o(w)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&X(u.payload)&&d_(u.payload),u.type==="automations.run"&&X(u.payload)&&u_(u.payload),u.type==="terminal.stream.accepted"&&X(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"";if(f.length>0){let w=Mv(f);for(let v of w)G(A,{type:"terminal.stream.chunk",payload:{runId:f,chunk:v},requestId:b})}}if(u.type==="agent.agentRun.list"&&G(A,{type:"dashboard.agentRun.list.result",payload:{runs:Xv(e.layout)},requestId:b}),u.type==="agent.agentRun.get"&&X(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"",w=f.length>0?tc(e.layout,f):null;G(A,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:b})}if(u.type==="command.claude.run"&&X(u.payload)){let f=u.payload.prompt,w=typeof u.payload.writerAgent=="string"&&ae(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",v=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,_=u.payload.sessionContinuation===!0,L=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,C=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,x=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=Li(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,ic,x),D=Vh(u.payload.compositionSnapshot),re=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${_?"continue":"first"})\u2026`),I===null){G(A,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...v!==void 0?{agentRunId:v}:{}},requestId:b});return}if(D!==null){let B=Kh(e.layout,D);if(B!==null){G(A,{type:"command.claude.result",payload:{exitCode:-1,output:B,...v!==void 0?{agentRunId:v}:{}},requestId:b});return}if(v!==void 0){let q=Yh(e.layout,v,D);if(!q.ok){G(A,{type:"command.claude.result",payload:{exitCode:-1,output:q.errorMessage,...v!==void 0?{agentRunId:v}:{}},requestId:b});return}k_.set(v,D.entries.some(Fr=>Fr.scope==="run"))}}v!==void 0&&C!==void 0&&OF.set(v,C),v!==void 0&&(MF.set(v,I),x!==void 0&&x.trim().length>0&&W_.set(v,x.trim()),NF.set(v,f.trim()),Ge({projectFolderPath:I,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),o7(e,w,f.trim(),b,A,v,_,C,L,I,re,x)}}if(u.type==="shell.session.open"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:120,v=typeof u.payload.rows=="number"?u.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),zv({shellSessionId:f,cwd:e.workspace,cols:w,rows:v,send:_=>{G(A,_)},requestId:b}))}if(u.type==="shell.session.close"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";f.length>0&&ks(f,w=>{G(A,w)},b)}if(u.type==="shell.input"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.data=="string"?u.payload.data:"";f.length>0&&w.length>0&&Nv(f,w)}if(u.type==="shell.resize"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:0,v=typeof u.payload.rows=="number"?u.payload.rows:0;f.length>0&&w>0&&v>0&&jv(f,w,v)}if(u.type==="command.writer.session.end"&&X(u.payload)){let f=u.payload.writerAgent;typeof f=="string"&&ae(f)&&(Hv(f),Tm(e.layout,f))}if(u.type==="command.writer.session.start"&&X(u.payload)){let f=u.payload.writerAgent,w=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof f=="string"&&ae(f)&&w.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),n7(e,f,w,b,A))}if(u.type==="command.claude.stop"&&X(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),i_(e,R_(A),f,b))}if(u.type==="command.claude.input_respond"&&X(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",w=typeof u.payload.response=="string"?u.payload.response.trim():"",v=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",_=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",L=typeof u.payload.question=="string"?u.payload.question:"";f.length>0&&w.length>0&&v.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),n_(e,{agentRunId:f,originalPrompt:v,partialOutput:_,question:L,response:w,shellSessionId:OF.get(f)},b,R_(A)))}if(u.type==="dispatch.approval.required"&&X(u.payload)){let f=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",w=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${w}`),process.platform==="darwin"&&(0,x_.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&X(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),a7(e,u.payload,b,A)),u.type==="harness.export.request"&&X(u.payload)){let f=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",w=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,v=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(_=>typeof _=="string"):[];f.length>0&&v.length>0&&(async()=>{let{readHarnessExportSets:_}=await Promise.resolve().then(()=>(TF(),xF)),L=_(v,e.email);G(A,{type:"harness.export.result",payload:{success:L.length>0,borrowerUserId:f,...w!==void 0?{targetDeviceId:w}:{},sets:L,errorMessage:L.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(u.type==="harness.manifest.request"&&lc(A,e.layout),u.type==="command.claude.result"&&X(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,w=typeof u.payload.output=="string"?u.payload.output:"",v=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,_=Li(f!==void 0?MF.get(f):void 0,ic),L=f!==void 0?W_.get(f):void 0,C=f!==void 0?NF.get(f)??"":"",x=mS({exitCode:v,output:w});if(x&&_!==null&&VA({layout:e.layout,text:w,source:f??"command.claude.result",projectFolderPath:_,...L!==void 0?{projectId:L}:{}}),v!=null&&v!==0&&w.trim().length>0&&_!==null&&(HA({layout:e.layout,errorText:w,projectFolderPath:_,...L!==void 0?{projectId:L}:{}}),JA({layout:e.layout,text:w,source:f??"command.claude.result.failure",projectFolderPath:_,...L!==void 0?{projectId:L}:{}})),x&&C.trim().length>0&&_!==null&&iw({layout:e.layout,projectFolderPath:_,...L!==void 0?{projectId:L}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:C,output:w,createdAt:new Date().toISOString()}}),f!==void 0&&_!==null){let D=E_.get(f),re=C_.get(f);D!==void 0&&re!==void 0&&Fu(_).then(B=>{let q=gS({before:re,after:B});qf(D,q),C_.delete(f),E_.delete(f)})}if(x&&L!==void 0&&L.trim().length>0){let D=H(),re=D===null?null:Z({wsUrl:D.wsUrl,pairingToken:D.pairingToken});re!==null&&hS(re,L,{...f!==void 0?{sourceRunId:f}:{},lesson:fS({prompt:C,output:w})})}f!==void 0&&(Ci(e.layout,f),k_.delete(f),W_.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let u=new $l(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),t_(Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),o_(e.layout);let A=ke(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=zw({layout:e.layout,origin:A,...b!==void 0&&b.length>0?{claimToken:b}:{}});G(u,{type:"agent.register",payload:{role:"agent",hostname:Is.default.hostname(),macOsUsername:Is.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),lc(u,e.layout),s_(e,u),g(u)}),u.on("message",A=>{let b=typeof A=="string"?A:A.toString("utf8");try{let f=JSON.parse(b);if(!X(f))return;S(f,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(A,b)=>{s(),t.socket=void 0,t.wsConnected=!1,LS(e.layout),t.reconnectAttempt+=1;let f=typeof b=="string"?b:b.toString("utf8");Eo(e.layout,{kind:"ws_close",message:"WebSocket closed",code:A,reason:f}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",A=>{t.wakeError=A.message,Eo(e.layout,{kind:"ws_error",message:A.message,stack:A.stack}),console.error(`[agent-witch] Socket error: ${A.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return ph(()=>{let u=gh();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&o(u.remoteBundleVersion,u.trigger);let A=fh();A!==null&&r(A)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:la(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Tl(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(lc(u,e.layout),{ok:!0})}}},d7=async()=>{Fe("agent-witch");let e=Av(),t=E();vv().ok||(process.platform==="darwin"?(await Qr(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),Ev(t);let o=Lv({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&($t({launchAgentLabel:oe(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),Js());let n=await ly(),s=n[0];s!==void 0&&p_(s.layout);for(let h of n){let y=ke(h.wsUrl)??Ft;ci(h.layout.installDir,y)}let i=n.map(h=>c7(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),Fl(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let A=Pe(h.layout);ES(A,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(ct(h)||ca(h.installDir))},g=await Cv({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):xl({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let S=Ht(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Ys(),d()});d=()=>{S(),g.stop(),Fl(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},cc=d7});var T_=l(()=>{"use strict";jF()});var DF={};bt(DF,{startAgentWitchClient:()=>cc});var zF=l(()=>{"use strict";T_();T_();ro();Kf();Td();if(!Ue()&&oo(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(xd(process.argv.slice(e))),cc()}});Bf();Kf();ro();Td();var dE="20.x",uE="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var U2=e=>[`Node.js ${dE} or newer is required (found ${e}).`,uE].join(" "),pE=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${U2(process.version)}
`),process.exit(1))};var u7=async()=>{Fe("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Ph(),bh)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},p7=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(mx(),px)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},m7=async()=>{if(!oo(Ue()?void 0:__agentWitchImportMetaUrl))return;pE();let e=process.argv.indexOf("report");e>=0&&process.exit(xd(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await u7();return}if(t==="wake"){await p7();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(gT(),mT));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(mz(),pz));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(zF(),DF));await r()};m7();
