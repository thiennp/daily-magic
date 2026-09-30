#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var l1=Object.create;var zg=Object.defineProperty;var c1=Object.getOwnPropertyDescriptor;var d1=Object.getOwnPropertyNames;var u1=Object.getPrototypeOf,p1=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var W=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},bt=(e,t)=>{for(var r in t)zg(e,r,{get:t[r],enumerable:!0})},m1=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of d1(t))!p1.call(e,n)&&n!==r&&zg(e,n,{get:()=>t[n],enumerable:!(o=c1(t,n))||o.enumerable});return e};var m=(e,t,r)=>(r=e!=null?l1(u1(e)):{},m1(t||!e||!e.__esModule?zg(r,"default",{value:e,enumerable:!0}):r,e));var an=W($g=>{"use strict";Object.defineProperty($g,"__esModule",{value:!0});$g.stringify=g1;function g1(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=W(Hg=>{"use strict";Object.defineProperty(Hg,"__esModule",{value:!0});Hg.generateTypeGuardError=f1;var F_=an();function f1(e,t,r){return(0,F_.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,F_.stringify)(e)}) to be "${r}"`}});var hr=W(gc=>{"use strict";Object.defineProperty(gc,"__esModule",{value:!0});gc.isNonNullObject=void 0;var h1=O(),y1=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,h1.generateTypeGuardError)(e,t.identifier,"non-null object")),r};gc.isNonNullObject=y1});var Pt=W(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.attachTypeGuardMeta=he.isArrayTypeGuard=he.isNestedObjectTypeGuard=he.getTypeGuardWrapperKind=he.getTypeGuardInnerGuard=he.getTypeGuardItemGuard=he.getTypeGuardSchema=void 0;var S1=e=>e.schema;he.getTypeGuardSchema=S1;var A1=e=>e.itemGuard;he.getTypeGuardItemGuard=A1;var b1=e=>e.innerGuard;he.getTypeGuardInnerGuard=b1;var P1=e=>e.wrapperKind;he.getTypeGuardWrapperKind=P1;var w1=e=>{if((0,he.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};he.isNestedObjectTypeGuard=w1;var v1=e=>{if((0,he.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};he.isArrayTypeGuard=v1;var _1=(e,t)=>Object.assign(e,t);he.attachTypeGuardMeta=_1});var $s=W(qr=>{"use strict";Object.defineProperty(qr,"__esModule",{value:!0});qr.getExpectedTypeName=qr.getTypeGuardDisplayName=void 0;var U_=Pt(),W1=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};qr.getTypeGuardDisplayName=W1;var L1=e=>{let t=(0,U_.getTypeGuardWrapperKind)(e),r=(0,U_.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,qr.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};qr.getExpectedTypeName=L1});var Kr=W(fc=>{"use strict";Object.defineProperty(fc,"__esModule",{value:!0});fc.createValidationResult=void 0;var E1=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});fc.createValidationResult=E1});var ln=W(hc=>{"use strict";Object.defineProperty(hc,"__esModule",{value:!0});hc.createValidationError=void 0;var k1=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});hc.createValidationError=k1});var cn=W(yc=>{"use strict";Object.defineProperty(yc,"__esModule",{value:!0});yc.createTreeNode=void 0;var C1=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});yc.createTreeNode=C1});var Hs=W(Sc=>{"use strict";Object.defineProperty(Sc,"__esModule",{value:!0});Sc.combineResults=void 0;var R1=Kr(),x1=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,R1.createValidationResult)(r,o,n)};Sc.combineResults=x1});var bc=W(Ac=>{"use strict";Object.defineProperty(Ac,"__esModule",{value:!0});Ac.createSimplifiedTree=void 0;var B_=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=B_(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},T1=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=B_(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Ac.createSimplifiedTree=T1});var Us=W(wc=>{"use strict";Object.defineProperty(wc,"__esModule",{value:!0});wc.validateObject=void 0;var I1=hr(),Fs=Kr(),O1=ln(),Pc=cn(),M1=Hs(),G_=vc(),N1=(e,t,r)=>{let o=()=>{let i=(0,O1.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Pc.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Fs.createValidationResult)(!1,[],a):(0,Fs.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Fs.createValidationResult)(!0,[],(0,Pc.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,g=d,S=t[g],h=e[g],y=(0,G_.validateProperty)(g,h,S,r);return y.valid?p.length===0?(0,Fs.createValidationResult)(!0,[],(0,Pc.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,G_.validateProperty)(d,e[d],p,r)}),a=(0,M1.combineResults)(i,r.path),c=(0,Pc.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,Fs.createValidationResult)(a.valid,a.errors,c)};return(0,I1.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};wc.validateObject=N1});var q_=W(Lc=>{"use strict";Object.defineProperty(Lc,"__esModule",{value:!0});Lc.validateArray=void 0;var j1=an(),_c=Kr(),V_=ln(),Wc=cn(),D1=Hs(),z1=Us(),$1=$s(),H1=Pt(),F1=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,V_.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,Wc.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,_c.createValidationResult)(!1,[c],d)}let n=(0,H1.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,g={path:p,config:r.config||null};if(n)return(0,z1.validateObject)(c,n,g);let S=t(c,null),h=(0,$1.getExpectedTypeName)(t),y=(0,j1.stringify)(c);if(S)return(0,_c.createValidationResult)(!0,[],(0,Wc.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,A=(0,V_.createValidationError)(p,h,c,u),b=(0,Wc.createTreeNode)(p,!1,h,c);return b.errors=[A],(0,_c.createValidationResult)(!1,[A],b)}),i=(0,D1.combineResults)(s,o),a=(0,Wc.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,_c.createValidationResult)(i.valid,i.errors,a)};Lc.validateArray=F1});var vc=W(kc=>{"use strict";Object.defineProperty(kc,"__esModule",{value:!0});kc.validateProperty=void 0;var K_=Kr(),U1=ln(),J_=cn(),B1=$s(),Ec=Pt(),G1=Us(),V1=q_(),q1=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,Ec.getTypeGuardSchema)(r),c=(0,Ec.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,G1.validateObject)(t,a,s);if(c&&(0,Ec.isArrayTypeGuard)(r))return(0,V1.validateArray)(t,c,s)}let d=p=>{let g=r(t,p),S=(0,B1.getExpectedTypeName)(r);return g?(0,K_.createValidationResult)(!0,[],(0,J_.createTreeNode)(n,!0,S,t)):(()=>{let h=(0,U1.createValidationError)(n,S,t,`Expected ${n} (${JSON.stringify(t)}) to be "${S}"`),y=(0,J_.createTreeNode)(n,!1,S,t);return y.errors=[h],(0,K_.createValidationResult)(!1,[h],y)})()};if((0,Ec.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};kc.validateProperty=q1});var Rc=W(Cc=>{"use strict";Object.defineProperty(Cc,"__esModule",{value:!0});Cc.isNil=void 0;var K1=O(),J1=function(e,t){return e!=null?(t&&t.callbackOnError((0,K1.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Cc.isNil=J1});var Fg=W(xc=>{"use strict";Object.defineProperty(xc,"__esModule",{value:!0});xc.isDefined=void 0;var Y1=O(),X1=Rc(),Z1=function(e,t){return(0,X1.isNil)(e,null)?(t&&t.callbackOnError((0,Y1.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};xc.isDefined=Z1});var Ug=W(Tc=>{"use strict";Object.defineProperty(Tc,"__esModule",{value:!0});Tc.reportValidationResults=void 0;var Q1=bc(),Y_=Fg(),eU=Rc(),tU=(e,t)=>{if(e.valid===!0||(0,eU.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,Y_.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,Q1.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,Y_.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Tc.reportValidationResults=tU});var Bg=W(ee=>{"use strict";Object.defineProperty(ee,"__esModule",{value:!0});ee.Validation=ee.reportValidationResults=ee.validateObject=ee.validateProperty=ee.createSimplifiedTree=ee.combineResults=ee.createTreeNode=ee.createValidationError=ee.createValidationResult=ee.getExpectedTypeName=void 0;var rU=$s();Object.defineProperty(ee,"getExpectedTypeName",{enumerable:!0,get:function(){return rU.getExpectedTypeName}});var oU=Kr();Object.defineProperty(ee,"createValidationResult",{enumerable:!0,get:function(){return oU.createValidationResult}});var nU=ln();Object.defineProperty(ee,"createValidationError",{enumerable:!0,get:function(){return nU.createValidationError}});var sU=cn();Object.defineProperty(ee,"createTreeNode",{enumerable:!0,get:function(){return sU.createTreeNode}});var iU=Hs();Object.defineProperty(ee,"combineResults",{enumerable:!0,get:function(){return iU.combineResults}});var aU=bc();Object.defineProperty(ee,"createSimplifiedTree",{enumerable:!0,get:function(){return aU.createSimplifiedTree}});var lU=vc();Object.defineProperty(ee,"validateProperty",{enumerable:!0,get:function(){return lU.validateProperty}});var cU=Us();Object.defineProperty(ee,"validateObject",{enumerable:!0,get:function(){return cU.validateObject}});var dU=Ug();Object.defineProperty(ee,"reportValidationResults",{enumerable:!0,get:function(){return dU.reportValidationResults}});var uU=Kr(),pU=Hs(),mU=ln(),gU=cn(),fU=vc(),hU=Us(),yU=Ug(),SU=bc();ee.Validation={result:uU.createValidationResult,combine:pU.combineResults,error:mU.createValidationError,treeNode:gU.createTreeNode,property:fU.validateProperty,object:hU.validateObject,report:yU.reportValidationResults,createSimplifiedTree:SU.createSimplifiedTree}});var Ic=W(Gg=>{"use strict";Object.defineProperty(Gg,"__esModule",{value:!0});Gg.isType=bU;var X_=hr(),Z_=Bg(),AU=Pt();function bU(e){if(!(0,X_.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,Z_.validateObject)(r,e,s);return(0,Z_.reportValidationResults)(i,o||null),i.valid}return(0,X_.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,AU.attachTypeGuardMeta)(t,{schema:e})}});var rW=W(Jr=>{"use strict";Object.defineProperty(Jr,"__esModule",{value:!0});Jr.isNestedType=Jr.isShape=void 0;Jr.isSchema=Bs;var Q_=hr(),eW=Bg(),tW=Pt();function Bs(e){if(!(0,Q_.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=wU(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,eW.validateObject)(o,t,i);return(0,eW.reportValidationResults)(a,n||null),a.valid}return(0,Q_.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,tW.attachTypeGuardMeta)(r,{schema:t})}function PU(e){return typeof e=="function"?e:Array.isArray(e)?vU(e):typeof e=="object"&&e!==null?Bs(e):e}function wU(e){let t={};for(let[r,o]of Object.entries(e))t[r]=PU(o);return t}function vU(e){let t=e[0],r=Bs(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,tW.attachTypeGuardMeta)(o,{itemGuard:r})}Jr.isShape=Bs;Jr.isNestedType=Bs});var oW=W(Vg=>{"use strict";Object.defineProperty(Vg,"__esModule",{value:!0});Vg.isObjectWith=WU;var _U=Ic();function WU(e){return(0,_U.isType)(e)}});var nW=W(qg=>{"use strict";Object.defineProperty(qg,"__esModule",{value:!0});qg.isObject=EU;var LU=Ic();function EU(e){return(0,LU.isType)(e)}});var sW=W(Kg=>{"use strict";Object.defineProperty(Kg,"__esModule",{value:!0});Kg.guardWithTolerance=kU;function kU(e,t,r){return t(e,r),e}});var iW=W(Jg=>{"use strict";Object.defineProperty(Jg,"__esModule",{value:!0});Jg.isBranded=RU;var CU=O();function RU(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,CU.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var aW=W(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.BrandSymbols=void 0;Oc.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var lW=W(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.isAny=void 0;var xU=function(e){return!0};Mc.isAny=xU});var Gs=W(Yg=>{"use strict";Object.defineProperty(Yg,"__esModule",{value:!0});Yg.reportTypeGuardError=IU;var TU=O();function IU(e,t,r){e&&e.callbackOnError((0,TU.generateTypeGuardError)(t,e.identifier,r))}});var cW=W(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.isBoolean=void 0;var OU=Gs(),MU=function(t,r){return typeof t!="boolean"?((0,OU.reportTypeGuardError)(r,t,"boolean"),!1):!0};Nc.isBoolean=MU});var dW=W(jc=>{"use strict";Object.defineProperty(jc,"__esModule",{value:!0});jc.isDate=void 0;var NU=O(),jU=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,NU.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};jc.isDate=jU});var Xg=W(Dc=>{"use strict";Object.defineProperty(Dc,"__esModule",{value:!0});Dc.isNumber=void 0;var DU=Gs(),zU=function(t,r){return typeof t!="number"||isNaN(t)?((0,DU.reportTypeGuardError)(r,t,"number"),!1):!0};Dc.isNumber=zU});var uW=W(zc=>{"use strict";Object.defineProperty(zc,"__esModule",{value:!0});zc.isString=void 0;var $U=Gs(),HU=function(t,r){return typeof t!="string"?((0,$U.reportTypeGuardError)(r,t,"string"),!1):!0};zc.isString=HU});var pW=W($c=>{"use strict";Object.defineProperty($c,"__esModule",{value:!0});$c.isUnknown=void 0;var FU=function(e){return!0};$c.isUnknown=FU});var mW=W(Hc=>{"use strict";Object.defineProperty(Hc,"__esModule",{value:!0});Hc.isFunction=void 0;var UU=O(),BU=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,UU.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Hc.isFunction=BU});var fW=W(Fc=>{"use strict";Object.defineProperty(Fc,"__esModule",{value:!0});Fc.isFile=void 0;var gW=O(),GU=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,gW.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,gW.generateTypeGuardError)(e,t.identifier,"File")),!1)};Fc.isFile=GU});var yW=W(Uc=>{"use strict";Object.defineProperty(Uc,"__esModule",{value:!0});Uc.isFileList=void 0;var hW=O(),VU=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,hW.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,hW.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Uc.isFileList=VU});var AW=W(Bc=>{"use strict";Object.defineProperty(Bc,"__esModule",{value:!0});Bc.isBlob=void 0;var SW=O(),qU=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,SW.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,SW.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Bc.isBlob=qU});var PW=W(Gc=>{"use strict";Object.defineProperty(Gc,"__esModule",{value:!0});Gc.isFormData=void 0;var bW=O(),KU=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,bW.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,bW.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};Gc.isFormData=KU});var vW=W(Vc=>{"use strict";Object.defineProperty(Vc,"__esModule",{value:!0});Vc.isURL=void 0;var wW=O(),JU=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,wW.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,wW.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Vc.isURL=JU});var WW=W(qc=>{"use strict";Object.defineProperty(qc,"__esModule",{value:!0});qc.isURLSearchParams=void 0;var _W=O(),YU=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,_W.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,_W.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};qc.isURLSearchParams=YU});var LW=W(Kc=>{"use strict";Object.defineProperty(Kc,"__esModule",{value:!0});Kc.isMap=void 0;var XU=O(),ZU=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,XU.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Kc.isMap=ZU});var EW=W(Jc=>{"use strict";Object.defineProperty(Jc,"__esModule",{value:!0});Jc.isSet=void 0;var QU=O(),eB=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,QU.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Jc.isSet=eB});var kW=W(Zg=>{"use strict";Object.defineProperty(Zg,"__esModule",{value:!0});Zg.isIndexSignature=rB;var tB=O();function rB(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,tB.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let g=s[d],S=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),h=t(g,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return S&&h})}}});var CW=W(Yc=>{"use strict";Object.defineProperty(Yc,"__esModule",{value:!0});Yc.isError=void 0;var oB=Gs(),nB=function(t,r){return t instanceof Error?!0:((0,oB.reportTypeGuardError)(r,t,"Error"),!1)};Yc.isError=nB});var ef=W(Qg=>{"use strict";Object.defineProperty(Qg,"__esModule",{value:!0});Qg.isArrayWithEachItem=aB;var sB=O(),iB=Pt();function aB(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,sB.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,iB.attachTypeGuardMeta)(t,{itemGuard:e})}});var tf=W(Xc=>{"use strict";Object.defineProperty(Xc,"__esModule",{value:!0});Xc.isNonEmptyArray=void 0;var lB=O(),cB=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,lB.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Xc.isNonEmptyArray=cB});var RW=W(rf=>{"use strict";Object.defineProperty(rf,"__esModule",{value:!0});rf.isNonEmptyArrayWithEachItem=pB;var dB=ef(),uB=tf();function pB(e){return function(t,r){return(0,dB.isArrayWithEachItem)(e)(t,r)&&(0,uB.isNonEmptyArray)(t,r)}}});var TW=W(of=>{"use strict";Object.defineProperty(of,"__esModule",{value:!0});of.isTuple=mB;var xW=O();function mB(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,xW.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,xW.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var IW=W(nf=>{"use strict";Object.defineProperty(nf,"__esModule",{value:!0});nf.isObjectWithEachItem=fB;var gB=O();function fB(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,gB.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var OW=W(sf=>{"use strict";Object.defineProperty(sf,"__esModule",{value:!0});sf.isPartialOf=yB;var hB=hr();function yB(e){return function(t,r){if(!(0,hB.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var MW=W(af=>{"use strict";Object.defineProperty(af,"__esModule",{value:!0});af.isPick=AB;var SB=hr();function AB(e,...t){return function(r,o){if(!(0,SB.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var NW=W(lf=>{"use strict";Object.defineProperty(lf,"__esModule",{value:!0});lf.isOmit=PB;var bB=hr();function PB(e,...t){return function(r,o){if(!(0,bB.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),g=p.indexOf(" ("),S=g>=0?p.slice(0,g):p;if(a.has(S))return!1;let h=S.startsWith(s+".")&&S.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var jW=W(Zc=>{"use strict";Object.defineProperty(Zc,"__esModule",{value:!0});Zc.isNonEmptyString=void 0;var wB=O(),vB=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,wB.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Zc.isNonEmptyString=vB});var DW=W(Qc=>{"use strict";Object.defineProperty(Qc,"__esModule",{value:!0});Qc.isNonNegativeNumber=void 0;var _B=O(),WB=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,_B.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Qc.isNonNegativeNumber=WB});var zW=W(ed=>{"use strict";Object.defineProperty(ed,"__esModule",{value:!0});ed.isPositiveNumber=void 0;var LB=O(),EB=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,LB.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};ed.isPositiveNumber=EB});var $W=W(td=>{"use strict";Object.defineProperty(td,"__esModule",{value:!0});td.isNonPositiveNumber=void 0;var kB=O(),CB=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,kB.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};td.isNonPositiveNumber=CB});var HW=W(rd=>{"use strict";Object.defineProperty(rd,"__esModule",{value:!0});rd.isNegativeNumber=void 0;var RB=O(),xB=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,RB.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};rd.isNegativeNumber=xB});var FW=W(od=>{"use strict";Object.defineProperty(od,"__esModule",{value:!0});od.isInteger=void 0;var TB=O(),IB=Xg(),OB=function(e,t){return!(0,IB.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,TB.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};od.isInteger=OB});var UW=W(nd=>{"use strict";Object.defineProperty(nd,"__esModule",{value:!0});nd.isPositiveInteger=void 0;var MB=O(),NB=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,MB.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};nd.isPositiveInteger=NB});var BW=W(sd=>{"use strict";Object.defineProperty(sd,"__esModule",{value:!0});sd.isNegativeInteger=void 0;var jB=O(),DB=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,jB.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};sd.isNegativeInteger=DB});var GW=W(id=>{"use strict";Object.defineProperty(id,"__esModule",{value:!0});id.isNonNegativeInteger=void 0;var zB=O(),$B=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,zB.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};id.isNonNegativeInteger=$B});var VW=W(ad=>{"use strict";Object.defineProperty(ad,"__esModule",{value:!0});ad.isNonPositiveInteger=void 0;var HB=O(),FB=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,HB.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};ad.isNonPositiveInteger=FB});var qW=W(cd=>{"use strict";Object.defineProperty(cd,"__esModule",{value:!0});cd.isNumeric=void 0;var ld=O(),UB=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,ld.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,ld.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,ld.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,ld.generateTypeGuardError)(e,t.identifier,"number key")),!1};cd.isNumeric=UB});var KW=W(dd=>{"use strict";Object.defineProperty(dd,"__esModule",{value:!0});dd.isBooleanLike=void 0;var cf=O(),BB=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,cf.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,cf.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};dd.isBooleanLike=BB});var JW=W(ud=>{"use strict";Object.defineProperty(ud,"__esModule",{value:!0});ud.isDateLike=void 0;var Vs=O(),GB=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Vs.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Vs.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Vs.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Vs.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Vs.generateTypeGuardError)(e,t.identifier,"date-like")),!1};ud.isDateLike=GB});var YW=W(pd=>{"use strict";Object.defineProperty(pd,"__esModule",{value:!0});pd.isBigInt=void 0;var VB=O(),qB=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,VB.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};pd.isBigInt=qB});var uf=W(df=>{"use strict";Object.defineProperty(df,"__esModule",{value:!0});df.isOneOf=KB;var XW=an();function KB(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,XW.stringify)(t)}) must be one of following values ${e.map(XW.stringify).join(" | ")}`),o}}});var ZW=W(pf=>{"use strict";Object.defineProperty(pf,"__esModule",{value:!0});pf.isOneOfTypes=XB;var JB=an(),YB=$s();function XB(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,JB.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,YB.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var QW=W(mf=>{"use strict";Object.defineProperty(mf,"__esModule",{value:!0});mf.isIntersectionOf=ZB;function ZB(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var eL=W(gf=>{"use strict";Object.defineProperty(gf,"__esModule",{value:!0});gf.isExtensionOf=QB;function QB(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var tL=W(ff=>{"use strict";Object.defineProperty(ff,"__esModule",{value:!0});ff.isNullOr=tG;var eG=Pt();function tG(e){function t(r,o){return r===null?!0:e(r,o)}return(0,eG.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var rL=W(hf=>{"use strict";Object.defineProperty(hf,"__esModule",{value:!0});hf.isUndefinedOr=oG;var rG=Pt();function oG(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,rG.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var oL=W(yf=>{"use strict";Object.defineProperty(yf,"__esModule",{value:!0});yf.isNilOr=sG;var nG=Pt();function sG(e){function t(r,o){return r==null?!0:e(r,o)}return(0,nG.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var nL=W(Sf=>{"use strict";Object.defineProperty(Sf,"__esModule",{value:!0});Sf.isAsserted=iG;function iG(e){return!0}});var sL=W(Af=>{"use strict";Object.defineProperty(Af,"__esModule",{value:!0});Af.isEnum=lG;var aG=uf();function lG(e){return function(t,r){return(0,aG.isOneOf)(...Object.values(e))(t,r)}}});var iL=W(bf=>{"use strict";Object.defineProperty(bf,"__esModule",{value:!0});bf.isEqualTo=uG;var cG=O(),dG=an();function uG(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,cG.generateTypeGuardError)(t,r.identifier,`equal to ${(0,dG.stringify)(e)}`)),!1):!0}}});var aL=W(md=>{"use strict";Object.defineProperty(md,"__esModule",{value:!0});md.isRegex=void 0;var pG=O(),mG=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,pG.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};md.isRegex=mG});var cL=W(Pf=>{"use strict";Object.defineProperty(Pf,"__esModule",{value:!0});Pf.isPattern=gG;var lL=O();function gG(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,lL.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,lL.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var dL=W(wf=>{"use strict";Object.defineProperty(wf,"__esModule",{value:!0});wf.by=fG;function fG(e){return function(t){return e(t,null)}}});var uL=W(vf=>{"use strict";Object.defineProperty(vf,"__esModule",{value:!0});vf.toNumber=hG;function hG(e){return typeof e=="number"?e:Number(e)}});var pL=W(_f=>{"use strict";Object.defineProperty(_f,"__esModule",{value:!0});_f.toDate=yG;function yG(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var mL=W(Wf=>{"use strict";Object.defineProperty(Wf,"__esModule",{value:!0});Wf.toBoolean=SG;function SG(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var gL=W(gd=>{"use strict";Object.defineProperty(gd,"__esModule",{value:!0});gd.isSymbol=void 0;var AG=O(),bG=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,AG.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};gd.isSymbol=bG});var qs=W(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var PG=Ic();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return PG.isType}});var Lf=rW();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return Lf.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return Lf.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return Lf.isNestedType}});var wG=oW();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return wG.isObjectWith}});var vG=nW();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return vG.isObject}});var _G=sW();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return _G.guardWithTolerance}});var WG=iW();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return WG.isBranded}});var LG=aW();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return LG.BrandSymbols}});var EG=lW();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return EG.isAny}});var kG=cW();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return kG.isBoolean}});var CG=dW();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return CG.isDate}});var RG=Fg();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return RG.isDefined}});var xG=Rc();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return xG.isNil}});var TG=Xg();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return TG.isNumber}});var IG=uW();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return IG.isString}});var OG=pW();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return OG.isUnknown}});var MG=mW();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return MG.isFunction}});var NG=fW();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return NG.isFile}});var jG=yW();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return jG.isFileList}});var DG=AW();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return DG.isBlob}});var zG=PW();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return zG.isFormData}});var $G=vW();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return $G.isURL}});var HG=WW();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return HG.isURLSearchParams}});var FG=LW();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return FG.isMap}});var UG=EW();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return UG.isSet}});var BG=kW();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return BG.isIndexSignature}});var GG=CW();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return GG.isError}});var VG=ef();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return VG.isArrayWithEachItem}});var qG=tf();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return qG.isNonEmptyArray}});var KG=RW();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return KG.isNonEmptyArrayWithEachItem}});var JG=TW();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return JG.isTuple}});var YG=hr();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return YG.isNonNullObject}});var XG=IW();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return XG.isObjectWithEachItem}});var ZG=OW();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return ZG.isPartialOf}});var QG=MW();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return QG.isPick}});var e2=NW();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return e2.isOmit}});var t2=jW();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return t2.isNonEmptyString}});var r2=DW();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return r2.isNonNegativeNumber}});var o2=zW();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return o2.isPositiveNumber}});var n2=$W();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return n2.isNonPositiveNumber}});var s2=HW();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return s2.isNegativeNumber}});var i2=FW();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return i2.isInteger}});var a2=UW();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return a2.isPositiveInteger}});var l2=BW();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return l2.isNegativeInteger}});var c2=GW();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return c2.isNonNegativeInteger}});var d2=VW();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return d2.isNonPositiveInteger}});var u2=qW();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return u2.isNumeric}});var p2=KW();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return p2.isBooleanLike}});var m2=JW();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return m2.isDateLike}});var g2=YW();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return g2.isBigInt}});var f2=uf();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return f2.isOneOf}});var h2=ZW();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return h2.isOneOfTypes}});var y2=QW();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return y2.isIntersectionOf}});var S2=eL();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return S2.isExtensionOf}});var A2=tL();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return A2.isNullOr}});var b2=rL();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return b2.isUndefinedOr}});var P2=oL();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return P2.isNilOr}});var w2=nL();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return w2.isAsserted}});var v2=sL();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return v2.isEnum}});var _2=iL();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return _2.isEqualTo}});var W2=aL();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return W2.isRegex}});var L2=cL();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return L2.isPattern}});var E2=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return E2.generateTypeGuardError}});var k2=dL();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return k2.by}});var C2=uL();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return C2.toNumber}});var R2=pL();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return R2.toDate}});var x2=mL();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return x2.toBoolean}});var T2=gL();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return T2.isSymbol}})});var Ks,fL,hL,Yr,Ef,mY,yL,fd,Xr,Js,kf,Cf,Rf,xf,zt,Tf,hd,yd,Sd,Ys,at,dn,un,Ad,yr,If,SL,wt=l(()=>{"use strict";Ks={production:".agent-witch",localhost:".local-agent-witch"},fL={production:47892,localhost:47893},hL={production:"com.agent-witch",localhost:"com.local-agent-witch"},Yr={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Ef="app",mY=`${Ef}/agent-witch.js`,yL=`${Ef}/command`,fd={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Xr=Ks.production,Js=Ks.localhost,kf=fL.production,Cf=fL.localhost,Rf=hL.production,xf=hL.localhost,zt="profiles",Tf=Yr.activeProfile,hd="harness",yd="sets",Sd="manifest.json",Ys=fd.projectsDir,at=fd.logsDir,dn="agent-witch.log",un="agent-witch.error.log",Ad=fd.reportsDir,yr=fd.deviceKeypairJson,If=Ef,SL="agent-witch.js"});var pn,AL,I2,bL,PL=l(()=>{"use strict";pn=m(require("node:path")),AL=require("node:url"),I2=()=>!0,bL=()=>{if(I2()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?pn.default.dirname(pn.default.resolve(e)):pn.default.dirname(pn.default.resolve(__filename))}return pn.default.dirname((0,AL.fileURLToPath)(__agentWitchImportMetaUrl))}});var Of,wL,N,vL,O2,Sr,L,bd,$t,_L,Pd,mn,wd,vd,se,lt,Mf,ct,Nf,M,jf=l(()=>{"use strict";Of=m(require("node:fs")),wL=m(require("node:os")),N=m(require("node:path")),vL=m(qs());wt();PL();O2=bL(),Sr=e=>e.trim().toLowerCase(),L=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return N.default.resolve(e);let t=N.default.resolve(O2),r=N.default.basename(t),o=N.default.basename(N.default.dirname(t));return r===If&&(o===Xr||o===Js)?N.default.dirname(t):r===Xr||r===Js?t:N.default.join(wL.default.homedir(),Xr)},bd=(e=L())=>N.default.join(e,If),$t=(e=L())=>N.default.join(bd(e),SL),_L=(e,t,r)=>t!==null?N.default.join(e,zt,t,r):N.default.join(e,r),Pd=e=>_L(e.installDir,e.profileEmail,Ys),mn=e=>_L(e.installDir,e.profileEmail,at),wd=e=>e.profileEmail!==null?N.default.join(e.installDir,zt,e.profileEmail,yr):N.default.join(e.installDir,yr),vd=e=>N.default.basename(e)===Js,se=(e=L())=>vd(e)?xf:Rf,lt=(e=L())=>vd(e)?Cf:kf,Mf=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Sr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Sr(t):null},ct=(e=L())=>{let t=N.default.join(e,Tf);if(!Of.default.existsSync(t))return null;try{let r=JSON.parse(Of.default.readFileSync(t,"utf8"));if((0,vL.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Sr(r.email)}catch{return null}return null},Nf=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Sr(r):null}let t=Mf();return t!==null?t:ct()},M=e=>{let t=L(),r=bd(t),o=$t(t),n=Nf(e);if(n!==null){let S=N.default.join(t,zt,n),h=N.default.join(S,hd),y=N.default.join(S,Ys),u=N.default.join(S,at),A=N.default.join(S,Ad),b=N.default.join(S,yr),f=N.default.join(S,at,dn),w=N.default.join(S,at,un);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:u,mainLogPath:f,errorLogPath:w,reportsDir:A,deviceKeypairPath:b,configPath:N.default.join(S,"config.json"),harnessRootDir:h,harnessManifestPath:N.default.join(h,Sd),harnessSetsDir:N.default.join(h,yd)}}let s=N.default.join(t,hd),i=N.default.join(t,Ys),a=N.default.join(t,at),c=N.default.join(t,Ad),d=N.default.join(t,yr),p=N.default.join(t,at,dn),g=N.default.join(t,at,un);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:g,reportsDir:c,deviceKeypairPath:d,configPath:N.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:N.default.join(s,Sd),harnessSetsDir:N.default.join(s,yd)}}});var Df,WL,M2,N2,LL,zf,EL=l(()=>{"use strict";Df=m(require("node:fs")),WL=m(require("node:path"));wt();jf();M2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),N2=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,LL=e=>{let t=WL.default.join(e,Yr.wakePort);if(!Df.default.existsSync(t))return null;try{let r=JSON.parse(Df.default.readFileSync(t,"utf8"));if(M2(r)&&N2(r.wakePort))return r.wakePort}catch{return null}return null},zf=(e=L())=>LL(e)??lt(e)});var q=l(()=>{"use strict";jf();EL()});var Xs,H2,F2,kL,U2,B2,CL=l(()=>{"use strict";q();Xs=se(),H2=`${Xs}-wake`,F2=`${Xs}-live`,kL=`${Xs}-watchdog`,U2=`${Xs}-automation-scheduler`,B2=`${Xs}-updater`});var $f,Hf,_d=l(()=>{"use strict";$f=new Set(["","loginwindow","_mbsetupuser","root"]),Hf=5e3});var RL,G2,xL,Ff,Uf=l(()=>{"use strict";RL=require("node:child_process");_d();G2=e=>e.trim().toLowerCase(),xL=e=>e==null?!1:!$f.has(G2(e)),Ff=()=>{if(process.platform!=="darwin")return null;try{let t=(0,RL.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return xL(t)?t:null}catch{return null}}});var IL,TL,dt,Zs=l(()=>{"use strict";IL=m(require("node:os"));Uf();TL=e=>e.trim().toLowerCase(),dt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?Ff():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??IL.default.userInfo().username;return TL(r)===TL(o)}});var OL,ML,Zr,NL=l(()=>{"use strict";OL=require("node:child_process"),ML=m(require("node:fs"));q();Zs();Zr=(e=L())=>{let t=$t(e);if(!ML.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!dt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=ct(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,OL.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var jL,Qs,Wd=l(()=>{"use strict";jL=require("node:child_process"),Qs=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,jL.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Ld,Bf,DL,te,Ed,ei=l(()=>{"use strict";Ld=m(require("node:fs")),Bf=m(require("node:path"));q();wt();DL=e=>{let t=Bf.default.join(e,zt);return Ld.default.existsSync(t)?Ld.default.readdirSync(t).filter(r=>Ld.default.statSync(Bf.default.join(t,r)).isDirectory()).map(r=>Sr(r)).toSorted():[]},te=(e=L())=>{let t=se(e);return[{profileEmail:DL(e)[0]??null,launchAgentLabel:t}]},Ed=(e=L())=>DL(e)});var Gf,zL,$L,V2,Ht,kd=l(()=>{"use strict";Gf=m(require("node:fs")),zL=m(require("node:os")),$L=m(require("node:path"));q();ei();V2=()=>$L.default.join(zL.default.homedir(),"Library","LaunchAgents"),Ht=(e=L())=>{let t=se(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of te(e))r.add(n.launchAgentLabel);let o=V2();if(Gf.default.existsSync(o))for(let n of Gf.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var HL,ti,FL=l(()=>{"use strict";q();Wd();kd();ei();HL=(e=L())=>{let t=new Set(te(e).map(r=>r.launchAgentLabel));return Ht(e).filter(r=>!t.has(r))},ti=(e=L())=>{for(let t of HL(e))Qs(t)}});var ri,Vf=l(()=>{"use strict";q();Wd();kd();ri=(e=L())=>{for(let t of Ht(e))Qs(t)}});var UL,BL,q2,Qr,GL=l(()=>{"use strict";UL=require("node:child_process"),BL=require("node:util"),q2=(0,BL.promisify)(UL.execFile),Qr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await q2("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var eo,K2,qf,Kf=l(()=>{"use strict";eo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),K2=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,qf=e=>{let t=e.pathValue??K2(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${eo(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${eo(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${eo(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${eo(e.homeDir)}</string>
    <key>PATH</key>
    <string>${eo(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${eo(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${eo(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var Cd,Jf=l(()=>{"use strict";Cd=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var to,Yf,oi,J2,Y2,X2,VL,Ft,Xf=l(()=>{"use strict";to=m(require("node:fs")),Yf=m(require("node:os")),oi=m(require("node:path"));wt();q();Kf();Jf();J2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Y2=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,X2=e=>{let t=oi.default.join(e,Yr.wakePort);if(!to.default.existsSync(t))return lt(e);try{let r=JSON.parse(to.default.readFileSync(t,"utf8"));if(J2(r)&&Y2(r.wakePort))return r.wakePort}catch{return lt(e)}return lt(e)},VL=(e,t=Yf.default.homedir())=>oi.default.join(t,"Library","LaunchAgents",`${e}.plist`),Ft=e=>{let t=e.installDir??L(),r=e.homeDir??Yf.default.homedir(),o=VL(e.launchAgentLabel,r),n=to.default.existsSync(o)?to.default.readFileSync(o,"utf8"):null;if(n!==null&&Cd(n))return{ok:!0,rewritten:!1,plistPath:o};let s=qf({launchAgentLabel:e.launchAgentLabel,runPath:oi.default.join(t,yL,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??X2(t)});if(!Cd(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{to.default.mkdirSync(oi.default.dirname(o),{recursive:!0}),to.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var KL,JL,YL,ni,Z2,Q2,qL,Le,Zf=l(()=>{"use strict";KL=require("node:child_process"),JL=m(require("node:fs")),YL=require("node:util");q();Xf();Zs();ni=(0,YL.promisify)(KL.execFile),Z2=async e=>{try{return await ni("launchctl",["print",e]),!0}catch{return!1}},Q2=async(e,t,r)=>{await Z2(t)&&await ni("launchctl",["bootout",t]).catch(()=>{}),await ni("launchctl",["bootstrap",e,r]),await ni("launchctl",["enable",t])},qL=async e=>{try{return await ni("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Le=async(e,t=L())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!dt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=Ft({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await qL(n))return{ok:!0};let i=s.plistPath;if(!JL.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await Q2(o,n,i),await qL(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var ro,XL=l(()=>{"use strict";q();Zf();ei();ro=async(e=L())=>{let t=[];for(let r of te(e))(await Le(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var Ue,Ut,ZL=l(()=>{"use strict";Vf();Zs();_d();Ue=e=>{dt()||(ri(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Ut=(e,t=Hf)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{dt()||e()},t);return()=>{clearInterval(r)}}});var re=l(()=>{"use strict";CL();NL();Wd();FL();Vf();kd();Zs();GL();XL();Zf();Xf();Jf();Kf();ei();Uf();_d();ZL()});var Qf=l(()=>{"use strict";re()});var QL,eE,Rd,tE,gn,rE,oE,oo=l(()=>{"use strict";QL=".agent-witch",eE="memory",Rd="project.json",tE="chunks.ndjson",gn="runs.ndjson",rE="reports",oE=".json"});var nE=l(()=>{"use strict";oo()});var sE,xd,eh=l(()=>{"use strict";sE=m(require("node:path"));nE();xd=(e,t)=>sE.default.join(e.trim(),`${t.trim()}${oE}`)});var si,iE,aE=l(()=>{"use strict";si="agent-witch.js",iE="command"});var Td=l(()=>{"use strict";aE()});var no,lE,cE=l(()=>{"use strict";Td();no=e=>`'${e.replace(/'/g,"'\\''")}'`,lE=e=>{let t=`${e.installDir.trim()}/${"app"}/${si}`,r=[no("node"),no(t),"report","write","--key",no(e.reportKey.trim()),"--agent-run-id",no(e.agentRunId.trim()),"--status",no(e.status),"--summary",no(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",no(e.details.trim())),r.join(" ")}});var vt,dE,e5,th,Id=l(()=>{"use strict";eh();cE();vt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},dE=e=>e===vt.COMPLETED||e===vt.FAILED,e5=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),th=(e,t)=>{let r=xd(t.reportsDir,t.reportKey),o=lE({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:vt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${e5({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Ee=l(()=>{"use strict";wt();q()});var ai,pE,uE,mE,t5,fn,r5,gE,li,ci,rh,fE,hE,di=l(()=>{"use strict";ai=m(require("node:fs")),pE=m(require("node:path"));Id();eh();Ee();uE=50,mE=e=>{let t=M(),r=xd(t.reportsDir,e);return ai.default.mkdirSync(pE.default.dirname(r),{recursive:!0}),r},t5=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},fn=e=>{let t=mE(e);if(!ai.default.existsSync(t))return null;try{let r=JSON.parse(ai.default.readFileSync(t,"utf8"));return t5(r)?r:null}catch{return null}},r5=(e,t)=>{let r=[...e,t];return r.length>uE?r.slice(r.length-uE):r},gE=e=>{let t=mE(e.reportKey);ai.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},li=e=>{let t=fn(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:r5(t?.history??[],o)};return gE(n),n},ci=e=>{let t=fn(e.reportKey);return t!==null?t:li({reportKey:e.reportKey,agentRunId:e.agentRunId,status:vt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},rh=(e,t)=>{let r=t.trim();if(r.length===0)return fn(e);let o=fn(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return gE(s),s},fE=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},hE=e=>{if(e===null||!dE(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===vt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var o5,n5,ui,yE,Od,oh=l(()=>{"use strict";Id();di();o5=new Set(Object.values(vt)),n5=e=>o5.has(e),ui=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},yE=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Od=e=>{if(e[0]!=="write")return yE(),1;let r=ui(e,"--key"),o=ui(e,"--agent-run-id"),n=ui(e,"--status"),s=ui(e,"--summary"),i=ui(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!n5(n)?(yE(),1):(li({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var Be,so=l(()=>{"use strict";Be=()=>!0});var nh,SE,io,Md=l(()=>{"use strict";nh=m(require("node:path")),SE=require("node:url");so();io=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=nh.default.resolve(t);return Be()?r===nh.default.resolve(__filename):e===void 0?!1:r===(0,SE.fileURLToPath)(e)}});var Nd,hn,a5,gZ,yn=l(()=>{"use strict";Nd="agent-witch.js",hn="deps.tar.gz",a5="install.sh",gZ={mainScript:`app/${Nd}`,depsArchive:`app/${hn}`,installShell:a5}});var wE=l(()=>{"use strict";yn()});var vE=l(()=>{"use strict";yn();wE()});var pi,ih,jd,l5,mi,ke,An,gi,fi,ao,ah=l(()=>{"use strict";pi=m(require("node:fs")),ih=m(require("node:path"));vE();q();jd="install-version.json",l5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mi=(e=L())=>ih.default.join(e,jd),ke=(e=L())=>{let t=mi(e);if(!pi.default.existsSync(t))return null;try{let r=JSON.parse(pi.default.readFileSync(t,"utf8"));return!l5(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},An=(e,t=L())=>{let r=mi(t);pi.default.mkdirSync(ih.default.dirname(r),{recursive:!0}),pi.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},gi=(e=L())=>ke(e)?.bundleVersion??"223",fi=(e,t)=>{let r=ke(e);if(r!==null)return r;let o={bundleVersion:"223",appOrigin:t,updatedAt:new Date().toISOString()};return An(o,e),o},ao=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var _E,lo,lh,ch,dh,Dd,_t,co,uh=l(()=>{"use strict";_E=require("node:crypto"),lo=m(require("node:fs")),lh=m(require("node:path"));q();ch="self-update-log.ndjson",dh=100,Dd=(e=L())=>{let t=M(),r=t.installDir===e?t.logsDir:mn({installDir:e,profileEmail:t.profileEmail});return lh.default.join(r,ch)},_t=(e,t=L())=>{let r={id:(0,_E.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Dd(t);lo.default.mkdirSync(lh.default.dirname(o),{recursive:!0});let n=lo.default.existsSync(o)?lo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-dh+1)),JSON.stringify(r)];return lo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},co=(e=20,t=L())=>{let r=Dd(t);if(!lo.default.existsSync(r))return[];let o=lo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var ph,xZ,mh=l(()=>{"use strict";yn();ph="deps",xZ=`${"app"}/${hn}`});var WE=l(()=>{"use strict";mh()});var LE,Ar,uo,EE,gh,fh,kE=l(()=>{"use strict";LE=require("node:child_process"),Ar=m(require("node:fs")),uo=m(require("node:path"));yn();mh();EE=e=>uo.default.join(e,"app",ph),gh=e=>{let t=uo.default.join(e,"app"),r=uo.default.join(t,hn);Ar.default.existsSync(r)&&(Ar.default.rmSync(EE(e),{recursive:!0,force:!0}),Ar.default.mkdirSync(t,{recursive:!0}),(0,LE.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Ar.default.rmSync(r,{force:!0}))},fh=e=>{Ar.default.rmSync(uo.default.join(e,"node_modules"),{recursive:!0,force:!0}),Ar.default.rmSync(uo.default.join(e,"package.json"),{force:!0}),Ar.default.rmSync(uo.default.join(e,"package-lock.json"),{force:!0})}});var CE=l(()=>{"use strict";WE();kE()});var Bt,zd,RE=l(()=>{"use strict";Bt="https://www.agentwitch.com",zd="wss://www.agentwitch.com/api/agent-witch/ws"});var hi,Gt,xE=l(()=>{"use strict";hi="127.0.0.1",Gt=`http://${hi}:43347`});var Vt=l(()=>{"use strict";RE();xE()});var yi,$d,TE,yh,c5,IE,bh,OE,ut,Si,Ai,Ph,Sh,Ah,bi,wh,vh,_h,bn=l(()=>{"use strict";yi=m(require("node:fs")),$d=m(require("node:path")),TE="active-writer-work.json",yh=new Set,c5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),IE=e=>e.profileEmail===null?$d.default.join(e.installDir,TE):$d.default.join(e.installDir,"profiles",e.profileEmail,TE),bh=e=>{let t=IE(e);if(!yi.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(yi.default.readFileSync(t,"utf8"));return!c5(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},OE=(e,t)=>{let r=IE(e);yi.default.mkdirSync($d.default.dirname(r),{recursive:!0}),yi.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},ut=e=>bh(e).activeCount>0,Si=e=>{let t=bh(e);OE(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},Ai=e=>{let t=bh(e),r=Math.max(0,t.activeCount-1);if(OE(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of yh)o()},Ph=e=>(yh.add(e),()=>{yh.delete(e)}),Sh=null,Ah=null,bi=e=>{Sh=e},wh=e=>{Ah=e},vh=()=>{let e=Sh;return Sh=null,e},_h=()=>{let e=Ah;return Ah=null,e}});var Ce,Wh=l(()=>{"use strict";Ce=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Pn,Hd,Pi,Lh=l(()=>{"use strict";Pn="qwen2.5:7b",Hd="nomic-embed-text",Pi="Install Ollama from https://ollama.com/download"});var wi,ME,Eh=l(()=>{"use strict";Lh();wi=()=>`
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
    echo "Ollama is missing. ${Pi}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${Pi}" >&2
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
  agent_witch_ensure_ollama_model "${Pn}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${Hd}" "\${pull_log}"
}
`,ME=()=>`
${wi()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var NE,d5,Fd,kh=l(()=>{"use strict";NE=require("node:child_process");q();Eh();d5=e=>new Promise(t=>{let r=(0,NE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:L()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Fd=async(e=d5)=>{let t=`${wi()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var br,Ud,jE,u5,DE,vn,p5,m5,g5,wn,po,mo,zE=l(()=>{"use strict";br=m(require("node:fs")),Ud=m(require("node:path"));CE();re();q();yn();Vt();ah();bn();Wh();uh();kh();jE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),u5=e=>{let t=ct(e),r=t===null?M():M(t);if(!br.default.existsSync(r.configPath))return null;try{let o=JSON.parse(br.default.readFileSync(r.configPath,"utf8"));return!jE(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},DE=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!jE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},vn=async e=>(await DE(e))?.bundleVersion??null,p5=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=Ud.default.join(t,r);br.default.mkdirSync(Ud.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());br.default.writeFileSync(n,s),r.endsWith(".js")&&br.default.chmodSync(n,493)},m5=async()=>{ti(),await ro()},g5=(e,t)=>e!==null?Ce(e):t??Bt,wn=(e,t)=>({localBundleVersion:t,...e}),po=async e=>{let t=L(),r=ke(t),o=r?.bundleVersion??null,n=await Fd();_t({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=u5(t),i=g5(s,r?.appOrigin);if(i===null){let d=wn({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return _t({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await DE(i);if(a===null){let d=wn({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return _t({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||ao(o,a.bundleVersion))){let d=wn({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return _t({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let S of a.scripts)await p5(i,t,S);let d=Ud.default.join(t,Nd);br.default.existsSync(d)&&br.default.rmSync(d,{force:!0}),gh(t),fh(t),An({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=M(ct(t));if(ut(p)){let S=wn({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return _t({event:"update_applied",ok:!0,message:S.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),S}await m5();let g=wn({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return _t({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",g=wn({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return _t({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}},mo=()=>{let e=L();return{local:ke(e),logs:co(20,e)}}});var $E={};bt($E,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>jd,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Pi,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Hd,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>Pn,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>ch,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>dh,appendAgentWitchSelfUpdateLog:()=>_t,buildAgentWitchEnsureOllamaShell:()=>wi,buildAgentWitchInstallScriptOllama:()=>ME,buildAgentWitchSelfUpdateStatus:()=>mo,ensureAgentWitchInstallVersionRecorded:()=>fi,ensureAgentWitchOllamaInstalled:()=>Fd,fetchAgentWitchRemoteInstallBundleVersion:()=>vn,isRemoteAgentWitchBundleVersionNewer:()=>ao,readAgentWitchInstallVersion:()=>ke,readAgentWitchSelfUpdateLogs:()=>co,resolveAgentWitchAppOriginFromWsUrl:()=>Ce,resolveAgentWitchHeartbeatInstallBundleVersion:()=>gi,resolveAgentWitchInstallVersionPath:()=>mi,resolveAgentWitchSelfUpdateLogPath:()=>Dd,runAgentWitchSelfUpdate:()=>po,writeAgentWitchInstallVersion:()=>An});var Ze=l(()=>{"use strict";ah();uh();zE();Wh();Lh();Eh();kh()});var Ch={};bt(Ch,{buildAgentWitchSelfUpdateStatus:()=>mo,fetchAgentWitchRemoteInstallBundleVersion:()=>vn,runAgentWitchSelfUpdate:()=>po});var Rh=l(()=>{"use strict";Ze()});function _n(e){return(0,HE.createHash)("sha256").update(e.trim()).digest("hex")}var HE,xh=l(()=>{"use strict";HE=require("node:crypto")});var Wn,vi,f5,FE,Th,UE=l(()=>{"use strict";Wn=m(require("node:fs")),vi=m(require("node:path"));xh();Ee();f5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),FE=e=>{if(!Wn.default.existsSync(e))return null;try{let t=JSON.parse(Wn.default.readFileSync(e,"utf8"));return!f5(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:_n(t.pairingToken.trim())}catch{return null}},Th=(e=L())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(FE(vi.default.join(e,"config.json")));let n=vi.default.join(e,zt);if(!Wn.default.existsSync(n))return t;for(let s of Wn.default.readdirSync(n)){let i=vi.default.join(n,s);Wn.default.statSync(i).isDirectory()&&o(FE(vi.default.join(i,"config.json")))}return t}});var Ih,BE,Bd,_i,Wi,h5,y5,S5,GE,ce,de,Gd,Wt,pt=l(()=>{"use strict";Ih=m(require("node:fs")),BE=m(require("node:os")),Bd=m(require("node:path")),_i={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Wi=e=>e.trim().length>0,h5=e=>{let t=Bd.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},y5=()=>{let e=BE.default.homedir(),t=Bd.default.join(e,".local","bin","agent");if(Ih.default.existsSync(t))return t;let r=Bd.default.join(e,".local","bin","cursor-agent");return Ih.default.existsSync(r)?r:_i.cursorCommand},S5=e=>{let t=e.trim();return!Wi(t)||t===_i.cursorCommand?y5():t},GE=(e,t)=>h5(e)?t:["agent",...t],ce=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",de=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:Wi(t)?t.trim():_i.claudeCommand,codexCommand:Wi(r)?r.trim():_i.codexCommand,cursorCommand:S5(o),antigravityCommand:Wi(n)?n.trim():_i.antigravityCommand}},Gd=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:GE(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Wt=(e,t,r,o)=>{let n=t.trim();if(!Wi(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:GE(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",n]}}});var Pr,A5,Ln,b5,En,Vd=l(()=>{"use strict";Pr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,A5=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:Pr(s.inputTokens)+Pr(s.outputTokens)+Pr(s.cacheReadInputTokens)+Pr(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Ln=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=Pr(a.input_tokens)+Pr(a.cache_creation_input_tokens)+Pr(a.cache_read_input_tokens),d=Pr(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:A5(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},b5=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),En=(e,t)=>{let r=Ln(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??b5(r)}}});var Oh,P5,w5,Mh,Nh=l(()=>{"use strict";Oh=e=>e.toLocaleString("en-US"),P5=e=>e<.01?e.toFixed(4):e.toFixed(3),w5=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${P5(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Oh(e.inputTokens)} in / ${Oh(e.outputTokens)} out (${Oh(e.totalTokens)} total)`,t].join(`
`)},Mh=(e,t)=>{if(t===void 0)return e;let r=w5(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var qd,jh=l(()=>{"use strict";qd={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var go,Dh,Kd,zh=l(()=>{"use strict";jh();go="auto",Dh=e=>({value:go,label:`Auto (${qd[e]})`}),Kd={anthropic:[Dh("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[Dh("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[Dh("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var kn,Li,$h,Ei=l(()=>{"use strict";jh();zh();kn=e=>{let t=e?.trim()??"";if(!(t.length===0||t===go))return t},Li=(e,t)=>{let r=kn(t);return r===void 0?qd[e]:r},$h=e=>{let t=kn(e);return t===void 0?go:t}});var Jd,v5,_5,Yd,VE=l(()=>{"use strict";Jd={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},v5=e=>{let t=Jd[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Jd["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Jd["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Jd["gemini-2.0-flash"]:null},_5=(e,t,r)=>{let o=v5(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},Yd=e=>{let t=_5(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Cn,W5,L5,E5,Xd,qE=l(()=>{"use strict";VE();Cn=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),W5=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Cn(r.input_tokens),n=Cn(r.output_tokens);return o===0&&n===0?null:Yd({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},L5=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Cn(r.prompt_tokens),n=Cn(r.completion_tokens);return o===0&&n===0?null:Yd({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},E5=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=Cn(r.promptTokenCount),n=Cn(r.candidatesTokenCount);return o===0&&n===0?null:Yd({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Xd=(e,t,r)=>e==="anthropic"?W5(t,r):e==="openai"?L5(t,r):E5(t,r)});var k5,Hh,C5,R5,x5,T5,I5,Fh,Uh=l(()=>{"use strict";Ei();qE();k5=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},Hh=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Li(e,t.model)},C5=async e=>{let t=Hh("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=k5(o);n.length>0&&e.onChunk?.(n);let s=Xd("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},R5=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},x5=async e=>{let t=Hh("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=R5(o);n.length>0&&e.onChunk?.(n);let s=Xd("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},T5=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},I5=async e=>{let t=Hh("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=T5(n);s.length>0&&e.onChunk?.(s);let i=Xd("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},Fh=async e=>{try{return e.provider==="anthropic"?await C5(e):e.provider==="openai"?await x5(e):await I5(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Ge,ki=l(()=>{"use strict";Ge=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var KE,O5,Zd,Bh=l(()=>{"use strict";KE=m(require("node:path")),O5="writer-api-secrets.json",Zd=e=>KE.default.join(e,O5)});var Gh,JE,M5,wr,De,vr=l(()=>{"use strict";Gh=m(require("node:fs"));Ei();Bh();JE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),M5=e=>{if(!JE(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=kn(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},wr=e=>{let t=Zd(e);if(!Gh.default.existsSync(t))return{};try{let r=JSON.parse(Gh.default.readFileSync(t,"utf8"));if(!JE(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=M5(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},De=(e,t)=>wr(e)[t]??null});var Re,Ci=l(()=>{"use strict";Re=e=>e==="api"?"api":"cli"});var YE,Pe,fo,qt=l(()=>{"use strict";YE=m(require("node:path"));ki();vr();Ci();Pe=e=>YE.default.dirname(e),fo=(e,t)=>{if(Re(e.writerExecutionBackend)!=="api")return!1;let r=Ge(t);if(r===null)return!1;let o=Pe(e.layout.configPath),n=De(o,r);return n!==null&&n.apiKey.length>0}});var Ri,Vh=l(()=>{"use strict";Nh();Uh();ki();vr();qt();Ri=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Ge(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Pe(e.layout.configPath),a=De(i,s);if(a===null){let d=Object.keys(wr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await Fh({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:Mh(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var XE,Rn,qh=l(()=>{"use strict";XE=require("node:child_process");pt();Vd();Vh();qt();Rn=(e,t,r)=>new Promise(o=>{if(!ce(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(fo(e,t)){Ri(e,t,r).then(o);return}let n=Wt(t,r,de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,XE.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=En(i.join("")),p=a.join("").trim(),g=[d.output.trim(),p].filter(S=>S.length>0).join(`
`);o({exitCode:c??-1,output:g})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var ZE=l(()=>{"use strict"});var QE=l(()=>{"use strict";Nh();qh();Uh();ZE();vr();qt()});var ek,tk,rk,ok=l(()=>{"use strict";ek="claude",tk="codex",rk="cursor"});var nk,N5,Kh,xi,Qd=l(()=>{"use strict";nk=m(require("node:path"));Vt();wt();N5="ws://localhost:3000/api/agent-witch/ws",Kh=e=>e.replace(/\/$/,""),xi=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return Kh(t);let r=nk.default.basename(e.installDir);if(r===Ks.production)return zd;let o=e.configWsUrl?.trim()??"";return r===Ks.localhost?o.length>0?Kh(o):N5:o.length>0?Kh(o):zd}});var D5,Jh,Yh=l(()=>{"use strict";ok();Qd();Ci();D5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Jh=e=>{if(!D5(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=xi({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??ek,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??tk,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??rk,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Re(t.writerExecutionBackend),layout:e.layout}}}});var Xh,Zh,Qh=l(()=>{"use strict";Xh=m(require("node:fs"));q();Yh();Zh=e=>{let t=M(e);if(!Xh.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Xh.default.readFileSync(t.configPath,"utf8")),o=Jh({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Ti,sk=l(()=>{"use strict";Ti=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var ey,z5,ty,ik=l(()=>{"use strict";ey=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),z5=e=>{if(!ey(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!ey(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(g=>{if(!ey(g))return[];let S=typeof g.itemKey=="string"?g.itemKey.trim():"",h=typeof g.relativePath=="string"?g.relativePath:"",y=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return S.length===0||y.length===0?[]:[{itemKey:S,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},ty=z5});var ak,$5,eu,ry=l(()=>{"use strict";ak=m(require("node:path")),$5=(e,t)=>{let r=t.trim();return ak.default.join(e,"components","store",r.slice(0,2),r)},eu=$5});var lk,H5,oy,ck=l(()=>{"use strict";lk=m(require("node:fs"));ry();H5=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=eu(e.installDir,n.contentSha256);lk.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},oy=H5});var Ii,xn,F5,ny,U5,sy,iy=l(()=>{"use strict";Ii=m(require("node:fs")),xn=m(require("node:path"));ry();F5=(e,t)=>xn.default.join(e.installDir,"runs",t,"overlay"),ny=(e,t)=>xn.default.join(F5(e,t),".cursor"),U5=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=ny(e,t);Ii.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=eu(e.installDir,i.contentSha256);if(!Ii.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?xn.default.join(n,c):xn.default.join(n,i.itemKey);Ii.default.mkdirSync(xn.default.dirname(d),{recursive:!0}),Ii.default.copyFileSync(a,d)}return{ok:!0}},sy=U5});var ay,dk,B5,Oi,uk=l(()=>{"use strict";ay=m(require("node:fs")),dk=m(require("node:path")),B5=(e,t)=>{let r=dk.default.join(e.installDir,"runs",t);ay.default.existsSync(r)&&ay.default.rmSync(r,{recursive:!0,force:!0})},Oi=B5});var G5,ly,pk=l(()=>{"use strict";iy();G5=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=ny(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},ly=G5});var cy,V5,q5,K5,J5,Y5,H,mk=l(()=>{"use strict";cy=m(require("node:fs"));Qd();q();Ci();V5="claude",q5="codex",K5="cursor",J5="agy",Y5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H=()=>{let e=M();if(!cy.default.existsSync(e.configPath))return null;try{let t=JSON.parse(cy.default.readFileSync(e.configPath,"utf8"));if(!Y5(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=xi({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Re(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:V5,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:q5,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:K5,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:J5,pairingToken:s,layout:e}}catch{return null}}});var tu,gk,fk=l(()=>{"use strict";tu=m(require("node:fs"));Bh();gk=(e,t)=>{let r=Zd(e);tu.default.mkdirSync(e,{recursive:!0}),tu.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{tu.default.chmodSync(r,384)}catch{}}});var ru,hk,dy=l(()=>{"use strict";ru=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},hk=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===ru(t)}});var Mi,X5,uy,py,yk=l(()=>{"use strict";Mi=m(require("node:fs"));vr();fk();dy();Ei();qt();X5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),uy=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=hk(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?kn(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},py=e=>{let t=Pe(e.configPath),r={};if(Mi.default.existsSync(e.configPath))try{let n=JSON.parse(Mi.default.readFileSync(e.configPath,"utf8"));X5(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,Mi.default.mkdirSync(t,{recursive:!0}),Mi.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=uy(uy(uy(wr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);gk(t,o)}});var my,Sk=l(()=>{"use strict";my={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var gy,Ak=l(()=>{"use strict";ki();vr();qt();qt();gy=(e,t)=>{if(fo(e,t))return!1;let r=Ge(t);if(r===null)return!1;let o=Pe(e.layout.configPath),n=De(o,r);return n===null||n.apiKey.trim().length===0}});var bk,fy,hy=l(()=>{"use strict";bk=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},fy=async e=>{let t=bk(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=bk(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var Z5,yy,Pk=l(()=>{"use strict";re();Qh();hy();Z5=1e4,yy=()=>fy({listProfileEmails:Ed,readConfig:Zh,pollIntervalMs:Z5,logWaiting:e=>{console.error(e)}})});var ue=l(()=>{"use strict";qh();QE();Qh();Qd();sk();ik();ck();iy();uk();pk();Ci();mk();yk();vr();qt();dy();Ei();Sk();Vh();qt();Ak();ki();vr();Pk();Yh();hy()});var ou,wk,Q5,eV,vk,nu,Ni,su,ji=l(()=>{"use strict";ou=m(require("node:fs")),wk=m(require("node:path")),Q5="wake-port.json",eV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vk=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,nu=e=>wk.default.join(e,Q5),Ni=e=>{let t=nu(e);if(!ou.default.existsSync(t))return null;try{let r=JSON.parse(ou.default.readFileSync(t,"utf8"));if(eV(r)&&vk(r.wakePort))return r.wakePort}catch{return null}return null},su=(e,t)=>{if(!vk(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=nu(e);ou.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Gte,Vte,qte,mt,_k,Di=l(()=>{"use strict";ji();Ee();ji();Gte=lt(),Vte=`${se()}-wake`,qte=se(),mt=()=>{let e=L(),t=Ni(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return lt()},_k=e=>{let t=L();Ni(t)===null&&su(t,e)}});var Wk=l(()=>{"use strict";xh();re();UE();ue();Di()});var Sy,zi,$i,Lk=l(()=>{"use strict";Sy=m(require("node:os"));Wk();zi=()=>{let e=te();return{ok:!0,port:mt(),hostname:Sy.default.hostname(),profileCount:e.length}},$i=()=>{let e=te(),t=H()?.pairingToken.trim()??"",r=t.length>0?_n(t):null,o=Th();return{hostname:Sy.default.hostname(),port:mt(),tokenHash:r,tokenHashes:o.length>0?o:r!==null?[r]:[],profiles:e.map(n=>({email:n.profileEmail,launchAgentLabel:n.launchAgentLabel}))}}});var Ay=l(()=>{"use strict";Lk()});var Ek,kk,Ck,iu,Tn=l(()=>{"use strict";Ek="materialization.json",kk="backups",Ck=".gitignore",iu=e=>`harness-set:${e.trim()}`});var Rk,xk,au,Tk=l(()=>{"use strict";Rk=m(require("node:crypto")),xk=m(require("node:fs")),au=e=>{try{let t=xk.default.readFileSync(e);return Rk.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var _r,ho,tV,Ik,by,Ok=l(()=>{"use strict";_r=m(require("node:fs")),ho=m(require("node:path"));Tk();tV=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=ho.default.join(t,n,o);return _r.default.mkdirSync(ho.default.dirname(s),{recursive:!0}),_r.default.copyFileSync(r,s),ho.default.relative(e,s).replaceAll("\\","/")},Ik=e=>{let t=ho.default.join(e.repoRoot,e.repoRelativeDestination),r=au(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(_r.default.existsSync(t)){let n=au(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=tV(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return _r.default.mkdirSync(ho.default.dirname(t),{recursive:!0}),_r.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return _r.default.mkdirSync(ho.default.dirname(t),{recursive:!0}),_r.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},by=e=>{let t=au(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var Py,Mk,lu,wy=l(()=>{"use strict";Py=m(require("node:fs"));Tn();Mk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lu=e=>{if(!Py.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(Py.default.readFileSync(e,"utf8"));if(Mk(t)&&t.version===1&&Mk(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var Wr,cu,Nk,jk=l(()=>{"use strict";Wr=m(require("node:fs")),cu=m(require("node:path"));Tn();Nk=e=>{let t=new Set(e.setSlugs.map(s=>iu(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=cu.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=cu.default.join(e.repoRoot,i.backupPath);Wr.default.existsSync(c)?(Wr.default.mkdirSync(cu.default.dirname(a),{recursive:!0}),Wr.default.copyFileSync(c,a),o.push(s)):Wr.default.existsSync(a)&&Wr.default.rmSync(a,{force:!0})}else Wr.default.existsSync(a)&&Wr.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var vy,du,_y=l(()=>{"use strict";vy=m(require("node:path"));Tn();du=e=>({ledgerFilePath:vy.default.join(e.metaDirPath,Ek),backupsDirPath:vy.default.join(e.metaDirPath,kk)})});var Wy,Dk,zk=l(()=>{"use strict";Wy=m(require("node:path")),Dk=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return Wy.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return Wy.default.posix.join(s,e,n)}});var Ly,$k,Ey,Hk=l(()=>{"use strict";Ly=m(require("node:fs")),$k=m(require("node:path")),Ey=(e,t)=>{Ly.default.mkdirSync($k.default.dirname(e),{recursive:!0}),Ly.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var ky,rV,Qe,Fi=l(()=>{"use strict";ky=m(require("node:os")),rV=e=>{let t=e.trim();return t.startsWith("~/")?`${ky.default.homedir()}${t.slice(1)}`:t==="~"?ky.default.homedir():t},Qe=rV});var uu,Fk,oV,Uk,Bk=l(()=>{"use strict";uu=m(require("node:fs")),Fk=m(require("node:path"));Tn();oo();oV=`*
!${Rd}
`,Uk=e=>{let t=Fk.default.join(e,Ck);uu.default.existsSync(t)||(uu.default.mkdirSync(e,{recursive:!0}),uu.default.writeFileSync(t,oV))}});var yo,et,So=l(()=>{"use strict";yo=m(require("node:path"));oo();Fi();et=e=>{let t=Qe(e),r=yo.default.join(t,QL);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:yo.default.join(r,"rag"),memoryDirPath:yo.default.join(r,eE),reportsDirPath:yo.default.join(r,rE),metaFilePath:yo.default.join(r,Rd),ragChunksFilePath:yo.default.join(r,"rag",tE)}}});var Lt,Vk,nV,sV,Ve,Cy=l(()=>{"use strict";Lt=m(require("node:fs")),Vk=m(require("node:path"));oo();Bk();So();nV=(e,t)=>{if(Lt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Lt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},sV=e=>{Lt.default.existsSync(e.ragChunksFilePath)||Lt.default.writeFileSync(e.ragChunksFilePath,"");let t=Vk.default.join(e.memoryDirPath,gn);Lt.default.existsSync(t)||Lt.default.writeFileSync(t,"")},Ve=e=>{let t=et(e.projectFolderPath);return Lt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Lt.default.mkdirSync(t.ragDirPath,{recursive:!0}),Lt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),Uk(t.metaDirPath),nV(t,e),sV(t),{ok:!0,layout:t}}});var qk,Kk,Jk,Yk,pu,mu=l(()=>{"use strict";qk="components",Kk="store",Jk="versions",Yk="installed.json",pu=e=>`harness-set:${e.trim()}`});var Ry,Xk,gu,xy=l(()=>{"use strict";Ry=m(require("node:fs")),Xk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gu=e=>{if(!Ry.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(Ry.default.readFileSync(e,"utf8"));if(Xk(t)&&t.version===1&&Xk(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var Ui,In,fu=l(()=>{"use strict";Ui=m(require("node:path"));mu();In=e=>{let t=Ui.default.join(e,qk);return{componentsRootDir:t,storeDir:Ui.default.join(t,Kk),versionsDir:Ui.default.join(t,Jk),installedFilePath:Ui.default.join(t,Yk)}}});var Ty,Zk,hu,yu,Su=l(()=>{"use strict";Ty=m(require("node:crypto")),Zk=m(require("node:fs")),hu=e=>Ty.default.createHash("sha256").update(e,"utf8").digest("hex"),yu=e=>{try{let t=Zk.default.readFileSync(e);return Ty.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Iy,Qk,eC,tC=l(()=>{"use strict";Iy=m(require("node:fs")),Qk=m(require("node:path")),eC=(e,t)=>{Iy.default.mkdirSync(Qk.default.dirname(e),{recursive:!0}),Iy.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var Oy,My,rC,oC=l(()=>{"use strict";Oy=m(require("node:fs")),My=m(require("node:path")),rC=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=My.default.join(e,r),n=My.default.join(o,`${t.versionId}.json`);Oy.default.mkdirSync(o,{recursive:!0}),Oy.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var Au,nC,sC,iC=l(()=>{"use strict";Au=m(require("node:fs")),nC=m(require("node:path"));Su();sC=e=>{let t=hu(e.content),r=nC.default.join(e.storeDir,t);return Au.default.existsSync(r)||(Au.default.mkdirSync(e.storeDir,{recursive:!0}),Au.default.writeFileSync(r,e.content)),t}});var Ny,aC,iV,bu,jy=l(()=>{"use strict";Ny=m(require("node:fs")),aC=m(require("node:path"));mu();xy();fu();Su();tC();oC();iC();iV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bu=e=>{let t=In(e.installDir),r=pu(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!iV(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=aC.default.join(e.harnessRootDir,a);if(!Ny.default.existsSync(c))continue;let d=Ny.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:yu(c);if(p!==null){if(hu(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);sC({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;rC(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=gu(t.installedFilePath);eC(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var zy,Dy,lC,cC=l(()=>{"use strict";zy=m(require("node:fs"));jy();xy();fu();Dy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lC=e=>{if(!zy.default.existsSync(e.harnessManifestPath))return;let t=In(e.installDir),r=gu(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(zy.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!Dy(o)||o.version!==1||!Dy(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!Dy(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];bu({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var $y,dC,uC,pC=l(()=>{"use strict";$y=m(require("node:fs")),dC=m(require("node:path")),uC=e=>{let t=e.componentId.replaceAll("/","_"),r=dC.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!$y.default.existsSync(r))return null;try{let o=JSON.parse($y.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Pu,wu,mC,gC=l(()=>{"use strict";Pu=m(require("node:fs")),wu=m(require("node:path"));mu();cC();pC();fu();Su();mC=e=>{lC({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=In(e.layout.installDir),r=pu(e.setSlug),o=uC({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=wu.default.join(t.storeDir,i.contentSha256);if(Pu.default.existsSync(a)&&yu(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?wu.default.join(e.layout.harnessRootDir,n):wu.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Pu.default.existsSync(s))return null;try{if(!Pu.default.statSync(s).isFile())return null}catch{return null}return s}});var fC,aV,lV,Lr,vu=l(()=>{"use strict";wy();_y();So();fC="harness-set:",aV=e=>{let t=e.trim();if(!t.startsWith(fC))return null;let r=t.slice(fC.length).trim();return r.length>0?r:null},lV=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=aV(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Lr=e=>{let t=et(e),{ledgerFilePath:r}=du(t),o=lu(r);return lV(o)}});var _u,Hy,Bi,cV,Kt,Gi,On=l(()=>{"use strict";_u=m(require("node:fs")),Hy=m(require("node:os")),Bi=m(require("node:path")),cV=()=>_u.default.realpathSync(Bi.default.resolve(Hy.default.homedir())),Kt=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Bi.default.join(Hy.default.homedir(),t.slice(1)):t,o;try{o=_u.default.realpathSync(Bi.default.resolve(r))}catch{return null}let n=cV();return o===n||o.startsWith(`${n}${Bi.default.sep}`)?o:null},Gi=e=>{let t=Kt(e);if(t===null)return null;try{if(!_u.default.statSync(t).isFile())return null}catch{return null}return t}});var Fy,Uy=l(()=>{"use strict";Fy=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Lu,hC,Wu,dV,Vi,By=l(()=>{"use strict";Lu=m(require("node:fs")),hC=m(require("node:path"));Tn();Ok();wy();jk();_y();zk();Hk();Fi();Cy();gC();vu();On();Uy();Wu=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),dV=e=>{if(!Lu.default.existsSync(e))return null;try{let t=JSON.parse(Lu.default.readFileSync(e,"utf8"));if(Wu(t)&&t.version===1)return t}catch{return null}return null},Vi=e=>{let t=[...new Set(e.setSlugs.map(b=>b.trim()).filter(b=>b.length>0))],r=Qe(e.projectFolderPath),o=Kt(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Lu.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Ve({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=du(s.layout),d=Lr(o).filter(b=>!t.includes(b)),p=lu(i),g=0;if(d.length>0){let b=Nk({repoRoot:o,setSlugs:d,ledger:p});p=b.ledger,g=b.summary.removedPaths.length}if(t.length===0)return Ey(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:[]};let S=dV(e.layout.harnessManifestPath);if(S===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=Wu(S.sets)?S.sets:{},y=0,u=0,A=0;for(let b of t){let f=h[b];if(!Wu(f))return{ok:!1,errorMessage:`Harness set "${b}" is not installed locally.`};let w=typeof f.version=="number"?String(f.version):"1",v=iu(b),_=Array.isArray(f.items)?f.items:[];for(let E of _){if(!Wu(E))continue;let k=typeof E.path=="string"?E.path.trim():"";if(k.length===0)continue;let x=Fy(k);if(x===null)continue;let I=Dk(b,x),j=hC.default.posix.join(".cursor",I).replaceAll("\\","/"),ne=typeof E.id=="string"?E.id.trim():"",G=mC({layout:e.layout,setSlug:b,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:k,manifestItemId:ne});if(G===null)continue;let V=Ik({repoRoot:o,backupsDir:a,repoRelativeDestination:j,sourceAbsolutePath:G,componentId:v,versionId:w,ledger:p});if(V.kind==="skipped_unchanged"){u+=1;continue}if(V.kind==="backed_up_user_file"){A+=1,y+=1,p={version:1,entries:{...p.entries,[j]:by({componentId:v,versionId:w,sourceAbsolutePath:G,backupPath:V.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[j]:by({componentId:v,versionId:w,sourceAbsolutePath:G})}}}}return y===0&&u===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(Ey(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:A,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:t})}});var yC,Eu,uV,pV,mV,gV,fV,hV,yV,SV,AV,qi,ku=l(()=>{"use strict";yC=m(require("node:crypto")),Eu=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},uV=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},pV=(e,t)=>{let r=uV(t),o=Eu(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},mV=(e,t,r)=>{let o=pV(t,r);return`shared/items/${e}/${o}`},gV=["rules","skills","commands","instructions","agents"],fV=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),hV=(e,t)=>[...e.filter(o=>o.id!==t.id),t],yV=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},SV=e=>yC.default.createHash("sha256").update(e,"utf8").digest("hex"),AV=e=>({id:e.id,kind:e.kind,title:e.title,path:mV(e.id,e.kind,e.title),contentSha256:SV(e.content)}),qi=e=>{let t=new Date().toISOString(),r=e.existingManifest??fV(e.hostname,t),o=Eu(e.bundle.slug),n=yV(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...gV.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let g=AV(p);return{files:[...d.files,{relativePath:g.path,content:p.content}],nextItems:hV(d.nextItems,g)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var Er,SC,Cu,bV,Ao,Gy=l(()=>{"use strict";Er=m(require("node:fs")),SC=m(require("node:os")),Cu=m(require("node:path"));ku();bV=e=>{if(!Er.default.existsSync(e))return null;try{let t=JSON.parse(Er.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Ao=e=>{try{let t=bV(e.layout.harnessManifestPath),r=qi({bundle:e.bundle,hostname:SC.default.hostname(),existingManifest:t});Er.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)Er.default.mkdirSync(Cu.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Cu.default.join(e.layout.harnessRootDir,o.relativePath);Er.default.mkdirSync(Cu.default.dirname(n),{recursive:!0}),Er.default.writeFileSync(n,o.content)}return Er.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var Vy,AC=l(()=>{"use strict";Gy();By();Vy=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=Ao({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Vi({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var bC,PC=l(()=>{"use strict";bC=["rule","skill","command","instruction","agent"]});var wC,PV,wV,Et,qy=l(()=>{"use strict";PC();wC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),PV=e=>typeof e=="string"&&bC.includes(e),wV=e=>{if(!wC(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!PV(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Et=e=>{if(!wC(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=wV(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var vC,vV,Ky,_C=l(()=>{"use strict";vC=require("node:zlib");qy();vV="x-agent-witch-token",Ky=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[vV]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,vC.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=Et(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var Yy,Jy,kr,WC=l(()=>{"use strict";Yy=m(require("node:fs")),Jy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kr=e=>{if(!Yy.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(Yy.default.readFileSync(e.harnessManifestPath,"utf8"));if(!Jy(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=Jy(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!Jy(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Ru,LC=l(()=>{"use strict";Ru=()=>"~"});var EC,kC,CC=l(()=>{"use strict";EC=require("node:crypto"),kC=e=>`local-${(0,EC.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var Xy,RC=l(()=>{"use strict";Xy=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Ki,xu,Zy=l(()=>{"use strict";Ki=m(require("node:path")),xu=e=>{let t=Ki.default.dirname(e),r=Ki.default.basename(t);return r==="agents"?Ki.default.basename(Ki.default.dirname(t)):r}});var Ji,Jt,xC,_V,WV,LV,Tu,TC,Qy=l(()=>{"use strict";Ji=m(require("node:fs")),Jt=m(require("node:path"));CC();RC();Zy();xC=new Set(["node_modules",".git","dist","build",".next","coverage"]),_V=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},WV=(e,t)=>{let r=Jt.default.basename(t);if(e==="skill"){let o=t.split(Jt.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},LV=e=>{let t=[],r=(n,s)=>{let i;try{i=Ji.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&xC.has(a.name))continue;let c=Jt.default.join(n,a.name),d=s?Jt.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;Xy(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=Jt.default.join(e,n);Ji.default.existsSync(s)&&r(s,n)}let o=Jt.default.join(e,"skills");return Ji.default.existsSync(o)&&r(o,"skills"),t},Tu=e=>{let t=LV(e);if(t.length===0)return null;let r=Jt.default.dirname(e),o=xu(e),n=_V(o),s=t.map(i=>{let a=Xy(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:kC(i.absolutePath),kind:a,title:WV(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},TC=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Ji.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||xC.has(a.name))continue;let c=Jt.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var IC,eS,EV,tS,OC=l(()=>{"use strict";IC=m(require("node:fs")),eS=m(require("node:path"));Qy();On();EV=e=>{let t=Kt(e.trim());if(t===null)return null;if(eS.default.basename(t)===".cursor")return t;let r=eS.default.join(t,".cursor");try{if(IC.default.statSync(r).isDirectory())return Kt(r)}catch{return null}return null},tS=e=>{let t=EV(e.projectPath);if(t===null)return null;let r=Tu(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var MC,kV,Iu,rS,NC=l(()=>{"use strict";MC=m(require("node:path"));Qy();On();Zy();kV=5,Iu=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},rS=e=>{let t=Kt(e.scanRoot.trim());if(t===null)return Iu(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of TC(t,kV,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=Kt(s);if(i===null)continue;let a=xu(i);Iu(e.response,"folder",{cursorDir:i,groupName:a,repoPath:MC.default.dirname(i)});let c=Tu(i);c!==null&&(r.push(c),Iu(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Iu(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var jC,DC,zC=l(()=>{"use strict";jC=m(require("node:path")),DC=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:jC.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Me,$C,oS,CV,nS,sS,Ou,iS,Yi,HC=l(()=>{"use strict";Me=m(require("node:fs")),$C=m(require("node:os")),oS=m(require("node:path"));ku();jy();On();zC();CV=e=>{if(!Me.default.existsSync(e))return null;try{let t=JSON.parse(Me.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},nS=e=>{let t=e.hostname??$C.default.hostname(),r=CV(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let g=Gi(p.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let S=Me.default.readFileSync(g,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:S,setSlugs:[i.slug]})}let d=qi({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Me.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Me.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=oS.default.join(e.layout.harnessRootDir,i.relativePath);Me.default.mkdirSync(oS.default.dirname(a),{recursive:!0}),Me.default.writeFileSync(a,i.content)}Me.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=Eu(i.slug),d=r.sets[c];d!==void 0&&bu({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},sS="reveal-cache.json",Ou=(e,t)=>{Me.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Me.default.writeFileSync(`${e.harnessRootDir}/${sS}`,`${JSON.stringify(t,null,2)}
`)},iS=e=>{let t=`${e.harnessRootDir}/${sS}`;Me.default.existsSync(t)&&Me.default.unlinkSync(t)},Yi=e=>{let t=`${e.harnessRootDir}/${sS}`;if(!Me.default.existsSync(t))return null;try{let r=JSON.parse(Me.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return DC(r)}catch{return null}return null}});var bo=l(()=>{"use strict";By();AC();Uy();Gy();_C();qy();ku();WC();LC();OC();On();NC();HC()});var aS,FC=l(()=>{"use strict";bo();Ee();aS=e=>{let t=M(e.profileEmail);return Ao({bundle:e.bundle,layout:t})}});var UC=l(()=>{"use strict";FC();bo()});var RV,BC,xV,GC,Po,Mu,VC=l(()=>{"use strict";RV=["agentwitch.com","www.agentwitch.com"],BC=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,xV=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},GC=e=>{let t=xV(e);return!!(RV.includes(t)||BC.test(e.trim().toLowerCase()))},Po=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return GC(r)?BC.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Mu=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Po(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Xi=l(()=>{"use strict";VC()});var Yt,Zi=l(()=>{"use strict";Yt=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Qi,qC=l(()=>{"use strict";UC();Xi();Zi();Qi=e=>{if(!Yt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Et(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Po(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=aS({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var lS=l(()=>{"use strict";qC()});var TV,Mn,cS=l(()=>{"use strict";TV=e=>e==="hourly"||e==="daily"||e==="weekdays",Mn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!TV(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var ea,Nu,KC,JC,dS,gt,ju,Du,zu,$u,Hu=l(()=>{"use strict";ea=m(require("node:fs")),Nu=m(require("node:path"));cS();KC="automations.json",JC=e=>e.profileEmail!==null?Nu.default.join(e.installDir,"profiles",e.profileEmail,KC):Nu.default.join(e.installDir,KC),dS=()=>({version:1,automations:[]}),gt=e=>{let t=JC(e);if(!ea.default.existsSync(t))return dS();try{let r=JSON.parse(ea.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?dS():{version:1,automations:r.automations.flatMap(n=>{let s=Mn(n);return s!==null?[s]:[]})}}catch{return dS()}},ju=(e,t)=>{let r=JC(e);ea.default.mkdirSync(Nu.default.dirname(r),{recursive:!0}),ea.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Du=(e,t)=>{ju(e,{version:1,automations:t})},zu=(e,t)=>{let o=gt(e).automations.filter(n=>n.id!==t.id);ju(e,{version:1,automations:[...o,t]})},$u=(e,t)=>gt(e).automations.find(r=>r.id===t)??null});var ze,Cr=l(()=>{"use strict";ze="x-agent-witch-token"});var Z,wo,uS,ta,pS,IV,mS,ra,oa,gS,na=l(()=>{"use strict";Cr();Ze();Z=e=>{let t=Ce(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},wo=e=>({[ze]:e,"Content-Type":"application/json"}),uS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:wo(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},ta=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:wo(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},pS=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:wo(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},IV=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},mS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:wo(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},ra=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:wo(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return IV(r)}catch{return null}},oa=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:wo(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},gS=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:wo(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var vo,YC,XC,OV,fS,ZC,hS=l(()=>{"use strict";vo=m(require("node:fs")),YC=m(require("node:path")),XC=e=>YC.default.join(e.harnessRootDir,"projects-registry.json"),OV=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),fS=e=>{let t=XC(e);if(!vo.default.existsSync(t))return[];try{let r=JSON.parse(vo.default.readFileSync(t,"utf8"));return OV(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},ZC=e=>{let t=XC(e);if(!vo.default.existsSync(t))return;let r=`${t}.migrated`;if(vo.default.existsSync(r)){vo.default.unlinkSync(t);return}vo.default.renameSync(t,r)}});var QC,MV,NV,eR,tR=l(()=>{"use strict";Fi();QC=e=>Qe(e),MV=e=>new Set(e.map(t=>QC(t.folderPath))),NV=e=>new Set(e.map(t=>t.id)),eR=(e,t)=>{let r=MV(t),o=NV(t),n=[],s=new Set;for(let i of e){let a=QC(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var yS,SS=l(()=>{"use strict";na();hS();tR();yS=async(e,t)=>{let r=fS(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await ra(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=eR(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await mS(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&ZC(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var AS,_o,Fu=l(()=>{"use strict";AS=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),_o=(e,t)=>e.find(r=>r.id===t)??null});var Nn,Uu=l(()=>{"use strict";na();SS();Fu();Nn=async(e,t)=>{t!==void 0&&await yS(t,e);let r=Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await ra(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Console. Check the Mac connection and try again."};let n=AS(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Console, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Console.`}}});var rR=l(()=>{"use strict"});var Ne,oR,jV,DV,zV,$V,jn,bS=l(()=>{"use strict";Ne=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oR=(e,t)=>e.length===0?`<p class="empty">${Ne(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Ne(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Ne(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Console \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,jV=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,DV=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ne(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Console. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,zV=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?DV(e.project):jV();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
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
      </form>`},$V=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Ne(t)} from recent runs. Review in Agent Witch Console or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Ne(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},jn=e=>{let t=e.flashError?`<div class="alert-error">${Ne(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ne(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(a,c)=>`<a class="project-tab${e.activeTab===a?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${a}">${Ne(c)}</a>`,n=e.composition?.items.filter(a=>a.kind==="workflow")??[],s=e.composition?.items.filter(a=>a.kind==="agent")??[],i="";return e.activeTab==="harness"?i=zV({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=oR(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=oR(s,"No agents installed for this project yet."):i=$V({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount}),`${t}<section class="card">
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
    </section>`}});var HV,FV,nR,sR=l(()=>{"use strict";bo();Cr();HV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),FV=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[ze]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!HV(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Et(n);return s===null?[]:[s]})}catch{return null}},nR=FV});var iR,PS,aR=l(()=>{"use strict";ue();bo();bS();Uu();sR();Fu();vu();na();iR=e=>({kind:"page",title:e.project.name,body:jn({project:e.project,installed:kr(e.layout),linkedSetSlugs:Lr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),PS=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=H();if(r===null)return{kind:"not_found"};let o=await Nn(r,e.layout),n=_o(o.projects,t);if(n===null)return{kind:"not_found"};let s=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s===null?null:await nR(s,n.id);if(i===null)return iR({layout:e.layout,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Console."});let a=Vy({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:i});if(!a.ok)return iR({layout:e.layout,project:n,errorMessage:a.errorMessage});let c=s===null?!1:await oa(s,n.id,a.appliedSetSlugs),d=new URLSearchParams({linked:"1",files:String(a.writtenFileCount),bindingsSynced:c?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${d.toString()}`}}});var UV,wS,lR=l(()=>{"use strict";UV=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,wS=UV});var cR,dR,BV,GV,Bu,Gu,uR=l(()=>{"use strict";cR=require("node:child_process"),dR=require("node:util"),BV=(0,dR.promisify)(cR.execFile),GV=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},Bu=async(e,t)=>{try{let{stdout:r}=await BV("git",t,{cwd:e,env:GV(),maxBuffer:1048576});return r.trim()}catch{return null}},Gu=async e=>{let t=await Bu(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await Bu(e,["rev-parse","--abbrev-ref","HEAD"]),o=await Bu(e,["status","--porcelain"]),n=await Bu(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var vS,pR=l(()=>{"use strict";vS=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var VV,_S,mR=l(()=>{"use strict";VV=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},_S=VV});var qV,WS,gR=l(()=>{"use strict";Cr();qV=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[ze]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},WS=qV});var fR,Rr,hR=l(()=>{"use strict";fR=require("node:child_process"),Rr=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,fR.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var yR=l(()=>{"use strict";Uu()});var sa,SR=l(()=>{"use strict";Cr();sa=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[ze]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var ft=l(()=>{"use strict";Uu();Fu();rR();Fi();Cy();aR();vu();lR();uR();pR();mR();gR();hR();yR();SR();SS();hS();na()});var Vu,ia,AR,LS,Wo,ES=l(()=>{"use strict";Vu=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},ia=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Vu(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},AR=e=>e>=1&&e<=5,LS=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Vu(t,"UTC")},Wo=e=>{let t=e.from??new Date,r=Vu(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return ia(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=ia(r,e.timeZone,o,0),s=Vu(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?ia(LS(r),e.timeZone,o,0):n;if(!i&&AR(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=LS(a),AR(a.weekday))return ia(a,e.timeZone,o,0);return ia(LS(r),e.timeZone,o,0)}});var bR,kS,Xt,CS=l(()=>{"use strict";bR=require("node:crypto");ue();ft();ES();Hu();kS=!1,Xt=async e=>{if(kS)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=H();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=$u(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};kS=!0;let n=(0,bR.randomUUID)();try{let s=await Rn(t,"claude-cli",o.prompt);await gS(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=Wo({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return zu(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{kS=!1}}});var qu,PR=l(()=>{"use strict";ue();CS();Hu();qu=async()=>{let e=H();if(e===null)return;let t=gt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await Xt(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var aa=l(()=>{"use strict";Hu();PR();CS();ES()});var wR=l(()=>{"use strict";aa()});var vR=l(()=>{"use strict";cS()});var _R=l(()=>{"use strict";vR()});var RS=l(()=>{"use strict";aa()});var KV,JV,la,xS=l(()=>{"use strict";wR();_R();RS();Ee();KV=e=>e!==void 0&&e.trim().length>0?M(e.trim()):M(),JV=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??Wo({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??Wo({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},la=e=>{let t=KV(e.profileEmail),r=gt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Mn(s);return i!==null?[JV(i,o.get(i.id))]:[]});return Du(t,n),{ok:!0,writtenCount:n.length}}});var TS=l(()=>{"use strict";aa()});var WR=l(()=>{"use strict";ue()});var LR=l(()=>{"use strict";xS();TS();RS();WR()});var ER,ca,da,ua,kR=l(()=>{"use strict";ER=m(require("node:os"));LR();Xi();Zi();ca=e=>{if(!Yt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Po(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=la({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},da=async e=>{if(!Yt(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Po(t)?Xt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},ua=()=>{let e=H(),t=e!==null?gt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:ER.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var IS=l(()=>{"use strict";kR()});var Ku=l(()=>{"use strict";re()});var Ju=l(()=>{"use strict";re()});var Yu,RR,xR,CR,YV,XV,Dn,OS=l(()=>{"use strict";Yu=m(require("node:fs")),RR=m(require("node:os")),xR=m(require("node:path"));Ku();Ju();ji();Ee();CR=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},YV=e=>xR.default.join(RR.default.homedir(),"Library","LaunchAgents",`${e}.plist`),XV=async e=>Yu.default.existsSync(YV(e))?(await Le(e)).ok:!1,Dn=async(e=L())=>{let t=Yu.default.existsSync(nu(e)),r=!Yu.default.existsSync($t(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Ni(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await CR(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${se(e)}-wake`;await XV(i)&&s.push(i);for(let c of te(e))(await Le(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await CR(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var TR=l(()=>{"use strict";re()});var zn,pa=l(()=>{"use strict";zn="connection-health.json"});var Lo,Xu,ZV,ma,we,MS,Zu,je,Qu=l(()=>{"use strict";Lo=m(require("node:fs")),Xu=m(require("node:path"));pa();ZV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ma=e=>e.profileEmail===null?Xu.default.join(e.installDir,zn):Xu.default.join(e.installDir,"profiles",e.profileEmail,zn),we=e=>{let t=ma(e);if(!Lo.default.existsSync(t))return null;try{let r=JSON.parse(Lo.default.readFileSync(t,"utf8"));return!ZV(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},MS=e=>{let t=ma(e);Lo.default.existsSync(t)&&Lo.default.rmSync(t,{force:!0})},Zu=(e,t)=>{let r=ma(e),o=we(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Lo.default.mkdirSync(Xu.default.dirname(r),{recursive:!0}),Lo.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},je=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var ga,IR=l(()=>{"use strict";pa();Qu();ga=(e,t)=>{if(!t.socketOpen)return!1;let r=we(e);return r===null?!1:!je(r,t.staleAfterMs??12e4,t.nowMs)}});var NS,OR=l(()=>{"use strict";Qu();NS=(e,t)=>!(e!==null&&!je(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var $n=l(()=>{"use strict";Qu();IR();OR();pa()});var jS=l(()=>{"use strict";$n();re()});var DS=l(()=>{"use strict";$n()});var zS=l(()=>{"use strict";re()});var NR,MR,fa,$S=l(()=>{"use strict";NR=m(require("node:fs"));Vt();Ku();Ju();Ee();MR=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},fa=async(e=L())=>{if(!NR.default.existsSync($t(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await MR())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of te(e))(await Le(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await MR();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var jR=l(()=>{"use strict";re()});var DR,Eo,HS,QV,eq,tq,zR,rq,$R,Hn,ep=l(()=>{"use strict";DR=require("node:crypto"),Eo=m(require("node:fs")),HS=m(require("node:path"));Ee();QV="watchdog-log.ndjson",eq=200,tq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zR=(e=L())=>{let t=M(),r=t.installDir===e?t.logsDir:mn({installDir:e,profileEmail:t.profileEmail});return HS.default.join(r,QV)},rq=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!tq(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},$R=(e,t=L())=>{let r={id:(0,DR.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=zR(t);Eo.default.mkdirSync(HS.default.dirname(o),{recursive:!0});let n=Eo.default.existsSync(o)?Eo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-eq+1)),JSON.stringify(r)];return Eo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Hn=(e=20,t=L())=>{let r=zR(t);if(!Eo.default.existsSync(r))return[];let o=Eo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=rq(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var FS,US,BS,GS=l(()=>{"use strict";wt();FS=Yr.watchdogReinstallState,US=900*1e3,BS=3e3});var HR=l(()=>{"use strict";GS()});var FR={};bt(FR,{verifyAgentWitchReviveAfterKickstart:()=>nq});var oq,nq,UR=l(()=>{"use strict";HR();DS();zS();Ee();oq=e=>new Promise(t=>{setTimeout(t,e)}),nq=async e=>{if(await oq(e.verifyDelayMs??BS),!await Qr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?M():M(e.profileEmail),o=we(r);return!je(o,e.staleAfterMs)}});var ha,VS,sq,BR,GR,qS,KS,JS=l(()=>{"use strict";ha=m(require("node:fs")),VS=m(require("node:path"));q();GS();sq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),BR=e=>VS.default.join(e,FS),GR=(e=L())=>{let t=BR(e);if(!ha.default.existsSync(t))return null;try{let r=JSON.parse(ha.default.readFileSync(t,"utf8"));return!sq(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},qS=(e=L(),t=Date.now())=>{let r=GR(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=US:!0},KS=(e=L(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=BR(e);return ha.default.mkdirSync(VS.default.dirname(o),{recursive:!0}),ha.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var YS,VR=l(()=>{"use strict";re();JS();YS=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!qS())return{attempted:!1,ok:!1,targets:e};KS();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Le(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var qR=l(()=>{"use strict";JS();VR()});var XS=l(()=>{"use strict";Ze()});var KR=l(()=>{"use strict";Ze()});var JR,Fn,YR,XR,ZR,iq,aq,QR,lq,cq,ex,tx=l(()=>{"use strict";JR=require("node:child_process"),Fn=m(require("node:fs")),YR=m(require("node:os")),XR=m(require("node:path")),ZR=require("node:util");XS();KR();Ee();iq=(0,ZR.promisify)(JR.execFile),aq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),QR=e=>{let t=ct(e),r=t===null?M():M(t);if(!Fn.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Fn.default.readFileSync(r.configPath,"utf8"));return!aq(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},lq=e=>QR(e)?.wsUrl??null,cq=e=>{let t=lq(e);return t!==null?Ce(t):ke(e)?.appOrigin??null},ex=async e=>{let t=e?.installDir??L(),r=QR(t),o=r!==null?Ce(r.wsUrl):cq(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=XR.default.join(YR.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Fn.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??ct(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await iq("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Fn.default.existsSync(i)&&Fn.default.unlinkSync(i)}}});var rx={};bt(rx,{attemptAgentWitchWatchdogReinstall:()=>dq});var dq,ox=l(()=>{"use strict";qR();tx();dq=async e=>YS(e,()=>ex())});var nx,sx,ix,uq,pq,mq,ya,ZS=l(()=>{"use strict";TR();jS();DS();zS();$S();OS();Ku();Ju();Ee();bn();jR();ep();nx=e=>e===null?M():M(e),sx=async(e,t,r)=>{if(!await Qr(e))return"not_running";let n=nx(t);if(ut(n))return"healthy";let s=we(n);return je(s,r)?"stale_connection":"healthy"},ix=async e=>{let t=e?.staleAfterMs??12e4,r=L(),o=te(r);return Promise.all(o.map(async n=>{let s=await sx(n.launchAgentLabel,n.profileEmail,t),i=nx(n.profileEmail),a=we(i),c=await Qr(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:je(a,t),needsRevive:s!=="healthy",reason:s}}))},uq=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},pq=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",mq=async e=>{let t=await Le(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(UR(),FR)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},ya=async e=>{if(!dt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=L();await Dn(r),await fa(r);let o=te(r),n=[];for(let p of o){let g=await sx(p.launchAgentLabel,p.profileEmail,t);if(g==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:g});continue}n.push(await mq({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:g,staleAfterMs:t}))}if(n.length===0){let p=Zr();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(ox(),rx)),g=await p(n);s=g.attempted,i=g.ok,a=g.errorMessage,c=[...g.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&$R({event:pq(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:uq(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var ax,tp,lx=l(()=>{"use strict";ax=m(require("node:os"));jS();ep();ZS();tp=async()=>{let e=await ix(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:ax.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Hn(1)[0]??null}}});var QS=l(()=>{"use strict";OS();ZS();lx();ep()});var Sa,Aa,ba,cx=l(()=>{"use strict";re();QS();Sa=async()=>{await Dn();let e=te(),t=[];for(let r of e){let o=await Le(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Zr();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Aa=ya,ba=ya});var eA=l(()=>{"use strict";cx()});var op,rp,dx,tA,ux,gq,fq,hq,yq,Sq,np,px=l(()=>{"use strict";op=require("node:child_process"),rp=m(require("node:fs")),dx=m(require("node:os")),tA=m(require("node:path")),ux=require("node:util");re();q();gq=(0,ux.promisify)(op.execFile),fq=()=>tA.default.join(dx.default.homedir(),"Library","LaunchAgents"),hq=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await gq("launchctl",["bootout",r]).catch(()=>{})},yq=e=>{let t=tA.default.join(fq(),`${e}.plist`);rp.default.existsSync(t)&&rp.default.unlinkSync(t)},Sq=e=>{(0,op.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},np=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=L();if(!rp.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Ht(e);for(let r of t)await hq(r),yq(r);return Sq(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var mx,sp,gx,Un,fx,Aq,bq,Pq,rA,wq,oA,hx=l(()=>{"use strict";mx=require("node:child_process"),sp=m(require("node:fs")),gx=m(require("node:os")),Un=m(require("node:path")),fx=require("node:util");re();Aq=(0,fx.promisify)(mx.execFile),bq=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],Pq=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],rA=e=>{sp.default.existsSync(e)&&sp.default.rmSync(e,{force:!0})},wq=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await Aq("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},oA=async e=>{let r=(e.listLaunchAgentLabels??Ht)(e.layout.installDir),o=e.launchAgentsDir??Un.default.join(gx.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??wq;for(let i of r)await n(i),rA(Un.default.join(o,`${i}.plist`));let s=Un.default.dirname(e.layout.configPath);for(let i of bq)rA(Un.default.join(s,i));for(let i of Pq)rA(Un.default.join(e.layout.installDir,i));return sp.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var nA,yx=l(()=>{"use strict";nA={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var sA,Sx=l(()=>{"use strict";sA="unknown_identity"});var iA=l(()=>{"use strict";yx();Sx()});var vq,aA,Ax=l(()=>{"use strict";iA();vq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),aA=e=>e.type!=="system.error"||!vq(e.payload)?!1:e.payload.errorCode===sA});var lA=l(()=>{"use strict";px();hx();Ax()});var ip=l(()=>{"use strict";re();Ze();lA();QS()});var Bn,ap,lp=l(()=>{"use strict";ip();Bn=(e=20)=>Hn(e),ap=tp});var cp,Gn,dp,up=l(()=>{"use strict";ip();cp=mo,Gn=(e=20)=>co(e),dp=e=>po(e)});var pp,cA=l(()=>{"use strict";ip();pp=()=>np()});var bx=l(()=>{"use strict";Ay();lS();IS();eA();lp();up();cA()});var Px={};bt(Px,{buildAgentWitchAutomationStatusFromWakeServer:()=>ua,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>cp,buildAgentWitchWakeHealthResponse:()=>zi,buildAgentWitchWakeIdentityResponse:()=>$i,buildAgentWitchWatchdogStatus:()=>ap,installHarnessFromWakeServer:()=>Qi,readAgentWitchSelfUpdateLogEntries:()=>Gn,readAgentWitchWatchdogLogEntries:()=>Bn,restartAgentWitchFromWakeServer:()=>ba,reviveAgentWitchWebSocketFromWakeServer:()=>Aa,runAgentWitchSelfUpdateFromWakeServer:()=>dp,runAgentWitchUninstallLocalFromWakeServer:()=>pp,runAutomationFromWakeServer:()=>da,syncAutomationsFromWakeServer:()=>ca,wakeAgentWitchLaunchAgents:()=>Sa});var wx=l(()=>{"use strict";bx()});var vx,_x,dA,uA,Wx=l(()=>{"use strict";vx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),_x=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?vx(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?vx(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},dA=e=>{let t=e.watchdogLogs.map(_x).join(""),r=e.updateLogs.map(_x).join("");return`<!doctype html>
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
</html>`},uA=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var Lx,Ex,kx=l(()=>{"use strict";Lx=m(require("node:net")),Ex=()=>new Promise((e,t)=>{let r=Lx.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var Cx,_q,pA,Rx=l(()=>{"use strict";Cx=m(require("node:net"));kx();Di();ji();Ee();_q=e=>new Promise(t=>{let r=Cx.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),pA=async()=>{let e=L(),t=mt();if(await _q(t))return _k(t),t;let r=await Ex();return su(e,r),r}});var Wq,mA,xx=l(()=>{"use strict";Wq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mA=e=>({force:Wq(e)&&e.force===!0})});var Pa=l(()=>{"use strict";Xi();Wx();Rx();xx();Qf();Md();so()});var gA,D,fA,hA,wa,Tx=l(()=>{"use strict";gA=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},D=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},fA=e=>{e.writeHead(403),e.end()},hA=e=>e.url?.split("?")[0]??"/",wa=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var ht=l(()=>{"use strict";Tx()});var Lq,Ix,Ox=l(()=>{"use strict";IS();ht();Lq=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return D(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},Ix=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return D(e.response,200,ua(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await Lq(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=ca(t);return D(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await da(t);return D(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var Eq,Nx,Mx,jx,yA,Dx,SA=l(()=>{"use strict";Eq=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],Nx=e=>/embed|minilm|^bge-/i.test(e),Mx=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),jx=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),yA=e=>e.filter(t=>t.trim().length>0&&!Nx(t)),Dx=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!Nx(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>Mx(s,o));if(n!==void 0)return n}for(let n of Eq){let s=r.find(i=>Mx(i,n));if(s!==void 0)return s}return r[0]??null}});var AA,Hx,Fx,mp,Ux,zx,$x,kq,Cq,Rq,xq,Tq,Iq,yt,va=l(()=>{"use strict";AA=require("node:child_process"),Hx=m(require("node:fs")),Fx=m(require("node:os")),mp=m(require("node:path"));Ze();pt();SA();Ux=3e3,zx=["claude-cli","codex","cursor","antigravity"],$x={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},kq=(e,t)=>new Promise(r=>{let o=(0,AA.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},Ux);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),Cq=()=>{let e=Fx.default.homedir();return["ollama",mp.default.join(e,".local","bin","ollama"),mp.default.join(e,".agent-witch","ollama","ollama"),mp.default.join(e,".local-agent-witch","ollama","ollama")]},Rq=e=>new Promise(t=>{let r=(0,AA.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},Ux);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(jx(Buffer.concat(o).toString("utf8")))})}),xq=async()=>{for(let e of Cq()){if(e!=="ollama"&&!Hx.default.existsSync(e))continue;let t=await Rq(e);if(t!==null)return t}return[]},Tq=e=>{let t=e.installedWriterIds.map(s=>$x[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=ce(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${$x[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},Iq=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:Pn},yt=async e=>{let t=zx.map(i=>{let a=Gd(i,e.commands);return kq(a.command,a.args)}),[r,...o]=await Promise.all([xq(),...t]),n=zx.flatMap((i,a)=>o[a]===!0?[i]:[]),s=Dx(r,Iq());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:Tq({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var Oq,Mq,bA,Bx=l(()=>{"use strict";Oq="http://127.0.0.1:11434",Mq=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},bA=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Oq;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?Mq(await o.json()):null}catch{return null}}});var PA=l(()=>{"use strict";pt();va();Bx();SA()});var Nq,Gx,Vx=l(()=>{"use strict";PA();Nq={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},Gx=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:Nq[t]})),ollamaModels:yA(e.ollamaModels)})});var jq,qx,Kx=l(()=>{"use strict";PA();ht();Vx();jq=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return D(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},qx=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await yt({commands:de({})});return D(e.response,200,{ok:!0,...Gx({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await jq(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await bA({model:r,prompt:o});return n===null?(D(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(D(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var Dq,Jx,Yx=l(()=>{"use strict";lS();ht();Dq=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return D(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},Jx=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await Dq(e);if(t===null)return!0;let r=Qi(t);return D(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var Xx=l(()=>{"use strict";ft()});var wA,Zx=l(()=>{"use strict";Xx();Zi();wA=e=>{if(!Yt(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Ve({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var Qx,vA,_A=l(()=>{"use strict";ue();ft();Zi();Qx=e=>{if(!Yt(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},vA=async e=>{let t=Qx(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Rr("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=H();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=Z({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Ve({projectFolderPath:r}),await sa(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Console."})}});var e0=l(()=>{"use strict";Zx();_A()});var t0,r0=l(()=>{"use strict";e0();_A();ht();t0=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=wA(t);return D(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await vA(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return D(e.response,o,r,e.cors.headers),!0}return!1}});var o0,n0=l(()=>{"use strict";Pa();up();lp();o0=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Bn(50),r=Gn(50);return e.response.writeHead(200,uA()),e.response.end(dA({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var s0,i0=l(()=>{"use strict";Ay();ht();s0=e=>e.request.method==="GET"&&e.pathname==="/health"?(D(e.response,200,zi(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(D(e.response,200,$i(),e.cors.headers),!0):!1});var a0,l0=l(()=>{"use strict";cA();ht();a0=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await pp();return D(e.response,t.ok?200:503,t,e.cors.headers),!0}});var c0,d0=l(()=>{"use strict";eA();ht();c0=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Aa();return D(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await ba();return D(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Sa();return D(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var u0,p0=l(()=>{"use strict";Pa();up();ht();u0=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=cp();return D(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=wa(e.request,"/update/logs",20,200);return D(e.response,200,{ok:!0,logs:Gn(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=mA(t),o=await dp({force:r});return D(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var m0,g0=l(()=>{"use strict";lp();ht();m0=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await ap();return D(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=wa(e.request,"/watchdog/logs",20,200);return D(e.response,200,{ok:!0,logs:Bn(t)},e.cors.headers),!0}return!1}});var f0,h0=l(()=>{"use strict";Ox();Kx();Yx();r0();n0();i0();l0();d0();p0();g0();f0=[s0,o0,m0,c0,u0,a0,Jx,t0,Ix,qx]});var y0,S0=l(()=>{"use strict";h0();y0=async e=>{for(let t of f0)if(await t(e))return!0;return!1}});var zq,A0,b0=l(()=>{"use strict";Xi();ht();S0();zq=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:hA(e),readJsonBody:()=>gA(e)}),A0=async(e,t,r)=>{let o=e.headers.origin,n=Mu(o);try{if(o!==void 0&&o.length>0&&!n.allowed){fA(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=zq(e,t,r,n);if(await y0(s))return;D(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{D(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var P0,ko,gp,fp=l(()=>{"use strict";P0=m(require("node:http"));Pa();b0();ko=async()=>{let e=await pA(),t=P0.default.createServer((r,o)=>{A0(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},gp=ko});var w0={};bt(w0,{runAgentWitchBridgeCli:()=>$q});var $q,v0=l(()=>{"use strict";re();fp();$q=async()=>{Ue("agent-witch-bridge");let e=await ko(),t=Ut(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var _0=l(()=>{"use strict";Vt()});var Vn,WA,W0=l(()=>{"use strict";Vn=(e,t,r)=>e===1?t:r,WA=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Vn(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Vn(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${Vn(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Vn(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Vn(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${Vn(p,"year","years")} ago`}});var Co,LA,Hq,Fq,EA,xr,_a,kA,L0=l(()=>{"use strict";Co=m(require("node:fs")),LA=m(require("node:path")),Hq="local-ws-traffic.ndjson",Fq=500,EA=e=>LA.default.join(e.logsDir,Hq),xr=(e,t)=>{let r=EA(e);Co.default.mkdirSync(LA.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});Co.default.appendFileSync(r,`${o}
`,"utf8")},_a=(e,t=Fq)=>{let r=EA(e);if(!Co.default.existsSync(r))return[];let n=Co.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},kA=e=>{let t=EA(e);Co.default.existsSync(t)&&Co.default.writeFileSync(t,"","utf8")}});var Uq,E0,k0,C0=l(()=>{"use strict";iA();Uq=new Set(Object.values(nA)),E0=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),k0=e=>{if(!E0(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!Uq.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!E0(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var R0,x0=l(()=>{"use strict";R0=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var Bq,Gq,Vq,Wa,T0=l(()=>{"use strict";x0();Bq=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,Gq=e=>Bq.test(e),Vq=e=>R0(e),Wa=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>Wa(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&Gq(o)){r[o]=Vq(n);continue}r[o]=Wa(n)}return r}});var kt,CA,qq,Kq,Jq,RA,I0,O0,M0,Yq,hp,Ro,yp,xA,N0=l(()=>{"use strict";kt=m(require("node:fs")),CA=m(require("node:path"));C0();T0();qq="local-ws-trace.ndjson",Kq=1e4,Jq=1440*60*1e3,RA=e=>CA.default.join(e.logsDir,qq),I0=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},O0=e=>{if(!kt.default.existsSync(e))return;let t=kt.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-Jq,n=t.filter(s=>{let i=I0(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-Kq);kt.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},M0=(e,t)=>{let r=RA(e);kt.default.mkdirSync(CA.default.dirname(r),{recursive:!0}),kt.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),O0(r)},Yq=e=>e.parsed===null?{_empty:!0}:Wa(e.parsed),hp=(e,t,r)=>{let o=k0(r);M0(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:Yq(o)})},Ro=(e,t)=>{M0(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Wa({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},yp=(e,t=80)=>{let r=RA(e);if(O0(r),!kt.default.existsSync(r))return[];let o=kt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=I0(s);i!==null&&n.push(i)}return n.reverse()},xA=e=>{let t=RA(e);kt.default.existsSync(t)&&kt.default.writeFileSync(t,"","utf8")}});var Tr,j0,Xq,TA,Sp,D0=l(()=>{"use strict";Tr=m(require("node:fs")),j0=m(require("node:path")),Xq=256e3,TA=e=>{Tr.default.mkdirSync(j0.default.dirname(e),{recursive:!0}),Tr.default.writeFileSync(e,"","utf8")},Sp=(e,t=Xq)=>{if(!Tr.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Tr.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=Tr.default.openSync(e,"r");try{Tr.default.readSync(a,i,0,s,n)}finally{Tr.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var La=l(()=>{"use strict";L0();N0();D0()});var IA,OA,z0=l(()=>{"use strict";IA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OA=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${IA(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${IA(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${IA(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var $0=l(()=>{"use strict";z0()});var MA,NA=l(()=>{"use strict";MA=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var jA=l(()=>{"use strict";pa()});var DA,zA,H0=l(()=>{"use strict";jA();DA=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},zA=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var F0=l(()=>{"use strict";NA();H0()});var U0,Ea,$A,ka=l(()=>{"use strict";NA();U0=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ea=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=U0(e),r=U0(MA(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},$A=`(function () {
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
})();`});var xo,Zq,HA,B0=l(()=>{"use strict";xo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Zq=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},HA=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${xo(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?xo(r.direction):xo(r.kind),i=`trace-body-${o}`,a=xo(Zq(r.body));return`<tr>
        <td title="${xo(r.at)}">${xo(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${xo(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var V0,G0,FA,q0=l(()=>{"use strict";V0=m(require("node:path"));q();Vt();G0=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),FA=e=>{let t=se(e.installDir),o=`AW_HOME="$HOME/${V0.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Live</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Console cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${G0(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${G0(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var K0=l(()=>{"use strict";ka();B0();q0();ka()});var Qq,Zt,Ca=l(()=>{"use strict";Qq=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Zt=Qq});var J0,Y0,X0,Z0,Q0,eT,tT,qn=l(()=>{"use strict";J0="projects",Y0="knowledge",X0="chunks.ndjson",Z0="lessons.ndjson",Q0="error-chunks.ndjson",eT="usage-stats.json",tT="knowledge-location.json"});var Ap,eK,bp,UA=l(()=>{"use strict";Ap=m(require("node:path"));qn();eK=(e,t)=>{let r=t.trim(),o=Ap.default.join(e.installDir,J0,r,Y0);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:Ap.default.join(o,X0),memoryRunsFilePath:Ap.default.join(o,Z0)}},bp=eK});var BA,tK,rT,oT=l(()=>{"use strict";BA=m(require("node:fs"));qn();So();tK=e=>{let t=et(e.projectFolderPath),r=`${t.metaDirPath}/${tT}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};BA.default.mkdirSync(t.metaDirPath,{recursive:!0}),BA.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},rT=tK});var Kn,sT,nT,rK,iT,aT=l(()=>{"use strict";Kn=m(require("node:fs")),sT=m(require("node:path"));oo();So();UA();oT();nT=(e,t)=>{Kn.default.existsSync(e)&&(Kn.default.existsSync(t)&&Kn.default.statSync(t).size>0||(Kn.default.mkdirSync(sT.default.dirname(t),{recursive:!0}),Kn.default.copyFileSync(e,t)))},rK=e=>{let t=et(e.projectFolderPath),r=bp(e.layout,e.projectId),o=`${t.memoryDirPath}/${gn}`;nT(t.ragChunksFilePath,r.ragChunksFilePath),nT(o,r.memoryRunsFilePath),rT({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},iT=rK});var GA,oK,lT,cT=l(()=>{"use strict";GA=m(require("node:fs"));So();oK=e=>{let t=et(e);if(!GA.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(GA.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},lT=oK});var dT,nK,Jn,Pp=l(()=>{"use strict";dT=m(require("node:path"));oo();So();aT();cT();UA();nK=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=lT(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){iT({layout:e.layout,projectFolderPath:t,projectId:o});let s=bp(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=et(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:dT.default.join(n.memoryDirPath,gn),projectId:null}},Jn=nK});var wp,iK,vp,VA=l(()=>{"use strict";wp=m(require("node:fs"));qn();iK=(e,t=500)=>{if(!wp.default.existsSync(e))return;let r=wp.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);wp.default.writeFileSync(e,`${o.join(`
`)}
`)},vp=iK});var _p,aK,To,qA=l(()=>{"use strict";_p=m(require("node:path"));qn();Pp();aK=e=>{let t=Jn(e);if(t===null)return null;let r=_p.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:_p.default.join(r,eT),errorChunksFilePath:_p.default.join(r,Q0)}},To=aK});var pT,Ra,mT,uT,KA,gT,dK,JA,fT,YA,XA,ZA,QA=l(()=>{"use strict";pT=require("node:crypto"),Ra=m(require("node:fs")),mT=m(require("node:path"));Ca();qn();qA();uT=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),KA=e=>{if(!Ra.default.existsSync(e))return uT();try{let t=JSON.parse(Ra.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return uT()},gT=(e,t)=>{Ra.default.mkdirSync(mT.default.dirname(e),{recursive:!0}),Ra.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},dK=e=>{let t=Zt(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,pT.createHash)("sha256").update(o).digest("hex").slice(0,16)},JA=e=>{let t=To(e);return t===null?null:KA(t.usageStatsFilePath)},fT=e=>{if(e.chunkIds.length===0)return;let t=To(e);if(t===null)return;let r=KA(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;gT(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},YA=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=To(e);if(r===null)return null;let o=dK(t),n=KA(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return gT(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},XA=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,ZA=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var xa,hT,uK,pK,yT,mK,eb,Ta,Yn,tb,Xn,rb,ob=l(()=>{"use strict";xa=m(require("node:fs")),hT=m(require("node:path"));Ca();Pp();VA();QA();uK="http://127.0.0.1:11434",pK="nomic-embed-text",yT=(e,t,r)=>Jn({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,mK=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},eb=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},Ta=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||uK,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||pK;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},Yn=(e,t,r)=>{let o=yT(e,t,r);if(o===null||!xa.default.existsSync(o))return[];let n=xa.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},tb=async e=>{let t=Zt(e.text),r=eb(t);if(r.length===0)return 0;let o=yT(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;xa.default.mkdirSync(hT.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await Ta(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};xa.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return vp(o),n},Xn=async e=>{let t=await Ta(e.query);if(t===null)return[];let r=e.minScore??0,s=Yn(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:mK(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return fT({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},rb=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Ia,ST,gK,fK,nb,sb,ib,AT=l(()=>{"use strict";Ia=m(require("node:fs")),ST=m(require("node:path"));Ca();qA();VA();ob();gK=e=>{if(!Ia.default.existsSync(e))return[];let t=Ia.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},fK=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},nb=async e=>{let t=To(e);if(t===null)return 0;let r=Zt(e.text),o=eb(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;Ia.default.mkdirSync(ST.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await Ta(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};Ia.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return vp(n,200),s},sb=async e=>{let t=To(e);if(t===null)return[];let r=await Ta(e.query);if(r===null)return[];let o=e.minScore??.3;return gK(t.errorChunksFilePath).map(s=>({chunk:s,score:fK(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},ib=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var ab=l(()=>{"use strict";ob();QA();AT()});var lb,bT=l(()=>{"use strict";lb={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var PT=l(()=>{"use strict";bT()});var ye,cb,db=l(()=>{"use strict";PT();ye=lb,cb=`
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
  max-height: 8rem;
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
`.trim()});var hK,yK,ub,wT,pb,vT=l(()=>{"use strict";db();ka();hK=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,yK=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],ub=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wT=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${hK}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,pb=e=>{let t=yK.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=ub(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=ub(e.installBundleVersionLabel?.trim()??"unknown"),s=wT("brand brand-in-sidebar",n),i=wT("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${ub(e.title)} \xB7 Agent Witch Local</title>
  <style>${cb}</style>
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
  <script>${$A}</script>
</body>
</html>`}});var Wp,Oa,Lp=l(()=>{"use strict";Wp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Oa=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Wp(e.syncMessage)}</p>`:"",o=Wp(e.manageHref),n=Wp(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Wp(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var mb,gb,fb,_T=l(()=>{"use strict";mb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,gb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,fb=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var WT=l(()=>{"use strict";vT();Lp();_T()});var Zn,hb,LT=l(()=>{"use strict";ka();Zn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hb=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Zn(e.wakeError)}</div>`:"",a=Ea(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Zn(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${Zn(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Zn(o)}</p>
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
        <p class="home-card-meta">${Zn(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Zn(n)}</p>
      </a>
    </div>`}});var ET=l(()=>{"use strict";LT()});var Ep,kp,Cp,kT,yb=l(()=>{"use strict";Ep="support-reply",kp="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",Cp=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),kT=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Rp,CT,RT=l(()=>{"use strict";yb();Rp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),CT=()=>`<section class="card">
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
      <p>${Rp(kp)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Rp(Cp)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Rp(kT)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Rp(Ep)}">Run this sample</a>
      </div>
    </section>`});var C,Qn=l(()=>{"use strict";C=e=>e==="passed"||e==="stopped"||e==="failed"});var xT,Sb,Io,Ab,Ma=l(()=>{"use strict";xT="Stopped at the round limit. The best prompt is kept.",Sb="Stopped because the score stopped rising. The best prompt is kept.",Io="Finished. The best prompt is the result.",Ab="Wizard ended. Progress from finished steps is kept."});var Na,bb=l(()=>{"use strict";Na=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var SK,AK,ja,TT,xp=l(()=>{"use strict";SK=/\n+|;\s+/,AK=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,ja=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(SK).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,AK(s)]},[]);return[...t,...o]},[]),TT=e=>{let t=ja(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ie,es=l(()=>{"use strict";ie=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Da,Pb=l(()=>{"use strict";xp();es();Da=e=>{let t=[...e.priorRounds,e.current],r=ie(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:TT(o)}}});var wb,bK,PK,Tp,vb=l(()=>{"use strict";wb={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},bK=e=>{try{let t=JSON.parse(e.fragment);return{...wb,objects:[...e.objects,t]}}catch{return{...wb,objects:e.objects}}},PK=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:bK(r)},Tp=e=>[...e].reduce(PK,wb).objects});var wK,_b,vK,IT,Wb=l(()=>{"use strict";vb();wK=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},_b=e=>{let t=Tp(e).filter(wK),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},vK=(e,t)=>({...e,passed:e.score>=t}),IT=(e,t)=>{let r=_b(e);return r===null?null:vK(r,t)}});var Lb,Eb,Ip=l(()=>{"use strict";Lb="The judge reply needs a score and a reason.",Eb="The improver reply was empty."});var OT,MT=l(()=>{"use strict";OT=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var NT,jT=l(()=>{"use strict";NT=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var WK,DT,zT=l(()=>{"use strict";MT();jT();Ma();xp();WK=e=>{let t=ja(e);return t.length===0?Sb:`${Sb} Avoid: ${t.join("; ")}.`},DT=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:xT};if(OT(e.scores)>=3){let t=e.scores.map((r,o)=>({score:r,reasons:e.reasons?.[o]??""}));return{type:"stopped",errorMessage:WK(NT(t))}}return null}});var Ir,LK,kb,$T,Op=l(()=>{"use strict";Ir=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},LK=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,kb=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",LK(e.tokens),`Delay: ${Ir(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},$T=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var EK,HT,FT=l(()=>{"use strict";Wb();EK=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,HT=e=>{let r=(EK.exec(e)?.[1]??e).trim();return r.length===0||_b(r)!==null?null:r}});var UT,Mp,BT=l(()=>{"use strict";Op();FT();Ip();UT=e=>({type:"call",role:"judge",choice:e.choice,prompt:$T({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),Mp=e=>{let t=HT(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:Eb}}:{nextPrompt:t,continuation:UT({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var Cb,GT=l(()=>{"use strict";bb();Pb();Wb();Ip();Ma();zT();Ip();BT();Cb=e=>{let t=IT(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:Lb}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=DT({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=Da({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:Na({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var za,Rb=l(()=>{"use strict";za=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var VT=l(()=>{"use strict"});var qT=l(()=>{"use strict"});var kK,KT,JT=l(()=>{"use strict";kK=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},KT=e=>[...e].reduce(kK,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var CK,YT,XT=l(()=>{"use strict";CK=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},YT=e=>[...e].reduce(CK,{out:"",inString:!1,escaped:!1}).out});var RK,xK,ZT,QT=l(()=>{"use strict";JT();XT();RK=e=>e.charCodeAt(0)===65279?e.slice(1):e,xK=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},ZT=e=>YT(KT(xK(RK(e))))});var TK,IK,OK,eI,MK,$a,Np=l(()=>{"use strict";vb();QT();TK=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},IK=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},OK=e=>[...e].reduce(IK,{out:"",inString:!1,escaped:!1}).out,eI=e=>{let t=Tp(e);return t.length===0?null:t[t.length-1]},MK=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},$a=e=>{let t=ZT(TK(e)),r=eI(t);if(r!==null)return r;let o=OK(t),n=eI(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw MK(i)}}});var tI=l(()=>{"use strict";Ma();Np()});var rI=l(()=>{"use strict"});var oI=l(()=>{"use strict";rI()});var Tb,nI=l(()=>{"use strict";Tb=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var NK,Ib,sI=l(()=>{"use strict";Op();NK=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,Ib=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",NK(e.tokens),`Delay: ${Ir(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var jK,DK,zK,Ob,iI=l(()=>{"use strict";jK=/[A-Za-z0-9_./~-]{3,180}/g,DK=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,zK=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||DK.test(t)},Ob=(e,t=12)=>{let r=[];for(let o of e.matchAll(jK)){let n=o[0].replace(/\.+$/,"");if(!(!zK(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var Ha,aI=l(()=>{"use strict";Ha=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var jp,Mb,lI,Nb,jb=l(()=>{"use strict";jp=e=>Math.floor(e/2),Mb=e=>Math.max(jp(e)+1,e-20),lI=(e,t)=>e>=t?"passes":e>=Mb(t)?"close":e>=jp(t)?"weak":"bad",Nb=e=>[{band:"bad",label:`0\u2013${jp(e)-1} bad`},{band:"weak",label:`${jp(e)}\u2013${Mb(e)-1} weak`},{band:"close",label:`${Mb(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var Dp,Db=l(()=>{"use strict";jb();Dp=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${lI(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var Qt,zb=l(()=>{"use strict";Qt=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var cI,dI=l(()=>{"use strict";cI=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var $K,HK,uI,pI=l(()=>{"use strict";Qn();Db();zb();dI();$K=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],HK=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",uI=e=>{let t=e.wizard;if(t===void 0)return[];let r=Qt(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=$K.map((h,y)=>{let u=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:h,state:u,detail:null}}).filter((h,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=Dp(e),d=c.filter(h=>h.id==="round-0"),p=cI(t)&&(!n||a)?c.filter(h=>h.id!=="round-0"):[],g=C(e.status)&&!s,S=g?[{id:"end",label:HK(e),state:"done",detail:e.errorMessage}]:[];if(g&&S.length>0){let h=Math.min(r,i.length),y=i.slice(0,h).map(u=>({...u,state:"done"}));return[...d,...y,...S,...p]}return[...d,...i,...p,...S]}});var FK,$b,mI=l(()=>{"use strict";Qn();Db();pI();FK=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",$b=e=>{if(e.wizard!==void 0)return uI(e);let t=Dp(e),r=C(e.status)?[{id:"end",label:FK(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var Fa,gI=l(()=>{"use strict";Fa=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var fI=l(()=>{"use strict";Vt()});var hI,Ua,Ba,rs,zp,Hb,yI=l(()=>{"use strict";fI();hI="/prompt-optimizer/agent",Ua=`${Gt}${hI}`,Ba=`${Gt}/prompt-optimizer`,rs="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",zp=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${rs}`,Hb="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var er=l(()=>{"use strict"});var Fb,SI=l(()=>{"use strict";Fb="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var AI,bI=l(()=>{"use strict";AI=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Ga,wI=l(()=>{"use strict";bI();er();Ga=e=>({schemaVersion:3,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:AI(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{}})});var Ub,vI=l(()=>{"use strict";Ub=e=>({...e,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null}))})});var Bb,_I=l(()=>{"use strict";er();Bb=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var WI,Gb,LI=l(()=>{"use strict";WI=["generalize","evaluate","separate","optimize_modules"],Gb=(e,t)=>{let r=WI.indexOf(t);if(r===-1)return e;let o=WI.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var $p,Vb=l(()=>{"use strict";xp();$p=e=>{let t=ja(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var qb,EI=l(()=>{"use strict";Vb();qb=e=>{let t=$p(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var BK,GK,VK,kI,CI=l(()=>{"use strict";BK=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),GK=/^\{\{[a-zA-Z0-9_-]+\}\}$/,VK=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(BK(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},kI=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>GK.test(n)?n:VK(n,r)).join("")}});var Kb,RI=l(()=>{"use strict";CI();Kb=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:kI(o.prompt,t)}))}))});var qK,Yb,xI=l(()=>{"use strict";er();Vb();qK=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Yb=e=>{let t=$p(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=qK(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Xb,TI=l(()=>{"use strict";Rb();Xb=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return za({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Va,Zb=l(()=>{"use strict";es();Va=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ie(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var Qb,II=l(()=>{"use strict";Zb();Qb=e=>{let t=Va({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var qa,OI=l(()=>{"use strict";qa=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var KK,JK,pe,eP=l(()=>{"use strict";er();KK=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},JK=e=>e.status==="passed"&&(e.statistics?.bestScore??0)>=70,pe=e=>{let t=e.modules.map((s,i)=>({moduleId:s.moduleId,title:s.title,bestScore:s.statistics?.bestScore??null,tokens:KK(e,i),status:s.status})),r=t.length,o=t.filter((s,i)=>JK(e.modules[i])).length,n=r>0&&o===r?"passed":"stopped";return{passedModuleCount:o,totalModules:r,terminalStatusSuggestion:n,rows:t}}});var tP,MI=l(()=>{"use strict";er();eP();tP=e=>{let t=pe(e.wizard),r=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${70})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(o=>`| ${o.title.replaceAll("|","\\|")} | ${o.bestScore??"\u2014"} | ${o.tokens??"\u2014"} | ${o.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&r.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((o,n)=>{let s=o.statistics?.bestRunOutput?.trim();s===void 0||s.length===0||r.push("",`## Module ${n+1}: ${o.title}`,"","```",s,"```")}),`${r.join(`
`)}
`}});var rP,NI=l(()=>{"use strict";rP=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var St,YK,oP,jI=l(()=>{"use strict";St=m(qs());Np();YK=(0,St.isType)({name:St.isNonEmptyString,description:St.isString,sampleValue:St.isString}),oP=e=>{let t=$a(e);if(!(0,St.isType)({templatedPrompt:St.isNonEmptyString,variables:(0,St.isArrayWithEachItem)(YK)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var ae,XK,ZK,nP,DI=l(()=>{"use strict";ae=m(qs());er();Np();XK=(0,ae.isType)({id:ae.isNonEmptyString,title:ae.isNonEmptyString,prompt:ae.isNonEmptyString,order:ae.isNumber}),ZK=(0,ae.isType)({id:ae.isNonEmptyString,title:ae.isNonEmptyString,summary:ae.isString,topology:(0,ae.isOneOf)("chain","parallel"),modules:(0,ae.isArrayWithEachItem)(XK),recommended:ae.isBoolean}),nP=e=>{let t=$a(e);if(!(0,ae.isType)({options:(0,ae.isArrayWithEachItem)(ZK)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var os,zI=l(()=>{"use strict";os=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var QK,Ka,sP=l(()=>{"use strict";QK=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ka=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(QK,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Oo,ns,$I=l(()=>{"use strict";es();sP();Oo=e=>Ka(e.templatedPrompt,e.variables),ns=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ie(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Oo(e.wizard)}});var e8,Ja,HI=l(()=>{"use strict";e8=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ja=(e,t)=>e.replace(e8,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var t8,Mo,Hp=l(()=>{"use strict";t8=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Mo=e=>{let t=new Set,r=[];for(let o of e.matchAll(t8)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Ya,FI=l(()=>{"use strict";Hp();Ya=e=>e.variables.length>0||Mo(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var iP,aP=l(()=>{"use strict";er();iP=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Xa,UI=l(()=>{"use strict";es();aP();Xa=e=>{let t=e.wizard.evaluateSelectedRound??ie(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:iP(r.judgement)}});var Za,BI=l(()=>{"use strict";Za=e=>e.length===1&&e[0].modules.length===1});var lP,GI=l(()=>{"use strict";lP=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Se,Fp,Qa=l(()=>{"use strict";Se=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),Fp=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var VI,qI=l(()=>{"use strict";Qa();VI=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Se("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Se("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Se("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var KI,JI=l(()=>{"use strict";Qn();Qa();KI=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!C(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Se("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),Se("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Se("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",Fp(e.writerLabel,e.folder)),Se("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Se("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var YI,XI=l(()=>{"use strict";Qa();YI=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Se("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Se("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Se("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var ZI,QI=l(()=>{"use strict";Qa();ZI=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Se("awl","Connected on this Mac (Agent Witch Live)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Se("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",Fp(e.writerLabel,e.folder)),...r?[Se("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var Up,eO=l(()=>{"use strict";Qn();qI();JI();XI();QI();Up=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(C(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return KI(r);case"evaluate":return VI({...r,currentRound:e.currentRound});case"separate":return ZI(r);case"optimize_modules":return YI({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var el,No,tO=l(()=>{"use strict";el=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),No=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var r8,Bp,cP,rO=l(()=>{"use strict";Hp();r8="wizardParam_",Bp=e=>`${r8}${e}`,cP=e=>{let t=Mo(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=Bp(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var jo,oO=l(()=>{"use strict";jo=["generalize","evaluate","separate","optimize_modules"]});var R=l(()=>{"use strict";Qn();Ma();GT();bb();Op();Rb();VT();qT();tI();oI();nI();sI();iI();Pb();aI();es();mI();zb();jb();gI();yI();er();SI();wI();vI();_I();LI();EI();RI();xI();TI();Zb();II();OI();eP();MI();NI();jI();DI();zI();$I();sP();HI();Hp();FI();UI();BI();aP();GI();eO();tO();rO();oO()});var dP,Gp,o8,aO,lO=l(()=>{"use strict";dP=m(require("node:fs")),Gp=m(require("node:path")),o8=e=>Gp.default.join(Gp.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),aO=(e,t)=>{let r=o8(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;dP.default.mkdirSync(Gp.default.dirname(r),{recursive:!0}),dP.default.appendFileSync(r,o,"utf8")}});var ss,cO,n8,dO,s8,uO,Ct,J,pO,F,qe=l(()=>{"use strict";ss=m(require("node:fs")),cO=m(require("node:path"));R();lO();n8=e=>e.wizard===void 0?e:{...e,wizard:Ub(e.wizard)},dO=new Set,s8=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),uO=(e,t)=>{ss.default.mkdirSync(cO.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;ss.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),ss.default.renameSync(r,e)},Ct=e=>{if(!ss.default.existsSync(e))return[];try{let t=JSON.parse(ss.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(s8).map(n8):[]}catch{return[]}},J=(e,t)=>Ct(e).find(r=>r.id===t)??null,pO=(e,t)=>{dO.add(t);let r=Ct(e).filter(o=>o.id!==t);uO(e,r)},F=(e,t)=>{if(dO.has(t.id))return;let r=Ct(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];uO(e,o),aO(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var mO,Vp,uP,zo,pP,Ke,$o,me,Je=l(()=>{"use strict";mO=m(require("node:fs")),Vp=m(require("node:os")),uP=m(require("node:path"));ft();zo="~",pP=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Ke=e=>{let t=Vp.default.homedir(),r=pP(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},$o=e=>{let t=e.trim().length===0?"~":e.trim(),r=Qe(t),o=uP.default.isAbsolute(r)?pP(r):pP(uP.default.resolve(Vp.default.homedir(),r));try{if(!mO.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:Ke(o)}},me=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Vp.default.homedir()});var tl=l(()=>{"use strict";pt();va();Vd()});var i8,gO,fO=l(()=>{"use strict";tl();i8=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,gO=e=>{let t=Ln(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(i8)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var a8,l8,hO,qp,yO,c8,tt,SO,AO,bO,Or=l(()=>{"use strict";tl();fO();a8="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",l8="The writer waited on terminal input and did not return a prompt.",hO=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,qp=e=>{let t=e.trim();if(t.length===0||t.length>=500||!hO.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>hO.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},yO=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},c8=e=>qp(e.stdout)??qp(e.stderr)??(yO(e.replyFile)?qp(e.replyFile):null),tt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return a8;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?l8:null},SO=e=>{let t=e.trim();return t.length===0?null:tt(t)!==null?t:qp(t)??(yO(t)?t:null)},AO=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],bO=e=>{let t=e.replyFileText?.trim()??"",r=tt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=c8({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null)return{ok:!1,errorMessage:o};let n=gO([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Ln(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply."}}});var is,Rt,rl,PO,Kp,d8,wO,vO,_O,mP=l(()=>{"use strict";is=m(require("node:fs")),Rt=m(require("node:path")),rl=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},PO=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Kp=(e,t)=>{let r=rl(e);return r.length>0?r:rl(t)},d8=e=>{let t=Kp(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${PO(o)}`,...n.length>0?[`description: ${PO(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},wO=e=>`.cursor/skills/${e}/SKILL.md`,vO=(e,t)=>{let r=rl(t);if(r.length===0)return!1;let o=Rt.default.resolve(e),n=Rt.default.resolve(o,".cursor","skills"),s=Rt.default.resolve(o,wO(r));return s.startsWith(`${n}${Rt.default.sep}`)?is.default.existsSync(s):!1},_O=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Kp(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Rt.default.resolve(e.workingDirectory);try{if(!is.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=d8({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=wO(r.slug),n=Rt.default.resolve(t,".cursor","skills"),s=Rt.default.resolve(t,o);if(!s.startsWith(`${n}${Rt.default.sep}`))return{ok:!1,errorCode:"path"};if(is.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{is.default.mkdirSync(Rt.default.dirname(s),{recursive:!0}),is.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var u8,WO,LO,EO=l(()=>{"use strict";R();R();qe();Je();Or();mP();u8=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,WO=e=>{let t=e.get("savedSkill");return t!==null&&u8.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},LO=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=J(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!C(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ie(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||tt(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=_O({workingDirectory:me(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var Mr,ol=l(()=>{"use strict";R();Mr=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=lP(t);return{...e,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:el(r.variables)},updatedAt:new Date().toISOString()}}});var Nr,nl=l(()=>{"use strict";Nr=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var T,p8,Jp,oe,Ho,CO,kO,RO,xO,xe=l(()=>{"use strict";T="manual",p8=["claude-cli","codex","cursor","antigravity"],Jp={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},oe=e=>e===T?"You":e in Jp?Jp[e]:e,Ho=e=>p8.filter(t=>e.includes(t)),CO=e=>{let t=Ho(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},kO=(e,t)=>t===T?T:e.find(r=>r===t)??null,RO=(e,t,r)=>{let o=Ho(e),n=kO(o,t),s=kO(o,r);return n===null||s===null?null:{judge:n,improver:s}},xO=(e,t,r)=>{let o=Ho(e);return t===null||t.trim()===""?r!==T?r:o[0]??null:t===T?null:o.find(n=>n===t)??null}});var gP,TO,IO=l(()=>{"use strict";gP={ok:!1,errorMessage:"Stopped.",stopped:!0},TO=(e,t,r)=>{if(t===void 0)return;let o=()=>{e.kill("SIGTERM"),r(gP)};if(t.aborted){o();return}t.addEventListener("abort",o,{once:!0})}});var OO,sl,MO,fP,m8,g8,f8,rt,il=l(()=>{"use strict";OO=require("node:child_process"),sl=m(require("node:fs")),MO=m(require("node:os")),fP=m(require("node:path"));tl();IO();Or();m8=["claude-cli","codex","cursor","antigravity"],g8=18e4,f8=e=>m8.includes(e),rt=e=>new Promise(t=>{if(e.signal?.aborted){t(gP);return}if(!f8(e.writerAgent)){t({ok:!1,errorMessage:"The writer did not reply."});return}let r=e.writerAgent,o=Wt(r,e.prompt,de({}));if(o===null){t({ok:!1,errorMessage:"The writer did not reply."});return}if(!sl.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=fP.default.join(sl.default.mkdtempSync(fP.default.join(MO.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),s=AO({writerAgent:r,baseArgs:o.args,replyPath:n}),i=[],a=[],c={settled:!1,timer:void 0},d=(0,OO.spawn)(o.command,[...s],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),p=g=>{c.settled||(c.settled=!0,clearTimeout(c.timer),t(g))};TO(d,e.signal,p),c.timer=setTimeout(()=>{d.kill("SIGTERM"),p({ok:!1,errorMessage:"The writer did not reply."})},e.timeoutMs??g8),d.stdout.on("data",g=>{i.push(Buffer.from(g))}),d.stderr.on("data",g=>{a.push(Buffer.from(g))}),d.on("error",()=>p({ok:!1,errorMessage:"The writer did not reply."})),d.on("close",()=>{let g=sl.default.existsSync(n)?sl.default.readFileSync(n,"utf8"):null;p(bO({writerAgent:r,stdout:Buffer.concat(i).toString("utf8"),stderr:Buffer.concat(a).toString("utf8"),replyFileText:g}))})})});var NO,h8,al,Yp,Xp=l(()=>{"use strict";R();xe();NO=e=>e===T?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},h8=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),al=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=Cb({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:NO(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:Ha(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=h8(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i}},Yp=(e,t,r=null)=>{let o=Mp({raw:t,judge:NO(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Zp,hP=l(()=>{"use strict";Zp=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var zO,Qp,em,jO,DO,yP,y8,$O,SP,S8,HO,A8,b8,FO,UO=l(()=>{"use strict";zO=require("node:child_process"),Qp=m(require("node:fs")),em=m(require("node:path"));R();jO=4e3,DO=12e3,yP=(e,t)=>{let r=(0,zO.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},y8=e=>yP(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",$O=e=>{let t=yP(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},SP=(e,t)=>{let r=em.default.resolve(e,t),o=em.default.relative(e,r);if(o.startsWith("..")||em.default.isAbsolute(o)||!Qp.default.existsSync(r)||!Qp.default.statSync(r).isFile())return null;let n=Qp.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>jO?`${n.slice(0,jO)}
\u2026truncated`:n},S8=e=>e.length>DO?`${e.slice(0,DO)}
\u2026truncated`:e,HO=e=>{let t=Ob(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,SP(e.workingDirectory,n)])),o=y8(e.workingDirectory);return{git:o,status:o?$O(e.workingDirectory):{},files:r,paths:t}},A8=(e,t)=>{let r=yP(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=SP(e,t);return o===null?`${t} is missing.`:o},b8=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",FO=e=>{let t=e.before.git?$O(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=SP(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>A8(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:b8(e.before.git,e.before.paths.length>0),evidence:S8(i.join(`

`))}}});var PP,U,wP,_e,BO,P8,w8,GO,as,VO,ls,v8,_8,ll,AP,bP,W8,qO,L8,E8,k8,KO,C8,JO,YO,R8,x8,XO,ZO=l(()=>{"use strict";PP=require("node:child_process"),U=m(require("node:fs")),wP=m(require("node:os")),_e=m(require("node:path")),BO=8e6,P8=16e6,w8=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],GO=(e,t)=>{let r=(0,PP.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},as=(e,t)=>(0,PP.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,VO=e=>{let t=GO(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},ls=(e,t)=>{let r=_e.default.resolve(e,t),o=_e.default.relative(e,r);return o.startsWith("..")||_e.default.isAbsolute(o)?null:r},v8=(e,t)=>{let r=ls(e,t);if(r===null||!U.default.existsSync(r))return null;let o=U.default.statSync(r);return!o.isFile()||o.size>BO?null:U.default.readFileSync(r)},_8=(e,t,r)=>{let o=ls(e,t);o!==null&&(U.default.mkdirSync(_e.default.dirname(o),{recursive:!0}),U.default.writeFileSync(o,r))},ll=(e,t)=>{let r=ls(e,t);r===null||!U.default.existsSync(r)||U.default.rmSync(r,{recursive:!0,force:!0})},AP=(e,t)=>as(e,["cat-file","-e",`HEAD:${t}`]),bP=e=>{let t=GO(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},W8=e=>_e.default.resolve(e)!==_e.default.resolve(wP.default.homedir()),qO=e=>{if(!U.default.existsSync(e))return 0;let t=U.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?U.default.readdirSync(e).reduce((r,o)=>r+qO(_e.default.join(e,o)),0):0},L8=(e,t,r)=>{let o=ls(e,r);if(o===null||!U.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(qO(o)>P8)return{relativePath:r,existed:!0,copyDir:null};let n=_e.default.join(t,"cache",r);return U.default.mkdirSync(_e.default.dirname(n),{recursive:!0}),U.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},E8=400,k8=32e6,KO=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!U.default.existsSync(s)))for(let i of U.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=_e.default.join(s,i),c=U.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>BO)){if(t.length>=E8||r+c.size>k8){o=!1;return}r+=c.size,t.push(_e.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},C8=(e,t,r)=>{let o=ls(e,r);if(o===null||!U.default.existsSync(o))return null;let n=v8(e,r);if(n===null)return"skip";let s=_e.default.join(t,"files",r);return U.default.mkdirSync(_e.default.dirname(s),{recursive:!0}),U.default.writeFileSync(s,n),s},JO=e=>{let t=U.default.mkdtempSync(_e.default.join(wP.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?VO(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:KO(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,C8(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?bP(e.workingDirectory):null,isolateCaches:W8(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:w8.map(i=>L8(e.workingDirectory,t,i))}},YO=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){ll(e.workingDirectory,t);return}_8(e.workingDirectory,t,U.default.readFileSync(r))}},R8=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?YO(e,t):AP(e.workingDirectory,t)?as(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):ll(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&AP(e.workingDirectory,t)&&as(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!AP(e.workingDirectory,t)&&as(e.workingDirectory,["reset","-q","HEAD","--",t])},x8=(e,t)=>{let r=ls(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){ll(e.workingDirectory,t.relativePath),U.default.mkdirSync(_e.default.dirname(r),{recursive:!0}),U.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){ll(e.workingDirectory,t.relativePath);return}if(U.default.existsSync(r))for(let o of U.default.readdirSync(r)){let n=_e.default.join(r,o);U.default.statSync(n).mtimeMs>=e.startedMs-1e3&&U.default.rmSync(n,{recursive:!0,force:!0})}}}},XO=e=>{try{if(e.git){if(bP(e.workingDirectory)!==e.head&&(!(e.head===null?as(e.workingDirectory,["update-ref","-d","HEAD"]):as(e.workingDirectory,["reset","--hard",e.head]))||bP(e.workingDirectory)!==e.head))throw new Error("head");let r=VO(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))R8(e,o)}else{if(e.complete)for(let t of KO(e.workingDirectory).paths)e.files[t]===void 0&&ll(e.workingDirectory,t);for(let t of Object.keys(e.files))YO(e,t)}for(let t of e.caches)x8(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{U.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var tm,rm,T8,I8,O8,M8,N8,QO,j8,eM,tM=l(()=>{"use strict";R();Xp();hP();UO();ZO();xe();Je();il();tm=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),rm=e=>({...e,status:"stopped",errorMessage:Io,judgePhase:void 0,updatedAt:new Date().toISOString()}),T8=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),I8=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==T?t:e.improverModel!==T?e.improverModel:null}return e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null},O8=async e=>{let t=me(e.cycle),r=HO({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=JO({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Xb({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:qa(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):za({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=await rt({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal}),a=i.ok?FO({workingDirectory:t,before:r,writerReply:i.text}):null,c=XO(o);return i.ok?!c.ok||a===null?{ok:!1,cycle:tm(e.cycle,c.ok?"Could not put the folder back after the run.":c.errorMessage)}:{ok:!0,run:{output:i.text.trim(),tokens:i.tokens,delayMs:Date.now()-n,lookedAt:a.lookedAt,evidence:a.evidence}}:i.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:rm(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:tm(e.cycle,i.errorMessage)})},M8=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:O8({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),N8=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),QO=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await rt({writerAgent:e.reviewer,workingDirectory:me(e.cycle),prompt:Ib({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:rm(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},j8=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===T)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await rt({writerAgent:t.judgeModel,workingDirectory:me(t),prompt:Tb({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...al(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?rm(o):(e.onWriterFailure?.(t.judgeModel),tm(o,n.errorMessage))},eM=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return j8(e);let o=I8(t),n=await M8({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?T8(t,n.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===T){let p=await QO({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...N8(s,p.text),judgePhase:void 0}}let i=await rt({writerAgent:t.judgeModel,workingDirectory:me(t),prompt:kb({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?rm(s):(e.onWriterFailure?.(t.judgeModel),tm(s,i.errorMessage));let a=await QO({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=al(s,i.text,c);return Zp(d,a.text)}});var om,vP=l(()=>{"use strict";R();om=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Da({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:Ha(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var nm,D8,z8,_P,rM=l(()=>{"use strict";R();Xp();tM();vP();xe();Je();il();nm=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),D8=e=>({...e,status:"stopped",errorMessage:Io,updatedAt:new Date().toISOString()}),z8=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?D8(e):(n?.(r),nm(e,t.errorMessage)),_P=async(e,t,r,o)=>{let n=e.revisions.find(c=>c.roundNumber===e.currentRound);if(n===void 0)return nm(e,"This round has no prompt.");if(e.status==="judging")return eM({cycle:e,revision:n,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return nm(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===T)return e;let s=om(e);if(s===null)return nm(e,"The improver needs the score and the reason.");let i=await rt({writerAgent:e.improverModel,workingDirectory:me(e),prompt:Na({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r}),a=z8(e,i,e.improverModel,r,t);return a!==null?a:Yp(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var cl,WP=l(()=>{"use strict";cl=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var am,sm,oM,$8,H8,im,nM,sM,F8,U8,Fo,iM,aM,dl=l(()=>{"use strict";R();ol();nl();xe();Je();il();rM();WP();am=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),sm=(e,t,r)=>e.wizard===void 0||t===null?am(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},oM=e=>{let t=e.wizard;return t===void 0||cl(e).length===0?e:{...e,wizard:os({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},$8=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",H8=e=>{let t=e.wizard;if(t===void 0)return e;let r=Va({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:os({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},im=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),nM=e=>e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null,sM=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},F8=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=nM(e);if(n===null)return am(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Oo(o),i=qb({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:sM(e,"generalize")}),a=await rt({writerAgent:n,prompt:i,workingDirectory:me(e),signal:t});if(!a.ok)return r?.(n),sm(e,"generalize",a.errorMessage);try{let c=oP(a.text),d=os({wizard:{...o,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:el(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return Ya(d)?Fo({...p,wizard:{...d,gate:null}}):im(p,"generalize")}catch(c){return sm(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},U8=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=nM(e);if(n===null)return am(e,"Choose a writer to suggest splits.");let s=ns({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Yb({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:sM(e,"separate")}),a=await rt({writerAgent:n,prompt:i,workingDirectory:me(e),signal:t});if(!a.ok)return r?.(n),sm(e,"separate",a.errorMessage);try{let c=nP(a.text),d=Kb(c,o.variables),p=os({wizard:{...o,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),g={...e,wizard:p};return Za(d)?Mr(g,d[0]):im(g,"separate")}catch(c){return sm(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},Fo=e=>{let t=e.wizard;if(t===void 0)return e;let r=Oo(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:70,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},iM=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return am(e,"This module is missing.");let n=No(r),s=Ja(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==T?e.runnerModel:e.judgeModel!==T?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:70,maxRounds:1,errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},aM=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return _P(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return F8(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return U8(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await _P(e,t,r,o);if(C(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&cl(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let g=ie(s.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??0,reasons:S.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:g}}}if(i==="evaluate"&&Xa({revisions:a.revisions,wizard:a.wizard})){let p=oM(im(a,i));return Nr(p)}let c=im(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=Qb({wizard:{...c.wizard,modules:c.wizard.modules.map((g,S)=>S===c.wizard.currentModuleIndex&&g.status==="running"?{...g,status:"paused"}:g)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:$8(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?oM(d):H8(d)}return s}return n.phase==="complete",e}});var B8,lM,cM,cs,lm=l(()=>{"use strict";Or();B8=400,lM=(e,t=B8)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},cM=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:SO(e.promptText)},cs=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t===void 0?null:cM(t);if(r!==null)return lM(r);for(let o=e.revisions.length-1;o>=0;o-=1){let n=cM(e.revisions[o]);if(n!==null)return lM(n)}return null}});var ds,cm=l(()=>{"use strict";ds='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var LP,dM,G8,uM,pM,EP=l(()=>{"use strict";R();xe();Je();cm();LP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dM=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',G8=e=>{let t=dM(e.state),r=`<h2>${LP(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${LP(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${ds}</button></div><template>${r}</template></li>`},uM=e=>{let t=e.wizard;if(t===void 0)return"";let r=Up({status:e.status,wizard:t,writerLabel:oe(e.judgeModel),runnerLabel:oe(e.runnerModel??e.judgeModel),folderDisplay:Ke(me(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(G8).join("")}</ol>`},pM=e=>{let t=e.wizard;if(t===void 0)return"";let r=Up({status:e.status,wizard:t,writerLabel:oe(e.judgeModel),runnerLabel:oe(e.runnerModel??e.judgeModel),folderDisplay:Ke(me(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${dM(n.state)}<span class="sdlc-pipeline-label">${LP(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var dm,us,kP=l(()=>{"use strict";WP();dm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),us=e=>{let t=cl(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${dm(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,p=e.cycle.revisions.map(g=>{let S=g.judgement?.score,h=S==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${S}`,y=g.judgement?.reasons?.trim()??"",u=y.length===0?"":`<br><span class="muted">${dm(y)}</span>`;if(e.interactive){let A=e.selectedRound===g.roundNumber?" checked":"";return`<li><label><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${A}> ${dm(h)}</label>${u}</li>`}return`<li>${dm(h)}${u}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var CP,mM,um,gM,pm=l(()=>{"use strict";CP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mM=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${CP(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${CP(t.prompt)}</pre></li>`).join("")}</ol>`,um=e=>mM([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),gM=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${CP(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${mM(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var Q,V8,q8,K8,J8,mm,Y8,X8,Z8,Q8,e3,t3,ps,gm=l(()=>{"use strict";R();EP();kP();pm();Q=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),V8={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},q8=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Q(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Q(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Q(o)}</pre></details>`;return`<h2>${Q(e)}</h2>${n}`},K8=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=Oo(t).trim(),n=ns({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!C(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${q8("What is being evaluated",i)}`},J8=(e,t)=>{let r=e.wizard;if(r===void 0||C(e.status))return"";let o=V8[t];return o===void 0||r.phase!==o?"":pM(e)},mm=(e,t,r)=>{let o=J8(e,t),n=t==="wizard-2"?K8(e):"";return`${o}${n}${r}`},Y8=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},X8=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.variables.length===0?'<p class="muted">No variables yet.</p>':`<ul class="sdlc-wizard-vars">${t.variables.map(a=>`<li><strong>{{${Q(a.name)}}}</strong> \u2014 ${Q(a.description)} (sample: ${Q(a.sampleValue)})</li>`).join("")}</ul>`,o=t.templatedPrompt.trim(),n=o.length===0?'<p class="muted">No templated prompt yet.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${Q(o)}</pre>`,s=Ka(t.templatedPrompt,t.variables).trim(),i=s.length===0||s===o?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${Q(s)}</pre>`;return`${r}${n}${i}`},Z8=(e,t)=>`<ul class="sdlc-wizard-revisions">${e.map(o=>{let n=o.score===null?`Round ${o.roundNumber} \u2014 not scored`:`Round ${o.roundNumber} \u2014 ${o.score}`,s=t===o.roundNumber?" (selected)":"",i=o.reasons?.trim()??"",a=i.length===0?"":`<br><span class="muted">${Q(i)}</span>`;return`<li>${Q(n)}${s}${a}</li>`}).join("")}</ul>`,Q8=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return us({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=Y8(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${Z8(o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=ns({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Q(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Q(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},e3=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Q(n.title)}</strong> <span class="muted">(${Q(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Q(o.title)}</strong>${n}${Q(s)}<br><span class="muted">${Q(o.summary)} (${Q(o.topology)})</span>${um(o)}</li>`}).join("")}</ul>`},t3=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Q(i)}</span> <strong>${Q(n.title)}</strong>${Q(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Q(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?us({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},ps=(e,t)=>{switch(t){case"wizard-1":return mm(e,t,X8(e));case"wizard-2":return mm(e,t,Q8(e));case"wizard-3":return mm(e,t,e3(e));case"wizard-4":return mm(e,t,t3(e));default:return""}}});var r3,o3,fM,hM,yM=l(()=>{"use strict";R();lm();Or();gm();r3=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},o3=e=>{let t=e.goal.trim();return t.length===0?null:t},fM=(e,t,r,o,n)=>{let s=tt(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},hM=(e,t)=>{let r=o3(e);if(t.id.startsWith("wizard-")){let s=ps(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=Fa(e,t);if(s!==null){let a=cs(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ie(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:fM(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:r3(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:fM(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var Uo,SM,AM=l(()=>{"use strict";Uo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SM=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${Uo(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Uo(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${Uo(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${Uo(n)}</h2><pre class="mono">${Uo(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${Uo(e.goal)}</dd></div></dl>`;return`<h2>${Uo(e.title)}</h2>${i}${t}${r}${o}${s}`}});var RP,bM,PM,ms,wM,ul=l(()=>{"use strict";R();qe();RP=new Map,bM=e=>{let t=new AbortController;return RP.set(e,t),t.signal},PM=e=>{RP.delete(e)},ms=e=>{RP.get(e)?.abort()},wM=(e,t)=>{let r=J(e,t);return r===null||r.wizard!==void 0?!1:(C(r.status)||(F(e,{...r,status:"stopped",errorMessage:Io,updatedAt:new Date().toISOString()}),ms(t)),!0)}});var n3,s3,xP,i3,a3,l3,vM,_M,TP=l(()=>{"use strict";R();dl();ol();nl();ul();n3=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),s3=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||C(e.status))return null;let r=Qt(t);return r<0||r>3?null:`wizard-${r+1}`},xP=(e,t)=>n3.has(t)?s3(e)===t:!1,i3=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),a3=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ie(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},l3=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null,phase:"complete"},n=pe(o);return{...e,status:n.terminalStatusSuggestion,errorMessage:null,wizard:o,updatedAt:new Date().toISOString()}},vM=(e,t)=>{if(!xP(e,t))return e;ms(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return Fo({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return Nr(a3(r));if(t==="wizard-3"){let n=o.splitOptions[0]??i3(o.templatedPrompt);return Mr(r,n)}return t==="wizard-4"?l3(r):e},_M="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var Bo,gs,pl=l(()=>{"use strict";Bo=e=>e.toLocaleString("en-US"),gs=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var xt,c3,WM,LM,EM,kM,IP=l(()=>{"use strict";R();yM();AM();TP();cm();lm();EP();pl();xt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),c3=(e,t)=>{let r=Fa(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?gs(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${Bo(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${xt(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${xt(r)}</span>`:"",d=SM(hM(t,e)),p=t.wizard!==void 0&&t.wizard.phase==="complete"&&C(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${xt(e.id)}"`:"",g=xP(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${xt(_M)}"><input type="hidden" name="cycleId" value="${xt(t.id)}"><input type="hidden" name="wizardStepId" value="${xt(e.id)}"><button class="btn btn-secondary sdlc-node-skip-btn" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",S=e.state==="active"&&e.id.startsWith("wizard-")?uM(t):"",h=o?"failed":e.state,y=o?cs(t):null,u=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${ds}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${xt(y)}</pre></template>`:"";return`<li class="sdlc-node sdlc-node-${h}" data-sdlc-step-id="${xt(e.id)}"${e.state==="active"&&e.id.startsWith("wizard-")?' id="prompt-optimizer-wizard-active-step"':""}><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${p} data-sdlc-node>${n}<span class="sdlc-node-label">${xt(e.label)}${c}${a}</span></button>${u}${g}</div>${S}<template>${d}</template></li>`},WM=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>c3(r,t)).join("")}</ol>`,LM=e=>`<div class="sdlc-score" aria-label="What the score means">${Nb(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${xt(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,EM='<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog"><button class="btn btn-secondary" type="submit">Close</button></form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>',kM=`<script>
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
</script>`});var jr,CM,d3,RM=l(()=>{"use strict";R();Je();Or();mP();jr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),CM=e=>{if(!C(e.status))return"";let t=ie(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=tt(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${jr(t.reasons.trim())}</p>`,i=n===null?d3({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:me(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${jr(n)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${o}${s}${i}</section>`},d3=e=>{let t=e.sourceSkill?.fileName??rl(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=Kp(t,r),s=n.length>0&&vO(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${jr(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${jr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${jr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${jr(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${jr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${jr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var xM,u3,fm,$e,hm,OP=l(()=>{"use strict";R();R();xe();lm();Or();xM=["Generalize","Evaluate","Separate","Optimize modules"],u3=e=>{let t=Qt(e),r=t>=0&&t<xM.length?xM[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},fm=(e,t)=>({...t,replyPreview:cs(e)}),$e=(e,t)=>({title:e,detail:t,replyPreview:null}),hm=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:null}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!C(e.status)){let t=e.judgeModel;return $e(`${oe(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!C(e.status)){let t=e.judgeModel;return $e(`${oe(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===T?$e(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?$e(`${oe(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):$e(`${oe(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===T){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==T?$e(`${oe(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):$e(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return $e(`${oe(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length;return $e(`${oe(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${70}). This panel keeps updating.`)}return $e(`${oe(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length;return $e(`${oe(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${70}). This panel keeps updating.`)}return $e(`${oe(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===T){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return $e("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return $e(`${oe(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>tt(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=pe(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||C(e.status));return{title:i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",detail:r.length>0?r:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?fm(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o="A writer or judge reply could not be used. Start a new run after fixing the issue.";return r!==void 0?fm(e,{title:u3(r),detail:t.length>0?t:o}):fm(e,{title:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(C(e.status)){let t=e.errorMessage?.trim()??"";return fm(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var Tt,ml=l(()=>{"use strict";xe();Tt=e=>{if(e.status==="improving"&&e.improverModel===T)return!0;if(e.status!=="judging"||e.judgeModel!==T)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===T}});var TM,IM=l(()=>{"use strict";TM=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Dr,p3,OM,MM=l(()=>{"use strict";R();Dr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p3=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Dr(r)}</p>`},OM=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Dr(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${Dr(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Dr(a)}.</p>`}<pre class="mono">${Dr(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Ir(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Dr(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",g=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Dr(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${p3(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Dr(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var gl,m3,NM,jM=l(()=>{"use strict";R();Or();gl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),m3=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=tt(t.promptText),n=t.judgement?.reasons?`<p class="muted">${gl(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${gl(i)}.</p>`}<pre class="mono">${gl(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Ir(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${gl(d)}</pre>`:`<div class="alert-error">${gl(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},NM=e=>e.revisions.map(t=>m3(e,t)).join("")});var DM,zM=l(()=>{"use strict";R();DM=e=>{if(C(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var It,g3,MP,f3,h3,y3,S3,$M,HM,NP=l(()=>{"use strict";zM();It=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),g3="Stop this run? Writers will stop and the best prompt is kept.",MP="End the wizard? Writers will stop and progress from finished steps is kept.",f3="Skip this module and pause at the step gate?",h3=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${It(g3)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${It(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,y3=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${It(MP)}"><input type="hidden" name="cycleId" value="${It(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,S3=e=>{let t=It(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${It(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${It(f3)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${It(MP)}">End wizard</button>
    </form>
  </div>`},$M=e=>{let t=DM(e);return t==="none"?"":t==="classic"?h3(e.id):t==="wizard_end_only"?y3(e.id):S3(e)},HM=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=It(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${It(MP)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var FM,UM=l(()=>{"use strict";R();pl();FM=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=pe(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${Bo(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${Bo(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${70}`}return""}});var A3,BM,GM=l(()=>{"use strict";R();A3=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},BM=(e,t)=>{let r=e.wizard,o=A3(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=Qt(r);return o<n?"done":o===n&&C(e.status)&&e.status==="failed"?"failed":o<=n&&C(e.status)?"done":"pending"}});var b3,P3,VM,w3,qM,KM=l(()=>{"use strict";R();UM();GM();gm();b3=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',P3=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',VM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),w3=(e,t,r)=>{let o=ps(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=FM(e,t),i=BM(e,t),a=b3(i),c=P3(i),d=`${a}<span class="sdlc-wizard-outcome-step-title">${VM(n)}</span>${c}<span class="muted sdlc-wizard-outcome-step-hint">${VM(s)}</span>`,p=t==="wizard-4"&&r.phase==="complete"?" open":"",g=i==="failed"&&t!=="wizard-4"?" open":"",S=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${S}"${p}${g}><summary aria-controls="${S}-body">${d}</summary><div class="sdlc-wizard-outcome-step-body" id="${S}-body">${o}</div></details>`},qM=e=>{let t=e.wizard;if(t===void 0||!C(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>w3(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var JM,YM,XM=l(()=>{"use strict";JM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),YM=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${JM(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${JM(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var jP,ZM,DP=l(()=>{"use strict";R();jP=e=>e.status==="passed"&&(e.statistics?.bestScore??0)>=70,ZM=e=>{if(jP(e))return"Passed";let t=e.statistics?.bestScore;return t!=null&&t<70?`Below pass (${t})`:e.status}});var QM,eN=l(()=>{"use strict";R();QM=e=>{if(e.terminalStatusSuggestion==="passed")return"";let t=e.rows.filter(r=>r.bestScore!==null&&r.bestScore<70).length;return t>0&&t===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${t} module${t===1?"":"s"} scored below ${70}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${70}.`}});var ym,tN,rN=l(()=>{"use strict";R();DP();DP();eN();ym=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tN=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=pe(t),o=r.terminalStatusSuggestion==="passed"?"":QM(r),n=60,s=r.rows.map((a,c)=>{let d=t.modules[c],p=a.bestScore===null?"\u2014":`${a.bestScore} / \u2265${70}`,S=a.bestScore!==null&&a.bestScore>=n&&a.bestScore<70?' class="sdlc-score-near-pass"':"",h=d===void 0?a.status:ZM(d),y=d!==void 0&&jP(d)?'<span aria-label="Passed">\u2713</span>':ym(h);return`<tr${S}><td>${ym(a.title)}</td><td>${ym(p)}</td><td>${a.tokens??"\u2014"}</td><td>${y}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${o.length===0?"":`<p class="muted">${ym(o)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${s}</tbody></table></div>`}});var v3,oN,nN=l(()=>{"use strict";R();R();XM();rN();v3=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oN=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!C(e.status)||t.modules.length===0)return"";let r=tN(e),o=YM(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=pe(t),i=s.passedModuleCount<s.totalModules?" open":"";return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${v3(n)}</pre></details>`}${r}${o}</section>`}});var tr,fl=l(()=>{"use strict";tr=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var rr,Sm,zP=l(()=>{"use strict";R();IP();RM();OP();ml();IM();vP();MM();jM();NP();KM();nN();pl();Je();fl();rr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Sm=e=>{let t=!C(e.status)&&e.status!=="wizard_paused"&&!Tt(e),r=hm(e),o=WM($b(TM(e)),e),n=C(e.status)?"":$M(e),s=qM(e),i=oN(e),a=CM(e),c=e.errorMessage===null?"":`<div class="alert-error">${rr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?pe(e.wizard):null,S=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,h=!t&&e.wizard!==void 0&&C(e.status)&&(e.wizard.phase==="complete"||pe(e.wizard).passedModuleCount>0),y=h?S?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",u=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${rr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",A=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${rr(r.replyPreview)}</pre>`,b=r.detail.length===0&&u.length===0&&A.length===0||r.detail.length===0&&A.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${rr(r.detail)}${p}</p>`}${A}</div>`,f=e.revisions.find(Vr=>Vr.roundNumber===e.currentRound),w=e.status==="improving"?om(e):null,v=gs(e),_=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),E=Tt(e)?OM({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:w?.promptText??f?.promptText??"",score:w?.score??f?.judgement?.score??null,reasons:w?.reasons??f?.judgement?.reasons??null,avoid:w?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:_?1:0}):"",k=e.wizard!==void 0&&e.wizard.phase==="complete"&&C(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!k?70:e.passScore,j=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${LM(I)}</div>`:"",ne=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':C(e.status)?e.status==="failed"?'<span class="sdlc-run-badge sdlc-run-badge-failed">Failed</span>':k&&g!==null&&!S?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",G=t?d:h?S?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',V=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${rr(Ke(me(e)))}</li>`:"",v>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${Bo(v)} so far</li>`:""].filter(Vr=>Vr.length>0),Gr=V.length===0?"":`<ul class="sdlc-run-meta">${V.join("")}</ul>`,$=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,be=k?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,Dt=k?"":j.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${be}</div>`:`<div class="sdlc-run-grid">${be}${j}</div>`,zs=NM(e),r1=e.wizard!==void 0&&C(e.status)&&e.revisions.every(Vr=>Vr.roundNumber===0&&(Vr.judgement===void 0||Vr.judgement===null)),o1=zs.length===0||r1?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${zs}</div></section>`,n1=`<p class="sdlc-run-goal" title="${rr(e.goal.trim())}">${rr(tr(e.goal))}</p>`,s1=k?`${c}${i}${s}${E}${a}`:`${c}${Dt}${E}${s}${a}`,i1='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',a1=k?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${rr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${i1}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${ne}</div>${n1}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${G}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${rr(r.title)}</h2>${b}${u}${a1}</div></div>${Gr}${$}</header>${s1}</section>${o1}`}});var sN,iN=l(()=>{"use strict";R();nl();sN=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Xa({revisions:e.revisions,wizard:t})?e:Nr(e)}});var aN,lN=l(()=>{"use strict";R();dl();aN=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Ya(t)?e:Fo({...e,wizard:{...t,gate:null}})}});var cN,dN=l(()=>{"use strict";R();ol();cN=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Za(t.splitOptions))return e;let r=t.splitOptions[0];return Mr(e,r)}});var _3,Go,Am=l(()=>{"use strict";iN();lN();dN();qe();_3=e=>{let t=aN(e),r=sN(t);return cN(r)},Go=(e,t)=>{let r=_3(t);return r!==t?(F(e,r),r):t}});var uN,Vo,bm=l(()=>{"use strict";R();uN=e=>jo.indexOf(e),Vo=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||C(e.status)?jo.length:t.gate!==null?uN(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?uN(t.phase):null}});var pN,mN=l(()=>{"use strict";pN=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var qo,gN,fN=l(()=>{"use strict";R();mN();qo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gN=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=qa(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${qo(pN(o))}</pre></div>`:"",s=Mo(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=No(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=Bp(c),g=i[c]??"",S=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${qo(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${qo(p)}">${qo(S)}</label>
        ${h}
        <input class="input" type="text" id="${qo(p)}" name="${qo(p)}" value="${qo(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var Ot,hN,yN=l(()=>{"use strict";R();fN();kP();pm();NP();Ot=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hN=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate,n=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=o==="generalize"?`<ul class="sdlc-wizard-vars">${r.variables.map(_=>`<li><strong>{{${Ot(_.name)}}}</strong> \u2014 ${Ot(_.description)} (sample: ${Ot(_.sampleValue)})</li>`).join("")}</ul><pre class="sdlc-pre">${Ot(r.templatedPrompt)}</pre>`:"",i=o==="evaluate"?us({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",c=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(_=>{let E=_.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',k=_.recommended?' <span class="sdlc-badge">Recommended</span>':"",x=r.selectedSplitOptionId===_.id||r.selectedSplitOptionId===null&&_.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label><input type="radio" name="wizardSplitOptionId" value="${Ot(_.id)}" required${x}> <strong>${Ot(_.title)}</strong>${E}${k}<br><span class="muted">${Ot(_.summary)}</span></label>${um(_)}</li>`}).join("")}</ul>`:"",d=r.modules[r.currentModuleIndex],g=o==="optimize_modules"&&d?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",S=d?.title??"Module",h=d?.prompt??"",y=d?.status==="pending",u=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Ot(S)}</p>${y?gN({cycle:e,modulePrompt:h}):""}<p class="muted">Test run prompt preview: ${Ot(Ja(h,No(r)))}</p>${d?.statistics===null||d?.statistics===void 0?"":`<p class="muted">Module stats: best ${d.statistics.bestScore??"\u2014"} / \u2265${70} (round ${d.statistics.bestRound??"\u2014"}).</p>`}${us({cycle:e,interactive:!1,caption:y?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${S}\u201D (runner + judge).`})}`:"",A=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":y?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",b=rP(r),f=b===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${b}</p>`,w=t?.active===!0?" sdlc-wizard-gate-active":"",v=t?.active===!0?' id="prompt-optimizer-wizard-active-step"':"";return`<section class="card sdlc-wizard-gate${w}"${v}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${n}</h2>
    <p class="sdlc-wizard-gate-lede">${A}</p>
    ${f}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Ot(e.id)}">
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
    ${HM(e)}
  </section>`}});var W3,SN,AN=l(()=>{"use strict";R();W3=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SN=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||C(e.status))return"";if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>Suggesting module splits</h2>
    <p class="muted">The writer is proposing split options. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;if(t.phase==="optimize_modules"&&t.modules.length>0){let r=t.currentModuleIndex,n=t.modules[r]?.title??"Module";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 4 \u2014 Optimize modules</p>
    <h2>Module ${r+1} of ${t.modules.length}: ${W3(n)}</h2>
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
  </section>`:""}});var L3,E3,k3,bN,PN=l(()=>{"use strict";R();bm();yN();AN();gm();L3={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},E3=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),k3=(e,t,r)=>`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${E3(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${ps(e,t)}</div>
</details>`,bN=e=>{let t=e.wizard;if(t===void 0)return"";let r=Vo(e);if(r===null)return"";let o=jo.slice(0,r).map((i,a)=>k3(e,`wizard-${a+1}`,L3[i])),n=t.gate!==null?hN(e,{active:!0}):SN(e),s=r>=jo.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var Pm,$P=l(()=>{"use strict";PN();pm();R();Pm=e=>{if(e===null||e.wizard!==void 0&&C(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=bN(e),r=gM(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var hl,wm,wN,HP,vN,_N,WN,LN,FP=l(()=>{"use strict";hl=m(require("node:fs")),wm=m(require("node:path")),wN=e=>wm.default.join(wm.default.dirname(e),"prompt-optimizer-writer-ready.json"),HP=e=>{let t=wN(e);if(!hl.default.existsSync(t))return{};try{let r=JSON.parse(hl.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},vN=(e,t)=>{hl.default.mkdirSync(wm.default.dirname(e),{recursive:!0}),hl.default.writeFileSync(wN(e),`${JSON.stringify(t,null,2)}
`)},_N=(e,t)=>HP(e)[t]?.message??null,WN=(e,t,r)=>{vN(e,{...HP(e),[t]:{message:r}})},LN=(e,t)=>{let r=HP(e);r[t]!==void 0&&vN(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var UP,vm,_m,EN,Te,Ko=l(()=>{"use strict";R();tl();dl();ml();ul();FP();Am();qe();UP=new Set,vm={atMs:0,ids:[]},_m=async()=>{if(Date.now()-vm.atMs<3e4)return vm.ids;let e=await yt({commands:de({})});return vm.atMs=Date.now(),vm.ids=e.installedWriterIds,e.installedWriterIds},EN=async(e,t,r)=>{let o=J(e,t);if(o===null||r.aborted)return;let n=Go(e,o);if(C(n.status)||n.status==="wizard_paused"||Tt(n))return;let s=await aM(n,a=>{LN(e,a)},r,a=>{J(e,t)?.status==="stopped"||r.aborted||F(e,a)});J(e,t)?.status==="stopped"||r.aborted||(F(e,s),C(s.status)||await EN(e,t,r))},Te=(e,t)=>{if(UP.has(t))return;let r=J(e,t);if(r===null)return;let o=Go(e,r);if(C(o.status)||o.status==="wizard_paused"||Tt(o))return;UP.add(t);let n=bM(t);EN(e,t,n).finally(()=>{UP.delete(t),PM(t)})}});var zr,yl=l(()=>{"use strict";zP();Am();$P();Ko();zr=(e,t)=>{let r=Go(e,t);return Te(e,r.id),`${Sm(r)}${Pm(r)}`}});var kN,CN,RN=l(()=>{"use strict";kN=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,CN=e=>e!==null&&e>0});var Wm,xN,BP=l(()=>{"use strict";R();ul();Wm=e=>(ms(e.id),{...e,status:"stopped",errorMessage:Ab,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null,phase:"complete"},updatedAt:new Date().toISOString()}),xN=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;ms(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var C3,TN,IN,ON=l(()=>{"use strict";R();dl();ol();nl();yl();qe();Ko();RN();TP();BP();C3="Pick a revision scored above 0 before continuing to Separate.",TN=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),IN=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=J(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=J(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(zr(e.storePath,d))};if(o==="wizard-stop-all"){let c=Wm(s);return F(e.storePath,c),a(n),!0}if(o==="wizard-skip-module"){let c=xN(s);return F(e.storePath,c),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=vM(s,c);return F(e.storePath,d),d.status==="judging"&&Te(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",g=Bb(s.wizard,d,c);g=Gb(g,d),g={...g,pendingStepInstructions:p};let S={...s,status:"judging",errorMessage:null,wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return F(e.storePath,S),Te(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(S=>S.step==="generalize"),g=(s.errorMessage?.trim().length??0)>0&&!d?TN(s):Fo({...s,wizard:{...s.wizard,gate:null}});return F(e.storePath,g),Te(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=kN(s,p??-1);if(!CN(g)){let h={...s,errorMessage:C3,updatedAt:new Date().toISOString()};return F(e.storePath,h),a(n),!0}let S=Nr({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return F(e.storePath,S),Te(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=TN(s);return F(e.storePath,h),Te(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(h=>h.id===p);if(g===void 0){let h={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return F(e.storePath,h),a(n),!0}let S=Mr(s,g);return F(e.storePath,S),a(n),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(n),!0;let g=cP({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!g.ok){let u={...s,errorMessage:g.errorMessage,updatedAt:new Date().toISOString()};return F(e.storePath,u),a(n),!0}let S={...s.wizard,parameterValues:g.parameterValues};if(p.status==="pending"){let u=iM({...s,wizard:{...S,gate:null}},d);return F(e.storePath,u),Te(e.storePath,n),a(n),!0}let h=d+1;if(h>=s.wizard.modules.length){let u=pe(S),A={...s,status:u.terminalStatusSuggestion,wizard:{...S,gate:null,phase:"complete"},updatedAt:new Date().toISOString()};return F(e.storePath,A),a(n),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...S,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return F(e.storePath,y),a(n),!0}}return a(n),!0}});var R3,MN,x3,GP,T3,NN,jN=l(()=>{"use strict";xe();ul();BP();hP();Xp();ml();qe();R3="Add a score from 0 to 100 and the reason for it.",MN="Add a score from 1 to 100 and the reason for it.",x3="Write the next prompt.",GP="This step is not waiting for you.",T3=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},NN=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=J(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(F(e.storePath,Wm(a)),{kind:"saved",cycleId:i}):wM(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=J(e.storePath,r);if(o===null||!Tt(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:GP};if(t==="manual-judge"){if(o.judgeModel!==T)return{kind:"invalid",cycle:o,errorMessage:GP};let i=T3(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?MN:R3};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:MN};let d=o.revisions.find(g=>g.roundNumber===o.currentRound)?.run?.tokenReview??"",p=Zp(al(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return F(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==T)return{kind:"invalid",cycle:o,errorMessage:GP};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:x3};let s=Yp(o,n);return F(e.storePath,s),{kind:"saved",cycleId:o.id}}});var DN,zN=l(()=>{"use strict";DN=`<script>
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
</script>`});var $N,HN=l(()=>{"use strict";$N=`<script>
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
</script>`});var FN,UN=l(()=>{"use strict";FN=`<script>
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
</script>`});var BN,GN=l(()=>{"use strict";BN=`<script>
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
</script>`});var VN,qN=l(()=>{"use strict";R();Je();VN=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:Ke(t.workingDirectory),passScore:String(t.passScore),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!C(t.status)}}});var KN,JN=l(()=>{"use strict";R();bm();KN=e=>{if(e.wizard===void 0)return C(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let t=Vo(e);if(e.status==="wizard_paused"&&t!==null&&t<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${t+1} of 4`};if(C(e.status)){if(e.wizard.phase==="complete"){let r=pe(e.wizard),o=r.rows.reduce((s,i)=>i.bestScore===null?s:s===null?i.bestScore:Math.min(s,i.bestScore),null),n=o===null?"":` \xB7 lowest ${o}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Wizard \xB7 ${r.passedModuleCount}/${r.totalModules} modules${n}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}}return t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${t+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var YN,XN=l(()=>{"use strict";YN=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var or,I3,O3,ZN,QN=l(()=>{"use strict";JN();XN();fl();or=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),I3=e=>e.wizard===void 0?"classic":"wizard",O3=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${or(t)}">`,o=KN(e),n=YN(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${or(o.badgeClass)}">${or(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${or(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${or(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${I3(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${or(e.id)}">${or(tr(e.goal))}</a><p class="muted">${or(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${g}</div></li>`},ZN=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>O3(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${or(s)}</summary>${i}</details>`:i}});var VP,Lm,ej,M3,N3,qP,tj,KP=l(()=>{"use strict";VP=m(require("node:fs")),Lm=m(require("node:path"));Je();ej=/^[a-z0-9-]+$/,M3=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},N3=(e,t)=>{if(!ej.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let g=M3(p[2]??"");p[1]==="name"&&g.length>0&&(o=g),p[1]==="description"&&(n=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},qP=e=>{let t=$o(e);if(!t.ok)return[];let r=Lm.default.resolve(t.path,".cursor","skills"),o=[];try{o=VP.default.readdirSync(r)}catch{return[]}return o.filter(n=>ej.test(n)).flatMap(n=>{let s=Lm.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${Lm.default.sep}`))return[];try{let i=N3(VP.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},tj=(e,t)=>qP(e).find(r=>r.fileName===t)??null});var rj,oj=l(()=>{"use strict";rj={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Pass score",practice:"The run passes at this score. 90 is the usual bar. Lower it when a useful prompt is enough.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var Sl,j3,Ye,Al=l(()=>{"use strict";oj();cm();Sl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),j3=e=>{let t=rj[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${Sl(t.title)}" aria-describedby="${r}" aria-expanded="false">${ds}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${Sl(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${Sl(t.example)}</span></span></button>`},Ye=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${Sl(r)}"`}>${Sl(e)}</span>${j3(t)}</span>`});var nj,D3,sj,ij,aj=l(()=>{"use strict";Al();nj=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),D3=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),sj=e=>{if(e.length===0)return`<div class="field">${Ye("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${nj(r.fileName)}">${nj(r.fileName)}</option>`).join("");return`<div class="field">${Ye("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${D3(e)}</script>`},ij=`<script>
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
</script>`});var Ie,lj,cj,z3,dj,uj,pj,mj=l(()=>{"use strict";R();OP();xe();fl();bm();Ie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lj=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",cj=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,z3=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},dj=e=>e===T?"You":oe(e),uj=e=>{let t=z3(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":oe(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Ie(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Ie(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Ie(dj(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Ie(dj(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Ie(r)}</dd></div>
    </dl>
  </details>`},pj=e=>{let t=e.wizard;if(t===void 0)return"";let r=tr(e.goal),o=e.status==="wizard_paused",n=!C(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=hm(e),g=cj(t),S=g===null?"":lj(g),h=Vo(e),y=S.length===0?"":h===null||h>=4?` <strong>${Ie(S)}</strong>`:` <strong>${Ie(S)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Ie(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Ie(p.title)}${y}</p>
    <p class="muted">${Ie(p.detail)}</p>
    <div class="actions">
      ${uj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ie(e.id)}">Open this run</a>
    </div>
  </section>`}let s=cj(t),i=s===null?"Wizard":lj(s),a=Vo(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ie(r)}</h2>
    <p class="lede">Paused at <strong>${Ie(i)}</strong>${Ie(c)} (last updated ${Ie(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${uj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ie(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var bl,gj,fj=l(()=>{"use strict";Al();bl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gj=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${bl(n.id)}"${n.id===e.runner?" selected":""}>${bl(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${bl(e.runner)}">Checking ${bl(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Ye("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Ye("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${bl(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var hj,yj=l(()=>{"use strict";hj=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var fs,Sj,Aj,bj,Pj,wj=l(()=>{"use strict";Al();fs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Sj=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${fs(c.id)}"${c.id===r?" selected":""}>${fs(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${fs(n)}</option>`;return`<div class="field">${Ye(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},Aj=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${fs(t)}">Checking ${fs(o)}\u2026</p>`},bj=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Ye(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${fs(r)}</textarea><span class="muted">${o}</span></div></details>`,Pj=e=>{let t=`<div class="sdlc-writer">${Sj("judge","Judge",e.judge,e.writers,"I'll score it")}${Aj("judge",e.judge,e.writers)}${bj("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${Sj("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${Aj("improver",e.improver,e.writers)}${bj("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var H3,Jo,vj,_j=l(()=>{"use strict";ml();zP();zN();HN();IP();UN();GN();qN();QN();KP();aj();Al();$P();mj();fl();fj();yj();wj();R();H3=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Jo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vj=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Jo(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Jo(e.skillNotice??"")}</div>`,o=`${EM}${kM}`,n=e.resumableWizardCycle??null,s=n===null?"":pj(n),i=Pm(e.cycle),a=e.cycle===null?"":Sm(e.cycle),c=e.cycle!==null&&Tt(e.cycle),d=VN(e),p=H3(d.goal,d.prompt,e.canRun),g=Pj({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),S=gj({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=Fb,y=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",u=e.cycle!==null&&C(e.cycle.status),A=d.running&&!u,b=u||A?"":" open",f=A?" sdlc-compose-run-focus":"",v=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${u?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,_=u?(()=>{let G=e.cycle!==null?tr(e.cycle.goal):tr(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Jo(G)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${v}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${v}</summary>`,E=u?" sdlc-compose-viewing-finished":"",k=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",x=c?"waiting":d.running?"running":"idle",I=d.running&&!c?' aria-busy="true"':"",j=`<section class="card sdlc-compose${E}${f}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${b}>
        ${_}
        <div class="sdlc-compose-details-body">
      <p class="lede">${h} ${Jo(e.modelNote)}</p>
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
            ${Ye("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Jo(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${sj(qP(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${Ye("Goal","goal")}
            <textarea class="input textarea" name="goal" rows="4" required>${Jo(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Ye("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Jo(d.prompt)}</textarea>
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
        ${hj()}
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
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${x}" data-can-run="${p?"true":"false"}"${I}${d.running?" disabled":""}>${k}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,ne=`${""}${DN}${$N}${BN}${ij}${FN}`;return`${t}${r}${j}${s}${a}${i}${o}${ZN(e.history,e.cycle?.id??null)}${ne}`}});var Pl,JP=l(()=>{"use strict";_j();Pl=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:vj(t)}))}});var Wj,Lj=l(()=>{"use strict";jN();yl();JP();qe();Ko();Wj=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:NN({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=J(e.storePath,o.cycleId);return Te(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(zr(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Pl(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:Ct(e.storePath),resumableWizardCycle:null}),!0)}});var Ej,Em,YP=l(()=>{"use strict";Ej=m(require("node:os"));R();Em=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??Ej.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??90,maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var kj,hs,XP,Cj,Rj,wl=l(()=>{"use strict";R();xe();yb();kj=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,hs=e=>{let t=CO(e),r=Ho(e).map(s=>({id:s,label:Jp[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},XP=(e,t,r)=>t===T||t!==null&&e.writers.some(o=>o.id===t)?t:r,Cj=(e,t,r,o=null)=>({judge:XP(e,t,e.judge),improver:XP(e,r,e.improver),runner:XP(e,o,e.runner)}),Rj=e=>e===Ep?{goal:kp,prompt:Cp}:{goal:"",prompt:""}});var km,ZP=l(()=>{"use strict";R();xe();Je();wl();km=e=>{let t=Cj(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=String(70),o=String(5),n=e.posted?.get("judgeInstructions")?.trim()??"",s=e.posted?.get("improverInstructions")?.trim()??"",i=e.posted?.get("runnerInstructions")?.trim()??"",a=e.posted?.get("runner")??null,c=(u,A)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:u,passScore:r,maxRounds:o,errorMessage:A,judge:t.judge,improver:t.improver,judgeInstructions:n,improverInstructions:s,runner:t.runner,runnerInstructions:i});if(e.posted===null)return c(e.defaultFolder??zo,null);let d=e.posted.get("folder")??zo;if(e.posted.get("intent")==="choose-folder"){let u=e.pickFolder();return c(u===null?d:Ke(u),null)}if((e.posted.get("intent")??"")!=="run")return c(d,null);let g=kj(e.goal,e.prompt);if(g!==null)return c(d,g);let S=RO(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(S===null)return c(d,"Choose a judge and an improver.");let h=$o(d);if(!h.ok)return c(d,h.errorMessage);let y=xO(e.installedIds,a,S.judge);return y===null?c(d,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:S.judge,improver:S.improver,workingDirectory:h.path,passScore:70,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??"",judgeInstructions:n,improverInstructions:s,runner:y,runnerInstructions:i}}});var ys,Rm,F3,QP,xj,Cm,Tj,U3,Ij,ew,B3,G3,V3,tw,Oj,Mj,Nj=l(()=>{"use strict";ys=m(require("node:fs")),Rm=m(require("node:path"));xe();Je();F3=["remember","choose-folder","run"],QP=()=>({folder:zo,judge:"",improver:"",runner:""}),xj=e=>Rm.default.join(Rm.default.dirname(e),"prompt-optimizer-preferences.json"),Cm=e=>typeof e=="string"?e:"",Tj=e=>{let t=xj(e);if(!ys.default.existsSync(t))return QP();try{let r=JSON.parse(ys.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return QP();let o=r,n=Cm(o.folder).trim();return{folder:n.length===0?zo:n,judge:Cm(o.judge),improver:Cm(o.improver),runner:Cm(o.runner)}}catch{return QP()}},U3=(e,t)=>{let r=xj(e);ys.default.mkdirSync(Rm.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;ys.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),ys.default.renameSync(o,r)},Ij=(e,t)=>e===T||Ho(t).some(r=>r===e),ew=(e,t,r)=>e===null?t:e.length===0?"":Ij(e,r)?e:t,B3=(e,t)=>{if(e===null)return t;let r=$o(e);return r.ok?r.display:t},G3=e=>{let t=Tj(e.storePath),r={folder:B3(e.folder,t.folder),judge:ew(e.judge,t.judge,e.installedIds),improver:ew(e.improver,t.improver,e.installedIds),runner:ew(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||U3(e.storePath,r)},V3=e=>{let t=$o(e);return t.ok?t.display:zo},tw=(e,t)=>Ij(e,t)?e:"",Oj=e=>{let t=Tj(e.storePath);return{selection:{...e.selection,judge:tw(t.judge,e.installedIds)||e.selection.judge,improver:tw(t.improver,e.installedIds)||e.selection.improver,runner:tw(t.runner,e.installedIds)||e.selection.runner},defaultFolder:V3(t.folder)}},Mj=e=>{let t=e.posted.get("intent")??"";if(!F3.includes(t))return;let r=e.posted.get("folder");G3({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var jj,q3,K3,rw,J3,xm,Tm=l(()=>{"use strict";jj=m(require("node:os"));xe();FP();il();q3="Reply with the single word ok. Do not use tools.",K3=45e3,rw=async(e,t)=>{if(t===T)return{ok:!0,message:"You will do this step."};let r=_N(e,t);if(r!==null)return{ok:!0,message:r};let o=await rt({writerAgent:t,prompt:q3,workingDirectory:jj.default.tmpdir(),timeoutMs:K3});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${oe(t)} is ready.`;return WN(e,t,n),{ok:!0,message:n}},J3=e=>[...new Set(e.filter(t=>t.length>0))],xm=async(e,t,r,o)=>{for(let n of J3([t,r,o??""])){let s=await rw(e,n);if(!s.ok)return s.message}return null}});var ow,Dj=l(()=>{"use strict";R();ow=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!C(r.status)&&!(t!==null&&r.id===t))return r;return null}});var zj,$j=l(()=>{"use strict";ft();R();yl();YP();ZP();JP();qe();Je();Nj();KP();Tm();Dj();Am();Ko();zj=async e=>{let t=e.posted===null?Oj({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=km({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Rr("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(Mj({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Ke(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await xm(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await Pl(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Ke(r.workingDirectory),passScore:String(r.passScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:Ct(e.route.storePath),resumableWizardCycle:ow(Ct(e.route.storePath),null)});return}if(r.kind==="start"){let s=tj(r.workingDirectory,r.sourceSkillFile),i=Em({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,wizard:{...Ga(r.prompt),runnerInstructions:r.runnerInstructions},runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(F(e.route.storePath,i),Te(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(zr(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:J(e.route.storePath,e.cycleId);n!==null&&(n=Go(e.route.storePath,n),Te(e.route.storePath,n.id)),await Pl(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:Ct(e.route.storePath),resumableWizardCycle:ow(Ct(e.route.storePath),n?.id??null)})}});var Hj,Fj=l(()=>{"use strict";qe();Hj=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";pO(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var Uj,Bj=l(()=>{"use strict";Uj=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var Gj,Vj=l(()=>{"use strict";EO();ON();Lj();$j();Fj();wl();Bj();Ko();Gj=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await _m(),o=hs(r),n=e.method==="POST"?Uj(e.request.headers["content-type"],await e.readBody(e.request)):null;if(IN({posted:n,storePath:e.storePath,response:e.response})||await Wj(e,n,o))return;let s=Rj(t.searchParams.get("example")),i=Hj({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=LO({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await zj({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:WO(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var Y3,qj,Kj=l(()=>{"use strict";R();qe();Y3=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",qj=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=J(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!C(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=tP({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${Y3(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var Jj,Yj=l(()=>{"use strict";yl();qe();Jj=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:J(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":zr(e.storePath,o)),!0}});var X3,Xj,Zj=l(()=>{"use strict";xe();Tm();X3=["claude-cli","codex","cursor","antigravity"],Xj=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===T||X3.includes(t)?await rw(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var Qj,eD=l(()=>{"use strict";R();Qj=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:Ua,page:Ba,context:rs,installedWriters:e,post:{method:"POST",url:Ua,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${Ua}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var nw,tD=l(()=>{"use strict";R();pl();nw=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ie(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null}))),o=C(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:o,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:gs(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:rs,page:`${Ba}?cycle=${encodeURIComponent(e.id)}`}}});var Oe,Z3,rD,oD,nD=l(()=>{"use strict";Oe=m(qs());R();Z3=(0,Oe.isType)({goal:Oe.isString,prompt:Oe.isString,workingDirectory:Oe.isString,judge:(0,Oe.isUndefinedOr)(Oe.isString),improver:(0,Oe.isUndefinedOr)(Oe.isString),passScore:(0,Oe.isUndefinedOr)(Oe.isNumber),maxRounds:(0,Oe.isUndefinedOr)(Oe.isNumber)}),rD=e=>{let t=e?.trim()??"";return t.length===0?null:t},oD=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return Z3(t)?t.workingDirectory.trim().length===0?{ok:!1,error:zp}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:rD(t.judge),improver:rD(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:zp}}});var Q3,sD,iD=l(()=>{"use strict";R();xe();ZP();wl();Q3=e=>e.map(t=>t.id).join(", "),sD=e=>{let t=hs(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===T||n===T)return{ok:!1,error:Hb,installedWriters:t.writers};if(o===null||n===null){let a=Q3(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o}),i=km({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var aD,lD=l(()=>{"use strict";R();YP();eD();tD();wl();nD();iD();qe();aD=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=J(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:nw(c)}}let r=await e.handlers.readInstalledIds(),o=hs(r);if(e.method==="GET")return{status:200,body:Qj(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let n=oD(e.rawBody);if(!n.ok)return{status:400,body:{ok:!1,error:n.error,installedWriters:o.writers}};let s=sD({body:n.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver,s.runner);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:o.writers}};let a=Em({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds,wizard:Ga(s.prompt),runnerModel:s.runner});return F(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:nw(a)}}});var cD,dD=l(()=>{"use strict";Ko();Tm();lD();cD=async e=>{let t=await aD({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:_m,readWritersReady:xm,startCycle:Te}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var e4,sw,uD=l(()=>{"use strict";RT();Vj();Kj();Yj();Zj();dD();e4=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},sw=async e=>{let t=e4(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await cD(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:CT()})),!0):(await Xj({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||qj({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||Jj({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await Gj(e),!0)}});var pD=l(()=>{"use strict";uD()});var Yo,vl,t4,r4,o4,n4,mD,gD=l(()=>{"use strict";Yo=m(require("node:fs")),vl=m(require("node:path")),t4="prompt-optimizer-cycles.json",r4="prompt-optimizer-preferences.json",o4="prompt-sdlc-cycles.json",n4="prompt-sdlc-preferences.json",mD=e=>{let t=vl.default.join(e,t4),r=vl.default.join(e,o4);if(Yo.default.existsSync(t)||!Yo.default.existsSync(r))return t;try{Yo.default.renameSync(r,t)}catch{return r}let o=vl.default.join(e,n4),n=vl.default.join(e,r4);if(Yo.default.existsSync(o)&&!Yo.default.existsSync(n))try{Yo.default.renameSync(o,n)}catch{}return t}});var Ss,s4,iw,fD=l(()=>{"use strict";Ss=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),s4=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],iw=e=>{let t=s4.map(i=>`<option value="${Ss(i.value)}">${Ss(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Ss(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Ss(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Ss(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Ss(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var _l,SD,i4,AD,a4,l4,bD,Om,hD,yD,c4,d4,nr,Wl,Im,u4,Mm,aw,p4,lw,PD,cw,wD,m4,g4,f4,vD,_D,WD,Ll=l(()=>{"use strict";_l=m(require("node:fs")),SD=m(require("node:path")),i4="estimate-history.ndjson",AD=100,a4=500,l4=2e4,bD=e=>SD.default.join(e,i4),Om=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,a4),hD=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,l4),yD=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,c4=e=>({...e,estimateTokens:yD(e.estimateTokens),actualTokens:yD(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),d4=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},nr=e=>{let t=bD(e);return _l.default.existsSync(t)?_l.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return d4(n)?[c4(n)]:[]}catch{return[]}}):[]},Wl=(e,t)=>{_l.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;_l.default.writeFileSync(bD(e),r,"utf8")},Im=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),u4=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${Im(o.task)} | ${Im(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},Mm=e=>{let t=nr(e.reportsDir),r=Om(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Wl(e.reportsDir,[...s,n])},aw=e=>{let t=nr(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?Om(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Wl(e.reportsDir,[...i,s])},p4=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-AD),lw=e=>[...nr(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),PD=e=>{let t=nr(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=hD(e.input),n=hD(e.output),s=Om(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Wl(e.reportsDir,[...c,a])},cw=(e,t)=>{let r=nr(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},wD=e=>({table:u4(p4(nr(e))),embedding:null}),m4=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},g4=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-AD),f4=e=>{let t=m4(g4(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${Im(s.task)} | ${Im(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},vD=e=>{let t=nr(e.reportsDir),r=Om(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Wl(e.reportsDir,[...s,n])},_D=e=>{let t=nr(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Wl(e.reportsDir,[...s,n])},WD=e=>f4(nr(e))});var LD=l(()=>{"use strict";Ll()});var sr,dw,h4,uw,y4,S4,Nm,jm,A4,pw,ED=l(()=>{"use strict";LD();sr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dw=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},h4=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${dw(-r)} under`:`${dw(r)} over`},uw=e=>e.toLocaleString("en-US"),y4=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${uw(-r)} under`:`${uw(r)} over`},S4=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},Nm=e=>e===null?"\u2014":dw(e),jm=e=>e===null?"\u2014":uw(e),A4=`(function () {
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
})();`,pw=e=>{let r=lw(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":h4(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":y4(n.estimateTokens,n.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${sr(S4(i))}</button></td>
        <td>${sr(c)}</td>
        <td>${Nm(n.estimateSeconds)}</td>
        <td>${Nm(n.actualSeconds)}</td>
        <td>${sr(d)}</td>
        <td>${jm(n.estimateTokens)}</td>
        <td>${jm(n.actualTokens)}</td>
        <td>${sr(p)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${sr(c)}</p>
        <h2>Input</h2>
        <pre>${sr(i)}</pre>
        <h2>Output</h2>
        <pre>${sr(a)}</pre>
        <p>Time: estimated ${Nm(n.estimateSeconds)} \xB7 actual ${Nm(n.actualSeconds)} \xB7 ${sr(d)}</p>
        <p>Tokens: estimated ${jm(n.estimateTokens)} \xB7 actual ${jm(n.actualTokens)} \xB7 ${sr(p)}</p>
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
        <script>${A4}</script>`}
    </section>`}});var kD=l(()=>{"use strict";fD();ED()});var As,b4,P4,mw,CD=l(()=>{"use strict";As=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),b4=(e,t,r)=>{let o=As(t),n=As(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},P4=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${As(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>b4(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${As(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${As(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${As(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},mw=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(P4).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var RD=l(()=>{"use strict";CD()});var El,xD,TD,gw,fw,hw,ID=l(()=>{"use strict";El=m(require("node:fs")),xD=m(require("node:path"));Ca();Pp();TD=(e,t,r)=>Jn({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,gw=(e,t,r)=>{let o=TD(e,t,r);if(o===null)return[];if(!El.default.existsSync(o))return[];let n=El.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},fw=e=>{let t=TD(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Zt(e.entry.prompt),output:Zt(e.entry.output)};El.default.mkdirSync(xD.default.dirname(t),{recursive:!0}),El.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},hw=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var w4,v4,kl,Dm,yw=l(()=>{"use strict";w4=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),v4=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,kl=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=w4(i.assistantOutput),d=c.length>0?`Assistant: ${v4(c,t)}`:null,p=[a,d].filter(g=>g!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},Dm=e=>{let t=e.userMessage.trim(),r=kl({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Mt,Cl,bw,_4,W4,Sw,L4,Pw,zm,OD,MD,E4,bs,ww,Aw,ND,k4,jD,Ps,$m,Rl,C4,xl,vw,Hm,Fm,DD=l(()=>{"use strict";Mt=m(require("node:fs")),Cl=m(require("node:path")),bw=require("node:crypto");yw();_4="writer-sessions",W4="active-index.json",Sw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),L4=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Pw=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},zm=e=>{let t=Cl.default.join(e.installDir,_4);return Mt.default.mkdirSync(t,{recursive:!0}),t},OD=e=>Cl.default.join(zm(e),W4),MD=(e,t)=>Cl.default.join(zm(e),`${t}.canonical.json`),E4=(e,t)=>Cl.default.join(zm(e),`${t}.continuation.json`),bs=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,ww=e=>{let t=OD(e);if(!Mt.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Mt.default.readFileSync(t,"utf8"));if(!Sw(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!Sw(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!L4(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},Aw=(e,t)=>{Mt.default.writeFileSync(OD(e),JSON.stringify(t,null,2))},ND=(e,t)=>{Mt.default.writeFileSync(MD(e,t.sessionId),JSON.stringify(t,null,2))},k4=(e,t)=>{Mt.default.writeFileSync(E4(e,t.sessionId),JSON.stringify(t,null,2))},jD=(e,t)=>{let r=kl({turns:t.turns});k4(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Ps=(e,t)=>{let r=MD(e,t);if(!Mt.default.existsSync(r))return null;try{let o=JSON.parse(Mt.default.readFileSync(r,"utf8"));return!Sw(o)||typeof o.sessionId!="string"?null:o}catch{return null}},$m=(e,t=20)=>{let r=zm(e),o=Mt.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Ps(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Rl=(e,t,r)=>{let o=Pw(r);return ww(e).entries.find(i=>bs(i)===bs({writerAgent:t,projectFolderPath:o}))?.sessionId??null},C4=(e,t,r,o)=>{let n=ww(e),s=bs({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>bs(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];Aw(e,{entries:i})},xl=(e,t,r)=>{let o=(0,bw.randomUUID)(),n=new Date().toISOString(),s=Pw(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return ND(e,i),jD(e,i),C4(e,t,s,o),o},vw=(e,t,r)=>{let o=Rl(e,t,r);return o!==null?o:xl(e,t,r)},Hm=(e,t,r)=>{let o=Pw(r),n=ww(e);if(o===null&&r===void 0){Aw(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=bs({writerAgent:t,projectFolderPath:o});Aw(e,{entries:n.entries.filter(i=>bs(i)!==s)})},Fm=e=>{let t=vw(e.layout,e.writerAgent,e.projectFolderPath),r=Ps(e.layout,t);if(r===null)return;let o={id:(0,bw.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};ND(e.layout,n),jD(e.layout,n)}});var R4,x4,Um,_w,zD=l(()=>{"use strict";R4=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",x4=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},Um=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",_w=e=>{let t=Um(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=R4(r,e.userPromptCharacterCount),n=x4({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var Bm=l(()=>{"use strict";ID();DD();yw();zD()});var $D=l(()=>{"use strict";zh()});var He,I4,O4,Ww,Lw,Ew,HD=l(()=>{"use strict";ue();$D();He=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),I4=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},O4=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=ru(o);return`value="${He(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${He(r)}"`},Ww=(e,t,r,o,n)=>{let s=my[t];return`<label class="field">
          <span class="field-label">${He(o)} API key \u2014 ${He(I4(e,t))} \xB7 <a class="field-link" href="${He(s.href)}" target="_blank" rel="noopener noreferrer">${He(s.label)}</a></span>
          <input class="input mono" type="password" name="${He(r)}" autocomplete="off" ${O4(e,t,n)} />
        </label>`},Lw=(e,t,r,o)=>{let n=$h(e[t]?.model),s=new Set(Kd[t].map(c=>c.value)),i=Kd[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${He(c.value)}"${d}>${He(c.label)}</option>`}).join(""),a=n!==go&&!s.has(n)?`<option value="${He(n)}" selected>${He(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${He(o)}</span>
          <select class="input mono" name="${He(r)}">${i}${a}</select>
        </label>`},Ew=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${He(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${Ww(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${Lw(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${Ww(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${Lw(e.secrets,"openai","openaiModel","OpenAI model")}
        ${Ww(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${Lw(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var FD=l(()=>{"use strict";HD()});var Gm,UD,BD=l(()=>{"use strict";Gm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UD=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${Gm(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Console</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Console \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${Gm(s.name)}</strong> <span class="muted mono">(${Gm(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${Gm(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) from Agent Witch Live. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var M4,GD,VD,qD=l(()=>{"use strict";M4=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,GD=e=>e.kind==="folder",VD=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&GD(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(GD(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(M4)};return r(t)}});var KD,kw,JD=l(()=>{"use strict";KD=m(require("node:path")),kw=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${kw(r.children,t)}</ul>
            </details>
          </li>`;let o=KD.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var YD,$r,N4,j4,Tl,D4,Cw,XD=l(()=>{"use strict";Lp();YD=m(require("node:path"));BD();qD();JD();$r=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),N4=()=>`(() => {
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

})();`,j4=()=>`(() => {
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
})();`,Tl=e=>{let t=Oa({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Console",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=UD({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${$r(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${$r(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':D4(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${$r(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${$r(s)}" />
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
    <script>${N4()}</script>
    <script>${j4()}</script>`;return`${t}${r}${o}${c}${d}`},D4=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=VD(a.items.map(S=>({...S,relativePath:typeof S.relativePath=="string"&&S.relativePath.length>0?S.relativePath:YD.default.relative(a.sourceRoot,S.sourcePath).replaceAll("\\","/")}))),p=kw(d,$r),g=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${$r(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${$r(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${g} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${$r(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},Cw=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??p??a,S=t.sets[i];if(S===void 0)continue;let h=a.length>0?a:S.proposedSlug,y=g.length>0?g:S.proposedName,u=r.has(i),A=S.items.map(b=>({id:b.id,kind:b.kind,title:b.title,sourcePath:b.sourcePath,include:u}));s.push({slug:h,name:y,items:A})}return s}});var ZD=l(()=>{"use strict";XD()});var z4,Rw,QD=l(()=>{"use strict";Cr();z4=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[ze]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},Rw=z4});var $4,ez,tz=l(()=>{"use strict";Cr();$4=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[ze]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},ez=$4});var rz=l(()=>{"use strict"});var Il,H4,xw,oz=l(()=>{"use strict";Lp();Il=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),H4=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,xw=e=>{let t=e.flashError?`<div class="alert-error">${Il(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Il(e.flashMessage)}</div>`:"",r=Oa({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Console",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Console, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Il(H4(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Il(n.name)}</strong>
                  <span class="muted mono">${Il(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Console for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var nz=l(()=>{"use strict";rz();bS();oz()});var Vm,sz=l(()=>{"use strict";Vm=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var iz,ir,Tw=l(()=>{"use strict";iz=m(require("node:path"));Vt();wt();q();ue();Ze();ir=e=>{let t=H()?.layout.installDir??L();if(iz.default.basename(t)===Xr)return Bt;let r=H(),o=r!==null?Ce(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):Bt}});var Iw,az=l(()=>{"use strict";Ze();Tw();Iw=async e=>{let t=ke(e.installDir),r=t?.bundleVersion??null,o=ir(t);try{let n=await vn(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:ao(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var Ow,lz=l(()=>{"use strict";Ow=e=>!e});var Mw,ws,Nw=l(()=>{"use strict";q();Mw=()=>`http://127.0.0.1:${zf()}/update/run`,ws=async e=>{try{let t=await fetch(Mw(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var F4,cz,jw,dz=l(()=>{"use strict";q();re();Nw();F4=()=>{Ft({launchAgentLabel:se(),installDir:L()})},cz=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},jw=async()=>{F4();let e=await ws({force:!0});if(e.ok)return{ok:!0,message:cz(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:cz(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Ze(),$E)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var Dw=l(()=>{"use strict";db();sz();Tw();az();lz();dz();Nw()});var uz,pz=l(()=>{"use strict";uz=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var mz,gz,zw,$w,fz=l(()=>{"use strict";mz=require("node:crypto"),gz=m(require("node:fs"));ft();ue();ue();pz();zw=!1,$w=async e=>{if(zw)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!uz(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=H();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&gz.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,mz.randomUUID)();zw=!0;try{if(await uS(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Rn({...r,workspace:n},e.writerAgent,t);return await ta(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{zw=!1}}});var hz=l(()=>{"use strict";fz()});var ot,U4,yz,Sz,Hw,Fw,Uw,Bw,Gw,Vw,qw=l(()=>{"use strict";ot=require("node:crypto"),U4=Buffer.from("302a300506032b6570032100","hex"),yz=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},Sz=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,ot.createPublicKey)({key:Buffer.concat([U4,t]),format:"der",type:"spki"})},Hw=()=>{let{publicKey:e,privateKey:t}=(0,ot.generateKeyPairSync)("ed25519");return{publicKeyRaw:yz(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Fw=e=>(0,ot.createPrivateKey)(e),Uw=(e,t)=>(0,ot.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),Bw=(e,t,r)=>{try{let o=Sz(e);return(0,ot.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},Gw=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,Vw=()=>(0,ot.randomBytes)(32).toString("base64url")});var ar,qm,Az,B4,G4,Km,Kw,Jw,bz=l(()=>{"use strict";ar=m(require("node:fs")),qm=m(require("node:path"));qw();q();wt();Az=e=>qm.default.join(e.installDir,yr),B4=(e,t)=>{if(e.profileEmail===null||t===Az(e)||ar.default.existsSync(t))return;let r=Az(e);ar.default.existsSync(r)&&(ar.default.mkdirSync(qm.default.dirname(t),{recursive:!0}),ar.default.renameSync(r,t))},G4=e=>{if(!ar.default.existsSync(e))return null;try{let t=ar.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Km=e=>{let t=wd(e);B4(e,t);let r=G4(t);if(r!==null)return r;let o=Hw();return ar.default.mkdirSync(qm.default.dirname(t),{recursive:!0}),ar.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},Kw=e=>{let t=Km(e.layout),r=Vw(),o=Gw({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=Fw(t.privateKeyPem),s=Uw(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Jw=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return Bw(e.serverPublicKey,t,e.serverAttestation)}});var Yw=l(()=>{"use strict";bz();qw()});var _z,Ol,Qw,ev,Pz,V4,Xw,Jm,le,Wz,q4,Zw,K4,J4,tv,ge,We,lr,Y4,wz,vz,Ml,Nl,Lz=l(()=>{"use strict";_z=m(require("node:http")),Ol=m(require("node:fs")),Qw=m(require("node:path"));Ym();La();$0();F0();K0();$n();jA();ab();WT();ET();pD();gD();kD();RD();Bm();FD();ZD();bo();ft();Cr();QD();tz();nz();Dw();Ze();hz();ue();Yw();ev=e=>WA(e)??"never",Pz=48e3,V4=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,Xw=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Ru(),reveal:t.reveal,installed:kr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Jm=async e=>{let t=H();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Console to load projects."}:Nn(t,e)},le=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Wz=200,q4=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',Zw=e=>{let t=e.trim().slice(0,Wz),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},K4=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${le(t)}</div>`,J4=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${le(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',tv={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},ge=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...tv}),e.end(JSON.stringify(r))},We=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},lr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},Y4=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=q4(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${le(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=Ow(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Ea(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${le(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${le(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${le(ev(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${le(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},wz=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},vz=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,Wz)},Ml=e=>{let t=Qw.default.join(e.layout.installDir,"link-code.txt"),r=()=>ke(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:Vm(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let y=h.installVersion??r(),u=await i(),A=gb(u),b=h.updateFlash??null,f=fb(b),w=K4(b,h.updateError??null);return pb({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:ir(y),installBundleVersionLabel:Vm(y),prependBody:`${f}${w}${A}`,headerUpdateButtonHtml:mb(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await Iw(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:Zw("An update is already running.")}),h.end();return}c=!0;try{let u=await jw(),A=u.ok?"/?update=ok":Zw(u.message);h.writeHead(303,{Location:A}),h.end()}catch(u){let A=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:Zw(A)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",A=o(),b=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:A.installVersion,body:`<section class="card">
      <h1>${le(y)}</h1>
      <p>${le(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(b)},g=()=>{if(Ol.default.existsSync(t))return Ol.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return Ol.default.writeFileSync(t,h,"utf8"),h},S=_z.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",A=h.method??"GET";if(A==="OPTIONS"){y.writeHead(204,tv),y.end();return}if(!await sw({method:A,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:mD(Qw.default.dirname(e.layout.configPath)),readBody:lr,sendHtml:We,renderShell:n})){if(A==="GET"&&u==="/health"){let b=e.controllers.getStatus(),f=o();ge(y,200,{ok:!0,...b,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/status"){let b=o();ge(y,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/traffic"){ge(y,200,{entries:_a(e.layout)});return}if(A==="DELETE"&&u==="/api/traffic"||A==="POST"&&u==="/api/traffic/clear"){if(kA(e.layout),A==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}ge(y,200,{ok:!0});return}if(A==="GET"&&u==="/api/trace"){ge(y,200,{entries:yp(e.layout)});return}if(A==="DELETE"&&u==="/api/trace"||A==="POST"&&u==="/api/trace/clear"){if(xA(e.layout),A==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}ge(y,200,{ok:!0});return}if(A==="POST"&&u==="/api/errors/clear"){TA(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(A==="GET"&&u==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let w=await Xn({layout:e.layout,query:f,limit:20});ge(y,200,{chunks:w,query:f});return}ge(y,200,{chunks:Yn(e.layout).slice(-50).reverse()});return}if(A==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(A==="GET"&&u==="/api/update-status"){let b=await i();ge(y,200,{ok:!0,...b});return}if((A==="GET"||A==="POST")&&u==="/api/update"){await d(y);return}if(A==="GET"&&u==="/"){let b=e.controllers.getStatus(),f=o(),w=kr(e.layout),v=Sp(e.layout.errorLogPath);We(y,await n({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:wz(h.url??void 0),updateError:vz(h.url??void 0),body:hb({wsConnected:b.wsConnected,lastHeartbeatAt:b.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:Yn(e.layout).length,trafficEntryCount:_a(e.layout).length,wakeError:b.wakeError,errorLogByteSize:v.byteSize,errorLogExists:v.exists})}));return}if(A==="GET"&&u==="/task"){let b=e.controllers.getStatus(),f=o(),w=H(),v=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=v.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,E=v.searchParams.get("failed")==="1"?v.searchParams.get("error")?.trim()??"Task failed.":null,k=v.searchParams.get("runId");We(y,await n({title:"Task",activePath:"/task",installVersion:f.installVersion,body:iw({defaultWorkspace:w?.workspace??"",wsConnected:b.wsConnected,flashMessage:_,flashError:E,lastRunId:k})}));return}if(A==="POST"&&u==="/task/dispatch"){let b=await lr(h),f=new URLSearchParams(b),w=f.get("prompt")?.trim()??"",v=f.get("writerAgent")?.trim()??"claude-cli",_=f.get("projectFolder")?.trim()??"",E=await $w({prompt:w,writerAgent:v,..._.length>0?{projectFolderPath:_}:{}}),k=new URLSearchParams;E.ok?k.set("ok","1"):(k.set("failed","1"),E.errorMessage!==void 0&&k.set("error",E.errorMessage.slice(0,240))),E.agentRunId!==void 0&&k.set("runId",E.agentRunId),y.writeHead(303,{Location:`/task?${k.toString()}`}),y.end();return}if(A==="GET"&&u==="/writer-sessions"){let b=o(),f=$m(e.layout,12);We(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:b.installVersion,updateFlash:wz(h.url??void 0),updateError:vz(h.url??void 0),body:mw({sessions:f})}));return}if(A==="GET"&&u==="/errors"){let b=o(),f=Sp(e.layout.errorLogPath);We(y,await n({title:"Errors",activePath:"/errors",installVersion:b.installVersion,body:OA({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(A==="GET"&&u==="/status"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),w=we(e.layout),v=w!==null?je(w,12e4):DA(f.lastHeartbeatAt,12e4),_=zA({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:v}),E=o();We(y,await n({title:"Status",activePath:"/status",installVersion:E.installVersion,body:`${Y4({status:f,healthBadge:_,revived:b.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:E.installBundleVersion,installBundleUpdatedAt:E.installBundleUpdatedAt})}${FA({installDir:e.layout.installDir})}${HA({entries:yp(e.layout)})}`}));return}if(A==="GET"&&u==="/traffic"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=_a(e.layout),w=o(),v=f.map(k=>`<tr><td title="${le(k.at)}">${le(ev(k.at))}</td><td>${le(k.direction)}</td><td><code>${le(k.type)}</code></td><td>${le(k.summary)}</td><td>${le(k.action??"")}</td></tr>`).join(""),_=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${v}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',E=b.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";We(y,await n({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${E}
              ${_}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(A==="GET"&&u==="/projects"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=ir(f.installVersion),v=await Jm(e.layout),_=b.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":null,E=H(),k=E===null?null:Z({wsUrl:E.wsUrl,pairingToken:E.pairingToken}),x=k===null?{}:Object.fromEntries((await Promise.all(v.projects.map(async I=>{let j=await Rw(k,I.id);return[I.id,j?.counts??null]}))).filter(I=>I[1]!==null));We(y,await n({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:xw({projects:v.projects,compositionCountsByProjectId:x,cloudAppOrigin:w,syncMessage:v.message,syncOk:v.ok,flashMessage:null,flashError:_})}));return}if(A==="GET"&&u==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=H(),v=w===null?null:Z({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),_=f.length>0&&v!==null?Rr():null;if(_===null||v===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Ve({projectFolderPath:_}),!await sa(v,f,_)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(A==="GET"&&u==="/project"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=b.searchParams.get("id")?.trim()??"",w=o(),v=await Jm(e.layout),_=_o(v.projects,f);if(_===null){await p(y,"Project not found");return}let E=b.searchParams.get("linked")==="1"?b.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${b.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${b.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:b.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,k=b.searchParams.get("knowledgePromoted"),x=k!==null?`Marked ${k} lesson(s) as promoted in Agent Witch.`:null,I=b.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,j=b.searchParams.get("tab")?.trim()??"harness",ne=j==="workflows"||j==="agents"||j==="knowledge"?j:"harness",G=H(),V=G===null?null:Z({wsUrl:G.wsUrl,pairingToken:G.pairingToken}),Gr=V===null?null:await Rw(V,_.id),$=0;if(V!==null)try{let be=await fetch(`${V.appOrigin}/api/agent-witch/projects/${encodeURIComponent(_.id)}/knowledge`,{method:"GET",headers:{[ze]:V.pairingToken},signal:AbortSignal.timeout(1e4)});if(be.ok){let Dt=await be.json();typeof Dt=="object"&&Dt!==null&&typeof Dt.candidateCount=="number"&&($=Dt.candidateCount)}}catch{$=0}We(y,await n({title:_.name,activePath:"/projects",installVersion:w.installVersion,body:jn({project:_,installed:kr(e.layout),linkedSetSlugs:Lr(_.projectFolderPath),composition:Gr,knowledgeCandidateCount:$,activeTab:ne,flashMessage:E??x,flashError:I})}));return}if(A==="POST"&&u==="/projects/pull-bound-harness"){let b=await lr(h),f=await PS({rawBody:b,layout:e.layout});if(f.kind==="not_found"){await p(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let w=o();We(y,await n({title:f.title,activePath:"/projects",installVersion:w.installVersion,body:f.body}));return}if(A==="POST"&&u==="/projects/link-harness"){let b=await lr(h),f=new URLSearchParams(b),w=f.get("projectId")?.trim()??"",v=await Jm(e.layout),_=_o(v.projects,w);if(_===null){await p(y,"Project not found");return}let E=f.getAll("applySet").map(G=>String(G)),k=Vi({layout:e.layout,projectFolderPath:_.projectFolderPath,setSlugs:E});if(!k.ok){let G=o();We(y,await n({title:_.name,activePath:"/projects",installVersion:G.installVersion,body:jn({project:_,installed:kr(e.layout),linkedSetSlugs:Lr(_.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:k.errorMessage})}));return}let x=H(),I=x===null?null:Z({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),j=I===null?!1:await oa(I,_.id,k.appliedSetSlugs),ne=new URLSearchParams({linked:"1",files:String(k.writtenFileCount),bindingsSynced:j?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(_.id)}&${ne.toString()}`}),y.end();return}if(A==="POST"&&u==="/project/knowledge/promote-all"){let b=await lr(h),w=new URLSearchParams(b).get("projectId")?.trim()??"",v=await Jm(e.layout),_=_o(v.projects,w);if(_===null){await p(y,"Project not found");return}let E=H(),k=E===null?null:Z({wsUrl:E.wsUrl,pairingToken:E.pairingToken}),x=k===null?{ok:!1,promotedCount:0}:await ez(k,_.id),I=new URLSearchParams({tab:"knowledge",...x.ok?{knowledgePromoted:String(x.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(_.id)}&${I.toString()}`}),y.end();return}if(A==="GET"&&u==="/harness"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=Yi(e.layout),v=b.searchParams.get("submitted")==="1",_=v?b.searchParams.get("syncFailed")==="1"?`Local harness updated (${b.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:b.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${b.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":b.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:b.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,E=w?.scanRoots[0]??Ru(),k=V4(e.layout,{reveal:w,importQuery:b.searchParams.get("import")==="1",justSubmitted:v}),x=ir(f.installVersion);We(y,await n({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:Tl(Xw(e.layout,{cloudAppOrigin:x,reveal:w,scanFolder:E,flashMessage:_,importSectionExpanded:k}))}));return}if(A==="POST"&&u==="/api/harness/pick-folder"){let b=Rr();if(b===null){ge(y,200,{cancelled:!0});return}ge(y,200,{path:b});return}if(A==="GET"&&u==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=Gi(f);if(w===null){ge(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let v=Ol.default.readFileSync(w,"utf8"),_=v.length>Pz?`${v.slice(0,Pz)}
\u2026 (truncated)`:v;ge(y,200,{content:_})}catch{ge(y,500,{errorMessage:"Could not read file."})}return}if(A==="POST"&&u==="/api/harness/reveal/add-project"){let b=await lr(h),f="";try{let _=JSON.parse(b);typeof _=="object"&&_!==null&&typeof _.projectPath=="string"&&(f=_.projectPath.trim())}catch{ge(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){ge(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=Yi(e.layout),v=tS({reveal:w,projectPath:f});if(v===null||v.sets.length===0){ge(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Ou(e.layout,v),ge(y,200,{ok:!0,setCount:v.sets.length});return}if(A==="GET"&&u==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){ge(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;h.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...tv});let v=rS({scanRoot:f,response:y,shouldAbort:()=>w});Ou(e.layout,v),y.end();return}if(A==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(A==="POST"&&u==="/harness/submit"){let b=Yi(e.layout);if(b===null){let x=o(),I=ir(x.installVersion);We(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Tl(Xw(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await lr(h),w=new URLSearchParams(f),v=Cw(w,b),_=nS({layout:e.layout,sets:v});if(!_.ok){let x=o(),I=ir(x.installVersion);We(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Tl(Xw(e.layout,{cloudAppOrigin:I,reveal:b,flashError:_.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}iS(e.layout);let k=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${_.writtenItemCount??0}${k}`}),y.end();return}if(A==="GET"&&u==="/writer-api"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),w=H()?.writerExecutionBackend??Re(void 0),v=Pe(e.layout.configPath),_=wr(v),E=b.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,k=o();We(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:k.installVersion,body:Ew({writerExecutionBackend:w,secrets:_,flashMessage:E})}));return}if(A==="POST"&&u==="/writer-api"){let b=await lr(h),f=new URLSearchParams(b),w=f.get("writerExecutionBackend")?.trim()??"cli";py({configPath:e.layout.configPath,writerExecutionBackend:Re(w),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(A==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(A==="GET"&&u==="/history"){let b=o();We(y,await n({title:"History",activePath:"/history",installVersion:b.installVersion,body:pw({reportsDir:e.layout.reportsDir})}));return}if(A==="GET"&&u==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=o(),v=JA({layout:e.layout}),_=ZA(v),E=f.length>0?await Xn({layout:e.layout,query:f,limit:20}):Yn(e.layout).slice(-50).reverse(),k=E.map(I=>{let j=XA(v,I.id),ne=j>0?` \xB7 used in ${j} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${le(I.createdAt)}">${le(ev(I.createdAt))}${I.source?` \xB7 ${le(I.source)}`:""}${ne}</div><pre>${le(I.text)}</pre></article>`}).join(""),x=_.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${_.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${le(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";We(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${le(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${x}${k}${J4(f,E.length)}`}));return}A==="POST"&&await lr(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return S.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),S.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Gt}`)}),S},Nl=e=>Km(e).publicKeyRaw});var Ym=l(()=>{"use strict";_0();W0();Lz()});var kz={};bt(kz,{runAgentWitchExternalLiveCli:()=>Z4});var rv,Ez,X4,Z4,Cz=l(()=>{"use strict";rv=m(require("node:fs")),Ez=m(require("node:path"));$n();q();re();Ym();re();X4=e=>{let t=Ez.default.join(e,"link-code.txt");if(!rv.default.existsSync(t))return null;let r=rv.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},Z4=()=>{Ue("agent-witch-live");let e=L(),t=M(),r=X4(e),o=Nl(t);Ml({layout:t,controllers:{getStatus:()=>{let n=we(t);return{wsConnected:ga(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{ro(e)}}})}});var cr=W(($Le,Tz)=>{"use strict";var Rz=["nodebuffer","arraybuffer","fragments"],xz=typeof Blob<"u";xz&&Rz.push("blob");Tz.exports={BINARY_TYPES:Rz,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:xz,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var jl=W((HLe,Xm)=>{"use strict";var{EMPTY_BUFFER:Q4}=cr(),ov=Buffer[Symbol.species];function e6(e,t){if(e.length===0)return Q4;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new ov(r.buffer,r.byteOffset,o):r}function Iz(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function Oz(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function t6(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function nv(e){if(nv.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new ov(e):ArrayBuffer.isView(e)?t=new ov(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),nv.readOnly=!1),t}Xm.exports={concat:e6,mask:Iz,toArrayBuffer:t6,toBuffer:nv,unmask:Oz};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Xm.exports.mask=function(t,r,o,n,s){s<48?Iz(t,r,o,n,s):e.mask(t,r,o,n,s)},Xm.exports.unmask=function(t,r){t.length<32?Oz(t,r):e.unmask(t,r)}}catch{}});var jz=W((FLe,Nz)=>{"use strict";var Mz=Symbol("kDone"),sv=Symbol("kRun"),iv=class{constructor(t){this[Mz]=()=>{this.pending--,this[sv]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[sv]()}[sv](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[Mz])}}};Nz.exports=iv});var Ws=W((ULe,Hz)=>{"use strict";var Dl=require("zlib"),Dz=jl(),r6=jz(),{kStatusCode:zz}=cr(),o6=Buffer[Symbol.species],n6=Buffer.from([0,0,255,255]),Qm=Symbol("permessage-deflate"),dr=Symbol("total-length"),vs=Symbol("callback"),Hr=Symbol("buffers"),_s=Symbol("error"),Zm,av=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Zm){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Zm=new r6(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[vs];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!n.client_max_window_bits));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){Zm.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){Zm.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Dl.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Dl.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Qm]=this,this._inflate[dr]=0,this._inflate[Hr]=[],this._inflate.on("error",i6),this._inflate.on("data",$z)}this._inflate[vs]=o,this._inflate.write(t),r&&this._inflate.write(n6),this._inflate.flush(()=>{let s=this._inflate[_s];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=Dz.concat(this._inflate[Hr],this._inflate[dr]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[dr]=0,this._inflate[Hr]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Dl.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Dl.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[dr]=0,this._deflate[Hr]=[],this._deflate.on("data",s6)}this._deflate[vs]=o,this._deflate.write(t),this._deflate.flush(Dl.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=Dz.concat(this._deflate[Hr],this._deflate[dr]);r&&(s=new o6(s.buffer,s.byteOffset,s.length-4)),this._deflate[vs]=null,this._deflate[dr]=0,this._deflate[Hr]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};Hz.exports=av;function s6(e){this[Hr].push(e),this[dr]+=e.length}function $z(e){if(this[dr]+=e.length,this[Qm]._maxPayload<1||this[dr]<=this[Qm]._maxPayload){this[Hr].push(e);return}this[_s]=new RangeError("Max payload size exceeded"),this[_s].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[_s][zz]=1009,this.removeListener("data",$z),this.reset()}function i6(e){if(this[Qm]._inflate=null,this[_s]){this[vs](this[_s]);return}e[zz]=1007,this[vs](e)}});var Ls=W((BLe,eg)=>{"use strict";var{isUtf8:Fz}=require("buffer"),{hasBlob:a6}=cr(),l6=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function c6(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function lv(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function d6(e){return a6&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}eg.exports={isBlob:d6,isValidStatusCode:c6,isValidUTF8:lv,tokenChars:l6};if(Fz)eg.exports.isValidUTF8=function(e){return e.length<24?lv(e):Fz(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");eg.exports.isValidUTF8=function(t){return t.length<32?lv(t):e(t)}}catch{}});var mv=W((GLe,Jz)=>{"use strict";var{Writable:u6}=require("stream"),Uz=Ws(),{BINARY_TYPES:p6,EMPTY_BUFFER:Bz,kStatusCode:m6,kWebSocket:g6}=cr(),{concat:cv,toArrayBuffer:f6,unmask:h6}=jl(),{isValidStatusCode:y6,isValidUTF8:Gz}=Ls(),tg=Buffer[Symbol.species],nt=0,Vz=1,qz=2,Kz=3,dv=4,uv=5,rg=6,pv=class extends u6{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||p6[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[g6]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=nt}_write(t,r,o){if(this._opcode===8&&this._state==nt)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new tg(o.buffer,o.byteOffset+t,o.length-t),new tg(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new tg(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case nt:this.getInfo(t);break;case Vz:this.getPayloadLength16(t);break;case qz:this.getPayloadLength64(t);break;case Kz:this.getMask();break;case dv:this.getData(t);break;case uv:case rg:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[Uz.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=Vz:this._payloadLength===127?this._state=qz:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=Kz:this._state=dv}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=dv}getData(t){let r=Bz;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&h6(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=uv,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[Uz.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===nt&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=nt;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=cv(o,r):this._binaryType==="arraybuffer"?n=f6(cv(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=nt):(this._state=rg,setImmediate(()=>{this.emit("message",n,!0),this._state=nt,this.startLoop(t)}))}else{let n=cv(o,r);if(!this._skipUTF8Validation&&!Gz(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===uv||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=nt):(this._state=rg,setImmediate(()=>{this.emit("message",n,!1),this._state=nt,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,Bz),this.end();else{let o=t.readUInt16BE(0);if(!y6(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new tg(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!Gz(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=nt;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=nt):(this._state=rg,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=nt,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[m6]=n,i}};Jz.exports=pv});var hv=W((qLe,Zz)=>{"use strict";var{Duplex:VLe}=require("stream"),{randomFillSync:S6}=require("crypto"),{types:{isUint8Array:A6}}=require("util"),Yz=Ws(),{EMPTY_BUFFER:b6,kWebSocket:P6,NOOP:w6}=cr(),{isBlob:Es,isValidStatusCode:v6}=Ls(),{mask:Xz,toBuffer:Xo}=jl(),st=Symbol("kByteLength"),_6=Buffer.alloc(4),og=8*1024,Zo,ks=og,At=0,W6=1,L6=2,gv=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=At,this.onerror=w6,this[P6]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||_6,r.generateMask?r.generateMask(o):(ks===og&&(Zo===void 0&&(Zo=Buffer.alloc(og)),S6(Zo,0,og),ks=0),o[0]=Zo[ks++],o[1]=Zo[ks++],o[2]=Zo[ks++],o[3]=Zo[ks++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[st]!==void 0?a=r[st]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(Xz(t,o,d,s,a),[d]):(Xz(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=b6;else{if(typeof t!="number"||!v6(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(A6(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[st]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==At?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Es(t)?(n=t.size,s=!1):(t=Xo(t),n=t.length,s=Xo.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[st]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Es(t)?this._state!==At?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==At?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Es(t)?(n=t.size,s=!1):(t=Xo(t),n=t.length,s=Xo.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[st]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Es(t)?this._state!==At?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==At?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[Yz.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Es(t)?(a=t.size,c=!1):(t=Xo(t),a=t.length,c=Xo.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[st]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Es(t)?this._state!==At?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==At?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[st],this._state=L6,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(fv,this,a,n);return}this._bufferedBytes-=o[st];let i=Xo(s);r?this.dispatch(i,r,o,n):(this._state=At,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(E6,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[Yz.extensionName];this._bufferedBytes+=o[st],this._state=W6,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");fv(this,c,n);return}this._bufferedBytes-=o[st],this._state=At,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===At&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][st],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][st],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};Zz.exports=gv;function fv(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function E6(e,t,r){fv(e,t,r),e.onerror(t)}});var a$=W((KLe,i$)=>{"use strict";var{kForOnEventAttribute:zl,kListener:yv}=cr(),Qz=Symbol("kCode"),e$=Symbol("kData"),t$=Symbol("kError"),r$=Symbol("kMessage"),o$=Symbol("kReason"),Cs=Symbol("kTarget"),n$=Symbol("kType"),s$=Symbol("kWasClean"),ur=class{constructor(t){this[Cs]=null,this[n$]=t}get target(){return this[Cs]}get type(){return this[n$]}};Object.defineProperty(ur.prototype,"target",{enumerable:!0});Object.defineProperty(ur.prototype,"type",{enumerable:!0});var Qo=class extends ur{constructor(t,r={}){super(t),this[Qz]=r.code===void 0?0:r.code,this[o$]=r.reason===void 0?"":r.reason,this[s$]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[Qz]}get reason(){return this[o$]}get wasClean(){return this[s$]}};Object.defineProperty(Qo.prototype,"code",{enumerable:!0});Object.defineProperty(Qo.prototype,"reason",{enumerable:!0});Object.defineProperty(Qo.prototype,"wasClean",{enumerable:!0});var Rs=class extends ur{constructor(t,r={}){super(t),this[t$]=r.error===void 0?null:r.error,this[r$]=r.message===void 0?"":r.message}get error(){return this[t$]}get message(){return this[r$]}};Object.defineProperty(Rs.prototype,"error",{enumerable:!0});Object.defineProperty(Rs.prototype,"message",{enumerable:!0});var $l=class extends ur{constructor(t,r={}){super(t),this[e$]=r.data===void 0?null:r.data}get data(){return this[e$]}};Object.defineProperty($l.prototype,"data",{enumerable:!0});var k6={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[zl]&&n[yv]===t&&!n[zl])return;let o;if(e==="message")o=function(s,i){let a=new $l("message",{data:i?s:s.toString()});a[Cs]=this,ng(t,this,a)};else if(e==="close")o=function(s,i){let a=new Qo("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Cs]=this,ng(t,this,a)};else if(e==="error")o=function(s){let i=new Rs("error",{error:s,message:s.message});i[Cs]=this,ng(t,this,i)};else if(e==="open")o=function(){let s=new ur("open");s[Cs]=this,ng(t,this,s)};else return;o[zl]=!!r[zl],o[yv]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[yv]===t&&!r[zl]){this.removeListener(e,r);break}}};i$.exports={CloseEvent:Qo,ErrorEvent:Rs,Event:ur,EventTarget:k6,MessageEvent:$l};function ng(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var sg=W((JLe,l$)=>{"use strict";var{tokenChars:Hl}=Ls();function Nt(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function C6(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(p===-1&&Hl[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);d===44?(Nt(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(p===-1&&Hl[d]===1)c===-1&&(c=g);else if(d===32||d===9)p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g),Nt(r,e.slice(c,p),!0),d===44&&(Nt(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,g),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(n){if(Hl[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:o||(o=!0),n=!1}else if(s)if(Hl[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,p=g;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(p===-1&&Hl[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))p===-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);o&&(h=h.replace(/\\/g,""),o=!1),Nt(r,a,h),d===44&&(Nt(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=g);let S=e.slice(c,p);return i===void 0?Nt(t,S,r):(a===void 0?Nt(r,S,!0):o?Nt(r,a,S.replace(/\\/g,"")):Nt(r,a,S),Nt(t,i,r)),t}function R6(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}l$.exports={format:R6,parse:C6}});var cg=W((ZLe,b$)=>{"use strict";var x6=require("events"),T6=require("https"),I6=require("http"),u$=require("net"),O6=require("tls"),{randomBytes:M6,createHash:N6}=require("crypto"),{Duplex:YLe,Readable:XLe}=require("stream"),{URL:Sv}=require("url"),Fr=Ws(),j6=mv(),D6=hv(),{isBlob:z6}=Ls(),{BINARY_TYPES:c$,CLOSE_TIMEOUT:$6,EMPTY_BUFFER:ig,GUID:H6,kForOnEventAttribute:Av,kListener:F6,kStatusCode:U6,kWebSocket:Ae,NOOP:p$}=cr(),{EventTarget:{addEventListener:B6,removeEventListener:G6}}=a$(),{format:V6,parse:q6}=sg(),{toBuffer:K6}=jl(),m$=Symbol("kAborted"),bv=[8,13],pr=["CONNECTING","OPEN","CLOSING","CLOSED"],J6=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,Y=class e extends x6{constructor(t,r,o){super(),this._binaryType=c$[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=ig,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,r=[]):r=[r]),g$(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){c$.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new j6({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new D6(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[Ae]=this,s[Ae]=this,t[Ae]=this,n.on("conclude",Z6),n.on("drain",Q6),n.on("error",eJ),n.on("message",tJ),n.on("ping",rJ),n.on("pong",oJ),s.onerror=nJ,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",y$),t.on("data",lg),t.on("end",S$),t.on("error",A$),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Fr.extensionName]&&this._extensions[Fr.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Xe(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),h$(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Pv(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||ig,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Pv(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||ig,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Pv(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Fr.extensionName]||(n.compress=!1),this._sender.send(t||ig,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Xe(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(Y,"CONNECTING",{enumerable:!0,value:pr.indexOf("CONNECTING")});Object.defineProperty(Y.prototype,"CONNECTING",{enumerable:!0,value:pr.indexOf("CONNECTING")});Object.defineProperty(Y,"OPEN",{enumerable:!0,value:pr.indexOf("OPEN")});Object.defineProperty(Y.prototype,"OPEN",{enumerable:!0,value:pr.indexOf("OPEN")});Object.defineProperty(Y,"CLOSING",{enumerable:!0,value:pr.indexOf("CLOSING")});Object.defineProperty(Y.prototype,"CLOSING",{enumerable:!0,value:pr.indexOf("CLOSING")});Object.defineProperty(Y,"CLOSED",{enumerable:!0,value:pr.indexOf("CLOSED")});Object.defineProperty(Y.prototype,"CLOSED",{enumerable:!0,value:pr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(Y.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(Y.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[Av])return t[F6];return null},set(t){for(let r of this.listeners(e))if(r[Av]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[Av]:!0})}})});Y.prototype.addEventListener=B6;Y.prototype.removeEventListener=G6;b$.exports=Y;function g$(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:$6,protocolVersion:bv[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!bv.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${bv.join(", ")})`);let s;if(t instanceof Sv)s=t;else try{s=new Sv(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;ag(e,u);return}let d=i?443:80,p=M6(16).toString("base64"),g=i?T6.request:I6.request,S=new Set,h;if(n.createConnection=n.createConnection||(i?X6:Y6),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new Fr({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=V6({[Fr.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!J6.test(u)||S.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");S.add(u)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let u=n.path.split(":");n.socketPath=u[0],n.path=u[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let u=o&&o.headers;if(o={...o,headers:{}},u)for(let[A,b]of Object.entries(u))o.headers[A.toLowerCase()]=b}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,u||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=g(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=g(n);n.timeout&&y.on("timeout",()=>{Xe(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[m$]||(y=e._req=null,ag(e,u))}),y.on("response",u=>{let A=u.headers.location,b=u.statusCode;if(A&&n.followRedirects&&b>=300&&b<400){if(++e._redirects>n.maxRedirects){Xe(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new Sv(A,t)}catch{let v=new SyntaxError(`Invalid URL: ${A}`);ag(e,v);return}g$(e,f,r,o)}else e.emit("unexpected-response",y,u)||Xe(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,A,b)=>{if(e.emit("upgrade",u),e.readyState!==Y.CONNECTING)return;y=e._req=null;let f=u.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){Xe(e,A,"Invalid Upgrade header");return}let w=N6("sha1").update(p+H6).digest("base64");if(u.headers["sec-websocket-accept"]!==w){Xe(e,A,"Invalid Sec-WebSocket-Accept header");return}let v=u.headers["sec-websocket-protocol"],_;if(v!==void 0?S.size?S.has(v)||(_="Server sent an invalid subprotocol"):_="Server sent a subprotocol but none was requested":S.size&&(_="Server sent no subprotocol"),_){Xe(e,A,_);return}v&&(e._protocol=v);let E=u.headers["sec-websocket-extensions"];if(E!==void 0){if(!h){Xe(e,A,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let k;try{k=q6(E)}catch{Xe(e,A,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(k);if(x.length!==1||x[0]!==Fr.extensionName){Xe(e,A,"Server indicated an extension that was not requested");return}try{h.accept(k[Fr.extensionName])}catch{Xe(e,A,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Fr.extensionName]=h}e.setSocket(A,b,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function ag(e,t){e._readyState=Y.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function Y6(e){return e.path=e.socketPath,u$.connect(e)}function X6(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=u$.isIP(e.host)?"":e.host),O6.connect(e)}function Xe(e,t,r){e._readyState=Y.CLOSING;let o=new Error(r);Error.captureStackTrace(o,Xe),t.setHeader?(t[m$]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(ag,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function Pv(e,t,r){if(t){let o=z6(t)?t.size:K6(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${pr[e.readyState]})`);process.nextTick(r,o)}}function Z6(e,t){let r=this[Ae];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[Ae]!==void 0&&(r._socket.removeListener("data",lg),process.nextTick(f$,r._socket),e===1005?r.close():r.close(e,t))}function Q6(){let e=this[Ae];e.isPaused||e._socket.resume()}function eJ(e){let t=this[Ae];t._socket[Ae]!==void 0&&(t._socket.removeListener("data",lg),process.nextTick(f$,t._socket),t.close(e[U6])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function d$(){this[Ae].emitClose()}function tJ(e,t){this[Ae].emit("message",e,t)}function rJ(e){let t=this[Ae];t._autoPong&&t.pong(e,!this._isServer,p$),t.emit("ping",e)}function oJ(e){this[Ae].emit("pong",e)}function f$(e){e.resume()}function nJ(e){let t=this[Ae];t.readyState!==Y.CLOSED&&(t.readyState===Y.OPEN&&(t._readyState=Y.CLOSING,h$(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function h$(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function y$(){let e=this[Ae];if(this.removeListener("close",y$),this.removeListener("data",lg),this.removeListener("end",S$),e._readyState=Y.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[Ae]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",d$),e._receiver.on("finish",d$))}function lg(e){this[Ae]._receiver.write(e)||this.pause()}function S$(){let e=this[Ae];e._readyState=Y.CLOSING,e._receiver.end(),this.end()}function A$(){let e=this[Ae];this.removeListener("error",A$),this.on("error",p$),e&&(e._readyState=Y.CLOSING,this.destroy())}});var _$=W((eEe,v$)=>{"use strict";var QLe=cg(),{Duplex:sJ}=require("stream");function P$(e){e.emit("close")}function iJ(){!this.destroyed&&this._writableState.finished&&this.destroy()}function w$(e){this.removeListener("error",w$),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function aJ(e,t){let r=!0,o=new sJ({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(P$,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(P$,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",iJ),o.on("error",w$),o}v$.exports=aJ});var wv=W((tEe,W$)=>{"use strict";var{tokenChars:lJ}=Ls();function cJ(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&lJ[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}W$.exports={parse:cJ}});var T$=W((oEe,x$)=>{"use strict";var dJ=require("events"),dg=require("http"),{Duplex:rEe}=require("stream"),{createHash:uJ}=require("crypto"),L$=sg(),en=Ws(),pJ=wv(),mJ=cg(),{CLOSE_TIMEOUT:gJ,GUID:fJ,kWebSocket:hJ}=cr(),yJ=/^[+/0-9A-Za-z]{22}==$/,E$=0,k$=1,R$=2,vv=class extends dJ{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:gJ,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:mJ,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=dg.createServer((o,n)=>{let s=dg.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=SJ(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=E$}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===R$){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Fl,this);return}if(t&&this.once("close",t),this._state!==k$)if(this._state=k$,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Fl,this):process.nextTick(Fl,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Fl(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",C$);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){tn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){tn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!yJ.test(s)){tn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){tn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Ul(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=pJ.parse(c)}catch{tn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&p!==void 0){let S=new en({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=L$.parse(p);h[en.extensionName]&&(S.accept(h[en.extensionName]),g[en.extensionName]=S)}catch{tn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let S={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(S,(h,y,u,A)=>{if(!h)return Ul(r,y||401,u,A);this.completeUpgrade(g,s,d,t,r,o,n)});return}if(!this.options.verifyClient(S))return Ul(r,401)}this.completeUpgrade(g,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[hJ])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>E$)return Ul(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${uJ("sha1").update(r+fJ).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let g=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),p._protocol=g)}if(t[en.extensionName]){let g=t[en.extensionName].params,S=L$.format({[en.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${S}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",C$),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Fl,this)})),a(p,n)}};x$.exports=vv;function SJ(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function Fl(e){e._state=R$,e.emit("close")}function C$(){this.destroy()}function Ul(e,t,r,o){r=r||dg.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${dg.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function tn(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,tn),e.emit("wsClientError",i,r,t)}else Ul(r,o,n,s)}});var AJ,bJ,PJ,wJ,vJ,_J,I$,WJ,Bl,O$=l(()=>{AJ=m(_$(),1),bJ=m(sg(),1),PJ=m(Ws(),1),wJ=m(mv(),1),vJ=m(hv(),1),_J=m(wv(),1),I$=m(cg(),1),WJ=m(T$(),1),Bl=I$.default});var _v,Wv,Lv=l(()=>{"use strict";_v="AGENT_WITCH_EXTERNAL_BRIDGE",Wv="AGENT_WITCH_EXTERNAL_LIVE"});var Ev,M$=l(()=>{"use strict";Ev=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var LJ,kv,N$=l(()=>{"use strict";Lv();M$();LJ=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",kv=(e={})=>{let t=e.env??process.env,r=Ev(t[_v]),o=Ev(t[Wv]);return{mode:LJ(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var j$=l(()=>{"use strict";Lv()});var D$=l(()=>{"use strict";N$();j$()});var Cv=l(()=>{"use strict"});var mr,Gl=l(()=>{"use strict";mr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var xs,rn,z$,kJ,Rv,xv,$$,H$,Tv,F$,Vl,Iv=l(()=>{"use strict";xs=m(require("node:fs")),rn=m(require("node:os")),z$=m(require("node:path"));Cv();Gl();kJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Rv=(e=rn.default.hostname())=>z$.default.join(rn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),xv=e=>{if(!xs.default.existsSync(e))return null;try{let t=JSON.parse(xs.default.readFileSync(e,"utf8"));return!kJ(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},$$=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},H$=(e,t)=>{xs.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Tv=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Rv(),o=xv(r);if(o!==null&&o.pid!==process.pid&&mr(o.pid)&&$$(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:rn.default.hostname(),macOsUsername:rn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return H$(r,n),{ok:!0}},F$=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Rv(),o=xv(r);return o!==null&&o.pid!==process.pid&&mr(o.pid)&&$$(o)?{ok:!1}:(H$(r,{hostname:rn.default.hostname(),macOsUsername:rn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},Vl=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??Rv();xv(r)?.pid===process.pid&&xs.default.existsSync(r)&&xs.default.unlinkSync(r)}});var Ov,ql,CJ,RJ,xJ,TJ,Mv,U$=l(()=>{"use strict";Ov=require("node:child_process"),ql=m(require("node:path"));Gl();Td();CJ=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),RJ=(e,t)=>{if(CJ(e)||!/\bnode\b/.test(e))return!1;let r=ql.default.resolve(t),o=ql.default.join(r,"app",si),n=ql.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===si||i==="agent-witch.ts")return e.includes(r);try{let a=ql.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},xJ=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,Ov.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},TJ=(e,t,r)=>{let o=xJ(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||RJ(d,t)&&n.push(c)}return n},Mv=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,Ov.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=TJ(r,e.installDir,t),n=[];for(let s of o)if(mr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var Kl,Jl,B$,IJ,Nv,G$=l(()=>{"use strict";Kl=m(require("node:fs")),Jl=m(require("node:path"));Ee();B$=(e,t)=>{!Kl.default.existsSync(e)||Kl.default.existsSync(t)||(Kl.default.mkdirSync(Jl.default.dirname(t),{recursive:!0}),Kl.default.renameSync(e,t))},IJ=e=>{if(e.profileEmail===null)return;let t=Jl.default.join(e.installDir,at);B$(Jl.default.join(t,dn),e.mainLogPath),B$(Jl.default.join(t,un),e.errorLogPath)},Nv=e=>{let t=M();e!==void 0&&t.installDir!==e||IJ(t)}});var V$=l(()=>{"use strict";Pa();fp();fp();!Be()&&io(__agentWitchImportMetaUrl)&&(async()=>{Ue("agent-witch-wake-server");let e=await ko(),t=Ut(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var q$=l(()=>{"use strict";V$()});var K$=l(()=>{"use strict";aa()});var jv,J$=l(()=>{"use strict";Cv();q$();Iv();K$();jv=async(e={})=>{let t=e.skipInProcessBridge?null:await gp();qu();let r=setInterval(()=>{qu()},6e4),o=setInterval(()=>{if(!F$().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var Yl,ug,NJ,Y$,X$,pg,Z$,Q$,Dv,eH,mg,tH=l(()=>{"use strict";Yl=m(require("node:fs")),ug=m(require("node:path")),NJ="pending-run-inputs.json",Y$=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),X$=e=>{let t=e.profileEmail?ug.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return ug.default.join(t,NJ)},pg=e=>{let t=X$(e);if(!Yl.default.existsSync(t))return{};try{let r=JSON.parse(Yl.default.readFileSync(t,"utf8"));return Y$(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!Y$(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},Z$=(e,t)=>{let r=X$(e);Yl.default.mkdirSync(ug.default.dirname(r),{recursive:!0}),Yl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Q$=e=>Object.values(pg(e)),Dv=(e,t)=>pg(e)[t]!==void 0,eH=(e,t)=>{let r=pg(e);r[t.agentRunId]=t,Z$(e,r)},mg=(e,t)=>{let r=pg(e);delete r[t],Z$(e,r)}});var gg=l(()=>{"use strict";ue()});var rH=l(()=>{"use strict";ue()});var fg=l(()=>{"use strict";ue()});var hg=l(()=>{"use strict";ue()});var Xl=l(()=>{"use strict";ue()});var jJ,DJ,Zl,zv=l(()=>{"use strict";pt();gg();rH();fg();hg();Xl();jJ={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},DJ={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Zl=e=>{if(!ce(e.writerAgent))return"the selected writer";let t=Ge(e.writerAgent);if(Re(e.writerExecutionBackend)==="api"&&t!==null){let r=De(Pe(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Li(t,r.model);return`${DJ[t]} model ${o}`}}return jJ[e.writerAgent]}});var zJ,$J,oH,nH,sH=l(()=>{"use strict";zJ=/"input_tokens"\s*:\s*(\d+)/,$J=/"output_tokens"\s*:\s*(\d+)/,oH=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},nH=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=oH(zJ.exec(t)),o=oH($J.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var yg=l(()=>{"use strict";ft()});var Ql,Sg,HJ,$v,iH,aH,lH,Hv,cH=l(()=>{"use strict";Ql=m(require("node:fs")),Sg=m(require("node:path"));yg();HJ="run-completion-outbox.json",$v=e=>{let t=e.profileEmail?Sg.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Sg.default.join(t,HJ)},iH=e=>{let t=$v(e);if(!Ql.default.existsSync(t))return[];try{let r=JSON.parse(Ql.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},aH=(e,t)=>{Ql.default.mkdirSync(Sg.default.dirname($v(e)),{recursive:!0}),Ql.default.writeFileSync($v(e),JSON.stringify(t,null,2),"utf8")},lH=(e,t)=>{let r=[...iH(e).filter(o=>o.runId!==t.runId),t];aH(e,r)},Hv=async e=>{if(e.cloudApi===null)return;let t=iH(e.layout);if(t.length===0)return;let r=[];for(let o of t)await ta(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);aH(e.layout,r)}});var dH=l(()=>{"use strict"});var Fv,ec,UJ,on,uH=l(()=>{"use strict";dH();Fv=new Map,ec=e=>{let t=Fv.get(e);t!==void 0&&(clearInterval(t),Fv.delete(e))},UJ=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},on=(e,t,r,o={})=>{ec(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){ec(t);return}let i=o.onTick?.()??{};UJ(e,t,n,i)};s(),Fv.set(t,setInterval(s,15e3))}});var pH=l(()=>{"use strict";ft()});var mH,gH=l(()=>{"use strict";pH();mH=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Qe(t)}});var Uv,tc,gr,Bv,jt,fH,Ag=l(()=>{"use strict";Uv=new Set,tc=new Map,gr=(e,t)=>{if(t.length===0)return;let r=tc.get(e)??[];r.push(t),tc.set(e,r)},Bv=e=>{Uv.add(e);let t=tc.get(e)??[];return tc.delete(e),t},jt=e=>Uv.has(e),fH=e=>{Uv.delete(e),tc.delete(e)}});var Ts,hH,yH,SH=l(()=>{"use strict";Ts=m(require("node:path")),hH=require("node:url");so();yH=()=>{if(Be()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Ts.default.dirname(Ts.default.resolve(e)):Ts.default.dirname(Ts.default.resolve(__filename))}return Ts.default.dirname((0,hH.fileURLToPath)(__agentWitchImportMetaUrl))}});var AH,bH,PH,wH,Fe,Is,vH,_H,Os,Gv,Vv,qv,WH,Kv,LH,bg=l(()=>{"use strict";AH=require("node:crypto"),bH=m(require("node:fs")),PH=m(require("node:path")),wH=require("node:url");Gl();so();SH();Fe=new Map,vH=async()=>{if(Is!==void 0)return Is;try{if(Be()){let e=yH(),t=PH.default.join(e,"deps","node-pty","lib","index.js");if(bH.default.existsSync(t)){let r=await import((0,wH.pathToFileURL)(t).href);return Is=r,r}}return Is=await import("node-pty"),Is}catch{return Is=null,null}},_H=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Os=(e,t,r)=>{let o=Fe.get(e);if(o!==void 0){Fe.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},Gv=(e,t)=>{let r=Fe.get(e);return r===void 0?!1:(r.pty.write(t),!0)},Vv=(e,t,r)=>{let o=Fe.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},qv=e=>{for(let t of Fe.values())if(!(t.mode!=="agent"||t.runId!==e))return mr(t.pty.pid);return!1},WH=e=>{for(let[t,r]of Fe.entries())if(!(r.mode!=="agent"||r.runId!==e)){Fe.delete(t);try{r.pty.kill()}catch{}return!0}return!1},Kv=async e=>{let t=await vH();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;Fe.get(e.shellSessionId)!==void 0&&Os(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return Fe.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{_H(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{Fe.get(e.shellSessionId)?.pty===n&&(Fe.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},LH=async e=>{let t=e.shellSessionId??(0,AH.randomUUID)(),r=await vH();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return Fe.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{_H(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{Fe.get(t)?.pty===o&&(Fe.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var Pg,EH,kH=l(()=>{"use strict";Pg="[[AWAITING_INPUT]]",EH=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Pg,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var rc,CH,wg=l(()=>{"use strict";kH();rc=e=>{let t=e.indexOf(Pg);if(t<0)return null;let o=e.slice(t+Pg.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},CH=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",EH].join(`
`)});var RH,xH=l(()=>{"use strict";Ag();bg();wg();RH=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(jt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}gr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await LH({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=rc(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var TH,IH,OH,fr,vg=l(()=>{"use strict";TH=require("node:child_process"),IH=m(require("node:fs")),OH=m(require("node:path"));Td();fr=(e,t)=>{let r=OH.default.join(e,"app",iE,"ensure-writer.sh");return IH.default.existsSync(r)?new Promise((o,n)=>{let s=(0,TH.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{n(i)}),s.on("close",i=>{if(i===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var MH,nn,nc,_g,Jv,oc,Wg,Lg,Yv,Xv,BJ,Ms,GJ,VJ,Zv,Qv=l(()=>{"use strict";MH=require("node:child_process");pt();vg();fg();gg();Xl();hg();nn=new Map,nc=e=>e==="cursor"||e==="antigravity",_g=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",Jv=e=>nn.get(e)?.warmed===!0,oc=e=>{let t=nn.get(e);nn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Wg=e=>nn.get(e)?.conversationStarted===!0,Lg=e=>{let t=nn.get(e);nn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},Yv=e=>{nn.delete(e)},Xv=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",BJ={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Ms=e=>`${BJ[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,GJ=(e,t,r,o)=>new Promise(n=>{let s=Gd(t,r),i=[],a=(0,MH.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),VJ=(e,t)=>{let r=Ms(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},Zv=async e=>{if(!ce(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Re(e.runConfig.writerExecutionBackend)==="api"){let r=Ge(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Pe(e.runConfig.layout.configPath);return De(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),oc(e.writerAgent),{exitCode:0,output:Ms(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await fr(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}nc(e.writerAgent)&&oc(e.writerAgent);let t=await GJ(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?VJ(e.writerAgent,t.output):Ms(e.writerAgent)}}});var sn,e_=l(()=>{"use strict";sn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var NH,qJ,KJ,jH,JJ,t_,DH=l(()=>{"use strict";e_();NH=/you(?:'|')ve hit your session limit/i,qJ=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],KJ=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,jH=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},JJ=e=>{let t=KJ.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},t_=e=>{let t=e.trim();if(t.length===0)return null;if(NH.test(t))return{code:sn.SESSION_LIMIT,resetHint:JJ(t),matchedLine:jH(t,NH)};for(let r of qJ)if(r.test(t))return{code:sn.PROVIDER_QUOTA,resetHint:null,matchedLine:jH(t,r)};return null}});var Eg,kg,r_,o_=l(()=>{"use strict";Eg="[[AGENT_RUN_WRITER_EXECUTION]]",kg="cli-writer-api-key-missing",r_="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var n_=l(()=>{"use strict";o_()});var zH=l(()=>{"use strict";n_()});var Cg=l(()=>{"use strict";e_();DH();o_();n_();zH()});var Rg,$H=l(()=>{"use strict";Rg={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var HH,FH=l(()=>{"use strict";HH="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var UH,BH=l(()=>{"use strict";Cg();FH();UH=e=>e.code===sn.SESSION_LIMIT?HH:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var GH,VH=l(()=>{"use strict";Cg();$H();BH();GH=e=>{let t=t_(e.output);return t!==null?{status:Rg.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:UH(t)}:{status:e.exitCode===0?Rg.COMPLETED:Rg.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var s_,uCe,qH=l(()=>{"use strict";s_={OPEN:"open",APPROVAL:"approval"},uCe=s_.APPROVAL});var Ns,xg,KH,ZJ,JH,YH,XH,sc,i_,a_=l(()=>{"use strict";Ns=m(require("node:fs")),xg=m(require("node:path")),KH="runs",ZJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),JH=e=>{let t=e.profileEmail!==null?xg.default.join(e.installDir,"profiles",e.profileEmail,KH):xg.default.join(e.installDir,KH);return Ns.default.mkdirSync(t,{recursive:!0}),t},YH=(e,t)=>xg.default.join(JH(e),`${t}.json`),XH=(e,t)=>{Ns.default.writeFileSync(YH(e,t.id),JSON.stringify(t,null,2))},sc=(e,t)=>{let r=YH(e,t);if(!Ns.default.existsSync(r))return null;try{let o=JSON.parse(Ns.default.readFileSync(r,"utf8"));return!ZJ(o)||typeof o.id!="string"?null:o}catch{return null}},i_=e=>{let t=JH(e),r=Ns.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=sc(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var QJ,ZH,QH=l(()=>{"use strict";VH();qH();a_();QJ=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=GH({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:s_.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},ZH=(e,t)=>{let r=QJ(t);return XH(e,r),r}});var eF=l(()=>{"use strict";Bm()});var tF,rF=l(()=>{"use strict";Cg();tF=()=>[Eg,`agentRunWriterExecutionBackend=${kg}`,`agentRunWriterExecutionReasonCode=${r_}`].join(`
`)});var Ur,Tg=l(()=>{"use strict";Ur=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var l_,e7,t7,oF,nF=l(()=>{"use strict";l_=e=>e.toLocaleString("en-US"),e7=e=>e<.01?e.toFixed(4):e.toFixed(3),t7=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${e7(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${l_(e.inputTokens)} in / ${l_(e.outputTokens)} out (${l_(e.totalTokens)} total)`,t].join(`
`)},oF=(e,t)=>{if(t===void 0)return e;let r=t7(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var sF=l(()=>{"use strict";ue()});var aF,ic,fe,c_,Ig,iF,r7,o7,lF,cF,dF,ac,d_,u_,p_,uF,n7,it,lc,Br,pF,s7,i7,Og,m_,g_,f_,mF=l(()=>{"use strict";aF=require("node:child_process");ue();pt();tH();Ll();zv();sH();Vd();cH();yg();uH();Gl();gH();Ag();bg();wg();xH();Qv();QH();eF();rF();Tg();nF();bn();sF();Xl();di();wg();ic=new Map,fe=new Map,c_=new Set,Ig=new Map,iF=e=>{e!==void 0&&!Ig.has(e)&&Ig.set(e,Date.now())},r7=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(jt(t)){it(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}gr(t,n)},o7=(e,t,r,o,n)=>{if(!gy(e,n))return;let s=`${tF()}
`;r7(t,r,o,s);let i=fe.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},lF=130,cF=`

Stopped by user.`,dF=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:Ur(e)},ac=null,d_=e=>{ac=e},u_=(e,t)=>{if(ac===null)return;let r=cw(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||pS(ac,t,r)},p_=async e=>{await Hv({layout:e,cloudApi:ac})},uF=e=>{let t=ic.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:mr(t.pid)},n7=e=>de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),it=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},lc=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=fn(s),c=fe.get(r);if(a!==null&&c!==void 0){let d=hE(a),p=uF(r)||qv(r);d!==null&&!p&&Br(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return fE(a)}}),Br=(e,t,r,o,n,s,i,a)=>{let c=En(s,a),d=n,p=oF(c.output,c.llmUsage);if(r!==void 0){let S=Ig.get(r);Ig.delete(r),S!==void 0&&aw({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-S)/1e3))});let h=nH(c.llmUsage,p);h!==null&&_D({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&c_.has(r)&&(c_.delete(r),d=lF,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${cF}`:"Stopped by user.");let g=r!==void 0?cw(e.layout.reportsDir,r):null;if(r!==void 0){ec(r),Oi(e.layout,r),jt(r)&&(it(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),fH(r));let S=fe.get(r);PD({reportsDir:e.layout.reportsDir,agentRunId:r,input:Ur(i),output:p,...S!==void 0?{writerLabel:Zl({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&Fm({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),ZH(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),lH(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),Hv({layout:e.layout,cloudApi:ac}),fe.delete(r),ic.delete(r),mg(e.layout,r)}it(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),Ai(e.layout)},pF=(e,t,r,o,n,s,i)=>{let a=fe.get(r),c=a?.accumulatedOutput??s;eH(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),on(t,r,()=>Dv(e.layout,r),lc(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),it(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},s7=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(n===void 0||h.length===0)){if(jt(n)){it(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}gr(n,h)}};if(n!==void 0){let h=fe.get(n);ic.set(n,t),fe.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),it(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),on(r,n,()=>uF(n),lc(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let g=a==="claude-cli",S=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(g?S.push(y):(c.push(y),p(y)),d||n===void 0)return;let u=rc(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let A=fe.get(n),b=[A?.accumulatedOutput??"",u.partialOutput].filter(f=>f.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=b),ic.delete(n),pF(e,r,n,o,u.question,b,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;Lg(a);let y=n!==void 0?fe.get(n):void 0,u=g?En(S.join("")):{output:c.join("").trim(),llmUsage:void 0},A=g?c.join("").trim():"",b=[u.output.trim(),A].filter(w=>w.length>0).join(`
`);g&&u.output.trim().length>0&&p(u.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${b}`.trim():b;Br(e,r,n,o,h??-1,f,s,u.llmUsage)}),t.on("error",h=>{d||Br(e,r,n,o,-1,h.message,s)})},i7=(e,t,r,o,n,s,i,a,c)=>{let d=dF(r,c);s!==void 0&&(fe.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),it(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),on(n,s,()=>fe.has(s),lc(e,n,s,o,i,a))),Ri(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(jt(s)){it(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}gr(s,g)}}).then(g=>{Lg(t),Br(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let S=g instanceof Error?g.message:String(g);Br(e,n,s,o,-1,S,r)})},Og=(e,t,r,o,n,s,i,a,c,d,p,g)=>{let S=dF(r,p);if(Si(e.layout),fo(e,t)){iF(s),i7(e,t,r,o,n,s,c,d,S);return}let h=Wt(t,r,n7(e),i);if(h===null){Br(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}iF(s);let y=mH({workspace:e.workspace,projectFolderPath:c}),u=()=>{let A=(0,aF.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:g??process.env});s7(e,A,n,o,s,r,S,t)};if(s===void 0){u();return}fe.set(s,{originalPrompt:r,userTranscriptPrompt:S,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:fe.get(s)?.accumulatedOutput??""}),o7(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&ci({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),on(n,s,()=>fe.has(s),lc(e,n,s,o,c,d)),RH({socket:n,sendMessage:it,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:A=>{a!==void 0&&Os(a,w=>{it(n,w)},o);let b=fe.get(s),f=[b?.accumulatedOutput??"",A.partialOutput].filter(w=>w.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=f),pF(e,n,s,o,A.question,f,r)},onFinished:(A,b)=>{Lg(t);let f=En(b),w=fe.get(s),v=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${f.output}`.trim():f.output;Br(e,n,s,o,A,v,r,f.llmUsage)}}).then(A=>{if(!A){u();return}on(n,s,()=>qv(s),lc(e,n,s,o,c,d))}).catch(A=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",A instanceof Error?A.message:A),u()})},m_=(e,t,r,o)=>{mg(e.layout,t.agentRunId),t.shellSessionId!==void 0&&it(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=CH(t),s=fe.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;Og(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},g_=(e,t)=>{for(let r of Q$(e.layout))fe.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:Ur(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),on(t,r.agentRunId,()=>Dv(e.layout,r.agentRunId),{awaitingInput:!0}),it(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},f_=(e,t,r,o)=>{let n=fe.get(r);if(n===void 0)return!1;c_.add(r),ec(r);let s=ic.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(WH(r))return!0;mg(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${cF}`:"Stopped by user.";return Br(e,t,r,o,lF,i,n.originalPrompt),!0}});var a7,h_,gF=l(()=>{"use strict";Di();a7=()=>`http://127.0.0.1:${mt()}/restart`,h_=async()=>{try{let e=await fetch(a7(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var fF=l(()=>{"use strict";La()});var hF=l(()=>{"use strict";Dw()});var yF,SF=l(()=>{"use strict";yF=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var cc,l7,y_,AF=l(()=>{"use strict";q();re();fF();XS();hF();SF();bn();cc=(e,t)=>{xr(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},l7=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Rh(),Ch)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},y_=async e=>{let t=ke(e.layout.installDir)?.bundleVersion??null;if(!yF({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(ut(e.layout)){bi({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),cc(e.layout,{summary:r,action:"install-bundle-update-start"}),Ft({launchAgentLabel:se(e.layout.installDir),installDir:e.layout.installDir});let o=await ws({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),cc(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await l7();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),cc(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),cc(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),cc(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var c7,S_,bF=l(()=>{"use strict";c7=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),S_=e=>{if(!c7(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var A_,b_,PF=l(()=>{"use strict";xS();TS();A_=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=la({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},b_=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Xt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var wF,d7,u7,p7,dc,vF=l(()=>{"use strict";wF=m(require("node:os"));Ee();d7="Default",u7=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),p7=e=>{let t=wF.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},dc=()=>{let e=M(),t=Pd(e),r=u7(d7);return`${p7(t)}/${r.length>0?r:"project"}`}});var _F=l(()=>{"use strict";La()});var WF,P_,LF=l(()=>{"use strict";_F();WF=!1,P_=e=>{WF||(WF=!0,process.on("uncaughtException",t=>{Ro(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;Ro(e,{kind:"crash",message:r,stack:o})}))}});var EF,m7,w_,kF=l(()=>{"use strict";EF=require("node:child_process");vg();pt();fg();gg();Xl();hg();m7=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,EF.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},w_=async e=>{if(!ce(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Re(e.runConfig.writerExecutionBackend)==="api"){let r=Ge(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Pe(e.layout.configPath),n=De(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await fr(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await m7(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var v_,CF=l(()=>{"use strict";v_=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var RF,__,xF=l(()=>{"use strict";RF=require("node:crypto"),__=()=>(0,RF.randomUUID)()});var js,TF,Mg=l(()=>{"use strict";js="[[WORKING_ESTIMATE]]",TF=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",js,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var IF,OF=l(()=>{"use strict";IF=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var g7,MF,NF=l(()=>{"use strict";Mg();g7=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,MF=e=>{if(!e.includes(js))return null;let t=null;for(let r of e.matchAll(g7)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var f7,W_,jF=l(()=>{"use strict";NF();f7=/^(\d{1,6})\b/,W_=e=>{let t=MF(e);if(t!==null)return t;let r=f7.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var h7,y7,S7,Ng,L_=l(()=>{"use strict";pt();va();h7="http://127.0.0.1:11434",y7=45e3,S7=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Ng=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||h7,o=t===void 0?(await yt({commands:de({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(y7)});return n.ok?S7(await n.json()):null}catch{return null}}});var E_,k_,C_,DF=l(()=>{"use strict";di();Mg();Tg();OF();jF();Ll();L_();E_=async e=>{let t=Ur(e.wrappedPrompt),r=wD(e.reportsDir);return{estimateOutput:await Ng(TF(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},k_=e=>{let t=W_(e.estimateOutput);t!==null&&Mm({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},C_=e=>{let t=W_(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=IF(t);return li({reportKey:e.reportKey,agentRunId:e.agentRunId,status:vt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),Mm({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var jg,zF,R_=l(()=>{"use strict";jg="[[WORKING_TOKEN_ESTIMATE]]",zF=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",jg,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var $F,A7,HF,FF=l(()=>{"use strict";R_();$F=/^(\d{1,8})\b/,A7=e=>{let t=e.indexOf(jg);if(t<0)return null;let r=e.slice(t+jg.length).trim(),o=$F.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},HF=e=>{let t=A7(e);if(t!==null)return t;let r=$F.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var x_,T_,UF=l(()=>{"use strict";R_();Tg();FF();Ll();L_();x_=async e=>{let t=Ur(e.wrappedPrompt),r=WD(e.reportsDir);return{estimateOutput:await Ng(zF(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},T_=e=>{let t=HF(e.estimateOutput);return t===null?null:(vD({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var BF=l(()=>{"use strict";Iv();U$();G$();J$();Di();mF();vg();pt();a_();Ag();gF();$S();AF();bn();bF();PF();yg();vF();LF();kF();Id();CF();xF();Mg();di();DF();UF();zv();va();bg();Qv()});var GF={};bt(GF,{buildContinuationPromptWithContext:()=>w7});var b7,P7,w7,VF=l(()=>{"use strict";b7=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,P7=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),w7=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=P7(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${b7(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var qF={};bt(qF,{readHarnessExportSets:()=>_7});var uc,I_,Dg,v7,_7,KF=l(()=>{"use strict";uc=m(require("node:fs")),I_=m(require("node:path"));Ee();Dg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),v7=e=>{if(!uc.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(uc.default.readFileSync(e.harnessManifestPath,"utf8"));if(Dg(t))return t}catch{return null}return null},_7=(e,t)=>{let r=M(t),o=v7(r);if(o===null)return[];let n=Dg(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!Dg(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!Dg(p))continue;let g=typeof p.path=="string"?p.path:void 0,S=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(g===void 0||S.length===0||h.length===0||y.length===0)continue;let u=g.startsWith("shared/")?I_.default.join(r.harnessRootDir,g):I_.default.join(r.harnessSetsDir,i,g);uc.default.existsSync(u)&&d.push({id:S,kind:h,title:y,content:uc.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var $_,M_,Ds,JF,W7,YF,XF,O_,ZF,N_,j_,D_,X,B,z_,L7,pc,E7,k7,C7,R7,x7,T7,I7,O7,mc,QF=l(()=>{"use strict";$_=require("node:child_process"),M_=m(require("node:fs")),Ds=m(require("node:os"));O$();q();re();$n();Yw();D$();ue();Ze();La();ab();Ym();Bm();ft();bo();lA();Vt();BF();JF=3e4,W7=3e4,YF=new Map,XF=new Map,O_=new Map,ZF=new Map,N_=new Map,j_=new Map,D_=new Map,X=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),B=(e,t,r)=>{e.readyState===Bl.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(xr(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),hp(r,"out",t)))},z_=e=>e,L7=e=>{if(!M_.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(M_.default.readFileSync(e.harnessManifestPath,"utf8"));if(X(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},pc=(e,t)=>{let r=L7(t);r!==null&&B(e,{type:"harness.manifest.report",payload:{hostname:Ds.default.hostname(),manifest:r}})},E7=async(e,t,r,o,n,s,i=!1,a,c,d,p,g)=>{let S=g?.trim()??"";if(!ce(t)){B(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=Zl({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await yt({commands:de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?E_({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=s!==void 0?x_({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,b=nc(t)&&!Jv(t);if(b){try{await fr(e.layout.installDir,t)}catch($){let be=$ instanceof Error?$.message:String($);B(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${be}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}oc(t)}else if(!nc(t))try{await fr(e.layout.installDir,t)}catch($){let be=$ instanceof Error?$.message:String($);B(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${be}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Ti(d,dc,g);if(f===null){B(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Ve({projectFolderPath:f,...S.length>0?{projectId:S}:{}}),i||xl(e.layout,t,f);let w=Um({sessionContinuation:i,supportsWriterSessionContinuation:_g(t),isWriterConversationStarted:Wg(t)}),v=i&&w==="first"?Rl(e.layout,t,f):null,_=v!==null?Ps(e.layout,v):null,E=_!==null&&_.turns.length>0,k=_w({sessionContinuation:i,supportsWriterSessionContinuation:_g(t),isWriterConversationStarted:Wg(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:E,userPromptCharacterCount:r.length}),x=r;if(k.continuationStrategy==="source_run_seed"){let $=typeof c=="string"&&c.length>0?sc(e.layout,c):null;if($!==null){let{buildContinuationPromptWithContext:be}=await Promise.resolve().then(()=>(VF(),GF));x=be({priorPrompt:$.prompt,priorOutput:$.resultOutput??"",userMessage:r})}}else k.continuationStrategy==="transcript_seed"&&_!==null&&_.turns.length>0&&(x=Dm({priorTurns:_.turns,userMessage:r}));let I=k.ragLimit>0?await Xn({layout:e.layout,query:x,limit:k.ragLimit,minScore:k.ragMinScore,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],j=k.ragLimit>0&&f.trim().length>0?await sb({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],ne=k.injectMemory?gw(e.layout,f,S.length>0?S:void 0):[],G=`${hw(ne,k.memoryEntryLimit)}${rb(I)}${ib(j)}${x}`,V=p?.trim()??(s!==void 0&&f.trim().length>0?__():void 0);if(s!==void 0&&V!==void 0&&V.length>0&&f.trim().length>0){ci({reportKey:V,agentRunId:s,userSummary:"Working on your Mac\u2026"});let $=G;u!==null&&u.then(be=>{if(be===null)return;let Dt=C_({estimateOutput:be.estimateOutput??"",reportKey:V,agentRunId:s,reportsDir:e.layout.reportsDir,task:be.task,writerLabel:be.writerLabel,embedding:be.embedding});if(Dt.estimateSeconds===null)return;u_(e.layout.reportsDir,s);let zs=`${js}
${Dt.estimateSeconds}
`;if(jt(s)){B(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:zs},requestId:o});return}gr(s,zs)}).catch(()=>{}),G=v_($),G=th(G,{agentRunId:s,reportKey:V,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then($=>{$!==null&&k_({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel,embedding:$.embedding})}).catch(()=>{}),s!==void 0&&A!==null&&A.then($=>{$!==null&&T_({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel})}).catch(()=>{});let Gr=s!==void 0&&D_.get(s)===!0;if(s!==void 0&&f.trim().length>0){let $=await Gu(f);j_.set(s,$),V!==void 0&&V.length>0&&N_.set(s,V)}Og(e,t,G,o,z_(n),s,{sessionTurn:k.sessionTurn},a,f,V,r,ly(e.layout,s,Gr)),b&&s!==void 0&&B(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Xv(t)},requestId:o})},k7=async(e,t,r,o,n)=>{let s=(i,a)=>{B(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await Zv({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,B(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=ce(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Ms(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},C7=(e,t,r)=>new Promise(o=>{if(!ce(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Wt(t,r,de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,$_.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),R7=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;B(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Et(t.bundle),s=X(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=Ce(e.wsUrl)??Bt,g=await Ky({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return B(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=Ao({bundle:i,layout:e.layout});return B(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&pc(o,e.layout),!0},x7=async(e,t,r,o)=>{if(await R7(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(B(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){B(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!ce(n)){B(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}Si(e.layout);let i=await(async()=>{try{await fr(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return C7(e,n,s)})().finally(()=>{Ai(e.layout)});B(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),pc(o,e.layout)},T7=e=>{let t=1e3*2**e;return Math.min(W7,t)},I7=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(ut(e.layout)){wh(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,h_().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(u,A="system.ack")=>{if(!t.selfUpdateInFlight){if(ut(e.layout)){bi({layout:e.layout,remoteBundleVersion:u,trigger:A}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${A}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,y_({layout:e.layout,remoteBundleVersion:u,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let u=we(e.layout);u!==null&&je(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===Bl.OPEN||u.readyState===Bl.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,JF)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=T7(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},g=u=>{s();let A=()=>{let b=gi(e.layout.installDir),f=mt();B(u,{type:"agent.heartbeat",payload:{hostname:Ds.default.hostname(),macOsUsername:Ds.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:b}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,JF)},S=(u,A)=>{if(typeof u.type!="string")return;if(aA(u)){t.stopped=!0,s(),a(),c(),oA({layout:e.layout}).finally(()=>{Vl(),process.exit(0)});return}xr(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),hp(e.layout,"in",u);let b=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&X(u.payload)){let f=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",w=typeof u.payload.origin=="string"?u.payload.origin:"",v=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",_=typeof u.payload.challenge=="string"?u.payload.challenge:"",E=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!Jw({serverPublicKey:f,origin:w,devicePublicKey:v,challenge:_,serverAttestation:E})){t.wakeError="Server attestation verification failed",xr(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&X(u.payload)){let f=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";xr(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),w_({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{B(A,{type:"writer.status",payload:w},e.layout)})}if(u.type==="install.bundle.update"&&X(u.payload)){let f=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";f.length>0&&o(f,"install.bundle.update")}if(u.type==="system.ack"){Zu(e.layout,{wsUrl:e.wsUrl});let f=X(u.payload)?u.payload:null,w=S_(f);w!==null&&o(w)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&X(u.payload)&&A_(u.payload),u.type==="automations.run"&&X(u.payload)&&b_(u.payload),u.type==="terminal.stream.accepted"&&X(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"";if(f.length>0){let w=Bv(f);for(let v of w)B(A,{type:"terminal.stream.chunk",payload:{runId:f,chunk:v},requestId:b})}}if(u.type==="agent.agentRun.list"&&B(A,{type:"dashboard.agentRun.list.result",payload:{runs:i_(e.layout)},requestId:b}),u.type==="agent.agentRun.get"&&X(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"",w=f.length>0?sc(e.layout,f):null;B(A,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:b})}if(u.type==="command.claude.run"&&X(u.payload)){let f=u.payload.prompt,w=typeof u.payload.writerAgent=="string"&&ce(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",v=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,_=u.payload.sessionContinuation===!0,E=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,k=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,x=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=Ti(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,dc,x),j=ty(u.payload.compositionSnapshot),ne=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${_?"continue":"first"})\u2026`),I===null){B(A,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Live and set the project folder before running tasks.",...v!==void 0?{agentRunId:v}:{}},requestId:b});return}if(j!==null){let G=oy(e.layout,j);if(G!==null){B(A,{type:"command.claude.result",payload:{exitCode:-1,output:G,...v!==void 0?{agentRunId:v}:{}},requestId:b});return}if(v!==void 0){let V=sy(e.layout,v,j);if(!V.ok){B(A,{type:"command.claude.result",payload:{exitCode:-1,output:V.errorMessage,...v!==void 0?{agentRunId:v}:{}},requestId:b});return}D_.set(v,j.entries.some(Gr=>Gr.scope==="run"))}}v!==void 0&&k!==void 0&&YF.set(v,k),v!==void 0&&(XF.set(v,I),x!==void 0&&x.trim().length>0&&O_.set(v,x.trim()),ZF.set(v,f.trim()),Ve({projectFolderPath:I,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),E7(e,w,f.trim(),b,A,v,_,k,E,I,ne,x)}}if(u.type==="shell.session.open"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:120,v=typeof u.payload.rows=="number"?u.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),Kv({shellSessionId:f,cwd:e.workspace,cols:w,rows:v,send:_=>{B(A,_)},requestId:b}))}if(u.type==="shell.session.close"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";f.length>0&&Os(f,w=>{B(A,w)},b)}if(u.type==="shell.input"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.data=="string"?u.payload.data:"";f.length>0&&w.length>0&&Gv(f,w)}if(u.type==="shell.resize"&&X(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:0,v=typeof u.payload.rows=="number"?u.payload.rows:0;f.length>0&&w>0&&v>0&&Vv(f,w,v)}if(u.type==="command.writer.session.end"&&X(u.payload)){let f=u.payload.writerAgent;typeof f=="string"&&ce(f)&&(Yv(f),Hm(e.layout,f))}if(u.type==="command.writer.session.start"&&X(u.payload)){let f=u.payload.writerAgent,w=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof f=="string"&&ce(f)&&w.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),k7(e,f,w,b,A))}if(u.type==="command.claude.stop"&&X(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),f_(e,z_(A),f,b))}if(u.type==="command.claude.input_respond"&&X(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",w=typeof u.payload.response=="string"?u.payload.response.trim():"",v=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",_=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",E=typeof u.payload.question=="string"?u.payload.question:"";f.length>0&&w.length>0&&v.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),m_(e,{agentRunId:f,originalPrompt:v,partialOutput:_,question:E,response:w,shellSessionId:YF.get(f)},b,z_(A)))}if(u.type==="dispatch.approval.required"&&X(u.payload)){let f=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",w=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${w}`),process.platform==="darwin"&&(0,$_.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&X(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),x7(e,u.payload,b,A)),u.type==="harness.export.request"&&X(u.payload)){let f=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",w=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,v=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(_=>typeof _=="string"):[];f.length>0&&v.length>0&&(async()=>{let{readHarnessExportSets:_}=await Promise.resolve().then(()=>(KF(),qF)),E=_(v,e.email);B(A,{type:"harness.export.result",payload:{success:E.length>0,borrowerUserId:f,...w!==void 0?{targetDeviceId:w}:{},sets:E,errorMessage:E.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(u.type==="harness.manifest.request"&&pc(A,e.layout),u.type==="command.claude.result"&&X(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,w=typeof u.payload.output=="string"?u.payload.output:"",v=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,_=Ti(f!==void 0?XF.get(f):void 0,dc),E=f!==void 0?O_.get(f):void 0,k=f!==void 0?ZF.get(f)??"":"",x=wS({exitCode:v,output:w});if(x&&_!==null&&tb({layout:e.layout,text:w,source:f??"command.claude.result",projectFolderPath:_,...E!==void 0?{projectId:E}:{}}),v!=null&&v!==0&&w.trim().length>0&&_!==null&&(YA({layout:e.layout,errorText:w,projectFolderPath:_,...E!==void 0?{projectId:E}:{}}),nb({layout:e.layout,text:w,source:f??"command.claude.result.failure",projectFolderPath:_,...E!==void 0?{projectId:E}:{}})),x&&k.trim().length>0&&_!==null&&fw({layout:e.layout,projectFolderPath:_,...E!==void 0?{projectId:E}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:k,output:w,createdAt:new Date().toISOString()}}),f!==void 0&&_!==null){let j=N_.get(f),ne=j_.get(f);j!==void 0&&ne!==void 0&&Gu(_).then(G=>{let V=vS({before:ne,after:G});rh(j,V),j_.delete(f),N_.delete(f)})}if(x&&E!==void 0&&E.trim().length>0){let j=H(),ne=j===null?null:Z({wsUrl:j.wsUrl,pairingToken:j.pairingToken});ne!==null&&WS(ne,E,{...f!==void 0?{sourceRunId:f}:{},lesson:_S({prompt:k,output:w})})}f!==void 0&&(Oi(e.layout,f),D_.delete(f),O_.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let u=new Bl(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),d_(Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),p_(e.layout);let A=Ce(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=Kw({layout:e.layout,origin:A,...b!==void 0&&b.length>0?{claimToken:b}:{}});B(u,{type:"agent.register",payload:{role:"agent",hostname:Ds.default.hostname(),macOsUsername:Ds.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),pc(u,e.layout),g_(e,u),g(u)}),u.on("message",A=>{let b=typeof A=="string"?A:A.toString("utf8");try{let f=JSON.parse(b);if(!X(f))return;S(f,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(A,b)=>{s(),t.socket=void 0,t.wsConnected=!1,MS(e.layout),t.reconnectAttempt+=1;let f=typeof b=="string"?b:b.toString("utf8");Ro(e.layout,{kind:"ws_close",message:"WebSocket closed",code:A,reason:f}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",A=>{t.wakeError=A.message,Ro(e.layout,{kind:"ws_error",message:A.message,stack:A.stack}),console.error(`[agent-witch] Socket error: ${A.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return Ph(()=>{let u=vh();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&o(u.remoteBundleVersion,u.trigger);let A=_h();A!==null&&r(A)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:ga(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Nl(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(pc(u,e.layout),{ok:!0})}}},O7=async()=>{Ue("agent-witch");let e=kv(),t=L();Tv().ok||(process.platform==="darwin"?(await ro(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),Nv(t);let o=Mv({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(Ft({launchAgentLabel:se(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),ti());let n=await yy(),s=n[0];s!==void 0&&P_(s.layout);for(let h of n){let y=Ce(h.wsUrl)??Bt;fi(h.layout.installDir,y)}let i=n.map(h=>I7(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),Vl(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let A=we(h.layout);NS(A,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(ut(h)||fa(h.installDir))},g=await jv({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):Ml({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let S=Ut(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),ri(),d()});d=()=>{S(),g.stop(),Vl(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},mc=O7});var H_=l(()=>{"use strict";QF()});var e1={};bt(e1,{startAgentWitchClient:()=>mc});var t1=l(()=>{"use strict";H_();H_();so();oh();Md();if(!Be()&&io(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Od(process.argv.slice(e))),mc()}});Qf();oh();so();Md();var AE="20.x",bE="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var i5=e=>[`Node.js ${AE} or newer is required (found ${e}).`,bE].join(" "),PE=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${i5(process.version)}
`),process.exit(1))};var M7=async()=>{Ue("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Rh(),Ch)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},N7=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(wx(),Px)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},j7=async()=>{if(!io(Be()?void 0:__agentWitchImportMetaUrl))return;PE();let e=process.argv.indexOf("report");e>=0&&process.exit(Od(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await M7();return}if(t==="wake"){await N7();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(v0(),w0));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(Cz(),kz));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(t1(),e1));await r()};j7();
